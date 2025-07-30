---
sidebar_label: Intro to Chia
title: Introduction
slug: /chia-blockchain/introduction
---

# Chia简介

Chia是一种具有智能交易能力的加密货币和区块链。 它从头开始设计，旨在使加密货币比现金更易于使用，更难于丢失。

Its [Proof of Space and Time](/chia-blockchain/consensus/consensus-intro) is the only Nakamoto consensus algorithm since Proof of Work, while also having a [much lower energy consumption](https://chiapower.org). Chia 的愿景之一是改善区块链行业的碳足迹。

Chia的主网于2021年3月19日推出。 Development of its ecosystem is ongoing, with primitives released for [CATs](https://chialisp.com/cats), [NFTs](https://chialisp.com/nfts), [Offers](https://chialisp.com/offers), and [DIDs](https://chialisp.com/dids).

This page will give a brief overview of Chia and its various components. If you are interested in becoming a Chia farmer, feel free to skip ahead to the [Beginner's Guide to Farming](/reference-client/getting-started/farming-guide).

## 时空证明（Proof of Space and Time）

Chia uses a consensus algorithm referred to as [Proof of Space and Time](https://www.chia.net/green-paper). 这使得任何拥有互联网连接和一些可用磁盘空间的人都能参与网络的安全性维护。

Because of this process of farming (analogous to mining), Chia has become the most decentralized blockchain in the world, with [over 100,000 nodes](https://dashboard.chia.net/d/em15uQ47k/peer-info) securing the system. 每个节点都存储区块链的历史记录副本，并在网络中传播新的交易。

## 硬币模型（Coin Set Model）

Chia使用硬币模型来跟踪网络的状态。 在这个模型中，硬币（coin）是区块链上的最重要（first-class）对象。 Each coin is locked with a serialized [CLVM](https://chialisp.com/clvm) program called a **puzzle**, which is then hashed to create a **puzzle hash** (which can be converted to an address). 硬币的ID是其父硬币ID、 硬币puzzlehash和硬币金额的哈希值。

在Chia中，每笔交易必须包含至少一个硬币的支出。 为了花费一个硬币，必须提供原始的puzzle，以及一个有效的解决方案（solution）和一个可选的聚合签名（aggregated signature）。 Multiple coins can require each other be spent in the same transaction by using **announcements**.

:::info
For more information, check out the [Coin Set Intro page](/chia-blockchain/coin-set-model/intro) and the [Chialisp.com](https://chialisp.com) website.
:::

## 矿池（Pooling）

与许多其他区块链一样，Chia允许连接矿池来确保小规模的农民能够平滑的获得奖励。 然而，Chia的矿池协议具有三个独特的特点。

首先，区块是由农民来创建，而不是其所属的矿池。 这个设计决策是与 Chia 的去中心化目标相结合的。 In other blockchains such as Bitcoin, four or five pools control over 51% of the global hashrate on any given day (Sources: [blockchain.com](https://www.blockchain.com/pools), [blockchair.com](https://blockchair.com/bitcoin/charts/hashrate-distribution)). 可以说，攻击比特币最简单的方法就是贿赂这些矿池的运营商。 在Chia中，矿池运营商只负责分发奖励。 他们不能修改区块链。 因此，Chia的矿池协议不会导致中心化。

当赢得一个区块时，农民获得奖励的1/8，矿池运营商获得其余的7/8。 这样设计是为了阻止矿池运营商通过在竞争池上进行挖矿（耕种，farming），然后在找到证明时不创建区块来损害竞争对手（独自耕种的农民在创建区块时会获得全部奖励）。

加入矿池无需权限，因此农民无需注册即可加入。 只需在区块链上进行一笔小交易，仅需1个mojo和交易手续费。

:::info
For more information, check out the [Pool Protocol page](/chia-blockchain/protocol/pool/pool-protocol).
:::

## 其他亮点

Chia 还有许多其他创新，其中一些包括：

- **BLS signatures**, which allow aggregating all of a block's signatures together.
- **Scalability and performance** improvements, which allow running a Chia node on a Raspberry Pi.
- **Weight proofs and light clients**, which enable fast syncing from a mobile device. For more info, see [light clients](/chia-blockchain/architecture/light-clients).
- **Chia Asset Tokens** (CATs) are fungible tokens that can be minted from standard XCH. 拥有无限可能！ [Read more on CATs](https://chialisp.com/cats) or watch a [CATs video intro](https://www.youtube.com/watch?v=yxagP_VC8BE). Additionally, a community member has created [TAIL Database](https://www.taildatabase.com/ "TAIL database"), which contains a list of CATs in the wild.
- **Offer files** enable the peer-to-peer exchange of assets, including standard XCH, as well as CATs. [Read more on Offers](https://chialisp.com/offers) or watch a [brief intro video](https://youtu.be/Z2FoZSNtttM "Offers intro on YouTube").
- **NFTs** enable and drive real-world applications of digital ownership through true marketplace independence, consistent provenance, and digital permanence. We laid out our [vision for NFTs on Chia](https://www.chia.net/2022/05/11/our-vision-for-chia-nfts.en.html) and launched our [NFT1 standard](https://www.chia.net/2022/06/29/1.4.0-introducing-the-chia-nft1-standard.en.html) in June 2022.
- 本文档将向技术受众解释Chia系统不同组件的动机和实现，并深入解释了所有内容的工作原理。 If you would like to skip to how to make dApps (decentralized apps) on Chia, please visit the [Chialisp](https://chialisp.com) website.
