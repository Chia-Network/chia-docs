---
sidebar_position: 3
---

# 4.3 Spend Bundles

A spend bundle is a set of spends of multiple coins, which is usually submitted to full nodes for inclusion into the blockchain. In Bitcoin, the equivalent data structure would be the transaction.

Here is the spend bundle's basic construction:

```python
class CoinSpend:
    coin: Coin
    puzzle_reveal: SerializedProgram
    solution: SerializedProgram

class SpendBundle:
    coin_spends: List[CoinSpend]
    aggregated_signature: G2Element
```

As you can see in the code sample above, a spend bundle is a group of coin spends, where each coin spend includes the coin being spent, the puzzle program, and the solution program. Each solution is passed into each puzzle and run through the CLVM, where it outputs conditions. Two of the conditions -- `AGG_SIG_ME` and `AGG_SIG_UNSAFE` -- require that a signature be present in order for the spend to be valid.

Usually when making a transaction, a user would combine multiple spends, to achieve the desired value of the transaction. Users can also combine coins that represent [CATs](https://chialisp.com/docs/puzzles/cats) (Chia Asset Tokens), and send different types of values in the same spend bundle.

## Aggregate Signatures
In Bitcoin, each spend has its own signature or signatures, one for each `(public key, message)` combination. Then, each signature `s_i` is passed through a signature verification algorithm: `V(s, m, pk) -> T/F`, with the message `m` and public key `pk`, and would be valid if and only if `V` returns true.

In Chia, BLS signatures are used. These signatures can be combined (added) together to produce an aggregate signature of the same size as the originals. Let's say we have three spend bundles, each with its own pair:
```
s1 m1 pk1
s2 m2 pk2
s3 m3 pk3
```

With BLS signatures, farmers combine all three signatures `s1, s2, and s3` into one signature `s_agg`. The BLS signature verification can take multiple public keys and messages: `V(s, [m1, m2, ... mx], [pk1, pk2, ... pkx]) -> T/F`.

This allows the farmer to combine all three spend bundles into one spend bundle, with only one signature, which means less data is transmitted and stored on chain and disk.

Another benefit of these aggregate signatures is that when spending multiple coins, users will only transmit one signature, instead of one or more per spend. More information can be found in [Section 9.1](/docs/09keys/keys-and-signatures "Section 9.1: Keys and Signatures"). You can also read the [code for BLS signatures](https://github.com/Chia-Network/bls-signatures).


## Coins vs Spend Bundles
One major difference between Chia and other UTXO-based blockchain systems is that spend bundles are not a first-class object in the block database. Each block in chia contains a list of removals and additions, where removals are the coins spent in that block, and additions are the coins added in that block.

Let's say a farmer wants to include 1000 spend bundles into a block. First, they can combine all spend bundles into one, and then they can make the block. Each block will have exactly one signature for all spends. Full nodes that verify and store this block do not need to know the original information of which spends were bundled with which other spends.

## Additions and Removals

In the figure below, you can see a spend bundle that was created by a user. The removals in the spend bundle are coins A, B, and C, and the additions are coins C and D. This is very similar to how the standard transaction script works in `chia-blockchain`.

<figure>
<img src="/img/spend_bundle.png" alt="drawing"/>
</figure>

Let's go through the different components in the image. First, let's say Alice wants to send 13 XCH to Bob. Alice looks at her coin database, and selects 3 unspent coins (A, B, and C) that add up to at least 13 XCH. Each one of these coins has an associated CLVM puzzle, which has a public key encoded inside of it. Let's denote these public keys as `pkA`, `pkB`, and `pkC`.  Alice needs to generate the puzzle and solution for each of the spends, in order to create the spend bundle.

Each puzzle, when run with the solutions, returns an `AGG_SIG` condition (either AGG_SIG_ME or AGG_SIG_UNSAFE). This means that a signature is required from the respective public key, in order for this spend to be valid.

Instead of providing 3 signatures, we can use BLS signature arithmetic to combine all three into one signature. There are two benefits to doing this:

1. The resulting spend bundle will be smaller in bytes.
2. The spend bundle can not be unbundled (the signature cannot be de-aggregated).

That is, an attacker who obtains Alice's spend bundle is not able to pull apart the spend bundle in order to spend just one of the coins. When Alice sends this spend bundle to the Chia network, other full nodes will run the CLVM programs, collect all the `AGG_SIG` conditions, and then verify them using the aggregate signature provided in the spend bundle.

The first puzzle here for coin A also returns two `CREATE_COIN` conditions. This means that two coins must be added to the coin database in order for spend A to be valid:
1. Coin D is for Bob (puzzle hash 0x1b54f and 13 XCH).
2. Coin E is Alice's change. She spent 14 XCH, but only wanted to send 13 XCH to Bob. Each coin's value must be spent entirely, so Alice needs to send 1 XCH to herself as change.

Note that the puzzle hash of coin E is the same as that of coin A. Puzzle hashes can be reused. When spending coin E, Alice would sign with the same key as before, but would most likely use a different message that spends to another recipient.

Also note that only the first spend is creating the coins. This is the normal way to combine spends, since each coin must have exactly one parent. Spend A, by itself, would not be valid, since it creates more value (14 XCH) than it spends (5 XCH). However, the spend becomes valid when combined with spends B and C.

Full nodes receive, validate, and store the spend bundle in memory. However, when creating a new block, farming nodes will combine many spend bundles from different users. This creates one large spend bundle with one signature. When looking at just the block, it is not always clear which spends were bundled together initially. However, we can see the net additions and removals in the whole block.

## What do full nodes store on-chain?
Puzzles are only revealed when coins are spent; the puzzles are saved on-chain afterward for record-keeping purposes.

Full nodes, therefore, store the history of the blockchain, which includes all revealed puzzles and solutions, for all spent coins. Full nodes also store a list of unspent coins, which only contains puzzle hashes, and not puzzles.

Users are responsible for remembering and storing their own puzzles in order to spend their coins. Usually these are regenerated on the fly by wallet software, based on templates.
