---
sidebar_label: Introduction
title: Coin Set Intro
slug: /coin-set-intro
---

In any given blockchain, one of the most fundamental questions is, "How do we keep track of the state of the whole system?" Bitcoin uses the Unspent Transaction Output (UTXO) model. Ethereum, along with many other blockchains, use the account model. Chia uses the _coin set_ model, which is similar to UTXO.

The differences between the above models will be covered in the [Coin Set vs UTXO page](/coin-set-vs-utxo) and the [Coin Set vs Account page](/coin-set-vs-account). For now, we'll start with a brief explanation of the coin set model.

The mantra _everything is a coin_ will go a long way in helping you to understand the coin set model. There are no accounts. There are only coins.

Coins may only be spent once and anyone can attempt to spend them. However coins are locked with specific rules. They are written in Chialisp, a Turing-complete language with no side effects, allowing for complex functionality, including composability and interoperability between coins.

The [majority of Chia's coins](https://chialisp.com/standard-transactions/) have one simple rule – "Anyone with the right private key can spend me."

## Key Features

- As stated above, Chia's blockchain only understands coins. There are no accounts at the blockchain level.
- Technically the coins do not have owners. Anyone can attempt to spend any coin. Most coins are secured such that only someone who possesses a certain public/private key pair may spend them. This person is the coin's de facto "owner."
- The _coin set_ is the total set of all coins on Chia's blockchain.
- The minimum value of a coin is 0 mojos. The theoretical maximum value of a coin is around 18 million XCH (2^64-1 mojos). Each coin can be of any value within this range.
  - Note 1: One use case for a zero-mojo coin is to convey information. For example, upon being spent, a zero-mojo coin could make an announcement for a singleton to recreate itself
  - Note 2: [Singletons](https://chialisp.com/singletons) must have an odd-numbered value, so their minimum value is 1 mojo (1 trillionth of an XCH)
- The first block of Chia's blockchain introduced four coins to the coin set, with a total value of 21 million XCH. This is the pre-farm, controlled by Chia Network Inc.
- Each additional block introduces a reward of two coins to the coin set (see the [Block Rewards page](/block-rewards#farmer-vs-pool-reward) for more info). For the first three years of Chia's blockchain, the targeted daily average to be introduced is 9216 XCH. This amount will be cut in half in 2024, 2027, 2030, and 2033, after which the targeted daily average will always be 576 XCH. While the exact amount introduced on any given day will vary slightly, one can predict the total amount of XCH in the coin set at any given time, with a high degree of accuracy.
- Each coin can only be spent once. Thus, a coin has only two states: unspent and spent. (Technically, there is a third state: not created. This happens when there is a re-org and the creation transaction gets reverted. Re-orgs in Chia are rare, though possible.)
- A coin's value cannot be destroyed. Instead, when a coin is spent, its value is released. One or more new coins will be created in the same block, the total value of which will equal the value of the spent coin.
- The coins themselves are highly programmable, so a wide variety of behavior is possible when a coin is spent.

## Blockchain

The Chia blockchain, as explained in the consensus section, is a linked list of blocks, agreed upon by nodes. Nodes also maintain a table of coins. At a low level, a coin in Chia is a record of ownership of a certain amount of XCH, which can be unlocked by providing the correct puzzle and a valid solution.

These 3 properties make up each coin, and when hashed together form its id:

- Parent Coin Id
- Puzzle Hash (hash of the program)
- Amount (in mojos)

The ID of a coin is computed by hashing together its three fields, where amount is encoded in CLVM format:

```chialisp
(sha256 parent_coin_id puzzle_hash amount)
```

Because the id is a sha256 hash, coins can never be changed. They can only be created and then spent once.

## Puzzles

A puzzle is a type of CLVM program that outputs [conditions](/conditions) that determine the result of the spend.

Each coin has a puzzle associated with it that determines how, when, and by whom this coin can be spent. It must be chosen at the time of the coin's creation.

For example, if Bob wanted to pay Alice, Bob would create a coin with a puzzle (and thus a puzzle hash) which Alice knows how to unlock. Bob can create a coin worth 5 XCH using Alice's puzzle hash, so that only Alice can unlock it.

Puzzle hashes are addresses. When you send XCH to someone's address, you're doing this exact thing.

## Spends

When Alice wants to spend her coin, she creates a spend bundle that reveals the coin she will spend, the original puzzle, and the solution to that puzzle. The solution usually involves things such as conditions (which can include recipients of the coin). In a standard transaction, Alice is the only one that knows the private key used to sign the transaction, and thus controls that coin.

The network has no concept of accounts, or of coin ownership. Anybody can attempt to spend any coin on the network. It's up to the puzzles to prevent coins from being stolen or spent in unintended ways.

The data required to spend a coin is:

- Coin Id
- Puzzle (serialized CLVM program)
- Solution (serialized CLVM value)

A coin also has the option of requiring an aggregate signature in order to spend it.

You can read more on the [Spend Bundle page](/spend-bundles).

## Value Added and Spent

Value may only be added to the coin set via the pre-farm (a one-time occurrence) and block rewards (which occur with each transaction block). Value can never be destroyed, though it can be "bricked," for example by sending it to an address for which nobody possesses the private keys.

Typically, in a block's combined spend bundle, value added will be equal to value spent, other than the block rewards. By definition, there are two possible exceptions:

- Value added > value spent -- This is not allowed, so the transaction will be rejected. The rejection will usually happen at the mempool level, though a malicious actor could write their own mempool to accept the transaction, in which case the blockchain will reject it.
- Value added < value spent -- This is allowed, so the transaction will succeed. If the value added is less than the value spent the remaining value will be rewarded to the farmer of the block containing the transaction awarded as a tip (you probably don't want to do that!).

## Account Model vs Coin Set Model

In the account model, which is used by Ethereum and many other systems, balances are kept in accounts. These are permanent data structures which do not get destroyed when they send funds. There are some tradeoffs between the account model and the coin set model (similar to Bitcoin's UTXO model).

### Benefits of the Account Model

- All logic and state can be stored in one program and one account, simplifying development.
- It is simple to combine multiple transactions that affect the same dapp in one block.
- Users and wallets only have to keep track of one account for all of their balances (although the UTXO model can support this).

### Benefits of the Coin Set Model

- Very parallelizable since each coin spend is independent.
- Coin value is split between many coins, increasing sandboxing and security. One program cannot call or affect another.
- Deterministic operation of every spend.
- More efficient storage of state (although this depends on implementation).
- Increased privacy, since one user usually has many coins.
- Re-applying mempool transactions after a new block is not necessary due to deterministic results.
