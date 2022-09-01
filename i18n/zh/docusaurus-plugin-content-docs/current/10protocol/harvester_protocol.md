---
sidebar_position: 2
---

# 10.2 Harvester Protocol

收割机协议定义了农民服务和收割机服务之间发送的消息。 对于小农户来说，它们往往是一台相同的机器，但对于中型或大型农户，它们可以使用多台机器。

## harvester_handshake

农夫机和收割机之间的握手。 农夫机将此消息发送给收割机，以初始化它们并告诉他们可以使用哪些矿池公钥和农民公钥。

一个农夫机可以连接多台收割机，但一台收割机只能连接一个农夫机。 收割机可以开始使用与这些密钥相关联的图块。

```python
class HarvesterHandshake(Streamable):
    farmer_public_keys: List[G1Element]
    pool_public_keys: List[G1Element]
```

## new_signage_point_harvester

此消息通知收割机新的挑战。 The harvester first checks which plots pass the plot filter (see section 3.6), and for those that do, fetches the quality. 对于每种质量，这需要大约 7 次磁盘搜索。 预计每个地块平均有一个空间证明，因此对于 50 个图块，收割机将具有大约 50 种质量。 For those qualities that are sufficiently good to win a block or a pool partial, the whole proof is fetched (64 random reads in the plot), and then `new_proof_of_space` is sent to the farmer.

```python
class NewSignagePointHarvester:
    challenge_hash: bytes32
    difficulty: uint64
    sub_slot_iters: uint64
    signage_point_index: uint8
    sp_hash: bytes32
    pool_difficulties: List[PoolDifficulty] 0 for an end of sub slot signage point
    sp_hash: bytes32            # The hash of the signage point, this is == challenge_hash iff the index is 0
    pool_difficulties: List[PoolDifficulty]    # List of each pool the farmer is in, and what the difficulty is for that pool


class PoolDifficulty(Streamable):
    difficulty: uint64                  # The current difficulty that is set for plots belonging to this pool contract
    sub_slot_iters: uint64              # The pool sub slot iters, which is static for each network (mainnet, testnet)
    pool_contract_puzzle_hash: bytes32  # The pool contract puzzle hash which can be in many plots
```

## ## new_signage_point_harvester

A successful proof of space that is sent to the farmer. The `challenge_hash`, `sp_hash`, and `signage_point_index` correspond to the ones sent in `new_signage_point_harvester`. Many proofs can be submitted for each signage point.

The plot is a string chosen by the harvester to represent the winning plot (and proof index) in future communications between the farmer and harvester. This can be, for example, the filename of the plot with an additional byte for the index. This is relevant, because a certain plot can potentially have more than one proof for each signage point, and we want communications for each proof to be separate and not conflict (specifically to fetch signatures from the harvester).

```python
class NewSignagePointHarvester:
    challenge_hash: bytes32
    difficulty: uint64
    sub_slot_iters: uint64
    signage_point_index: uint8
    sp_hash: bytes32
    pool_difficulties: List[PoolDifficulty]
```

## request_signatures

This is a request from the farmer to the harvester for a signature from the plot key, for a specific plot (using the plot identifier from `new_proof_of_space`). The farmer can request signatures from multiple messages.

```python
class ChallengeResponse:
    challenge_hash: bytes32
    quality_string: bytes32
    plot_size: uint8
```

## respond_signatures

This is a response to `request_signatures`. The local public key is the public key corresponding to the secret key in the plot. To see more about the keys for plots, look at [section 9](/docs/09keys/keys-and-signatures).

```python
class RequestProofOfSpace:
    quality_string: bytes32
```

## request_plots

PK

```python
class RespondProofOfSpace:
    quality_string: bytes32
    proof: ProofOfSpace
```

## respond_plots

A response to `request_plots` request. This message is also sent whenever a new plot is loaded.

```python
class RequestHeaderSignature:
    quality_string: bytes32
    header_hash: bytes32
```
