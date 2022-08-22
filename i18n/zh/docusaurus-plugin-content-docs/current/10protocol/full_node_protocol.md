---
sidebar_position: 3
---

# 10.3 全节点协议

该协议是奇亚系统中全节点之间通信的双向协议。 发送方是发送消息的全节点，接收方是接收消息的全节点。

## new_peak

每当我们节点的峰值权重增加时（每当区块链向前移动时）发送给对等节点。 分叉点允许对等点检测重组发生的深度，并获取正确的区块。 未完成奖励区块哈希允许接收对等方将其缓存用于未完成区块，因为他们很可能已经拥有同一区块的未完成版本，因此不需要重新请求区块交易生成器。

通常，在正常操作期间，对等方将只请求最新的块，或者如果他们已经从另一个对等方接收到该消息，则忽略该消息。 如果我们落后几个块，则块以相反的顺序一个一个地取出直到分叉。

If we are far behind this peak, we will start a batch sync (download a few tens of blocks in batches) or a long sync, where we download a weight proof and then download many blocks in batches.

```python
class NewPeak(Streamable):
    header_hash: bytes32    # header_hash of new block
    height: uint32          # height of new block
    weight: uint128         # weight of new block
    fork_point_with_previous_peak: uint32
    unfinished_reward_block_hash: bytes32
```

## new_transaction

当新的花费组合被添加到内存池时发送给对等点。 然后接收对等方可以选择忽略它，或请求整个交易。

```python
class NewTransaction(Streamable):
    transaction_id: bytes32  # hash of the spend bundle
    cost: uint64             # cost of the transaction, used to see if fees are sufficient for mempool inclusion
    fees: uint64             # fees in mojo of transaction, used to see if fees are sufficient for mempool inclusion
```

## request_transaction

通过其 id 从对等方请求完整交易（花费组合）。 如果对等方没有响应，则为同一事务联系其他对等方。

```python
class RequestTransaction(Streamable):
    transaction_id: bytes32  # hash of the spendbundle
```

## respond_transaction

`request_transaction` 消息的响应。 将花费组合发送给对等方。 要查看 `花费组合` 的内容，请参阅[此部分](/docs/04coin-set-model/spend_bundles)。

```python
class RespondTransaction(Streamable):
    transaction: SpendBundle
```

## request_proof_of_weight

向对等方请求重量证明。 这是在开始长同步之前完成的。 权重证明允许我们的节点验证我们从对等方收到的 `new_peak` 是否对应于实际有效的区块链。 这证明在该区块链上使用了一定数量的“权重”或空间和时间。

```python
class RequestProofOfWeight(Streamable):
    total_number_of_blocks: uint32  # Height of the peak block
    tip: bytes32                    # The header_hash of the peak block
```

## respond_proof_of_weight

对 `request_proof_of_weight` 消息的响应。 请注意，权重证明可能非常大，在数十 MB 范围内。 如果链 VDF 被压缩（又名 blueboxed），那么它们的权重证明会更小。 这是权重证明的 V1 版本，以后可能会加入更高效的版本。

```python
class RespondProofOfWeight(Streamable):
    wp: WeightProof
    tip: bytes32
```

## request_block

从对等点请求某个高度的区块。 在收到 `new_peak` 消息后调用。

```python
class RequestBlock(Streamable):
    height: uint32                   # Height of the block to request
    include_transaction_block: bool  # Whether to include transaction data
```

## respond_block

Response to a `request_block` message.

```python
class RespondBlock(Streamable):
    block: FullBlock
```

## reject_block

Rejection to a `request_block` message.

```python
class RejectBlock(Streamable):
    height: uint32
```

## request_blocks

Request multiple blocks at once from a peer.

```python
class RequestBlocks(Streamable):
    start_height: uint32
    end_height: uint32               # Inclusive
    include_transaction_block: bool  # Whether to include transaction data
```

## respond_blocks

Response to a `request_blocks` message.

```python
class RespondBlocks(Streamable):
    start_height: uint32
    end_height: uint32
    blocks: List[FullBlock]
```

## reject_blocks

Rejection to a `request_blocks` message.

```python
class RejectBlocks(Streamable):
    start_height: uint32
    end_height: uint32
```

## new_unfinished_block

通知另一个对等点新的未完成块已添加到缓存中。 这些未完成的区块暂时保留，直到融入点 VDF 释放，区块才可以“完成”并加入区块链。

```python
class NewUnfinishedBlock(Streamable):
    unfinished_reward_hash: bytes32
```

## request_unfinished_block

Request for an unfinished block from a peer.

```python
class RequestUnfinishedBlock(Streamable):
    unfinished_reward_hash: bytes32
```

## respond_unfinished_block

Response to a `request_unfinished_block` message.

```python
class RespondUnfinishedBlock(Streamable):
    unfinished_block: UnfinishedBlock
```

## new_signage_point_or_end_of_sub_slot

当节点向全节点存储添加新的标牌点或新的子时隙末端时发送。 接收者可以选择请求对象，或者如果它们远远落后，则可能请求前一个子时隙。 比如最近同步到了区块链的顶峰。

```python
class NewSignagePointOrEndOfSubSlot(Streamable):
    prev_challenge_hash: Optional[bytes32]  # Challenge hash at the start of the previous sub slot, if present
    challenge_hash: bytes32                 # Challenge hash at the start of the sub slot
    index_from_challenge: uint8             # Index from the start, 0 for end of sub slot
    last_rc_infusion: bytes32               # Last reward chain infusion hash
```

## request_signage_point_or_end_of_sub_slot

Request for a signage point or end of slot.

```python
class RequestSignagePointOrEndOfSubSlot(Streamable):
    challenge_hash: bytes32
    index_from_challenge: uint8
    last_rc_infusion: bytes32
```

## respond_signage_point

`request_signage_point_or_end_of_sub_slot` 的响应。 收到此消息后，接收者将检查所有 VDF 是否正确，并将其转发给其他完整节点和潜在的农民。

```python
class RespondSignagePoint(Streamable):
    index_from_challenge: uint8       # Which index out of the 64 signage points, cannot be 0 since that is the EOS
    challenge_chain_vdf: VDFInfo
    challenge_chain_proof: VDFProof
    reward_chain_vdf: VDFInfo
    reward_chain_proof: VDFProof
```

## respond_end_of_sub_slot

在 `index_from_challenge` 为零的情况下对 `request_signage_point_or_end_of_sub_slot` 的另一个响应。 这也由全节点验证和转发，类似于标牌点。

```python
class RespondEndOfSubSlot(Streamable):
    end_of_slot_bundle: EndOfSubSlotBundle
```

## request_mempool_transactions

这是对内存池中的交易的请求。 该过滤器对应于 BIP158 紧凑型块过滤器，它允许接收者查看发送者已经拥有的交易（误报的可能性很小），而无需发送所有交易 ID。 然后接收方可以直接使用 `respond_transction` 进行响应，但不应发送大量交易，以免压倒原始发送对等方。

```python
class RequestMempoolTransactions(Streamable):
    filter: bytes
```

## new_compact_vdf

通知对等方新的紧凑型 VDF 已添加到区块链。 紧凑型 VDF 是块中存在的 VDF 证明的较小版本。 他们不会改变区块本身，他们只是压缩区块数据以保持数据库更小和同步时间更低。 实际证明

```python
class NewCompactVDF(Streamable):
    height: uint32           # Height of the block which has a new VDF
    header_hash: bytes32     # Header hash of that block
    field_vdf: uint8         # Which VDF in that block was updated (blocks have multiple VDFs)
    vdf_info: VDFInfo        # Info of the VDF that was updated
```

## request_compact_vdf

A request to a peer for a compact VDf.

```python
class RequestCompactVDF(Streamable):
    height: uint32
    header_hash: bytes32
    field_vdf: uint8
    vdf_info: VDFInfo
```

## respond_compact_vdf

A response to a peer that requested a compact VDF.

```python
class RespondCompactVDF(Streamable):
    height: uint32
    header_hash: bytes32
    field_vdf: uint8
    vdf_info: VDFInfo
    vdf_proof: VDFProof
```

## request_peers

请求对等方列表。 此消息中没有正文。 这通常在连接到对等方时发送。

```python
class RequestPeers(Streamable):
    """
    Return full list of peers
    """
```

## respond_peers

对 `request_peers` 的响应，包含每个对等方的 ip 和端口列表。 不得大于 1000。 时间戳对应于上次更新此对等记录的时间，基于对等数据库更新规则。

```python
class RespondPeers(Streamable):
    peer_list: List[TimestampedPeerInfo]
```
