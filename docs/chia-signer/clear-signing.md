---
title: Clear Signing
slug: /chia-signer/clear-signing
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The iOS and Android versions of the Chia Signer app each support clear signing by default. This page will explain what clear signing is, how it differs from blind signing, and how to ensure that clear signing is being used.

## The scenario

Let's say Alice wants to send Bob 100 XYZ coins using either Chia or another blockchain. She uses the software wallet she has installed on her laptop to set up the transaction, and clicks `Send`.

What happens next?

Before the funds can be sent, Alice's wallet must obtain a digital signature to authorize the transfer. Depending on her setup, her wallet can take a variety of difference approaches. This document will explain the four most common setups, from least- to most-secure:

1. Local device only
2. Blind signing (non-human-readable)
3. Blind signing (human-readable)
4. Clear signing

## Local device only

If Alice's key is stored locally on her device (her laptop in this example), then her wallet already has everything it needs to construct the signature. Some wallets may require Alice to enter her device's password in order to unlock a keychain, and others might show a simple confirmation prompt.

If Alice's device and password were compromised, then it would be trivial for a malicious human or software program to obtain her seed phrase (the key needed to access her wallet). Seed phrase in hand, the malicious entity could then drain Alice's entire wallet.

This is how most cryptocurrency wallets work, including Chia's reference wallet. In order to keep her funds safe, Alice must take care to ensure that her device is never compromised.

## Blind signing (non human-readable)

As an alternative, Alice can obtain a hardware wallet to hold her keys. A hardware wallet is a physical device which normally is not connected to the internet. In order for Alice to send funds, she must plug her hardware wallet into a USB port, then tap a button to authorize the transaction. This is generally more secure than the previous scenario because in theory, Alice's computer can never access her private key, even when her hardware wallet is connected.

One drawback is that some hardware wallets either have a tiny screen, or no screen at all. If there is a screen, Alice might see something like this:
```
0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
```
This is an example of a cryptographic hash, and it doesn't provide any human-readable information. Alice must decide whether to authorize this transaction without knowing with any certainty how much money she is sending, or to whom she is sending it. In other words, she must sign the transaction blindly, and hope that it has not been altered. If Alice's computer is compromised, her wallet may have delivered a hash that corresponds to `Alice sends Carly 1,000,000 XYZ`, and she would have no way of verifying this info. 

This issue isn't hypothetical. In fact, it was one of the main factors that led to the [Bybit hack of 2025](https://cointelegraph.com/news/bybit-hack-centralized-exchange-security-flaws), the largest crypto hack ever recorded, with losses estimated at $1.4 billion.

## Blind signing (human-readable)

Modern, higher-end hardware wallets often have larger screens. Instead of displaying a hash (or nothing at all), these devices might show something like the following:
```
Action: Send
Sender: Alice
Recipient: Bob
Asset: XYZ Coin
Amount: 100
Time: September 1, 2026, 8:04 PM EDT
```
In this scenario, Alice can see what she is signing. She can also cross-reference this info with what the wallet on her computer is showing. If she intends to send funds to Bob, but her hardware wallet shows the funds going to Carly, then she knows that something is wrong. In this case, she can cancel the transaction without signing it.

Even though this is a significant improvement over the previous scenarios, it is still an example of blind signing. This is because the wallet on Alice's computer merely delivered the signature information to her hardware wallet. If her computer were compromised, then it could have delivered incorrect info. Her hardware wallet would faithfully display a readable, yet incorrect, summary of the malicious transaction. 

This is how most hardware wallets display transaction info. To add to the confusion, some manufacturers might describe this as "clear signing" simply because the hardware wallet displays the transaction in human-readable form.

The original Chia Signer app also followed the same flow, but we never labeled it as "clear signing". We knew we could do better, and the modern versions of the app are the result.

## Clear signing

The Chia Signer app takes the next step. First, it receives the purported transaction info from the wallet, then it queries the blockchain to retrieve the same information. If there is any mismatch, the transaction is assumed to be malicious. Clear signing provides a provable on-chain verification of the transaction information.

On both the iOS and Android versions of the Chia Signer app, clear signing is enabled by default. Alice will see a badge in the signature request, which indicates that clear signing is in use.

<div style={{ textAlign: 'left' }}>
  <img src="/img/clear-signing/clear-signing.png" alt="Clear signing badge"/>
</div>

In the rare case where clear signing is not possible, Alice will first be warned of this.

<div style={{ textAlign: 'left' }}>
  <img src="/img/clear-signing/blind-signing-warning.png" alt="Blind signing warning"/>
</div>

For each subsequent transaction, Alice will continue to be warned that blind signing is in use.

<div style={{ textAlign: 'left' }}>
  <img src="/img/clear-signing/blind-signing.png" alt="Blind signing"/>
</div>

## Limitations of clear signing

Clear signing does not guarantee that the transaction is valid. In the case where Alice's computer (or the Chia Cloud platform itself) _and_ her phone are compromised by the same actor, both devices could be instructed to display the same incorrect information.

However, this attack would be significantly more difficult to pull off. The malicious actor would need to compromise two devices instead of one. If Alice wants even more security, she can install the Chia Signer app on a spare phone that is normally kept offline, in a secure location. Remotely installing malicious software then only becomes possible for the short amount of time in which her phone is online.

In the future, we also plan to implement air-gapped signing for even greater security. In this case, Alice's phone is _never_ connected to the internet, so it becomes impossible to install malicious software without physical access to the device.

## Clear signing on Ethereum

[ERC-7730](https://eips.ethereum.org/EIPS/eip-7730) is a proposal for a clear-signing specification on Ethereum. It is a _Draft_ as of Q4 2026, and no hardware wallets have implemented it.