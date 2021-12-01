---
sidebar_position: 5
---

# 3.5 Signage Points and Infusion Points

Each sub-slot in both the challenge chain and the reward chain is divided into 64 smaller VDFs. Between each of these smaller VDFs is a point called a **signage point**. Timelords publish the VDF output and proof when they reach each signage point.

  Note that the challenge and reward chains both have signage points. The infused challenge chain, however, does not.
  
The signage points occur every 9.375 seconds (64 signage points per 600-second sub-slot). The number of iterations between each signage point is **sp interval iterations**, which is equal to sub-slot iterations / 64.

The challenge at the start of the sub-slot is also a valid signage point. As each of the 64 signage points in the sub-slot is reached, those points are broadcast, starting from the fastest timelord's full node, and propagating to every other full node on the network.

Farmers receive these signage points and compute a hash for each plot, at each signage point. If the hash start with 9 zeros, the plot passes the filter for that signage point, and can proceed. This disqualifies around 511/512 of all plot files in the network, for that signage point. The formula to compute the filter hash is:

```plot filter bits = sha256(plot id + sub slot challenge + cc signage point)```

The proof of space challenge is computed as the hash of the plot filter bits:

`PoS challenge = sha256(plot filter bits)`

Using this challenge, the farmers fetch quality strings for each plot that made it past the filter from disk. Recall that this process requires around 8 random disk seeks, which takes around 80 ms on a slow HDD. The quality string is a hash derived from part of the proof of space (but the whole proof of space has yet to be retrieved).

The farmer computes the **required iterations** for each proof of space. If the required iterations < signage point interval iterations (which was 100,000,000/64 = 1,562,500 in our [previous example](/docs/03consensus/callenges "Section 3.4: Challenges")), the proof of space is eligible for inclusion into the blockchain. At this point, the farmer fetches the entire proof of space from disk (which requires 64 disk seeks, or 640 ms on a slow HDD), creates an unfinished sub-block, and broadcasts it to the network.

  Note that the vast majority of required iterations will be far too high, since on average 32 will qualify for the whole network for each 10-minute sub-slot. This is a random process so it's possible for a large number of proofs to qualify, but very unlikely. The signage point iterations is the number of iterations from the start of the sub-slot to the signage point.

The exact method for required iterations is the following:

```python
sp_quality_string = sha256(quality_string + cc_signage_point)
required_iterations = (difficulty
    * difficulty_constant_factor
    * int.from_bytes(sp_quality_string, "big", signed=False)
    // pow(2, 256) * expected_plot_size(size))
```
The difficulty constant factor is based on the initial constants of the blockchain, for chia it is `2^67`. The difficulty varies per epoch. As you can see, the **sp_quality_string** is converted into a random number between 0 and 1, by dividing it by `2^256`, and then multiplied by the plot size.

For consensus purposes, the `expected_plot_size` is `((2 * k) + 1) * (2 ** (k - 1)).`, where k>=32<50. The actual plot size is that value times a constant factor, in bytes.

This is because each entry in the plot is around `k+0.5` bits, and there are around `2^(k)` entries.

The **infusion iterations** is the number of iterations from the start of the sub-slot at which the block with at least the required quality can be included into the blockchain. This is calculated as:

`
infusion iterations =( signage point iterations + 3 * sp interval iterations + required iterations)  %  sub slot iterations
`

Therefore, the infusion iterations will be between 3 and 4 signage points after the current signage point. Farmers must submit their proofs and blocks before the infusion point is reached. The modulus is there to allow overflows into the next sub-slot, if the signage point is near the end of the sub-slot. This is expanded on later.

  More information on infusion points is available in [Section 3.3](/docs/03consensus/vdfs "Section 3.3: VDFs")

At the infusion point, the farmer's block gets combined with the infusion point VDF output. This creates a new input for the VDF from that point on, i.e. we infuse the farmer’s block into the VDF. The block is only fully valid after infusion iterations has been reached, and the VDF proof has been attached to the block.

For the b1 block to be valid/finished, two VDF proofs must be included: one from r1 to the signage point and one from r1 to b1. (actually it’s more since there are three VDF chains, explained later).  In Figure 5, the farmer creates at the time of the signage point, (let’s call it B1’). However, B1’ is not finished yet, since it needs the infusion point VDF. Once the infusion iterations VDF is released, it is added to B1’ to form the finished block at B1.
<figure>
<img src="/img/signage_points.png" alt="drawing"/>
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

## Defitions

**Quality string**: A small part of the proof of space, 2 *x values* out of the total 64 *x values*, which can be retrieved
efficiently from disk, and which values to fetch is determined by the signage point.

**sp quality string**: A hash of the quality string concatenated with the challenge chain signage point. This hash is 
what ultimately decides the "luck" of a certain proof, and whether it has low or high required_iters.

**Sp interval iterations**: Defined as floor(sub-slot iterations / 64).

**Signage points**: 64 intermediary points in time within a sub-slot in the challenge and reward chains, for which VDFs are periodically released. At each signage point, a VDF output is created and broadcast through the network. The first signage point in the sub-slot is the challenge itself. Each block has a signage point such that the proof of space in the block must be eligible for that signage point.

**Required iterations**: A number computed using the quality string, used to choose proofs of space which are eligible to make blocks. The vast majority of proofs of space will have required iterations which are too high, and thus not eligible for inclusion into the chain. This number is used to compute the infusion point.

**Infusion point**: the point in time at infusion iterations from the challenge point, for a proof of space with a certain challenge and infusion iterations. At this point, the farmer’s block gets infused into the reward chain VDF. The infusion point of a block is always between 3 and 4 signage points after the signage point of that block. Computed as signage point iterations + 3 * sp interval iterations + required iterations.

 
The delay between the signage point and infusion point has many benefits, including defense against orphaning and selfish farming, decreased forks, and no VDF pauses. This delay of around 30 seconds is given so that farmers have enough time to sign without delaying the slot VDF. Well behaving farmers sign only one signage point with each proof of space, meaning that attackers cannot easily reorg the chain.
