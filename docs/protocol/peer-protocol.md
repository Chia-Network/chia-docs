---
title: Peer Protocol
slug: /peer-protocol
---

This protocol is a bidirectional protocol for communication between full nodes in the Chia system.
The sender is the full node sending the message, and the recipient is the full node that is receiving the message.

## new_peak

Sent to peers whenever our node's peak weight advances (whenever the blockchain moves forward).
The fork point allows peers to detect how deep of a reorg happened, and fetch the correct blocks.
The unfinished reward block hash allows the receiving peer to use their cache for unfinished blocks,
since they most likely already have the unfinished
version of the same block, and therefore don't need to re-request the block transactions generator.

Usually, during normal operation, peers will ask for just the latest block, or
ignore this message if they have already received it from another peer. If we are a few blocks behind, blocks are
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

## new_transaction

Sent to peers when a new spend bundle has been added to the mempool. The receiving peer can then choose to ignore
it, or request the whole transaction.

```python
class NewTransaction(Streamable):
    transaction_id: bytes32  # hash of the spend bundle
    cost: uint64             # cost of the transaction, used to see if fees are sufficient for mempool inclusion
    fees: uint64             # fees in mojo of transaction, used to see if fees are sufficient for mempool inclusion
```

## request_transaction

Request for a full transaction (spend bundle) from a peer by its id. If a peer does not respond, other peers are contacted
for the same transaction.

```python
class RequestTransaction(Streamable):
    transaction_id: bytes32  # hash of the spendbundle
```

## respond_transaction

Response for a `request_transaction` message. Sends a spend bundle to a peer. To see the contents of a `SpendBundle`, see the [Spend Bundles page](/spend-bundles).

```python
class RespondTransaction(Streamable):
    transaction: SpendBundle
```

## request_proof_of_weight

Request a weight proof from a peer. This is done right before starting a long sync. The weight proof allows our
node to validate whether a `new_peak` that we received from a peer corresponds to an actual valid blockchain. It is
proof that a certain amount of "weight", or space and time, has been used on that blockchain.

```python
class RequestProofOfWeight(Streamable):
    total_number_of_blocks: uint32  # Height of the peak block
    tip: bytes32                    # The header_hash of the peak block
```

## respond_proof_of_weight

Response to a `request_proof_of_weight` message. Note that weight proofs can be quite large, in the tens of MB range.
If the chain VDFs are compressed (aka blueboxed), then they weight proofs will be smaller.
This is the V1 version of weight proofs, more efficient versions might be added in the future.

```python
class RespondProofOfWeight(Streamable):
    wp: WeightProof
    tip: bytes32
```

## request_block

Request for a block at a certain height from a peer. Called after receiving a `new_peak` message.

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

Notification to another peer that a new unfinished block was added to the cache. These unfinished blocks are kept
around temporarily, until the infusion point VDF is released, and the block can be "finished" and added to the blockchain.

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

Sent when the node adds a new signage point or a new end of sub slot to the full node store. The receiver can choose
to request the object, or potentially request the previous sub slot, if they are far behind. For example, recently
synced up to the peak of the blockchain.

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

## respond_end_of_sub_slot

Another response for `request_signage_point_or_end_of_sub_slot` in the case where `index_from_challenge` is zero.
This is also verified and forwarded by the full node, similar to signage points.

```python
class RespondEndOfSubSlot(Streamable):
    end_of_slot_bundle: EndOfSubSlotBundle
```

## request_mempool_transactions

This is a request for transactions in the mempool. The filter corresponds to a BIP158 Compact Block Filter, which
allows the recipient to see what transactions the sender already has (with some small chance for false positives),
without sending all transaction IDs. The recipient can then respond using `respond_transaction` directly, but should
not send a very large number of transactions, to not overwhelm the original sending peer.

```python
class RequestMempoolTransactions(Streamable):
    filter: bytes
```

## new_compact_vdf

A notification to a peer that a new compact VDF has been added to the blockchain. Compact VDFs
are smaller versions of VDF proofs present in blocks. They do not change the block itself, they just
compress the block data to keep the DB smaller and sync time lower. The actual proof

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

Request a list of peers. There is no body in this message. This is usually sent when connecting
to a peer.

```python
class RequestPeers(Streamable):
    """
    Return full list of peers
    """
```

## respond_peers

A response to `request_peers`, containing a list of ip and port for each peer. Must be no larger than 1000.
The timestamp corresponds to the last time this peer's record was updated, based on the peer DB update rules.

```python
class RespondPeers(Streamable):
    peer_list: List[TimestampedPeerInfo]
```
