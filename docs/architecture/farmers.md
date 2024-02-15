---
title: Farmers
slug: /farmer-architecture
description: Farmers operate by waiting for updates from a full node, which gives them new signage points (equivalent to a winning bingo card) approximately every nine seconds.
keywords:
  - chia
  - architecture
  - network
  - Full Node
  - farmer
  - proofs of space
  - signage points
  - protocols
  - harvester
---

Chia's farmers are analogous to Bitcoin's miners. They earn block rewards and fees by finding valid [proofs of space](/proof-of-space) inside their stored plots. The farmer processes don't maintain a copy of the blockchain, but they trust a full node to provide updates. The full node and farmer processes communicate with each other using the farmer protocol.

Farmers communicate with harvesters (individual machines, including the farmer machine, that actually store the plots) through the [harvester protocol](/harvester-protocol).

Farmers operate by waiting for updates from a full node, which gives them new signage points (equivalent to a winning bingo card) approximately every nine seconds. Farmers then send the signage point to each harvester, to check whether any winning proofs of space exist. If the harvester finds any valid proofs, it sends them to the farmer, which separates them into two categories:

- Full proofs must match or surpass the quality required by the network's difficulty level. These proofs are sent to the full node, which then creates a new block.
- Partial proofs are used by pools to approximate a node's total storage.

Farmers also have a [private key](/bls-keys), which is used for both signing blocks when a winning proof is found, as well as for signing partial proofs, which are then sent to pools.
