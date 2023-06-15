---
slug: /guides/nft-rpc
title: Minting NFTs With RPC
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

The next section of this tutorial will demonstrate how to create and use DIDs and NFTs using RPCs. If you wish to use the CLI instead, head to the [CLI section](/guides/nft-cli).

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

:::warning important
When running RPC commands with JSON inputs on **Windows**, you will need to escape all quotes with backslashes.

Here is an example of the difference between the syntax:

```mdx-code-block
<Tabs
  defaultValue="windows"
  values={[
    {label: 'Windows', value: 'windows'},
    {label: 'Linux/MacOS', value: 'nix'},
  ]}>
  <TabItem value="windows">
```

```powershell
chia rpc wallet create_new_wallet '{\"wallet_type\": \"nft_wallet\"}'
```

```mdx-code-block
  </TabItem>
  <TabItem value="nix">
```

```bash
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet"}'
```

```mdx-code-block
  </TabItem>
</Tabs>
```

:::

:::info
If you already created an NFT wallet using the CLI command from the previous section, you can skip to the next section, [Obtain an image and its hash](#obtain-an-image-and-its-hash 'Obtain an image and its hash').
:::

In this section, we'll start with a brand new wallet fingerprint. However, you'll still need an existing DID to set up a new DID with this RPC.

As detailed in the previous guide, you can use this command to do that:

```bash
chia wallet did create -n "Backup DID"
```

Now we will make the new DID containing 1 mojo, with the backup DID for recovery and a transaction fee:

```bash
chia rpc wallet create_new_wallet '{"wallet_type": "did_wallet", "did_type": "new", "amount": 1, "backup_dids": ["did:chia:1plzd3t49kek2clpfmy7eam3hkmqtm8lu66uw8r3v3qgdu5vecnfsmsdmm7"], "num_of_backup_ids_needed": 1, "fee": 10000000}'
```

That should produce an output similar to this:

```json
{
  "my_did": "did:chia:19z0ladugc29x36580yejgp0s6czq0axt4tq0w7kr9uk4042asusqvxldga",
  "success": true,
  "type": 8,
  "wallet_id": 4
}
```

It will take a few minutes for your new wallet to be confirmed on the blockchain.

You can run the following command to check the status:

```bash
chia wallet show
```

Which will eventually produce an output similar to this:

```js
Wallet keys:
1) * 2473516996 (Synced)
2)   2034978751
Choose a wallet key [1-2] ('q' to quit, or Enter to use 2473516996):
Wallet height: 1150653
Sync status: Synced
Balances, fingerprint: 2473516996

Chia Wallet:
   -Total Balance:         0.999999999999 txch (999999999999 mojo)
   -Pending Total Balance: 0.999999999998 txch (999999999998 mojo)
   -Spendable:             0.0 txch (0 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Backup DID:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:1plzd3t49kek2clpfmy7eam3hkmqtm8lu66uw8r3v3qgdu5vecnfsmsdmm7
   -Wallet ID:             2

Profile 1:
   -Total Balance:         0.0
   -Pending Total Balance: 1.0
   -Spendable:             0.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:19z0ladugc29x36580yejgp0s6czq0axt4tq0w7kr9uk4042asusqvxldga
   -Wallet ID:             4
```

## Create an NFT Wallet

:::note

You are recommended to associate all NFTs with DIDs. This helps to establish the NFT's provenance, among other benefits. This guide will only discuss how to create NFTs in the recommended way, with DIDs.

:::

Create an NFT wallet that references your DID wallet's `Wallet ID`. Be sure to change the `did_id` to your local DID wallet's `Wallet ID`.

Run the following command:

```bash
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet", "name": "My NFT Wallet (RPC/DID)", "did_id": "did:chia:19z0ladugc29x36580yejgp0s6czq0axt4tq0w7kr9uk4042asusqvxldga", "fee": 10000000}'
```

That should produce an output similar to this:

```json
{
  "success": true,
  "type": 10,
  "wallet_id": 6
}
```

You will now have two DIDs and one NFT wallet.

Run the following command periodically so you know when they are added:

```bash
chia wallet show
```

Which will eventually produce an output similar to this:

```js
Wallet height: 1150656
Sync status: Synced
Balances, fingerprint: 2473516996

Chia Wallet:
   -Total Balance:         0.999999999998 txch (999999999998 mojo)
   -Pending Total Balance: 0.999999999998 txch (999999999998 mojo)
   -Spendable:             0.999999999998 txch (999999999998 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Backup DID:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:1plzd3t49kek2clpfmy7eam3hkmqtm8lu66uw8r3v3qgdu5vecnfsmsdmm7
   -Wallet ID:             2

Profile 1:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:19z0ladugc29x36580yejgp0s6czq0axt4tq0w7kr9uk4042asusqvxldga
   -Wallet ID:             4

My NFT Wallet (RPC/DID):
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -DID ID:                did:chia:19z0ladugc29x36580yejgp0s6czq0axt4tq0w7kr9uk4042asusqvxldga
   -Wallet ID:             6
```

## Mint an NFT (With DID)

:::warning important

The values used in these commands are specific to this guide. Change any values that are different when you are following this guide such as the wallet id.

:::

You can mint your NFT with a DID like this:

```bash
chia rpc wallet nft_mint_nft '{"wallet_id": 6, "uris": ["https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg"], "hash": "0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4", "meta_uris": ["https://pastebin.com/raw/BHZc1suk", "https://pastebin.com/raw/bnzGwjmB"], "meta_hash": "07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51", "license_uris": ["https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE"], "license_hash": "30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6", "royalty_address": "txch1ape36g8rn8fm7d53z8rvngjkwhlkr83p28vnrpha94zt25szh8aq6anp3y", "royalty_percentage": 175, "target_address": "txch1ezy69gr6gpmu5e3hvyrn07ls7gqrw66s93pt555xcw50x25a2g7q3l3f8m", "edition_number": 1, "edition_total": 5, "fee": 615000000}'
```

That should produce an output similar to this:

```json
{
    "spend_bundle": {
        "aggregated_signature": "0xb7cc94bff495c6ca81bced8c381db21923d9882709442343fc977b8647619bb075eef82925178a802e833a2a0097a3b90eb0cd0ae8dd839e90bba3a17293460ce2768abaf5ce7332b8daaee1d1cd12775a984619a0d1779b264fd51773214e4a",
        "coin_solutions": [
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0xa2982da3fda6f12e613eaf01770d8cd607102b9446c33793d580fee5d0c672be",
                    "puzzle_hash": "0x811b594322ad73ccfb00726058a1d2fd919c233aa8feccf8afc07887d379c8a6"
                },
                "puzzle_reveal": ...,
                "solution": ...
            },
            {
                "coin": {
                    "amount": 999999999997,
                    "parent_coin_info": "0x00a986af4f2aecf5c32c2042c4651a9a3ceedb57fe68646258ab35815b31cefb",
                    "puzzle_hash": "0xc16a7187151e46df4f91ebf0a5b7526d6ab55189ac91bf68c506791182db537d"
                },
                "puzzle_reveal": ...,
                "solution": ...
            },
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0x6a8f7d6883b5b566d2cbf45fe4a6a75a4134bc689aa5094181a7522155b604bd",
                    "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
                },
                "puzzle_reveal": ...,
                "solution": ...
            },
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0xefd2ec36dcdede4c48cdc87681f95416c1a181112ce919e54991b1ed5bbda0de",
                    "puzzle_hash": "0xa50228088b095397af35ba2050aa9e11de210fe13152a6f462f1f6ea93f01886"
                },
                "puzzle_reveal": ...,
                "solution": ...
            }
        ]
    },
    "success": true,
    "wallet_id": 6
}
```

Here is a description of the parameters used in the command:

| Parameter            | Description                                                                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "wallet_id"          | The ID of your NFT wallet.                                                                                                                                          |
| "uris"               | A list of URIs containing the image.                                                                                                                                |
| "hash"               | The hash of the image.                                                                                                                                              |
| "fee"                | The transaction fee.                                                                                                                                                |
| "did_id"             | The DID associated with the NFT.                                                                                                                                    |
| "meta_uris"          | A list of URIs containing the metadata.                                                                                                                             |
| "meta_hash"          | The hash of the metadata.                                                                                                                                           |
| "license_uris"       | A list of URIs containing the license.                                                                                                                              |
| "license_hash"       | The hash of the license.                                                                                                                                            |
| "royalty_address"    | The wallet or smart coin address of the creator.                                                                                                                    |
| "royalty_percentage" | The royalty percentage expressed as tens of thousandths of a percent.                                                                                               |
| "target_address"     | The address of the owner.                                                                                                                                           |
| "edition_number"     | If this NFT has multiple **editions** (multiple identical copies of an NFT), then this parameter indicates the edition number of this NFT.                          |
| "edition_total"      | If this NFT has multiple **editions**, then this parameter indicates the total number of editions of this NFT. This parameter should be used with `edition_number`. |

Wait a few minutes for your NFT to be confirmed on the blockchain.

You can use the following command to check whether it is minted periodically:

```bash
chia rpc wallet nft_get_nfts '{"wallet_id": 6}'
```

That should produce an output similar to this:

```json
{
    "nft_list": [
        {
            "chain_info": "((117 "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg") (104 . 0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4) (28021 "https://pastebin.com/raw/BHZc1suk" "https://pastebin.com/raw/bnzGwjmB") (27765 "https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE") (29550 . 1) (29556 . 5) (28008 . 0x07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51) (27752 . 0x30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6))",
            "data_hash": "0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4",
            "data_uris": [
                "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg"
            ],
            "launcher_id": "0xa2982da3fda6f12e613eaf01770d8cd607102b9446c33793d580fee5d0c672be",
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
            "mint_height": 1150673,
            "nft_coin_id": "0x10965a0e7cf27b6ca377a8bf65c42c002a5ed83b71ddf0a2c2439626ef0ab1b4",
            "owner_did": "0x289ffeb788c28a68ea8779332405f0d60407f4cbaac0f77ac32f2d57d55d8720",
            "pending_transaction": false,
            "royalty_percentage": 175,
            "royalty_puzzle_hash": "0xe8731d20e399d3bf369111c6c9a25675ff619e2151d93186fd2d44b55202b9fa",
            "edition_number": 1,
            "edition_total": 5,
            "supports_did": true,
            "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
        }
    ],
    "success": true,
    "wallet_id": 6
}
```

## Get Info About Your NFTs

:::warning important

The values used in these commands are specific to this guide. Change any values that are different when you are following this guide such as the wallet id.

:::

There are two RPCs that show info about NFTs.

This one will show all of the NFTs in a given wallet:

```bash
chia rpc wallet nft_get_nfts '{"wallet_id": 6}'
```

That should produce an output similar to this:

```json
{
    "nft_list": [
        {
            "chain_info": "((117 "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg") (104 . 0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4) (28021 "https://pastebin.com/raw/BHZc1suk" "https://pastebin.com/raw/bnzGwjmB") (27765 "https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE") (29550 . 1) (29556 . 5) (28008 . 0x07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51) (27752 . 0x30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6))",
            "data_hash": "0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4",
            "data_uris": [
                "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg"
            ],
            "launcher_id": "0xa2982da3fda6f12e613eaf01770d8cd607102b9446c33793d580fee5d0c672be",
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
            "mint_height": 1150673,
            "nft_coin_id": "0xf5c8951c18dba6482df3447329a2e92f432c8d93d7bcec4ec5488df8763c321b",
            "owner_did": "0x289ffeb788c28a68ea8779332405f0d60407f4cbaac0f77ac32f2d57d55d8720",
            "pending_transaction": false,
            "royalty_percentage": 175,
            "royalty_puzzle_hash": "0xe8731d20e399d3bf369111c6c9a25675ff619e2151d93186fd2d44b55202b9fa",
            "edition_number": 1,
            "edition_total": 5,
            "supports_did": true,
            "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
        }
    ],
    "success": true,
    "wallet_id": 6
}
```

This RPC will show information relating to a specific NFT:

```bash
chia rpc wallet nft_get_info '{"wallet_id": 6, "coin_id": "0xf5c8951c18dba6482df3447329a2e92f432c8d93d7bcec4ec5488df8763c321b"}'
```

That should produce an output similar to this:

```json
{
    "nft_info": {
        "chain_info": "((117 "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg") (104 . 0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4) (28021 "https://pastebin.com/raw/BHZc1suk" "https://pastebin.com/raw/bnzGwjmB") (27765 "https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE") (29550 . 1) (29556 . 5) (28008 . 0x07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51) (27752 . 0x30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6))",
        "data_hash": "0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4",
        "data_uris": [
            "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg"
        ],
        "launcher_id": "0xa2982da3fda6f12e613eaf01770d8cd607102b9446c33793d580fee5d0c672be",
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
        "mint_height": 1150673,
        "nft_coin_id": "0xf5c8951c18dba6482df3447329a2e92f432c8d93d7bcec4ec5488df8763c321b",
        "owner_did": "0x289ffeb788c28a68ea8779332405f0d60407f4cbaac0f77ac32f2d57d55d8720",
        "pending_transaction": false,
        "royalty_percentage": 175,
        "royalty_puzzle_hash": "0xe8731d20e399d3bf369111c6c9a25675ff619e2151d93186fd2d44b55202b9fa",
        "edition_number": 1,
        "edition_total": 5,
        "supports_did": true,
        "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
    },
    "success": true
}
```

## Add a URI to Your NFTs

:::warning important

The values used in these commands are specific to this guide. Change any values that are different when you are following this guide such as the wallet id.

:::

As a reminder, NFTs contain URI lists for data, metadata, and license. The current owner may add URIs as needed, but they may not be removed. The URIs are recommended to hash to their corresponding data, metadata, and license hashes. This helps to obtain digital permanence while decreasing the likelihood of fraud from changing URIs.

A few caveats:

- You can only update one type of key in one spend, and you can only add a single URI per spend.
- The `nft_add_uri` RPC takes one key and one URI. The key must be either `u` (data URI), `mu` (metadata URI), or `lu` (license URI).
- The new URI will be prepended to the existing list.
- If the new URI is inaccessible, some wallets may not continue to traverse the URI list.
- Each time you run the `nft_add_uri` RPC, the NFT's coin ID will change. You therefore should run either `nft_get_nfts` or `nft_get_info` to obtain the current coin ID before adding a new URI.

### Add Data URI

Get the NFT coin info:

```bash
chia rpc wallet nft_get_nfts '{"wallet_id": 5}'
```

Note that the NFT has one data URI, and no license or metadata URIs:

```json
{
    "nft_list": [
        {
          ...
            "data_uris": [
                "https://images.pexels.com/photos/4812689/pexels-photo-4812689.jpeg"
            ],
          ...
            "license_uris": [],
          ...
            "metadata_uris": [],
          ...
          "nft_coin_id": "0x8470b7feda2f42459399bba36308449bfd24f46e4842258a25c60a0dfeb3f72c",
          ...
        }
    ],
    "success": true,
    "wallet_id": 5
}
```

Now, add the new data URI:

```bash
chia rpc wallet nft_add_uri '{"wallet_id": 5, "nft_coin_id": "0x8470b7feda2f42459399bba36308449bfd24f46e4842258a25c60a0dfeb3f72c", "key": "u", "uri": "new_datauri.com"}'
```

That should produce an output similar to this:

```json
{
    "spend_bundle": {
        "aggregated_signature": "0xad392288e50e8a083baa032e212932377e9655260299d389eef9ee980e2705901146be1d67c0133b78a209ade9cbc05a198cd041e5de3ac4aa82e749eacef9b1ecab6951cd70bf9db3148366a2423e0df231c703628f60868a77368984ddca45",
        "coin_solutions": [
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0x06673e7f4d5cb6fac227b5355036c2e541d8e72f02e3ac28b3d19e2568f1c60e",
                    "puzzle_hash": "0xcdd2d2a6692a7bb544c16daa5dd9385b1282b20466425b92c3f2119a80a775bd"
                },
                "puzzle_reveal": ...,
                "solution": ...
            }
        ]
    },
    "success": true,
    "wallet_id": 5
}
```

### Add Metadata URI

Get the NFT coin info:

```bash
chia rpc wallet nft_get_nfts '{"wallet_id": 5}'
```

That should produce an output similar to this:

```json
{
  "nft_list": [
    {
      "nft_coin_id": "0x1b3375608b8baa528a9e2fac3d460af82083e37b7078363513eaf65b17ef88fa"
    }
  ],
  "success": true,
  "wallet_id": 5
}
```

Now add the new metadata URI:

```bash
chia rpc wallet nft_add_uri '{"wallet_id": 5, "nft_coin_id": "0x1b3375608b8baa528a9e2fac3d460af82083e37b7078363513eaf65b17ef88fa", "key": "mu", "uri": "new_metadatauri.com"}'
```

That should produce an output similar to this:

```json
{
    "spend_bundle": {
        "aggregated_signature": "0x8fd16016f682cb13c3a965874b0070b5cab6898914bbf95366fcf5d12bfdc63cc491429fc5a61f012d07cc3a298906f10235ad8a1186c1e3e14b2505fb7bb37c96b0d05e866c7caf299c40d878115ae748e73705503d75ea520483fcb5620383",
        "coin_solutions": [
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0x8470b7feda2f42459399bba36308449bfd24f46e4842258a25c60a0dfeb3f72c",
                    "puzzle_hash": "0x55ae8c90568ac90c0aca15f2a9275575ed577c3f168c537e6b3a30de6c44d83b"
                },
                "puzzle_reveal": ...,
                "solution": ...
            }
        ]
    },
    "success": true,
    "wallet_id": 5
}
```

### Add License URI

Get the NFT coin info:

```bash
chia rpc wallet nft_get_nfts '{"wallet_id": 5}'
```

That should produce an output similar to this:

```json
{
  "nft_list": [
    {
      "nft_coin_id": "0xe2487e41652b3aa01f0937423ccd9e5ed3d3442accb71974ad1e5e2b240ac2e2"
    }
  ],
  "success": true,
  "wallet_id": 5
}
```

Now add the new license URI:

```bash
chia rpc wallet nft_add_uri '{"wallet_id": 5, "nft_coin_id": "0xe2487e41652b3aa01f0937423ccd9e5ed3d3442accb71974ad1e5e2b240ac2e2", "key": "lu", "uri": "new_licenseuri.com"}'
```

That should produce an output similar to this:

```json
{
    "spend_bundle": {
        "aggregated_signature": "0x91191c523ffc6608ce22ce05ea1e06e2058bf14b150aeb0940bb15189191a697dd3315cc7bf4353383505dcdf94e1bae00ea2e57f6ec89d75ad1a4ae43cad8a3ab17a7c8a26b74e9e6b73d8e9c6715f110472343f715f6eeddc44076a671173d",
        "coin_solutions": [
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0x1b3375608b8baa528a9e2fac3d460af82083e37b7078363513eaf65b17ef88fa",
                    "puzzle_hash": "0x67ab4378f5d52eeef02a550a849d6e54c5a0f8a575a8d28d6c696d144a879294"
                },
                "puzzle_reveal": ...,
                "solution": ...
            }
        ]
    },
    "success": true,
    "wallet_id": 5
}
```

### Show the New URIs

You can now check the status of the URIs you just added:

```bash
chia rpc wallet nft_get_nfts '{"wallet_id": 5}'
```

Which will eventually produce an output similar to this:

```json
{
  "nft_list": [
    {
      "data_uris": [
        "new_datauri.com",
        "https://images.pexels.com/photos/4812689/pexels-photo-4812689.jpeg"
      ],
      "license_uris": ["new_licenseuri.com"],
      "metadata_uris": ["new_metadatauri.com"]
    }
  ],
  "success": true,
  "wallet_id": 5
}
```

You can also check the list of NFTs once it has been updated:

```bash
chia rpc wallet nft_get_nfts '{"wallet_id": 5}'
```

Which will eventually produce an output similar to this:

```json
{
  "nft_list": [
    {
      "data_hash": "14836B86A48E1B2B5E857213AF97534704475B4C155D34B2CB83ED4B7CBA2BB0",
      "data_uris": [
        "https://newuri.net",
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
      "nft_coin_id": "D7FEC386B6F4A886ED406CAB09A541F85D3313206DA73FACF92B5A45158E3EEF",
      "royalty": 0,
      "version": "NFT0"
    }
  ],
  "success": true,
  "wallet_id": 2
}
```

## Transfer Your NFTs

:::warning important

The values used in these commands are specific to this guide. Change any values that are different when you are following this guide such as the wallet id.

:::

This section will show you how to transfer an NFT to a new wallet.

Generate a new set of keys, which will receive the NFTs:

```bash
chia keys generate
```

That should produce an output similar to this:

```
Generating private key
Added private key with public key fingerprint 3014780109
WARNING: using a farmer address which we might not have the private keys for. We searched the first 50 addresses. Consider overriding txch13amy3jfp8kkmqa87eswytj3a8ef22nm8zwsf3ckptpm8rv72qtgqgvk6fs with txch1ape36g8rn8fm7d53z8rvngjkwhlkr83p28vnrpha94zt25szh8aq6anp3y
WARNING: using a pool address which we might not have the private keys for. We searched the first 50 addresses. Consider overriding txch13amy3jfp8kkmqa87eswytj3a8ef22nm8zwsf3ckptpm8rv72qtgqgvk6fs with txch1ape36g8rn8fm7d53z8rvngjkwhlkr83p28vnrpha94zt25szh8aq6anp3y
```

Obtain the receive address for the new wallet with that fingerprint:

```bash
chia keys show
```

That should produce an output similar to this:

```
Showing all public keys derived from your master seed and private key:

Fingerprint: 2473516996
Master public key (m): a5eaca596431b5149b61ae707ab1de643db25d7415a29cd9a19eb7898c398c7da638e0ab06db1cf6a8d007c6032db636
Farmer public key (m/12381/8444/0/0): a20ce686aa8b466b3535a11f043b328f8dec0f129cf85e5c2bce27bf14c7d652805865dc75ae501ea71fe56418c3e291
Pool public key (m/12381/8444/1/0): b44a448fe6a003e02f0e84beb3cf8dc0774d941341443401241a848ebd2c2407ce07a0c6268c2d846903ee72bc70fc27
First wallet address: txch1ape36g8rn8fm7d53z8rvngjkwhlkr83p28vnrpha94zt25szh8aq6anp3y

Fingerprint: 3014780109
Master public key (m): 96243c818a916a014c8c431c6f468e220e4b1f49d5a2acf9eab68d182be36b961677be48e080de6588bfe49be50942e3
Farmer public key (m/12381/8444/0/0): ad6bb3da07c886fccf49528a0f0b50d27fcde387c9cdf8d897651590663f0a7c7fe67d568da4edee83bafa9f6de77071
Pool public key (m/12381/8444/1/0): b879c9f384a7fc94f3195e613c0b22ff65718da9e0568394e205b7082c17dbfbb0935cefe29ab51bc2aed89e99b65ec2
First wallet address: txch1nqpall7xesjrk8eggqxxzly2jsntrgv4usfhk5uckg8gsxfmvpxsgjvzz5
```

Now you will need the coin ID of the NFT to transfer.

```bash
chia rpc wallet nft_get_nfts '{"wallet_id": 6}'
```

That should produce an output similar to this (note the `nft_coin_id` value):

```json
{
    "nft_list": [
        {
            "chain_info": "((117 "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg") (104 . 0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4) (28021 "new_metadatauri.com" "https://pastebin.com/raw/bnzGwjmB" "https://pastebin.com/raw/BHZc1suk" "https://pastebin.com/raw/bnzGwjmB") (27765 "https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE") (29550 . 1) (29556 . 5) (28008 . 0x07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51) (27752 . 0x30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6))",
            "data_hash": "0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4",
            "data_uris": [
                "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg"
            ],
            "launcher_id": "0xa2982da3fda6f12e613eaf01770d8cd607102b9446c33793d580fee5d0c672be",
            "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
            "license_hash": "0x30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6",
            "license_uris": [
                "https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE"
            ],
            "metadata_hash": "0x07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51",
            "metadata_uris": [
                "new_metadatauri.com",
                "https://pastebin.com/raw/bnzGwjmB",
                "https://pastebin.com/raw/BHZc1suk",
                "https://pastebin.com/raw/bnzGwjmB"
            ],
            "mint_height": 1150673,
            "nft_coin_id": "0x0ee605a198dca410f4a820d4e2c8186c4d4e779d88330406b5e80579554e2213",
            "owner_did": "0x289ffeb788c28a68ea8779332405f0d60407f4cbaac0f77ac32f2d57d55d8720",
            "pending_transaction": false,
            "royalty_percentage": 175,
            "royalty_puzzle_hash": "0xe8731d20e399d3bf369111c6c9a25675ff619e2151d93186fd2d44b55202b9fa",
            "edition_number": 1,
            "edition_total": 5,
            "supports_did": true,
            "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
        }
    ],
    "success": true,
    "wallet_id": 6
}
```

Run the `nft_transfer_nft` RPC:

```bash
chia rpc wallet nft_transfer_nft '{"wallet_id": 6, "target_address": "txch1nqpall7xesjrk8eggqxxzly2jsntrgv4usfhk5uckg8gsxfmvpxsgjvzz5", "nft_coin_id": "0x0ee605a198dca410f4a820d4e2c8186c4d4e779d88330406b5e80579554e2213"}'
```

That should produce an output similar to this:

```json
{
    "spend_bundle": {
        "aggregated_signature": "0x826377fd91e337bc8fb17342f8d2c6fdd2e6bb45a89b3ed6fa27b7b933e5829192ef9a4d59c2929dc2f29ba2833963d10aee8019023208fbe0c9ecdfd9c82467f3994cc19d18692ae156927e13e64dc55388341e1f7dac29f5f913aa9cc81370",
        "coin_solutions": [
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0xf5c8951c18dba6482df3447329a2e92f432c8d93d7bcec4ec5488df8763c321b",
                    "puzzle_hash": "0x981893d399db72e3ed0a8b7622558a378311c2c196e30e75e74c75742badd918"
                },
                "puzzle_reveal": ...,
                "solution": ...
            }
        ]
    },
    "success": true,
    "wallet_id": 6
}
```

Sync the wallet you just transferred the NFT to.

After syncing is complete, run this to check if the NFT wallet is created:

```bash
chia wallet show
```

That should produce an output similar to this:

```js
Wallet keys:
1)   2473516996
2) * 3014780109 (Synced)
Choose a wallet key [1-2] ('q' to quit, or Enter to use 3014780109):
Wallet height: 1159136
Sync status: Synced
Balances, fingerprint: 3014780109

Chia Wallet:
   -Total Balance:         0.0 txch (0 mojo)
   -Pending Total Balance: 0.0 txch (0 mojo)
   -Spendable:             0.0 txch (0 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -Wallet ID:             2
```

You can get the NFT information the same way:

```bash
chia rpc wallet nft_get_nfts '{"wallet_id": 2}'
```

That should produce an output similar to this:

```json
{
    "nft_list": [
        {
            "chain_info": "((117 "new_datauri.com" "https://images.pexels.com/photos/4812689/pexels-photo-4812689.jpeg") (104 . 0x995b5e2837fa68292e88dd5f900ea83953aafcb6bfb7c086f1ba7671946c4600) (28021 "new_metadatauri.com") (27765 "new_licenseuri.com") (29550 . 1) (29556 . 1))",
            "data_hash": "0x995b5e2837fa68292e88dd5f900ea83953aafcb6bfb7c086f1ba7671946c4600",
            "data_uris": [
                "new_datauri.com",
                "https://images.pexels.com/photos/4812689/pexels-photo-4812689.jpeg"
            ],
            "launcher_id": "0xd2a9c664cb131b4a9516ad4750e49924f77a1f784d43a6544998d5c4beac6d2d",
            "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
            "license_hash": "0x",
            "license_uris": [
                "new_licenseuri.com"
            ],
            "metadata_hash": "0x",
            "metadata_uris": [
                "new_metadatauri.com"
            ],
            "mint_height": 1150666,
            "nft_coin_id": "0x3652afed15850be1d371f26f6a3789caf719fa15e79a10232ed64e6314c2f379",
            "owner_did": null,
            "pending_transaction": false,
            "royalty_percentage": null,
            "royalty_puzzle_hash": null,
            "edition_number": 1,
            "edition_total": 1,
            "supports_did": false,
            "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
        },
        {
            "chain_info": "((117 "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg") (104 . 0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4) (28021 "new_metadatauri.com" "https://pastebin.com/raw/bnzGwjmB" "https://pastebin.com/raw/BHZc1suk" "https://pastebin.com/raw/bnzGwjmB") (27765 "https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE") (29550 . 1) (29556 . 5) (28008 . 0x07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51) (27752 . 0x30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6))",
            "data_hash": "0x0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4",
            "data_uris": [
                "https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg"
            ],
            "launcher_id": "0xa2982da3fda6f12e613eaf01770d8cd607102b9446c33793d580fee5d0c672be",
            "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
            "license_hash": "0x30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6",
            "license_uris": [
                "https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE"
            ],
            "metadata_hash": "0x07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51",
            "metadata_uris": [
                "new_metadatauri.com",
                "https://pastebin.com/raw/bnzGwjmB",
                "https://pastebin.com/raw/BHZc1suk",
                "https://pastebin.com/raw/bnzGwjmB"
            ],
            "mint_height": 1150673,
            "nft_coin_id": "0x4b2587ae95b451d21f63f5863bbcc48b796b54bf5ee249ded334408d2ab85500",
            "owner_did": null,
            "pending_transaction": false,
            "royalty_percentage": 175,
            "royalty_puzzle_hash": "0xe8731d20e399d3bf369111c6c9a25675ff619e2151d93186fd2d44b55202b9fa",
            "edition_number": 1,
            "edition_total": 5,
            "supports_did": true,
            "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
        }
    ],
    "success": true,
    "wallet_id": 2
}
```

## Mainnet Usage

After you are comfortable with creating and using DIDs and NFTs on the testnet, you may wish to move to mainnet. Please keep in mind that there are extra risks inherent to publishing code on a public blockchain. For example, an NFT's data, metadata and license hashes are not allowed to change after minting. Proceed with caution.

That said, the code is the same for both testnet and mainnet usage.

When you are ready to move to mainnet, the first step is to run `chia configure -t false`, which will instruct Chia to switch your configuration to mainnet.

You should also generate a new set of keys and be extra careful to protect your seed phrase.

Happy minting!
