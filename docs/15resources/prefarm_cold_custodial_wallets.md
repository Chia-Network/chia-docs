---
id: prefarm_custody_english
title: Prefarm Custody (English Description)
sidebar_label: Prefarm Custody (English Description)
sidebar_position: 7
---

# Prefarm Custody (English Description)
Chia Network Inc will choose a time at which to move most of the prefarm into two new cold wallets. The custodial rules of both wallets will be identical. This document will describe these arrangements in plain English.

## Distribution Amounts
* From the prefarm's original size of 21 million XCH,
  * A yet-to-be-determined amount XCH will be not be subject to the arrangement laid out in this document
  * Of the remaining XCH, some will be custodied by Chia Network Inc (CNI), and some by CNI's Swiss sister company. The amount custodied in each location may or may not be equal

## Withdrawal Rate
The withdrawal rate is the custodial wallet's principal rule. This rule supersedes all other rules of the wallet. No individual or group may modify this rule. Ever.

Here's how it works:
* CNI's and the Swiss company's portion of the prefarm will each be moved to their respective cold custodial wallets. Each wallet will contain a pre-configured Unix timestamp called `d`, which will be purposely set to a future time, some days or weeks after the wallet's creation
* From `d` forward, a constant number of mojos become available to be withdrawn with each passing second. This number must be decided in advance of the wallet's creation
* The amount of available mojos increases linearly, until the entire prefarm has become available. The plan is to configure this rate such that this process will take ten years
* The number of mojos considered _available_ is based on the time that a withdrawal is _initiated_, as explained later in this document
* Even after certain mojos have become available, they will not automatically be withdrawn. They will still need to follow the rest of the rules laid out in this document
* The mojos that are not yet available are frozen. There is no override function

The following formula will calculate how many mojos have been made available to be withdrawn from each wallet:

`num_mojos` = `starting_balance` - (`current_time` - `d`) * `withdrawal_rate`

Where:
  * `num_mojos` is the number of mojos available to be withdrawn
  * `starting_balance` is the initial number of mojos in the custodial wallet
  * `current_time` is the current Unix timestamp
  * `d` is the starting Unix timestamp for the withdrawals from the wallet
  * `withdrawal_rate` is the number of mojos made available with each passing second. This number will be decided before creating the custodial wallets

---

## Singleton Structure

Both of the prefarm's custodial wallets use a singleton with five main features:
1. **Withdrawal rate** -- as discussed in the previous section, funds are made available to be withdrawn at a constant rate of some number of mojos per second

2. **Multisig** -- required to perform actions on the singleton, where:
  * The total number of keys in the multisig is initially set to 5, which will be referred to as `n` for the rest of this document. `n` can be changed with a rekey (explained later)
  * Initially, 3 keys will be required to perform withdrawals and standard rekeys (explained later). This number will be referred to as `m` for the rest of this document. `m` can be thought of as the _security level_ for the wallet. This variable can be modified to be as large as `n`. For the prefarm, it can be as small as 1, though other custodial wallets could set the minimum to a larger number

3. **Merkle root** -- Chialisp puzzles representing the `n` keys are stored in a Merkle tree, where:
  * Puzzles representing every combination of keys, from 1 to `m`, are stored. If the keys are A, B, C, D and E, and `m` is 3, then the combinations to be stored are ABC, ABD, ABE, ACD, ACE, ADE, BCD, BCE, BDE, CDE, AB, AC, AD, AE, BC, BD, BE, CD, CE, DE, A, B, C, D and E
  * The Merkle root of this tree is curried (pre-committed) into the singleton
  * The Merkle root of a tree containing puzzles of all possible combinations for `m` + 1 is also curried into the singleton. This is required in case of a lock level increase (explained later). This root is recursive, in that it contains puzzles that have combinations for `m` + 2 committed to them, leading up to the level where `m` = `n`.
  * In order to spend a coin from this wallet, a node in the Merkle tree, along with a Proof of Inclusion, are required to be passed into the singleton's solution. The Proof of Inclusion must prove the node's existence in the current Merkle root in order for the spend to succeed
  * The Merkle tree is stored in multiple private locations. However, even if a copy is stolen, the thief will not gain access to the wallet because `m` digital signatures are still required (see below for a more detailed analysis)
  * The Merkle tree is generated deterministically, based on the `n` pubkeys. If the Merkle tree is lost, it can be regenerated by using the `n` pubkeys
  
4. **Withdrawal Timelock** -- This is a timelock on initiating a withdrawal, referred to as `wt` for the rest of this document. The value of `wt` is set upon the wallet's creation and can never be changed. It will be explained in detail below. (Note that this is completely separate from the withdrawal rate discussed in 1 above.)

5. **Rekey Timelock** -- This is a timelock on initiating a rekey, referred to as `rt` for the rest of this document. The value of `rt` is set upon the wallet's creation and can never be changed. It will be explained in detail below. (Note that this is completely separate from the withdrawal rate discussed in 1 above.)

---

## Singleton Settings

Some of the singleton's settings are fixed (unchangeable), and others are changeable. Each of these settings will be discussed in detail later.

### Fixed settings

Setting      | Prefarm Value | Description
:------------|:------------------|:-----------
`d`          | Unknown           | The [UNIX epoch timestamp](https://www.epochconverter.com/) when the singleton's "amount available" setting will begin to increase. For testing, you can set it to a time in the near future (for example, 100 seconds from now).
`r`          | Billions of mojos | The number of mojos per second you want to be made available to be withdrawn.
`a`          | Millions of XCH   | The initial value of the singleton.
`wt`         | 30 days           | Withdrawal Timelock -- When attempting to begin a withdrawal, this is the minimum number of seconds that must have elapsed since the last withdrawal, rekey or claw back.
`pc`         | 90 days           | Payment Claw back -- The minimum number of seconds that must elapse after initiating a withdrawal before the withdrawal can be completed. Claw backs are possible during this window.
`rt`         | 15 days           | Rekey Timelock -- When attempting to begin a standard rekey, this is the minimum number of seconds that must have elapsed since the last withdrawal, rekey or claw back. For a slow rekey, this amount gets added for each key less than `m`.
`rc`         | 30 days           | Rekey Claw back -- The minimum number of seconds that must elapse after initiating a rekey before the rekey can be completed. Claw backs are possible during this window.
`sp`         | 45 days           | Slow rekey Penalty -- This amount gets added to the Rekey Timelock when a slow rekey is being performed.

### Changeable settings

Setting    | Initial<br/>Value | Description
:----------|:----------------- |:-----------
`m`        | 3                 | The initial number of pubkeys required to do a withdrawal or standard rekey
`n`        | 5                 | The maximum number of pubkeys required to do a withdrawal or standard rekey
`pks`      |                   | A comma separated list of pubkey files that will control this money

## Allowed Actions
Three separate actions are allowed on the wallet's singleton: withdrawals, rekeys (normal and slow) and lock level increases. Each of these actions will be discussed in detail in this section.

### Withdrawal
This action removes money from the wallet

  > Note that the rate limit, as discussed above, must always be followed for all withdrawals

* In order for a withdrawal to be initiated, exactly `m` of `n` signatures are required

Two phases must be completed to perform a withdrawal, a _withdrawal timelock_ and a _drop coin_.

#### Withdrawal Timelock

Even though this is called a _timelock_, it acts more like a _gateway_, which either allows or disallows the singleton to begin the withdrawal process. It has the following rules:
  * `wt` seconds must have elapsed since any actions (other than a lock level increase, explained below) have been performed on the singleton
  * The `wt`-second condition either has, or has not, been met
  * The `wt`-second length cannot be modified

If the withdrawal timelock condition has not been met, then a withdrawal may not be initiated. If it has been met, then a withdrawal may be initiated. The next phase is the _drop coin_.

#### Drop Coin
Upon entering this phase, the singleton creates a _drop coin_ of the amount of XCH to be withdrawn. A drop coin has several rules:
  * It has a curried XCH payout address, to where the money is flagged to be withdrawn
  * It has a payment clawback timelock, referred to as `pc` for the rest of this document
  * Because the drop coin cannot be spent for `pc` seconds, it functions as a permissionless escrow
  * The drop coin contains the same Merkle root that was used in the singleton
  * At any point before the drop coin has been spent, _claw back_ is allowed. Claw back has the following features:
    * It cancels the withdrawal and returns the money to the custodial wallet's singleton. It uses `p2_singleton` to accomplish this, so there is further action needed for the funds to be absorbed into the singleton
    * It requires `m` of `n` signatures
    * The `m` signatures don't have to be the same as the ones that initiated the withdrawal. In other words, different people could claw back the withdrawal than those who initiated it
  * After `pc` seconds, if a claw back has not been performed, _completion_ becomes possible. Completion has the following features:
    * It completes the withdrawal to a pre-specified XCH address
    * **Anyone** is allowed to perform a completion
    * Even though a completion can be performed by anyone, it is secure because the withdrawal address is not changeable

### Rekey
This action changes the keys associated with the wallet's singleton.

`k` keys are required for a rekey, where:
  * For a _standard_ rekey, `k = m`
  * For a _slow_ rekey, `1 <= k < m`. (A slow rekey could be performed with just one key.)

Either type of rekey can also modify `m` and/or `n` if desired. We'll discuss the circumstances where each type of rekey will be performed later in this section.

Two phases must be completed to perform a rekey, an _initiation timelock_ and a _drop coin_.

#### Initiation
Before a rekey can begin, a certain amount of time must have elapsed since the last action (other than a lock level increase, explained below) was performed on the singleton. This is a _de facto_ gateway; the time condition either has, or has not been met.

The amount of time before the rekey can begin is not a constant. In order to calculate this time, several factors must be considered:

* Start by calculating `x`, where `x = m - k + 1`
  * If `x` is `1`, then it's a standard rekey (`k = m`)
  * If `x > 1`, then it's a slow rekey. `x` represents the gap between the `k` keys being used with this rekey and `m + 1` (the number of keys required for a lock level increase, as explained below)
* For a standard rekey, the initiation timelock duration is `rt`. As discussed above, `rt` is stored in the singleton and can never be changed
* For a slow rekey, a time penalty `sp` seconds is automatically applied. The value of `sp` also can never be changed
* The duration of the initiation timelock of a slow rekey is `sp + rt*x` seconds. In other words, a penalty of `rt` seconds gets added for each key less than `m`

The following table illustrates a few examples of initiation timelock lengths, for various values of `m` and `k`. For this table, `rt` is set to 15 days and `sp` is set to 45 days (these are both denominated in seconds). The table assumes that `n` (5) and the minimum `k` (1) have not been modified from their default values:

`m` | `k` | Days | Comment |
:--:|:---:|:----:|:------- |
3   | 3   | 15   | Standard rekey, no penalty |
3   | 2   | 75   | Slow rekey, `sp` day penalty + 2 * standard `rt` days |
3   | 1   | 90   | Slow rekey, `sp` day penalty + 3 * `rt` days |
1   | 1   | 15   | This is a case where, after a prior rekey, `m` was reduced to 1. There is no penalty, even with a single key |
5   | 3   | 90   | In this case, a lock level increase has been performed, so 5 of 5 keys are required to avoid a penalty|
5   | 1   | 120  | This is the longest possible initiation timelock duration when `n` is 5 and the minimum `k` is 1. In this case, `m` has been increased to 5, and 1 key is being used for the rekey |
... |...  | ...  | Other combinations for `m` and `k` are possible, but not shown here |

If the singleton has been modified within the timelock's required number of seconds, then the initiation timelock condition has not been met, and a rekey may not be initiated. If the initiation timelock condition has been met, then a withdrawal may be initiated. The next phase is the _drop coin_. `k` is carried over to this phase.

#### Drop Coin
Upon entering this phase, the singleton creates a _drop coin_ with 0 value. This drop coin has several rules:
* It has a hard-coded timelock, hereafter referred to as `rc`
* The same Merkle root that was used in the singleton is curried into the drop coin
* A new Merkle root is also curried into the drop coin. After the rekey has completed, this will become the Merkle root of the puzzles representing the new keys. Therefore, the new keys, along with the new Merkle tree, must have been generated before the drop coin was created
* At any point before the drop coin has been spent, _claw back_ is allowed. Claw back has the following features:
  * It cancels the rekey; the custodial wallet's singleton is left unmodified
  * It requires `k` signatures (the number of keys that initiated the rekey)
  * The `k` signatures don't have to be the same as the ones that initiated the rekey. In other words, different people could claw back the rekey than those who initiated it
* After `rc` seconds, if a claw back has not been performed, _completion_ becomes possible. Completion has the following features:
  * It spends the drop coin, which creates a puzzle announcement for the singleton to use
  * It also spends the singleton, which asserts the puzzle announcement from the drop coin, and recreates itself with the new Merkle root curried in
  * `m` and/or `n` could be set to different numbers in the new singleton
  * **Anyone** is allowed to perform the completion
  * Even though the completion can be performed by anyone, it is secure because the new Merkle root has already been committed to

Note that because `rc` is hard-coded, a second rekey can't overtake a rekey that has already been initiated. If rekey A is in progress and someone attempts rekey B, then A will succeed and B will fail.

### Lock Level Increase
This action increases the wallet's security (`m`) by 1. It has the following features:
* `m + 1` keys are required to perform a lock level increase
* The effect is immediate -- there is no timelock
* The keys themselves don't change
* This action is secure because the new Merkle root has been pre-committed
* In running this action, the singleton is spent and a new copy is created, with a new Merkle root curried in. This new root is taken from a Merkle tree containing every possible combination of keys from the new `m` down to 1
* This action automatically invalidates all outstanding rekey attempts because the Merkle root has changed in the new copy of the singleton
* This action does _not_ invalidate outstanding withdrawal attempts

### When are Normal Rekey, Slow Rekey and Lock Level Increase needed?
Normally, each of the keys will be in a Secure state. This means that the original owner still possesses the key, and no adversaries have gained access to it.

Keys have three other possible states:
* Sniffed -- An adversary has gained access to the key. The owner still has a copy 
* Stolen -- An adversary has gained access to the key. The owner no longer has a copy
* Lost -- The owner has lost the key. Nobody else has gained access to it

If a sufficient number of keys are sniffed, stolen or lost, there are three potential catastrophic consequences:
* Deadlocked -- The owners and adversaries each attempt to rekey and claw back those attempts. Neither side obtains the funds until the other side gives up
* Drained -- Attackers are able to steal the funds
* Bricked -- Nobody is able to access the funds

Any time one or more keys have been sniffed, stolen or lost, a rekey will be performed if possible. 

The Merkle tree is needed to perform withdrawals, rekeys and lock level increases. Multiple copies of the tree will be kept in private locations. The assumption is that if any of the keys are sniffed, stolen or lost, the Merkle tree has been sniffed.

The following table lists the action/consequence, given the current value of `m` and the state of the keys:

<br/>

| `m` | Keys Sniffed | Keys Stolen | Keys Lost |
|:----|:--------|:-------|:-----|
| 3   | 0-2: normal rekey <br/> 3: lock level increase to 4, normal rekey <br/> 4: lock level increase to 5, normal rekey <br/> 5: deadlocked | 0-2: normal rekey <br/> 3-5: drained | 0-2: normal rekey <br/> 3-4: slow rekey <br/> 5: bricked |
| 4   | 0-3: normal rekey <br/> 4: lock level increase to 5, normal rekey <br/> 5: deadlocked  | 0-1: normal rekey <br/> 2: slow rekey <br/> 3-5: drained | 0-1: normal rekey <br/> 2-4: slow rekey <br/> 5: bricked |
| 5   | 0-4: normal rekey <br/> 5: deadlocked | 0: normal rekey <br/> 1-2: slow rekey <br/> 3-5: drained | 0: normal rekey <br/> 1-4: slow rekey <br/> 5: bricked |

-----

## Source Code

The source code for the custody solution is in the [internal-custody GitHub repository](https://github.com/Chia-Network/internal-custody "Chia internal custody solution").

There are two configuration files, one that can be made public (for observers) and one that should be kept private.

### Public Configuration
An observer can track the prefarm's configuration information from [prefarm_info.py](https://github.com/Chia-Network/internal-custody/blob/main/cic/drivers/prefarm_info.py#L8-L18 "public configuration information"), which contains the following variables:
* `launcher_id`: `bytes32` -- This is pre-set; the user cannot change it
* `start_date`: `uint64` -- On what date are withdrawals allowed to start?
* `starting_amount`: `uint64` -- How many mojos will the cold wallet start with?
* `mojos_per_second`: `uint64` -- How many mojos per second will be made available to be withdrawn?
* `puzzle_root`: `bytes32` -- This is pre-set; the user cannot change it
* `withdrawal_timelock`: `uint64` -- How long must the singleton remain unspent in order to initiate a withdrawal?
* `payment_clawback_period`: `uint64` -- How long do signers have to claw back a payment?
* `rekey_clawback_period`: `uint64` -- How long to claw back a rekey?
* `slow_rekey_timelock`: `uint64` -- What is the penalty P that is applied to the singleton timelock when initiating a slow rekey?
* `rekey_increments`: `uint64` -- What is the timelock increment for using fewer keys?

### Private Configuration
The necessary information to spend the prefarm is located in [puzzle_root_construction.py](https://github.com/Chia-Network/internal-custody/blob/627b4155becfadbcd0a565412019297ae2db8b6b/cic/drivers/puzzle_root_construction.py#L24-L32 "private configuration information"). This information is considered private. However, if an attacker obtained this information, it would still be insufficient to spend the prefarm because valid signatures would be required. However, the Merkle tree would be considered sniffed, so a rekey would be required.

This code contains the following variables:
* `prefarm_info`: `PrefarmInfo` -- The info from the public file
* `pubkey_list`: `List[G1Element]` -- What are the set of pubkeys?
* `required_pubkeys`: `uint32` -- How many keys are required for payments and standard rekeys (`m` initially is 3 for the prefarm)?
* `maximum_pubkeys`: `uint32` -- What is the maximum lock level (`n` is 5 for the prefarm)?
* `minimum_pubkeys`: `uint32` -- What is the minimum number of keys required for a slow rekey (1 for the prefarm, but could be higher if so desired).
* `next_root`: `Optional[bytes32]` -- What will the root key be in the event of a rekey?
* `filter_proofs`: `ProofType`
* `leaf_proofs`: `ProofType`