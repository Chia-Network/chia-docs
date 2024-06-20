---
slug: /guides/observer-wallet-guide
title: Observer Wallet Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Intro

### About

An observer wallet is a wallet that cannot be used for sending transactions. In other words, it is a read-only wallet. This is a powerful concept for HODLers and farmers alike.

Until the introduction of observer wallets, the Chia reference wallet always stored each public/private key pair locally. It was possible to maintain an offline key, for example in order to receive farmer rewards, but checking the balance required using a blockchain explorer. However, as a privacy feature, Chia wallets generate a new address each time they receive money. A blockchain explorer is therefore not always able to provide an accurate view of a wallet's history.

With an observer wallet, you can view your wallet's history and balance without the risk of funds being stolen by someone who gains access to your computer.

### Current Status

The concept of an observer wallet was first introduced to Chia's reference wallet in version 2.4.0. In this version, it is possible to create an observer wallet from a command line, and use it with the GUI. The user experience will improve as more features get added, but for now the core functionality is in place.

Eventually, we will add the ability to sign transactions using an external signer.

## Set up

In order to set up an observer wallet, you need to know the wallet's public key. This guide will demonstrate one technique to obtain this information.

If you don't have an existing wallet that you would like to convert to an observer wallet, then you will need to create one. From the "Chia Wallet Keys" screen, click `ADD WALLET` and `Create New`:

<p align='center'>
  <img alt='observer wallet' src='/img/observer_wallet/01.png' width='800' />
</p>
<br/>

You will be shown a 24-word seed phrase. Write down these words, and store them in a secure place. As with all wallets that use a seed phrase, if a malicious actor obtains these words, they can steal all of your funds.

:::warning important

To load an observer wallet, the seed phrase is not required. However, in order to spend the funds in an observer wallet later, the seed phrase **is** required. It is critically important to securely save this seed phrase, just as you would with a non-observer wallet. If you do not save a copy of the seed phrase, you will never be able to spend this wallet's funds.

:::

After securely copying the seed phrase, enter a name for the wallet and click `NEXT`:

<p align='center'>
  <img alt='observer wallet' src='/img/observer_wallet/02.png' width='800' />
</p>
<br/>

Your new wallet will be created as a normal, non-observer wallet. At this point, you can exit the wallet (we will return to it shortly):

<p align='center'>
  <img alt='observer wallet' src='/img/observer_wallet/03.png' width='800' />
</p>
<br/>

From the `Chia Wallet Keys` screen, click the three dots associated with your wallet, and click `Details`:

<p align='center'>
  <img alt='observer wallet' src='/img/observer_wallet/04.png' width='800' />
</p>
<br/>

Copy the value of `Public Key`, which has been removed from the following image, but is the long string below the red circle. When you have safely stored your wallet's public key (it can be stored along with the seed phrase), click `CLOSE`:

<p align='center'>
  <img alt='observer wallet' src='/img/observer_wallet/05.png' width='800' />
</p>
<br/>

Now that you have saved a copy of your wallet's public key, you can delete your wallet. From the `Chia Wallet Keys` screen, click the three dots associated with your wallet, and click `Delete`:

<p align='center'>
  <img alt='observer wallet' src='/img/observer_wallet/06.png' width='800' />
</p>
<br/>

You will need to enter your wallet's fingerprint, and click `DELETE`:

<p align='center'>
  <img alt='observer wallet' src='/img/observer_wallet/07.png' width='800' />
</p>
<br/>

Next, you can re-add your wallet using its public key. To do this, first save your wallet's public key in a text file. This file must only contain the public key, and it must be on a single line.

Open a command prompt or terminal window, and enter the following:

```bash
chia keys add -f <file name> -l "<Name>"
```

Be sure to enter the actual file path, as well as whatever name you want to call your observer wallet. The output will look something like the following:

```bash
Added public key with fingerprint
```

You may also see a warning such as the following, which can be safely ignored:

```bash
WARNING: using a farmer address which we might not have the private keys for. We searched the first 50 addresses. Consider overriding  with
WARNING: using a pool address which we might not have the private keys for. We searched the first 50 addresses. Consider overriding  with
```

Your observer wallet has been added.

## Usage

If your observer wallet is not immediately displayed in the GUI, click `View` --> `Reload`, and it should appear:

<p align='center'>
  <img alt='observer wallet' src='/img/observer_wallet/08.png' width='800' />
</p>
<br/>

Your observer wallet should now be displayed. It might have a different icon than the original wallet. Click this wallet to view it:

<p align='center'>
  <img alt='observer wallet' src='/img/observer_wallet/09.png' width='800' />
</p>
<br/>

You can now send funds to this wallet, and its balance will be updated, just like a non-observer wallet's balance. You can even redirect your farming rewards to this wallet:

<p align='center'>
  <img alt='observer wallet' src='/img/observer_wallet/10.png' width='800' />
</p>
<br/>

By definition, observer wallets are read-only. To test this, you can try sending funds to another wallet:

<p align='center'>
  <img alt='observer wallet' src='/img/observer_wallet/11.png' width='800' />
</p>
<br/>

This should result in an error:

<p align='center'>
  <img alt='observer wallet' src='/img/observer_wallet/12.png' width='800' />
</p>
<br/>

When you need to spend the wallet's funds, delete the observer wallet, and re-add it using the seed phrase.
