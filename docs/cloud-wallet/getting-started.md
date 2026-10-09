---
title: Getting Started
slug: /cloud-wallet/getting-started
---

Set up a Chia Cloud Wallet at [vault.chia.net](https://vault.chia.net/). You will create an account, then a vault to hold your XCH. It takes a few minutes.

## Create an account

1. Click **Sign Up**.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/getting-started-01_login_light.png" alt="Chia Cloud Wallet login page with Sign Up" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/getting-started-01_login_dark.png" alt="Chia Cloud Wallet login page with Sign Up" width="100%" className="theme-image-dark"/>
</div>

2. Choose the **Free** plan, enter your email, and click **Continue**. Pro and Enterprise are not available yet.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/getting-started-02_signup_light.png" alt="Choose a plan and enter an email" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/getting-started-02_signup_dark.png" alt="Choose a plan and enter an email" width="100%" className="theme-image-dark"/>
</div>

3. Enter the 6-digit code sent to your email and click **Verify**.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/getting-started-03_verify_email_light.png" alt="Verify your email with a 6-digit code" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/getting-started-03_verify_email_dark.png" alt="Verify your email with a 6-digit code" width="100%" className="theme-image-dark"/>
</div>

4. Enter your name, name the passkey, and click **Set New Passkey**. This passkey is how you sign in. The Chia Signer app cannot be used as the login passkey.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/getting-started-04_passkey_light.png" alt="Set a name and a login passkey" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/getting-started-04_passkey_dark.png" alt="Set a name and a login passkey" width="100%" className="theme-image-dark"/>
</div>

## Create a vault

1. On **Add Your First Vault**, click **Create** on **Single Signature Vault**.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/getting-started-05_add_vault_light.png" alt="Add your first vault" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/getting-started-05_add_vault_dark.png" alt="Add your first vault" width="100%" className="theme-image-dark"/>
</div>

2. Name the vault.

3. Choose a spend key. **App (Hardware Key)** is the usual choice. On the same device, use **Link via Chia Signer App**. On another device, scan the QR code. Create the key in the Signer app first. See [Chia Signer](/chia-signer/getting-started).

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/getting-started-06_create_vault_light.png" alt="Name the vault and link a Chia Signer spend key" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/getting-started-06_create_vault_dark.png" alt="Name the vault and link a Chia Signer spend key" width="100%" className="theme-image-dark"/>
</div>

Use **Passkey** only if you do not have an iPhone or Android phone. That passkey is also your login. Losing it affects both signing in and signing transactions.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/getting-started-06_passkey_spend_light.png" alt="Passkey selected as the vault spend key" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/getting-started-06_passkey_spend_dark.png" alt="Passkey selected as the vault spend key" width="100%" className="theme-image-dark"/>
</div>

4. Leave **Watchtower Notifications** on so you get an email if someone starts a recovery. Add another email address when you can. See [Watchtowers](/cloud-wallet/faq#watchtowers). Click **Next**.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/getting-started-07_watchtower_light.png" alt="Watchtower notifications enabled on create vault" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/getting-started-07_watchtower_dark.png" alt="Watchtower notifications enabled on create vault" width="100%" className="theme-image-dark"/>
</div>

5. Write down the 24-word recovery phrase, in order, and store it somewhere safe. Chia does not keep a copy. You need these words to recover the vault. See [Recovery](/cloud-wallet/recovery).

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/getting-started-08_recovery_phrase_light.png" alt="24-word recovery phrase" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/getting-started-08_recovery_phrase_dark.png" alt="24-word recovery phrase" width="100%" className="theme-image-dark"/>
</div>

6. You can set a recovery clawback window before the vault is created. That is how long you have to cancel a recovery if the phrase is stolen. The default is fine for most people. Details are in [Recovery](/cloud-wallet/recovery).

7. Enter the highlighted words to confirm the phrase, check the box, and click **Create**.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/getting-started-10_verify_phrase_light.png" alt="Verify the recovery phrase before creating the vault" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/getting-started-10_verify_phrase_dark.png" alt="Verify the recovery phrase before creating the vault" width="100%" className="theme-image-dark"/>
</div>

8. The vault is minted in about a minute or two. The receive address appears when that finishes.

<div style={{ textAlign: 'left', marginBottom: '1rem' }}>
  <img src="/img/cloud-wallet/getting-started-11_vault_created_light.png" alt="New vault while the receive address is being minted" width="100%" className="theme-image-light"/>
  <img src="/img/cloud-wallet/getting-started-11_vault_created_dark.png" alt="New vault while the receive address is being minted" width="100%" className="theme-image-dark"/>
</div>

To buy XCH into this vault, see [Buy XCH](/cloud-wallet/buy-xch).

## Sending funds

Open the vault and click **Send XCH**. Enter the destination, amount, and an optional fee, then sign with the vault spend key. A passkey vault asks for the passkey on this device. A Signer vault sends a signature request to the Chia Signer app. Confirm the details match, then approve.

- Clawback on a send: [Send Clawback](/cloud-wallet/send-clawback)
- Saved recipients: [Address Book](/cloud-wallet/address-book)
- CATs and other assets: [Tokens](/cloud-wallet/tokens)
- Lost spend key or phrase: [Recovery](/cloud-wallet/recovery)
- Help inside the app: [In App Support](/cloud-wallet/in-app-support)
- Signer setup and signing: [Chia Signer](/chia-signer/getting-started)
- Common questions: [FAQ](/cloud-wallet/faq)

## Using testnet

Developers can try Cloud Wallet with testnet TXCH at [vault.chiatest.net](https://vault.chiatest.net/). Account and vault setup work the same way as on mainnet. After the vault is created, request TXCH from the [official faucet](https://testnet11-faucet.chia.net/) or the [community faucet](https://txchfaucet.com/) using the vault's receive address. Funds usually arrive within a few minutes.
