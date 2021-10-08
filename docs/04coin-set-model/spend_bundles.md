---
sidebar_position: 3
---

# 4.3 Spend Bundles

A spend bundle is a set of spends of multiple coins, which is usually submitted to full nodes for inclusion into the
blockchain. In Bitcoin, the relevant data structure would be the transaction. 


```python
class Coin:
    parent_coin_info: bytes32
    puzzle_hash: bytes32
    amount: uint64

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