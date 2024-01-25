---
sidebar_label: DAOs
title: DAO RPCs
slug: /dao-rpc
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning

Chia DAOs are currently an _alpha_ primitive. This means that DAOs are not yet ready for production use, but you can still test them on either a simulator or a testnet. **We recommend against creating DAOs with this primitive on mainnet!**

Prior to using the DAO alpha primitive, be sure to read the [list of known issues](/dao-known-issues).

:::

:::note

The RPC to create a new DAO is a **wallet RPC** called [create_new_wallet](/wallet-rpc/#create_new_wallet), therefore it is not documented here. See Example 7 for details of how this command's options can be used.

:::

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc wallet dao_get_treasury_balance '{"wallet_id": 2}'
```

To run the same command on Windows, you need to escape the quotes, so it looks like this (the braces have been removed to support the formatting for this page. You still need to use them in your actual commands.):

```powershell
chia rpc wallet dao_get_treasury_balance '\"wallet_id\": 2'
```

</details>

## Reference

### `dao_add_funds_to_treasury`

Functionality: Add funds to a DAO's treasury wallet

Usage: chia rpc wallet [OPTIONS] dao_add_funds_to_treasury [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                                                        | Type   | Required | Description                                                                                           |
| :---------------------------------------------------------- | ------ | :------- | :---------------------------------------------------------------------------------------------------- |
| wallet_id                              | NUMBER | True     | The DAO wallet to which to add funds. Must be of type `DAOWallet`                                     |
| funding_wallet_id | NUMBER | True     | The wallet from which the funds will come. Must be of type `STANDARD_WALLET` or `CAT`                 |
| amount                                                      | NUMBER | True     | The amount of funds to add, in mojos                                                                  |
| fee                                                         | NUMBER | False    | An optional blockchain fee, in mojos [Default: 0] |

<details>
<summary>Example</summary>

Start by showing the treasury's current balance:

```bash
chia rpc wallet dao_get_treasury_balance '{"wallet_id": 2}'
```

Response:

```bash
{
    "balances": {
        "xch": 6000000000000
    },
    "success": true
}
```

Next, add 1 XCH (`1 000 000 000 000` mojos) to the treasury. In this example, the DAO's `wallet_id` is `2` and the funds will be withdrawn from wallet `1`:

```bash
chia rpc wallet dao_add_funds_to_treasury '{"wallet_id": 2, "funding_wallet_id": 1, "amount":1000000000000}'
```

Response:

```bash
{
    "success": true,
    "tx": {
        "additions": [
            {
                "amount": 1000000000000,
                "parent_coin_info": "0x84e4edfb59d4d67ad5add0b8b32a5ceb2bb58f8aa76b34fc08d2a5a543fd7281",
                "puzzle_hash": "0xf83e58db471eb1c4f384ff7d8df667ed46fd65122e97ea9f4e49d2a201958ae6"
            },
            {
                "amount": 899060877519,
                "parent_coin_info": "0x84e4edfb59d4d67ad5add0b8b32a5ceb2bb58f8aa76b34fc08d2a5a543fd7281",
                "puzzle_hash": "0xf846adb08db6c61db7f2c48fdc3211923306f5f4550a0c6c9837fc935a310b25"
            }
        ],
        "amount": 1000000000000,
        "confirmed": false,
        "confirmed_at_height": 0,
        "created_at_time": 1701236328,
        "fee_amount": 0,
        "memos": [
            [
                "0x5f3e9570b7c233bef7e7ee533b27045d66337e136768a35b747103a022f6e22a",
                [
                    "0xf83e58db471eb1c4f384ff7d8df667ed46fd65122e97ea9f4e49d2a201958ae6"
                ]
            ]
        ],
        "name": "0x9ab12f78338f24f5c2f84a1d83aed2d127b40c107a451891c323464ad0adec63",
        "removals": [
            {
                "amount": 1899060877519,
                "parent_coin_info": "0x722a89074b24a5742aa36667e2864b0c7151515a4796b062601de02e67a4bb4c",
                "puzzle_hash": "0xedcdf7ef527fa44435058521fd4fbcfbb9697bbb23489f3b616ec0b20b388e13"
            }
        ],
        "sent": 0,
        "sent_to": [],
        "spend_bundle": {
            "aggregated_signature": "0x8a9eb66ae69288cb179d1f334589160788cafced0ebc239e1ab084796c88e723fc01ce9629c24d724e101e1f1e7570af0a4cd3d852c7162a061d92268a5b4f1b4d82b83e20c1b152cf79dbd133d728830ee1a848241c5d13254a0452b881df7b",
            "coin_spends": [
                {
                    "coin": {
                        "amount": 1899060877519,
                        "parent_coin_info": "0x722a89074b24a5742aa36667e2864b0c7151515a4796b062601de02e67a4bb4c",
                        "puzzle_hash": "0xedcdf7ef527fa44435058521fd4fbcfbb9697bbb23489f3b616ec0b20b388e13"
                    },
                    "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b08d639dbc9f933abf4cc830b9b71a9e36e26824f326f1e7a26f3fbd5ec167f8cd0f876f07a02bbf7be885d4371c84a7ebff018080",
                    "solution": "0xff80ffff01ffff33ffa0f83e58db471eb1c4f384ff7d8df667ed46fd65122e97ea9f4e49d2a201958ae6ff8600e8d4a51000ffffa0f83e58db471eb1c4f384ff7d8df667ed46fd65122e97ea9f4e49d2a201958ae68080ffff33ffa0f846adb08db6c61db7f2c48fdc3211923306f5f4550a0c6c9837fc935a310b25ff8600d1543448cf80ffff3cffa0ebe35d9772349926944804e0103fca92d06616fdd8566c3a8e16cf0dc331343b8080ff8080"
                }
            ]
        },
        "to_puzzle_hash": "0xf83e58db471eb1c4f384ff7d8df667ed46fd65122e97ea9f4e49d2a201958ae6",
        "trade_id": null,
        "type": 1,
        "valid_times": {
            "max_blocks_after_created": null,
            "max_height": null,
            "max_secs_after_created": null,
            "max_time": null,
            "min_blocks_since_created": null,
            "min_height": null,
            "min_secs_since_created": null,
            "min_time": null
        },
        "wallet_id": 1
    },
    "tx_id": "0x9ab12f78338f24f5c2f84a1d83aed2d127b40c107a451891c323464ad0adec63"
}
```

After the transaction has completed, show the balance once again:

```bash
chia rpc wallet dao_get_treasury_balance '{"wallet_id": 2}'
```

Response:

```bash
{
    "balances": {
        "xch": 6000000000000
    },
    "success": true
}
```

</details>

***

### `dao_adjust_filter_level`

Functionality: Change a your filter threshold for viewing proposals

Usage: chia rpc wallet [OPTIONS] dao_adjust_filter_level [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                              | Type   | Required | Description                                                                                   |
| :-------------------------------- | ------ | :------- | :-------------------------------------------------------------------------------------------- |
| wallet_id    | NUMBER | True     | The ID of the wallet whose filter level you would like to adjust. Must be of type `DAOWallet` |
| filter_level | NUMBER | True     | The new filter level. Propos with fewer votes than this will not be shown.                    |

***

### `dao_close_proposal`

Functionality: Close a proposal from a DAO

Usage: chia rpc wallet [OPTIONS] dao_close_proposal [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                             | Type   | Required | Description                                                                           |
| :------------------------------- | ------ | :------- | :------------------------------------------------------------------------------------ |
| wallet_id   | NUMBER | True     | The ID of the wallet that contains the proposal to close. Must be of type `DAOWallet` |
| proposal_id | STRING | True     | The ID of the proposal to close                                                       |
| fee                              | NUMBER | False    | An optional blockchain fee, in mojos                                                  |

***

### `dao_create_proposal`

Functionality: Create and add a proposal to a DAO

Usage: chia rpc wallet [OPTIONS] dao_create_proposal [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                               | Type   | Required | Description                                                                  |
| :--------------------------------- | ------ | :------- | :--------------------------------------------------------------------------- |
| wallet_id     | NUMBER | True     | The DAO wallet to use for creating the proposal. Must be of type `DAOWallet` |
| proposal_type | STRING | True     | Must be either `spend`, `update`, or `mint`                                  |
| vote_amount   | NUMBER | False    | The number of votes to add                                                   |
| fee                                | NUMBER | False    | An optional blockchain fee, in mojos                                         |

Proposal Types:

| Type   | Description                            |
| :----- | :------------------------------------- |
| spend  | A proposal to spend funds from the DAO |
| update | A proposal to change a DAO's rules     |
| mint   | A proposal to mint new DAO CATs        |

If the proposal is of type `spend`, then `additions` may optionally be included in the request parameters.

`additions` is a list with the following elements:

| Element                          | Required | Description                                                                                                                 |
| :------------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------- |
| asset_id    | False    | The asset_id of the funds to spend [Default: None] |
| puzzle_hash | True     | The puzzle_hash of the funds to spend                                                                  |
| amount                           | True     | The amount, in mojos, to spend                                                                                              |

If the proposal is of type `spend`, and `additions` is not included, then the following **request parameters** will be used instead:

| Parameter                          | Required | Description                                                                                                                 |
| :--------------------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------- |
| asset_id      | False    | The asset_id of the funds to spend [Default: None] |
| inner_address | True     | The inner address of the funds to spend                                                                                     |
| amount                             | True     | The amount, in mojos, to spend                                                                                              |

If the proposal is of type `update`, then the **request parameter** `new_dao_rules` is required.

`new_dao_rules` is a list of optional rules to update. If a rule is missing from this list, it will not be updated:

| Rule                                                           | Required | Description                                                                                        |
| :------------------------------------------------------------- | :------- | :------------------------------------------------------------------------------------------------- |
| proposal_timelock                         | False    | The new minimum number of blocks before a proposal can close                                       |
| soft_close_length    | False    | The number of blocks a proposal must remain unspent before closing                                 |
| attendance_required                       | False    | The minimum number of votes a proposal must receive to be accepted                                 |
| pass_percentage                           | False    | The percentage of 'yes' votes in basis points a proposal must receive to be accepted. 100% = 10000 |
| self_destruct_length | False    | The number of blocks required before a proposal can be automatically removed                       |
| oracle_spend_delay   | False    | The number of blocks required between oracle spends of the treasury                                |

If the proposal is of type `mint`, then the following **request parameters** are required:

| Parameter                                                    | Required | Description                                  |
| :----------------------------------------------------------- | :------- | :------------------------------------------- |
| amount                                                       | True     | The number of DAO CATs to mint               |
| cat_target_address | True     | The xch address that will receive the tokens |

***

### `dao_exit_lockup`

Functionality: Release DAO CATs from voting mode

Usage: chia rpc wallet [OPTIONS] dao_exit_lockup [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                           | Type   | Required | Description                                                                          |
| :----------------------------- | ------ | :------- | :----------------------------------------------------------------------------------- |
| wallet_id | NUMBER | True     | The ID of the wallet from which to release the DAO CATs. Must be of type `DAOWallet` |
| coins                          | STRING | False    | A list of coin IDs to release                                                        |
| fee                            | NUMBER | False    | An optional blockchain fee, in mojos                                                 |

***

### `dao_free_coins_from_finished_proposals`

Functionality: Release closed proposals from DAO CATs

Usage: chia rpc wallet [OPTIONS] dao_free_coins_from_finished_proposals [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                           | Type   | Required | Description                                                                          |
| :----------------------------- | ------ | :------- | :----------------------------------------------------------------------------------- |
| wallet_id | NUMBER | True     | The ID of the wallet from which to release the DAO CATs. Must be of type `DAOWallet` |
| fee                            | NUMBER | False    | An optional blockchain fee, in mojos                                                 |

***

### `dao_get_proposals`

Functionality: List all existing proposals from the specified DAO

Usage: chia rpc wallet [OPTIONS] dao_get_proposals [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                           | Type   | Required | Description                                                          |
| :----------------------------- | ------ | :------- | :------------------------------------------------------------------- |
| wallet_id | NUMBER | True     | The wallet from which to list proposals; must be of type `DAOWallet` |

<details>
<summary>Example</summary>

Request:

```bash
chia rpc wallet dao_get_proposals '{"wallet_id": 2}'
```

Response:

```bash
{
    "proposal_timelock": 3,
    "proposals": [
        {
            "amount_voted": 3000,
            "closed": false,
            "current_coin": {
                "amount": 1000001,
                "parent_coin_info": "0xa65c0cc9a239c5964af2f6dfabad0f4f50bc2cb30e911081e481bd43163fdf24",
                "puzzle_hash": "0x3cdc53833b4b4f69703c7edaccc2373e8964421df51abf151c628491f58386e6"
            },
            "current_innerpuz": "0xff02ffff01ff02ffff01ff02ffff01ff02ffff03ff8402ffffffffff01ff02ffff01ff02ffff03ffff15ff8400bfffffff8305ffff80ffff01ff02ffff01ff04ffff04ffff0133ffff04ffff02ff2cffff04ff02ffff04ffff04ff0bffff04ff8217ffff178080ffff04ff5fff8080808080ffff04ffff0101ffff04ffff04ff8205ffffff018080ffff018080808080ffff04ffff04ffff0152ffff04ff8400bfffffffff01808080ffff04ffff04ffff013fffff04ffff0bffff02ff2effff04ff02ffff04ffff04ff0bffff04ff8205ffff178080ffff04ff8200bfffff04ff83017fffffff04ff8305ffffffff04ff835fffffffff04ff8317ffffffff04ff830bffffffff04ff8400bfffffffff04ff84017fffffff808080808080808080808080ffff018080ffff01808080ffff0180808080ff0180ffff01ff02ffff01ff0880ff018080ff0180ff0180ffff01ff02ffff01ff02ffff03ff835fffffffff01ff02ffff01ff04ffff04ffff0152ffff04ff835fffffffff01808080ffff04ffff04ffff0133ffff04ffff02ff2cffff04ff02ffff04ffff04ff0bffff04ff8217ffff178080ffff04ff5fff8080808080ffff04ffff0101ffff04ffff04ff8205ffffff018080ffff018080808080ffff04ffff04ffff013fffff04ffff0bffff02ff3cffff04ff02ffff04ff05ffff04ff820bffffff04ffff04ff0bffff04ff8217ffff178080ff808080808080ff8217ff80ffff01808080ffff04ffff04ffff013effff04ff8305ffffffff01808080ffff02ffff03ffff22ffff15ff8300bfffff8317ffff80ffff15ff825fffffff05ffff14ffff12ff8300bfffff830bffff80ffff0182271080808080ffff01ff02ffff01ff04ffff04ffff013cffff04ffff02ff38ffff04ff02ffff04ffff04ff822fffffff04ffff0180ffff01808080ff80808080ffff01808080ffff04ffff04ffff013fffff04ffff0bffff02ff2effff04ff02ffff04ffff04ff0bffff04ff8205ffff178080ffff04ff8200bfffff04ff83017fffffff04ff8305ffffffff04ff835fffffffff04ff8317ffffffff04ff830bffffffff04ff8400bfffffffff04ff84017fffffff808080808080808080808080ff8217ff80ffff01808080ffff01808080ff0180ffff01ff02ffff01ff04ffff04ffff013fffff04ffff0bffff02ff2effff04ff02ffff04ffff04ff0bffff04ff8205ffff178080ffff04ff8200bfffff04ff83017fffffff04ff8305ffffffff04ff835fffffffff04ff8317ffffffff04ff830bffffffff04ff8400bfffffffff04ff84017fffffff808080808080808080808080ffff018080ffff01808080ffff018080ff018080ff018080808080ff0180ffff01ff02ffff01ff02ff3effff04ff02ffff04ff8217ffffff04ff82017fffff04ff2fffff04ff8202ffffff04ff8205ffffff04ff820bffffff04ff825fffffff04ff8300bfffffff04ff822fffffff04ff8305ffffffff04ff83017fffffff04ff830bffffffff04ff8317ffffffff04ff8302ffffffff04ffff0180ffff04ffff02ffff03ffff21ff825fffff8300bfff80ffff01ff02ffff01ff0180ff0180ffff01ff02ffff01ff04ffff04ffff0133ffff04ffff02ff3cffff04ff02ffff04ff05ffff04ff820bffffff04ffff04ff0bffff04ff8217ffff178080ff808080808080ffff04ffff0180ffff0180808080ffff02ffff03ffff09ffff02ff38ffff04ff02ffff04ff832fffffff80808080ff822fff80ffff01ff02ffff01ff0180ff0180ffff01ff02ffff01ff0880ff018080ff018080ff018080ff0180ffff04ff8405ffffffffff04ffff0180ff808080808080808080808080808080808080808080ff018080ff0180ff018080ff0180ffff04ffff01ffffffff02ffff03ff05ffff01ff02ffff01ff02ff10ffff04ff02ffff04ffff06ff0580ffff04ffff0bffff0102ffff0bffff0101ffff010480ffff0bffff0102ffff0bffff0102ffff0bffff0101ffff010180ffff05ff058080ffff0bffff0102ff0bffff0bffff0101ffff018080808080ff8080808080ff0180ffff01ff02ffff010bff018080ff0180ffff0bffff0102ffff01a0a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222ffff0bffff0102ffff0bffff0102ffff01a09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ff0580ffff0bffff0102ffff02ff10ffff04ff02ffff04ff07ffff01ffa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b280808080ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459a808080ff02ffff03ffff07ff0580ffff01ff02ffff01ff0bffff0102ffff02ff38ffff04ff02ffff04ffff05ff0580ff80808080ffff02ff38ffff04ff02ffff04ffff06ff0580ff8080808080ff0180ffff01ff02ffff01ff0bffff0101ff0580ff018080ff0180ffff02ffff03ff0bffff01ff02ffff01ff02ffff03ffff09ff05ffff05ff0b8080ffff01ff02ffff01ff0101ff0180ffff01ff02ffff01ff02ff14ffff04ff02ffff04ff05ffff04ffff06ff0b80ff8080808080ff018080ff0180ff0180ffff01ff02ffff01ff0180ff018080ff0180ffff02ff28ffff04ff02ffff04ff0bffff04ffff0bffff0101ff0b80ffff04ffff02ff38ffff04ff02ffff04ff05ff80808080ff808080808080ff02ff28ffff04ff02ffff04ff05ffff04ffff02ff38ffff04ff02ffff04ff17ff80808080ffff04ffff0bffff0101ff0b80ff808080808080ffffff02ff28ffff04ff02ffff04ff05ffff04ff17ffff04ffff02ff38ffff04ff02ffff04ff0bff80808080ffff04ffff0bffff0101ff0580ff80808080808080ffff02ff28ffff04ff02ffff04ff05ffff04ffff0bffff0101ff5f80ffff04ffff0bffff0101ff2f80ffff04ffff0bffff0101ff1780ffff04ffff0bffff0101ff0b80ffff04ffff0bffff0101ff0580ff808080808080808080ff02ff28ffff04ff02ffff04ff05ffff04ff17ffff04ffff0bffff0101ff0b80ffff04ffff0bffff0101ff0580ff80808080808080ffff02ff28ffff04ff02ffff04ff09ffff04ff0bffff04ffff02ff38ffff04ff02ffff04ff05ff80808080ff808080808080ffff02ff16ffff04ff02ffff04ff05ffff04ffff02ff28ffff04ff02ffff04ff0bffff04ffff0bffff0101ff8205ff80ffff04ffff0bffff0101ff8202ff80ffff04ffff0bffff0101ff82017f80ffff04ffff0bffff0101ff8200bf80ffff04ffff0bffff0101ff5f80ffff04ffff0bffff0101ff2f80ffff04ff17ffff04ffff0bffff0101ff0b80ff808080808080808080808080ff8080808080ff02ffff03ff820bffffff01ff02ffff01ff02ffff03ffff15ffff05ff8217ff80ffff018080ffff01ff02ffff01ff04ffff04ffff013effff04ffff05ff820bff80ffff01808080ffff04ffff04ffff013fffff04ffff0bffff02ff3affff04ff02ffff04ff17ffff04ff2fffff04ffff02ff12ffff04ff02ffff04ff0bffff04ffff05ff822fff80ffff04ffff05ff825fff80ff808080808080ff808080808080ffff02ff38ffff04ff02ffff04ffff04ff05ffff04ffff05ff8217ff80ffff04ff8300bfffffff04ffff05ff820bff80ffff018080808080ff8080808080ffff01808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff8200bfffff04ff82017fffff04ff8202ffffff04ff8205ffffff04ffff06ff820bff80ffff04ffff06ff8217ff80ffff04ffff06ff822fff80ffff04ffff06ff825fff80ffff04ff8300bfffffff04ffff10ffff05ff8217ff80ff83017fff80ffff04ff8302ffffffff04ff8305ffffffff04ffff02ffff03ffff02ff14ffff04ff02ffff04ffff05ff820bff80ffff04ff830bffffff8080808080ffff01ff02ffff01ff0880ff0180ffff01ff02ffff01ff04ffff05ff820bff80ff830bffff80ff018080ff0180ff8080808080808080808080808080808080808080808080ff0180ffff01ff02ffff01ff0880ff018080ff0180ff0180ffff01ff02ffff01ff04ffff04ffff0133ffff04ffff02ff2affff04ff02ffff04ff8200bfffff04ff05ffff04ff8205ffffff04ffff02ffff03ff8300bfffffff01ff02ffff01ff10ff82017fff83017fff80ff0180ffff01ff02ffff0182017fff018080ff0180ffff04ffff10ff8202ffff83017fff80ff8080808080808080ffff04ff8305ffffffff04ffff04ff5fffff018080ffff018080808080ffff04ffff04ffff0149ffff04ff8305ffffffff01808080ff8302ffff8080ff018080ff0180ff018080ffff04ffff01a01acd912fca662d1474f7a6c762280fc1430875bef518883387086c1125027526ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a037bef360ee858133b69d595a906dc45d01af50379dad515eb9518abb7c1d2a7affff04ffff01a0694c99e1fb07671771bbca3d110880693a9ecc37a6529891ec979d0f3e760ebaffff04ffff01a0a80ab006a05f8fa0156c4bec25b747075c61338c6d0c0ffe95fd04ea96c636d7ffff04ffff01a0f0d10f58714194b0db438874dca0d9738923a3d637669bb296aede4d38daf09fffff04ffff01a052d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089ffff04ffff01a041b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123ff0180808080808080808080ffff04ffff01a07fe05bacefa83bd570e4e3d83ea3f0de8ef64ad77d217c351b09c64a5c4b063bffff04ffff01a07b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22ffff04ffff01a087567752457c84454e523b375073437c73bd8d3b8d417f40db6ab82d0654bb5dffff04ffff018207d0ffff04ffff01820bb8ff01808080808080",
            "inner_puzzle": "0xff02ffff01ff02ffff01ff02ffff01ff02ffff03ff8402ffffffffff01ff02ffff01ff02ffff03ffff15ff8400bfffffff8305ffff80ffff01ff02ffff01ff04ffff04ffff0133ffff04ffff02ff2cffff04ff02ffff04ffff04ff0bffff04ff8217ffff178080ffff04ff5fff8080808080ffff04ffff0101ffff04ffff04ff8205ffffff018080ffff018080808080ffff04ffff04ffff0152ffff04ff8400bfffffffff01808080ffff04ffff04ffff013fffff04ffff0bffff02ff2effff04ff02ffff04ffff04ff0bffff04ff8205ffff178080ffff04ff8200bfffff04ff83017fffffff04ff8305ffffffff04ff835fffffffff04ff8317ffffffff04ff830bffffffff04ff8400bfffffffff04ff84017fffffff808080808080808080808080ffff018080ffff01808080ffff0180808080ff0180ffff01ff02ffff01ff0880ff018080ff0180ff0180ffff01ff02ffff01ff02ffff03ff835fffffffff01ff02ffff01ff04ffff04ffff0152ffff04ff835fffffffff01808080ffff04ffff04ffff0133ffff04ffff02ff2cffff04ff02ffff04ffff04ff0bffff04ff8217ffff178080ffff04ff5fff8080808080ffff04ffff0101ffff04ffff04ff8205ffffff018080ffff018080808080ffff04ffff04ffff013fffff04ffff0bffff02ff3cffff04ff02ffff04ff05ffff04ff820bffffff04ffff04ff0bffff04ff8217ffff178080ff808080808080ff8217ff80ffff01808080ffff04ffff04ffff013effff04ff8305ffffffff01808080ffff02ffff03ffff22ffff15ff8300bfffff8317ffff80ffff15ff825fffffff05ffff14ffff12ff8300bfffff830bffff80ffff0182271080808080ffff01ff02ffff01ff04ffff04ffff013cffff04ffff02ff38ffff04ff02ffff04ffff04ff822fffffff04ffff0180ffff01808080ff80808080ffff01808080ffff04ffff04ffff013fffff04ffff0bffff02ff2effff04ff02ffff04ffff04ff0bffff04ff8205ffff178080ffff04ff8200bfffff04ff83017fffffff04ff8305ffffffff04ff835fffffffff04ff8317ffffffff04ff830bffffffff04ff8400bfffffffff04ff84017fffffff808080808080808080808080ff8217ff80ffff01808080ffff01808080ff0180ffff01ff02ffff01ff04ffff04ffff013fffff04ffff0bffff02ff2effff04ff02ffff04ffff04ff0bffff04ff8205ffff178080ffff04ff8200bfffff04ff83017fffffff04ff8305ffffffff04ff835fffffffff04ff8317ffffffff04ff830bffffffff04ff8400bfffffffff04ff84017fffffff808080808080808080808080ffff018080ffff01808080ffff018080ff018080ff018080808080ff0180ffff01ff02ffff01ff02ff3effff04ff02ffff04ff8217ffffff04ff82017fffff04ff2fffff04ff8202ffffff04ff8205ffffff04ff820bffffff04ff825fffffff04ff8300bfffffff04ff822fffffff04ff8305ffffffff04ff83017fffffff04ff830bffffffff04ff8317ffffffff04ff8302ffffffff04ffff0180ffff04ffff02ffff03ffff21ff825fffff8300bfff80ffff01ff02ffff01ff0180ff0180ffff01ff02ffff01ff04ffff04ffff0133ffff04ffff02ff3cffff04ff02ffff04ff05ffff04ff820bffffff04ffff04ff0bffff04ff8217ffff178080ff808080808080ffff04ffff0180ffff0180808080ffff02ffff03ffff09ffff02ff38ffff04ff02ffff04ff832fffffff80808080ff822fff80ffff01ff02ffff01ff0180ff0180ffff01ff02ffff01ff0880ff018080ff018080ff018080ff0180ffff04ff8405ffffffffff04ffff0180ff808080808080808080808080808080808080808080ff018080ff0180ff018080ff0180ffff04ffff01ffffffff02ffff03ff05ffff01ff02ffff01ff02ff10ffff04ff02ffff04ffff06ff0580ffff04ffff0bffff0102ffff0bffff0101ffff010480ffff0bffff0102ffff0bffff0102ffff0bffff0101ffff010180ffff05ff058080ffff0bffff0102ff0bffff0bffff0101ffff018080808080ff8080808080ff0180ffff01ff02ffff010bff018080ff0180ffff0bffff0102ffff01a0a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222ffff0bffff0102ffff0bffff0102ffff01a09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ff0580ffff0bffff0102ffff02ff10ffff04ff02ffff04ff07ffff01ffa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b280808080ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459a808080ff02ffff03ffff07ff0580ffff01ff02ffff01ff0bffff0102ffff02ff38ffff04ff02ffff04ffff05ff0580ff80808080ffff02ff38ffff04ff02ffff04ffff06ff0580ff8080808080ff0180ffff01ff02ffff01ff0bffff0101ff0580ff018080ff0180ffff02ffff03ff0bffff01ff02ffff01ff02ffff03ffff09ff05ffff05ff0b8080ffff01ff02ffff01ff0101ff0180ffff01ff02ffff01ff02ff14ffff04ff02ffff04ff05ffff04ffff06ff0b80ff8080808080ff018080ff0180ff0180ffff01ff02ffff01ff0180ff018080ff0180ffff02ff28ffff04ff02ffff04ff0bffff04ffff0bffff0101ff0b80ffff04ffff02ff38ffff04ff02ffff04ff05ff80808080ff808080808080ff02ff28ffff04ff02ffff04ff05ffff04ffff02ff38ffff04ff02ffff04ff17ff80808080ffff04ffff0bffff0101ff0b80ff808080808080ffffff02ff28ffff04ff02ffff04ff05ffff04ff17ffff04ffff02ff38ffff04ff02ffff04ff0bff80808080ffff04ffff0bffff0101ff0580ff80808080808080ffff02ff28ffff04ff02ffff04ff05ffff04ffff0bffff0101ff5f80ffff04ffff0bffff0101ff2f80ffff04ffff0bffff0101ff1780ffff04ffff0bffff0101ff0b80ffff04ffff0bffff0101ff0580ff808080808080808080ff02ff28ffff04ff02ffff04ff05ffff04ff17ffff04ffff0bffff0101ff0b80ffff04ffff0bffff0101ff0580ff80808080808080ffff02ff28ffff04ff02ffff04ff09ffff04ff0bffff04ffff02ff38ffff04ff02ffff04ff05ff80808080ff808080808080ffff02ff16ffff04ff02ffff04ff05ffff04ffff02ff28ffff04ff02ffff04ff0bffff04ffff0bffff0101ff8205ff80ffff04ffff0bffff0101ff8202ff80ffff04ffff0bffff0101ff82017f80ffff04ffff0bffff0101ff8200bf80ffff04ffff0bffff0101ff5f80ffff04ffff0bffff0101ff2f80ffff04ff17ffff04ffff0bffff0101ff0b80ff808080808080808080808080ff8080808080ff02ffff03ff820bffffff01ff02ffff01ff02ffff03ffff15ffff05ff8217ff80ffff018080ffff01ff02ffff01ff04ffff04ffff013effff04ffff05ff820bff80ffff01808080ffff04ffff04ffff013fffff04ffff0bffff02ff3affff04ff02ffff04ff17ffff04ff2fffff04ffff02ff12ffff04ff02ffff04ff0bffff04ffff05ff822fff80ffff04ffff05ff825fff80ff808080808080ff808080808080ffff02ff38ffff04ff02ffff04ffff04ff05ffff04ffff05ff8217ff80ffff04ff8300bfffffff04ffff05ff820bff80ffff018080808080ff8080808080ffff01808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff8200bfffff04ff82017fffff04ff8202ffffff04ff8205ffffff04ffff06ff820bff80ffff04ffff06ff8217ff80ffff04ffff06ff822fff80ffff04ffff06ff825fff80ffff04ff8300bfffffff04ffff10ffff05ff8217ff80ff83017fff80ffff04ff8302ffffffff04ff8305ffffffff04ffff02ffff03ffff02ff14ffff04ff02ffff04ffff05ff820bff80ffff04ff830bffffff8080808080ffff01ff02ffff01ff0880ff0180ffff01ff02ffff01ff04ffff05ff820bff80ff830bffff80ff018080ff0180ff8080808080808080808080808080808080808080808080ff0180ffff01ff02ffff01ff0880ff018080ff0180ff0180ffff01ff02ffff01ff04ffff04ffff0133ffff04ffff02ff2affff04ff02ffff04ff8200bfffff04ff05ffff04ff8205ffffff04ffff02ffff03ff8300bfffffff01ff02ffff01ff10ff82017fff83017fff80ff0180ffff01ff02ffff0182017fff018080ff0180ffff04ffff10ff8202ffff83017fff80ff8080808080808080ffff04ff8305ffffffff04ffff04ff5fffff018080ffff018080808080ffff04ffff04ffff0149ffff04ff8305ffffffff01808080ff8302ffff8080ff018080ff0180ff018080ffff04ffff01a01acd912fca662d1474f7a6c762280fc1430875bef518883387086c1125027526ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a037bef360ee858133b69d595a906dc45d01af50379dad515eb9518abb7c1d2a7affff04ffff01a0694c99e1fb07671771bbca3d110880693a9ecc37a6529891ec979d0f3e760ebaffff04ffff01a0a80ab006a05f8fa0156c4bec25b747075c61338c6d0c0ffe95fd04ea96c636d7ffff04ffff01a0f0d10f58714194b0db438874dca0d9738923a3d637669bb296aede4d38daf09fffff04ffff01a052d38b7cc156c8a7a47e0176599d53f1b5cfa6fad47909455383cb8e8c8a2089ffff04ffff01a041b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123ff0180808080808080808080ffff04ffff01a07fe05bacefa83bd570e4e3d83ea3f0de8ef64ad77d217c351b09c64a5c4b063bffff04ffff01a07b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22ffff04ffff01a087567752457c84454e523b375073437c73bd8d3b8d417f40db6ab82d0654bb5dffff04ffff018203e8ffff04ffff018207d0ff01808080808080",
            "passed": true,
            "proposal_id": "0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22",
            "singleton_block_height": 500777,
            "timer_coin": {
                "amount": 0,
                "parent_coin_info": "0xe0a76dce45d4f7f3f2d0710be6f515942c392931f2b2de02eb4a39adb6598eaf",
                "puzzle_hash": "0xfe39821e05ce9aa9ea830e9dbd3e61b39f20e6fa1d47ec7b9930d9d30cb23a4a"
            },
            "yes_votes": 2000
        }
    ],
    "soft_close_length": 2,
    "success": true
}
```

</details>

***

### `dao_get_proposal_state`

Functionality: Show the status of the specified DAO proposal

Usage: chia rpc wallet [OPTIONS] dao_get_proposal_state [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                             | Type   | Required | Description                                                                                     |
| :------------------------------- | ------ | :------- | :---------------------------------------------------------------------------------------------- |
| wallet_id   | NUMBER | True     | The ID of the DAO wallet from which to look up a proposal's status. Must be of type `DAOWallet` |
| proposal_id | STRING | True     | The ID of the proposal whose status you would like to show                                      |

<details>
<summary>Example</summary>

First, get all proposals, which will show their IDs:

```bash
chia rpc wallet dao_get_proposals '{"wallet_id": 2}'
```

Response (truncated):

```bash
{
    "proposal_timelock": 3,
    "proposals": [
        {
            "amount_voted": 3000,
            "closed": false,
            "passed": true,
            "proposal_id": "0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22",
            "singleton_block_height": 500777,
            "yes_votes": 2000
        }
    ],
    "soft_close_length": 2,
    "success": true
}
```

Next, include the `proposal_id` with the call for `dao_get_proposal_state` to get more info about the proposal:

```bash
chia rpc wallet dao_get_proposal_state '{"wallet_id": 2, "proposal_id": "0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22"}'
```

Response:

```bash
{
    "state": {
        "blocks_needed": 0,
        "closable": true,
        "closed": false,
        "passed": true,
        "total_votes_needed": 0,
        "yes_votes_needed": 0
    },
    "success": true
}
```

</details>

***

### `dao_get_rules`

Functionality: Shows the rules governing the specified DAO wallet

Usage: chia rpc wallet [OPTIONS] dao_get_rules [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                           | Type   | Required | Description                                                              |
| :----------------------------- | ------ | :------- | :----------------------------------------------------------------------- |
| wallet_id | NUMBER | True     | The DAO wallet from which to show the rules. Must be of type `DAOWallet` |

<details>
<summary>Example</summary>

Request:

```bash
chia rpc wallet dao_get_rules '{"wallet_id": 2}'
```

Response:

```bash
{
    "rules": {
        "attendance_required": 3000,
        "oracle_spend_delay": 2,
        "pass_percentage": 5000,
        "proposal_minimum_amount": 1000001,
        "proposal_timelock": 3,
        "self_destruct_length": 1,
        "soft_close_length": 2
    },
    "success": true
}
```

</details>

***

### `dao_get_treasury_balance`

Functionality: Show the balance of a DAO's treasury

Usage: chia rpc wallet [OPTIONS] dao_get_treasury_balance [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                           | Type   | Required | Description                                                                        |
| :----------------------------- | ------ | :------- | :--------------------------------------------------------------------------------- |
| wallet_id | NUMBER | True     | The DAO whose treasury balance you would like to show. Must be of type `DAOWallet` |

<details>
<summary>Example</summary>

Request:

```bash
chia rpc wallet dao_get_treasury_balance '{"wallet_id": 2}'
```

Response:

```bash
{
    "balances": {
        "xch": 5000000000000
    },
    "success": true
}
```

</details>

***

### `dao_get_treasury_id`

Functionality: Returns the ID of a DAO's treasury

Usage: chia rpc wallet [OPTIONS] dao_get_treasury_id [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                           | Type   | Required | Description                                                                     |
| :----------------------------- | ------ | :------- | :------------------------------------------------------------------------------ |
| wallet_id | NUMBER | True     | The DAO wallet whose ID you would like to retrieve. Must be of type `DAOWallet` |

<details>
<summary>Example</summary>

Request:

```bash
chia rpc wallet dao_get_treasury_id '{"wallet_id": 2}'
{
    "success": true,
    "treasury_id": "0x41b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123"
}
```

</details>

***

### `dao_parse_proposal`

Functionality: Show the details of the specified proposal

Usage: chia rpc wallet [OPTIONS] dao_parse_proposal [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                             | Type   | Required | Description                                                          |
| :------------------------------- | ------ | :------- | :------------------------------------------------------------------- |
| wallet_id   | NUMBER | True     | The DAO wallet where the proposal lives. Must be of type `DAOWallet` |
| proposal_id | STRING | True     | The ID of the proposal whose details you would like to show          |

<details>
<summary>Example</summary>

```bash
chia rpc wallet dao_parse_proposal '{"wallet_id": 2, "proposal_id": "0x7b10351e130317fc3f7b6d5e50aeb3b8d63db7545ef5e80836913f5741cdbb22"}'
```

Response:

```bash
{
    "proposal_dictionary": {
        "asset_conditions": [],
        "proposal_type": "s",
        "proposed_puzzle_reveal": "0xff02ffff01ff02ffff01ff04ffff04ffff0148ffff04ffff02ff18ffff04ff02ffff04ffff05ff0580ffff04ff8202ffffff04ffff02ff2cffff04ff02ffff04ff05ff80808080ff808080808080ffff01808080ffff04ffff04ffff0133ffff04ff8202ffffff04ffff0101ffff04ffff04ffff05ffff06ff058080ffff018080ffff018080808080ffff02ffff03ff17ffff01ff02ffff01ff02ff3cffff04ff02ffff04ff05ffff04ffff02ff1affff04ff02ffff04ff17ff80808080ffff04ff5fffff04ffff02ffff03ff8200bfffff01ff02ffff01ff02ff14ffff04ff02ffff04ffff05ffff05ff8200bf8080ffff04ff5fffff04ffff05ffff06ffff05ff8200bf808080ff808080808080ff0180ffff01ff02ffff01ff0180ff018080ff0180ffff04ffff02ffff03ff8200bfffff01ff02ffff01ff06ff8200bf80ff0180ffff01ff02ffff01ff0180ff018080ff0180ffff04ffff02ffff03ff8200bfffff01ff02ffff01ff05ffff06ffff05ff8200bf808080ff0180ffff01ff02ffff01ff0180ff018080ff0180ffff04ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff5fffff04ff2fffff04ff82017fffff04ff17ff808080808080808080ff80808080808080808080ff0180ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff5fffff04ff2fffff04ff82017fffff04ff17ff808080808080808080ff018080ff01808080ffff04ffff01ffffffff02ffff03ff05ffff01ff02ffff01ff02ff10ffff04ff02ffff04ffff06ff0580ffff04ffff0bffff0102ffff0bffff0101ffff010480ffff0bffff0102ffff0bffff0102ffff0bffff0101ffff010180ffff05ff058080ffff0bffff0102ff0bffff0bffff0101ffff018080808080ff8080808080ff0180ffff01ff02ffff010bff018080ff0180ff0bffff0102ffff01a0a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222ffff0bffff0102ffff0bffff0102ffff01a09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ff0580ffff0bffff0102ffff02ff10ffff04ff02ffff04ff07ffff01ffa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b280808080ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459a808080ffff02ffff03ffff22ffff09ffff0dff0580ffff012080ffff09ffff0dff0b80ffff012080ffff15ff17ffff0181ff8080ffff01ff02ffff01ff0bff05ff0bff1780ff0180ffff01ff02ffff01ff0880ff018080ff0180ffff02ffff03ffff07ff0580ffff01ff02ffff01ff0bffff0102ffff02ff2cffff04ff02ffff04ffff05ff0580ff80808080ffff02ff2cffff04ff02ffff04ffff06ff0580ff8080808080ff0180ffff01ff02ffff01ff0bffff0101ff0580ff018080ff0180ff04ffff04ffff013effff04ffff02ff2cffff04ff02ffff04ffff04ff2fffff04ffff02ff2cffff04ff02ffff01ff80808080ff808080ff80808080ff808080ffff04ffff04ffff013dffff04ffff0bff2fffff012480ff808080ffff02ffff03ff5fffff01ff02ffff01ff02ff3cffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ffff02ff14ffff04ff02ffff04ffff05ffff05ff5f8080ffff04ff17ffff04ffff05ffff06ffff05ff5f808080ff808080808080ffff04ffff06ff5f80ffff04ffff10ff8200bfffff05ffff06ffff05ff5f80808080ffff04ff82017fff80808080808080808080ff0180ffff01ff02ffff01ff02ffff03ffff15ffff11ff8200bfff0b80ffff018080ffff01ff02ffff01ff04ffff04ffff0133ffff04ff17ffff04ffff11ff8200bfff0b80ffff04ffff04ff17ffff018080ffff018080808080ff82017f80ff0180ffff01ff02ffff0182017fff018080ff0180ff018080ff01808080ffffff04ffff04ffff013effff04ffff02ff2cffff04ff02ffff04ffff04ff05ffff04ff0bff808080ff80808080ff808080ffff04ffff04ffff013dffff04ffff0bff05ffff012480ff808080ff178080ff02ffff03ff05ffff01ff02ffff01ff10ffff02ffff03ffff09ffff05ffff05ff058080ffff013380ffff01ff02ffff01ff02ffff03ffff15ffff05ffff06ffff06ffff05ff0580808080ffff018080ffff01ff02ffff01ff05ffff06ffff06ffff05ff0580808080ff0180ffff01ff02ffff01ff0180ff018080ff0180ff0180ffff01ff02ffff01ff0180ff018080ff0180ffff02ff1affff04ff02ffff04ffff06ff0580ff8080808080ff0180ffff01ff02ffff01ff0180ff018080ff0180ffff02ff18ffff04ff02ffff04ff05ffff04ff17ffff04ffff0bffff0101ff0b80ffff04ffff0bffff0101ff0580ff80808080808080ffff02ffff03ff8200bfffff01ff02ffff01ff02ff12ffff04ff02ffff04ffff02ff14ffff04ff02ffff04ffff05ffff05ff8200bf8080ffff04ff5fffff04ffff05ffff06ffff05ff8200bf808080ff808080808080ffff04ffff02ffff03ffff06ff8200bf80ffff01ff02ffff01ff02ff2cffff04ff02ffff04ffff0180ff80808080ff0180ffff01ff02ffff01ff02ff2cffff04ff02ffff04ffff04ffff0101ffff02ffff03ffff15ffff11ffff10ff82017fffff05ffff06ffff05ff8200bf80808080ff8202ff80ffff018080ffff01ff02ffff01ff04ffff04ffff0133ffff04ffff05ffff06ffff06ffff06ffff06ff018080808080ffff04ffff11ffff10ff82017fffff05ffff06ffff05ff8200bf80808080ff8202ff80ffff04ffff04ffff05ffff06ffff06ffff06ffff06ff018080808080ffff018080ffff018080808080ffff05ffff06ffff06ffff06ff018080808080ff0180ffff01ff02ffff01ff05ffff06ffff06ffff06ff0180808080ff018080ff018080ff80808080ff018080ff0180ffff04ffff02ff2effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ffff06ff8200bf80ffff04ffff10ff82017fffff05ffff06ffff05ff8200bf80808080ffff04ff8202ffffff04ff8205ffff808080808080808080808080ff808080808080ff0180ffff01ff02ffff018205ffff018080ff0180ff02ffff03ff2fffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ffff06ff2f80ffff04ffff06ff5f80ffff04ffff02ff2effff04ff02ffff04ff05ffff04ff0bffff04ffff02ffff03ffff09ffff05ffff05ff2f8080ffff05ffff05ff5f808080ffff01ff02ffff01ff05ffff06ffff05ff2f808080ff0180ffff01ff02ffff01ff0880ff018080ff0180ffff04ff17ffff04ffff02ff16ffff04ff02ffff04ff0bffff04ffff05ffff05ff5f8080ffff04ff17ff808080808080ffff04ffff05ffff06ffff05ff5f808080ffff04ffff0180ffff04ffff02ff1affff04ff02ffff04ffff05ffff06ffff05ff2f808080ff80808080ffff04ff8200bfff808080808080808080808080ff808080808080808080ff0180ffff01ff02ffff018200bfff018080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa041b28cbffdd7bbe18913ea84b75887264889ba3948fc9166881ba0bb359bd123a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a037bef360ee858133b69d595a906dc45d01af50379dad515eb9518abb7c1d2a7affff04ffff01ffff33ffa0f17580661cae1176e9f1f56376c0354a44f5c9ebee03a8f50a0d6314df8db138ff8600e8d4a510008080ffff04ffff0180ffff04ffff01a0f83e58db471eb1c4f384ff7d8df667ed46fd65122e97ea9f4e49d2a201958ae6ff01808080808080",
        "state": {
            "blocks_needed": 0,
            "closable": true,
            "closed": false,
            "passed": true,
            "total_votes_needed": 0,
            "yes_votes_needed": 0
        },
        "xch_conditions": [
            {
                "amount": 1000000000000,
                "puzzle_hash": "0xf17580661cae1176e9f1f56376c0354a44f5c9ebee03a8f50a0d6314df8db138"
            }
        ]
    },
    "success": true
}
```

</details>

***

### `dao_send_to_lockup`

Functionality: Lock DAO CATs for voting

Usage: chia rpc wallet [OPTIONS] dao_send_to_lockup [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                           | Type   | Required | Description                                                                   |
| :----------------------------- | ------ | :------- | :---------------------------------------------------------------------------- |
| wallet_id | NUMBER | True     | The ID of the wallet from which to lock DAO CATs. Must be of type `DAOWallet` |
| amount                         | NUMBEr | True     | The amount of CATs to lock for voting                                         |

***

### `dao_vote_on_proposal`

Functionality: Vote on an existing proposal

Usage: chia rpc wallet [OPTIONS] dao_vote_on_proposal [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                                                  | Type    | Required | Description                                                                                                      |
| :---------------------------------------------------- | ------- | :------- | :--------------------------------------------------------------------------------------------------------------- |
| wallet_id                        | NUMBER  | True     | The ID of the wallet where the proposal lives. Must be of type `DAOWallet`                                       |
| proposal_id                      | STRING  | True     | The ID of the proposal on which you would like to vote                                                           |
| vote_amount                      | NUMBER  | False    | The number of DAO CATs to use for this vote [Default: None]  |
| is_yes_vote | BOOLEAN | True     | A boolean indicating whether this vote is "yes" (`true`) or "no" (`false`) |
| fee                                                   | NUMBER  | False    | An optional blockchain fee, in mojos                                                                             |

***
