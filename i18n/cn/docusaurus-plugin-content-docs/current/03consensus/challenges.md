---
sidebar_position: 4
---

# 3.4 挑战

> Challenges

Chia 共识算法依赖于时间领主在称为子时隙的时间段内运行 VDF，这些时间段会定期调整以加起来大约需要 10 分钟。每个子时段，时间领主都会发布挑战，并开始一种小型彩票，农民在那里检查他们的地块以获取空间证明。当农民找到符合条件的空间证明时，他们会将其广播到网络。难度变为针对每个子槽的全网32个获胜证明，或平均每18.75秒大约一个获胜者。这些证明在子槽内的不同时间被注入到 VDF 中。农民遵循最重的链，这是其上累积难度最大的链（通常是拥有最多块的链）。

![](/img/challenges.png)

图 4：三个子插槽。x 轴代表时间。虚线代表 VDF 执行，时间从左向右推进。箭头表示散列依赖（指向另一个对象的对象包括第二个对象的散列）。

在图 4 中，我们可以看到三个挑战点，c1、c2 和 c3。在 c1、c2 和 c3 点，时间领主创建挑战（256 位哈希），作为输入提供给 VDF。Timelords 获取这些哈希值，并针对指定的迭代次数开始计算此挑战的 VDF。在这个例子中，每个槽是 100,000,000 次迭代。当 VDF 完成时，时间领主会发布新的挑战和 VDF 的证明。时隙结束信息的注入发生在每个子时隙的末尾。

**Sub-slot**：固定次数VDF迭代的片段，受工作难度调整，始终调整为10分钟的目标时间。

**子时隙迭代**：一个常数，定期调整，决定每个子时隙必须有多少 VDF 迭代。

**挑战**：sha256 输出字符串，用作农民地块以及挑战链 VDF 空间挑战的证明。这也称为质询哈希。

正如您在图 4 中看到的，同时执行了三个 VDF，每个都用于不同的目的。它们将在以下部分进行解释。在网络协议中，三个 VDF 证明通常一起传递，在所谓的**子槽束末端**。

<details>
<summary>原文参考</summary>

The Chia consensus algorithm relies on timelords running VDFs for periods of time called sub-slots, which are adjusted periodically to add up to take around 10 minutes. 
Every sub-slot, challenges are released by timelords, and a sort of mini lottery starts, where farmers check their plots for proofs of space.
When farmers find a proof of space that qualifies, they broadcast it to the network.
The difficulty changes to target 32 winning proofs for the entire network in each sub-slot, or about one winner every 18.75 seconds on average.
These proofs are infused into the VDF at different times within the sub-slot. Farmers follow the heaviest chain, which is the chain with the most cumulative difficulty on it (usually the chain with the most blocks). 

![](/img/challenges.png)

Figure 4: Three sub-slots. The x axis represents time. Dotted lines represent VDF execution, advancing in time from left to right. Arrows represent hash dependencies (an object which points to another object includes the hash of the second object). 

In figure 4, we can see three challenge points, c1, c2, and c3. At the points c1, c2, and c3 timelords create challenges (256 bit hashes) which are provided as input to VDFs. Timelords take these hashes, and start computing a VDF on this challenge, for the specified number of iterations. In this example, each slot is 100,000,000 iterations. When the VDF is finished, the timelord publishes the new challenge and the proof of the VDF. An infusion of end-of-slot information happens at the end of each sub-slot.

**Sub-slot**: a segment of a fixed number of VDF iterations, subject to work difficulty adjustment, always adjusting to target time of 10 minutes.

**Sub-slot iterations**: a constant which is periodically adjusted which determines how many VDF iterations each sub-slot must have.

**Challenge**: sha256 output string which is used as proof of space challenges for farmers’ plots, as well as for the challenge chain VDF. This is also referred to as challenge hash.

As you can see in Figure 4, there are three VDFs being executed concurrently, each which serve a different purpose. 
They are explained in the following sections.
In the networking protocol, the three VDF proofs are usually passed around together, in what is called a **end of sub slot bundle**.

</details>
