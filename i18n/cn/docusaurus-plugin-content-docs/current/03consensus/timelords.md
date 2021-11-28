---
sidebar_position: 13
---

# 3.13 Timelord Algorithm

A timelord keeps track of the current peak which includes an infused block at a certain height, and signage points from the peak onwards. A timelord might receive new blocks to infuse, new peaks (blocks which are already infused), or new signage points. 

How does a timelord decide which challenges to create proofs of time on, given a limited number of available processors? While ASICs are likely to develop in the future, at the moment the fastest classgroup VDF implementations are on general purpose hardware as it appears that the classgroup VDF is FPGA hard. Furthermore, even after the development of ASICs, it’s important that any user with a CPU can be a timelord, to provide fallbacks in the case that the ASIC timelords go down, or become malicious, etc. 

In general, timelords work on the heaviest chain. They create proofs of time at the signage points, and broadcast these to the network as they reach them. They also infuse blocks as often as they can. When the timelord receives an infused block which has a greater weight than the current peak, they switch to it immediately. 

Timelords also run the three VDF chains in parallel. Therefore at least 3 fast CPU cores are necessary to advance the blockchain at an efficient rate. Extra CPU cores will be necessary to create proofs at an efficient rate, but they do not have to be as fast.

If the timelord receives a challenge with less weight than their current peak, they ignore it. 
If the timelord receives a challenge point later in the current chain, the safe thing to do is to ignore it. The reason is that by switching to a point further in the future, the timelord might be skipping infusal of blocks, and thus orphaning valid blocks. 

If the timelord receives a block for infusion which is late (we have already reached the challenge point at which the block should have been infused), we ignore this, since switching to it would allow attackers to withhold blocks [TODO expand]. Therefore the main operation of the timelord involves keeping a cache of future blocks to infuse, broadcasting challenge points when they are reached, and infusing blocks when we reach their challenge points.

If the timelord receives a challenge with equal weight as the current peak, they choose the unfinished block which they saw first (that is, the block that has not been infused yet), as opposed to choosing the infused block (peak) which they saw first. This also disincentivizes withholding of blocks.
