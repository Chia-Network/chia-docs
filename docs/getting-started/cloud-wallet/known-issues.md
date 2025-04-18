---
slug: /getting-started/cloud-wallet/known-issues
title: Known Issues
---

This list was last updated on 2025-03-18. Although there are many items in this list, most of them are minor issues or issues that occur rarely. In addition, while we will attempt to keep this list up to date, it may fall behind on occasion. This is not meant to be a comprehensive list.

- The email you receive from the watchtower upon attempting to recover your vault may show an incorrect recovery clawback time
- If you send XCH to your own vault, the transaction will show incorrect info. However, your balance will be correct
- The TAIL ID might not be completely visible in the Cloud Wallet or the Chia Signer app. This is only a display issue
- It is possible to attempt to create a vault without connecting the Chia Signer app, which will result in the vault not being created
- If you repeatedly click `Copy to clipboard` when creating a vault, the screen may flash unexpectedly. This is a display issue only
- The recipient address shown in older Chia Signer app transactions may be incorrect
- Transactions are listed in reverse chronological order. We will update this listing to chronological order
- When initiating a recovery, you may briefly see "Not Available" minutes remaining until the recovery can be completed, after which the correct timer is displayed
- From the home screen view, a vault's balance may take over a minute to update after the transaction has been processed on chain
- Android passkeys don't sync properly to desktop computers that don't have Bluetooth
- When using the dark theme, hovering over a button such as the Delete button may not provide adequate visual feedback
- When signing up from an Android device, you may see an `Internal Server Error`
- After recovering a vault with the Chia Signer app, when a new transaction is confirmed, a `Recovery Timer` screen may briefly flash
- If you send multiple transactions from the same vault at approximately the same time, the second one might get stuck in the mempool
- You may have difficulty creating a new Yubikey passkey when using the Cloud Wallet on Android
- If you send two transactions within the same block, the second transaction will be stuck in the mempool indefinitely
- Vaults currently can be named with all whitespace (space/tab) characters; this will be disallowed in the future
- The Chia Signer app is only for signing transactions; the current signup process doesn't make it completely clear that the app cannot be used for logging into the Cloud Wallet. We will make this clearer in the future.
- The transaction history may not show all incoming transactions, even when the balance is accurate
- If you send funds to your own vault, the transaction will show an amount of 0
- In rare occurrences, when creating an account, you might see "Internal Server Error"
- You may see "User not found for this passkey" when attempting to create an account with a passkey
- The previous view of the home screen will briefly flash after a new vault is created; this lasts less than one second until the correct view is displayed
- The recovery timer will show "0 minutes" remaining when, in fact, there is less than one minute remaining; this is a simple rounding error which will be resolved when the timer actually reaches 0
- For now, in order to paste a seed phrase when initiating a recovery, you must paste the phrase into the first word field
- Coins might be locked if certain transactions fail, and it’s not obvious how to unlock them; however, this is an uncommon occurrence
- If a "Fee too low" error is encountered (a rare occurrence), a transaction may enter a "signed" state, but it is not submitted to the mempool
- You can’t create a new vault with the same name as a deleted vault
