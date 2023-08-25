---
sidebar_label: Daemon
title: Daemon RPC
slug: /daemon-rpc
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This document provides a comprehensive reference to Chia's Daemon RPC API.

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc daemon get_keys_for_plotting '{"fingerprints":[2104826454]}'
```

To run the same command on Windows, you need to escape the quotes with backslashes. In other words, add a \ before each double quote, such that:

    "fingerprints" becomes \"fingerprints\"
    etc

</details>

---

### `exit`

Functionality: Stop the daemon and all of its running services

Usage: chia rpc daemon [OPTIONS] exit [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc daemon exit
```

Response:

```json
{
    "services_stopped": [
        "chia_wallet",
        "chia_full_node",
        "chia_farmer",
        "chia_harvester"
    ],
    "success": true
}
```

</details>

---

### `get_keys_for_plotting`

Functionality: Show the `farmer_public_key` and `pool_public_key` for one or more wallet fingerprints

Usage: chia rpc daemon [OPTIONS] get_keys_for_plotting [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag         | Type   | Required | Description                                                                                 |
| :----------- | :----- | :------- | :------------------------------------------------------------------------------------------ |
| fingerprints | NUMBER | False    | List the keys for the specified fingerprints only [Default: list keys for all fingerprints] |

<details>
<summary>Example</summary>

Show the keys for one specific fingerprint:

```json
chia rpc daemon get_keys_for_plotting '{"fingerprints":[2104826454]}'
```

Response:

```json
{
    "keys": {
        "2104826454": {
            "farmer_public_key": "82e79f17419e953da439bb9f5c40df4a26c0bbe2c1124178855a24067a6b8f3af8070dade09ca4c75fe3ba100e94fde6",
            "pool_public_key": "a3ef6951a9351239bdfff028825e4c2f659487eb3d0f25e50da6f1801bca9ab0c2e6a07a7f4e58b82ffd6c75be05e75f"
        }
    },
    "success": true
}
```

</details>

---

### `get_plotters`

Functionality: List all available plotters

Usage: chia rpc daemon [OPTIONS] get_plotters [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc daemon get_plotters
```

Response:

```json
{
    "plotters": {
        "bladebit": {
            "bladebit_memory_warning": "BladeBit requires at least 416 GiB of RAM to operate",
            "cuda_support": true,
            "display_name": "BladeBit Plotter",
            "installed": true,
            "version": "3.0.0"
        },
        "chiapos": {
            "display_name": "Chia Proof of Space",
            "installed": true,
            "version": "2.0.2"
        },
        "madmax": {
            "display_name": "madMAx Plotter",
            "installed": true,
            "version": "1.1.6-2092041"
        }
    },
    "success": true
}
```

</details>

---

### `get_routes`

Functionality: List all available Daemon RPC routes

Usage: chia rpc daemon [OPTIONS] get_routes [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc daemon get_routes
```

Response:

```json
{
    "routes": [
        "start_service",
        "start_plotting",
        "stop_plotting",
        "stop_service",
        "is_running",
        "running_services",
        "is_keyring_locked",
        "keyring_status",
        "unlock_keyring",
        "validate_keyring_passphrase",
        "set_keyring_passphrase",
        "remove_keyring_passphrase",
        "exit",
        "register_service",
        "get_status",
        "get_version",
        "get_plotters",
        "get_routes",
        "get_wallet_addresses",
        "get_keys_for_plotting"
    ],
    "success": true
}
```

</details>

---

### `get_status`

Functionality: Show the status of the daemon

Usage: chia rpc daemon [OPTIONS] get_status [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc daemon get_status
```

Response:

```json
{
    "genesis_initialized": true,
    "success": true
}
```

</details>

---

### `get_version`

Functionality: Show the version of the daemon

Usage: chia rpc daemon [OPTIONS] get_version [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc daemon get_version
```

Response:

```json
{
    "success": true,
    "version": "2.0.0"
}
```

</details>

---

### `get_wallet_addresses`

Functionality: List one or more addresses from one or more keys

Usage: chia rpc daemon [OPTIONS] get_wallet_addresses [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag                    | Type    | Required | Description                                                                                 |
| :---------------------- | :------ | :------- | :------------------------------------------------------------------------------------------ |
| fingerprints            | NUMBER  | False    | List the keys for the specified fingerprints only [Default: list keys for all fingerprints] |
| index                   | NUMBER  | False    | Starting index for addresses to list [Default: 0]                                           |
| count                   | NUMBER  | False    | Number of addresses to list [Default: 1]                                                    |
| non_observer_derivation | BOOLEAN | False    | Set to `True` to use non-observer derivation [Default: `False`]                             |

<details>
<summary>Example 1: default</summary>

The default behavior is to show the first address for all fingerprints.

```json
chia rpc daemon get_wallet_addresses
```

Response:

```json
{
    "success": true,
    "wallet_addresses": {
        "2104826454": [
            {
                "address": "xch1xdm7s8fq4kdrq28lulnhxcxq8h6gcsf0y5j643vqx4ec3z9dhq7sqxsa9j",
                "hd_path": "m/12381/8444/2/0"
            }
        ],
        "3792481086": [
            {
                "address": "xch1a99ua7jp6kegtxm74yhk3ggttnat9kcjq8dtt7g2mlkd3rl9an9q5xgt35",
                "hd_path": "m/12381/8444/2/0"
            }
        ]
    }
}
```

</details>

<details>
<summary>Example 2: custom</summary>

Show two addresses from one fingerprint, starting at index 100:

```json
chia rpc daemon get_wallet_addresses '{"fingerprints":[2104826454], "index": 100, "count": 2}'
```

Response:

```json
{
    "success": true,
    "wallet_addresses": {
        "2104826454": [
            {
                "address": "xch12yjgrn6m4eyszt9e3v3thczn2d6jlzvh2zjhnp0ar4kxhll8942sqq4s93",
                "hd_path": "m/12381/8444/2/100"
            },
            {
                "address": "xch12hqq8g35gprs5r4vz366sf4r0mcvpmcy28a4tcfyda75avur4sas5vzvuj",
                "hd_path": "m/12381/8444/2/101"
            }
        ]
    }
}
```

</details>

---

### `is_keyring_locked`

Functionality: Show whether the keyring is locked

Usage: chia rpc daemon [OPTIONS] is_keyring_locked [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc daemon is_keyring_locked
```

Response:

```json
{
    "is_keyring_locked": false,
    "success": true
}
```

</details>

---

### `is_running`

Functionality: 

Usage: chia rpc daemon [OPTIONS] is_running [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag    | Type   | Required | Description |
| :------ | :----- | :------- | :---------- |
| service | STRING | TRUE     | The service to query; valid examples include, but are not limited to, "chia_data_layer", "chia_data_layer_http", "chia_wallet", "chia_full_node", "chia_harvester", "chia_farmer", "chia_introducer", "chia_timelord", "chia_timelord_launcher", "chia_full_node_simulator", "chia_seeder", "chia_crawler", "wallet_ui" |

<details>
<summary>Example</summary>

Query whether the Chia wallet service is running:

```json
chia rpc daemon is_running '{"service": "chia_wallet"}'
```

Response:

```json
{
    "is_running": true,
    "service_name": "chia_wallet",
    "success": true
}
```

</details>

---

### `keyring_status`

Functionality: Show a snapshot of the keyring status

Usage: chia rpc daemon [OPTIONS] keyring_status [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc daemon keyring_status
```

Response:

```json
{
    "can_save_passphrase": true,
    "can_set_passphrase_hint": true,
    "is_keyring_locked": false,
    "passphrase_hint": "",
    "passphrase_requirements": {
        "is_optional": true,
        "min_length": 8
    },
    "success": true,
    "user_passphrase_is_set": true
}
```

</details>

---

### `register_service`

Functionality: Register a service

Usage: chia rpc daemon [OPTIONS] register_service [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag    | Type   | Required | Description                         |
| :------ | :----- | :------- | :---------------------------------- |
| service | STRING | TRUE     | The name of the service to register |


<details>
<summary>Example</summary>

```json
chia rpc daemon register_service '{"service": "chia_wallet"}'
```

Response:

```json
{
    "success": true
}
```

</details>

---

### `remove_keyring_passphrase`

Functionality: Remove a passphrase from the keyring

Usage: chia rpc daemon [OPTIONS] remove_keyring_passphrase [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag               | Type   | Required | Description                                                                       |
| :----------------- | :----- | :------- | :-------------------------------------------------------------------------------- |
| current_passphrase | STRING | True     | The current passphrase; if entered correctly, it will be removed from the keyring |

<details>
<summary>Example</summary>

Attempt to remove a fake passphrase:

```json
chia rpc daemon remove_keyring_passphrase '{"current_passphrase": "12345"}'
```

Response:

```json
{
    "error": "current passphrase is invalid",
    "success": false
}
```

</details>

---

### `running_services`

Functionality: Show all services that are currently running

Usage: chia rpc daemon [OPTIONS] running_services [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc daemon running_services
```

Response:

```json
{
    "running_services": [
        "chia_full_node",
        "chia_farmer",
        "chia_harvester",
        "chia_wallet",
        "wallet_ui"
    ],
    "success": true
}
```

</details>

---

### `set_keyring_passphrase`

Functionality: 

Usage: chia rpc daemon [OPTIONS] set_keyring_passphrase [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag               | Type    | Required | Description                                                       |
| :----------------- | :------ | :------- | :---------------------------------------------------------------- |
| current_passphrase | STRING  | True     | The current passphrase (if none, use an empty string)             | 
| new_passphrase     | STRING  | True     | The new passphrase, by default must be at least 8 characters long |
| passphrase_hint    | STRING  | False    | The new passphrase hint, if one is desired                        |
| save_passphrase    | BOOLEAN | False    | Whether to save the new passphrase [Default: False]               |

---

### `start_plotting`

Functionality: Create one or more plots with the desired plotter

Usage: chia rpc daemon [OPTIONS] start_plotting [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag      | Type    | Required | Description                                                            |
| :-------- | :------ | :------- | :--------------------------------------------------------------------- |
| service   | STRING  | True     | The plotting service to use                                            |
| plotter   | STRING  | False    | The plotter to use [Default: "chiapos"]                                |
| delay     | INTEGER | False    | The number of seconds to delay before starting to plot [Default: 0]    |
| parallel  | BOOLEAN | False    | Set to create multiple plots in parallel [Default: false]              |
| k         | INTEGER | True     | The k-size of the plot to create                                       |
| overrideK | BOOLEAN | True     | Set to `true` to create a plot smaller than k-32                       |
| r         | INTEGER | True     | The number of threads to use for creating the plot(s)                  |
| b         | INTEGER | True     | Size of the buffer, in MB                                              |
| u         | INTEGER | True     | Number of buckets                                                      |
| e         | BOOLEAN | True     | Set to `true` to disable bitfield                                      |
| t         | STRING  | True     | The temporary directory where the plot will be created                 | 
| d         | STRING  | True     | The destination where the plot will be moved after it has been created |
| x         | BOOLEAN | True     | Set to `true` to skip moving the plot after it has been created        |
| n         | INTEGER | False    | The number of plots to create [Default: 1]                             |
| queue     | STRING  | False    | The type of plotting queue [Default: "default"]                        |

---

### `start_service`

Functionality: Start a service

Usage: chia rpc daemon [OPTIONS] start_service [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag      | Type    | Required | Description                                                   |
| :-------- | :------ | :------- | :------------------------------------------------------------ |
| service   | STRING  | True     | The service to start                                          |
| testing   | Boolean | False    | If `true`, then test the start_service RPC [Default: `false`] |

<details>
<summary>Example</summary>

Start the wallet service:

```json
chia rpc daemon start_service '{"service": "chia_wallet"}'
```

Response:

```json
{
    "error": null,
    "service": "chia_wallet",
    "success": true
}
```

</details>

---

### `stop_plotting`

Functionality: 

Usage: chia rpc daemon [OPTIONS] stop_plotting [REQUEST]

Options: Stop creating a plot

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag | Type    | Required | Description                         |
| :--- | :------ | :------- | :---------------------------------- |
| id   | STRING  | True     | The ID of the plot to stop creating |

<details>
<summary>Example</summary>

```json
chia rpc daemon stop_plotting '{"id": "68607640-4dfc-4946-9a0d-186beec3b8f8"}'
```

Response:

```json
{
    "success": true
}
```

</details>

---

### `stop_service`

Functionality: Stop a service

Usage: chia rpc daemon [OPTIONS] stop_service [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag      | Type    | Required | Description         |
| :-------- | :------ | :------- | :------------------ |
| service   | STRING  | True     | The service to stop |

<details>
<summary>Example</summary>

Stop the wallet service:

```json
chia rpc daemon stop_service '{"service": "chia_wallet"}'
```

Response:

```json
{
    "service_name": "chia_wallet",
    "success": true
}
```

</details>

---

### `unlock_keyring`

Functionality: Unlock the keyring

Usage: chia rpc daemon [OPTIONS] unlock_keyring [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag | Type   | Required | Description                       |
| :--- | :----- | :------- | :-------------------------------- |
| key  | STRING | False    | The key to unlock [Default: None] |

---

### `validate_keyring_passphrase`

Functionality: Ensure that the keyring's passphrase is valid

Usage: chia rpc daemon [OPTIONS] validate_keyring_passphrase [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag | Type   | Required | Description                      |
| :--- | :----- | :------- | :------------------------------- |
| key  | STRING | False    | The key to check [Default: None] |

---
