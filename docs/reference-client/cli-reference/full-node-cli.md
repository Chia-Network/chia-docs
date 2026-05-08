---
sidebar_label: Full Node
title: Full Node CLI
slug: /reference-client/cli-reference/full-node-cli
---

Commands that talk to the full node use its RPC interface (default port 8555, `full_node.rpc_port` in `config.yaml`). HTTP JSON-RPC methods are listed on [Full Node RPC](/reference-client/rpc-reference/full-node-rpc).

Sources: [`chia/cmds/show.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/show.py), [`chia/cmds/netspace.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/netspace.py), [`chia/cmds/peer.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/peer.py).

## `chia show`

Usage: `chia show [OPTIONS]`

Shows blockchain and fee information via the full node. At least one option is required (`no_args_is_help`).

| Option                                 | Description                                                             |
| :------------------------------------- | :---------------------------------------------------------------------- |
| `-p`, `--rpc-port`                     | Full node RPC port (see `full_node.rpc_port` in `config.yaml`).         |
| `-f`, `--fee`                          | Show fee information.                                                   |
| `-s`, `--state`                        | Show current blockchain state (sync height, peak hash, recent headers). |
| `-bh`, `--block-header-hash-by-height` | Look up a block header hash by height (`INTEGER`).                      |
| `-b`, `--block-by-header-hash`         | Look up a block by header hash (`TEXT`).                                |

<details>
<summary>Example</summary>

```bash
chia show -s
chia show --fee
```

</details>

:::note Legacy `chia show` connection flags

`-c` / `--connections`, `-a` / `--add-connection`, and `-r` / `--remove-connection` still parse but print a message directing you to `chia peer full_node` instead. `-wp` / `--wallet-rpc-port` prints a message that it is unused.

:::

## `chia netspace`

Usage: `chia netspace [OPTIONS]`

Estimates total network space from full node chain data.

| Option                       | Description                                                                                     |
| :--------------------------- | :---------------------------------------------------------------------------------------------- |
| `-p`, `--rpc-port`           | Full node RPC port.                                                                             |
| `-d`, `--delta-block-height` | Block spacing for the estimate (default `4608`, about one day). Use `192` for roughly one hour. |
| `-s`, `--start`              | Newest block height to anchor the calculation (default: peak).                                  |

<details>
<summary>Example</summary>

```bash
chia netspace -d 192
```

</details>

## `chia peer full_node`

Usage: `chia peer full_node [OPTIONS]`

Inspect or change full node peer connections (same RPC service as `chia show`).

| Option                      | Description                                                    |
| :-------------------------- | :------------------------------------------------------------- |
| `-p`, `--rpc-port`          | RPC port for the service you are addressing (here: full node). |
| `-c`, `--connections`       | List peers connected to this full node.                        |
| `-a`, `--add-connection`    | Connect to another node `ip:port`.                             |
| `-r`, `--remove-connection` | Remove a peer by the first 8 characters of its node id.        |

<details>
<summary>Example</summary>

```bash
chia peer full_node -c
chia peer full_node -a 203.0.113.5:8444
```

</details>

Other `chia peer <node_type>` targets (`farmer`, `wallet`, `harvester`, `data_layer`, `simulator`, `solver`) are documented on [Farmer CLI](/reference-client/cli-reference/farmer-cli), [Harvester CLI](/reference-client/cli-reference/harvester-cli), and related pages as applicable.

## Related

- [CLI overview](/reference-client/cli-reference/cli)
- [RPC overview](/reference-client/rpc-reference/rpc)
- [Full Node RPC](/reference-client/rpc-reference/full-node-rpc)
