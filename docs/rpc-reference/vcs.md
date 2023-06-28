---
sidebar_label: VCs
title: Verifiable Credentials RPCs
slug: /vc-rpc
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
chia rpc wallet vc_get '{"vc_id": "13ba084e78475327e41c60df5a108965d7a283f065b5506e266ffb3563937b6c"}'
```

To run the same command on Windows, you need to escape the quotes, so it looks like this (the braces have been removed to support the formatting for this page. You still need to use them in your actual commands.):

```powershell
chia rpc wallet vc_get '\"vc_id\": \"13ba084e78475327e41c60df5a108965d7a283f065b5506e266ffb3563937b6c\"'
```

</details>

## Reference

### `vc_add_proofs`

Functionality: Add a set of proofs to the DB that can be used when spending a VC

Usage: chia rpc wallet [OPTIONS] vc_add_proofs [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Type       | Required | Description                                        |
| :---------| :--------- | :------- | :------------------------------------------------- |
| proofs    | DICTIONARY | True     | A dictionary of key/value pairs to be added as proofs |

<details>
<summary>Example</summary>

Add two example proofs:

```json
chia rpc wallet vc_add_proofs '{"proofs": {"example_proof_1": "example_value_1", "example_proof_2": "example_value_2"}}'
```

Response:

```
{
    "success": true
}
```

</details>

---

### `vc_get`

Functionality: Given a launcher ID, get the Verifiable Credential

Usage: chia rpc wallet [OPTIONS] vc_get [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Type    | Required | Description                                |
| :---------| :------ | :------- | :----------------------------------------- |
| vc_id     | STRING  | True     | The launcher ID of a Verifiable Credential |

This RPC returns the `vc_record` representing the specified Verifiable Credential

<details>
<summary>Example</summary>

```json
chia rpc wallet vc_get '{"vc_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d"}'
```

Response:

```json
{
    "success": true,
    "vc_record": {
        "confirmed_at_height": 2774961,
        "vc": {
            "coin": {
                "amount": 1,
                "parent_coin_info": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                "puzzle_hash": "0x66713c00a343c14e0929fbae0435789a4d86fe573ea07c46c13cea182be52247"
            },
            "eml_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": null,
                "parent_name": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                "parent_proof_hash": null
            },
            "inner_puzzle_hash": "0x13177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e715",
            "launcher_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
            "proof_hash": null,
            "proof_provider": "0x028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89",
            "singleton_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x43309e9613bc9d8156b52cfe1e396b43448c59286bf0b3d3dd283eeea7eb9c09",
                "parent_name": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d"
            }
        }
    }
}
```

</details>

---

### `vc_get_list`

Functionality: Get a list of Verifiable Credentials

Usage: chia rpc wallet [OPTIONS] vc_get_list [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Type    | Required | Description                                           |
| :---------| :------ | :------- | :---------------------------------------------------- |
| start     | INTEGER | False    | The index to start the list at [default: 0]           |
| count     | INTEGER | False    | The maximum number of results to return [default: 50] |

This RPC returns all `vc_records` in the specified range, along with any proofs associated with the roots contained within.

<details>
<summary>Example</summary>

In this example, there are two existing credentials:

```json
chia rpc wallet vc_get_list
```

Response:

```json
{
    "proofs": {},
    "success": true,
    "vc_records": [
        {
            "coin_id": "0x34fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c",
            "confirmed_at_height": 2774961,
            "vc": {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                    "puzzle_hash": "0x66713c00a343c14e0929fbae0435789a4d86fe573ea07c46c13cea182be52247"
                },
                "eml_lineage_proof": {
                    "amount": 1,
                    "inner_puzzle_hash": null,
                    "parent_name": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                    "parent_proof_hash": null
                },
                "inner_puzzle_hash": "0x13177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e715",
                "launcher_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                "proof_hash": null,
                "proof_provider": "0x028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89",
                "singleton_lineage_proof": {
                    "amount": 1,
                    "inner_puzzle_hash": "0x43309e9613bc9d8156b52cfe1e396b43448c59286bf0b3d3dd283eeea7eb9c09",
                    "parent_name": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d"
                }
            }
        }
    ]
}
```

</details>

---

### `vc_get_proofs_for_root`

Functionality: Given a specified VC root, get any proofs associated with that root

Usage: chia rpc wallet [OPTIONS] vc_get_proofs_for_root [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter | Type   | Required | Description                                                              |
| :---------| :----- | :------- | :----------------------------------------------------------------------- |
| root      | STRING | True     | The tree hash of a set of proofs that have been stored in the dictionary |

This RPC returns a dictionary of root hashes mapped to dictionaries of key value pairs of 'proofs'.

<details>
<summary>Example</summary>

```json
chia rpc wallet vc_get_proofs_for_root '{"root": "96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3"}'
```

Response:

```json
{
    "proofs": {
        "example_proof_1": "example_value_1",
        "example_proof_2": "example_value_2"
    },
    "success": true
}
```

</details>

---

### `vc_mint`

Functionality: Mint a Verifiable Credential using the assigned DID
        
Usage: chia rpc wallet [OPTIONS] vc_mint [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter      | Type   | Required | Description                                                                          |
| :------------- | :----- | :------- | :----------------------------------------------------------------------------------- |
| did_id         | STRING | True     | The ID of the DID that will be minting the VC                                        |
| target_address | STRING | False    | The address where the VC will be sent upon minting [Default: send to minting wallet] |
| fee            | NUMBER | False    | An optional blockchain fee, in mojos                                                 |

This RPC returns a `vc_record` containing all the information of the soon-to-be-confirmed VC, as well as any relevant transactions.

<details>
<summary>Example</summary>

If the Proof Provider does not yet have a DID, you can mint one now:

```json
chia wallet did create -f 1967195615 -n Provider_DID -m 0.0001
```

Response:

```json
Successfully created a DID wallet with name Provider_DID and id 2 on key 1967195615
Successfully created a DID did:chia:1q29qvfzp4hv6kwyrcn22gstkx0yry7dukek8pd4spmcmtzd5m2ysk52jrn in the newly created DID wallet
```

Next, mint a VC, providing a DID and a an optional target address:

```json
chia rpc wallet vc_mint '{"did_id": "did:chia:1q29qvfzp4hv6kwyrcn22gstkx0yry7dukek8pd4spmcmtzd5m2ysk52jrn", "target_address": "txch1zvthh0u8v63tcs75fmy7s7ulprl37pz3l4uhtkj5752yqdt9uu2sr4cxfa", "fee": 100000000}'
```

The response will give a complete spend bundle, as well as the VC record:

```json
{
    "success": true,
    "transactions": [
        {
            "additions": [
                {
                    "amount": 1,
                    "parent_coin_info": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                    "puzzle_hash": "0xa0631f78e1f77cf38c447745d9b64f3016c504df5b426551ef5a75b737cbea09"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                    "puzzle_hash": "0x66713c00a343c14e0929fbae0435789a4d86fe573ea07c46c13cea182be52247"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                    "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
                },
                {
                    "amount": 4999799999998,
                    "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                    "puzzle_hash": "0x96bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5"
                }
            ],
            "amount": 1,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1686810641,
            "fee_amount": 100000000,
            "memos": {
                "34fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c": "13177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e715"
            },
            "name": "0xf20cf177e31898f15f4b82542b7529d7dc89bde7fe9a7d0af5d2197996f1183c",
            "removals": [
                {
                    "amount": 1,
                    "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                    "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                    "puzzle_hash": "0xa0631f78e1f77cf38c447745d9b64f3016c504df5b426551ef5a75b737cbea09"
                },
                {
                    "amount": 4999899999999,
                    "parent_coin_info": "0x82b6d7ed7aac0662437036ddd7db24d667354d405d5d70ab2c2f04e64b7913ed",
                    "puzzle_hash": "0x96bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": {
                "aggregated_signature": "0x94510b28d392f7bf8a9defab72afbd95faf1fd1045617db4ce1106cb6e7f755b9c21dab7ef133e19de4ebbe0307ace2c1578d00a76c7a4131b78d7e591f75c8f44992b0717565e6524761086d512e9aefe9f87a41f2fd073eafc645e33da4272",
                "coin_spends": [
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                            "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
                        },
                        "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080",
                        "solution": "0xffa0a0631f78e1f77cf38c447745d9b64f3016c504df5b426551ef5a75b737cbea09ff01ff8080"
                    },
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                            "puzzle_hash": "0xa0631f78e1f77cf38c447745d9b64f3016c504df5b426551ef5a75b737cbea09"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa075ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871da0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3affff04ff02ffff04ff05ffff04ff17ffff04ff2fffff04ff0bffff04ffff02ff5fff81bf80ff8080808080808080ffff04ffff01ffffff02ff3304ff01ff0101ffff02ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff14ff3880ffff0bff12ffff0bff12ffff0bff14ff2c80ff0980ffff0bff12ff0bffff0bff14ff8080808080ff8080808080ffff010b80ff0180ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff5fffff01ffff80ff80ff8080808080808080808080ffff04ffff03ff820b7fff820b7fffff04ff3cff808080ffff02ffff03ff81bfffff01ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff8201bfffff04ffff02ffff03ffff09ff82023fff2880ffff01ff02ffff03ffff18ff820b3fffff010180ffff01ff02ffff03ffff20ff82027f80ffff01ff04ff82033fffff04ff82057fffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff0180ffff01ff02ffff03ffff09ff82023fffff0181f680ffff01ff02ffff03ffff20ff82057f80ffff01ff04ff82027fffff04ffff02ff0bffff04ff2fffff04ff5fffff04ff82033fff8080808080ffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff018080ff0180ff80808080808080808080ffff01ff04ffff04ff28ffff04ffff02ff2effff04ff02ffff04ff05ffff04ff82047fffff04ffff0bff14ffff02ffff03ff82157fffff0182157fffff011780ff018080ffff04ffff02ffff03ff82157fffff0182157fffff011780ff0180ffff04ffff02ff3effff04ff02ffff04ff82097fff80808080ffff04ffff0bff14ff0580ff808080808080808080ff82067f8080ff822d7f8080ff018080ffff0bff12ffff0bff14ff1080ffff0bff12ffff0bff12ffff0bff14ff2c80ff0580ffff0bff12ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff14ff1480ff8080808080ffff0bff14ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff0180ffff04ffff01ff04ffff04ff13ff8080ffff04ff2bffff01ff80808080ffff04ffff01a0a8bd2fd3220e462b6914ec860f3454cb21df9313cf0d5897343d97bb381ce8edffff04ffff01ff02ffff01ff04ffff04ff04ffff04ffff02ff06ffff04ff02ffff04ff05ff80808080ff808080ffff02ff05ff0b8080ffff04ffff01ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ff01808080808080ff01808080",
                        "solution": "0xffffa0fe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70eff0180ff01ffffffff01ffff33ffa0de4e205ece6f8f5371726d1c9c7753c69e751d8a87a375ba19a41b72cf38d443ff01ffffa013177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e7158080ffff01ffa013177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e71580ffff81f6ffa0028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89ffa0056a82c50264e823bbb9e270d055c0b6cfe0456e4344f3654d862be6821dc97c8080ff80808080"
                    },
                    {
                        "coin": {
                            "amount": 4999899999999,
                            "parent_coin_info": "0x82b6d7ed7aac0662437036ddd7db24d667354d405d5d70ab2c2f04e64b7913ed",
                            "puzzle_hash": "0x96bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0924792adc6469af841fb4536a5673ef014e7239a9f27a57882c43dce4f6d1cd751c50d8007d22200a4c71484f9eb3ef8ff018080",
                        "solution": "0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa096bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5ff86048c1b4d8dfe80ffff34ff8405f5e10080ffff3dffa0eaf23db15c67a7693c35862cdb3f0383e7317341c970d5729b89bc4a32c1e00a80ffff3dffa0eb77136ed49c080085a557200c366eb21e4fa521d28e807a9eee5f3f9a901f318080ff8080"
                    }
                ]
            },
            "to_address": "txch1zvthh0u8v63tcs75fmy7s7ulprl37pz3l4uhtkj5752yqdt9uu2sr4cxfa",
            "to_puzzle_hash": "0x13177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e715",
            "trade_id": null,
            "type": 1,
            "wallet_id": 1
        }
    ],
    "vc_record": {
        "confirmed_at_height": 0,
        "vc": {
            "coin": {
                "amount": 1,
                "parent_coin_info": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                "puzzle_hash": "0x66713c00a343c14e0929fbae0435789a4d86fe573ea07c46c13cea182be52247"
            },
            "eml_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": null,
                "parent_name": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                "parent_proof_hash": null
            },
            "inner_puzzle_hash": "0x13177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e715",
            "launcher_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
            "proof_hash": null,
            "proof_provider": "0x028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89",
            "singleton_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x43309e9613bc9d8156b52cfe1e396b43448c59286bf0b3d3dd283eeea7eb9c09",
                "parent_name": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d"
            }
        }
    }
}
```

</details>

---

### `vc_spend`

Functionality: Spend a Verifiable Credential

Usage: chia rpc wallet [OPTIONS] vc_spend [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter              | Type   | Required | Description                                                                                                         |
| :--------------------- | :----- | :------- | :------------------------------------------------------------------------------------------------------------------ |
| vc_id                  | STRING | True     | The launcher ID of the Verifiable Credential to spend                                                               |
| new_puzhash            | None   | False    | The puzzle hash where the VC will be sent (can be derived from an XCH address)                                      |
| new_proof_hash         | None   | False    | Can be used to update the vc's proofs -- the new root/proof hash                                                    |
| provider_inner_puzhash | STRING | False    | Can be used to update the vc's proofs -- the proof provider's inner puzzle hash                                     |
| reuse_puzhash          | None   | False    | If this flag is set, then send the VC back to the same puzzle hash it came from [Default: generate new puzzle hash] |
| fee                    | None   | False    | An optional blockchain fee, in mojos                                                                                |

<details>
<summary>Example</summary>

```json
chia rpc wallet vc_spend '{"vc_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d", "new_puzhash": "0x0b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2", "new_proof_hash": "96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3", "fee": 100000000}'
```

Response:

```json
{
    "success": true,
    "transactions": [
        {
            "additions": [
                {
                    "amount": 4999699999998,
                    "parent_coin_info": "0x8c286c4ca46557cace8330d2d3c1c0651e24e73de11bb395ce3534bd5e2e06c1",
                    "puzzle_hash": "0x056b5fcf0f5d63b814ebef228c39869f3d7800c97a4e875623f7b0769e2b02e0"
                }
            ],
            "amount": 0,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1686811885,
            "fee_amount": 100000000,
            "memos": {},
            "name": "0x61008b8cb78524edaead83b108c5b2e13196b94e35ee4b6e3a70e13d9de46757",
            "removals": [
                {
                    "amount": 4999799999998,
                    "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                    "puzzle_hash": "0x96bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": null,
            "to_address": "txch1v6m950zmnmfnlvxn0cj8eyqndwwjp3lzdy2zpdnwe0sq334trrvqly67jv",
            "to_puzzle_hash": "0x66b65a3c5b9ed33fb0d37e247c90136b9d20c7e2691420b66ecbe008c6ab18d8",
            "trade_id": null,
            "type": 1,
            "wallet_id": 1
        },
        {
            "additions": [
                {
                    "amount": 1,
                    "parent_coin_info": "0x34fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c",
                    "puzzle_hash": "0x2c915311c3e0d8f23c5ab2647dd97a8abeb1db53c85ebdc9fea16b8745d1bdf1"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0x76fb0e14c60a40e75e599eca5675f3d888c8b1a2bb7b5ec4469cd122113641b6",
                    "puzzle_hash": "0xc42d18995581f5dc78f56a6acf47ae35f368b423557bfcfc2bccc33a7002f10a"
                },
                {
                    "amount": 4999699999998,
                    "parent_coin_info": "0x8c286c4ca46557cace8330d2d3c1c0651e24e73de11bb395ce3534bd5e2e06c1",
                    "puzzle_hash": "0x056b5fcf0f5d63b814ebef228c39869f3d7800c97a4e875623f7b0769e2b02e0"
                }
            ],
            "amount": 1,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1686811885,
            "fee_amount": 100000000,
            "memos": {
                "1b65e459f3b4c884735469f2dc0934282b98467787cefe19e4a4c241a05aba08": "0b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2",
                "57a6eddbe8adc608c91af70e247a45354ed64a8e5ed04085281a64a551d7c3e0": "9d0c741afc52e0101c01f43ef2a840124e53b95e8a3f2294e2e708cab8a96f67"
            },
            "name": "0xdc050892a3273270d37c3c90a229f5342f9df8def4818f1c37eacb521281715a",
            "removals": [
                {
                    "amount": 1,
                    "parent_coin_info": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                    "puzzle_hash": "0x66713c00a343c14e0929fbae0435789a4d86fe573ea07c46c13cea182be52247"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0x60d4eab71247ecf0ccad87afba98ee29715953947504f6c61a46f1ff66699319",
                    "puzzle_hash": "0xc42d18995581f5dc78f56a6acf47ae35f368b423557bfcfc2bccc33a7002f10a"
                },
                {
                    "amount": 4999799999998,
                    "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                    "puzzle_hash": "0x96bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": {
                "aggregated_signature": "0x94a67367131c31130baadaa872bbfd3499eabc76da4f82993a214adecdafeb7e916b2854979f1a436656d7a58b8b5fe813b6d6887351e01e12c9ced2bd2833f8173657c4d8b7f1fcee3adfb3b050b59cac6c10c961867be95132e85584af5a4a",
                "coin_spends": [
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                            "puzzle_hash": "0x66713c00a343c14e0929fbae0435789a4d86fe573ea07c46c13cea182be52247"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa075ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871da0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3affff04ff02ffff04ff05ffff04ff17ffff04ff2fffff04ff0bffff04ffff02ff5fff81bf80ff8080808080808080ffff04ffff01ffffff02ff3304ff01ff0101ffff02ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff14ff3880ffff0bff12ffff0bff12ffff0bff14ff2c80ff0980ffff0bff12ff0bffff0bff14ff8080808080ff8080808080ffff010b80ff0180ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff5fffff01ffff80ff80ff8080808080808080808080ffff04ffff03ff820b7fff820b7fffff04ff3cff808080ffff02ffff03ff81bfffff01ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff8201bfffff04ffff02ffff03ffff09ff82023fff2880ffff01ff02ffff03ffff18ff820b3fffff010180ffff01ff02ffff03ffff20ff82027f80ffff01ff04ff82033fffff04ff82057fffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff0180ffff01ff02ffff03ffff09ff82023fffff0181f680ffff01ff02ffff03ffff20ff82057f80ffff01ff04ff82027fffff04ffff02ff0bffff04ff2fffff04ff5fffff04ff82033fff8080808080ffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff018080ff0180ff80808080808080808080ffff01ff04ffff04ff28ffff04ffff02ff2effff04ff02ffff04ff05ffff04ff82047fffff04ffff0bff14ffff02ffff03ff82157fffff0182157fffff011780ff018080ffff04ffff02ffff03ff82157fffff0182157fffff011780ff0180ffff04ffff02ff3effff04ff02ffff04ff82097fff80808080ffff04ffff0bff14ff0580ff808080808080808080ff82067f8080ff822d7f8080ff018080ffff0bff12ffff0bff14ff1080ffff0bff12ffff0bff12ffff0bff14ff2c80ff0580ffff0bff12ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff14ff1480ff8080808080ffff0bff14ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff01ffa0028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da8980ffff04ffff01ff02ffff01ff02ffff01ff02ff02ffff04ff02ffff04ffff02ff05ffff04ff4fffff04ff81afffff04ffff04ff0bffff04ff17ffff04ff82016fff80808080ff8080808080ff80808080ffff04ffff01ff04ff15ffff04ff2dffff04ffff04ff09ff5d80ff80808080ff018080ffff04ffff01ff02ffff01ff02ffff01ff04ffff04ff02ffff04ffff0bff4fffff02ffff03ff81efffff01ff02ff0bffff04ff05ffff04ff81afff5f808080ffff010580ff0180ffff02ffff03ff81efffff0182016fffff0181af80ff018080ff808080ffff02ff17ff81bf8080ffff04ffff0147ff018080ffff04ffff01a0a0631f78e1f77cf38c447745d9b64f3016c504df5b426551ef5a75b737cbea09ffff04ffff01ff02ffff01ff02ffff01ff02ffff01ff02ff1effff04ff02ffff04ff0bffff04ff2fffff04ff5fffff04ff8205ffffff04ff820bffffff04ff8217ffffff04ffff02ff1affff04ff02ffff04ff17ffff04ffff02ff1affff04ff02ffff04ff05ffff04ffff0bff08ff8202ff80ffff04ffff02ff1affff04ff02ffff04ff82017fffff04ffff0bff08ff82017f80ff8080808080ffff04ff81bfff80808080808080ff8080808080ff80808080808080808080ffff04ffff01ffff01ff02ff02ffff03ff05ffff01ff0bff72ffff02ff16ffff04ff02ffff04ff09ffff04ffff02ff1cffff04ff02ffff04ff0dff80808080ff808080808080ffff016280ff0180ffffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ff0bff52ffff02ff16ffff04ff02ffff04ff05ffff04ffff02ff1cffff04ff02ffff04ff07ff80808080ff808080808080ffff0bff14ffff0bff14ff62ff0580ffff0bff14ff0bff428080ff02ff1affff04ff02ffff04ff0bffff04ffff0bff14ffff0bff08ff0b80ffff0bff14ffff0bff08ff81bf80ff178080ffff04ffff02ff1affff04ff02ffff04ff05ffff04ffff0bff08ff0580ffff04ff5fffff04ff82017fffff04ffff0bff08ff82017f80ffff04ff2fff808080808080808080ff808080808080ff018080ffff04ffff01a0b982796850336aabf9ab17c3f21e299f0c633444117ab5e9ebeafadf1860d9fcffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff01a04218fbebbb6f3c0907ebe8a672fa5d1e4bc655645a3a0073601e6c9b50b07c47ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0520e10fa83a9bf74c52870cf41a5c5e7bbaa82c0f5838276f27bd88b4886d4c7ffff04ffff01a053f87e8879fd7b0accd777ffe724b47373993c03d1814958211ecae6c69e6ec5ff0180808080808080ffff04ffff01a0dd12ebf70feba2ee45dc25b7de7a53a8cd9e82e0b5648fabea5e998b890ed86dff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ffff07ff5f80ffff01ff04ffff03ff8202dfffff04ff27ff8202df80ff8080ffff04ff8205dfffff04ffff04ffff04ff08ffff04ff82015fff808080ffff04ffff04ff14ffff04ffff0bffff0bff56ffff0bff0affff0bff0aff66ff0580ffff0bff0affff0bff76ffff0bff0affff0bff0aff66ffff0bff0affff0bff1cff0580ffff0bff0affff0bff1cff2780ffff0bff1cff0b80808080ffff0bff0affff0bff76ffff0bff0affff0bff0aff66ff819f80ffff0bff0aff66ff46808080ff46808080ff46808080ffff0bff82015fffff02ff1effff04ff02ffff04ff8202dfff80808080ff8205df8080ff808080ff808080ff80808080ffff01ff02ffff03ff5fffff01ff04ff80ffff04ff5fffff01ff80808080ffff01ff04ffff04ff27ff3780ffff01ff80ff80808080ff018080ff0180ffff04ffff01ffff46ff3f01ff02ffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff01808080ff0180808080ff018080ffff04ffff01a0056a82c50264e823bbb9e270d055c0b6cfe0456e4344f3654d862be6821dc97cffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff2fffff01ff02ffff03ffff09ff0bffff02ff16ffff04ff02ffff04ff5fff8080808080ffff01ff02ff5fff81bf80ffff01ff088080ff0180ffff01ff02ffff03ffff09ff17ffff02ff16ffff04ff02ffff04ff5fff8080808080ffff01ff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff5fff81bf80ff808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffff33ff0102ffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff16ffff04ff02ffff04ff09ff80808080ffff02ff16ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff17ffff01ff02ffff03ffff09ff47ff0880ffff01ff04ffff04ff08ffff04ffff0bff2affff0bff1cffff0bff1cff32ff0580ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff058080ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff0b8080ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff81a78080ffff0bff1cff32ff22808080ff22808080ff22808080ff22808080ff81e78080ffff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ff37ff80808080808080ffff01ff04ff27ffff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ff37ff8080808080808080ff0180ff8080ff0180ff018080ffff04ffff01a000848115554ea674131f89f311707a959ad3f4647482648f3fe91ba289131f51ffff04ffff01a0ae616e8425823c1267d088f82145c3107283379598c75723b55fa15daed2c89affff04ffff01a013177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e715ff0180808080ff01808080808080ff01808080",
                        "solution": "0xffffa075ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871dffa043309e9613bc9d8156b52cfe1e396b43448c59286bf0b3d3dd283eeea7eb9c09ff0180ff01ffffff80ffff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a54dca3865e1be909c2cd43aa941359f9dc92f8710e9e0489ee3b2b165c4f405bb58b900023c2db461dcb798ba0c51ddff018080ffff80ffff01ffff33ffa00b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2ff01ffffa00b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b28080ffff3cffa034fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c80ffff81f6ffffa075ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871dff0180ffff80ffa075ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d80ffffa03553b6d38735463d7615b2e6a43ddf73e0e1b8b45e565ccb69a1b5297f98fefbffa034fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7cffa096c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3ff80808080ff8080808080"
                    },
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0x60d4eab71247ecf0ccad87afba98ee29715953947504f6c61a46f1ff66699319",
                            "puzzle_hash": "0xc42d18995581f5dc78f56a6acf47ae35f368b423557bfcfc2bccc33a7002f10a"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b4aa30b444019fbfb436a327a7f322af99e3380fa34c835277f6377379c3a7f73898ff4544e3f82298e335ce21172e7fff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
                        "solution": "0xffffa0028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89ffa03553b6d38735463d7615b2e6a43ddf73e0e1b8b45e565ccb69a1b5297f98fefbff0180ff01ffff01ffff80ffff01ffff33ffa03553b6d38735463d7615b2e6a43ddf73e0e1b8b45e565ccb69a1b5297f98fefbff01ffffa09d0c741afc52e0101c01f43ef2a840124e53b95e8a3f2294e2e708cab8a96f678080ffff3effa038bf4d5abae25427698911de822b413d387463a935bdb329cefe8102b1a906e58080ff80808080"
                    },
                    {
                        "coin": {
                            "amount": 4999799999998,
                            "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                            "puzzle_hash": "0x96bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0924792adc6469af841fb4536a5673ef014e7239a9f27a57882c43dce4f6d1cd751c50d8007d22200a4c71484f9eb3ef8ff018080",
                        "solution": "0xff80ffff01ffff33ffa0056b5fcf0f5d63b814ebef228c39869f3d7800c97a4e875623f7b0769e2b02e0ff86048c1557acfe80ffff34ff8405f5e10080ffff3cffa00b62ff01d760abe4af1b8bf39a99613aea23a56be6b1a2c7959af89bf74930bd80ffff3dffa0c8d917f730580de2131feb9f1e96e2d6c2ab188dd06048411f3aa80b796fca2b8080ff8080"
                    }
                ]
            },
            "to_address": "txch1pdtvqfu9c3mvq4sjaqqvk9yn663vprt4hh3nq52eppa3084hx6eqjvak85",
            "to_puzzle_hash": "0x0b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2",
            "trade_id": null,
            "type": 1,
            "wallet_id": 4
        }
    ]
}
```

At this point, the credential has been transferred to the holder. 
In order for the holder to verify the VC, the holder will need to add the proofs manually to the local DB:

```json
chia rpc wallet vc_add_proofs '{"proofs": {"example_proof_1": "example_value_1", "example_proof_2": "example_value_2"}}'
```

Response:

```json
{
    "success": true
}
```

The holder can now view the VC and proofs:

```json
chia rpc wallet vc_get_list
{
    "proofs": {
        "96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3": {
            "example_proof_1": "example_value_1",
            "example_proof_2": "example_value_2"
        }
    },
    "success": true,
    "vc_records": [
        {
            "coin_id": "0x1b65e459f3b4c884735469f2dc0934282b98467787cefe19e4a4c241a05aba08",
            "confirmed_at_height": 2775043,
            "vc": {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0x34fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c",
                    "puzzle_hash": "0x2c915311c3e0d8f23c5ab2647dd97a8abeb1db53c85ebdc9fea16b8745d1bdf1"
                },
                "eml_lineage_proof": {
                    "amount": 1,
                    "inner_puzzle_hash": "0x70c5b7a4e29e3c7e0c39f8714a1590d2d6b96976b8dd4afc7982a63b4c9df4c5",
                    "parent_name": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                    "parent_proof_hash": "0x31ff76539d8585ec1d79e7269a3af3140b57716efc5544e34a28e0aabef14044"
                },
                "inner_puzzle_hash": "0x0b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2",
                "launcher_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                "proof_hash": "0x96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3",
                "proof_provider": "0x028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89",
                "singleton_lineage_proof": {
                    "amount": 1,
                    "inner_puzzle_hash": "0x571b5d6e68339f3726fdd7452992635b2ebedcabb8e92a93c56137ca360a0e28",
                    "parent_name": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d"
                }
            }
        }
    ]
}
```

</details>

---

### `vc_revoke`

Functionality: Revoke an on chain VC provided the correct DID is available

Usage: chia rpc wallet [OPTIONS] vc_revoke [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter     | Type    | Required | Description                                                                                                         |
| :------------ | :------ | :------- | :------------------------------------------------------------------------------------------------------------------ |
| vc_parent_id  | STRING  | True     | The parent ID of the VC coin                                                                                        |
| reuse_puzhash | None    | False    | If this flag is set, then send the VC back to the same puzzle hash it came from [Default: generate new puzzle hash] |
| fee           | INTEGER | False    | An optional blockchain fee, in mojos                                                                                |

<details>
<summary>Example</summary>

First, the proof provider can obtain the VC's `parent_coin_info` by calling `vc_get` on the launcher ID:

```json
chia rpc wallet vc_get '{"vc_id": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e"}'
```

Response:

```json
{
    "success": true,
    "vc_record": {
        "confirmed_at_height": 2813720,
        "vc": {
            "coin": {
                "amount": 1,
                "parent_coin_info": "0x1b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b",
                "puzzle_hash": "0xaff7139c2d31a2e4244d745baad309c857edf7dc4190e0619f475a80d1099906"
            },
            "eml_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x5f405810abf8d6e690cfcea3409300e71b23a8362b47068d88d7aaa296278aaf",
                "parent_name": "0x64c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136",
                "parent_proof_hash": "0x69037cc8334927175cffb30007545a95a9b06b56b0ebcec8213cc26adad3f43b"
            },
            "inner_puzzle_hash": "0x08db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088",
            "launcher_id": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e",
            "proof_hash": "0x96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3",
            "proof_provider": "0x1cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4b",
            "singleton_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x72404cf61f085ad55ee5632646aedb69e0129eaa4a8910a0f579c46f9bfd317c",
                "parent_name": "0x64c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136"
            }
        }
    }
}
```

Next, the proof provider can revoke the VC, passing in the `parent_coin_info` obtained above as the `vc_parent_id`:

```json
chia rpc wallet vc_revoke '{"vc_parent_id": "0x1b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b", "fee": 100000000}'
```

Response:

```bash
{
    "success": true,
    "transactions": [
        {
            "additions": [
                {
                    "amount": 1,
                    "parent_coin_info": "0xa3981ceeb0a4b0c443d0d9b7c9c6777960978f96b1c7f522111e31dce4076d07",
                    "puzzle_hash": "0x160c23f1632e49d5d2d978805d9319f242745f607525b72b55bee2a10e2206f2"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0xafa6c6e09641c42b484392772902be8809c76c7790dd39742606f045a14040c0",
                    "puzzle_hash": "0x56d7629bc6b66c3b6ab9765c53603961fe7fab44b5985e038ba06f56a3ad26b5"
                }
            ],
            "amount": 1,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1687537712,
            "fee_amount": 100000000,
            "memos": {
                "c5b0a0ad6dd223b30ba36f92c02bed3daae0c18112523bde11c4e3b41bbeea7e": "070216d3ac8d37d1fc72e4259c7a96103e4de49935c9a8b7ab7ebe78513fae02"
            },
            "name": "0xafdcc45f0ec1caf4d573b6702671c1c89ff57a0b8e8dc8a200a85b3e1f944600",
            "removals": [
                {
                    "amount": 1,
                    "parent_coin_info": "0x1b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b",
                    "puzzle_hash": "0xaff7139c2d31a2e4244d745baad309c857edf7dc4190e0619f475a80d1099906"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0x720630bc5e8d8dbddb297f96f765a1eec34e7fd9fc333f143c359cf16858d290",
                    "puzzle_hash": "0x56d7629bc6b66c3b6ab9765c53603961fe7fab44b5985e038ba06f56a3ad26b5"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": {
                "aggregated_signature": "0xa3bf587c41b621096a761b79482ceca9db46fa31641b4bbfd68187cfd210233c4a92f365dbd37f03483f50c95adf06fb0796ba0b73711a3ebcd1750e7f3da44bc20f5180c146863b11c3e77bb9e0f0d84722c032105b99cc26dfca718db9f385",
                "coin_spends": [
                    {
                        "coin": {
                            "amount": 4999699999998,
                            "parent_coin_info": "0x653a6248d7c2b308a35fd8b3f529c9dc485ba76f87621a4b62143edd06dd7be0",
                            "puzzle_hash": "0xc32479a76e578a51deb053c32a2116bb9cc3b80f49d26b5aaa58d032b3770058"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0aa8d1b491839d1b757fcf787787782e5502233955073b64d434f4dec0fa5f7c7c1fb1f5efc1a3afde7185deac8035925ff018080",
                        "solution": "0xff80ffff01ffff33ffa060e63f11c26184b3c6ee387db1bca32312ef49b1c69dfb1d663a03b6e92df0baff86048c0f61cbfe80ffff34ff8405f5e10080ffff3cffa05c32eabf1eb0f4a6c3eb3e059f5c40877c95ec65fa018afed02ca88128ffc6fc80ffff3dffa0960d6eef2fe3565dee96fd4fb912133c0ce5428cb6dc2578a9f9c5fea6027ff08080ff8080"
                    },
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0x1b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b",
                            "puzzle_hash": "0xaff7139c2d31a2e4244d745baad309c857edf7dc4190e0619f475a80d1099906"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0d2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4ea0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3affff04ff02ffff04ff05ffff04ff17ffff04ff2fffff04ff0bffff04ffff02ff5fff81bf80ff8080808080808080ffff04ffff01ffffff02ff3304ff01ff0101ffff02ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff14ff3880ffff0bff12ffff0bff12ffff0bff14ff2c80ff0980ffff0bff12ff0bffff0bff14ff8080808080ff8080808080ffff010b80ff0180ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff5fffff01ffff80ff80ff8080808080808080808080ffff04ffff03ff820b7fff820b7fffff04ff3cff808080ffff02ffff03ff81bfffff01ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff8201bfffff04ffff02ffff03ffff09ff82023fff2880ffff01ff02ffff03ffff18ff820b3fffff010180ffff01ff02ffff03ffff20ff82027f80ffff01ff04ff82033fffff04ff82057fffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff0180ffff01ff02ffff03ffff09ff82023fffff0181f680ffff01ff02ffff03ffff20ff82057f80ffff01ff04ff82027fffff04ffff02ff0bffff04ff2fffff04ff5fffff04ff82033fff8080808080ffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff018080ff0180ff80808080808080808080ffff01ff04ffff04ff28ffff04ffff02ff2effff04ff02ffff04ff05ffff04ff82047fffff04ffff0bff14ffff02ffff03ff82157fffff0182157fffff011780ff018080ffff04ffff02ffff03ff82157fffff0182157fffff011780ff0180ffff04ffff02ff3effff04ff02ffff04ff82097fff80808080ffff04ffff0bff14ff0580ff808080808080808080ff82067f8080ff822d7f8080ff018080ffff0bff12ffff0bff14ff1080ffff0bff12ffff0bff12ffff0bff14ff2c80ff0580ffff0bff12ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff14ff1480ff8080808080ffff0bff14ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff01ffa01cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4ba096c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3ffff04ffff01ff02ffff01ff02ffff01ff02ff02ffff04ff02ffff04ffff02ff05ffff04ff4fffff04ff81afffff04ffff04ff0bffff04ff17ffff04ff82016fff80808080ff8080808080ff80808080ffff04ffff01ff04ff15ffff04ff2dffff04ffff04ff09ff5d80ff80808080ff018080ffff04ffff01ff02ffff01ff02ffff01ff04ffff04ff02ffff04ffff0bff4fffff02ffff03ff81efffff01ff02ff0bffff04ff05ffff04ff81afff5f808080ffff010580ff0180ffff02ffff03ff81efffff0182016fffff0181af80ff018080ff808080ffff02ff17ff81bf8080ffff04ffff0147ff018080ffff04ffff01a08b75b2ced8cdd1081021552f490618fb8b0c39e46ee5c5f9d46b6b7f9d8a8a74ffff04ffff01ff02ffff01ff02ffff01ff02ffff01ff02ff1effff04ff02ffff04ff0bffff04ff2fffff04ff5fffff04ff8205ffffff04ff820bffffff04ff8217ffffff04ffff02ff1affff04ff02ffff04ff17ffff04ffff02ff1affff04ff02ffff04ff05ffff04ffff0bff08ff8202ff80ffff04ffff02ff1affff04ff02ffff04ff82017fffff04ffff0bff08ff82017f80ff8080808080ffff04ff81bfff80808080808080ff8080808080ff80808080808080808080ffff04ffff01ffff01ff02ff02ffff03ff05ffff01ff0bff72ffff02ff16ffff04ff02ffff04ff09ffff04ffff02ff1cffff04ff02ffff04ff0dff80808080ff808080808080ffff016280ff0180ffffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ff0bff52ffff02ff16ffff04ff02ffff04ff05ffff04ffff02ff1cffff04ff02ffff04ff07ff80808080ff808080808080ffff0bff14ffff0bff14ff62ff0580ffff0bff14ff0bff428080ff02ff1affff04ff02ffff04ff0bffff04ffff0bff14ffff0bff08ff0b80ffff0bff14ffff0bff08ff81bf80ff178080ffff04ffff02ff1affff04ff02ffff04ff05ffff04ffff0bff08ff0580ffff04ff5fffff04ff82017fffff04ffff0bff08ff82017f80ffff04ff2fff808080808080808080ff808080808080ff018080ffff04ffff01a0b982796850336aabf9ab17c3f21e299f0c633444117ab5e9ebeafadf1860d9fcffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff01a04218fbebbb6f3c0907ebe8a672fa5d1e4bc655645a3a0073601e6c9b50b07c47ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0520e10fa83a9bf74c52870cf41a5c5e7bbaa82c0f5838276f27bd88b4886d4c7ffff04ffff01a053f87e8879fd7b0accd777ffe724b47373993c03d1814958211ecae6c69e6ec5ff0180808080808080ffff04ffff01a0dd12ebf70feba2ee45dc25b7de7a53a8cd9e82e0b5648fabea5e998b890ed86dff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ffff07ff5f80ffff01ff04ffff03ff8202dfffff04ff27ff8202df80ff8080ffff04ff8205dfffff04ffff04ffff04ff08ffff04ff82015fff808080ffff04ffff04ff14ffff04ffff0bffff0bff56ffff0bff0affff0bff0aff66ff0580ffff0bff0affff0bff76ffff0bff0affff0bff0aff66ffff0bff0affff0bff1cff0580ffff0bff0affff0bff1cff2780ffff0bff1cff0b80808080ffff0bff0affff0bff76ffff0bff0affff0bff0aff66ff819f80ffff0bff0aff66ff46808080ff46808080ff46808080ffff0bff82015fffff02ff1effff04ff02ffff04ff8202dfff80808080ff8205df8080ff808080ff808080ff80808080ffff01ff02ffff03ff5fffff01ff04ff80ffff04ff5fffff01ff80808080ffff01ff04ffff04ff27ff3780ffff01ff80ff80808080ff018080ff0180ffff04ffff01ffff46ff3f01ff02ffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff01808080ff0180808080ff018080ffff04ffff01a0e00c460366d00066f75597edfb72ddfcfd0d336d67f85dc2671498900ba2810effff04ffff01ff02ffff01ff02ffff01ff02ffff03ff2fffff01ff02ffff03ffff09ff0bffff02ff16ffff04ff02ffff04ff5fff8080808080ffff01ff02ff5fff81bf80ffff01ff088080ff0180ffff01ff02ffff03ffff09ff17ffff02ff16ffff04ff02ffff04ff5fff8080808080ffff01ff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff5fff81bf80ff808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffff33ff0102ffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff16ffff04ff02ffff04ff09ff80808080ffff02ff16ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff17ffff01ff02ffff03ffff09ff47ff0880ffff01ff04ffff04ff08ffff04ffff0bff2affff0bff1cffff0bff1cff32ff0580ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff058080ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff0b8080ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff81a78080ffff0bff1cff32ff22808080ff22808080ff22808080ff22808080ff81e78080ffff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ff37ff80808080808080ffff01ff04ff27ffff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ff37ff8080808080808080ff0180ff8080ff0180ff018080ffff04ffff01a000848115554ea674131f89f311707a959ad3f4647482648f3fe91ba289131f51ffff04ffff01a0ae616e8425823c1267d088f82145c3107283379598c75723b55fa15daed2c89affff04ffff01a008db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088ff0180808080ff01808080808080ff01808080",
                        "solution": "0xffffa064c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136ffa072404cf61f085ad55ee5632646aedb69e0129eaa4a8910a0f579c46f9bfd317cff0180ff01ffffff01ffff02ffff01ff02ffff01ff04ffff04ff18ffff04ffff02ff2effff04ff02ffff04ff05ffff04ffff0bff12ffff0bff3cff0580ffff0bff12ffff0bff3cff81bf80ff0b8080ffff04ffff02ff2effff04ff02ffff04ff17ffff04ffff0bff3cff1780ffff04ff82017fffff04ff8202ffffff04ffff0bff3cff8202ff80ffff04ffff02ff2effff04ff02ffff04ff2fffff04ffff0bff3cff2f80ffff04ff8205ffffff04ffff0bff3cff820bff80ff80808080808080ff808080808080808080ff808080808080ff808080ffff04ffff04ff10ffff04ff8217ffff808080ffff04ffff04ff14ffff04ff820bffffff04ff8217ffff80808080ffff04ffff04ff2cffff04ff82bfffff808080ffff04ffff04ffff0181f6ffff04ff822fffffff04ffff04ff825fffffff04ff81bfff808080ffff04ffff04ff83027fffffff04ff83057fffffff04ff80ffff04ff5fff8080808080ff8080808080ff808080808080ffff04ffff01ffffff4948ff33ff3c01ffff02ff02ffff03ff05ffff01ff0bff76ffff02ff3effff04ff02ffff04ff09ffff04ffff02ff1affff04ff02ffff04ff0dff80808080ff808080808080ffff016680ff0180ffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ffff0bff56ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff1affff04ff02ffff04ff07ff80808080ff808080808080ff0bff12ffff0bff12ff66ff0580ffff0bff12ff0bff468080ff018080ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0520e10fa83a9bf74c52870cf41a5c5e7bbaa82c0f5838276f27bd88b4886d4c7ffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff01a000848115554ea674131f89f311707a959ad3f4647482648f3fe91ba289131f51ffff04ffff01a0664e6e57ac6a184334a3e743c446c5d28c0dd2ae6f84bad6dacec29ab7a0bd43ff01808080808080ffffa0d2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4effa0534194946506ac64d2cc4e72f4808e978e7cfac4c70686f7226184fde279c4bdffa0e00c460366d00066f75597edfb72ddfcfd0d336d67f85dc2671498900ba2810effa0e360bd07b1d45411f7a1d28741de03b66ab29dce584e3bf8c3f80ae5c7070f92ffa008db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088ff01ffffa064c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136ffa05f405810abf8d6e690cfcea3409300e71b23a8362b47068d88d7aaa296278aafff0180ffa069037cc8334927175cffb30007545a95a9b06b56b0ebcec8213cc26adad3f43bffa0561beddfb34781d98af7c9beaa67ededc32b566b43ca8b01b2bf141df940a613ffffa0c6fd05ffe8312a09f90fd3ac3f45442d3adc24a3ffb5fd6934939a13565c52b1ffa0a3981ceeb0a4b0c443d0d9b7c9c6777960978f96b1c7f522111e31dce4076d078080808080"
                    },
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0x720630bc5e8d8dbddb297f96f765a1eec34e7fd9fc333f143c359cf16858d290",
                            "puzzle_hash": "0x56d7629bc6b66c3b6ab9765c53603961fe7fab44b5985e038ba06f56a3ad26b5"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa01cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b096ba725bd3974fcb97a03d68b39605239c00050f6021a6f029d0e3c12ba0e15320608b69de24fab81e9983eb8c16b9e3ff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa01cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
                        "solution": "0xffffa0ddb4dcaa641f2c10b7373a2bbf8571b4f761aea557f27e816a913a0b1fb5d1ecffa0c6fd05ffe8312a09f90fd3ac3f45442d3adc24a3ffb5fd6934939a13565c52b1ff0180ff01ffff01ffff80ffff01ffff33ffa0c6fd05ffe8312a09f90fd3ac3f45442d3adc24a3ffb5fd6934939a13565c52b1ff01ffffa0070216d3ac8d37d1fc72e4259c7a96103e4de49935c9a8b7ab7ebe78513fae028080ffff3dffa0960d6eef2fe3565dee96fd4fb912133c0ce5428cb6dc2578a9f9c5fea6027ff080ffff3effa0e707101647c483550aafb4221862a068a89b001ed2d9ff8c4b4b7d747deda7d78080ff80808080"
                    }
                ]
            },
            "to_address": "txch1prde27n2k5338dz2qqn8dq5z4cc50kcr6efxhx8rnd9ev2savzyq0ew26n",
            "to_puzzle_hash": "0x08db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088",
            "trade_id": null,
            "type": 1,
            "wallet_id": 4
        },
        {
            "additions": [
                {
                    "amount": 4999599999998,
                    "parent_coin_info": "0xdeb812bdc6ba2999876f9088c057867694faf4c0a3cfcb384a578d673d50347f",
                    "puzzle_hash": "0x60e63f11c26184b3c6ee387db1bca32312ef49b1c69dfb1d663a03b6e92df0ba"
                }
            ],
            "amount": 0,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1687537712,
            "fee_amount": 100000000,
            "memos": {},
            "name": "0xe1adf82a6480190c943f8e37fe4d7f5945dd9fbe2284bf4cb60075b5e33f210f",
            "removals": [
                {
                    "amount": 4999699999998,
                    "parent_coin_info": "0x653a6248d7c2b308a35fd8b3f529c9dc485ba76f87621a4b62143edd06dd7be0",
                    "puzzle_hash": "0xc32479a76e578a51deb053c32a2116bb9cc3b80f49d26b5aaa58d032b3770058"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": null,
            "to_address": "txch169ga7klgwgqlu48anudsmq806f6trn95whz7mztu9aw663ygr8nqkuaxmk",
            "to_puzzle_hash": "0xd151df5be87201fe54fd9f1b0d80efd274b1ccb475c5ed897c2f5dad448819e6",
            "trade_id": null,
            "type": 1,
            "wallet_id": 1
        }
    ]
}
```
</details>

---

### Obtain proof hash

In order to obtain a proof hash:
1. Sort the proofs into reverse alphabetical order by key
2. Transform the proofs' key/value pairs into a binary tree by recursively splitting the list in half
3. Recursively traverse the tree, hashing the leaves until the root is reached

The following example accomplishes each of these steps in Javascript:

<details>
<summary>Javascript Example</summary>

In order to run this example:

1. Copy the script to a text editor
2. Replace the keys and values in the last line with the keys and values from your own proof(s)
3. Save the script locally, for example, as `calculate_proof_hash.js`
4. Run the script by calling, for example, `node calculate_proof_hash.js`

```javascript
const { strict: assert } = require("node:assert");
const crypto = require("crypto");

const std_hash = (s) => crypto.createHash("sha256").update(s).digest("hex");

const sort_pairs = (pairs) =>
  pairs.sort(([a], [b]) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });

const CHIA_TREE_HASH_ATOM_PREFIX = "01";
const CHIA_TREE_HASH_PAIR_PREFIX = "02";

const tree_hash = (node) => {
  if (Array.isArray(node)) {
    // Only supporting pairs and utf-8 string/boolean atoms
    assert.equal(node.length, 2);

    const left_hash = tree_hash(node[0]);
    const right_hash = tree_hash(node[1]);

    // Hashes pair
    return std_hash(Buffer.concat([Buffer.from(CHIA_TREE_HASH_PAIR_PREFIX, "hex"), Buffer.from(left_hash, "hex"), Buffer.from(right_hash, "hex")]));
  } else {
    // Hashes string key
    if (typeof node === "string") {
      return std_hash(Buffer.concat([Buffer.from(CHIA_TREE_HASH_ATOM_PREFIX, "hex"), Buffer.from(node, "utf-8")]));
    }

    // Hashes boolean value
    if (typeof node === "boolean") {
      return std_hash(Buffer.concat([Buffer.from(CHIA_TREE_HASH_ATOM_PREFIX, "hex"), Buffer.from(node ? "01" : "", "hex")]));
    }

    // Only supporting pairs containing string keys and boolean values
    throw new Error("Unsupported type passed to hash function");
  }
};

// Convert sorted listed to binary tree to be hashed
const list_to_binary_tree = (objects) => {
  if (objects.length == 1) {
    return objects[0];
  }

  const mid = Math.floor(objects.length / 2);
  const first_half = objects.slice(0, mid);
  const second_half = objects.slice(mid, objects.length);

  return [list_to_binary_tree(first_half), list_to_binary_tree(second_half)];
};

const calculate_root_hash = (proofs) => {
  const kv_pairs = Object.entries(proofs);
  const sorted = sort_pairs(kv_pairs);
  const binary_tree = list_to_binary_tree(sorted);
  const result = tree_hash(binary_tree);
  return result;
};

console.log(calculate_root_hash({"example_proof_1": "example_value_1", "example_proof_2": "example_value_2"}));
```

The script will output the proof hash for the proofs your entered. In this example, the output is:

`96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3`

</details>