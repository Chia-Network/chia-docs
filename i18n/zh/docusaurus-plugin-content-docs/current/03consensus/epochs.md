---
sidebar_position: 11
---

# 3.11 时代和难度调整

**Sub-epoch**: Sub-epoch N starts when sub-epoch N-1 ends (except for 0th sub-epoch), and it ends at the end of the first slot where 384 \* (N+1) blocks have been included since genesis.

**Epoch**: Epoch N starts when epoch N-1 ends (except for 0th epoch), and it ends at the end of the first slot where 4608 \* (N + 1) blocks have been included since genesis.

**难度**：一个常数，用于缩放给定空间证明的迭代次数。 迭代计算为难度/质量。

每 4608 个区块，自动进行难度调整。 这会修改两个参数：slot_iterations 参数和难度参数。

子时隙迭代次数参数被重置，因此 300 秒的时隙需要接近时隙迭代次数的多次迭代。 具体来说，重置是使用上一个时期的值来近似每秒迭代次数的比率。

我们将 `epoch$` 定义为从*事先*融入当前 epoch 的最后一个块开始，并以当前 epoch 融入的最后一个区块结束。 因此，`epoch$` 是每个 epoch 发生的略微偏移的时期。

值 `t1`、`i1` 和 `w1` 表示 `epoch$` 开头的时间戳、迭代（自创世以来）和权重（自创世以来）。 同样，`(t2,i2,w2)` 是 `epoch$` 末尾的值。

Here's how we calculate iterations per second:

```python
iterations per second = floor(num iterations in last epoch / duration of last epoch)
                      = floor(i2 - i1 / t2 - t1)
```

That is, the delta in total iterations from the start to the end of the epoch, divided by the delta in timestamps.

子时隙迭代次数是每十分钟子时隙的总迭代次数。 标牌点间隔迭代是子时隙迭代除以 64（每个子时隙的标牌点数）。

```python
sub slot iterations = iterations per second * 300
sp interval iterations = floor(sub slot iterations / 64)
```

Note that we don’t take the iterations and time exactly at the end of an epoch, but at the last infusion point of a block in an epoch (aka `epoch$`), the reason being simply that we only have timestamps available when blocks are infused.

```python
weight/sec of last epoch = (new weight - old weight) / duration of last epoch
                         = (w2 - w1) / (t2 - t1)

new difficulty = (weight/sec * target seconds) / target number of blocks
               = ((w2 - w1) / (t2 - t1) * (4608/64) * 300) / 4608
```

This can be rearranged to use only one floor division:

```python
new difficulty = floor(75 * (w2 - w1) / (16 * (t2 - t1)))
```

调整子时隙迭代，使得每个时隙持续大约 600 秒。 调整难度使得每个挑战平均获得 32 个块，迭代次数少于时隙迭代次数。

需要注意的是，每个槽的 VDF 迭代次数与权重无关。 也就是说，如果有两个相同的世界，其中 VDF 速度相等，空间相等，但是一个世界中子时隙迭代参数是两倍高，那么子时隙迭代次数较高的区块链将获得两倍多的块 每个时隙都包含在内，但每个时隙需要两倍的时间。 在这两种情况下，每秒添加到链上的重量是相同的。

Another way to look at it is that increasing sub-slot iterations increases the number of blocks per slot, but it also makes slots last longer, and thus has no effect on weight per second.

## 子时代

如[第 3.8 节](/docs/03consensus/three_vdf_chains "Section 3.8: Three VDF Chains")中所述，挑战链是完全独立的，不涉及奖励链中的任何内容。 如果这些链永远分开，拥有更快 VDF 的攻击者将能够展望遥远的未来并预测挑战。 攻击者可以在空间有限的情况下为每个时隙创建一个区块，从而创建一个完整的挑战链。 这将允许他们创建情节并立即为这些将来获胜的情节创建空间证明，然后删除这些图块（远程重新绘制攻击）。 这将使他们能够填补他们的奖励链并增加他们的体重。

对此的解决方案是定期（每 384 个区块，平均 2 小时）将奖励链融入挑战链。 这意味着攻击者只能在未来几个小时内执行重新绘制攻击。 绘制需要一些时间，但即使攻击者可以立即重新绘制，重新绘制攻击的成本也将超过收益。 这是因为我们没有融入*当前*的奖励链输出；相反，我们融入了*前一个*子时代的奖励链输出（过去两个小时）。

创建图的成本包括计算所有表的电力、创建该图所需的 RAM 以及固定基础设施成本（空间、电力、冷却等）。 假设最坏的情况是超快速 VDF 和即时 ASIC 绘图 - 其好处将等同于将该绘图存储在 HDD 上几个小时的好处。 请注意，这并不能保证获胜的图块；这相当于存储一个正常的图。

很明显，这种攻击是不值得的，而且存储这些图要便宜得多。 这在[第 3.14 节](/docs/03consensus/attacks_and_countermeasures#short-range-replotting-attack "Section 3.14: Short Range Replotting Attack")中有更详细的讨论。

以上解释了为什么子时代间隔应该保持相对较低。 但是为什么我们不能进一步将其减少到 2 小时以下以进一步抑制重新策划攻击？ 原因是，每当将非规范数据注入挑战链（奖励链包含的内容，请参阅[第 3.10 节](/docs/03consensus/foliage "Section 3.10: Foliage")了解更多信息）时，就有机会磨砺发生。 这意味着攻击者可以选择包含或排除块来操纵未来 2 小时的挑战。 如果这个时间太短，他们可以通过更频繁地这样做来获得小空间优势。

The second (and completely separate) purpose for sub-epochs is to act as checkpoints in a Flyclient-like protocol explained in [Section 3.12](/docs/03consensus/light_clients "Section 3.12: Light Clients"), to increase the efficiency of light clients.
