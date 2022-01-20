---
sidebar_position: 7
---

# 3.7 多块

> Multiple Blocks

<figure>

![](/img/multiple_blocks.png)

<figcaption>
图 7：多个块。Sp1 = 标牌点 1
</figcaption>
</figure>

正如您在图 7 中看到的，多个块可以被注入到同一个子槽中。 Chia 的系统平均每 18.75 秒定位一个区块（每个子槽 32 个区块），并且通过工作难度算法每 4608 个区块（大约 24 小时）调整一次。

VDF 校样范围：
* 从当前标牌点之前的前一个输液点到当前标牌点，以及
* 从上一个输液点到当前输液点。
这意味着每个块所需的 VDF 证明可以重叠。

在图 7 的示例中，B2 包含从 B1 到 sp2 以及从 B1 到 B2 的 VDF 证明。 B3 包含从 B1 到 sp3，以及从 B2 到 B3 的证明。 B2完全不依赖B3，但B3依赖B2，因为它的 VDF 来自 B2 的注入点。

如 [第 3.5 节](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points")中所述，块是在标牌点创建的，但它们缺少注入点 VDF。添加此 VDF 后，该块就完成了，并构成了区块链的一部分。

签名由农民在标志点创建和添加，然后广播到整个网络。
输液点没有签名；在注入点添加的唯一东西是 VDF。

最后，请注意，同一个标牌点可以有多个获胜者，所有获胜者都可以包含在区块链中。如果`sp2 == sp3`，图中就是这种情况。最先包含的那个是具有较低“required_iters”的那个，因此注入点更早。

您可能想知道如果农民复制了一个地块并且该地块符合输注条件，会发生什么。每个地块都获得区块奖励吗？不 - 会创建两个块，但只会注入一个。完整节点只会传播他们看到的块的第一个副本。时间领主节点最终只连接到一个完整节点，因此即使多个相同的块到达该完整节点，它们也不会都被发送到时间领主进行注入。

两个不同的块有可能（尽管不太可能）具有相同的注入点，即使它们的散列不匹配。在这种情况下，全节点将拒绝他们收到的第二个块，因为每个块必须有 total_iters > prev block total_iters。

<details>
<summary>原文参考</summary>

<figure>

![](/img/multiple_blocks.png)

<figcaption>
Figure 7: multiple blocks. Sp1 = signage points 1
</figcaption>
</figure>

As you can see in Figure 7, multiple blocks can get infused into the same sub-slot. Chia’s system targets one block every 18.75 seconds on average (32 blocks per sub-slot), and this is adjusted every 4608 blocks (around 24 hours) through the work difficulty algorithm.

VDF proofs span:
* from the previous infusion point before the current signage point to the current signage point, and
* from the previous infusion point to the current infusion point.
This means that the VDF proofs required for each block can overlap. 

In the example in Figure 7, B2 contains a VDF proof from B1 to sp2, and from B1 to B2. B3 contains a proof from B1 to sp3, and from B2 to B3. B2 does not depend at all on B3, but B3 depends on B2, since its VDF is from B2’s infusion point. 

As discussed in [Section 3.5](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points"), the blocks get created at the signage points, but they are missing the infusion point VDF. Once this VDF is added, the block is finished, and forms part of the blockchain. 

The signatures get created and added by the farmers at the signage points, and broadcast to the whole network.
There are no signatures at the infusion point; the only things added at the infusion point are the VDFs. 

Finally, note that there can be multiple winners at the same signage point, all of which can be included into the blockchain. That would be the case in the diagram, if `sp2 == sp3`. The one which gets included first is the one with the lower `required_iters`, and thus earlier infusion point.

You may be wondering what happens if a farmer makes a copy of a plot and the plot becomes eligible for infusion. Do the plots each win a block reward? No -- two blocks get created, but only one will be infused. The full nodes will only propagate the first copy of the block they see. The timelord node is ultimately connected to exactly one full node, so even if multiple identical blocks make it to that full node, they will not both be sent to the timelord for infusion.

It is possible (albeit very unlikely) for two non-identical blocks to have the same infusion point, even though their hashes don't match. In this case, the full nodes will reject the second block they receive because each block must have total_iters > prev block total_iters. 

</details>
