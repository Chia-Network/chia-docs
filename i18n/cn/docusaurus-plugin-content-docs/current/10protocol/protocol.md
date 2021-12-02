---
sidebar_position: 1
---

# 10.1 全节点协议

> Full Node Protocol

该协议是 Chia 系统中全节点之间通信的双向协议。发送方是发送消息的全节点，接收方是接收消息的全节点。

<details>
<summary>原文参考</summary>

This protocol is a bidirectional protocol for communication between full nodes in the Chia system.
The sender is the full node sending the message, and the recipient is the full node that is receiving the message.

</details>

## 新峰值

每当我们节点的峰值权重增加时（每当区块链向前移动时）发送给对等节点。分叉点允许对等点检测重组发生的深度，并获取正确的块。未完成奖励区块哈希允许接收对等方将其缓存用于未完成区块，因为他们很可能已经拥有同一区块的未完成版本，因此不需要重新请求区块交易生成器。

通常，在正常操作期间，对等方将只请求最新的块，或者如果他们已经从另一个对等方接收到该消息，则忽略该消息。如果我们落后几个块，则块以相反的顺序一个一个地取出直到分叉。

如果我们远远落后于这个峰值，我们将开始批量同步（批量下载几十个块）或长时间同步，我们下载权重证明，然后批量下载许多块。

```python
class NewPeak(Streamable):
    header_hash: bytes32    # header_hash of new block
    height: uint32          # height of new block
    weight: uint128         # weight of new block
    fork_point_with_previous_peak: uint32
    unfinished_reward_block_hash: bytes32
```

<details>
<summary>原文参考</summary>

- ## new_peak

Sent to peers whenever our node's peak weight advances (whenever blockchain moves forward).
The fork point allows peers to detect how deep of a reorg happenned, and fetch the correct blocks.
The unfinished reward block hash allows the receiving peer to use their cache for unfinished blocks,
since they most likely already have the unfinished
version of the same block, and therefore don't need to re-request the block transactions generator.

Usually, during normal operation, peers will ask for just the latest block, or
ignore this message if they have already received it from another peer.  If we are a few blocks behind, blocks are
fetched one by one in reverse order up to the fork.

If we are far behind this peak, we will start a batch sync (download a few tens of blocks in batches) or a long sync, 
where we download a weight proof and then download many blocks in batches. 

```python
class NewPeak(Streamable):
    header_hash: bytes32    # header_hash of new block
    height: uint32          # height of new block
    weight: uint128         # weight of new block
    fork_point_with_previous_peak: uint32
    unfinished_reward_block_hash: bytes32
```

</details>

## 新交易

当新的支出包被添加到内存池时发送给对等点。然后接收对等方可以选择忽略它，或请求整个交易。

```python
class NewTransaction(Streamable):
    transaction_id: bytes32  # hash of the spend bundle
    cost: uint64             # cost of the transaction, used to see if fees are sufficient for mempool inclusion
    fees: uint64             # fees in mojo of transaction, used to see if fees are sufficient for mempool inclusion
```

<details>
<summary>原文参考</summary>

- ## new_transaction

Sent to peers when a new spend bundle has been added to the mempool. The receiving peer can then choose to ignore
it, or request the whole transaction. 

```python
class NewTransaction(Streamable):
    transaction_id: bytes32  # hash of the spend bundle
    cost: uint64             # cost of the transaction, used to see if fees are sufficient for mempool inclusion
    fees: uint64             # fees in mojo of transaction, used to see if fees are sufficient for mempool inclusion
```

</details>

## 请求交易

通过其 id 从对等方请求完整交易（花费捆绑）。如果对等方没有响应，则为同一事务联系其他对等方。

```python
class RequestTransaction(Streamable):
    transaction_id: bytes32  # hash of the spendbundle
```

<details>
<summary>原文参考</summary>

- ## request_transaction

Request for a full transaction (spend bundle) from a peer by its id. If a peer does not respond, other peers are contacted
for the same transaction.

```python
class RequestTransaction(Streamable):
    transaction_id: bytes32  # hash of the spendbundle
```

</details>

## 响应交易

对 `request_transaction` 消息的 响应 。 将支出包发送给对等方。 要查看 a 的内容 `SpendBundle` ，请参阅 [本节](http://10.177.0.168:3000/cn/docs/04coin-set-model/spend_bundles) 。

```python
class RespondTransaction(Streamable):
    transaction: SpendBundle
```

<details>
<summary>原文参考</summary>

- ## respond_transaction

Response for a `request_transaction` message. Sends a spend bundle to a peer. To see the contents of a `SpendBundle`, see [this section](/docs/04coin-set-model/spend_bundles).

```python
class RespondTransaction(Streamable):
    transaction: SpendBundle
```

</details>

## 请求权重证明 

向对等方请求重量证明。 这是在开始长同步之前完成的。 权重证明允许我们的节点验证 `new_peak` 我们从对等方收到的 a 是否 对应于实际有效的区块链。 这证明在该区块链上使用了一定数量的“权重”或空间和时间。

```python
class RequestProofOfWeight(Streamable):
    total_number_of_blocks: uint32  # Height of the peak block
    tip: bytes32                    # The header_hash of the peak block
```

<details>
<summary>原文参考</summary>

- ## request_proof_of_weight

Request a weight proof from a peer. This is done right before starting a long sync. The weight proof allows our
node to validate whether a `new_peak` that we received from a peer corresponds to an actual valid blokchain. It is 
proof that a certain amount of "weight", or space and time, has been used on that blockchain. 

```python
class RequestProofOfWeight(Streamable):
    total_number_of_blocks: uint32  # Height of the peak block
    tip: bytes32                    # The header_hash of the peak block
```

</details>

## 响应权重证明

对 `request_proof_of_weight` 消息的 响应 。 请注意，权重证明可能非常大，在数十 MB 范围内。 如果链 VDF 被压缩（又名 blueboxed），那么它们的权重证明会更小。 这是权重证明的V1版本，以后可能会加入更高效的版本。

```python
class RespondProofOfWeight(Streamable):
    wp: WeightProof
    tip: bytes32
```

<details>
<summary>原文参考</summary>

- ## respond_proof_of_weight

Response to a `request_proof_of_weight` message. Note that weight proofs can be quite large, in the tens of MB range.
If the chain VDFs are compressed (aka blueboxed), then they weight proofs will be smaller.
This is the V1 version of weight proofs, more efficient versions might be added in the future.

```python
class RespondProofOfWeight(Streamable):
    wp: WeightProof
    tip: bytes32
```

</details>

## 请求块

从对等点请求某个高度的块。 收到 `new_peak` 消息 后调用 。

```python
class RequestBlock(Streamable):
    height: uint32                   # Height of the block to request
    include_transaction_block: bool  # Whether to include transaction data
```

<details>
<summary>原文参考</summary>

- ## request_block


Request for a block at a certain height from a peer.  Called after receiving a `new_peak` message.


```python
class RequestBlock(Streamable):
    height: uint32                   # Height of the block to request
    include_transaction_block: bool  # Whether to include transaction data
```

</details>

## 响应块

对 `request_block` 消息的响应 。

```python
class RespondBlock(Streamable):
    block: FullBlock
```

<details>
<summary>原文参考</summary>

- ## respond_block

Response to a `request_block` message.

```python
class RespondBlock(Streamable):
    block: FullBlock
```

</details>

## 拒绝块

拒绝一条 `request_block` 消息。

```python
class RejectBlock(Streamable):
    height: uint32
```

<details>
<summary>原文参考</summary>

- ## reject_block


Rejection to a `request_block` message.

```python
class RejectBlock(Streamable):
    height: uint32
```

</details>

## 请求块

从对等方一次请求多个块。

```python
class RequestBlocks(Streamable):
    start_height: uint32             
    end_height: uint32               # Inclusive
    include_transaction_block: bool  # Whether to include transaction data
```

<details>
<summary>原文参考</summary>

- ## request_blocks

Request multiple blocks at once from a peer.

```python
class RequestBlocks(Streamable):
    start_height: uint32             
    end_height: uint32               # Inclusive
    include_transaction_block: bool  # Whether to include transaction data
```

</details>

## 响应块

对 `request_blocks` 消息的 响应 。

```python
class RespondBlocks(Streamable):
    start_height: uint32
    end_height: uint32
    blocks: List[FullBlock]
```

<details>
<summary>原文参考</summary>

- ## respond_blocks

Response to a `request_blocks` message.

```python
class RespondBlocks(Streamable):
    start_height: uint32
    end_height: uint32
    blocks: List[FullBlock]
```

</details>

## 拒绝块

拒绝一条 `request_blocks` 消息。

```python
class RejectBlocks(Streamable):
    start_height: uint32
    end_height: uint32
```

<details>
<summary>原文参考</summary>

- ## reject_blocks

Rejection to a `request_blocks` message.

```python
class RejectBlocks(Streamable):
    start_height: uint32
    end_height: uint32
```

</details>

## 新的未完成块 

通知另一个对等点新的未完成块已添加到缓存中。这些未完成的区块暂时保留，直到注入点VDF释放，区块才可以“完成”并加入区块链。

```python
class NewUnfinishedBlock(Streamable):
    unfinished_reward_hash: bytes32
```

<details>
<summary>原文参考</summary>

- ## new_unfinished_block

Notification to another peer that a new unfinished block was added to the cache. These unfinished blocks are kept
around temporarily, until the infusion point VDF is released, and the block can be "finished" and added to the blockchain.

```python
class NewUnfinishedBlock(Streamable):
    unfinished_reward_hash: bytes32
```

</details>

## 请求未完成块

从对等方请求未完成的块。

```python
class RequestUnfinishedBlock(Streamable):
    unfinished_reward_hash: bytes32
```

<details>
<summary>原文参考</summary>

- ##  request_unfinished_block

Request for an unfinished block from a peer.

```python
class RequestUnfinishedBlock(Streamable):
    unfinished_reward_hash: bytes32
```

</details>

## 响应未完成块

对 `request_unfinished_block` 消息的 响应 。

```python
class RespondUnfinishedBlock(Streamable):
    unfinished_block: UnfinishedBlock
```

<details>
<summary>原文参考</summary>

- ## respond_unfinished_block

Response to a `request_unfinished_block` message.

```python
class RespondUnfinishedBlock(Streamable):
    unfinished_block: UnfinishedBlock
```

</details>

## 新的标牌点或子槽的末端

当节点向全节点存储添加新的标牌点或新的子槽末端时发送。接收者可以选择请求对象，或者如果它们远远落后，则可能请求前一个子槽。比如最近同步到了区块链的顶峰。

```python
class NewSignagePointOrEndOfSubSlot(Streamable):
    prev_challenge_hash: Optional[bytes32]  # Challenge hash at the start of the previous sub slot, if present
    challenge_hash: bytes32                 # Challenge hash at the start of the sub slot
    index_from_challenge: uint8             # Index from the start, 0 for end of sub slot
    last_rc_infusion: bytes32               # Last reward chain infusion hash
```

<details>
<summary>原文参考</summary>

- ## new_signage_point_or_end_of_sub_slot

Sent when the node adds a new signage point or a new end of sub slot to the full node store.  The receiver can choose
to request the object, or potentially request the previous sub slot, if they are far behind. For example, recently
synced up to the peak of the blockchain.

```python
class NewSignagePointOrEndOfSubSlot(Streamable):
    prev_challenge_hash: Optional[bytes32]  # Challenge hash at the start of the previous sub slot, if present
    challenge_hash: bytes32                 # Challenge hash at the start of the sub slot
    index_from_challenge: uint8             # Index from the start, 0 for end of sub slot
    last_rc_infusion: bytes32               # Last reward chain infusion hash
```

</details>

## 请求标牌点或子槽末端

请求标牌点或插槽末端。

```python
class RequestSignagePointOrEndOfSubSlot(Streamable):
    challenge_hash: bytes32
    index_from_challenge: uint8
    last_rc_infusion: bytes32
```

<details>
<summary>原文参考</summary>

- ## request_signage_point_or_end_of_sub_slot

Request for a signage point or end of slot.

```python
class RequestSignagePointOrEndOfSubSlot(Streamable):
    challenge_hash: bytes32
    index_from_challenge: uint8
    last_rc_infusion: bytes32
```

</details>

## 响应标牌点

 `request_signage_point_or_end_of_sub_slot`的响应 。 收到此消息后，接收者将检查所有 VDF 是否正确，并将其转发给其他完整节点和潜在的农民。

```python
class RespondSignagePoint(Streamable):
    index_from_challenge: uint8       # Which index out of the 64 signage points, cannot be 0 since that is the EOS
    challenge_chain_vdf: VDFInfo    
    challenge_chain_proof: VDFProof
    reward_chain_vdf: VDFInfo
    reward_chain_proof: VDFProof
```

<details>
<summary>原文参考</summary>

- ## respond_signage_point

Response for `request_signage_point_or_end_of_sub_slot`. After receiving this message, the recipient will check that
all VDFs are correct, and forward it to other full nodes and potentially farmers.

```python
class RespondSignagePoint(Streamable):
    index_from_challenge: uint8       # Which index out of the 64 signage points, cannot be 0 since that is the EOS
    challenge_chain_vdf: VDFInfo    
    challenge_chain_proof: VDFProof
    reward_chain_vdf: VDFInfo
    reward_chain_proof: VDFProof
```

</details>

## 响应子槽末端

`request_signage_point_or_end_of_sub_slot` 在 where `index_from_challenge` 为零 的情况下的 另一个响应 。 这也由全节点验证和转发，类似于标牌点。

```python
class RespondEndOfSubSlot(Streamable):
    end_of_slot_bundle: EndOfSubSlotBundle
```

<details>
<summary>原文参考</summary>

- ## respond_end_of_sub_slot

Another response for `request_signage_point_or_end_of_sub_slot` in the case where `index_from_challenge` is zero.
This is also verified and forwarded by the full node, similar to signage points.

```python
class RespondEndOfSubSlot(Streamable):
    end_of_slot_bundle: EndOfSubSlotBundle
```

</details>

## 请求内存池交易

这是对内存池中的交易的请求。 该过滤器对应于 BIP158 紧凑型块过滤器，它允许接收者查看发送者已经拥有的交易（误报的可能性很小），而无需发送所有交易 ID。 然后接收方可以 `respond_transction` 直接 使用响应 ，但不应发送大量交易，以免压倒原始发送对等方。

```python
class RequestMempoolTransactions(Streamable):
    filter: bytes
```

<details>
<summary>原文参考</summary>

- ## request_mempool_transactions

This is a request for transactions in the mempool. The filter corresponds to a BIP158 Compact Block Filter, which
allows the recipient to see what transactions the sender already has (with some small chance for false positives), 
without sending all transaction IDs. The recipient can then respond using `respond_transction` directly, but should
not send a very large number of transactions, to not overwhelm the original sending peer.

```python
class RequestMempoolTransactions(Streamable):
    filter: bytes
```

</details>

## 新的紧凑型 vdf

```python
class NewCompactVDF(Streamable):
    height: uint32
    header_hash: bytes32
    field_vdf: uint8
    vdf_info: VDFInfo
```


```python
class RequestCompactVDF(Streamable):
    height: uint32
    header_hash: bytes32
    field_vdf: uint8
    vdf_info: VDFInfo
```


```python
class RespondCompactVDF(Streamable):
    height: uint32
    header_hash: bytes32
    field_vdf: uint8
    vdf_info: VDFInfo
    vdf_proof: VDFProof
```


```python
class RequestPeers(Streamable):
    """
    Return full list of peers
    """
```


```python
class RespondPeers(Streamable):
    peer_list: List[TimestampedPeerInfo]
```

<details>
<summary>原文参考</summary>

- ## new_compact_vdf

```python
class NewCompactVDF(Streamable):
    height: uint32
    header_hash: bytes32
    field_vdf: uint8
    vdf_info: VDFInfo
```


```python
class RequestCompactVDF(Streamable):
    height: uint32
    header_hash: bytes32
    field_vdf: uint8
    vdf_info: VDFInfo
```


```python
class RespondCompactVDF(Streamable):
    height: uint32
    header_hash: bytes32
    field_vdf: uint8
    vdf_info: VDFInfo
    vdf_proof: VDFProof
```


```python
class RequestPeers(Streamable):
    """
    Return full list of peers
    """
```


```python
class RespondPeers(Streamable):
    peer_list: List[TimestampedPeerInfo]
```

</details>
