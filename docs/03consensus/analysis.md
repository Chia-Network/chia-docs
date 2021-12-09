---
sidebar_position: 15
---

# 3.15 Analysis

## Safety
The safety of Chia's consensus is similar to that of other Nakamoto consensus algorithms like Bitcoin. There is no guaranteed finality, but the more confirmations a transaction has, the safer it is.

A transaction needs a certain number of confirmations for a receiver to assume that it cannot be re-orged, under the < 46% (* vdf advantage) colluding assumption. Since farmers can theoretically sign multiple blocks at the same height, more _confirmations_ should be used in Chia than in Bitcoin. However, Chia doesn't require anywhere near as much _clock time_ as Bitcoin for a transaction to be considered safe.

In Chia, there are two main reasons to wait for a certain number of confirmations:
1. To be confident there won't be a chain re-org. As discussed in [Section 3.10](/docs/03consensus/foliage "Section 3.10: Foliage"), a small re-org is a natural occurrence in blockchains, though rare in Chia.

  To be confident that there won't be a chain re-org, you should wait for six blocks to be created (around two minutes after the first confirmation).

2. Just in case there is a foliage re-org attack, as described in [Section 3.14](/docs/03consensus/attacks_and_countermeasures#farmer-bribe-foliage-re-org-attack "Section 3.14: Relevant Attacks and Countermeasures"). This type of attack would require an attacker to discover the identity of -- and successfully bribe -- a large and consecutive number of anonymous block winners. This attack would be _extraordinarily_ difficult to pull off, so it is expected to be extremely rare, if it is ever even attempted.

  If you want to be nearly certain that even a successful foliage re-org attack won't reverse your transaction, you should wait for 32 blocks to be created (around ten minutes after the first confirmation).


It's worth noting that the 54% requirement only pertains to _non-colluding_ space, rather than _honest_ farming space. Profit-seeking farmers gain very little by deviating from the protocol.

There is the added assumption that at least one fast timelord must be connected to the non-colluding portion of the network, and that the attacker's timelord is not significantly faster. Chia eventually plans to release an ASIC timelord, which should ensure that nobody can obtain a significantly faster timelord.

## Liveness
The liveness of the Chia consensus system is one of its greatest strengths. Like Bitcoin, the Chia system continues advancing even when a majority of the space goes offline. Unlike bitcoin, though, the system does not slow down significantly when this happens, since not all blocks are transaction blocks. Therefore transaction throughput does not drop significantly if many participants go offline.

The network will continue to advance even if only one farmer is online, although there will be many empty slots, since a transaction block can only be created if it’s below the sub-slot iterations threshold. 

Of course, in the event of a long-term network split, the effects are that one chain must be chosen, so there can be large re-orgs in this case. The network will automatically choose the heavier chain, similar to PoW.

## Comparison to Nakamoto PoW
("+" means a pro for Chia)

+ (+) Different resources. PoSpace is ASIC-resistant and therefore anyone can participate in farming.
+ (+) Hopefully more decentralized. (Analysis in mainnet's first year shows this to be the case.)
+ (+) Easy merge farming. Other cryptocurrencies can use the same format, and everyone can share the space (assuming their farming computers have sufficient disk space and memory). (Note that the blockchain with the largest netspace will probably be the only secure one, since the farmers can attack smaller ones. This is especially true of blockchains with less than 50% of the top chain's netspace -- the remaining farmers who have not joined the smaller chain could collude to join, and attack, that chain.)
+ (+) Minimum energy used, since only a few nodes run VDFs, and these are not parallelized. Very low marginal cost to farm. 
+ (+) More consistent transaction block times (targeted average is one per 46.875 seconds, as discussed in [Section 3.10](/docs/03consensus/foliage "Section 3.10: Foliage")).
+ (+) Less susceptible to selfish mining attacks.
+ (+) Smaller orphan rates and forks, since blocks can be included in parallel.
+ (+) Continues to advance at nearly the same rate when space decreases, since only around 1/3 of blocks include transactions. PoW Nakamoto Consensus slows down linearly when hashrate drops. 
- (-) Drawback of more potential attackers (large companies). Hardware is general purpose, and therefore attackers could switch between farming, attacking, and using for data storage.
- (-) If an attacker acquires a significantly faster VDF, they could gain a space advantage.
- (-) More complexity due to sub slots and VDFs, potentially more cryptographic assumptions.

## Comparison to Proof of Stake
Chia's consensus algorithm could also be used for Proof of Stake, where the space farmers are replaced by stakers who own coins in the system. The benefit would be the ability to slash (delete people’s stake), and farmers would have “skin in the game”, but there are some concerns if Proof of Stake is used. ("+" means benefit for using space vs stake).

+ (+) An attacker can transfer their stake to someone else, but fork the chain right before their stake is transferred. In this alternate chain, the attacker still has all of their stake, and can therefore advance the chain. The "nothing at stake" issue is different in PoS than in PoSpace since creating a PoSpace requires a physical resource (hard drive space), while creating a PoS only requires a key.
+ (+) An attacker can guarantee their share of the whole monetary supply, by staking their rewards (the rich get richer), since the total number of coins is limited. 
+ (+) There might be situations where the attacker can grind on many different ways to transfer stake. Perhaps this can be mitigated by requiring a long period before stake becomes active.
+ (+) Registration is required, you cannot participate in proof of stake until you sign up. This reduces privacy and scalability (how many people can stake).
+ (+) Higher barrier to entry: security deposits and slashing make it difficult for small users to participate. Slashing can be a huge risk for participants in the network. Centralized custodians lead to a less distributed set of participants. 
+ (+) Some assumptions are required to perform light client syncs in Proof of Stake. Source: [Flyclient white paper](https://eprint.iacr.org/2019/226.pdf).
- (-) Skin in the game: with PoS, the consensus can slash people’s stake, and also requires some investment into the system (exposure to price). In Proof of Space, hard drives can be used for other purposes and there is no ability to “slash” people's hardware. 


## Comparison to BFT consensus algorithms
Proof of Space could also be used as a Sybil-resistant mechanism in order to bootstrap a Byzantine consensus (k-agreement) system. Filecoin, and many Proof of Stake systems use aspects of Byzantine consensus.

The pros and cons of using Chia Nakamoto Consensus vs Byzantine consensus, which vary from algorithm to algorithm ("+" means a pro for Chia):

+ (+) Much simpler.
+ (+) No registration requirement.
+ (+) No scalability requirement (scales to millions of farmers).
+ (+) More censorship resistant. As long as a small portion of the farming space does not censor, eventually you can get into the blockchain. 
+ (+) No liveness requirements, potentially fewer network assumptions.
+ (+) Fully objective (A node can compare chain 1 and chain 2, and immediately know which one is heavier). No need for checkpoints with ⅔ consensus.
+ (+) Better light client support. See the [Flyclient white paper](https://eprint.iacr.org/2019/226.pdf) for more info. 
- (-) No finality, only probabilistic. 
- (-) Need to wait longer for transaction confirmations (related to no finality).
- (-) Less consistent block times and transaction throughput.