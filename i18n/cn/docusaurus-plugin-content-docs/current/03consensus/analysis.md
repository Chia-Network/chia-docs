---
sidebar_position: 15
---

# 3.15 Analysis

## Safety
The safety is similar to other Nakamoto consensus algorithms like Bitcoin. There is no guaranteed finality, but the more confirmations a transaction has, the safer it is. A transaction needs a certain number of confirmations for a receiver to assume that it cannot be reorged, under the <46%(* vdf advantage) colluding assumption. Since farmers can theoretically sign multiple blocks at the same height, more confirmations should be used in Chia than in Bitcoin. However with a rate of 32 blocks per 10 min, 6 confirmations in Bitcoin is equivalent to 192 in Chia, which is more than enough to be considered safe. As long as one of those 192 farmers is well behaving (not double signing), that transaction will not be reversed.

It's worth noting that there is no requirement of 54% honest farming space, but 54% non colluding. Profit seeking farmers gain very little by deviating from the protocol.

There is the added assumption that at least one fast timelord must be connected to the non-colluding portion of the network, and that the attacker's timelord is not significantly faster.

## Liveness
The liveness of the Chia consensus system is one of its greatest strengths. Like Bitcoin, the Chia system continues advancing even when a majority of the space goes offline. Unlike bitcoin though, the system does not slow down significantly when this happens, since not all blocks are transaction blocks. Therefore transactions throughput does not drop by too much if many participants go offline. It will continue even if only 1 farmer is online, although there will be many empty slots, since a transaction block can only be created if it’s below the sub-slot iterations threshold. 

Of course, in the event of a long term network split the effects are that one chain must be chosen, so there can be large reorgs in this case. Still, the network chooses the heavier chain, similar to PoW. 

## Comparison to Nakamoto PoW
+ Different resources. PoSpace is ASIC resistant and therefore anyone can participate in farming. Hopefully more decentralized. 
+ Easy merge farming. Other cryptocurrencies can use the same format, and everyone can share the space. Probably the top one will be the only secure one, since the farmers can attack smaller ones. 
+ Minimum energy used, since only a few nodes run VDFs, and these are not parallelized. Very low marginal cost to mine. 
+ More consistent transaction block times (one per ~1 min).
+ Less susceptible to selfish mining attacks
+ Smaller orphan rates and forks, since blocks can be included in parallel.
+ Still advances at the same rate when space decreases, since only 1/16 blocks include transactions. PoW nakamoto consensus slows down. 
- Drawback of more potential attackers (large companies). Hardware is general purpose, and therefore attackers could switch between farming, attacking, and using for data storage.
- Speeding up VDF could give a space advantage for someone attacking the network.
- More complexity due to sub slots and VDFs, potentially more cryptographic assumptions

## Comparison to Proof of Stake
This consensus algorithm can also be used for proof of stake, where the space farmers are replaced by stakers who own coins in the system. The benefit would be the ability to slash (delete people’s stake), and farmers would have “skin in the game”, but there are some concerns if proof of stake is used. (+ means benefit for using space vs stake).
+ An attacker can transfer their stake to someone else, but fork the chain right before their stake is transferred. In this alternate chain, the attacker still has all of their stake, and can therefore advance the chain. The "nothing at stake" issue is different in PoStake than in PoSpace since creating a PoSpace requires a physical resource (hard drive space), while creating a PoS only requires a key.
+ An attacker can guarantee their share of the whole pie, by staking their rewards (the rich get richer), since the total number of coins is limited. 
+ There might be situations where the attacker can grind on many different ways to transfer stake. Perhaps this can be mitigated by requiring a long period before stake becomes active.
+ Registration is required, you cannot participate in proof of stake until you sign up. This reduces privacy and scalability (how many people can stake).
+ Higher barrier to entry: security deposits and slashing make it difficult for small users to participate. Slashing can be a huge risk for participants in the network. Centralized custodians lead to a less distributed set of participants. 
+ Some assumptions [11] are required to perform light client syncs in proof of stake.
- Skin in the game: with PoStake, the consensus can slash people’s stake, and also requires some investment into the system (exposure to price). In Proof of space hard drives can be used for other purposes and there is no ability to “slash” peoples hardware. 


## Comparison to BFT consensus algorithms
Proof of space could also be used as a Sybil-resistant mechanism in order to bootstrap a Byzantine consensus (k-agreement) system. Filecoin, and many proof of stake systems use aspects of byzantine consensus.
The pros and cons of using Chia Nakamoto Consensus vs Byzantine consensus, which vary from algorithm to algorithm:
+ Much simpler
+ No registration requirement
+ No scalability requirement (scales to millions of farmers)
+ More censorship resistant. As long as a small portion of the farming space does not censor, eventually you can get into the blockchain. 
+ No liveness requirements, potentially less network assumptions
+ Fully objective (A node can compare chain 1 and chain 2, and immediately know which one is heavier). No need for checkpoints with ⅔ consensus.
+ Better light client support [11]
- No finality, only probabilistic. 
- Need to wait longer for transaction confirmations (related to no finality).
- Less consistent block times and transaction throughput
