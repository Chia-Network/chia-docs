---
sidebar_position: 3
---

# 4.3 花费组合

花费组合是一组多币种的支出，通常提交给完整节点以包含在区块链中。 在比特币中，相关的数据结构是交易。

Here is the spend bundle's basic construction:

```python
class CoinSpend:
    coin: Coin
    puzzle_reveal: SerializedProgram
    solution: SerializedProgram

class SpendBundle:
    coin_spends: List[CoinSpend]
    aggregated_signature: G2Element
```

正如您在上面的代码示例中看到的那样，一个花费组合是一组硬币支出，其中每个硬币支出包括正在支出的硬币、谜语程序和谜底程序。 每个谜底都被传递到每个谜语中，并通过 clvm 运行，在那里它输出条件。 其中两个条件—— `AGG_SIG_ME` 和 `AGG_SIG_UNSAFE` ——要求存在签名才能使支出有效。

通常，在进行交易时，用户会合并多次花费，以实现交易的预期价值。 用户还可以组合代表 [CATs](https://chialisp.com/docs/puzzles/cats) (奇亚资产代币) 的硬币，并在同一个花费组合中发送不同类型的价值。

## 聚合签名

在比特币中，每笔支出都有自己的一个或多个签名，每个 `(public key, message)` 组合一个。 然后，每个签名 `s_i` 都通过一个签名验证算法：`V(s, m, pk) -> T/F`，带有消息 `m` 和公钥 `pk`，并且当且仅当 `V` 返回 true 时才有效。

在奇亚中，使用 BLS 签名。 这些签名可以组合（添加）在一起以生成与原始签名相同大小的聚合签名。 假设我们有三个花费组合，每个包都有自己的一对：

```
s1 m1 pk1
s2 m2 pk2
s3 m3 pk3
```

使用 BLS 签名，农民可以将所有三个签名 `s1, s2, and s3` 合并为一个签名 `s_agg`。 BLS 签名验证可以采用多个公钥和消息：`V(s, [m1, m2, ... mx], [pk1, pk2, ... pkx]) -> T/F`。

This allows the farmer to combine all three spend bundles into one spend bundle, with only one signature.which means less data is transmitted and stored on chain and disk.

这些聚合签名的另一个好处是，当花费多个硬币时，用户只会传输一个签名，而不是每次花费一个或多个。 更多信息可以在[第 9.1 节](/docs/09keys/keys-and-signatures "Section 9.1: Keys and Signatures")中找到。 您还可以阅读[BLS 签名代码](https://github.com/Chia-Network/bls-signatures)。

## 硬币 vs 支出包

奇亚和其他基于 UTXO 的区块链系统之间的一个主要区别是，支出包不是块数据库中的第一类对象。 奇亚中的每个块都包含删除和添加的列表，其中删除是在该块中花费的硬币，而添加是在该块中添加的硬币。

假设一个农民想要将 1000 个花费组合包含在一个块中。 首先，他们可以将所有的支出包合并为一个，然后他们可以制作区块。 每个区块的所有支出都只有一个签名。 验证和存储这个区块的全节点不需要知道哪些花费与哪些其他花费组合在一起的原始信息。

## 添加和删除

在下图中，您可以看到用户创建的花费组合。 In the figure below, you can see a spend bundle that was created by a user. The removals in the spend bundle are coins A, B, and C, and the additions are coins C and D. This is very similar to how the standard transaction script works in `chia-blockchain`.

<figure>
<img src="/img/spend_bundle.png" alt="drawing"/>
</figure>

让我们来看看图像中的不同组件。 首先，假设爱丽丝想向鲍勃发送 13 个 XCH。 爱丽丝查看她的硬币数据库，并选择 3 个未使用的硬币（A、B 和 C），它们加起来至少有 13 个 XCH。 这些硬币中的每一个都有一个相关的 CLVM 谜语，其中有一个公钥编码。 让我们将这些公钥表示为 `pkA`、`pkB` 和 `pkC`。 爱丽丝需要为每笔支出生成谜语和谜底，以创建花费组合。

每个谜语，当与谜底一起运行时，会返回一个 `AGG_SIG` 条件（AGG_SIG_ME 或 AGG_SIG_UNSAFE）。 这意味着需要来自相应公钥的签名，以便此支出有效。

我们可以使用 BLS 签名算法将所有三个签名合并为一个签名，而不是提供 3 个签名。 这样做有两个好处：

1. The resulting spend bundle will be smaller in bytes.
2. The spend bundle can not be unbundled (the signature cannot be de-aggregated).

也就是说，获得爱丽丝的花费组合的攻击者无法拆开支出包以仅花费其中一个硬币。 当爱丽丝将此支出包发送到奇亚网络时，其他全节点将运行 CLVM 程序，收集所有 `AGG_SIG` 条件，然后使用花费组合中提供的聚合签名对其进行验证。

硬币 A 的第一个谜语也返回两个 `CREATE_COIN` 条件。 这意味着必须将两个硬币添加到硬币数据库中才能使支出 A 有效：

1. Coin D is for Bob (puzzle hash 0x1b54f and 13 XCH).
2. 硬币 E 是爱丽丝的零钱。 她花了 14 个 XCH，却只想送 13 个 XCH 给鲍勃。 每个硬币的价值都必须完全花掉，所以爱丽丝需要向自己发送 1 个 XCH 作为找零。

Note that the puzzle hash of coin E is the same as that of coin A. Puzzle hashes can be reused. Note that the puzzle hash of coin E is the same as that of coin A. Puzzle hashes can be reused. When spending coin E, Alice would sign with the same key as before, but would most likely use a different message that spends to another recipient.

另请注意，只有第一次花费是创建硬币。 这是合并花费的正常方式，因为每个代币必须只有一个父代币。 花费 A 本身是无效的，因为它创造的价值 (14 XCH) 比花费的 (5 XCH) 多。 但是，当与花费 B 和 C 结合使用时，花费才有效。

全节点接收、验证花费组合并将其存储在内存中。 但是，在创建新区块时，农业节点会合并来自不同用户的许多花费组合。 这会创建一个带有一个签名的大组合。 仅查看区块时，并不总是清楚最初将哪些花费组合在一起。 但是，我们可以看到整个区块的净增减。

## 全节点存储在区块链中的内容是什么？

Puzzles are only revealed when coins are spent; the puzzles are saved on-chain afterward for record-keeping purposes.

因此，完整节点存储区块链的历史，其中包括所有已用硬币的所有谜语和谜底。 完整节点还存储未花费硬币的列表，其中仅包含谜语哈希，而不包含谜语。

用户有责任记住和存储他们自己的谜语以花费他们的硬币。 通常这些是由钱包软件根据模板即时重新生成的。
