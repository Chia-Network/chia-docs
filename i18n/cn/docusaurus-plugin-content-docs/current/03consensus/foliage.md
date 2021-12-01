---
sidebar_position: 10
---

# 3.10 树叶

> Foliage

在上图中，农民没有地方指定他们的奖励，因为所有块都是规范的。也没有地方包含交易。到目前为止，我们谈论的是区块链的主干。

农民对如何在主干中构建他们的区块没有发言权，因为他们必须使用指定的精确空间证明、VDF 和签名。为了在系统中包含农业奖励以及交易，我们必须引入一个名为 foliage 的附加块组件。

**主干**：块和区块链的组成部分，包括 VDF、空间证明、PoS 签名、挑战和以前的主干块，并且是完全规范的。树干从不指树叶链。

**Foliage**：区块和区块链的组成部分，其中包括奖励应该去哪里、应该包括哪些交易以及前一个树叶块是什么的规范。这由农民决定并且是可研磨的，因此它永远不能用作挑战的输入。

**重组**：重组（或重组）是当节点的峰值视图发生变化时，旧视图包含未包含在新视图中的块（某些块被颠倒）。树干和树叶重组都是可能的，但在实践中应该很少见，而且深度较低。

<details>
<summary>原文参考</summary>

In the above diagrams, there is no place for farmers to specify their rewards, since all blocks are canonical.
There is also no place to include transactions. What we have talked about so far, is the trunk of the blockchain.

Farmers have no say in how their block is constructed in the trunk, since they must use the exact proof of space, VDFs, and signatures that are specified.
In order to include farming rewards, as well as transactions in the system, we must introduce an additional component of blocks called foliage.

**Trunk**: The component of blocks and the blockchain which includes VDFs, proofs of space, PoS signatures, challenges,
and previous trunk blocks, and is completely canonical. The trunk never refers to the foliage chain.

**Foliage**: The component of blocks and the blockchain which includes specification of where rewards should go,
which transactions should be included, and what the previous foliage block is.
This is up to the farmer to decide and is grindable, so it can never be used as input to the challenges.

**Reorg**: A reorg (or reorganization) is when a node’s view of the peak changes, such that the old view contains a block that is not included in the new view (some block is reversed).
Both trunk and foliage reorgs are possible, but should be rare in practice, and low in depth.

</details>

在下面的图 11 中，我们可以看到树叶被添加到块中以产生额外的链。该树叶包括前一个树叶的哈希值、奖励块哈希值和签名。这些树叶指针与主干链是分开的，而不是规范的。也就是说，农民理论上可以创建一个树叶重组，其中树叶被替换，但使用完全相同的树干（空间和时间的证明）。为了防止这种情况，诚实的农民每个块只创建一个树叶块。一旦一个诚实的农民添加了一个树叶块，树叶就不可能使用相同的 PoSpace 重新组织超过该高度，因为该农民不会再次使用相同的 PoSpace 签名。

此外，与另一个树叶块 (B2) 平行的 B3 块不必签署前一个树叶块，因为它们不一定有足够的时间看到它。“并行”是指第二个街区的标志点出现在第一个街区注入点之前。图中的红色箭头代表一个叶子指针，由该块中空间证明的绘图键签名。灰色箭头表示未由绘图键签名的散列指针（因此，如果 B2 更改或被保留，可以替换 B3 中的灰色箭头）。这可以防止 B2 修改其块并强制 B3 重组的攻击。

具有红色指针的区块也有资格创建交易，因此被称为交易区块。**一个区块是一个交易区块，当且仅当它是在前一个交易区块注入之后出现标志点的第一个区块**。 sp3在B2之前，（一个交易块，B3的前一个块），所以B3不能是一个交易块。红色箭头通过掩埋树叶块来提供安全性，但灰色箭头则不然。灰色箭头的目的是在叶子中维护一个链表，并降低实现的复杂性。然而，带有灰色箭头的方块会被埋在下一个方块中。

<figure>

![](/img/foliage.png)

<figcaption>
图 11：树叶块和块。区块有交易并有红色指针（指向最后一个区块的指针）。请注意，子时隙的开始也是一个标志点。
</figcaption>
</figure>

区块哈希是整个树叶和树干区块的哈希。重组处理块哈希。即使我们看到一条时空证明相同的链，只要叶子不同，块就不同。请注意，两个农民（B2 和 B3）都可能有机会创建区块，因此他们必须都提供签名指针和交易。但是，任何一个交易块也可以作为一个普通块被包含进来，并且由于 B2 和 B3 是并行的，所以只有它们中的一个可以构成一个交易块。

虽然所有区块仍然选择其奖励去向的拼图哈希，但在下一个交易区块之前，这些交易不会被包含在区块链中。

对于 chia 主网，每 600 秒有 32 个区块，平均区块时间为 18.75 秒。有 64 个标牌点，因此块之间的最短时间为 3*600/64 = 28.125 秒。这使平均交易块时间为 46.875 秒。

<details>
<summary>原文参考</summary>

In figure 11 below we can see that the foliage is added to blocks to produce an additional chain.
This foliage includes a hash of the previous foliage, a reward block hash, and a signature.
These foliage pointers are separate from the trunk chain, and not canonical.
That is, farmers could theoretically create a foliage reorg where foliage is replaced, but the exact same trunk (proofs of space and time) are used.
To prevent this, honest farmers only create one foliage block per block.
As soon as one honest farmer has added a foliage block, the foliage becomes impossible to reorg beyond
that height with the same PoSpace, since that farmer will not sign again with the same PoSpace. 

Furthermore, blocks like B3 which come parallel with another foliage block (B2)
do not have to sign the previous foliage block, since they do not necessarily have enough time to see it.
By “coming in parallel”, we mean that the second block’s signage point occurs before the first block infusion point.
The red arrows in the diagram represent a foliage pointer that is signed by the plot key for the proof of space in that block. 
The gray arrows represent a hash pointer which is not signed by the plot key (therefore the gray arrow in B3 can be replaced if B2 changes or is withheld).
This prevents attacks where B2 modifies their block and forces B3 to reorg. 

Blocks which have red pointers are also eligible to create transactions, and are therefore called transaction blocks.
__A block is a transaction block if and only if it is the first block whose signage point occurs after the infusion of the previous transaction block.__
sp3 comes before B2, (a transaction block, and the previous block of B3), so B3 cannot be a transaction block.
The red arrows provide security by burying foliage blocks, but the gray arrows do not.
The purpose of the gray arrows is to maintain a linked list in the foliage, and to reduce complexity in implementations. However, blocks with gray arrows pointing to them do get buried in the next-next block. 

<figure>

![](/img/foliage.png)

<figcaption>
Figure 11: Foliage blocks and blocks. Blocks have transactions and have red pointers (pointers to last block).
Note that the start of the sub-slot is also a signage point.
</figcaption>
</figure>

The block hash is a hash of the entire foliage and trunk block. 
Reorgs work on block hashes.
Even if we see a chain with the same proofs of space and time, as long as the foliages are different, the blocks are different.
Note that both farmers (B2 and B3) might have a chance to create the block, so they must both provide the signed pointer and transactions.
However, any transaction block can be included as a normal block as well, and since B2 and B3 are in parallel, only one of them can make a transaction block.

While all blocks still choose the puzzle hashes of where their rewards go, those transactions do not get included into the blockchain until the next transaction block. 

For the chia mainnet, there are 32 blocks every 600 seconds, for an average block time of 18.75 seconds.
There are be 64 signage points, so the minimum time between blocks is 3*600/64 = 28.125 seconds.
This puts the average transaction block time at 46.875 seconds. 

</details>
