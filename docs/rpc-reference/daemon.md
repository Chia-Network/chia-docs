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

## wscat usage

This reference contains examples that make RPC calls directly from a terminal window on a running node.

You can also make the same RPC calls to the daemon over a websocket. To do this, first you will need to install [wscat](https://www.npmjs.com/package/wscat), for example by running:

```bash
npm install -g wscat
```

Once wscat is installed, you can open a connection to the daemon. The command to run depends on your OS:

```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```
   Be sure to replace `username` with your actual username for both the `.crt` and `.key` file.

   ```powershell
   wscat -n --cert C:\Users\<username>\.chia\mainnet\config\ssl\daemon\private_daemon.crt --key C:\Users\<username>\.chia\mainnet\config\ssl\daemon\private_daemon.key -c wss://0.0.0.0:55400
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   wscat -n --cert ~/.chia/mainnet/config/ssl/daemon/private_daemon.crt --key ~/.chia/mainnet/config/ssl/daemon/private_daemon.key -c wss://0.0.0.0:55400
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   wscat -n --cert ~/.chia/mainnet/config/ssl/daemon/private_daemon.crt --key ~/.chia/mainnet/config/ssl/daemon/private_daemon.key -c wss://0.0.0.0:55400
   ```

```mdx-code-block
  </TabItem>
</Tabs>
```

---

Once connected, you will see a `>` prompt from wscat.

To submit a request, run something like the following command, which calls `get_wallet_addresses`, with request parameters contained inside the `data` parameter:

```bash
{"ack": false, "command": "get_wallet_addresses", "data": {"fingerprints":[2104826454], "index": 100, "count": 2}, "destination": "daemon", "origin": "whatever", "request_id": "also_whatever"}
```

Response:

```bash
{"ack": true, "command": "get_wallet_addresses", "data": {"success": true, "wallet_addresses": {"2104826454": [{"address": "xch12yjgrn6m4eyszt9e3v3thczn2d6jlzvh2zjhnp0ar4kxhll8942sqq4s93", "hd_path": "m/12381/8444/2/100"}, {"address": "xch12hqq8g35gprs5r4vz366sf4r0mcvpmcy28a4tcfyda75avur4sas5vzvuj", "hd_path": "m/12381/8444/2/101"}]}}, "destination": "whatever", "origin": "daemon", "request_id": "also_whatever"}
```

You can also use this websocket connection with the daemon to call RPCs on other services via the daemon.
This is how the Chia GUI operates. It only has a websocket connection open to the daemon -- all other RPCs are dispatched by the daemon and routed back to the `wallet_ui` service (the service name for the Chia GUI).

To make this work, there's an extra step. You need to first call the `register_service` command to give your websocket connection a name.

For example, to register the websocket connect with the service name `my_fancy_service`, run:

```bash
{"ack": false, "command": "register_service", "data": {"service": "my_fancy_service"}, "destination": "daemon", "origin": "my_fancy_service", "request_id": "abc123"}
```

Response:

```bash
{"ack": true, "command": "register_service", "data": {"success": true}, "destination": "my_fancy_service", "origin": "daemon", "request_id": "abc123"}
```

At this point, you can call other service RPCs:

```bash
{"ack": false, "command": "get_blockchain_state", "data": {}, "destination": "chia_full_node", "origin": "my_fancy_service", "request_id": "def456"}
```

Response:

```bash
{"ack": true, "command": "get_blockchain_state", "data": {"blockchain_state": {"average_block_time": 18, "block_max_cost": 11000000000, "difficulty": 2528, "genesis_challenge_initialized": true, "mempool_cost": 129478906, "mempool_fees": 100000, "mempool_max_total_cost": 550000000000, "mempool_min_fees": {"cost_5000000": 0}, "mempool_size": 3, "node_id": "b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab", "peak": {"challenge_block_info_hash": "0x5b489143d48665e38ea306b1998f2873a6caa9113dc7374b55c5b7c17cf24936", "challenge_vdf_output": {"data": "0x02007d3c3fe1a93f60c475d5627a78358eb704f14002fc1862ec9746793ae4f4416ddaac8fe09c5a7fdbb71432be9bfbb41c4b383754889a55ae9b4d12dab4dac920676e873d2785860b054a2a618d8ee07a866c6bebab1338fa419d3c6bcea4e9000201"}, "deficit": 0, "farmer_puzzle_hash": "0x780c9bf0c48ea993c59ed0fd7687417be48233d916827c63157bd6a867d930aa", "fees": null, "finished_challenge_slot_hashes": null, "finished_infused_challenge_slot_hashes": null, "finished_reward_slot_hashes": null, "header_hash": "0x76fdf9c8090985de6bb537ba4d429462dffc5673cfe963dbe5369e95661d6a7a", "height": 4154084, "infused_challenge_vdf_output": {"data": "0x0000ee9f4f1b5f8c5d4c56a0c8f4977a091aef061f190cac00d80ef449d9221f2c46c22dc5f7ba30f0f9eeef2ee68d347f1765c6e44101aa4fc33ae968698e997d0095c5ddd4bc5dcdc23b54dd909fac3d03285df19ebffc5a9ef2e5442935d302040500"}, "overflow": false, "pool_puzzle_hash": "0x95023147c517f9be14037dbbeb105adb48942e036e0df8ab2962d53800a4b925", "prev_hash": "0x2283b7875556deedbc4ca7a874476ae6930769c18a7f6e1b3bdb2c04b9a1a4ce", "prev_transaction_block_hash": null, "prev_transaction_block_height": 4154081, "required_iters": 1092462, "reward_claims_incorporated": null, "reward_infusion_new_challenge": "0xfffc3371c8521a13c97e75e0412186bb6e53424ef807272d6fdda5f57e591254", "signage_point_index": 25, "sub_epoch_summary_included": null, "sub_slot_iters": 147849216, "timestamp": null, "total_iters": 17563259743086, "weight": 8641556544}, "space": 33037817585788604416, "sub_slot_iters": 147849216, "sync": {"sync_mode": false, "sync_progress_height": 0, "sync_tip_height": 0, "synced": true}}, "success": true}, "destination": "my_fancy_service", "origin": "chia_full_node", "request_id": "def456"}
```

Note that if you skip the `register_service` step and attempt to make such a call, the call will go through, but you won't see the response.

---

## Daemon Server RPCs

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
<summary>Example 1</summary>

Remove the real passphrase:

```json
chia rpc daemon remove_keyring_passphrase '{"current_passphrase": "12345678"}'
```

Response:

```json
{
    "error": null,
    "success": true
}
```

</details>

<details>
<summary>Example 2</summary>

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

| Flag               | Type    | Required | Description                                                                                                                                                                 |
| :----------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| current_passphrase | STRING  | True     | The current passphrase (if none, use an empty string)                                                                                                                       |
| new_passphrase     | STRING  | True     | The new passphrase, by default must be at least 8 characters long                                                                                                           |
| passphrase_hint    | STRING  | False    | The new passphrase hint, if one is desired                                                                                                                                  |
| save_passphrase    | BOOLEAN | False    | Whether to save the new passphrase to your system's secure credential store, thus allowing Chia to access your keys without prompting for your passphrase. [Default: False] |

<details>
<summary>Example</summary>

```json
chia rpc daemon set_keyring_passphrase '{"current_passphrase": "", "new_passphrase": "12345678", "passphrase_hint": "It has eight characters"}'
```

Response:

```json
{
    "error": null,
    "success": true
}
```

</details>

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

<details>
<summary>Example</summary>

```json
chia rpc daemon unlock_keyring '{"key": "12345678"}'
```

Response:

```json
{
    "error": null,
    "success": true
}
```

</details>

---

### `validate_keyring_passphrase`

Functionality: Verify whether the input passphrase is correct

Usage: chia rpc daemon [OPTIONS] validate_keyring_passphrase [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag | Type   | Required | Description      |
| :--- | :----- | :------- | :--------------- |
| key  | STRING | True     | The key to check |

<details>
<summary>Example</summary>

```json
chia rpc daemon validate_keyring_passphrase '{"key": "12345678"}'
```

Response:

```json
{
    "error": null,
    "success": true
}
```

</details>

---

## Plotter RPCs

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

## Keychain Server RPCs

### `add_private_key`

Functionality: Add a new private key from a mnemonic word list

Usage: chia rpc daemon [OPTIONS] add_private_key [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag     | Type   | Required | Description                                      |
| :------- | :----- | :------- | :----------------------------------------------- |
| mnemonic | STRING | True     | The mnemonic word list (see below for details)   |
| label    | STRING | False    | The label to assign for this key [Default: None] |

Requirements for the mnemonic word list:
* Must be input as a single string
* Order is important
* Must be delineated by spaces
* Must be either 12 or 24 words long
* Each word must be in the [BIP-39 word list](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)
* The mnemonic must form a valid private key

<details>
<summary>Example 1: success</summary>

The following example adheres to each of the above rules:

```json
chia rpc daemon add_private_key '{"mnemonic": "concert tooth egg defy journey lottery deposit market share lion diesel hand", "label": "Example Key"}'
```

Response:

```json
{
    "fingerprint": 1542304282,
    "success": true
}
```

</details>

<details>
<summary>Example 2: invalid length</summary>

The mnemonic must be either 12 or 24 words. Else, an error will be returned. For example:

```json
chia rpc daemon add_private_key '{"mnemonic": "1 2 3 4 5 6 7 8 9 10 11 12 13", "label": "Example Key"}'
```

Response:

```json
{
    "error": "Invalid mnemonic length",
    "success": false
}
```

</details>

<details>
<summary>Example 3: invalid word</summary>

Each word must be in the BIP-39 word list. Else, an error will be returned. For example:

```json
chia rpc daemon add_private_key '{"mnemonic": "1 2 3 4 5 6 7 8 9 10 11 12", "label": "Example Key"}'
```

Response:

```json
{
    "error": "'1' is not in the mnemonic dictionary; may be misspelled",
    "success": false
}
```

</details>

<details>
<summary>Example 4: Invalid word order</summary>

If the mnemonic is 12 or 24 words, and each word is in the BIP-39 word list, the final check is that the words form a valid mnemonic phrase. For example:

```json
chia rpc daemon add_private_key '{"mnemonic": "you can test this example word list because they tell you stuff", "label": "Example Key"}'
```

Response:

```json
{
    "error": "Invalid order of mnemonic words",
    "success": false
}
```

</details>

---

### `check_keys`

Functionality: 

Usage: chia rpc daemon [OPTIONS] check_keys [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag      | Type   | Required |
| :-------- | :----- | :------- |
| root_path | STRING | True     | 

---

### `delete_all_keys`

Functionality: Delete all keys

Usage: chia rpc daemon [OPTIONS] delete_all_keys [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

Note that this command will fail if the OS key ring is locked.

:::warning

This command will delete all of your local Chia keys. Use with caution.

:::

---

### `delete_key_by_fingerprint`

Functionality: Delete the key corresponding to the input fingerprint

Usage: chia rpc daemon [OPTIONS] delete_key_by_fingerprint [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag        | Type    | Required | Description                                  |
| :---------- | :------ | :------- | :------------------------------------------- |
| fingerprint | INTEGER | True     | The fingerprint whose key you want to delete |

Note that this command will fail if the OS key ring is locked.

<details>
<summary>Example</summary>

```json
chia rpc daemon delete_key_by_fingerprint '{"fingerprint": 1542304282}'
```

Response:

```json
{
    "success": true
}
```

To verify that the key was deleted, you can call `get_public_key`. For example:

```json
chia rpc daemon get_public_key '{"fingerprint": 1542304282}'
```

Response:

```json
{
    "error": "key not found",
    "error_details": {
        "fingerprint": 1542304282
    },
    "success": false
}
```

</details>

---

### `get_all_private_keys`

Functionality: List all private keys, along with their respective entropies

Usage: chia rpc daemon [OPTIONS] get_all_private_keys [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

Note that this command will fail if the OS key ring is locked.

<details>
<summary>Example</summary>

```json
chia rpc daemon get_all_private_keys
```

Response:

```json
{
    "private_keys": [
        {
            "entropy": "2ebc991b1cd787080ec441c53044f634",
            "pk": "a2cc00aff448432ef72e7c60ef4ef6f39ce72748c91f1ec15262821cf7f56bcf0a509c9354ec5104604ebbe276511263",
        }
        {
            "entropy": "entropy of pk2",
            "pk": "pk2"
        }
    ],
    "success": true
}
```

</details>

---

### `get_first_private_key`

Functionality: Obtain the first private key, along with its entropy

Usage: chia rpc daemon [OPTIONS] get_first_private_key [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

Note that this command will fail if the OS key ring is locked.

<details>
<summary>Example</summary>

```json
chia rpc daemon get_first_private_key
```

Response:

```json
{
    "entropy": "2ebc991b1cd787080ec441c53044f634",
    "pk": "a2cc00aff448432ef72e7c60ef4ef6f39ce72748c91f1ec15262821cf7f56bcf0a509c9354ec5104604ebbe276511263",
    "success": true
}
```

</details>

---

### `get_key_for_fingerprint`

Functionality: Given a fingerprint, list the corresponding private key and entropy

Usage: chia rpc daemon [OPTIONS] get_key_for_fingerprint [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag      | Type    | Required | Description                                             |
| :-------- | :------ | :------- | :------------------------------------------------------ |
| fingerprint | INTEGER | False    | The fingerprint to look up [Default: get the first key] |

<details>
<summary>Example</summary>

```json
chia rpc daemon get_key_for_fingerprint '{"fingerprint": 1542304282}'
```

Response:

```json
{
    "entropy": "2ebc991b1cd787080ec441c53044f634",
    "pk": "a2cc00aff448432ef72e7c60ef4ef6f39ce72748c91f1ec15262821cf7f56bcf0a509c9354ec5104604ebbe276511263",
    "success": true
}
```

</details>

---

### `get_key`

Functionality: Given a fingerprint, retrieve the corresponding key

Usage: chia rpc daemon [OPTIONS] get_key [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag            | Type    | Required | Description                                                         |
| :-------------- | :------ | :------- | :------------------------------------------------------------------ |
| fingerprint     | INTEGER | True     | The fingerprint whose key you want to look up                       |
| include_secrets | BOOLEAN | False    | Set to `true` to include secrets in the response [Default: `false`] |

<details>
<summary>Example</summary>

```json
chia rpc daemon get_key '{"fingerprint": 1542304282}'
```

Response:

```json
{
    "key": {
        "fingerprint": 1542304282,
        "label": "Example Key",
        "public_key": "0xa2cc00aff448432ef72e7c60ef4ef6f39ce72748c91f1ec15262821cf7f56bcf0a509c9354ec5104604ebbe276511263",
        "secrets": null
    },
    "success": true
}
```

</details>

---

### `get_keys`

Functionality: Get all public keys, with the option of including secrets

Usage: chia rpc daemon [OPTIONS] get_keys [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag            | Type    | Required | Description                                                         |
| :-------------- | :------ | :------- | :------------------------------------------------------------------ |
| include_secrets | BOOLEAN | False    | Set to `true` to include secrets in the response [Default: `false`] |

<details>
<summary>Example</summary>

```json
chia rpc daemon get_keys
```

Response:

```json
{
    "keys": [
        {
            "fingerprint": 1542304282,
            "label": "Example Key",
            "public_key": "0xa2cc00aff448432ef72e7c60ef4ef6f39ce72748c91f1ec15262821cf7f56bcf0a509c9354ec5104604ebbe276511263",
            "secrets": null
        }
    ],
    "success": true
}
```

</details>

---

### `get_public_key`

Functionality: Get the public key from a specified fingerprint

Usage: chia rpc daemon [OPTIONS] get_public_key [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag            | Type    | Required | Description                                   |
| :-------------- | :------ | :------- | :-------------------------------------------- |
| fingerprint     | INTEGER | True     | The fingerprint whose key you want to look up |

<details>
<summary>Example</summary>

```json
chia rpc daemon get_public_key '{"fingerprint": 1542304282}'
```

Response:

```json
{
    "key": {
        "fingerprint": 1542304282,
        "label": "Example Key",
        "public_key": "0xa2cc00aff448432ef72e7c60ef4ef6f39ce72748c91f1ec15262821cf7f56bcf0a509c9354ec5104604ebbe276511263"
    },
    "success": true
}
```

</details>

---

### `get_public_keys`

Functionality: Get all public keys

Usage: chia rpc daemon [OPTIONS] get_public_keys [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc daemon get_public_keys
```

Response:

```json
{
    "keys": [

        {
            "fingerprint": 1542304282,
            "label": "Example Key",
            "public_key": "0xa2cc00aff448432ef72e7c60ef4ef6f39ce72748c91f1ec15262821cf7f56bcf0a509c9354ec5104604ebbe276511263"
        }
    ],
    "success": true
}
```

</details>

---

### `set_label`

Functionality: Set the label for the specified key

Usage: chia rpc daemon [OPTIONS] set_label [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag            | Type    | Required | Description                                 |
| :-------------- | :------ | :------- | :------------------------------------------ |
| fingerprint     | INTEGER | True     | The fingerprint whose label you want to set |
| label           | STRING  | True     | The new label                               |

<details>
<summary>Example</summary>

```json
chia rpc daemon set_label '{"fingerprint": 1542304282, "label": "New Label"}'
```

Response:

```json
{
    "success": true
}
```

To verify that the label was set, you can call `get_public_key`. For example:

```json
chia rpc daemon get_public_key '{"fingerprint": 1542304282}'
```

Response:

```json
{
    "key": {
        "fingerprint": 1542304282,
        "label": "New Label",
        "public_key": "0xa2cc00aff448432ef72e7c60ef4ef6f39ce72748c91f1ec15262821cf7f56bcf0a509c9354ec5104604ebbe276511263"
    },
    "success": true
}
```

</details>

---

### `delete_label`

Functionality: Delete the label for the specified fingerprint

Usage: chia rpc daemon [OPTIONS] delete_label [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: 

| Flag            | Type    | Required | Description                                    |
| :-------------- | :------ | :------- | :--------------------------------------------- |
| fingerprint     | INTEGER | True     | The fingerprint whose label you want to delete |

<details>
<summary>Example</summary>

```json
chia rpc daemon delete_label '{"fingerprint": 1542304282}'
```

Response:

```json
{
    "success": true
}
```

To verify that the label was set, you can call `get_public_key`. For example:

```json
chia rpc daemon get_public_key '{"fingerprint": 1542304282}'
```

Response:

```json
{
    "key": {
        "fingerprint": 1542304282,
        "label": null,
        "public_key": "0xa2cc00aff448432ef72e7c60ef4ef6f39ce72748c91f1ec15262821cf7f56bcf0a509c9354ec5104604ebbe276511263"
    },
    "success": true
}
```

</details>

---
