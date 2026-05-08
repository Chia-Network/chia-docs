---
sidebar_label: Farmer
title: Farmer CLI
slug: /reference-client/cli-reference/farmer-cli
---

Commands that query farming and pooling state through the farmer and wallet RPC clients. Default farmer RPC port is 8559 (`farmer.rpc_port`). JSON-RPC methods are documented on [Farmer RPC](/reference-client/rpc-reference/farmer-rpc).

Sources: [`chia/cmds/farm.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/farm.py), [`chia/cmds/plotnft.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plotnft.py).

## Reference

## `chia farm summary`

Functionality: Print farming status: blockchain sync via full node, harvester summaries, plot counts, and wallet-reported farmed amounts when those services are reachable.

Usage: `chia farm summary [OPTIONS]`

Options:

| Short Command | Long Command             | Type    | Required | Description                                                            |
| :------------ | :----------------------- | :------ | :------- | :--------------------------------------------------------------------- |
| `-p`          | `--rpc-port`             | INTEGER | False    | Full node RPC port (see `full_node.rpc_port` in `config.yaml`).        |
| `-wp`         | `--wallet-rpc-port`      | INTEGER | False    | Wallet RPC port (see `wallet.rpc_port`).                               |
| `-hp`         | `--harvester-rpc-port`   | INTEGER | False    | Harvester RPC port for the local harvester (see `harvester.rpc_port`). |
| `-fp`         | `--farmer-rpc-port`      | INTEGER | False    | Farmer RPC port (see `farmer.rpc_port`).                               |
| `-i`          | `--include-pool-rewards` | None    | False    | Include pool farming rewards in displayed totals.                      |
| `-h`          | `--help`                 | None    | False    | Show a help message and exit.                                          |

<details>
<summary>Example</summary>

```bash
chia farm summary
chia farm summary -fp 8559 -p 8555
```

Response:

```
Farming status: Farming
Total chia farmed: 2.5
User transaction fees: 0.001
Block rewards: 2.499
Last height farmed: 1500000
...
```

(Exact lines depend on sync state, services running, and wallet connectivity; connection errors list the RPC port that failed.)

</details>

---

## `chia farm challenges`

Functionality: Print recent signage-point challenges from the farmer.

Usage: `chia farm challenges [OPTIONS]`

Options:

| Short Command | Long Command        | Type    | Required | Description                                                    |
| :------------ | :------------------ | :------ | :------- | :------------------------------------------------------------- |
| `-fp`         | `--farmer-rpc-port` | INTEGER | False    | Farmer RPC port.                                               |
| `-l`          | `--limit`           | INTEGER | False    | Max challenges to print; `0` disables the limit [default: 20]. |
| `-h`          | `--help`            | None    | False    | Show a help message and exit.                                  |

<details>
<summary>Example</summary>

```bash
chia farm challenges -l 10
```

Response:

```
Hash: 0x... Index: 40
Hash: 0x... Index: 41
...
```

</details>

---

## `chia farm connect-solver` {#chia-farm-connect-solver}

Functionality: Point the farmer at a Solver service (`host:port`). The same integration is available over farmer RPC as `connect_to_solver` on [Farmer RPC](/reference-client/rpc-reference/farmer-rpc). See also [Solver CLI](/reference-client/cli-reference/solver-cli).

Usage: `chia farm connect-solver [OPTIONS] SOLVER_ADDRESS`

Options:

| Short Command | Long Command        | Type    | Required | Description                   |
| :------------ | :------------------ | :------ | :------- | :---------------------------- |
| `-fp`         | `--farmer-rpc-port` | INTEGER | False    | Farmer RPC port.              |
| `-h`          | `--help`            | None    | False    | Show a help message and exit. |

<details>
<summary>Example</summary>

```bash
chia farm connect-solver 192.0.2.10:8666
```

Response:

```
(Confirmation or status from the farmer RPC client; connection errors appear if the farmer is not running.)
```

</details>

---

## Plot NFT {#plot-nft}

The `chia plotnft` group calls the **wallet** RPC for pooling operations. Long options on many subcommands use `--wallet-rpc_port` (underscore), matching `chia plotnft -h` output.

### `chia plotnft show`

Functionality: Display launcher IDs, pool URLs, state, and related wallet-side plot NFT details.

Usage: `chia plotnft show [OPTIONS]`

Options:

| Short Command | Long Command        | Type    | Required | Description                                               |
| :------------ | :------------------ | :------ | :------- | :-------------------------------------------------------- |
| `-f`          | `--fingerprint`     | INTEGER | False    | Fingerprint of the wallet to use.                         |
| `-wp`         | `--wallet-rpc_port` | INTEGER | False    | Wallet RPC port (see `wallet.rpc_port` in `config.yaml`). |
| `-i`          | `--id`              | INTEGER | False    | Wallet id to use.                                         |
| `-h`          | `--help`            | None    | False    | Show a help message and exit.                             |

<details>
<summary>Example</summary>

```bash
chia plotnft show -f 2121994410
```

Response:

```
(Multi-line listing of plot NFT wallets, launcher ids, pool state, and URLs — format matches your wallet and plot NFT count.)
```

</details>

### `chia plotnft create`

Functionality: Create a new plot NFT singleton (self pool or pool farming).

Usage: `chia plotnft create [OPTIONS]`

Options:

| Short Command | Long Command        | Type    | Required | Description                                                                        |
| :------------ | :------------------ | :------ | :------- | :--------------------------------------------------------------------------------- |
| `-f`          | `--fingerprint`     | INTEGER | False    | Fingerprint of the wallet to use.                                                  |
| `-wp`         | `--wallet-rpc_port` | INTEGER | False    | Wallet RPC port.                                                                   |
| `-s`          | `--state`           | CHOICE  | True     | `local` (self-farming) or `pool` (see `chia plotnft create -h`).                   |
| `-u`          | `--pool-url`        | TEXT    | False    | HTTPS host:port of the pool; required when `--state` is `pool`.                    |
| `-m`          | `--fee`             | XCH     | True     | Fee per transaction in XCH (used twice: singleton creation and init) [default: 0]. |
| `-y`          | `--yes`             | None    | False    | No prompts.                                                                        |
| `-h`          | `--help`            | None    | False    | Show a help message and exit.                                                      |

<details>
<summary>Example</summary>

Create a self-farming plot NFT:

```bash
chia plotnft create -s local -m 0.00005
```

Create and join a pool (example URL):

```bash
chia plotnft create -s pool -u https://pool.example.com -m 0.00005
```

Response:

```
(Transaction submission and confirmation prompts or summaries from the wallet — exact text depends on prompts and fees.)
```

</details>

### Other `chia plotnft` subcommands

| Command                      | Purpose                                                    |
| :--------------------------- | :--------------------------------------------------------- |
| `join`                       | Join a plot NFT to a pool (`-u` pool URL required).        |
| `leave`                      | Leave a pool and return to self-farming.                   |
| `claim`                      | Claim pool rewards.                                        |
| `inspect`                    | Detailed plot NFT JSON (wallet options `-f`, `-wp`, `-i`). |
| `get_login_link`             | Pool login link (`-l` / `--launcher_id` required).         |
| `change_payout_instructions` | Update payout address (`-l` launcher id, `-a` address).    |

Run `chia plotnft <command> -h` for the full option table of each subcommand.

When plotting **pool** plots, pass the **pool contract address** from `chia plotnft show` to your plotter (`-c`), not the legacy pool public key option.

## Related

- [CLI overview](/reference-client/cli-reference/cli)
- [Harvester CLI](/reference-client/cli-reference/harvester-cli)
- [Solver CLI](/reference-client/cli-reference/solver-cli)
- [Wallet CLI](/reference-client/cli-reference/wallet-cli)
- [Farmer RPC](/reference-client/rpc-reference/farmer-rpc)
