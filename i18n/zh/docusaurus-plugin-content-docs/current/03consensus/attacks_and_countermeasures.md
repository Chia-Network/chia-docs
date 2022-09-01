---
sidebar_position: 14
---

# 3.14 相关攻击及对策

## 51% (46%) 攻击：

In a majority attack, an attacker creates an alternate chain which eventually reaches a higher weight than the honest chain, and forces users to re-org. 这是经典的远程攻击，存在于包括奇亚在内的许多区块链网络以及工作量证明系统中。 It is colloquially known as a "51% attack" because the attacker must control more than half of the blockchain's resources (hashrate for PoW, netspace for PoST) in order to succeed.

However, Chia's consensus makes this attack more complex to evaluate than in Proof-of-Work systems, so we cannot make a flat 51% assumption. In analyzing this attack, there are several variables at play:

- Number of timelords (regardless of speed)
  - The attacker must control at least one timelord for the attack to be possible.
  - With exactly one timelord, the attacker can only build one private chain.
  - If an attacker is making their own private chain, they can choose which block gets infused into the challenge chain, and can therefore try many different infusions, such that they get the best possible chain. This allows the attacker to create slots with fewer blocks, giving them a "double-dip" advantage, discussed in detail below.
- Timelord speed (regardless of number)
  - If the attacker has a single timelord, the amount of storage required for the attack is directly correlated to the speed of the attacker's timelord relative to the speed of the fastest honest timelord on the network.
  - In Chia, if the attacker has the fastest VDF on the entire network, they can get an additional space advantage/boost. (If the attacker's VDF is even slightly slower than the fastest VDF, it will not give them any advantage.)
  - Additionally, the double-dip advantage will increase as the timelord's speed increases. However, due to the minimum block requirement, this advantage will hit its maximum limit with a timelord that is somewhat less than twice as fast as the fastest honest timelord on the network. Also, multiple timelords are required to gain any double-dip advantage at all.
- Duration of attack
  - For attacks lasting less than one epoch (~4608 blocks or 1 day), we must assume the worst case for the attacker's double-dip advantage, based on the speed and number of timelords.
  - For attacks lasting one epoch or longer, the minimum double-dip advantage can always be used. This is because the difficulty will adjust during the attack, so the attacker will lose the ability to create slots with fewer blocks.

奇亚的时空证明共识和工作证明之间有两个主要区别。

The white paper [Proof-of-Stake Longest Chain Protocols: Security vs Predictability](https://arxiv.org/pdf/1910.02218.pdf) outlines the equation to derive the minimum percentage of the network space an attacker would be required to have in order to undertake a majority attack, for chains using between 1 and 10 consecutive blocks with the same challenge. However, Chia uses a larger -- and variable -- amount of consecutive blocks with the same challenge. Because of this, we must solve the equation for two additional values:

- 16 -- This is the minimum number of blocks in a slot. (See [Section 3.9](/docs/03consensus/overflow_blocks#minimum-block-requirement "Section 3.9: Minimum Block Requirement") for more info.) In the worst-case scenario, an attacker with an unbounded number of fast timelords could theoretically create a chain that always uses this minimum number, as explained in the next section.

- 32 -- This is the targeted number of blocks per sub-slot. (See [Section 3.4](/docs/03consensus/challenges "Section 3.4: Challenges") for more info.) There will be some natural variance in this number, but an attacker who does not have the fastest timelord will not be able to manipulate it.

A 51% (actually 46%, as explained below) attack involves creating an alternate chain which eventually reaches a higher weight than the honest chain, and forces users to re-org. This is the classic long-range attack, which is present on many blockchain networks including Chia's, as well as on proof-of-work systems.

```bash
% Wolfram
% solve q=-(c*p)/(ln(-p)+(c-1)ln(1-p)) , -ln(-p)-(c-1)ln(1-p)=-1+(c-1)*(p/(1-p)), c=16 ,f=1/(1+q)
% Solution over the reals: p≈-0.438787 ∧ q≈1.34313 c=32
% Solution over the reals:p≈-0.616585 ∧ q≈1.4678 c=16
% 1/(1+1.4678)= 0.405219
% 1/(1+1.34313) = 0.4267795
```

In this attack, someone who controls at least 46% of the network space creates an alternate chain, which eventually becomes heavier than the honest chain.

- With a single timelord, `DD` is always 1 (no advantage), regardless of the timelord's speed. This is because the attacker will only be able to build a single private chain.
- With an unbounded number of timelords, `DD` will exist in a range, such that 1.34313 < `DD` < 1.4678. This range has a maximum value due to the minimum of 16 blocks per slot.

There are two main differences between Chia's Proof of Space and Time consensus and Proof of Work.

- `SH` is the total space of the honest nodes on the network
- ## Faster VDF (but not 51% attack)
- `SA` is the attacker's total space
- （如果攻击者的 VDF 甚至比最快的 VDF 稍微慢一点，它也不会给他们任何优势。）

Using these variables, the formula to calculate when an attacker is able to create a chain at the same speed as the honest chain is:

`SH * VH = SA * VA * DD`

If we normalize the network's honest space and fastest timelord to equal 1, then in order for the attack to succeed, the product of the attacker's space, timelord speed, and double-dip advantage must be at least 1:

`SA * VA * DD >= 1`

由于攻击者能够“尝试”不同的块组合，例如省略或者不省略第一个块。

`SA = 1 / (VA * DD)`

Finally, the formula to calculate the minimum netspace percentage required for the attack is:

`% = (SA / (1 + SA)) * 100`

The following table shows the minimum required proportion of the total netspace an attacker must have in order to succeed in a majority attack. This table is valid for attacks lasting any amount of time, though sometimes it's overly conservative for attacks lasting more than one epoch. It uses fixed values for the first two columns.

| Number of Timelords | VA (relative to VH) |   DD    |  SA   | Percent of netspace required | Comment                                                                                                                                                                                                                                                                                                                    |
|:-------------------:|:-------------------:|:-------:|:-----:|:----------------------------:|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          0          |         N/A         |    1    |   ∞   |             N/A              | Without a timelord, the attack is not possible.                                                                                                                                                                                                                                                                            |
|          1          |         0.5         |    1    |   2   |            66.7%             | With a 0.5x timelord, the attacker must control twice as much space as the rest of the network combined.                                                                                                                                                                                                                   |
|          ∞          |         0.5         | 1.34313 | 1.489 |    ## 51% (46%) attack:     | With infinite 0.5x timelords, the attacker gains a double-dip advantage, so less space is required versus having a single timelord of the same speed.                                                                                                                                                                      |
|          1          |          1          |    1    |   1   |            50.0%             | The 46% attack gets worse if the attacker’s VDF is faster. Let’s assume the attacker’s VDF is 2x faster than the second-fastest VDF. Then their chain will be able to create challenges and blocks at 2x the rate of the rest of the network, which means they can create a "heavier" chain with the same amount of space. |
|          ∞          |          1          | 1.34313 | 0.745 |            42.7%             | With infinite timelords tied with the fastest honest timelord on the network, the attacker gains a double-dip advantage.                                                                                                                                                                                                   |
|          1          |          2          |    1    |  0.5  |            33.3%             | If the attacker has one timelord that's twice as fast as the fastest honest timelord, the attacker must control half as much space as the rest of the network.                                                                                                                                                             |
|          ∞          |          2          | 1.4678  | 0.341 |            25.4%             | With infinite 2x timelords, the attacker gains the maximum double-dip advantage.                                                                                                                                                                                                                                           |

For attacks lasting longer than one epoch, `DD` will not exceed 1.34313. In such an attack, the final row from the preceding table will change to the following:

| Number of Timelords | VA (relative to VH) |   DD    |  SA   | 这个所需的空间从总网络空间的 46% 下降到大约 30%。 | Comment                                                                          |
|:-------------------:|:-------------------:|:-------:|:-----:|:-----------------------------:|:-------------------------------------------------------------------------------- |
|          ∞          |          2          | 1.34313 | 0.372 |             27.1%             | If the attack longer than one epoch, the double-dip advantage will be minimized. |

Note that if we continue to increase `VA`, `DD` will always remain at 1.4678 for the first table, and 1.34313 for the second table. The percent of netspace required will decrease linearly.

It is reasonable to assume that if a long-term attack were attempted, the attacker would have access to many timelords, but they wouldn't be significantly faster than the fastest honest timelord. 因此，46% 的假设应该用作远程攻击的基线。

The reason for receiving just a minor boost is because the alternative chains being tried are inferior and less likely to overtake the longest one. This has been analyzed in the [PoSAT paper](https://arxiv.org/abs/2010.08154).

## 扩展多个链

The actual amount of space required to perform this attack (for the attacker to get a heavier chain than the rest of the network combined) is 46.3%, due to the ability for an attacker to "try" different combinations of blocks, for example omitting or not omitting the first block.

由于平均有 32 个块具有相同的挑战，攻击者只能尝试大约 32 种不同的组合（找出要包含在挑战链中的块）。 尝试每一种方法所产生的指数分支将为攻击者提供小幅提升的空间。 例如，拥有 5 PiB 的人可以假装拥有 6 或 7 PiB。

仅获得小幅提升的原因是因为正在尝试的替代链较差并且不太可能超过最长的链。 [PoSAT 论文](https://arxiv.org/abs/2010.08154) 对此进行了分析。

如果每个区块都有新的空间挑战证明，攻击者可以将他们的空间乘以 e=2.718 的系数，其中只需要 27% 的空间就可以超越网络。 奇亚选择通过将每个子时隙的预期块数设置为 32 来缓解这种攻击向量。 这将攻击者所需的空间增加到 46%。

然而，奇亚也选择不将每个子时隙的块数增加到大于 32 的数量。 Doing so would decrease the time between blocks, which would allow a timelord that is only slightly faster than all others to orphan blocks more easily. However, Chia also chose not to increase the number of blocks per sub-slot to a number greater than 32. Doing so would decrease the time between blocks, which would allow a VDF that is only slightly faster than all others to orphan blocks more easily. As it stands, with 32 blocks per sub-slot, an attacker would need to have a significantly faster VDF than everyone else in order to successfully orphan any blocks.

Furthermore, the [PoSAT paper](https://arxiv.org/abs/2010.08154) shows that increasing the number of blocks per challenge increases security at a very slow rate, so increasing this number slightly does not provide much benefit.

如果攻击者要操纵难度，他们可以更改难度，以便每个时隙获得更少的奖励块。 然后他们可以包含或排除每个块，并同时以指数方式扩展所有链。 这将允许攻击者将他们的空间乘以一个小系数。 不清楚这次攻击是否收益很大，因为攻击者必须改变难度，这需要牺牲一些权重。 但是，为了防止这种攻击，要求必须至少创建 16 个奖励链块才能包含挑战块。 这使最坏情况下所需的攻击者空间从 27% 增加到 46%。

## 更快的 VDF 和 46% 的空间

有人担心，如果与硬盘制造商或大公司的可用可用空间相比，奇亚网络没有大量空间，那么它将容易受到 46% 的攻击。 因此，Chia 网络占用的空间越多，网络就越安全。

不过，我们认为这种类型的攻击不太可能发生。 拥有大量存储空间的大型数据中心和公司往往没有太多*未使用*的存储空间来存放奇亚图块。 进入奇亚网络的空间越多，每 TB 的奖励就越低。 由于网络空间目前（2021 年 12 月）为 35 EiB，公司将发现很难证明购买驱动器或删除业务数据的合理性。 此外，创建一个图需要固定数量的前期时间和金钱（根据目前的计算，k32 大约为 1kWh，或大约 10 美分，即每 TB 1 美元）。

最可能的长期情况是，每 TB 的奖励将足够低，以阻止人们和公司为了种植奇亚而购买新存储。 因此，未来的大部分新网络空间将来自使用过的存储，通常来自硬盘，否则将被送往垃圾填埋场。 这将有两个目的：防止此处布置的攻击，并保持奇亚绿色。

## Chia 空间/全球硬盘空间

This reduces the required space from 46% to approximately 30% of the total network space. `0.46/0.54 = 2x/(1-x). x=0.30`. If the attacker does not have access to the fastest VDF, they will not be able to get a space advantage beyond 46%.

Under normal operation, there are 32 blocks per slot.

Under the hypothetical 100% attack:

1. The difficulty would be artificially cut in half, temporarily allowing 64 blocks to be created per slot.
2. The difficulty would then be artificially increased by 4x, temporarily allowing 16 blocks per slot.
3. Repeat step 1.

这种攻击的结果是每个时隙平均创造 (64+16)/2 = 40 个区块奖励，奖励增加 25%。 这也是 Chia 选择根据区块数量触发难度调整的原因。 如果在当前系统下尝试这种攻击，它会减慢和加速网络，但不会产生任何额外的奖励。

## 100%攻击

Plotting usually takes a few minutes to a few hours, even on fast hardware, but it is parallelizable and getting faster.

在未来的某一天，拥有高端硬件的攻击者可以在标牌点发布后开始创建图块，并在融入点之前完成图块。 然后，攻击者可以在获得质量评级后（或在提交证明（如果符合条件）后删除该图）。 这将允许攻击者创建一个自动通过过滤器的图，有效地允许他们在不存储任何空间的情况下进行耕作。 仅当可以在不到 28 秒（融合前）内创建一个图块时，这种攻击才变得可行。

If we assume the worst-case scenario of a farmer being able to create a plot instantly, the question becomes, what is the cost and what is the benefit of the attack?

成本是创建地块所需的电力、内存、硬件和基础设施。 创建 k32 地块所需的电力目前约为 0.10 美元，即每 TB 约为 1 美元。

好处将与将该图存储 80 分钟（标牌点间隔乘以图过滤器常数）相同的好处。 这是因为攻击者总是可以创建一个通过绘图过滤器的绘图。 假设每年每 TB 价值 5 美元，80 分钟的 1TB 绘图的价值为 0.00094 美元。 因此，使用当前的绘图软件和硬件，与重新创建绘图相比，存储绘图要便宜得多。

另一种看待这种攻击的好处的方式：如果攻击者可以创建一个始终通过过滤器的图，则相当于在本地存储 512 个图。 存储 512 个图或运行此攻击哪个更便宜？

如果 1 TB 的 HDD 存储成本为 15 美元，那么购买足够的空间来存储 512 个地块的成本约为 750 美元。 如果考虑到运行农民的低端计算机，则该系统的总成本约为 1000 美元。 因此，重新绘制攻击仅在价值低于 1000 美元的系统上才具有经济可行性。 如果这种攻击成为可能，那么运行攻击的成本可能比存储图谱的成本至少高出一个数量级。 （请记住，存储的价格每年都在下降，因此攻击的好处在不断减少，即使其可行性正在增加。）

绘图过滤器常数对于减少农民必须执行的磁盘查找量非常有用。 使用 512 的地块过滤器，农民只需每 80 分钟读取约 7 次，而不是每 9 秒每地块读取 7 次磁盘。

绘图过滤器常数的缺点是它为攻击者提供了重新绘图好处的乘数，因此它不能设置得太高。 绘图过滤器常数为 512 时，1/512 绘图对每个挑战都有效。 然后攻击者只能创建通过过滤器的图，因此不需要创建其他 511/512ths。

将滤波器常数设置为 512 可提供 512 倍的乘数。 如果重新绘制攻击在经济上变得可行，一种缓解措施是减少过滤器，从而降低攻击的收益。 另一个缓解措施是增加最小地块大小，从而降低攻击的可行性。

In any case, this attack will not become feasible until at least 2026, given projected improvements in hardware speed.

## 短程重绘攻击

If the difficulty adjustment were triggered every X VDF slots, as opposed to every X blocks, this would allow for a 100% attack, where all farmers collude to constantly decrease or increase the difficulty.

如果攻击者没有达到总共 51% 的空间（通过 VDF 提升和扩展许多链如上），更快的 VDF 的有用性会大大降低。 这是因为块的包含和排除不取决于您执行 VDF 的速度，而是取决于它是否小于子时隙迭代。 此外，攻击者需要网络其余部分的空间才能前进，因此必须向网络释放挑战。

In certain cases where blocks come very close together, having a faster VDF can allow an attacker to orphan certain blocks, although this does not increase rewards in the short term (it would hurt others, but not benefit the attacker), and has a risk of undermining the network in the long term (orphaning blocks decreases public trust).

## 更快的 VDF（但不是 51% 攻击）

Selfish farming occurs when an attacker farms blocks in private, and only releases them when they are at risk of being surpassed by the honest chain.

In Nakamoto PoW this provides significant gains, because at any point at which the miner is ahead of the rest of the network, the rest of the network is wasting their hashpower on a chain that will not win.

在奇亚共识中，“自私”的农民可以在注入点之前扣留证据，但这与立即提交证据相比，收益为零。 每个标牌点可以有多个区块获胜者，因此农业不像工作量中那样是零和游戏。 此外，时间领主不能接受已经通过的融入点的证明，因此不允许农民堆叠大量的证明以供以后融合。

## 私下耕种

[PoSAT 白皮书](https://arxiv.org/abs/2010.08154)中探讨的一种有趣的攻击是贿赂攻击，这种攻击利用了当选“领导者”在每个时隙上的可预见性。 作者分析了权益证明链，并认为当参与者提前知道他们将获胜时，就存在潜在的贿赂攻击。

在奇亚中，如果参与者事先知道哪些情节会获胜，每个用户都可以通知攻击者他们愿意参与攻击。 如果参与者数量达到一定阈值，他们可以完全重新组织链（或孤立那些不参与的人，审查交易等）。 这种攻击不需要网络中的大部分空间参与；它只需要在很短的时间内达到一定的赢家门槛。 此外，它是不可检测的，因为攻击者可以制作一个看起来正常的链。

这个问题在奇亚共识算法的这个修订版中不存在。 这个问题是通过降低可预测性来解决的：在标牌点之前，每个农民都不确定他们的空间证明是否完全合格。 因此，攻击者必须贿赂大部分空间才能完成这次攻击。

## 农民贿赂树干攻击

Since blocks are signed by PoSpace keys, a farmer can theoretically sign multiple blocks with the same PoSpace, at the same height. The attack requires a malicious party to bribe farmers with a certain amount of funds for them to provide a signature of an alternate chain. It does not require the attacker to have a faster VDF. The attack requires a malicious party to bribe farmers with a certain amount of funds for them to provide a signature of an alternate chain. It does not require the attacker to have a faster timelord.

如果攻击者可以说服每个农民签署 N 个深度的区块，他们就可以恢复或重新排序这 N 个区块中的任何交易。 这种攻击需要 100% 的合规性，很可能来自不知情的参与者。 一旦这些参与者得知攻击，至少其中一些人可能会停止。 因此，这只是一次短期攻击。

这种攻击的一种潜在预防措施是使用欺诈证明。 但是，这些会启用其他攻击并使行为复杂化，因此未选择它们。

相反，解决方案只是等待更长时间。 在 32 个区块（大约 10 分钟）之后，我们可以做出一个合理的假设，即至少有一个农民遵守协议而不是双重签名。 如果 54% 是非串通的（假设 46% 的攻击弹性），则 32 个区块后逆转的概率为 `0.46^32`或`1.6*10^-11=0.000000000016`。 此外，这种攻击是可检测的，因此不容易实现。

每个用户可以选择他们自己的阈值，他们接受一个交易/块作为最终的阈值。 例如，在总网络空间突然下降的情况下，用户可以更加小心，不要将交易视为最终交易，以防存在另一个现有分叉，例如由于网络分裂。

## 农民贿赂树叶重组攻击

交易区块与非交易区块不同，因为它们包含交易费用。 这些可能会超过区块奖励。 例如，以太坊已经创建了一些区块，奖励为 2 eth，费用为 8 eth。 （[EIP 1559](https://eips.ethereum.org/EIPS/eip-1559) 显着改变了计算，所以这只是其他链中可能发生的历史例子。）

在奇亚中，这会更加极端，因为并非每个区块都包含交易。 这会导致攻击，其中第二名农民忽略第一名试图赢得交易块。 如果第 2 个块在第 1 个之后不到 28 秒出现，则它们不指定前一个块，因此第 2 个块不能孤立第 1 个块。 第 3 名可能成为孤块，但没有人会遵循这条链，因为它更短。

然而，如果在第一个区块的 28 秒内没有区块，第二个可以孤立第一个，但他们必须说服下一个区块在他们的备用链上耕种。 如果攻击者同时控制了第 2 个和第 3 个，则更容易进行攻击，在这种情况下，他们可以忽略第一个并且仍然更长。 这些孤块攻击不允许攻击者窃取奖励，而是允许攻击者稍微降低难度。 由于它们是非常情境化的并且需要大量空间，因此尝试这种攻击对网络的伤害可能超过攻击者的潜在收益。

## 交易费用的孤立交易块

在奇亚共识中，两个相互竞争的区块可以同时被并行包含在区块链中，彼此不知道（尽管最多一个可以是一个交易区块）。 当同时包含多个区块时，结果是一个权重更高的链。 这意味着假设低网络延迟，Chia 中的孤块率将基本上为零。 如果网络延迟超过注入延迟（30-40 秒），那么几乎可以保证块的孤立，因此它更像是一个阶跃函数。 这与中本聪工作量证明形成对比，在中本聪工作量证明中，如果存在网络延迟，孤块率就会很高，随着网络状况的改善而平滑下降，但从未达到零。
