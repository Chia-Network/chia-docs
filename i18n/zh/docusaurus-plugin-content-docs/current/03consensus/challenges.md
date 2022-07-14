---
sidebar_position: 4
---

# 3.4 挑战

> Challenges

奇亚共识算法依赖于时间领主在称为*子时隙*的时间段内运行 VDF，这些时间段会定期（自动）调整，大约需要 10 分钟。在每个子时段，时间领主都会发布挑战，并开始一种小型彩票，农民会在其中检查他们的地块以获取空间证明。当农民找到符合条件的空间证明时，他们会将其广播到网络。

难度会自动调整以针对每个子时隙中整个网络的 32 个获胜证明，或者平均每 18.75 秒大约有一个获胜者（每 600 秒 32 个获胜者）。获胜证明在子时隙内的不同时间被注入 VDF。

> 注意：子时隙始终以持续 10 分钟为目标。还有一段时间称为*时隙*。通常，时隙和子时隙是完全相同的东西。但是，为了防止远程攻击，要求时隙至少有 16 个块（子时隙没有）。如果一个子时隙结束时创建的块少于 16 个，则同一时隙必须继续用于另一个子时隙。有关更多信息，请参阅[第 3.9 节](/docs/consensus/overflow_blocks#minimum-block-requirement 'Section 3.9: Overflow Blocks')（最小块要求）。

共识要求农民遵循最重的链，即累积难度最高的链（通常是出块最多的链）。

<figure>

![](/img/challenges.png)

<figcaption>
图 4：三个子时隙。x 轴代表时间。虚线代表 VDF 执行，时间从左向右推进。箭头表示哈希依赖（指向另一个对象的对象包括第二个对象的哈希）。 
</figcaption>
</figure>

在图 4 中，我们可以看到三个挑战点，c1、c2 和 c3。 在这些点上，时间领主会创建挑战（256 位哈希），并将其作为 VDF 的输入提供。时间领主获取这些哈希值，并针对指定的迭代次数开始计算此挑战的 VDF。在这个例子中，每个时隙是 100,000,000 次迭代。当 VDF 完成时，时间领主会发布新的挑战和 VDF 的证明。时隙结束信息的注入发生在每个子时隙的末尾。

挑战始终是 256 位哈希。 始终包含在此哈希中的基本信息是挑战链 VDF。然而，注入的挑战链、SubEpochSummary、难度和子时隙迭代也可能包括在内，具体取决于我们在纪元周期中的位置：

```python
class ChallengeChainSubSlot(Streamable):
    challenge_chain_end_of_slot_vdf: VDFInfo
    infused_challenge_chain_sub_slot_hash: Optional[bytes32]  # Only at the end of a slot
    subepoch_summary_hash: Optional[bytes32]  # Only once per sub-epoch, and one sub-epoch delayed
    new_sub_slot_iters: Optional[uint64]  # Only at the end of epoch, sub-epoch, and slot
    new_difficulty: Optional[uint64]  # Only at the end of epoch, sub-epoch, and slot
```

**子时隙**：固定次数 VDF 迭代的片段，受周期性工作难度调整，自动定位时间为 10 分钟。

**子时隙迭代**：确定每个子时隙必须有多少 VDF 迭代。这个数字会定期调整。

**挑战**：sha256 输出字符串。它被用作农民土地的空间证明挑战。它也用于挑战链 VDF，有时被称为*挑战哈希*。

正如您在图 4 中看到的，同时执行了三个 VDF，每个 VDF 都有不同的用途 它们在[第 3.8 节](/docs/consensus/three_vdf_chains 'Section 3.8: Three VDF Chains')中有详细解释。

在网络协议中，三个 VDF 证明通常一起传递，在所谓的*子时隙束末端*中。

<details>
<summary>原文参考</summary>

The Chia consensus algorithm relies on timelords running VDFs for periods of time called _sub-slots_, which are adjusted periodically (and automatically) to take around 10 minutes. During every sub-slot, challenges are released by timelords, and a sort of mini lottery starts, where farmers check their plots for proofs of space. When farmers find a proof of space that qualifies, they broadcast it to the network.

The difficulty adjusts automatically to target 32 winning proofs for the entire network in each sub-slot, or about one winner every 18.75 seconds on average (32 winners per 600 seconds). The winning proofs are infused into the VDF at different times within the sub-slot.

> NOTE: A sub-slot is always targeted to last 10 minutes. There is also a period of time called a _slot_. Typically, a slot and a sub-slot are exactly the same thing. However, in order to prevent long-range attacks, slots are required to have at least 16 blocks (and sub-slots are not). If a sub-slot ends with fewer than 16 blocks having been created, the same slot must continue for another sub-slot. See [Section 3.9](/docs/consensus/overflow_blocks#minimum-block-requirement 'Section 3.9: Overflow Blocks') (minimum block requirement) for more info.

The consensus requires farmers to follow the heaviest chain, which is the chain that has the highest accumulated difficulty (usually the chain with the most blocks).

<figure>

![](/img/challenges.png)

<figcaption>
Figure 4: Three sub-slots. The x axis represents time. Dotted lines represent VDF execution, advancing in time from left to right. Arrows represent hash dependencies (an object which points to another object includes the hash of the second object). 
</figcaption>
</figure>

In figure 4, we can see three challenge points, c1, c2, and c3. At the these points timelords create challenges (256-bit hashes) which are provided as input to VDFs. Timelords take these hashes, and start computing a VDF on this challenge, for the specified number of iterations. In this example, each slot is 100,000,000 iterations. When the VDF is finished, the timelord publishes the new challenge and the proof of the VDF. An infusion of end-of-slot information happens at the end of each sub-slot.

A challenge is always a 256-bit hash. The base info that is always included in this hash is the challenge chain VDF. However, the infused challenge chain, SubEpochSummary, difficulty, and sub slot iters might also be included, depending on where we are in the epoch cycle:

```python
class ChallengeChainSubSlot(Streamable):
    challenge_chain_end_of_slot_vdf: VDFInfo
    infused_challenge_chain_sub_slot_hash: Optional[bytes32]  # Only at the end of a slot
    subepoch_summary_hash: Optional[bytes32]  # Only once per sub-epoch, and one sub-epoch delayed
    new_sub_slot_iters: Optional[uint64]  # Only at the end of epoch, sub-epoch, and slot
    new_difficulty: Optional[uint64]  # Only at the end of epoch, sub-epoch, and slot
```

**Sub-slot**: a segment of a fixed number of VDF iterations, subject to periodic work difficulty adjustments, which automatically target a time of 10 minutes.

**Sub-slot iterations**: determines how many VDF iterations each sub-slot must have. This number is periodically adjusted.

**Challenge**: a sha256 output string. It is used as a proof-of-space challenge for farmers’ plots. It is also used for the challenge chain VDF, and is sometimes referred to as a _challenge hash_.

As you can see in Figure 4, there are three VDFs being executed concurrently, each of which serves a different purpose. They are explained in detail in [Section 3.8](/docs/consensus/three_vdf_chains 'Section 3.8: Three VDF Chains').

In the networking protocol, the three VDF proofs are usually passed around together, in what is called an _end of sub-slot bundle_.

</details>
