---
slug: /getting-started/cloud-wallet/faq
title: FAQ
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Cloud Wallet

### What is the Chia Cloud Wallet?

The Cloud Wallet is a new platform for interacting with the Chia blockchain. Assets are stored in vaults, in an app that is always synced with the blockchain. This makes it easy for newcomers to get started with Chia; it also provides a secure custody solution. In addition, it will eventually include an API for developers in Chia's ecosystem to make dApps that use the Chia blockchain.

### Is the Chia Cloud Wallet available for mainnet?

Not yet. It is currently in beta on testnet11.

### How can I obtain some TXCH for testnet11?

Visit either our [official faucet site](https://testnet11-faucet.chia.net) or a [community-run faucet](https://txchfaucet.com), and enter your txch address. You should receive some funds for testing within a few minutes.

### How do I get started with the Cloud Wallet?

Visit the [Cloud Wallet website](https://vault.chiatest.net) and sign up for a free account.

### How is the Cloud Wallet different from other wallets?

The Cloud Wallet comes with several advantages versus existing wallets that support Chia assets:
CNI runs several dedicated nodes to support the wallet. This means that the wallet is always synced.
Cloud Wallet assets are secured in a vault instead of with a single BLS key. Vaults are described in detail below, but their primary advantage is that they use multiple keys, which makes them more secure than single-key wallets.

Cloud Wallet vaults can be secured with either a passkey or with the Chia Signer app, which is described in detail below.

### Will the Cloud Wallet replace the reference wallet?

It depends on your use case. The Cloud Wallet will not be used for Chia farming, so farmers will continue to use the reference wallet for creating plots, as well as for farming. Other users might want to migrate to the Cloud Wallet at some point.

### What if I don't want my Cloud Wallet to connect to Chia's nodes?

For maximum trustless usage, we will eventually support syncing your Cloud Wallet against a node of your choosing. However, we haven't implemented this feature yet.

### What is a passkey?

A passkey provides a way to log onto websites and apps without a username and password. It also can be used for signing digital transactions. There are many locations and devices where you can save a passkey, for example in a hardware key such as a [Yubico](https://www.yubico.com) Yubikey, in a password manager such as [1Password](https://1password.com), or in your OS keychain. [This article](https://www.pcmag.com/explainers/passwordless-authentication-what-it-is-and-why-you-need-it-asap) gives a good overview of what passkeys are and how you can use them.

### How does the Cloud Wallet use passkeys?

Two ways – as a replacement for logging in with your email and password, and as a vault signer.

### What is a vault?

A vault is a new way to custody your assets on Chia's blockchain. Instead of securing your XCH, CATs, NFTs, etc with a single key, a vault uses multiple keys and more advanced custody rules. The current iteration of Chia vaults have two keys – one for signing transactions (either a passkey or a hardware key from the Chia Signer app), and one for recovery purposes (a BLS key).

### What is the advantage of using a vault instead of a wallet?

Standard wallets on Chia as well as other blockchains only have one key. If this key is lost or stolen, then all of the funds custodied in the wallet will also be lost or stolen. The security assumptions surrounding standard wallets are disconcerting to retail and enterprise users alike. By using Chia vaults, users can feel confident that their funds will remain secure even if one of their keys is lost, and often (as discussed below) if it is stolen.

### Why do I see “Your vault is being minted, the address will be available soon.” after I create a vault?

A vault needs to be created on the blockchain after you click the “Create” button. We have set up a faucet to handle this automatically. However, it does take a few minutes for the on-chain transaction to be processed. You should receive an address within five minutes.

### Can I import an existing wallet into the Cloud Wallet by entering a seed phrase?

Not at the moment. Currently the Cloud Wallet only supports vaults. We may add support for standard BLS wallets, but we haven't made that decision yet.

### How is signing different with the Chia vault than with the reference wallet?

In the reference wallet, the key used for signing transactions is located on the same device as the wallet. While this setup is still possible when using vaults, it is also possible to keep your signer on a separate device. By separating your vault from its signer, the Cloud Wallet presents a more secure self-custody solution than existing Chia-based wallets.

### What plans will exist for the Cloud Wallet, and how much will they cost?

We plan to release three tiers with the Cloud Wallet:

- Free Tier – currently available, albeit in beta form. It includes one vault, with a single key for spending and a single key for recovery. The free tier will provide easy onboarding for new users, and will offer a more secure solution than what exists in most of the industry.
- Prosumer Tier (coming soon) – will include support for multisig vaults, as well as some advanced trading tools. This will be the perfect solution for individuals and small groups who want to share custody, as well as for high-frequency traders. It will be available for a monthly fee.
- Enterprise Tier (coming soon) – will provide custody, management, and support solutions for large enterprises.

### Are you planning to improve upon the existing vault technology?

是的。 The current vaults are 1-of-1 for signing, and 2-of-2 for loss of funds. The next step is to introduce m-of-n multisig vaults for both signing and recovery. Longer term, we plan to introduce vaults with significantly more flexibility, which will be useful for end users and large enterprises alike. Stay tuned…

### Where can I go for support?

Feel free to ask questions in the #support channel of [our Discord](https://discord.gg/chia).

### Where can I report a bug?

If you find any bugs, feel free to fill out a [bug report](https://docs.google.com/forms/d/e/1FAIpQLSeIAZAxSwTwZPGUVLs7_XKseoPgOmtBa0qhtWNQwBeoo9adRA/viewform). However, please keep in mind that this is beta software. We are aware of several existing bugs, which we are tracking in a [list](/getting-started/cloud-wallet/known-issues/).

If you discover any security issues, you can file a report on our [bug bounty site](https://hackerone.com/chia_network). Thanks for your help!

## Recovery

### What happens if I lose my spend key?

You can use your recovery key to swap out the lost key for a new one.

### What happens if my spend key is stolen? Will all of my funds be stolen?

It depends. For example, the Chia Signer app recommends using biometric authentication such as a fingerprint or face ID. With this setup, if a thief steals your phone, they will not be able to access the Chia Signer app, and thus your funds will remain secure. You can procure a new smartphone and initiate the recovery process in order to restore your funds.

However, the current setup is not secure against wrench attacks, where the thief forces you to use your biometrics to sign a transaction to steal all of your funds. Our upcoming multisig solution will be secure against such attacks, as will our longer-term custody solution.

### What happens if I lose my recovery key?

You can use your spend key to send your funds to a new vault.

### What happens if my recovery key is stolen? Will all of my funds be stolen?

A recovery key can only be used for recovering a vault. If this key is stolen, the thief will not immediately be able to steal your funds. However, they will likely attempt to recover your vault. In this case, the watchtower will send you an email notifying you that your vault is now in recovery mode. The recovery can only be completed after a preset timer has expired. Until this time, you can cancel the recovery and move your funds to a new vault.

## Watchtowers

### What is a watchtower?

In a Web3 context, a watchtower is a program that monitors a blockchain for events, and takes action when they occur. The first Chia watchtower will look for attempted vault recoveries. When such a recovery is initiated, the watchtower will email the owner of the vault that is being recovered. If the recovery attempt is legitimate, the owner doesn't need to take any action. However, if the recovery is malicious, then the owner can cancel it.

### What other types of watchtower will you develop?

We plan to deploy watchtowers to notify users of incoming offers, incoming transactions, and transactions that were affected by a blockchain re-org. We may implement watchtowers for further events in the future.

### Can I develop my own watchtower?

Yes! The Chia blockchain is a public ledger, so anyone can build software to monitor it. We may open-source some of our watchtower code as well, which would make it easier for community members to create custom watchtowers for their own needs.

## Chia Signer

### What is the Chia Signer app?

The Chia Signer app turns your smartphone into a hardware wallet. The app uses your phone's Secure Enclave to create a vault spend key. This key cannot be removed from the device, so a thief would need to gain physical access to your phone in order to steal it. You can download it from the [iOS App Store](https://apps.apple.com/app/chia-signer/id6504493785).

:::info

Currently, in order to use the Chia Signer app, you will need two separate devices:

1. A computer or phone to access your vault
2. An iOS device on which the Chia Signer app is installed

You cannot use both the Cloud Wallet and the Chia Signer app on the same device yet. However, we do intend to enable this functionality in a future release.

:::

### Is the Chia Signer app available for both Android and iOS?

It is currently only available for iOS. We will build an Android version in the future.

### On which iOS devices is the Chia Signer app supported?

The app has two requirements for iOS devices:

1. The device must run iOS 15 or later
2. The device must have a Secure Enclave

The following devices meet both of these requirements:

- iPhone models beginning with the iPhone 6
- iPad models beginning with the iPad mini 4

Be sure to double check that your device is running at least iOS 15 prior to installing the Chia Signer app.

### Is it safe to install the Chia Signer app on a second-hand device?

Yes -- just be sure to do a factory reset of the device first. See [Apple's support site](https://support.apple.com/guide/iphone/iph7a2a9399b/ios) for instructions.

### Does the Chia Signer app use blind signing?

No, but it doesn't use clear signing yet, either. The user is shown the details of the transaction before signing it. This info is significantly more detailed than what can be seen on the small screens of most hardware wallets. However, the end user needs to trust that CNI's servers have not been compromised, so it also isn't clear signing. The light amount of trust required should be sufficient for most users. However, for users who want to sign large transfers with the Chia Signer app, we plan to develop true clear signing in the future.

### Can I use the Chia Signer app to sign into my Cloud Wallet account?

No, the Chia Signer app is only for signing transactions. You will need to use either a password or a passkey to sign into your Cloud Wallet account.

## Security and privacy

### Will CNI be able to freeze and/or confiscate my assets?

No. CNI won't custody any of your assets, so it won't have the ability to freeze or confiscate them. If the Cloud Wallet website were forcibly shut down, you would still have the ability to spend your assets because you would still be in control of the keys associated with your vault. However, the infrastructure to accomplish this would need to be rebuilt.

### What risks do end users take regarding CNI's control of the Cloud Wallet website?

One of the advantages of using vaults is that their spend keys are not directly accessible to the website or its APIs.

The two risks for Cloud Wallet end users are:

1. CNI can be forced to turn over metadata to various law enforcement. However, we don't save much metadata beyond what is already available on the blockchain.
2. An attacker could set up a man-in-the-middle attack when you are signing a transaction. The amount of trust required when using the Signer app is already minimal. In the future, we will enable full clear signing, as well as the ability to run the Cloud Wallet against your own full node in order to mitigate this attack vector.

### Do vaults always use the same address?

Yes, and this is a departure from the reference wallet, which uses a new address for each transaction. The reason vaults always use the same address is because they are singletons -- the vault itself authorizes the spend of coins under its control, as opposed to standard wallets which are derived from BLS keys.

Users must carefully consider the privacy (and therefore security) implications of reusing an address. When the address doesn't change, it becomes easier to put together a historical record of transactions. Vaults that hold significant value could therefore be targeted with physical attacks, as explained in [a Bitcoin wiki](https://en.bitcoin.it/wiki/Address_reuse).

Future versions of vaults will have additional security such as multisigs and time locks to mitigate the risk of physical attacks.

### Will the Chia Signer app be open source?

Yes
