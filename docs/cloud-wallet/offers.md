---
title: Offers
slug: /cloud-wallet/offers
---

This guide shows how to create, accept, share, and cancel Offers in the Chia Cloud Wallet.

:::info

You need a Cloud Wallet account and at least one vault. If you have not created a vault yet, follow the [Getting Started Guide](/cloud-wallet/getting-started) first.

:::

## Prerequisites

- An active [Chia Cloud Wallet](https://vault.chia.net/) account with at least one vault
- Access to your vault spend key (Chia Signer app or passkey) to sign offer create, accept, and cancel transactions

## Open Offers

1. Log in to your [Chia Cloud Wallet](https://vault.chia.net/) account.

2. Open `Offers` from the left-hand menu:

3. Use the tabs to switch between `Offers you accepted` and `Offers you created`. From the header you can also start `Accept Offer` or `Create Offer`.

If you have unsigned offer transactions waiting, a `Pending Signature` section appears above the lists. Use `Sign & Submit` to finish signing, or `Cancel` to discard an unsigned offer.

## Create an Offer

1. From Offers, click `Create Offer`.

2. Next to `You offer from`, choose the vault that will fund the offer.

3. Under `You offer`, click `Add Asset` and select assets you currently hold in that vault (XCH, tokens, or NFTs). Enter amounts as needed. Click `Add Asset` again to offer more than one asset.

4. Under `You receive`, choose what you want in return with `+ XCH`, `+ Token`, or `+ NFT`. You can request assets you do not already hold. For a token, pick a known token or choose `+ Add token details` and enter its asset ID. For an NFT, enter its `nft1…` ID. Leaving this side empty creates a one-sided offer: whoever takes it pays nothing. When you create a one-sided offer, the app asks you to confirm with `Yes, Continue`.

5. Under `Offer Settings`, choose an `Expiration`: `Expires after` (set days, hours, and minutes) or `Never expires`. `Expires after` is selected by default.

6. Under `Coin Splitting`, leave `Split coins first` selected unless you have a reason to change it. The wallet then runs a separate coin-split transaction (with an optional `Split Fee`) so the offer locks only the amount it needs. `Use coins as they are` skips that transaction, but the offer may lock up a large part of your spendable balance until it is taken or canceled.

7. Optionally check `Add a fee to the offer` and enter an `Offer Fee`. This is rarely needed. It is paid from this vault when someone takes the offer.

8. Click `Create Offer`. Confirm the offer and sign (`Sign and Send` for a passkey, or approve the request in the Chia Signer app).

After signing, the offer appears under `Offers you created`. When its status is `Open`, you can share it with the counterparty.

## Share a created Offer

From the created list or the offer details page, open the actions menu while the offer is `Open`:

- `Copy Offer` copies the offer string to the clipboard
- `Download Offer` saves the offer as a file
- `Share on Dexie` posts the offer to [Dexie](https://dexie.space) (confirm with `Share`, then optionally `View on Dexie`)

Only share offers with people you intend to trade with. Anyone who has the offer string or file may be able to take it if they meet the terms.

## Accept an Offer

1. From Offers, click `Accept Offer`.

2. Under `Select Vault`, choose the vault that will send the assets you are giving.

3. Under `Offer Details`, paste the offer string (it starts with `offer1`) into the text area, click `Upload File` to load an offer file, or drop an offer file anywhere on the page.

4. Review `You give` and `You receive` (including any NFT royalty lines). Confirm you have enough balance and any required NFTs.

5. Review fees. If the maker included a fee, you may see `Included Fee`. You can also set an `Additional Fee (Optional)` or `Transaction Fee`.

6. Click `Accept Offer`, then confirm and sign (`Sign and Send` for a passkey, or approve the request in the Chia Signer app).

You cannot accept an offer with the same vault that created it. Accepted offers appear under `Offers you accepted`.

## Manage created Offers

On `Offers you created`, each open offer supports `View Details`, `Copy Offer`, `Download Offer`, and `Share on Dexie` when available. To cancel an offer, use `Cancel Off-Chain` or `Cancel On-Chain` (see [Cancel an Offer](#cancel-an-offer)).

`Offers you accepted` supports `View Details` only.

### Cancel an Offer

`Cancel On-Chain` appears when the offer is open, meaning it is valid on the blockchain. `Cancel Off-Chain` is always available while the offer is pending (for example, the create spend is still waiting in the mempool). For an open offer, `Cancel Off-Chain` appears only if it is enabled for your account, alongside `Cancel On-Chain`. Use the option that is shown.

`Cancel Off-Chain` cancels the offer in the Cloud Wallet and makes reserved funds spendable again. It does not publish a cancellation on the blockchain. If you already shared the offer (for example on [Dexie](https://dexie.space) or as a file), someone who has a copy may still be able to accept it if the offer later becomes valid.

`Cancel On-Chain` submits a cancellation transaction to the blockchain so the offer cannot be accepted by anyone. It takes a `Transaction Fee` and requires a signature.

After an off-chain cancel, if the offer becomes open (for example, a pending create spend later confirms), `Cancel On-Chain` appears so you can finish invalidating it. If an offer's status changes while a cancel dialog is open, the dialog closes and asks you to review the available options.

#### Cancel Off-Chain

1. From `Offers you created` or the offer details page, choose `Cancel Off-Chain` when it is shown.

2. Review the `Cancel Offer Off-Chain` dialog, then click `Cancel Off-Chain`.

#### Cancel On-Chain

1. From `Offers you created` or the offer details page, choose `Cancel On-Chain`.

2. Review the `Cancel Offer On-Chain` dialog and enter a `Transaction Fee` if you want to speed confirmation.

3. Click `Cancel On-Chain` and sign (`Sign and Send` for a passkey, or approve the request in the Chia Signer app).

See [Known Issues](/cloud-wallet/known-issues) for related cancellation limitations.

## Tips

- Keep `Split coins first` selected for most creates so less of your spendable balance stays reserved for the offer.
- Coins reserved by an open offer can reduce your spendable balance until the offer settles or is cancelled.
- If a brand-new vault cannot create an offer yet, send a small amount to yourself first, then try again. See [Known Issues](/cloud-wallet/known-issues).

## Troubleshooting

- If the vault is still being minted, wait until this clears: `This vault is currently being minted. You cannot perform transactions until the minting process is complete.`
- For create or accept failures, check balances, NFT ownership, and that the offer has not expired or already been taken
- For signing problems, confirm your Chia Signer app or passkey can approve the `Confirm Offer` request
- For additional support, use [In App Support](/cloud-wallet/in-app-support)
