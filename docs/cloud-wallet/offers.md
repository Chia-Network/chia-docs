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

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/offers-01_navigation_light.png" alt="Navigate to Offers from the left-hand menu" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/offers-01_navigation_dark.png" alt="Navigate to Offers from the left-hand menu" width="100%" className="theme-image-dark"/>
</div>

3. Use the tabs to switch between `Offers you accepted` and `Offers you created`. From the header you can also start `Accept Offer` or `Create Offer`.

If you have unsigned offer transactions waiting, a `Pending Signature` section appears above the lists. Use `Sign & Submit` to finish signing, or `Cancel` to discard an unsigned offer.

## Create an Offer

1. From Offers, click `Create Offer`.

2. Under `Select Vault`, choose the vault that will fund the offer.

3. Under `Assets Offered`, select assets you currently hold in that vault (XCH, tokens, or NFTs). Enter amounts as needed, and use `Add Another` to offer more than one asset.

4. Under `Assets Requested`, choose what you want in return (`XCH`, `Tokens`, or `NFTs`). You can request assets you do not already hold. For tokens, you can pick a known token or use `+ Add token details` with an asset id. Leaving requested assets empty creates a one-sided offer; the app asks you to confirm with `Nothing Requested` before continuing.

5. Optionally adjust `Expiration` (`Days`, `Hours`, `Minutes`). Expiration is on by default.

6. Enter a `Transaction Fee` if you want to speed confirmation when the network is busy.

7. Leave `Auto-Split Coins` enabled unless you have a reason to turn it off. When it is on, the wallet may run a separate coin-split transaction before creating the offer so the offer does not lock more of your spendable balance than needed.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/offers-02_create_light.png" alt="Create Offer form with vault, offered assets, and requested assets" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/offers-02_create_dark.png" alt="Create Offer form with vault, offered assets, and requested assets" width="100%" className="theme-image-dark"/>
</div>

8. Click `Create Offer`. Confirm and sign in the `Confirm Offer` flow (`Sign and Send` for a passkey, or approve the request in the Chia Signer app).

After signing, the offer appears under `Offers you created`. When its status is `Open`, you can share it with the counterparty.

## Share a created Offer

From the created list or the offer details page, open the actions menu while the offer is `Open`:

- `Copy Offer` copies the offer string to the clipboard
- `Download Offer` saves the offer as a file
- `Share on Dexie` posts the offer to Dexie (confirm with `Share`, then optionally `View on Dexie`)

Only share offers with people you intend to trade with. Anyone who has the offer string or file may be able to take it if they meet the terms.

## Accept an Offer

1. From Offers, click `Accept Offer`.

2. Under `Select Vault`, choose the vault that will send the assets you are giving.

3. Under `Offer Details`, paste or upload the offer:
   - `Paste Offer` opens a field where you paste the offer string, then click `Use Offer`
   - `Upload Offer File` (or `Upload Offer`) loads an offer file from disk
   - You can also drag and drop an offer file onto the drop area

4. Review `Sending` and `Receiving` (including any NFT royalty lines). Confirm you have enough balance and any required NFTs.

5. Review fees. If the maker included a fee, you may see `Included Fee`. You can also set an `Additional Fee (Optional)` or `Transaction Fee`.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/offers-03_accept_light.png" alt="Accept Offer screen with vault selection and offer details" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/offers-03_accept_dark.png" alt="Accept Offer screen with vault selection and offer details" width="100%" className="theme-image-dark"/>
</div>

6. Click `Accept Offer`, then confirm and sign in the `Confirm Offer` flow.

You cannot accept an offer with the same vault that created it. Accepted offers appear under `Offers you accepted`.

## Manage created Offers

On `Offers you created`, each open offer supports `View Details`, `Copy Offer`, `Download Offer`, `Share on Dexie`, and `Cancel Offer` when available.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/offers-04_created_list_light.png" alt="Offers you created list with status and actions" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/offers-04_created_list_dark.png" alt="Offers you created list with status and actions" width="100%" className="theme-image-dark"/>
</div>

### Cancel an Offer

1. Choose `Cancel Offer` from the created list or details page.

2. Review the cancellation options. Cancelling submits an on-chain cancellation transaction with a `Transaction Fee`.

3. Click `Confirm Cancellation` and sign if the app requests a signature.

On-chain cancellation permanently cancels the offer on the blockchain. See [Known Issues](/cloud-wallet/known-issues) for current cancellation limitations.

## Tips

- Keep `Auto-Split Coins` enabled for most creates so less of your spendable balance stays reserved for the offer.
- Coins reserved by an open offer can reduce your spendable balance until the offer settles or is cancelled.
- If a brand-new vault cannot create an offer yet, send a small amount to yourself first, then try again. See [Known Issues](/cloud-wallet/known-issues).

## Troubleshooting

- Verify the selected vault has finished minting and has an address
- For create or accept failures, check balances, NFT ownership, and that the offer has not expired or already been taken
- For signing problems, confirm your Signer app or passkey can approve the `Confirm Offer` request
- For additional support, use [In App Support](/cloud-wallet/in-app-support)
