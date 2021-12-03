---
sidebar_position: 14
---

# 3.14 相关攻击及对策

> Relevant Attacks and Countermeasures


## 51% (46%) 攻击：

51% 攻击涉及创建一个替代链，该链最终达到比诚实链更高的权重，并迫使用户重组。工作量证明系统中也存在的经典远程攻击是 51% 攻击。在 51% 攻击中，拥有 51% 网络空间的攻击者创建了一个备用链并最终赶上了。Chia 共识和工作量证明之间有两个主要区别：第一个是攻击者可以同时在多条链上扩展和耕种。第二，如果攻击者拥有最快的 VDF，他们可以获得额外的空间优势/提升。

<details>
<summary>原文参考</summary>

- ## 51% (46%) attack:

A 51% attack involves creating an alternate chain which eventually reaches a higher weight than the honest chain, and forces users to reorg.
The classic long range attack which is also present in proof of work systems is the 51% attack.
In the 51% attack, the attacker with 51% of the network space creates an alternate chain and eventually catches up.
There are two main differences between Chia consensus and Proof of work: the first is that the attacker can extend and farm on many chains simultaneously.
The second is that if the attacker has the fastest VDF, they can get an additional space advantage/boost.

</details>

## 扩展多个链

如果攻击者正在制作他们自己的私有链，他们可以选择将哪个区块注入挑战链，因此可以尝试许多不同的注入，以获得最好的链。由于平均 32 个块具有相同的挑战，攻击者只能尝试大约 32 种不同的组合（哪些块包含在挑战链中），并且尝试每个组合的指数分支将为攻击者提供小幅提升空间（有 5 PiB，他们可以假装有 6 或 7 等）。这是因为正在尝试的替代链较差并且不太可能超过最长的链。这已在[1] 中进行了分析。

由于攻击者能够“尝试”不同的块组合，例如省略或者不省略第一个块。如果每个区块都有新的空间挑战证明，攻击者可以将他们的空间乘以 e=2.718 的系数，其中只需要 27% 的空间就可以超越网络。将每个插槽的预期块数设置为 32，将攻击者所需的空间增加到 46%。

不将其增加到超过 32 的原因如下：如果我们将每 10 分钟时隙的块数增加到 200 左右，那么 VDF 稍快的人孤立其他人的能力就会增加。这是因为块之间的时间会变得非常小。对于 32 个块，块之间的时间大约为 15-25 秒，并且需要更快的 VDF 才能孤立。

此外，斯坦福论文[Tse et. al, 1]表明增加每个挑战的块数会以非常慢的速度提高安全性，因此稍微增加这个数字并没有带来太大的好处。

如果攻击者要操纵难度，他们可以更改难度，以便每个插槽获得更少的奖励块。然后他们可以包含或排除每个块，并同时以指数方式扩展所有链，并且他们将能够将它们的空间乘以一个小因子[1] 。不清楚这次攻击是否收益很大，因为攻击者必须改变难度，这需要牺牲一些权重。但是，为了防止这种攻击，要求必须至少创建 16 个奖励链块才能包含挑战块。这使最坏情况下所需的攻击者空间从 27% 增加到 42%。

<details>
<summary>原文参考</summary>

- ## Extending many chains

If an attacker is making their own private chain, they can choose which block gets infused into the challenge chain, and can therefore try many different infusions such that they get the best possible chain.
Due to the average of 32 blocks with the same challenge, the attacker can only try about 32 different combinations (which block to include in the challenge chain),
and exponentially branching of trying each of these would give a small boost in space for the attacker 
(Having 5 PiB they can pretend to have 6 or 7, etc).
This is because the alternative chains being tried are inferior and less likely to overtake the longest one.
This has been analyzed in [1].

The actual amount of space required to perform this attack (for the attacker to get a heavier chain than the rest of the network combined) is 46.3%,
due to the ability for an attacker to "try" different combinations of blocks, for example omitting or not omitting the first block.
If there was a new proof of space challenge for every single block,
the attacker can multiply their space by a factor of e=2.718, where only 27% is required to overtake the network.
Setting the expected number of blocks per slot to 32, increases the attacker's required space to 46%. 

The reason for not increasing this further than 32 is the following:
if we increased the number of blocks per 10 minute slot to something like 200,
then the ability for someone with a slightly faster VDF to orphan others would increase.
This is because the time between blocks would get very small.
With 32 blocks, the time between blocks is around 15-25 seconds, and a much faster VDF is required to orphan.

Furthermore, the Stanford paper [Tse et. al, 1] shows that increasing the number of blocks per challenge increases security at a very slow rate,
so increasing this number slightly does not provide much benefit.

If the attacker were to manipulate the difficulty, they can change it so that they get less reward blocks per slot. Then they can either include or exclude each block, and exponentially extend all chains simultaneously, and they would be able to multiply their space by a small factor [1]. It is not clear whether this attack gains very much, since the attacker must change the difficulty, which requires sacrificing some weight. However, to prevent this attack, there is a requirement that at least 16 reward chain blocks must be created for a challenge block to be included. This brings the required attacker space in the worst case scenario from 27% up to 42%.

</details>

## 更快的 VDF 和 46% 的空间

如果攻击者的 VDF 更快，则 46% 攻击会变得更糟。假设攻击者的 VDF 快 2 倍。然后他们的链将能够以网络其余部分的 2 倍的速度创建挑战和块，这意味着他们可以创建具有相同空间量的“更重”链。

这个所需的空间从总网络空间的 46% 下降到大约 30%。 0.46/0.54 = 2x/(1-x)。 x=0.30。如果攻击者无法访问最快的 VDF，他们将无法获得空间优势。 Chia 空间/全球硬盘空间 有人担心，如果与硬盘制造商或大公司的可用可用空间相比，Chia 系统没有大量空间，它将容易受到 51% 的攻击。因此，Chia 系统占用的空间越多，网络就越安全。一种可能的情况是，大量空间出现，使得每 TB 的回报非常低，并且不足以证明购买驱动器或删除业务数据是合理的。此外，创建图需要固定数量的前期时间和金钱（根据 beta17 中的当前计算，k32 大约为 1kWh，或大约 10 美分，即每 TB 1 美元）。

<details>
<summary>原文参考</summary>

- ## Faster VDF and 46% of space

The 46% attack gets worse if the attacker’s VDF is faster. Let’s assume the attacker’s VDF is 2x faster. Then their chain will be able to create challenges and blocks at 2x the rate of the rest of the network, which means they can create a "heavier" chain with the same amount of space.

This required space drops from 46% to approximately 30% of the total network space. 0.46/0.54 = 2x/(1-x). x=0.30. If the attacker does not have access to the fastest VDF, they will not be able to get a space advantage.
Chia space / global hard drive space 
There is a concern that if the Chia system does not have a significant amount of space compared to the available free space of hard drive manufacturers or large companies that it will be vulnerable to 51% attacks. Therefore the more space taken by the Chia system, the more secure the network is. One plausible scenario is that a lot of space comes on, making the rewards per TB quite low, and not significant enough to justify buying drives or deleting business data. Furthermore, creating a plot requires a fixed amount of upfront time and money (from current calculations in beta17, about 1kWh for a k32, or about 10 cents, which is $1 per terabyte).

</details>

## 100%攻击

如果每个 X VDF 插槽触发难度调整，而不是每个 X 块，这将允许 100% 攻击，所有农民合谋不断降低或增加难度。在正常操作中，每个插槽有 32 个块。在 100% 攻击下，难度被操纵，使得难度降低 2，因此每个槽有 64 个块，然后增加 4，因此每个槽有 16 个块，永远交替。这将使农民平均每时隙获得 64+16/2 = 36 个区块奖励。这就是根据区块数量进行难度调整的原因。

<details>
<summary>原文参考</summary>

- ## 100% attack

If difficulty adjustment was triggered every X VDF slots, as opposed to every X blocks, this would allow for a 100% attack, where all farmers collude to constantly decrease or increase the difficulty. In normal operation, there are 32 blocks per slot. Under a 100% attack, the difficulty is manipulated such that difficulty goes down by 2, so there are 64 blocks per slot, and then goes up by 4, so there are 16 blocks per slot, alternating forever. This would allow farmers to earn on average 64+16/2 = 36 block rewards per slot. This is the reason for making difficulty adjustment based on the number of blocks.

</details>

## 短程重绘攻击

即使在快速的硬件上，绘图通常也需要几分钟到几个小时，但它是可并行化的并且越来越快。攻击者可能会想办法在释放标志点之后创建地块，但在注入点之前，然后删除地块，实际上可以在不连续存储空间的情况下进行耕种。这可能需要具有快速内存的昂贵的专用硬件，因为必须及时为输液创建绘图（少于 28 秒）。

如果我们假设最坏的情况是农民能够立即创建一个地块，那么问题就变成了，攻击的成本和收益是多少？成本是创建该地块的电力、内存、硬件和基础设施成本。创建 1TB 的成本目前约为 1 美元的电费。好处将与将该图存储 80 分钟（标牌点间隔乘以图过滤器常数）相同的好处。这是因为攻击者可以选择通过绘图过滤器的绘图。假设每年每 TB 价值 5 美元，80 分钟的 1TB 绘图的价值为 0.00094 美元。因此，使用当前的绘图软件和硬件，与重新创建绘图相比，存储绘图要便宜得多。

绘图过滤器常数对于减少农民必须执行的磁盘查找量非常有用。使用 512 的地块过滤器，农民只需每 80 分钟读取约 7 次，而不是每 9 秒每地块读取 7 次磁盘。绘图过滤器常数为攻击者提供了重绘利益的乘数，因此它不能设置得太高。绘图过滤器常数为 512 时，1/512 绘图对每个挑战都有效。然后攻击者只能创建通过过滤器的图，因此不需要创建其他 511/512ths。将其设置为 512 可提供 512x 乘数等。


<details>
<summary>原文参考</summary>

- ## Short range replotting attack

Plotting usually takes a few minutes to a few hours even on fast hardware, but it is parallelizable and getting faster.
Attackers might find ways to create plots after a signage point is released, but before the infusion point and then delete the plot, in effect being able to farm without storing the space continuously.
This will likely require expensive specialized hardware with fast memory, since the plot must be created in time for the infusion (less than 28 seconds).

If we assume the worst case scenario of a farmer being able to create a plot instantly,
the question becomes, what is the cost and what is the benefit of the attack? 
The cost is the electricity, memory, hardware and infrastructure cost of creating that plot.
The cost of creating 1TB is currently on the order of $1 in electricity costs. The benefit would be the same benefit 
as storing that plot for 80 minutes (the signage point interval times the plot filter constant). 
This is because the attacker can choose a plot that passes the plot filter. 
Assuming $5 per year value per terabyte, the value of a 1TB plot for 80 minutes is $0.00094. 
Therefore with current plotting software and hardware, it is significantly cheaper to store the plots as opposed to recreating them. 

The plot filter constant is very useful to reduce the amount of disk lookups farmers must do. 
With a plot filter of 512, Instead of 7 disk reads per plot every 9 seconds, farmers only need to do about 7 reads for every 80 minutes. 
The plot filter constant provides a multiplier of replotting benefit to the attacker, so it must not be set too high. 
With a plot filter constant of 512, 1/512 plots are valid for every challenge.
The attacker can then only create plots that pass the filter, therefore not needing to create the other 511/512ths. 
Setting it to 512 provides a 512x multiplier, etc.

</details>

## 更快的 VDF（但不是 51% 攻击）

使用系统中最快的 VDF，攻击者可以更有效地执行 51% 攻击：即在私有链中耕种时扩大他们的空间。如果攻击者没有达到总共 51% 的空间（通过 VDF 提升和扩展许多链如上），更快的 VDF 的有用性会大大降低。这是因为块的包含和排除不取决于您执行 VDF 的速度，而是取决于它是否小于子槽迭代。此外，攻击者需要网络其余部分的空间才能前进，因此必须向网络释放挑战。

在某些块非常靠近的情况下，拥有更快的 VDF 可以让攻击者孤立某些块，尽管这不会在短期内增加奖励，并且从长远来看有破坏网络的风险。TODO：展开：bram


<details>
<summary>原文参考</summary>

- ## Faster VDF (but not 51% attack)

With the fastest VDF in the system, an attacker can more effectively perform a 51% attack: i.e expand their space,
when farming in a private chain. If the attacker does not reach a total of 51% of space (with the VDF boosting and extending many chains as above), the usefulness of the faster VDF decreases substantially. This is because inclusion and exclusion of blocks does not depend on how fast you can perform the VDF, but instead depends on whether it’s less than the sub-slot iterations. Furthermore, an attacker needs the space of the rest of the network in order to advance, and therefore must release the challenges to the network.

In certain cases where blocks come very close together, having a faster VDF can allow an attacker to orphan certain blocks, although this does not increase rewards in the short term, and has a risk of undermining the network in the long term. TODO: expand: bram

</details>

## 自私的农业

自私耕作是一种攻击者私下耕种区块，只有在它们有被诚实链超越的风险时才会释放它们。在 Nakamoto PoW 中，这提供了显着的收益，因为在矿工领先于网络其余部分的任何时候，网络的其余部分都在一条不会获胜的链上浪费他们的算力。在 Chia 共识中，这是不同的，由于 30-40 秒的延迟以及孤立其他农民的块并不会增加奖励的事实。(??)TODO：展开：bram

<details>
<summary>原文参考</summary>


- ## Selfish Farming
Selfish farming is an attack where the attacker farms blocks in private, and only releases them when they are at risk of being surpassed by the honest chain. In Nakamoto PoW this provides significant gains, because at any point at which the miner is ahead of the rest of the network, the rest of the network is wasting their hashpower on a chain that will not win. In Chia consensus this is different, due to the 30-40 second delay and the fact orphaning other farmers' blocks does not increase rewards. (??)TODO: expand: bram

</details>

## 农民贿赂树干攻击

An interesting attack explored by [10] is the bribing attack which takes advantage of the predictability of the elected “leaders” in each slot.作者分析了一个权益证明链，并认为当参与者提前知道他们将获胜时，就存在潜在的贿赂攻击。如果参与者事先知道哪些地块会获胜，每个用户可以通知攻击者他们愿意参与攻击，如果他们达到一定的阈值，他们可以完全重组链（或孤儿不参与的人，审查交易等）。这种攻击不需要网络中的大部分空间参与；只有在那短短的时间内获胜者。此外，它是不可检测的，因为攻击者可以制作一个看起来正常的链。

这个问题在 Chia 共识算法的这个修订版中不存在。这个问题是通过降低可预测性来解决的：在标志点之前，每个农民都不确定他们的空间证明是否完全合格。因此，攻击者必须贿赂大部分空间才能完成这次攻击。

<details>
<summary>原文参考</summary>

- ## Farmer bribe trunk attack

An interesting attack explored by [10] is the bribing attack which takes advantage of the predictability of the elected “leaders” in each slot. The authors analyze a proof of stake chain, and argue that when participants know that they are going to win in advance, there is a potential bribing attack. If participants knew in advance which plots would win, each user can notify an attacker that they are willing to participate in the attack, and if they reach a certain threshold, they can completely reorg the chain (or orphan those who do not participate, censor transactions, etc). This attack does NOT require the majority of the space in the network to participate; only the winners in that short time period. Furthermore, it is undetectable, since the attacker can make a normal looking chain. 

This problem is not present in this revision of the Chia consensus algorithm. This problem is solved by reducing the predictability: each farmer does not know for sure if their proof of space is fully eligible until the signage point. Therefore an attacker must bribe a large majority of the space to pull off this attack. 

</details>

## 农民贿赂树叶重组攻击

由于区块是由 PoSpace 密钥签名的，理论上农民可以使用相同的 PoSpace 在相同的高度对多个区块进行签名。攻击需要恶意方用一定数量的资金贿赂农民，让他们提供备用链的签名。如果攻击者可以说服 N 个区块中的每个农民签名，他们就可以恢复或重新排序这 N 个区块中的任何交易。可以使用潜在的欺诈证明，但没有选择这些，因为它们会导致其他攻击并使行为复杂化。

相反，解决方案只是等待更长时间。在 32 个区块（大约 10 分钟）之后，假设至少有一个农民遵守协议而不是双重签名是合理的。如果54%是非共谋（46%攻击弹性的假设），32个区块后逆转的概率为1.8*10-13=0.00000000000018。此外，这种攻击是可检测的，因此不容易实现。

每个用户可以选择他们自己的阈值，他们接受一个交易/块作为最终的阈值。例如，在总网络空间突然下降的情况下，用户可以更加小心，不要将交易视为最终交易，以防存在另一个现有分叉，例如由于网络分裂。

<details>
<summary>原文参考</summary>

- ## Farmer bribe foliage reorg attack

Since blocks are signed by PoSpace keys, a farmer can theoretically sign multiple blocks with the same PoSpace, at the same height. The attack requires a malicious party to bribe farmers with a certain amount of funds for them to provide a signature of an alternate chain. If the attacker can convince every single farmer in N blocks to sign, they can revert or reorder any transaction in those N blocks. Potentially fraud proofs could be used, but these were not chosen since they enable other attacks and complicate behaviour. 

Instead, the solution is simply to wait longer. After 32 blocks (approximately 10 minutes), the assumption that at least one farmer is following the protocol and not double signing is a reasonable one. If 54% is non-colluding (the assumption for 46% attack resilience), the probability of a reversal after 32 blocks is1.8*10-13=0.00000000000018. Furthermore, this attack is detectable so it is not easy to pull off.

Each user can choose their own threshold for which they accept a transaction/block as final. For example, in cases where the total network space drops suddenly, users can be more careful and not consider transactions final, in case there is another existing fork, due to a network split, for example. 

</details>

## 交易费用的孤立交易块

交易区块与非交易区块不同，因为它们包含交易费用。这些可能会超过区块奖励。在撰写本文时（2020 年 11 月），在 defi 炒作的高峰期，我们看到 2 个 eth 区块奖励和每个区块 8 个 eth 费用。在 Chia，这会更加极端，因为并非每个区块都包含交易。这会导致攻击，其中第二名农民忽略第一名试图赢得交易块。如果第 2 个块在第 1 个块之后不到 30 秒出现，则它们不指定前一个块，因此第 2 个块不能孤立第 1 个块。第 3 名可能成为孤儿，但没有人会遵循这条链，因为它更短。

然而，如果在第一个区块的 30 秒内没有区块，第二个可以孤立第一个，但他们必须说服下一个区块在他们的备用链上耕种。如果攻击者同时控制了第 2 个和第 3 个，则更容易进行攻击，在这种情况下，他们可以忽略第一个并且仍然更长。这些孤儿攻击不允许攻击者窃取奖励，而是允许攻击者稍微降低难度。由于它们是非常情境化的并且需要大量空间，因此尝试这种攻击对网络的伤害可能超过攻击者的潜在收益。

<details>
<summary>原文参考</summary>

- ## Orphaning transaction blocks for transaction fees

Transaction blocks are different from non-transaction blocks, since they contain transaction fees. These may surpass block rewards. At the time of writing (November 2020), in peak defi hype we are seeing 2 eth block rewards with 8 eth fees per block. In Chia this will be more extreme, since not every block contains transactions. This leads to attacks where the 2nd place farmer ignores the 1st place in an attempt to win the transaction block. If the 2nd block comes less than 30 seconds after the 1st, they do not specify the previous block, and thus the 2nd place cannot orphan the 1st. The 3rd place could orphan both, but nobody would follow this chain since it is shorter. 

However, if there are no blocks within 30 seconds of the 1st block, the 2nd could orphan the 1st, but they would have to convince the next block to farm on their alternate chain. An easier attack would be if the attacker controlled both the 2nd and 3rd, in which case they could ignore the first and still be longer. These orphaning attacks do not allow the attacker to steal rewards, but rather allow the attacker to slightly lower the difficulty. Since they are very situational and require a lot of space, attempting this attack will likely harm the network more than the potential gain to the attacker.

</details>

## 孤儿率

在 Chia 共识中，几乎同时存在的两个相互竞争的区块可以并行地包含在区块链中，而彼此不知道。（虽然最多可以是一个块）。由于所有的交易区块也是区块，所以它们都被包含在链中，从而导致链具有更高的权重。这意味着假设低网络延迟，Chia 中的孤儿率将基本上为零。如果网络延迟超过注入延迟（30-40 秒），那么几乎可以保证块的孤立，因此它更像是一个阶跃函数。这与 Nakamoto-PoW 形成对比，在 Nakamoto-PoW 中，如果存在网络延迟，孤儿率就会很高，随着网络状况的改善而平滑下降，但从未达到零。

<details>
<summary>原文参考</summary>

- ## Orphan Rate

In Chia consensus, two competing blocks around the same time can both be included into the blockchain in parallel, without knowing about each other. (Although at most one can be a block). Since all transaction blocks are also blocks, they are both included into the chain, resulting in a chain with higher weight. This means that the orphan rate in Chia will be essentially zero, assuming low network latency. If network latency exceeds the infusion delay (30-40 seconds), then orphaning of a block is almost guaranteed, so it is more of a step-function. This is in contrast with Nakamoto-PoW in which the orphan rate is high if there is network delay, and decreases smoothly as network condition improves, but never reaches zero.

</details>
