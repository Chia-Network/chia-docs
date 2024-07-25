---
title: 耕种概览
slug: /farming-overview
---

在本课程中，我们将介绍绘图过程，以及当农名赢得挑战时会发生什么。

## 学习目标

- **协议**：了解Chia耕种协议的基础知识。
- **谜题（Puzzles）和解决方案（Solutions）**：了解谜题和解决方案在Chialisp中的使用。

---

## 内容

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/vyn0nIO56WU" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## 脚本

<details>

<summary> Expand for the full script </summary>

0:00\
农民（Farmers）是寻求赢得空间证明挑战以换取奖励的节点。 赢得挑战的农民会构建并处理一个交易区块，并将其添加到区块链中。

0:20\
首先，农民预先生成哈希值到称为图块（Plots）的大块（large blocks）中。 这些图块的大小由一个常数k决定，k32是所需的最小尺寸，相当于每个图块约108GB。

0:40\
这个绘图过程计算密集，类似于传统区块链的“挖矿”，但这个过程只需要进行一次，大大减少了整体能耗。 一旦图块创建完成，它们会被农民被动监控，以确定它们是否包含当前网络挑战的有效空间证明。

1:00\
如果农民赢得了挑战，他们将开始从内存池中填充交易到区块中。 耕种客户端将控制哪些交易可以包含到区块中，通常会根据最高的耕种手续费用来做选择，从而增加总奖励。

1:20\
然后处理该区块，意味着所有交易和智能币中的程序都会被执行和解决。 区块随后由农民签名并提交到链上。

</details>

---

## 常见问题

- **持续收获**：图块不需要一直创建。 农民可以一次性创建许多图块，并在未来持续从这些图块中收获。 即使在找到空间证明之后，这些图块仍然有效并且可以使用。
- **选择交易**：交易暂时存储在“内存池”中，获胜的农夫会从其中检索交易来创建区块。 可以通过优先选择包含耕种手续费的交易来最大化农民获得的奖励。 这意味着如果一笔交易没有包含手续费，即使它在其他包含手续费的交易之前创建，也有可能不会被包含在区块中。

---

## 知识检测

:::tip 问题1 - k值

Chia区块链要求的最小k值是多少？

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

k32

</details>

:::tip 问题2 - 图块文件大小

使用最小k值k32时，图块文件有多大？

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

大约108GB

</details>

:::tip 问题3 - 绘图频率

农民应该多长时间重新绘图一次？

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

理想情况下，农民不需要重新绘图。 农民可能在某些情况下会想要重新绘图(如改变k值或压缩率，从基于矿池的耕种改为独立耕种等)，但图块应长期保持有效和有用。

</details>

:::tip 问题4 - 处理智能币。

真还是假；当一个区块被创建时，时间领主会处理和评估所有包含的智能币。

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

错误 农民处理区块中包含的智能币。 时间领主将区块注入到链的其余部分。

</details>

---

## 附加资源

### 链接

- 更多的[耕种基础知识](https://docs.chia.net/farming-basics)：绘图、矿池和奖励的概述。
- 详细的[架构概述](https://docs.chia.net/architecture-overview)：描述农民、收割机、钱包等之间的交互。
- Chialisp[详细文档](https://chialisp.com/)：提供有关Chialisp各个方面的详细信息。
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

---
