# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### IotThingCertificatePolicy <a name="IotThingCertificatePolicy" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy"></a>

Creates and associates an AWS IoT thing, AWS IoT certificate, and AWS IoT policy.

It attaches the certificate to the thing and policy, and then stores the certificate
and private key in AWS Systems Manager Parameter Store parameters for reference
outside of the CloudFormation stack or by other constructs.

Use this construct to create and delete a thing, certificate (principal), and IoT policy for
testing or other singular uses. **Note:** Destroying this stack will fully detach and delete
all created IoT resources.

#### Initializers <a name="Initializers" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer"></a>

```csharp
using CdklabsCdkAwsIotThingCertificatePolicy;

new IotThingCertificatePolicy(Construct Scope, string Id, IotThingCertificatePolicyProps Props);
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.scope">Scope</a></code> | <code>Constructs.Construct</code> | Represents the scope for all the resources. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.id">Id</a></code> | <code>string</code> | This is a scope-unique id. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.props">Props</a></code> | <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps">IotThingCertificatePolicyProps</a></code> | User provided properties for the construct. |

---

##### `Scope`<sup>Required</sup> <a name="Scope" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.scope"></a>

- *Type:* Constructs.Construct

Represents the scope for all the resources.

---

##### `Id`<sup>Required</sup> <a name="Id" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.id"></a>

- *Type:* string

This is a scope-unique id.

---

##### `Props`<sup>Required</sup> <a name="Props" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps">IotThingCertificatePolicyProps</a>

User provided properties for the construct.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.toString">ToString</a></code> | Returns a string representation of this construct. |

---

##### `ToString` <a name="ToString" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.toString"></a>

```csharp
private string ToString()
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.isConstruct">IsConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`IsConstruct`~~ <a name="IsConstruct" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.isConstruct"></a>

```csharp
using CdklabsCdkAwsIotThingCertificatePolicy;

IotThingCertificatePolicy.IsConstruct(object X);
```

Checks if `x` is a construct.

###### `X`<sup>Required</sup> <a name="X" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.isConstruct.parameter.x"></a>

- *Type:* object

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.node">Node</a></code> | <code>Constructs.Node</code> | The tree node. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificateArn">CertificateArn</a></code> | <code>string</code> | Arn of created AWS IoT Certificate. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificatePemParameter">CertificatePemParameter</a></code> | <code>string</code> | Fully qualified name in AWS Systems Manager Parameter Store of the certificate in `PEM` format. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.credentialProviderEndpointAddress">CredentialProviderEndpointAddress</a></code> | <code>string</code> | Fully qualified domain name of the AWS IoT Credential provider endpoint specific to this AWS account and AWS region. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.dataAtsEndpointAddress">DataAtsEndpointAddress</a></code> | <code>string</code> | Fully qualified domain name of the AWS IoT Core data plane endpoint specific to this AWS account and AWS region. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.iotPolicyArn">IotPolicyArn</a></code> | <code>string</code> | Arn of created AWS IoT Policy. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.privateKeySecretParameter">PrivateKeySecretParameter</a></code> | <code>string</code> | Fully qualified name in AWS Systems Manager Parameter Store of the certificate's private key in `PEM` format. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.thingArn">ThingArn</a></code> | <code>string</code> | Arn of created AWS IoT Thing. |

---

##### `Node`<sup>Required</sup> <a name="Node" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.node"></a>

```csharp
public Node Node { get; }
```

- *Type:* Constructs.Node

The tree node.

---

##### `CertificateArn`<sup>Required</sup> <a name="CertificateArn" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificateArn"></a>

```csharp
public string CertificateArn { get; }
```

- *Type:* string

Arn of created AWS IoT Certificate.

---

##### `CertificatePemParameter`<sup>Required</sup> <a name="CertificatePemParameter" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificatePemParameter"></a>

```csharp
public string CertificatePemParameter { get; }
```

- *Type:* string

Fully qualified name in AWS Systems Manager Parameter Store of the certificate in `PEM` format.

---

##### `CredentialProviderEndpointAddress`<sup>Required</sup> <a name="CredentialProviderEndpointAddress" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.credentialProviderEndpointAddress"></a>

```csharp
public string CredentialProviderEndpointAddress { get; }
```

- *Type:* string

Fully qualified domain name of the AWS IoT Credential provider endpoint specific to this AWS account and AWS region.

---

##### `DataAtsEndpointAddress`<sup>Required</sup> <a name="DataAtsEndpointAddress" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.dataAtsEndpointAddress"></a>

```csharp
public string DataAtsEndpointAddress { get; }
```

- *Type:* string

Fully qualified domain name of the AWS IoT Core data plane endpoint specific to this AWS account and AWS region.

---

##### `IotPolicyArn`<sup>Required</sup> <a name="IotPolicyArn" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.iotPolicyArn"></a>

```csharp
public string IotPolicyArn { get; }
```

- *Type:* string

Arn of created AWS IoT Policy.

---

##### `PrivateKeySecretParameter`<sup>Required</sup> <a name="PrivateKeySecretParameter" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.privateKeySecretParameter"></a>

```csharp
public string PrivateKeySecretParameter { get; }
```

- *Type:* string

Fully qualified name in AWS Systems Manager Parameter Store of the certificate's private key in `PEM` format.

---

##### `ThingArn`<sup>Required</sup> <a name="ThingArn" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.thingArn"></a>

```csharp
public string ThingArn { get; }
```

- *Type:* string

Arn of created AWS IoT Thing.

---


## Structs <a name="Structs" id="Structs"></a>

### IotThingCertificatePolicyProps <a name="IotThingCertificatePolicyProps" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps"></a>

Properties for defining an AWS IoT thing, AWS IoT certificate, and AWS IoT policy.

#### Initializer <a name="Initializer" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.Initializer"></a>

```csharp
using CdklabsCdkAwsIotThingCertificatePolicy;

new IotThingCertificatePolicyProps {
    string IotPolicy,
    string IotPolicyName,
    string ThingName,
    string EncryptionAlgorithm = null,
    PolicyMapping[] PolicyParameterMapping = null
};
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicy">IotPolicy</a></code> | <code>string</code> | The AWS IoT policy in JSON format to be created and attached to the certificate. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicyName">IotPolicyName</a></code> | <code>string</code> | Name of the AWS IoT Core policy to create. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.thingName">ThingName</a></code> | <code>string</code> | Name of AWS IoT thing to create. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.encryptionAlgorithm">EncryptionAlgorithm</a></code> | <code>string</code> | Selects RSA or ECC private key and certificate generation. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.policyParameterMapping">PolicyParameterMapping</a></code> | <code><a href="#cdk-aws-iot-thing-certificate-policy.PolicyMapping">PolicyMapping</a>[]</code> | Optional: A `PolicyMapping` object of parameters and values to be replaced if a [mustache-compatible](https://handlebarsjs.com/guide/) template is provided as the `iotPolicy` (see example). For each matching parameter in the policy template, the value will be used. If not provided, only the `{{thingname}}` mapping will be available for the `iotPolicy` template. |

---

##### `IotPolicy`<sup>Required</sup> <a name="IotPolicy" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicy"></a>

```csharp
public string IotPolicy { get; set; }
```

- *Type:* string
- *Default:* None

The AWS IoT policy in JSON format to be created and attached to the certificate.

This is a JSON string that uses [mustache-compatible](https://handlebarsjs.com/guide/)
template substitution to create the AWS IoT policy.

---

##### `IotPolicyName`<sup>Required</sup> <a name="IotPolicyName" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicyName"></a>

```csharp
public string IotPolicyName { get; set; }
```

- *Type:* string
- *Default:* None

Name of the AWS IoT Core policy to create.

---

##### `ThingName`<sup>Required</sup> <a name="ThingName" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.thingName"></a>

```csharp
public string ThingName { get; set; }
```

- *Type:* string
- *Default:* None

Name of AWS IoT thing to create.

---

##### `EncryptionAlgorithm`<sup>Optional</sup> <a name="EncryptionAlgorithm" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.encryptionAlgorithm"></a>

```csharp
public string EncryptionAlgorithm { get; set; }
```

- *Type:* string
- *Default:* RSA

Selects RSA or ECC private key and certificate generation.

If not provided, `RSA` will be used.

---

##### `PolicyParameterMapping`<sup>Optional</sup> <a name="PolicyParameterMapping" id="cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.policyParameterMapping"></a>

```csharp
public PolicyMapping[] PolicyParameterMapping { get; set; }
```

- *Type:* <a href="#cdk-aws-iot-thing-certificate-policy.PolicyMapping">PolicyMapping</a>[]
- *Default:* None

Optional: A `PolicyMapping` object of parameters and values to be replaced if a [mustache-compatible](https://handlebarsjs.com/guide/) template is provided as the `iotPolicy` (see example). For each matching parameter in the policy template, the value will be used. If not provided, only the `{{thingname}}` mapping will be available for the `iotPolicy` template.

---

### PolicyMapping <a name="PolicyMapping" id="cdk-aws-iot-thing-certificate-policy.PolicyMapping"></a>

Policy substitutions provided as key-value pairs.

#### Initializer <a name="Initializer" id="cdk-aws-iot-thing-certificate-policy.PolicyMapping.Initializer"></a>

```csharp
using CdklabsCdkAwsIotThingCertificatePolicy;

new PolicyMapping {
    string Name,
    string Value
};
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.name">Name</a></code> | <code>string</code> | Name of substitution variable, e.g., `region` or `account`. |
| <code><a href="#cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.value">Value</a></code> | <code>string</code> | Value of substitution variable, e.g., `us-east-1` or `12345689012`. |

---

##### `Name`<sup>Required</sup> <a name="Name" id="cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.name"></a>

```csharp
public string Name { get; set; }
```

- *Type:* string

Name of substitution variable, e.g., `region` or `account`.

---

##### `Value`<sup>Required</sup> <a name="Value" id="cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.value"></a>

```csharp
public string Value { get; set; }
```

- *Type:* string

Value of substitution variable, e.g., `us-east-1` or `12345689012`.

---



