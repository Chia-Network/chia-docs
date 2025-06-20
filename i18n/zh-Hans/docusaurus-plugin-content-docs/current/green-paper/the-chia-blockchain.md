---
title: The Chia Blockchain - Chia Green Paper
sidebar_label: 5 - The Chia Blockchain
slug: /the-chia-blockchain
---

# 5 - The $\textsf{Chia}$ Blockchain

In this section we finally outline the design of the $\textsf{Chia}$ blockchain as illustrated in Figure 1 from its basic building blocks PoSpace, VDFs and Signatures. These primitives are specified in §A. We'll use greek letters $\sigma$ to denote PoSpace, $\tau$ for VDFs and $\mu$ for Signatures.

<figure>
    <img src="/img/green-paper/4chains.png" alt="Challenge chain diagram" />
    <figcaption>
        Figure 7: The reward, challenge and infused challenge chains. For illustration we only use 8 not 64 signage points per sub-slot.
    </figcaption>
</figure>

## 5.1 Additional Variables and Notation for this Section

### 5.1.1 Variables

| Variable         | Definition                                                                                                                 |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------- |
| $T_i$            | Time parameter of $i$-th slot (# of VDF steps per sub-slot). Recalibrated once per day for 10 minutes per sub-slot target. |
| $\mathsf{spi}_i$ | $$\mathsf{spi}_i \stackrel{\text{\tiny def}}{=} \frac{T_i}{64}$$                                                           |
| $D_i$            | Difficulty parameter of $i$-th slot. Recalibrated once per day for 32 blocks per slot target                               |

### 5.1.2 Step to Epoch

$\kappa_i$ :Number of sub-slots in $i$th slot. Typically $\kappa_i=1$ but can be larger integer to enforce a $16$ block minimum.

### 5.1.3 Notation for Points of Interest

To describe the $\textsf{Chia}$ chains it will be convenient to introduce some extra notation. Recall that for a VDF $\tau$ or VDF chain ${\cal V}$ we denote with $\tau[t]$ or ${\cal V}[t]$ the point $t$ steps into the computation. $\tau.{\sf t},{\cal V}.{\sf t}$ is the total number of steps. Sometimes we overload notation and consider $\tau,{\cal V}$ to denote the point at the end of the computation rather than the entire VDF or VDF chain, i.e., $\tau=\tau[\tau.{\sf t}],{\cal V}={\cal V}[{\cal V}.{\sf t}]$.

The VDF chains we'll consider (${\cal RC}$ and ${\cal CC}$) will be split into slots where the starting point of a new slot will always be an infusion point. For a point ${\sf point}={\cal V}[t]$ on such a chain we denote with

| Point                 | Definition                                                                                                                                                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ${\sf point}.{\sf D}$ | the total depth, i.e., the number of steps of this point since genesis                                                                                                                                                              |
| ${\sf point}.{\sf d}$ | the depth of this point in the current slot                                                                                                                                                                                         |
| ${\sf point}.{\sf t}$ | the depth of this point in its VDF                                                                                                                                                                                                  |
| ${\sf point}.{\sf x}$ | the value of the VDF chain at this point                                                                                                                                                                                            |
| ${\sf point}.\pi$     | a proof certifying the VDF computation up to this point                                                                                                                                                                             |
| ${\sf point}^+$       | If ${\sf point}$ is an infusion point where some value $v$ gets infused, then we denote with ${\sf point}$ the point before infusion, and with $${\sf point}^+ = {\sf VDF.sample}({\sf point}.{\sf x},v)$$ the point after infusion |

The following points on the $\textsf{Chia}$ VDF chains will be defined

| Point                 | Definition                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------ |
| ${\sf cc\_sp}_{i,j}$  | The $j$th **challenge chain signage point** in the $i$th slot (eq.(6))                     |
| ${\sf rc\_sp}_{i,j}$  | The $j$th **reward chain signage point** in the $i$th slot (eq.(9))                        |
| ${\sf cc\_sp}(\beta)$ | he ${\sf cc\_sp}_{i,j}$ used as challenge to compute the PoSpace $\sigma$ in block $\beta$ |
| ${\sf rc\_sp}(\beta)$ | The ${\sf rc\_sp}_{i,j}$ whose signature $\mu_{{\sf rc\_sp}}$ is in $\beta$                |
| ${\sf rc\_ip}(\beta)$ | The infusion point of $\beta$ into ${\cal RC}$ (eq.(10)                                    |

The _signage point interval_ is the number of VDF steps between signage points, for the $i$th slot it's

$$
{\sf spi}_i \stackrel{\scriptsize \sf def}{=}T_i/64
$$

so e.g., the depth of the $j$th signage point in the $i$th slot is $\mathsf{rc\_sp}_{i,j}.\mathsf{d} = \mathsf{cc\_sp}_{i,j}.\mathsf{d} = j \cdot \mathsf{spi}_i$. A block in the $i$th slot will be infused 3 to 4 signage point intervals past its signage point.

$$
3\cdot {\sf spi}_i\ <\
{\sf rc\_ip}(\beta_T).{\sf d}\ -\ {\sf rc\_sp}(\beta_T).{\sf d}\ < \ 4\cdot {\sf spi}_i
$$

The first signage point in a slot is the last signage point after infusion

$$
{\sf rc\_sp}_{i+1,0}={\sf rc\_sp}_{i,\tau_i\cdot 64}^+
$$

The $i$th slot starts at total depth

$$
{\sf rc\_sp}_{i,0}.{\sf D}=\sum_{j=1}^{i-1}T_j\cdot \kappa_j
$$

## 5.2 The Challenge Chain

The challenge chain ${\cal CC}$ is a VDF chain whose data and VDF values we'll denote as

$$
{\cal CC}={\sf ic}_0,  \tau^{{\cal CC}}_1,{\sf ic}_1,\tau^{\cal CC}_2,{\sf ic}_2,\ldots
$$

Here $\tau^{\cal CC}_i$ is the VDF computation for the $i$th slot. Usually its number of VDF steps is the current time parameter $T_i$ (and should take 10 minutes to compute), but in exceptional cases it can be an integer multiple $\kappa_i\in\mathbb{N}$ of that as we enforce a 16 block minimum per slot

$$
\tau^{\cal CC}_i.{\sf t} = \kappa_i\cdot T_i
\qquad\textrm{typically $\kappa_i=1$}
$$

The value ${\sf ic}_i$ infused at the beginning of slot $i+1$ depends on the first block in slot $i$, we'll explain how exactly in §5.5.

As the VDF $\tau^{\cal CC}_i$ of the $i$th slot is computed by a time lord, they release equidistant points of this computation called the _challenge chain signage points_, one every ${\sf spi}_i=T_i/64$ VDF steps or around $9.375=600/64$ seconds

$$
{\sf cc\_sp}_{i,0},{\sf cc\_sp}_{i,1},\ldots,{\sf cc\_sp}_{i,\tau_i\cdot 64}\quad\textrm{where}\quad {\sf cc\_sp}_{i,j}\stackrel{\scriptsize \sf def}{=}\tau^{\cal CC}_i[j\cdot {\sf spi}_i]
$$

<div class="eqnumber">eq.(6)</div>

The point ${\sf cc\_sp}_{i,\tau_i\cdot 64}$ at the end of the slot must also be broadcast as it's required to verify the VDF, but it's not used as a challenge as it's at the same depth as the first signage point ${\sf cc\_sp}_{i+1,0} \gets {\sf VDF.sample}({\sf cc\_sp}_{i,\tau_i\cdot 64},{\sf ic}_i)$ of the next slot.

:::tip Design Choice 1: A Continuous Flow of Challenges
To get the security gains of correlated randomness, we let our PoSpace challenges depend on only one block (out of around 32) per slot, so there's a fresh challenge every 10 minutes. At the same time, we want a smooth continuous block arrival time (target is 18.75 seconds) and the challenge for each block should be revealed around 30 seconds before the block is infused (not much less to avoid orphan blocks, not much more to limit selfish mining and bribing opportunities). Deriving challenges ${\sf cc\_sp}_{i,1},{\sf cc\_sp}_{i,2},\ldots$ deterministically from one initial challenge ${\sf cc\_sp}_{i,0}$ using a delay function as outline above achieves exactly that.
:::

The reward chain ${\cal RC}$ is a VDF chain that the time lords evaluate in parallel to ${\cal CC}$ and also has signage points at the same depth as ${\cal CC}$, i.e., ${\sf rc\_sp}_{i,j}.{\sf d}={\sf cc\_sp}_{i,j}.{\sf d}$. Before we can define ${\cal RC}$ we first need to explain the content of blocks.

## 5.3 Trunk Blocks {#S:TB}

Whenever a farmer receives new signage points ${\sf cc\_sp}_{i,j},{\sf rc\_sp}_{i,j}$ they first check whether this points lie on a heaviest chain (cf. the discussion in §1.5) and their VDF proofs verify. If the this is the case, the farmer checks they can create a winning PoSpace proof. This process will, for a subset of the plots, produce a PoSpace $\sigma$ and some additional value $\sigma.{\sf required\_iterations}$. Whether this PoSpace is a winning proof is now determined by the time parameter $T_i$ as

$$
\textrm{winning condition : }
\sigma.{\sf required\_iterations} < {\sf spi}_i\quad (=T_i/64)
$$

<div class="eqnumber">eq.(7)</div>

:::tip Design Choice 2: Why 32 Blocks in Expectation and not Exactly?
With our winning condition we have 32 blocks per slot _in expectation_ depending on a challenge. We could have used a different design to enforce _exactly_ 32 challenges, but then it would be impossible to achieve our Objective 1.(c), which asks that whether a plot wins must depend solely on the challenge.
:::

If a farmer has a winning PoSpace $\sigma$ they can produce a block $\beta=(\beta_T,\beta_F)$ which contains the foliage block $\beta_F$ and the trunk block $\beta_T$. The actual $\textsf{Chia}$ blocks are more sophisticated than our description below, but in this writeup we focus on the entries which are absolutely necessary for functionality and security of the chain and ignore entries which are there for efficiency like weight proofs for light clients or pooling. They key entries in a valid trunk block

$$
\beta_T=(\sigma,\mu_{{{\sf rc\_sp}}})
$$

are

$\sigma\gets {\sf PoSpace.prove}(S,{\sf cc\_sp}_{i,j})$, a proof of space for some plot $S$ on challenge ${\sf cc\_sp}_{i,j}$ where the proof $\sigma$ satisfies the winning condition from eq.(7).

$\mu_{\sf rc\_sp}\gets {{\sf Sig.sign}}(S.sk,{\sf rc\_sp}_{i,j})$, a signature using the secret key of the plot $S$ (so it verifies under the public-key $\sigma.pk$ in the PoSpace) of the signage point in the rewards chain discussed in the next section.

## 5.4 The Reward Chain

The reward chain ${\cal RC}$ is a VDF chain that time lords compute in parallel to ${\cal CC}$. Like ${\cal CC}$, ${\cal RC}$ can be spilt in a sequence of slots.

$$
{\cal RC}={\cal RC}_1,{\cal RC}_2,\ldots
$$

While in ${\cal CC}$ the $i$th slot just contains a VDF $\tau^{\cal CC}_i$ and the value ${\sf ic}_i$ infused at the end, each slot ${\cal RC}_i$ of the ${\cal RC}$ chain

$$
{\cal RC}_i=\tau^{\cal RC}_{i,1},\beta_1,\tau^{\cal RC}_{i,2},\beta_2\ldots, \beta_{b_i} \tau^{\cal RC}_{i,b_i+1},({\sf ic}_i,\tau^{\cal CC}_{i}.{\sf y})
$$

<div class="eqnumber">eq.(8)</div>

is a VDF chain with typically around $33$ infused values: around 32 blocks $b_i$ and at the end of the slot also the ${\cal CC}$ and ${\sf i}{\cal CC}$ points at the same depth. The ${\cal RC}$ signage points are

$$
{\sf rc\_sp}_{i,j}\stackrel{\scriptsize \sf def}{=}{\cal RC}_i[j\cdot {\sf spi}_i]
$$

<div class="eqnumber">eq.(9)</div>

#### Where do Blocks get Infused.

Let $\beta_T=(\sigma,\mu_{{{\sf rc\_sp}}})$ be some valid block for challenge ${\sf cc\_sp}(\beta_T)$, its reward chain infusion point ${\sf rc\_ip}(\beta_T)$ is then at depth

$$
{\sf rc\_ip}(\beta_T).{\sf d}={\sf rc\_sp}(\beta_T).{\sf d}+3\cdot {\sf spi}_i+\sigma.{\sf required\_iterations}
$$

<div class="eqnumber">eq.(10)</div>

As $\sigma.{\sf required\_iterations}$ is at most ${\sf spi}_i$ the infusion point is somewhere between 3 and 4 signage points past the signage point it refers to. That means we have somewhere from 28.125 to 37.5 seconds for a round trip from the time lord who gossips the signage point, to a farmer who computes and gossips a block, back to the time lord who then infuses the block.

## 5.5 The Infused Challenge Chain

Recall that the challenge chain ${\cal CC}$ is used to create PoSpace challenges, and we want these challenges to only depend on one block per slot. For this, at the end of the $i$th slot we infuse the PoSpace $\sigma$ from the first trunk block $\beta_T$ whose signage point is in the $i$th slot into ${\cal CC}$. We don't simply infuse $\sigma$, but to delay revealing the challenge for as long as possible and make sure it's buried deep in the chain when revealed, we run a VDF on top of $\sigma$ to get the infused challenge value ${\sf ic}_i$ to be infused as defined in §5.2.

Concretely, the infused challenge of the $i$th slot is the output of a VDF computation

$$
{\sf ic}_i\stackrel{\scriptsize \sf def}{=}\tau.{\sf y}\qquad \tau={\sf VDF.solve}(x,t)
$$

on some challenge $x$ and time $t$ which are defined as follows.

Let $\beta_T=(\sigma,\mu_{{{\sf rc\_sp}}})$ be the first trunk block infused into the $i$th slot ${\cal RC}_i$ past the 3rd signage point, using notion as in eq.(10)

$$
\beta_T=\beta_j \textrm{ where }j=\min\{k\ :\ \beta_k.{\sf d}>3\cdot {\sf spi}\}
$$

now the challenge $x$ is derived from the PoSpace in this block and the value of ${\cal CC}$ at the depth of its infusion point

$$
\quad
x\gets {\sf VDF.sample}(\sigma,{\cal CC}[{\sf rc\_ip}(\beta_T).{\sf D}].{\sf y})
$$

the number of steps $t$ is the the remaining number of VDF steps in the slot, so the value ${\sf ic}_i$ will be available at the end of the slot when it's required, but not earlier

$$
t={\sf cc\_ip}_{i,0}.{\sf D}- {\sf rc\_ip}(\beta).{\sf D}
$$

:::danger Security Notice 1: Why iCC depends only on σ
We only use $\sigma$, not the entire trunk block $\beta_T=(\sigma,\mu_{{{\sf rc\_sp}}})$, to compute the infused challenge ${\sf ic}_i$. This is crucial to ensure that the challenges depend only on a single challenge per slot. Had we infused the entire $\beta_T$ (as we do into ${\cal RC}$), the challenges would depend on all blocks (as $\mu_{{\sf rc\_sp}}$ depends on ${\cal RC}$ which infuses all blocks) and we would not get security against double dipping.
:::

:::tip Design Choice 3: Why Infusing the First Block?
Recall that by our Objective 1.(a) we want challenges to be only revealed when necessary and (b) to be immutable once revealed.

While (b) suggest to infuse the first possible block so it's buried once revealed, for (a) it would be better to use the latest possible block. We go with the first block to achieve (b), and by running a VDF on top of the block we also achieve objective (a).
:::

:::tip Design Choice 4: Upper and Lower Bounds on Blocks per Slot
The target number of blocks per slot is 32, and there's an upper bound of 64 and lower bound of 16. These bounds make some attacks more difficult. In normal deployment the number of blocks will be close to its expectation, so these bounds should basically never be reached. The lower bound is required to bound the efficacy of double-dipping as sketched in §2.2, while the upper bound is necessary to prevent replotting attacks as explained in §1.8.3.
:::

:::info Objective 2: The Trunk is (almost) Ungrindeable
To prevent grinding, the only decision that influences the trunk should be whether to add a block or not. We need one exception to this rule: the time-stamps (in blocks in the foliage) are used to recalibrate the time parameter which determines the numbers of VDFs steps per slot in the trunk. This gives a minor grinding opportunity, to further limit the usability of this for attacks, the window used to calibrate the time parameter is not simply the previous epoch, but shifted $XXX$ back so the relevant time-stamp is already buried deep in the chain.
:::

:::info Objective 3: ${\cal CC}$ (almost) only Depends on the First Block
To limit the impact of double-dipping we use correlated randomness [<a href="/green-paper-references/#BDK19">BDK+19</a>]). For this the challenge chain ${\cal CC}$ should only depend on the first block in every slot. If this was the case, this would allow for long-range replotting attacks. For this reason, once every sub-epoch (approx 2h) the rewards chain is infused to the challenge chain.
:::

## 5.6 The Foliage

Whenever a farmer finds a winning PoSpace they can create a block $\beta=\{\beta_F,\beta_T\}$ which contains the trunk block $\beta_T$ as discussed above, and a foliage block

$$
\beta_F=\{{\sf data},\mu_F\}
$$

which contains the payload of the block ${\sf data}$ (transactions, a time-stamp) and a signature (using the key $S.sk$ as for $mu_{\sf rc\_sp}$, cf.§5.3})

$$
\mu_F \gets {{\sf Sig.sign}}(S.sk,(\beta_T,\beta'_F))
$$

that links this foliage block to the chain. It signs the (hashes of the) current trunk block $\beta_T$ as well as the foliage block $\beta'_F$ from the last transaction block as discussed below.

While _every_ valid trunk block will typically be infused into ${\cal RC}$ (unless the time lord is malicious, the block arrives too late to be infused or the slot is already at its 64 block upper limit), only a subset of the foliage blocks are included in the foliage chain ${\cal FC}$ for reasons outlined below:

:::info Objective 4: Block Arrival vs. Creation Time
We want blocks to arrive at a rather high frequency ($9.375$ seconds on average) to achieve fast confirmation. At the same time we want to give sufficient time ($28.125$ to $37.5$ seconds between signage and infusion points of a block) for block creation to prevent oprhan blocks.
:::

:::info Objective 5: Sequential Transaction Blocks
Every block of transactions added must refer to the previous block of transactions. This way we avoid having to deal with transactions that are invalid due to previous transactions that were added but were not known to the creator of the current transaction block.
:::

:::tip Design Choice 5: Foliage
To achieve the above objectives, we let farmers who found a winning PoSpace and can create a block always create a foliage block referring to the last transaction block before the signage point of their block. The time lord will add the foliage of a block – and thus make this block a _transaction block_ – if no other transaction block was infused between the signage and infusion point of that block.
:::

## 5.7 Fraction of Transaction Blocks

With the above rule, we expect one transaction block every $\left(\frac{1}{e^{0.5}-1}+4\right)\approx 5.54$ slots, that's one every $51.95$ seconds and corresponds to $36\%$ of all blocks.

For the interested reader, let us shortly outline how the above is determined. The signage points of consecutive transactions blocks must be at least 4 points apart as a block with signage point ${\sf rc\_sp}_i$ is infused somewhere between ${\sf rc\_sp}_{i+3}$ and ${\sf rc\_sp}_{i+4}$. The gap can be bigger than $4$ points if no block is found in response to ${\sf rc\_sp}_{i+4}$ and potentially more points after that. The expected number of blocks found for each slot is $0.5$ (32 block target for 64 points). The number of blocks found for each slot is Poisson distributed with expectation $0.5$ ($32$ block target for $64$ points). With this distribution, the expected number of consecutive points with no blocks is $\frac{1}{e^{0.5}-1}$.
