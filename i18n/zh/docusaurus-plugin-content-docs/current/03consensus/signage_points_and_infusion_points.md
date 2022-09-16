---
sidebar_position: 5
---

# 3.5 标牌点和融入点

挑战链和奖励链中的每个子时隙都分为 64 个较小的 VDF。 在这些较小的 VDF 之间有一个点，称为 **标牌点**。 时间领主在到达每个标牌点时发布 VDF 输出和证明。

> 挑战链和奖励链都有标识点。 然而，注入的挑战链却没有。

标牌点每 9.375 秒出现一次（每 600 秒子时隙 64 个标牌点）。 每个标牌点之间的迭代次数为**标牌点间隔迭代次数**，等于子时隙迭代次数 / 64。

子时隙开始处的挑战也是一个有效的标牌点。 当到达子时隙中的 64 个标牌点中的每一个时，这些点将被广播，从最快的时间领主的完整节点开始，并传播到网络上的所有其他完整节点。

农民收到这些标牌点并在每个标牌点计算每个地块的哈希值。 如果哈希以九个零开头，则绘图通过该标牌点的过滤器，并且可以继续。 对于该标牌点，这将取消网络中所有绘图文件的大约 511/512 的资格。 计算过滤器哈希的公式是：

`plot filter bits = sha256(plot id + sub slot challenge + cc signage point)`

The proof of space challenge is computed as the hash of the plot filter bits:

`PoSpace challenge = sha256(plot filter bits)`

使用这个挑战，农民为每个通过过滤器的地块获取高质量的字符串。 回想一下，这个过程需要大约 7 次随机磁盘寻道，这在慢速 HDD 上需要大约 70 毫秒。 质量字符串是从空间证明的一部分派生的哈希（但尚未检索整个空间证明）。

> For both of our [previous example](/docs/03consensus/challenges 'Section 3.4: Challenges'), as well as the next example, we'll use the following values:

- sub-slot_iterations = 100,000,000
- sp_interval_iterations = `sub-slot_iterations` / 64 = 1,562,500

农民为每个空间证明计算 **所需迭代次数**。 如果所需迭代次数 < 标牌点间隔迭代次数，则空间证明有资格包含在区块链中。 此时，农民从磁盘中获取整个空间证明（这需要 64 次磁盘寻道，或在慢速 HDD 上需要 640 毫秒），创建一个未完成的块，并将其广播到网络。

> 对于绝大多数符合条件的地块，所需迭代次数会太高，因为平均每个 10 分钟子时隙有 32 个符合整个网络的条件。 这是一个随机过程，因此有可能（尽管不太可能）大量证明符合条件。 标牌点迭代次数是从子时隙开始到标牌点的迭代次数。 任何满足标牌点所需迭代次数的地块都将符合资格，因为获胜地块之间没有竞争。

The exact method for required_iterations is the following:

```python
sp_quality_string = sha256(quality_string + cc_signage_point)
required_iterations = (difficulty
    * difficulty_constant_factor
    * int.from_bytes(sp_quality_string, "big", signed=False)
    // pow(2, 256) * expected_plot_size(size))
```

难度常数因子基于区块链的初始常数。 对于奇亚，它是 `2^67`。 难度因时期而异，如[第 3.11 节](/docs/03consensus/epochs 'Section 3.11: Epochs and Difficulty Adjustment')中所述。 如您所见，**标牌点质量字符串** 被转换为 0 到 1 之间的随机数，通过将其除以 `2^256`，然后乘以绘图大小。

For consensus purposes, the `expected_plot_size` is `((2 * k) + 1) * (2 ** (k - 1)).`, where k>=32<50. The actual plot size is that value times a constant factor, in bytes. This is because each entry in the plot is around `k+0.5` bits, and there are around `2^(k)` entries.

**融合迭代次数** 是从子时隙开始的迭代次数，在此迭代次数至少具有所需质量的块可以被包含到区块链中。 这计算如下：

`infusion_iterations = ( signage_point_iterations + 3 * sp_interval_iterations + required_iterations) % sub-slot_iterations`

因此，infusion_iterations 将在当前标牌点之后的 3 到 4 个标牌点之间。 农民必须在到达融入点之前提交他们的证明和块。 如果标牌点靠近子时隙的末端，则模数允许溢出到下一个子时隙中。 这在[第 3.9 节](/docs/03consensus/overflow_blocks 'Section 3.9: Overflow Blocks and Weight')中进行了扩展。

> More information on infusion points is available in [Section 3.3](/docs/03consensus/vdfs#infusion 'Section 3.3: VDFs').

<figure>
<img src="/img/signage_points.png" alt="drawing"/>
![](/img/signage_points.png)

<figcaption>
图 5：时间领主为标牌点和融入点创建证明。 但他们只为后者融入（更改 VDF 类组）。 方块象征着融入，新的 VDF 开始于此。
</figcaption>
</figure>

图 5 将融入点显示为标有“b1”的绿色方块。 子时隙的第一个和最后一个块分别标记为“r1”和“r2”。 在这个例子中，农民将在标有红色箭头的标牌点处创建块，我们将其称为“b1”。

在“b1”处，农民的块与该点的 VDF 输出组合在一起。 从那时起，这将为 VDF 创建一个新的输入，即我们将农民的块注入 VDF。 `b1` 仅在两个事件发生后才完全有效：

1. infusion_iterations has been reached, and
2. 包含两个 VDF 样张：一个从 `r1` 到标牌点，一个从 `r1` 到 `b1`。 （实际上更多，因为有三个 VDF 链，在[第 3.8 节](/docs/03consensus/three_vdf_chains 'Section 3.8: Three VDF Chains')中有解释）。

在图 5 中，农民在标志点“b1”处创建了块。 但是，“b1”还没有完成，因为它需要注入点 VDF。 一旦融合迭代 VDF 被释放，它就会被添加到“b1”以在“b1”处形成完成的块。

> Recall that in this example,

- sub-slot_iterations = 100M
- 标牌点间隔迭代次数 为 1.5625M。 此外，假设一个农民总共有 1000 个地块。

对于 64 个标牌点中的每一个，当它们每 9.375 秒或每 1.5625M 次迭代发布到网络时，农民计算地块过滤器并查看通过的地块数量。 对于每个经过的地块，农民计算所需迭代次数。

Let's say the farmer calculates required_iterations < 1.5625M once in the sub-slot. (We'll assume the exact required_iterations = 0.7828M in this instance.) Figure 5 shows this happening at the 20th signage point. (We'll assume the exact required_iterations = 0.7828M in this instance.) Figure 5 shows this happening at the 20th signage point.

infusion_iterations is then computed as:

infusion_iterations = signage_point_iterations + (3 \* sp_interval_iterations) + required_iterations

= (signage*point * sp*interval_iterations) + (3 * sp_interval_iterations) + required_iterations

= (20*1.5625M) + (3 * 1.5626M) + 0.7827M

= 36.7223M

在意识到他们赢了之后（在第 20 个融入点），农民获取整个空间证明，制作一个区块（可选地包括交易），并将其广播到网络。 该块直到融合迭代次数（通常是几秒钟）才能到达时间领主，他们将融入该块，创建融入点 VDF。 有了这些 VDF，区块就可以由全节点完成并添加到区块链中。

## 定义

**Quality string**: A small part of the proof of space, 2 _x values_ out of the total 64 _x values_, which can be retrieved efficiently from disk, and which values_to_fetch is determined by the signage point.

**标牌点质量字符串**：与挑战链标牌点连接的质量字符串的散列。 这个哈希最终决定了某个证明的“运气”，以及它的所需迭代次数是低还是高。

**sp_interval_iterations**: Defined as floor(sub-slot_iterations / 64).

**标牌点**：挑战和奖励链中一个子时隙内的 64 个中间时间点，VDF 会定期发布。 在每个标牌点，都会创建 VDF 输出并通过网络广播。 子时隙中的第一个标牌点是挑战本身。 每个区块都有一个标牌点，因此区块中的空间证明必须符合该标牌点的条件。

**所需迭代次数**：使用质量字符串计算的数字，用于选择适合制作块的空间证明。 绝大多数空间证明需要的迭代次数太高，因此不符合纳入链的条件。 该数字用于计算融入点。

**融入点**：从挑战点开始融入迭代的时间点，用于证明具有特定挑战和融入迭代的空间。 此时，农民的区块被融入奖励链 VDF。 一个区块的融入点总是在该区块的标牌点之后的 3 到 4 个标牌点之间。 计算为标牌点迭代 + 3 \* 标牌点间隔迭代 + 所需的迭代。

标牌点和融入点之间的延迟有很多好处，包括防止孤块和自私耕作、减少分叉和没有 VDF 停顿。 给出这个大约 30 秒的延迟，以便农民有足够的时间进行签名，而不会延迟时隙 VDF。 行为良好的农民只在每个空间证明上签署一个标牌点，这意味着攻击者无法轻易重组链。
