---
sidebar_label: NFTs
title: NFT RPC
slug: /nft-rpc
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

To run the same command on Windows, you need to escape the quotes with backslashes. In other words, add a \ before each double quote, such that:

    "fee" becomes \"fee\"
    "1000" becomes \"1000\"
    etc

</details>

## Reference

### `nft_add_uri`

Functionality: Add a new URI to the location URI list

Usage: chia rpc wallet [OPTIONS] nft_add_uri [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag          | Type       | Required | Description                                                                                                                                                                              |
| :------------ | :--------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wallet_id     | NUMBER     | True     | The Wallet ID of the DID wallet to transfer                                                                                                                                              |
| nft_coin_id   | HEX STRING | True     | The coin ID of the NFT on which to add a URI                                                                                                                                             |
| key           | STRING     | True     | Must be either `u` (data URI), `mu` (metadata URI), or `lu` (license URI)                                                                                                                |
| uri           | STRING     | True     | The URI to add                                                                                                                                                                           |
| fee           | NUMBER     | False    | The one-time blockchain fee to be used upon adding a URI                                                                                                                                 |
| reuse_puzhash | BOOLEAN    | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml |

:::info

- You can only update one type of key in one spend, and you can only add a single URI per spend
- The new URI will be prepended to the existing list
- If the new URI is inaccessible, some wallets may not continue to traverse the URI list

:::

<details>
<summary>Example</summary>

```json
chia rpc wallet nft_add_uri '
{
    "wallet_id": 4,
    "nft_coin_id": "0x9bcf429079bd8e394658a3f0c43c6641c9f92d0dcc1770eeb6be6588a49fc925",
    "key": "mu",
    "uri": "https://new_metadata_uri.com"
}'
```

Response:

```json
{
  "spend_bundle": {
    "aggregated_signature": "0xaf0401904105c62c492b79f2b812ef9290b74988059e48248f60f6d46fd3a28bc228c19b83ded7eed5551ddb58b5b80010525bcf0f57744fdd8a057707a1abd248110ed9398d294859cdf6929535309606ac7c20f49bc18a4b90dbb2342d03a6",
    "coin_solutions": [
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x1a17730f282825e698761c131f661180523fcb1451341d618a8bee4654e8f92f",
          "puzzle_hash": "0xc2100e028804d428d6a753aa4bb7ce71808db02d780ff817a136575b9fd0f0ce"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0821fdd13fe209466f1c69d82eb951cf630d28e901c2e14285d8a574dbde034c4a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff01ff0180808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a031f5e810e2ad078817e8b047306c877ad82c77511aa235179c4a98af413f162affff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780ffff68a014836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0ffff826d75ffbb68747470733a2f2f6d657461646174615f6578616d706c652e636f6d2c2068747470733a2f2f6d657461646174615f6578616d706c65322e636f6d80ffff826c75ffb968747470733a2f2f6c6963656e73655f6578616d706c652e636f6d2c2068747470733a2f2f6c6963656e73655f6578616d706c65322e636f6d80ffff82736e2affff827374820539ffff826d68a0868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823effff826c68a0358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a8280ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff88ad4cd55cf7ad6414ff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0128ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010880ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a078b4462709594b0f380110b83dfb33708597638100f0c08367ee9a05ee16329fffff04ffff01a0d590645dc77e25f22ffe37846e73868a99179d33de11648efaa286bc341936eaffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bff2cff058080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0821fdd13fe209466f1c69d82eb951cf630d28e901c2e14285d8a574dbde034c4a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a00fe4e859760b755980c9a92c91459b75eb4f02135ace8d2731eca0e89ceef1fbffff04ffff0182012cff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b2a63d4000a59028b200cd51027a5b6b07916ad2fe3bf2ef09d606c2a84d968ed41ff81aeb9b901f67250f54f49d0de5ff018080ff018080808080ff018080808080ff01808080",
        "solution": "0xffffa0821fdd13fe209466f1c69d82eb951cf630d28e901c2e14285d8a574dbde034c4ffa03184bbf00ead49d2b81b1fd4dcc0765dd7405a51189b7a63efe7b9a6c70a4413ff0180ff01ffffffff80ffff01ffff33ffa05e44b1146da65a86a0625c73998c14dd9629f3a1dfa0657861af1982fb27fa8fff01ffffa05e44b1146da65a86a0625c73998c14dd9629f3a1dfa0657861af1982fb27fa8f8080ffff81e8ffff02ffff01ff04ffff04ffff02ffff03ffff22ff27ff3780ffff01ff02ffff03ffff21ffff09ff27ffff01826d7580ffff09ff27ffff01826c7580ffff09ff27ffff01758080ffff01ff02ff02ffff04ff02ffff04ff05ffff04ff27ffff04ff37ff808080808080ffff010580ff0180ffff010580ff0180ffff04ff0bff808080ffff01ff808080ffff04ffff01ff02ffff03ff05ffff01ff02ffff03ffff09ff11ff0b80ffff01ff04ffff04ff0bffff04ff17ff198080ff0d80ffff01ff04ff09ffff02ff02ffff04ff02ffff04ff0dffff04ff0bffff04ff17ff8080808080808080ff0180ff8080ff0180ff018080ffff826d759c68747470733a2f2f6e65775f6d657461646174615f7572692e636f6d8080ff8080808080"
      }
    ]
  },
  "success": true,
  "wallet_id": 4
}
```

Show the updated NFT:

```json
chia rpc wallet nft_get_nfts '{"wallet_id": 4}'
```

Response:

```json
{
    "nft_list": [
        {
            "chain_info": "((117 "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg") (104 . 0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0) (28021 "https://new_metadata_uri.com" "https://metadata_example.com", "https://metadata_example2.com") (27765 "https://license_example.com", "https://license_example2.com") (29550 . 1) (29556 . 5) (28008 . 0x868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e) (27752 . 0x358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82))",
            "data_hash": "0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0",
            "data_uris": [
                "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg"
            ],
            "launcher_id": "0x821fdd13fe209466f1c69d82eb951cf630d28e901c2e14285d8a574dbde034c4",
            "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
            "license_hash": "0x358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82",
            "license_uris": [
                "https://license_example.com",
                "https://license_example2.com"
            ],
            "metadata_hash": "0x868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e",
            "metadata_uris": [
                "https://new_metadata_uri.com",
                "https://metadata_example.com",
                "https://metadata_example2.com"
            ],
            "mint_height": 1127304,
            "nft_coin_id": "0x8c94b2de6edd0686d5f60c8b879341d0cb50d17b8b404119cb6a55f18528c768",
            "owner_did": "0xd590645dc77e25f22ffe37846e73868a99179d33de11648efaa286bc341936ea",
            "pending_transaction": false,
            "royalty_percentage": 300,
            "royalty_puzzle_hash": "0x0fe4e859760b755980c9a92c91459b75eb4f02135ace8d2731eca0e89ceef1fb",
            "edition_number": 1,
            "edition_total": 5,
            "supports_did": true,
            "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
        }
    ],
    "success": true,
    "wallet_id": 4
}
```

</details>

---

### `nft_calculate_royalties`

Functionality: Given one or more NFTs to be exchanged for one or more fungible assets, calculate the correct royalty payments.

Usage: chia rpc wallet [OPTIONS] nft_calculate_royalties [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Parameter       | Sub-Parameter                                                                   | Required | Description                                                                                                                                                                                                                                                     |
| :-------------- | :------------------------------------------------------------------------------ | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| royalty_assets  | Each royalty asset requires three sub-parameters, listed on the following lines | False    | A list of NFTs for which to calculate royalties. If this parameter is not included, then nothing will be returned                                                                                                                                               |
|                 | asset                                                                           | True     | The asset ID of the NFT to be traded. This is only used for display in the response; a bogus value may be used                                                                                                                                                  |
|                 | royalty_address                                                                 | True     | The address where the royalties will be sent. A bogus value may be used                                                                                                                                                                                         |
|                 | royalty_percentage                                                              | True     | The number of basis points in the royalty, with three significant digits. For example, a value of `321` equates to a 3.21% royalty                                                                                                                              |
| fungible_assets | Each fungible asset requires two sub-parameters, listed on the following lines  | False    | The assets against which to calculate royalties. If this parameter is not included, no royalties will be returned                                                                                                                                               |
|                 | asset                                                                           | True     | The name of the asset for which to trade one or more NFTs. A bogus value may be used. Standard naming convention is `xch` for XCH or the asset ID for CATs. Note that no royalties are calculated for NFT:NFT trades, so NFT assets should not be included here |
|                 | amount                                                                          | True     | The amount (in mojos) to trade the NFT(s) for                                                                                                                                                                                                                   |

A few things to note:

- If more than one NFT is being traded, the royalties will be divided by the number of NFTs. For example:
  - If 4 NFTs are being traded for 1 XCH, then each NFT will have an assumed price of 0.25 XCH
    - If the royalty for each NFT is 10%, then each NFT will receive a 0.025 XCH royalty, for a total royalty of 0.1
    - If the royalties are 10%, 8%, 5%, and 3%, then the NFTs will receive 0.025 XCH, 0.02 XCH, 0.0125 XCH, and 0.0075 XCH, for a total royalty of 0.65 XCH
- If the NFTs are being traded for more than one fungible asset, then the royalties will be calculated for each asset individually
  - For example, if 1 NFT is being traded for both 1 XCH and 1000 SBX and it carries a 10% royalty, then the royalties shall be 0.1 XCH and 100 SBX for this sale
- If multiple NFTs are being traded for multiple fungible assets, then both of the above rules will be applied
- When NFTs are traded for other NFTs, no royalties are exchanged
- Although this RPC has multiple required parameters, the `royalty_percentage` and `amount` are the only values used in these calculations. The `asset` is only required for display in the solution; it's just a naming convention to use `xch` or the `asset_id`

<details>
<summary>Example</summary>

```json
chia rpc wallet nft_calculate_royalties '{
    "royalty_assets": [
        {
            "asset": "nft1sy37ezgaqjzg3mg3pwhltvz8ukc3uh9yaeagrs46qj4l8mdy7pmsun32tp",
            "royalty_address": "xch120ywvwahucfptkeuzzdpdz5v0nnarq5vgw94g247jd5vswkn7rls35y2gc",
            "royalty_percentage": 300
        },
        {
            "asset": "nft1au09xq3d7dzjq4mt3lmxg97tay85grttc3nwmrx5wksmhkczx2tqc5twgs",
            "royalty_address": "xch1dkj0aju6kkk24mwmwk99t5z0clnn5zw5rz9k7yg58yur747acgsqmy889v",
            "royalty_percentage": 777
        }
    ],
    "fungible_assets": [
        {
            "asset": "xch",
            "amount": 1000000000000
        },
        {
            "asset": "a628c1c2c6fcb74d53746157e438e108eab5c0bb3e5c80ff9b1910b3e4832913",
            "amount": 1000
        }
    ]
}'
```

Response:

```json
{
  "nft1au09xq3d7dzjq4mt3lmxg97tay85grttc3nwmrx5wksmhkczx2tqc5twgs": [
    {
      "address": "xch1dkj0aju6kkk24mwmwk99t5z0clnn5zw5rz9k7yg58yur747acgsqmy889v",
      "amount": 38850000000,
      "asset": "xch"
    },
    {
      "address": "xch1dkj0aju6kkk24mwmwk99t5z0clnn5zw5rz9k7yg58yur747acgsqmy889v",
      "amount": 38,
      "asset": "a628c1c2c6fcb74d53746157e438e108eab5c0bb3e5c80ff9b1910b3e4832913"
    }
  ],
  "nft1sy37ezgaqjzg3mg3pwhltvz8ukc3uh9yaeagrs46qj4l8mdy7pmsun32tp": [
    {
      "address": "xch120ywvwahucfptkeuzzdpdz5v0nnarq5vgw94g247jd5vswkn7rls35y2gc",
      "amount": 15000000000,
      "asset": "xch"
    },
    {
      "address": "xch120ywvwahucfptkeuzzdpdz5v0nnarq5vgw94g247jd5vswkn7rls35y2gc",
      "amount": 15,
      "asset": "a628c1c2c6fcb74d53746157e438e108eab5c0bb3e5c80ff9b1910b3e4832913"
    }
  ],
  "success": true
}
```

</details>

---

### `nft_count_nfts`

Functionality: Count the number of NFTs in a wallet

Usage: chia rpc wallet [OPTIONS] nft_count_nfts [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag      | Type   | Required | Description                                                                  |
| :-------- | :----- | :------- | :--------------------------------------------------------------------------- |
| wallet_id | NUMBER | False    | The ID of the wallet in which to count NFTs [Default: null (count all NFTs)] |

<details>
<summary>Example 1</summary>

Specify the correct NFT wallet:

```json
chia rpc wallet nft_count_nfts '{"wallet_id": 2}'
```

Response:

```json
{
  "count": 6,
  "success": true,
  "wallet_id": 2
}
```

</details>

<details>
<summary>Example 2</summary>

If `wallet_id` is not specified, it will be treated as `null`:

```json
chia rpc wallet nft_count_nfts
```

Response:

```json
{
  "count": 6,
  "success": true,
  "wallet_id": null
}
```

</details>

<details>
<summary>Example 3</summary>

If a non-NFT wallet is specified, an error will be thrown:

```json
chia rpc wallet nft_count_nfts '{"wallet_id": 6}'
```

Response:

```json
Request failed: {'error': 'wallet id 6 is of type CATWallet but type NFTWallet is required', 'success': False}
```

</details>

---

### `nft_get_by_did`

Functionality: Show the NFT wallet associated with a DID

Usage: chia rpc wallet [OPTIONS] nft_get_by_did [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag   | Type   | Required | Description           |
| :----- | :----- | :------- | :-------------------- |
| did_id | NUMBER | True     | The DID ID to examine |

<details>
<summary>Example</summary>

```json
chia rpc wallet nft_get_by_did '{"did_id": "did:chia:1kzxqrt8f2h8psr8zuzen9dxgmxx5v35s0rj3jy637qjannu3zlesds0el5"}'
```

Response:

```json
{
  "success": true,
  "wallet_id": 5
}
```

</details>

---

### `nft_get_info`

Functionality: Get info about an NFT

Usage: chia rpc wallet [OPTIONS] nft_get_info [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag      | Type   | Required | Description                                          |
| :-------- | :----- | :------- | :--------------------------------------------------- |
| coin_id   | NUMBER | True     | The coin ID of the NFT about which to retrieve info  |
| wallet_id | NUMBER | False    | The Wallet ID of the NFT from which to retrieve info |

:::info

`coin_id` can refer to the specific `nft_coin_id` pertaining to this NFT, or to the `launcher_id`, or to the bech32m encoded launcher id

:::

<details>
<summary>Example 1</summary>

Get info for an NFT that is owned locally:

```json
chia rpc wallet nft_get_info '{
    "wallet_id": 4,
    "coin_id": "0x821fdd13fe209466f1c69d82eb951cf630d28e901c2e14285d8a574dbde034c4"
}'
```

Response:

```json
{
    "nft_info": {
        "chain_info": "((117 "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg") (104 . 0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0) (28021 "https://metadata_example.com", "https://metadata_example2.com") (27765 "https://license_example.com", "https://license_example2.com") (29550 . 1) (29556 . 5) (28008 . 0x868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e) (27752 . 0x358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82))",
        "data_hash": "0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0",
        "data_uris": [
            "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg"
        ],
        "launcher_id": "0x821fdd13fe209466f1c69d82eb951cf630d28e901c2e14285d8a574dbde034c4",
        "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
        "license_hash": "0x358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82",
        "license_uris": [
            "https://license_example.com",
            "https://license_example2.com"
        ],
        "metadata_hash": "0x868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e",
        "metadata_uris": [
            "https://metadata_example.com",
            "https://metadata_example2.com"
        ],
        "mint_height": 1127304,
        "nft_coin_id": "0x9bcf429079bd8e394658a3f0c43c6641c9f92d0dcc1770eeb6be6588a49fc925",
        "owner_did": "0xd590645dc77e25f22ffe37846e73868a99179d33de11648efaa286bc341936ea",
        "pending_transaction": false,
        "royalty_percentage": 300,
        "royalty_puzzle_hash": "0x0fe4e859760b755980c9a92c91459b75eb4f02135ace8d2731eca0e89ceef1fb",
        "edition_number": 1,
        "edition_total": 5,
        "supports_did": true,
        "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
    },
    "success": true
}
```

</details>

<details>
<summary>Example 2</summary>

In the case where the NFT is not owned by the local wallet, you can obtain info from its NFT ID:

```json
chia rpc wallet nft_get_info '{"coin_id":"nft1ks2cqah7u6hjtj2q8vaem9a8e9n6v8rtxlzxzjs6zev8x3djevtq2kd8wn"}'
```

Response:

```json
{
  "nft_info": {
    "chain_info": "((117 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.gif\") (104 . 0x7a6eedd652d0e6d315e691e87f5098e858bfe646122d1a8759a40fcf3efb024b) (28021 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.json\") (27765 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/license.pdf\") (29550 . 1) (29556 . 1) (28008 . 0xb2214ff82ef10a57f653fd09e761c3fabe630996300f90f6fbefcb4f65904c8b) (27752 . 0x2267456bd2cef8ebc2f22a42947b068bc3b138284a587feda2edfe07a3577f50))",
    "data_hash": "0x7a6eedd652d0e6d315e691e87f5098e858bfe646122d1a8759a40fcf3efb024b",
    "data_uris": [
      "https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.gif"
    ],
    "edition_number": 1,
    "edition_total": 1,
    "launcher_id": "0xb4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16",
    "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
    "license_hash": "0x2267456bd2cef8ebc2f22a42947b068bc3b138284a587feda2edfe07a3577f50",
    "license_uris": [
      "https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/license.pdf"
    ],
    "metadata_hash": "0xb2214ff82ef10a57f653fd09e761c3fabe630996300f90f6fbefcb4f65904c8b",
    "metadata_uris": [
      "https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.json"
    ],
    "mint_height": 2202579,
    "minter_did": "0x28131414fed2de3b03cb4b6d851f06492aaa905d9e7aa28ec227c072d839696e",
    "nft_coin_id": "0x4b79bd1b4ed64bde3c3d33a55390228e4e2b412d87bfa5acf42cced4f825ec3e",
    "nft_id": "nft1ks2cqah7u6hjtj2q8vaem9a8e9n6v8rtxlzxzjs6zev8x3djevtq2kd8wn",
    "off_chain_metadata": null,
    "owner_did": null,
    "p2_address": "0x5c98e0455b643c3c5007d3bb09623820059388ba6528d41ac17e7f6ba9c4bed6",
    "pending_transaction": false,
    "royalty_percentage": 300,
    "royalty_puzzle_hash": "0x53c8e63bb7e61215db3c109a168a8c7ce7d1828c438b542abe9368c83ad3f0ff",
    "supports_did": true,
    "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
  },
  "success": true
}
```

</details>

---

### `nft_get_nfts`

Functionality: Show all NFTs in a given wallet

Usage: chia rpc wallet [OPTIONS] nft_get_nfts [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag              | Type    | Required | Description                                                                    |
| :---------------- | :------ | :------- | :----------------------------------------------------------------------------- |
| wallet_id         | NUMBER  | True     | The Wallet ID from which to retrieve the NFTs                                  |
| start_index       | NUMBER  | False    | The NFT index at which to start retrieving the NFTs [Default: `0`]             |
| num               | NUMBER  | False    | The maximum number of NFTs to retrieve [Default: `0`]                          |
| ignore_size_limit | BOOLEAN | False    | Set to `True` to ignore the size limit when retrieving NFTs [Default: `False`] |

<details>
<summary>Example</summary>

```json
chia rpc wallet nft_get_nfts '{"wallet_id": 2}'
```

Response:

```json
{
    "nft_list": [
        {
            "chain_info": "((117 "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg") (104 . 0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0) (28021) (27765) (29550 . 1) (29556 . 1))",
            "data_hash": "0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0",
            "data_uris": [
                "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg"
            ],
            "launcher_id": "0xba54ae34764b024b3b7a4f0ead65e66e53fbf54d29563f09b360b978ebf9edf1",
            "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
            "license_hash": "0x",
            "license_uris": [],
            "metadata_hash": "0x",
            "metadata_uris": [],
            "mint_height": 1127233,
            "nft_coin_id": "0x2691a4aa3533a3b3ef57cc8f70af22f1238d8961fb6b98b4f48eb34b61dc47b1",
            "owner_did": null,
            "pending_transaction": false,
            "royalty_percentage": null,
            "royalty_puzzle_hash": null,
            "edition_number": 1,
            "edition_total": 1,
            "supports_did": false,
            "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
        }
    ],
    "success": true,
    "wallet_id": 2
}
```

</details>

---

### `nft_get_wallets_with_dids`

Functionality: Show all NFT wallets that are associated with DIDs

Usage: chia rpc wallet [OPTIONS] nft_get_wallets_with_dids

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters: None

<details>
<summary>Example</summary>

```json
chia rpc wallet nft_get_wallets_with_dids
```

Response:

```json
{
  "nft_wallets": [
    {
      "did_id": "did:chia:1kzxqrt8f2h8psr8zuzen9dxgmxx5v35s0rj3jy637qjannu3zlesds0el5",
      "did_wallet_id": 2,
      "wallet_id": 5
    }
  ],
  "success": true
}
```

</details>

---

### `nft_get_wallet_did`

Functionality: Get the DID associated with an NFT wallet

Usage: chia rpc wallet [OPTIONS] nft_get_wallet_did [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag      | Type   | Required | Description                    |
| :-------- | :----- | :------- | :----------------------------- |
| wallet_id | NUMBER | True     | The Wallet ID of an NFT wallet |

<details>
<summary>Example</summary>

```json
chia rpc wallet nft_get_wallet_did '{"wallet_id": 5}'
```

Response:

```json
{
  "did_id": "did:chia:1kzxqrt8f2h8psr8zuzen9dxgmxx5v35s0rj3jy637qjannu3zlesds0el5",
  "success": true
}
```

</details>

---

### `nft_mint_bulk`

Functionality: Create a spend bundle to mint multiple NFTs. Note that this command does not push the spend bundle to the blockchain. See our documentation for [push_tx](https://docs.chia.net/docs/12rpcs/full_node_api/#push_tx) for info to accomplish this.

Usage: chia rpc wallet [OPTIONS] nft_mint_bulk [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                   | Type         | Required | Description                                                                                                                                                                                                                                                                                              |
| :--------------------- | :----------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wallet_id              | NUMBER       | True     | The ID of the NFT wallet to use for bulk minting                                                                                                                                                                                                                                                         |
| metadata_list          | STRING ARRAY | True     | A list of dicts containing the metadata for each NFT to be minted                                                                                                                                                                                                                                        |
| royalty_percentage     | NUMBER       | False    | The royalty that will go to the original artist each time the NFT is sold. The percentage is multiplied by 100 -- for example, to set a 3% royalty, set this value to 300. The default value is 0                                                                                                        |
| royalty_address        | STRING       | False    | The wallet address of the NFT's artist. This is where royalties will be sent. It could be either an XCH address or a DID address                                                                                                                                                                         |
| target_list    | STRING ARRAY | False    | A list of wallet addresses where the NFTs will be sent upon minting                                                                                                                                                                                                                                      |
| mint_number_start      | NUMBER       | False    | The starting point for mint number used in intermediate launcher puzzle. Default: 1                                                                                                                                                                                                                      |
| mint_total             | NUMBER       | False    | The total number of NFTs in the collection. Note that this is not necessarily reflective of the number of NFTs this command will create in the spend bundle, which is derived based on the `metadata_list`. For example, you could set `mint_total` to `1000` and pass only 10 dicts in `metadata_list`. |
| xch_coin_list          | STRING ARRAY | False    | A list of coins to be used for funding the minting spend. These coins can be created in the future                                                                                                                                                                                                       |
| xch_change_target      | HEX STRING   | False    | For use with bulk minting, so we can specify the puzzle hash that the change from the funding transaction goes to.                                                                                                                                                                                       |
| new_innerpuzhash       | HEX STRING   | False    | The new inner puzzle hash for the DID once it is spent. For bulk minting we generally don't provide this as the default behaviour is to re-use the existing inner puzzle hash                                                                                                                            |
| new_p2_puzhash         | HEX STRING   | False    | The new p2 puzzle hash for the DID once it is spent. For bulk minting we generally don't provide this as the default behaviour is to re-use the existing inner puzzle hash                                                                                                                               |
| did_coin_dict          | DICTIONARY   | False    | The did coin to use for minting. Required for bulk minting when the DID coin will be created in the future                                                                                                                                                                                               |
| did_lineage_parent_hex | HEX STRING   | False    | The parent coin to use for the lineage proof in the DID spend. Needed for bulk minting when the coin will be created in the future                                                                                                                                                                       |
| mint_from_did          | BOOLEAN      | False    | Boolean to determine whether to mint from a DID. Default: false                                                                                                                                                                                                                                          |
| fee                    | NUMBER       | False    | A blockchain fee to be deducted with each mint                                                                                                                                                                                                                                                           |
| reuse_puzhash          | BOOLEAN      | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml                                                                                                                 |

<details>
<summary>Example</summary>

```json
chia rpc wallet nft_mint_bulk '{
  "metadata_list": [
    {
      "uris": [
        "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg"
      ],
      "meta_uris": [
        "https://pastebin.com/raw/BHZc1suk", "https://pastebin.com/raw/bnzGwjmB"
      ],
      "license_uris": [
        "https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE"
      ],
      "hash": "0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4",
      "meta_hash": "07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51",
      "license_hash": "30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6",
      "edition_number": 1,
      "edition_total": 5
    }
  ],
  "wallet_id": 5,
  "royalty_address": "txch1zda49pjkj4hkv50fesvagf86f7pnlq68ej629dzp2hqa7p5n88sqtwnfuy",
  "royalty_percentage": 175,
  "target_address_list": [
    "txch1zda49pjkj4hkv50fesvagf86f7pnlq68ej629dzp2hqa7p5n88sqtwnfuy"
  ],
  "mint_number_start": 1,
  "mint_total": 3,
  "xch_coin_list": [
    "string"
  ],
  "xch_change_target": "137b528656956f6651e9cc19d424fa4f833f8347ccb4a2b44155c1df069339e0",
  "did_coin_dict": {
    "additionalProp1": {}
  },
  "mint_from_did": false,
  "fee": 615000000
}'
```

Response:

```json
{
  "spend_bundle": {
    "aggregated_signature": "0x8f8e1edb61397d345a3abcc9f8eeb3817096d8eadd270df7670fd1591abd417c129029dbc6bc02ecb116bafa9c058d7d12bc31556fc7952cf3a4230ac291d0de0ed078fc1e7ac87d019569d143a1632579aa6dcc45a7cfae9ee75e6b95486a3a",
    "coin_solutions": [
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0xec535e2f1de86d75a4210dd1396a974d48ffe0acf2c0c2c1d938339b21bfad53",
          "puzzle_hash": "0x07c43123924e88e61b4d4827fd3bd545b020ba02acfeefe1aa25266ea127c4e5"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff04ffff04ff04ffff04ff05ffff01ff01808080ffff04ffff04ff06ffff04ffff0bff0bff1780ff808080ff808080ffff04ffff01ff333cff018080ffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0101ffff04ffff0103ff0180808080",
        "solution": "0x80"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0xe3798119d46eba1afb2ae37e486f7d2097b519f4e985816c30f54d8bd2c1d9ca",
          "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
        },
        "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080",
        "solution": "0xffa021a59275a2a1c1e21afd99c464ab1d917c7f389529ec99e7e1ab41066cb39f9fff01ff8080"
      },
      {
        "coin": {
          "amount": 57127093998493,
          "parent_coin_info": "0xdc657f5c6e94fe021fb84133b4f8bfa368d36aa366b2c9a44e399d91fcfef7dc",
          "puzzle_hash": "0x3377e81d20ad9a3028ffe7e77360c03df48c412f2525aac58035738888adb83d"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b88bebdfd7985185f8d92e7ac1411ae7b73c24df486ad0da8676d9b26a6b8e1e6777620e33879c09d9501feb0f386f9eff018080",
        "solution": "0xff80ffff01ffff33ffa0137b528656956f6651e9cc19d424fa4f833f8347ccb4a2b44155c1df069339e0ff8633f4cb7cebdcffffa0137b528656956f6651e9cc19d424fa4f833f8347ccb4a2b44155c1df069339e08080ffff33ffa007c43123924e88e61b4d4827fd3bd545b020ba02acfeefe1aa25266ea127c4e5ff01ffffa007c43123924e88e61b4d4827fd3bd545b020ba02acfeefe1aa25266ea127c4e58080ffff34ff8424a827c080ffff3dffa0a5032061cff1b2084437f240bac7d48b4d8e619a1aa048c8187d09ff26b0837b80ffff3dffa066f70db604134aaa44ae18d16a0bdbabea1b171acf215a84403e3a99302e439e80ffff3fffa04bd58f7a665dc27c8cd7f152ee5ebdd1304558dfcc661dde4b90897eb07c16d18080ff8080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x1a03d205e5984888a31b33ccfe21b9656ad190dd590407bae614c142a2fd442f",
          "puzzle_hash": "0x21a59275a2a1c1e21afd99c464ab1d917c7f389529ec99e7e1ab41066cb39f9f"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa01a03d205e5984888a31b33ccfe21b9656ad190dd590407bae614c142a2fd442fa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc04268747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f313530393538322f706578656c732d70686f746f2d313530393538322e6a70656780ffff68a00ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4ffff826d75ffa168747470733a2f2f706173746562696e2e636f6d2f7261772f42485a633173756bffa168747470733a2f2f706173746562696e2e636f6d2f7261772f626e7a47776a6d4280ffff826c75ffc04b68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f436869612d4e6574776f726b2f636869612d626c6f636b636861696e2f6d61696e2f4c4943454e534580ffff82736e01ffff82737405ffff826d68a007cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51ffff826c68a030a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc680ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff0180ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa01a03d205e5984888a31b33ccfe21b9656ad190dd590407bae614c142a2fd442fa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0137b528656956f6651e9cc19d424fa4f833f8347ccb4a2b44155c1df069339e0ffff04ffff018200afff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b088ce4df105a1b8c762ba3fe2dd9600c53e7076fffb52f1ee635e03ed0e06918e42b5204d4d01418195303a1e7743042eff018080ff018080808080ff018080808080ff01808080",
        "solution": "0xffffa0e3798119d46eba1afb2ae37e486f7d2097b519f4e985816c30f54d8bd2c1d9caff0180ff01ffffffff80ffff01ffff81f6ff80ff80ff8080ffff33ffa0711362fef2e94f9c5d4f8a4fe2db905f8e458536fc8a18eef0b18d865a7773e8ff01ffffa0711362fef2e94f9c5d4f8a4fe2db905f8e458536fc8a18eef0b18d865a7773e8ffa0711362fef2e94f9c5d4f8a4fe2db905f8e458536fc8a18eef0b18d865a7773e8808080ff8080808080"
      }
    ]
  },
  "success": true
}
```

</details>

---

### `nft_mint_nft`

Functionality: Mint a new NFT

Usage: chia rpc wallet [OPTIONS] nft_mint_nft [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag               | Type         | Required | Description                                                                                                                                                                                          |
| :----------------- | :----------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| wallet_id          | NUMBER       | True     | The Wallet ID in which to mint an NFT                                                                                                                                                                |
| uris               | STRING ARRAY | True     | A list of URIs to mark the location(s) of the NFT                                                                                                                                                    |
| hash               | HEX STRING   | True     | The hash of the NFT's data. This should use sha256 for proper verification against the URI list                                                                                                      |
| did_id             | STRING       | False    | Optionally specify the DID to be associated with this NFT                                                                                                                                            |
| meta_uris          | STRING ARRAY | False    | A list of URIs to mark the location(s) of the NFT's metadata                                                                                                                                         |
| meta_hash          | HEX STRING   | False    | The hash of the NFT's metadata                                                                                                                                                                       |
| license_uris       | STRING ARRAY | False    | A list of URIs to mark the location(s) of the NFT's license                                                                                                                                          |
| license_hash       | HEX STRING   | False    | The hash of the NFT's license                                                                                                                                                                        |
| royalty_address    | STRING       | False    | The wallet address of the NFT's artist. This is where royalties will be sent. It could be either an XCH address or a DID address                                                                     |
| royalty_percentage | NUMBER       | False    | The royalty that will go to the original artist each time the NFT is sold. The percentage is multiplied by 100 -- for example, to set a 3% royalty, set this value to 300. The default value is 0    |
| target_address     | STRING       | False    | The wallet address of the initial owner of the NFT. This may be the same as the royalty address                                                                                                      |     |
| edition_number     | NUMBER       | False    | If this NFT has multiple editions (multiple identical copies of an NFT), then this parameter indicates the edition number of this NFT.                                                               |
| edition_total      | NUMBER       | False    | If this NFT has multiple editions, then this parameter indicates the total number of editions of this NFT. This parameter should be used if and only if the `edition_number` parameter was also used |
| fee                | NUMBER       | False    | The one-time blockchain fee to be used upon minting the NFT                                                                                                                                          |
| reuse_puzhash      | BOOLEAN      | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml             |

<details>
<summary>Example 1 - Mint an NFT without using a DID</summary>

```json
chia rpc wallet nft_mint_nft '{
  "wallet_id": 3,
  "uris": [
    "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg"
  ],
  "hash": "14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0"
}'
```

Response:

```json
{
  "spend_bundle": {
    "aggregated_signature": "0xacadbf688d91d3c8526f80c75a3644f5a2b864c6989249ea73d9efd884aa6336aca19d348feb64bbc0b47eb485e88cbd0c8661f96607f74db2924124ef7ec6a3889a57ab5fa84ab8102894f7de9bceae2089861db9e758ed7645ed7c6c8e05b9",
    "coin_solutions": [
      {
        "coin": {
          "amount": 989949999975,
          "parent_coin_info": "0x66e97600f0d819fab83e5e997d00e035d447f0a8760ae0685b868a813a3e2e89",
          "puzzle_hash": "0x91f5d27f5b0ffd1969c0532282dc92c09e6019c0194eee3294ff37cf041667ed"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a93db55b1808ebd6a66f366b8914600e66b0aa57762c121657843c2ac58de625f2124d93c403170b972b23234044aa0fff018080",
        "solution": "0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa01569ab9d6a71057184423ed27ad44dd4b1a5a7d05fdc843534f5f714c777d636ff8600e67d9e3b6680ffff3cffa0b3bc5e35e1c280f4b54a60888a8410abb13c3478ab334cae86be5226fca95c2d80ffff3dffa07ee0a48bf78665d6df901b3bb572a078cdf00498fb84b15cde20dd055b5a867c8080ff8080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0xc42a185268b542b9338c15991a3ccf04319d4808cb70dc76e82e52a707d9fc75",
          "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
        },
        "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080",
        "solution": "0xffa0d773c060d2b5b00180ed4fb0f71c9e3048e6ce6cb1524e9c1663d6617ef233f1ff01ff8080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0xba54ae34764b024b3b7a4f0ead65e66e53fbf54d29563f09b360b978ebf9edf1",
          "puzzle_hash": "0xd773c060d2b5b00180ed4fb0f71c9e3048e6ce6cb1524e9c1663d6617ef233f1"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0ba54ae34764b024b3b7a4f0ead65e66e53fbf54d29563f09b360b978ebf9edf1a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff01ff0180808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a031f5e810e2ad078817e8b047306c877ad82c77511aa235179c4a98af413f162affff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780ffff68a014836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0ffff826d7580ffff826c7580ffff82736e01ffff8273740180ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0990651e1f532086b86f02ee2105835359bb32ecc40c6bea72c7836293ce1987029b8315f46b6ee887eb7897e02555831ff018080ff018080808080ff01808080",
        "solution": "0xffffa0c42a185268b542b9338c15991a3ccf04319d4808cb70dc76e82e52a707d9fc75ff0180ff01ffffff80ffff01ffff33ffa099b2bd230599760564dda2b205453d83a98a9d175be24639c4a9c8f2a52bfefdff01ffffa099b2bd230599760564dda2b205453d83a98a9d175be24639c4a9c8f2a52bfefd808080ff8080ff018080"
      }
    ]
  },
  "success": true,
  "wallet_id": 2
}
```

</details>

<details>
<summary>Example 2 - Mint an NFT with a DID. Specify data, metadata, and license URIs and hashes, as well as royalties</summary>

```json
chia rpc wallet nft_mint_nft '{
  "wallet_id": 4,
  "uris": ["https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg"],
  "hash": "14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0",
  "meta_uris": ["https://metadata_example.com", "https://metadata_example2.com"],
  "meta_hash": "868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e",
  "license_uris": ["https://license_example.com", "https://license_example2.com"],
  "license_hash": "358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82",
  "royalty_address": "txch1pljwsktkpd64nqxf4ykfz3vmwh457qsntt8g6fe3ajsw388w78as0s60fh",
  "royalty_percentage": 300,
  "target_address": "txch1teztz9rd5edgdgrzt3eenrq5mktznuapm7sx27rp4uvc97e8l28sxu0x2d",
  "edition_number": 1,
  "edition_total": 5
}'
```

Response:

```json
{
  "spend_bundle": {
    "aggregated_signature": "0xb05cdc06d4d74cf284cc7b4c759897ed080270377f1154d879d4cbd8696d1e0a60666cc486864a32a3ca25eb3ff2831c04be3526fe8912462c19a78beb96154f09e919a1e94dfb8d555897ef556db70af54db412a5e6609bcb0223241aab2ed4",
    "coin_solutions": [
      {
        "coin": {
          "amount": 989949999973,
          "parent_coin_info": "0xbd88b99c922ec20eb6f45870edb711b6cdb7e1ffcba916ea1d617acb7b3faca0",
          "puzzle_hash": "0x556ab8cc2e749952dd601e459d43b9ff9e79bbb4acb06588b7db274801b5eac8"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b091b118c79567e227cb8eb500d0c065f942394b730de79e598362cfe09cf664473f30d1565738433c1fd829661e611835ff018080",
        "solution": "0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa0c10e58ea998df6c27f57d86548ca165e578a31bee643df5deb7295fbf445888cff8600e67d9e3b6480ffff3cffa0b71fe63f7b155804deea0a72a39fb82b9adb7c450f1b9f6e82ec8ce3c119afa680ffff3dffa0d083cdfde307de24f67bef50406d133dc2b994a8c4a181ceecfeef80472d05be8080ff8080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x8df3d521a60a4455b8ad6d1dd675632caa2092eb79c149e6ad20963278a2494f",
          "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
        },
        "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080",
        "solution": "0xffa0c2100e028804d428d6a753aa4bb7ce71808db02d780ff817a136575b9fd0f0ceff01ff8080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x6778215cd44e43470b3a8107d964dd9e20909112982f81d86e96ea7953e59829",
          "puzzle_hash": "0xe28652b116337599961cb6d138091bbced075a0cee2b8307360ec98c62f7e2d8"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0d590645dc77e25f22ffe37846e73868a99179d33de11648efaa286bc341936eaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b091f4a1811c7ccdf84207e433bc470ef9aaed1f141960017918fc3427b5e3bbff3513c3023b43a2f8a66d37df12c0aaddff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0d590645dc77e25f22ffe37846e73868a99179d33de11648efaa286bc341936eaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
        "solution": "0xffffa0abbd49d0fa7789b029c5ca17ca424f949d599599d1dea9229fb9d165135b896effa078a56af36aa6b98edf7a05b7bbb94d1afbb7e9640dfdbeeefba3c67f8d24c97cff0180ff01ffff01ffff80ffff01ffff33ffa078a56af36aa6b98edf7a05b7bbb94d1afbb7e9640dfdbeeefba3c67f8d24c97cff01ffffa078a56af36aa6b98edf7a05b7bbb94d1afbb7e9640dfdbeeefba3c67f8d24c97c8080ffff3effa0821fdd13fe209466f1c69d82eb951cf630d28e901c2e14285d8a574dbde034c48080ff80808080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x821fdd13fe209466f1c69d82eb951cf630d28e901c2e14285d8a574dbde034c4",
          "puzzle_hash": "0xc2100e028804d428d6a753aa4bb7ce71808db02d780ff817a136575b9fd0f0ce"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0821fdd13fe209466f1c69d82eb951cf630d28e901c2e14285d8a574dbde034c4a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff01ff0180808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a031f5e810e2ad078817e8b047306c877ad82c77511aa235179c4a98af413f162affff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780ffff68a014836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0ffff826d75ffbb68747470733a2f2f6d657461646174615f6578616d706c652e636f6d2c2068747470733a2f2f6d657461646174615f6578616d706c65322e636f6d80ffff826c75ffb968747470733a2f2f6c6963656e73655f6578616d706c652e636f6d2c2068747470733a2f2f6c6963656e73655f6578616d706c65322e636f6d80ffff82736e2affff827374820539ffff826d68a0868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823effff826c68a0358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a8280ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff88ad4cd55cf7ad6414ff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0128ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010880ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a078b4462709594b0f380110b83dfb33708597638100f0c08367ee9a05ee16329fffff04ffff01a0d590645dc77e25f22ffe37846e73868a99179d33de11648efaa286bc341936eaffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bff2cff058080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0821fdd13fe209466f1c69d82eb951cf630d28e901c2e14285d8a574dbde034c4a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a00fe4e859760b755980c9a92c91459b75eb4f02135ace8d2731eca0e89ceef1fbffff04ffff0182012cff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b2a63d4000a59028b200cd51027a5b6b07916ad2fe3bf2ef09d606c2a84d968ed41ff81aeb9b901f67250f54f49d0de5ff018080ff018080808080ff018080808080ff01808080",
        "solution": "0xffffa08df3d521a60a4455b8ad6d1dd675632caa2092eb79c149e6ad20963278a2494fff0180ff01ffffffff80ffff01ffff33ffa05e44b1146da65a86a0625c73998c14dd9629f3a1dfa0657861af1982fb27fa8fff01ffffa05e44b1146da65a86a0625c73998c14dd9629f3a1dfa0657861af1982fb27fa8f8080ffff81f6ffa0d590645dc77e25f22ffe37846e73868a99179d33de11648efaa286bc341936eaff80ffa078a56af36aa6b98edf7a05b7bbb94d1afbb7e9640dfdbeeefba3c67f8d24c97c8080ff8080808080"
      }
    ]
  },
  "success": true,
  "wallet_id": 4
}
```

Show the result of running Example 2:

```json
chia wallet nft list -i 4
```

Response:

```
NFT identifier:            nft1sg0a6yl7yz2xduwxnkpwh9gu7ccd9r5srshpg2za3ft5m00qxnzqs0up49
Launcher coin ID:          821fdd13fe209466f1c69d82eb951cf630d28e901c2e14285d8a574dbde034c4
Launcher puzhash:          eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9
Current NFT coin ID:       9bcf429079bd8e394658a3f0c43c6641c9f92d0dcc1770eeb6be6588a49fc925
On-chain data/info:        ((117 "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg") (104 . 0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0) (28021 "https://metadata_example.com", "https://metadata_example2.com") (27765 "https://license_example.com", "https://license_example2.com") (29550 . 1) (29556 . 5) (28008 . 0x868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e) (27752 . 0x358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82))
Owner DID:                 did:chia:16kgxghw80cjlytl7x7zxuuux32v308fnmcgkfrh652rtcdqexm4q7gsarr
Royalty percentage:        300
Royalty puzhash:           0fe4e859760b755980c9a92c91459b75eb4f02135ace8d2731eca0e89ceef1fb
NFT content hash:          14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0
Metadata hash:             868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e
License hash:              358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82
NFT edition total:          5
Current NFT edition number: 1
Metadata updater puzhash:  fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b
NFT minting block height:  1127304
Inner puzzle supports DID: True
NFT is pending for a transaction: False

URIs:
   https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg

Metadata URIs:
   https://metadata_example.com, https://metadata_example2.com

License URIs:
   https://license_example.com, https://license_example2.com
```

</details>

---

### `nft_set_did_bulk`

Functionality: Bulk set DID for NFTs across different wallets.

Usage: chia rpc wallet [OPTIONS] nft_set_did_bulk [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag          | Type         | Required | Description                                                                                                                                                                              |
| :------------ | :----------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nft_coin_list | STRING ARRAY | True     | A list of coin IDs corresponding to the NFTs, along with the current wallet_ids. Syntax: `[{"nft_coin_id": COIN_ID/NFT_ID, "wallet_id": WALLET_ID}, ...]`                                |
| did_id        | STRING       | False    | The ID of the DID to which to transfer the NFTs. [Default: no DID (reset the NFTs' DIDs)]                                                                                                |
| fee           | NUMBER       | False    | An optional blockchain fee                                                                                                                                                               |
| reuse_puzhash | BOOLEAN      | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml |

<details>
<summary>Example</summary>

Move four NFTs from one DID (wallet_id 6) to another (did:chia:1cxw5dqug4gavvgylx88zfkmqv235ryr6j9tvyjwwuga0pa52wjvqavdyar):

```json
chia rpc wallet nft_set_did_bulk '{"nft_coin_list": [{"nft_coin_id": "0x473da488ddc642669776c16b532efa460a48978b108e25b0a2f8e98ee8ab0290", "wallet_id": 5}, {"nft_coin_id": "0x22d23d4b99cd2f4c01f203dc1f54417ffb9874f203bef0df5d57ba75b2db51b9", "wallet_id": 5}, {"nft_coin_id": "0x27f9232ad5c9b05bd5527de82961893004e6843d85853f8bdab9c148934b51a8", "wallet_id": 5}, {"nft_coin_id": "0xd7bdfb0eea92134936c9a70ab30c577ca62759508feaa96eba62c3c911fc9eff", "wallet_id": 5}], "did_id": "did:chia:1cxw5dqug4gavvgylx88zfkmqv235ryr6j9tvyjwwuga0pa52wjvqavdyar", "fee": 1000}'
```

Response:

```json
{
  "spend_bundle": {
    "aggregated_signature": "0x81ac8d9f6be9d77c5ab776d88cb140dd02c2bd5a3c42234d796766085d847f40fa693a95e1e3142f2693ced1c136cc2503e631c3ca78b38e977d002e79723a45ee169b029b709866ca2951a48bf8fea01095f5997835bd3a3d45ddc9f77496dd",
    "coin_solutions": [
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x867f36aff7b70937076b33d6d1ed6851583d009571a664a260f2f0ac6a429c40",
          "puzzle_hash": "0x38d332b735c5b1a94b239a4019b9d7b6de4e5846b1d29bc174940e2fbbec7f8f"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b478c6a0ef7410679831d616d06e9fca856f6e08b8a6f13f344cc9aa20981ab7fe287663584e2fc53e2ac14edab883caff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
        "solution": "0xffffa0885e54efffd6f68b8d36f122e510c057f6abfd2549eb5c3a39f8bf4cc3f5165affa0d58b4b9af7ef78eb649e45cc07b7aa502425639da56cae73560d5cd34cf8c93cff0180ff01ffff01ffff80ffff01ffff33ffa0d58b4b9af7ef78eb649e45cc07b7aa502425639da56cae73560d5cd34cf8c93cff01ffffa02c3d72acbdb2cc5930bb2f4b5d4f79ca9e8ec0217a9e17eac515a1f1344f9ac88080ffff3effa05353f6bfde64e24706ac698bf920bab1cb608f52f81d6dfbe8ea6283c9d357ea80ffff3effa059d5f19d6eea0e240d28fd313f3bffbc1d715cfffbfeb7a89cad9151b7f78a4580ffff3effa03fbf39d79089287207b6118bc3a093aa1ddb1a5152a500b6c3d35fa3536c093680ffff3effa03b9ee04b7cfeffa76e51c53d1b5897628d755decfb7a39fe20ac98e7da5f4e9b8080ff80808080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x9ce348272a1e011405dbcb0fb5881f8230c93b320039e93e2b1dc3530afaea51",
          "puzzle_hash": "0xae6ce916dd57c3b1a39239595fd7e48f091644b55310881cb721ef600bcfea9a"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa05353f6bfde64e24706ac698bf920bab1cb608f52f81d6dfbe8ea6283c9d357eaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffa268747470733a2f2f696d672e7374617273746f726d2e696f2f736f6c332e7765627080ffff68a0186ffc3d5694c199c3d970e724d959e7ca2e13d8e7dd26e77c4bb0ddbea13dacffff826d75ffa168747470733a2f2f706173746562696e2e636f6d2f7261772f6a6675476e434d4480ffff826c75ffc04b68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f436869612d4e6574776f726b2f636869612d626c6f636b636861696e2f6d61696e2f4c4943454e534580ffff82736e01ffff82737401ffff826d68a0a5b69e5875389f82f57be37ceb28972a5b7a93877982d4a62ce377a62f303159ffff826c68a030a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc680ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff01a0f32a1fb40a837281590fce2561131c2de288be93f9b7c13c433cbd6a3e6c7813ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa05353f6bfde64e24706ac698bf920bab1cb608f52f81d6dfbe8ea6283c9d357eaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0e3c2a20293c88aafbc7d939fa29421470ade9eee8e4e0fb0371fa9a1268434f5ffff04ffff0182012cff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a5b35d3370745ae7634022ddd970379b4ed4acdd2d34622f1dfdf2b9923b16ac6e8b317abcf1cc8beb1e882d341e4458ff018080ff018080808080ff018080808080ff01808080",
        "solution": "0xffffa080f0dd49301e1f2cee13edf2768b7ca0c890407131fb4f7f053e9079be5f40e4ffa0849e6585823e5b86aadf1950c8d910c361861c88cbfc3ae2552e5ba485d22ba5ff0180ff01ffffffff80ffff01ffff81f6ffa0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498ff80ffa0d58b4b9af7ef78eb649e45cc07b7aa502425639da56cae73560d5cd34cf8c93c80ffff33ffa0c6effdca80227b7e5aa836b666f37d92ada01bdc207af232263675e31148b2c9ff01ffffa0c6effdca80227b7e5aa836b666f37d92ada01bdc207af232263675e31148b2c98080ffff3cffa0473da488ddc642669776c16b532efa460a48978b108e25b0a2f8e98ee8ab02908080ff8080808080"
      },
      {
        "coin": {
          "amount": 81039888382,
          "parent_coin_info": "0xe6c1d2916573c13757c9423a299319299102a6ed1aa512a686ae444ccc63c1b3",
          "puzzle_hash": "0x2128576364ec11de15aef31cccf5f795416dd4f4708d66f23af8db3ea2357188"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b463bc026097caa24be6b0f3d75f46d2bbe3ed5e2595b77b21e24c4e5c161c6bd3a48aa58f4c07c7db85e30cd34ca34eff018080",
        "solution": "0xff80ffff01ffff33ffa004dad01e30eb30dcd1687f544d04bbeed8a5b326d36c02e773e2f865d3e6b3d8ff8512de5a8c1680ffff34ff8203e880ffff3cffa0a8ea2f9c3365725f1d613e2ff943d7b8ef4a03d4c7d3984931761a689b668e5280ffff3dffa06a9b14d041fd83f0bad2c5167eca716901f069eec74905c58229ddd4d427f5028080ff8080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x15c8c0158b41dc1bba3ccfebe9b2ae1061692f676918ae0f95bb953f0934800f",
          "puzzle_hash": "0x879d8777376d9ceb2fb644c81975a7782910a5a5593a14a79c72346e208e16a6"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa059d5f19d6eea0e240d28fd313f3bffbc1d715cfffbfeb7a89cad9151b7f78a45a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc05868747470733a2f2f6261666b726569657875627a326a6d65336b7866687a6c7732647532353232356271727a733365376d66786f706f736672696879357534747864752e697066732e6e667473746f726167652e6c696e6b80ffff68a097a073a4b09b55ca7caeda1d35dd6ba184732d93ec2ddcf748b141f1da72771dffff826d75ffc05868747470733a2f2f6261666b72656968736d706a7264373635696570657535796a61626b6f7a616e32337776697537366879797a6b616e6374356e6c766a6d707562752e697066732e6e667473746f726167652e6c696e6b80ffff826c75ffc05868747470733a2f2f6261666b72656964626a7766683367766369656432766a337270376d7078617036676336736a727a69737a34616f7a693777727569336332776f652e697066732e6e667473746f726167652e6c696e6b80ffff82736e01ffff82737401ffff826d68a0f263d311ffdd411e4a77090054ec81baddaa8a7fc7c632a03453eb5754b1f40dffff826c68a0614d8a7d9aa24107aaa7717fd8fb81fe30bd24c728967807651fb4688d8b567180ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff01a0f32a1fb40a837281590fce2561131c2de288be93f9b7c13c433cbd6a3e6c7813ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa059d5f19d6eea0e240d28fd313f3bffbc1d715cfffbfeb7a89cad9151b7f78a45a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0d5845debdc6df1aa9f7db346c6f30e147a7f849cab1cb5e2f760729c514c1d9bffff04ffff0182015eff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b241c3afbc3b8ee41d2ec860cee9960418091c68c48baa39aee6464186f2cf8de3242e750d0ba154f6dc17dd83e2fcefff018080ff018080808080ff018080808080ff01808080",
        "solution": "0xffffa0aa450d8f49a65a9f8e03db0bf4b1e54c60c16ed5a1a0bfb02788c3ce4496d016ffa07ec0bc0c410e0540856538ec8d4f100ef009c614827e3baaf86fa4c82c86e884ff0180ff01ffffffff80ffff01ffff81f6ffa0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498ff80ffa0d58b4b9af7ef78eb649e45cc07b7aa502425639da56cae73560d5cd34cf8c93c80ffff33ffa0493b0784a43065f3414644775369f073f950a8f49862266b28ba016c48b6b043ff01ffffa0493b0784a43065f3414644775369f073f950a8f49862266b28ba016c48b6b043808080ff8080808080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0xa11b0e166642ada508e6a135b906351844730d152720bd2c45073f3ccdc9d418",
          "puzzle_hash": "0x6776c3d5d1bc3699e9ce37bad1580c2cf2748d96a7d356e8b5e867e47cbdb9fc"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa03fbf39d79089287207b6118bc3a093aa1ddb1a5152a500b6c3d35fa3536c0936a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc05868747470733a2f2f6261666b726569616d64746c7279373665336a776669766870686d7661767a613736766d646d6d626c6d74373574377664796c6e783374616664652e697066732e6e667473746f726167652e6c696e6b80ffff68a00c1cd71c7fc4da6c5454ef3b2a0ae41ff55836302b64ffd9fea3c2db7dcc0519ffff826d75ffc05868747470733a2f2f6261666b72656963666e6d327571716c666d6a6564677a79363468616d667068696e79667466623572777469746666643361647a347674346f656d2e697066732e6e667473746f726167652e6c696e6b80ffff826c75ffc05968747470733a2f2f6261666b726569657162626e356936337971686734637a6f3676637276676662753676337a7269726c6e6d376570336b63616976617679353634752e697066732e6e667473746f726167652e6c696e6b2f80ffff82736e01ffff82737401ffff826d68a0456b35484165624833671ee1c0c2bce86e0b3287b1b4d132947b00f3cacf8e23ffff826c68a090085bd47b7881cdc165dea8a3531434f57798a22b6b3e47ed42022a0ae3bee580ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff01a0f32a1fb40a837281590fce2561131c2de288be93f9b7c13c433cbd6a3e6c7813ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa03fbf39d79089287207b6118bc3a093aa1ddb1a5152a500b6c3d35fa3536c0936a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a00d4d75aa0be98c014023e83760a421059e6ef40af644d14492c3f624bdc80c7affff04ffff01820258ff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0992b0469f257e4b93f6555b66ebad6b39d6794206db9500c6962407840bbe1e6b36dd91582c465aa0ea8b9e911e3d3adff018080ff018080808080ff018080808080ff01808080",
        "solution": "0xffffa03441fa84001423169ca55dd8fe9abe09cde4c73fb379bf22844a0cf6fc6a9a07ffa062a7ca562f92c658310994488541e5c0bb301e4a625e7fb2806e35f957455d0aff0180ff01ffffffff80ffff01ffff81f6ffa0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498ff80ffa0d58b4b9af7ef78eb649e45cc07b7aa502425639da56cae73560d5cd34cf8c93c80ffff33ffa0deb4cdacdb89bf918f9e1d4bff413c186ffe40c470ed6f9c14ed36e6676e975cff01ffffa0deb4cdacdb89bf918f9e1d4bff413c186ffe40c470ed6f9c14ed36e6676e975c808080ff8080808080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0xe2694e7582ea37fc3c65dc4b5bef513166390b39fdb85492a25ac52caddcadf3",
          "puzzle_hash": "0x9e87019445f73db4e2e02872f8be2076f041ee8aa9e746e90248d55e72c606a2"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa03b9ee04b7cfeffa76e51c53d1b5897628d755decfb7a39fe20ac98e7da5f4e9ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc05868747470733a2f2f6261666b726569657868366e6f6e616278796f74326679327171733668776c3569686d70747565726d376177636c716578776832776d33336c78612e697066732e6e667473746f726167652e6c696e6b80ffff68a0973f9ae68037c3a7a2e35084bc7b2fa83b1f3a122cf82c25c097b1f5666f6bb8ffff826d75ffc05868747470733a2f2f6261666b726569627869366d3333656e3476353563616d3265613361366f6f7563797567797133616d3462697376796166767a7674756a656d73612e697066732e6e667473746f726167652e6c696e6b80ffff826c75ffc05968747470733a2f2f62616679626569687871736a74726c666237786b6337657663747170636a6c6b61696b3577713235366433687375326372693262706962687276752e697066732e6e667473746f726167652e6c696e6b2f80ffff82736e01ffff82737401ffff826d68a0374799bd91bcaf7a20334406c1e73a82c50d886c0ce0512ae005ae6b3a248c90ffff826c68a0512ba61b3f802e4acd08d666c6bf2194116e50b2606f2f6bf6448e63c60923cd80ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff01a0f32a1fb40a837281590fce2561131c2de288be93f9b7c13c433cbd6a3e6c7813ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa03b9ee04b7cfeffa76e51c53d1b5897628d755decfb7a39fe20ac98e7da5f4e9ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a00d4d75aa0be98c014023e83760a421059e6ef40af644d14492c3f624bdc80c7affff04ffff01820258ff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0992b0469f257e4b93f6555b66ebad6b39d6794206db9500c6962407840bbe1e6b36dd91582c465aa0ea8b9e911e3d3adff018080ff018080808080ff018080808080ff01808080",
        "solution": "0xffffa0d3ee3fae02dd44979d64f6b1e545960fda17ff2b1e9ee07ae97818f3e3c28cd5ffa0a7614b7e326506a0e72d2442cc5d1d1eb22c4df24ec592a9d1737ced62d14e78ff0180ff01ffffffff80ffff01ffff81f6ffa0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498ff80ffa0d58b4b9af7ef78eb649e45cc07b7aa502425639da56cae73560d5cd34cf8c93c80ffff33ffa0deb4cdacdb89bf918f9e1d4bff413c186ffe40c470ed6f9c14ed36e6676e975cff01ffffa0deb4cdacdb89bf918f9e1d4bff413c186ffe40c470ed6f9c14ed36e6676e975c808080ff8080808080"
      }
    ]
  },
  "success": true,
  "wallet_id": [5]
}
```

</details>

---

### `nft_set_nft_did`

Functionality: Set the DID for a specific NFT (the NFT must support DIDs)

Usage: chia rpc wallet [OPTIONS] nft_set_nft_did [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag          | Type    | Required | Description                                                                                                                                                                              |
| :------------ | :------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wallet_id     | NUMBER  | True     | The Wallet ID that holds the NFT on which to set the DID                                                                                                                                 |
| nft_coin_id   | NUMBER  | True     | The coin ID of the NFT on which to set the DID                                                                                                                                           |
| did_id        | NUMBER  | False    | Optionally specify the DID to be associated with this NFT. If this parameter is not specified, the DID will be Unassigned                                                                |
| fee           | NUMBER  | False    | The one-time blockchain fee to be used upon adding a URI                                                                                                                                 |
| reuse_puzhash | BOOLEAN | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml |

<details>
<summary>Example</summary>

First, we'll show the details of an NFT that is not associated with a DID:

```json
chia rpc wallet nft_get_nfts '{"wallet_id": 4}'
```

Response:

```json
{
  "nft_list": [
    {
      "chain_info": "((117 \"https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg\") (104 . 0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4) (28021 \"https://pastebin.com/raw/BHZc1suk\" \"https://pastebin.com/raw/bnzGwjmB\") (27765 \"https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE\") (29550 . 1) (29556 . 1) (28008 . 0x07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51) (27752 . 0x30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6))",
      "data_hash": "0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4",
      "data_uris": [
        "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg"
      ],
      "edition_number": 1,
      "edition_total": 1,
      "launcher_id": "0xc872ff6d0515ec5001beba3dc546a9d5d67186ed2fad88dcbc65dac2eef715db",
      "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
      "license_hash": "0x30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6",
      "license_uris": [
        "https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE"
      ],
      "metadata_hash": "0x07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51",
      "metadata_uris": [
        "https://pastebin.com/raw/BHZc1suk",
        "https://pastebin.com/raw/bnzGwjmB"
      ],
      "mint_height": 1688221,
      "minter_did": "0xb08c01ace955ce180ce2e0b332b4c8d98d46469078e5191351f025d9cf9117f3",
      "nft_coin_id": "0x46a6638642eeea83432d7fe419882ed5aeb2ed82e2490cea40279a5ffe7ac1ff",
      "off_chain_metadata": null,

      "owner_did": null,

      "p2_address": "0x8b4c2d1a6c7ac0914875db5a19e23fe7608c67f43ffe242e5519ae54737336e6",
      "pending_transaction": false,
      "royalty_percentage": 175,
      "royalty_puzzle_hash": "0x3377e81d20ad9a3028ffe7e77360c03df48c412f2525aac58035738888adb83d",
      "supports_did": true,
      "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
    }
  ],
  "success": true,
  "wallet_id": 4
}
```

Note that the `owner_did` is `null`.

Next, set the DID for that NFT:

```json
chia rpc wallet nft_set_nft_did '{"wallet_id": 4, "nft_coin_id": "0x46a6638642eeea83432d7fe419882ed5aeb2ed82e2490cea40279a5ffe7ac1ff", "did_id": "did:chia:1kzxqrt8f2h8psr8zuzen9dxgmxx5v35s0rj3jy637qjannu3zlesds0el5", "fee": 1000000}'
```

Response:

```json
{
  "spend_bundle": {
    "aggregated_signature": "0xa6d77997f9fb6bea397f26b38a640c54cc24a789451dc4344dedf817256c91e2f5d26ac763a54d739e7816d47d809ed307ffba60f4d01318767ecab35fe83f1c2ed11710de4f47be165e0c3178bd41c81b571547eae7ad6dd947c30a1eddd23f",
    "coin_solutions": [
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x9f4a41d324617ed63b9860eb10e2079565df6e2ec668cf37a86873fe47829ef5",
          "puzzle_hash": "0xce4bcb329314ba731547c6bfea838332ed84be2f2e104b06320d81dd5a07ba29"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0c872ff6d0515ec5001beba3dc546a9d5d67186ed2fad88dcbc65dac2eef715dba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc04268747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f313530393538322f706578656c732d70686f746f2d313530393538322e6a70656780ffff68a00ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4ffff826d75ffa168747470733a2f2f706173746562696e2e636f6d2f7261772f42485a633173756bffa168747470733a2f2f706173746562696e2e636f6d2f7261772f626e7a47776a6d4280ffff826c75ffc04b68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f436869612d4e6574776f726b2f636869612d626c6f636b636861696e2f6d61696e2f4c4943454e534580ffff82736e01ffff82737401ffff826d68a007cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51ffff826c68a030a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc680ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff0180ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0c872ff6d0515ec5001beba3dc546a9d5d67186ed2fad88dcbc65dac2eef715dba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a03377e81d20ad9a3028ffe7e77360c03df48c412f2525aac58035738888adb83dffff04ffff018200afff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b091b76a4cf7fa8a3bae62fd5620d2f5bf7bc3abcedcd8a29a8bd67eea4e0867b50cfa25de97695b39b1a7e6762e0c6c70ff018080ff018080808080ff018080808080ff01808080",
        "solution": "0xffffa0c382fa56526fc9341203c9602099108f6bacf32dbee99bf67f4201c098922895ffa0c238f942227000c391a9d925c6c1c55446ffaf23690e757115b0d8c2271383a8ff0180ff01ffffffff80ffff01ffff81f6ffa0b08c01ace955ce180ce2e0b332b4c8d98d46469078e5191351f025d9cf9117f3ff80ffa08a00b8add6e26c8202df866b06963e4f7b0653049febc8b0663350618c1e562180ffff33ffa08b4c2d1a6c7ac0914875db5a19e23fe7608c67f43ffe242e5519ae54737336e6ff01ffffa08b4c2d1a6c7ac0914875db5a19e23fe7608c67f43ffe242e5519ae54737336e68080ffff3cffa046a6638642eeea83432d7fe419882ed5aeb2ed82e2490cea40279a5ffe7ac1ff8080ff8080808080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x1cb411238deb754ad6c043ccd733f947ffe9549871258beaa3e5b4220010feb2",
          "puzzle_hash": "0xda141dccc05e65d41b6cd96f9769d43a9a49ca6099d4306737acd3a7f56db848"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0b08c01ace955ce180ce2e0b332b4c8d98d46469078e5191351f025d9cf9117f3a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a34055d60ba38afe8f951659bc090d4c07086a814084efc9af07eb3fe0fcc9abcfb3f2ba72ef95079fcbd41b051aa665ff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0b08c01ace955ce180ce2e0b332b4c8d98d46469078e5191351f025d9cf9117f3a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
        "solution": "0xffffa023e1f6128e3800269c81bbe73647ac9301da80563ff67a19f381d21fd4965067ffa08a00b8add6e26c8202df866b06963e4f7b0653049febc8b0663350618c1e5621ff0180ff01ffff01ffff80ffff01ffff33ffa08a00b8add6e26c8202df866b06963e4f7b0653049febc8b0663350618c1e5621ff01ffffa08a00b8add6e26c8202df866b06963e4f7b0653049febc8b0663350618c1e56218080ffff3effa0c872ff6d0515ec5001beba3dc546a9d5d67186ed2fad88dcbc65dac2eef715db8080ff80808080"
      },
      {
        "coin": {
          "amount": 383999998,
          "parent_coin_info": "0x14c642121bdcc00251b8f7c1743471e8551c3954cee0e69f15a38b9f8168a259",
          "puzzle_hash": "0x264ffcfada4fb2d7675013cb234918886fafdf8b6ffeff8176f75205d7f61441"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b834c7041ed1ec553ed66531bc3b1c4c6bdf86323339b80d4a625f596dc5a16deae9234ae95281713160d929ed2a502fff018080",
        "solution": "0xff80ffff01ffff33ffa08eb36a8f00118084d8b1af6d30027d3d4077c7157e39dee2bcc41654d7656149ff8416d41dbe80ffff34ff830f424080ffff3cffa0ee00b8ff6738518d0b6b6edc2eccf1e2e7c3b0bd8ee59f62f85d2a40d25557fd80ffff3dffa0e8a3406cf70049809c10dbeceed409ca01e83653330f433920b351e9b6b5c7448080ff8080"
      }
    ]
  },
  "success": true,
  "wallet_id": 4
}
```

Finally, after waiting for the transaction to be accepted, verify that the NFT now includes the correct DID in its info:

```json
chia rpc wallet nft_get_nfts '{"wallet_id": 5}'
```

In the response, `owner_did` is now set:

```json
{
  "nft_list": [
    {
      "chain_info": "((117 \"https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg\") (104 . 0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4) (28021 \"https://pastebin.com/raw/BHZc1suk\" \"https://pastebin.com/raw/bnzGwjmB\") (27765 \"https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE\") (29550 . 1) (29556 . 1) (28008 . 0x07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51) (27752 . 0x30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6))",
      "data_hash": "0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4",
      "data_uris": [
        "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg"
      ],
      "edition_number": 1,
      "edition_total": 1,
      "launcher_id": "0xc872ff6d0515ec5001beba3dc546a9d5d67186ed2fad88dcbc65dac2eef715db",
      "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
      "license_hash": "0x30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6",
      "license_uris": [
        "https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE"
      ],
      "metadata_hash": "0x07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51",
      "metadata_uris": [
        "https://pastebin.com/raw/BHZc1suk",
        "https://pastebin.com/raw/bnzGwjmB"
      ],
      "mint_height": 1688221,
      "minter_did": "0xb08c01ace955ce180ce2e0b332b4c8d98d46469078e5191351f025d9cf9117f3",
      "nft_coin_id": "0xe4497290bdfc82ddbc01828f8fa2c9c0c9413f20debe3baeef59d39b6f5c24de",
      "off_chain_metadata": null,

      "owner_did": "0xb08c01ace955ce180ce2e0b332b4c8d98d46469078e5191351f025d9cf9117f3",

      "p2_address": "0x8b4c2d1a6c7ac0914875db5a19e23fe7608c67f43ffe242e5519ae54737336e6",
      "pending_transaction": false,
      "royalty_percentage": 175,
      "royalty_puzzle_hash": "0x3377e81d20ad9a3028ffe7e77360c03df48c412f2525aac58035738888adb83d",
      "supports_did": true,
      "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
    }
  ],
  "success": true,
  "wallet_id": 5
}
```

</details>

---

### `nft_set_nft_status`

Functionality: Set the transaction status of an NFT

Usage: chia rpc wallet [OPTIONS] nft_set_nft_status [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag           | Type    | Required | Description                                         |
| :------------- | :------ | :------- | :-------------------------------------------------- |
| wallet_id      | NUMBER  | True     | The ID of an NFT wallet                             |
| coin_id        | NUMBER  | True     | The coin_id of the NFT on which to set the status   |
| in_transaction | BOOLEAN | True     | A boolean to set the transaction status for the NFT |

<details>
<summary>Example</summary>

```json
 chia rpc wallet nft_set_nft_status '{"wallet_id": 5, "coin_id": "0xb08c01ace955ce180ce2e0b332b4c8d98d46469078e5191351f025d9cf9117f3", "in_transaction": false}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `nft_transfer_bulk`

Functionality: Bulk transfer NFTs to an address.

Usage: chia rpc wallet [OPTIONS] nft_transfer_bulk [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag           | Type         | Required | Description                                                                                                                                                                              |
| :------------- | :----------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| nft_coin_list  | STRING ARRAY | True     | A list of coin IDs corresponding to the NFTs, along with the current wallet_ids. Syntax: `[{"nft_coin_id": COIN_ID/NFT_ID, "wallet_id": WALLET_ID}, ...]`                                |
| target_address | STRING       | True     | The address to which to transfer the NFTs                                                                                                                                                |
| fee            | NUMBER       | False    | An optional blockchain fee                                                                                                                                                               |
| reuse_puzhash  | BOOLEAN      | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml |

<details>
<summary>Example</summary>

Transfer four NFTs from wallet 6 to a new address (this will also remove them from their DID custody):

```json
chia rpc wallet nft_set_did_bulk '{"nft_coin_list": [{"nft_coin_id": "0x78642d793fc219447d4e6bdc85b6fd2cb8cdf0e42eee48b5412018dcc584544d", "wallet_id": 6}, {"nft_coin_id": "0x96de11e05af1dce57f9d24f20a707bd6b96af5e711888aba91782c1d5fbd7ee1", "wallet_id": 6}, {"nft_coin_id": "0xac2e92501afd2c4e9f5ac2dd9d1b997b01fec0f3f40ac2cb3c2d7472f0f3555d", "wallet_id": 6}, {"nft_coin_id": "0x022efec74cb30cf6782a3dfd87a3980530be9ec9ea1522959d1e1abf052aafb8", "wallet_id": 6}], "target_address": "xch15klzg5wjtla4mkudrwrqpjg55g3fdwje87kp9us4wa9r6sulqaes5yfm56", "fee": 1}'
```

Response:

```json
{
  "spend_bundle": {
    "aggregated_signature": "0x91dc1253787127bc16981df0e189a2f564219dae61d0f927804ade535b9eb1c21d8410d1c2f773863eeeaae1c4c6954f05de19cba4048e7b7d3c83c69d76b7762ab7305eb01fad301c5fb7ab566fb072fa1a261edc56bb2825909d6a906cfc11",
    "coin_solutions": [
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0xd7bdfb0eea92134936c9a70ab30c577ca62759508feaa96eba62c3c911fc9eff",
          "puzzle_hash": "0x98d3a008da62e4cd2962703291cf53a7bb353fae6988418a7fe05ffdaffa9dd2"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa03b9ee04b7cfeffa76e51c53d1b5897628d755decfb7a39fe20ac98e7da5f4e9ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc05868747470733a2f2f6261666b726569657868366e6f6e616278796f74326679327171733668776c3569686d70747565726d376177636c716578776832776d33336c78612e697066732e6e667473746f726167652e6c696e6b80ffff68a0973f9ae68037c3a7a2e35084bc7b2fa83b1f3a122cf82c25c097b1f5666f6bb8ffff826d75ffc05868747470733a2f2f6261666b726569627869366d3333656e3476353563616d3265613361366f6f7563797567797133616d3462697376796166767a7674756a656d73612e697066732e6e667473746f726167652e6c696e6b80ffff826c75ffc05968747470733a2f2f62616679626569687871736a74726c666237786b6337657663747170636a6c6b61696b3577713235366433687375326372693262706962687276752e697066732e6e667473746f726167652e6c696e6b2f80ffff82736e01ffff82737401ffff826d68a0374799bd91bcaf7a20334406c1e73a82c50d886c0ce0512ae005ae6b3a248c90ffff826c68a0512ba61b3f802e4acd08d666c6bf2194116e50b2606f2f6bf6448e63c60923cd80ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff01a0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa03b9ee04b7cfeffa76e51c53d1b5897628d755decfb7a39fe20ac98e7da5f4e9ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a00d4d75aa0be98c014023e83760a421059e6ef40af644d14492c3f624bdc80c7affff04ffff01820258ff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0992b0469f257e4b93f6555b66ebad6b39d6794206db9500c6962407840bbe1e6b36dd91582c465aa0ea8b9e911e3d3adff018080ff018080808080ff018080808080ff01808080",
        "solution": "0xffffa0e2694e7582ea37fc3c65dc4b5bef513166390b39fdb85492a25ac52caddcadf3ffa0df7d79724a39df65d0fa02eb6ef15f385a31cc43150e867baf4275d6e6b22179ff0180ff01ffffffff80ffff01ffff81f6ff80ff80ff8080ffff33ffa0deb4cdacdb89bf918f9e1d4bff413c186ffe40c470ed6f9c14ed36e6676e975cff01ffffa0deb4cdacdb89bf918f9e1d4bff413c186ffe40c470ed6f9c14ed36e6676e975c8080ffff3cffa078642d793fc219447d4e6bdc85b6fd2cb8cdf0e42eee48b5412018dcc584544d8080ff8080808080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x2fb76e4abf88c1bb6033690a9748a873383774690265cbe19eff01970c8cde1a",
          "puzzle_hash": "0xfaabcdab21c14c09d1233e5a3e2d6aa89a6e1ceae72668197cf0bb8d8553c57e"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b088257a93531c1e21af312d321ce27a06b59ea4f421cb9faa422ce4fc1a02363aeadc03cef061d8a23afc87533a0cee9eff018080",
        "solution": "0xff80ffff01ffff34ff0180ffff3cffa0aed173942dde2e4f2018ec8ba985b38d97d905c836539814dcdd2bab03e9894580ffff3dffa0e68ccb910b4a59c02c87e1ec3c9afee750a76152f92db9ee9a0d21d49097dfa88080ff8080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x22d23d4b99cd2f4c01f203dc1f54417ffb9874f203bef0df5d57ba75b2db51b9",
          "puzzle_hash": "0x635baf33b4a5e873c0cfe1f0ed59627c4b547773babc990bc40900afb30daef3"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa059d5f19d6eea0e240d28fd313f3bffbc1d715cfffbfeb7a89cad9151b7f78a45a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc05868747470733a2f2f6261666b726569657875627a326a6d65336b7866687a6c7732647532353232356271727a733365376d66786f706f736672696879357534747864752e697066732e6e667473746f726167652e6c696e6b80ffff68a097a073a4b09b55ca7caeda1d35dd6ba184732d93ec2ddcf748b141f1da72771dffff826d75ffc05868747470733a2f2f6261666b72656968736d706a7264373635696570657535796a61626b6f7a616e32337776697537366879797a6b616e6374356e6c766a6d707562752e697066732e6e667473746f726167652e6c696e6b80ffff826c75ffc05868747470733a2f2f6261666b72656964626a7766683367766369656432766a337270376d7078617036676336736a727a69737a34616f7a693777727569336332776f652e697066732e6e667473746f726167652e6c696e6b80ffff82736e01ffff82737401ffff826d68a0f263d311ffdd411e4a77090054ec81baddaa8a7fc7c632a03453eb5754b1f40dffff826c68a0614d8a7d9aa24107aaa7717fd8fb81fe30bd24c728967807651fb4688d8b567180ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff01a0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa059d5f19d6eea0e240d28fd313f3bffbc1d715cfffbfeb7a89cad9151b7f78a45a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0d5845debdc6df1aa9f7db346c6f30e147a7f849cab1cb5e2f760729c514c1d9bffff04ffff0182015eff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b241c3afbc3b8ee41d2ec860cee9960418091c68c48baa39aee6464186f2cf8de3242e750d0ba154f6dc17dd83e2fcefff018080ff018080808080ff018080808080ff01808080",
        "solution": "0xffffa015c8c0158b41dc1bba3ccfebe9b2ae1061692f676918ae0f95bb953f0934800fffa04e48168052f32841cca7ef786b728d0d58b9fca4d8b2d3b2ecaccb65f45041e8ff0180ff01ffffffff80ffff01ffff81f6ff80ff80ff8080ffff33ffa0493b0784a43065f3414644775369f073f950a8f49862266b28ba016c48b6b043ff01ffffa0493b0784a43065f3414644775369f073f950a8f49862266b28ba016c48b6b043808080ff8080808080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x473da488ddc642669776c16b532efa460a48978b108e25b0a2f8e98ee8ab0290",
          "puzzle_hash": "0x8e2aed85758c697560fbfd720c3c99e0a419efe408278a46583b35fc61dc2c97"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa05353f6bfde64e24706ac698bf920bab1cb608f52f81d6dfbe8ea6283c9d357eaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffa268747470733a2f2f696d672e7374617273746f726d2e696f2f736f6c332e7765627080ffff68a0186ffc3d5694c199c3d970e724d959e7ca2e13d8e7dd26e77c4bb0ddbea13dacffff826d75ffa168747470733a2f2f706173746562696e2e636f6d2f7261772f6a6675476e434d4480ffff826c75ffc04b68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f436869612d4e6574776f726b2f636869612d626c6f636b636861696e2f6d61696e2f4c4943454e534580ffff82736e01ffff82737401ffff826d68a0a5b69e5875389f82f57be37ceb28972a5b7a93877982d4a62ce377a62f303159ffff826c68a030a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc680ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff01a0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa05353f6bfde64e24706ac698bf920bab1cb608f52f81d6dfbe8ea6283c9d357eaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0e3c2a20293c88aafbc7d939fa29421470ade9eee8e4e0fb0371fa9a1268434f5ffff04ffff0182012cff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a5b35d3370745ae7634022ddd970379b4ed4acdd2d34622f1dfdf2b9923b16ac6e8b317abcf1cc8beb1e882d341e4458ff018080ff018080808080ff018080808080ff01808080",
        "solution": "0xffffa09ce348272a1e011405dbcb0fb5881f8230c93b320039e93e2b1dc3530afaea51ffa026d7b02727f0b09ba89df9967acde88871461a82beb450ed34eeb3a1c3d50473ff0180ff01ffffffff80ffff01ffff81f6ff80ff80ff8080ffff33ffa0c6effdca80227b7e5aa836b666f37d92ada01bdc207af232263675e31148b2c9ff01ffffa0c6effdca80227b7e5aa836b666f37d92ada01bdc207af232263675e31148b2c9808080ff8080808080"
      },
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0x27f9232ad5c9b05bd5527de82961893004e6843d85853f8bdab9c148934b51a8",
          "puzzle_hash": "0xf13ea0af8febe60e4f94099a352a56879ddf6280127b134d3d37970d04d2f3ef"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa03fbf39d79089287207b6118bc3a093aa1ddb1a5152a500b6c3d35fa3536c0936a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc05868747470733a2f2f6261666b726569616d64746c7279373665336a776669766870686d7661767a613736766d646d6d626c6d74373574377664796c6e783374616664652e697066732e6e667473746f726167652e6c696e6b80ffff68a00c1cd71c7fc4da6c5454ef3b2a0ae41ff55836302b64ffd9fea3c2db7dcc0519ffff826d75ffc05868747470733a2f2f6261666b72656963666e6d327571716c666d6a6564677a79363468616d667068696e79667466623572777469746666643361647a347674346f656d2e697066732e6e667473746f726167652e6c696e6b80ffff826c75ffc05968747470733a2f2f6261666b726569657162626e356936337971686734637a6f3676637276676662753676337a7269726c6e6d376570336b63616976617679353634752e697066732e6e667473746f726167652e6c696e6b2f80ffff82736e01ffff82737401ffff826d68a0456b35484165624833671ee1c0c2bce86e0b3287b1b4d132947b00f3cacf8e23ffff826c68a090085bd47b7881cdc165dea8a3531434f57798a22b6b3e47ed42022a0ae3bee580ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff01a0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa03fbf39d79089287207b6118bc3a093aa1ddb1a5152a500b6c3d35fa3536c0936a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a00d4d75aa0be98c014023e83760a421059e6ef40af644d14492c3f624bdc80c7affff04ffff01820258ff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0992b0469f257e4b93f6555b66ebad6b39d6794206db9500c6962407840bbe1e6b36dd91582c465aa0ea8b9e911e3d3adff018080ff018080808080ff018080808080ff01808080",
        "solution": "0xffffa0a11b0e166642ada508e6a135b906351844730d152720bd2c45073f3ccdc9d418ffa0cf0094e38843630eb52ac8ce4001063fdc838628fff6a8b4c07eb8873d10c7c4ff0180ff01ffffffff80ffff01ffff81f6ff80ff80ff8080ffff33ffa0deb4cdacdb89bf918f9e1d4bff413c186ffe40c470ed6f9c14ed36e6676e975cff01ffffa0deb4cdacdb89bf918f9e1d4bff413c186ffe40c470ed6f9c14ed36e6676e975c808080ff8080808080"
      }
    ]
  },
  "success": true,
  "wallet_id": [6]
}
```

</details>

---

### `nft_transfer_nft`

Functionality: Transfer an NFT to a new wallet address

Usage: chia rpc wallet [OPTIONS] nft_transfer_nft [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag           | Type       | Required | Description                                                                                                                                                                              |
| :------------- | :--------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| wallet_id      | NUMBER     | True     | The Wallet ID of the NFT to transfer                                                                                                                                                     |
| target_address | STRING     | True     | The address to transfer the NFT to. For NFT0 this must be an XCH address. For NFT1 this could also be a DID address                                                                      |
| nft_coin_id    | HEX STRING | True     | The coin ID of the NFT to transfer                                                                                                                                                       |
| fee            | NUMBER     | False    | The one-time blockchain fee to be used upon transferring the NFT                                                                                                                         |
| reuse_puzhash  | BOOLEAN    | False    | If `true`, will not generate a new puzzle hash / address for this transaction only. Note that setting this parameter to `true` will override the global default setting from config.yaml |

<details>
<summary>Example</summary>

```json
chia rpc wallet nft_transfer_nft '
{
    "wallet_id": 2,
    "target_address": "txch13w2ytvchereqawqjp4r09mqjhwk7unvndew2a400jxtu7q5kr7csqy70f7",
    "nft_coin_id": "0x2691a4aa3533a3b3ef57cc8f70af22f1238d8961fb6b98b4f48eb34b61dc47b1",
    "fee": 10000000
}'
```

Response:

```json
{
  "spend_bundle": {
    "aggregated_signature": "0xa309c0f92836f8026b7a0ed72db29b6505b11ace1fb2bfb5ab75a32184b50d11ef31f935fd383301bf38fa3d4211e06a0ddc8a27f48f6aa71c73e86a45056066d9ebe71c504494d079eb7cd74e7f7cf2f9e6c193790e3caa8cc7169afe3e320b",
    "coin_solutions": [
      {
        "coin": {
          "amount": 1,
          "parent_coin_info": "0xa05ac57eb273f459a2b3afd71da2d613d55048d6db25052b399d109e35d8a363",
          "puzzle_hash": "0x216718e9d29bf4ae4f010aa40d6560369546ebdd67be900e2d94644ec0acb286"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0ba54ae34764b024b3b7a4f0ead65e66e53fbf54d29563f09b360b978ebf9edf1a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff01ff0180808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a031f5e810e2ad078817e8b047306c877ad82c77511aa235179c4a98af413f162affff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780ffff68a014836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0ffff826d7580ffff826c7580ffff82736e01ffff8273740180ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b091f4a1811c7ccdf84207e433bc470ef9aaed1f141960017918fc3427b5e3bbff3513c3023b43a2f8a66d37df12c0aaddff018080ff018080808080ff01808080",
        "solution": "0xffffa0ba54ae34764b024b3b7a4f0ead65e66e53fbf54d29563f09b360b978ebf9edf1ffa015ee802432d24048a8e32bad8ad006472bb65b720b03c6ba9f38158bea8dbe9bff0180ff01ffffff80ffff01ffff33ffa08b9445b317c8f20eb8120d46f2ec12bbadee4d936e5caed5ef9197cf02961fb1ff01ffffa08b9445b317c8f20eb8120d46f2ec12bbadee4d936e5caed5ef9197cf02961fb18080ffff3cffa02691a4aa3533a3b3ef57cc8f70af22f1238d8961fb6b98b4f48eb34b61dc47b18080ff80808080"
      },
      {
        "coin": {
          "amount": 989949999972,
          "parent_coin_info": "0x8df3d521a60a4455b8ad6d1dd675632caa2092eb79c149e6ad20963278a2494f",
          "puzzle_hash": "0xc10e58ea998df6c27f57d86548ca165e578a31bee643df5deb7295fbf445888c"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0898ca2b00c017a30e9095dbfd2769a84bbd65cac8b533c209bab34f4b146378643403799ac44fb6bea7b7cc281256336ff018080",
        "solution": "0xff80ffff01ffff33ffa0a320bb1086818cc3b22a3d3ca45086316d20a0e689b8767a6cf43450152dbfd0ff8600e67d05a4e480ffff34ff840098968080ffff3cffa0b1ae17303885cd04525dbf87678aa78d550eeac21f511d74301cd302daedb88a80ffff3dffa08b58c5ffe8bf9baebd47b4310b89bffe2c9ccd7239135d22b71efbb19c897ec68080ff8080"
      }
    ]
  },
  "success": true,
  "wallet_id": 2
}
```

</details>

---
