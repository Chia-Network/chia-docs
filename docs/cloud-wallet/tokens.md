---
title: Tokens
slug: /cloud-wallet/tokens
---

This guide shows how to view and send Chia Asset Tokens (CATs) in the Chia Cloud Wallet, how to create (mint) your own tokens, and how to set a custom display name and ticker.

:::info

You need a Cloud Wallet account and at least one vault. If you have not created a vault yet, follow the [Getting Started Guide](/cloud-wallet/getting-started) first.

:::

## Prerequisites

- An active [Chia Cloud Wallet](https://vault.chia.net/) account with at least one vault
- Access to your vault spend key (Chia Signer app or passkey) to sign token send, mint, and melt transactions
- To create tokens, XCH in the vault you mint from (see [Create a token](#create-a-token))

## View tokens in a vault

1. Log in to your [Chia Cloud Wallet](https://vault.chia.net/) account and open the vault.

2. Select the `Tokens` tab:

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/tokens-01_vault_tab_light.png" alt="Vault Tokens tab listing CAT balances" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/tokens-01_vault_tab_dark.png" alt="Vault Tokens tab listing CAT balances" width="100%" className="theme-image-dark"/>
</div>

3. Click a token row to open its asset page. The page shows the balance, the vault address, and recent transactions for that token.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/tokens-02_asset_light.png" alt="Token asset page with balance, address, and transactions" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/tokens-02_asset_dark.png" alt="Token asset page with balance, address, and transactions" width="100%" className="theme-image-dark"/>
</div>

If the vault has not received any tokens yet, the tab shows `No tokens yet`. Tokens appear after they arrive in the vault.

## Send a token

1. From the token asset page, click `Send CAT`.

2. Under `Send To`, enter or paste the destination `Address`, pick a saved contact, or use `Scan QR Code`. Addresses start with `xch` on mainnet.

3. Under `Amount to send`, enter the `Amount` and an optional `Fee`.

4. Optionally add a `Memo`.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/tokens-03_send_light.png" alt="Send CAT form with address, amount, and fee" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/tokens-03_send_dark.png" alt="Send CAT form with address, amount, and fee" width="100%" className="theme-image-dark"/>
</div>

5. Click `Send`. Review the `Confirm Transaction` dialog (`Sign and Send` for a passkey, or approve the request in the Chia Signer app).

The fee is paid in XCH. Check `Spendable balance` on the send form before you submit.

If the vault is still being minted, the send form shows `This vault is currently being minted. You cannot perform transactions until the minting process is complete.`

## Create a token

You can create (mint) your own CAT from any of your vaults. Tokens you create are listed on the `Tokens` page in the sidebar. This page is separate from a vault's `Tokens` tab, which lists every CAT the vault holds.

Every CAT is backed by XCH. Each token you mint uses 1,000 mojos (0.000000001 XCH) from the vault, so 1,000,000 tokens uses 0.001 XCH. The XCH equivalent shows under `Amount` as you type. The vault must have enough spendable XCH for the amount plus the fee.

1. Click `Tokens` in the sidebar (on mobile, open the menu and select `Tokens`).

2. Click `Create` if you have not created a token yet, or `Add Token` if you have.

3. Fill in the form:
   - `Vault`: the vault to mint the token from. This vault becomes the token's minting vault and receives the new tokens.
   - `Name`: 2 to 32 characters
   - `Symbol`: 1 to 10 characters
   - `Type`: `Single Issuance` or `Multi Issuance` (see [Issuance types](#issuance-types))
   - `Revocable`: shown only for `Multi Issuance`, and on by default. If enabled, tokens can be revoked by the issuer at any time.
   - `Amount`: the number of tokens to mint
   - `Fee`: an optional network fee in XCH. `Spendable balance` shows the XCH available in the selected vault.

4. Click `Issue Token`, then approve the transaction with your passkey or in the Chia Signer app.

The new token appears on the `Tokens` page. After the transaction confirms, the tokens appear on the minting vault's `Tokens` tab and you can send them like any other CAT.

### Issuance types

| Type              | Supply                                                | Revocable             |
| ----------------- | ----------------------------------------------------- | --------------------- |
| `Single Issuance` | Fixed. You cannot mint more after the first issuance. | No                    |
| `Multi Issuance`  | You can mint more later from the same vault.          | Optional, set at mint |

You cannot change the type or the `Revocable` setting after the token is created.

### View a token you created

Click a token on the `Tokens` page to open its details. The page shows the `Asset ID`, `Minting Vault`, `Symbol`, `Issuance Type`, `Revocable?`, `Total Issued`, `Total Melted`, `Total Supply`, and `Balance Held` (tokens the minting vault still holds).

Share the `Asset ID` with anyone who wants to add your token to their wallet.

### Issue more tokens

For a `Multi Issuance` token, you can mint more at any time:

1. Open the token from the `Tokens` page and click `Issue More` (or choose `Issue More` from the token card's menu).

2. `Minted From`, `Name`, `Symbol`, and `Type` are filled in and cannot be changed. Enter the `Amount` and an optional `Fee`.

3. Click `Issue More`, then approve the transaction.

### Melt tokens

Melting destroys tokens and returns the XCH that backs them to the minting vault. You can melt tokens of a revocable token that the minting vault still holds.

1. Open the token from the `Tokens` page and click `Melt`.

2. In the `Melt Tokens` dialog, enter the `Amount to melt` and an optional `Fee`. The XCH you get back shows under the amount.

3. Click `Melt Tokens`, then approve the transaction.

The minting vault needs some XCH to melt tokens, even if you do not pay a fee.

### Plan limits

Your plan sets how many tokens you can create. The free plan allows up to 50 tokens. This counts every token you have created from your vaults. Issuing more of an existing token or melting tokens does not change the count. When you reach the limit, `Add Token` is disabled and shows `Upgrade your plan to create more tokens`.

## Custom name and ticker

You can set a display name and ticker (token symbol) for a CAT you hold. This only changes how the token appears in your Cloud Wallet. It does not change the token on the blockchain.

1. Open `Settings`, then open the `Tokens` tab.

2. Click `Add Token Details` (or `Add a token's details` if you have not added any yet).

3. Fill in:
   - `Display Name` (2 to 32 characters)
   - `Token Symbol` (1 to 10 characters)
   - `Asset ID` (exactly 64 characters). You can select a token you already hold, or paste an asset id.

   The form also includes `Display Image`. Image uploads are temporarily disabled. You can still save a display name and ticker without an image.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/tokens-04_add_details_light.png" alt="Add Token Details form with display name, token symbol, and asset id" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/tokens-04_add_details_dark.png" alt="Add Token Details form with display name, token symbol, and asset id" width="100%" className="theme-image-dark"/>
</div>

4. Click `Add Token Details`.

To change labels later, open the token from Settings → `Tokens` or click `Edit` on the token asset page, update `Display Name` and `Token Symbol`, then click `Update Token Details`. `Asset ID` is read-only when you edit an existing entry.

## Troubleshooting

- If a token does not appear on the `Tokens` tab, confirm it was sent to this vault's address and wait for the transaction to confirm
- If the vault is still being minted, wait until this clears: `This vault is currently being minted. You cannot perform transactions until the minting process is complete.`
- For send failures, check the token spendable balance and that the vault has enough XCH for the fee
- If `Issue Token` shows `Amount + fee exceeds available balance`, add XCH to the selected vault or mint fewer tokens. Each token uses 1,000 mojos of XCH
- If a token card on the `Tokens` page shows `Unsigned`, the mint was not signed. Open the card's menu and choose `Sign & Submit`, or `Cancel` to discard it
- If a token card shows `Failed to Mint`, the mint did not complete. Open the card's menu and choose `Remove`, then create the token again
- If `Issue More` or `Melt` is missing, check the token's `Issuance Type` and `Revocable?` values. Only `Multi Issuance` tokens can issue more, and only revocable tokens with a `Balance Held` can be melted
- For signing problems, confirm your Chia Signer app or passkey can approve the send request
- For additional support, use [In App Support](/cloud-wallet/in-app-support)
