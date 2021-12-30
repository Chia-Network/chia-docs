---
sidebar_position: 10
---

# 3.10 Foliage

In the above diagrams, there is no place for farmers to specify their rewards, since all blocks are canonical.
There is also no place to include transactions. What we have talked about so far, is the trunk of the blockchain.

Farmers have no say in how their block is constructed in the trunk, since they must use the exact proof of space, VDFs, and signatures that are specified.
In order to include farming rewards, as well as transactions in the system, we must introduce an additional component of blocks called foliage.

**Trunk**: The component of blocks and the blockchain which includes VDFs, proofs of space, PoS signatures, challenges,
and previous trunk blocks, and is completely canonical. The trunk never refers to the foliage chain.

**Foliage**: The component of blocks and the blockchain which includes specification of where rewards should go,
which transactions should be included, and what the previous foliage block is.
This is up to the farmer to decide and is grindable, so it can never be used as input to the challenges.

**Reorg**: A reorg (or reorganization) is when a node’s view of the peak changes, such that the old view contains a block that is not included in the new view (some block is reversed).
Both trunk and foliage reorgs are possible, but should be rare in practice, and low in depth.

In figure 11 below we can see that the foliage is added to blocks to produce an additional chain.
This foliage includes a hash of the previous foliage, a reward block hash, and a signature.
These foliage pointers are separate from the trunk chain, and not canonical.
That is, farmers could theoretically create a foliage reorg where foliage is replaced, but the exact same trunk (proofs of space and time) are used.
To prevent this, honest farmers only create one foliage block per block.
As soon as one honest farmer has added a foliage block, the foliage becomes impossible to reorg beyond
that height with the same PoSpace, since that farmer will not sign again with the same PoSpace. 

Furthermore, blocks like B3 which come parallel with another foliage block (B2)
do not have to sign the previous foliage block, since they do not necessarily have enough time to see it.
By “coming in parallel”, we mean that the second block’s signage point occurs before the first block infusion point.
The red arrows in the diagram represent a foliage pointer that is signed by the plot key for the proof of space in that block. 
The gray arrows represent a hash pointer which is not signed by the plot key (therefore the gray arrow in B3 can be replaced if B2 changes or is withheld).
This prevents attacks where B2 modifies their block and forces B3 to reorg. 

Blocks which have red pointers are also eligible to create transactions, and are therefore called transaction blocks.
__A block is a transaction block if and only if it is the first block whose signage point occurs after the infusion of the previous transaction block.__
sp3 comes before B2, (a transaction block, and the previous block of B3), so B3 cannot be a transaction block.
The red arrows provide security by burying foliage blocks, but the gray arrows do not.
The purpose of the gray arrows is to maintain a linked list in the foliage, and to reduce complexity in implementations. However, blocks with gray arrows pointing to them do get buried in the next-next block. 

<figure>
<img src="/img/foliage.png" alt="drawing" width="1400"/>
<figcaption>
Figure 11: Foliage blocks and blocks. Blocks have transactions and have red pointers (pointers to last block).
Note that the start of the sub-slot is also a signage point.
</figcaption>
</figure>

The block hash is a hash of the entire foliage and trunk block. 
Reorgs work on block hashes.
Even if we see a chain with the same proofs of space and time, as long as the foliages are different, the blocks are different.
Note that both farmers (B2 and B3) might have a chance to create the block, so they must both provide the signed pointer and transactions.
However, any transaction block can be included as a normal block as well, and since B2 and B3 are in parallel, only one of them can make a transaction block.

While all blocks still choose the puzzle hashes of where their rewards go, those transactions do not get included into the blockchain until the next transaction block. 

For the chia mainnet, there are 32 blocks every 600 seconds, for an average block time of 18.75 seconds.
There are be 64 signage points, so the minimum time between blocks is 3*600/64 = 28.125 seconds.
This puts the average transaction block time at 46.875 seconds. 
