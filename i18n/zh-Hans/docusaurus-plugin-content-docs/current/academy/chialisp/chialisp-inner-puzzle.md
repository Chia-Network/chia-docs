---
title: Inner Puzzles
slug: /chialisp-inner-puzzle
---

import Runnable from '@site/src/components/Runnable.tsx';

在这节课上，我们将讨论为什么您可能希望嵌套谜题以及如何设置它们。

## 学习目标

- **函数（Functions）**：学习如何在 Chialisp 中定义和执行函数。
- **嵌套谜题（Nesting Puzzles）**：了解在 Chialisp 中使用嵌套谜题的用途。

---

## 内容

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/GAw1yMmkO3g" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## 脚本

<details>

<summary> Expand for the full script </summary>

00:00\
所有的谜题都会产生一个条件输出，告诉区块链在其中包装的硬币该做什么。 内部谜题可以看作是硬币中的硬币，结果是一个传递给外部谜题并由其执行的条件。

00:20\
这种功能的一个特定用途是，如果你想使用一个通用的内部谜题，并将其包装在一个验证签名的外部谜题中。 外部谜题可以看作是一种模板，你可以将任何通用的内部谜题传递进去，它将由外部谜题保护。 让我们创建这个外部谜题模板。

00:40\
我们要定义一个模块，对于我们的参数，我们将有一个稍后传入的 `PUBLIC_KEY`，一个我们也将传入的 `INNER_PUZZLE`，然后是 `inner_solution`。 我们还将包含 `condition_codes.clib` 和 `sha256tree.clib` 库文件。 然后，我们将定义一个新的函数。

01:00\
我们将其命名为 `calculate_output`，在参数中我们将有我们的 `PUBLIC_KEY`，`inner_solution`，以及我们将执行的 `conditions`。 在一个组合语句中，我们将使用之前视频中使用的标准签名验证。 (`(defun calculate_output (PUBLIC_KEY inner_solution conditions) (c (list AGG_SIG_MET PUBLIC_KEY (sha256tree inner_solution)) conditions))`)

01:20\
对于我们要验证的消息，我们将验证 `inner_solution`，然后返回 `conditions`。 现在我们已经定义了我们的新函数，我们将使用 `calculate_output` 调用它，提供 `PUBLIC_KEY` 和 `inner_solution`，然后我们将对我们的 `INNER_PUZZLE` 使用 `apply` 运算符或 `a`，提供 `inner_solution`。 (`calculate_output PUBLIC_KEY inner_solution (a INNER_PUZZLE inner_solution)`)

01:40\
`apply` 运算符是执行一些代码的方式。 因此，`INNER_PUZZLE` 将使用 `inner_solution` 执行。 因此，这个谜题将首先使用 `(a INNER_PUZZLE inner_solution))` 方法评估内部谜题，并将其结果用作我们的 `calculate_output` 函数的条件。

02:00\
这个函数需要 `inner_solution` 的签名才能通过。 现在让我们编写内部谜题。 对于这个谜题，我们将使用一个称为 `ASSERT_HEIGHT_RELATIVE` 的条件，它指定了基于自硬币创建以来经过的块数的硬币何时可以被花费。 我们将定义一个模块，在我们的参数中，我们将传入 `REQUIRED_BLOCKS`。 这是一个必须经过的块数，硬币才能被花费。

02:20\
然后，我们将有我们的 `conditions`。 我们再次包含 `condition_codes.clib` 库文件，然后我们将定义一个语句，该语句使用我们传入的 `REQUIRED_BLOCKS` 上的 `ASSERT_HEIGHT_RELATIVE` 条件，然后我们将返回 `conditions`。

02:40\
好了，现在我们有了内部谜题和外部谜题。 让我们传入所需的值。 首先，我们使用 `chia keys show` 获取我们的公钥，然后我们将块值传入内部谜题，使用 `cdv clsp curry inner-puzzle.clsp -a` 并指定我们想要经过的块数。

03:00\
在这种情况下，我们将使用 `20`。 现在我们可以将此结果与我们的公钥一起传入外部谜题，使用 `cdv clsp curry outer-puzzle.clsp -a`，输入我们的公钥，`-a`，然后在引号中粘贴编译后的内部谜题。

03:20\
现在我们有了最终的编译谜题，我们可以继续创建一个硬币，使用我们在上一个视频中介绍的流程。 一旦硬币被创建，我们就可以为这个硬币创建解决方案。 首先我们获取我们的钱包地址并进行 `decode`。 我们将在我们想要的解决方案中使用这个地址。 同样，我们将使用代码 `51` 表示的 `CREATE_COIN` 条件。

03:40\
注意，我将解决方案嵌套在了4组括号中。 这是因为外部谜题参数列表被包裹在括号中，内部解决方案也是如此。 在内部谜题中，我们有另一组括号用于条件列表，并且每个条件也被包裹在其中。

04:00\
了解谜题的结构非常重要，以确保您提供的解决方案结构正确。 现在我们将编码的解决方案添加到我们的花费包中，其中已经包含了来自硬币创建的硬币信息和谜题展示。 接下来，我们将使用我们在上一个视频中概述的方法获取我们的签名。 我们将解决方案进行哈希处理，然后将其与硬币 ID 和起源挑战进行连接。

04:20\
现在我们可以使用 `chia keys sign` 对结果消息进行签名，并将签名复制到我们的花费包中，确保附加 `0x` 以表示它是一个值。 现在运行 `cdv rpc pushtx spendbundle.json`。

04:40\
如果块数尚未经过，它将显示为挂起状态。 如果成功，我们可以再次查找硬币记录，并查看已花费的块索引比确认的块索引晚了 20 个块。 在这个视频中，我们学习了内部谜题的工作原理以及它们与外部谜题的交互。 非常感谢观看，下次再见。

</details>

---

## 常见问题

- **更多的括号**：重要的是要注意你的解决方案将在谜题中的哪里使用，并用适当数量的括号将它们包裹起来。 这可能有些反直觉，因为乍一看，括号似乎是不必要的。

---

## 知识检测

:::tip 问题1 - 评估内部谜题

什么运算符用于评估另一个谜题中的谜题？

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

`apply`运算符。 (`a`)

```chialisp
(a INNER_PUZZLE inner_solution)
```

</details>

:::tip 问题2 - 一个新条件

`ASSERT_HEIGHT_RELATIVE` 条件检查什么？

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

`ASSERT_HEIGHT_RELATIVE` 检查自货币创建以来经过了多少个区块。 它允许在预定义数量的区块经过后解决谜题。

</details>

---

## 附加资源

### 可运行的Chialisp和clvm插件

有关使用这些插件的信息，请参阅[学院概述](/academy-overview#runnable-chialisp-and-clvm-plugins)。

#### Chialisp 插件

<Runnable flavor='chialisp' input='(10 99)'>

```chialisp
(mod (arg1 arg2)
    (if (> (+ arg1 arg2) 100) "large" "small")
)
```

</Runnable>

#### Clvm插件

<Runnable flavor='clvm' input='(1)'>

```chialisp
(a (i 2 (q 1 . "true") (q 1 . "false")) 1)
```

</Runnable>

### 链接

- [Chialisp基本概念](https://docs.chia.net/guides/chialisp-concepts)：包括柯里化（currying）、内部谜题（inner puzzles）和条件变换（morphing conditions）的概述。
- 指导性的[Chialisp演练](https://docs.chia.net/guides/)：安装、创建智能币和使用BLS签名的指南。
- Chialisp[详细文档](https://chialisp.com/)：提供有关Chialisp各个方面的详细信息。
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

---
