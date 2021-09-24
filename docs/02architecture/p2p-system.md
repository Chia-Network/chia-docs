---
sidebar_position: 1
---

# Peer to Peer system


![chia-architecture](/img/chia-network-architecture.png)

## Full Nodes
The core of the system is composed of full nodes. Full nodes have several responsibilities:
1. Maintain a copy of the blockchain
2. Validate the blockchain
3. Propagate new blocks, transactions, and proofs through the network, through the peer protocol
4. (Optional) Serve light clients (wallets) through the wallet protocol
5. (Optional) Communicate with farmers and timelords

Usually farmers run a full node process alongside their farmer process.
Full nodes earn no rewards or fees, but they are important to maintain the consensus rules
and the security of the system. Running a full node allows a user to be confident about the
full state of the blockchain, and avoid trusting others.

Full nodes are always connected to another random set of full nodes in the network. Full nodes broadcast their own
information (ip and port) to their peers periodically, so that the entire network is aware that they are still running.


## Farmers
Chia's farmers are analogous to Bitcoin's miners. They earn block rewards and fees by using their stored plots.
The farmer processes don't maintain a copy of the blockchain, but they trust a full node to provide updates.
The full node and the farmer process communicate through the farmer protocol, and usually farmers run both on the
same machine.

Farmers communicate with harvesters (individual machines that actually store the plots) through the harvester protocol.

Users who want to solo farm can run the farmer, harvester and full node on the same machine.

Farmers operate by waiting for updates from a full node, which gives them new signage points approximately every 9 seconds.
Farmers then send the signage point to each harvester, to check whether any winning proofs of space exist.
The farmer can choose to fetch the full proofs of space from the harvest, for those proofs which are winners, or good 
enough for pools. The full proofs can then be propagated to the full nodes, or sent to a pool as partials.

Farmers also have a private key which is used to sign the block when a winning proof is found, and is also used
to sign partials sent to pools.


## Harvesters
Harvesters are individual machines controlled by a farmer.
In a large farming operation, a farmer may be connected to many harvesters.


Harvesters control the actual plot files by retrieving qualities or proofs from disk.
The minimum and most common plot size is k32, which corresponds to around 100GiB.
Each plot file corresponds to one plot, and for each random 32 byte signage point, there is an expected
value of one proof of space (although sometimes there are zero or more than one).
On standard HDD drives, fetching a quality will take around 8 random disk seeks, or up to 50ms, whereas fetching a proof will take around 64 disk seeks, or up to 500ms.
For most challenges, qualities will be very low, so fetching the entire proof is not necessary.
However, since there is a constant factor in the iterations formula (each block must have a proof of time of at least around 30 seconds), disk IO times should not be a problem for most farmers.


Finally, harvesters also maintain a private key for each plot.
This private key is what actually signs the block, allowing farmers/harvesters (as opposed to pools) to actually control the contents of a block.

## Timelords

Timelords support the network by creating sequential proofs of time (using Verifiable Delay Functions). This provides
deterministic "randomness", which is used to decide the winning proofs of space.
Since this computation is sequential, very little energy is consumed, as opposed to proof of work systems where computation is parallelizable.
 If 100 timelords are doing the same computation on a proof of time,
they will all create the exact same output. Timelords are also connected to full nodes.
Although timelords earn no rewards, there only needs to be one honest timelord online for the blockchain to move forward.

Someone who has a faster timelord cannot easily earn more rewards, but they can potentially orphan / censor other
farmers, depending on how much faster the timelord is.

Furthermore, an attacker with a much faster timelord can potentially 51% attack the network with less than 51% of the space, which is why open designs of VDF hardware are very important for the security of the blockchain.

## Pools

Pools allow farmers to smooth out their rewards by earning based on proof of space partials, as opposed to winning blocks.
Pool public keys must be embedded into the plots themselves, so a pool cannot be changed unless the entire plot is recreated.

Pools create and spend **coinbase transactions**, but in Chia's pool protocol they do not actually choose the contents of blocks.
This gives more power to farmers and thus decreases the influence of centralized pools.

Farmers periodically send partials, which contain a proof of space and a signature, to pools.
See more in the [Pool Protocol](/docs/pooling/pooling) page.


## Wallets

Wallets can communicate with full nodes through the wallet protocol.
This is similar to Bitcoin's SPV protocol, and allows verification of transactions and block weight, without the bandwidth and CPU requirements of full nodes.
Wallet nodes are similar to full nodes, in that they are servers which communicate to other peers in the network. A common use case is to run a wallet locally along with a full node, where the wallet only connects to the full node.
Wallets download [weight proofs](/docs/03consensus/weight-proofs) from nodes to quickly validate which blockchain is 
the longest. They then ask full nodes to scan the blockchain for their desired transactions.
The wallet is also responsible for managing private keys, generating, storing and sending transactions. The wallet exposes an RPC HTTP websocket JSON API, which user interfaces can use to execute commands.
