---
sidebar_label: Solver
title: Solver RPC
slug: /reference-client/rpc-reference/solver-rpc
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document provides a comprehensive reference to Chia's Solver RPC API. Routes defined on `SolverRpcApi` are merged with the shared HTTP RPC routes from `RpcServer` (for example connection management, logging, version, and health checks).

The Solver participates in Proof of Space 2 (PoS2) farming with V2 plots. Farmers open a **peer** connection to the solver using [`connect_to_solver`](/reference-client/rpc-reference/farmer-rpc#connect_to_solver) on the farmer RPC (typically peer port **8666**, `solver.port`). **This page documents the Solver's HTTPS JSON-RPC interface** on `solver.rpc_port` (default **8667**).

:::note Peer port versus RPC port

- **`solver.port`**: peer protocol used when the farmer connects to the solver (`chia rpc farmer connect_to_solver …`).
- **`solver.rpc_port`**: TLS JSON-RPC for `chia rpc solver …` and the endpoints below.

:::

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet"}'
```

To run the same command on Windows, you need to escape the quotes, so it looks like this (the braces have been removed to support the formatting for this page. You still need to use them in your actual commands.):

```powershell
chia rpc wallet create_new_wallet '{\"wallet_type\": \"nft_wallet\"}'
```

</details>

---

### `get_state`

Functionality: Report whether the solver service has finished its startup sequence (`started`).

Usage: chia rpc solver [OPTIONS] get_state [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc solver get_state
```

Response:

```json
{
  "started": true
}
```

</details>

---

### `get_routes`

Functionality: List all available RPC routes

Usage: chia rpc solver [OPTIONS] get_routes [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc solver get_routes
```

Response:

```json
{
  "routes": [
    "/get_state",
    "/get_network_info",
    "/get_connections",
    "/open_connection",
    "/close_connection",
    "/stop_node",
    "/get_routes",
    "/get_version",
    "/healthz",
    "/get_log_level",
    "/set_log_level",
    "/reset_log_level"
  ],
  "success": true
}
```

</details>

---
