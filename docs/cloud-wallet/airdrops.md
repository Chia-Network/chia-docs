---
title: Airdrops
slug: /cloud-wallet/airdrops
---

This guide shows how to send a token (CAT) from a Cloud Wallet vault to many recipients at once with an airdrop, then track the recipients and manage clawbacks.

:::info

You need a Cloud Wallet account and a vault that holds a token with a spendable balance. If you have not created a vault yet, follow the [Getting Started Guide](/cloud-wallet/getting-started) first. To add tokens to a vault, see [Tokens](/cloud-wallet/tokens).

:::

## Prerequisites

- An active [Chia Cloud Wallet](https://vault.chia.net/) account with a vault that holds a token with a spendable balance
- Access to your vault spend key (Chia Signer app or passkey) to sign the airdrop
- A CSV file of recipients (see [Prepare the CSV file](#prepare-the-csv-file))
- XCH in the same vault to pay the network fee

## What an airdrop does

An airdrop sends one token from your vault to every address in a CSV file in a single transaction. You can add a clawback expiration to any recipient, so you can return that recipient's tokens to your vault until the expiration passes. See [Send Clawback](/cloud-wallet/send-clawback) for how clawbacks work.

Airdrops cannot be undone once sent, except through a clawback.

## Open the Create Airdrop page

You can start an airdrop from three places. Each one fills in what it knows, so you only choose the rest.

- Vault page: open the vault menu and click `Create Airdrop`. The vault is fixed and you choose the token.
- Token page, `Saved Snapshots`: click `Airdrop` next to a saved snapshot. The token is fixed and the template lists the snapshot holders.
- Token page, token history: open the menu for a snapshot and click `Create Airdrop`. The option is disabled when the snapshot has no holders.

## Prepare the CSV file

Click `Download Template` in the `Recipients` card to get `Airdrop_Template.csv`. When you opened the page from a snapshot, the template lists the snapshot holders (without your vault address) and leaves the amounts empty, so add an amount for each row before uploading.

The file has one recipient per row with these columns:

| Column                                    | Description                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------ |
| `Address`                                 | The recipient's address (or puzzle hash)                                             |
| `Amount`                                  | The amount of the token to send, with up to 3 decimals                               |
| `Clawback Expiration (Unix ms, optional)` | When the clawback ends, as Unix time in milliseconds. Leave it empty for no clawback |

Example:

```text
Address,Amount,"Clawback Expiration (Unix ms, optional)"
xch1q7…3xk,10,
xch1z9…v4m,0.125,1893456000000
```

Notes:

- The header row is optional. Blank lines are ignored.
- Only `.csv` files can be uploaded.
- A file supports up to about 38,000 recipients. For more, split the file into several airdrops.

## Create the airdrop

1. Log in to your [Chia Cloud Wallet](https://vault.chia.net/) account.

2. Open the `Create Airdrop` page using one of the entry points above.

3. In the `Vault and Token` card, choose the vault to send from and the token to send. Only vaults and tokens with a spendable balance can be selected.

4. In the `Recipients` card, drop your CSV file or click `Browse Files`. Use `Replace` or the remove button to change the file.

   The file is checked right away. If rows have problems, the card says how many and shows them in the recipients table. Fix them in your file and upload it again. If the total is more than the vault's spendable balance, lower the amounts or add more of the token to the vault.

5. In the `Network Fee` card, enter a fee. It is paid in XCH from the same vault.

6. Click `Create Airdrop` and confirm. The confirmation shows the total, the number of recipients and the vault, and warns that airdrops cannot be undone.

7. Sign the transaction.

## Track an airdrop

The airdrop appears in the vault's transaction list as `Airdrop` with the number of recipients and, when any use a clawback, how many have one. Open the transaction to see the recipients table and click `Download CSV` to save the file you sent.

Once the airdrop is submitted, the recipients table has a `Status` column that shows where each recipient's payment stands:

| Status             | Meaning                                                            |
| ------------------ | ------------------------------------------------------------------ |
| `Pending`          | The payment is not on-chain yet                                    |
| `Delivered`        | The tokens are on-chain and the payment has no clawback            |
| `Clawback pending` | The clawback window is still open                                  |
| `Clawback expired` | The clawback window has ended and the payment is not finalized yet |
| `Finalized`        | The clawback was finalized so the recipient can spend the tokens   |
| `Clawed back`      | The tokens were returned to your vault                             |

On small screens the status shows in the details under each recipient instead.

When recipients have a clawback, the transaction also has a `Clawbacks` section. Each entry shows the amount, the number of recipients and when the clawback ends, with these actions:

- `Claw Back`: return the tokens to your vault. It only returns payments whose clawback window is still open and skips the ones that have ended.
- `Finalize`: end the clawback early so the recipients can spend the tokens.
- `Push Through`: after the clawback expires, send the tokens to recipients whose wallets do not support clawbacks.

If a batch has payments with different clawback windows, the entry says how many are still pending and how many have expired. After a partial claw back or finalize, the batch is split into one entry per outcome, such as `Clawed back` or `Finalized`. The entry with payments that are still unspent keeps the actions, so you can push through the expired ones. For clawed back payments, `Download CSV` saves the returned recipients in the airdrop template format, with the clawback column blank, so you can upload it as a new airdrop.

Clawback actions are only available after the airdrop confirms on-chain.

## Related

- [Send Clawback](/cloud-wallet/send-clawback)
- [Tokens](/cloud-wallet/tokens)
- [Tooltips](/cloud-wallet/tooltips)
