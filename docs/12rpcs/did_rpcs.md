---
id: did1_rpcs
title: DID1 RPCs
sidebar_label: 12.3 DID1 RPCs
sidebar_position: 3
---

### Commands

* [`did_set_wallet_name`](#did_set_wallet_name)
* [`did_get_wallet_name`](#did_get_wallet_name)
* [`did_update_recovery_ids`](#did_update_recovery_ids)
* [`did_update_metadata`](#did_update_metadata)
* [`did_get_did`](#did_get_did)
* [`did_get_recovery_list`](#did_get_recovery_list)
* [`did_get_metadata`](#did_get_metadata)
* [`did_recovery_spend`](#did_recovery_spend)
* [`did_get_pubkey`](#did_get_pubkey)
* [`did_create_attest`](#did_create_attest)
* [`did_get_information_needed_for_recovery`](#did_get_information_needed_for_recovery)
* [`did_get_current_coin_info`](#did_get_current_coin_info)
* [`did_create_backup_file`](#did_create_backup_file)
* [`did_transfer_did`](#did_transfer_did)

## Note about Windows

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.
  
For example, here is a typical RPC command on Linux and MacOS:
```powershell
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet"}'
```

To run the same command on Windows, you need to escape the quotes, so it looks like this:
```powershell  
chia rpc wallet create_new_wallet '{\"wallet_type\": \"nft_wallet\"}'
```

## Reference

### `did_set_wallet_name`

Functionality: Set the name of a DID wallet

Usage: chia rpc wallet [OPTIONS] did_set_wallet_name [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data
| -h            | --help       | None | False    | Show a help message and exit

Request Parameters:

| Parameter | Required | Description |
|:----------|:---------|:------------|
| wallet_id | True     | The Wallet ID of the DID wallet on which to set the name |
| name      | True     | The new name of the DID wallet |

Example: 

```json
// Request
chia rpc wallet did_set_wallet_name '{\"wallet_id\": 2, \"name\": \"My DID Wallet\"}'

// Response
{
    "success": true,
    "wallet_id": 2
}
```

---

### `did_get_wallet_name`

Functionality: Given a DID wallet's ID, retrieve the name of that wallet

Usage: chia rpc wallet [OPTIONS] did_get_wallet_name [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit |

Request Parameters:

| Parameter | Required | Description |
|:----------|:---------|:------------|
| wallet_id | True     | The Wallet ID of the DID wallet on which to get the name |

Example: 

```json
// Request
chia rpc wallet did_get_wallet_name '{\"wallet_id\": 2}'

// Response
{
    "name": "My DID Wallet",
    "success": true,
    "wallet_id": 2
}
```

---

### `did_update_recovery_ids`

Functionality: Append one or more IDs to be used for recovery of a DID wallet. The current list can be obtained with the did_get_recovery_list endpoint

Usage: chia rpc wallet [OPTIONS] did_update_recovery_ids [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit |

Request Parameters:

| Parameter                  | Required | Description |
|:---------------------------|:---------|:------------|
| wallet_id                  | True     | The Wallet ID of the DID wallet for which to update the recovery IDs |
| new_list                   | True     | The new recovery ID list. Each item from this list will be appended to the existing list |
| num_verifications_required | False    | Optionally set the number of IDs required for wallet recovery. If not set, then the entire updated list will be required by default |

Example: 

```json
// Request
[todo]
// Response
```

---

### `did_update_metadata`

Functionality: Update the metadata for a DID wallet. The current metadata can be obtained with the did_get_metadata endpoint

Usage: chia rpc wallet [OPTIONS] did_update_metadata [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit |

Request Parameters:

| Parameter | Required | Description |
|:----------|:---------|:------------|
| wallet_id | True     | The Wallet ID of the DID wallet for which to update the metadata |
| metadata  | True     | The updated metadata |

Example: 

```json
// Request
[todo]
// Response
```

---

### `did_get_did`

Functionality: Fetch the my_did and coin_id (if applicable) settings for a given wallet

Usage: chia rpc wallet [OPTIONS] did_get_did [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit |

Request Parameters:

| Parameter | Required | Description |
|:----------|:---------|:------------|
| wallet_id | True     | The Wallet ID of the DID wallet for which to get the DID info |

Example: 

```json
// Request
chia rpc wallet did_get_did '{\"wallet_id\": 2}'

// Response
{
    "coin_id": "0xcc946f6965c511a2ba1ad84aaa916c58b245d43e328037e5758395820311b32d",
    "my_did": "15dbd596ea58ccf129b7f7cced9e2318b89ec07cf8ead71a71e1bb259ccb7f9b",
    "success": true,
    "wallet_id": 2
}
```

---

### `did_get_recovery_list`

Functionality: For a given wallet, fetch the recovery list, as well as the number of IDs required for recovery

Usage: chia rpc wallet [OPTIONS] did_get_recovery_list [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit |

Request Parameters:

| Parameter | Required | Description |
|:----------|:---------|:------------|
| wallet_id | True     | The Wallet ID of the DID wallet for which to get the recovery list |

Example: 

```json
// Request
chia rpc wallet did_get_recovery_list '{\"wallet_id\": 2}'

// Response
{
    "num_required": 0,
    "recovery_list": [],
    "success": true,
    "wallet_id": 2
}
```

---

### `did_get_metadata`

Functionality: Fetch the metadata for a given wallet

Usage: chia rpc wallet [OPTIONS] did_get_metadata [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit |

Request Parameters:

| Parameter | Required | Description |
|:----------|:---------|:------------|
| wallet_id | True     | The Wallet ID of the DID wallet for which to get the metadata list |

Example: 

```json
// Request
chia rpc wallet did_get_metadata '{\"wallet_id\": 2}'

[todo rerun command after adding metadata]
// Response
{
    "metadata": {},
    "success": true,
    "wallet_id": 2
}
```

---

### `did_recovery_spend`

Functionality: Recover a DID [todo explain better]

Usage: chia rpc wallet [OPTIONS] did_recovery_spend [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit |

Request Parameters:

| Parameter   | Required | Description |
|:------------|:---------|:------------|
| wallet_id   | True     | The Wallet ID of the DID wallet to recover |
| attest_data | True     | A list of attest files to be used for recovery |
| pubkey      | False    | The public key of the wallet to recover. If this is not provided, a temporary public key will be used instead |
| puzhash     | False    | The puzzle hash of the wallet to recover. If this is not provided, a temporary puzzle hash will be used instead |

Example: 

```json
// Request
[todo]
// Response
[todo]
```

---

### `did_get_pubkey`

Functionality: Get the public key for a DID

Usage: chia rpc wallet [OPTIONS] did_get_pubkey [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit |

Request Parameters:

| Parameter | Required | Description |
|:----------|:---------|:------------|
| wallet_id | True     | The Wallet ID of the DID wallet from which to obtain the public key |

Example:

```json
// Request
chia rpc wallet did_get_pubkey '{\"wallet_id\": 2}'

// Response
{
    "pubkey": "886826068778f285c442cfd08a45c7b55ecc9ef870b9b18810e81457c56df9764793686c1756e48a91586839a4abd290",
    "success": true
}
```

---

### `did_create_attest`

Functionality: Create an attest for a DID, to be used for recovery. This command will output the attest data, which can then be added or redirected to a file

Usage: chia rpc wallet [OPTIONS] did_create_attest [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit |

Request Parameters:

| Parameter | Required | Description |
|:----------|:---------|:------------|
| wallet_id | True     | The Wallet ID for which to create the attest |
| coin_name | True     | The coin to use for the attest |
| pubkey    | True     | The public key to use for the attest |
| puzhash   | True     | The puzzle hash to use for the attest |

Example:

```json
// Request
[todo]
// Response
[todo]
```

---

### `did_get_information_needed_for_recovery`

Functionality: Display all relevant information needed to recover a given DID

Usage: chia rpc wallet [OPTIONS] did_get_information_needed_for_recovery [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit |

Request Parameters:

| Parameter | Required | Description |
|:----------|:---------|:------------|
| wallet_id | True     | The Wallet ID of the DID wallet from which to obtain the recovery information |

Example:

```json
// Request
[todo: maybe doesn't work yet]
chia rpc wallet did_get_information_needed_for_recovery '{\"wallet_id\": 2}'

// Response
Request failed: {'error': "'NoneType' object has no attribute 'name'", 'success': False}
```

---

### `did_get_current_coin_info`

Functionality: Get the current coin info (parent coin, puzzle hash, amount) for a DID wallet

Usage: chia rpc wallet [OPTIONS] did_get_current_coin_info [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit |

Request Parameters:

| Parameter | Required | Description |
|:----------|:---------|:------------|
| wallet_id | True     | The Wallet ID of the DID wallet from which to obtain the coin info |

Example:

```json
// Request
chia rpc wallet did_get_current_coin_info '{\"wallet_id\": 2}'

// Response
{
    "did_amount": 1,
    "did_innerpuz": "0xbd33aa06a63014032cfa3a0ccc7a6d275d69214536e5816f72d34f9af7ed133a",
    "did_parent": "0x19b780c48d4923be92d2834c8ae4aaa7d1116d4e4c56d205ecebbd1e47f29d15",
    "my_did": "15dbd596ea58ccf129b7f7cced9e2318b89ec07cf8ead71a71e1bb259ccb7f9b",
    "success": true,
    "wallet_id": 2
}
```

---

### `did_create_backup_file`

Functionality: Output the backup data of a DID wallet's metadata. This output can then be saved or redirected to a file

Usage: chia rpc wallet [OPTIONS] did_create_backup_file [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit |

Request Parameters:

| Parameter | Required | Description |
|:----------|:---------|:------------|
| wallet_id | True     | The Wallet ID of the DID wallet from which to obtain the coin info |

Example:

```json
// Request

chia rpc wallet did_create_backup_file '{\"wallet_id\": 2}' > wallet2.bak
more wallet2.bak

// Response
{
    "backup_data": "cc3d1270ab82345b51f88ff4b4cf7148d9171b274032d9dbc73e996ed42bf226:eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9:1::ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b84b40fb8011ea25b35f8b67036f2397fce2d16dc67d1f83f929bfb34d1539c91478204524832f4f2e686602608a7dbaff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa015dbd596ea58ccf129b7f7cced9e2318b89ec07cf8ead71a71e1bb259ccb7f9ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080:0:{}",
    "success": true,
    "wallet_id": 2
}
```

---

### `did_transfer_did`

Functionality: Transfer a DID

Usage: chia rpc wallet [OPTIONS] did_transfer_did [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description |
|:--------------|:-------------|:-----|:---------|:------------|
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data
| -h            | --help       | None | False    | Show a help message and exit

Request Parameters:

| Parameter | Required | Description |
|:----------|:---------|:------------|
| wallet_id | True     | The Wallet ID of the DID wallet to transfer |
| inner_address | True | The address of the inner puzzle to which to transfer the DID |

Example:

```json
// Request
[todo]
// Response
[todo]
```

---