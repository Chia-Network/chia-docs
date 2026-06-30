---
title: Block Creation
slug: /chia-blockchain/architecture/mempool/block-creation
---

When the farmer makes a block, they will select the highest fee-per-cost transactions from the mempool until they reach the maximum block size. These spend bundles are combined into one large spend bundle, which is guaranteed to be valid, since all spend bundles in the mempool must spend disjointed coins.

Coin spends cannot impact other coin spends, which is a very nice property of UTXO systems, and allows parallelization of validation and block creation. The aggregate spend bundle also has one aggregate signature, which is a combination of every signature from every transaction in that block.

For performance reasons, the chia-blockchain codebase currently creates only smaller blocks (less than 50% of the maximum size) in order to keep the blockchain smaller and easier to run. This "throttle" is likely to be removed in future versions, after additional optimizations have been performed.

### Implementation

This logic is implemented in [chia/full_node/mempool.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/mempool.py) in `create_block_generator2()`

Creating a block is time sensitive. It already requires disk seeks and compute work to form the proof of space. We want to make sure creating the block generator, with appropriate transactions, takes as little time as possible.

The algorithm for picking transactions has been designed to have linear complexity (`O(n)`).

### Picking transactions

The mempool data structure maintains all mempool items ordered by fee per cost, highest fee first.

This lets the mempool pick transactions one at a time until the block is full (the cost limit is reached) and maximize the fee the farmer collects.

Until Q2 2025, we would pick transactions as a separate step from serializing the resulting block generator. This limited us to pick transactions until we estimated to have reached the block cost limit, assuming CLVM compression would not save us anything. The problem with this was that if puzzles compressed well, the size cost of the block was over estimated and the final block therefore was not as full as it could have been. This was noted on testnet11 with a full mempool, but some blocks were farmed only 11% full.

This logic is implemented in [chia/full_node/mempool.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/mempool.py) in `create_block_generator()`.

Since Q2 2025, we use a new algorithm (`create_block_generator2()`) which interleaves picking transactions and serializing them (in compressed form). This way, we have a good understanding of the exact cost of the block and can keep filling it with more transactions if the previous ones compressed well.

Additionally, we use a new algorithm for serialization and compression which has an order of magnitude speedup. Some of this is eaten up more effectively filling blocks, so there’s more to serialize.

### Fast forward spends

As we build the block generator, fast forward spends must be chained together. i.e. all but the first spend must be rebased to spend the output singleton of the previous spend. This applies to spends of a standard singleton that satisfies the conditions to be eligible for fast-forward. For more details, see the section on fast forward spends.

Implemented in [chia/full_node/eligible_coin_spends.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/eligible_coin_spends.py)

### Dedup spends

When we encounter a spend that’s eligible for deduplication, we record the exact solution it’s being spent with. Any subsequent mempool items spending the same coin must also use an identical solution. If it isn’t, the mempool item is not considered for inclusion in the block. The dedup spend that has the highest fee-per-cost decides which solution will be used in the block, as it’s deduplicated. Spends eligible for deduplication are allowed to conflict in the mempool. For details, see the section on identical spend deduplication below.

Implemented in [chia/full_node/eligible_coin_spends.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/eligible_coin_spends.py)

### Serializing

Until Q1 2025, serialization of the block generator happened as a separate step. This takes the CLVM tree structure and flattens it into a buffer. This can be expensive because we also deduplicate identical sub-trees (referred to as CLVM compression). The original algorithm could take multiple seconds to serialize a full block, even on fast computers. Since Q1 2025, serialization has been integrated with picking transactions, to make sure we keep adding more until we hit the cost limit in _serialized form_.

### Compute cost

Until Q1 2025, after creating the block generator, we would run it, just to measure its cost. We need to specify the cost in the `TransactionsInfo` field. In the new block creation function we predict the exact cost of the block by knowing the cost of the bytes, conditions and executing each puzzle.

The first hard fork, where we no longer pay for the generator ROM, greatly simplified this task.

Implemented in [chia/simulator/block_tools.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/simulator/block_tools.py) in `compute_block_cost()`

### Validation

Implemented in [chia/full_node/full_node.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/full_node.py) in `add_unfinished_block()`

### Enhanced Block Creation (Chia 2.5.5+)

Starting in Chia 2.5.5, a new, more efficient block creation algorithm is available that can be enabled via configuration. This algorithm provides improved performance and better resource utilization during block creation.

**Configuration**: Set `full_node:block_creation` to `1` in your config file to enable the new algorithm.

**Benefits**:

- Improved block creation performance
- Better memory management during block creation
- Enhanced handling of high-transaction-volume scenarios
- More efficient resource utilization

**Configurable Timeout**: Block creation now supports a configurable timeout setting via `full_node:block_creation_timeout`, allowing node operators to fine-tune the process based on their network conditions and requirements.

**Example Configuration**:

```yaml
full_node:
  block_creation: 1 # Enable new algorithm
  block_creation_timeout: 30 # 30 second timeout
```
