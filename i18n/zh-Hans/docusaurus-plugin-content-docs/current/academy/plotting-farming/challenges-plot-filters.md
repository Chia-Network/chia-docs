---
title: 挑战和图块初筛
slug: /challenges-plot-filters
---

在本课中，我们将讨论图块初筛的工作原理，以及使用它的好处。

## 学习目标

- **图块初筛**：了解图块初筛的基本工作原理及其使用的好处。
- **挑战生成**：了解时间领主（Timelord）如何生成挑战并将其发送给农民。

---

## 内容

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/7L17dRNI6Kc" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## 脚本

<details>

<summary> Expand for the full script </summary>

0:00\
时间领主大约每9秒生成一个新挑战。 然后将其与每个图块的ID进行哈希处理。

0:20\
如果哈希值以9个零开头，该图块被认为有资格进行收割。 这称为图块初筛。 图块初筛作为去中心化的力量，进一步随机化赢得区块的农民，并减少每个挑战所需的总计算量。

0:40\
当农民收到挑战时，收割者首先确定哪些图块是有效的并通过图块初筛，然后生成潜在的空间证明并提交给时间领主进行验证和审查。

1:00\
时间领主将选择最符合挑战的空间证明，并使用挑战和提供的空间证明作为输入，运行一个VDF来证明时间已经过去，并生成下一个挑战。

</details>

---

## 常见问题

- **有效证明会被过滤掉吗？**：一个有效的空间证明很可能会包含在被过滤掉的图块中。 然而，这对每个农民的影响是平等的，并且进一步去中心化的好处是非常值得的。

---

## 知识检测

:::tip 问题1 - 挑战频率

时间领主大约每隔多久生成一个新的挑战？

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

大约每9秒钟

</details>

:::tip 问题2 - 初筛的好处

使用图块初筛的两个重要好处是什么？

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

1. 进一步去中心化了网络。
2. 它减少了所需的计算量，提高了网络的效率。

</details>

---

## 附加资源

### 链接

- 更多的[耕种基础知识](https://docs.chia.net/farming-basics)：绘图、矿池和奖励的概述。
- 详细的[架构概述](https://docs.chia.net/architecture-overview)：描述农民、收割机、钱包等之间的交互。
- Chialisp[详细文档](https://chialisp.com/)：提供有关Chialisp各个方面的详细信息。
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

---
