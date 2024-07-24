---
title: Hash and VDF chains - Chia Green Paper
sidebar_label: 4 - Hash and VDF chains
slug: /hash-and-vdf-chains
---

# 4 - Hash and VDF chains

A key ingredient in longest-chain blockchains are hash-chains as discussed in §4.1 below. While $\textsf{Chia}$ also uses a hash-chain (for the foliage chain ${\cal FC}$), for $\textsf{Chia}$ we use a new chaining structure called a VDF chain defined in §4.2 below.

## 4.1 Hash chains

For this writeup, a _hash chain_ is a sequence $b_0,b_1,b_2\ldots$ of blocks, where each block $b_i=\{h_i,x_i\}$ contains some data value $x_i$ (possibly empty) and (with the exception of $b_0$) a hash value of the current data and the previous block.

$$
h_i:={\sf H}(b_{i-1},x_i)
$$

#### Security from hash chains.

A hash chain is immutable in the following sense:

---

**Proposition 2** (immutability of hash chains). _If ${\sf H}$ is a collision-resistant hash function, then it is computationally infeasible to find two distinct hash chains ${\cal H}=b_0,\ldots.b_i$ and ${\cal H'}=b'_0,\ldots,b'_j$ where $h_i=h'_j$ and no chain is a prefix of the other (which holds if they start with the same $x_0=x'_0$)._

---

## 4.2 VDF chains

<figure>
	<img src="/img/green-paper/infusion.png" alt="Illustration of a VDF chain" />
	<figcaption>Figure 6: Illustration of a VDF chain.</figcaption>
</figure>

A VDF chain is a sequence

$$
{\cal V}=z_0,\tau_1,z_1,\tau_2,z_2,\ldots,\tau_\ell
$$

<div class="eqnumber">eq.(5)</div>

alternating data values $z_i\in\{0,1\}^*$ and VDF values $\tau_i=(\tau_i.{\sf y},\tau_i.\pi,\tau_i.{\sf c},\tau_i.{\sf t})$ (as described in §A.3). The chain is valid if all VDF proofs are correct

$$
{\sf VDF.verify}(\tau_i)={\sf accept}
$$

and the challenge for the $i$th VDF is derived from the previous VDF output (except for $i=1$) and data value

$$
\tau_1.c := \mathsf{VDF.sample}(z_0) \quad \text{ and } \quad \forall i > 1 : \tau_i.\mathsf{c} := \mathsf{VDF.sample}(\tau_{i-1}.\mathsf{y}, z_{i-1})
$$

where we use the convention that $\tau_0.{\sf y}$ is the empty string.

### 4.2.1 Notation for VDF chains

We naturally extend the notion for VDFs as described in §A.3 to VDF chains. The _total number of VDF steps in a VDF chain_ as in eq.(5) is simply the sum of the steps in its VDFs

$$
{\cal V}.{\sf t}\stackrel{\scriptsize \sf def}{=}\sum_{i=1}^\ell \tau_i.{\sf t}
$$

#### Security from VDF chains.

VDF chains give two basic security guarantees, the first is immutability analogous to hash chains, but also sequentiality inherited from the underlying VDF, we discuss them shortly in more detail.

---

**Proposition 3** (immutability and sequentiality of VDF chains). *Like a hash chain, a VDF chain is *immutable* in the sense that it's computationally infeasible to come up with two different VDF chains*

$$
{\cal V}=z_0,\tau_1,z_1,\tau_2,z_2,\ldots,\tau_\ell
\qquad
{\cal V}'=z'_0,\tau'_1,z'_1,\tau'_2,z'_2,\ldots,\tau'_{\ell'}
$$

where the last VDF outputs collide, i.e., $\tau_\ell.{\sf y}=\tau'_{\ell'}.{\sf y}$. Here different means that either they have different length $\ell\neq \ell'$ and neither is a prefix of the other. Or (if $\ell=\ell'$) there exists an $i$ s.t. either $z_i\neq z'_i$ or $\tau_i.{\sf y}\neq \tau'_i.{\sf y}$ or $\tau.{\sf t}\neq \tau'.{\sf t}$. Note that we ignore the proofs $\tau.\pi$ when comparing chains (we just use them to determine whether the chain is valid) as they must not be unique.

Moreover a VDF chain is _sequential_, meaning that not only the individual VDFs must be computed sequentially (which follows from the security definition of VDFs), but also the VDFs in the chain were computed sequentially. I.e., computing a chain ${\cal V}$ as above requires $\sum_{i=1}^\ell \tau_i.{\sf t}$ sequential steps.

---
