---
sidebar_position: 10
---

# 3.10 Foliage

在前面的图表中，农民没有地方指定他们的奖励，因为所有块都是规范的。 也没有地方包含交易。 到目前为止我们所谈论的一切都是区块链的主干。

农民对如何在主干中构建他们的区块没有发言权，因为他们必须使用指定的精确空间证明、VDF 和签名。 为了在系统中包含农业奖励和交易，我们必须引入一个名为 _foliage_ 的附加块组件。

**主干**：区块和区块链的组成部分，包括 VDF、空间证明、空间证明签名、挑战和以前的主干块，并且是完全规范的。 树干从不指树叶链。

**Foliage**：区块和区块链的组成部分，包括奖励应该去哪里、应该包括哪些交易以及前一个树叶块是什么的规范。 这由农民决定并且是可研磨的，因此它永远不能用作挑战的输入。

**重组**：重新组织（或重组）是当节点的峰值视图发生变化时，旧视图包含未包含在新视图中的块（某些块已反转）。 树干和树叶的重组都是可能的，但在实践中应该很少见，而且深度很低。

在下面的图 11 中，我们可以看到树叶被添加到块中以产生额外的链。 该树叶包括前一个树叶的哈希值、奖励块哈希值和签名。 这些树叶指针与主干链是分开的，并且不是规范的。 也就是说，农民理论上可以创建一个树叶重组，其中树叶被替换，但使用完全相同的树干（空间和时间的证明）。

为了防止树叶重新组织，诚实的农民每个块只创建一个树叶块。 一旦一个诚实的农民添加了一个叶子块，叶子就不可能使用相同的空间证明重新组织超过该高度，因为该农民不会再次使用相同的空间证明签名。

Furthermore, blocks like B3, which come parallel with another foliage block (B2), do not have to sign the previous foliage block, since they do not necessarily have enough time to see it.

> By “coming in parallel”, we mean that the second block’s signage point occurs before the first block's infusion point.

图中的红色箭头代表一个叶子指针，由该块中空间证明的绘图键签名。 灰色箭头表示未由绘图键签名的哈希指针（因此，如果 B2 更改或被保留，可以替换 B3 中的灰色箭头）。 这可以防止 B2 修改其块并强制 B3 重新组织的攻击。

Blocks which have red pointers are also eligible to create transactions, and are therefore called transaction blocks.

**A block is a transaction block if and only if it is the first block whose signage point occurs after the infusion of the previous transaction block.**

In the diagram, sp3 comes before B2, (a transaction block, and the previous block of B3), so B3 cannot be a transaction block.

红色箭头通过掩埋树叶块来提供安全性，但灰色箭头则不然。 灰色箭头的目的是在叶子中维护一个链表，并降低实现的复杂性。 然而，带有灰色箭头的方块会被埋在下一个方块中。

<figure>
<img src="/img/foliage.png" alt="drawing" width="1400"/>
![](/img/foliage.png)

<figcaption>
图 11：树叶块和块。 区块有交易并有红色指针（指向最后一个区块的指针）。 请注意，子时隙的开始也是一个标牌点。
</figcaption>
</figure>

区块哈希是整个树叶和树干区块的哈希。 重组工作在块哈希上。 即使我们看到一条具有相同空间和时间证明的链，只要叶子不同，区块就会有不同的哈希值。

请注意，块 B2 和 B3 的农民可能都有机会创建该块，因此他们必须都提供签名指针和交易。 但是，任何一个交易块也可以作为一个普通块被包含进来，并且由于 B2 和 B3 是并行的，所以只有它们中的一个可以构成一个交易块。

While all blocks still choose the puzzle hashes of where their rewards go, those transactions do not get included into the blockchain until the next transaction block.

### The time between transaction blocks was deliberately chosen because it comes with several advantages:

The average time between transaction blocks is 52 seconds. Several values are required to calculate this average:

- 如果块以相同的速度创建并且所有块都包含交易，则树莓派等低功耗机器将无法跟上链，因此将不受支持。
- 如果交易块以相同的速度发生，但它们之间没有空块，重组和贿赂攻击将更容易实现。
- 空块还可以帮助抑制链条减速的影响，例如在沙尘暴袭击期间。
- 最后，空块有助于平滑农民的奖励。
- For the chia mainnet, there is a target of 32 blocks every 600 seconds, for an average block time of 18.75 seconds. There are 64 signage points, so the minimum time between transaction blocks is 3\*600/64 = 28.125 seconds. This puts the average transaction block time at 46.875 seconds (average block time + minimum transaction block time).
- Average signage points until infusion_iterations is reached is slightly more than 3.5 (must wait 3 signage points, plus an average wait of about 50% of the next signage point), or around 3.5 \* 9.375 = 32.8125 seconds.
- To create a transaction block, infusion_iterations first must be met, and then the next block some seconds afterwards will be a transaction block. The total average time for this to happen is around 52 seconds.
- The formal equation is <img src="/img/block-time-calc.png" alt="(1/(e^(0.5)-1)+4)*9.375" width="200" /> or `(1/(e^(0.5)-1)+4)*9.375` which equals 51.95 seconds.

The time between transaction blocks was deliberately chosen for a specific game-theoretic reason: If transaction blocks occurred at the same rate but there were no empty blocks between them, re-orgs and bribery attacks would be easier to pull off.

图中 sp3 在 B2 之前，（一个交易块，B3 的前一个块），所以 B3 不能是一个交易块。

- If blocks were created at the same rate and all of them contained transactions, low-power machines such as the Raspberry Pi wouldn't be able to keep up with the chain and therefore wouldn't be supported.
- If transaction blocks occurred at the same rate but there were no empty blocks between them, re-orgs and bribery attacks would be easier to pull off.
- Finally, empty blocks help to smooth farmers' rewards.
