---
sidebar_label: Harvester
title: Harvester CLI
slug: /reference-client/cli-reference/harvester-cli
---

There is no separate top-level `chia harvester` group: the harvester is started with `chia start harvester` (see [CLI overview](/reference-client/cli-reference/cli), section **start**) or bundled inside groups such as `farmer`. Operations below use the **harvester RPC** (default port **8560**, `harvester.rpc_port`) or update plot directories that the harvester reads from `config.yaml`.

For HTTP JSON-RPC methods, see [Harvester RPC](/reference-client/rpc-reference/harvester-rpc).

Sources: [`chia/cmds/peer.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/peer.py), [`chia/cmds/plots.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plots.py), [`chia/cmds/init.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/init.py), [`chia/cmds/configure.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/configure.py).

## `chia peer harvester`

Usage: `chia peer harvester [OPTIONS]`

| Option                      | Description                                         |
| :-------------------------- | :-------------------------------------------------- |
| `-p`, `--rpc-port`          | Harvester RPC port.                                 |
| `-c`, `--connections`       | List connections for this harvester.                |
| `-a`, `--add-connection`    | Add a connection `ip:port`.                         |
| `-r`, `--remove-connection` | Remove a peer by the first 8 characters of node id. |

## Plot directories (harvester)

The harvester loads plot search paths from configuration. Use the **`chia plots`** commands on the [CLI overview](/reference-client/cli-reference/cli) (`show`, `add`, `remove`, `check`) to manage directories. `chia plots add -d` / `remove -d` update the same list the harvester uses when farming.

## Remote harvester

To run a **remote** harvester that connects to your farmer:

1. Copy CA / certificate material per upstream `chia init` instructions (see **`chia init -h`** and [`chia/cmds/init.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/init.py) comments).
2. On the harvester machine, point SSL and farmer connection settings at your farmer.
3. Use **`chia configure --set-farmer-peer IP:Port`** on the harvester side so it knows the farmer (see **configure** on the [CLI overview](/reference-client/cli-reference/cli)).

After certificate and peer configuration changes, restart affected services.

## `chia rpc harvester`

Shell JSON-RPC calls follow the same pattern as other services (see [RPC overview](/reference-client/rpc-reference/rpc)):

```bash
chia rpc harvester <method> '<json>'
```

Method names and payloads match [Harvester RPC](/reference-client/rpc-reference/harvester-rpc).

## Related

- [CLI overview](/reference-client/cli-reference/cli)
- [Farmer CLI](/reference-client/cli-reference/farmer-cli)
- [Harvester RPC](/reference-client/rpc-reference/harvester-rpc)
