---
sidebar_label: Intro to Chia
title: Introduction
slug: /introduction
---

# Chia简介

Chia是一种具有智能交易能力的加密货币和区块链。 它从头开始设计，旨在使加密货币比现金更易于使用，更难于丢失。

它的[时空证明](/consensus-intro)是继工作量证明之后的唯一一种中本聪共识算法，同时能够[大大降低能源消耗](https://chiapower.org)。 Chia 的愿景之一是改善区块链行业的碳足迹。

Chia的主网于2021年3月19日推出。 其生态系统的开发正在进行中，已发布了[CAT](https://chialisp.com/cats)、[NFT](https://chialisp.com/nfts)、[报价（offer）](https://chialisp.com/offers) 和 [DID](https://chialisp.com/dids) 等基础设施。

This page will give a brief overview of Chia and its various components. If you are interested in becoming a Chia farmer, feel free to skip ahead to the [Beginner's Guide to Farming](/farming-guide).

## 时空证明（Proof of Space and Time）

Chia使用一种称为[时空证明](https://www.chia.net/green-paper)的共识算法。 这使得任何拥有互联网连接和一些可用磁盘空间的人都能参与网络的安全性维护。

由于这个耕种过程（类似于比特币的挖矿），Chia 成为了世界上最为去中心化的区块链，有[超过 100,000 个节点](https://dashboard.chia.net/d/em15uQ47k/peer-info)用于维护系统。 每个节点都存储区块链的历史记录副本，并在网络中传播新的交易。

## 硬币模型（Coin Set Model）

Chia使用硬币模型来跟踪网络的状态。 在这个模型中，硬币（coin）是区块链上的最重要（first-class）对象。 每个硬币都使用一个称为 **puzzle** 的序列化 [CLVM](https://chialisp.com/clvm) 程序锁定，然后对其进行哈希以创建一个 **puzzle hash**（可以转换为地址）。 硬币的ID是其父硬币ID、 硬币puzzlehash和硬币金额的哈希值。

在Chia中，每笔交易必须包含至少一个硬币的支出。 为了花费一个硬币，必须提供原始的puzzle，以及一个有效的解决方案（solution）和一个可选的聚合签名（aggregated signature）。 多个硬币可以通过使用**announcements**要求彼此在同一笔交易中花费。

:::info
有关更多信息，请查看[硬币模型简介页面](/coin-set-intro)和[Chialisp.com](https://chialisp.com) 网站。
:::

## Pooling

与许多其他区块链一样，Chia允许连接矿池来确保小规模的农民能够平滑的获得奖励。 然而，Chia的矿池协议具有三个独特的特点。

首先，区块是由农民来创建，而不是其所属的矿池。 这个设计决策是与 Chia 的去中心化目标相结合的。 在其他区块链中，如比特币，每天全球哈希率的51% 以上由四到五个矿池控制（来源：[blockchain.com](https://www.blockchain.com/pools)，[blockchair.com](https://blockchair.com/bitcoin/charts/hashrate-distribution)）。 可以说，攻击比特币最简单的方法就是贿赂这些矿池的运营商。 在Chia中，矿池运营商只负责分发奖励。 他们不能修改区块链。 因此，Chia的矿池协议不会导致中心化。

当赢得一个区块时，农民获得奖励的1/8，矿池运营商获得其余的7/8。 这样设计是为了阻止矿池运营商通过在竞争池上进行挖矿（耕种，farming），然后在找到证明时不创建区块来损害竞争对手（独自耕种的农民在创建区块时会获得全部奖励）。

加入矿池无需权限，因此农民无需注册即可加入。 只需在区块链上进行一笔小交易，仅需1个mojo和交易手续费。

:::info
有关更多信息，请查看[矿池协议页面](/pool-protocol)。
:::

## 其他亮点

Chia 还有许多其他创新，其中一些包括：

- **BLS签名**，允许将区块的所有签名聚合在一起。
- **可扩展性和性能**改进，使得可以在树莓派上运行 Chia节点。
- **权重证明和轻客户端**，支持从移动设备快速同步。 有关更多信息，请参见[轻客户端](/light-clients)。
- **Chia资产代币**(Chia Asset Tokens，CAT)是可以从标准XCH铸造的可互换代币。 拥有无限可能！ [ CAT更多信息](https://chialisp.com/cats)或观看 [CAT视频介绍](https://www.youtube.com/watch?v=yxagP_VC8BE)。 此外，社区成员已经创建了一个名为 [TAIL Database](https://www.taildatabase.com/ "TAIL database")的数据库，其中包含了众多的CAT列表。
- **报价文件**（Offer）使得资产的点对点交换成为可能，包括标准XCH 和CAT。 [阅读更多关于报价的信息](https://chialisp.com/offers) 或观看[简短介绍视频](https://youtu.be/Z2FoZSNtttM "报价介绍")。
- **NFT** 通过真正的市场独立性、一致的溯源和数字永久性，推动了数字所有权的实际应用。 我们阐述了我们关于 Chia NFT的[愿景](https://www.chia.net/2022/05/11/our-vision-for-chia-nfts.zh.html)并在 2022 年 6 月推出了我们的[NFT1标准](https://www.chia.net/2022/06/29/1.4.0-introducing-the-chia-nft1-standard.zh.html)。
- 本文档将向技术受众解释Chia系统不同组件的动机和实现，并深入解释了所有内容的工作原理。 如果您想直接了解如何在Chia上制作去中心化应用程序（dApps），请访问[Chialisp](https://chialisp.com)网站。
