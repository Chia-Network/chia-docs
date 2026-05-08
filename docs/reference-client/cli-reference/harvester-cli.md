---
sidebar_label: Harvester
title: Harvester CLI
slug: /reference-client/cli-reference/harvester-cli
---

There is no top-level `chia harvester` group. Start the harvester with `chia start harvester` (see the `start` section on the [CLI overview](/reference-client/cli-reference/cli)) or via groups such as `farmer`. CLI operations below use the harvester RPC (default port 8560, `harvester.rpc_port`) or plot paths from `config.yaml`.

HTTP JSON-RPC methods and payloads are documented on [Harvester RPC](/reference-client/rpc-reference/harvester-rpc). Use `chia rpc harvester <method> '<json>'` the same way as other services (see [RPC overview](/reference-client/rpc-reference/rpc)).

Sources: [`chia/cmds/peer.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/peer.py), [`chia/cmds/plots.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plots.py).

## `chia peer harvester`

Usage: `chia peer harvester [OPTIONS]`

| Option                      | Description                                         |
| :-------------------------- | :-------------------------------------------------- |
| `-p`, `--rpc-port`          | Harvester RPC port.                                 |
| `-c`, `--connections`       | List connections for this harvester.                |
| `-a`, `--add-connection`    | Add a connection `ip:port`.                         |
| `-r`, `--remove-connection` | Remove a peer by the first 8 characters of node id. |

<details>
<summary>Example</summary>

```bash
chia peer harvester -c
```

</details>

## Plot directories

The harvester reads plot search paths from configuration. Manage directories with `chia plots` on [Plots CLI](/reference-client/cli-reference/plots-cli) (`show`, `add`, `remove`, `check`).

## Remote harvester

For TLS, copying CA material, and multi-machine layout, follow [Farming on many machines](/reference-client/farming/farming-many-machines). On the harvester host, point the client at your farmer with `chia configure --set-farmer-peer IP:Port` (see the configure section on the [CLI overview](/reference-client/cli-reference/cli)), then restart services.

## Related

- [CLI overview](/reference-client/cli-reference/cli)
- [Plots CLI](/reference-client/cli-reference/plots-cli)
- [Farmer CLI](/reference-client/cli-reference/farmer-cli)
- [Harvester RPC](/reference-client/rpc-reference/harvester-rpc)
