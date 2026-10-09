---
title: Tokens
slug: /cloud-wallet/tokens
---

This guide shows how to view and send Chia Asset Tokens (CATs) in the Chia Cloud Wallet, and how to set a custom display name and ticker.

:::info

You need a Cloud Wallet account and at least one vault. If you have not created a vault yet, follow the [Getting Started Guide](/cloud-wallet/getting-started) first.

:::

## Prerequisites

- An active [Chia Cloud Wallet](https://vault.chia.net/) account with at least one vault
- Access to your vault spend key (Chia Signer app or passkey) to sign token send transactions

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
- For signing problems, confirm your Chia Signer app or passkey can approve the send request
- For additional support, use [In App Support](/cloud-wallet/in-app-support)
