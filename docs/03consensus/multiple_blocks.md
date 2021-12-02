---
sidebar_position: 7
---

# 3.7 Multiple Blocks

<figure>
<img src="/img/multiple_blocks.png" alt="drawing"/>
<figcaption>
Figure 7: multiple blocks. Sp1 = signage points 1
</figcaption>
</figure>

As you can see in Figure 7, multiple blocks can get infused into the same sub-slot. Chia’s system targets one block every 18.75 seconds on average (32 blocks per sub-slot), and this is adjusted every 4608 blocks (around 24 hours) through the work difficulty algorithm.

VDF proofs span:
* from the previous infusion point before the current signage point to the current signage point, and
* from the previous infusion point to the current infusion point.
This means that the VDF proofs required for each block can overlap. 

In the example in Figure 7, B2 contains a VDF proof from B1 to sp2, and from B1 to B2. B3 contains a proof from B1 to sp3, and from B2 to B3. B2 does not depend at all on B3, but B3 depends on B2, since its VDF is from B2’s infusion point. 

As discussed in [Section 3.5](/docs/03consensus/signage_point_and_infusion_points "Section 3.5: Signage Points and Infusion Points"), the blocks get created at the signage points, but they are missing the infusion point VDF. Once this VDF is added, the block is finished, and forms part of the blockchain. 

The signatures get created and added by the farmers at the signage points, and broadcast to the whole network.
There are no signatures at the infusion point; the only things added at the infusion point are the VDFs. 

Finally, note that multiple winners can happen at the same signage point, and they can both be included into the blockchain. That would be the case in the diagram, if `sp2 == sp3`. The one which gets included first is the one with the lower `required_iters`, and thus earlier infusion point.

However, if two blocks have the same infusion point, then they must have both been created with the same proof of space. This means they came from identical plots, which is not permitted. The timelord will only accept the first block it received.