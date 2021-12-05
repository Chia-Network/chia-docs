---
sidebar_position: 1
---

# 2.1 Peer to Peer system


![chia-architecture](/img/chia-network-architecture.png)

The above diagram shows Chia's network architecture. A single machine can run more than one of these processes. In fact, the default configuration is to run four processes together: farmer, full Node, harvester, and wallet. Many farmers will also choose to run the Electron GUI and pool processes. Additionally, a few farmers, especially those with multi-PiB farms, will choose to run a timelord.

Let's discuss each of these processes, and the protocols that connect them, separately.

## Full Nodes
The core of Chia's peer-to-peer system is composed of full nodes. Full nodes have several responsibilities:
1. Maintain a copy of the blockchain.
2. Validate the blockchain.
3. Propagate new blocks, transactions, and proofs through the network, using the peer protocol.
4. (Optional) Serve light clients (wallets) through the wallet protocol.
5. (Optional) Communicate with farmers.
6. (Optional) Communicate with timelords.

Usually, farmers run a full node process alongside their farmer process. Full nodes earn no rewards or fees, but they are important to maintain the consensus rules and the security of the system. Running a full node allows a user to be confident about the full state of the blockchain, and avoid trusting others.

Full nodes are always connected to a random set of full nodes in the network. Full nodes broadcast their own information (IP address and port) to their peers periodically, so that the entire network is aware that they are still running. Full nodes also broadcast all new blocks and transactions to their peers, allowing all nodes in the network to keep a complete copy of the blockchain.


## Farmers
Chia's farmers are analogous to Bitcoin's miners. They earn block rewards and fees by finding valid proofs of space inside their stored plots. The farmer processes don't maintain a copy of the blockchain, but they trust a full node to provide updates. The full node and farmer processes communicate with each other using the farmer protocol.

Farmers communicate with harvesters (individual machines, including the farmer machine, that actually store the plots) through the harvester protocol.

Farmers operate by waiting for updates from a full node, which gives them new signage points (equivalent to a lottery's winning numbers) approximately every 9 seconds. Farmers then send the signage point to each harvester, to check whether any winning proofs of space exist. If the harvester finds any valid proofs, it sends them to the farmer, which separates them into two categories:
* Full proofs must match or surpass the quality required by the network's difficulty level. These proofs are send to the full node, which then creates a new block.
* Partial proofs are used by pools to approximate a node's total storage.

Farmers also have a private key, which is used for both signing blocks when a winning proof is found, as well as for signing partial proofs, which are then sent to pools.


## Harvesters
Harvesters are individual machines controlled by a farmer. In a large farming operation, a farmer may be connected to many harvesters.

Harvesters control the actual plot files by retrieving qualities or proofs from disk. The minimum plot size (and by far the most common) is k32, which corresponds to around 100 GiB. With each increment of a k-value, the plot size roughly doubles, so a k33 plot is around 200 GiB, k34 is around 400 GiB, etc.

Given the network's difficulty level at a given time, for each two signage points (a random 32-byte number), the network is expected to contain one proof of space. This is an average value -- there can also be zero or multiple proofs.

Given a plot, the harvester must perform two tasks to find a valid proof:
1. Fetch the initial quality -- this requires 8 random disk seeks, or up to 50 milliseconds on a standard HDD.
2. (Only performed if the initial quality is sufficiently high) Fetch the full proof -- this requires around 64 disk seeks, or up to 500 milliseconds on a standard HDD.

For most challenges, the quality (step 1) will be very low, so fetching the entire proof (step 2) will not be necessary. A node has around 30 seconds to return a proof, so disk I/O will not be a limiting factor, even when proofs are stored on slow HDDs.

  NOTE: Tape drives are too slow for farming. The protocol was designed to support hard disks, but nothing slower. It is possible to use tape for long-term plot storage, only transferring the plots to disks for occasional farming, but this is likely a very rare use case.

Finally, harvesters also maintain a private key for each plot. The blocks are signed with these keys, which is an important concept in Chia. It means that even when a farmer is a member of a pool, the farmer still controls the contents of a block. This is quite different from other blockchains' pooling protocols, where the pool operators are the ones signing the blocks.

  The harvester algorithm is discussed in greater detail in [Section 3.6](/docs/03consensus/harvester-algorith "Section 3.6: Harvester Algorithm").

## Timelords

Timelords support the network by creating sequential proofs of time (using a [Verifiable Delay Function](/docs/03consensus/vdfs "Section 3.3: VDFs")) and broadcasting them every ~9 seconds. This provides "deterministic randomness", which is used to decide the winning proofs of space.

Since this computation is sequential, very little energy is consumed, as opposed to proof-of-work systems, where computation is parallelizable. For example, if 100 timelords are doing the same computation on a proof of time, they will all create the exact same output.

  The timelord algorithm is explained in [Section 3.13](/docs/03consensus/timelords "Section 3.13: Timelord Algorithm").

A timelord is required to connect to exactly one full node, typically on the same machine. This connection is verified with a certificate. This 1:1 architecture has a large security benefit: it keeps the timelord sandboxed in its own private network. That way, the full node protocol is the only protocol that requires total security. If more than one full node could connect to the same timelord, it would add a potential attack vector to the network.

Timelords do not directly earn rewards. Furthermore, only the fastest timelord on the network will broadcast proofs at any given time. Therefore, only one timelord is required to keep the network running, and most farmers will not feel compelled to run one. However, farmers with multi-PiB farms may want to run a timelord, both for redundancy and for protection against temporary local latency issues.

>NOTE: Chia network is currently developing an ASIC timelord. This will add redundancy to the network, while reducing the possibility of an attacker creating their own timelord that is significantly faster than anyone else's.

If someone controls the fastest timelord in the world, it doesn't give them much of an advantage at winning rewards. However, they could potentially orphan or censor other farmers, depending on how much faster their timelord is.

Furthermore, an attacker with a significantly faster timelord than anyone else could potentially run a 51% attack against the network with less than 51% of the space. For security purposes, it is very important to maintain open designs of VDF hardware.

  You can learn about potential attacks against Chia's network in [Section 3.14](/docs/03consensus/attacks_and_countermeasures "Section 3.14: Attacks and Countermeasures").

## Pools

Pools allow farmers to smooth out their rewards by earning based on proof of space partials, as opposed to winning blocks.

Pools require the use of portable plots. These plots are tied a plot NFT that the farmer must create. This NFT sits on Chia's blockchain, and it allows users to switch between pools.

Pools create and spend **coinbase transactions**, but in Chia's pool protocol they do not actually choose the contents of blocks. This gives more power to farmers and thus decreases the influence of centralized pools.

Farmers periodically send partials, which contain a proof of space and a signature, to pools. The pools use these partial proofs to determine how much space the farmers have dedicated, which in turn determines the farmer's portion of the reward when the pool wins a block.

When a farmer who is a member of a pool wins a block, 7/8 of the reward goes to the pool, which is later distributed to the participants. The farmer keeps the other 1/8 of the reward. This was an intentional design decision. If a farmer didn't receive a direct reward for creating a block, the operator of a competing pool might have had a financial incentive to join a competing pool with a large number of plots, and neglect to create a block when they found a valid proof, thereby spoiling the competing pool.

  For more info, see our [pooling FAQ](https://github.com/Chia-Network/chia-blockchain/wiki/Pooling-FAQ "Chia Pooling FAQ"), as well as this site's [Pool Protocol](/docs/pooling/pooling) page.


## Wallets

Wallets can communicate with full nodes through the wallet protocol. This is similar to Bitcoin's SPV protocol: it allows verification of transactions and block weight, without the bandwidth and CPU requirements of full nodes.

Wallet nodes are similar to full nodes, in that they are servers which communicate to other peers in the network. A common use case is to run a wallet locally along with a full node, where the wallet only connects to the full node. Wallets download [weight proofs](/docs/03consensus/light_clients) from nodes to quickly validate which blockchain is the longest. They then ask full nodes to scan the blockchain for their desired transactions. The wallet is also responsible for managing private keys, as well as generating, storing and sending transactions. The wallet exposes an RPC HTTP websocket JSON API, which user interfaces can use to execute commands.
