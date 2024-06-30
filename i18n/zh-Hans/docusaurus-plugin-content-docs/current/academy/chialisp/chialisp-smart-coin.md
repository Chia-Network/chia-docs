---
title: Smart Coins
slug: /chialisp-smart-coin
---

import Runnable from '@site/src/components/Runnable.tsx';

在本课程中，我们将讨论柯里化、哈希和条件，并提交并使用我们的第一个 Chia 智能硬币。

## 学习目标

- **Currying（柯里化）**：了解如何通过柯里化创建更通用的谜题。
- **Hashing（哈希）**：了解通过哈希来混淆谜题中的敏感部分的必要性。
- **Conditions（条件）**：使用条件允许花费者决定如何花费币。

---

## 内容

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/-Nza_N9Xb3Y" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## 脚本

<details>

<summary> Expand for the full script </summary>

00:00\
在区块链上，一切都是一个币。 它们通常被称为智能硬币，因为每个币都与一个称为谜题的Chialisp程序相关联。 该程序决定了币何时以及如何被使用，以及在使用时会发生什么。

00:20\
NFT、CAT 和标准交易都使用谜题来定义。 在上一个视频中，我们学习了如何编写基本的Chialisp程序。 让我们将这些应用到一些更复杂的谜题中，并创建一个可以在区块链上使用的币。

00:40\
在这个视频中，我们将讨论柯里化、哈希和条件。 那么让我们开始吧！ 我们将首先创建一个名为 `password.clsp` 的新Chialisp文件，并创建一个模块，它接受一个参数 `password` 并确定传入的值是否等于 `hello`。 如果是，则返回 "correct"，否则返回 "incorrect"。

01:00\
我们将在终端中使用 `brun` 命令运行这个，并传入 `hello`，这应该会给我们一个成功。 为了测试相反的情况，我们将传入其他内容，然后看看是否失败。 这是对Chialisp基础知识的一点复习。 我们这个谜题的一个问题是，密码的硬编码值既不安全也不太有用。

01:20\
我们想要一个更通用的谜题，可以用于任何我们选择的密码。 为此，我们将使用柯里化和哈希。 为了使这个谜题更通用，我们将使用柯里化。 为此，让我们用两个新的参数替换我们的密码参数，`CORRECT_PASSWORD` 和 `provided_password`，然后在这些参数上运行我们的比较。

01:40\
现在在我们的终端中，我们可以柯里化一个值来替换正确的密码参数并进行编译。 运行 `cdv clsp curry password.clsp -a`，并传入我们想要的密码，这里是 `hello`，我们会得到以下结果。 现在如果我们通过 `brun` 运行它，并给它正确的密码，我们应该会得到一个成功。

02:00\
我们也可以像这样嵌套这些命令 - (`brun "$(cdv clsp curry password.clsp -a 'goodbye')" "(goodbye)"`)。 使我们的谜题更安全的第一步是使用哈希。 A hash function will take an input and return a hash value. 最流行的哈希算法之一是 sha256，它直接在chialisp中支持。

02:20\
关于哈希函数的几个重要说明：给定一个值，计算哈希非常容易。 给定一个哈希，计算原始输入非常困难或不可能，并且通过哈希函数多次传递相同的值将始终产生相同的输出。

02:40\
我们可以利用这些原则，通过柯里化预期密码的哈希值而不是密码值本身来提高安全性。 This prevents us from revealing the expected password while still allowing us to check if the provided password is correct. This is done by hashing the provided password. 所以让我们改变我们的谜题来使用哈希。

03:00\
首先，将柯里化参数更改为 `PASSWORD_HASH`，并将其他参数更改为 `password`。 在比较中，使用 sha256 来哈希给定的密码，并将其与密码哈希进行比较。 为了测试这个，我们首先需要对密码进行哈希并将其柯里化到我们的新谜题中。

03:20\
运行 `cdv hash "hello"` 来获取密码 "hello" 的哈希。 现在我们可以像上次一样将其柯里化到我们的谜题中，确保用 `0x` 前缀标识为chialisp值。 现在我们可以通过 `brun` 传递这个编译后的谜题，并提供正确的密码进行测试。

03:40\
重要的是要知道，虽然哈希是确保我们的谜题安全的重要部分，但这还不够。 当我们用正确的密码提供我们的解决方案时，该密码将在区块链上可见。 这意味着我们将无法再次使用它。 解决这个问题的最终方法是使用签名，我们将在未来的视频中讨论。 现在我们已经讨论了柯里化和哈希，让我们谈谈条件。

04:00\
在我们的密码谜题中，让我们做一些添加。 首先，我们将添加一个名为 `conditions` 的参数，然后用该参数替换成功和失败消息，后跟 `(x)`。 那么这是做什么的呢？ 好吧，`x` 代表错误。 如果密码不正确，if 语句将计算为 false，并且出错，终止程序，并使我们创建的币未花费。

04:20\
如果给出正确的密码，则conditions 提供者提供的条件将会执行。 回到我们的终端，首先我们需要像之前一样柯里化我们的哈希密码。 现在我们有了编译后的谜题，我们需要做一些事情来创建币。 首先，我们需要谜题哈希，我们可以通过运行 `opc -H` 并传入我们的编译后的谜题来获得。

04:40\
我们将保存结果供以后使用。 接下来，我们需要谜题揭示，它只是谜题的十六进制序列化形式。 这是在花费币时必须在链上揭示的内容。 我们可以通过运行 `opc` 并传入我们的编译后的谜题来获得这个。 我们也会保存这个以备将来使用。

05:00\
现在要创建币，我们需要将我们的谜题哈希编码为一个地址，使用 `cdv encode -p txch` 并传入我们的谜题哈希。 然后我们将给该地址发送一定数量的 xch 以锁定它。 现在让我们花费币以释放价值回到我们的钱包。 首先，我们将获取我们的钱包地址，并使用 `cdv decode` 将其转换为谜题哈希。

05:20\
接下来，我们将使用这个来构建我们要传递到币中的条件。 对于本例，我们将使用代号为 `51` 的 `CREATE_COIN` 条件。 因此，为了构建我们的解决方案，我们将写 `opc` 然后给出我们的密码，然后是我们要传递的条件。

05:40\
在这种情况下，条件代码 `51`，我们的钱包谜题哈希 - 前缀为 `0x`，以及一个数量。 这个输出就是我们的解决方案，我们会将其保存供以后使用。 好的，现在我们需要检索我们之前创建的币记录，当我们将 xch 承诺给谜题时。 运行 `cdv rpc coinrecords --by puzzlehash` 并传入原始谜题哈希。

06:00\
输出可能会包含一些币记录，具体取决于您是否紧密遵循示例，并根据最高区块索引选择最近的一个，并复制币记录。 现在我们将创建一个花费捆绑包。 开始一个 `json` 文件，并创建一个名为 `coin_spends` 的属性，其中包含一个包含一个对象的数组。 (`[{}]`)

06:20\
粘贴币记录，然后是您之前生成的谜题揭示，然后是解决方案。 创建另一个名为 `aggregated_signature` 的属性，并将其分配为这个值（`0xc0000000000...`）这是 191 个零。 现在将花费捆绑包提交到内存池中，使用 `cdv rpc pushtx spendbundle.json`。

06:40\
如果一切顺利，此交易应该被接受，一段时间后您应该会看到您的钱包余额增加。 现在您已经创建了您的第一个智能币。 在本视频中，我们讨论了如何将值柯里化到通用谜题中，如何对敏感值以及用于创建币的谜题进行哈希，并简要介绍了可以传递到谜题中的条件。

07:00\
在下一个视频中，我们将进一步讨论安全性以及如何使用签名来更好地保护您的交易。 那时再见。

</details>

---

## 常见问题

- **柯里化参数：** 最佳实践是将意图进行柯里化的参数写成大写字母。 这有助于在编写谜题时跟踪每个参数的来源。
- **0x 前缀：** 重要的是要跟踪我们如何使用不同的值，并了解 Chialisp 将如何处理它们。 一个常见的小错误是忘记向值附加 `0x`，或在某些情况下将其删除以告诉拼图如何正确处理参数。
- **条件代码：** 条件代码默认用数字代码表示。 在未来的课程中，我们还将使用一个允许我们使用更具描述性语言引用代码的库。

---

## 知识检测

:::tip 问题 1 - 柯里化参数

在这个谜题中，哪个参数将被柯里化进去？

```chialisp
(mod (ARG1 arg2)
    (if (= ARG1 arg2)
        "Equal"
        "Not Equal"
    )
)
```

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

ARG1 将被柯里化进去。

柯里化始终按顺序替换参数，因此在柯里化时，第一个将被替换。 最佳实践是将柯里化的参数用大写字母写出，以帮助我们跟踪。

</details>

:::tip 问题 2 - 哈希原理

哈希的三个原理是什么？

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

1. 给定一个值，对该值进行哈希是计算上容易的。
2. 给定一个哈希，计算出原始值是计算上困难或不可能的。
3. 对相同的输入进行哈希，将会得到相同的输出。

</details>

:::tip 问题 3 - 哈希谜题

正确还是错误。 Sha256是最流行的哈希算法之一，并且在chialisp 中得到了原生支持。

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

True

</details>

:::tip 问题 4 - 结合上述所有内容

编写一个 Chialisp 谜题，执行以下操作。

- 接受一个柯里化参数
- 使用sha256哈希提供的参数，并将其与柯里化参数进行比较。
- 如果比较结果为真，则输出提供的结果。

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

```chialisp
(mod (PASSWORD_HASH password conditions)
    (if (= (sha256 password) PASSWORD_HASH)
        conditions
        (x)
    )
)
```

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
