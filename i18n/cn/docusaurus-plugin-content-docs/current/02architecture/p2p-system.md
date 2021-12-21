---
sidebar_position: 1
---

# 2.1 点对点系统

> Peer to Peer system

![chia-architecture](/img/chia-network-architecture.png)

上图展示了 Chia 的网络架构。 一台机器可以运行多个这些进程。 实际上，默认配置是同时运行四个进程：Farmer、Full Node、Harvester 和 Wallet。 许多农民也会选择运行 Electron GUI 和 Pool 进程。 此外，一些农民，尤其是那些拥有多 PiB 农场的农民，会选择经营 Timelord。

让我们分别讨论这些进程中的每一个，以及连接它们的协议。

## 全节点

Chia 点对点系统的核心是由全节点组成。 全节点有几个职责：

1. 维护区块链的副本。
2. 验证区块链。
3. 使用对等协议通过网络传播新的区块、交易和证明。
4.（可选）通过钱包协议服务轻客户端（钱包）。
5.（可选）与农民沟通。
6.（可选）与时间领主沟通。

通常，农民在他们的农民进程旁边运行一个全节点进程。全节点不赚取任何奖励或费用，但它们对于维护共识规则和系统安全很重要。运行全节点可以让用户对区块链的完整状态充满信心，并避免信任他人。

全节点始终连接到网络中随机的一组全节点。全节点会定期向对等节点广播自己的信息（IP 地址和端口），以便整个网络都知道它们仍在运行。全节点还向其对等节点广播所有新区块和交易，从而允许网络中的所有节点保留区块链的完整副本。

<details>
<summary>原文参考</summary>

![chia-architecture](/img/chia-network-architecture.png)

The above diagram shows Chia's network architecture. A single machine can run more than one of these processes. In fact, the default configuration is to run four processes together: Farmer, Full Node, Harvester, and Wallet. Many farmers will also choose to run the Electron GUI and Pool processes. Additionally, a few farmers, especially those with multi-PiB farms, will choose to run a Timelord.

Let's discuss each of these processes, and the protocols that connect them, separately.

- ## Full Nodes

The core of Chia's peer-to-peer system is composed of full nodes. Full nodes have several responsibilities:
1. Maintain a copy of the blockchain.
2. Validate the blockchain.
3. Propagate new blocks, transactions, and proofs through the network, using the peer protocol.
4. (Optional) Serve light clients (wallets) through the wallet protocol.
5. (Optional) Communicate with farmers.
6. (Optional) Communicate with timelords.

Usually, farmers run a full node process alongside their farmer process. Full nodes earn no rewards or fees, but they are important to maintain the consensus rules and the security of the system. Running a full node allows a user to be confident about the full state of the blockchain, and avoid trusting others.

Full nodes are always connected to a random set of full nodes in the network. Full nodes broadcast their own information (IP address and port) to their peers periodically, so that the entire network is aware that they are still running. Full nodes also broadcast all new blocks and transactions to their peers, allowing all nodes in the network to keep a complete copy of the blockchain.

</details>

## 农民

Chia 的农民类似于比特币的矿工。他们通过在存储的图块内找到有效的空间证明来赚取区块奖励和费用。农民进程不维护区块链的副本，但他们信任一个完整的节点来提供更新。全节点和农民进程使用农民协议相互通信。

农民通过收割机协议与收割机（单独的机器，包括实际存储地块的农民机器）进行通信。

农民通过等待来自完整节点的更新进行操作，大约每 9 秒就会为他们提供新的标牌点（相当于彩票的中奖号码）。农民然后将标牌点发送到每个收割机，以检查是否存在任何获胜的空间证明。如果收割机找到任何有效的证明，它会将它们发送给农民，农民将它们分为两类：

* 完整的证明必须达到或超过网络难度级别要求的质量。这些证明被发送到全节点，然后创建一个新块。
* 矿池使用部分证明来估算节点的总存储量。

农民还有一个私钥，用于在找到获胜证明时对区块进行签名，以及对部分证明进行签名，然后将其发送到矿池中。

<details>
<summary>原文参考</summary>

- ## Farmers

Chia's farmers are analogous to Bitcoin's miners. They earn block rewards and fees by finding valid proofs of space inside their stored plots. The farmer processes don't maintain a copy of the blockchain, but they trust a full node to provide updates. The full node and farmer processes communicate with each other using the farmer protocol.

Farmers communicate with harvesters (individual machines, including the farmer machine, that actually store the plots) through the harvester protocol.

Farmers operate by waiting for updates from a full node, which gives them new signage points (equivalent to a lottery's winning numbers) approximately every nine seconds. Farmers then send the signage point to each harvester, to check whether any winning proofs of space exist. If the harvester finds any valid proofs, it sends them to the farmer, which separates them into two categories:
* Full proofs must match or surpass the quality required by the network's difficulty level. These proofs are sent to the full node, which then creates a new block.
* Partial proofs are used by pools to approximate a node's total storage.

Farmers also have a private key, which is used for both signing blocks when a winning proof is found, as well as for signing partial proofs, which are then sent to pools.

</details>

## 收割机

收割机是由农民控制的独立机器。在大型农场作业中，一个农民可能连接到许多收割机。

收割机通过从磁盘检索质量或证明来控制实际的绘图文件。最小图块大小（也是迄今为止最常见的）是 k32，相当于大约 100 GiB。随着 k 值的每次增加，图块大小大约增加一倍，因此 k33 绘图大约为 200 GiB，k34 大约为 400 GiB，等等。

难度级别每 4608 个块自动调整，以针对每两个标牌点的一个空间证明——跨越整个网络。这是目标平均值——每个标牌点也可以有零个或多个证明。这导致大约每 24 小时调整一次难度。

给定一个图块，收割者必须执行两项任务才能找到有效的证明：
1. 获取初始质量——这需要大约 7 次随机磁盘搜索，或者在慢速 HDD 上需要 70 毫秒。
2.（仅当初始质量足够高时才执行）获取完整证明——这需要大约 64 次磁盘寻道，或在慢速 HDD 上需要 640 毫秒。

对于大多数挑战，质量（第 1 步）将非常低，因此不需要获取整个证明（第 2 步）。节点有 28 秒的时间返回证明，因此磁盘 I/O 不会成为限制因素，即使证明存储在慢速 HDD 上也是如此。

>注意：磁带驱动器对于耕作来说太慢了。该协议旨在支持硬盘，但速度并不慢。可以使用磁带进行长期的地块存储，仅将地块转移到磁盘以用于偶尔的耕作，但这可能是一个非常罕见的用例。

最后，收割机还为每个地块维护一个私钥。块用这些密钥签名，这是 Chia 中的一个重要概念。这意味着即使农民是池的成员，农民仍然控制块的内容。这与其他区块链的池协议大不相同，池操作员是签署块的人。

> [第 3.6 节](/docs/03consensus/harvester_algorith "Section 3.6: Harvester Algorithm")中更详细地讨论了收割机算法。

<details>
<summary>原文参考</summary>

- ## Harvesters

Harvesters are individual machines controlled by a farmer. In a large farming operation, a farmer may be connected to many harvesters.

Harvesters control the actual plot files by retrieving qualities or proofs from disk. The minimum plot size (and by far the most common) is k32, which corresponds to around 100 GiB. With each increment of a k-value, the plot size roughly doubles, so a k33 plot is around 200 GiB, k34 is around 400 GiB, etc.

The difficulty level automatically adjusts every 4608 blocks to target one proof of space -- across the entire network -- for every two signage points. This is the targeted average value -- there can also be zero or multiple proofs per signage point. This leads to a difficulty adjustment approximately every 24 hours.

Given a plot, the harvester must perform two tasks to find a valid proof:
1. Fetch the initial quality -- this requires around seven random disk seeks, or 70 milliseconds on a slow HDD.
2. (Only performed if the initial quality is sufficiently high) Fetch the full proof -- this requires around 64 disk seeks, or 640 milliseconds on a slow HDD.

For most challenges, the quality (step 1) will be very low, so fetching the entire proof (step 2) will not be necessary. A node has 28 seconds to return a proof, so disk I/O will not be a limiting factor, even when proofs are stored on slow HDDs.

  >NOTE: Tape drives are too slow for farming. The protocol was designed to support hard disks, but nothing slower. It is possible to use tape for long-term plot storage, only transferring the plots to disks for occasional farming, but this is likely a very rare use case.

Finally, harvesters also maintain a private key for each plot. The blocks are signed with these keys, which is an important concept in Chia. It means that even when a farmer is a member of a pool, the farmer still controls the contents of a block. This is quite different from other blockchains' pooling protocols, where the pool operators are the ones signing the blocks.

  >The harvester algorithm is discussed in greater detail in [Section 3.6](/docs/03consensus/harvester_algorith "Section 3.6: Harvester Algorithm").

</details>

## 时间领主

时间领主通过创建连续的时间证明（使用 [可验证延迟函数](/docs/03consensus/vdfs "Section 3.3: VDFs")）并大约每 9 秒广播一次来支持网络。这提供了“确定性随机性”，用于决定空间的获胜证明。

由于这种计算是顺序的，因此消耗的能量非常少，与工作量证明系统相反，其中计算是可并行的。例如，如果 100 个时间领主在时间证明上进行相同的计算，他们都会创建完全相同的输出。

>时间领主算法在[第3.13节](/docs/03consensus/timelords "Section 3.13: Timelord Algorithm")中有解释。

时间领主需要连接到一个完整的节点，通常在同一台机器上。此连接使用证书进行验证。这种 1:1 架构具有很大的安全优势：它将时间领主保持在自己的专用网络中的沙箱中。这样，全节点协议是唯一需要完全安全的协议。如果多个完整节点可以连接到同一个时间领主，就会给网络增加一个潜在的攻击向量。

时间领主不直接获得奖励。此外，只有网络上最快的时间领主才会在任何给定时间广播证明。因此，只需要一个时间领主来保持网络运行，大多数农民不会觉得有必要运行一个。然而，拥有多 PiB 农场的农民可能想要运行一个时间领主，以实现冗余和防止临时本地延迟问题。

>注意：Chia网络目前正在[开发ASIC时间领主](https://www.businesswire.com/news/home/20211013005324/en/Chia-Partners-With-Supranational-to-Create-Industry-Leading-Proof-of-Space-Time-Security)。这将为网络增加冗余，同时降低攻击者创建自己的时间领主的可能性，该时间领主比其他任何人都快得多。

如果有人控制了世界上最快的时间领主，那么他们在赢得奖励方面并没有太大优势。然而，他们可能会成为孤儿或审查其他农民，这取决于他们的时间领主有多快。

此外，时间领主比其他任何人都快得多的攻击者可能会在不到 51% 的空间内对网络进行 51% 的攻击。出于安全目的，保持 VDF 硬件的开放设计非常重要。

>您可以在[第 3.14 节](/docs/03consensus/attacks_and_countermeasures "Section 3.14: Attacks and Countermeasures")中了解针对 Chia 网络的潜在攻击。

<details>
<summary>原文参考</summary>

- ## Timelords

Timelords support the network by creating sequential proofs of time (using a [Verifiable Delay Function](/docs/03consensus/vdfs "Section 3.3: VDFs")) and broadcasting them approximately every nine seconds. This provides "deterministic randomness", which is used to decide the winning proofs of space.

Since this computation is sequential, very little energy is consumed, as opposed to proof-of-work systems, where computation is parallelizable. For example, if 100 timelords are doing the same computation on a proof of time, they will all create the exact same output.

  >The timelord algorithm is explained in [Section 3.13](/docs/03consensus/timelords "Section 3.13: Timelord Algorithm").

A timelord is required to connect to exactly one full node, typically on the same machine. This connection is verified with a certificate. This 1:1 architecture has a large security benefit: it keeps the timelord sandboxed in its own private network. That way, the full node protocol is the only protocol that requires total security. If more than one full node could connect to the same timelord, it would add a potential attack vector to the network.

Timelords do not directly earn rewards. Furthermore, only the fastest timelord on the network will broadcast proofs at any given time. Therefore, only one timelord is required to keep the network running, and most farmers will not feel compelled to run one. However, farmers with multi-PiB farms may want to run a timelord, both for redundancy and for protection against temporary local latency issues.

>NOTE: Chia network is currently [developing an ASIC timelord](https://www.businesswire.com/news/home/20211013005324/en/Chia-Partners-With-Supranational-to-Create-Industry-Leading-Proof-of-Space-Time-Security). This will add redundancy to the network, while reducing the possibility of an attacker creating their own timelord that is significantly faster than anyone else's.

If someone controls the fastest timelord in the world, it doesn't give them much of an advantage at winning rewards. However, they could potentially orphan or censor other farmers, depending on how much faster their timelord is.

Furthermore, an attacker with a significantly faster timelord than anyone else could potentially run a 51% attack against the network with less than 51% of the space. For security purposes, it is very important to maintain open designs of VDF hardware.

  >You can learn about potential attacks against Chia's network in [Section 3.14](/docs/03consensus/attacks_and_countermeasures "Section 3.14: Attacks and Countermeasures").

</details>

## 矿池

矿池允许农民通过基于空间部分的证明赚取收入来平滑他们的奖励，而不是赢得区块。

矿池需要使用便携式图块。这些地块与农民必须创建的图块 NFT 相关联。这个 NFT 位于 Chia 的区块链上，它允许用户在矿池之间切换。

矿池创建并花费 **coinbase 交易**，但在 Chia 的矿池协议中，他们实际上并不选择块的内容。这为农民提供了更多的权力，从而减少了集中式矿池的影响。

农民定期向矿池发送包含空间证明和签名的部分。矿池使用这些部分证明来确定农民投入了多少空间，这反过来又决定了矿池赢得区块时农民的奖励部分。

当作为矿池成员的农民赢得一个区块时，7/8 的奖励会进入矿池，然后分配给参与者。农民保留另外 1/8 的奖励。这是一个有意的设计决定。如果农民没有因创建区块而获得直接奖励，则竞争池的运营商可能有经济动机加入一个拥有大量图块的矿池（他们没有运行），而忽略了创建当他们找到一个有效的证明时，一个区块，从而破坏了竞争池。

>更多信息，请参阅我们的[矿池常见问题](https://github.com/Chia-Network/chia-blockchain/wiki/Pooling-FAQ "Chia Pooling FAQ")，以及本站的[池协议](/docs/11pooling/pooling) 页面。


<details>
<summary>原文参考</summary>

- ## Pools

Pools allow farmers to smooth out their rewards by earning based on proof of space partials, as opposed to winning blocks.

Pools require the use of portable plots. These plots are tied to a plot NFT that the farmer must create. This NFT sits on Chia's blockchain, and it allows users to switch between pools.

Pools create and spend **coinbase transactions**, but in Chia's pool protocol they do not actually choose the contents of blocks. This gives more power to farmers and thus decreases the influence of centralized pools.

Farmers periodically send partials, which contain a proof of space and a signature, to pools. The pools use these partial proofs to determine how much space the farmers have dedicated, which in turn determines the farmer's portion of the reward when the pool wins a block.

When a farmer who is a member of a pool wins a block, 7/8 of the reward goes to the pool, which is later distributed to the participants. The farmer keeps the other 1/8 of the reward. This was an intentional design decision. If a farmer didn't receive a direct reward for creating a block, the operator of a competing pool might have had a financial incentive to join a pool (that they didn't run) with a large number of plots, and neglect to create a block when they found a valid proof, thereby spoiling the competing pool.

  >For more info, see our [pooling FAQ](https://github.com/Chia-Network/chia-blockchain/wiki/Pooling-FAQ "Chia Pooling FAQ"), as well as this site's [Pool Protocol](/docs/11pooling/pooling) page.

</details>

## 钱包

钱包可以通过钱包协议与全节点通信。 这类似于比特币的 SPV 协议：它允许验证交易和区块权重，而没有全节点的带宽和 CPU 要求。

钱包节点类似于完整节点，因为它们是与网络中的其他对等点进行通信的服务器。 一个常见的用例是在本地运行钱包和全节点，其中钱包只连接到全节点。 钱包从节点下载 [权重证明](/docs/03consensus/light_clients)以快速验证哪个区块链最长。 然后他们要求全节点扫描区块链以获得他们想要的交易。 钱包还负责管理私钥，以及生成、存储和发送交易。 钱包公开了一个 RPC HTTPS websocket JSON API，用户界面可以使用它来执行命令。

<details>
<summary>原文参考</summary>

- ## Wallets

Wallets can communicate with full nodes through the wallet protocol. This is similar to Bitcoin's SPV protocol: it allows verification of transactions and block weight, without the bandwidth and CPU requirements of full nodes.

Wallet nodes are similar to full nodes, in that they are servers which communicate to other peers in the network. A common use case is to run a wallet locally along with a full node, where the wallet only connects to the full node. Wallets download [weight proofs](/docs/03consensus/light_clients) from nodes to quickly validate which blockchain is the longest. They then ask full nodes to scan the blockchain for their desired transactions. The wallet is also responsible for managing private keys, as well as generating, storing and sending transactions. The wallet exposes an RPC HTTPS websocket JSON API, which user interfaces can use to execute commands.

</details>
