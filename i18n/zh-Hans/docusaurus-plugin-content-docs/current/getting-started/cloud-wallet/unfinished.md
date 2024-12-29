---
slug: /getting-started/cloud-wallet/unfinished
title: Unfinished Components
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

While the Cloud Wallet public beta has most of its planned features in place, it is currently missing a few things that will be included in the production release.

## Recovery for Chia Signer Vaults

Vaults that use the Chia Signer app as their signer cannot yet perform a recovery. While the APIs for recovering these vaults are working, the GUI is not yet ready. We are actively working on finishing this.

## Recovery for Unlisted Vaults

Currently, if you lose access to your Cloud Wallet and signer passkey (for example, if you are accessing your account from a smartphone, and this phone is stolen), the app does not have a method for recovering your vault. We are working on implementing this.

## CAT Naming

Sending and receiving CATs does currently work. However, the Cloud Wallet does not yet map CATs to their TAILs. This results in all CATs being labeled as “Unknown”. This is only a local labeling issue, which does not affect the assets themselves.

## Address Book

We plan to add an address book in order to make it easier to send assets to known addresses.

## Offers

We plan to include basic offers, similar to what exists in the reference wallet.

## Swaps

We plan to integrate support for TibetSwap in the Cloud Wallet app.

## NFTs

We plan to support NFTs, similar to what exists in the reference wallet.

## Clawback

We plan to support basic clawback transactions, similar to what exists in the reference wallet.

## Separate Passkeys

Currently, all Cloud Wallet passkeys are used for both signing into the app and for signing vault transactions. We plan to separate these functionalities to allow separate passkeys to be used.
