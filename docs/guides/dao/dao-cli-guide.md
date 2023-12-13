---
slug: /dao-cli-guide
title: DAO CLI Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning 

Chia DAOs are currently an _alpha_ primitive. This means that DAOs are not yet ready for production use, but you can still test them on either a simulator or a testnet. **We recommend against creating DAOs with this primitive on mainnet!**

:::

## Intro

This is a guide for using Chia DAOs from a command line interface (CLI). To follow this guide, you will need:
- Chia version 2.1.2 or later
- A wallet with some TXCH for creating a treasury
- Ideally at least one more wallet to be used for voting on proposals

For more information about Chia DAOs, see:
- [DAO CLI Reference](/dao-cli)
- [DAO RPC Reference](/dao-rpc)
- [DAO1 CHIP](https://github.com/Chia-Network/chips/pull/93)

---

## About

Chia Decentralized Autonomous Organizations (DAOs) are organizations where no central entity is in control. DAOs are funded through their treasuries. Membership is determined by ownership of DAO CATs, which function as ownership shares. Any member can create a proposal, for example to spend some of the DAO's treasury. Members vote on proposals with their ownership shares.

---

## Guide

This guide will use four separate wallets:
* The **DAO creator** wallet will create the DAO, fund the treasury, distribute voting tokens, and create and vote on proposals.
* **DAO participant 1** and **DAO participant 2** will join a DAO that already exists. They will acquire voting tokens from the **DAO creator**. They can also create and vote on proposals.
* The **DAO payout wallet** will only be used for receiving funds from a _spend_ proposal. This wallet will not join the DAO.

:::info

It is possible to replicate almost all of this guide with just one wallet that serves every function listed above. The reason to use four wallets is to show how a DAO would actually work with multiple participants.

:::

### Create a DAO

The first step is for the **DAO creator** wallet to create the DAO. If you are going to follow along, be sure to create and fund your own wallet.

Before creating the DAO, show the status of the **DAO creator** wallet:

```bash
chia wallet show
```

```bash
Chia Wallet:
   -Total Balance:         75.997439613215 txch (75997439613215 mojo)
   -Pending Total Balance: 75.997439613215 txch (75997439613215 mojo)
   -Spendable:             75.997439613215 txch (75997439613215 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

:::warning

In order to create a DAO, your wallet must have at least two coins. If there is only one coin in your wallet, you will get an error. You can use the [coins](/wallet-cli#coins) command to see how many coins your wallet contains. For example:

```bash
chia wallet coins list
```

In this case, the wallet contains two coins:

```bash
There are a total of 2 coins in wallet 1.
2 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0x722a89074b24a5742aa36667e2864b0c7151515a4796b062601de02e67a4bb4c
        Address: txch1fenczrps3557huq89xz7ky0t0ehjsrqjde5qreardyxp0kqxewasrgr79z Amount: 1.899070877520  (1899070877520 mojo), Confirmed in block: 496076

Coin ID: 0xde53700207e23c74088bd6feaadf39f36248729880ffe112b9420fa27c861d5c
        Address: txch18k0tt72s6etkdc5yn03ccq90f23r6kleauu6nck7r3jddhwq638qhkxf2w Amount: 74.098368735695  (74098368735695 mojo), Confirmed in block: 496080
```

:::

The command to create a DAO is `chia dao create`. This command contains many options -- see [the documentation](/dao-cli#create) for a complete list. Most of the options are not required. However, we will change several of them because their default values are more appropriate for real-world DAOs.

For this example, we will specify the following values:
* `proposal-timelock: 3` -- Proposals must exist for at least 3 blocks before being closed.
* `soft-close: 2` -- Proposals must be unspent for at least 2 blocks before being closed.
* `attendance-required: 3000` -- At least 3000 votes ('yes' and 'no' combined) must be received before a proposal can pass.
* `pass-percentage: 5000` -- At least 50% of votes must be 'yes' in order for a proposal to pass.
* `self-destruct: 1` -- At least 1 block must pass before a proposal can be removed.
* `oracle-delay: 2` -- At least 2 blocks must pass between oracle spends of the treasury.
* `proposal-minimum: 0.000001` -- One million mojos will be donated to the treasury upon completion of a proposal. This prevents bad actors from spamming a DAO with untenable proposals.
* `filter-amount: 1` -- At least 1 vote must be made for a proposal before the wallet will recognize it.
* `cat-amount: 5000` -- Five thousand DAO CATs will be created initially.
* `m: 0.00001` -- A blockchain fee of 0.00001 XCH will be paid for the transaction that creates the DAO.
* `fee-for-cat: 0.00001` -- A second blockchain fee of 0.00001 XCH will be paid for the transaction that creates the DAO CATs.

These options are appropriate for running a small-scale DAO on a testnet. Be sure to choose your own options according to your DAO's needs.

Here is the command to create this DAO:

```bash
chia dao create --proposal-timelock 3 --soft-close 2 --attendance-required 3000 --pass-percentage 5000 --self-destruct 1 --oracle-delay 2 --proposal-minimum 0.000001 --filter-amount 1 --cat-amount 5000 -m 0.00001 --fee-for-cat 0.00001
```

Response:

```
Successfully created DAO Wallet
DAO Treasury ID: 0x41b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123
DAO Wallet ID: 2
CAT Wallet ID: 3
DAOCAT Wallet ID: 4
```

This command will execute two simultaneous transactions: one to create the DAO and one to mint the CATs. It will also create a `CAT` wallet and a `DAO_CAT` wallet. After creating the DAO, the **DAO creator** can view the status of these wallets by running `chia wallet show`:

```bash
chia wallet show
```

Response:

```bash
Chia Wallet:
   -Total Balance:         75.997419608214 txch (75997419608214 mojo)
   -Pending Total Balance: 75.997419608214 txch (75997419608214 mojo)
   -Spendable:             75.997419608214 txch (75997419608214 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Profile 1:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DAO
   -Treasury ID:           41b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123
   -Wallet ID:             2

CAT 52d38b7cc156c8a7...:
   -Total Balance:         5.0  (5000 mojo)
   -Pending Total Balance: 5.0  (5000 mojo)
   -Spendable:             5.0  (5000 mojo)
   -Type:                  CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             3

CAT 52d38b7cc156c8a7...:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             4
```

The **DAO creator** now sees the following Wallet IDs:
* DAO singleton: `Wallet ID: 2` -- keeps track of the rules governing the DAO
* Unlocked DAO tokens: `Wallet ID: 3` -- tokens that are not in "voting mode"; can be transferred to other participants
* Locked DAO tokens: `Wallet ID: 4` -- tokens that are in "voting mode"; may only be used to vote on proposals

:::info

If you created a DAO using a new wallet (without any CATs, NFTs, DIDs, etc), the DAO singleton will be stored in `Wallet ID: 2`. This wallet must be specified when running DAO commands. If your wallet already had a token such as a CAT occupying `Wallet ID: 2` upon creating the DAO, then your DAO singleton will use a higher number for its `Wallet ID`. Be sure to modify the commands from this document accordingly.

:::

In this case, five unlocked CATs were created from 5000 mojos. As will be demonstrated later, these CATs can be locked to be used for voting, thus creating up to 5000 total votes for the DAO. Recall that -- according to this DAO's custom rules -- at least 3000 votes must be cast in order for a proposal to pass. This is similar to when a democratic government requires a quorum of members to be present in order to vote on legislation. In addition, at least 50% of the votes must be "yes" in order for a proposal to pass.

For now, the DAO's creator has control of each of the votes. We'll distribute some of the votes to other participants later.

Before moving on, let's examine the DAO's rules by running the `rules` command:

```bash
chia dao rules -i 2
```

Response:

```bash
attendance_required: 3000
oracle_spend_delay: 2
pass_percentage: 5000
proposal_minimum_amount: 1000001
proposal_timelock: 3
self_destruct_length: 1
soft_close_length: 2
```

### Fund a DAO

Initially, the DAO's treasury will contain no funds. This can be verified by running the `balance` command:

```bash
chia dao balance -i 2
```

Response:

```bash
The DAO treasury currently has no funds
```

To add funds, first we need to get the DAO's ID:

```bash
chia dao get_id -i 2
```

Response:

```bash
Treasury ID: 0x41b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123
```

Next, we can add funds. In this case we'll add 5 TXCH from `Wallet ID: 1` (the TXCH wallet). Adding funds requires an on-chain transaction, so we'll include a blockchain fee of 0.00001 TXCH:

```bash
chia dao add_funds -i 2 --funding-wallet-id 1 -a 5 -m 0.00001
```

Response:

```bash
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 3885096935 -tx 0x2ae64a45323a172b0834ddc58c4fbcfdf9a12b256feaf8f93eb8407e6a0df662' to get status
```

The transaction will require a few minutes to be accepted. Run the suggested `get_transaction` command to obtain the status:

```bash
chia wallet get_transaction -f 3885096935 -tx 0x2ae64a45323a172b0834ddc58c4fbcfdf9a12b256feaf8f93eb8407e6a0df662
```

Response:

```bash
Transaction 2ae64a45323a172b0834ddc58c4fbcfdf9a12b256feaf8f93eb8407e6a0df662
Status: Confirmed
Amount sent: 5 TXCH
To address: txch1lql93k68r6cufuuyla7cman8a4r06egj96t7486wf8f2yqv43tnq067l0j
Created at: 2023-11-24 09:19:37
```

After the transaction has been `Confirmed`, the DAOs balance will also be updated:

```bash
chia dao balance -i 2
```

Response:

```bash
XCH: 5.0
```

The DAO now has 5 TXCH in its treasury. But there isn't much point in creating a DAO with only one member. The next step will be to get others to join.

### Join a DAO

For this example, we will begin with a wallet that contains 3 TXCH. This will become the wallet for **DAO participant 1**:

```bash
chia wallet show
```

Response:

```bash
Chia Wallet:
   -Total Balance:         3.0 txch (3000000000000 mojo)
   -Pending Total Balance: 3.0 txch (3000000000000 mojo)
   -Spendable:             3.0 txch (3000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

This owner of this wallet wants to join the DAO. First, you will need to send them the treasury ID, which is `0x41b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123` in this example.

The participant can then track your DAO by running the `add` command. Just in case this wallet wants to track more than one DAO, we can give it a human-readable name:

```bash
chia dao add -n "Tutorial DAO" -t 0x41b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123
```

Response:

```bash
Adding wallet for DAO: 0x41b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123
This may take awhile.
Successfully created DAO Wallet
DAO Treasury ID: 0x41b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123
DAO Wallet ID: 2
CAT Wallet ID: 3
DAOCAT Wallet ID: 4
```

As with the wallet for the **DAO creator**, three new wallet IDs have been created. **DAO participant 1** currently does not have any DAO tokens (`Wallet ID: 3`):

```bash
chia wallet show
```

Response

```bash
Chia Wallet:
   -Total Balance:         3.0 txch (3000000000000 mojo)
   -Pending Total Balance: 3.0 txch (3000000000000 mojo)
   -Spendable:             3.0 txch (3000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Tutorial DAO:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DAO
   -Treasury ID:           41b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123
   -Wallet ID:             2

CAT 52d38b7cc156c8a7...:
   -Total Balance:         0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable:             0.0  (0 mojo)
   -Type:                  CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             3

CAT 52d38b7cc156c8a7...:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             4
```

DAO CATs can be acquired by using Chia Offers (See our [Offers tutorial](/guides/offers-cli-tutorial) for more info).

:::info

Offers are recommended, but not required, for acquiring DAO CATs. In addition, either party (**DAO creator** and **DAO participant 1** in this example) can create the offer, and either party can accept it.

:::

In this case, let's create an Offer to buy 1 CAT (1000 voting tokens) for 1 TXCH:

```bash
chia wallet make_offer -o 1:1 -r 3:1 -p 1_TXCH_for_1_CAT.offer
```

Confirmation is required before creating the offer:

```bash
Creating Offer
--------------

OFFERING:
  - 1 XCH (1000000000000 mojos)
REQUESTING:
  - 1 CAT 52d38b7cc156c8a7... (1000 mojos)
Confirm (y/n): y
Created offer with ID 3c40cbbc40d7c82a0a88966892fd9eb5db3b924bcf40cea4e08aa1fc834fe128
Use chia wallet get_offers --id 3c40cbbc40d7c82a0a88966892fd9eb5db3b924bcf40cea4e08aa1fc834fe128 -f 2458592469 to view status
```

Now that the Offer file has been created, **DAO participant 1** can send it to the **DAO creator**.

Next, we'll use the **DAO creator** wallet to view the Offer. The `-e` flag will ensure that we only examine the Offer without taking it for now:

```bash
chia wallet take_offer -e 1_TXCH_for_1_CAT.offer
```

Response:

```bash
Summary:
  OFFERED:
    - TXCH (Wallet ID: 1): 1.0 (1000000000000 mojos)
  REQUESTED:
    - CAT 52d38b7cc156c8a7... (Wallet ID: 3): 1.0 (1000 mojos)
```

The owner of the **DAO creator** wallet should verify that the CAT ID matches the ID from the DAO before accepting the Offer. In this case, the ID is correct, so the **DAO creator** will accept the Offer by running the same command without the `-e` flag:

```bash
chia wallet take_offer 1_TXCH_for_1_CAT.offer
```

Once again, confirmation is required:

```bash
Summary:
  OFFERED:
    - TXCH (Wallet ID: 1): 1.0 (1000000000000 mojos)
  REQUESTED:
    - CAT 52d38b7cc156c8a7... (Wallet ID: 3): 1.0 (1000 mojos)

Included Fees: 0 TXCH, 0 mojos

Would you like to take this offer? (y/n): y
Accepted offer with ID ae4cb8049069b450d82c75b74daa9a28149fa0ec342c7a3a621574262bf52f30
Use chia wallet get_offers --id ae4cb8049069b450d82c75b74daa9a28149fa0ec342c7a3a621574262bf52f30 -f 3885096935 to view its status
```

After the transaction has been confirmed, the **DAO creator** has 4 CATs remaining, and **DAO participant 1** has 1 CAT and 2 TXCH.

Next, we will repeat this process with **DAO participant 2**, except that wallet will acquire 2 CATs in exchange for 2 TXCH. For brevity, we won't show those transactions here.

As a review, the status of each of the wallets is as follows:

**DAO creator**
```bash
Chia Wallet:
   -Total Balance:         73.997309608214 txch (73997309608214 mojo)
   -Pending Total Balance: 74.997309608214 txch (74997309608214 mojo)
   -Spendable:             73.997309608214 txch (73997309608214 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Profile 1:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DAO
   -Treasury ID:           41b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123
   -Wallet ID:             2

CAT 52d38b7cc156c8a7...:
   -Total Balance:         2.0  (2000 mojo)
   -Pending Total Balance: 2.0  (2000 mojo)
   -Spendable:             2.0  (2000 mojo)
   -Type:                  CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             3

CAT 52d38b7cc156c8a7...:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             4
```

**DAO participant 1**
```bash
Chia Wallet:
   -Total Balance:         2.0 txch (2000000000000 mojo)
   -Pending Total Balance: 2.0 txch (2000000000000 mojo)
   -Spendable:             2.0 txch (2000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Tutorial DAO:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DAO
   -Treasury ID:           41b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123
   -Wallet ID:             2

CAT 52d38b7cc156c8a7...:
   -Total Balance:         1.0  (1000 mojo)
   -Pending Total Balance: 1.0  (1000 mojo)
   -Spendable:             1.0  (1000 mojo)
   -Type:                  CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             3

CAT 52d38b7cc156c8a7...:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             4
```

**DAO participant 2**

```bash
Chia Wallet:
   -Total Balance:         1.0 txch (1000000000000 mojo)
   -Pending Total Balance: 1.0 txch (1000000000000 mojo)
   -Spendable:             1.0 txch (1000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Tutorial DAO:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DAO
   -Treasury ID:           41b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123
   -Wallet ID:             2

CAT 52d38b7cc156c8a7...:
   -Total Balance:         2.0  (2000 mojo)
   -Pending Total Balance: 2.0  (2000 mojo)
   -Spendable:             2.0  (2000 mojo)
   -Type:                  CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             3

CAT 52d38b7cc156c8a7...:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             4
```

### Lock up coins

In each of the wallets, the `DAO_CAT` balance is `0.0`. This is because the tokens from each wallet are not currently in voting mode. Each wallet still needs to run the `lockup_coins` command. The maximum number of tokens they can lock is the number of CAT mojos they currently possess. In this case, we'll lock 1 CAT (1000 DAO_CAT) for each wallet:

```bash
chia dao lockup_coins -i 2 -a 1 -m 0.00001
```

Response:

```bash
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 3885096935 -tx 0xe3eeeb55f97dea6f3330c286b917afea8c3e0f3a388b00d33abf93e44d2efe0d' to get status
```

In each wallet's case, an on-chain transaction is required. After running this command on all three wallets, the status of CATs and DAO_CATs is as follows:

**DAO creator**
```bash
CAT 52d38b7cc156c8a7...:
   -Total Balance:         1.0  (1000 mojo)
   -Pending Total Balance: 1.0  (1000 mojo)
   -Spendable:             1.0  (1000 mojo)
   -Type:                  CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             3

CAT 52d38b7cc156c8a7...:
   -Total Balance:         1000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             4
```

**DAO participant 1**
```bash
CAT 52d38b7cc156c8a7...:
   -Total Balance:         0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable:             0.0  (0 mojo)
   -Type:                  CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             3

CAT 52d38b7cc156c8a7...:
   -Total Balance:         1000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             4
```

**DAO participant 2**
```bash
CAT 52d38b7cc156c8a7...:
   -Total Balance:         1.0  (1000 mojo)
   -Pending Total Balance: 1.0  (1000 mojo)
   -Spendable:             1.0  (1000 mojo)
   -Type:                  CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             3

CAT 52d38b7cc156c8a7...:
   -Total Balance:         1000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             4
```

A total of 3000 tokens (1000 for each wallet) have been locked up for voting. This means that a new proposal can receive up to 3000 votes. The wallets with remaining unlocked CATs can lock their CATs to add more votes if desired.

### Create a spend proposal

DAOs come with three types of proposals:
* Spend some of the treasury
* Mint more CATs for the DAO
* Change the DAO's rules

First, let's create a spend proposal. To set this proposal up, we will need an address to which to send the funds if the proposal succeeds. This can be *any* XCH/TXCH address (it could be the address of a new singleton or any other smart contract), but for this tutorial the **DAO payout wallet** will just be a standard wallet.

Let's say the **DAO payout wallet** currently has no balance:

```bash
chia wallet show
```

Response:

```bash
Chia Wallet:
   -Total Balance:         0.0 txch (0 mojo)
   -Pending Total Balance: 0.0 txch (0 mojo)
   -Spendable:             0.0 txch (0 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:
```

We'll obtain an address from this wallet to be used as the proposal's payout address:

```bash
chia wallet get_address
```

Response:

```bash
txch1796cqesu4cghd603743hdsp4ffz0tj0tacp63ag2p433fhudkyuq58sw69
```

Recall that the DAO's treasury contains 5 TXCH. Any of the participating wallets can verify this:

```bash
chia dao balance -i 2
```

Response:

```bash
XCH: 5.0
```

In addition, any of the participating wallets can show the DAO's rules:

```bash
chia dao rules -i 2
```

Response:

```bash
attendance_required: 3000
oracle_spend_delay: 2
pass_percentage: 5000
proposal_minimum_amount: 1000001
proposal_timelock: 3
self_destruct_length: 1
soft_close_length: 2
```

In this case, the minimum amount for a proposal is `1 000 001` mojos. Upon a proposal's creation, this amount will be reserved from the proposal creator's wallet. When the proposal is closed, the amount will be added to the DAO's treasury. This amount exists as a deterrent from participants spamming a DAO with proposals with little chance of passing.

Let's say **DAO participant 2** wants to create a proposal to send 1 TXCH to the above address. This person also wants to use each of their 1000 votes to vote in favor of this proposal immediately. Creating a proposal requires an on-chain transaction, so the proposal's creator also adds a fee:

```bash
chia dao create_proposal spend -i 2 -a 1 -t txch1796cqesu4cghd603743hdsp4ffz0tj0tacp63ag2p433fhudkyuq58sw69 -v 1000 -m 0.00001
```

Response:

```
Created spend proposal for asset: XCH
Successfully created proposal.
Proposal ID: 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22
```

After the transaction to create the proposal has been confirmed on the blockchain, any of the DAO's participants can view its status:

```bash
chia dao show_proposal -i 2 -p 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22
```

Response:

```bash
Details of Proposal: 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22
---------------------------

Type: SPEND
Status: OPEN
Passed: False
Yes votes needed: 500
Closable: False
Total votes needed: 2000
Blocks remaining: 2

Proposal XCH Conditions
Address: txch1796cqesu4cghd603743hdsp4ffz0tj0tacp63ag2p433fhudkyuq58sw69
Amount: 1000000000000
```

### Vote on a proposal

Continuing from the above example, we have a proposal to send 1 TXCH to an address. **DAO participant 2** recorded 1000 votes in favor of this proposal immediately upon creating it.

Any of the DAO's participants can view outstanding proposals by running the `list_proposals` command for their wallet. Let's say **DAO participant 1** wants to see which proposals are outstanding:

```bash
chia dao list_proposals -i 2
```

This command will return a summary of all proposals:

```bash
############################
Proposal ID: 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22
Status: OPEN
Votes for: 1000
Votes against: 0
------------------------
Proposals have 2 blocks of soft close time.
############################
```

**DAO participant 1** can now show the details of the open proposal:

```bash
chia dao show_proposal -i 2 -p 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22
```

Response:

```bash
Details of Proposal: 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22
---------------------------

Type: SPEND
Status: OPEN
Passed: False
Yes votes needed: 500
Closable: False
Total votes needed: 2000
Blocks remaining: 0

Proposal XCH Conditions
Address: txch1796cqesu4cghd603743hdsp4ffz0tj0tacp63ag2p433fhudkyuq58sw69
Amount: 1000000000000
```

Let's say **DAO participant 1** doesn't like this proposal and wants to vote _against_ it. This can be accomplished by running the `vote` command and adding the `-n` (vote 'no') flag. In this case, **DAO participant 1** allocates all 1000 tokens for a 'no' vote, and includes a blockchain fee:

```bash
chia dao vote -i 2 -n -p 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22 -a 1000 -m 0.0001
```

Response:

```bash
Transaction not yet submitted to nodes. TX ID: 0x8477123fac69e59e2e2f46185e10a4071489a899d9d6f8e992ff71b121cfbf1b
```

After a few minutes, the proposal's status will be updated:

```bash
Details of Proposal: 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22
---------------------------

Type: SPEND
Status: OPEN
Passed: False
Yes votes needed: 500
Closable: False
Total votes needed: 1000
Blocks remaining: 0

Proposal XCH Conditions
Address: txch1796cqesu4cghd603743hdsp4ffz0tj0tacp63ag2p433fhudkyuq58sw69
Amount: 1000000000000
```

The value for `Yes votes needed` has not changed, but `Total votes needed` has dropped from `2000` to `1000`. A quorum of 3000 votes has not been reached, so the proposal has not yet passed. **DAO participant 1** does not have any more voting tokens available to vote against this proposal, so it has not yet failed, either. 

Let's say **DAO participant 1** attempts to add one more 'no' vote:

```bash
chia dao vote -i 2 -n -p 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22 -a 1 -m 0.0001
```

This will result in the following error:

```bash
ValueError: We do not have enough CATs in Voting Mode right now. Please convert some more or try again with permission to convert.
```

The only participant who has not voted is the **DAO creator**. Let's say this person likes the proposal and decides to vote 'yes'. By default, votes are considered 'yes', so no extra flags are needed:

```bash
chia dao vote -i 2 -p 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22 -a 1000 -m 0.0001
```

Response:

```bash
Transaction not yet submitted to nodes. TX ID: 0x0345ff1032a181b4dd2409d44bccc54dff9fa2f07a34169a56f806bcc27fd190
```

After the transaction has been confirmed, the DAO's status is as follows:

```bash
Details of Proposal: 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22
---------------------------

Type: SPEND
Status: OPEN
Passed: True
Closable: True

Proposal XCH Conditions
Address: txch1796cqesu4cghd603743hdsp4ffz0tj0tacp63ag2p433fhudkyuq58sw69
Amount: 1000000000000
```

At this point, 3000 votes have been cast: 2000 in favor and 1000 against. The DAO's "soft close" blocks have elapsed, so this proposal passes and can now be closed.

### Close a proposal

Prior to closing the proposal, let's check in on the DAO's treasury:

```bash
chia dao balance -i 2
```

Response:

```bash
XCH: 5.0
```

Meanwhile, the **DAO payout wallet** is empty:

```bash
Chia Wallet:
   -Total Balance:         0.0 txch (0 mojo)
   -Pending Total Balance: 0.0 txch (0 mojo)
   -Spendable:             0.0 txch (0 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

Any of a DAO's participants can close a proposal after it has passed or failed. In this case, the **DAO creator** will close the proposal:

```bash
chia dao close_proposal -i 2 -p 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22 -m 0.0001
```

Response:

```bash
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 3110252292 -tx 0xcd20636990287148e1113c33542650f3700f24f806c822660283317dda39a756' to get status
```

After a few minutes, you can run the `show_proposal` command to verify that it has been closed:

```bash
chia dao show_proposal -i 2 -p 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22
```

Response:

```bash
Details of Proposal: 0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22
---------------------------

Type: SPEND
Status: CLOSED
Passed: True

Proposal XCH Conditions
Address: txch1796cqesu4cghd603743hdsp4ffz0tj0tacp63ag2p433fhudkyuq58sw69
Amount: 1000000000000
```

After the proposal has been closed, the treasury's balance will be updated:

```bash
chia dao balance -i 2
```

Response:

```bash
XCH: 4.000001
```

The balance of the payout address has also been updated:

```bash
Chia Wallet:
   -Total Balance:         1.0 txch (1000000000000 mojo)
   -Pending Total Balance: 1.0 txch (1000000000000 mojo)
   -Spendable:             1.0 txch (1000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

### Mint new CATs

Let's say **DAO participant 1** wants to mint new CATs for voting. Here is the current status of the wallet:

```bash
chia wallet show
```

Response:

```bash
Chia Wallet:
   -Total Balance:         1.99999 txch (1999990000000 mojo)
   -Pending Total Balance: 1.99999 txch (1999990000000 mojo)
   -Spendable:             1.99999 txch (1999990000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Tutorial DAO:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DAO
   -Treasury ID:           d14dddb8730b1621e23517d3c1f3ca97cb8d7c835f178e89d6ae85df072efbb5
   -Wallet ID:             2

CAT e8829304151a4cdb...:
   -Total Balance:         0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable:             0.0  (0 mojo)
   -Type:                  CAT
   -Asset ID:              e8829304151a4cdb1b1fdb9a0117d0e3249d92c476f1cd9331d7a6166e6b140d
   -Wallet ID:             3

CAT e8829304151a4cdb...:
   -Total Balance:         1000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              e8829304151a4cdb1b1fdb9a0117d0e3249d92c476f1cd9331d7a6166e6b140d
   -Wallet ID:             4
```

**DAO participant 1** can then propose to send 1 CAT to an address they control, and add 1000 initial votes. 

:::warning

The votes need to be minted from the treasury's funds, so your DAO will need to have sufficient funds to perform the minting. In this case, the treasury's minimum requirement is 1000 mojos.

:::

As a reminder, the `-a` flag specifies the amount in mojos, so `-a 1000` will mint one CAT:

```bash
chia dao create_proposal mint -i 2 -a 1000 -t txch12gftgd4ep7vlgmtgvk87htxp0k8rrl9jqrpfxm433k8meuv656pqljx82k -v 1000 -m 0.00001
```

Response:

```bash
Successfully created proposal.
Proposal ID: 0x66fbce0ae62a7653d9769d19a9b0f56505df01e94fd431968be94d523b621c85
```

Show the new proposal:

```bash
chia dao show_proposal -i 2 -p 0x66fbce0ae62a7653d9769d19a9b0f56505df01e94fd431968be94d523b621c85
```

Response:

```bash
Details of Proposal: 0x66fbce0ae62a7653d9769d19a9b0f56505df01e94fd431968be94d523b621c85
---------------------------

Type: MINT
Status: OPEN
Passed: False
Yes votes needed: 500
Closable: False
Total votes needed: 2000
Blocks remaining: 0

Amount of CAT to mint: 1000
Address: txch12gftgd4ep7vlgmtgvk87htxp0k8rrl9jqrpfxm433k8meuv656pqljx82k
```

Let's say the **DAO creator** is OK with this proposal, and decides to add 2000 votes in favor:

```bash
chia dao vote -i 2 -p 0x66fbce0ae62a7653d9769d19a9b0f56505df01e94fd431968be94d523b621c85 -a 2000 -m 0.0001
```

Response:

```bash
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 3110252292 -tx 0x2452541e2109e4182a212d424872a6261d6e971414f80b4e29548976548b984c' to get status
```

After the votes have been counted, and the soft close timelock has expired, the proposal becomes closeable:

```bash
chia dao show_proposal -i 2 -p 0x66fbce0ae62a7653d9769d19a9b0f56505df01e94fd431968be94d523b621c85
```

Response:

```bash
Details of Proposal: 0x66fbce0ae62a7653d9769d19a9b0f56505df01e94fd431968be94d523b621c85
---------------------------

Type: MINT
Status: OPEN
Passed: True
Closable: True

Amount of CAT to mint: 1000
Address: txch12gftgd4ep7vlgmtgvk87htxp0k8rrl9jqrpfxm433k8meuv656pqljx82k
```

Any DAO member can close the proposal. Let's say **DAO participant 1** does so:

```bash
chia dao close_proposal -i 2 -p 0x66fbce0ae62a7653d9769d19a9b0f56505df01e94fd431968be94d523b621c85 -m 0.0001
```

Response:

```bash
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 3110252292 -tx 0x608c9dccd5f90595b9b0579842ed6633c7bfdcb38688f37b9465443943b252d2' to get status
```

**DAO participant 1** now has 1000 extra CAT mojos (1 extra CAT, which can be used for 1000 votes):

```bash
CAT e8829304151a4cdb...:
   -Total Balance:         1.0  (1000 mojo)
   -Pending Total Balance: 1.0  (1000 mojo)
   -Spendable:             1.0  (1000 mojo)
   -Type:                  CAT
   -Asset ID:              e8829304151a4cdb1b1fdb9a0117d0e3249d92c476f1cd9331d7a6166e6b140d
   -Wallet ID:             3

CAT e8829304151a4cdb...:
   -Total Balance:         1000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              e8829304151a4cdb1b1fdb9a0117d0e3249d92c476f1cd9331d7a6166e6b140d
   -Wallet ID:             4
```

### Change a DAO's rules

A proposal can also be created to change the rules themselves. Let's say a DAO has the following rules:

```bash
attendance_required: 3000
oracle_spend_delay: 2
pass_percentage: 5000
proposal_minimum_amount: 1000001
proposal_timelock: 3
self_destruct_length: 1
soft_close_length: 2
```

The **DAO creator** wants to increase the `pass_percentage` to `7500`, thereby requiring 75% of votes to be "yes" for a proposal to pass.

Here is the command to make this update, along with adding 2000 "yes" votes:

```bash
chia dao create_proposal update -i 2 --pass-percentage 7500 -v 2000 -m 0.0001
```

Response:

```bash
Successfully created proposal.
Proposal ID: 0x018421004429b253aef317f6af9c222f179fa7931e3a339572025ce6f4c35626
```

The proposal will contain the new rules upon passing:

```bash
chia dao show_proposal -i 2 -p 0x018421004429b253aef317f6af9c222f179fa7931e3a339572025ce6f4c35626
```

Response:

```bash
Details of Proposal: 0x018421004429b253aef317f6af9c222f179fa7931e3a339572025ce6f4c35626
---------------------------

Type: UPDATE
Status: OPEN
Passed: True
Closable: False
Total votes needed: 1000
Blocks remaining: 0

Proposed Rules:
attendance_required: 3000
oracle_spend_delay: 2
pass_percentage: 7500
proposal_minimum_amount: 1000001
proposal_timelock: 3
self_destruct_length: 1
soft_close_length: 2
```

**DAO participant 1** decides to add 1000 votes to the proposal:

```bash
chia dao vote -i 2 -p 0x018421004429b253aef317f6af9c222f179fa7931e3a339572025ce6f4c35626 -a 1000 -m 0.0001
```

Response:

```bash
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 3195618875 -tx 0xa8bceb23a457bac82fb5c62ee30f2d923cbccd43d62016a55da84f14df88299d' to get status
```

At this point, the proposal has passed and can be closed:

```bash
chia dao show_proposal -i 2 -p 0x018421004429b253aef317f6af9c222f179fa7931e3a339572025ce6f4c35626
```

Response:

```bash
Details of Proposal: 0x018421004429b253aef317f6af9c222f179fa7931e3a339572025ce6f4c35626
---------------------------

Type: UPDATE
Status: OPEN
Passed: True
Closable: True

Proposed Rules:
attendance_required: 3000
oracle_spend_delay: 2
pass_percentage: 7500
proposal_minimum_amount: 1000001
proposal_timelock: 3
self_destruct_length: 1
soft_close_length: 2
```

```bash
chia dao close_proposal -i 2 -p 0x018421004429b253aef317f6af9c222f179fa7931e3a339572025ce6f4c35626 -m 0.0001
```

Response:

```bash
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 3195618875 -tx 0xf90dc4b36dc7e486251ba13d42fbec17b0a4e757cd435e3a31bb1a3086c71e4a' to get status
```

After the proposal has been closed, the rules will be updated:

```bash
chia dao rules -i 2
```

Response:

```bash
attendance_required: 3000
oracle_spend_delay: 2
pass_percentage: 7500
proposal_minimum_amount: 1000001
proposal_timelock: 3
self_destruct_length: 1
soft_close_length: 2
```

### Failed proposal example

Beware that DAO members can make nefarious proposals. They can even attempt to drain a DAO's treasury. However, if a DAO is sufficiently decentralized, this should not be possible from a single member. Let's look at an example where a member attempts to take over a DAO:

As a reminder, **DAO participant 2** has a balance of 1 `CAT` and 1000 `DAO_CAT` for voting:

```bash
CAT 52d38b7cc156c8a7...:
   -Total Balance:         1.0  (1000 mojo)
   -Pending Total Balance: 1.0  (1000 mojo)
   -Spendable:             1.0  (1000 mojo)
   -Type:                  CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             3

CAT 52d38b7cc156c8a7...:
   -Total Balance:         1000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              52d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089
   -Wallet ID:             4
```

To mint new CATs, any DAO member can create a `mint` proposal. In this example, **DAO participant 2** will create a proposal to mint 2000 CATs, and will immediately use all 1000 votes to vote in favor of the proposal. The recipient's address (the `-t` flag) belongs to **DAO participant 2** in this case:

```bash
chia dao create_proposal mint -i 2 -a 2000 -t txch17lg990qxhqg65q4vn8ad50whw2rz9pfmn0qw76pmw4cezm20qmeq47phde -v 1000 -m 0.00001
```

Response:

```bash
Successfully created proposal.
Proposal ID: 0x1348c3b4c480e2a952825da5417b8667bdb0deaf38478956d38d325df736a606
```

The details of the proposal are as follows:

```bash
chia dao show_proposal -i 2 -p 0x1348c3b4c480e2a952825da5417b8667bdb0deaf38478956d38d325df736a606
```

Response:

```bash
Details of Proposal: 0x1348c3b4c480e2a952825da5417b8667bdb0deaf38478956d38d325df736a606
---------------------------

Type: MINT
Status: OPEN
Passed: False
Yes votes needed: 500
Closable: False
Total votes needed: 2000
Blocks remaining: 0

Amount of CAT to mint: 2000
Address: txch17lg990qxhqg65q4vn8ad50whw2rz9pfmn0qw76pmw4cezm20qmeq47phde
```

In this case, there are 1000 `Yes` votes so far. With another 2000 votes, a quorum will have been reached. Only 500 of those new votes need to be `Yes` in order for the proposal to pass.

This scenario should give anyone in this DAO pause. By minting 2000 new `DAO_CAT`s, **DAO participant 2** would then have 3000 votes, which would amount to a successful hostile takeover of the DAO, and potentially of its treasury.

Next, let's say the **DAO creator** notices this and decides to vote against the proposal. For now, the **DAO creator** has 1 CAT that not been locked up for voting:

```bash
CAT e8829304151a4cdb...:
   -Total Balance:         1.0  (1000 mojo)
   -Pending Total Balance: 1.0  (1000 mojo)
   -Spendable:             1.0  (1000 mojo)
   -Type:                  CAT
   -Asset ID:              e8829304151a4cdb1b1fdb9a0117d0e3249d92c476f1cd9331d7a6166e6b140d
   -Wallet ID:             3

CAT e8829304151a4cdb...:
   -Total Balance:         1000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              e8829304151a4cdb1b1fdb9a0117d0e3249d92c476f1cd9331d7a6166e6b140d
   -Wallet ID:             4
```

The **DAO creator** locks up this CAT:

```bash
chia dao lockup_coins -i 2 -a 1 -m 0.00001
```

After the transaction has completed, the **DAO creator** has 2000 votes:

```bash
CAT e8829304151a4cdb...:
   -Total Balance:         0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable:             0.0  (0 mojo)
   -Type:                  CAT
   -Asset ID:              e8829304151a4cdb1b1fdb9a0117d0e3249d92c476f1cd9331d7a6166e6b140d
   -Wallet ID:             3

CAT e8829304151a4cdb...:
   -Total Balance:         2000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              e8829304151a4cdb1b1fdb9a0117d0e3249d92c476f1cd9331d7a6166e6b140d
   -Wallet ID:             4
```

The **DAO creator** now votes against the proposal (the `-n` flag indicates a "no" vote):

```bash
 chia dao vote -i 2 -n -p 0x1348c3b4c480e2a952825da5417b8667bdb0deaf38478956d38d325df736a606 -a 2000 -m 0.0001
```

After these votes have been counted, and after the soft close period has ended, the proposal's status will show that it has failed:

```bash
chia dao show_proposal -i 2 -p 0x1348c3b4c480e2a952825da5417b8667bdb0deaf38478956d38d325df736a606
```

Response:

```bash
Details of Proposal: 0x1348c3b4c480e2a952825da5417b8667bdb0deaf38478956d38d325df736a606
---------------------------

Type: MINT
Status: OPEN
Passed: False
Yes votes needed: 500
Closable: True

Amount of CAT to mint: 2000
Address: txch17lg990qxhqg65q4vn8ad50whw2rz9pfmn0qw76pmw4cezm20qmeq47phde
```

The **DAO creator** can now close the proposal:

```bash
chia dao close_proposal -i 2 -p 0x1348c3b4c480e2a952825da5417b8667bdb0deaf38478956d38d325df736a606 -m 0.0001
```

The status will then be updated:

```bash
Details of Proposal: 0x1348c3b4c480e2a952825da5417b8667bdb0deaf38478956d38d325df736a606
---------------------------

Type: MINT
Status: CLOSED
Passed: False
Yes votes needed: 500

Amount of CAT to mint: 2000
Address: txch17lg990qxhqg65q4vn8ad50whw2rz9pfmn0qw76pmw4cezm20qmeq47phde
```

The hostile takeover has been averted in this case.
