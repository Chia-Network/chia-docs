---
slug: /getting-started/cloud-wallet/getting-started
title: Getting Started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome to the Chia Cloud Wallet, a new platform for interacting with the Chia blockchain. Assets are stored in vaults, in an app that is always synced with the blockchain. The Cloud Wallet is currently in beta, running on testnet11.

This guide will show you how to create your first Cloud Wallet vault in a few easy steps.

1. Browse to the [Cloud Wallet website](https://vault.chiatest.net).

2. Click the `Sign Up` button:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/01_front_page.png" alt="Welcome to the Cloud Wallet" width="100%"/>
</div>

3. Enter your email address and click `Continue`.

4. Within a few minutes, you should receive an email with the subject "Chia cloud wallet email verification link". Click the link in the email.

5. Enter your name and click `Set new Passkey`:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/02_set_passkey.png" alt="Set a new passkey" width="100%"/>
</div>

6. You will be given a variety of options for adding a new passkey, for example in a hardware key, a password manager, or the OS keychain. This passkey will be your primary method for signing into the Cloud Wallet. It can also be used for signing Chia transactions.

Congratulations, you're all set to create your first vault!

## Create a vault

:::info

Currently, in order to use the Chia Signer app, you will need two separate devices:

1. A computer or phone to access your vault
2. An iOS device on which the Chia Signer app is installed

You cannot use both the Cloud Wallet and the Chia Signer app on the same device yet. However, we do intend to enable this functionality in a future release.

:::

1. The free tier of the Cloud Wallet only allows you to create a single vault, so you will need to choose from one of the two options. Let's create a vault using the Chia Signer app:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/03_choose_vault_type.png" alt="Create vault with signer app" width="100%"/>
</div>

2. Give your vault a name, for example `My Signer Vault`.

3. You will need to scan the QR code using your Chia Signer app. If you don't have the app yet, you can download it from the [iOS App Store](https://apps.apple.com/app/chia-signer/id6504493785).

   Note: The Chia Signer app currently is only built for iOS devices. We will build an Android version of the app in the future.

   <div style={{ textAlign: 'left' }}>
     <img src="/img/cloud-wallet/03_choose_vault_type.png" alt="Create vault with signer app" width="100%"/>
   </div>

4. From the Chia Signer app, tap the `+` button in the upper-right corner to add a new key:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/04_new_key.png" alt="Create a new key" width="40%"/>
</div>

5. Give your new key a name, for example `My Key`. Currently, the only option is to create a hardware key directly in your device's Secure Enclave. Tap `Generate Key`:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/05_generate_key.png" alt="Generate a hardware key" width="40%"/>
</div>

6. Your new key will show up in the app's main screen. Tap the button in the lower-middle part of the app and scan the QR code:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/06_scan_button.png" alt="Tap the scan button" width="40%"/>
</div>

7. Tap `Choose a key`:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/07_choose_key.png" alt="Tap the Choose a key button" width="40%"/>
</div>

8. Tap your new key:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/08_new_key.png" alt="Tap your new key" width="40%"/>
</div>

9. Tap the `Link key` button:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/09_link_key.png" alt="Link your key to your vault" width="40%"/>
</div>

10. If a green check box appears over the QR code, then your signer app was successfully linked to your vault:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/10_key_linked.png" alt="Signer successfully linked" width="100%"/>
</div>

11. Next, copy the 24 words to a safe location. You will need to recall these words in order to recover your vault, so don't lose them.

12. You can also set a custom time for your vault's recovery clawback. This is the amount of time you will need to wait in order to recover your vault. If your 24-word recovery phrase is stolen, then you will have this long to cancel the recovery.

Note that for the testnet beta version of the Cloud Wallet, the default timer is 15 minutes. If this were a real vault running on mainnet, then you would likely want to set the timer to a day or more.

13. Click the `Create` button to create your vault. A "vault faucet" will mint a new vault for you. Your vault's receive address will appear after this process is complete (typically a minute or two).

You are now ready to receive funds in your new vault. Testnet11 uses a test currency called TXCH. To obtain some TXCH, you can visit either our [official faucet site](https://testnet11-faucet.chia.net) or a [community-run faucet](https://txchfaucet.com), and enter your vault's address. You should receive some funds for testing within a few minutes.

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/11_vault_1_txch.png" alt="Vault with 1 txch" width="100%"/>
</div>

## Sending funds

Your vault uses the Chia Signer app to sign transactions. Click the `Send` button to begin the process of sending funds.

1. Enter a destination address, amount to send, and an optional blockchain fee, then click `Send`:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/12_send_funds.png" alt="Enter info and click Send" width="100%"/>
</div>

2. You will be shown the details of the transaction:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/13_tx_details.png" alt="View transaction details" width="100%"/>
</div>

3. Simultaneously, your device with the Chia Signer app should receive a push notification with a signature request. This notification will contain the details of the transaction. Scroll through this request to ensure that everything matches what you see from the Cloud Wallet, and tap `Sign transaction`:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/14_signature_request.png" alt="Signature request" width="40%"/>
</div>

4. You should see a "success" message on both the Chia Signer app and the Cloud Wallet:

<div style={{ textAlign: 'left' }}>
  <img src="/img/cloud-wallet/15_successfully_signed.png" alt="Successfully signed" width="100%"/>
</div>
