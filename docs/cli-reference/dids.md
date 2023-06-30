---
sidebar_label: DIDs
title: DID CLI
slug: /did-cli
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This document is a comprehensive listing of CLI commands for interacting with Chia DIDs.

## Reference

### `create`

Functionality: Create a DID wallet

Usage: chia wallet did create [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -n            | --name            | TEXT    | False    | Set the DID wallet name [default: None]                                                                  |
| -a            | --amount          | INTEGER | False    | Set the DID amount in mojos. Value must be an odd number. [default: 1]                                   |
| -m            | --fee             | TEXT    | False    | Set the fees per transaction, in XCH. [default: 0]                                                       |
| -h            | --help            | None    | False    | Show a help message and exit.                                                                            |

<details>
<summary>Example</summary>

Create a new DID:

```bash
chia wallet did create -n My_DID
```

Response:

```
Successfully created a DID wallet with name My_DID and id 2 on key 4288332900
Successfully created a DID did:chia:17jvhl9z8zj6jma2uxk4mqj22p90hfpf29svlvlyalu8ksyefsvpql7f403 in the newly created DID wallet
```

View your wallet and DID:

```bash
chia wallet show
```

Response:

```
Wallet height: 1117451
Sync status: Synced
Balances, fingerprint: 4288332900

Chia Wallet:
   -Total Balance:         0.999989999992 txch (999989999992 mojo)
   -Pending Total Balance: 0.999989999991 txch (999989999991 mojo)
   -Spendable:             0.0 txch (0 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

My_DID:
   -Total Balance:         0.0
   -Pending Total Balance: 1.0
   -Spendable:             0.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:17jvhl9z8zj6jma2uxk4mqj22p90hfpf29svlvlyalu8ksyefsvpql7f403
   -Wallet ID:             2
```

</details>

---

### `find_lost`

Functionality: Find the did you should own and recover the DID wallet

Usage: chia wallet did find_lost [OPTIONS]

Options:

| Short Command | Long Command         | Type    | Required | Description                                                                                                                         |
| :------------ | :------------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port    | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml                            |
| -f            | --fingerprint        | INTEGER | False    | Set the fingerprint to specify which key to use                                                                                     |
| -id           | --coin_id            | TEXT    | True     | The DID ID, launcher ID, or latest coin ID of the DID you want to recover. The most time-efficient of these is the latest coin ID   |
| -m            | --metadata           | TEXT    | False    | The new whole metadata in json format                                                                                               |
| -r            | --recovery_list_hash | TEXT    | False    | Override the recovery list hash of the DID. Only set this if your last DID spend updated the recovery list                          |
| -n            | --num_verification   | INTEGER | False    | Override the required verification number of the DID. Only set this if your last DID spend updated the required verification number |
| -h            | --help               | None    | False    | Show a help message and exit.                                                                                                       |

<details>
<summary>Example</summary>

Locate a DID owned by the local wallet:

```bash
chia wallet did find_lost -id did:chia:1gam05w9xhdc406t03w79pst7hrhs36yw70ekg7hdsxvgds703kpskr64tz
```

Response:

```
Successfully found lost DID did:chia:1gam05w9xhdc406t03w79pst7hrhs36yw70ekg7hdsxvgds703kpskr64tz, latest coin ID: 618a2eee48b111517cbd4f8d11889dc78396c9bcbad11c135dcbedb12f60b58b
```

</details>

---

### `get_details`

Functionality: Get more details of any DID

Usage: chia wallet did get_details [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml                                                 |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which key to use                                                                                                          |
| -id           | --coin_id         | TEXT    | True     | The DID ID, launcher ID, or latest coin ID of the DID you want to recover. The most time-efficient of these is the latest coin ID                        |
| -l            | --latest          | None    | False    | If the `coin_id` is not the latest coin ID of this DID, set this flag to receive the latest DID information (not allowed if the `coin_id` is the DID ID) |
| -h            | --help            | None    | False    | Show a help message and exit.                                                                                                                            |

Note that `coin_id` could pertain to any DID, not just those owned by this wallet.

<details>
<summary>Example</summary>

Get the latest details of a DID from a coin ID:

```bash
chia wallet did get_details -id 618a2eee48b111517cbd4f8d11889dc78396c9bcbad11c135dcbedb12f60b58b -l
```

Response:

```
DID:                    did:chia:1gam05w9xhdc406t03w79pst7hrhs36yw70ekg7hdsxvgds703kpskr64tz
Coin ID:                618a2eee48b111517cbd4f8d11889dc78396c9bcbad11c135dcbedb12f60b58b
Inner P2 Address:       xch172j7w7gzv7c8xlpju8j2qexx8d7nqjet23z5pxtxr0w8yaerrtrq0tuwae
Public Key:             a03bd712b40b706102ffb9a70612bfbb7ce3aa30c81a988e3993e1cdfcc652f43d454904f483151b73abcc996fa7c02e
Launcher ID:            4776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83
DID Metadata:           {}
Recovery List Hash:     4bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459a
Recovery Required Verifications: 0
Last Spend Puzzle:      0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a03bd712b40b706102ffb9a70612bfbb7ce3aa30c81a988e3993e1cdfcc652f43d454904f483151b73abcc996fa7c02eff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080
Last Spend Solution:    [['0x6bda0005da7a59d65485cc415af74cb4bafc997f8d0446c25fdfc630cda8764b', '0x56e33fc1fe1a970cbdedb90559097186587fdd4d484b4fef2d96bd4f3afe8082', '0x01'], '0x01', ['0x01', ['0x', ['0x01', ['0x33', '0x56e33fc1fe1a970cbdedb90559097186587fdd4d484b4fef2d96bd4f3afe8082', '0x01', ['0xf2a5e7790267b0737c32e1e4a064c63b7d304b2b54454099661bdc7277231ac6']], ['0x33', '0x02a55ce8286e3360f6c7507c7c12102a25ae85e92ee02c058a6aadcadbe11f4a', '0x', ['0x02a55ce8286e3360f6c7507c7c12102a25ae85e92ee02c058a6aadcadbe11f4a']], ['0x33', '0xbabcbe5486a1820d2f91bb738649d13e56a649c554deb3f4756f180891ec1be1', '0x', ['0xbabcbe5486a1820d2f91bb738649d13e56a649c554deb3f4756f180891ec1be1']], ['0x3c', '0xe3ce3f595a6b498335ed5519b1d31903c38da16f55efa3dfbf122113886c1295'], ['0x3d', '0x72304dc38049428843bcee366be361ce94517aa9175c936173e586d520cf0d9e'], ['0x3d', '0x07942250c330ea81e8b98c587fd3c813c5833170c6e33f63fde02386e975fe1f'], ['0x3d', '0xf4bcb562ca143b7823811d29e44f1244136c62f3b15d7d7b7d58d3b60dda3fec'], ['0x3d', '0x6f714cf3869bdd04ade21f4883d11bc2e6bbad04cc730aef8316907eaf93624f'], ['0x3f', '0x7951b5ba3108ced9a70efd7d516c9f9b913a22224b4360bd9cf318ee2ea4f8d6'], ['0x3f', '0x01347a220c1f352a890e4a9e80b47f2262e7225588d3d47654f0fb06834977ce']], '0x']]]
Last Spend Hints:       ['f2a5e7790267b0737c32e1e4a064c63b7d304b2b54454099661bdc7277231ac6']
```

</details>

---

### `get_did`

Functionality: Get the DID and Coin ID for a DID wallet

Usage: chia wallet did get_did [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id              | INTEGER | True     | ID of the wallet to use                                                                                  |
| -h            | --help            | None    | False    | Show a help message and exit.                                                                            |

<details>
<summary>Example</summary>

Get info for DID with ID 2:

```bash
chia wallet did get_did -i 2
```

Response:

```
DID:                    did:chia:17jvhl9z8zj6jma2uxk4mqj22p90hfpf29svlvlyalu8ksyefsvpql7f403
Coin ID:                0xe6c28c30c7dd2801a4cbfdb0e61186315ae9695dde0a75a6901c1394c3300db8
```

</details>

---

### `message_spend`

Functionality: Generate a DID spend bundle for announcements (does not modify the blockchain)

Usage: chia wallet did message_spend [OPTIONS]

Options:

| Short Command | Long Command           | Type    | Required | Description                                                                                              |
| :------------ | :--------------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port      | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint          | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id                   | INTEGER | True     | ID of the wallet to use                                                                                  |
| -pa           | --puzzle_announcements | TEXT    | False    | The list of puzzle announcement hex strings, split by commas (`,`)                                       |
| -ca           | --coin_announcements   | TEXT    | False    | The list of coin announcement hex strings, split by commas (`,`)                                         |
| -h            | --help                 | None    | False    | Show a help message and exit.                                                                            |

<details>
<summary>Example</summary>

Create a default message spend bundle from a DID wallet:

```bash
chia wallet did message_spend -i 4
```

Response:

```
Message Spend Bundle:
{
   'aggregated_signature': '0xad0d726ae7935978129b1c9c558b75c2b629aef893c89c3ec989c347a9eb71ddbaa83dadfe923599e7f14276eaeb84d9063d02b9b91fa561d09689716f177c0304aebb701f9c0f04eba9120b561f482e538a72ece30c086ffd942624b0962c83',
   'coin_solutions': [
      {
         'coin': {
            'amount': 1,
            'parent_coin_info': '0x0b51251268ff8c71c0d2a74495b8dce93d2a86591501e71e71d8349112ca8051',
            'puzzle_hash': '0x50f90b0ff7cdd672953ccfe8b90c2543673bc8aa56981dd7ccee1c41746f6e72'
         },
         'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a03bd712b40b706102ffb9a70612bfbb7ce3aa30c81a988e3993e1cdfcc652f43d454904f483151b73abcc996fa7c02eff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080', 'solution': '0xffffa04c534c738148865f4cdb2aaef734810df68dac6cab738544630991ae46a980dfffa056e33fc1fe1a970cbdedb90559097186587fdd4d484b4fef2d96bd4f3afe8082ff0180ff01ffff01ffff80ffff01ffff33ffa056e33fc1fe1a970cbdedb90559097186587fdd4d484b4fef2d96bd4f3afe8082ff01ffffa0f2a5e7790267b0737c32e1e4a064c63b7d304b2b54454099661bdc7277231ac6808080ff80808080'
      }
   ]
}
```

</details>

---

### `set_name`

Functionality: Set the name for a DID wallet

Usage: chia wallet did get_did [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id              | INTEGER | True     | ID of the wallet to use                                                                                  |
| -n            | --name            | TEXT    | True     | Set the DID wallet name                                                                                  |
| -h            | --help            | None    | False    | Show a help message and exit.                                                                            |

<details>
<summary>Example</summary>

Set the name for Wallet ID 2 to `New Name`:

```bash
chia wallet did set_name -i 2 -n "New Name"
```

Response:

```
Successfully set a new name for DID wallet with id 2: New Name
```

Confirm changes:

```
chia wallet show
```

Response:

```
Wallet height: 1117563
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

Connections:
Type      IP                                     Ports       NodeID      Last Connect      MiB Up|Dwn
FULL_NODE 127.0.0.1                              58444/58444 f40100b8... Jun 15 12:22:02      0.0|1.7
                                                 -Height: No Info    -Hash: No Info    -Trusted: True
```

</details>

---

### `sign_message`

Functionality: Sign a message using a specified DID ID. This command does not modify the blockchain.

Usage: chia wallet did sign_message [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --did_id          | TEXT    | True     | DID ID you want to use for signing                                                                       |
| -m            | --hex_message     | TEXT    | True     | The message you want to sign                                                                             |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
   <summary>Example</summary>

```bash
chia wallet did sign_message -f 590161281 -i did:chia:1cxw5dqug4gavvgylx88zfkmqv235ryr6j9tvyjwwuga0pa52wjvqavdyar --hex_message "This is a test message."
```

Response:

```
Message: This is a test message.
Public Key: b478c6a0ef7410679831d616d06e9fca856f6e08b8a6f13f344cc9aa20981ab7fe287663584e2fc53e2ac14edab883ca
Signature: 981ed9b983440c06ae5d9f2f2a0f45c0a00015939d30f512364f44597dc381007ee6911d9320d3c991d5a795823e429f06f35117b1e51c4c30454af19c69f2399e30bff5ea109bc5b95f869f48f2e32d0beccfcbbe72b384903536d3aeed848d
```

</details>

---

### `transfer`

Functionality: Transfer a DID

Usage: chia wallet did transfer [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id              | INTEGER | True     | ID of the DID wallet to transfer                                                                         |
| -ta           | --target-address  | TEXT    | True     | Target recipient wallet address                                                                          |
| -r            | --reset_recovery  | None    | False    | Set this flag if you want to reset the recovery DID settings (they will not be transferred with the DID) |
| -m            | --fee             | TEXT    | False    | An optional transaction fee, in XCH                                                                      |
|               | --reuse           | None    | False    | Reuse existing address for the change                                                                    |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
   <summary>Example</summary>

```bash
chia wallet did transfer -i 4 -ta xch1gdhch02gp6352plffxqy7ppaar2dvtnek6p2cc79nc5apqzae37sktag6l
```

Response:

```
Successfully transferred DID to xch1gdhch02gp6352plffxqy7ppaar2dvtnek6p2cc79nc5apqzae37sktag6l
Transaction ID: 0xf6d1a4158a5f278a8cbf2babca8d6894b7bac4c8601b8b564d343168430d740d
Transaction: {
   'additions': [{
      'amount': 1,
      'parent_coin_info': '0x618a2eee48b111517cbd4f8d11889dc78396c9bcbad11c135dcbedb12f60b58b',
      'puzzle_hash': '0xc4a4c20475a5f7b3c72185c3dc792d3f56cb5325bf6c57a89947576a707c60c9'
   }],
   'amount': 1,
   'confirmed': False,
   'confirmed_at_height': 0,
   'created_at_time': 1682568012,
   'fee_amount': 0,
   'memos': {
      'f61f38ceeda5e1d0a042f669cda40e62d38bc01a134efc6a057c29719702748e': '436f8bbd480ea34507e949804f043de8d4d62e79b682ac63c59e29d0805dcc7d'
   },
   'name': '0xf6d1a4158a5f278a8cbf2babca8d6894b7bac4c8601b8b564d343168430d740d',
   'removals': [{
      'amount': 1,
      'parent_coin_info': '0x0b51251268ff8c71c0d2a74495b8dce93d2a86591501e71e71d8349112ca8051',
      'puzzle_hash': '0x50f90b0ff7cdd672953ccfe8b90c2543673bc8aa56981dd7ccee1c41746f6e72'
   }],
   'sent': 0,
   'sent_to': [],
   'spend_bundle': {
      'aggregated_signature': '0x8afa4a5d523bebc954c6c0869c10030b3d3c3bb31853335e9a68ab05686708e9e87ab0a45893f278bf079727f28baada16fcb2141c6b76386b78e71b1c02e0f199a852f111005fbd7fe0466a82753f59a3209f862f067ca3f7241c88c5202091',
      'coin_spends': [{
         'coin': {
            'amount': 1,
            'parent_coin_info': '0x0b51251268ff8c71c0d2a74495b8dce93d2a86591501e71e71d8349112ca8051',
            'puzzle_hash': '0x50f90b0ff7cdd672953ccfe8b90c2543673bc8aa56981dd7ccee1c41746f6e72'
         },
         'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a03bd712b40b706102ffb9a70612bfbb7ce3aa30c81a988e3993e1cdfcc652f43d454904f483151b73abcc996fa7c02eff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa04776fa38a6bb7157e96f8bbc50c17eb8ef08e88ef3f3647aed819886c3cf8d83a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080',
         'solution': '0xffffa04c534c738148865f4cdb2aaef734810df68dac6cab738544630991ae46a980dfffa056e33fc1fe1a970cbdedb90559097186587fdd4d484b4fef2d96bd4f3afe8082ff0180ff01ffff02ffff80ffff01ffff33ffa0856a10b0d4fc93c371fb4cf1e9c77aa0e9beb0e77e2cfafe9d6099c6c43641ebff01ffffa0436f8bbd480ea34507e949804f043de8d4d62e79b682ac63c59e29d0805dcc7d8080ffff3cffa0618a2eee48b111517cbd4f8d11889dc78396c9bcbad11c135dcbedb12f60b58b8080ff8080ff80ff80ff80ff808080'
      }]
   },
   'to_address': 'xch17n77yhjjz6ur2lculgjslqqxvcqaf2a8ldmr4f0xte2auu6nl3zsg4feza',
   'to_puzzle_hash': '0xf4fde25e5216b8357f1cfa250f80066601d4aba7fb763aa5e65e55de7353fc45',
   'trade_id': None,
   'type': 1,
   'wallet_id': 4
}
```

</details>

---

### `update_metadata`

Functionality: Update the metadata of a DID

Usage: chia wallet did update_metadata [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which wallet to use                                                       |
| -i            | --id              | INTEGER | True     | ID of the DID wallet to use                                                                              |
| -m            | --metadata        | TEXT    | True     | The new whole metadata in json format                                                                    |
|               | --reuse           | None    | False    | Set this flag to reuse existing address for the change                                                   |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

---
