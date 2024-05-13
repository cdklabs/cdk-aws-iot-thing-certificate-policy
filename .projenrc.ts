// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
import {
  CdklabsConstructLibrary,
  JsiiLanguage,
} from "cdklabs-projen-project-types";
import { ReleasableCommits, javascript } from "projen";
import { NpmAccess } from "projen/lib/javascript";

const CDK_VERSION = "2.138.0";

const project = new CdklabsConstructLibrary({
  name: "@cdklabs/cdk-aws-iot-thing-certificate-policy",
  projenrcTs: true,
  private: false,
  repositoryUrl:
    "https://github.com/cdklabs/cdk-aws-iot-thing-certificate-policy",
  author: "AWS",
  authorAddress: "specialist-iot-sa@amazon.com",
  keywords: ["aws iot", "iot", "thing", "iot policy", "certificate"],
  description:
    "Creates an AWS IoT thing, certificate, policy, and associates the three together",
  license: "Apache-2.0",
  packageName: "@cdklabs/cdk-aws-iot-thing-certificate-policy",
  deps: [],
  devDeps: [
    "cdklabs-projen-project-types",
    "cdk-nag",
    "aws-cdk-lib",
    "awslint",
  ],
  peerDeps: ["aws-cdk-lib"],
  bundledDeps: ["handlebars"],
  jsiiVersion: "^5.4.0",

  defaultReleaseBranch: "main",
  majorVersion: 0,
  stability: "experimental",

  cdkVersion: CDK_VERSION,

  srcdir: "src",
  testdir: "test",

  jsiiTargetLanguages: [
    JsiiLanguage.JAVA,
    JsiiLanguage.PYTHON,
    JsiiLanguage.DOTNET,
    JsiiLanguage.GO,
  ],
  docgen: true,

  // reduce noisy releases to only features and fixes
  releasableCommits: ReleasableCommits.featuresAndFixes(),
  npmAccess: NpmAccess.PUBLIC,

  // Auto approval config
  autoApproveOptions: {
    allowedUsernames: ["gadams999-automation"],
    secret: "GITHUB_TOKEN",
  },
  autoApproveUpgrades: true,
  depsUpgradeOptions: {
    workflowOptions: {
      schedule: javascript.UpgradeDependenciesSchedule.expressions([
        "0 0 * * 1",
      ]),
    },
  },

  pullRequestTemplateContents: [
    `Fixes #
  
  ---
  
  _By submitting this pull request, I confirm that my contribution is made under the terms of the Apache-2.0 license_`,
  ],

  // Code linting config
  prettier: true,
  prettierOptions: {
    settings: {
      semi: true,
      singleQuote: false,
      trailingComma: javascript.TrailingComma.ALL,
    },
  },
});

const common_exclude = [
  "cdk.out",
  "cdk.context.json",
  "images",
  "yarn-error.log",
  "__pycache__",
  ".DS_Store",
  "/tmp/",
  ".direnv/",
];
project.npmignore?.exclude(...common_exclude);
project.npmignore?.include("/src/thing-cert-policy/");
project.gitignore.exclude(...common_exclude);

// Add some other eslint rules followed across this project
project.eslint?.addRules({
  "no-case-declarations": "off",
  "no-bitwise": "off",
  "no-shadow": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/no-shadow": "off",
  "@typescript-eslint/member-ordering": "off",
  "@typescript-eslint/explicit-module-boundary-types": "off",
  "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
  "prettier/prettier": "error",
});

// Don't need to include the TypeScript source files in the tarball; the transpiled JS files and
// typing files are sufficient.
project.addPackageIgnore("*.ts");
project.addPackageIgnore("!*.d.ts");

// local tasks
// design guideline - awslint tool - https://github.com/aws/aws-cdk/blob/main/docs/DESIGN_GUIDELINES.md#preface
const awslintTask = project.addTask("awslint", {
  exec: `
    awslint
  `,
});
project.tasks.tryFind("pre-compile")!.prependSpawn(awslintTask);

// Generating documentation for Typescript and python
// const task = project.tasks.tryFind("docgen");
// if (task) {
//   task.reset();
//   task.exec("rm -f doc/api-*.md");
//   task.exec("jsii-docgen -o doc/api-typescript.md -l typescript");
//   task.exec("jsii-docgen -o doc/api-python.md -l python");
//   task.exec("jsii-docgen -o doc/api-java.md -l java");
//   task.exec("jsii-docgen -o doc/api-csharp.md -l csharp");
//   task.exec("jsii-docgen -o doc/api-go.md -l go");
// }
project.synth();
