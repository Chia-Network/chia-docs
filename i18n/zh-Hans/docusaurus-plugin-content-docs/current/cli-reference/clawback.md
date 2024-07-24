---
slug: /clawback-cli
title: Clawback
---

## Intro

This page includes a comprehensive list of Chia's Command Line Interface commands for using the clawback primitive.

:::warning

These commands are only relevant for the clawback primitive, which is located in the [chia-clawback-primitive](https://github.com/Chia-Network/chia-clawback-primitive) repository.

In order to view the commands that are built into the CLI for Chia's reference wallet, see the following `wallet` commands:

- [clawback](/wallet-cli#clawback)
- [get_transactions](/wallet-cli#get_transactions)
- [send](/wallet-cli#send-1)

:::

For more info, see the following:

- [Clawback primitive guide](/guides/clawback-primitive-guide)
- [Youtube video explaining clawback](https://www.youtube.com/watch?v=_pC38ulU2js)
- [Clawback user guide](/guides/clawback-user-guide)

## Reference

## `clawback`

Functionality: Get info about the `clawback` command

Usage: `clawback [OPTIONS] COMMAND [ARGS]`

Options:

| Short Command | Long Command | Type | Required | Description                  |
| :------------ | :----------- | :--- | :------- | :--------------------------- |
|               | --version    | None | False    | Show the version and exit    |
| -h            | --help       | None | False    | Show a help message and exit |

Commands:

| Name   | Description                                         |
| :----- | :-------------------------------------------------- |
| claim  | Claim a clawback coin after the timelock has passed |
| claw   | Clawback an unclaimed coin                          |
| create | Send xch to a clawback coin                         |
| show   | Show details of all clawback coins                  |

---

### `claim`

Functionality: Claim a clawback coin after the timelock has passed

Usage: `clawback claim [OPTIONS]`

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -c            | --coin-id         | TEXT    | True     | The coin ID you want to claim                                                                            |
| -m            | --fee             | FLOAT   | False    | The fee in XCH for this transaction                                                                      |
| -w            | --wallet-id       | INTEGER | False    | The wallet id for fees. If no target address given the clawback will go to this wallet id                |
| -t            | --target-address  | TEXT    | False    | The address you want to send the coin to                                                                 |
| -np           | --node-rpc-port   | INTEGER | False    | Set the port where the Node is hosting the RPC interface                                                 |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -db           | --db-path         | TEXT    | False    | Set the path for the database                                                                            |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

:::info

In most cases, if the output of the `clawback show` command contains `Time left: 0 seconds`, this indicates that the Recipient can proceed with the `claim` call.

However, there is a small window of time where the timer has expired, but a block still hasn't been farmed with a timestamp after the expiry. If the Recipient attempts to make the `claim` call during this window, they will receive the following error:

```
You are trying to claim the coin too early
```

In this case, the Recipient needs to wait for one more block to be farmed before proceeding with the `claim` call. As a reminder, a new block is farmed every 18.75 seconds, on average.

:::

<details>
<summary>Example</summary>

First, the Sender creates a new clawback coin with a 60-second timelock:

```bash
clawback create -t txch1czxl4c42kwem8jllm4xp78jt7t0j0pu9uh9xw5jddegcu703xnpsqaaxxx -a 0.1 -l 60 -m 0.000275
```

Result:

```bash
Created Coin with ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
Coin { parent_coin_info: f5e408a15299df27a00d0403ea50ed29a06f87a31b638cff1b63ef3e6060b45a, puzzle_hash: 2e91566d9549cb909109d147c79b457d15ced2d8a24dea5a125b1e5c05cdd1ec, amount: 100000000000 }
```

The Sender can run the `clawback show` command to show the details of each of their clawback coins:

```bash
clawback show
```

Result:

```bash
Updating coin records...


Coin ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 60 seconds
Time left: 23 seconds
```

The timelock expires when the `Time left:` value reaches `0 seconds`:

```bash
clawback show
```

Result:

```bash
Updating coin records...


Coin ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 60 seconds
Time left: 0 seconds
```

For your reference, the Recipient wallet currently has a balance of 0 XCH:

```bash
chia wallet show -f 1231588123
```

Result:

```bash
Wallet height: 2405060
Sync status: Synced
Balances, fingerprint: 1231588123

Chia Wallet:
   -Total Balance:         0.0 txch (0 mojo)
   -Pending Total Balance: 0.0 txch (0 mojo)
   -Spendable:             0.0 txch (0 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

The Recipient (or anyone else) can view the status of the clawback coin if they know the coin ID:

```bash
clawback show -c ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
```

Result:

```bash
Updating coin records...


Coin ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 60 seconds
Time left: 0 seconds
```

The value of `Time left:` is `0 seconds`, which indicates that the Recipient can now run the `clawback claim` command to claim the coin:

```bash
clawback claim -c ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
```

Result:

```bash
Submitted spend to claim coin: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
```

While the `claim` transaction is being processed, it will show in the `Pending Total Balance:` of the Recipient's wallet:

```bash
chia wallet show -f 1231588123
```

Result:

```bash
Wallet height: 2405100
Sync status: Synced
Balances, fingerprint: 1231588123

Chia Wallet:
   -Total Balance:         0.0 txch (0 mojo)
   -Pending Total Balance: 0.1 txch (100000000000 mojo)
   -Spendable:             0.0 txch (0 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

Finally, the Recipient can view the additional balance in their wallet:

```bash
chia wallet show -f 1231588123
```

Result:

```
Wallet height: 2405465
Sync status: Synced
Balances, fingerprint: 1231588123

Chia Wallet:
   -Total Balance:         0.1 txch (100000000000 mojo)
   -Pending Total Balance: 0.1 txch (100000000000 mojo)
   -Spendable:             0.1 txch (100000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

The spend is now complete and can no longer be clawed back. The funds are stored as a standard Chia coin in the Recipient's wallet.

</details>

---

### `claw`

Functionality:

Usage: `clawback claw [OPTIONS]`

Options: Clawback an unclaimed coin

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -c            | --coin-id         | TEXT    | True     | The coin ID for the clawback coin to inspect                                                             |
| -m            | --fee             | FLOAT   | False    | The fee in XCH for this transaction                                                                      |
| -w            | --wallet-id       | INTEGER | False    | The wallet id for fees. If no target address given the clawback will go to this wallet id                |
| -t            | --target-address  | TEXT    | False    | The address you want to sent the clawed back coin to                                                     |
| -np           | --node-rpc-port   | INTEGER | False    | Set the port where the Node is hosting the RPC interface                                                 |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -db           | --db-path         | TEXT    | False    | Set the path for the database                                                                            |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
<summary>Example</summary>

Let's say the following clawback coin exists:

```bash
clawback show
```

Result:

```bash
Updating coin records...


Coin ID: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 600 seconds
Time left: 518 seconds
```

The same public/private key pair that created this coin must be used to claw it back.

The Sender will use the clawback claw command, passing in the ID of the coin to claw back:

```bash
clawback claw -c 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532 -m 0.000275
```

As a result, the clawback coin will be spent, and a new coin will be created in the Sender's wallet:

```bash
Submitted spend to claw back coin: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532
```

To show the status of the clawback, run the `clawback show` command once again:

```bash
clawback show
```

Result:

```bash
Updating coin records...
No coins found
```

</details>

---

### `create`

Functionality: Make a transaction to create a clawback coin

Usage: `clawback create [OPTIONS]`

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -t            | --to              | TEXT    | True     | The recipient's address                                                                                  |
| -l            | --timelock        | INTEGER | False    | The timelock to use for the clawback coin you're creating, in seconds. Default is two weeks              |
| -a            | --amount          | INTEGER | True     | The amount to fund (in XCH)                                                                              |
| -w            | --wallet-id       | INTEGER | False    | The wallet id to send from                                                                               |
| -m            | --fee             | FLOAT   | False    | The fee in XCH for the funding transaction                                                               |
| -np           | --node-rpc-port   | INTEGER | False    | Set the port where the Node is hosting the RPC interface                                                 |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -db           | --db-path         | TEXT    | False    | Set the path for the database                                                                            |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
<summary>Example</summary>

For this example, we will use two wallets: a Sender and a Recipient. The Sender has a balance of 10 TXCH and the Recipient has 0 TXCH.

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

To create the clawback coin from the Sender's wallet, run the `clawback create` command. The `-t` (Recipient's address) and `-a` (amount in XCH/TXCH) flags are required. By default, the clawback coin will be locked for two weeks. For this example, we will override the default by using the `-t` flag to specify a timelock period of 600 seconds. We will also use the `-m` flag to include a fee of 0.000275 TXCH.

:::info

The testnet is constantly being dusted (filled with small transactions) in order to simulate a busy network. Because of this you are always recommended to include a fee with testnet transactions. The 275-million mojo fee from this demo should be sufficient to push your transactions through in the next transaction block.

If you are running on mainnet, a fee of 275 million mojos is likely higher than the recommended amount. The reference wallet GUI will suggest an appropriate fee to be included with all transactions.

:::

The Sender will run the following command in this example (these are only example settings; replace the values as needed):

```bash
clawback create -t txch1czxl4c42kwem8jllm4xp78jt7t0j0pu9uh9xw5jddegcu703xnpsqaaxxx -a 0.1 -l 600 -m 0.000275
```

Result:

```bash
Created Coin with ID: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532
Coin { parent_coin_info: dcedd4d573679302ee3f2a54fb51c437b8156e8cd5b1c3c08d25cadf83292c3d, puzzle_hash: 13cb7ce11775a5b42754fb382eb94c846e4be677e6d55bf665b23c075a54e930, amount: 100000000000 }
```

As a result of running this command, a new clawback coin has been created on the blockchain, the details of which are shown above. To view this coin, along with other clawback coins created by this wallet, run the `clawback show` command:

```bash
clawback show
```

The basic details of the clawback coin are given:

```bash
clawback show
Updating coin records...


Coin ID: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 600 seconds
Time left: 518 seconds
```

</details>

---

### `show`

Functionality: Get details for all clawback coins

Usage: `clawback show [OPTIONS]`

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -c            | --coin-id         | TEXT    | False    | The coin ID for the clawback coin to inspect                                                             |
| -np           | --node-rpc-port   | INTEGER | False    | Set the port where the Node is hosting the RPC interface                                                 |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -db           | --db-path         | TEXT    | False    | Set the path for the database                                                                            |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
<summary>Example 1</summary>

The Sender can show a Clawback coin without passing in the Coin ID:

```bash
clawback show
```

The basic details of the clawback coin are given:

```bash
clawback show
Updating coin records...


Coin ID: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 600 seconds
Time left: 518 seconds
```

</details>

<details>
<summary>Example 2</summary>

Anyone other than the sender needs to pass in the Coin ID in order to show a Clawback coin:

```bash
clawback show -c ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
```

Result:

```bash
Updating coin records...


Coin ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 60 seconds
Time left: 0 seconds
```

</details>
