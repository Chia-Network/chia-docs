---
sidebar_label: Farmer
title: Farmer CLI
slug: /reference-client/cli-reference/farmer-cli
---

Commands that query or configure **farming** and **pooling** through the farmer and wallet RPC clients. Default farmer RPC port **8559** (`farmer.rpc_port`). For JSON-RPC reference, see [Farmer RPC](/reference-client/rpc-reference/farmer-rpc).

Sources: [`chia/cmds/farm.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/farm.py), [`chia/cmds/plotnft.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plotnft.py).

## `chia farm`

### `chia farm summary`

Usage: `chia farm summary [OPTIONS]`

Prints farming status: blockchain sync (via full node), harvester summaries, plot counts, and estimated rewards when services are reachable.

| Option                         | Description                                       |
| :----------------------------- | :------------------------------------------------ |
| `-p`, `--rpc-port`             | Full node RPC port.                               |
| `-wp`, `--wallet-rpc-port`     | Wallet RPC port.                                  |
| `-hp`, `--harvester-rpc-port`  | Harvester RPC port (local harvester).             |
| `-fp`, `--farmer-rpc-port`     | Farmer RPC port.                                  |
| `-i`, `--include-pool-rewards` | Include pool farming rewards in displayed totals. |

### `chia farm challenges`

Usage: `chia farm challenges [OPTIONS]`

Shows recent signage point challenges from the farmer.

| Option                     | Description                                       |
| :------------------------- | :------------------------------------------------ |
| `-fp`, `--farmer-rpc-port` | Farmer RPC port.                                  |
| `-l`, `--limit`            | Max challenges to print (`0` disables the limit). |

### `chia farm connect-solver` {#chia-farm-connect-solver}

Usage: `chia farm connect-solver [OPTIONS] SOLVER_ADDRESS`

Points the farmer at a **Solver** service (`host:port`). Solver integration is also configurable via farmer RPC (see `connect_to_solver` on [Farmer RPC](/reference-client/rpc-reference/farmer-rpc)) and [Solver CLI](/reference-client/cli-reference/solver-cli).

| Option                     | Description      |
| :------------------------- | :--------------- |
| `-fp`, `--farmer-rpc-port` | Farmer RPC port. |

## Plot NFT {#plot-nft}

Usage: `chia plotnft [OPTIONS] COMMAND`

Plot NFT commands use the **wallet** RPC (pooling operations). Run `chia plotnft -h` for the full subcommand list; common commands include:

| Command          | Purpose                                                       |
| :--------------- | :------------------------------------------------------------ |
| `show`           | Show plot NFT and pool state (launcher id, pool URL, points). |
| `create`         | Create a plot NFT (pool URL or self-farming).                 |
| `join` / `leave` | Switch pools or return to self-farming.                       |
| `claim`          | Claim pool rewards.                                           |
| `inspect`        | Detailed plot NFT JSON.                                       |
| `get_login_link` | Pool login link (needs launcher id from `plotnft show`).      |

Examples:

- Create a plot NFT on a pool: `chia plotnft create -u https://pool.example.com`
- Self-farming plot NFT: `chia plotnft create -s local`
- When plotting to a pool contract, use the **pool contract address** from `chia plotnft show` with your plotting command (`-c` instead of legacy `-p` for pool public key).

## Related

- [CLI overview](/reference-client/cli-reference/cli)
- [Harvester CLI](/reference-client/cli-reference/harvester-cli)
- [Solver CLI](/reference-client/cli-reference/solver-cli)
- [Wallet CLI](/reference-client/cli-reference/wallet-cli)
- [Farmer RPC](/reference-client/rpc-reference/farmer-rpc)
