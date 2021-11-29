---
sidebar_position: 7
---

# 3.7 Multiple Blocks

<figure>

![](/img/multiple_blocks.png)

<figcaption>
Figure 7: multiple blocks. Sp1 = signage points 1
</figcaption>
</figure>


As you can see in figure 7, multiple blocks can get infused into the same sub-slot.
Chia’s system targets one block every 18.75 seconds on average, and this is adjusted through the work difficulty algorithm. 
VDFs go from the previous infusion point to the current signage point and from the previous infusion point to the current infusion point.
Note that the VDF proofs required for each block can overlap. 

For example, B2 contains a VDF proof from B1 to sp2, and from B1 to B2. B3 contains a proof from B1 to sp3, and from B2 to B3.
B2 does not depend at all on B3, but B3 depends on B2, since its VDF is from B2’s infusion point. 
Again, the blocks get created at the signage points, but they are missing the infusion point VDF; once this VDF is added, the block is finished, and forms part of the blockchain. 
The signatures get created and added by the farmers at the signage points, and broadcast to the whole network.
There are no signatures at the infusion point; the only things added at the infusion point are the VDFs. 

Finally, note that multiple winners can happen at the same signage point, and they can both be included into the blockchain.
That would be the case in the diagram, if `sp2 == sp3`. The one which gets included first is the one with the lower
`required_iters`, and thus earlier infusion point.