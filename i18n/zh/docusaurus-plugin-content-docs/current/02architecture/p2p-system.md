---
sidebar_position: 1
---

# 2.1 点对点系统

![chia-architecture](/img/chia-network-architecture.png)

上图展示了奇亚的网络架构。 一台机器可以运行多个这些进程。 实际上，默认配置是同时运行四个进程：Farmer、Full Node、Harvester 和 Wallet。 许多农民也会选择运行 Electron GUI 和 Pool 进程。 此外，一些农民，尤其是那些拥有多 PiB 农场的农民，会选择经营时间领主。

Let's discuss each of these processes, and the protocols that connect them, separately.

## 全节点

奇亚点对点系统的核心是由全节点组成。 全节点有几个职责：

1. Maintain a copy of the blockchain.
2. Validate the blockchain.
3. Propagate new blocks, transactions, and proofs through the network, using the peer protocol.
4. (Optional) Serve light clients (wallets) through the wallet protocol.
5. (Optional) Communicate with farmers.
6. (Optional) Communicate with timelords.

通常，农民在他们的农民进程旁边运行一个全节点进程。 全节点不赚取任何奖励或费用，但它们对于维护共识规则和系统安全很重要。 运行全节点可以让用户对区块链的完整状态充满信心，并避免信任他人。

全节点始终连接到网络中随机的一组全节点。 全节点会定期向对等节点广播自己的信息（IP 地址和端口），以便整个网络都知道它们仍在运行。 全节点还向其对等节点广播所有新区块和交易，从而允许网络中的所有节点保留区块链的完整副本。

## 农民

奇亚的农民类似于比特币的矿工。 他们通过在存储的图块内找到有效的空间证明来赚取区块奖励和费用。 农民进程不维护区块链的副本，但他们信任一个完整的节点来提供更新。 全节点和农民进程使用农民协议相互通信。

Farmers communicate with harvesters (individual machines, including the farmer machine, that actually store the plots) through the harvester protocol.

农民通过等待来自完整节点的更新进行操作，大约每 9 秒就会为他们提供新的标牌点（相当于彩票的中奖号码）。 农民然后将标牌点发送到每个收割机，以检查是否存在任何获胜的空间证明。 如果收割机找到任何有效的证明，它会将它们发送给农民，农民将它们分为两类：

- 完整的证明必须达到或超过网络难度级别要求的质量。 这些证明被发送到全节点，然后创建一个新块。
- Partial proofs are used by pools to approximate a node's total storage.

Farmers also have a private key, which is used for both signing blocks when a winning proof is found, as well as for signing partial proofs, which are then sent to pools.

## 收割机

收割机是由农民控制的独立机器。 在大型农场作业中，一个农民可能连接到许多收割机。

收割机通过从磁盘检索质量或证明来控制实际的绘图文件。 最小图块大小（也是迄今为止最常见的）是 k32，相当于大约 100 GiB。 随着 k 值的每次增加，图块大小大约增加一倍，因此 k33 绘图大约为 200 GiB，k34 大约为 400 GiB，等等。

难度级别每 4608 个块自动调整，以针对每两个标牌点的一个空间证明——跨越整个网络。 这是目标平均值——每个标牌点也可以有零个或多个证明。 这导致大约每 24 小时调整一次难度。

Given a plot, the harvester must perform two tasks to find a valid proof:

1. Fetch the initial quality -- this requires around seven random disk seeks, or 70 milliseconds on a slow HDD.
2. (Only performed if the initial quality is sufficiently high) Fetch the full proof -- this requires around 64 disk seeks, or 640 milliseconds on a slow HDD.

对于大多数挑战，质量（第 1 步）将非常低，因此不需要获取整个证明（第 2 步）。 节点有 28 秒的时间返回证明，因此磁盘 I/O 不会成为限制因素，即使证明存储在慢速 HDD 上也是如此。

> 注意：磁带驱动器对于耕作来说太慢了。 该协议旨在支持硬盘，但速度并不慢。 可以使用磁带进行长期的地块存储，仅将地块转移到磁盘以用于偶尔的耕作，但这可能是一个非常罕见的用例。

最后，收割机还为每个地块维护一个私钥。 块用这些密钥签名，这是奇亚的一个重要概念。 这意味着即使农民是矿池的成员，农民仍然控制块的内容。 这与其他区块链的池协议大不相同，池操作员是签署块的人。

> The harvester algorithm is discussed in greater detail in [Section 3.6](/docs/03consensus/harvester_algorith 'Section 3.6: Harvester Algorithm').

## 时间领主

时间领主通过创建连续的时间证明（使用[可验证延迟函数](/docs/03consensus/vdfs 'Section 3.3: VDFs')）并大约每 9 秒广播一次来支持网络。 这提供了“确定性随机性”，用于决定空间的获胜证明。

由于这种计算是顺序的，因此消耗的能量非常少，与工作量证明系统相反，其中计算是可并行的。 例如，如果 100 个时间领主在时间证明上进行相同的计算，他们都会创建完全相同的输出。

> The timelord algorithm is explained in [Section 3.13](/docs/03consensus/timelords 'Section 3.13: Timelord Algorithm').

时间领主需要连接到一个完整的节点，通常在同一台机器上。 此连接使用证书进行验证。 这种 1:1 架构具有很大的安全优势：它将时间领主保持在自己的专用网络中的沙箱中。 这样，全节点协议是唯一需要完全安全的协议。 如果多个完整节点可以连接到同一个时间领主，就会给网络增加一个潜在的攻击向量。

时间领主不直接获得奖励。 此外，只有网络上最快的时间领主才会在任何给定时间广播证明。 因此，只需要一个时间领主来保持网络运行，大多数农民不会觉得有必要运行一个。 然而，拥有多 PiB 农场的农民可能想要运行一个时间领主，以实现冗余和防止临时本地延迟问题。

> 注意：奇亚网络目前正在[开发 ASIC 时间领主](https://www.businesswire.com/news/home/20211013005324/en/Chia-Partners-With-Supranational-to-Create-Industry-Leading-Proof-of-Space-Time-Security)。 这将为网络增加冗余，同时降低攻击者创建自己的时间领主的可能性，该时间领主比其他任何人都快得多。

如果有人控制了世界上最快的时间领主，那么他们在赢得奖励方面并没有太大优势。 然而，他们可能会成为孤儿或审查其他农民，这取决于他们的时间领主有多快。

此外，时间领主比其他任何人都快得多的攻击者可能会在不到 51% 的空间内对网络进行 51% 的攻击。 出于安全目的，保持 VDF 硬件的开放设计非常重要。

> You can learn about potential attacks against Chia's network in [Section 3.14](/docs/03consensus/attacks_and_countermeasures 'Section 3.14: Attacks and Countermeasures').

## 矿池

Pools allow farmers to smooth out their rewards by earning based on proof of space partials, as opposed to winning blocks.

矿池需要使用便携式图块。 这些地块与农民必须创建的图块 NFT 相关联。 这个 NFT 位于 Chia 的区块链上，它允许用户在矿池之间切换。

矿池创建并花费 **coinbase 交易**，但在奇亚的矿池协议中，他们实际上并不选择块的内容。 这为农民提供了更多的权力，从而减少了集中式矿池的影响。

农民定期向矿池发送包含空间证明和签名的部分。 矿池使用这些部分证明来确定农民投入了多少空间，这反过来又决定了矿池赢得区块时农民的奖励部分。

当作为矿池成员的农民赢得一个区块时，7/8 的奖励会进入矿池，然后分配给参与者。 农民保留另外 1/8 的奖励。 这是一个有意的设计决定。 如果农民没有因创建区块而获得直接奖励，则竞争池的运营商可能有经济动机加入一个拥有大量图块的矿池（他们没有运行），而忽略了创建当他们找到一个有效的证明时，一个区块，从而破坏了竞争池。

> For more info, see our [pooling FAQ](https://github.com/Chia-Network/chia-blockchain/wiki/Pooling-FAQ 'Chia Pooling FAQ'), as well as this site's [Pool Protocol](/docs/11pooling/pooling) page.

## 钱包

钱包可以通过钱包协议与全节点通信。 这类似于比特币的 SPV 协议：它允许验证交易和区块权重，而没有全节点的带宽和 CPU 要求。

钱包节点类似于完整节点，因为它们是与网络中的其他对等点进行通信的服务器。 一个常见的用例是在本地运行钱包和全节点，其中钱包只连接到全节点。 钱包从节点下载 [权重证明](/docs/03consensus/light_clients)以快速验证哪个区块链最长。 然后他们要求全节点扫描区块链以获得他们想要的交易。 钱包还负责管理私钥，以及生成、存储和发送交易。 钱包公开了一个 RPC HTTPS websocket JSON API，用户界面可以使用它来执行命令。
