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

Upon opening Chia, your client will need to sync. You'll need to see a **sycned** status in the top corner before seeing any tokens you have.

<p align='center'>
  <img alt='synced' src='/img/synced.png' width='300' />
</p>

All transactions on the Chia blockchain are added to blocks. Theese blocks are downloaded sequentially as your client syncs. If someone has sent you Chia (or any other tokens on the Chia blockchain), your node doesn't know the transaction exists until you've synced past that block.

## Tokens

The main cryptocurrency of the Chia network is Chia (XCH). This is used for sending value between wallets and also for fees to ensure transactions go through. In addition to Chia, we have tokens, which are cryptocurrencies built on top of the Chia blockchain. These tokens are known as CATs (Chia asset tokens).

When you open the Tokens tab for the first time, it will look this:

<p align='center'>
  <img alt='tokens tab' src='/img/tokens-tab.png' width='700' />
</p>

We have no Chia and no tokens. You can see a list of other tokens that can be aquired within the **manage token list** section.

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

Upon sending the transaction, it will be broadcasted to full nodes in the network. The fee will help push your transaction through to the blockchain after it reaches the mempool of a full node. Farmers get not only block rewards but also transaction fees, so transactions with fees are prioritized. We recommend a fee of atleast .000005 XCH.

## Plotting and Farming

When you launch the GUI in farming mode you're given a **full node** tab. This will summarize your sync status, recent blocks, and the overall stats for the Chia blockchain.

<p align='center'>
  <img alt='full node' src='/img/full-node.png' width='800' />
</p>

You can create plots from the **plots** tab. By default you will have one harvester (computer) farming and no plots.

<p align='center'>
  <img alt='plots' src='/img/plots.png' width='800' />
</p>

You can add a plot from this tab or from the farming tab.

<p align='center'>
  <img alt='farming' src='/img/farming.png' width='800' />
</p>

### Your First Plot

Let's go ahead and add a plot!

<p align='center'>
  <img alt='add a plot' src='/img/add-a-plot.png' width='1000' />
</p>

I recommend **madMAx Plotter** as the plotting software of choice. This allows you to easily create plots in serial without much setup.
Start off by just creating a single plot. Once you understand how it works, you can create many more. If you wish to create many plots It is important to understand [SSD endurance](/ssd-endurance).

When creating a plot, you're given the option to join a pool. This is the recommend approach (even if you choose to _self-pool_). With Chia's unique approach to pooling, farming rewards are consistent without a sacrifice in decentralization of the network. To make pooling work you create your plots to be associated with a Plot NFT. This is a unique token controlling your membership to any pool.

<p align='center'>
  <img alt='pooling' src='/img/pooling.png' width='500' />
</p>

### Creating a Plot NFT

Creating the Plot NFT is a transaction on the blockchain and requires a small amount of (free) Chia which can be retrieved from a [faucet](https://faucet.chia.net).

<p align='center'>
  <img alt='join a pool faucet' src='/img/join-a-pool-faucet.png' width='500' />
</p>

This will take you to the official faucet which allows you to paste your address and get sent some Chia.

<p align='center'>
  <img alt='faucet' src='/img/faucet.png' width='500' />
</p>

If everything is done correctly, you should get a confirmation.

<p align='center'>
  <img alt='faucet accepted' src='/img/faucet-accepted.png' width='500' />
</p>

:::info
You'll need your wallet to be synced to see the free XCH or to create the plot NFT.

Plot NFTs are distinctly different than standard NFTs discussed in the next section.
:::

## NFTs

NFTs are non-fungible tokens (each is unique) and are supported natively in Chia.

Upon opening your NFTs for the first time, you'll only be met with a message to start collecting NFTs.

<p align='center'>
  <img alt='go collect some gems' src='/img/nfts.png' width='800' />
</p>

One way to get NFTs is to find them in a marketplace such as [Dexie](https://dexie.space/nft).

In the next section we will learn about offers which can be used to aquire NFTs in a decentralized way.

[Read more about NFTs](/nfts).

## Offers

When aquiring NFTs or tokens, you may need to make an offer for them. Offers are a form of decentralized exchange. Using offers you can trade one asset for another with no middleman.

<p align='center'>
  <img alt='offers' src='/img/offers.png' width='800' />
</p>

By using offers you are embracing the decentralized nature of the Chia blockchain.

[Read more about offers](/offers).
