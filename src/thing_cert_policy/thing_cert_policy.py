# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: Apache-2.0
import os
import sys
import json
import logging as logger
import boto3
from botocore.config import Config
from botocore.exceptions import ClientError
from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography import x509
from cryptography.x509.oid import NameOID
from cryptography.hazmat.primitives import hashes

logger.getLogger().setLevel(logger.INFO)


def handler(event, context):
    logger.info(f"on_event: {json.dumps(event, indent=2)}, context object: {context}")
    logger.info(f"Environment: {dict(os.environ)}")

    request_type = event["RequestType"]
    if request_type == "Create":
        return on_create(event, context)
    if request_type == "Update":
        return on_update(event, context)
    if request_type == "Delete":
        return on_delete(event, context)
    raise Exception("Invalid request type: {request_type}")


def get_aws_client(name):
    return boto3.client(
        name,
        config=Config(retries={"max_attempts": 10, "mode": "standard"}),
    )


def on_create(event: dict, context: dict):
    """Create an AWS IoT thing, IoT policy, and IoT certificate, and attach all.

    Creates the attached resources specified in the `event` properties. This also stores
    the certificate key pair in Systems Manager Parameter Store for use by external applications.

    Args:
        event (dict): resource id and properties for specific custom resource.
        context (dict): Lambda context object.

    Returns:
        dict: `PhysicalResourceId` containing the IoT Certificate Arn, `Data` containing values
            to return to CDK stack.
    """
    logger.info("Starting execution of on_create function")
    props = event["ResourceProperties"]
    thing_name: str = props["ThingName"]
    iot_policy: str = props["IotPolicy"]
    iot_policy_name: str = props["IoTPolicyName"]
    stack_name: str = props["StackName"]
    encryption_algo: str = props["EncryptionAlgorithm"]
    # Define keys and values to return to calling provider
    function_result: dict = {
        "PhysicalResourceId": "",
        "Data": {},
    }

    c_iot = get_aws_client("iot")
    c_ssm = get_aws_client("ssm")

    # Create thing
    try:
        response = c_iot.create_thing(thingName=thing_name)
        function_result["Data"]["ThingArn"] = response["thingArn"]
        function_result["Data"]["ThingName"] = response["thingName"]
    except ClientError as e:
        logger.error(f"Error creating thing {thing_name}, {e}")
        sys.exit(1)

    # Create certificate and private key
    if encryption_algo == "ECC":
        key = ec.generate_private_key(curve=ec.SECP256R1(), backend=default_backend())
    elif encryption_algo == "RSA":
        key = rsa.generate_private_key(
            public_exponent=65537, key_size=4096, backend=default_backend()
        )
    else:
        logger.error(
            f"Should not get here. Encryption algorithm of 'ECC' or 'RSA' expected, received {encryption_algo}. Exiting"
        )
        sys.exit(1)

    private_key = key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption(),
    ).decode("utf-8")

    # Generate a CSR and set subject (CN=dispenserId)
    csr = (
        x509.CertificateSigningRequestBuilder()
        .subject_name(
            x509.Name(
                [
                    # Provide various details about who we are.
                    x509.NameAttribute(NameOID.COUNTRY_NAME, "US"),
                    x509.NameAttribute(NameOID.STATE_OR_PROVINCE_NAME, "CO"),
                    x509.NameAttribute(NameOID.LOCALITY_NAME, "Denver"),
                    x509.NameAttribute(
                        NameOID.ORGANIZATION_NAME, "Greengrass Accelerator Testing"
                    ),
                    x509.NameAttribute(NameOID.COMMON_NAME, thing_name),
                ]
            )
        )
        .sign(key, hashes.SHA256(), default_backend())
    )
    try:
        response = c_iot.create_certificate_from_csr(
            certificateSigningRequest=str(
                csr.public_bytes(serialization.Encoding.PEM), "utf-8"
            ),
            setAsActive=True,
        )
        certificate_pem = response["certificatePem"]
        function_result["Data"]["CertificateArn"] = response["certificateArn"]
        # resource Id is the certificate arn - used during delete process
        function_result["PhysicalResourceId"] = response["certificateArn"]
    except ClientError as e:
        logger.error(f"Error creating certificate, {e}")
        sys.exit(1)

    # policy
    try:
        response = c_iot.create_policy(
            policyName=iot_policy_name, policyDocument=iot_policy
        )
        function_result["Data"]["IotPolicyArn"] = response["policyArn"]
    except ClientError as e:
        logger.error(f"Error creating policy {iot_policy_name}, {e}")
        logger.error(f"attempted policy was:\n {iot_policy}")
        sys.exit(1)

    # attach cert-pol
    try:
        c_iot.attach_policy(
            policyName=iot_policy_name, target=function_result["Data"]["CertificateArn"]
        )
    except ClientError as e:
        logger.error(
            f"Error attaching certificate {function_result['Data']['CertificateArn']} to policy {iot_policy_name}, {e}"
        )
        sys.exit(1)

    # attach cert-thing
    try:
        c_iot.attach_thing_principal(
            thingName=thing_name,
            principal=function_result["Data"]["CertificateArn"],
        )
    except ClientError as e:
        logger.error(
            f"Error attaching certificate {function_result['Data']['CertificateArn']} to thing {thing_name}, {e}"
        )
        sys.exit(1)

    # store certificate and private key in SSM param store
    try:
        parameter_private_key = f"/{stack_name}/{thing_name}/private_key"
        parameter_certificate_pem = f"/{stack_name}/{thing_name}/certificate_pem"
        # private key
        response = c_ssm.put_parameter(
            Name=parameter_private_key,
            Description=f"Certificate private key for IoT thing {thing_name}",
            Value=private_key,
            Type="SecureString",
            Tier="Advanced",
        )
        function_result["Data"]["PrivateKeySecretParameter"] = parameter_private_key
        # certificate pem
        response = c_ssm.put_parameter(
            Name=parameter_certificate_pem,
            Description=f"Certificate PEM for IoT thing {thing_name}",
            Value=certificate_pem,
            Type="String",
            Tier="Advanced",
        )
        function_result["Data"]["CertificatePemParameter"] = parameter_certificate_pem
    except ClientError as e:
        logger.error(f"Error creating secure string parameters, {e}")
        sys.exit(1)

    # Additional data - these calls and responses are used in other constructs or external applications
    # Get the IoT-Data endpoint
    try:
        response = c_iot.describe_endpoint(endpointType="iot:Data-ATS")
        function_result["Data"]["DataAtsEndpointAddress"] = response["endpointAddress"]
    except ClientError as e:
        logger.error(f"Could not obtain iot:Data-ATS endpoint, {e}")
        function_result["Data"]["DataAtsEndpointAddress"] = "stack_error: see log files"

    # Get the Credential Provider endpoint
    try:
        response = c_iot.describe_endpoint(endpointType="iot:CredentialProvider")
        function_result["Data"]["CredentialProviderEndpointAddress"] = response[
            "endpointAddress"
        ]
    except ClientError as e:
        logger.error(f"Could not obtain iot:CredentialProvider endpoint, {e}")
        function_result["Data"][
            "CredentialProviderEndpointAddress"
        ] = "stack_error: see log files"
    logger.info("Completed execution of on_create function")
    return function_result


def on_delete(event: dict, context: dict):
    """Delete thing, certificate, policy, and ssm resources in reverse order.

    Fully deletes all resources, including and changes made on them after stack creation.
    The policy is detached from the certificate and deleted (with any versions), the thing
    is detached from the certificate and deleted, and then the thing is deleted. Also, the System
    Manager parameter store values are also deleted.

    Args:
        event (dict): resource id and properties for specific custom resource.
        context (dict): Lambda context object.

    Returns:
        dict: `PhysicalResourceId` containing the now deleted IoT Certificate Arn, used to complete
            the calling _delete_ event.
    """
    logger.info("Starting execution of on_delete function")
    props = event["ResourceProperties"]
    thing_name: str = props["ThingName"]
    # Physical resource id contains the cert arn
    certificate_arn = event["PhysicalResourceId"]
    iot_policy_name: str = props["IoTPolicyName"]
    stack_name: str = props["StackName"]

    c_iot = get_aws_client("iot")
    c_ssm = get_aws_client("ssm")

    # delete ssm parameter store
    try:
        parameter_private_key = f"/{stack_name}/{thing_name}/private_key"
        parameter_certificate_pem = f"/{stack_name}/{thing_name}/certificate_pem"
        c_ssm.delete_parameters(
            Names=[parameter_private_key, parameter_certificate_pem]
        )
    except ClientError as e:
        logger.error(f"Unable to delete parameter store values, {e}")

    # delete policy (prune versions, detach from targets)
    # delete all non active policy versions
    try:
        response = c_iot.list_policy_versions(policyName=iot_policy_name)
        for version in response["policyVersions"]:
            if not version["isDefaultVersion"]:
                c_iot.delete_policy_version(
                    policyName=iot_policy_name, policyVersionId=version["versionId"]
                )
    except ClientError as e:
        logger.error(
            f"Unable to delete policy versions for policy {iot_policy_name}, {e}"
        )
    # Detach any principals
    try:
        response = c_iot.list_targets_for_policy(policyName=iot_policy_name)
        for target in response["targets"]:
            c_iot.detach_policy(policyName=iot_policy_name, target=target)
    except ClientError as e:
        logger.error(f"Unable to detach targets from policy {iot_policy_name}, {e}")
    # delete policy
    try:
        c_iot.delete_policy(policyName=iot_policy_name)
    except ClientError as e:
        logger.error(f"Unable to delete policy {iot_policy_name}, {e}")

    # delete cert
    # detach all policies and things from cert
    try:
        response = c_iot.list_principal_things(principal=certificate_arn)
        for thing in response["things"]:
            c_iot.detach_thing_principal(thingName=thing, principal=certificate_arn)
        response = c_iot.list_attached_policies(target=certificate_arn)
        for policy in response["policies"]:
            c_iot.detach_policy(policyName=policy["policyName"], target=certificate_arn)
    except ClientError as e:
        logger.error(
            f"Unable to list or detach things or policies from certificate {certificate_arn}, {e}"
        )
    try:
        c_iot.update_certificate(
            certificateId=certificate_arn.split("/")[-1], newStatus="REVOKED"
        )
        c_iot.delete_certificate(certificateId=certificate_arn.split("/")[-1])
    except ClientError as e:
        logger.error(f"Unable to delete certificate {certificate_arn}, {e}")

    # delete thing
    # Check and detach principals attached to thing
    try:
        response = c_iot.list_thing_principals(thingName=thing_name)
        for principal in response["principals"]:
            c_iot.detach_thing_principal(thingName=thing_name, principal=principal)
    except ClientError as e:
        logger.error(f"Unable to list or detach principals from {thing_name}, {e}")
    try:
        c_iot.delete_thing(thingName=thing_name)
    except ClientError as e:
        logger.error(f"Error calling iot.delete_thing() for thing: {thing_name}, {e}")
    logger.info("Completed execution of on_create function")
    return event["PhysicalResourceId"]


def on_update(event: dict, context: dict):
    """Steps to take when an _update_ event is received.

    Args:
        event (dict): resource id and properties for specific custom resource.
        context (dict): Lambda context object.

    Returns:
        None: Raises an exception as this feature is not available.

    """
    logger.info("Starting execution of on_update function")
    physical_id = event["PhysicalResourceId"]
    props = event["ResourceProperties"]
    logger.info(f"update physical resource id: {physical_id} with properties: {props}")
    logger.info("Completed execution of on_update function")
    raise Exception("Stack update not implemented yet")
    # uncomment return when feature is developed.
    # return {"PhysicalResourceId": physical_id}
