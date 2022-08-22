---
sidebar_position: 4
---

# 10.4 钱包协议

该协议是奇亚系统中全节点和钱包之间通信的双向协议。 这有时也称为轻客户端协议。

The wallet protocol contains two sub protocols by which a wallet can sync transaction from a node.

## 隐私协议

第一个是隐私协议，钱包下载每个标头并检查交易过滤器。 它更私密，但速度要慢得多。

## 快速同步协议（推荐）

第二个是快速同步协议，钱包直接要求节点查找某些硬币 ID 或谜语哈希。 它的隐私性较少，但速度要快得多。 以下是任何钱包开发人员都应遵循的钱包同步流程。 连接到几个随机节点以提高安全性很重要。 对于没有很多事务的用户来说，这个同步协议应该非常快。

1. Perform a DNS lookup to obtain random node IPS: `dig dns-introducer.chia.net`.
2. 连接几个节点，确保服务器不遗漏交易。 节点将发送一条带有他们声称的峰值的 `new_peak_wallet` 消息。
3. Download a weight proof from one of the nodes (or several) with the heaviest peak
4. Verify the weight proof to make sure the claimed peak is correct
5. Subscribe to first 100 puzzle hashes for our key (both observer and non-observer)
6. 验证全节点返回的谜语哈希订阅状态。 这需要确保包含这些硬币的区块是 SubEpochSummaries 链的一部分。 这里只需要检查块哈希。 此外，应该在这个块之后验证一些块头（大约 30-50），以确保它被正确地掩埋。
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

钱包可以通过该消息将交易发送到内存池并将其广播到网络。 完整节点将尝试将其包含到内存池中。

```python
class SendTransaction(Streamable):
    transaction: SpendBundle
```

## transaction_ack

对 `send_transaction` 消息的响应。 尝试包含交易后，将返回内存池包含状态，并带有可选的英文错误字符串，以防它不成功。

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
class NewPeakWallet(Streamable)```python:
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

## reject_header_request

A rejection to a `request_block_header` request.

```python
class RejectHeaderRequest(Streamable):
    height: uint32
```

## request_removals

从钱包到完整节点的请求，要求移除某个区块（移除的硬币）。 如果 `coin_names` 为 None，我们要求删除区块中的所有内容。 否则，我们只请求这些特定的移除硬币 ID。

```python
class RequestRemovals(Streamable):
    height: uint32        # Height of the block
    header_hash: bytes32  # Header hash of the block
    coin_names: Optional[List[bytes32]]
```

## respond_removals

对 `request_removals` 请求的响应。 如果 `coin_names` 为 None，则返回所有删除，并且 `proofs` 设置为 None。 否则，只返回请求的硬币，（id 到硬币元组）并为每个硬币 id 返回一个证明（id 到证明元组）。 证明是默克尔集包含证明。 有关如何验证这些证明的更多信息，请参阅奇亚区块链中的 `merkle_set.py`。

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

从钱包到完整节点的请求，以增加某个区块的添加（添加的硬币）。 如果 `puzzle_hashes` 为 None，我们正在请求块中的所有添加。 否则，我们只重新请求具有此谜语哈希的添加。

```python
class RequestAdditions(Streamable):
    height: uint32
    header_hash: Optional[bytes32]
    puzzle_hashes: Optional[List[bytes32]]
```

## respond_additions

对 `request_additions` 请求的响应。 如果 `puzzle_hashes` 为 None，则返回所有加法，并且 `proofs` 设置为 None。 否则，只返回请求的硬币，（puzzle_hash 到硬币元组列表，因为多个硬币可以具有相同的谜语哈希）并为每个硬币返回一个证明（puzzle_hash，proof，proof2 tuples）。 证明是默克尔集包含证明。 有关如何验证这些证明的更多信息，请参阅奇亚区块链中的 `merkle_set.py`。 `proof` 是默克尔集中谜语哈希的证明，`proof2` 是默克尔集中每个谜语哈希的 `sha256(concatenation of coin ids)` 的默克尔证明。 两者都作为每个块的默克尔集中的元素。

```python
class RespondAdditions(Streamable):
    height: uint32
    header_hash: bytes32
    coins: List[Tuple[bytes32, List[Coin]]]     # puzzle hash => List[Coin] with that puzzle hash
    proofs: Optional[List[Tuple[bytes32, bytes, Optional[bytes]]]]  # Puzzle hash. proof, proof2 proof, proof2
```

## reject_additions_request

A rejection to a `request_additions` request

```python
class RejectAdditionsRequest(Streamable):
    height: uint32
    header_hash: bytes32
```

## request_header_blocks

A request from the wallet to the full node for a list of consecutive header blocks, inclusive.

```python
class RequestHeaderBlocks(Streamable):
    start_height: uint32
    end_height: uint32
```

## reject_header_blocks

A rejection for a `request_header_blocks` request.

```python
class RejectHeaderBlocks(Streamable):
    start_height: uint32
    end_height: uint32
```

## respond_header_blocks

A response to a `request_header_blocks` request.

```python
class RespondHeaderBlocks(Streamable):
    start_height: uint32
    end_height: uint32
    header_blocks: List[HeaderBlock]
```

## register_for_ph_updates

从钱包到完整节点的请求以注册对谜语哈希的更新。 这是快速同步协议的一部分。 每当创建或使用具有这些谜语哈希（或提示）之一的新硬币时，全节点将向钱包发送通知（`coin_state_update`）。 此外，一次性通知会与所有更新一起发回 (`respond_to_ph_updates`)。

```python
class RegisterForPhUpdates(Streamable):
    puzzle_hashes: List[bytes32]
    min_height: uint32
```

## respond_to_ph_updates

对 `register_for_ph_updates` 的一次性响应，包含所有确认或花费的高度，所有 CoinStates。 CoinState 是一个显示硬币变化的对象。 如果 `spent_height` 不是 None，则表示硬币已被使用。 如果 `created_height` 不是 None，则表示硬币已创建但未使用。 如果两者都为无，则意味着硬币已恢复（从链中重组）并且不再存在。

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

从钱包到完整节点的请求以注册对硬币 ID 的更新。 这是快速同步协议的一部分。 每当创建或使用具有这些代币 ID 之一的新代币时，全节点都会向钱包发送通知（`coin_state_update`）。 此外，一次性通知会与所有更新一起发回（`respond_to_coin_updates`）。

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

这是一个更新，但不是响应请求。 每当确认包含钱包感兴趣的删除或添加的新区块时，完整节点将发送更新。

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

从钱包到完整节点的 SubEpochSummary 高度请求。 这用于快速同步协议，以了解子时期的开始和结束位置。

```python
class RequestSESInfo(Streamable):
    start_height: uint32
    end_height: uint32
```

## respond_ses_info

A response to a `reques_ses_info` request.

```python
class RespondSESInfo(Streamable):
    reward_chain_hash: List[bytes32]
    heights: List[List[uint32]]
```
