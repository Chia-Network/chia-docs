---
sidebar_label: General
title: General Commands
slug: /walletconnect-commands
---

[WalletConnect](https://walletconnect.com) is a communications protocol that allows decentralized applications (dApps) and wallets to securely interact with each other. Chia supports WalletConnect and exposes various RPCs for requesting wallet actions from a web application.

## Getting Started

You can install our [example WalletConnect dApp](https://github.com/Chia-Network/chia-wallet-connect-dapp-test) and run it in your browser to test out WalletConnect. The code can be adapted for use in your own React applications.

## Commands

### `chia_logIn`

Logs in to a wallet key (account), as identified by its fingerprint.

| Parameter     | Type     | Description         |
| ------------- | -------- | ------------------- |
| `fingerprint` | `number` | Wallet fingerprint. |

#### Output Data

| Parameter     | Type      | Description             |
| ------------- | --------- | ----------------------- |
| `fingerprint` | `number`  | Wallet fingerprint.     |
| `success`     | `boolean` | Backend success status. |

### `chia_getPublicKey`

Gets the wallet's master public key.

| Parameter     | Type     | Description         |
| ------------- | -------- | ------------------- |
| `fingerprint` | `number` | Wallet fingerprint. |

#### Output Data

| Parameter     | Type      | Description                    |
| ------------- | --------- | ------------------------------ |
| `pubkey`      | `string`  | Hex encoded master public key. |

### `chia_getWallets`

Gets a list of wallet ids associated with the current account.

| Parameter     | Type      | Description                  |
| ------------- | --------- | ---------------------------- |
| `includeData` | `boolean` | Whether to include metadata. |

#### Output Data

The output is a value of type <code>[WalletInfo](#walletinfo)[]</code>.

### `chia_getTransaction`

Gets a transaction record by its id.

| Parameter       | Type     | Description     |
| --------------- | -------- | --------------- |
| `transactionId` | `string` | Transaction id. |

#### Output Data

The output is a value of type [`TransactionRecord`](#transactionrecord).

### `chia_getWalletBalance`

Gets the various wallet balances for a given wallet id, as shown in the GUI.

| Parameter                | Type     | Description                      |
| ------------------------ | -------- | -------------------------------- |
| `walletId?` _(optional)_ | `number` | Wallet id to get the balance of. |

#### Output Data

The output is a value of type [`WalletBalance`](#walletbalance).

### `chia_getCurrentAddress`

Gets the address of the current derivation index.

| Parameter                | Type     | Description                      |
| ------------------------ | -------- | -------------------------------- |
| `walletId?` _(optional)_ | `number` | Wallet id to get the address of. |

#### Output Data

The output is a bech32m encoded address of type `string`.

### `chia_getNextAddress`

Gets the address of the next derivation index.

| Parameter                  | Type      | Description                           |
| -------------------------- | --------- | ------------------------------------- |
| `walletId?` _(optional)_   | `number`  | Wallet id to get the address of.      |
| `newAddress?` _(optional)_ | `boolean` | Whether to increase derivation index. |

#### Output Data

The output is a bech32m encoded address of type `string`.

### `chia_sendTransaction`

Sends an amount of mojos in a given wallet to a recipient address.

| Parameter                           | Type       | Description                               |
| ----------------------------------- | ---------- | ----------------------------------------- |
| `amount`                            | `number`   | Amount in mojos.                          |
| `fee`                               | `number`   | Transaction fee in mojos.                 |
| `address`                           | `string`   | Bech32m encoded recipient address.        |
| `walletId?` _(optional)_            | `number`   | Wallet id to use coins from.              |
| `waitForConfirmation?` _(optional)_ | `boolean`  | Whether to wait for inclusion in a block. |
| `memos?` _(optional)_               | `string[]` | A list of coin memos (such as hint).      |

#### Output Data

| Parameter       | Type                                      | Description             |
| --------------- | ----------------------------------------- | ----------------------- |
| `transaction`   | [`TransactionRecord`](#transactionrecord) | Transaction record.     |
| `transactionId` | `string`                                  | Transaction id.         |
| `success`       | `boolean`                                 | Backend success status. |

### `chia_signMessageById`

Signs a message with the private key of a given DID.

:::note
In order to ensure the message being signed isn't a transaction, the message is the tree hash of `"Chia Signed Message"` and the raw message. You can learn more about this in [CHIP-0002, the dApp protocol](https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0002.md#signmessage).
:::

---

| Parameter | Type     | Description                              |
| --------- | -------- | ---------------------------------------- |
| `message` | `string` | Message to sign.                         |
| `id`      | `string` | DID to sign the message with the key of. |

#### Output Data

| Parameter      | Type      | Description                      |
| -------------- | --------- | -------------------------------- |
| `latestCoinId` | `string`  | Latest DID singleton coin id.    |
| `pubkey`       | `string`  | Hex encoded DID public key.      |
| `signature`    | `string`  | Hex encoded BLS12-381 signature. |
| `signingMode`  | `string`  | Signing mode used.               |
| `success`      | `boolean` | Backend success status.          |

### `chia_signMessageByAddress`

Signs a message with the private key of a given address.

:::note
In order to ensure the message being signed isn't a transaction, the message is the tree hash of `"Chia Signed Message"` and the raw message. You can learn more about this in [CHIP-0002, the dApp protocol](https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0002.md#signmessage).
:::

---

| Parameter | Type     | Description                                  |
| --------- | -------- | -------------------------------------------- |
| `message` | `string` | Message to sign.                             |
| `address` | `string` | Address to sign the message with the key of. |

#### Output Data

| Parameter     | Type      | Description                      |
| ------------- | --------- | -------------------------------- |
| `pubkey`      | `string`  | Hex encoded address public key.  |
| `signature`   | `string`  | Hex encoded BLS12-381 signature. |
| `signingMode` | `string`  | Signing mode used.               |
| `success`     | `boolean` | Backend success status.          |

### `chia_verifySignature`

Verifies a signature over a message from a given public key.

| Parameter                   | Type     | Description                      |
| --------------------------- | -------- | -------------------------------- |
| `message`                   | `string` | Message to verify.               |
| `pubkey`                    | `string` | Hex encoded public key.          |
| `signature`                 | `string` | Hex encoded BLS12-381 signature. |
| `address?` _(optional)_     | `string` | Address used for signing.        |
| `signingMode?` _(optional)_ | `string` | Signing mode used.               |

#### Output Data

| Parameter | Type      | Description                     |
| --------- | --------- | ------------------------------- |
| `isValid` | `boolean` | Whether the signature is valid. |
| `success` | `boolean` | Backend success status.         |

### `chia_getSyncStatus`

Gets the current sync status of the wallet.

#### Output Data

| Parameter            | Type      | Description                              |
| -------------------- | --------- | ---------------------------------------- |
| `genesisInitialized` | `boolean` | Whether the genesis is initialized.      |
| `synced`             | `boolean` | Whether the wallet is fully synced.      |
| `syncing`            | `boolean` | Whether the wallet is currently syncing. |
| `success`            | `boolean` | Backend success status.                  |

## Types

### WalletInfo

| Parameter | Type                        | Description                              |
| --------- | --------------------------- | ---------------------------------------- |
| `id`      | `number`                    | The wallet id.                           |
| `name`    | `string`                    | The name of the wallet.                  |
| `type`    | [`WalletType`](#wallettype) | The type of the wallet.                  |
| `data`    | `any`                       | Extra info (unused for standard wallet). |
| `meta`    | `any`                       | Metadata specific to each wallet type.   |

#### CAT Metadata

| Parameter | Type     | Description   |
| --------- | -------- | ------------- |
| `assetId` | `string` | Asset id.     |
| `name`    | `string` | Display name. |

#### NFT Metadata

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| `did`     | `string` | Owner DID.  |

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

### TransactionRecord

| Parameter           | Type                                                 | Description                            |
| ------------------- | ---------------------------------------------------- | -------------------------------------- |
| `confirmedAtHeight` | `number`                                             | Block height the tx was confirmed.     |
| `createdAtTime`     | `number`                                             | The timestamp when the tx was created. |
| `toPuzzleHash`      | `string`                                             | The destination puzzle hash.           |
| `amount`            | `number`                                             | The amount sent in mojos.              |
| `feeAmount`         | `number`                                             | The transaction fee in mojos.          |
| `confirmed`         | `boolean`                                            | Whether the tx was confirmed.          |
| `sent`              | `number`                                             | Number of peers the tx was sent to.    |
| `sentTo`            | [`Peer[]`](#peer)                                    | The peers the tx has been sent to.     |
| `spendBundle`       | <code>[SpendBundle](#spendbundle) &#124; null</code> | The associated spend bundle.           |
| `additions`         | [`Coin[]`](#coin)                                    | Created coins in the block.            |
| `removals`          | [`Coin[]`](#coin)                                    | Spent coins in the block.              |
| `walletId`          | `number`                                             | The wallet id.                         |
| `toAddress`         | `string`                                             | The bech32m encoded `to_puzzle_hash`.  |
| `trade_id`          | <code>string &#124; null</code>                      |                                        |
| `type`              | [`TransactionType`](#transactiontype)                | The type of transaction.               |
| `name`              | `string`                                             | The transaction's id.                  |
| `memos`             | [`Memo[]`](#memo)                                    | The memos associated with the tx.      |

### TransactionType

| Name               | Value |
| ------------------ | ----- |
| `Incoming`         | 0     |
| `Outgoing`         | 1     |
| `CoinbaseReward`   | 2     |
| `FeeReward`        | 3     |
| `IncomingTrade`    | 4     |
| `OutgoingTrade`    | 5     |

### Peer

:::note
This is a tuple with the following parameters.
:::

---

| Parameter                    | Type                                  | Description                |
| ---------------------------- | ------------------------------------- | -------------------------- |
| `peerId` _(item 1)_          | `string`                              | Peer id.                   |
| `inclusionStatus` _(item 2)_ | [`InclusionStatus`](#inclusionStatus) | Inclusion status.          |
| `errorMessage` _(item 3)_    | <code>string &#124; null</code>       | Error message, if present. |

### InclusionStatus

| Name      | Value |
| --------- | ----- |
| `SUCCESS` | 1     |
| `PENDING` | 2     |
| `FAILED`  | 3     |

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
