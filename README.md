# AWS IoT Thing, Certificate, and Policy Construct Library

![cdk-constructs: Experimental](https://img.shields.io/badge/cdk--constructs-experimental-important.svg?style=for-the-badge)

[![View on Construct Hub](https://constructs.dev/badge?package=cdk-aws-iot-thing-certificate-policy)](https://constructs.dev/packages/cdk-aws-iot-thing-certificate-policy)

An [L3 CDK construct](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html#constructs_lib) to create and associate a singular AWS IoT Thing, Certificate, and IoT Policy. The construct also retrieves and returns AWS IoT account specific details such as the AWS IoT data endpoint and the AWS IoT Credential provider endpoint.

The certificate and its private key are stored as AWS Systems Manager Parameter Store parameters that can be retrieved via the AWS Console or programmatically via construct members.

## Installation and use

<details>
  <summary><b>TypeScript</b></summary>

**Installation:**

```shell
npm install cdk-aws-iot-thing-certificate-policy
```

[**API Reference**](doc/api-typescript.md)

**Example:**

```ts
import * as cdk from "aws-cdk-lib";
import { IotThingCertificatePolicy } from "@cdklabs/cdk-aws-iot-thing-certificate-policy";
/**
 * A minimum IoT Policy template using substitution variables for actual
 * policy to be deployed for "region", "account", and "thingname". Allows
 * the thing to publish and subscribe on any topics under "thing/*" topic
 * namespace. Normal IoT Policy conventions such as "*", apply.
 */
const minimalIotPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["iot:Connect"],
      "Resource": "arn:aws:iot:{{region}}:{{account}}:client/{{thingname}}"
    },
    {
      "Effect": "Allow",
      "Action": ["iot:Publish"],
      "Resource": [
        "arn:aws:iot:{{region}}:{{account}}:topic/{{thingname}}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["iot:Subscribe"],
      "Resource": [
        "arn:aws:iot:{{region}}:{{account}}:topicfilter/{{thingname}}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["iot:Receive"],
      "Resource": [
        "arn:aws:iot:{{region}}:{{account}}:topic/{{thingname}}/*"
      ]
    }
  ]
}`;

const app = new cdk.App()

/**
 * Create the thing, certificate, and policy, then associate the
 * certificate to both the thing and the policy and fully activate.
 */
const fooThing = new IotThingCertificatePolicy(app, "MyFooThing", {
  thingName: "foo-thing", // Name to assign to AWS IoT thing, and value for {{thingname}} in policy template
  iotPolicyName: "foo-iot-policy", // Name to assign to AWS IoT policy
  iotPolicy: minimalIotPolicy, // Policy with or without substitution parameters from above
  encryptionAlgorithm: "ECC", // Algorithm to use to private key (RSA or ECC)
  policyParameterMapping: [
    // substitution names and values for AWS IoT policy template, e.g., {{region}} and {{account}}
    {
      name: "region",
      value: cdk.Fn.ref("AWS::Region"),
    },
    {
      name: "account",
      value: cdk.Fn.ref("AWS::AccountId"),
    },
  ],
});

// The AWS IoT Thing Arn as a stack output
new cdk.CfnOutput(app, "ThingArn", {
  value: fooThing.thingArn,
});
// The AWS account unique endpoint for the MQTT data connection
// See API for other available public values that can be referenced
new cdk.CfnOutput(app, "IotEndpoint", {
  value: fooThing.dataAtsEndpointAddress,
});
```
</details>


<details>
  <summary><b>Python</b></summary>

**Installation:**

```shell
pip install cdklabs.cdk-aws-iot-thing-certificate-policy
```

[**API Reference**](doc/api-python.md)



**Example:**

```python
import aws_cdk as cdk
from cdklabs.cdk_aws_iot_thing_certificate_policy import (
    IotThingCertificatePolicy,
)

minimal_iot_policy = """{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["iot:Connect"],
      "Resource": "arn:aws:iot:{{region}}:{{account}}:client/{{thingname}}"
    },
    {
      "Effect": "Allow",
      "Action": ["iot:Publish"],
      "Resource": [
        "arn:aws:iot:{{region}}:{{account}}:topic/{{thingname}}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["iot:Subscribe"],
      "Resource": [
        "arn:aws:iot:{{region}}:{{account}}:topicfilter/{{thingname}}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["iot:Receive"],
      "Resource": [
        "arn:aws:iot:{{region}}:{{account}}:topic/{{thingname}}/*"
      ]
    }
  ]
}"""

app = cdk.App()

foo_thing = IotThingCertificatePolicy(
    app,
    "MyFooThing",
    thing_name="foo-thing",
    iot_policy_name="foo-iot-policy",
    iot_policy=minimal_iot_policy,
    encryption_algorithm="ECC",
    policy_parameter_mapping=[
        {
            "name": "region",
            "value": cdk.Fn.ref("AWS::Region")
        },
        {
            "name": "account",
            "value": cdk.Fn.ref("AWS::AccountId")
        }
    ],
)
cdk.CfnOutput(app, "ThingArn", value=foo_thing.thing_arn)
cdk.CfnOutput(app, "IotEndpoint", value=foo_thing.data_ats_endpoint_address)
```

</details>

<details>
  <summary><b>Java</b></summary>

**Installation:**

```shell
Coming Soon
```

[**API Reference**](doc/api-java.md)

**Example:** _Coming soon_
</details>

<details>
  <summary><b>C#</b></summary>

**Installation:**

```shell
dotnet add package Cdklabs.CdkAwsIotThingCertificatePolicy
```

[**API Reference**](doc/api-csharp.md)

**Example:** _coming soon_
</details>

<details>
  <summary><b>Go</b></summary>

**Installation:**

```shell
Coming soon
```

[**API Reference**](doc/api-go.md)

**Example:** _coming soon_
</details>
