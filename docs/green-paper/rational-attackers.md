---
title: Rational Attackers - Chia Green Paper
sidebar_label: 3 - Rational Attackers
slug: /rational-attackers
---

# 3 - Rational Attackers

In §2 we discussed how costless simulation opens attack vectors for double spending in longest-chain blockchains and how these are addressed in $\textrm{{\sf Chia}}$. To show security we assumed that a sufficient fraction of the resource is controlled by _honest_ parties who follow the protocol rules. In reality it's unrealistic to assume that parties will behave altruistically, instead we need to argue that it's _rational_ for parties to follow the protocol rules. Unfortunately costless simulation also makes this task much more challenging than in a PoW based system.

In analogy to _selfish mining_ in Bitcoin, we refer to strategies by which a party gets more rewards than they would by following the protocol rules as _selfish farming_. To argue that rational parties will behave honestly it's necessary to bound the efficacy of selfish mining/farming strategies.

In §3.1 below we first discuss selfish mining and why we don't observe it in Bitcoin even though it's possible in principle. As directly analyzing the security of a longest-chain protocol against selfish mining/farming is very challenging we take a modular approach. In §3.2 we first identify two properties – _no slowdown_ and _delayed gratification_ illustrated in Figure 5 – which are satisfied by Bitcoin, and then show in §3.3 that they imply robustness against selfish mining (through the notion of chain quality) of the level as achieved by Bitcoin. In §3.4 and §3.5 we then sketch how those notions are achieved in $\textrm{{\sf Chia}}$.

## 3.1 Selfish Mining in Bitcoin

While Bitcoin prevents double spending assuming a majority of the hashing power is controlled by miners who altruistically follow the protocol, it allows for *selfish mining* [<a href="/green-paper-references/#ES18">ES18</a>] by which a miner with a $\alpha<0.5$ fraction of the hashing power can create more than an $\alpha$ fraction of the blocks and thus gets an unfair share of the block rewards. In some settings this fraction can be as large as $\alpha/(1-\alpha)$ (e.g. a $0.33$ fraction for $\alpha=0.25$).[^1] Selfish mining has not been observed in Bitcoin, and there are various reasons why this is the case

1.  selfish mining requires either a fairly large fraction of the hashing power or very good control of the network (cf. Footnote [^1]) to be profitable

2.  the attack would be easily detected and

3.  delayed gratification as defined below.

## 3.2 Delayed Gratification and No Slowdown

The Bitcoin blockchain is split in epochs, each with a targeted duration of two weeks, and only at the end of an epoch the difficulty is reset to accommodate for the variation of the hashing power. Assuming the network is reliable, within an epoch, a selfish miner cannot create more blocks than they would get by honest mining. This follows from a crucial property of proofs of work: there's no way to find more proofs of a given difficulty (and thus blocks) in a given time window than simply following the protocol and always working on the known longest chain. The only thing selfish mining does in Bitcoin is to make honest parties waste their hashing power, so after the next difficulty reset (which only happens every 2 weeks) the difficulty is lower than it should be, and only at this point the selfish miner makes some extra profit. Another property of PoW based chains like Bitcoin is that an adversary cannot slow down chain growth. We capture these two desirable properties separately below.

**Delayed Gratification:** A chain where an adversary cannot increase the number of blocks they find in expectation within an epoch of same difficulty by deviating from the honest strategy is said to have the _delayed gratification_ property. In $\textrm{{\sf Chia}}$, by "not deviating" we mean that the adversary simply runs an honest farmer using its available space, and additionally, should the adversary control VDFs that are faster than the fastest honest time lord, they are also assumed to run a time lord. Intuitively, delayed gratification is a good deterrent to selfish mining by itself as it limits selfish mining to adversaries who follow a "long term" agenda.

**No Slowdown:** A chain where an adversary (no matter what fraction of the resource they control) cannot slow down the expected block arrival time by interacting with the chain is said to have the _no slowdown_ property.

## 3.3 Chain Quality

A longest-chain blockchain is said to have _chain quality_ $\rho$ if the fraction of blocks mined by honest miners is at least $\rho$ (with high probability and considering a sufficiently large number of blocks). Chain quality was introduced in [<a href="/green-paper-references/#GKL15">GKL15</a>] as a metric to quantify how susceptible a chain is to selfish mining. Ideally, assuming an adversarial miner who controls an $\alpha$ fraction of the resource, the chain quality should be $\rho=1-\alpha$ as this means that the adversary cannot increase its fraction of blocks by deviating.

By the Proposition below delayed gratification and the no slowdown property imply a bound on _chain quality_ which matches the bound proven for Bitcoin (when ignoring network delays).

---

**Proposition 1** (Delayed Gratification and No Slowdown implies Chain Quality). _Consider a longest-chain protocol which has the delayed gratification and no slowdown property against an adversary who controls an $\alpha$ fraction of the global resource, then the chain quality is $1-\frac{\alpha}{1-\alpha}$ (compared to the ideal $1-\alpha$)._

_Proof._ Consider an adversarial miner ${\cal A}$ with an $\alpha$ fraction of the resource and let $\ell$ denote the (expected) number of blocks to be found if everyone would mine honestly. By the no slowdown property, no matter what ${\cal A}$ does the number of blocks found is at least $\ell'\ge (1-\alpha)\cdot\ell$. By delayed gratification, at most $\alpha\cdot\ell$ of those blocks were created by ${\cal A}$, we get a chain quality of

$$
\begin{aligned}
\textit{chain quality}&=\frac{\text{honest blocks}}{\text{total blocks}}\\
&=\frac{\ell' - \alpha \cdot \ell}{\ell'}\\
&=1-\frac{\alpha\cdot\ell}{\ell'}\\
&\ge 1-\frac{\alpha\cdot\ell}{(1-\alpha)\cdot \ell}\\
&=1-\frac{\alpha}{1-\alpha}
\hspace{10em}\square
\end{aligned}
$$

---

## 3.4 Delayed Gratification in Chia

Having motivated why the no slowdown and delayed gratification properties are useful, in this and the next section we will sketch how they are achieved in Chia. Recall that delayed gratification means a selfish farmer cannot add more blocks into the chain than he could by honestly following the protocol. To achieve this in $\textrm{{\sf Chia}}$ we ensure that

:::info Objective 1: Unpredictable and Immutable Challenges
(a) a challenge is revealed as late as possible.

(b)) once it's revealed, it's almost certainly too late for a selfish farmer to influence it in any way.

(c)) whether a plot can produce a block for a challenge only depends on the plot and the challenge (and not say, on what other plots exist).
:::

These properties imply delayed gratification as a selfish farmer cannot do anything to influence challenges in a controlled way due to (a) & (b), and cannot do anything to increase its number of winning blocks for a given challenge due to (c).

We will sketch how properties (a)-(c) are achieved in $\textsf{Chia}$ next. To follow the arguments the reader might want to recap the high level outline in §1.7 and illustration in Figure 1

**(a)** The only reason for the infused challenge chain ${\sf i}{\cal CC}$ is to make sure that the challenge becomes known as late as possible, in particular when considering an adversary with a faster VDF than the fastest honest time lord.

**(b)** We infuse the _first_ block of each slot into the challenge chain ${\cal CC}$, this way making sure that this block is buried deep in the chain (by $31$ blocks on average) once revealed, and thus almost impossible to revert.

**(c)** We use a variation on the correlated randomness technique from [<a href="/green-paper-references/#BDK19">BDK+19</a>], where we let the challenge depend on every $k$th challenge on average, rather than exactly. This way only the challenge determines whether a plot can produce a winning block, irrespective of what other plots exist.

## 3.5 No-Slowdown of Chia and other Constructions {#s:nschia}

Recall that the no slowdown property requires that no adversary can slow down the block arrival time by participating.

### 3.5.1 No-Slowdown in Bitcoin

In Bitcoin no slowdown holds as whenever an honest miner finds a block, all the honest miners will switch to a heavier chain. An adversary can still kick out this block and replace it with one of his own (and that's what selfish mining is exploiting), but not slow down the growth. Of course here we assume a reliable network, a network level attacker who can increase the latency or even split the network can of course delay chain growth.

### 3.5.2 A Non-Example, the G-Greedy-Rule

One might assume that the no-slowdown property would be achieved by any "natural" longest-chain blockchain even if based on efficient proof systems. Unfortunately this intuition is wrong. A design for which no-slowdown fails to hold is the proof of stake based chain of Fan and Zhou [<a href="/green-paper-references/#FZ17">FZ17</a>]. Their chain mimics Bitcoin's Nakamoto consensus using proofs of stake, but to harden the design against (what in this writeup is called) double dipping attacks [<a href="/green-paper-references/#FZ17">FZ17</a>] suggest the miners not only extend the longest chain, but instead follow the "$g$-greedy rule": a miner should try to extend all forks they see which are at most $g$ blocks shorter than the longest chain they've seen so far. The rationale behind this rule is that by letting the honest miners do double-dipping to some extent, the advantage an adversary can get by double dipping shrinks.[^2] As shown in [<a href="/green-paper-references/#BDK19">BDK+19</a>], this design has some serious issues as an adversary with relatively small resources can with high probability prevent the chain reaching consensus by strategically releasing blocks and this way keep two forks alive for a long time. An illustration of their attack is in Figure 5. Interestingly (citing [<a href="/green-paper-references/#BDK19">BDK+19</a>]) _"..the efficacy (of the attack) is primarily achieved by slowing down the growth rate of the honest strategy."_

<figure>
	<img src="/img/green-paper/balanceattack.png" alt="alt text" />
	<figcaption>Figure 5: Illustration of the balancing attack against [<a href="/green-paper-references/#FZ17">FZ17</a>] taken from [<a href="/green-paper-references/#BDK19">BDK+19</a>]</figcaption>
</figure>

### 3.5.3 Examples of No-Slowdown.

The lesson from the example above is that the no-slowdown property is not easy to achieve in longest-chain protocols using efficient proof systems. Moreover the absence of this property can lead to various security issues, not just selfish mining opportunities, but even prevent consensus almost indefinitely as in the example above. Similar attacks were also proposed for BFT type protocol, most notably Ethereum [<a href="/green-paper-references/#SNM21">SNM+21</a>].

#### Naïve Emulation of Bitcoin

There are longest-chain blockchains from efficient proof systems which do have the no-slowdown property. The simplest is to just emulate Bitcoin by replacing PoW with PoSpace or PoStake. While satisfying no-slowdown, this basic construction has all the security issues discussed in §2. Fixing bootstrapping and grinding as outlined in §2 will preserve the no-slowdown property. The challenge is to find a good countermeasure to double-dipping without losing the no-slowdown property and introducing new attack vectors.

#### $D$-Distance Greedy

Bagaria et al. [<a href="/green-paper-references/#BDK19">BDK+19</a>] not only prove that $g$-greedy does not have the no-slowdown property, but also suggest a different rule of a similar flavour they call "$D$-distance greedy", for which the no-slowdown property does hold [<a href="/green-paper-references/#BDK19">BDK+19</a> Lemma 12]. This rule reduces the double-dipping advantage factor towards $1$ as $D$ increases, but already for moderately large $D$ it becomes computationally infeasible for the miners to even determine which chain to follow.

#### Old $\textsf{Chia}$

The first Chia greenpaper [<a href="/green-paper-references/#CP19">CP19</a>] has a very simple rule where honest farmers try to extend the first $k>1$ ($k=3$ was suggested) chain of any given length they become aware of. For this simple construction the advantage factor of double-dipping goes to $1$ as $k$ increases while it does achieve no-slowdown [<a href="/green-paper-references/#CP19">CP19</a> Lemma 4].

#### $\textsf{Chia}$

While the deployed $\textsf{Chia}$ blockchain has many advantages over the old [<a href="/green-paper-references/#CP19">CP19</a>] proposal, the no-slowdown property is a much tricker issue in the new design. In particular, we do not yet have an analogue of [<a href="/green-paper-references/#CP19">CP19</a> Lemma 4] which basically states that even an unbounded adversary (unlimited space, unlimited number of arbitrary fast VDFs) cannot slow down chain growth.

When analyzing the no-slowdown property, it is useful to distinguish the specification of the chain (i.e., what constitutes a valid chain) and its chain selection rule (aka. fork choice rule), which tells the farmers and time lords on which chains to work should competing forks exist.

For example the difference in the $g$-greedy and the $D$-distance greedy protocols discussed above (only the latter having the no-slowdown property) is only in the chain selection rule, the specification what constitutes an valid chain is the same.

Unlike the chain specification, which can only be changed by a hard fork once the chain is deployed, the chain selection rule can easily be adapted by the farmers and/or time lords even after the launch. Finding a chain-selection rule for the $\textsf{Chia}$ chain which provably achieves no-slowdown is an interesting open problem.

Under the additional assumption that an adversary does not control VDFs which are _faster_ than the fastest honest time lord, a very simple chain selection rule achieving no-slowdown exists: always follow the chain with accumulated most VDF steps. Of course this rule would be terrible in practice as security completely breaks if the adversary has an even slightly faster VDF than the fastest honest time lord. For example, such an adversary could create an "empty" chain by refusing to infuse any blocks.

A more sensible rule is to simply follow the _heaviest_ fork like in Bitcoin. Unfortunately, unlike in Bitcoin, in $\textsf{Chia}$ the heaviest fork is not necessarily the fork which will be heaviest in the future assuming all honest parties adapt it: a fork $A$ might have one more block infused than some fork $B$, but if $B$ is way ahead in the VDF computation extending $B$ might give a better chain (in expectation) in the future. Thus, when using this rule, by releasing $B$ an adversary might slow down the chain. The currently deployed chain selection rule for farmers and time lords is basically to follow the heaviest fork, but with some heuristics to avoid clear cases where switching to a heavier chain is slowing down growth.

[^1]: To achieve such a large fraction we must assume that (1) honest miners follow the (original Bitcoin) rule and in case they learn of two longest chains they always try to extend the one they saw first and (2) that once the selfish miner learns about a block mined by the honest miners, they can release a withheld block such that their block reaches most of the honest miners faster than this honest block. If either of these conditions is not met, selfish mining is much less profitable, and only becomes profitable at all for selfish miners who control a fairly large fraction of the resource [<a href="/green-paper-references/#SSZ15">SSZ15</a>].
[^2]: A similar proposal, where the honest parties try to extend the first $k$ blocks they see at every depth was proposed in an early proposal for $\textsf{Chia}$ (with $k=3$) [<a href="/green-paper-references/#CP19">CP19</a>]. This variant achieves the no-slowdown property.
