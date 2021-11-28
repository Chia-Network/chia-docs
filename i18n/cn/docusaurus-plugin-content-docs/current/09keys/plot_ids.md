---
sidebar_position: 2
---

# 9.2 Plot IDs



A plot id is a 32 byte value that is used as a deterministic seed to create an entire plot. 
Two plots with the same plot id will create byte-identical plot files. 
Plot ids are public values that get put into proof of space objects.

A plot id can be generated in one of two ways, depending on the desired farming method of the plot. 

<figure>
<img src="/img/keys/plot_id.png" alt="drawing"/>
</figure>


1. Farm to pool public key. This method of farming is desirable if either solo farming (no pools), or starting to 
farm without any chia.
   To farm a plot like this, we hash together the plot public key (explained later), and the pool public key.
   When successfully farming a block, the pool private key must sign the reward address. 
   The drawback of this method is that if using a pool, the pool cannot be changed, and the plot is tied to the 
   pool forever.

2. Farm to pool contract address. This method of farming is suitable for users who want to farm to a pool, but also
be able to change the pool that they belong to in the future. Instead of requiring a signature by the pool, rewards
   go straight into the puzzle hash (or address), that is encoded into the plot. This address is a smart contract
   controlled by the user, which specifies the user's current pool. The user can switch the pool, with a certain 24 hour time delay, which will 
   re-route all new rewards to the new pool (not implemented yet). The drawback of this approach is that it requires
   creating a blockchain transaction before farming. Therefore a user must have chia before starting to farm.

Therefore, compromising the harvester does not allow an attack to redirect rewards. The plot public key is explained
in the next section.

