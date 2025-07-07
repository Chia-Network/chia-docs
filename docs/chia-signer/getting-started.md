---
title: Getting Started
slug: /chia-signer/getting-started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome to the **Chia Signer app**, your secure companion for interacting with the Chia blockchain. This app provides a robust layer of security by allowing you to sign transactions using the dedicated hardware security of your mobile device, keeping your private keys safe.

This guide will show you how to get started with the Chia Signer app, from setting up your secure key to linking it with your Cloud Wallet and approving transactions.

**Prerequisites:**

- An iOS device (iPhone or iPad) running iOS 15 or later and has the Secure Enclave.

**Key Concepts:**

- **Secure Enclave Protection:** Your private keys are generated and stored in your device's Secure Enclave, a dedicated hardware security module, ensuring they never leave your device.
- **Clear Transaction Review:** The Signer app allows you to review all transaction details on your device's screen before approval, preventing "blind signing."
- **Two-Device Requirement:** Currently, the Cloud Wallet and Chia Signer app must be on separate devices (e.g., Cloud Wallet on your computer/phone, Signer on your iPhone).

## 1. Get the Chia Signer App

- **Download:** The Chia Signer app is available on the [iOS App Store](https://apps.apple.com/app/chia-signer/id6504493785). (Note: An Android version is planned for the future).

## 2. Create a New Key in the Chia Signer App

After installing and opening the app for the first time:

1.  **Add Key:** Tap the `+` button, usually located in the upper-right corner of the app's main screen.
2.  **Name Your Key:** Enter a descriptive name for your key (e.g., "My Vault Key" or "Main Signer Key").
3.  **Generate Key:** Select the option to "Generate Key" (currently, the only option is to create a hardware key directly in your device's Secure Enclave). Tap `Generate Key`. (NOTE: Software key options planned for the future).
    - Your device will securely generate and store a new private key within its Secure Enclave.
4.  **View Key:** Your newly created key will now appear on the app's main screen.

## 3. Link Your Chia Signer Key to a Cloud Wallet Vault

This step connects your secure key in the Signer app to a specific vault created in the Chia Cloud Wallet.

1.  **Initiate Linking (from Cloud Wallet):** On your separate device (where you access your Cloud Wallet), you will begin the process of creating or linking a vault as described [here](/cloud-wallet/getting-started). The Cloud Wallet will display a **QR Code**.

2.  **Link Key from Chia Signer App:**
    There are two primary methods to link a key, depending on whether you've already created the key in the Signer app or are linking for the first time:
    - **Method A: Linking an Existing Key (Key selected in Step 2)**
      1.  Open the Chia Signer app and ensure your existing key is visible on the main screen.
      2.  Tap on the specific key you wish to link.
      3.  Locate and tap the "Link Key" button (this will activate your device's camera).
      4.  Use your device's camera to scan the QR code displayed by your Cloud Wallet.

    - **Method B: Linking and/or Creating a Key via Main Screen Scan**
      1.  From the Chia Signer app's main screen, tap the scan button (often located in the lower-middle part of the screen, resembling a QR code scanner icon). This will activate your device's camera.
      2.  Use your device's camera to scan the QR code displayed by your Cloud Wallet.
      3.  After scanning, the app will prompt you to "Choose a key."
          - If you have existing keys, select the one you wish to link.
          - If you need to create a new key, select Generate Key and follow the steps to name and create your key.

3.  **Confirm Link:**
    - Regardless of the method used, after selecting or creating your key, confirm the link. Tap the `Link key` button (if not already pressed).
    - The Signer app will communicate with the Cloud Wallet to establish the secure link.
    - If successful, you will typically see a confirmation, such as a green checkmark, on both the Signer app and the Cloud Wallet interface.

## 4. Sign Transactions with the Chia Signer App

Once linked, your Signer app becomes the gatekeeper for all transactions from that specific Cloud Wallet vault.

1.  **Initiate Transaction (from Cloud Wallet):** When you want to send funds or perform other actions from your Cloud Wallet, you will set up the transaction details in the Cloud Wallet interface and click "Send" or confirm the action.
2.  **Receive Signing Request (on Chia Signer App):** The Chia Signer app will automatically receive a transaction signing request. You will see a notification or the app will open, displaying the transaction details.
3.  **Review Details:** **Carefully review all the transaction details** shown on your Chia Signer app screen (e.g., recipient address, amount, fee). This is your last chance to verify the transaction before it is sent.
4.  **Sign Transaction:** If the details are correct, scroll down and tap the `Sign transaction` button within the Chia Signer app.
    - Your device may require a biometric (Face ID/Touch ID) or passcode confirmation to authorize the signing.
5.  **Confirmation:** Once signed, the transaction is sent to the Chia network via your Cloud Wallet, and you should see a confirmation message on both the Signer app and the Cloud Wallet.
