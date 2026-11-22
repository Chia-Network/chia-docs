---
title: FAQ
slug: /chia-signer/faq
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Chia Signer App: Frequently Asked Questions (FAQ)

### What is the Chia Signer app?

The Chia Signer app is a dedicated mobile application for iOS and Android that provides an enhanced layer of security for your Chia Wallet transactions. On iOS, keys are stored in the Secure Enclave. Android is currently in **beta**; on first launch the app checks for hardware-backed key storage via Android’s Keystore (including StrongBox or TEE-backed storage when the device supports it). If suitable hardware is not available, you can still use software keys; the app warns you on each software key creation that the key is not hardware-protected.

### What are the key benefits of using the Chia Signer app?

- **Hardware-protected keys:** Your private keys are generated and stored in hardware-isolated security components on the device. They are not exposed to normal app memory and are highly protected against many software-level attacks.
- **Secure, Device-Based Approval:** The Signer app allows you to securely approve transactions initiated from your Chia Cloud Wallet on a separate, dedicated device.
- **Enhanced Security:** By separating your signing key from your main Chia Cloud Wallet interface (requiring two devices), it adds a significant layer of security against online threats and unauthorized access.

### What are the device requirements for the Chia Signer app?

**iOS**

- See the [App Store listing](https://apps.apple.com/app/chia-signer/id6504493785) for compatible devices and the minimum iOS version. In general, you need iOS 15 or later and a Secure Enclave.

**Android** (beta)

- The Android app is in **beta**. Use the [Google Play listing](https://play.google.com/store/apps/details?id=net.chia.android.signer) for compatible devices, OS version, and install eligibility. Hardware-backed keys require device support for Android’s hardware-backed Keystore (e.g. StrongBox or TEE); see Google’s [Keystore documentation](https://developer.android.com/privacy-and-security/keystore). Devices without that backing use software keys with in-app notices at creation time as these keys are inherently less secure than hardware keys.

### Can I use the Chia Cloud Wallet and the Chia Signer app on the same device?

Currently, no. For security purposes, you need two separate devices: one for accessing your Chia Cloud Wallet (e.g., a computer or another phone) and a separate smartphone with the Chia Signer app (iOS, or Android in beta). Using both on the same device is planned for a future release.

### How do I create a new key within the Chia Signer app?

Tap the ellipsis (the `...` button in the upper-right corner), then tap the `+ Add Key` button, name your key, optionally change the emoji, and select **Generate Key**. We recommend that you leave the `Secure your key` slider enabled.

You also have the option to create either a `Hardware key` (a spend key) or a `Software key` (a recovery key). If you choose `Hardware key`, then the key's location will depend on your phone's hardware and OS:

- **iOS:** The app creates a hardware-backed key in the Secure Enclave.
- **Android** (beta): On first start, the app checks for hardware-backed Keystore support. Depending on your phone's manufacturer and model, one of three options will be selected automatically:
  - StrongBox
    - most secure option
    - uses a dedicated Hardware Security Module (HSM)
    - resistant to hardware tampering
    - only available on select Android devices ([list of currently supported devices](https://www.android-device-security.org/database/?sortBy=COUNT%20Lab%20Strongbox%20True;COUNT%20Lab%20Strongbox%20False&order=-1&show=Strongbox&Strongbox=True&realMeasurementsOnly=true))
  - Trusted Execution Environment (TEE)
    - less secure than StrongBox
    - separates secure and non-secure execution environments
    - available on most Android devices
  - Neither
    - least secure option
    - Signer app will fall back to using a software key
    - Signer app will alert you each time that the new key is a software key

:::info

The Android Chia Signer app currently shows the same messaging for phones with a TEE and for those that only support software keys. We will update this messaging in a future release. If your phone does have a TEE, the hardware keys will be created in the TEE despite this messaging.

:::

### Is a TEE secure enough to be used with the Android Signer app?

Our security best practice for the Android Signer app is to use a phone with a StrongBox. However, depending on your personal risk assessment, a phone with a TEE may also suffice.

A key stored in a TEE is at a higher risk of compromise than one stored in a StrongBox. [This article](https://www.comviva.com/blog/safeguarding-cryptographic-keys-implementing-tee-and-strongbox-in-android-applications/) describes the differences between the environments. If you feel that a TEE is not secure enough (for example, if you plan to store large amounts of funds in a Cloud Wallet vault), then you can acquire a device with a StrongBox for the highest level of security available on an Android device.

### How do I link my Chia Signer key to a Chia Cloud Wallet vault?

The linking process involves scanning a QR code displayed by your Chia Cloud Wallet using the Signer app. Depending on whether you've already created the key in the Signer app, you can either:

- Tap on your existing key in the Signer app and select "Link Key," then scan the QR code.
- Or, from the Signer app's main screen, tap the scan button, scan the QR code, and then select an existing key or create a new one as prompted.

### How do I sign a transaction using the Chia Signer app?

When you initiate a transaction from your linked Chia Cloud Wallet, the Chia Signer app on your signing device will receive a request. You will review the transaction details presented on the Signer app's screen and, if correct, tap "Sign transaction." Your device may require a biometric (Face ID, Touch ID, fingerprint) or passcode confirmation to authorize the signing.

### Does Chia Network have access to my Signer keys, or can CNI recover my vault if I lose both keys?

**No.** Chia Network, Inc. (CNI) does **not** have access to your **spend keys** or **recovery keys**, whether they are held in the Chia Signer app, as passkeys, or as a BLS recovery phrase you manage yourself. Signing material is generated and kept under your control; CNI does not hold copies in a form that would let us sign on your behalf.

If you permanently lose access to **both** your spend key and your recovery key (including backups), **CNI cannot recover your keys or restore vault access for you**.

### Is an Android version of the Chia Signer app available?

Yes, the android version is currently in beta: [Google Play](https://play.google.com/store/apps/details?id=net.chia.android.signer).

### Can the Chia Signer app be used as the Chia Cloud Wallet recovery key?

是的。 Your vault’s recovery key remains a BLS key with an associated 24-word mnemonic seed phrase; the Chia Signer app can store and use that BLS recovery key for you. Spend keys cannot be BLS—they stay passkeys or Chia Signer hardware/software keys.

We strongly recommend keeping the recovery key on a different device than the spend key. If both the spend key and BLS recovery material live only on the same phone and you lose access to it, you may be unable to spend or complete recovery. Chia Network cannot reset your keys or restore vault access for you.

If recovery and spend might share one device, or you use Signer-held recovery in any other setup, back up your recovery credentials with care:

- On Apple devices, use iCloud Keychain with Advanced Data Protection enabled.

- On Android, use encrypted credential storage and backups tied to a strongly secured Google account: a screen lock, 2-step verification, and passkeys or hardware security keys where available. A password manager with strong 2FA is also appropriate.

- On any platform, use a reputable password manager secured with strong 2FA—prefer passkeys or hardware security keys for the manager and your cloud accounts, not SMS-only verification.

Treat any copy of recovery material like any other 24 word mnemonic seed phrase: anyone who obtains it may be able to attempt recovery.
