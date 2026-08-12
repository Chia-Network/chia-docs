---
title: Coin Management
slug: /cloud-wallet/coin-management
---

This guide shows how to view, split, and combine coins in a Chia Cloud Wallet vault.

:::info

You need a Cloud Wallet account and at least one vault. If you have not created a vault yet, follow the [Getting Started Guide](/cloud-wallet/getting-started) first.

Coin Management may not be available on every plan. If you do not see `Manage Coins`, your account does not have this feature enabled.

:::

## Prerequisites

- An active [Chia Cloud Wallet](https://vault.chia.net/) account with at least one vault that holds XCH or tokens
- Access to your vault spend key (Chia Signer app or passkey) to sign split and combine transactions

## Open Manage Coins

You can open Coin Management from a vault or from a specific token.

### From a vault (XCH)

1. Log in to your [Chia Cloud Wallet](https://vault.chia.net/) account and open the vault.

2. Open the vault `More` menu and click `Manage Coins`:

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/coin-management-01_menu_light.png" alt="Open Manage Coins from the vault More menu" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/coin-management-01_menu_dark.png" alt="Open Manage Coins from the vault More menu" width="100%" className="theme-image-dark"/>
</div>

### From a token

1. Open the vault, go to the `Tokens` tab, and open the token.

2. Click `Manage Coins` on the token page.

The token coins screen uses the same split and combine flows, with labels such as `Split Tokens` and `Combine Tokens` where applicable.

## Read the coins list

The coins screen shows your balance and a table of coins for that asset.

- Total balance and `Spendable` balance appear at the top. Spendable can be lower than total when some coins are locked by pending transactions.
- Use `Include Pending` or `Include Spent` to show those coins. They are visible for inspection but are not selectable for split or combine.
- Selectable coins are settled and unlocked. Coins linked to an open offer may show a marker that the coin is linked to an open offer.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/coin-management-02_list_light.png" alt="Manage Coins list with balances and coin rows" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/coin-management-02_list_dark.png" alt="Manage Coins list with balances and coin rows" width="100%" className="theme-image-dark"/>
</div>

Common columns include coin id, amount, created block height, and spent height when spent coins are included.

## Split coins

Split turns one or more selected coins into smaller coins. This is useful before creating Offers or when you want smaller denominations.

1. Select one or more selectable coins. Each selected coin must have an amount greater than the minimum unit for that asset.

2. Click `Split Coins` (or `Split Tokens` on a token screen).

3. Review the selected coins and set a `Fee` if needed.

4. Choose how to split:
   - Leave `Split by Coin Value` off to set `Number of Coins to Create` (2 to 500)
   - Turn `Split by Coin Value` on to set `Value of Each New Coin`

5. Review `Output Coins` (and any remainder), then click `Submit`.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/coin-management-03_split_light.png" alt="Split Coins modal with fee and output preview" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/coin-management-03_split_dark.png" alt="Split Coins modal with fee and output preview" width="100%" className="theme-image-dark"/>
</div>

6. Confirm and sign the signature request. The modal closes after the request is created; finish signing with your passkey or Chia Signer app.

For XCH, the fee comes from the selected coins. For tokens, the fee is paid in XCH and does not reduce the token output amounts.

## Combine coins

Combine merges two or more selected coins into one.

1. Select at least two selectable coins of the same asset.

2. Click `Combine Coins` (or `Combine Tokens`).

3. Review the selected coins, set a `Fee` if needed, and confirm the `Output Coin Value`.

4. Click `Combine`.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/coin-management-04_combine_light.png" alt="Combine Coins modal with selected coins and output value" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/coin-management-04_combine_dark.png" alt="Combine Coins modal with selected coins and output value" width="100%" className="theme-image-dark"/>
</div>

5. Confirm and sign the signature request.

If you select too many coins for a single combine, reduce the selection and combine in batches. If the fee would make the output amount zero or negative, lower the fee.

## Related actions

The coins screen may also offer `Sweep Coins` or `Sweep Tokens`, which gathers small coins under a maximum amount. Sweep also requires a signature.

## Troubleshooting

- Confirm `Manage Coins` appears on the vault `More` menu or token page for your account
- Only settled, unlocked coins can be selected for split or combine
- If spendable balance looks low, check for pending transactions or coins reserved by open Offers
- For signing problems, confirm your Signer app or passkey can approve the split or combine request
- For additional support, use [In App Support](/cloud-wallet/in-app-support)
