---
sidebar_position: 9
---

# 3.9 溢出块和权重

> Overflow Blocks and Weight

## 溢出块

对于创建区块的农民来说，他们的所需迭代次数必须小于子时隙迭代次数 / 64，如[第 3.5 节](/docs/03consensus/signage_points_and_infusion_points 'Section 3.5: Signage Points and Infusion Points')中所述。 这意味着融合迭代次数可能大于子时隙迭代次数，因此融合必须发生在下一个子时隙中。

**溢出块**：融入点与其标牌点位于不同子时隙中的块。

**当前时隙挑战**：任何给定块的当前时隙挑战包括所有挑战从时隙中的第一个挑战开始，并在时隙的末尾结束（不包括在内）。这是相关的，因为有时一个时隙跨越多个子时隙，因此存在多个挑战。

<figure>

![](/img/overflow.png)

<figcaption>
图 9：该图中的 B4 是一个溢出块，因为注入位于下一个子时隙中。B4 不是基于当前时隙挑战，因此不会减少赤字或制造挑战块。
</figcaption>
</figure>

溢出块不能存在于纪元的第一个子时隙中（因为子时隙迭代发生变化）。

此外，溢出块不会改变赤字，除非它们基于当前时隙质询，因为溢出块是对前一个子时隙质询的响应。溢出块不是挑战块，除非它们基于当前时隙挑战。请注意，溢出块很少会减少赤字，因为赤字几乎总是减少到零，并且每个子时隙都会开始一个新的时隙。

<details>
<summary>原文参考</summary>

- ## Overflow Blocks

For a farmer to create a block, their required_iterations must be less than sub-slot_iterations / 64, as described in [Section 3.5](/docs/03consensus/signage_points_and_infusion_points 'Section 3.5: Signage Points and Infusion Points'). This means that infusion_iterations might be greater than the sub-slot_iterations, and therefore the infusion must happen in the next sub-slot.

**Overflow block**: a block whose infusion point is in a different sub-slot than its signage point.

**Current-slot challenge**: Any given block's current-slot challenges include all
challenges starting at the first challenge in the slot, and ending at the end of the slot (non-inclusive).
This is relevant because sometimes a slot spans multiple sub-slots, and thus multiple challenges.

<figure>

![](/img/overflow.png)

<figcaption>
Figure 9: B4 in this diagram is an overflow block, since the infusion is in the next sub-slot.
B4 is not based on a current-slot challenge, and thus does not decrease the deficit or make a challenge block.
</figcaption>
</figure>

Overflow blocks cannot exist in the first sub-slot of the epoch (since the sub-slot iterations change).

Also, overflow blocks do not change the deficit unless they are based on a current-slot challenge, since overflow blocks are responses to the previous sub-slot’s challenge. Overflow blocks are not challenge blocks unless they are based on a current-slot challenge. Note that it is rare for overflow blocks to decrease the deficit, since the deficit will almost always be decreased to zero, and a new slot will be started on every sub-slot.

</details>

## 最低区块要求

必须至少将 16 个当前时隙挑战块融合奖励链才能完成一个时隙。（回想一下子时隙没有这样的要求，所以一个时隙可以跨越多个子时隙。）

赤字是一个介于 0 和 16 之间的数字，它出现在子时隙的开始处，并且存在于每个完成的块中。这被定义为我们需要融合以完成一个时隙的奖励链块的数量。每当我们启动一个时隙时，它都会重置为 16（因此每个挑战链注入必须至少有 16 个总块）。每个基于当前时隙挑战的奖励链融入的赤字都会下降。

赤字为 15 的区块是挑战区块。

正常情况是赤字从 16 开始，然后在子时隙内下降到零，并在我们完成时隙并开始新的时隙时重置回 16。如果我们没有设法在子时隙末尾将其减少到 0，挑战链和融合挑战链（如果存在）继续，并且赤字不会重置为 16。区块（包括溢出块）现在），继续从赤字中减去，直到我们达到 0。当我们完成一个零赤字的子时隙时，融合挑战链被纳入挑战链，赤字重置为 16。

添加此要求是为了阻止远程攻击，并在[第 3.14 节](/docs/03consensus/attacks_and_countermeasures#51-46-attack 'Section 3.14: Attacks and Countermeasures')中进行了详细描述。绝大多数子时隙将有 16 个以上的块（回想一下，平均目标数为 32），因此最小块要求不会对正常操作产生太大影响。

<figure>

![](/img/deficit.png)

<figcaption>
图 10：c2 是子时隙的末端，但不是时隙的末端。c2 不指向 ic2，因为时隙没有在这个子时隙结束。赤字是 3 而不是重置为 16，并且融入的挑战链继续。
</figcaption>
</figure>

<details>
<summary>原文参考</summary>

- ## Minimum Block Requirement

A minimum of 16 current-slot challenge blocks must be infused into the rewards chain in order for a slot to be finished. (Recall that a sub-slot has no such requirement, so a slot could span multiple sub-slots.)

The deficit is a number between 0 and 16 that is present at the start of a sub-slot, and is present for each finished block. This is defined as the number of reward chain blocks that we need to infuse in order to finish a slot. It is reset to 16 whenever we start a slot (so there must be at least 16 total blocks per challenge chain infusion). The deficit goes down for each reward chain infusion that is based on a current-slot challenge.

The block with deficit 15 is a challenge block.

The normal case is where the deficit starts at 16, and goes down to zero within the sub-slot, and resets back to 16 as we finish the slot and start a new one. In the case that we don't manage to reduce it to 0 within the end of the sub-slot, the challenge chain and infused challenge chain (if present) continue, and the deficit does not reset to 16. Blocks (including overflow blocks now), keep subtracting from the deficit until we reach 0. When we finish a sub-slot with a zero deficit, the infused challenge chain is included into the challenge chain, and the deficit is reset to 16.

This requirement was added to discourage long-range attacks, and is described in detail in [Section 3.14](/docs/03consensus/attacks_and_countermeasures#51-46-attack 'Section 3.14: Attacks and Countermeasures'). The vast majority of sub-slots will have more than 16 blocks (recall that the average number is targeted to be 32), therefore the minimum-block requirement will not have much of an affect on normal operation.

<figure>

![](/img/deficit.png)

<figcaption>
Figure 10: c2 is the end of the sub-slot but not the end of the slot. c2 does NOT point to ic2, since the slot did not end at this sub-slot.
Deficit is 3 instead of resetting to 16, and the infused challenge chain continues.
</figcaption>
</figure>

</details>

## 权重

一个区块的**权重**是这个区块的难度加上所有作为这个区块祖先的先前区块的总和。诚实的全节点必须选择区块链的峰值，使得峰值是他们知道的权重最大的块。这是一个至关重要的要求，与比特币的最重链规则相同。由于这条规则，拥有不到 50% 空间且没有 VDF 优势的攻击者将难以获得超过其公平份额的收益，因为他们必须幸运并创建比诚实链更多的奖励链块。此外，农民只应对与最重链相对应的挑战。

VDF 速度和总空间量对权重都很重要，这些变化可以触发难度调整。如果空间量增加，每个时隙将创建超过 32 个块，因此必须增加难度。如果网络 VDF 速度增加，每 10 分钟创建超过 32 个块，因此必须增加难度（和子时隙迭代）。

但是，与拥有正常速度 VDF 的农民相比，拥有专属访问速度稍快 VDF 的农民无法轻松获得更多奖励。如果攻击者试图孤立链上的一个块，拥有更快的 VDF 将无济于事，因为攻击者的链将拥有更少的块（因此权重较低）。农民必须签署他们正在建造的区块，他们只会在最高权重的链上建造。

然而，当攻击者希望发起 51% 的攻击时，VDF 速度就会发挥作用。在这种情况下，攻击者可以使用 VDF 创建一个完全替代的链，没有诚实的区块，并超越诚实的链。这需要略少于 51% 的空间，因为更快的 VDF 链可以获得比诚实链更快的权重。

<details>
<summary>原文参考</summary>

- ## Weight

The **weight** of a block is the sum of the difficulty of this block, plus all previous blocks that are ancestors of this block. Honest full nodes must choose the peak of the blockchain such that the peak is the block with the heaviest weight that they know of. This is a crucial requirement, and is identical to Bitcoin’s heaviest chain rule. Due to this rule, an attacker with less than 50% of the space and no VDF advantage will have trouble earning more than their fair share, since they must get lucky and create more reward chain blocks than the honest chain. Furthermore, farmers only farm on the challenges that correspond to the heaviest chain.

Both VDF speed and total amount of space are important for weight, and changes in these can trigger difficulty adjustments. If the amount of space increases, more than 32 blocks per slot will be created, so the difficulty has to be increased. If the network VDF speed increases, more than 32 blocks are created every 10 minutes, and thus the difficulty (and the sub-slot iterations) has to be increased.

A farmer with exclusive access to a slightly faster VDF, however, cannot easily get more rewards than a farmer with the normal speed VDF. If an attacker tries to orphan one of the blocks on the chain, having a faster VDF will not help, since the attacker’s chain will have less blocks (and thus a lower weight). Farmers must sign the block which they are building on top of, and they will only build on top of the highest weight chain.

The VDF speed comes into play when the attacker wishes to launch a 51% attack, however. In this case, an attacking farmer can use the VDF to create a completely alternate chain with no honest blocks, and overtake the honest chain.This requires slightly less than 51% of the space, since the faster VDF chain can obtain weight at a faster rate than the honest chain.

</details>
