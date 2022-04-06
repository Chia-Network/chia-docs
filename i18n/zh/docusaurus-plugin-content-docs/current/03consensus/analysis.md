---
sidebar_position: 15
---

# 3.15 分析

> Analysis

## 安全

奇亚共识的安全性类似于比特币等其他中本聪共识算法。没有保证的最终性，但交易的确认越多，它就越安全。

在 <46％（vdf优势）共谋假设下，交易需要一定数量的确认才能让接收方假设它无法重组。由于农民理论上可以在同一高度签署多个区块，因此在奇亚中应该使用比在比特币中更多的*确认*。但是，奇亚不需要像比特币一样多的时钟时间才能将交易视为安全。

在奇亚中，等待一定数量的确认有两个主要原因：
1. 确信不会发生连锁重组。如[第 3.10 节](/docs/03consensus/foliage "Section 3.10: Foliage") 中所述，小型重组在区块链中是自然发生的，尽管在奇亚中很少见。

  为了确信不会发生链重组，您应该等待六个区块被创建（第一次确认后大约两分钟）。

2. 以防万一发生植物重组攻击，如[第 3.14 节](/docs/03consensus/attacks_and_countermeasures#farmer-bribe-foliage-re-org-attack "Section 3.14: Relevant Attacks and Countermeasures")中所述，这种类型的攻击需要攻击者发现——并成功贿赂——大量连续的匿名区块获胜者的身份。这种攻击很难实施，因此即使有人尝试过，预计也极为罕见。

如果您想几乎确定即使是成功的 foliage re-org 攻击也不会逆转您的交易，您应该等待 32 个区块被创建（第一次确认后大约 10 分钟）。

值得注意的是，54% 的要求仅适用于*非共谋*空间，而不是*诚实*耕作空间。通过偏离协议，寻求利润的农民获得的收益很少。

还有一个额外的假设，即至少一个快速时间领主必须连接到网络的非共谋部分，并且攻击者的时间领主并没有明显更快。奇亚计划发布和开源一个 ASIC 时间领主，这应该确保获得一个明显更快的时间领主是极其困难的。

<details>
<summary>原文参考</summary>

- ## Safety

The safety of Chia's consensus is similar to that of other Nakamoto consensus algorithms like Bitcoin. There is no guaranteed finality, but the more confirmations a transaction has, the safer it is.

A transaction needs a certain number of confirmations for a receiver to assume that it cannot be re-orged, under the < 46% (* vdf advantage) colluding assumption. Since farmers can theoretically sign multiple blocks at the same height, more _confirmations_ should be used in Chia than in Bitcoin. However, Chia doesn't require anywhere near as much _clock time_ as Bitcoin for a transaction to be considered safe.

In Chia, there are two main reasons to wait for a certain number of confirmations:
1. To be confident there won't be a chain re-org. As discussed in [Section 3.10](/docs/03consensus/foliage "Section 3.10: Foliage"), a small re-org is a natural occurrence in blockchains, though rare in Chia.

  To be confident that there won't be a chain re-org, you should wait for six blocks to be created (around two minutes after the first confirmation).

2. Just in case there is a foliage re-org attack, as described in [Section 3.14](/docs/03consensus/attacks_and_countermeasures#farmer-bribe-foliage-re-org-attack "Section 3.14: Relevant Attacks and Countermeasures"). This type of attack would require an attacker to discover the identity of -- and successfully bribe -- a large and consecutive number of anonymous block winners. This attack would be difficult to pull off, so it is expected to be extremely rare, if it is ever even attempted.

  If you want to be nearly certain that even a successful foliage re-org attack won't reverse your transaction, you should wait for 32 blocks to be created (around ten minutes after the first confirmation).


It's worth noting that the 54% requirement only pertains to _non-colluding_ space, rather than _honest_ farming space. Profit-seeking farmers gain very little by deviating from the protocol.

There is the added assumption that at least one fast timelord must be connected to the non-colluding portion of the network, and that the attacker's timelord is not significantly faster. Chia plans to release and open source an ASIC timelord, which should ensure that it is extremely difficult to obtain a significantly faster timelord.

</details>

## 活跃性

奇亚共识系统的活跃性是其最大的优势之一。与比特币一样，即使大部分空间脱机，Chia 系统仍在继续发展。然而，与比特币不同的是，发生这种情况时系统不会显着减慢，因为并非所有块都是交易块。因此，如果许多参与者下线，交易吞吐量不会显着下降。

即使只有一个农民在线，网络也会继续前进，尽管会有很多空时隙，因为只有低于子时隙迭代阈值才能创建交易块。

当然，如果发生长期的网络分裂，结果是必须选择一条链，因此在这种情况下可能会出现大规模的重组。网络会自动选择较重的链，类似于工作量证明。

<details>
<summary>原文参考</summary>

- ## Liveness

The liveness of the Chia consensus system is one of its greatest strengths. Like Bitcoin, the Chia system continues advancing even when a majority of the space goes offline. Unlike bitcoin, though, the system does not slow down significantly when this happens, since not all blocks are transaction blocks. Therefore transaction throughput does not drop significantly if many participants go offline.

The network will continue to advance even if only one farmer is online, although there will be many empty slots, since a transaction block can only be created if it’s below the sub-slot iterations threshold.

Of course, in the event of a long-term network split, the effects are that one chain must be chosen, so there can be large re-orgs in this case. The network will automatically choose the heavier chain, similar to PoW.

</details>

## 与中本聪工作量的比较

（“+”表示奇亚的优势）

+ (+) 不同的资源。 空间证明是抗 ASIC 的，因此任何人都可以参与农业。
+ (+) 希望更加去中心化。（主网第一年的分析表明情况确实如此。）
+ (+) 轻松合并农业。其他加密货币可以使用相同的格式，每个人都可以共享空间（假设他们的农场电脑有足够的磁盘空间和内存）。（请注意，具有最大网络空间的区块链可能是唯一安全的，因为农民可以攻击较小的区块链。对于顶级链的网络空间不到 50% 的区块链尤其如此——剩余的农民还没有加入较小的链可以串通加入并攻击该链。）
+ (+) 使用的能量最少，因为只有少数节点运行 VDF，而且这些节点没有并行化。农场的边际成本非常低。
+ (+) 更一致的交易块时间（目标平均值为每 46.875 秒一个，如 [第 3.10 节](/docs/03consensus/foliage "Section 3.10: Foliage")中所述）。
+ (+) 不太容易受到自私的挖矿攻击。
+ (+) 较小的孤块率和分叉，因为块可以并行包含。
+ (+) 当空间减少时继续以几乎相同的速度前进，因为只有大约 1/3 的区块包含交易。当算力下降时，中本聪工作量证明共识会线性放缓。
- (-) 更多潜在攻击者（大公司）的缺点。硬件是通用的，因此攻击者可以在耕种、攻击和用于数据存储之间切换。
- (-) 如果攻击者获得明显更快的 VDF，他们可以获得空间优势。
- (-) 由于子时隙和 VDF 的复杂性更高，可能需要更多的加密假设。

<details>
<summary>原文参考</summary>

- ## Comparison to Nakamoto PoW

("+" means a pro for Chia)

+ (+) Different resources. PoSpace is ASIC-resistant and therefore anyone can participate in farming.
+ (+) Hopefully more decentralized. (Analysis in mainnet's first year shows this to be the case.)
+ (+) Easy merge farming. Other cryptocurrencies can use the same format, and everyone can share the space (assuming their farming computers have sufficient disk space and memory). (Note that the blockchain with the largest netspace will probably be the only secure one, since the farmers can attack smaller ones. This is especially true of blockchains with less than 50% of the top chain's netspace -- the remaining farmers who have not joined the smaller chain could collude to join, and attack, that chain.)
+ (+) Minimum energy used, since only a few nodes run VDFs, and these are not parallelized. Very low marginal cost to farm.
+ (+) More consistent transaction block times (targeted average is one per 46.875 seconds, as discussed in [Section 3.10](/docs/03consensus/foliage "Section 3.10: Foliage")).
+ (+) Less susceptible to selfish mining attacks.
+ (+) Smaller orphan rates and forks, since blocks can be included in parallel.
+ (+) Continues to advance at nearly the same rate when space decreases, since only around 1/3 of blocks include transactions. PoW Nakamoto Consensus slows down linearly when hashrate drops.
- (-) Drawback of more potential attackers (large companies). Hardware is general purpose, and therefore attackers could switch between farming, attacking, and using for data storage.
- (-) If an attacker acquires a significantly faster VDF, they could gain a space advantage.
- (-) More complexity due to sub slots and VDFs, potentially more cryptographic assumptions.

</details>

## 与权益证明的比较

奇亚共识算法也可用于权益证明，在这种情况下，太空农民被在系统中拥有硬币的权益人所取代。好处是能够削减（删除人们的股份），农民将拥有“游戏中的皮肤”，但如果使用权益证明，则存在一些担忧。（“+”表示使用空间与权益的好处）。

+ (+) 攻击者可以将他们的股权转移给其他人，但在他们的股权转移之前分叉链。在这个替代链中，攻击者仍然拥有他们所有的股份，因此可以推进链。权益证明中的“无利害关系”问题与空间证明不同，因为创建空间证明需要物理资源（硬盘空间），而创建权益证明只需要一个密钥。
+ (+) 攻击者可以通过质押他们的奖励（富人越富）来保证他们在整个货币供应中的份额，因为硬币的总数是有限的。
+ (+) 在某些情况下，攻击者可能会尝试多种不同的方式来转移股权。也许这可以通过在权益变得活跃之前需要很长时间来缓解。
+ (+) 需要注册，在注册之前您不能参与权益证明。这会降低隐私和可扩展性（可以质押多少人）。
+ (+) 更高的进入门槛：保证金和砍价让小用户难以参与。削减对网络参与者来说可能是一个巨大的风险。集中的保管人导致参与者的分布较少。
+ (+) 在权益证明中执行轻客户端同步需要一些假设。来源：[飞客白皮书](https://eprint.iacr.org/2019/226.pdf)。
- (-) 游戏中的皮肤：通过权益证明，共识可以削减人们的股份，也需要对系统进行一些投资（暴露于价格）。在空间证明中，硬盘可以用于其他目的，并且没有能力“削减”人们的硬件。

<details>
<summary>原文参考</summary>

- ## Comparison to Proof of Stake

Chia's consensus algorithm could also be used for Proof of Stake, where the space farmers are replaced by stakers who own coins in the system. The benefit would be the ability to slash (delete people’s stake), and farmers would have “skin in the game”, but there are some concerns if Proof of Stake is used. ("+" means benefit for using space vs stake).

+ (+) An attacker can transfer their stake to someone else, but fork the chain right before their stake is transferred. In this alternate chain, the attacker still has all of their stake, and can therefore advance the chain. The "nothing at stake" issue is different in PoS than in PoSpace since creating a PoSpace requires a physical resource (hard drive space), while creating a PoS only requires a key.
+ (+) An attacker can guarantee their share of the whole monetary supply, by staking their rewards (the rich get richer), since the total number of coins is limited.
+ (+) There might be situations where the attacker can grind on many different ways to transfer stake. Perhaps this can be mitigated by requiring a long period before stake becomes active.
+ (+) Registration is required, you cannot participate in proof of stake until you sign up. This reduces privacy and scalability (how many people can stake).
+ (+) Higher barrier to entry: security deposits and slashing make it difficult for small users to participate. Slashing can be a huge risk for participants in the network. Centralized custodians lead to a less distributed set of participants.
+ (+) Some assumptions are required to perform light client syncs in Proof of Stake. Source: [Flyclient white paper](https://eprint.iacr.org/2019/226.pdf).
- (-) Skin in the game: with PoS, the consensus can slash people’s stake, and also requires some investment into the system (exposure to price). In Proof of Space, hard drives can be used for other purposes and there is no ability to “slash” people's hardware.

</details>

## 与 BFT 共识算法的比较

空间证明也可以用作抗女巫的机制，以引导拜占庭共识（k 协议）系统。 Filecoin 和许多权益证明系统使用拜占庭共识的各个方面。

使用奇亚中本聪共识与拜占庭共识的优缺点，因算法而异（“+”表示奇亚的优势）：

+ (+) 简单得多。
+ (+) 无注册要求。
+ (+) 无可扩展性要求（可扩展到数百万农民）。
+ (+) 更抗审查。只要一小部分耕地空间不被审查，最终你就可以进入区块链。
+ (+) 无活性要求，可能更少的网络假设。
+ (+) 完全客观（一个节点可以比较链 1 和链 2，立即知道哪个更重）。不需要 ⅔ 共识的检查点。
+ (+) 更好的轻客户端支持。有关详细信息，请参阅 [飞客白皮书](https://eprint.iacr.org/2019/226.pdf)。
- (-) 没有最终性，只有概率。
- (-) 交易确认需要等待更长的时间（与无最终性有关）。
- (-) 区块时间和交易吞吐量不一致。

<details>
<summary>原文参考</summary>

- ## Comparison to BFT consensus algorithms

Proof of Space could also be used as a Sybil-resistant mechanism in order to bootstrap a Byzantine consensus (k-agreement) system. Filecoin, and many Proof of Stake systems use aspects of Byzantine consensus.

The pros and cons of using Chia Nakamoto Consensus vs Byzantine consensus, which vary from algorithm to algorithm ("+" means a pro for Chia):

+ (+) Much simpler.
+ (+) No registration requirement.
+ (+) No scalability requirement (scales to millions of farmers).
+ (+) More censorship resistant. As long as a small portion of the farming space does not censor, eventually you can get into the blockchain.
+ (+) No liveness requirements, potentially fewer network assumptions.
+ (+) Fully objective (A node can compare chain 1 and chain 2, and immediately know which one is heavier). No need for checkpoints with ⅔ consensus.
+ (+) Better light client support. See the [Flyclient white paper](https://eprint.iacr.org/2019/226.pdf) for more info.
- (-) No finality, only probabilistic.
- (-) Need to wait longer for transaction confirmations (related to no finality).
- (-) Less consistent block times and transaction throughput.

</details>
