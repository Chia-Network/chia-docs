---
sidebar_label: Solver
title: Solver CLI
slug: /reference-client/cli-reference/solver-cli
---

The **Solver** service accepts JSON-RPC over TLS on port **8667** by default (`solver.rpc_port` in `config.yaml`). Method-level HTTP RPC documentation is on [Solver RPC](/reference-client/rpc-reference/solver-rpc). Call methods from the shell with `chia rpc solver <method> '<json>'` like other services (see [RPC overview](/reference-client/rpc-reference/rpc)).

Sources: [`chia/cmds/solver.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/solver.py).

## `chia solver`

### `chia solver get_state`

Usage: `chia solver get_state [OPTIONS]`

Returns current solver state from the running Solver service.

| Option                     | Description                                               |
| :------------------------- | :-------------------------------------------------------- |
| `-sp`, `--solver-rpc-port` | Solver RPC port (see `solver.rpc_port` in `config.yaml`). |

## Farmer integration

- CLI: [`chia farm connect-solver`](/reference-client/cli-reference/farmer-cli#chia-farm-connect-solver)
- RPC: `connect_to_solver` and related calls on [Farmer RPC](/reference-client/rpc-reference/farmer-rpc)
- Config: `chia configure --set-solver-peer` and farmer `solver_peers` (see **configure** on the [CLI overview](/reference-client/cli-reference/cli))

## Related

- [CLI overview](/reference-client/cli-reference/cli)
- [Farmer CLI](/reference-client/cli-reference/farmer-cli)
- [Solver RPC](/reference-client/rpc-reference/solver-rpc)
- [RPC overview](/reference-client/rpc-reference/rpc)
