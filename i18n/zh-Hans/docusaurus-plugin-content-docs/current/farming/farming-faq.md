---
title: Farming FAQ
slug: /farming-faq
---

## 如何判断 Chia 耕种(Farming) 是否正常运行？

如果是首次使用 Chia 并想知道软件是否正常工作时，以下是一些建议，可以帮助到你。

首先，需要修改配置以进行额外的日志记录。 配置可以在 `config.yaml` 中找到。 该文件位于 `chia/mainnet/config.yaml`。

`.chia` 文件夹的位置因操作系统而异。 在 Windows 上，您需要在 `C:/Users/your username)/.chia/mainnet/config.yaml` 中查找。 在 Mac 上，此文件位于 `/Users/(your username)/.chia/mainnet/config/config.yaml`。

在修改配置之前，请关闭 Chia。 打开 `config.yaml` 并将第一个 `log_level` 编辑为 `INFO`，而不是 `WARNING`。 保存文件。

现在，重新启动 Chia。 等待20分钟让它运行。

在 Chia 运行时打开日志文件，将看到额外的消息。 可以在先前访问的 `config` 目录旁边的 `log` 目录中找到 `debug.log`。

日志文件包含许多信息。 一旦日志填满了 20mb，将创建另一个日志文件。 如果有太多日志文件，可以删除其中一些。

Inside what you are looking for are these lines:

```
_07:02:41.663 harvester src.harvester.harvester : INFO 1 plots were eligible for farming f53c496e80... Found 0 proofs. Time: 0.00500 s. Total 8 plots_ Found 0 proofs. Time: 0.00500 s. Total 8 plots_
```

这表示 Chia 正在工作。 初筛系统有2个部分。 Chia 发现1个地块通过了第一部分，现在它会查看内部是否有一个预先计算的“证明”，可以在最快的时间内进行交易（2-3秒）。 如果它在您的地块中保留了一个证明，那么您就赢了。 许多时候它会显示 0 个证明。 但是它意味着已经在正常工作了。 这是运气和时间的因素。 在该行的末尾，它将指示软件包含了多少地块。

:::info
确保您的农场正常运行的另一种方法是检查加入的矿池。 定期收到的部分币会给您带来安心。 相比之下，独自耕种可能需要等待数天、数周或数月才能获胜，而在此期间您会一直在想是否正确设置了一切。 请查看 [联合耕种](/pool-farming)。
:::

## 日志文件中的正常信息是什么？

以下是日志文件中的正常信息副本：

---

_9:32:00.322 full_node full_node_server : INFO \<- new_signage_point_or_end_of_sub_slot from peer 68b376e5846696df3510822ea527d0899ac6183f261e8858119235cd24903720 193.91.103.92._-

---

_9:32:00.278 farmer farmer_server : INFO \<- new_signage_point from peer 62d37909657e183dcd702b66d0e694474f907361f5981eceaba00878e84419c4 127.0.0.1._

---

_09:32:01.806 full_node full_node_server : INFO -> respond_peers to peer 202.185.44.200 e5b7f06ba6ece8698917e0e22971aef8602972de81efe379d693b2baa0dffc24._

---

_09:32:08.063 full_node full_node_server : INFO -> request_signage_point_or_end_of_sub_slot to peer 74.138.106.114 b567363c3a96c13366ef2dbff2e080da77f310875a8beda7c1c07246173c3a06._

---

_09:32:08.202 harvester harvester_server : INFO \<- new_signage_point_harvester from peer 5bfd9af9bc76270cf76746255db9a435dca56b9adb37f5d1daec71e3c699c807 192.168.0.44._

---

_09:32:08.211 harvester src.harvester.harvester : INFO 0 plots were eligible for farming fec1fff66e... Found 0 proofs. Time: 0.00200 s. Total 8 plots. Found 0 proofs. Time: 0.00200 s. Total 8 plots._

---

最后一行显示在当前时间 09:32:08.211 有 8 个地块正在进行耕种，其中 0 个地块符合条件。 这仍然意味着软件已识别出地块并正在进行耕种。
