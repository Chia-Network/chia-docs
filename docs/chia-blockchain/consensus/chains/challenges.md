---
title: Challenges
slug: /chia-blockchain/consensus/chains/challenges
---

The Chia consensus algorithm relies on timelords running VDFs for periods of time called _sub-slots_, which are adjusted periodically (and automatically) to take around 10 minutes. During every sub-slot, challenges are released by timelords, and a sort of mini lottery starts, where farmers check their plots for proofs of space. When farmers find a proof of space that qualifies, they broadcast it to the network.

The difficulty adjusts automatically to target 32 winning proofs for the entire network in each sub-slot, or about one winner every 18.75 seconds on average (32 winners per 600 seconds). The winning proofs are infused into the VDF at different times within the sub-slot.

:::info
A sub-slot is always targeted to last 10 minutes. There is also a period of time called a _slot_. Typically, a slot and a sub-slot are exactly the same thing. However, in order to prevent long-range attacks, slots are required to have at least 16 blocks (and sub-slots are not). If a sub-slot ends with fewer than 16 blocks having been created, the same slot must continue for another sub-slot. See the [Overflow Blocks and Weight page](/chia-blockchain/consensus/chains/overflow-blocks.md#minimum-block-requirement) (minimum block requirement) for more info.
:::

The consensus requires farmers to follow the heaviest chain, which is the chain that has the highest accumulated difficulty (usually the chain with the most blocks).

<figure>
<img src="/img/challenges.png" alt="drawing"/>
<figcaption>
Figure 4: Three sub-slots. The x axis represents time. Dotted lines represent VDF execution, advancing in time from left to right. Arrows represent hash dependencies (an object which points to another object includes the hash of the second object). 
</figcaption>
</figure>

In figure 4, we can see three challenge points, c1, c2, and c3. At the these points timelords create challenges (256-bit hashes) which are provided as input to VDFs. Timelords take these hashes, and start computing a VDF on this challenge, for the specified number of iterations. In this example, each slot is 100,000,000 iterations. When the VDF is finished, the timelord publishes the new challenge and the proof of the VDF. An infusion of end-of-slot information happens at the end of each sub-slot.

A challenge is always a 256-bit hash. The base info that is always included in this hash is the challenge chain VDF. However, the infused challenge chain, SubEpochSummary, difficulty, and sub slot iters might also be included, depending on where we are in the epoch cycle:

```python
class ChallengeChainSubSlot(Streamable):
    challenge_chain_end_of_slot_vdf: VDFInfo
    infused_challenge_chain_sub_slot_hash: Optional[bytes32]  # Only at the end of a slot
    subepoch_summary_hash: Optional[bytes32]  # Only once per sub-epoch, and one sub-epoch delayed
    new_sub_slot_iters: Optional[uint64]  # Only at the end of epoch, sub-epoch, and slot
    new_difficulty: Optional[uint64]  # Only at the end of epoch, sub-epoch, and slot
```

**Sub-slot**: a segment of a fixed number of VDF iterations, subject to periodic work difficulty adjustments, which automatically target a time of 10 minutes.

**Sub-slot iterations**: determines how many VDF iterations each sub-slot must have. This number is periodically adjusted.

**Challenge**: a sha256 output string. It is used as a proof-of-space challenge for farmers' plots. It is also used for the challenge chain VDF, and is sometimes referred to as a _challenge hash_.

As you can see in Figure 4, there are three VDFs being executed concurrently, each of which serves a different purpose. They are explained in detail in the [Three VDF Chains page](/chia-blockchain/consensus/chains/three-vdf-chains.md).

In the networking protocol, the three VDF proofs are usually passed around together, in what is called an _end of sub-slot bundle_.

## Genesis Challenge

The genesis challenge is the first challenge on a network that uses the Proof of Space and Time consensus. The timelords use this challenge to calculate and broadcast the very first signage point. Chia's mainnet, testnets and simulated networks each have their own unique _genesis challenge_.

The genesis challenge is created arbitrarily, by hashing a preimage. In the case of Chia's mainnet, the preimage included the hash of Bitcoin block [675317](https://www.blockchain.com/explorer/blocks/btc/675317), which was mined shortly prior to the launch of Chia's network. It also included the following message from Bram:

`"Operational error causes Fed payment system to crash" We stand on the shoulders of giants, now let's get farming!`

The exact text of the preimage for Chia's mainnet is:

```
bitcoin_hash:0000000000000000000942b19f16b83a316acfa31e067c0b766c4dda034dc37f,bram_message:"Operational error causes Fed payment system to crash" We stand on the shoulders of giants, now let's get farming!
```

The SHA256 hash of this preimage is:

```
ccd5bb71183532bff220ba46c268991a3ff07eb358e8255a65c30a2dce0e5fbb
```

This hash is the genesis challenge for Chia's mainnet. The complete JSON data for the genesis challenge is located [here](https://download.chia.net/notify/mainnet_alert.txt). The first block on Chia's mainnet ([block 0](https://www.spacescan.io/block/0)) was created at signage point `2`; it points to the genesis challenge as its previous block. The prefarm was then distributed in [block 1](https://www.spacescan.io/block/1), at signage point `7`.

The genesis challenge for other networks can be found opening `config.yaml` (located in `~/.chia/mainnet/config` for Chia's mainnet and testnets) and searching for `GENESIS_CHALLENGE:` in the section corresponding to the desired network.
