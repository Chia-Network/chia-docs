---
sidebar_label: Wallet
title: Wallet Commands
slug: /walletconnect-commands
---

## Commands

### `chia_logIn`

Prompts the user to login into the wallet corresponding to the provided fingerprint.

#### Request Parameters

| Parameter     | Type     | Description                    |
| ------------- | -------- | ------------------------------ |
| `fingerprint` | `number` | The fingerprint of the wallet. |

#### Response Data

| Parameter     | Type     | Description                    |
| ------------- | -------- | ------------------------------ |
| `fingerprint` | `number` | The fingerprint of the wallet. |

### `chia_getWallets`

Requests a complete listing of the wallets associated with the current wallet key.

#### Request Parameters

| Parameter     | Type      | Description                                |
| ------------- | --------- | ------------------------------------------ |
| `includeData` | `boolean` | Whether or not to include wallet metadata. |

#### Response Data

| Parameter     | Type                          | Description                   |
| ------------- | ----------------------------- | ----------------------------- |
| `fingerprint` | `number`                      | Logged in wallet fingerprint. |
| `wallets`     | [`WalletInfo[]`](#walletinfo) | The wallet list.              |

### `chia_getTransaction`

Requests details for a specific transaction.

#### Request Parameters

| Parameter       | Type     | Description         |
| --------------- | -------- | ------------------- |
| `transactionId` | `string` | The transaction id. |

#### Response Data

| Parameter       | Type                                | Description             |
| --------------- | ----------------------------------- | ----------------------- |
| `transaction`   | [`TransactionRecord`](#transaction) | The transaction record. |
| `transactionId` | `string`                            | The transaction id.     |

### `chia_getWalletBalance`

Requests the asset balance for a specific wallet.

#### Request Parameters

| Parameter  | Type     | Description                                         |
| ---------- | -------- | --------------------------------------------------- |
| `walletId` | `number` | The associated wallet id (defaults to main wallet). |

#### Response Data

| Parameter       | Type                        | Description         |
| --------------- | --------------------------- | ------------------- |
| `walletBalance` | [`Balance`](#walletbalance) | The wallet balance. |

### `chia_getCurrentAddress`

### `chia_sendTransaction`

### `chia_signMessageById`

### `chia_signMessageByAddress`

### `chia_verifySignature`

### `chia_getNextAddress`

### `chia_getSyncStatus`

## Types

### WalletInfo

| Parameter | Type                        | Description                              |
| --------- | --------------------------- | ---------------------------------------- |
| `id`      | `number`                    | The wallet id.                           |
| `name`    | `string`                    | The name of the wallet.                  |
| `type`    | [`WalletType`](#wallettype) | The type of the wallet.                  |
| `data`    | `any`                       | Extra info (unused for standard wallet). |

### WalletType

| Name               | Value |
| ------------------ | ----- |
| `STANDARD_WALLET`  | 0     |
| `RATE_LIMITED`     | 1     |
| `ATOMIC_SWAP`      | 2     |
| `AUTHORIZED_PAYEE` | 3     |
| `MULTI_SIG`        | 4     |
| `CUSTODY`          | 5     |
| `CAT`              | 6     |
| `RECOVERABLE`      | 7     |
| `DECENTRALIZED_ID` | 8     |
| `POOLING_WALLET`   | 9     |
| `NFT`              | 10    |
| `DATA_LAYER`       | 11    |

### Transaction

| Parameter           | Type                                                 | Description                            |
| ------------------- | ---------------------------------------------------- | -------------------------------------- |
| `confirmedAtHeight` | `number`                                             | Block height the tx was confirmed.     |
| `createdAtTime`     | `number`                                             | The timestamp when the tx was created. |
| `toPuzzleHash`      | `string`                                             | The destination puzzle hash.           |
| `amount`            | `number`                                             | The amount sent in mojos.              |
| `feeAmount`         | `number`                                             | The transaction fee in mojos.          |
| `confirmed`         | `boolean`                                            | Whether the tx was confirmed.          |
| `sent`              | `number`                                             | Number of peers the tx was sent to.    |
| `sentTo`            | `string[]`                                           | The peers the tx has been sent to.     |
| `spendBundle`       | <code>[SpendBundle](#spendbundle) &#124; null</code> | The associated spend bundle.           |
| `additions`         | [`Coin[]`](#coin)                                    | Created coins in the block.            |
| `removals`          | [`Coin[]`](#coin)                                    | Spent coins in the block.              |
| `walletId`          | `number`                                             | The wallet id.                         |
| `toAddress`         | `string`                                             | The bech32m encoded `to_puzzle_hash`.  |
| `trade_id`          | <code>string &#124; null</code>                      |                                        |
| `type`              | [`TransactionType`](#transactiontype)                | The type of transaction.               |
| `name`              | `string`                                             | The transaction's id.                  |
| `memos`             | [`Memo[]`](#memo)                                    | The memos associated with the tx.      |

### SpendBundle

| Parameter             | Type                        | Description                                |
| --------------------- | --------------------------- | ------------------------------------------ |
| `coinSpends`          | [`CoinSpend[]`](#coinspend) | The coin spends.                           |
| `aggregatedSignature` | `string`                    | The G2Element of the aggregated signature. |

### CoinSpend

| Parameter      | Type            | Description                                      |
| -------------- | --------------- | ------------------------------------------------ |
| `coin`         | [`Coin`](#coin) | The coin that is being spent.                    |
| `puzzleReveal` | `string`        | The puzzle reveal in serialized CLVM hex format. |
| `solution`     | `string`        | The solution in serialized CLVM hex format.      |

### Coin

| Parameter      | Type     | Description          |
| -------------- | -------- | -------------------- |
| `parentCoinId` | `string` | The parent coin id.  |
| `puzzleHash`   | `string` | The puzzle hash.     |
| `amount`       | `number` | The amount in mojos. |

### WalletBalance

| Parameter                  | Type     | Description                               |
| -------------------------- | -------- | ----------------------------------------- |
| `confirmedWalletBalance`   | `number` | The confirmed balance.                    |
| `unconfirmedWalletBalance` | `number` | The unconfirmed balance.                  |
| `spendableBalance`         | `number` | The spendable balance.                    |
| `pendingChange`            | `number` | The pending change.                       |
| `maxSendAmount`            | `number` | The max amount that can be sent.          |
| `unspentCoinCount`         | `number` | The number of unspent coins.              |
| `pendingCoinRemovalCount`  | `number` | The number of coins that are being spent. |
| `walletId`                 | `number` | The wallet id.                            |
| `walletType`               | `number` | The type of wallet.                       |
