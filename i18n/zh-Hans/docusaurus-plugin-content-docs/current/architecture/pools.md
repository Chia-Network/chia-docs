---
title: 矿池
slug: /pool-architecture
---

Pools allow farmers to smooth out their rewards by earning based on proof of space partials, as opposed to winning blocks.

Pools require the use of portable plots. These plots are tied to a plot NFT that the farmer must create. This NFT sits on Chia's blockchain, and it allows users to switch between pools.

Pools create and spend **coinbase transactions**, but in Chia's pool protocol they do not actually choose the contents of blocks. This gives more power to farmers and thus decreases the influence of centralized pools.

Farmers periodically send partials, which contain a proof of space and a signature, to pools. The pools use these partial proofs to determine how much space the farmers have dedicated, which in turn determines the farmer's portion of the reward when the pool wins a block.

When a farmer who is a member of a pool wins a block, 7/8 of the reward goes to the pool, which is later distributed to the participants. The farmer keeps the other 1/8 of the reward. This was an intentional design decision. If a farmer didn't receive a direct reward for creating a block, the operator of a competing pool might have had a financial incentive to join a pool (that they didn't run) with a large number of plots, and neglect to create a block when they found a valid proof, thereby spoiling the competing pool.

:::info
For more info, see our [Pool Farming page](/pool-farming), as well as this site's [Pool Protocol page](/pool-protocol) page.
:::
