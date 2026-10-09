---
title: Coin Management
slug: /cloud-wallet/coin-management
---

This guide shows how to view, split, combine, and sweep coins in a Chia Cloud Wallet vault.

:::info

You need a Cloud Wallet account and at least one vault. If you have not created a vault yet, follow the [Getting Started Guide](/cloud-wallet/getting-started) first.

:::

## Prerequisites

- An active [Chia Cloud Wallet](https://vault.chia.net/) account with at least one vault that holds XCH or tokens
- Access to your vault spend key (Chia Signer app or passkey) to sign split, combine, and sweep transactions

## Open Manage Coins

You can open Coin Management from a vault or from a specific token.

### From a vault (XCH)

1. Log in to your [Chia Cloud Wallet](https://vault.chia.net/) account and open the vault.

2. Open the vault `More` menu and click `Manage Coins`:

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/coin-management-01_menu_light.png" alt="Open Manage Coins from the vault More menu" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/coin-management-01_menu_dark.png" alt="Open Manage Coins from the vault More menu" width="100%" className="theme-image-dark"/>
</div>

The XCH coins screen is titled `Manage Coins`.

### From a token

1. Open the vault, go to the `Tokens` tab, and open the token.

2. Click `Manage Coins` on the token page.

The token coins screen is titled `Manage Tokens` and uses the same split, combine, and sweep flows, with labels such as `Split Tokens` and `Combine Tokens` where applicable.

## Read the coins list

The coins screen shows your balance and a table of coins for that asset.

- Total balance and `Spendable` balance appear at the top. Spendable can be lower than total when some coins are locked by pending transactions or reserved by open offers.
- By default the list shows settled, unspent coins you can act on. Two toggles add more rows for inspection only:
  - `Include Pending` — coins tied to transactions that are not fully settled yet (for example still confirming). Useful when spendable balance looks lower than you expect and you want to see what is locked.
  - `Include Spent` — coins that have already been spent. Useful for history and for matching amounts to past transactions.
    Pending and spent coins appear in the list when enabled, but they are not selectable for split or combine.
- Selectable coins are settled and unlocked. Coins linked to an open offer may show a marker that the coin is linked to an open offer.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/coin-management-02_list_light.png" alt="Manage Coins list with balances and coin rows" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/coin-management-02_list_dark.png" alt="Manage Coins list with balances and coin rows" width="100%" className="theme-image-dark"/>
</div>

Common columns include coin id (`Coin` or `Token`), `Amount`, `Created` (block height), and `Spent` when spent coins are included.

## Split coins

Split turns one or more selected coins into smaller coins. This is useful when you want smaller denominations.

1. Select one or more selectable coins. Each selected coin must have an amount greater than the minimum unit for that asset.

2. Click `Split Coins` (or `Split Tokens` on a token screen).

3. Review the selected coins and set a `Fee` if needed.

4. Choose how to split:
   - Leave `Split by Coin Value` (or `Split by Token Value`) off to set `Number of Coins to Create` (2 to 500)
   - Turn `Split by Coin Value` (or `Split by Token Value`) on to set `Value of Each New Coin` (or `Value of Each New Token`)

5. Review `Output Coins` (or `Output Tokens`) and any remainder, then click `Submit`.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/coin-management-03_split_light.png" alt="Split Coins modal with fee and output preview" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/coin-management-03_split_dark.png" alt="Split Coins modal with fee and output preview" width="100%" className="theme-image-dark"/>
</div>

6. Confirm the `Split Coins` signature request (`Sign and Send` for a passkey, or approve the request in the Chia Signer app).

For XCH, the fee comes from the selected coins. For tokens, the fee is paid in XCH and does not reduce the token output amounts.

## Combine coins

Combine merges two or more selected coins into one.

1. Select at least two selectable coins of the same asset.

2. Click `Combine Coins` (or `Combine Tokens`).

3. Review the selected coins, set a `Fee` if needed, and confirm the `Output Coin Value` (or `Output Token Value`).

4. Click `Combine`.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/coin-management-04_combine_light.png" alt="Combine Coins modal with selected coins and output value" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/coin-management-04_combine_dark.png" alt="Combine Coins modal with selected coins and output value" width="100%" className="theme-image-dark"/>
</div>

5. Confirm the `Combine Coins` signature request (`Sign and Send` for a passkey, or approve the request in the Chia Signer app).

A single combine can include up to 500 XCH coins or 100 tokens. If you select too many, reduce the selection and combine in batches. If the fee would make the output amount zero or negative, lower the fee.

## Sweep coins

`Sweep Coins` (or `Sweep Tokens`) finds your smallest coins that are each worth no more than a maximum amount you set, then combines them. Use it to reduce wallet clutter. Sweep does not require a prior selection.

1. Click `Sweep Coins` (or `Sweep Tokens`).

2. Set `Maximum Coin Amount` (or `Maximum Token Amount`). Only coins at or below that amount are included.

3. Set `Maximum Number of Coins` (or `Maximum Number of Tokens`). The limit is 500 for XCH and 100 for tokens.

4. Set a `Fee` if needed, then click `Sweep`.

5. Confirm and sign (`Sign and Send` for a passkey, or approve the request in the Chia Signer app).

## Troubleshooting

- Only settled, unlocked coins can be selected for split or combine
- If spendable balance looks low, check for pending transactions or coins reserved by open offers
- If the vault is still being minted, wait until this clears: `This vault is currently being minted. You cannot perform transactions until the minting process is complete.`
- For signing problems, confirm your Chia Signer app or passkey can approve the split, combine, or sweep request
- For additional support, use [In App Support](/cloud-wallet/in-app-support)
