---
sidebar_position: 2
---

# 4.2 条件

奇亚中的谜语必须是有效的 clvm 程序。 这些程序由 clvm 解释器执行，它们必须要么失败，要么返回**条件**列表。 回想一下，每次花费一枚硬币都必须运行与该硬币相关的谜语。

CLVM 程序无法访问外部世界，甚至无法访问区块高度等区块链参数。 因此，为了与外部环境交互，它们返回一个条件列表，每个条件都必须有效才能使支出本身有效。 条件分为两类：“此支出仅在 X 时有效”和“如果此支出有效则 X”。

For a complete list of conditions, along with their format and behavior, please see [Chialisp.com](https://chialisp.com/docs/coins_spends_and_wallets#conditions "Conditions in Chialisp").

Chialisp.com also contains information on the construction of [the standard transaction](https://chialisp.com/docs/standard_transaction).
