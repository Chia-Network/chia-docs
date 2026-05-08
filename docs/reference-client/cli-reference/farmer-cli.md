---
sidebar_label: Farmer
title: Farmer CLI
slug: /reference-client/cli-reference/farmer-cli
---

Commands that query farming and pooling state through the farmer and wallet RPC clients. Default farmer RPC port is 8559 (`farmer.rpc_port`). JSON-RPC methods are documented on [Farmer RPC](/reference-client/rpc-reference/farmer-rpc).

Sources: [`chia/cmds/farm.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/farm.py), [`chia/cmds/farm_funcs.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/farm_funcs.py), [`chia/cmds/plotnft.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plotnft.py), [`chia/cmds/plotnft_funcs.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plotnft_funcs.py).

## Reference

## `chia farm summary`

Functionality: Print farming status: blockchain sync via full node, harvester summaries, plot counts, and wallet-reported farmed amounts when those services are reachable.

Usage: `chia farm summary [OPTIONS]`

Options:

| Short Command | Long Command           | Type    | Required | Description                                                                                               |
| :------------ | :--------------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| `-p`          | `--rpc-port`           | INTEGER | False    | Full node RPC port (see `full_node.rpc_port` in `config.yaml`).                                         |
| `-wp`         | `--wallet-rpc-port`    | INTEGER | False    | Wallet RPC port (see `wallet.rpc_port`).                                                                  |
| `-hp`         | `--harvester-rpc-port` | INTEGER | False    | Harvester RPC port for the local harvester (see `harvester.rpc_port`).                                  |
| `-fp`         | `--farmer-rpc-port`    | INTEGER | False    | Farmer RPC port (see `farmer.rpc_port`).                                                                  |
| `-i`          | `--include-pool-rewards` | None | False    | Include pool farming rewards in displayed totals.                                                       |
| `-h`          | `--help`               | None    | False    | Show a help message and exit.                                                                           |

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia farm summary
chia farm summary -fp 8559 -p 8555
```
````

Response:

Shape follows [`summary`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/farm_funcs.py) (`print` calls). Illustrative synced farm with one local harvester (amounts and sizes vary):

````mdx-code-block
```text
Farming status: Farming
Total chia farmed: 2.5
User transaction fees: 0.001
Block rewards: 2.499
Last height farmed: 4100000
Local Harvester
   120 plots of size: 12.345 TiB on-disk, 11.800 TiBe (effective)
Plot count for all harvesters: 120
Total size of plots: 12.345 TiB, 11.800 TiBe (effective)
Estimated network space: 20.000 EiB
Expected time to win: 3 weeks
Note: log into your key using 'chia wallet show' to see rewards for each key
```
````

Other branches print different first lines for `Farming status:` (`Not available`, `Syncing`, `Not synced or not connected to peers`, `Not running`). If the farmer RPC is down: `Plot count: Unknown` / `Total size of plots: Unknown` / `Estimated network space: Unknown`. Wallet offline shows `For details on farmed rewards and fees you should run 'chia start wallet'...`.

</details>

---

## `chia farm challenges`

Functionality: Print recent signage-point challenges from the farmer.

Usage: `chia farm challenges [OPTIONS]`

Options:

| Short Command | Long Command        | Type    | Required | Description                                                                 |
| :------------ | :------------------ | :------ | :------- | :-------------------------------------------------------------------------- |
| `-fp`         | `--farmer-rpc-port` | INTEGER | False    | Farmer RPC port.                                                            |
| `-l`          | `--limit`           | INTEGER | False    | Max challenges to print; `0` disables the limit [default: 20].             |
| `-h`          | `--help`            | None    | False    | Show a help message and exit.                                              |

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia farm challenges -l 10
```
````

Response:

Each line is formatted in [`challenges`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/farm_funcs.py):

````mdx-code-block
```text
Hash: 0xa1b2c3d4e5f6789012345678901234567890abcd1234567890abcd1234567890 Index: 42
Hash: 0xb2c3d4e5f6789012345678901234567890abcd1234567890abcd1234567890ab Index: 43
```
````

</details>

---

## `chia farm connect-solver` {#chia-farm-connect-solver}

Functionality: Point the farmer at a Solver service (`host:port`). The same integration is available over farmer RPC as `connect_to_solver` on [Farmer RPC](/reference-client/rpc-reference/farmer-rpc). See also [Solver CLI](/reference-client/cli-reference/solver-cli).

Usage: `chia farm connect-solver [OPTIONS] SOLVER_ADDRESS`

Options:

| Short Command | Long Command        | Type    | Required | Description                     |
| :------------ | :------------------ | :------ | :------- | :------------------------------ |
| `-fp`         | `--farmer-rpc-port` | INTEGER | False    | Farmer RPC port.                |
| `-h`          | `--help`            | None    | False    | Show a help message and exit.   |

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia farm connect-solver 192.0.2.10:8666
```
````

Response:

[`solver_connect`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/farm_funcs.py) on success:

````mdx-code-block
```text
✓ Updated config with solver peer 192.0.2.10:8666
✓ Connected to solver at 192.0.2.10:8666
```
````

Other outcomes include `Solver address must be in format [IP:Port]`, `✗ Failed to update config: …`, `✗ Could not connect to farmer. Make sure farmer is running.`, or `✗ Failed to connect to solver: …`.

</details>

---

## Plot NFT {#plot-nft}

The `chia plotnft` group calls the **wallet** RPC for pooling operations. Long options on many subcommands use `--wallet-rpc_port` (underscore), matching `chia plotnft -h` output.

### `chia plotnft show`

Functionality: Display launcher IDs, pool URLs, state, and related wallet-side plot NFT details.

Usage: `chia plotnft show [OPTIONS]`

Options:

| Short Command | Long Command       | Type    | Required | Description                                                                                       |
| :------------ | :----------------- | :------ | :------- | :------------------------------------------------------------------------------------------------ |
| `-f`          | `--fingerprint`    | INTEGER | False    | Fingerprint of the wallet to use.                                                                |
| `-wp`         | `--wallet-rpc_port`| INTEGER | False    | Wallet RPC port (see `wallet.rpc_port` in `config.yaml`).                                       |
| `-i`          | `--id`             | INTEGER | False    | Wallet id to use.                                                                                 |
| `-h`          | `--help`           | None    | False    | Show a help message and exit.                                                                    |

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia plotnft show -f 2121994410
```
````

Response:

Printed by [`pprint_pool_wallet_state`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plotnft_funcs.py) / [`pprint_all_pool_wallet_state`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plotnft_funcs.py). Example for a self-pooling wallet (addresses and ids vary):

````mdx-code-block
```text
Wallet height: 4100123
Sync status: Synced
Wallet ID: 3
Current state: SELF_POOLING
Current state from block height: 3050000
Launcher ID: 0x7f8e9d0c1b2a345678901234567890abcdef1234567890abcdef1234567890
Target address (not for plotting): xch1jgfdw46k802z8e5ms70mywcahtwj7wur46x8z69uchpvgazmyjqsr92pf
Number of plots: 8
Owner public key: 0xabcdef...
Pool contract address (use ONLY for plotting - do not send money to this address): xch1qpuzafwenx85x8stjslepmumcyu09t23zppgyq6wlsq5xtxw75xs00xewp
Claimable balance: 0.0 xch

```
````

Pool-farming states add lines such as `Current pool URL:`, `Current difficulty:`, `Points balance:`, and payout lines from the same function.

</details>

### `chia plotnft create`

Functionality: Create a new plot NFT singleton (self pool or pool farming).

Usage: `chia plotnft create [OPTIONS]`

Options:

| Short Command | Long Command       | Type        | Required | Description                                                                                   |
| :------------ | :----------------- | :---------- | :------- | :-------------------------------------------------------------------------------------------- |
| `-f`          | `--fingerprint`    | INTEGER     | False    | Fingerprint of the wallet to use.                                                            |
| `-wp`         | `--wallet-rpc_port`| INTEGER     | False    | Wallet RPC port.                                                                             |
| `-s`          | `--state`          | CHOICE  | True     | `local` (self-farming) or `pool` (see `chia plotnft create -h`).                              |
| `-u`          | `--pool-url`       | TEXT        | False    | HTTPS host:port of the pool; required when `--state` is `pool`.                               |
| `-m`          | `--fee`            | XCH         | True     | Fee per transaction in XCH (used twice: singleton creation and init) [default: 0].             |
| `-y`          | `--yes`            | None        | False    | No prompts.                                                                                  |
| `-h`          | `--help`           | None        | False    | Show a help message and exit.                                                                |

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia plotnft create -s local -m 0.00005 -y
```
````

Response:

[`create`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plotnft_funcs.py) prints intent, then on submission uses [`transaction_submitted_msg`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/cmds_util.py) and [`transaction_status_msg`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/cmds_util.py):

````mdx-code-block
```text
Will create a plot NFT.
Transaction submitted to nodes: [{'peer_id': 'a1b2c3d4e5f6…', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 2121994410 -tx 0xd4e5f6a7b8c9012345678901234567890abcdef1234567890abcdef1234567890' to get status
```
````

(`sent_to` entries mirror mempool submission status objects; exact JSON varies. Pool mode first prints pool headers from `create_pool_args` when fetching pool info.)

</details>

### Other `chia plotnft` subcommands

| Command                      | Purpose                                                                       |
| :--------------------------- | :---------------------------------------------------------------------------- |
| `join`                       | Join a plot NFT to a pool (`-u` pool URL required).                           |
| `leave`                      | Leave a pool and return to self-farming.                                      |
| `claim`                      | Claim pool rewards.                                                           |
| `inspect`                    | Detailed plot NFT JSON (wallet options `-f`, `-wp`, `-i`).                   |
| `get_login_link`             | Pool login link (`-l` / `--launcher_id` required).                            |
| `change_payout_instructions` | Update payout address (`-l` launcher id, `-a` address).                       |

Run `chia plotnft <command> -h` for the full option table of each subcommand.

When plotting **pool** plots, pass the **pool contract address** from `chia plotnft show` to your plotter (`-c`), not the legacy pool public key option.

## Related

- [CLI overview](/reference-client/cli-reference/cli)
- [Harvester CLI](/reference-client/cli-reference/harvester-cli)
- [Solver CLI](/reference-client/cli-reference/solver-cli)
- [Wallet CLI](/reference-client/cli-reference/wallet-cli)
- [Farmer RPC](/reference-client/rpc-reference/farmer-rpc)
