---
sidebar_label: Solver
title: Solver CLI
slug: /reference-client/cli-reference/solver-cli
---

The Solver service accepts JSON-RPC over TLS on port 8667 by default (`solver.rpc_port` in `config.yaml`). HTTP endpoints are documented on [Solver RPC](/reference-client/rpc-reference/solver-rpc). From the shell, call `chia rpc solver <method> '<json>'` like other services (see [RPC overview](/reference-client/rpc-reference/rpc)).

Sources: [`chia/cmds/solver.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/solver.py).

## Reference

## `chia solver get_state`

Functionality: Return runtime state from the Solver service over the CLI helper (same data as `chia rpc solver get_state`).

Usage: `chia solver get_state [OPTIONS]`

Options:

| Short Command | Long Command        | Type    | Required | Description                                               |
| :------------ | :------------------ | :------ | :------- | :-------------------------------------------------------- |
| `-sp`         | `--solver-rpc-port` | INTEGER | False    | Solver RPC port (see `solver.rpc_port` in `config.yaml`). |
| `-h`          | `--help`            | None    | False    | Show a help message and exit.                             |

<details>
<summary>Example (CLI)</summary>

````mdx-code-block
```bash
chia solver get_state
chia solver get_state -sp 8667
```
````

Response:

````mdx-code-block
```text
(JSON-style solver status when the service is running; if the solver is stopped you get a connection error naming the host and port.)
```
````

</details>

<details>
<summary>Example (`chia rpc`)</summary>

See also Windows quoting notes on [RPC overview](/reference-client/rpc-reference/rpc).

````mdx-code-block
```bash
chia rpc solver get_state '{}'
```
````

Response:

````mdx-code-block
```json
{
  "started": true
}
```
````

When TLS services are down, the client prints a connection error instead of JSON.

</details>

## Farmer integration

- CLI: [`chia farm connect-solver`](/reference-client/cli-reference/farmer-cli#chia-farm-connect-solver)
- RPC: `connect_to_solver` on [Farmer RPC](/reference-client/rpc-reference/farmer-rpc)
- Config: `chia configure --set-solver-peer` and `farmer.solver_peers` (see the configure section on the [CLI overview](/reference-client/cli-reference/cli))

## Related

- [CLI overview](/reference-client/cli-reference/cli)
- [Farmer CLI](/reference-client/cli-reference/farmer-cli)
- [Solver RPC](/reference-client/rpc-reference/solver-rpc)
- [RPC overview](/reference-client/rpc-reference/rpc)
