---
slug: /guides/nft-cli
title: Minting NFTs With CLI
---

The next section of this tutorial will demonstrate how to create and use DIDs and NFTs on the CLI. If you wish to use RPCs instead, you can skip ahead to the [RPC version](/guides/nft-rpc).

:::note
It is very important that you replace any DID, id, name, or other value in the following commands with your own.

This is just an example, we do not know the specific values your commands will need in order to work.

Also, make sure to use a wallet fingerprint that has enough XCH to pay for transaction fees.
:::

:::info

It is important that you format your NFTs' metadata properly, as this cannot be changed after minting.

See [CHIP-7](https://github.com/Chia-Network/chips/blob/main/assets/chip-0007/schema.json) for the first (and so far only) standardized JSON metadata schema for Chia NFTs. Usage of this CHIP is recommended in order to give marketplaces the best opportunity to parse your NFTs' metadata properly.

Note that additional NFT metadata CHIPs are likely to be released in the future. However, there are no plans to deprecate CHIP-7 when this happens.

:::

## Create a DID Wallet

An NFT wallet has the option of being associated with a DID. In this section, we'll create a new DID. Later we'll create two NFT wallets -- one that is associated with a DID and one that is not.

To create a new DID using Chia's CLI:

Run these commands to create a DID wallet with a custom name and 1 mojo:

```bash
chia wallet did create -n "Test DID" -a 1 -m 0.00001
```

That should produce an output similar to this:

```
Successfully created a DID wallet with name Test DID and id 2 on key 2527948602
Successfully created a DID did:chia:13p5fdxgm8e2pngdwp8m088t0etp7rgzx9ye2ju8v5ackcyg7t9nqx2um83 in the newly created DID wallet
```

It will take a few minutes for your new wallet to be confirmed on the blockchain. Once the new wallet shows up, take note of the `Wallet ID`, which is `2` in this example.

Run the following command to see if it's there yet:

```bash
chia wallet show
```

That should produce an output similar to this:

```
Wallet height: 1141612
Sync status: Synced
Balances, fingerprint: 2527948602

Chia Wallet:
   -Total Balance:         1.00005999999 txch (1000059999990 mojo)
   -Pending Total Balance: 1.00005999999 txch (1000059999990 mojo)
   -Spendable:             1.00005999999 txch (1000059999990 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Test DID:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:13p5fdxgm8e2pngdwp8m088t0etp7rgzx9ye2ju8v5ackcyg7t9nqx2um83
   -Wallet ID:             2
```

## Create an NFT Wallet

:::info
Each NFT wallet can be anchored to either a DID or a key pair. A key pair can only contain a single NFT wallet, which will act as the "inbox" for all NFTs associated with that key pair. Each DID can also contain a single NFT wallet, which allows for the creation of multiple NFT wallets inside the same wallet key pair.
:::

First, we'll create an NFT wallet that is not associated with a DID:

```bash
chia wallet nft create
```

That should produce an output similar to this:

```
Successfully created an NFT wallet with id 3 on key 2527948602
```

Next, we'll create a second NFT wallet that is associated with the DID you already created:

```bash
chia wallet nft create -di did:chia:13p5fdxgm8e2pngdwp8m088t0etp7rgzx9ye2ju8v5ackcyg7t9nqx2um83 -n "DID-Linked NFT Wallet"
```

That should produce an output similar to this:

```
Successfully created an NFT wallet with id 4 on key 2527948602
```

It will take a few minutes for your new wallets to be confirmed on the blockchain. Once the new wallets show up, take note of the `Wallet ID`s, which are `3` and `4` in this example.

Run the following command to see if these wallets are there yet:

```bash
chia wallet show
```

That should produce an output similar to this:

```js
Wallet height: 1141703
Sync status: Synced
Balances, fingerprint: 2527948602

Chia Wallet:
   -Total Balance:         1.00005999999 txch (1000059999990 mojo)
   -Pending Total Balance: 1.00005999999 txch (1000059999990 mojo)
   -Spendable:             1.00005999999 txch (1000059999990 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Test DID:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:13p5fdxgm8e2pngdwp8m088t0etp7rgzx9ye2ju8v5ackcyg7t9nqx2um83
   -Wallet ID:             2

NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -Wallet ID:             3

DID-Linked NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -DID ID:                did:chia:13p5fdxgm8e2pngdwp8m088t0etp7rgzx9ye2ju8v5ackcyg7t9nqx2um83
   -Wallet ID:             4
```

## Mint an NFT (No DID)

:::warning important

The values used in these commands are specific to this guide. Change any values that are different when you are following this guide such as the wallet id.

:::

For this example, we'll mint an NFT using only the required options:

```bash
chia wallet nft mint -i 3 -u https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg -nh feef1ea09c0f93fcf5a8d7e0018f2511638d317d78e3d3a71462cdb061baad68 -m 0.000265
```

That should produce an output similar to this:

```js
NFT minted Successfully with spend bundle:
{
  'aggregated_signature': '0xa2a5761bb71cf5c022e2b219a619f679242d3083d78fa19e02b3c908941f4b460f262677bf6eedccc1f4fdcbb757a0ae11f0605b59e934f549f2f3c27746486382fa4f190f8133b935fd11f33703a3ab09462e5898934200cbb0b68e3633f99f',
  'coin_solutions': [{
    'coin': {
      'amount': 69999996,
      'parent_coin_info': '0xa0dd50f57cf3e1834a45898fc0565664e31f300c358ce821cf6e0d856b69c3be',
      'puzzle_hash': '0x60bd7cedf9e920e8d3df76ae21cd6528726ce608c6147ee21843d74fc5d59e69'
    },
    'puzzle_reveal': ...,
    'solution': ...
  }, {
    'coin': {
      'amount': 1,
      'parent_coin_info': '0x7df44ef7a08a497b6bc31fc090fa3e57f6630142f8f123951e2d3b18685e9bd0',
      'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
    },
    'puzzle_reveal': ...,
    'solution': ...
  }, {
    'coin': {
      'amount': 1,
      'parent_coin_info': '0xb1ee9a2b717aefcce83c74e5a4a5e3b86f583f1916c34f3eeff8d2f3b9888b40',
      'puzzle_hash': '0x9ea9c1668efabe5ba66570707539b17dcffff06b0ccc35fe1a377170737f8c79'
    },
    'puzzle_reveal': ...,
    'solution': ...
  }
]}
```

Here is a description of the options used:

| Option | Description                                                   |
| ------ | ------------------------------------------------------------- |
| `-i`   | The id of your NFT wallet.                                    |
| `-u`   | A comma-separated list of URIs where this image may be found. |
| `-nh`  | The NFT's data hash. Must match to be viewable in the wallet. |

## Mint an NFT (With DID)

:::warning important

The values used in these commands are specific to this guide. Change any values that are different when you are following this guide such as the wallet id.

:::

Next we'll mint an NFT that is associated with a DID. For this example, we'll use most of the available options:

```bash
chia wallet nft mint -f 2086972020 -i 4 -ra txch10e2hg2xkd7n2rfyh0frg6ls3q9v27ty0rfawxuvergrfyl0502vsx5se2t -ta txch1rhrkwf9a53v89r5ghn2du4e5vadt68crdfjuxcuq8zpykejw7vzq2t85nx -u https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg -nh 14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0 -mu "https://pastebin.com/raw/PnaQGQiH, https://pastebin.com/raw/KTwUQ8hM" -mh e9e9366f050e90ceb04a4778f2adfa02dfb565327d225eb35101f0de553ac20b -lu https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE -lh 30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6 -en 1 -et 5 -rp 300 -m 0.000615
```

That should produce an output similar to this:

```js
NFT minted Successfully with spend bundle:
{
  'aggregated_signature': '0x88123f66d0f6265e5bb96e668bfcc68c360566c98985b54aa4cff81627899941c4e14d7da96fda92af4b61ce110f6c221775dadb07c18a816d5e5d8d05987a854d8d5c42d2ab5802abd0f01d8da6b9fe28870a4c424cb7b46f55e8894d484ed1',
  'coin_solutions': [{
    'coin': {
      'amount': 69999995,
      'parent_coin_info': '0x7df44ef7a08a497b6bc31fc090fa3e57f6630142f8f123951e2d3b18685e9bd0',
      'puzzle_hash': '0x827d2f77303929db5f3c26fd21b65901a342e36b9d912ac4440d6185f80d17a8'
    },
    'puzzle_reveal': ...,
    'solution': ...
  }, {
    'coin': {
      'amount': 1,
      'parent_coin_info': '0xb4ddbcd646ed8e1ed9472898436ddab442f4640dc88199efa8db6ba22bb5dc31',
      'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
    }, 'puzzle_reveal': ...,
    'solution': ...
  }, {
    'coin': {
      'amount': 1,
      'parent_coin_info': '0xa3133d216499f2ff85bbd1928352a04b5612c8325eeaa0daa6cd964b9ba0e8a0',
      'puzzle_hash': '0xa6d7c1fe01ed965d3f4fc08a89d9187831fceba98abf191dd6f388ba753ec9b3'
    },
    'puzzle_reveal': ...,
    'solution': ...
  }, {
    'coin': {
      'amount': 1,
      'parent_coin_info': '0xcf052aa79755eba9b68d0ef4cbab1b05993ba84e7044d2fdfd71aa5d0877cbc3',
      'puzzle_hash': '0xcb3cdbfcefdef0bd98bc8bc52cf46f49fd40a577713e86173e5cdf9585e299c9'
    },
    'puzzle_reveal': ...,
    'solution': ...
  }
]}
```

Here is a description of the options used:

| Option               | Description                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------- |
| `-i`                 | The id of your NFT wallet.                                                                           |
| `-u`                 | A comma-separated list of URIs where this image may be found.                                        |
| `-nh`                | The NFT's data hash. Must match to be viewable in the wallet.                                        |
| `-f`                 | The fingerprint of the wallet.                                                                       |
| `-ra`                | The wallet or smart coin address that will receive royalties.                                        |
| `-ta`                | The wallet or smart coin address where the NFT will be sent.                                         |
| `-mu`                | A comma-separated list of URIs where the image's metadata may be found.                              |
| `-mh`                | The hash of the NFT's metadata.                                                                      |
| `-lu`                | A comma-separated list of URIs where the image's license may be found.                               |
| `-lh`                | The hash of the NFT's license.                                                                       |
| -en                  | The edition number. Specify if this NFT has multiple editions (multiple identical copies of an NFT). |
| -et                  | The edition total number. Specify if this NFT has multiple editions.                                 |
| `-rp`                | The royalty percentage expressed as tens of thousandths of a percent.                                |
| `--no-did-ownership` | Disables DID ownership.                                                                              |
| `-m`                 | The fee for this transaction in XCH.                                                                 |

If successful, you will receive a JSON output, including the coin additions and removals involved in minting the NFT, as well as the spend bundle that was used.

Wait a few minutes for your NFT to be confirmed on the blockchain. Eventually, the NFT will show up.

Run the following command to check:

```bash
chia rpc wallet nft_get_nfts '{"wallet_id": 2}'
```

That should produce an output similar to this:

```json
{
  "nft_list": [
    {
      "data_hash": "14836B86A48E1B2B5E857213AF97534704475B4C155D34B2CB83ED4B7CBA2BB0",
      "data_uris": [
        "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg"
      ],
      "did_owner": "",
      "edition_total": 1,
      "edition_number": 1,
      "launcher_id": "C2F3F7D54D254381FD33FBE2B6C031E5BE3BA1267215A2FA182E064ED6015FEF",
      "license_hash": "",
      "license_uris": [],
      "metadata_hash": "",
      "metadata_uris": [],
      "nft_coin_id": "4296D4E49E2056DB5AEB62DF849851E61326DAEA4337825BE15410E7F4C07E32",
      "royalty": 0,
      "version": "NFT0"
    }
  ],
  "success": true,
  "wallet_id": 2
}
```

## List Your NFTs

We'll list the NFTs from both wallets that were created with the CLI.

Run the following command to show the list of wallets:

```bash
chia wallet show
```

That should produce an output similar to this:

```js
Wallet height: 1145640
Sync status: Synced
Balances, fingerprint: 2527948602

Chia Wallet:
   -Total Balance:         1.000049999988 txch (1000049999988 mojo)
   -Pending Total Balance: 1.000049999988 txch (1000049999988 mojo)
   -Spendable:             1.000049999988 txch (1000049999988 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Test DID:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DISTRIBUTED_ID
   -DID ID:                did:chia:13p5fdxgm8e2pngdwp8m088t0etp7rgzx9ye2ju8v5ackcyg7t9nqx2um83
   -Wallet ID:             2

NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -Wallet ID:             3

DID-Linked NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -DID ID:                did:chia:13p5fdxgm8e2pngdwp8m088t0etp7rgzx9ye2ju8v5ackcyg7t9nqx2um83
   -Wallet ID:             4
```

Next, show the NFT the non-DID-linked wallet (Wallet ID 3). This NFT used a minimum set of options when created.

Run the following command:

```bash
chia wallet nft list -i 3
```

That should produce an output similar to this:

```
NFT identifier: nft1k8hf52m30thue6puwnj6ff0rhph4s0cezmp570h0lrf08wvg3dqq5zsvzp
Launcher coin ID: b1ee9a2b717aefcce83c74e5a4a5e3b86f583f1916c34f3eeff8d2f3b9888b40
Launcher puzhash: eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9
Current NFT coin ID: 11c25eb4f17fccac63a5cf07421258c014592c55766826f28fe8f649ba78fc08
On-chain data/info: ((117 "https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg") (104 . 0xfeef1ea09c0f93fcf5a8d7e0018f2511638d317d78e3d3a71462cdb061baad68) (28021) (27765) (29550 . 1) (29556 . 1))
Owner DID: None
Royalty percentage: None
Royalty puzhash: None
NFT content hash: feef1ea09c0f93fcf5a8d7e0018f2511638d317d78e3d3a71462cdb061baad68
Metadata hash:
License hash:
NFT series total: 1
Current NFT number in the series: 1
Metadata updater puzhash: fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b
NFT minting block height: 1145300
Inner puzzle supports DID: False
NFT is pending for a transaction: False

URIs:
https://images.pexels.com/photos/1529881/pexels-photo-1529881.jpeg

Metadata URIs:

License URIs:
```

Now we'll show the NFT that used every available option. This NFT was created with a DID.

Run the following command:

```bash
chia wallet nft list -i 4
```

That should produce an output similar to this:

```
NFT identifier:            nft1euzj4fuh2h46nd5dpm6vh2cmqkvnh2zwwpzd9l0awx496zrhe0psfmklxm
Launcher coin ID:          cf052aa79755eba9b68d0ef4cbab1b05993ba84e7044d2fdfd71aa5d0877cbc3
Launcher puzhash:          eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9
Current NFT coin ID:       5cdfe3eb4429ad5cb12ab549b6d2f0f7d919fa9f4389d187ad7414f747a86bd4
On-chain data/info:        ((117 "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg") (104 . 0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0) (28021 "https://metadata_example.com") (27765 "https://license_example.com") (29550 . 1) (29556 . 5) (28008 . 0x868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e) (27752 . 0x358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82))
Owner DID:                 did:chia:13p5fdxgm8e2pngdwp8m088t0etp7rgzx9ye2ju8v5ackcyg7t9nqx2um83
Royalty percentage:        300
Royalty puzhash:           827d2f77303929db5f3c26fd21b65901a342e36b9d912ac4440d6185f80d17a8
NFT content hash:          14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0
Metadata hash:             868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e
License hash:              358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82
NFT series total:          5
Current NFT number in the series: 1
Metadata updater puzhash:  fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b
NFT minting block height:  1145481
Inner puzzle supports DID: True
NFT is pending for a transaction: False

URIs:
   https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg

Metadata URIs:
   https://metadata_example.com

License URIs:
   https://license_example.com
```

Note that you can obtain the same info with the `get_info` command. You'll need to pass in the identifier of the NFT you want to list:

```bash
chia wallet nft get_info -ni nft1euzj4fuh2h46nd5dpm6vh2cmqkvnh2zwwpzd9l0awx496zrhe0psfmklxm
```

That should produce an output similar to this:

```
NFT identifier: nft1euzj4fuh2h46nd5dpm6vh2cmqkvnh2zwwpzd9l0awx496zrhe0psfmklxm
Launcher coin ID: cf052aa79755eba9b68d0ef4cbab1b05993ba84e7044d2fdfd71aa5d0877cbc3
Launcher puzhash: eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9
Current NFT coin ID: 5cdfe3eb4429ad5cb12ab549b6d2f0f7d919fa9f4389d187ad7414f747a86bd4
On-chain data/info: ((117 "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg") (104 . 0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0) (28021 "https://metadata_example.com") (27765 "https://license_example.com") (29550 . 1) (29556 . 5) (28008 . 0x868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e) (27752 . 0x358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82))
Owner DID: did:chia:13p5fdxgm8e2pngdwp8m088t0etp7rgzx9ye2ju8v5ackcyg7t9nqx2um83
Royalty percentage: 300
Royalty puzhash: 827d2f77303929db5f3c26fd21b65901a342e36b9d912ac4440d6185f80d17a8
NFT content hash: 14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0
Metadata hash: 868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e
License hash: 358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82
NFT series total: 5
Current NFT number in the series: 1
Metadata updater puzhash: fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b
NFT minting block height: 1145481
Inner puzzle supports DID: True
NFT is pending for a transaction: False

URIs:
https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg

Metadata URIs:
https://metadata_example.com

License URIs:
https://license_example.com

```

## Add a URI to Your NFTs

:::warning important

The values used in these commands are specific to this guide. Change any values that are different when you are following this guide such as the wallet id.

:::

Each NFT has three URI lists:

- Data URIs (also simply called "URIs")
- Metadata URIs
- License URIs

It is _not_ possible to delete these lists or to remove any of their items. However, it is possible to _prepend_ new items to any of these lists. One reason to do this is if a link is broken. But keep in mind that if an invalid item is added, wallets and block explorers may read the invalid new item and not examine subsequent, valid items.

It is only possible to add one URI per spend. Exactly one of `-u` `-mu`, and `-lu` is required. For this example, we'll add one of each of these items, which requires three separate spends.

For simplicity, we'll just duplicate the URIs that already existed. The current NFT coin id (`-ni`) will change with each spend.

We'll add them to the DID-linked NFT:

```bash
chia wallet nft add_uri -i 4 -ni 5cdfe3eb4429ad5cb12ab549b6d2f0f7d919fa9f4389d187ad7414f747a86bd4 -u https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg -m 0.00001
```

```bash
chia wallet nft add_uri -i 4 -ni 4e1e452bf3612ddd654fe1e3684a635c1d2495cbfde338ef875c8f292e21adb8 -mu https://metadata_example.com -m 0.00001
```

```bash
chia wallet nft add_uri -i 4 -ni 33ae5afc65ec4404aba16bd9a0b17cfa23ddca9ac9bb49a03548167e286762ba -lu https://license_example.com -m 0.00001
```

Now that the URIs have been added successfully, rerun the same `get_info` command to see the updates.

Each URI list now has two copies of the URI:

```bash
chia wallet nft get_info -ni nft1euzj4fuh2h46nd5dpm6vh2cmqkvnh2zwwpzd9l0awx496zrhe0psfmklxm
```

That should produce an output similar to this:

```
NFT identifier:            nft1euzj4fuh2h46nd5dpm6vh2cmqkvnh2zwwpzd9l0awx496zrhe0psfmklxm
Launcher coin ID:          cf052aa79755eba9b68d0ef4cbab1b05993ba84e7044d2fdfd71aa5d0877cbc3
Launcher puzhash:          eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9
Current NFT coin ID:       d7eed252af2055353a0ecbf734094345b3ffd793631a36b79ac80638a579b873
On-chain data/info:        ((117 "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg" "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg") (104 . 0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0) (28021 "https://license_example.com" "https://metadata_example.com" "https://metadata_example.com") (27765 "https://license_example.com") (29550 . 1) (29556 . 5) (28008 . 0x868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e) (27752 . 0x358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82))
Owner DID:                 did:chia:13p5fdxgm8e2pngdwp8m088t0etp7rgzx9ye2ju8v5ackcyg7t9nqx2um83
Royalty percentage:        300
Royalty puzhash:           827d2f77303929db5f3c26fd21b65901a342e36b9d912ac4440d6185f80d17a8
NFT content hash:          14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0
Metadata hash:             868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e
License hash:              358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82
NFT series total:          5
Current NFT number in the series: 1
Metadata updater puzhash:  fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b
NFT minting block height:  1145481
Inner puzzle supports DID: True
NFT is pending for a transaction: False

URIs:
   https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg
   https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg

Metadata URIs:
   https://metadata_example.com
   https://metadata_example.com

License URIs:
   https://license_example.com
   https://license_example.com
```

## Set the DID for an NFT

:::warning important

The values used in these commands are specific to this guide. Change any values that are different when you are following this guide such as the wallet id.

:::

Next we'll set the DID for an existing NFT. But first we'll need to create the new DID.

Run the following command:

```bash
chia wallet did create -n New_DID
```

That should produce an output similar to this:

```
Successfully created a DID wallet with name New_DID and id 5 on key 2527948602
Successfully created a DID did:chia:1yxezm4nl4lhr4f7yr7yw0w4t9v6p32n2zt0skk0gumn4krfy8uxq8hhg9w in the newly created DID wallet
```

Next, update the DID from previous example:

```bash
chia wallet nft set_did -i 4 -di did:chia:1yxezm4nl4lhr4f7yr7yw0w4t9v6p32n2zt0skk0gumn4krfy8uxq8hhg9w -ni d7eed252af2055353a0ecbf734094345b3ffd793631a36b79ac80638a579b873
```

That should produce an output similar to this:

```hs
Transaction to set DID on NFT has been initiated with:
{
  'aggregated_signature': '0xb0721860a9aba71a6e5bd2b55ea71c9019bf6e2e5018a34fef85df9b57b31abd8ea17b9604181050af8567ad54786a910bd83081075e7cef40b2f9826086730aa65a7dac8b27e76ec90ddfd865a9e3ec15847567d0f15b7a87c0c0a7e92464ea',
  'coin_solutions': [{
    'coin': {
      'amount': 1,
      'parent_coin_info': '0x33ae5afc65ec4404aba16bd9a0b17cfa23ddca9ac9bb49a03548167e286762ba',
      'puzzle_hash': '0x8dd052a6c2af1d209d1217a33a8ed89fc41b95e2d1682fe914a36a7ef41dc94c'
    },
    'puzzle_reveal': ...,
    'solution': ...
  }, {
    'coin': {
      'amount': 1,
      'parent_coin_info': '0xc8315a120525dd5cd658b9635cd0a5ab4bc2e878deaa57f6d295eb2dd7ed8ece',
      'puzzle_hash': '0x20fa98c4a333ac84429cfe29b05d75782eb96e4dcd28e9ffb276309a2a8481d8'
    },
    'puzzle_reveal': ...,
    'solution': ...
  }
]}
```

This command will create a new NFT wallet (`6` in this case), which is associated with the new DID. It will also set the NFT's DID to the newly created DID.

To verify this, run the `list` command to show that the new DID has been applied:

```bash
chia wallet nft list -i 6
```

That should produce an output similar to this:

```
Wallet keys:

1.  455254876
2.  - 2527948602 (Synced)
      Choose a wallet key [1-2] ('q' to quit, or Enter to use 2527948602):

NFT identifier: nft1euzj4fuh2h46nd5dpm6vh2cmqkvnh2zwwpzd9l0awx496zrhe0psfmklxm
Launcher coin ID: cf052aa79755eba9b68d0ef4cbab1b05993ba84e7044d2fdfd71aa5d0877cbc3
Launcher puzhash: eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9
Current NFT coin ID: 3d77d58164db748ff874551af7ee7e5930b53ae63453efd451213e8bac1acb35
On-chain data/info: ((117 "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg" "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg") (104 . 0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0) (28021 "https://license_example.com" "https://metadata_example.com" "https://metadata_example.com") (27765 "https://license_example.com" "https://license_example.com") (29550 . 1) (29556 . 5) (28008 . 0x868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e) (27752 . 0x358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82))
Owner DID: did:chia:1yxezm4nl4lhr4f7yr7yw0w4t9v6p32n2zt0skk0gumn4krfy8uxq8hhg9w
Royalty percentage: 300
Royalty puzhash: 827d2f77303929db5f3c26fd21b65901a342e36b9d912ac4440d6185f80d17a8
NFT content hash: 14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0
Metadata hash: 868463c2ae6f8a9585156c9ad9f4b9b01eeacc56fec82aa629c97135ff21823e
License hash: 358d4eb4aedefbec22824036299eff24216d213a95c8f986f862f0a89a250a82
NFT series total: 5
Current NFT number in the series: 1
Metadata updater puzhash: fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b
NFT minting block height: 1145481
Inner puzzle supports DID: True
NFT is pending for a transaction: False

URIs:
https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg
https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg

Metadata URIs:
https://metadata_example.com
https://metadata_example.com

License URIs:
https://license_example.com
https://license_example.com

```

## Transfer Your NFTs

:::warning important

The values used in these commands are specific to this guide. Change any values that are different when you are following this guide such as the wallet id.

:::

The final step for the CLI portion of this tutorial is to transfer your NFTs to another address. This can be any XCH or TXCH address. If the recipient does not have an NFT wallet, then one will be created automatically.

For this tutorial, we'll send the NFTs to a commonly-used burn address.

- The original puzzle hash of the burn address is `0x000000000000000000000000000000000000000000000000000000000000dead`
- For testnet, the corresponding address is `txch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm6ksh7qddh`
- For mainnet, the corresponding address is `xch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm6ks6e8mvy`

The reason these work as a burn address is that there is no known puzzle that matches this puzzle hash. Even if there were, it would have to be spendable. That is an **extremely** unlikely set of conditions to ever occur.

The transfer command is the same for NFTs whether or not they are associated with a DID:

```bash
chia wallet nft transfer -i 3 -ni 11c25eb4f17fccac63a5cf07421258c014592c55766826f28fe8f649ba78fc08 -ta txch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm6ksh7qddh
```

That should produce an output similar to this:

```
NFT transferred successfully with spend bundle:
{
  'aggregated_signature': '0x9714115a2f074a3787afc90851155e0bb5c8438b4f8b7e48811c6c4afa3fd718dd273d2fe70ef01aa43dd7059b35582d11de7ae071dffb59c8732f21846cdab6ed8fbd777b93bf713b5c294475e2bd7278d4ebcbf42a79e5af3f15a9e7302697',
  'coin_solutions': [{
    'coin': {
      'amount': 1,
      'parent_coin_info': '0x40a87296fc0840eec777b56539e3545c9d4d6e74a02c6000f8f905eb2e53d799',
      'puzzle_hash': '0x642e08cc42ebfe314e2d492f2f8d52f6ba5d57ced3ff60bf8c3c3d0f525a5b94'
    },
    'puzzle_reveal': ...,
    'solution': ...
  }]
}
```

And finally:

```bash
chia wallet nft transfer -i 6 -ni 3d77d58164db748ff874551af7ee7e5930b53ae63453efd451213e8bac1acb35 -ta txch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm6ksh7qddh
```

Which should also produce an output similar to this:

```
NFT transferred successfully with spend bundle:
{
  'aggregated_signature': '0x83439590ef82effdfcb3eeafdb9ec0c0266b36d14dd21ad09a24d534d27cfb8f273c15e850cb332688b65b584197c39213cd05abe4616fb1df7525fff228d45d919d34a7a6ed70758003e086c3cf92800ec70ab60f9fd86b1537e9383790db54',
  'coin_solutions': [{
    'coin': {
      'amount': 1,
      'parent_coin_info': '0xd7eed252af2055353a0ecbf734094345b3ffd793631a36b79ac80638a579b873',
      'puzzle_hash': '0x98c029490670291a1fbdbfc09bc4942a36a633f0b14e00e7670ee6413b5ddc4e'
    },
    'puzzle_reveal': ...,
    'solution': ...
  }]
}
```

## Mainnet Usage

After you are comfortable with creating and using DIDs and NFTs on the testnet, you may wish to move to mainnet. Please keep in mind that there are extra risks inherent to publishing code on a public blockchain. For example, an NFT's data, metadata and license hashes are not allowed to change after minting. Proceed with caution.

That said, the process is the same for both testnet and mainnet usage.

When you are ready to move to mainnet, the first step is to run `chia configure -t false`, which will instruct Chia to switch your configuration to mainnet.

You should also generate a new set of keys and be extra careful to protect your seed phrase.

Happy minting!
