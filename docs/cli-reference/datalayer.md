---
sidebar_label: DataLayer
title: DataLayer CLI
slug: /datalayer-cli
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This page includes a comprehensive list of Chia's Command Line Interface commands for interacting with the DataLayer.

We also have documented the [RPC API](/datalayer-rpc) for interacting with the DataLayer.

The relevant DataLayer commands can be found by running `chia data`:

```bash
(venv) $ chia data -h
```

Commands that modify the blockchain include an optional fee. This fee can be specified in two ways:

1. The `-m` / `--fee` parameter can be specified explicitly in the command, as several of the examples in this document show
2. If the fee option is not explicitly specified, then the `data_layer:fee` setting in `~/.chia/mainnet/config/config.yaml` will be used. By default, this is set to 1 billion mojos (0.001 XCH)
3. If neither of these options is set, then no fee will be used

For commands that change the state of the DataLayer singleton (ie all on-chain commands), you will need to wait for confirmation before running another command. If you run a command before the previous transaction has been confirmed, you will receive this error: `Request failed: {'error': 'Already have a pending root waiting for confirmation.', 'success': False}`

The commands in this document will work with or without the `=` symbol. Additionally, hashes may or may not be prefixed with `0x`.

---

## Reference

### `add_mirror`

Functionality: Add a new mirror from a local or remote data store. Triggers a Chia transaction

Usage: `chia data add_mirror [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                                               |
| :------------ | :-------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| -i            | --id            | TEXT    | True     | The hexadecimal ID of the store to mirror                                                                                                 |
| -a            | --amount        | INTEGER | True     | The amount (in mojos) to spend to create the mirror. In theory, mirrors with a higher `amount` will be prioritized. Minimum `amount` is 0 |
| -u            | --url           | TEXT    | False    | A URL where the mirror will reside. Can be repeated to add multiple URLs in the same command                                              |
| -m            | --fee           | TEXT    | False    | Set the fees for the transaction, in XCH                                                                                                  |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under wallet in config.yaml                                   |
| -f            | --fingerprint   | INTEGER | False    | Fingerprint of the wallet to use                                                                                                          |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                                              |

<details>
<summary>Example</summary>

Create one mirror with multiple URLs:

```bash
chia data add_mirror -i 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f -a 1000 -u http://www.example.com:8575 -u http://www.example2.com:8575
```

Response:

```
None
```

</details>

---

### `add_missing_files`

Functionality: Use the database to restore all files for one or more local data stores

Usage: `chia data add_missing_files [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                                                  |
| :------------ | :-------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| -i            | --ids           | TEXT    | True     | The hexadecimal store id(s)                                                                                                                  |
| -o            | --override      | None    | False    | If set, will overwrite files that already exist (default: not set)                                                                           |
| -n            | --no-override   | None    | False    | If set, will not overwrite files that already exist (default: set)                                                                           |
| -d            | --directory     | TEXT    | False    | If specified, use a non-default directory to write the files (default: `~/.chia/mainnet/data_layer/db/server_files_location_<network>`)      |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under data_layer in config.yaml                                  |
| -f            | --fingerprint   | INTEGER | False    | Fingerprint of the wallet to use                                                                                                             |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                                                 |

<details>
<summary>Example</summary>

For this example, there is one local store:

```json
ls ~/.chia/mainnet/data_layer/db/server_files_location_testnet10/
```

Response:

```
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-0000000000000000000000000000000000000000000000000000000000000000-delta-2-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-0000000000000000000000000000000000000000000000000000000000000000-full-2-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-b5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2-delta-3-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-b5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2-full-3-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-d6d6b4d6bbd77aaa5927c8a21a1451b35f4860a7f9a58e51dae04037da9c08e8-delta-4-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-d6d6b4d6bbd77aaa5927c8a21a1451b35f4860a7f9a58e51dae04037da9c08e8-full-4-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-e488fa1bf0f712b224df0daf312b3d479f80e3a330d4bebd8f26a0d52dc0ebbb-delta-1-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-e488fa1bf0f712b224df0daf312b3d479f80e3a330d4bebd8f26a0d52dc0ebbb-full-1-v1.0.dat
```

Intentionally move the files and create an empty folder. This will simulate file corruption:

```json
mv ~/.chia/mainnet/data_layer/db/server_files_location_testnet10 ~/.chia/mainnet/data_layer/db/server_files_location_testnet10_bak
mkdir ~/.chia/mainnet/data_layer/db/server_files_location_testnet10/
```

Next, restore the files:

```json
chia data add_missing_files
```

Response:

```json
None
```

Finally, verify that the files have been restored:

```json
ls ~/.chia/mainnet/data_layer/db/server_files_location_testnet10/
```

Response:

```json
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-0000000000000000000000000000000000000000000000000000000000000000-delta-2-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-0000000000000000000000000000000000000000000000000000000000000000-full-2-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-b5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2-delta-3-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-b5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2-full-3-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-d6d6b4d6bbd77aaa5927c8a21a1451b35f4860a7f9a58e51dae04037da9c08e8-delta-4-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-d6d6b4d6bbd77aaa5927c8a21a1451b35f4860a7f9a58e51dae04037da9c08e8-full-4-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-e488fa1bf0f712b224df0daf312b3d479f80e3a330d4bebd8f26a0d52dc0ebbb-delta-1-v1.0.dat
1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f-e488fa1bf0f712b224df0daf312b3d479f80e3a330d4bebd8f26a0d52dc0ebbb-full-1-v1.0.dat
```

</details>

---

### `clear_pending_roots`

Functionality: Clear pending roots that will not be published, associated data may not be recoverable

Usage: `chia data clear_pending_roots [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                 |
| :------------ | :-------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| -i            | --id            | TEXT    | True     | The ID of the store from which to clear the pending roots                                                   |
|               | --yes           | None    | False    | Set to confirm the action without prompting [Default: not set / prompt to confirm]                          |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under data_layer in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                          |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                |


<details>
<summary>Example</summary>

To clear all pending roots, you need to enter the store ID. An example of this which also disables prompting:

```bash
chia data clear_pending_roots -i 2772c8108e19f9fa98ff7bc7d4bafd821319bc90af6b610d086b85f4c21fa816 --yes
```

Response:

```bash
{
    "root": {
        "generation": 1,
        "node_hash": "e488fa1bf0f712b224df0daf312b3d479f80e3a330d4bebd8f26a0d52dc0ebbb",
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

Usage: `chia data create_data_store [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                 |
| :------------ | :-------------- | :------ | :------: | :---------------------------------------------------------------------------------------------------------- |
| -dp           | --data-rpc-port | INTEGER |  False   | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under data_layer in config.yaml |
| -m            | --fee           | TEXT    |  False   | Set the fees for the transaction, in XCH                                                                    |
|               | --verbose       | None    |  False   | Set to enable verbose output                                                                                |
| -f            | --fingerprint   | INTEGER |  False   | Set the fingerprint to specify which wallet to use                                                          |
| -h            | --help          | None    |  False   | Show a help message and exit                                                                                |

<details>
<summary>Example</summary>

Create a new data store:

```bash
chia data create_data_store -m 0.00001
```

Response:

```
{
    'id': '1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f',
    'success': True,
    'txs':
    [
        {
            'additions':
            [
                {
                    'amount': 1,
                    'parent_coin_info': '0xb4a1a658aaefd10930ecbccd51ac2c9a4853435b14acdb0de84729bfbefc791c',
                    'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
                },
                {
                    'amount': 14999989999999,
                    'parent_coin_info': '0xb4a1a658aaefd10930ecbccd51ac2c9a4853435b14acdb0de84729bfbefc791c',
                    'puzzle_hash': '0x478255c372cec71557c20459f4b690fb1b7c57da3fcfc4b6396d78d9a396e384'
                },
                {
                    'amount': 1,
                    'parent_coin_info': '0x1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f',
                    'puzzle_hash': '0xd650e81d45c7381183c14c3363a81aa78cb3acfe213e46da26df75cd431557f9'
                }
            ],
            'amount': 1,
            'confirmed': False,
            'confirmed_at_height': 0,
            'created_at_time': 1661141324,
            'fee_amount': 10000000,
            'memos': [],
            'name': '0xaee362ae9d0ce3992b3bfb7cc48bde17f3d794cc383ff1d5e49a4d75dbf004d6',
            'removals':
            [
                {
                    'amount': 15000000000000,
                    'parent_coin_info': '0x81fc1729bad3f19699461b1ee455a92493ef4c1d60ba37d22ac187a18367e08e',
                    'puzzle_hash': '0x221c0e9cd9b7f536e9a204ef93519e6c9d4b4c9a049bde8d66fa1816c23120d2'
                },
                {
                    'amount': 1,
                    'parent_coin_info': '0xb4a1a658aaefd10930ecbccd51ac2c9a4853435b14acdb0de84729bfbefc791c',
                    'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
                }
            ],
            'sent': 10,
            'sent_to': [],
            'spend_bundle': {
                'aggregated_signature': '0x8c431f07698ad69fd14ab04d77683801e6b908e441074f5ef5268350483d194a09a8b3cde681cb5c5fcf6444e0c9d4bf00999e8e6ad1522891baa590f82d92e2876b08e34b1f3156d0fe88ce206e5ed1567863e10a0397fd0a8a66bcbd5007b0',
                'coin_spends':
                [
                    {
                        'coin':
                        {
                            'amount': 15000000000000,
                            'parent_coin_info': '0x81fc1729bad3f19699461b1ee455a92493ef4c1d60ba37d22ac187a18367e08e',
                            'puzzle_hash': '0x221c0e9cd9b7f536e9a204ef93519e6c9d4b4c9a049bde8d66fa1816c23120d2'
                        },
                        'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b3deeeb00319624e26767c5cf777cf9a02d046510181ed29f233e2847fa8ef28ede05d2770bb1b8f101ea8ae20527d61ff018080',
                        'solution': '0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa0478255c372cec71557c20459f4b690fb1b7c57da3fcfc4b6396d78d9a396e384ff860da47513597f80ffff34ff840098968080ffff3cffa084f72a9a3ce5152e1d627a259a0c1c90e6af389cb26af48173d84e374ecc518080ffff3dffa03a0ed375dff192685d1ef9a74424788b04655700bee898f0ea8445f8b55d38338080ff8080'
                    },
                    {
                        'coin':
                        {
                            'amount': 1,
                            'parent_coin_info': '0xb4a1a658aaefd10930ecbccd51ac2c9a4853435b14acdb0de84729bfbefc791c',
                            'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
                        },
                        'puzzle_reveal': '0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080',
                        'solution': '0xffa0d650e81d45c7381183c14c3363a81aa78cb3acfe213e46da26df75cd431557f9ff01ffffa00000000000000000000000000000000000000000000000000000000000000000ffa0adcbcbaf4594e8d3057ea3a64a40560720ede80e720f867d2631069c27459de58080'
                    }
                ]
            },
            'to_puzzle_hash': '0x0202020202020202020202020202020202020202020202020202020202020202',
            'trade_id': None,
            'type': 0,
            'wallet_id': 0
        },
        {
            'additions':
            [
                {
                    'amount': 1,
                    'parent_coin_info': '0xb4a1a658aaefd10930ecbccd51ac2c9a4853435b14acdb0de84729bfbefc791c',
                    'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
                },
                {
                    'amount': 14999989999999,
                    'parent_coin_info': '0xb4a1a658aaefd10930ecbccd51ac2c9a4853435b14acdb0de84729bfbefc791c',
                    'puzzle_hash': '0x478255c372cec71557c20459f4b690fb1b7c57da3fcfc4b6396d78d9a396e384'
                }
            ],
            'amount': 1,
            'confirmed': False,
            'confirmed_at_height': 0,
            'created_at_time': 1661141324,
            'fee_amount': 10000000,
            'memos': [],
            'name': '0xbb4cb461126d9ea9492e767462b9a4e408e497231c2093474cba2bcfe4397104',
            'removals':
            [
                {
                    'amount': 15000000000000,
                    'parent_coin_info':
                    '0x81fc1729bad3f19699461b1ee455a92493ef4c1d60ba37d22ac187a18367e08e',
                    'puzzle_hash': '0x221c0e9cd9b7f536e9a204ef93519e6c9d4b4c9a049bde8d66fa1816c23120d2'
                }
            ],
            'sent': 0,
            'sent_to': [],
            'spend_bundle': None,
            'to_puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9',
            'trade_id': None,
            'type': 1,
            'wallet_id': 1
        }
    ]
}
```

</details>

---

### `delete_mirror`

Functionality: Delete a mirror, by `coin_id`. Triggers a Chia transaction

Usage: `chia data delete_mirror [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                 |
| :------------ | :-------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| -c            | --coin_id       | TEXT    | True     | The coin_id of the mirror to delete (obtainable from the [get_mirrors](#get_mirrors) command)               |
| -m            | --fee           | TEXT    | False    | Set the fees for the transaction, in XCH                                                                    |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under data_layer in config.yaml |
| -f            | --fingerprint   | INTEGER |  False   | Set the fingerprint to specify which wallet to use                                                          |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                |

<details>
<summary>Example</summary>

```bash
chia data delete_mirror -c b5756487c17fe3a2628e45a9d3d42e89231af718bb1735e6c8441e07ec005f9d -m 0.000001
```

Response:

```
{'success': True}
```

</details>

---

### `get_keys`

Functionality: Get all keys associated with a store ID

Usage: `chia data get_keys [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                 |
| :------------ | :-------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| -store        | --id            | TEXT    | True     | The hexadecimal store id                                                                                    |
| -r            | --root_hash     | TEXT    | False    | The hexadecimal root hash                                                                                   |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under data_layer in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                          |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                |

<details>
<summary>Example</summary>

```bash
chia data get_keys --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f
```

Response:

```
{
    'keys': [
        '0x0004',
        '0x0005'
    ],
    'success': True
}
```

</details>

---

### `get_keys_values`

Functionality: Get all keys and values for a store. Must be subscribed to store ID

Usage: `chia data get_keys_values [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                 |
| :------------ | :-------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| -store        | --id            | TEXT    | True     | The hexadecimal store id                                                                                    |
| -r            | --root_hash     | TEXT    | False    | The hexadecimal root hash                                                                                   |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under data_layer in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                          |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                |

<details>
<summary>Example</summary>

```bash
chia data get_keys_values --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f
```

Response:

```
{
    'keys_values': [
        {
            'atom': None,
            'hash': '0x26e60dd9b493eee1f6781fc13dd025e0bfafcde5a103c95dd087d91bd848d406',
            'key': '0x0004',
            'value': '0x0123456789abcdef'
        },
        {
            'atom': None,
            'hash': '0xc2dc94c2a85d7db4cfdd1d907bcc441c8fce595db2e2075b973fb8171e2f19a2',
            'key': '0x0005',
            'value': '0xbeadfeed'
        }
    ],
    'success': True
}
```

</details>

---

### `get_kv_diff`

Functionality: Get the kv diff between two hashes within the same store ID

Usage: `chia data get_kv_diff [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                 |
| :------------ | :-------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| -store        | --id            | TEXT    | True     | The hexadecimal store ID                                                                                    |
| -hash_1       | --hash_1        | TEXT    | True     | The first hash to compare                                                                                   |
| -hash_2       | --hash_2        | TEXT    | True     | The second hash to compare                                                                                  |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under data_layer in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                          |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                |

<details>
<summary>Example</summary>

```bash
chia data get_kv_diff --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f -hash_1 0x26e60dd9b493eee1f6781fc13dd025e0bfafcde5a103c95dd087d91bd848d406 -hash_2 0xc2dc94c2a85d7db4cfdd1d907bcc441c8fce595db2e2075b973fb8171e2f19a2
```

Response:

```
{
    'diff': [
        {
            'key': '0005',
            'type': 'INSERT',
            'value': 'beadfeed'
        },
        {
            'key': '0004',
            'type': 'DELETE',
            'value': '0123456789abcdef'
        }
    ],
    'success': True
}
```

</details>

---

### `get_mirrors`

Functionality: List all mirrors for a store ID

Usage: `chia data get_mirrors [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                             |
| :------------ | :-------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------ |
| -i            | --id            | TEXT    | True     | The hexadecimal ID of the store for which to get mirrors                                                |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under wallet in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                      |
| -h            | --help          | None    | False    | Show a help message and exit                                                                            |

<details>
<summary>Example</summary>

```bash
chia data get_mirrors -i 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f
```

Response:

```
{
    'mirrors': [
        {
            'amount': 1000,
            'coin_id': 'b5756487c17fe3a2628e45a9d3d42e89231af718bb1735e6c8441e07ec005f9d',
            'launcher_id': '1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f',
            'ours': True,
            'urls': [
                'http://www.example.com:8575',
                'http://www.example2.com:8575'
            ]
        }
    ],
    'success': True
}
```

</details>

---

### `get_owned_stores`

Functionality: Get owned stores

Usage: `chia data get_owned_stores [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                             |
| :------------ | :-------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------ |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under wallet in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                      |
| -h            | --help          | None    | False    | Show a help message and exit                                                                            |

<details>
<summary>Example</summary>

```bash
chia data get_owned_stores
```

Response:

```
{
    'store_ids': [
        '39114b28a3674b6c2c0ed65d3518842fd17f9df46794f49cd223f9f3a463f09d',
        '5d8f5c88f27804f5c387e070403faece14acb74460bbf7d47739178a3774eff3',
        '77e9c21be435dded6e8c9b32e93b2b880665f5b34f860a642f22d3fa500ce457',
        '9d0c65e77c750eac28b3fa78e57cdcec59fe53448eb59bdfbfa694d89f262b4b'
    ],
    'success': True
}
```

</details>

---

### `get_root`

Functionality: Get the Merkle Root and timestamp of a given store ID

Usage: `chia data get_root [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                 |
| :------------ | :-------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| -store        | --id            | TEXT    | True     | The hexadecimal store id                                                                                    |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under data_layer in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                          |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                |

<details>
<summary>Example</summary>

```bash
chia data get_root --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f
```

Response:

```
{
    'confirmed': True,
    'hash': '0xd6d6b4d6bbd77aaa5927c8a21a1451b35f4860a7f9a58e51dae04037da9c08e8',
    'success': True,
    'timestamp': 1661148611
}
```

</details>

---

### `get_root_history`

Functionality: Get a history of root hashes for a Store ID that you subscribe to

Usage: `chia data get_root_history [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                 |
| :------------ | :-------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| -store        | --id            | TEXT    | True     | The hexadecimal store id                                                                                    |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under data_layer in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                          |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                |

<details>
<summary>Example</summary>

```bash
chia data get_root_history --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f
```

Response:

```
{
    'root_history': [
        {
            'confirmed': True,
            'root_hash': '0x0000000000000000000000000000000000000000000000000000000000000000',
            'timestamp': 1661141342
        },
        {
            'confirmed': True,
            'root_hash': '0xe488fa1bf0f712b224df0daf312b3d479f80e3a330d4bebd8f26a0d52dc0ebbb',
            'timestamp': 1661144917
        },
        {
            'confirmed': True,
            'root_hash': '0x0000000000000000000000000000000000000000000000000000000000000000',
            'timestamp': 1661145223
        },
        {
            'confirmed': True,
            'root_hash': '0xb5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2',
            'timestamp': 1661145404
        },
        {
            'confirmed': True,
            'root_hash': '0xd6d6b4d6bbd77aaa5927c8a21a1451b35f4860a7f9a58e51dae04037da9c08e8',
            'timestamp': 1661148611
        }
    ],
    'success': True
}
```

</details>

---

### `get_subscriptions`

Functionality: Get subscribed stores, including the owned stores

Usage: `chia data get_subscriptions [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                 |
| :------------ | :-------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under data_layer in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                          |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                |

<details>
<summary>Example</summary>

```bash
chia data get_subscriptions
```

Response:

```
{
    'store_ids': [
        'ba934d7f4ad47c34cb1a99d3c57adacb1883cff5528cca67c34f724f3560e401',
        '9d0c65e77c750eac28b3fa78e57cdcec59fe53448eb59bdfbfa694d89f262b4b',
        '39114b28a3674b6c2c0ed65d3518842fd17f9df46794f49cd223f9f3a463f09d',
        '77e9c21be435dded6e8c9b32e93b2b880665f5b34f860a642f22d3fa500ce457',
        '5d8f5c88f27804f5c387e070403faece14acb74460bbf7d47739178a3774eff3',
        'a101396917a68f79e9119eaef738162d73e23b43e952561f21bdb1a1c171df89',
        '0f2257618880bf2a6d8d3c223147e06fa547520802e44a5359d240cdf0b9dbe7'
    ],
    'success': True
}
```

</details>

---

### `get_sync_status`

Functionality: Get locally stored root compared to the root of the singleton

Usage: `chia data get_sync_status [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                 |
| :------------ | :-------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| -store        | --id            | TEXT    | True     | The hexadecimal store id                                                                                    |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under data_layer in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                          |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                |

If the `root_hash` matches the `target_root_hash`, then the store is synced.

<details>
<summary>Example</summary>

```bash
chia data get_sync_status -store 39114b28a3674b6c2c0ed65d3518842fd17f9df46794f49cd223f9f3a463f09d
```

Response:

```
{
    'success': True,
    'sync_status': {
        'generation': 1,
        'root_hash': '532d8df550bdbdef28c1a7b27eaefc812afb99eabd59b3c041000c7ea352e900',
        'target_generation': 1,
        'target_root_hash': '532d8df550bdbdef28c1a7b27eaefc812afb99eabd59b3c041000c7ea352e900'
    }
}
```

</details>

---

### `get_value`

Functionality: Get a value from a Store's key

Usage: `chia data get_value [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                 |
| :------------ | :-------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| -store        | --id            | TEXT    | True     | The hexadecimal store id                                                                                    |
| -h            | --key           | TEXT    | True     | The hexadecimal key                                                                                         |
| -r            | --root_hash     | TEXT    | False    | The hexadecimal root hash                                                                                   |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under data_layer in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                          |
|               | --help          | None    | False    | Show a help message and exit                                                                                |

<details>
<summary>Example</summary>

```bash
chia data get_value --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f --key 0004
```

Response:

```
{
    'success': True,
    'value': '0123456789abcdef'
}
```

</details>

---

### `plugins`

Functionality: Get information about configured uploader/downloader plugins

Usage: `chia data plugins [OPTIONS] COMMAND [ARGS]...`

Commands: `check` (Calls the plugin_info endpoint on all configured plugins)

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                 |
| :------------ | :-------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------- |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                |

Note that currently `check` is the only sub-command under the `plugins` command. This command is shown in the example.

<details>
<summary>Example</summary>

```bash
chia data plugins check
```

Response:

```bash
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

### `remove_subscription`

Functionality: Remove one or more URLs from a data store to which you subscribe. Note that this action will not remove the subscription to the data store itself. For that functionality, use [unsubscribe](#unsubscribe)

Usage: `chia data remove_subscription [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                             |
| :------------ | :-------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------ |
| -store        | --id            | TEXT    | True     | The hexadecimal ID of the store to which you would like to subscribe                                    |
| -u            | --url           | TEXT    | False    | A URL where the data store resides. This argument can be used multiple times in the same command        |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under wallet in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                      |
| -h            | --help          | None    | False    | Show a help message and exit                                                                            |

<details>
<summary>Example</summary>

```bash
chia data remove_subscription -store 8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d -u http://www.example.com:8575
```

Response:

```
None
```

</details>

---

### `subscribe`

Functionality: Subscribe to a store ID

Usage: `chia data subscribe [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                             |
| :------------ | :-------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------ |
| -store        | --id            | TEXT    | True     | The hexadecimal ID of the store to which you would like to subscribe                                    |
| -u            | --url           | TEXT    | False    | A URL where the data store resides. This argument can be used multiple times in the same command        |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under wallet in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                      |
| -h            | --help          | None    | False    | Show a help message and exit                                                                            |

<details>
<summary>Example 1</summary>

Subscribe to a data store without specifying any URLs:

```bash
chia data subscribe -store 8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d
```

Response:

```
None
```

Use the `subscriptions` RPC to list all current subscriptions:

```bash
chia rpc data_layer subscriptions
```

Response:

```bash
{
    "store_ids": [
        "1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f",
        "8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d"
    ],
    "success": true
}
```

</details>

<details>
<summary>Example 2</summary>

Subscribe to a data store using multiple URLs where that store resides:

```bash
chia data subscribe -store 8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d -u http://www.example.com:8575 -u http://www.example2.com:8575
```

Response:

```
None
```

Use the `subscriptions` RPC to list all current subscriptions:

```bash
chia rpc data_layer subscriptions
```

Response:

```bash
{
    "store_ids": [
        "1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f",
        "8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d"
    ],
    "success": true
}
```

</details>

---

### `unsubscribe`

Functionality: Unsubscribe from a store ID

Usage: `chia data unsubscribe [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                             |
| :------------ | :-------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------ |
| -store        | --id            | TEXT    | True     | The hexadecimal ID of the store to which you would like to unsubscribe                                  |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under wallet in config.yaml |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                      |
|               | --retain        | None    | False    | Retain local .dat files [Default: false (don't retain data)]                                            |
| -h            | --help          | None    | False    | Show a help message and exit                                                                            |

:::info

The `unsubscribe` command may or may not delete any data, depending on which version of Chia you are running:
* Prior to version 2.1, the command did not delete the .dat files, nor did it delete from the database.
* As of version 2.1, the command deletes the .dat files, but does not delete from the database.
* In a future release, the command will also delete from the database.

:::

Example:

<details>
<summary>Example</summary>

```bash
chia data unsubscribe -store 8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d
```

Response:

```
None
```

</details>

---

### `update_data_store`

Functionality: Update a data store with a given changelist. Triggers a Chia transaction

Usage: `chia data update_data_store [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                             |
| :------------ | :-------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------ |
| -store        | --id            | TEXT    | True     | The hexadecimal store ID                                                                                |
| -d            | --changelist    | TEXT    | True     | A JSON object representing the changelist                                                               |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under wallet in config.yaml |
| -m            | --fee           | TEXT    | False    | Set the fees for the transaction, in XCH                                                                |
| -f            | --fingerprint   | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                      |
| -h            | --help          | None    | False    | Show a help message and exit                                                                            |

A few notes on the `-d` / `--changelist` option:

- The entire list must be formatted as a JSON array
- There are two actions allowed: `insert` and `delete`
- `insert` requires `key` and `value` flags
- `delete` requires a `key` flag only
- Keys and values must be written in hex format. Values can be derived from text or binary.
- Labels, keys and values must all be enclosed in double quotes
- Multiple inserts and deletes are allowed
- The size of a single `value` flag is limited to 100 MiB. However, adding anything close to that size has not been tested and could produce unexpected results.
- On Windows, you must escape the double quotes in the JSON array with backslashes. See below for an example. This is not required on MacOS or Linux.

The following examples will show the basic functionality of this command.

<details>
<summary>Example 1 -- Insert a single key/value pair</summary>

```bash
chia data update_data_store --id=1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f -d '[{"action":"insert", "key":"0003", "value":"abc123"}]'
```

Response:

```
{
    'success': True,
    'tx_id': '0xed157b50b94a849d3d19a0ef4e1b0e07bda863e4d65bd1527fa6f59062bb5c78'
}
```

</details>

<details>
<summary>Example 2 -- Delete a single key</summary>

```bash
chia data update_data_store --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f --changelist '[{"action":"delete", "key":"0003"}]'
```

Response:

```
{
    'success': True,
    'tx_id': '0x2a64ef42baf05c6f4d446ba8638c2f2b2c26e5a91ad62e0c5151df40d0f92ec2'
}
```

</details>

<details>
<summary>Example 3 -- Insert two keys</summary>

```bash
chia data update_data_store --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f --changelist '[{"action":"insert", "key":"0x0004", "value":"123abc"},{"action":"insert", "key":"0005", "value":"0xbeadfeed"}]'
```

Response:

```
{
    'success': True,
    'tx_id': '0xea22328f8843fab4149d0589e43217d88047ceeb41ef610e59717d13127bab7c'
}
```

List all keys and values after running the previous command:

```bash
chia data get_keys_values --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f
```

Response:

```bash
{
    'keys_values': [
        {
            'atom': None,
            'hash': '0x7e193b814080e50aa7780bcf71fd0422a0397ad3e57dc1eac71d93183efb39ba',
            'key': '0x0004',
            'value': '0x123abc'
        },
        {
            'atom': None,
            'hash': '0xc2dc94c2a85d7db4cfdd1d907bcc441c8fce595db2e2075b973fb8171e2f19a2',
            'key': '0x0005',
            'value': '0xbeadfeed'
        }
    ],
    'success': True
}
```

</details>

<details>
<summary>Example 4 -- Show that you may not overwrite an existing key</summary>

```bash
chia data update_data_store --id=1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f -d '[{"action":"insert", "key":"0004", "value":"0123456789abcdef"}]'
```

Response:

```
Exception from 'data': {'error': 'Key already present: 0004', 'success': False}
```

</details>

<details>
<summary>Example 5 -- Delete and add the same key in the same command</summary>

```bash
chia data update_data_store --id=1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f -d '[{"action":"delete", "key":"0004"}, {"action":"insert", "key":"0004", "value":"0123456789abcdef"}]'
```

Response:

```
{
    'success': True,
    'tx_id': '0xf2631a4d326d937b4ac4c89c400d4f33b2d3caf34d7794cf89e2c5d06c9a4648'
}
```

Show the result of running the previous command:

```bash
chia data get_keys_values --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f
```

Response:

```bash
{'keys_values': [{'atom': None, 'hash': '0x26e60dd9b493eee1f6781fc13dd025e0bfafcde5a103c95dd087d91bd848d406', 'key': '0x0004', 'value': '0x0123456789abcdef'}, {'atom': None, 'hash': '0xc2dc94c2a85d7db4cfdd1d907bcc441c8fce595db2e2075b973fb8171e2f19a2', 'key': '0x0005', 'value': '0xbeadfeed'}], 'success': True}
```

</details>

<details>
<summary>Example 6 -- Show a key/value pair that was inserted into the Climate Warehouse
</summary>

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

</details>

---

### `wallet_log_in`

Functionality: Request that the wallet service be logged in to the specified fingerprint

Usage: `chia data wallet_log_in [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                             |
| :------------ | :-------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------ |
| -dp           | --data-rpc-port | INTEGER | False    | Set the port where the DataLayer is hosting the RPC interface. See rpc_port under wallet in config.yaml |
| -f            | --fingerprint   | INTEGER | True     | Fingerprint of the wallet to use                                                                        |
| -h            | --help          | None    | False    | Show a help message and exit                                                                            |

---
