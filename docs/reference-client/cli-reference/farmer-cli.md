---
sidebar_label: Farmer
title: Farmer CLI
slug: /reference-client/cli-reference/farmer-cli
---

Commands that query farming and pooling state through the farmer and wallet RPC clients. Default farmer RPC port is 8559 (`farmer.rpc_port`). JSON-RPC methods are documented on [Farmer RPC](/reference-client/rpc-reference/farmer-rpc).

Sources: [`chia/cmds/farm.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/farm.py), [`chia/cmds/plotnft.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plotnft.py).

## `chia farm`

### `chia farm summary`

Usage: `chia farm summary [OPTIONS]`

Prints farming status: blockchain sync via full node, harvester summaries, plot counts, and estimated rewards when services are reachable.

| Option                         | Description                                       |
| :----------------------------- | :------------------------------------------------ |
| `-p`, `--rpc-port`             | Full node RPC port.                               |
| `-wp`, `--wallet-rpc-port`     | Wallet RPC port.                                  |
| `-hp`, `--harvester-rpc-port`  | Harvester RPC port (local harvester).             |
| `-fp`, `--farmer-rpc-port`     | Farmer RPC port.                                  |
| `-i`, `--include-pool-rewards` | Include pool farming rewards in displayed totals. |

<details>
<summary>Example</summary>

```bash
chia farm summary
chia farm summary -fp 8559 -p 8555
```

</details>

### `chia farm challenges`

Usage: `chia farm challenges [OPTIONS]`

Shows recent signage point challenges from the farmer.

| Option                     | Description                                       |
| :------------------------- | :------------------------------------------------ |
| `-fp`, `--farmer-rpc-port` | Farmer RPC port.                                  |
| `-l`, `--limit`            | Max challenges to print (`0` disables the limit). |

<details>
<summary>Example</summary>

```bash
chia farm challenges -l 10
```

</details>

### `chia farm connect-solver` {#chia-farm-connect-solver}

Usage: `chia farm connect-solver [OPTIONS] SOLVER_ADDRESS`

Points the farmer at a Solver service (`host:port`). The same integration is available over farmer RPC as `connect_to_solver` on [Farmer RPC](/reference-client/rpc-reference/farmer-rpc). See also [Solver CLI](/reference-client/cli-reference/solver-cli).

| Option                     | Description      |
| :------------------------- | :--------------- |
| `-fp`, `--farmer-rpc-port` | Farmer RPC port. |

<details>
<summary>Example</summary>

```bash
chia farm connect-solver 192.0.2.10:8666
```

</details>

## Plot NFT {#plot-nft}

Usage: `chia plotnft [OPTIONS] COMMAND`

Plot NFT commands call the wallet RPC for pooling operations.

| Command          | Purpose                                                  |
| :--------------- | :------------------------------------------------------- |
| `show`           | Plot NFT and pool state (launcher id, pool URL, points). |
| `create`         | Create a plot NFT (pool URL or self-farming).            |
| `join` / `leave` | Switch pools or return to self-farming.                  |
| `claim`          | Claim pool rewards.                                      |
| `inspect`        | Plot NFT details as JSON.                                |
| `get_login_link` | Pool login link (needs launcher id from `plotnft show`). |

<details>
<summary>Example: `plotnft show`</summary>

```bash
chia plotnft show
```

</details>

<details>
<summary>Example: create pool and self-farming plot NFTs</summary>

```bash
chia plotnft create -u https://pool.example.com
chia plotnft create -s local
```

</details>

When plotting pool plots, pass the pool contract address from `chia plotnft show` to your plotting command (`-c`), not the legacy pool public key option.

## Related

- [CLI overview](/reference-client/cli-reference/cli)
- [Harvester CLI](/reference-client/cli-reference/harvester-cli)
- [Solver CLI](/reference-client/cli-reference/solver-cli)
- [Wallet CLI](/reference-client/cli-reference/wallet-cli)
- [Farmer RPC](/reference-client/rpc-reference/farmer-rpc)
