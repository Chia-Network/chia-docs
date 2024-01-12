---
title: Full Nodes
slug: /full-node-architecture
description: The core of Chia's peer-to-peer system is composed of full nodes. Full nodes have several responsibilities- maintaining a copy of the chia blockchain database, validating the chia blockchain database, propagating new blocks, transactions, and proofs through the network, using the peer protocol. Optionally full nodes serve light wallet clients, communicate with farmers, and communicate with timelords.
keywords:
  - chia
  - architecture
  - network
  - Full Node
  - database
  - blockchain
  - blocks
  - proofs
---

The core of Chia's peer-to-peer system is composed of full nodes. Full nodes have several responsibilities:

1. Maintain a copy of the blockchain.
2. Validate the blockchain.
3. Propagate new blocks, transactions, and proofs through the network, using the peer protocol.
4. (Optional) Serve light clients (wallets) through the wallet protocol.
5. (Optional) Communicate with farmers.
6. (Optional) Communicate with timelords.

Usually, farmers run a full node process alongside their farmer process. Full nodes earn no rewards or fees, but they are important to maintain the consensus rules and the security of the system. Running a full node allows a user to be confident about the full state of the blockchain, and avoid trusting others.

Full nodes are always connected to a random set of full nodes in the network. Full nodes broadcast their own information (IP address and port) to their peers periodically, so that the entire network is aware that they are still running. Full nodes also broadcast all new blocks and transactions to their peers, allowing all nodes in the network to keep a complete copy of the blockchain.
