---
sidebar_label: Simulator
title: Simulator RPC Reference
slug: /simulator-rpc
---

## Intro

The simulator gives you complete control of a private Chia blockchain, including the ability to advance and revert blocks as needed.

This page includes a comprehensive list of Chia's Remote Procedure Calls for using the simulator.

For more info, see the following:

- [Simulator User Guide](/guides/simulator-user-guide)
- [Simulator CLI Reference](/simulator-cli)

---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet"}'
```

To run the same command on Windows, you need to escape the quotes with backslashes. In other words, add a \ before each double quote, such that:

- "fee" becomes \"fee\"
- "1000" becomes \"1000\"
- etc

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

| Parameter          | Required | Description                                                                                                                                                                                                          |
| :----------------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| address            | True     | The address to use to farm the block                                                                                                                                                                                 |
| guarantee_tx_block | False    | Set to `True` to farm a transaction block (ie, farm new blocks until a tx block is farmed); set to `False` to farm the next block, which could also be a transaction block, but is not guaranteed (Default: `False`) |
| blocks             | False    | Number of blocks to farm. If `guarantee_tx_block` is `True`, then each block will be a transaction block (Default: 1)                                                                                                |

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
chia rpc full_node farm_block '{"address": "txch1v3wjjapxvepyadvr2wgp7272md84lv6kmaxyxm4lq5le2jcc90zqkxhgv6", "guarantee_tx_block": "True", "blocks": 3}'
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

Functionality: Return a list of all blocks in the blockhain

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
chia rpc full_node get_all_blocks
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
chia rpc full_node get_all_coins
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
chia rpc full_node get_all_puzzle_hashes
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
chia rpc full_node get_auto_farming
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
chia rpc full_node get_farming_ph
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

Response:

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

| Parameter            | Required | Description                                                         |
| :------------------- | :------- | :------------------------------------------------------------------ |
| num_of_blocks_to_rev | False    | The number of blocks to go back (Default: 1)                        |
| num_of_new_blocks    | False    | The number of blocks to add (Default: 1)                            |
| revert_all_blocks    | False    | Boolean, set to `True` to fork all blocks (Default: `False`)        |
| random_seed          | False    | String, used to randomize the seed, which will differentiate reorgs |

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

Reorg with a random seed:

```json
chia rpc full_node reorg_blocks '{"random_seed": "aaaaaa"}'
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
chia rpc full_node revert_blocks '{"delete_all_blocks": "True"}'
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
