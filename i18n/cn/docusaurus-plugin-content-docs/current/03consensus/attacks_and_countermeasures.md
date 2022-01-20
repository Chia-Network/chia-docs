---
sidebar_position: 14
---

# 3.14 相关攻击及对策

> Relevant Attacks and Countermeasures


## 51% (46%) 攻击：

51%（实际上是 46%，如下所述）攻击涉及创建一个替代链，该链最终达到比诚实链更高的权重，并迫使用户重新组织。这是经典的远程攻击，存在于包括 Chia 在内的许多区块链网络以及工作量证明系统中。

在这次攻击中，控制至少 46% 网络空间的人创建了一个替代链，最终变得比诚实链更重。

Chia 的时空证明共识和工作证明之间有两个主要区别。
1. 在 Chia 中，攻击者可以同时在多条链上扩展和耕种，使得攻击只需要 46% 的网络空间。不需要快速 VDF 即可获得此优势。因此，46% 的假设应该用作远程攻击的基线。
2. 在 Chia，如果攻击者拥有全网最快的 VDF，他们可以获得额外的空间优势/提升。 （如果攻击者的 VDF 甚至比最快的 VDF 稍微慢一点，它也不会给他们任何优势。）

<details>
<summary>原文参考</summary>

- ## 51% (46%) attack:

A 51% (actually 46%, as explained below) attack involves creating an alternate chain which eventually reaches a higher weight than the honest chain, and forces users to re-org. This is the classic long-range attack, which is present on many blockchain networks including Chia's, as well as on proof-of-work systems.

In this attack, someone who controls at least 46% of the network space creates an alternate chain, which eventually becomes heavier than the honest chain.

There are two main differences between Chia's Proof of Space and Time consensus and Proof of Work.
1. In Chia, the attacker can extend and farm on many chains simultaneously, making the attack possible with only 46% of the network space. A fast VDF is not required to gain this advantage. Therefore, a 46% assumption should used as the base line for a long-range attack.
2. In Chia, if the attacker has the fastest VDF on the entire network, they can get an additional space advantage/boost. (If the attacker's VDF is even slightly slower than the fastest VDF, it will not give them any advantage.)

</details>

## 扩展多个链

如果攻击者正在制作自己的私有链，他们可以选择将哪个区块注入挑战链，因此可以尝试许多不同的注入，从而获得最好的链。

由于平均有 32 个块具有相同的挑战，攻击者只能尝试大约 32 种不同的组合（找出要包含在挑战链中的块）。尝试每一种方法所产生的指数分支将为攻击者提供小幅提升的空间。例如，拥有 5 PiB 的人可以假装拥有 6 或 7 PiB。

仅获得小幅提升的原因是因为正在尝试的替代链较差并且不太可能超过最长的链。 [PoSAT 论文](https://arxiv.org/abs/2010.08154) 对此进行了分析。

由于攻击者能够“尝试”不同的块组合，例如省略或者不省略第一个块。

如果每个区块都有新的空间挑战证明，攻击者可以将他们的空间乘以 e=2.718 的系数，其中只需要 27% 的空间就可以超越网络。 Chia 选择通过将每个子时隙的预期块数设置为 32 来缓解这种攻击向量。这将攻击者所需的空间增加到 46%。

然而，Chia 也选择不将每个子槽的块数增加到大于 32 的数量。这样做会减少块之间的时间，这将使仅比其他所有 VDF 快一点的 VDF 更容易孤立块.就目前而言，每个子槽有 32 个块，攻击者需要比其他所有人都快得多的 VDF 才能成功孤立任何块。

此外，[PoSAT 论文](https://arxiv.org/abs/2010.08154) 表明，增加每次挑战的区块数量会以非常缓慢的速度提高安全性，因此稍微增加这个数字并不会带来太大好处。

如果攻击者要操纵难度，他们可以更改难度，以便每个插槽获得更少的奖励块。然后他们可以包含或排除每个块，并同时以指数方式扩展所有链。这将允许攻击者将他们的空间乘以一个小系数。不清楚这次攻击是否收益很大，因为攻击者必须改变难度，这需要牺牲一些权重。但是，为了防止这种攻击，要求必须至少创建 16 个奖励链块才能包含挑战块。这使最坏情况下所需的攻击者空间从 27% 增加到 46%。

<details>
<summary>原文参考</summary>

- ## Extending many chains

If an attacker is making their own private chain, they can choose which block gets infused into the challenge chain, and can therefore try many different infusions, such that they get the best possible chain.

Due to the average of 32 blocks with the same challenge, the attacker can only try about 32 different combinations (figuring out which block to include in the challenge chain). The exponential branching that results from trying each of these would give a small boost in space for the attacker. For example, someone with 5 PiB can pretend to have 6 or 7 PiB.

The reason for receiving just a minor boost is because the alternative chains being tried are inferior and less likely to overtake the longest one. This has been analyzed in the [PoSAT paper](https://arxiv.org/abs/2010.08154).

The actual amount of space required to perform this attack (for the attacker to get a heavier chain than the rest of the network combined) is 46.3%, due to the ability for an attacker to "try" different combinations of blocks, for example omitting or not omitting the first block.

If there was a new proof of space challenge for every single block, the attacker could multiply their space by a factor of e=2.718, where only 27% is required to overtake the network. Chia has chosen to mitigate this attack vector by setting the expected number of blocks per sub-slot to 32. This increases the attacker's required space to 46%. 

However, Chia also chose not to increase the number of blocks per sub-slot to a number greater than 32. Doing so would decrease the time between blocks, which would allow a VDF that is only slightly faster than all others to orphan blocks more easily. As it stands, with 32 blocks per sub-slot, an attacker would need to have a significantly faster VDF than everyone else in order to successfully orphan any blocks.

Furthermore, the [PoSAT paper](https://arxiv.org/abs/2010.08154) shows that increasing the number of blocks per challenge increases security at a very slow rate, so increasing this number slightly does not provide much benefit.

If the attacker were to manipulate the difficulty, they could change it so that they get fewer reward blocks per slot. Then they could either include or exclude each block, and exponentially extend all chains simultaneously. This would allow the attacker to multiply their space by a small factor. It is not clear whether this attack gains very much, since the attacker must change the difficulty, which requires sacrificing some weight. However, to prevent this attack, there is a requirement that at least 16 reward chain blocks must be created for a challenge block to be included. This brings the required attacker space in the worst case scenario from 27% up to 46%.

</details>

## 更快的 VDF 和 46% 的空间

如果攻击者的 VDF 更快，则 46% 攻击会变得更糟。假设攻击者的 VDF 快 2 倍。然后他们的链将能够以网络其余部分的 2 倍的速度创建挑战和块，这意味着他们可以创建具有相同空间量的“更重”链。

这个所需的空间从总网络空间的 46% 下降到大约 30%。 0.46/0.54 = 2x/(1-x).x=0.30。如果攻击者无法访问最快的 VDF，他们将无法获得空间优势。 Chia 空间/全球硬盘空间有人担心，如果与硬盘制造商或大公司的可用可用空间相比，Chia 系统没有大量空间，它将容易受到 51% 的攻击。因此，Chia 系统占用的空间越多，网络就越安全。一种可能的情况是，大量空间出现，使得每 TB 的回报非常低，并且不足以证明购买驱动器或删除业务数据是合理的。此外，创建图需要固定数量的前期时间和金钱（根据 beta17 中的当前计算，k32 大约为 1kWh，或大约 10 美分，即每 TB 1 美元）。

<details>
<summary>原文参考</summary>

- ## Faster VDF and 46% of space

The 46% attack gets worse if the attacker’s VDF is faster. Let’s assume the attacker’s VDF is 2x faster than the second-fastest VDF. Then their chain will be able to create challenges and blocks at 2x the rate of the rest of the network, which means they can create a "heavier" chain with the same amount of space.

This reduces the required space from 46% to approximately 30% of the total network space. `0.46/0.54 = 2x/(1-x). x=0.30`. If the attacker does not have access to the fastest VDF, they will not be able to get a space advantage beyond 46%.

</details>

## Chia 空间/全球硬盘空间

有人担心，如果与硬盘制造商或大公司的可用可用空间相比，Chia 网络没有大量空间，那么它将容易受到 46% 的攻击。因此，Chia 网络占用的空间越多，网络就越安全。

不过，我们认为这种类型的攻击不太可能发生。拥有大量存储空间的大型数据中心和公司往往没有太多 _unused_ 存储空间可用于保存 Chia 图。进入 Chia 网络的空间越多，每 TB 的奖励就越低。由于网络空间目前（2021 年 12 月）为 35 EiB，公司将发现很难证明购买驱动器或删除业务数据的合理性。此外，创建一个图需要固定数量的前期时间和金钱（根据目前的计算，k32 大约为 1kWh，或大约 10 美分，即每 TB 1 美元）。

最可能的长期情况是，每 TB 的奖励将足够低，以阻止人们和公司为了种植 Chia 而购买新存储。因此，未来的大部分新网络空间将来自使用过的存储，通常来自硬盘，否则将被送往垃圾填埋场。这将有两个目的：防止此处布置的攻击，并保持 Chia 绿色。

<details>
<summary>原文参考</summary>

- ## Chia space / global hard drive space 

There is a concern that if the Chia network does not have a significant amount of space compared to the available free space of hard drive manufacturers or large companies, then it will be vulnerable to 46% attacks. Therefore the more space taken by the Chia network, the more secure the network is.

We believe this type of attack is unlikely, though. Large data centers and companies with significant amounts of storage tend to not have much _unused_ storage available to hold Chia plots. And the more space that comes onto Chia's network, the lower the rewards per TB. With the netspace currently (December 2021) sitting at 35 EiB, companies will find it difficult to justify buying drives or deleting business data. Furthermore, creating a plot requires a fixed amount of upfront time and money (from current calculations, about 1kWh for a k32, or about 10 cents, which is $1 per terabyte).

The most likely long-term scenario is that rewards per TB will be sufficiently low to discourage people and companies from acquiring new storage just to farm Chia. Most of the new netspace in the future will therefore come from used storage, often from hard disks that otherwise would have been bound for a landfill. This will serve two purposes: preventing the attack laid out here, and keeping Chia green.

</details>

## 100%攻击

如果每个 X VDF 插槽触发难度调整，而不是每个 X 块，这将允许 100% 攻击，所有农民合谋不断降低或增加难度。

在正常操作下，每个槽有 32 个块。

在假设的 100% 攻击下：
1. 难度将人为减半，临时允许每个插槽创建64个区块。
2. 然后人为地将难度增加了 4 倍，暂时允许每个插槽 16 个块。
3. 重复步骤 1。

这种攻击的结果是每个插槽平均创造 (64+16)/2 = 40 个区块奖励，奖励增加 25%。 这也是Chia选择根据区块数量触发难度调整的原因。 如果在当前系统下尝试这种攻击，它会减慢和加速网络，但不会产生任何额外的奖励。

<details>
<summary>原文参考</summary>

- ## 100% attack

If the difficulty adjustment were triggered every X VDF slots, as opposed to every X blocks, this would allow for a 100% attack, where all farmers collude to constantly decrease or increase the difficulty.

Under normal operation, there are 32 blocks per slot.

Under the hypothetical 100% attack:
1. The difficulty would be artificially cut in half, temporarily allowing 64 blocks to be created per slot.
2. The difficulty would then be artificially increased by 4x, temporarily allowing 16 blocks per slot.
3. Repeat step 1.

The result of this attack would be to create an average of (64+16)/2 = 40 block rewards per slot, a 25% increase in rewards. This is why Chia chose to trigger the difficulty adjustment based on the number of blocks. If this attack were attempted under the current system, it would slow down and speed up the network, but it would not yield any extra rewards.

</details>

## 短程重绘攻击

绘图通常需要几分钟到几个小时，即使在快速硬件上也是如此，但它是可并行化的并且越来越快。

在未来的某一天，拥有高端硬件的攻击者可以在标牌点发布后开始创建情节，并在注入点之前完成情节。然后，攻击者可以在获得质量评级后（或在提交证明（如果符合条件）后删除该图）。这将允许攻击者创建一个自动通过过滤器的图，有效地允许他们在不存储任何空间的情况下进行耕作。仅当可以在不到 28 秒（输注前）内创建一个情节时，这种攻击才变得可行。

如果我们假设农民能够立即创建一个地块的最坏情况，
问题变成了，攻击的成本和收益是多少？

成本是创建地块所需的电力、内存、硬件和基础设施。创建 k32 地块所需的电力目前约为 0.10 美元，即每 TB 约为 1 美元。

好处将与将该图存储 80 分钟（标牌点间隔乘以图过滤器常数）相同的好处。这是因为攻击者总是可以创建一个通过绘图过滤器的绘图。假设每年每 TB 价值 5 美元，80 分钟的 1TB 绘图的价值为 0.00094 美元。因此，使用当前的绘图软件和硬件，与重新创建绘图相比，存储绘图要便宜得多。

另一种看待这种攻击的好处的方式：如果攻击者可以创建一个始终通过过滤器的图，则相当于在本地存储 512 个图。存储 512 个图或运行此攻击哪个更便宜？

如果 1 TB 的 HDD 存储成本为 15 美元，那么购买足够的空间来存储 512 个地块的成本约为 750 美元。如果考虑到运行农民的低端计算机，则该系统的总成本约为 1000 美元。因此，重新绘制攻击仅在价值低于 1000 美元的系统上才具有经济可行性。如果这种攻击成为可能，那么运行攻击的成本可能比存储图谱的成本至少高出一个数量级。 （请记住，存储的价格每年都在下降，因此攻击的好处在不断减少，即使其可行性正在增加。）

绘图过滤器常数对于减少农民必须执行的磁盘查找量非常有用。使用 512 的地块过滤器，农民只需每 80 分钟读取约 7 次，而不是每 9 秒每地块读取 7 次磁盘。

绘图过滤器常数的缺点是它为攻击者提供了重新绘图好处的乘数，因此它不能设置得太高。绘图过滤器常数为 512 时，1/512 绘图对每个挑战都有效。然后攻击者只能创建通过过滤器的图，因此不需要创建其他 511/512ths。

将滤波器常数设置为 512 可提供 512 倍的乘数。如果重新绘制攻击在经济上变得可行，一种缓解措施是减少过滤器，从而降低攻击的收益。另一个缓解措施是增加最小地块大小，从而降低攻击的可行性。

无论如何，鉴于预计硬件速度会有所提高，这种攻击至少要到 2026 年才能实现。

<details>
<summary>原文参考</summary>

- ## Short range replotting attack

Plotting usually takes a few minutes to a few hours, even on fast hardware, but it is parallelizable and getting faster.

Someday in the future, an attacker with high-end hardware could begin creating a plot after a signage point is released, and complete the plot before the infusion point. The attacker could then delete the plot after obtaining the quality rating (or after submitting the proof if it's eligible). This would allow the attacker to create a plot that automatically passes the filter, effectively allowing them to farm without storing any space. This attack only becomes feasible if it is possible to create a plot in less than 28 seconds (before the infusion).

If we assume the worst-case scenario of a farmer being able to create a plot instantly,
the question becomes, what is the cost and what is the benefit of the attack?

The cost is the electricity, memory, hardware and infrastructure needed to create a plot. The electricity required to create a k32 plot is currently around $0.10, or around $1 per TB.

The benefit would be the same benefit as storing that plot for 80 minutes (the signage point interval times the plot filter constant). This is because the attacker can always create a plot that passes the plot filter. Assuming $5 per year value per terabyte, the value of a 1TB plot for 80 minutes is $0.00094. Therefore with current plotting software and hardware, it is significantly cheaper to store the plots as opposed to recreating them.

Another way to look at the benefit of this attack: If the attacker can create a plot that always passes the filter, it will be the equivalent of storing 512 plots locally. Which is cheaper, storing 512 plots or running this attack?

If 1 TB of HDD storage costs $15, it would cost around $750 to purchase enough space to store 512 plots. If we account for a low-end computer on which to run a farmer, the total cost of this system is roughly $1000. Therefore, the replotting attack only becomes economically feasible on a system worth less than $1000. If this attack ever becomes possible, it will likely cost at least an order of magnitude more to run the attack than to store the plots. (And keep in mind, the price of storage tends to fall every year, so the benefit of the attack is constantly decreasing, even as its feasibility is increasing.)

The plot filter constant is very useful to reduce the amount of disk lookups farmers must do. With a plot filter of 512, Instead of 7 disk reads per plot every 9 seconds, farmers only need to do about 7 reads for every 80 minutes.

The downside of the plot filter constant is that it provides a multiplier of replotting benefit to an attacker, so it must not be set too high. With a plot filter constant of 512, 1/512 plots are valid for every challenge. The attacker can then only create plots that pass the filter, therefore not needing to create the other 511/512ths.

Setting the filter constant to 512 provides a 512x multiplier. If the replotting attack ever becomes economically feasible, one mitigation would be to decrease the filter, thus decreasing the attack's benefit. The other mitigation would be to increase the minimum plot size, thus decreasing the feasibility of the attack.

In any case, this attack will not become feasible until at least 2026, given projected improvements in hardware speed.

</details>

## 更快的 VDF（但不是 51% 攻击）

使用系统中最快的 VDF，攻击者可以更有效地进行 51% 攻击：他们可以在私有链中耕作的同时扩大空间。

如果攻击者没有达到总共 51% 的空间（通过 VDF 提升和扩展许多链如上），更快的 VDF 的有用性会大大降低。 这是因为块的包含和排除不取决于您执行 VDF 的速度，而是取决于它是否小于子槽迭代。 此外，攻击者需要网络其余部分的空间才能前进，因此必须向网络释放挑战。

在某些块非常靠近的情况下，拥有更快的 VDF 可以让攻击者孤立某些块，尽管这不会在短期内增加奖励（它会伤害他人，但不会使攻击者受益），并且有风险 长期破坏网络（孤立块会降低公众信任）。


<details>
<summary>原文参考</summary>

- ## Faster VDF (but not 51% attack)

With the fastest VDF in the system, an attacker can more effectively perform a 51% attack: they can expand their space while farming in a private chain.

If the attacker does not reach a total of 51% of space (with the VDF boosting and extending many chains as above), the usefulness of the faster VDF decreases substantially. This is because inclusion and exclusion of blocks does not depend on how fast you can perform the VDF, but instead depends on whether it’s less than the sub-slot iterations. Furthermore, an attacker needs the space of the rest of the network in order to advance, and therefore must release the challenges to the network.

In certain cases where blocks come very close together, having a faster VDF can allow an attacker to orphan certain blocks, although this does not increase rewards in the short term (it would hurt others, but not benefit the attacker), and has a risk of undermining the network in the long term (orphaning blocks decreases public trust).

</details>

## 私下耕种

当攻击者私下耕种区块时，就会发生自私耕种，并且只有在它们有被诚实链超越的风险时才会释放它们。

在中本聪 PoW 中，这提供了显着的收益，因为在矿工领先于网络其余部分的任何时候，网络的其余部分都在一条不会获胜的链上浪费他们的算力。

在 Chia 共识中，“自私”的农民可以在注入点之前扣留证据，但这与立即提交证据相比，收益为零。 每个标牌点可以有多个区块获胜者，因此农业不像 PoW 中那样是零和游戏。 此外，时间领主不能接受已经通过的注入点的证明，因此不允许农民堆叠大量的证明以供以后融合。

<details>
<summary>原文参考</summary>

- ## Selfish Farming

Selfish farming occurs when an attacker farms blocks in private, and only releases them when they are at risk of being surpassed by the honest chain.

In Nakamoto PoW this provides significant gains, because at any point at which the miner is ahead of the rest of the network, the rest of the network is wasting their hashpower on a chain that will not win.

In Chia consensus, a "selfish" farmer could withhold a proof until just before the infusion point, but this would provide zero benefit versus submitting the proof right away. There can be multiple block winners per signage point, so farming is not a zero-sum game as it is in PoW. Furthermore, the timelord cannot accept proofs for an infusion point that has already passed, so farmers are not allowed to stack a large number of proofs to be infused later.

</details>

## 农民贿赂树干攻击

[PoSAT white paper](https://arxiv.org/abs/2010.08154)中探讨的一种有趣的攻击是贿赂攻击，这种攻击利用了当选“leader”在每个时隙上的可预见性。 作者分析了权益证明链，并认为当参与者提前知道他们将获胜时，就存在潜在的贿赂攻击。

在 Chia 中，如果参与者事先知道哪些情节会获胜，每个用户都可以通知攻击者他们愿意参与攻击。如果参与者数量达到一定阈值，他们可以完全重新组织链（或孤立那些不参与的人，审查交易等）。这种攻击不需要网络中的大部分空间参与；它只需要在很短的时间内达到一定的赢家门槛。此外，它是不可检测的，因为攻击者可以制作一个看起来正常的链。

这个问题在 Chia 共识算法的这个修订版中不存在。这个问题是通过降低可预测性来解决的：在标志点之前，每个农民都不确定他们的空间证明是否完全合格。因此，攻击者必须贿赂大部分空间才能完成这次攻击。

<details>
<summary>原文参考</summary>

- ## Farmer bribe trunk attack

An interesting attack explored in the [PoSAT white paper](https://arxiv.org/abs/2010.08154) is the bribing attack, which takes advantage of the predictability of the elected “leaders” in each slot. The authors analyze a Proof of Stake chain, and argue that when participants know that they are going to win in advance, there is a potential bribing attack.

In Chia, if participants knew in advance which plots would win, each user could notify an attacker that they'd be willing to participate in the attack. If the number of participants reached a certain threshold, they could completely re-org the chain (or orphan those who do not participate, censor transactions, etc). This attack does NOT require the majority of the space in the network to participate; it only requires a certain threshold of winners within a short time frame. Furthermore, it is undetectable, since the attacker can make a normal looking chain.

This problem is not present in this revision of the Chia consensus algorithm. This problem is solved by reducing the predictability: each farmer does not know for sure if their proof of space is fully eligible until the signage point. Therefore an attacker must bribe a large majority of the space to pull off this attack.

</details>

## 农民贿赂树叶重组攻击

如果攻击者可以说服每个农民签署 N 个深度的区块，他们就可以恢复或重新排序这 N 个区块中的任何交易。这种攻击需要 100% 的合规性，很可能来自不知情的参与者。一旦这些参与者得知攻击，至少其中一些人可能会停止。因此，这只是一次短期攻击。

这种攻击的一种潜在预防措施是使用欺诈证明。但是，这些会启用其他攻击并使行为复杂化，因此未选择它们。

相反，解决方案只是等待更长时间。在 32 个区块（大约 10 分钟）之后，我们可以做出一个合理的假设，即至少有一个农民遵守协议而不是双重签名。如果 54% 是非串通的（假设 46% 的攻击弹性），则 32 个区块后逆转的概率为`0.46^32`或`1.6*10^-11=0.000000000016`。此外，这种攻击是可检测的，因此不容易实现。

每个用户可以选择他们自己的阈值，他们接受一个交易/块作为最终的阈值。例如，在总网络空间突然下降的情况下，用户可以更加小心，不要将交易视为最终交易，以防存在另一个现有分叉，例如由于网络分裂。

<details>
<summary>原文参考</summary>

- ## Farmer bribe foliage re-org attack

Since blocks are signed by PoSpace keys, a farmer can theoretically sign multiple blocks with the same PoSpace, at the same height. The attack requires a malicious party to bribe farmers with a certain amount of funds for them to provide a signature of an alternate chain. It does not require the attacker to have a faster VDF.

If the attacker can convince every single farmer N blocks deep to sign, they can revert or reorder any transaction in those N blocks. This attack requires 100% compliance, likely from unwitting participants. As soon as those participants learn of the attack, at least some of them would probably stop. It is therefore only a short-term attack.

One potential prevention for this attack would be to use fraud proofs. However, these enable other attacks and complicate behavior, so they were not chosen.

Instead, the solution is simply to wait longer. After 32 blocks (approximately 10 minutes), we can make a reasonable assumption that at least one farmer is following the protocol and not double signing. If 54% is non-colluding (the assumption for 46% attack resilience), the probability of a reversal after 32 blocks is `0.46^32` or `1.6*10^-11= 0.000000000016`. Furthermore, this attack is detectable, so it is not easy to pull off.

Each user can choose their own threshold for which they accept a transaction/block as final. For example, in cases where the total network space drops suddenly, users can be more careful and not consider transactions final, in case there is another existing fork, due to a network split, for example.

</details>

## 交易费用的孤立交易块

交易区块与非交易区块不同，因为它们包含交易费用。这些可能会超过区块奖励。例如，以太坊已经创建了一些区块，奖励为 2 eth，费用为 8 eth。 （[EIP 1559](https://eips.ethereum.org/EIPS/eip-1559) 显着改变了计算，所以这只是其他链中可能发生的历史例子。）

在 Chia，这会更加极端，因为并非每个区块都包含交易。这会导致攻击，其中第二名农民忽略第一名试图赢得交易块。如果第 2 个块在第 1 个之后不到 28 秒出现，则它们不指定前一个块，因此第 2 个块不能孤立第 1 个块。第 3 名可能成为孤儿，但没有人会遵循这条链，因为它更短。

然而，如果在第一个区块的 28 秒内没有区块，第二个可以孤立第一个，但他们必须说服下一个区块在他们的备用链上耕种。如果攻击者同时控制了第 2 个和第 3 个，则更容易进行攻击，在这种情况下，他们可以忽略第一个并且仍然更长。这些孤儿攻击不允许攻击者窃取奖励，而是允许攻击者稍微降低难度。由于它们是非常情境化的并且需要大量空间，因此尝试这种攻击对网络的伤害可能超过攻击者的潜在收益。

<details>
<summary>原文参考</summary>

- ## Orphaning transaction blocks for transaction fees

Transaction blocks are different from non-transaction blocks, since they contain transaction fees. These may surpass block rewards. For example, Ethereum has had created some blocks with 2 eth of rewards and 8 eth of fees. ([EIP 1559](https://eips.ethereum.org/EIPS/eip-1559) changes the calculation significantly, so this is just a historical example of what is possible in other chains.)

In Chia this will be more extreme, since not every block contains transactions. This leads to attacks where the 2nd place farmer ignores the 1st place in an attempt to win the transaction block. If the 2nd block comes less than 28 seconds after the 1st, they do not specify the previous block, and thus the 2nd place cannot orphan the 1st. The 3rd place could orphan both, but nobody would follow this chain since it is shorter.

However, if there are no blocks within 28 seconds of the 1st block, the 2nd could orphan the 1st, but they would have to convince the next block to farm on their alternate chain. An easier attack would be if the attacker controlled both the 2nd and 3rd, in which case they could ignore the first and still be longer. These orphaning attacks do not allow the attacker to steal rewards, but rather allow the attacker to slightly lower the difficulty. Since they are very situational and require a lot of space, attempting this attack will likely harm the network more than the potential gain to the attacker.

</details>

## 孤块率

在 Chia 共识中，两个相互竞争的区块可以同时被并行包含在区块链中，彼此不知道（尽管最多一个可以是一个交易区块）。 当同时包含多个区块时，结果是一个权重更高的链。 这意味着假设低网络延迟，Chia 中的孤块率将基本上为零。 如果网络延迟超过注入延迟（30-40 秒），那么几乎可以保证块的孤立，因此它更像是一个阶跃函数。 这与 Nakamoto-PoW 形成对比，在 Nakamoto-PoW 中，如果存在网络延迟，孤块率就会很高，随着网络状况的改善而平滑下降，但从未达到零。

<details>
<summary>原文参考</summary>

- ## Orphan Rate

In Chia consensus, two competing blocks around the same time can both be included into the blockchain in parallel, without knowing about each other (although at most one can be a transaction block). When multiple blocks are included at the same time, the result is a chain with a higher weight. This means that the orphan rate in Chia will be essentially zero, assuming low network latency. If network latency exceeds the infusion delay (30-40 seconds), then orphaning of a block is almost guaranteed, so it is more of a step-function. This is in contrast with Nakamoto-PoW in which the orphan rate is high if there is network delay, and decreases smoothly as network condition improves, but never reaches zero.

</details>
