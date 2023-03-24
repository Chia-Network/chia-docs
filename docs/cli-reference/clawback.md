---
slug: /clawback_cli
title: Clawback
---

## Intro

This page includes a comprehensive list of Chia's Command Line Interface commands for using the clawback primitive.

For more info, see the following:

[todo]

## Reference

## `clawback`

Functionality: Get info about the `clawback` command

Usage: `clawback [OPTIONS] COMMAND [ARGS]`

Options:

| Short Command | Long Command | Type | Required | Description                                                          |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------- |
|               | --version    | None | False    | Show the version and exit
| -h            | --help       | None | False    | Show a help message and exit                                         |

Commands:

| Name   | Description                                         |
| :----- | :-------------------------------------------------- |
| claim  | Claim a clawback coin after the timelock has passed |
| claw   | Clawback an unclaimed coin                          |
| create | Send xch to a clawback coin                         |
| show   | Show details of all clawback coins                  |

<details>
<summary>Example 1</summary>

Request:

```bash
clawback --version
```

Response:

```
clawback, version 0.1.dev12
```

</details>

<details>
<summary>Example 2</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 3</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 4</summary>

Request:

```bash

```

Response:

```

```

</details>

---

### `claim`

Functionality: Claim a clawback coin after the timelock has passed

Usage: `clawback claim [OPTIONS]`

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -c            | --coin-id         | TEXT    | True     | The coin ID you want to claim                                                                            |
| -d            | --fee             | INTEGER | False    | The fee in mojos for this transaction                                                                    |
| -w            | --wallet-id       | INTEGER | False    | The wallet id for fees. If no target address given the clawback will go to this wallet id                |
| -t            | --target-address  | TEXT    | False    | The address you want to send the coin to                                                                 |
| -np           | --node-rpc-port   | INTEGER | False    | Set the port where the Node is hosting the RPC interface                                                 |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -db           | --db-path         | TEXT    | False    | Set the path for the database                                                                            |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
<summary>Example 1</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 2</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 3</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 4</summary>

Request:

```bash

```

Response:

```

```

</details>

---

### `claw`

Functionality: 

Usage: `clawback claw [OPTIONS]`

Options: Clawback an unclaimed coin

| Short Command | Long Command      | Type    | Required | Description                                                          |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------- |
| -c            | --coin-id         | TEXT    | True     | The coin ID you want to claw back |
| -d            | --fee             | INTEGER | False    | The fee in mojos for this transaction
| -w            | --wallet-id       | INTEGER | False    | The wallet id for fees. If no target address given the clawback will go to this wallet id
| -t            | --target-address  | TEXT    | False    | The address you want to sent the clawed back coin to
| -np           | --node-rpc-port   | INTEGER | False    | Set the port where the Node is hosting the RPC interface
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml
| -db           | --db-path         | TEXT    | False    | Set the path for the database
| -h            | --help            | None    | False    | Show a help message and exit                                         |

<details>
<summary>Example 1</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 2</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 3</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 4</summary>

Request:

```bash

```

Response:

```

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
| -l            | --timelock        | INTEGER | False    | The timelock to use for the clawback coin you're creating, in seconds. Default is two weeks                                |
| -a            | --amount          | INTEGER | True     | The amount to fund                                                                                       |
| -w            | --wallet-id       | INTEGER | False    | The wallet id to send from                                                                               |
| -d            | --fee             | INTEGER | False    | The fee for the funding transaction                                                                      |
| -np           | --node-rpc-port   | INTEGER | False    | Set the port where the Node is hosting the RPC interface                                                 |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -db           | --db-path         | TEXT    | False    | Set the path for the database                                                                            |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
<summary>Example 1</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 2</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 3</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 4</summary>

Request:

```bash

```

Response:

```

```

</details>

---

### `show`

Functionality: Get details for all clawback coins

Usage: `clawback show [OPTIONS]`

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -c            | --coin-id         | TEXT    | False    | The coin ID you want to claw back                                                                        |
| -np           | --node-rpc-port   | INTEGER | False    | Set the port where the Node is hosting the RPC interface                                                 |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -db           | --db-path         | TEXT    | False    | Set the path for the database                                                                            |
| -h            | --help            | None    | False    | Show a help message and exit                                         |                                   |

<details>
<summary>Example 1</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 2</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 3</summary>

Request:

```bash

```

Response:

```

```

</details>

<details>
<summary>Example 4</summary>

Request:

```bash

```

Response:

```

```

</details>
