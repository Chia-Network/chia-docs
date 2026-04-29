---
title: Getting Started
slug: /chia-signer/getting-started
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Welcome to the **Chia Signer app**, your secure companion for interacting with the Chia blockchain. This app provides a robust layer of security by allowing you to sign transactions using the dedicated hardware security of your mobile device, keeping your private keys safe.

This guide will show you how to get started with the Chia Signer app, from setting up your secure key to linking it with your Chia Cloud Wallet and approving transactions.

**Prerequisites:**

- A compatible phone or tablet for the Chia Signer app:
  - **iOS:** iPhone or iPad running **iOS 15 or later** with a **Secure Enclave**. Requirements are kept up to date on the [App Store](https://apps.apple.com/app/chia-signer/id6504493785) listing.
  - **Android** (beta): Phone or tablet that meets the requirements shown on the [Google Play listing](https://play.google.com/store/apps/details?id=net.chia.android.signer). For the strongest protection, use a device that supports **hardware-backed Keystore** (including **StrongBox** where available); if the device does not, the app can still run using **software keys** with clear in-app warnings when you create each key.

**Key Concepts:**

- **Hardware-protected keys (recommended):** On **iOS**, keys live in the **Secure Enclave**. On **Android** (beta), keys can be stored using Android’s **hardware-backed Keystore**, which may use **StrongBox** (dedicated tamper-resistant hardware) or a **Trusted Execution Environment (TEE)** when the device supports it, see Google’s [Android Keystore overview](https://developer.android.com/privacy-and-security/keystore). If your Android device does not expose suitable hardware backing, the app falls back to **software keys** and **warns you at each key creation** that the key is software-based.
- **Secure, Device-Based Approval:** The Signer app allows you to securely approve transactions initiated from your Chia Cloud Wallet on a separate, dedicated device.
- **Two-Device Requirement:** Currently, the Chia Cloud Wallet and Chia Signer app must be on separate devices (for example, Chia Cloud Wallet on your computer or phone, and Signer on another smartphone).

## 1. Get the Chia Signer App

- **iOS:** [App Store](https://apps.apple.com/app/chia-signer/id6504493785).
- **Android** (beta): [Google Play](https://play.google.com/store/apps/details?id=net.chia.android.signer).

## 2. Create a New Key in the Chia Signer App

After installing and opening the app for the first time:

1. **Add Key:** Tap the ellipsis (the `...` button in the upper-right corner), then tap the `+ Add Key` button.
2. **Name Your Key:** Enter a descriptive name for your key (e.g., "My Vault Key" or "Main Signer Key").

<Tabs groupId="signer-create-key">
<TabItem value="ios" label="iOS">

### Generate Key on iOS

3. **Generate Key:** Tap **Generate Key**. The app creates a **hardware-backed key** in your device’s **Secure Enclave**. Private key material stays in that hardware and is not exposed to normal app memory.

</TabItem>
<TabItem value="android" label="Android (beta)">

### Hardware check on first start

The Android app is in **beta**. When you first start the app, it checks whether your device supports **hardware-backed key storage** through Android’s [Keystore](https://developer.android.com/privacy-and-security/keystore) system. Depending on the device, that may use:

- **StrongBox** — dedicated tamper-resistant hardware (a discrete secure module) used for Android’s hardware-backed Keystore on devices that ship StrongBox, or
- **TEE-backed Keystore** — keys handled inside a Trusted Execution Environment when StrongBox is not available but the device still offers hardware-isolated key storage.

If the device **does not** provide the required hardware backing, the app will only offer **software keys**.

### Generate Key on Android

3. **Generate Key:** Tap **Generate Key** and follow the prompts.
   - **Hardware available:** You can create **hardware-backed keys** (private key material remains in secure hardware).
   - **No suitable hardware:** You can create **software keys** only. **Each time** you create a key, the app **alerts you** that you are creating a **software key** (not hardware-protected).

</TabItem>
</Tabs>

5. **View Key:** Your newly created key will now appear on the app's main screen.

## 3) Link Your Chia Signer Key to a Chia Cloud Wallet Vault

This step connects your secure key in the Signer app to a specific vault created in the Chia Cloud Wallet.

1. **Initiate Linking (from Chia Cloud Wallet):** On your separate device (where you access your Chia Cloud Wallet), you will begin the process of creating or linking a vault as described [here](/cloud-wallet/getting-started). The Chia Cloud Wallet will display a **QR Code**.

2. **Link Key from Chia Signer App:**
   There are two primary methods to link a key, depending on whether you've already created the key in the Signer app or are linking for the first time:
   - **Method A: Linking an Existing Key (after you have created and named a key above)**
     1. Open the Chia Signer app and ensure your existing key is visible on the main screen.
     2. Tap on the specific key you wish to link.
     3. Locate and tap the "Link Key" button (this will activate your device's camera).
     4. Use your device's camera to scan the QR code displayed by your Chia Cloud Wallet.

   - **Method B: Linking and/or Creating a Key via Main Screen Scan**
     1. From the Chia Signer app's main screen, tap the scan button (often located in the lower-middle part of the screen, resembling a QR code scanner icon). This will activate your device's camera.
     2. Use your device's camera to scan the QR code displayed by your Chia Cloud Wallet.
     3. After scanning, the app will prompt you to "Choose a key."
        - If you have existing keys, select the one you wish to link.
        - If you need to create a new key, select Generate Key and follow the steps to name and create your key.

3. **Confirm Link:**
   - Regardless of the method used, after selecting or creating your key, confirm the link. Tap the `Link key` button (if not already pressed).
   - The Signer app will communicate with the Chia Cloud Wallet to establish the secure link.
   - If successful, you will typically see a confirmation, such as a green checkmark, on both the Signer app and the Chia Cloud Wallet interface.

## 4) Sign Transactions with the Chia Signer App

Once linked, your Signer app becomes the gatekeeper for all transactions from that specific Chia Cloud Wallet vault.

1. **Initiate Transaction (from Chia Cloud Wallet):** When you want to send funds or perform other actions from your Chia Cloud Wallet, you will set up the transaction details in the Chia Cloud Wallet interface and click "Send" or confirm the action.
2. **Receive Signing Request (on Chia Signer App):** The Chia Signer app will automatically receive a transaction signing request. You will see a notification or the app will open, displaying the transaction details.
3. **Review Details:** Carefully review all the transaction details shown on your Chia Signer app screen (e.g., recipient address, amount, fee). This is your last chance to verify the transaction before it is sent.
4. **Sign Transaction:** If the details are correct, scroll down and tap the `Sign transaction` button within the Chia Signer app.
   - Your device may require a biometric (Face ID, Touch ID, fingerprint) or passcode confirmation to authorize the signing.
5. **Confirmation:** Once signed, the transaction is sent to the Chia network via your Chia Cloud Wallet, and you should see a confirmation message on both the Signer app and the Chia Cloud Wallet.
