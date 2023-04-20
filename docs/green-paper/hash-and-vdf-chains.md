---
title: Hash and VDF chains - Chia Green Paper
sidebar_label: 4 - Hash and VDF chains
slug: /hash-and-vdf-chains
---

# 4 - Hash and VDF chains {#S:chains}

A key ingredient in longest-chain blockchains are hash-chains as discussed in §[5.1](#S:HC){reference-type="ref" reference="S:HC"} below. While Chia also uses a hash-chain (for the foliage chain ${\cal FC}$), for Chia we use a new chaining structure called a VDF chain defined in §[5.2](#S:vdfchain){reference-type="ref" reference="S:vdfchain"} below. []{#s:chains label="s:chains"}

## 4.1	Hash chains {#S:HC}

For this writeup, a *hash chain* is a sequence $b_0,b_1,b_2\ldots$ of blocks, where each block $b_i=\{h_i,x_i\}$ contains some data value $x_i$ (possibly empty) and (with the exception of $b_0$) a hash value of the current data and the previous block. $$h_i:={\sf H}(b_{i-1},x_i)$$

#### Security from hash chains.

A hash chain is immutable in the following sense

::: proposition
**Proposition 2** (immutability of hash chains). *If ${\sf H}$ is a collision-resistant hash function, then it is computationally infeasible to find two distinct hash chains ${\cal H}=b_0,\ldots.b_i$ and ${\cal H'}=b'_0,\ldots,b'_j$ where $h_i=h'_j$ and no chain is a prefix of the other (which holds if they start with the same $x_0=x'_0$).*
:::

## 4.2	VDF chains {#S:vdfchain}

<figure id="fig:infusion">
<div class="center">

</div>
<figcaption><span id="fig:infusion" label="fig:infusion"></span>Illustration of a VDF chain.</figcaption>
</figure>

A VDF chain is a sequence $$\label{e:VDFchain}
{\cal V}=z_0,\tau_1,z_1,\tau_2,z_2,\ldots,\tau_\ell$$ alternating data values $z_i\in\{0,1\}^*$ and VDF values $\tau_i=(\tau_i.{\sf y},\tau_i.\pi,\tau_i.{\sf c},\tau_i.{\sf t})$ (as described in §[8.3](#S:vdf){reference-type="ref" reference="S:vdf"}). The chain is valid if all VDF proofs are correct $${\sf VDF.verify}(\tau_i)={\sf accept}$$ and the challenge for the $i$th VDF is derived from the previous VDF output (except for $i=1$) and data value $$\tau_1.c:={\sf VDF.sample}(z_0)\ \ \textrm{ and }\ \  \forall i >1\ :\ \tau_i.{\sf c}:={\sf VDF.sample}(\tau_{i-1}.{\sf y}\ ,\ z_{i-1})$$ where we use the convention that $\tau_0.{\sf y}$ is the empty string.

### 4.2.1	Notation for VDF chains

We naturally extend the notion for VDFs as described in §[8.3](#S:vdf){reference-type="ref" reference="S:vdf"} to VDF chains. The *total number of VDF steps in a VDF chain* as in eq.([\[e:VDFchain\]](#e:VDFchain){reference-type="ref" reference="e:VDFchain"}) is simply the sum of the steps in its VDFs $${\cal V}.{\sf t}\stackrel{\scriptsize \sf def}{=}\sum_{i=1}^\ell \tau_i.{\sf t}$$

#### Security from VDF chains.

VDF chains give two basic security guarantees, the first is immutability analogous to hash chains, but also sequentiality inherited from the underlying VDF, we discuss them shortly in more detail.

::: proposition
**Proposition 3** (immutability and sequentiality of VDF chains). *Like a hash chain, a VDF chain is *immutable* in the sense that it's computationally infeasible to come up with two different VDF chains $${\cal V}=z_0,\tau_1,z_1,\tau_2,z_2,\ldots,\tau_\ell
\qquad
{\cal V}'=z'_0,\tau'_1,z'_1,\tau'_2,z'_2,\ldots,\tau'_{\ell'}$$ where the last VDF outputs collide, i.e., $\tau_\ell.{\sf y}=\tau'_{\ell'}.{\sf y}$. Here different means that either they have different length $\ell\neq \ell'$ and neither is a prefix of the other. Or (if $\ell=\ell'$) there exists an $i$ s.t. either $z_i\neq z'_i$ or $\tau_i.{\sf y}\neq \tau'_i.{\sf y}$ or $\tau.{\sf t}\neq \tau'.{\sf t}$. Note that we ignore the proofs $\tau.\pi$ when comparing chains (we just use them to determine whether the chain is valid) as they must not be unique.*

*Moreover a VDF chain is *sequential*, meaning that not only the individual VDFs must be computed sequentially (which follows from the security definition of VDFs), but also the VDFs in the chain were computed sequentially. I.e., computing a chain ${\cal V}$ as above requires $\sum_{i=1}^\ell \tau_i.{\sf t}$ sequential steps.*
:::