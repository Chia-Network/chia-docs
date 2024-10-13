---
title: Signatures
slug: /chialisp-signatures
---

import Runnable from '@site/src/components/Runnable.tsx';

在这节课中，我们将讨论如何使用签名来保护币。

## 学习目标

- **签名（Signing、Signatures）**：了解签名的用途和好处。
- **Chialisp 库文件**：了解简化开发的有用Chialisp库。

---

## 内容

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/zD1rhLKgc9Y" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## 脚本

<details>

<summary> Expand for the full script </summary>

00:00\
我们创建了我们的第一个智能币，并将其安全地保护，只有拥有正确密码的人才能使用它。 在本视频中，我们将使用签名来保护我们的币，以便只有拥有正确签名的人才能使用这个币。

00:20\
那么什么是签名？ 数字签名允许您使用私钥对消息进行签名。 然后，接收方可以使用您的公钥验证此消息。 让我们从签署消息并验证它的示例开始。

00:40\
运行 `chia keys sign --message`，消息为 `"hello"`，`--hdpath m`，然后选择您的钱包ID。 此过程将使用您的私钥对消息 'hello' 进行签名。 要验证此消息，我们将运行 `chia keys verify`，输入消息，然后是签名和发送方的公钥。 (`chia keys verify --message hello --signature [SIG] --public_key [PUB_KEY]`)

01:00\
现在我们知道签名的工作原理了，让我们创建一个只有在提供正确签名时才能花费的币。 因此，在我们的 chialisp 文件中，让我们定义一个接受两个参数的模块。 第一个将是我们稍后将添加的公钥。 这将确定谁可以花费这个币。

01:20\
第二个参数将是决定如何花费币的条件。 接下来，我们将包含一些库，以使我们的代码更易于编写。 第一个库允许我们使用编写的条件代码而不是数字代码，第二个库是一个用于树哈希的库。

01:40\
要安装这些库，在终端中运行此命令。 `cdv clsp retrieve sha256tree condition-codes`. 回到我们的 chialisp 文件，我们将使用 `c` 定义一个组合语句，对于第一个参数，创建一个由 `AGG_SIG_ME` 条件、我们的公钥参数和通过树哈希库的条件参数组成的列表。 (`(c (list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions)) conditions)`)

02:00\
组合语句中的第二个参数将是传递到程序中的条件。 那么这是做什么的呢？ `AGG_SIG_ME` 条件是一个标准条件，用公钥签名消息。 在这种情况下，我们将在键和消息是条件参数的树哈希之后对键进行曲线处理。

02:20\
我们这样做是为了防止农民修改条件。 因此，为了花费币，用户必须提供一个包含条件列表的解决方案；或者他们希望如何花费币的方式；以及一个签名，以表明他们是授权进行操作的人。

02:40\
在本示例中，我们将创建一个解决方案，该解决方案使用 `CREATE_COIN` 条件来解锁币的价值，并将其发送回我们的钱包。 首先，让我们完成创建此币。 我们将使用 `chia keys show` 获取我们的主公钥，并将其曲线化到我们的程序中。 重要的是要用 `0x` 前缀表示它是一个值。

03:00\
现在我们将使用 `opc` 获取拼图展示，并输入编译代码。 记得保存这个以备将来使用。 对于拼图哈希，我们将运行 `opc -h` 并输入编译代码。 我们也会保存这个以备将来使用。 我们需要将拼图哈希编码成一个地址。 运行 `cdv encode --prefix txch` 并输入拼图哈希。

03:20\
这给了我们拼图地址。 现在，我们将发送一定量的 chia 到这个地址以锁定它。 然后我们会检查状态。 一旦确认，我们就可以花费它了。

03:40\
要花费这个币，我们需要创建一个花费包。 看一下这个大纲。 这应该看起来很熟悉，就像我们在上一个视频中创建的花费包一样。 我们需要四件东西，币记录，我们已经计算过的拼图展示，我们想要提供的解决方案以及一个聚合签名来授权我们的花费。

04:00\
要获取币记录，请运行 `cdv rpc coinrecords --by puzzlehash`，并输入之前的拼图哈希。 复制币对象，并将其粘贴到花费包模板中。 接下来，我们可以输入我们之前计算过的拼图展示。 对于解决方案，我们将需要做一些工作。

04:20\
我们将使用标准条件 `CREATE_COIN` 来解锁币的价值，并将其发送回我们的钱包。 为此，我们需要我们的地址，我们可以使用 `chia wallet get address` 获取，然后解码以获取钱包地址拼图哈希，并使用 `cdv decode` 和我们的地址。

04:40\
为了制作解决方案，我们将运行此命令，其中 `51` 是 `CREATE_COIN` 条件代码，我们的钱包地址拼图哈希，以及一个以 mojo 为单位的金额。 我们可以将此响应输入到我们的花费包的解决方案中。

05:00\
最后，聚合签名。 请记住，我们正在签名的消息是我们的条件的树哈希；或我们的解决方案。 首先，让我们生成该哈希。 接下来，我们还需要币 ID 和起源挑战。 起源挑战是每个网络的标准值。

05:20\
你可以通过输入 `chia show -s` 并搜索 'genesis challenge' 来找到适当的挑战。 对于币 ID，实际上我们需要父 ID、拼图哈希和金额，这些都可以在我们之前复制的币记录中找到。

05:40\
要获取币 ID，我们将运行 `cdv inspect -id coins`，然后输入父 ID、拼图哈希和金额。 （`cdv inspect -id coins --parent-id [PARENT_ID] --puzzle-hash [PUZZLE_HASH] --amount [AMOUNT]`）`AGG_SIG_ME` 条件期望条件树哈希、币 ID 和起源挑战的连接，因此运行

06:00\
`concat` 条件树哈希、币 ID 和起源挑战。 确保使用前缀 `0x` 表示这些都是值。 现在让我们对此消息进行签名，并且由于我们没有将其用作值，请记住这次删除 `0x` 前缀。

06:20\
现在我们可以将此签名输入到我们的花费包中并进行推送。 运行 `cdv rpc pushtx spendbundle.json`。 如果您的签名不正确，您将收到一个失败消息。 否则，恭喜！ 您已经创建了一个智能币，并使用签名进行了保护。

06:40\
在本视频中，我们讨论了签名的工作原理、它们的重要性以及如何将它们实现到智能币中。 非常感谢观看，我们下次见。

</details>

---

## 常见问题

- **0x 前缀：** 重要的是要跟踪我们如何使用不同的值，并了解 Chialisp 将如何处理它们。 一个常见的小错误是忘记向值附加 `0x`，或在某些情况下将其删除以告诉拼图如何正确处理参数。
- **“暂存以备后用”：** 在本课程的几个地方，我们生成了需要在其他地方使用的结果，有时候是多次。 这些结果也没有明显的指示符表明它们是什么。 为了以后使用，将这些结果临时保存在一个文件中是很有帮助的。

---

## 知识检测

:::tip 问题 1 - 密钥

正确还是错误。 你需要使用某人的私钥来锁定一枚硬币，以便他们能够花费。

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

错误 你应该使用他们的公钥。 私钥应保密，永远不应透露给任何人。

</details>

:::tip 问题 2 - 聚合签名

聚合签名由哪三个部分组成？

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

`AGG_SIG_ME`条件期望以下值的串联：

1. 条件的树哈希。
2. 币的ID。
3. 创世挑战。

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
