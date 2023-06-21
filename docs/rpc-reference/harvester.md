---
sidebar_label: Harvester
title: Harvester RPC
slug: /harvester-rpc
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This document provides a comprehensive reference to Chia's Harvester RPC API.

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc harvester add_plot_directory '{"dirname": "C:\\plots"}'
```

To run the same command on Windows, you need to escape the quotes with backslashes. In other words, add a \ before each double quote, such that:

    "dirname" becomes \"dirname\"
    "C:\\plots" becomes \"C:\\plots\"

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
        "/plots"
        "/plots_new"
    ],
    "success": true
}
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
{
  "routes": [
    "/get_plots",
    "/refresh_plots",
    "/delete_plot",
    "/add_plot_directory",
    "/get_plot_directories",
    "/remove_plot_directory",
    "/get_connections",
    "/open_connection",
    "/close_connection",
    "/stop_node",
    "/get_routes",
    "/healthz"
  ],
  "success": true
}
```

Response:

```json
chia rpc harvester get_routes
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
