---
sidebar_position: 1
---

# 4.1 硬币、谜语和谜底

> Coins, Puzzles and Solutions

注意：本节将简要讨论 Chialisp 和硬币集模型。 如需更深入的教程，请访问 [chialisp.com](http://chialisp.com "Chialisp's official website")。

正如共识部分所解释的，奇亚区块链是一个由节点商定的区块列表。节点还维护一个**硬币**表。奇亚币是对一定数量的 XCH 的所有权记录，可以通过提供谜语和谜底来解锁。

硬币的 3 个属性是：

```python
class Coin:
    parent_coin_info: bytes32  # The coin ID of the parent coin.
    puzzle_hash: bytes32  # The hash of the puzzle that locks this coin.
    amount: uint64  # The amount of XCH in this coin, in the mojos unit: 1 XCH = 1 trillion mojos.
```

该硬币的 coinID 是通过将三个字段的连接散列在一起来计算的，其中数量以 CLVM 格式编码。

`coinID == sha256(parent_ID + puzzlehash + amount)`

因为硬币 ID 是一个 sha256 哈希值，所以硬币永远不能改变。它们只能被创建然后花费一次。

那么什么是**谜语**？ 每个硬币都有一个与之相关联的 CLVM（ChiaLisp 虚拟机）程序，该程序决定了如何、何时以及由谁使用该硬币。该程序称为谜语，必须在创建硬币时选择。

例如，如果鲍勃想付给爱丽丝，鲍勃用爱丽丝知道如何解锁的谜语（因此是谜语哈希）创建一个硬币。鲍勃可以使用爱丽丝的谜语哈希创建一个价值 5 XCH 的硬币，这样只有爱丽丝才能解锁它。

<details>
<summary>原文参考</summary>

NOTE: This section will briefly discuss Chialisp and the coin set model. For a more in-depth tutorial, head over to [chialisp.com](http://chialisp.com "Chialisp's official website").

The Chia blockchain, as explained in the consensus section, is a list of blocks that is agreed upon by nodes. Nodes also maintain a table of **coins**. A coin in chia is a record of ownership of a certain amount of XCH, which can be unlocked by providing a puzzle and solution.

The 3 properties in a coin are:

```python
class Coin:
    parent_coin_info: bytes32  # The coin ID of the parent coin.
    puzzle_hash: bytes32  # The hash of the puzzle that locks this coin.
    amount: uint64  # The amount of XCH in this coin, in the mojos unit: 1 XCH = 1 trillion mojos.
```

The coinID of this coin is computed by hashing together the concatenation of the three fields, where amount is encoded in CLVM format.

`coinID == sha256(parent_ID + puzzlehash + amount)`

Because the coinID is a sha256 hash, coins can never be changed. They can only be created and then spent once.

So what is a **puzzle**? Each coin has a CLVM (ChiaLisp Virtual Machine) program associated with it, which determines how, when, and by whom this coin can be spent. This program is called the puzzle, and it must be chosen at the time of the coin's creation.

For example, if Bob wanted to pay Alice, Bob would create a coin with a puzzle (and thus a puzzle hash) which Alice knows how to unlock. Bob can create a coin worth 5 XCH using Alice's puzzle hash, so that only Alice can unlock it.

</details>

## 花费

当爱丽丝想要花费她的硬币时，她会创建一个花费组合（交易），其中显示她将花费的硬币、原始谜语以及该谜语的谜底。谜底通常涉及硬币的签名、条件和接收者等内容。爱丽丝是唯一知道谜语解法的人，因此她控制着那枚硬币。一个基本的例子是谜语需要来自爱丽丝的公钥的数字签名。

该网络没有账户或硬币所有权的概念。任何人都可以尝试在网络上花费任何硬币。由谜语来防止硬币被盗或以意外方式花费。

花费一个硬币所需的数据是：

- 硬币 ID
- 谜语（完整的 CLVM 源代码）
- 谜语的谜底

硬币还可以选择需要聚合签名才能使用它。

<details>
<summary>原文参考</summary>

- ## Spends

When Alice wants to spend her coin, she creates a spend bundle (transaction), which reveals the coin she will spend, the original puzzle, and the solution to that puzzle. The solution usually involves things like signatures, conditions, and recipients of the coin. Alice is the only one that knows the solution to her puzzles, and thus she controls that coin. A basic example is that the puzzle requires a digital signature from Alice's public key.

The network has no concept of accounts, or of coin ownership. Anybody can attempt to spend any coin on the network. It's up to the puzzles to prevent coins from being stolen or spent in unintended ways.

The data required to spend a coin is:

- The coin ID
- The puzzle (full CLVM source code)
- The solution to the puzzle

A coin also has the option of requiring an aggregate signature in order to spend it.

</details>

## 账户模型与硬币集模型

在以太坊和许多其他系统使用的账户模型中，余额保存在账户中，账户是永久性的数据结构，在发送资金时不会被破坏。账户模型和硬币集模型（类似于比特币的 UTXO 模型）之间存在一些权衡。

### 帐户模型的好处

- 所有逻辑和状态都可以存储在一个程序和一个帐户中，简化开发。
- 将影响同一个去中心化应用（dapp）的多个交易合并到一个区块中很简单。
- 用户和钱包只需跟踪一个账户的所有余额（尽管 UTXO 模型可以支持这一点）。

### 硬币集模型的好处

- 非常可并行，因为每个硬币支出都是独立的。
- 硬币价值在许多硬币之间分配，增加了沙盒和安全性。一个程序不能调用或影响另一个程序。
- 每次支出的确定性操作。
- 更有效的状态存储（尽管这取决于实现）。
- 增加隐私，因为一个用户通常有很多硬币。
- 由于确定性结果，没有必要在新区块之后重新应用交易池交易。

<details>
<summary>原文参考</summary>

- ## Account Model vs Coin Set Model

In the account model, which is used by Ethereum and many other systems, balances are kept in accounts, which are permanent data structures which do not get destroyed when they send funds. There are some tradeoffs between the account model and the coin set model (similar to Bitcoin's UTXO model).

- ### Benefits of account model

* All logic and state can be stored in one program and one account, simplifying development.
* It is simple to combining multiple transactions that affect the same dapp in one block.
* Users and wallets only have to keep track of one account for all of their balance (although the UTXO model can support this).

- ### Benefits of coin set model

* Very parallelizable since each coin spend is independent.
* Coin value is split between many coins, increasing sandboxing and security. One program cannot call or affect another.
* Deterministic operation of every spend.
* More efficient storage of state (although this depends on implementation).
* Increased privacy, since one user usually has many coins.
* Re-applying mempool transactions after a new block is not necessary due to deterministic results.

</details>
