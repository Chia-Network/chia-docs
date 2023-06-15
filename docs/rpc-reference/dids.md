---
sidebar_label: DIDs
title: DID RPC
slug: /did-rpc
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

To run the same command on Windows, you need to escape the quotes, so it looks like this (the braces have been removed to support the formatting for this page. You still need to use them in your actual commands.):

```powershell
chia rpc wallet create_new_wallet '\"wallet_type\": \"nft_wallet\"'
```

</details>

## Reference

### `create_new_wallet`

Functionality: Create a new DID wallet (From the Chia wallet RPC endpoint)

Usage: chia rpc wallet [OPTIONS] create_new_wallet [REQUEST]

Note: This is part of the wallet RPC API. It is included here to document the only way in which to create a new DID with an RPC. Because `backup_dids` is required, you must already have access to a DID in order to run this RPC. If you do not already have a DID, then run the CLI command to create a DID wallet instead.

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter                | Required | Description                                                                                                                 |
| :----------------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------- |
| wallet_type              | True     | This must be set to `did_wallet` in order to create a DID wallet                                                            |
| did_type                 | True     | Set this to `new` to create a new DID                                                                                       |
| amount                   | True     | Number of mojos to add to the DID initially. Minimum value is `1`                                                           |
| backup_dids              | True     | A list of DIDs to be used for recovery. Must match actual DIDs                                                              |
| num_of_backup_ids_needed | True     | The number of backup DIDs required for recovery. Minimum value is `1`, maximum value is the number of DIDs in `backup_dids` |
| fee                      | False    | An optional blockchain fee, in mojos                                                                                        |

<details>
<summary>Example</summary>

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

---

### `did_create_attest`

Functionality: Create an attest for a DID, to be used for recovery. This command will output the attest data, which can then be added or redirected to a file

Usage: chia rpc wallet [OPTIONS] did_create_attest [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                                  |
| :-------- | :------- | :------------------------------------------- |
| wallet_id | True     | The Wallet ID for which to create the attest |
| coin_name | True     | The coin to use for the attest               |
| pubkey    | True     | The public key to use for the attest         |
| puzhash   | True     | The puzzle hash to use for the attest        |

<details>
<summary>Example</summary>

For this example, we'll use a pre-existing DID. First, obtain the `coin_id` (`coin_name`):

```json
chia rpc wallet did_get_did '{"wallet_id": 4}'
```

Response:

```json
{
  "coin_id": "0x44a3e90ab1f103d6a259aa3009bdb34e9b092dce9f320f96342368df6b0555c7",
  "my_did": "did:chia:1d2x5wnm4sl4j2ena8ka3fyv8x7tzc9v520gstd3zfdu4pf6c2yksk8th4u",
  "success": true,
  "wallet_id": 4
}
```

Next, obtain the `did_innerpuz` (`puzhash`):

```json
chia rpc wallet did_get_current_coin_info '{"wallet_id": 4}'
```

Response:

```json
{
  "did_amount": 1,
  "did_innerpuz": "0xb83b62a297e44cb53878276e51db3daaf6b0a69ca8fdd4165c8c5bb1816289ea",
  "did_parent": "0x7738c8bc6629a6ece9197280238fa2db9437a66d4dc09d8c7d8446956e91e905",
  "my_did": "did:chia:1d2x5wnm4sl4j2ena8ka3fyv8x7tzc9v520gstd3zfdu4pf6c2yksk8th4u",
  "success": true,
  "wallet_id": 4
}
```

Next, obtain the `Master public key` (`pubkey`);

```json
chia keys show
```

Response:

```
Showing all public keys derived from your master seed and private key:

Fingerprint: 3003259627
Master public key (m): af8024892a231de462ed7f70abfc1a49372be4d2c34b80f9b48f06093a1629f7a0734c001eb0dd3942aeaecb372b70d2
Farmer public key (m/12381/8444/0/0): 88305aa55e306dd25d433ce889b3c307f20076ce44429950fa507426197df27b5ce8cbd9df4ec166a3888d372c9ea91c
Pool public key (m/12381/8444/1/0): 85d02120064fe68236e2a274d8bc76100b2e8b632e454d4465db44b6dc9b6eabcdb66c9e44a04f3bed4a49fa45411886
First wallet address: txch13w2ytvchereqawqjp4r09mqjhwk7unvndew2a400jxtu7q5kr7csqy70f7
```

Finally, using the above values, output the attest data:

```json
chia rpc wallet did_create_attest '{"wallet_id": 4, "coin_name": "0x44a3e90ab1f103d6a259aa3009bdb34e9b092dce9f320f96342368df6b0555c7", "pubkey": "af8024892a231de462ed7f70abfc1a49372be4d2c34b80f9b48f06093a1629f7a0734c001eb0dd3942aeaecb372b70d2", "puzhash": "0xb83b62a297e44cb53878276e51db3daaf6b0a69ca8fdd4165c8c5bb1816289ea"}'
```

Response:

```json
{
  "attest_data": "6a8d474f7587eb25667d3dbb14918737962c159453d105b6224b7950a758512d:0000000144a3e90ab1f103d6a259aa3009bdb34e9b092dce9f320f96342368df6b0555c77ffee04b4796a1442b18ddb41644acd8de703ac23771a7bb779ff08cbc97cf290000000000000000ff01ffff3cffa044a3e90ab1f103d6a259aa3009bdb34e9b092dce9f320f96342368df6b0555c780ffff31ffb0af8024892a231de462ed7f70abfc1a49372be4d2c34b80f9b48f06093a1629f7a0734c001eb0dd3942aeaecb372b70d2ffa0b83b62a297e44cb53878276e51db3daaf6b0a69ca8fdd4165c8c5bb1816289ea808080c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000:7738c8bc6629a6ece9197280238fa2db9437a66d4dc09d8c7d8446956e91e905:b83b62a297e44cb53878276e51db3daaf6b0a69ca8fdd4165c8c5bb1816289ea:1",
  "info": [
    "7738c8bc6629a6ece9197280238fa2db9437a66d4dc09d8c7d8446956e91e905",
    "b83b62a297e44cb53878276e51db3daaf6b0a69ca8fdd4165c8c5bb1816289ea",
    1
  ],
  "message_spend_bundle": "0000000144a3e90ab1f103d6a259aa3009bdb34e9b092dce9f320f96342368df6b0555c77ffee04b4796a1442b18ddb41644acd8de703ac23771a7bb779ff08cbc97cf290000000000000000ff01ffff3cffa044a3e90ab1f103d6a259aa3009bdb34e9b092dce9f320f96342368df6b0555c780ffff31ffb0af8024892a231de462ed7f70abfc1a49372be4d2c34b80f9b48f06093a1629f7a0734c001eb0dd3942aeaecb372b70d2ffa0b83b62a297e44cb53878276e51db3daaf6b0a69ca8fdd4165c8c5bb1816289ea808080c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "success": true
}
```

The `attest_data` value can then be directed to a text file, which can later be used for recovery with the `did_recovery_spend` RPC. For example:

```powershell
echo "6a8d474f7587eb25667d3dbb14918737962c159453d105b6224b7950a758512d:0000000144a3e90ab1f103d6a259aa3009bdb34e9b092dce9f320f96342368df6b0555c77ffee04b4796a1442b18ddb41644acd8de703ac23771a7bb779ff08cbc97cf290000000000000000ff01ffff3cffa044a3e90ab1f103d6a259aa3009bdb34e9b092dce9f320f96342368df6b0555c780ffff31ffb0af8024892a231de462ed7f70abfc1a49372be4d2c34b80f9b48f06093a1629f7a0734c001eb0dd3942aeaecb372b70d2ffa0b83b62a297e44cb53878276e51db3daaf6b0a69ca8fdd4165c8c5bb1816289ea808080c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000:7738c8bc6629a6ece9197280238fa2db9437a66d4dc09d8c7d8446956e91e905:b83b62a297e44cb53878276e51db3daaf6b0a69ca8fdd4165c8c5bb1816289ea:1" > attest1
```

</details>

---

### `did_create_backup_file`

Functionality: Output the backup data of a DID wallet's metadata. This output can then be saved or redirected to a file

Usage: chia rpc wallet [OPTIONS] did_create_backup_file [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                                                        |
| :-------- | :------- | :----------------------------------------------------------------- |
| wallet_id | True     | The Wallet ID of the DID wallet from which to obtain the coin info |

<details>
<summary>Example</summary>

```json
chia rpc wallet did_create_backup_file '{"wallet_id": 3}' > wallet2.bak
more wallet2.bak
```

Response:

```json
{
  "backup_data": "9818b416c60ad3052ff3a8dd702a6f32fc21cbd1bd3712583c331452505bba02:eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9:1:6a8d474f7587eb25667d3dbb14918737962c159453d105b6224b7950a758512d,443a397fe5f8db5b38cd47eea3e2538fe7ae7bed48a1d858a87556118b1953d9:ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0840620390879eecb831216e9d19dbab041c62075a4dede87ce15b6ae93e1c3e413e00533bd20811ae4d6d148d285c4d2ff018080ffff04ffff01a06e904ff8aa967cac220193d5b0745d0475e844db8bbbf88daa94f0e7f3d1d0f3ffff04ffff0102ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0f41209fefd72794b52620c74cd7b87a008bb87dde6f6b3a6b0929711b7a85119a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080:2:{}",
  "success": true,
  "wallet_id": 3
}
```

</details>

---

### `did_find_lost_did`

Functionality: Recover a missing or unspendable DID wallet by submitting a coin id of the DID

Usage: chia rpc wallet [OPTIONS] did_find_lost_did [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter          | Type   | Required | Description                                                                                                                         |
| :----------------- | :----- | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| coin_id            | STRING | True     | The DID ID, launcher ID, or latest coin ID of the DID you want to recover. The most time-efficient of these is the latest coin ID   |
| recovery_list_hash | STRING | False    | Override the recovery list hash of the DID. Only set this if your last DID spend updated the recovery list                          |
| num_verification   | NUMBER | False    | Override the required verification number of the DID. Only set this if your last DID spend updated the required verification number |
| metadata           | STRING | False    | The new whole metadata in json format                                                                                               |

<details>
<summary>Example 1</summary>

If the DID belongs to the current wallet, the command should succeed:

```json
chia rpc wallet did_find_lost_did '{"coin_id": "did:chia:1cxw5dqug4gavvgylx88zfkmqv235ryr6j9tvyjwwuga0pa52wjvqavdyar"}'
```

Response:

```json
{
  "latest_coin_id": "fa6a754142a557b0bf3ce5122f0146b5d7d996aadd521cf63b97f49a0e998c53",
  "success": true
}
```

</details>

<details>
<summary>Example 2</summary>

If the DID does not belong to this wallet, the command will fail:

```json
chia rpc wallet did_find_lost_did '{"coin_id": "fa6a754142a557b0bf3ce5122f0146b5d7d996aadd521cf63b97f49a0e998c53"}'
```

Response:

```json
Request failed: {'error': 'This DID c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498 is not belong to the connected wallet', 'success': False}
```

</details>

---

### `did_get_current_coin_info`

Functionality: Get the current coin info (parent coin, puzzle hash, amount) for a DID wallet

Usage: chia rpc wallet [OPTIONS] did_get_current_coin_info [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                                                        |
| :-------- | :------- | :----------------------------------------------------------------- |
| wallet_id | True     | The Wallet ID of the DID wallet from which to obtain the coin info |

<details>
<summary>Example</summary>

```json
chia rpc wallet did_get_current_coin_info '{"wallet_id": 3}'
```

Response:

```json
{
  "did_amount": 1,
  "did_innerpuz": "0x02067ee5d738b59436477a13c6d1450916d46b45e5f39062cdfb5973776be836",
  "did_parent": "0x0a0ea8551568817765ef05c3c198f96d7376b19250bdb5ffaab24378f5593d09",
  "my_did": "did:chia:17sfqnlhawfu5k5nzp36v67u85qythp7aummt8f4sj2t3rdag2yvskjyqal",
  "success": true,
  "wallet_id": 3
}
```

</details>

---

### `did_get_did`

Functionality: Fetch the my_did and coin_id (if applicable) settings for a given wallet

Usage: chia rpc wallet [OPTIONS] did_get_did [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                                                   |
| :-------- | :------- | :------------------------------------------------------------ |
| wallet_id | True     | The Wallet ID of the DID wallet for which to get the DID info |

<details>
<summary>Example</summary>

```json
chia rpc wallet did_get_did '{"wallet_id": 3}'
```

Response:

```json
{
  "coin_id": "0xce323237c656693fc2f633f911a589b42fe142f18c70883fbe70f7718538cf66",
  "my_did": "did:chia:17sfqnlhawfu5k5nzp36v67u85qythp7aummt8f4sj2t3rdag2yvskjyqal",
  "success": true,
  "wallet_id": 3
}
```

</details>

---

### `did_get_info`

Functionality: Obtain info from a DID wallet

Usage: chia rpc wallet [OPTIONS] did_get_info [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag    | Type   | Required | Description                                                   |
| :------ | :----- | :------- | :------------------------------------------------------------ |
| coin_id | NUMBER | True     | The Wallet ID of the DID wallet for which to get the DID info |

<details>
<summary>Example</summary>

```json
chia rpc wallet did_get_info '{"coin_id": "0x618a2eee48b111517cbd4f8d11889dc78396c9bcbad11c135dcbedb12f60b58b"}'
```

Response:

```json
{
  "full_puzzle": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a03bd712b40b706102ffb9a70612bfbb7ce3aa30c81a988e3993e1cdfcc652f43d454904f483151b73abcc996fa7c02eff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
  "hints": ["f2a5e7790267b0737c32e1e4a064c63b7d304b2b54454099661bdc7277231ac6"],
  "latest_coin": "618a2eee48b111517cbd4f8d11889dc78396c9bcbad11c135dcbedb12f60b58b",
  "launcher_id": "4776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83",
  "metadata": {},
  "num_verification": 0,
  "p2_address": "xch172j7w7gzv7c8xlpju8j2qexx8d7nqjet23z5pxtxr0w8yaerrtrq0tuwae",
  "public_key": "a03bd712b40b706102ffb9a70612bfbb7ce3aa30c81a988e3993e1cdfcc652f43d454904f483151b73abcc996fa7c02e",
  "recovery_list_hash": "4bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459a",
  "success": true
}
```

</details>

---

### `did_get_information_needed_for_recovery`

Functionality: Display all relevant information needed to recover a given DID. This RPC must be called on a DID wallet that was created with `"did_type":"recovery"`.

Usage: chia rpc wallet [OPTIONS] did_get_information_needed_for_recovery [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                                                                   |
| :-------- | :------- | :---------------------------------------------------------------------------- |
| wallet_id | True     | The Wallet ID of the DID wallet from which to obtain the recovery information |

<details>
<summary>Example</summary>

```json
chia rpc wallet did_get_information_needed_for_recovery '{"wallet_id": 2}'
```

Response:

```json
{
  "backup_dids": [
    "0x0fc4d8aea5b66cac7c29d93d9eee37b6c0bd9ffcd6b8e38e2c8810de5199c4d3"
  ],
  "coin_name": "025b4ed9eafab653a6e80c1c1603272cfec0e5c5591bb45a7025dadedba63e23",
  "my_did": "did:chia:19z0ladugc29x36580yejgp0s6czq0axt4tq0w7kr9uk4042asusqvxldga",
  "newpuzhash": "0x3929e3a268d3d04b8a40f226b66f0ab4f00b5c12fd628bc18f8ce573e76b291f",
  "pubkey": "0xa1b184cf85e9804ba1df27acd2efd4622366315293f2c2e06eae7d9776cd3ef474edd4d0f10323e8a7a817b5a42317de",
  "success": true,
  "wallet_id": 2
}
```

</details>

---

### `did_get_metadata`

Functionality: Fetch the metadata for a given wallet

Usage: chia rpc wallet [OPTIONS] did_get_metadata [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                                                        |
| :-------- | :------- | :----------------------------------------------------------------- |
| wallet_id | True     | The Wallet ID of the DID wallet for which to get the metadata list |

<details>
<summary>Example</summary>

```json
chia rpc wallet did_get_metadata '{"wallet_id": 3}'
```

Response:

```json
{
  "metadata": {
    "foo": "bar",
    "something": 5
  },
  "success": true,
  "wallet_id": 3
}
```

</details>

---

### `did_get_pubkey`

Functionality: Get the public key for a DID

Usage: chia rpc wallet [OPTIONS] did_get_pubkey [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                                                         |
| :-------- | :------- | :------------------------------------------------------------------ |
| wallet_id | True     | The Wallet ID of the DID wallet from which to obtain the public key |

<details>
<summary>Example</summary>

```json
chia rpc wallet did_get_pubkey '{"wallet_id": 2}'
```

Response:

```json
{
  "pubkey": "886826068778f285c442cfd08a45c7b55ecc9ef870b9b18810e81457c56df9764793686c1756e48a91586839a4abd290",
  "success": true
}
```

</details>

---

### `did_get_recovery_list`

Functionality: For a given wallet, fetch the recovery list, as well as the number of IDs required for recovery

Usage: chia rpc wallet [OPTIONS] did_get_recovery_list [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                                                        |
| :-------- | :------- | :----------------------------------------------------------------- |
| wallet_id | True     | The Wallet ID of the DID wallet for which to get the recovery list |

<details>
<summary>Example:</summary>

```json
chia rpc wallet did_get_recovery_list '{"wallet_id": 3}'
```

Response:

```json
{
  "num_required": 2,
  "recovery_list": [
    "did:chia:1d2x5wnm4sl4j2ena8ka3fyv8x7tzc9v520gstd3zfdu4pf6c2yksk8th4u",
    "did:chia:1gsarjll9lrd4kwxdglh28cjn3ln6u7ldfzsask9gw4tprzce20vsywwsqs"
  ],
  "success": true,
  "wallet_id": 3
}
```

</details>

---

### `did_get_wallet_name`

Functionality: Given a DID wallet's ID, retrieve the name of that wallet

Usage: chia rpc wallet [OPTIONS] did_get_wallet_name [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                                              |
| :-------- | :------- | :------------------------------------------------------- |
| wallet_id | True     | The Wallet ID of the DID wallet on which to get the name |

<details>
<summary>Example</summary>

```json
chia rpc wallet did_get_wallet_name '{"wallet_id": 3}'
```

Response:

```json
{
  "name": "My DID Wallet",
  "success": true,
  "wallet_id": 3
}
```

</details>

---

### `did_message_spend`

Functionality: Generate a spend bundle for a DID wallet to send a message (this RPC does not modify the blockchain)

Usage: chia rpc wallet [OPTIONS] did_message_spend [REQUEST]

Options:

| Short Command | Long Command | Type     | Required | Description                                                                           |
| :------------ | :----------- | :------- | :------- | :------------------------------------------------------------------------------------ |
| -j            | --json-file  | FILENAME | False    | Optionally instead of REQUEST you can provide a json file containing the request data |
| -h            | --help       | None     | False    | Show a help message and exit                                                          |

Request Parameters:

| Flag                 | Type   | Required | Description                                                     |
| :------------------- | :----- | :------- | :-------------------------------------------------------------- |
| wallet_id            | NUMBER | True     | The Wallet ID of the DID wallet from which to spend the message |
| coin_announcements   | LIST   | False    | A list of coin announcements to include with the spend          |
| puzzle_announcements | LIST   | False    | A list of puzzle announcements to include with the spend        |

<details>
<summary>Example</summary>

```json
chia rpc wallet did_message_spend '{"wallet_id": 5}'
```

Response:

```json
{
  "spend_bundle": {
    "aggregated_signature": "0xad0d726ae7935978129b1c9c558b75c2b629aef893c89c3ec989c347a9eb71ddbaa83dadfe923599e7f14276eaeb84d9063d02b9b91fa561d09689716f177c0304aebb701f9c0f04eba9120b561f482e538a72ece30c086ffd942624b0962c83",
    "coin_solutions": [
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x0b51251268ff8c71c0d2a74495b8dce93d2a86591501e71e71d8349112ca8051",
          "puzzle_hash": "0x50f90b0ff7cdd672953ccfe8b90c2543673bc8aa56981dd7ccee1c41746f6e72"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a03bd712b40b706102ffb9a70612bfbb7ce3aa30c81a988e3993e1cdfcc652f43d454904f483151b73abcc996fa7c02eff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
        "solution": "0xffffa04c534c738148865f4cdb2aaef734810df68dac6cab738544630991ae46a980dfffa056e33fc1fe1a970cbdedb90559097186587fdd4d484b4fef2d96bd4f3afe8082ff0180ff01ffff01ffff80ffff01ffff33ffa056e33fc1fe1a970cbdedb90559097186587fdd4d484b4fef2d96bd4f3afe8082ff01ffffa0f2a5e7790267b0737c32e1e4a064c63b7d304b2b54454099661bdc7277231ac6808080ff80808080"
      }
    ]
  },
  "success": true
}
```

</details>

---

### `did_recovery_spend`

Functionality: Recover a DID to a new DID by using an attest file

Usage: chia rpc wallet [OPTIONS] did_recovery_spend [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter   | Required | Description                                                                                                     |
| :---------- | :------- | :-------------------------------------------------------------------------------------------------------------- |
| wallet_id   | True     | The Wallet ID of the DID wallet to recover                                                                      |
| attest_data | True     | A list of attest files to be used for recovery                                                                  |
| pubkey      | False    | The public key of the wallet to recover. If this is not provided, a temporary public key will be used instead   |
| puzhash     | False    | The puzzle hash of the wallet to recover. If this is not provided, a temporary puzzle hash will be used instead |
| fee         | False    | An optional blockchain fee, in mojos                                                                            |

<details>
<summary>Example</summary>

There are several steps involved in performing a DID recovery spend. We'll go through them one at a time here.

For this example, we'll start with a brand new setup: a single fingerprint with a Chia wallet and some TXCH:

```json
$ chia wallet show
Wallet height: 1190999
Sync status: Synced
Balances, fingerprint: 2136152685

Chia Wallet:
   -Total Balance:         28.312944999982 txch (28312944999982 mojo)
   -Pending Total Balance: 28.312944999982 txch (28312944999982 mojo)
   -Spendable:             28.312944999982 txch (28312944999982 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

We'll start by creating two DIDs, labeled "DID A" and "DID B". DID A is the one we'll recover later.

```json
$ chia wallet did create -n "DID A" -a 1 -m 0.00001
Successfully created a DID wallet with name DID A and id 2 on key 2136152685
Successfully created a DID did:chia:1yk9vl86ek6duzah5pj0xtsp8wd5czqu9p3hvlsxw0c8cj3w95tssg0l2d6 in the newly created DID wallet

$ chia wallet did create -n "DID B" -a 1 -m 0.00001
Successfully created a DID wallet with name DID B and id 3 on key 2136152685
Successfully created a DID did:chia:1l3hkwrlkmja526pzjuxhfm9c859hn64m2hwq76hfdletpfj09q6qf6e9k4 in the newly created DID wallet
```

At this point, both DIDs will show up. They are listed under Wallet IDs 2 and 3:

```json
$ chia wallet show
Wallet height: 1191003
Sync status: Synced
Balances, fingerprint: 2136152685

Chia Wallet:
   -Total Balance:         28.312934999981 txch (28312934999981 mojo)
   -Pending Total Balance: 28.31292499998 txch (28312924999980 mojo)
   -Spendable:             0.899879999999 txch (899879999999 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

DID A:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:1yk9vl86ek6duzah5pj0xtsp8wd5czqu9p3hvlsxw0c8cj3w95tssg0l2d6
   -Wallet ID:             2

DID B:
   -Total Balance:         0.0
   -Pending Total Balance: 1.0
   -Spendable:             0.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:1l3hkwrlkmja526pzjuxhfm9c859hn64m2hwq76hfdletpfj09q6qf6e9k4
   -Wallet ID:             3
```

Next, update the recovery list of DID A. This command will add DID B as the recovery ID:

```json
$ chia rpc wallet did_update_recovery_ids '{"wallet_id": 2, "new_list": ["did:chia:1l3hkwrlkmja526pzjuxhfm9c859hn64m2hwq76hfdletpfj09q6qf6e9k4"]}'
{
    "success": true
}
```

Now we can create a backup file of DID A:

```json
chia rpc wallet did_create_backup_file '{"wallet_id": 2}'
{
    "backup_data": "e1995096382bcb7fef4c961bc09c32cbe0af929e768fc927133405271b3ca759:eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9:1:fc6f670ff6dcbb456822970d74ecb83d0b79eabb55dc0f6ae96ff2b0a64f2834:ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b083770b050c01211b8e966c7dc40fa970e5d150293c0615910c09482c1491dd87d9115b639e88f84b0c6fc634df4b7b0fff018080ffff04ffff01a0bd61b4e994cc949bfc9350386c1818aea4ff5a300e9acfeb9e0ff7111d26a453ffff04ffff0101ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0258acf9f59b69bc176f40c9e65c02773698103850c6ecfc0ce7e0f8945c5a2e1a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080:1:{}",
    "success": true,
    "wallet_id": 2
}
```

At this point we need to create a new wallet fingerprint. This will be the final location for the recovered DID:

```json
chia keys generate
Generating private key
Added private key with public key fingerprint 2118200991
WARNING: using a farmer address which we might not have the private keys for. We searched the first 50 addresses. Consider overriding txch13amy3jfp8kkmqa87eswytj3a8ef22nm8zwsf3ckptpm8rv72qtgqgvk6fs with txch1phed5va8r3ch94qr6kp8mu5hu52xz6u7267624vtq2lkl06zn73q3sryj6
WARNING: using a pool address which we might not have the private keys for. We searched the first 50 addresses. Consider overriding txch13amy3jfp8kkmqa87eswytj3a8ef22nm8zwsf3ckptpm8rv72qtgqgvk6fs with txch1phed5va8r3ch94qr6kp8mu5hu52xz6u7267624vtq2lkl06zn73q3sryj6
```

Show both wallet keys:

```json
$ chia keys show
Showing all public keys derived from your master seed and private key:

Fingerprint: 2118200991
Master public key (m): 93e0afa4e8c537c8d6642225a45e267bc6f12fe9dfcbb3fab177645df6a7c8bb8fd62892b534ca82e4c05e45e774ccc3
Farmer public key (m/12381/8444/0/0): b63fbd179e3089bee17bfb430f1a559ab16ec8217b0a26dbb9a9501a82840614c74167c76e759716aae9b6c1cf4a701a
Pool public key (m/12381/8444/1/0): 9028d7a806a6ddcb2e3266442002c70fba369fe5e46cc7fae0c4dcd12ffb1ce993752abdc45a1bf17d15918f1cfb7891
First wallet address: txch1phed5va8r3ch94qr6kp8mu5hu52xz6u7267624vtq2lkl06zn73q3sryj6

Fingerprint: 2136152685
Master public key (m): b9bcda4cd4affe38e4f8bbb2943eb478ed4799c1abfda150d583433e8f5e45b5d0eb57e459193a6a2d6ed6339f5d32cf
Farmer public key (m/12381/8444/0/0): 9521e9cb089d2185f5547cfed0547d3eb7d1b0dfb372174d6a46f813d02db20eb646820929ac30d0b314e7541d842f66
Pool public key (m/12381/8444/1/0): a3a9f40c651f1ba0e56b33182920496939decc6a23bda6c6dc040644203b216ddf42f0a605fe6977b9d42fe30d734997
First wallet address: txch1svp4tl59wzhz97lemf228jsrtlansej48wec5cuzxpc7g0g4tqcq0s5v68
```

Sync the second wallet fingerprint and show the contents. So far, there is only a regular Chia wallet:

```json
chia wallet show
Wallet keys:
1) * 2118200991 (Synced)
2)   2136152685
Choose a wallet key [1-2] ('q' to quit, or Enter to use 2118200991):
Wallet height: 1191071
Sync status: Synced
Balances, fingerprint: 2118200991

Chia Wallet:
   -Total Balance:         0.0 txch (0 mojo)
   -Pending Total Balance: 0.0 txch (0 mojo)
   -Spendable:             0.0 txch (0 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

Now we can create a new wallet within the second fingerprint. This will have a did_type of "recovery". It will use the backup file of DID A. At this point, however, it will just be an empty DID because the recovery spend has not yet been performed.

Note the values of `coin_name`, `pubkey` and `newpuzhash` as they will be used shortly when creating the attest:

```json
chia rpc wallet create_new_wallet '{"wallet_type":"did_wallet", "did_type":"recovery", "backup_data":"e1995096382bcb7fef4c961bc09c32cbe0af929e768fc927133405271b3ca759:eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9:1:fc6f670ff6dcbb456822970d74ecb83d0b79eabb55dc0f6ae96ff2b0a64f2834:ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b083770b050c01211b8e966c7dc40fa970e5d150293c0615910c09482c1491dd87d9115b639e88f84b0c6fc634df4b7b0fff018080ffff04ffff01a0bd61b4e994cc949bfc9350386c1818aea4ff5a300e9acfeb9e0ff7111d26a453ffff04ffff0101ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0258acf9f59b69bc176f40c9e65c02773698103850c6ecfc0ce7e0f8945c5a2e1a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080:1:{}"}'
{
    "backup_dids": [
        "0xfc6f670ff6dcbb456822970d74ecb83d0b79eabb55dc0f6ae96ff2b0a64f2834"
    ],
    "coin_list": [
        "0x7aa58b37be28b3dde7f8990bf9d32913e7cd89d2cd490196234bcab327645cf9",
        "0x90d067146f4ffd80d37ecbd754e3a3b15c86186fcfb1113562d4ec12e24ca0ae",
        1
    ],
    "coin_name": "7b7cb8ea30d4bda2bb4d8bfaf82fbc0a6893d2e55c56d47c333d0d96b1509fe5",
    "my_did": "258acf9f59b69bc176f40c9e65c02773698103850c6ecfc0ce7e0f8945c5a2e1",
    "newpuzhash": "1220da328f91466714867ffeed7159db14d9522a784adf042beb91ffbaed9013",
    "num_verifications_required": 1,
    "pubkey": "8a1a8036d61a3bb5f2d751c90e643989f0db6ad2fd4e5aa63c6716e187e10c3493c2d59a58e688b78261211cd446d0ba",
    "success": true,
    "type": 8,
    "wallet_id": 2
}
```

Next, sync the original wallet and show the contents:

```json
chia wallet show
Wallet keys:
1)   2118200991
2) * 2136152685 (Synced)
Choose a wallet key [1-2] ('q' to quit, or Enter to use 2136152685):
Wallet height: 1191076
Sync status: Synced
Balances, fingerprint: 2136152685

Chia Wallet:
   -Total Balance:         28.31292499998 txch (28312924999980 mojo)
   -Pending Total Balance: 28.31292499998 txch (28312924999980 mojo)
   -Spendable:             28.31292499998 txch (28312924999980 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

DID A:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:1yk9vl86ek6duzah5pj0xtsp8wd5czqu9p3hvlsxw0c8cj3w95tssg0l2d6
   -Wallet ID:             2

DID B:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:1l3hkwrlkmja526pzjuxhfm9c859hn64m2hwq76hfdletpfj09q6qf6e9k4
   -Wallet ID:             3
```

Create the attest using DID B. The `coin_name`, `pubkey`, and `puzhash` (called `newpuzhash` above) all come from the recovery wallet in the new wallet fingerprint.

```json
chia rpc wallet did_create_attest '{"wallet_id": 3, "coin_name": "0x7b7cb8ea30d4bda2bb4d8bfaf82fbc0a6893d2e55c56d47c333d0d96b1509fe5", "pubkey": "8a1a8036d61a3bb5f2d751c90e643989f0db6ad2fd4e5aa63c6716e187e10c3493c2d59a58e688b78261211cd446d0ba", "puzhash": "0x1220da328f91466714867ffeed7159db14d9522a784adf042beb91ffbaed9013"}'
{
    "attest_data": "fc6f670ff6dcbb456822970d74ecb83d0b79eabb55dc0f6ae96ff2b0a64f2834:000000010aa0becc194467bf318773b2a9f2afb11372021cd91dbdd2c9b86ce62a0958ec295226d71b97c9ad9aa47bb4bdc7724c64426c587ccf726154af3e98d7f765b30000000000000000ff01ffff3cffa07b7cb8ea30d4bda2bb4d8bfaf82fbc0a6893d2e55c56d47c333d0d96b1509fe580ffff31ffb08a1a8036d61a3bb5f2d751c90e643989f0db6ad2fd4e5aa63c6716e187e10c3493c2d59a58e688b78261211cd446d0baffa01220da328f91466714867ffeed7159db14d9522a784adf042beb91ffbaed9013808080c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000:9b28688c247e13f6d25d9213f56f1cb98efed8553d3fdf7b2bafb02946f10b1d:4e87afa498547c9086455b9e922208dc698816c4100d089884adbc35c6d5c036:1",
    "info": [
        "9b28688c247e13f6d25d9213f56f1cb98efed8553d3fdf7b2bafb02946f10b1d",
        "4e87afa498547c9086455b9e922208dc698816c4100d089884adbc35c6d5c036",
        1
    ],
    "message_spend_bundle": "000000010aa0becc194467bf318773b2a9f2afb11372021cd91dbdd2c9b86ce62a0958ec295226d71b97c9ad9aa47bb4bdc7724c64426c587ccf726154af3e98d7f765b30000000000000000ff01ffff3cffa07b7cb8ea30d4bda2bb4d8bfaf82fbc0a6893d2e55c56d47c333d0d96b1509fe580ffff31ffb08a1a8036d61a3bb5f2d751c90e643989f0db6ad2fd4e5aa63c6716e187e10c3493c2d59a58e688b78261211cd446d0baffa01220da328f91466714867ffeed7159db14d9522a784adf042beb91ffbaed9013808080c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "success": true
}
```

Send some money to the new wallet to be used during the recovery:

```json
chia wallet send -t txch1phed5va8r3ch94qr6kp8mu5hu52xz6u7267624vtq2lkl06zn73q3sryj6 -a 1 -m 0.00001
Wallet keys:
1)   2118200991
2) * 2136152685 (Synced)
Choose a wallet key [1-2] ('q' to quit, or Enter to use 2136152685):
Submitting transaction...
Transaction submitted to nodes: [{'peer_id': 'f40100b8b46550eb75b79edab4de38611eb543ac8975e262c2d2bf1e1c594312', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 2136152685 -tx 0x09dc82f5d8737def4b0ec70e7cd6a92a3a00be8b31152d30fbe73bc939776187' to get status
```

Sync the new wallet and show its contents. Note that `Profile 1` has zero balance:

```json
chia wallet show
Wallet keys:
1) * 2118200991 (Synced)
2)   2136152685
Choose a wallet key [1-2] ('q' to quit, or Enter to use 2118200991):
Wallet height: 1191101
Sync status: Synced
Balances, fingerprint: 2118200991

Chia Wallet:
   -Total Balance:         1.0 txch (1000000000000 mojo)
   -Pending Total Balance: 1.0 txch (1000000000000 mojo)
   -Spendable:             1.0 txch (1000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Profile 1:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:1yk9vl86ek6duzah5pj0xtsp8wd5czqu9p3hvlsxw0c8cj3w95tssg0l2d6
   -Wallet ID:             2
```

Now perform the recovery, passing in the attest_data obtained previously:

```json
chia rpc wallet did_recovery_spend '{"wallet_id":2, "attest_data":["fc6f670ff6dcbb456822970d74ecb83d0b79eabb55dc0f6ae96ff2b0a64f2834:000000010aa0becc194467bf318773b2a9f2afb11372021cd91dbdd2c9b86ce62a0958ec295226d71b97c9ad9aa47bb4bdc7724c64426c587ccf726154af3e98d7f765b30000000000000000ff01ffff3cffa07b7cb8ea30d4bda2bb4d8bfaf82fbc0a6893d2e55c56d47c333d0d96b1509fe580ffff31ffb08a1a8036d61a3bb5f2d751c90e643989f0db6ad2fd4e5aa63c6716e187e10c3493c2d59a58e688b78261211cd446d0baffa01220da328f91466714867ffeed7159db14d9522a784adf042beb91ffbaed9013808080c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000:9b28688c247e13f6d25d9213f56f1cb98efed8553d3fdf7b2bafb02946f10b1d:4e87afa498547c9086455b9e922208dc698816c4100d089884adbc35c6d5c036:1"]}'
{
    "spend_bundle": {
        "aggregated_signature": "0xafc1f292dc4c6d6492a1d5ba760c4f28941398392f414f7e937b0695c68bd9d144bdbfba5956d5a49f4a02f0a72b2a5206345539b20a7ccc4a5ad7463e5c0bfeb6246511f9bdebfdcf55275e2c94833162e86ecc6335ae9a1c39073b24dae873",
        "coin_solutions": [
            {
                "coin": {
                    "amount": 0,
                    "parent_coin_info": "0x0aa0becc194467bf318773b2a9f2afb11372021cd91dbdd2c9b86ce62a0958ec",
                    "puzzle_hash": "0x295226d71b97c9ad9aa47bb4bdc7724c64426c587ccf726154af3e98d7f765b3"
                },
                "puzzle_reveal": "0xff01ffff3cffa07b7cb8ea30d4bda2bb4d8bfaf82fbc0a6893d2e55c56d47c333d0d96b1509fe580ffff31ffb08a1a8036d61a3bb5f2d751c90e643989f0db6ad2fd4e5aa63c6716e187e10c3493c2d59a58e688b78261211cd446d0baffa01220da328f91466714867ffeed7159db14d9522a784adf042beb91ffbaed90138080",
                "solution": "0x80"
            },
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0x7aa58b37be28b3dde7f8990bf9d32913e7cd89d2cd490196234bcab327645cf9",
                    "puzzle_hash": "0x90d067146f4ffd80d37ecbd754e3a3b15c86186fcfb1113562d4ec12e24ca0ae"
                },
                "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0258acf9f59b69bc176f40c9e65c02773698103850c6ecfc0ce7e0f8945c5a2e1a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b083770b050c01211b8e966c7dc40fa970e5d150293c0615910c09482c1491dd87d9115b639e88f84b0c6fc634df4b7b0fff018080ffff04ffff01a0bd61b4e994cc949bfc9350386c1818aea4ff5a300e9acfeb9e0ff7111d26a453ffff04ffff0101ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0258acf9f59b69bc176f40c9e65c02773698103850c6ecfc0ce7e0f8945c5a2e1a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
                "solution": "0xffffa0767eec938e0b05170de23d79423404985e9f50dd1b43c3021fc66c42b9b83337ffa065ed09d2efb33577d189a0db02378a4de36eb228abfc1458e356f8f6353a2bf8ff0180ff01ffff80ff01ffa01220da328f91466714867ffeed7159db14d9522a784adf042beb91ffbaed9013ffffffa09b28688c247e13f6d25d9213f56f1cb98efed8553d3fdf7b2bafb02946f10b1dffa04e87afa498547c9086455b9e922208dc698816c4100d089884adbc35c6d5c036ff018080ffb08a1a8036d61a3bb5f2d751c90e643989f0db6ad2fd4e5aa63c6716e187e10c3493c2d59a58e688b78261211cd446d0baffffa0fc6f670ff6dcbb456822970d74ecb83d0b79eabb55dc0f6ae96ff2b0a64f283480ffa07b7cb8ea30d4bda2bb4d8bfaf82fbc0a6893d2e55c56d47c333d0d96b1509fe58080"
            }
        ]
    },
    "success": true
}
```

Wait a few minutes for the recovery spend to be confirmed on the blockchain. Afterward, `Profile 1` will have a balance of 1.0:

```json
chia wallet show
Wallet keys:
1) * 2118200991 (Synced)
2)   2136152685
Choose a wallet key [1-2] ('q' to quit, or Enter to use 2118200991):
Wallet height: 1191108
Sync status: Synced
Balances, fingerprint: 2118200991

Chia Wallet:
   -Total Balance:         1.0 txch (1000000000000 mojo)
   -Pending Total Balance: 1.0 txch (1000000000000 mojo)
   -Spendable:             1.0 txch (1000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Profile 1:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:1yk9vl86ek6duzah5pj0xtsp8wd5czqu9p3hvlsxw0c8cj3w95tssg0l2d6
   -Wallet ID:             2
```

</details>

---

### `did_set_wallet_name`

Functionality: Set the name of a DID wallet

Usage: chia rpc wallet [OPTIONS] did_set_wallet_name [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Required | Description                                              |
| :-------- | :------- | :------------------------------------------------------- |
| wallet_id | True     | The Wallet ID of the DID wallet on which to set the name |
| name      | True     | The new name of the DID wallet                           |

<details>
<summary>Example</summary>

```json
chia rpc wallet did_set_wallet_name '{"wallet_id": 3, "name": "My DID Wallet"}'
```

Response:

```json
{
  "success": true,
  "wallet_id": 3
}
```

Show wallet with new name:

```bash
chia wallet show -w decentralized_id
```

Response:

```
Wallet height: 1122161
Sync status: Synced
Balances, fingerprint: 4288332900

My DID Wallet:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:16kgxghw80cjlytl7x7zxuuux32v308fnmcgkfrh652rtcdqexm4q7gsarr
   -Wallet ID:             3
```

</details>

---

### `did_transfer_did`

Functionality: Transfer a DID

Usage: chia rpc wallet [OPTIONS] did_transfer_did [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter          | Required | Description                                                                                                                                                                              |
| :----------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wallet_id          | True     | The Wallet ID of the DID wallet to transfer                                                                                                                                              |
| inner_address      | True     | The address of the inner puzzle to which to transfer the DID                                                                                                                             |
| fee                | False    | An optional blockchain fee, in mojos                                                                                                                                                     |
| with_recovery_info | False    | If `True`, transfer recovery info [Default: `True`]                                                                                                                                      |
| reuse_puzhash      | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml |

<details>
<summary>Example</summary>

```json
chia rpc wallet did_transfer_did '{"wallet_id": 4, "inner_address": "txch1r2hc8zaxmqetkwuqz99nspwa7dlhnyx6uuxlt8srrsd2n7pscwfqgjhy7h"}'
```

Response:

```json
{
  "success": true,
  "transaction": {
    "additions": [
      {
        "amount": 1,
        "parent_coin_info": "0x78daa350eeb408613973c4b60496a306fed5a3986eb2e45b22d075eeb7c29a69",
        "puzzle_hash": "0x347677678e38bbdfe4ed17039f39c2f147d1887f7cc2bccbaf3527bb5acffdc0"
      }
    ],
    "amount": 1,
    "confirmed": false,
    "confirmed_at_height": 0,
    "created_at_time": 1655565303,
    "fee_amount": 0,
    "memos": {
      "8b43e84b7e42831bf6c02b01d69a5c0a6710b3ff521750fd9c49b4b99396acd4": "1aaf838ba6d832bb3b80114b3805ddf37f7990dae70df59e031c1aa9f830c392"
    },
    "name": "0x0af39652e953671261b177b3624041c17770f810c8f77a88f295e683774956be",
    "removals": [
      {
        "amount": 1,
        "parent_coin_info": "0x44a3e90ab1f103d6a259aa3009bdb34e9b092dce9f320f96342368df6b0555c7",
        "puzzle_hash": "0x4661af019be51293df0052563b1d2e5ab658a66b71df38db7ca96d8b0645b785"
      }
    ],
    "sent": 0,
    "sent_to": [],
    "spend_bundle": {
      "aggregated_signature": "0xaf4ec07cd194c50ff3ee219fa2be43d216e7851925eadc076254745080e4861a5ab59a89a6034fc1cf84dee1866420f20589c7c33c7d1f0d41c90bc60be8ee9a14c68ea6c608c38c4a37360136702db9c1fd7d118c2bbb67a1b2f9865ba493b4",
      "coin_spends": [
        {
          "coin": {
            "amount": 1,
            "parent_coin_info": "0x44a3e90ab1f103d6a259aa3009bdb34e9b092dce9f320f96342368df6b0555c7",
            "puzzle_hash": "0x4661af019be51293df0052563b1d2e5ab658a66b71df38db7ca96d8b0645b785"
          },
          "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa06a8d474f7587eb25667d3dbb14918737962c159453d105b6224b7950a758512da0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a3e80190c5920d683e1058cba5d4fbaede4d62c08db85047e256eba971fde5aad1762cb79bd0be6b990f1005d0cbef8bff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa06a8d474f7587eb25667d3dbb14918737962c159453d105b6224b7950a758512da0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
          "solution": "0xffffa07738c8bc6629a6ece9197280238fa2db9437a66d4dc09d8c7d8446956e91e905ffa0b83b62a297e44cb53878276e51db3daaf6b0a69ca8fdd4165c8c5bb1816289eaff0180ff01ffff02ffff80ffff01ffff33ffa0120a2e3743c2ca08ff09e64c6615537d0269c39137d413c3034d8d5fde4fa316ff01ffffa01aaf838ba6d832bb3b80114b3805ddf37f7990dae70df59e031c1aa9f830c392808080ff8080ff80ff80ff80ff808080"
        }
      ]
    },
    "to_address": "txch1r2hc8zaxmqetkwuqz99nspwa7dlhnyx6uuxlt8srrsd2n7pscwfqgjhy7h",
    "to_puzzle_hash": "0x1aaf838ba6d832bb3b80114b3805ddf37f7990dae70df59e031c1aa9f830c392",
    "trade_id": null,
    "type": 1,
    "wallet_id": 4
  },
  "transaction_id": "0x0af39652e953671261b177b3624041c17770f810c8f77a88f295e683774956be"
}
```

</details>

---

### `did_update_metadata`

Functionality: Update the metadata for a DID wallet. The current metadata can be obtained with the did_get_metadata endpoint

Usage: chia rpc wallet [OPTIONS] did_update_metadata [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter     | Required | Description                                                                                                                                                                              |
| :------------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wallet_id     | True     | The Wallet ID of the DID wallet for which to update the metadata                                                                                                                         |
| metadata      | False    | The updated metadata                                                                                                                                                                     |
| fee           | False    | An optional blockchain fee, in mojos                                                                                                                                                     |
| reuse_puzhash | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml |

<details>
<summary>Example</summary>

```json
chia rpc wallet did_update_metadata '{"wallet_id": 3, "metadata": {"foo": "bar", "something": 5}}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `did_update_recovery_ids`

Functionality: Append one or more IDs to be used for recovery of a DID wallet. The current list can be obtained with the did_get_recovery_list endpoint

Usage: chia rpc wallet [OPTIONS] did_update_recovery_ids [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter                  | Required | Description                                                                                                                                                                              |
| :------------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wallet_id                  | True     | The Wallet ID of the DID wallet for which to update the recovery IDs                                                                                                                     |
| new_list                   | True     | The new recovery ID list. Each item from this list will be appended to the existing list                                                                                                 |
| num_verifications_required | False    | Optionally set the number of IDs required for wallet recovery. If not set, then the entire updated list will be required by default                                                      |
| fee                        | False    | An optional blockchain fee, in mojos                                                                                                                                                     |
| reuse_puzhash              | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml |

<details>
<summary>Example</summary>

To show an example, first we need at least one DID to be used for recovery. In this case, we'll create two and use them both.

Create one recovery DID:

```json
chia wallet did create -n "Recovery DID 1"
```

Response:

```
Successfully created a DID wallet with name Recovery DID 1 and id 4 on key 3003259627
Successfully created a DID did:chia:1d2x5wnm4sl4j2ena8ka3fyv8x7tzc9v520gstd3zfdu4pf6c2yksk8th4u in the newly created DID wallet
```

Create another recovery DID:

```json
chia wallet did create -n "Recovery DID 2"
```

Response:

```
Successfully created a DID wallet with name Recovery DID 2 and id 6 on key 3003259627
Successfully created a DID did:chia:1gsarjll9lrd4kwxdglh28cjn3ln6u7ldfzsask9gw4tprzce20vsywwsqs in the newly created DID wallet
```

Example of adding both recovery DIDs:

```json
chia rpc wallet did_update_recovery_ids '{"wallet_id": 3, "new_list": ["did:chia:1d2x5wnm4sl4j2ena8ka3fyv8x7tzc9v520gstd3zfdu4pf6c2yksk8th4u", "did:chia:1gsarjll9lrd4kwxdglh28cjn3ln6u7ldfzsask9gw4tprzce20vsywwsqs"]}'
```

Response:

```json
{
  "success": true
}
```

</details>

---
