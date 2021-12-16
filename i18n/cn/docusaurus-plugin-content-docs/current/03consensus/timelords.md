---
sidebar_position: 13
---

# 3.13 时间领主算法

> Timelord Algorithm

时间领主会跟踪当前的峰值，其中包括某个高度处的注入块，以及从峰值开始的标志点。时间领主可能会收到要注入的新块、新的峰值（已经注入的块）或新的标牌点。

鉴于可用处理器数量有限，时间领主如何决定创建时间证明的挑战？虽然未来可能会开发 ASIC，但目前最快的类组 VDF 实现是在通用硬件上，因为类组 VDF 似乎是 FPGA 硬的。此外，即使在 ASIC 开发之后，重要的是任何拥有 CPU 的用户都可以成为时间领主，以在 ASIC 时间领主宕机或变得恶意等情况下提供回退。

一般来说，时间领主在最重的链条上工作。他们在标牌点创建时间证明，并在他们到达时将这些信息广播到网络。他们还尽可能频繁地注入块。当时间领主收到一个重量比当前峰值更大的注入块时，他们会立即切换到它。

Timelords 还并行运行三个 VDF 链。因此，至少需要 3 个快速 CPU 内核才能以有效的速度推进区块链。需要额外的 CPU 内核以有效的速度创建证明，但它们不必那么快。

如果时间领主收到的挑战权重低于他们当前的峰值，他们会忽略它。如果时间领主在当前链的后面收到一个挑战点，那么安全的做法是忽略它。原因是，通过在未来切换到更远的点，时间领主可能会跳过块的注入，从而孤立有效块。

如果时间领主收到一个迟到的注入块（我们已经到达应该注入块的挑战点），我们忽略这一点，因为切换到它会允许攻击者扣留块 。因此，时间领主的主要操作包括保留未来块的缓存以进行注入，在达到挑战点时广播挑战点，并在我们到达挑战点时注入块。

如果时间领主收到与当前峰值同等权重的挑战，他们会选择他们最先看到的未完成块（即尚未注入的块），而不是选择他们看到的注入块（峰值）第一的。这也阻碍了扣留区块。

<details>
<summary>原文参考</summary>


A timelord keeps track of the current peak which includes an infused block at a certain height, and signage points from the peak onwards. A timelord might receive new blocks to infuse, new peaks (blocks which are already infused), or new signage points. 

How does a timelord decide which challenges to create proofs of time on, given a limited number of available processors? While ASICs are likely to develop in the future, at the moment the fastest classgroup VDF implementations are on general purpose hardware as it appears that the classgroup VDF is FPGA hard. Furthermore, even after the development of ASICs, it’s important that any user with a CPU can be a timelord, to provide fallbacks in the case that the ASIC timelords go down, or become malicious, etc. 

In general, timelords work on the heaviest chain. They create proofs of time at the signage points, and broadcast these to the network as they reach them. They also infuse blocks as often as they can. When the timelord receives an infused block which has a greater weight than the current peak, they switch to it immediately. 

Timelords also run the three VDF chains in parallel. Therefore at least 3 fast CPU cores are necessary to advance the blockchain at an efficient rate. Extra CPU cores will be necessary to create proofs at an efficient rate, but they do not have to be as fast.

If the timelord receives a challenge with less weight than their current peak, they ignore it. 
If the timelord receives a challenge point later in the current chain, the safe thing to do is to ignore it. The reason is that by switching to a point further in the future, the timelord might be skipping infusal of blocks, and thus orphaning valid blocks. 

If the timelord receives a block for infusion which is late (we have already reached the challenge point at which the block should have been infused), we ignore this, since switching to it would allow attackers to withhold blocks [TODO expand]. Therefore the main operation of the timelord involves keeping a cache of future blocks to infuse, broadcasting challenge points when they are reached, and infusing blocks when we reach their challenge points.

If the timelord receives a challenge with equal weight as the current peak, they choose the unfinished block which they saw first (that is, the block that has not been infused yet), as opposed to choosing the infused block (peak) which they saw first. This also disincentivizes withholding of blocks.

</details>
