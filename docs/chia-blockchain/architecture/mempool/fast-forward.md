---
title: Fast Forward
slug: /chia-blockchain/architecture/mempool/fast-forward
---

Fast-forward spends is a way for a singleton transaction to be applied to future versions of the singleton. This enables offer files to refer to singletons by coin ID, even though the coin ID changes for every singleton spend.

Spending a coin whose outer puzzle is the `singleton_top_layer_v1_1`, is automatically considered eligible for fast-forward by the mempool, as long as it satisfies certain restrictions. These restrictions are outlined below, with motivation.

Singletons are documented in [chialisp.com/singletons](https://chialisp.com/singletons/)

### Overview

A spend whose outer puzzle is `singleton_top_layer_v1_1` has a known shape of its solution. With the fast forward feature, the mempool changes the solution to match another coin belonging to the same singleton.

The singleton puzzle has `SINGLETON_STRUCT` and `INNER_PUZZLE` curried into it. The `SINGLETON_STRUCT` contains `(MOD_HASH . (LAUNCHER_ID . LAUNCHER_PUZZLE_HASH))`. We can use this to uncurry this information from the puzzle reveal.

The solution passed to the puzzle contains `lineage_proof`, `my_amount` and `inner_solution`. The lineage proof consists of `(parent_parent_coin_info parent_inner_puzzle_hash parent_amount)`. We don’t support fast forward for the eve spend (wherein `parent_inner_puzzle_hash` would be missing), the lineage proof must have this form.

When changing which coin is being spent, we simply create a new lineage proof using the parent-parent ID and parent amount of the new coin to spend (the inner puzzle remains the same).

As long as the inner puzzle doesn’t make any commitments to anything related to the coin being spent or its parent, the new solution should be valid.

The function to parse the puzzle and solution and to generate a new solution can be found in `chia_rs`, in [chia-consensus/src/fast_forward.rs](https://github.com/Chia-Network/chia_rs/blob/main/crates/chia-consensus/src/fast_forward.rs).

### Use cases

With a wallet consisting of individual coins locked up with the "standard transaction", it's very straightforward to spend them separately, even as multiple transactions in the same block. However, Chia Vaults use a singleton to "authorize" the spends of coins, which means that every time you spend a coin you also need to spend the associated vault and send a message from the vault to the coin.

Because you can only spend a coin a single time, you quickly run into issues with that. For example, if you try to make multiple transactions in a block, you'll run into `MEMPOOL_CONFLICT` errors since they both spend the same vault coin. And if you have multiple offers outstanding that spend the vault coin to authorize other spends, one may effectively cancel the other since there would be a `DOUBLE_SPEND` when submitting to the mempool.

Fast forward is a solution to these issues. The mempool can effectively _rebase_ singleton spends on the fly, so if you spend the same vault multiple times it won't be rejected by the mempool (provided the spend itself is eligible for the fast forward rules).

### Immutable puzzle

The new singleton coin must have the same puzzle hash as the coin being spent. This restriction makes it (relatively) easy for a mempool to find the most recent coin for a singleton.

1. Look up all unspent coins with the puzzle hash, whose parent coin have the same puzzle hash
2. If there isn’t exactly 1 coin, the spend is invalid

This lookup is implemented in [/chia/full_node/coin_store.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/coin_store.py), in `get_unspent_lineage_info_for_puzzle_hash()`. The coin table has an index for puzzle hash which is used to make this lookup fast.

Alternative ways of finding the unspent coin for a singleton would be to record and maintain a table for all launcher IDs -> Coin. This was deemed unreasonably expensive. But it would likely have offered more flexibility.

### Immutable amount

The new singleton coin must have the same amount as the coin being spent. This restriction makes it easy to ensure that fast-forward spends can be chained together without becoming invalid.

### Conditions

Some conditions are incompatible with fast-forward. We want to eliminate the risk of fast-forwarding a spend invalidates it. Since these properties can change during fast-forward, the spend will not be considered eligible for fast forward if it emits any of the following conditions.

#### Coin ID

When fast forwarding a spend onto the latest coin of a singleton, the Coin ID will change. If an inner puzzle commits to a specific coin ID, it is not eligible for fast-forward.

Conditions: `AGG_SIG_ME`, `ASSERT_MY_COIN_ID`

#### Coin Announcements

Making a coin announcement enables other coins to commit to the coin’s ID. It’s not mandatory, so there may not be a corresponding `ASSERT_COIN_ANNOUNCEMENT`, which would definitely disqualify the spend from being eligible for fast forward. However, postponing the check to only disqualify a spend for fast forward if there is an assertion is a bit more risky, as there are more scenarios to take into account. We can’t think of a use case for this. So, coins issuing coin announcements are not eligible for Fast forward.

Conditions: `CREATE_COIN_ANNOUNCEMENT`

#### Parent Coin ID

Similar to the coin ID itself, the parent coin will change when fast-forwarding a spend onto the latest coin of a singleton.

Conditions: `AGG_SIG_PARENT`, `AGG_SIG_PARENT_PUZZLE`, `AGG_SIG_PARENT_AMOUNT`, `ASSERT_PARENT_ID`

#### Relative Timelocks

When we fast forward the coin, the creation time will also change. If the spend commits to the coin being older than a certain age, it won’t necessarily be valid to move it onto a different coin, which may be younger. We don’t allow relative time locks for this reason.

Timelocks asserting that the coin is young enough wouldn’t make the spend invalid by moving it up to a newer coin, however, it might be unexpected that it effectively disables the functionality. There’s also an implementation reason to avoid this. We don’t re-compute relative time locks, we assume the coin to spend stays unchanged and resolve the relative time into an absolute one for purposes of knowing when to expire a spend. This feature doesn’t combine well with fast forward. See function `compute_assert_height()` in [/chia/full_node/mempool_manager.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/mempool_manager.py)

Conditions: `ASSERT_HEIGHT_RELATIVE`, `ASSERT_SECONDS_RELATIVE`,`ASSERT_BEFORE_HEIGHT_RELATIVE`, `ASSERT_BEFORE_SECONDS_RELATIVE`

#### Created Height and Timestamp

When we fast forward the coin, it necessarily changes the birth time for the coin, invalidating any commitment to the coin creation/birth time.

Conditions: `ASSERT_BIRTH_HEIGHT`, `ASSERT_BIRTH_SECONDS`

#### Concurrent spends

If a spend in a SpendBundle asserts that another coin is also being spent in the same block, that’s a commitment to that coin ID. The spend of that coin ID cannot be eligible for fast forward, as it would invalidate the concurrent spend assertion.

Conditions: `ASSERT_CONCURRENT_SPEND`

#### Messages

`SEND_MESSAGE` and `RECEIVE_MESSAGE` committing to one’s own coin ID or parent are also restricted for being considered eligible for fast forward. Both coin ID and parent coin must be allowed to change in a fast-forward spend.

This is implemented in `MempoolVisitor::condition()`, in [chia-consensus/src/conditions.rs](https://github.com/Chia-Network/chia_rs/blob/main/crates/chia-consensus/src/conditions.rs)

#### Ephemeral Spends

Any spend asserting its coin to be ephemeral cannot be eligible for fast forward because FF spends don’t have an order. We order them, arbitrarily, in block generation. This is implemented in the `parse_conditions()` function found in [chia-consensus/src/conditions.rs](https://github.com/Chia-Network/chia_rs/blob/main/crates/chia-consensus/src/conditions.rs)

Additionally, any spend whose output coin is also spent by the same spend bundle should also not be eligible for fast-forward, as it would invalidate the spend bundle.

Technically, two FF spends could be chained and bundled together. Since both can change the coin they spend, they could still be considered eligible for fast-forward. However, checking this is not trivial, and greater than `O(n)` complexity. To keep the rules simple and efficient, any coin whose output is ephemeral (spent in the same bundle) is not considered eligible for FF.

This is implemented in `MempoolVisitor::post_process()`, in [chia-consensus/src/conditions.rs](https://github.com/Chia-Network/chia_rs/blob/main/crates/chia-consensus/src/conditions.rs)

Conditions: `ASSERT_EPHEMERAL`

### Singleton layer is exempt

The singleton layer itself will commit to both the coin amount and parent ID. The conditions are controlled by the solution. When we fast-forward a spend, we update the solution to reflect the new coin being spent. Therefore, the singleton layer’s own commitments to the parent ID and Amount are valid.

We know that the singleton top layer puzzle will emit its conditions first in the conditions list, so we simply allow the first condition to be `ASSERT_MY_AMOUNT` and the second condition to be `ASSERT_MY_PARENT_ID`.

This logic is implemented in [chia-consensus/src/conditions.rs](https://github.com/Chia-Network/chia_rs/blob/main/crates/chia-consensus/src/conditions.rs), in `MempoolVisitor`.

### Mempool validation

Supporting fast forward is a mempool feature.

When you submit a transaction into the mempool, eligibility for fast forward is checked according to the above rules. However, there are additional validations the mempool needs to have:

1. We check that there is an unspent coin with the same puzzle hash, which would represent the latest singleton coin to rebase on top of. If it's missing, the singleton may have been spent in a non-fast forward fashion, or never existed in the first place.
2. We ensure that the parent of the latest unspent coin also has the same puzzle hash and amount, because anyone can create a coin with the singleton's puzzle even if it doesn't have the correct lineage. The parent being spent implies that the lineage has already been validated.
3. A spend bundle submitted to the mempool is not allowed to entirely consist of spends that are eligible for fast forward. The other coin is the primary way to evict the fast forward spend bundle from the mempool. A spend bundle with only fast-forward spends might never become invalid, and be spent in every block. In fact, nothing would prevent it from being spent multiple times per block.

(1) and (2) are implemented in [chia/full_node/coin_store.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/coin_store.py), `get_unspent_lineage_info_for_puzzle_hash()`.

(3) is implemented in [chia/full_node/mempool_manager.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/mempool_manager.py), `validate_spend_bundle()`.

Since a spend’s eligibility for fast forward can be affected by another spend committing to its coin ID (e.g. via `ASSERT_CONCURRENT_SPEND`) an attacker may attempt to replace a Vault spend (or some other spend relying on supporting fast forward) with a super set that also includes a commitment to its coins ID, effectively disabling its fast forward support.

To prevent this attack, the mempool’s super set rule must also reject replacements that alter the `ELIGIBLE_FOR_FF` flag of a spend.

This is implemented in [chia/full_node/mempool_manager.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/mempool_manager.py), `can_replace()`.

### Replays

Transactions that support fast-forward can’t use `AGG_SIG_ME`, so we need some other mechanism to prevent the spend to be replayed in the future.

For example, when you spend a vault singleton that is eligible for fast forward, you send messages from the vault and receive it from the coins you are spending. This 1:1 relationship between sent and received messages prevents the spend from being replayed, since the other asset coins can only be spent a single time. Using regular announcements wouldn't protect against replays in the same way.

### Replacement

A coin spend that supports fast forward is not considered in conflict with an existing spend of the same coin that also supports fast forward. If the existing spend and the new spend differ in support for fast-forward, replacement will not be allowed according to the fast-forward rule. See the section on replacement rules.
