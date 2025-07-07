---
title: FAQ
slug: /chia-signer/faq
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Chia Signer App: Frequently Asked Questions (FAQ)

### What is the Chia Signer app?

The Chia Signer app is a dedicated mobile application currently available for iOS devices designed to provide an enhanced layer of security for your Chia Wallet transactions. It allows you to securely store your private keys in your phone's Secure Enclave and approve transactions initiated from your Chia Wallet.

### What are the key benefits of using the Chia Signer app?

- **Secure Enclave Protection:** Your private keys are generated and stored within your device's Secure Enclave, a hardware-isolated security component. This means your keys never leave your device and are highly protected against software vulnerabilities.
- **Clear Transaction Review:** The app displays full transaction details on your device's screen, allowing you to review exactly what you are signing before approval, mitigating risks like "blind signing."
- **Enhanced Security:** By separating your signing key from your main Cloud Wallet interface (requiring two devices), it adds a significant layer of security against online threats and unauthorized access.

### What are the device requirements for the Chia Signer app?

To use the Chia Signer app, your iOS device must:

- Run **iOS 15 or later**.
- Have a **Secure Enclave** (most iPhone models starting with iPhone 6s and iPad models starting with iPad mini 4 or newer typically have this).

### Can I use the Chia Cloud Wallet and the Chia Signer app on the same device?

Currently, no. For security purposes, you need two separate devices: one for accessing your Chia Cloud Wallet (e.g., a computer or another phone) and a separate iOS device with the Chia Signer app installed. This functionality (using both on the same device) is planned for a future release.

### How do I create a new key within the Chia Signer app?

After opening the app for the first time, you can tap the `+` button, name your key, and select "Generate Key." This will securely generate a new private key within your device's Secure Enclave.

### How do I link my Chia Signer key to a Chia Cloud Wallet vault?

The linking process involves scanning a QR code displayed by your Cloud Wallet using the Signer app. Depending on whether you've already created the key in the Signer app, you can either:

- Tap on your existing key in the Signer app and select "Link Key," then scan the QR code.
- Or, from the Signer app's main screen, tap the scan button, scan the QR code, and then select an existing key or create a new one as prompted.

### How do I sign a transaction using the Chia Signer app?

When you initiate a transaction from your linked Chia Cloud Wallet, the Chia Signer app on your iOS device will receive a request. You will review the transaction details presented on the Signer app's screen and, if correct, tap "Sign transaction." Your device may require a biometric (Face ID/Touch ID) or passcode confirmation to authorize the signing.

### Is an Android version of the Chia Signer app available?

Currently, the Chia Signer app is only available for iOS devices. An Android version is planned for a future release.

### Can the Chia Signer app be used as the Chia Cloud Wallet recovery key?

Currently, the Chia Signer app can only be used as the custody key for your vault but the ability to use it for the recovery key is planned for a future release.
