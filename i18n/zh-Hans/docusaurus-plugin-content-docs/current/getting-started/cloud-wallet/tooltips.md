---
slug: /getting-started/cloud-wallet/tooltips
title: Tooltips
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page contains tooltip links from the Cloud Wallet. It provides some basic info about the various components.

## Recovery

This is the process of rekeying a vault. If your spend key is lost or stolen, you can swap it out for a new one. For example, if someone steals your smartphone where your Chia Signer app is installed, you can obtain a new phone, install the Chia Signer app, and create a new hardware key. You can then instruct your vault to replace the stolen key with the new one. The recovery process also allows you to change your recovery key if desired.

## Spend Key

This is a vault’s primary key used for signing transactions. It can be either a passkey or a hardware key from the Chia Signer app.

## Recovery Key

This key can only be used for recovering a vault. It cannot be used for signing transactions. Currently it must be a BLS key. In the future, we will also enable passkeys, as well as hardware and software keys from the Chia Signer app.

## Transaction Fee

A fee for speeding up your transaction’s confirmation time if the network is busy. Testnet11 is often being dusted with small transactions, so we recommend including a fee whenever possible. Typically 0.001 TXCH is sufficient for fast confirmation on testnet11.

## Recovery Clawback

When you create a new vault, you need to input the amount of time to wait before a recovery can be completed. This is the "recovery clawback" time. During this time window, you can cancel the recovery if it was initiated maliciously. Note that the default recovery clawback time for the beta is 15 minutes. On mainnet, most people will want to set this to something like 48-72 hours in order to provide ample time to cancel the recovery if necessary.

## Recovery Phrase

If you use a BLS key as the recovery key, you will be given a series of 24 words to copy. This is the recovery phrase. You will need to enter this phrase upon initiating a vault recovery. Be sure to copy this phrase carefully, and don’t show it to anyone. We don’t store a copy of this phrase, so we can only show it to you when you create your vault.

## Recovery Timer

This is the amount of time you must wait before a recovery operation can be completed. The timer is set upon the vault’s creation, and it can only be modified during a recovery. For example, when you create a vault, if you set this timer to 3 days, then after you initiate a recovery, you will need to wait for 3 days to complete it. During that time, you can cancel the recovery. The reason this timer exists is so that if someone steals your recovery key, you can cancel any recovery attempts, and send your assets to a new vault.

## Signer App

A smartphone app initially available for iPhones made after 2013. The app stores a spend key in its Secure Enclave. This key cannot be copied or removed from the phone, so the only way to steal it is to gain physical access to the device. For this reason, we strongly recommend that you secure the Signer app using your phone’s biometrics.
