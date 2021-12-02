---
sidebar_position: 8
---

# 3.8 Three VDF Chains
If we only used one VDF (for the reward chain), the inclusion or exclusion of blocks would allow control of the challenge for the next slot. This means that an attacker could try many different combinations of blocks, and choose the challenge that suits them best, to obtain more wins in the next slot.

These types of attacks are called grinding attacks, and they are one of the main difficulties of changing from Proof of Work to Proof of Space or PoStake. More detail is provided in the “Attacks and countermeasures” section. [TODO link]

To mitigate this, the challenges will be based only on the first block to be infused in a slot.

<figure>
<img src="/img/multiple_chains.png" alt="drawing"/>
<figcaption>
Figure 8: The three VDF chains for 1+ challenges.
          cc = challenge chain, ic = infused challenge chain, rc = reward chain,
          sp = signage point, B = block, c = challenge, r = reward

An attacker can manipulate the reward chain results but this has no effect on c2, and therefore has no effect on the PoSpace lottery.
</figcaption>
</figure>

There is a lot going on in this diagram! Let's break it down.

There are 4 **blocks**: B1, B2, B3, and B4. Farmers create these blocks. The blocks have pointers (the arrows), and the data the pointers are pointing to is all contained within the blocks themselves. At least 16 blocks have been created in the diagram's sub-slot, but we don’t draw all of them due to space constraints.

The challenge chain and the reward chain each create 64 signage points, released every 9.375 seconds (on average) by timelords. Blocks must include the signage point VDFs (which mark the signage points) for both chains. Blocks must also include the infusion point VDFs for all three chains. 

The challenge chain broadcasts the challenges (c1 and c2). The chain also executes the VDF from the start of the sub-slot to the end with nothing infused into it (the circles are VDF proofs but they do not interrupt the VDF). That is, in the challenge chain, the "lottery" is completely pre-determined, and not affected by blocks in the slot, until the end of the slot.

The reward chain infuses every block that is included. 

The chain in the middle is called the **infused challenge chain**. It starts at the first infused block for each challenge, and goes on until the end of the slot. 

A **slot** is the list of sub-slots which contain at least 16 reward-chain blocks based on the challenge of the first sub-slot, or later sub-slots.

For example, we may have only 10 blocks in a sub-slot, and then 3 and then 7, which means those three sub-slots form one slot. Usually each sub-slot is also a slot, since more than 16 blocks are included on average. The **deficit** is the number of blocks still necessary to end the slot: this is described later in more detail.

At the end of the slot, the challenge chain is combined with the infused challenge chain to generate the new challenge c2, which is used to start the challenge chain for the next sub-slot. 

The only block which affects the challenge chain (and thus the PoSpace lottery) is the first block in the slot, which here is B1. In fact, it's only a deterministic part of B1 called "cc B1", which only depends on challenge chain data. An attacker who wants to grind cannot change the challenge by withholding B2, B3, or any other block apart from the first one. 

An honest farmer who holds the first block (B1) will release it. If an attacker controls the first block (B1), they have two additional options: delay it or withhold it.
* Delay it: In order to know whether the new challenge will benefit them, they will need to execute the VDF all the way up to c2. By that time, their chance to get included in the reward chain is gone, since honest farmers sign only one block per proof of space.
* Withhold it: This does not provide much benefit to the attacker, since they must release it before sp2 in order to get the farmers on their chain. Farmers will choose the heaviest chain, which is the one with the most (heaviest) reward chain blocks.

Why do we commit to any blocks at all in the challenge chain? If we did not, an attacker with a faster VDF could look ahead, since they would not need the help of honest participants in order to compute the challenge chain into the future. The challenge chain would be totally deterministic. This would enable some advantage by replotting. Furthermore, the challenge chain can be used to probabilistically prove the weight of the reward chain to light clients, without sharing all reward chain blocks (since the challenge chain depends on the “best” block in the slot, you can calculate the number of reward chain blocks).

For a block to be considered valid, it has to provide VDFs for the challenge chain and reward chain, and optionally for the infused challenge chain if it is present. Forcing all VDFs to be included means that all three chains are guaranteed to move forward at the same rate.

## Definitions

**Challenge chain**: The VDF chain based on each challenge for each sub-slot, which does not infuse anything in the middle of each sub-slot. The challenges are also used for the proofs of space. The signage points in this chain are used for the SP filter.

**Reward chain**: The VDF chain that contains infusions of all blocks. This chain pulls in the challenge chain, and optionally, the infused challenge chain at the end of each sub-slot.

**Infused challenge chain**: A VDF chain which starts at the first block infused in a slot (which is not based on the previous slot’s challenge, this is called the challenge block) and ends at the end of the slot. 
This increases security by preventing VDF lookahead attacks.

**Slot**: the list of sub-slots which contain at least 16 reward-chain blocks based on the challenge of the first sub-slot, or later sub-slots. At the end of the slot, the infused challenge chain stops, the challenge chain pulls in the result of the infused challenge chain, and the deficit is reset to 16.

**Block**: a block is a collection of data infused into the rewards chain which contains: a proof of space for a challenge hash with less iterations than the slot iterations, sp and ip VDFs for both chains, optional ip VDF for the infused challenge chain, and a rewards address. Some blocks are also transaction blocks. There is a maximum of 128 blocks per slot.

**Transaction Block**: A block that is eligible to create transactions, along with an associated list of transactions.

**Challenge block**: The first block to be infused in each slot, which is not based on a previous slot's challenge. The challenge block always has a deficit of 15, and always starts off the infused challenge chain. 

**Peak**: The peak of the blockchain as seen by a node is the block with the greatest weight. Weight is the sum of the difficulty of a block and all its ancestors, which is similar to height, but a shorter chain can have heavier weight, due to difficulty adjustments.