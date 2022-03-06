---
sidebar_position: 2
---

# 4.2 Coins, Puzzles and Solutions

The Chia blockchain, as explained in the consensus section, is a linked list of blocks, agreed upon by nodes. Nodes also maintain a table of **coins**. A coin in chia is a record of ownership of a certain amount of XCH, which can be unlocked by providing a puzzle and solution. 

The 3 properties in a coin are:

```python
class Coin:
    parent_coin_info: bytes32  # The coinID of the parent coin.
    puzzle_hash: bytes32  # The hash of the puzzle that locks this coin.
    amount: uint64  # The amount of XCH in this coin, in the mojos unit: 1 XCH = 1 trillion mojos.
```

The coinID of each coin is computed by hashing together the concatenation of the three fields, where amount is encoded in CLVM format. 

`coinID == sha256(parent_ID + puzzlehash + amount)`

Because the coinID is a sha256 hash, coins can never be changed. They can only be created and then spent once.

So what is a **puzzle**? Each coin has a CLVM (ChiaLisp Virtual Machine) program associated with it, which determines how, when, and by whom this coin can be spent. This program is called the puzzle, and it must be chosen at the time of the coin's creation.

For example, if Bob wanted to pay Alice, Bob would create a coin with a puzzle (and thus a puzzle hash) which Alice knows how to unlock. Bob can create a coin worth 5 XCH using Alice's puzzle hash, so that only Alice can unlock it.

## Spends

When Alice wants to spend her coin, she creates a spend bundle (transaction), which reveals the coin she will spend, the original puzzle, and the solution to that puzzle. The solution usually involves things like signatures, conditions, and recipients of the coin. Alice is the only one that knows the solution to her puzzles, and thus she controls that coin. A basic example is that the puzzle requires a digital signature from Alice's public key. 

The network has no concept of accounts, or of coin ownership. Anybody can attempt to spend any coin on the network. It's up to the puzzles to prevent coins from being stolen or spent in unintended ways.

The data required to spend a coin is:
* The coin ID
* The puzzle (full CLVM source code)
* The solution to the puzzle

A coin also has the option of requiring an aggregate signature in order to spend it.