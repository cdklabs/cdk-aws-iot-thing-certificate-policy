# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### IotThingCertificatePolicy <a name="IotThingCertificatePolicy" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy"></a>

Creates and associates an AWS IoT thing, AWS IoT certificate, and AWS IoT policy.

It attaches the certificate to the thing and policy, and then stores the certificate
and private key in AWS Systems Manager Parameter Store parameters for reference
outside of the CloudFormation stack or by other constructs.

Use this construct to create and delete a thing, certificate (principal), and IoT policy for
testing or other singular uses. **Note:** Destroying this stack will fully detach and delete
all created IoT resources.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer"></a>

```java
import io.github.cdklabs.cdk.aws.iot.thing.certificate.policy.IotThingCertificatePolicy;

IotThingCertificatePolicy.Builder.create(Construct scope, java.lang.String id)
    .iotPolicy(java.lang.String)
    .iotPolicyName(java.lang.String)
    .thingName(java.lang.String)
//  .encryptionAlgorithm(java.lang.String)
//  .policyParameterMapping(java.util.List<PolicyMapping>)
    .build();
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.scope">scope</a></code> | <code>software.constructs.Construct</code> | Represents the scope for all the resources. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.id">id</a></code> | <code>java.lang.String</code> | This is a scope-unique id. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.iotPolicy">iotPolicy</a></code> | <code>java.lang.String</code> | The AWS IoT policy in JSON format to be created and attached to the certificate. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.iotPolicyName">iotPolicyName</a></code> | <code>java.lang.String</code> | Name of the AWS IoT Core policy to create. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.thingName">thingName</a></code> | <code>java.lang.String</code> | Name of AWS IoT thing to create. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.encryptionAlgorithm">encryptionAlgorithm</a></code> | <code>java.lang.String</code> | Selects RSA or ECC private key and certificate generation. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.policyParameterMapping">policyParameterMapping</a></code> | <code>java.util.List<<a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping">PolicyMapping</a>></code> | Optional: A `PolicyMapping` object of parameters and values to be replaced if a [mustache-compatible](https://handlebarsjs.com/guide/) template is provided as the `iotPolicy` (see example). For each matching parameter in the policy template, the value will be used. If not provided, only the `{{thingname}}` mapping will be available for the `iotPolicy` template. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.scope"></a>

- *Type:* software.constructs.Construct

Represents the scope for all the resources.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.id"></a>

- *Type:* java.lang.String

This is a scope-unique id.

---

##### `iotPolicy`<sup>Required</sup> <a name="iotPolicy" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.iotPolicy"></a>

- *Type:* java.lang.String
- *Default:* None

The AWS IoT policy in JSON format to be created and attached to the certificate.

This is a JSON string that uses [mustache-compatible](https://handlebarsjs.com/guide/)
template substitution to create the AWS IoT policy.

---

##### `iotPolicyName`<sup>Required</sup> <a name="iotPolicyName" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.iotPolicyName"></a>

- *Type:* java.lang.String
- *Default:* None

Name of the AWS IoT Core policy to create.

---

##### `thingName`<sup>Required</sup> <a name="thingName" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.thingName"></a>

- *Type:* java.lang.String
- *Default:* None

Name of AWS IoT thing to create.

---

##### `encryptionAlgorithm`<sup>Optional</sup> <a name="encryptionAlgorithm" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.encryptionAlgorithm"></a>

- *Type:* java.lang.String
- *Default:* RSA

Selects RSA or ECC private key and certificate generation.

If not provided, `RSA` will be used.

---

##### `policyParameterMapping`<sup>Optional</sup> <a name="policyParameterMapping" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.policyParameterMapping"></a>

- *Type:* java.util.List<<a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping">PolicyMapping</a>>
- *Default:* None

Optional: A `PolicyMapping` object of parameters and values to be replaced if a [mustache-compatible](https://handlebarsjs.com/guide/) template is provided as the `iotPolicy` (see example). For each matching parameter in the policy template, the value will be used. If not provided, only the `{{thingname}}` mapping will be available for the `iotPolicy` template.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.toString"></a>

```java
public java.lang.String toString()
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.isConstruct"></a>

```java
import io.github.cdklabs.cdk.aws.iot.thing.certificate.policy.IotThingCertificatePolicy;

IotThingCertificatePolicy.isConstruct(java.lang.Object x)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.isConstruct.parameter.x"></a>

- *Type:* java.lang.Object

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.node">node</a></code> | <code>software.constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificateArn">certificateArn</a></code> | <code>java.lang.String</code> | Arn of created AWS IoT Certificate. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificatePemParameter">certificatePemParameter</a></code> | <code>java.lang.String</code> | Fully qualified name in AWS Systems Manager Parameter Store of the certificate in `PEM` format. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.credentialProviderEndpointAddress">credentialProviderEndpointAddress</a></code> | <code>java.lang.String</code> | Fully qualified domain name of the AWS IoT Credential provider endpoint specific to this AWS account and AWS region. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.dataAtsEndpointAddress">dataAtsEndpointAddress</a></code> | <code>java.lang.String</code> | Fully qualified domain name of the AWS IoT Core data plane endpoint specific to this AWS account and AWS region. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.iotPolicyArn">iotPolicyArn</a></code> | <code>java.lang.String</code> | Arn of created AWS IoT Policy. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.privateKeySecretParameter">privateKeySecretParameter</a></code> | <code>java.lang.String</code> | Fully qualified name in AWS Systems Manager Parameter Store of the certificate's private key in `PEM` format. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.thingArn">thingArn</a></code> | <code>java.lang.String</code> | Arn of created AWS IoT Thing. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.node"></a>

```java
public Node getNode();
```

- *Type:* software.constructs.Node

The tree node.

---

##### `certificateArn`<sup>Required</sup> <a name="certificateArn" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificateArn"></a>

```java
public java.lang.String getCertificateArn();
```

- *Type:* java.lang.String

Arn of created AWS IoT Certificate.

---

##### `certificatePemParameter`<sup>Required</sup> <a name="certificatePemParameter" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificatePemParameter"></a>

```java
public java.lang.String getCertificatePemParameter();
```

- *Type:* java.lang.String

Fully qualified name in AWS Systems Manager Parameter Store of the certificate in `PEM` format.

---

##### `credentialProviderEndpointAddress`<sup>Required</sup> <a name="credentialProviderEndpointAddress" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.credentialProviderEndpointAddress"></a>

```java
public java.lang.String getCredentialProviderEndpointAddress();
```

- *Type:* java.lang.String

Fully qualified domain name of the AWS IoT Credential provider endpoint specific to this AWS account and AWS region.

---

##### `dataAtsEndpointAddress`<sup>Required</sup> <a name="dataAtsEndpointAddress" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.dataAtsEndpointAddress"></a>

```java
public java.lang.String getDataAtsEndpointAddress();
```

- *Type:* java.lang.String

Fully qualified domain name of the AWS IoT Core data plane endpoint specific to this AWS account and AWS region.

---

##### `iotPolicyArn`<sup>Required</sup> <a name="iotPolicyArn" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.iotPolicyArn"></a>

```java
public java.lang.String getIotPolicyArn();
```

- *Type:* java.lang.String

Arn of created AWS IoT Policy.

---

##### `privateKeySecretParameter`<sup>Required</sup> <a name="privateKeySecretParameter" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.privateKeySecretParameter"></a>

```java
public java.lang.String getPrivateKeySecretParameter();
```

- *Type:* java.lang.String

Fully qualified name in AWS Systems Manager Parameter Store of the certificate's private key in `PEM` format.

---

##### `thingArn`<sup>Required</sup> <a name="thingArn" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.thingArn"></a>

```java
public java.lang.String getThingArn();
```

- *Type:* java.lang.String

Arn of created AWS IoT Thing.

---


## Structs <a name="Structs" id="Structs"></a>

### IotThingCertificatePolicyProps <a name="IotThingCertificatePolicyProps" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps"></a>

Properties for defining an AWS IoT thing, AWS IoT certificate, and AWS IoT policy.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.Initializer"></a>

```java
import io.github.cdklabs.cdk.aws.iot.thing.certificate.policy.IotThingCertificatePolicyProps;

IotThingCertificatePolicyProps.builder()
    .iotPolicy(java.lang.String)
    .iotPolicyName(java.lang.String)
    .thingName(java.lang.String)
//  .encryptionAlgorithm(java.lang.String)
//  .policyParameterMapping(java.util.List<PolicyMapping>)
    .build();
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicy">iotPolicy</a></code> | <code>java.lang.String</code> | The AWS IoT policy in JSON format to be created and attached to the certificate. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicyName">iotPolicyName</a></code> | <code>java.lang.String</code> | Name of the AWS IoT Core policy to create. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.thingName">thingName</a></code> | <code>java.lang.String</code> | Name of AWS IoT thing to create. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.encryptionAlgorithm">encryptionAlgorithm</a></code> | <code>java.lang.String</code> | Selects RSA or ECC private key and certificate generation. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.policyParameterMapping">policyParameterMapping</a></code> | <code>java.util.List<<a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping">PolicyMapping</a>></code> | Optional: A `PolicyMapping` object of parameters and values to be replaced if a [mustache-compatible](https://handlebarsjs.com/guide/) template is provided as the `iotPolicy` (see example). For each matching parameter in the policy template, the value will be used. If not provided, only the `{{thingname}}` mapping will be available for the `iotPolicy` template. |

---

##### `iotPolicy`<sup>Required</sup> <a name="iotPolicy" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicy"></a>

```java
public java.lang.String getIotPolicy();
```

- *Type:* java.lang.String
- *Default:* None

The AWS IoT policy in JSON format to be created and attached to the certificate.

This is a JSON string that uses [mustache-compatible](https://handlebarsjs.com/guide/)
template substitution to create the AWS IoT policy.

---

##### `iotPolicyName`<sup>Required</sup> <a name="iotPolicyName" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicyName"></a>

```java
public java.lang.String getIotPolicyName();
```

- *Type:* java.lang.String
- *Default:* None

Name of the AWS IoT Core policy to create.

---

##### `thingName`<sup>Required</sup> <a name="thingName" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.thingName"></a>

```java
public java.lang.String getThingName();
```

- *Type:* java.lang.String
- *Default:* None

Name of AWS IoT thing to create.

---

##### `encryptionAlgorithm`<sup>Optional</sup> <a name="encryptionAlgorithm" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.encryptionAlgorithm"></a>

```java
public java.lang.String getEncryptionAlgorithm();
```

- *Type:* java.lang.String
- *Default:* RSA

Selects RSA or ECC private key and certificate generation.

If not provided, `RSA` will be used.

---

##### `policyParameterMapping`<sup>Optional</sup> <a name="policyParameterMapping" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.policyParameterMapping"></a>

```java
public java.util.List<PolicyMapping> getPolicyParameterMapping();
```

- *Type:* java.util.List<<a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping">PolicyMapping</a>>
- *Default:* None

Optional: A `PolicyMapping` object of parameters and values to be replaced if a [mustache-compatible](https://handlebarsjs.com/guide/) template is provided as the `iotPolicy` (see example). For each matching parameter in the policy template, the value will be used. If not provided, only the `{{thingname}}` mapping will be available for the `iotPolicy` template.

---

### PolicyMapping <a name="PolicyMapping" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping"></a>

Policy substitutions provided as key-value pairs.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.Initializer"></a>

```java
import io.github.cdklabs.cdk.aws.iot.thing.certificate.policy.PolicyMapping;

PolicyMapping.builder()
    .name(java.lang.String)
    .value(java.lang.String)
    .build();
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.name">name</a></code> | <code>java.lang.String</code> | Name of substitution variable, e.g., `region` or `account`. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.value">value</a></code> | <code>java.lang.String</code> | Value of substitution variable, e.g., `us-east-1` or `12345689012`. |

---

##### `name`<sup>Required</sup> <a name="name" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.name"></a>

```java
public java.lang.String getName();
```

- *Type:* java.lang.String

Name of substitution variable, e.g., `region` or `account`.

---

##### `value`<sup>Required</sup> <a name="value" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.value"></a>

```java
public java.lang.String getValue();
```

- *Type:* java.lang.String

Value of substitution variable, e.g., `us-east-1` or `12345689012`.

---



