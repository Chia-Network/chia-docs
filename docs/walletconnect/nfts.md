---
sidebar_label: NFTs
title: NFT Commands
slug: /walletconnect-nfts
---

## Commands

### `chia_getNFTs`

Requests a full or paginated listing of NFTs.

#### Request

| Parameter    | Type       | Description                          |
| ------------ | ---------- | ------------------------------------ |
| `walletIds`  | `number[]` | The NFT wallet ids.                  |
| `num`        | `number`   | The number of NFTs to fetch.         |
| `startIndex` | `number`   | The index to start from in the list. |

#### Response

The response is an object with keys equal to the individual `walletIds` provided in the request.

| Type                                    | Description              |
| --------------------------------------- | ------------------------ |
| [`Record<string, NftInfo[]>`](#nftinfo) | List of NFTs per wallet. |

### `chia_getNFTInfo`

Gets information about a specific NFT.

#### Request

| Parameter | Type     | Description          |
| --------- | -------- | -------------------- |
| `coinId`  | `string` | The NFT launcher id. |

#### Response

The response is an [`NftInfo`](#nftinfo) object.

### `chia_transferNFT`

#### Request

| Parameter       | Type       | Description                                 |
| --------------- | ---------- | ------------------------------------------- |
| `walletId`      | `number`   | The NFT wallet id.                          |
| `nftCoinIds`    | `string[]` | The NFT coin ids.                           |
| `targetAddress` | `string`   | The bech32m encoded address to transfer to. |
| `fee`           | `number`   | The network fee in mojos.                   |

#### Response

| Parameter            | Type                                                 | Description                                           |
| -------------------- | ---------------------------------------------------- | ----------------------------------------------------- |
| `walletId`           | <code>number &#124; number[]</code>                  | The NFT wallet id or NFT wallet ids.                  |
| `spendBundle`        | [`SpendBundle`](/walletconnect-commands#spendbundle) | The spend bundle for the transaction.                 |
| `txNum` _(optional)_ | `number`                                             | The transaction number, if multiple were transferred. |

### `chia_getNFTsCount`

| Parameter  | Type     | Description        |
| ---------- | -------- | ------------------ |
| `walletId` | `number` | The NFT wallet id. |

#### Response

| Parameter  | Type     | Description         |
| ---------- | -------- | ------------------- |
| `walletId` | `number` | The NFT wallet id.  |
| `count`    | `number` | The number of NFTs. |

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
| `dataUris`                  | `string[]`                      | List of content URIs.                  |
| `dataHash`                  | `string`                        | Hash of the content.                   |
| `metadataUris`              | `string[]`                      | List of metadata URIs.                 |
| `metadataHash`              | `string`                        | Hash of the metadata.                  |
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
| `minterDid`                 | <code>string &#124; null</code> | The minter DID.                        |
| `launcherPuzhash`           | `string`                        | Singleton launcher puzzle hash.        |
| `offChainMetadata`          | <code>string &#124; null</code> | Serialized off-chain metadata.         |
