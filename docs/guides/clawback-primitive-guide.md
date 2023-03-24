---
slug: /guides/clawback-primitive-guide
title: Clawback Primitive Guide
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

[notes
synced full node and synced wallet are both required

]


## Intro

This document will show you how to use Chia's clawback primitive. Clawback currently is implemented as a command-line tool. Wallet developers are welcome to integrate it into their GUI wallets. For additional technical resources, see the following:

- [Clawback CLI Reference](/clawback_cli)
- [Youtube video explaining clawback](https://www.youtube.com/watch?v=_pC38ulU2js)

:::note

A synced full node AND a synced wallet are required to use the clawback primitive. You are recommended to test the clawback primitive on either the testnet or a simulator before moving to mainnet. For your reference, this guide will use testnet10.

:::

---

### About clawback

The clawback primitive was designed to guard against sending Chia assets to an incorrect address. The principal behind claback is simple: it is an intermediate coin that cannot be sent to the destination address until a timelock has expired.

An Alice/Bob will demonstrate this:
- Alice wants to send 1 XCH to Bob, and she wants to verify that Bob's correct address was used in the transaction
- Alice creates a clawback coin with the following features:
  - It exists on Chia's blockchain
  - It is viewable by Alice's and Bob's wallets, as well as by block explorers
  - It is worth 1 XCH, which has been funded with Alice's wallet
  - It has a 1-hour timelock
  - It contains Alice's address as its clawback destination
  - It contains Bob's address as its final destination
- The clawback coin therefore contains the following logic for how it may be spent:
  - Before 1 hour has elapsed since the coin's creation, Alice can use [p2_1_of_n](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/puzzles/p2_m_of_n_delegate_direct.clvm) to spend the coin using the same public/private key pair that created the coin. When the coin is spent in this way, a new coin is created using [p2_puzzle_hash](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/puzzles/p2_puzzle_hash.clvm). Typically, this coin will be created in Alice's wallet, but it could be created in another wallet instead. The new coin uses the standard Chia puzzle. This is the `clawback` case.
  - Before 1 hour has elapsed since the coin's creation, nobody other than Alice may spend it
  - After 1 hour, the timelock elapses. At this point Bob can spend the clawback coin. When this spend occurs, by default a new coin is created in Bob's wallet. Bob can also pass in a different address than the one he originally specified if he so chooses. The new coin uses the standard Chia puzzle and shows up in Bob's XCH balance. The new coin _must_ be created in Bob's wallet; this is because Bob's address was built into the coin when Alice created it.
  - Note that the coin's clawback logic is in place for the life of the coin. This means that until the coin is spent, Alice is able to claw it back. This is true regardless of the coin's age. Because of this, after the timelock expires, someone must spend the clawback coin in order for Bob to receive it. After this spend has completed, the clawback coin no longer exists, and the spend is final.

This guide will show you how to perform the logic outlined above:
- Create a clawback coin
- Claw back the coin
- Complete the spend

We'll start by showing you how to install the clawback primitive. This guide assumes you are running a Chia node and wallet, using mainnet, the testnet, or a simulator.

---

### Install the clawback primitive

The clawback primitive is included in the `Chia-Network` organization's `chia-clawback-primitive` GitHub repository.

1. Open a new terminal window and run the following command to clone the `chia-dev-tools` repository, using the `main` branch:

   ```bash
   git clone https://github.com/Chia-Network/chia-clawback-primitive.git -b main
   ```

2. Change to the cloned repository:

   ```bash
   cd chia-clawback-primitive
   ```

3. Create and activate a virtual environment:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   python3 -m venv venv
   . ./venv/bin/activate
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   python3 -m venv venv
   . ./venv/bin/activate
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

4. Install the clawback primitive:

```bash
pip install .[dev]
```

Several packages will be installed, including a bundled copy of `chia-blockchain`. This process will typically take several minutes.

5. The clawback primitive should now be installed and configured properly. To test it, run:

```bash
clawback --version
```

You should be shown the current version of the clawback primitive. For example:

```bash
clawback, version 0.1.dev12
```

---

### Create a clawback coin

For this demo, we will use two wallets: a Sender and a Recipient. The Sender has a balance of 10 TXCH and the Recipient has 0 TXCH.

For your reference, here is the Sender wallet's info:

```bash
chia wallet show -f 3807629793
```

Result:

```bash
Wallet height: 2391281
Sync status: Synced
Balances, fingerprint: 3807629793

Chia Wallet:
   -Total Balance:         8.0 txch (8000000000000 mojo)
   -Pending Total Balance: 8.0 txch (8000000000000 mojo)
   -Spendable:             8.0 txch (8000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

To create the clawback coin from the Sender's wallet, run the [clawback create](/clawback_cli#create) command. The `-t` (Recipient's address) and `-a` (amount in mojos) flags are required. By default, the clawback coin will be locked for two-weeks. For this demo, we will specify 600 seconds using the `-t` flag. Finally, we will use the `-d` flag to include a fee of 275 million mojos.

```bash
clawback create -t txch1vnffpr9k8zm34kvt4jcdhvcjxgczg2a2g7mw52cfglgdp29yzckqkhktuy0 -a 1000000000000 -f 3807629793 -t 600 -d 275000000
```

Result:

```bash

```

As a result of running this command, a new clawback coin has been recorded, the details of which are shown above. To view this coin, along with other clawback coins created by this wallet run the [clawback show](/clawback_cli#show) command:

```bash
clawback show
```

The basic details of the clawback coin are given:

```bash

```

### Claw back a coin

This guide will continue from the previous section, where we created a new clawback coin, which has not yet been spent. As a reminder, these are the clawback coin's details:

```bash
clawback show
```

Result:

```bash

```

To claw back the coin, the same public/private key pair must be used. This step will use the [clawback claw](/clawback_cli#claw) command, passing in the ID of the coin to claw back:

```bash
clawback claw -c 
```

As a result, the clawback coin will be spent:

```bash

```

To show the status of the clawback, run the `clawback show` command once again:

```bash
clawback show
```

Result:

```bash

```

After the clawback transaction has completed, the Sender wallet's balance has increased (minus transaction fees):

```bash
chia wallet show -f 3807629793
```

Result:

```bash

```

### Claim a clawback coin

In this section, we'll show how to complete the clawback spend. First, the Sender creates a new clawback coin:

```bash
clawback create -t txch1vnffpr9k8zm34kvt4jcdhvcjxgczg2a2g7mw52cfglgdp29yzckqkhktuy0 -a 1000000000000 -f 3807629793 -t 600 -d 275000000
```

Result:

```bash

```

As a reference, show the clawback coin's details:

```bash
clawback show
```

Result:

```bash

```

The timelock expires when the `Time left:` value reaches `0 seconds`:

```bash
clawback show
```

Result:

```bash

```

The Recipient can also view the status of the clawback coin by running `clawback show`, passing in the clawback coin's ID:

```bash
clawback show -c
```

At this point, the Recipient can run the [clawback claim](/clawback_cli#claim) command to complete the transaction:

```bash
clawback claim -c
```

Result:

```bash

```

Finally, the Recipient can view the additional balance in their wallet:

```bash

```

Result:

```bash

```

The spend is now complete and can no longer be clawed back.

---

### Other cases

So far, we have shown the standard clawback and completion spends. There are also a few edge cases and errors worth discussing.

#### Sender performs a clawback after the timelock

After the timelock expires, the Recipient may complete the spend. Until this is done, the Sender can still claw back the coin. For example, let's say a clawback coin exists, and `Time left:` is `0 seconds`:

```bash
clawback show
```

Result:

```bash

```

The Sender can still claw back this coin:

```bash
clawback claw -c 
```

Result:

```bash

```

#### Recipient attempts to complete spend before timelock has expired

Before the timelock expires, a clawback coin may not be spend to its Recipient's address. For example, let's say the following clawback coin exists. Note that its `Time left:` is still greater than 0 seconds:

```bash
clawback show
```

Result:

```bash

```

At this point, if the Recipient attempts to complete the spend, it will not succeed:

```bash
clawback claim -c
```

Result:

```bash

```

#### Someone other than the Sender attempts to claw back a coin

Let's say the following clawback coin exists:

```bash
clawback show -c
```

Result:

```bash

```

If someone other than the Sender attempts to claw it back, the spend will fail:

```bash
clawback claw -c 
```

Result:

```bash

```

#### Someone other than the Recipient attempts to complete a clawback spend

Let's say the following clawback coin exists:

```bash
clawback show -c
```

Result:

```bash

```

Only the Recipient may attempt to complete a clawback spend. If another wallet attempts this, the spend will fail:

```bash
clawback claim -c
```

Result:

```bash

```

#### Sender claws back coin to a new wallet

The Sender has the option of performing a clawback where the coin is sent to any wallet. Let's say the following clawback coin exists:

```bash
clawback show -c
```

Result:

```bash

```

The Sender can send a new coin to a different wallet address. One use case for this is if the Sender thinks their original wallet has been compromised (because this is not a multisig spend, a theif could do the same thing as the honest party):

```bash
clawback claw -c 
```

Result:

```bash

```

#### Reciever claims a clawback coin in a new wallet address

The Recipient also has the option of spending a clawback coin to a new address. [todo how do we know this is the Recipient?]

Let's say the following clawback coin exists:

```bash
clawback show -c
```

Result:

```bash

```

The Recipient can pass in a new address when claiming the coin:

```bash
clawback claim -c
```

Result:

```bash

```