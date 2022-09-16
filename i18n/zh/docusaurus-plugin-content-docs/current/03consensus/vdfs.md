---
sidebar_position: 3
---

# 3.3 VDFs

可验证延迟函数，也称为时间证明或 VDF，是顺序函数执行了特定次数的证明。

**可验证**：这意味着在执行计算（这需要时间）之后，证明者可以在很短的时间内创建一个非常小的证明，并且验证者可以验证这个证明而无需重新进行整个计算。

**延迟性**：这意味着证明者实际上花费了大量时间（尽管我们不知道确切时间）来计算函数。

**函数**：这意味着它是确定性的：在输入 x 上计算 VDF 总是产生相同的结果 y。

这里的关键词是“顺序”，就像对一个数字进行多次散列：hash(hash(hash(a))) 等。 这意味着证明者不能只是添加更多机器来使函数执行得更快。 因此，我们可以假设计算 VDF 需要真实（挂钟）时间。 我们使用的构造是重复平方。 证明者必须将挑战平方 x T 次。 这需要时间 ϴ(T)。 证明者还必须创建一个证明，证明这是正确执行的。

<figure>
<img src="/img/vdf.png" alt="drawing"/>
![](/img/vdf.png)

<img src="/img/vdf.png" alt="drawing"/>
<figcaption>
图 3：验证者（区块链）向证明者（时间领主）发送挑战，证明者计算输出和证明。
</figcaption>
</figure>

Although the following details are not very important for understanding the consensus algorithm, the choice of what VDF to use is relevant, because if an attacker succeeds in obtaining a much faster machine, some [attacks](/docs/03consensus/attacks_and_countermeasures "Section 3.14: Attacks and Countermeasures") become possible.

Chia 使用的 VDF 在[未知顺序的类组](https://github.com/Chia-Network/vdf-competition/blob/main/classgroups.pdf "Binary quadratic forms white paper, by Lipa Long")中重复平方。 生成具有未知顺序的大组有两种主要方法：

1. 使用 RSA 模数，并使用整数 mod N 作为一个组。 如果您可以使用 MPC 仪式与许多参与方生成模数，则该组的顺序是未知的。
2. 一种更简单的方法是使用具有大素数判别式的类群，它们是未知阶的群。 这不需要任何复杂或可信的设置，所以我们为奇亚选择了这个选项。

要创建这些组之一，只需要一个大的随机质数。 缺点是类组代码在现实生活中的测试较少，并且优化不如 RSA 组中广为人知。 我们使用相同的初始元素进行平方（a=2，b=1 类组元素），而是使用挑战为每个 VDF 生成一个新的随机素数，用作判别式。 判别式的大小为 1024 位，这意味着证明大小约为 1024 位。 我们使用[韦索洛夫斯基（Wesolowski）方案](https://eprint.iacr.org/2018/623) 分成 n (1<=n<=64) 个阶段，因此创建证明的速度非常快。 由于 n-韦索洛夫斯基证明可能很大，我们在 1-韦索洛夫斯基证明可用时立即将其替换。 这些较小，但需要更多时间来制作。 证明本身并不致力于链上，因此它们是可替换的。

### 融合

As a recap, VDFs take in an input, called the challenge, and produce an output together with a proof that certifies that the function was evaluated correctly.

在这种情况下，*值*可以被视为具有空间证明的块。 该值与 VDF 的输出相结合，生成一个新值，用作下一个 VDF 的输入/挑战。 这称为将值*融入*到 VDF。

因此，我们将 VDF 链接起来，但致力于实现介于两者之间的新价值。 使用它是为了让我们有一个线性的块级数，交替空间证明和时间证明。
