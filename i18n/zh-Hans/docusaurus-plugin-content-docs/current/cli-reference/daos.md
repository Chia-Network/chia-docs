---
sidebar_label: DAOs
title: DAO CLI
slug: /dao-cli
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document contains a comprehensive reference of Chia DAO CLI commands and options.

:::warning

Chia DAOs are currently an _alpha_ primitive. This means that DAOs are not yet ready for production use, but you can still test them on either a simulator or a testnet. **We recommend against creating DAOs with this primitive on mainnet!**

Prior to using the DAO alpha primitive, be sure to read the [list of known issues](/dao-known-issues).

:::

## Reference

## `add`

Functionality: Create a wallet for an existing DAO

Usage: chia dao add \[OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                               |
| :------------ | :---------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -n            | --name            | TEXT    | False    | Set the DAO wallet name                                                                                   |
| -t            | --treasury-id     | TEXT    | True     | The Treasury ID of the DAO you want to track                                                              |
| -a            | --filter-amount   | INTEGER | False    | The minimum number of votes a proposal needs before the wallet will recognise it \[default: 1]            |
| -h            | --help            | None    | False    | Show a help message and exit                                                                              |

<details>
   <summary>Example</summary>

Start with a wallet with some XCH or TXCH:

```bash
chia wallet show
```

Response:

```
Chia Wallet:
   -Total Balance:         1.0 txch (1000000000000 mojo)
   -Pending Total Balance: 1.0 txch (1000000000000 mojo)
   -Spendable:             1.0 txch (1000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

Next, join a DAO by passing in its Treasury ID:

```bash
chia dao add -n "Test DAO Wallet" -t dfe486693cddf312eae141688e72a0b5f597df152f7f30dcb7c775d0ffaa1a56
```

At first, the response will indicate that the transaction is in process (you will need to choose your wallet fingerprint if more than one exists):

```bash
Adding wallet for DAO: dfe486693cddf312eae141688e72a0b5f597df152f7f30dcb7c775d0ffaa1a56
This may take awhile.
```

Eventually, you will receive a message indicating the Treasury ID and the three relevant wallets that have been created:

```bash
Successfully created DAO Wallet
DAO Treasury ID: 0xdfe486693cddf312eae141688e72a0b5f597df152f7f30dcb7c775d0ffaa1a56
DAO Wallet ID: 2
CAT Wallet ID: 3
DAOCAT Wallet ID: 4
```

At this point, you can show each of these wallets by running `chia wallet show`:

```bash
chia wallet show
```

```bash
Wallet height: 3181174
Sync status: Synced
Balances, fingerprint: 3046374920

Chia Wallet:
   -Total Balance:         1.0 txch (1000000000000 mojo)
   -Pending Total Balance: 1.0 txch (1000000000000 mojo)
   -Spendable:             1.0 txch (1000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Test DAO Wallet:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DAO
   -Treasury ID:           dfe486693cddf312eae141688e72a0b5f597df152f7f30dcb7c775d0ffaa1a56
   -Wallet ID:             2

CAT 07e809aa0324acaf...:
   -Total Balance:         0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable:             0.0  (0 mojo)
   -Type:                  CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             3

CAT 07e809aa0324acaf...:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             4
```

From here, you can add funds, create proposals, vote on proposals, etc.

</details>

***

## `add_funds`

Functionality: Send funds to a DAO treasury

Usage: chia dao add\_funds \[OPTIONS]

Options:

| Short Command | Long Command                          | Type    | Required | Description                                                                                               |
| :------------ | :------------------------------------ | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port                     | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint                         | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id                           | INTEGER | True     | ID of the DAO Treasury Wallet                                                                             |
| -w            | --funding-wallet-id                   | INTEGER | True     | The ID of the wallet to send funds from (must be of type `STANDARD_WALLET`)                               |
| -a            | --amount                              | TEXT    | True     | The amount of funds to send, in XCH                                                                       |
| -m            | --fee                                 | TEXT    | False    | Set the fees per transaction, in XCH \[default: 0]                                                        |
|               | --reuse, --reuse-puzhash              | None    | False    | Set either of these flags to reuse the existing address for the change \[default: not set]                |
|               | --new-address, --generate-new-puzhash | None    | False    | Set either of these flags to generate a new puzzle hash / address for the change \[default: not set]      |
| -ma           | --min-coin-amount, --min-amount       | TEXT    | False    | Ignore coins worth less then this much XCH or CAT units                                                   |
| -l            | --max-coin-amount, --max-amount       | TEXT    | False    | Ignore coins worth more then this much XCH or CAT units                                                   |
|               | --exclude-coin                        | TEXT    | False    | Exclude the coin with this ID from being spent                                                            |
|               | --exclude-amount                      | TEXT    | False    | Exclude any coins with this XCH or CAT amount from being included                                         |
| -h            | --help                                | None    | False    | Show a help message and exit                                                                              |

<details>
   <summary>Example</summary>

Start by showing the current wallet status:

```bash
chia wallet show
```

Response:

```bash
Chia Wallet:
   -Total Balance:         2.999987147234 txch (2999987147234 mojo)
   -Pending Total Balance: 2.999987147234 txch (2999987147234 mojo)
   -Spendable:             2.999987147234 txch (2999987147234 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Profile 1:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DAO
   -Treasury ID:           dfe486693cddf312eae141688e72a0b5f597df152f7f30dcb7c775d0ffaa1a56
   -Wallet ID:             3

CAT 07e809aa0324acaf...:
   -Total Balance:         100.0  (100000 mojo)
   -Pending Total Balance: 100.0  (100000 mojo)
   -Spendable:             100.0  (100000 mojo)
   -Type:                  CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             4

CAT 07e809aa0324acaf...:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             5
```

Add funds from the main Chia Wallet (ID `1`) to the DAO Wallet (ID `3`).

Note that the `Wallet IDs` shown here are only examples; yours may differ.

```bash
chia dao add_funds -i 2 --funding-wallet-id 1 -a 2 -m 0.00001
```

Response:

```bash
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 3261611401 -tx 0x180ea0da4b8fbe4e696480ff5fa819fbcc8ae069362127c73cf09acecbd378c2' to get status
```

After a few minutes, verify that the transaction was processed successfully:

```bash
chia wallet get_transaction -f 3261611401 -tx 0x180ea0da4b8fbe4e696480ff5fa819fbcc8ae069362127c73cf09acecbd378c2
```

Response:

```bash
Transaction 180ea0da4b8fbe4e696480ff5fa819fbcc8ae069362127c73cf09acecbd378c2
Status: Confirmed
Amount sent: 2 TXCH
To address: txch179tr6euaunzt425l6kyrzgrzyzv572w7820ptan47k3w77x6267s09j0km
Created at: 2023-09-13 21:41:08
```

At this point, 2 TXCH has been removed from wallet `1` and added to wallet `3`, which can be verified by running `balance`:

```bash
chia dao balance -i 2
```

Response:

```bash
XCH: 2.0
```

</details>

***

## `balance`

Functionality: Get the asset balances for a DAO treasury

Usage: chia dao balance \[OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                               |
| :------------ | :---------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id       | INTEGER | True     | ID of the wallet to use                                                                                   |
| -h            | --help            | None    | False    | Show a help message and exit                                                                              |

<details>
   <summary>Example</summary>

```bash
chia dao balance -i 2
```

Response:

```bash
XCH: 2.0
```

</details>

***

## `close_proposal`

Functionality: Close a DAO proposal

Usage: chia dao close\_proposal \[OPTIONS]

Options:

| Short Command | Long Command                          | Type    | Required | Description                                                                                                         |
| :------------ | :------------------------------------ | :------ | :------- | :------------------------------------------------------------------------------------------------------------------ |
| -wp           | --wallet-rpc-port                     | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml           |
| -f            | --fingerprint                         | INTEGER | False    | Set the fingerprint to specify which key to use                                                                     |
| -i            | --wallet-id                           | INTEGER | True     | ID of the wallet to use                                                                                             |
| -p            | --proposal-id                         | TEXT    | True     | The ID of the proposal you are voting on                                                                            |
| -d            | --self-destruct                       | None    | False    | If this flag is set, it will self-destruct a broken proposal, thus forcing to force it to close \[default: not set] |
| -m            | --fee                                 | TEXT    | False    | Set the fees per transaction, in XCH \[default: 0]                                                                  |
|               | --reuse, --reuse-puzhash              | None    | False    | Set either of these flags to reuse the existing address for the change \[default: not set]                          |
|               | --new-address, --generate-new-puzhash | None    | False    | Set either of these flags to generate a new puzzle hash / address for the change \[default: not set]                |
| -ma           | --min-coin-amount, --min-amount       | TEXT    | False    | Ignore coins worth less then this much XCH or CAT units                                                             |
| -l            | --max-coin-amount, --max-amount       | TEXT    | False    | Ignore coins worth more then this much XCH or CAT units                                                             |
|               | --exclude-coin                        | TEXT    | False    | Exclude the coin with this ID from being spent                                                                      |
|               | --exclude-amount                      | TEXT    | False    | Exclude any coins with this XCH or CAT amount from being included                                                   |
| -h            | --help                                | None    | False    | Show a help message and exit                                                                                        |

<details>
   <summary>Example</summary>

First, show the status of a proposal:

```bash
chia dao show_proposal -i 2 -p 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
```

Response:

```bash
Details of Proposal: 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
---------------------------

Type: SPEND
Status: OPEN
Passed: True
Closable: True

Proposal XCH Conditions
0x6ace2ea83d1db903c2fef0237e1cd71cae017fa79fb3eeec4af3c7fc6c25c16e 1000000000000
```

This proposal's status for `Closable` is `True`, so it can be closed. To do this, run the `close_proposal` command:

```bash
chia dao close_proposal -i 2 -p 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d -m 0.0001
```

Response:

```bash
Submitted proposal close transaction with name: 0x17ff5206551600637d5e5ca57511cf9f0c3ce3dc66466c86102c9e2a8861618e
```

After the transaction has been confirmed on-chain, view the status of the proposal once again:

```bash
chia dao show_proposal -i 2 -p 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
```

Response:

```bash
Details of Proposal: 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
---------------------------

Type: SPEND
Status: CLOSED
Passed: True

Proposal XCH Conditions
0x6ace2ea83d1db903c2fef0237e1cd71cae017fa79fb3eeec4af3c7fc6c25c16e 1000000000000
```

This proposal is now closed. The treasury's balance prior to the proposal being created was 2.0 XCH.
Verify that 1 XCH was deducted by showing the current balance:

```bash
chia dao balance -i 2
```

Response:

```bash
XCH: 1.000001
```

The extra 0.000001 XCH was added from the proposer's wallet, as a result of the `--proposal-minimum` option being enforced on this DAO (see the [create](#create) command for more details).

Another way to verify that the correct amount of XCH was spent from treasury is to show the recipient puzzle hash using the full\_node RPC:

```bash
chia rpc full_node get_coin_records_by_puzzle_hash '{"puzzle_hash": "0x6ace2ea83d1db903c2fef0237e1cd71cae017fa79fb3eeec4af3c7fc6c25c16e"}'
```

Response:

```bash
{
    "coin_records": [
        {
            "coin": {
                "amount": 1000000000000,
                "parent_coin_info": "0x9ffe88ae3b3ff4ae59524cf4ff200998ac68545d7918d6a3824d9781d0cb12b8",
                "puzzle_hash": "0x6ace2ea83d1db903c2fef0237e1cd71cae017fa79fb3eeec4af3c7fc6c25c16e"
            },
            "coinbase": false,
            "confirmed_block_index": 3186133,
            "spent": false,
            "spent_block_index": 0,
            "timestamp": 1694663355
        }
    ],
    "success": true
}
```

</details>

***

## `create`

Functionality: Create a new DAO wallet and treasury

Usage: chia dao create \[OPTIONS]

Options:

| Short Command | Long Command                          | Type    | Required | Description                                                                                                                                                                                       |
| :------------ | :------------------------------------ | :------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| -wp           | --wallet-rpc-port                     | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml                                                                                         |
| -f            | --fingerprint                         | INTEGER | False    | Set the fingerprint to specify which key to use                                                                                                                                                   |
| -n            | --name                                | TEXT    | False    | Set the DAO wallet name                                                                                                                                                                           |
|               | --proposal-timelock                   | INTEGER | False    | The minimum number of blocks before a proposal can close \[default: 1000]                                                                                                                         |
|               | --soft-close                          | INTEGER | False    | The number of blocks a proposal must remain unspent before closing \[default: 20]                                                                                                                 |
|               | --attendance-required                 | INTEGER | True     | The minimum number of votes a proposal must receive to be accepted                                                                                                                                |
|               | --pass-percentage                     | INTEGER | False    | The percentage of 'yes' votes in basis points a proposal must receive to be accepted. 100% = 10000 \[default: 5000]                                                                               |
|               | --self-destruct                       | INTEGER | False    | The number of blocks required before a proposal can be automatically removed \[default: 10000]                                                                                                    |
|               | --oracle-delay                        | INTEGER | False    | The number of blocks required between oracle spends of the treasury \[default: 50]                                                                                                                |
|               | --proposal-minimum                    | INTEGER | False    | The minimum amount (in xch) that a proposal must use to be created (this is a spam-prevention measure; it will be donated to the treasury when the proposal is closed) \[default: 0.000000000001] |
|               | --filter-amount                       | INTEGER | False    | The minimum number of votes a proposal needs before the wallet will recognise it \[default: 1]                                                                                                    |
|               | --cat-amount                          | INTEGER | True     | The number of DAO CATs (in mojos) to create when initializing the DAO                                                                                                                             |
| -m            | --fee                                 | TEXT    | False    | Set the fees per transaction, in XCH \[default: 0]                                                                                                                                                |
|               | --fee-for-cat                         | TEXT    | False    | Set the fees for the CAT creation transaction, in XCH \[default: 0]                                                                                                                               |
|               | --reuse, --reuse-puzhash              | None    | False    | Set either of these flags to reuse the existing address for the change \[default: not set]                                                                                                        |
|               | --new-address, --generate-new-puzhash | None    | False    | Set either of these flags to generate a new puzzle hash / address for the change \[default: not set]                                                                                              |
| -ma           | --min-coin-amount, --min-amount       | TEXT    | False    | Ignore coins worth less then this much XCH or CAT units                                                                                                                                           |
| -l            | --max-coin-amount, --max-amount       | TEXT    | False    | Ignore coins worth more then this much XCH or CAT units                                                                                                                                           |
|               | --exclude-coin                        | TEXT    | False    | Exclude the coin with this ID from being spent                                                                                                                                                    |
|               | --exclude-amount                      | TEXT    | False    | Exclude any coins with this XCH or CAT amount from being included                                                                                                                                 |
| -h            | --help                                | None    | False    | Show a help message and exit                                                                                                                                                                      |

:::info

Per singleton rules, `--proposal-minimum` needs to be an odd number (in mojos). If you enter an even number, one mojo will automatically be added to this amount. You will then see the following message when creating the DAO:

`Adding 1 mojo to proposal minimum amount`

:::

:::warning

This command requires that you have at least two coins in your wallet: one to create the DAO and pay the blockchain fee, and one to mint the DAO CATs.

If you only have one coin, an error similar to the following will be shown:

`ValueError: {'error': 'Transaction for 100000 is greater than spendable balance of 0. There may be other transactions pending or our minimum coin amount is too high.', 'success': False}`

You can split one coin into multiple coins by running the [chia wallet coins split](/wallet-cli/#split) command.

:::

<details>
   <summary>Example</summary>

This example will create a DAO with the following options:

- Proposals must exist for at least 10 blocks before being closed (`--proposal-timelock 10`)
- Proposals must be unspent for at least 2 blocks before being closed (`--soft-close 2`)
- At least 1000 votes ('yes' and 'no' combined) must be received before a proposal can pass (`--attendance-required`)
- At least 50% of votes must be 'yes' in order for a proposal to pass (`--pass-percentage 5000`)
- At least 10 blocks must pass before a proposal can be removed (`--self-destruct 10`)
- At least 5 blocks must pass between oracle spends of the treasury (`--oracle-delay 5`)
- One million mojos will be donated to the treasury upon completion of a proposal. This prevents bad actors from spamming a DAO with untennable proposals (`--proposal-minimum 0.000001`)
- At least 1 vote must be made for a proposal before the wallet will recognise it (`--filter-amount 1`)
- One hundred thousand DAO CATs will be created initially (`--cat-amount 100000`)
- A blockchain fee of 0.00001 XCH will be paid for the transaction that creates the DAO (`-m 0.00001`)
- A second blockchain fee of 0.00001 XCH will be paid for the transaction that creates the DAO CATs (`--fee-for-cat 0.00001`)

```bash
chia dao create --proposal-timelock 10 --soft-close 2 --attendance-required 1000 --pass-percentage 5000 --self-destruct 10 --oracle-delay 5 --proposal-minimum 0.000001 --filter-amount 1 --cat-amount 100000 -m 0.00001 --fee-for-cat 0.00001
```

Response:

```bash
Creating new DAO
Adding 1 mojo to proposal minimum amount

Successfully created DAO Wallet
DAO Treasury ID: 0xdfe486693cddf312eae141688e72a0b5f597df152f7f30dcb7c775d0ffaa1a56
DAO Wallet ID: 3
CAT Wallet ID: 4
DAOCAT Wallet ID: 5
```

Multiple on-chain transactions will be performed. This will take a few minutes.

To verify that the creation was successful, show your wallet:

```bash
chia wallet show
```

Response:

```bash
Chia Wallet:
   -Total Balance:         2.999987147234 txch (2999987147234 mojo)
   -Pending Total Balance: 2.999987147234 txch (2999987147234 mojo)
   -Spendable:             2.999987147234 txch (2999987147234 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Profile 1:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DAO
   -Treasury ID:           dfe486693cddf312eae141688e72a0b5f597df152f7f30dcb7c775d0ffaa1a56
   -Wallet ID:             3

CAT 07e809aa0324acaf...:
   -Total Balance:         100.0  (100000 mojo)
   -Pending Total Balance: 100.0  (100000 mojo)
   -Spendable:             100.0  (100000 mojo)
   -Type:                  CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             4

CAT 07e809aa0324acaf...:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             5
```

Recall from the DAO's creation response message that the primary DAO wallet's ID is `3`, the CAT wallet's ID is `4`, and the DAO CAT wallet's ID is `5`.

It is also possible to obtain the DAO's Treasury ID by calling `get_id` and supplying the DAO wallet's ID. For example:

```bash
chia dao get_id -i 2
```

Response:

```bash
Treasury ID: 0xdfe486693cddf312eae141688e72a0b5f597df152f7f30dcb7c775d0ffaa1a56
```

</details>

***

## create\_proposal

Functionality: Create and add a proposal to a DAO

There are currently three supported proposal types: spend some of the treasury, update the DAO rules, and mint more of the DAO's CAT.

### `mint`

Functionality: Create a proposal to mint new DAO CATs

Usage: chia dao create\_proposal \[OPTIONS]

Options:

| Short Command | Long Command                          | Type    | Required | Description                                                                                               |
| :------------ | :------------------------------------ | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port                     | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint                         | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id                           | INTEGER | True     | ID of the DAO wallet to use                                                                               |
| -a            | --amount                              | INTEGER | True     | The amount of new cats the proposal will mint (in mojos)                                                  |
| -t            | --to-address                          | TEXT    | True     | The address new cats will be minted to                                                                    |
| -v            | --vote-amount                         | INTEGER | True     | The number of votes to add                                                                                |
| -m            | --fee                                 | TEXT    | False    | Set the fees per transaction, in XCH \[default: 0]                                                        |
|               | --reuse, --reuse-puzhash              | None    | False    | Set either of these flags to reuse the existing address for the change \[default: not set]                |
|               | --new-address, --generate-new-puzhash | None    | False    | Set either of these flags to generate a new puzzle hash / address for the change \[default: not set]      |
| -ma           | --min-coin-amount, --min-amount       | TEXT    | False    | Ignore coins worth less then this much XCH or CAT units                                                   |
| -l            | --max-coin-amount, --max-amount       | TEXT    | False    | Ignore coins worth more then this much XCH or CAT units                                                   |
|               | --exclude-coin                        | TEXT    | False    | Exclude the coin with this ID from being spent                                                            |
|               | --exclude-amount                      | TEXT    | False    | Exclude any coins with this XCH or CAT amount from being included                                         |
| -h            | --help                                | None    | False    | Show a help message and exit                                                                              |

:::warning

The votes need to be minted from the treasury's funds, so your DAO will need to have sufficient funds to perform the minting.

:::

<details>
   <summary>Example</summary>

This example will show how to create a proposal to mint 100 DAO CATs and deliver them to another wallet.

First, a snapshot of the proposer's wallet:

```bash
chia wallet show
```

Response:

```
Chia Wallet:
   -Total Balance:         0.999356147233 txch (999356147233 mojo)
   -Pending Total Balance: 0.999356147233 txch (999356147233 mojo)
   -Spendable:             0.999356147233 txch (999356147233 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Profile 1:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DAO
   -Treasury ID:           dfe486693cddf312eae141688e72a0b5f597df152f7f30dcb7c775d0ffaa1a56
   -Wallet ID:             3

CAT 07e809aa0324acaf...:
   -Total Balance:         0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable:             0.0  (0 mojo)
   -Type:                  CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             4

CAT 07e809aa0324acaf...:
   -Total Balance:         100000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             5
```

The following command will be used to create the proposal:

```bash
chia dao create_proposal mint -i 2 -a 100000 -t txch1u7l0esj4jet6lc4uwm3qj3u3sgdh5y8h4msgl9g833907rrt4k6sj43nfx -v 1 -m 0.00001
```

Response:

```bash
Successfully created proposal.
Proposal ID: 0x6e11db5e6a94b9f4f867d968ae6f971e6fa4dca9b75ad0d54e0450ebdb1d3c3a
```

View the proposal:

```bash
chia dao show_proposal -i 2 -p 0x6e11db5e6a94b9f4f867d968ae6f971e6fa4dca9b75ad0d54e0450ebdb1d3c3a
```

Response:

```bash
Details of Proposal: 0x6e11db5e6a94b9f4f867d968ae6f971e6fa4dca9b75ad0d54e0450ebdb1d3c3a
---------------------------

Type: MINT
Status: OPEN
Passed: False
Yes votes needed: 499
Closable: False
Total votes needed: 999
Blocks remaining: 0

Amount of CAT to mint: 100000
Address: txch1u7l0esj4jet6lc4uwm3qj3u3sgdh5y8h4msgl9g833907rrt4k6sj43nfx
```

This result shows that 1 vote has been counted so far, from the proposer.
If the proposal succeeds, 100 CATs (100,000 mojos) will be sent to the destination address.

</details>

### `spend`

Functionality: Create a proposal to spend DAO funds

Usage: chia dao create\_proposal \[OPTIONS]

Options:

| Short Command | Long Command                          | Type    | Required | Description                                                                                               |
| :------------ | :------------------------------------ | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port                     | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint                         | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id                           | INTEGER | True     | ID of the wallet to use                                                                                   |
| -t            | --to-address                          | TEXT    | False    | The address the proposal will send funds to                                                               |
| -a            | --amount                              | FLOAT   | False    | The amount of funds the proposal will send (in mojos)                                                     |
| -v            | --vote-amount                         | INTEGER | True     | The number of votes to add                                                                                |
|               | --asset-id                            | TEXT    | False    | The asset id of the funds the proposal will send. Leave blank for xch                                     |
| -j            | --from-json                           | TEXT    | False    | Path to a json file containing a list of additions, for use in proposals with multiple spends             |
| -m            | --fee                                 | TEXT    | False    | Set the fees per transaction, in XCH \[default: 0]                                                        |
|               | --reuse, --reuse-puzhash              | None    | False    | Set either of these flags to reuse the existing address for the change \[default: not set]                |
|               | --new-address, --generate-new-puzhash | None    | False    | Set either of these flags to generate a new puzzle hash / address for the change \[default: not set]      |
| -ma           | --min-coin-amount, --min-amount       | TEXT    | False    | Ignore coins worth less then this much XCH or CAT units                                                   |
| -l            | --max-coin-amount, --max-amount       | TEXT    | False    | Ignore coins worth more then this much XCH or CAT units                                                   |
|               | --exclude-coin                        | TEXT    | False    | Exclude the coin with this ID from being spent                                                            |
|               | --exclude-amount                      | TEXT    | False    | Exclude any coins with this XCH or CAT amount from being included                                         |
| -h            | --help                                | None    | False    | Show a help message and exit                                                                              |

<details>
   <summary>Example</summary>

Be sure to have some CATs locked up for voting. To view the number of CATs that have been locked, run `chia wallet show`:

```bash
chia wallet show
```

Response:

```
Chia Wallet:
   -Total Balance:         0.999957147234 txch (999957147234 mojo)
   -Pending Total Balance: 0.999957147234 txch (999957147234 mojo)
   -Spendable:             0.999957147234 txch (999957147234 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Profile 1:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DAO
   -Treasury ID:           dfe486693cddf312eae141688e72a0b5f597df152f7f30dcb7c775d0ffaa1a56
   -Wallet ID:             3

CAT 07e809aa0324acaf...:
   -Total Balance:         0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable:             0.0  (0 mojo)
   -Type:                  CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             4

CAT 07e809aa0324acaf...:
   -Total Balance:         100000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             5
```

In this case, the DAO has `--proposal-minimum` set to `0.000001`.
This means that `0.000001` will be reserved for the proposal's creation.
After the proposal has completed, that amount will be donated to the DAO's treasury.
Additionally, 100 `DAO_CAT` have been locked (100,000 mojos).
To learn how to lock up these CATs, see the [lockup\_coins](#lockup_coins) command.

Next, create the proposal. In this case, we will propose to send 1 XCH (`-a`) to a new wallet address (`-t`) and use 50 of our votes to vote "yes" (`-v`) while adding a 100-million-mojo fee (`-m`)

```bash
chia dao create_proposal spend -i 2 -t txch1dt8za2parkus8sh77q3hu8xhrjhqzla8n7e7amz270rlcmp9c9hqfmdcx8 -a 1 -v 50 -m 0.0001
```

Response:

```bash
Created spend proposal for asset: None
Successfully created proposal.
Proposal ID: 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
```

After the proposal has been confirmed on-chain, you can view the details by running `list_proposals` and passing in your DAO treasury wallet (`3` in this example):

```bash
chia dao list_proposals -i 2
```

Response:

```bash
############################
Proposal ID: 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
Status: OPEN
Votes for: 50
Votes against: 0
------------------------
Proposals have 2 blocks of soft close time.
############################
```

You can also obtain more details about the proposal from the `show_proposal` command:

```bash
chia dao show_proposal -i 2 -p 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
```

Response:

```bash
Details of Proposal: 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
---------------------------

Type: SPEND
Status: OPEN
Passed: False
Yes votes needed: 450
Closable: False
Total votes needed: 950
Blocks remaining: 0

Proposal XCH Conditions
0x6ace2ea83d1db903c2fef0237e1cd71cae017fa79fb3eeec4af3c7fc6c25c16e 1000000000000
```

</details>

### `update`

Functionality: Create a proposal to change the DAO rules

Usage: chia dao create\_proposal \[OPTIONS]

Options:

| Short Command | Long Command                          | Type    | Required | Description                                                                                               |
| :------------ | :------------------------------------ | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port                     | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint                         | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id                           | INTEGER | True     | ID of the wallet to use                                                                                   |
| -v            | --vote-amount                         | INTEGER | True     | The number of votes to add                                                                                |
|               | --proposal-timelock                   | INTEGER | False    | The new minimum number of blocks before a proposal can close                                              |
|               | --soft-close                          | INTEGER | False    | The number of blocks a proposal must remain unspent before closing                                        |
|               | --attendance-required                 | INTEGER | False    | The minimum number of votes a proposal must receive to be accepted                                        |
|               | --pass-percentage                     | INTEGER | False    | The percentage of 'yes' votes in basis points a proposal must receive to be accepted. 100% = 10000        |
|               | --self-destruct                       | INTEGER | False    | The number of blocks required before a proposal can be automatically removed                              |
|               | --oracle-delay                        | INTEGER | False    | The number of blocks required between oracle spends of the treasury                                       |
| -m            | --fee                                 | TEXT    | False    | Set the fees per transaction, in XCH \[default: 0]                                                        |
|               | --reuse, --reuse-puzhash              | None    | False    | Set either of these flags to reuse the existing address for the change \[default: not set]                |
|               | --new-address, --generate-new-puzhash | None    | False    | Set either of these flags to generate a new puzzle hash / address for the change \[default: not set]      |
| -ma           | --min-coin-amount, --min-amount       | TEXT    | False    | Ignore coins worth less then this much XCH or CAT units                                                   |
| -l            | --max-coin-amount, --max-amount       | TEXT    | False    | Ignore coins worth more then this much XCH or CAT units                                                   |
|               | --exclude-coin                        | TEXT    | False    | Exclude the coin with this ID from being spent                                                            |
|               | --exclude-amount                      | TEXT    | False    | Exclude any coins with this XCH or CAT amount from being included                                         |
| -h            | --help                                | None    | False    | Show a help message and exit                                                                              |

<details>
   <summary>Example</summary>

Let's say a DAO has the following rules:

```bash
attendance_required: 3000
oracle_spend_delay: 2
pass_percentage: 5000
proposal_minimum_amount: 1000001
proposal_timelock: 3
self_destruct_length: 1
soft_close_length: 2
```

Create a proposal to increase the `pass_percentage` to `7500`, thereby requiring 75% of votes to be "yes" for a proposal to pass (and add 2000 "yes" votes):

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

</details>

***

## `exit_lockup`

Functionality: Release DAO CATs from voting mode

Usage: chia dao exit\_lockup \[OPTIONS]

Options:

| Short Command | Long Command                          | Type    | Required | Description                                                                                               |
| :------------ | :------------------------------------ | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port                     | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint                         | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id                           | INTEGER | True     | ID of the DAO wallet from which to exit the lockup                                                        |
| -m            | --fee                                 | TEXT    | False    | Set the fees per transaction, in XCH \[default: 0]                                                        |
|               | --reuse, --reuse-puzhash              | None    | False    | Set either of these flags to reuse the existing address for the change \[default: not set]                |
|               | --new-address, --generate-new-puzhash | None    | False    | Set either of these flags to generate a new puzzle hash / address for the change \[default: not set]      |
| -ma           | --min-coin-amount, --min-amount       | TEXT    | False    | Ignore coins worth less then this much XCH or CAT units                                                   |
| -l            | --max-coin-amount, --max-amount       | TEXT    | False    | Ignore coins worth more then this much XCH or CAT units                                                   |
|               | --exclude-coin                        | TEXT    | False    | Exclude the coin with this ID from being spent                                                            |
|               | --exclude-amount                      | TEXT    | False    | Exclude any coins with this XCH or CAT amount from being included                                         |
| -h            | --help                                | None    | False    | Show a help message and exit                                                                              |

This command will unlock tokens that have been locked for voting, provided that there are no active proposals that these CATs have voted on. This command will automatically determine which CATs are available to be unlocked.

<details>
   <summary>Example</summary>

First, obtain the current state of the DAO tokens:

```bash
chia wallet show
```

This truncated response shows that 26 tokens are unlocked, and 74 tokens are locked:

```bash
CAT 3c992efe31910882...:
   -Total Balance:         26.0  (26000 mojo)
   -Pending Total Balance: 26.0  (26000 mojo)
   -Spendable:             26.0  (26000 mojo)
   -Type:                  CAT
   -Asset ID:              3c992efe31910882f35a6e0017b6a7ceb0e2f6f7b96a36285d5d11ea015c05a7
   -Wallet ID:             3

CAT 3c992efe31910882...:
   -Total Balance:         74000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              3c992efe31910882f35a6e0017b6a7ceb0e2f6f7b96a36285d5d11ea015c05a7
   -Wallet ID:             4
```

Next, unlock all tokens that are available to be unlocked (they cannot have been used to vote on any active proposals):

```bash
chia dao exit_lockup -i 2 -m 0.00001
```

Response:

```
Transaction submitted with spend bundle ID: 0xbe3da7977dd5674ef58a7d8dbd975a990ab52afea11312a06f9edfe0b8f33aff.
```

After the transaction has been confirmed, verify that the tokens have been unlocked:

```bash
chia wallet show
```

Response (truncated):

```bash
CAT a62a729da3c90a22...:
   -Total Balance:         100.0  (100000 mojo)
   -Pending Total Balance: 100.0  (100000 mojo)
   -Spendable:             100.0  (100000 mojo)
   -Type:                  CAT
   -Asset ID:              a62a729da3c90a22aeb648f64a7499680eceef7c4d98a5dd9e7fa5d14fc3c99e
   -Wallet ID:             7

CAT a62a729da3c90a22...:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              a62a729da3c90a22aeb648f64a7499680eceef7c4d98a5dd9e7fa5d14fc3c99e
   -Wallet ID:             8
```

There are now 100 unlocked tokens and 0 locked tokens.

</details>

***

## `get_id`

Functionality: Get the Treasury ID of a DAO

Usage: chia dao get\_id \[OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                               |
| :------------ | :---------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id       | INTEGER | True     | ID of the DAO wallet which will receive the funds                                                         |
| -h            | --help            | None    | False    | Show a help message and exit                                                                              |

<details>
   <summary>Example</summary>

Get the ID of an existing treasury:

```bash
chia dao get_id -i 2
```

Response:

```bash
Treasury ID: 0xdfe486693cddf312eae141688e72a0b5f597df152f7f30dcb7c775d0ffaa1a56
```

</details>

***

## `list_proposals`

Functionality: List proposals for the DAO

Usage: chia dao list\_proposals \[OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                               |
| :------------ | :---------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id       | INTEGER | True     | ID of the wallet to use                                                                                   |
| -c            | --include-closed  | None    | False    | Set to include previously closed proposals \[Default: not set]                                            |
| -h            | --help            | None    | False    | Show a help message and exit                                                                              |

This command will list all open proposals by default.
If the `-c` flag is included, then all open _and_ closed proposals will be listed.
To show the details of a specific proposal, use the [show\_proposal](#show_proposal) command.

<details>
   <summary>Example</summary>

```bash
chia dao list_proposals -i 2
```

Response:

```bash
############################
Proposal ID: 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
Status: OPEN
Votes for: 50
Votes against: 0
------------------------
Proposals have 2 blocks of soft close time.
############################
```

</details>

***

## `lockup_coins`

Functionality: Lock DAO CATs for voting

Usage: chia dao lockup\_coins \[OPTIONS]

Options:

| Short Command | Long Command                          | Type    | Required | Description                                                                                               |
| :------------ | :------------------------------------ | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port                     | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint                         | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id                           | INTEGER | True     | ID of the DAO wallet to use                                                                               |
| -a            | --amount                              | TEXT    | True     | The amount of CATs (not mojos) to lock in voting mode                                                     |
| -m            | --fee                                 | TEXT    | False    | Set the fees per transaction, in XCH \[default: 0]                                                        |
|               | --reuse, --reuse-puzhash              | None    | False    | Set either of these flags to reuse the existing address for the change \[default: not set]                |
|               | --new-address, --generate-new-puzhash | None    | False    | Set either of these flags to generate a new puzzle hash / address for the change \[default: not set]      |
| -ma           | --min-coin-amount, --min-amount       | TEXT    | False    | Ignore coins worth less then this much XCH or CAT units                                                   |
| -l            | --max-coin-amount, --max-amount       | TEXT    | False    | Ignore coins worth more then this much XCH or CAT units                                                   |
|               | --exclude-coin                        | TEXT    | False    | Exclude the coin with this ID from being spent                                                            |
|               | --exclude-amount                      | TEXT    | False    | Exclude any coins with this XCH or CAT amount from being included                                         |
| -h            | --help                                | None    | False    | Show a help message and exit                                                                              |

This command will lock the specified number of tokens, thereby making them available for voting.

<details>
   <summary>Example</summary>

Before locking the tokens, show the current status of the DAO's wallets:

```bash
chia wallet show
```

Response:

```bash
Chia Wallet:
   -Total Balance:         0.999977147234 txch (999977147234 mojo)
   -Pending Total Balance: 0.999977147234 txch (999977147234 mojo)
   -Spendable:             0.999977147234 txch (999977147234 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Profile 1:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DAO
   -Treasury ID:           dfe486693cddf312eae141688e72a0b5f597df152f7f30dcb7c775d0ffaa1a56
   -Wallet ID:             3

CAT 07e809aa0324acaf...:
   -Total Balance:         100.0  (100000 mojo)
   -Pending Total Balance: 100.0  (100000 mojo)
   -Spendable:             100.0  (100000 mojo)
   -Type:                  CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             4

CAT 07e809aa0324acaf...:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             5
```

In this example, there are 100 tokens in the `CAT` wallet with ID `4`, and 0 tokens in the `DAO_CAT` wallet with ID `5`.

Next, run the `lockup_coins` command to lock some of the CATs. For example, to lock 74 CATs:

```bash
chia dao lockup_coins -i 2 -a 74 -m 0.00001
```

The response will show the transaction ID:

```bash
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 3261611401 -tx 0xb480143c81d78e739319fe2d52b483ea1f211f0ebb8ff48fc40c9af81da871b3' to get status
```

To see the status of the transaction run the command shown in the output of the `lockup_coins` command. For example:

```bash
chia wallet get_transaction -f 3261611401 -tx 0xb480143c81d78e739319fe2d52b483ea1f211f0ebb8ff48fc40c9af81da871b3
```

Response:

```bash
Transaction b480143c81d78e739319fe2d52b483ea1f211f0ebb8ff48fc40c9af81da871b3
Status: Confirmed
Amount sent: 74 CAT 07e809aa0324acaf...
To address: txch1dkd20xfxqc29q7qh7nscjh8njgt0sppx0r03cvzeuzh70auz6ypsfhzles
Created at: 2023-09-13 21:44:48
```

After the transaction has been finalized, view the wallet's balance again:

```bash
chia wallet show
```

The response will show that the `CAT` wallet's balance has decreased and the `DAO_CAT` wallet's balance has increased:

```bash
CAT 07e809aa0324acaf...:
   -Total Balance:         26.0  (26000 mojo)
   -Pending Total Balance: 26.0  (26000 mojo)
   -Spendable:             26.0  (26000 mojo)
   -Type:                  CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             4

CAT 07e809aa0324acaf...:
   -Total Balance:         74000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              07e809aa0324acaf274ce1bb1502d18b31236ac46739e90ebf0a042dbbd2c882
   -Wallet ID:             5
```

The 74 tokens in the `DAO_CAT` wallet can now be used for voting on proposals.

</details>

***

## `release_coins`

Functionality: Release closed proposals from DAO CATs

Usage: chia dao release\_coins \[OPTIONS]

Options:

| Short Command | Long Command                          | Type    | Required | Description                                                                                               |
| :------------ | :------------------------------------ | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port                     | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint                         | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id                           | INTEGER | True     | ID of the wallet to use                                                                                   |
| -m            | --fee                                 | TEXT    | False    | Set the fees per transaction, in XCH \[default: 0]                                                        |
|               | --reuse, --reuse-puzhash              | None    | False    | Set either of these flags to reuse the existing address for the change \[default: not set]                |
|               | --new-address, --generate-new-puzhash | None    | False    | Set either of these flags to generate a new puzzle hash / address for the change \[default: not set]      |
| -ma           | --min-coin-amount, --min-amount       | TEXT    | False    | Ignore coins worth less then this much XCH or CAT units                                                   |
| -l            | --max-coin-amount, --max-amount       | TEXT    | False    | Ignore coins worth more then this much XCH or CAT units                                                   |
|               | --exclude-coin                        | TEXT    | False    | Exclude the coin with this ID from being spent                                                            |
|               | --exclude-amount                      | TEXT    | False    | Exclude any coins with this XCH or CAT amount from being included                                         |
| -h            | --help                                | None    | False    | Show a help message and exit                                                                              |

<details>
   <summary>Example</summary>

Let's say this is the state of the wallet:

```bash
Amazing DAO CAT:
   -Total Balance:         0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable:             0.0  (0 mojo)
   -Type:                  CAT
   -Asset ID:              0ba7b225ea0aa595384239537b055caa0fa8b627b98b6032439d4f2cd1414bf5
   -Wallet ID:             3

CAT 0ba7b225ea0aa595...:
   -Total Balance:         1000.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              0ba7b225ea0aa595384239537b055caa0fa8b627b98b6032439d4f2cd1414bf5
   -Wallet ID:             4
```

One thousand DAO\_CATs (equivalent to 1 CAT) have been locked up for voting. In this case, some of these DAO\_CATs have been used for voting in a proposal that has since closed.

Next, run the `release_coins` command and add a blockchain fee:

```bash
chia dao release_coins -i 2 -m 0.0001
```

The response does not contain much info:

```bash
Transaction not yet submitted to nodes. TX ID: 0xcebd0fdf105855ad51820efee7231cac618f3028d37a7c80c376d4f63ceefa35
```

After a few minutes, the transaction will be completed and the voting coins will have been released.
However, the wallet balance won't reflect this. In order to verify that the CATs have been released, you can run the `exit_lockup` command:

```bash
chia dao exit_lockup -i 2 -m 0.0001
```

After a few more minutes, show the wallet balance again:

```bash
Amazing DAO CAT:
   -Total Balance:         1.0  (1000 mojo)
   -Pending Total Balance: 1.0  (1000 mojo)
   -Spendable:             1.0  (1000 mojo)
   -Type:                  CAT
   -Asset ID:              0ba7b225ea0aa595384239537b055caa0fa8b627b98b6032439d4f2cd1414bf5
   -Wallet ID:             3

CAT 0ba7b225ea0aa595...:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DAO_CAT
   -Asset ID:              0ba7b225ea0aa595384239537b055caa0fa8b627b98b6032439d4f2cd1414bf5
   -Wallet ID:             4
```

All 1000 DAO\_CATs have been released. They are now reflected as 1 CAT.
If any DAO\_CATs had still been locked in a current vote, they would not have unlocked in the `exit_lockup` command.

</details>

***

## `rules`

Functionality: Get the current rules governing the DAO

Usage: chia dao rules \[OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                               |
| :------------ | :---------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id       | INTEGER | True     | ID of the wallet to use                                                                                   |
| -h            | --help            | None    | False    | Show a help message and exit                                                                              |

<details>
  <summary>Example</summary>

```bash
chia dao rules -i 2
```

Response:

```bash
attendance_required: 1000
oracle_spend_delay: 5
pass_percentage: 5000
proposal_minimum_amount: 1000001
proposal_timelock: 10
self_destruct_length: 10
soft_close_length: 2
```

</details>

***

## `show_proposal`

Functionality: Show the details of a specific proposal

Usage: chia dao show\_proposal \[OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                               |
| :------------ | :---------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id       | INTEGER | True     | ID of the wallet to use                                                                                   |
| -p            | --proposal\_id    | TEXT    | True     | The ID of the proposal to fetch, obtainable by running the [list\_proposals](#list_proposals) command     |
| -h            | --help            | None    | False    | Show a help message and exit                                                                              |

<details>
   <summary>Example</summary>

```bash
chia dao show_proposal -i 2 -p 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
```

Response:

```bash
Details of Proposal: 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
---------------------------

Type: SPEND
Status: OPEN
Passed: False
Yes votes needed: 450
Closable: False
Total votes needed: 950
Blocks remaining: 0

Proposal XCH Conditions
0x6ace2ea83d1db903c2fef0237e1cd71cae017fa79fb3eeec4af3c7fc6c25c16e 1000000000000
```

</details>

***

## `vote`

Functionality: Vote on a DAO proposal

Usage: chia dao vote \[OPTIONS]

Options:

| Short Command | Long Command                          | Type    | Required | Description                                                                                               |
| :------------ | :------------------------------------ | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port                     | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc\_port under wallet in config.yaml |
| -f            | --fingerprint                         | INTEGER | False    | Set the fingerprint to specify which key to use                                                           |
| -i            | --wallet-id                           | INTEGER | True     | ID of the wallet to use                                                                                   |
| -p            | --proposal-id                         | TEXT    | True     | The ID of the proposal you are voting on                                                                  |
| -a            | --vote-amount                         | INTEGER | True     | The number of votes you want to cast                                                                      |
| -n            | --vote-no                             | None    | False    | Use this option to vote against a proposal. If not present then the vote is for the proposal              |
| -m            | --fee                                 | TEXT    | False    | Set the fees per transaction, in XCH \[default: 0]                                                        |
|               | --reuse, --reuse-puzhash              | None    | False    | Set either of these flags to reuse the existing address for the change \[default: not set]                |
|               | --new-address, --generate-new-puzhash | None    | False    | Set either of these flags to generate a new puzzle hash / address for the change \[default: not set]      |
| -ma           | --min-coin-amount, --min-amount       | TEXT    | False    | Ignore coins worth less then this much XCH or CAT units                                                   |
| -l            | --max-coin-amount, --max-amount       | TEXT    | False    | Ignore coins worth more then this much XCH or CAT units                                                   |
|               | --exclude-coin                        | TEXT    | False    | Exclude the coin with this ID from being spent                                                            |
|               | --exclude-amount                      | TEXT    | False    | Exclude any coins with this XCH or CAT amount from being included                                         |
| -h            | --help                                | None    | False    | Show a help message and exit                                                                              |

<details>
   <summary>Example</summary>

Start by showing the status of a proposal:

```bash
chia dao show_proposal -i 2 -p 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
```

Response:

```bash
Details of Proposal: 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
---------------------------

Type: SPEND
Status: OPEN
Passed: False
Yes votes needed: 450
Closable: False
Total votes needed: 950
Blocks remaining: 0

Proposal XCH Conditions
0x6ace2ea83d1db903c2fef0237e1cd71cae017fa79fb3eeec4af3c7fc6c25c16e 1000000000000
```

In this example, 450 "Yes" votes are still needed, along with 950 total votes. Next we'll add 100 "yes" votes:

```bash
chia dao vote -i 2 -p 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d -a 100 -m 0.0001
```

Response:

```
Submitted spend bundle with name: 0x5975b2e846cbd75335d3ed98a72af1edb4bdaaaf0817307b185d94ff9ad3c2ed
```

After the transaction has been confirmed on-chain, show the proposal again:

```bash
 chia dao show_proposal -i 2 -p 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
```

The response shows that the 100 "Yes" votes have been counted:

```bash
Details of Proposal: 0x372a3e3d7f502a542d3c926588b62d5ca580d4ff60a158740563470f2114ef2d
---------------------------

Type: SPEND
Status: OPEN
Passed: False
Yes votes needed: 350
Closable: False
Total votes needed: 850
Blocks remaining: 0

Proposal XCH Conditions
0x6ace2ea83d1db903c2fef0237e1cd71cae017fa79fb3eeec4af3c7fc6c25c16e 1000000000000
```

</details>

***
