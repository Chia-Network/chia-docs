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

1. **New Device** -- If you use the Chia Signer app, then your vault's spend key is stored in your smartphone's Secure Element. It can never be copied or moved to another device, so when you obtain a new phone, you will need to recover your vault. As long as you still have your original phone, you can instantly rekey your vault to use your new device.

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

## Broadcast Messages

Token issuers can send messages to holders of their tokens. These messages can be broadcast for a number of reasons, such as notifying users of an upcoming airdrop. You can subscribe to any issuer to receive their messages.

## Topics

Token issuers can send messages with a variety of different topics. You can subscribe to your choice of topics, for example:

- /company/general
- /company/airdrops
- /company/meetups/miami

## Transaction states

These labels describe the lifecycle of a transaction in your vault. For more on clawbacks and pending activity, see [Clawback](#clawback) and the [FAQ](/cloud-wallet/faq/).

### Transaction UNSIGNED

The transaction is a draft. Your coins are still in your vault, but they are locked in reserve for the transaction.

**Action:** Do one of the following:

- Sign the transaction, after which it will automatically be submitted to the mempool.
- Delete the transaction, which will unlock the coins for future use.

### Transaction SIGNED

The transaction is signed on your side; it has not been accepted into the mempool yet. The Chia Cloud Wallet will submit it automatically and once broadcast is accepted in the mempool, the status will update to Transaction MEMPOOL.

If the mempool is busy or the fee is too low, it can take noticeable time before submission succeeds. Waits of up to about 45 minutes before the status advances beyond Transaction SIGNED are not unusual.

**Action:** Wait for the status to advance (usually to Transaction MEMPOOL); if the transaction stays in Transaction SIGNED for more than 45 minutes, please contact our support team with the in-app form or in [discord](https://discord.gg/chia).

### Transaction MEMPOOL

The transaction has been submitted to the mempool (broadcast accepted). The associated coins have left your available balance, but the transaction is not yet confirmed in a block. If the mempool is busy and the fee is not large enough, waits of up to about 45 minutes for block inclusion are common.

**Action:** Wait for the network to include the transaction in a block; if the transaction remains in this state for more than 45 minutes, please contact our support team with the in-app form or in [discord](https://discord.gg/chia).

### Transaction PENDING

The transaction is being prepared or is waiting on another step (for example vault coordination or signer availability) before it can be submitted or advance to the mempool. It is not yet fully signed or broadcast. **Action:** Complete any prompts or signing steps in the Cloud Wallet; if the status does not change for an extended time, refresh the app or contact our support team with the in-app form or in [discord](https://discord.gg/chia).

### Transaction SETTLED

Transaction has completed and coins have successfully transferred to the destination. **Action:** None. Transaction is complete.

### Transaction RE_ORG

This transaction was part of a blockchain re-org and coins have not been transferred. **Action:** Confirm the coin status with the other party of the transaction and ensure they resync their vault as needed; you will likely need to recreate and submit this transaction from the initiating vault. If questions arise please contact our support team with the in-app form or in [discord](https://discord.gg/chia).

### Transaction INVALID

The transaction failed (likely due to low fees or a conflict) and coins have not been transferred. **Action:** Re-create the transaction with corrected details.

## Offer states

These labels describe the lifecycle of an offer. For context on vault-based offers, see [Known issues](/cloud-wallet/known-issues/).

### Offer OPEN

The offer is active and available for others to accept (others will need a copy of the offer file to accept it). Coins are reserved in your vault and may have been moved to an offer reservation address controlled by your vault (based on whether you enabled the auto-split feature when creating the offer). **Action:** Wait for a counterparty to accept or cancel the offer if you no longer wish to trade.

### Offer MEMPOOL

An acceptance of the offer has been broadcast to the network. The associated coins have left your available balance but are not yet confirmed. **Action:** Wait for the transaction to be included in a block; if the transaction remains in this state for more than 45 minutes please contact our support team with the in-app form or in [discord](https://discord.gg/chia).

### Offer SETTLED

The trade was successful and the exchange of coins is final. **Action:** None. The offer is complete.

### Offer RE_ORG

This offer was part of a blockchain re-org and coins have not been transferred. **Action:** Confirm the coin status with the other party and ensure they resync their vault as needed; you may need to recreate or resubmit this offer. If questions arise please contact our support team with the in-app form or in [discord](https://discord.gg/chia).

### Offer EXPIRED

The time limit for this offer has passed and coins are no longer reserved. **Action:** Create a new offer if you still wish to trade.

### Offer INVALID

The offer can no longer be fulfilled (e.g., coins were spent elsewhere or fees were too low). **Action:** Remove the offer and create a new one with available funds.

### Offer PENDING

The offer is being prepared, validated, or updated; reserved coins may still be settling into the correct shape for the offer. **Action:** Wait for the status to advance to Open or another terminal state; if it stays pending for an extended time, try refreshing or contact our support team with the in-app form or in [discord](https://discord.gg/chia).

## Vault recovery states

These are workflow states during a vault [recovery](#recovery). See [Instant Recovery](#instant-recovery) and [Timelocked Recovery](#timelocked-recovery) for types of recovery.

### Recovery IDLE

No recovery is in progress, or the last recovery-related transaction has settled and the vault is no longer in an active recovery workflow. **Action:** None unless you intend to start or continue a recovery.

### Recovery AWAITING_REVIEW

A recovery request has been submitted and is waiting for review by a [recovery provider](#recovery-provider), when one is configured. **Action:** Wait for the provider; follow any email or in-app instructions. If nothing changes for an unusually long time, contact the recovery provider or support with the in-app form or in [discord](https://discord.gg/chia).

### Recovery PENDING

The recovery request is waiting for your signature (after provider approval, if applicable, or when using a direct recovery path). **Action:** Open the signing flow and complete the required signatures.

### Recovery SIGNED

The recovery transaction has been signed on your side but has not yet been submitted to the blockchain. **Action:** Wait for submission; if it remains here, retry or check connectivity, or contact support with the in-app form or in [discord](https://discord.gg/chia).

### Recovery SUBMITTED

The recovery transaction has been submitted to the blockchain and is awaiting confirmation or further processing. **Action:** Wait for block inclusion; see [Transaction MEMPOOL](#transaction-mempool) if you need general context on mempool behavior.

### Recovery TIMELOCK

The recovery has been processed by blockchain sync: your vault is in the recovery timelock period described under [Recovery timer](#recovery-timer) and [Recovery clawback](#recovery-clawback). **Action:** Monitor the timer; you can cancel the recovery with the spend key during this window if appropriate, or wait until the timelock completes.

### Recovery TIMELOCK_COMPLETE

The recovery timelock has completed according to chain state. You may [claw back](#clawback) the recovery attempt or finish the recovery, depending on your situation. **Action:** Follow the Cloud Wallet prompts to either complete recovery or cancel it.

### Recovery FINISH_SIGNED

The transaction to finish recovery has been signed but not yet submitted. **Action:** Wait for broadcast or complete any remaining submit step.

### Recovery FINISH_SUBMITTED

The finish-recovery transaction has been submitted to the blockchain. **Action:** Wait for confirmation before assuming recovery is complete.

### Recovery CLAWBACK_SIGNED

The transaction to claw back the recovery attempt has been signed but not yet submitted. **Action:** Wait for broadcast or complete any remaining submit step.

### Recovery CLAWBACK_SUBMITTED

The clawback transaction has been submitted to the blockchain. **Action:** Wait for confirmation and verify vault status in the vault.

## Vault state

These labels match high-level status shown in the Chia Cloud Wallet UI (heading names follow the in-app strings where noted). They overlap with [Vault recovery states](#vault-recovery-states) when a recovery is in progress. Unless referring to the Chia Cloud Wallet product by name, descriptions use vault for your custody.

### Vault READY

The vault is ready for transfers and normal operations.

### Vault VAULT_PENDING_CREATE

The vault singleton has been minted and is in the mempool; the vault is not fully ready until creation confirms.

### Vault VAULT_RECOVERY_TIMELOCK

The vault is in a recovery flow and the recovery timelock is active. You may be able to claw back the recovery or, after the timelock has passed, complete recovery; see Recovery TIMELOCK under [Vault recovery states](#vault-recovery-states).

### Vault VAULT_RECOVERY_TIMELOCK_COMPLETE

The vault’s recovery timelock has completed on chain. You can claw back the recovery attempt or finish recovery. **Action:** Follow in-app steps; see **Recovery TIMELOCK_COMPLETE** under [Vault recovery states](#vault-recovery-states).
