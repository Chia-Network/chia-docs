---
sidebar_position: 1
---

# 2.2 点对点系统

> Peer to Peer system


![chia-architecture](/img/chia-network-architecture.png)

## 完整节点

系统的核心由全节点组成。全节点有几个职责：
1. 维护区块链副本
2. 验证区块链
3. 通过网络，通过对等协议传播新的区块、交易和证明
4. （可选）通过钱包协议服务轻客户端（钱包）
5. （可选）与农民和时间领主沟通

通常农民在他们的农民进程旁边运行一个完整的节点进程。
全节点不赚取任何奖励或费用，但它们对于维护共识规则很重要
以及系统的安全性。运行一个完整的节点可以让用户对
区块链的完整状态，避免信任他人。

全节点总是连接到网络中另一组随机的全节点。全节点广播自己的
定期向对等方发送信息（ip 和端口），以便整个网络都知道它们仍在运行。

<details>
<summary>原文参考</summary>

- ## Full Nodes

The core of the system is composed of full nodes. Full nodes have several responsibilities:
1. Maintain a copy of the blockchain
2. Validate the blockchain
3. Propagate new blocks, transactions, and proofs through the network, through the peer protocol
4. (Optional) Serve light clients (wallets) through the wallet protocol
5. (Optional) Communicate with farmers and timelords

Usually farmers run a full node process alongside their farmer process.
Full nodes earn no rewards or fees, but they are important to maintain the consensus rules
and the security of the system. Running a full node allows a user to be confident about the
full state of the blockchain, and avoid trusting others.

Full nodes are always connected to another random set of full nodes in the network. Full nodes broadcast their own
information (ip and port) to their peers periodically, so that the entire network is aware that they are still running.


</details>

## 农民
Chia 的农民类似于比特币的矿工。他们通过使用他们存储的地块来赚取块奖励和费用。
农民进程不维护区块链的副本，但他们信任一个完整的节点来提供更新。
全节点和农夫进程通过农夫协议进行通信，通常农夫都运行在
同一台机器。

农民通过收割机协议与收割机（实际存储地块的单个机器）进行通信。

想要单独农场的用户可以在同一台机器上运行农场主、收割机和全节点。

农民通过等待来自完整节点的更新进行操作，这大约每 9 秒为他们提供新的标牌点。
农民然后将标牌点发送到每个收割机，以检查是否存在任何获胜的空间证明。
农民可以选择从收获中获取空间的完整证明，对于那些获胜的证明，或者好的证明
足够的游泳池。然后可以将完整证明传播到完整节点，或作为部分证明发送到池中。

农民还有一个私钥，用于在找到获胜证明时对区块进行签名，并且也被使用
签署部分发送到池。

<details>
<summary>原文参考</summary>

- ## Farmers
Chia's farmers are analogous to Bitcoin's miners. They earn block rewards and fees by using their stored plots.
The farmer processes don't maintain a copy of the blockchain, but they trust a full node to provide updates.
The full node and the farmer process communicate through the farmer protocol, and usually farmers run both on the
same machine.


Farmers communicate with harvesters (individual machines that actually store the plots) through the harvester protocol.

Users who want to solo farm can run the farmer, harvester and full node on the same machine.


Farmers operate by waiting for updates from a full node, which gives them new signage points approximately every 9 seconds.
Farmers then send the signage point to each harvester, to check whether any winning proofs of space exist.
The farmer can choose to fetch the full proofs of space from the harvest, for those proofs which are winners, or good 
enough for pools. The full proofs can then be propagated to the full nodes, or sent to a pool as partials.

Farmers also have a private key which is used to sign the block when a winning proof is found, and is also used
to sign partials sent to pools.

</details>


## 收割机
收割机是由农民控制的独立机器。
在大型农场作业中，一个农民可能连接到许多收割机。


收割机通过从磁盘检索质量或证明来控制实际的绘图文件。
最小和最常见的绘图大小是 k32，相当于大约 100GiB。
每个绘图文件对应一个绘图，对于每个随机的 32 字节标牌点，有一个预期的
一个空间证明的值（尽管有时有零个或多个）。
在标准 HDD 驱动器上，获取质量将需要大约 8 次随机磁盘寻道，或最多 50 毫秒，而获取证明将需要大约 64 次磁盘寻道，或最多 500 毫秒。
对于大多数挑战，质量将非常低，因此没有必要获取整个证明。
但是，由于迭代公式中有一个常数因子（每个块必须有至少 30 秒左右的时间证明），因此磁盘 IO 时间对大多数农民来说应该不是问题。


最后，收割机还为每个地块维护一个私钥。
这个私钥实际上是区块的签名，允许农民/收割者（与矿池相反）实际控制区块的内容。

<details>
<summary>原文参考</summary>



- ## Harvesters
Harvesters are individual machines controlled by a farmer.
In a large farming operation, a farmer may be connected to many harvesters.


Harvesters control the actual plot files by retrieving qualities or proofs from disk.
The minimum and most common plot size is k32, which corresponds to around 100GiB.
Each plot file corresponds to one plot, and for each random 32 byte signage point, there is an expected
value of one proof of space (although sometimes there are zero or more than one).
On standard HDD drives, fetching a quality will take around 8 random disk seeks, or up to 50ms, whereas fetching a proof will take around 64 disk seeks, or up to 500ms.
For most challenges, qualities will be very low, so fetching the entire proof is not necessary.
However, since there is a constant factor in the iterations formula (each block must have a proof of time of at least around 30 seconds), disk IO times should not be a problem for most farmers.


Finally, harvesters also maintain a private key for each plot.
This private key is what actually signs the block, allowing farmers/harvesters (as opposed to pools) to actually control the contents of a block.

</details>


## 时间领主

时间领主通过创建时间的顺序证明（使用可验证延迟函数）来支持网络。这提供了
确定性的“随机性”，用于决定空间的获胜证明。
由于这种计算是顺序的，因此消耗的能量非常少，这与计算可并行化的工作量证明系统相反。
 如果 100 个时间领主在时间证明上进行相同的计算，
它们都将创建完全相同的输出。 Timelords 也连接到完整节点。
时间领主虽然没有奖励，但只要有一个诚实的时间领主在线，区块链就可以向前发展。

拥有更快时间领主的人无法轻易获得更多奖励，但他们可能会成为孤儿/审查其他人
农民，这取决于时间领主的速度有多快。

此外，拥有更快时间领主的攻击者可能会在不到 51% 的空间内对网络进行 51% 的攻击，这就是为什么 VDF 硬件的开放式设计对于区块链的安全性非常重要。

<details>
<summary>原文参考</summary>

- ## Timelords

Timelords support the network by creating sequential proofs of time (using Verifiable Delay Functions). This provides
deterministic "randomness", which is used to decide the winning proofs of space.
Since this computation is sequential, very little energy is consumed, as opposed to proof of work systems where computation is parallelizable.
 If 100 timelords are doing the same computation on a proof of time,
they will all create the exact same output. Timelords are also connected to full nodes.
Although timelords earn no rewards, there only needs to be one honest timelord online for the blockchain to move forward.

Someone who has a faster timelord cannot easily earn more rewards, but they can potentially orphan / censor other
farmers, depending on how much faster the timelord is.

Furthermore, an attacker with a much faster timelord can potentially 51% attack the network with less than 51% of the space, which is why open designs of VDF hardware are very important for the security of the blockchain.

</details>

## 池

池允许农民通过基于空间部分的证明赚取收入来平滑他们的奖励，而不是赢得块。
池公钥必须嵌入到图本身中，因此除非重新创建整个图，否则无法更改池。

矿池创建并花费 **coinbase 交易**，但在 Chia 的矿池协议中，他们实际上并不选择块的内容。
这为农民提供了更多的权力，从而减少了集中式水池的影响。

农民定期向矿池发送包含空间证明和签名的部分。
在[池协议](/docs/pooling/pooling) 页面中查看更多信息。


<details>
<summary>原文参考</summary>


- ## Pools

Pools allow farmers to smooth out their rewards by earning based on proof of space partials, as opposed to winning blocks.
Pool public keys must be embedded into the plots themselves, so a pool cannot be changed unless the entire plot is recreated.

Pools create and spend **coinbase transactions**, but in Chia's pool protocol they do not actually choose the contents of blocks.
This gives more power to farmers and thus decreases the influence of centralized pools.

Farmers periodically send partials, which contain a proof of space and a signature, to pools.
See more in the [Pool Protocol](/docs/pooling/pooling) page.

</details>


## 钱包

钱包可以通过钱包协议与全节点通信。
这类似于比特币的 SPV 协议，允许验证交易和块权重，没有全节点的带宽和 CPU 要求。
钱包节点类似于完整节点，因为它们是与网络中的其他对等点进行通信的服务器。 一个常见的用例是在本地运行钱包和全节点，其中钱包只连接到全节点。
钱包从节点下载[重量证明](/docs/03consensus/weight-proofs)以快速验证哪个区块链
最长的。 然后他们要求全节点扫描区块链以获得他们想要的交易。
钱包还负责管理私钥，生成、存储和发送交易。 钱包公开了一个 RPC HTTP websocket JSON API，用户界面可以使用它来执行命令。 

<details>
<summary>原文参考</summary>



- ## Wallets

Wallets can communicate with full nodes through the wallet protocol.
This is similar to Bitcoin's SPV protocol, and allows verification of transactions and block weight, without the bandwidth and CPU requirements of full nodes.
Wallet nodes are similar to full nodes, in that they are servers which communicate to other peers in the network. A common use case is to run a wallet locally along with a full node, where the wallet only connects to the full node.
Wallets download [weight proofs](/docs/03consensus/weight-proofs) from nodes to quickly validate which blockchain is 
the longest. They then ask full nodes to scan the blockchain for their desired transactions.
The wallet is also responsible for managing private keys, generating, storing and sending transactions. The wallet exposes an RPC HTTP websocket JSON API, which user interfaces can use to execute commands.

</details>
