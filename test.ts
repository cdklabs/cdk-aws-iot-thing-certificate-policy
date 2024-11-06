import * as cdk from "aws-cdk-lib";
import { IotThingCertificatePolicy } from "./src/index";
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

const app = new cdk.App();

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
