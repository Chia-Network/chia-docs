---
title: Block Creation
slug: /chia-blockchain/architecture/mempool/block-creation
---

:::info

Keep in mind that the logic discussed here is only guaranteed to be valid on farms that use the default mempool, as described in the [intro](/chia-blockchain/architecture/mempool/#default-mempool) section. Farmers are allowed to customize, or even remove, their own mempools, so the default logic is not universal.

:::

When the farmer makes a block, they will select the highest fee-per-cost transactions from the mempool until they reach the maximum block size. These spend bundles are combined into one large spend bundle, which is guaranteed to be valid, since all spend bundles in the mempool must spend disjointed coins.

For example, in the coin set model, Coin A can have a rule that says "I can only be spent in the same block as Coin B is spent," but Coin A is not allowed to spend Coin B directly. This property allows for the parallelization of validation and block creation -- as long as a block's input and output amounts match up, and every coin that is spent in the same block follows its own rules, the block will be valid. Because of this, the aggregate spend bundle has a single aggregate signature, which is a combination of every signature from every transaction in that block.

### Implementation

This logic is implemented in [chia/full_node/mempool.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/mempool.py) in `create_block_generator2()`

Creating a block is time sensitive. It already requires disk seeks and compute work to form the proof of space. We want to make sure creating the block generator, with appropriate transactions, takes as little time as possible.

The algorithm for picking transactions has been designed to have linear complexity (`O(n)`).

### Picking transactions

As stated above, the mempool data structure maintains all mempool items ordered by fee per cost, highest fee first.

This lets the mempool pick transactions one at a time until either the mempool is empty, or the block is full (the cost limit is reached), which therefore will maximize the fee the farmer collects.

Prior to version 2.5.4, the mempool picked transactions as a separate step from serializing the resulting block generator. This limited the mempool to picking transactions until it estimated to have reached the block cost limit, assuming CLVM compression would not save anything. The problem with this was that if puzzles compressed well, the size cost of the block was overestimated. The final block therefore was not as full as it could have been. This was noted on testnet11 with a full mempool, but some blocks were farmed only 11% full.

This logic is implemented in [chia/full_node/mempool.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/mempool.py) in `create_block_generator()`.

Beginning in version 2.5.4 (Q2 2025), the mempool uses a new algorithm (`create_block_generator2()`) which interleaves picking transactions and serializing them (in compressed form). This way, we have a good understanding of the exact cost of the bloc, and can keep filling it with more transactions if the previous ones compressed well.

Additionally, we use a new algorithm for serialization and compression which has an order of magnitude speedup. Some of this is eaten up more effectively filling blocks, so there’s more to serialize.

For more info about these changes, see [clvm_rs PR #562](https://github.com/Chia-Network/clvm_rs/pull/562) (the speedup itself) and [chia-blockchain PR #19270](https://github.com/Chia-Network/chia-blockchain/pull/19270) (the mempool block-building algorithm).

### Fast forward spends

As we build the block generator, fast forward spends must be chained together. i.e. all but the first spend must be rebased to spend the output singleton of the previous spend. This applies to spends of a standard singleton that satisfies the conditions to be eligible for fast-forward. For more details, see the section on fast forward spends.

Fast forward was implemented in [chia/full_node/eligible_coin_spends.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/eligible_coin_spends.py) as part of [PR #16919](https://github.com/Chia-Network/chia-blockchain/pull/16919). It was first added to version 2.2.0 in February 2024.

For more information, see the [fast forward](/chia-blockchain/architecture/mempool/fast-forward) page.

### Dedup spends

When we encounter a spend that’s eligible for deduplication, we record the exact solution it’s being spent with. Any subsequent mempool items spending the same coin must also use an identical solution. Otherwise, the mempool item is not considered for inclusion in the block. The dedup spend that has the highest fee-per-cost decides which solution will be used in the block, as it’s deduplicated. Spends eligible for deduplication are allowed to conflict in the mempool. For details, see the section on identical spend deduplication below.

Implemented in [chia/full_node/eligible_coin_spends.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/eligible_coin_spends.py)

:::info

Identical [Spend Deduplication](/chia-blockchain/architecture/mempool/identical-spend-deduplication/) (ISD) is separate from [Replace by Fee](/chia-blockchain/architecture/mempool/replace-by-fee/) (RBF), even though they both replace one spend with another.

In the case of RBF, a spend bundle is replaced by a different spend bundle with a higher fee. The replacement spend can include additional coin spends, as long as the rules listed in the RBF page are followed.

In the case of ISD, the spends must be identical. Because of this constraint, the RBF rules do not apply.

:::

### Serializing

Until Q1 2025, serialization of the block generator happened as a separate step. This takes the CLVM tree structure and flattens it into a buffer. This can be expensive because we also deduplicate identical sub-trees (referred to as CLVM compression). The original algorithm could take multiple seconds to serialize a full block, even on fast computers. Since Q1 2025, serialization has been integrated with picking transactions, to make sure we keep adding more until we hit the cost limit in _serialized form_.

The updated serialization was prepared in [chia-blockchain PR #29207](https://github.com/Chia-Network/chia-blockchain/pull/19207) and completed in [chia-blockchain PR #19270](https://github.com/Chia-Network/chia-blockchain/pull/19270) as part of version 2.5.5. This latter PR introduced `create_block_generator2()` in the `Mempool` class, which picks transactions and serializes/compresses them incrementally. This allows blocks to be filled up to the cost limit, even with compression applied.

### Compute cost

Until Q1 2025, after creating the block generator, we would run it, just to measure its cost. We need to specify the cost in the `TransactionsInfo` field. In the new block creation function we predict the exact cost of the block by knowing the cost of the bytes, conditions and executing each puzzle.

The first hard fork, where we no longer pay for the generator ROM, greatly simplified this task. This fork occurred in version 2.1.0. It activated at block `5'496'000`, as documented in the [forks](/chia-blockchain/consensus/forks/) page.

Implemented in [chia/simulator/block_tools.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/simulator/block_tools.py) in `compute_block_cost()`

### Validation

Implemented in [chia/full_node/full_node.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/full_node.py) in `add_unfinished_block()`

### Enhanced Block Creation (Chia 2.5.5+)

Starting in Chia 2.5.5, a new, more efficient block creation algorithm was made available. Starting in 2.6.1 ([PR #20578](https://github.com/Chia-Network/chia-blockchain/pull/20578)), this became the default. This algorithm provides improved performance and better resource utilization during block creation by picking and serializing incrementally in batches. It also handles [Identical Spend Deduplication](/chia-blockchain/architecture/mempool/identical-spend-deduplication/) and [singleton fast-forward](/chia-blockchain/architecture/mempool/fast-forward/) inline.

**Configuration** (default): Set `full_node:block_creation` to `1` in your config file to enable the new algorithm.

**Benefits**:

- Improved block creation performance
- Better memory management during block creation
- Enhanced handling of high-transaction-volume scenarios
- More efficient resource utilization

**Configurable Timeout**: Block creation now supports a configurable timeout setting (default: [two seconds](https://github.com/Chia-Network/chia-blockchain/blob/0d5a394cf996a49626e009b3f8ac10ed645b74c3/chia/util/initial-config.yaml#L330)) via `full_node:block_creation_timeout`, allowing node operators to fine-tune the process based on their network conditions and requirements.

**Example Configuration**:

```yaml
full_node:
  block_creation: 1 # Enable new algorithm
  block_creation_timeout: 2 # 2 second timeout
```

In the legacy mode (`full_node:block_creation: 0`), all transactions are first picked, and then serialized in one shot. Compression savings aren't known during selection, so blocks may be under-filled.