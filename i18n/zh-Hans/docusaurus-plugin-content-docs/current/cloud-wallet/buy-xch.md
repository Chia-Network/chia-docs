---
title: Buy XCH
slug: /cloud-wallet/buy-xch
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide will show you how to purchase XCH directly within the Chia Cloud Wallet using ACH bank transfers via Stripe.

:::info

Before you can buy XCH, you'll need to have a Cloud Wallet account and at least one vault. If you haven't created a vault yet, please follow the [Getting Started Guide](/cloud-wallet/getting-started) first.

:::

## 先决条件

- An active [Chia Cloud Wallet](https://vault.chia.net/) account with at least one vault
- A US bank account for ACH transfers

## Purchase Limits

- **Minimum purchase**: \$25 USD

## Buying XCH

1. Log in to your [Chia Cloud Wallet](https://vault.chia.net/) account.

2. Navigate to the `Buy XCH` screen from the left-hand menu:

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/buy-xch-01_navigation_light.png" alt="Navigate to Buy XCH screen" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/buy-xch-01_navigation_dark.png" alt="Navigate to Buy XCH screen" width="100%" className="theme-image-dark"/>
</div>

3. Enter the amount you want to purchase in USD. The minimum is within the purchase limits, then click `Next`:

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/buy-xch-02_enter_amount_light.png" alt="Enter purchase amount" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/buy-xch-02_enter_amount_dark.png" alt="Enter purchase amount" width="100%" className="theme-image-dark"/>
</div>

4. Select a saved bank account, or add a new one:
   - **Saved accounts**: If you have previously saved bank accounts, they will appear in a list for you to choose from
   - **Add new account**: Click the "US bank account" option to add a new bank account

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/buy-xch-03_select_bank_light.png" alt="Select or add bank account" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/buy-xch-03_select_bank_dark.png" alt="Select or add bank account" width="100%" className="theme-image-dark"/>
</div>

5. If you're adding a new bank account, follow the Stripe popup prompts to provide your bank account information and complete the setup:

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/buy-xch-04_stripe_add_bank_light.png" alt="Stripe popup to add bank account" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/buy-xch-04_stripe_add_bank_dark.png" alt="Stripe popup to add bank account" width="100%" className="theme-image-dark"/>
</div>

6. Review the transaction details, including the amount of XCH you'll receive, the bank account to be used, and any applicable fees. Click `Next` to continue:

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/buy-xch-05_review_light.png" alt="Review transaction details" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/buy-xch-05_review_dark.png" alt="Review transaction details" width="100%" className="theme-image-dark"/>
</div>

7. Review the confirmation screen and click `Next`. This completes the order. The order details will appear in the order list on the right side of the screen:

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/buy-xch-06_confirmation_light.png" alt="Order confirmation" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/buy-xch-06_confirmation_dark.png" alt="Order confirmation" width="100%" className="theme-image-dark"/>
</div>

Once your payment is processed, the XCH will be deposited into your vault. ACH transfers are processed through Stripe and typically completes within 7 business days.

## Troubleshooting

If you encounter any issues while buying XCH:

- Ensure your vault has been fully created and an address is available
- Verify your purchase amount is within the purchase limits
- Check that your bank account information is correct in Stripe
- Ensure your bank account has sufficient funds
- For additional support, visit the #support channel in [our Discord](https://discord.gg/chia)
