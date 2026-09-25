---
title: XCHandles
slug: /cloud-wallet/xch-handles
---

This guide shows how to send XCH or tokens to an XCHandle (`@handle`) in the Chia Cloud Wallet, and how handles appear on outbound transactions.

:::info

You need a Cloud Wallet account and at least one vault. If you have not created a vault yet, follow the [Getting Started Guide](/cloud-wallet/getting-started) first.

XCHandles are human-readable names that resolve to Chia addresses. Learn more at [xchandles.com](https://xchandles.com/).

:::

## Prerequisites

- An active [Chia Cloud Wallet](https://vault.chia.net/) account with at least one vault
- A valid XCHandle for the recipient (or their wallet address if they do not have one)
- Access to your vault spend key to sign the send

## Send to an XCHandle

1. Log in to your [Chia Cloud Wallet](https://vault.chia.net/) account.

2. Open Send for XCH or a token from the vault that holds the asset.

3. In `Send to` / `Recipient`, enter an XCHandle starting with `@`, for example `@alice`.

   - Handles use lowercase letters and digits only, 3–63 characters after `@`
   - You can still paste a normal address (`xch1...` on mainnet, `txch1...` on testnet)
   - The field hint notes that wallet addresses start with the network prefix and XCHandles start with `@`

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/xch-handles-01_send_to_light.png" alt="Send To field accepting an XCHandle" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/xch-handles-01_send_to_dark.png" alt="Send To field accepting an XCHandle" width="100%" className="theme-image-dark"/>
</div>

4. Wait for lookup to finish. The Cloud Wallet resolves the handle and shows one of:

   - `Looking up XCHandle...`
   - `Resolved to` followed by the address
   - `We couldn't find this XCHandle. Check the spelling and try again.`
   - `This XCHandle has expired. Use a wallet address instead.`
   - `We couldn't look up this XCHandle. Try again or use a wallet address.`

5. Complete amount, fee, and any other send options, then click `Send` and sign.

`Send` stays disabled for an `@` recipient until the handle resolves successfully. QR scan still expects a wallet address, not a handle.

## How handles appear after you send

On outbound transfers, when a handle was used:

- Activity list rows can show `@{handle}` instead of only the address
- Transaction detail can show `@{handle}` above the underlying address
- The signature request can show the handle above the recipient address

Inbound transfers do not display an XCHandle for the counterparty in that same way; you still see the address.

## Address Book and handles

Address Book stores emails and Chia addresses for contacts. You can still type an XCHandle directly in `Send To` without saving it as a contact. For contact-based sends, see [Address Book](/cloud-wallet/address-book).

## Troubleshooting

- Use `@` plus 3–63 lowercase letters or digits (no spaces or symbols)
- If lookup fails, check spelling, try again, or paste the wallet address instead
- Expired handles cannot be used for send; use an address
- The resolved address must match your network (`xch` on mainnet, `txch` on testnet)
- For additional support, use [In App Support](/cloud-wallet/in-app-support)
