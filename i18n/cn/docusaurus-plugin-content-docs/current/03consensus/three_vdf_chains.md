---
sidebar_position: 8
---

# 3.8 三个VDF链

> Three VDF Chains

如果我们只使用一个 VDF（用于奖励链），则包含或排除块将允许控制下一个插槽的挑战。这意味着攻击者可以尝试多种不同的块组合，并选择最适合他们的挑战，以便在下一个插槽中获得更多胜利。这些类型的攻击被称为研磨攻击，它们是从工作量证明转变为空间证明或 PoStake 的主要困难之一。“攻击和对策”部分提供了更多详细信息。

为了缓解这种情况，挑战将仅基于要注入插槽的第一个块。

<figure>

![](/img/multiple_chains.png)

<figcaption>
图 8：三个 VDF 链。攻击者可以操纵奖励链的结果，但这对 c2 没有影响，因此对 PoSpace 彩票也没有影响。cc = 挑战链，rc = 奖励链，sp = 标牌点。B=块。
</figcaption>
</figure>

这张图中发生了很多事情。首先，如您所见，有**4个块**：B1、B2、B3、B4，这些是农民创建的块，其中包含他们指向的所有数据。我们假设在该子槽中至少创建了 16 个块，但由于空间限制我们没有绘制所有块。

此外，挑战链和奖励链都创建了 64 个标牌点，由时间领主每 9.4 秒发布一次。区块必须包含两条链的标牌点 VDF。区块还必须包括所有三个链的注入点 VDF。

如您所见，挑战链从子槽的开始到结束执行 VDF，没有注入任何内容（圆圈是 VDF 证明，但它们不会中断 VDF）。即在挑战链中，“抽奖”是完全预先确定的，不受槽中区块的影响，直到槽结束。奖励链注入包含的每个块。中间的链称为**注入挑战链**，它从每个挑战的第一个注入块开始，一直持续到槽结束。

<details>
<summary>原文参考</summary>

If we only used one VDF (for the reward chain), the inclusion or exclusion of blocks would allow control of the challenge for the next slot.
This means that an attacker could try many different combinations of blocks, and choose the challenge that suits them best, to obtain more wins in the next slot.
These types of attacks are called grinding attacks, and they are one of the main difficulties of changing from Proof of Work to Proof of Space or PoStake.
More detail is provided in the “Attacks and countermeasures” section. 

To mitigate this, the challenges will be based only on the first block to be infused in a slot.

<figure>

![](/img/multiple_chains.png)

<figcaption>
Figure 8: three VDF chains. An attacker can manipulate the reward chain results but this has no effect on c2, and therefore has no effect on the PoSpace lottery. cc = challenge chain, rc=reward chain, sp=signage point. B=block.
</figcaption>
</figure>


There is a lot going on in this diagram. First of all, as you can see, there are 4 **blocks**: B1, B2, B3, B4, these are blocks created by the farmers, which contain all the data that they point to.
We assume that at least 16 blocks have been created in that sub-slot, but we don’t draw all of them due to space constraints.

Also, both the challenge chain and reward chain create 64 signage points, released ever 9.4 seconds by timelords.
Blocks must include the signage point VDFs for both chains. Blocks must also include the infusion point VDFs for all three chains. 

As you can see, the challenge chain executes the VDF from the start of the sub-slot to the end with nothing infused into it (the circles are VDF proofs but they do not interrupt the VDF).
That is, in the challenge chain, the "lottery" is completely pre-determined, and not affected by blocks in the slot, until the end of the slot.
The reward chain infuses every block that is included. 
The chain in the middle is called the **infused challenge chain**, and it starts at the first infused block for each challenge, and goes on until the end of the slot. 

</details>


**一个槽**是包含至少 16 个奖励链块的子槽列表，基于第一个子槽或后面的子槽的挑战。例如，我们可能在一个子槽中只有 10 个块，然后是 3 个，然后是 7 个，这意味着这三个子槽构成一个槽。通常每个子槽也是一个槽，因为平均包含 16 个以上的块。**不足之处**是结束时隙仍需要的块数：稍后将对此进行更详细的描述。

在时隙的末尾，挑战链与注入的挑战链结合生成新的挑战 c2，用于启动下一个子时隙的挑战链。

唯一影响挑战链（因此影响 pospace 彩票）的区块是插槽中的第一个区块，这里是 B1，并且只有 B1 的确定性部分，cc B1，它仅取决于挑战链数据。想要碾压的攻击者不能通过保留 B2、B3 或除第一个块之外的任何其他块来改变挑战。

假设攻击者拥有第一个区块 (B1)，他们有三种选择：保留、延迟或释放。为了知道新的挑战是否会让他们受益，他们需要一直执行 VDF 直到 c2。到那时，他们被纳入奖励链的机会已经消失，因为诚实的农民每个空间证明只签署一个区块。保留 B1 不会给攻击者带来太多好处，因为他们必须在 sp2 之前释放它才能让农民加入他们的链。农民将选择最重的链，即具有最多（最重）奖励链块的链。

为什么我们要承诺挑战链中的任何区块？好吧，如果我们不这样做，攻击者可以使用更快的 VDF 来展望未来，因为他们不需要诚实参与者的帮助来计算未来的挑战链。挑战链将是完全确定的。这将通过重新绘制获得一些优势。此外，挑战链可用于向轻客户端概率证明奖励链的权重，而无需共享所有奖励链区块（因为挑战链取决于插槽中的“最佳”区块，您可以计算奖励数量链块）。

要使一个区块被认为是有效的，它必须为挑战链和奖励链提供 VDF，如果存在的话，还可以选择为注入的挑战链提供 VDF。强制包含所有 VDF 意味着所有三个链都保证以相同的速度前进。

<details>
<summary>原文参考</summary>

A **slot** is the list of sub-slots which contain at least 16 reward-chain blocks based on the challenge of the first sub-slot, or later sub-slots.
For example, we may have only 10 blocks in a sub-slot, and then 3 and then 7, which means those three sub-slots form one slot. Usually each sub-slot is also a slot, since more than 16 blocks are included on average. The **deficit** is the number of blocks still necessary to end the slot: this is described later in more detail.

At the end of the slot, the challenge chain is combined with the infused challenge chain to generate the new challenge c2, which is used to start the challenge chain for the next sub-slot. 

The only block which affects the challenge chain (and thus the pospace lottery) is the first block in the slot, which here is B1, and only a deterministic part of B1, cc B1, which only depends on challenge chain data.
An attacker who wants to grind cannot change the challenge by withholding B2, B3, or any other block apart from the first one. 

Assuming the attacker has the first block (B1), they have three options: withhold it, delay it, or release it. In order to know whether the new challenge will benefit them, they will need to execute the VDF all the way up to c2. By that time, their chance to get included in the reward chain is gone, since honest farmers sign only one block per proof of space. Withholding B1 does not provide much benefit to the attacker, since they must release it before sp2 in order to get the farmers on their chain. Farmers will choose the heaviest chain, which is the one with the most (heaviest) reward chain blocks.

Why do we commit to any blocks at all in the challenge chain? Well, if we did not, an attacker could look ahead with a faster VDF, since they would not need the help of honest participants in order to compute the challenge chain into the future. The challenge chain would be totally deterministic. This would enable some advantage by replotting. Furthermore, the challenge chain can be used to probabilistically prove the weight of the reward chain to light clients, without sharing all reward chain blocks (since the challenge chain depends on the “best” block in the slot, you can calculate the number of reward chain blocks).

For a block to be considered valid, it has to provide VDFs for the challenge chain and reward chain, and optionally for the infused challenge chain if it is present. Forcing all VDFs to be included means that all three chains are guaranteed to move forward at the same rate.

</details>


## 定义

**挑战链**：VDF 链基于每个子槽的每个挑战，在每个子槽中间不注入任何东西。这些挑战也用于空间证明。此链中的标志点用于 SP 过滤器。

**奖励链**：包含所有区块注入的 VDF 链。该链在每个子槽的末尾拉入挑战链和可选的注入挑战链。

**注入挑战链**：一条 VDF 链，从注入槽中的第一个块开始（不基于前一个槽的挑战，这称为挑战块）并在槽的末尾结束。这通过防止 VDF 前瞻攻击来提高安全性。

**Slot**：基于第一个子槽或后面的子槽的挑战，包含至少 16 个奖励链块的子槽列表。在槽的末尾，注入的挑战链停止，挑战链拉入注入的挑战链的结果，并且赤字重置为16。

**块**：块是注入奖励链的数据集合，其中包含：挑战哈希的空间证明，其迭代次数少于槽迭代，两条链的 sp 和 ip VDF，注入挑战链的可选 ip VDF，和奖励地址。有些区块也是交易区块。每个插槽最多有 128 个块。

**交易区块**：有资格创建交易的区块，以及相关的交易列表。

**挑战块**：每个槽中要注入的第一个块，它不是基于前一个槽的挑战。挑战块总是有 15 个赤字，并且总是从注入的挑战链开始。

**峰值**：节点看到的区块链的峰值是权重最大的块。重量是一个区块及其所有祖先的难度之和，与高度相似，但由于难度调整，较短的链可能具有更重的重量。


<details>
<summary>原文参考</summary>

- ## Definitions

**Challenge chain**: The VDF chain based on each challenge for each sub-slot, which does not infuse anything in the middle of each sub-slot. The challenges are also used for the proofs of space. The signage points in this chain are used for the SP filter.

**Reward chain**: The VDF chain that contains infusions of all blocks. This chain pulls in the challenge chain and optionally the infused challenge chain at the end of each sub-slot.

**Infused challenge chain**: A VDF chain which starts at the first block infused in a slot (which is not based on the previous slot’s challenge, this is called the challenge block) and ends at the end of the slot. 
This increases security by preventing VDF lookahead attacks.

**Slot**: the list of sub-slots which contain at least 16 reward-chain blocks based on the challenge of the first sub-slot, or later sub-slots. At the end of the slot, the infused challenge chain stops, the challenge chain pulls in the result of the infused challenge chain, and the deficit is reset to 16.

**Block**: a block is a collection of data infused into the rewards chain which contains: a proof of space for a challenge hash with less iterations than the slot iterations, sp and ip VDFs for both chains, optional ip VDF for the infused challenge chain, and a rewards address. Some blocks are also transaction blocks. There is a maximum of 128 blocks per slot.

**Transaction Block**: A block that is eligible to create transactions, along with an associated list of transactions.

**Challenge block**: The first block to be infused in each slot, which is not based on a previous slot's challenge. The challenge block always has a deficit of 15, and always starts off the infused challenge chain. 

**Peak**: The peak of the blockchain as seen by a node is the block with the greatest weight. Weight is the sum of the difficulty of a block and all its ancestors, which is similar to height, but a shorter chain can have heavier weight, due to difficulty adjustments.

</details>
