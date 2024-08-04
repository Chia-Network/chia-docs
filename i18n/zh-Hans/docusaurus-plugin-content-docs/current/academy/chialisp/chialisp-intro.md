---
title: Intro to Chialisp
slug: /chialisp-intro
---

import Runnable from '@site/src/components/Runnable.tsx';

在本课程中，我们将回顾 Chialisp 的基础知识，包括语法& 结构、不等式和 if 语句，以及设置开发环境。

## 学习目标

- **语法和结构**：理解基本的 Chialisp 语法和结构。
- **谜题和解决方案**：了解在 Chialisp 中使用谜题和解决方案。
- **开发环境**：安装和配置 Chialisp 开发环境。

---

## 内容

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/W9QK4PFIIpA" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## 脚本

<details>

<summary> 展开查看完整脚本 </summary>

00:00  
我们将简要介绍 Chialisp 的基础知识，包括：Chialisp 程序的基本语法和结构、谜题和解决方案，以及设置开发环境来测试这些内容。

00:20  
So let's get started, the first thing you'll want to do is make sure you have the correct version of python. If you type in python3-version make sure you have python 3.10. Next we're going to want to create a virtual environment so if you run the command python3 -m venv venv. 如果你输入 `python3 --version`，确保你安装的是 Python 3.10。 接下来，我们要创建一个虚拟环境，你可以运行命令 `python3 -m venv venv`。

00:40  
这将创建一个虚拟环境，我们可以激活它进行开发。要激活它，我们将输入以下命令：`bin\activate`，现在你可以看到我们已经进入了虚拟环境。

01:00  
接下来，我们需要安装 Chia 开发工具，你可以通过运行 `pip install Chia Dev tools` 来完成。 现在，让我们确保我们安装了正确版本，输入 `cdv --version`，你会看到我们的版本是 1.1.4。

01:20  
现在我们已经设置好了开发环境，让我们来学习一些关键的 Lisp 基础知识。 这是基本的运行命令，它接受一个带有运算符后跟两个操作数的列表（list）。

01:40  
在这个例子中，我们有两个操作数，分别是2和3，它们将被相加，所以我们应该得到5。 但这并不是很有用，所以让我们创建一个程序，可以传入一些参数，并为我们执行加法。 在这个例子中，我们定义了一个模块，接收两个参数 arg1 和 arg2，然后对这两个参数进行操作，所以当我们运行它时，我们将得到刚刚编写的程序的编译版本。

02:00  
这被称为谜题（puzzle），参数将作为解决方案（solution）传递到谜题中。 那么我们如何运行这段代码呢？ 我们的第二个命令是 `brun`，所以如果我们通过 `brun` 命令传递这个编译后的谜题，并给它一个解决方案，比如 7 和 10。

02:20  
它将使用该解决方案作为程序的参数，所以我们应该得到 17。 现在让我们谈谈不等式和 if 语句。 在这个程序中，我比较了两个数字 10 和 5，并检查第一个是否大于第二个。 因此在这种情况下，结果将为真，我们会收到一个 1。

02:40  
在相反的情况下，结果将为假，并且我们会收到一个空集（empty set），so if statements are going to take this structure if followed by our comparison then the result if it's true followed by the result if it's false. 所以让我们运行这个程序，如果是1意味着结果为真，则返回true，否则返回false。

03:00  
所以我们期望的结果是真（true）。 那么让我们使用比较和 if 语句创建一个谜题。 我们将输入 `run` 并定义一个接受两个参数 `arg1` 和 `arg2` 的模块（module ）。 我们将定义一个 if 语句，我们想知道如果我们将这两个参数加在一起，它们是否大于 100。

03:20  
所以如果大于参数 1 和参数 2 的加法结果大于 100，那么如果为真，我们将返回 "large"，如果为假，我们将返回 "small"。

03:40  
我们将关闭这个，正如你所看到的，很容易在括号中迷失方向，所以在未来的视频中，我们将使用文本编辑器，这将使得操作变得更加简单，但如果我们运行这个，我们将收到我们程序的编译版本，然后将这个谜题与我们的解决方案一起传递给 `brun`。

04:00  
我们将添加 70 和 100，这肯定会超过 100，所以我们应该收到结果 "large"，就是这样。 这就是 Chialisp 的基础知识；我们讨论了基本运算符、不等式、if 语句、将程序编译成谜题（puzzles），并传递解决方案（solution）。

04:20  
在未来的视频中，我们将讨论智能币、签名和内部谜题。 感谢您的参与，我们下个视频见！

</details>

---

## 常见问题

- **run vs brun:** `run` 用于序列化并运行 Chialisp 谜题，而 `brun` 用于运行 clvm 序列化的谜题，通常用于传递参数。
- **括号（Parentheses）：**Chialisp 是完全括号前缀表示法编程语言家族的一部分，可以[追溯](https://en.wikipedia.org/wiki/Lisp_(programming_language))到上世纪 50 年代的 LISP 1。 这些语言的一个显而易见的特点是它们使用括号来表示列表（lists）。 建议在编写这些语言时使用具有适当语法高亮功能的集成开发环境，以确保所有括号都处于正确的位置。 为了帮助解决这个问题，这里有一个适用于 Visual Studio 的 [Chialisp 语言服务器扩展](https://marketplace.visualstudio.com/items?itemName=ChiaNetwork.chialisp)。
- **前缀表示法：**Chialisp 作为 LISP 家族的一部分，使用前缀表示法。 这意味着函数或运算符首先出现，其参数紧随其后。

---

## 知识检测

:::tip 问题 1 - 减法

请给出一个用于计算两个参数相减的Chialisp 谜题？

:::

<details>

<summary> 答案(当准备好查看答案时展开)  </summary>

```chialisp
(mod (arg1 arg2)
    (- arg1 arg2)
)
```

</details>

:::tip 问题 2 - 比较

这个 Chialisp 谜题的序列化形式是什么？

```chialisp
(mod (arg1 arg2)
    (> arg1 arg2)
)
```

:::

<details>

<summary> 答案(当准备好查看答案时展开)  </summary>

```chialisp
(> 2 5)
```

</details>

:::tip 问题 3 - If 语句

下面的序列化谜题和解决方案的结果是什么？

谜题：

```chialisp
(a (i 2 (q 1 . "true") (q 1 . "false")) 1)
```

解决方案:

```chialisp
(1)
```

:::

<details>

<summary> 答案(当准备好查看答案时展开) </summary>

`"true"`

</details>

问题 4 - 将上述所有内容结合起来

执行以下操作的 Chialisp 谜题是什么？

- 接受两个参数
- 将这两个参数相加
- 比较参数的和是否大于 100
- 当参数的和大于 100 时结果为 "Large"，当参数的和小于 100 时结果为 "Small"

:::

<details>

<summary> 答案(当准备好查看答案时展开) </summary>

```chialisp
(mod (arg1 arg2)
    (if (> (+ arg1 arg2) 100) "large" "small")
)
```

</details>

---

## 附加资源

### 可运行的Chialisp和clvm插件

有关如何使用这些插件的信息，请参阅[学院概述](/academy-overview#runnable-chialisp-and-clvm-plugins)

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

- Chialisp[基本概念](https://chialisp.com/chialisp-concepts/)：包括柯里化（currying）、内部谜题（inner puzzles）和条件变换（morphing conditions）的概述。
- 指导性的[Chialisp演练](https://docs.chia.net/guides/)：安装、创建智能币和使用BLS签名的指南。
- Chialisp[详细文档](https://chialisp.com/)：关于Chialisp所有方面的详细信息
- 从[Discord](https://discord.gg/chia)获取支持：如需进一步支持，请加入我们的Discord服务器，并在 #chialisp 或 #support 频道中提问

---
