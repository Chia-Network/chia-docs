---
title: Tooltips
slug: /cloud-wallet/tooltips
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page contains tooltip links from the Cloud Wallet. It provides some basic info about the various components.

## Recovery

This is the process of rekeying a vault. It will allow you to change any combination of your vault's spend key, recovery key, and recovery timelock. There are two types of recovery, explained in the following sections: Instant and Timelocked.

### Instant Recovery

If you still have access to your spend key, you can recover your vault without having to wait for the clawback period to expire. There are three primary use cases for Instant Recovery (also known as Instant Rekey):

1. **New Device** -- If you use the Chia Signer app, then your vault's spend key is stored in hardware-protected storage on your smartphone. It can never be copied or moved to another device, so when you obtain a new phone, you will need to recover your vault. As long as you still have your original phone, you can instantly rekey your vault to use your new device.

2. **Emergency Recovery** -- If an adversary obtains a copy of your recovery key (for example, your 24-word phrase), then the adversary can attempt to recover your vault in order to drain its funds. However, they will need to wait for the recovery clawback period to expire before doing so. You will receive an email as a warning that the recovery attempt is in progress. As long as you still have your spend key (e.g. your smart phone or your passkey), you can cancel the recovery attempt, and instantly rekey your vault's recovery phrase to a new one. The adversary will no longer be able to attempt to steal your funds.

3. **New User (Multisig)** -- It's also possible to rekey a multisig vault by using the Instant Recovery feature. For example, if one member of a 2-of-3 multisig vault is leaving the organization, you can instantly rekey that user's key in favor of a new one.

Instant Recovery is only available when you still possess your vault's spend key. If you no longer have that key, then you will need to perform a Timelocked Recovery.

### Timelocked Recovery

If you no longer have access to your vault's spend key, then you can perform a Timelocked Recovery by using your vault's recovery key. For example, if you use the Chia Signer app and your phone is lost, damaged, or stolen, you can change your vault's spend key to a new device. You will need to sign the recovery transaction with your vault's recovery key. You will also need to wait for the recovery clawback to expire before you can complete the recovery.

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

A smartphone app for **iOS** and **Android** (Android is in **beta**). The app stores a spend key in hardware-protected storage on the device (Secure Enclave on iOS; hardware-backed keystore / StrongBox on supported Android devices). This key cannot be copied or removed from the phone, so the only way to steal it is to gain physical access to the device. For this reason, we strongly recommend that you secure the Signer app using your phone’s biometrics. **iOS:** [App Store](https://apps.apple.com/app/chia-signer/id6504493785). **Android** (beta): [Google Play](https://play.google.com/store/apps/details?id=net.chia.android.signer).

## Clawback

You can optionally add a time span to a transaction during which you can claw it back. During this time, the recipient can see the incoming transaction, but cannot access the funds. Clawback is primarily useful to prevent sending funds to the wrong address.

For example, Alice sends 1 XCH to Bob, and she adds a 1-hour clawback.

- For the next hour, Bob can see the incoming XCH in his vault's transaction list, but he cannot access it.
- Let's say Alice accidentally sent the XCH to the wrong address. During the 1-hour clawback period, she can claw the 1 XCH back to her vault.
- On the other hand, maybe Bob contacts Alice to let her know that he can see the incoming XCH. In this case, Alice can finalize the transaction before the 1-hour timer has expired.
- After the 1-hour timer has expired, Alice can no longer claw back the funds. The 1 XCH is now automatically counted with Bob's vault balance.

## Key Types

The Chia Cloud Wallet allows a number of different key types to be used as both spend keys and recovery keys. However, while the Cloud Wallet is quite flexible in this regard, not every key type is appropriate in every situation.

Please read this section before deciding on which types of keys to use in your vault.

### App (Hardware key)

Create a hardware-backed key in your device's secure hardware (Secure Enclave on iOS; hardware-backed keystore on Android, currently in beta). This key can never be removed from your device. See our [Getting Started Guide](/chia-signer/getting-started/) for more info.

#### Bottom Line

We recommend that you use this key type as a spend key, but not as a recovery key in most situations.

#### Usage Details

**As a spend key**

- **Allowed: Yes**
- **Recommended: Yes**
- The Chia Signer app turns your phone into a hardware wallet, which you can take everywhere
- If you install the app on your primary phone, be sure to leave `Login with biometrics or device pin` enabled
- For added security, we will release a version with air-gapped signing soon
- If your phone is lost, stolen, or damaged, you can recover your vault to a new phone by using one of the recommended recovery keys

**As a recovery key**

- **Allowed: Yes**
- **Recommended: No in most circumstances**
- The hardware key cannot be copied, which means that if you lose it, it's gone forever
- If you use a hardware key as your vault's only recovery key, then you risk not being able to recover your funds
- This key type could be used as one of several recovery keys in a multisig vault, where losing a single key would not be catastrophic

### App (Software key)

This key type uses a 24-word mnemonic phrase. It allows you to store a backup in your iCloud account (for iOS devices) or another cloud provider (for Android devices, coming soon).

#### Bottom Line

This key type may not be used as a spend key. It is our recommended recovery key type for most use cases.

#### Usage Details

**As a spend key**

- **Allowed: No**
- A 24-word mnemonic phrase is not appropriate as a spend key because if someone obtains a copy of it, they can steal all of the vault's funds

**As a recovery key**

- **Allowed: Yes**
- **Recommended: Yes**
- Your key will be stored in your Chia Signer app
- We recommend saving a copy of this key to your iCloud keychain (enabled by default)
- We also recommend securing your iCloud account with two Yubikeys
- If you follow these recommendations, then nobody but you (not even Apple) will have access to the key
- If you lose your phone, then
  - Install the Chia Signer app on a new phone
  - Use the app to recover your software recovery key from your iCloud keychain
  - Use your software recovery key to recover your vault to a new hardware spend key

### Recovery phrase

This is the same key type as `App (Software key)` but instead of storing the key in your Chia Signer app, the mnemonic phrase will be be displayed for you to copy.

#### Bottom Line

This key type may not be used as a spend key. We recommend using it as a recovery key if you are not using the Chia Signer app.

#### Usage Details

**As a spend key**

- **Allowed: No**
- A 24-word mnemonic phrase is not appropriate as a spend key because if someone obtains a copy of it, they can steal all of the vault's funds

**As a recovery key**

- **Allowed: Yes**
- **Recommended: Yes**
- Carefully copy your mnemonic phrase to a safe location
- Be sure to copy the phrase correctly because we are unable to display it again later
- If you lose your spend key, then you will need to enter this phrase in order to recover your vault

### Passkey

A passkey is a replacement for a password. It can be stored in many different formats, such as in a password manager, in a web browser, on an OS keychain, or on a hardware device such as a Yubikey.

#### Bottom Line

We recommend using a passkey as a spend key if you are unable to use the Chia Signer app. We don't recommend using it as a recovery key in most situations.

#### Usage Details

**As a spend key**

- **Allowed: Yes**
- **Recommended: Yes, if unable to use the Chia Signer app**
- A passkey is a less secure option than using the Chia Signer app
- Passkeys don't have screens, so you won't be able to see what you are signing with 100% certainty (you will need to rely on blind signing)
- Be sure to take appropriate security measures to ensure that your passkey cannot easily be accessed in case your device is stolen (eg ensure that your password manager automatically locks after not being used for a few minutes)
- If your passkey is lost, stolen, or damaged, you can recover your vault to a new phone by using one of the recommended recovery keys

**As a recovery key**

- **Allowed: Yes**
- **Recommended: No in most circumstances**
- A passkey cannot be copied, which means that if you lose it, it's gone forever
- If you use a passkey as your vault's only recovery key, then you risk not being able to recover your funds
- This key type could be used as one of several recovery keys in a multisig vault, where losing a single key would not be catastrophic

### Vault

Use another Cloud Wallet vault that you control as a signer. Not available with free accounts. Typically used with multisig configurations.

#### Bottom Line

We recommend using a vault as either a spend key or a recovery key in some situations, especially as part of a multisig setup.

#### Usage Details

**As a spend key**

- **Allowed: Yes**
- **Recommended: Yes**
- Select any of your other vaults, including multisig vaults
- Modify your spend key without affecting this vault
- Maximum vault depth is 3

**As a recovery key**

- **Allowed: Yes**
- **Recommended: Yes**
- Select any of your other vaults, including multisig vaults
- Modify your recovery key without affecting this vault
- Maximum vault depth is 3

### Recovery Provider

Coming soon -- allow a trusted institution to initiate a recovery of your vault.

#### Bottom Line

Recovery providers can only be used as recovery keys. We recommend using one if you are concerned about losing access to your recovery key.

#### Usage Details

**As a spend key**

- **Allowed: No**
- We don't allow this option because it would allow the provider to drain your vault's funds

**As a recovery key**

- **Allowed: Yes**
- **Recommended: Yes, in some situations**
- If you lose your spend key, you can ask your recovery provider to initiate a recovery
- They will need to verify your identity before initiating the recovery
- If they initiate a recovery you didn't request, you can cancel it and rekey them out of your vault
- Can also be used as a "last resort" recovery signer in a multisig setup
- Recovery providers will typically charge a fee for their services

## Broadcast Messages

Token issuers can send messages to holders of their tokens. These messages can be broadcast for a number of reasons, such as notifying users of an upcoming airdrop. You can subscribe to any issuer to receive their messages.

## Topics

Token issuers can send messages with a variety of different topics. You can subscribe to your choice of topics, for example:

- /company/general
- /company/airdrops
- /company/meetups/miami
