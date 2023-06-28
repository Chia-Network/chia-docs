---
title: Appendix - Chia Green Paper
sidebar_label: A - Appendix
slug: /green-paper-appendix
---

# A - Building Blocks: PoSpace, VDFs and Signatures

In this section we sketch the main building blocks used in the $\textsf{Chia}$ blockchain: unique digital signatures, proofs of space [<a href="/green-paper-references/#DFKP15">DFKP15</a>; <a href="/green-paper-references/#AAC17">AAC+17</a>] and verifiable delay functions [<a href="/green-paper-references/#Pie19b">Pie19b</a>; <a href="/green-paper-references/#BBBF18">BBBF18</a>; <a href="/green-paper-references/#Wes20">Wes20</a>]. The definitions are not fully general, but instead tailored to the particular constructions of PoSpace from [<a href="/green-paper-references/#AAC17">AAC+17</a>] and the VDFs [<a href="/green-paper-references/#Pie19b">Pie19b</a>; <a href="/green-paper-references/#BBBF18">BBBF18</a>; <a href="/green-paper-references/#Wes20">Wes20</a>] based on sequential squaring.

## A.1 (Unique) Digital Signatures

A digital signature scheme is specified by three algorithms; a (probabilistic) key-generation algorithm ${{\sf Sig.keygen}}$, a signing algorithm $\mu\gets {{\sf Sig.sign}}(sk,m)$ and a verification algorithm ${{\sf Sig.verify}}$. We assume the standard security notion (unforgeability under chosen message attacks) and perfect completeness, that is, a correctly generated signature will always verify:

$$
\begin{aligned}
\forall m,&&
\Pr[{{\sf Sig.verify}}(pk,m,\mu)={\sf accept}]=1\\
\textrm{where}&&(pk,sk)\gets{{\sf Sig.keygen}}\ ;\ \mu\gets{{\sf Sig.sign}}(sk,m)~.
\end{aligned}
$$

$\textsf{Chia}$ uses signatures in the foliage (to chain foliage blocks and to bind them to the trunk) and also in the trunk (so only the farmer can compute the challenge). To avoid grinding attacks, the signatures used in the trunk must be unique, that is for every $pk$ (this includes maliciously generated public keys) and message $m$ there can be at most one accepting signature

$$
\forall pk,m,\
({{\sf Sig.verify}}(pk,m,\mu)={\sf accept})\wedge
({{\sf Sig.verify}}(pk,m,\mu')={\sf accept})\Rightarrow (\mu=\mu')~.
$$

## A.2 (Unique) Proofs Of Space

### A.2.1 Algorithms for PoSpace

A proof of space is specified by the four algorithms given below

##### $\textsf{PoSpace.init}$

> on input a space parameter $N\in{\cal N}$ (where ${\cal N}\subset \mathbb{Z}^+$ is some set of valid parameters) and a unique identifier $pk$ (we use $pk$ to denote the identifier as in $\textsf{Chia}$ it will be the public key of a signature scheme) outputs[^1] <br /><br /> $$S=(\ S.\Lambda\ ,\ S.N=N\ ,\ S.pk=pk)\gets {\sf PoSpace.init}(N,pk)$$ <br /><br />Here $S.\Lambda$ is the large file of size $\lvert S.\Lambda\ \rvert \approx N$ the prover needs to store. We also keep $N,pk$ as part of $S$ as it will be convenient.

##### $\textsf{PoSpace.prove}$

> on input $S$ and a challenge $c\in \{0,1\}^w$ outputs a proof <br /><br /> $$\sigma=(\ \sigma.\pi\ , \sigma\ = \ \sigma.N=S.N\ ,\ \sigma.pk=S.pk\ ,\ \sigma.c=c\ )\ \gets {\sf PoSpace.prove}(S,c)$$ <br /><br />Here $\sigma.\pi$ is the actual proof, the other entries in $\sigma$ are just convenient to keep around.

##### $\textsf{PoSpace.verify}$

> on input a proof $\sigma$ outputs ${\sf accept}$ or ${\sf reject}$ <br /><br /> $${\sf PoSpace.verify}(\sigma)\in \{{\sf reject},{\sf accept}\}\ .$$ <br /><br /> We assume perfect completeness <br /><br /> $$\begin{aligned}&&\forall N\in{\cal N},c\in\{0,1\}^w,  \ \Pr[{{\sf PoSpace.verify}}(\sigma)={\sf accept}]=1\textrm{ where }\\&&S\gets{\sf PoSpace.init}(N,pk) \textrm{ and } \sigma\gets{{\sf PoSpace.prove}}(S,c)\end{aligned}$$

### A.2.2 Security of PoSpace

We will not give the formal security definition for PoSpace here, but informally it states that an adversary who stores a file of size significantly less than $N$ bits should not be able to produce a valid proof for a random challenge unless he invests a significant amount of computation (ideally close to what it costs to run the full initialization ${\sf PoSpace.init}(N,pk)$). Moreover it must be impossible to amortize space, that is, initializing space for $m>1$ different identities must require $m$ times as much space.

To prevent grinding attacks, we need our PoSpace to be unique as defined below.

### A.2.3 Unique PoSpace

A PoSpace is unique if for any identity $pk$ and any challenge $c$ there is exactly one proof, i.e.,

$$
\begin{aligned}
&\forall N,pk,c,\\
&\left|\{\sigma\ :\ \left({{\sf PoSpace.verify}}(\sigma)={\sf accept}\right)\wedge \left( (\sigma.N,\sigma.pk,\sigma.c)=(N,pk,c)\right)\}\right|= 1
\end{aligned}
$$

We call a PoSpace _weakly_ unique if the _expected_ number of proofs is close to $1$, i.e.,

$$
\begin{aligned}
&\forall N,pk,c,\\
&{\mathrm E}_{c\gets \{0,1\}^w}\left[|\{\sigma : \left({{\sf PoSpace.verify}}(\sigma)={\sf accept}\}   \right)
\wedge  \left((\sigma.N,\sigma.pk,\sigma.c)=(N,pk,c)\right)
|\right]\\
&\approx 1
\end{aligned}
$$

For weakly unique PoSpace we assume that whenever there is more than one proof for a given challenge which passes verification, ${\sf PoSpace.prove}(S,c)$ outputs all of them.

The [<a href="/green-paper-references/#AAC17">AAC+17</a>] PoSpace used in $\textsf{Chia}$ is only _weakly unique_. To be able to focus on the main challenges, we will nonetheless assume a _unique_ PoSpace when analyzing $\textsf{Chia}$ but our analysis can be extended without major difficulties to handle weakly unique PoSpace, things just get a bit more messy.

### A.2.4 The [AAC+17] PoSpace

We give a very high level outline of the PoSpace from [<a href="/green-paper-references/#AAC17">AAC+17</a>]. The space parameter is given implicitly by a value $\ell\in\mathbb{Z}^+$, the actual space required is approximately $N\approx \ell\cdot 2\cdot 2^{\ell}$ bits (e.g. for $\ell=40$ that's $10$ terabytes). Let $L:=\{0,1\}^\ell$ denote the set of $\ell$ bit strings. Below we denote with $X_{|\ell}$ the $\ell$ bit prefix of a string $X$.

The identity $id:=pk$ together with a hash function ${\sf H}$ defines two functions $f: L\rightarrow L, g:L\times L\rightarrow L$ as

$$
f(x)={\sf H}(id,x)_{|\ell}\quad\textrm{and}\quad g(x,x')={\sf H}(id,x,x')_{|\ell} \ .
$$

Note that if we model ${\sf H}$ as a random function, then $f,g$ are also random functions. On a challenge $y\in L$ the prover must answer with a tuple

$$
id,(x,x')\qquad\textrm{ where }\qquad
x\neq x', f(x)=f(x'), g(x,x')=y
$$

if it exists. In this construction, for roughly a $(1-1/e)\approx 0.632$ fraction of the challenges $y\in L$ there will be at least one proof, and the expected number of proofs is $1$ (so it is a weakly unique PoSpace).

The prover will generate and store two tables so they can efficiently generate proofs. They first compute and store a table with the values $(x,f(x))$ sorted by the 2nd entry. With this table, the prover can now efficiently enumerate all tuples $(x,x')$ where $x\neq x'$ and $f(x)=f(x')$ to generate a table containing all triples $(x,x',y=g(x,x'))$; the expected number of such triples is $|L|=2^\ell$. This table is then sorted by the thrid value. Now given a challenge $y$ one can efficiently look up proofs in the second table as it is sorted by the $y$ values. Storing the second table requires $\approx 3|L|\log(|L|)=2^{\ell+1}\ell$ bits, and this can be brought down to $\approx 2|L|\log(|L|)$ bits by encoding it in a more clever way.

$\textsf{Chia}$ is based on this PoSpace, but to further minimize the effect of time/space trade-offs (where a malicious farmer tries to save on space at the cost of doing more computations), a nested version of this construction is used. We omit the details in this writeup.

## A.3 Verifiable Delay Functions

The definition of verifiable delay functions (VDFs) given below is not completely general, but makes some additional properties of VDF we'll need in $\textsf{Chia}$ explicit. In particular, we want a VDF where the sequential computation can start before we know the number of sequential steps for which it will run, while still being able to output proofs reasonably fast at any point during the sequential computation. This similar to the functionality provided by continuous VDFs [@Ephraim2020], which require that one can provide proofs for intermediate values almost immediately. We can allow some slack, and thus can use "normal" practical VDF constructions. We'll use the following notation to an (ongoing or finished) VDF computation $\tau$

$\tau.c \in \{0,1\}^* \colon$ the challenge (usually one or more unpredictable values) used for this VDF

$\tau.t \in \N \colon$ total number of sequential steps performed

For $i\ :\ 0\ \le i \le \tau.t$ we let $\tau[i]$ denote the state of the VDF after $i$ sequential steps, and

$\tau[i].x\in {\cal X}\colon$ denotes the value after $i$ steps.

$\tau[i].\pi \colon$ is a proof certifying that $\tau[i].x$ is correctly computed.

We'll denote the value and proof for the last value as

$$
\tau.y \stackrel{\scriptsize \sf def}{=}\tau[\tau.t].x\qquad \tau.\pi\stackrel{\scriptsize \sf def}{=}\tau[\tau.t].\pi
$$

The functions defining a VDF are

##### $\textsf{VDF.sample}$

> on input a challenge $c\in\{0,1\}^*$ samples the initial value $x$ and outputs a partial VDF value <br /><br />$$\tau.{\sf t}:=0\ ,\ \tau[0].{\sf x}:=x\ ,\ \tau.{\sf c}:=c$$

##### $\textsf{VDF.next}$

> ${\cal X}\rightarrow {\cal X}$ the function doing one step of the sequential computation

##### $\textsf{VDF.solve}$

> on input a challenge $c\in\{0,1\}^*$ and time parameter $t\in\mathbb{Z}^+$ outputs a proof <br /><br /> $$\tau=(\ \tau.y\ ,\ \tau.\pi\ ,\ \tau.x\ ,\ \tau.c=c\ ,\ \tau.t=t\ )\gets {\sf VDF.solve}(c,t)$$ <br /><br /> and runs in (not much more than) $t$ sequential steps (what a step is depends on the particular VDF). Here $\tau.y$ is the output and $\tau.\pi$ is a proof that $\tau.y$ has been correctly computed. For convenience we also keep $(c,t)$ as part of $\tau$.

##### $\textsf{VDF.verify}$

> on input $\tau$ outputs ${\sf accept}$ or ${\sf reject}$. <br /><br />$${\sf VDF.verify}(\tau)\in \{{\sf reject},{\sf accept}\}$$ <br /><br />Verifying must be possible in $\ll t$ steps, for existing VDFs verification just takes $\log(t)$ [<a href="/green-paper-references/#Pie19b">Pie19b</a>] or even constant [<a href="/green-paper-references/#Wes20">Wes20</a>] time.

We have perfect completeness

$$
\forall t,c\ :\ {{\sf VDF.verify}}({{\sf VDF.solve}}(c,t))={\sf accept}
$$

The two security properties we require are

**uniqueness:**
It is hard to come up with any statement and an accepting proof for a wrong output. More precisely, it is computationally difficult to find any $\tau'$ where for $\tau\gets {\sf VDF.solve}(\tau'.c,\tau'.t)$ we have

$$
{\sf VDF.verify}(\tau')={\sf accept}\quad\textrm{ and }\quad\tau.y\neq \tau'.y\ .
$$

Note that we only need $\tau.y$ (but not $\tau.\pi$) to be unique, i.e., the proof $\tau.\pi$ showing that $\tau.y$ is the correct value can be malleable. This seems sufficient for all applications of VDFs, but let us mention that in the [<a href="/green-paper-references/#Pie19b">Pie19b</a>; <a href="/green-paper-references/#Wes20">Wes20</a>] VDFs discussed below also $\tau.\pi$ is unique.

**sequentiality:**
Informally, sequentiality states that for any $t$, an adversary ${\cal A}$ who makes less than $t$ sequential steps will not find an accepting proof on a random challenge. I.e., for some tiny $\epsilon$

$$
\hspace{-1cm}
	\Pr[{\sf VDF.verify}(\tau)={\sf accept}\ \wedge \ \tau.c=c\ \wedge\ \tau.t=t \ :\ c\stackrel{rand}{\gets}\{0,1\}^w,\tau\gets{\cal A}(c,t)]\le \epsilon
$$

Let us stress that ${\cal A}$ is only bounded by the number of _sequential_ steps, but they can use high parallelism. Thus the VDF output cannot be computed faster by adding parallelism beyond what can be used to speed up a single step of the VDF computation.

### A.3.1 The [Pie19b, Wes20] VDFs

The VDFs proposed in [<a href="/green-paper-references/#Pie19b">Pie19b</a>; <a href="/green-paper-references/#Wes20">Wes20</a>] (see [<a href="/green-paper-references/#BBBF18">BBBF18</a>a] for an overview of those constructions) are both based on squaring in a group of unknown order, for concreteness let the group be $\mathbb{Z}_N^*$ where $N=pq$ is the product of two large primes $p,q$. On input ${\sf VDF.solve}(c,t)$ one would first map the challenge $c$ on a group element, say as $x_c:= hash(c)\bmod N$, and the output is $(y,\pi)$ with $y=x_c^{2^t}\bmod N$. This $y$ can be computed by squaring $x_c$ sequentially $t$ times $x_c\rightarrow x_c^2\rightarrow x_c^{2^2}\rightarrow \cdots \rightarrow x_c^{2^t}$, and it is conjectured that there is no shortcut to this computation if one doesn't know the factorization of $N$.

The VDFs from [<a href="/green-paper-references/#Pie19b">Pie19b</a>; <a href="/green-paper-references/#Wes20">Wes20</a>] differ in how the proof $\pi$ that certifies that $y=x_c^{2^t}\bmod N$ is defined. The proof in [<a href="/green-paper-references/#Pie19b">Pie19b</a>] is shorter ($1$ vs. $\log(T)$ elements), but soundness of the proof requires an additional assumption (that taking random roots is hard).

If one uses an RSA group as above, a trusted setup or a multiparty computation is needed to sample the modulus $N$ in a way that nobody learns its factorization. As this sampling is expensive, one would then think of $N$ as a public parameter to be used indefinitely.

Wesolowski [<a href="/green-paper-references/#Wes20">Wes20</a>] suggests using the class group of an imaginary quadratic field as the underlying group of unknown order. These groups can be obliviously sampled -- this means given random bits one can sample a group without learning its order -- and thus there is no need for a trusted setup. On the other hand, it's somewhat tricky to obliviously sample random group elements in class groups (here obliviously means in a way that does not reveal the discrete log of the element). Thus in the class group setting we can let ${\sf VDF}(c,t)$ sample a fresh group using the challenge $c$, and then exponentiate a fixed easy to find group element (concretely the element (a=2, b=1)). This is the approach taken in $\textsf{Chia}$.

[^1]: The first constructions of PoSpace from [<a href="/green-paper-references/#DFKP15">DFKP15</a>] were based on depth-robust graphs. The initialization phase in these PoSpace was not just a function as it is here, but an interactive protocol. The definition we give here captures the [<a href="/green-paper-references/#AAC17">AAC+17</a>] PoSpace (which was developed for $\textsf{Chia}$) where the initialization phase is non-interactive, this makes its use in a blockchain design much simpler. The Spacemint [<a href="/green-paper-references/#PKF18">PKF+18</a>] proposal is using graph-based PoSpace and because of that must bootstrap the blockchain itself to make initialization non-interactive: farmers must post a commitment to their space to the blockchain via a special type of transaction before it can be used for farming. Without this, Spacemint would succumb to grinding attacks (on the message send to the verifier during the initialization phase).
