---
slug: /guides/observer-wallet-guide
title: Observer Wallet Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Intro

### About

An observer wallet is a wallet that cannot be used for sending transactions. In other words, it is a read-only wallet. This is a powerful concept for HODLers and farmers alike.

:::info

Currently, you need to understand how to use a command line interface (CLI) in order to set up an observer wallet. Eventually, we will make this setup easier for GUI users.

:::

Until the introduction of observer wallets, the Chia reference wallet always stored each public/private key pair locally. It was possible to maintain an offline key, for example in order to receive farmer rewards, but checking the balance required using a blockchain explorer. However, as a privacy feature, Chia wallets generate a new address each time they receive money. A blockchain explorer is therefore not always able to provide an accurate view of a wallet's history.

With an observer wallet, you can view your wallet's history and balance without the risk of funds being stolen by someone who gains access to your computer.

### Current Status

The concept of an observer wallet was first introduced to Chia's reference wallet in version 2.4.0. In this version, it is possible to create an observer wallet from a command line, and use it with the GUI. The user experience will improve as more features get added, but for now the core functionality is in place.

Eventually, we will add the ability to sign transactions using an external signer.

## Set up

This guide will show you how to set up an existing non-observer wallet in observer mode. It assumes that you have already copied the exiting wallet's 24-word seed phrase to a secure location. See our [wallet guide](/getting-started/wallet-guide/) for more info on this setup.

:::warning important

To load an observer wallet, the seed phrase is not required. However, in order to spend the funds in an observer wallet later, the seed phrase **is** required. It is critically important to securely save this seed phrase, just as you would with a non-observer wallet. If you do not save a copy of the seed phrase, you will never be able to spend this wallet's funds.

:::

The next step after you have set up a wallet in non-observer mode is to obtain its master public key. Open a command prompt or terminal window, and enter the following:

```bash
chia keys show
```

Locate your wallet's fingerprint. You will see something like the following:

```bash
Showing all public keys derived from your master key:

Label: Testnet11 Small
Fingerprint: <fingerprint>
Master public key (m): <master public key>
Farmer public key (m/12381/8444/0/0): <farmer public key>
Pool public key (m/12381/8444/1/0): <pool public key>
First wallet address: <address>
```

Save a copy of the key shown with `Master public key (m):` in a text file. This file must only contain the public key, and it must be on a single line.


Delete your wallet/key by running the following command:

```bash
chia keys delete -f <fingerprint>
```

The output will look something like the following:

```bash
Deleting private_key with fingerprint <fingerprint>
```

Next, run the following command to re-add your wallet/key using the master public key you previously saved:

```bash
chia keys add -f <file name> -l "<Name>"
```

Be sure to enter the actual file path, as well as whatever name you want to call your observer wallet. The output will look something like the following:

```bash
Added public key with fingerprint <fingerprint>
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
