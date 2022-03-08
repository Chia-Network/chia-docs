---
sidebar_position: 2
---
# 13.2 Data Layer (Beta) CLI
This page includes a comprehensive list of Chia's Command Line Interface commands for interacting with the Data Layer Beta. For more info on getting set up with the Data Layer and Climate Warehouse, see our [install guide](/docs/15resources/data_layer_install_guide "Climate Warehouse install guide").

We also have documented the [RPC API](/docs/12rpcs/data_layer_rpc_api "Section 12.3: Data Layer Beta RPC API") for interacting with the Data Layer.

The relevant Data Layer commands can all be found under the `chia data` command:

```bash
(venv) $ chia data -h
```

## Commands

* [`create_data_store`](#create_data_store)
* [`get_value`](#get_value)
* [`get_keys_values`](#get_keys_values)
* [`update_data_store`](#update_data_store)
* [`get_root`](#get_root)
* [`get_root_history`](#get_root_history)
* [`subscribe`](#subscribe)
* [`unsubscribe`](#unsubscribe)
* [`get_kv_diff`](#get_kv_diff)

---

## A note on syntax

The commands in this document will work with or without the `=` symbol. Additionally, hashes may or may not be prefixed with `0x`. Thus, the following are all valid syntax for a store ID:

* `-store 77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323`
* `-store=77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323`
* `-store 0x77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323`
* `-store=0x77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323`
* `--id 77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323`
* `--id=77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323`
* `--id 0x77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323`
* `--id=0x77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323`

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

### `update_data_store`

Functionality: Update a data store with a given changelist. Triggers a Chia transaction

Usage: `chia data update_data_store [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description |
|:-------------:|:---------------:|:-------:|:--------:|:------------|
| -store        | --id            | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| -d            | --changelist    | TEXT    | True     | A JSON array representing the changelist
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |
| -m            | --fee           | TEXT    | False    | Set the fees for the transaction, in XCH [default: 0]
| -h            | --help          | None    | False    | Show a help message and exit |

A few notes on the `-d` / `--changelist` option:
  * The entire list must be formatted as a JSON array
  * There are two actions allowed: `insert` and `delete`
  * `insert` requires `key` and `value` flags
  * `delete` requires a `key` flag only
  * Keys and values must be written in hex format. Values can be derived from text or binary.
  * Labels, keys and values must all be enclosed in double quotes
  * Multiple inserts and deletes are allowed
  * The size of a single `value` flag is limited to 100 MiB. However, adding anything close to that size has not been tested and could produce unexpected results.
  * On Windows, you must escape the double quotes in the JSON array with backslashes. See below for an example. This is not required on MacOS.

Here's an example of how to insert a single key/value pair on Windows:

```powershell
PS C:\> chia data update_data_store --id=dba2f5291c17395391e6c29abefa07f7d00238967799442fbd95084eb2686e4d -d '[{\"action\":\"insert\", \"key\":\"00000003\", \"value\":\"cafef00d\"}]'
{'success': True, 'tx_id': '0x9cd9a3c40354719bdbab2f3763c3a302b56f0216a3b2079eac449695d6f70996'}
```

Each double quote (`"`) must be escaped with a backslash (`\`).

The following examples are from MacOS. It is also possible to run these commands on Windows by escaping the quotes as above.

Insert a single key/value pair:
```bash
% chia data update_data_store --id 1b4a9dba9798cb56bb2401f7bdd2f114aa655e854de0dbfa2aeb41c3ab45471f --changelist '[{"action":"insert", "key":"00000001", "value":"cafef00d"}]'
{'success': True, 'tx_id': '0xc1d30cf0a4fe0334fff89975b756831f1654293a98d5a3c6ee2fbeee873d3ecf'}
```

Delete a single key:
```bash
% chia data update_data_store --id 1b4a9dba9798cb56bb2401f7bdd2f114aa655e854de0dbfa2aeb41c3ab45471f --changelist '[{"action":"delete", "key":"00000001"}]'
{'success': True, 'tx_id': '0xf24c76e7c2f5fb89cd7e36a3cba600a411844c86e4268c0027742c76ab758fb0'}
```

Insert two keys:
```bash
% chia data update_data_store --id 1b4a9dba9798cb56bb2401f7bdd2f114aa655e854de0dbfa2aeb41c3ab45471f --changelist '[{"action":"insert", "key":"00000001", "value":"cafef00d"},{"action":"insert", "key":"00000002", "value":"fadedcab"}]'
{'success': True, 'tx_id': '0x8531075c11452f52e28a4fce4252dd6ab38bc680fc484f1481061508903c1e0a'}
```

List all keys and values after running the previous command:
```bash
% chia data get_keys_values --id 1b4a9dba9798cb56bb2401f7bdd2f114aa655e854de0dbfa2aeb41c3ab45471f 
{
    'keys_values': [{
        'atom': None, 
        'hash': '0x3735937a33f861e66504efaffb6a2d1966efd0238c71d0296329c60ac3261b45', 
        'key': '0x00000001', 
        'value': '0xcafef00d'
    }, {
        'atom': None, 
        'hash': '0x09c15143e7028c59f9f4d8aa9eedf2052188919a1677f0297e8cb7f2cc6cfec9', 
        'key': '0x00000002', 
        'value': '0xfadedcab'
    }], 
    'success': True
}
```

Note that you may not write over the top of an existing key/value pair:
```bash
% chia data update_data_store --id 1b4a9dba9798cb56bb2401f7bdd2f114aa655e854de0dbfa2aeb41c3ab45471f --changelist '[{"action":"insert", "key":"00000002", "value":"0123456789abcdef"}]'
Exception from 'data': {'error': 'Key already present: 00000002', 'success': False}
```

However, you may delete and add the same key in one command:
```bash
% chia data update_data_store --id 1b4a9dba9798cb56bb2401f7bdd2f114aa655e854de0dbfa2aeb41c3ab45471f --changelist '[{"action":"delete", "key":"00000002"},{"action":"insert", "key":"00000002", "value":"0123456789abcdef"}]'
{'success': True, 'tx_id': '0x94227eada65012ecad89d739d71a95b7111cffedcfb0856e5f6a58e3021af881'}
```

The result of the previous command is that the key/value pair has been updated:
```bash
% chia data get_keys_values --id 1b4a9dba9798cb56bb2401f7bdd2f114aa655e854de0dbfa2aeb41c3ab45471f 
{
    'keys_values': [{
        'atom': None, 
        'hash': '0x0bb5aa4e182e953717a4e0f7919fd7fcd5be413686a4021d9730b02748310983', 
        'key': '0x00000002', 
        'value': '0x0123456789abcdef'
    }], 
    'success': True
}
```

Finally, here's an actual example of a key/value pair that was inserted into the Climate Warehouse:
```bash
[{"action":"insert","key":"70726f6a6563747c37353339656336392d636238652d343464362d383832332d653062313135303162643433","value":"7b2263757272656e745265676973747279223a2243756c7469766f222c2272656769737472794f664f726967696e223a2243756c7469766f222c226f726967696e50726f6a6563744964223a224d6163546573743135222c2270726f6772616d223a224d6163546573743135222c2270726f6a6563744964223a224d6163546573743135222c2270726f6a6563744e616d65223a224d6163546573743135222c2270726f6a6563744c696e6b223a224d6163546573743135222c2270726f6a656374446576656c6f706572223a224d6163546573743135222c22736563746f72223a22456e6572677920646973747269627574696f6e222c2270726f6a65637454797065223a224f7a6f6e65204465706c6574696e67205375627374616e636573222c22636f766572656442794e4443223a224f757473696465204e4443222c226e6463496e666f726d6174696f6e223a224d6163546573743135222c2270726f6a656374537461747573223a22436f6d706c65746564222c22756e69744d6574726963223a2274434f3265222c226d6574686f646f6c6f6779223a22426173656c696e65204d6574686f646f6c6f677920666f72206465636f6d706f736974696f6e206f66204e324f2066726f6d206578697374696e672061646970696320616369642070726f64756374696f6e20706c616e7473202d2d2d2056657273696f6e20332e30222c2270726f6a65637454616773223a224d6163546573743135222c2276616c69646174696f6e426f6479223a22436172626f6e20436865636b2028496e646961292050726976617465204c74642e222c2270726f6a65637453746174757344617465223a22323032302d30332d32385430303a30303a30302e3030305a222c2276616c69646174696f6e44617465223a22323032322d30332d30315430303a30303a30302e3030305a222c2277617265686f75736550726f6a6563744964223a2237353339656336392d636238652d343464362d383832332d653062313135303162643433222c2274696d65537461676564223a313634363639343630322c226f7267556964223a2230623039643861653437626665323731366263323532383231333463653661613931616333646364663933363335616338656436626362333031626234636238227d"}]
```

The hex from this example can be decoded to obtain the following:
```bash
key = project|7539ec69-cb8e-44d6-8823-e0b11501bd43
value = {
    "currentRegistry":"Cultivo",
    "registryOfOrigin":"Cultivo",
    "originProjectId":"MacTest15",
    "program":"MacTest15",
    "projectId":"MacTest15",
    "projectName":"MacTest15",
    "projectLink":"MacTest15",
    "projectDeveloper":"MacTest15",
    "sector":"Energy distribution",
    "projectType":"Ozone Depleting Substances",
    "coveredByNDC":"Outside NDC",
    "ndcInformation":"MacTest15",
    "projectStatus":"Completed",
    "unitMetric":"tCO2e",
    "methodology":"Baseline Methodology for decomposition of N2O from existing adipic acid production plants --- Version 3.0",
    "projectTags":"MacTest15",
    "validationBody":"Carbon Check (India) Private Ltd.",
    "projectStatusDate":"2020-03-28T00:00:00.000Z",
    "validationDate":"2022-03-01T00:00:00.000Z",
    "warehouseProjectId":"7539ec69-cb8e-44d6-8823-e0b11501bd43",
    "timeStaged":1646694602,
    "orgUid":"0b09d8ae47bfe2716bc25282134ce6aa91ac3dcdf93635ac8ed6bcb301bb4cb8"
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
$ chia data subscribe --id=d6ae899e99f813181527605180a92ace6c5020fb8bc2c6eca7ac9b5a1a656eac --ip=92.115.141.83 --port=8575
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