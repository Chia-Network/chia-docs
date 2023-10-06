---
sidebar_label: NFTs
title: NFT CLI
slug: /nft-cli
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Reference

### `create`

Functionality: Create an NFT wallet

Usage: chia wallet nft create [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -di           | --did-id          | TEXT    | False    | DID Id to use                                                                                            |
| -n            | --name            | TEXT    | False    | Set the NFT wallet name                                                                                  |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
<summary>Example 1 - Create an NFT wallet that is not linked to a DID</summary>
 
Create an NFT Wallet:

```bash
chia wallet nft create
```

Response:

```
Successfully created an NFT wallet with id 3 on key 4288332900
```

</details>

<details>
<summary>Example 2 - Create an NFT wallet that is linked to a DID, specifying the fingerprint and name</summary>

```bash
chia wallet nft create -f 4288332900 -di did:chia:17jvhl9z8zj6jma2uxk4mqj22p90hfpf29svlvlyalu8ksyefsvpql7f403 -n "DID-linked NFT Wallet"
```

Response:

```
Successfully created an NFT wallet with id 4 on key 4288332900
```

</details>
<details>
<summary>Show both of these NFT wallets</summary>

```bash
chia wallet show
```

Response:

```
Wallet height: 1117958
Sync status: Synced
Balances, fingerprint: 4288332900

Chia Wallet:
   -Total Balance:         0.999989999991 txch (999989999991 mojo)
   -Pending Total Balance: 0.999989999991 txch (999989999991 mojo)
   -Spendable:             0.999989999991 txch (999989999991 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

New Name:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:17jvhl9z8zj6jma2uxk4mqj22p90hfpf29svlvlyalu8ksyefsvpql7f403
   -Wallet ID:             2

NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -Wallet ID:             3

DID-linked NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -DID ID:                did:chia:17jvhl9z8zj6jma2uxk4mqj22p90hfpf29svlvlyalu8ksyefsvpql7f403
   -Wallet ID:             4
```

</details>

---

### `mint`

Functionality: Mint an NFT

Usage: chia wallet nft mint [OPTIONS]

Options:

| Short Command | Long Command                  | Type    | Required | Description                                                                                              |
| :------------ | :---------------------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port             | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint                 | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id                          | INTEGER | True     | Id of the NFT wallet to use                                                                              |
| -u            | --uris                        | TEXT    | True     | Comma separated list of content URIs                                                                     |
| -nh           | --hash                        | TEXT    | True     | NFT content hash                                                                                         |
| -mu           | --metadata-uris               | TEXT    | False    | Comma separated list of metadata URIs                                                                    |
| -mh           | --metadata-hash               | TEXT    | False    | NFT metadata hash                                                                                        |
| -lu           | --license-uris                | TEXT    | False    | Comma separated list of license URIs                                                                     |
| -lh           | --license-hash                | TEXT    | False    | NFT license hash                                                                                         |
| -ra           | --royalty-address             | TEXT    | False    | Royalty address                                                                                          |
| -rp           | --royalty-percentage-fraction | INTEGER | False    | NFT royalty percentage fraction in basis points. Example: 175 would represent 1.75% [default: 0]         |
| -ta           | --target-address              | TEXT    | False    | Target address                                                                                           |
| -en           | --edition-number              | INTEGER | False    | NFT edition number [default: 1]                                                                          |
| -et           | --edition-total               | INTEGER | False    | NFT edition total number [default: 1]                                                                    |
| -m            | --fee                         | TEXT    | False    | Set the fees per transaction, in XCH [default: 0]                                                        |
|               | --no-did-ownership            | None    | False    | Disable DID ownership support. If this flag is not set, then DID ownership is supported by default       |
| -h            | --help                        | None    | False    | Show a help message and exit                                                                             |

<details>
   <summary>Example 1 - Mint an NFT that is not associated with a DID</summary>

```bash
chia wallet nft mint -i 3 -u https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg -nh 14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0
```

Response:

```
NFT minted Successfully with spend bundle:
{
   'aggregated_signature': '0x955e7af8daabdc133b403e6339aaf8db62547bb248b506cedaa66caba69878b93db40297b92ea33d793eb966da7bb9fb0a962830d9cb979c8f92380f29208fd5db9ffb6074945df165ef59aa8910f1f1aa2dba874cfe98bfa7991e10e80a2935',
   'coin_solutions': [{
      'coin': {
         'amount': 999989999991,
         'parent_coin_info': '0x544366ddf25f8422c0e369eebdf7d0c06b9319c66a3225fcd59d8daed7647a5d'
         'puzzle_hash': '0x05dd4fb123b88ee430282e76beec1f486a0323d69be8dc6f0980de8675df8bb9'
      },
      'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b08fd89a87f712de13cc48ebe15ab7fe57975e61900924b32cb83895b990836bacec7cf331a51ff0c03a97f10c92f9722aff018080',
      'solution': '0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa0ff408b795e816dcef40ca081b10aa0e1cff7ff34313455e9d71be9097809582bff8600e8d40c797680ffff3cffa04b296555bd48d1b50d02982ba9b1bcabff474fb6171955f932b50951048424e980ffff3dffa0014a582b02e9f7e3edbf99707b18d155c7348d3a84e87492271f435f923cd9be8080ff8080'
   }, {
      'coin': {
         'amount': 1,
         'parent_coin_info': '0xab48568ee3b109a71d1bb097da77a3c4c5eee7e9add00dee779bf62323598cc7',
         'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
      },
      'puzzle_reveal': '0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080',
      'solution': '0xffa084d00d38505206aba8b1658ab6502b6364ff8c39ab05c3d5f25984302fb1e176ff01ff8080'
   }, {
      'coin': {
         'amount': 1,
         'parent_coin_info': '0xe961030a239afe44b11b4fcb89edb98520d32737555e90021e3b0f7ea8d05e8c',
         'puzzle_hash': '0x84d00d38505206aba8b1658ab6502b6364ff8c39ab05c3d5f25984302fb1e176'
      },
      'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0e961030a239afe44b11b4fcb89edb98520d32737555e90021e3b0f7ea8d05e8ca0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff01ff0180808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a031f5e810e2ad078817e8b047306c877ad82c77511aa235179c4a98af413f162affff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780ffff68a014836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0ffff826d7580ffff826d6800ffff826c7580ffff826c6800ffff82736e01ffff8273740180ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0862ce162a88bbac828dee02d318618d15b1b1d6a8a3f46ad8d5c15fd26e51f4115b3d3f9f9025edb581ce70ca084cda4ff018080ff018080808080ff01808080',
      'solution': '0xffffa0ab48568ee3b109a71d1bb097da77a3c4c5eee7e9add00dee779bf62323598cc7ff0180ff01ffffff80ffff01ffff33ffa0ab8ba18db3cf4f3a2b355a71490013f5273372760cbd991886ef3c05e1ff3ef2ff01ffffa0ab8ba18db3cf4f3a2b355a71490013f5273372760cbd991886ef3c05e1ff3ef2808080ff8080ff018080'
   }
]}
```

</details>

<details>
   <summary>Example 2 - Mint an NFT that is associated with a DID. Specify all URLs and hashes, along with a royalty of 3%</summary>

```bash
chia wallet nft mint -f 2522319413 -i 2 -ra txch1r2hc8zaxmqetkwuqz99nspwa7dlhnyx6uuxlt8srrsd2n7pscwfqgjhy7h -ta txch1z456h8t2wyzhrpzz8mf844zd6jc6tf7stlwggdf57hm3f3mh6cmqf2kzv2 -u https://images.pexels.com/photos/12051365/pexels-photo-12051365.jpeg -nh fca3e8ddae9bf8dc7d4100f36d15395744650b3751420cc647fcf973243b533f -mu https://metadata_example.com -mh 868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e -lu https://license_example.com -lh 358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82 -et 1337 -en 42 -rp 300
```

Response:

```
NFT minted Successfully with spend bundle:
{
   'aggregated_signature': '0xb64cc927430004c4ea2a0691a4eaa0095a546d3895bb709f243aeae008585592bdf1bb6a1b8a47d09524969adaa53eda19218391b586302595edcb5245e1de7cb2000a24caf41de5691852d56dc6733edae73e8ee8729aad1a24676f932415e0',
   'coin_solutions': [{
      'coin': {
         'amount': 989949999979,
         'parent_coin_info': '0x360946634ca064b8b5fb7e57700180372026071361844b7f89d4e169ea9338f8',
         'puzzle_hash': '0xab14a74b9d5db864e9fd5d0d11f273ac27833aee9ef620ce6645d0fba8af845b'
      },
      'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0990651e1f532086b86f02ee2105835359bb32ecc40c6bea72c7836293ce1987029b8315f46b6ee887eb7897e02555831ff018080',
      'solution': '0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa09c5ba7cc1bad5775e0c434159bdfc81a1291a079103e061382a0774f862ccd8dff8600e67d9e3b6a80ffff3cffa04e218ac628b8edc5e27eec0c596daf2d7d360a16db1b5b5a69b33b574ecea30280ffff3dffa0e7bf28c408f4099a590a6b9ef00c476053a3706c39021a98505bd754c5ae7fba8080ff8080'
   }, {
      'coin': {
         'amount': 1,
         'parent_coin_info': '0x42318b29a8000f8286f6b4fbb62b50be4f89e4d2717bdbabaad3a25903adb345',
         'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
      },
      'puzzle_reveal': '0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080',
      'solution': '0xffa02b5775837ee7f6c87e16c8e53b9fcaae0b94cb0b7f89fcaef1b539b36e0f528fff01ff8080'
   }, {
      'coin': {
         'amount': 1,
         'parent_coin_info': '0x219966a50132486af9c005352738fedbedd3f8f82f4ae20cb700c0f4d7c50dcc',
         'puzzle_hash': '0x2b5775837ee7f6c87e16c8e53b9fcaae0b94cb0b7f89fcaef1b539b36e0f528f'
      },
      'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0219966a50132486af9c005352738fedbedd3f8f82f4ae20cb700c0f4d7c50dcca0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff01ff0180808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a031f5e810e2ad078817e8b047306c877ad82c77511aa235179c4a98af413f162affff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31323035313336352f706578656c732d70686f746f2d31323035313336352e6a70656780ffff68a0fca3e8ddae9bf8dc7d4100f36d15395744650b3751420cc647fcf973243b533fffff826d75ff9c68747470733a2f2f6d657461646174615f6578616d706c652e636f6d80ffff826c75ff9b68747470733a2f2f6c6963656e73655f6578616d706c652e636f6d80ffff82736e2affff827374820539ffff826d68a0868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823effff826c68a0358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a8280ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b65abbed758f97032351ac630c6e7c60f60679fd3492074ef4b72e4961b8f933c5bbe05fc9b583a911b35e43df935824ff018080ff018080808080ff01808080',
      'solution': '0xffffa042318b29a8000f8286f6b4fbb62b50be4f89e4d2717bdbabaad3a25903adb345ff0180ff01ffffff80ffff01ffff33ffa01569ab9d6a71057184423ed27ad44dd4b1a5a7d05fdc843534f5f714c777d636ff01ffffa01569ab9d6a71057184423ed27ad44dd4b1a5a7d05fdc843534f5f714c777d636808080ff8080ff018080'
   }
]}
```

Show the results of running Example 2:

```bash
chia wallet nft list -i 2
```

Response:

```
NFT identifier:            nft1yxvkdfgpxfyx47wqq56jww87m0ka878c9a9wyr9hqrq0f479phxqps7rtf
Launcher coin ID:          219966a50132486af9c005352738fedbedd3f8f82f4ae20cb700c0f4d7c50dcc
Launcher puzhash:          eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9
Current NFT coin ID:       b2084a3d30780b3b02c967135bdee387aaf9e5114ffe70275c81f7f3257157e2
On-chain data/info:        ((117 "https://images.pexels.com/photos/12051365/pexels-photo-12051365.jpeg") (104 . 0xfca3e8ddae9bf8dc7d4100f36d15395744650b3751420cc647fcf973243b533f) (28021 "https://metadata_example.com") (27765 "https://license_example.com") (29550 . 42) (29556 . 1337) (28008 . 0x868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e) (27752 . 0x358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82))
Owner DID:                 None
Royalty percentage:        None
Royalty puzhash:           None
NFT content hash:          fca3e8ddae9bf8dc7d4100f36d15395744650b3751420cc647fcf973243b533f
Metadata hash:             868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e
License hash:              358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82
NFT edition total:          1337
Current NFT edition number: 42
Metadata updater puzhash:  fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b
NFT minting block height:  1126632
Inner puzzle supports DID: False
NFT is pending for a transaction: False

URIs:
   https://images.pexels.com/photos/12051365/pexels-photo-12051365.jpeg

Metadata URIs:
   https://metadata_example.com

License URIs:
   https://license_example.com
```

</details>

<details>
   <summary>Example 3 - Mint a video NFT that is associated with a DID</summary>

Here we'll use a direct link to a .webp file:

```bash
chia wallet nft mint -f 3792481086 -i 5 -ra xch1u0p2yq5nez92l0rajw0699ppgu9da8hw3e8qlvphr756zf5yxn6sllagty -ta xch1yr62k5fmpj386rf0ljp3n8p9jzmxuv7axmqpmmkeuucktetummqsvqy4vw -u https://img.starstorm.io/sol3.webp -nh 186ffc3d5694c199c3d970e724d959e7ca2e13d8e7dd26e77c4bb0ddbea13dac -mu "https://pastebin.com/raw/jfuGnCMD" -mh a5b69e5875389f82f57be37ceb28972a5b7a93877982d4a62ce377a62f303159 -lu https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE -lh 30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6 -rp 300 -m 0.000615
```

Response:

```bash
NFT minted Successfully with spend bundle:
{
   'aggregated_signature': '0x960d4d884a8d79bef02c04cba5eee28c8003e86812b3c061be546d54a5fa8eedd3adfdbcfc5b1d0d1b9e7e2e7cb8dc0c15f3b3d90e364d604376509d3c085a61ce35080b79aa54e2d36275d39995e38096b4f1f81d2262d5ca63a6e49053c783',
   'coin_solutions': [
      {
         'coin': {
            'amount': 1, 'parent_coin_info': '0x5353f6bfde64e24706ac698bf920bab1cb608f52f81d6dfbe8ea6283c9d357ea', 'puzzle_hash': '0xb225c8b019a6136f60cdfb00d2be02608bee62a3fbc4fe0739f6b1f7ad5f4e01'
         },
         'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa05353f6bfde64e24706ac698bf920bab1cb608f52f81d6dfbe8ea6283c9d357eaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffa268747470733a2f2f696d672e7374617273746f726d2e696f2f736f6c332e7765627080ffff68a0186ffc3d5694c199c3d970e724d959e7ca2e13d8e7dd26e77c4bb0ddbea13dacffff826d75ffa168747470733a2f2f706173746562696e2e636f6d2f7261772f6a6675476e434d4480ffff826c75ffc04b68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f436869612d4e6574776f726b2f636869612d626c6f636b636861696e2f6d61696e2f4c4943454e534580ffff82736e01ffff82737401ffff826d68a0a5b69e5875389f82f57be37ceb28972a5b7a93877982d4a62ce377a62f303159ffff826c68a030a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc680ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff0180ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa05353f6bfde64e24706ac698bf920bab1cb608f52f81d6dfbe8ea6283c9d357eaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0e3c2a20293c88aafbc7d939fa29421470ade9eee8e4e0fb0371fa9a1268434f5ffff04ffff0182012cff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b099b5094c03d5b43a0361c5fad9918bfe52ed120b0732b9a0ae19387bc07772afedb2ad3804963b948a8817218671df67ff018080ff018080808080ff018080808080ff01808080', 'solution': '0xffffa0fa5ea9623319a1d69ec45ea5c05bf17b299afacc250bca7a73e9e41a15ea6710ff0180ff01ffffffff80ffff01ffff81f6ffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83ff80ffa056e33fc1fe1a970cbdedb90559097186587fdd4d484b4fef2d96bd4f3afe808280ffff33ffa020f4ab513b0ca27d0d2ffc83199c2590b66e33dd36c01deed9e73165e57cdec1ff01ffffa020f4ab513b0ca27d0d2ffc83199c2590b66e33dd36c01deed9e73165e57cdec1ffa020f4ab513b0ca27d0d2ffc83199c2590b66e33dd36c01deed9e73165e57cdec1808080ff8080808080'
      }, {
         'coin': {
            'amount': 64428799996, 'parent_coin_info': '0x329fcd88f889e7c36455960ec3b5b1e96bb70c85f60737381b4991030878c56a', 'puzzle_hash': '0xdb30018910a67bf20b702e4f97e754c75781f57727ac2e91e595fbacb133777d'
         },
         'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0813e0edff6ed8951954b31bd69755ca576df4e786ec7f99148d38fc357a9b8f35082d862c95107f8fac3ec1c10dd524cff018080', 'solution': '0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa0d5ce3fb2ffffd883c20a6dda284036603e102f509f18d99e7e8c75ac8c4d914cff850edb99503b80ffff34ff8424a827c080ffff3cffa0d972ec444a34cd446cf3eca415e682fadaf37a3e720ceba514547275bb53a65980ffff3dffa0d0c9b5213d779b6c8588e3defcfc2464da971c302b5dc7e4745950ca26fe50b28080ff8080'
      }, {
         'coin': {
            'amount': 1, 'parent_coin_info': '0xfa5ea9623319a1d69ec45ea5c05bf17b299afacc250bca7a73e9e41a15ea6710', 'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
         },
         'puzzle_reveal': '0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080', 'solution': '0xffa0b225c8b019a6136f60cdfb00d2be02608bee62a3fbc4fe0739f6b1f7ad5f4e01ff01ff8080'
      }, {
         'coin': {
            'amount': 1, 'parent_coin_info': '0x51f92f08fa0ea0b8f4f69d97e8661df327a24176fc5ad093be0d2960923c470f', 'puzzle_hash': '0x50f90b0ff7cdd672953ccfe8b90c2543673bc8aa56981dd7ccee1c41746f6e72'
         },
         'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a03bd712b40b706102ffb9a70612bfbb7ce3aa30c81a988e3993e1cdfcc652f43d454904f483151b73abcc996fa7c02eff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080', 'solution': '0xffffa04e2e84217422393f61f62d02762e4e543b05eabd08dea30117a5e57313a550f8ffa056e33fc1fe1a970cbdedb90559097186587fdd4d484b4fef2d96bd4f3afe8082ff0180ff01ffff01ffff80ffff01ffff33ffa056e33fc1fe1a970cbdedb90559097186587fdd4d484b4fef2d96bd4f3afe8082ff01ffffa056e33fc1fe1a970cbdedb90559097186587fdd4d484b4fef2d96bd4f3afe80828080ffff3effa05353f6bfde64e24706ac698bf920bab1cb608f52f81d6dfbe8ea6283c9d357ea8080ff80808080'
      }
   ]
}
```

</details>

---

### `set_did`

Functionality: Set the DID associated with an NFT

Usage: chia wallet nft set_did [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id              | INTEGER | True     | Id of the NFT wallet to use                                                                              |
| -di           | --did-id          | TEXT    | True     | DID ID to set on the NFT                                                                                 |
| -ni           | --nft-coin-id     | TEXT    | True     | Coin ID of the NFT coin to set the DID on                                                                |
| -m            | --fee             | TEXT    | False    | Set the fees per transaction, in XCH [default: 0]                                                        |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
   <summary>Example</summary>

Set the DID on an NFT in wallet `2` and include a 1-mojo fee:

```bash
chia wallet nft set_did -f 590161281 -i 2 -di did:chia:1cxw5dqug4gavvgylx88zfkmqv235ryr6j9tvyjwwuga0pa52wjvqavdyar -ni 0xf3450f0cc18e1ded3615eb2ce52bc67be8550ff03fa128f4515b49d157a3d9ad -m 0.000000000001
```

Response:

```
Transaction to set DID on NFT has been initiated with: {'aggregated_signature': '0x9925e60697330c525c9a2ba03fa923a10d49c00a37caaecfb6d298fb5ff0eb73c05278ea02f9c90a0399c24a548fbe61002c38988e8d9af0bef4b137b086beee393d547ca70de3b19cc7e698bd8bb89b21ecd0cad23437e0a736db5a6c0ef712', 'coin_solutions': [{'coin': {'amount': 1, 'parent_coin_info': '0xac2e92501afd2c4e9f5ac2dd9d1b997b01fec0f3f40ac2cb3c2d7472f0f3555d', 'puzzle_hash': '0x1a2e7976000f4775ff9d81cd8f6033c9e02e252195632a2da30e3d9e12e55eef'}, 'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa05353f6bfde64e24706ac698bf920bab1cb608f52f81d6dfbe8ea6283c9d357eaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffa268747470733a2f2f696d672e7374617273746f726d2e696f2f736f6c332e7765627080ffff68a0186ffc3d5694c199c3d970e724d959e7ca2e13d8e7dd26e77c4bb0ddbea13dacffff826d75ffa168747470733a2f2f706173746562696e2e636f6d2f7261772f6a6675476e434d4480ffff826c75ffc04b68747470733a2f2f7261772e67697468756275736572636f6e74656e742e636f6d2f436869612d4e6574776f726b2f636869612d626c6f636b636861696e2f6d61696e2f4c4943454e534580ffff82736e01ffff82737401ffff826d68a0a5b69e5875389f82f57be37ceb28972a5b7a93877982d4a62ce377a62f303159ffff826c68a030a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc680ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff0180ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa05353f6bfde64e24706ac698bf920bab1cb608f52f81d6dfbe8ea6283c9d357eaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0e3c2a20293c88aafbc7d939fa29421470ade9eee8e4e0fb0371fa9a1268434f5ffff04ffff0182012cff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a5b35d3370745ae7634022ddd970379b4ed4acdd2d34622f1dfdf2b9923b16ac6e8b317abcf1cc8beb1e882d341e4458ff018080ff018080808080ff018080808080ff01808080', 'solution': '0xffffa0473da488ddc642669776c16b532efa460a48978b108e25b0a2f8e98ee8ab0290ffa0849e6585823e5b86aadf1950c8d910c361861c88cbfc3ae2552e5ba485d22ba5ff0180ff01ffffffff80ffff01ffff81f6ffa0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498ff80ffa0d58b4b9af7ef78eb649e45cc07b7aa502425639da56cae73560d5cd34cf8c93c80ffff33ffa0c6effdca80227b7e5aa836b666f37d92ada01bdc207af232263675e31148b2c9ff01ffffa0c6effdca80227b7e5aa836b666f37d92ada01bdc207af232263675e31148b2c98080ffff3cffa0f3450f0cc18e1ded3615eb2ce52bc67be8550ff03fa128f4515b49d157a3d9ad8080ff8080808080'}, {'coin': {'amount': 1, 'parent_coin_info': '0xb9d3d05020ebbd6279923377abf33a2cf9714e153f8f283b7b39b7417d1f72ef', 'puzzle_hash': '0x38d332b735c5b1a94b239a4019b9d7b6de4e5846b1d29bc174940e2fbbec7f8f'}, 'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b478c6a0ef7410679831d616d06e9fca856f6e08b8a6f13f344cc9aa20981ab7fe287663584e2fc53e2ac14edab883caff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0c19d468388aa3ac6209f31ce24db6062a341907a9156c249cee23af0f68a7498a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080', 'solution': '0xffffa0867f36aff7b70937076b33d6d1ed6851583d009571a664a260f2f0ac6a429c40ffa0d58b4b9af7ef78eb649e45cc07b7aa502425639da56cae73560d5cd34cf8c93cff0180ff01ffff01ffff80ffff01ffff33ffa0d58b4b9af7ef78eb649e45cc07b7aa502425639da56cae73560d5cd34cf8c93cff01ffffa02c3d72acbdb2cc5930bb2f4b5d4f79ca9e8ec0217a9e17eac515a1f1344f9ac88080ffff3effa05353f6bfde64e24706ac698bf920bab1cb608f52f81d6dfbe8ea6283c9d357ea8080ff80808080'}, {'coin': {'amount': 1, 'parent_coin_info': '0x2fb76e4abf88c1bb6033690a9748a873383774690265cbe19eff01970c8cde1a', 'puzzle_hash': '0x9e5ee1d992073324d0b008d17c6258d7bc878296cb03c11791567fac8414e097'}, 'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b083e11f56edd8a9983dd41ea03c11637cacb98fda9148947c58357c2fb7bae53b626396972fef4d7850c30221dd89eb75ff018080', 'solution': '0xff80ffff01ffff34ff0180ffff3cffa0c2bb979a83aaa27152aec128b6cf6f8ec56519fea8d51f021779bb05afad14c380ffff3dffa04e1c8e72798000467d29eece739a92e24edf34dc7cc099a0517b3f8b0c29c6678080ff8080'}]}
```

</details>

---

### `sign_message`

Functionality: Sign a message using a specified NFT ID. This command does not modify the blockchain.

Usage: chia wallet nft sign_message [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --nft_id          | TEXT    | True     | NFT ID you want to use for signing                                                                       |
| -m            | --hex_message     | TEXT    | True     | The message you want to sign                                                                             |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
   <summary>Example 1: Basic signing</summary>

```bash
chia wallet nft sign_message -f 590161281 -i nft12dfld077vn3ywp4vdx9ljg96k89kpr6jlqwkm7lgaf3g8jwn2l4q6eytqs -m "This is a test message."
```

Response:

```
Message: This is a test message.
Public Key: a5b35d3370745ae7634022ddd970379b4ed4acdd2d34622f1dfdf2b9923b16ac6e8b317abcf1cc8beb1e882d341e4458
Signature: 88eb8bacdc6b19614aa7744c3b3809e3c0ff76ba398fe6eebb7eaeb2fcb35452243edf85f31c92bdc17422511cc529fc16c95d62d91b58ec2b01986d6d768fe2a332edab95057b5ed2c1682d5817b2fc6694a6f1ebd3ee9040d5760c4a230c0d
```

</details>

<details>
   <summary>Example 2: Obtain and validate a signature</summary>

This example was created on the testnet. For applying these instructions to mainnet, the only material difference is in the prefix of the address (txch/xch).

Start by signing a message:

```bash
chia wallet nft sign_message -f 52772570 -i nft1srnr973dl9hqlswfl9wz5f2xap27ue8057yf6hw2erav2tf987vs4ql9y2 -m 'happy happy joy joy'
```

Response:

```
Message: happy happy joy joy
Public Key: a563d59587cb79ca4ecd544733955f869e9f0f41d0707bc3ada31058917566defd4a1560b528b2bd6849b7c7f29de308
Signature: 8b7b6fa8cd7689313df0900a726309f40100020f9a1e6ffdf8c0fd043057c383dbbec76cb091b5943330c215831225570be2bf966a148a334e17d8fc888f36a7a08e71faf4ffb3418a0b18a965fbed4208fa83da02071c7c192a80c8ceb8f2b6
Signing Mode: BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_AUG:CHIP-0002_
```

Next, let's say you want to verify whether the above signature came from a specific NFT. Start by obtaining the NFT's information:

```bash
chia rpc wallet nft_get_info '{"coin_id":"nft1srnr973dl9hqlswfl9wz5f2xap27ue8057yf6hw2erav2tf987vs4ql9y2"}'
```

Note the `p2_address` in the response:

```bash
{
    "nft_info": {
        "chain_info": "((117 \"https://bafybeibhw4np3amsybmddqohgkkxgcbsl3x7lc2pagckc6u422zhz6liai.ipfs.nftstorage.link/8.png\") (104 . 0x57bab753284cad6800460fddfca94f916a0d98a8b5329318075472a31fa22a74) (28021 \"https://bafybeibhw4np3amsybmddqohgkkxgcbsl3x7lc2pagckc6u422zhz6liai.ipfs.nftstorage.link/8.json\") (27765) (29550 . 1) (29556 . 1) (28008 . 0xf1ae0cd509485cfe8f273163ba6dfdd4a7465de3cd2cc912265c420f3768338a))",
        "data_hash": "0x57bab753284cad6800460fddfca94f916a0d98a8b5329318075472a31fa22a74",
        "data_uris": [
            "https://bafybeibhw4np3amsybmddqohgkkxgcbsl3x7lc2pagckc6u422zhz6liai.ipfs.nftstorage.link/8.png"
        ],
        "edition_number": 1,
        "edition_total": 1,
        "launcher_id": "0x80e632fa2df96e0fc1c9f95c2a2546e855ee64efa7889d5dcac8fac52d253f99",
        "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
        "license_hash": "0x",
        "license_uris": [],
        "metadata_hash": "0xf1ae0cd509485cfe8f273163ba6dfdd4a7465de3cd2cc912265c420f3768338a",
        "metadata_uris": [
                 "https://bafybeibhw4np3amsybmddqohgkkxgcbsl3x7lc2pagckc6u422zhz6liai.ipfs.nftstorage.link/8.json"
        ],
        "mint_height": 2130045,
        "minter_did": null,
        "nft_coin_id": "0x6cd6c98916e8fcb6ad8c0fcf28cd2ed8b65c8163f7072bf491366a99f26770ce",
        "off_chain_metadata": null,
        "owner_did": null,
        "p2_address": "0x56eaa066a0d202ffa30cf6a9ecc6d13002c32cc16d9507ef83ae9b8972a9700a",
        "pending_transaction": false,
        "royalty_percentage": null,
        "royalty_puzzle_hash": null,
        "supports_did": false,
        "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
    },
    "success": true
}
```

Next, convert the `p2_address` to an address. Spacescan.io has a [tool](https://www.spacescan.io/tools/puzzlehashconverter) that will perform this conversion.
It is also possible to do this conversion from the command line with the [chia-dev-tools repo](https://github.com/Chia-Network/chia-dev-tools), as shown here:

```bash
cdv encode --prefix txch 0x56eaa066a0d202ffa30cf6a9ecc6d13002c32cc16d9507ef83ae9b8972a9700a
```

Note that the `--prefix` flag is only needed if you are not running on mainnet. In this case, the resulting address begins with `txch`:

```bash
txch12m42qe4q6gp0lgcv7657e3k3xqpvxtxpdk2s0mur46dcju4fwq9qx5g0vx
```

Finally, call the `verify_signature` wallet RPC and pass in the address you just obtained:

```
chia rpc wallet verify_signature '{
  "pubkey": "a563d59587cb79ca4ecd544733955f869e9f0f41d0707bc3ada31058917566defd4a1560b528b2bd6849b7c7f29de308",
  "signature": "8b7b6fa8cd7689313df0900a726309f40100020f9a1e6ffdf8c0fd043057c383dbbec76cb091b5943330c215831225570be2bf966a148a334e17d8fc888f36a7a08e71faf4ffb3418a0b18a965fbed4208fa83da02071c7c192a80c8ceb8f2b6",
  "signing_mode": "BLS_SIG_BLS12381G2_XMD:SHA-256_SSWU_RO_AUG:CHIP-0002_",
  "message": "happy happy joy joy",
  "address": "txch12m42qe4q6gp0lgcv7657e3k3xqpvxtxpdk2s0mur46dcju4fwq9qx5g0vx"
}'
```

The result shows that the signature is valid:

```
{
    "isValid": true,
    "success": true
}
```

</details>

---

### `list`

Functionality: List the current NFTs

Usage: chia wallet nft list [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id              | INTEGER | True     | Id of the NFT wallet to use                                                                              |
|               | --num             | INTEGER | False    | Number of NFTs to return                                                                                 |
|               | --start-index     | INTEGER | False    | Which starting index to start listing NFTs from                                                          |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
   <summary>Example 1 - Show NFTs from a wallet that is not associated with a DID</summary>

```bash
chia wallet nft list -i 2
```

Response:

```
NFT identifier:            nft1yxvkdfgpxfyx47wqq56jww87m0ka878c9a9wyr9hqrq0f479phxqps7rtf
Launcher coin ID:          219966a50132486af9c005352738fedbedd3f8f82f4ae20cb700c0f4d7c50dcc
Launcher puzhash:          eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9
Current NFT coin ID:       b2084a3d30780b3b02c967135bdee387aaf9e5114ffe70275c81f7f3257157e2
On-chain data/info:        ((117 "https://images.pexels.com/photos/12051365/pexels-photo-12051365.jpeg") (104 . 0xfca3e8ddae9bf8dc7d4100f36d15395744650b3751420cc647fcf973243b533f) (28021 "https://metadata_example.com") (27765 "https://license_example.com") (29550 . 42) (29556 . 1337) (28008 . 0x868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e) (27752 . 0x358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82))
Owner DID:                 None
Royalty percentage:        None
Royalty puzhash:           None
NFT content hash:          fca3e8ddae9bf8dc7d4100f36d15395744650b3751420cc647fcf973243b533f
Metadata hash:             868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e
License hash:              358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82
NFT edition total:          1337
Current NFT edition number: 42
Metadata updater puzhash:  fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b
NFT minting block height:  1126632
Inner puzzle supports DID: False
NFT is pending for a transaction: False

URIs:
   https://images.pexels.com/photos/12051365/pexels-photo-12051365.jpeg

Metadata URIs:
   https://metadata_example.com

License URIs:
   https://license_example.com
```

</details>

<details>
   <summary>Example 2 - Show NFTs from a wallet that is associated with a DID</summary>

```bash
chia wallet nft list -i 4
```

Response:

```
NFT identifier:            nft1s5hlcv0q3edg5vf33dkzrg0z35dnhch5tszntcma0zc7mcrpqurqlhwceh
Launcher coin ID:          852ffc31e08e5a8a31318b6c21a1e28d1b3be2f45c0535e37d78b1ede0610706
Launcher puzhash:          eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9
Current NFT coin ID:       48e92b64a0a5b7f4c7b6d9df1d1766901785ef26970113eb01c64f3444c5c56d
On-chain data/info:        ((117 "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg") (104 . 0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0) (28021 "https://metadata_example.com") (27765 "https://license_example.com") (29550 . 42) (29556 . 1337) (28008 . 0x868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e) (27752 . 0x358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82))
Owner DID:                 did:chia:16kgxghw80cjlytl7x7zxuuux32v308fnmcgkfrh652rtcdqexm4q7gsarr
Royalty percentage:        300
Royalty puzhash:           1aaf838ba6d832bb3b80114b3805ddf37f7990dae70df59e031c1aa9f830c392
NFT content hash:          14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0
Metadata hash:             868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e
License hash:              358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82
NFT edition total:          1337
Current NFT edition number: 42
Metadata updater puzhash:  fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b
NFT minting block height:  1126708
Inner puzzle supports DID: True
NFT is pending for a transaction: False

URIs:
  https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg

Metadata URIs:
  https://metadata_example.com

License URIs:
  https://license_example.com
```

</details>

---

### `get_info`

Functionality: Get info about an NFT

Usage: chia wallet nft get_info [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -ni           | --nft-coin-id     | TEXT    | True     | Id of the NFT coin for which to show info                                                                |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
   <summary>Example</summary>

Get coin info by NFT Coin ID:

```bash
chia wallet nft get_info -ni 1338537ad709b6b99430216519780dbee187a3057ce1130ef750d28ccb97e14a
```

Response:

```
NFT identifier:            nft1hf22udrkfvpykwm6fu826e0xdeflha2d99tr7zdnvzuh36leahcsu7h2c3
Launcher coin ID:          ba54ae34764b024b3b7a4f0ead65e66e53fbf54d29563f09b360b978ebf9edf1
Launcher puzhash:          eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9
Current NFT coin ID:       1338537ad709b6b99430216519780dbee187a3057ce1130ef750d28ccb97e14a
On-chain data/info:        ((117 "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg") (104 . 0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0) (28021) (27765) (29550 . 1) (29556 . 1))
Owner DID:                 None
Royalty percentage:        None
Royalty puzhash:           None
NFT content hash:          14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0
Metadata hash:
License hash:
NFT edition total:          1
Current NFT edition number: 1
Metadata updater puzhash:  fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b
NFT minting block height:  1127233
Inner puzzle supports DID: False
NFT is pending for a transaction: False

URIs:
   https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg

Metadata URIs:

License URIs:
```

</details>

---

### `transfer`

Functionality: Transfer an NFT

Usage: chia wallet nft transfer [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id              | INTEGER | True     | Id of the NFT wallet to use                                                                              |
| -ni           | --nft-coin-id     | TEXT    | True     | Id of the NFT coin to transfer                                                                           |
| -ta           | --target-address  | TEXT    | True     | Target recipient wallet address                                                                          |
| -m            | --fee             | TEXT    | False    | Set the fees per transaction, in XCH. [default: 0]                                                       |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
<summary>Example 1 - Send an NFT from a wallet not associated with a DID</summary>

This recipient in this example will be a common burn address (an address for which nobody has the private key):

```bash
chia wallet nft transfer -i 2 -ni 889b12b6d4585bb63f51cf9b4e6ac138c2042330c0f3d386d40be6a4a42b9a4a -ta txch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm6ksh7qddh
```

Response:

```
NFT transferred successfully with spend bundle:
{
   'aggregated_signature': '0x86f5ca73687ac07518d933f8994b7e6dd73c0359b5266aab7fa744931082bd1220421a65c32900f0a20c66febfb599ba025b45119f5f3312b7abfcb2ae12dfd634b8ad206e227a877782d6c89ed25e7e543af07d31b49650214084add93960f3',
   'coin_solutions': [{
      'coin': {
         'amount': 1,
         'parent_coin_info': '0x0520b0fb4e64341a1eac44ef5f3e7da59650e5d525dce445d3e081783998ce98',
         'puzzle_hash': '0x1c6cbebe36eb2bf3c90e819feeea0c35ad6ead5b10773e10a87821f50acf9ba1'
      },
      'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0e961030a239afe44b11b4fcb89edb98520d32737555e90021e3b0f7ea8d05e8ca0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff01ff0180808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a031f5e810e2ad078817e8b047306c877ad82c77511aa235179c4a98af413f162affff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780ffff68a014836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0ffff826d7580ffff826d6800ffff826c7580ffff826c6800ffff82736e01ffff8273740180ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b080379d4ac3535dba586bcd0d6e14b87ff1e4a17451c22c68e174ec505e680fc87ff485c08f13021a9e205ee29020ed04ff018080ff018080808080ff01808080',
      'solution': '0xffffa0e961030a239afe44b11b4fcb89edb98520d32737555e90021e3b0f7ea8d05e8cffa0fc75102a5cf3cda8ffa0f8fc2474e4ca464ed1c129b58cc3c1a0fdf721b35d45ff0180ff01ffffff80ffff01ffff33ffa0000000000000000000000000000000000000000000000000000000000000deadff01ffffa0000000000000000000000000000000000000000000000000000000000000dead808080ff80808080'
   }
]}
```

</details>

<details>
<summary>Example 2 - Send an NFT from a wallet associated with a DID</summary>

This recipient in this example will be a common burn address (an address for which nobody has the private key):

```bash
chia wallet nft transfer -i 3 -ni 8daa6ce105509c65a7e72e74ed5fa7c46dfbd96987727c85a9808fcf7d4d98a0 -ta txch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm6ksh7qddh
```

Response:

```
NFT transferred successfully with spend bundle:
{
   'aggregated_signature': '0xa91bb34bccb51344e09a0a8ced2ef205f95e59ddd1118d54b30b2c9bd36673061ec71fef4b5018fc5538a0b1798f168e065283929f355272ee8443f8553e68d9545f260629e374ea84603fae52d98140703b5480888e0b67101df3934765dac7',
   'coin_solutions': [{
      'coin': {
         'amount': 1,
         'parent_coin_info': '0x6064cdebf09a8ef51666fbbac40f6ab64321bd473b0098965d8f0486b98bdc6b',
         'puzzle_hash': '0xd56eb24bccec23d6d91cb2adb292f824c770543a242dc6be8f02e18a3e151a80'
      },
      'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0ebfab91ca3950beb014142f2ea0e1606e0ce11cfcd670931ff9a7009e0f2eddfa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff01ff0180808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a031f5e810e2ad078817e8b047306c877ad82c77511aa235179c4a98af413f162affff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31323035313336352f706578656c732d70686f746f2d31323035313336352e6a70656780ffff68a0fca3e8ddae9bf8dc7d4100f36d15395744650b3751420cc647fcf973243b533fffff826d7580ffff826d6800ffff826c7580ffff826c6800ffff82736e2affff82737482053980ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff88ad4cd55cf7ad6414ff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff80ff80ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff22ffff20ffff09ffff0cff82029fff80ffff010880ff108080ffff09ffff0128ffff0dff82029f808080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ffff03ff81bfffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff80808080808080ffff01ff088080ff018080ff0180ff018080ffff04ffff01a0dacf3308015a4dd77e45a3f79c8b3cea7ec637d05554894c3eb5f779b17f379bffff04ffff01a0f4997f944714b52df55c35abb0494a095f74852a2c19f67c9dff0f6813298302ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff8202ffffff01ff04ff8204ffffff04ff80ffff04ffff02ffff03ffff22ff8204ffffff20ffff09ff8204ffff81bf808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8216ffffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff8204ffff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff820affffff04ff15ff80808080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff820affffff04ff15ff80808080808080808080ff0180ff80808080ffff01ff04ff81bfffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff5fffff01ff04ffff04ff10ffff04ffff0bffff02ffff03ff82019fffff01ff02ff2effff04ff02ffff04ff2fffff04ff17ffff04ffff0bff2cff82029f80ffff04ffff0bff2cff2f80ff80808080808080ffff011780ff0180ffff02ff3effff04ff02ffff04ffff04ff81bfffff04ffff04ff05ffff04ffff05ffff14ffff12ff82011fff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfff80808080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bff2cff058080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0ebfab91ca3950beb014142f2ea0e1606e0ce11cfcd670931ff9a7009e0f2eddfa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0c0d54c575f6193a6cc3d2e64f975a93ff0b37e13b2bcc449a36dc8ba01645eecffff04ffff0182012cffff04ffff01a0bae24162efbd568f89bc7a340798a6118df0189eb9e3f8697bcea27af99f8f79ffff04ffff01a072dec062874cd4d3aab892a0906688a1ae412b0109982e1797a170add88bdcdcff01808080808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b08fd89a87f712de13cc48ebe15ab7fe57975e61900924b32cb83895b990836bacec7cf331a51ff0c03a97f10c92f9722aff018080ff018080808080ff018080808080ff01808080',
      'solution': '0xffffa0ebfab91ca3950beb014142f2ea0e1606e0ce11cfcd670931ff9a7009e0f2eddfffa0eddf1957208ba252fcc100721f38704ed82f4de63549564ac20824290795c7c1ff0180ff01ffffffff80ffff01ffff81f6ff80ff80ff8080ffff33ffa0000000000000000000000000000000000000000000000000000000000000deadff01ffffa0000000000000000000000000000000000000000000000000000000000000dead808080ff8080808080'
   }
]}
```

</details>

---

### `add_uri`

Functionality: Add a data URI to an NFT

Usage: chia wallet nft add_uri [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required        | Description                                                                                              |
| :------------ | :---------------- | :------ | :-------------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False           | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False           | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id              | INTEGER | True            | Id of the NFT wallet to use                                                                              |
| -ni           | --nft-coin-id     | TEXT    | True            | Id of the NFT coin to update                                                                             |
| -u            | --uri             | TEXT    | True (see INFO) | Data URI to add to the NFT                                                                               |
| -mu           | --metadata-uri    | TEXT    | True (see INFO) | Metadata URI to add to the NFT                                                                           |
| -lu           | --license-uri     | TEXT    | True (see INFO) | License URI to add to the NFT                                                                            |
| -m            | --fee             | TEXT    | False           | Set the fees per transaction, in XCH. [default: 0]                                                       |
| -h            | --help            | None    | False           | Show a help message and exit                                                                             |

<details>
<summary>Example</summary>

Add a URI to an NFT by NFT coin ID:

```bash
chia wallet nft add_uri -i 3 -ni 254e54c6c8f2ecec8f4f5ec8291dab47b4042b350b6f1e1852212d194fc61537 -u https://sample.uri
```

Response:

```
URI added successfully with spend bundle:
{
   'aggregated_signature': '0xb605edf55dd94da2a22c9eafc1e18ba07740d4e2f36712a15cb17cf425f22dce38a02be75f263bf8227aca3e0649a5731650c068e58dd59571825e5310cc682894284381f6751420cd783dafc7ee044319ea14c1f0a6b3f3f6fabc2bc33d72d4',
   'coin_solutions': [{
      'coin': {
         'amount': 1,
         'parent_coin_info': '0xf08bc1510b7f293724692f546e1437c5b81bf81048ffa4980218919f260d1df8',
         'puzzle_hash': '0x62b893778a69b217e4392a490c169fa1099d9710e2c273015de98f3e4be5d198'
      },
      'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0aada32f5ab98fa1fa007e793bf77bea2182cac7c3b700ae7a51f71133536ad85a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff01ff0180808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a031f5e810e2ad078817e8b047306c877ad82c77511aa235179c4a98af413f162affff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31323035313336352f706578656c732d70686f746f2d31323035313336352e6a70656780ffff68a0fca3e8ddae9bf8dc7d4100f36d15395744650b3751420cc647fcf973243b533fffff826d7580ffff826d6800ffff826c7580ffff826c6800ffff82736e2affff82737482053980ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff88ad4cd55cf7ad6414ff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff80ff80ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff22ffff20ffff09ffff0cff82029fff80ffff010880ff108080ffff09ffff0128ffff0dff82029f808080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ffff03ff81bfffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff80808080808080ffff01ff088080ff018080ff0180ff018080ffff04ffff01a0dacf3308015a4dd77e45a3f79c8b3cea7ec637d05554894c3eb5f779b17f379bffff04ffff01a0f4997f944714b52df55c35abb0494a095f74852a2c19f67c9dff0f6813298302ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff8202ffffff01ff04ff8204ffffff04ff80ffff04ffff02ffff03ffff22ff8204ffffff20ffff09ff8204ffff81bf808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8216ffffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff8204ffff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff820affffff04ff15ff80808080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff820affffff04ff15ff80808080808080808080ff0180ff80808080ffff01ff04ff81bfffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff5fffff01ff04ffff04ff10ffff04ffff0bffff02ffff03ff82019fffff01ff02ff2effff04ff02ffff04ff2fffff04ff17ffff04ffff0bff2cff82029f80ffff04ffff0bff2cff2f80ff80808080808080ffff011780ff0180ffff02ff3effff04ff02ffff04ffff04ff81bfffff04ffff04ff05ffff04ffff05ffff14ffff12ff82011fff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfff80808080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bff2cff058080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0aada32f5ab98fa1fa007e793bf77bea2182cac7c3b700ae7a51f71133536ad85a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0c0d54c575f6193a6cc3d2e64f975a93ff0b37e13b2bcc449a36dc8ba01645eecffff04ffff0182012cffff04ffff01a0bae24162efbd568f89bc7a340798a6118df0189eb9e3f8697bcea27af99f8f79ffff04ffff01a072dec062874cd4d3aab892a0906688a1ae412b0109982e1797a170add88bdcdcff01808080808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b08fd89a87f712de13cc48ebe15ab7fe57975e61900924b32cb83895b990836bacec7cf331a51ff0c03a97f10c92f9722aff018080ff018080808080ff018080808080ff01808080',
      'solution': '0xffffa0aada32f5ab98fa1fa007e793bf77bea2182cac7c3b700ae7a51f71133536ad85ffa0c55f3fa2c44b8fb25157acff215284af585ead5eb2946c73f4dea8dab52ba836ff0180ff01ffffffff80ffff01ffff33ffa005dd4fb123b88ee430282e76beec1f486a0323d69be8dc6f0980de8675df8bb9ff01ffffa005dd4fb123b88ee430282e76beec1f486a0323d69be8dc6f0980de8675df8bb98080ffff81e8ffff02ffff01ff04ffff04ffff02ffff03ffff22ff27ff3780ffff01ff02ffff03ffff21ffff09ff27ffff01826d7580ffff09ff27ffff01826c7580ffff09ff27ffff01758080ffff01ff02ff02ffff04ff02ffff04ff05ffff04ff27ffff04ff37ff808080808080ffff010580ff0180ffff010580ff0180ffff04ff0bff808080ffff01ff808080ffff04ffff01ff02ffff03ff05ffff01ff02ffff03ffff09ff11ff0b80ffff01ff04ffff04ff0bffff04ff17ff198080ff0d80ffff01ff04ff09ffff02ff02ffff04ff02ffff04ff0dffff04ff0bffff04ff17ff8080808080808080ff0180ff8080ff0180ff018080ffff759268747470733a2f2f73616d706c652e75726980ffff81f6ff80ff80ff808080ff8080808080'
   }
]}
```

Get new NFT info by Wallet ID:

```bash
chia wallet nft list -i 3
```

Response:

```
NFT identifier:            nft14tdr9adtnraplgq8u7fm7aa75gvzetru8dcq4ea9rac3xdfk4kzsm47vr5
Launcher coin ID:          aada32f5ab98fa1fa007e793bf77bea2182cac7c3b700ae7a51f71133536ad85
Launcher puzhash:          eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9
Current NFT coin ID:       02de32c2c18c5a1049cfd5192021a9a8b08388e1ecd9e915468724fe91e4669b
On-chain data/info:        ((117 "https://sample.uri" "https://images.pexels.com/photos/12051365/pexels-photo-12051365.jpeg") (104 . 0xfca3e8ddae9bf8dc7d4100f36d15395744650b3751420cc647fcf973243b533f) (28021) (28008 . 0x00) (27765) (27752 . 0x00) (29550 . 42) (29556 . 1337))
```

</details>

---

### `set_did`

Functionality: Set a DID on an NFT

Usage: chia wallet nft set_did [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id              | INTEGER | True     | Id of the NFT wallet to use                                                                              |
| -di           | --did-id          | TEXT    | True     | DID Id to set on the NFT                                                                                 |
| -ni           | --nft-coin-id     | TEXT    | True     | Id of the NFT coin on which to set the DID                                                               |
| -m            | --fee             | TEXT    | False    | Set the fees per transaction, in XCH. [default: 0]                                                       |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
<summary>Example</summary>

```bash
chia wallet nft set_did -i 2 -di did:chia:16kgxghw80cjlytl7x7zxuuux32v308fnmcgkfrh652rtcdqexm4q7gsarr -ni 6052a11829c20e9fb9c8fd66b38565e1fcfdedae3d3b410dfb6caef363fb22d8
```

Response:

```
Transaction to set DID on NFT has been initiated with:
{
   'aggregated_signature': '0x85b31b9cab5f943e8aee056869abe5b83cf6f4ba82abf0818eb235f29776c1413980e97944dd305c11bd936b1412324e19cc5a7dbff3be62f1ed0b8fe6b7dffec019036882cc09988c76ca978164767f31af5e95f4ea919f5c7c9ec8d1fc21cc',
   'coin_solutions': [{
      'coin': {
         'amount': 1,
         'parent_coin_info': '0xf3c16450c3bda3f913ebcb9ad8291e8bd658d3c0e166d745203106e1149df51b',
         'puzzle_hash': '0xccd5da42dd88885494d6a8fa7863310565eec33961d7425554bfeaa23d16a563'
      },
      'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa049285cc9f2b0990f874e1319fe26ad749f15eb89cb5fd16bd75a1bb5c2a05a0ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff01ff0180808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a031f5e810e2ad078817e8b047306c877ad82c77511aa235179c4a98af413f162affff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780ffff68a014836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0ffff826d75ff9c68747470733a2f2f6d657461646174615f6578616d706c652e636f6d80ffff826c75ff9b68747470733a2f2f6c6963656e73655f6578616d706c652e636f6d80ffff82736e2affff827374820539ffff826d68a0868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823effff826c68a0358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a8280ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b905b9eb2b50c70016c7851f9f089bfc2ce28fb86106a10324408db18a401d5ae89b2f49ecbdec8c28bd23a7b9851337ff018080ff018080808080ff01808080',
      'solution': '0xffffa049285cc9f2b0990f874e1319fe26ad749f15eb89cb5fd16bd75a1bb5c2a05a0bffa093d60f351de47e725af74e1f610b9414025bd5bb22b2c1309eacdae760efb8abff0180ff01ffffff80ffff01ffff33ffa01569ab9d6a71057184423ed27ad44dd4b1a5a7d05fdc843534f5f714c777d636ff01ffffa01569ab9d6a71057184423ed27ad44dd4b1a5a7d05fdc843534f5f714c777d636808080ff80808080'
   }, {
   'coin': {
      'amount': 1,
      'parent_coin_info': '0xdaefa89b6346915a8925a3c825201d21ea2b5f655766fbc9b244d5cdf0b6d3e4',
      'puzzle_hash': '0xe28652b116337599961cb6d138091bbced075a0cee2b8307360ec98c62f7e2d8'
   },
   'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0d590645dc77e25f22ffe37846e73868a99179d33de11648efaa286bc341936eaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b091f4a1811c7ccdf84207e433bc470ef9aaed1f141960017918fc3427b5e3bbff3513c3023b43a2f8a66d37df12c0aaddff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0d590645dc77e25f22ffe37846e73868a99179d33de11648efaa286bc341936eaa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080',
   'solution': '0xffffa0729faa60d6708cf6dd20af3c87419b8fb527b16b0510f14c50d76356f213e088ffa078a56af36aa6b98edf7a05b7bbb94d1afbb7e9640dfdbeeefba3c67f8d24c97cff0180ff01ffff01ffff80ffff01ffff33ffa078a56af36aa6b98edf7a05b7bbb94d1afbb7e9640dfdbeeefba3c67f8d24c97cff01ffffa078a56af36aa6b98edf7a05b7bbb94d1afbb7e9640dfdbeeefba3c67f8d24c97c8080ffff3effa049285cc9f2b0990f874e1319fe26ad749f15eb89cb5fd16bd75a1bb5c2a05a0b8080ff80808080'
   }
]}
```

</details>

---
