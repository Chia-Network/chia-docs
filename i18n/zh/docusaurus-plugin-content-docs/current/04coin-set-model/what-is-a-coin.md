---
sidebar_position: 1
---

# 4.1 硬币、谜语和谜底

注意：本节将简要讨论 Chialisp 和硬币集模型。 如需更深入的教程，请访问 [chialisp.com](http://chialisp.com "Chialisp's official website")。

正如共识部分所解释的，奇亚区块链是一个由节点商定的区块列表。 节点还维护一个**硬币**表。 奇亚币是对一定数量的 XCH 的所有权记录，可以通过提供谜语和谜底来解锁。

The 3 properties in a coin are:

```python
class Coin:
    parent_coin_info: bytes32  # The coin ID of the parent coin.
    puzzle_hash: bytes32  # The hash of the puzzle that locks this coin.
    amount: uint64  # The amount of XCH in this coin, in the mojos unit: 1 XCH = 1 trillion mojos.
    class Coin:
    parent_coin_info: bytes32  # The coin ID of the parent coin.
    puzzle_hash: bytes32  # The hash of the puzzle that locks this coin.
    amount: uint64  # The amount of XCH in this coin, in the mojos unit: 1 XCH = 1 trillion mojos.
    amount: uint64  # The amount of XCH in this coin, in the mojos unit: 1 XCH = 1 trillion mojos.
```

该硬币的 coinID 是通过将三个字段的连接散列在一起来计算的，其中数量以 CLVM 格式编码。

`coinID == sha256(parent_ID + puzzlehash + amount)`

因为硬币 ID 是一个 sha256 哈希值，所以硬币永远不能改变。 它们只能被创建然后花费一次。

那么什么是**谜语**？ 每个硬币都有一个与之相关联的 CLVM（ChiaLisp 虚拟机）程序，该程序决定了如何、何时以及由谁使用该硬币。 该程序称为谜语，必须在创建硬币时选择。

例如，如果鲍勃想付给爱丽丝，鲍勃用爱丽丝知道如何解锁的谜语（因此是谜语哈希）创建一个硬币。 鲍勃可以使用爱丽丝的谜语哈希创建一个价值 5 XCH 的硬币，这样只有爱丽丝才能解锁它。

## 花费

当爱丽丝想要花费她的硬币时，她会创建一个花费组合（交易），其中显示她将花费的硬币、原始谜语以及该谜语的谜底。 谜底通常涉及硬币的签名、条件和接收者等内容。 爱丽丝是唯一知道谜语解法的人，因此她控制着那枚硬币。 一个基本的例子是谜语需要来自爱丽丝的公钥的数字签名。

该网络没有账户或硬币所有权的概念。 任何人都可以尝试在网络上花费任何硬币。 由谜语来防止硬币被盗或以意外方式花费。

The data required to spend a coin is:

- The coin ID
- The puzzle (full CLVM source code)
- The solution to the puzzle

A coin also has the option of requiring an aggregate signature in order to spend it.

## 账户模型与硬币集模型

In the account model, which is used by Ethereum and many other systems, balances are kept in accounts, which are permanent data structures which do not get destroyed when they send funds. There are some tradeoffs between the account model and the coin set model (similar to Bitcoin's UTXO model). These are permanent data structures which do not get destroyed when they send funds. 账户模型和硬币集模型（类似于比特币的 UTXO 模型）之间存在一些权衡。

### 帐户模型的好处

- All logic and state can be stored in one program and one account, simplifying development.
- It is simple to combining multiple transactions that affect the same dapp in one block.
- Users and wallets only have to keep track of one account for all of their balance (although the UTXO model can support this).

### 硬币集模型的好处

- Very parallelizable since each coin spend is independent.
- 硬币价值在许多硬币之间分配，增加了沙盒和安全性。 一个程序不能调用或影响另一个程序。
- Deterministic operation of every spend.
- More efficient storage of state (although this depends on implementation).
- Increased privacy, since one user usually has many coins.
- Re-applying mempool transactions after a new block is not necessary due to deterministic results.
