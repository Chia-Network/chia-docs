---
slug: /getting-started/cloud-wallet/known-issues
title: Known Issues
---

This list was last updated on 2024-12-02. Although there are many items in this list, most of them are minor issues or issues that occur rarely. In addition, while we will attempt to keep this list up to date, it may fall behind on occasion. This is not meant to be a comprehensive list.

- Recovery is not yet enabled for vaults that use the Chia Signer app, and the recovery flow has yet to be disabled
- The fee field doesn’t work yet for recovery operations (initiate, cancel, complete)
- Upon cancelling a recovery, an extra signature dialog is displayed
- Upon cancelling a recovery, the app doesn’t indicate that anything is happening while the the transaction is being processed
- After a successful recovery, the first transaction in the vault’s history shows an extra mojo
- CATs sent to the same vault as where they originated are listed as "0 Unknown CATS"
- An unsigned spend will get [Settled] Status when the next spend succeeds and is settled
- Deleted transactions continue to be displayed for around 40 seconds
- The balance and transaction count can be out of sync in vaults with hundreds of transactions
- The green "success" message is shown when attempting to send a transaction before the transaction has been signed
- For vaults with large numbers of transactions, some transactions may not be listed in the vault’s history
- You may receive two identical copies of the same watchtower email upon successfully completing a recovery
- After successfully cancelling a recovery, you may see a "Something went wrong" message; refresh your browser window to workaround this issue
- The initial timer displayed for cancelling a recovery is hardcoded to 15 minutes; however, the actual timer is correct
- The recovery timer will show "0 minutes" remaining when, in fact, there is less than one minute remaining; this is a simple rounding error which will be resolved when the timer actually reaches 0
- The signing modal dialog occasionally takes over 30 seconds to be displayed
- The previous view of the home screen will briefly flash after a new vault is created; this lasts less than one second until the correct view is displayed
- When sending CATs, the "amount" field is missing a label, and the "fee" field is labeled as "unknown CATs"; these are display issues only
- If the Cloud Wallet is left inactive for a long time, "Something went wrong" might be displayed; refreshing the browser tab will work around this issue
- For now, in order to paste a seed phrase when initiating a recovery, you must paste the phrase into the first word field
- Coins might be locked if certain transactions fail, and it’s not obvious how to unlock them; however, this is an uncommon occurrence
- Transaction confirmation takes about twenty seconds longer than it does with the reference wallet
- On rare occasions, selecting a custody key will result in it not being possible to return to the main screen. \* Log out and log back in to work around this issue for now
- If a "Fee too low" error is encountered (a rare occurrence), a transaction may enter a "signed" state, but it is not submitted to the mempool
- Old transactions may be listed out of order
- Unrecognized CATs (which includes all CATs for now) are each listed as "Unknown CAT2" without an obvious way to differentiate them
- When creating a vault with a bitwarden passkey, it’s possible to receive a "Memory access out of bounds" error
- You can’t create a new vault with the same name as a deleted vault
