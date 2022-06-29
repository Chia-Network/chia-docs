---
sidebar_position: 2
---

# 4.2 条件

> Conditions

奇亚中的谜语必须是有效的 clvm 程序。 这些程序由 clvm 解释器执行，它们必须要么失败，要么返回**条件**列表。 回想一下，每次花费一枚硬币都必须运行与该硬币相关的谜语。

CLVM 程序无法访问外部世界，甚至无法访问区块高度等区块链参数。因此，为了与外部环境交互，它们返回一个条件列表，每个条件都必须有效才能使支出本身有效。条件分为两类：“此支出仅在 X 时有效”和“如果此支出有效则 X”。

有关条件的完整列表及其格式和行为，请参阅 [Chialisp.com](https://chialisp.com/docs/coins_spends_and_wallets#conditions 'Conditions in Chialisp')。

Chialisp.com 还包含有关构建[标准交易](https://chialisp.com/docs/standard_transaction)的信息。

<details>
<summary>原文参考</summary>

Puzzles in chia must be valid clvm programs. These programs are executed by the clvm interpreter, and they must either fail, or return a list of **conditions**. Recall that every spend of a coin must run the puzzleassociated with that coin.

CLVM programs have no access to the outside world, or even to blockchain parameters like block height. Therefore, to interact with the outside environment, they return a list of conditions, each of which must be valid in order for the spend itself to be valid. Conditions are split into two categories: "this spend is only valid if X" and "if this spend is valid then X".

For a complete list of conditions, along with their format and behavior, please see [Chialisp.com](https://chialisp.com/docs/coins_spends_and_wallets#conditions 'Conditions in Chialisp').

Chialisp.com also contains information on the construction of [the standard transaction](https://chialisp.com/docs/standard_transaction).

</details>
