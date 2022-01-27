---
sidebar_position: 9
---

# 3.9 Overflow Blocks and Weight

## Overflow Blocks

For a farmer to create a block, their required_iterations must be less than sub-slot_iterations / 64, as described in [Section 3.5](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points"). This means that infusion_iterations might be greater than the sub-slot_iterations, and therefore the infusion must happen in the next sub-slot.

**Overflow block**: a block whose infusion point is in a different sub-slot than its signage point.

**Current-slot challenge**: Any given block's current-slot challenges include all challenges starting at the first challenge in the slot, and ending at the end of the slot (non-inclusive). This is relevant because sometimes a slot spans multiple sub-slots, and thus multiple challenges.

<figure>
<img src="/img/overflow.png" alt="drawing"/>
<figcaption>
Figure 9: B4 in this diagram is an overflow block, since the infusion is in the next sub-slot.

B4 is not based on a current-slot challenge, and thus does not decrease the deficit or make a challenge block.
</figcaption>
</figure>

Overflow blocks cannot exist in the first sub-slot of the epoch (since the sub-slot iterations change).

Also, overflow blocks do not change the deficit unless they are based on a current-slot challenge, since overflow blocks are responses to the previous sub-slot’s challenge. Overflow blocks are not challenge blocks unless they are based on a current-slot challenge. Note that it is rare for overflow blocks to decrease the deficit, since the deficit will almost always be decreased to zero, and a new slot will be started on every sub-slot.

## Minimum Block Requirement

A minimum of 16 current-slot challenge blocks must be infused into the rewards chain in order for a slot to be finished. (Recall that a sub-slot has no such requirement, so a slot could span multiple sub-slots.)

The deficit is a number between 0 and 16 that is present at the start of a sub-slot, and is present for each finished block. This is defined as the number of reward chain blocks that we need to infuse in order to finish a slot. It is reset to 16 whenever we start a slot (so there must be at least 16 total blocks per challenge chain infusion). The deficit goes down for each reward chain infusion that is based on a current-slot challenge.

The block with deficit 15 is a challenge block.

The normal case is where the deficit starts at 16, and goes down to zero within the sub-slot, and resets back to 16 as we finish the slot and start a new one. In the case that we don't manage to reduce it to 0 within the end of the sub-slot, the challenge chain and infused challenge chain (if present) continue, and the deficit does not reset to 16. Blocks (including overflow blocks now), keep subtracting from the deficit until we reach 0. When we finish a sub-slot with a zero deficit, the infused challenge chain is included into the challenge chain, and the deficit is reset to 16.

This requirement was added to discourage long-range attacks, and is described in detail in [Section 3.14](/docs/03consensus/attacks_and_countermeasures#majority-attack "Section 3.14: Attacks and Countermeasures"). The vast majority of sub-slots will have more than 16 blocks (recall that the average number is targeted to be 32), therefore the minimum-block requirement will not have much of an affect on normal operation.

<figure>
<img src="/img/deficit.png" alt="drawing"/>
<figcaption>
Figure 10: c2 is the end of the sub-slot but not the end of the slot (we have yet to reach 0 deficit). c2 does NOT point to ic2, since the slot did not end at this sub-slot.
Deficit is 3 instead of resetting to 16, and the infused challenge chain continues.
</figcaption>
</figure>

## Weight

The **weight** of a block is the sum of the difficulty of this block, plus all previous blocks that are ancestors of this block. Honest full nodes must choose the peak of the blockchain such that the peak is the block with the heaviest weight that they know of. This is a crucial requirement, and is identical to Bitcoin’s heaviest chain rule. Due to this rule, an attacker with less than 50% of the space and no VDF advantage will have trouble earning more than their fair share, since they must get lucky and create more reward chain blocks than the honest chain. Furthermore, farmers only farm on the challenges that correspond to the heaviest chain.

Both VDF speed and total amount of space are important for weight, and changes in these can trigger difficulty adjustments. If the amount of space increases, more than 32 blocks per slot will be created, so the difficulty has to be increased. If the network VDF speed increases, more than 32 blocks are created every 10 minutes, and thus the difficulty (and the sub-slot iterations) has to be increased.

A farmer with exclusive access to a slightly faster VDF, however, cannot easily get more rewards than a farmer with the normal speed VDF. If an attacker tries to orphan one of the blocks on the chain, having a faster VDF will not help, since the attacker’s chain will have fewer blocks (and thus a lower weight). Farmers must sign the block which they are building on top of, and they will only build on top of the highest weight chain.

The VDF speed comes into play when the attacker wishes to launch a 51% attack, however. In this case, an attacking farmer can use the VDF to create a completely alternate chain with no honest blocks, and overtake the honest chain. This requires 42.7% of the total netspace, since the faster VDF chain can obtain weight at a faster rate than the honest chain. This attack is described in detail in [Section 3.14](/docs/03consensus/attacks_and_countermeasures "Section 3.14: Attacks and Countermeasures").
