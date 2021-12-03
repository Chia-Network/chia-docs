---
sidebar_position: 15
---

# 3.15 分析

> Analysis

## 安全

安全性类似于比特币等其他中本聪共识算法。没有保证的最终性，但交易的确认越多，它就越安全。在 <46%（* vdf 优势）共谋假设下，交易需要一定数量的确认才能让接收方假设它无法重组。由于农民理论上可以在同一高度签署多个区块，因此在 Chia 中应该使用比在比特币中更多的确认。然而，以每 10 分钟 32 个区块的速度，比特币中的 6 个确认相当于 Chia 中的 192 个，这足以被认为是安全的。只要这 192 个农民中的一个表现良好（不是双重签名），这笔交易就不会逆转。

值得注意的是，没有要求54%的诚实耕种空间，但54%的非勾结。通过偏离协议，寻求利润的农民获得的收益很少。

还有一个额外的假设，即至少一个快速时间领主必须连接到网络的非共谋部分，并且攻击者的时间领主并没有明显更快。

<details>
<summary>原文参考</summary>

- ## Safety

The safety is similar to other Nakamoto consensus algorithms like Bitcoin. There is no guaranteed finality, but the more confirmations a transaction has, the safer it is. A transaction needs a certain number of confirmations for a receiver to assume that it cannot be reorged, under the <46%(* vdf advantage) colluding assumption. Since farmers can theoretically sign multiple blocks at the same height, more confirmations should be used in Chia than in Bitcoin. However with a rate of 32 blocks per 10 min, 6 confirmations in Bitcoin is equivalent to 192 in Chia, which is more than enough to be considered safe. As long as one of those 192 farmers is well behaving (not double signing), that transaction will not be reversed.

It's worth noting that there is no requirement of 54% honest farming space, but 54% non colluding. Profit seeking farmers gain very little by deviating from the protocol.

There is the added assumption that at least one fast timelord must be connected to the non-colluding portion of the network, and that the attacker's timelord is not significantly faster.

</details>

## 活力

Chia 共识系统的活跃性是其最大的优势之一。与比特币一样，即使大部分空间脱机，Chia 系统仍在继续发展。与比特币不同的是，发生这种情况时系统不会显着减慢，因为并非所有块都是交易块。因此，如果许多参与者下线，交易吞吐量不会下降太多。即使只有 1 个农民在线，它也会继续，尽管会有很多空槽，因为只有低于子槽迭代阈值才能创建交易块。

当然，在长期网络分裂的情况下，结果是必须选择一条链，因此在这种情况下可能会出现大型重组。尽管如此，网络还是选择了更重的链，类似于 PoW。

<details>
<summary>原文参考</summary>

- ## Liveness

The liveness of the Chia consensus system is one of its greatest strengths. Like Bitcoin, the Chia system continues advancing even when a majority of the space goes offline. Unlike bitcoin though, the system does not slow down significantly when this happens, since not all blocks are transaction blocks. Therefore transactions throughput does not drop by too much if many participants go offline. It will continue even if only 1 farmer is online, although there will be many empty slots, since a transaction block can only be created if it’s below the sub-slot iterations threshold. 

Of course, in the event of a long term network split the effects are that one chain must be chosen, so there can be large reorgs in this case. Still, the network chooses the heavier chain, similar to PoW. 

</details>

## 与中本聪 PoW 的比较

- 不同的资源。PoSpace 具有 ASIC 抗性，因此任何人都可以参与农业。希望更加去中心化。
- 轻松合并农业。其他加密货币可以使用相同的格式，每个人都可以共享空间。可能顶部的将是唯一安全的，因为农民可以攻击较小的。
- 使用的能量最少，因为只有少数节点运行 VDF，而且这些节点没有并行化。开采的边际成本非常低。
- 更一致的交易块时间（每约 1 分钟一个）。
- 不太容易受到自私挖矿攻击
- 较小的孤儿率和分叉，因为块可以并行包含。
- 当空间减少时，仍然以相同的速度前进，因为只有 1/16 块包含交易。PoW 中本聪共识放缓。
- 更多潜在攻击者（大公司）的缺点。硬件是通用的，因此攻击者可以在耕种、攻击和用于数据存储之间切换。
- 加速 VDF 可以为攻击网络的人提供空间优势。
- 由于子时隙和 VDF 导致更复杂，可能更多的加密假设

<details>
<summary>原文参考</summary>

- ## Comparison to Nakamoto PoW

+ Different resources. PoSpace is ASIC resistant and therefore anyone can participate in farming. Hopefully more decentralized. 
+ Easy merge farming. Other cryptocurrencies can use the same format, and everyone can share the space. Probably the top one will be the only secure one, since the farmers can attack smaller ones. 
+ Minimum energy used, since only a few nodes run VDFs, and these are not parallelized. Very low marginal cost to mine. 
+ More consistent transaction block times (one per ~1 min).
+ Less susceptible to selfish mining attacks
+ Smaller orphan rates and forks, since blocks can be included in parallel.
+ Still advances at the same rate when space decreases, since only 1/16 blocks include transactions. PoW nakamoto consensus slows down. 
- Drawback of more potential attackers (large companies). Hardware is general purpose, and therefore attackers could switch between farming, attacking, and using for data storage.
- Speeding up VDF could give a space advantage for someone attacking the network.
- More complexity due to sub slots and VDFs, potentially more cryptographic assumptions

</details>

## 与权益证明的比较

这种共识算法也可用于权益证明，其中太空农民被在系统中拥有硬币的权益人所取代。好处是能够削减（删除人们的股份），农民将“参与其中”，但如果使用权益证明，则存在一些担忧。（+ 表示使用空间与权益的好处）。

- 攻击者可以将他们的股权转移给其他人，但在他们的股权转移之前分叉链。在这个替代链中，攻击者仍然拥有他们所有的股份，因此可以推进链。PoStake 中的“无利害关系”问题与 PoSpace 不同，因为创建 PoSpace 需要物理资源（硬盘空间），而创建 PoS 只需要密钥。
- 攻击者可以通过质押他们的奖励（富人变得更富有）来保证他们在整个馅饼中的份额，因为硬币的总数是有限的。
- 在某些情况下，攻击者可以尝试多种不同的方式来转移股权。也许这可以通过在权益变得活跃之前需要很长时间来缓解。
- 需要注册，在注册之前您不能参与权益证明。这会降低隐私和可扩展性（可以质押多少人）。
- 更高的进入门槛：保证金和砍价让小用户难以参与。削减对网络参与者来说可能是一个巨大的风险。集中的保管人导致参与者的分布较少。
- 在权益证明中执行轻客户端同步需要一些假设[11] 。
- 游戏中的皮肤：通过 PoStake，共识可以削减人们的股份，也需要对系统进行一些投资（暴露于价格）。In Proof of space 硬盘驱动器可用于其他目的，并且无法“削减”人们的硬件。

<details>
<summary>原文参考</summary>

- ## Comparison to Proof of Stake

This consensus algorithm can also be used for proof of stake, where the space farmers are replaced by stakers who own coins in the system. The benefit would be the ability to slash (delete people’s stake), and farmers would have “skin in the game”, but there are some concerns if proof of stake is used. (+ means benefit for using space vs stake).
+ An attacker can transfer their stake to someone else, but fork the chain right before their stake is transferred. In this alternate chain, the attacker still has all of their stake, and can therefore advance the chain. The "nothing at stake" issue is different in PoStake than in PoSpace since creating a PoSpace requires a physical resource (hard drive space), while creating a PoS only requires a key.
+ An attacker can guarantee their share of the whole pie, by staking their rewards (the rich get richer), since the total number of coins is limited. 
+ There might be situations where the attacker can grind on many different ways to transfer stake. Perhaps this can be mitigated by requiring a long period before stake becomes active.
+ Registration is required, you cannot participate in proof of stake until you sign up. This reduces privacy and scalability (how many people can stake).
+ Higher barrier to entry: security deposits and slashing make it difficult for small users to participate. Slashing can be a huge risk for participants in the network. Centralized custodians lead to a less distributed set of participants. 
+ Some assumptions [11] are required to perform light client syncs in proof of stake.
- Skin in the game: with PoStake, the consensus can slash people’s stake, and also requires some investment into the system (exposure to price). In Proof of space hard drives can be used for other purposes and there is no ability to “slash” peoples hardware. 

</details>

## 与 BFT 共识算法的比较

空间证明也可以用作抵抗女巫的机制，以引导拜占庭共识（k 协议）系统。Filecoin 和许多权益证明系统使用拜占庭共识的各个方面。使用 Chia Nakamoto Consensus vs Byzantine Consensus 的优缺点，因算法而异：

- 简单得多
- 无注册要求
- 无可扩展性要求（可扩展到数百万农民）
- 更抗审查。只要一小部分耕地空间不被审查，最终你就可以进入区块链。
- 无活性要求，可能较少的网络假设
- 完全客观（一个节点可以比较链 1 和链 2，立即知道哪个更重）。不需要 ⅔ 共识的检查点。
- 更好的轻客户端支持[11]
- 没有确定性，只有概率。
- 需要等待更长时间的交易确认（与无最终性有关）。
- 出块时间和交易吞吐量不一致

<details>
<summary>原文参考</summary>

- ## Comparison to BFT consensus algorithms

Proof of space could also be used as a Sybil-resistant mechanism in order to bootstrap a Byzantine consensus (k-agreement) system. Filecoin, and many proof of stake systems use aspects of byzantine consensus.
The pros and cons of using Chia Nakamoto Consensus vs Byzantine consensus, which vary from algorithm to algorithm:
+ Much simpler
+ No registration requirement
+ No scalability requirement (scales to millions of farmers)
+ More censorship resistant. As long as a small portion of the farming space does not censor, eventually you can get into the blockchain. 
+ No liveness requirements, potentially less network assumptions
+ Fully objective (A node can compare chain 1 and chain 2, and immediately know which one is heavier). No need for checkpoints with ⅔ consensus.
+ Better light client support [11]
- No finality, only probabilistic. 
- Need to wait longer for transaction confirmations (related to no finality).
- Less consistent block times and transaction throughput

</details>
