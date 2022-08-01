---
sidebar_position: 2
---

# 9.2 Plot IDs

A plot ID is a 32-byte value that is used as a deterministic seed to create an entire plot. In other words, two plots with the same plot ID will create byte-identical plot files. Plot IDs are public values that get put into Proof of Space objects.

A plot ID can be generated in one of two ways, depending on the desired farming method of the plot.

<figure>
<img src="/img/keys/plot_id.png" alt="drawing"/>
</figure>

1. Farm to pool public key. This method of farming is desirable if solo farming (no pools). To farm a plot like this, we hash together the pool public key and the plot public key (explained later). When successfully farming a block, the pool private key must sign the reward address. The drawback of this method is that if using a pool, the pool cannot be changed, and the plot is tied to the pool forever.

2. Farm to pool contract address. This method of farming is suitable for users who want to farm to a pool, and to be able to change pools in the future. Most farmers will likely use this method.

Instead of requiring a signature by the pool, rewards go straight into the puzzle hash (or address), that is encoded into the plot. This address is a smart contract controlled by the user, which specifies the user's current pool. The user can switch pools, with a timeout delay that the pool operator may customize (typically 30 minutes).

This approach requires creating a blockchain transaction of at least one mojo before farming. Farmers can get 100 mojos for free from the official [faucet](https://faucet.chia.net/ "Chia Network's official faucet").

The plot public key is explained in the next section.
