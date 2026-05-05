---
sidebar_label: Simulator
title: Simulator RPC Reference
slug: /reference-client/rpc-reference/simulator-rpc
---

## Intro

The simulator gives you complete control of a private Chia blockchain, including the ability to advance and revert blocks as needed.

This page documents **simulator-only** full node RPCs (block farming, reorgs, chain inspection). The simulator’s HTTP API is `SimulatorFullNodeRpcApi`, which **extends** the standard [`FullNodeRpcApi`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/full_node_rpc_api.py) with the routes below, and still exposes every normal full node route plus the shared [RPC server](/reference-client/rpc-reference/full-node-rpc) helpers (`get_network_info`, `get_connections`, `healthz`, logging, etc.). For all non-simulator endpoints, see [Full node RPC](/reference-client/rpc-reference/full-node-rpc).

For more info, see the following:

- [Simulator User Guide](/guides/simulator-user-guide)
- [Simulator CLI Reference](/reference-client/cli-reference/simulator-cli)

---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

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

## Reference

### `farm_block`

Functionality: Farm one or more blocks. Can ensure farming a transaction block if required

Usage: chia rpc full_node [OPTIONS] farm_block [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter          | Required | Description                                                                                                                                                                                                     |
| :----------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address            | True     | The address to use to farm the block                                                                                                                                                                            |
| guarantee_tx_block | False    | JSON boolean: `true` forces each farmed block to be a **transaction** block (`farm_new_transaction_block`). `false` uses `farm_new_block` (next block may or may not be a transaction block). Default: `false`. |
| blocks             | False    | Number of blocks to farm. If `guarantee_tx_block` is `True`, then each block will be a transaction block (Default: 1)                                                                                           |

<details>
<summary>Example 1</summary>

Farm a single block:

```json
chia rpc full_node farm_block '{"address": "txch1v3wjjapxvepyadvr2wgp7272md84lv6kmaxyxm4lq5le2jcc90zqkxhgv6"}'
```

Response:

```json
{
  "new_peak_height": 21,
  "success": true
}
```

</details>

<details>
<summary>Example 2</summary>

Farm three transaction blocks:

```json
chia rpc full_node farm_block '{"address": "txch1v3wjjapxvepyadvr2wgp7272md84lv6kmaxyxm4lq5le2jcc90zqkxhgv6", "guarantee_tx_block": true, "blocks": 3}'
```

Response:

```json
{
  "new_peak_height": 24,
  "success": true
}
```

</details>

---

### `get_all_blocks`

Functionality: Return a list of all blocks in the blockchain

Usage: chia rpc full_node [OPTIONS] get_all_blocks [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc full_node get_all_blocks '{}'
```

Response (abbreviated):

```json
{
    "blocks": [
        {
            "challenge_chain_ip_proof": {
                "normalized_to_identity": false,
                "witness": "0x04000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                "witness_type": 0
            },
            "challenge_chain_sp_proof": {
                "normalized_to_identity": false,
                "witness": "0x02004c00010100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                "witness_type": 0
            },
            "finished_sub_slots":
                {
                    "challenge_chain": {
                        "challenge_chain_end_of_slot_vdf": {
                            "challenge": "0xeb8c4d20b322be8d9fddbf9412016bdffe9a2901d7edb0e364e94266d0e095f7",
                            "number_of_iterations": 1024,
                            "output": {
                                "data": "0x00006100050100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
                            }
                        },
                        "infused_challenge_chain_sub_slot_hash": null,
                        "new_difficulty": null,
                        "new_sub_slot_iters": null,
                        "subepoch_summary_hash": null
                    },
                    "infused_challenge_chain": null,
                    "proofs": {
                        "challenge_chain_slot_proof": {
                            "normalized_to_identity": false,
                            "witness": "0x00003d00020100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                            "witness_type": 0
                        },
                        "infused_challenge_chain_slot_proof": null,
                        "reward_chain_slot_proof": {
                            "normalized_to_identity": false,
                            "witness": "0x00003d00020100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
                            "witness_type": 0
                        }
                    },
                    "reward_chain": {
                        "challenge_chain_sub_slot_hash": "0xe44e06ed13eb06c7c2f0218945b7c62e785d6482c27ebbe69aab499ae199258c",
                        "deficit": 12,
                        "end_of_slot_vdf": {
                            "challenge": "0xeb8c4d20b322be8d9fddbf9412016bdffe9a2901d7edb0e364e94266d0e095f7",
                            "number_of_iterations": 1024,
                            "output": {
                                "data": "0x00006100050100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
                            }
                        },
                        "infused_challenge_chain_sub_slot_hash": null
                    }
                },

...
...

                "reward_claims_incorporated": [
                    {
                        "amount": 1750000000000,
                        "parent_coin_info": "0xeb8c4d20b322be8d9fddbf9412016bdf00000000000000000000000000000011",
                        "puzzle_hash": "0x5fb3e0ccc23760a7f917a81e7872cc921f9ddbc86582dfb4f64eee66fad5e740"
                    },
                    {
                        "amount": 250000000000,
                        "parent_coin_info": "0xfe9a2901d7edb0e364e94266d0e095f700000000000000000000000000000011",
                        "puzzle_hash": "0x5fb3e0ccc23760a7f917a81e7872cc921f9ddbc86582dfb4f64eee66fad5e740"
                    }
                ]
            }
        }
    ],
    "success": true
}
```

</details>

---

### `get_all_coins`

Functionality: Get all coins

Usage: chia rpc full_node [OPTIONS] get_all_coins [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter           | Required | Description                                                                           |
| :------------------ | :------- | :------------------------------------------------------------------------------------ |
| include_spent_coins | False    | Boolean, if `True` then spent coins will be included in the result (Default: `False`) |

<details>
<summary>Example</summary>

```json
chia rpc full_node get_all_coins '{}'
```

Response (abbreviated):

```json
{
    "coin_records": [
        {
            "coin": {
                "amount": 1750000000000,
                "parent_coin_info": "0xeb8c4d20b322be8d9fddbf9412016bdf00000000000000000000000000000011",
                "puzzle_hash": "0x5fb3e0ccc23760a7f917a81e7872cc921f9ddbc86582dfb4f64eee66fad5e740"
            },
            "coinbase": true,
            "confirmed_block_index": 18,
            "spent_block_index": 0,
            "timestamp": 1664294613
        },
        {
            "coin": {
                "amount": 1750000000000,
                "parent_coin_info": "0xeb8c4d20b322be8d9fddbf9412016bdf00000000000000000000000000000007",
                "puzzle_hash": "0x5fb3e0ccc23760a7f917a81e7872cc921f9ddbc86582dfb4f64eee66fad5e740"
            },
            "coinbase": true,
            "confirmed_block_index": 9,
            "spent_block_index": 0,
            "timestamp": 1664294445
        },

...
...
    ],
    "success": true
}
```

</details>

---

### `get_all_puzzle_hashes`

Functionality: Get all puzzle hashes used in this blockchain

Usage: chia rpc full_node [OPTIONS] get_all_puzzle_hashes [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc full_node get_all_puzzle_hashes '{}'
```

Response:

```json
{
  "puzzle_hashes": {
    "000000000000000000000000000000000000000000000000000000000000dead": [
      6000000000000, 6
    ],
    "5fb3e0ccc23760a7f917a81e7872cc921f9ddbc86582dfb4f64eee66fad5e740": [
      21000034000000000000, 36
    ],
    "645d29742666424eb58353901f2bcadb4f5fb356df4c436ebf053f954b182bc4": [
      6000000000000, 6
    ]
  },
  "success": true
}
```

</details>

---

### `get_auto_farming`

Functionality: Returns a Boolean to indicate whether auto farming is enabled

Usage: chia rpc full_node [OPTIONS] get_auto_farming [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc full_node get_auto_farming '{}'
```

Response:

```json
{
  "auto_farm_enabled": true,
  "success": true
}
```

</details>

---

### `get_farming_ph`

Functionality: Get the puzzle hash used by the farmer

Usage: chia rpc full_node [OPTIONS] get_farming_ph [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc full_node get_farming_ph '{}'
```

Response:

```json
{
  "puzzle_hash": "5fb3e0ccc23760a7f917a81e7872cc921f9ddbc86582dfb4f64eee66fad5e740",
  "success": true
}
```

You can then use `cdv encode` to convert this puzzle hash to an address:

```bash
cdv encode --prefix txch 5fb3e0ccc23760a7f917a81e7872cc921f9ddbc86582dfb4f64eee66fad5e740
```

Example `cdv` output:

```bash
txch1t7e7pnxzxas207gh4q08sukvjg0emk7gvkpdld8kfmhxd7k4uaqq9x4yd2
```

</details>

---

### `reorg_blocks`

Functionality: Initiate a reorg or a customizable number of blocks

Usage: chia rpc full_node [OPTIONS] reorg_blocks [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter            | Required | Description                                                                                                                                                                                                            |
| :------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| num_of_blocks_to_rev | False    | The number of blocks to go back (Default: 1)                                                                                                                                                                           |
| num_of_new_blocks    | False    | The number of blocks to add (Default: 1)                                                                                                                                                                               |
| revert_all_blocks    | False    | Boolean, set to `True` to fork all blocks (Default: `False`)                                                                                                                                                           |
| random_seed          | False    | JSON boolean (default `true`): when `true`, the reorg uses a fresh random `bytes32` seed; when `false`, no random seed is passed (deterministic path). **Not** a string seed value—the request key name is historical. |

<details>
<summary>Example 1</summary>

Starting from block 11, we'll revert 3 blocks and create 5 new blocks:

```json
chia rpc full_node reorg_blocks '{"num_of_blocks_to_rev": 3, "num_of_new_blocks": 5}'
```

Response:

```json
{
  "new_peak_height": 16,
  "success": true
}
```

</details>

<details>
<summary>Example 2</summary>

Reorg while disabling the random seed parameter:

```json
chia rpc full_node reorg_blocks '{"random_seed": false}'
```

Response:

```json
{
  "new_peak_height": 18,
  "success": true
}
```

</details>

---

### `revert_blocks`

Functionality: Revert a customizable number of blocks

Usage: chia rpc full_node [OPTIONS] revert_blocks [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter         | Required | Description                                                    |
| :---------------- | :------- | :------------------------------------------------------------- |
| num_of_blocks     | False    | The number of blocks to revert (Default: 1)                    |
| delete_all_blocks | False    | Boolean, set to `True` to revert all blocks (Default: `False`) |

<details>
<summary>Example 1</summary>

Revert a single block:

```json
chia rpc full_node revert_blocks
```

Response:

```json
{
  "new_peak_height": 23,
  "success": true
}
```

</details>

<details>
<summary>Example 2</summary>

Delete all blocks -- this will reset the blockchain:

```json
chia rpc full_node revert_blocks '{"delete_all_blocks": true}'
```

Response:

```json
{
  "new_peak_height": 1,
  "success": true
}
```

</details>

---

### `set_auto_farming`

Functionality: Set whether to auto farm (Boolean)

Usage: chia rpc full_node [OPTIONS] set_auto_farming [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                               |
| :-------- | :------- | :---------------------------------------- |
| auto_farm | True     | Boolean to enable or disable auto farming |

<details>
<summary>Example 1</summary>

Enable auto farming:

```json
chia rpc full_node set_auto_farming '{"auto_farm": true}'
```

Response:

```json
{
  "auto_farm_enabled": true,
  "success": true
}
```

</details>

<details>
<summary>Example 2</summary>

Disable auto farming:

```json
chia rpc full_node set_auto_farming '{"auto_farm": false}'
```

Response:

```json
{
  "auto_farm_enabled": false,
  "success": true
}
```

</details>

---

### `get_routes`

Functionality: Returns every HTTP RPC path registered on this simulator full node: **standard full node** endpoints, **RPC server** helpers (`get_network_info`, `get_connections`, `healthz`, log level, etc.), and **simulator-only** routes (`/farm_block`, `/get_all_blocks`, `/reorg_blocks`, …). Paths are sorted alphabetically here for parity with `chia-blockchain` `main`; your client may return a different order.

Usage: chia rpc full_node [OPTIONS] get_routes [REQUEST]

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc full_node get_routes
```

Response (paths merged from `FullNodeRpcApi`, `RpcServer`, and `SimulatorFullNodeRpcApi`):

```json
{
  "routes": [
    "/close_connection",
    "/create_block_generator",
    "/farm_block",
    "/get_additions_and_removals",
    "/get_aggsig_additional_data",
    "/get_all_blocks",
    "/get_all_coins",
    "/get_all_mempool_items",
    "/get_all_mempool_tx_ids",
    "/get_all_puzzle_hashes",
    "/get_auto_farming",
    "/get_block",
    "/get_block_count_metrics",
    "/get_block_record",
    "/get_block_record_by_height",
    "/get_block_records",
    "/get_block_spends",
    "/get_block_spends_with_conditions",
    "/get_blockchain_state",
    "/get_blocks",
    "/get_coin_record_by_name",
    "/get_coin_records_by_hint",
    "/get_coin_records_by_names",
    "/get_coin_records_by_parent_ids",
    "/get_coin_records_by_puzzle_hash",
    "/get_coin_records_by_puzzle_hashes",
    "/get_connections",
    "/get_farming_ph",
    "/get_fee_estimate",
    "/get_log_level",
    "/get_mempool_item_by_tx_id",
    "/get_mempool_items_by_coin_name",
    "/get_network_info",
    "/get_network_space",
    "/get_puzzle_and_solution",
    "/get_recent_signage_point_or_eos",
    "/get_routes",
    "/get_unfinished_block_headers",
    "/get_version",
    "/healthz",
    "/open_connection",
    "/push_tx",
    "/reorg_blocks",
    "/reset_log_level",
    "/revert_blocks",
    "/set_auto_farming",
    "/set_log_level",
    "/stop_node"
  ],
  "success": true
}
```

</details>

---
