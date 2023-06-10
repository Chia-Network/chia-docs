---
title: Multiple Blocks
slug: /consensus-multiple-blocks
---

<figure>
<img src="/img/multiple-blocks.png" alt="drawing"/>
<figcaption>
Figure 7: multiple blocks. Sp1 = signage point 1
</figcaption>
</figure>

As you can see in Figure 7, multiple blocks can get infused into the same sub-slot. Chia's system targets one block every 18.75 seconds on average (32 blocks per sub-slot), and this is adjusted every 4608 blocks (around 24 hours) through the work difficulty algorithm.

VDF proofs span:

- from the previous infusion point before the current signage point to the current signage point, and
- from the previous infusion point to the current infusion point. This means that the VDF proofs required for each block can overlap.

In the example in Figure 7, B2 contains a VDF proof from B1 to sp2, and from B1 to B2. B3 contains a proof from B1 to sp3, and from B2 to B3. B2 does not depend at all on B3, but B3 depends on B2, since its VDF is from B2's infusion point.

As discussed in [Signage and Infusion Points page](/signage-and-infusion-points), the blocks get created at the signage points, but they are missing the infusion point VDF. Once this VDF is added, the block is finished, and forms part of the blockchain.

The signatures get created and added by the farmers at the signage points, and broadcast to the whole network. There are no signatures at the infusion point; the only things added at the infusion point are the VDFs.

Finally, note that there can be multiple winners at the same signage point, all of which can be included into the blockchain. That would be the case in the diagram, if `sp2 == sp3`. The one which gets included first is the one with the lower `required_iters`, and thus earlier infusion point.

You may be wondering what happens if a farmer makes a copy of a plot and the plot becomes eligible for infusion. Do the plots each win a block reward? No -- two blocks get created, but only one will be infused. The full nodes will only propagate the first copy of the block they see. The timelord node is ultimately connected to exactly one full node, so even if multiple identical blocks make it to that full node, they will not both be sent to the timelord for infusion.

It is possible (albeit very unlikely) for two non-identical blocks to have the same infusion point, even though their hashes don't match. In this case, the full nodes will reject the second block they receive because each block must have total_iters > prev block total_iters.
