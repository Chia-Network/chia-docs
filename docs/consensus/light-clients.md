---
title: Light Clients
slug: /light-clients
---

Light client support is another benefit of Proof of Space and Time (PoST) when compared with Proof of Stake (PoS). In PoST, all proofs can be verified objectively and cryptographically, while maintaining the requirement to control an actual resource at a certain point in time. With Chia's consensus, a candidate chain can be compared to an alternate chain objectively for weight, even after being offline for a long time, without relying on a central authority.

For light clients that want to sync up quickly to the chain (for example, mobile wallets), a full node can create a small-sized proof that can convince the light client that the weight of a chain is close to some value. This is called a proof of weight.

Naively, the light client could download every single block and all the required proofs and verify them. But, with a large number of blocks, this would require a lot of bandwidth and CPU.

A more efficient method relies on a protocol similar to [Flyclient](https://eprint.iacr.org/2019/226.pdf). The node (Prover) sends all the sub-epoch summaries from the fork point, including difficulty resets, to the light client.

There is only one sub-epoch every 384 blocks, so the summaries will only reach a few MB of data.

The node also deterministically samples several sub-epochs based on the challenge of the last block. Sub-epochs have a chance to be chosen proportional to the difficulty during that sub-epoch. For the chosen sub-epoch, the light client downloads one of the challenge chain blocks (which are approximately 1/32 of all blocks), and computes the average infusion iterations of all challenge blocks in that sub-epoch. Based on this time, the light client can extrapolate how many blocks the reward chain contains.

For example, if the challenge blocks all occur with very small iterations (close to the beginning of the sub-slot), there are likely many blocks in that sub-slot. Conversely, if the iterations are close to the middle of the sub-slot, there is likely only one block per sub-slot. This allows the light client to only download 1/32 of the blocks in each sub-slot, but still get a good estimate of the total weight.

Furthermore, the last few sub-epochs should be downloaded in full for the light client.
This adds a small amount of data, but prevents attackers from creating small forks at the end of the chain.

The main difference between this protocol and Flyclient is that blocks are not committed to using a Merkle mountain range, but instead the light client downloads the entire list of sub-epoch hashes from genesis, guaranteeing that the queried sub-epochs are included in the chain. Another difference is that entire sections are downloaded, as opposed to individual blocks.

As of December 2021, more analysis needs to be done on how many sub-epochs should be downloaded and what the bounds are for what the proof of weight implies.

## Obtaining Transactions

Light clients can fetch the transactions that they are interested in, without having to download every single block or block header. Two wallet protocols are available for this, a less efficient one that maintains better privacy, and a super efficient one that has a privacy tradeoff, namely that the wallet must ask a node for payments made to certain addresses. Both of these protocols are currently supported in the Wallet API.
