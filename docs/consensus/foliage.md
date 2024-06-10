---
title: Foliage
slug: /consensus-foliage
---

In the previous diagrams, there is no place for farmers to specify their rewards, since all blocks are canonical.
There is also no place to include transactions. Everything we have talked about so far is known as the _trunk_ of the blockchain.

Farmers have no say in how their block is constructed in the trunk, since they must use the exact proof of space, VDFs, and signatures that are specified.
In order to include farming rewards, as well as transactions, in the system, we must introduce an additional component to the reward chain called _foliage_.

**Trunk**: The component of blocks and the blockchain which includes VDFs, proofs of space, PoSpace signatures, challenges, and previous trunk blocks, and is completely canonical. The trunk includes each of the [three VDF chains](/three-vdf-chains), but it never refers to the foliage.

**Foliage**: An extension of the blocks produced in the reward chain. A block's foliage includes the specification of where rewards should go, which transactions should be included, and what the previous block's foliage is.

:::info

Foliage provides a separation between the transactions and the consensus.

A given block's farmer decides what is included in the foliage, thereby allowing the farmer to grind on its contents. If the transactions and the consensus were not separated, a farmer could grind on the foliage in order to gain an unfair edge in the consensus, which would allow them to win more blocks. For this reason, the foliage is kept separate from the consensus, and it can never be used as input to the challenges.

It is also important to note that in the implementation, when a farmer submits a block, the trunk and foliage are both submitted together -- the two pieces are not calculated and submitted at separate times. The reason we emphasize the separation of the transactions and the consensus is because the farmer may not modify a block's trunk, but retains total control over the foliage.

:::

**Re-org**: A re-org (or reorganization) is when a node's view of the peak changes, such that the old view contains a block that is not included in the new view (one or more blocks have either been removed, or have changed order). Both trunk and foliage re-orgs are possible, but should be rare in practice, and low in depth.

In figure 11 below we can see that the foliage is added to the blocks formed in the reward chain. This foliage includes a hash of the previous foliage, a reward block hash, and a signature. These foliage pointers are separate from the trunk chain, and are not canonical. That is, farmers could theoretically create a foliage re-org where foliage is replaced, but the exact same trunk (proofs of space and time) are used.

To prevent a foliage re-org, honest farmers only create one set of foliage per block. As soon as one honest farmer has added foliage to a block, the foliage becomes impossible to re-org beyond that height with the same PoSpace, since that farmer will not sign again with the same PoSpace.

Furthermore, blocks like B3, which come parallel with the foliage of another block (B2), do not have to sign the previous block's foliage, since they do not necessarily have enough time to see it.

:::info

By "coming in parallel", we mean that the second block's signage point occurs before the first block's infusion point.

:::

The red arrows in the diagram represent a foliage pointer that is signed by the plot key for the proof of space in that block. The gray arrows represent a hash pointer which is not signed by the plot key (therefore the gray arrow in B3 can be replaced if B2 changes or is withheld). This prevents attacks where B2 modifies their block and forces B3 to re-org.

Blocks which have red pointers are also eligible to create transactions, and are therefore called transaction blocks.

**A block is a transaction block if and only if it is the first block whose signage point occurs after the infusion of the previous transaction block.**

In the diagram, sp3 comes before B2, (a transaction block, and the previous block of B3), so B3 cannot be a transaction block.

The red arrows provide security by burying foliage, but the gray arrows do not. The purpose of the gray arrows is to maintain a linked list in the foliage, and to reduce complexity in implementations. However, foliages with gray arrows pointing to them do get buried in the next-next block.

<figure>
<img src="/img/foliage.png" alt="drawing" width="1400"/>
<figcaption>
Figure 11: Foliage and trunk blocks. Blocks B1, B2, and B4 have transactions and have red pointers (pointers to last block). Note that the start of the sub-slot is also a signage point.
</figcaption>
</figure>

The block hash is a hash of the entire foliage and trunk block. Re-orgs work on block hashes. Even if we see a chain with the same proofs of space and time, as long as the foliages are different, the blocks will have different hashes.

Note that the farmers of blocks B2 and B3 might both have a chance to create the block, so they must both provide the signed pointer and transactions. However, any transaction block can be included as a normal block as well, and since B2 and B3 are in parallel, only one of them can make a transaction block.

While all blocks still choose the puzzle hashes of where their rewards go, those transactions do not get included into the blockchain until the next transaction block.

### Transaction Block Time

The average time between transaction blocks is 52 seconds. Several values are required to calculate this average:

- Sub-slot time = 600 seconds
- Signage point time = 64 per sub-slot, or 600/64 = 9.375 seconds
- Average block time = 32 per sub-slot, or 600/32 = 18.75 seconds
- Minimum signage points from current signage point until infusion_iterations is reached = 3 (See the [Signage and Infusion Points page](/signage-and-infusion-points) for more info.)
- Minimum time for infusion_iterations to be reached (and therefore, minimum time between transaction blocks) = 3 \* (600/64) = 28.125 seconds
- Average signage points until infusion_iterations is reached is slightly more than 3.5 (must wait 3 signage points, plus an average wait of about 50% of the next signage point), or around 3.5 \* 9.375 = 32.8125 seconds.
- To create a transaction block, infusion_iterations first must be met, and then the next block some seconds afterwards will be a transaction block. The total average time for this to happen is around 52 seconds.
- The formal equation is <img src="/img/block-time-calc.png" alt="(1/(e^(0.5)-1)+4)*9.375" width="200"/> or `(1/(e^(0.5)-1)+4)*9.375` which equals 51.95 seconds.

The time between transaction blocks was deliberately chosen for a specific game-theoretic reason: If transaction blocks occurred at the same rate but there were no empty blocks between them, re-orgs and bribery attacks would be easier to pull off.

Additionally, the fact that there are empty blocks between transaction blocks provides several benefits:

- If blocks were created at the same rate and all of them contained transactions, low-power machines such as the Raspberry Pi wouldn't be able to keep up with the chain and therefore wouldn't be supported.
- Empty blocks can also help dampen the effect of the chain slowing down, for example during a dust storm.
- Finally, empty blocks help to smooth farmers' rewards.
