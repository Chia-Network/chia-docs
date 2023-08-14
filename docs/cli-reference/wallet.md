---
sidebar_label: Wallet
title: Wallet CLI
slug: /wallet-cli
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This document is a reference for Chia's `wallet` CLI commands. The following `wallet` commands are documented on their own dedicated pages:

- [DIDs](/did-cli) (Decentralized Identifiers)
- [NFTs](/nft-cli) (Non-Fungible Tokens)
- [Offers](/offer-cli)

## Reference

## `add_token`

Functionality: Add/Rename a CAT to the wallet by its asset ID

Usage: chia wallet add_token [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -id           | --asset-id        | TEXT    | True     | The Asset ID of the coin you wish to add/rename (the treehash of the TAIL program)                           |
| -n            | --token-name      | TEXT    | False    | The name you wish to designate to the token                                                                  |
| -f            | --fingerprint     | INTEGER | False    | The wallet fingerprint you wish to add the token to                                                          |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

<details>
<summary>Example</summary>

Add the Spacebucks token:

```bash
chia wallet add_token --asset-id a628c1c2c6fcb74d53746157e438e108eab5c0bb3e5c80ff9b1910b3e4832913 --token-name Spacebucks --fingerprint 2121994410
```

Response:

```
Successfully added Spacebucks with wallet id 3 on key 2121994410
```

</details>

---

## coins:

Functionality: List, split, and combine your wallet's coins

### `list`

Functionality: List coins in a wallet, with options for filtering

Usage: chia wallet coins list [OPTIONS]

Options:

| Short Command | Long Command       | Type    | Required | Description                                                                                                       |
| :------------ | :----------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------- |
| -p            | --wallet-rpc-port  | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml      |
| -f            | --fingerprint      | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                                |
| -i            | --id               | INTEGER | False    | Id of the wallet to use [default: 1]                                                                              |
| -u            | --show-unconfirmed | BOOLEAN | False    | Separately display unconfirmed coins [default: false]                                                             |
|               | --min-amount       | TEXT    | False    | Ignore coins worth less then this much (XCH or CAT units)                                                         |
|               | --max-amount       | TEXT    | False    | Ignore coins worth more then this much (XCH or CAT units)                                                         |
|               | --exclude-coin     | TEXT    | False    | Prevent this coin from being included (can be reused to exclude multiple coins)                                   |
|               | --exclude-amount   | TEXT    | False    | Exclude any coins with this amount from being included (can be reused to exclude multiple amounts)                |
|               | --paginate         | None    | False    | Prompt for each page of data. Defaults to enabled for interactive consoles, otherwise defaults to disabled        |
|               | --no-paginate      | None    | False    | Do not prompt for each page of data. Defaults to disabled for interactive consoles, otherwise defaults to enabled |
| -h            | --help             | None    | False    | Show a help message and exit                                                                                      |

:::info

By default, it you have more than 200 unspent coins worth less than one million mojos in your wallet, the dust filter will be activated.
Any coins that have been filtered will not be listed.
You can disable the dust filter by editing `~/.chia/mainnet/config/config.yaml` and changing the value of `xch_spam_amount` to `0`.
[More info on the dust filter](/faq#what-is-the-dust-filter).

:::

Example 1 will give a baseline:

<details>
<summary>Example 1</summary>

List all coins for a given fingerprint:

```bash
chia wallet coins list -f 590161281
```

In the response, note that pagination is enabled by default:

```
There are a total of 7 coins in wallet 1.
7 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0xdd4e3bf8bd9f5079ca90315ed36fde77af0c04352a296b397bcdaff655ce3e35
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000010000000  (10000000 mojo), Confirmed in block: 2767623

Coin ID: 0xf3b39365c6740a06bae6fe0e94405c8a2679d4bccd1abb725d4338bbc8800156
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2767579

Coin ID: 0x242e1c68d1cd5c151c77702006596efc65e733c1803c3aa5617203f39904db54
        Address: xch1cdw9mgrzw9aa0rskg023wuf9pmqh87qakv4jwlenwxfddu88mqusg990d4 Amount: 0.241499799999  (241499799999 mojo), Confirmed in block: 2768188

Coin ID: 0x976c7291b6c946a425b57ae21b7f5c5fe1a5c122fa797d6fa598d8931541f833
        Address: xch1m66vmtxm3xlerru7r49l7sfurphlusxywrkkl8q5a5mwvemwjawqq5ygjp Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2768188

Coin ID: 0x2749503fb302b9654fc9f0dabd88787083ad341aaeee4a2bac113feb92ae59fc
        Address: xch1q94gd4hd62ecx08d0kuagmp5cr8umrwtcvatfupmd7uyzhuf4c4sy2zd46 Amount: 0.000000099999  (99999 mojo), Confirmed in block: 2767579

Press q to quit, or c to continue
c
Coin ID: 0x8ac5ff2d0ea13f61de631c7519581f030c3236710e5ea62c81a03182da4b7984
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.249979799998  (249979799998 mojo), Confirmed in block: 2767623

Coin ID: 0x1c51b470e3fc7f97e155fd72e464f2192426d35857d78777a2a9c08358252eeb
        Address: xch15pmsqc28x3vgms4ma3z0x4t5qh9hkalqnay8fz9rmvph2lfh575qzerres Amount: 0.500000000000  (500000000000 mojo), Confirmed in block: 2735639
```

</details>

The following examples all use the same coin state that was obtained in Example 1:

<details>
<summary>Example 2: exclude small coins</summary>

Exclude coins smaller than 0.1 XCH:

```bash
chia wallet coins list -f 590161281 --min-amount 0.1
```

Response:

```bash
There are a total of 3 coins in wallet 1.
3 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0x242e1c68d1cd5c151c77702006596efc65e733c1803c3aa5617203f39904db54
        Address: xch1cdw9mgrzw9aa0rskg023wuf9pmqh87qakv4jwlenwxfddu88mqusg990d4 Amount: 0.241499799999  (241499799999 mojo), Confirmed in block: 2768188

Coin ID: 0x8ac5ff2d0ea13f61de631c7519581f030c3236710e5ea62c81a03182da4b7984
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.249979799998  (249979799998 mojo), Confirmed in block: 2767623

Coin ID: 0x1c51b470e3fc7f97e155fd72e464f2192426d35857d78777a2a9c08358252eeb
        Address: xch15pmsqc28x3vgms4ma3z0x4t5qh9hkalqnay8fz9rmvph2lfh575qzerres Amount: 0.500000000000  (500000000000 mojo), Confirmed in block: 2735639
```

</details>

<details>
<summary>Example 3: exclude large coins</summary>

Exclude coins larger than 0.00001 XCH. Note that there is one coin of exactly that value. It is included:

```bash
 chia wallet coins list -f 590161281 --max-amount 0.00001
```

Response:

```bash
There are a total of 4 coins in wallet 1.
4 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0xdd4e3bf8bd9f5079ca90315ed36fde77af0c04352a296b397bcdaff655ce3e35
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000010000000  (10000000 mojo), Confirmed in block: 2767623

Coin ID: 0xf3b39365c6740a06bae6fe0e94405c8a2679d4bccd1abb725d4338bbc8800156
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2767579

Coin ID: 0x976c7291b6c946a425b57ae21b7f5c5fe1a5c122fa797d6fa598d8931541f833
        Address: xch1m66vmtxm3xlerru7r49l7sfurphlusxywrkkl8q5a5mwvemwjawqq5ygjp Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2768188

Coin ID: 0x2749503fb302b9654fc9f0dabd88787083ad341aaeee4a2bac113feb92ae59fc
        Address: xch1q94gd4hd62ecx08d0kuagmp5cr8umrwtcvatfupmd7uyzhuf4c4sy2zd46 Amount: 0.000000099999  (99999 mojo), Confirmed in block: 2767579
```

</details>

<details>
<summary>Example 4: exclude specific coins</summary>

Use the `--exclude-coin` flag multiple times to exclude individual coins:

```bash
chia wallet coins list -f 590161281 --exclude-coin 0xdd4e3bf8bd9f5079ca90315ed36fde77af0c04352a296b397bcdaff655ce3e35 --exclude-coin 0xf3b39365c6740a06bae6fe0e94405c8a2679d4bccd1abb725d4338bbc8800156
```

Response:

```bash
There are a total of 5 coins in wallet 1.
5 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0x242e1c68d1cd5c151c77702006596efc65e733c1803c3aa5617203f39904db54
        Address: xch1cdw9mgrzw9aa0rskg023wuf9pmqh87qakv4jwlenwxfddu88mqusg990d4 Amount: 0.241499799999  (241499799999 mojo), Confirmed in block: 2768188

Coin ID: 0x976c7291b6c946a425b57ae21b7f5c5fe1a5c122fa797d6fa598d8931541f833
        Address: xch1m66vmtxm3xlerru7r49l7sfurphlusxywrkkl8q5a5mwvemwjawqq5ygjp Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2768188

Coin ID: 0x2749503fb302b9654fc9f0dabd88787083ad341aaeee4a2bac113feb92ae59fc
        Address: xch1q94gd4hd62ecx08d0kuagmp5cr8umrwtcvatfupmd7uyzhuf4c4sy2zd46 Amount: 0.000000099999  (99999 mojo), Confirmed in block: 2767579

Coin ID: 0x8ac5ff2d0ea13f61de631c7519581f030c3236710e5ea62c81a03182da4b7984
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.249979799998  (249979799998 mojo), Confirmed in block: 2767623

Coin ID: 0x1c51b470e3fc7f97e155fd72e464f2192426d35857d78777a2a9c08358252eeb
        Address: xch15pmsqc28x3vgms4ma3z0x4t5qh9hkalqnay8fz9rmvph2lfh575qzerres Amount: 0.500000000000  (500000000000 mojo), Confirmed in block: 2735639
```

</details>

<details>
<summary>Example 5: exclude specific amounts</summary>

Use the `--exclude-amount` flag multiple times to exclude specific amounts. Note that if multiple coins have the same amount, they will all be excluded:

```bash
chia wallet coins list -f 590161281 --exclude-amount 0.0000001 --exclude-amount 0.241499799999
```

Response:

```bash
There are a total of 4 coins in wallet 1.
4 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0xdd4e3bf8bd9f5079ca90315ed36fde77af0c04352a296b397bcdaff655ce3e35
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000010000000  (10000000 mojo), Confirmed in block: 2767623

Coin ID: 0x2749503fb302b9654fc9f0dabd88787083ad341aaeee4a2bac113feb92ae59fc
        Address: xch1q94gd4hd62ecx08d0kuagmp5cr8umrwtcvatfupmd7uyzhuf4c4sy2zd46 Amount: 0.000000099999  (99999 mojo), Confirmed in block: 2767579

Coin ID: 0x8ac5ff2d0ea13f61de631c7519581f030c3236710e5ea62c81a03182da4b7984
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.249979799998  (249979799998 mojo), Confirmed in block: 2767623

Coin ID: 0x1c51b470e3fc7f97e155fd72e464f2192426d35857d78777a2a9c08358252eeb
        Address: xch15pmsqc28x3vgms4ma3z0x4t5qh9hkalqnay8fz9rmvph2lfh575qzerres Amount: 0.500000000000  (500000000000 mojo), Confirmed in block: 2735639
```

</details>

<details>
<summary>Example 6: disable pagination</summary>

The `--no-paginate` flag will cause _all_ coins to be listed with no additional input from the user:

```bash
chia wallet coins list -f 590161281 --no-paginate
```

Response:

```bash
There are a total of 7 coins in wallet 1.
7 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0xdd4e3bf8bd9f5079ca90315ed36fde77af0c04352a296b397bcdaff655ce3e35
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000010000000  (10000000 mojo), Confirmed in block: 2767623

Coin ID: 0xf3b39365c6740a06bae6fe0e94405c8a2679d4bccd1abb725d4338bbc8800156
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2767579

Coin ID: 0x242e1c68d1cd5c151c77702006596efc65e733c1803c3aa5617203f39904db54
        Address: xch1cdw9mgrzw9aa0rskg023wuf9pmqh87qakv4jwlenwxfddu88mqusg990d4 Amount: 0.241499799999  (241499799999 mojo), Confirmed in block: 2768188

Coin ID: 0x976c7291b6c946a425b57ae21b7f5c5fe1a5c122fa797d6fa598d8931541f833
        Address: xch1m66vmtxm3xlerru7r49l7sfurphlusxywrkkl8q5a5mwvemwjawqq5ygjp Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2768188

Coin ID: 0x2749503fb302b9654fc9f0dabd88787083ad341aaeee4a2bac113feb92ae59fc
        Address: xch1q94gd4hd62ecx08d0kuagmp5cr8umrwtcvatfupmd7uyzhuf4c4sy2zd46 Amount: 0.000000099999  (99999 mojo), Confirmed in block: 2767579

Coin ID: 0x8ac5ff2d0ea13f61de631c7519581f030c3236710e5ea62c81a03182da4b7984
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.249979799998  (249979799998 mojo), Confirmed in block: 2767623

Coin ID: 0x1c51b470e3fc7f97e155fd72e464f2192426d35857d78777a2a9c08358252eeb
        Address: xch15pmsqc28x3vgms4ma3z0x4t5qh9hkalqnay8fz9rmvph2lfh575qzerres Amount: 0.500000000000  (500000000000 mojo), Confirmed in block: 2735639
```

</details>

---

### `combine`

Functionality: Combine coins (typically used for combining dust). The maximum number of coins that can be combined within a single transaction is 500.

Usage: chia wallet coins combine [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                                                            |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| -p            | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml                                           |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                                                                     |
| -i            | --id              | INTEGER | False    | ID of the wallet to use [default: 1]                                                                                                                   |
| -a            | --target-amount   | TEXT    | False    | Select coins until this amount (in XCH or CAT) is reached. Combine all selected coins into one coin, which will have a value of at least target-amount |
|               | --min-amount      | TEXT    | False    | Ignore coins worth less then this much XCH or CAT units [default: disabled]                                                                            |
|               | --exclude-amount  | TEXT    | False    | Exclude any coins with this amount from being included (can be reused                                                                                  |
| -n            | --number-of-coins | INTEGER | False    | The number of coins we are combining [default: 500]                                                                                                    |
|               | --max-amount      | TEXT    | False    | Ignore coins worth more then this much XCH or CAT units [default: disabled]                                                                            |
| -m            | --fee             | TEXT    | False    | Set the fees for the transaction, in XCH [default: 0]                                                                                                  |
|               | --input-coin      | TEXT    | False    | Only combine coins with these ids (can be reused)                                                                                                      |
|               | --largest-first   | None    | False    | Sort coins from largest to smallest [default: smallest-first]                                                                                          |
|               | --smallest-first  | None    | False    | Sort coins from smallest to largest (this is the default behavior)                                                                                     |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                                                           |

<details>
<summary>Example 1: specific coins</summary>

First, list all coins, without pagination:

```bash
chia wallet coins list -f 590161281 --no-paginate
```

Result:

```bash
There are a total of 7 coins in wallet 1.
7 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0xdd4e3bf8bd9f5079ca90315ed36fde77af0c04352a296b397bcdaff655ce3e35
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000010000000  (10000000 mojo), Confirmed in block: 2767623

Coin ID: 0xf3b39365c6740a06bae6fe0e94405c8a2679d4bccd1abb725d4338bbc8800156
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2767579

Coin ID: 0x976c7291b6c946a425b57ae21b7f5c5fe1a5c122fa797d6fa598d8931541f833
        Address: xch1m66vmtxm3xlerru7r49l7sfurphlusxywrkkl8q5a5mwvemwjawqq5ygjp Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2768188

Coin ID: 0x2749503fb302b9654fc9f0dabd88787083ad341aaeee4a2bac113feb92ae59fc
        Address: xch1q94gd4hd62ecx08d0kuagmp5cr8umrwtcvatfupmd7uyzhuf4c4sy2zd46 Amount: 0.000000099999  (99999 mojo), Confirmed in block: 2767579

Coin ID: 0x8ac5ff2d0ea13f61de631c7519581f030c3236710e5ea62c81a03182da4b7984
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.249979799998  (249979799998 mojo), Confirmed in block: 2767623

Coin ID: 0x1c51b470e3fc7f97e155fd72e464f2192426d35857d78777a2a9c08358252eeb
        Address: xch15pmsqc28x3vgms4ma3z0x4t5qh9hkalqnay8fz9rmvph2lfh575qzerres Amount: 0.500000000000  (500000000000 mojo), Confirmed in block: 2735639

Coin ID: 0xc1d5123dc10d3fb949df266a51c0591fe87c9914157cc82e248cd5e2f4b09965
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.241499799999  (241499799999 mojo), Confirmed in block: 3064891
```

Next, select two specific coins to combine, and supply a 1000-mojo blockchain fee:

```
chia wallet coins combine -f 590161281 --input-coin 0xdd4e3bf8bd9f5079ca90315ed36fde77af0c04352a296b397bcdaff655ce3e35 --input-coin 0x2749503fb302b9654fc9f0dabd88787083ad341aaeee4a2bac113feb92ae59fc --fee 0.000000001
```

Response:

```bash
Combining 2 coins.
Would you like to Continue? (y/n): y
Transaction sent: dfc2ff46fd6cd2923371096d8e2b98d65dcfec25156dd53a15a4dedf4b4a8085
To get status, use command: chia wallet get_transaction -f 590161281 -tx 0xdfc2ff46fd6cd2923371096d8e2b98d65dcfec25156dd53a15a4dedf4b4a8085
```

Get the status of this command:

```bash
chia wallet get_transaction -f 590161281 -tx 0xdfc2ff46fd6cd2923371096d8e2b98d65dcfec25156dd53a15a4dedf4b4a8085
```

Result:

```bash
Transaction dfc2ff46fd6cd2923371096d8e2b98d65dcfec25156dd53a15a4dedf4b4a8085
Status: Confirmed
Amount sent: 0.000010098999 XCH
To address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu
Created at: 2023-01-05 12:51:05
```

After the transaction has been confirmed, show all coins once again:

```bash
chia wallet coins list -f 590161281 --no-paginate
```

The two specified coins have been combined (see the last coin in the list), and 1000 mojos has been deducted as a blockchain fee:

```bash
There are a total of 6 coins in wallet 1.
6 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0xf3b39365c6740a06bae6fe0e94405c8a2679d4bccd1abb725d4338bbc8800156
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2767579

Coin ID: 0x976c7291b6c946a425b57ae21b7f5c5fe1a5c122fa797d6fa598d8931541f833
        Address: xch1m66vmtxm3xlerru7r49l7sfurphlusxywrkkl8q5a5mwvemwjawqq5ygjp Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2768188

Coin ID: 0x8ac5ff2d0ea13f61de631c7519581f030c3236710e5ea62c81a03182da4b7984
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.249979799998  (249979799998 mojo), Confirmed in block: 2767623

Coin ID: 0x1c51b470e3fc7f97e155fd72e464f2192426d35857d78777a2a9c08358252eeb
        Address: xch15pmsqc28x3vgms4ma3z0x4t5qh9hkalqnay8fz9rmvph2lfh575qzerres Amount: 0.500000000000  (500000000000 mojo), Confirmed in block: 2735639

Coin ID: 0xc1d5123dc10d3fb949df266a51c0591fe87c9914157cc82e248cd5e2f4b09965
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.241499799999  (241499799999 mojo), Confirmed in block: 3064891

Coin ID: 0xbeaf029a3a09792d5f77193c7efa1de09d46e85dde0e0acdb5e53e41237ccf1a
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.000010098999  (10098999 mojo), Confirmed in block: 3064913
```

</details>

<details>
<summary>Example 2: enable min/max thresholds</summary>

Start by listing all coins, with pagination disabled:

```bash
chia wallet coins list -f 590161281 --no-paginate
```

Response:

```bash
There are a total of 6 coins in wallet 1.
6 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0xf3b39365c6740a06bae6fe0e94405c8a2679d4bccd1abb725d4338bbc8800156
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2767579

Coin ID: 0x976c7291b6c946a425b57ae21b7f5c5fe1a5c122fa797d6fa598d8931541f833
        Address: xch1m66vmtxm3xlerru7r49l7sfurphlusxywrkkl8q5a5mwvemwjawqq5ygjp Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2768188

Coin ID: 0x8ac5ff2d0ea13f61de631c7519581f030c3236710e5ea62c81a03182da4b7984
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.249979799998  (249979799998 mojo), Confirmed in block: 2767623

Coin ID: 0x1c51b470e3fc7f97e155fd72e464f2192426d35857d78777a2a9c08358252eeb
        Address: xch15pmsqc28x3vgms4ma3z0x4t5qh9hkalqnay8fz9rmvph2lfh575qzerres Amount: 0.500000000000  (500000000000 mojo), Confirmed in block: 2735639

Coin ID: 0xc1d5123dc10d3fb949df266a51c0591fe87c9914157cc82e248cd5e2f4b09965
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.241499799999  (241499799999 mojo), Confirmed in block: 3064891

Coin ID: 0xbeaf029a3a09792d5f77193c7efa1de09d46e85dde0e0acdb5e53e41237ccf1a
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.000010098999  (10098999 mojo), Confirmed in block: 3064913
```

Combine all coins worth at least 0.1 XCH and at most 0.25 XCH. Add a 1000-mojo blockchain fee:

```bash
chia wallet coins combine -f 590161281 --min-amount 0.1 --max-dust-amount 0.25 --fee 0.000000001
```

Response:

```bash
Combining 2 coins.
Would you like to Continue? (y/n): y
Transaction sent: 899eda2f67bf70261599629be19c3b6b1c4657e3fb1f6bc18d6690f92ee6bdfa
To get status, use command: chia wallet get_transaction -f 590161281 -tx 0x899eda2f67bf70261599629be19c3b6b1c4657e3fb1f6bc18d6690f92ee6bdfa
```

Show the result of the transaction:

```bash
chia wallet get_transaction -f 590161281 -tx 0x899eda2f67bf70261599629be19c3b6b1c4657e3fb1f6bc18d6690f92ee6bdfa
```

Response:

```bash
Transaction 899eda2f67bf70261599629be19c3b6b1c4657e3fb1f6bc18d6690f92ee6bdfa
Status: Confirmed
Amount sent: 0.491479598997 XCH
To address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu
Created at: 2023-01-05 12:59:27
```

After the transaction has completed, list all coins once again. The two coins between the min and max thresholds have been combined, minus a 1000-mojo blockchain fee:

```bash
chia wallet coins list -f 590161281 --no-paginate
```

Response:

```bash
There are a total of 5 coins in wallet 1.
5 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0xf3b39365c6740a06bae6fe0e94405c8a2679d4bccd1abb725d4338bbc8800156
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2767579

Coin ID: 0x976c7291b6c946a425b57ae21b7f5c5fe1a5c122fa797d6fa598d8931541f833
        Address: xch1m66vmtxm3xlerru7r49l7sfurphlusxywrkkl8q5a5mwvemwjawqq5ygjp Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2768188

Coin ID: 0x1c51b470e3fc7f97e155fd72e464f2192426d35857d78777a2a9c08358252eeb
        Address: xch15pmsqc28x3vgms4ma3z0x4t5qh9hkalqnay8fz9rmvph2lfh575qzerres Amount: 0.500000000000  (500000000000 mojo), Confirmed in block: 2735639

Coin ID: 0x25eb90a2a8cba2a9f0e3ddac8850f2861815856776109beedbbaa3db483be14a
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.491479598997  (491479598997 mojo), Confirmed in block: 3064939

Coin ID: 0xbeaf029a3a09792d5f77193c7efa1de09d46e85dde0e0acdb5e53e41237ccf1a
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.000010098999  (10098999 mojo), Confirmed in block: 3064913
```

</details>

<details>
<summary>Example 3: combine the two smallest coins</summary>

Start by listing all coins, with pagination disabled:

```bash
chia wallet coins list -f 590161281 --no-paginate
```

Response:

```bash
chia wallet coins list -f 590161281 --no-paginate
There are a total of 5 coins in wallet 1.
5 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0xf3b39365c6740a06bae6fe0e94405c8a2679d4bccd1abb725d4338bbc8800156
        Address: xch133pklxpat09ahykk6q56gyfa5kq09lzrh9p7jtwlq65l2njl2qpsz036vx Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2767579

Coin ID: 0x976c7291b6c946a425b57ae21b7f5c5fe1a5c122fa797d6fa598d8931541f833
        Address: xch1m66vmtxm3xlerru7r49l7sfurphlusxywrkkl8q5a5mwvemwjawqq5ygjp Amount: 0.000000100000  (100000 mojo), Confirmed in block: 2768188

Coin ID: 0x1c51b470e3fc7f97e155fd72e464f2192426d35857d78777a2a9c08358252eeb
        Address: xch15pmsqc28x3vgms4ma3z0x4t5qh9hkalqnay8fz9rmvph2lfh575qzerres Amount: 0.500000000000  (500000000000 mojo), Confirmed in block: 2735639

Coin ID: 0x25eb90a2a8cba2a9f0e3ddac8850f2861815856776109beedbbaa3db483be14a
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.491479598997  (491479598997 mojo), Confirmed in block: 3064939

Coin ID: 0xbeaf029a3a09792d5f77193c7efa1de09d46e85dde0e0acdb5e53e41237ccf1a
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.000010098999  (10098999 mojo), Confirmed in block: 3064913
```

Combine the two smallest coins, with a 1000-mojo blockchain fee:

```bash
chia wallet coins combine -f 590161281 --number-of-coins 2 --fee 0.000000001
```

Response:

```bash
Combining 2 coins.
Would you like to Continue? (y/n): y
Transaction sent: efa130a51d877f57a93fa45835f1d95a77f17ff50eb82adfe457eae14a952c21
To get status, use command: chia wallet get_transaction -f 590161281 -tx 0xefa130a51d877f57a93fa45835f1d95a77f17ff50eb82adfe457eae14a952c21
```

Get the status of the transaction:

```bash
chia wallet get_transaction -f 590161281 -tx 0xefa130a51d877f57a93fa45835f1d95a77f17ff50eb82adfe457eae14a952c21
```

Response:

```bash
Transaction efa130a51d877f57a93fa45835f1d95a77f17ff50eb82adfe457eae14a952c21
Status: Confirmed
Amount sent: 1.99E-7 XCH
To address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu
Created at: 2023-01-05 13:24:28
```

After the transaction has been confirmed, list the coins again:

```bash
chia wallet coins list -f 590161281 --no-paginate
```

The two smallest coins have been combined, along with a 1000-mojo blockchain fee:

```bash
There are a total of 4 coins in wallet 1.
4 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0x25eb90a2a8cba2a9f0e3ddac8850f2861815856776109beedbbaa3db483be14a
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.491479598997  (491479598997 mojo), Confirmed in block: 3064939

Coin ID: 0x1c51b470e3fc7f97e155fd72e464f2192426d35857d78777a2a9c08358252eeb
        Address: xch15pmsqc28x3vgms4ma3z0x4t5qh9hkalqnay8fz9rmvph2lfh575qzerres Amount: 0.500000000000  (500000000000 mojo), Confirmed in block: 2735639

Coin ID: 0x7934503c149a124a67888891fb2a7f813b5a5afe40d38384f6986fb3e3eec5fe
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.000000199000  (199000 mojo), Confirmed in block: 3065014

Coin ID: 0xbeaf029a3a09792d5f77193c7efa1de09d46e85dde0e0acdb5e53e41237ccf1a
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.000010098999  (10098999 mojo), Confirmed in block: 3064913
```

</details>

<details>
<summary>Example 4: largest first / target amount</summary>

Start by listing all coins, with pagination disabled:

```bash
chia wallet coins list -f 590161281 --no-paginate
```

```bash
There are a total of 4 coins in wallet 1.
4 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0x25eb90a2a8cba2a9f0e3ddac8850f2861815856776109beedbbaa3db483be14a
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.491479598997  (491479598997 mojo), Confirmed in block: 3064939

Coin ID: 0x1c51b470e3fc7f97e155fd72e464f2192426d35857d78777a2a9c08358252eeb
        Address: xch15pmsqc28x3vgms4ma3z0x4t5qh9hkalqnay8fz9rmvph2lfh575qzerres Amount: 0.500000000000  (500000000000 mojo), Confirmed in block: 2735639

Coin ID: 0x7934503c149a124a67888891fb2a7f813b5a5afe40d38384f6986fb3e3eec5fe
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.000000199000  (199000 mojo), Confirmed in block: 3065014

Coin ID: 0xbeaf029a3a09792d5f77193c7efa1de09d46e85dde0e0acdb5e53e41237ccf1a
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.000010098999  (10098999 mojo), Confirmed in block: 3064913
```

Combine coins until their value is at least 0.6, starting with the largest coin. Include a 1000-mojo blockchain fee:

```bash
chia wallet coins combine -f 590161281 --largest-first --target-amount 0.6 --fee 0.000000001
```

Response:

```bash
Combining 2 coins.
Would you like to Continue? (y/n): y
Transaction sent: 5fa8b6393d876a11a05768f06b84032f2bf20b81c6239b189c11187fab477cbb
To get status, use command: chia wallet get_transaction -f 590161281 -tx 0x5fa8b6393d876a11a05768f06b84032f2bf20b81c6239b189c11187fab477cbb
```

After the transaction has been confirmed, show all coins again:

```bash
chia wallet coins list -f 590161281 --no-paginate
```

The largest coin was selected first. This coin's value was less than 0.6, so the next largest coin was selected. The total was greater than 0.6, so only those two coins were combined, and a 1000-mojo fee was deducted from the resulting coin:

```bash
There are a total of 3 coins in wallet 1.
3 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0xc58618fd5c30245291377901d3b911fe0ee7e826b28ae4875e60a2fd09d6fc52
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.991479597997  (991479597997 mojo), Confirmed in block: 3065287

Coin ID: 0x7934503c149a124a67888891fb2a7f813b5a5afe40d38384f6986fb3e3eec5fe
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.000000199000  (199000 mojo), Confirmed in block: 3065014

Coin ID: 0xbeaf029a3a09792d5f77193c7efa1de09d46e85dde0e0acdb5e53e41237ccf1a
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.000010098999  (10098999 mojo), Confirmed in block: 3064913
```

</details>

<details>
<summary>Example 5: error case</summary>

Start by listing all coins of at least 0.9 XCH:

```bash
chia wallet coins list -f 590161281 --min-amount 0.9
```

The result shows that there is only one coin of this size:

```bash
There are a total of 1 coins in wallet 1.
1 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0xc58618fd5c30245291377901d3b911fe0ee7e826b28ae4875e60a2fd09d6fc52
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.991479597997  (991479597997 mojo), Confirmed in block: 3065287
```

Now run the `combine` command with the same parameters:

```bash
chia wallet coins combine -f 590161281 --min-amount 0.9
```

Result:

```
Only one coin found, you need at least two coins to combine.
```

This shows that you cannot combine a single coin. Lowering (or removing) the `--min-amount` could result in more than one coin being selected.

</details>

<details>
<summary>Example 6: default settings</summary>

Start by listing all coins, with pagination disabled:

```bash
chia wallet coins list -f 590161281 --no-paginate
```

Response:

```bash
There are a total of 3 coins in wallet 1.
3 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0xc58618fd5c30245291377901d3b911fe0ee7e826b28ae4875e60a2fd09d6fc52
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.991479597997  (991479597997 mojo), Confirmed in block: 3065287

Coin ID: 0x7934503c149a124a67888891fb2a7f813b5a5afe40d38384f6986fb3e3eec5fe
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.000000199000  (199000 mojo), Confirmed in block: 3065014

Coin ID: 0xbeaf029a3a09792d5f77193c7efa1de09d46e85dde0e0acdb5e53e41237ccf1a
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.000010098999  (10098999 mojo), Confirmed in block: 3064913
```

Run the `combine` command with the default settings:

```bash
chia wallet coins combine -f 590161281
```

Up to 500 coins will be combined by default, starting with the smallest coin. In this case, there are only three coins to combine:

```bash
Combining 3 coins.
Would you like to Continue? (y/n): y
Transaction sent: 8f285700e4c6db9290739206e21349bf484bd1e650c8281c6b8095f0e333af3b
To get status, use command: chia wallet get_transaction -f 590161281 -tx 0x8f285700e4c6db9290739206e21349bf484bd1e650c8281c6b8095f0e333af3b
```

After the transaction has completed, list all coins again:

```bash
chia wallet coins list -f 590161281
```

There is now only one coin in the wallet:

```bash
There are a total of 1 coins in wallet 1.
1 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0x5dc5106862c7e00b0611b79137dbd7520e4c90da1bbbadb01a4518e3e4ec1797
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.991489895996  (991489895996 mojo), Confirmed in block: 3065530
```

</details>

---

### `split`

Functionality: Split one coin into one or more new coins

Usage: chia wallet coins split [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -p            | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                           |
| -i            | --id              | INTEGER | False    | ID of the wallet to use [default: 1]                                                                         |
| -n            | --number-of-coins | INTEGER | True     | The number of new coins to create, excluding the remainder coin (minimum 1, maximum 500)                     |
| -m            | --fee             | TEXT    | False    | Set the fees for the transaction, in XCH [default: 0]                                                        |
| -a            | --amount-per-coin | TEXT    | True     | The amount of each newly created coin, in XCH                                                                |
| -t            | --target-coin-id  | TEXT    | True     | The coin id of the coin we are splitting                                                                     |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

This command requires a single coin to be specified for splitting.
The maximum number of new coins is 500. These coins will be of equal value, and the original coin must contain sufficient funds for the splitting to occur.
If any value remains after splitting, this will be stored in a new coin.

Keep in mind that (by default) the [dust filter](/faq#what-is-the-dust-filter) will be activated if you have over 200 coins worth one million mojos in your wallet.
Therefore, if you split a coin into more than 200 coins worth less than one million mojos, not all of them will show up in your wallet unless you modify or disable the dust filter (see the above link for instructions).

The minimum number of new coins is 1. "Splitting" one coin into one new coin could be useful because a second new coin will be created with the remaining value.

<details>
<summary>Example</summary>

First, list the coins available:

```bash
chia wallet coins list -f 590161281
```

Response:

```
There are a total of 1 coins in wallet 1.
1 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0x5dc5106862c7e00b0611b79137dbd7520e4c90da1bbbadb01a4518e3e4ec1797
        Address: xch1ju90mhn8nq7nnd25whap56ajf6eraxayw6qlk6f7sr0w3jf5d2ps9x0zzu Amount: 0.991489895996  (991489895996 mojo), Confirmed in block: 3065530
```

Split the existing coin into five coins of 0.15 XCH, and include a 1000-mojo blockchain fee:

```bash
chia wallet coins split -f 590161281 --number-of-coins 5 --amount-per-coin 0.15 --target-coin-id 0x5dc5106862c7e00b0611b79137dbd7520e4c90da1bbbadb01a4518e3e4ec1797 --fee 0.000000001
```

Result:

```
Transaction sent: 2489efe8c89e72459a09bb681b121c3acee0e9f40d65c37c8a9d98bb7cb47d09
To get status, use command: chia wallet get_transaction -f 590161281 -tx 0x2489efe8c89e72459a09bb681b121c3acee0e9f40d65c37c8a9d98bb7cb47d09
```

View the result of the transaction:

```
chia wallet get_transaction -f 590161281 -tx 0x2489efe8c89e72459a09bb681b121c3acee0e9f40d65c37c8a9d98bb7cb47d09
```

Result:

```
Transaction 2489efe8c89e72459a09bb681b121c3acee0e9f40d65c37c8a9d98bb7cb47d09
Status: Confirmed
Amount sent: 0.75 XCH
To address: xch1p2hs025nkujyqk4a6qxfxfde6uvcajqhmq2kzvacj79wf8kfvaxqw3t4zp
Created at: 2023-01-05 16:15:31
```

Finally, show the coins again after splitting:

```bash
chia wallet coins list -f 590161281 --no-paginate
```

As requested, the original coin was split into five coins worth 0.15 XCH apiece. The remaining value is held in a sixth coin, minus a 1000-mojo blockchain fee:

```bash
There are a total of 6 coins in wallet 1.
6 confirmed coins.
0 unconfirmed additions.
0 unconfirmed removals.
Confirmed coins:
Coin ID: 0x9781d2b0d70667cfe3dd330eddcdf77aa01e68b55bb015f2280197875022f1a6
        Address: xch1p2hs025nkujyqk4a6qxfxfde6uvcajqhmq2kzvacj79wf8kfvaxqw3t4zp Amount: 0.150000000000  (150000000000 mojo), Confirmed in block: 3065575

Coin ID: 0x4e67664448a4a2341a678f3940676f13ccea27a8be3b742b9f7396f2e5a9cc32
        Address: xch15gt90usala3xducfee96lc4gu2su2ks56htav9gklwmmssh7t5gspuwrvh Amount: 0.150000000000  (150000000000 mojo), Confirmed in block: 3065575

Coin ID: 0x9d3106af6877dde3d6fc00ffd5fde2813bf7db3e7e1fa69dd96685c8d061d81b
        Address: xch105khmcltukhupkzn4h88clkyqptsm88zyzg2vhlcpr76sd0vkggqm8vfdc Amount: 0.150000000000  (150000000000 mojo), Confirmed in block: 3065575

Coin ID: 0x57ef317fd0c9b0139d1546fbb0ccd3006fa820abb239ec8539d5726621f387c0
        Address: xch15yr7nk2wqxmy77g5z42vxav6knukgud69wzzl0n8fnra9d7eudaq8ty25a Amount: 0.150000000000  (150000000000 mojo), Confirmed in block: 3065575

Coin ID: 0x1e5fc6f0deb9d3f8300052d0a0504697fbd9dd76709e4fc3ff58a65bb73cbc28
        Address: xch17nxgus99p679j2z0gw0326nt5wddap7n0q7cqh3zs385hmkdspcq6lhk6l Amount: 0.241489894996  (241489894996 mojo), Confirmed in block: 3065575

Coin ID: 0x27049c58aad594bdb83a0f191098f438218cbd7066700342034709afb2470c0d
        Address: xch1kfce8cjec26qg0gh0rw44vvy90zsnm63tmf0ux4rrj8yv4t905ps8vjce7 Amount: 0.150000000000  (150000000000 mojo), Confirmed in block: 3065575
```

</details>

---

## `clawback`

Functionality: Claim or revert a Clawback transaction

Usage: chia wallet delete_unconfirmed_transactions [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -i            | --id              | INTEGER | False    | ID of the wallet to use [default: 1]                                                                         |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                           |
| -ids          | --tx_ids          | TEXT    | True     | IDs of the Clawback transactions you want to revert or claim. Separate multiple IDs by comma (,)             |
| -m            | --fee             | TEXT    | False    | A fee to add to the offer when it gets taken, in XCH [default: 0]                                            |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

Note that wallet will automatically detect whether the transactions should be reverted (clawed back) or claimed.

<details>
<summary>Example 1: clawback</summary>

First, create the clawback. This is a normal `send` command, with an extra `--clawback` timer:

```bash
chia wallet send -f 4045726944 -a 1 -e "Sending 1 TXCH with 1-hour clawback" -m 0.0001 -t txch1pxam7zakgqfcfr0xm8xcemm76d637w6sg0l7j8h6gv7rdlf8cfxs326mze --clawback_time 3600
```

Response:

```
Submitting transaction...
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 4045726944 -tx 0x5a41dbe755a7a44b827b61cfa384e79bef5f79370f63fa7ffe1ea29212a26bf6' to get status
```

After the above transaction has been confirmed on-chain, obtain the ID for the clawback transaction:

```bash
chia wallet get_transactions -f 4045726944 -l 1 --clawback
```

Response:

```bash
Transaction 0661d157b33597c33e5dc2027f07a1f0cbdc72fa950ca9617e08af326ceb7c81
Status: Pending
Amount received in clawback as sender: 1 TXCH
To address: txch1pxam7zakgqfcfr0xm8xcemm76d637w6sg0l7j8h6gv7rdlf8cfxs326mze
Created at: 2023-06-14 13:14:16
Recipient claimable time: 2023-06-14 14:14:16
```

Next, claw back the transaction:

```bash
chia wallet clawback -f 4045726944 -ids 0661d157b33597c33e5dc2027f07a1f0cbdc72fa950ca9617e08af326ceb7c81 -m 0.0001
```

Response:

```bash
{'success': True, 'transaction_ids': ['a8295c3924a8ad079093995d3129a38e26faa01ffca175572d21881865dc48ff']}
```

Finally, show the clawback transaction to verify that it was confirmed:

```bash
chia wallet get_transaction -f 4045726944 -tx 0xa8295c3924a8ad079093995d3129a38e26faa01ffca175572d21881865dc48ff
```

```bash
Transaction a8295c3924a8ad079093995d3129a38e26faa01ffca175572d21881865dc48ff
Status: Confirmed
Amount claim/clawback: 1 TXCH
To address: txch1dmdj4ee0ss3m7zunaymz47kdejv2pfwxdhcdjh6zffg935yqmvlsqpvvjq
Created at: 2023-06-14 13:17:33
```

</details>

<details>
<summary>Example 2: claim</summary>

Set up a clawback send transaction with a 60-second clawback window:

```bash
chia wallet send -f 4045726944 -a 1 -e "Sending 1 TXCH with 60-second clawback" -m 0.0001 -t txch1pxam7zakgqfcfr0xm8xcemm76d637w6sg0l7j8h6gv7rdlf8cfxs326mze --clawback_time 60
```

Response:

```bash
Submitting transaction...
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 4045726944 -tx 0x3ca82042aba188d47a80b663523847fa6050a21e04647c7b31ad3aa9d8d5450f' to get status
```

Get the status of the latest clawback transaction:

```bash
chia wallet get_transactions -f 4045726944 -l 1 --clawback
```

Response:

```bash
Transaction d4d29b6381e4248fc7361abb900a154e14d3120f6ecc01e7aaccaf9d984ed2f3
Status: Pending
Amount received in clawback as sender: 1 TXCH
To address: txch1pxam7zakgqfcfr0xm8xcemm76d637w6sg0l7j8h6gv7rdlf8cfxs326mze
Created at: 2023-06-14 13:28:38
Recipient claimable time: 2023-06-14 13:29:38
```

From the receiver's wallet, claim the transaction after the claimable time has elapsed:

```bash
chia wallet clawback -f 2457176934 -ids d4d29b6381e4248fc7361abb900a154e14d3120f6ecc01e7aaccaf9d984ed2f3 -m 0.0001
```

Response:

```bash
{'success': True, 'transaction_ids': ['e969bb32b4b01e2c14f67c9d6c467645779c1898d08eb4e041c937f4ba3fe9cb']}
```

Finally, show the last transaction's status:

```bash
chia wallet get_transaction -f 2457176934 -tx 0xe969bb32b4b01e2c14f67c9d6c467645779c1898d08eb4e041c937f4ba3fe9cb
```

Response:

```bash
Transaction e969bb32b4b01e2c14f67c9d6c467645779c1898d08eb4e041c937f4ba3fe9cb
Status: Confirmed
Amount claim/clawback: 1 TXCH
To address: txch1pxam7zakgqfcfr0xm8xcemm76d637w6sg0l7j8h6gv7rdlf8cfxs326mze
Created at: 2023-06-14 13:33:10
```

</details>

---

## `delete_unconfirmed_transactions`

Functionality: Deletes all unconfirmed transactions for this wallet ID

Usage: chia wallet delete_unconfirmed_transactions [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -i            | --id              | INTEGER | False    | ID of the wallet to use [default: 1]                                                                         |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                           |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

<details>
<summary>Example</summary>

```bash
chia wallet delete_unconfirmed_transactions --fingerprint 2121994410
```

Response:

```
Successfully deleted all unconfirmed transactions for wallet id 1 on key 2121994410
```

</details>

---

## `get_address`

Functionality: Get a wallet receive address

Usage: chia wallet get_address [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -i            | --id              | INTEGER | False    | ID of the wallet to use [default: 1]                                                                         |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                           |
| -n            | --new-address     | None    | False    | Create a new wallet receive address [default: disabled]                                                      |
| -l            | --latest-address  | None    | False    | Show the most recently created wallet receive address [default: enabled]                                     |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

<details>
<summary>Example</summary>

Get a new address:

```bash
chia wallet get_address --fingerprint 2121994410 --new-address
```

Response:

```
xch1jp5thqu3dhwkvvh5p77lvlackddrd9q2zpt58zs6yqr2c4yvregs69ayqr
```

</details>

---

## `get_derivation_index`

Functionality: Get the last puzzle hash derivation path index

Usage: chia wallet get_derivation_index [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                           |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

<details>
<summary>Example</summary>

```bash
chia wallet get_derivation_index --fingerprint 2121994410
```

Response:

```
Last derivation index: 346
```

</details>

---

## `get_transaction`

Functionality: Get a transaction

Usage: chia wallet get_transaction [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                           |
| -i,           | --id              | INTEGER | False    | ID of the wallet to use [default: 1]                                                                         |
| -tx           | --tx_id           | TEXT    | True     | Transaction id to search for                                                                                 |
| -v            | --verbose         | None    | False    | Show verbose output [default: disabled]                                                                      |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

<details>
<summary>Example</summary>

```bash
chia wallet get_transaction --fingerprint 2121994410 --tx_id 1b32a7f42c88b70924e3ec70d2a377b2b5c5f28de14736a3e2b5d411dec98c06
```

Response:

```
Transaction 1b32a7f42c88b70924e3ec70d2a377b2b5c5f28de14736a3e2b5d411dec98c06
Status: Confirmed
Amount sent: 1.99E-10 XCH
To address: xch1799u8mjkq4wt6t3avgcfxqk56qcwkx2dv9rw9q2yahm8taq4jwcqxaqd6m
Created at: 2022-11-30 09:59:09
```

</details>

---

## `get_transactions`

Functionality: Get all transactions

Usage: chia wallet get_transactions [OPTIONS]

Options:

| Short Command | Long Command        | Type    | Required | Description                                                                                                       |
| :------------ | :------------------ | :------ | :------- | :---------------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port   | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml      |
| -f            | --fingerprint       | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                                |
| -i            | --id                | INTEGER | False    | ID of the wallet to use [default: 1]                                                                              |
| -o            | --offset            | INTEGER | False    | Skip transactions from the beginning of the list [default: 0]                                                     |
| -l            | --limit             | INTEGER | False    | Max number of transactions to return [default: 4294967295]                                                        |
| -v            | --verbose           | None    | False    | Show verbose output [default: disabled]                                                                           |
|               | --paginate          | None    | False    | Prompt for each page of data. Defaults to enabled for interactive consoles, otherwise defaults to disabled        |
|               | --no-paginate       | None    | False    | Do not prompt for each page of data. Defaults to disabled for interactive consoles, otherwise defaults to enabled |
|               | --sort-by-height    | None    | False    | Sort transactions by height [default: disabled]                                                                   |
|               | --sort-by-relevance | None    | False    | Sort transactions by {confirmed \| height \| time} [default: disabled]                                            |
|               | --reverse           | None    | False    | Reverse the transaction ordering [default: disabled]                                                              |
|               | --clawback          | None    | False    | Only show clawback transactions [default: disabled]                                                               |
| -h            | --help              | None    | False    | Show a help message and exit                                                                                      |

<details>
<summary>Example 1: Show a single XCH transaction</summary>

Start by showing all wallets associated with the current fingerprint:

```bash
chia wallet show
```

Response (truncated):

```bash
Wallet height: 3045395
Sync status: Synced
Balances, fingerprint: 2104826454

Chia Wallet:
   -Total Balance:         35.683924454174 txch (35683924454174 mojo)
   -Pending Total Balance: 35.683924454174 txch (35683924454174 mojo)
   -Spendable:             35.084802204177 txch (35084802204177 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -Wallet ID:             2

```

Next, obtain a single transaction from wallet `1`, a `STANDARD_WALLET`, by including the `-o` (offset) and `-l` (limit) flags:

```bash
chia wallet get_transactions -i 1 -o 2 -l 1
```

Response:

```bash
Transaction 1a4a2c93e32fd2a5a19b85e6a2114c6a2b972b4ed7d203dc23a1574d6a1383a1
Status: Confirmed
Amount sent: 5 TXCH
To address: txch1z2gtnmph3jp9cz28phchztylrkqhf8c4ckgtjg3ew7ducztxl8gsfqttlc
Created at: 2023-08-01 19:55:51
```

</details>

<details>
<summary>Example 2: Show all transactions from a CAT</summary>

Start by showing all wallets associated with the current fingerprint:

```bash
chia wallet show
```

Response:

```bash
Wallet height: 3045482
Sync status: Synced
Balances, fingerprint: 2104826454

Chia Wallet:
   -Total Balance:         35.683924454174 txch (35683924454174 mojo)
   -Pending Total Balance: 35.683924454174 txch (35683924454174 mojo)
   -Spendable:             35.084802204177 txch (35084802204177 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -Wallet ID:             2

DID did:chia:1kzxqrt8f2h8psr8zuzen9dxgmxx5v35s0rj3jy637qjannu3zlesds0el5:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:1kzxqrt8f2h8psr8zuzen9dxgmxx5v35s0rj3jy637qjannu3zlesds0el5
   -Wallet ID:             3

NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -DID ID:                did:chia:1kzxqrt8f2h8psr8zuzen9dxgmxx5v35s0rj3jy637qjannu3zlesds0el5
   -Wallet ID:             4

DataLayer Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DATA_LAYER
   -Wallet ID:             5

CAT f17f88130c635228...:
   -Total Balance:         0.034  (34 mojo)
   -Pending Total Balance: 0.034  (34 mojo)
   -Spendable:             0.034  (34 mojo)
   -Type:                  CAT
   -Asset ID:              f17f88130c63522821f1a75466849354eee69c414c774bd9f3873ab643e9574d
   -Wallet ID:             6

CAT aaee6b63bcbc4aef...:
   -Total Balance:         10.0  (10000 mojo)
   -Pending Total Balance: 10.0  (10000 mojo)
   -Spendable:             10.0  (10000 mojo)
   -Type:                  CAT
   -Asset ID:              aaee6b63bcbc4aef0a005d31119ad65e5228b0ddff18c5c563fd7a4db54fb084
   -Wallet ID:             7

Pool wallet:
   -Total Balance:         0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable:             0.0  (0 mojo)
   -Type:                  POOLING_WALLET
   -Wallet ID:             11
```

Next, show all transactions from `Wallet ID` `7`, a CAT wallet:

```bash
chia wallet get_transactions -i 7
```

Response:

```bash
Transaction 38306b461975741641d397330bb34c01681bb242119bd4aa457c06e2080cf257
Status: Confirmed
Amount received: 10 CAT aaee6b63bcbc4aef...
To address: txch1stn20rhgmh5wvmyyfj2etdpdp73fla0ga4ymtsejz600dszf392s58kx2s
Created at: 2022-12-14 00:40:39
```

</details>

---

## notifications:

Functionality: Send, receive, and delete wallet notifications

### `delete`

Functionality: Delete notification(s) that are in your wallet

Usage: chia wallet notifications delete [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                           |
| -i            | --id              | TEXT    | False    | A specific notification ID to delete                                                                         |
|               | --all             | None    | False    | All notifications can be deleted (they will be recovered during resync) [default: disabled]                  |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

<details>
<summary>Example</summary>

Delete all notifications:

```bash
chia wallet notifications delete --fingerprint 2121994410  --all
```

Response:

```
Success: True
```

</details>

---

### `get`

Functionality: Get notification(s) that are in your wallet

Usage: chia wallet notifications get [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                           |
| -i            | --id              | TEXT    | False    | The specific notification ID to show                                                                         |
| -s            | --start           | INTEGER | False    | The number of notifications to skip                                                                          |
| -e            | --end             | INTEGER | False    | The number of notifications to stop at                                                                       |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

:::info

To set up your wallet to receive notifications, follow [these instructions](/faq#how-do-i-configure-my-system-to-send-and-receive-notifications)

:::

<details>
<summary>Example</summary>

```bash
chia wallet notifications get --fingerprint 2121994410
```

Response:

```
ID: d844464f871a468c008dd76b882214403f6aaa2e19bd1ab549e4423406202f55
message: This is a test message
amount: 10000000
```

</details>

---

### `send`

Functionality: Send a notification to the owner of an address

Usage: chia wallet notifications send [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                           |
| -t            | --to-address      | TEXT    | True     | The address to send the notification to                                                                      |
| -a            | --amount          | TEXT    | False    | The amount to send to get the notification past the recipient's spam filter [default: 0.00001]               |
| -n            | --message         | TEXT    | True     | The message of the notification                                                                              |
| -m            | --fee             | TEXT    | False    | The fee for the transaction                                                                                  |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

<details>
<summary>Example</summary>

Send a test notification:

```bash
chia wallet notifications send --fingerprint 3792481086 --to-address xch1jp5thqu3dhwkvvh5p77lvlackddrd9q2zpt58zs6yqr2c4yvregs69ayqr --message "This is a test message" --fee 0.000000000001
```

Response:

```
Notification sent successfully.
```

</details>

---

## `send`

Functionality: Send chia to another wallet

Usage: chia wallet send [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                           |
| -i            | --id              | INTEGER | False    | ID of the wallet to use [default: 1]                                                                         |
| -a            | --amount          | TEXT    | True     | How much chia to send, in XCH                                                                                |
| -e            | --memo            | TEXT    | False    | Additional memo for the transaction                                                                          |
| -m            | --fee             | TEXT    | False    | Set the fees for the transaction, in XCH [default: 0]                                                        |
| -t            | --address         | TEXT    | True     | Address to send the XCH                                                                                      |
| -o            | --override        | None    | False    | Submits transaction without checking for unusual values [default: disabled]                                  |
| -ma           | --min-coin-amount | TEXT    | False    | Ignore coins worth less then this much (XCH or CAT units)                                                    |
| -l            | --max-coin-amount | TEXT    | False    | Ignore coins worth more then this much (XCH or CAT units)                                                    |
|               | --exclude-coin    | TEXT    | False    | Exclude this coin from being spent                                                                           |
|               | --reuse           | None    | False    | Set this flag to reuse an existing address for the change [default: not set]                                 |
|               | --clawback_time   | INTEGER | False    | The seconds that the recipient needs to wait to claim the fund. A positive number will enable this feature   |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

<details>
<summary>Example 1: send with memo</summary>

Send 1000 mojos with a test memo:

```bash
chia wallet send --fingerprint 3792481086 --address xch1jp5thqu3dhwkvvh5p77lvlackddrd9q2zpt58zs6yqr2c4yvregs69ayqr --memo "This is a test memo" --fee 0.000000000001 --amount 0.000000001
```

Response:

```
Submitting transaction...
Transaction submitted to nodes: [{'peer_id': 'cda6b919f90af6f021ccf6ca748a30d03b22622863654b57bd74896dd60c4eca', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 3792481086 -tx 0x6fbac9409dbdef3cfa8a8fd82be88caef5be4547fe882c12d5b1ef0cbd17ecfe' to get status
```

</details>

<details>
<summary>Example 2: clawback</summary>

Send 1 TXCH and include a 3600-second (1 hour) clawback:

```bash
chia wallet send -f 4045726944 -a 1 -e "Sending 1 TXCH with 1-hour clawback" -m 0.0001 -t txch1pxam7zakgqfcfr0xm8xcemm76d637w6sg0l7j8h6gv7rdlf8cfxs326mze --clawback_time 3600
```

Response:

```
Submitting transaction...
Transaction submitted to nodes: [{'peer_id': 'b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 4045726944 -tx 0x3012893bf84b66c849f54b1c4bd893000188a7f728e439d3d6634048e8474482' to get status
```

View the transaction's status:

```bash
chia wallet get_transaction -f 4045726944 -tx 0x3012893bf84b66c849f54b1c4bd893000188a7f728e439d3d6634048e8474482
```

Response:

```bash
Transaction 3012893bf84b66c849f54b1c4bd893000188a7f728e439d3d6634048e8474482
Status: Confirmed
Amount sent: 1 TXCH
To address: txch1pxam7zakgqfcfr0xm8xcemm76d637w6sg0l7j8h6gv7rdlf8cfxs326mze
Created at: 2023-06-14 10:07:51
```

Note that the status is `Confirmed` even though it is a pending clawback transaction.
This is because the original transaction _has_ been confirmed and a new pending clawback transaction has been created.

To view the pending clawback transaction, call `get_transactions` and include the `--clawback` flag (`-l 1` is used here to show only the latest transaction):

```bash
chia wallet get_transactions -f 4045726944 -l 1 --clawback
```

The response shows the time at which the transaction will be claimable:

```bash
Transaction fdee443b5588dff2eb5471d18dee51617749849ed29583e2315481f52dad98cc
Status: Pending
Amount received in clawback as sender: 1 TXCH
To address: txch1pxam7zakgqfcfr0xm8xcemm76d637w6sg0l7j8h6gv7rdlf8cfxs326mze
Created at: 2023-06-14 10:08:44
Recipient claimable time: 2023-06-14 11:08:44
```

</details>

---

## `show`

Functionality: Show wallet information

Usage: chia wallet show [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                                                                                                                                                           |
| :------------ | :---------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml                                                                                                                                          |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                                                                                                                                                                    |
| -w            | --wallet_type     | TEXT    | False    | Choose a specific wallet type to return, choose from the following: [standard_wallet \| atomic_swap \| authorized_payee \| multi_sig \| custody \| cat \| recoverable \| decentralized_id \| pooling_wallet \| nft \| data_layer \| data_layer_offer] |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                                                                                                                                                          |

<details>
<summary>Example</summary>

```bash
chia wallet show --fingerprint 2121994410
```

Response:

```
Wallet height: 2896197
Sync status: Synced
Balances, fingerprint: 2121994410

Chia Wallet:
   -Total Balance:         0.196510003997 xch (196510003997 mojo)
   -Pending Total Balance: 0.196510003997 xch (196510003997 mojo)
   -Spendable:             0.196510003997 xch (196510003997 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -Wallet ID:             2

Spacebucks:
   -Total Balance:         0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable:             0.0  (0 mojo)
   -Type:                  CAT
   -Asset ID:              a628c1c2c6fcb74d53746157e438e108eab5c0bb3e5c80ff9b1910b3e4832913
   -Wallet ID:             3

DataLayer Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DATA_LAYER
   -Wallet ID:             4
```

</details>

---

## `sign_message`

Functionality: Sign a message by a derivation address

Usage: chia wallet sign_message [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                           |
| -a            | --address         | TEXT    | True     | The address you want to use for signing                                                                      |
| -m            | --hex_message     | TEXT    | True     | The hex message you want sign                                                                                |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

<details>
<summary>Example</summary>

```bash
chia wallet sign_message --fingerprint 2121994410 --address xch1jp5thqu3dhwkvvh5p77lvlackddrd9q2zpt58zs6yqr2c4yvregs69ayqr --hex_message 0xdeadbeef
```

Response:

```
Message: 0xdeadbeef
Public Key: b1632788b1384508103e9714336f99c50fd08fc025ebf637f6f386967469750edc8f91cb2da843ece824e7f052e4f349
Signature: 8b198ebfd05569ec1d06abc2bc9625e9361b5cf9837693cbc4ce3113de6c13d5528739c488e400444696d3fd169e666a0ed3498547aa5bcdfe15793ac8336505043fa393c063ae2756c1eedfadd82dbc50808f2f50b15724eba4e46ae1001225
```

</details>

---

## `update_derivation_index`

Functionality: Generate additional derived puzzle hashes starting at the provided index

Usage: chia wallet update_derivation_index [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                  |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the `rpc_port` under `wallet` in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                           |
| -i            | --index           | INTEGER | True     | Index to set. Must be greater than the current derivation index                                              |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                 |

<details>
<summary>Example</summary>

```bash
chia wallet update_derivation_index --fingerprint 2121994410 --index 475
```

Response:

```
Updating derivation index... This may take a while.
Updated derivation index: 475
Your balances may take a while to update.
```

</details>

---
