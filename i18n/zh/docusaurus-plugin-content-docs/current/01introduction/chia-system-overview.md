---
sidebar_position: 3
---

# 1.3 奇亚系统概述

本节将提供 Chia 网络的基本概述。 我们将在后面的章节中详细介绍。

### 奇亚网络
There are different types of peer-to-peer (P2P) networks, such as BitTorrent, Bitcoin, and Chia. The Chia network is a blockchain that performs several major functions, including processing financial transactions, running programs written in Chialisp, and minting tokens from XCH (Chia's base currency). The network is composed of hundreds of thousands of nodes, each of which stores a copy of the blockchain's history, while also propagating new transactions across the network. 奇亚网络是一个执行多项主要功能的区块链，包括处理金融交易、运行 Chialisp 编写的程序以及从 XCH（奇亚的基础货币）铸造代币。 该网络由数十万个节点组成，每个节点都存储区块链历史的副本，同时还通过网络传播新交易。

### 币和交易
Chia uses the coin set (UTXO) model to keep track of the network's state. In this model, a coin is a first-class object. Each coin is locked with a Chialisp program called a _puzzle_, which is then hashed to create a _puzzlehash_. The coin's ID is a hash of its parent coin's ID, its puzzlehash, and its amount. 在这个模型中，硬币是一等物。 每个硬币都被称为谜语的 Chialisp 程序锁定，然后对其进行哈希以创建谜语哈希。 硬币的 ID 是其父硬币的 ID、其谜语哈希和金额。

Each transaction in Chia must spend at least one coin. In order to spend a coin, one must provide the original puzzle, as well as a valid solution, and an optional aggregated signature. Multiple coins can communicate with each other in the same transaction by using _announcements_. 为了花费一枚硬币，必须提供原始谜语、有效谜底和可选的聚合签名。 多个币可以通过使用*公告*在同一交易中相互通信。

For more info about the coin set model and Chia's on-chain programming environment, see [chialisp.com](https://chialisp.com).

### 节点
奇亚节点连接到其他奇亚节点的随机子集，称为对等节点。 节点定期从对等方发送和接收信息，然后将这些信息本地存储在对等方数据库中。 每个节点将他们看到的所有新交易和区块广播给他们的对等方，然后将这些信息传递给他们的对等方，从而使信息在整个网络中快速传播。 首次启动时，节点必须通过下载区块和交易的整个历史来同步到区块链。
> The Full Node Protocol can be found in [Section 10](/docs/10protocol/protocol "Section 3.10: Full Node Protocol").

Additionally, nodes have the option of _farming_ to help secure the network. They do this by storing large files called _plots_, which mostly consist of random data called _proofs of space_. These proofs of space function as tickets in an ongoing lottery. The more plots a farmer stores, the higher the probability of winning. 他们通过存储称为*图块*的大文件来做到这一点，这些文件主要由称为*空间证明*的随机数据组成。 这些空间证明作为正在进行的彩票中的彩票。 农民储存的地块越多，获胜的概率就越高。
> The plot construction protocol is laid out in [Section 3.2](/docs/03consensus/proof-of-space "Section 3.2: Proof of Space.").

The prize for winning the lottery is called the _block reward_. Initially, this reward is 2 XCH. However, the reward amount is cut in half approximately every three years for the first 12 years of Chia's existence. From that point forward, the reward will always be 1/8 of an XCH. 最初，这个奖励是 2 XCH。 但是，在奇亚存在的前 12 年中，奖励金额大约每三年减少一半。 从那时起，奖励将始终是 XCH 的 1/8。
> More info on the block reward structure can be found in [Section 5.3](/docs/05block-validation/block_rewards "Section 5.3: Block Rewards").

While "XCH" is a convenient way to denominate Chia coins, the blockchain only knows about _mojos_. These are the smallest denomination of Chia's coins. Each mojo is worth one trillionth (1/1,000,000,000,000) of an XCH. 这些是奇亚币的最小面额。 每个魔力值一个 XCH 的万亿分之一（1/1,000,000,000,000）。

### 时间领主节点
时间领主节点广播*时间证明*（在[第 3.3 节](/docs/03consensus/vdfs "Section 3.3: VDFs")中解释）大约每九秒。 这相当于在正在进行的彩票中选择和广播中奖号码。 当农民拥有有效的空间证明时，他们将赢得当前的彩票。 这允许他们将交易池中支付最高的交易处理到一个新块中。 然后他们将此块广播到网络的其余部分。 大约每三个区块中就有一个包含交易。 其余的块是空的，但要支付奖励。 （请参阅[第 3.10 节](/docs/03consensus/foliage "Section 3.10: Foliage")了解更多详细信息。）
> The timelord algorithm is explained in [Section 3.13](/docs/03consensus/timelords "Section 3.13: Timelord Algorithm").

### Wallets
Wallets are programs that allow users to interact with the blockchain, by signing and submitting transactions to full nodes. The Chia company includes its official wallet with a typical installation. However, third-party wallets also exist. 奇亚公司包括其带有典型安装的官方钱包。 但是，第三方钱包也存在。
> [Section 3.12](/docs/03consensus/light_clients "Section 3.12: Light Clients") has more info on wallets.

### Pools
矿池允许农民平滑他们的奖励。 他们经常支付小额奖励，通常是每天。 他们倾向于为他们的服务收取少量费用。 奇亚公司不经营自己的矿池。 Pools allow farmers to smooth out their rewards. They pay out small rewards frequently, often daily. They tend to charge a small fee for their services. The Chia company doesn't run its own pools. Many popular Chia pools also offer services for farming or mining other cryptocurrencies.
> For more info on Chia's pooling protocol, see [Section 11](/docs/11pooling/pooling "Section 11: Pooling").

The rest of the documentation will go in-depth for each of the above topics.
