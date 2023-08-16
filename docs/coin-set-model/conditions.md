---
slug: /conditions
title: Conditions
---

When a coin is spent, its puzzle is executed on the Chialisp Virtual Machine (CLVM). If the program does not fail, it returns a list of conditions. These conditions determine what the outcome of the spend is, and whether or not the spend is valid.

Puzzles have no access to the outside world, or even to blockchain parameters like block height. Therefore, to interact with the outside environment, they return a list of conditions, each of which must be valid in order for the spend itself to be valid.

There are two kinds of conditions. Some require something to be true (such as time passing) in order for the spend to be valid. And others cause something to happen if the spend is valid (such as the creation of new coins).

## Condition List {#list}

:::warning

Be vigilant when using `ASSERT_MY_COIN_ID` as a shortcut for validating the parent coin id, puzzle hash, and amount. If they are passed into the solution separately, then validated all at once by hashing them together, it is possible to shift the bytes to the left or right and manipulate the values.

Consider either checking them individually or verifying that the hashes are indeed 32 bytes in length.

:::

:::warning

`ASSERT_COIN_ANNOUNCEMENT` and `ASSERT_PUZZLE_ANNOUNCEMENT` should typically only be used in a puzzle's _solution_, and not in the puzzle itself. This is especially important when using `ASSERT_COIN_ANNOUNCEMENT`, because it refers to a specific coin.

To illustrate the danger, let's say `coin A` uses this condition in its puzzle, and it asserts a coin announcement from `coin B`.
In this case, `coin A` requires `coin B` to be spent in the same block as it is spent.
If `coin B` is spent before `coin A`, then `coin A` can _never_ be spent.

However, if this condition is instead used in the _solution_ for `coin A`, and `coin B` has already been spent, then `coin A` can still be spent later, albeit with a different solution.

It is somewhat less dangerous to use `ASSERT_PUZZLE_ANNOUNCEMENT` in a coin's puzzle because it only relies on a coin with a specific puzzle, and many such coins might exist.
However, it is still best practice to only use this condition in a coin's solution.

:::

This is an extensive list of each condition allowed on the Chia blockchain.

| Condition                      | Format                               | Description                                                                                                         |
| ------------------------------ | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| REMARK                         | `(1)`                                | Always a valid condition.                                                                                           |
| AGG_SIG_UNSAFE                 | `(49 public_key message)`            | Verifies a signature by its `public_key` and `message`. Usually `AGG_SIG_ME` is safer.                              |
| AGG_SIG_ME                     | `(50 public_key message)`            | Like `AGG_SIG_UNSAFE`, but including the coin id and genesis id to prevent replay attacks.                          |
| CREATE_COIN                    | `(51 puzzle_hash amount (...memos))` | Creates a coin with a given `puzzle_hash`, `amount`, and an optional [memos](#memos) parameter.                     |
| RESERVE_FEE                    | `(52 amount)`                        | Requires a given `amount` to be remaining in the transaction as a fee.                                              |
| CREATE_COIN_ANNOUNCEMENT       | `(60 message)`                       | Creates an announcement with a given `message`, tied to this coin.                                                  |
| ASSERT_COIN_ANNOUNCEMENT       | `(61 announcement_id)`               | Asserts a coin announcement was created within this transaction by its `announcement_id`.                           |
| CREATE_PUZZLE_ANNOUNCEMENT     | `(62 message)`                       | Creates an announcement with a given `message`, tied to this puzzle.                                                |
| ASSERT_PUZZLE_ANNOUNCEMENT     | `(63 announcement_id)`               | Asserts a puzzle announcement was created within this transaction by its `announcement_id`.                         |
| ASSERT_CONCURRENT_SPEND        | `(64 coin_id)`                       | Asserts that this coin is spent in the same block as a given `coin_id`.                                             |
| ASSERT_CONCURRENT_PUZZLE       | `(65 puzzle_hash)`                   | Asserts that this coin is spent in the same block as a coin with a given `puzzle_hash`.                             |
| ASSERT_MY_COIN_ID              | `(70 coin_id)`                       | Asserts that the coin's id matches the given `coin_id`.                                                             |
| ASSERT_MY_PARENT_ID            | `(71 parent_id)`                     | Asserts that the coin's parent id matches the given `parent_id`.                                                    |
| ASSERT_MY_PUZZLEHASH           | `(72 puzzle_hash)`                   | Asserts that the coin's puzzle hash matches the given `puzzle_hash`.                                                |
| ASSERT_MY_AMOUNT               | `(73 amount)`                        | Asserts that the coin's amount matches the given `amount`.                                                          |
| ASSERT_MY_BIRTH_SECONDS        | `(74 seconds)`                       | Asserts that the coin was created with a timestamp of `seconds`.                                                    |
| ASSERT_MY_BIRTH_HEIGHT         | `(75 block_height)`                  | Asserts that the coin was created on a given `block_height`.                                                        |
| ASSERT_EPHEMERAL               | `(76)`                               | Asserts that the coin was both created and spent on the current block.                                              |
| ASSERT_SECONDS_RELATIVE        | `(80 seconds_passed)`                | Asserts that the previous transaction block's timestamp was at least `seconds_passed` seconds after coin creation.  |
| ASSERT_SECONDS_ABSOLUTE        | `(81 seconds)`                       | Asserts that the previous transaction block's timestamp was at least `seconds`.                                     |
| ASSERT_HEIGHT_RELATIVE         | `(82 block_height_passed)`           | Asserts that the previous transaction block's height was at least `block_height_passed` after coin creation.        |
| ASSERT_HEIGHT_ABSOLUTE         | `(83 block_height)`                  | Asserts that the previous transaction block's height was at least `block_height`.                                   |
| ASSERT_BEFORE_SECONDS_RELATIVE | `(84 seconds_passed)`                | Asserts that the previous transaction block's timestamp was less than `seconds_passed` seconds after coin creation. |
| ASSERT_BEFORE_SECONDS_ABSOLUTE | `(85 seconds)`                       | Asserts that the previous transaction block's timestamp was less than `seconds`.                                    |
| ASSERT_BEFORE_HEIGHT_RELATIVE  | `(86 block_height_passed)`           | Asserts that the previous transaction block's height was less than `seconds_passed` after coin creation.            |
| ASSERT_BEFORE_HEIGHT_ABSOLUTE  | `(87 block_height)`                  | Asserts that the previous transaction block's height was less than `block_height`.                                  |

## Condition Costs {#costs}

Conditions not listed here do not have a cost associated with them.

| Condition      | Cost    |
| -------------- | ------- |
| CREATE_COIN    | 1800000 |
| AGG_SIG_UNSAFE | 1200000 |
| AGG_SIG_ME     | 1200000 |

## Memos and Hinting {#memos}

When a coin uses one or more outer puzzles that change their puzzle hash, it's challenging for wallets to know which coins they have the ability to spend. The memos field allows you to hint the inner puzzle hash of created coins, which consequently lets the wallet know that the coin belongs to it. Coins can be looked up by the inner puzzle hash rather than the outer puzzle hash.

The `CREATE_COIN` condition is defined as a list containing the opcode `51` and the following arguments:

```chialisp
; The third parameter is optional.
(51 puzzle_hash amount (...memos))
```

The `memos` parameter is an optional list, which must be null terminated.

If `memos` is present, and the first memo is exactly 32 bytes long, it's used as the hint and the rest of the list are memos. Otherwise, values in the entire list are memos.

As an example, the following inner solution for the [standard transaction](https://chialisp.com/standard-transactions) would create an unhinted coin:

```chialisp
(() (q . ((51 target_puzzle_hash amount))) ())
```

The following solution would instead create a coin with the hint matching the inner puzzle hash:

```chialisp
(() (q . ((51 target_puzzle_hash amount (target_puzzle_hash)))) ())
```

This `CREATE_COIN` condition creates the same coin as before, but now it specifies the hint with which the receiving wallet can look up to find this coin.

Hints are only necessary for outer puzzles, of which the inner puzzle hash matches the hint. For example, coins using the standard transaction itself with no outer puzzle do not need a hint.

## Announcements

Announcements are ephemeral, meaning that they don't last forever. They can only be asserted within the block they are created. Their purpose is to ensure multiple coins are spent together, either for fees, verification, or as a security measure.

For coin announcements, the id is the `coin_id` and `message` sha256 hashed together. Likewise, for puzzle announcements, it's the `puzzle_hash` and `message` sha256 hashed together.
