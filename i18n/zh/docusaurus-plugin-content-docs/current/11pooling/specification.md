---
sidebar_position: 2
---

# 11.2 奇亚矿池协议 1.0 规范

这是奇亚矿池协议的初始版本。 它被设计成简单的，以后会被扩展。 它依赖于拥有智能币（在 GUI + CLI 中称为图块 NFT）的农民，这允许他们通过在区块链上进行交易来在池之间切换。 此外，它减少了对区块生产池的依赖，因为该协议只处理奖励的分配，并且可以防止矿池或农民的恶意行为。

## 安全考虑

矿池必须确保部分快速到达，快于包含到区块链中的 28 秒时间限制。 这允许设置缓慢的农民检测问题。

池服务器必须检查 `pool_contract_puzzle_hash` aka 是否 `p2_singleton_puzzle_hash` 与他们期望的谜语匹配。 `p2_singleton_puzzle_hash` matches the puzzle that they expect. 否则，矿池无法保证用户不会尝试为自己索取区块奖励，并立即离开矿池，这是提供的智能合约所阻止的。

奇亚客户端必须仅通过 TLS >= 1.2 上的 HTTPS 连接到池配置 URL。 这是为了防止会话劫持，导致用户资金被盗。

## 部分

参与矿池协议的各方是池运营商和农民。 每个农民都在运行一个农民进程，以及连接到该农民进程的任意数量的收割机进程。 完整节点可以由农民运行（奇亚 GUI 应用程序中的默认设置），也可以由矿池操作员运行。 如果农民不想运行全节点，他们可以配置他们的节点以连接到远程全节点。

A pool operator can support any number of farmers.

## 农民身份

一个农民可以通过区块链上农民单例硬币的标识符来唯一标识，这就是 `launcher_id` 所指。 该 `launcher_id` 可被用作在一个数据库中的主密钥。 矿池必须定期检查区块链上的单例硬币的状态，以验证它正在向矿池转移，而不是离开或转向另一个矿池。

## 农民认证

For the farmer to authenticate to the pool the following time based authentication token scheme must be added to the signing messages of some endpoints.

```
authentication_token = current_utc_minutes / authentication_token_timeout
```

`authentication_token_timeout` 是矿池的配置参数，该参数也包含在 [GET /pool_info](http://10.177.0.168:3000/cn/docs/pooling/specification#get-pool_info) 响应中，农民必须遵守该参数。 而在签名 `current_utc_minutes` 时以**分钟**为单位的本地 UTC 时间戳 。 理想情况下，本地时钟应与时间同步协议（例如 NTP）同步。 身份验证令牌通常包含在签名的有效负载中。

## HTTPS 端点摘要

矿池协议由几个返回 JSON 响应的 HTTPS 端点组成。 HTTPS 服务器可以在任何端口上运行，但必须在启用 TLS（使用 CA 批准的证书）和启用流水线的情况下运行。 所有字节值都编码为十六进制，前面有可选的 0x。 客户端也应该使用流水线运行。

- [GET /pool_info](#get-pool_info)
- [GET /farmer](#get-farmer)
- [POST /farmer](#post-farmer)
- [PUT /farmer](#put-farmer)
- [POST /partial](#post-partial)
- [GET /login (Optional)](#get-login)

## 错误代码

A failed endpoint will always return a JSON object with an error code and an english error message as shown below:

```json
{ "error_code": 0, "error_message": "" }
```

The following errors may occur:

| Error code | Description                                  |
| ---------- | -------------------------------------------- |
| 0x01       | The provided signage point has been reverted |
| 0x02       | Received partial too late                    |
| 0x03       | Not found                                    |
| 0x04       | Proof of space invalid                       |
| 0x05       | Proof of space not good enough               |
| 0x06       | Invalid difficulty                           |
| 0x07       | Invalid signature                            |
| 0x08       | Web-Server raised an exception               |
| 0x09       | Invalid puzzle hash                          |
| 0x0A       | Farmer not known                             |
| 0x0B       | Farmer already known                         |
| 0x0C       | Invalid authentication public key            |
| 0x0D       | Invalid payout instructions                  |
| 0x0E       | Invalid singleton                            |
| 0x0F       | Delay time too short                         |
| 0x10       | Request failed                               |

## 签名验证

大多数端点都需要签名验证。 验证需要对端点有效负载进行序列化以计算消息哈希，其完成方式如下：

```
message_hash = sha256(serialized_payload)
```

The serialized payload must follow the `Streamable` standard defined [here](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/util/streamable.py).

## 矿池 URL

矿池 URL 是农民用来连接到矿池的 URL。 子域、端口和路径是可选的。 如果没有端口，客户端将使用 443。 请注意，尾随斜杠不得存在。 一切都必须小写。

```
https://subdomain.domain.tld:port/path
```

## GET /pool_info

这不需要任何参数，并允许客户端获取有关矿池的信息。 它在加入矿池之前被调用，当农民将池 URL 输入客户端时。 这允许农民查看有关矿池的信息，并决定是否加入。 它还允许农民在区块链上的单例硬币中设置正确的参数。 对客户端实现者的警告：如果显示任何此类信息，请确保考虑恶意脚本和 JS 融入。 它返回带有以下数据的 JSON 响应：

```json
{
  "description": "(example) The Reference Pool allows you to pool with low fees, paying out daily using Chia.",
  "fee": 0.01,
  "logo_url": "https://www.chia.net/img/chia_logo.svg",
  "minimum_difficulty": 10,
  "name": "The Reference Pool",
  "protocol_version": 1,
  "relative_lock_height": 100,
  "target_puzzle_hash": "0x344587cf06a39db471d2cc027504e8688a0a67cce961253500c956c73603fd58",
  "authentication_token_timeout": 5
}
```

#### 描述

The description is a short paragraph that can be displayed in GUIs when the farmer enters a pool URL.

#### 费用

矿池默认收取的费用，介于 0.0 (0.0%) 和 1.0 (100.0%) 之间的数字。 这不包括区块链交易费用。

#### logo_url

客户端可以在 UI 中显示的池徽标的 URL。 这对于 v1.0 是可选的。

#### 最小难度

矿池支持的最低难度。 这也将是农民开始发送证明的默认设置。

#### 名称

Name of the pool, this is only for display purposes and does not go on the blockchain.

#### 协议版本

The pool protocol version supported by the pool.

#### relative_lock_height

用户在开始逃离矿池的时间点和他们可以完成矿池切换的时间点之间必须等待的块（确认）数。 必须小于 4608（大约 24 小时）。

#### target_puzzle_hash

这是从单例硬币发送奖励的目标。 由矿池控制。

#### authentication_token_timeout

The time in **minutes** for an `authentication_token` to be valid, see [Farmer authentication](#farmer-authentication).

## GET /farmer

Get the latest information for a farmer.

Request parameter:

```
- launcher_id
- authentication_token
- signature
```

Example request:

```
https://poolurl.com/farmer/launcher_id=:launcher_id&authentication_token=:token&signature=:signature
```

Successful response:

```json
{
  "authentication_public_key": "0x970e181ae45435ae696508a78012dc80548c334cf29676ea6ade7049eb9d2b9579cc30cb44c3fd68d35a250cfbc69e29",
  "payout_instructions": "0xc2b08e41d766da4116e388357ed957d04ad754623a915f3fd65188a8746cf3e8",
  "current_difficulty": 10,
  "current_points": 10
}
```

### 参数

#### launcher_id

The unique identifier of the farmer's singleton, see [Farmer identification](#farmer-identification).

#### authentication_token

See [Farmer authentication](#farmer-authentication) for the specification of `authentication_token`.

#### 签名

This is a BLS signature of the hashed serialization of the following data in the given order:

| Element              | Type    |
| -------------------- | ------- |
| method_name          | string  |
| launcher_id          | bytes32 |
| target_puzzle_hash | bytes32 |
| authentication_token | uint64  |

where `method_name` must be the serialized string `"get_farmer"`, the parameters must be serialized and hashed according to [Signature validation](#signature-validation) and the signature must be signed by the private key of the `authentication_public_key` using the Augmented Scheme in the BLS IETF spec.

where the parameter must be serialized and hashed according to [Signature validation](#signature-validation) and the signature must be signed by the private key of the `authentication_public_key` using the Augmented Scheme in the BLS IETF spec.

Note: The pool MUST return the current points balance, which is the total number of points found since the last payout for that user.

## POST /farmer

在矿池中注册一个农民。 在提交第一个部分之前需要一次。

Request:

```json
{
  "payload": {
    "launcher_id": "0xae4ef3b9bfe68949691281a015a9c16630fc8f66d48c19ca548fb80768791afa",
    "authentication_token": 27062279,
    "authentication_public_key": "0x970e181ae45435ae696508a78012dc80548c334cf29676ea6ade7049eb9d2b9579cc30cb44c3fd68d35a250cfbc69e29",
    "payout_instructions": "0xc2b08e41d766da4116e388357ed957d04ad754623a915f3fd65188a8746cf3e8",
    "suggested_difficulty": 10
  },
  "signature": "0xa078dc1462bbcdec7cd651c5c3d7584ac6c6a142e049c7790f3b0ee8768ed6326e3a639f949b2293469be561adfa1c57130f64334994f53c1bd12e59579e27127fbabadc5e8793a2ef194a5a22ac832e92dcb6ad9a0d33bd264726f6e8df6aad"
}
```

Successful response:

```json
{ "welcome_message": "Welcome to the reference pool. Happy farming." } Happy farming." }
```

A successful response must always contain a welcome message which must be defined by the pool.

#### 有效载荷

#### payload.launcher_id

The unique identifier of the farmer's singleton, see [Farmer identification](#farmer-identification).

#### payload.authentication_token

See [Farmer authentication](#farmer-authentication) for the specification of `authentication_token`.

#### payload.authentication_public_key

身份验证密钥的公钥，这是农民用来签署对池的请求的临时密钥。 它是由 `owner_key` 授权的，这样可以更加安全地保存所有者密钥。 矿池应拒绝使用过时的 `authentication_keys` 发出的请求。 可以使用 `PUT/farmer` 更改这些密钥，该密钥使用所有者密钥进行签名。

#### payload.payout_instructions

这些是关于农民希望如何获得报酬的说明。 默认情况下，这将是一个 XCH 地址，但它可以设置为小于 1024 个字符的任何字符串，因此它可以代表另一个区块链或支付系统标识符。

#### payload.suggested_difficulty

农民要求更新难度。 可以被矿池忽略或尊重。 但是，只有当认证公钥是该农民看到的最新公钥时，才应遵守这一点。

See [Difficulty](#difficulty) for more details about the impact of the difficulty.

#### 签名

This is a BLS signature of the hashed serialization of the payload:

```
sha256(PostFarmerPayload)
```

signed by the private key of the `owner_public_key` using the Augmented Scheme in the BLS IETF spec.

See the [streamable](#signature-validation) class `PostFarmerPayload` in the [pool protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/pool_protocol.py) and [Farmer authentication](#farmer-authentication) for the specification of `authentication_token`.

## PUT /farmer

Allows farmers to update their information on the pool.

Request:

```json
{
  "payload": {
    "launcher_id": "0xae4ef3b9bfe68949691281a015a9c16630fc8f66d48c19ca548fb80768791afa",
    "authentication_token": 27062279,
    "authentication_public_key": "0x970e181ae45435ae696508a78012dc80548c334cf29676ea6ade7049eb9d2b9579cc30cb44c3fd68d35a250cfbc69e29",
    "payout_instructions": "0xc2b08e41d766da4116e388357ed957d04ad754623a915f3fd65188a8746cf3e8",
    "suggested_difficulty": 10
  },
  "signature": "0xa078dc1462bbcdec7cd651c5c3d7584ac6c6a142e049c7790f3b0ee8768ed6326e3a639f949b2293469be561adfa1c57130f64334994f53c1bd12e59579e27127fbabadc5e8793a2ef194a5a22ac832e92dcb6ad9a0d33bd264726f6e8df6aad"
}
```

有关请求正文条目的描述，请参阅 [POST/农民](http://10.177.0.168:3000/cn/docs/pooling/specification#post-farmer) 中的相应密钥。 随密钥/值对提供的值用于更新服务器上的现有值。 所有条目，除了 `launcher_id`，都是可选的，但必须至少有一个。

See the [streamable](#signature-validation) class `PutFarmerPayload` in the [pool protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/pool_protocol.py) for details and [Farmer authentication](#farmer-authentication) for the specification of `authentication_token`.

Successful response:

```json
{
  "authentication_public_key": true,
  "payout_instructions": true,
  "suggested_difficulty": true
}
```

对于请求正文中提供的每个条目，成功的响应必须始终包含一个密钥/值对。 `true` 如果条目已更新或 `false` 该值与当前值相同，则该值必须为。

See below for an example body to only update the authentication key:

Example to update `authentication_public_key`:

```json
{
  "payload": {
    "launcher_id": "0xae4ef3b9bfe68949691281a015a9c16630fc8f66d48c19ca548fb80768791afa",
    "authentication_public_key": "0x970e181ae45435ae696508a78012dc80548c334cf29676ea6ade7049eb9d2b9579cc30cb44c3fd68d35a250cfbc69e29"
  },
  "signature": "0xa078dc1462bbcdec7cd651c5c3d7584ac6c6a142e049c7790f3b0ee8768ed6326e3a639f949b2293469be561adfa1c57130f64334994f53c1bd12e59579e27127fbabadc5e8793a2ef194a5a22ac832e92dcb6ad9a0d33bd264726f6e8df6aad"
}
```

## POST /partial

This is a partial submission from the farmer to the pool operator.

Request:

```json
{
  "payload": {
    "launcher_id": "0xae4ef3b9bfe68949691281a015a9c16630fc8f66d48c19ca548fb80768791afa",
    "authentication_token": 27062279,
    "proof_of_space": {
      "challenge": "0xe0e55d45eef8d53a6b68220abeec8f14f57baaa80dbd7b37430e42f9ac6e2c0e",
      "pool_contract_puzzle_hash": "0x9e3e9b37b54cf6c7467e277b6e4ca9ab6bdea53cdc1d79c000dc95b6a3908a3b",
      "plot_public_key": "0xa7ad70989cc8f18e555e9b698d197cdfc32465e0b99fd6cf5fdbac8aa2da04b0704ba04d2d50d852402f9dd6eec47a4d",
      "size": 32,
      "proof": "0xb2cd6374c8db249ad3b638199dbb6eb9eaefe55042cef66c43cf1e31161f4a1280455d8b53c2823c747fd4f8823c44de3a52cc85332431630857c359935660c3403ae3a92728d003dd66ef5966317cd49894d265a3e4c43f0530a1192874ed327e6f35862a25dfb67c5d0d573d078b4b8ba9bfb1cce52fd17939ae9d7033d3aa09d6c449e392ba2472a1fecf992abcc51c3bf5d56a72fef9900e79b8dba88a5afc39e04993325a0cd6b67757355b836f"
    },
    "sp_hash": "0x4c52796ca4ff775fbcdac90140c12270d26a37724ad77988535d58b376332533",
    "end_of_sub_slot": false,
    "harvester_id": "0xb9d8de98ec5c026f1167b0b587715d7137f43b6d1d40b81d9aac6dc8355fde28"
  },
  "aggregate_signature": "0xa078dc1462bbcdec7cd651c5c3d7584ac6c6a142e049c7790f3b0ee8768ed6326e3a639f949b2293469be561adfa1c57130f64334994f53c1bd12e59579e27127fbabadc5e8793a2ef194a5a22ac832e92dcb6ad9a0d33bd264726f6e8df6aad"
}
```

Successful response:

```json
{ "new_difficulty": 10 }
```

A successful response must always contain the new difficulty which must be respected by the farmer.

#### 有效载荷

This is the main payload of the partial, which is signed by two keys: `authentication_key` and `plot_key`.

#### payload.launcher_id

The unique identifier of the farmer's singleton, see [Farmer identification](#farmer-identification).

#### payload.authentication_token

See [Farmer authentication](#farmer-authentication) for the specification of `authentication_token`.

#### payload.proof_of_space

The proof of space in chia-blockchain format.

#### payload.proof_of_space.challenge

The challenge of the proof of space, computed from the signage point or end of subslot.

#### payload.proof_of_space.pool_contract_puzzle_hash

在图中编码的谜语哈希，相当于 `p2_singleton_puzzle_hash`。 如果这个证明获胜，这是 7/8 奖励在区块链中获得的第一个地址。 该值可以从 `launcher_id` 派生，并且必须对所有部分都有效。

#### payload.proof_of_space.plot_public_key

与图块关联的公钥。 （可以是图块本地密钥和农民之间的 2/2 BLS，但不一定）。

#### payload.proof_of_space.size

K size, must be at least 32.

#### payload.proof_of_space.proof

64 x values encoding the actual proof of space, must be valid corresponding to the `sp_hash`.

#### payload.sp_hash

这是标牌点输出的哈希值，或者子时隙的挑战哈希，如果它是子时隙挑战的结束。 这必须是区块链上尚未恢复的有效标志点。 矿池必须在处理部分后几分钟检查它没有在区块链上恢复。

#### payload.end_of_sub_slot

If true, the sp_hash encodes the challenge_hash of the sub slot.

#### 聚合签名

This is a 2/2 BLS signature of the hashed serialization of the payload:

```
sha256(PostPartialPayload)
```

signed by the private keys of the following keys using the Augmented Scheme in the BLS IETF spec:

1. `plot_public_key`
2. `authentication_public_key`

See the [streamable](#signature-validation) class `PostPartialPayload` in the [pool protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/pool_protocol.py) for details and [Farmer authentication](#farmer-authentication) for the specification of `authentication_token`.

A partial must be completely rejected if the BLS signature does not validate.

## 获取/登录

如果池支持，这允许用户登录到 Web 界面，请参阅 [GET/矿池信息](http://10.177.0.168:3000/cn/docs/pooling/specification#get-pool_info) 中的服务标志。 农夫软件必须提供一种生成和显示登录链接的方法，或者提供一个生成链接的按钮，然后只需在默认浏览器中打开它。 该链接遵循以下规范。

请注意，没有明确的帐户创建。 农民可以在使用 [POST/农民](http://10.177.0.168:3000/cn/docs/pooling/specification#post-farmer) 在矿池中[公开](http://10.177.0.168:3000/cn/docs/pooling/specification#post-farmer)自己的身份后登录 。

Request parameters:

```
- launcher_id
- authentication_token
- signature
```

Example request:

```
https://poolurl.com/login?launcher_id=:launcher_id&authentication_token=:token&signature=:signature
```

#### launcher_id

The unique identifier of the farmer's singleton, see [Farmer identification](#farmer-identification).

#### authentication_token

See [Farmer authentication](#farmer-authentication) for the specification of `authentication_token`.

#### 签名

This is a BLS signature of the hashed serialization of the following data in the given order:

| Element              | Type    |
| -------------------- | ------- |
| method_name          | string  |
| launcher_id          | bytes32 |
| target_puzzle_hash | bytes32 |
| authentication_token | uint64  |

`method_name` 必须是序列化的字符串 `"get_login"`，`target_puzzle_hash` 是矿池的目标[谜语哈希](http://10.177.0.168:3000/cn/docs/pooling/specification#get-pool_info)（参见 [GET/矿池信息](http://10.177.0.168:3000/cn/docs/pooling/specification#get-pool_info) ）。 参数必须根据[签名验证](http://10.177.0.168:3000/cn/docs/pooling/specification#signature-validation) 进行序列化和散列，签名必须由 `authentication_public_key` 使用 BLS IETF 规范中的增强方案的私钥签名 。

where the parameter must be serialized and hashed according to [Signature validation](#signature-validation) and the signature must be signed by the private key of the `authentication_public_key` using the Augmented Scheme in the BLS IETF spec.

## 难度

难度允许矿池操作员控制他们每天从每个农民那里收到多少部分。 可以为每个农民单独调整难度。 一个合理的目标是每天 300 个部分，以确保对农民的频繁反馈和低可变性。 难度为 1 会导致每个 k32 图每天大约有 10 个部分。 这是协议的 V1 支持的最小难度为 1。 但是，为了效率，矿池可以设置更高的最小难度。 在计算证明质量是否足以获得积分时，矿池应使用 `sub_slot_iters=37600000000` 。 如果农户提交的证明对当前难度不够好，则矿池应通过 `current_difficulty` 在响应中设置来响应。

## 积分

提交难度为 X 的部分会获得 X 分，这意味着分数与难度呈线性关系。 例如，100 TiB 的空间每天应该产生大约 10,000 个点，无论难度设置为 100 还是 200。 只要农民始终提交部分内容，为农民设置什么难度都没有关系。 规范不要求矿池按积分按比例支付，但应向农民明确支付方案，并在响应中确认积分并返还累积积分。
