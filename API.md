# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### IotThingCertificatePolicy <a name="IotThingCertificatePolicy" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy"></a>

Creates and associates an AWS IoT thing, AWS IoT certificate, and AWS IoT policy.

It attaches the certificate to the thing and policy, and then stores the certificate
and private key in AWS Systems Manager Parameter Store parameters for reference
outside of the CloudFormation stack or by other constructs.

Use this construct to create and delete a thing, certificate (principal), and IoT policy for
testing or other singular uses. **Note:** Destroying this stack will fully detach and delete
all created IoT resources including the AWS IoT thing, certificate, and policy.

#### Initializers <a name="Initializers" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer"></a>

```typescript
import { IotThingCertificatePolicy } from '@cdklabs/cdk-aws-iot-thing-certificate-policy'

new IotThingCertificatePolicy(scope: Construct, id: string, props: IotThingCertificatePolicyProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | Represents the scope for all the resources. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.id">id</a></code> | <code>string</code> | This is a scope-unique id. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.props">props</a></code> | <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps">IotThingCertificatePolicyProps</a></code> | User provided properties for the construct. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

Represents the scope for all the resources.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.id"></a>

- *Type:* string

This is a scope-unique id.

---

##### `props`<sup>Required</sup> <a name="props" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.props"></a>

- *Type:* <a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps">IotThingCertificatePolicyProps</a>

User provided properties for the construct.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.isConstruct"></a>

```typescript
import { IotThingCertificatePolicy } from '@cdklabs/cdk-aws-iot-thing-certificate-policy'

IotThingCertificatePolicy.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificateArn">certificateArn</a></code> | <code>string</code> | Arn of created AWS IoT Certificate. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificatePemParameter">certificatePemParameter</a></code> | <code>string</code> | Fully qualified name in AWS Systems Manager Parameter Store of the certificate in `PEM` format. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.credentialProviderEndpointAddress">credentialProviderEndpointAddress</a></code> | <code>string</code> | Fully qualified domain name of the AWS IoT Credential provider endpoint specific to this AWS account and AWS region. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.dataAtsEndpointAddress">dataAtsEndpointAddress</a></code> | <code>string</code> | Fully qualified domain name of the AWS IoT Core data plane endpoint specific to this AWS account and AWS region. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.iotPolicyArn">iotPolicyArn</a></code> | <code>string</code> | Arn of created AWS IoT Policy. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.privateKeySecretParameter">privateKeySecretParameter</a></code> | <code>string</code> | Fully qualified name in AWS Systems Manager Parameter Store of the certificate's private key in `PEM` format. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.thingArn">thingArn</a></code> | <code>string</code> | Arn of created AWS IoT Thing. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `certificateArn`<sup>Required</sup> <a name="certificateArn" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificateArn"></a>

```typescript
public readonly certificateArn: string;
```

- *Type:* string

Arn of created AWS IoT Certificate.

---

##### `certificatePemParameter`<sup>Required</sup> <a name="certificatePemParameter" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificatePemParameter"></a>

```typescript
public readonly certificatePemParameter: string;
```

- *Type:* string

Fully qualified name in AWS Systems Manager Parameter Store of the certificate in `PEM` format.

---

##### `credentialProviderEndpointAddress`<sup>Required</sup> <a name="credentialProviderEndpointAddress" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.credentialProviderEndpointAddress"></a>

```typescript
public readonly credentialProviderEndpointAddress: string;
```

- *Type:* string

Fully qualified domain name of the AWS IoT Credential provider endpoint specific to this AWS account and AWS region.

---

##### `dataAtsEndpointAddress`<sup>Required</sup> <a name="dataAtsEndpointAddress" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.dataAtsEndpointAddress"></a>

```typescript
public readonly dataAtsEndpointAddress: string;
```

- *Type:* string

Fully qualified domain name of the AWS IoT Core data plane endpoint specific to this AWS account and AWS region.

---

##### `iotPolicyArn`<sup>Required</sup> <a name="iotPolicyArn" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.iotPolicyArn"></a>

```typescript
public readonly iotPolicyArn: string;
```

- *Type:* string

Arn of created AWS IoT Policy.

---

##### `privateKeySecretParameter`<sup>Required</sup> <a name="privateKeySecretParameter" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.privateKeySecretParameter"></a>

```typescript
public readonly privateKeySecretParameter: string;
```

- *Type:* string

Fully qualified name in AWS Systems Manager Parameter Store of the certificate's private key in `PEM` format.

---

##### `thingArn`<sup>Required</sup> <a name="thingArn" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.thingArn"></a>

```typescript
public readonly thingArn: string;
```

- *Type:* string

Arn of created AWS IoT Thing.

---


## Structs <a name="Structs" id="Structs"></a>

### IotThingCertificatePolicyProps <a name="IotThingCertificatePolicyProps" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps"></a>

Properties for defining an AWS IoT thing, AWS IoT certificate, and AWS IoT policy.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.Initializer"></a>

```typescript
import { IotThingCertificatePolicyProps } from '@cdklabs/cdk-aws-iot-thing-certificate-policy'

const iotThingCertificatePolicyProps: IotThingCertificatePolicyProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicy">iotPolicy</a></code> | <code>string</code> | The AWS IoT policy in JSON format to be created and attached to the certificate. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicyName">iotPolicyName</a></code> | <code>string</code> | Name of the AWS IoT Core policy to create. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.thingName">thingName</a></code> | <code>string</code> | Name of AWS IoT thing to create. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.encryptionAlgorithm">encryptionAlgorithm</a></code> | <code>string</code> | Selects RSA or ECC private key and certificate generation. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.policyParameterMapping">policyParameterMapping</a></code> | <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping">PolicyMapping</a>[]</code> | Optional: A `PolicyMapping` object of parameters and values to be replaced if a [mustache-compatible](https://handlebarsjs.com/guide/) template is provided as the `iotPolicy` (see example). For each matching parameter in the policy template, the value will be used. If not provided, only the `{{thingname}}` mapping will be available for the `iotPolicy` template. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.x509Subject">x509Subject</a></code> | <code>string</code> | Optional: An [RFC 4514 string](https://datatracker.ietf.org/doc/html/rfc4514#section-4) containing the requested _Subject_ named attributes for the certificate signing request. The string must start with the "leaf", or Common Name (CN) relative distinguished name (RDN), and then followed by the rest of the optional RDNs. Example: `CN=myThingName,OU=My Local Org,O=My Company,L=Seattle,S=Washington,C=US`. |

---

##### `iotPolicy`<sup>Required</sup> <a name="iotPolicy" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicy"></a>

```typescript
public readonly iotPolicy: string;
```

- *Type:* string
- *Default:* None

The AWS IoT policy in JSON format to be created and attached to the certificate.

This is a JSON string that uses [mustache-compatible](https://handlebarsjs.com/guide/)
template substitution to create the AWS IoT policy.

---

##### `iotPolicyName`<sup>Required</sup> <a name="iotPolicyName" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicyName"></a>

```typescript
public readonly iotPolicyName: string;
```

- *Type:* string
- *Default:* None

Name of the AWS IoT Core policy to create.

---

##### `thingName`<sup>Required</sup> <a name="thingName" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.thingName"></a>

```typescript
public readonly thingName: string;
```

- *Type:* string
- *Default:* None

Name of AWS IoT thing to create.

---

##### `encryptionAlgorithm`<sup>Optional</sup> <a name="encryptionAlgorithm" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.encryptionAlgorithm"></a>

```typescript
public readonly encryptionAlgorithm: string;
```

- *Type:* string
- *Default:* RSA

Selects RSA or ECC private key and certificate generation.

If not provided, `RSA` will be used.

---

##### `policyParameterMapping`<sup>Optional</sup> <a name="policyParameterMapping" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.policyParameterMapping"></a>

```typescript
public readonly policyParameterMapping: PolicyMapping[];
```

- *Type:* <a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping">PolicyMapping</a>[]
- *Default:* None

Optional: A `PolicyMapping` object of parameters and values to be replaced if a [mustache-compatible](https://handlebarsjs.com/guide/) template is provided as the `iotPolicy` (see example). For each matching parameter in the policy template, the value will be used. If not provided, only the `{{thingname}}` mapping will be available for the `iotPolicy` template.

---

##### `x509Subject`<sup>Optional</sup> <a name="x509Subject" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.x509Subject"></a>

```typescript
public readonly x509Subject: string;
```

- *Type:* string
- *Default:* None

Optional: An [RFC 4514 string](https://datatracker.ietf.org/doc/html/rfc4514#section-4) containing the requested _Subject_ named attributes for the certificate signing request. The string must start with the "leaf", or Common Name (CN) relative distinguished name (RDN), and then followed by the rest of the optional RDNs. Example: `CN=myThingName,OU=My Local Org,O=My Company,L=Seattle,S=Washington,C=US`.

---

### PolicyMapping <a name="PolicyMapping" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping"></a>

Policy substitutions provided as key-value pairs.

Done this way to be JSII compatible.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.Initializer"></a>

```typescript
import { PolicyMapping } from '@cdklabs/cdk-aws-iot-thing-certificate-policy'

const policyMapping: PolicyMapping = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.name">name</a></code> | <code>string</code> | Name of substitution variable, e.g., `region` or `account`. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.value">value</a></code> | <code>string</code> | Value of substitution variable, e.g., `us-east-1` or `12345689012`. |

---

##### `name`<sup>Required</sup> <a name="name" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.name"></a>

```typescript
public readonly name: string;
```

- *Type:* string

Name of substitution variable, e.g., `region` or `account`.

---

##### `value`<sup>Required</sup> <a name="value" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.value"></a>

```typescript
public readonly value: string;
```

- *Type:* string

Value of substitution variable, e.g., `us-east-1` or `12345689012`.

---



