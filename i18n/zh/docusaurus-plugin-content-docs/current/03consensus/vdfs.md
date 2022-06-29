---
sidebar_position: 3
---

# 3.3 VDFs

> VDFs

可验证延迟函数，也称为时间证明或 VDF，是顺序函数执行了特定次数的证明。

**可验证**：这意味着在执行计算（这需要时间）之后，证明者可以在很短的时间内创建一个非常小的证明，并且验证者可以验证这个证明而无需重新进行整个计算。

**延迟性**：这意味着证明者实际上花费了大量时间（尽管我们不知道确切时间）来计算函数。

**函数**：这意味着它是确定性的：在输入 x 上计算 VDF 总是产生相同的结果 y。

这里的关键词是“顺序”，就像对一个数字进行多次散列：hash(hash(hash(a))) 等。这意味着证明者不能只是添加更多机器来使函数执行得更快。 因此，我们可以假设计算 VDF 需要真实（挂钟）时间。 我们使用的构造是重复平方。 证明者必须将挑战平方 x T 次。 这需要时间 ϴ(T)。 证明者还必须创建一个证明，证明这是正确执行的。

<figure>

![](/img/vdf.png)

<img src="/img/vdf.png" alt="drawing"/>
<figcaption>
图 3：验证者（区块链）向证明者（时间领主）发送挑战，证明者计算输出和证明。
</figcaption>
</figure>

虽然以下细节对于理解共识算法不是很重要，但选择使用什么 VDF 是相关的，因为如果攻击者成功获得了更快的机器，一些[攻击](/docs/03consensus/attacks_and_countermeasures 'Section 3.14: Attacks and Countermeasures')成为可能。

Chia 使用的 VDF 在[未知顺序的类组](https://github.com/Chia-Network/vdf-competition/blob/main/classgroups.pdf 'Binary quadratic forms white paper, by Lipa Long')中重复平方。生成具有未知顺序的大组有两种主要方法：

1. 使用 RSA 模数，并使用整数 mod N 作为一个组。如果您可以使用 MPC 仪式与许多参与方生成模数，则该组的顺序是未知的。
2. 一种更简单的方法是使用具有大素数判别式的类群，它们是未知阶的群。这不需要任何复杂或可信的设置，所以我们为奇亚选择了这个选项。

要创建这些组之一，只需要一个大的随机质数。缺点是类组代码在现实生活中的测试较少，并且优化不如 RSA 组中广为人知。我们使用相同的初始元素进行平方（a=2，b=1 类组元素），而是使用挑战为每个 VDF 生成一个新的随机素数，用作判别式。判别式的大小为 1024 位，这意味着证明大小约为 1024 位。我们使用[韦索洛夫斯基（Wesolowski）方案](https://eprint.iacr.org/2018/623) 分成 n (1<=n<=64) 个阶段，因此创建证明的速度非常快。由于 n-韦索洛夫斯基证明可能很大，我们在 1-韦索洛夫斯基证明可用时立即将其替换。这些较小，但需要更多时间来制作。证明本身并不致力于链上，因此它们是可替换的。

<details>
<summary>原文参考</summary>

A Verifiable Delay Function, also referred to as a proof of time or VDF, is a proof that a sequential function was executed a certain number of times.

**Verifiable**: this means that after performing the computation (which takes time), the prover can create a very small proof in a very short time, and the verifier can verify this proof without having to redo the whole computation.

**Delay**: this means that the prover actually spent a real amount of time (although we don’t know exactly how much) to compute the function.

**Function**: this means it’s deterministic: computing a VDF on an input x always yields the same result y.

The key word here is “sequential”, like hashing a number many times: hash(hash(hash(a))), etc. This means the prover cannot just add more machines tomake the function execute faster. Therefore we can assume that computing a VDF requires real (wall-clock) time. The construction that we use is repeated squaring. The prover must square a challenge x T times. This requires time ϴ(T). The prover also must create a proof that this was performed properly.

<figure>

![](/img/vdf.png)

<img src="/img/vdf.png" alt="drawing"/>
<figcaption>
Figure 3: The Verifier (blockchain) sends a challenge to a Prover (timelord) and Prover computes the output and proof. 
</figcaption>
</figure>

Although the following details are not very important for understanding the consensus algorithm, the choice of what VDF to use is relevant, because if an attacker succeeds in obtaining a much faster machine, some [attacks](/docs/03consensus/attacks_and_countermeasures 'Section 3.14: Attacks and Countermeasures') become possible.

The VDF used by Chia is repeated squaring in a [class group of unknown order](https://github.com/Chia-Network/vdf-competition/blob/main/classgroups.pdf 'Binary quadratic forms white paper, by Lipa Long'). There are two main ways to generate a large group that has an unknown order:

1. Use an RSA modulus, and use the integers mod N as a group. The order of the group is unknown if you can generate your modulus with many participating parties using an MPC ceremony.
2. An easier approach is to use classgroups with a large prime discriminant, which are groups of unknown order. This does not require any complex or trusted setup, so we chose this option for Chia.

To create one of these groups, one just needs a large, random, prime number. The drawbacks are that classgroup code is less tested in real life, and optimizations are less well-known than in RSA groups. We use the same initial element for the squaring (a=2, b=1 classgroup element), and instead use the challenge to generate a new random prime number for each VDF, which is used as the discriminant. The discriminant has a size of 1024 bits, which means the proof sizes are around 1024 bits. We use the [Wesolowski scheme](https://eprint.iacr.org/2018/623) split into n (1<=n<=64) phases so that creating the proofs is very fast. Since the n-wesolowski proofs can be large, we replace them with 1-wesolowski proofs as soon as they are available. These are smaller, but require more time to make. The proofs themselves are not committed to on-chain, so they are replaceable.

</details>

### 融合

回顾一下，VDF 接受称为挑战的输入，并产生输出以及证明函数被正确评估的证明。

在这种情况下，*值*可以被视为具有空间证明的块。该值与 VDF 的输出相结合，生成一个新值，用作下一个 VDF 的输入/挑战。 这称为将值*融入*到 VDF。

因此，我们将 VDF 链接起来，但致力于实现介于两者之间的新价值。 使用它是为了让我们有一个线性的块级数，交替空间证明和时间证明。

<details>
<summary>原文参考</summary>

- ### Infusion

As a recap, VDFs take in an input, called the challenge, and produce an output together with a proof that certifies that the function was evaluated correctly.

A _value_, in this context, can be thought of as a block with a proof of space. The value is combined with an output of a VDF, to generate a new value, which is used as the input/challenge for the next VDF. This is known as an _infusion_ of a value into a VDF.

Therefore, we are chaining VDFs, but committing to a new value in between. This is used so that we have a linear progression of blocks, alternating proofs of space with proofs of time.

</details>
