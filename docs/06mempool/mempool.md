---
sidebar_position: 1
---

# Mempool

The mempool (or memory pool) is a collection of transactions stored by full nodes, usually in memory, before they
are confirmed on the blockchain. The mempool is not dictated by the consensus rules; a farmer can change how their
mempool functions and customize the rules without permission from other full nodes.

The reason the mempool exists, is that blocks aproximately every 47 seconds, and it's impossible to predict who will
win a block, so transactions must be broadcast to the whole network and kept around until they are confirmed. Furthermore,
it is normal for there to be more transactions happening that can fit in a block, so the mempool also acts as a queue
for inclusion into the blockchain.
