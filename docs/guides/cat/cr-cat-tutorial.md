---
slug: /guides/cr-CAT-tutorial
title: CR-CAT Creation Tutorial
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Intro

Credential Restricted Chia Asset Tokens (CR-CATs) are CATs whose ownership is restricted to people or other entities who possess a required set of Verifiable Credentials (VCs). This guide will show you how to mint CR-CATs, as well as how to distribute them accordingly.

For additional resources, see the following:

- [CHIP-19](https://github.com/Chia-Network/chips/pull/68) -- Restricted CAT Standard
- [CAT admin](/cat-admin-cli) -- CLI documentation for the CAT admin tool
- [VC guide](/guides/verifiable-credentials-guide) -- VCs are required in order to use CR-CATs
- [CAT standard](https://chialisp.com/cats) -- Good to read if you are unfamiliar with Chia Asset Tokens

:::warning

The commands in this guide are only examples. Be sure to replace the listed values with values from your local system.

This guide was creating using testnet10. The example commands use a fee of 100 million mojos, which will be rather high for mainnet usage. If running on mainnet, be sure to adjust your fees accordingly.

:::

## Definitions

* **Decentralized Identifier (DID)** -- An identifier that enables verifiable, decentralized digital identity
* **Verifiable Credential (VC)** -- Allows someone or something to prove that a subject belongs to a certain category or categories, such as being a US citizen. One type of VC is issued by a Know Your Customer (KYC) provider, who must perform this verification.
* **Chia Asset Tokens (CATs)** -- Fungible tokens on the Chia blockchain

## Setup

### Prerequisites

In order to mint CR-CATs, you will need to have:
* A synced Chia wallet, running version 2.0 or later (a full node is _not_ required)
* At least one DID to be used as a trusted provider
* A sufficient amount of XCH or TXCH for the minting. As a reminder, each CAT consists of 1000 mojos. If you want to mint 1 billion CATs, you will need 1 trillion mojos (1 XCH) for the minting.
* Sufficient funds to cover blockchain fees, the amount of which depends on how busy the blockchain is at any moment

We have faucets available if you don't have sufficient funds to get started:
* [testnet](https://testnet10-faucet.chia.net/)
* [mainnet](https://faucet.chia.net/)

:::warning important

It is possible to brick* funds by sending them to an address without the appropriate credentials, as will be demonstrated later in this guide. You are therefore recommended to test minting CR-CATs on the testnet or on a simulator prior to minting them on mainnet. If you are unsure of how to configure your wallet to use the testnet, see our [guide](https://docs.chia.net/guides/chialisp-testnet-setup).

\* Technically, the funds will remain recoverable, but this process will not be easy.
:::

### DID and VC Setup

CR-CATs require at least one authorized provider that can issue VCs that are allowed to trade the CATs. This tutorial will use a DID as the authorized provider.

:::info

DIDs are currently the _only_ type of authorized provider, though others might be added in the future.

:::

Please see our [Verifiable Credentials Guide](/guides/verifiable-credentials-guide) for help on setting up a DID, as well as a VC with appropriate proofs.

For this tutorial, we will use the same proof structure that was used in the Verifiable Credentials Guide, so if you have followed it, you will be mostly ready to follow this tutorial as well.

We will use three separate Chia wallets, which have been created beforehand using the Verifiable Credentials Guide:

#### Authorized Provider Wallet

  * Owns one DID -- `did:chia:1w4gf5eyensd37xa0x7aj27fe4cr9tqmf46m272suve5n4q2draesd0t54c`
  * Used this DID to mint a VC with launcher ID `9b6c65bd82ebe139ad5785ffdf99f6fe8ccbedb62a7ba2560989ef4e8a00ec86`
    * Added two proofs: `test_proof1` and `test_proof2`
    * "Transferred" this VC to the same wallet
  * Minted another VC with the same proofs and transferred it to the VC Holder Wallet (see next section)
  * This wallet will issue the CR-CATs and send some of them to the VC Holder

  The CLI view of the Authorized Provider's wallet is as follows:

  ```bash
  Balances, fingerprint: 3152280463

  Chia Wallet:
     -Total Balance:         0.999499999997 txch (999499999997 mojo)
     -Pending Total Balance: 0.999499999997 txch (999499999997 mojo)
     -Spendable:             0.999499999997 txch (999499999997 mojo)
     -Type:                  STANDARD_WALLET
     -Wallet ID:             1

  Profile 1:
     -Total Balance:         1.0
     -Pending Total Balance: 1.0
     -Spendable:             1.0
     -Type:                  DECENTRALIZED_ID
     -DID ID:                did:chia:1w4gf5eyensd37xa0x7aj27fe4cr9tqmf46m272suve5n4q2draesd0t54c
     -Wallet ID:             2

  NFT Wallet:
     -Total Balance:         0.0
     -Pending Total Balance: 0.0
     -Spendable:             0.0
     -Type:                  NFT
     -DID ID:                did:chia:1w4gf5eyensd37xa0x7aj27fe4cr9tqmf46m272suve5n4q2draesd0t54c
     -Wallet ID:             3

  VCWallet:
     -Total Balance:         0.0
     -Pending Total Balance: 0.0
     -Spendable:             0.0
     -Type:                  VC
     -Wallet ID:             4
  ```

  The CLI view of the Authorized Provider's VC is as follows:

  ```bash
  Proofs:
    - f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
      - test_proof1
      - test_proof2

  Launcher ID: 9b6c65bd82ebe139ad5785ffdf99f6fe8ccbedb62a7ba2560989ef4e8a00ec86
  Coin ID: 1d24b1eb6909fcded260c7a6da092fc3d95156c217e6f7944ee3a75473730737
  Inner Address: txch1jl9wvatyyy6lwt7eswa9ax7sydzr80tww6npfupd5jj95le3p4ssvcped6
  Proof Hash: f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
  ```

  The VC is also viewable from the GUI:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/01_cr-cat.png" alt="Authorized provider VC" />
  </div>
  <br />

#### VC Holder Wallet

  * Holds a VC with launcher ID `5b5389e77b7ec8e9ebd7d92136254418ca674e382031d29aaa6ab75b7822792b` and two proofs: `test_proof1` and `test_proof2`. This VC was provided by the Authorized Provider wallet.
  * Does not own a DID
  * This wallet will receive some CR-CATs from the Authorized Provider

  The CLI view of the VC Holder's wallet is as follows:

  ```bash
  Balances, fingerprint: 455644407

  Chia Wallet:
     -Total Balance:         0.5 txch (500000000000 mojo)
     -Pending Total Balance: 0.5 txch (500000000000 mojo)
     -Spendable:             0.5 txch (500000000000 mojo)
     -Type:                  STANDARD_WALLET
     -Wallet ID:             1

  VCWallet:
     -Total Balance:         0.0
     -Pending Total Balance: 0.0
     -Spendable:             0.0
     -Type:                  VC
     -Wallet ID:             2
  ```

  The CLI view of the VC Holder's VC is as follows:

  ```bash
  Proofs:
    - f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
      - test_proof1
      - test_proof2

  Launcher ID: 5b5389e77b7ec8e9ebd7d92136254418ca674e382031d29aaa6ab75b7822792b
  Coin ID: 87781377b81b54c56df4e1fc3558757065409fe65ecab16de89f8d07f7a7cecb
  Inner Address: txch1hsyj53wz3wzznxdd0kupk075yj2muew8q49yj83yh5tde92x0uxst6ztpg
  Proof Hash: f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
  ``` 

  The VC is also viewable from the GUI:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/02_cr-cat.png" alt="Holder VC" />
  </div>
  <br />

#### XCH Wallet

  * Does not hold any DIDs or VCs
  * This wallet will demonstrate that CR-CATs can only be held by wallets that hold a required set of VCs

  The CLI view of the XCH wallet is as follows:

  ```bash
  Balances, fingerprint: 2811450244

  Chia Wallet:
     -Total Balance:         0.5 txch (500000000000 mojo)
     -Pending Total Balance: 0.5 txch (500000000000 mojo)
     -Spendable:             0.5 txch (500000000000 mojo)
     -Type:                  STANDARD_WALLET
     -Wallet ID:             1
  ```

### CAT Admin Tool

CR-CATS are issued from the CAT-admin-tool repository. Follow the instructions below to install it for your specific OS:

<Tabs groupId='os'>
<TabItem value="mac" label="Linux/macOS">

Clone the repository:
```bash
git clone https://github.com/Chia-Network/CAT-admin-tool.git -b main --recurse-submodules
```

Change to the CAT-admin-tool directory:

```bash
cd CAT-admin-tool
```

Create a virtual environment:

```bash
python3 -m venv venv
```

Activate the virtual environment:

```bash
. ./venv/bin/activate
```

Install all prerequisites:

```bash
python3 -m pip install --upgrade pip setuptools wheel
```

Install the CAT admin tool:

```bash
pip install .
```

</TabItem>

<TabItem value="windows" label="Windows">

Clone the repository:
```bash
git clone https://github.com/Chia-Network/CAT-admin-tool.git -b main --recurse-submodules
```

Change to the CAT-admin-tool directory:

```bash
cd CAT-admin-tool
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment:

```bash
.\venv\Scripts\Activate.ps1
```

Install all prerequisites:

```bash
python -m pip install --upgrade pip setuptools wheel
```

Install the CAT admin tool:

```bash
pip install .
```

</TabItem>

</Tabs>
    
Your environment should be all set, but let's make sure:

- Run `cats --help`. You should get a usage statement.

- Run `cdv --help`. You should get another usage statement.

The CAT admin tool also comes bundled with a version of Chia. If your wallet is not currently running, be sure to start it now:

```bash
chia start wallet
```

Note that while a full node is not required, it is recommended, as it will make the the process of minting CR-CATs faster and more efficient.

```bash
chia start node
```

If you are running a full node, verify that it is synced by running this command:

```bash
chia show -s
```

For a comprehensive list of all options available with the CAT admin tool, as well as examples of how to use them, see the [CLI reference](/cat-admin-cli).

### Automatic CATs

Before continuing, it is a good idea to verify that new CATs will automatically be added to your wallet. The setting for this is located in `~/.chia/mainnet/config/config.yaml`. (Note that this file is in a `mainnet` folder regardless of whether you are running on a testnet or mainnet.)

Edit this file and search for `automatically_add_unknown_cats`. You are recommended to set this option's value to `true`. Be sure to restart your wallet if you modify this option, so your new CR-CATs will automatically be added to your wallet.

If you prefer not to use this option, you can also manually add new CATs with the [add_token](/wallet-cli#add_token) command.

### Setup summary

At this point, in order to follow this tutorial you should have:
* An instance of the cat-admin-tool repository installed locally
  * Verifiable by running `cats --help` and `cdv --help` (you should see a usage statement)
* An Authorized Provider's wallet, which holds:
  * A DID
  * A VC
  * Some XCH or TXCH
* A VC Holder's wallet, which holds:
  * A VC
  * Some XCH or TXCH
* (If you want to test a failure case) A wallet that only holds some XCH or TXCH
* (recommended) A synced full node
* (recommended) Set `automatically_add_unknown_cats: true` in `config.yaml`

With all of these setup steps complete, you are ready to mint CR-CATs!

## Mint CR-CATs

The process for minting Restricted CATs is nearly identical to the process for minting standard CATs. In both cases, any TAIL may be used. This tutorial will only demonstrate how to use a single-issuance TAIL. If you are interested in using other TAILs, or if you would like a more comprehensive list of instructions, see the [CAT creation tutorial](/guides/cat-creation-tutorial).

For starters, you will need to obtain an address to send the CR-CATs to after they have been minted. From the Authorized Provider's wallet run the following command:

```bash
chia wallet get_address --new-address
```

The response will be an address, for example:

```bash
txch1yx4tdtqksjh7mk84deglwyq4j8td8jchyc8sdgem2hnuulmhzdhqct9wpr
```

Next, obtain the Authorized Provider's DID ID by showing the wallet:

```bash
chia wallet show
```

Response (truncated):

```bash
...
Profile 1:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:1w4gf5eyensd37xa0x7aj27fe4cr9tqmf46m272suve5n4q2draesd0t54c
   -Wallet ID:             2
...
```

In this example, we will create one thousand CR-CATs. Each CR-CAT will consist of 1000 mojos (same as standard CATs), so this example will require one million mojos, plus a transaction fee, for the issuance.

When minting CR-CATs, you have two options for applying restrictions:
* `-r`/`--proofs-checker` -- Use this option to supply a custom program for checking proofs (not yet supported in the reference wallet).
* `-v`/`--cr-flag` -- Use this option to specify which proof(s) a VC must have in order to approve a transaction from this CR-CAT.

For this example, we will use the `-v` option.

We also need to add the `-sc` flag to select a valid coin to spend. Here is a summary of the options that will be used in this example:

* `-l` -- the TAIL to use
* `-t` -- the address to send the CR-CATs to upon being minted
* `-a` -- the amount, in mojos, to use for the minting
* `-m` -- an optional blockchain fee, in mojos
* `-d` -- the authorized provider (DID) for issuing VCs for these CR-CATs
* `-v` -- the string required in a VC proof for trading these CR-CATs
* `-sc` -- return a valid coin to spend for the minting

And here is the example command:

```bash
cats -l ./reference_tails/genesis_by_coin_id.clsp.hex -t txch1yx4tdtqksjh7mk84deglwyq4j8td8jchyc8sdgem2hnuulmhzdhqct9wpr -a 1000000 -m 100000000 -d did:chia:1w4gf5eyensd37xa0x7aj27fe4cr9tqmf46m272suve5n4q2draesd0t54c -v "test_proof1" -sc
```

The response will list the details of a coin from your wallet. For example:

```bash
{
    "amount": 999499999997,
    "parent_coin_info": "0xd0e21a74601b8bafb6e1c90c61ff74bad40820e3003d25230fc127ce3efc5a48",
    "puzzle_hash": "0x29b1afc3a6caa21a4aaba3a928df4dbbc3e3b9b2b15f89529311ae12d6cec82b"
}
Name: 1d9cb45618bdd9d70a0959ab8d91cafcbc1acbf7bd31a9e5286fd30622796783
```

The value of `Name:` will be used next. If you received an error containing `Can't spend more than wallet balance:`, then you do not have sufficient funds to cover the amount specified in the `-a` and `-m` options.

Next, run the same command again, but replace `-sc` with `-c 0x<coin name>`, or `-c 0x1d9cb45618bdd9d70a0959ab8d91cafcbc1acbf7bd31a9e5286fd30622796783` in this example.

:::warning important

When minting CR-CATs with the commands from this tutorial, you must prepend `0x` to the coin ID in the following command. If you fail to do this, the command will appear to succeed, but it will actually fail. The reasons for not showing an error are twofold:

1. You are technically allowed to curry anything with this command's underlying CLVM puzzle, so omitting the `0x` is valid syntax, even though it won't work in this case.
2. The wallet client asynchronously sends the command to the node, so the wallet client does not know when the command fails.

:::

For example, this command will mint the CR-CATs using the `-c` option:

```bash
cats -l ./reference_tails/genesis_by_coin_id.clsp.hex -t txch1yx4tdtqksjh7mk84deglwyq4j8td8jchyc8sdgem2hnuulmhzdhqct9wpr -a 1000000 -m 100000000 -d did:chia:1w4gf5eyensd37xa0x7aj27fe4cr9tqmf46m272suve5n4q2draesd0t54c -v "test_proof1" -c 0x1d9cb45618bdd9d70a0959ab8d91cafcbc1acbf7bd31a9e5286fd30622796783
```

As a result, a new spend bundle will be created for the minting. You will be prompted whether to submit it to the network:

```bash
The transaction has been created, would you like to push it to the network? (Y/N)
```

Respond with `Y` and you should be shown the `Asset ID` and `Eve Coin ID` for this CR-CAT. For example:

```bash
Successfully pushed the transaction to the network
Asset ID: 3ba9e16dca39f3fb3b75e51535487fcd114abeeb0cf30e8975b9567ce5516fb5
Eve Coin ID: 7afe650fd4dd663d0be027c07228d02546fcc7b91b7819d18d5e1d4055292bf1
```

After the transaction has been confirmed on blockchain (typically within 1-3 minutes), you can view the new CAT with the `chia wallet show` command:

```bash
chia wallet show
```

Response (truncated):
```bash
...
CAT 3ba9e16dca39f3fb...:
   -Total Balance:                      1000.0  (1000000 mojo)
   -Balance Pending VC Approval:        0.0  (0 mojo)
   -Pending Total Balance:              1000.0  (1000000 mojo)
   -Spendable:                          1000.0  (1000000 mojo)
   -Type:                               CRCAT
   -Asset ID:                           3ba9e16dca39f3fb3b75e51535487fcd114abeeb0cf30e8975b9567ce5516fb5
   -Wallet ID:                          5
...
```

Note that `Balance Pending VC Approval` is currently `0.0`. This is because the CR-CATs have been minted to the wallet that contains the issuing DID. Thus, they do not require approval. When these funds are transferred, they will show up as "Pending" in the new wallet.

This information is also viewable in the GUI:

<div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/03_cr-cat.png" alt="CR-CAT issuance" />
  </div>
  <br />

The Authorized Provider now has control of all 1000 of the issued CR-CATs. This type of CAT is distinguished in the GUI by a padlock icon and `Restricted CAT`. The Authorized Provider also possesses a VC with the required proof (`test_proof1`), so a green icon appears when viewing the CAT.

## Send CR-CATs

Now that you have minted the CR-CATs, you can send them elsewhere. First, we'll send some to the VC Holder's wallet, which already has a VC that contains the required proof.

### Sending from the GUI

You can send CR-CATs just as you would with regular CATs:

<div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/04_cr-cat.png" alt="CR-CAT send" />
  </div>
  <br />

You should see a "success" message:

<div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/05_cr-cat.png" alt="CR-CAT send success" />
  </div>
  <br />

In this example, the recipient is the VC Holder's wallet. This wallet holds the credential with the required proof (`test_proof1`) for holding this CR-CAT. Because the proof exists, a green `APPROVE` button will appear. 

From the VC Holder's wallet, click this button to finalize the transaction:

<div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/06_cr-cat.png" alt="VC Holder Approve" />
  </div>
  <br />

An on-chain transaction is required for the approval to be processed. This is necessary to guard against unauthorized wallets holding CR-CATs, as will be demonstrated later in this tutorial. Enter a transaction fee and click `APPROVE PENDING TRANSACTIONS`:

<div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/07_cr-cat.png" alt="Approve pending transactions" />
  </div>
  <br />

After the transaction has been processed, the CR-CATs will become available to the VC Holder, who can now send or trade them just like normal CATs.

<div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/08_cr-cat.png" alt="CR-CAT approved" />
  </div>
  <br />

### Sending from the CLI

As a reminder, in the Authorized Provider's wallet, the `Wallet ID` of the CR-CAT is `5`:

```bash
CAT 3ba9e16dca39f3fb...:
   -Total Balance:                      950.0  (950000 mojo)
   -Balance Pending VC Approval:        0.0  (0 mojo)
   -Pending Total Balance:              950.0  (950000 mojo)
   -Spendable:                          950.0  (950000 mojo)
   -Type:                               CRCAT
   -Asset ID:                           3ba9e16dca39f3fb3b75e51535487fcd114abeeb0cf30e8975b9567ce5516fb5
   -Wallet ID:                          5
```

From the CLI, run a standard `send` command. In this example, we will use the following flags:
  * `-i` -- The `Wallet ID` of the CR-CAT
  * `-a` -- The number of CR-CATs to send
  * `-m` -- An optional transaction free, in XCH/TXCH
  * `-t` -- The address to send the CR-CATs to (the VC Holder's wallet address)

```bash
chia wallet send -i 5 -a 100 -m 0.0001 -t txch1hsyj53wz3wzznxdd0kupk075yj2muew8q49yj83yh5tde92x0uxst6ztpg
```

Response:

```bash
Submitting transaction...
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 3152280463 -tx 0xab577bdce7fdd1be8b4e0634ad69aa5cff66f6d9dc7d26e0119d1a3a740f91e8' to get status
```

After a few minutes, run the command from the previous command's output to view the transaction. For example:

```bash
chia wallet get_transaction -f 3152280463 -tx 0xab577bdce7fdd1be8b4e0634ad69aa5cff66f6d9dc7d26e0119d1a3a740f91e8
```

The response should show that this transaction has been confirmed:

```bash
Transaction ab577bdce7fdd1be8b4e0634ad69aa5cff66f6d9dc7d26e0119d1a3a740f91e8
Status: Confirmed
Amount sent: 100 CAT 3ba9e16dca39f3fb...
To address: txch1yzjq802ym3lv9aupl6nyvv6s24fdm9wpnte2rvhk04arr3jyt4js2287gz
Created at: 2023-09-22 09:21:25
```

**After switching to the VC Holder's wallet**, you should see the CR-CATs that are pending approval (in this case `100.0  (100000 mojo)`):

```bash
chia wallet show
```

Response:

```bash
Balances, fingerprint: 455644407

Chia Wallet:
   -Total Balance:         0.499993999384 txch (499993999384 mojo)
   -Pending Total Balance: 0.499993999384 txch (499993999384 mojo)
   -Spendable:             0.499993999384 txch (499993999384 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

VCWallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  VC
   -Wallet ID:             2

CAT 3ba9e16dca39f3fb...:
   -Total Balance:                      50.0  (50000 mojo)
   -Balance Pending VC Approval:        100.0  (100000 mojo)
   -Pending Total Balance:              50.0  (50000 mojo)
   -Spendable:                          50.0  (50000 mojo)
   -Type:                               CRCAT
   -Asset ID:                           3ba9e16dca39f3fb3b75e51535487fcd114abeeb0cf30e8975b9567ce5516fb5
   -Wallet ID:                          3
```

The VC Holder still needs to approve the new CR-CATs in order to add them to the wallet balance. This is accomplished with the `approve_r_cats` command. In this example, we will use the following flags:

* `-i` -- The `Wallet ID` of the CR-CAT
* `-a` -- The amount to approve
* `-m` -- An optional transaction free, in XCH/TXCH

```bash
chia wallet vcs approve_r_cats -i 3 -a 100 -m 0.0001
```

Response:

```bash
VC successfully approved R-CATs!
Relevant TX records:

Transaction 07ce240c734515fa6609121ac1c52c571a8b191715d26620a2242b124767c95d
Status: Pending
Amount received: 100 CAT 3ba9e16dca39f3fb...
To address: txch16yqa7dsmax5g258yc2qh57xcs0kxxa53fyc4v8jadl8h6jwf7frsx0s7k4
Created at: 2023-09-22 09:30:56

Transaction df859cf5cd348c9531885de978eb083072eff4447748a86463a2d51e3a324298
Status: Pending
Amount sent: 1E-12 TXCH
To address: txch1hsyj53wz3wzznxdd0kupk075yj2muew8q49yj83yh5tde92x0uxst6ztpg
Created at: 2023-09-22 09:30:56

Transaction 41c06dfb0b4e6bd0ed32c8d4942f10e251a0fd9d7b435c6d5672d8571e3bcab7
Status: Pending
Amount sent: 0 TXCH
To address: txch1prssxq8x0s45gzszxpnpwlwpz6p06j5tequtq6ne4fphj7x5yv9qgx493k
Created at: 2023-09-22 09:30:56
```

After this transaction has completed, the new CR-CATs will be available to be spend just like normal CATs:

```bash
CAT 3ba9e16dca39f3fb...:
   -Total Balance:                      150.0  (150000 mojo)
   -Balance Pending VC Approval:        0.0  (0 mojo)
   -Pending Total Balance:              150.0  (150000 mojo)
   -Spendable:                          150.0  (150000 mojo)
   -Type:                               CRCAT
   -Asset ID:                           3ba9e16dca39f3fb3b75e51535487fcd114abeeb0cf30e8975b9567ce5516fb5
   -Wallet ID:                          3
```

## Offer CR-CATs

CR-CATs also work with Chia Offers, using either the GUI or the CLI.

### GUI Offers

In this example, as the **Authorized Provider**, click `CREATE AN OFFER` from the `Offers` panel:

<div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/09_cr-cat.png" alt="Create an Offer" />
  </div>
  <br />

Next, fill out the Offer Builder. For this example, we will offer to trade 99 CR-CATs for 0.1 TXCH: 

<div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/10_cr-cat.png" alt="Offer Builder" />
  </div>
  <br />

After creating the Offer, Authorized Provider can save it as a local file or post it to a marketplace.

For this example, we will change to the **VC Holder** wallet and load the Offer file. This wallet contains a VC with the required proof to hold this CR-CAT (`test_proof1`). Enter an optional blockchain fee and click `ACCEPT OFFER`:

<div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/11_cr-cat.png" alt="Accept Offer" />
  </div>
  <br />

While the on-chain transaction to accept the Offer is pending, the 99 CR-CATs will be displayed in the VC Holder's `Pending Balance`. Note that the `Pending Balance for Approval` is `0` in this case:

<div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/12_cr-cat.png" alt="Pending Offer Acceptance" />
  </div>
  <br />

After the transaction has been confirmed, the balance is updated. When receiving CR-CATs via an Offer, there is no need to perform another transaction to approve of the incoming tokens. This is because the proof requirement is already baked into the Offer file.

<div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/13_cr-cat.png" alt="Completed Offer" />
  </div>
  <br />

At this point, the VC Holder wallet has full possession of the CR-CATs.

### CLI Offers

Offers for CR-CATs can also be created and accepted via the CLI. For this example, the **Authorized Provider** will create an Offer using the following flags:

* `-o` -- The Offer amount, using the syntax `<Wallet ID of asset to offer>`:`<amount to offer>`
* `-r` -- The requested amount, using the syntax `<Wallet ID of asset to request>`:`<amount to request`
* `-p` -- The path to the file name in which to save the Offer

```bash
chia wallet make_offer -o 5:33 -r 1:0.01 -p ~/Downloads/33_CR-CATs_for_0.01_TXCH.offer
```

Confirmation is required:

```bash
Creating Offer
--------------

OFFERING:
  - 33 CAT 3ba9e16dca39f3fb... (33000 mojos)
REQUESTING:
  - 0.01 XCH (10000000000 mojos)
Confirm (y/n):
```

Enter `y` to confirm, and the Offer will be created. For example:

```bash
Created offer with ID 3f525c0ba3ba19a37f8a1708e4eeae8714cd052e78de0217fa728353f1d0f1ad
Use chia wallet get_offers --id 3f525c0ba3ba19a37f8a1708e4eeae8714cd052e78de0217fa728353f1d0f1ad -f 3152280463 to view status
```

In this example, the **VC Holder's wallet** has 249 CR-CATs prior to taking the Offer:

```bash
CAT 3ba9e16dca39f3fb...:
   -Total Balance:                      249.0  (249000 mojo)
   -Balance Pending VC Approval:        0.0  (0 mojo)
   -Pending Total Balance:              249.0  (249000 mojo)
   -Spendable:                          249.0  (249000 mojo)
   -Type:                               CRCAT
   -Asset ID:                           3ba9e16dca39f3fb3b75e51535487fcd114abeeb0cf30e8975b9567ce5516fb5
   -Wallet ID:                          3
```

The VC Holder can examine the Offer by using the `take_offer` command with the `-e` (examine) flag:

```bash
chia wallet take_offer -e ~/Downloads/33_CR-CATs_for_0.01_TXCH.offer
```

Response:

```bash
Summary:
  OFFERED:
    - CAT 3ba9e16dca39f3fb... (Wallet ID: 3): 33.0 (33000 mojos)
  REQUESTED:
    - TXCH (Wallet ID: 1): 0.01 (10000000000 mojos)

Included Fees: 0 TXCH, 0 mojos
```

The Offer looks good, so the VC Holder takes it by removing the `-e` flag and adding a fee with the `-m` flag:

```bash
chia wallet take_offer ~/Downloads/33_CR-CATs_for_0.01_TXCH.offer -m 0.0001
```

Response:

```bash
Summary:
  OFFERED:
    - CAT 3ba9e16dca39f3fb... (Wallet ID: 3): 33.0 (33000 mojos)
  REQUESTED:
    - TXCH (Wallet ID: 1): 0.01 (10000000000 mojos)

Included Fees: 0 TXCH, 0 mojos

Would you like to take this offer? (y/n):
```

Enter `y` to confirm, and the transaction will be pushed to the blockchain:

```bash
Accepted offer with ID e479f5ab94ad2bfa1c8802186e87d91dfdc9a8c454d894bfa2199a7cf7c1adf0
Use chia wallet get_offers --id e479f5ab94ad2bfa1c8802186e87d91dfdc9a8c454d894bfa2199a7cf7c1adf0 -f 455644407 to view its status
```

After a few minutes, enter the `get_offers` command from the previous command's output. This should show that the Offer has been confirmed:

```bash
chia wallet get_offers --id e479f5ab94ad2bfa1c8802186e87d91dfdc9a8c454d894bfa2199a7cf7c1adf0 -f 455644407
```

Response:

```bash
Record with id: e479f5ab94ad2bfa1c8802186e87d91dfdc9a8c454d894bfa2199a7cf7c1adf0
---------------
Created at: 2023-09-22 13:20:30
Confirmed at: Not confirmed
Accepted at: 2023-09-22 13:20:30
Status: CONFIRMED
---------------
```

The balance is automatically updated after the offer has been confirmed. Just as with GUI Offers, there is no need to approve the pending balance when using CLI Offers:

```bash
CAT 3ba9e16dca39f3fb...:
   -Total Balance:                      282.0  (282000 mojo)
   -Balance Pending VC Approval:        0.0  (0 mojo)
   -Pending Total Balance:              282.0  (282000 mojo)
   -Spendable:                          282.0  (282000 mojo)
   -Type:                               CRCAT
   -Asset ID:                           3ba9e16dca39f3fb3b75e51535487fcd114abeeb0cf30e8975b9567ce5516fb5
   -Wallet ID:                          3
```

At this point, the VC Holder wallet has full possession of the CR-CATs.

## When Proofs Are Missing

Wallets that lack the required proofs are not eligible to receive CR-CATs. Recall that an [XCH Wallet](#xch-wallet) was set up for this tutorial. This wallet does not hold any VCs or proofs, so it is not allowed to hold any CR-CATs.

### Sending CR-CATs

Let's say the Authorized Provider obtains the XCH Wallet's address and sends 50 CR-CATs to it:

<div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/14_cr-cat.png" alt="Send CR-CATs to address lacking proofs" />
  </div>
  <br />

Even though the recipient is not allowed to hold these CR-CATs, the transaction itself is valid. However, just as in the examples at the beginning of this tutorial, the XCH Wallet will receive the CR-CATs in the `Pending Balance for Approval` section of the GUI. In this case, the required proof (in the red circle below) is not present.

The XCH Wallet can still attempt to approve these CR-CATs:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/15_cr-cat.png" alt="Proof not present" />
  </div>
  <br />

  <div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/16_cr-cat.png" alt="Attempt to approve" />
  </div>
  <br />

However, this attempt will fail because the required proofs are missing:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/17_cr-cat.png" alt="Required providers missing" />
  </div>
  <br />

The status of these CR-CATs is as follows:
* They are pending approval in the XCH Wallet
* The XCH Wallet is not allowed to approve them
* The XCH Wallet is not allowed to send them elsewhere
* The Authorized Provider's wallet no longer holds them

Note that even though nothing can be done with the funds in this state, they are still not bricked. The XCH Wallet will gain access to the funds if it obtains a VC with the required proof. However, assuming the XCH Wallet was not supposed to hold the correct VC in the first place, the Authorized Provider will presumably be reluctant to issue a VC to this wallet.

:::info

For the reasons discussed above, exercise caution when sending CR-CATs to another wallet. In fact, because of the risk of making the funds difficult (if not impossible) to access, we recommend that you don't send CR-CATs in this way.

Instead, you should use Offers to distribute CR-CATs, as they provide two important advantages:
* If the recipient is allowed to hold the CR-CATs, they will be able to accept an Offer to receive those CATs. Once the Offer is complete, they will not need to submit an approval transaction.
* If the recipient is not allowed to hold the CR-CATs, they will not be able to accept an Offer to receive those CATs in the first place.

:::

### Offers for CR-CATs

Let's say the owner of the XCH Wallet locates a CR-CAT Offer. Upon viewing the offer, the wallet's owner will see that the required proof is grayed out, indicating that it is not present:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/18_cr-cat.png" alt="Offer where required providers missing" />
  </div>
  <br />

Any attempts to accept this Offer without first receiving a VC with the required proofs will fail:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/cr-cat/19_cr-cat.png" alt="Offer acceptance where required providers missing" />
  </div>
  <br />

Thus, when using Offers, the funds cannot accidentally be sent to an unauthorized recipient.