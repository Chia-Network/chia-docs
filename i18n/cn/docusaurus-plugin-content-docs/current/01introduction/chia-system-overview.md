---
sidebar_position: 3
---

# 1.3 Chia 系统概述

> Chia System Overview

本节将提供 Chia 网络的基本概述。我们将在后面的章节中详细介绍。

### Chia 网络

有不同类型的点对点 (P2P) 网络，例如 BitTorrent、Bitcoin 和 Chia。 Chia 网络是一个执行多项主要功能的区块链，包括处理金融交易、运行 Chialisp 编写的程序以及从 XCH（Chia 的基础货币）铸造代币。该网络由数十万个节点组成，每个节点都存储区块链历史的副本，同时还通过网络传播新交易。

<details>
<summary>原文参考</summary>

This section will provide a basic overview of Chia's network. We'll go into much more detail in later sections.

- ### Chia's network

There are different types of peer-to-peer (P2P) networks, such as BitTorrent, Bitcoin, and Chia. The Chia network is a blockchain that performs several major functions, including processing financial transactions, running programs written in Chialisp, and minting tokens from XCH (Chia's base currency). The network is composed of hundreds of thousands of nodes, each of which stores a copy of the blockchain's history, while also propagating new transactions across the network.

</details>

### 币和交易

Chia 使用硬币集 (UTXO) 模型来跟踪网络状态。在这个模型中，硬币是一等物。每个硬币都被称为拼图的 Chialisp 程序锁定，然后对其进行散列以创建拼图哈希。硬币的 ID 是其父硬币的 ID、其拼图哈希及其数量的散列。

Chia 中的每笔交易必须至少花费一枚硬币。为了花费一枚硬币，必须提供原始拼图、有效解决方案和可选的聚合签名。多个币可以通过使用*公告*在同一交易中相互通信。

有关硬币集模型和 Chia 的链上编程环境的更多信息，请访问 [chialisp.com](https://chialisp.com/)。

<details>
<summary>原文参考</summary>

- ### Coins and transactions

Chia uses the coin set (UTXO) model to keep track of the network's state. In this model, a coin is a first-class object. Each coin is locked with a Chialisp program called a _puzzle_, which is then hashed to create a _puzzlehash_. The coin's ID is a hash of its parent coin's ID, its puzzlehash, and its amount.

Each transaction in Chia must spend at least one coin. In order to spend a coin, one must provide the original puzzle, as well as a valid solution, and an optional aggregated signature. Multiple coins can communicate with each other in the same transaction by using _announcements_.

For more info about the coin set model and Chia's on-chain programming environment, see [chialisp.com](https://chialisp.com).

</details>

### 节点

Chia 节点连接到其他 Chia 节点的随机子集，称为对等节点。节点定期从对等方发送和接收信息，然后将这些信息本地存储在对等方数据库中。每个节点将他们看到的所有新交易和区块广播给他们的对等方，然后将这些信息传递给他们的对等方，从而使信息在整个网络中快速传播。首次启动时，节点必须通过下载区块和交易的整个历史来同步到区块链。

>完整节点协议可以在[第 10 节](/docs/10protocol/protocol "Section 3.10: Full Node Protocol")中找到。

此外，节点可以选择 *耕种* 来帮助保护网络。他们通过存储称为 *图块* 的大文件来做到这一点，这些文件主要由称为 *空间证明* 的随机数据组成。这些空间证明作为正在进行的彩票中的彩票。农民储存的地块越多，获胜的概率就越高。

>[第 3.2 节](/docs/03consensus/proof-of-space "Section 3.2: Proof of Space.") 中列出了图块构建协议。 ）。

赢得彩票的奖品称为*块奖励*。最初，这个奖励是 2 XCH。但是，在 Chia 存在的前 12 年中，奖励金额大约每三年减少一半。从那时起，奖励将始终是 XCH 的 1/8。

>更多关于区块奖励结构的信息可以在[第5.3节](/docs/05block-validation/block_rewards "Section 5.3: Block Rewards")中找到.

虽然“XCH”是一种方便的 Chia 币计价方式，但区块链只知道 *mojos*。这些是 Chia 硬币的最小面额。每个魔力值一个 XCH 的万亿分之一（1/1,000,000,000,000）。

<details>
<summary>原文参考</summary>

- ### Nodes

Chia nodes connect to a random subset of other Chia nodes, called peers. The nodes periodically send and receive information from peers, which is then stored locally in a peer database. Each node broadcasts all new transactions and blocks that they see to their peers, which in turn relay this information to _their_ peers, resulting in the information quickly being propagated throughout the network. When first starting up, nodes have to synchronize to the blockchain, by downloading the entire history of blocks and transactions.

  >The Full Node Protocol can be found in [Section 10](/docs/10protocol/protocol "Section 3.10: Full Node Protocol").

Additionally, nodes have the option of _farming_ to help secure the network. They do this by storing large files called _plots_, which mostly consist of random data called _proofs of space_. These proofs of space function as tickets in an ongoing lottery. The more plots a farmer stores, the higher the probability of winning.

  >The plot construction protocol is laid out in [Section 3.2](/docs/03consensus/proof-of-space "Section 3.2: Proof of Space.").

The prize for winning the lottery is called the _block reward_. Initially, this reward is 2 XCH. However, the reward amount is cut in half approximately every three years for the first 12 years of Chia's existence. From that point forward, the reward will always be 1/8 of an XCH.

  >More info on the block reward structure can be found in [Section 5.3](/docs/05block-validation/block_rewards "Section 5.3: Block Rewards").

While "XCH" is a convenient way to denominate Chia coins, the blockchain only knows about _mojos_. These are the smallest denomination of Chia's coins. Each mojo is worth one trillionth (1/1,000,000,000,000) of an XCH.

</details>

### 时间领主节点

时间领主节点广播 *时间证明*（在 [第 3.3 节](/docs/03consensus/vdfs "Section 3.3: VDFs")中解释））大约每九秒。 这相当于在正在进行的彩票中选择和广播中奖号码。 当农民拥有有效的空间证明时，他们将赢得当前的彩票。 这允许他们将内存池中支付最高的交易处理到一个新块中。 然后他们将此块广播到网络的其余部分。 大约每三个区块中就有一个包含交易。 其余的块是空的，但要支付奖励。 （请参阅 [第 3.10 节](/docs/03consensus/foliage "Section 3.10: Foliage")了解更多详细信息。）

>时间领主算法在[第3.13节](/docs/03consensus/timelords "Section 3.13: Timelord Algorithm")中解释。

<details>
<summary>原文参考</summary>

- ### Timelord nodes

Timelord nodes broadcast _proofs of time_ (explained in [Section 3.3](/docs/03consensus/vdfs "Section 3.3: VDFs")) around every nine seconds. This is equivalent to selecting and broadcasting the winning numbers in an ongoing lottery. When a farmer has a valid proof of space, they win the current lottery drawing. This allows them to process the highest-paying transactions from the mempool into a new block. They then broadcast this block to the rest of the network. Around one out of every three blocks contains transactions. The rest of the blocks are empty, but do pay a reward. (See [Section 3.10](/docs/03consensus/foliage "Section 3.10: Foliage") for more details.)

  >The timelord algorithm is explained in [Section 3.13](/docs/03consensus/timelords "Section 3.13: Timelord Algorithm").

</details>

### 钱包

钱包是允许用户通过签署交易并将交易提交给完整节点来与区块链交互的程序。 Chia 公司包括其带有典型安装的官方钱包。 但是，第三方钱包也存在。

> [第 3.12 节](/docs/03consensus/light_clients "Section 3.12: Light Clients") 有更多关于钱包的信息。

<details>
<summary>原文参考</summary>

- ### Wallets

Wallets are programs that allow users to interact with the blockchain, by signing and submitting transactions to full nodes. The Chia company includes its official wallet with a typical installation. However, third-party wallets also exist.

  >[Section 3.12](/docs/03consensus/light_clients "Section 3.12: Light Clients") has more info on wallets.

</details>

### 矿池

池允许农民平滑他们的奖励。 他们经常支付小额奖励，通常是每天。 他们倾向于为他们的服务收取少量费用。 Chia 公司不经营自己的游泳池。 许多流行的 Chia 矿池还提供种植或开采其他加密货币的服务。

> 有关 Chia 池化协议的更多信息，请参阅 [第 11 节](/docs/11pooling/pooling "Section 11: Pooling")。

文档的其余部分将对上述每个主题进行深入介绍。

<details>
<summary>原文参考</summary>

- ### Pools

Pools allow farmers to smooth out their rewards. They pay out small rewards frequently, often daily. They tend to charge a small fee for their services. The Chia company doesn't run its own pools. Many popular Chia pools also offer services for farming or mining other cryptocurrencies.

  >For more info on Chia's pooling protocol, see [Section 11](/docs/11pooling/pooling "Section 11: Pooling").

The rest of the documentation will go in-depth for each of the above topics.

</details>
