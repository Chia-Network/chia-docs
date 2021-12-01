---
sidebar_position: 3
---

# 1.3 Chia 系统概述

> Chia System Overview

TODO：在此处添加指向相关关键字的其他部分的链接 TODO：添加图片

Chia 是一个点对点 (P2P) 系统，就像比特币或 Bittorrent 一样，它处理支付、交易和系统使用创建的程序。该网络由数十万个节点组成，这些节点存储区块链的历史，并相互传播交易。每笔交易至少花费一枚硬币。Chia 中的硬币是一个对象，它具有一个 ID（硬币 ID）、一个父硬币 ID、一个关联的数量和一个称为拼图的 chialisp 程序。必须为拼图提供适当的解决方案才能使用。

Chia 节点连接到其他 Chia 节点的随机子集，称为对等节点，并在对等数据库中存储有关其他节点的信息。该信息在节点之间定期共享。节点向所有其他节点广播他们看到的新交易和区块。首次启动时，节点必须通过下载区块和交易的整个历史来同步到区块链。

Timelord 节点每隔 9 秒定期广播时间证明（在共识部分解释）。农民维护带有图块（充满随机数的非常大的文件）的硬盘驱动器，这些图块根据每 9 秒发生的“彩票”定期检查空间的中奖证明。当农民中奖时，他们用内存池中的交易创建一个区块，并将其提交给网络的其余部分，作为最新的区块。并非所有区块都包含交易：大约三分之一的区块包含交易。当农民赢得一个区块时，他们会获得一些 XCH（Chia 币）作为奖励，最初为 2XCH，但随着减半计划而减少。每个 Chia 硬币可以细分为万亿分之一，最小的单位（1 万亿分之一）称为 mojo。

钱包是用户可以用来与区块链交互的程序，通过签署交易并将其提交给完整节点。池是农民可以连接的服务器，以平滑他们的奖励，并更频繁地赢得更少的 chia。

文档的其余部分将深入探讨上述所有主题。


<details>
<summary>原文参考</summary>


TODO: add links here to other sections for relevant keywords
TODO: add image

Chia is a peer to peer (P2P) system just like Bitcoin or Bittorrent, which processes payments, transactions, and
programs created by the use's of the system. The network is composed of hundreds of thousands of nodes, which
store the history of the blockchain, and propagate transactions to each other. Each transaction spends at least one coin.
A coin in Chia is an object which has an ID (coin ID), a parent coin ID, an associated amount, and a chialisp program called a puzzle.
The puzzle must be provided with an appropriate solution in order to be spent.

Chia nodes connect to a random subset of other Chia nodes, called peers, and store information about other nodes in the
peer DB. This information is shared periodically between nodes. Nodes broadcast new transactions and blocks that they 
see to all other nodes. When first starting up, nodes have to synchronize to the blockchain, by downloading the entire
history of blocks and transactions.

Timelord nodes periodically broadcast proofs of time (explained in the consensus section) around ever 9 seconds.
Farmers maintain hard drives with plots (very large files full of random numbers) which periodically check for winning
proofs of space, based on the "lottery" that happens every 9 seconds. 
When a farmer wins the lottery, they create a block with the transactions in the memory pool, and 
submit it to the rest of the network for inclusion as the latest block. Not all blocks contain transactions: around 1 in 3 do.
When a farmer wins a block, they obtain some XCH (Chia coin) as reward, initially 2XCH, but decreases with the halving schedule.
Each Chia coin can be subdivided into trillionths, the smallest unit (1 trillionth) is called a mojo.

Wallets are programs that users can use to interact with the blockchain, by signing and submitting transactions to
full nodes. Pools are servers that farmers can connect to, to smooth out their rewards, and win less chia, more often.

The rest of the documentation will go into depth into all of the above topics.

</details>
