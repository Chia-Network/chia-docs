---
sidebar_position: 2
---

# 10.2 收割机协议

> 10.2 Harvester Protocol

收割机协议定义了农民服务和收割机服务之间发送的消息。 对于小农来说，它们往往是一台相同的机器，但对于中型或大型农户，它们可以使用多台机器。

## harvester_handshake

农民和收割机之间的握手。农民将此消息发送给收割机，以初始化它们并告诉他们可以使用哪些池公钥和农民公钥。

一个农民可以连接多台收割机，但一台收割机只能连接一个农民。收割机可以开始使用与这些键相关联的地块。

```python
class HarvesterHandshake(Streamable):
    farmer_public_keys: List[G1Element]
    pool_public_keys: List[G1Element]
```

<details>
<summary>原文参考</summary>

The harvester protocol defines the messages sent between a farmer service and a harvester service. These tend to
be one the same machine for small farmers, but for medium or large farmers they can be in multiple machines.

- ## harvester_handshake

The handshake between farmer and harvester.
A farmer sends this message to harvesters, to initialize them and tell them which
pool public keys and farmer public keys are acceptable to use.

A farmer can be connected to multiple harvesters, but a harvester should only have one farmer connection.
The harvester can start using plots which have these keys associated with them.

```python
class HarvesterHandshake(Streamable):
    farmer_public_keys: List[G1Element]
    pool_public_keys: List[G1Element]
```

</details>

## new_signage_point_harvester

PK

此消息通知收割机新的挑战。收割机在每个地块中查找挑战，并计算质量。对于每种质量，这需要大约 7 次磁盘搜索。预计每个地块平均有一个空间证明，因此对于 50 个地块，收割机将具有大约 50 种品质。

``` python
class NewSignagePointHarvester:
    challenge_hash: bytes32
    difficulty: uint64
    sub_slot_iters: uint64
    signage_point_index: uint8
    sp_hash: bytes32
    pool_difficulties: List[PoolDifficulty]
```


```Python
class ChallengeResponse:
    challenge_hash: bytes32
    quality_string: bytes32
    plot_size: uint8
```

收割机向农民发送响应，其中包含针对发现的每个品质的 `ChallengeResponse`。

收到 `ChallengeResponse` 后，农民可以使用质量来计算使用此空间证明完成区块所需的预期时间。如果这个时间低于一个阈值（一个小的常数倍预期块大小），这意味着空间证明非常好，农民可以通过 `RequestProofOfSpace` 向收割机请求整个空间证明。

```Python
class RequestProofOfSpace:
    quality_string: bytes32
```

农夫要求收割机提供完整的空间证明，这将需要更多的磁盘搜索（大约 50）。这仅适用于高质量的证明。


```Python
class RespondProofOfSpace:
    quality_string: bytes32
    proof: ProofOfSpace
```

收割机响应请求的空间证明。农民现在可以选择为这个证明请求部分（发送到池中），或者如果证明非常好，则创建一个块。为了创建一个区块，Farmer 必须使用 `RequestHeader`（在 Farmer 协议中）从全节点请求块头，然后使用 `RequestHeaderSignature` 从收割机获取签名。


```Python
class RequestHeaderSignature:
    quality_string: bytes32
    header_hash: bytes32
```

农夫请求具有给定散列的标头的标头签名。收割机使用本地存储的私钥对标头进行签名。这允许农民以更分散的方式存储他们的私钥，每台收割机都将密钥与地块一起存储。

```Python
class RespondHeaderSignature:
    quality_string: bytes32
    header_hash_signature: PrependSignature
```

收割机在标头哈希上使用 BLS 前置签名进行响应。

```Python
class RequestPartialProof:
    quality_string: bytes32
    farmer_target_hash: bytes32
```

农场主要求提供部分证明以用于领取奖池奖励。这些比 `RequestHeaderSignature` 更频繁地发送，因为池部分比好的块更频繁地发生。收割机使用地块私钥签署农民目标哈希（资金目标）。

```Python
class RespondPartialProof:
    quality_string: bytes32
    farmer_target_signature: PrependSignature
```

收割者以签名作为回应，然后农民可以将其发送到池中以索取资金。

<details>
<summary>原文参考</summary>

- ## new_signage_point_harvester

PK

This message notifies the harvester of a new challenge.
The harvester looks up the challenge in each of the plots, and computes the quality.
This requires around 7 disk seeks for each quality.
Each plot is expected to have one proof of space on average, so for 50 plots, a harvester would have around 50 qualities.

``` python
class NewSignagePointHarvester:
    challenge_hash: bytes32
    difficulty: uint64
    sub_slot_iters: uint64
    signage_point_index: uint8
    sp_hash: bytes32
    pool_difficulties: List[PoolDifficulty]
```


```Python
class ChallengeResponse:
    challenge_hash: bytes32
    quality_string: bytes32
    plot_size: uint8
```
The harvester sends a response to the farmer, with `ChallengeResponse` for each of the qualities found.

After receiving a `ChallengeResponse`, farmers can use the quality to compute the expected time required to finalize a block with this proof of space.
If this time is lower than a threshold (a small constant times expected block size), which means the proof of space is very good, the farmer can request the entire proof of space from the harvester through ```RequestProofOfSpace```.


```Python
class RequestProofOfSpace:
    quality_string: bytes32
```
The farmer requests the entire proof of space from the harvester, which will require more disk seeks (around 50).
This is done only for proofs with high quality.



```Python
class RespondProofOfSpace:
    quality_string: bytes32
    proof: ProofOfSpace
```
The harvester responds with the requested proof of space.
The farmer can now choose to request a partial for this proof (to send to a pool), or if the proof is extremely good, to make a block.
In order to make a block the farmer must request a block header from the full node using `RequestHeader` (which is in the farmer protocol), and then get a signature from the harvester using `RequestHeaderSignature`.


```Python
class RequestHeaderSignature:
    quality_string: bytes32
    header_hash: bytes32
```
The farmer requests a header signature for a header with the given hash.
The harvester signs the header using the locally stored private key.
This allows farmers to store their private keys in a more distributed way, with each harvester machine storing keys along with the plots.


```Python
class RespondHeaderSignature:
    quality_string: bytes32
    header_hash_signature: PrependSignature
```
The harvester responds with a BLS prepend signature on the header hash.


```Python
class RequestPartialProof:
    quality_string: bytes32
    farmer_target_hash: bytes32
```
The farmer requests a partial proof to be used for claiming pool rewards.
These are sent much more often than `RequestHeaderSignature`, since pool partials happen more often than good blocks.
The harvester signs that farmer target hash (target of funds) with the plot private key.


```Python
class RespondPartialProof:
    quality_string: bytes32
    farmer_target_signature: PrependSignature
```
The harvester responds with the signature, which the farmer can then send to the pool to claim funds.

</details>
