---
sidebar_label: Full Node
title: Full Node CLI
slug: /reference-client/cli-reference/full-node-cli
---

Commands that talk to the full node use its RPC interface (default port 8555, `full_node.rpc_port` in `config.yaml`). HTTP JSON-RPC methods are listed on [Full Node RPC](/reference-client/rpc-reference/full-node-rpc).

Sources: [`chia/cmds/show.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/show.py), [`chia/cmds/show_funcs.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/show_funcs.py), [`chia/cmds/netspace.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/netspace.py), [`chia/cmds/netspace_funcs.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/netspace_funcs.py), [`chia/cmds/peer.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/peer.py), [`chia/cmds/peer_funcs.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/peer_funcs.py).

## Reference

## `chia show`

Functionality: Query blockchain and fee data through the full node. At least one main option is required (`no_args_is_help`); legacy connection flags still parse but print migration hints.

Usage: `chia show [OPTIONS]`

Options:

| Short Command | Long Command                    | Type    | Required | Description                                                     |
| :------------ | :------------------------------ | :------ | :------- | :-------------------------------------------------------------- |
| `-p`          | `--rpc-port`                    | INTEGER | False    | Full node RPC port (see `full_node.rpc_port` in `config.yaml`). |
| `-wp`         | `--wallet-rpc-port`             | INTEGER | False    | Parsed for compatibility; prints a message that it is unused.   |
| `-f`          | `--fee`                         | None    | False    | Show fee information.                                           |
| `-s`          | `--state`                       | None    | False    | Show current blockchain state (sync, peak, recent headers).     |
| `-c`          | `--connections`                 | None    | False    | Renamed: prints guidance to use `chia peer full_node -c`.       |
| `-a`          | `--add-connection`              | TEXT    | False    | Renamed: prints guidance to use `chia peer full_node -a`.       |
| `-r`          | `--remove-connection`           | TEXT    | False    | Renamed: prints guidance to use `chia peer full_node -r`.       |
| `-bh`         | `--block-header-hash-by-height` | INTEGER | False    | Look up a block header hash by height.                          |
| `-b`          | `--block-by-header-hash`        | TEXT    | False    | Look up a block by header hash.                                 |
| `-h`          | `--help`                        | None    | False    | Show a help message and exit.                                   |

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia show -s
chia show -f
```
````

Response:

`-s` uses [`print_blockchain_state`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/show_funcs.py). Synced node excerpt (hashes and ports vary):

````mdx-code-block
```text
Network: mainnet    Port: 8444   RPC Port: 8555
Node ID: b4de30abc123…
Genesis Challenge: eeb0582…

Current Blockchain Status: Full Node Synced

Peak: Hash: 0xfb7891e9a4a9ca6f8a633e0632d82c2502f425526754f71aee5a55d6ad3933d8
      Time: Wed Jan 15 2025 12:00:00 UTC                 Height:    3339504

Estimated network space: 20.000 EiB
Current difficulty: 8192
Current VDF sub_slot_iters: 135266304

  Height: |   Hash:
  3339504 | 0xfb7891e9a4a9ca6f8a633e0632d82c2502f425526754f71aee5a55d6ad3933d8
```
````

`-f` prints JSON from [`get_fee_estimate`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/show_funcs.py) followed by formatted mempool / fee-rate tables (`Mempool max cost`, `Fee Rate Estimates:`, etc.).

</details>

:::note Legacy `chia show` connection flags

`-c` / `--connections`, `-a` / `--add-connection`, and `-r` / `--remove-connection` still parse but print a message directing you to `chia peer full_node` instead. `-wp` / `--wallet-rpc-port` prints a message that it is unused.

:::

---

## `chia netspace`

Functionality: Estimate total network space from full node chain data.

Usage: `chia netspace [OPTIONS]`

Options:

| Short Command | Long Command           | Type    | Required | Description                                                                   |
| :------------ | :--------------------- | :------ | :------- | :---------------------------------------------------------------------------- |
| `-p`          | `--rpc-port`           | INTEGER | False    | Full node RPC port.                                                           |
| `-d`          | `--delta-block-height` | TEXT    | False    | Block spacing for the estimate [default: 4608]. Use `192` for about one hour. |
| `-s`          | `--start`              | TEXT    | False    | Newest block height to anchor the calculation (default: peak).                |
| `-h`          | `--help`               | None    | False    | Show a help message and exit.                                                 |

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia netspace -d 192
```
````

Response:

Printed by [`netstorge_async`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/netspace_funcs.py); last line uses [`format_bytes`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/cmds_util.py) on `get_network_space`:

````mdx-code-block
```text
Older Block
Block Height: 3339312
Weight:           9876543210
VDF Iterations:   123456789012345
Header Hash:      0xaa11bb22…

Newer Block
Block Height: 3339504
Weight:           9876654321
VDF Iterations:   123456790012345
Header Hash:      0xfb7891e9…

18.500 EiB
```
````

If the peak is missing you may see `No blocks in blockchain`.

</details>

---

## `chia peer full_node`

Functionality: Inspect or change full node peer connections (same RPC service as `chia show`).

Usage: `chia peer [OPTIONS] NODE_TYPE`

Use `full_node` as `NODE_TYPE` for full-node peers. Supported values include `base`, `farmer`, `wallet`, `full_node`, `harvester`, `data_layer`, `simulator`, and `solver` (see `chia peer -h`).

Options:

| Short Command | Long Command          | Type    | Required | Description                                                       |
| :------------ | :-------------------- | :------ | :------- | :---------------------------------------------------------------- |
| `-p`          | `--rpc-port`          | INTEGER | False    | RPC port for the service you address (`full_node.rpc_port` here). |
| `-c`          | `--connections`       | None    | False    | List peers connected to this node type.                           |
| `-a`          | `--add-connection`    | TEXT    | False    | Connect to another node `ip:port`.                                |
| `-r`          | `--remove-connection` | TEXT    | False    | Remove a peer by the first 8 characters of its node id.           |
| `-h`          | `--help`              | None    | False    | Show a help message and exit.                                     |

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia peer full_node -c
chia peer full_node -a 203.0.113.5:8444
```
````

Response:

`-c` lists connections via [`print_connections`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/peer_funcs.py):

````mdx-code-block
```text
Connections:
Type      IP                                      Ports       NodeID      Last Connect      MiB Up|Dwn
FULL_NODE 203.0.113.5                             8444/8444    a1b2c3d4... Jan 15 12:00:01      1.2|   99.3
                                                  -Height:  3339504    -Hash: fb7891e9...
```
````

`-a` prints `Connecting to 203.0.113.5, 8444` then any RPC error string from `open_connection`.

</details>

Other `chia peer <node_type>` targets (`farmer`, `wallet`, `harvester`, `data_layer`, `simulator`, `solver`, …) use the same option shape with that service’s RPC port — see [Farmer CLI](/reference-client/cli-reference/farmer-cli), [Harvester CLI](/reference-client/cli-reference/harvester-cli), and related pages.

## Related

- [CLI overview](/reference-client/cli-reference/cli)
- [RPC overview](/reference-client/rpc-reference/rpc)
- [Full Node RPC](/reference-client/rpc-reference/full-node-rpc)
