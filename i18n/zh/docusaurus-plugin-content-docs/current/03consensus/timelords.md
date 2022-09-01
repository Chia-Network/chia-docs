---
sidebar_position: 13
---

# 3.13 时间领主算法

时间领主会跟踪当前的峰值，其中包括某个高度的融合块，以及从峰值开始的标牌点。 时间领主可能会收到要融入的新块、新的峰值（已经融入的块）或新的标牌点。

> For more info, see [Section 3.4](/docs/03consensus/challenges "Section 3.4: Challenges").

鉴于可用处理器数量有限，时间领主如何决定创建时间证明的挑战？ 虽然未来可能会开发 ASIC，但目前最快的类组 VDF 实现是在通用硬件上。 此外，即使在 ASIC 开发之后，重要的是要强调任何拥有 CPU 的用户都可以成为时间领主，在 ASIC 时间领主出现故障或变得恶意等情况下提供回退。

一般来说，时间领主在最重的链上工作。 他们在标牌点创建时间证明，并在到达时将其广播到网络。 时间领主也会尽可能频繁地融入区块。 当时间领主收到一个重量比当前峰值更大的注入块时，他们会立即切换到它。

时间领主并行运行[三个 VDF 链](/docs/03consensus/three_vdf_chains "Section 3.8: Three VDF Chains")。 因此，至少需要三个快速 CPU 内核才能以有效的速度推进区块链。 创建证明需要额外的 CPU 内核，但它们不必那么快。

如果时间领主收到的挑战权重低于他们当前的峰值，他们会忽略它。 如果时间领主在当前链的后面收到一个挑战点，他们会做安全的事情：忽略它。 原因是，通过在未来切换到更远的点，时间领主可能会跳过块的注入，从而孤立有效块。

If the timelord receives a block for infusion which is late (we have already reached the challenge point at which the block should have been infused), the timelord ignores the block, since infusing to it would allow attackers to instigate a withholding attack, in an attempt to re-org or DoS the chain.

Therefore, the main operation of the timelord involves keeping a cache of future blocks to infuse, broadcasting challenge points when they are reached, and infusing blocks when they reach their challenge points.

如果时间领主收到与当前峰值相同权重的挑战，他们会选择他们最先看到的未完成块（即尚未融入的块），而不是选择他们所看到的融合块（峰值）第一次看到。 这也抑制了扣留区块的积极性。
