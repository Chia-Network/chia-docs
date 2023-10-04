---
sidebar_label: Intro to Chia
title: Introduction
slug: /introduction
---

# Introduction to Chia

Chia is a cryptocurrency and blockchain with smart transaction capabilities. It was designed from the ground up to make cryptocurrency easier to use (and harder to lose) than cash.

Its [Proof of Space and Time](/consensus-intro) is the only Nakamoto consensus algorithm since Proof of Work, while also having a [much lower energy consumption](https://chiapower.org). Part of Chia's vision involves improving the carbon footprint of the blockchain industry.

Chia's mainnet was launched on March 19, 2021. Development of its ecosystem is ongoing, with primitives released for [CATs](https://chialisp.com/cats), [NFTs](https://chialisp.com/nfts), [Offers](https://chialisp.com/offers), and [DIDs](https://chialisp.com/dids).

This page will give a brief overview of Chia and its various components. If you are interested in becoming a Chia farmer, feel free to skip ahead to the [Beginner's Guide to Farming](/farming-guide).

## Proof of Space and Time

Chia uses a consensus algorithm referred to as [Proof of Space and Time](https://www.chia.net/green-paper). This allows anyone with an internet connection and some free disk space to participate in securing the network.

Because of this process of farming (analogous to mining), Chia has become the most decentralized blockchain in the world, with [over 100,000 nodes](https://dashboard.chia.net/d/em15uQ47k/peer-info) securing the system. Each of them store a copy of the blockchain's history, while also propagating new transactions across the network.

## Coin Set Model

Chia uses the coin set model to keep track of the network's state. In this model, a coin is a first-class object on the blockchain. Each coin is locked with a serialized [CLVM](https://chialisp.com/clvm) program called a **puzzle**, which is then hashed to create a **puzzle hash** (which can be converted to an address). The coin's id is a hash of its parent coin's id, its puzzlehash, and its amount.

Each transaction in Chia must contain at least one coin spend. In order to spend a coin, one must provide the original puzzle, as well as a valid solution, and an optional aggregated signature. Multiple coins can require each other be spent in the same transaction by using **announcements**.

:::info
For more information, check out the [Coin Set Intro page](/coin-set-intro) and the [Chialisp.com](https://chialisp.com) website.
:::

## Pooling

Like many other blockchains, Chia allows pooling to smooth out the reward structure for smaller farmers. However, Chia's pooling protocol has three unique features.

First of all, farmers create the blocks that they farm rather than the pool they are a member of. This design decision was made in conjunction with Chia's goal of decentralization. In other blockchains such as Bitcoin, four or five pools control over 51% of the global hashrate on any given day (Sources: [blockchain.com](https://www.blockchain.com/pools), [blockchair.com](https://blockchair.com/bitcoin/charts/hashrate-distribution)). Arguably, the easiest way to attack Bitcoin would be to bribe each of these pools' operators. In Chia, the pool operators are only responsible for distributing rewards. They cannot modify the blockchain. Therefore, Chia's pooling protocol doesn't lead to increased centralization.

When a block is won, the farmer gets 1/8 of the rewards and the pool operator gets the other 7/8. This was done to discourage pool operators from harming their competition by farming on a competing pool and neglecting to create a block when they find a proof (Solo farmers collect the entire reward when they create a block).

Joining a pool is also permissionless, so farmers don't need to sign up for anything in order to join. All it takes is a small transaction on the blockchain, which costs only a single mojo and a network fee.

:::info
For more information, check out the [Pool Protocol page](/pool-protocol).
:::

## Other Highlights

There are many other innovations in Chia, some of which include:

- **BLS signatures**, which allow aggregating all of a block's signatures together.
- **Scalability and performance** improvements, which allow running a Chia node on a Raspberry Pi.
- **Weight proofs and light clients**, which enable fast syncing from a mobile device. For more info, see [light clients](/light-clients).
- **Chia Asset Tokens** (CATs) are fungible tokens that can be minted from standard XCH. The possibilities are endless! [Read more on CATs](https://chialisp.com/cats) or watch a [CATs video intro](https://www.youtube.com/watch?v=yxagP_VC8BE). Additionally, a community member has created [TAIL Database](https://www.taildatabase.com/ 'TAIL database'), which contains a list of CATs in the wild.
- **Offer files** enable the peer-to-peer exchange of assets, including standard XCH, as well as CATs. [Read more on Offers](https://chialisp.com/offers) or watch a [brief intro video](https://youtu.be/Z2FoZSNtttM 'Offers intro on YouTube').
- **NFTs** enable and drive real-world applications of digital ownership through true marketplace independence, consistent provenance, and digital permanence. We laid out our [vision for NFTs on Chia](https://www.chia.net/2022/05/11/our-vision-for-chia-nfts.en.html) and launched our [NFT1 standard](https://www.chia.net/2022/06/29/1.4.0-introducing-the-chia-nft1-standard.en.html) in June 2022.
- This documentation will explain the motivation and implementation of the different components of the Chia system to a technical audience, and provide in-depth explanations of how everything works. If you would like to skip to how to make dApps (decentralized apps) on Chia, please visit the [Chialisp](https://chialisp.com) website.
