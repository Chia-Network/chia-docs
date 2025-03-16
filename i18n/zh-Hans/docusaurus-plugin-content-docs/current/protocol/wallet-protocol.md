---
title: Wallet Protocol
slug: /wallet-protocol
---

[Wallet protocol source](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/wallet_protocol.py)

This protocol is a bidirectional protocol for communication between full nodes and wallets in the Chia system. This is also sometimes referred to as the light client protocol.

The wallet protocol contains two sub protocols by which a wallet can sync transaction from a node.

## Privacy Protocol

The first is the privacy protocol, where the wallet downloads each header and checks the filter for transactions. It is more private, but much slower.

## Fast Sync Protocol (recommended)

The second is the fast sync protocol, where the wallet directly asks the node to look for certain coin ids or puzzle hashes. It has less privacy but is much faster. The following is the flow for syncing for a wallet that any wallet developer should follow. It is important to connect to several random nodes to increase security. This sync protocol should be very fast for users who don't have many transactions.

1. Perform a DNS lookup to obtain random node IPS: `dig dns-introducer.chia.net`.
2. Connect to a few nodes, to ensure the server does not omit transactions. The nodes will send a `new_peak_wallet` message with their claimed peaks.
3. Download a weight proof from one of the nodes (or several) with the heaviest peak
4. Verify the weight proof to make sure the claimed peak is correct
5. Subscribe to first 100 puzzle hashes for our key (both observer and non-observer)
6. Validate the puzzle hash subscription state returned from the full node. This requires making sure the block in which these coins are included is part of the chain of SubEpochSummaries. Only the block hashes have to be checked here. Furthermore, a few block headers (around 30-50) should be validated after this block to make sure it is properly buried.
7. From step 5, we obtain all coin IDs which we are interested in, and we restore any CAT wallets for coins which have our puzzle hash in the hint.
8. Subscribe to interesting coin IDs
9. Validate the coin subscription returned from the full node, similar to how it's done in step 5

# Protocol Messages

## request_puzzle_solution

A request from the wallet to the full node for the puzzle and solution of a certain spent coin ID.

```python
class RequestPuzzleSolution(Streamable):
    coin_name: bytes32  # ID of the spent coin
    height: uint32      # Spent height
```

## respond_puzzle_solution

A response to a `request_puzzle_solution` request.

```python

class RespondPuzzleSolution(Streamable):
    response: PuzzleSolutionResponse

class PuzzleSolutionResponse(Streamable):
    coin_name: bytes32
    height: uint32
    puzzle: Program
    solution: Program
```

## reject_puzzle_solution

A rejection to a `request_puzzle_solution` request.

```python
class RejectPuzzleSolution(Streamable):
    coin_name: bytes32
    height: uint32
```

## send_transaction

A message by which a wallet can send a transaction to the mempool and broadcast it to the network. The full node will attempt to include it into the mempool.

```python
class SendTransaction(Streamable):
    transaction: SpendBundle
```

## transaction_ack

A response to a `send_transaction` message. After attempting to include the transaction, the mempool inclusion status is returned, with an optional english error string in case it did not succeed.

```python
class MempoolInclusionStatus(IntEnum):
    SUCCESS = 1  # Transaction added to mempool
    PENDING = 2  # Transaction not yet added to mempool
    FAILED = 3  # Transaction was invalid and dropped

class TransactionAck(Streamable):
    txid: bytes32
    status: uint8  # MempoolInclusionStatus
    error: Optional[str]
```

## new_peak_wallet

A notification from the full node to the wallet that the blockchain's peak has changed.

```python
class NewPeakWallet(Streamable):
    header_hash: bytes32       # New peak of the blockchain
    height: uint32             # New peak's height
    weight: uint128            # New peak's weight
    fork_point_with_previous_peak: uint32
```

## request_block_header

A request from the wallet to the full node for a HeaderBlock at a specific height.

```python
class RequestBlockHeader(Streamable):
    height: uint32  # Height of the header block
```

## respond_block_header

A response to a `request_block_header` request.

```python
class RespondBlockHeader(Streamable):
    header_block: HeaderBlock
```

## request_block_headers

A request from the wallet to the full node for a HeaderBlock at a specific height.  
NOTE: this message deprecates and replaces `request_header_blocks` (flip block and header).

```python
class RequestBlockHeaders(Streamable):
    height: uint32  # Height of the header block
```

## respond_block_headers

A response to a `request_block_headers` request.  
NOTE: this message deprecates and replaces `respond_header_blocks` (flip block and header).

```python
class RespondBlockHeaders(Streamable):
    header_block: HeaderBlock
```

## reject_block_headers

A rejection to a `request_block_headers` request.  
NOTE: this message deprecates and replaces `reject_header_blocks` (flip block and header).

```python
class RejectBlockHeaders(Streamable):
    start_height: uint32
    end_height: uint32
```

## reject_header_request

A rejection to a `request_block_header` request.

```python
class RejectHeaderRequest(Streamable):
    height: uint32
```

## request_removals

A request from the wallet to the full node for the removals (removed coins) of a certain block. If `coin_names` is None, we are requesting all removals in the block. Otherwise, we are requesting only these specific removal coin IDs.

```python
class RequestRemovals(Streamable):
    height: uint32        # Height of the block
    header_hash: bytes32  # Header hash of the block
    coin_names: Optional[List[bytes32]]
```

## respond_removals

A response to a `request_removals` request. If `coin_names` is None, all removals are returned, and `proofs` is set to None. Otherwise, only the requested coins are returned, (id to coin tuples) and a proof is returned for each coin id (id to proof tuples). The proofs are merkle set inclusion proofs. See `merkle_set.py` in chia-blockchain for more info on how to verify these proofs.

```python
class RespondRemovals(Streamable):
    height: uint32
    header_hash: bytes32
    coins: List[Tuple[bytes32, Optional[Coin]]]
    proofs: Optional[List[Tuple[bytes32, bytes]]]
```

## reject_removals_request

A rejection to a `request_removals` request.

```python
class RejectRemovalsRequest(Streamable):
    height: uint32
    header_hash: bytes32
```

## request_additions

A request from the wallet to the full node for the additions (added coins) of a certain block. If `puzzle_hashes` is None, we are requesting all additions in the block. Otherwise, we are requesting only additions which have this puzzle hash.

```python
class RequestAdditions(Streamable):
    height: uint32
    header_hash: Optional[bytes32]
    puzzle_hashes: Optional[List[bytes32]]
```

## respond_additions

A response to a `request_additions` request. If `puzzle_hashes` is None, all additions are returned, and `proofs` is set to None. Otherwise, only the requested coins are returned, (puzzle_hash to list of coin tuples, since multiple coins can have the same puzzle hash) and a proof is returned for each coin (puzzle_hash, proof, proof2 tuples). The proofs are merkle set inclusion proofs. See `merkle_set.py` in chia-blockchain for more info on how to verify these proofs. `proof` refers to a proof of the puzzle hash in the merkle set, and `proof2` is the merkle proof of `sha256(concatenation of coin ids)` for each puzzle hash, in the merkle set. Both are included as elements in the merkle set for each block.

```python
class RespondAdditions(Streamable):
    height: uint32
    header_hash: bytes32
    coins: List[Tuple[bytes32, List[Coin]]]     # puzzle hash => List[Coin] with that puzzle hash
    proofs: Optional[List[Tuple[bytes32, bytes, Optional[bytes]]]]  # Puzzle hash. proof, proof2
```

## reject_additions_request

A rejection to a `request_additions` request

```python
class RejectAdditionsRequest(Streamable):
    height: uint32
    header_hash: bytes32
```

## request_header_blocks

DEPRECATED: this message has been deprecated and replaced with `request_block_headers` (flip block and header).  
A request from the wallet to the full node for a list of consecutive header blocks, inclusive.

```python
class RequestHeaderBlocks(Streamable):
    start_height: uint32
    end_height: uint32
```

## reject_header_blocks

DEPRECATED: this message has been deprecated and replaced with `reject_block_headers` (flip block and header).  
A rejection for a `request_header_blocks` request.

```python
class RejectHeaderBlocks(Streamable):
    start_height: uint32
    end_height: uint32
```

## respond_header_blocks

DEPRECATED: this message has been deprecated and replaced with `respond_block_headers` (flip block and header).  
A response to a `request_header_blocks` request.

```python
class RespondHeaderBlocks(Streamable):
    start_height: uint32
    end_height: uint32
    header_blocks: List[HeaderBlock]
```

## register_for_ph_updates

A request from the wallet to the full node to register for updates to a puzzle hash. This is part of the fast sync protocol. Whenever a new coin with one of these puzzle hashes (or hint) is created or spent, the full node will send a notification to the wallet (`coin_state_update`). Also, a one time notification is sent back with all the updates (`respond_to_ph_updates`).

```python
class RegisterForPhUpdates(Streamable):
    puzzle_hashes: List[bytes32]
    min_height: uint32
```

## respond_to_ph_updates

A one-time response to `register_for_ph_updates` with all the confirmation or spent heights, and all the CoinStates. CoinState is an object that shows a change in a coin. if `spent_height` is not None, that means the coin was spent. If `created_height` is not None, that means the coin was created but not spent. If both are None, it means the coin was reverted (reorged out of the chain) and no longer exists.

```python
class RespondToPhUpdates(Streamable):
    puzzle_hashes: List[bytes32]
    min_height: uint32
    coin_states: List[CoinState]

class CoinState(Streamable):
    coin: Coin
    spent_height: Optional[uint32]
    created_height: Optional[uint32]
`
```

## register_for_coin_updates

A request from the wallet to the full node to register for updates to a coin ID. This is part of the fast sync protocol. Whenever a new coin with one of these coin IDs is created or spent, the full node will send a notification to the wallet (`coin_state_update`). Also, a one time notification is sent back with all the updates (`respond_to_coin_updates`).

```python
class RegisterForCoinUpdates(Streamable):
    coin_ids: List[bytes32]
    min_height: uint32
```

## respond_to_coin_updates

A one-time response to `register_for_coin_updates` with all the confirmation or spent heights, and all the CoinStates.

```python
class RespondToCoinUpdates(Streamable):
    coin_ids: List[bytes32]
    min_height: uint32
    coin_states: List[CoinState]
```

## coin_state_update

This is an update but not in response to a request. The full node will send the update whenever a new block is confirmed which contains removals or additions that are interesting to the wallet.

```python
class CoinStateUpdate(Streamable):
    height: uint32
    fork_height: uint32
    peak_hash: bytes32
    items: List[CoinState]
```

## request_children

A request from the wallet to the node for the children of a certain (spent) coin ID.

```python
class RequestChildren(Streamable):
    coin_name: bytes32
```

## respond_children

A response to a `request_children` request.

```python
class RespondChildren(Streamable):
    coin_states: List[CoinState]
```

## request_ses_info

A request from the wallet to the full node for SubEpochSummary heights. This is used for the fast sync protocol, to know where sub epochs start and end.

```python
class RequestSESInfo(Streamable):
    start_height: uint32
    end_height: uint32
```

## respond_ses_info

A response to a `request_ses_info` request.

```python
class RespondSESInfo(Streamable):
    reward_chain_hash: List[bytes32]
    heights: List[List[uint32]]
```

:::note
The below messages have been added via [Chip 26](https://github.com/Chia-Network/chips/blob/8a597d06988eb308aa13488c5916ec041f39bc74/CHIPs/chip-0026.md). These have been added to the reference [node codebase](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/wallet_protocol.py) but have not been implemented in the reference wallet as of January 2025.
:::

## request_remove_puzzle_subscriptions

Removes puzzle hashes from the subscription list (or all of them if None).

```python
class RequestRemovePuzzleSubscriptions:
    puzzle_hashes: Optional[List[bytes32]]
```

## respond_remove_puzzle_subscriptions

Returns the hashes that were actually removed.

```python
class RespondRemovePuzzleSubscriptions:
    puzzle_hashes: List[bytes32]
```

## request_remove_coin_subscriptions

Removes coin ids from the subscription list (or all of them if None)

```python
class RequestRemoveCoinSubscriptions:
    coin_ids: Optional[List[bytes32]]
```

## respond_remove_coin_subscriptions

Returns the ids that were actually removed.

```python
class RespondRemoveCoinSubscriptions:
    coin_ids: List[bytes32]
```

## request_puzzle_state

Requests coin states that match the given puzzle hashes (or hints).  
When subscribe is set to True, it will add and return as many coin ids to the subscriptions list as possible.  
When subscribe is set to True and mempool updates are enabled (can be done during the handshake) mempool update messages will be sent (including an initial MempoolItemsAdded message when you subscribe for the first time). Filter out spent, unspent, or hinted coins, as well as coins below a minimum amount.

```python
class RequestPuzzleState:
    puzzle_hashes: List[bytes32]
    previous_height: Optional[uint32]
    header_hash: bytes32
    filters: CoinStateFilters
    subscribe_when_finished: bool

class CoinStateFilters:
    include_spent: bool
    include_unspent: bool
    include_hinted: bool
    min_amount: uint64
```

## respond_puzzle_state

Responds with coin states that match the given puzzle hashes (or hints).

```python
class RespondPuzzleState:
    puzzle_hashes: List[bytes32]
    height: uint32
    header_hash: bytes32
    is_finished: bool
    coin_states: List[CoinState]
```

## reject_puzzle_state

Reject request_puzzle_state in the event that a reorg is detected by a node, this is the only scenario it will be rejected like this.

```python
class RejectPuzzleState:
    reason: uint8  # RejectStateReason


class RejectStateReason(IntEnum):
    REORG = 0
    EXCEEDED_SUBSCRIPTION_LIMIT = 1
```

## request_coin_state

Request coin states that match the given coin ids.  
When subscribe is set to True, it will add and return as many coin ids to the subscriptions list as possible.  
When subscribe is set to True and mempool updates are enabled (can be done during the handshake) mempool update messages will be sent (including an initial MempoolItemsAdded message when you subscribe for the first time).

```python
class RequestCoinState:
    coin_ids: List[bytes32]
    previous_height: Optional[uint32]
    header_hash: bytes32
    subscribe: bool
```

## respond_coin_state

Respond with coin states that match the given coin ids.  
This does not implement batching for simplicity. The order is also not guaranteed. However, you can still specify the previous_height and header_hash to start.

```python
class RespondCoinState:
    coin_ids: List[bytes32]
    coin_states: List[CoinState]
```

## reject_coin_state

Reject request_coin_state in the event that a reorg is detected by a node, this is the only scenario it will be rejected like this.

```python
class RejectCoinState:
    reason: uint8  # RejectStateReason

class RejectStateReason(IntEnum):
    REORG = 0
    EXCEEDED_SUBSCRIPTION_LIMIT = 1
```

## mempool_items_added

The below mempool update messages (including an initial MempoolItemsAdded message when you subscribe for the first time) are received when:

- `request_coin_state` or `request_puzzle_state` messages are sent,
- AND subscribe is set to True in the request,
- AND mempool updates are enabled (can be done during the handshake).

```python
class MempoolItemsAdded:
    transaction_ids: List[bytes32]
```

## mempool_items_removed

The below mempool update messages (including an initial MempoolItemsAdded message when you subscribe for the first time) are received when:

- `request_coin_state` or `request_puzzle_state` messages are sent,
- AND subscribe is set to True in the request,
- AND mempool updates are enabled (can be done during the handshake).

```python
class MempoolItemsRemoved:
    removed_items: List[RemovedMempoolItem]

class RemovedMempoolItem:
    transaction_id: bytes32
    reason: uint8 # MempoolRemoveReason

class MempoolRemoveReason(Enum):
    CONFLICT = 1
    BLOCK_INCLUSION = 2
    POOL_FULL = 3
    EXPIRED = 4
```

## request_cost_info

Request various information about the costs of transactions, blocks, and the mempool.

```python
class RequestCostInfo:
    pass
```

## respond_cost_info

Respond with various information about the costs of transactions, blocks, and the mempool.

```python
class RespondCostInfo:
    max_transaction_cost: uint64
    max_block_cost: uint64
    max_mempool_cost: uint64
    mempool_cost: uint64
    mempool_fee: uint64
    bump_fee_per_cost: uint8
```
