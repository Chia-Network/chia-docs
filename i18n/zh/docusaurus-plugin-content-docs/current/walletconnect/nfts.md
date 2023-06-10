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
| `walletId`            | <code>number &#124; number[]</code>                            | NFT wallet id(s).     |
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

| Parameter                   | Type                      | Description                            |
| --------------------------- | ------------------------- | -------------------------------------- |
| `nftId`                     | `string`                  | The NFT id.                            |
| `launcherId`                | `string`                  | The launcher id.                       |
| `nftCoinId`                 | `string`                  | The current coin id.                   |
| `nftCoinConfirmationHeight` | `number`                  | Current NFT coin confirmation height   |
| `ownerDid`                  | <code>string &#124; null</code> | The owner DID.                         |
| `royaltyPercentage`         | <code>number &#124; null</code> | Creator royalty percent. (1000 = 1%)   |
| `royaltyPuzzleHash`         | <code>string &#124; null</code> | Puzzle hash royalty is sent to.        |
| `dataUris`                  | `string[]`                | List of content URIs.                  |
| `dataHash`                  | `string`                  | Hash of the content.                   |
| `metadataUris`              | `string[]`                | List of metadata URIs.                 |
| `metadataHash`              | `string`                  | Hash of the metadata.                  |
| `licenseUris`               | `string[]`                | List of the license URIs.              |
| `licenseHash`               | `string`                  | Hash of the license.                   |
| `editionTotal`              | `number`                  | How many NFTs in the current edition.  |
| `editionNumber`             | `number`                  | Number of the current NFT in edition.  |
| `updaterPuzhash`            | `string`                  | Puzzle hash of the metadata updater.   |
| `chainInfo`                 | `string`                  | Information saved on the chain.        |
| `mintHeight`                | `number`                  | Block height when the NFT was minted.  |
| `supportsDid`               | `boolean`                 | Whether the inner puzzle supports DID. |
| `p2Address`                 | `string`                  | The innermost puzzle hash of the NFT.  |
| `pendingTransaction`        | `boolean`                 | Whether the NFT is pending for a tx.   |
| `minterDid`                 | <code>string &#124; null</code> | The minter DID.                        |
| `launcherPuzhash`           | `string`                  | Singleton launcher puzzle hash.        |
| `offChainMetadata`          | <code>string &#124; null</code> | Serialized off-chain metadata.         |
