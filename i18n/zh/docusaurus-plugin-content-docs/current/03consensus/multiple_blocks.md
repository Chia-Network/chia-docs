---
sidebar_position: 7
---

# 3.7 多块

<figure>
<img src="/img/multiple_blocks.png" alt="drawing"/>
![](/img/multiple_blocks.png)

<figcaption>
图 7：多个块。 Sp1 = 标牌点 1
</figcaption>
</figure>

正如您在图 7 中看到的，多个块可以被注入到同一个子时隙中。 奇亚的系统平均每 18.75 秒定位一个区块（每个子时隙 32 个区块），并且通过工作难度算法每 4608 个区块（大约 24 小时）调整一次。

VDF proofs span:

- from the previous infusion point before the current signage point to the current signage point, and
- 从上一个融入点到当前融入点。 这意味着每个块所需的 VDF 证明可以重叠。

在图 7 的示例中，B2 包含从 B1 到 sp2 以及从 B1 到 B2 的 VDF 证明。 B3 包含从 B1 到 sp3，以及从 B2 到 B3 的证明。 B2 完全不依赖 B3，但 B3 依赖 B2，因为它的 VDF 来自 B2 的注入点。

如[第 3.5 节](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points")中所述，块是在标牌点创建的，但它们缺少融入点 VDF。 添加此 VDF 后，该块就完成了，并构成了区块链的一部分。

签名由农民在标牌点创建和添加，然后广播到整个网络。 融入点没有签名；在注入点添加的唯一东西是 VDF。

最后，请注意，同一个标牌点可以有多个获胜者，所有获胜者都可以包含在区块链中。 如果`sp2 == sp3`，图中就是这种情况。 最先包含的那个是具有较低“所需迭代”的那个，因此融入点更早。

您可能想知道如果农民复制了一个地块并且该地块符合融合条件，会发生什么。 每个地块都获得区块奖励吗？ 不 —— 会创建两个块，但只会注入一个。 完整节点只会传播他们看到的块的第一个副本。 时间领主节点最终只连接到一个完整节点，因此即使多个相同的块到达该完整节点，它们也不会都被发送到时间领主进行融合。

两个不同的块有可能（尽管不太可能）具有相同的融入点，即使它们的哈希不匹配。 在这种情况下，全节点将拒绝他们收到的第二个块，因为每个块必须有总迭代次数 > 上一个块的总迭代次数。
