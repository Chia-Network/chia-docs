---
title: Tooltips
slug: /cloud-wallet/tooltips
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

Create a key in your iPhone's Secure Enclave (coming soon for Android phones). This key can never be removed from your device. See our [Getting Started Guide](/chia-signer/getting-started/) for more info.

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
