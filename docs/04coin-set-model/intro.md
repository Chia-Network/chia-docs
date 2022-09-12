---
sidebar_position: 1
---

# 4.1 Intro

NOTE: This section will briefly discuss Chialisp and the coin set model. For a more in-depth tutorial, head over to [chialisp.com](http://chialisp.com "Chialisp's official website").

## Coin set summary

In any given blockchain, one of the most fundamental questions is, "How do we keep track of the state of the whole system?" Bitcoin uses the Unspent Transaction Output (UTXO) model. Ethereum, along with many other blockchains, use the account model. Chia uses the _coin set_ model, which is similar to UTXO.

The differences between the coin set, UTXO, and account models will be covered in sections [Section 4.6](/docs/04coin-set-model/coin_set_vs_utxo 'Section 4.6: Coin Set vs UTXO') and [Section 4.7](/docs/04coin-set-model/coin_set_vs_account 'Section 4.7: Coin Set vs Account'). For now, we'll start with a brief explanation of the coin set model.

The mantra _everything is a coin_ will go a long way in helping you to understand the coin set model. There are no accounts. There are only coins.

Coins may only be spent once and anyone can attempt to spend them. However coins are locked with specific rules. Coins are written in Chialisp, a Turing-complete language with no side effects, allowing for complex functionality, including composability and interoperability between coins.

The majority of Chia's coins have one simple rule – "Anyone with the right private key can spend me."

## Key features

- As stated above, Chia's blockchain only understands coins. There are no accounts at the blockchain level.
- Technically the coins do not have owners. Anyone can attempt to spend any coin. Most coins are secured such that only someone who possesses a certain public/private key pair may spend them. This person is the coin's de facto "owner."
- The _coin set_ is the total set of all coins on Chia's blockchain.
- The minimum value of a coin is 0 mojos. The theoretical maximum value of a coin is around 18 million XCH (2^64-1 mojos). Each coin can be of any value within this range.
  - Note 1: One use case for a zero-mojo coin is to convey information. For example, upon being spent, a zero-mojo coin could make an announcement for a singleton to recreate itself
  - Note 2: [Singletons](https://chialisp.com/docs/puzzles/singletons) must have an odd-numbered value, so their minimum value is 1 mojo (1 trillionth of an XCH)
- The first block of Chia's blockchain introduced four coins to the coin set, with a total value of 21 million XCH. This is the pre-farm, controlled by Chia Network Inc.
- Each additional block introduces a reward of two coins to the coin set (see [Section 5.3](/docs/05block-validation/block_rewards#farmer-vs-pool-reward 'Section 5.3 Farmer vs Pool Reward') for more info). For the first three years of Chia's blockchain, the targeted daily average to be introduced is 9216 XCH. This amount will be cut in half in 2024, 2027, 2030, and 2033, after which the targeted daily average will always be 576 XCH. While the exact amount introduced on any given day will vary slightly, one can predict the total amount of XCH in the coin set at any given time, with a high degree of accuracy.
- Each coin can only be spent once. Thus, a coin has only two states: unspent and spent. (Technically, there is a third state: not created. This happens when there is a re-org and the creation transaction gets reverted. Re-orgs in Chia are rare, though possible.)
- A coin's value cannot be destroyed. Instead, when a coin is spent, its value is released. One or more new coins will be created in the same block, the total value of which will equal the value of the spent coin.
- The coins themselves are highly programmable, so a wide variety of behavior is possible when a coin is spent.

## The standard transaction

For the standard Chia transaction, one or more coins are spent. One or more new coins are also created – these could be either standard or non-standard Chia coins, such as multisig, smart coins, etc.

New standard coins are secured with a public/private key pair, and whoever possesses these keys is the new "owner." If any value remains, another coin of the remaining value will be created as "change." Typically, this coin will be secured with the original keys, though technically the "change" is just another standard transaction that could be secured by different keys.

The following two examples illustrate the standard transaction:

### Example 1

Alice wants to send 1 XCH to Bob and she controls one coin worth 2 XCH. Her coin will be spent and two new coins will be created: one worth 1 XCH secured by Bob's keys, and one worth 1 XCH secured by Alice's keys.

### Example 2

Alice wants to send 1 XCH to Bob and she controls two coins, each worth 0.9 XCH. Both of her coins will be spent and two new coins will be created: one worth 1 XCH secured by Bob's keys, and one worth 0.8 XCH secured by Alice's keys.

In both of these examples, the latter coin is Alice's "change." Notice that even though one or more coins was spent, the total value remained the same. Thus, the "transfer" of money occurred solely by spending and creating coins.

## Value added and spent

Value may only be added to the coin set via the pre-farm (a one-time occurrence) and block rewards (which occur with each transaction block). Value can never be destroyed, though it can be "bricked," for example by sending it to an address for which nobody possesses the private keys.

Typically, in a block's combined spend bundle, value added will be equal to value spent, other than the block rewards. By definition, there are two possible exceptions:

- Value added > value spent -- This is not allowed, so the transaction will be rejected. The rejection will usually happen at the mempool level, though a malicious actor could write their own mempool to accept the transaction, in which case the blockchain will reject it.
- Value added < value spent -- This is allowed, so the transaction will succeed. If the value added is less than the value spent the remaining value will be rewarded to the farmer of the block containing the transaction awarded as a tip (you probably don't want to do that!).
