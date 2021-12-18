---
sidebar_position: 14
---

# 3.14 Relevant Attacks and Countermeasures

## 51% attack
A 51% (actually 46%, as explained below) attack involves creating an alternate chain which eventually reaches a higher weight than the honest chain, and forces users to re-org. This is the classic long-range attack, which is present on many blockchain networks including Chia's, as well as on proof-of-work systems.

In this attack, someone who controls at least 46% of the network space creates an alternate chain, which eventually becomes heavier than the honest chain.

There are two main differences between Chia's Proof of Space and Time consensus and Proof of Work.
1. In Chia, the attacker can extend and farm on many chains simultaneously, making the attack possible with only 46% of the network space. A fast VDF is not required to gain this advantage. Therefore, a 46% assumption should used as the base line for a long-range attack.
2. In Chia, if the attacker has the fastest VDF on the entire network, they can get an additional space advantage/boost. (If the attacker's VDF is even slightly slower than the fastest VDF, it will not give them any advantage.)

## Extending many chains
If an attacker is making their own private chain, they can choose which block gets infused into the challenge chain, and can therefore try many different infusions, such that they get the best possible chain.

Due to the average of 32 blocks with the same challenge, the attacker can only try about 32 different combinations (figuring out which block to include in the challenge chain). The exponential branching that results from trying each of these would give a small boost in space for the attacker. For example, someone with 5 PiB can pretend to have 6 or 7 PiB.

The reason for receiving just a minor boost is because the alternative chains being tried are inferior and less likely to overtake the longest one. This has been analyzed in the [PoSAT paper](https://arxiv.org/abs/2010.08154).

The actual amount of space required to perform this attack (for the attacker to get a heavier chain than the rest of the network combined) is 46.3%, due to the ability for an attacker to "try" different combinations of blocks, for example omitting or not omitting the first block.

If there was a new proof of space challenge for every single block, the attacker could multiply their space by a factor of e=2.718, where only 27% is required to overtake the network. Chia has chosen to mitigate this attack vector by setting the expected number of blocks per sub-slot to 32. This increases the attacker's required space to 46%. 

However, Chia also chose not to increase the number of blocks per sub-slot to a number greater than 32. Doing so would decrease the time between blocks, which would allow a VDF that is only slightly faster than all others to orphan blocks more easily. As it stands, with 32 blocks per sub-slot, an attacker would need to have a significantly faster VDF than everyone else in order to successfully orphan any blocks.

Furthermore, the [PoSAT paper](https://arxiv.org/abs/2010.08154) shows that increasing the number of blocks per challenge increases security at a very slow rate, so increasing this number slightly does not provide much benefit.

If the attacker were to manipulate the difficulty, they could change it so that they get fewer reward blocks per slot. Then they could either include or exclude each block, and exponentially extend all chains simultaneously. This would allow the attacker to multiply their space by a small factor. It is not clear whether this attack gains very much, since the attacker must change the difficulty, which requires sacrificing some weight. However, to prevent this attack, there is a requirement that at least 16 reward chain blocks must be created for a challenge block to be included. This brings the required attacker space in the worst case scenario from 27% up to 46%.

## Faster VDF and 46% of space
The 46% attack gets worse if the attacker’s VDF is faster. Let’s assume the attacker’s VDF is 2x faster than the second-fastest VDF. Then their chain will be able to create challenges and blocks at 2x the rate of the rest of the network, which means they can create a "heavier" chain with the same amount of space.

This reduces the required space from 46% to approximately 30% of the total network space. `0.46/0.54 = 2x/(1-x). x=0.30`. If the attacker does not have access to the fastest VDF, they will not be able to get a space advantage beyond 46%.

## Chia space / global hard drive space 
There is a concern that if the Chia network does not have a significant amount of space compared to the available free space of hard drive manufacturers or large companies, then it will be vulnerable to 46% attacks. Therefore the more space taken by the Chia network, the more secure the network is.

We believe this type of attack is unlikely, though. Large data centers and companies with significant amounts of storage tend to not have much _unused_ storage available to hold Chia plots. And the more space that comes onto Chia's network, the lower the rewards per TB. With the netspace currently (December 2021) sitting at 35 EiB, companies will find it difficult to justify buying drives or deleting business data. Furthermore, creating a plot requires a fixed amount of upfront time and money (from current calculations, about 1kWh for a k32, or about 10 cents, which is $1 per terabyte).

The most likely long-term scenario is that rewards per TB will be sufficiently low to discourage people and companies from acquiring new storage just to farm Chia. Most of the new netspace in the future will therefore come from used storage, often from hard disks that otherwise would have been bound for a landfill. This will serve two purposes: preventing the attack laid out here, and keeping Chia green.

## 100% attack
If the difficulty adjustment were triggered every X VDF slots, as opposed to every X blocks, this would allow for a 100% attack, where all farmers collude to constantly decrease or increase the difficulty.

Under normal operation, there are 32 blocks per slot.

Under the hypothetical 100% attack:
1. The difficulty would be artificially cut in half, temporarily allowing 64 blocks to be created per slot.
2. The difficulty would then be artificially increased by 4x, temporarily allowing 16 blocks per slot.
3. Repeat step 1.

The result of this attack would be to create an average of (64+16)/2 = 40 block rewards per slot, a 25% increase in rewards. This is why Chia chose to trigger the difficulty adjustment based on the number of blocks. If this attack were attempted under the current system, it would slow down and speed up the network, but it would not yield any extra rewards.

## Short range replotting attack
Plotting usually takes a few minutes to a few hours, even on fast hardware, but it is parallelizable and getting faster.

Someday in the future, an attacker with high-end hardware could begin creating a plot after a signage point is released, and complete the plot before the infusion point. The attacker could then delete the plot after obtaining the quality rating (or after submitting the proof if it's eligible). This would allow the attacker to create a plot that automatically passes the filter, effectively allowing them to farm without storing any space. This attack only becomes feasible if it is possible to create a plot in less than 28 seconds (before the infusion).

If we assume the worst-case scenario of a farmer being able to create a plot instantly,
the question becomes, what is the cost and what is the benefit of the attack?

The cost is the electricity, memory, hardware and infrastructure needed to create a plot. The electricity required to create a k32 plot is currently around $0.10, or around $1 per TB.

The benefit would be the same benefit as storing that plot for 80 minutes (the signage point interval times the plot filter constant). This is because the attacker can always create a plot that passes the plot filter. Assuming $5 per year value per terabyte, the value of a 1TB plot for 80 minutes is $0.00094. Therefore with current plotting software and hardware, it is significantly cheaper to store the plots as opposed to recreating them.

Another way to look at the benefit of this attack: If the attacker can create a plot that always passes the filter, it will be the equivalent of storing 512 plots locally. Which is cheaper, storing 512 plots or running this attack?

If 1 TB of HDD storage costs $15, it would cost around $750 to purchase enough space to store 512 plots. If we account for a low-end computer on which to run a farmer, the total cost of this system is roughly $1000. Therefore, the replotting attack only becomes economically feasible on a system worth less than $1000. If this attack ever becomes possible, it will likely cost at least an order of magnitude more to run the attack than to store the plots. (And keep in mind, the price of storage tends to fall every year, so the benefit of the attack is constantly decreasing, even as its feasibility is increasing.)

The plot filter constant is very useful to reduce the amount of disk lookups farmers must do. With a plot filter of 512, Instead of 7 disk reads per plot every 9 seconds, farmers only need to do about 7 reads for every 80 minutes.

The downside of the plot filter constant is that it provides a multiplier of replotting benefit to an attacker, so it must not be set too high. With a plot filter constant of 512, 1/512 plots are valid for every challenge. The attacker can then only create plots that pass the filter, therefore not needing to create the other 511/512ths.

Setting the filter constant to 512 provides a 512x multiplier. If the replotting attack ever becomes economically feasible, one mitigation would be to decrease the filter, thus decreasing the attack's benefit. The other mitigation would be to increase the minimum plot size, thus decreasing the feasibility of the attack.

In any case, this attack will not become feasible until at least 2026, given projected improvements in hardware speed.

## Faster VDF (but not 51% attack)
With the fastest VDF in the system, an attacker can more effectively perform a 51% attack: they can expand their space while farming in a private chain.

If the attacker does not reach a total of 51% of space (with the VDF boosting and extending many chains as above), the usefulness of the faster VDF decreases substantially. This is because inclusion and exclusion of blocks does not depend on how fast you can perform the VDF, but instead depends on whether it’s less than the sub-slot iterations. Furthermore, an attacker needs the space of the rest of the network in order to advance, and therefore must release the challenges to the network.

In certain cases where blocks come very close together, having a faster VDF can allow an attacker to orphan certain blocks, although this does not increase rewards in the short term (it would hurt others, but not benefit the attacker), and has a risk of undermining the network in the long term (orphaning blocks decreases public trust).

## Selfish Farming
Selfish farming occurs when an attacker farms blocks in private, and only releases them when they are at risk of being surpassed by the honest chain.

In Nakamoto PoW this provides significant gains, because at any point at which the miner is ahead of the rest of the network, the rest of the network is wasting their hashpower on a chain that will not win.

In Chia consensus, a "selfish" farmer could withhold a proof until just before the infusion point, but this would provide zero benefit versus submitting the proof right away. There can be multiple block winners per signage point, so farming is not a zero-sum game as it is in PoW. Furthermore, the timelord cannot accept proofs for an infusion point that has already passed, so farmers are not allowed to stack a large number of proofs to be infused later.

## Farmer bribe trunk attack
An interesting attack explored in the [PoSAT white paper](https://arxiv.org/abs/2010.08154) is the bribing attack, which takes advantage of the predictability of the elected “leaders” in each slot. The authors analyze a Proof of Stake chain, and argue that when participants know that they are going to win in advance, there is a potential bribing attack.

In Chia, if participants knew in advance which plots would win, each user could notify an attacker that they'd be willing to participate in the attack. If the number of participants reached a certain threshold, they could completely re-org the chain (or orphan those who do not participate, censor transactions, etc). This attack does NOT require the majority of the space in the network to participate; it only requires a certain threshold of winners within a short time frame. Furthermore, it is undetectable, since the attacker can make a normal looking chain.

This problem is not present in this revision of the Chia consensus algorithm. This problem is solved by reducing the predictability: each farmer does not know for sure if their proof of space is fully eligible until the signage point. Therefore an attacker must bribe a large majority of the space to pull off this attack.

## Farmer bribe foliage re-org attack
Since blocks are signed by PoSpace keys, a farmer can theoretically sign multiple blocks with the same PoSpace, at the same height. The attack requires a malicious party to bribe farmers with a certain amount of funds for them to provide a signature of an alternate chain. It does not require the attacker to have a faster VDF.

If the attacker can convince every single farmer N blocks deep to sign, they can revert or reorder any transaction in those N blocks. This attack requires 100% compliance, likely from unwitting participants. As soon as those participants learn of the attack, at least some of them would probably stop. It is therefore only a short-term attack.

One potential prevention for this attack would be to use fraud proofs. However, these enable other attacks and complicate behavior, so they were not chosen.

Instead, the solution is simply to wait longer. After 32 blocks (approximately 10 minutes), we can make a reasonable assumption that at least one farmer is following the protocol and not double signing. If 54% is non-colluding (the assumption for 46% attack resilience), the probability of a reversal after 32 blocks is `0.46^32` or `1.6*10^-11= 0.000000000016`. Furthermore, this attack is detectable, so it is not easy to pull off.

Each user can choose their own threshold for which they accept a transaction/block as final. For example, in cases where the total network space drops suddenly, users can be more careful and not consider transactions final, in case there is another existing fork, due to a network split, for example.

## Orphaning transaction blocks for transaction fees
Transaction blocks are different from non-transaction blocks, since they contain transaction fees. These may surpass block rewards. For example, Ethereum has had created some blocks with 2 eth of rewards and 8 eth of fees. ([EIP 1559](https://eips.ethereum.org/EIPS/eip-1559) changes the calculation significantly, so this is just a historical example of what is possible in other chains.)

In Chia this will be more extreme, since not every block contains transactions. This leads to attacks where the 2nd place farmer ignores the 1st place in an attempt to win the transaction block. If the 2nd block comes less than 28 seconds after the 1st, they do not specify the previous block, and thus the 2nd place cannot orphan the 1st. The 3rd place could orphan both, but nobody would follow this chain since it is shorter.

However, if there are no blocks within 28 seconds of the 1st block, the 2nd could orphan the 1st, but they would have to convince the next block to farm on their alternate chain. An easier attack would be if the attacker controlled both the 2nd and 3rd, in which case they could ignore the first and still be longer. These orphaning attacks do not allow the attacker to steal rewards, but rather allow the attacker to slightly lower the difficulty. Since they are very situational and require a lot of space, attempting this attack will likely harm the network more than the potential gain to the attacker.

## Orphan Rate
In Chia consensus, two competing blocks around the same time can both be included into the blockchain in parallel, without knowing about each other (although at most one can be a transaction block). When multiple blocks are included at the same time, the result is a chain with a higher weight. This means that the orphan rate in Chia will be essentially zero, assuming low network latency. If network latency exceeds the infusion delay (30-40 seconds), then orphaning of a block is almost guaranteed, so it is more of a step-function. This is in contrast with Nakamoto-PoW in which the orphan rate is high if there is network delay, and decreases smoothly as network condition improves, but never reaches zero.
