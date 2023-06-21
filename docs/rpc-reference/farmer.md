---
sidebar_label: Farmer
title: Farmer RPC
slug: /farmer-rpc
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This document provides a comprehensive reference to Chia's Farmer RPC API.

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc farmer get_reward_targets '{"search_for_private_key": false}'
```

To run the same command on Windows, you need to escape the quotes with backslashes. In other words, add a \ before each double quote, such that:

    "search_for_private_key" becomes \"search_for_private_key\"
    etc

</details>

---

### `get_harvesters`

Functionality: List all harvesters in your network, including all plots on each individual harvester

Usage: chia rpc farmer [OPTIONS] get_harvesters [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc farmer get_harvesters
```

Response:

```json
{
  "harvesters": [
    {
      "connection": {
        "host": "127.0.0.1",
        "node_id": "0xbefeeb05fa599f07c5be2b94b2d872b2516f03101ed49cc53312f086de197913",
        "port": 61934
      },
      "duplicates": [],
      "failed_to_open_filenames": [],
      "last_sync_time": 1677653735.9421551,
      "no_key_filenames": [],
      "plots": [
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
      "syncing": null,
      "total_plot_size": 674281385
    }
  ],
  "success": true
}
```

</details>

---

### `get_harvesters_summary`

Functionality: List all harvesters in your network, including the number of plots (but not the individual plots)

Usage: chia rpc farmer [OPTIONS] get_harvesters_summary [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc farmer get_harvesters_summary
```

Response:

```json
{
  "harvesters": [
    {
      "connection": {
        "host": "127.0.0.1",
        "node_id": "0xbefeeb05fa599f07c5be2b94b2d872b2516f03101ed49cc53312f086de197913",
        "port": 61934
      },
      "duplicates": 0,
      "failed_to_open_filenames": 0,
      "last_sync_time": 1677653735.9421551,
      "no_key_filenames": 18,
      "plots": 1,
      "syncing": null,
      "total_plot_size": 674281385
    }
  ],
  "success": true
}
```

</details>

---

### `get_harvester_plots_duplicates`

Functionality: List duplicate plots

Usage: chia rpc farmer [OPTIONS] get_harvester_plots_duplicates [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type       | Required | Description                                                                      |
| :-------- | :--------- | :------- | :------------------------------------------------------------------------------- |
| node_id   | HEX STRING | True     | This node's `node_id`, obtainable from the [get_harvesters](#get_harvesters) RPC |
| page      | INTEGER    | True     | The page in the results sequence to list (starts with `0`)                       |
| page_size | INTEGER    | True     | The number of entries per page to list                                           |

Note that the request parameters are automatically combined to create `PlotInfoRequestData`.

<details>
<summary>Example</summary>

```json
chia rpc farmer get_harvester_plots_duplicates '{"node_id": "0xbefeeb05fa599f07c5be2b94b2d872b2516f03101ed49cc53312f086de197913", "page": 0, "page_size": 1}'
```

Response:

```json
{
  "node_id": "befeeb05fa599f07c5be2b94b2d872b2516f03101ed49cc53312f086de197913",
  "page": 0,
  "page_count": 1,
  "plots": [],
  "success": true,
  "total_count": 0
}
```

</details>

---

### `get_harvester_plots_invalid`

Functionality: List invalid plots in your local network

Usage: chia rpc farmer [OPTIONS] get_harvester_plots_invalid [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type       | Required | Description                                                                      |
| :-------- | :--------- | :------- | :------------------------------------------------------------------------------- |
| node_id   | HEX STRING | True     | This node's `node_id`, obtainable from the [get_harvesters](#get_harvesters) RPC |
| page      | INTEGER    | True     | The page in the results sequence to list (starts with `0`)                       |
| page_size | INTEGER    | True     | The number of entries per page to list                                           |

Note that the request parameters are automatically combined to create `PlotInfoRequestData`.

<details>
<summary>Example</summary>

```json
chia rpc farmer get_harvester_plots_invalid '{"node_id": "0xbefeeb05fa599f07c5be2b94b2d872b2516f03101ed49cc53312f086de197913", "page": 0, "page_size": 1}'
```

Response:

```json
{
  "node_id": "befeeb05fa599f07c5be2b94b2d872b2516f03101ed49cc53312f086de197913",
  "page": 0,
  "page_count": 1,
  "plots": [],
  "success": true,
  "total_count": 0
}
```

</details>

---

### `get_harvester_plots_keys_missing`

Functionality: List plots from your plot directories that have missing keys / are not associated with the current `node_id`

Usage: chia rpc farmer [OPTIONS] get_harvester_plots_keys_missing [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type       | Required | Description                                                                      |
| :-------- | :--------- | :------- | :------------------------------------------------------------------------------- |
| node_id   | HEX STRING | True     | This node's `node_id`, obtainable from the [get_harvesters](#get_harvesters) RPC |
| page      | INTEGER    | True     | The page in the results sequence to list (starts with `0`)                       |
| page_size | INTEGER    | True     | The number of entries per page to list                                           |

Note that the request parameters are automatically combined to create `PlotInfoRequestData`.

<details>
<summary>Example</summary>

```json
chia rpc farmer get_harvester_plots_keys_missing '{"node_id": "0xbefeeb05fa599f07c5be2b94b2d872b2516f03101ed49cc53312f086de197913", "page": 0, "page_size": 5}'
```

Response:

```json
{
  "node_id": "befeeb05fa599f07c5be2b94b2d872b2516f03101ed49cc53312f086de197913",
  "page": 0,
  "page_count": 4,
  "plots": [
    "/plots/plot-k25-2022-07-11-19-06-4d6433c28333540ddf8fe23915b9128363a123967676b69a8dd6c740b758e236.plot",
    "/plots/plot-k25-2022-07-11-19-08-a3f6d15955bf3b7d1f3b8f822956e8c8d6187a06144a88758ea2f8c8cd89cb31.plot",
    "/plots/plot-k25-2022-07-11-19-11-401393c153a0335ab4a846b39413ba7bef9f140dfd36f658e72050aa08abf6e7.plot",
    "/plots/plot-k25-2022-07-11-19-13-b3e7169303d6d7697f80f92d72d28a00537215e66316e12c6a5e2cf69889c88f.plot",
    "/plots/plot-k25-2022-07-11-19-15-7769e4a90f6c10cfed2cdb2e37755e92fe73febf265d8528cf333ff01406ca5f.plot"
  ],
  "success": true,
  "total_count": 18
}
```

</details>

---

### `get_harvester_plots_valid`

Functionality: List valid plots in your local network

Usage: chia rpc farmer [OPTIONS] get_harvester_plots_valid [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type       | Required | Description                                                                      |
| :-------- | :--------- | :------- | :------------------------------------------------------------------------------- |
| node_id   | HEX STRING | True     | This node's `node_id`, obtainable from the [get_harvesters](#get_harvesters) RPC |
| page      | INTEGER    | True     | The page in the results sequence to list (starts with `0`)                       |
| page_size | INTEGER    | True     | The number of entries per page to list                                           |

Note that the request parameters are automatically combined to create `PlotInfoRequestData`.

<details>
<summary>Example</summary>

```json
chia rpc farmer get_harvester_plots_valid '{"node_id": "0xbefeeb05fa599f07c5be2b94b2d872b2516f03101ed49cc53312f086de197913", "page": 0, "page_size": 1}'
```

Response:

```json
{
  "node_id": "befeeb05fa599f07c5be2b94b2d872b2516f03101ed49cc53312f086de197913",
  "page": 0,
  "page_count": 1,
  "plots": [
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
  "success": true,
  "total_count": 1
}
```

</details>

---

### `get_pool_login_link`

Functionality: Get a URI to view your pool info

Usage: chia rpc farmer [OPTIONS] get_pool_login_link [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type       | Required | Description                                                                               |
| :---------- | :--------- | :------- | :---------------------------------------------------------------------------------------- |
| launcher_id | HEX STRING | True     | The launcher_id from your pool, obtainable from the [get_pool_state](#get_pool_state) RPC |

<details>
<summary>Example</summary>

```json
chia rpc farmer get_pool_login_link '{"launcher_id": "0x55244acf3017c2fc245020b46600827047dce8f54c982adaf95248ff2e955ad8"}'
```

Response:

```json
{
  "login_link": "https://asia1.pool.space/login?launcher_id=55244acf3017c2fc245020b46600827047dce8f54c982adaf95248ff2e955ad8&authentication_token=5592184&signature=a529ccabdadb2f3cdb1dcefe8f3f609ab512d5a2b871e85e779d21329f593b1d1b95f6978483c09cf414f74d239c973e19d37b676eff11d019cc1f5849cf00e1b886f2d1c1520cf41ea9b7134ce599c67b216dcaa1bb226bbcf0a799f3c88554",
  "success": true
}
```

</details>

---

### `get_pool_state`

Functionality: If pooling is enabled, show all pool info, such as `p2_singleton_puzzle_hash` and `plot_count`

Usage: chia rpc farmer [OPTIONS] get_pool_state [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc farmer get_pool_state
```

Response:

```json
{
  "pool_state": [
    {
      "authentication_token_timeout": 5,
      "current_difficulty": 1,
      "current_points": 0,
      "next_farmer_update": 1677651891.2115443,
      "next_pool_info_update": 1677655190.955341,
      "p2_singleton_puzzle_hash": "f5daa5a0d83c6a628782a386aa1f94ff041e29c4da4b9b97f91f4d46563d8e9b",
      "plot_count": 0,
      "points_acknowledged_24h": [],
      "points_acknowledged_since_start": 0,
      "points_found_24h": [],
      "points_found_since_start": 0,
      "pool_config": {
        "launcher_id": "0x55244acf3017c2fc245020b46600827047dce8f54c982adaf95248ff2e955ad8",
        "owner_public_key": "0xb5ab4fb9ef69ac933868ef951fe7a78557ca334ff356b8eb79790ceb18ed4687ca78b96b0144c9d507d650905d7b98d9",
        "p2_singleton_puzzle_hash": "0xf5daa5a0d83c6a628782a386aa1f94ff041e29c4da4b9b97f91f4d46563d8e9b",
        "payout_instructions": "716f88dcadafa320d840aad02799a500fe4d01831dab6c0a47bb61f6451ad557",
        "pool_url": "https://asia1.pool.space",
        "target_puzzle_hash": "0x2f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57"
      },
      "pool_errors_24h": [
        {
          "error_code": 10,
          "error_message": "Farmer with launcher_id 55244acf3017c2fc245020b46600827047dce8f54c982adaf95248ff2e955ad8 unknown."
        },
        {
          "error_code": 10,
          "error_message": "Farmer with launcher_id 55244acf3017c2fc245020b46600827047dce8f54c982adaf95248ff2e955ad8 unknown."
        }
      ]
    }
  ],
  "success": true
}
```

</details>

---

### `get_reward_targets`

Functionality: List the payout targets for the farmer (1/8 of the reward) and pool (7/8)

Usage: chia rpc farmer [OPTIONS] get_reward_targets [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                   | Type    | Required | Description                                                                                                                                                                                                                    |
| :--------------------- | :------ | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| search_for_private_key | BOOLEAN | True     | List whether the private key (sk) is available for both the farmer and pool keys                                                                                                                                               |
| max_ph_to_search       | INTEGER | False    | The maximum number of puzzle hashes to search [Default: 500] If the wallet's derivation index is large, this number may be insufficient to locate the correct puzzle hashes. In this case, you may need to increase this value |

<details>
<summary>Example</summary>

```json
chia rpc farmer get_reward_targets '{"search_for_private_key": false}'
```

Response:

```json
{
  "farmer_target": "xch1xdm7s8fq4kdrq28lulnhxcxq8h6gcsf0y5j643vqx4ec3z9dhq7sqxsa9j",
  "pool_target": "xch1xdm7s8fq4kdrq28lulnhxcxq8h6gcsf0y5j643vqx4ec3z9dhq7sqxsa9j",
  "success": true
}
```

</details>

---

### `get_routes`

Functionality: List all available RPC routes

Usage: chia rpc farmer [OPTIONS] get_routes [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc farmer get_routes
```

Response:

```json
{
  "routes": [
    "/get_signage_point",
    "/get_signage_points",
    "/get_reward_targets",
    "/set_reward_targets",
    "/get_pool_state",
    "/set_payout_instructions",
    "/get_harvesters",
    "/get_harvesters_summary",
    "/get_harvester_plots_valid",
    "/get_harvester_plots_invalid",
    "/get_harvester_plots_keys_missing",
    "/get_harvester_plots_duplicates",
    "/get_pool_login_link",
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

</details>

---

### `get_signage_point`

Functionality: Given a signage point's hash, list the details of that signage point

Usage: chia rpc farmer [OPTIONS] get_signage_point [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag    | Type       | Required | Description                                                                            |
| :------ | :--------- | :------- | :------------------------------------------------------------------------------------- |
| sp_hash | HEX STRING | True     | The hash of a signage point, listed as `pos_ss_cc_challenge_hash` in the block details |

<details>
<summary>Example</summary>

```json
chia rpc farmer get_signage_point '{"sp_hash": "0xd1d48067e1a355e69808201db516008c3d71c88d8c07fcee7c790f725e56e9ac"}'
```

Response:

```json
{
  "proofs": [],
  "signage_point": {
    "challenge_chain_sp": "0xd1d48067e1a355e69808201db516008c3d71c88d8c07fcee7c790f725e56e9ac",
    "challenge_hash": "0xd1d48067e1a355e69808201db516008c3d71c88d8c07fcee7c790f725e56e9ac",
    "difficulty": 1992,
    "reward_chain_sp": "0x0be5727cfe27822fc45852f983c6eee96d2160566eb7b6a18c7c92154ee01fbb",
    "signage_point_index": 0,
    "sub_slot_iters": 147849216
  },
  "success": true
}
```

</details>

---

### `get_signage_points`

Functionality: List details for all signage points going back several challenges

Usage: chia rpc farmer [OPTIONS] get_signage_points [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc farmer get_signage_points
```

Response:

```json
{
    "signage_points": [
        {
            "proofs": [],
            "signage_point": {
                "challenge_chain_sp": "0xe7bff062bcddd480852422d6e1db0af6ff8db96959dd06300cb6f9768ac62fc9",
                "challenge_hash": "0xdce6ce932f790f1846e7875ac9899036920672ec38f542ea148f5718a56870bd",
                "difficulty": 1992,
                "reward_chain_sp": "0x217cb43d129f0576d5e0aeb6dd4946c2786619b8cbd4ca0f784357862e1bef45",
                "signage_point_index": 39,
                "sub_slot_iters": 147849216
            }
        },
        {
            "proofs": [],
            "signage_point": {
                "challenge_chain_sp": "0x98fefcd637299a9d7fb923b68adcac0f5ead98d7f76e1cbc629c9498b80a4ce7",
                "challenge_hash": "0xdce6ce932f790f1846e7875ac9899036920672ec38f542ea148f5718a56870bd",
                "difficulty": 1992,
                "reward_chain_sp": "0xea03892b3ff17926ec55f9b002c5a57b399cc3150d847db44165fae2d1d016c2",
                "signage_point_index": 40,
                "sub_slot_iters": 147849216
            }
        },
        {
            "proofs": [],
            "signage_point": {
                "challenge_chain_sp": "0x94157672db825df25a3d9d6860785716c3a01678430ba92a7aaaa5d8b2ab81df",
                "challenge_hash": "0xdce6ce932f790f1846e7875ac9899036920672ec38f542ea148f5718a56870bd",
                "difficulty": 1992,
                "reward_chain_sp": "0xd23c76d3d308b58657a2b6d847056d607aa0bd474ab6049b0ddf83f9f3ccfbec",
                "signage_point_index": 41,
                "sub_slot_iters": 147849216
            }
        },
...
...
        {
            "proofs": [],
            "signage_point": {
                "challenge_chain_sp": "0xe213a89280cb67644a196e84d16241117844e31f4b7eac199c6743adc37b0282",
                "challenge_hash": "0x2544de1fe6a12f6cd11241accf858a29fc5d8540d78afb8f872798533a51043b",
                "difficulty": 1992,
                "reward_chain_sp": "0xa4e51e9db27b1594c38cac43d86bcb58db5e3fe3b8623325526369ca61558fe0",
                "signage_point_index": 38,
                "sub_slot_iters": 147849216
            }
        },
        {
            "proofs": [],
            "signage_point": {
                "challenge_chain_sp": "0xed7eb2541620e7fdf77233a8ea2b31eceb1ccb79be04c090da03b8a9debc5569",
                "challenge_hash": "0x2544de1fe6a12f6cd11241accf858a29fc5d8540d78afb8f872798533a51043b",
                "difficulty": 1992,
                "reward_chain_sp": "0x00ea6a98f662e1d5b3187c8fbec1a68aae048a9eb790cdac2e8383b6dfdffc29",
                "signage_point_index": 39,
                "sub_slot_iters": 147849216
            }
        }
    ],
    "success": true
}
```

</details>

---

### `set_payout_instructions`

Functionality: Set the `payout_instructions` parameter for your pool configuration

Usage: chia rpc farmer [OPTIONS] set_payout_instructions [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                | Type       | Required | Description                                                                               |
| :------------------ | :--------- | :------- | :---------------------------------------------------------------------------------------- |
| launcher_id         | HEX STRING | True     | The launcher_id from your pool, obtainable from the [get_pool_state](#get_pool_state) RPC |
| payout_instructions | HEX STRING | True     | The puzzle hash to be used as the new `payout_instructions`                               |

<details>
<summary>Example</summary>

```json
chia rpc farmer set_payout_instructions '{"launcher_id": "0x55244acf3017c2fc245020b46600827047dce8f54c982adaf95248ff2e955ad8", "payout_instructions": "19d5a0c14e294e48451959819e8c7407c1a06f4f81c69a943ac86433a9ff29e6"}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `set_reward_targets`

Functionality: Set the farmer and/or pool reward target address(es)

Usage: chia rpc farmer [OPTIONS] set_reward_targets [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag          | Type       | Required | Description                  |
| :------------ | :--------- | :------- | :--------------------------- |
| farmer_target | HEX STRING | False    | Set the farmer reward target |
| pool_target   | HEX STRING | False    | Set the pool reward target   |

<details>
<summary>Example</summary>

Set both targets:

```json
chia rpc farmer set_reward_targets '{"farmer_target": "xch1zuedypasfgpa6ltz9nylfyw58js9v88h8g004nd2pcnw3ypv3descqnxpr", "pool_target": "xch1r826ps2w998ys3getxqearr5qlq6qm60s8rf49p6epjr820l98nqm705cx"}'
```

Response:

```json
{
  "success": true
}
```

Verify that the targets have been set:

```json
 chia rpc farmer get_reward_targets '{"search_for_private_key": false}'
```

Response:

```json
{
  "farmer_target": "xch1zuedypasfgpa6ltz9nylfyw58js9v88h8g004nd2pcnw3ypv3descqnxpr",
  "pool_target": "xch1r826ps2w998ys3getxqearr5qlq6qm60s8rf49p6epjr820l98nqm705cx",
  "success": true
}
```

</details>

---
