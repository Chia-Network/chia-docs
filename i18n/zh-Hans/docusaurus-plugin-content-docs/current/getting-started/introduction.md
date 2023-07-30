---
title: 一. 导言
slug: /介绍
---

# Chia简介

Chia 是一个具有智能交易能力的加密货币和区块链。 它是从头设计的，目的是使加密货币比现金更容易使用(和更难损失)。

它的 [个空间和时间证明](/consensus-intro) 是自证明工作以来唯一的纳卡莫托共识算法。 同时有 [能耗减少](https://chiapower.org)。 Chia的部分愿景涉及改进区块链工业的碳足迹。

Chia的主网于2021年3月19日启用。 其生态系统的发展正在进行之中，发布了 [CATs](https://chialisp.com/cats)的原始作物。 [NFTs](https://chialisp.com/nfts), [优惠](https://chialisp.com/offers), 和 [DIDs](https://chialisp.com/dids).

## 空间和时间证明

Chia使用一种共识算法，称为 [空间和时间证明](https://www.chia.net/green-paper)。 这允许任何有互联网连接和空闲磁盘空间的人参与网络安全。

由于这种耕作过程(类似于采矿)，Chia已成为世界上最分散的区块链。 使用 [超过 100 000个节点](https://dashboard.chia.net/d/em15uQ47k/peer-info) 来保护系统。 他们每个人都存储一个区块链历史的副本，同时也在网络中传播新的交易。

## 硬币设置模型

Chia使用硬币设置模型来跟踪网络状态。 在这个模型中，硬币是区块链上的一流对象。 每个硬币被序列化的 [CLVM](https://chialisp.com/clvm) 程序锁定，称为 **关卡**, 然后哈希来创建一个 **拼图哈希** (可以转换为地址)。 该硬币的id是其父硬币的id、拼图和金额的散列值。

Chia中的每笔交易必须包含至少一个硬币支出。 为了花费一枚硬币，人们必须提供原来的拼图以及一个有效的解决办法和一个可选的聚合签名。 通过使用 **公告** ，多个硬币可能需要在相同的交易中相互使用。

:::info
欲了解更多信息，请访问 [Coin 设置摘要页面](/coin-set-intro) 和 [Chialisp.com](https://chialisp.com) 网站。
:::

## 资源库

像许多其他区块链一样，Chia允许集合平整较小的农民的奖励结构。 然而，Chia的联营协议有三个独特的特点。

首先，农民创造了他们所耕种的区块，而不是他们所参加的区块。 这一设计决定与Chia的权力下放目标是一致的。 在其他区块链，如比特币，四个或五个池在任何特定日期控制了超过51%的全球哈希率(来源： [区块链)。 om](https://www.blockchain.com/pools), [blockchair.com](https://blockchair.com/bitcoin/charts/hashrate-distribution)). 可以说，攻击比特币的最容易的办法是贿赂每个集合的运营商。 在Chia，池营运人只负责分配奖励。 他们不能修改区块链。 因此，Chia的集中协议不会导致更大的集中化。

当一个区块获胜时，农民将获得1/8的奖励，池营运者将获得另外7/8。 这样做是为了阻止集合经营者通过在竞争的集合地上耕作来损害他们的竞争，而在发现证据时却忽略了建立一个区块(Solo农民在创建区块时领取全部奖励)。

加入池也是无权限的，所以农民不需要注册任何东西才能加入。 它所需要的只是区块链上的小笔交易，只需花费一个mojo 和一个网络费用。

:::info
欲了解更多信息，请查看 [池协议页面](/pool-protocol)。
:::

## 其他要点

Chia还有许多其他创新办法，其中包括：

- **BLS signatures**, 允许将一个块的所有签名合并在一起。
- **可缩放性和性能** 改进，可以在树莓派上运行一个Chia节点。
- **重量证明和轻量客户端**, 允许从移动设备快速同步。 欲了解更多信息，请参阅 [轻量客户端](/light-clients)。
- **Chia Asset Tokens** (CATs) 是可替代的代币，可以从标准 XCH打破。 可能性是无限的！ [阅读更多关于 CATs](https://chialisp.com/cats) 或观看 [CATs 视频介绍](https://www.youtube.com/watch?v=yxagP_VC8BE)。 此外，一个社区成员创建了 [TAIL 数据库](https://www.taildatabase.com/ "TAIL database")，它包含了一个野生中的 CATs 列表。
- **提供文件** 启用对等资产交换，包括标准的 XCH以及CAT。 [阅读更多关于优惠](https://chialisp.com/offers) 或观看 [简短的介绍视频](https://youtu.be/Z2FoZSNtttM "Offers intro on YouTube")。
- **NFTs** 能够通过真正的市场独立性、前后一致的出处和数字永久性来启动和推动真正的数字所有权应用。 我们在 Chia</a> 上为NFT 勾画了我们的
个视野，并在2022年6月推出了我们 [NFT1 标准](https://www.chia.net/2022/06/29/1.4.0-introducing-the-chia-nft1-standard.en.html)。</li> 
  
  - 这些文件将向技术受众解释Chia系统不同组成部分的动机和实施情况。 并深入解释一切如何运作。 如果您想跳过如何在Chia上创建 dApps (分散的应用程序)，请访问 [Chialisp](https://chialisp.com) 网站。</ul>
