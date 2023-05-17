---
sidebar_label: DIDs
title: DID Commands
slug: /walletconnect-dids
---

## Commands

### `chia_createNewDIDWallet`

Creates a new DID wallet.

#### Request Parameters

| Parameter              | Type       | Description                                |
| ---------------------- | ---------- | ------------------------------------------ |
| `amount`               | `number`   | Amount to create the wallet with in mojos. |
| `fee`                  | `number`   | The transaction fee in mojos.              |
| `backupDids`           | `string[]` | The associated backup DIDs.                |
| `numOfBackupIdsNeeded` | `number`   | The number of backup DIDs needed.          |

#### Response Data

| Parameter  | Type     | Description                          |
| ---------- | -------- | ------------------------------------ |
| `type`     | `number` | The type of the wallet (8 for DIDs). |
| `myDid`    | `string` | The bech32m encoded DID address.     |
| `walletId` | `number` | The newly created wallet id.         |

### `chia_setDIDName`

Sets the name of a DID wallet.

#### Request Parameters

| Parameter  | Type     | Description                 |
| ---------- | -------- | --------------------------- |
| `walletId` | `number` | The id of the wallet.       |
| `name`     | `string` | The new name of the wallet. |

#### Response Data

| Parameter  | Type     | Description           |
| ---------- | -------- | --------------------- |
| `walletId` | `number` | The id of the wallet. |

### `chia_setNFTDID`

Sets the DID of an NFT.

#### Request Parameters

| Parameter    | Type       | Description                      |
| ------------ | ---------- | -------------------------------- |
| `walletId`   | `number`   | The id of the wallet.            |
| `nftCoinIds` | `string[]` | Coin ids of the NFT.             |
| `did`        | `string`   | The bech32m encoded DID address. |
| `fee`        | `number`   | The transaction fee in mojos.    |

#### Response Data

| Parameter     | Type                                                 | Description                 |
| ------------- | ---------------------------------------------------- | --------------------------- |
| `walletId`    | `number`                                             | The id of the wallet.       |
| `spendBundle` | [`SpendBundle`](/walletconnect-commands#spendbundle) | The generated spend bundle. |
