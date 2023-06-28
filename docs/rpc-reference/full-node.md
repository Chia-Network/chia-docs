---
sidebar_label: Full Node
title: Full Node RPC
slug: /full-node-rpc
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

The full node RPC API is exposed by the full node, by default on port 8555. This port must not be exposed publicly for
security concerns.

A synced full node is required for running the RPCs in this document.

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc full_node get_block '{"header_hash":"0xf42b4e77315d79ddfb3d64becb21e26ebff5408bda4d1b7c3782fd04f49ec0bb"}'
```

To run the same command on Windows, you need to escape the quotes with backslashes. In other words, add a \ before each double quote, such that:

    "header_hash" becomes \"header_hash\"

</details>

---

### `get_additions_and_removals`

Functionality: Retrieves the additions and removals (state transitions) for a certain block. Returns coin records for each addition and removal

Usage: chia rpc full_node [OPTIONS] get_additions_and_removals [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type       | Required | Description                  |
| :---------- | :--------- | :------- | :--------------------------- |
| header_hash | HEX STRING | True     | The header hash of the block |

:::note

Blocks that are not transaction blocks will have empty removal and addition lists. To get the actual puzzles and solutions
for spent coins, use the [get_puzzle_and_solution](#get_puzzle_and_solution) API.

:::

<details>
<summary>Example</summary>

```json
chia rpc full_node get_additions_and_removals '{"header_hash": "0xfb7891e9a4a9ca6f8a633e0632d82c2502f425526754f71aee5a55d6ad3933d8"}'
```

Response:

```json
{
  "additions": [
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0x9558e5246519b184da7bd9d7bfb528680309352f8658941bfd9452f38d976294",
        "puzzle_hash": "0x2f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57"
      },
      "coinbase": false,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0x9558e5246519b184da7bd9d7bfb528680309352f8658941bfd9452f38d976294",
        "puzzle_hash": "0xbcf5ca4509bcd430a3366c6b261e09b9def74ee7c5a4a3388a56ae9380099bfc"
      },
      "coinbase": false,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 82488030982,
        "parent_coin_info": "0x7a639649fa2b6b4233cab7bf98b3da01be182afba622eb377011ac0940cd83c8",
        "puzzle_hash": "0x5cfe0cf4c19ca813a05c642915bd68a5e99baee39033d0c6d70774296397e249"
      },
      "coinbase": false,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0x7a639649fa2b6b4233cab7bf98b3da01be182afba622eb377011ac0940cd83c8",
        "puzzle_hash": "0xb5db5e9e2b807d276cfeeed124e2629e1c9ee90cabc209a7469ef13545d120ad"
      },
      "coinbase": false,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0xadc1a21da474f751a3235f45ae17a2a97ad28cc8c475842a876685d3cd0419ea",
        "puzzle_hash": "0xfd41971c8c4cb5b662f7a1aa49790fa110a0b99f9ada4bb6276a23670cdbb4aa"
      },
      "coinbase": false,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xadc1a21da474f751a3235f45ae17a2a97ad28cc8c475842a876685d3cd0419ea",
        "puzzle_hash": "0x2f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57"
      },
      "coinbase": false,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 82487941066,
        "parent_coin_info": "0x727961c5d7febde6ea775bd98aca7461f9c6150599bf726a8ccb5f61e86b1f53",
        "puzzle_hash": "0xe0ce2b64138107f8371f83aaef3dabf81c19227268ddc2a8c1238adcb7244794"
      },
      "coinbase": false,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0x727961c5d7febde6ea775bd98aca7461f9c6150599bf726a8ccb5f61e86b1f53",
        "puzzle_hash": "0xb5db5e9e2b807d276cfeeed124e2629e1c9ee90cabc209a7469ef13545d120ad"
      },
      "coinbase": false,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032f4ec",
        "puzzle_hash": "0x907491ca39c35bc1f9a6eda33f7c0f97a9f583975088dad7216f1edd79f522ae"
      },
      "coinbase": true,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 250000000000,
        "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb0000000000000000000000000032f4ec",
        "puzzle_hash": "0x907491ca39c35bc1f9a6eda33f7c0f97a9f583975088dad7216f1edd79f522ae"
      },
      "coinbase": true,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032f4ea",
        "puzzle_hash": "0x6529ccb5c37da2c32b5e0984043969e84254dcccf70459c137f9661f06388e8c"
      },
      "coinbase": true,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 250000000000,
        "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb0000000000000000000000000032f4eb",
        "puzzle_hash": "0x454ead2a2dd42ee0d4c66dff83e1df3d769770010b4890b44883dcad2276aa19"
      },
      "coinbase": true,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 250000000000,
        "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb0000000000000000000000000032f4ea",
        "puzzle_hash": "0x10926349cdd6b3bad8cc66073f52530cd89a237f932c4b5f737f8fe1aa3ec173"
      },
      "coinbase": true,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032f4eb",
        "puzzle_hash": "0xca240d0ec25d7cadbe0c920e95e6b8011da2e86aaca2959a8bd8fbec97684ddc"
      },
      "coinbase": true,
      "confirmed_block_index": 3339504,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678082304
    }
  ],
  "removals": [
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0x5112208f031c9c158f3e25f91fe1cd2593251c713393329f53d4f7a438512622",
        "puzzle_hash": "0xbcf5ca4509bcd430a3366c6b261e09b9def74ee7c5a4a3388a56ae9380099bfc"
      },
      "coinbase": false,
      "confirmed_block_index": 3161234,
      "spent": true,
      "spent_block_index": 3339504,
      "timestamp": 1674748162
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0x5b778e06d75e13265e66169372c4272b1c97eae44ffb72fbe957957b0c341819",
        "puzzle_hash": "0xfd41971c8c4cb5b662f7a1aa49790fa110a0b99f9ada4bb6276a23670cdbb4aa"
      },
      "coinbase": false,
      "confirmed_block_index": 3269008,
      "spent": true,
      "spent_block_index": 3339504,
      "timestamp": 1676766135
    },
    {
      "coin": {
        "amount": 82487942067,
        "parent_coin_info": "0x4c2710fe1401ab8aa1c88d5dd1720dafaac3ffa68c54a67423b5f8e6471278c1",
        "puzzle_hash": "0xa500c99239723e078089cfa2f64aa1bb2140b503cb4e940fedeb7b6313096e1c"
      },
      "coinbase": false,
      "confirmed_block_index": 3339361,
      "spent": true,
      "spent_block_index": 3339504,
      "timestamp": 1678079546
    },
    {
      "coin": {
        "amount": 82488031983,
        "parent_coin_info": "0xfdc7526bfc5107e000b4f710c8c5944f11f4e7ce9711c522b6040bc473266313",
        "puzzle_hash": "0x5198fccb3ca8f14c32a5f05ac50c98209defd2d3ed3ee2a17789a9f6fd7d433b"
      },
      "coinbase": false,
      "confirmed_block_index": 3339400,
      "spent": true,
      "spent_block_index": 3339504,
      "timestamp": 1678080343
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032f4d1",
        "puzzle_hash": "0x275544ef0d40a516979d208ac215b306eefddb9675d0bdd08336f06d90f99444"
      },
      "coinbase": true,
      "confirmed_block_index": 3339476,
      "spent": true,
      "spent_block_index": 3339504,
      "timestamp": 1678081696
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032f4d0",
        "puzzle_hash": "0x3ef5a53f9b70a309e1778635d9841c1dbdc9eeaf18e963e619327cf92843879b"
      },
      "coinbase": true,
      "confirmed_block_index": 3339476,
      "spent": true,
      "spent_block_index": 3339504,
      "timestamp": 1678081696
    }
  ],
  "success": true
}
```

</details>

---

### `get_all_mempool_items`

Functionality: Returns all items in the mempool

Usage: chia rpc full_node [OPTIONS] get_all_mempool_items [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc full_node get_all_mempool_items
```

Response:

```json
{
  "mempool_items": {
    "7a0bc58719ab4268b377fd23278c8bfbae830895f72344a07fa4e96e3df32c7c": {
      "additions": [
        {
          "amount": 1,
          "parent_coin_info": "0x4ab9a26f096d8e3388818668a59d70e9717c6725733a7ac28e330d5ad250ba34",
          "puzzle_hash": "0x6518c964407acdf0257f83175116ac160e68e59c953a1bff66e3dc962b770269"
        }
      ],
      "cost": 31796662,
      "fee": 0,
      "npc_result": {
        "conds": {
          "agg_sig_unsafe": [],
          "before_height_absolute": null,
          "before_seconds_absolute": null,
          "cost": 31796662,
          "height_absolute": 0,
          "reserve_fee": 0,
          "seconds_absolute": 0,
          "spends": [
            {
              "agg_sig_me": [
                [
                  "0x8f04c6342dbd95e08f77d4d49aefbf130bb9560f3e52e7c61c67f61944982a1469726acaa0900d226440d171fa1a59bd",
                  "0xcda5e57874cd52a609d3f49fca7db0cf5502375b76317ac57c886dc8cb807ff7"
                ]
              ],
              "before_height_relative": null,
              "before_seconds_relative": null,
              "coin_id": "0x4ab9a26f096d8e3388818668a59d70e9717c6725733a7ac28e330d5ad250ba34",
              "create_coin": [
                [
                  "0x6518c964407acdf0257f83175116ac160e68e59c953a1bff66e3dc962b770269",
                  1,
                  null
                ]
              ],
              "flags": 0,
              "height_relative": null,
              "puzzle_hash": "0x4f2868c836a9fcd66c3d14ea08081137c079c42ed5576fe0d5069551f85ee115",
              "seconds_relative": 0
            }
          ]
        },
        "cost": 31796662,
        "error": null
      },
      "removals": [
        {
          "amount": 1,
          "parent_coin_info": "0x538ebc1d1dd243bf838d53084546fe5c2eb2304e0f3525a9c4caa2f2199c2c33",
          "puzzle_hash": "0x4f2868c836a9fcd66c3d14ea08081137c079c42ed5576fe0d5069551f85ee115"
        }
      ],
      "spend_bundle": {
        "aggregated_signature": "0xb264032b7830dd43cb1156cf33f895ef74e84692a8506f627c8dd776f60766ba2e5e1ddc3537b8c39b0e9a38b2b1fa3f0d07edeb678cf0cbc6f3665737a137cb001ed09d906bd8baacd624f6689d0c6706ce15b7c496e9c151ded5a2fd529cce",
        "coin_spends": [
          {
            "coin": {
              "amount": 1,
              "parent_coin_info": "0x538ebc1d1dd243bf838d53084546fe5c2eb2304e0f3525a9c4caa2f2199c2c33",
              "puzzle_hash": "0x4f2868c836a9fcd66c3d14ea08081137c079c42ed5576fe0d5069551f85ee115"
            },
            "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fffff010180ffff01ff02ff36ffff04ff02ffff04ff05ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff0bff80808080ffff04ff2fffff04ff0bffff04ff5fff808080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4602ff3304ffff0101ff02ffff02ffff03ff05ffff01ff02ff5cffff04ff02ffff04ff0dffff04ffff0bff2cffff0bff24ff3880ffff0bff2cffff0bff2cffff0bff24ff3480ff0980ffff0bff2cff0bffff0bff24ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff0bffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ffff02ff2affff04ff02ffff04ffff02ffff03ffff09ff23ff2880ffff0181b3ff8080ff0180ff80808080ff80808080808080ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffffff0bffff0bff17ffff02ff3affff04ff02ffff04ff09ffff04ff2fffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ff5f80ff0bff81bf80ff02ffff03ffff20ffff22ff4fff178080ffff01ff02ff7effff04ff02ffff04ff6fffff04ffff04ffff02ffff03ff4fffff01ff04ff23ffff04ffff02ff3affff04ff02ffff04ff09ffff04ff53ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff81b3ff80808080ffff011380ff0180ffff02ff7cffff04ff02ffff04ff05ffff04ff1bffff04ffff21ff4fff1780ff80808080808080ff8080808080ffff01ff088080ff0180ffff04ffff09ffff18ff05ffff010180ffff010180ffff09ff05ffff01818f8080ff0bff2cffff0bff24ff3080ffff0bff2cffff0bff2cffff0bff24ff3480ff0580ffff0bff2cffff02ff5cffff04ff02ffff04ff07ffff04ffff0bff24ff2480ff8080808080ffff0bff24ff8080808080ffffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff26ffff04ff02ffff04ff09ff80808080ffff02ff26ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ff5effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff3affff04ff02ffff04ff09ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfff80808080808080808080ffff04ffff04ff20ffff04ff17ff808080ffff02ff7cffff04ff02ffff04ff05ffff04ffff02ff82017fffff04ffff04ffff04ff17ff2f80ffff04ffff04ff5fff81bf80ffff04ff0bff05808080ff8202ff8080ffff01ff80808080808080ffff02ff2effff04ff02ffff04ff05ffff04ff0bffff04ffff02ffff03ff3bffff01ff02ff22ffff04ff02ffff04ff05ffff04ff17ffff04ff13ffff04ff2bffff04ff5bffff04ff5fff808080808080808080ffff01ff02ffff03ffff09ff15ffff0bff13ff1dff2b8080ffff01ff0bff15ff17ff5f80ffff01ff088080ff018080ff0180ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfffff04ff82017fff8080808080808080808080ff02ffff03ff05ffff011bffff010b80ff0180ff018080ffff04ffff01ffa024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffa0e10b98373faad996cf868f03e736376135a50281ebfbe9778dff6cc11470bb8ca0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff8202ffffff01ff02ff16ffff04ff02ffff04ff05ffff04ff8204bfffff04ff8206bfffff04ff82017fffff04ffff0bffff19ff2fffff18ffff019100ffffffffffffffffffffffffffffffffff8202ff8080ff0bff82017f80ff8080808080808080ffff01ff04ffff04ff08ffff04ff17ffff04ffff02ff1effff04ff02ffff04ff82017fff80808080ff80808080ffff04ffff04ff1cffff04ff5fffff04ff8206bfff80808080ff80808080ff0180ffff04ffff01ffff32ff3d33ff3effff04ffff04ff1cffff04ff0bffff04ff17ff80808080ffff04ffff04ff1cffff04ff05ffff04ff2fff80808080ffff04ffff04ff0affff04ff5fff808080ffff04ffff04ff14ffff04ffff0bff5fffff012480ff808080ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a02f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57ffff04ffff01a0e4e875f19e52f45465026aa60728e45047a576c3c4763198e18d3e0b03d3d048ffff04ffff01b08f04c6342dbd95e08f77d4d49aefbf130bb9560f3e52e7c61c67f61944982a1469726acaa0900d226440d171fa1a59bdffff04ffff01a0ccd5bb71183532bff220ba46c268991a00000000000000000000000000000000ffff04ffff01a0bc2fb2044e0f54b2c43ae0dacd9b5b8b1aeb29f8083de0ae432ab28e551c002cff01808080808080ff01808080",
            "solution": "0xffffa0dca1909d42fbbff75d8504bacec6e38345f8e7893934cb557dbed1d47bb9b740ffa09acf597a1a2c76dcdbada7f6ee21225bf7b50c51fa3e587f3861cffd21fd365bff0180ff01ffffffff70c07301022f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d578f04c6342dbd95e08f77d4d49aefbf130bb9560f3e52e7c61c67f61944982a1469726acaa0900d226440d171fa1a59bd010000001868747470733a2f2f61736961312e706f6f6c2e73706163650000004080ff808080"
          }
        ]
      },
      "spend_bundle_name": "0x7a0bc58719ab4268b377fd23278c8bfbae830895f72344a07fa4e96e3df32c7c"
    },
    "c029700735f3bc77a40c01a75d8a04818552ef0a71320105c8621810220c156c": {
      "additions": [
        {
          "amount": 1,
          "parent_coin_info": "0x3da90280d9f997f229161598fe0c9162bcc77d0e3a632f9c074b22b8fbd1585b",
          "puzzle_hash": "0xfd22a811575a18f7970dd2ee8980dc66278dfe74c5d454721dae9679ea130d03"
        },
        {
          "amount": 7888,
          "parent_coin_info": "0x3da90280d9f997f229161598fe0c9162bcc77d0e3a632f9c074b22b8fbd1585b",
          "puzzle_hash": "0xa6a570bae50e46957f74260a6537e9db5c01546842fb7211fb2c8528cdce917b"
        }
      ],
      "cost": 38698534,
      "fee": 0,
      "npc_result": {
        "conds": {
          "agg_sig_unsafe": [],
          "before_height_absolute": null,
          "before_seconds_absolute": null,
          "cost": 38698534,
          "height_absolute": 0,
          "reserve_fee": 0,
          "seconds_absolute": 0,
          "spends": [
            {
              "agg_sig_me": [
                [
                  "0xa2eaa8627d7ec6f936eba6b14a139c7e64e688c044041054e7fbe1cdfcc63334fcf16d6be0dd10e1ffd0c0bbcbf7048e",
                  "0x278bec5c6e5e9279bcb342a900a08945e7a06bc27fe6f2b182d143d9fe08f5ce"
                ]
              ],
              "before_height_relative": null,
              "before_seconds_relative": null,
              "coin_id": "0x3da90280d9f997f229161598fe0c9162bcc77d0e3a632f9c074b22b8fbd1585b",
              "create_coin": [
                [
                  "0xfd22a811575a18f7970dd2ee8980dc66278dfe74c5d454721dae9679ea130d03",
                  1,
                  "0x42abe0e28c18d0e7b30519586ca64f9388d55902d6836e724105a01d46204369"
                ],
                [
                  "0xa6a570bae50e46957f74260a6537e9db5c01546842fb7211fb2c8528cdce917b",
                  7888,
                  null
                ]
              ],
              "flags": 0,
              "height_relative": null,
              "puzzle_hash": "0xa9d5baa58734a7b7ad5d0dcc8c6f938c5a202a5c951a1124a01527d7cb391686",
              "seconds_relative": 0
            }
          ]
        },
        "cost": 38698534,
        "error": null
      },
      "removals": [
        {
          "amount": 7889,
          "parent_coin_info": "0xb0947ccc422de910408c51ea3e14ea9b069ed77b0559f98ebd604a767cb5fde4",
          "puzzle_hash": "0xa9d5baa58734a7b7ad5d0dcc8c6f938c5a202a5c951a1124a01527d7cb391686"
        }
      ],
      "spend_bundle": {
        "aggregated_signature": "0x97dacfc6c718114654774d0b3e84b59343d7ee795aa9a15cff95daba79b04415ebccac9ba384c3362c62dc7596d9c4ea1177694a230f394314ddeed5f430a0b0999984c8cbf52f8bfad5dcf535e8b473b0b05cfa56ebbd6fbb0ee04af368b5e4",
        "coin_spends": [
          {
            "coin": {
              "amount": 7889,
              "parent_coin_info": "0xb0947ccc422de910408c51ea3e14ea9b069ed77b0559f98ebd604a767cb5fde4",
              "puzzle_hash": "0xa9d5baa58734a7b7ad5d0dcc8c6f938c5a202a5c951a1124a01527d7cb391686"
            },
            "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ff5effff04ff02ffff04ffff04ff05ffff04ffff0bff34ff0580ffff04ff0bff80808080ffff04ffff02ff17ff2f80ffff04ff5fffff04ffff02ff2effff04ff02ffff04ff17ff80808080ffff04ffff02ff2affff04ff02ffff04ff82027fffff04ff82057fffff04ff820b7fff808080808080ffff04ff81bfffff04ff82017fffff04ff8202ffffff04ff8205ffffff04ff820bffff80808080808080808080808080ffff04ffff01ffffffff3d46ff02ff333cffff0401ff01ff81cb02ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff7cffff0bff34ff2480ffff0bff7cffff0bff7cffff0bff34ff2c80ff0980ffff0bff7cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ffff02ffff03ff0bffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff13ff80808080ff820b9f80ffff01ff02ff56ffff04ff02ffff04ffff02ff13ffff04ff5fffff04ff17ffff04ff2fffff04ff81bfffff04ff82017fffff04ff1bff8080808080808080ffff04ff82017fff8080808080ffff01ff088080ff0180ffff01ff02ffff03ff17ffff01ff02ffff03ffff20ff81bf80ffff0182017fffff01ff088080ff0180ffff01ff088080ff018080ff0180ff04ffff04ff05ff2780ffff04ffff10ff0bff5780ff778080ffffff02ffff03ff05ffff01ff02ffff03ffff09ffff02ffff03ffff09ff11ff5880ffff0159ff8080ff0180ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff0dffff04ff0bffff04ffff04ff81b9ff82017980ff808080808080ffff01ff02ff7affff04ff02ffff04ffff02ffff03ffff09ff11ff5880ffff01ff04ff58ffff04ffff02ff76ffff04ff02ffff04ff13ffff04ff29ffff04ffff0bff34ff5b80ffff04ff2bff80808080808080ff398080ffff01ff02ffff03ffff09ff11ff7880ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0121ffff0dff298080ffff01ff02ffff03ffff09ffff0cff29ff80ff3480ff5c80ffff01ff0101ff8080ff0180ff8080ff018080ffff0109ffff01ff088080ff0180ffff010980ff018080ff0180ffff04ffff02ffff03ffff09ff11ff5880ffff0159ff8080ff0180ffff04ffff02ff26ffff04ff02ffff04ff0dffff04ff0bffff04ff17ff808080808080ff80808080808080ff0180ffff01ff04ff80ffff04ff80ff17808080ff0180ffff02ffff03ff05ffff01ff04ff09ffff02ff56ffff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff0bff7cffff0bff34ff2880ffff0bff7cffff0bff7cffff0bff34ff2c80ff0580ffff0bff7cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ffff04ffff04ff30ffff04ff5fff808080ffff02ff7effff04ff02ffff04ffff04ffff04ff2fff0580ffff04ff5fff82017f8080ffff04ffff02ff26ffff04ff02ffff04ff0bffff04ff05ffff01ff808080808080ffff04ff17ffff04ff81bfffff04ff82017fffff04ffff02ff2affff04ff02ffff04ff8204ffffff04ffff02ff76ffff04ff02ffff04ff09ffff04ff820affffff04ffff0bff34ff2d80ffff04ff15ff80808080808080ffff04ff8216ffff808080808080ffff04ff8205ffffff04ff820bffff808080808080808080808080ff02ff5affff04ff02ffff04ff5fffff04ff3bffff04ffff02ffff03ff17ffff01ff09ff2dffff02ff2affff04ff02ffff04ff27ffff04ffff02ff76ffff04ff02ffff04ff29ffff04ff57ffff04ffff0bff34ff81b980ffff04ff59ff80808080808080ffff04ff81b7ff80808080808080ff8080ff0180ffff04ff17ffff04ff05ffff04ff8202ffffff04ffff04ffff04ff78ffff04ffff0eff5cffff02ff2effff04ff02ffff04ffff04ff2fffff04ff82017fff808080ff8080808080ff808080ffff04ffff04ff20ffff04ffff0bff81bfff5cffff02ff2effff04ff02ffff04ffff04ff15ffff04ffff10ff82017fffff11ff8202dfff2b80ff8202ff80ff808080ff8080808080ff808080ff138080ff80808080808080808080ff018080ffff04ffff01a037bef360ee858133b69d595a906dc45d01af50379dad515eb9518abb7c1d2a7affff04ffff01a0ec25b77bc54df637392d6a0f542de65f45020405d0f36ced723bff2870c378b1ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a2eaa8627d7ec6f936eba6b14a139c7e64e688c044041054e7fbe1cdfcc63334fcf16d6be0dd10e1ffd0c0bbcbf7048eff018080ff0180808080",
            "solution": "0xffff80ffff01ffff33ffa042abe0e28c18d0e7b30519586ca64f9388d55902d6836e724105a01d46204369ff01ffffa042abe0e28c18d0e7b30519586ca64f9388d55902d6836e724105a01d462043698080ffff33ffa05b052e7f4dec88c750ae357d97043324361ded7471bba1cd4e723a0bb6c2bae3ff821ed080ffff3cffa0e915e5c9f1d19f53a644ef0eeeb0bb277f15ffed97ecca9371ecdb9971c528b28080ff8080ffffa0058ccbaf11089e205e92b53dd78728bf5b3da5e149046b70a34be0b4695b8d76ffa0e18d1f4a1660e626c0857ae687191d8bddfa60b79a45d9ec3dae366b23256a47ff821ed280ffa03da90280d9f997f229161598fe0c9162bcc77d0e3a632f9c074b22b8fbd1585bffffa0b0947ccc422de910408c51ea3e14ea9b069ed77b0559f98ebd604a767cb5fde4ffa0a9d5baa58734a7b7ad5d0dcc8c6f938c5a202a5c951a1124a01527d7cb391686ff821ed180ffffa0b0947ccc422de910408c51ea3e14ea9b069ed77b0559f98ebd604a767cb5fde4ffa04804b6a94dca8278af122b8b17de77f43b05a1bc9d1d0af31757bf078ff5e9b3ff821ed180ff80ff8080"
          }
        ]
      },
      "spend_bundle_name": "0xc029700735f3bc77a40c01a75d8a04818552ef0a71320105c8621810220c156c"
    },
    "cc59cca8026c95d289decfe7125f8ca51fdfcbe05ff7d4cab7a413d8af457b75": {
      "additions": [
        {
          "amount": 322132010850357,
          "parent_coin_info": "0x9fc0589841a26b8c2235dbe08665e5ff974ce60b1c6272908818a2219a3f2bab",
          "puzzle_hash": "0x744ca58515729a01de90a53cfb3c1d7f0d3476400d334a71f5fd916ff611b303"
        },
        {
          "amount": 57653040000,
          "parent_coin_info": "0x9fc0589841a26b8c2235dbe08665e5ff974ce60b1c6272908818a2219a3f2bab",
          "puzzle_hash": "0x77fd0397f735deba4b983ad0f0cc0d56d33a0f6782638cc8309b427c3c47c84a"
        }
      ],
      "cost": 11082050,
      "fee": 1,
      "npc_result": {
        "conds": {
          "agg_sig_unsafe": [],
          "before_height_absolute": null,
          "before_seconds_absolute": null,
          "cost": 11082050,
          "height_absolute": 0,
          "reserve_fee": 1,
          "seconds_absolute": 0,
          "spends": [
            {
              "agg_sig_me": [
                [
                  "0xaec94d64c804b1d2cb448c8d13d4e43da81b9edceab5cc63c18bd2bbe9d4d28600e868f17c724cd674b9bf471e2ca518",
                  "0x031907d28a5a7aa37b0ddf06629736be35bb3c7ed0e62c196466fa25a1bf425d"
                ]
              ],
              "before_height_relative": null,
              "before_seconds_relative": null,
              "coin_id": "0x9fc0589841a26b8c2235dbe08665e5ff974ce60b1c6272908818a2219a3f2bab",
              "create_coin": [
                [
                  "0x744ca58515729a01de90a53cfb3c1d7f0d3476400d334a71f5fd916ff611b303",
                  322132010850357,
                  null
                ],
                [
                  "0x77fd0397f735deba4b983ad0f0cc0d56d33a0f6782638cc8309b427c3c47c84a",
                  57653040000,
                  null
                ]
              ],
              "flags": 0,
              "height_relative": null,
              "puzzle_hash": "0x744ca58515729a01de90a53cfb3c1d7f0d3476400d334a71f5fd916ff611b303",
              "seconds_relative": 0
            }
          ]
        },
        "cost": 11082050,
        "error": null
      },
      "removals": [
        {
          "amount": 322189663890358,
          "parent_coin_info": "0xa338f1f747fb711754c11fcff8825ceafd2cee960d7916d606668747f69e589c",
          "puzzle_hash": "0x744ca58515729a01de90a53cfb3c1d7f0d3476400d334a71f5fd916ff611b303"
        }
      ],
      "spend_bundle": {
        "aggregated_signature": "0xa781b277687545599228d2bbc91c75ffbcd467ca0acd71e4a6182d21bba0c71a525f44d9cc807577ac7a3a38b361bb8619007342c47fa33b60d4daaf778991c906a512d50e8382fa3239309e97eb0e6bda7ba37f188215b4884e3fd5426a6f2e",
        "coin_spends": [
          {
            "coin": {
              "amount": 322189663890358,
              "parent_coin_info": "0xa338f1f747fb711754c11fcff8825ceafd2cee960d7916d606668747f69e589c",
              "puzzle_hash": "0x744ca58515729a01de90a53cfb3c1d7f0d3476400d334a71f5fd916ff611b303"
            },
            "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0aec94d64c804b1d2cb448c8d13d4e43da81b9edceab5cc63c18bd2bbe9d4d28600e868f17c724cd674b9bf471e2ca518ff018080",
            "solution": "0xff80ffff01ffff33ffa0744ca58515729a01de90a53cfb3c1d7f0d3476400d334a71f5fd916ff611b303ff870124fa3413d83580ffff33ffa077fd0397f735deba4b983ad0f0cc0d56d33a0f6782638cc8309b427c3c47c84aff850d6c63938080ffff34ff0180ffff3cffa03d3e59df11f0fa11ea3ae7f251fc2430374f0e57afec9968720796f819bc0edb8080ff8080"
          }
        ]
      },
      "spend_bundle_name": "0xcc59cca8026c95d289decfe7125f8ca51fdfcbe05ff7d4cab7a413d8af457b75"
    },
    "d9bf060978afd797d35026ceb33886b030757735990fe0f03791fec3e695bbda": {
      "additions": [
        {
          "amount": 134290334,
          "parent_coin_info": "0x58d060da1c0300bf36d61735d2bc2294359f7260ce9bd12e17a019d7c6374bad",
          "puzzle_hash": "0xd38ecedf2f4eb3efecfd7e0fd354f2424e31243198a8d8778dab39a1582edda5"
        },
        {
          "amount": 173918,
          "parent_coin_info": "0x58d060da1c0300bf36d61735d2bc2294359f7260ce9bd12e17a019d7c6374bad",
          "puzzle_hash": "0x56298e0b6af9ab382d4fc1ef18912ab472c3a6a85870ab179d5209d4dc00634c"
        },
        {
          "amount": 45461,
          "parent_coin_info": "0x38f5974f59964e5ef86c0ec874e36a33c03a41605260366443dbcd115243349e",
          "puzzle_hash": "0x271fb64316ed2bb6504097835d19bf382b3b5d6a761ca65290f2c05fb9c5cf06"
        }
      ],
      "cost": 48568311,
      "fee": 1,
      "npc_result": {
        "conds": {
          "agg_sig_unsafe": [],
          "before_height_absolute": null,
          "before_seconds_absolute": null,
          "cost": 48568311,
          "height_absolute": 0,
          "reserve_fee": 1,
          "seconds_absolute": 0,
          "spends": [
            {
              "agg_sig_me": [
                [
                  "0xac23a0d79b791f2ffea4d1ea96911c85dbd0b69c43fae4a2f778bea0f950b185fd97157414c72b1b4da9f39e8c7ef3be",
                  "0xd90f4e1eb999ee79ba276b44d20a334f5fffd2c678902e03a3e369c55d0c8111"
                ]
              ],
              "before_height_relative": null,
              "before_seconds_relative": null,
              "coin_id": "0x58d060da1c0300bf36d61735d2bc2294359f7260ce9bd12e17a019d7c6374bad",
              "create_coin": [
                [
                  "0xd38ecedf2f4eb3efecfd7e0fd354f2424e31243198a8d8778dab39a1582edda5",
                  134290334,
                  null
                ],
                [
                  "0x56298e0b6af9ab382d4fc1ef18912ab472c3a6a85870ab179d5209d4dc00634c",
                  173918,
                  "0xe5f45c3e37fbc0c8ca712809279e20976d662661f36165072d0c5a2a75d7a98e"
                ]
              ],
              "flags": 0,
              "height_relative": null,
              "puzzle_hash": "0x40cbca857d77ac3eccad93398c218caf85a4801020ae8d8e4730bd5d438d554a",
              "seconds_relative": 0
            },
            {
              "agg_sig_me": [
                [
                  "0xa479ea5e9bfdf1da07521313e4a767dffb566aada757ca914ccfc00b2e832a1c497f0e5f70ebb795aed7cb96361e08b5",
                  "0xd1768f28d4790bbe1ae45c2ddbc3e80c3b38238d66839e618c18a8bb28d679f0"
                ]
              ],
              "before_height_relative": null,
              "before_seconds_relative": null,
              "coin_id": "0x38f5974f59964e5ef86c0ec874e36a33c03a41605260366443dbcd115243349e",
              "create_coin": [
                [
                  "0x271fb64316ed2bb6504097835d19bf382b3b5d6a761ca65290f2c05fb9c5cf06",
                  45461,
                  null
                ]
              ],
              "flags": 0,
              "height_relative": null,
              "puzzle_hash": "0xa35c1e2f5670c8577a6cb6d65560e573fb09b3c98ce9c588e413791700ecfd14",
              "seconds_relative": 0
            }
          ]
        },
        "cost": 48568311,
        "error": null
      },
      "removals": [
        {
          "amount": 134464252,
          "parent_coin_info": "0x619fed74492b0ca70616156bec92202ed20ef79cb35b6e799ed98b2a896bf47e",
          "puzzle_hash": "0x40cbca857d77ac3eccad93398c218caf85a4801020ae8d8e4730bd5d438d554a"
        },
        {
          "amount": 45462,
          "parent_coin_info": "0xe52a976f3c5569f81abde873bb3337627498ad46db5bb6f8741a14bb8779ac93",
          "puzzle_hash": "0xa35c1e2f5670c8577a6cb6d65560e573fb09b3c98ce9c588e413791700ecfd14"
        }
      ],
      "spend_bundle": {
        "aggregated_signature": "0x80b0d6c2ce8e970c1269331f497d71304de1cb0c7efa94d0f345f3ac63f0960415d001d86a113631fc6ca2745d79803e122fad9ea72d5a11feee4f0a0fc4b9267acf48a3c8fe7e94f2ddeffe2dfc6c44818852821814ee5374b49f150f2176d1",
        "coin_spends": [
          {
            "coin": {
              "amount": 134464252,
              "parent_coin_info": "0x619fed74492b0ca70616156bec92202ed20ef79cb35b6e799ed98b2a896bf47e",
              "puzzle_hash": "0x40cbca857d77ac3eccad93398c218caf85a4801020ae8d8e4730bd5d438d554a"
            },
            "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ff5effff04ff02ffff04ffff04ff05ffff04ffff0bff34ff0580ffff04ff0bff80808080ffff04ffff02ff17ff2f80ffff04ff5fffff04ffff02ff2effff04ff02ffff04ff17ff80808080ffff04ffff02ff2affff04ff02ffff04ff82027fffff04ff82057fffff04ff820b7fff808080808080ffff04ff81bfffff04ff82017fffff04ff8202ffffff04ff8205ffffff04ff820bffff80808080808080808080808080ffff04ffff01ffffffff3d46ff02ff333cffff0401ff01ff81cb02ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff7cffff0bff34ff2480ffff0bff7cffff0bff7cffff0bff34ff2c80ff0980ffff0bff7cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ffff02ffff03ff0bffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff13ff80808080ff820b9f80ffff01ff02ff56ffff04ff02ffff04ffff02ff13ffff04ff5fffff04ff17ffff04ff2fffff04ff81bfffff04ff82017fffff04ff1bff8080808080808080ffff04ff82017fff8080808080ffff01ff088080ff0180ffff01ff02ffff03ff17ffff01ff02ffff03ffff20ff81bf80ffff0182017fffff01ff088080ff0180ffff01ff088080ff018080ff0180ff04ffff04ff05ff2780ffff04ffff10ff0bff5780ff778080ffffff02ffff03ff05ffff01ff02ffff03ffff09ffff02ffff03ffff09ff11ff5880ffff0159ff8080ff0180ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff0dffff04ff0bffff04ffff04ff81b9ff82017980ff808080808080ffff01ff02ff7affff04ff02ffff04ffff02ffff03ffff09ff11ff5880ffff01ff04ff58ffff04ffff02ff76ffff04ff02ffff04ff13ffff04ff29ffff04ffff0bff34ff5b80ffff04ff2bff80808080808080ff398080ffff01ff02ffff03ffff09ff11ff7880ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0121ffff0dff298080ffff01ff02ffff03ffff09ffff0cff29ff80ff3480ff5c80ffff01ff0101ff8080ff0180ff8080ff018080ffff0109ffff01ff088080ff0180ffff010980ff018080ff0180ffff04ffff02ffff03ffff09ff11ff5880ffff0159ff8080ff0180ffff04ffff02ff26ffff04ff02ffff04ff0dffff04ff0bffff04ff17ff808080808080ff80808080808080ff0180ffff01ff04ff80ffff04ff80ff17808080ff0180ffff02ffff03ff05ffff01ff04ff09ffff02ff56ffff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff0bff7cffff0bff34ff2880ffff0bff7cffff0bff7cffff0bff34ff2c80ff0580ffff0bff7cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ffff04ffff04ff30ffff04ff5fff808080ffff02ff7effff04ff02ffff04ffff04ffff04ff2fff0580ffff04ff5fff82017f8080ffff04ffff02ff26ffff04ff02ffff04ff0bffff04ff05ffff01ff808080808080ffff04ff17ffff04ff81bfffff04ff82017fffff04ffff02ff2affff04ff02ffff04ff8204ffffff04ffff02ff76ffff04ff02ffff04ff09ffff04ff820affffff04ffff0bff34ff2d80ffff04ff15ff80808080808080ffff04ff8216ffff808080808080ffff04ff8205ffffff04ff820bffff808080808080808080808080ff02ff5affff04ff02ffff04ff5fffff04ff3bffff04ffff02ffff03ff17ffff01ff09ff2dffff02ff2affff04ff02ffff04ff27ffff04ffff02ff76ffff04ff02ffff04ff29ffff04ff57ffff04ffff0bff34ff81b980ffff04ff59ff80808080808080ffff04ff81b7ff80808080808080ff8080ff0180ffff04ff17ffff04ff05ffff04ff8202ffffff04ffff04ffff04ff78ffff04ffff0eff5cffff02ff2effff04ff02ffff04ffff04ff2fffff04ff82017fff808080ff8080808080ff808080ffff04ffff04ff20ffff04ffff0bff81bfff5cffff02ff2effff04ff02ffff04ffff04ff15ffff04ffff10ff82017fffff11ff8202dfff2b80ff8202ff80ff808080ff8080808080ff808080ff138080ff80808080808080808080ff018080ffff04ffff01a037bef360ee858133b69d595a906dc45d01af50379dad515eb9518abb7c1d2a7affff04ffff01a01dadf5b097d2e1257d375759aaa15298ed3e0f70b6de275d9c70dc2f7eca14a8ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0ac23a0d79b791f2ffea4d1ea96911c85dbd0b69c43fae4a2f778bea0f950b185fd97157414c72b1b4da9f39e8c7ef3beff018080ff0180808080",
            "solution": "0xffff80ffff01ffff33ffa0e5f45c3e37fbc0c8ca712809279e20976d662661f36165072d0c5a2a75d7a98eff8302a75effffa0e5f45c3e37fbc0c8ca712809279e20976d662661f36165072d0c5a2a75d7a98eff4dff61ff72ff6dff6fff74ff73ff2eff69ff6fff20ff52ff65ff67ff75ff6cff61ff72ff20ff50ff61ff79ff6fff75ff748080ffff33ffa0f771516fe3f6e4c1e6a2c6b27c2540e1af2cd608bef5f897c0d49b32114914b0ff8408011b9e80ffff3cffa067380aef1ec583dd56304a1b5a27db95e5e054d536e9b75e25470e58f282cc9e8080ff8080ffffa03d10bab2a504924751169af5966e0fa72f60084bb93d1d4900c2de6ebce3a595ffa0863f63eea4a82717c0e5071350c9a5ecd255e1e836f993685854216757e16d0cff840805f89a80ffa058d060da1c0300bf36d61735d2bc2294359f7260ce9bd12e17a019d7c6374badffffa0619fed74492b0ca70616156bec92202ed20ef79cb35b6e799ed98b2a896bf47effa040cbca857d77ac3eccad93398c218caf85a4801020ae8d8e4730bd5d438d554aff840803c2fc80ffffa0619fed74492b0ca70616156bec92202ed20ef79cb35b6e799ed98b2a896bf47effa0e7cbcad872f4c3d96637423b45a101b43ee199ec35ad9b28b7886517460e128dff840803c2fc80ff80ff8080"
          },
          {
            "coin": {
              "amount": 45462,
              "parent_coin_info": "0xe52a976f3c5569f81abde873bb3337627498ad46db5bb6f8741a14bb8779ac93",
              "puzzle_hash": "0xa35c1e2f5670c8577a6cb6d65560e573fb09b3c98ce9c588e413791700ecfd14"
            },
            "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a479ea5e9bfdf1da07521313e4a767dffb566aada757ca914ccfc00b2e832a1c497f0e5f70ebb795aed7cb96361e08b5ff018080",
            "solution": "0xff80ffff01ffff33ffa0271fb64316ed2bb6504097835d19bf382b3b5d6a761ca65290f2c05fb9c5cf06ff8300b19580ffff34ff0180ffff3cffa05e5e11c7beafaeb57589000532dca89fa2994105ef20c8607a21ce05198eee6880ffff3dffa0f7af688eada984c7c1be8ab93dd4c1f807f155587d9a126ba9dd543f5911dad88080ff8080"
          }
        ]
      },
      "spend_bundle_name": "0xd9bf060978afd797d35026ceb33886b030757735990fe0f03791fec3e695bbda"
    }
  },
  "success": true
}
```

</details>

---

### `get_all_mempool_tx_ids`

Functionality: Returns a list of all transaction IDs (spend bundle hashes) in the mempool

Usage: chia rpc full_node [OPTIONS] get_all_mempool_tx_ids [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc full_node get_all_mempool_tx_ids
```

Response:

```json
{
  "success": true,
  "tx_ids": [
    "0xcde95bf9f0630d96d7b13b0ec7bb4251e06e407307f68e01c158a3ce2d903df6",
    "0x27d6e2390cc810ed8953089a76b79b04b5088e3b7c0f974e1a266d964eb67501",
    "0xebc444de2e43d151a7c9d8c1db081ce19780c07e07c334fb448955a401ee96a4",
    "0x0daaa1be38c96019df8de5e345dcd1a1423c383a1fcb54e64ff0f994604d3c4b",
    "0x75a561a1bf3e2fc26ebdcfc37592c18e228d25486f4f7874a228fbd2aa935b1a"
  ]
}
```

</details>

---

### `get_block`

Functionality: Retrieves an entire block as a Full Block by header hash

Usage: chia rpc full_node [OPTIONS] get_block [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type       | Required | Description                                         |
| :---------- | :--------- | :------- | :-------------------------------------------------- |
| header_hash | HEX STRING | True     | Header hash (block identifier) of the block to get. |

<details>
<summary>Example</summary>

Note that some blocks (such as the one from this example) are not transaction blocks:

```json
chia rpc full_node get_block '{"header_hash":"0xf42b4e77315d79ddfb3d64becb21e26ebff5408bda4d1b7c3782fd04f49ec0bb"}'
```

Response:

```json
{
  "block": {
    "challenge_chain_ip_proof": {
      "normalized_to_identity": true,
      "witness": "0x02008cee5f66cd352a6bb56c6e6095a4ee4fecc11918ce42b559f00f7104704d30075519110d6b144e32315c6808a59561790a3c0c6604ee722fc62cb3c130b94733b119915f2b0c544c900646c5e1837adf8beec05c9aad3bd46140d22e256fab090100",
      "witness_type": 0
    },
    "challenge_chain_sp_proof": null,
    "finished_sub_slots": [],
    "foliage": {
      "foliage_block_data": {
        "extension_data": "0x0000000000000000000000000000000000000000000000000000000003a2c7c9",
        "farmer_reward_puzzle_hash": "0xe2f70baf739bdaf59e360d3a3e2d4ff8cb89f150d9b60b8e91b870e41b58f2fa",
        "pool_signature": null,
        "pool_target": {
          "max_height": 0,
          "puzzle_hash": "0x71afdce401a0f2a6f03de6287902eacfa38502d6667b04da36e32c3930171ce4"
        },
        "unfinished_reward_block_hash": "0x293f38e7932dce9e8216820baf873c76836c8ffeb9ef24549a653f2c77a948d0"
      },
      "foliage_block_data_signature": "0x81fbc2b4d7d18e85db97e83f254ba6546cb08c80f50de1c7353d20a07d574d0d1c084273a1ef4822e164be450abb2dfe133e7d2d90727a43baae9ad858765b30eea9afaf809563760a07dc3fce343222af857b9af5f4d37f79a832e32f335335",
      "foliage_transaction_block_hash": null,
      "foliage_transaction_block_signature": null,
      "prev_block_hash": "0x902ca8dfdd08e79dec3c96837f4e99162508ffaeff730c68af1fde9b86cbf61b",
      "reward_block_hash": "0x5566434842f375434f9a558a3de5907db44903036c3de1573852afffbd1991bd"
    },
    "foliage_transaction_block": null,
    "infused_challenge_chain_ip_proof": null,
    "reward_chain_block": {
      "challenge_chain_ip_vdf": {
        "challenge": "0xed35c7dd67371857123344c847339e4d23dfa815ba8859d160813a228fc6fc22",
        "number_of_iterations": 7242534,
        "output": {
          "data": "0x01001ea29503859966e59024fb3a903e424a1652e724483b86928febca5e308d7039b7138847e436e5f1ba5f6c025f6c6ff275c070149079877463aa077f571d0706516723eaa51113c8ec624a005dc73704fcccefa26bb0eefbb9af15eb5c61b6090201"
        }
      },
      "challenge_chain_sp_signature": "0xa8aeaba8b70ad7515055ab8c19d611226718f3bcd3311743a8e247fed59e069095514c68ba5862b186f9854089c27a3a19c45b91d2aebb21267b27268850cc220e1d33fc0e4c582e1602c968c2d58c5c629032ce7da2683a9ed651df729c07d0",
      "challenge_chain_sp_vdf": null,
      "height": 914661,
      "infused_challenge_chain_ip_vdf": null,
      "is_transaction_block": false,
      "pos_ss_cc_challenge_hash": "0xed35c7dd67371857123344c847339e4d23dfa815ba8859d160813a228fc6fc22",
      "proof_of_space": {
        "challenge": "0xad43c12b5c5a480ee93992697bd8c9153d536007b0ffac024341cd8ca853a9e3",
        "plot_public_key": "0x8b5f3cd22bf5073e12f285d2a0e9bbfb485fea8f3ede2f5573e44168fadbb91b71cef1dffc03758a5241c47b105df81a",
        "pool_contract_puzzle_hash": "0x71afdce401a0f2a6f03de6287902eacfa38502d6667b04da36e32c3930171ce4",
        "pool_public_key": null,
        "proof": "0xa84606d3dba86cbc1c2f56d05175bbbcb970629380bec5c49ad46f0c5f067e4ba74101ac24f0e09fb73ce0ebc9249436c528b5fab689d94c4213072e2acfc1c3a6f17763b16304234002ce471da4ce7e888e2f5abadf4d7f48cd157294ce03cb28df0f45597ca5460cd66c772c7650f2d170d08a5898fe65623b33aac864f44d2a39bcf074e62866edccf9b424f9a8ca56c9a98e87d48fb02b933af951284d610ff1eb71e730a05c2f6c7be86fd4df7efb26e8fb2e573981d8ad866adc02a82ffb0d7ff106c9c78f9cea08f4a2de9db2607266edf6e807924edf9af0f36b8938d97865072126011b67646b4d0e206b706d3a3e67e8862cb0502520f1ad1b4341",
        "size": 32
      },
      "reward_chain_ip_vdf": {
        "challenge": "0x316979467849d4f8ed3a962e773b0849bdfb4e02861191b5af36f270008b66f9",
        "number_of_iterations": 6791425,
        "output": {
          "data": "0x0300854ebbccc4b4b5c0e0244dab12ada16568da6173b1dee587e0e8a212dacc66e562289358af482e1684f4bbe8b51fe96159ec2ad40a0758ff34e8be54bb63ba16399eb171ffce04ed6ffa5f532dfa0c9c779580f5daafff0d97e0c30ae22077060100"
        }
      },
      "reward_chain_sp_signature": "0xa81d4d596f4f657e7405eccbe99652eec386f624855b1e0dbd2bdccbc5c909572570daf173da11e26370cb00731ddda611a931eb67d03a3d9f286c704742fc5a4d3fdfb8f6b04ba960debf118e07effa5f030c688dbccb820718661ff8fe7e8a",
      "reward_chain_sp_vdf": null,
      "signage_point_index": 0,
      "total_iters": 3330271511334,
      "weight": 1393823840
    },
    "reward_chain_ip_proof": {
      "normalized_to_identity": false,
      "witness": "0x000005d3ec00e8927763e6782b80784547a215431ab10a0a0c9d3391a6e4583baf546c6b921bd3396d21a949dc187c1a1d0496f81a91b8716688f775cd425d3adc0717232b677b10807f112b7903ffe7dd8f730af4f4e942a2713322b3c2dda0b42b0100000000000017075086c91d61dc6e7eff70a214b1e3cdf067bcaeda45ef5d00e557984a2a7819f9ff19020077362394b1fe374632274ce77174cdbdebc9da0fc54df284dcb42b3a8cb2aab227da413dcd46927c272dd323b669cea7a001ac6247a423378eb94dea3154532dbcab891ef0fcf4f48dee4a689366f3622fa6e60a960c71b074f9520dad549224020100000000004515f0f10ac62807e87230aeb8bc486caac213a6418042c1ed9c1b5a1814c7e190f6e88902002364e9fb81c7b967e39eeb2e4ae6b4391fa262a5603c185cbc906acaf50e5ff7a7df7f3f3dede3b09c2a8b1a7dfd012a3d0c08ab21b5cf15fb4d1f1df9d4ff040b39eaa9ffccfa9ab3b03d5b33f312c13ff8908ddd9c640ede1e4d270aaab51b0100",
      "witness_type": 2
    },
    "reward_chain_sp_proof": null,
    "transactions_generator": null,
    "transactions_generator_ref_list": [],
    "transactions_info": null
  },
  "success": true
}
```

</details>

---

### `get_blockchain_state`

Functionality: Retrieves a summary of the current state of the blockchain and full node

Usage: chia rpc full_node [OPTIONS] get_blockchain_state [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc full_node get_blockchain_state
```

Response:

```json
{
  "blockchain_state": {
    "block_max_cost": 11000000000,
    "difficulty": 1976,
    "genesis_challenge_initialized": true,
    "mempool_cost": 537334390,
    "mempool_fees": 4000,
    "mempool_max_total_cost": 550000000000,
    "mempool_min_fees": {
      "cost_5000000": 0
    },
    "mempool_size": 2,
    "node_id": "b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab",
    "peak": {
      "challenge_block_info_hash": "0xebbe31959ad87c2f802fddb7f29974c56ef461acc5b453ebed9407f8ddf63689",
      "challenge_vdf_output": {
        "data": "0x0200fb36f5096da1f2cdbebf570d9da9ce95d2c2767f4423bffdb381756064a92046eaf4b1b25700b48f66283960dac64de6b8406fee99f25f05a0a595236b262a035174b9305c1bae316abdfb72032462539459b3475b968e68fd34df1d52a7de050100"
      },
      "deficit": 0,
      "farmer_puzzle_hash": "0x68e41771a54d741d07cfcc7a9d289a5a5144ad8e6d7cd595f72a2a0f40e63fed",
      "fees": 10500010,
      "finished_challenge_slot_hashes": null,
      "finished_infused_challenge_slot_hashes": null,
      "finished_reward_slot_hashes": null,
      "header_hash": "0x65b9e51000d4ab6996b98bf27c1ccd4b0861a5e3b2e8acdb14f45d1680e5e484",
      "height": 3326213,
      "infused_challenge_vdf_output": {
        "data": "0x0000891136068e7c213a6010cc8d521c1e1550a05448391b85e8b63d1cd3575407eec88b8371ed61420810a28829d871dd362ddec08bbf107f6f17a8dad18158120058e2d344496815183acbfae20f89cea55876462079acb1181d5a523f4c9357001c03"
      },
      "overflow": false,
      "pool_puzzle_hash": "0xb197cb377bc5bfed57f84a3d1863e7d305dd57e469e6c4416c8a5ea80cf3069e",
      "prev_hash": "0x96170585731ff12a2ec6ea553b763b298671a19c27e20a781fc63c684174e379",
      "prev_transaction_block_hash": "0x1630b20b9dc557af2cd75b2e0fb948fedfaa8228f1169d6296fceb61d2a7162b",
      "prev_transaction_block_height": 3326210,
      "required_iters": 380975,
      "reward_claims_incorporated": [
        {
          "amount": 1750000000000,
          "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032c102",
          "puzzle_hash": "0x39b2d9b93c6410297131808c51df1787987d1bcf11feb6ce892fd25db89ecaea"
        },
        {
          "amount": 250000000000,
          "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb0000000000000000000000000032c102",
          "puzzle_hash": "0x39b2d9b93c6410297131808c51df1787987d1bcf11feb6ce892fd25db89ecaea"
        },
        {
          "amount": 1750000000000,
          "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032c101",
          "puzzle_hash": "0xfdf423d6888068fc8dedb5e405e9204def74468040811d67035ab118c7af2ba4"
        },
        {
          "amount": 250000000000,
          "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb0000000000000000000000000032c101",
          "puzzle_hash": "0xfdf423d6888068fc8dedb5e405e9204def74468040811d67035ab118c7af2ba4"
        },
        {
          "amount": 1750000000000,
          "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032c100",
          "puzzle_hash": "0xbbef6c5bf9f0ea5d8c27219a9a3680809f37d90b053f16e349e8092a9f502ffc"
        },
        {
          "amount": 250000000000,
          "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb0000000000000000000000000032c100",
          "puzzle_hash": "0x291237b34c6c8416699c8544eb9e2a7f481738418dadb9134c85a05f282829b2"
        }
      ],
      "reward_infusion_new_challenge": "0xd52af21dc0d1aa4dc824ace6de091419677c4940161695ddad2f06f61b8b61d8",
      "signage_point_index": 43,
      "sub_epoch_summary_included": null,
      "sub_slot_iters": 147849216,
      "timestamp": 1677831914,
      "total_iters": 13740836343855,
      "weight": 6803132960
    },
    "space": 25193321725003644928,
    "sub_slot_iters": 147849216,
    "sync": {
      "sync_mode": false,
      "sync_progress_height": 0,
      "sync_tip_height": 0,
      "synced": true
    }
  },
  "success": true
}
```

</details>

---

### `get_blocks`

Functionality: Gets a list of full blocks by height

:::info important

There might be multiple blocks at each height. To find out which
one is in the blockchain, use [get_block_record_by_height](#get_block_record_by_height).

:::

Usage: chia rpc full_node [OPTIONS] get_blocks [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                | Type    | Required | Description                                                         |
| :------------------ | :------ | :------- | :------------------------------------------------------------------ |
| start               | INTEGER | True     | The start height                                                    |
| end                 | INTEGER | True     | The end height (non-inclusive)                                      |
| exclude_header_hash | BOOLEAN | False    | Whether to exclude the header hash in the response [Default: false] |

<details>
<summary>Example</summary>

```json
chia rpc full_node get_blocks '{"start": 100, "end": 102, "exclude_header_hash": true}'
```

Response:

```json
{
  "blocks": [
    {
      "challenge_chain_ip_proof": {
        "normalized_to_identity": true,
        "witness": "0x0100a57629d394d187d98436d8d3cf5e3d04b15b73fbd46dd4199047cbc0c40ef4a6dbff1a2f0ab68b7333f2884df4821edd4b0f540e5b6c82e466704d81b55dfb3fc7eca3e3ae6c53a6a86414e007a9703218261eab89f72e7f387c84690673a5460100",
        "witness_type": 0
      },
      "challenge_chain_sp_proof": {
        "normalized_to_identity": true,
        "witness": "0x0100832a7be870a7f409e2ce83d161810be7e619f7f7f3d861bc6c661333fe50d4e62652dd22c378732e7c70f3f5ed82716586d3bc082a04e0c239837fa2f33c5e0299a11238785b94ddcf2fe96b0e4b6bf65ab418bcb1b4feb309611e2d8d8966080100",
        "witness_type": 0
      },
      "finished_sub_slots": [],
      "foliage": {
        "foliage_block_data": {
          "extension_data": "0x0000000000000000000000000000000000000000000000000000000003a2c7c9",
          "farmer_reward_puzzle_hash": "0xffb41ab9f269d42924f733cab98e12adf9bbef2961bb744237c33e70138f4fab",
          "pool_signature": "0xadecab86c44e96cc96ce52af9ca79ef20a0ff9a4a4ec9b8c21948cf8651186a072f5017c2fa527ef7aac827a47f758d0095403e4a2f9e138b6248dc9d5dca7083f23a218367091f29bfa4ac280aae4abc83d544a662ad8cc4c51fa2845279d01",
          "pool_target": {
            "max_height": 0,
            "puzzle_hash": "0xffb41ab9f269d42924f733cab98e12adf9bbef2961bb744237c33e70138f4fab"
          },
          "unfinished_reward_block_hash": "0xe1faa1f4f7e664f943c86d7355b44d45f09a909bc8050af2e7e148a034909dd1"
        },
        "foliage_block_data_signature": "0xb9136cbcfcf49e2226af8869e3d5d88934006ef88fbe33b347661facb60f27ffc2520f0a5c1026e4ed25bc67a0f2d48203fb4c0e432ee90bcbf8b0ed8cac4a3060715ff92fbd7278303c4ff69060f1e85d586e7cdab7c14cffb0ce486af9f7b9",
        "foliage_transaction_block_hash": null,
        "foliage_transaction_block_signature": null,
        "prev_block_hash": "0x496efb34579737f871b16ca71e6933be36711271765eaf6aa914f5e1e70cb00c",
        "reward_block_hash": "0x49d0931675d6ede5633cee302d6d116637592ca394edabfe7b5e856166e8c074"
      },
      "foliage_transaction_block": null,
      "infused_challenge_chain_ip_proof": {
        "normalized_to_identity": false,
        "witness": "0x000014c701a11a22a61f2699a9fbf2a41c122fc2e45c22f05e5134d52ba3816a62d00e0ebef28eadddacf123f36b49b0eb09b2003625295cdc4b5fee5a13b79d792f137c6d0fe18f30af0ca97f620a38b1bdb97978724346a8a0835829c880eb7e2901000000000000031ed49023d56b73dfad1ede5d1136963ad702dd6167b5e7d9e4a9696807268f8bb68a2100003abafdcd1a7f21a90b9c0db5476dd7dfd3331bc9706ff6b421bfe0b07aa7e998821492331e36c6160c56d3a30fce35b35fce0edc6837be841fc99de781f7611f2dfda704ce22402d6bb63668e14c4c97081a53c9c7989f09565d4df0ff645f0c01000000000000095ce0c90c1f4e03752cf1ecb5bc51e4a778f0725d0dccdda1b0ce2b50fb6aea7836d0e503000a8f135979673a0bedd830c2617860f28e3b3b0c2184c7ea87bf9e5a343cfa4ce4ec92bf1899f24bffc6b6f36c3a061a07cc1663848bc75bf37cc869d37b8e2ac1a184e4868e3fde06779f9b76e6f2b581552927024d6a6258cf47f6dc6665380100",
        "witness_type": 2
      },
      "reward_chain_block": {
        "challenge_chain_ip_vdf": {
          "challenge": "0xa5762d4e8bfdb0a0b14fb5b64f498a47585716dc6f302c4856d69d629421db6d",
          "number_of_iterations": 37508080,
          "output": {
            "data": "0x0300d1533b121a4ce116fb7a1aa24242d063ce1f0cc18d2828b512a1c26dd653218233cf7d303b71f199ab35318a725e92411a785c4c7d2f93aa11652ccfd4b9402b51159d43e52230927b6ff56730c17144c87e6db6cadb62c9e2a13fa25b89e8090200"
          }
        },
        "challenge_chain_sp_signature": "0xb010a05b90be628e4f6ed371ef845256b660c0065c296f466fbcdf5cecb4e7c31a5ab095d8e0cead0c67a323669528e71106935e934731e0ac9dd4cdfc09034700d758632e9891db14aa08e7d88cd74e9eb8c399c743176819d51353a96ea7b0",
        "challenge_chain_sp_vdf": {
          "challenge": "0xa5762d4e8bfdb0a0b14fb5b64f498a47585716dc6f302c4856d69d629421db6d",
          "number_of_iterations": 29360128,
          "output": {
            "data": "0x000007c75080573253ceac71d020ee668aa51792fdd61eeef009acfb150c424a4a1484198442c8bb6d0dda2afb1098237ac87833a0523031ed6dd5631f4dbd45a838d15482caf9f400f2568e2812796b8ac31d84d13c2f7ee37fd3512d8f23027c060100"
          }
        },
        "height": 100,
        "infused_challenge_chain_ip_vdf": {
          "challenge": "0xce285a81b684e3b30425fbf829c8b3da7e96d5e3983eb84c8c2ddece98b23eb5",
          "number_of_iterations": 920450,
          "output": {
            "data": "0x0000baba4014b63bbd31f52fc3a6ff970b5256388b4f031e3b23009198561fcf7c58086d96f0ae151c22f401405935b2cb0541859f7585edd23e9e095c206cbc5c30776516d0259bb15c902eb310db0167541083e6c62e1501c0260f54b6863d2b0c0100"
          }
        },
        "is_transaction_block": false,
        "pos_ss_cc_challenge_hash": "0xa5762d4e8bfdb0a0b14fb5b64f498a47585716dc6f302c4856d69d629421db6d",
        "proof_of_space": {
          "challenge": "0xa2877f265f2b5d80e35979e32506d07665ee94459fecff1e34b063e1ab4312ff",
          "plot_public_key": "0xac51720ccb9ac85841561a7ea70f52b839d996aedc1a76ba0bbaf3d38a21ffd8dd71700535d30b412facfc3054e779d6",
          "pool_contract_puzzle_hash": null,
          "pool_public_key": "0xae384e452745cb60f5dfe6eb15d7626d42010912c9e88cd98576094c1aa8878615e11fe5c7a8acb1d97b51d67c5b481e",
          "proof": "0xe171815c128e21d4f61266ee8490a4ba52776ef7208ff44463e5b421c9d30f9dbdcc80d070057dd3d96b8690df77a28e64977a838d8a149de6c5494aeb8252fa49754feed33e3ddb6a3be6aa5584c2f859aa5c6bc274bc24e9e46574ee41c8c09c8dbd32eec9fc894badf3980295447b92885384248c85a6ef62766cbde32a699d8464bba6f3545efe95e86da322b2c45c6cab0485e8db2b24748b844d6dbe4ee23285c324b87ec7452d5824991259b50a6ec90f6e4c2b47b3ef7336bda9156b1c9ab952c10f257044efd928899d4ec2c6ffe620ced637811483592f66b03e120fb9c22ed7daec6f45dfaa2c93ba8ceec6d12f51a30ade635871dc148ea58de9",
          "size": 32
        },
        "reward_chain_ip_vdf": {
          "challenge": "0xf45e64b4fc6491516c6afd4f5b75284a980a31e0cc3d4bd124f63aeec2a49833",
          "number_of_iterations": 920450,
          "output": {
            "data": "0x0100b6c8fa5fa401a15babbdbb449e87ecea049e2aef8c8390dc221b82d679a6e31e3de53e22e1699c3b6bb30f4d2f76600d067c93bb82eb684bc21ef16531c91a0e3b80fc958ce3027699c0aed97429547d017822bd264d7899a8f5fbb22432f70b0100"
          }
        },
        "reward_chain_sp_signature": "0x87ea89c12b555de8df2dff60f651e451c9a9ca0520b64e2f83324e528ccaef3236c33a6afa81b341b8deb09ed59e30c8129508ffa9847e0438109809af7138f1c46f6e1ee62a910dbcc194c843eb44c8e8f812ddc1cc29f8508717369ef3ab87",
        "reward_chain_sp_vdf": {
          "challenge": "0x4d03536680aac02491e3a0f6e6d47adfeb27e84cb8553397d8017ec028535ff8",
          "number_of_iterations": 11626949,
          "output": {
            "data": "0x01004e657c0f7937d159a1c8e3cf31bac1334f1977ad9c4c666437c9f75eab72f046f84468d119f231905b52dc33e5f91e4747cf2f8569b150220c9f74c7681afd04b11f7bf39f1a7580979382c466610b933f79c0a9c0f2c943de78083ca2f2f7040b02"
          }
        },
        "signage_point_index": 14,
        "total_iters": 440161264,
        "weight": 707
      },
      "reward_chain_ip_proof": {
        "normalized_to_identity": false,
        "witness": "0x00003c8c588e6ca1dc1a8bb6a7705336749d9e7bece4722f0fb956fcd4d63f321664d5dad2f6a1209f0c7b9444f1bf66544a943f6c34c11ff73fd8bc560003def013f36a9a7db270a869b437cc6a1f6cf61d391a7be1cdc6092120b962e263a3aa3901000000000000031ed4e9f61d9de2efa33310981402c720499f1aaf2791db3bc957b36d80873ddc8a6cbf00009b973f711e920a925bb942bee1e61e2b749e78bf72e8577e39365f4e4aa66cd4827b8119e04dea6adc76daf265e99675aee6d1ddd9c153af72b5f449cf0782104a1050638d906ff486965bef4fc97cff2fcf04f6dfa5a11a59760a141fdea90804010000000000095ce09ca0a0a0af431aa3540cffd1df4dfa7c3c50482591f61030ccb13c6f8ad955c6990200243a6365f719df9a29667a9f690d2b512f08a401029dbf31c1eaf9dd46554efcea72ad6d261d02d7467815ae1c1298f37e32e032c2d801ee8255ec436e5f750a4fcbb1450079688de0892bc2fe54a6382f77504ecc576c8d6b421f584b940f140502",
        "witness_type": 2
      },
      "reward_chain_sp_proof": {
        "normalized_to_identity": false,
        "witness": "0x0200f0f21296dde779120a9c7b266b9112b701f1d3ab62fe09ed63f64e4ff73da7cc51597bc3d237c5b2ca2d4d11133f5331d47a92a0a5a32ea36c5a50b721552564b7bf7dc3d34723a830ee7a46c436b407fe6f3c108ffeb96aa8bd95a1b25d521901000000000000276cf8f3b9eb17afa29bce73b02f59cce66afa0e0d7176873415c780946519c1eeec75d1010012f428109fdc8213629fd2be850573a0e962b2edc15219a07cb29dd6fd02e1a76da0bb543db58217429f08e1626edbc225c8934338f6594e2ed6532c88349870a32d07cfc764ee010e23456bc425954a2c9b81aeae482f5b737b98478b9da02101000000000000764620b40c8cb9d6b6e39e8b161185b82b680a4d7c7036088dea1a24b19183eee6bfd897030066c806cbd271380f0b820be100e1c5ec601b88d8b049eeafaa2cf08018aef096da462e76e1cef3a334603afaf1b3db6e23a4473009a5407798b84e867feecc18bb1aa97abf375a1a5099dce7940c3287b67747a107d3da918b0dc14b3e5ac6080100",
        "witness_type": 2
      },
      "transactions_generator": null,
      "transactions_generator_ref_list": [],
      "transactions_info": null
    },
    {
      "challenge_chain_ip_proof": {
        "normalized_to_identity": true,
        "witness": "0x030025f9836e1766fbde2ce6a61b60651a4611207eab4c76661fb0314185a82538d74aee9bd4185e664a9e5890491fbc34c758ad8ea0f01098fc83ff03d4e69e6f07484b83f6ef849368612441bc0f8764caf2e92995b18934a9df4dcb2eb6dd62010201",
        "witness_type": 0
      },
      "challenge_chain_sp_proof": {
        "normalized_to_identity": true,
        "witness": "0x000062c5635ff324127600072e3f0b117a207b18e1885701bbcef20c207b327c478efb1e1605547e5920b0e87ade4ac79c28975303747d6b54802c12036b4531ae4a33cd1e12b8d61122a2dc8a86f3e6e9924562728d65ddbeb7e48583dd850cb7380100",
        "witness_type": 0
      },
      "finished_sub_slots": [],
      "foliage": {
        "foliage_block_data": {
          "extension_data": "0x0000000000000000000000000000000000000000000000000000000003a2c7c9",
          "farmer_reward_puzzle_hash": "0x8f5474dc460673a39c96bb0fdfea933f5d1269c138e47a67f07872c04803a4e7",
          "pool_signature": "0xb08c85cf0af39b157fbd531f89c3575b48a87cde9f4c13613c57189c490ad1543e98ef1ffea725c54c7adf45591b823116b7730826fca3ba2314165552cfc88f4e2c41c4aecb6129f144d694126dc79305bc939a3017e793098b6b0e22945c47",
          "pool_target": {
            "max_height": 0,
            "puzzle_hash": "0x8f5474dc460673a39c96bb0fdfea933f5d1269c138e47a67f07872c04803a4e7"
          },
          "unfinished_reward_block_hash": "0x39f36bac604c0b6676a7ec77314d72cfb64c3460e55791fec1318bb9f99af68d"
        },
        "foliage_block_data_signature": "0xa1fb2838601909a1520b8dbbd5543fcee58849051cc1b8bf37f2802baa7ac080b46e4e44f1064b00262f6aa7fdc9022e05ef5b05c8c25c0c4ca55cf1051e9ea89335ae14d021343ce3f91bd95b60dba926b7413d38b903515d0d40a572b0eebf",
        "foliage_transaction_block_hash": "0xf870f5319951c970fc65eeff6f16185b94b4bb754ee98fc86f98d6ad45018d13",
        "foliage_transaction_block_signature": "0xb967499592d60c4342e98b9f412804c525d42dfe1cff93597bb5afbf0f0d98d121a46be7dacd0075e91cc7819fc0723f0732d30618e20d2c4a27248a6e79a5f582b6fad6308b1ff933a38be01919b2d062a327829e0bfbb24539a90ce5f163ab",
        "prev_block_hash": "0x9a6c8728021574c5f3242370831b9fde7a0421f4448b4848276fe1652580c6a7",
        "reward_block_hash": "0x100b6fbe0778ae13e48e9bf71b7de4e31e5c1d73a0b041e0277f4a76b5338604"
      },
      "foliage_transaction_block": {
        "additions_root": "0x37dc0ead981039cdfe0ae3d5c6f379bdd3b81d9d428079b2fcbce32daf69b1b3",
        "filter_hash": "0xf8945105b042df1af249e51f2e4fb0bdc115fb0bf3e1906f892d8daf04505b4f",
        "prev_transaction_block_hash": "0x6c94307cb88f37ca002936769246579824ecadc77fe1e445d31165e6958288e8",
        "removals_root": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "timestamp": 1616164827,
        "transactions_info_hash": "0xe0a46738000ab8b302d9a98ea602adabe4c2b44c9d775577f1a3f74e4c4d5cf2"
      },
      "infused_challenge_chain_ip_proof": {
        "normalized_to_identity": false,
        "witness": "0x020029fa78b7cd9ce0f6453ed1ab95a3c120787bc3deee67d0d6b94d496646189b3e567888886440b89ac66185b3e4fd08bc9706cd5337f5160f6bd486fcbdd8273cf72b9d6bcee7bd9dc39f668ae0c80727faf7c4eee06158297fff4c552bfe57210100000000000020cda8be65bd71d461e67d6bbb042256f5e49ab66a06702d695e295bef68ec3d8c122f4503004080955d55e40c2d6936d1ec63cd20c5d5cc1ad6151ff9ba136937580a631a9890243a9aeb4c17d352c27351af113e42b49beb056d8b08e843e5e2d1b77e510927b838a67ec6504228b90bcf62b26ad7336eb73337a9b61bd34caa77393a8304030200000000006269c0ae3782dbf513bba4c73244f25305c5734266ec6202b823d1b27957c4f925d4cc1f0100b742b8090ba58abed0f7c8de4f4aa0c9dd77ebf3b651ee11c0fd7699e689cfc03d045ec4cd04d5defc1fac8858d7f310192daa6ca93682fa15e590369ad63427de53adf0ed76b6cc2c1fe2892baa7195d6a0ac16b2e21754db560729962cf4520100",
        "witness_type": 2
      },
      "reward_chain_block": {
        "challenge_chain_ip_vdf": {
          "challenge": "0xa5762d4e8bfdb0a0b14fb5b64f498a47585716dc6f302c4856d69d629421db6d",
          "number_of_iterations": 47182489,
          "output": {
            "data": "0x0000af33fa9862d4e257498e9ba0c3cda09c1389d1fde0facd72ea26f5371ba94deb18137d95bd83b1c7afefba6293feda91d744d014c747e132db0247839e9bd00d790c06f753a9d344c80c455a86ecd979c31687ece60748a5d62dca4723c3780d0906"
          }
        },
        "challenge_chain_sp_signature": "0x94780490364f4ab2a7e9186377729444fbcdba4c8d25f8a2d9f91a42ed8ca798790f7d9876190a9a68eff1ed52d9c3da15dd678e9aa463fbcc8cb9cff9f37cdf0e53381b88735d8ac0a498925319c655a261747ccabe3b20e36d4669a8bb0a4e",
        "challenge_chain_sp_vdf": {
          "challenge": "0xa5762d4e8bfdb0a0b14fb5b64f498a47585716dc6f302c4856d69d629421db6d",
          "number_of_iterations": 39845888,
          "output": {
            "data": "0x010012fb95381abeff50aa787f5d5071cde8046f0301c84121d91c4bde0a6d491844d8386e536f30f4818468d0fb4319a9fe1abb4548cdab4f62405915acb5c37132cb302909847b0b869d07074e546b6501efcd1cab4193c9ebbc4f79f3abfd48580100"
          }
        },
        "height": 101,
        "infused_challenge_chain_ip_vdf": {
          "challenge": "0xce285a81b684e3b30425fbf829c8b3da7e96d5e3983eb84c8c2ddece98b23eb5",
          "number_of_iterations": 9674409,
          "output": {
            "data": "0x0300a4bc6790208e73245df6a85b3f7beac0d17e73972b414a7f94cf1e3c3e9bb4a400516d368cfa8b1814f3b5163fe5a54a1fe35781f58290673c8d9f56cd23b94c138b21207d6aa6f3049f8ad805eb99b28292e06e748117e78e13598cee9945670100"
          }
        },
        "is_transaction_block": true,
        "pos_ss_cc_challenge_hash": "0xa5762d4e8bfdb0a0b14fb5b64f498a47585716dc6f302c4856d69d629421db6d",
        "proof_of_space": {
          "challenge": "0x4afbc47ce97b7879f32f264279a901a250dd04b537d2a31a284855f31fae497d",
          "plot_public_key": "0xa1643e8e1232e278ed8288b1d799e96d77a965ce6790c0c0b48bd221fbd75b6a3c0cdb4c41094f4635f92c6f16d4bc1e",
          "pool_contract_puzzle_hash": null,
          "pool_public_key": "0xa5d46513ca3dfbb0fc0e22a23f2829760049ee5b1be7c07e8189572a98d1499bb0332d09f2b7a0dfa64d89e2c0b2eb02",
          "proof": "0x4aec6c0681a5dc053aa77a1361060fb77d83c2c51e356867be8e16edc7adfe5744ff2d41ae9c8baec6033459bfd2131be11bef5d0dafbe26ddf06ba1fc641ef7e84869de2039445e51a20d2f8e24470b0ee5e3907186e0a2eb2389bb0250316e3919e5a65a8c75c707915538b1d08a2225c6facaa44aca58aa6e7daf97290e931f4556f569b5b1f4f86f5cd94116cd35373c0f2dc3b8d288670cd949b77f15782c3ac6f94b7b5406ad8901c15bf0f5cc07c0993055db4fed379d4ba05a4d08a6bcf491b73d01283d7ac90f81c5468f0bbe4e3de84d27ab9bfa271710ce51800ff579eb6aa8ee98f03d999f24feb0035c4b621d6ff7e0ba8d337be8c4c019b640",
          "size": 32
        },
        "reward_chain_ip_vdf": {
          "challenge": "0x49d0931675d6ede5633cee302d6d116637592ca394edabfe7b5e856166e8c074",
          "number_of_iterations": 9674409,
          "output": {
            "data": "0x01008f895f468f126a02004589c77c659bb55d9931ef120303bdfbb772432aeba315e4f06185389d8bcfbb2282fdbb2a1d2221512d3b8207ce048ac2fe7b036d4e0f7258f15caccfa7547bf1634f955510b1c3a46efb58a2ec599a3b4876e9e15b0d0100"
          }
        },
        "reward_chain_sp_signature": "0xb80944bd1025f63f5931c7ff7c99cec55c82c62cbccaa17340be94a7ca6fe7681e420ae00377452666c09aa41296e64004ed4c16c9edfb43593b3490d9a5da9c3822204b9e94aee61cc215c69774bf663dc48eed05e43443a0bbca91bf72114e",
        "reward_chain_sp_vdf": {
          "challenge": "0x49d0931675d6ede5633cee302d6d116637592ca394edabfe7b5e856166e8c074",
          "number_of_iterations": 2337808,
          "output": {
            "data": "0x0100ffe63ea44b1340961a25c398c66ab1c56479ea16a746eee8ca2aab8bbf682b0d777993cb840488ff86e16eb6acfc2b8068acd72f761af76647849f1b4a835a3516e2ccf739b579bd999bfc2d46a4b55ef445c043fe0c714b2428ddd1351d82100100"
          }
        },
        "signage_point_index": 19,
        "total_iters": 449835673,
        "weight": 714
      },
      "reward_chain_ip_proof": {
        "normalized_to_identity": false,
        "witness": "0x0300059c76107499c7b8c60fcbc02b4f17ed2a144614a882e42f9a23d8f506dce485200551cb47925a09f68a51fdfb033cf6e7f63bbac376670dc746dab3376c420e93707b7cf8164b3dcb2a091606f83de6a51c2358c1094ad5c4ac4ea06355f20c0402000000000020cda8da7c9b0c374261fd87f7cf7f2c72ec38cd79f11c27e7311db84a54d040bbd7905700006ffe8cc021de8752ed9c2ece79619bfe564b51a4944c0eb6a332a2a1f74a71be2a6846e721618f20196de4644c81564df706213018dfae7a8c6481a71012530addeeff07ede9cfd3e0593ef6b2c2b88539f5fc9fd9ace1db646971e29a439115010000000000006269c09732bf539d6e6caab8a0acc797bba6f13f8082cf7ee12ee82324456342470666f30000e7e3a77ff1d4d57ba4c37994c0932099f5fa10e59b37f6c2ee6084c63d4445b176f8826c6af947bb1d2a60fc1ef7543c054076a53459dae9b6dd9382b24b930c55e307925b32bf333db54cc8c85cc61e1c6d99369ea6a17fce4d5616ccf3e2170201",
        "witness_type": 2
      },
      "reward_chain_sp_proof": {
        "normalized_to_identity": false,
        "witness": "0x0300fa5f9ce4e42677915f7dbe5914a58c9ff496bcabbecc5deb5e7931905b525dcc440964902d65482817f99cb85c506eec42421d7466d4253203afb3305c2c130e471bcf0546f16e6d02f3e91c86af0a0c163c28abdb6a7df72df9e87ec13933010100000000000007ed4c9e57adab5b004af49ff191803461f8cb67e45a77bf1debe679f01c61c690523c930000e2cb7363ee532c2045f873373e44d43d8262bd1f77294caf65e1a2fecf26c08200cbb62611e981c29aea737b128cd57b8f876ee745a0541bb4912490409960090792e5ca693fbd3eedcb5a6d98c6d1339b170bb08a9159bce19add182747010c0100000000000017c7e4ba19541c7da9e09dbf518b3c4024fa66eff40ef256d00aeb6a90857b22c8889b3d030069971c64cc178c9620125972c6a7ca21598d64e482e85a9bb399c9b0bcdd9390c10070c9cfaa90ec4465782a887077f0239840bc2106747624bd27ad27bc2f56989ccbc5bda15a43ad34ed723d06abb67c5735820ad3658d155a49ef149c2d020100",
        "witness_type": 2
      },
      "transactions_generator": null,
      "transactions_generator_ref_list": [],
      "transactions_info": {
        "aggregated_signature": "0xc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
        "cost": 0,
        "fees": 0,
        "generator_refs_root": "0x0101010101010101010101010101010101010101010101010101010101010101",
        "generator_root": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "reward_claims_incorporated": [
          {
            "amount": 1750000000000,
            "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000000061",
            "puzzle_hash": "0x8f3dff600992a0b77aefbe8eb81dd4f233b9126f3b67557594b5a927d6e6d588"
          },
          {
            "amount": 250000000000,
            "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb00000000000000000000000000000061",
            "puzzle_hash": "0x8f3dff600992a0b77aefbe8eb81dd4f233b9126f3b67557594b5a927d6e6d588"
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

### `get_block_count_metrics`

Functionality: Gets various metrics for the blockchain's blocks

Currently shows:

- compact blocks
- hint count
- uncompact blocks

Usage: chia rpc full_node [OPTIONS] get_block_count_metrics [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc full_node get_block_count_metrics
```

Response:

```json
{
  "metrics": {
    "compact_blocks": 2190434,
    "hint_count": 5895366,
    "uncompact_blocks": 1135855
  },
  "success": true
}
```

</details>

---

### `get_block_record`

Functionality: Retrieves a block record by header hash

Usage: chia rpc full_node [OPTIONS] get_block_record [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type       | Required | Description               |
| :---------- | :--------- | :------- | :------------------------ |
| header_hash | HEX STRING | True     | The block's `header_hash` |

<details>
<summary>Example</summary>

```json
chia rpc full_node get_block_record '{"header_hash": "0x3723909a7374c4c88cf00ab9b15365f4988f5bdb2d51bac23f6af939fe40f56c"}'
```

Response:

```json
{
  "block_record": {
    "challenge_block_info_hash": "0x08dbc5c9f4676bad4cd2fad9b120afefdc107ffdd4066f73f14baf2a204f13df",
    "challenge_vdf_output": {
      "data": "0x0000af33fa9862d4e257498e9ba0c3cda09c1389d1fde0facd72ea26f5371ba94deb18137d95bd83b1c7afefba6293feda91d744d014c747e132db0247839e9bd00d790c06f753a9d344c80c455a86ecd979c31687ece60748a5d62dca4723c3780d0906"
    },
    "deficit": 9,
    "farmer_puzzle_hash": "0x8f5474dc460673a39c96bb0fdfea933f5d1269c138e47a67f07872c04803a4e7",
    "fees": 0,
    "finished_challenge_slot_hashes": null,
    "finished_infused_challenge_slot_hashes": null,
    "finished_reward_slot_hashes": null,
    "header_hash": "0x3723909a7374c4c88cf00ab9b15365f4988f5bdb2d51bac23f6af939fe40f56c",
    "height": 101,
    "infused_challenge_vdf_output": {
      "data": "0x0300a4bc6790208e73245df6a85b3f7beac0d17e73972b414a7f94cf1e3c3e9bb4a400516d368cfa8b1814f3b5163fe5a54a1fe35781f58290673c8d9f56cd23b94c138b21207d6aa6f3049f8ad805eb99b28292e06e748117e78e13598cee9945670100"
    },
    "overflow": false,
    "pool_puzzle_hash": "0x8f5474dc460673a39c96bb0fdfea933f5d1269c138e47a67f07872c04803a4e7",
    "prev_hash": "0x9a6c8728021574c5f3242370831b9fde7a0421f4448b4848276fe1652580c6a7",
    "prev_transaction_block_hash": "0x6c94307cb88f37ca002936769246579824ecadc77fe1e445d31165e6958288e8",
    "prev_transaction_block_height": 97,
    "required_iters": 1045145,
    "reward_claims_incorporated": [
      {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000000061",
        "puzzle_hash": "0x8f3dff600992a0b77aefbe8eb81dd4f233b9126f3b67557594b5a927d6e6d588"
      },
      {
        "amount": 250000000000,
        "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb00000000000000000000000000000061",
        "puzzle_hash": "0x8f3dff600992a0b77aefbe8eb81dd4f233b9126f3b67557594b5a927d6e6d588"
      }
    ],
    "reward_infusion_new_challenge": "0x100b6fbe0778ae13e48e9bf71b7de4e31e5c1d73a0b041e0277f4a76b5338604",
    "signage_point_index": 19,
    "sub_epoch_summary_included": null,
    "sub_slot_iters": 134217728,
    "timestamp": 1616164827,
    "total_iters": 449835673,
    "weight": 714
  },
  "success": true
}
```

</details>

---

### `get_block_records`

Functionality: Retrieves block records in a range

Usage: chia rpc full_node [OPTIONS] get_block_records [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag  | Type    | Required | Description                    |
| :---- | :------ | :------- | :----------------------------- |
| start | INTEGER | True     | The start height (inclusive)   |
| end   | INTEGER | True     | The end height (non-inclusive) |

<details>
<summary>Example</summary>

Get two block records (`3 300 000` and `3 300 001`):

```json
chia rpc full_node get_block_records '{"start": 3300000, "end": 3300002}'
```

Response:

```json
{
  "block_records": [
    {
      "challenge_block_info_hash": "0x79394495dd087fb6b11625882873a28f543646ba810c5353aa633b0daec8b996",
      "challenge_vdf_output": {
        "data": "0x0000ee8044c2c04336966a6722ab75df2f4a92d6c975b8b21ea0fbee2cd3294517d40a838c4c77dc50ba271c6cfcba05f37adb117f7c58ce3702f25323cb7587ec4fe56eba0e03f3934ee601fdd6a7e7e6339fadb464fbc22dde3dfb1a4f017b822a0100"
      },
      "deficit": 9,
      "farmer_puzzle_hash": "0xa125a444c8e19ed236590f22c9c79cf6d9af8f734a11a806281371bacffb6125",
      "fees": null,
      "finished_challenge_slot_hashes": null,
      "finished_infused_challenge_slot_hashes": null,
      "finished_reward_slot_hashes": null,
      "header_hash": "0xc394100ba86cf56e77ba892187c97756bf1c7450726b4f42e4549d2700ef0e37",
      "height": 3300000,
      "infused_challenge_vdf_output": {
        "data": "0x0300749020231e6ddbfab6d06ec0cc2f839cd9292963d482047c636c1af76cc9db8d6cdfd96e323ab273cd017dd9add5af1df85191bf2d2dbfb669ee61ac006fea095532e70a0d8de7f6dc9fd476421ca5d9ff05bf6e68165ab87376908bdbf1231a0200"
      },
      "overflow": false,
      "pool_puzzle_hash": "0xa745c56e6c8dce62ac2719ed1fe877e667e758cd6e03c43d4ebbacb3ec3eb0ed",
      "prev_hash": "0x844197000822115a256155392367c0855a9a8bf5543e54dd7b110e58e843a1f0",
      "prev_transaction_block_hash": null,
      "prev_transaction_block_height": 3299994,
      "required_iters": 1908970,
      "reward_claims_incorporated": null,
      "reward_infusion_new_challenge": "0xabe4681408184e29c887fb406add6a8284720018f3cbbd06172f896089d71e95",
      "signage_point_index": 4,
      "sub_epoch_summary_included": null,
      "sub_slot_iters": 147849216,
      "timestamp": null,
      "total_iters": 13620403757290,
      "weight": 6751171816
    },
    {
      "challenge_block_info_hash": "0xf577c44e258c6f5583a1e1d1f7171709ab2a8b007dfa0df7f2214d14b30ffb7b",
      "challenge_vdf_output": {
        "data": "0x0000a9627dc0fa2d84ba6cd417d454b0661778bf1ef0dc5eb4135ff5e58d0d077c8e3454357218f414b00d1516b722109b62ce628e0580612f9c70c4ac61059fa006dfaa1219f83a8e2b60a5f1131ac1d6a710e02241ac5414c968e989226250f6030600"
      },
      "deficit": 8,
      "farmer_puzzle_hash": "0x64e5e7b956b199674e6230c9424f228c2c8fda6a229386ca6dd90bc53648e624",
      "fees": 50000000,
      "finished_challenge_slot_hashes": null,
      "finished_infused_challenge_slot_hashes": null,
      "finished_reward_slot_hashes": null,
      "header_hash": "0x1d9dcddfd409f9c6be5623e13ef3fe5584a936e619f0690eb6e4e8e1a96acfc2",
      "height": 3300001,
      "infused_challenge_vdf_output": {
        "data": "0x0100d79a1b79d6a98ce66fcd479afed0f80b584a1e292a7811c656d00de10f704d402392a9fbb325f405c3da65828fea96136bbd7b9f3268a197c42be3c4449e7c54cd5ed1828620756aa9d17f87971681c7adb08f1b86335af3824959e41fb7b42e0100"
      },
      "overflow": false,
      "pool_puzzle_hash": "0xe1579c7eec5a7fec8fc901c9aafef25653955a88bead3228193197e14a373231",
      "prev_hash": "0xc394100ba86cf56e77ba892187c97756bf1c7450726b4f42e4549d2700ef0e37",
      "prev_transaction_block_hash": "0x96cb9b84cfecd579b3e1eb5ae5c9e35b419b080487e09f11ace406185080966f",
      "prev_transaction_block_height": 3299994,
      "required_iters": 1018573,
      "reward_claims_incorporated": [
        {
          "amount": 1750000000000,
          "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000325a9a",
          "puzzle_hash": "0xac7470110664129f6b6a42fd848fb35f08315a1ef61865ad9f0b5504ff1d3ba3"
        },
        {
          "amount": 250012570003,
          "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb00000000000000000000000000325a9a",
          "puzzle_hash": "0xac7470110664129f6b6a42fd848fb35f08315a1ef61865ad9f0b5504ff1d3ba3"
        },
        {
          "amount": 1750000000000,
          "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000325a99",
          "puzzle_hash": "0x907491ca39c35bc1f9a6eda33f7c0f97a9f583975088dad7216f1edd79f522ae"
        },
        {
          "amount": 250000000000,
          "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb00000000000000000000000000325a99",
          "puzzle_hash": "0x907491ca39c35bc1f9a6eda33f7c0f97a9f583975088dad7216f1edd79f522ae"
        },
        {
          "amount": 1750000000000,
          "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000325a98",
          "puzzle_hash": "0xa801e07ca857c207756ebdae6b2d5b9964766588c170929d2587ba14d5771791"
        },
        {
          "amount": 250000000000,
          "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb00000000000000000000000000325a98",
          "puzzle_hash": "0x9a8990caadda4fe57876ab878134b3fed786ca66ad32e71b34a1ac5ad3aea00a"
        },
        {
          "amount": 1750000000000,
          "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000325a97",
          "puzzle_hash": "0x7faa98823590b2bb8fa8dd654c0e4ce6e9262a3453e50d243ec6c25958a557d9"
        },
        {
          "amount": 250000000000,
          "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb00000000000000000000000000325a97",
          "puzzle_hash": "0xbf74889b9c3a161b4d30e0494fbfe8bdfc410d7ace65af15946795bf84d196b4"
        },
        {
          "amount": 1750000000000,
          "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000325a96",
          "puzzle_hash": "0x4bc6435b409bcbabe53870dae0f03755f6aabb4594c5915ec983acf12a5d1fba"
        },
        {
          "amount": 250000000000,
          "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb00000000000000000000000000325a96",
          "puzzle_hash": "0x4bc6435b409bcbabe53870dae0f03755f6aabb4594c5915ec983acf12a5d1fba"
        },
        {
          "amount": 1750000000000,
          "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000325a95",
          "puzzle_hash": "0x4bc6435b409bcbabe53870dae0f03755f6aabb4594c5915ec983acf12a5d1fba"
        },
        {
          "amount": 250000000000,
          "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb00000000000000000000000000325a95",
          "puzzle_hash": "0x4bc6435b409bcbabe53870dae0f03755f6aabb4594c5915ec983acf12a5d1fba"
        }
      ],
      "reward_infusion_new_challenge": "0xa822a8aa0a6ff3ac799e9ee82c3d03c3c39706ccafbe8a02e30436231078ce74",
      "signage_point_index": 7,
      "sub_epoch_summary_included": null,
      "sub_slot_iters": 147849216,
      "timestamp": 1677343391,
      "total_iters": 13620409797325,
      "weight": 6751173768
    }
  ],
  "success": true
}
```

</details>

---

### `get_block_record_by_height`

Functionality: Retrieves a block record by height

Usage: chia rpc full_node [OPTIONS] get_block_record_by_height [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag   | Type    | Required | Description                                |
| :----- | :------ | :------- | :----------------------------------------- |
| height | INTEGER | True     | The height to get (must be <= peak height) |

:::note

Note that not all blocks will have all fields set here (depending on transaction block, finishing sub epoch, etc).

:::

<details>
<summary>Example</summary>

```json
chia rpc full_node get_block_record_by_height '{"height": 3000000}'
```

Response:

```json
{
  "block_record": {
    "challenge_block_info_hash": "0x8b51a91841d9b962b11a3aad0e186f9258bda32c8a4bb8a8c2a10220652e7310",
    "challenge_vdf_output": {
      "data": "0x0300c819de4b04e4ae20a4c886395045108a5a39db80edbb951f0376dd1eba388748584b5af92625806d2412bbd2e2eb5ceeb5b122e584b9ca8b6067286514c90b07a9e9f64b4ba0bf96478a178651de6cc715eb179f3743de49e4ae7046d188620e0100"
    },
    "deficit": 6,
    "farmer_puzzle_hash": "0x93263bcd4d1c10bb099490eff5ebe0d1f83c96899b93e807424cf7aa17fe1503",
    "fees": 0,
    "finished_challenge_slot_hashes": null,
    "finished_infused_challenge_slot_hashes": null,
    "finished_reward_slot_hashes": null,
    "header_hash": "0x1743f356fc9a811fc8bf6bc9fbf3d2ed973f3c4cef132356d5cce390731e4c63",
    "height": 3000000,
    "infused_challenge_vdf_output": {
      "data": "0x01000d9d6e70b698db981a616929ba57b2110e081c34a87a409ef15832f334dfefe97286433c733781959c17ebb34bee5c3e14199c4a43a88c0a90f8feae2ba7341e0957e34a655959b001c8d31a80e18f42af303a1932dd58e72b7dc9e31b0886220200"
    },
    "overflow": false,
    "pool_puzzle_hash": "0xf72bcbd49b412e84f46d4637220252bd0e3a4564c53ae07f9acf2ae84229ba3e",
    "prev_hash": "0x7022a20bb06dc47248731823e1ad01a8105ef3e01f3a3f20d9cf25ff0df765b0",
    "prev_transaction_block_hash": "0x07a631da0cae81a34c4cf33e40ac394466141ad3aadc1e498c8f641f2713c5c4",
    "prev_transaction_block_height": 2999995,
    "required_iters": 2245369,
    "reward_claims_incorporated": [
      {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a000000000000000000000000002dc6bb",
        "puzzle_hash": "0x7a0790d18588bc84007e7d4a3e53e293fa1c0ca350d2b6a42659b3ae38c4561f"
      },
      {
        "amount": 250050001011,
        "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb000000000000000000000000002dc6bb",
        "puzzle_hash": "0xe3b9adc4eb09d18d83bd56482aee566820f5afdce595b3ed095eb36c5cef9301"
      },
      {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a000000000000000000000000002dc6ba",
        "puzzle_hash": "0x9470b0ba0a8697dc2b702aae1d259e0bdbdf18c7d1be3709e93ae583f078ffd5"
      },
      {
        "amount": 250000000000,
        "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb000000000000000000000000002dc6ba",
        "puzzle_hash": "0x309c0113f358c627e1a9c42069eab159b209ea7f15d2a615a1f65fa368e160bc"
      },
      {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a000000000000000000000000002dc6b9",
        "puzzle_hash": "0xebc07ca111c48d4ccc5c716108e1765cb960055a31312d2604fbe77685b880a1"
      },
      {
        "amount": 250000000000,
        "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb000000000000000000000000002dc6b9",
        "puzzle_hash": "0x185af79d5e58571645103a6e39d5e9399410059c8c279a601054326240cff77e"
      }
    ],
    "reward_infusion_new_challenge": "0xe4c1bf71e8761ca66e3612b6ad3f2f7f08ae325112ede3b7826a56ddeafb7282",
    "signage_point_index": 14,
    "sub_epoch_summary_included": null,
    "sub_slot_iters": 147849216,
    "timestamp": 1671732821,
    "total_iters": 12236354061049,
    "weight": 6173224536
  },
  "success": true
}
```

</details>

---

### `get_block_spends`

Functionality: Retrieves every coin that was spent in a block. Requires the header hash of the block to retrieve

Usage: chia rpc full_node [OPTIONS] get_block_spends [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type       | Required | Description               |
| :---------- | :--------- | :------- | :------------------------ |
| header_hash | HEX STRING | True     | The block's `header_hash` |

:::note

Keep in mind that most blocks do not contain any transactions. These blocks will simply return "[]" for this request.

:::

<details>
<summary>Example</summary>

```json
chia rpc full_node get_block_spends '{"header_hash": "0x65b9e51000d4ab6996b98bf27c1ccd4b0861a5e3b2e8acdb14f45d1680e5e484"}'
```

Response:

```json
{
  "block_spends": [
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0x3a25aa4b8aea2fbc1d2aa6cd3aafe883668035344b8f7f99b19f3ecc8d1a20c8",
        "puzzle_hash": "0x811b4bef78021d2687976861559de784ddbcb57401302e345a7b09f87071453a"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fffff010180ffff01ff02ff36ffff04ff02ffff04ff05ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff0bff80808080ffff04ff2fffff04ff0bffff04ff5fff808080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4602ff3304ffff0101ff02ffff02ffff03ff05ffff01ff02ff5cffff04ff02ffff04ff0dffff04ffff0bff2cffff0bff24ff3880ffff0bff2cffff0bff2cffff0bff24ff3480ff0980ffff0bff2cff0bffff0bff24ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff0bffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ffff02ff2affff04ff02ffff04ffff02ffff03ffff09ff23ff2880ffff0181b3ff8080ff0180ff80808080ff80808080808080ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffffff0bffff0bff17ffff02ff3affff04ff02ffff04ff09ffff04ff2fffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ff5f80ff0bff81bf80ff02ffff03ffff20ffff22ff4fff178080ffff01ff02ff7effff04ff02ffff04ff6fffff04ffff04ffff02ffff03ff4fffff01ff04ff23ffff04ffff02ff3affff04ff02ffff04ff09ffff04ff53ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff81b3ff80808080ffff011380ff0180ffff02ff7cffff04ff02ffff04ff05ffff04ff1bffff04ffff21ff4fff1780ff80808080808080ff8080808080ffff01ff088080ff0180ffff04ffff09ffff18ff05ffff010180ffff010180ffff09ff05ffff01818f8080ff0bff2cffff0bff24ff3080ffff0bff2cffff0bff2cffff0bff24ff3480ff0580ffff0bff2cffff02ff5cffff04ff02ffff04ff07ffff04ffff0bff24ff2480ff8080808080ffff0bff24ff8080808080ffffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff26ffff04ff02ffff04ff09ff80808080ffff02ff26ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ff5effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff3affff04ff02ffff04ff09ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfff80808080808080808080ffff04ffff04ff20ffff04ff17ff808080ffff02ff7cffff04ff02ffff04ff05ffff04ffff02ff82017fffff04ffff04ffff04ff17ff2f80ffff04ffff04ff5fff81bf80ffff04ff0bff05808080ff8202ff8080ffff01ff80808080808080ffff02ff2effff04ff02ffff04ff05ffff04ff0bffff04ffff02ffff03ff3bffff01ff02ff22ffff04ff02ffff04ff05ffff04ff17ffff04ff13ffff04ff2bffff04ff5bffff04ff5fff808080808080808080ffff01ff02ffff03ffff09ff15ffff0bff13ff1dff2b8080ffff01ff0bff15ff17ff5f80ffff01ff088080ff018080ff0180ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfffff04ff82017fff8080808080808080808080ff02ffff03ff05ffff011bffff010b80ff0180ff018080ffff04ffff01ffa024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffa01844ac993a536e7b25c5e33f19ca103f31e62ce2cda83fe440c8bae8fe99338fa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff8202ffffff01ff02ff16ffff04ff02ffff04ff05ffff04ff8204bfffff04ff8206bfffff04ff82017fffff04ffff0bffff19ff2fffff18ffff019100ffffffffffffffffffffffffffffffffff8202ff8080ff0bff82017f80ff8080808080808080ffff01ff04ffff04ff08ffff04ff17ffff04ffff02ff1effff04ff02ffff04ff82017fff80808080ff80808080ffff04ffff04ff1cffff04ff5fffff04ff8206bfff80808080ff80808080ff0180ffff04ffff01ffff32ff3d33ff3effff04ffff04ff1cffff04ff0bffff04ff17ff80808080ffff04ffff04ff1cffff04ff05ffff04ff2fff80808080ffff04ffff04ff0affff04ff5fff808080ffff04ffff04ff14ffff04ffff0bff5fffff012480ff808080ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a00213db9cb540a52c39071ef70acdf81796303189061b5aa0ee8098a05d5ceff5ffff04ffff01a0ab10c34fd041ae68c744c646d447c84fe4e4e8f469d309540a1496077ce0ce95ffff04ffff01b0a16b798de8c9d15d163e96755e85d7be75cafd62683dbc02640f4c505f8c72b16927e94682d81aa962415a6c69e507d0ffff04ffff01a0ccd5bb71183532bff220ba46c268991a00000000000000000000000000000000ffff04ffff01a0d90b161aa036092a9da80c8cf23c4147c825469eab4bc481c7d8d916a328df88ff01808080808080ff01808080",
      "solution": "0xffffa037ad3fd0a81a40c14b182fdf37f27db0dda05261df84fe304f83f507ccc2f515ffa0d05636e1bf40d6077c23fbbecdeac4b7f812af15b08289f57e00bcb0e5770e58ff0180ff01ffff8601977420dc00ff8332c0fc8080"
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032c0fc",
        "puzzle_hash": "0xab10c34fd041ae68c744c646d447c84fe4e4e8f469d309540a1496077ce0ce95"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff82017fffff01ff04ffff04ff38ffff04ffff0bffff02ff2effff04ff02ffff04ff05ffff04ff81bfffff04ffff02ff3effff04ff02ffff04ffff04ff05ffff04ff0bff178080ff80808080ff808080808080ff82017f80ff808080ffff04ffff04ff3cffff01ff248080ffff04ffff04ff28ffff04ff82017fff808080ff80808080ffff01ff04ffff04ff24ffff04ff2fff808080ffff04ffff04ff2cffff04ff5fffff04ff81bfff80808080ffff04ffff04ff10ffff04ff81bfff808080ff8080808080ff0180ffff04ffff01ffffff49ff463fffff5002ff333cffff04ff0101ffff02ff02ffff03ff05ffff01ff02ff36ffff04ff02ffff04ff0dffff04ffff0bff26ffff0bff2aff1280ffff0bff26ffff0bff26ffff0bff2aff3a80ff0980ffff0bff26ff0bffff0bff2aff8080808080ff8080808080ffff010b80ff0180ffff0bff26ffff0bff2aff3480ffff0bff26ffff0bff26ffff0bff2aff3a80ff0580ffff0bff26ffff02ff36ffff04ff02ffff04ff07ffff04ffff0bff2aff2a80ff8080808080ffff0bff2aff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffff04ffff01a01844ac993a536e7b25c5e33f19ca103f31e62ce2cda83fe440c8bae8fe99338fffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0183093a80ffff04ffff01a064dfc086d72c4e27434c86cc7af122e25abf79e34374f7e6fb4ffb2f71300b7dff01808080808080",
      "solution": "0xffa0d05636e1bf40d6077c23fbbecdeac4b7f812af15b08289f57e00bcb0e5770e58ffa0b3d21c178fd29260ae0e765aaebf4b59018e9dcf394af9e32e3ba0b445f312d480"
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xc66f0bee6f69be66022f4b7c14df156402e8b567a518f0cf6a3b60c30002d14e",
        "puzzle_hash": "0x0213db9cb540a52c39071ef70acdf81796303189061b5aa0ee8098a05d5ceff5"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b083a7441862bed949ce9fd14d41e46c49357108a573eb71b98d8a504d1b8966404d5e61cec63ecbd35e1ebec05820e434ff018080",
      "solution": "0xff80ffff01ffff33ffa057e5ca9b295c025134c9da49070d439973be2184a6226931f110e18ce703062dff8601977388458080ffff34ff84009896808080ff8080"
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0x5a3f2718fb6778fdd80836bebfce25f2ea7dc50d184a106f29c307166126c059",
        "puzzle_hash": "0xed6e015250481a9046d489fd8954bc77b8c828c33679c5e3c50e7c4dcf7481ac"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa05a3f2718fb6778fdd80836bebfce25f2ea7dc50d184a106f29c307166126c059a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc06268747470733a2f2f697066732e696f2f697066732f516d6565315050316b6873613963684468505844593457665a3334616a3862365a46453958444772444b676d61343f66696c656e616d653d5865727865735f476f6c64656e5f4b65792e706e6780ffff68a02ff71fc0a98df4f2b4eee5d188c5a1c5fd65edf38f0891116e711efea9e933c4ffff826d75ffc06068747470733a2f2f697066732e696f2f697066732f516d61573273504e7955616775474b6e344876623654316e4a694142433733764677374b715675656661684671793f66696c656e616d653d4b6579735f6f665f5865727865732e6a736f6e80ffff826c75ffc07d68747470733a2f2f697066732e696f2f697066732f516d515855553333326b7762633831717a7234434b597170505541774c36526a52567059355164746732427854503f66696c656e616d653d7468652d6d696e74616e6769626c652d636f6c6c65637469626c652d6e66742d6c6963656e73652d76312e302e70646680ffff82736e820259ffff827374820456ffff826d68a06f33625874a1f75f8e51869e9822d6dd0dc0f8395d4c0d6dc23de2a4a3b99295ffff826c68a0a75f52a7e705273993286b22c6e4f5b7b49f427ea588c36189f32b51d743924f80ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff0180ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa05a3f2718fb6778fdd80836bebfce25f2ea7dc50d184a106f29c307166126c059a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a09acd380a9dfc2bf20558dffb34eab7e51fb9d98391bf8510d56bde893dbbb591ffff04ffff018202eeff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0839fd70445d6e34f508b42d85f69bf9da7bed3573f49b6992cb0237b91a3b295e5266dfec8dcd4d6f4727a2dab926e2cff018080ff018080808080ff018080808080ff01808080",
      "solution": "0xffffa0ba65e7e5a65dbb7184c4b0b4a2e26393339ee1721f89c39974dabdf280f4b6a0ff0180ff01ffffffff80ffff01ffff81f6ffa0146d96a4267dc05f52f01233f1301633597607bc0b0e57aadfb780bb8bfb6360ff80ffa0299988a298a51ab241932fd15c265746c6f1b4d0e12c56a586ab639ef96b609f80ffff33ffa0df762fdcd192d4298d1684e2521380eb0fde2cc24cf006ebec2784698a0e3438ff01ffffa0df762fdcd192d4298d1684e2521380eb0fde2cc24cf006ebec2784698a0e3438ffa0df762fdcd192d4298d1684e2521380eb0fde2cc24cf006ebec2784698a0e3438808080ff8080808080"
    },
    {
      "coin": {
        "amount": 736359553,
        "parent_coin_info": "0x1362e5089fb72e8e9800c0849a2558e4e27653b307be340586c7668f237ecf67",
        "puzzle_hash": "0x4d9b3001eac5106eebe381bae27876bca53bdd9bb025ad76ccb7a79b178d8527"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b08f46dcac5866bef229e326545fa95ce1250fb2b7ff51753e5eee168ada32600c5fa08117f4c7aab3cdc68e55268b536eff018080",
      "solution": "0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa08a3ee8a747703263bb91591abf58929302f0001ae9858734c4cbbfde90ddc2c5ff842bdc536080ffff34ff8307a12080ffff3cffa0b92651fd8cc193716fa1ae7beab6410d696bdbcc0445ad058886c235d9ca3d2280ffff3dffa0592514a6732e2b17fa5acae0b4726ceb3bc8af171af5526835a6ed4a4b7d3f378080ff8080"
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0xba65e7e5a65dbb7184c4b0b4a2e26393339ee1721f89c39974dabdf280f4b6a0",
        "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
      },
      "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080",
      "solution": "0xffa0ed6e015250481a9046d489fd8954bc77b8c828c33679c5e3c50e7c4dcf7481acff01ff8080"
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0x2356a252436f90c0a2c4fabbcf37126495ffe3672227d0b1748221a791fe71b3",
        "puzzle_hash": "0x2b37174f406c23b336cb57d76fafa3e51d6f76c80ee9df06238d74abe6434cbe"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0146d96a4267dc05f52f01233f1301633597607bc0b0e57aadfb780bb8bfb6360a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a9194a2d13a4214667dd02086d583975802b22c060fbaf7b1bea846011fe83f81c3c4ddb9c7c136fddcac09db6c456f8ff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0146d96a4267dc05f52f01233f1301633597607bc0b0e57aadfb780bb8bfb6360a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
      "solution": "0xffffa0d8f4e74fd7f0e2d4eef0a26a72de1b063178389ad3c8377810eac026b8f0fc38ffa0299988a298a51ab241932fd15c265746c6f1b4d0e12c56a586ab639ef96b609fff0180ff01ffff01ffff80ffff01ffff33ffa0299988a298a51ab241932fd15c265746c6f1b4d0e12c56a586ab639ef96b609fff01ffffa0676b280871ebb40f4d9ee33783bd968946235fd390a28af8409f46e01be69e828080ffff3effa05a3f2718fb6778fdd80836bebfce25f2ea7dc50d184a106f29c307166126c0598080ff80808080"
    },
    {
      "coin": {
        "amount": 530000000000,
        "parent_coin_info": "0x27099a1eba1b37ac909f338c3881785bedad68ed4fce9ff5ba9cc6f20e4da742",
        "puzzle_hash": "0xd168a5d3c814b34c971c547e0339c9efda043c8a405ee0fa548437bcc582a58f"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b3b8c18b445aff2202778a01447257b7a953d25cdf226b7288afdff16cc83060dee754a245561e9427d3e3f6af129c55ff018080",
      "solution": "0xff80ffff01ffff33ffa0c8bff349573c36f246e9d0ff575ed83d08eb62a2adc92171fd2710dae9ce3c1eff8604d146ee054080ffff33ffa0286e4f74c6649320b023a62b53bb9e4915fe32e0d3c83cd7401d2b727e85c41aff8500b9b002b68080ff8080"
    },
    {
      "coin": {
        "amount": 530000000000,
        "parent_coin_info": "0x7c57d5a47f0e246946e95c7a198e0a1c6184ee954cbfe278d6a841ed8f900825",
        "puzzle_hash": "0x3e1fc8eae031f8f2ebda38a6ac482f82ea0562b1896cd03ce102087ab9cf1782"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0926f188463c96e14a8be0e437045b6949bd373076b0c33ff37cd304ed63663fe0d8b3103cd4b13bd9ec7cbb666dcf55cff018080",
      "solution": "0xff80ffff0180ff8080"
    },
    {
      "coin": {
        "amount": 530000000000,
        "parent_coin_info": "0xa127de80737f00575f178614cab953c9377a8a3bd3a40d9ae605eb5590b83b6d",
        "puzzle_hash": "0x2c7514437b10ad5fdb046d41758954d997bdaf1f28da1fc25b4da7352ac4ddfe"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b8222ed2751c84e7c472524fb8f89ba690348344834c41b827036ebb23a35e43eb6edf6975cbbf3927e4c9ce27dfae0cff018080",
      "solution": "0xff80ffff0180ff8080"
    },
    {
      "coin": {
        "amount": 530000000000,
        "parent_coin_info": "0x417eabbf596107320ae00731cfe799303527d7fcff0c2ba16dde6aae3ac1f17d",
        "puzzle_hash": "0x2c7514437b10ad5fdb046d41758954d997bdaf1f28da1fc25b4da7352ac4ddfe"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b8222ed2751c84e7c472524fb8f89ba690348344834c41b827036ebb23a35e43eb6edf6975cbbf3927e4c9ce27dfae0cff018080",
      "solution": "0xff80ffff0180ff8080"
    },
    {
      "coin": {
        "amount": 530000000000,
        "parent_coin_info": "0x23cc0996b7dfaadc0db67f79945549c70524b2f68a5ca3a4b547d1db64150fa0",
        "puzzle_hash": "0xcf987ed9d5f5307f3bde498aee37c6380464a07668c0c65b5ce532f16627555f"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b09374544599c7509966e0244fd162e04d8c8575a301dd8cca471fb67c6d044a2054f833eb6d77e39e1a8c30651cc06babff018080",
      "solution": "0xff80ffff0180ff8080"
    },
    {
      "coin": {
        "amount": 530000000000,
        "parent_coin_info": "0x8a3e984e42acbac49fb1d13db3a3299bbb67a81b3e2a17b65415ebfc4775be75",
        "puzzle_hash": "0x4e341cfc3819196420dcab03bbe3f38c3db9c2793db9c4071edc792fd2e828f6"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a9ae8537359d306702ab17e6a1e9bd2015f7f7a5170a167eb9dd7cbef272881364d5fbb8e3266a7ff8c287fc45b13624ff018080",
      "solution": "0xff80ffff0180ff8080"
    },
    {
      "coin": {
        "amount": 530000000000,
        "parent_coin_info": "0x7032877041d3c56f7c2c3e2173c08303ecb747bc2891c3701e664f33cd3e211c",
        "puzzle_hash": "0x4e341cfc3819196420dcab03bbe3f38c3db9c2793db9c4071edc792fd2e828f6"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a9ae8537359d306702ab17e6a1e9bd2015f7f7a5170a167eb9dd7cbef272881364d5fbb8e3266a7ff8c287fc45b13624ff018080",
      "solution": "0xff80ffff0180ff8080"
    },
    {
      "coin": {
        "amount": 530000000000,
        "parent_coin_info": "0x14be86b0087a21d09862e829ec266d5d5e82bd0e7981831f44fe986fa57caa72",
        "puzzle_hash": "0x4e341cfc3819196420dcab03bbe3f38c3db9c2793db9c4071edc792fd2e828f6"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a9ae8537359d306702ab17e6a1e9bd2015f7f7a5170a167eb9dd7cbef272881364d5fbb8e3266a7ff8c287fc45b13624ff018080",
      "solution": "0xff80ffff0180ff8080"
    },
    {
      "coin": {
        "amount": 530000000000,
        "parent_coin_info": "0x8a3e984e42acbac49fb1d13db3a3299bbb67a81b3e2a17b65415ebfc4775be75",
        "puzzle_hash": "0xbca855e6d2d32f89fa78f29f4c5e5cf7133624086f08584efbb2414c25584e5e"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a37e5d7f5a72b5faaa3d0591ff68119372dde5faddfa4b7168e1bee0cbfbc0ddd713059690e93b690c98f958f3d4986aff018080",
      "solution": "0xff80ffff0180ff8080"
    },
    {
      "coin": {
        "amount": 530000000000,
        "parent_coin_info": "0x7032877041d3c56f7c2c3e2173c08303ecb747bc2891c3701e664f33cd3e211c",
        "puzzle_hash": "0xbca855e6d2d32f89fa78f29f4c5e5cf7133624086f08584efbb2414c25584e5e"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a37e5d7f5a72b5faaa3d0591ff68119372dde5faddfa4b7168e1bee0cbfbc0ddd713059690e93b690c98f958f3d4986aff018080",
      "solution": "0xff80ffff0180ff8080"
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0x22508d0a2e0f5d44b4d32f9c824af306455721de200828e9b4d2ba8df5d9da8f",
        "puzzle_hash": "0x118ca4603ed3846ab159c52c8fedada2a9471f207079349b5843aff032865844"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fffff010180ffff01ff02ff36ffff04ff02ffff04ff05ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff0bff80808080ffff04ff2fffff04ff0bffff04ff5fff808080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4602ff3304ffff0101ff02ffff02ffff03ff05ffff01ff02ff5cffff04ff02ffff04ff0dffff04ffff0bff2cffff0bff24ff3880ffff0bff2cffff0bff2cffff0bff24ff3480ff0980ffff0bff2cff0bffff0bff24ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff0bffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ffff02ff2affff04ff02ffff04ffff02ffff03ffff09ff23ff2880ffff0181b3ff8080ff0180ff80808080ff80808080808080ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffffff0bffff0bff17ffff02ff3affff04ff02ffff04ff09ffff04ff2fffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ff5f80ff0bff81bf80ff02ffff03ffff20ffff22ff4fff178080ffff01ff02ff7effff04ff02ffff04ff6fffff04ffff04ffff02ffff03ff4fffff01ff04ff23ffff04ffff02ff3affff04ff02ffff04ff09ffff04ff53ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff81b3ff80808080ffff011380ff0180ffff02ff7cffff04ff02ffff04ff05ffff04ff1bffff04ffff21ff4fff1780ff80808080808080ff8080808080ffff01ff088080ff0180ffff04ffff09ffff18ff05ffff010180ffff010180ffff09ff05ffff01818f8080ff0bff2cffff0bff24ff3080ffff0bff2cffff0bff2cffff0bff24ff3480ff0580ffff0bff2cffff02ff5cffff04ff02ffff04ff07ffff04ffff0bff24ff2480ff8080808080ffff0bff24ff8080808080ffffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff26ffff04ff02ffff04ff09ff80808080ffff02ff26ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ff5effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff3affff04ff02ffff04ff09ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfff80808080808080808080ffff04ffff04ff20ffff04ff17ff808080ffff02ff7cffff04ff02ffff04ff05ffff04ffff02ff82017fffff04ffff04ffff04ff17ff2f80ffff04ffff04ff5fff81bf80ffff04ff0bff05808080ff8202ff8080ffff01ff80808080808080ffff02ff2effff04ff02ffff04ff05ffff04ff0bffff04ffff02ffff03ff3bffff01ff02ff22ffff04ff02ffff04ff05ffff04ff17ffff04ff13ffff04ff2bffff04ff5bffff04ff5fff808080808080808080ffff01ff02ffff03ffff09ff15ffff0bff13ff1dff2b8080ffff01ff0bff15ff17ff5f80ffff01ff088080ff018080ff0180ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfffff04ff82017fff8080808080808080808080ff02ffff03ff05ffff011bffff010b80ff0180ff018080ffff04ffff01ffa024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffa062f683c01a2933cfed83a5920dac2c4038880ccaa4fc1a32464db9e84e83bbb1a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff8202ffffff01ff02ff16ffff04ff02ffff04ff05ffff04ff8204bfffff04ff8206bfffff04ff82017fffff04ffff0bffff19ff2fffff18ffff019100ffffffffffffffffffffffffffffffffff8202ff8080ff0bff82017f80ff8080808080808080ffff01ff04ffff04ff08ffff04ff17ffff04ffff02ff1effff04ff02ffff04ff82017fff80808080ff80808080ffff04ffff04ff1cffff04ff5fffff04ff8206bfff80808080ff80808080ff0180ffff04ffff01ffff32ff3d33ff3effff04ffff04ff1cffff04ff0bffff04ff17ff80808080ffff04ffff04ff1cffff04ff05ffff04ff2fff80808080ffff04ffff04ff0affff04ff5fff808080ffff04ffff04ff14ffff04ffff0bff5fffff012480ff808080ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a02f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57ffff04ffff01a02b228f0ffc5ec6c6736e946f128e9c2fbd71899c99253acedaaee330aa2719e6ffff04ffff01b085b6ca7ad8fe553ea4db4ee5426f84ddb0bfe2a50ba48445011cab09d6962188a74d7bf3aeadb9fa3bfa54c7a91b2550ffff04ffff01a0ccd5bb71183532bff220ba46c268991a00000000000000000000000000000000ffff04ffff01a0f094569dc7791a67f10f20b259366aed386159f01342bff918b87be1652e7665ff01808080808080ff01808080",
      "solution": "0xffffa0885881cb60698d7b37b907aae29b7e5a992df0e58ce51266c3c75a05fa74c233ffa0aad9366d43fa15566bd53e6a2ed1bd35b8a2c67fbb7056e4490935c9358e0a2eff0180ff01ffff8601977420dc00ff8332c0e78080"
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032c0e7",
        "puzzle_hash": "0x2b228f0ffc5ec6c6736e946f128e9c2fbd71899c99253acedaaee330aa2719e6"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff82017fffff01ff04ffff04ff38ffff04ffff0bffff02ff2effff04ff02ffff04ff05ffff04ff81bfffff04ffff02ff3effff04ff02ffff04ffff04ff05ffff04ff0bff178080ff80808080ff808080808080ff82017f80ff808080ffff04ffff04ff3cffff01ff248080ffff04ffff04ff28ffff04ff82017fff808080ff80808080ffff01ff04ffff04ff24ffff04ff2fff808080ffff04ffff04ff2cffff04ff5fffff04ff81bfff80808080ffff04ffff04ff10ffff04ff81bfff808080ff8080808080ff0180ffff04ffff01ffffff49ff463fffff5002ff333cffff04ff0101ffff02ff02ffff03ff05ffff01ff02ff36ffff04ff02ffff04ff0dffff04ffff0bff26ffff0bff2aff1280ffff0bff26ffff0bff26ffff0bff2aff3a80ff0980ffff0bff26ff0bffff0bff2aff8080808080ff8080808080ffff010b80ff0180ffff0bff26ffff0bff2aff3480ffff0bff26ffff0bff26ffff0bff2aff3a80ff0580ffff0bff26ffff02ff36ffff04ff02ffff04ff07ffff04ffff0bff2aff2a80ff8080808080ffff0bff2aff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffff04ffff01a062f683c01a2933cfed83a5920dac2c4038880ccaa4fc1a32464db9e84e83bbb1ffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0183093a80ffff04ffff01a0627d8b6f20070616d768cd0e255630aa4e9fae53cb9fa2039a02e44a4d65ded1ff01808080808080",
      "solution": "0xffa0aad9366d43fa15566bd53e6a2ed1bd35b8a2c67fbb7056e4490935c9358e0a2effa01252d6301b1373ab1bc84d32771e61730ee9cecf5d78aef1ba0257b34823d8cc80"
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0xcfdb607cf0981b21a830f53085051e7f7e7d29ed3626aa31c66e2b8d662a92e8",
        "puzzle_hash": "0xb7809f2891ee38d4674cf547e701a15aebe285ad4526f13abd152777f0363c9b"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fffff010180ffff01ff02ff36ffff04ff02ffff04ff05ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff0bff80808080ffff04ff2fffff04ff0bffff04ff5fff808080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4602ff3304ffff0101ff02ffff02ffff03ff05ffff01ff02ff5cffff04ff02ffff04ff0dffff04ffff0bff2cffff0bff24ff3880ffff0bff2cffff0bff2cffff0bff24ff3480ff0980ffff0bff2cff0bffff0bff24ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff0bffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ffff02ff2affff04ff02ffff04ffff02ffff03ffff09ff23ff2880ffff0181b3ff8080ff0180ff80808080ff80808080808080ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffffff0bffff0bff17ffff02ff3affff04ff02ffff04ff09ffff04ff2fffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ff5f80ff0bff81bf80ff02ffff03ffff20ffff22ff4fff178080ffff01ff02ff7effff04ff02ffff04ff6fffff04ffff04ffff02ffff03ff4fffff01ff04ff23ffff04ffff02ff3affff04ff02ffff04ff09ffff04ff53ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff81b3ff80808080ffff011380ff0180ffff02ff7cffff04ff02ffff04ff05ffff04ff1bffff04ffff21ff4fff1780ff80808080808080ff8080808080ffff01ff088080ff0180ffff04ffff09ffff18ff05ffff010180ffff010180ffff09ff05ffff01818f8080ff0bff2cffff0bff24ff3080ffff0bff2cffff0bff2cffff0bff24ff3480ff0580ffff0bff2cffff02ff5cffff04ff02ffff04ff07ffff04ffff0bff24ff2480ff8080808080ffff0bff24ff8080808080ffffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff26ffff04ff02ffff04ff09ff80808080ffff02ff26ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ff5effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff3affff04ff02ffff04ff09ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfff80808080808080808080ffff04ffff04ff20ffff04ff17ff808080ffff02ff7cffff04ff02ffff04ff05ffff04ffff02ff82017fffff04ffff04ffff04ff17ff2f80ffff04ffff04ff5fff81bf80ffff04ff0bff05808080ff8202ff8080ffff01ff80808080808080ffff02ff2effff04ff02ffff04ff05ffff04ff0bffff04ffff02ffff03ff3bffff01ff02ff22ffff04ff02ffff04ff05ffff04ff17ffff04ff13ffff04ff2bffff04ff5bffff04ff5fff808080808080808080ffff01ff02ffff03ffff09ff15ffff0bff13ff1dff2b8080ffff01ff0bff15ff17ff5f80ffff01ff088080ff018080ff0180ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfffff04ff82017fff8080808080808080808080ff02ffff03ff05ffff011bffff010b80ff0180ff018080ffff04ffff01ffa024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffa0fbe278647d77cfa9cc367dc46a0a2230ecb74881751b7352e8b1555f6b65119aa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff8202ffffff01ff02ff16ffff04ff02ffff04ff05ffff04ff8204bfffff04ff8206bfffff04ff82017fffff04ffff0bffff19ff2fffff18ffff019100ffffffffffffffffffffffffffffffffff8202ff8080ff0bff82017f80ff8080808080808080ffff01ff04ffff04ff08ffff04ff17ffff04ffff02ff1effff04ff02ffff04ff82017fff80808080ff80808080ffff04ffff04ff1cffff04ff5fffff04ff8206bfff80808080ff80808080ff0180ffff04ffff01ffff32ff3d33ff3effff04ffff04ff1cffff04ff0bffff04ff17ff80808080ffff04ffff04ff1cffff04ff05ffff04ff2fff80808080ffff04ffff04ff0affff04ff5fff808080ffff04ffff04ff14ffff04ffff0bff5fffff012480ff808080ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a00d82c2e32037b77da9c8fdd5d1d4fa4b8cfa08026d2c04834906b741fdcb6fe2ffff04ffff01a0de1cebdefa5507814b23d1b7f8cf41e30c0208e2e0c0b6d968b44671bd663323ffff04ffff01b0b746642357c8bbb292232257939c014264375de69527b0010b66c2e491eac1bbbc50492ab098fa32085d679cb0712ccdffff04ffff01a0ccd5bb71183532bff220ba46c268991a00000000000000000000000000000000ffff04ffff01a01b1ae4195e0c19c8f10ecf4f10cad340d76111e2bcdb50a6724daf9b5e14b9b5ff01808080808080ff01808080",
      "solution": "0xffffa0bedcd555f85af67268598c0e4bc381bd3e9c89798ee6537de1c8d9814ca470f1ffa0c93ede910a929b8c811bbb935f410e64a0bd48f0cd45af4bb3bc7e84b0e79c38ff0180ff01ffff8601977420dc00ff8332c0f18080"
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032c0f1",
        "puzzle_hash": "0xde1cebdefa5507814b23d1b7f8cf41e30c0208e2e0c0b6d968b44671bd663323"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff82017fffff01ff04ffff04ff38ffff04ffff0bffff02ff2effff04ff02ffff04ff05ffff04ff81bfffff04ffff02ff3effff04ff02ffff04ffff04ff05ffff04ff0bff178080ff80808080ff808080808080ff82017f80ff808080ffff04ffff04ff3cffff01ff248080ffff04ffff04ff28ffff04ff82017fff808080ff80808080ffff01ff04ffff04ff24ffff04ff2fff808080ffff04ffff04ff2cffff04ff5fffff04ff81bfff80808080ffff04ffff04ff10ffff04ff81bfff808080ff8080808080ff0180ffff04ffff01ffffff49ff463fffff5002ff333cffff04ff0101ffff02ff02ffff03ff05ffff01ff02ff36ffff04ff02ffff04ff0dffff04ffff0bff26ffff0bff2aff1280ffff0bff26ffff0bff26ffff0bff2aff3a80ff0980ffff0bff26ff0bffff0bff2aff8080808080ff8080808080ffff010b80ff0180ffff0bff26ffff0bff2aff3480ffff0bff26ffff0bff26ffff0bff2aff3a80ff0580ffff0bff26ffff02ff36ffff04ff02ffff04ff07ffff04ffff0bff2aff2a80ff8080808080ffff0bff2aff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffff04ffff01a0fbe278647d77cfa9cc367dc46a0a2230ecb74881751b7352e8b1555f6b65119affff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0183093a80ffff04ffff01a03432b8b1e4d282309e5afb9f7a3237fd4c6f03bce0e676ad212597fc7eb0ca63ff01808080808080",
      "solution": "0xffa0c93ede910a929b8c811bbb935f410e64a0bd48f0cd45af4bb3bc7e84b0e79c38ffa07f0d9ab105582020c410f70071e1f9dea3a1ea4d3b9e57d6a74f431e195be59c80"
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0xd7abe18a1cbbfd51f760d951704eff11c3e8dbad92f021dcbfa2846d1a3a0f8e",
        "puzzle_hash": "0xff2c7da1e4bc136e529c0769907695f57059b78e9e51ba9a69f5d83b1de3a656"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fffff010180ffff01ff02ff36ffff04ff02ffff04ff05ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff0bff80808080ffff04ff2fffff04ff0bffff04ff5fff808080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4602ff3304ffff0101ff02ffff02ffff03ff05ffff01ff02ff5cffff04ff02ffff04ff0dffff04ffff0bff2cffff0bff24ff3880ffff0bff2cffff0bff2cffff0bff24ff3480ff0980ffff0bff2cff0bffff0bff24ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff0bffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ffff02ff2affff04ff02ffff04ffff02ffff03ffff09ff23ff2880ffff0181b3ff8080ff0180ff80808080ff80808080808080ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffffff0bffff0bff17ffff02ff3affff04ff02ffff04ff09ffff04ff2fffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ff5f80ff0bff81bf80ff02ffff03ffff20ffff22ff4fff178080ffff01ff02ff7effff04ff02ffff04ff6fffff04ffff04ffff02ffff03ff4fffff01ff04ff23ffff04ffff02ff3affff04ff02ffff04ff09ffff04ff53ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff81b3ff80808080ffff011380ff0180ffff02ff7cffff04ff02ffff04ff05ffff04ff1bffff04ffff21ff4fff1780ff80808080808080ff8080808080ffff01ff088080ff0180ffff04ffff09ffff18ff05ffff010180ffff010180ffff09ff05ffff01818f8080ff0bff2cffff0bff24ff3080ffff0bff2cffff0bff2cffff0bff24ff3480ff0580ffff0bff2cffff02ff5cffff04ff02ffff04ff07ffff04ffff0bff24ff2480ff8080808080ffff0bff24ff8080808080ffffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff26ffff04ff02ffff04ff09ff80808080ffff02ff26ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ff5effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff3affff04ff02ffff04ff09ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfff80808080808080808080ffff04ffff04ff20ffff04ff17ff808080ffff02ff7cffff04ff02ffff04ff05ffff04ffff02ff82017fffff04ffff04ffff04ff17ff2f80ffff04ffff04ff5fff81bf80ffff04ff0bff05808080ff8202ff8080ffff01ff80808080808080ffff02ff2effff04ff02ffff04ff05ffff04ff0bffff04ffff02ffff03ff3bffff01ff02ff22ffff04ff02ffff04ff05ffff04ff17ffff04ff13ffff04ff2bffff04ff5bffff04ff5fff808080808080808080ffff01ff02ffff03ffff09ff15ffff0bff13ff1dff2b8080ffff01ff0bff15ff17ff5f80ffff01ff088080ff018080ff0180ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfffff04ff82017fff8080808080808080808080ff02ffff03ff05ffff011bffff010b80ff0180ff018080ffff04ffff01ffa024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffa0a1485b353675381d6d93f428e64059f26a3911aefab09c3c2ea4af46da313f7ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff8202ffffff01ff02ff16ffff04ff02ffff04ff05ffff04ff8204bfffff04ff8206bfffff04ff82017fffff04ffff0bffff19ff2fffff18ffff019100ffffffffffffffffffffffffffffffffff8202ff8080ff0bff82017f80ff8080808080808080ffff01ff04ffff04ff08ffff04ff17ffff04ffff02ff1effff04ff02ffff04ff82017fff80808080ff80808080ffff04ffff04ff1cffff04ff5fffff04ff8206bfff80808080ff80808080ff0180ffff04ffff01ffff32ff3d33ff3effff04ffff04ff1cffff04ff0bffff04ff17ff80808080ffff04ffff04ff1cffff04ff05ffff04ff2fff80808080ffff04ffff04ff0affff04ff5fff808080ffff04ffff04ff14ffff04ffff0bff5fffff012480ff808080ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a02f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57ffff04ffff01a031e7f94e0d8ef2d7b34d04b164f78d423d5df9584e00c83e1357ba73a80d047affff04ffff01b08099178acf697d93edc498d34818a75bcaa9bafa4244a5e7930665d0476dad110541c6e8de416cf3c351bc55974300c7ffff04ffff01a0ccd5bb71183532bff220ba46c268991a00000000000000000000000000000000ffff04ffff01a0368f757ddde5ecd7411426178a2d5ce0e469a6cf2184854643f526d2e1b53c81ff01808080808080ff01808080",
      "solution": "0xffffa0b3ad0be083e43f539d27152ab79c35f8515072960854883a1619c838346e7869ffa0afab0e5a027d7becdf94677d55f9f3812e959c6b484132edb67a12f1cb70d82fff0180ff01ffff8601977420dc00ff8332c0ed8080"
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032c0ed",
        "puzzle_hash": "0x31e7f94e0d8ef2d7b34d04b164f78d423d5df9584e00c83e1357ba73a80d047a"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff82017fffff01ff04ffff04ff38ffff04ffff0bffff02ff2effff04ff02ffff04ff05ffff04ff81bfffff04ffff02ff3effff04ff02ffff04ffff04ff05ffff04ff0bff178080ff80808080ff808080808080ff82017f80ff808080ffff04ffff04ff3cffff01ff248080ffff04ffff04ff28ffff04ff82017fff808080ff80808080ffff01ff04ffff04ff24ffff04ff2fff808080ffff04ffff04ff2cffff04ff5fffff04ff81bfff80808080ffff04ffff04ff10ffff04ff81bfff808080ff8080808080ff0180ffff04ffff01ffffff49ff463fffff5002ff333cffff04ff0101ffff02ff02ffff03ff05ffff01ff02ff36ffff04ff02ffff04ff0dffff04ffff0bff26ffff0bff2aff1280ffff0bff26ffff0bff26ffff0bff2aff3a80ff0980ffff0bff26ff0bffff0bff2aff8080808080ff8080808080ffff010b80ff0180ffff0bff26ffff0bff2aff3480ffff0bff26ffff0bff26ffff0bff2aff3a80ff0580ffff0bff26ffff02ff36ffff04ff02ffff04ff07ffff04ffff0bff2aff2a80ff8080808080ffff0bff2aff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffff04ffff01a0a1485b353675381d6d93f428e64059f26a3911aefab09c3c2ea4af46da313f7bffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0183093a80ffff04ffff01a074556bdb1f184e19ed982fae921fea02e3b226110124cc87679b656138ec2c04ff01808080808080",
      "solution": "0xffa0afab0e5a027d7becdf94677d55f9f3812e959c6b484132edb67a12f1cb70d82fffa05cbe698351c3f79dd2a4223f5eaa504b4fe3edc42daa66ad6f69f96a6aca18c380"
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0x89a74d1871bf2fc9907c170acbb39a2dedc30824aeac6867c308f94525d4489d",
        "puzzle_hash": "0x0f9f68dde7cd18b272dbde1e23775015bc8dfc17689c0fb9fb88278b6355370b"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa089a74d1871bf2fc9907c170acbb39a2dedc30824aeac6867c308f94525d4489da0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffbf68747470733a2f2f617277656176652e6e65742f386d54673054795f565f687746774665617966553050794a70347955317976785a692d434e79525244464180ffff68a04da81f1a20b2cabb8fbf029b756696f9390fa2af0c92ec34056264714a9fdf37ffff826d75ffbf68747470733a2f2f617277656176652e6e65742f556b566d7956676e4c446a6742576d68644a5251685f68466a77644e415a6d384b53484a6545417141584d80ffff826c75ffc07468747470733a2f2f6d6d6d6a62673766746964756d6c6d6f75376c72696f61706a72717a6765346f6f6e707268367765746d6d6d66366b62773661612e617277656176652e6e65742f597869516d2d5761423059746a71665846446750544747544534357a58785036784a735977766c4274344180ffff82736e8202b2ffff8273748209c4ffff826d68a01c581c3127f859403144ad5f271806887d0b75796c8478746b55c334560e1fc8ffff826c68a043e7c5cd72853a98f72dcb9838c51509f8597fcbd6c74b2076ea4c210ad048c480ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff0180ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa089a74d1871bf2fc9907c170acbb39a2dedc30824aeac6867c308f94525d4489da0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0e7b87f3329566a7908ba0ee05c239d36d23873748bd6f4e0edcecc39e3739673ffff04ffff018201f4ff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b097d6a5db03eb8d9dece0939dc0ae9b312360bf6273a81ba5611e267dbe864dcddda92406947a9a58f26de0a312462aa3ff018080ff018080808080ff018080808080ff01808080",
      "solution": "0xffffa04e548b94ce1a5a03900025b0c0ba915327607194c5f02689e1b5baf26736382cff0180ff01ffffffff80ffff01ffff81f6ffa0cf538b65db3f9f3328c7ed8fcb26c20ea2dd5add8afb9a6dc1743cff25fd47aaff80ffa0205085d611625959317626897c3dc89886be861cbf2ddecf96a45c3065122a8980ffff33ffa03e114674137c86598efd70f7331be77f9f5dfb18e7bf87b2c00ec8998864631eff01ffffa03e114674137c86598efd70f7331be77f9f5dfb18e7bf87b2c00ec8998864631effa03e114674137c86598efd70f7331be77f9f5dfb18e7bf87b2c00ec8998864631e808080ff8080808080"
    },
    {
      "coin": {
        "amount": 49929998270,
        "parent_coin_info": "0x34b72f2aebb3412d1be0a50e55ab040fd8b126c83959bf84d3bd88a3ae444781",
        "puzzle_hash": "0x3e7ecd234c2ed62d682056a3c13699fe93cb1dd9bbce0f4abecd82d8a68ffcec"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a44fe7053b7c7519244c7aa24a326e5f3c964acd78f05ce34329d9688bb260a3251f8a03af4324c1298b704895187cabff018080",
      "solution": "0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa04a9c733fbec061516bb7ed319fd8b6251a140a8f479fe55d6f9ae3966d0f358cff850ba00f4fbd80ffff3cffa005fee4d0c4ddae51b9b2fdef19c6c921f0a65e77e12de2568fe93f06fe7a60c680ffff3dffa07943ebee6bca34a6edbe6d2a2f9f76a385c9c9659c956383d2dcc4ea4ed6c8588080ff8080"
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0x4e548b94ce1a5a03900025b0c0ba915327607194c5f02689e1b5baf26736382c",
        "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
      },
      "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080",
      "solution": "0xffa00f9f68dde7cd18b272dbde1e23775015bc8dfc17689c0fb9fb88278b6355370bff01ff8080"
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0x95b6edec33f1a5e3893ed570b2d4a1a0902712717c2099b4cf932c30d3a7cd91",
        "puzzle_hash": "0x220b19d08f3287c21e3889c405462e9c69a8ed6ced9f50b8474dda23f80915a0"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0cf538b65db3f9f3328c7ed8fcb26c20ea2dd5add8afb9a6dc1743cff25fd47aaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b7ed20bb8cb75771b3dc5a01f801fd30c4c2e21a154f2404c7de040587bb79b0ecc2ae409528b7ef628379c7bce1a7c0ff018080ffff04ffff01a0fdc1c6f0833932c99e513cedb175e46012431bcdc8f61146ca151de18255729fffff04ffff0101ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0cf538b65db3f9f3328c7ed8fcb26c20ea2dd5add8afb9a6dc1743cff25fd47aaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
      "solution": "0xffffa0099e7613c8930941aa85b35ae0126ecff6dca6c6309d5759165fa71d1db30eafffa0205085d611625959317626897c3dc89886be861cbf2ddecf96a45c3065122a89ff0180ff01ffff01ffff80ffff01ffff33ffa0205085d611625959317626897c3dc89886be861cbf2ddecf96a45c3065122a89ff01ffffa0205085d611625959317626897c3dc89886be861cbf2ddecf96a45c3065122a898080ffff3effa089a74d1871bf2fc9907c170acbb39a2dedc30824aeac6867c308f94525d4489d8080ff80808080"
    },
    {
      "coin": {
        "amount": 1,
        "parent_coin_info": "0xc28f1dc824475f4b53296a988ccaf70c41f2a25b342ddedcbb9f371b597396a0",
        "puzzle_hash": "0x962812bb78e9e5b4eed9098645be3c79094fdc5b1e6db5bfc13807a314ca907c"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fffff010180ffff01ff02ff36ffff04ff02ffff04ff05ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff0bff80808080ffff04ff2fffff04ff0bffff04ff5fff808080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4602ff3304ffff0101ff02ffff02ffff03ff05ffff01ff02ff5cffff04ff02ffff04ff0dffff04ffff0bff2cffff0bff24ff3880ffff0bff2cffff0bff2cffff0bff24ff3480ff0980ffff0bff2cff0bffff0bff24ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff0bffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ffff02ff2affff04ff02ffff04ffff02ffff03ffff09ff23ff2880ffff0181b3ff8080ff0180ff80808080ff80808080808080ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffffff0bffff0bff17ffff02ff3affff04ff02ffff04ff09ffff04ff2fffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ff5f80ff0bff81bf80ff02ffff03ffff20ffff22ff4fff178080ffff01ff02ff7effff04ff02ffff04ff6fffff04ffff04ffff02ffff03ff4fffff01ff04ff23ffff04ffff02ff3affff04ff02ffff04ff09ffff04ff53ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff81b3ff80808080ffff011380ff0180ffff02ff7cffff04ff02ffff04ff05ffff04ff1bffff04ffff21ff4fff1780ff80808080808080ff8080808080ffff01ff088080ff0180ffff04ffff09ffff18ff05ffff010180ffff010180ffff09ff05ffff01818f8080ff0bff2cffff0bff24ff3080ffff0bff2cffff0bff2cffff0bff24ff3480ff0580ffff0bff2cffff02ff5cffff04ff02ffff04ff07ffff04ffff0bff24ff2480ff8080808080ffff0bff24ff8080808080ffffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff26ffff04ff02ffff04ff09ff80808080ffff02ff26ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ff5effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff3affff04ff02ffff04ff09ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfff80808080808080808080ffff04ffff04ff20ffff04ff17ff808080ffff02ff7cffff04ff02ffff04ff05ffff04ffff02ff82017fffff04ffff04ffff04ff17ff2f80ffff04ffff04ff5fff81bf80ffff04ff0bff05808080ff8202ff8080ffff01ff80808080808080ffff02ff2effff04ff02ffff04ff05ffff04ff0bffff04ffff02ffff03ff3bffff01ff02ff22ffff04ff02ffff04ff05ffff04ff17ffff04ff13ffff04ff2bffff04ff5bffff04ff5fff808080808080808080ffff01ff02ffff03ffff09ff15ffff0bff13ff1dff2b8080ffff01ff0bff15ff17ff5f80ffff01ff088080ff018080ff0180ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfffff04ff82017fff8080808080808080808080ff02ffff03ff05ffff011bffff010b80ff0180ff018080ffff04ffff01ffa024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffa05cf4c54f95ea5c8baf5f07617580efea6417c49fc02360118a5456fda6fc7ee8a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff8202ffffff01ff02ff16ffff04ff02ffff04ff05ffff04ff8204bfffff04ff8206bfffff04ff82017fffff04ffff0bffff19ff2fffff18ffff019100ffffffffffffffffffffffffffffffffff8202ff8080ff0bff82017f80ff8080808080808080ffff01ff04ffff04ff08ffff04ff17ffff04ffff02ff1effff04ff02ffff04ff82017fff80808080ff80808080ffff04ffff04ff1cffff04ff5fffff04ff8206bfff80808080ff80808080ff0180ffff04ffff01ffff32ff3d33ff3effff04ffff04ff1cffff04ff0bffff04ff17ff80808080ffff04ffff04ff1cffff04ff05ffff04ff2fff80808080ffff04ffff04ff0affff04ff5fff808080ffff04ffff04ff14ffff04ffff0bff5fffff012480ff808080ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a048a0962f7d88d2b413568bef5f9189bb53bf60497d2eda8af6efe57b05872227ffff04ffff01a0d0fa801558a8806525f3d6ad875953368cbaa70a06dd4dd870ff2538479c33d3ffff04ffff01b0a3d8ce5acbd79c4adb7340b0173eca9740e089033062cf504f7ec20da5b2df422c81b1d5ee2e3702aa08d1166c3987ceffff04ffff01a0ccd5bb71183532bff220ba46c268991a00000000000000000000000000000000ffff04ffff01a0e8d14d8481db507e55e878f9bd45350ce97fe8a407ab99f44219fd8aea2fd2b6ff01808080808080ff01808080",
      "solution": "0xffffa019c79f725fbd590ece4b5841b3ccc672529bcaf98d54e2426a885bc4f3364b8cffa08a0e5a40f3e20f79f9f4c92d2ac6ca91c2dd356e20914f9cb75afed547980e00ff0180ff01ffff8601977420dc00ff8332c0dc8080"
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a0000000000000000000000000032c0dc",
        "puzzle_hash": "0xd0fa801558a8806525f3d6ad875953368cbaa70a06dd4dd870ff2538479c33d3"
      },
      "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff82017fffff01ff04ffff04ff38ffff04ffff0bffff02ff2effff04ff02ffff04ff05ffff04ff81bfffff04ffff02ff3effff04ff02ffff04ffff04ff05ffff04ff0bff178080ff80808080ff808080808080ff82017f80ff808080ffff04ffff04ff3cffff01ff248080ffff04ffff04ff28ffff04ff82017fff808080ff80808080ffff01ff04ffff04ff24ffff04ff2fff808080ffff04ffff04ff2cffff04ff5fffff04ff81bfff80808080ffff04ffff04ff10ffff04ff81bfff808080ff8080808080ff0180ffff04ffff01ffffff49ff463fffff5002ff333cffff04ff0101ffff02ff02ffff03ff05ffff01ff02ff36ffff04ff02ffff04ff0dffff04ffff0bff26ffff0bff2aff1280ffff0bff26ffff0bff26ffff0bff2aff3a80ff0980ffff0bff26ff0bffff0bff2aff8080808080ff8080808080ffff010b80ff0180ffff0bff26ffff0bff2aff3480ffff0bff26ffff0bff26ffff0bff2aff3a80ff0580ffff0bff26ffff02ff36ffff04ff02ffff04ff07ffff04ffff0bff2aff2a80ff8080808080ffff0bff2aff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffff04ffff01a05cf4c54f95ea5c8baf5f07617580efea6417c49fc02360118a5456fda6fc7ee8ffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0183093a80ffff04ffff01a02d1813ecacb2bf6a6f22671e1e8ab386831a08d161e8b6b7f2e7b1eb783d1417ff01808080808080",
      "solution": "0xffa08a0e5a40f3e20f79f9f4c92d2ac6ca91c2dd356e20914f9cb75afed547980e00ffa091dc2f8ca19af6f9982f5989f9ca552d0c1ec1e93ea0822761abe9d10831d78580"
    }
  ],
  "success": true
}
```

</details>

---

### `get_coin_records_by_hint`

Functionality: Retrieves coins by hint; by default only returns unspent coins

Usage: chia rpc full_node [OPTIONS] get_coin_records_by_hint [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                | Type       | Required | Description                                                         |
| :------------------ | :--------- | :------- | :------------------------------------------------------------------ |
| hint                | HEX STRING | True     | The hint to examine                                                 |
| start_height        | INTEGER    | False    | The block height at which to begin the search                       |
| end_height          | INTEGER    | False    | The block height at which to end the search                         |
| include_spent_coins | BOOLEAN    | False    | A boolean indicating whether to include spent coins (default=false) |

<details>
<summary>Example</summary>

```json
chia rpc full_node get_coin_records_by_hint '{"start_height": 400000, "end_height": 1900000, "include_spent_coins": true, "hint": "0x6916079cc35f377e96fa34af87d14f58ce1f08d864f93e89bbdd04a26f591540"}'
```

Response:

```json
{
  "coin_records": [
    {
      "coin": {
        "amount": 10000,
        "parent_coin_info": "0x13eb187994e143a122c868d47e3e1201ddaf8fbaee13e6b04293ff527ec7b8e8",
        "puzzle_hash": "0xd229b55df95852e99f1c2708a7248380676ead58fd6a3cbfb44c870204506751"
      },
      "coinbase": false,
      "confirmed_block_index": 1868037,
      "spent": true,
      "spent_block_index": 1868399,
      "timestamp": 1650533680
    },
    {
      "coin": {
        "amount": 10000,
        "parent_coin_info": "0x7fcc1791720603314f134cf47dc80c2d36bae1dd236eada570993d285f7437a5",
        "puzzle_hash": "0xd229b55df95852e99f1c2708a7248380676ead58fd6a3cbfb44c870204506751"
      },
      "coinbase": false,
      "confirmed_block_index": 1872712,
      "spent": true,
      "spent_block_index": 1873218,
      "timestamp": 1650620445
    }
  ],
  "success": true
}
```

</details>

---

### `get_coin_records_by_names`

Functionality: Retrieves the coins for given coin IDs; by default only returns unspent coins

Usage: chia rpc full_node [OPTIONS] get_coin_records_by_names [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                | Type             | Required | Description                                                         |
| :------------------ | :--------------- | :------- | :------------------------------------------------------------------ |
| names               | HEX STRING ARRAY | True     | A list of coin_ids to examine                                       |
| start_height        | INTEGER          | False    | The block height at which to begin the search                       |
| end_height          | INTEGER          | False    | The block height at which to end the search                         |
| include_spent_coins | BOOLEAN          | False    | A boolean indicating whether to include spent coins (default=false) |

<details>
<summary>Example</summary>

```json
chia rpc full_node get_coin_records_by_names '{"start_height": 400000, "end_height": 1900000, "include_spent_coins": true, "names":["0x83103a520d363d9356d2bba5be786f56ca83cdccdaad1f7db74cabe3a6ec6195", "0x3a071ea8bb51d724bf3841fae40370ff18fe1e71a890b731ed1e67f026550995"]}'
```

Response:

```json
{
  "coin_records": [
    {
      "coin": {
        "amount": 126,
        "parent_coin_info": "0x6a16808f534325b809df04f64277c84b7e6f3d01b84ba7146858e3546ab97db4",
        "puzzle_hash": "0x8949f28258c35e47dceebf3a14a206c389ec1b85261ba217688e7b8303eb9b0f"
      },
      "coinbase": false,
      "confirmed_block_index": 1856394,
      "spent": true,
      "spent_block_index": 1872533,
      "timestamp": 1650315703
    },
    {
      "coin": {
        "amount": 7180937600000,
        "parent_coin_info": "0x459d10d2d2c9eef036825b7b4a8a7618b0e3137641ab6abde515c0af0ddf9f85",
        "puzzle_hash": "0xabd433d8744b06a4cf2b5872a951bf66358af6f6bcb54075a85708aff6e90ed8"
      },
      "coinbase": false,
      "confirmed_block_index": 472449,
      "spent": true,
      "spent_block_index": 472472,
      "timestamp": 1624450760
    }
  ],
  "success": true
}
```

</details>

---

### `get_coin_records_by_parent_ids`

Functionality: Retrieves the coins for given parent coin IDs; by default only returns unspent coins

Usage: chia rpc full_node [OPTIONS] get_coin_records_by_parent_ids [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                | Type             | Required | Description                                                         |
| :------------------ | :--------------- | :------- | :------------------------------------------------------------------ |
| parent_ids          | HEX STRING ARRAY | True     | A list of parent IDs to examine                                     |
| start_height        | INTEGER          | False    | The block height at which to begin the search                       |
| end_height          | INTEGER          | False    | The block height at which to end the search                         |
| include_spent_coins | BOOLEAN          | False    | A boolean indicating whether to include spent coins (default=false) |

<details>
<summary>Example</summary>

```json
chia rpc full_node get_coin_records_by_parent_ids '{"start_height":4, "end_height": 1900000, "include_spent_coins": true, "parent_ids": ["0x83103a520d363d9356d2bba5be786f56ca83cdccdaad1f7db74cabe3a6ec6195", "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000000061"]}'
```

Response:

```json
{
  "coin_records": [
    {
      "coin": {
        "amount": 6164491200000,
        "parent_coin_info": "0x83103a520d363d9356d2bba5be786f56ca83cdccdaad1f7db74cabe3a6ec6195",
        "puzzle_hash": "0xfbefc3b96a0c2d1dfe8f4dce7c546fd849a3b0b5cf4d75a794f07ac6bb96a80e"
      },
      "coinbase": false,
      "confirmed_block_index": 472472,
      "spent": true,
      "spent_block_index": 472488,
      "timestamp": 1624451109
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000000061",
        "puzzle_hash": "0x8f3dff600992a0b77aefbe8eb81dd4f233b9126f3b67557594b5a927d6e6d588"
      },
      "coinbase": true,
      "confirmed_block_index": 101,
      "spent": true,
      "spent_block_index": 341109,
      "timestamp": 1616164827
    },
    {
      "coin": {
        "amount": 1016446400000,
        "parent_coin_info": "0x83103a520d363d9356d2bba5be786f56ca83cdccdaad1f7db74cabe3a6ec6195",
        "puzzle_hash": "0x4ed688a013a7059d3619440c6f73d9c3759cdd8c55ece7ec86ded295aa2da8fe"
      },
      "coinbase": false,
      "confirmed_block_index": 472472,
      "spent": true,
      "spent_block_index": 2472263,
      "timestamp": 1624451109
    }
  ],
  "success": true
}
```

</details>

---

### `get_coin_records_by_puzzle_hash`

Functionality: Retrieves a list of coin records with a certain puzzle hash

Usage: chia rpc full_node [OPTIONS] get_coin_records_by_puzzle_hash [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                | Type       | Required | Description                                                         |
| :------------------ | :--------- | :------- | :------------------------------------------------------------------ |
| puzzle_hash         | HEX STRING | True     | The puzzle hash to search for                                       |
| start_height        | INTEGER    | False    | The block height at which to begin the search                       |
| end_height          | INTEGER    | False    | The block height at which to end the search                         |
| include_spent_coins | BOOLEAN    | False    | A boolean indicating whether to include spent coins (default=false) |

<details>
<summary>Example</summary>

```json
chia rpc full_node get_coin_records_by_puzzle_hash '{"puzzle_hash": "0x6bde1e0c6f9d3b93dc5e7e878723257ede573deeed59e3b4a90f5c86de1a0bd3", "start_height": 3343000, "end_height": 3343335, "include_spent_coins": true}'
```

Response:

```json
{
  "coin_records": [
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xd13487ef15fb62b578fa9bb5fce8b97fbcb4b3d954827ab4a31561ea3cb1e460",
        "puzzle_hash": "0x6bde1e0c6f9d3b93dc5e7e878723257ede573deeed59e3b4a90f5c86de1a0bd3"
      },
      "coinbase": false,
      "confirmed_block_index": 3343284,
      "spent": true,
      "spent_block_index": 3343449,
      "timestamp": 1678152756
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0x210a46e3b3460ab75383de012f0085a88aa4559a1f40e1e55da9346e90594120",
        "puzzle_hash": "0x6bde1e0c6f9d3b93dc5e7e878723257ede573deeed59e3b4a90f5c86de1a0bd3"
      },
      "coinbase": false,
      "confirmed_block_index": 3343197,
      "spent": true,
      "spent_block_index": 3343449,
      "timestamp": 1678151268
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xb4b179b58837b7a6ca3012495844d345d7f6059fd11f9aa5ccfd64ba598729ea",
        "puzzle_hash": "0x6bde1e0c6f9d3b93dc5e7e878723257ede573deeed59e3b4a90f5c86de1a0bd3"
      },
      "coinbase": false,
      "confirmed_block_index": 3343293,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678152889
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xfc0569d4aa5a573efdbeedc4a4e496daff8ded20c9d799261e07c88dd529944a",
        "puzzle_hash": "0x6bde1e0c6f9d3b93dc5e7e878723257ede573deeed59e3b4a90f5c86de1a0bd3"
      },
      "coinbase": false,
      "confirmed_block_index": 3343050,
      "spent": true,
      "spent_block_index": 3343240,
      "timestamp": 1678148511
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0x9af31c8e1f5cf2af216f807cf42e84d92c436d91617724e117e9effbc13c9e34",
        "puzzle_hash": "0x6bde1e0c6f9d3b93dc5e7e878723257ede573deeed59e3b4a90f5c86de1a0bd3"
      },
      "coinbase": false,
      "confirmed_block_index": 3343334,
      "spent": true,
      "spent_block_index": 3343449,
      "timestamp": 1678153722
    }
  ],
  "success": true
}
```

</details>

---

### `get_coin_records_by_puzzle_hashes`

Functionality: Retrieves the coins for a given puzzlehashes; by default only returns unspent coins

Usage: chia rpc full_node [OPTIONS] get_coin_records_by_puzzle_hashes [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                | Type             | Required | Description                                                         |
| :------------------ | :--------------- | :------- | :------------------------------------------------------------------ |
| puzzle_hashes       | HEX STRING ARRAY | True     | An array of puzzle hashes to examine                                |
| start_height        | INTEGER          | False    | The block height at which to begin the search                       |
| end_height          | INTEGER          | False    | The block height at which to end the search                         |
| include_spent_coins | BOOLEAN          | False    | A boolean indicating whether to include spent coins (default=false) |

<details>
<summary>Example</summary>

```json
chia rpc full_node get_coin_records_by_puzzle_hashes '{"puzzle_hashes": ["0x6bde1e0c6f9d3b93dc5e7e878723257ede573deeed59e3b4a90f5c86de1a0bd3", "0x71c79abd24b6cf63a92a5d8d1ca88014fd3b39cb3c300876370aac477a13b598"], "start_height": 3343293, "end_height": 3343380, "include_spent_coins": false}'
```

Response:

```json
{
  "coin_records": [
    {
      "coin": {
        "amount": 2499841800000,
        "parent_coin_info": "0x0c614ccc3714b6e9c21846aae8019d85e1dd4dcd4a2ba58149aefd94bb745db3",
        "puzzle_hash": "0x71c79abd24b6cf63a92a5d8d1ca88014fd3b39cb3c300876370aac477a13b598"
      },
      "coinbase": false,
      "confirmed_block_index": 3343375,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678154445
    },
    {
      "coin": {
        "amount": 2416791265997,
        "parent_coin_info": "0x605dd680d2cf4714c022348b1f591641a1d31154c6e5e8d87051e34716f43cfb",
        "puzzle_hash": "0x71c79abd24b6cf63a92a5d8d1ca88014fd3b39cb3c300876370aac477a13b598"
      },
      "coinbase": false,
      "confirmed_block_index": 3343378,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678154484
    },
    {
      "coin": {
        "amount": 1750000000000,
        "parent_coin_info": "0xb4b179b58837b7a6ca3012495844d345d7f6059fd11f9aa5ccfd64ba598729ea",
        "puzzle_hash": "0x6bde1e0c6f9d3b93dc5e7e878723257ede573deeed59e3b4a90f5c86de1a0bd3"
      },
      "coinbase": false,
      "confirmed_block_index": 3343293,
      "spent": false,
      "spent_block_index": 0,
      "timestamp": 1678152889
    }
  ],
  "success": true
}
```

</details>

---

### `get_coin_record_by_name`

Functionality: Retrieves a coin record by its name or coin ID

Usage: chia rpc full_node [OPTIONS] get_coin_record_by_name [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type       | Required | Description                         |
| :--- | :--------- | :------- | :---------------------------------- |
| name | HEX STRING | True     | The coin ID or coin name to look up |

:::note

The `name` (coin ID) can be obtained by hashing the Coin object: `sha256(parent coin + puzzle hash + amount)`

:::

<details>
<summary>Example</summary>

```json
chia rpc full_node get_coin_record_by_name '{"name": "0x7a639649fa2b6b4233cab7bf98b3da01be182afba622eb377011ac0940cd83c8"}'
```

Response:

```json
{
  "coin_record": {
    "coin": {
      "amount": 82488031983,
      "parent_coin_info": "0xfdc7526bfc5107e000b4f710c8c5944f11f4e7ce9711c522b6040bc473266313",
      "puzzle_hash": "0x5198fccb3ca8f14c32a5f05ac50c98209defd2d3ed3ee2a17789a9f6fd7d433b"
    },
    "coinbase": false,
    "confirmed_block_index": 3339400,
    "spent": true,
    "spent_block_index": 3339504,
    "timestamp": 1678080343
  },
  "success": true
}
```

</details>

---

### `get_fee_estimate`

Functionality: Obtain an estimated fee for one or more targeted times for a transaction to be included in the blockchain.

Usage: chia rpc wallet [OPTIONS] get_fee_estimate [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter    | Type          | Required | Description                                                                                                                         |
| :----------- | :------------ | :------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| spend_bundle | FILENAME      | True\*   | The spend bundle file (in json format) for which to estimate the fee (\* Exactly one of `spend_bundle` or `cost` must be specified) |
| cost         | INTEGER       | True\*   | The CLVM cost for which to estimate the fee (\* Exactly one of `spend_bundle` or `cost` must be specified)                          |
| target_times | INTEGER ARRAY | True     | An array of the targeted times for transaction inclusion, in seconds. Each targeted time must be at least 0                         |

:::note

- If `spend_bundle` is specified, then the cost of that spend bundle will first be obtained, followed by obtaining the estimated fee for that cost. Therefore, it is computationally cheaper to use `cost` than it is to use `spend_bundle`, other other factors being equal.
- This RPC takes into account the current size of the mempool relative to its maximum size, as well as the fee in mojos per cost (5 by default)

:::

<details>
<summary>Example</summary>

Obtain a fee estimate for a spendbundle with a CLVM cost of 20 million. Targeted inclusion times are 1, 5, and 10 minutes.

Note that this example was completed at a time when the mempool was not busy, so the fee estimates are all `0`.

```json
chia rpc full_node get_fee_estimate '{"cost":20000000, "target_times": [60, 300, 600]}'
```

Response:

```json
{
  "current_fee_rate": 0.0342163071650677,
  "estimates": [684326.1433013539, 4077.432021994343, 4077.432021994343],
  "fee_rate_last_block": 0.0,
  "fees_last_block": 0,
  "full_node_synced": true,
  "last_block_cost": 0,
  "last_peak_timestamp": 1678171577,
  "last_tx_block_height": 3344316,
  "mempool_fees": 2,
  "mempool_max_size": 550000000000,
  "mempool_size": 987358370,
  "node_time_utc": 1678171623,
  "num_spends": 13,
  "peak_height": 3344316,
  "success": true,
  "target_times": [60, 300, 600]
}
```

</details>

---

### `get_mempool_item_by_tx_id`

Functionality: Gets a mempool item by tx id

Usage: chia rpc full_node [OPTIONS] get_mempool_item_by_tx_id [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag  | Type       | Required | Description                                                  |
| :---- | :--------- | :------- | :----------------------------------------------------------- |
| tx_id | HEX STRING | True     | The spend bundle hash (tx ID) for which to retrieve the item |

<details>
<summary>Example</summary>

Start by obtaining all of the mempool tx IDs:

```json
chia rpc full_node get_all_mempool_tx_ids
```

Response:

```json
{
  "success": true,
  "tx_ids": [
    "0x2e2888b99a21d5a52f94fa11ef19ee1a7cf1498512345b89119aa201f9ae49f1",
    "0xd52609e605464bc7eedbfde28d2e75d2b9a5ba06865de283ad4e6c456b8ed86e",
    "0x68b38b9d3607e258242dd18f940d6802a9f07fbd65123b220d89bdda2530c87f",
    "0xbc8924954ca39f0b8d78ad4fd42f9da4670c3cb9c93cd4c94ab5c8cd18c7fd1a",
    "0xfe7304fdd91512cf2e0346014e5df53656441e02b1e34f5c06d4413a4cdf5355",
    "0x7e8092bb18a76b067e7eb6429ca4e95ec4b0f616d08d0d2a936bdc4d2c9e37b3",
    "0x6f28332ea48d049d4129631da57abae4a12cbdcd5754e516217b0d226ea7b365",
    "0x413a72ebc3c8b2d33ebfbc9b8c9e59a92cf3d465005717aab19d7bd495300178",
    "0xa6f42465a2b03effbf397a81766ab723ff901392d50ca91dcbec32fe25f864db",
    "0x709a278da6d8093b0063c90061c18eb74eb8d49677166dc239455eeaaa9d4315"
  ]
}
```

Next, obtain a mempool item for one of the IDs:

```json
chia rpc full_node get_mempool_item_by_tx_id '{"tx_id": "0x709a278da6d8093b0063c90061c18eb74eb8d49677166dc239455eeaaa9d4315"}'
```

Response:

```json
{
  "mempool_item": {
    "additions": [
      {
        "amount": 1,
        "parent_coin_info": "0x5d9e0afbb54f1aa70e3a9394b45019b14ce4385dbe2ad765d4eafcc4766d5312",
        "puzzle_hash": "0x4a5ba4c44a890036378f2f3a0bd1288e4d1fb1a66f4ba7336556cadf6b949ea0"
      },
      {
        "amount": 1750000000000,
        "parent_coin_info": "0x5d9e0afbb54f1aa70e3a9394b45019b14ce4385dbe2ad765d4eafcc4766d5312",
        "puzzle_hash": "0x2f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57"
      }
    ],
    "cost": 41414384,
    "fee": 0,
    "npc_result": {
      "conds": {
        "agg_sig_unsafe": [],
        "before_height_absolute": null,
        "before_seconds_absolute": null,
        "cost": 41414384,
        "height_absolute": 0,
        "reserve_fee": 0,
        "seconds_absolute": 0,
        "spends": [
          {
            "agg_sig_me": [],
            "before_height_relative": null,
            "before_seconds_relative": null,
            "coin_id": "0x5d9e0afbb54f1aa70e3a9394b45019b14ce4385dbe2ad765d4eafcc4766d5312",
            "create_coin": [
              [
                "0x4a5ba4c44a890036378f2f3a0bd1288e4d1fb1a66f4ba7336556cadf6b949ea0",
                1,
                null
              ],
              [
                "0x2f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57",
                1750000000000,
                null
              ]
            ],
            "flags": 1,
            "height_relative": null,
            "puzzle_hash": "0x4a5ba4c44a890036378f2f3a0bd1288e4d1fb1a66f4ba7336556cadf6b949ea0",
            "seconds_relative": 0
          },
          {
            "agg_sig_me": [],
            "before_height_relative": null,
            "before_seconds_relative": null,
            "coin_id": "0xddb3a7807de91a8b1f0a1eb8aab5e6baf5e924b6827421677738c3c73b9bba20",
            "create_coin": [],
            "flags": 1,
            "height_relative": null,
            "puzzle_hash": "0x19e2f23b7994d7f019c365047df40a1c514ad520060fc38a31e83f8a2ac7b831",
            "seconds_relative": 0
          }
        ]
      },
      "cost": 41414384,
      "error": null
    },
    "removals": [
      {
        "amount": 1,
        "parent_coin_info": "0xd7dd2fdb3dabe44589d1d3f08efd2970b135883bc93a6acb58065a7d1b7a62db",
        "puzzle_hash": "0x4a5ba4c44a890036378f2f3a0bd1288e4d1fb1a66f4ba7336556cadf6b949ea0"
      },
      {
        "amount": 1750000000000,
        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000330552",
        "puzzle_hash": "0x19e2f23b7994d7f019c365047df40a1c514ad520060fc38a31e83f8a2ac7b831"
      }
    ],
    "spend_bundle": {
      "aggregated_signature": "0xc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
      "coin_spends": [
        {
          "coin": {
            "amount": 1,
            "parent_coin_info": "0xd7dd2fdb3dabe44589d1d3f08efd2970b135883bc93a6acb58065a7d1b7a62db",
            "puzzle_hash": "0x4a5ba4c44a890036378f2f3a0bd1288e4d1fb1a66f4ba7336556cadf6b949ea0"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fffff010180ffff01ff02ff36ffff04ff02ffff04ff05ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff0bff80808080ffff04ff2fffff04ff0bffff04ff5fff808080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4602ff3304ffff0101ff02ffff02ffff03ff05ffff01ff02ff5cffff04ff02ffff04ff0dffff04ffff0bff2cffff0bff24ff3880ffff0bff2cffff0bff2cffff0bff24ff3480ff0980ffff0bff2cff0bffff0bff24ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff0bffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ffff02ff2affff04ff02ffff04ffff02ffff03ffff09ff23ff2880ffff0181b3ff8080ff0180ff80808080ff80808080808080ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffffff0bffff0bff17ffff02ff3affff04ff02ffff04ff09ffff04ff2fffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ff5f80ff0bff81bf80ff02ffff03ffff20ffff22ff4fff178080ffff01ff02ff7effff04ff02ffff04ff6fffff04ffff04ffff02ffff03ff4fffff01ff04ff23ffff04ffff02ff3affff04ff02ffff04ff09ffff04ff53ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff81b3ff80808080ffff011380ff0180ffff02ff7cffff04ff02ffff04ff05ffff04ff1bffff04ffff21ff4fff1780ff80808080808080ff8080808080ffff01ff088080ff0180ffff04ffff09ffff18ff05ffff010180ffff010180ffff09ff05ffff01818f8080ff0bff2cffff0bff24ff3080ffff0bff2cffff0bff2cffff0bff24ff3480ff0580ffff0bff2cffff02ff5cffff04ff02ffff04ff07ffff04ffff0bff24ff2480ff8080808080ffff0bff24ff8080808080ffffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff26ffff04ff02ffff04ff09ff80808080ffff02ff26ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ff5effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff3affff04ff02ffff04ff09ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfff80808080808080808080ffff04ffff04ff20ffff04ff17ff808080ffff02ff7cffff04ff02ffff04ff05ffff04ffff02ff82017fffff04ffff04ffff04ff17ff2f80ffff04ffff04ff5fff81bf80ffff04ff0bff05808080ff8202ff8080ffff01ff80808080808080ffff02ff2effff04ff02ffff04ff05ffff04ff0bffff04ffff02ffff03ff3bffff01ff02ff22ffff04ff02ffff04ff05ffff04ff17ffff04ff13ffff04ff2bffff04ff5bffff04ff5fff808080808080808080ffff01ff02ffff03ffff09ff15ffff0bff13ff1dff2b8080ffff01ff0bff15ff17ff5f80ffff01ff088080ff018080ff0180ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfffff04ff82017fff8080808080808080808080ff02ffff03ff05ffff011bffff010b80ff0180ff018080ffff04ffff01ffa024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffa04819a540b5e7e4d60c4e769d7d92e3a13e5b415307b1bfe7720c6765915fdc62a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff8202ffffff01ff02ff16ffff04ff02ffff04ff05ffff04ff8204bfffff04ff8206bfffff04ff82017fffff04ffff0bffff19ff2fffff18ffff019100ffffffffffffffffffffffffffffffffff8202ff8080ff0bff82017f80ff8080808080808080ffff01ff04ffff04ff08ffff04ff17ffff04ffff02ff1effff04ff02ffff04ff82017fff80808080ff80808080ffff04ffff04ff1cffff04ff5fffff04ff8206bfff80808080ff80808080ff0180ffff04ffff01ffff32ff3d33ff3effff04ffff04ff1cffff04ff0bffff04ff17ff80808080ffff04ffff04ff1cffff04ff05ffff04ff2fff80808080ffff04ffff04ff0affff04ff5fff808080ffff04ffff04ff14ffff04ffff0bff5fffff012480ff808080ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a02f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57ffff04ffff01a019e2f23b7994d7f019c365047df40a1c514ad520060fc38a31e83f8a2ac7b831ffff04ffff01b0823a5af392a43d9c5e89d72aa43986bc0126f1f04ffdd6484f2c1f31622cb6ef13f0737bc6da33aed1e630848b85dcafffff04ffff01a0ccd5bb71183532bff220ba46c268991a00000000000000000000000000000000ffff04ffff01a0cc9728481857e8105b55902128b6c1c94e8e6be34e3423d6a3168fdd722e874eff01808080808080ff01808080",
          "solution": "0xffffa04502047116ae95837c7cb738577b7259bca6cdb1d522d984ff0d4101777f7793ffa07cb500cb108dbfb7e8024cf8a54615fc21bc8591b97946fa5d52015420bae4e0ff0180ff01ffff8601977420dc00ff833305528080"
        },
        {
          "coin": {
            "amount": 1750000000000,
            "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000330552",
            "puzzle_hash": "0x19e2f23b7994d7f019c365047df40a1c514ad520060fc38a31e83f8a2ac7b831"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff82017fffff01ff04ffff04ff38ffff04ffff0bffff02ff2effff04ff02ffff04ff05ffff04ff81bfffff04ffff02ff3effff04ff02ffff04ffff04ff05ffff04ff0bff178080ff80808080ff808080808080ff82017f80ff808080ffff04ffff04ff3cffff01ff248080ffff04ffff04ff28ffff04ff82017fff808080ff80808080ffff01ff04ffff04ff24ffff04ff2fff808080ffff04ffff04ff2cffff04ff5fffff04ff81bfff80808080ffff04ffff04ff10ffff04ff81bfff808080ff8080808080ff0180ffff04ffff01ffffff49ff463fffff5002ff333cffff04ff0101ffff02ff02ffff03ff05ffff01ff02ff36ffff04ff02ffff04ff0dffff04ffff0bff26ffff0bff2aff1280ffff0bff26ffff0bff26ffff0bff2aff3a80ff0980ffff0bff26ff0bffff0bff2aff8080808080ff8080808080ffff010b80ff0180ffff0bff26ffff0bff2aff3480ffff0bff26ffff0bff26ffff0bff2aff3a80ff0580ffff0bff26ffff02ff36ffff04ff02ffff04ff07ffff04ffff0bff2aff2a80ff8080808080ffff0bff2aff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffff04ffff01a04819a540b5e7e4d60c4e769d7d92e3a13e5b415307b1bfe7720c6765915fdc62ffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0183093a80ffff04ffff01a02998ceb02bed2cddfc692c37737a95ac83af4bacf7897ac6c0170c93bcd021bbff01808080808080",
          "solution": "0xffa07cb500cb108dbfb7e8024cf8a54615fc21bc8591b97946fa5d52015420bae4e0ffa0ddb3a7807de91a8b1f0a1eb8aab5e6baf5e924b6827421677738c3c73b9bba2080"
        }
      ]
    },
    "spend_bundle_name": "0x709a278da6d8093b0063c90061c18eb74eb8d49677166dc239455eeaaa9d4315"
  },
  "success": true
}
```

</details>

---

### `get_network_info`

Functionality: Retrieves information about the current network

Usage: chia rpc full_node [OPTIONS] get_network_info [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc full_node get_network_info
```

Response:

```json
{
  "network_name": "mainnet",
  "network_prefix": "xch",
  "success": true
}
```

</details>

---

### `get_network_space`

Functionality: Retrieves an estimate of the netspace, which is the total plotted space of all farmers, in bytes

Usage: chia rpc full_node [OPTIONS] get_network_space [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                    | Type       | Required | Description           |
| :---------------------- | :--------- | :------- | :-------------------- |
| older_block_header_hash | HEX STRING | True     | The start header hash |
| newer_block_header_hash | HEX STRING | True     | The end header hash   |

<details>
<summary>Example</summary>

```json
chia rpc full_node get_network_space '{"older_block_header_hash": "023cbcdc3cb97e5ddeb6fe40a6a28b303255bb821090b237d00dd77c9dfefb7a", "newer_block_header_hash": "6c26e4a79b437de1272942a7c4c78e1af3a71741f1244b14320279c7084cf3c8"}'
```

Response:

```json
{
  "space": 26915196432975761408,
  "success": true
}
```

The result is the average network space (in bytes) from the blocks starting with `older_block_header_hash` and ending with `newer_block_header_hash`.

To calculate this value in EiB, divide it by 2^60. The result is 23.345 EiB in this example.

</details>

---

### `get_puzzle_and_solution`

Functionality: Retrieves a coin's spend record by its coin ID, sometimes referred to as "coin name".
Coin IDs can be calculated by hashing the coin: `sha256(parent_coin + puzzle_hash + amount)`

Usage: chia rpc full_node [OPTIONS] get_puzzle_and_solution [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag    | Type       | Required | Description                        |
| :------ | :--------- | :------- | :--------------------------------- |
| coin_id | HEX STRING | True     | Coin ID of the coin to look up     |
| height  | INTEGER    | True     | Height at which the coin was spent |

:::note

The puzzle and solution are provided in CLVM format.
The coin must have been spent in order to fetch this information.
By definition, coins that are unspent do not have their original puzzle or solution stored on-chain.

:::

<details>
<summary>Example</summary>

```json
chia rpc full_node get_puzzle_and_solution '{"coin_id": "0x985221340d70b38cee51d35fdbb64c333e15e7c27133e962d39237672985fdc9", "height": 3343255}'
```

Response:

```json
{
  "coin_solution": {
    "coin": {
      "amount": 1,
      "parent_coin_info": "0x6666c08616cb83af7107a57f080169c4c17dc4cc32c1d326328e5b1c1b506fea",
      "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
    },
    "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080",
    "solution": "0xffa0cd4a0d9da9564494bb3e8e0c9679380d9e1a659f0944e8478315ecadc82dc5daff01ff8080"
  },
  "success": true
}
```

</details>

---

### `get_recent_signage_point_or_eos`

Functionality: Retrieves a recent signage point or end of slot

Usage: chia rpc full_node [OPTIONS] get_recent_signage_point_or_eos [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag           | Type       | Required | Description                                                                      |
| :------------- | :--------- | :------- | :------------------------------------------------------------------------------- |
| sp_hash        | HEX STRING | True\*   | The hash of the output for a signage point (if it's in the middle of a sub slot) |
| challenge_hash | HEX STRING | True\*   | The challenge_hash for the subslot (if it's an end of sub slot challenge)        |

:::note

\*Either `sp_hash` or `challenge_hash` are required to be included in the query

:::

<details>
<summary>Example</summary>

```json
chia rpc full_node get_recent_signage_point_or_eos '{"challenge_hash": "0xc97facdb04807e595f46f76961febeea245c044d35152e4397e5c4878d5bce37"}'
```

Response:

```json
{
  "eos": {
    "challenge_chain": {
      "challenge_chain_end_of_slot_vdf": {
        "challenge": "0xc948e91995a270a48e8b6cc8db3a944ed74aef4d03be0f325205fba903445c70",
        "number_of_iterations": 146800640,
        "output": {
          "data": "0x020027a053f82874cfe8dc53c08d2ce5e791cab0391279898099ad8abfe21412725b45eb35dc60eb98592c14c7b5d8a305e2c3f77b3f63ee0fe7d04a9708d4e361283bf7d747a58edb778b5cb52608ed4fa42e8def51a0a6aba9d985aecd05710b410100"
        }
      },
      "infused_challenge_chain_sub_slot_hash": "0x7a26f76f0f6eda6d8033fd93306d10c01eb71a69fc0471a322feb855e8c67257",
      "new_difficulty": null,
      "new_sub_slot_iters": null,
      "subepoch_summary_hash": null
    },
    "infused_challenge_chain": {
      "infused_challenge_chain_end_of_slot_vdf": {
        "challenge": "0xac729280140c4d5bc4793c485042397e09c86683559142d0156a1d89cd5c691e",
        "number_of_iterations": 131095906,
        "output": {
          "data": "0x0200dc26e19b58d71a48623ea87b174cff7ead8b9d6e7bfff842f3bc0fd7694627943e82fb8c7df88676f9b780083bf9430efb95f261fd6ec48ae133141888801a071f0302dea9f1d021609c6864f3323c8d264fd99131f56a4f43e0fda35a16ba060706"
        }
      }
    },
    "proofs": {
      "challenge_chain_slot_proof": {
        "normalized_to_identity": false,
        "witness": "0x0300385a0b580b0ba47b04264b29a21543a4797f2a40d7a631c2b7ed2029906d0df45c66f115fa8ee8ea8a08d59a2f590c82ca37ce73a9b5e90400878dc7aa253c2fc776b7494ddc41d3d4eee78323ed8d5cc5b6d63752bf562b464254952ab019480100000000000004dee098971949dde52ecba255fe335978a979f17d20431981ce52b7ab1bc2fbeed0c8650100e02163d8a06f70d49002a9941b629b9e1fcb5e442961e0cdb934a85105fa34c5f4426de2658ce1dc6d7aed7019607cac7e57fde35b7201ec0b4184b9f024d91a7fc011a6a415b1cc679f7f6a00a95575c5f4f29b891b0d7c3d4fc9e9d066f126030100000000000e9d04a47b9e85b9450b1c526b4b017d9526ba5275115f27688f9777bd9bfa386f2f1a3902003c4ac70e6197f97b61cc8a010e7e0f8761c861ef92e06e699d36557735836f36f1c996e453339be55b942fee499787d180f1aa255ed53e353ca0c981ba2b596095172319067aeeff0f7c63557c2bfb63a3b5c38c1423ad46dcbdf3a9e68fff3e0100",
        "witness_type": 2
      },
      "infused_challenge_chain_slot_proof": {
        "normalized_to_identity": false,
        "witness": "0x0100de23f1da9d925937af12f7d0ab6ca0d9e6d61db06a3e160c776bae38f84903543745ef0c56200af5fde336cee3773fe4a48570c333edf8e2245a02c476cf7f3d5317d04993f41baa68d493f0014f6b6c98d8faba91943f11fd1dcdf253b57a030100000000000004dee0c98772ed5956507ae19690fb7ca410582c58c370995e3b8509cdac90eefe628a83000016233c3f1075c33ad60b06a0d6bb9c2003b5c2f9ec97c1e0f79f32689a9245831b23b647e57c08c5b9a5bc14fa2206f605fbb0cc5fbd26465eb48c8dba2aaf10676c18b87b197fb4567640357dbdda113ab6441f06b78bde8ccd98a41d4d7b1d010000000000000e9d04ca9d9e8e96a9770a769bf4403da504df78dd33c5ff9ed1990525f9f5e4e0f9445b0000fd514bf86e5d96e3be474abb40daf8b5efa76cde333bb840bd69caf751e0863497f94267addae1e39346e21f43534d1e6052f3d9b278ba931bdbb047ba7efb5a51fcaa91ad1f79f7dbec6805da9a32375492c91bd22615e086516131f134643f0100",
        "witness_type": 2
      },
      "reward_chain_slot_proof": {
        "normalized_to_identity": false,
        "witness": "0x0200e631425613dd99e65b0aa7f2d98c6033b69c597796e1b86f9ec380e609c47492d5bdafd50c5101a49946a888f1633dcf412c1dc3276cc14c7764007282e14f4ccb0fd0eabc80e45c5dad7e559bd64149714a49b9363b132b7116fdb66b669a250100000000000004dee0f3272ed4d79f6ba93c75bc953deb52b53955842faecb96a1dec32686c4bf14017103008ba373b8593f8e964b6f5582b46e4de4b7dae5db66c49e92b50288533a3c5909f341ea917ad3a4a832e71b28af685876e6bbb2176f737a8c1c33066e00078f4350f4ed25d638a9c0b7962388207cf43a64f1bf08174e0458be1bf8e28b201222010000000000000e9d049285451259f6f4ef346a92daf3b1f1979215e5a7f85393c8197a44d5038929f3c1000034cf575bc6ebaa5ff8ed3d318820e44ce070eea4f617dafca320d43044f9b1ec3a2a9c531662a9a2abaf37b15db2ea7283f0fee1772bd40a2fbcc03114fdca5fbb77b5c7668bd1eef4e52f4daf56422a68986d0a9a38453fa6a4b33b8333d9390100",
        "witness_type": 2
      }
    },
    "reward_chain": {
      "challenge_chain_sub_slot_hash": "0xc97facdb04807e595f46f76961febeea245c044d35152e4397e5c4878d5bce37",
      "deficit": 16,
      "end_of_slot_vdf": {
        "challenge": "0x9775fc146e7df73e6052cd132707d17f0f9691024b33be59fac47681b5483a4a",
        "number_of_iterations": 1436581,
        "output": {
          "data": "0x01004837f41f0f4bbddae80e964719de25c68429324a057c37cd49baea6934d82d7f6b83fbe4610ef018301302c5d39315c597234f55b12bdf627024bbe0761d070e81e5d45f40b974f9c3c883ae074d648449fdb501aeb3e8e478dabfe927ce2f0c0603"
        }
      },
      "infused_challenge_chain_sub_slot_hash": "0x7a26f76f0f6eda6d8033fd93306d10c01eb71a69fc0471a322feb855e8c67257"
    }
  },
  "reverted": false,
  "success": true,
  "time_received": 1678155344.7621934
}
```

</details>

---

### `get_routes`

Functionality: Show all RPC endpoints. This endpoint is lightweight and can be used as a health check. However, a better option may be `healthz` (below)

Usage: chia rpc full_node [OPTIONS] get_routes [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc full_node get_routes
```

Response:

```json
{
  "routes": [
    "/get_blockchain_state",
    "/get_block",
    "/get_blocks",
    "/get_block_count_metrics",
    "/get_block_record_by_height",
    "/get_block_record",
    "/get_block_records",
    "/get_block_spends",
    "/get_unfinished_block_headers",
    "/get_network_space",
    "/get_additions_and_removals",
    "/get_initial_freeze_period",
    "/get_network_info",
    "/get_recent_signage_point_or_eos",
    "/get_coin_records_by_puzzle_hash",
    "/get_coin_records_by_puzzle_hashes",
    "/get_coin_record_by_name",
    "/get_coin_records_by_names",
    "/get_coin_records_by_parent_ids",
    "/get_coin_records_by_hint",
    "/push_tx",
    "/get_puzzle_and_solution",
    "/get_all_mempool_tx_ids",
    "/get_all_mempool_items",
    "/get_mempool_item_by_tx_id",
    "/get_fee_estimate",
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

### `get_unfinished_block_headers`

Functionality: Retrieves recent unfinished header blocks

Usage: chia rpc full_node [OPTIONS] get_unfinished_block_headers [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

:::note

These blocks might get finished and confirmed soon.
The height and header hash is unknown, because some of these blocks might not get confirmed, which will affect the
blocks after it.

:::

<details>
<summary>Example</summary>

```json
chia rpc full_node get_unfinished_block_headers
```

Response:

```json
{
  "headers": [
    {
      "challenge_chain_sp_proof": {
        "normalized_to_identity": false,
        "witness": "0x0300ca3027dc768d1894470dbecde30493ab040b86d51cfd2d969be08af17030f222087aae7b32809afa1aa956f57ae932905c2ae91dc20eaa2eb8ecb59b65966a191b46dc28d10b06968bb0354f0070f9ab95f630131bdf7eafcc2c038ddb9790190401000000000001be7c88dfe3104cb9ff068568d46b4b3edbfe1b4effb2e3cb9d5bf42e57808a59b3f231020098ceddbffa9f0b27b2879228bfcbbdaab4f50608673886d36e81c9b3af1683e509ff92adcc79c4313898e654a6ab0ea27c3725d8b96e29a151c6e414afb51f5c7178c34f482d367ca4b1f7ec7459464171aeabe59cb8dd74fee98f24702c9d2c01000000000000053c3ceeb304ad81ae251a2fc3d8988da7c084c39dfac2fec36ec3e9412f49240a46a709030096053c4468ca4622bb9dfce38ee52f7c2791857d6486b2bf4f7f753c0b880b4870a0618ed071d472971936558406638d68fbb226284e26c26640077347fe963af79be18d9afdc60a50fdfd9a834103ac558b745a953951d98a49f6801cced1450100",
        "witness_type": 2
      },
      "finished_sub_slots": [],
      "foliage": {
        "foliage_block_data": {
          "extension_data": "0x0000000000000000000000000000000000000000000000000000000003a2c7c9",
          "farmer_reward_puzzle_hash": "0x907491ca39c35bc1f9a6eda33f7c0f97a9f583975088dad7216f1edd79f522ae",
          "pool_signature": "0xa286f7bcbce546f4ec55f9a37a67adf504d92e1afa711d488568c09914ad227e1fb4b1315c24150a2b9f8af8c437ec12068b5a6bc3eedb25827061971e99b305024d6fe7fa7c61d8180cd92f267f8fcc2bc5c40cded03d194b6d3ff8cb9966b9",
          "pool_target": {
            "max_height": 0,
            "puzzle_hash": "0x907491ca39c35bc1f9a6eda33f7c0f97a9f583975088dad7216f1edd79f522ae"
          },
          "unfinished_reward_block_hash": "0x84eeb3aad2cb25d554da983bbd58cfdec83f082da6d06a3eb9943cfb89578989"
        },
        "foliage_block_data_signature": "0xaab8ff2a66014493d01021bfffc99d772140f5b891548165c8cccef9164be7a37aa1dba638e3983e11546921bc1c8ebb16e150c379c7fca3591f22dbc21e8925ca57e239f3210ac0b8f8da37a3622969db2082f3ffba5781d8b12a08d55a6e33",
        "foliage_transaction_block_hash": "0x43e5fc07f3351fa4e5eba530ef6c9e784c9bf37d3bfd61a11714beef4a4ec91a",
        "foliage_transaction_block_signature": "0x8a04372cef9f2f2fc7dee74f6739fb8d45fcb70d7831378fb64080b9f83f24b3385cc5d8d284595c03033837b722a6bd0d1db4df76f589f399e4e12c565bf85d85a44a6965c22cf84bf715f25861c22bd6c99b6f6c6a120efd9609d67ceb255e",
        "prev_block_hash": "0x13e5ef5813e2ad994184c953d7e7dff766428ea5ed0580c2149dabc66747b57a",
        "reward_block_hash": "0x84eeb3aad2cb25d554da983bbd58cfdec83f082da6d06a3eb9943cfb89578989"
      },
      "foliage_transaction_block": {
        "additions_root": "0x62b9bf13134a0e3bab44dc4550d75686f3f24c3fbb9a20b3eb58022ed0a99a74",
        "filter_hash": "0xe43808ab7534cd3ed1645e476e00ca2ac4926b1dc09ab96d0cf744507fd41b02",
        "prev_transaction_block_hash": "0x2c534d6a32e7a53a3fc33baa8ab05504d7721d3395911e36144bd9b0589d4f25",
        "removals_root": "0x0000000000000000000000000000000000000000000000000000000000000000",
        "timestamp": 1678076245,
        "transactions_info_hash": "0x22d97282cf7d02d4fbbba37bf58fd1fdcd4fe24f5be95a30f0dc92828c1ba1c0"
      },
      "reward_chain_block": {
        "challenge_chain_sp_signature": "0x8cc561c0cc79e73b44506954c4ebd85e7667bdbe13f253e96fdd1cb895b612f266510429f6b82858a60c36e59e333a770456e8c096d8de5372d51884edf11803b6e426d04db5b8b6ba5743ed8033b7b11dc57d9a8fee211c4389771d61fdcc90",
        "challenge_chain_sp_vdf": {
          "challenge": "0x7e7fc1d74f8d710b7a17017504bfd7e9863973cb60bbfefe1b6ce5588a1d4735",
          "number_of_iterations": 36700160,
          "output": {
            "data": "0x0100290f45aa544d64443cd183b5b0bb0eddc112fb4fcbba73159b1b04b6476203f8417d10f36868adb6cda400b0b9b625d57b07ba6bb258d9f0b825601b414a6942c3b69e32858409996ec8619160623d56db115aaa5661816f4453dfc6e434082a0100"
          }
        },
        "pos_ss_cc_challenge_hash": "0x7e7fc1d74f8d710b7a17017504bfd7e9863973cb60bbfefe1b6ce5588a1d4735",
        "proof_of_space": {
          "challenge": "0x685cda6bb6c77da65df3f93da220ff55581985b3472a6d06fe146c833fee4626",
          "plot_public_key": "0x86cc6327dbe8d0c8646689f789ab4560e2b10bd5892131eed2b020ce409fb8fb76b873a439f7040dc9609179bde5d152",
          "pool_contract_puzzle_hash": null,
          "pool_public_key": "0xb87e833fd714490b72eb7a390cfc1605f79b60d3f18d909e094f25001535842bc48be9db46fa465fbf9db26a3d7f4b6d",
          "proof": "0xa223d3fda3c718d0b1be65f33a901f7b8c5434ef7e46fd7321ad66572b1d87d52853ed6fb3137453536e85b09ad02bf52f7278780d349993e1081c1c2437c1a249ea5f30dbf13a6204ba0655634f9428312a0402df2ecf16de6f4187fc556e74040d8b0729cc7fc135133f6cc75b402353e412e9a13a906816c73dfea94c82fdf659bfe856bca057693210d1ac950a384038dd4c69186444509491a4efaea6c998e87990e75ec77b6575df62d1819558203886f769de990b674fbf770fd6437a59804a889e49a1c8cdd9e8085e515e7dbbe436ae077e6238df26e5565c8e6645e1cc3b560e1c7d87411a58f0ac1562db3ee19b79c14df0403a7aad9b8609a7cf",
          "size": 32
        },
        "reward_chain_sp_signature": "0xb75969dd2cd7d701aba2719b512c0675b598d632e0175473d2644a48eb9e385a113f205653e2d5a133a831067e3026dc036c37974efbda351e1a6eac95d4b81fe4fdde71ea68d44454208bc72f1428cbb56ccfcd64b5a1120d34c125cfd83e46",
        "reward_chain_sp_vdf": {
          "challenge": "0x772c50de1700f58b608ff8fc77a4310aa475c9c9c98a932a446845370a52b500",
          "number_of_iterations": 514688,
          "output": {
            "data": "0x03007ca6f95897feb5e6a9fb9f6538437f089eee4de540bfde9a2b0ba831fbd21aef9ab4b46c172224e39f420aac719a2cc6a36cd5ae78f79b1057523e3167ecb512350f2e6348175eefac8709a68463ca7ae4067bae81e9814fc57f9b348d935c2b0100"
          }
        },
        "signage_point_index": 16,
        "total_iters": 13800993484113
      },
      "reward_chain_sp_proof": {
        "normalized_to_identity": false,
        "witness": "0x0300fa111380d3200d60319b5942b6d64db9b4566687af69151ff753883d16cb1b6114950a2f8866196befd3a29b86122f9f4bcc1edccdf24e832f633589ac3bed4d09627f07b52fa80f6a58208a9315c2084cca9806b056bdf0a06b860a48633c5c0100000000000001be7ce234ebd932c7440269ce060daae5d28653d4752bd9116daefb35dac0e3ec8d668700001f471a60c7d939dabee596ab5deed888a602acdeec14a0979bf9c0ae63cb9408cb73e0655641daa87faa7ef2b5947d3500222dd072fe92fde5e122f7d2975d0c49edb3821a550e481e744e0590b0962e12de68aeed4d1f1b690ef32cc75b6b1501000000000000053c3c897461dbcbafa7d3867fab45ec4dce8278fe6cf0973970cda2e947e0d0da99f7410000d40006147d7e566ec7bbe4b7d413fcc8b763507c2b26f6155cb30cbd51737c495affc981e4c22710fd3316e76ca46b2a41bde411d17c0cd76dbe53a15823953a3daa4ef3652133cf11718f8453ea12f846251d249b61cee3787b48885594d23b0100",
        "witness_type": 2
      },
      "transactions_filter": "0x"
    },
    {
      "challenge_chain_sp_proof": {
        "normalized_to_identity": false,
        "witness": "0x0300ca3027dc768d1894470dbecde30493ab040b86d51cfd2d969be08af17030f222087aae7b32809afa1aa956f57ae932905c2ae91dc20eaa2eb8ecb59b65966a191b46dc28d10b06968bb0354f0070f9ab95f630131bdf7eafcc2c038ddb9790190401000000000001be7c88dfe3104cb9ff068568d46b4b3edbfe1b4effb2e3cb9d5bf42e57808a59b3f231020098ceddbffa9f0b27b2879228bfcbbdaab4f50608673886d36e81c9b3af1683e509ff92adcc79c4313898e654a6ab0ea27c3725d8b96e29a151c6e414afb51f5c7178c34f482d367ca4b1f7ec7459464171aeabe59cb8dd74fee98f24702c9d2c01000000000000053c3ceeb304ad81ae251a2fc3d8988da7c084c39dfac2fec36ec3e9412f49240a46a709030096053c4468ca4622bb9dfce38ee52f7c2791857d6486b2bf4f7f753c0b880b4870a0618ed071d472971936558406638d68fbb226284e26c26640077347fe963af79be18d9afdc60a50fdfd9a834103ac558b745a953951d98a49f6801cced1450100",
        "witness_type": 2
      },
      "finished_sub_slots": [],
      "foliage": {
        "foliage_block_data": {
          "extension_data": "0x0000000000000000000000000000000000000000000000000000000003a2c7c9",
          "farmer_reward_puzzle_hash": "0xecbbcb78f5e7ab31e90c4c8252122da7ca7c74bfb75fdf1be96a3c9686adfa88",
          "pool_signature": null,
          "pool_target": {
            "max_height": 0,
            "puzzle_hash": "0xbb88a2972f7eca1429bfaab93a4b40489eca9ce93dd9f457fb73d6977b52a54f"
          },
          "unfinished_reward_block_hash": "0x7470e73998d09e5013ee4716755bb1c9c2149c4a20bbc08ab018162db84309c9"
        },
        "foliage_block_data_signature": "0x84c681c118c30d61fdb0138e4b8733934c6449eae06fcb138046ecfb7e00a7fa7b8a91e5a616a6ac6e2790bc607fad600ad7e02f20fc71258fec7febc413057fe5e000d7015680a11045ad663d39e966eab0d2dcc779a7b65cb02e4940f342f7",
        "foliage_transaction_block_hash": "0x6207a41a0a8d8b7424e19b6c86986923cde7141111ffd7649bef80a1008cc1d2",
        "foliage_transaction_block_signature": "0x99efa3bc08e637a1bb9cf76fd65f34b4605a604ef5bfb35730e9c4fc6823b98db84d811e4e4be98a2ea0e389619fe915167127552a18f755200a8eeac7013cbde11b3b627965d716807a5cfad6a72d8003cacc061ea887f3116b24271458d5d5",
        "prev_block_hash": "0x13e5ef5813e2ad994184c953d7e7dff766428ea5ed0580c2149dabc66747b57a",
        "reward_block_hash": "0x7470e73998d09e5013ee4716755bb1c9c2149c4a20bbc08ab018162db84309c9"
      },
      "foliage_transaction_block": {
        "additions_root": "0x5f5ef826f1463990296e049903b1f93f67dec29dcf9f4bdf0eea05aa16b21ad3",
        "filter_hash": "0x8e4730e59db228c6528bd2134b70cbe9610d4593b9c02edb97819661ed9f7d20",
        "prev_transaction_block_hash": "0x2c534d6a32e7a53a3fc33baa8ab05504d7721d3395911e36144bd9b0589d4f25",
        "removals_root": "0x1e5bfb0949fe7b292fd4cf54dd9f6ed48ff57187e765259b3ce3f324d27c5ecc",
        "timestamp": 1678076244,
        "transactions_info_hash": "0x92c0158e5c018e05435623b250df4e35351fe3da1a2dd053eae3c42251749086"
      },
      "reward_chain_block": {
        "challenge_chain_sp_signature": "0x8013eb086cec8e807b1234f1db5f8e1c1f2dacc69ffb1ca895339855d9b3bf1ea2226eeb04a784846c31941fba74269907b5b72ad639b2f159d2fa6dafc4e92566cea6d25e812417d784780096b7e4e3a934388cf689d28f3b1a4f159ace7ba5",
        "challenge_chain_sp_vdf": {
          "challenge": "0x7e7fc1d74f8d710b7a17017504bfd7e9863973cb60bbfefe1b6ce5588a1d4735",
          "number_of_iterations": 36700160,
          "output": {
            "data": "0x0100290f45aa544d64443cd183b5b0bb0eddc112fb4fcbba73159b1b04b6476203f8417d10f36868adb6cda400b0b9b625d57b07ba6bb258d9f0b825601b414a6942c3b69e32858409996ec8619160623d56db115aaa5661816f4453dfc6e434082a0100"
          }
        },
        "pos_ss_cc_challenge_hash": "0x7e7fc1d74f8d710b7a17017504bfd7e9863973cb60bbfefe1b6ce5588a1d4735",
        "proof_of_space": {
          "challenge": "0x81838f2a5f615d3db9e2359d18c7c508cfcf5e4f5c7c17f3414ecd2dacb0380d",
          "plot_public_key": "0x8cb625dca79cc77cff1f56ba63e94e51a706246dc8f48602161f0d804a2d1a68eb47e69272df5bd35a9bc1f68f12c241",
          "pool_contract_puzzle_hash": "0xbb88a2972f7eca1429bfaab93a4b40489eca9ce93dd9f457fb73d6977b52a54f",
          "pool_public_key": null,
          "proof": "0x4ba33da1552300576e90838cb582e9c0265b863a12bbc3cc5a5d14dcd945fe56df49a76f3fcf19ebd06d7720c11a65c110a5ae785f269b7420360aa2cb16178c72b0121126322a12808632a91b90619589d15eb29057cda878b4c7a5a89c6871099a74788f21cbcf219ffa8b5b046d8d93c653bf11f86c71baf421e401867c37ec4ae1c0fb746bc9145102fda711793e05ed7f5cddccc2a7047195f16467a8214295d8ae0ecf76d5467e5149a3e9319cebee07f1c0fb4be6096032ca1c08bf60ee9b8ad87fdafb707e24809dab3c505566ce22cdab252c6bae5872673a6f7963a2edfdc2c7e8f05e4847580e3b4fdc72321bedcf778edbd85ed0884b2dff67d0",
          "size": 32
        },
        "reward_chain_sp_signature": "0x94f11bca7b3d0f3bc4a3a1edd8a051567cc8698796c03c20491b969771ad159e600e06a3b51260113d5f6effd61aeb7e0a5980efe24e943caa73342f3b9475f66f0e6a742f355cd0d1486785d6db401e29ac3c068fffb1d7134690d13f417e84",
        "reward_chain_sp_vdf": {
          "challenge": "0x772c50de1700f58b608ff8fc77a4310aa475c9c9c98a932a446845370a52b500",
          "number_of_iterations": 514688,
          "output": {
            "data": "0x03007ca6f95897feb5e6a9fb9f6538437f089eee4de540bfde9a2b0ba831fbd21aef9ab4b46c172224e39f420aac719a2cc6a36cd5ae78f79b1057523e3167ecb512350f2e6348175eefac8709a68463ca7ae4067bae81e9814fc57f9b348d935c2b0100"
          }
        },
        "signage_point_index": 16,
        "total_iters": 13800993149685
      },
      "reward_chain_sp_proof": {
        "normalized_to_identity": false,
        "witness": "0x0300fa111380d3200d60319b5942b6d64db9b4566687af69151ff753883d16cb1b6114950a2f8866196befd3a29b86122f9f4bcc1edccdf24e832f633589ac3bed4d09627f07b52fa80f6a58208a9315c2084cca9806b056bdf0a06b860a48633c5c0100000000000001be7ce234ebd932c7440269ce060daae5d28653d4752bd9116daefb35dac0e3ec8d668700001f471a60c7d939dabee596ab5deed888a602acdeec14a0979bf9c0ae63cb9408cb73e0655641daa87faa7ef2b5947d3500222dd072fe92fde5e122f7d2975d0c49edb3821a550e481e744e0590b0962e12de68aeed4d1f1b690ef32cc75b6b1501000000000000053c3c897461dbcbafa7d3867fab45ec4dce8278fe6cf0973970cda2e947e0d0da99f7410000d40006147d7e566ec7bbe4b7d413fcc8b763507c2b26f6155cb30cbd51737c495affc981e4c22710fd3316e76ca46b2a41bde411d17c0cd76dbe53a15823953a3daa4ef3652133cf11718f8453ea12f846251d249b61cee3787b48885594d23b0100",
        "witness_type": 2
      },
      "transactions_filter": "0x"
    },
    {
      "challenge_chain_sp_proof": {
        "normalized_to_identity": false,
        "witness": "0x0100a7812fd45b95894c5725ed3ed14a1be3247e76ea02365b36d0366cfab82ab98a0169da19a1ae4d425d5819b94798e02af9bcfde5098ef55d208e535b11906940f14f6ac42055c0247f3081e1d340408e81860d46b4dd06aec426a13b5a60a449010000000000000985e4d5e0fb85326a31a4897e8845538bd20e9bedaf8c46c9f8e1833d1e86f295f90857030023af6b075910a3e486b3687930244425f2826dc7550909aeeca846c202452816745413bc9ab8ca2fda478fe269b5726a8b39a1b2f002045f4faee6edf10bcd1eb15e4800b4ba94bfa894bdc9c1f5d3ef5bdccc74aca46d9020e6730c8a77ed01010000000000001c9148c8bc9b8bf67dc6c09185e9bb17fcda7c2ddf2983d1d72e4898bc50553964297f1b010024cf9f31b4532269cd6a452c14fa0e1e991b2980e833e28d59c78d2a756c0a5678dce61b8b71cf3f3f8cd37611f37960163e99b9e95312419936600de4a22301e172887cb1c82bea369eb423bcf05577a4ab140332f82a3e21d5712c1fa0d2013725",
        "witness_type": 2
      },
      "finished_sub_slots": [],
      "foliage": {
        "foliage_block_data": {
          "extension_data": "0x0000000000000000000000000000000000000000000000000000000003a2c7c9",
          "farmer_reward_puzzle_hash": "0x4bc6435b409bcbabe53870dae0f03755f6aabb4594c5915ec983acf12a5d1fba",
          "pool_signature": "0xa7f170e0c32587d1db9f6f68f28e3c5793b4a86c6affae174cbd4bda9ec096a796d244ccf95e62171d7839d30bfeac09003ccad7f90283b4b653b68cb1a347c70a678d42162c49ffb188ef2d45d21fbffb3c8853b0ce2ee6f67f7e14d9486936",
          "pool_target": {
            "max_height": 0,
            "puzzle_hash": "0x4bc6435b409bcbabe53870dae0f03755f6aabb4594c5915ec983acf12a5d1fba"
          },
          "unfinished_reward_block_hash": "0xab6691f6f5c13ff0a4680f3e902efcc82641df64523657d4f132c4a70db21b99"
        },
        "foliage_block_data_signature": "0x90cd090312b65b26e794413d15edab3616f01e48110f72fc875e2493b0aad86f99216562237d1cf62ea84861ec14f7860a7a968260f6946c041cc628728542c8a3ef627823e2c176cacc47e84119fcb50ed6f2356908d23cf5f308dc9a9a17ab",
        "foliage_transaction_block_hash": "0x2ca39854f6a32a9c50896b8b165927705adf212f848ca16a28f6d283d55f7954",
        "foliage_transaction_block_signature": "0xa66e5916a26cd78bb084e7cd7d59c36ebd39a01fa8aeb790d09cacaeb1c22d8daba4f5c6a9877ac275aa2794482c194c0b5b23128fb65e834da8c61d4b808963913d239d791cb04f67c4a0cdb9003a8d7571dc2ff143ec3a954e73fa69d939ba",
        "prev_block_hash": "0x13e5ef5813e2ad994184c953d7e7dff766428ea5ed0580c2149dabc66747b57a",
        "reward_block_hash": "0xab6691f6f5c13ff0a4680f3e902efcc82641df64523657d4f132c4a70db21b99"
      },
      "foliage_transaction_block": {
        "additions_root": "0x1611eb80ea5476b4283e41fe8b33c88a2d85b26145dac97c30885a381801b971",
        "filter_hash": "0xd8445e477a9814015dc994eabf973350ddeb67c37ecfae98163bbc301f69149d",
        "prev_transaction_block_hash": "0x2c534d6a32e7a53a3fc33baa8ab05504d7721d3395911e36144bd9b0589d4f25",
        "removals_root": "0x5b47cf171919444e1aaa2497b97908be5a4bec1084f193f14a634c93c4cfbe63",
        "timestamp": 1678076253,
        "transactions_info_hash": "0x71bd40a43bb9a1e867e7825ef90cd9c1105d808cc5a7083758003b8c1142bf92"
      },
      "reward_chain_block": {
        "challenge_chain_sp_signature": "0xb2c9730cee6362f1c400ed898d6bc5a2cf0018da986ab20cc87cb2393cd04e5bd1dbf5d3052a9f5e093c35806accc876027c7e6bd498eeced2710f000a7865e74f960811688658df0eccd63243b2a83fa63859dc2168bda7be629507ec5c764f",
        "challenge_chain_sp_vdf": {
          "challenge": "0x7e7fc1d74f8d710b7a17017504bfd7e9863973cb60bbfefe1b6ce5588a1d4735",
          "number_of_iterations": 38993920,
          "output": {
            "data": "0x01002e9a936483f31a9fe6ee941e90bb9a44ba75c8ed1d77d82b6767a7eeef696ae8f0a2b03b550faf941162df0b79b6bc48119967fa4d469944ca077cf88faca13e97999bc713a26d98929d63637b2be38f0be774640db4c17ed98757045880312a0100"
          }
        },
        "pos_ss_cc_challenge_hash": "0x7e7fc1d74f8d710b7a17017504bfd7e9863973cb60bbfefe1b6ce5588a1d4735",
        "proof_of_space": {
          "challenge": "0x18a067db011ecb6ae11daa0d9f1a5a74a2cdf45eaa1af837f92ee2bc6caaa579",
          "plot_public_key": "0x87d8b49520dd5262720596bf47b51bb1161eeeeefd7c5d6c8023eec52470450093c0bfe8fc7c5152f5d8f6674c61f220",
          "pool_contract_puzzle_hash": null,
          "pool_public_key": "0x9479b5cc0b3116a3154c6cb8da72c3cb3a28b08b6fad1f5ed42bbd72c9592053a94f2f96f2355e68649be57a0ee7301b",
          "proof": "0x0e43984d2720911a5c0846ce6b2483e9d6e1c196244d0c765aa4091c6786e95d4821df1ccaf6a804c0d2c3c4e573f15e13350ef5ad978957ce2fa3e3030cc1a31b3eee5131754f7e09e75882b0d1c62e5e2c1e46b02d210d6a3fbd6a4088bb6bd00e51bbd6c7f74a54e28ebcadd8b974658f5e3eead70238eae296cc6230404990a935135c4f4db77bcc2466b80205bad92c833e3726b216557d8a8996524f8e5b119945662021ddc370a63c0b31ec01e1a32fce138a9546fc7106dad08bfdf6f82bc4007950ef6f760e98356735dbd0f4404b82e889ded8accee174811b7c6d1410131b674fb336fc5efc6bc7a78f57e081c205793367ca7eb9540c374d6287",
          "size": 32
        },
        "reward_chain_sp_signature": "0x811c7ff4a490e56b0446efaaf6615331332e5336a4236c7f60b47b9f7a4fba451f91e66fff82ad2410e69ae58cd7e64b02fa034c80f7eafbad465bea970c5c0c12b33e93122c60ee9f1c89b2142d83c5379f1194c8101bce8c974b96e4a3f78f",
        "reward_chain_sp_vdf": {
          "challenge": "0x772c50de1700f58b608ff8fc77a4310aa475c9c9c98a932a446845370a52b500",
          "number_of_iterations": 2808448,
          "output": {
            "data": "0x01000d28a0e12edad31164692421c351320086e66088909ba45f183fa16644a9abd28bb9c68efd6841cfc8f4d74b5f6eeae71ff99c9cbba60da8b5ee5533a5038b519c41f66d0d9854020f66c62790faf884d657052e7ec5b1f92da182ec0b8e53380100"
          }
        },
        "signage_point_index": 17,
        "total_iters": 13800994274820
      },
      "reward_chain_sp_proof": {
        "normalized_to_identity": false,
        "witness": "0x0300028e7d5ecd547ec041a458448e56a40d8bd7ebe773ada675602a31524acb33b9c74bc52bb94bf3eb6247201fa773ac63f9a95ea873e85e3239667a4baaf003092301b6cbf2205735bd3aeabc7693adee8daad44d608f43cbfc7f1a34bc604b00090400000000000985e49d20d91582f149c4fe527889310c42992553050b41aa193636cec7b9ca21f9d9e301002cee3b9ef8cba41005299d061e858d94bad90655db31d77298e70357d69bd6183f722c1b851d9c2436d0633014bb6bc4b6e30ddf07849177c2d85da33e95a90f473a481bf7d6c59ffd913ef1d815b13df00c9e59d6caf42e859188b5feb8df11040100000000001c9148b58c79b63cd8a492328bf845b0708a6f531bdc7e626b8081bace46de851c2369070200985c4704482f4e56a260196b875a160d56fc2767f61dca677c3f256e15945c8cfbe9422d4dcaae3bddeadcaea585b85433537291f732e138db4bb07cd94f8918e3b6725f891e08eded7c3a93fe0b6a46993e626cc2514ab06b85182dab6bfa340100",
        "witness_type": 2
      },
      "transactions_filter": "0x"
    }
  ],
  "success": true
}
```

</details>

---

### `healthz`

Functionality: Verifies that the RPC service is running

Usage: chia rpc full_node [OPTIONS] healthz [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

:::note

This RPC returns `200` if successful. It is lightweight and can be queried often in intervals.

:::

<details>
<summary>Example</summary>

```json
chia rpc full_node healthz
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `push_tx`

Functionality: Pushes a transaction / spend bundle to the mempool and blockchain.
Returns whether the spend bundle was successfully included into the mempool

Usage: chia rpc full_node [OPTIONS] push_tx [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag         | Type | Required | Description                     |
| :----------- | :--- | :------- | :------------------------------ |
| spend_bundle | JSON | True     | Spend bundle to submit, in JSON |

<details>
<summary>Example</summary>

```json
chia rpc full_node push_tx
'{
    "spend_bundle": {
    "aggregated_signature": "0xa5e5ea1f5ae2335a72fe0a7ed7ca39e8f142e2e1f6e37a348482290e88eb9cea2d973acf6145e34d0afeee7ba22f99850641e21a549b2c092bb49aa393acd938825bccca9413c1a268ba44367bc8433cd0fc0eb82e87bebe23817aa695bdb566",
    "coin_spends": [
        {
            "coin": {
                "amount": 1750000000000,
                "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000004082",
                "puzzle_hash": "0x94c6db00186900418ef7c1f05e127ee1a647cbe6e514ec3bc57acb7bbe6dfb10"
            },
            "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0aec9c2e5984fe928406abca942d55ec6b56340af8315bfefa55889dbaade669b9fd3f330af2af44c2a0626d383e64757ff018080",
            "solution": "0xff80ffff01ffff33ffa03fa549a708302b401c45cf387f8f03b4f76b7c9eabf567bea974f61dedf721e0ff840098968080ffff33ffa055b9fe4c9ce0cef8ad574bf5a9158dc0db7848b96be1a98ab2806d8f0a376a08ff860197738845808080ff8080"
        }
    ]
  }
}'
```

Response:

```json
{ "status": "SUCCESS", "success": true }
```

</details>

:::note Note 1

`SUCCESS` does not guarantee that the transaction will get confirmed. A transaction may be dropped from the mempool and not
included if the fee is too low. A transaction may also be combined with other transactions to form different spend
bundles, so looking up the bundle by ID does not guarantee finding the original transaction. The transaction can be
resubmitted with a higher fee, as long as the coins spent in the new transaction are a superset of the coins spent in
the old one.

:::

:::note Note 2

To check whether a transaction has been confirmed, use [get_coin_record_by_name](#get_coin_record_by_name) with
each coin id that should be created by this spend bundle.

The error status can be one of:

- **SUCCESS**: if the transaction was successfully added to the mempool
- **PENDING**: if the transaction cannot be included yes due to timelocks or conflicts
- **FAILED**: transaction was not added to the mempool, and was dropped

:::

---
