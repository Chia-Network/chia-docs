---
sidebar_label: Offers
title: Offer Commands
slug: /walletconnect-offers
---

## Commands

### `chia_getAllOffers`

Gets a list of offers, based on certain search criteria.

| Parameter                          | Type      | Description                      |
| ---------------------------------- | --------- | -------------------------------- |
| `start?` _(optional)_              | `number`  | Start index.                     |
| `end?` _(optional)_                | `number`  | End index.                       |
| `sortKey?` _(optional)_            | `string`  | Sort key.                        |
| `reverse?` _(optional)_            | `boolean` | Whether to reverse order.        |
| `includeMyOffers?` _(optional)_    | `boolean` | Whether to include own offers.   |
| `includeTakenOffers?` _(optional)_ | `number`  | Whether to include taken offers. |

#### Output Data

The output is an array of type [`TradeRecord[]`](#traderecord).

### `chia_getOffersCount`

Gets the number of owned offers, taken offers, and total offers.

#### Output Data

| Parameter          | Type      | Description             |
| ------------------ | --------- | ----------------------- |
| `myOffersCount`    | `number`  | Number of owned offers. |
| `takenOffersCount` | `number`  | Number of taken offers. |
| `total`            | `number`  | Total number of offers. |
| `success`          | `boolean` | Backend success status. |

### `chia_cancelOffer`

Cancels an offer either on-chain by spending the coins or off-chain by only removing it from the list.

| Parameter | Type      | Description                           |
| --------- | --------- | ------------------------------------- |
| `tradeId` | `string`  | Trade id.                             |
| `secure`  | `boolean` | Whether to cancel the offer on-chain. |
| `fee`     | `number`  | Transaction fee in mojos.             |

#### Output Data

| Parameter | Type      | Description             |
| --------- | --------- | ----------------------- |
| `success` | `boolean` | Backend success status. |

### `chia_checkOfferValidity`

Checks whether or not an offer is still valid.

| Parameter   | Type     | Description                 |
| ----------- | -------- | --------------------------- |
| `offerData` | `string` | Bech32m encoded offer data. |

#### Output Data

| Parameter | Type      | Description                 |
| --------- | --------- | --------------------------- |
| `id`      | `string`  | Trade id.                   |
| `valid`   | `boolean` | Whether the offer is valid. |

### `chia_takeOffer`

Accepts an offer and completes the transaction.

| Parameter | Type     | Description                 |
| --------- | -------- | --------------------------- |
| `offer`   | `string` | Bech32m encoded offer data. |
| `fee`     | `number` | Transaction fee in mojos.   |

#### Output Data

| Parameter     | Type                          | Description             |
| ------------- | ----------------------------- | ----------------------- |
| `tradeRecord` | [`TradeRecord`](#traderecord) | Trade record.           |
| `success`     | `boolean`                     | Backend success status. |

### `chia_getOfferSummary`

Gets the summary object of an offer.

| Parameter   | Type     | Description                 |
| ----------- | -------- | --------------------------- |
| `offerData` | `string` | Bech32m encoded offer data. |

#### Output Data

| Parameter | Type                            | Description             |
| --------- | ------------------------------- | ----------------------- |
| `id`      | `string`                        | Trade id.               |
| `summary` | [`TradeSummary`](#tradesummary) | Trade summary.          |
| `success` | `boolean`                       | Backend success status. |

### `chia_getOfferData`

Gets the data of an offer.

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| `offerId` | `string` | Trade id.   |

#### Output Data

| Parameter     | Type                          | Description                 |
| ------------- | ----------------------------- | --------------------------- |
| `offer`       | `string`                      | Bech32m encoded offer data. |
| `tradeRecord` | [`TradeRecord`](#traderecord) | Trade record.               |
| `success`     | `boolean`                     | Backend success status.     |

### `chia_getOfferRecord`

Gets the trade record of an offer.

| Parameter | Type     | Description |
| --------- | -------- | ----------- |
| `offerId` | `string` | Trade id.   |

#### Output Data

| Parameter     | Type                          | Description                                                     |
| ------------- | ----------------------------- | --------------------------------------------------------------- |
| `offer`       | `null`                        | Use [`chia_getOfferData`](#chia_getofferdata) if you need this. |
| `tradeRecord` | [`TradeRecord`](#traderecord) | Trade record.                                                   |
| `success`     | `boolean`                     | Backend success status.                                         |

### `chia_createOfferForIds`

Creates an offer for wallet ids.

| Parameter                             | Type      | Description                         |
| ------------------------------------- | --------- | ----------------------------------- |
| `offer`                               | `any`     | Offered asset amounts.              |
| `driverDict`                          | `any`     | Driver dict object.                 |
| `validateOnly?` _(optional)_          | `boolean` | Whether to only validate the offer. |
| `disableJSONFormatting?` _(optional)_ | `boolean` | Whether to disable JSON formatting. |

#### Output Data

| Parameter     | Type                          | Description                 |
| ------------- | ----------------------------- | --------------------------- |
| `offer`       | `string`                      | Bech32m encoded offer data. |
| `tradeRecord` | [`TradeRecord`](#traderecord) | Trade record.               |

## Types

### TradeRecord

| Parameter          | Type                                     | Description                                  |
| ------------------ | ---------------------------------------- | -------------------------------------------- |
| `acceptedAtTime`   | <code>number &#124; null</code>          | Timestamp when the trade was accepted.       |
| `coinsOfInterest`  | [`Coin[]`](/walletconnect-commands#coin) | Coins involved in trade.                     |
| `confirmedAtIndex` | `number`                                 | Confirmation block index.                    |
| `createdAtTime`    | `number`                                 | Timestamp when the trade was created.        |
| `isMyOffer`        | `boolean`                                | Whether this is the wallet's own offer.      |
| `pending`          | `Record<string, number>`                 | Pending amounts.                             |
| `sent`             | `number`                                 | Number of peers the transaction was sent to. |
| `sentTo`           | [`Peer[]`](/walletconnect-commands#peer) | Peers the transaction was sent to.           |
| `status`           | [`TradeStatus`](#tradestatus)            | Trade status.                                |
| `summary`          | `any`                                    | Trade summary metadata.                      |
| `takenOffer`       | <code>string &#124; null</code>          | Taken bech32m encoded offer data.            |
| `tradeId`          | `string`                                 | Trade id.                                    |
| `_offerData`       | `string`                                 | Bech32m encoded offer data.                  |

### TradeStatus

| Value             |
| ----------------- |
| `PENDING_ACCEPT`  |
| `PENDING_CONFIRM` |
| `PENDING_CANCEL`  |
| `CANCELLED`       |
| `CONFIRMED`       |
| `FAILED`          |
