---
slug: /getting-started/cloud-wallet/known-issues
title: Known Issues
---

This list was last updated on 2024-12-18. Although there are many items in this list, most of them are minor issues or issues that occur rarely. In addition, while we will attempt to keep this list up to date, it may fall behind on occasion. This is not meant to be a comprehensive list.

- Recovery is not yet enabled for vaults that use the Chia Signer app
- The fee field doesn’t work yet for recovery operations (initiate, cancel, complete)
- The fiat price of XCH is currently not being displayed
- You may see an occasional `Minified React error` when doing various actions in the Cloud Wallet
- You may have difficulty creating a new Yubikey passkey when using the Cloud Wallet on Android
- If vault creation fails, you won't be able to create a vault with the same name used with the failed attempt
- If you send two transactions within the same block, the second transaction will be stuck in the mempool indefinitely
- Transaction status might not be updated for around 20 seconds after on-chain confirmation
- When vault minting doesn't succeed (for example, if not enough coins are available), the action is not retried
- Long vault names are truncated; this is a display issue only
- Vaults currently can be named with all whitespace (space/tab) characters; this will be disallowed in the future
- The Chia Signer app is only for signing transactions; the current signup process doesn't make it completely clear that the app cannot be used for logging into the Cloud Wallet. We will make this clearer in the future.
- The transaction history may not show all incoming transactions, even when the balance is accurate
- When setting up a vault on an iPhone, the fields for inputting up the clawback timer might not show any numbers
- If you attempt to add a passkey, but then click the X to close out of the window, it will give you an error
- If you send funds to your own vault, the transaction will show an amount of 0
- In rare occurrences, when creating an account, you might see "Internal Server Error"
- You may see "User not found for this passkey" when attempting to create an account with a passkey
- We are in the process of updating the mobile UI, so certain buttons and labels may look bad on a mobile device for now
- Some users have reported seeing "vault.chiatest.net's DNS address could not be found...." when using the Brave browser
- The previous view of the home screen will briefly flash after a new vault is created; this lasts less than one second until the correct view is displayed
- After successfully cancelling a recovery, you may see a "Something went wrong" message; refresh your browser window to workaround this issue
- The initial timer displayed for cancelling a recovery is hardcoded to 15 minutes; however, the actual timer is correct
- The recovery timer will show "0 minutes" remaining when, in fact, there is less than one minute remaining; this is a simple rounding error which will be resolved when the timer actually reaches 0
- After a successful recovery, the first transaction in the vault’s history shows an extra mojo
- The signing modal dialog occasionally takes over 30 seconds to be displayed
- When sending CATs, the "amount" field is missing a label, and the "fee" field is labeled as "unknown CATs"; these are display issues only
- CATs sent to the same vault as where they originated are listed as "0 Unknown CATS"
- If the Cloud Wallet is left inactive for a long time, "Something went wrong" might be displayed; refreshing the browser tab will work around this issue
- For now, in order to paste a seed phrase when initiating a recovery, you must paste the phrase into the first word field
- Coins might be locked if certain transactions fail, and it’s not obvious how to unlock them; however, this is an uncommon occurrence
- On rare occasions, selecting a custody key will result in it not being possible to return to the main screen. \* Log out and log back in to work around this issue for now
- If a "Fee too low" error is encountered (a rare occurrence), a transaction may enter a "signed" state, but it is not submitted to the mempool
- Unrecognized CATs (which includes all CATs for now) are each listed as "Unknown CAT2" without an obvious way to differentiate them
- The balance and transaction count can be out of sync in vaults with hundreds of transactions
- When creating a vault with a bitwarden passkey, it’s possible to receive a "Memory access out of bounds" error
- You can’t create a new vault with the same name as a deleted vault
