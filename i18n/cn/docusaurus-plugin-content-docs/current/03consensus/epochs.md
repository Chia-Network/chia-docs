---
sidebar_position: 11
---

# 3.11 时代和难度调整

> Epoch and Difficulty Adjustment

**Sub-epoch** : Sub-epoch N 在 sub-epoch N-1 结束时开始（第 0 个 sub-epoch 除外），并在第一个时隙的末尾结束，其中 384 * (N+1) 个块自创世以来已被包含在内.

**Epoch**：Epoch N 在 epoch N-1 结束时开始（第 0 个 epoch 除外），它在第一个 slot 结束时结束，其中自创世以来已包含 4608 * (N + 1) 个块。

**难度**：一个常数，用于缩放给定空间证明的迭代次数。迭代计算为难度/质量。

每 4608 个区块，难度调整开始。这会修改两个参数：slot_iterations 参数和难度参数。

sub_slot_iterations 参数被重置，因此 300 秒的时隙需要接近 slot_iterations 的多次迭代。重置是使用上一个时期的值来具体地近似每秒迭代次数。

对于一个 epoch，let`epoch$` 表示稍微移动的时间段，其中`epoch$` 从 epoch 开始之前注入的最后一个块开始，到一个 epoch 中注入的最后一个块结束。值`t1`，`i1`并且`w1`表示时间戳，迭代自genesing和重量，因为在时代$年初genesing，`(t2,i2,w2)`处于末尾的值`epoch$`。

```python
iterations per second = floor(num iterations in last epoch / duration of last epoch) 
                      = floor(i2 - i1 / t2 - t1) 
```

也就是说，从 epoch 开始到结束的总迭代次数的 delta，除以时间戳中的 delta `i2`，就是 epoch 中最后一个块的注入点的总迭代次数。`i1`是前一个 epoch 中最后一个块的注入点的总迭代次数。子时隙迭代次数是每个子时隙的总迭代次数。

```python
sub slot iterations = iterations per second * 300
sp interval iterations = floor(sub slot iterations / 64)
```

请注意，我们并没有在 epoch 结束时准确地获取迭代和时间，而是在一个 epoch 中块的最后注入点处获取迭代和时间，原因很简单，因为我们只有在注入块时才有可用的时间戳。

```python
weight/sec of last epoch = (new weight - old weight) / duration of last epoch
                         = (w2 - w1) / (t2 - t1)

new difficulty = (weight/sec * target seconds) / target number of blocks
               = ((w2 - w1) / (t2 - t1) * (4608/64) * 300) / 4608
```

这可以重新排列以仅使用一个楼层划分：

```python
new difficulty = floor(75 * (w2 - w1) / (16 * (t2 - t1)))
```

调整子时隙迭代，使得每个时隙持续大约 600 秒。调整难度使得每个挑战平均获得 32 个块，迭代次数少于 slot_iterations。需要注意的是，每个槽的 VDF 迭代次数与权重无关。也就是说，如果有两个相同的世界，其中 VDF 速度相等，空间相等，但一个世界中子槽迭代次数参数高出 2 倍，那么子槽迭代次数较高的区块链将获得两倍多的区块每个插槽都包含在内，但每个插槽将花费两倍的时间，因此在这两种情况下，每秒添加到链上的重量是相同的。另一种看待它的方式是增加子槽迭代增加每个槽的块数，但它也使槽持续时间更长，因此对权重/秒没有影响。

<details>
<summary>原文参考</summary>

**Sub-epoch**: Sub-epoch N starts when sub-epoch N-1 ends (except for 0th sub-epoch), and it ends at the end of the first slot where 384 * (N+1) blocks have been included since genesis. 

**Epoch**: Epoch N starts when epoch N-1 ends (except for 0th epoch), and it ends at the end of the first slot where 4608 * (N + 1) blocks have been included since genesis.

**Difficulty**: A constant that scales the number of iterations for a given proof of space. Iterations are computed as difficulty / quality. 

Every 4608 blocks, the difficulty adjustment kicks in. This modifies two parameters: The slot_iterations parameter, and the difficulty parameter. 

The sub_slot_iterations parameter is reset so a 300 second slot requires close to slot_iterations many iterations. The reset is done using the values from the last epoch to approximate the iterations per second ration, concretely.

For an epoch let `epoch$`  denote the slightly shifted period where `epoch$`  starts with the last block that was infused before the epoch starts, and ends with the last block that was infused in an epoch. The values `t1`,`i1` and `w1` denote the timestamp, iterations since genesing, and weight since genesing at the beginning of epoch$ , `(t2,i2,w2)` are the values at the end of `epoch$` .

```python
iterations per second = floor(num iterations in last epoch / duration of last epoch) 
                      = floor(i2 - i1 / t2 - t1) 
```

That is, the delta in total iterations from the start to the end of the epoch, divided by the delta in timestamps, `i2`, 
is the total iterations of the infusion point of the last block in the epoch. `i1` is the total iterations of the infusion point of 
the last block in the previous epoch. Sub-slot iterations is the total number of iterations per sub-slot.

```python
sub slot iterations = iterations per second * 300
sp interval iterations = floor(sub slot iterations / 64)
```

Note that we don’t take the iterations and time exactly at the end of an epoch, but at the last infusion point of a block in an epoch, the reason being simply that we only have timestamps available when blocks are infused.

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

The sub-slot iterations are adjusted such that each slot lasts around 600 seconds.
The difficulty is adjusted such that every challenge gets 32 blocks on average with less iterations than the slot_iterations.
It is important to note that the VDF iterations per slot is not material to the weight.
That is, if there were two identical worlds where VDF speeds were equal and space was equal,
but the sub-slot iterations parameter was 2 times higher in one world, then the blockchain with the higher sub-slot iterations would get twice as many blocks included per slot, but each slot would take twice as long, so the weight per second added to the chain is the same in both cases.
Another way to look at it is that increasing sub-slot iterations increases the number of blocks per slot,
but it also makes slots last longer, and thus has no effect on weight / second.

</details>


## 子时代

如前所述，挑战链是完全独立的，不涉及奖励链中的任何内容。如果这些链永远分开，拥有更快 VDF 的攻击者将能够展望遥远的未来并预测挑战。攻击者可以在空间有限的情况下为每个槽创建一个区块，从而创建一个完整的挑战链。这将允许他们创建情节并立即为这些将来获胜的情节创建空间证明，然后删除这些情节（远程重新绘制攻击）。这样，他们就可以填满他们的奖励链并增加他们的权重。

解决方案是定期（每 384 个区块，平均 2 小时）将 slot 的奖励链末端注入挑战链。这意味着攻击者只能在未来几个小时内执行重新绘制攻击。绘制本身需要几个小时，但即使攻击者可以立即重新绘制，重新绘制攻击的成本也将超过收益。我们注入的不是当前的奖励链输出，而是前一个子纪元结束时（2 小时前）的奖励链输出。

创建图的成本包括计算所有表的电力、创建该图所需的 RAM 以及固定基础设施成本（空间、电力、冷却等）。假设最坏的情况是超快速 VDF 和即时 ASIC 绘图 - 其好处将等同于将该绘图存储在 HDD 上几个小时的好处。很明显，这种攻击是不值得的，并且存储图要便宜得多（下面的分析）。

以上解释了为什么子纪元间隔应该保持相对较低。但是为什么我们不能进一步将其减少到 2 小时以下以进一步抑制重新策划攻击？原因是每当将非规范数据注入挑战链时，就会出现磨合的机会。这意味着攻击者可以选择包含或排除块来操纵未来 2 小时的挑战。如果这个时间太短，他们可以通过更频繁地这样做来获得小空间优势。

子时代的第二个目的是在下面解释的类似 flyclient 的协议中充当检查点，以提高轻客户端的效率。

<details>
<summary>原文参考</summary>

- ## Sub epochs

As described earlier, the challenge chain is completely separate and does not refer to anything in the rewards chain. If these chains stayed separate forever, an attacker with a faster VDF would be able to look into the far future and predict challenges. The attacker can create one block per slot, with limited space, thus creating a whole challenge chain. This would allow them to create plots and instantly create proofs of space for these plots that will win in the future, and then delete the plots (a long range replotting attack). This way, they can fill their reward chain and increase their weight. 
 
The solution to this is to periodically (every 384 blocks, which is an average of 2 hours) infuse the reward chain end of slot into the challenge chain. This means that the attacker can only perform the replotting attack for a few hours into the future. Plotting itself takes a few hours, but even if the attacker could replot instantly, the cost of a replotting attack will outweigh the benefits. We infuse not the current reward chain output, but the reward chain output of the end of the previous sub-epoch (2 hours ago).

The cost of creating a plot includes the electricity to calculate all of the tables, the RAM necessary while creating this plot, and the fixed infrastructure costs (space, power, cooling, etc). Assuming the worst case scenario of a super fast VDF, and instant ASIC plotting - the benefits would be equivalent to the benefits of storing that plot on a HDD for a few hours. It is clear that this attack is not worthwhile, and that storing the plots is much cheaper (analysis below). 

The above explains why the sub-epoch interval should be kept relatively low. But why can’t we further reduce it to lower than 2 hours to further disincentivize replotting attacks? The reason is that whenever non-canonical data is infused into the challenge chain, an opportunity for grinding occurs. This means an attacker can possibly choose to include or exclude blocks to manipulate what the challenge will be 2 hours into the future. If this time is too short, they can gain a small space advantage by doing this more often.

The second purpose for sub-epochs is to act as checkpoints in a flyclient-like protocol explained below, to increase efficiency of light clients.

</details>
