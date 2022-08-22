---
sidebar_position: 1
---

# 1.1 关于奇亚

## 什么是奇亚？

奇亚（Chia） 是一个加密货币和区块链智能交易平台。 奇亚的设计初衷是让加密货币比现金更容易使用——也更难丢失。 奇亚的区块链保持与比特币相同安全级别的同时，只使用一小部分能源。

2017 年 8 月 1 日，[布拉姆·科恩](https://www.chia.net/profiles/bram-cohen "Bram Cohen's Chia profile")（Bram Cohen）创立奇亚公司并在特拉华州注册成立。 布拉姆与许多工程师、研究人员、开源贡献者一起领导了奇亚的开发。 在此过程中，奇亚在应用密码学方面创造了三项新发明，并在第四项中提高了兴趣和采用率：

- The first production use of [BLS Signatures](https://github.com/Chia-Network/bls-signatures "Chia's BLS Signatures on GitHub").
- The first production use of a [Verifiable Delay Function (VDF)](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub").
- [Proofs of Space](https://github.com/Chia-Network/chiapos "Chia's Proof of Space repository on GitHub") and [Time](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub") (PoST), the first (and only) Nakamoto consensus since Proof of Work.
- The first production use of [class groups of unknown order](https://github.com/Chia-Network/vdf-competition/blob/main/classgroups.pdf "Binary quadratic forms white paper, by Lipa Long").

奇亚的主网于 2021 年 3 月 19 日启动。 其生态系统的开发正在进行中。

For more information on the company's strategies, see [Chia's business white paper](https://www.chia.net/whitepaper "Chia's business white paper").

## 奇亚的主要特性

奇亚旨在改进比特币在密码学和数字货币领域的许多开创性思想，同时保持相同的总体目标和理念。 奇亚的一些新功能和改进包括：

### 智能交易

Chia has a new smart transaction model, which uses a powerful (yet simple) higher-level language called [chialisp](https://chialisp.com "Chialisp.com"), and an accompanying lower-level language called CLVM (ChiaLisp Virtual Machine).

Chia uses the coin set model (similar to Bitcoin's UTXO) to track the blockchain's state. The simple nature of this model facilitates the writing of high value and secure contracts. Unlike in systems that use the account model such as Ethereum, the code that creates Chia's coins is strongly sandboxed. This increases security, reduces Maximum Extractable Value (MEV), and makes the code fully auditable. 该模型的简单性质有助于编写高价值和安全的合同。 与使用帐户模型的系统（例如以太坊）不同，创建奇亚代币的代码被严格沙盒化，这提高了安全性，降低了最大可提取价值 (MEV)，并使代码完全可审计。 This increases security, reduces Maximum Extractable Value (MEV), and makes the code fully auditable.

> For more info on Chia's smart transactions, see [Section 4.1](/docs/04coin-set-model/what-is-a-coin "Section 4.1: Coins, Puzzles, and Solutions").

### 强大的安全性

[Chia's coins](https://chialisp.com/docs/coins_spends_and_wallets "Tutorial on Chia's coins") are created in a simple, yet highly secure manner:

`coinID = sha256(parent_ID + puzzlehash + amount)`

硬币的 ID（sha256 哈希）是存储在区块链上的主要内容。 由于哈希是不可逆的，所以分析区块链的黑客甚至很难确定硬币的类型，更不用说查看创建它的代码了。 与以太坊相比，使用反编译器查看智能合约的源代码是微不足道的。

同样由于哈希（的不可逆性），黑客不能在不更改 ID 的情况下更改硬币的谜语 ID、谜语哈希或金额。 黑客可以尝试更改硬币的唯一方法是更改它的谜底，确保任何此类更改都将导致花费失败是微不足道的。

> For more info, see [chialisp.com](https://chialisp.com/ "Chialisp.com").

### 高效节能

The PoST consensus has a much [lower energy consumption](https://chiapower.org "Chia's energy consumption statistics") compared to Proof of Work (PoW), and part of Chia's vision involves improving the carbon footprint of the blockchain industry.

> Chia's consensus algorithm is discussed in detail in [Section 3](/docs/03consensus/consensus_intro "Section 3.1: Chia Consensus").

### 去中心化

奇亚使用一种称为[时空证明](https://www.chia.net/assets/ChiaGreenPaper.pdf "Chia's Green Paper")的共识算法。 该算法允许任何拥有互联网连接和一些可用磁盘空间的人参与保护网络。 奇亚独有的农耕程序（类似于挖矿），使其已经拥有数十万个完整节点来保护系统，成为地球上最去中心化的区块链。

### 升级版矿池

与许多其他区块链一样，奇亚允许小农户汇集以获取平滑收益的奖励结构。 但是，奇亚的矿池协议具有三个独特的功能：

- Farmers create new blocks, whether they're farming solo or as a member of a pool.

这个设计决定是结合奇亚的去中心化目标做出的。 在比特币等其他区块链中，任何一天都由四个或五个矿池控制着超过全球 51% 的算力。 （来源：[blockchain.com](https://www.blockchain.com/pools "blockchain.com pie chart of Bitcoin's hashrate distribution"), [blockchair.com](https://blockchair.com/bitcoin/charts/hashrate-distribution "blockchair.com pie chart of Bitcoin's hashrate distribution")) 可以说，攻击比特币最简单的方法是贿赂这些矿池的运营商。

In Chia, the pool operators are only responsible for distributing rewards. They cannot modify the blockchain. Therefore, Chia's pooling protocol doesn't lead to increased centralization. They cannot modify the blockchain. Therefore, Chia's pooling protocol doesn't lead to increased centralization.

- 加入矿池是无需许可的。 农民无需注册任何东西即可加入。

- 当赢得一个区块时，农民获得 1/8 的奖励，矿池运营商获得另外的 7/8。 这样做是为了阻止当矿池运营商在竞争矿池中耕种，获得证明时却忽略创建区块，从而损害他们的竞争。 （作为个体的农民在创建区块时会获得全部奖励。）

> For more info on Chia's pooling protocol, see [Section 11](/docs/11pooling/pooling "Section 11: Pooling").

### 其他主要特性

There are many other innovations in Chia, some of which include:

- BLS signatures, which allow aggregating all of a block's signatures together.
- Scalability and performance improvements, which allow running a Chia node on a Raspberry Pi.
- 权重证明和轻量客户端，可从移动设备快速同步。 更多详细信息，请参阅[第 3.12 节](/docs/03consensus/light_clients "Section 3.12: Chia Light Clients")。

本文档将向技术受众解释奇亚系统不同组件的动机和实现，并提供一切工作原理的深入解释。 如果你想跳到如何在奇亚上制作去中心化应用程序（dapps），请访问 [chialisp.com](https://chialisp.com)。

This is a test for localization. Will test after.

Delete Text.
