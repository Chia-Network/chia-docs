---
sidebar_position: 8
---

# 3.8 三个 VDF 链

> Three VDF Chains

如果我们只使用一个 VDF（用于奖励链），则包含或排除区块将允许控制下一个时隙的挑战。这意味着攻击者可以尝试多种不同的区块组合，并选择最适合他们的挑战，以便在下一个时隙中获得更多胜利。

这些类型的攻击被称为权利压迫攻击，它们是从工作量证明转变为空间证明或权益证明的主要困难之一。[第 3.14 节](/consensus/attacks_and_countermeasures 'Section 3.14: Relevant Attacks and Countermeasures')提供了更多详细信息。

为了缓解这种情况，挑战将仅基于融入时隙的第一个区块。

<figure>

![](/img/multiple_chains.png)

<figcaption>
图 8：1+ 挑战的三个 VDF 链。

cc = 挑战链，ic = 融合挑战链，rc = 奖励链，

sp = 标牌点，B = 块，c = 挑战，r = 奖励

攻击者可以操纵奖励链的结果，但这对 c2 没有影响，因此对空间证明彩票也没有影响。

</figcaption>
</figure>

这张图中发生了很多事情！让我们分解一下。

有 4 个**区块**：B1、B2、B3 和 B4。农民创建这些区块。块有指针（箭头），指针指向的数据都包含在块本身中。在图表的子时隙中至少创建了 16 个块，但由于空间限制我们没有绘制所有区块。

挑战链和奖励链各创建 64 个标牌点，由时间领主每 9.375 秒（平均）释放一次。街区必须包括两条链的标牌点 VDF（标记标牌点）。

时间领主将他们的 VDF 输出发送到他们的完整节点，然后将其添加到子时隙束末端中。这个包包括每个链的输出（例如图中的 c1、ic1 和 r1）。捆绑包传播到所有其他完整节点。区块还必须包括所有三个链的注入点 VDF。

挑战链广播挑战（c1 和 c2）。同一个链也从子时隙的开始到结束执行 VDF，没有注入任何内容（圆圈是 VDF 证明，但它们不会中断 VDF）。即在挑战链中，"抽奖"是完全预先确定的，不受时隙中区块的影响，直到时隙结束。

奖励链融入包含的每个块。

中间的链称为**融合挑战链**。它从每个挑战的第一个融入块开始，一直持续到时隙结束。

<details>
<summary>原文参考</summary>

If we only used one VDF (for the reward chain), the inclusion or exclusion of blocks would allow control of the challenge for the next slot.This means that an attacker could try many different combinations of blocks, and choose the challenge that suits them best, to obtain more wins in the next slot.

These types of attacks are called grinding attacks, and they are one of the main difficulties of changing from Proof of Work to Proof of Space or PoStake.More detail is provided in [Section 3.14](/consensus/attacks_and_countermeasures 'Section 3.14: Relevant Attacks and Countermeasures').

To mitigate this, the challenges will be based only on the first block to be infused in a slot.

<figure>

![](/img/multiple_chains.png)

<figcaption>
Figure 8: The three VDF chains for 1+ challenges.

cc = challenge chain, ic = infused challenge chain, rc = reward chain,

sp = signage point, B = block, c = challenge, r = reward

An attacker can manipulate the reward chain results but this has no effect on c2, and therefore has no effect on the PoSpace lottery.

</figcaption>
</figure>

There is a lot going on in this diagram! Let's break it down.

There are 4 **blocks**: B1, B2, B3, and B4. Farmers create these blocks. The blocks have pointers (the arrows), and the data the pointers are pointing to is all contained within the blocks themselves. At least 16 blocks have been created in the diagram's sub-slot, but we don’t draw all of them due to space constraints.

The challenge chain and the reward chain each create 64 signage points, released every 9.375 seconds (on average) by timelords. Blocks must include the signage point VDFs (which mark the signage points) for both chains.

The timelords send their VDF output to their full node, which adds it into an EndOfSubSlotBundle. This bundle includes the output from each chain (for example c1, ic1, and r1 in the diagram). The bundle is propagated to all other full nodes. Blocks must also include the infusion point VDFs for all three chains.

The challenge chain broadcasts the challenges (c1 and c2). The same chain also executes the VDF from the start of the sub-slot to the end with nothing infused into it (the circles are VDF proofs but they do not interrupt the VDF). That is, in the challenge chain, the "lottery" is completely pre-determined, and not affected by blocks in the slot, until the end of the slot.

The reward chain infuses every block that is included.

The chain in the middle is called the **infused challenge chain**. It starts at the first infused block for each challenge, and goes on until the end of the slot.

</details>

回想一下，一个**时隙**必须至少有 16 个奖励链块。子时隙没有最小块数（尽管它的目标是 32 个块）。相反，子时隙总是在达到子时隙迭代时结束（目标是需要 10 分钟）。

因为一个子时隙的目标是生产 16 个以上的块，一个时隙通常只需要一个子时隙来满足其最小块要求，但情况并非总是如此。例如，我们可能在一个子时隙中只有 10 个块，然后是 3 个，然后是 7 个，这意味着这三个子时隙构成一个时隙。**赤字**是结束时隙仍然需要的块数：这在 [第 3.9 节](/consensus/overflow_blocks#minimum-block-requirement 'Section 3.9: Overflow Blocks and Weight')。

在时隙的末尾，挑战链与融合挑战链结合生成新的挑战 c2，用于启动下一个子时隙的挑战链。

唯一影响挑战链（以及 PoSpace 彩票）的区块是时隙中的第一个区块，这里是 B1。实际上，它只是 B1 的一个确定性部分，称为"cc B1"，仅取决于挑战链数据。想要碾压的攻击者不能通过保留 B2、B3 或除第一个块之外的任何其他块来改变挑战。

持有第一个区块（B1）的诚实农民将释放它。如果攻击者控制了第一个块 (B1)，他们有两个额外的选择：延迟它或保留它。

- 延迟：为了知道新挑战是否对他们有利，他们需要一直执行 VDF 直到 c2。到那时，他们被纳入奖励链的机会已经消失，因为诚实的农民每个空间证明只签署一个区块。
- 保留它：这不会给攻击者带来太多好处，因为他们必须在 sp2 之前释放它才能让农民进入他们的链。农民将选择最重的链，即具有最多（最重）奖励链块的链。

为什么我们要承诺挑战链中的任何区块？如果我们不这样做，拥有更快 VDF 的攻击者可以向前看，因为他们不需要诚实参与者的帮助来计算未来的挑战链。挑战链将是完全确定的。这将通过重新绘制获得一些优势。此外，挑战链可用于向轻客户端概率证明奖励链的权重，而无需共享所有奖励链区块（因为挑战链取决于插槽中的"最佳"区块，您可以计算奖励数量链块）。

要使一个区块被认为是有效的，它必须为挑战链和奖励链提供 VDF，如果存在的话，还可以选择为融合挑战链提供 VDF。强制包含所有 VDF 意味着所有三个链都保证以相同的速度前进。

<details>
<summary>原文参考</summary>

Recall that a **slot** must have at least 16 reward-chain blocks. A sub-slot doesn't have a minimum number of blocks (though it targets 32 blocks). Instead, a sub-slot always ends when sub-slot_iterations has been reached (this is targeted to take 10 minutes).

Because a sub-slot is targeted to produce more than 16 blocks, a slot usually only needs one sub-slot to meet its minimum-block requirement, but that is not always the case. For example, we may have only 10 blocks in a sub-slot, and then 3 and then 7, which means those three sub-slots form one slot. The **deficit** is the number of blocks still necessary to end the slot: this is described in more detail in [Section 3.9](/consensus/overflow_blocks#minimum-block-requirement 'Section 3.9: Overflow Blocks and Weight').

At the end of the slot, the challenge chain is combined with the infused challenge chain to generate the new challenge c2, which is used to start the challenge chain for the next sub-slot.

The only block which affects the challenge chain (and thus the PoSpace lottery) is the first block in the slot, which here is B1. In fact, it's only a deterministic part of B1 called "cc B1", which only depends on challenge chain data. An attacker who wants to grind cannot change the challenge by withholding B2, B3, or any other block apart from the first one.

An honest farmer who holds the first block (B1) will release it. If an attacker controls the first block (B1), they have two additional options: delay it or withhold it.

- Delay it: In order to know whether the new challenge will benefit them, they will need to execute the VDF all the way up to c2. By that time, their chance to get included in the reward chain is gone, since honest farmers sign only one block per proof of space.
- Withhold it: This does not provide much benefit to the attacker, since they must release it before sp2 in order to get the farmers on their chain. Farmers will choose the heaviest chain, which is the one with the most (heaviest) reward chain blocks.

Why do we commit to any blocks at all in the challenge chain? If we did not, an attacker with a faster VDF could look ahead, since they would not need the help of honest participants in order to compute the challenge chain into the future. The challenge chain would be totally deterministic. This would enable some advantage by replotting. Furthermore, the challenge chain can be used to probabilistically prove the weight of the reward chain to light clients, without sharing all reward chain blocks (since the challenge chain depends on the "best" block in the slot, you can calculate the number of reward chain blocks).

For a block to be considered valid, it has to provide VDFs for the challenge chain and reward chain, and optionally for the infused challenge chain if it is present. Forcing all VDFs to be included means that all three chains are guaranteed to move forward at the same rate.

</details>

## 定义

**挑战链**：VDF 链基于每个子时隙的每个挑战，在每个子时隙中间不注入任何东西。这些挑战也用于空间证明。此链中的标牌点用于标牌点过滤器。

**奖励链**：包含所有区块融入的 VDF 链。该链在每个子时隙的末尾拉入挑战链和可选的融入挑战链。

**融合挑战链**：一条 VDF 链，从融入时隙中的第一个块开始（不基于前一个时隙的挑战，这称为挑战区块）并在时隙的末尾结束。这通过防止 VDF 前瞻攻击来提高安全性。

**子时隙**：时间领主必须运行 VDF 的一段时间。时间领主必须执行的计算次数 (子时隙迭代次数) 来完成子时隙会定期（并自动）调整，大约需要 10 分钟。在此期间，将释放 64 个标牌点，全网将平均提交 32 个有效空间证明。

**时隙**：一个或多个子时隙。要记住的重要一点是，一个时隙至少需要 16 个奖励链块。如果这些块不是在第一个子时隙中产生的，那么在同一个时隙中将需要另一个子时隙。在时隙的末尾，融合挑战链停止，挑战链拉入融入的挑战链的结果，并且赤字重置为 16。

**区块**：区块是注入奖励链的数据集合，其中包含：挑战哈希的空间证明，其迭代次数少于时隙迭代次数，两个链的标牌点和融入点 VDF，可选的注入点融合挑战链的 VDF 和奖励地址。有些区块也是交易区块。每个时隙最多有 128 个块。

**交易区块**：有资格创建交易的区块，以及相关的交易列表。

**挑战块**：每个时隙中注入的第一个块，不基于前一个时隙的挑战。挑战块总是有 15 个赤字，并且总是从融合挑战链开始。

**峰值**：节点看到的区块链峰值是权重最大的区块。重量是一个区块及其所有祖先的难度之和，与高度相似，但由于难度调整，较短的链可能具有更重的重量。

<details>
<summary>原文参考</summary>

- ## Definitions

**Challenge chain**: The VDF chain based on each challenge for each sub-slot, which does not infuse anything in the middle of each sub-slot. The challenges are also used for the proofs of space. The signage points in this chain are used for the SP filter.

**Reward chain**: The VDF chain that contains infusions of all blocks. This chain pulls in the challenge chain and optionally the infused challenge chain at the end of each sub-slot.

**Infused challenge chain**: A VDF chain which starts at the first block infused in a slot (which is not based on the previous slot’s challenge, this is called the challenge block) and ends at the end of the slot.
This increases security by preventing VDF lookahead attacks.

**Sub-slot**: a period of time for which a timelord must run a VDF. The number of calculations the timelord must perform (sub-slot_iterations) to complete the sub-slot are adjusted periodically (and automatically) to take around 10 minutes. During this time, 64 signage points will be released and the entire network will submit an average of 32 valid proofs of space.

**Slot**: one or more sub-slots. The important thing to remember is that a slot requires at least 16 reward-chain blocks. If these blocks are not produced in the first sub-slot, then another sub-slot will be required within the same slot. At the end of the slot, the infused challenge chain stops, the challenge chain pulls in the result of the infused challenge chain, and the deficit is reset to 16.

**Block**: a block is a collection of data infused into the rewards chain which contains: a proof of space for a challenge hash with fewer iterations than the slot iterations, signage point and infusion point VDFs for both chains, optional infusion point VDF for the infused challenge chain, and a rewards address. Some blocks are also transaction blocks. There is a maximum of 128 blocks per slot.

**Transaction Block**: A block that is eligible to create transactions, along with an associated list of transactions.

**Challenge block**: The first block to be infused in each slot, which is not based on a previous slot's challenge. The challenge block always has a deficit of 15, and always starts off the infused challenge chain.

**Peak**: The peak of the blockchain as seen by a node is the block with the greatest weight. Weight is the sum of the difficulty of a block and all its ancestors, which is similar to height, but a shorter chain can have heavier weight, due to difficulty adjustments.

</details>
