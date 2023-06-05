---
sidebar_label: DIDs
title: DID Commands
slug: /walletconnect-dids
---

## Commands

### `chia_createNewDIDWallet`

Creates a new DID profile.

| Parameter              | Type       | Description                   |
| ---------------------- | ---------- | ----------------------------- |
| `amount`               | `number`   | Amount in mojos.              |
| `fee`                  | `number`   | Transaction fee in mojos.     |
| `backupDids`           | `string[]` | Associated backup DIDs.       |
| `numOfBackupIdsNeeded` | `number`   | Number of backup DIDs needed. |

#### Output Data

| Parameter  | Type                                               | Description                  |
| ---------- | -------------------------------------------------- | ---------------------------- |
| `type`     | [`WalletType`](/walletconnect-commands#wallettype) | Type of wallet (8 for DIDs). |
| `myDid`    | `string`                                           | Bech32m encoded DID address. |
| `walletId` | `number`                                           | Created wallet id.           |
| `success`  | `boolean`                                          | Backend success status.      |

### `chia_setDIDName`

Sets the name of a DID wallet.

| Parameter  | Type     | Description  |
| ---------- | -------- | ------------ |
| `walletId` | `number` | Wallet id.   |
| `name`     | `string` | Wallet name. |

#### Output Data

| Parameter  | Type      | Description             |
| ---------- | --------- | ----------------------- |
| `walletId` | `number`  | Wallet id.              |
| `success`  | `boolean` | Backend success status. |
