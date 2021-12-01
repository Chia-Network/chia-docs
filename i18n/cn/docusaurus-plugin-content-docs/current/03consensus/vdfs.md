---
sidebar_position: 3
---

# 3.3 VDFs

> VDFs

可验证延迟函数，也称为时间证明或 VDF，是顺序函数执行了特定次数的证明。

**可验证**：这意味着在执行计算（这需要时间）之后，证明者可以在很短的时间内创建一个非常小的证明，并且验证者可以验证这个证明而无需重新进行整个计算。

**Delay**：这意味着证明者实际上花费了大量时间（尽管我们不知道确切时间）来计算函数。

**函数**：这意味着它是确定性的：在输入 x 上计算 VDF 总是产生相同的结果 y。

这里的关键词是“顺序”，就像对一个数字进行多次散列：hash(hash(hash(a))) 等。这意味着证明者不能仅仅购买更多机器来加快速度，这与比特币/工作量证明不同。因此，我们可以假设计算 VDF 需要真实（挂钟）时间。我们使用的构造是重复平方。证明者必须将挑战平方 x T 次。这需要时间 ϴ(T)。证明者还必须创建一个证明，证明这是正确执行的。

![](/img/vdf.png)

图 3：验证者（区块链）向证明者（时间领主）发送挑战，证明者计算输出和证明。

虽然下面的细节对于理解共识算法不是很重要，但选择使用什么 VDF 是相关的，因为如果攻击者成功获得了更快的机器，一些攻击是可能的。

Chia 使用的 VDF 在未知顺序的类组中重复平方。生成具有未知顺序的大组有两种主要方法。第一种是使用 RSA 模数，并使用整数 mod N 作为一个组。如果您可以使用 MPC 仪式与许多参与方生成模数，则该组的顺序是未知的。一种更简单的方法是使用具有大素数判别式的类群，它们是未知阶的群。这不需要任何复杂或可信的设置，所以我们为 Chia 选择了这个选项。要创建这些组之一，只需要一个大的随机素数。缺点是类组代码在现实生活中的测试较少，并且优化不如 RSA 组中广为人知。我们使用相同的初始元素进行平方（a=2, b=1 类组元素），而是使用挑战为每个 VDF 生成一个新的随机素数，用作判别式。判别式的大小为 1024 位，这意味着证明大小约为 1024 位。我们使用 Wesolowski 方案分成 n (1<=n<=64) 个阶段，因此创建证明的速度非常快。由于 n-wesolowski 证明可能很大，我们在它们可用时立即用 1-wesolowski 证明替换它们，因为它们更小，但需要更多时间来制作。证明本身并不承诺在链上，因此它们是可替换的。由于 n-wesolowski 证明可能很大，我们在它们可用时立即用 1-wesolowski 证明替换它们，因为它们更小，但需要更多时间来制作。证明本身并不承诺在链上，因此它们是可替换的。由于 n-wesolowski 证明可能很大，我们在它们可用时立即用 1-wesolowski 证明替换它们，因为它们更小，但需要更多时间来制作。证明本身并不承诺在链上，因此它们是可替换的。

<details>
<summary>原文参考</summary>

A Verifiable Delay Function, also referred to as a proof of time or VDF, is a proof that a sequential function was executed a certain number of times. 

**Verifiable**: this means that after performing the computation (which takes time), the prover can create a very small proof in a very short time, and the verifier can verify this proof without having to redo the whole computation.

**Delay**: this means that the prover actually spent a real amount of time (although we don’t know exactly how much) to compute the function.

**Function**: this means it’s deterministic: computing a VDF on an input x always yields the same result y.

The key word here is “sequential”, like hashing a number many times: hash(hash(hash(a))), etc. This means the prover cannot just buy more machines to go faster, unlike Bitcoin/proof of work. Therefore we can assume that computing a VDF requires real (wall-clock) time. The construction that we use is repeated squaring. The prover must square a challenge x T times. This requires time ϴ(T). The prover also must create a proof that this was performed properly.

![](/img/vdf.png)

Figure 3: Verifier (blockchain) sends a challenge to a prover (timelord) and prover computes output and proof. 

Although the following details are not very important for understanding the consensus algorithm, the choice of what VDF to use is relevant, because if an attacker succeeds in obtaining a much faster machine, some attacks are possible.

The VDF used by Chia is repeated squaring in a class group of unknown order. There are two main ways to generate a large group that has an unknown order. The first is to use an RSA modulus, and use the integers mod N as a group. The order of the group is unknown if you can generate your modulus with many participating parties using an MPC ceremony. An easier approach is to use classgroups with a large prime discriminant, which are groups of unknown order. This does not require any complex or trusted setup, so we chose this option for Chia. To create one of these groups, one just needs a large random prime number. The drawback is that classgroup code is less tested in real life, and optimizations are less well known than in RSA groups. We use the same initial element for the squaring (a=2, b=1 classgroup element), and instead use the challenge to generate a new random prime number for each VDF, which is used as the discriminant. The discriminant has a size of 1024 bits, which means the proof sizes are around 1024 bits. We use the Wesolowski scheme split into n (1<=n<=64) phases so that creating the proofs is very fast. Since the n-wesolowski proofs can be large, we replace them with 1-wesolowski proofs as soon as they are available, since these are smaller, but require more time to make. The proofs themselves are not committed to on chain, so they are replaceable.

</details>


### 输液

回顾一下，VDF 接受称为挑战的输入，并产生输出以及证明函数被正确评估的证明。

将值注入 VDF 意味着该值与 VDF 的输出相结合，以生成一个新值，用作下一个 VDF 的输入/挑战。因此，我们将 VDF 链接起来，但在两者之间承诺一个新值（块）。使用它是为了让我们有一个线性的块级数，交替空间证明和时间证明。

<details>
<summary>原文参考</summary>

- ### Infusion

As a recap, VDFs take in an input, called the challenge, and produce an output together with a proof that certifies that the function was evaluated correctly. 

Infusion of a value into a VDF means that that value is combined with an output of a VDF, to generate a new value, which is used as the input/challenge for the next VDF. Therefore, we are chaining VDFs but committing to a new value (block) in between. This is used so that we have a linear progression of blocks, alternating proofs of space with proofs of time. 

</details>

