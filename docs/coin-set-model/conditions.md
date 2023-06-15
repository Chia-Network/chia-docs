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

`ASSERT_COIN_ANNOUNCEMENT` and `ASSERT_PUZZLE_ANNOUNCEMENT` should only be used in a puzzle's _solution_, and not in the puzzle itself. 
This is especially important when using the `ASSERT_COIN_ANNOUNCEMENT` condition because it refers to a specific coin. 

To illustrate the danger, let's say `coin A` uses this condition in its puzzle, and it asserts a coin announcement from `coin B`. 
In this case, `coin A` requires `coin B` to be spent in the same block as it is spent.
If `coin B` is spent before `coin A`, then `coin A` can _never_ be spent.

However, if this condition is instead used in the _solution_ for `coin A`, and `coin B` has already been spent, then `coin A` can still be spent later, albeit with a different solution.

It is somewhat less dangerous to use `ASSERT_PUZZLE_ANNOUNCEMENT` in a coin's puzzle because it only relies on a coin with a specific puzzle, and many such coins might exist. 
However, it is still best practice to only use this condition in a coin's solution.

:::

This is an extensive list of each condition allowed on the Chia blockchain.

| Condition                  | Format                            | Description                                                                                |
| -------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------ |
| REMARK                     | `(1)`                             | Always valid. Can be used to pass data to outer puzzles.                                   |
| AGG_SIG_UNSAFE             | `(49 public_key message)`         | Requires a signature for the message. Prefer `AGG_SIG_ME`.                                 |
| AGG_SIG_ME                 | `(50 public_key message)`         | Requires a signature for the message specific to this coin.                                |
| CREATE_COIN                | `(51 puzzle_hash amount (memos))` | Creates a new coin. The memo field is optional.                                            |
| RESERVE_FEE                | `(52 amount)`                     | Requires a fee of at least the amount given.                                               |
| CREATE_COIN_ANNOUNCEMENT   | `(60 message)`                    | Creates a block announcement specific to this coin.                                        |
| ASSERT_COIN_ANNOUNCEMENT   | `(61 announcement_id)`            | Requires a coin specific block announcement by its id. (see above warning)                 |
| CREATE_PUZZLE_ANNOUNCEMENT | `(62 message)`                    | Creates a block announcement specific to this puzzle.                                      |
| ASSERT_PUZZLE_ANNOUNCEMENT | `(63 announcement_id)`            | Requires a puzzle specific block announcement by its id. (see above warning)               |
| ASSERT_MY_COIN_ID          | `(70 coin_id)`                    | Requires the coin id match a value.                                                        |
| ASSERT_MY_PARENT_ID        | `(71 parent_id)`                  | Requires the parent coin id match a value.                                                 |
| ASSERT_MY_PUZZLEHASH       | `(72 puzzle_hash)`                | Requires the puzzle hash match a value.                                                    |
| ASSERT_MY_AMOUNT           | `(73 amount)`                     | Requires the amount match a value.                                                         |
| ASSERT_SECONDS_RELATIVE    | `(80 seconds_passed)`             | Requires at least `seconds_passed` seconds to have passed since this coin's creation.      |
| ASSERT_SECONDS_ABSOLUTE    | `(81 seconds)`                    | Requires the current block's timestamp to be at least `seconds`.                           |
| ASSERT_HEIGHT_RELATIVE     | `(82 block_height_passed)`        | Requires more than `block_height_passed` blocks to have passed since this coin's creation. |
| ASSERT_HEIGHT_ABSOLUTE     | `(83 block_height)`               | Requires the current block's height to be at least `block_height`.                         |

## Condition Costs {#costs}

Conditions not listed here do not have a cost associated with them.

| Condition      | Cost    |
| -------------- | ------- |
| CREATE_COIN    | 1800000 |
| AGG_SIG_UNSAFE | 1200000 |
| AGG_SIG_ME     | 1200000 |

## Hinting

A hint is another word for memo. It's an extra value linked to coins that gets indexed by full nodes. Given a hint, a wallet can discover all coins which include that hint. Additionally, once a wallet has found a coin that includes a hint, it will have another piece of information to determine how it should be spent.

Typically, a hint is the coin's inner puzzle hash. When a wallet sees a hint, it fetches the parent coin spend and attempts to use the hint to figure out the coin's type. For example, if the coin is a CAT, the wallet can determine the CAT's TAIL, and therefore its type, without additional input from an end user.

Thus, hints are powerful because they enable wallets to auto-discover CATs and NFTs associated with that wallet. If hints didn't exist, end users would have to tell their wallets which CATs or NFTs to look for. In the case of an airdrop, if there were no hinting, the wallet's owner might not even know about an asset, so it would never be discovered.

When creating a coin, you can pass it a list of 32 byte hints. This field is optional, and will be ignored if missing or invalid.

Currently, only one hint is used and the rest are completely ignored, but in the future multiple may be used for something.

## Announcements

Announcements are ephemeral, meaning that they don't last forever. They are only accessible within the block they are created. Their purpose is to allow interaction between coins. You can require that one spend happen in order for another to happen, and vice versa.

For coin announcements, the id is the coin id and message sha256 hashed together. Likewise, for puzzle announcements, it's the puzzle hash and message sha256 hashed together.
