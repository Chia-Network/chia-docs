---
sidebar_position: 1
---

# 4.1 硬币、谜题和解决方案

> Coins, Puzzles and Solutions

正如共识部分所解释的，Chia 区块链是一个由节点商定的区块列表。节点还维护一个**硬币**表。chia 币是对一定数量的 XCH 的所有权记录，可以通过提供拼图和解决方案来解锁。

硬币的 3 个属性是：

```python
class Coin:
    parent_coin_info: bytes32  # The coin ID of the parent coin.
    puzzle_hash: bytes32  # The hash of the puzzle that locks this coin.
    amount: uint64  # The amount of XCH in this coin, in the mojos unit: 1 XCH = 1 trillion mojos.
```

该硬币的硬币 ID 是通过将三个字段的连接散列在一起来计算的，其中数量以 CLVM 格式编码。因此，硬币永远无法更改，它们只能创建然后花费一次。

那么什么是**拼图**？每个硬币都有一个与之相关联的 CLVM（chialisp VM）程序，它决定了如何、谁以及何时可以使用该硬币。该程序称为拼图，必须在创建硬币时选择。如果鲍勃想付钱给爱丽丝，鲍勃会用爱丽丝知道如何解锁的谜题（以及谜题哈希）创建硬币。例如，Bob 可以使用 Alice 的拼图哈希为 Alice 创建一个价值 5 XCH 的硬币。

<details>
<summary>原文参考</summary>

The Chia blockchain, as explained in the consensus section, is a list of blocks that is agreed upon by nodes.
Nodes also maintain a table of **coins**. A coin in chia is a record of ownership of a certain amount of XCH, which 
can be unlocked by providing a puzzle and solution. 

The 3 properties in a coin are:

```python
class Coin:
    parent_coin_info: bytes32  # The coin ID of the parent coin.
    puzzle_hash: bytes32  # The hash of the puzzle that locks this coin.
    amount: uint64  # The amount of XCH in this coin, in the mojos unit: 1 XCH = 1 trillion mojos.
```

The coin ID of this coin is computed by hashing together the concatenation of the three fields, where amount is encoded
in CLVM format. Therefore, coins can never be changed, they can only created and then spent once.

So what is a **puzzle**? Each coin has a CLVM (chialisp VM) program that is associated with it, which determines how, who,
and when this coin can be spent. This program is called the puzzle, and must be chosen at the time that the coin gets
created. If Bob wants to pay Alice, Bob would create a coin with a puzzle (and thus a puzzle hash) which Alice knows
how to unlock. For example, Bob can create a coin of value 5 XCH to Alice, with Alice's puzzle hash.

</details>

## 花费

当爱丽丝想要花掉她的硬币时，她会创建一个花费她的硬币的交易，并揭示原始谜题以及该谜题的解决方案。解决方案通常涉及硬币的签名、条件和接收者等内容。爱丽丝是唯一知道谜题解法的人，因此她控制着那枚硬币。一个基本的例子是拼图需要来​​自爱丽丝公钥的数字签名。

网络没有硬币所有权的概念，任何人都可以尝试在网络上花费任何硬币。由拼图来防止硬币被盗或以意外方式花费。

花费一个硬币所需的数据是：

- 硬币标识
- 谜题（完整的clvm源代码）
- 难题的解答
- 聚合签名
- 有关 CLVM 的更多详细信息，请查看[chialisp.com](http://chialisp.com)。

<details>
<summary>原文参考</summary>

- ## Spends

When Alice wants to spend her coin, she creates a transaction that spends her coin, and reveals the original puzzle, and the solution
to that puzzle. The solution usually involves things like signatures, conditions, and recipients of the coin. Alice
is the only one that knows the solution to her puzzles, and thus she controls that coin. A basic example is that the
puzzle requires a digital signature from alice's public key. 

The network has no concept of coin ownership, anybody can attempt to spend any coin on the network. It's up to the puzzles to prevent coins from being stolen or spent in unintended ways.

The data required to spend a coin is:
* The coin ID
* The puzzle (full clvm source code)
* The solution to the puzzle
* An aggregate signature

For more detail on CLVM please look at [chialisp.com](http://chialisp.com).

</details>

## 账户模型与硬币集模型

在以太坊和许多其他系统使用的账户模型中，余额保存在账户中，账户是永久性的数据结构，在发送资金时不会被破坏。账户模型和硬币集模型（也称为 UTXO 模型）之间存在一些权衡。

### 帐户模型的好处

- 所有逻辑和状态都可以在一个程序和一个帐户中，简化了开发。
- 将影响同一个 dapp 的多个交易合并到一个区块中很简单。
- 用户和钱包只需跟踪 1 个帐户的所有余额（尽管 UTXO 模型可以支持这一点）。

### 硬币集模型的好处

- 非常可并行，因为每个硬币支出都是独立的。
- 硬币价值在许多硬币之间分配，增加了沙盒和安全性。一个程序不能调用或影响另一个程序。
- 每次支出的确定性操作。
- 更有效的状态存储（尽管这取决于实现）。
- 增加隐私，因为一个用户通常有很多硬币。
- 由于确定性结果，没有必要在新区块之后重新应用内存池交易。

<details>
<summary>原文参考</summary>

- ## Account Model vs Coin Set Model

In the account model, which is used by Ethereum and many other systems, balances are kept in accounts, which are
permanent data structures which do not get destroyed when they send funds. There are some tradeoffs between the 
account model and the coin set model (also called UTXO model).

- ### Benefits of account model

* All logic and state can be in one program and one account, simplifying development.
* Combining multiple transactions that affect the same dapp in one block is simple.
* Users and wallets only have to keep track of 1 account for all of their balance (although UTXO model can support this).

- ### Benefits of coin set model

* Very parallelizable since each coin spend is independent.
* Coin value is split between many coins, increasing sandboxing and security. One program cannot call or affect another.
* Deterministic operation of every spend.
* More efficient storage of state  (although this depends on implementation).
* Increased privacy, since one user usually has many coins.
* Re-applying mempool transactions after a new block is not necessary due to deterministic results.

</details>
