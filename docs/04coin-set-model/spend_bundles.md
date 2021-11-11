---
sidebar_position: 3
---

# 4.3 Spend Bundles

A spend bundle is a set of spends of multiple coins, which is usually submitted to full nodes for inclusion into the
blockchain. In Bitcoin, the relevant data structure would be the transaction. 


```python
class CoinSpend:
    coin: Coin
    puzzle_reveal: SerializedProgram
    solution: SerializedProgram

class SpendBundle:
    coin_spends: List[CoinSpend]
    aggregated_signature: G2Element
```

As you can see in the code sample above, a spend bundle is a group of coin spends, where each coin spend includes
the coin being spent, the puzzle program, and the solution program. Each solution is passed into each puzzle and 
run through the clvm, where it outputs conditions. Two of the conditions: `AGG_SIG_ME` and `AGG_SIG_UNSAFE` require
that a signature be present for the spend to be valid.

Usually, when making a transaction, a user would combine multiple spends, to achieve the desired value of the 
transaction. Users can also combine coins that represent `CATs` (Chia Asset Tokens), and send different types
of values in the same spend bundle.

## Aggregate Signatures
In previous systems like Bitcoin, each spend would have it's own signature or signatures, one for each `(public key, message)`
combination. Then, each signature `s_i` would be passed through a signature verification algorithm: `V(s, m, pk) -> T/F`,
with the message `m` and public key `pk`, and would be valid iff `V` returns true.

However, in Chia, BLS signatures are used, and these signatures can be combined (added) together to produce an aggregate
signature of the same size as the originals. So let's say we have three spendbundles, each with it's own pair:
```
s1 m1 pk1
s2 m2 pk2
s3 m3 pk3
```

With BLS signatures, farmers can combine all three signatures `s1, s2, and s3` into one signature `s_agg`. The BLS
signature verification can take multiple public keys and messages: `V(s, [m1, m2, ... mx], [pk1, pk2, ... pkx]) -> T/F`.
This allows the farmer to combine all three spend bundles into one spend bundle, with only one signature. When creating the block,
all spend bundles that go into the block are combined into exactly 1 spend bundle with 1 signature, which means less
data is transmitted and stored on disk.

Another benefit of these aggregate signatures, is that when spending multiple coins, users will only transmit one signature, instead of
1 or more per spend. More information can be found [here](/docs/09keys/keys-and-signatures) and the code can be read [here](https://github.com/Chia-Network/bls-signatures).


## Coins vs Spend Bundles
One major difference between Chia and other UTXO based blockchain systems, is that spend bundles are not a first class
object in the block database. Each block in chia contains a list of removals and additions, where removals are the coins
spent in that block, and additions are the coins added in that block.

Let's say a farmer wants to include 1000 spend bundles into a block. First, they can combine all spend bundles into one,
and then they can make the block. Each block will have exactly one signature for all spends. Full nodes that verify and store this block, do not need to know the original
information of which spends were bundled with which other spends. 

## Additions and Removals

In the figure below, you can see a spend bundle that was created by a user. The removals in the spend bundle are 
coins A, B, and C, and the additions are coins C and D. This is very similar to how the standard transaction script
works in `chia-blockchain`.

<figure>
<img src="/img/spend_bundle.png" alt="drawing"/>
</figure>

Let's go through the different components in the image. First, let's say the user Alice wants to send 13 XCH to a 
recipient Bob. Alice looks at her coin database, and selects 3 unspent coins (A, B, and C) that add up to at least 
13 XCH. Each one of these coins has an associated clvm puzzle, which has a public key encoded inside of it. Let's 
denote these public keys as `pkA`, `pkB`, and `pkC`.  Alice needs to generate the puzzle and solution for each of the
spends, in order to create the spend bundle.

Each puzzle, when ran with the solutions, returns an `AGG_SIG` condition, which means that a
signature is required from the respective public key, in order for this spend to be valid. 
Instead of providing 3 signatures, we can use BLS signature arithmetic to combine all three into one signature.
This means that the resulting spend bundle will be smaller in bytes, and that the spend bundle can not be unbundled,
because the signature cannot be de-aggregated. That is, an attacker that obtains Alice's spend bundle, cannot choose to
spend coin B but not coin A. When Alice sends this spend bundle to the Chia network, other full nodes will run the CLVM
programs, collect all the `AGG_SIG` conditions, and then verify them using the aggregate signature provided in the spend bundle.

The first puzzle here for coin A also returns two `CREATE_COIN` conditions. This means that two coins must be added
to the coin database in order for spend A to be valid. Coin D is for Bob (puzzle hash 0x1b54f and 13 XCH). Coin E is a 
change coin for Alice. Since each coin's value must be spent entirely, Alice needs to send 1 XCH to herself since she
spent 14XCH, but only wanted to send 13 XCH. Note that the puzzle hash for coin E is the same as coin A. Puzzle hashes
can be reused. When spending coin E, Alice would sign with the same key as before, but most likely a different message
that spends to another recipient.

Note that only the first spend is creating the coins. This is the normal way to combine spends, since each coin must 
have exactly one parent. Although spend A alone would not be valid, since it creates 14 XCH out of only 5 XCH, combined
with spends B and C, it is valid.

Full nodes receieve, validate, and store the spend bundle in memory. However, when creating a new block, farming nodes
will combine many spend bundles from different users together, to create 1 very large spend bundle, with one signature.
When looking at just the block, it is not always clear which spends were bundled together initially. However, we can 
see the net additions and removals in the whole block.

## What is stored in the blockchain, by full nodes?
Full nodes store the history of the blockchain, which includes all revealed puzzles and solutions for all spent coins.
They also include a list of unspent coins in the coin store, which does **not** contain puzzles, only puzzles hashes.
User's are responsible for remembering and storing their own puzzles in order to spend their coins. Usually these are
regenerated on the fly by wallet software, based on some templates.
