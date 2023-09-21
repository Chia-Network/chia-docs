---
sidebar_label: CAT Admin
title: CAT Admin CLI
slug: /cat-admin-cli
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Intro

This document is a reference guide for Chia's CAT Admin Tool, located in the [CAT-admin-tool](https://github.com/Chia-Network/CAT-admin-tool) repository.

To set up your environment (including installing this tool), follow our [CAT Creation Tutorial](/guides/cat-creation-tutorial).

## Reference

### `cats`

Functionality: Create and administer Chia Asset Tokens (CATs)

Usage: cats [OPTIONS]

Options:

| Short Command | Long Command          | Type    | Required | Description                                                                                                                                                                                                    |
| :------------ | :-------------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -l            | --tail                | TEXT    | True     | The TAIL program to launch this CAT with                                                                                                                                                                       |
| -c            | --curry               | TEXT    | False    | An argument to curry into the TAIL                                                                                                                                                                             |
| -s            | --solution            | TEXT    | False    | The solution to the TAIL program [default: ()]                                                                                                                                                                 |
| -t            | --send-to             | TEXT    | True     | The address these CATs will appear at once they are issued                                                                                                                                                     |
| -a            | --amount              | INTEGER | True     | The amount to issue in mojos (regular XCH will be used to fund this)                                                                                                                                           |
| -m            | --fee                 | INTEGER | False    | The fees for the transaction, in mojos [default: 0]                                                                                                                                                            |
| -d            | --authorized-provider | TEXT    | False    | A trusted DID that can issue VCs that are allowed to trade the CAT. Specifying this option will make the CAT a CR (credential restricted) CAT. Requires specifying either `--proofs-checker` or `--cr-flag`    |
| -r            | --proofs-checker      | TEXT    | False    | The program that checks the proofs of a VC for a CR-CAT. Specifying this option requires a value for `--authorized-providers`                                                                                  |
| -v            | --cr-flag             | TEXT    | False    | Specify a list of flags to check a VC for in order to authorize this CR-CAT. Specifying this option requires a value for `--authorized-providers`. Cannot be used if a custom `--proofs-checker` is specified. |
| -f            | --fingerprint         | INTEGER | False    | The wallet fingerprint to use as funds                                                                                                                                                                         |
| -sig          | --signature           | TEXT    | False    | A signature to aggregate with the transaction                                                                                                                                                                  |
| -as           | --spend               | TEXT    | False    | An additional spend to aggregate with the transaction                                                                                                                                                          |
| -b            | --as-bytes            | None    | False    | Output the spend bundle as a sequence of bytes instead of JSON                                                                                                                                                 |
| -sc           | --select-coin         | None    | False    | Stop the process once a coin from the wallet has been selected and return the coin                                                                                                                             |
| -q            | --quiet               | None    | False    | Quiet mode will not ask to push transaction to the network                                                                                                                                                     |
| -p            | --push                | None    | False    | Automatically push transaction to the network in quiet mode                                                                                                                                                    |
|               | --root-path           | PATH    | False    | The root folder where the config lies [default: ~/.chia/mainnet]                                                                                                                                               |
|               | --wallet-rpc-port     | INTEGER | False    | The RPC port the wallet service is running on                                                                                                                                                                  |
|               | --help                | None    | False    | Show a help message and exit                                                                                                                                                                                   |

<details>
<summary>Example 1 - select a coin from the wallet with a value of at least 1 XCH (1 trillion mojos)</summary>

Request:

```bash
cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to txch1jk4r06xsj0fnwqk57322yjqzkdyx7kh8h8kvxus3l68tjnkf05aqd9uevs --amount 1000000000000 --as-bytes --select-coin
```

Response:

```
{
    "amount": 1999731499999,
    "parent_coin_info": "0x3179dd9b38f7c4e4de532e346cfefb33affda1f2860ed68aeb0e70c38a5c9f6e",
    "puzzle_hash": "0x74fcdd0e27ead17559cf9eaf791c62a6517c0c4fcf5ac3a6f014857571fc7608"
}
Name: 345dd430bcd7a413f8feed25c382d83855edd6ccceb41d1dbc293ca8e49e6b2d
```

The "parent_coin_info", "puzzle_hash", and "amount" values are hashed together to create the coin's "Name".

</details>

<details>
<summary>Example 2 - Push a transaction to the network, currying an inner puzzle hash into the TAIL</summary>

Request:

```bash
cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to txch19k6cl5syzvxgkgulr7m49v2r57yh0aanm23hrffgd89j4nj3ywhqxadyqr --amount 1000000000000 --as-bytes --curry 0x8f4dbff8df3f6aa9303eb47625cf8f09d885f1ad6a2d440582cb6bd45f53d2e8
```

Response:

```bash
The transaction has been created, would you like to push it to the network? (Y/N)y
Successfully pushed the transaction to the network
Asset ID: 9c39398afb1d7ffa03a589f60e5e39f2ae4572ff7048e689fe3128c339581b2d
Eve Coin ID: 9fe3e95308949cb9c49333f829922dc7118cd3e2fdf365cde669b47852ce3a7b
```

After pushing the transaction, the new ID and Eve Coin (singleton parent coin) will be shown.

</details>

<details>
<summary>Example 3 - Mint a new CR-CAT</summary>

First, select a coin to use for the minting. Flags included in this example (CR-specific flags are in **bold**):
* `--tail`: The tail to use; in this case we'll use a single-issuance TAIL
* `--send-to`: The address to send the CR-CATs to upon minting
* **`--authorized-provider`: The DID that is authorized to issue VCs containing the required proof(s) for this CAT**
* **`--cr-flag`: The proof(s) required for owning this CR-CAT**
* `--amount`: The number of mojos for this issuance (1 million mojos = 1 thousand CR-CATs)
* `-m`: The transaction fee, in mojos
* `--as-bytes`: Use bytes instead of JSON
* `--select-coin`: Instead of minting the CAT, just select a coin to use for the isuance

```bash
cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to txch1ek6ln2ejdsec6l734x8tggk9j5sepl8nfqjer5yt2dr905f04prqmcjcc5 --authorized-provider did:chia:1x23lnyd2xjefnfly075ngk79duf0yxna35cp86mgnnp4t33senfs4cah7u --cr-flag "test_proof1" --amount 1000000 -m 1000 --as-bytes --select-coin
```

Response:

```bash
{
    "amount": 999694993543,
    "parent_coin_info": "0x3ad9ec3ab9039047106476b4b23d05c46a7f02a6114c4eaf82792c3229e74416",
    "puzzle_hash": "0xa8180f3997eeda1804508c1f4dbe55ef17808fe2df970bba408807b10e7dd9ba"
}
Name: c5519ac8ef55043b23bef45b1326d445f2c4af579f13dc0cdec10335ccb0a809
```

In the above repsonse, `Name` is the ID of the coin to be used for the minting. Next, run the same command again, but remove the `--select-coin` flag and add `--curry 0x<coin ID>` (the `0x` is required and important here):

```bash
cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to txch1ek6ln2ejdsec6l734x8tggk9j5sepl8nfqjer5yt2dr905f04prqmcjcc5 --authorized-provider did:chia:1x23lnyd2xjefnfly075ngk79duf0yxna35cp86mgnnp4t33senfs4cah7u --cr-flag "test_proof1" --amount 1000000 -m 1000 --as-bytes --curry 0xc5519ac8ef55043b23bef45b1326d445f2c4af579f13dc0cdec10335ccb0a809
```

Response:

```bash
Successfully pushed the transaction to the network
Asset ID: 262a2c2cbb09414652006c4da139a186b3a110bb57cd5d76b6785e4811f1c77c
Eve Coin ID: 692a4f63c56815a33510088a255d695aea472d0f03bb9f0d5cdd5c91a82821f2
```

Just as with standard CATs, the CR-CAT has been minted and sent to its destination address. `Asset ID` can now be added in the destination wallet.

In this case, the destination wallet is the holder of a VC with the proof required to hold this CR-CAT. To verify this, run the `vcs get` CLI command:

```bash
chia wallet vcs get
```

```bash
Proofs:
- f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
  - test_proof1
  - test_proof2

Launcher ID: 1e3cd9da1d4545700c8c26fb7ba452cf28b1c7d78b5fa7434307d32a435718c8
Coin ID: addf46fac52aac510b31a7dc025528411b5013d89c81174f4726b63a5dc0d395
Inner Address: txch166pzqd55p2emp9sqaflvyc8x2s4qn4eexrxgrlfwf8khuefp5fqswe84mu
Proof Hash: f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
```

This VC contains the proof that was added to the CR-CAT (`test_proof1`). Once the CR-CAT has been added to this Chia wallet, it will be displayed as type `CRCAT`. For example:

```bash
chia wallet show
```

Response:

```bash
CAT 262a2c2cbb094146...:
   -Total Balance:                      1000.0  (1000000 mojo)
   -Balance Pending VC Approval:        0.0  (0 mojo)
   -Pending Total Balance:              1000.0  (1000000 mojo)
   -Spendable:                          1000.0  (1000000 mojo)
   -Type:                               CRCAT
   -Asset ID:                           262a2c2cbb09414652006c4da139a186b3a110bb57cd5d76b6785e4811f1c77c
   -Wallet ID:                          5
```

</details>

---

### `secure_the_bag`

Functionality: Create a tree of coins from a .csv file containing puzzlehash:amount pairs. Useful for setting up CAT airdrops.

Usage: secure_the_bag [OPTIONS]

Options:

| Short Command | Long Command                  | Type    | Required | Description                                                                                                                                                                                                            |     |
| :------------ | :---------------------------- | :------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| -c            | --curry                       | TEXT    | False    | An argument to curry into the TAIL                                                                                                                                                                                     |
| -a            | --amount                      | INTEGER | True     | The amount to issue in mojos (regular XCH will be used to fund this)                                                                                                                                                   |
| -stbtp        | --secure-the-bag-targets-path | TEXT    | True     | Path to CSV file containing targets of secure the bag (inner puzzle hash + amount). The total value of the coins in this file must match the value of the `amount` flag. If they don't match, an error will be thrown. |
| -lw           | --leaf-width                  | INTEGER | True     | Secure the bag leaf width [default: 100]                                                                                                                                                                               |
| -pr           | --prefix                      | TEXT    | True     | Address prefix [default: xch]                                                                                                                                                                                          |
|               | --help                        | NONE    | False    | Show a help message and exit                                                                                                                                                                                           |

<details>
<summary>Create a coin tree from a CSV file, currying a coin ID that was obtained from the cats command</summary>

```bash
secure_the_bag --tail .\reference_tails\genesis_by_coin_id.clsp.hex --amount 1000000000000 --secure-the-bag-targets-path C:\Users\User\Downloads\spacebucks.csv --prefix txch --curry 0x8f4dbff8df3f6aa9303eb47625cf8f09d885f1ad6a2d440582cb6bd45f53d2e8
```

The response will be a list of coins created in the tree. The command's progress will also be displayed. The last two lines of the output will be the root puzzle hash and address of the tree:

```
...
Secure the bag root puzzle hash: 17060adf6856d2904c4fe90c9690b710cf758aee5968718e2fbfd12f7b9d817f
Secure the bag root address: txch19k6cl5syzvxgkgulr7m49v2r57yh0aanm23hrffgd89j4nj3ywhqxadyqr
```

</details>

---

### `unwind_the_bag`

Functionality: Given a coin tree, airdrop CATs to a set of pre-committed puzzle hashes obtained from a .csv file. Requires a coin tree obtained as a result of running the `secure_the_bag` command.

Usage: secure_the_bag [OPTIONS]

Options:

| Short Command | Long Command                  | Type    | Required | Description                                                                                           |
| :------------ | :---------------------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------- |
| -ecid         | --eve-coin-id                 | TEXT    | True     | ID of coin that was spent to create secured bag                                                       |
| -th           | --tail-hash                   | TEXT    | True     | TAIL hash / Asset ID of CAT to unwind from secured bag of CATs                                        |
| -stbtp        | --secure-the-bag-targets-path | TEXT    | True     | Path to CSV file containing targets of secure the bag (inner puzzle hash + amount)                    |
| -utph,        | --unwind-target-puzzle-hash   | TEXT    | False    | Puzzle hash of target to unwind from secured bag. This is a useful option for testing a single unwind |
| -wi           | --wallet-id                   | INTEGER | False    | The wallet id to use (typically `1`)                                                                  |
| -f            | --fingerprint                 | INTEGER | False    | The wallet fingerprint to use as funds                                                                |
| -uf           | --unwind-fee                  | INTEGER | True     | Fee paid for each unwind spend. Enough mojos must be available to cover all spends [default: 500000]  |
| -lw           | --leaf-width                  | INTEGER | True     | Secure the bag leaf width (number of tokens to unwind in one block) [default: 100]                    |
|               | --help                        | NONE    | False    | Show a help message and exit                                                                          |

<details>
<summary>Unwind a bag that has been secured with the above example, using a puzzle hash</summary>

```bash
unwind_the_bag --eve-coin-id 9fe3e95308949cb9c49333f829922dc7118cd3e2fdf365cde669b47852ce3a7b --tail-hash 9c39398afb1d7ffa03a589f60e5e39f2ae4572ff7048e689fe3128c339581b2d --secure-the-bag-targets-path C:\Users\User\Downloads\spacebucks.csv --unwind-fee 500000 --wallet-id 1 --unwind-target-puzzle-hash af85d83ff01ec4b6f37d85d038e68736adc6cc9bb2c48c9d0973605448f73f3f
```

This example will airdrop the appropriate number of coins to the given puzzle hash. You will need to confirm each coin as it is dropped.

</details>
