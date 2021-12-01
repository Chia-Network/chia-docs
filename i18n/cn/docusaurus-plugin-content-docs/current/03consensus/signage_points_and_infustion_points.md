---
sidebar_position: 5
---

# 3.5 标志点和输液点

> Signage Points and Infusion Points

挑战和奖励链中的每个子槽被划分为 64 个更小的 VDF，在每个小 VDF 之间有一个点，称为**标牌点**。时间领主在到达每个标牌点时发布 VDF 输出和证明。请注意，挑战链和奖励链都有标志点（但没有注入的挑战链）。每个标牌点之间的迭代次数为 **sp 间隔迭代次数**，等于子槽迭代次数 / 64。

子时隙开始处的挑战也是一个有效的标志点。当到达 64 个标牌点中的每一个时，它们由时间领主和节点通过网络广播。农民收到这些标牌点并根据标牌点、他们的地块 ID 和子槽挑战计算地块过滤器。如果绘图过滤器位以 9 个零开始，则该绘图通过该标志点的过滤器，并且可以继续。对于该标牌点，这将取消网络中所有绘图文件的大约 511/512 的资格。

```plot filter bits = sha256(plot id + sub slot challenge + cc signage point)```

空间挑战的证明计算为绘图过滤器位的散列：

`pos challenge = sha256(plot filter bits)`

利用这个挑战，农民从磁盘获取每个地块通过过滤器的质量字符串。回想一下，这个过程几乎是即时的，质量字符串是从空间证明的一部分导出的哈希（但尚未检索到整个空间证明）。

<details>
<summary>原文参考</summary>

Each sub-slot in the challenge and reward chains is divided into 64, smaller, VDFs, and between each of these small VDFs is a point called a **signage point**. Timelords publish the VDF output and proof when they reach each signage point. Note that both the challenge chain and the reward chains have signage points (but not the infused challenge chain). The number of iterations between each signage point is **sp interval iterations**, which is equal to sub slot iterations / 64.
 
The challenge at the start of the sub-slot is also a valid signage point. As each of the 64 signage points is reached, they are broadcast through the network by timelords and nodes. Farmers receive these signage points and compute a plot filter based on the signage point, their plot id, and the sub-slot challenge. If the plot filter bits start with 9 zeros, that plot passes the filter for that signage point, and can proceed. This disqualifies around 511/512 of all plot files in the network, for that signage point.

```plot filter bits = sha256(plot id + sub slot challenge + cc signage point)```

The proof of space challenge is computed as the hash of the plot filter bits:

`pos challenge = sha256(plot filter bits)`

Using this challenge, the farmers fetch quality strings for each plot that made it past the filter from disk. Recall that this process is almost instant, and that the quality string is a hash derived from part of the proof of space (but the whole proof of space is not retrieved yet).

</details>

农民计算每个空间证明**所需的迭代次数**。如果所需的迭代次数 < sp 间隔迭代次数，则空间证明有资格包含在区块链中，因此农民从磁盘中获取整个空间证明（这比仅获取质量需要更长的时间），创建一个未完成的子块，并且将其广播到网络。请注意，绝大多数所需的迭代次数都太高了，因为平均 32 次将符合整个网络的每个子槽。这是一个随机过程，因此可能有大量证明符合条件，但可能性很小。标牌点迭代次数是从子槽开始到标牌点的迭代次数。

所需迭代的确切方法如下：

```python
sp_quality_string = sha256(quality_string + cc_signage_point)
required_iterations = (difficulty
    * difficulty_constant_factor
    * int.from_bytes(sp_quality_string, "big", signed=False)
    // pow(2, 256) * expected_plot_size(size))
```

难度常数因子基于区块链的初始常数，对于 chia 它是`2^67`。难度因时代而异。如您所见，**sp_quality_string**被转换为 0 到 1 之间的随机数，方法是将其除以`2^256`，然后乘以绘图大小。

出于共识的目的，`expected_plot_size`是`((2 * k) + 1) * (2 ** (k - 1)).`，其中 k>=32<50。实际绘图大小是该值乘以一个常数因子，以字节为单位。

这是因为图中的每个条目都围绕`k+0.5`位，并且有围绕`2^(k)`条目。

所述**输注迭代**是从在其与上述质量块可以被包括在blockchain子时隙的开始的迭代次数。这计算如下：

`
infusion iterations =( signage point iterations + 3 * sp interval iterations + required iterations)  %  sub slot iterations
`

<details>
<summary>原文参考</summary>

The farmer computes the **required iterations** for each proof of space. If the required iterations < sp interval iterations, the proof of space is eligible for inclusion into the blockchain, so the farmer fetches the entire proof of space from disk (which takes longer than only fetching the quality), creates an unfinished sub block, and broadcasts it to the network. Note that the vast majority of required iterations will be way too high, since on average 32 will qualify for the whole network for each sub slot. This is a random process so it's possible for a large number of proofs to qualify, but very unlikely. The signage point iterations is the number of iterations from the start of the sub-slot to the signage point.

The exact method for required iterations is the following:

```python
sp_quality_string = sha256(quality_string + cc_signage_point)
required_iterations = (difficulty
    * difficulty_constant_factor
    * int.from_bytes(sp_quality_string, "big", signed=False)
    // pow(2, 256) * expected_plot_size(size))
```
The difficulty constant factor is based on the initial constants of the blockchain, for chia it is `2^67`. The difficulty
varies per epoch. As you can see, the **sp_quality_string** is converted into a random number between 0 and 1, by dividing
it by `2^256`, and then multiplied by the plot size.

For consensus purposes, the `expected_plot_size` is `((2 * k) + 1) * (2 ** (k - 1)).`, where k>=32<50. The actual
plot size is that value times a constant factor, in bytes.

This is because each entry in the plot is around `k+0.5` bits, and there are around `2^(k)` entries.

The **infusion iterations** is the number of iterations from the start of the sub slot at which the block with the quality above can be included into the blockchain. This is calculated as:

`
infusion iterations =( signage point iterations + 3 * sp interval iterations + required iterations)  %  sub slot iterations
`

</details>

因此，输液迭代将在标志点之后的 3 到 4 个标志点之间进行。农民必须在到达输液点之前提交他们的证明和块。如果标志点靠近子槽的末端，则模数允许溢出到下一个子槽中。这个后面会展开。

在注入点，农夫块与注入点 VDF 输出相结合，从那时起为 VDF 创建新输入，即我们将农夫块注入 VDF。该块仅在达到注入迭代后才完全有效，并且 VDF 证明已附加到该块上。

要使 b1 区块有效/完成，必须包括两个 VDF 证明：一个从 r1 到标牌点，一个从 r1 到 b1。（实际上更多，因为有三个 VDF 链，稍后解释）。在图 5 中，农民在标志点处创建（我们称之为 B1'）。但是，B1' 还没有完成，因为它需要注入点 VDF。一旦注入迭代 VDF 被释放，它就会被添加到 B1' 以在 B1 处形成完成的块。

<figure>

![](/img/signage_points.png)

<figcaption>
图 5：时间领主为标牌点和注入点创建证明。但他们只为后者注入（更改 VDF 类组）。方块象征着注入，新的 VDF 开始于此。
</figcaption>
</figure>

让我们考虑图5中的例子，子槽迭代为100M，sp间隔迭代为1.5625M。假设一个农民总共有 1000 个地块。

对于 64 个标牌点中的每一个，当它们每 9.375 秒或每 1.5625M 次迭代发布到网络时，农民计算地块过滤器并查看通过的地块数量。对于通过每个标牌点过滤器的每个地块，农民计算所需的迭代次数。在这个例子中，农民在整个子时隙中只获得一次 < 1.5625M 的 required_iterations （假设它是 0.7828M）。在图 5 中，这是第 20 个标志点。输液迭代计算如下：

`
infusion iterations = signage point iterations + 3 * sp interval iterations + required iterations
                               = 20*1.5625M + 3 * 1.5626M + 0.7827M
                               = 36.7223M
`

在意识到他们赢了之后（在第 20 个注入点），农民获取整个空间证明，制作一个区块，可选地包括交易，并将其广播到网络。他们有几秒钟的时间（直到注入迭代）到达时间领主，他们将注入块，创建注入点 VDF。有了这些 VDF，区块就可以由全节点完成并添加到区块链中。

<details>
<summary>原文参考</summary>

Therefore, the infusion iterations will be between 3 and 4 signage points after the signage point. Farmers must submit their proofs and blocks before the infusion point is reached. The modulus is there to allow overflows into the next sub-slot, if the signage point is near the end of the sub-slot. This is expanded on later.

At the infusion point, the farmer's block gets combined with the infusion point VDF output to create a new input for the VDF from that point on, i.e. we infuse the farmer’s block into the VDF. The block is only fully valid after the infusion iterations has been reached, and the VDF proof has been attached to the block.

For the b1 block to be valid/finished, two VDF proofs must be included: one from r1 to the signage point and one from r1 to b1. (actually it’s more since there are three VDF chains, explained later).  In Figure 5, the farmer creates at the time of the signage point, (let’s call it B1’). However, B1’ is not finished yet, since it needs the infusion point VDF. Once the infusion iterations VDF is released, it is added to B1’ to form the finished block at B1.
<figure>

![](/img/signage_points.png)

<figcaption>
Figure 5: timelords create proofs for both the signage point and the infusion point. But they only infuse (change the VDF classgroup)  for the latter. Squares symbolize infusions, where a new VDF is started.
</figcaption>
</figure>


Let’s consider the example in figure 5. The sub-slot iterations is 100M, and the sp interval iterations is 1.5625M.  Let’s say a farmer has a total of 1000 plots.

For each of the 64 signage points, as they are released to the network every 9.375 seconds, or every 1.5625M iterations, the farmer computes the plot filter and sees how many plots pass.
For each of the plots that pass the filter for each signage point, the farmer computes the required iterations.
In this example, the farmer only gets required_iterations < 1.5625M one time in the whole sub-slot (let’s say it’s 0.7828M). 
In Figure 5, this is at the 20th signage point.
The infusion iterations is computed as:

`
infusion iterations = signage point iterations + 3 * sp interval iterations + required iterations
                               = 20*1.5625M + 3 * 1.5626M + 0.7827M
                               = 36.7223M
`

After realizing they have won (at the 20th infusion point), the farmer fetches the whole proof of space, makes a block, optionally including transactions, and broadcasts this to the network.
They have a few seconds (up to the infusion iterations), to reach timelords, who will infuse the block, creating the infusion point VDFs.
With these VDFs, the block can be finished and added to the blockchain by full nodes.

</details>

## 定义

**质量串**：空间的证据的一小部分，2 x值出总64个的x值，可以有效地从磁盘中检索，并且该值来获取由所述标志点来确定。

**sp quality string**：与质询链标牌点连接的质量字符串的散列。这个哈希最终决定了某个证明的“运气”，以及它的 required_iters 是低还是高。

**Sp 间隔迭代**：定义为 floor（子槽迭代/64）。

**标牌点**：挑战和奖励链中一个子槽内的 64 个中间时间点，VDF 会定期发布。在每个标牌点，都会创建 VDF 输出并通过网络广播。子槽中的第一个标志点是挑战本身。每个区块都有一个标牌点，因此区块中的空间证明必须符合该标牌点的条件。

**所需迭代次数**：使用质量字符串计算的数字，用于选择适合制作块的空间证明。绝大多数空间证明需要的迭代次数太高，因此不符合纳入链的条件。该数字用于计算输液点。

**注入点**：从挑战点开始注入迭代的时间点，用于证明具有特定挑战和注入迭代的空间。此时，农民的区块被注入奖励链 VDF。一个街区的注入点总是在该街区的标志点之后的 3 到 4 个标志点之间。计算为标志点迭代 + 3 * sp 间隔迭代 + 所需的迭代。

标志点和注入点之间的延迟有很多好处，包括防止孤儿和自私耕作、减少叉子和没有 VDF 停顿。给出这个大约 30 秒的延迟，以便农民有足够的时间进行签名，而不会延迟插槽 VDF。行为良好的农民只在每个空间证明上签署一个标志点，这意味着攻击者无法轻易重组链条。

<details>
<summary>原文参考</summary>

- ## Defitions

**Quality string**: A small part of the proof of space, 2 *x values* out of the total 64 *x values*, which can be retrieved
efficiently from disk, and which values to fetch is determined by the signage point.

**sp quality string**: A hash of the quality string concatenated with the challenge chain signage point. This hash is 
what ultimately decides the "luck" of a certain proof, and whether it has low or high required_iters.

**Sp interval iterations**: Defined as floor(sub-slot iterations / 64).

**Signage points**: 64 intermediary points in time within a sub-slot in the challenge and reward chains, for which VDFs are periodically released. At each signage point, a VDF output is created and broadcast through the network. The first signage point in the sub-slot is the challenge itself. Each block has a signage point such that the proof of space in the block must be eligible for that signage point.

**Required iterations**: A number computed using the quality string, used to choose proofs of space which are eligible to make blocks. The vast majority of proofs of space will have required iterations which are too high, and thus not eligible for inclusion into the chain. This number is used to compute the infusion point.

**Infusion point**: the point in time at infusion iterations from the challenge point, for a proof of space with a certain challenge and infusion iterations. At this point, the farmer’s block gets infused into the reward chain VDF. The infusion point of a block is always between 3 and 4 signage points after the signage point of that block. Computed as signage point iterations + 3 * sp interval iterations + required iterations.

The delay between the signage point and infusion point has many benefits, including defense against orphaning and selfish farming, decreased forks, and no VDF pauses. This delay of around 30 seconds is given so that farmers have enough time to sign without delaying the slot VDF. Well behaving farmers sign only one signage point with each proof of space, meaning that attackers cannot easily reorg the chain.

</details>

