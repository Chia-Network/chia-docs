---
title: Identical Spend Deduplication
slug: /chia-blockchain/architecture/mempool/isd
---

Only valid transactions are allowed to enter the mempool. The process of validating transactions is similar to the process of validating blocks. This includes running CLVM, checking conditions, validating signatures, and checking that the coins to be spent are currently unspent and valid.

The transaction is also checked against other transactions in the mempool, to ensure there are no conflicts.

### Transaction Deduplication

Starting in Chia 2.5.5, the mempool automatically detects and deduplicates identical spend transactions. When multiple transactions attempt to spend the same coin with identical parameters, only one will be kept in the mempool, reducing memory usage and improving overall performance.

**Behavior**:

- Identical spend transactions are automatically deduplicated
- The transaction with the highest fee is prioritized
- Duplicate transactions are rejected with appropriate error messages

### Use cases

If you have a singleton that represents an oracle, you would need to be able to rely on an announcement created by spending it. You could in theory use replace by fee to do so, but this doesn't scale well when many people spend the oracle simultaneously. Fast forward is an approach that could work as well, although this creates many spends and takes up space in blocks unnecessarily. With spend deduplication, you can provide the same exact coin spend and they will all be deduplicated when creating the block, while still fulfilling the announcements the other transactions relied upon.

### Constraints

#### Identical solution

Spends are only deduplicated if they have identical puzzles and identical solutions. Technically, it would be possible to deduplicate a puzzle with `any` solution that produces the same conditions as another one. However, running the puzzle and comparing conditions with a different spend is not cheap. It’s much simpler to just compare the bytes of the serialized solution. If they match, it’s safe to dedup, otherwise, we don’t assume it’s possible.

#### Transferring amount

One way to trick a farmer into including lower fee spends could be to include a spend, that’s eligible for deduplication, that pays a large fee. Any spend bundle including that spend would have a higher fee-per-cost and get preferential treatment. However, once the block is created, the dedup coin is only spent `once`. The effective fee paid by these transactions could be materially lower than the mempool expected.

Similarly, if a coin eligible for deduplication has a net out-flow of coin amount, it could be transferred to a new coin. But once collapsed into a single spend, the block would be invalid, failing with `MINTING_COIN`.

To mitigate this risk, a CoinSpend whose output coins have a lower total amount than the coin it’s spending, is not eligible for deduplication.

A spend that creates more coin amount than its input coin is fine, this has to be made up for by other coins in the spend bundle, and once collapsed, the farmer will take the left-over amounts as fees.

This is implemented in the `MempoolVisitor::post_spend()` function, in [chia-consensus/src/conditions.rs](https://github.com/Chia-Network/chia_rs/blob/main/crates/chia-consensus/src/conditions.rs)

#### RESERVE_FEE

Even though the dedup coin is not allowed to pay any fee (or pay for anything really), it `is` allowed to issue RESERVE_FEE conditions. Each spend bundle including the dedup coin will have to pay such a fee, and once the block is created, the farmer will take the fee, even though it’s not all reserved with the condition.

#### Fee-per-cost

For purposes of computing the fee-per-cost of a spend bundle, we don’t take into account whether a spend may be deduplicated. The transaction is still treated as if it would incur the full cost on the final block, if included. This is a conservative assumption that benefits the farmer, but maintains the simple rule of ordering transactions by fee-per-cost, and no other consideration.
It would be possible to let the dedup coin also pay the fee, but it would be more complicated for the mempool to keep track of it. Since the dedup coin will only be included once per block, the actual fee received by the farmer would vary depending on the number of times the spend is deduplicated (and you don't know in which order transactions will be included in a block beforehand). Every time, the effective fee-per-cost decreases. This would make it more complicated than to just order mempool items along a single dimension.

### Conditions

Coin spends issuing the following conditions are not eligible for deduplication. The constraints on conditions are implemented in `MempoolVisitor::condition()` in [chia-consensus/src/conditions.rs](https://github.com/Chia-Network/chia_rs/blob/main/crates/chia-consensus/src/conditions.rs)

#### AggSigs

All agg sig conditions require the appropriate signature to be aggregated into the block signature, the correct number of times. Deduplicating a spend that includes a signature would likely be impossible to deduplicate from the aggregate signature (only if the spend bundle did not have any other `AGG_SIG_*` conditions). Since the signature can’t be deduplicated, neither can the spend issuing them.

Conditions: `AGG_SIG_ME`, `AGG_SIG_PARENT`, `AGG_SIG_PARENT_AMOUNT`, `AGG_SIG_PARENT_PUZZLE`, `AGG_SIG_PUZZLE`, `AGG_SIG_AMOUNT`, `AGG_SIG_PUZZLE_AMOUNT`, `AGG_SIG_UNSAFE`

#### Messages

All sent messages must be received exactly once, and every received message must be sent exactly once. Because of this, sending or receiving a message cannot be deduplicated. We would end up missing a sent or received message. In theory, it would be possible for two spends that both are eligible for deduplication to send messages between each other, but this check would be more complex and expensive to perform. For now we just disallow any message sent or received from deduplication.

Conditions: `SEND_MESSAGE`, `RECEIVE_MESSAGE`

### Replacement

A spend that supports Dedup is not considered in conflict with an existing spend of the same coin that also supports Dedup. The new spend must also use the exact same solution as the existing spend. The mempool implementation checks that the solution `bytes` are identical.

### Security considerations

Since the mempool “locks in” the solution for a dedup-spend based on whichever is submitted first, authors of oracles (or other puzzles that intend to make use of dedup) should ensure that only a single solution is valid at a time.

#### Canonical serialization

Solutions are compared byte-for-byte in serialized form, so the serialized form must be canonical. CLVM serialization, much like UTF-8, uses a variable-length length-prefix when encoding atoms. This lets you encode small values very space-efficiently. However, it also means you can choose to encode a small atom with a length-prefix that’s longer than necessary. This could be way for an attacker to encode the exact same CLVM tree solution in a slightly different byte form, thus subverting the identical-solution check in the mempool.

Canonical form means that all atoms use the shortest possible length-prefix encoding.

If a spend supports dedup, its solution must be encoded in canonical form, and may not include back-references (which would be another way to encode identical CLVM trees with different bytes).
