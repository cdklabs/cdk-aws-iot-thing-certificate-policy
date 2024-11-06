// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as cdk from "aws-cdk-lib";
import * as iam from "aws-cdk-lib/aws-iam";
import { Construct } from "constructs";
import * as handlebars from "handlebars";
import { Handler } from "./handler";
import { Provider } from "./provider";

/**
 * Policy substitutions provided as key-value pairs. Done this way to be JSII compatible.
 */
export interface PolicyMapping {
  /**
   * Name of substitution variable, e.g., `region` or `account`.
   */
  readonly name: string;
  /**
   * Value of substitution variable, e.g., `us-east-1` or `12345689012`
   */
  readonly value: string;
}

/**
 * Properties for defining an AWS IoT thing, AWS IoT certificate, and AWS IoT
 * policy.
 * @summary The properties for the IotThingCertificatePolicy class.
 */
export interface IotThingCertificatePolicyProps {
  /**
   * Name of AWS IoT thing to create.
   *
   * @default - None
   */
  readonly thingName: string;
  /**
   * Name of the AWS IoT Core policy to create.
   *
   * @default - None
   */
  readonly iotPolicyName: string;
  /**
   * The AWS IoT policy in JSON format to be created and attached to the certificate.
   * This is a JSON string that uses [mustache-compatible](https://handlebarsjs.com/guide/)
   * template substitution to create the AWS IoT policy.
   *
   * @default - None
   */
  readonly iotPolicy: string;
  /**
   * Optional: A `PolicyMapping` object of parameters and values to be replaced if a
   * [mustache-compatible](https://handlebarsjs.com/guide/) template is
   * provided as the `iotPolicy` (see example).
   * For each matching parameter in the policy template, the value
   * will be used. If not provided, only the `{{thingname}}` mapping will be available for the
   * `iotPolicy` template.
   *
   * @default - None
   */
  readonly policyParameterMapping?: PolicyMapping[];
  /**
   * Selects RSA or ECC private key and certificate generation. If not provided, `RSA` will be used.
   *
   * @default - RSA
   */
  readonly encryptionAlgorithm?: string;
  /**
   * Optional: An [RFC 4514 string](https://datatracker.ietf.org/doc/html/rfc4514#section-4) containing the
   * requested _Subject_ named attributes for the certificate signing request. The string must start with the
   * "leaf", or Common Name (CN) relative distinguished name (RDN), and then followed by the rest of the optional
   * RDNs. Example: `CN=myThingName,OU=My Local Org,O=My Company,L=Seattle,S=Washington,C=US`
   *
   * @default - None
   */
  readonly x509Subject?: string;
}

/**
 * Creates and associates an AWS IoT thing, AWS IoT certificate, and AWS IoT policy.
 * It attaches the certificate to the thing and policy, and then stores the certificate
 * and private key in AWS Systems Manager Parameter Store parameters for reference
 * outside of the CloudFormation stack or by other constructs.
 *
 * Use this construct to create and delete a thing, certificate (principal), and IoT policy for
 * testing or other singular uses. **Note:** Destroying this stack will fully detach and delete
 * all created IoT resources including the AWS IoT thing, certificate, and policy.
 *
 * @summary Creates and associates an AWS IoT thing, certificate and policy.
 */
export class IotThingCertificatePolicy extends Construct {
  /**
   * Arn of created AWS IoT Thing.
   */
  public readonly thingArn: string;
  /**
   * Arn of created AWS IoT Policy.
   */
  public readonly iotPolicyArn: string;
  /**
   * Arn of created AWS IoT Certificate.
   */
  public readonly certificateArn: string;
  /**
   * Fully qualified name in AWS Systems Manager Parameter Store of the certificate in `PEM` format.
   */
  public readonly certificatePemParameter: string;
  /**
   * Fully qualified name in AWS Systems Manager Parameter Store of the certificate's private key in `PEM` format.
   */
  public readonly privateKeySecretParameter: string;
  /**
   * Fully qualified domain name of the AWS IoT Core data plane endpoint specific to this AWS account and AWS region.
   */
  public readonly dataAtsEndpointAddress: string;
  /**
   * Fully qualified domain name of the AWS IoT Credential provider endpoint specific to this AWS account and AWS region.
   */
  public readonly credentialProviderEndpointAddress: string;
  private customResourceName = "IotThingCertificatePolicyFunction";

  /**
   * @summary Constructs a new instance of the `IotThingCertificatePolicy` class.
   * @param {cdp.App} scope Represents the scope for all the resources.
   * @param {string} id This is a scope-unique id.
   * @param {IotThingCertificatePolicyProps} props User provided properties for the construct.
   * @since 2.138.0
   */
  constructor(
    scope: Construct,
    id: string,
    props: IotThingCertificatePolicyProps,
  ) {
    super(scope, id);

    const stackName = cdk.Stack.of(this).stackName;
    // Validate and derive final values for resources
    const encryptionAlgorithm = props.encryptionAlgorithm || "RSA";
    if (!["RSA", "ECC"].includes(encryptionAlgorithm)) {
      throw new Error(
        "Invalid value for encryptionAlgorithm, use either 'RSA' or 'ECC'. By default 'RSA' is used if encryptionAlgorithm is not provided.",
      );
    }

    /**
     * For the AWS IoT policy, the name/value from PolicyMapping are created,
     * along with name: "thingname" and value: props.thingName, and then
     * using substituted from the provided iotPolicy template.
     */
    const policyParameters: Record<string, string> = {};
    policyParameters.thingname = props.thingName;
    if (props.policyParameterMapping) {
      props.policyParameterMapping.forEach((element) => {
        policyParameters[element.name] = element.value;
      });
    }
    // handlebars (mustache) creation of iot policy from template and validate proper JSON
    const template = handlebars.compile(props.iotPolicy);
    const iotPolicy = template(policyParameters);
    try {
      JSON.parse(iotPolicy);
    } catch (error) {
      throw new Error(
        "Invalid JSON for iotPolicy, verify template syntax and parameters will create valid JSON.",
      );
    }

    /**
     *  If a subject string is provided, validate, and add Common Name (CN) set to thingName
     * if not already provided.
     */
    let x509Subject: string;
    if (props.x509Subject) {
      // Verify that CN is provided.
      const cnRegex = /CN=([^,]*)/;
      const match = props.x509Subject.match(cnRegex);
      if (match) {
        x509Subject = props.x509Subject;
      } else {
        throw new Error(
          "Invalid x509Subject, must contain a Common Name (CN).",
        );
      }
    } else {
      x509Subject = `CN=${props.thingName},OU=Amazon Web Services,O=Amazon.com Inc.,L=Seattle,ST=Washington,C=US`;
    }

    const handler = new Handler(this, "Handler", {
      handler: "thing_cert_policy",
    });

    const customResource = new cdk.CustomResource(
      this,
      this.customResourceName,
      {
        serviceToken: Provider.getOrCreate(this, handler).provider.serviceToken,
        properties: {
          StackName: stackName,
          ThingName: props.thingName,
          IotPolicy: iotPolicy,
          IoTPolicyName: props.iotPolicyName,
          EncryptionAlgorithm: encryptionAlgorithm,
          x509Subject: x509Subject,
        },
      },
    );

    // Custom resource Lambda role permissions
    // The addition to the handler role works, excluding to clean up jest branch execution output

    // Permissions to act on thing, certificate, and policy
    /* c8 ignore next */
    handler.role?.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ["iot:CreateThing", "iot:DeleteThing"],
        resources: [
          `arn:${cdk.Fn.ref("AWS::Partition")}:iot:${cdk.Fn.ref(
            "AWS::Region",
          )}:${cdk.Fn.ref("AWS::AccountId")}:thing/${props.thingName}`,
        ],
      }),
    );

    // Create and delete specific IoT policy
    /* c8 ignore next */
    handler.role?.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: [
          "iot:CreatePolicy",
          "iot:DeletePolicy",
          "iot:DeletePolicyVersion",
          "iot:ListPolicyVersions",
          "iot:ListTargetsForPolicy",
        ],
        resources: [
          `arn:${cdk.Fn.ref("AWS::Partition")}:iot:${cdk.Fn.ref(
            "AWS::Region",
          )}:${cdk.Fn.ref("AWS::AccountId")}:policy/${props.iotPolicyName}`,
        ],
      }),
    );

    // Create SSM parameter
    /* c8 ignore next */
    handler.role?.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: ["ssm:DeleteParameters", "ssm:PutParameter"],
        resources: [
          `arn:${cdk.Fn.ref("AWS::Partition")}:ssm:${cdk.Fn.ref(
            "AWS::Region",
          )}:${cdk.Fn.ref("AWS::AccountId")}:parameter/${stackName}/${
            props.thingName
          }/private_key`,
          `arn:${cdk.Fn.ref("AWS::Partition")}:ssm:${cdk.Fn.ref(
            "AWS::Region",
          )}:${cdk.Fn.ref("AWS::AccountId")}:parameter/${stackName}/${
            props.thingName
          }/certificate_pem`,
        ],
      }),
    );

    // Actions without resource types
    /* c8 ignore next */
    handler.role?.addToPrincipalPolicy(
      new iam.PolicyStatement({
        actions: [
          "iot:AttachPolicy",
          "iot:AttachThingPrincipal",
          "iot:CreateCertificateFromCsr",
          "iot:DeleteCertificate",
          "iot:DescribeEndpoint",
          "iot:DetachPolicy",
          "iot:DetachThingPrincipal",
          "iot:ListAttachedPolicies",
          "iot:ListPrincipalThings",
          "iot:ListThingPrincipals",
          "iot:UpdateCertificate",
        ],
        resources: ["*"],
      }),
    );

    // class public values
    this.certificatePemParameter = customResource.getAttString(
      "CertificatePemParameter",
    );
    this.privateKeySecretParameter = customResource.getAttString(
      "PrivateKeySecretParameter",
    );
    this.thingArn = customResource.getAttString("ThingArn");
    this.iotPolicyArn = customResource.getAttString("IotPolicyArn");
    this.certificateArn = customResource.getAttString("CertificateArn");
    this.dataAtsEndpointAddress = customResource.getAttString(
      "DataAtsEndpointAddress",
    );
    this.credentialProviderEndpointAddress = customResource.getAttString(
      "CredentialProviderEndpointAddress",
    );
  }
}
