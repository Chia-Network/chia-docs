---
sidebar_position: 4
---

# 3.4 挑战

奇亚共识算法依赖于时间领主在称为*子时隙*的时间段内运行 VDF，这些时间段会定期（自动）调整，大约需要 10 分钟。 在每个子时段，时间领主都会发布挑战，并开始一种小型彩票，农民会在其中检查他们的地块以获取空间证明。 当农民找到符合条件的空间证明时，他们会将其广播到网络。

难度会自动调整以针对每个子时隙中整个网络的 32 个获胜证明，或者平均每 18.75 秒大约有一个获胜者（每 600 秒 32 个获胜者）。 获胜证明在子时隙内的不同时间被注入 VDF。

> 注意：子时隙始终以持续 10 分钟为目标。 还有一段时间称为*时隙*。 通常，时隙和子时隙是完全相同的东西。 但是，为了防止远程攻击，要求时隙至少有 16 个块（子时隙没有）。 如果一个子时隙结束时创建的块少于 16 个，则同一时隙必须继续用于另一个子时隙。 有关更多信息，请参阅[第 3.9 节](/docs/03consensus/overflow_blocks#minimum-block-requirement "Section 3.9: Overflow Blocks")（最小块要求）。

The consensus requires farmers to follow the heaviest chain, which is the chain that has the highest accumulated difficulty (usually the chain with the most blocks).

<figure>
<img src="/img/challenges.png" alt="drawing"/>
![](/img/challenges.png)

<figcaption>
图 4：三个子时隙。 x 轴代表时间。 虚线代表 VDF 执行，时间从左向右推进。 箭头表示哈希依赖（指向另一个对象的对象包括第二个对象的哈希）。 
</figcaption>
</figure>

在图 4 中，我们可以看到三个挑战点，c1、c2 和 c3。 在这些点上，时间领主会创建挑战（256 位哈希），并将其作为 VDF 的输入提供。 时间领主获取这些哈希值，并针对指定的迭代次数开始计算此挑战的 VDF。 在这个例子中，每个时隙是 100,000,000 次迭代。 当 VDF 完成时，时间领主会发布新的挑战和 VDF 的证明。 时隙结束信息的注入发生在每个子时隙的末尾。

挑战始终是 256 位哈希。 始终包含在此哈希中的基本信息是挑战链 VDF。 然而，注入的挑战链、SubEpochSummary、难度和子时隙迭代也可能包括在内，具体取决于我们在纪元周期中的位置：

```python
class ChallengeChainSubSlot(Streamable):
    challenge_chain_end_of_slot_vdf: VDFInfo
    infused_challenge_chain_sub_slot_hash: Optional[bytes32]  # Only at the end of a slot
    subepoch_summary_hash: Optional[bytes32]  # Only once per sub-epoch, and one sub-epoch delayed
    new_sub_slot_iters: Optional[uint64]  # Only at the end of epoch, sub-epoch, and slot
    new_difficulty: Optional[uint64]  # Only at the end of epoch, sub-epoch, and slot
```

**Sub-slot**: a segment of a fixed number of VDF iterations, subject to periodic work difficulty adjustments, which automatically target a time of 10 minutes.

**子时隙迭代**：确定每个子时隙必须有多少 VDF 迭代。 这个数字会定期调整。

**挑战**：sha256 输出字符串。 它被用作农民土地的空间证明挑战。 它也用于挑战链 VDF，有时被称为*挑战哈希*。

As you can see in Figure 4, there are three VDFs being executed concurrently, each of which serves a different purpose. They are explained in detail in [Section 3.8](/docs/03consensus/three_vdf_chains "Section 3.8: Three VDF Chains"). 正如您在图 4 中看到的，同时执行了三个 VDF，每个 VDF 都有不同的用途 它们在[第 3.8 节](/docs/03consensus/three_vdf_chains "Section 3.8: Three VDF Chains")中有详细解释。

In the networking protocol, the three VDF proofs are usually passed around together, in what is called an _end of sub-slot bundle_.
