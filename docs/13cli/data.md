---
sidebar_position: 2
---
# 13.2 Data Layer CLI
This page includes a comprehensive list of Chia's Command Line Interface commands for interacting with the Data Layer. For more info on getting set up with the Data Layer and Climate Warehouse, see our [install guide](/docs/15resources/data_layer_install_guide_testnet "Climate Warehouse install guide").

We also have documented the [RPC API](/docs/12rpcs/data_layer_rpc_api "Section 12.3: Data Layer RPC API") for interacting with the Data Layer.

The relevant Data Layer commands can all be found under the `chia data` command:

```bash
(venv) $ chia data -h
```

## Commands

* [`create_data_store`](#create_data_store)
* [`update_data_store`](#update_data_store)
* [`get_value`](#get_value)
* [`get_keys_values`](#get_keys_values)
* [`get_root`](#get_root)
* [`get_root_history`](#get_root_history)
* [`subscribe`](#subscribe)
* [`unsubscribe`](#unsubscribe)
* [`get_kv_diff`](#get_kv_diff)

---

## Reference

### `create_data_store`

Functionality: Create a data store. Triggers a Chia transaction

Usage: `chia data create_data_store [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description |
|:-------------:|:---------------:|:-------:|:--------:|:------------|
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml
| -m            | --fee           | TEXT    | False    | Set the fees for the transaction, in XCH [default: 0]
| -h            | --help          | None    | False    | Show a help message and exit

Example:

```bash
$ chia data create_data_store
{
    'id': '50c3648de0dc2064eaedd19e275d950b487b57ec23a6615bcf2c6fab7b5b58f7', 
    'success': True, 
    'txs': [{
        'additions': [{
            'amount': 1, 
            'parent_coin_info': '0x92dd272817cf7814d86338a7e7e5945a4bc8a5222891728a3a06545178d16f04', 
            'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
        }, {
            'amount': 998999999998, 
            'parent_coin_info': '0x92dd272817cf7814d86338a7e7e5945a4bc8a5222891728a3a06545178d16f04', 
            'puzzle_hash': '0xae59d515aff4cc6c2840b82c610168d5725043ab983d2f8449e83681fc2bde02'
        }, {
            'amount': 1, 
            'parent_coin_info': '0x50c3648de0dc2064eaedd19e275d950b487b57ec23a6615bcf2c6fab7b5b58f7', 
            'puzzle_hash': '0x88650011449454daa76a30c272642c31a9b0e384fa1c9e37200616db5858749c'
        }], 
        'amount': 1, 
        'confirmed': False, 
        'confirmed_at_height': 0, 
        'created_at_time': 1645514090, 
        'fee_amount': 1000000000, 
        'memos': [], 
        'name': '0x6babd7bdc4c55d37768d23d1c7e0115b8672faa447908cfbc6ff104214a94f4e', 
        'removals': [{
            'amount': 999999999999, 
            'parent_coin_info': '0xf20edd8399b91c80ae652829725ee8975e86b43f90ed20294ab6e9d1828ede3b', 
            'puzzle_hash': '0x109e87d281922344d68b553c70e5a13666655e19d99b58d85b5e21560185274e'
        }, {
            'amount': 1, 
            'parent_coin_info': '0x92dd272817cf7814d86338a7e7e5945a4bc8a5222891728a3a06545178d16f04', 
            'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
        }], 
        'sent': 10, 
        'sent_to': [], 
        'spend_bundle': {
            'aggregated_signature': '0x80adefc1147d03799346bf1a84284286c4fd1c1422ed1cf57bed138547b774f658aa0dcbd5384abea283e21746da2f0a1161ef544c927a172c5b9a43fc456c544d544eca10e3d1c1f67af90cb1dd0815b96e24fad7ecd15287ae1a1a161bfe83', 
            'coin_spends': [{
                'coin': {
                    'amount': 999999999999, 
                    'parent_coin_info': '0xf20edd8399b91c80ae652829725ee8975e86b43f90ed20294ab6e9d1828ede3b', 
                    'puzzle_hash': '0x109e87d281922344d68b553c70e5a13666655e19d99b58d85b5e21560185274e'
                },
                'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b2751fe6686845dcfa4b4a09c7bdddbe627dbca2e30331554054f506f54e6e98c6131535d7a58b086110c6ef413bec91ff018080', 
                'solution': '0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa0ae59d515aff4cc6c2840b82c610168d5725043ab983d2f8449e83681fc2bde02ff8600e8990a45fe80ffff34ff843b9aca0080ffff3cffa0f98a09948a0986b4adabf7f08a1f714fd4c0cfc2f6471768926e3301698819aa80ffff3dffa0886d7631ff04f125f9461bedb35da959cfda83a2b3738ea3903b0dbb47143d368080ff8080'
            }, {
                'coin': {
                    'amount': 1, 
                    'parent_coin_info': '0x92dd272817cf7814d86338a7e7e5945a4bc8a5222891728a3a06545178d16f04', 
                    'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
                }, 
                'puzzle_reveal': '0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080', 'solution': '0xffa088650011449454daa76a30c272642c31a9b0e384fa1c9e37200616db5858749cff01ffffa00000000000000000000000000000000000000000000000000000000000000000ffa06d2186002e54ae09a8dcc497854ab49a5ce9e2c8079f40753ed55d9cdfa5b9a68080'
                }
            ]
        }, 
        'to_puzzle_hash': '0x0202020202020202020202020202020202020202020202020202020202020202', 
        'trade_id': None, 
        'type': 0, 
        'wallet_id': 0
    }, 
    {
        'additions': [{
            'amount': 1, 
            'parent_coin_info': '0x92dd272817cf7814d86338a7e7e5945a4bc8a5222891728a3a06545178d16f04', 
            'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
        }, {
            'amount': 998999999998, 
            'parent_coin_info': '0x92dd272817cf7814d86338a7e7e5945a4bc8a5222891728a3a06545178d16f04', 
            'puzzle_hash': '0xae59d515aff4cc6c2840b82c610168d5725043ab983d2f8449e83681fc2bde02'
            }
        ], 
        'amount': 1, 
        'confirmed': False, 
        'confirmed_at_height': 0, 
        'created_at_time': 1645514090, 
        'fee_amount': 1000000000, 
        'memos': [], 
        'name': '0xf368e5c3006eb4cea2ef52a242b4f7d2e1fd2715223d636619232ae45c175755', 
        'removals': [{
            'amount': 999999999999, 
            'parent_coin_info': '0xf20edd8399b91c80ae652829725ee8975e86b43f90ed20294ab6e9d1828ede3b', 
            'puzzle_hash': '0x109e87d281922344d68b553c70e5a13666655e19d99b58d85b5e21560185274e'
        }], 
            'sent': 0, 
            'sent_to': [], 
            'spend_bundle': None, 
            'to_puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9', 
            'trade_id': None, 
            'type': 1, 
            'wallet_id': 1
    }
]}
```
---

### `update_data_store`

Functionality: Update a data store with a given changelist. Triggers a Chia transaction

Usage: `chia data subscribe [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description |
|:-------------:|:---------------:|:-------:|:--------:|:------------|
| -store        | --id            | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| -d            | --changelist    | TEXT    | True     | A string representing the changelist
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |
| -m            | --fee           | TEXT    | False    | Set the fees for the transaction, in XCH [default: 0]
| -h            | --help          | None    | False    | Show a help message and exit |

Example:

```bash
```
---

### `get_value`

Functionality: Get a value from a Store's key.

Usage: `chia data get_value [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description |
|:-------------:|:---------------:|:-------:|:--------:|:------------|
| -store        | --id            | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
|               | --key           | TEXT    | True     | The hexidecimal key. Optionally can be prefixed with 0x |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml
| -h            | --help          | None    | False    | Show a help message and exit

Example:

```bash
$ chia data get_value --id 0x77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323 --key 0x6e616d65
{
    'success': True, 
    'value': '454d4c4d616354657374'
}
```
---

### `get_keys_values`

Functionality: Get all keys and values for a store. Must be subscribed to store ID

Usage: `chia data get_keys_values [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description |
|:-------------:|:---------------:|:-------:|:--------:|:------------|
| -store        | --id            | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml
| -h            | --help          | None    | False    | Show a help message and exit

Example:

```bash
$ chia data get_keys_values --id 77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323
{
    'keys_values': [{
        'atom': None, 
        'hash': '0x53705e5461959a448dbd3e1482cce31849b7f989fee3e1af80b8079dd67b9bc8', 
        'key': '0x6e616d65', 
        'value': '0x454d4c4d616354657374'
    }, {
        'atom': None, 
        'hash': '0xb5d1dad0b950127a48fbe673965711a982745fc758484301622fb65e0a1e2d1f', 
        'key': '0x72656769737472794964', 
        'value': '0x35333131343663333266323237323034373461393732393934373764303361313134613662316337363237626534383934386161653162636265306131336336'
    }, {
        'atom': None, 
        'hash': '0x33a91b13c071b5177151796dd1fd3aac3ddd79918599d6816ef607194d8601ff', 
        'key': '0x69636f6e', 
        'value': '0x68747470733a2f2f636c696d6174652d77617265686f7573652e73332e75732d776573742d322e616d617a6f6e6177732e636f6d2f7075626c69632f6f7267732f6d652e737667'
    }],
    'success': True
}
```
---

### `get_root`

Functionality: Get the Merkle Root and timestamp of a given store ID

Usage: `chia data get_root [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description |
|:-------------:|:---------------:|:-------:|:--------:|:------------|
| -store        | --id            | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562)
| -h            | --help          | None    | False    | Show a help message and exit

Example:

```bash
$ chia data get_root --id 0x7c256cee3b1bda974259ae5e887bcd5b86c88bc49e353aaf3533a7823d93be42
{
    'confirmed': True, 
    'hash': '0x1714ec438ddb0846425a1e47352b5e17e723d9ce27924ed0c5cec338c7a56b69', 
    'success': True, 
    'timestamp': 1645404216
}
```
---

### `get_root_history`

Functionality: Get a history of root hashes for a Store ID that you subscribe to

Usage: `chia data subscribe [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description |
|:-------------:|:---------------:|:-------:|:--------:|:------------|
| -store        | --id            | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |
| -h            | --help          | None    | False    | Show a help message and exit |

Example:

```bash
$ chia data get_root_history --id 77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323
{
    'root_history': [{
        'confirmed': True, 
        'root_hash': '0x0000000000000000000000000000000000000000000000000000000000000000', 
        'timestamp': 1645488936
    }, {
        'confirmed': True, 
        'root_hash': '0x622b04ae13c05989f0fb5398b286d27a91ff258f9ad26794477df5480de6c184', 
        'timestamp': 1645489999
    }], 
    'success': True
}
```
---

### `subscribe`

Functionality: Subscribe to a store ID

Usage: `chia data subscribe [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description |
|:-------------:|:---------------:|:-------:|:--------:|:------------|
| -store        | --id            | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| -ip           | --ip            | TEXT    | True     | The IP address or URL of the store ID to subscribe to |
| -port         | --port          | INTEGER | True     | The port the store ID is running on |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |
| -h            | --help          | None    | False    | Show a help message and exit |

Example:

```bash
$ chia data subscribe --id=d6ae899e99f813181527605180a92ace6c5020fb8bc2c6eca7ac9b5a1a656eac --ip=92.115.141.83 --port=8000
```
---

### `unsubscribe`

Functionality: Unsubscribe from a store ID

Usage: `chia data subscribe [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description |
|:-------------:|:---------------:|:-------:|:--------:|:------------|
| -store        | --id            | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |
| -h            | --help          | None    | False    | Show a help message and exit |

Example:

```bash
$ chia data unsubscribe --id=d6ae899e99f813181527605180a92ace6c5020fb8bc2c6eca7ac9b5a1a656eac
```
---

### `get_kv_diff`

Functionality: Get the kv diff between two hashes within the same store ID

Usage: `chia data get_kv_diff [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description |
|:-------------:|:---------------:|:-------:|:--------:|:------------|
| -store        | --id            | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| -hash_1       | --hash_1        | TEXT    | True     | The first hash to compare |
| -hash_2       | --hash_2        | TEXT    | True     | The second hash to compare |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml
| -h            | --help          | None    | False    | Show a help message and exit

Example:

```bash
$ chia data get_kv_diff --id 77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323 --hash_1 53705e5461959a448dbd3e1482cce31849b7f989fee3e1af80b8079dd67b9bc8 --hash_2 33a91b13c071b5177151796dd1fd3aac3ddd79918599d6816ef607194d8601ff
{
    'diff': [{
        'key': '69636f6e', 
        'type': 'INSERT', 
        'value': '68747470733a2f2f636c696d6174652d77617265686f7573652e73332e75732d776573742d322e616d617a6f6e6177732e636f6d2f7075626c69632f6f7267732f6d652e737667'
    }, {
        'key': '6e616d65', 
        'type': 'DELETE', 
        'value': '454d4c4d616354657374'
    }], 
    'success': True
}
```