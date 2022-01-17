---
sidebar_position: 4
---

# 3.4 Challenges

The Chia consensus algorithm relies on timelords running VDFs for periods of time called sub-slots, which are adjusted periodically to add up to take around 10 minutes. 
Every sub-slot, challenges are released by timelords, and a sort of mini lottery starts, where farmers check their plots for proofs of space.
When farmers find a proof of space that qualifies, they broadcast it to the network.
The difficulty changes to target 32 winning proofs for the entire network in each sub-slot, or about one winner every 18.75 seconds on average.
These proofs are infused into the VDF at different times within the sub-slot. Farmers follow the heaviest chain, which is the chain with the most cumulative difficulty on it (usually the chain with the most blocks). 

![](/img/challenges.png)

Figure 4: Three sub-slots. The x axis represents time. Dotted lines represent VDF execution, advancing in time from left to right. Arrows represent hash dependencies (an object which points to another object includes the hash of the second object). 

In figure 4, we can see three challenge points, c1, c2, and c3. At the points c1, c2, and c3 timelords create challenges (256 bit hashes) which are provided as input to VDFs. Timelords take these hashes, and start computing a VDF on this challenge, for the specified number of iterations. In this example, each slot is 100,000,000 iterations. When the VDF is finished, the timelord publishes the new challenge and the proof of the VDF. An infusion of end-of-slot information happens at the end of each sub-slot.

**Sub-slot**: a segment of a fixed number of VDF iterations, subject to work difficulty adjustment, always adjusting to target time of 10 minutes.

**Sub-slot iterations**: a constant which is periodically adjusted which determines how many VDF iterations each sub-slot must have.

**Challenge**: sha256 output string which is used as proof of space challenges for farmers’ plots, as well as for the challenge chain VDF. This is also referred to as challenge hash.

As you can see in Figure 4, there are three VDFs being executed concurrently, each which serve a different purpose. 
They are explained in the following sections.
In the networking protocol, the three VDF proofs are usually passed around together, in what is called a **end of sub slot bundle**.
