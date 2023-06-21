---
title: Recovering from 51% Attacks and Dynamic Availability  - Chia Green Paper
sidebar_label: 6 - Recovering from 51% Attacks and Dynamic Availability
slug: /recovering-from-51-percent-attacks
---

# 6 - Recovering from 51% Attacks and Dynamic Availability

In this Section we have a look at two closely related security properties of longest-chain blockchains, namely recovery from malicious majority (aka. 51% attacks) and security under dynamic availability. We'll discuss proofs of work, stake and space, for the latter two also looking at how adding VDFs changes the picture.

We discussed in §2 the main security issues of a PoSpace based longest-chain blockchain arise from the fact that PoSpace is an efficient proof system. PoSpace shares those security challenges with PoStake, and all three countermeasures summarized in Figure 3 (namely splitting the chain to prevent grinding, correlated randomness to prevent double-dipping and using VDFs to prevent bootstrapping) can readily be applied in the stake setting, correlated randomness was even originally proposed for stake [<a href="/green-paper-references/#BDK19">BDK+19</a>]. But as we'll discuss below, when it comes to security under dynamic availability or 51% attacks there are fundamental differences between space and stake. In particular, using proofs of space in combination with VDFs one can handle both attacks basically as well as with proofs of work, while proofs of stake cannot, even in combination with VDFs.

  <figure>
	  <img src="/img/green-paper/table-1.png" />
	  <figcaption>Table 1: Summary of the ability to heal from malicious majority and provide security under dynamic availability of longest-chain protocols based various proof systems.</figcaption>
</figure>

## 6.1 Recovery from $51\%$ Attacks

A key difference between a PoW based longest-chain protocol and a longest- chain protocol based on an efficient proof system like PoStake or PoSpace is the fact that only the PoW based chains is guaranteed to recover security once an adversary that controls a sufficiently large fraction of the resource, even if it's just for a short period. This is sometimes called "a $51\%$ attack" referring to the fact that in bitcoin an adversary controlling $>50\%$ of the hashing power can break security in pretty much any way they like (they can double spend, get $100\%$ of the block rewards or censor). We'll stick with this expression even though the fraction of the resource required to control a chain can be lower than $50\%$ (as mentioned in §1.1, in ${\sf Chia}$ controlling $43\%$ of the space is sufficient).

There's also a key difference between PoStake and PoSpace. By using VDFs in addition to PoSpace as in $\textsf{Chia}$ we get a chain that does have this self- healing property. While we can also augment a PoStake based chain with VDFs [<a href="/green-paper-references/#DKT21">DKT21</a>], the resulting chain will not be self-healing.

### 6.1.1 Recovering from PoW Majority in Bitcoin {#S:RBB}

While Bitcoin provides no security if more than half of the hashrate is controlled by an adversary, it is "self-healing" in the sense that once the majority of the hashrate is again controlled by honest parties, Bitcoin regains (after some delay) all its security properties.

A bit more formally, let ${\sf PoW}_h(t)$ and ${\sf PoW}_a(t)$ denote the hashing power of the honest and adversarial parties at clock time $t$, respectively. For $t_0<t_1$ let

$$
{\sf PoW}_h(t_0,t_1)= \int_{t_0}^{t_1}{\sf PoW}_h(t) \,dt
\quad , \quad
{\sf PoW}_a(t_0,t_1)= \int_{t_0}^{t_1} {\sf PoW}_a(t) \,dt
$$

denote the cumulated hashing power in the time window from $t_0$ to $t_1$. If $D$ is the difficulty in this time window,[^1] then the expected number of blocks found by the honest parties in this time window is ${\sf PoW}_h(t_0,t_1)/D$.

It's instructive to understand when a transaction is trivially insecure: consider a transaction that is contained in a block attached at time $t$, if one waits for $k$ blocks on top before considering the transaction confirmed (for Bitcoin $k=6$ is often suggested), then an adversary can fork the chain in order to double spend this transaction with good probability if for some $t_0,t_1$ with $t_0\le t < t_1$ we have

$$
{\sf PoW}_a(t_0,t_1)\ge {\sf PoW}_h(t_0,t_1)\quad\textrm{and}\quad {\sf PoW}_h(t,t_1)/D\ge k
$$

<div class="eqnumber">eq.(11)</div>

If this holds the adversary can simply start at time $t_0$ to mine a chain in private, and release it at time $t_1$. By the first inequality the adversaries chain will be heavier than the honest one with probability at least $0.5$, and by the 2nd the honest block added at time $t$ will be buried by $k$ blocks with probability $0.5$, so both hold and we have a successful double spending attack with probability at least $\approx 0.5^2=0.25$ (it can actually be a bit less than that as the two events are negatively correlated).

To be secure it's not sufficient that no $t_0,t_1$ as in eq.(11) exist, but one needs to be "sufficiently far" from this situation to guarantee that double spending can only happen with some tiny probability. From the standard Chernoff bound it follows that the probability that a fork starting at a block added at time $t_0$ and being released at time $t_1$ will be successful (i.e., have higher weight than the honest chain) is exponentially small in the number of expected honest blocks ${\sf PoW}_h(t_0,t_1)/D$ and the square of the honest to adversarial advantage, i.e.,

$$
\begin{aligned}
&\text{Pr}\left[\text{fork starting at } t_0 \text{ and released at } t_1 \text{ heavier than honest chain}\right] \\
&\le -\exp\left(\frac{\mathsf{PoW}_h(t_0,t_1)}{D} \cdot\left( \frac{\mathsf{PoW}_h(t_0,t_1)}{\mathsf{PoW}_a(t_0,t_1)}-1 \right)^2\right)
\end{aligned}
$$

<div class="eqnumber">eq.(12)</div>

### 6.1.2 Recovering from PoStake Majority

This is in stark contrast to PoStake based longest-chain protocols, where once an adversary gets hold of keys controlling a sufficiently large amount of stake, security cannot be recovered by the honest parties without resorting on some external mechanism. The reason is bootstrapping as discussed in §2.3: an adversary who holds keys which at some point in the chain controlled stake $N$, can fork at that point and bootstrap a chain to the present that looks as if they had $N$ stake throughout. The issue is aggravated due to "stake-bleeding" [<a href="/green-paper-references/#GKR18">GKR18</a>], which refers to the fact that the fork can amass additional stake through fees and block-rewards.

### 6.1.3 Recovering from PoSpace Majority

A longest-chain protocol using only PoSpace (like Spacemint [<a href="/green-paper-references/#PKF18">PKF+18</a>]) is basically as bad as PoStake based protocols when it comes to healing after an adversary got control of a large amount of the resource. One difference is that in the PoStake case the bootstrapping is only possible while the adversary holds the space resource, while bootstrapping in PoStake just requires keys that were valid at some point in the past but can be worthless (i.e., not hold any stake in the chain currently considered by the honest parties) now. On the positive side, stake-bleeding is not an issues for PoSpace.

### 6.1.4 Recovering from Space-Time Majority in $\textsf{Chia}$ {#S:RPOST}

While a pure PoSpace based longest-chain protocol fails to heal from adversarial majority due to bootstrapping, by combining space with time as in Chia we prevent bootstrapping, and get a chain that naturally heals from adversarial majority. Though, what exactly constitutes the resource in a PoST protocol is less obvious than e.g. in the PoW or PoSpace setting. We already shortly touched this issue in §1.1. We'll now recap the notion for PoST resources introduced there, but in a more fine-grained manner using a time parameter to reflect that resources can change over time. Let

| Term                    | Definition                                                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| $space_h(t),space_a(t)$ | denote the disk space (more precisely, the space with initialised plots) available to the honest and adversarial parties at time $t$, respectively |
| $vdf_h(t)$              | denote the speed of the (three) VDFs available to the fastest honest and online time lord at time $t$                                              |
| $vdf_a(t)$              | denote the speed of the VDFs available to the adversary, the number of VDFs available to the adversary is unbounded.                               |

:::danger Security Notice 2: Unlimited VDFs
$vdf_h$ only considers the fastest honest time lord, as only they matter for the growth of the honest chain. The adversary on the other hand is allowed an unlimited number of VDFs of speed $vdf_a$. Not putting any bound here makes the security statements stronger, but it might seem to give the adversary an unrealistic advantage. This is not really the case as most of the advantage an adversary can get by using many VDFs (trough double dipping) can already be achieved by using a fairly low amount of VDFs. So it would hardly make a quantitative difference if we put a cap on the number of VDFs, say 100, or simply put no cap at all.
:::

Define the honest and adversarial resource at time time as the product of their space and VDF speed

$$
{\sf PoST}_h(t)=space_h(t)\cdot vdf_h(t)\quad,\quad
{\sf PoST}_a(t)=space_a(t)\cdot vdf_a(t)
$$

and analogously to the work setting let the cumulative space-time resource in a window from $t_0$ to $t_1$ be

$$
{\sf PoST}_h(t_0,t_1)= \int_{t_0}^{t_1}{\sf PoST}_h(t) \,dt
\quad , \quad
{\sf PoST}_a(t_0,t_1)= \int_{t_0}^{t_1} {\sf PoST}_a(t) \,dt
$$

With these definitions we now get a similar bound on the probability that an adversary can create a fork starting at $t_0$ and being released at time $t_1$ as we did for PoW in eq.(12)

$$
\begin{aligned}
&\text{Pr}\left[\text{fork starting at } t_0 \text{ and released at } t_1 \text{ heavier than honest chain}\right] \\
&\le -\exp\left(\frac{\mathsf{PoST}_h(t_0,t_1)}{D} \cdot\left( \frac{\mathsf{PoST}_h(t_0,t_1)}{1.47\cdot \mathsf{PoST}_a(t_0,t_1)}-1 \right)^2\right)
\end{aligned}
$$

<div class="eqnumber">eq.(13)</div>

A difference to the PoW setting is the additional $1.47$ factor boosting the adversary's resource which is necessary to account for the fact that they can do some bounded double dipping.

Analogously to the PoW case, a block added at time $t$ can be considered secure even in a setting where the adversary can get temporary majority as long as for all $t_0,t_1,t_0<t<t_1$ where $t_1-t$ is large enough for the block added at time $t$ to be considered confirmed at time $t_1$, the probability in eq.(13) is small.

## 6.2 Dynamic Availability

A blockchain based on some resource is _secure under dynamic availability_ if it's security properties hold even if the amount of the resource dedicated towards securing the chain varies over time as long as at any point in time the honest parties control sufficiently more of the resource than a potential adversary.

### 6.2.1 Dynamic Availability for PoW (Bitcoin)

Using notation from §6.1.1, for a PoW based chain that means that for some $f>1$ (that captures the advantage of the honest parties) and any time $t$ we have

$$
{\sf PoW}_a(t)\le f\cdot {\sf PoW}_h(t)
$$

<div class="eqnumber">eq.(14)</div>

To see that Bitcoin is secure under dynamic availability we can reuse our inequality eq.(12) which using $\frac{{\sf PoW}_h(t_0,t_1)}{{\sf PoW}_a(t_0,t_1)}\ge f$ simplifies to (recall that $\frac{{\sf PoW}_h(t_0,t_1)}{D}$ is the expected number of honest blocks in the $t_0$ to $t_1$ window)

$$
\begin{aligned}
&\text{Pr}\left[\text{fork starting at } t_0 \text{ and released at } t_1 \text{ heavier than honest chain}\right] \\
&\le -\exp\left(\frac{\mathsf{PoW}_h(t_0,t_1)}{D} \cdot\left(f-1 \right)^2\right)
\end{aligned}
$$

<div class="eqnumber">eq.(15)</div>

Which simply means that the probability that an adversary will be able to create any particular a fork decreases exponentially in the length of the fork.

### 6.2.2 Dynamic Availability for PoST ($\textsf{Chia}$)

Analogously to PoW just outlined, and using notation from §6.1.4 we can define dynamic availability for PoST as used in $\textsf{Chia}$ by requiring that at any time $t$

$$
{\sf PoST}_a(t)\le f\cdot {\sf PoST}_h(t)
$$

<div class="eqnumber">eq.(16)</div>

With this eq.(13) becomes

$$
\begin{aligned}
&\text{Pr}\left[\text{fork starting at } t_0 \text{ and released at } t_1 \text{ heavier than honest chain}\right] \\
&\le -\exp\left(\frac{\mathsf{PoST}_h(t_0,t_1)}{D} \cdot\left( \frac{f}{1.47}-1 \right)^2\right)
\end{aligned}
$$

<div class="eqnumber">eq.(17)</div>

Thus like in Bitcoin, in $\textsf{Chia}$ the probability of a successful fork decreases exponentially fast in the length of the fork.

Unlike for PoW, to guarantee security it's not sufficient that $f>1$, but we need a more substantial gap in the resources of the honest parties and the adversary to account for double dipping, for parameters as in $\textsf{Chia}$ $f>1.47$ is sufficient.

### 6.2.3 Dynamic Availability from PoSpace {#S:DAspace}

While in $\textsf{Chia}$ we achieve security under dynamic availability by using space and time as a resource, it's an intriguing question whether a longest-chain blockchain based on proofs of space alone like Spacemint [<a href="/green-paper-references/#PKF18">PKF+18</a>] could be secure under dynamic availability.

Surprisingly, the answer is a resounding no as shown in [<a href="/green-paper-references/#BP22">BP22</a>]. They consider a setting where the chain progresses in steps, where a step happens every time a new challenge is picked. The adversary can change the amount of space available to the honest parties by a factor $1\pm\epsilon$ with every step, and the space available to them is always a factor $f>1$ smaller than what the honest parties have. Moreover the space can be replotted in $R$ steps. Their result states that no matter what chain selection rule is used, in this setting a PoSpace based blockchain can always be successfully forked by an adversary with a fork of length at most $R\cdot \epsilon/f^2$ steps. This bound is tight as a (albeit fairly complicated and thus not practical) chain selection rule achieving this bound exists.

### 6.2.4 Dynamic Availability from PoStake

The impossibility from [<a href="/green-paper-references/#BP22">BP22</a>] just discussed does not translate to proofs of stake based chain as there's no analogue for replotting in the stake setting. In fact, PoStake based longest-chain protocols secure under dynamic availability do exist [<a href="/green-paper-references/#BGK18">BGK+18</a>]. The Ouroboros genesis chain selection rule from this paper works as follows: given two competing chains, one just compares the chains at a fairly short window right after the fork. Intuitively, the reason such a chain selection rule does not provide security under dynamic availability for space is because an adversary could use replotting to make this short window have large weight, thus create a winning chain even with much less space than the honest party.

[^1]: If there's an epoch switch at some $t,t_0<t<t_1$ where the difficulty switches from $D_0$ to $D_1$, let $D$ be the weighted average $D=D_0\frac{t-t_0}{t_1-t_0}+D_1\frac{t_1-t}{t_1-t_0}$.
