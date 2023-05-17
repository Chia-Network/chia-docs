---
sidebar_label: NFTs
title: NFT Commands
slug: /walletconnect-nfts
---

## Commands

### `chia_getNFTs`

Requests a full or paginated listing of NFTs.

#### Request Parameters

| Parameter                 | Type       | Description                          |
| ------------------------- | ---------- | ------------------------------------ |
| `walletIds`               | `number[]` | The associated NFT wallet ids.       |
| `num` _(optional)_        | `number`   | The number of NFTs to fetch.         |
| `startIndex` _(optional)_ | `number`   | The index to start from in the list. |

#### Response Data

| Parameter   | Type                    | Description       |
| ----------- | ----------------------- | ----------------- |
| `wallet_id` | `number`                | The wallet id.    |
| `nft_list`  | [`NftInfo[]`](#nftinfo) | The list of NFTs. |

### `chia_getNFTInfo`

### `chia_transferNFT`

### `chia_getNFTsCount`

## Types

### NFTInfo

| Parameter                      | Type                            | Description                            |
| ------------------------------ | ------------------------------- | -------------------------------------- |
| `nft_id`                       | `string`                        | The NFT id.                            |
| `launcher_id`                  | `string`                        | The launcher id.                       |
| `nft_coin_id`                  | `string`                        | The current coin id.                   |
| `nft_coin_confirmation_height` | `number`                        | Current NFT coin confirmation height   |
| `owner_did`                    | <code>string &#124; null</code> | The owner DID.                         |
| `royalty_percentage`           | <code>number &#124; null</code> | Creator royalty percent. (1000 = 1%)   |
| `royalty_puzzle_hash`          | <code>string &#124; null</code> | Puzzle hash royalty is sent to.        |
| `data_uris`                    | `string[]`                      | List of content URIs.                  |
| `data_hash`                    | `string`                        | Hash of the content.                   |
| `metadata_uris`                | `string[]`                      | List of metadata URIs.                 |
| `metadata_hash`                | `string`                        | Hash of the metadata.                  |
| `license_uris`                 | `string[]`                      | List of the license URIs.              |
| `license_hash`                 | `string`                        | Hash of the license.                   |
| `edition_total`                | `number`                        | How many NFTs in the current edition.  |
| `edition_number`               | `number`                        | Number of the current NFT in edition.  |
| `updater_puzhash`              | `string`                        | Puzzle hash of the metadata updater.   |
| `chain_info`                   | `string`                        | Information saved on the chain.        |
| `mint_height`                  | `number`                        | Block height when the NFT was minted.  |
| `supports_did`                 | `boolean`                       | Whether the inner puzzle supports DID. |
| `p2_address`                   | `string`                        | The innermost puzzle hash of the NFT.  |
| `pending_transaction`          | `boolean`                       | Whether the NFT is pending for a tx.   |
| `minter_did`                   | <code>string &#124; null</code> | The minter DID.                        |
| `launcher_puzhash`             | `string`                        | Singleton launcher puzzle hash.        |
| `off_chain_metadata`           | <code>string &#124; null</code> | Serialized off-chain metadata.         |
