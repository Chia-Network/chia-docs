---
sidebar_position: 1
---

# 1.1 关于 Chia

> About Chia

## 什么是 Chia？

Chia 是一个加密货币和区块链智能交易平台。 Chia 的设计初衷是让加密货币比现金更容易使用——也更难丢失。 Chia 的区块链保持与比特币相同的安全级别，同时只使用一小部分能源。

2017年8月1日，[Bram Cohen](https://www.chia.net/profiles/bram-cohen "Bram Cohen's Chia profile")创立Chia公司并在特拉华州注册成立。 Bram 与许多工程师、研究人员和开源贡献者一起领导了 Chia 的开发。在此过程中，Chia 在应用密码学方面创造了三项新发明，并在第四项中提高了兴趣和采用率：
  * [BLS Signatures](https://github.com/Chia-Network/bls-signatures "Chia's BLS Signatures on GitHub")的首次生产使用。
  * [可验证延迟函数（VDF）](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub")的首次生产使用。
  * [空间证明](https://github.com/Chia-Network/chiapos "Chia's Proof of Space repository on GitHub") 和 [时间](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub")（PoST），这是自工作量证明以来的第一个（也是唯一一个）中本聪共识。
  * [未知顺序的类组](https://github.com/Chia-Network/vdf-competition/blob/main/classgroups.pdf "Binary quadratic forms white paper, by Lipa Long")的第一个生产使用。

Chia 的主网于 2021 年 3 月 19 日启动。其生态系统的开发正在进行中。

更多公司战略信息请参见[Chia商业白皮书](https://www.chia.net/whitepaper "Chia's business white paper")。

<details>
<summary>原文参考</summary>

## What is Chia?

Chia is a cryptocurrency and blockchain smart transaction platform. Chia was designed from the ground up to make cryptocurrency easier to use -- and harder to lose -- than cash. Chia's blockchain maintains the same level of security as Bitcoin's, while using a fraction of the energy.

On August 1, 2017, [Bram Cohen](https://www.chia.net/profiles/bram-cohen "Bram Cohen's Chia profile") founded the Chia company and incorporated it in the state of Delaware. Bram led the development of Chia, along with many engineers, researchers, and open source contributors. Along the way, Chia created three new inventions in applied cryptography, and advanced the interest and adoption in a fourth:
  * The first production use of [BLS Signatures](https://github.com/Chia-Network/bls-signatures "Chia's BLS Signatures on GitHub").
  * The first production use of a [Verifiable Delay Function (VDF)](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub").
  * [Proofs of Space](https://github.com/Chia-Network/chiapos "Chia's Proof of Space repository on GitHub") and [Time](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub") (PoST), the first (and only) Nakamoto consensus since Proof of Work.
  * The first production use of [class groups of unknown order](https://github.com/Chia-Network/vdf-competition/blob/main/classgroups.pdf "Binary quadratic forms white paper, by Lipa Long").

Chia's mainnet was launched on March 19, 2021. Development of its ecosystem is ongoing.

For more information on the company's strategies, see [Chia's business white paper](https://www.chia.net/whitepaper "Chia's business white paper").

</details>

## Chia的主要特点

Chia 旨在改进比特币在密码学和数字货币领域的许多开创性思想，同时保持相同的总体目标和理念。 Chia 的一些新功能和改进包括：

### 智能交易

Chia 有一个新的智能交易模型，它使用一个强大（但简单）的高级语言 [chialisp](https://chialisp.com "Chialisp.com")，以及一个伴随的低级语言 CLVM (Chialisp 虚拟机）。

Chia 使用硬币集模型（类似于比特币的 UTXO）来跟踪区块链的状态。 该模型的简单性质有助于编写高价值和安全的合同。 与使用帐户模型的系统（例如以太坊）不同，创建 Chia 代币的代码被严格沙盒化。 这提高了安全性，降低了最大可提取值 (MEV)，并使代码完全可审计。

>有关 Chia 智能交易的更多信息，请参阅 [第 4.1 节](/docs/04coin-set-model/what-is-a-coin "Section 4.1: Coins, Puzzles, and Solutions")。

### 强大的安全性

[Chia 币](https://chialisp.com/docs/coins_spends_and_wallets "Tutorial on Chia's coins") 以一种简单但高度安全的方式创建：

`coinID = sha256(parent_ID + puzzlehash + amount)`

硬币的 ID（sha256 哈希）是存储在区块链上的主要方面。 哈希是不可逆的，因此分析区块链的黑客甚至很难确定硬币的类型，更不用说查看创建它的代码了。 与以太坊相比，使用反编译器查看智能合约的源代码是微不足道的。

同样由于散列，黑客不能在不更改 ID 的情况下更改硬币的 parent_ID、puzzyhash 或数量。 黑客可以尝试更改硬币的唯一方面是它的解决方案，确保任何此类更改都将导致花费硬币失败是微不足道的。

>更多信息，请参见[chialisp.com](https://chialisp.com/ "Chialisp.com")。

### 高效节能

与工作量证明 (PoW) 相比，PoST 共识具有 [更低的能耗](https://chiapower.org "Chia's energy consumption statistics")，并且是 Chia 的一部分
愿景涉及改善区块链行业的碳足迹。

> Chia 的共识算法在[第 3 节](/docs/03consensus/consensus_intro "Section 3.1: Chia Consensus") 中有详细讨论。

### 去中心化

Chia 使用一种称为 [时空证明](https://www.chia.net/assets/ChiaGreenPaper.pdf "Chia's Green Paper")的共识算法。 该算法允许任何拥有互联网连接和一些可用磁盘空间的人参与保护网络。 由于这种耕作过程（类似于采矿），Chia 已成为地球上最去中心化的区块链，拥有数十万个完整节点来保护系统。

### 升级版矿池

与许多其他区块链一样，Chia 允许汇集以平滑对小农户的奖励结构。但是，Chia 的池化协议具有三个独特的功能：

* 农民创造新的区块，无论他们是独自耕种还是作为游泳池的成员。
  
这个设计决定是结合 Chia 的去中心化目标做出的。在比特币等其他区块链中，任何一天都有四个或五个矿池控制着超过 51% 的全球算力。 （来源：[blockchain.com](https://www.blockchain.com/pools "blockchain.com pie chart of Bitcoin's hashrate distribution"), [blockchair.com](https://blockchair.com/bitcoin/charts/hashrate-distribution "blockchair.com pie chart of Bitcoin's hashrate distribution")) 可以说，攻击比特币的最简单方法是贿赂这些矿池的运营商。

在Chia，矿池运营商只负责分配奖励。他们不能修改区块链。因此，Chia 的池化协议不会导致集中化。

* 加入池是未经许可的。农民无需注册任何东西即可加入。

* 赢得一个区块时，农民获得 1/8 的奖励，矿池运营商获得另外的 7/8。这样做是为了阻止矿池运营商通过在竞争矿池中耕种而在他们找到证据时忽略创建区块来损害他们的竞争。 （单独的农民在创建区块时会获得全部奖励。）

>有关 Chia 池化协议的更多信息，请参阅 [第 11 节](/docs/11pooling/pooling "Section 11: Pooling")。

### 其他主要特点

这里还有 Chia 的许多其他创新，其中一些包括：
* BLS 签名，允许将一个区块的所有签名聚合在一起。
* 可扩展性和性能改进，允许在 Raspberry Pi 上运行 Chia 节点。
* 重量证明和轻客户端，可从移动设备快速同步。 有关详细信息，请参阅 [第 3.12 节](/docs/03consensus/light_clients "Section 3.12: Chia Light Clients")。

本文档将向技术受众解释 Chia 系统不同组件的动机和实现，并提供一切工作原理的深入解释。 如果你想跳到如何制作 dapps（去中心化应用程序）在 Chia，请访问 [chialisp.com](https://chialisp.com)。

<details>
<summary>原文参考</summary>

- ## Chia's key features

Chia aims to improve upon Bitcoin's many pioneering ideas in the fields of cryptography and digital currencies, while maintaining the same overall purpose and philosophy. Some of Chia's new features and improvements include:

- ### Smart transactions

Chia has a new smart transaction model, which uses a powerful (yet simple) higher-level language called [chialisp](https://chialisp.com "Chialisp.com"), and an accompanying lower-level language called CLVM (ChiaLisp Virtual Machine).

Chia uses the coin set model (similar to Bitcoin's UTXO) to track the blockchain's state. The simple nature of this model facilitates the writing of high value and secure contracts. Unlike in systems that use the account model such as Ethereum, the code that creates Chia's coins is strongly sandboxed. This increases security, reduces Maximum Extractable Value (MEV), and makes the code fully auditable.

>For more info on Chia's smart transactions, see [Section 4.1](/docs/04coin-set-model/what-is-a-coin "Section 4.1: Coins, Puzzles, and Solutions").

- ### Strong Security

[Chia's coins](https://chialisp.com/docs/coins_spends_and_wallets "Tutorial on Chia's coins") are created in a simple, yet highly secure manner:

`coinID = sha256(parent_ID + puzzlehash + amount)`

The coin's ID (a sha256 hash) is the main aspect that's stored on the blockchain. Hashes are not reversible, so it's very difficult for a hacker analyzing the blockchain to even determine what a coin's type is, let alone to view the code that created it. Contrast that with Ethereum, where it's trivial to view a smart contract's source code by using a decompiler.

Also due to hashing, a hacker cannot change a coin's parent_ID, puzzlehash, or amount without changing the ID as well. The only aspect of a coin that a hacker can attempt to change is its solution, and it's trivial to ensure that any such changes will result in a failure to spend the coin.

>For more info, see [chialisp.com](https://chialisp.com/ "Chialisp.com").

- ### Energy efficient

The PoST consensus has a much [lower energy consumption](https://chiapower.org "Chia's energy consumption statistics") compared to Proof of Work (PoW), and part of Chia's
vision involves improving the carbon footprint of the blockchain industry.

>Chia's consensus algorithm is discussed in detail in [Section 3](/docs/03consensus/consensus_intro "Section 3.1: Chia Consensus").

- ### Decentralized

Chia uses a consensus algorithm called [Proofs of Space and Time](https://www.chia.net/assets/ChiaGreenPaper.pdf "Chia's Green Paper"). This algorithm allows anyone with an internet connection and some free disk space to participate in securing the network. Because of this process of farming (analogous to mining), Chia has become the most decentralized blockchain on the planet, with hundreds of thousands of full nodes securing the system.

- ### Improved Pooling

Like many other blockchains, Chia allows pooling to smooth out the rewards structure for smaller farmers. However, Chia's pooling protocol has three unique features:

  * Farmers create new blocks, whether they're farming solo or as a member of a pool.
  
  This design decision was made in conjunction with Chia's goal of decentralization. In other blockchains such as Bitcoin, four or five pools control over 51% of the global hashrate on any given day. (Sources: [blockchain.com](https://www.blockchain.com/pools "blockchain.com pie chart of Bitcoin's hashrate distribution"), [blockchair.com](https://blockchair.com/bitcoin/charts/hashrate-distribution "blockchair.com pie chart of Bitcoin's hashrate distribution")) Arguably, the easiest way to attack Bitcoin would be to bribe each of these pools' operators.

  In Chia, the pool operators are only responsible for distributing rewards. They cannot modify the blockchain. Therefore, Chia's pooling protocol doesn't lead to increased centralization.

  * Joining a pool is permissionless. Farmers don't need to sign up for anything in order to join.

  * When a block is won, the farmer gets 1/8 of the rewards, and the pool operator gets the other 7/8. This was done to discourage pool operators from harming their competition by farming on a competing pool and neglecting to create a block when they find a proof. (Solo farmers collect the entire reward when they create a block.)

>For more info on Chia's pooling protocol, see [Section 11](/docs/11pooling/pooling "Section 11: Pooling").

- ### Other key features

There are many other innovations in Chia, some of which include:
* BLS signatures, which allow aggregating all of a block's signatures together.
* Scalability and performance improvements, which allow running a Chia node on a Raspberry Pi.
* Weight proofs and light clients, which enable fast syncing from a mobile device. For more info, see [Section 3.12](/docs/03consensus/light_clients "Section 3.12: Chia Light Clients") .

This documentation will explain the motivation and implementation of the different components of the Chia system to a technical audience, and provide in-depth explanations of how everything works. If you would like to skip to how to make dapps (decentralized
apps) on Chia, please visit [chialisp.com](https://chialisp.com).
  
</details>
