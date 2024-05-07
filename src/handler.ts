// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import * as path from "path";
import * as cdk from "aws-cdk-lib";
import { aws_lambda as lambda, aws_logs as logs } from "aws-cdk-lib";
import { Construct } from "constructs";

export interface EventHandlerProps {
  handler: string;
}

export class Handler extends lambda.SingletonFunction {
  public readonly handler: string;
  constructor(scope: Construct, id: string, props: EventHandlerProps) {
    super(scope, id, {
      uuid: `${props.handler}`,
      code: lambda.AssetCode.fromAsset(
        path.join(__dirname, `../src/${props.handler}`),
        {
          bundling: {
            image: lambda.Runtime.PYTHON_3_10.bundlingImage,
            command: [
              "bash",
              "-c",
              "pip install -r requirements.txt -t /asset-output && cp -au . /asset-output",
            ],
          },
        },
      ),
      architecture: lambda.Architecture.ARM_64,
      handler: props.handler + ".handler",
      timeout: cdk.Duration.seconds(300),
      runtime: lambda.Runtime.PYTHON_3_10,
      logRetention: logs.RetentionDays.ONE_WEEK,
    });
    this.handler = props.handler;
  }
}
