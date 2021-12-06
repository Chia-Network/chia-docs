---
sidebar_position: 4
---

# 3.4 Challenges

The Chia consensus algorithm relies on timelords running VDFs for periods of time called sub-slots, which are adjusted periodically (and automatically) take around 10 minutes. During every sub-slot, challenges are released by timelords, and a sort of mini lottery starts, where farmers check their plots for proofs of space. When farmers find a proof of space that qualifies, they broadcast it to the network.

The difficulty adjusts automatically to target 32 winning proofs for the entire network in each sub-slot, or about one winner every 18.75 seconds on average (32 winners per 600 seconds). The winning proofs are infused into the VDF at different times within the sub-slot.

The consensus requires farmers to follow the heaviest chain, which is the chain that has the highest accumulated difficulty (usually the chain with the most blocks). 

<figure>
<img src="/img/challenges.png" alt="drawing"/>
<figcaption>
Figure 4: Three sub-slots. The x axis represents time. Dotted lines represent VDF execution, advancing in time from left to right. Arrows represent hash dependencies (an object which points to another object includes the hash of the second object). 
</figcaption>
</figure>

In figure 4, we can see three challenge points, c1, c2, and c3. At the these points timelords create challenges (256-bit hashes) which are provided as input to VDFs. Timelords take these hashes, and start computing a VDF on this challenge, for the specified number of iterations. In this example, each slot is 100,000,000 iterations. When the VDF is finished, the timelord publishes the new challenge and the proof of the VDF. An infusion of end-of-slot information happens at the end of each sub-slot.

**Sub-slot**: a segment of a fixed number of VDF iterations, subject to periodic work difficulty adjustments, which automatically target a time of 10 minutes.

**Sub-slot iterations**: determines how many VDF iterations each sub-slot must have. This number is periodically adjusted.

**Challenge**: a sha256 output string. It is used as a proof-of-space challenge for farmers’ plots. It is also used for the challenge chain VDF. This is also referred to as challenge hash.

As you can see in Figure 4, there are three VDFs being executed concurrently, each of which serves a different purpose. They are explained in detail in [Section 3.8](/docs/03consensus/three_vdf_chains "Section 3.8: Three VDF Chains").

In the networking protocol, the three VDF proofs are usually passed around together, in what is called an _end of sub-slot bundle_.
