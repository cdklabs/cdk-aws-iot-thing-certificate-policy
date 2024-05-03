// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as cdk from "aws-cdk-lib";
import { Template, Annotations, Match } from "aws-cdk-lib/assertions";
import { AwsSolutionsChecks, NagSuppressions } from "cdk-nag";
import { Construct } from "constructs";
import { IotThingCertificatePolicy } from "../src/index";

const minimalIoTPolicy = `{
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
          "arn:aws:iot:{{region}}:{{account}}:topic/{{thingname}}/foo/*"
        ]
      },
      {
        "Effect": "Allow",
        "Action": ["iot:Subscribe"],
        "Resource": [
          "arn:aws:iot:{{region}}:{{account}}:topicfilter/{{thingname}}/bar/*"
        ]
      },
      {
        "Effect": "Allow",
        "Action": ["iot:Receive"],
        "Resource": [
          "arn:aws:iot:{{region}}:{{account}}:topic/{{thingname}}/bar/*"
        ]
      }
    ]
  }`;

// Invalid JSON when parsed (trailing comma after singular Statement object)
const badIoTPolicy = `{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Action": ["iot:Connect"],
        "Resource": "arn:aws:iot:{{region}}:{{account}}:client/{{thingname}}"
      },
    ]
  }`;

const env = {
  region: process.env.CDK_DEFAULT_REGION || "us-east-1",
  account: process.env.CDK_DEFAULT_ACCOUNT,
};

export class TwoResourceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new IotThingCertificatePolicy(this, "test-construct1", {
      thingName: "test1",
      iotPolicyName: "test_policyname1",
      iotPolicy: minimalIoTPolicy,
      encryptionAlgorithm: "ECC",
      policyParameterMapping: [
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
    // Create two resources to verify handler and provider code coverage
    new IotThingCertificatePolicy(this, "test-construct2", {
      thingName: "test2",
      iotPolicyName: "test_policyname2",
      iotPolicy: minimalIoTPolicy,
      // purposefully leave out following line to test default
      // encryptionAlgorithm: "RSA",
      policyParameterMapping: [
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
  }
}

export class BadAlgoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new IotThingCertificatePolicy(this, "test-construct1", {
      thingName: "test1",
      iotPolicyName: "test_policyname1",
      iotPolicy: minimalIoTPolicy,
      encryptionAlgorithm: "FOO",
      policyParameterMapping: [
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
  }
}

export class BadIotPolicyStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new IotThingCertificatePolicy(this, "test-construct1", {
      thingName: "test1",
      iotPolicyName: "test_policyname1",
      // pass an invalid IoT policy string
      iotPolicy: badIoTPolicy,
      encryptionAlgorithm: "ECC",
      policyParameterMapping: [
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
  }
}

describe("TwoResourceStack", () => {
  let app: cdk.App;
  let stack: TwoResourceStack;
  beforeEach(() => {
    // GIVEN
    app = new cdk.App();
    stack = new TwoResourceStack(app, "ConstructTestStack", {
      env,
    });
    app.synth();
    // WHEN
    cdk.Aspects.of(stack).add(new AwsSolutionsChecks({ verbose: true }));
    NagSuppressions.addResourceSuppressionsByPath(
      stack,
      "/ConstructTestStack/SingletonLambdathingcertpolicy/ServiceRole/Resource",
      [
        {
          id: "AwsSolutions-IAM4",
          reason: "SingletonLambda is controlled internally by CDK",
        },
      ],
      true,
    );
    NagSuppressions.addResourceSuppressionsByPath(
      stack,
      "/ConstructTestStack/SingletonLambdathingcertpolicy/ServiceRole/DefaultPolicy/Resource",
      [
        {
          id: "AwsSolutions-IAM5",
          reason: "SingletonLambda is controlled internally by CDK",
        },
      ],
      true,
    );
    NagSuppressions.addResourceSuppressionsByPath(
      stack,
      "/ConstructTestStack/SingletonLambdathingcertpolicy/Resource",
      [
        {
          id: "AwsSolutions-L1",
          reason: "SingletonLambda is controlled internally by CDK",
        },
      ],
      true,
    );
    NagSuppressions.addResourceSuppressionsByPath(
      stack,
      "/ConstructTestStack/LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8a/ServiceRole/Resource",
      [
        {
          id: "AwsSolutions-IAM4",
          reason:
            "SingletonLambda BasicExecution log retention is controlled internally by CDK",
        },
      ],
      true,
    );
    NagSuppressions.addResourceSuppressionsByPath(
      stack,
      "/ConstructTestStack/LogRetentionaae0aa3c5b4d4f87b02d85b201efdd8a/ServiceRole/DefaultPolicy/Resource",
      [
        {
          id: "AwsSolutions-IAM5",
          reason:
            "SingletonLambda BasicExecution log retention is controlled internally by CDK",
        },
      ],
      true,
    );
    NagSuppressions.addResourceSuppressionsByPath(
      stack,
      "/ConstructTestStack/thing_cert_policy-provider/Provider/framework-onEvent/ServiceRole/Resource",
      [
        {
          id: "AwsSolutions-IAM4",
          reason: "Provider construct is controlled internally by CDK",
        },
      ],
      true,
    );
    NagSuppressions.addResourceSuppressionsByPath(
      stack,
      "/ConstructTestStack/thing_cert_policy-provider/Provider/framework-onEvent/ServiceRole/DefaultPolicy/Resource",
      [
        {
          id: "AwsSolutions-IAM5",
          reason: "Provider construct onEvent is controlled internally by CDK",
        },
      ],
      true,
    );
    NagSuppressions.addResourceSuppressionsByPath(
      stack,
      "/ConstructTestStack/thing_cert_policy-provider/Provider/framework-onEvent/Resource",
      [
        {
          id: "AwsSolutions-L1",
          reason: "Provider construct onEvent is controlled internally by CDK",
        },
      ],
      true,
    );
  });
  // THEN
  test("synthesizes they way we expect", () => {
    // prepare stack for assertions
    const template = Template.fromStack(stack);
    template.hasResourceProperties("AWS::Lambda::Function", {
      Handler: "thing_cert_policy.handler",
      Runtime: "python3.10",
    });
  });
  test("No unsuppressed cdk-nag Warnings", () => {
    const warnings = Annotations.fromStack(stack).findWarning(
      "*",
      Match.stringLikeRegexp("AwsSolutions-.*"),
    );
    expect(warnings).toHaveLength(0);
  });
  test("No unsuppressed cdk-nag Errors", () => {
    const errors = Annotations.fromStack(stack).findError(
      "*",
      Match.stringLikeRegexp("AwsSolutions-.*"),
    );
    if (errors.length > 0) {
      console.log(errors);
    }
    expect(errors).toHaveLength(0);
  });
});

describe("Default arguments", () => {});

describe("Invalid Arguments to construct", () => {
  describe("given an invalid encryption algorithm", () => {
    test("composed of 'FOO'", () => {
      expect(() => {
        const app = new cdk.App();
        new BadAlgoStack(app, "ConstructTestStack", {
          env,
        });
      }).toThrow(
        "Invalid value for encryptionAlgorithm, use either 'RSA' or 'ECC'.",
      );
    });
  });

  describe("given an invalid IoT policy", () => {
    test("with trailing comma", () => {
      expect(() => {
        const app = new cdk.App();
        new BadIotPolicyStack(app, "ConstructTestStack", {
          env,
        });
      }).toThrow(
        "Invalid JSON for iotPolicy, verify template syntax and parameters will create valid JSON.",
      );
    });
  });
});
