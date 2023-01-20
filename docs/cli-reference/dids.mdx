---
sidebar_label: DIDs
title: DID CLI
slug: /did-cli
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet"}'
```

To run the same command on Windows, you need to escape the quotes, so it looks like this (the braces have been removed to support the formatting for this page. You still need to use them in your actual commands.):

```powershell
chia rpc wallet create_new_wallet '\"wallet_type\": \"nft_wallet\"'
```

</details>

## Reference

### `create`

Functionality: Create a DID wallet

Usage: chia wallet did create [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -n            | --name            | TEXT    | False    | Set the DID wallet name [default: None]                                                                  |
| -a            | --amount          | INTEGER | False    | Set the DID amount in mojos. Value must be an odd number. [default: 1]                                   |
| -m            | --fee             | TEXT    | False    | Set the fees per transaction, in XCH. [default: 0]                                                       |
| -h            | --help            | None    | False    | Show a help message and exit.                                                                            |

<details>
<summary>Example</summary>

Create a new DID:

```bash
chia wallet did create -n My_DID
```

Response:

```
Successfully created a DID wallet with name My_DID and id 2 on key 4288332900
Successfully created a DID did:chia:17jvhl9z8zj6jma2uxk4mqj22p90hfpf29svlvlyalu8ksyefsvpql7f403 in the newly created DID wallet
```

View your wallet and DID:

```bash
chia wallet show
```

Response:

```
Wallet height: 1117451
Sync status: Synced
Balances, fingerprint: 4288332900

Chia Wallet:
   -Total Balance:         0.999989999992 txch (999989999992 mojo)
   -Pending Total Balance: 0.999989999991 txch (999989999991 mojo)
   -Spendable:             0.0 txch (0 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

My_DID:
   -Total Balance:         0.0
   -Pending Total Balance: 1.0
   -Spendable:             0.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:17jvhl9z8zj6jma2uxk4mqj22p90hfpf29svlvlyalu8ksyefsvpql7f403
   -Wallet ID:             2
```

</details>

---

### `get_did`

Functionality: Get the DID and Coin ID for a DID wallet

Usage: chia wallet did get_did [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id              | INTEGER | True     | ID of the wallet to use                                                                                  |
| -h            | --help            | None    | False    | Show a help message and exit.                                                                            |

<details>
<summary>Example</summary>

Get info for DID with ID 2:

```bash
chia wallet did get_did -i 2
```

Response:

```
DID:                    did:chia:17jvhl9z8zj6jma2uxk4mqj22p90hfpf29svlvlyalu8ksyefsvpql7f403
Coin ID:                0xe6c28c30c7dd2801a4cbfdb0e61186315ae9695dde0a75a6901c1394c3300db8
```

</details>

---

### `set_name`

Functionality: Get the DID and Coin ID for a DID wallet

Usage: chia wallet did get_did [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id              | INTEGER | True     | ID of the wallet to use                                                                                  |
| -n            | --name            | TEXT    | True     | Set the DID wallet name                                                                                  |
| -h            | --help            | None    | False    | Show a help message and exit.                                                                            |

<details>
<summary>Example</summary>

Set the name for Wallet ID 2 to `New Name`:

```bash
chia wallet did set_name -i 2 -n "New Name"
```

Response:

```
Successfully set a new name for DID wallet with id 2: New Name
```

Confirm changes:

```
chia wallet show
```

Response:

```
Wallet height: 1117563
Sync status: Synced
Balances, fingerprint: 4288332900

Chia Wallet:
   -Total Balance:         0.999989999991 txch (999989999991 mojo)
   -Pending Total Balance: 0.999989999991 txch (999989999991 mojo)
   -Spendable:             0.999989999991 txch (999989999991 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

New Name:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:17jvhl9z8zj6jma2uxk4mqj22p90hfpf29svlvlyalu8ksyefsvpql7f403
   -Wallet ID:             2

Connections:
Type      IP                                     Ports       NodeID      Last Connect      MiB Up|Dwn
FULL_NODE 127.0.0.1                              58444/58444 f40100b8... Jun 15 12:22:02      0.0|1.7
                                                 -Height: No Info    -Hash: No Info    -Trusted: True
```

</details>

---

### `sign_message`

Functionality: Sign a message using a specified DID ID. This command does not modify the blockchain.

Usage: chia wallet nft sign_message [OPTIONS]

Options:

| Short Command | Long Command                  | Type    | Required | Description                                                                                              |
| :------------ | :---------------------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port             | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint                 | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --did_id                      | TEXT    | True     | DID ID you want to use for signing                                                                       |
| -m            | --hex_message                 | TEXT    | True     | The message you want to sign                                                                             |
| -h            | --help                        | None    | False    | Show a help message and exit                                                                             |

<details>
   <summary>Example</summary>

```bash
chia wallet did sign_message -f 590161281 -i did:chia:1cxw5dqug4gavvgylx88zfkmqv235ryr6j9tvyjwwuga0pa52wjvqavdyar --hex_message "This is a test message."
```

Response:

```
Message: This is a test message.
Public Key: b478c6a0ef7410679831d616d06e9fca856f6e08b8a6f13f344cc9aa20981ab7fe287663584e2fc53e2ac14edab883ca
Signature: 981ed9b983440c06ae5d9f2f2a0f45c0a00015939d30f512364f44597dc381007ee6911d9320d3c991d5a795823e429f06f35117b1e51c4c30454af19c69f2399e30bff5ea109bc5b95f869f48f2e32d0beccfcbbe72b384903536d3aeed848d
```

</details>
