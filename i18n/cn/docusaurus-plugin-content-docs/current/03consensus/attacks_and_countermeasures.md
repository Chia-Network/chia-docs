---
sidebar_position: 14
---

# 3.14 Relevant Attacks and Countermeasures

## 51% (46%) attack:
A 51% attack involves creating an alternate chain which eventually reaches a higher weight than the honest chain, and forces users to reorg.
The classic long range attack which is also present in proof of work systems is the 51% attack.
In the 51% attack, the attacker with 51% of the network space creates an alternate chain and eventually catches up.
There are two main differences between Chia consensus and Proof of work: the first is that the attacker can extend and farm on many chains simultaneously.
The second is that if the attacker has the fastest VDF, they can get an additional space advantage/boost.

## Extending many chains
If an attacker is making their own private chain, they can choose which block gets infused into the challenge chain, and can therefore try many different infusions such that they get the best possible chain.
Due to the average of 32 blocks with the same challenge, the attacker can only try about 32 different combinations (which block to include in the challenge chain),
and exponentially branching of trying each of these would give a small boost in space for the attacker 
(Having 5 PiB they can pretend to have 6 or 7, etc).
This is because the alternative chains being tried are inferior and less likely to overtake the longest one.
This has been analyzed in [1].

The actual amount of space required to perform this attack (for the attacker to get a heavier chain than the rest of the network combined) is 46.3%,
due to the ability for an attacker to "try" different combinations of blocks, for example omitting or not omitting the first block.
If there was a new proof of space challenge for every single block,
the attacker can multiply their space by a factor of e=2.718, where only 27% is required to overtake the network.
Setting the expected number of blocks per slot to 32, increases the attacker's required space to 46%. 

The reason for not increasing this further than 32 is the following:
if we increased the number of blocks per 10 minute slot to something like 200,
then the ability for someone with a slightly faster VDF to orphan others would increase.
This is because the time between blocks would get very small.
With 32 blocks, the time between blocks is around 15-25 seconds, and a much faster VDF is required to orphan.

Furthermore, the Stanford paper [Tse et. al, 1] shows that increasing the number of blocks per challenge increases security at a very slow rate,
so increasing this number slightly does not provide much benefit.

If the attacker were to manipulate the difficulty, they can change it so that they get less reward blocks per slot. Then they can either include or exclude each block, and exponentially extend all chains simultaneously, and they would be able to multiply their space by a small factor [1]. It is not clear whether this attack gains very much, since the attacker must change the difficulty, which requires sacrificing some weight. However, to prevent this attack, there is a requirement that at least 16 reward chain blocks must be created for a challenge block to be included. This brings the required attacker space in the worst case scenario from 27% up to 42%.

## Faster VDF and 46% of space
The 46% attack gets worse if the attacker’s VDF is faster. Let’s assume the attacker’s VDF is 2x faster. Then their chain will be able to create challenges and blocks at 2x the rate of the rest of the network, which means they can create a "heavier" chain with the same amount of space.

This required space drops from 46% to approximately 30% of the total network space. 0.46/0.54 = 2x/(1-x). x=0.30. If the attacker does not have access to the fastest VDF, they will not be able to get a space advantage.
Chia space / global hard drive space 
There is a concern that if the Chia system does not have a significant amount of space compared to the available free space of hard drive manufacturers or large companies that it will be vulnerable to 51% attacks. Therefore the more space taken by the Chia system, the more secure the network is. One plausible scenario is that a lot of space comes on, making the rewards per TB quite low, and not significant enough to justify buying drives or deleting business data. Furthermore, creating a plot requires a fixed amount of upfront time and money (from current calculations in beta17, about 1kWh for a k32, or about 10 cents, which is $1 per terabyte).

## 100% attack
If difficulty adjustment was triggered every X VDF slots, as opposed to every X blocks, this would allow for a 100% attack, where all farmers collude to constantly decrease or increase the difficulty. In normal operation, there are 32 blocks per slot. Under a 100% attack, the difficulty is manipulated such that difficulty goes down by 2, so there are 64 blocks per slot, and then goes up by 4, so there are 16 blocks per slot, alternating forever. This would allow farmers to earn on average 64+16/2 = 36 block rewards per slot. This is the reason for making difficulty adjustment based on the number of blocks.

## Short range replotting attack
Plotting usually takes a few minutes to a few hours even on fast hardware, but it is parallelizable and getting faster.
Attackers might find ways to create plots after a signage point is released, but before the infusion point and then delete the plot, in effect being able to farm without storing the space continuously.
This will likely require expensive specialized hardware with fast memory, since the plot must be created in time for the infusion (less than 28 seconds).

If we assume the worst case scenario of a farmer being able to create a plot instantly,
the question becomes, what is the cost and what is the benefit of the attack? 
The cost is the electricity, memory, hardware and infrastructure cost of creating that plot.
The cost of creating 1TB is currently on the order of $1 in electricity costs. The benefit would be the same benefit 
as storing that plot for 80 minutes (the signage point interval times the plot filter constant). 
This is because the attacker can choose a plot that passes the plot filter. 
Assuming $5 per year value per terabyte, the value of a 1TB plot for 80 minutes is $0.00094. 
Therefore with current plotting software and hardware, it is significantly cheaper to store the plots as opposed to recreating them. 

The plot filter constant is very useful to reduce the amount of disk lookups farmers must do. 
With a plot filter of 512, Instead of 7 disk reads per plot every 9 seconds, farmers only need to do about 7 reads for every 80 minutes. 
The plot filter constant provides a multiplier of replotting benefit to the attacker, so it must not be set too high. 
With a plot filter constant of 512, 1/512 plots are valid for every challenge.
The attacker can then only create plots that pass the filter, therefore not needing to create the other 511/512ths. 
Setting it to 512 provides a 512x multiplier, etc.

## Faster VDF (but not 51% attack)
With the fastest VDF in the system, an attacker can more effectively perform a 51% attack: i.e expand their space,
when farming in a private chain. If the attacker does not reach a total of 51% of space (with the VDF boosting and extending many chains as above), the usefulness of the faster VDF decreases substantially. This is because inclusion and exclusion of blocks does not depend on how fast you can perform the VDF, but instead depends on whether it’s less than the sub-slot iterations. Furthermore, an attacker needs the space of the rest of the network in order to advance, and therefore must release the challenges to the network.

In certain cases where blocks come very close together, having a faster VDF can allow an attacker to orphan certain blocks, although this does not increase rewards in the short term, and has a risk of undermining the network in the long term. TODO: expand: bram

## Selfish Farming
Selfish farming is an attack where the attacker farms blocks in private, and only releases them when they are at risk of being surpassed by the honest chain. In Nakamoto PoW this provides significant gains, because at any point at which the miner is ahead of the rest of the network, the rest of the network is wasting their hashpower on a chain that will not win. In Chia consensus this is different, due to the 30-40 second delay and the fact orphaning other farmers' blocks does not increase rewards. (??)TODO: expand: bram

## Farmer bribe trunk attack
An interesting attack explored by [10] is the bribing attack which takes advantage of the predictability of the elected “leaders” in each slot. The authors analyze a proof of stake chain, and argue that when participants know that they are going to win in advance, there is a potential bribing attack. If participants knew in advance which plots would win, each user can notify an attacker that they are willing to participate in the attack, and if they reach a certain threshold, they can completely reorg the chain (or orphan those who do not participate, censor transactions, etc). This attack does NOT require the majority of the space in the network to participate; only the winners in that short time period. Furthermore, it is undetectable, since the attacker can make a normal looking chain. 

This problem is not present in this revision of the Chia consensus algorithm. This problem is solved by reducing the predictability: each farmer does not know for sure if their proof of space is fully eligible until the signage point. Therefore an attacker must bribe a large majority of the space to pull off this attack. 

## Farmer bribe foliage reorg attack
Since blocks are signed by PoSpace keys, a farmer can theoretically sign multiple blocks with the same PoSpace, at the same height. The attack requires a malicious party to bribe farmers with a certain amount of funds for them to provide a signature of an alternate chain. If the attacker can convince every single farmer in N blocks to sign, they can revert or reorder any transaction in those N blocks. Potentially fraud proofs could be used, but these were not chosen since they enable other attacks and complicate behaviour. 

Instead, the solution is simply to wait longer. After 32 blocks (approximately 10 minutes), the assumption that at least one farmer is following the protocol and not double signing is a reasonable one. If 54% is non-colluding (the assumption for 46% attack resilience), the probability of a reversal after 32 blocks is1.8*10-13=0.00000000000018. Furthermore, this attack is detectable so it is not easy to pull off.

Each user can choose their own threshold for which they accept a transaction/block as final. For example, in cases where the total network space drops suddenly, users can be more careful and not consider transactions final, in case there is another existing fork, due to a network split, for example. 

## Orphaning transaction blocks for transaction fees
Transaction blocks are different from non-transaction blocks, since they contain transaction fees. These may surpass block rewards. At the time of writing (November 2020), in peak defi hype we are seeing 2 eth block rewards with 8 eth fees per block. In Chia this will be more extreme, since not every block contains transactions. This leads to attacks where the 2nd place farmer ignores the 1st place in an attempt to win the transaction block. If the 2nd block comes less than 30 seconds after the 1st, they do not specify the previous block, and thus the 2nd place cannot orphan the 1st. The 3rd place could orphan both, but nobody would follow this chain since it is shorter. 

However, if there are no blocks within 30 seconds of the 1st block, the 2nd could orphan the 1st, but they would have to convince the next block to farm on their alternate chain. An easier attack would be if the attacker controlled both the 2nd and 3rd, in which case they could ignore the first and still be longer. These orphaning attacks do not allow the attacker to steal rewards, but rather allow the attacker to slightly lower the difficulty. Since they are very situational and require a lot of space, attempting this attack will likely harm the network more than the potential gain to the attacker.

## Orphan Rate
In Chia consensus, two competing blocks around the same time can both be included into the blockchain in parallel, without knowing about each other. (Although at most one can be a block). Since all transaction blocks are also blocks, they are both included into the chain, resulting in a chain with higher weight. This means that the orphan rate in Chia will be essentially zero, assuming low network latency. If network latency exceeds the infusion delay (30-40 seconds), then orphaning of a block is almost guaranteed, so it is more of a step-function. This is in contrast with Nakamoto-PoW in which the orphan rate is high if there is network delay, and decreases smoothly as network condition improves, but never reaches zero.
