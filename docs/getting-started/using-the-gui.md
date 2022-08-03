---
title: Using the GUI
slug: /using-the-gui
---

## Getting Things Set Up

Getting started with Chia is easy with the use of the graphical user interface (GUI). Upon opening, you'll be given the ability to create a key. Each key is a 24 ordered word seed phrase used to control your wallet. **Do not share your 24 words with anyone**.

![select key](/img/select-key.png)

You will also be given the option to use the Chia GUI in **farming mode** or **wallet mode**. We'll start with farming mode. Don't worry if you've already chosen wallet mode as this can be easily changed within settings (as well as dark mode and language choice).

## Settings

Before we get to the fun stuff, let's take a look at the settings you'll want to know about to use Chia properly.

First, here is how you switch between farming and wallet mode.

![settings](/img/settings.png)

At the bottom of the settings you'll see the option for setting a passphrase. This is an additional layer of security that requires a password to access the chia client.

:::warning
Enabling a passphrase is a recommended step for protecting your funds, but it only protects your local chia client. This may stop someone from steeling your funds while you're away from your desk, but does not protect your funds if someone gains access to your 24 words.
:::

## Syncing

Upon opening Chia, your client will need to sync. You'll need to see a **sycned** status in the top corner before seeing any tokens you have.

![synced](/img/synced.png)

All transactions on the Chia blockchain are added to blocks. Theese blocks are downloaded sequentially as your client syncs. If someone has sent you Chia (or any other tokens on the chia blockchain), your node doesn't know the transaction exists until you've synced past that block.

## Tokens

The main cryptocurrency of the Chia network is Chia (XCH). This is used for sending value between wallets and also for fees to ensure transactions go through. In addition to Chia, we have tokens, which are cryptocurrencies built on top of the Chia blockchain. These tokens are known as CATs (Chia asset tokens).

When you open the Tokens tab for the first time, it will look this:

![tokens tab](/img/tokens-tab.png)

We have no Chia and no tokens. You can see a list of other tokens that can be aquired within the **manage token list** section.

![tokens](/img/tokens.png)

These are all tokens that can be received the same way as Chia, but will have a unique quantity, utility, and value. Both Chia and any CATs can be sent to your **receive address**. Your wallet will have multiple receive addresses, so this value may change.

![receive address](/img/receive-address.png)

Additionally, you can send tokens to any other address.

![sending xch](/img/send-xch.png)

Upon sending the transaction, it will be broadcasted to full nodes in the network. The fee will help push your transaction through to the blockchain after it reaches the mempool of a full node. Famers get not only block rewards but also transaction fees, so transactions with fees are prioritized. We recommend a fee of atleast .000005 XCH.

## Plotting and Farming

When you launch the GUI in farming mode you're given a **full node** tab. This will summarize your sync status, recent blocks, and the overall stats for the Chia blockchain.

![full node](/img/full-node.png)

You can create plots from the **plots** tab. By default you will have one harvester (computer) farming and no plots.

![plots](/img/plots.png)

You can add a plot from this tab or from the farming tab.

![farming](/img/farming.png)

Let's go ahead and add a plot!

![add a plot](/img/add-a-plot.png)

If available I recommend madMAx Plotter as the plotting software of choice. This allows you to easily create plots in serial without much setup.
Start off by just creating a single plot. Once you understand how it works, you can create many more. It is important to understand [temp space and k sizes](#), as well as [SSD endurance](#).
![pooling](/img/pooling.png)
![Join a pool faucet](/img/join-a-pool-faucet.png)
![faucet](/img/faucet.png)
![faucet accepted](/img/faucet-accepted.png)

## NFTs

NFTs are non-fungible tokens and are supported natively in Chia.

![go collect some gems](/img/nfts.png)

At first, your NFT page will be empty. One way to get NFTs is to find them in a marketplace such as [Dexie](https://dexie.space/nft).

In the next section we will learn about offers which can be used to aquire NFTs in a decentralized way.

## Offers

When aquiring NFTs or tokens, you may need to make an offer for them. Offers are a form of decentralized exchange. Using offers you can trade one asset for another with no middleman.

![offers](/img/offers.png)
