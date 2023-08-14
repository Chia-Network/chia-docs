---
title: Using the GUI
slug: /using-the-gui
---

## Getting Things Set Up

Getting started with Chia is easy with the use of the graphical user interface (GUI). Upon opening and selecting wallet or farming mode, you'll be given the ability to create a key. Each key is a 24 ordered word seed phrase used to control your wallet. **Do not share your 24 words with anyone**.

<p align="center">
    <img alt='select key' src="/img/select-key.png" width="500" align="center"/>
</p>

You will also be given the option to use the Chia GUI in **farming mode** or **wallet mode**. We'll start with farming mode. Don't worry if you've already chosen wallet mode as this can be easily changed within settings (as well as dark mode and language choice).

## Settings

Before we get to the fun stuff, let's take a look at the settings you'll want to know about to use Chia properly.

First, here is how you switch between farming and wallet mode.

<p align='center'>
  <img alt='settings' src='/img/settings.png' width='300' />
</p>

At the bottom of the settings you'll see the option for setting a passphrase. This is an additional layer of security that requires a password to access the Chia client.

:::warning
Enabling a passphrase is a recommended step for protecting your funds, but it only protects your local Chia client. This may stop someone from steeling your funds while you're away from your desk, but does not protect your funds if someone gains access to your 24 words.
:::

## Syncing

Upon opening Chia, your wallet will need to sync. You'll need to see a green checkmark next to the **WALLET** label in the upper-right corner before seeing any tokens you have.

<p align='center'>
  <img alt='synced' src='/img/synced.png' width='300' />
</p>

All transactions on the Chia blockchain are added to blocks. These blocks are downloaded sequentially as your client syncs. If someone has sent you Chia (or any other tokens on the Chia blockchain), your node doesn't know the transaction exists until you've synced past that block.

## Tokens

The main cryptocurrency of the Chia network is Chia (XCH). This is used for sending value between wallets and also for fees to ensure transactions go through. In addition to Chia, we have tokens, which are cryptocurrencies built on top of the Chia blockchain. These tokens are known as CATs (Chia asset tokens).

When you open the Tokens tab for the first time, it will look this:

<p align='center'>
  <img alt='tokens tab' src='/img/tokens-tab.png' width='700' />
</p>

We have no Chia and no tokens. You can see a list of other tokens that can be acquired within the **manage token list** section.

<p align='center'>
  <img alt='tokens' src='/img/tokens.png' width='300' />
</p>

These are all tokens that can be received the same way as Chia, but will have a unique quantity, utility, and value. Both Chia and any CATs can be sent to your **receive address**. Your wallet will have multiple receive addresses, so this value may change.

<p align='center'>
  <img alt='receive address' src='/img/receive-address.png' width='600' />
</p>

Additionally, you can send tokens to any other address.

<p align='center'>
  <img alt='sending XCH' src='/img/send-xch.png' width='600' />
</p>

Upon sending the transaction, it will be broadcasted to full nodes in the network. The fee will help push your transaction through to the blockchain after it reaches the mempool of a full node. Farmers get not only block rewards but also transaction fees, so transactions with fees are prioritized. We recommend a fee of at least .000005 XCH.

## NFTs

NFTs are non-fungible tokens (each is unique) and are supported natively in Chia.

Upon opening your NFTs for the first time, you'll only be met with a message to start collecting NFTs.

<p align='center'>
  <img alt='go collect some gems' src='/img/nfts.png' width='800' />
</p>

One way to get NFTs is to find them in a marketplace such as [Dexie](https://dexie.space/nft).

In the next section we will learn about offers which can be used to acquire NFTs in a decentralized way.

[Read more about NFTs](https://chialisp.com/nfts).

## Offers

When acquiring NFTs or tokens, you may need to make an offer for them. Offers are a form of decentralized exchange. Using offers you can trade one asset for another with no middleman.

<p align='center'>
  <img alt='offers' src='/img/offers.png' width='800' />
</p>

By using offers you are embracing the decentralized nature of the Chia blockchain.

[Read more about offers](https://chialisp.com/offers).
