---
title: Updates
slug: /chia-blockchain/architecture/mempool/updates
---

After a new block is added to the blockchain, all full nodes must look at the coins that were spent in that new block, and remove them from the mempool. The full node does not need to reapply every transaction again, since Chia coin spends are deterministic and sandboxed (see the [Coin Set Intro page](/chia-blockchain/coin-set-model/intro) for more information). The full node only needs to look at the spent coins in the new block, and if there are any transactions that spend one of those coins, they are removed from the mempool. This means the mempool can be very large, the codebase can be simple, and high performance can be achieved.
