---
sidebar_position: 3
---
# 12.3 Data Layer (Beta) RPC API
This page includes a comprehensive list of Chia's Data Layer Beta RPC API. For more info on getting set up with the Data Layer and Climate Warehouse, see our [install guide](/docs/15resources/data_layer_install_guide "Climate Warehouse install guide").

We also have documented the [CLI](/docs/13cli/data "Section 13.2: Data Layer (Beta) CLI") commands for interacting with the Data Layer.

The data layer RPC API is exposed by default on port 8562. This port must not be exposed publicly for
security concerns.

Note: Hashes used as arguments for the commands documented here may or may not be prefixed with `0x`. Both forms are valid syntax.

## Commands

* [`create_data_store`](#create_data_store)
* [`batch_update`](#batch_update)
* [`get_value`](#get_value)
* [`get_keys_values`](#get_keys_values)
* [`get_ancestors`](#get_ancestors)
* [`get_root`](#get_root)
* [`get_local_root`](#get_local_root)
* [`get_roots`](#get_roots)
* [`delete_key`](#delete_key)
* [`insert`](#insert)
* [`subscribe`](#subscribe)
* [`unsubscribe`](#unsubscribe)
* [`get_kv_diff`](#get_kv_diff)
* [`get_root_history`](#get_root_history)
* [`get_connections`](#get_connections)
* [`open_connection`](#open_connection)
* [`close_connection`](#close_connection)
* [`stop_node`](#stop_node)
* [`get_routes`](#get_routes)

---

## Reference

### `create_data_store`

Functionality: Create a data store. Triggers a Chia transaction

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use
| data-rpc-port   | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml
| fee             | TEXT    | False    | Set the fees for the transaction, in XCH [default: 0]

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/create_data_store' --header 'Content-Type: application/json' --data-raw '{
   }'

// Response
{
    "id": "b095f6f2adabc54537c45d9cf65b094eb279f6907cb18edd1cf23a8cd703db74", "success": true, "txs": [{
        "additions": [{
            "amount": 1, 
            "parent_coin_info": "0xa6d9ccabc51aa2f4ed6514d161d7771e246c27cba0389ad1e2441acaca2a0f21", 
            "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
        }, {
            "amount": 997999999997, 
            "parent_coin_info": "0xa6d9ccabc51aa2f4ed6514d161d7771e246c27cba0389ad1e2441acaca2a0f21", 
            "puzzle_hash": "0xe6d660ef3c7039fb16e4c42aeb9224e1a2e9e700f6c5fdaa5c6bf783af652ec6"
        }, {
            "amount": 1, 
            "parent_coin_info": "0xb095f6f2adabc54537c45d9cf65b094eb279f6907cb18edd1cf23a8cd703db74", 
            "puzzle_hash": "0xba25bb141776fd8f0c8bf707023512371cc2cc393b1c8a89fc235e80999e0265"
        }], 
        "amount": 1, 
        "confirmed": false, 
        "confirmed_at_height": 0, 
        "created_at_time": 1645586796, 
        "fee_amount": 1000000000, 
        "memos": [], 
        "name": "0xa51770577a97c2ab4bc2302937e4bf2ea7bbfcc5cce3a9e8d25fb4da3a4a0ee5", 
        "removals": [{
            "amount": 998999999998, 
            "parent_coin_info": "0x92dd272817cf7814d86338a7e7e5945a4bc8a5222891728a3a06545178d16f04", 
            "puzzle_hash": "0xae59d515aff4cc6c2840b82c610168d5725043ab983d2f8449e83681fc2bde02"
        }, {
            "amount": 1, 
            "parent_coin_info": "0xa6d9ccabc51aa2f4ed6514d161d7771e246c27cba0389ad1e2441acaca2a0f21", 
            "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
        }],
        "sent": 10, 
        "sent_to": [], 
        "spend_bundle": {
            "aggregated_signature": "0x91c0e68fbd711a4c0bfb99a93ee2eb6f26ec5e1cc7053a04bcaeae900b3d51d058816b0525de67316ee3ec7c09bc1201165162ac4a6c5c14f15d8d9a15674b7d75ab8455871bccc3b904a229f3667636563210de18df7cb0a5482cf21b9d3478",
            "coin_spends": [{
                "coin": {
                    "amount": 998999999998, 
                    "parent_coin_info": "0x92dd272817cf7814d86338a7e7e5945a4bc8a5222891728a3a06545178d16f04", 
                    "puzzle_hash": "0xae59d515aff4cc6c2840b82c610168d5725043ab983d2f8449e83681fc2bde02"
                },
                "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b09721dfe00fd10528d92580a053a43daed699e410644bbe06cf462c1f6235fec5e5950694ac663f3568c070daa2477dcbff018080", 
                "solution": "0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa0e6d660ef3c7039fb16e4c42aeb9224e1a2e9e700f6c5fdaa5c6bf783af652ec6ff8600e85d6f7bfd80ffff34ff843b9aca0080ffff3cffa05d13d119a0b6ee962c8c5956d547fd20a5f245a0a5c6221fd1f8084bfd49c1eb80ffff3dffa03c1dd2c47f9dafc87c43415c7c845556c4fa9e5c450923449359ac668fa4d5248080ff8080"
            }, {
                "coin": {
                    "amount": 1, 
                    "parent_coin_info": "0xa6d9ccabc51aa2f4ed6514d161d7771e246c27cba0389ad1e2441acaca2a0f21", 
                    "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
                }, 
                "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080", 
                "solution": "0xffa0ba25bb141776fd8f0c8bf707023512371cc2cc393b1c8a89fc235e80999e0265ff01ffffa00000000000000000000000000000000000000000000000000000000000000000ffa08860049f3b52656d8b9584181c2f43c43c5fa8fb6a9ef616438051059abc3adf8080"
            }]
        }, 
        "to_puzzle_hash": "0x0202020202020202020202020202020202020202020202020202020202020202", 
        "trade_id": null, 
        "type": 0, 
        "wallet_id": 0
    }, {
        "additions": [{
            "amount": 1, 
            "parent_coin_info": "0xa6d9ccabc51aa2f4ed6514d161d7771e246c27cba0389ad1e2441acaca2a0f21", 
            "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea100  4745  100  4739  100     6  14752     18 --:--:-- --:--:-- --:--:-- 14781e1a2e9e700f6c5fdaa5c6bf783af652ec6"
        }], 
        "amount": 1, 
        "confirmed": false, 
        "confirmed_at_height": 0, 
        "created_at_time": 1645586796, 
        "fee_amount": 1000000000, 
        "memos": [], 
        "name": "0x1cb35de79b348d20c4545dc06bf60838ca718527db8cd0098d8883843ae9cdad", 
        "removals": [{
            "amount": 998999999998, 
            "parent_coin_info": "0x92dd272817cf7814d86338a7e7e5945a4bc8a5222891728a3a06545178d16f04", 
            "puzzle_hash": "0xae59d515aff4cc6c2840b82c610168d5725043ab983d2f8449e83681fc2bde02"
        }], 
        "sent": 0, 
        "sent_to": [], 
        "spend_bundle": null, 
        "to_puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9", 
        "trade_id": null, 
        "type": 1, 
        "wallet_id": 1
    }
    ]
}
```
---

### `batch_update`

Functionality: Apply multiple updates to a data store with a given changelist. Triggers a Chia transaction

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| id              | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| changelist      | TEXT    | True     | A string representing the changelist
| data-rpc-port   | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |

A few notes on the `changelist` option:
  * The entire list must be formatted as a JSON array
  * There are two actions allowed: `insert` and `delete`
  * `insert` requires `key` and `value` flags
  * `delete` requires a `key` flag only
  * Keys and values must be written in hex format. Values can be derived from text or binary.
  * Labels, keys and values must all be enclosed in double quotes
  * Multiple inserts and deletes are allowed
  * The size of a single `value` flag is limited to 100 MiB. However, adding anything close to that size has not been tested and could produce unexpected results.

The following examples will show the basic functionality of this command.

Insert a single key/value pair:
```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/batch_update' --header 'Content-Type: application/json' --data-raw '{
     "id": "dba2f5291c17395391e6c29abefa07f7d00238967799442fbd95084eb2686e4d",
     "changelist": [{"action":"insert", "key":"00000001", "value":"cafef00d"}]
   }'

// Response
{"success": true, "tx_id": "0x4ae9b68ee812d358366db5f3ce860d4a6d1c4e8edcfef07632ce2c0ad040f51f"}
```

Delete a single key:
```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/batch_update' --header 'Content-Type: application/json' --data-raw '{
     "id": "dba2f5291c17395391e6c29abefa07f7d00238967799442fbd95084eb2686e4d",
     "changelist": [{"action":"delete", "key":"00000001"}]
   }'

// Response
{"success": true, "tx_id": "0x0bf43d545a5d8f09f1aacaaef02c3145b3bb2e9cf0f5301828beaf445ae87494"}
```

Insert two keys:
```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/batch_update' --header 'Content-Type: application/json' --data-raw '{
     "id": "dba2f5291c17395391e6c29abefa07f7d00238967799442fbd95084eb2686e4d",
     "changelist": [{"action":"insert", "key":"00000001", "value":"cafef00d"},{"action":"insert", "key":"00000002", "value":"fadedcab"}]
   }'

// Response
{"success": true, "tx_id": "0x49e9268e8ebd593098f4278ebcd18d70a6c1d423f8a9b1b3e79acb5c30d8647d"}
```

List all keys and values after running the previous command:
```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/get_keys_values' --header 'Content-Type: application/json' --data-raw '{
     "id": "dba2f5291c17395391e6c29abefa07f7d00238967799442fbd95084eb2686e4d"
   }'

// Response
{
    "keys_values": [{
        "atom": null, 
        "hash": "0x09c15143e7028c59f9f4d8aa9eedf2052188919a1677f0297e8cb7f2cc6cfec9", 
        "key": "0x00000002", 
        "value": "0xfadedcab"
    }, {
        "atom": null, 
        "hash": "0x3735937a33f861e66504efaffb6a2d1966efd0238c71d0296329c60ac3261b45", 
        "key": "0x00000001", 
        "value": "0xcafef00d"
    }], 
    "success": true
}
```


Note that you may not write over the top of an existing key/value pair:
```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/batch_update' --header 'Content-Type: application/json' --data-raw '{
     "id": "dba2f5291c17395391e6c29abefa07f7d00238967799442fbd95084eb2686e4d",
     "changelist": [{"action":"insert", "key":"00000002", "value":"0123456789abcdef"}]
   }'

// Response
{"error": "Key already present: 00000002", "success": false}
```

However, you may delete and add the same key in one command:
```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/batch_update' --header 'Content-Type: application/json' --data-raw '{
     "id": "dba2f5291c17395391e6c29abefa07f7d00238967799442fbd95084eb2686e4d",
     "changelist": [{"action":"delete", "key":"00000002"},{"action":"insert", "key":"00000002", "value":"0123456789abcdef"}]
   }'

// Response
{"success": true, "tx_id": "0x4eb4e0daa5dfb19b3ca2c70dfee0f3d4086820480267b29accd1dc3cc2720d67"}
```

The result of the previous command is that the key/value pair has been updated:
```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/get_keys_values' --header 'Content-Type: application/json' --data-raw '{
     "id": "dba2f5291c17395391e6c29abefa07f7d00238967799442fbd95084eb2686e4d"
   }'

// Response
{
    "keys_values": [{
        "atom": null, 
        "hash": "0x0bb5aa4e182e953717a4e0f7919fd7fcd5be413686a4021d9730b02748310983", 
        "key": "0x00000002", 
        "value": "0x0123456789abcdef"
    }, {
        "atom": null, 
        "hash": "0x3735937a33f861e66504efaffb6a2d1966efd0238c71d0296329c60ac3261b45", 
        "key": "0x00000001", 
        "value": "0xcafef00d"
    }], 
    "success": true
}
```

Finally, here's an actual example of a key/value pair that was inserted into the Climate Warehouse:
```json
[{"action":"insert","key":"70726f6a6563747c37353339656336392d636238652d343464362d383832332d653062313135303162643433","value":"7b2263757272656e745265676973747279223a2243756c7469766f222c2272656769737472794f664f726967696e223a2243756c7469766f222c226f726967696e50726f6a6563744964223a224d6163546573743135222c2270726f6772616d223a224d6163546573743135222c2270726f6a6563744964223a224d6163546573743135222c2270726f6a6563744e616d65223a224d6163546573743135222c2270726f6a6563744c696e6b223a224d6163546573743135222c2270726f6a656374446576656c6f706572223a224d6163546573743135222c22736563746f72223a22456e6572677920646973747269627574696f6e222c2270726f6a65637454797065223a224f7a6f6e65204465706c6574696e67205375627374616e636573222c22636f766572656442794e4443223a224f757473696465204e4443222c226e6463496e666f726d6174696f6e223a224d6163546573743135222c2270726f6a656374537461747573223a22436f6d706c65746564222c22756e69744d6574726963223a2274434f3265222c226d6574686f646f6c6f6779223a22426173656c696e65204d6574686f646f6c6f677920666f72206465636f6d706f736974696f6e206f66204e324f2066726f6d206578697374696e672061646970696320616369642070726f64756374696f6e20706c616e7473202d2d2d2056657273696f6e20332e30222c2270726f6a65637454616773223a224d6163546573743135222c2276616c69646174696f6e426f6479223a22436172626f6e20436865636b2028496e646961292050726976617465204c74642e222c2270726f6a65637453746174757344617465223a22323032302d30332d32385430303a30303a30302e3030305a222c2276616c69646174696f6e44617465223a22323032322d30332d30315430303a30303a30302e3030305a222c2277617265686f75736550726f6a6563744964223a2237353339656336392d636238652d343464362d383832332d653062313135303162643433222c2274696d65537461676564223a313634363639343630322c226f7267556964223a2230623039643861653437626665323731366263323532383231333463653661613931616333646364663933363335616338656436626362333031626234636238227d"}]
```

The hex from this example can be decoded to obtain the following:
```json
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

### `get_value`

Functionality: Given a key and the Store in which the key is located, return corresponding value

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| id              | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| key             | TEXT    | True     | The hexidecimal key. Optionally can be prefixed with 0x |
| data-rpc-port   | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml |

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/get_value' --header 'Content-Type: application/json' --data-raw '{
     "id": "77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323",
     "key": "0x6e616d65"
   }'

// Response
{
    "success": true, 
    "value": "454d4c4d616354657374"
}
```
---

### `get_keys_values`

Functionality: Get all keys and values for a store. Must be subscribed to store ID

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| id              | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| data-rpc-port   | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml

Example:
```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/get_keys_values' --header 'Content-Type: application/json' --data-raw '{
     "id": "77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323"
   }'

// Response
{
    "keys_values": [{
        "atom": null, 
        "hash": "0x53705e5461959a448dbd3e1482cce31849b7f989fee3e1af80b8079dd67b9bc8", 
        "key": "0x6e616d65", 
        "value": "0x454d4c4d616354657374"
    }, {
        "atom": null, 
        "hash": "0xb5d1dad0b950127a48fbe673965711a982745fc758484301622fb65e0a1e2d1f", 
        "key": "0x72656769737472794964", 
        "value": "0x35333131343663333266323237323034373461393732393934373764303361313134613662316337363237626534383934386161653162636265306131336336"
    }, {
        "atom": null, 
        "hash": "0x33a91b13c071b5177151796dd1fd3aac3ddd79918599d6816ef607194d8601ff", 
        "key": "0x69636f6e", 
        "value": "0x68747470733a2f2f636c696d6174652d77617265686f7573652e73332e75732d776573742d322e616d617a6f6e6177732e636f6d2f7075626c69632f6f7267732f6d652e737667"
    }], 
        "success": true
}
```
---

### `get_ancestors`

Functionality: Return all ancestors of a given hash

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| id              | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| hash            | TEXT    | True     | The hash from which to display ancestors. Optionally can be prefixed with 0x |
| data-rpc-port   | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml

Example:
```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/get_ancestors' --header 'Content-Type: application/json' --data-raw '{
     "id": "77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323",
     "hash": "0x53705e5461959a448dbd3e1482cce31849b7f989fee3e1af80b8079dd67b9bc8"
   }'

// Response
{"ancestors": [], "success": true}
```
---

### `get_root`

Functionality: Get the root hash and timestamp of a given store ID

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| id              | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| data-rpc-port   | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/get_root' --header 'Content-Type: application/json' --data-raw '{
     "id": "b095f6f2adabc54537c45d9cf65b094eb279f6907cb18edd1cf23a8cd703db74"
   }'

// Response
{
    "confirmed": true, 
    "hash": "0x1c063d99ea67934c48d951efba9166f02805606d53892c71c2b16ea1308832f0", 
    "success": true, 
    "timestamp": 1645603629
}
```
---

### `get_local_root`

Functionality: Get the root hash and timestamp of a local store ID. Does not work for remote stores.

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| id              | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| data-rpc-port   | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/get_local_root' --header 'Content-Type: application/json' --data-raw '{
     "id": "b095f6f2adabc54537c45d9cf65b094eb279f6907cb18edd1cf23a8cd703db74"
   }'

// Response
{
    "hash": "0x1c063d99ea67934c48d951efba9166f02805606d53892c71c2b16ea1308832f0", 
    "success": true
}
```
---

### `get_roots`

Functionality: Get the root hashes and timestamps from a list of stores

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| ids             | TEXT    | True     | A list of hexidecimal store IDs. Each ID optionally can be prefixed with 0x |
| data-rpc-port   | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/get_roots' --header 'Content-Type: application/json' --data-raw '{
     "ids": [
         "b095f6f2adabc54537c45d9cf65b094eb279f6907cb18edd1cf23a8cd703db74", 
         "77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323"
     ]
   }'

// Response
{
    "root_hashes": [{
        "confirmed": true, 
        "hash": "0x1c063d99ea67934c48d951efba9166f02805606d53892c71c2b16ea1308832f0", 
        "id": "0xb095f6f2adabc54537c45d9cf65b094eb279f6907cb18edd1cf23a8cd703db74", 
        "timestamp": 1645603629
    }, {
        "confirmed": true, 
        "hash": "0x622b04ae13c05989f0fb5398b286d27a91ff258f9ad26794477df5480de6c184", 
        "id": "0x77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323", 
        "timestamp": 1645489999
    }], 
    "success": true
}
```
---

### `delete_key`

Functionality: Delete a key/value pair from a store that you control. Triggers a Chia transaction

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| id              | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| key             | TEXT    | True     | The hexidecimal key. Optionally can be prefixed with 0x |
| fee             | TEXT    | False    | Set the fees for the transaction, in XCH [default: 0]
| data-rpc-port   | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/delete_key' --header 'Content-Type: application/json' --data-raw '{
     "id": "b095f6f2adabc54537c45d9cf65b094eb279f6907cb18edd1cf23a8cd703db74",
     "key": "0003",
     "fee": 0.0001
   }'

// Response
{
    "success": true, 
    "tx_id": "0x82d8cbf4283beaf9362d8faab6e38527ade2c62e18a608b189b482c7fbd4f038"
}
```
---

### `insert`

Functionality: Insert a key/value pair into a store that you control. Triggers a Chia transaction

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| id              | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| key             | TEXT    | True     | The hexidecimal key. Optionally can be prefixed with 0x |
| value           | TEXT    | True     | The hexidecimal value. Optionally can be prefixed with 0x |
| fee             | TEXT    | False    | Set the fees for the transaction, in XCH [default: 0]
| data-rpc-port   | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/insert' --header 'Content-Type: application/json' --data-raw '{
     "id": "b095f6f2adabc54537c45d9cf65b094eb279f6907cb18edd1cf23a8cd703db74",
     "key": "0001",
     "value": "fadedcab"
   }'

// Response
{
    "success": true, 
    "tx_id": "0x94a55a58eda8c6e5c82f574eeb0475318d09202d062b66d735d6f15f3862606f"
}
```
---

### `subscribe`

Functionality: Subscribe to a store ID

Usage: `chia data subscribe [OPTIONS]`

Options:

| Flag          | Type    | Required | Description |
|:-------------:|:-------:|:--------:|:------------|
| id            | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| ip            | TEXT    | True     | The IP address or URL of the store ID to subscribe to |
| port          | INTEGER | True     | The port the store ID is running on |
| data-rpc-port | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/subscribe' --header 'Content-Type: application/json' --data-raw '{
     "id": "26462fbf4a10175dbc6945dd3fda35e05da845532f585d79097e06d77ef7165e",
     "ip": "71.121.237.241",
     "port": 8575
   }'

// Response
{
    "success": true
}
```
---

### `unsubscribe`

Functionality: Unsubscribe from a store ID

Options:

| Flag          | Type    | Required | Description |
|:-------------:|:-------:|:--------:|:------------|
| id            | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/unsubscribe' --header 'Content-Type: application/json' --data-raw '{
     "id": "26462fbf4a10175dbc6945dd3fda35e05da845532f585d79097e06d77ef7165e"
   }'

// Response
{
    "success": true
}
```
---

### `get_kv_diff`

Functionality: Get the kv diff between two hashes within the same store ID

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| id              | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| hash_1          | TEXT    | True     | The first hash to compare |
| hash_2          | TEXT    | True     | The second hash to compare |
| data-rpc-port   | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/get_kv_diff' --header 'Content-Type: application/json' --data-raw '{
     "id": "77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323",
     "hash_1": "53705e5461959a448dbd3e1482cce31849b7f989fee3e1af80b8079dd67b9bc8",
     "hash_2": "33a91b13c071b5177151796dd1fd3aac3ddd79918599d6816ef607194d8601ff"
   }'

// Response
{
    "diff": [{
        "key": "69636f6e", 
        "type": "INSERT", 
        "value": "68747470733a2f2f636c696d6174652d77617265686f7573652e73332e75732d776573742d322e616d617a6f6e6177732e636f6d2f7075626c69632f6f7267732f6d652e737667"
    }, {
        "key": "6e616d65", 
        "type": "DELETE", 
        "value": "454d4c4d616354657374"
    }], 
    "success": true}
```
---

### `get_root_history`

Functionality: Get a history of root hashes for a Store ID that you subscribe to

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| id              | TEXT    | True     | The hexidecimal store ID. Optionally can be prefixed with 0x |
| data-rpc-port   | INTEGER | False    | Set the port where the data layer is hosting the RPC interface. See rpc_port under data_layer in config.yaml (default is 8562) |

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/get_root_history' --header 'Content-Type: application/json' --data-raw '{
     "id": "77fd0011c477911a8daa93dd8e09c8081155bbb24a02f4b4b94a7a6f0912b323"
   }'

// Response
{
    "root_history": [{
        "confirmed": true, 
        "root_hash": "0x0000000000000000000000000000000000000000000000000000000000000000", 
        "timestamp": 1645488936
    }, {
        "confirmed": true, 
        "root_hash": "0x622b04ae13c05989f0fb5398b286d27a91ff258f9ad26794477df5480de6c184", 
        "timestamp": 1645489999
    }], 
    "success": true
}
```
---

### `get_connections`

Functionality: Get a list of active connections

Note: Inherited from RPC Server

Options: None

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/get_connections' --header 'Content-Type: application/json' --data-raw '{
   }'

// Response
{
    "connections": [{
        "bytes_read": 53, 
        "bytes_written": 53, 
        "creation_time": 1645673824.4333866, 
        "last_message_time": 1645673824.4343746, 
        "local_port": 8561, 
        "node_id": "0xe70c7c2ad875451a6152160fcc9b2d19772f12cd9363c6be1d82911ea1bde299", 
        "peer_host": "localhost", 
        "peer_port": 58444, 
        "peer_server_port": 58444, 
        "type": 1
    }], 
    "success": true
}
```
---

### `open_connection`

Functionality: Open a connection to another node

Note: Inherited from RPC Server

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| host            | TEXT    | True     | The IP or URL of the node to connect to |
| port            | INTEGER | True     | The port through which to connect to the remote node |

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/open_connection' --header 'Content-Type: application/json' --data-raw '{
         "host": "localhost",
         "port": "58444"
   }'

// Response
{
    "connections": [], 
    "success": true
}
```
---

### `close_connection`

Functionality: Close an active connection

Note: Inherited from RPC Server

Options:

| Flag            | Type    | Required | Description |
|:---------------:|:-------:|:--------:|:------------|
| node_id         | TEXT    | True     | The hex ID of the node to close, obtainable from [`get_connections`](#get_connections)|

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/close_connection' --header 'Content-Type: application/json' --data-raw '{
         "node_id": "0xe70c7c2ad875451a6152160fcc9b2d19772f12cd9363c6be1d82911ea1bde299"
   }'

// Response
{
    "success": true
}
```

---

### `stop_node`

Functionality: Stop your local node

Note: Inherited from RPC Server

Options: None

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/stop_node' --header 'Content-Type: application/json' --data-raw '{
   }'

// Response
{
    "success": true
}
```
---

### `get_routes`

Functionality: Show a comprehensive list of RPC routes for the data layer

Options: None

Example:

```json
// Request
curl --insecure \
     --cert ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.crt \
     --key ~/.chia/mainnet/config/ssl/data_layer/private_data_layer.key \
     --location --request POST 'https://localhost:8562/get_routes' --header 'Content-Type: application/json' --data-raw '{
   }'

// Response
{
    "routes": [
        "/create_data_store", 
        "/batch_update", 
        "/get_value", 
        "/get_keys_values", 
        "/get_ancestors", 
        "/get_root", 
        "/get_local_root", 
        "/get_roots", 
        "/delete_key", 
        "/insert", 
        "/subscribe", 
        "/unsubscribe", 
        "/get_kv_diff", 
        "/get_root_history", 
        "/get_connections", 
        "/open_connection", 
        "/close_connection", 
        "/stop_node", 
        "/get_routes"
    ],
    "success": "true"
}
```