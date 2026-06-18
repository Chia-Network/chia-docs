---
title: Intro
slug: /chia-blockchain/architecture/mempool/intro
---

The mempool (or memory pool) is a collection of transactions stored by full nodes, usually in memory, before they are confirmed on the blockchain. The mempool is not dictated by the consensus rules; a farmer can change how their mempool functions and customize the rules without permission from other full nodes.

The mempool is a required facet of Chia due to the decentralized nature of the blockchain. Transaction blocks occur approximately every 52 seconds, and it's impossible to predict who will win a block. Therefore, all transactions must be broadcast to the whole network and stored locally until they are confirmed. Additionally, it is normal to have more pending transactions than can fit in a single block, so the mempool also acts as a queue for inclusion into the blockchain.

For more information about the mempool, see our [blog post](https://www.chia.net/2024/01/12/getting-to-know-the-mempool-and-transaction-fees/) on this subject.

:::info
How many transactions can fit into a block? Due to the varying size of transactions, and the different definitions of what even counts as a "transaction," there is not an exact number. But just for a bit of rough guidance, approximately 1000 transactions with two inputs and two outputs, or 2000 transactions with one input and one output can fit into a single block.
:::

When a user makes a transaction, it gets sent to a full node, which then verifies it, adds it to the mempool, and broadcasts it to all of its peers. Therefore, transactions get propagated to the whole network in a very short period of time.
