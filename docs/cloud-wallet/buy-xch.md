---
title: Buy XCH
slug: /cloud-wallet/buy-xch
---

Buying XCH takes a few minutes to set up the first time. After that, most purchases take less than a minute to place. You pay from a US bank account, and the XCH is delivered to a vault you control.

:::info

You need a Cloud Wallet account and at least one vault. If you have not created a vault yet, follow the [Getting Started Guide](/cloud-wallet/getting-started) first.

ACH bank transfer is the only accepted payment method. Stripe processes the transfer. Chia never stores your bank login credentials.

:::

<!-- Legacy anchors preserved for external links -->

<span id="prerequisites"></span>

## Create your Chia Cloud Wallet account

1. Go to [vault.chia.net](https://vault.chia.net/) and create a Chia Cloud Wallet account, or log in if you already have one.
2. Open the **Buy XCH** tab (the \$ icon).

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/buy-xch-01_navigation_light.png" alt="Vaults home with the Buy XCH dollar icon in the left menu" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/buy-xch-01_navigation_dark.png" alt="Vaults home with the Buy XCH dollar icon in the left menu" width="100%" className="theme-image-dark"/>
</div>

## Verify your identity

First-time buyers only. This is a one-time step. Stripe hosts the identity check, so that part of the flow is not shown here.

1. Click **Verify My Identity**.
2. Agree to the data policy to start the process.
3. Take a photo of a valid government ID and a selfie, then upload both. Stripe checks these instantly for most users. A small number of applicants are declined at this stage.
4. Once you are verified, connect a bank account one of two ways:
   - **Instant:** choose your bank from the list and log in with your bank credentials. Verification is immediate.
   - **Manual:** enter your bank routing and account numbers. This option can take a couple of days to verify.
5. You can save your bank details for future purchases. Right now, **ACH bank transfer is the only accepted payment method**.

<span id="buying-xch"></span>

## Buy XCH

Once you are verified, or on any return visit, buying is simple.

1. Enter the amount you want to buy, in USD or XCH, and choose the vault that should receive it. The exchange rate updates as you type.
   <span id="purchase-limits"></span>
   - Minimum purchase: **\$25**
   - Maximum purchase: varies by user, and your limit increases as you complete more successful purchases

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/buy-xch-02_enter_amount_light.png" alt="Buy XCH amount and vault selection" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/buy-xch-02_enter_amount_dark.png" alt="Buy XCH amount and vault selection" width="100%" className="theme-image-dark"/>
</div>

2. Click **Next**, then choose a saved bank account or a new US bank account. For a new account, pick your bank and sign in. Stripe handles that login. Manual entry of a routing and account number is available when bank login is not.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/buy-xch-03_select_bank_light.png" alt="US bank account payment step with a bank search" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/buy-xch-03_select_bank_dark.png" alt="US bank account payment step with a bank search" width="100%" className="theme-image-dark"/>
</div>

3. Review the payment method, exchange rate, amount, and total, then click **Buy XCH**.
4. On the confirmation dialog, read the hold notice, check both boxes, and click **Next**.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/buy-xch-06_confirmation_light.png" alt="Purchase confirmation dialog with the hold notice" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/buy-xch-06_confirmation_dark.png" alt="Purchase confirmation dialog with the hold notice" width="100%" className="theme-image-dark"/>
</div>

## What happens after you buy

Your purchase involves two things happening on two different timelines.

:::info XCH delivered, with a safety hold

**XCH arrives immediately, but with a safety hold.** As soon as you buy, you will see the XCH in your wallet, along with the latest date you will get full access to it. This hold is called a clawback, and it exists to protect against payment reversals.

**Your bank payment (ACH) takes 3 to 5 business days to settle.** This is standard for ACH transfers and happens on the banking side, not on Chia.

**The clawback hold is set for 14 days** to build in a buffer for weekends and holidays.

**In practice, your hold usually lifts early.** Once your payment settles, the clawback is released within 1 to 3 days, typically well before the 14-day deadline.

:::

## Quick reference

| Step                 | What you need                                               | Time required                                                    |
| -------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------- |
| Create account       | Email                                                       | 1–2 minutes                                                      |
| Verify identity      | Government ID + selfie                                      | Instant for most users                                           |
| Connect bank         | Bank login (instant) or routing and account number (manual) | Instant to a couple of days                                      |
| Buy XCH              | Minimum \$25                                                | Under a minute to place                                          |
| Full access to funds | —                                                           | Usually within a few days; hold expires at 14 days at the latest |

## Troubleshooting

If you run into a problem while buying XCH:

- Confirm the vault is fully created and has an address
- Confirm the purchase amount is at least \$25 and within your current limit
- Confirm the bank account has sufficient funds
- For anything else, use [In App Support](/cloud-wallet/in-app-support)
