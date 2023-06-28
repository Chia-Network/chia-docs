---
title: Introduction - Chia Green Paper
sidebar_label: 1 - Introduction
slug: /green-paper-introduction
---

# 1 - Introduction

The **$\textsf{Chia}$ network** ([chia.net](https://chia.net/)) is a permissionless blockchain that was launched on March 19, 2021. $\textsf{Chia}$ is a "longest-chain" blockchain like Bitcoin, but uses disk-space instead of computation as the main resource to achieve consensus. This holds the promise of being much more ecologically and economically sustainable and more decentralized than a proofs of work (PoW) based blockchain like Bitcoin could be. Figure 1 illustrates one slot of the $\textsf{Chia}$ blockchain. The main aim of this document is to explain the rationale for this rather complicated design.

<figure>
	<img src="/img/green-paper/4chainsX.png" alt="Illustration of one slot of the Chia blockchain" />
	<figcaption>Figure 1: Illustration of one slot (taking around 10 minutes) of the Chia blockchain. For illustration the slot has just 16 (instead 64) signage points and only 4 blocks (the actual chain has a target of 32).</figcaption>
</figure>

As mentioned, $\textsf{Chia}$ is basically what's called a _longest-chain_ protocol in the literature [<a href="/green-paper-references/#BNPW19">BNPW19</a>; <a href="/green-paper-references/#BDK19">BDK+19</a>]. This notion captures blockchain protocols that borrow the main ideas from the Bitcoin blockchain: the parties (called miners in Bitcoin and farmers in Chia) that dedicate resources (hashing power in Bitcoin, disk space in Chia) towards securing the blockchain just need to

1.  listen to the (P2P) network to learn about progress of the chain and to collect transactions.

2.  locally use the resource (via proofs of work in Bitcoin or proofs of space in Chia) trying to create a block which extends the current chain.

3.  if a winning block is found, gossip the new block to the network.

No other coordination or communication amongst the parties is required. In particular, as the miners in Bitcoin, the farmers in $\textsf{Chia}$ only need to speak up once they find a block and want it to be included in the chain.

Constructing a secure permissionless blockchain using proofs of space is much more challenging than using proofs of work. In particular, a secure (under dynamic availability) longest-chain protocol based on proofs of space alone does not exist [<a href="/green-paper-references/#BP22">BP22</a>], so Chia's _proofs of space and time_ (PoST) consensus protocol, apart from farmers providing disk space, additionally relies on so called timelords who evaluate verifiable delay functions (VDFs). Figure 2 gives an overview of the formal security proofs and more informal arguments outlined in this document.

<figure>
	<img src="/img/green-paper/chia-flow.png" alt="Diagram of Chia security and arguments" />
	<figcaption>Figure 2: An illustration of the main security proofs and arguments for the Chia consensus layer.</figcaption>
</figure>

## 1.1 Security

The Bitcoin blockchain is secure [<a href="/green-paper-references/#GKL15">GKL15</a>] as long as the hashing power $hash_h$ (measured in hashes per second) contributed by honest parties is larger than the hashing power $hash_a$ available to an adversary, i.e.,

$$
hash_h > hash_a
$$

<div class="eqnumber">eq.(1)</div>

Similarly, the security of $\textsf{Chia}$ depends on the amount of space $space_h$ and $space_a$ controlled by the honest parties and the adversary, respectively. Additionally, the speed $vdf_h$ and $vdf_a$ (measured in steps per second) of the VDFs run by the fastest honest timelord and the adversary are relevant. With these definitions,

$$
\textrm{{\sf Chia}\ is provably secure if : }
space_h\cdot vdf_h > space_a \cdot vdf_a \cdot 1.47
$$

<div class="eqnumber">eq.(2)</div>

Let us stress that $\textsf{Chia}$ only requires a single timelord (which runs 3 VDFs) to be active at any time, in particular, $vdf_h$ in eq.(2) refers to the speed of the fastest VDFs controlled by an active and honest timelord, it doesn't matter if one or a billion timelords are active. In practice we'd still expect a small number – not just one – timelords to be available to have a backup should the currently fastest timelord become unavailable.

On the other hand, we make no assumptions about the number of VDFs controlled by the adversary. Security as in eq.(2) holds even when assuming the adversary controls an unbounded number of VDFs of speed $vdf_a$.

This assumption comes at a prize: there's a $1.47$ factor by which the adversarial resources are multiplied in eq.(2). This factor is there due to an attack we call "double dipping". This and other attacks will be discussed in §2. For now let us just mention that there's nothing special about the constant $1.47$, it can be lowered to $1+\epsilon$ for any $\epsilon>0$ by increasing the number of blocks that depend on the same challenge (in $\textsf{Chia}$ this is set to at least 16).

The bound in eq.(1) is not tight in the sense that we don't have an attack that works if we replace "$>$" with "$<$". We have an attack assuming giving the adversary a slightly lower boosting factor of $1.34$

$$
\textrm{double spending in {\sf Chia}\ possible if : }space_h\cdot vdf_h < space_a \cdot vdf_a \cdot  1.34
$$

<div class="eqnumber">eq.(3)</div>

More concretely, if $vdf_h=vdf_a$, i.e., if the adversary has (an unbounded number of) VDFs of the same speed as the fastest honest timelord, then double spending is possible controlling $\frac{100\%}{1+1.34}\approx 43\%$ of the total space.

A contribution of this writeup is a modular approach towards achieving secure longest-chain blockchains from efficient proof systems. In §2 we outline three attack vectors (illustrated in Figure 3) that emerge if we naïvely replace proof of work with an efficient proof systems.

## 1.2 Network Delays

In Bitcoin each block contains the hash of the previous block. If two blocks are found at roughly the same time, so there was no time for the block that was found first to propagate to the miner that found the second, they will refer to the same block, and only one can be added to the chain. The other will be "orphaned" and does not contribute towards securing the blockchain. The fraction of orphaned blocks depends on the network delay (the smaller the delay the fewer orphans) and the block-arrival time (fewer blocks per minute decrease the probability of orphans). Taking this into account, the security statement for Bitcoin from eq.(1) should be augmented to:

$$
hash_h \cdot \left(1-\frac{network\ delay}{block\ arrival\ time}\right)> hash_a
$$

<div class="eqnumber">eq.(4)</div>

Even with its very slow 10 minutes block arrival time, Bitcoin's orphan rate was measured to be around $1.6\%$ [<a href="/green-paper-references/#DW13">DW13</a>]. As the $\textsf{Chia}$ chain is not a typical hash chain, but an ongoing VDF computation where blocks are infused, there's an elegant way to avoid orphans: the "infusion point" of a block is around $30$ seconds (more precisely, between $28.125$ and $37.5$ seconds) worth of VDF computations after the "signage point" it must refer to, and as long as the network delay is small enough so the block creating/gossiping process takes less than 30 seconds no orphans will occur. In particular, the bound from eq.(2) holds under this very weak network assumption independent of the block arrival time.

The target block arrival time in $\textsf{Chia}$ is set to $18.75$ seconds (32 blocks per 10 Minutes slot), and while each of those blocks contributes to security, only a subset of these blocks actually carry transactions (roughly $36\%$, that's a block every $51.2$ seconds) in order to ensure that transaction blocks sequentially refer to each other. This prevents issues with inconsistent transactions, as each block producer knows the entire history.

## 1.3 Game Theoretic Aspects

Apart from proving security assuming the honest parties control a sufficient majority of the resources, to argue that a longest-chain protocol will be secure in the real world we need to justify why rational parties would behave honestly in the first place. In particular, it should not be possible to get more rewards by deviating from the honest mining/farming behavior. While Bitcoin is not fair in this sense due to selfish mining attacks [<a href="/green-paper-references/#ES18">ES18</a>], these attacks are not really practical and have not been observed in the wild for reasons we'll sketch below and discuss in more detail in §3.

#### Fairness in $\textsf{Chia}$

Achieving fairness that is comparable to what Bitcoin achieves is a main design goal of $\textsf{Chia}$. While arguing about fairness directly is rather subtle, we identify two clean properties called "no slowdown" and "delayed gratification" a longest-chain can satisfy. Delayed gratification by itself already is a deterrent against selfish farming, and we show (Proposition 1 in §3) that these two properties jointly imply a chain-quality (i.e., fraction of honest blocks in the longest chain) no worse that what Bitcoin achieves.

#### No-Slowdown

The no-slowdown property was identified as a desirable property for longest-chain blockchains in [<a href="/green-paper-references/#CP19">CP19</a>]. It holds if (even an unbounded) adversary cannot slow down the growth of the chain by participating. We discuss the no-slowdown in $\textsf{Chia}$ and various other chains in §3.5.

#### Delayed Gratification

The $\textsf{Chia}$ design ensures that proof of space challenges are only revealed once they are needed, and once they're revealed they cannot be influenced any more. This then implies that it's impossible for a selfish farmer to create more blocks by deviating from honest farming, and thus – like in Bitcoin – the only thing a selfish farmer can do is prevent other farmers from adding their fair share of blocks in the current epoch (potentially even losing out on blocks themself). The reason a selfish farmer would do this is in order to enforce a lower difficulty, and thus more rewards for themselves, in the future [<a href="/green-paper-references/#ES18">ES18</a>]. We denote chains with this property as having "delayed gratification".[^1] While delayed gratification doesn't prevent selfish mining, it severely limits the type of selfish mining possible, and we don't expect to observe selfish farming in $\textsf{Chia}$ for the same reasons we don't observe selfish mining in Bitcoin. As mentioned above, in combination with the no-slowdown property it even implies a chain-quality as in Bitcoin.

## 1.4 Farmers and Timelords

Constructing a secure blockchain based on proofs of space is significantly more challenging than with proof of work. So the $\textsf{Chia}$ design, as illustrated in Figure 1 is (arguably necessarily) more sophisticated than Bitcoin or other PoW based blockchains, which are basically just hash chains. Apart from proofs of space and standard cryptographic building blocks like hash functions and signature schemes, the security of $\textsf{Chia}$ crucially relies on verifiable delay functions (VDFs) [<a href="/green-paper-references/#BBBF18">BBBF18</a>; <a href="/green-paper-references/#Pie19b">Pie19b</a>; <a href="/green-paper-references/#Wes20">Wes20</a>]. Informally, VDFs are functions whose computation is inherently sequential and verifiable and thus serve as a "proof of time".

We will now shortly sketch how the $\textsf{Chia}$ blockchain is maintained by farmers and timelords.

#### Farmers

Farmers are the analog of miners in Bitcoin, but instead of hashing power, farmers contribute disk-space towards securing the $\textsf{Chia}$ blockchain. As in Bitcoin, they are incentivized by block-rewards and transaction fees. As in Bitcoin, the block-rewards (i.e., some freshly minted coins that go to the block creator) decrease over time, but unlike in Bitcoin they will never go to zero for reasons outlined in [<a href="/green-paper-references/#CKWN16">CKWN16</a>].

To participate in farming a farmer must first initalize its disk-space, this process is called plotting and the files created and stored during this process are called plots. The smallest allowed plot in $\textsf{Chia}$ is slightly larger than 100GB, though for plotting one temporarily needs more than this. Once the plot(s) are in place, a farmer just listens to the network for proof of space challenges. There's a new challenge roughly every $9.375$ seconds and they are computed by a timelord as discussed below. For efficiency reasons there's a "plot filter" which for each plot dismisses all but (in expectation) one in 512 challenges immediately, so a plot is only accessed once every 80 minutes. The reason to not increase this time even further are so called replotting attacks which we'll discuss in §1.8.3.

In $\textsf{Chia}$ only roughly $36\%$ of the blocks will carry transactions, but as a farmer doesn't know whether their block will be a transaction block when creating the block, farmers must always include transactions to the blocks they create.

#### Timelords

A timelord runs three VDFs, once every $9.375$ seconds they gossip a "signage point" that serves as a PoSpace challenge for the farmers. They also listen to the network for blocks created by farmers. If a valid block is received in time it gets "infused" into the chain (the infusion is always somewhere from $28.125$ to $37.5$ seconds after the signage point).

The above only holds for the the timelord which runs the fastest VDFs. Timelords with slower VDFs can basically just recompute values that were already gossiped, so there's seemingly no point for them to participate. We still want a small number of timelords to participate (or at least be ready to take over) should the fastest timelord fail or misbehave.

Unlike farmers, timelords do not receive any rewards in form of block-rewards or transaction fees. One reason is technical, unlike for farmers whose PoSpace contained in the blocks are linked to a signature public-key to which a reward can be given, the computation of the timelords is (and to prevent grinding attacks must be) canonical, they cannot attach a public-key to the values they computed. A second reason is the fact that it's not clear at all how such a reward would be distributed. If the fastest timelord gets the entire reward only they would be incentivized, but not the slower ones we'd like to have as back-ups. If also the slower ones get something then we'd get a PoW type lottery which we want to avoid in the first place. $\textsf{Chia}$ thus relies on a small number of timelords to run fast VDFs without being incentivised by on-chain rewards.

## 1.5 Difficulty and Chain Selection Rule

#### Difficulty

In Bitcoin a difficulty parameter $D$ controls how many hashes are required in expectation to find a block. This parameter is re-calibrated every 2016 blocks (called an epoch and taking roughly 2 weeks) so blocks arrive roughly every 10 Minutes.

$\textsf{Chia}$ has two parameters, a difficulty parameter $D$ and a time parameter $T$, these are re-calibrated once every $4608$ blocks (this epoch takes around 1 day). The time parameter $T$ is reset to fit the target time of 10 minutes per slot, while the difficulty is reset to target an average of 32 blocks per slot.

For example if in an epoch the amount of space is $10\%$ higher than anticipated the difficulty for the next epoch would get up $D_{new}:=D_{old}\cdot 1.1$ while the time parameter remains unchanged $T_{new}:=T_{old}$. If the VDF speed in the epoch is $10\%$ higher than anticipated (i.e., the epoch only takes $24/1.1$ instead of $24$ hours) the time parameter goes up $T_{new}:=T_{old}\cdot 1.1$, and even though the space didn't change, the difficulty needs also to go up $D_{new}:=D_{old}\cdot 1.1$ account for the fact that now an epoch has more VDF steps.

#### Chain Selection Rule

Bitcoin has a very simple chain selection rule (aka. fork choice rule) which specifies which fork a miner should work on: a miner should always try to extend the "heaviest" chain they are aware of. The weight of a chain is the sum of the blocks, each multiplied by the difficulty parameter used while it was mined. Unless we consider forks which pass an epoch boundary, the heaviest chain is also the chain with the larger number of blocks, hence the name "longest chain" protocol.

We can define the weight of a chain in $\textsf{Chia}$ analogously to Bitcoin, and currently the default $\textsf{Chia}$ farmer code follows basically the same "follow the heaviest chain" rule as Bitcoin miners. But let us stress that it's not clear whether for $\textsf{Chia}$ this simple rule is the best choice. For example, one could consider a rule for farmers where in case of a fork where both chains have the same weight they would work on both chains (note that in a PoW based chain this is not possible). While such a rule can slow down consensus, the observed fork could be due to an attack (double spending or selfish mining) trying to "split" the contribution of the honest space in two different chains, letting the farmers work on both forks would thwart this.

In $\textsf{Chia}$ we also must specify a chain selection rule for the timelords. A timelord who does not control the fastest VDF will constantly fall behind and thus intuitively should just constantly adapt the chain with the most VDF steps in them. But if all timelords naïvely do this a malicious timelord controlling the fastest VDF could simply skip infusing any blocks they want, allowing for all kinds of attacks. Thus the rule for timelords has to be more nuanced, taking into account the chains they observe, and also blocks that were created by farmers but not infused in any of the chains.

Determining the best rules for $\textsf{Chia}$ farmers and timelords is ongoing research. Fortunately, the rules for farmers and timelords are more of a social convention rather than a specification of the chain. As our understanding improves, new rules can be implemented in the code base and there's no need for a (soft) fork.

## 1.6 Cryptographic Building Blocks

The $\textsf{Chia}$ blockchain uses standard cryptographic building blocks, in particular hash functions and signature schemes. More interestingly, it relies on two (non-interactive) proof systems which were especially developed for constructing sustainable blockchains: proofs of space and verifiable delay functions. We shortly discuss the requirements $\textsf{Chia}$ has to these building blocks.

#### Hash Functions.

$\textsf{Chia}$ uses SHA256 for hashing, but any collision resistant hash function would do. For efficiency reasons, we also use the round function of CHACHA8 and BLAKE3 within the proof of space construction where we just need some scrambling but no cryptographic hardness (not even one-wayness).

#### Signatures.

$\textsf{Chia}$ uses deterministic BLS signatures for signing. In principle any signature scheme could be used as long as the signatures are unique, i.e., it's impossible (or at least computationally hard) to create two different valid signatures for the same message. Uniqueness will be crucial to prevent so called grinding attacks.

#### Verifiable Delay Functions.

A VDF is specified by some inherently sequential function, and a proof system for showing the output of the function is correct. The sequential function used in the VDF deployed in $\textsf{Chia}$ is repeated squaring in class groups of unknown order. The group is not fixed, but a fresh group is sampled every time a value is infused. The proof system is Wesolowski's [<a href="/green-paper-references/#Wes20">Wes20</a>] proof of exponentiation which has proof of size only one group element. Only the VDF output, but not the proofs, are committed on-chain. This has the advantage that one can replace the proofs. In the current implementation one first computes a much larger but faster to compute proof of 64 group elements, which later is replaced by a normal (one element) Wesolowski proof. It also means one can easily replace Wesolowski's proof with another proof system should a weakness with this proof system (which relies on new number theoretic assumptions) be discovered. We discuss VDFs in detail in §A.3.

#### Proofs of Space.

The notion of proofs of space was introduced, and a first construction proposed, in [<a href="/green-paper-references/#DFKP15">DFKP15</a>] (a security proof for their construction in the random oracle model was given in [<a href="/green-paper-references/#Pie19a">Pie19a</a>]). This construction, which is combinatorial and based on pebbling lower bounds for particular graphs, has the major drawback that the initialization phase is _interactive_. A consequence of this is that if one wants to use this PoSpace in a blockchain, the farmers must first commit to their plots before they can be used for farming (say by recording this commitment on-chain via a special transaction as suggested in Spacemint [<a href="/green-paper-references/#PKF18">PKF+18</a>]). A new PoSpace with a _non-interactive_ initialization had to be developed for $\textsf{Chia}$ [<a href="/green-paper-references/#AAC17">AAC+17</a>]. This construction basically just specifies some function $f$, and then stores its function table $(x,f(x))$ sorted by the outputs $f(x)$. On challenge some value $y$, the prover looks up the entry $(x,y)$ (which is efficient as the list is sorted) and replies with the proof $x$, which can be easily verified checking that $y\stackrel{\tiny ?}{=}f(x)$. Unfortunately this simple construction miserably fails to be secure: the prover can store much less than the full function table, while still being able to efficiently find proofs. The reason are Hellman's time-memory trade-offs, a technique proposed in 1980 to break symmetric cryptographic schemes [<a href="/green-paper-references/#Hel80">Hel80</a>]. In [<a href="/green-paper-references/#AAC17">AAC+17</a>] it is shown how this simple construction can be "salvaged" to overcome any time-memory trade-offs.[^2] We'll discuss definition of a PoSpace, and the construction used in $\textsf{Chia}$ in particular, in §A.2.

## 1.7 A High Level View of the Protocol

The design and rationale of the $\textsf{Chia}$ blockchain is explained in the following sections, here we'll just give a very high level view of the chain as illustrated in Figure 1. The chain itself consists of four chains, one hash chain and three VDF chains.

#### Hash and VDF chains

While hash chains are a classical cryptographic construction, VDF chains were first used in $\textsf{Chia}$. A VDF chain alternates VDF computations with _infused_ values. It provides the security properties present in hash-chains, that is, the head of a chain commits its entire past (technically, given the head of a hash or VDF chain, it's computationally infeasible to come up with two different chains that end in that value). In addition, VDF chains come with a sequentiality property: the number of sequential steps to compute the VDF chain is the sum of the steps required for all the VDFs in that chain, i.e., the VDFs must be computed sequentially. Hash and VDF chains are discussed in more detail in §4.

The four chains which constitute the $\textsf{Chia}$ blockchain are the (1) foliage chain ${\cal FC}$, which is a normal hash-chain and contains the transactions (2) the reward chain ${\cal RC}$ which records all blocks (3) the challenge chain ${\cal CC}$ used to create PoSpace challenges and (4) the infused challenge chain ${\sf i}{\cal CC}$ for some extra security properties. While ${\cal RC}$ and ${\cal CC}$ are normal VDF chains, ${\sf i}{\cal CC}$ is more of a sequence of forks from ${\cal CC}$.

#### Blocks

A block $\beta=\{\beta_F,\beta_T\}$ is made of two parts, the foliage block $\beta_F$, which contains the payload (transactions and a time-stamp) and the trunk block $\beta_T=\{\sigma,\mu_{{\sf rc\_sp}}\}$ which contains a PoSpace $\sigma$ and a signature $\mu_{{\sf rc\_sp}}$.

#### Building the Chains

- A timelord computes the ${\cal RC},{\cal CC},{\sf i}{\cal CC},{\cal FC}$ chains and broadcasts relevant values to the network. This includes signage points ${\sf rc\_sp}$ and ${\sf cc\_sp}$ which are the values of the ${\cal RC}$ and ${\cal CC}$ chains (together with a proof that these values are on the VDF chains) once every $9.375$ seconds.

- A farmer who receives these _signage points_ ${\sf rc\_sp}$ and ${\sf cc\_sp}$ checks whether these points are of interest (i.e., on the heaviest known chain) and all the VDF proofs verify. Next, for each of their plots, they use ${\sf cc\_sp}$ as a challenge to compute a PoSpace $\sigma$. Then they check whether $\sigma$ satisfies a winning condition that allows to produce a block.

  If a winning PoSpace $\sigma$ is found, the farmer creates a signature $\mu_{\sf rc\_sp}$ of ${\sf rc\_sp}$ (that verifies under the $pk$ associated with $\sigma$) and a foliage block $\beta_F$ and then gossips the block $\beta=\{\beta_F,\beta_T=\{\sigma,\mu_{\sf rc\_sp}\}\}$.

- When a timelord receives this block, they check whether the block satisfies all conditions to be infused into the chain.

  (${\cal RC}$) If yes, the trunk block $\beta_T$ is infused into ${\cal RC}$ once its _infusion point_ is reached, which is somewhere between 3 and 4 signage points (28.125 to 37.5 seconds worth of VDF computations) past the signage point of that block.

  (${\cal CC}$) If this happens to be the first block whose signage points are in the current slot, then $\mu_{\sf rc\_sp}$ (but not $\sigma$) is infused into the challenge chain ${\cal CC}$ at the end of the current slot. This way the challenge chain depends only on one block per slot.

  (${\sf i}{\cal CC}$) For some extra security, the timelord doesn't simply wait till the end of the slot to infuse the signature, but a third VDF is used to fork from ${\cal CC}$ at the infusion point by infusing $\mu_{\sf rc\_sp}$ into ${\cal CC}$, and this fork, called the infused challenge chain ${\sf i}{\cal CC}$, is then infused back to ${\cal CC}$ at the end of the slot.

  (${\cal FC}$) Iff the signage point of this block is later than the infusion point of the last _transaction block_, then this block is also a transaction block. Only in this case its foliage $\beta_F$ is appended to the foliage (hash) chain ${\cal FC}$, and this block becomes a "transaction block".

## 1.8 Space Oddities

When constructing a proof of stake or proof or a space based longest-chain protocol one faces similar challenges due to "nothing at stake" (aka. costless simulation) issues, we'll discuss these in §2. But there also aspects in which Space and Stake differ, and we'll shortly discuss three of them below. The first difference is the fact that space, unlike stake, is an unsized resource, which for example means that we can't have "certificates" [<a href="/green-paper-references/#LR21">LR21</a>]. The second difference is the fact that stake is an internal resource, while space is an external resource, one of the consequences of this is that a space based protocol can recover from malicious majority, while a stake based cannot. The third are replotting attacks against space which have no analogue in the stake setting.

### 1.8.1 Sized vs. Unsized

A key difference between stake and work is the fact that in a stake based chain we know the amount of the resource available for mining, while for an external resource like work or space this is no longer the case. Lewis-Pye and Roughgarden [<a href="/green-paper-references/#Lew21">Lew21</a>; <a href="/green-paper-references/#LR21">LR21</a>] formalize this as the _sized_ vs. _unsized_ setting and prove some fundamental differences between them. The main result in [<a href="/green-paper-references/#LR21">LR21</a>] shows that _certificates_ which "provide incontrovertible proof of block confirmation", only exist in the sized setting, i.e., for PoStake but not PoWork blockchains.

In their framework _space_ and also _space and time_ (i.e., the available space multiplied with the speed of the available VDFs) as used in $\textsf{Chia}$ are an unsized resource, so we can't hope to get certificates.

### 1.8.2 Internal vs. External

Work or space are actual resources and we can unambiguous talk about some party holding some amount of the resource at some given point in time. Stake on the other hand is an _internal_ resource defined relative to some chain on which it is recorded and "holding some stake" usually refers to the stake a party controls on the chain that currently is considered the valid one by honest parties.

The main advantage on using stake to secure a longest-chain protocol is the fact that it's extremely sustainable as no external resource is required to secure the chain. But this comes at a prize, one common argument against stake is that the chain is not really permissionless as participating in mining requires acquiring stake from the parties currently controlling it. Also from a security perspective an internal resource is delicate as keys controlling stake _not_ on the current chain can be used to attack the chain. A simple example would be an attack by which a party acquires keys that were valid at some block $B_i$ in the past, but which are no longer valid at the current block and thus are "cheap" (e.g., the party can lend a large amount of stake for a short time, or offer to buy outdated keys), and then uses these keys to fork at block $B_i$ and bootstrap a chain to the present.

To prevent such attacks some chain require parties to delete old keys, but it's irrational for a party to delete old keys if they can be valuable in the future, say because one can sell them to an attacker (and this is rational if one holds just little stake, so not selling is unlikely to prevent the attack) or because there's a deep reorg and the old keys suddenly become valuable again. Combining stake with VDFs would make such attacks harder, but not prevent them as we'll discuss in §6

### 1.8.3 Replotting

A subtle but important difference between stake and space is the fact that space allows for _replotting_ which has no analogue in the stake setting: Given a challenge $c$, a space farmer controlling a plot $S$ of size $N$ can _efficiently_ compute _one_ proof $\sigma \gets  {\sf PoSpace.prove}(S,c)$. This is analogous to the stake based setting, but unlike in the stake setting, the farmer can _inefficiently_ compute _multiple_ proofs for challenge $c$ by repeatedly creating fresh plots and computing one proof with each of them.

We refer to attacks exploiting this fact as _replotting attacks_. The most basic design choice to harden a chain against replotting attacks is to make sure that challenges arrive at a sufficiently high rate so that substantial replotting in-between two challenges is not feasible. Moreover the plot filter (which dictates what fraction of plots must be accessed with every challenge) cannot be chosen too aggressively as more aggressive filters makes potential replotting attacks easier.

A fundamental fact about PoSpace that crucially relies on replotting is that *no PoSpace based longest-chain protocol secure under dynamic availability exists* [<a href="/green-paper-references/#BP22">BP22</a>], we'll discuss their result in more detail in §6.2.3. $\textsf{Chia}$ overcomes this no-go theorem by using VDFs, we discuss security under dynamic availability and healing from malicious majority in the work, stake and space setting in §6.

[^1]: According to Wikipedia, _delayed gratification_ is the resistance to the temptation of an immediate pleasure in the hope of obtaining a valuable and long-lasting reward in the long-term.
[^2]: The crucial observation that makes this possible is the fact that Hellman's attack assumes that $f(.)$ can be efficiently computed in forward direction, while for a PoSpace we just require that the entire function table of $f(.)$ can be computed in time linear in the size of the table.
