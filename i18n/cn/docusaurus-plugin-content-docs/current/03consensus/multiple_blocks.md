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

正如您在图 7 中看到的，多个区块可以被注入到同一个子时隙中。Chia 的系统平均每 18.75 秒瞄准一个区块，并通过工作难度算法进行调整。VDF 从前一个融入点到当前标牌点，从前一个融入点到当前融入点。请注意，每个块所需的 VDF 证明可以重叠。

例如，B2 包含从 B1 到 sp2，以及从 B1 到 B2 的 VDF 证明。B3 包含从 B1 到 sp3，以及从 B2 到 B3 的证明。B2 完全不依赖 B3，但 B3 依赖 B2，因为它的 VDF 来自 B2 的融入点。同样，区块是在标牌点处创建的，但它们缺少融入点 VDF，添加此 VDF 后，该区块就完成了，并构成了区块链的一部分。签名由农民在标牌点创建和添加，然后广播到整个网络。融入点没有签名，在融入点添加的唯一东西是 VDF。

最后，请注意多个获胜者可以出现在同一个标牌点，并且他们都可以被包含在区块链中。如果`sp2 == sp3`. 第一个被包括在内的是具有较低的 `required_iters`，因此较早的融入点。

<details>
<summary>原文参考</summary>

<figure>

![](/img/multiple_blocks.png)

<figcaption>
Figure 7: multiple blocks. Sp1 = signage points 1
</figcaption>
</figure>


As you can see in figure 7, multiple blocks can get infused into the same sub-slot.
Chia’s system targets one block every 18.75 seconds on average, and this is adjusted through the work difficulty algorithm. 
VDFs go from the previous infusion point to the current signage point and from the previous infusion point to the current infusion point.
Note that the VDF proofs required for each block can overlap. 

For example, B2 contains a VDF proof from B1 to sp2, and from B1 to B2. B3 contains a proof from B1 to sp3, and from B2 to B3.
B2 does not depend at all on B3, but B3 depends on B2, since its VDF is from B2’s infusion point. 
Again, the blocks get created at the signage points, but they are missing the infusion point VDF; once this VDF is added, the block is finished, and forms part of the blockchain. 
The signatures get created and added by the farmers at the signage points, and broadcast to the whole network.
There are no signatures at the infusion point; the only things added at the infusion point are the VDFs. 

Finally, note that multiple winners can happen at the same signage point, and they can both be included into the blockchain.
That would be the case in the diagram, if `sp2 == sp3`. The one which gets included first is the one with the lower
`required_iters`, and thus earlier infusion point.

</details>
