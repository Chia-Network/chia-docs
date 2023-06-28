---
title: Attacks and Countermeasures
slug: /consensus-attacks
---

## Majority Attack {#majority}

In a majority attack, an attacker creates an alternate chain which eventually reaches a higher weight than the honest chain, and forces users to re-org. This attack is present on many blockchain networks including Chia's, as well as on Proof-of-Work systems. It is colloquially known as a "51% attack" because the attacker must control more than half of the blockchain's resources (hashrate for PoW, netspace for PoST) in order to succeed.

Chia's consensus makes this attack more complex to evaluate than in Proof-of-Work systems. In analyzing this attack, there are several variables at play:

- Number of timelords (regardless of speed)
  - The attacker must control at least one timelord for the attack to be possible.
  - With exactly one timelord, the attacker can only build one private chain.
  - With an unbounded number of timelords, the attacker can build multiple chains simultaneously, keeping the best one while discarding the rest. This allows the attacker to create slots with fewer blocks, giving them a "double-dip" advantage, discussed in detail below.
- Timelord speed (regardless of number)
  - If the attacker has a single timelord, the amount of storage required for the attack is directly correlated to the speed of the attacker's timelord relative to the speed of the fastest honest timelord on the network.
  - For example (ceteris paribus), if the attacker's timelord is twice as fast as the fastest honest timelord on the network, then the attacker's space will be twice as "valuable."
  - Additionally, the double-dip advantage will increase as the timelord's speed increases. However, due to the minimum block requirement, this advantage will hit its maximum limit with a timelord that is somewhat less than twice as fast as the fastest honest timelord on the network. Also, multiple timelords are required to gain any double-dip advantage at all.
- Duration of attack
  - For attacks lasting less than one epoch (~4608 blocks or 1 day), we must assume the worst case for the attacker's double-dip advantage, based on the speed and number of timelords.
  - For attacks lasting one epoch or longer, the minimum double-dip advantage can always be used. This is because the difficulty will adjust during the attack, so the attacker will lose the ability to create slots with fewer blocks.

Before we can evaluate the percentage requirements for various scenarios, we must first calculate the range for the double-dip advantage.

The paper [Proof-of-Stake Longest Chain Protocols: Security vs Predictability](https://arxiv.org/pdf/1910.02218.pdf) outlines the equation to derive the minimum percentage of the network space an attacker would be required to have in order to undertake a majority attack, for chains using between 1 and 10 consecutive blocks with the same challenge. However, Chia uses a larger -- and variable -- amount of consecutive blocks with the same challenge. Because of this, we must solve the equation for two additional values:

- 16 -- This is the minimum number of blocks in a slot. (See the [Overflow Blocks and Weight page](/overflow-blocks#minimum-block-requirement) for more info.) In the worst-case scenario, an attacker with an unbounded number of fast timelords could theoretically create a chain that always uses this minimum number, as explained in the next section.

- 32 -- This is the targeted number of blocks per sub-slot. (See the [Challenges page](/consensus-challenges) for more info.) There will be some natural variance in this number, but an attacker who does not have the fastest timelord will not be able to manipulate it.

Here's the code to solve for these values in Wolfram alpha, where c is the number of consecutive blocks with the same challenge:

```bash
% Wolfram
% solve q=-(c*p)/(ln(-p)+(c-1)ln(1-p)) , -ln(-p)-(c-1)ln(1-p)=-1+(c-1)*(p/(1-p)), c=16 ,f=1/(1+q)
% Solution over the reals: p≈-0.438787 ∧ q≈1.34313 c=32
% Solution over the reals:p≈-0.616585 ∧ q≈1.4678 c=16
% 1/(1+1.4678)= 0.405219
% 1/(1+1.34313) = 0.4267795
```

Using `DD` to represent the double-dip advantage,

- With a single timelord, `DD` is always 1 (no advantage), regardless of the timelord's speed. This is because the attacker will only be able to build a single private chain.
- With an unbounded number of timelords, `DD` will exist in a range, such that 1.34313 < `DD` < 1.4678. This range has a maximum value due to the minimum of 16 blocks per slot.

In addition to `DD`, we'll use the following variables in our calculations:

- `SH` is the total space of the honest nodes on the network
- `VH` is the speed of the fastest honest timelord (VDF)
- `SA` is the attacker's total space
- `VA` is the speed of the attacker's timelord (VDF)

Using these variables, the formula to calculate when an attacker is able to create a chain at the same speed as the honest chain is:

```
SH * VH = SA * VA * DD
```

If we normalize the network's honest space and fastest timelord to equal 1, then in order for the attack to succeed, the product of the attacker's space, timelord speed, and double-dip advantage must be at least 1:

```
SA * VA * DD >= 1
```

The formula to calculate the minimum `SA` then becomes:

```
SA = 1 / (VA * DD)
```

Finally, the formula to calculate the minimum netspace percentage required for the attack is:

```
% = (SA / (1 + SA)) * 100
```

The following table shows the minimum required proportion of the total netspace an attacker must have in order to succeed in a majority attack. This table is valid for attacks lasting any amount of time, though sometimes it's overly conservative for attacks lasting more than one epoch. It uses fixed values for the first two columns.

| Number of Timelords | VA (relative to VH) |   DD    |  SA   | Percent of netspace required | Comment                                                                                                                                                        |
| :-----------------: | :-----------------: | :-----: | :---: | :--------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          0          |         N/A         |    1    |   ∞   |             N/A              | Without a timelord, the attack is not possible.                                                                                                                |
|          1          |         0.5         |    1    |   2   |            66.7%             | With a 0.5x timelord, the attacker must control twice as much space as the rest of the network combined.                                                       |
|          ∞          |         0.5         | 1.34313 | 1.489 |            59.8%             | With infinite 0.5x timelords, the attacker gains a double-dip advantage, so less space is required versus having a single timelord of the same speed.          |
|          1          |          1          |    1    |   1   |            50.0%             | If the attacker has one timelord that's tied with the fastest honest timelord, then the attacker must control more space than the network's honest space.      |
|          ∞          |          1          | 1.34313 | 0.745 |            42.7%             | With infinite timelords tied with the fastest honest timelord on the network, the attacker gains a double-dip advantage.                                       |
|          1          |          2          |    1    |  0.5  |            33.3%             | If the attacker has one timelord that's twice as fast as the fastest honest timelord, the attacker must control half as much space as the rest of the network. |
|          ∞          |          2          | 1.4678  | 0.341 |            25.4%             | With infinite 2x timelords, the attacker gains the maximum double-dip advantage.                                                                               |

For attacks lasting longer than one epoch, `DD` will not exceed 1.34313. In such an attack, the final row from the preceding table will change to the following:

| Number of Timelords | VA (relative to VH) |   DD    |  SA   | Percent of netspace required | Comment                                                                          |
| :-----------------: | :-----------------: | :-----: | :---: | :--------------------------: | :------------------------------------------------------------------------------- |
|          ∞          |          2          | 1.34313 | 0.372 |            27.1%             | If the attack longer than one epoch, the double-dip advantage will be minimized. |

Note that if we continue to increase `VA`, `DD` will always remain at 1.4678 for the first table, and 1.34313 for the second table. The percent of netspace required will decrease linearly.

It is reasonable to assume that if a majority attack were attempted, the attacker's timelord wouldn't be significantly faster than the fastest honest timelord. Furthermore, it is unlikely that the attacker could gain access to an unbounded number of timeords, so the attacker would not gain the double-dip advantage. Therefore, Chia uses a base line assumption of 51% of the netspace required for a majority attack to have a chance at succeeding.

To reduce the possibility of an attacker gaining access to a fast timelord, Chia network is currently [developing an ASIC timelord](https://www.businesswire.com/news/home/20211013005324/en/Chia-Partners-With-Supranational-to-Create-Industry-Leading-Proof-of-Space-Time-Security).

## Extending Many Chains {#many-chains}

As discussed in the previous section, if an attacker is making their own private chain, they can choose which block gets infused into the challenge chain, and can therefore try many different infusions, such that they get the best possible chain.

Due to the average of 32 blocks with the same challenge, the attacker can only try about 32 different combinations (figuring out which block to include in the challenge chain). The exponential branching that results from trying each of these would give a small boost in space for the attacker. For example, someone with 5 PiB can pretend to have 6 or 7 PiB.

The reason for receiving just a minor boost is because the alternative chains being tried are inferior and less likely to overtake the longest one. This has been analyzed in the [PoSAT paper](https://arxiv.org/abs/2010.08154).

If there were a new proof of space challenge for every single block, the attacker could multiply their space by a factor of e=2.718, where only 27% would be required to overtake the network. Chia has chosen to mitigate this attack vector by setting the expected number of blocks per sub-slot to 32. This increases the attacker's required space to 42.7%.

However, Chia also chose not to increase the number of blocks per sub-slot to a number greater than 32. Doing so would decrease the time between blocks, which would allow a timelord that is only slightly faster than all others to orphan blocks more easily. As it stands, with 32 blocks per sub-slot, an attacker would need to have a significantly faster timelord than everyone else in order to successfully orphan any blocks.

Furthermore, the [PoSAT paper](https://arxiv.org/abs/2010.08154) shows that increasing the number of blocks per challenge increases security at a very slow rate, so increasing this number slightly does not provide much benefit.

If the attacker were to manipulate the difficulty, they could change it so that they get fewer reward blocks per slot. Then they could either include or exclude each block, and exponentially extend all chains simultaneously. This would allow the attacker to multiply their space by a small factor. It is not clear whether this attack gains very much, since the attacker must change the difficulty, which requires sacrificing some weight. However, to prevent this attack, there is a requirement that at least 16 reward chain blocks must be created for a challenge block to be included. This brings the attacker's required space in the worst case scenario (with unlimited slightly faster timelords) from 27% up to 42.7%, as discussed above.

## Global Hard Drive Space {#space}

There is a concern that if the Chia network does not have a significant amount of space compared to the available free space of hard drive manufacturers or large companies, then it will be vulnerable to long-range attacks. Therefore the more space taken by the Chia network, the more secure the network is.

We believe this type of attack is unlikely, though. Large data centers and companies with significant amounts of storage tend not to have much _unused_ storage available to hold Chia plots. And the more space that comes onto Chia's network, the lower the rewards per TB. With the netspace currently (December 2021) sitting at 35 EiB, companies will find it difficult to justify buying drives or deleting business data. Furthermore, creating a plot requires a fixed amount of upfront time and money (from current calculations, about 1kWh for a k32, or about 10 cents, which is $1 per terabyte).

The most likely long-term scenario is that rewards per TB will be sufficiently low to discourage people and companies from acquiring new storage just to farm Chia. Most of the new netspace in the future will therefore come from used storage, often from hard disks that otherwise would have been bound for a landfill. This will serve two purposes: preventing the attack laid out here, and keeping Chia green.

## 100% Attack {#100-percent}

If the difficulty adjustment were triggered every X timelord slots, as opposed to every X blocks, this would allow for a 100% attack, where all farmers collude to constantly decrease or increase the difficulty.

Under normal operation, there are 32 blocks per slot.

Under the hypothetical 100% attack:

1. The difficulty would be artificially cut in half, temporarily allowing 64 blocks to be created per slot.
2. The difficulty would then be artificially increased by 4x, temporarily allowing 16 blocks per slot.
3. Repeat step 1.

The result of this attack would be to create an average of (64+16)/2 = 40 block rewards per slot, a 25% increase in rewards. This is why Chia chose to trigger the difficulty adjustment based on the number of blocks. If this attack were attempted under the current system, it would slow down and speed up the network, but it would not yield any extra rewards.

## Short Range Replotting Attack {#replotting}

Plotting usually takes a few minutes to a few hours, even on fast hardware, but it is parallelizable and getting faster.

Someday in the future, an attacker with high-end hardware could begin creating a plot after a signage point is released, and complete the plot before the infusion point. The attacker could then delete the plot after obtaining the quality rating (or after submitting the proof if it's eligible). This would allow the attacker to create a plot that automatically passes the filter, effectively allowing them to farm without storing any space. This attack only becomes feasible if it is possible to create a plot in less than 28 seconds (before the infusion).

If we assume the worst-case scenario of a farmer being able to create a plot instantly,
the question becomes, what is the cost and what is the benefit of the attack?

The cost is the electricity, memory, hardware and infrastructure needed to create a plot. The electricity required to create a k32 plot is currently around $0.10, or around $1 per TB.

The benefit would be the same benefit as storing that plot for 80 minutes (the signage point interval times the plot filter constant). This is because the attacker can always create a plot that passes the plot filter. Assuming $5 per year value per terabyte, the value of a 1TB plot for 80 minutes is $0.00094. Therefore with current plotting software and hardware, it is significantly cheaper to store the plots as opposed to recreating them.

Another way to look at the benefit of this attack: If the attacker can create a plot that always passes the filter, it will be the equivalent of storing 512 plots locally. Which is cheaper, storing 512 plots or running this attack?

If 1 TB of HDD storage costs $15, it would cost around $750 to purchase enough space to store 512 plots. If we account for a low-end computer on which to run a farmer, the total cost of this system is roughly $1000. Therefore, the replotting attack only becomes economically feasible on a system worth less than $1000. If this attack ever becomes possible, it will likely cost at least an order of magnitude more to run the attack than to store the plots. (And keep in mind, the price of storage tends to fall every year, so the benefit of the attack is constantly decreasing, even as its feasibility is increasing.)

The plot filter constant is very useful to reduce the amount of disk lookups farmers must do. With a plot filter of 512, Instead of 7-9 disk reads per plot every 9 seconds, farmers only need to do about 7-9 reads for every 80 minutes.

The downside of the plot filter constant is that it provides a multiplier of replotting benefit to an attacker, so it must not be set too high. With a plot filter constant of 512, 1/512 plots are valid for every challenge. The attacker can then only create plots that pass the filter, therefore not needing to create the other 511/512ths.

Setting the filter constant to 512 provides a 512x multiplier. If the replotting attack ever becomes economically feasible, one mitigation would be to decrease the filter, thus decreasing the attack's benefit. The other mitigation would be to increase the minimum plot size, thus decreasing the feasibility of the attack.

In any case, this attack will not become feasible until at least 2026, given projected improvements in hardware speed.

## Faster Timelord (But Not 51% Attack) {#faster-timelord}

With the fastest timelord in the system, an attacker can more effectively perform a long-range attack: they can expand their space while farming in a private chain.

If the attacker does not reach a total of 40.5% of space (with the timelord boosting and extending many chains as above), the usefulness of the faster timelord decreases substantially. This is because inclusion and exclusion of blocks does not depend on how fast you can perform the VDF, but instead depends on whether it's less than the sub-slot iterations. Furthermore, an attacker needs the space of the rest of the network in order to advance, and therefore must release the challenges to the network.

In certain cases where blocks come very close together, having a faster timelord can allow an attacker to orphan certain blocks, although this does not increase rewards in the short term (it would hurt others, but not benefit the attacker), and has a risk of undermining the network in the long term (orphaning blocks decreases public trust).

## Selfish Farming {#selfish-farming}

Selfish farming occurs when an attacker farms blocks in private, and only releases them when they are at risk of being surpassed by the honest chain.

In Nakamoto PoW this provides significant gains, because at any point at which the miner is ahead of the rest of the network, the rest of the network is wasting their hashpower on a chain that will not win.

In Chia consensus, a "selfish" farmer could withhold a proof until just before the infusion point, but this would provide zero benefit versus submitting the proof right away. There can be multiple block winners per signage point, so farming is not a zero-sum game as it is in PoW. Furthermore, the timelord cannot accept proofs for an infusion point that has already passed, so farmers are not allowed to stack a large number of proofs to be infused later.

## Farmer Bribe Trunk Attack {#bribe-trunk}

An interesting attack explored in the [PoSAT white paper](https://arxiv.org/abs/2010.08154) is the bribing attack, which takes advantage of the predictability of the elected "leaders" in each slot. The authors analyze a Proof of Stake chain, and argue that when participants know that they are going to win in advance, there is a potential bribing attack.

In Chia, if participants knew in advance which plots would win, each user could notify an attacker that they'd be willing to participate in the attack. If the number of participants reached a certain threshold, they could completely re-org the chain (or orphan those who do not participate, censor transactions, etc). This attack does NOT require the majority of the space in the network to participate; it only requires a certain threshold of winners within a short time frame. Furthermore, it is undetectable, since the attacker can make a normal looking chain.

This problem is not present in this revision of the Chia consensus algorithm. This problem is solved by reducing the predictability: each farmer does not know for sure if their proof of space is fully eligible until the signage point. Therefore an attacker must bribe a large majority of the space to pull off this attack.

## Farmer Bribe Foliage Re-Org Attack {#bribe-foliage}

Since blocks are signed by PoSpace keys, a farmer can theoretically sign multiple blocks with the same PoSpace, at the same height. The attack requires a malicious party to bribe farmers with a certain amount of funds for them to provide a signature of an alternate chain. It does not require the attacker to have a faster timelord.

If the attacker can convince every single farmer N blocks deep to sign, they can revert or reorder any transaction in those N blocks. This attack requires 100% compliance, likely from unwitting participants. As soon as those participants learn of the attack, at least some of them would probably stop. It is therefore only a short-term attack.

One potential prevention for this attack would be to use fraud proofs. However, these enable other attacks and complicate behavior, so they were not chosen.

Instead, the solution is simply to wait longer. After 32 blocks (approximately 10 minutes), we can make a reasonable assumption that at least one farmer is following the protocol and not double signing. If 57.4% is non-colluding (the assumption for 42.7% attack resilience), the probability of a reversal after 32 blocks is `0.426^32` or `1.38*10^-12= 0.00000000000138`. Furthermore, this attack is detectable, so it is not easy to pull off.

Each user can choose their own threshold for which they accept a transaction/block as final. For example, in cases where the total network space drops suddenly, users can be more careful and not consider transactions final, in case there is another existing fork, due to a network split.

## Orphaning Transaction Blocks for Fees {#orphaning}

Transaction blocks are different from non-transaction blocks, since they contain transaction fees. These may surpass block rewards. For example, Ethereum has had created some blocks with 2 eth of rewards and 8 eth of fees. ([EIP 1559](https://eips.ethereum.org/EIPS/eip-1559) changes the calculation significantly, so this is just a historical example of what is possible in other chains.)

In Chia this will be more extreme, since not every block contains transactions. This leads to attacks where the 2nd place farmer ignores the 1st place in an attempt to win the transaction block. If the 2nd block comes less than 28 seconds after the 1st, they do not specify the previous block, and thus the 2nd place cannot orphan the 1st. The 3rd place could orphan both, but nobody would follow this chain since it is shorter.

However, if there are no blocks within 28 seconds of the 1st block, the 2nd could orphan the 1st, but they would have to convince the next block to farm on their alternate chain. An easier attack would be if the attacker controlled both the 2nd and 3rd, in which case they could ignore the first and still be longer. These orphaning attacks do not allow the attacker to steal rewards, but rather allow the attacker to slightly lower the difficulty. Since they are very situational and require a lot of space, attempting this attack will likely harm the network more than the potential gain to the attacker.

## Orphan Rate {#orphan-rate}

In Chia consensus, two competing blocks around the same time can both be included into the blockchain in parallel, without knowing about each other (although at most one can be a transaction block). When multiple blocks are included at the same time, the result is a chain with a higher weight. This means that the orphan rate in Chia will be essentially zero, assuming low network latency. If network latency exceeds the infusion delay (30-40 seconds), then orphaning of a block is almost guaranteed, so it is more of a step-function. This is in contrast with Nakamoto-PoW in which the orphan rate is high if there is network delay, and decreases smoothly as network condition improves, but never reaches zero.
