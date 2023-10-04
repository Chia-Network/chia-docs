---
sidebar_label: DataLayer
title: DataLayer RPC
slug: /datalayer-rpc
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
chia rpc data_layer create_data_store '{"fee":"1000"}'
```

To run the same command on Windows, you need to escape the quotes with backslashes. In other words, add a \ before each double quote, such that:

- "fee" becomes \"fee\"
- "1000" becomes \"1000\"
- etc

</details>

## Intro

This page includes a comprehensive list of Chia's DataLayer RPC API.

We also have documented the [DataLayer CLI](/datalayer-cli) commands for interacting with the DataLayer.

By default, the DataLayer RPC API is exposed on port 8562. This is configured in `~/.chia/mainnet/config/config.yaml` under `data_layer:rpc_port`. This port must not be exposed publicly for security concerns.

Commands that modify the blockchain include an optional fee. This fee can be specified in two ways:

1. The "fee" parameter can be configured explicitly in the command, as several of the examples in this document show
2. If the fee option is not explicitly specified, then the `data_layer:fee` setting in `~/.chia/mainnet/config/config.yaml` will be used. By default, this is set to 1 billion mojos (0.001 XCH)
3. If neither of these options is set, then no fee will be used

For commands that change the state of the DataLayer singleton (ie all on-chain commands), you will need to wait for confirmation before running another command. If you run a command before the previous transaction has been confirmed, you will receive this error: `Request failed: {'error': 'Already have a pending root waiting for confirmation.', 'success': False}`

Note: Hashes used as arguments for the commands documented here may or may not be prefixed with `0x`. Both forms are valid syntax.

## Reference

### `add_mirror`

Functionality: Add a new mirror from an owned or subscribed data store. Triggers a Chia transaction

Usage: chia rpc data_layer [OPTIONS] add_mirror [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag   | Type    | Required | Description                                                                                                      |
| :----- | :------ | :------- | :--------------------------------------------------------------------------------------------------------------- |
| id     | TEXT    | True     | The hexadecimal ID of the store to mirror                                                                        |
| urls   | TEXT    | True     | A list of URLs where the mirror will reside                                                                      |
| amount | INTEGER | True     | The number of mojos to spend to create the mirror. In theory, mirrors with a higher `amount` will be prioritized |
| fee    | TEXT    | False    | Set the fee for the transaction, in mojos                                                                        |

<details>
<summary>Example</summary>

Create one mirror with multiple URLs:

```json
chia rpc data_layer add_mirror '{"id":"0x1ad0908e248f48cc3e9b3cf8f68c748d2e3c5a2a933765032d3222086231ea5e", "urls":["http://www.example.com:8575", "http://www.example2.com:8575"], "amount":1000000}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `add_missing_files`

Functionality: Use the database to restore all files for one or more owned data stores

Note: For subscribed stores, this command will do nothing. Use [unsubscribe](#unsubscribe) and [subscribe](#subscribe) instead

Usage: chia rpc data_layer [OPTIONS] add_missing_files [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag       | Type    | Required | Description                                                                                                                                  |
| :--------- | :------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| ids        | TEXT    | False    | A list of hexadecimal store IDs to restore (default: all subscribed stores)                                                                  |
| override   | BOOLEAN | False    | If `True`, will overwrite files that already exist (default: `False`)                                                                        |
| foldername | TEXT    | False    | The name of the folder where the files to be restored are located (default: `~/.chia/mainnet/data_layer/db/server_files_location_<network>`) |

<details>
<summary>Example</summary>

For this example, there is one owned store:

```json
ls ~/.chia/mainnet/data_layer/db/server_files_location_testnet10/
```

Response:

```
1ad0908e248f48cc3e9b3cf8f68c748d2e3c5a2a933765032d3222086231ea5e-b5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2-delta-1-v1.0.dat
1ad0908e248f48cc3e9b3cf8f68c748d2e3c5a2a933765032d3222086231ea5e-b5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2-full-1-v1.0.dat
```

Intentionally move the files and create an empty folder. This will simulate file corruption:

```json
mv ~/.chia/mainnet/data_layer/db/server_files_location_testnet10 ~/.chia/mainnet/data_layer/db/server_files_location_testnet10_bak
mkdir ~/.chia/mainnet/data_layer/db/server_files_location_testnet10/
```

Next, restore the files:

```json
chia rpc data_layer add_missing_files
```

Response:

```json
{
  "success": true
}
```

Finally, verify that the files have been restored:

```json
ls ~/.chia/mainnet/data_layer/db/server_files_location_testnet10/
```

Response:

```json
1ad0908e248f48cc3e9b3cf8f68c748d2e3c5a2a933765032d3222086231ea5e-b5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2-delta-1-v1.0.dat
1ad0908e248f48cc3e9b3cf8f68c748d2e3c5a2a933765032d3222086231ea5e-b5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2-full-1-v1.0.dat
```

</details>

---

### `batch_update`

Functionality: Apply multiple updates to a data store with a given changelist. Triggers a Chia transaction

Usage: chia rpc data_layer [OPTIONS] batch_update [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag       | Type | Required | Description                               |
| :--------- | :--- | :------- | :---------------------------------------- |
| id         | TEXT | True     | The hexadecimal store ID                  |
| changelist | TEXT | True     | A string representing the changelist      |
| fee        | TEXT | False    | Set the fee for the transaction, in mojos |

A few notes on the `changelist` option:

- The entire list must be formatted as a JSON array
- There are two actions allowed: `insert` and `delete`
- `insert` requires `key` and `value` flags
- `delete` requires a `key` flag only
- Keys and values must be written in hex format. Values can be derived from text or binary.
- Labels, keys and values must all be enclosed in double quotes
- Multiple inserts and deletes are allowed
- The size of a single `value` flag is limited to 100 MiB. However, adding anything close to that size has not been tested and could produce unexpected results

The following examples will show the basic functionality of this command.

<details>
<summary>Example 1 -- Insert a single key/value pair</summary>

```json
chia rpc data_layer batch_update '{"id":"0x1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a", "changelist":[{"action":"insert", "key":"0003", "value":"abc123"}]}'
```

Response:

```json
{
  "success": true,
  "tx_id": "0x02c38815520bf517793418368c1a54641bc71318cad41b35932d0ceb7a489c5a"
}
```

</details>

<details>
<summary>Example 2 -- Delete a single key</summary>

```json
chia rpc data_layer batch_update '{"id":"0x1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a", "changelist":[{"action":"delete", "key":"0003"}]}'
```

Response:

```json
{
  "success": true,
  "tx_id": "0xddd4474cb1c17b4692a6600e54de52b8f0c982bb5321868b0a8071af571f131e"
}
```

</details>

<details>
<summary>Example 3 -- Insert two keys</summary>

```json
chia rpc data_layer batch_update '{"id":"0x1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a", "changelist":[{"action":"insert", "key":"0x0004", "value":"123abc"},{"action":"insert", "key":"0005", "value":"0xbeadfeed"}]}'
```

Response:

```json
{
  "success": true,
  "tx_id": "0x08403438a85afd1e3879f372f4d1b2987f3b677c20da1d61f840efd1fa5e3b74"
}
```

List all keys and values after running the previous command:

```json
chia rpc data_layer get_keys_values '{"id":"0x1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a"}'
```

Response:

```
{
    "keys_values": [
        {
            "atom": null,
            "hash": "0x7e193b814080e50aa7780bcf71fd0422a0397ad3e57dc1eac71d93183efb39ba",
            "key": "0x0004",
            "value": "0x123abc"
        },
        {
            "atom": null,
            "hash": "0xc2dc94c2a85d7db4cfdd1d907bcc441c8fce595db2e2075b973fb8171e2f19a2",
            "key": "0x0005",
            "value": "0xbeadfeed"
        }
    ],
    "success": true
}
```

</details>

<details>
<summary>Example 4 -- Show that you may not overwrite an existing key</summary>

```json
chia rpc data_layer batch_update '{"id":"0x1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a", "changelist":[{"action":"insert", "key":"0002", "value":"0123456789abcdef"}]}'
```

Response:

```json
Request failed: {'error': 'Key already present: 0002', 'success': False}
```

</details>

<details>
<summary>Example 5 -- Delete and add the same key in the same command</summary>

```json
chia rpc data_layer batch_update '{"id":"0x1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a", "changelist":[{"action":"delete", "key":"0002"},{"action":"insert", "key":"0002", "value":"0123456789abcdef"}]}'
```

Response:

```json
{
  "success": true,
  "tx_id": "0xc4fb487f6506129c17283c30f553c9a767298330636e8bd1f7ea2311e183ed1e"
}
```

Show that the key/value pair has actually been updated:

```json
chia rpc data_layer get_value '{"id":"0x1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a", "key":"0002"}'
```

Response:

```json
{
  "success": true,
  "value": "0123456789abcdef"
}
```

</details>

<details>
<summary>Example 6 -- Show a key/value pair that was inserted into the Climate Warehouse</summary>

```json
[
  {
    "action": "insert",
    "key": "70726f6a6563747c37353339656336392d636238652d343464362d383832332d653062313135303162643433",
    "value": "7b2263757272656e745265676973747279223a2243756c7469766f222c2272656769737472794f664f726967696e223a2243756c7469766f222c226f726967696e50726f6a6563744964223a224d6163546573743135222c2270726f6772616d223a224d6163546573743135222c2270726f6a6563744964223a224d6163546573743135222c2270726f6a6563744e616d65223a224d6163546573743135222c2270726f6a6563744c696e6b223a224d6163546573743135222c2270726f6a656374446576656c6f706572223a224d6163546573743135222c22736563746f72223a22456e6572677920646973747269627574696f6e222c2270726f6a65637454797065223a224f7a6f6e65204465706c6574696e67205375627374616e636573222c22636f766572656442794e4443223a224f757473696465204e4443222c226e6463496e666f726d6174696f6e223a224d6163546573743135222c2270726f6a656374537461747573223a22436f6d706c65746564222c22756e69744d6574726963223a2274434f3265222c226d6574686f646f6c6f6779223a22426173656c696e65204d6574686f646f6c6f677920666f72206465636f6d706f736974696f6e206f66204e324f2066726f6d206578697374696e672061646970696320616369642070726f64756374696f6e20706c616e7473202d2d2d2056657273696f6e20332e30222c2270726f6a65637454616773223a224d6163546573743135222c2276616c69646174696f6e426f6479223a22436172626f6e20436865636b2028496e646961292050726976617465204c74642e222c2270726f6a65637453746174757344617465223a22323032302d30332d32385430303a30303a30302e3030305a222c2276616c69646174696f6e44617465223a22323032322d30332d30315430303a30303a30302e3030305a222c2277617265686f75736550726f6a6563744964223a2237353339656336392d636238652d343464362d383832332d653062313135303162643433222c2274696d65537461676564223a313634363639343630322c226f7267556964223a2230623039643861653437626665323731366263323532383231333463653661613931616333646364663933363335616338656436626362333031626234636238227d"
  }
]
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

</details>

---

### `cancel_offer`

Functionality: Cancel a DataLayer offer

Usage: chia rpc data_layer [OPTIONS] cancel_offer [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag     | Type    | Required | Description                                                                                                                                                                                                                                                             |
| :------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| trade_id | TEXT    | True     | The `trade_id` of the offer. This is displayed with the response of the [make_offer](#make_offer) RPC                                                                                                                                                                   |
| secure   | BOOLEAN | True     | If `true`, the offer will be canceled on the blockchain, making it impossible to be accepted later. If `false`, the offer will only be canceled locally. We recommend that you set this to `true` unless you are certain that the offer file has not left your computer |
| fee      | TEXT    | False    | If `secure` is `true`, this will set the fee for the transaction, in mojos. If `secure` is `false`, the fee will be ignored                                                                                                                                             |

<details>
<summary>Example </summary>

Cancel an offer on-chain, using "secure":"true":

```json
chia rpc data_layer cancel_offer '{"trade_id":"92652561cc3f40677d7d73513b4dde4a56da1c9edc0cfd9f03bb001b95df42af", "secure":"true", "fee":"1000"}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `check_plugins`

Functionality: Get information about configured uploader/downloader plugins

Usage: chia rpc data_layer [OPTIONS] check_plugins [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example </summary>

```json
chia rpc data_layer check_plugins
```

Response:

```json
{
  "plugin_status": {
    "downloaders": {},
    "uploaders": {}
  },
  "success": true
}
```

</details>

---

### `clear_pending_roots`

Functionality: Clear pending roots that will not be published, associated data may not be recoverable

Usage: chia rpc data_layer [OPTIONS] clear_pending_roots [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag     | Type | Required | Description              |
| :------- | :--- | :------- | :----------------------- |
| store_id | TEXT | True     | The hexadecimal store ID |

<details>
<summary>Example</summary>

```json
chia rpc data_layer clear_pending_roots '{"store_id":"2772c8108e19f9fa98ff7bc7d4bafd821319bc90af6b610d086b85f4c21fa816"}'
```

Response:

```json
{
    "root": {
        "generation": 2,
        "node_hash": "ab8da7d5adec29fe1d12888fec462d0b18d72cec975599e178f98037cf3b8d13",
        "status": 1,
        "tree_id": "2772c8108e19f9fa98ff7bc7d4bafd821319bc90af6b610d086b85f4c21fa816"
    },
    "success": true
}
```

</details>

---

### `create_data_store`

Functionality: Create a data store. Triggers a Chia transaction

Usage: chia rpc data_layer [OPTIONS] create_data_store [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type | Required | Description                               |
| :--- | :--- | :------- | :---------------------------------------- |
| fee  | TEXT | False    | Set the fee for the transaction, in mojos |

<details>
<summary>Example</summary>

```json
chia rpc data_layer create_data_store '{"fee":"1000"}'
```

Response:

```json
{
  "id": "31264f736a07683097a4b1bbedfa3b4d12631af1595b3905907a441bafb79c61",
  "success": true,
  "txs": [
    {
      "additions": [
        {
          "amount": 1,
          "parent_coin_info": "0x7a97a37cac145bd13b4da93c496dc32e83a526918727e0f6a1c305af996726e9",
          "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
        },
        {
          "amount": 10983998895994,
          "parent_coin_info": "0x7a97a37cac145bd13b4da93c496dc32e83a526918727e0f6a1c305af996726e9",
          "puzzle_hash": "0xdc2d295cce761abd4123d03e7135c670d6c0ad39ec4e66503cec336439e8a2fb"
        },
        {
          "amount": 1,
          "parent_coin_info": "0x31264f736a07683097a4b1bbedfa3b4d12631af1595b3905907a441bafb79c61",
          "puzzle_hash": "0xba017f832d945b23f7b0a3dc4850a3bb9aff6e92cd2a333a7987b60ced1dab0a"
        }
      ],
      "amount": 1,
      "confirmed": false,
      "confirmed_at_height": 0,
      "created_at_time": 1660784389,
      "fee_amount": 1000,
      "memos": [],
      "name": "0x76d1e179a15f097c116e75c73486c3d47f7ebbb4791b5216a2828807f4ad9a5f",
      "removals": [
        {
          "amount": 10983998896995,
          "parent_coin_info": "0x110a907b5676553746e75623dd32ad231c080e9dabe50a99bc43beebaaa13531",
          "puzzle_hash": "0x3f5ea6f0f46c1d76fbc72e4116895536f7b7b167f9d9e5a38d708ad3e3fd434a"
        },
        {
          "amount": 1,
          "parent_coin_info": "0x7a97a37cac145bd13b4da93c496dc32e83a526918727e0f6a1c305af996726e9",
          "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
        }
      ],
      "sent": 10,
      "sent_to": [],
      "spend_bundle": {
        "aggregated_signature": "0xb600c2cd9ddafb6655e14fe99b293a742746ba82ef3f05b8bb3a375af0d3824011a1909348a16745e19f826aceb2534e08c0d939f01eb92f9bfac5eb8cf0c97bad353d5e0fa89f95f329c45c5797d59fe4b1a8ce23fa6a64bd2ac385170fedd5",
        "coin_spends": [
          {
            "coin": {
              "amount": 10983998896995,
              "parent_coin_info": "0x110a907b5676553746e75623dd32ad231c080e9dabe50a99bc43beebaaa13531",
              "puzzle_hash": "0x3f5ea6f0f46c1d76fbc72e4116895536f7b7b167f9d9e5a38d708ad3e3fd434a"
            },
            "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a50a6518ead71676147c2ee69111eaf7ad247fc624f4ae8e7c2a7fdfd28c8a31560183506bfa9c657af220e0caacc378ff018080",
            "solution": "0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa0dc2d295cce761abd4123d03e7135c670d6c0ad39ec4e66503cec336439e8a2fbff8609fd695a377a80ffff34ff8203e880ffff3cffa0b7fe85c45d675c4798e49b89c334dc345acdecb7955467e849c367b47495700e80ffff3dffa0cb7418c46c146ecf8515b5ec562c8d6884c6ff5a28daecfdb4a37301b3b92bb38080ff8080"
          },
          {
            "coin": {
              "amount": 1,
              "parent_coin_info": "0x7a97a37cac145bd13b4da93c496dc32e83a526918727e0f6a1c305af996726e9",
              "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
            },
            "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080",
            "solution": "0xffa0ba017f832d945b23f7b0a3dc4850a3bb9aff6e92cd2a333a7987b60ced1dab0aff01ffffa00000000000000000000000000000000000000000000000000000000000000000ffa0a5927d1773b24c508abb547f7fb803c57841dc2ef85c3074707355830ddb1f7e8080"
          }
        ]
      },
      "to_puzzle_hash": "0x0202020202020202020202020202020202020202020202020202020202020202",
      "trade_id": null,
      "type": 0,
      "wallet_id": 0
    },
    {
      "additions": [
        {
          "amount": 1,
          "parent_coin_info": "0x7a97a37cac145bd13b4da93c496dc32e83a526918727e0f6a1c305af996726e9",
          "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
        },
        {
          "amount": 10983998895994,
          "parent_coin_info": "0x7a97a37cac145bd13b4da93c496dc32e83a526918727e0f6a1c305af996726e9",
          "puzzle_hash": "0xdc2d295cce761abd4123d03e7135c670d6c0ad39ec4e66503cec336439e8a2fb"
        }
      ],
      "amount": 1,
      "confirmed": false,
      "confirmed_at_height": 0,
      "created_at_time": 1660784389,
      "fee_amount": 1000,
      "memos": [],
      "name": "0xa3128e387ecc892f9b4d7e0178ee3fab5620659b0dabcf34dd3305e0e10d221d",
      "removals": [
        {
          "amount": 10983998896995,
          "parent_coin_info": "0x110a907b5676553746e75623dd32ad231c080e9dabe50a99bc43beebaaa13531",
          "puzzle_hash": "0x3f5ea6f0f46c1d76fbc72e4116895536f7b7b167f9d9e5a38d708ad3e3fd434a"
        }
      ],
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

As a result of running the `create_data_store` command, a new DataLayer wallet is created:

```json
chia wallet show
```

Response:

```json
Wallet height: 1399892
Sync status: Synced
Balances, fingerprint: 1871575185

Chia Wallet:
   -Total Balance:         10.983998895994 txch (10983998895994 mojo)
   -Pending Total Balance: 10.983998895994 txch (10983998895994 mojo)
   -Spendable:             10.983998895994 txch (10983998895994 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

DataLayer Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DATA_LAYER
   -Wallet ID:             2
```

</details>

---

### `delete_key`

Functionality: Delete a key/value pair from a store that you control. Triggers a Chia transaction

Usage: chia rpc data_layer [OPTIONS] delete_key [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type | Required | Description                               |
| :--- | :--- | :------- | :---------------------------------------- |
| id   | TEXT | True     | The hexadecimal store ID                  |
| key  | TEXT | True     | The hexadecimal key                       |
| fee  | TEXT | False    | Set the fee for the transaction, in mojos |

Example:

<details>
<summary>Example</summary>

```json
chia rpc data_layer delete_key '{"id":"0x1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a", "key":"0001", "fee":"100000"}'
```

Response:

```json
{
  "success": true,
  "tx_id": "0x6cfbaff3f739f4b0e1d0fae3475966f0d4a19b8a89b483af1bf1cdc789bb9f3c"
}
```

</details>

---

### `delete_mirror`

Functionality: Delete a mirror, by `coin_id`. Triggers a Chia transaction

Usage: chia rpc data_layer [OPTIONS] delete_mirror [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type | Required | Description                                                                              |
| :--- | :--- | :------- | :--------------------------------------------------------------------------------------- |
| id   | TEXT | True     | The `coin_id` of the mirror to delete, obtainable by running [get_mirrors](#get_mirrors) |
| fee  | TEXT | False    | Set the fee for the transaction, in mojos                                                |

<details>
<summary>Example 1</summary>

```json
chia rpc data_layer delete_mirror '{"id":"0x9a2132858b81907875a65123e592b7aea80b23724202ac21bba0aedf583f7427"}'
```

Response:

```json
{
  "success": true
}
```

</details>

<details>
<summary>Example 2</summary>

If you attempt to delete a mirror you did not create, this will fail:

```json
chia rpc data_layer delete_mirror '{"id":"0x83a75913f8222eebfbc047d2ab3bf4b92bd5c37f3acaa336a0bb8b3b3168c879"}'
```

Response:

```json
Request failed: {'error': "{'error': 'DL Wallet does not have permission to delete mirror with ID 83a75913f8222eebfbc047d2ab3bf4b92bd5c37f3acaa336a0bb8b3b3168c879', 'success': False}", 'success': False}
```

</details>

---

### `get_ancestors`

Functionality: Return all ancestors of a given hash

Usage: chia rpc data_layer [OPTIONS] get_ancestors [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type | Required | Description                              |
| :--- | :--- | :------- | :--------------------------------------- |
| id   | TEXT | True     | The hexadecimal store ID                 |
| hash | TEXT | True     | The hash from which to display ancestors |

<details>
<summary>Example</summary>

First get the root hash of a data store:

```json
chia rpc data_layer get_root '{"id":"0x1ad0908e248f48cc3e9b3cf8f68c748d2e3c5a2a933765032d3222086231ea5e"}'
```

Response:

```json
{
  "confirmed": true,
  "hash": "0xb5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2",
  "success": true,
  "timestamp": 1660724174
}
```

Next, get the ancestors of the root hash:

```json
chia rpc data_layer get_ancestors '{"id":"0x1ad0908e248f48cc3e9b3cf8f68c748d2e3c5a2a933765032d3222086231ea5e","hash":"0xb5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2"}'
```

Response:

```json
{
  "ancestors": [],
  "success": true
}
```

</details>

---

### `get_keys`

Functionality: Get all keys associated with a store_id

Usage: chia rpc data_layer [OPTIONS] get_keys [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type | Required | Description                             |
| :-------- | :--- | :------- | :-------------------------------------- |
| id        | TEXT | True     | The hexadecimal store ID                |
| root_hash | TEXT | False    | The root hash from which to obtain data |

:::info

The `root_hash` parameter is recommended to be used each time you call this RPC.
If `root_hash` is not specified, there is no way to guarantee that the latest data is being shown
(stale data may be shown instead).
This parameter is obtainable by calling the [get_root](#get_root) RPC.

:::

<details>
<summary>Example</summary>

```json
chia rpc data_layer get_keys '{"id":"0x8f9601eba73a276d5b9e12fbec52b113217e89a55831ae1d80bca48462fbaea7", "root_hash": "0x9527cc5e43bf93062423221e9bec761cbc3f24a0811cb0738da2419dfe7649f7"}'
```

Response:

```json
{
  "keys": ["0x0001", "0x0002", "0x0003"],
  "success": true
}
```

</details>

---

### `get_keys_values`

Functionality: Get all keys and values for a store. Must be subscribed to store ID

Usage: chia rpc data_layer [OPTIONS] get_keys_values [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

|   Flag    | Type | Required | Description                             |
| :-------: | :--: | :------: | :-------------------------------------- |
|    id     | TEXT |   True   | The hexadecimal store ID                |
| root_hash | TEXT |  False   | The root hash from which to obtain data |

:::info

The `root_hash` parameter is recommended to be used each time you call this RPC.
If `root_hash` is not specified, there is no way to guarantee that the latest data is being shown
(stale data may be shown instead).
This parameter is obtainable by calling the [get_root](#get_root) RPC.

:::

<details>
<summary>Example</summary>

First, we'll show show an example that does not specify the root hash.
This will result in stale data being displayed, per the above message.

**Note: omitting the `root_hash` is not recommended.**
Later, we will show the recommended way to call this RPC.

```json
chia rpc data_layer get_keys_values '{"id":"0x8f9601eba73a276d5b9e12fbec52b113217e89a55831ae1d80bca48462fbaea7"}'
```

Response:

```json
{
  "keys_values": [
    {
      "atom": null,
      "hash": "0xa03d7ea8e488d6443f51a8b586f11754447fb449dc48af881ee78ff77ec7cdb1",
      "key": "0x0001",
      "value": "0xfadedcab"
    },
    {
      "atom": null,
      "hash": "0x919735911d7f9ca0de316878ddb92e7772c9f39bf9d37e9d84ccab39f5d49a11",
      "key": "0x0002",
      "value": "0xcafef00d"
    }
  ],
  "success": true
}
```

Next, we will obtain the latest `root_hash` value:

```json
chia rpc data_layer get_root '{"id":"0x8f9601eba73a276d5b9e12fbec52b113217e89a55831ae1d80bca48462fbaea7"}'
```

Response:

```json
{
  "confirmed": true,
  "hash": "0x9527cc5e43bf93062423221e9bec761cbc3f24a0811cb0738da2419dfe7649f7",
  "success": true,
  "timestamp": 1679023336
}
```

Finally, we will call the RPC again, this time with the latest `root_hash`:

```json
chia rpc data_layer get_keys_values '{"id":"0x8f9601eba73a276d5b9e12fbec52b113217e89a55831ae1d80bca48462fbaea7", "root_hash": "0x9527cc5e43bf93062423221e9bec761cbc3f24a0811cb0738da2419dfe7649f7"}'
```

The result now contains all of theys anf values from the `id`:

```json
{
  "keys_values": [
    {
      "atom": null,
      "hash": "0xa03d7ea8e488d6443f51a8b586f11754447fb449dc48af881ee78ff77ec7cdb1",
      "key": "0x0001",
      "value": "0xfadedcab"
    },
    {
      "atom": null,
      "hash": "0x919735911d7f9ca0de316878ddb92e7772c9f39bf9d37e9d84ccab39f5d49a11",
      "key": "0x0002",
      "value": "0xcafef00d"
    },
    {
      "atom": null,
      "hash": "0xe488fa1bf0f712b224df0daf312b3d479f80e3a330d4bebd8f26a0d52dc0ebbb",
      "key": "0x0003",
      "value": "0xabc123"
    }
  ],
  "success": true
}
```

</details>

---

### `get_kv_diff`

Functionality: Get the kv diff between two hashes within the same store ID

Usage: chia rpc data_layer [OPTIONS] get_kv_diff [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag   | Type | Required | Description                |
| :----- | :--- | :------- | :------------------------- |
| id     | TEXT | True     | The hexadecimal store ID   |
| hash_1 | TEXT | True     | The first hash to compare  |
| hash_2 | TEXT | True     | The second hash to compare |

<details>
<summary>Example</summary>

```json
chia rpc data_layer get_kv_diff '{"id":"0x1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a", "hash_1":"0x7e193b814080e50aa7780bcf71fd0422a0397ad3e57dc1eac71d93183efb39ba", "hash_2":"0x2477500c19f0ddfb147049769ce54425a4c4e2994a25e63e51c389cb8f0e912f"}'
```

Response:

```json
{
  "diff": [
    {
      "key": "0004",
      "type": "DELETE",
      "value": "123abc"
    },
    {
      "key": "0002",
      "type": "INSERT",
      "value": "0123456789abcdef"
    }
  ],
  "success": true
}
```

</details>

---

### `get_local_root`

Functionality: Get the root hash and timestamp of a store ID. Can be used for either owned or subscribed stores

Usage: chia rpc data_layer [OPTIONS] get_local_root [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:s

| Flag | Type | Required | Description              |
| :--- | :--- | :------- | :----------------------- |
| id   | TEXT | True     | The hexadecimal store ID |

<details>
<summary>Example</summary>

```json
chia rpc data_layer get_local_root '{"id":"8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d"}'
```

Response:

```json
{
  "hash": "0xcdb172490d2d1838e7cca24e28e2089ccbacf0e03b0f3d0a61eedae8462b3e75",
  "success": true
}
```

</details>

---

### `get_mirrors`

Functionality: List all mirrors for a store ID

Usage: chia rpc data_layer [OPTIONS] get_mirrors [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type | Required | Description                                               |
| :--- | :--- | :------- | :-------------------------------------------------------- |
| id   | TEXT | True     | The hexadecimal ID of the store for which to list mirrors |

<details>
<summary>Example</summary>

```json
chia rpc data_layer get_mirrors '{"id":"0x1ad0908e248f48cc3e9b3cf8f68c748d2e3c5a2a933765032d3222086231ea5e"}'
```

Response:

```json
{
  "mirrors": [
    {
      "amount": 1000000,
      "coin_id": "11f450c2f706cda88b3373855b3780d36822a7f0e94297eb88de7c63eb0bd4c7",
      "launcher_id": "1ad0908e248f48cc3e9b3cf8f68c748d2e3c5a2a933765032d3222086231ea5e",
      "ours": true,
      "urls": ["http://www.example.com:8575", "http://www.example2.com:8575"]
    }
  ],
  "success": true
}
```

</details>

---

### `get_owned_stores`

Functionality: List the id (`store_id`) of each data_store owned by this wallet

Usage: chia rpc data_layer [OPTIONS] get_owned_stores [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc data_layer get_owned_stores
```

Response:

```json
{
  "store_ids": [
    "1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a"
  ],
  "success": true
}
```

</details>

---

### `get_root`

Functionality: Get the root hash and timestamp of a given store ID. If it is a subscribed store, this command will return an invalid hash (see example). In this case, use [get_local_root](#get_local_root) instead

Usage: chia rpc data_layer [OPTIONS] get_root [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type | Required | Description              |
| :--- | :--- | :------- | :----------------------- |
| id   | TEXT | True     | The hexadecimal store ID |

<details>
<summary>Example 1</summary>

Get the root hash of an owned store:

```json
chia rpc data_layer get_root '{"id":"0x1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a"}'
```

Response:

```json
{
  "confirmed": true,
  "hash": "0x75cccd7342e93b5a716877c285282f45b1125c33d3f67cd62a353efdbe4fd9fa",
  "success": true,
  "timestamp": 1660623078
}
```

</details>

<details>
<summary>Example 2</summary>

Get the root hash of a subscribed store. Notice that an invalid hash is shown:

```json
chia rpc data_layer get_root '{"id":"8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d"}'
```

Response:

```json
{
  "confirmed": true,
  "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "success": true,
  "timestamp": 1660672031
}
```

</details>

---

### `get_roots`

Functionality: Get the root hashes and timestamps from a list of stores. Note that an invalid hash will be returned for subscribed stores. Use [get_local_root](#get_local_root) instead

Usage: chia rpc data_layer [OPTIONS] get_roots [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type | Required | Description                     |
| :--- | :--- | :------- | :------------------------------ |
| ids  | TEXT | True     | A list of hexadecimal store IDs |

<details>
<summary>Example</summary>

For this example, the first store is subscribed, so it will return an invalid root hash. The second store is owned, so the root hash will be valid:

```json
chia rpc data_layer get_roots '{"ids":["8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d", "0x1ad0908e248f48cc3e9b3cf8f68c748d2e3c5a2a933765032d3222086231ea5e"]}'
```

Response:

```json
{
  "root_hashes": [
    {
      "confirmed": true,
      "hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "id": "0x8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d",
      "timestamp": 1660672031
    },
    {
      "confirmed": true,
      "hash": "0xb5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2",
      "id": "0x1ad0908e248f48cc3e9b3cf8f68c748d2e3c5a2a933765032d3222086231ea5e",
      "timestamp": 1660724174
    }
  ],
  "success": true
}
```

</details>

---

### `get_root_history`

Functionality: Get a history of root hashes for a Store ID that you subscribe to

Usage: chia rpc data_layer [OPTIONS] get_root_history [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type | Required | Description              |
| :--- | :--- | :------- | :----------------------- |
| id   | TEXT | True     | The hexadecimal store ID |

<details>
<summary>Example</summary>

```json
chia rpc data_layer get_root_history '{"id":"0x1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a"}'
```

Response:

```json
{
  "root_history": [
    {
      "confirmed": true,
      "root_hash": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 1660618627
    },
    {
      "confirmed": true,
      "root_hash": "0xa03d7ea8e488d6443f51a8b586f11754447fb449dc48af881ee78ff77ec7cdb1",
      "timestamp": 1660622775
    },
    {
      "confirmed": true,
      "root_hash": "0x75cccd7342e93b5a716877c285282f45b1125c33d3f67cd62a353efdbe4fd9fa",
      "timestamp": 1660623078
    },
    {
      "confirmed": true,
      "root_hash": "0x9527cc5e43bf93062423221e9bec761cbc3f24a0811cb0738da2419dfe7649f7",
      "timestamp": 1660632383
    },
    {
      "confirmed": true,
      "root_hash": "0x75cccd7342e93b5a716877c285282f45b1125c33d3f67cd62a353efdbe4fd9fa",
      "timestamp": 1660632535
    },
    {
      "confirmed": true,
      "root_hash": "0x9489c92aa253bbc8489eef1b2dee0f26855ee88d82744b4a7721b1e1528442ba",
      "timestamp": 1660632993
    },
    {
      "confirmed": true,
      "root_hash": "0xa78402ca50f743152e1e2f7848f8bd5edce150723f5baa85242d3e1a7518b163",
      "timestamp": 1660633450
    },
    {
      "confirmed": true,
      "root_hash": "0x044e03adb3d3180ed91b8bd4afb4c381e821d5641e5cc11e458ab33cbae2ed01",
      "timestamp": 1660635004
    }
  ],
  "success": true
}
```

</details>

---

### `get_routes`

Functionality: Show a comprehensive list of RPC routes for the DataLayer

Usage: chia rpc data_layer [OPTIONS] get_routes

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc data_layer get_routes
```

Response:

```json
{
  "routes": [
    "/create_data_store",
    "/get_owned_stores",
    "/batch_update",
    "/get_value",
    "/get_keys",
    "/get_keys_values",
    "/get_ancestors",
    "/get_root",
    "/get_local_root",
    "/get_roots",
    "/delete_key",
    "/insert",
    "/subscribe",
    "/unsubscribe",
    "/add_mirror",
    "/delete_mirror",
    "/get_mirrors",
    "/remove_subscriptions",
    "/subscriptions",
    "/get_kv_diff",
    "/get_root_history",
    "/add_missing_files",
    "/make_offer",
    "/take_offer",
    "/verify_offer",
    "/cancel_offer",
    "/get_sync_status",
    "/check_plugins",
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

### `get_sync_status`

Functionality: Obtain the current sync status for a provided data store

Usage: chia rpc data_layer [OPTIONS] get_sync_status [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type | Required | Description              |
| :--- | :--- | :------- | :----------------------- |
| id   | TEXT | True     | The hexadecimal store ID |

<details>
<summary>Example</summary>

```json
chia rpc data_layer get_sync_status '{"id": "39114b28a3674b6c2c0ed65d3518842fd17f9df46794f49cd223f9f3a463f09d"}'
```

Response:

```json
{
  "success": true,
  "sync_status": {
    "generation": 1,
    "root_hash": "532d8df550bdbdef28c1a7b27eaefc812afb99eabd59b3c041000c7ea352e900",
    "target_generation": 1,
    "target_root_hash": "532d8df550bdbdef28c1a7b27eaefc812afb99eabd59b3c041000c7ea352e900"
  }
}
```

</details>

---

### `get_value`

Functionality: Given a key and the data store in which the key is located, return corresponding value

Usage: chia rpc data_layer [OPTIONS] get_value [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type | Required | Description                             |
| :-------- | :--- | :------- | :-------------------------------------- |
| id        | TEXT | True     | The hexadecimal store ID                |
| key       | TEXT | True     | The hexadecimal key                     |
| root_hash | TEXT | False    | The root hash from which to obtain data |

:::info

The `root_hash` parameter is recommended to be used each time you call this RPC.
If `root_hash` is not specified, there is no way to guarantee that the latest data is being shown
(stale data may be shown instead).
This parameter is obtainable by calling the [get_root](#get_root) RPC.

:::

<details>
<summary>Example</summary>

Obtain the value for key `0x0001`. Pass in the `root_hash` to ensure the latest value is obtained:

```json
chia rpc data_layer get_value '{"id":"0x8f9601eba73a276d5b9e12fbec52b113217e89a55831ae1d80bca48462fbaea7", "key": "0x0001", "root_hash": "0x9527cc5e43bf93062423221e9bec761cbc3f24a0811cb0738da2419dfe7649f7"}'
```

Response:

```json
{
  "success": true,
  "value": "fadedcab"
}
```

</details>

---

### `insert`

Functionality: Insert a key/value pair into a store that you control. Triggers a Chia transaction

Usage: chia rpc data_layer [OPTIONS] insert [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag  | Type | Required | Description                               |
| :---- | :--- | :------- | :---------------------------------------- |
| id    | TEXT | True     | The hexadecimal store ID                  |
| key   | TEXT | True     | The hexadecimal key                       |
| value | TEXT | True     | The hexadecimal value                     |
| fee   | TEXT | False    | Set the fee for the transaction, in mojos |

<details>
<summary>Example 1</summary>

This example will create a key/value pair without `0x` prefixing:

```json
chia rpc data_layer insert '{"id":"1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a", "key":"0001", "value":"fadedcab"}'
```

Response:

```json
{
  "success": true,
  "tx_id": "0xaba9c1a25199acc8e05557527cfe683797b1c8b81d6011cdbb03f80f900febd2"
}
```

</details>

<details>
<summary>Example 2</summary>

This example will create a key/value pair with `0x` prefixing:

```json
chia rpc data_layer insert '{"id":"0x1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a", "key":"0x0002", "value":"0xcafef00d"}'
```

Response:

```json
{
  "success": true,
  "tx_id": "0x212092519e5edce613d12b663bc9fa71c2d8f54da2c04ee5d5526cee0df84440"
}
```

</details>

---

### `make_offer`

Functionality: Make an offer to include one or more keys in exchange for a Taker including one or more keys

Usage: chia rpc data_layer [OPTIONS] make_offer [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag  | Type | Required | Description                                               |
| :---- | :--- | :------- | :-------------------------------------------------------- |
| maker | TEXT | True     | The hexadecimal ID of the store for which to list mirrors |
| fee   | TEXT | False    | Set the fee for the offer, in mojos                       |

:::note
You must own the store listed as the `maker`, and you must be subscribed to the store listed as the `taker`, as will be demonstrated in the example.
:::

<details>
<summary>Example</summary>

Before the offer is created, here are the Maker's store ID, keys and values:

```json
chia rpc data_layer get_owned_stores
```

Response:

```json
{
  "store_ids": [
    "14d1c3042ef38d76796146e6248e02b73db7a0eeefb740fa2e8439dad15bca27"
  ],
  "success": true
}
```

```json
chia rpc data_layer get_keys_values '{"id":"14d1c3042ef38d76796146e6248e02b73db7a0eeefb740fa2e8439dad15bca27"}'
```

Response:

```json
{
  "keys_values": [
    {
      "atom": null,
      "hash": "0x919735911d7f9ca0de316878ddb92e7772c9f39bf9d37e9d84ccab39f5d49a11",
      "key": "0x0002",
      "value": "0xcafef00d"
    },
    {
      "atom": null,
      "hash": "0xcd4046b6c3b03e20afd506b50e552f1b698283d72566732134437fcb364c47a5",
      "key": "0x0003",
      "value": "0xbeadfeed"
    }
  ],
  "success": true
}
```

And here are the Taker's store ID, keys and values:

```json
chia rpc data_layer get_owned_stores
```

Response:

```json
{
  "store_ids": [
    "596dc917f56ceaf2df17a8cf9672b2e3cd49e2c1432b25834035aafbe063cbae"
  ],
  "success": true
}
```

```json
chia rpc data_layer get_keys_values '{"id":"596dc917f56ceaf2df17a8cf9672b2e3cd49e2c1432b25834035aafbe063cbae"}'
```

Response:

```json
{
  "keys_values": [
    {
      "atom": null,
      "hash": "0x44d7462bce0023356bdb650ed8456b93ef09954b24e023f6add48e01a054e1f6",
      "key": "0x0001",
      "value": "0x1337dea1"
    },
    {
      "atom": null,
      "hash": "0xcd4046b6c3b03e20afd506b50e552f1b698283d72566732134437fcb364c47a5",
      "key": "0x0003",
      "value": "0xbeadfeed"
    }
  ],
  "success": true
}
```

The Maker offers to include a new key exchange for the Taker including a new key. A few things to keep in mind:

- Offers for multiple keys are also possible
- Typically the Maker should not offer keys that have already been included because the Taker will have no incentive to accept the offer. (In making an offer, the Maker is essentially saying, "I'll include these keys if you agree to include these other keys.")
- The `fee` is an optional transaction fee that will go to a farmer

Here is the command to make an offer:

```json
chia rpc data_layer make_offer '{
    "maker": [
        {
            "store_id": "14d1c3042ef38d76796146e6248e02b73db7a0eeefb740fa2e8439dad15bca27",
            "inclusions": [
                {
                    "key": "9999",
                    "value": "abc123"
                }
            ]
        }
    ],
    "taker": [
        {
            "store_id": "596dc917f56ceaf2df17a8cf9672b2e3cd49e2c1432b25834035aafbe063cbae",
            "inclusions": [
                {
                    "key": "0000",
                    "value": "def456"
                }
            ]
        }
    ],
    "fee": 1000000
}'
```

The offer will be contained within the response:

```json
{
  "offer": {
    "maker": [
      {
        "proofs": [
          {
            "key": "9999",
            "layers": [
              {
                "combined_hash": "0a3024099e40c27cfe294ce91bdabf727887fecd406d7208c53297f79d4e8902",
                "other_hash": "cd4046b6c3b03e20afd506b50e552f1b698283d72566732134437fcb364c47a5",
                "other_hash_side": "left"
              },
              {
                "combined_hash": "568ca0020114772138db61001c63ac8574a7c8c76c051dd2d3e28964496aa88c",
                "other_hash": "919735911d7f9ca0de316878ddb92e7772c9f39bf9d37e9d84ccab39f5d49a11",
                "other_hash_side": "left"
              }
            ],
            "node_hash": "b87c24e0521f559236a2e06d6e1bb196c138c1c9bfcadad3b25708e7eab97ca7",
            "value": "abc123"
          }
        ],
        "store_id": "14d1c3042ef38d76796146e6248e02b73db7a0eeefb740fa2e8439dad15bca27"
      }
    ],
    "offer": "000000040000000000000000000000000000000000000000000000000000000000000000c78e2c6bc993ecafeb48fcff38538ebe3b173273c216f5a1cff053b97ae6832a0000000000000000ff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0596dc917f56ceaf2df17a8cf9672b2e3cd49e2c1432b25834035aafbe063cbaea0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffa0e78043078f53b0e50ec7615432f690f4024f2366530a9fb0f2e7e1c3177051e080ffff04ffff01a057bfd1cb0adda3d94315053fda723f2028320faa8338225d99f629e3d46d43a9ffff04ffff01ff02ffff01ff02ff0affff04ff02ffff04ff03ff80808080ffff04ffff01ffff333effff02ffff03ff05ffff01ff04ffff04ff0cffff04ffff02ff1effff04ff02ffff04ff09ff80808080ff808080ffff02ff16ffff04ff02ffff04ff19ffff04ffff02ff0affff04ff02ffff04ff0dff80808080ff808080808080ff8080ff0180ffff02ffff03ff05ffff01ff04ffff04ff08ff0980ffff02ff16ffff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ff018080808080ff01808080ffffa00000000000000000000000000000000000000000000000000000000000000000ffffa00000000000000000000000000000000000000000000000000000000000000000ff01ff808080809a94d1f8c0bf47b21520dac4c94bd388f792182f910a5041b5ff2b0eb018f855a5535487391719a19200d928101f2c7209ab359bb28dac8b9e8daab2035dc9e70000000000000001ff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa014d1c3042ef38d76796146e6248e02b73db7a0eeefb740fa2e8439dad15bca27a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffa08d0e6200e482b4ac473df502ad15fe14d135030ce113fa2d29be637d6051292580ffff04ffff01a057bfd1cb0adda3d94315053fda723f2028320faa8338225d99f629e3d46d43a9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0886f4e8b972e7d39ee5af9a4a18ed5a3550b9583f0e42a7196a1cb6fc986925a5ad199cd225f819959bc3ea00be9e12aff018080ff018080808080ff01808080ffffa014d1c3042ef38d76796146e6248e02b73db7a0eeefb740fa2e8439dad15bca27ffa03fc78e848ac8b897f70628ee41d49265675c793ac8538d7efc736082448676b6ff0180ff01ffffff80ffff02ffff01ff02ffff01ff02ffff03ff5fffff01ff02ff3affff04ff02ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff81bfffff04ff82017fffff04ff8202ffffff04ffff02ff05ff8205ff80ff8080808080808080808080ffff01ff04ffff04ff10ffff01ff81ff8080ffff02ff05ff8205ff808080ff0180ffff04ffff01ffffff49ff3f02ff04ff0101ffff02ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff05ffff01ff02ffff03ffff02ff3effff04ff02ffff04ff82011fffff04ff27ffff04ff4fff808080808080ffff01ff02ff3affff04ff02ffff04ff0dffff04ff1bffff04ff37ffff04ff6fffff04ff81dfffff04ff8201bfffff04ff82037fffff04ffff04ffff04ff28ffff04ffff0bffff02ff26ffff04ff02ffff04ff11ffff04ffff02ff26ffff04ff02ffff04ff13ffff04ff82027fffff04ffff02ff36ffff04ff02ffff04ff82013fff80808080ffff04ffff02ff36ffff04ff02ffff04ff819fff80808080ffff04ffff02ff36ffff04ff02ffff04ff13ff80808080ff8080808080808080ffff04ffff02ff36ffff04ff02ffff04ff09ff80808080ff808080808080ffff012480ff808080ff8202ff80ff8080808080808080808080ffff01ff088080ff0180ffff018202ff80ff0180ffffff0bff12ffff0bff2cff3880ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff36ffff04ff02ffff04ff09ff80808080ffff02ff36ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ffff02ffff03ff1bffff01ff02ff2effff04ff02ffff04ffff02ffff03ffff18ffff0101ff1380ffff01ff0bffff0102ff2bff0580ffff01ff0bffff0102ff05ff2b8080ff0180ffff04ffff04ffff17ff13ffff0181ff80ff3b80ff8080808080ffff010580ff0180ff02ffff03ff17ffff01ff02ffff03ffff09ff05ffff02ff2effff04ff02ffff04ff13ffff04ff27ff808080808080ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff37ff808080808080ffff01ff088080ff0180ffff01ff010180ff0180ff018080ffff04ffff01ff01ffff81e8ff0bffffffffa0568ca0020114772138db61001c63ac8574a7c8c76c051dd2d3e28964496aa88c80ffa057bfd1cb0adda3d94315053fda723f2028320faa8338225d99f629e3d46d43a980ff808080ffff33ffa063e2dd2ffd1d2979373142625339eb6de76b3f019d3b1af6542d1d1d4a57414cff01ffffa014d1c3042ef38d76796146e6248e02b73db7a0eeefb740fa2e8439dad15bca27ffa0568ca0020114772138db61001c63ac8574a7c8c76c051dd2d3e28964496aa88cffa042ea0340b5c100f83fc526506bb9ccd9893645be112f721e52c1341b419c961e8080ffff3cff2480ffff3fffa03487cd97d84618edaa5596602591a31bb72d75eb7be4815d208f66affa32f9888080ffff04ffff01ffffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0596dc917f56ceaf2df17a8cf9672b2e3cd49e2c1432b25834035aafbe063cbaea0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da980ffff04ffff01ffa0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c280ffff04ffff01ffffa06bc6abf9b900c50d003c72e9798b920753c644f0497dc4aca1e9ba8e0cfcc4038080ff018080808080ffff80ff80ff80ff80ff80808080808c115c9297e9ccef4743a917868687ae531202f93f208cadabcaa623597d13ff43147af86fc0d05ae498ca6577e90793ffd3f2954a3b71987cbc67f771b450cd0000000000000001ff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa014d1c3042ef38d76796146e6248e02b73db7a0eeefb740fa2e8439dad15bca27a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffa0568ca0020114772138db61001c63ac8574a7c8c76c051dd2d3e28964496aa88c80ffff04ffff01a057bfd1cb0adda3d94315053fda723f2028320faa8338225d99f629e3d46d43a9ffff04ffff01ff01ffff33ffa042ea0340b5c100f83fc526506bb9ccd9893645be112f721e52c1341b419c961eff01ffffa014d1c3042ef38d76796146e6248e02b73db7a0eeefb740fa2e8439dad15bca27ffa0568ca0020114772138db61001c63ac8574a7c8c76c051dd2d3e28964496aa88cffa042ea0340b5c100f83fc526506bb9ccd9893645be112f721e52c1341b419c961e8080ffff3eff248080ff018080808080ff01808080ffffa09a94d1f8c0bf47b21520dac4c94bd388f792182f910a5041b5ff2b0eb018f855ffa09f34e6a9516d0061e91a138da9391312a2193130e9e8e1ca9f74b68b32d460b1ff0180ff01ffff808080e578eea84d3e4d0de66331f7ca352c46d3b22f44464c9238baf392e1e4ced255e7805fde263644b8004fc628ba86683f13697cd863a4fbbddc326fb656ab7e33000000e7335a43d5ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b08482072213b9860afc08b0e4445ab008d827ac8c61bf531b20f580b51a75d6076904b1d229b5aa4ab2215fc9aec33b20ff018080ff80ffff01ffff33ffa0b959014349a2da35df7dbc224c8ee9ec18f3cd74ec622377a5fc1a6c15487e25ff8600e7334b019580ffff34ff830f424080ffff3cffa089f362c330b03e80c56806982f7e081952ef34e6c053d3ad36cb7f1d2d4380a080ffff3dffa09f3e7e85d9a4654198ac2524a186e013a34622384636ba0306384d85dc63f66d8080ff8080a087379300380e531e9ced97e3599c7d8770ce163a8e7d9496898e63723325ae85b2c5f95f1322ff78ea0b2a7e6f71fb0bc4dce5863cc67d34076a21f72d5e062d141b963e7a90d31b692da5ccb97f6a32758214ec68b6fa45a464fdeaa5cf59",
    "taker": [
      {
        "inclusions": [
          {
            "key": "0000",
            "value": "def456"
          }
        ],
        "store_id": "596dc917f56ceaf2df17a8cf9672b2e3cd49e2c1432b25834035aafbe063cbae"
      }
    ],
    "trade_id": "9c4cd1062947e8fdcc91ba18f27ef45d3cecb086d27751703db213cba8d658a2"
  },
  "success": true
}
```

Because the offer is quite large, your command line might have trouble processing it if you paste it directly. Therefore, you are recommended to do the following:

- Copy the entire response into an editor that can handle JSON formatting
- Change the last line from `"success": true` to `"fee": [fee amount in mojos]` (for example, `"fee": 10000000`). This is a required transaction fee, paid by the Taker
- Save it as a json file (for example, `offer.json`) and send it to the Taker, who will input it in the [take_offer](#take_offer) example

The offer has now been saved as a .json file and been sent to the Taker. See [take_offer](#take_offer) for an example of how to accept the offer.

</details>

---

### `remove_subscriptions`

Functionality: Remove one or more URLs from a data store to which you subscribe. Note that this action will not remove the subscription to the data store itself. For that functionality, use [unsubscribe](#unsubscribe)

Usage: chia rpc data_layer [OPTIONS] remove_subscriptions [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type | Required | Description                              |
| :--- | :--- | :------- | :--------------------------------------- |
| id   | TEXT | True     | The hexadecimal store ID                 |
| urls | TEXT | True     | A list of URLs from which to unsubscribe |

<details>
<summary>Example</summary>

```json
chia rpc data_layer remove_subscriptions '{"id":"8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d", "urls":["http://www.example.com:8575"]}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `subscribe`

Functionality: Subscribe to a store ID

Usage: chia rpc data_layer [OPTIONS] subscribe [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type | Required | Description                                                              |
| :--- | :--- | :------- | :----------------------------------------------------------------------- |
| id   | TEXT | True     | The hexadecimal store ID                                                 |
| urls | TEXT | True     | A list of URLs where the data store resides. This list can be left blank |

<details>
<summary>Example 1</summary>

Subscribe to a data store without specifying any URLs:

```json
chia rpc data_layer subscribe '{"id":"8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d", "urls":[]}'
```

Response:

```json
{
  "success": true
}
```

</details>

<details>
<summary>Example 2</summary>

Subscribe to a data store using multiple URLs where that store resides:

```json
chia rpc data_layer subscribe '{"id":"8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d", "urls":["http://www.example.com:8575", "http://www.example2.com:8575"]}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `subscriptions`

Functionality: List the store ID for each current subscription

Usage: chia rpc data_layer [OPTIONS] subscriptions [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc data_layer subscriptions
```

Response:

```json
{
  "store_ids": [
    "9166b9bed97e0ce9b5d79564e8dba2975ae0637994e8908a31aaddd7a29bfb90",
    "a4a9a945a7511911aeaaefc9e6627831b1c30b1919c92c738592923f30fe3735",
    "550386f956c9932210c38c674e42dca9db9655b8155069540feaac91833c664b",
    "1163ac212bd5fe00efa86f8d3c4958cda08924870800d72dc332f508a1b2e35a",
    "8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d"
  ],
  "success": true
}
```

</details>

---

### `take_offer`

Functionality: Accept an offer to create one or more keys in exchange for the Maker creating one or more keys. Triggers a Chia transaction

Usage: chia rpc data_layer [OPTIONS] take_offer [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag  | Type | Required | Description                                                                                            |
| :---- | :--- | :------- | :----------------------------------------------------------------------------------------------------- |
| offer | TEXT | False    | The offer, in JSON format (the output from the `make_offer` RPC). Includes Maker and Taker information |
| fee   | TEXT | False    | Set the fee for the offer, in mojos                                                                    |

<details>
<summary>Example</summary>

This example will use the offer file created in the [make_offer](#make_offer) example.

Assuming the offer is saved in a file and named `offer.json` and the Taker has this file in the present working directory, here's how to accept the offer:

```json
chia rpc data_layer -j offer.json take_offer
```

Response:

```json
{
  "success": true,
  "trade_id": "705b5eac32f037e785a72658f1be405799b9149f9a6e0345e3c10b5d9eed0edf"
}
```

After the offer has been confirmed on the blockchain, we can see that the Maker has added the key from the offer ("0x9999"):

```json
chia rpc data_layer get_keys_values '{"id":"14d1c3042ef38d76796146e6248e02b73db7a0eeefb740fa2e8439dad15bca27"}'
```

Response:

```json
{
  "keys_values": [
    {
      "atom": null,
      "hash": "0x919735911d7f9ca0de316878ddb92e7772c9f39bf9d37e9d84ccab39f5d49a11",
      "key": "0x0002",
      "value": "0xcafef00d"
    },
    {
      "atom": null,
      "hash": "0xcd4046b6c3b03e20afd506b50e552f1b698283d72566732134437fcb364c47a5",
      "key": "0x0003",
      "value": "0xbeadfeed"
    },
    {
      "atom": null,
      "hash": "0xb87c24e0521f559236a2e06d6e1bb196c138c1c9bfcadad3b25708e7eab97ca7",
      "key": "0x9999",
      "value": "0xabc123"
    }
  ],
  "success": true
}
```

The Taker has also added the appropriate key from the offer ("0x0000"):

```json
chia rpc data_layer get_keys_values '{"id":"596dc917f56ceaf2df17a8cf9672b2e3cd49e2c1432b25834035aafbe063cbae"}'
```

Response:

```json
{
  "keys_values": [
    {
      "atom": null,
      "hash": "0x44d7462bce0023356bdb650ed8456b93ef09954b24e023f6add48e01a054e1f6",
      "key": "0x0001",
      "value": "0x1337dea1"
    },
    {
      "atom": null,
      "hash": "0x6bc6abf9b900c50d003c72e9798b920753c644f0497dc4aca1e9ba8e0cfcc403",
      "key": "0x0000",
      "value": "0xdef456"
    },
    {
      "atom": null,
      "hash": "0xcd4046b6c3b03e20afd506b50e552f1b698283d72566732134437fcb364c47a5",
      "key": "0x0003",
      "value": "0xbeadfeed"
    }
  ],
  "success": true
}
```

</details>

---

### `unsubscribe`

Functionality: Unsubscribe from a store ID

Usage: chia rpc data_layer [OPTIONS] unsubscribe [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type | Required | Description                                               |
| :--- | :--- | :------- | :-------------------------------------------------------- |
| id   | TEXT | True     | The hexadecimal ID of the store from which to unsubscribe |

:::info

The `unsubscribe` RPC may or may not delete any data, depending on which version of Chia you are running:
* Prior to version 2.1, the command did not delete the .dat files, nor did it delete from the database.
* As of version 2.1, the command deletes the .dat files, but does not delete from the database.
* In a future release, the command will also delete from the database.

:::

<details>
<summary>Example</summary>

```json
chia rpc data_layer unsubscribe '{"id":"8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d"}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `verify_offer`

Functionality: Verify that a DataLayer offer is well-formed

Usage: chia rpc data_layer [OPTIONS] verify_offer [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag  | Type | Required | Description                                                                                            |
| :---- | :--- | :------- | :----------------------------------------------------------------------------------------------------- |
| offer | TEXT | False    | The offer, in JSON format (the output from the `make_offer` RPC). Includes Maker and Taker information |

<details>
<summary>Example 1</summary>

This example will show a successful verification. It will use the offer file created in the [make_offer](#make_offer) example.

Assuming the offer is saved in a file and named `offer.json`, here's how to verify the offer:

```json
chia rpc data_layer -j offer.json verify_offer
```

Response:

```json
{
  "error": null,
  "fee": 1,
  "success": true,
  "valid": true
}
```

</details>

<details>
<summary>Example 2</summary>

This example will show an **unsuccessful** verification. It will use the offer file created in the [make_offer](#make_offer) example, with one byte modified to simulate file corruption:

```json
chia rpc data_layer -j offer.json verify_offer
```

Response:

```json
Request failed: {'error': 'non-hexadecimal number found in fromhex() arg at position 18699', 'success': False}
```

</details>

---

### `wallet_log_in`

Functionality: Request that the wallet service be logged in to the specified fingerprint

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type   | Required | Description                          |
| :---------- | :----- | :------- | :----------------------------------- |
| fingerprint | STRING | True     | The fingerprint of the wallet to use |

<details>
<summary>Example</summary>

```json
chia rpc data_layer wallet_log_in '{"fingerprint":"3404181419"}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

## Inherited commands

### `close_connection`

Functionality: Close an active connection

Note: Inherited from RPC Server

Usage: chia rpc data_layer [OPTIONS] close_connection [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

|  Flag   | Type | Required | Description                                                                            |
| :-----: | :--: | :------: | :------------------------------------------------------------------------------------- |
| node_id | TEXT |   True   | The hex ID of the node to close, obtainable from [`get_connections`](#get_connections) |

<details>
<summary>Example</summary>

```json
chia rpc data_layer close_connection '{"node_id":"0x8e961b617579d476419003728d6d71ab1b182f7d962e5db16f61ebfb157d771b"}'
```

Response:

```json
{
  "success": true
}
```

Verify that the connection has been closed:

```json
chia rpc data_layer get_connections
```

Response:

```json
{
  "connections": [],
  "success": true
}
```

</details>

---

### `get_connections`

Functionality: Get a list of active connections

Note: Inherited from RPC Server

Usage: chia rpc data_layer [OPTIONS] get_connections [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc data_layer get_connections
```

Response:

```json
{
  "connections": [
    {
      "bytes_read": 66,
      "bytes_written": 66,
      "creation_time": 1660636909.9794328,
      "last_message_time": 1660636909.9815319,
      "local_port": 8561,
      "node_id": "0x8e961b617579d476419003728d6d71ab1b182f7d962e5db16f61ebfb157d771b",
      "peer_host": "localhost",
      "peer_port": 58444,
      "peer_server_port": 58444,
      "type": 1
    }
  ],
  "success": true
}
```

</details>

---

### `open_connection`

Functionality: Open a connection to another node

Note: Inherited from RPC Server

Usage: chia rpc data_layer [OPTIONS] open_connection [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type    | Required | Description                                          |
| :--- | :------ | :------- | :--------------------------------------------------- |
| host | TEXT    | True     | The IP or URL of the node to connect to              |
| port | INTEGER | True     | The port through which to connect to the remote node |

Example:

<details>
<summary>Example</summary>

```json
chia rpc data_layer open_connection '{"host":"localhost", "port":"58444"}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `stop_node`

Functionality: Stop your local node

Note: Inherited from RPC Server

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc data_layer stop_node
```

Response:

```json
{
  "success": true
}
```

</details>

---
