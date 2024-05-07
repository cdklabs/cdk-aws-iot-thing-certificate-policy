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

```python
import cdklabs.cdk_aws_iot_thing_certificate_policy

cdklabs.cdk_aws_iot_thing_certificate_policy.IotThingCertificatePolicy(
  scope: Construct,
  id: str,
  iot_policy: str,
  iot_policy_name: str,
  thing_name: str,
  encryption_algorithm: str = None,
  policy_parameter_mapping: typing.List[PolicyMapping] = None
)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | Represents the scope for all the resources. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.id">id</a></code> | <code>str</code> | This is a scope-unique id. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.iotPolicy">iot_policy</a></code> | <code>str</code> | The AWS IoT policy in JSON format to be created and attached to the certificate. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.iotPolicyName">iot_policy_name</a></code> | <code>str</code> | Name of the AWS IoT Core policy to create. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.thingName">thing_name</a></code> | <code>str</code> | Name of AWS IoT thing to create. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.encryptionAlgorithm">encryption_algorithm</a></code> | <code>str</code> | Selects RSA or ECC private key and certificate generation. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.policyParameterMapping">policy_parameter_mapping</a></code> | <code>typing.List[<a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping">PolicyMapping</a>]</code> | Optional: A `PolicyMapping` object of parameters and values to be replaced if a [mustache-compatible](https://handlebarsjs.com/guide/) template is provided as the `iotPolicy` (see example). For each matching parameter in the policy template, the value will be used. If not provided, only the `{{thingname}}` mapping will be available for the `iotPolicy` template. |

---

##### `scope`<sup>Required</sup> <a name="scope" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

Represents the scope for all the resources.

---

##### `id`<sup>Required</sup> <a name="id" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.id"></a>

- *Type:* str

This is a scope-unique id.

---

##### `iot_policy`<sup>Required</sup> <a name="iot_policy" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.iotPolicy"></a>

- *Type:* str
- *Default:* None

The AWS IoT policy in JSON format to be created and attached to the certificate.

This is a JSON string that uses [mustache-compatible](https://handlebarsjs.com/guide/)
template substitution to create the AWS IoT policy.

---

##### `iot_policy_name`<sup>Required</sup> <a name="iot_policy_name" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.iotPolicyName"></a>

- *Type:* str
- *Default:* None

Name of the AWS IoT Core policy to create.

---

##### `thing_name`<sup>Required</sup> <a name="thing_name" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.thingName"></a>

- *Type:* str
- *Default:* None

Name of AWS IoT thing to create.

---

##### `encryption_algorithm`<sup>Optional</sup> <a name="encryption_algorithm" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.encryptionAlgorithm"></a>

- *Type:* str
- *Default:* RSA

Selects RSA or ECC private key and certificate generation.

If not provided, `RSA` will be used.

---

##### `policy_parameter_mapping`<sup>Optional</sup> <a name="policy_parameter_mapping" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.Initializer.parameter.policyParameterMapping"></a>

- *Type:* typing.List[<a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping">PolicyMapping</a>]
- *Default:* None

Optional: A `PolicyMapping` object of parameters and values to be replaced if a [mustache-compatible](https://handlebarsjs.com/guide/) template is provided as the `iotPolicy` (see example). For each matching parameter in the policy template, the value will be used. If not provided, only the `{{thingname}}` mapping will be available for the `iotPolicy` template.

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.toString">to_string</a></code> | Returns a string representation of this construct. |

---

##### `to_string` <a name="to_string" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.toString"></a>

```python
def to_string() -> str
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.isConstruct">is_construct</a></code> | Checks if `x` is a construct. |

---

##### ~~`is_construct`~~ <a name="is_construct" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.isConstruct"></a>

```python
import cdklabs.cdk_aws_iot_thing_certificate_policy

cdklabs.cdk_aws_iot_thing_certificate_policy.IotThingCertificatePolicy.is_construct(
  x: typing.Any
)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.isConstruct.parameter.x"></a>

- *Type:* typing.Any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificateArn">certificate_arn</a></code> | <code>str</code> | Arn of created AWS IoT Certificate. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificatePemParameter">certificate_pem_parameter</a></code> | <code>str</code> | Fully qualified name in AWS Systems Manager Parameter Store of the certificate in `PEM` format. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.credentialProviderEndpointAddress">credential_provider_endpoint_address</a></code> | <code>str</code> | Fully qualified domain name of the AWS IoT Credential provider endpoint specific to this AWS account and AWS region. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.dataAtsEndpointAddress">data_ats_endpoint_address</a></code> | <code>str</code> | Fully qualified domain name of the AWS IoT Core data plane endpoint specific to this AWS account and AWS region. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.iotPolicyArn">iot_policy_arn</a></code> | <code>str</code> | Arn of created AWS IoT Policy. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.privateKeySecretParameter">private_key_secret_parameter</a></code> | <code>str</code> | Fully qualified name in AWS Systems Manager Parameter Store of the certificate's private key in `PEM` format. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.thingArn">thing_arn</a></code> | <code>str</code> | Arn of created AWS IoT Thing. |

---

##### `node`<sup>Required</sup> <a name="node" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.node"></a>

```python
node: Node
```

- *Type:* constructs.Node

The tree node.

---

##### `certificate_arn`<sup>Required</sup> <a name="certificate_arn" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificateArn"></a>

```python
certificate_arn: str
```

- *Type:* str

Arn of created AWS IoT Certificate.

---

##### `certificate_pem_parameter`<sup>Required</sup> <a name="certificate_pem_parameter" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.certificatePemParameter"></a>

```python
certificate_pem_parameter: str
```

- *Type:* str

Fully qualified name in AWS Systems Manager Parameter Store of the certificate in `PEM` format.

---

##### `credential_provider_endpoint_address`<sup>Required</sup> <a name="credential_provider_endpoint_address" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.credentialProviderEndpointAddress"></a>

```python
credential_provider_endpoint_address: str
```

- *Type:* str

Fully qualified domain name of the AWS IoT Credential provider endpoint specific to this AWS account and AWS region.

---

##### `data_ats_endpoint_address`<sup>Required</sup> <a name="data_ats_endpoint_address" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.dataAtsEndpointAddress"></a>

```python
data_ats_endpoint_address: str
```

- *Type:* str

Fully qualified domain name of the AWS IoT Core data plane endpoint specific to this AWS account and AWS region.

---

##### `iot_policy_arn`<sup>Required</sup> <a name="iot_policy_arn" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.iotPolicyArn"></a>

```python
iot_policy_arn: str
```

- *Type:* str

Arn of created AWS IoT Policy.

---

##### `private_key_secret_parameter`<sup>Required</sup> <a name="private_key_secret_parameter" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.privateKeySecretParameter"></a>

```python
private_key_secret_parameter: str
```

- *Type:* str

Fully qualified name in AWS Systems Manager Parameter Store of the certificate's private key in `PEM` format.

---

##### `thing_arn`<sup>Required</sup> <a name="thing_arn" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicy.property.thingArn"></a>

```python
thing_arn: str
```

- *Type:* str

Arn of created AWS IoT Thing.

---


## Structs <a name="Structs" id="Structs"></a>

### IotThingCertificatePolicyProps <a name="IotThingCertificatePolicyProps" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps"></a>

Properties for defining an AWS IoT thing, AWS IoT certificate, and AWS IoT policy.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.Initializer"></a>

```python
import cdklabs.cdk_aws_iot_thing_certificate_policy

cdklabs.cdk_aws_iot_thing_certificate_policy.IotThingCertificatePolicyProps(
  iot_policy: str,
  iot_policy_name: str,
  thing_name: str,
  encryption_algorithm: str = None,
  policy_parameter_mapping: typing.List[PolicyMapping] = None
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicy">iot_policy</a></code> | <code>str</code> | The AWS IoT policy in JSON format to be created and attached to the certificate. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicyName">iot_policy_name</a></code> | <code>str</code> | Name of the AWS IoT Core policy to create. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.thingName">thing_name</a></code> | <code>str</code> | Name of AWS IoT thing to create. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.encryptionAlgorithm">encryption_algorithm</a></code> | <code>str</code> | Selects RSA or ECC private key and certificate generation. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.policyParameterMapping">policy_parameter_mapping</a></code> | <code>typing.List[<a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping">PolicyMapping</a>]</code> | Optional: A `PolicyMapping` object of parameters and values to be replaced if a [mustache-compatible](https://handlebarsjs.com/guide/) template is provided as the `iotPolicy` (see example). For each matching parameter in the policy template, the value will be used. If not provided, only the `{{thingname}}` mapping will be available for the `iotPolicy` template. |

---

##### `iot_policy`<sup>Required</sup> <a name="iot_policy" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicy"></a>

```python
iot_policy: str
```

- *Type:* str
- *Default:* None

The AWS IoT policy in JSON format to be created and attached to the certificate.

This is a JSON string that uses [mustache-compatible](https://handlebarsjs.com/guide/)
template substitution to create the AWS IoT policy.

---

##### `iot_policy_name`<sup>Required</sup> <a name="iot_policy_name" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.iotPolicyName"></a>

```python
iot_policy_name: str
```

- *Type:* str
- *Default:* None

Name of the AWS IoT Core policy to create.

---

##### `thing_name`<sup>Required</sup> <a name="thing_name" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.thingName"></a>

```python
thing_name: str
```

- *Type:* str
- *Default:* None

Name of AWS IoT thing to create.

---

##### `encryption_algorithm`<sup>Optional</sup> <a name="encryption_algorithm" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.encryptionAlgorithm"></a>

```python
encryption_algorithm: str
```

- *Type:* str
- *Default:* RSA

Selects RSA or ECC private key and certificate generation.

If not provided, `RSA` will be used.

---

##### `policy_parameter_mapping`<sup>Optional</sup> <a name="policy_parameter_mapping" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.IotThingCertificatePolicyProps.property.policyParameterMapping"></a>

```python
policy_parameter_mapping: typing.List[PolicyMapping]
```

- *Type:* typing.List[<a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping">PolicyMapping</a>]
- *Default:* None

Optional: A `PolicyMapping` object of parameters and values to be replaced if a [mustache-compatible](https://handlebarsjs.com/guide/) template is provided as the `iotPolicy` (see example). For each matching parameter in the policy template, the value will be used. If not provided, only the `{{thingname}}` mapping will be available for the `iotPolicy` template.

---

### PolicyMapping <a name="PolicyMapping" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping"></a>

Policy substitutions provided as key-value pairs.

#### Initializer <a name="Initializer" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.Initializer"></a>

```python
import cdklabs.cdk_aws_iot_thing_certificate_policy

cdklabs.cdk_aws_iot_thing_certificate_policy.PolicyMapping(
  name: str,
  value: str
)
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.name">name</a></code> | <code>str</code> | Name of substitution variable, e.g., `region` or `account`. |
| <code><a href="#@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.value">value</a></code> | <code>str</code> | Value of substitution variable, e.g., `us-east-1` or `12345689012`. |

---

##### `name`<sup>Required</sup> <a name="name" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.name"></a>

```python
name: str
```

- *Type:* str

Name of substitution variable, e.g., `region` or `account`.

---

##### `value`<sup>Required</sup> <a name="value" id="@cdklabs/cdk-aws-iot-thing-certificate-policy.PolicyMapping.property.value"></a>

```python
value: str
```

- *Type:* str

Value of substitution variable, e.g., `us-east-1` or `12345689012`.

---



