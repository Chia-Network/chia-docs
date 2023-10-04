---
sidebar_label: CATs
title: CAT Commands
slug: /walletconnect-cats
---

## Commands

### `chia_getCATWalletInfo`

Gets the wallet name and id of a given CAT, by its asset id.

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| `assetId` | `string` | Asset id.   |

#### Output Data

| Parameter  | Type      | Description             |
| ---------- | --------- | ----------------------- |
| `name`     | `string`  | Wallet name.            |
| `walletId` | `number`  | Wallet id.              |
| `success`  | `boolean` | Backend success status. |

### `chia_getCATAssetId`

Gets the asset id of a CAT by its wallet id.

| Parameter  | Type     | Description |
| ---------- | -------- | ----------- |
| `walletId` | `number` | Wallet id.  |

#### Output Data

The output is a hex encoded asset id of type `string`.

### `chia_spendCAT`

Sends an amount of CAT mojos in a given wallet to a recipient address.

| Parameter                           | Type       | Description                               |
| ----------------------------------- | ---------- | ----------------------------------------- |
| `walletId`                          | `number`   | CAT wallet id to use coins from.          |
| `amount`                            | `number`   | Amount in mojos.                          |
| `fee`                               | `number`   | Transaction fee in mojos.                 |
| `address`                           | `string`   | Bech32m encoded recipient address.        |
| `waitForConfirmation?` _(optional)_ | `boolean`  | Whether to wait for inclusion in a block. |
| `memos?` _(optional)_               | `string[]` | A list of coin memos (such as hint).      |

#### Output Data

| Parameter       | Type                                      | Description             |
| --------------- | ----------------------------------------- | ----------------------- |
| `transaction`   | [`TransactionRecord`](#transactionrecord) | Transaction record.     |
| `transactionId` | `string`                                  | Transaction id.         |
| `success`       | `boolean`                                 | Backend success status. |

### `chia_addCATToken`

Imports a CAT by its asset id into the wallet, and assigns a name to it.

| Parameter | Type     | Description  |
| --------- | -------- | ------------ |
| `assetId` | `string` | Asset id.    |
| `name`    | `string` | Wallet name. |

#### Output Data

The output is a wallet id of type `number`.
