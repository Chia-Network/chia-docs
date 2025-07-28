---
title: Known Issues
slug: /cloud-wallet/known-issues
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This list was last updated on 2025-07-28. In addition to the items shown here, there are several minor UI/UX issues that we will also fix.

If you find any issues that you think are security related, please file a report at our [HackerOne site](https://hackerone.com/chia_network).

Feel free to report other issues on [our Discord server](https://discord.gg/chia).

## Cloud Wallet Known Issues

- All Offer cancellations in the Cloud Wallet will currently be performed on-chain. We plan to support off-chain cancellation soon.
- Under certain circumstances, it is possible to end up with coins from your vault being locked, with no easy way to access them. We will update this soon so that the coins will become accessible again. Even if this does happen, it will not result in a loss of funds. Some examples of when this might occur include when someone cancels an Offer in the same block in which someone else attempts to accept it, and after an Offer expires.
- If you have a brand new vault, you might not be able to create a new Offer until your vault has submitted at least one transaction. We are working on a fix for this issue. In the meantime, a workaround is to send XCH or a CAT to yourself from your own vault. After this initial transaction, the vault will not encounter the issue again.
- If you are accessing the Cloud Wallet on an Android phone, you may not be able to create a passkey with a Yubikey or other hardware device.
- We have experienced issues with other combinations of OS and passkey type, especially on mobile devices. These issues are typically related to the device itself, and are out of our control to fix. However, we will work on reporting these limitations more clearly when they occur.
- If you rename any tokens in your vault, and then create an Offer that involves those tokens, the old names will be displayed in the Offer. We will show the new names soon.
- The cloud wallet is currently the only wallet that supports vault based offers. This means if you create an offer in the cloud wallet the taker will need to accept the offer in their cloud wallet account.

## Resolved Previously Known Issues

:::note
Let us know on [our Discord server](https://discord.gg/chia) if you are still experiencing these issues:
:::

- The signer popups in the Cloud Wallet and Signer app for certain transaction types currently show incomplete details. This is only a display issue that we will fix soon. The signature requests themselves do work as designed.
