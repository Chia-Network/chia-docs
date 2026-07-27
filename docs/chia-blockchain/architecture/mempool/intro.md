---
title: Intro
slug: /chia-blockchain/architecture/mempool/
---

The mempool (a portmanteau of "memory pool") is a collection of transactions stored by full nodes, usually in memory, before they are confirmed on the blockchain. 

:::info
### Default Mempool

The mempool is not dictated by the consensus rules; a farmer can change how their personal mempool functions and customize the rules without obtaining any permissions. Farmers can even decline to use a mempool altogether.

However, the majority of farmers opt to use the default mempool, which ships with the default farming software. The documentation in the following pages therefore only pertains to this version.

While you may be tempted to simplify your mental model of the mempool by thinking of the _default_ as the _only_ version, do keep in mind that some farmers will, in fact, use a customized version that doesn't follow all of (or any of) the logic discussed here.

:::

The mempool is a recommended facet of Chia due to the decentralized nature of the blockchain. Transaction blocks occur approximately every 52 seconds, and it's impossible to predict who will win a block. Therefore, all transactions must be broadcast to the whole network and stored locally until they are confirmed. Additionally, it is normal to have more pending transactions than can fit in a single block, so the mempool also acts as a queue for inclusion into the blockchain.

For more information about the mempool, see our [blog post](https://www.chia.net/2024/01/12/getting-to-know-the-mempool-and-transaction-fees/) on this subject.

:::info
How many transactions can fit into a block? Due to the varying size of transactions, and the different definitions of what even counts as a "transaction," there is not an exact number. But just for a bit of rough guidance, approximately 1000 transactions with two inputs and two outputs, or 2000 transactions with one input and one output can fit into a single block.
:::

When a user makes a transaction, it gets sent to a full node, which then verifies it, adds it to the mempool, and broadcasts it to all of its peers. Therefore, transactions get propagated to the whole network in a very short period of time.

### Updates

After a new block is added to the blockchain, all full nodes must look at the coins that were spent in that new block, and remove them from the mempool. The full node does not need to reapply every transaction again, since Chia coin spends are deterministic and sandboxed (see the [Coin Set Intro page](/chia-blockchain/coin-set-model/intro) for more information). The full node only needs to look at the spent coins in the new block, and if there are any transactions that spend one of those coins, they are removed from the mempool. This means the mempool can be very large, the codebase can be simple, and high performance can be achieved.