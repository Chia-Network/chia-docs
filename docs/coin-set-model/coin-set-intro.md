---
title: Coin Set Intro
slug: /coin-set-intro
---

The Chia blockchain, as explained in the consensus section, is a linked list of blocks, agreed upon by nodes. Nodes also maintain a table of **coins**. A coin in chia is a record of ownership of a certain amount of XCH, which can be unlocked by providing a puzzle and solution.

The 3 properties that make up a coin are:

```python
class Coin:
    parent_coin_info: bytes32  # The coinID of the parent coin.
    puzzle_hash: bytes32  # The hash of the puzzle that locks this coin.
    amount: uint64  # The amount of XCH in this coin, in the mojos unit: 1 XCH = 1 trillion mojos.
```

The coinID of each coin is computed by hashing together the concatenation of the three fields, where amount is encoded in CLVM format.

`coinID == sha256(parent_ID + puzzlehash + amount)`

Because the coinID is a sha256 hash, coins can never be changed. They can only be created and then spent once.

## What is a Puzzle?

A puzzle is a program.

Each coin has a CLVM program associated with it, which determines how, when, and by whom this coin can be spent. This program is called the puzzle, and it must be chosen at the time of the coin's creation.

For example, if Bob wanted to pay Alice, Bob would create a coin with a puzzle (and thus a puzzle hash) which Alice knows how to unlock. Bob can create a coin worth 5 XCH using Alice's puzzle hash, so that only Alice can unlock it.

Puzzle hashes are addresses. When you send XCH to someone's address, you're doing this exact thing.

## Spends

When Alice wants to spend her coin, she creates a spend bundle that reveals the coin she will spend, the original puzzle, and the solution to that puzzle. The solution usually involves things such as conditions (which can include recipients of the coin). In a standard transaction, Alice is the only one that knows the private key used to sign the transaction, and thus controls that coin.

The network has no concept of accounts, or of coin ownership. Anybody can attempt to spend any coin on the network. It's up to the puzzles to prevent coins from being stolen or spent in unintended ways.

The data required to spend a coin is:

- The coin ID
- The puzzle (full CLVM source code)
- The solution to the puzzle

A coin also has the option of requiring an aggregate signature in order to spend it.

## Account Model vs Coin Set Model

In the account model, which is used by Ethereum and many other systems, balances are kept in accounts. These are permanent data structures which do not get destroyed when they send funds. There are some tradeoffs between the account model and the coin set model (similar to Bitcoin's UTXO model).

### Benefits of the Account Model

- All logic and state can be stored in one program and one account, simplifying development.
- It is simple to combine multiple transactions that affect the same dapp in one block.
- Users and wallets only have to keep track of one account for all of their balances (although the UTXO model can support this).

### Benefits of the coin Set Model

- Very parallelizable since each coin spend is independent.
- Coin value is split between many coins, increasing sandboxing and security. One program cannot call or affect another.
- Deterministic operation of every spend.
- More efficient storage of state (although this depends on implementation).
- Increased privacy, since one user usually has many coins.
- Re-applying mempool transactions after a new block is not necessary due to deterministic results.
