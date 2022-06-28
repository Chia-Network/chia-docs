---
sidebar_position: 4
---

# 10.4 钱包协议

> Wallet Protocol

该协议是奇亚系统中全节点和钱包之间通信的双向协议。这有时也称为轻客户端协议。

钱包协议包含两个子协议，钱包可以通过它们从节点同步交易。

## 隐私协议

第一个是隐私协议，钱包下载每个标头并检查交易过滤器。它更私密，但速度要慢得多。

## 快速同步协议（推荐）

第二个是快速同步协议，钱包直接要求节点查找某些硬币 ID 或谜语哈希。它的隐私性较少，但速度要快得多。以下是任何钱包开发人员都应遵循的钱包同步流程。连接到几个随机节点以提高安全性很重要。对于没有很多事务的用户来说，这个同步协议应该非常快。

1. 执行 DNS 查找以获取随机节点 IPS：`dig dns-introducer.chia.net`。
2. 连接几个节点，确保服务器不遗漏交易。节点将发送一条带有他们声称的峰值的 `new_peak_wallet` 消息。
3. 从具有最重峰值的节点之一（或多个）下载权重证明。
4. 验证重量证明以确保声称的峰值是正确的。
5. 订阅我们的密钥（观察者和非观察者）的前 100 个谜语哈希。
6. 验证全节点返回的谜语哈希订阅状态。这需要确保包含这些硬币的区块是 SubEpochSummaries 链的一部分。这里只需要检查块哈希。此外，应该在这个块之后验证一些块头（大约 30-50），以确保它被正确地掩埋。
7. 从第 5 步开始，我们获得所有我们感兴趣的硬币 ID，并且我们恢复任何 CAT 钱包以获取在提示中包含我们的谜语哈希的硬币。
8. 订阅有趣的硬币 ID。
9. 验证从全节点返回的硬币订阅，类似于步骤 5 中的操作。

<details>
<summary>原文参考</summary>

This protocol is a bidirectional protocol for communication between full nodes and wallets in the Chia system.
This is also sometimes referred to as the light client protocol.

The wallet protocol contains two sub protocols by which a wallet can sync transaction from a node.

- ## Privacy Protocol

The first is the privacy protocol, where the wallet downloads each header and checks the filter for transactions. It is more private,
but much slower.

- ## Fast Sync Protocol (recommended)

The second is the fast sync protocol, where the wallet directly asks the node to look for certain coin ids or puzzle
hashes. It has less privacy but is much faster. The following is the flow for syncing for a wallet that any wallet
developer should follow. It is important to connect to several random nodes to increase security. This sync protocol
should be very fast for users who don't have many transactions.

1. Perform a DNS lookup to obtain random node IPS: `dig dns-introducer.chia.net`.
2. Connect to a few nodes, to ensure the server does not omit transactions. The nodes will send a `new_peak_wallet` message with their claimed peaks.
3. Download a weight proof from one of the nodes (or several) with the heaviest peak
4. Verify the weight proof to make sure the claimed peak is correct
5. Subscribe to first 100 puzzle hashes for our key (both observer and non-observer)
6. Validate the puzzle hash subscription state returned from the full node. This requires making sure the block in which these coins are included is part of the chain of SubEpochSummaries. Only the block hashes have to be checked here. Furthermore, a few block headers (around 30-50) should be validated after this block to make sure it is properly buried.
7. From step 5, we obtain all coin IDs which we are interested in, and we restore any CAT wallets for coins which have our puzzle hash in the hint.
8. Subscribe to interesting coin IDs
9. Validate the coin subscription returned from the full node, similar to how it's done in step 5

</details>

# 协议消息

> Protocol Messages

## request_puzzle_solution

钱包向全节点请求某个已用币 ID 的谜语和谜底。

```python
class RequestPuzzleSolution(Streamable):
    coin_name: bytes32  # ID of the spent coin
    height: uint32      # Spent height
```

## respond_puzzle_solution

对 `request_puzzle_solution` 请求的响应。

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

拒绝 `request_puzzle_solution` 请求。

```python
class RejectPuzzleSolution(Streamable):
    coin_name: bytes32
    height: uint32
```

<details>
<summary>原文参考</summary>

- ## request_puzzle_solution

A request from the wallet to the full node for the puzzle and solution of a certain spent coin ID.

```python
class RequestPuzzleSolution(Streamable):
    coin_name: bytes32  # ID of the spent coin
    height: uint32      # Spent height
```

- ## respond_puzzle_solution

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

- ## reject_puzzle_solution

A rejection to a `request_puzzle_solution` request.

```python
class RejectPuzzleSolution(Streamable):
    coin_name: bytes32
    height: uint32
```

</details>

## send_transaction

钱包可以通过该消息将交易发送到内存池并将其广播到网络。完整节点将尝试将其包含到内存池中。

```python
class SendTransaction(Streamable):
    transaction: SpendBundle
```

## transaction_ack

对 `send_transaction` 消息的响应。尝试包含交易后，将返回内存池包含状态，并带有可选的英文错误字符串，以防它不成功。

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

<details>
<summary>原文参考</summary>

- ## send_transaction

A message by which a wallet can send a transaction to the mempool and broadcast it to the network. The full node
will attempt to include it into the mempool.

```python
class SendTransaction(Streamable):
    transaction: SpendBundle
```

- ## transaction_ack

A response to a `send_transaction` message. After attempting to include the transaction, the mempool inclusion status
is returned, with an optional english error string in case it did not succeed.

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

</details>

## new_peak_wallet

全节点向钱包发出区块链峰值发生变化的通知。

````python
class NewPeakWallet(Streamable)```python:
    header_hash: bytes32       # New peak of the blockchain
    height: uint32             # New peak's height
    weight: uint128            # New peak's weight
    fork_point_with_previous_peak: uint32
````

<details>
<summary>原文参考</summary>

- ## new_peak_wallet

A notification from the full node to the wallet that the blockchain's peak has changed.

````python
class NewPeakWallet(Streamable)```python:
    header_hash: bytes32       # New peak of the blockchain
    height: uint32             # New peak's height
    weight: uint128            # New peak's weight
    fork_point_with_previous_peak: uint32
````

</details>

## request_block_header

从钱包到特定高度的 HeaderBlock 的完整节点的请求。

```python
class RequestBlockHeader(Streamable):
    height: uint32  # Height of the header block
```

## respond_block_header

对 `request_block_header` 请求的响应。

```python
class RespondBlockHeader(Streamable):
    header_block: HeaderBlock
```

## reject_header_request

拒绝 `request_block_header` 请求。

```python
class RejectHeaderRequest(Streamable):
    height: uint32
```

<details>
<summary>原文参考</summary>

- ## request_block_header

A request from the wallet to the full node for a HeaderBlock at a specific height.

```python
class RequestBlockHeader(Streamable):
    height: uint32  # Height of the header block
```

- ## respond_block_header

A response to a `request_block_header` request.

```python
class RespondBlockHeader(Streamable):
    header_block: HeaderBlock
```

- ## reject_header_request

A rejection to a `request_block_header` request.

```python
class RejectHeaderRequest(Streamable):
    height: uint32
```

</details>

## request_removals

从钱包到完整节点的请求，要求移除某个区块（移除的硬币）。如果 `coin_names` 为 None，我们要求删除区块中的所有内容。否则，我们只请求这些特定的移除硬币 ID。

```python
class RequestRemovals(Streamable):
    height: uint32        # Height of the block
    header_hash: bytes32  # Header hash of the block
    coin_names: Optional[List[bytes32]]
```

## respond_removals

对 `request_removals` 请求的响应。 如果 `coin_names` 为 None，则返回所有删除，并且 `proofs` 设置为 None。否则，只返回请求的硬币，（id 到硬币元组）并为每个硬币 id 返回一个证明（id 到证明元组）。证明是默克尔集包含证明。有关如何验证这些证明的更多信息，请参阅奇亚区块链中的 `merkle_set.py`。

```python
class RespondRemovals(Streamable):
    height: uint32
    header_hash: bytes32
    coins: List[Tuple[bytes32, Optional[Coin]]]
    proofs: Optional[List[Tuple[bytes32, bytes]]]
```

## reject_removals_request

拒绝 `request_removals` 请求。

```python
class RejectRemovalsRequest(Streamable):
    height: uint32
    header_hash: bytes32
```

<details>
<summary>原文参考</summary>

- ## request_removals

A request from the wallet to the full node for the removals (removed coins) of a certain block. If `coin_names` is None,
we are requesting all removals in the block. Otherwise, we are requesting only these specific removal coin IDs.

```python
class RequestRemovals(Streamable):
    height: uint32        # Height of the block
    header_hash: bytes32  # Header hash of the block
    coin_names: Optional[List[bytes32]]
```

- ## respond_removals

A response to a `request_removals` request. If `coin_names` is None, all removals are returned, and `proofs` is set
to None. Otherwise, only the requested coins are returned, (id to coin tuples) and a proof is returned for each
coin id (id to proof tuples). The proofs are merkle set inclusion proofs. See `merkle_set.py` in chia-blockchain
for more info on how to verify these proofs.

```python
class RespondRemovals(Streamable):
    height: uint32
    header_hash: bytes32
    coins: List[Tuple[bytes32, Optional[Coin]]]
    proofs: Optional[List[Tuple[bytes32, bytes]]]
```

- ## reject_removals_request

A rejection to a `request_removals` request.

```python
class RejectRemovalsRequest(Streamable):
    height: uint32
    header_hash: bytes32
```

</details>

## request_additions

从钱包到完整节点的请求，以增加某个区块的添加（添加的硬币）。如果 `puzzle_hashes` 为 None，我们正在请求块中的所有添加。否则，我们只重新请求具有此谜语哈希的添加。

```python
class RequestAdditions(Streamable):
    height: uint32
    header_hash: Optional[bytes32]
    puzzle_hashes: Optional[List[bytes32]]
```

## respond_additions

对 `request_additions` 请求的响应。如果 `puzzle_hashes` 为 None，则返回所有加法，并且 `proofs` 设置为 None。否则，只返回请求的硬币，（puzzle_hash 到硬币元组列表，因为多个硬币可以具有相同的谜语哈希）并为每个硬币返回一个证明（puzzle_hash，proof，proof2 tuples）。证明是默克尔集包含证明。有关如何验证这些证明的更多信息，请参阅奇亚区块链中的 `merkle_set.py`。`proof` 是默克尔集中谜语哈希的证明，`proof2` 是默克尔集中每个谜语哈希的 `sha256(concatenation of coin ids)` 的默克尔证明。两者都作为每个块的默克尔集中的元素。

```python
class RespondAdditions(Streamable):
    height: uint32
    header_hash: bytes32
    coins: List[Tuple[bytes32, List[Coin]]]     # puzzle hash => List[Coin] with that puzzle hash
    proofs: Optional[List[Tuple[bytes32, bytes, Optional[bytes]]]]  # Puzzle hash. proof, proof2
```

## reject_additions_request

拒绝 `request_additions` 请求。

```python
class RejectAdditionsRequest(Streamable):
    height: uint32
    header_hash: bytes32
```

<details>
<summary>原文参考</summary>

- ## request_additions

A request from the wallet to the full node for the additions (added coins) of a certain block. If `puzzle_hashes` is
None, we are requesting all additions in the block. Otherwise, we are requeting only additions which have this
puzzle hash.

```python
class RequestAdditions(Streamable):
    height: uint32
    header_hash: Optional[bytes32]
    puzzle_hashes: Optional[List[bytes32]]
```

- ## respond_additions

A response to a `request_additions` request. If `puzzle_hashes` is None, all additions are returned, and `proofs` is set
to None. Otherwise, only the requested coins are returned, (puzzle_hash to list of coin tuples, since multiple coins
can have the same puzzle hash) and a proof is returned for each
coin (puzzle_hash, proof, proof2 tuples). The proofs are merkle set inclusion proofs. See `merkle_set.py` in chia-blockchain
for more info on how to verify these proofs. `proof` refers to a proof of the puzzle hash in the merkle set, and
`proof2` is the merkle proof of `sha256(concatenation of coin ids)` for each puzzle hash, in the merkle set. Both are
included as elements in the merkle set for each block.

```python
class RespondAdditions(Streamable):
    height: uint32
    header_hash: bytes32
    coins: List[Tuple[bytes32, List[Coin]]]     # puzzle hash => List[Coin] with that puzzle hash
    proofs: Optional[List[Tuple[bytes32, bytes, Optional[bytes]]]]  # Puzzle hash. proof, proof2
```

- ## reject_additions_request

A rejection to a `request_additions` request

```python
class RejectAdditionsRequest(Streamable):
    height: uint32
    header_hash: bytes32
```

</details>

## request_header_blocks

从钱包到完整节点的请求，以获取连续头块列表（包括在内）。

```python
class RequestHeaderBlocks(Streamable):
    start_height: uint32
    end_height: uint32
```

## reject_header_blocks

拒绝 `request_header_blocks` 请求。

```python
class RejectHeaderBlocks(Streamable):
    start_height: uint32
    end_height: uint32
```

## respond_header_blocks

对 `request_header_blocks` 请求的响应。

```python
class RespondHeaderBlocks(Streamable):
    start_height: uint32
    end_height: uint32
    header_blocks: List[HeaderBlock]
```

<details>
<summary>原文参考</summary>

- ## request_header_blocks

A request from the wallet to the full node for a list of consecutive header blocks, inclusive.

```python
class RequestHeaderBlocks(Streamable):
    start_height: uint32
    end_height: uint32
```

- ## reject_header_blocks

A rejection for a `request_header_blocks` request.

```python
class RejectHeaderBlocks(Streamable):
    start_height: uint32
    end_height: uint32
```

- ## respond_header_blocks

A response to a `request_header_blocks` request.

```python
class RespondHeaderBlocks(Streamable):
    start_height: uint32
    end_height: uint32
    header_blocks: List[HeaderBlock]
```

</details>

## register_for_ph_updates

从钱包到完整节点的请求以注册对谜语哈希的更新。这是快速同步协议的一部分。每当创建或使用具有这些谜语哈希（或提示）之一的新硬币时，全节点将向钱包发送通知（`coin_state_update`）。此外，一次性通知会与所有更新一起发回 (`respond_to_ph_updates`)。

```python
class RegisterForPhUpdates(Streamable):
    puzzle_hashes: List[bytes32]
    min_height: uint32
```

## respond_to_ph_updates

对 `register_for_ph_updates` 的一次性响应，包含所有确认或花费的高度，所有 CoinStates。CoinState 是一个显示硬币变化的对象。 如果 `spent_height` 不是 None，则表示硬币已被使用。如果 `created_height` 不是 None，则表示硬币已创建但未使用。 如果两者都为无，则意味着硬币已恢复（从链中重组）并且不再存在。

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

<details>
<summary>原文参考</summary>

- ## register_for_ph_updates

A request from the wallet to the full node to register for updates to a puzzle hash. This is part of the fast sync
protocol. Whenever a new coin with one of these puzzle hashes (or hint) is created or spent, the full node will send a notification
to the wallet (`coin_state_update`). Also, a one time notification is sent back with all the updates (`respond_to_ph_updates`).

```python
class RegisterForPhUpdates(Streamable):
    puzzle_hashes: List[bytes32]
    min_height: uint32
```

- ## respond_to_ph_updates

A one-time response to `register_for_ph_updates` with all the confirmation or spent heights, and all the CoinStates.
CoinState is an object that shows a change in a coin. if `spent_height` is not None, that means the coin was spent.
If `created_height` is not None, that means the coin was created but not spent. If both are None, it means the
coin was reverted (reorged out of the chain) and no longer exists.

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

</details>

## register_for_coin_updates

从钱包到完整节点的请求以注册对硬币 ID 的更新。这是快速同步协议的一部分。每当创建或使用具有这些代币 ID 之一的新代币时，全节点都会向钱包发送通知（`coin_state_update`）。此外，一次性通知会与所有更新一起发回（`respond_to_coin_updates`）。

```python
class RegisterForCoinUpdates(Streamable):
    coin_ids: List[bytes32]
    min_height: uint32
```

## respond_to_coin_updates

对 `register_for_coin_updates` 的一次性响应，包含所有确认或花费的高度，以及所有 CoinStates。

```python
class RespondToCoinUpdates(Streamable):
    coin_ids: List[bytes32]
    min_height: uint32
    coin_states: List[CoinState]
```

<details>
<summary>原文参考</summary>

- ## register_for_coin_updates

A request from the wallet to the full node to register for updates to a coin ID. This is part of the fast sync
protocol. Whenever a new coin with one of these coin IDs is created or spent, the full node will send a notification
to the wallet (`coin_state_update`). Also, a one time notification is sent back with all the updates (`respond_to_coin_updates`).

```python
class RegisterForCoinUpdates(Streamable):
    coin_ids: List[bytes32]
    min_height: uint32
```

- ## respond_to_coin_updates

A one-time response to `register_for_coin_updates` with all the confirmation or spent heights, and all the CoinStates.

```python
class RespondToCoinUpdates(Streamable):
    coin_ids: List[bytes32]
    min_height: uint32
    coin_states: List[CoinState]
```

</details>

## coin_state_update

这是一个更新，但不是响应请求。每当确认包含钱包感兴趣的删除或添加的新区块时，完整节点将发送更新。

```python
class CoinStateUpdate(Streamable):
    height: uint32
    fork_height: uint32
    peak_hash: bytes32
    items: List[CoinState]
```

<details>
<summary>原文参考</summary>

- ## coin_state_update

This is an update but not in response to a request. The full node will send the update whenever a new block
is confirmed which contains removals or additions that are interesting to the wallet.

```python
class CoinStateUpdate(Streamable):
    height: uint32
    fork_height: uint32
    peak_hash: bytes32
    items: List[CoinState]
```

</details>

## request_children

从钱包到节点对某个（已用）硬币 ID 的子节点的请求。

```python
class RequestChildren(Streamable):
    coin_name: bytes32
```

## respond_children

对 `request_children` 请求的响应。

```python
class RespondChildren(Streamable):
    coin_states: List[CoinState]
```

<details>
<summary>原文参考</summary>

- ## request_children

A request from the wallet to the node for the children of a certain (spent) coin ID.

```python
class RequestChildren(Streamable):
    coin_name: bytes32
```

- ## respond_children

A response to a `request_children` request.

```python
class RespondChildren(Streamable):
    coin_states: List[CoinState]
```

</details>

## request_ses_info

从钱包到完整节点的 SubEpochSummary 高度请求。这用于快速同步协议，以了解子时期的开始和结束位置。

```python
class RequestSESInfo(Streamable):
    start_height: uint32
    end_height: uint32
```

## respond_ses_info

对 `reques_ses_info` 请求的响应。

```python
class RespondSESInfo(Streamable):
    reward_chain_hash: List[bytes32]
    heights: List[List[uint32]]
```

<details>
<summary>原文参考</summary>

- ## request_ses_info

A request from the wallet to the full node for SubEpochSummary heights. This is used for the fast sync protocol,
to know where sub epochs start and end.

```python
class RequestSESInfo(Streamable):
    start_height: uint32
    end_height: uint32
```

- ## respond_ses_info

A response to a `reques_ses_info` request.

```python
class RespondSESInfo(Streamable):
    reward_chain_hash: List[bytes32]
    heights: List[List[uint32]]
```

</details>
