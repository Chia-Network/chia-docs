  ---
  sidebar_label: Introduction
  title: Introduction - Chia Green Paper
  slug: /introduction
  ---

The [Chia network](https://chia.net) is a permissionless blockchain that was launched on March 19, 2021.
Chia is a "longest-chain" blockchain like Bitcoin, but uses disk-space instead of computation as the main resource to achieve consensus. This holds the promise of being much more ecologically and economically sustainable and more decentralized than a proofs of work (PoW) based blockchain like Bitcoin could be.
Figure [1](#fig:C4){reference-type="ref" reference="fig:C4"} illustrates one slot of the Chia blockchain.
The main aim of this document is to explain the rationale for this rather complicated design.

<figure id="fig:C4">
<embed src="./IPE_chia/4chainsX.pdf" />
<figcaption><span id="fig:C4" label="fig:C4"></span>Illustration of one slot (taking around 10 minutes) of the <span>Chia</span> blockchain. For illustration the slot has just 16 (instead 64) signage points and only 4 blocks (the actual chain has a target of 32).</figcaption>
</figure>

As mentioned, Chia is basically what's called a *longest-chain* protocol in the literature [@BrownCohen2019; @Bagaria2019]. This notion captures blockchain protocols that borrow the main ideas from the Bitcoin blockchain: the parties (called miners in Bitcoin and farmers in Chia) that dedicate resources (hashing power in Bitcoin, disk space in Chia) towards securing the blockchain just need to

1.  listen to the (P2P) network to learn about progress of the chain and to collect transactions.

2.  locally use the resource (via proofs of work in Bitcoin or proofs of space in Chia) trying to create a block which extends the current chain.

3.  if a winning block is found, gossip the new block to the network.

No other coordination or communication amongst the parties is required. In particular, as the miners in Bitcoin, the farmers in Chia only need to
speak up once they find a block and want it to be included in the chain.

Constructing a secure permissionless blockchain using proofs of space is much more challenging than using proofs of work. In particular, a secure (under dynamic availability) longest-chain protocol based on proofs of space alone does not exist [@BP22],
so Chia's *proofs of space and time* (PoST) consensus
protocol, apart from farmers providing disk space, additionally relies on so called time lords who evaluate verifiable delay functions (VDFs).
Figure [2](#Figflow){reference-type="ref" reference="Figflow"} gives an overview of the formal security proofs and more informal arguments outlined in this document.

<figure id="Figflow">
<div class="center">
<embed src="./IPE_chia/CHIAflow2.pdf" />
</div>
<figcaption><span id="Figflow" label="Figflow"></span>An illustration of the main security proofs and arguments for the <span>Chia</span> consensus layer.</figcaption>
</figure>

## Security {#S:css}

The Bitcoin blockchain is secure [@Garay2015] as long as the hashing power $hash_h$ (measured in hashes per second) contributed by honest parties is larger than the hashing power $hash_a$ available to an adversary, i.e.,
$$\label{e:btcsecure}
hash_h > hash_a$$
Similarly, the security of Chia depends on the amount of space $space_h$ and $space_a$ controlled by the honest parties and the adversary, respectively.
Additionally, the speed $vdf_h$ and $vdf_a$ (measured in steps per second) of the VDFs run by the fastest honest time lord and the adversary are relevant.
With these definitions,
$$\label{e:chiasecure}
\textrm{{\sf Chia}\ is provably secure if : }
space_h\cdot vdf_h > space_a \cdot vdf_a \cdot 1.47$$
Let us stress that Chia only requires a single time lord (which runs 3 VDFs) to be active at any time, in particular, $vdf_h$ in eq.([\[e:chiasecure\]](#e:chiasecure){reference-type="ref" reference="e:chiasecure"}) refers to the speed of the fastest VDFs controlled by an active and honest time lord, it doesn't matter if one or a billion time lords are active. In practice we'd still expect a small number -- not just one -- time lords to be available to have a backup should the currently fastest time lord become unavailable.

On the other hand, we make no assumptions about the number of VDFs controlled by the adversary.
Security as in eq.([\[e:chiasecure\]](#e:chiasecure){reference-type="ref" reference="e:chiasecure"}) holds even when assuming the adversary controls an unbounded number of VDFs of speed $vdf_a$.

This assumption comes at a prize: there's a $1.47$ factor by which the adversarial resources are multiplied in eq.([\[e:chiasecure\]](#e:chiasecure){reference-type="ref" reference="e:chiasecure"}).
This factor is there due to an attack we call "double dipping". This and other attacks will be discussed in §[3](#S:LCeff){reference-type="ref" reference="S:LCeff"}. For now let us just mention that
there's nothing special about the constant $1.47$, it can be lowered to $1+\epsilon$ for any $\epsilon>0$ by increasing the number of blocks
that depend on the same challenge (in Chia this is set to at least 16).

The bound in eq.([\[e:btcsecure\]](#e:btcsecure){reference-type="ref" reference="e:btcsecure"}) is not tight in the sense that we don't have an attack that works if we replace "$>$" with"$<$". We have an attack assuming giving the adversary a slightly lower boosting factor of $1.34$
$$\label{e:ddpossible}
\textrm{double spending in {\sf Chia}\ possible if : }space_h\cdot vdf_h < space_a \cdot vdf_a \cdot  1.34$$
More concretely, if $vdf_h=vdf_a$, i.e., if the adversary has (an unbounded number of) VDFs of the same speed as the fastest honest time lord, then double spending is possible controlling $\frac{100\%}{1+1.34}\approx 43\%$ of the total space.

A contribution of this writeup is a modular approach towards achieving secure longest-chain blockchains from efficient proof systems. In §[3](#S:LCeff){reference-type="ref" reference="S:LCeff"} we outline three attack vectors (illustrated in Figure [3](#Fig1){reference-type="ref" reference="Fig1"}) that emerge if we naïvely replace proof of work with an efficient proof systems.

## Network Delays

In Bitcoin each block contains the hash of the previous block. If two blocks are found at roughly the same time, so there was no time for the block that was found first to propagate to the miner that found the second, they will refer to the same block, and only one can be added to the chain. The other will be "orphaned" and does not contribute towards securing the blockchain.
The fraction of orphaned blocks depends on the network delay (the smaller the delay the fewer orphans) and the block-arrival time (fewer blocks per minute decrease the probability of orphans).
Taking this into account, the security statement for Bitcoin from eq.([\[e:btcsecure\]](#e:btcsecure){reference-type="ref" reference="e:btcsecure"}) should be augmented to:
$$\label{e:btcsecure2}
hash_h \cdot \left(1-\frac{network\ delay}{block\ arrivial\ time}\right)> hash_a$$
Even with its very slow 10 minutes block arrival time, Bitcoin's orphan rate was measured to be around $1.6\%$ [@Decker2013].
As the Chia chain is not a typical hash chain, but an ongoing VDF computation where blocks are infused, there's an elegant way to avoid orphans: the "infusion point" of a block is around 30
seconds (more precisely, between $28.125$ and $37.5$ seconds) worth of VDF computations after the "signage point" it must refer to, and as long as the network delay is small enough so the block creating/gossiping process takes less than 30 seconds no orphans will occur. In particular, the bound from Eq.([\[e:chiasecure\]](#e:chiasecure){reference-type="ref" reference="e:chiasecure"}) holds under this very weak network assumption independent of the block arrival time.

The target block arrival time in Chia is set to $18.75$ seconds (32 blocks per 10 Minutes slot), and while each of those blocks contributes to security, only a subset of these blocks actually carry transactions (roughly $36\%$, that's a block every $51.2$ seconds) in order to ensure that transaction blocks sequentially refer to each other. This prevents issues with inconsistent transactions, as each block producer known the entire history.

## Game Theoretic Aspects

Apart from proving security assuming the honest parties control a sufficient majority of the resources, to argue that a longest-chain protocol will be secure in the real world we need to justify why rational parties would behave honestly in the first place.
In particular, it should not be possible to get more rewards by deviating from the honest mining/farming behaviour. While Bitcoin is not fair in this sense due to selfish mining attacks [@Eyal2018], these attacks are not really practical and have not been observed in the wild for reasons we'll sketch below and discuss in more detail in §[4](#S:fair){reference-type="ref" reference="S:fair"}.

#### Fairness in Chia.

Achieving fairness that is comparable to what Bitcoin achieves is a main design goal of Chia.
While arguing about fairness directly is rather subtle, we identify two clean properties called "no slowdown" and "delayed gratification" a longest-chain can satisfy.
Delayed gratification by itself already is a deterrent against selfish farming, and we show (Proposition [1](#P:DC){reference-type="ref" reference="P:DC"} in §[4](#S:fair){reference-type="ref" reference="S:fair"}) that these two properties jointly imply a chain-quality (i.e., fraction of honest blocks in the longest chain) no worse that what Bitcoin achieves.

#### No-Slowdown.

The no-slowdown property was identified as a desirable property for longest-chain blockchains in [@greenpaper]. It holds if (even an unbounded) adversary cannot slow down the growth of the chain by participating. We discuss the no-slowdown in Chia and various other chains in §[4.5](#s:nschia){reference-type="ref" reference="s:nschia"}.

#### Delayed Gratification.

The Chia design ensures that proof of space challenges are only revealed once they are needed, and once they're revealed they cannot be influenced any more.
This then implies that it's impossible for a selfish farmer to create more blocks by deviating from honest farming, and thus -- like in Bitcoin -- the only thing a selfish farmer can do is prevent other farmers from adding their fair share of blocks in the current epoch (potentially even loosing out on blocks themself). The reason a selfish farmer would do this is in order to enforce a lower difficulty, and thus more rewards for themselves, in the future [@Eyal2018]. We denote chains with this property as having "delayed gratification".[^1]
While delayed gratification doesn't prevent selfish mining, it severely limits the type of selfish mining possible, and we don't expect to observe selfish farming in Chia for the same reasons we don't observe selfish mining in Bitcoin. As mentioned above, in combination with the no-slowdown property it even implies a chain-quality as in Bitcoin.

## Farmers and Time lords {#S:FandT}

Constructing a secure blockchain based on proofs of space is significantly more challenging than with proof of work.
So the Chia design, as illustrated in Figure [1](#fig:C4){reference-type="ref" reference="fig:C4"} is (arguably necessarily) more sophisticated than Bitcoin or other PoW based blockchains, which are basically just hash chains.
Apart from proofs of space and standard cryptographic building blocks like hash functions and signature schemes, the security of Chia crucially relies on verifiable delay functions (VDFs) [@Boneh2018; @Pietrzak2019; @Wesolowski2020]. Informally, VDFs are functions whose computation is inherently sequential and verifiable and thus serve as a "proof of time".

We will now shortly sketch how the Chia blockchain is maintained by farmers and time lords.

#### Farmers.

Farmers are the analogue of miners in Bitcoin, but instead of hashing power, farmers contribute disk-space towards securing the Chia blockchain.
As in Bitcoin, they are incentivized by block-rewards and transaction fees. As in Bitcoin, the block-rewards (i.e., some freshly minted coins that go to the block creator) decrease over time, but unlike in Bitcoin they will never go to zero for reasons outlined in [@Carlsten2016].

To participate in farming a farmer must first initalize its disk-space, this process is called plotting and the files created and stored during this process are called plots. The smallest allowed plot in Chia is slightly larger than 100GB, though for plotting one temporarily needs more than this. Once the plot(s) are in place, a farmer just listens to the network for proof of space challenges. There's a new challenge roughly every 9.375 seconds and they are computed by a time lord as discussed below. For efficiency reasons there's a "plot filter" which for each plot dismisses all but (in expectation) one in 512 challenges immediately,
so a plot is only accessed once every 80 minutes. The reason to not increase this time even further are so called replotting attacks which we'll
discuss in §[2.8.3](#S:replotting){reference-type="ref" reference="S:replotting"}.

In Chia only roughly $36\%$ of the blocks will carry transactions, but as a farmer doesn't know whether their block will be a transaction block
when creating the block, farmers must always include transactions to the blocks they create.

#### Time lords. {#SS:chain}

A time lord runs three VDFs, once every $9.375$ seconds they gossip a "signage point" that serves as a PoSpace challenge for the farmers. They also listen to the network for blocks
created by farmers. If a valid block is received in time it gets "infused" into the chain (the infusion is always somewhere from 28.125 to 37.5 seconds after the signage point).

The above only holds for the the time lord which runs the fastest VDFs. Time lords with slower VDFs can basically just recompute values that were already gossiped, so there's seemingly no point for them to participate. We still want a small number of time lords to participate (or at least be ready to take over) should the fastest time lord fail or misbehave.

Unlike farmers, time lords do not receive any rewards in form of block-rewards or transaction fees. One reason is technical, unlike for farmers whose PoSpace contained in the blocks are linked to a signature public-key to which a reward can be given, the computation of the time lords is (and to prevent grinding attacks must be) canonical, they cannot attach a public-key to the values they computed. A second reason is the fact that it's not clear at all how such a reward would be distributed.
If the fastest time lord gets the entire reward only they would be incentivized, but not the slower ones we'd like to have as back-ups.
If also the slower ones get something then we'd get a PoW type lottery which we want to avoid in the first place.
Chia thus relies on a small number of time lords to run fast VDFs without being incentivised by on-chain rewards.

## Difficulty and Chain Selection Rule {#S:DiffCSR}

#### Difficulty.

In Bitcoin a difficulty parameter $D$ controls how many hashes are required in expectation to find a block. This parameter is re-calibrated every 2016 blocks (called an epoch and taking roughly 2 weeks) so blocks arrive roughly every 10 Minutes.

Chia has two parameters, a difficulty parameter $D$ and a time parameter $T$, these are re-calibrated once every 4608 blocks (this epoch takes around 1 day). The time parameter $T$ is reset
to fit the target time of 10 minutes per slot, while the difficulty is reset to target an average of 32 blocks per slot.

For example if in an epoch the amount of space is $10\%$ higher than anticipated the difficulty for the next epoch would get up $D_{new}:=D_{old}\cdot 1.1$ while the time parameter remains unchanged $T_{new}:=T_{old}$. If the VDF speed in the epoch is $10\%$ higher than anticipated (i.e., the epoch only takes $24/1.1$ instead of $24$ hours) the time parameter goes
up $T_{new}:=T_{old}\cdot 1.1$, and even though the space didn't change, the difficulty needs also to go up $D_{new}:=D_{old}\cdot 1.1$ account for the fact that now an epoch has more VDF steps.

#### Chain Selection Rule.

Bitcoin has a very simple chain selection rule (aka. fork choice rule) which specifies which fork a miner should work on: a miner should always try to extend the "heaviest" chain they are aware of. The weight of a chain is the sum of the blocks, each multiplied by the difficulty parameter used while it was mined. Unless we consider forks which pass an epoch boundary, the heaviest chain is also the chain with the larger number of blocks, hence the name "longest chain" protocol.

We can define the weight of a chain in Chia analogously to Bitcoin, and currently the default Chia farmer code follows basically the same "follow the heaviest chain" rule as Bitcoin miners.
But let us stress that it's not clear whether for Chia this simple rule is the best choice.
For example, one could consider a rule for farmers where in case of a fork where both chains have the same weight they would work on both chains (note that in a PoW based chain this is not possible). While such a rule can slow down consensus, the observed fork could be due to an attack (double spending or selfish mining) trying to "split" the contribution of the honest space in two different chains, letting the farmers work on both forks would thwart this.

In Chia we also must specify a chain selection rule for the time lords. A time lord who does not control the fastest VDF will constantly fall behind
and thus intuitively should just constantly adapt the chain with the most VDF steps in them. But if all time lords naïvely do this a malicious time lord controlling the fastest VDF could simply skip infusing any blocks they want, allowing for all kinds of attacks. Thus the rule for time lords has to be more nuanced, taking into account the chains they observe, and also blocks that were created by farmers but not infused in any of the chains.

Determining the best rules for Chia farmers and time lords is ongoing research. Fortunately, the rules for farmers and time lords are more of a social convention rather than a specification of the chain. As our understanding improves, new rules can be implemented in the code base and there's no need for a (soft) fork.

## Cryptographic Building Blocks

The Chia blockchain uses standard cryptographic building blocks, in particular hash functions and signature schemes.
More interestingly, it relies on two (non-interactive) proof systems which were especially developed for constructing sustainable blockchains: proofs of space and verifiable delay functions. We shortly discuss the requirements Chia has to these building blocks.

#### Hash Functions.

Chia uses SHA256 for hashing, but any collision resistant hash function would do.
For efficiency reasons, we also use the round function of CHACHA8 and BLAKE3 within the proof of space construction where we just need some scrambling but no cryptographic hardness (not even one-wayness).

#### Signatures.

Chia uses deterministic BLS signatures for signing. In principle any signature scheme could be used as long as the signatures are unique, i.e., it's impossible (or at least computationally hard) to create two different valid signatures for the same message. Uniqueness will be crucial to prevent so called grinding attacks.

#### Verifiable Delay Functions.

A VDF is specified by some inherently sequential function, and a proof system for showing the output of the function is correct.
The sequential function used in the VDF deployed in Chia is repeated squaring in class groups of unknown order. The group is not fixed, but a fresh group is sampled every time a value is infused. The proof system is Wesolowski's [@Wesolowski2020] proof of exponentiation which has proof of size only one group element. Only the VDF output, but not the proofs, are committed on-chain. This has the advantage that one can replace the proofs.
In the current implementation one first computes a much larger but faster to compute proof of 64 group elements, which later is replaced by a normal (one element) Wesolowski proof. It also means one can easily replace Wesolowski's proof with another proof system should a weakness with this proof system (which relies on new number theoretic assumptions) be discovered. We discuss VDFs in detail in §[8.3](#S:vdf){reference-type="ref" reference="S:vdf"}.

#### Proofs of Space.

The notion of proofs of space was introduced, and a first construction proposed, in [@Dziembowski2015] (a security proof for their construction
in the random oracle model was given in [@Pietrzak2019a]). This construction, which is combinatorial and based on pebbling lower bounds for particular graphs, has the major drawback that the initialization phase is *interactive*. A consequence of this is that if one wants to use this PoSpace in a blockchain, the farmers must first commit to their plots before they can be used for farming (say by recording this commitment on-chain via a special transaction as suggested in Spacemint [@Park2018]). A new PoSpace with a *non-interactive* initialization had to be developed for Chia [@Abusalah2017]. This construction basically just specifies some function $f$, and then stores its function table $(x,f(x))$ sorted by the outputs $f(x)$. On challenge some value $y$, the prover looks up the entry $(x,y)$ (which is efficient as the list is sorted) and replies with the proof $x$, which can be easily verified checking that $y\stackrel{\tiny ?}{=}f(x)$. Unfortunately this simple construction miserably fails to be secure: the prover can store much less than the full function table, while still being able to efficiently find proofs. The reason are Hellman's time-memory trade-offs, a technique proposed in 1980 to break symmetric cryptographic schemes [@Hellman1980]. In [@Abusalah2017] it is shown how this simple construction can be "salvaged" to overcome any time-memory trade-offs.[^2] We'll discuss definition of a PoSpace, and the construction used in Chia in particular, in §[8.2](#S:PoS){reference-type="ref" reference="S:PoS"}.

## A High Level View of the Protocol {#S:high}

The design and rationale of the Chia blockchain is explained in the following sections, here we'll just give a very high level view of the
chain as illustrated in Figure [1](#fig:C4){reference-type="ref" reference="fig:C4"}. The chain itself consists of four chains, one hash chain and three VDF chains.

#### Hash and VDF chains.

While hash chains are a classical cryptographic construction, VDF chains were first used in Chia.
A VDF chain alternates VDF computations with *infused* values. It provides the security properties present in hash-chains, that is, the
head of a chain commits its entire past (technically, given the head of a hash or VDF chain, it's computationally infeasible to come up with two different chains that end in that value). In addition, VDF chains come with a sequentiality property: the number of sequential steps to compute the VDF chain is the sum of the steps required for all the VDFs in that chain, i.e., the VDFs must be computed sequentially.
Hash and VDF chains are discussed in more detail in §[5](#S:chains){reference-type="ref" reference="S:chains"}.

The four chains which constitute the Chia blockchain are the (1) foliage chain ${\cal FC}$, which is a normal hash-chain and contains the transactions (2) the reward chain ${\cal RC}$ which records all blocks (3) the challenge chain ${\cal CC}$ used to create PoSpace challenges and (4) the infused challenge chain ${\sf i}{\cal CC}$ for some extra security properties. While ${\cal RC}$ and ${\cal CC}$ are normal VDF chains, ${\sf i}{\cal CC}$ is more of a sequence of forks from ${\cal CC}$.

#### Blocks.

A block $\beta=\{\beta_F,\beta_T\}$ is made of two parts, the foliage block $\beta_F$, which contains the payload (transactions and a time-stamp) and the trunk block $\beta_T=\{\sigma,\mu_{{\sf rc\_sp}}\}$ which contains a PoSpace $\sigma$ and a signature $\mu_{{\sf rc\_sp}}$.

#### Building the Chains.

-   A time lord computes the ${\cal RC},{\cal CC},{\sf i}{\cal CC},{\cal FC}$ chains and broadcasts relevant values to the network. This includes signage points ${\sf rc\_sp}$ and ${\sf cc\_sp}$ which are the values of the ${\cal RC}$ and ${\cal CC}$ chains (together with a proof that these values are on the VDF chains) once every $9.375$ seconds.

-   A farmer who receives these *signage points* ${\sf rc\_sp}$ and ${\sf cc\_sp}$ checks whether these points are of interest (i.e., on the heaviest known chain) and all the VDF proofs verify.
	Next, for each of their plots, they use ${\sf cc\_sp}$ as a challenge to compute a PoSpace $\sigma$.
	Then they check whether $\sigma$ satisfies a winning condition that allows to produce a block.

	If a winning PoSpace $\sigma$ is found, the farmer creates a signature $\mu_{\sf rc\_sp}$ of ${\sf rc\_sp}$ (that verifies under the $pk$ associated with $\sigma$) and a foliage block $\beta_F$ and then gossips the block $\beta=\{\beta_F,\beta_T=\{\sigma,\mu_{\sf rc\_sp}\}\}$.

-   When a time lord receives this block, they check whether the block satisfies all conditions to be infused into the chain.

	(${\cal RC}$) If yes, the trunk block
	$\beta_T$ is infused into ${\cal RC}$ once its *infusion point* is reached, which is somewhere between 3 and 4 signage points (28.125 to 37.5 seconds worth of VDF computations) past the signage point of that block.

	(${\cal CC}$) If this happens to be the first block whose signage points are in the current slot, then $\mu_{\sf rc\_sp}$ (but not $\sigma$) is infused into the challenge chain ${\cal CC}$ at the end of the current slot. This way the challenge chain depends only on one block per slot.

	(${\sf i}{\cal CC}$) For some extra security, the time lord doesn't simply wait till the end of the slot to infuse the signature, but a third VDF is used to fork from
	${\cal CC}$ at the infusion point by infusing $\mu_{\sf rc\_sp}$ into ${\cal CC}$, and this fork, called the infused challenge chain ${\sf i}{\cal CC}$, is then infused back to ${\cal CC}$ at the end of the slot.

	(${\cal FC}$) Iff the signage point of this block is later than the infusion point of the last *transaction block*, then this block is also a transaction block. Only in this case its foliage $\beta_F$ is appended to the foliage (hash) chain ${\cal FC}$, and this block becomes a "transaction block".

## Space Oddities

When constructing a proof of stake or proof or a space based longest-chain protocol one faces similar challenges due to "nothing at stake" (aka. costless simulation) issues, we'll discuss these in §[3](#S:LCeff){reference-type="ref" reference="S:LCeff"}. But there also aspects in which Space and Stake differ, and we'll shortly discuss three of them below. The first difference is the fact that space, unlike stake, is an unsized resource, which for example means that we can't have "certificates" [@LewisPye2021]. The second difference is the fact that stake is an internal resource, while space is an external resource, one of the consequences of this is that a space based protocol can recover from malicious majority, while a stake based cannot. The third are replotting attacks against space which have no analogue in the stake setting.

### Sized vs. Unsized

A key difference between stake and work is the fact that in a stake based chain we know the amount of the resource available for mining, while for an external resource like work or space this is no longer the case. Lewis-Pye and Roughgarden [@LewisPye2021a; @LewisPye2021] formalize this as the *sized* vs. *unsized* setting and prove some fundamental differences between them. The main result in [@LewisPye2021] shows that *certificates* which "provide incontrovertible proof of block confirmation", only exist in the sized setting, i.e., for PoStake but not PoWork blockchains.

In their framework *space* and also *space and time* (i.e., the available space multiplied with the speed of the available VDFs) as used in Chia are an unsized resource, so we can't hope to get certificates.

### Internal vs. External

Work or space are actual resources and we can unambiguous talk about some party holding some amount of the resource at some given point in time. Stake on the other hand is an *internal* resource defined relative to some chain on which it is recorded and "holding some stake" usually refers to the stake a party controls on the chain that currently is considered the valid one by honest parties.

The main advantage on using stake to secure a longest-chain protocol is the fact that it's extremely sustainable as no external resource is required to secure the chain. But this comes at a prize, one common argument against stake is that the chain is not really permissionless as participating in mining requires acquiring stake from the parties currently controlling it. Also from a security perspective an internal resource is delicate as keys controlling stake *not* on the current chain can be used to attack the chain. A simple example would be an attack by which a party acquires keys that were valid at some block $B_i$ in the past, but which are no longer valid at the current block and thus are "cheap" (e.g., the party can lend a large amount of stake for a short time, or offer to buy outdated keys), and then uses these keys to fork at block $B_i$ and bootstrap a chain to the present.

To prevent such attacks some chain require parties to delete old keys, but it's irrational for a party to delete old keys if they can be valuable in the future, say because one can sell them to an attacker (and this is rational if one holds just little stake, so not selling is unlikely to prevent the attack) or because there's a deep reorg and the old keys suddenly become valuable again. Combining stake with VDFs would make such attacks harder, but not prevent them as we'll discuss in §[7](#S:51){reference-type="ref" reference="S:51"}

### Replotting {#S:replotting}

A subtle but important difference between stake and space is the fact that space allows for *replotting* which has no analogue in the stake setting:
Given a challenge $c$, a space farmer controlling a plot $S$ of size $N$ can *efficiently* compute *one* proof $\sigma \gets  {\sf PoSpace.prove}(S,c)$. This is analogous to the stake based setting, but unlike in the stake setting, the farmer can *inefficiently* compute *multiple* proofs
for challenge $c$ by repeatedly creating fresh plots and computing one proof with each of them.

We refer to attacks exploiting this fact as *replotting attacks*. The most basic design choice to harden a chain against replotting attacks is to make sure that challenges arrive at a sufficiently high rate so that substantial replotting in-between two challenges is not feasible. Moreover the plot filter (which dictates what fraction of plots must be accessed with every challenge) cannot be chosen too aggressively as more aggressive filters makes potential replotting attacks easier.

A fundamental fact about PoSpace that crucially relies on replotting is that *no PoSpace based longest-chain protocol secure under dynamic availability exists* [@BP22], we'll discuss their result in more detail in §[7.2.3](#S:DAspace){reference-type="ref" reference="S:DAspace"}.
Chia overcomes this no-go theorem by using VDFs, we discuss security under dynamic availability and healing from malicious majority in the work, stake and space setting in §[7](#S:51){reference-type="ref" reference="S:51"}.

# Longest-Chain Protocols from Efficient Proof Systems {#S:LCeff}

Before we can outline the specification of the Chia blockchain and its rationale in more detail, we first must understand the general challenges one faces when constructing a PoSpace based blockchain and some of the relevant literature on how to address these challenges.

Ultimately, we want to argue security assuming only that sufficient fraction of the resource (space, fast VDFs) is controlled by *rational* parties. Towards this, in this Section we first discuss how to achieve security
assuming sufficiently many parties are *honest*, and then in §[4](#S:fair){reference-type="ref" reference="S:fair"} how *rational* behaviour is incentivized by ensuring that deviating from the protocol will not give any (or very little) extra reward to parties.

<figure id="Fig1">
<div class="center">
<embed src="./images/3Issues.pdf" />
</div>
<figcaption><span id="Fig1" label="Fig1"></span>Illustration of the three main attack vectors that arise if we replace PoW with proofs of space (or any other efficient proof systems) in Bitcoin, and how they are addressed in Chia. </figcaption>
</figure>

As mentioned in the introduction, just replacing proofs of work in Bitcoin with proofs of space does not work. For one thing, there are syntactic differences between proofs of work and proofs of space. But more importantly, security breaks down if one replaces PoW with PoSpace in any straight forward way. The reason for this is the fact that for PoSpace (after plotting) it's extremely cheap to compute a proof for a given challenge. The analogue issue
with proof of stake is sometimes called "nothing at stake\".
We'll refer to proof systems where proofs can be efficiently computed (like proofs of space or stake) as *efficient*, and describe three attack vectors that arise because of this issue:
grinding, double-dipping and bootstrapping. Those are illustrated in Figure [3](#Fig1){reference-type="ref" reference="Fig1"} and described below. In §[6](#S:CBC){reference-type="ref" reference="S:CBC"} we'll describe how those attacks are addressed in Chia in more detail.

## Griding {#S:grind}

In longest-chain blockchains the challenge used to determine the miner/farmer who can add a block is derived from the chain itself.
In Bitcoin, where the challenge for a block is simply the hash of the previous block, a miner can influence the PoW challenge by trying out different transaction sets or time stamps. While such "grinding" through different challenges gives no advantage in PoW based cryptocurrencies, it's a problem once we use an efficient proof system.

To prevent such grinding we adopt an approach from Spacemint [@Park2018] and *split the chain* in two parts which we'll call trunk and foliage. The trunk contains only canonical proofs, and the challenges depend only on values contained in the trunk. This way the only choice a farmer has to influence the challenge is by withholding a winning block. The foliage contains all the remaining "grindeable" content, in particular transactions and time-stamps.

## Double-Dipping {#S:dd}

Even once grinding is no longer an option, an adversary can in private create an entire "block-tree" by forking at each level. While each path in such a tree will have an exponentially small (in the depth) probability of overtaking the honest chain if the adversary controls less than half the resources, there's also an exponential number of paths, so it's not clear how much of an advantage this strategy gives. For constructions where each challenge depends on the previous block (as in Bitcoin), it was shown [@greenpaper] that this strategy "boosts" the resource by a factor $e\approx 2.718$, in particular, with this strategy an adversary (having an unlimited number of VDFs whose speed matches the fastest honest time lord) can create a chain that is longer than the honest one with only a $1/(1+e)\approx 0.269$ fraction of the total space, and thus significantly less than the $0.5$ fraction (of hashing power) required in Bitcoin.

To limit the impact of double-dipping an early version [@greenpaper] of Chia consensus specified that also the honest parties do a very limited form of double-dipping and try to extend the best $3$ blocks they see at every depth, this rule was (by simulations) shown to increase the space required by an adversary from the $26.9\%$ mentioned above, to $38.5\%$.

The deployed Chia protocol uses *correlated randomness* to limit the impact of double dipping. This elegant idea was introduced in [@Bagaria2019], and basically suggest to only use
every $k$th block to compute the challenges.[^3] The authors of [@Bagaria2019] determine the exact fraction of the *resource* the adversary must control to break security as a function of $k$ (as mentioned, it's $2.718$ for $k=1$, and goes to $1$ as $k$ increases). Chia uses a variant where a challenge depends on one out of *at least* (not exactly) $k=16$ blocks. Their analysis also applies to this setting, and with $k=16$ states that by double dipping the adversary can boost their resource by a factor of $1.47$, which means they must control at least a $\frac{1}{1+1.47}=0.405$ fraction of the resource for an attack.

The resource considered in [@Bagaria2019] is simply stake, while in Chia it's the product of space and VDF speed. Concerning VDFs, while for the honest parties the only thing that matters is the *speed* of the three VDFs controlled by the fastest honest time lord, for an adversary the speed as well as the number of VDFs available to them matter. In the security analysis we can simply assume the adversary controls an unbounded number of VDFs, as that's when the analysis from [@Bagaria2019] applies. This is how eq.([\[e:chiasecure\]](#e:chiasecure){reference-type="ref" reference="e:chiasecure"}) $space_h\cdot vdf_h > space_a \cdot vdf_a \cdot 1.47$ in §[2.1](#S:css){reference-type="ref" reference="S:css"} was derived.

## Bootstrapping {#ss:boot}

A major issue with longest-chain blockchains based on efficient proof systems is bootstrapping (aka. costless simulation) by which an adversary can use its resource to create a chain at basically no cost. Such bootstrapping can be used for short range attacks like selfish mining, but also long range attacks where an adversary forks the chain at a point in the past and then "bootstraps" it into the present. Such long range attacks make it hard to achieve security under dynamic availability, where we assume that the honest parties control a majority of the resource at any point in time, but the total resource can vary over time. The amount of hashing power contributed towards securing Bitcoin has varied by many orders of magnitude in the past, and the same already happened to Chia in the first weeks after launch.

Existing proposals to achieve security under such *dynamic availability* include check-pointing, which is problematic as parties that join for the first time or have not followed the chain for a longer period need additional trust assumptions to decide which chain to follow. Unlike for grinding and double-dipping, the attacks that become possible due to bootstrapping are quite different for proofs of space and proofs of stake. In the latter one must consider old keys that hold no stake in the current chain, but still can be used to bootstrap from a past block. To address this it was suggested to have honest parties use key-evolution schemes [@Badertscher2018] so the current keys cannot be used to create blocks in the past. Key-evolution is problematic as it's clearly not rational for honest parties to do; they could sell their keys or loose their stake in case of a deep reorg.

The essence of the bootstrapping problem is the fact that one cannot ensure that time has passed in-between the creation of subsequent blocks. Chia solves this problem by combining proofs of space with *proofs of time*, concretely, verifiable delay functions (VDFs), which enforce that some inherently sequential computation (which requires time linear in the length of the computation) was performed in-between the creation of blocks.
Chia combines those three countermeasures (splitting the chain, correlated randomness and proofs of time) into a single design which is secure if
the resources controlled by the honest parties satisfy the bound from Eq.([\[e:chiasecure\]](#e:chiasecure){reference-type="ref" reference="e:chiasecure"}).

# Rational Attackers {#S:fair}

<figure id="FigDG">
<div class="center">
<embed src="./IPE_chia/DelayedGratification.pdf" />
</div>
<figcaption><span id="FigDG" label="FigDG"></span>Illustration of the no slowdown and delayed gratification properties. A longest-chain blockchain satisfying these properties is no more susceptible to selfish mining than Bitcoin.</figcaption>
</figure>

In §[3](#S:LCeff){reference-type="ref" reference="S:LCeff"} we discussed how costless simulation opens attack vectors for double spending in longest-chain blockchains and how these are addressed in Chia.
To show security we assumed that a sufficient fraction of the resource is controlled by *honest* parties who follow the protocol rules.
In reality it's unrealistic to assume that parties will behave altruistically, instead we need to argue that it's *rational* for parties to follow the protocol rules. Unfortunately costless simulation also makes this task much more challenging than in a PoW based system.

In analogy to *selfish mining* in Bitcoin, we refer to strategies by which a party gets more rewards than they would by following the protocol rules as *selfish farming*.
To argue that rational parties will behave honestly it's necessary to bound the efficacy of selfish mining/farming strategies.

In §[4.1](#S:SM){reference-type="ref" reference="S:SM"} below we first discuss selfish mining and why we don't observe it in Bitcoin even though it's possible in principle.
As directly analyzing the security of a longest-chain protocol against selfish mining/farming is very challenging we take a modular approach. In §[4.2](#s:dg){reference-type="ref" reference="s:dg"} we first identify two properties -- *no slowdown* and *delayed gratification* illustrated in Figure [4](#FigDG){reference-type="ref" reference="FigDG"} -- which are satisfied by Bitcoin, and then show in §[4.3](#s:dgprop){reference-type="ref" reference="s:dgprop"} that they imply robustness against selfish mining (through the notion of chain quality) of the level as achieved by Bitcoin.
In §[4.4](#s:dgchia){reference-type="ref" reference="s:dgchia"} and §[4.5](#s:nschia){reference-type="ref" reference="s:nschia"} we then sketch how those notions are achieved in Chia.

## Selfish Mining in Bitcoin {#S:SM}

While Bitcoin prevents double spending assuming a majority of the hashing power is controlled by miners who altruistically follow the protocol, it allows for *selfish mining* [@Eyal2018] by which a miner with a $\alpha<0.5$ fraction of the hashing power can create more than an $\alpha$ fraction of the blocks and thus gets an unfair share of the block rewards. In some settings this fraction can be as large as $\alpha/(1-\alpha)$ (e.g. a $0.33$ fraction for $\alpha=0.25$).[^4]
Selfish mining has not been observed in Bitcoin, and there are various reasons why this is the case

1.  selfish mining requires either a fairly large fraction of the hashing power or very good control of the network (cf. Footnote [4](#foot1){reference-type="ref" reference="foot1"}) to be profitable

2.  the attack would be easily detected and

3.  delayed gratification as defined below.

## Delayed Gratification and No Slowdown {#s:dg}

The Bitcoin blockchain is split in epochs, each with a targeted duration of two weeks, and only at the end of an epoch the difficulty is reset to accommodate for the variation of the hashing power.
Assuming the network is reliable, within an epoch, a selfish miner cannot create more blocks than they would get by honest mining.
This follows from a crucial property of proofs of work: there's no way to find more proofs of a given difficulty (and thus blocks) in a given time window than simply
following the protocol and always working on the known longest chain.
The only thing selfish mining does in Bitcoin is to make honest parties waste their hashing power, so after the next difficulty reset (which only happens every 2 weeks) the difficulty is lower than it should be, and only at this point the selfish miner makes some extra profit.
Another property of PoW based chains like Bitcoin is that an adversary cannot slow down chain growth. We capture these two desirable properties separately below.

Delayed Gratification:

:   A chain where an adversary cannot increase the number of blocks they find in expectation within an epoch of same difficulty by deviating from the honest strategy is said to have the *delayed gratification* property.

	In Chia  by "not deviating" we mean that the adversary simply runs an honest farmer using its available space, and additionally, should the adversary control VDFs that are faster than the fastest honest time lord, they are also assumed to run a time lord.

	Intuitively, delayed gratification is a good deterrent to selfish mining by itself as it limits selfish mining to adversaries who follow a "long term" agenda.

No Slowdown:

:   A chain where an adversary (no matter what fraction of the resource they control) cannot slow down the expected block arrival time by interacting with the chain is said to have the
	*no slowdown* property.

## Chain Quality {#s:dgprop}

A longest-chain blockchain is said to have *chain quality* $\rho$ if the fraction of blocks mined by honest miners is at least $\rho$ (with high probability and considering a sufficiently large number of blocks). Chain quality was introduced in [@Garay2015] as a metric to quantify how susceptible a chain is to selfish mining. Ideally, assuming an adversarial miner who controls an $\alpha$ fraction of the resource, the chain quality should be $\rho=1-\alpha$ as this means that the adversary cannot increase its fraction of blocks by deviating.

By the Proposition below delayed gratification and the no slowdown property imply a bound on *chain quality* which matches the bound proven for Bitcoin (when ignoring network delays).

::: {#P:DC .proposition}
**Proposition 1** (Delayed Gratification and No Slowdown implies Chain Quality). *Consider a longest-chain protocol which has the delayed gratification and no slowdown property against an adversary who controls an $\alpha$ fraction of the global resource, then
the chain quality is $1-\frac{\alpha}{1-\alpha}$ (compared to the ideal $1-\alpha$).*
:::

::: proof
*Proof.* Consider an adversarial miner ${\cal A}$ with an $\alpha$ fraction of the resource and let $\ell$ denote the (expected) number of blocks to be found if everyone would mine honestly. By the no slowdown property, no matter what ${\cal A}$ does the number of blocks found is at least $\ell'\ge (1-\alpha)\cdot\ell$. By delayed gratification, at most $\alpha\cdot\ell$ of those blocks were created by ${\cal A}$, we get a chain quality of
$$\begin{aligned}
{chain \ quality}&=&\frac{honest\ blocks}{total\ blocks}\\&=&\frac{\ell'-\alpha\cdot \ell}{\ell'}\\&=&1-\frac{\alpha\cdot\ell}{\ell'}\\&\ge&  
1-\frac{\alpha\cdot\ell}{(1-\alpha)\cdot \ell}\\&=&1-\frac{\alpha}{1-\alpha}
\end{aligned}$$ ◻
:::

## Delayed Gratification in Chia {#s:dgchia}

Having motivated why the no slowdown and delayed gratification properties are useful, in this and the next section we will sketch how they are achieved in Chia.
Recall that delayed gratification means a selfish farmer cannot add more blocks into the chain than he could by honestly following the protocol. To achieves this in Chia we ensure that

::: tcolorbox
(a) a challenge is revealed as late as possible.

(b) once it's revealed, it's almost certainly too late for a selfish farmer to influence it in any way.

(c) whether a plot can produce a block for a challenge only depends on the plot and the challenge (and not say, on what other plots exist).
:::

These properties imply delayed gratification as a selfish farmer cannot do anything to influence challenges in a controlled way due to (a) & (b), and cannot do anything to increase its number of winning blocks for a given challenge due to (c).

We will sketch how properties (a)-(c) are achieved in Chia next. To follow the arguments the reader might want to recap the high level outline in §[2.7](#S:high){reference-type="ref" reference="S:high"} and illustration in Figure [1](#fig:C4){reference-type="ref" reference="fig:C4"}

(a) The only reason for the infused challenge chain ${\sf i}{\cal CC}$ is to make sure that the challenge becomes known as late as possible, in particular when considering an adversary with a faster VDF than the fastest honest time lord.

(b) We infuse the *first* block of each slot into the challenge chain ${\cal CC}$, this way making sure that this block is buried deep in the chain (by $31$ blocks on average) once revealed, and thus almost impossible to revert.

(c) We use a variation on the correlated randomness technique from [@Bagaria2019], where we let the challenge depend on every $k$th challenge
	on average, rather than exactly. This way only the challenge determines whether a plot can produce a winning block, irrespective of what other plots exist.

## No-Slowdown of Chia and other Constructions {#s:nschia}

Recall that the no slowdown property requires that no adversary can slow down the block arrival time by participating.

### No-Slowdown in Bitcoin

In Bitcoin no slowdown holds as whenever an honest miner finds a block, all the honest miners will switch to a heavier chain. An adversary can still kick out this block and replace it with one of his own (and that's what selfish mining is exploiting), but not slow down the growth.
Of course here we assume a reliable network, a network level attacker who can increase the latency or even split the network can of course delay chain growth.

### A Non-Example, the G-Greedy-Rule

One might assume that the no-slowdown property would be achieved by any "natural" longest-chain blockchain even if based on efficient proof systems.
Unfortunately this intuition is wrong. A design for which no-slowdown fails to hold is the proof of stake based chain of Fan and Zhou [@Fan2017].
Their chain mimics Bitcoin's Nakamoto consensus using proofs of stake, but to harden the design against (what in this writeup is called) double dipping attacks [@Fan2017] suggest the miners not only extend the longest chain, but instead follow the "$g$-greedy rule": a miner should try to extend all forks they see which are at most $g$ blocks shorter than the longest chain they've seen so far. The rationale behind this rule is that by letting the honest miners do double-dipping to some extent, the advantage an adversary can get by double dipping shrinks.[^5]
As shown in [@Bagaria2019], this design has some serious issues as an adversary with relatively small resources can with high probability prevent the chain reaching consensus by strategically releasing blocks and this way keep two forks alive for a long time. An illustration of their attack is in Figure [\[Fig:FF\]](#Fig:FF){reference-type="ref" reference="Fig:FF"}.
Interestingly (citing [@Bagaria2019])
*"..the efficacy (of the attack) is primarily achieved by slowing down the growth rate of the honest strategy."*

<figure id="Fig:Fan">

<figcaption><span id="Fig:FF" label="Fig:FF"></span>Illustration of the balancing attack against <span class="citation" data-cites="Fan2017"></span> taken from <span class="citation" data-cites="Bagaria2019"></span><span id="Fig:Fan" label="Fig:Fan"></span></figcaption>
</figure>

### Examples of No-Slowdown.

The lesson from the example above is that the no-slowdown property is not easy to achieve in longest-chain protocols using efficient proof systems.
Moreover the absence of this property can lead to various security issues, not just selfish mining opportunities, but even
prevent consensus almost indefinitely as in the example above. Similar attacks were also proposed for BFT type protocol, most notably Ethereum [@SchwarzSchilling2021].

#### Naïve Emulation of Bitcoin.

There are longest-chain blockchains from efficient proof systems which do have the no-slowdown property. The simplest is to just emulate Bitcoin by replacing PoW with PoSpace or PoStake. While satisfying no-slowdown, this basic construction has all the security issues discussed in §[3](#S:LCeff){reference-type="ref" reference="S:LCeff"}.
Fixing bootstrapping and grinding as outlined in §[3](#S:LCeff){reference-type="ref" reference="S:LCeff"} will preserve the no-slowdown property. The challenge is to find a good countermeasure to double-dipping without losing the no-slowdown property and introducing new attack vectors.

#### $D$-Distance Greedy.

Bagaria et al. [@Bagaria2019] not only prove that $g$-greedy does not have the no-slowdown property, but also suggest a different rule of a similar flavour they call
"$D$-distance greedy", for which the no-slowdown property does hold [@Bagaria2019 Lemma 12]. This rule reduces the double-dipping advantage factor towards $1$ as $D$ increases, but already for moderately large $D$ it becomes computationally infeasible for the miners to even determine which chain to follow.

#### Old Chia.

The first Chia greenpaper [@greenpaper] has a very simple rule where honest farmers try to extend the first $k>1$ ($k=3$ was suggested) chain of any given length they become aware of. For this simple construction the advantage factor of double-dipping goes to $1$ as $k$ increases while it does achieve no-slowdown [@greenpaper Lemma 4].

#### Chia.

While the deployed Chia blockchain has many advantages over the old [@greenpaper] proposal,
the no-slowdown property is a much tricker issue in the new design.
In particular, we do not yet have an analogue of [@greenpaper Lemma 4] which basically states that even an unbounded adversary (unlimited space, unlimited number of arbitrary fast VDFs) cannot slow down chain growth.

When analyzing the no-slowdown property, it is useful to distinguish the specification of the chain (i.e., what constitutes a valid chain) and its chain selection rule (aka. fork choice rule), which tells the farmers and time lords on which chains to work should competing forks exist.

For example the difference in the $g$-greedy and the $D$-distance greedy protocols discussed above (only the latter having the no-slowdown property) is only in the chain selection rule, the specification what constitutes an valid chain is the same.

Unlike the chain specification, which can only be changed by a hard fork once the chain is deployed, the chain selection rule can easily be adapted by the farmers and/or time lords even after the launch. Finding a chain-selection rule for the Chia chain which provably achieves no-slowdown is an interesting open problem.

Under the additional assumption that an adversary does not control VDFs which are *faster* than the fastest honest time lord,
a very simple chain selection rule achieving no-slowdown exists: always follow the chain with accumulated most VDF steps. Of course this rule would be terrible in practice as security completely breaks if the adversary has an even slightly faster VDF than the fastest honest time lord. For example, such an adversary
could create an "empty" chain by refusing to infuse any blocks.

A more sensible rule is to simply follow the *heaviest* fork like in Bitcoin.
Unfortunately, unlike in Bitcoin, in Chia the heaviest fork is not necessarily the fork which will be heaviest in the future assuming all honest parties adapt it:
a fork $A$ might have one more block infused than some fork $B$, but if $B$ is way ahead in the VDF computation extending $B$ might give a better chain (in expectation) in the future. Thus, when using this rule, by releasing $B$ an adversary might slow down the chain. The currently deployed chain selection rule for farmers and time lords is basically to follow the heaviest fork, but with some heuristics to avoid clear cases where switching to a heavier chain is slowing down growth.