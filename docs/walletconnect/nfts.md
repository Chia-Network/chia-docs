---
sidebar_label: NFTs
title: NFT Commands
slug: /walletconnect-nfts
---

## Commands

### `chia_getNFTs`

Requests a full or paginated list of NFTs.

| Parameter    | Type       | Description                      |
| ------------ | ---------- | -------------------------------- |
| `walletIds`  | `number[]` | NFT wallet ids.                  |
| `num`        | `number`   | Number of NFTs to fetch.         |
| `startIndex` | `number`   | Index to start from in the list. |

#### Output data

The output is an object of type [`Record<string, NFTInfo[]>`](#nftinfo), where the keys are wallet ids.

### `chia_getNFTInfo`

Gets information about a specific NFT.

| Parameter | Type     | Description      |
| --------- | -------- | ---------------- |
| `coinId`  | `string` | NFT launcher id. |

#### Output Data

The output is an object of type [`NftInfo`](#nftinfo).

### `chia_mintNFT`

| Parameter                        | Type                            | Description                             |
| -------------------------------- | ------------------------------- | --------------------------------------- |
| `walletId`                       | `number`                        | NFT wallet id.                          |
| `royaltyAddress` _(optional)_    | <code>string &#124; null</code> | Address royalty is sent to.             |
| `royaltyPercentage` _(optional)_ | <code>number &#124; null</code> | Creator royalty percent. (1000 = 1%)    |
| `targetAddress` _(optional)_     | <code>string &#124; null</code> | Address NFT is sent to upon mint.       |
| `uris`                           | `string[]`                      | List of NFT content URIs.               |
| `hash`                           | `string`                        | Hash of the NFT content.                |
| `metaUris`                       | `string[]`                      | List of metadata URIs.                  |
| `metaHash` _(optional)_          | <code>string &#124; null</code> | Hash of the metadata.                   |
| `licenseUris`                    | `string[]`                      | List of the license URIs.               |
| `licenseHash` _(optional)_       | <code>string &#124; null</code> | Hash of the license.                    |
| `editionNumber` _(optional)_     | <code>number &#124; null</code> | Number of the current NFT in edition.   |
| `editionTotal` _(optional)_      | <code>number &#124; null</code> | How many NFTs in the current edition.   |
| `didId` _(optional)_             | <code>string &#124; null</code> | The DID used during an NFT mint.        |
| `fee` _(optional)_               | <code>number &#124; null</code> | Transaction fee in mojos.               |

#### Output Data

| Parameter             | Type                                                 | Description             |
| --------------------- | ---------------------------------------------------- | ----------------------- |
| `nftId`               | `string`                                             | The NFT id.             |
| `spendBundle`         | [`SpendBundle`](/walletconnect-commands#spendbundle) | Created spend bundle.   |
| `success`             | `boolean`                                            | Backend success status. |
| `walletId`            | `number`                                             | NFT wallet id.          |


### `chia_transferNFT`

| Parameter       | Type       | Description                             |
| --------------- | ---------- | --------------------------------------- |
| `walletId`      | `number`   | NFT wallet id.                          |
| `launcherId`    | `string`   | NFT launcher id.                        |
| `nftCoinIds`    | `string[]` | NFT coin ids.                           |
| `targetAddress` | `string`   | Bech32m encoded address to transfer to. |
| `fee`           | `number`   | Transaction fee in mojos.               |

#### Output Data

| Parameter             | Type                                                 | Description           |
| --------------------- | ---------------------------------------------------- | --------------------- |
| `walletId`            | <code>number &#124; number[]</code>                  | NFT wallet id(s).     |
| `spendBundle`         | [`SpendBundle`](/walletconnect-commands#spendbundle) | Created spend bundle. |
| `txNum?` _(optional)_ | `number`                                             | Transaction number.   |

### `chia_getNFTsCount`

| Parameter   | Type       | Description     |
| ----------- | ---------- | --------------- |
| `walletIds` | `number[]` | NFT wallet ids. |

#### Output Data

The output is an object of type `Record<string, number>`, where the keys are wallet ids. It has the following additional key:

| Parameter | Type     | Description           |
| --------- | -------- | --------------------- |
| `total`   | `number` | Total number of NFTs. |

### `chia_setNFTDID`

Sets the owner DID associated with a given NFT.

| Parameter       | Type       | Description                  |
| --------------- | ---------- | ---------------------------- |
| `walletId`      | `number`   | Wallet id.                   |
| `nftLauncherId` | `string`   | NFT launcher id.             |
| `nftCoinIds`    | `string[]` | NFT coin ids.                |
| `did`           | `string`   | Bech32m encoded DID address. |
| `fee`           | `number`   | Transaction fee in mojos.    |

#### Output Data

| Parameter     | Type                                                 | Description             |
| ------------- | ---------------------------------------------------- | ----------------------- |
| `walletId`    | `number`                                             | Wallet id.              |
| `spendBundle` | [`SpendBundle`](/walletconnect-commands#spendbundle) | Created spend bundle.   |
| `success`     | `boolean`                                            | Backend success status. |

## Types

### NFTInfo

| Parameter                   | Type                            | Description                            |
| --------------------------- | ------------------------------- | -------------------------------------- |
| `nftId`                     | `string`                        | The NFT id.                            |
| `launcherId`                | `string`                        | The launcher id.                       |
| `nftCoinId`                 | `string`                        | The current coin id.                   |
| `nftCoinConfirmationHeight` | `number`                        | Current NFT coin confirmation height   |
| `ownerDid`                  | <code>string &#124; null</code> | The owner DID.                         |
| `royaltyPercentage`         | <code>number &#124; null</code> | Creator royalty percent. (1000 = 1%)   |
| `royaltyPuzzleHash`         | <code>string &#124; null</code> | Puzzle hash royalty is sent to.        |
| `royaltyAddress`            | `string`                        | Address royalty is sent to.            |
| `targetAddress`             | `string`                        | Address NFT is sent to upon mint.      |
| `uris`                      | `string[]`                      | List of NFT content URIs.              |
| `hash`                      | `string`                        | Hash of the NFT content.               |
| `metaUris`                  | `string[]`                      | List of metadata URIs.                 |
| `metaHash`                  | `string`                        | Hash of the metadata.                  |
| `licenseUris`               | `string[]`                      | List of the license URIs.              |
| `licenseHash`               | `string`                        | Hash of the license.                   |
| `editionTotal`              | `number`                        | How many NFTs in the current edition.  |
| `editionNumber`             | `number`                        | Number of the current NFT in edition.  |
| `updaterPuzhash`            | `string`                        | Puzzle hash of the metadata updater.   |
| `chainInfo`                 | `string`                        | Information saved on the chain.        |
| `mintHeight`                | `number`                        | Block height when the NFT was minted.  |
| `supportsDid`               | `boolean`                       | Whether the inner puzzle supports DID. |
| `p2Address`                 | `string`                        | The innermost puzzle hash of the NFT.  |
| `pendingTransaction`        | `boolean`                       | Whether the NFT is pending for a tx.   |
| `didId`                     | <code>string &#124; null</code> | The DID used during an NFT mint.       |
| `minterDid`                 | <code>string &#124; null</code> | The minter DID.                        |
| `launcherPuzhash`           | `string`                        | Singleton launcher puzzle hash.        |
| `offChainMetadata`          | <code>string &#124; null</code> | Serialized off-chain metadata.         |
