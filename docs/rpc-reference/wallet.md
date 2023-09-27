---
sidebar_label: Wallet
title: Wallet RPC
slug: /wallet-rpc
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This document provides a comprehensive reference to Chia's Wallet RPC API (minus the DID and NFT RPCs, which are documented on their own dedicated pages).

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet"}'
```

To run the same command on Windows, you need to escape the quotes with backslashes. In other words, add a \ before each double quote, such that:

    "fee" becomes \"fee\"
    "1000" becomes \"1000\"
    etc

</details>

## Key management

### `add_key`

Functionality: Create a new key (wallet/fingerprint) from a given mnemonic seed phrase

Usage: chia rpc wallet [OPTIONS] add_key [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag     | Type       | Required | Description                                           |
| :------- | :--------- | :------- | :---------------------------------------------------- |
| mnemonic | TEXT ARRAY | True     | A 24-word mnemonic seed phrase, expressed as an array |

<details>
<summary>Example</summary>

```json
chia rpc wallet add_key '{"mnemonic": ["hint", "dice", "session", "fun", "budget", "strong", "album", "lava", "tackle", "sudden", "garage", "people", "bundle", "federal", "chest", "process", "vicious", "behave", "nephew", "zero", "vital", "ocean", "artist", "lawsuit"]}'
```

Response:

```json
{
  "fingerprint": 874731676,
  "success": true
}
```

</details>

---

### `check_delete_key`

Functionality: Display whether a fingerprint has a balance, and whether it is used for farming or pool rewards. This is helpful when determining whether it is safe to delete a key without first backing it up

Usage: chia rpc wallet [OPTIONS] check_delete_key [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag             | Type   | Required | Description                                                        |
| :--------------- | :----- | :------- | :----------------------------------------------------------------- |
| fingerprint      | NUMBER | True     | The wallet's fingerprint, obtainable by running `chia wallet show` |
| max_ph_to_search | NUMBER | False    | The maximum number of puzzle hashes to search [Default: 100]       |

<details>
<summary>Example</summary>

```json
chia rpc wallet check_delete_key '{"fingerprint": 874731676, "max_ph_to_search": 200}'
```

Response:

```json
{
  "fingerprint": 874731676,
  "success": true,
  "used_for_farmer_rewards": false,
  "used_for_pool_rewards": false,
  "wallet_balance": false
}
```

</details>

---

### `delete_all_keys`

Functionality: Delete all keys from the wallet

Usage: chia rpc wallet [OPTIONS] delete_all_keys [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

:::warning

This will delete ALL keys without any further prompts. Prior to running this command, be sure to either verify that each key can be safely deleted by running [check_delete_key](#check_delete_key), or back up each seed phrase for later recovery

:::

<details>
<summary>Example</summary>

```json
chia rpc wallet delete_all_keys
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `delete_key`

Functionality: Delete a key, based on its wallet fingerprint

Usage: chia rpc wallet [OPTIONS] delete_key [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type   | Required | Description                                                        |
| :---------- | :----- | :------- | :----------------------------------------------------------------- |
| fingerprint | NUMBER | True     | The wallet's fingerprint, obtainable by running `chia wallet show` |

<details>
<summary>Example</summary>

```json
chia rpc wallet delete_key '{"fingerprint": 874731676}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `generate_mnemonic`

Functionality: Generates a random 24-word mnemonic seed phrase

Usage: chia rpc wallet [OPTIONS] generate_mnemonic [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet generate_mnemonic
```

Response:

```json
{
  "mnemonic": [
    "hint",
    "dice",
    "session",
    "fun",
    "budget",
    "strong",
    "album",
    "lava",
    "tackle",
    "sudden",
    "garage",
    "people",
    "bundle",
    "federal",
    "chest",
    "process",
    "vicious",
    "behave",
    "nephew",
    "zero",
    "vital",
    "ocean",
    "artist",
    "lawsuit"
  ],
  "success": true
}
```

</details>

---

### `get_logged_in_fingerprint`

Functionality: Obtain the fingerprint of the wallet that is currently logged in

Usage: chia rpc wallet [OPTIONS] get_logged_in_fingerprint [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet get_logged_in_fingerprint
```

Response:

```json
{
  "fingerprint": 2818719465,
  "success": true
}
```

</details>

---

### `get_private_key`

Functionality: Show public and private info about a key

Usage: chia rpc wallet [OPTIONS] get_private_key [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type   | Required | Description                                                        |
| :---------- | :----- | :------- | :----------------------------------------------------------------- |
| fingerprint | NUMBER | True     | The wallet's fingerprint, obtainable by running `chia wallet show` |

:::warning

This RPC will show the private key and seed phrase for the given fingerprint. Use with caution.

:::

<details>
<summary>Example</summary>

```json
chia rpc wallet get_private_key '{"fingerprint": 2473794447}'
```

Response:

```json
{
  "private_key": {
    "farmer_pk": "8c65856685323f149a651e6cbe068ece36f87a84efa16246b0eef65ac586a30fb678878bd4364d52c432fbb77838cbf6",
    "fingerprint": 2473794447,
    "pk": "b73cf2471b10a7ba839616aff0ab1cb319d9d3a77ee26ff88ec1c8e645468eb0b7653518b85e5dd0df7cf50d8612b978",
    "pool_pk": "845ff087376ffecf83950485d63ffed1cc73f36daf018deb4fbd2f05e7198b07521486274d82ecc4f5a2eaae63dfd0a7",
    "seed": "arrest legend bounce attend rebel blade palace bean dry shell nice bubble coil cook token nerve visa december hero garment grid attend nerve certain",
    "sk": "0665913196501420c0fe2de6b5ce7b25f749d52dcbf997b069bb2ea8438c6c3c"
  },
  "success": true
}
```

</details>

---

### `get_public_keys`

Functionality: Show all public key fingerprints stored in the OS keyring. Note that the keyring must be unlocked in order to run this RPC

Usage: chia rpc wallet [OPTIONS] get_public_keys [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet get_public_keys
```

Response:

```json
{
  "public_key_fingerprints": [2104826454, 3792481086, 2818719465, 2121994410],
  "success": true
}
```

</details>

---

### `log_in`

Functionality: Log into the wallet with the specified key

Usage: chia rpc wallet [OPTIONS] log_in [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type   | Required | Description                                                        |
| :---------- | :----- | :------- | :----------------------------------------------------------------- |
| fingerprint | NUMBER | True     | The wallet's fingerprint, obtainable by running `chia wallet show` |

<details>
<summary>Example</summary>

```json
chia rpc wallet log_in '{"fingerprint": 2818719465}'
```

Response:

```json
{
  "fingerprint": 2818719465,
  "success": true
}
```

</details>

---

## Wallet node

### `get_auto_claim`

Functionality: Show the auto claim settings for all types of claims, including clawback

Usage: chia rpc wallet [OPTIONS] get_auto_claim [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

Note that the auto claim settings are configurable in `~/.chia/mainnet/config/config.yaml` in the `auto_claim:` section.

<details>
<summary>Example</summary>

```json
chia rpc wallet get_auto_claim
```

Response:

```json
{
    "batch_size": 50,
    "enabled": false,
    "min_amount": 0,
    "success": true,
    "tx_fee": 0
}
```

</details>

---

### `get_height_info`

Functionality: Show the block height to which the current wallet is synced

Usage: chia rpc wallet [OPTIONS] get_height_info [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet get_height_info
```

Response:

```json
{
  "height": 2863319,
  "success": true
}
```

</details>

---

### `get_network_info`

Functionality: Show the current network (eg `mainnet`) and network prefix (eg `XCH`)

Usage: chia rpc wallet [OPTIONS] get_network_info [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet get_network_info
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

### `get_sync_status`

Functionality: Show whether the current wallet is syncing or synced

Usage: chia rpc wallet [OPTIONS] get_sync_status [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet get_sync_status
```

Response:

```json
{
  "genesis_initialized": true,
  "success": true,
  "synced": true,
  "syncing": false
}
```

</details>

---

### `get_timestamp_for_height`

Functionality: Show the timestamp for a given block height

Usage: chia rpc wallet [OPTIONS] get_timestamp_for_height [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag   | Type   | Required | Description                                          |
| :----- | :----- | :------- | :--------------------------------------------------- |
| height | NUMBER | True     | The block height for which to retrieve the timestamp |

<details>
<summary>Example</summary>

This example is from testnet10, so the timestamp won't match the equivalent call on mainnet:

```json
chia rpc wallet get_timestamp_for_height '{"height": 2000000}'
```

Response:

```json
{
  "success": true,
  "timestamp": 1672215722
}
```

</details>

---

### `push_transactions`

Functionality: Push multiple transactions to the blockchain

Usage: chia rpc wallet [OPTIONS] push_transactions [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag         | Type       | Required | Description                    |
| :----------- | :--------- | :------- | :----------------------------- |
| transactions | TEXT ARRAY | True     | A list of transactions to push |

---

### `push_tx`

Functionality: Push a spend bundle (transaction) to the blockchain

Usage: chia rpc wallet [OPTIONS] push_tx [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag         | Type | Required | Description                            |
| :----------- | :--- | :------- | :------------------------------------- |
| spend_bundle | TEXT | True     | The spend bundle (transaction) to push |

---

### `set_auto_claim`

Functionality: Set the auto claim settings for all types of claims, including clawback

Usage: chia rpc wallet [OPTIONS] set_auto_claim [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag       | Type    | Required | Description                                                              |
| :--------- | :------ | :------- | :----------------------------------------------------------------------- |
| enabled    | BOOLEAN | TRUE     | Set to `true` to enable auto claim, or `false` to disable it             |
| tx_fee     | NUMBER  | TRUE     | The default transaction fee to be used for claims, in mojos              |
| min_amount | NUMBER  | TRUE     | The minimum value, in mojos, of a claim to be included in the auto claim |
| batch_size | NUMBER  | TRUE     | The maximum number of claims to process in one spend bundle              |

If one or more flags is missing, this RPC will succeed and set the missing flag back to the default value.

<details>
<summary>Example</summary>

Start by obtaining a baseline:

```json
chia rpc wallet get_auto_claim
```

Response:

```json
{
    "batch_size": 50,
    "enabled": false,
    "min_amount": 0,
    "success": true,
    "tx_fee": 0
}
```

Next, change all of these settings:

```json
chia rpc wallet set_auto_claim '{"enabled": true, "tx_fee": 1, "min_amount": 1, "batch_size": 1}'
```

Response:

```json
{
    "batch_size": 1,
    "enabled": true,
    "min_amount": 1,
    "success": true,
    "tx_fee": 1
}
```

</details>

---

### `set_wallet_resync_on_startup`

Functionality: Resync the current logged in wallet. The transaction and offer records will be kept

Usage: chia rpc wallet [OPTIONS] set_wallet_resync_on_startup [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag   | Type    | Required | Description                                      |
| :----- | :------ | :------- | :----------------------------------------------- |
| enable | BOOLEAN | False    | Set to `true` to enable resync [Default: `true`] |

<details>
<summary>Example</summary>

```json
 chia rpc wallet set_wallet_resync_on_startup
```

Response:

```json
{
  "success": true
}
```

</details>

---

## Wallet management

### `create_new_wallet`

Functionality: Create a new wallet for CATs, DIDs, NFTs, or pooling

Usage: chia rpc wallet [OPTIONS] create_new_wallet [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters (all wallet types):

| Flag        | Type   | Required | Description                                                                                             |
| :---------- | :----- | :------- | :------------------------------------------------------------------------------------------------------ |
| wallet_type | TEXT   | True     | The type of wallet to create. Must be one of `cat_wallet`, `did_wallet`, `nft_wallet`, or `pool_wallet` |
| fee         | NUMBER | False    | An optional blockchain fee, in mojos                                                                    |

`cat_wallet` Parameters:

| Flag     | Type   | Required | Description                                                                                         |
| :------- | :----- | :------- | :-------------------------------------------------------------------------------------------------- |
| mode     | TEXT   | True     | Must be either `new` of `existing`                                                                  |
| name     | TEXT   | False    | The name of the wallet to create or modify [Default: `CAT` followed by the beginning of the CAT ID] |
| amount   | NUMBER | True\*   | \*Required if `mode` is `new`. Specify the value, in mojos, of this wallet                          |
| asset_id | TEXT   | True\*   | \*Required if `mode` is `existing`. Specify the `asset_id` of the wallet to update                  |

`did_wallet` Parameters:

| Flag                     | Type       | Required | Description                                                                                                                                                    |
| :----------------------- | :--------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| did_type                 | TEXT       | True     | Must be either `new` or `recovery`. If `recovery`, then each of the following parameters will be ignored                                                       |
| backup_dids              | TEXT ARRAY | True\*   | \*Required if `did_type` is `new`. An array of backup DID IDs to be used for recovery. Must match actual DIDs                                                  |
| num_of_backup_ids_needed | NUMBER     | True\*   | \*Required if `did_type` is `new`. The number of backup DIDs required for recovery. Minimum value is `1`, maximum value is the number of DIDs in `backup_dids` |
| metadata                 | DICT       | False    | The metadata of the DID                                                                                                                                        |
| wallet_name              | TEXT       | False    | The name of the DID wallet [Default: None]                                                                                                                     |
| amount                   | NUMBER     | True\*   | \*Required if `did_type` is `new`. Specify the initial value of this wallet, in mojos. Minimum value is `1`                                                    |

Note: Because `backup_dids` is required, you must already have access to a DID in order to run this RPC for a did_wallet. If you do not already have a DID, then run [the CLI command](/did-cli#create) to create a DID wallet instead.

`nft_wallet` Parameters:

| Flag   | Type | Required | Description                                                        |
| :----- | :--- | :------- | :----------------------------------------------------------------- |
| did_id | TEXT | False    | Associate a DID with the new NFT wallet                            |
| name   | TEXT | False    | The name of the wallet to create or modify [Default: `NFT Wallet`] |

`pool_wallet` Parameters:

| Flag                    | Type    | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :---------------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| mode                    | TEXT    | True     | Must be either `new` of `recovery`. However, `recovery` has not been implemented, so currently (version 1.6) it will automatically fail                                                                                                                                                                                                                                                                                                                                                                                          |
| initial_target_state    | TEXT    | True     | This info should be sent from the daemon. `PoolState` is a type that is serialized to the blockchain to track the state of the user's pool singleton `target_puzzle_hash` is either the pool address, or the self-pooling address that pool rewards will be paid to. `target_puzzle_hash` is NOT the `p2_singleton` puzzle that block rewards are sent to. The `p2_singleton` address is the initial address, and the `target_puzzle_hash` is the final destination. `relative_lock_height` is zero when in `SELF_POOLING` state |
| p2_singleton_delayed_ph | TEXT    | True\*   | \*Required if `mode` is `new`. This is the puzzle hash to which payouts will go                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| p2_singleton_delay_time | INTEGER | False    | The time (in seconds) to delay payments [Default: None ]                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

<details>
<summary>Example 1</summary>

Create a new CAT wallet called `test` and send it 100 mojos:

```json
chia rpc wallet create_new_wallet '{"wallet_type": "cat_wallet", "mode": "new", "name": "test", "amount": 100, "fee": 1}'
```

Response:

```json
{
  "asset_id": "1f9fd0d4a1221241df986f042e014c056571062c82a5ba9b88c866c92808e1a9",
  "success": true,
  "type": 6,
  "wallet_id": 2
}
```

Show the new wallet:

```json
chia wallet show
```

Response:

```json
Wallet height: 2863496
Sync status: Synced
Balances, fingerprint: 874731676

Chia Wallet:
   -Total Balance:         0.0009999999 xch (999999900 mojo)
   -Pending Total Balance: 0.0009999999 xch (999999900 mojo)
   -Spendable:             0.0009999999 xch (999999900 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

test:
   -Total Balance:         0.1  (100 mojo)
   -Pending Total Balance: 0.1  (100 mojo)
   -Spendable:             0.1  (100 mojo)
   -Type:                  CAT
   -Asset ID:              1f9fd0d4a1221241df986f042e014c056571062c82a5ba9b88c866c92808e1a9
   -Wallet ID:             2
```

</details>

<details>
<summary>Example 2</summary>

Create a new CAT wallet without specifying a name:

```json
chia rpc wallet create_new_wallet '{"wallet_type": "cat_wallet", "mode": "new", "amount": 100, "fee": 1}'
```

Response:

```json
{
  "asset_id": "348dfae821c76f0a0f45fe84d757d5050d07fda83c68a9425c24de666479786f",
  "success": true,
  "type": 6,
  "wallet_id": 3
}
```

Show the new wallet:

```json
chia wallet show
```

Response:

```json
Chia Wallet:
   -Total Balance:         0.0009999998 xch (999999800 mojo)
   -Pending Total Balance: 0.0009999998 xch (999999800 mojo)
   -Spendable:             0.0009999998 xch (999999800 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

test:
   -Total Balance:         0.1  (100 mojo)
   -Pending Total Balance: 0.1  (100 mojo)
   -Spendable:             0.1  (100 mojo)
   -Type:                  CAT
   -Asset ID:              1f9fd0d4a1221241df986f042e014c056571062c82a5ba9b88c866c92808e1a9
   -Wallet ID:             2

CAT 348dfae821c76f0a...:
   -Total Balance:         0.1  (100 mojo)
   -Pending Total Balance: 0.1  (100 mojo)
   -Spendable:             0.1  (100 mojo)
   -Type:                  CAT
   -Asset ID:              348dfae821c76f0a0f45fe84d757d5050d07fda83c68a9425c24de666479786f
   -Wallet ID:             3
```

</details>

<details>
<summary>Example 3</summary>

Create a new DID wallet with one backup DID:

```json
chia rpc wallet create_new_wallet '{"wallet_type": "did_wallet", "did_type": "new", "amount": 1, "backup_dids": ["did:chia:13p5fdxgm8e2pngdwp8m088t0etp7rgzx9ye2ju8v5ackcyg7t9nqx2um83"], "num_of_backup_ids_needed": 1, "fee": 10000000}'
```

Response:

```
{
    "my_did": "did:chia:1pzrm9dyhvu8hmqyzqmy0v3wyp7cn98jlxk49jv7mgkhvk229erhqmh6c2m",
    "success": true,
    "type": 8,
    "wallet_id": 2
}
```

Show the newly created DID wallet:

```bash
chia wallet show
```

Response:

```
Wallet height: 1144662
Sync status: Synced
Balances, fingerprint: 455254876

Chia Wallet:
   -Total Balance:         0.999999999999 txch (999999999999 mojo)
   -Pending Total Balance: 0.999999999999 txch (999999999999 mojo)
   -Spendable:             0.999999999999 txch (999999999999 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Profile 1:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:1pzrm9dyhvu8hmqyzqmy0v3wyp7cn98jlxk49jv7mgkhvk229erhqmh6c2m
   -Wallet ID:             2
```

</details>

<details>
<summary>Example 4</summary>

Create a new NFT wallet that is not associated with a DID:

```json
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet", "fee": 1}'
```

Response:

```json
{
  "success": true,
  "type": 10,
  "wallet_id": 4
}
```

</details>

<details>
<summary>Example 5</summary>

Create an NFT wallet that is associated with a DID. First, create the DID:

```json
chia wallet did create -n My_DID
```

Response:

```json
Successfully created a DID wallet with name My_DID and id 5 on key 874731676
Successfully created a DID did:chia:1ypvxg7t327m4hsmgzrlhnuk4448nqc20crnnmzzd52lk7dvdza9s8qp8q6 in the newly created DID wallet
```

Next, create the NFT wallet, passing in the new DID ID:

```json
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet", "did_id": "did:chia:1ypvxg7t327m4hsmgzrlhnuk4448nqc20crnnmzzd52lk7dvdza9s8qp8q6", "name": "My NFT WAllet", "fee": 1}'
```

Response:

```
{
    "success": true,
    "type": 10,
    "wallet_id": 6
}
```

</details>

---

### `get_wallets`

Functionality: Show all wallets associated with the current fingerprint, including (by default) coin information

Usage: chia rpc wallet [OPTIONS] get_wallets [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag         | Type    | Required | Description                                                              |
| :----------- | :------ | :------- | :----------------------------------------------------------------------- |
| include_data | BOOLEAN | False    | Set to `true` to include all coin info for this wallet [Default: `true`] |
| type         | INTEGER | False    | The type of wallet to retrieve. See below for valid types                |

Valid wallet types (the `type` parameter) include the following integers:

| Name             | type |
| :--------------- | ---: |
| STANDARD_WALLET  | 0    |
| ATOMIC_SWAP      | 2    |
| AUTHORIZED_PAYEE | 3    |
| MULTI_SIG        | 4    |
| CUSTODY          | 5    |
| CAT              | 6    |
| RECOVERABLE      | 7    |
| DECENTRALIZED_ID | 8    |
| POOLING_WALLET   | 9    |
| NFT              | 10   |
| DATA_LAYER       | 11   |
| DATA_LAYER_OFFER | 12   |
| VC               | 13   |

More types may be added in the future. See [wallet_types.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/util/wallet_types.py) for an up-to-date list of valid types.

<details>
<summary>Example 1</summary>

Get all info for all wallets:

```json
chia rpc wallet get_wallets '{"include_data": false}'
```

Response:

```json
{
  "fingerprint": 874731676,
  "success": true,
  "wallets": [
    {
      "data": "",
      "id": 1,
      "name": "Chia Wallet",
      "type": 0
    }
  ]
}
```

</details>

<details>
<summary>Example 2</summary>

Get NFT wallet info (NFT type = 10):

```json
chia rpc wallet get_wallets '{"type": 10}'
```

Response:

```json
{
    "fingerprint": 2104826454,
    "success": true,
    "wallets": [
        {
            "data": "{"did_id": "0xb08c01ace955ce180ce2e0b332b4c8d98d46469078e5191351f025d9cf9117f3"}",
            "id": 3,
            "name": "NFT Wallet",
            "type": 10
        },
        {
            "data": "{"did_id": null}",
            "id": 4,
            "name": "NFT Wallet",
            "type": 10
        }
    ]
}
```

</details>

---

## Wallet

### `create_signed_transaction`

Functionality: Create a signed transaction from the given wallet

Usage: chia rpc wallet [OPTIONS] create_signed_transaction [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                 | Type         | Required | Description                                                                                |
| :------------------- | :----------- | :------- | :----------------------------------------------------------------------------------------- |
| wallet_id            | TEXT         | True     | The wallet ID for the origin of the transaction                                            |
| additions            | TEXT ARRAY   | True     | A list of puzzle hashes and amounts to be included                                         |
| min_coin_amount      | NUMBER       | False    | The minimum coin amount to send [Default: 0]                                               |
| max_coin_amount      | NUMBER       | False    | The maximum coin amount to send [Default: 0]                                               |
| exclude_coin_amounts | NUMBER ARRAY | False    | A list of coin amounts to exclude                                                          |
| coins                | TEXT ARRAY   | True     | A list of coins to include                                                                 |
| exclude_coins        | TEXT ARRAY   | True     | A list of coins to exclude                                                                 |
| coin_announcements   | TEXT ARRAY   | False    | A list of coin announcements, which includes `coin_id`, `message`, and `morph_bytes`       |
| puzzle_announcements | TEXT ARRAY   | False    | A list of puzzle announcements, which includes `puzzle_hash`, `message`, and `morph_bytes` |
| fee                  | NUMBER       | False    | An optional blockchain fee, in mojos                                                       |

---

### `delete_notifications`

Functionality: Delete notifications, with the option to specify IDs from which to delete

Usage: chia rpc wallet [OPTIONS] delete_notifications [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                                                                             |
| :-------- | :------- | :-------------------------------------------------------------------------------------- |
| ids       | False    | Set to delete notifications only from the specified IDs. [Default: delete from all IDs] |

<details>
<summary>Example</summary>

```json
chia rpc wallet delete_notifications
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `delete_unconfirmed_transactions`

Functionality: Delete all transactions that have yet to be confirmed on the blockchain from the given wallet

Usage: chia rpc wallet [OPTIONS] delete_unconfirmed_transactions [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type   | Required | Description                                            |
| :-------- | :----- | :------- | :----------------------------------------------------- |
| wallet_id | NUMBER | True     | The ID of the wallet from which to delete transactions |

<details>
<summary>Example</summary>

```json
chia rpc wallet delete_unconfirmed_transactions '{"wallet_id": 2}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `extend_derivation_index`

Functionality: Increase the derivation index

Usage: chia rpc wallet [OPTIONS] extend_derivation_index [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag  | Type   | Required | Description                                                      |
| :---- | :----- | :------- | :--------------------------------------------------------------- |
| index | NUMBER | True     | The new derivation index. Must be larger than the previous index |

Note: The derivation index is the minimum number of addresses the wallet will examine. It's not possible to decrease this number.

<details>
<summary>Example</summary>

```json
chia rpc wallet extend_derivation_index '{"index": 436}'
```

Response:

```json
{
  "index": 436,
  "success": true
}
```

</details>

---

### `get_coin_records`

Functionality: Obtain all coin records for the current wallet

Usage: chia rpc wallet [OPTIONS] get_coin_records [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

None

<details>
<summary>Example</summary>

```json
chia rpc wallet get_coin_records
```

Response:

```json
{
    "coin_records": [
        {
            "amount": 100,
            "coinbase": false,
            "confirmed_height": 3879053,
            "id": "0x8c8518c23670a37287063951761e6f23348918b887762d9a8fc7f2217bd44c04",
            "metadata": null,
            "parent_coin_info": "0x6b17387014afbdc661bec74438cc49e44889861b5ddd13ae2113807e82f9df08",
            "puzzle_hash": "0x59714c1cebe4a747bb90b607bce5cc589df6b612ee7f742c79f6d070a50e9083",
            "spent_height": 0,
            "type": 0,
            "wallet_identifier": {
                "id": 1,
                "type": 0
            }
        }
    ],
    "success": true,
    "total_count": null
}
```

</details>

---

### `get_coin_records_by_names`

Functionality: Obtain coin records from a list of coin names

Usage: chia rpc wallet [OPTIONS] get_coin_records_by_names [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                | Type       | Required | Description                                         |
| :------------------ | :--------- | :------- | :-------------------------------------------------- |
| names               | TEXT ARRAY | True     | A list of coin names from which to retrieve records |
| start_height        | NUMBER     | False    | The block height at which to start the query        |
| end_height          | NUMBER     | False    | The block height at which to end the query          |
| include_spent_coins | BOOLEAN    | False    | Include spent coins in the result [Default: false]  |

<details>
<summary>Example</summary>

```json
chia rpc wallet get_coin_records_by_names '{"names": ["0xeb17e80fcb72f15bfb28924f0bcd684df626646dca282bc88098cb0d59ffe1bb"]}'
```

Response:

```json
{
  "coin_records": [
    {
      "coin": {
        "amount": 999996796,
        "parent_coin_info": "0xfecaf9d1cffe1b71f00aee7816ea90562b18307d4461757e23f097703340beb7",
        "puzzle_hash": "0x138373343443d3cdf6bd033244f32d904dd93e1ad2772f120955c0d8d761b722"
      },
      "coinbase": false,
      "confirmed_block_index": 2867783,
      "spent_block_index": 0,
      "timestamp": 1669261898
    }
  ],
  "success": true
}
```

</details>

---

### `get_current_derivation_index`

Functionality: Obtain the current derivation index for the current wallet

Usage: chia rpc wallet [OPTIONS] get_current_derivation_index [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet get_current_derivation_index
```

Response:

```json
{
  "index": 435,
  "success": true
}
```

</details>

---

### `get_farmed_amount`

Functionality: Show the total amount that has been farmed

Usage: chia rpc wallet [OPTIONS] get_farmed_amount [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet get_farmed_amount
```

Response:

```json
{
  "farmed_amount": 0,
  "farmer_reward_amount": 0,
  "fee_amount": 0,
  "last_height_farmed": 0,
  "pool_reward_amount": 0,
  "success": true
}
```

</details>

---

### `get_next_address`

Functionality: Get the next address in the HD tree, with the option to show the latest address

Usage: chia rpc wallet [OPTIONS] get_next_address [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type    | Required | Description                                                                    |
| :---------- | :------ | :------- | :----------------------------------------------------------------------------- |
| wallet_id   | TEXT    | True     | The ID of the wallet from which to obtain the next address                     |
| new_address | BOOLEAN | True     | If `true`, then create a new address, else display the latest existing address |

<details>
<summary>Example</summary>

```json
chia rpc wallet get_next_address '{"wallet_id": 2, "new_address": false}'
```

Response:

```json
{
  "address": "xch1jxe8yfq8xem0e8ty5dq9hp86ududys96n6ugy2q4fextr0pplw9qwpfru9",
  "success": true,
  "wallet_id": 2
}
```

</details>

---

### `get_notifications`

Functionality: Obtain current notifications

Usage: chia rpc wallet [OPTIONS] get_notifications [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                                                                                   |
| :-------- | :------- | :-------------------------------------------------------------------------------------------- |
| ids       | False    | Set to receive notifications only from the specified IDs. [Default: receive from all IDs]     |
| start     | False    | The number corresponding to the first notification to list. [Default: the first notification] |
| end       | False    | The number corresponding to the last notification to list. [Default: the last notification]   |

<details>
<summary>Example</summary>

If no parameters are set, then all notifications will be listed from all IDs:

```json
chia rpc wallet get_notifications
```

Response:

```json
{
  "notifications": [
    {
      "amount": 10000000,
      "id": "f74fb363fbdeef3f6bcf7a0664a8ef76ea3e5f22bb4ffc9a1f9ef23b9329ae28",
      "message": "fadedcab"
    }
  ],
  "success": true
}
```

</details>

---

### `get_spendable_coins`

Functionality: Get all spendable coins, with various possible filters

Usage: chia rpc wallet [OPTIONS] get_spendable_coins [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                  | Type         | Required | Description                                                          |
| :-------------------- | :----------- | :------- | :------------------------------------------------------------------- |
| wallet_id             | NUMBER       | True     | The ID of the wallet from which to display coins                     |
| min_coin_amount       | NUMBER       | False    | The smallest coin to be selected in this query [Default: No minimum] |
| max_coin_amount       | NUMBER       | False    | The largest coin to be selected in this query [Default: No maximum]  |
| excluded_coin_amounts | NUMBER ARRAY | False    | A list of coin amounts to exclude                                    |
| excluded_coins        | TEXT ARRAY   | False    | A list of coins to exclude                                           |
| excluded_coin_ids     | TEXT ARRAY   | False    | A list of coin IDs to exclude                                        |

<details>
<summary>Example</summary>

List all unspent coins from wallet 1:

```json
chia rpc wallet get_spendable_coins '{"wallet_id": 1}'
```

Response:

```json
{
  "confirmed_records": [
    {
      "coin": {
        "amount": 999996796,
        "parent_coin_info": "0xfecaf9d1cffe1b71f00aee7816ea90562b18307d4461757e23f097703340beb7",
        "puzzle_hash": "0x138373343443d3cdf6bd033244f32d904dd93e1ad2772f120955c0d8d761b722"
      },
      "coinbase": false,
      "confirmed_block_index": 2867783,
      "spent_block_index": 0,
      "timestamp": 1669261898
    }
  ],
  "success": true,
  "unconfirmed_additions": [],
  "unconfirmed_removals": []
}
```

</details>

---

### `get_transaction`

Functionality: Get a transaction's details from its ID

Usage: chia rpc wallet [OPTIONS] get_transaction [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag           | Type | Required | Description                                                                                                          |
| :------------- | :--- | :------- | :------------------------------------------------------------------------------------------------------------------- |
| transaction_id | TEXT | True     | The ID of the transaction to obtain. This is listed as `name` in the output of the [transactions](#transactions) RPC |

<details>
<summary>Example</summary>

```json
chia rpc wallet get_transaction '{"transaction_id": "0x43f6811a4daf18622fc7f132f5166a1246056b4a983b7befccb7e4b2e2c57f3b"}'
```

Response:

```json
{
  "success": true,
  "transaction": {
    "additions": [
      {
        "amount": 100,
        "parent_coin_info": "0xabbb6c6859db74e8e627f21263c078893383131bcf22faec68b2de914d03e59f",
        "puzzle_hash": "0xb4a41bbce457745b006181ab99e34a0cbd8c83c196bc74fc98eb3aec882ed784"
      }
    ],
    "amount": 100,
    "confirmed": true,
    "confirmed_at_height": 2863494,
    "created_at_time": 1669182237,
    "fee_amount": 0,
    "memos": {},
    "name": "0x43f6811a4daf18622fc7f132f5166a1246056b4a983b7befccb7e4b2e2c57f3b",
    "removals": [
      {
        "amount": 100,
        "parent_coin_info": "0x9c0083d8da8733c899787e4dcf18a56bc944f49ed668808e20890f01cbc35f37",
        "puzzle_hash": "0xb4a41bbce457745b006181ab99e34a0cbd8c83c196bc74fc98eb3aec882ed784"
      }
    ],
    "sent": 10,
    "sent_to": [],
    "spend_bundle": null,
    "to_address": "xch1kmk3jx30sqv57j07x05mjf2xgt9fgthzslaweg4yta9edfwqsadqagh96h",
    "to_puzzle_hash": "0xb6ed191a2f80194f49fe33e9b9254642ca942ee287faeca2a45f4b96a5c0875a",
    "trade_id": null,
    "type": 0,
    "wallet_id": 2
  },
  "transaction_id": "0x43f6811a4daf18622fc7f132f5166a1246056b4a983b7befccb7e4b2e2c57f3b"
}
```

</details>

---

### `get_transactions`

Functionality: Get all transactions for a given wallet

Usage: chia rpc wallet [OPTIONS] get_transactions [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag       | Type    | Required | Description                                                         |
| :--------- | :------ | :------- | :------------------------------------------------------------------ |
| wallet_id  | NUMBER  | True     | The Wallet ID of the wallet from which to obtain transactions       |
| start      | NUMBER  | False    | The sequence number of the first transaction to show [Default: 0]   |
| end        | NUMBER  | False    | The sequence number of the last transaction to show [Default: 50]   |
| sort_key   | NUMBER  | False    | Specify the key for sorting [Default: None]                         |
| reverse    | BOOLEAN | False    | Set to `true` to sort the results in reverse order [Default: false] |
| to_address | STRING  | False    | Only include transactions with this `to_address` [Default: None]    |

<details>
<summary>Example 1: List a single XCH transaction</summary>

Start by listing all wallets associated with the currently synced fingerprint:

```bash
chia rpc wallet get_wallets
```

Response:

```bash
{
    "fingerprint": 2104826454,
    "success": true,
    "wallets": [
        {
            "data": "",
            "id": 1,
            "name": "Chia Wallet",
            "type": 0
        },
        {
            "data": "{\"did_id\": null}",
            "id": 2,
            "name": "NFT Wallet",
            "type": 10
        },
        {
            "data": "{\"did_id\": \"0xb08c01ace955ce180ce2e0b332b4c8d98d46469078e5191351f025d9cf9117f3\"}",
            "id": 4,
            "name": "NFT Wallet",
            "type": 10
        },
        {
            "data": "",
            "id": 5,
            "name": "DataLayer Wallet",
            "type": 11
        },
        {
            "data": "f17f88130c63522821f1a75466849354eee69c414c774bd9f3873ab643e9574d00",
            "id": 6,
            "name": "CAT f17f88130c635228...",
            "type": 6
        },
        {
            "data": "aaee6b63bcbc4aef0a005d31119ad65e5228b0ddff18c5c563fd7a4db54fb08400",
            "id": 7,
            "name": "CAT aaee6b63bcbc4aef...",
            "type": 6
        },
        {
            "data": "",
            "id": 11,
            "name": "Pool wallet",
            "type": 9
        }
    ]
}
```

In this case, we are interested in the `Chia Wallet`, of type `0`. This has an `id` of `1`.

Next, list only the transaction from that wallet with an index of `3`:

```bash
chia rpc wallet get_transactions '{"wallet_id": 1, "start": 3, "end": 4}'
```

```bash
{
    "success": true,
    "transactions": [
        {
            "additions": [
                {
                    "amount": 999999999,
                    "parent_coin_info": "0x4346c6f866ce790ef0c48c5afe472751a9f09ee926a1bb60cb4cb6ab7c845377",
                    "puzzle_hash": "0xe4c9f6dd30498ae0e19d9bdba2eeaa54296d91a5b8ccbb4b9b748034f9525253"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0x4346c6f866ce790ef0c48c5afe472751a9f09ee926a1bb60cb4cb6ab7c845377",
                    "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
                }
            ],
            "amount": 1,
            "confirmed": true,
            "confirmed_at_height": 1688205,
            "created_at_time": 1666232735,
            "fee_amount": 0,
            "memos": {},
            "name": "0x8d1a6db10aa69a8aceff700596bfd736b87a133d73e394c15c13152633e729d0",
            "removals": [
                {
                    "amount": 1000000000,
                    "parent_coin_info": "0x73336c365fdcae474f672b0f35950369fb12b1dac0289aa2f5b702e731098447",
                    "puzzle_hash": "0x3377e81d20ad9a3028ffe7e77360c03df48c412f2525aac58035738888adb83d"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": null,
            "to_address": "txch1alc82gjf2psvqehkdue2es480caruum6e296afx35e82fnwp8k5shty4cp",
            "to_puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
            "trade_id": null,
            "type": 1,
            "wallet_id": 1
        }
    ],
    "wallet_id": 1
}
```

</details>

<details>
<summary>Example 2: List all transactions for a CAT</summary>

Start by listing all wallets associated with the currently synced fingerprint:

```bash
chia rpc wallet get_wallets
```

Response:

```bash
{
    "fingerprint": 2104826454,
    "success": true,
    "wallets": [
        {
            "data": "",
            "id": 1,
            "name": "Chia Wallet",
            "type": 0
        },
        {
            "data": "{\"did_id\": null}",
            "id": 2,
            "name": "NFT Wallet",
            "type": 10
        },
        {
            "data": "{\"did_id\": \"0xb08c01ace955ce180ce2e0b332b4c8d98d46469078e5191351f025d9cf9117f3\"}",
            "id": 4,
            "name": "NFT Wallet",
            "type": 10
        },
        {
            "data": "",
            "id": 5,
            "name": "DataLayer Wallet",
            "type": 11
        },
        {
            "data": "f17f88130c63522821f1a75466849354eee69c414c774bd9f3873ab643e9574d00",
            "id": 6,
            "name": "CAT f17f88130c635228...",
            "type": 6
        },
        {
            "data": "aaee6b63bcbc4aef0a005d31119ad65e5228b0ddff18c5c563fd7a4db54fb08400",
            "id": 7,
            "name": "CAT aaee6b63bcbc4aef...",
            "type": 6
        },
        {
            "data": "",
            "id": 11,
            "name": "Pool wallet",
            "type": 9
        }
    ]
}
```

For this example, we'll use the wallet with ID `7`. This wallet is type `6` (CAT):

```json
chia rpc wallet get_transactions '{"wallet_id": 7}'
```

Response:

```json
{
    "success": true,
    "transactions": [
        {
            "additions": [
                {
                    "amount": 10000,
                    "parent_coin_info": "0x5104073950bccd17a7ea57ca9f13c5546f88a048e3165069d0e255d3018faeed",
                    "puzzle_hash": "0x5e5073dab71209426358624462fac281431f87571ad40009d7ec731784154a1c"
                }
            ],
            "amount": 10000,
            "confirmed": true,
            "confirmed_at_height": 1932515,
            "created_at_time": 1670949639,
            "fee_amount": 0,
            "memos": {},
            "name": "0x38306b461975741641d397330bb34c01681bb242119bd4aa457c06e2080cf257",
            "removals": [],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": null,
            "to_address": "txch1stn20rhgmh5wvmyyfj2etdpdp73fla0ga4ymtsejz600dszf392s58kx2s",
            "to_puzzle_hash": "0x82e6a78ee8dde8e66c844c9595b42d0fa29ff5e8ed49b5c332169ef6c0498955",
            "trade_id": null,
            "type": 0,
            "wallet_id": 7
        }
    ],
    "wallet_id": 7
}
```

</details>

---

### `get_transaction_count`

Functionality: Obtain the number of transactions for a wallet

Usage: chia rpc wallet [OPTIONS] get_transaction_count [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type | Required | Description                                              |
| :-------- | :--- | :------- | :------------------------------------------------------- |
| wallet_id | TEXT | True     | The wallet ID from which to obtain the transaction count |

<details>
<summary>Example</summary>

```json
chia rpc wallet get_transaction_count '{"wallet_id": 2}'
```

Response:

```json
{
  "count": 2,
  "success": true,
  "wallet_id": 2
}
```

</details>

---

### `get_transaction_memo`

Functionality: Obtain the memo for the specified transaction

Usage: chia rpc wallet [OPTIONS] get_transaction_memo [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter      | TYPE   | Required | Description                                              |
| :------------- | :----- | :------- | :------------------------------------------------------- |
| transaction_id | STRING | True     | The ID of the transaction for which to retrieve the memo |

<details>
<summary>Example</summary>

```json
chia rpc wallet get_transaction_memo '{"transaction_id": "0x21899b89bf36154e44c2277e9bfb6cff0574d7e9df4e100b782b03ab2476e171"}'
```

Response:

```json
{
  "21899b89bf36154e44c2277e9bfb6cff0574d7e9df4e100b782b03ab2476e171": {
    "21899b89bf36154e44c2277e9bfb6cff0574d7e9df4e100b782b03ab2476e171": [
      "f8858363837eaccf1249844dfd200999ebd480b393dd0f7f2022880868ce3bf3"
    ]
  },
  "success": true
}
```

</details>

---

### `get_wallet_balance`

Functionality: Obtain the balance (and related info) from a wallet

Usage: chia rpc wallet [OPTIONS] get_wallet_balance [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type   | Required | Description                                                  |
| :-------- | :----- | :------- | :----------------------------------------------------------- |
| wallet_id | NUMBER | True     | The Wallet ID of the wallet from which to obtain the balance |

<details>
<summary>Example</summary>

```json
chia rpc wallet get_wallet_balance '{"wallet_id": 1}'
```

Response:

```json
{
  "success": true,
  "wallet_balance": {
    "confirmed_wallet_balance": 999999799,
    "fingerprint": 874731676,
    "max_send_amount": 999999799,
    "pending_change": 0,
    "pending_coin_removal_count": 0,
    "spendable_balance": 999999799,
    "unconfirmed_wallet_balance": 999999799,
    "unspent_coin_count": 1,
    "wallet_id": 1,
    "wallet_type": 0
  }
}
```

</details>

---

### `get_wallet_balances`

Functionality: Obtain the balance (and related info) from one or more wallets

Usage: chia rpc wallet [OPTIONS] get_wallet_balance [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag       | Type | Required  | Description                                                                                |
| :--------- | :--- | :-------- | :----------------------------------------------------------------------------------------- |
| wallet_ids | LIST | False     | A list of Wallet IDs from which to obtain the balance [Default: list info for all wallets] |

<details>
<summary>Example</summary>

Get the balance and other info for wallets 1 and 2:

```json
chia rpc wallet get_wallet_balances '{"wallet_ids": [1,2]}'
```

Response:

```json
{
    "success": true,
    "wallet_balances": {
        "1": {
            "confirmed_wallet_balance": 249908082013,
            "fingerprint": 3792481086,
            "max_send_amount": 249908082013,
            "pending_change": 0,
            "pending_coin_removal_count": 0,
            "spendable_balance": 249908082013,
            "unconfirmed_wallet_balance": 249908082013,
            "unspent_coin_count": 19,
            "wallet_id": 1,
            "wallet_type": 0
        },
        "2": {
            "confirmed_wallet_balance": 0,
            "fingerprint": 3792481086,
            "max_send_amount": 0,
            "pending_change": 0,
            "pending_coin_removal_count": 0,
            "spendable_balance": 0,
            "unconfirmed_wallet_balance": 0,
            "unspent_coin_count": 6,
            "wallet_id": 2,
            "wallet_type": 10
        }
    }
}
```

</details>

---

### `select_coins`

Functionality: Select coins from a given wallet that add up to at least the specified amount

Usage: chia rpc wallet [OPTIONS] select_coins [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                  | Type         | Required | Description                                                          |
| :-------------------- | :----------- | :------- | :------------------------------------------------------------------- |
| wallet_id             | NUMBER       | True     | The ID of the wallet from which to select coins                      |
| amount                | NUMBER       | True     | The number of mojos to select                                        |
| min_coin_amount       | NUMBER       | False    | The smallest coin to be selected in this query [Default: No minimum] |
| max_coin_amount       | NUMBER       | False    | The largest coin to be selected in this query [Default: No maximum]  |
| excluded_coin_amounts | NUMBER ARRAY | False    | A list of coin amounts to exclude                                    |
| excluded_coins        | TEXT ARRAY   | False    | A list of coins to exclude                                           |

<details>
<summary>Example 1</summary>

Select 1000 mojos. Note that in this wallet, the smallest coin is worth `999 996 796` mojos, so that coin is selected:

```json
chia rpc wallet select_coins '{"wallet_id": 1, "amount": 1000}'
```

Response:

```json
{
  "coins": [
    {
      "amount": 999996796,
      "parent_coin_info": "0xfecaf9d1cffe1b71f00aee7816ea90562b18307d4461757e23f097703340beb7",
      "puzzle_hash": "0x138373343443d3cdf6bd033244f32d904dd93e1ad2772f120955c0d8d761b722"
    }
  ],
  "success": true
}
```

</details>

<details>
<summary>Example 2</summary>

Attempt to select 1000 mojos with `max_coin_amount` set to `10 000`. As in the previous example, the smallest coin in the wallet is worth `999 996 796` mojos, so the coin selection will fail:

```json
chia rpc wallet select_coins '{"wallet_id": 1, "amount": 1000, "min_coin_amount": 10, "max_coin_amount": 10000}'
```

Response:

```json
Request failed: {'error': 'Transaction for 1000 is greater than spendable balance of 0. There may be other transactions pending or our minimum coin amount is too high.', 'success': False}
```

</details>

---

### `send_notification`

Functionality: Send a notification to a specified puzzle hash

Usage: chia rpc wallet [OPTIONS] send_notification [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | TYPE       | Required | Description                                         |
| :-------- | :--------- | :------- | :-------------------------------------------------- |
| target    | HEX STRING | True     | The puzzle hash you would like to send a message to |
| message   | HEX STRING | True     | The hex-encoded message you would like to send      |
| amount    | NUMBER     | True     | The number of mojos to include with this message    |
| fee       | NUMBER     | False    | An optional blockchain fee, in mojos                |

<details>
<summary>Example 1: Send a generic message</summary>

```json
chia rpc wallet send_notification '{"target": "8c436f983d5bcbdb92d6d029a4113da580f2fc43b943e92ddf06a9f54e5f5003", "message": "fadedcab", "amount": 10000000, "fee": 10000000}'
```

Response:

```json
{
  "success": true,
  "tx": {
    "additions": [
      {
        "amount": 10000000,
        "parent_coin_info": "0x7159b046aa0f1af65f561efe6ed1de0beb3341cc28a883892c9bc14d89115ed0",
        "puzzle_hash": "0x201ef13f780295649cd7e2c8713c575b8dd2568463add6f8d3cfc6b3687d27bd"
      },
      {
        "amount": 249979799998,
        "parent_coin_info": "0x7159b046aa0f1af65f561efe6ed1de0beb3341cc28a883892c9bc14d89115ed0",
        "puzzle_hash": "0x970afdde67983d39b55475fa1a6bb24eb23e9ba47681fb693e80dee8c9346a83"
      }
    ],
    "amount": 10000000,
    "confirmed": false,
    "confirmed_at_height": 0,
    "created_at_time": 1667386486,
    "fee_amount": 10000000,
    "memos": {
      "f74fb363fbdeef3f6bcf7a0664a8ef76ea3e5f22bb4ffc9a1f9ef23b9329ae28": "fadedcab"
    },
    "name": "0x749898b3efcd50882283fb879e80e42cd59340c41943832b4daf896b5e6e80e4",
    "removals": [
      {
        "amount": 249999799998,
        "parent_coin_info": "0xf634ab1fc513d90d63c7eed840eb49a034f804b2d910418614776333590aab8c",
        "puzzle_hash": "0x8c436f983d5bcbdb92d6d029a4113da580f2fc43b943e92ddf06a9f54e5f5003"
      }
    ],
    "sent": 0,
    "sent_to": [],
    "spend_bundle": {
      "aggregated_signature": "0xb9db8ff2e29f00ec98b17019e13f11daea890a8ef82d1019b7655308c14623a0c15d37504b1e742d0f29132e6225c7f505a2c75f93ea0940f50615c3b83c2b851c5a76f5f027c8d823c85df7bea57e3dd702f03e2d8997173c1bb4ca64b97b87",
      "coin_spends": [
        {
          "coin": {
            "amount": 249999799998,
            "parent_coin_info": "0xf634ab1fc513d90d63c7eed840eb49a034f804b2d910418614776333590aab8c",
            "puzzle_hash": "0x8c436f983d5bcbdb92d6d029a4113da580f2fc43b943e92ddf06a9f54e5f5003"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0acc98d7c361cb95a6d16a2ee6a5dccb55d3beab9e7dbb52ebd7e4a94a8290166cf8e745d67a6eb36de6687141da09dccff018080",
          "solution": "0xff80ffff01ffff33ffa0201ef13f780295649cd7e2c8713c575b8dd2568463add6f8d3cfc6b3687d27bdff8400989680ffffa08c436f983d5bcbdb92d6d029a4113da580f2fc43b943e92ddf06a9f54e5f5003ff84fadedcab8080ffff33ffa0970afdde67983d39b55475fa1a6bb24eb23e9ba47681fb693e80dee8c9346a83ff853a33f509be80ffff34ff840098968080ffff3cffa0ef1272dc555d2fa0b17eb8a2d50dc507ce1f873de3443f3b7e36a3c802b0863b80ffff3dffa0a2d1d50e1bf8bd6f08e02885631ea6cbe7aa91d9de9809b5c37a7858fc0ad94b8080ff8080"
        },
        {
          "coin": {
            "amount": 10000000,
            "parent_coin_info": "0x7159b046aa0f1af65f561efe6ed1de0beb3341cc28a883892c9bc14d89115ed0",
            "puzzle_hash": "0x201ef13f780295649cd7e2c8713c575b8dd2568463add6f8d3cfc6b3687d27bd"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff06ffff01ff808080ff808080ffff04ffff01ff333cff018080ffff04ffff01a08c436f983d5bcbdb92d6d029a4113da580f2fc43b943e92ddf06a9f54e5f5003ffff04ffff018400989680ff01808080",
          "solution": "0x80"
        }
      ]
    },
    "to_address": "xch1yq00z0mcq22kf8xhuty8z0zhtwxay45yvwkad7xnelrtx6ray77sshkp7r",
    "to_puzzle_hash": "0x201ef13f780295649cd7e2c8713c575b8dd2568463add6f8d3cfc6b3687d27bd",
    "trade_id": null,
    "type": 1,
    "wallet_id": 1
  }
}
```

</details>

<details>
<summary>Example 2: Send an NFT notification</summary>

In this example, we will attempt to buy the following NFT:

```
nft1dcw9gfx034mxv2xkv568aupaqlc6em5sn3d2y3kzkt5js2gydr0stfd4ek
```

We will create an offer for this NFT and use the command line to send an offer directly to its owner.

First, create an Offer file. This can be accomplished with the [create_offer_for_ids](/offer-rpc#create_offer_for_ids) RPC. Offers can also be created from the reference wallet's GUI.

Next, post the offer to a URI. In this example, we will use Dexie.

The human-readable offer is located here:

[https://dexie.space/offers/4xtVpZWkTrpdsZhtJCKSpyRqJoT1qZXsJXy6Hqm8tYjr](https://dexie.space/offers/4xtVpZWkTrpdsZhtJCKSpyRqJoT1qZXsJXy6Hqm8tYjr)

However, the notification command requires a raw offer file. In Dexie's case, the URI will start with `raw.dexie.space`, as shown here:

[https://raw.dexie.space/4xtVpZWkTrpdsZhtJCKSpyRqJoT1qZXsJXy6Hqm8tYjr](https://raw.dexie.space/4xtVpZWkTrpdsZhtJCKSpyRqJoT1qZXsJXy6Hqm8tYjr)

Note that the raw offer file can be posted to any URI; it does not need to be on an exchange.

We will also need to obtain the Current Owner address of the NFT. This can be obtained from the `nft_get_info` RPC:

```bash
chia rpc wallet nft_get_info '{"coin_id":"nft1dcw9gfx034mxv2xkv568aupaqlc6em5sn3d2y3kzkt5js2gydr0stfd4ek"}'
```

Result:

```bash
{
    "nft_info": {
        "chain_info": "((117 \"https://nftstorage.link/ipfs/bafybeic32cwe43voxoybnwbayy7bedv4ip5tqho4jfol3xmtd62vscfoqa/78.jpg\" \"ipfs://bafybeic32cwe43voxoybnwbayy7bedv4ip5tqho4jfol3xmtd62vscfoqa/78.jpg\") (104 . 0x1a9152787d8374ececa0bf070b7a10e91162ada15964404d52232152f25b8b7a) (28021 \"https://nftstorage.link/ipfs/bafybeic32cwe43voxoybnwbayy7bedv4ip5tqho4jfol3xmtd62vscfoqa/metadata.json\" \"ipfs://bafybeic32cwe43voxoybnwbayy7bedv4ip5tqho4jfol3xmtd62vscfoqa/metadata.json\") (27765) (29550 . 1) (29556 . 1) (28008 . 0xfdfe889a579916f8f75dcfff809eee44fc844df5fa92aecd2d562578e7e69a24))",
        "data_hash": "0x1a9152787d8374ececa0bf070b7a10e91162ada15964404d52232152f25b8b7a",
        "data_uris": [
            "https://nftstorage.link/ipfs/bafybeic32cwe43voxoybnwbayy7bedv4ip5tqho4jfol3xmtd62vscfoqa/78.jpg",
            "ipfs://bafybeic32cwe43voxoybnwbayy7bedv4ip5tqho4jfol3xmtd62vscfoqa/78.jpg"
        ],
        "edition_number": 1,
        "edition_total": 1,
        "launcher_id": "0x6e1c5424cf8d766628d665347ef03d07f1acee909c5aa246c2b2e928290468df",
        "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
        "license_hash": "0x",
        "license_uris": [],
        "metadata_hash": "0xfdfe889a579916f8f75dcfff809eee44fc844df5fa92aecd2d562578e7e69a24",
        "metadata_uris": [
            "https://nftstorage.link/ipfs/bafybeic32cwe43voxoybnwbayy7bedv4ip5tqho4jfol3xmtd62vscfoqa/metadata.json",
            "ipfs://bafybeic32cwe43voxoybnwbayy7bedv4ip5tqho4jfol3xmtd62vscfoqa/metadata.json"
        ],
        "mint_height": 2459174,
        "minter_did": "0x7af52cbf50837fd387b02c60351f8ab9842a8f18b99ced7ab9a16a155c35d400",
        "nft_coin_id": "0x78a3012f0aa0c837ee1bed53f91c8d4e4897578e7757dee4965fdcd4cff0c94a",
        "nft_id": "nft1dcw9gfx034mxv2xkv568aupaqlc6em5sn3d2y3kzkt5js2gydr0stfd4ek",
        "off_chain_metadata": null,
        "owner_did": null,
        "p2_address": "0x47e26aa7ee46e7ed3a2f762fda7aa1d63db6be42e14fc3a18e54e13ee509f84b",
        "pending_transaction": false,
        "royalty_percentage": 300,
        "royalty_puzzle_hash": "0x3ed2cab30efeddb0d58c660b380ef0671292e922e1a01cccdff51d390f0473eb",
        "supports_did": true,
        "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
    },
    "success": true
}
```

In this case, we need the `p2_address`, which is `47e26aa7ee46e7ed3a2f762fda7aa1d63db6be42e14fc3a18e54e13ee509f84b` (the leading `0x` isn't needed).

Finally, we need to construct a valid message to send. The notification message payload is a JSON object with the following fields:

- `v`: &lt;number&gt; version of the notification message. Currently `1`.
- `t`: &lt;number&gt; type of the notification message. Currently `1` for offer.
- `d`: &lt;object&gt; payload of the notification message. The type of the payload depends on the notification type. For offer, the payload is an object with the following fields:
  - `u`: &lt;string&gt; offer URL
  - `ph`: &lt;string, optional&gt; puzzlehash of the notification sender, for sending a response (counter offer). If you want to disable counter offers for this offer, simply omit this flag

The `ph` for the message payload can be any puzzlehash in your key derivation. One way to obtain an address is with the `chia wallet get_address` command. For this example, we'll use:

```json
xch1ta7zjqqtaw9wyfnawl3z84a26vexr3qtmp7jq6gx4vpzl792sf9qddsacl
```

This address still needs to be converted into a puzzlehash. One way to accomplish this is with an online converter, such as the one available from [spacescan](https://www.spacescan.io/tools/puzzlehashconverter).
Another option is to use the `decode` command from the [chia-dev-tools](https://github.com/Chia-Network/chia-dev-tools) repository:

```json
cdv decode xch1ta7zjqqtaw9wyfnawl3z84a26vexr3qtmp7jq6gx4vpzl792sf9qddsacl
```

Response:

```json
5f7c29000beb8ae2267d77e223d7aad33261c40bd87d206906ab022ff8aa824a
```

The payload command we will use in this example is:

```json
{
  "v": 1,
  "t": 1,
  "d": {
    "u": "https://raw.dexie.space/4xtVpZWkTrpdsZhtJCKSpyRqJoT1qZXsJXy6Hqm8tYjr",
    "ph": "5f7c29000beb8ae2267d77e223d7aad33261c40bd87d206906ab022ff8aa824a"
  }
}
```

However, we still need to [convert it to hexadecimal format](https://www.rapidtables.com/convert/number/ascii-to-hex.html) for the RPC command.

The hex equivalent of the payload command is:

```json
7B2276223A312C2274223A312C2264223A7B2275223A2268747470733A2F2F7261772E64657869652E73706163652F34787456705A576B54727064735A68744A434B53707952714A6F5431715A58734A58793648716D3874596A72222C227068223A2235663763323930303062656238616532323637643737653232336437616164333332363163343062643837643230363930366162303232666638616138323461227D7D
```

Having obtained all of this information, we can run the command to send the message:

```json
chia rpc wallet send_notification '{"target": "47e26aa7ee46e7ed3a2f762fda7aa1d63db6be42e14fc3a18e54e13ee509f84b", "message": "7B2276223A312C2274223A312C2264223A7B2275223A2268747470733A2F2F7261772E64657869652E73706163652F34787456705A576B54727064735A68744A434B53707952714A6F5431715A58734A58793648716D3874596A72222C227068223A2235663763323930303062656238616532323637643737653232336437616164333332363163343062643837643230363930366162303232666638616138323461227D7D", "amount": 100000000, "fee": 1}'
```

Response:

```json
{
  "success": true,
  "tx": {
    "additions": [
      {
        "amount": 100000000,
        "parent_coin_info": "0xd5619c0b02a9279edf11ae85407fd8dc7472fe449fe6ab88d4cc480a5d4b24f5",
        "puzzle_hash": "0xa52a2bcbff9ece1137bbc9199be03b0b32e6406bf377f6dc201be6ee5a4dfd9c"
      },
      {
        "amount": 3106899989,
        "parent_coin_info": "0xd5619c0b02a9279edf11ae85407fd8dc7472fe449fe6ab88d4cc480a5d4b24f5",
        "puzzle_hash": "0x1732d207b04a03dd7d622cc9f491d43ca0561cf73a1efacdaa0e26e8902c8b73"
      }
    ],
    "amount": 100000000,
    "confirmed": false,
    "confirmed_at_height": 0,
    "created_at_time": 1677570233,
    "fee_amount": 1,
    "memos": {
      "121a439f242f4e59a871c464a9f324507aa4566d61ad8ec5d717468551e89c5a": "7b2276223a312c2274223a312c2264223a7b2275223a2268747470733a2f2f7261772e64657869652e73706163652f34787456705a576b54727064735a68744a434b53707952714a6f5431715a58734a58793648716d3874596a72222c227068223a2235663763323930303062656238616532323637643737653232336437616164333332363163343062643837643230363930366162303232666638616138323461227d7d"
    },
    "name": "0x61c5c10e604c7196a216ec7c39f1a448a222737ee854c85bb6e3dca174656348",
    "removals": [
      {
        "amount": 3206899990,
        "parent_coin_info": "0x162aea6e661610421def30f3c8b58c4154aef9dc4f847024f757a0b92117d704",
        "puzzle_hash": "0x035f40ced4483a04d2f677586724af21c868960d94410ac9e595d0944a019842"
      }
    ],
    "sent": 0,
    "sent_to": [],
    "spend_bundle": {
      "aggregated_signature": "0xa558eb279ebdf8bd9c58cddd992f38c7b2f48e86b2024917f85eb8beb4b24c7541e5ff8b1a81e3f73c35144f42ba4ce60ef55d36474e078292ddb6b99edb3f039a9f3f9282c1be2102ed811af5080cca37cb450a12039edce9ead563a6ab9740",
      "coin_spends": [
        {
          "coin": {
            "amount": 3206899990,
            "parent_coin_info": "0x162aea6e661610421def30f3c8b58c4154aef9dc4f847024f757a0b92117d704",
            "puzzle_hash": "0x035f40ced4483a04d2f677586724af21c868960d94410ac9e595d0944a019842"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b749d5d97e4e0acd2f5683215470994a04ccaaabdf11f6fa8df3d8e872ef28f86cb5fb98b29ec351d343dd5e447865b4ff018080",
          "solution": "0xff80ffff01ffff33ffa0a52a2bcbff9ece1137bbc9199be03b0b32e6406bf377f6dc201be6ee5a4dfd9cff8405f5e100ffffa047e26aa7ee46e7ed3a2f762fda7aa1d63db6be42e14fc3a18e54e13ee509f84bffc0a67b2276223a312c2274223a312c2264223a7b2275223a2268747470733a2f2f7261772e64657869652e73706163652f34787456705a576b54727064735a68744a434b53707952714a6f5431715a58734a58793648716d3874596a72222c227068223a2235663763323930303062656238616532323637643737653232336437616164333332363163343062643837643230363930366162303232666638616138323461227d7d8080ffff33ffa01732d207b04a03dd7d622cc9f491d43ca0561cf73a1efacdaa0e26e8902c8b73ff8500b92f881580ffff34ff0180ffff3cffa087e5e080ce5b080e6e42deaf20d2170a553fdf0ace32cbbce0a88b0c46a4aa0580ffff3dffa0eae0770951a738b72415a06b0a92ba0bcd9c46e2f16e2c545e9eafb9020485768080ff8080"
        },
        {
          "coin": {
            "amount": 100000000,
            "parent_coin_info": "0xd5619c0b02a9279edf11ae85407fd8dc7472fe449fe6ab88d4cc480a5d4b24f5",
            "puzzle_hash": "0xa52a2bcbff9ece1137bbc9199be03b0b32e6406bf377f6dc201be6ee5a4dfd9c"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff06ffff01ff808080ff808080ffff04ffff01ff333cff018080ffff04ffff01a047e26aa7ee46e7ed3a2f762fda7aa1d63db6be42e14fc3a18e54e13ee509f84bffff04ffff018405f5e100ff01808080",
          "solution": "0x80"
        }
      ]
    },
    "to_address": "xch1554zhjllnm8pzdameyvehcpmpvewvsrt7dmldhpqr0nwukjdlkwqsngqcq",
    "to_puzzle_hash": "0xa52a2bcbff9ece1137bbc9199be03b0b32e6406bf377f6dc201be6ee5a4dfd9c",
    "trade_id": null,
    "type": 1,
    "wallet_id": 1
  }
}
```

This command will create a Message Coin on the blockchain. Once it has been confirmed, the current owner of the NFT will receive a notification of the offer in their wallet. The owner can choose to accept the offer, delete the notification, or send a counter offer to the `ph` that was included in the payload.

</details>

---

### `send_transaction`

Functionality: Send a transaction

Usage: chia rpc wallet [OPTIONS] send_transaction [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                 | Type         | Required | Description                                                                                                                                                                              |
| :------------------- | :----------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wallet_id            | TEXT         | True     | The wallet ID for the origin of the transaction                                                                                                                                          |
| address              | TEXT         | True     | The destination address                                                                                                                                                                  |
| amount               | NUMBER       | True     | The number of mojos to send                                                                                                                                                              |
| fee                  | NUMBER       | False    | An optional blockchain fee, in mojos                                                                                                                                                     |
| memos                | TEXT ARRAY   | False    | An optional array of memos to be sent with the transaction                                                                                                                               |
| min_coin_amount      | NUMBER       | False    | The minimum coin amount to send [Default: 0]                                                                                                                                             |
| max_coin_amount      | NUMBER       | False    | The maximum coin amount to send [Default: 0]                                                                                                                                             |
| exclude_coin_amounts | NUMBER ARRAY | False    | A list of coin amounts to exclude                                                                                                                                                        |
| exclude_coin_ids     | TEXT ARRAY   | False    | A list of coin IDs to exclude                                                                                                                                                            |
| reuse_puzhash        | BOOLEAN      | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml |

<details>
<summary>Example</summary>

```json
chia rpc wallet send_transaction '{"wallet_id": 1, "address": "xch1fev2qaclwpcue9kx4p39dzfxpzaavvcz5v3lhx77cxha7f0tjjlsngh5k0", "amount": 1000, "fee": 1, "memos":["memo1"]}'
```

Response:

```json
{
  "success": true,
  "transaction": {
    "additions": [
      {
        "amount": 1000,
        "parent_coin_info": "0xfecaf9d1cffe1b71f00aee7816ea90562b18307d4461757e23f097703340beb7",
        "puzzle_hash": "0x4e58a0771f7071cc96c6a86256892608bbd63302a323fb9bdec1afdf25eb94bf"
      },
      {
        "amount": 999996796,
        "parent_coin_info": "0xfecaf9d1cffe1b71f00aee7816ea90562b18307d4461757e23f097703340beb7",
        "puzzle_hash": "0x138373343443d3cdf6bd033244f32d904dd93e1ad2772f120955c0d8d761b722"
      }
    ],
    "amount": 1000,
    "confirmed": false,
    "confirmed_at_height": 0,
    "created_at_time": 1669261889,
    "fee_amount": 1,
    "memos": {
      "029b8689abda7f4ff4871e1cd69eb32725a0cda8520b751bcf774fb681e19bc5": "6d656d6f31"
    },
    "name": "0x94a6b6a2353a8f49b6dc30d7141272df14bc82727fd0d82a18680605b2a90051",
    "removals": [
      {
        "amount": 999997797,
        "parent_coin_info": "0x81d6dac68bb566d696a62629e1e08edd5b684d35c3ee8c7164b1c3a457514203",
        "puzzle_hash": "0xd84faa841550d718863fc1139ff880c8366a546ab7dc567a672a14c7ddf5b4b7"
      }
    ],
    "sent": 0,
    "sent_to": [],
    "spend_bundle": {
      "aggregated_signature": "0xa95fba5e9e310d1c096bb44e27d98b070b7591be29d3f174ac42bcad39ec5e8a356747851c3df456973c96f55884dbb913247000368b0d1fa3518f11dae0ed45cb8f0961899aa7ee2102c58265d9460a31c33bd896ce9a2ef377bbc6419343b0",
      "coin_spends": [
        {
          "coin": {
            "amount": 999997797,
            "parent_coin_info": "0x81d6dac68bb566d696a62629e1e08edd5b684d35c3ee8c7164b1c3a457514203",
            "puzzle_hash": "0xd84faa841550d718863fc1139ff880c8366a546ab7dc567a672a14c7ddf5b4b7"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a5abd588cc5a2c873ee37809ea33432b7a87aaf8370eba7f9806bc1eac517034b3850cc7a4f2550f108b8a124d3dbbc3ff018080",
          "solution": "0xff80ffff01ffff33ffa04e58a0771f7071cc96c6a86256892608bbd63302a323fb9bdec1afdf25eb94bfff8203e8ffff856d656d6f318080ffff33ffa0138373343443d3cdf6bd033244f32d904dd93e1ad2772f120955c0d8d761b722ff843b9abd7c80ffff34ff0180ffff3cffa086ec6c5fe3716c6e0b39c0049a3d164f491c3347c4fd36196ecc561b5cf347da8080ff8080"
        }
      ]
    },
    "to_address": "xch1fev2qaclwpcue9kx4p39dzfxpzaavvcz5v3lhx77cxha7f0tjjlsngh5k0",
    "to_puzzle_hash": "0x4e58a0771f7071cc96c6a86256892608bbd63302a323fb9bdec1afdf25eb94bf",
    "trade_id": null,
    "type": 1,
    "wallet_id": 1
  },
  "transaction_id": "0x94a6b6a2353a8f49b6dc30d7141272df14bc82727fd0d82a18680605b2a90051"
}
```

</details>

---

### `send_transaction_multi`

Functionality: Send multiple transactions from a given wallet

Usage: chia rpc wallet [OPTIONS] send_transaction_multi [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type       | Required | Description                                                |
| :-------- | :--------- | :------- | :--------------------------------------------------------- |
| wallet_id | TEXT       | True     | The wallet ID for the origin of the transaction            |
| address   | TEXT       | True     | The destination address                                    |
| amount    | NUMBER     | True     | The number of mojos to send                                |
| fee       | NUMBER     | False    | An optional blockchain fee, in mojos                       |
| memos     | TEXT ARRAY | False    | An optional array of memos to be sent with the transaction |
| additions | TEXT ARRAY | True     | A list of puzzle hashes and amounts to be included         |

---

### `sign_message_by_address`

Functionality: Sign a message using an XCH address without incurring an on-chain transaction

Usage: chia rpc wallet [OPTIONS] sign_message_by_address [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | TYPE   | Required | Description                                                           |
| :-------- | :----- | :------- | :-------------------------------------------------------------------- |
| address   | STRING | True     | The address to use for signing. Must possess the key for this address |
| message   | STRING | True     | The message to include with the signature                             |

<details>
<summary>Example</summary>

```json
chia rpc wallet sign_message_by_address '{"address":"xch1q94gd4hd62ecx08d0kuagmp5cr8umrwtcvatfupmd7uyzhuf4c4sy2zd46", "message":"test"}'
```

Response:

```json
{
  "pubkey": "814612ec24a4957cf38ee5f5d5bc544820575375d7997da12c07f3f09215a178cfa76f151edba4c0ae40b66a97a6275e",
  "signature": "a10234b38cc962f9678882f18885fee23a288c389bc0145588f7000bca12b55fcfaffff0cdd4ef7f136f8aab571ddd2e089b281ae267347fb20225d86490e91fbedad59ba9d38f9308f251070ea1260909dd69133273a49650749cfe6ff96d40",
  "success": true
}
```

</details>

---

### `sign_message_by_id`

Functionality: Sign a message using a DID or NFT ID without incurring an on-chain transaction

Usage: chia rpc wallet [OPTIONS] sign_message_by_id [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | TYPE   | Required | Description                                                            |
| :-------- | :----- | :------- | :--------------------------------------------------------------------- |
| id        | STRING | True     | The DID or NFT ID to use for signing. Must possess the key for this ID |
| message   | STRING | True     | The message to include with the signature                              |

<details>
<summary>Example</summary>

```json
chia rpc wallet sign_message_by_id '{"id":"nft12dfld077vn3ywp4vdx9ljg96k89kpr6jlqwkm7lgaf3g8jwn2l4q6eytqs", "message":"test"}'
```

Response:

```json
{
  "pubkey": "a5b35d3370745ae7634022ddd970379b4ed4acdd2d34622f1dfdf2b9923b16ac6e8b317abcf1cc8beb1e882d341e4458",
  "signature": "843deb871383889bfb8b9b22c0137e9b12cef875e27c998a3def6aa13c9340e2036ae90bbbb9a78894572319bf0fedbc08057849882ca6723834a99bf0e97a5e9f9702c5a02a64434b3550922c488f957036d19af2be2c92eb84c1d5d4f8eba6",
  "success": true
}
```

</details>

---

### `spend_clawback_coins`

Functionality: Spend clawback coins that were sent (to claw them back) or received (to claim them)

Usage: chia rpc wallet [OPTIONS] spend_clawback_coins [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag       | Type         | Required | Description                                                                                                        |
| :--------- | :----------- | :------- |:------------------------------------------------------------------------------------------------------------------ |
| coin_ids   | STRING ARRAY | True     | List of coin IDs to be spent                                                                                       |
| batch_size | NUMBER       | False    | The number of coins to spend per bundle, [Default: `batch_size` obtainable from [get_auto_claim](#get_auto_claim)] |
| fee        | NUMBER       | False    | An optional blockchain fee, in mojos                                                                               |

When examing the on-chain metadata for a transaction, a coin with `"type": 6` is a clawback coin to be received by this wallet, and a coin with `"type": 7` is a clawback coin sent from this wallet.

<details>
<summary>Example</summary>

First, list a clawback transaction. For this example, we will specify the `to_address`.

Alternatively, you could search for coins with `"type": 6` (receive) or `"type": 7` (send), and `"spent": false`.

```json
chia rpc wallet get_transactions '{"wallet_id": 1, "to_address": "txch1cls7s7z7twt89l5ahv7kkmyanqg0zw7t9an2frmp9uqurw5q25hsgtd4fy"}'
```

Response:

```json
{
    "success": true,
    "transactions": [
        {
            "additions": [
                {
                    "amount": 1000000000000,
                    "parent_coin_info": "0x4bc01742a2fd34c3e73f70325250df90078b27c4ce344c70cb30977800b266b0",
                    "puzzle_hash": "0x501579507d7b5af574084d7ec4482c808757eea6de4b7af7c404c7941d047df8"
                },
                {
                    "amount": 999700000000,
                    "parent_coin_info": "0x4bc01742a2fd34c3e73f70325250df90078b27c4ce344c70cb30977800b266b0",
                    "puzzle_hash": "0x80877718b9cbb2cd8a74c16698d2b31e2c282fcb9eb3694d3637dab3777d7963"
                }
            ],
            "amount": 1000000000000,
            "confirmed": true,
            "confirmed_at_height": 2765989,
            "created_at_time": 1686643350,
            "fee_amount": 100000000,
            "memos": {
                "97822ef25be65d8c1cf9988a8151dedb140d54bbfe396b153ca561b7afdca1ea": "c7e1e8785e5b9672fe9dbb3d6b6c9d9810f13bcb2f66a48f612f01c1ba80552f"
            },
            "name": "0x199415953fb4f1fea1131a0a44a30f78d456b970bdb16ac300d2d7ec81897c42",
            "removals": [
                {
                    "amount": 1999800000000,
                    "parent_coin_info": "0x39af4024f6562f5758bf32e9fc554db32a7baf4a9eb6b750d269f95f0f7e52d1",
                    "puzzle_hash": "0x7414b827d59ca447f82dd51a2672b0cbb1acf8d819d58774b62620b460d9cb43"
                }
            ],
            "sent": 3,
            "sent_to": [
                [
                    "b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab",
                    1,
                    null
                ],
                [
                    "5d00527d8db1c5ba8043fbe565d065ff1a0933e84b69a1e74b5f2e9c6b07b375",
                    1,
                    null
                ],
                [
                    "a9e061dec18380f16afc72df7a580a5291eaf26175c0089c25f72a6d5be71773",
                    3,
                    "ALREADY_INCLUDING_TRANSACTION"
                ]
            ],
            "spend_bundle": {
                "aggregated_signature": "0x807a93c48e191a940738f1d886ade121a99901cd3f57d989cf014c5d09d8179507e5c36161974585c19b5c6b7578f06211742e5439e6d4e9eae69b8f8987898abe3f60e0925aa564e8d4f44b1591743649e61d043347af30f52bfa78d57f2166",
                "coin_spends": [
                    {
                        "coin": {
                            "amount": 1999800000000,
                            "parent_coin_info": "0x39af4024f6562f5758bf32e9fc554db32a7baf4a9eb6b750d269f95f0f7e52d1",
                            "puzzle_hash": "0x7414b827d59ca447f82dd51a2672b0cbb1acf8d819d58774b62620b460d9cb43"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b1d8407fee30b01e66ab0baa86d1dcb67f41a91bc9aca70867dba877ec7276174344afc58adaf65c6e3ee7e483b39e8bff018080",
                        "solution": "0xff80ffff01ffff01ff02ffc04e00010000004800000000000002587414b827d59ca447f82dd51a2672b0cbb1acf8d819d58774b62620b460d9cb43c7e1e8785e5b9672fe9dbb3d6b6c9d9810f13bcb2f66a48f612f01c1ba80552f80ffff33ffa0501579507d7b5af574084d7ec4482c808757eea6de4b7af7c404c7941d047df8ff8600e8d4a51000ffffa0c7e1e8785e5b9672fe9dbb3d6b6c9d9810f13bcb2f66a48f612f01c1ba80552f8080ffff33ffa080877718b9cbb2cd8a74c16698d2b31e2c282fcb9eb3694d3637dab3777d7963ff8600e8c2c36d0080ffff34ff8405f5e10080ffff3cffa0cd929a98aba31bcee901d852a568089fb3ab7bbc8830eda7dba733692af3ffb58080ff8080"
                    }
                ]
            },
            "to_address": "txch1cls7s7z7twt89l5ahv7kkmyanqg0zw7t9an2frmp9uqurw5q25hsgtd4fy",
            "to_puzzle_hash": "0xc7e1e8785e5b9672fe9dbb3d6b6c9d9810f13bcb2f66a48f612f01c1ba80552f",
            "trade_id": null,
            "type": 1,
            "wallet_id": 1
        },
        {
            "additions": [
                {
                    "amount": 1000000000000,
                    "parent_coin_info": "0x4bc01742a2fd34c3e73f70325250df90078b27c4ce344c70cb30977800b266b0",
                    "puzzle_hash": "0x501579507d7b5af574084d7ec4482c808757eea6de4b7af7c404c7941d047df8"
                }
            ],
            "amount": 1000000000000,
            "confirmed": false,
            "confirmed_at_height": 2765989,
            "created_at_time": 1686643386,
            "fee_amount": 0,
            "memos": {
                "97822ef25be65d8c1cf9988a8151dedb140d54bbfe396b153ca561b7afdca1ea": "c7e1e8785e5b9672fe9dbb3d6b6c9d9810f13bcb2f66a48f612f01c1ba80552f"
            },
            "metadata": {
                "coin_id": "97822ef25be65d8c1cf9988a8151dedb140d54bbfe396b153ca561b7afdca1ea",
                "recipient_puzzle_hash": "0xc7e1e8785e5b9672fe9dbb3d6b6c9d9810f13bcb2f66a48f612f01c1ba80552f",
                "sender_puzzle_hash": "0x7414b827d59ca447f82dd51a2672b0cbb1acf8d819d58774b62620b460d9cb43",
                "spent": false,
                "time_lock": 600
            },
            "name": "0x97822ef25be65d8c1cf9988a8151dedb140d54bbfe396b153ca561b7afdca1ea",
            "removals": [
                {
                    "amount": 1999800000000,
                    "parent_coin_info": "0x39af4024f6562f5758bf32e9fc554db32a7baf4a9eb6b750d269f95f0f7e52d1",
                    "puzzle_hash": "0x7414b827d59ca447f82dd51a2672b0cbb1acf8d819d58774b62620b460d9cb43"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": null,
            "to_address": "txch1cls7s7z7twt89l5ahv7kkmyanqg0zw7t9an2frmp9uqurw5q25hsgtd4fy",
            "to_puzzle_hash": "0xc7e1e8785e5b9672fe9dbb3d6b6c9d9810f13bcb2f66a48f612f01c1ba80552f",
            "trade_id": null,
            "type": 7,
            "wallet_id": 1
        }
    ],
    "wallet_id": 1
}
```

This coin is `"type": 7`, so it is being sent from this wallet. This RPC can be used to claw back this coin as long as it has yet to be spent by the recipient wallet:

```json
chia rpc wallet spend_clawback_coins '{"wallet_id": 1, "coin_ids": ["97822ef25be65d8c1cf9988a8151dedb140d54bbfe396b153ca561b7afdca1ea"], "fee": 100000000}'
```

Result:

```json
{
    "success": true,
    "transaction_ids": [
        "66f7fd75bb4a2408d219d89f8588ba4dceb28e95cc3105822142780cdce5fecd"
    ]
}
```

If you would like to see the result, call the `get_transaction` RPC:

```json
chia rpc wallet get_transaction '{"transaction_id": "66f7fd75bb4a2408d219d89f8588ba4dceb28e95cc3105822142780cdce5fecd"}'
```

```json
{
    "success": true,
    "transaction": {
        "additions": [
            {
                "amount": 1000000000000,
                "parent_coin_info": "0x97822ef25be65d8c1cf9988a8151dedb140d54bbfe396b153ca561b7afdca1ea",
                "puzzle_hash": "0x7414b827d59ca447f82dd51a2672b0cbb1acf8d819d58774b62620b460d9cb43"
            },
            {
                "amount": 999600000000,
                "parent_coin_info": "0xc06eb268becfb157b92baecced9685db66b048fd7bb8900cabedd14eef773a46",
                "puzzle_hash": "0x258815e9a6a41d3dacc4d8959630fda6a0db14364751e58719b84c78df971b3b"
            }
        ],
        "amount": 1000000000000,
        "confirmed": true,
        "confirmed_at_height": 2766056,
        "created_at_time": 1686644367,
        "fee_amount": 100000000,
        "memos": {
            "feeedc3b56a7ed6cb96e34c7492cd6fcba07363d6861cd0094d3975734a275f9": "c7e1e8785e5b9672fe9dbb3d6b6c9d9810f13bcb2f66a48f612f01c1ba80552f"
        },
        "name": "0x66f7fd75bb4a2408d219d89f8588ba4dceb28e95cc3105822142780cdce5fecd",
        "removals": [
            {
                "amount": 1000000000000,
                "parent_coin_info": "0x4bc01742a2fd34c3e73f70325250df90078b27c4ce344c70cb30977800b266b0",
                "puzzle_hash": "0x501579507d7b5af574084d7ec4482c808757eea6de4b7af7c404c7941d047df8"
            },
            {
                "amount": 999700000000,
                "parent_coin_info": "0x4bc01742a2fd34c3e73f70325250df90078b27c4ce344c70cb30977800b266b0",
                "puzzle_hash": "0x80877718b9cbb2cd8a74c16698d2b31e2c282fcb9eb3694d3637dab3777d7963"
            }
        ],
        "sent": 1,
        "sent_to": [
            [
                "b3d9de85d29931c10050b56c7afb91c99141943fc81ff2d1a8425e52be0d08ab",
                1,
                null
            ]
        ],
        "spend_bundle": {
            "aggregated_signature": "0xb7a57e1e3c2e93d36c611cac4bc39d6c2f1a9c78dbfc6ec14603c3c7c662a95dffe7295ddaf92f4328c7f2a7f374094007b4b63f5a5f116d63200e4f79e59f249dafd5492d7a09d5c0c0fcfc7af8950c8bd006ee8681e65b96eb98bd21862fdf",
            "coin_spends": [
                {
                    "coin": {
                        "amount": 1000000000000,
                        "parent_coin_info": "0x4bc01742a2fd34c3e73f70325250df90078b27c4ce344c70cb30977800b266b0",
                        "puzzle_hash": "0x501579507d7b5af574084d7ec4482c808757eea6de4b7af7c404c7941d047df8"
                    },
                    "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff09ff05ffff02ff06ffff04ff02ffff04ffff0bffff0101ffff02ff04ffff04ff02ffff04ff17ff8080808080ffff04ff0bff808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff04ffff01ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff04ffff04ff02ffff04ff09ff80808080ffff02ff04ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff1bffff01ff02ff06ffff04ff02ffff04ffff02ffff03ffff18ffff0101ff1380ffff01ff0bffff0102ff2bff0580ffff01ff0bffff0102ff05ff2b8080ff0180ffff04ffff04ffff17ff13ffff0181ff80ff3b80ff8080808080ffff010580ff0180ff018080ffff04ffff01a0f917921d94014f9e85421e22cebd5e9e48ee95ba1c7cd80ca85f3f8a46156fd6ff018080",
                    "solution": "0xffff01ffa0d7dcfd3463b023bd7d49ef029780c011f40a246fbeb5f5313232caf1c15a3b3780ffff02ffff01ff02ffff01ff02ffff03ffff09ff05ffff02ff02ffff04ff02ffff04ff0bff8080808080ffff01ff02ff0bff1780ffff01ff088080ff0180ffff04ffff01ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff02ffff04ff02ffff04ff09ff80808080ffff02ff02ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a07414b827d59ca447f82dd51a2672b0cbb1acf8d819d58774b62620b460d9cb43ff018080ffffff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b1d8407fee30b01e66ab0baa86d1dcb67f41a91bc9aca70867dba877ec7276174344afc58adaf65c6e3ee7e483b39e8bff018080ffff80ffff01ffff33ffa07414b827d59ca447f82dd51a2672b0cbb1acf8d819d58774b62620b460d9cb43ff8600e8d4a51000ffffa0c7e1e8785e5b9672fe9dbb3d6b6c9d9810f13bcb2f66a48f612f01c1ba80552f8080ffff3cffa047dd5ceefbabf716dab535e57ad057fbfbb080165ccdc985429dde676efbf7498080ff80808080"
                },
                {
                    "coin": {
                        "amount": 999700000000,
                        "parent_coin_info": "0x4bc01742a2fd34c3e73f70325250df90078b27c4ce344c70cb30977800b266b0",
                        "puzzle_hash": "0x80877718b9cbb2cd8a74c16698d2b31e2c282fcb9eb3694d3637dab3777d7963"
                    },
                    "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0918b9dfaeb883c0addc43329396f6a18ab862989b0885f4fed046cf7f04b47bdc849f158be97c6b08e38e46e75c99843ff018080",
                    "solution": "0xff80ffff01ffff33ffa0258815e9a6a41d3dacc4d8959630fda6a0db14364751e58719b84c78df971b3bff8600e8bccd8c0080ffff34ff8405f5e10080ffff3cffa0ac7c3aeb418ff77a35fdb1d9e8fe97424c8757ffbfcee8f649385f5b4cf9244f80ffff3dffa088e357cca82523bd860af625729fa6bd31b05a7f837c0bbb1ebbe4193e2baf8f8080ff8080"
                }
            ]
        },
        "to_address": "txch1ws2tsf74njjy07pd65dzvu4sewc6e7xcr82cwa9kycstgcxeedpsqf5r2a",
        "to_puzzle_hash": "0x7414b827d59ca447f82dd51a2672b0cbb1acf8d819d58774b62620b460d9cb43",
        "trade_id": null,
        "type": 8,
        "wallet_id": 1
    },
    "transaction_id": "0x66f7fd75bb4a2408d219d89f8588ba4dceb28e95cc3105822142780cdce5fecd"
```

</details>

---

### `verify_signature`

Functionality: Given a public key, message and signature, verify if it is valid.

Usage: chia rpc wallet [OPTIONS] verify_signature [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag         | Type | Required | Description                                                                                     |
| :----------- | :--- | :------- | :---------------------------------------------------------------------------------------------- |
| signing_mode | TEXT | False    | Specify the type of signature to verify [Default: BLS with hex input] (see below for more info) |
| pubkey       | TEXT | True     | The public key of the signature to verify                                                       |
| message      | TEXT | True     | The message to verify                                                                           |
| signature    | TEXT | True     | The signature to verify                                                                         |
| address      | TEXT | True     | The address, which must be derived from `pubkey`                                                |

The signing mode strings are [stored in an enum](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/types/signing_mode.py). As of Chia 2.0.0, valid signing mode strings include:
* `BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_AUG:hexinput_`
  * Default signing mode
  * Describes the standard BLS signatures used by Chia
  * Uses a hex input
  * Taken from [ietf.org](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-bls-signature-05#name-sign)
  * Cipher suites used for BLS signatures are also defined at [ietf.org](https://datatracker.ietf.org/doc/html/draft-irtf-cfrg-bls-signature-05#name-ciphersuites)
* `BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_AUG:utf8input_`
  * Same as above, but uses UTF-8 instead of hex
* `BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_AUG:CHIP-0002_`
  * [CHIP-0002](https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0002.md) signs the result of `sha256tree(cons("Chia Signed Message", message))` using the BLS message augmentation scheme



---

## CATs and trading

### `cancel_offer`

Functionality: Cancel an offer

Usage: chia rpc wallet [OPTIONS] cancel_offer [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag     | Type    | Required | Description                                                                                                                                                                                    |
| :------- | :------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| secure   | BOOLEAN | True     | Set to `true` to cancel on the blockchain by spending the coin(s) being offered; set to `false` to cancel in the wallet only. If `false`, the offer could still be taken if it has been shared |
| trade_id | TEXT    | True     | The ID of the offer to cancel                                                                                                                                                                  |
| fee      | NUMBER  | False    | An optional blockchain fee, in mojos                                                                                                                                                           |

<details>
<summary>Example</summary>

```json
chia rpc wallet cancel_offer '{"secure": true, "trade_id": "c4d9f06599e4ba30edfabecc72a03db7d7e86c003ab83520002a844cfebf2ef5", "fee": 1}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `cancel_offers`

Functionality: Cancel all offers, with the option to cancel only offers for a specific asset class

Usage: chia rpc wallet [OPTIONS] cancel_offers [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag       | Type    | Required | Description                                                                                                                                                                                    |
| :--------- | :------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| secure     | BOOLEAN | True     | Set to `true` to cancel on the blockchain by spending the coin(s) being offered; set to `false` to cancel in the wallet only. If `false`, the offer could still be taken if it has been shared |
| batch_fee  | NUMBER  | False    | The fee, in mojos, to add to each batch cancellation [Default: 0]                                                                                                                              |
| batch_size | NUMBER  | False    | The number of offers to cancel in each batch [Default: 5]                                                                                                                                      |
| cancel_all | BOOLEAN | False    | Set to `true` to cancel all offers for all assets [Default: `false`]                                                                                                                           |
| asset_id   | TEXT    | False    | If `cancel_all` is false, then only cancel the specified type of asset [Default: `xch`]                                                                                                        |

<details>
<summary>Example</summary>

```json
chia rpc wallet cancel_offers '{"secure": true}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `cat_asset_id_to_name`

Functionality: Retrieve a CAT's name from its ID

Usage: chia rpc wallet [OPTIONS] cat_asset_id_to_name [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag     | Type | Required | Description                                                                                                                                 |
| :------- | :--- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| asset_id | TEXT | True     | The ID of the CAT whose name you would like to retrieve. This CAT must be listed in your `DEFAULT_CATS`, ie the CATs your wallet recognizes |

<details>
<summary>Example</summary>

```json
chia rpc wallet cat_asset_id_to_name '{"asset_id": "1f9fd0d4a1221241df986f042e014c056571062c82a5ba9b88c866c92808e1a9"}'
```

Response:

```json
{
  "name": "New CAT Wallet",
  "success": true,
  "wallet_id": 2
}
```

</details>

---

### `cat_get_asset_id`

Functionality: Retrieve a the asset ID from a CAT wallet

Usage: chia rpc wallet [OPTIONS] cat_get_asset_id [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type   | Required | Description                                                  |
| :-------- | :----- | :------- | :----------------------------------------------------------- |
| wallet_id | NUMBER | True     | The wallet ID of the CAT whose ID you would like to retrieve |

<details>
<summary>Example</summary>

```json
chia rpc wallet cat_get_asset_id '{"wallet_id": 2}'
```

Response:

```json
{
  "asset_id": "1f9fd0d4a1221241df986f042e014c056571062c82a5ba9b88c866c92808e1a9",
  "success": true,
  "wallet_id": 2
}
```

</details>

---

### `cat_get_name`

Functionality: Get the name of a CAT associated with a wallet ID

Usage: chia rpc wallet [OPTIONS] cat_get_name [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type   | Required | Description                                                    |
| :-------- | :----- | :------- | :------------------------------------------------------------- |
| wallet_id | NUMBER | True     | The wallet ID of the CAT whose name you would like to retrieve |

<details>
<summary>Example</summary>

```json
chia rpc wallet cat_get_name '{"wallet_id": 2}'
```

Response:

```json
{
  "name": "New CAT Wallet",
  "success": true,
  "wallet_id": 2
}
```

</details>

---

### `cat_set_name`

Functionality: Rename a CAT wallet

Usage: chia rpc wallet [OPTIONS] cat_set_name [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type   | Required | Description                                              |
| :-------- | :----- | :------- | :------------------------------------------------------- |
| wallet_id | NUMBER | True     | The ID of the wallet whose name you would like to change |
| name      | TEXT   | True     | The new name for the wallet                              |

<details>
<summary>Example</summary>

```json
chia rpc wallet cat_set_name '{"wallet_id": 2, "name": "New CAT Wallet"}'
```

Response:

```json
{
  "success": true,
  "wallet_id": 2
}
```

</details>

---

### `cat_spend`

Functionality: Send CAT funds to another wallet

Usage: chia rpc wallet [OPTIONS] cat_spend [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                 | Type         | Required | Description                                                                                                                                                                              |
| :------------------- | :----------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wallet_id            | TEXT         | True     | The wallet ID for the origin of the transaction                                                                                                                                          |
| additions            | TEXT ARRAY   | True\*   | \*Must include either `additions` or `amount`. A list of puzzle hashes and amounts to be included                                                                                        |
| amount               | NUMBER       | True\*   | \*Must include either `additions` or `amount`. The number of mojos to send                                                                                                               |
| inner_address        | TEXT         | True     | The destination address                                                                                                                                                                  |
| memos                | TEXT ARRAY   | False    | An optional array of memos to be sent with the transaction                                                                                                                               |
| coins                | TEXT ARRAY   | False    | A list of coins to include in the spend                                                                                                                                                  |
| min_coin_amount      | NUMBER       | False    | The minimum coin amount to send [Default: 0]                                                                                                                                             |
| max_coin_amount      | NUMBER       | False    | The maximum coin amount to send [Default: 0]                                                                                                                                             |
| exclude_coin_amounts | NUMBER ARRAY | False    | A list of coin amounts to exclude                                                                                                                                                        |
| exclude_coin_ids     | TEXT ARRAY   | False    | A list of coin IDs to exclude                                                                                                                                                            |
| fee                  | NUMBER       | False    | An optional blockchain fee, in mojos                                                                                                                                                     |
| extra_delta          | TEXT         | False\*  | The CAT's `extra_delta` parameter; \*If specified, then `tail_reveal` and `tail_solution` must also be specified                                                                         |
| tail_reveal          | TEXT         | False\*  | The CAT's `tail_reveal` parameter; \*If specified, then `extra_delta` and `tail_solution` must also be specified                                                                         |
| tail_solution        | TEXT         | False\*  | The CAT's `tail_solution` parameter; \*If specified, then `extra_delta` and `tail_reveal` must also be specified                                                                         |
| reuse_puzhash        | BOOLEAN      | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml |

<details>
<summary>Example</summary>

```json
chia rpc wallet cat_spend '{"wallet_id": 7, "amount": 1, "inner_address": "xch19mpn09rnn62nlur7h05naeeq2m6lprdr48f3cgt9j6s8a2h3kk6qdydujd", "fee": 1}'
```

Response:

```json
{
  "success": true,
  "transaction": {
    "additions": [
      {
        "amount": 1,
        "parent_coin_info": "0x60a8b06515aaefe74236eb234130d769a1b65c99706414901277926fe29c3360",
        "puzzle_hash": "0xfe6329b1d5aa73c22d6f9f3c76e97c9c0b07af5799ff70b023b77ccf87cd0e2c"
      },
      {
        "amount": 999999,
        "parent_coin_info": "0x60a8b06515aaefe74236eb234130d769a1b65c99706414901277926fe29c3360",
        "puzzle_hash": "0xad5de77c7da1316b9b72708d17dbb8937855d740ebaf85669b8bd925275e8d49"
      },
      {
        "amount": 39261664,
        "parent_coin_info": "0x12c33763d41055dd71a7a5676ced26bef08e059255c16e59f76033f98dcfedd4",
        "puzzle_hash": "0x43a21683130c97ed272becd70e02d60f1b86a180fd759e28bf0d94f7eedd0fa5"
      }
    ],
    "amount": 1,
    "confirmed": false,
    "confirmed_at_height": 0,
    "created_at_time": 1669274635,
    "fee_amount": 1,
    "memos": {
      "18ffd7f3bbadda1017218bb535caf7393190222ecf5fbdf04ed5f6855926d6dd": "2ec33794739e953ff07ebbe93ee72056f5f08da3a9d31c216596a07eaaf1b5b4"
    },
    "name": "0xb9df7b15f7a6b8e7b3903ae3834308a8a3d04943da96bff58b39c112e42b73ab",
    "removals": [
      {
        "amount": 1000000,
        "parent_coin_info": "0xe752c4dadffe6edcb14e83646e6d4d53f7b3d8d74d2c20ed138aa35f8230ceb1",
        "puzzle_hash": "0x2a161b188eb77baa486653398d8bdc2194ff946f9a9b1d6f55f1ab0017623aa9"
      },
      {
        "amount": 39261665,
        "parent_coin_info": "0xeb17e80fcb72f15bfb28924f0bcd684df626646dca282bc88098cb0d59ffe1bb",
        "puzzle_hash": "0x057539dee39ab1deddb31f72602e4a280c27e84c53ab92122735a044916619bb"
      }
    ],
    "sent": 0,
    "sent_to": [],
    "spend_bundle": {
      "aggregated_signature": "0x961224367d0bb9f61c3cdc306266a00141dc10c895a0702a73a690799870657e365f05c629f99acf6ef5081c03e352af0b3d8701e208cbf4603d59b5cb8460f0036729d5c6938898a8f44114f62b75c6db371c8fc857fa8188502ecc4cdd81f2",
      "coin_spends": [
        {
          "coin": {
            "amount": 1000000,
            "parent_coin_info": "0xe752c4dadffe6edcb14e83646e6d4d53f7b3d8d74d2c20ed138aa35f8230ceb1",
            "puzzle_hash": "0x2a161b188eb77baa486653398d8bdc2194ff946f9a9b1d6f55f1ab0017623aa9"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ff5effff04ff02ffff04ffff04ff05ffff04ffff0bff34ff0580ffff04ff0bff80808080ffff04ffff02ff17ff2f80ffff04ff5fffff04ffff02ff2effff04ff02ffff04ff17ff80808080ffff04ffff02ff2affff04ff02ffff04ff82027fffff04ff82057fffff04ff820b7fff808080808080ffff04ff81bfffff04ff82017fffff04ff8202ffffff04ff8205ffffff04ff820bffff80808080808080808080808080ffff04ffff01ffffffff3d46ff02ff333cffff0401ff01ff81cb02ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff7cffff0bff34ff2480ffff0bff7cffff0bff7cffff0bff34ff2c80ff0980ffff0bff7cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ffff02ffff03ff0bffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff13ff80808080ff820b9f80ffff01ff02ff56ffff04ff02ffff04ffff02ff13ffff04ff5fffff04ff17ffff04ff2fffff04ff81bfffff04ff82017fffff04ff1bff8080808080808080ffff04ff82017fff8080808080ffff01ff088080ff0180ffff01ff02ffff03ff17ffff01ff02ffff03ffff20ff81bf80ffff0182017fffff01ff088080ff0180ffff01ff088080ff018080ff0180ff04ffff04ff05ff2780ffff04ffff10ff0bff5780ff778080ffffff02ffff03ff05ffff01ff02ffff03ffff09ffff02ffff03ffff09ff11ff5880ffff0159ff8080ff0180ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff0dffff04ff0bffff04ffff04ff81b9ff82017980ff808080808080ffff01ff02ff7affff04ff02ffff04ffff02ffff03ffff09ff11ff5880ffff01ff04ff58ffff04ffff02ff76ffff04ff02ffff04ff13ffff04ff29ffff04ffff0bff34ff5b80ffff04ff2bff80808080808080ff398080ffff01ff02ffff03ffff09ff11ff7880ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0121ffff0dff298080ffff01ff02ffff03ffff09ffff0cff29ff80ff3480ff5c80ffff01ff0101ff8080ff0180ff8080ff018080ffff0109ffff01ff088080ff0180ffff010980ff018080ff0180ffff04ffff02ffff03ffff09ff11ff5880ffff0159ff8080ff0180ffff04ffff02ff26ffff04ff02ffff04ff0dffff04ff0bffff04ff17ff808080808080ff80808080808080ff0180ffff01ff04ff80ffff04ff80ff17808080ff0180ffff02ffff03ff05ffff01ff04ff09ffff02ff56ffff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff0bff7cffff0bff34ff2880ffff0bff7cffff0bff7cffff0bff34ff2c80ff0580ffff0bff7cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ffff04ffff04ff30ffff04ff5fff808080ffff02ff7effff04ff02ffff04ffff04ffff04ff2fff0580ffff04ff5fff82017f8080ffff04ffff02ff26ffff04ff02ffff04ff0bffff04ff05ffff01ff808080808080ffff04ff17ffff04ff81bfffff04ff82017fffff04ffff02ff2affff04ff02ffff04ff8204ffffff04ffff02ff76ffff04ff02ffff04ff09ffff04ff820affffff04ffff0bff34ff2d80ffff04ff15ff80808080808080ffff04ff8216ffff808080808080ffff04ff8205ffffff04ff820bffff808080808080808080808080ff02ff5affff04ff02ffff04ff5fffff04ff3bffff04ffff02ffff03ff17ffff01ff09ff2dffff02ff2affff04ff02ffff04ff27ffff04ffff02ff76ffff04ff02ffff04ff29ffff04ff57ffff04ffff0bff34ff81b980ffff04ff59ff80808080808080ffff04ff81b7ff80808080808080ff8080ff0180ffff04ff17ffff04ff05ffff04ff8202ffffff04ffff04ffff04ff78ffff04ffff0eff5cffff02ff2effff04ff02ffff04ffff04ff2fffff04ff82017fff808080ff8080808080ff808080ffff04ffff04ff20ffff04ffff0bff81bfff5cffff02ff2effff04ff02ffff04ffff04ff15ffff04ffff10ff82017fffff11ff8202dfff2b80ff8202ff80ff808080ff8080808080ff808080ff138080ff80808080808080808080ff018080ffff04ffff01a037bef360ee858133b69d595a906dc45d01af50379dad515eb9518abb7c1d2a7affff04ffff01a00570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b08059810f9c69bc54f8aeebafdbb47faca702105ba15f59152a80168944a751a1042a7affb1a09fc5379c4334fcd2d3f0ff018080ff0180808080",
          "solution": "0xffff80ffff01ffff33ffa02ec33794739e953ff07ebbe93ee72056f5f08da3a9d31c216596a07eaaf1b5b4ff01ffffa02ec33794739e953ff07ebbe93ee72056f5f08da3a9d31c216596a07eaaf1b5b48080ffff33ffa0ee1d5710dcd99fd96ad38174bb4d0f87f04031abe15dc28d84415a251c67f1b9ff830f423f80ffff3cffa05e300a78dd793d53afb2a59039ea5f9661b9114b6ff006af9a5f9fdd088424948080ff8080ffffa094a128de0450c01d3d9e4b68516a2ec09fd219a3fe371d20ebbc47dd2f092faeffa0bae24162efbd568f89bc7a340798a6118df0189eb9e3f8697bcea27af99f8f79ff830f424080ffa060a8b06515aaefe74236eb234130d769a1b65c99706414901277926fe29c3360ffffa0e752c4dadffe6edcb14e83646e6d4d53f7b3d8d74d2c20ed138aa35f8230ceb1ffa02a161b188eb77baa486653398d8bdc2194ff946f9a9b1d6f55f1ab0017623aa9ff830f424080ffffa0e752c4dadffe6edcb14e83646e6d4d53f7b3d8d74d2c20ed138aa35f8230ceb1ffa0b361e26773b161ca94291a54353dfd7e257f18a8e9abbb49ee89718e8c8bfc0bff830f424080ff80ff8080"
        },
        {
          "coin": {
            "amount": 39261665,
            "parent_coin_info": "0xeb17e80fcb72f15bfb28924f0bcd684df626646dca282bc88098cb0d59ffe1bb",
            "puzzle_hash": "0x057539dee39ab1deddb31f72602e4a280c27e84c53ab92122735a044916619bb"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b08ed87f7cda15feadd676e2677f4bc162176c408910dcbf29d79cfe6d1aff1c2f1d2897ab4e29f90cb91f605dc575705aff018080",
          "solution": "0xff80ffff01ffff33ffa043a21683130c97ed272becd70e02d60f1b86a180fd759e28bf0d94f7eedd0fa5ff84025715e080ffff34ff0180ffff3cffa09840c31ad16cb371bdcaf0433554ff0e7a648e2517f530d004f2a08fa9e3ee6b80ffff3dffa0469663a0bb12424a04b8b0331c09a7887f23b50e64fd9cca4afac9d920d8246a8080ff8080"
        }
      ]
    },
    "to_address": "xch19mpn09rnn62nlur7h05naeeq2m6lprdr48f3cgt9j6s8a2h3kk6qdydujd",
    "to_puzzle_hash": "0x2ec33794739e953ff07ebbe93ee72056f5f08da3a9d31c216596a07eaaf1b5b4",
    "trade_id": null,
    "type": 1,
    "wallet_id": 7
  },
  "transaction_id": "0xb9df7b15f7a6b8e7b3903ae3834308a8a3d04943da96bff58b39c112e42b73ab"
}
```

</details>

---

### `check_offer_validity`

Functionality: Check if an offer is valid

Usage: chia rpc wallet [OPTIONS] check_offer_validity [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag  | Type | Required | Description                        |
| :---- | :--- | :------- | :--------------------------------- |
| offer | TEXT | True     | The contents of the offer to check |

<details>
<summary>Example</summary>

```json
chia rpc wallet check_offer_validity '{"offer": "offer1qqzh3wcuu2rykcmqvpsxygqqwc7hynr6hum6e0mnf72sn7uvvkpt68eyumkhelprk0adeg42nlelk2mpagr90qq0a37v8lc9pfxkwhdhlns4tnwtx933g0gsj06neuds6jjugly4k5x7we0x39h9ur65y2cmwttg00ht60xnjly6zhduf0h9hmedaq67yh89uafrzctmgrka06llmvv9uhze9tqqpd38v8zcv4x32hhe7wueh4t8vd9cn6uhqk7vejppfygfgtje8usle5c5ukqmlw72va4pv8mweg5ztmcakwex27z9uamchklr2mtk7ax4tadcte8hq98380vuxcnfkjxndkjxrdk68rdk69rdk68ga95mfr2xhump4wrstastammnc2aav3hrd4ej8gexus0gje2urasruamdvrwvas9wm56mykj42pj6cp0vlymr5daw8k9e780kxd46wsh9u4e4tk7dw49w2epylahdz44aq2kj4ypthrsme4qwdncgdnwhlcw2amlhhsl6z0wlca7573y7knevrjjz4kpg80gnrlmlx7q6lh2rdtll6j6kh72t66vmwn25gwh5eqsd6wpqc6yqkn9luteq6nz0hh7yln3r7ct9yqecrfh95lyzace38xayytnu7x2fl4whv40e6etxehv03mwzdlnfttaxckmea7xle3hs0tzvlmdlch7qjzul97gymhjsew40ef2vmf6m8m4ntw0x08ceu7xkxm0fxjut754n9qd2anljlwpk49z4472n65af226w03fha2j7hyshuuh8gdr68z3a67atjcnl07vswj0clutncre6wt4la0au8vdlmxjn7fe8mqald7l8rh2hgls66uxhutuzdqmnr0ljlkyulq5t67rru25jnxjjyxntvllt2n4j244utj7ahu6avas47nlhrah2p5uursd0uteccgjtncy6e62uvn6tathamz0m0rfweuaaq5mevp6klth99dhf0f6hcqksxfpqmvhlpvyrtj2qjmvnwyr96saajuyp8vm70h7vhtw93vkmj7llmquru84g0vv80fd3eg65vhfrlm5yrgzs4pa95el4wa6w9nfkgvvazzek9eef4kd6zr6rjue6culxd8wdg5dglrevft9lc7hfljuc70hx9uq587fl64gp3s467zj58nvdaawuet3lvft8hvynv5j83tlg5phaeteme079hw6xn5dn54tm602ln2vgknvammql8fe7zuqzvfq20gc9s4d4"}'
```

Response:

```json
{
  "success": true,
  "valid": true
}
```

</details>

---

### `create_offer_for_ids`

Functionality: Create a new offer

Usage: chia rpc wallet [OPTIONS] create_offer_for_ids [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag            | Type    | Required | Description                                                                                                                                                                              |
| :-------------- | :------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| offer           | TEXT    | True     | The offer to create                                                                                                                                                                      |
| validate_only   | BOOLEAN | False    | Only validate the offer instead of creating it [Default: false]                                                                                                                          |
| driver_dict     | DICT    | True     | A dictionary of keys and values associated with the offer                                                                                                                                |
| min_coin_amount | NUMBER  | False    | The minimum coin amount to select for the offer [Default: none]                                                                                                                          |
| max_coin_amount | NUMBER  | False    | The maximum coin amount to select for the offer [Default: none]                                                                                                                          |
| solver          | TEXT    | False    | A marshalled solver                                                                                                                                                                      |
| fee             | NUMBER  | False    | An optional blockchain fee, in mojos                                                                                                                                                     |
| reuse_puzhash   | BOOLEAN | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml |

---

### `get_all_offers`

Functionality: Show the details of all offers for this wallet

Usage: chia rpc wallet [OPTIONS] get_all_offers [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                 | Type    | Required | Description                                                                   |
| :------------------- | :------ | :------- | :---------------------------------------------------------------------------- |
| start                | NUMBER  | False    | The sequence number of the first offer to show [Default: 0]                   |
| end                  | NUMBER  | False    | The sequence number of the last offer to show [Default: 10]                   |
| exclude_my_offers    | BOOLEAN | False    | Set to `true` to exclude offers you originated [Default: false]               |
| exclude_taken_offers | BOOLEAN | False    | Set to `true` to exclude offers that have already been taken [Default: false] |
| include_completed    | BOOLEAN | False    | Set to `true` to include offers that have been taken [Default: false]         |
| sort_key             | NUMBER  | False    | Specify the key for sorting [Default: None]                                   |
| reverse              | BOOLEAN | False    | Set to `true` to sort the results in reverse order [Default: false]           |
| file_contents        | BOOLEAN | False    | Set to `true` to display the contents of each offer [Default: false]          |

<details>
<summary>Example</summary>

```json
chia rpc wallet get_all_offers
```

Response:

```json
{
  "offers": null,
  "success": true,
  "trade_records": [
    {
      "accepted_at_time": null,
      "coins_of_interest": [
        {
          "amount": 999999,
          "parent_coin_info": "0x60a8b06515aaefe74236eb234130d769a1b65c99706414901277926fe29c3360",
          "puzzle_hash": "0xad5de77c7da1316b9b72708d17dbb8937855d740ebaf85669b8bd925275e8d49"
        }
      ],
      "confirmed_at_index": 0,
      "created_at_time": 1669275137,
      "is_my_offer": true,
      "pending": {
        "0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4": 999999
      },
      "sent": 0,
      "sent_to": [],
      "status": "PENDING_ACCEPT",
      "summary": {
        "fees": 0,
        "infos": {
          "0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4": {
            "tail": "0x0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4",
            "type": "CAT"
          }
        },
        "offered": {
          "0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4": 1000
        },
        "requested": {
          "xch": 1000000000000
        }
      },
      "taken_offer": null,
      "trade_id": "0x84d14398c1a38f376953bf8fa76cbee0d3216b382266d38b5612f17e96bcd1de"
    }
  ]
}
```

</details>

---

### `get_cat_list`

Functionality: Return the default CAT list

Usage: chia rpc wallet [OPTIONS] get_cat_list [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

Get the default CAT list:

```json
chia rpc wallet get_cat_list
```

Response:

```json
{
  "cat_list": [
    {
      "asset_id": "a628c1c2c6fcb74d53746157e438e108eab5c0bb3e5c80ff9b1910b3e4832913",
      "name": "Spacebucks",
      "symbol": "SBX"
    },
    {
      "asset_id": "8ebf855de6eb146db5602f0456d2f0cbe750d57f821b6f91a8592ee9f1d4cf31",
      "name": "Marmot",
      "symbol": "MRMT"
    },
    {
      "asset_id": "6d95dae356e32a71db5ddcb42224754a02524c615c5fc35f568c2af04774e589",
      "name": "Stably USD",
      "symbol": "USDS"
    },
    {
      "asset_id": "509deafe3cd8bbfbb9ccce1d930e3d7b57b40c964fa33379b18d628175eb7a8f",
      "name": "Chia Holiday 2021 Token",
      "symbol": "CH21"
    }
  ],
  "success": true
}
```

</details>

---

### `get_offer`

Functionality: Show the details of one offer

Usage: chia rpc wallet [OPTIONS] get_offer [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag          | Type | Required | Description                                                                                           |
| :------------ | :--- | :------- | :---------------------------------------------------------------------------------------------------- |
| trade_id      | TEXT | True     | The offer's ID                                                                                        |
| file_contents | TEXT | False    | The contents of the offer. Required if the offer's info is not stored in the database for this wallet |

<details>
<summary>Example</summary>

```json
chia rpc wallet get_offer '{"trade_id": "c4d9f06599e4ba30edfabecc72a03db7d7e86c003ab83520002a844cfebf2ef5"}'
```

Response:

```json
{
  "offer": null,
  "success": true,
  "trade_record": {
    "accepted_at_time": null,
    "coins_of_interest": [
      {
        "amount": 998999,
        "parent_coin_info": "0xc40219a0d62cd481f2a47fdedc5ef1c936f3dea0d8a751794dba233c8aeac790",
        "puzzle_hash": "0x91362b7593aab3bcc4d3f5c0b3e9952b5eeccd0b22e06d1ce6242d6fce9b6526"
      },
      {
        "amount": 100000,
        "parent_coin_info": "0x5e0ec48322fff686044e02d159e2679fba716cab80f4fb10fdf42a775f85604a",
        "puzzle_hash": "0xa023dfcc927f2c5f71fb9f4cd81078d478448452c10acac9156e3b51bd7abe63"
      }
    ],
    "confirmed_at_index": 0,
    "created_at_time": 1669280986,
    "is_my_offer": true,
    "pending": {
      "0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4": 998999,
      "unknown": 100000
    },
    "sent": 0,
    "sent_to": [],
    "status": "PENDING_ACCEPT",
    "summary": {
      "fees": 1,
      "infos": {
        "0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4": {
          "tail": "0x0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4",
          "type": "CAT"
        }
      },
      "offered": {
        "0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4": 1000
      },
      "requested": {
        "xch": 10000
      }
    },
    "taken_offer": null,
    "trade_id": "0xc4d9f06599e4ba30edfabecc72a03db7d7e86c003ab83520002a844cfebf2ef5"
  }
}
```

</details>

---

### `get_offers_count`

Functionality: Obtain the number of offers from the current wallet

Usage: chia rpc wallet [OPTIONS] get_offers_count [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet get_offers_count
```

Response:

```json
{
  "my_offers_count": 0,
  "success": true,
  "taken_offers_count": 1,
  "total": 1
}
```

</details>

---

### `get_offer_summary`

Functionality: Show a summary of an offer

Usage: chia rpc wallet [OPTIONS] get_offer_summary [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag     | Type    | Required | Description                                                 |
| :------- | :------ | :------- | :---------------------------------------------------------- |
| offer    | TEXT    | True     | The offer for which to retrieve a summary                   |
| advanced | BOOLEAN | False    | Set to `true` to show a detailed summary [Default: `false`] |

<details>
<summary>Example</summary>

```json
chia rpc wallet get_offer_summary '{"offer": "offer1qqzh3wcuu2rykcmqvpsxygqqwc7hynr6hum6e0mnf72sn7uvvkpt68eyumkhelprk0adeg42nlelk2mpagr90qq0a37v8lc9pfxkwhdhlns4tnwtx933g0gsj06neuds6jjugly4k5x7we0x39h9ur65y2cmwttg00ht60xnjly6zhduf0h9hmedaq67yh89uafrzctmgrka06llmvv9uhze9tqqpd38v8zcv4x32hhe7wueh4t8vd9cn6uhqk7vejppfygfgtje8usle5c5ukqmlw72va4pv8mweg5ztmcakwex27z9uamchklr2mtk7ax4tadcte8hq98380vuxcnfkjxndkjxrdk68rdk69rdk68ga95mfr2xhump4wrstastammnc2aav3hrd4ej8gexus0gje2urasruamdvrwvas9wm56mykj42pj6cp0vlymr5daw8k9e780kxd46wsh9u4e4tk7dw49w2epylahdz44aq2kj4ypthrsme4qwdncgdnwhlcw2amlhhsl6z0wlca7573y7knevrjjz4kpg80gnrlmlx7q6lh2rdtll6j6kh72t66vmwn25gwh5eqsd6wpqc6yqkn9luteq6nz0hh7yln3r7ct9yqecrfh95lyzace38xayytnu7x2fl4whv40e6etxehv03mwzdlnfttaxckmea7xle3hs0tzvlmdlch7qjzul97gymhjsew40ef2vmf6m8m4ntw0x08ceu7xkxm0fxjut754n9qd2anljlwpk49z4472n65af226w03fha2j7hyshuuh8gdr68z3a67atjcnl07vswj0clutncre6wt4la0au8vdlmxjn7fe8mqald7l8rh2hgls66uxhutuzdqmnr0ljlkyulq5t67rru25jnxjjyxntvllt2n4j244utj7ahu6avas47nlhrah2p5uursd0uteccgjtncy6e62uvn6tathamz0m0rfweuaaq5mevp6klth99dhf0f6hcqksxfpqmvhlpvyrtj2qjmvnwyr96saajuyp8vm70h7vhtw93vkmj7llmquru84g0vv80fd3eg65vhfrlm5yrgzs4pa95el4wa6w9nfkgvvazzek9eef4kd6zr6rjue6culxd8wdg5dglrevft9lc7hfljuc70hx9uq587fl64gp3s467zj58nvdaawuet3lvft8hvynv5j83tlg5phaeteme079hw6xn5dn54tm602ln2vgknvammql8fe7zuqzvfq20gc9s4d4", "advanced": true}'
```

Response:

```json
{
  "success": true,
  "summary": {
    "fees": 0,
    "infos": {
      "0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4": {
        "tail": "0x0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4",
        "type": "CAT"
      }
    },
    "offered": {
      "0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4": 1000
    },
    "requested": {
      "xch": 1000000000000
    }
  }
}
```

</details>

---

### `get_stray_cats`

Functionality: Get a list of all unacknowledged CATs

Usage: chia rpc wallet [OPTIONS] get_stray_cats [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet get_stray_cats
```

Response:

```json
{
  "stray_cats": [],
  "success": true
}
```

</details>

---

### `take_offer`

Functionality: Take an offer

Usage: chia rpc wallet [OPTIONS] take_offer [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag            | Type    | Required | Description                                                                                                                                                                              |
| :-------------- | :------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| offer           | TEXT    | True     | The offer to create                                                                                                                                                                      |
| min_coin_amount | NUMBER  | False    | The minimum coin amount to select for taking the offer [Default: none]                                                                                                                   |
| max_coin_amount | NUMBER  | False    | The maximum coin amount to select for taking the offer [Default: none]                                                                                                                   |
| solver          | TEXT    | False    | A marshalled solver                                                                                                                                                                      |
| fee             | NUMBER  | False    | An optional blockchain fee, in mojos                                                                                                                                                     |
| reuse_puzhash   | BOOLEAN | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml |

<details>
<summary>Example</summary>

```json
chia rpc wallet take_offer '{"offer": "offer1qqzh3wcuu2rykcmqvpsxvgqqwc7hynr6hum6e0mnf72sn7uvvkpt68eyumkhelprk0adeg42nlelk2mpagr90qq0a37v8lc9pfxkwhdhlns4tnwtx933g0gsj06neuds6jjugly4k5x7we0x39h9ur65kfq0nl5ef86n4uv9hlnlhhqs4zu99cwjzf6fp675f8gne67qh42lhyhlxuemvtgqtwftqcjr4t524a70nhx9u2emrfwv7h9c94nxvsv2eqz2rujflx87vxp84jxh6hjnh0grq7mk29q6l78drkfjks408w79ahu6x6alhf420fw27fec0mufmmrp2y6d5sqmdksg6dksgcdk3gcdxn60gdx6gz347qcdtjuz7vxl7uu7zhtt50cmdwv32yfh9r7yx2hq7vylhvmrqmn8vrt7uxje4542svkkqtm8cxuar0tea3w0pmaend2n58e09wd2ahnr4ftjx2f8ldmg4d0gz4s4eq2acuz7vurnv7xrue4h7rkh7aaaa87snmh78038yf8447tqvks4dswpm6ycl7me8jxhu65m6al74k44lsj7hnxmy642z4exc8rxssgxx3qp5e0lzugx4hlada38auvlkqefpx2q6vm9c9nmlnjvfqfd3a9zaln6wf7y9hn4289cu9chjjha0wkmejcd56dmlaln80cakqe0jmln0uq58ek2uufhf9enazlz55e4nah0ntxhujdw03tmufvak7z09ckadt7gqj4t9laluraacee9z4ujekmy7e04w7h229nmtnnlul2ntkckge0rnvhvan4e42xtjzz07l7p7wsz8dlwll9mhv734uuj2t7hxlu0hesm6a7h29x7pfmjmrn0xgut0u0lstxcnr7j3vmjd8565g532cn2lwm5ad27vtzuh4dm8h0h29hk7460lcgx8txung0pl7pzxnyjpwhwjhrflj62flk7nkug7f7d8m04kurr09s2tmewvkd6u478yuqz6g75yramlqzsjvxxfxtaqdg5d0vnp5tmsumnlmx6ejudykahm7wm8uup3tn7rpa63d79x9992fhaud82s5dqwqgr5my703zjparwu8e2t6fedl2lvl0gvww3g73s9le8hqh3el00xma08qh3y6cku6vlu4jal0xh204xd07dymgtr0lfdnknmr8nhe0mhwalcj6pa4z2vux3qu3jc8mdhtmxl5uppk256uk6r794af5xfsuhxwp5a6sdcmwexlg5hhkgw3d66ycj42cc6l8lw3w4td8wu330lszmvzklqry5zxm8t34psew5z6g9k70lm0aaxkghx5afmhxqwtl7f9kycy9uhdhmdchlzesfphs89gmsz7c9nref02n4nau8h2hn7hdpg0sm4h0t9zrrnc6ajdev7s88a90lwpj6r2k782sz4kllpdn077hdvr7ua68g5e0e674h6e5008zvzavnra64c6v6p8nf33zkuulxsppk4ywx2wmdj0e66j82a8l5m4e5ajzw67dchhsuua9hafr3y4qcm2m0cthf8wf4ka2ts0m0hst0cjntnkfghphysfjm7egnych2mc3wly2827ln2ltqxv32wwkx7flukf7rg4tr25j38774tpq5lqc8l5tvv3mdjcl4llgyqrnekfxyz26de6"}'
```

Response:

```json
{
  "success": true,
  "trade_record": {
    "accepted_at_time": 1669280704,
    "coins_of_interest": [
      {
        "amount": 999999,
        "parent_coin_info": "0x60a8b06515aaefe74236eb234130d769a1b65c99706414901277926fe29c3360",
        "puzzle_hash": "0xad5de77c7da1316b9b72708d17dbb8937855d740ebaf85669b8bd925275e8d49"
      },
      {
        "amount": 39261664,
        "parent_coin_info": "0x12c33763d41055dd71a7a5676ced26bef08e059255c16e59f76033f98dcfedd4",
        "puzzle_hash": "0x43a21683130c97ed272becd70e02d60f1b86a180fd759e28bf0d94f7eedd0fa5"
      },
      {
        "amount": 597987,
        "parent_coin_info": "0x748a3eea780eabd2caa871783f3ce2ccecb1e3b50e5d4294371cb1075d6d7ab4",
        "puzzle_hash": "0xc98b1f2aabd519a6318fdeaed832136f14c4517c4e32ae6be403cdec07e3ae1a"
      }
    ],
    "confirmed_at_index": 0,
    "created_at_time": 1669280704,
    "is_my_offer": false,
    "pending": {
      "0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4": 999999,
      "unknown": 39261664
    },
    "sent": 0,
    "sent_to": [],
    "status": "PENDING_CONFIRM",
    "summary": {
      "fees": 1,
      "infos": {
        "0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4": {
          "tail": "0x0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4",
          "type": "CAT"
        }
      },
      "offered": {
        "0570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4": 1000
      },
      "requested": {
        "xch": 100000
      }
    },
    "taken_offer": "0x000000030000000000000000000000000000000000000000000000000000000000000000bae24162efbd568f89bc7a340798a6118df0189eb9e3f8697bcea27af99f8f790000000000000000ff02ffff01ff02ff0affff04ff02ffff04ff03ff80808080ffff04ffff01ffff333effff02ffff03ff05ffff01ff04ffff04ff0cffff04ffff02ff1effff04ff02ffff04ff09ff80808080ff808080ffff02ff16ffff04ff02ffff04ff19ffff04ffff02ff0affff04ff02ffff04ff0dff80808080ff808080808080ff8080ff0180ffff02ffff03ff05ffff01ff04ffff04ff08ff0980ffff02ff16ffff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffffa02082cd45b4fc0d256e6c360115c05c6ae761c31ad2616f24ad80cf1c9e15b3afffffa0a023dfcc927f2c5f71fb9f4cd81078d478448452c10acac9156e3b51bd7abe63ff830186a0ff8080808060a8b06515aaefe74236eb234130d769a1b65c99706414901277926fe29c3360ad5de77c7da1316b9b72708d17dbb8937855d740ebaf85669b8bd925275e8d4900000000000f423fff02ffff01ff02ffff01ff02ff5effff04ff02ffff04ffff04ff05ffff04ffff0bff34ff0580ffff04ff0bff80808080ffff04ffff02ff17ff2f80ffff04ff5fffff04ffff02ff2effff04ff02ffff04ff17ff80808080ffff04ffff02ff2affff04ff02ffff04ff82027fffff04ff82057fffff04ff820b7fff808080808080ffff04ff81bfffff04ff82017fffff04ff8202ffffff04ff8205ffffff04ff820bffff80808080808080808080808080ffff04ffff01ffffffff3d46ff02ff333cffff0401ff01ff81cb02ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff7cffff0bff34ff2480ffff0bff7cffff0bff7cffff0bff34ff2c80ff0980ffff0bff7cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ffff02ffff03ff0bffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff13ff80808080ff820b9f80ffff01ff02ff56ffff04ff02ffff04ffff02ff13ffff04ff5fffff04ff17ffff04ff2fffff04ff81bfffff04ff82017fffff04ff1bff8080808080808080ffff04ff82017fff8080808080ffff01ff088080ff0180ffff01ff02ffff03ff17ffff01ff02ffff03ffff20ff81bf80ffff0182017fffff01ff088080ff0180ffff01ff088080ff018080ff0180ff04ffff04ff05ff2780ffff04ffff10ff0bff5780ff778080ffffff02ffff03ff05ffff01ff02ffff03ffff09ffff02ffff03ffff09ff11ff5880ffff0159ff8080ff0180ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff0dffff04ff0bffff04ffff04ff81b9ff82017980ff808080808080ffff01ff02ff7affff04ff02ffff04ffff02ffff03ffff09ff11ff5880ffff01ff04ff58ffff04ffff02ff76ffff04ff02ffff04ff13ffff04ff29ffff04ffff0bff34ff5b80ffff04ff2bff80808080808080ff398080ffff01ff02ffff03ffff09ff11ff7880ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0121ffff0dff298080ffff01ff02ffff03ffff09ffff0cff29ff80ff3480ff5c80ffff01ff0101ff8080ff0180ff8080ff018080ffff0109ffff01ff088080ff0180ffff010980ff018080ff0180ffff04ffff02ffff03ffff09ff11ff5880ffff0159ff8080ff0180ffff04ffff02ff26ffff04ff02ffff04ff0dffff04ff0bffff04ff17ff808080808080ff80808080808080ff0180ffff01ff04ff80ffff04ff80ff17808080ff0180ffff02ffff03ff05ffff01ff04ff09ffff02ff56ffff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff0bff7cffff0bff34ff2880ffff0bff7cffff0bff7cffff0bff34ff2c80ff0580ffff0bff7cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ffff04ffff04ff30ffff04ff5fff808080ffff02ff7effff04ff02ffff04ffff04ffff04ff2fff0580ffff04ff5fff82017f8080ffff04ffff02ff26ffff04ff02ffff04ff0bffff04ff05ffff01ff808080808080ffff04ff17ffff04ff81bfffff04ff82017fffff04ffff02ff2affff04ff02ffff04ff8204ffffff04ffff02ff76ffff04ff02ffff04ff09ffff04ff820affffff04ffff0bff34ff2d80ffff04ff15ff80808080808080ffff04ff8216ffff808080808080ffff04ff8205ffffff04ff820bffff808080808080808080808080ff02ff5affff04ff02ffff04ff5fffff04ff3bffff04ffff02ffff03ff17ffff01ff09ff2dffff02ff2affff04ff02ffff04ff27ffff04ffff02ff76ffff04ff02ffff04ff29ffff04ff57ffff04ffff0bff34ff81b980ffff04ff59ff80808080808080ffff04ff81b7ff80808080808080ff8080ff0180ffff04ff17ffff04ff05ffff04ff8202ffffff04ffff04ffff04ff78ffff04ffff0eff5cffff02ff2effff04ff02ffff04ffff04ff2fffff04ff82017fff808080ff8080808080ff808080ffff04ffff04ff20ffff04ffff0bff81bfff5cffff02ff2effff04ff02ffff04ffff04ff15ffff04ffff10ff82017fffff11ff8202dfff2b80ff8202ff80ff808080ff8080808080ff808080ff138080ff80808080808080808080ff018080ffff04ffff01a037bef360ee858133b69d595a906dc45d01af50379dad515eb9518abb7c1d2a7affff04ffff01a00570076f3c2cd8d6e65f9b56f96ab92079d3ce7ab7372c751e1c19fdb42b25d4ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b3d6fcc37f8f49df90876f4c47bc586e1b23c179712a70c18d91e38f0c4932f92b377ff28abaa7e90599db342555d492ff018080ff0180808080ffff80ffff01ffff33ffa0bae24162efbd568f89bc7a340798a6118df0189eb9e3f8697bcea27af99f8f79ff8203e8ffffa0bae24162efbd568f89bc7a340798a6118df0189eb9e3f8697bcea27af99f8f798080ffff33ffa0b0d316e3e4c8c0b4e274d1fae4c7906ed7153988e8d023d77d473c983ab93dbfff830f3e5780ffff3cffa00069a9e7902da7002dea7625379739e68d34d649d1de176ab60dc9a5732f786980ffff3fffa0f79de674786e04b61cbfd722e5487e3aae4fb9d5acb6a159d4c4a6cdeb7c5ad38080ff8080ffffa0e752c4dadffe6edcb14e83646e6d4d53f7b3d8d74d2c20ed138aa35f8230ceb1ffa0b361e26773b161ca94291a54353dfd7e257f18a8e9abbb49ee89718e8c8bfc0bff830f424080ffa0c40219a0d62cd481f2a47fdedc5ef1c936f3dea0d8a751794dba233c8aeac790ffffa060a8b06515aaefe74236eb234130d769a1b65c99706414901277926fe29c3360ffa0ad5de77c7da1316b9b72708d17dbb8937855d740ebaf85669b8bd925275e8d49ff830f423f80ffffa060a8b06515aaefe74236eb234130d769a1b65c99706414901277926fe29c3360ffa0ee1d5710dcd99fd96ad38174bb4d0f87f04031abe15dc28d84415a251c67f1b9ff830f423f80ff80ff808012c33763d41055dd71a7a5676ced26bef08e059255c16e59f76033f98dcfedd443a21683130c97ed272becd70e02d60f1b86a180fd759e28bf0d94f7eedd0fa500000000025715e0ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b2d6feb2c0b079821e2bf172e9655494ccc3555ec11edb1dec5ba4ec1c8b3aae12127c3d59efe5ae7a5b2d93734f51daff018080ff80ffff01ffff33ffa06856b598c280ba526670dbe6ffdbb56109b2753e99e0e8fe18b16011ddbe9b21ff84025715df80ffff34ff0180ffff3cffa0a5268bc8edca89ebad640e3c2a8d7658c6497c6bd8382ec1f51ff0d4a1252eae80ffff3dffa09bfaeb403bee32c5b2fa892edaac2b8cc96714a89dea68cc528c960172469c9c8080ff8080a228e5069bf88826c5af92f7499c54b945d9a2ecc70e63e228d460260a8e90bbc96d7cda240bf3b1d653ea2aae22442819a0a6fb1d6091a57a0b74f25adbb3f505c01c249c3bdb60fa39e29528aa790207d55d114930e08f3833c53ca7e7abe4",
    "trade_id": "0xfa1633a15542a9093a17a7dd14c0eafd0151211eba7d10ba7315a9ed2943e632"
  }
}
```

</details>

---

## DID Wallet

### `Note`

See our [DID RPC](/did-rpc) page.

---

## NFT Wallet

### `Note2`

See our [NFT RPC](/nft-rpc) page.

---

## Pool Wallet

### `pw_absorb_rewards`

Functionality: Absorb unspent coinbase rewards to a pool wallet

Usage: chia rpc wallet [OPTIONS] pw_absorb_rewards [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag             | Type   | Required | Description                                                                                         |
| :--------------- | :----- | :------- | :-------------------------------------------------------------------------------------------------- |
| wallet_id        | NUMBER | True     | The Wallet ID to which to absorb funds (must be of type `POOLING_WALLET`)                           |
| max_spends_in_tx | NUMBER | False    | The maximum number of reward transactions to roll into the absorb transaction [Default: no maximum] |
| fee              | NUMBER | False    | An optional blockchain fee, in mojos                                                                |

:::note

This RPC will only succeed if the wallet has accumulated unspent coinbase rewards.

:::

---

### `pw_join_pool`

Functionality: Join a pool

Usage: chia rpc wallet [OPTIONS] pw_join_pool [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                 | Type   | Required | Description                                                                                    |
| :------------------- | :----- | :------- | :--------------------------------------------------------------------------------------------- |
| wallet_id            | NUMBER | True     | The Wallet ID to use to join the pool (must be of type `POOLING_WALLET`)                       |
| target_puzzlehash    | TEXT   | True     | This is the target of where rewards will be sent to from the singleton. Controlled by the pool |
| pool_url             | TEXT   | True     | The URL of the pool to join                                                                    |
| relative_lock_height | NUMBER | True     | The number of blocks required to wait when attempting to leave the pool                        |
| fee                  | NUMBER | False    | An optional blockchain fee, in mojos                                                           |

<details>
<summary>Example</summary>

Join Spacepool:

```json
chia rpc wallet pw_join_pool '{"wallet_id": 9, "target_puzzlehash": "0x2f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57", "pool_url": "https://na1.pool.space", "relative_lock_height": 64, "fee": 2}'
```

Response:

```json
{
  "fee_transaction": {
    "additions": [
      {
        "amount": 99996,
        "parent_coin_info": "0x484fdc99478247b0c7d9aa9eae4ebe8230d63de26a67ffc848740c9e114eef39",
        "puzzle_hash": "0x23dff88623d3716910c4804d13a96faf6cfa627039fd0da0f5395478298aa852"
      }
    ],
    "amount": 0,
    "confirmed": false,
    "confirmed_at_height": 0,
    "created_at_time": 1669337474,
    "fee_amount": 2,
    "memos": [],
    "name": "0xcd74b0a4c192f7ef6a91be20dfc92938c6f84628d9a1f5a231cdfb6e2076032f",
    "removals": [
      {
        "amount": 99998,
        "parent_coin_info": "0x0908243d25a95d27a254c46301ae954bf9aca2fe7a18673a3b29dc40401d2416",
        "puzzle_hash": "0x3b5cc27b4b7241c8111549e469b51a2bcd48a766705c372b15430580ab5207b6"
      }
    ],
    "sent": 0,
    "sent_to": [],
    "spend_bundle": {
      "aggregated_signature": "0x8f7bfcd2f8112f93216f7a802298abc4b9d8784ea9d07288259d9a28286b79cd82da6697c55bed1b64c55ee73daf92df0bab1f8a1bfccbc8171a654a3af80628f87e2af1060193195c5fdf17f659799752f07a9312f26dff429f7b93665d49a5",
      "coin_spends": [
        {
          "coin": {
            "amount": 99998,
            "parent_coin_info": "0x0908243d25a95d27a254c46301ae954bf9aca2fe7a18673a3b29dc40401d2416",
            "puzzle_hash": "0x3b5cc27b4b7241c8111549e469b51a2bcd48a766705c372b15430580ab5207b6"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0884b6aff2ffd2d6e8ad785a6ff12b3eb3155d9da01f15f35ba5872af7e44ba0bb6506f8303015024dc6acd3fa90b7d90ff018080",
          "solution": "0xff80ffff01ffff33ffa023dff88623d3716910c4804d13a96faf6cfa627039fd0da0f5395478298aa852ff8301869c80ffff34ff0280ffff3cffa02bc60f97e66f227e9efbc5b02caafdb3dd9ab8668df4cd8e2e511b329254fd468080ff8080"
        }
      ]
    },
    "to_puzzle_hash": "0xa15fa1f35f8dc2a5f62fc324a62974105ba1068e43f69e86aad6bfb5d7e80b9c",
    "trade_id": null,
    "type": 1,
    "wallet_id": 1
  },
  "success": true,
  "total_fee": 2,
  "transaction": {
    "additions": [
      {
        "amount": 1,
        "parent_coin_info": "0xa7c25e2640c6d009c8d7a02bd06eb103071b1572a23d24cccc5810bb01000160",
        "puzzle_hash": "0xa5b5a6d6a7f5ac3949f067d8ec1e8e41546756849c05c13f50bd186f877902b2"
      },
      {
        "amount": 99996,
        "parent_coin_info": "0x484fdc99478247b0c7d9aa9eae4ebe8230d63de26a67ffc848740c9e114eef39",
        "puzzle_hash": "0x23dff88623d3716910c4804d13a96faf6cfa627039fd0da0f5395478298aa852"
      }
    ],
    "amount": 1,
    "confirmed": false,
    "confirmed_at_height": 0,
    "created_at_time": 1669337474,
    "fee_amount": 2,
    "memos": [],
    "name": "0xe17ce5987f4b9d5861f6e6cb7fb5d3cf6e06ca4ac3b8ee4a3cb92250e4cf374e",
    "removals": [
      {
        "amount": 1,
        "parent_coin_info": "0x5b2c9538a5388a47fa213cc71ce59f0f9de35be79b1459443e90506291060a2d",
        "puzzle_hash": "0x8f068f4e5f3a53bfcd32771a1132e6fbcd8bb56b63844259b8ba7349cbb709c0"
      },
      {
        "amount": 99998,
        "parent_coin_info": "0x0908243d25a95d27a254c46301ae954bf9aca2fe7a18673a3b29dc40401d2416",
        "puzzle_hash": "0x3b5cc27b4b7241c8111549e469b51a2bcd48a766705c372b15430580ab5207b6"
      }
    ],
    "sent": 0,
    "sent_to": [],
    "spend_bundle": {
      "aggregated_signature": "0x9462560d18774a3e69a077cd340c85b7787428e12e6a74070a35b6eb8b4a3de4fb21cdf131502e58e50ca8f3bba780fe1068e0c950dbb1fbf845957e38d5d68fafd0fca547946c0d05f17d42eda00191e990f18965ae71d4b3f3b40c1f106a5f",
      "coin_spends": [
        {
          "coin": {
            "amount": 1,
            "parent_coin_info": "0x5b2c9538a5388a47fa213cc71ce59f0f9de35be79b1459443e90506291060a2d",
            "puzzle_hash": "0x8f068f4e5f3a53bfcd32771a1132e6fbcd8bb56b63844259b8ba7349cbb709c0"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fffff010180ffff01ff02ff36ffff04ff02ffff04ff05ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff0bff80808080ffff04ff2fffff04ff0bffff04ff5fff808080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4602ff3304ffff0101ff02ffff02ffff03ff05ffff01ff02ff5cffff04ff02ffff04ff0dffff04ffff0bff2cffff0bff24ff3880ffff0bff2cffff0bff2cffff0bff24ff3480ff0980ffff0bff2cff0bffff0bff24ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff0bffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ffff02ff2affff04ff02ffff04ffff02ffff03ffff09ff23ff2880ffff0181b3ff8080ff0180ff80808080ff80808080808080ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffffff0bffff0bff17ffff02ff3affff04ff02ffff04ff09ffff04ff2fffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ff5f80ff0bff81bf80ff02ffff03ffff20ffff22ff4fff178080ffff01ff02ff7effff04ff02ffff04ff6fffff04ffff04ffff02ffff03ff4fffff01ff04ff23ffff04ffff02ff3affff04ff02ffff04ff09ffff04ff53ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff81b3ff80808080ffff011380ff0180ffff02ff7cffff04ff02ffff04ff05ffff04ff1bffff04ffff21ff4fff1780ff80808080808080ff8080808080ffff01ff088080ff0180ffff04ffff09ffff18ff05ffff010180ffff010180ffff09ff05ffff01818f8080ff0bff2cffff0bff24ff3080ffff0bff2cffff0bff2cffff0bff24ff3480ff0580ffff0bff2cffff02ff5cffff04ff02ffff04ff07ffff04ffff0bff24ff2480ff8080808080ffff0bff24ff8080808080ffffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff26ffff04ff02ffff04ff09ff80808080ffff02ff26ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ff5effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff3affff04ff02ffff04ff09ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfff80808080808080808080ffff04ffff04ff20ffff04ff17ff808080ffff02ff7cffff04ff02ffff04ff05ffff04ffff02ff82017fffff04ffff04ffff04ff17ff2f80ffff04ffff04ff5fff81bf80ffff04ff0bff05808080ff8202ff8080ffff01ff80808080808080ffff02ff2effff04ff02ffff04ff05ffff04ff0bffff04ffff02ffff03ff3bffff01ff02ff22ffff04ff02ffff04ff05ffff04ff17ffff04ff13ffff04ff2bffff04ff5bffff04ff5fff808080808080808080ffff01ff02ffff03ffff09ff15ffff0bff13ff1dff2b8080ffff01ff0bff15ff17ff5f80ffff01ff088080ff018080ff0180ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfffff04ff82017fff8080808080808080808080ff02ffff03ff05ffff011bffff010b80ff0180ff018080ffff04ffff01ffa024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffa05b2c9538a5388a47fa213cc71ce59f0f9de35be79b1459443e90506291060a2da0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff82017fffff01ff04ffff04ff1cffff04ff5fff808080ffff04ffff04ff12ffff04ff8205ffffff04ff8206bfff80808080ffff04ffff04ff08ffff04ff17ffff04ffff02ff1effff04ff02ffff04ffff04ff8205ffffff04ff8202ffff808080ff80808080ff80808080ff80808080ffff01ff02ff16ffff04ff02ffff04ff05ffff04ff8204bfffff04ff8206bfffff04ff8202ffffff04ffff0bffff19ff2fffff18ffff019100ffffffffffffffffffffffffffffffffff8205ff8080ff0bff8202ff80ff808080808080808080ff0180ffff04ffff01ffff32ff3d52ffff333effff04ffff04ff12ffff04ff0bffff04ff17ff80808080ffff04ffff04ff12ffff04ff05ffff04ff2fff80808080ffff04ffff04ff1affff04ff5fff808080ffff04ffff04ff14ffff04ffff0bff5fffff012480ff808080ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a07b1ede8172c025d85040db053aa1b03115daf3099acb302cc92cd545202137f2ffff04ffff01a0d1a74bf2022d701bee11b17b30118ef16edd258493d16e710fbc984bffc17aa3ffff04ffff01b0a2c2a511421dcc4a88cb523f2c8784050687982c3b22deaee6b2ab0b409fe50660101079619d34f71214d00d650dd88fffff04ffff01a0ccd5bb71183532bff220ba46c268991a00000000000000000000000000000000ffff04ffff0180ff01808080808080ff01808080",
          "solution": "0xffffa00908243d25a95d27a254c46301ae954bf9aca2fe7a18673a3b29dc40401d2416ff0180ff01ffff01ffffff70c07101032f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57a2c2a511421dcc4a88cb523f2c8784050687982c3b22deaee6b2ab0b409fe50660101079619d34f71214d00d650dd88f010000001668747470733a2f2f6e61312e706f6f6c2e73706163650000004080ffa02454e247cbfe45034c006f1485b74b1bf6e0f87f1addb2c98b7c32fae67a04d78080"
        },
        {
          "coin": {
            "amount": 99998,
            "parent_coin_info": "0x0908243d25a95d27a254c46301ae954bf9aca2fe7a18673a3b29dc40401d2416",
            "puzzle_hash": "0x3b5cc27b4b7241c8111549e469b51a2bcd48a766705c372b15430580ab5207b6"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0884b6aff2ffd2d6e8ad785a6ff12b3eb3155d9da01f15f35ba5872af7e44ba0bb6506f8303015024dc6acd3fa90b7d90ff018080",
          "solution": "0xff80ffff01ffff33ffa023dff88623d3716910c4804d13a96faf6cfa627039fd0da0f5395478298aa852ff8301869c80ffff34ff0280ffff3cffa02bc60f97e66f227e9efbc5b02caafdb3dd9ab8668df4cd8e2e511b329254fd468080ff8080"
        }
      ]
    },
    "to_puzzle_hash": "0xa5b5a6d6a7f5ac3949f067d8ec1e8e41546756849c05c13f50bd186f877902b2",
    "trade_id": null,
    "type": 1,
    "wallet_id": 9
  }
}
```

</details>

---

### `pw_self_pool`

Functionality: Leave a pool and begin self-pooling

Usage: chia rpc wallet [OPTIONS] pw_self_pool [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type   | Required | Description                                                              |
| :-------- | :----- | :------- | :----------------------------------------------------------------------- |
| wallet_id | NUMBER | True     | The Wallet ID to use for self-pooling (must be of type `POOLING_WALLET`) |
| fee       | NUMBER | False    | An optional blockchain fee, in mojos                                     |

:::info

This command will only succeed if `wallet_id` is a member of a pool.

:::

<details>
<summary>Example</summary>

Leave Spacepool:

```json
chia rpc wallet pw_self_pool '{"wallet_id": 9, "fee": 1}'
```

Response:

```json
{
  "fee_transaction": {
    "additions": [
      {
        "amount": 99995,
        "parent_coin_info": "0xccf635afe3683362b3432f72ff603860c5fb0f24d0b94ae907360829fcff33a6",
        "puzzle_hash": "0xb68570fcf52604408589fc101993a6a05e54797974979a7c1e509a1718389ec8"
      }
    ],
    "amount": 0,
    "confirmed": false,
    "confirmed_at_height": 0,
    "created_at_time": 1669338087,
    "fee_amount": 1,
    "memos": [],
    "name": "0x6c965f910e3c882df8bf5b5d46eeca68293746297c9c28d481f464e0a82f633c",
    "removals": [
      {
        "amount": 99996,
        "parent_coin_info": "0x484fdc99478247b0c7d9aa9eae4ebe8230d63de26a67ffc848740c9e114eef39",
        "puzzle_hash": "0x23dff88623d3716910c4804d13a96faf6cfa627039fd0da0f5395478298aa852"
      }
    ],
    "sent": 0,
    "sent_to": [],
    "spend_bundle": {
      "aggregated_signature": "0xaab97ac7d11d363d322501fcd309b69a55413cc51ca4102f8c67cb9f6730c268dc4fd4be26a898fb607fd4087461670e052a62463a44fc52977bd084249d3ec9de7baf3d33f9397bd77451b7346a4b90fa2398ba89580e43724fb861a170d6bf",
      "coin_spends": [
        {
          "coin": {
            "amount": 99996,
            "parent_coin_info": "0x484fdc99478247b0c7d9aa9eae4ebe8230d63de26a67ffc848740c9e114eef39",
            "puzzle_hash": "0x23dff88623d3716910c4804d13a96faf6cfa627039fd0da0f5395478298aa852"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b9d002a400cf027b22d426b0a9e01e93eb463855d3ef8602a8d40089c2bbddd60b6016f5d4b4e7baf9f29c97fcd2273bff018080",
          "solution": "0xff80ffff01ffff33ffa0b68570fcf52604408589fc101993a6a05e54797974979a7c1e509a1718389ec8ff8301869b80ffff34ff0180ffff3cffa0829f63f1557ea7f1f14a7e0f454d1784f867bcb2e9180f27b28814807dc0d60a8080ff8080"
        }
      ]
    },
    "to_puzzle_hash": "0x8cb2ffb35791b7c031986d29d1347f5eb68bfacdd4b5f60f9d0e645423a67d84",
    "trade_id": null,
    "type": 1,
    "wallet_id": 1
  },
  "success": true,
  "total_fee": 2,
  "transaction": {
    "additions": [
      {
        "amount": 1,
        "parent_coin_info": "0xbf8423075ee03a9b9fdedf7049f3203303c2103e17e9140b03a368b29721b332",
        "puzzle_hash": "0x6f4c43aaec34916147a27cd6882f521b73f5b7a4aff7cc830d9177b28b321dea"
      },
      {
        "amount": 99995,
        "parent_coin_info": "0xccf635afe3683362b3432f72ff603860c5fb0f24d0b94ae907360829fcff33a6",
        "puzzle_hash": "0xb68570fcf52604408589fc101993a6a05e54797974979a7c1e509a1718389ec8"
      }
    ],
    "amount": 1,
    "confirmed": false,
    "confirmed_at_height": 0,
    "created_at_time": 1669338087,
    "fee_amount": 1,
    "memos": [],
    "name": "0x2637178575afc8f7c7e161f50b958642ce41a7633f4a2099e92df540a145555f",
    "removals": [
      {
        "amount": 1,
        "parent_coin_info": "0xa7c25e2640c6d009c8d7a02bd06eb103071b1572a23d24cccc5810bb01000160",
        "puzzle_hash": "0xa5b5a6d6a7f5ac3949f067d8ec1e8e41546756849c05c13f50bd186f877902b2"
      },
      {
        "amount": 99996,
        "parent_coin_info": "0x484fdc99478247b0c7d9aa9eae4ebe8230d63de26a67ffc848740c9e114eef39",
        "puzzle_hash": "0x23dff88623d3716910c4804d13a96faf6cfa627039fd0da0f5395478298aa852"
      }
    ],
    "sent": 0,
    "sent_to": [],
    "spend_bundle": {
      "aggregated_signature": "0x95dbe277a66d6e35428c85a65cae86c5706a3275162f0b8a8da8450008054a04fde66dff9d8210325bec6aeebf55e80c19f53aeea04d6b0fac3467ef39f5d99b3666730bc4c40ef746ad9c4fe18599701b6b971cb2d8d1c288afc7c289b71594",
      "coin_spends": [
        {
          "coin": {
            "amount": 1,
            "parent_coin_info": "0xa7c25e2640c6d009c8d7a02bd06eb103071b1572a23d24cccc5810bb01000160",
            "puzzle_hash": "0xa5b5a6d6a7f5ac3949f067d8ec1e8e41546756849c05c13f50bd186f877902b2"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fffff010180ffff01ff02ff36ffff04ff02ffff04ff05ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff0bff80808080ffff04ff2fffff04ff0bffff04ff5fff808080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4602ff3304ffff0101ff02ffff02ffff03ff05ffff01ff02ff5cffff04ff02ffff04ff0dffff04ffff0bff2cffff0bff24ff3880ffff0bff2cffff0bff2cffff0bff24ff3480ff0980ffff0bff2cff0bffff0bff24ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff0bffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ffff02ff2affff04ff02ffff04ffff02ffff03ffff09ff23ff2880ffff0181b3ff8080ff0180ff80808080ff80808080808080ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffffff0bffff0bff17ffff02ff3affff04ff02ffff04ff09ffff04ff2fffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ff5f80ff0bff81bf80ff02ffff03ffff20ffff22ff4fff178080ffff01ff02ff7effff04ff02ffff04ff6fffff04ffff04ffff02ffff03ff4fffff01ff04ff23ffff04ffff02ff3affff04ff02ffff04ff09ffff04ff53ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff81b3ff80808080ffff011380ff0180ffff02ff7cffff04ff02ffff04ff05ffff04ff1bffff04ffff21ff4fff1780ff80808080808080ff8080808080ffff01ff088080ff0180ffff04ffff09ffff18ff05ffff010180ffff010180ffff09ff05ffff01818f8080ff0bff2cffff0bff24ff3080ffff0bff2cffff0bff2cffff0bff24ff3480ff0580ffff0bff2cffff02ff5cffff04ff02ffff04ff07ffff04ffff0bff24ff2480ff8080808080ffff0bff24ff8080808080ffffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff26ffff04ff02ffff04ff09ff80808080ffff02ff26ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ff5effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff3affff04ff02ffff04ff09ffff04ff17ffff04ffff02ff26ffff04ff02ffff04ff05ff80808080ff808080808080ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfff80808080808080808080ffff04ffff04ff20ffff04ff17ff808080ffff02ff7cffff04ff02ffff04ff05ffff04ffff02ff82017fffff04ffff04ffff04ff17ff2f80ffff04ffff04ff5fff81bf80ffff04ff0bff05808080ff8202ff8080ffff01ff80808080808080ffff02ff2effff04ff02ffff04ff05ffff04ff0bffff04ffff02ffff03ff3bffff01ff02ff22ffff04ff02ffff04ff05ffff04ff17ffff04ff13ffff04ff2bffff04ff5bffff04ff5fff808080808080808080ffff01ff02ffff03ffff09ff15ffff0bff13ff1dff2b8080ffff01ff0bff15ff17ff5f80ffff01ff088080ff018080ff0180ffff04ff17ffff04ff2fffff04ff5fffff04ff81bfffff04ff82017fff8080808080808080808080ff02ffff03ff05ffff011bffff010b80ff0180ff018080ffff04ffff01ffa024e044101e57b3d8c908b8a38ad57848afd29d3eecc439dba45f4412df4954fdffa05b2c9538a5388a47fa213cc71ce59f0f9de35be79b1459443e90506291060a2da0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff8202ffffff01ff02ff16ffff04ff02ffff04ff05ffff04ff8204bfffff04ff8206bfffff04ff82017fffff04ffff0bffff19ff2fffff18ffff019100ffffffffffffffffffffffffffffffffff8202ff8080ff0bff82017f80ff8080808080808080ffff01ff04ffff04ff08ffff04ff17ffff04ffff02ff1effff04ff02ffff04ff82017fff80808080ff80808080ffff04ffff04ff1cffff04ff5fffff04ff8206bfff80808080ff80808080ff0180ffff04ffff01ffff32ff3d33ff3effff04ffff04ff1cffff04ff0bffff04ff17ff80808080ffff04ffff04ff1cffff04ff05ffff04ff2fff80808080ffff04ffff04ff0affff04ff5fff808080ffff04ffff04ff14ffff04ffff0bff5fffff012480ff808080ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a02f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57ffff04ffff01a0d1a74bf2022d701bee11b17b30118ef16edd258493d16e710fbc984bffc17aa3ffff04ffff01b0a2c2a511421dcc4a88cb523f2c8784050687982c3b22deaee6b2ab0b409fe50660101079619d34f71214d00d650dd88fffff04ffff01a0ccd5bb71183532bff220ba46c268991a00000000000000000000000000000000ffff04ffff01a0cf84b1a3d3164d6620179315fc7987545b73505743ad16b63160aa3065eacd36ff01808080808080ff01808080",
          "solution": "0xffffa05b2c9538a5388a47fa213cc71ce59f0f9de35be79b1459443e90506291060a2dffa06ee2686fe894bb776730e127a348bdd8dadb3aee6c63bfc17df25017c7046e48ff0180ff01ffffffff70c07101022f2c9ba1b2315d413a92b5f034fa03282ccba1767fd9ae7b14d942b969ed5d57a2c2a511421dcc4a88cb523f2c8784050687982c3b22deaee6b2ab0b409fe50660101079619d34f71214d00d650dd88f010000001668747470733a2f2f6e61312e706f6f6c2e73706163650000004080ff808080"
        },
        {
          "coin": {
            "amount": 99996,
            "parent_coin_info": "0x484fdc99478247b0c7d9aa9eae4ebe8230d63de26a67ffc848740c9e114eef39",
            "puzzle_hash": "0x23dff88623d3716910c4804d13a96faf6cfa627039fd0da0f5395478298aa852"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b9d002a400cf027b22d426b0a9e01e93eb463855d3ef8602a8d40089c2bbddd60b6016f5d4b4e7baf9f29c97fcd2273bff018080",
          "solution": "0xff80ffff01ffff33ffa0b68570fcf52604408589fc101993a6a05e54797974979a7c1e509a1718389ec8ff8301869b80ffff34ff0180ffff3cffa0829f63f1557ea7f1f14a7e0f454d1784f867bcb2e9180f27b28814807dc0d60a8080ff8080"
        }
      ]
    },
    "to_puzzle_hash": "0x6f4c43aaec34916147a27cd6882f521b73f5b7a4aff7cc830d9177b28b321dea",
    "trade_id": null,
    "type": 1,
    "wallet_id": 9
  }
}
```

</details>

---

### `pw_status`

Functionality: Obtain the status of a pooling wallet

Usage: chia rpc wallet [OPTIONS] pw_status [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag      | Type   | Required | Description                                                                     |
| :-------- | :----- | :------- | :------------------------------------------------------------------------------ |
| wallet_id | NUMBER | True     | The Wallet ID for which to obtain the status (must be of type `POOLING_WALLET`) |

<details>
<summary>Example</summary>

```json
chia rpc wallet pw_status '{"wallet_id": 9}'
```

Response:

```json
{
  "state": {
    "current": {
      "owner_pubkey": "0xa2c2a511421dcc4a88cb523f2c8784050687982c3b22deaee6b2ab0b409fe50660101079619d34f71214d00d650dd88f",
      "pool_url": "",
      "relative_lock_height": 0,
      "state": 1,
      "target_puzzle_hash": "0x7b1ede8172c025d85040db053aa1b03115daf3099acb302cc92cd545202137f2",
      "version": 1
    },
    "current_inner": "0xff02ffff01ff02ffff01ff02ffff03ff82017fffff01ff04ffff04ff1cffff04ff5fff808080ffff04ffff04ff12ffff04ff8205ffffff04ff8206bfff80808080ffff04ffff04ff08ffff04ff17ffff04ffff02ff1effff04ff02ffff04ffff04ff8205ffffff04ff8202ffff808080ff80808080ff80808080ff80808080ffff01ff02ff16ffff04ff02ffff04ff05ffff04ff8204bfffff04ff8206bfffff04ff8202ffffff04ffff0bffff19ff2fffff18ffff019100ffffffffffffffffffffffffffffffffff8205ff8080ff0bff8202ff80ff808080808080808080ff0180ffff04ffff01ffff32ff3d52ffff333effff04ffff04ff12ffff04ff0bffff04ff17ff80808080ffff04ffff04ff12ffff04ff05ffff04ff2fff80808080ffff04ffff04ff1affff04ff5fff808080ffff04ffff04ff14ffff04ffff0bff5fffff012480ff808080ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a07b1ede8172c025d85040db053aa1b03115daf3099acb302cc92cd545202137f2ffff04ffff01a0d1a74bf2022d701bee11b17b30118ef16edd258493d16e710fbc984bffc17aa3ffff04ffff01b0a2c2a511421dcc4a88cb523f2c8784050687982c3b22deaee6b2ab0b409fe50660101079619d34f71214d00d650dd88fffff04ffff01a0ccd5bb71183532bff220ba46c268991a00000000000000000000000000000000ffff04ffff0180ff01808080808080",
    "launcher_coin": {
      "amount": 1,
      "parent_coin_info": "0x0908243d25a95d27a254c46301ae954bf9aca2fe7a18673a3b29dc40401d2416",
      "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
    },
    "launcher_id": "0x5b2c9538a5388a47fa213cc71ce59f0f9de35be79b1459443e90506291060a2d",
    "p2_singleton_puzzle_hash": "0xd1a74bf2022d701bee11b17b30118ef16edd258493d16e710fbc984bffc17aa3",
    "singleton_block_height": 2871654,
    "target": null,
    "tip_singleton_coin_id": "0xa7c25e2640c6d009c8d7a02bd06eb103071b1572a23d24cccc5810bb01000160"
  },
  "success": true,
  "unconfirmed_transactions": []
}
```

</details>

---

## DL Wallet

### `create_new_dl`

Functionality: Create a new DataLayer wallet

Usage: chia rpc wallet [OPTIONS] create_new_dl [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag | Type   | Required | Description                             |
| :--- | :----- | :------- | :-------------------------------------- |
| root | TEXT   | True     | The root hash of an existing data store |
| fee  | NUMBER | False    | An optional blockchain fee, in mojos    |

:::info

For more info on creating a new data store and obtaining a root hash, see [the DataLayer RPC reference](/datalayer-rpc#create_data_store).

:::

<details>
<summary>Example</summary>

```json
chia rpc wallet create_new_dl '{"fee": 1, "root": "0x0000000000000000000000000000000000000000000000000000000000000000"}'
```

Response:

```json
{
  "launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e",
  "success": true,
  "transactions": [
    {
      "additions": [
        {
          "amount": 1,
          "parent_coin_info": "0xe9158d9c2f0769c00cb0cbccfa90536b99253aebf4a0dfecd5d8298ff4ec55fb",
          "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
        },
        {
          "amount": 99990,
          "parent_coin_info": "0xe9158d9c2f0769c00cb0cbccfa90536b99253aebf4a0dfecd5d8298ff4ec55fb",
          "puzzle_hash": "0x7be3f330dd5cbacdee14f124b51ad744d7504cf4426d92b67953a96c9760d869"
        },
        {
          "amount": 1,
          "parent_coin_info": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e",
          "puzzle_hash": "0xfddfe3a8ded6d3327204e1a4c8b3ac39725082b53556526f788250cf2b541c84"
        }
      ],
      "amount": 1,
      "confirmed": false,
      "confirmed_at_height": 0,
      "created_at_time": 1669340844,
      "fee_amount": 1,
      "memos": {},
      "name": "0x7854ba54c10bfa855a876ee2679b565b89afcd7fe44aac0da4a79c28e3381210",
      "removals": [
        {
          "amount": 99992,
          "parent_coin_info": "0x3089e0080a5b752a0db6fb21dd5fa351743e0266d40b2285c3711ef673b3fb3e",
          "puzzle_hash": "0xf9ff3866516f3c2c9861170472bca93763ddfa397796a102e5b2556365941228"
        },
        {
          "amount": 1,
          "parent_coin_info": "0xe9158d9c2f0769c00cb0cbccfa90536b99253aebf4a0dfecd5d8298ff4ec55fb",
          "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
        }
      ],
      "sent": 10,
      "sent_to": [],
      "spend_bundle": {
        "aggregated_signature": "0xa07b9e756758bfa6128919998bdd5762b6aefdaab1e137c6ffaad10256f281335a9eac6f6650d9eb1dc42ec5bb0f7136101ed8527ff672221b53dd4577464fff3d070a55096394ee6e685abf714f75a6ac8e1e03a84c8ca7ac3977812a5a0abd",
        "coin_spends": [
          {
            "coin": {
              "amount": 99992,
              "parent_coin_info": "0x3089e0080a5b752a0db6fb21dd5fa351743e0266d40b2285c3711ef673b3fb3e",
              "puzzle_hash": "0xf9ff3866516f3c2c9861170472bca93763ddfa397796a102e5b2556365941228"
            },
            "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b083cfd185d6b15c4f10d5b1e3310fcc8b2287b199ce1f7a47695a2ab19e3b867426c8e67ac027c8060a2a166b2b6ff2edff018080",
            "solution": "0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa07be3f330dd5cbacdee14f124b51ad744d7504cf4426d92b67953a96c9760d869ff8301869680ffff34ff0180ffff3cffa04d9226e507ebb3bdf2fb3c392d20f9ee82e9265d4cbf535e3d125bf594d48ed880ffff3dffa0cca4d8d32569567369d32e18cdef521dcc617fa71a0e9316e0dcfc44fa74f3c38080ff8080"
          },
          {
            "coin": {
              "amount": 1,
              "parent_coin_info": "0xe9158d9c2f0769c00cb0cbccfa90536b99253aebf4a0dfecd5d8298ff4ec55fb",
              "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
            },
            "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080",
            "solution": "0xffa0fddfe3a8ded6d3327204e1a4c8b3ac39725082b53556526f788250cf2b541c84ff01ffffa00000000000000000000000000000000000000000000000000000000000000000ffa0d4580b76e486b061812848a710bd7d4116b34e2c56fc4357cf8ff4ca63106a848080"
          }
        ]
      },
      "to_address": "xch1qgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqzc0j4g",
      "to_puzzle_hash": "0x0202020202020202020202020202020202020202020202020202020202020202",
      "trade_id": null,
      "type": 0,
      "wallet_id": 0
    },
    {
      "additions": [
        {
          "amount": 1,
          "parent_coin_info": "0xe9158d9c2f0769c00cb0cbccfa90536b99253aebf4a0dfecd5d8298ff4ec55fb",
          "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
        },
        {
          "amount": 99990,
          "parent_coin_info": "0xe9158d9c2f0769c00cb0cbccfa90536b99253aebf4a0dfecd5d8298ff4ec55fb",
          "puzzle_hash": "0x7be3f330dd5cbacdee14f124b51ad744d7504cf4426d92b67953a96c9760d869"
        }
      ],
      "amount": 1,
      "confirmed": false,
      "confirmed_at_height": 0,
      "created_at_time": 1669340844,
      "fee_amount": 1,
      "memos": {},
      "name": "0xf6eb22529bad0f8788dc71cc1e45b81a36893d3106b834daece64a86ac039f45",
      "removals": [
        {
          "amount": 99992,
          "parent_coin_info": "0x3089e0080a5b752a0db6fb21dd5fa351743e0266d40b2285c3711ef673b3fb3e",
          "puzzle_hash": "0xf9ff3866516f3c2c9861170472bca93763ddfa397796a102e5b2556365941228"
        }
      ],
      "sent": 0,
      "sent_to": [],
      "spend_bundle": null,
      "to_address": "xch1alc82gjf2psvqehkdue2es480caruum6e296afx35e82fnwp8k5s6vrrej",
      "to_puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
      "trade_id": null,
      "type": 1,
      "wallet_id": 1
    }
  ]
}
```

</details>

---

### `dl_delete_mirror`

Functionality: Remove an existing mirror for a specific singleton

Usage: chia rpc wallet [OPTIONS] dl_delete_mirror [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag    | Type   | Required | Description                           |
| :------ | :----- | :------- | :------------------------------------ |
| coin_id | TEXT   | True     | The `coin_id` of the mirror to delete |
| fee     | NUMBER | False    | An optional blockchain fee, in mojos  |

<details>
<summary>Example</summary>

```json
chia rpc wallet dl_delete_mirror '{"coin_id": "a6f36cf305c59db988ee0c1c39546ae9577ce75fd9cabe18cdacf94d8168077b", "fee": 1}'
```

Response:

```json
{
  "success": true,
  "transactions": [
    {
      "additions": [
        {
          "amount": 9,
          "parent_coin_info": "0xa6f36cf305c59db988ee0c1c39546ae9577ce75fd9cabe18cdacf94d8168077b",
          "puzzle_hash": "0x23e9be9739546282f50c10cbcd39c36c4f20452721e845c4d0775f61f587749e"
        }
      ],
      "amount": 10,
      "confirmed": false,
      "confirmed_at_height": 0,
      "created_at_time": 1669356270,
      "fee_amount": 1,
      "memos": {},
      "name": "0x92b71646dbcbc713ceb073618e8043d24defc514285aaffaae4037d14e4bd899",
      "removals": [
        {
          "amount": 10,
          "parent_coin_info": "0x33a7cfa39f9dd223833df0f1f35f2dc17d922b094395b1b9dfe7c0eae3150c1d",
          "puzzle_hash": "0x03c8adaf87e5af0e4087c9b5271feff4d17f33b68fba84bf1c0846f4e649abee"
        }
      ],
      "sent": 10,
      "sent_to": [],
      "spend_bundle": {
        "aggregated_signature": "0x876c9a74397d4fcec257662eea48d29c10c72dc53ca723313c7be2d447ce8b7b41a30e937827e9def691fe9fca442a1707139c802a47389dd9287b0ab8d60d91917d0f309fcb8661f13239554492a9262ab7b7bafdb6ee8d01f01258010d4547",
        "coin_spends": [
          {
            "coin": {
              "amount": 10,
              "parent_coin_info": "0x33a7cfa39f9dd223833df0f1f35f2dc17d922b094395b1b9dfe7c0eae3150c1d",
              "puzzle_hash": "0x03c8adaf87e5af0e4087c9b5271feff4d17f33b68fba84bf1c0846f4e649abee"
            },
            "puzzle_reveal": "0xff02ffff01ff02ffff01ff04ffff04ff08ffff04ffff02ff0affff04ff02ffff04ff0bffff04ffff02ff05ffff02ff0effff04ff02ffff04ff17ff8080808080ffff04ff2fff808080808080ff808080ffff02ff17ff5f8080ffff04ffff01ffff4720ffff02ffff03ffff22ffff09ffff0dff0580ff0c80ffff09ffff0dff0b80ff0c80ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff0101ff018080",
            "solution": "0xffa05bf3b9607bfa60958b6d2a7f3c6a28f3dcc7f9081a0dd95d361cff3ca970658dffff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b326638c42fcc6ebb926ecf1bbd1ea7e12adfdf338a3b2ee5f45711076d27abf3583f8b33d6cad56c8008b95c129d38dff018080ff83018695ffff80ffff01ffff33ffa023e9be9739546282f50c10cbcd39c36c4f20452721e845c4d0775f61f587749eff098080ff808080"
          }
        ]
      },
      "to_address": "xch1y05ma9ee233g9agvzr9u6wwrd38jq3f8y85yt3xswa0krav8wj0qlf7xxw",
      "to_puzzle_hash": "0x23e9be9739546282f50c10cbcd39c36c4f20452721e845c4d0775f61f587749e",
      "trade_id": null,
      "type": 1,
      "wallet_id": 8
    }
  ]
}
```

</details>

---

### `dl_get_mirrors`

Functionality: Get all of the mirrors for a specific singleton

Usage: chia rpc wallet [OPTIONS] dl_get_mirrors [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type | Required | Description                             |
| :---------- | :--- | :------- | :-------------------------------------- |
| launcher_id | TEXT | True     | The launcher ID of the DataLayer wallet |

<details>
<summary>Example</summary>

```json
chia rpc wallet dl_get_mirrors '{"launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e"}'
```

Response:

```json
{
  "mirrors": [
    {
      "amount": 10,
      "coin_id": "a6f36cf305c59db988ee0c1c39546ae9577ce75fd9cabe18cdacf94d8168077b",
      "launcher_id": "4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e",
      "ours": true,
      "urls": ["http://www.example.com:8575", "http://www.example2.com:8575"]
    }
  ],
  "success": true
}
```

</details>

---

### `dl_history`

Functionality: Show the history of a data store

Usage: chia rpc wallet [OPTIONS] dl_history [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag           | Type   | Required | Description                                                  |
| :------------- | :----- | :------- | :----------------------------------------------------------- |
| launcher_id    | TEXT   | True     | The launcher ID of the DataLayer wallet                      |
| min_generation | NUMBER | False    | The first generation of singleton to show [Default: none]    |
| max_generation | NUMBER | False    | The last generation of the singleton to show [Default: none] |
| num_results    | NUMBER | False    | The number of results to show [Default: show all results]    |

<details>
<summary>Example</summary>

```json
chia rpc wallet dl_history '{"launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e"}'
```

Response:

```json
{
  "count": 2,
  "history": [
    {
      "coin_id": "0x70e75ede3b9ba91ab4b91bc5efea8946fde60518becdce40e2cf6800ff173245",
      "confirmed": true,
      "confirmed_at_height": 2872567,
      "generation": 1,
      "inner_puzzle_hash": "0x607b04952b317c81eb21ba96ff5f62adb58621f89d5fe6240f6e83d4395998c5",
      "launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e",
      "lineage_proof": {
        "amount": 1,
        "inner_puzzle_hash": "0x60f66f9824d5f96d4025b70b4f7ac3def458cae742fbd2d70343eeeaa5a59c58",
        "parent_name": "0xc2347b264b412bde5893f4e1369adab3a6c61496845c10f8ec98bc35f9e1429f"
      },
      "root": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 1669352585
    },
    {
      "coin_id": "0xc2347b264b412bde5893f4e1369adab3a6c61496845c10f8ec98bc35f9e1429f",
      "confirmed": true,
      "confirmed_at_height": 2871924,
      "generation": 0,
      "inner_puzzle_hash": "0xd4580b76e486b061812848a710bd7d4116b34e2c56fc4357cf8ff4ca63106a84",
      "launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e",
      "lineage_proof": {
        "amount": 1,
        "inner_puzzle_hash": "0x481d9aabeccd0ab87526a980f6b3389465b6b21cb9255e30175b52114791cd91",
        "parent_name": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e"
      },
      "root": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 1669340887
    }
  ],
  "success": true
}
```

</details>

---

### `dl_latest_singleton`

Functionality: Get the singleton record for the latest singleton of a launcher ID

Usage: chia rpc wallet [OPTIONS] dl_latest_singleton [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag           | Type    | Required | Description                                            |
| :------------- | :------ | :------- | :----------------------------------------------------- |
| launcher_id    | TEXT    | True     | The launcher ID of the DataLayer wallet                |
| only_confirmed | BOOLEAN | False    | Only show the latest confirmed record [Default: false] |

<details>
<summary>Example</summary>

```json
chia rpc wallet dl_latest_singleton '{"launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e"}'
```

Response:

```json
{
  "singleton": {
    "coin_id": "0xc2347b264b412bde5893f4e1369adab3a6c61496845c10f8ec98bc35f9e1429f",
    "confirmed": true,
    "confirmed_at_height": 2871924,
    "generation": 0,
    "inner_puzzle_hash": "0xd4580b76e486b061812848a710bd7d4116b34e2c56fc4357cf8ff4ca63106a84",
    "launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e",
    "lineage_proof": {
      "amount": 1,
      "inner_puzzle_hash": "0x481d9aabeccd0ab87526a980f6b3389465b6b21cb9255e30175b52114791cd91",
      "parent_name": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e"
    },
    "root": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "timestamp": 1669340887
  },
  "success": true
}
```

</details>

---

### `dl_new_mirror`

Functionality: Add a new on chain message for a specific singleton

Usage: chia rpc wallet [OPTIONS] dl_new_mirror [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type       | Required | Description                                                                                                                     |
| :---------- | :--------- | :------- | :------------------------------------------------------------------------------------------------------------------------------ |
| launcher_id | TEXT       | True     | The launcher ID of the DataLayer wallet                                                                                         |
| urls        | TEXT ARRAY | True     | A list of URLs to be used for the mirror                                                                                        |
| amount      | NUMBER     | True     | The value of the mirror (in mojos) to spend to create the mirror. In theory, mirrors with a higher `amount` will be prioritized |
| fee         | NUMBER     | False    | An optional blockchain fee, in mojos                                                                                            |

<details>
<summary>Example</summary>

```json
chia rpc wallet dl_new_mirror '{"launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e", "urls":["http://www.example.com:8575", "http://www.example2.com:8575"], "amount":10, "fee": 1}'
```

Response:

```json
{
  "success": true,
  "transactions": [
    {
      "additions": [
        {
          "amount": 10,
          "parent_coin_info": "0x33a7cfa39f9dd223833df0f1f35f2dc17d922b094395b1b9dfe7c0eae3150c1d",
          "puzzle_hash": "0x03c8adaf87e5af0e4087c9b5271feff4d17f33b68fba84bf1c0846f4e649abee"
        },
        {
          "amount": 99978,
          "parent_coin_info": "0x33a7cfa39f9dd223833df0f1f35f2dc17d922b094395b1b9dfe7c0eae3150c1d",
          "puzzle_hash": "0xecc03bb1f7d2c27f56baa9829630980a2cb2d0db426b09b677b3e5efdf7ce7c2"
        }
      ],
      "amount": 10,
      "confirmed": false,
      "confirmed_at_height": 0,
      "created_at_time": 1669355484,
      "fee_amount": 1,
      "memos": {
        "a6f36cf305c59db988ee0c1c39546ae9577ce75fd9cabe18cdacf94d8168077b": "687474703a2f2f7777772e6578616d706c65322e636f6d3a38353735"
      },
      "name": "0x7f4560f9c058ac0801cf95003f0fc18d3ddb07e2b9d8ce1e4d947494b4b084cd",
      "removals": [
        {
          "amount": 99989,
          "parent_coin_info": "0x5bf3b9607bfa60958b6d2a7f3c6a28f3dcc7f9081a0dd95d361cff3ca970658d",
          "puzzle_hash": "0xf7bf0a56b4883b42f5999fd7237300b33a541f8b92be02868483d073506098e0"
        }
      ],
      "sent": 0,
      "sent_to": [],
      "spend_bundle": {
        "aggregated_signature": "0x98cf9cae8b45172d9aeec0aeeffe52fb78530f62f056e140f172e1893d25e2c38e6e2584b912e6b6f7c60a53ccfe21f2034008730a53655beab4d7379f198a43bb337ed332e2a60f1f3dedda459145c2c56f59bf6aa73d993e4cc578706d2f3b",
        "coin_spends": [
          {
            "coin": {
              "amount": 99989,
              "parent_coin_info": "0x5bf3b9607bfa60958b6d2a7f3c6a28f3dcc7f9081a0dd95d361cff3ca970658d",
              "puzzle_hash": "0xf7bf0a56b4883b42f5999fd7237300b33a541f8b92be02868483d073506098e0"
            },
            "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b326638c42fcc6ebb926ecf1bbd1ea7e12adfdf338a3b2ee5f45711076d27abf3583f8b33d6cad56c8008b95c129d38dff018080",
            "solution": "0xff80ffff01ffff33ffa003c8adaf87e5af0e4087c9b5271feff4d17f33b68fba84bf1c0846f4e649abeeff0affffa04aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09eff9b687474703a2f2f7777772e6578616d706c652e636f6d3a38353735ff9c687474703a2f2f7777772e6578616d706c65322e636f6d3a383537358080ffff33ffa0ecc03bb1f7d2c27f56baa9829630980a2cb2d0db426b09b677b3e5efdf7ce7c2ff8301868a80ffff34ff0180ffff3cffa0cd6be8c3889bc01d161e53c75cf56934c38499725c22cf54f8646bafea0d82648080ff8080"
          }
        ]
      },
      "to_address": "xch1q0y2mtu8ukhsusy8ex6jw8l07ngh7vak37agf0cuppr0fejf40hq5u7ds7",
      "to_puzzle_hash": "0x03c8adaf87e5af0e4087c9b5271feff4d17f33b68fba84bf1c0846f4e649abee",
      "trade_id": null,
      "type": 1,
      "wallet_id": 1
    }
  ]
}
```

</details>

---

### `dl_owned_singletons`

Functionality: Get all owned singleton records

Usage: chia rpc wallet [OPTIONS] dl_owned_singletons [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet dl_owned_singletons
```

Response:

```json
{
  "count": 2,
  "singletons": [
    {
      "coin_id": "0x70e75ede3b9ba91ab4b91bc5efea8946fde60518becdce40e2cf6800ff173245",
      "confirmed": true,
      "confirmed_at_height": 2872567,
      "generation": 1,
      "inner_puzzle_hash": "0x607b04952b317c81eb21ba96ff5f62adb58621f89d5fe6240f6e83d4395998c5",
      "launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e",
      "lineage_proof": {
        "amount": 1,
        "inner_puzzle_hash": "0x60f66f9824d5f96d4025b70b4f7ac3def458cae742fbd2d70343eeeaa5a59c58",
        "parent_name": "0xc2347b264b412bde5893f4e1369adab3a6c61496845c10f8ec98bc35f9e1429f"
      },
      "root": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 1669352585
    },
    {
      "coin_id": "0xf9b3b8302919b4adb12a8d3914ed512cbbfed8bfadcf6e6b0e888c9533db5fab",
      "confirmed": true,
      "confirmed_at_height": 2871913,
      "generation": 0,
      "inner_puzzle_hash": "0x5dd62b0a1883fe7565cc243c830940b541ed219c8a373f50f3cd00e003663fa9",
      "launcher_id": "0xba934d7f4ad47c34cb1a99d3c57adacb1883cff5528cca67c34f724f3560e401",
      "lineage_proof": {
        "amount": 1,
        "inner_puzzle_hash": "0xd9d049c23a9eea8ddfcc47971479574b5f3c7da9bb7d34f24365a82c944e270e",
        "parent_name": "0xba934d7f4ad47c34cb1a99d3c57adacb1883cff5528cca67c34f724f3560e401"
      },
      "root": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 1669340703
    }
  ],
  "success": true
}
```

</details>

---

### `dl_singletons_by_root`

Functionality: Get the singleton records that contain the specified root

Usage: chia rpc wallet [OPTIONS] dl_singletons_by_root [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type | Required | Description                             |
| :---------- | :--- | :------- | :-------------------------------------- |
| launcher_id | TEXT | True     | The launcher ID of the DataLayer wallet |
| root        | TEXT | True     | The root hash of an existing data store |

<details>
<summary>Example</summary>

```json
chia rpc wallet dl_singletons_by_root '{"launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e", "root": "0x0000000000000000000000000000000000000000000000000000000000000000"}'
```

Response:

```json
{
  "singletons": [
    {
      "coin_id": "0xc2347b264b412bde5893f4e1369adab3a6c61496845c10f8ec98bc35f9e1429f",
      "confirmed": true,
      "confirmed_at_height": 2871924,
      "generation": 0,
      "inner_puzzle_hash": "0xd4580b76e486b061812848a710bd7d4116b34e2c56fc4357cf8ff4ca63106a84",
      "launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e",
      "lineage_proof": {
        "amount": 1,
        "inner_puzzle_hash": "0x481d9aabeccd0ab87526a980f6b3389465b6b21cb9255e30175b52114791cd91",
        "parent_name": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e"
      },
      "root": "0x0000000000000000000000000000000000000000000000000000000000000000",
      "timestamp": 1669340887
    }
  ],
  "success": true
}
```

</details>

---

### `dl_stop_tracking`

Functionality: Stop tracking a DataStore

Usage: chia rpc wallet [OPTIONS] dl_stop_tracking [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type | Required | Description                             |
| :---------- | :--- | :------- | :-------------------------------------- |
| launcher_id | TEXT | True     | The launcher ID of the DataLayer wallet |

<details>
<summary>Example</summary>

```json
chia rpc wallet dl_stop_tracking '{"launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e"}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `dl_track_new`

Functionality: Begin tracking a DataStore

Usage: chia rpc wallet [OPTIONS] dl_track_new [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type | Required | Description                             |
| :---------- | :--- | :------- | :-------------------------------------- |
| launcher_id | TEXT | True     | The launcher ID of the DataLayer wallet |

<details>
<summary>Example</summary>

```json
 chia rpc wallet dl_track_new '{"launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e"}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `dl_update_multiple`

Functionality: Update multiple singletons with new merkle roots

Usage: chia rpc wallet [OPTIONS] dl_update_multiple [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag    | Type       | Required | Description                                 |
| :------ | :--------- | :------- | :------------------------------------------ |
| updates | TEXT ARRAY | True     | A list of launcher IDs and hashes to update |

---

### `dl_update_root`

Functionality: Update the root of a data store to the given new root

Usage: chia rpc wallet [OPTIONS] dl_update_root [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag        | Type   | Required | Description                             |
| :---------- | :----- | :------- | :-------------------------------------- |
| launcher_id | TEXT   | True     | The launcher ID of the DataLayer wallet |
| new_root    | TEXT   | True     | The new root hash of the data store     |
| fee         | NUMBER | False    | An optional blockchain fee, in mojos    |

<details>
<summary>Example</summary>

```json
chia rpc wallet dl_update_root '{"launcher_id": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e", "new_root": "0x0000000000000000000000000000000000000000000000000000000000000000", "fee": 1}'
```

Response:

```json
{
  "success": true,
  "tx_record": {
    "additions": [
      {
        "amount": 1,
        "parent_coin_info": "0xc2347b264b412bde5893f4e1369adab3a6c61496845c10f8ec98bc35f9e1429f",
        "puzzle_hash": "0xb4aaf8fffd0fe7cc74fd9c7a5dd519a58775d42b924cab183e8e8a6a48144362"
      }
    ],
    "amount": 1,
    "confirmed": false,
    "confirmed_at_height": 0,
    "created_at_time": 1669352476,
    "fee_amount": 1,
    "memos": {
      "70e75ede3b9ba91ab4b91bc5efea8946fde60518becdce40e2cf6800ff173245": "607b04952b317c81eb21ba96ff5f62adb58621f89d5fe6240f6e83d4395998c5"
    },
    "name": "0xc2347b264b412bde5893f4e1369adab3a6c61496845c10f8ec98bc35f9e1429f",
    "removals": [
      {
        "amount": 1,
        "parent_coin_info": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e",
        "puzzle_hash": "0xfddfe3a8ded6d3327204e1a4c8b3ac39725082b53556526f788250cf2b541c84"
      }
    ],
    "sent": 10,
    "sent_to": [],
    "spend_bundle": {
      "aggregated_signature": "0x990dd3c598b16e245e44e3bed148fa3fb5e5f65bd6b05ed560021c0d46efdbdef18d70346ffe8b3401984b017045ed97169f77a041c8e995b507e00f0496e057630d8d609d7e69857b3122ae440cb2f67ad5d3f5ab8fe84448be414d1107f657",
      "coin_spends": [
        {
          "coin": {
            "amount": 1,
            "parent_coin_info": "0x4aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09e",
            "puzzle_hash": "0xfddfe3a8ded6d3327204e1a4c8b3ac39725082b53556526f788250cf2b541c84"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09ea0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffa0000000000000000000000000000000000000000000000000000000000000000080ffff04ffff01a057bfd1cb0adda3d94315053fda723f2028320faa8338225d99f629e3d46d43a9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a889344c9bc729cadd340f41d5937a95442767133fd6ca7b5ec865df553b15cc43a0930bdd0a55ffc03edad3dfb62cbdff018080ff018080808080ff01808080",
          "solution": "0xffffa0e9158d9c2f0769c00cb0cbccfa90536b99253aebf4a0dfecd5d8298ff4ec55fbff0180ff01ffffff80ffff01ffff33ffa0607b04952b317c81eb21ba96ff5f62adb58621f89d5fe6240f6e83d4395998c5ff01ffffa04aecd65d5fd0dcac59ef41ad5a74134e38b3e8334aebb1356972b7e9c793a09effa00000000000000000000000000000000000000000000000000000000000000000ffa0607b04952b317c81eb21ba96ff5f62adb58621f89d5fe6240f6e83d4395998c58080ffff3cff248080ff80808080"
        },
        {
          "coin": {
            "amount": 99990,
            "parent_coin_info": "0xe9158d9c2f0769c00cb0cbccfa90536b99253aebf4a0dfecd5d8298ff4ec55fb",
            "puzzle_hash": "0x7be3f330dd5cbacdee14f124b51ad744d7504cf4426d92b67953a96c9760d869"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b091f7f25662e59ab551649924abca7b3cb95393038c0161d6a34a3de4ffd2a43788c7b3a08221f430b55eaa417386700eff018080",
          "solution": "0xff80ffff01ffff33ffa0f7bf0a56b4883b42f5999fd7237300b33a541f8b92be02868483d073506098e0ff8301869580ffff34ff0180ffff3cffa058a074f99002b5471ceef509c59729ab7dcdffbc3d387597bc67bfec6f81423480ffff3dffa01cabec2e124d3c7c4cca9bd5d25a98e0bdab66690db30185e0b6fe8f74a0f6838080ff8080"
        }
      ]
    },
    "to_address": "xch1vpasf9ftx97gr6eph2t07hmz4k6cvg0cn407vfq0d6pagw2enrzsey2rsa",
    "to_puzzle_hash": "0x607b04952b317c81eb21ba96ff5f62adb58621f89d5fe6240f6e83d4395998c5",
    "trade_id": null,
    "type": 1,
    "wallet_id": 8
  }
}
```

</details>

---

## Routes and connections

### `close_connection`

Functionality: Close an active connection

Note: Inherited from RPC Server

Request Parameters:

| Flag    | Type | Required | Description                                                      |
| :------ | :--- | :------- | :--------------------------------------------------------------- |
| node_id | TEXT | True     | The hex ID of the node to close, obtainable from get_connections |

<details>
<summary>Example</summary>

```json
chia rpc wallet close_connection '{"node_id":"0x8e961b617579d476419003728d6d71ab1b182f7d962e5db16f61ebfb157d771b"}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `get_connections`

Functionality: Get a list of active connections

Note: Inherited from RPC Server

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet get_connections
```

Response:

```json
{
  "connections": [
    {
      "bytes_read": 49581235,
      "bytes_written": 717978,
      "creation_time": 1669283764.8537369,
      "last_message_time": 1669358138.7421055,
      "local_port": 8449,
      "node_id": "0xcda6b919f90af6f021ccf6ca748a30d03b22622863654b57bd74896dd60c4eca",
      "peer_host": "127.0.0.1",
      "peer_port": 8444,
      "peer_server_port": 8444,
      "type": 1
    }
  ],
  "success": true
}
```

</details>

---

### `get_routes`

Functionality: List all available RPC routes

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet get_routes
```

Response:

```json
{
    "routes": [
        "/log_in",
        "/get_logged_in_fingerprint",
        "/get_public_keys",
        "/get_private_key",
        "/generate_mnemonic",
        "/add_key",
        "/delete_key",
        "/check_delete_key",
        "/delete_all_keys",
        "/set_wallet_resync_on_startup",
        "/get_sync_status",
        "/get_height_info",
        "/push_tx",
        "/push_transactions",
        "/farm_block",
        "/get_timestamp_for_height",
        "/set_auto_claim",
        "/get_auto_claim",
        "/get_initial_freeze_period",
        "/get_network_info",
        "/get_wallets",
        "/create_new_wallet",
        "/get_wallet_balance",
        "/get_wallet_balances",
        "/get_transaction",
        "/get_transactions",
        "/get_transaction_count",
        "/get_next_address",
        "/send_transaction",
        "/send_transaction_multi",
        "/spend_clawback_coins",
        "/get_coin_records",
        "/get_farmed_amount",
        "/create_signed_transaction",
        "/delete_unconfirmed_transactions",
        "/select_coins",
        "/get_spendable_coins",
        "/get_coin_records_by_names",
        "/get_current_derivation_index",
        "/extend_derivation_index",
        "/get_notifications",
        "/delete_notifications",
        "/send_notification",
        "/sign_message_by_address",
        "/sign_message_by_id",
        "/verify_signature",
        "/get_transaction_memo",
        "/cat_set_name",
        "/cat_asset_id_to_name",
        "/cat_get_name",
        "/get_stray_cats",
        "/cat_spend",
        "/cat_get_asset_id",
        "/create_offer_for_ids",
        "/get_offer_summary",
        "/check_offer_validity",
        "/take_offer",
        "/get_offer",
        "/get_all_offers",
        "/get_offers_count",
        "/cancel_offer",
        "/cancel_offers",
        "/get_cat_list",
        "/did_set_wallet_name",
        "/did_get_wallet_name",
        "/did_update_recovery_ids",
        "/did_update_metadata",
        "/did_get_pubkey",
        "/did_get_did",
        "/did_recovery_spend",
        "/did_get_recovery_list",
        "/did_get_metadata",
        "/did_create_attest",
        "/did_get_information_needed_for_recovery",
        "/did_get_current_coin_info",
        "/did_create_backup_file",
        "/did_transfer_did",
        "/did_message_spend",
        "/did_get_info",
        "/did_find_lost_did",
        "/nft_mint_nft",
        "/nft_count_nfts",
        "/nft_get_nfts",
        "/nft_get_by_did",
        "/nft_set_nft_did",
        "/nft_set_nft_status",
        "/nft_get_wallet_did",
        "/nft_get_wallets_with_dids",
        "/nft_get_info",
        "/nft_transfer_nft",
        "/nft_add_uri",
        "/nft_calculate_royalties",
        "/nft_mint_bulk",
        "/nft_set_did_bulk",
        "/nft_transfer_bulk",
        "/pw_join_pool",
        "/pw_self_pool",
        "/pw_absorb_rewards",
        "/pw_status",
        "/create_new_dl",
        "/dl_track_new",
        "/dl_stop_tracking",
        "/dl_latest_singleton",
        "/dl_singletons_by_root",
        "/dl_update_root",
        "/dl_update_multiple",
        "/dl_history",
        "/dl_owned_singletons",
        "/dl_get_mirrors",
        "/dl_new_mirror",
        "/dl_delete_mirror",
        "/vc_mint",
        "/vc_get",
        "/vc_get_list",
        "/vc_spend",
        "/vc_add_proofs",
        "/vc_get_proofs_for_root",
        "/vc_revoke",
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

### `open_connection`

Functionality: Open a connection to another node

Note: Inherited from RPC Server

Request Parameters:

| Flag | Type    | Required | Description                                          |
| :--- | :------ | :------- | :--------------------------------------------------- |
| host | TEXT    | True     | The IP or URL of the node to connect to              |
| port | INTEGER | True     | The port through which to connect to the remote node |

<details>
<summary>Example</summary>

```json
chia rpc wallet open_connection '{"host":"localhost", "port":"8444"}'
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

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet stop_node
```

Response:

```json
{
  "success": true
}
```

</details>
