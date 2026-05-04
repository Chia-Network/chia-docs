---
sidebar_label: Harvester
title: Harvester RPC
slug: /reference-client/rpc-reference/harvester-rpc
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This document provides a comprehensive reference to Chia's Harvester RPC API. Routes defined on `HarvesterRpcApi` are merged with the shared HTTP RPC routes from `RpcServer` (for example connection management, logging, version, and health checks).

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

### `add_plot_directory`

Functionality: Add a new plot directory

Usage: chia rpc harvester [OPTIONS] add_plot_directory [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag    | Type | Required | Description                           |
| :------ | :--- | :------- | :------------------------------------ |
| dirname | TEXT | True     | The full path of the directory to add |

:::note

Note that the new directory must already exist on the system

:::

<details>
<summary>Example</summary>

First, add the directory to the local file system:

```bash
mkdir /plots_new
```

Next, add the new directory to the harvester's list:

```json
chia rpc harvester add_plot_directory '{"dirname": "/plots_new"}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `delete_plot`

Functionality: Delete a single plot

Usage: chia rpc harvester [OPTIONS] delete_plot [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag     | Type | Required | Description                         |
| :------- | :--- | :------- | :---------------------------------- |
| filename | TEXT | True     | The file name of the plot to delete |

:::note

As long as this command includes the required `filename` flag, it will always output `"success": true`, even if the filename was invalid

:::

<details>
<summary>Example</summary>

```json
chia rpc harvester delete_plot '{"filename": "/plots/plot-k25-2022-07-11-19-22-a2ece0fd13e017f7b88911be5f91aa1e1866c89964c863f743f5c92e07118805.plot"}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `get_plots`

Functionality: List all local plots

Usage: chia rpc harvester [OPTIONS] get_plots [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

:::note

The plots will be grouped into three categories:

- `failed_to_open_filenames` - plots that the harvester was unable to open; these plots may be incomplete, corrupted or otherwise damaged
- `not_found_filenames` - typically these are plots that exist and are readable, but were created under a different key than the current one
- `plots` - a listing of all valid plots that were created with the current key used by the harvester

:::

<details>
<summary>Example</summary>

```json
chia rpc harvester get_plots
```

Response:

```json
{
  "failed_to_open_filenames": [],
  "not_found_filenames": [
    "/plots/plot-k25-2022-07-11-21-33-4c01531e1b09b758705d1f12c77028e81cafb79c091330453eb249b089e46471.plot"
  ],
  "plots": [
    {
      "file_size": 674281385,
      "filename": "/plots/plot-k25-2023-03-01-14-52-160798793b22b998133bbf5b2021ed70d24feb0e20d040668c685df2c7caf76a_2.plot",
      "plot_id": "0x160798793b22b998133bbf5b2021ed70d24feb0e20d040668c685df2c7caf76a",
      "plot_public_key": "0xa82069430a7ef8a6491f8b3a5ec64553a33b86e0a713ad03106879231ae77161a0b860df659dbfbb1cc07b6343e95d62",
      "pool_contract_puzzle_hash": "0xf5daa5a0d83c6a628782a386aa1f94ff041e29c4da4b9b97f91f4d46563d8e9b",
      "pool_public_key": null,
      "size": 25,
      "time_modified": 1677653720
    },
    {
      "file_size": 674281385,
      "filename": "/plots/plot-k25-2023-03-01-14-52-160798793b22b998133bbf5b2021ed70d24feb0e20d040668c685df2c7caf76a.plot",
      "plot_id": "0x160798793b22b998133bbf5b2021ed70d24feb0e20d040668c685df2c7caf76a",
      "plot_public_key": "0xa82069430a7ef8a6491f8b3a5ec64553a33b86e0a713ad03106879231ae77161a0b860df659dbfbb1cc07b6343e95d62",
      "pool_contract_puzzle_hash": "0xf5daa5a0d83c6a628782a386aa1f94ff041e29c4da4b9b97f91f4d46563d8e9b",
      "pool_public_key": null,
      "size": 25,
      "time_modified": 1677653720
    }
  ],
  "success": true
}
```

</details>

---

### `get_plot_directories`

Functionality: List all plot directories

Usage: chia rpc harvester [OPTIONS] get_plot_directories [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc harvester get_plot_directories
```

Response:

```json
{
    "directories": [
        "/plots",
        "/plots_new"
    ],
    "success": true
}
```

</details>

---

### `get_harvester_config`

Functionality: Return the current harvester runtime configuration (GPU use, decompressor threads, plot scan behavior, and plot refresh interval).

Usage: chia rpc harvester [OPTIONS] get_harvester_config [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc harvester get_harvester_config
```

Response:

```json
{
  "decompressor_thread_count": 0,
  "disable_cpu_affinity": false,
  "enforce_gpu_index": false,
  "gpu_index": 0,
  "parallel_decompressor_count": 0,
  "recursive_plot_scan": false,
  "refresh_parameter_interval_seconds": 120,
  "use_gpu_harvesting": false
}
```

</details>

---

### `update_harvester_config`

Functionality: Update harvester configuration. Only keys present in the request are applied; omitted keys keep their current values. Persisted configuration is updated through the harvester service.

Usage: chia rpc harvester [OPTIONS] update_harvester_config [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters (all optional):

| Flag                               | Type    | Description                                                                                    |
| :--------------------------------- | :------ | :--------------------------------------------------------------------------------------------- |
| use_gpu_harvesting                 | BOOLEAN | Enable or disable GPU harvesting                                                               |
| gpu_index                          | INTEGER | GPU device index                                                                               |
| enforce_gpu_index                  | BOOLEAN | Whether to enforce the configured GPU index                                                    |
| disable_cpu_affinity               | BOOLEAN | Disable CPU affinity pinning for harvester workers                                             |
| parallel_decompressor_count        | INTEGER | Number of parallel decompressors                                                                 |
| decompressor_thread_count          | INTEGER | Thread count for decompressors                                                                 |
| recursive_plot_scan                | BOOLEAN | Whether to scan plot directories recursively                                                   |
| refresh_parameter_interval_seconds | INTEGER | Seconds between plot refresh parameter updates; must be at least **3** or the call raises an error |

<details>
<summary>Example</summary>

```json
chia rpc harvester update_harvester_config '{"recursive_plot_scan": true, "refresh_parameter_interval_seconds": 120}'
```

Response:

```json
{}
```

</details>

---

### `get_routes`

Functionality: List all available RPC routes

Usage: chia rpc harvester [OPTIONS] get_routes [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc harvester get_routes
```

Response:

```json
{
  "routes": [
    "/add_plot_directory",
    "/close_connection",
    "/delete_plot",
    "/get_connections",
    "/get_harvester_config",
    "/get_log_level",
    "/get_network_info",
    "/get_plot_directories",
    "/get_plots",
    "/get_routes",
    "/get_version",
    "/healthz",
    "/open_connection",
    "/refresh_plots",
    "/remove_plot_directory",
    "/reset_log_level",
    "/set_log_level",
    "/stop_node",
    "/update_harvester_config"
  ],
  "success": true
}
```

</details>

---

### `refresh_plots`

Functionality: Refresh all plots from the harvester

Usage: chia rpc harvester [OPTIONS] refresh_plots [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

:::note

If successful, this command will output `"success": true`

:::

<details>
<summary>Example</summary>

```json
chia rpc harvester refresh_plots
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `remove_plot_directory`

Functionality: Remove a directory from the harvester's list of plot directories

Usage: chia rpc harvester [OPTIONS] remove_plot_directory [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag    | Type | Required | Description                              |
| :------ | :--- | :------- | :--------------------------------------- |
| dirname | TEXT | True     | The full path of the directory to remove |

:::note

As long as this command includes the required `dirname` flag, it will always output `"success": true`, even if the dirname is not in the directory list

:::

<details>
<summary>Example</summary>

```json
chia rpc harvester remove_plot_directory '{"dirname": "/plots_new"}'
```

Response:

```json
{
  "success": true
}
```

</details>

---
