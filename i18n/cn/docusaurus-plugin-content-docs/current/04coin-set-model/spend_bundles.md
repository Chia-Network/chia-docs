---
sidebar_position: 3
---

# 4.3 消费捆绑包

> Spend Bundles

支出包是一组多币种的支出，通常提交给完整节点以包含在区块链中。在比特币中，相关的数据结构是交易。

```python
class CoinSpend:
    coin: Coin
    puzzle_reveal: SerializedProgram
    solution: SerializedProgram

class SpendBundle:
    coin_spends: List[CoinSpend]
    aggregated_signature: G2Element
```

正如您在上面的代码示例中看到的那样，一个花费包是一组硬币花费，其中每个硬币花费包括正在花费的硬币、拼图程序和解决方案程序。每个解决方案都被传递到每个谜题中，并通过 clvm 运行，在那里它输出条件。两个条件：`AGG_SIG_ME`并`AGG_SIG_UNSAFE`要求有签名才能使支出有效。

通常，在进行交易时，用户会合并多次消费，以实现交易的预期价值。用户还可以组合代表`CATs`（Chia Asset Tokens）的硬币，并在同一个消费包中发送不同类型的价值。

<details>
<summary>原文参考</summary>

A spend bundle is a set of spends of multiple coins, which is usually submitted to full nodes for inclusion into the
blockchain. In Bitcoin, the relevant data structure would be the transaction. 


```python
class CoinSpend:
    coin: Coin
    puzzle_reveal: SerializedProgram
    solution: SerializedProgram

class SpendBundle:
    coin_spends: List[CoinSpend]
    aggregated_signature: G2Element
```

As you can see in the code sample above, a spend bundle is a group of coin spends, where each coin spend includes
the coin being spent, the puzzle program, and the solution program. Each solution is passed into each puzzle and 
run through the clvm, where it outputs conditions. Two of the conditions: `AGG_SIG_ME` and `AGG_SIG_UNSAFE` require
that a signature be present for the spend to be valid.

Usually, when making a transaction, a user would combine multiple spends, to achieve the desired value of the 
transaction. Users can also combine coins that represent `CATs` (Chia Asset Tokens), and send different types
of values in the same spend bundle.

</details>

## 聚合签名

像比特币这样的以前的系统中，每笔支出都有自己的一个或多个签名，每个`(public key, message)` 组合一个。然后，每个签名s_i都将通过签名验证算法：`V(s, m, pk) -> T/F`，带有消息`m`和公钥`pk`，并且如果`V`返回 true 则有效。

但是，在 Chia 中，使用 BLS 签名，并且可以将这些签名组合（添加）在一起以生成与原始签名相同大小的聚合签名。因此，假设我们有三个支出包，每个都有自己的一对：

```
s1 m1 pk1
s2 m2 pk2
s3 m3 pk3
```

使用 BLS 签名，农民可以将所有三个签名`s1, s2, and s3`合并为一个签名`s_agg`。BLS 签名验证可以采用多个公钥和消息：`V(s, [m1, m2, ... mx], [pk1, pk2, ... pkx]) -> T/F`. 这允许农民将所有三个花费包合并为一个花费包，只有一个签名。在创建区块时，进入区块的所有支出包都被合并为 1 个带有 1 个签名的支出包，这意味着传输和存储在磁盘上的数据更少。

这些聚合签名的另一个好处是，当花费多个硬币时，用户只会传输一个签名，而不是每次花费一个或多个。更多信息可以在[这里](/docs/09keys/keys-and-signatures)找到，代码可以在[这里](https://github.com/Chia-Network/bls-signatures)阅读。

<details>
<summary>原文参考</summary>

- ## Aggregate Signatures

In previous systems like Bitcoin, each spend would have it's own signature or signatures, one for each `(public key, message)`
combination. Then, each signature `s_i` would be passed through a signature verification algorithm: `V(s, m, pk) -> T/F`,
with the message `m` and public key `pk`, and would be valid iff `V` returns true.

However, in Chia, BLS signatures are used, and these signatures can be combined (added) together to produce an aggregate
signature of the same size as the originals. So let's say we have three spendbundles, each with it's own pair:
```
s1 m1 pk1
s2 m2 pk2
s3 m3 pk3
```

With BLS signatures, farmers can combine all three signatures `s1, s2, and s3` into one signature `s_agg`. The BLS
signature verification can take multiple public keys and messages: `V(s, [m1, m2, ... mx], [pk1, pk2, ... pkx]) -> T/F`.
This allows the farmer to combine all three spend bundles into one spend bundle, with only one signature. When creating the block,
all spend bundles that go into the block are combined into exactly 1 spend bundle with 1 signature, which means less
data is transmitted and stored on disk.

Another benefit of these aggregate signatures, is that when spending multiple coins, users will only transmit one signature, instead of
1 or more per spend. More information can be found [here](/docs/09keys/keys-and-signatures) and the code can be read [here](https://github.com/Chia-Network/bls-signatures).

</details>

## 硬币与花费捆绑

Chia 和其他基于 UTXO 的区块链系统之间的一个主要区别是，支出包不是块数据库中的第一类对象。chia 中的每个块都包含删除和添加的列表，其中删除是在该块中花费的硬币，而添加是在该块中添加的硬币。

假设一个农民想要将 1000 个消费包包含在一个块中。首先，他们可以将所有的支出包合并为一个，然后他们可以制作区块。每个区块的所有支出都只有一个签名。验证并存储这个区块的全节点，不需要知道哪些花费与哪些其他花费捆绑在一起的原始信息。

<details>
<summary>原文参考</summary>

- ## Coins vs Spend Bundles

One major difference between Chia and other UTXO based blockchain systems, is that spend bundles are not a first class
object in the block database. Each block in chia contains a list of removals and additions, where removals are the coins
spent in that block, and additions are the coins added in that block.

Let's say a farmer wants to include 1000 spend bundles into a block. First, they can combine all spend bundles into one,
and then they can make the block. Each block will have exactly one signature for all spends. Full nodes that verify and store this block, do not need to know the original
information of which spends were bundled with which other spends. 

</details>

## 添加和删​​除

在下图中，您可以看到用户创建的支出包。支出包中的移除是代币 A、B 和 C，增加的是代币 C 和 D。这与标准交易脚本在 中的工作方式非常相似`chia-blockchain`。

<figure>

![](/img/spend_bundle.png)

</figure>

让我们来看看图像中的不同组件。首先，假设用户 Alice 想要向接收方 Bob 发送 13 个 XCH。Alice 查看她的硬币数据库，并选择 3 个未使用的硬币（A、B 和 C），它们加起来至少有 13 个 XCH。这些硬币中的每一个都有一个相关的 clvm 拼图，里面有一个公钥编码。让我们表示这些公开密钥的`pkA`，`pkB`和`pkC`。Alice 需要为每笔支出生成谜题和解决方案，以创建支出包。

每个谜题在与解决方案一起运行时，都会返回一个`AGG_SIG`条件，这意味着需要来自相应公钥的签名才能使此支出有效。我们可以使用 BLS 签名算法将所有三个签名合并为一个签名，而不是提供 3 个签名。这意味着生成的支出包将以字节为单位更小，并且支出包无法拆分，因为签名无法解聚。也就是说，攻击者获得了 Alice 的支出包，不能选择花费 B 币而不是 A 币。 当 Alice 将此支出包发送到 Chia 网络时，其他全节点将运行 CLVM 程序，收集所有`AGG_SIG`条件，然后进行验证他们使用支出包中提供的聚合签名。

硬币 A 的第一个谜题也返回两个`CREATE_COIN`条件。这意味着必须将两个硬币添加到硬币数据库中才能使支出 A 有效。硬币 D 是给 Bob 的（拼图哈希 0x1b54f 和 13 XCH）。硬币 E 是给 Alice 的找零硬币。由于每枚硬币的价值必须全部花完，Alice 需要发送 1 个 XCH 给自己，因为她花了 14 个 XCH，但只想发送 13 个 XCH。请注意，硬币 E 的拼图哈希与硬币 A 相同。拼图哈希可以重复使用。当花费硬币 E 时，Alice 将使用与以前相同的密钥进行签名，但很可能是花费给另一个收件人的不同消息。

请注意，只有第一次花费是创建硬币。这是合并支出的正常方式，因为每个代币必须只有一个父代币。尽管单独花费 A 是无效的，但由于它仅从 5 个 XCH 中创建了 14 个 XCH，再加上花费 B 和 C，它是有效的。

全节点接收、验证并在内存中存储支出包。但是，在创建新区块时，农业节点会将来自不同用户的许多消费捆绑组合在一起，以创建 1 个具有一个签名的非常大的消费捆绑。仅查看区块时，并不总是清楚最初将哪些支出捆绑在一起。但是，我们可以看到整个区块的净增减。

<details>
<summary>原文参考</summary>

- ## Additions and Removals

In the figure below, you can see a spend bundle that was created by a user. The removals in the spend bundle are 
coins A, B, and C, and the additions are coins C and D. This is very similar to how the standard transaction script
works in `chia-blockchain`.

<figure>

![](/img/spend_bundle.png)

</figure>

Let's go through the different components in the image. First, let's say the user Alice wants to send 13 XCH to a 
recipient Bob. Alice looks at her coin database, and selects 3 unspent coins (A, B, and C) that add up to at least 
13 XCH. Each one of these coins has an associated clvm puzzle, which has a public key encoded inside of it. Let's 
denote these public keys as `pkA`, `pkB`, and `pkC`.  Alice needs to generate the puzzle and solution for each of the
spends, in order to create the spend bundle.

Each puzzle, when ran with the solutions, returns an `AGG_SIG` condition, which means that a
signature is required from the respective public key, in order for this spend to be valid. 
Instead of providing 3 signatures, we can use BLS signature arithmetic to combine all three into one signature.
This means that the resulting spend bundle will be smaller in bytes, and that the spend bundle can not be unbundled,
because the signature cannot be de-aggregated. That is, an attacker that obtains Alice's spend bundle, cannot choose to
spend coin B but not coin A. When Alice sends this spend bundle to the Chia network, other full nodes will run the CLVM
programs, collect all the `AGG_SIG` conditions, and then verify them using the aggregate signature provided in the spend bundle.

The first puzzle here for coin A also returns two `CREATE_COIN` conditions. This means that two coins must be added
to the coin database in order for spend A to be valid. Coin D is for Bob (puzzle hash 0x1b54f and 13 XCH). Coin E is a 
change coin for Alice. Since each coin's value must be spent entirely, Alice needs to send 1 XCH to herself since she
spent 14XCH, but only wanted to send 13 XCH. Note that the puzzle hash for coin E is the same as coin A. Puzzle hashes
can be reused. When spending coin E, Alice would sign with the same key as before, but most likely a different message
that spends to another recipient.

Note that only the first spend is creating the coins. This is the normal way to combine spends, since each coin must 
have exactly one parent. Although spend A alone would not be valid, since it creates 14 XCH out of only 5 XCH, combined
with spends B and C, it is valid.

Full nodes receieve, validate, and store the spend bundle in memory. However, when creating a new block, farming nodes
will combine many spend bundles from different users together, to create 1 very large spend bundle, with one signature.
When looking at just the block, it is not always clear which spends were bundled together initially. However, we can 
see the net additions and removals in the whole block.

</details>

## 全节点存储在区块链中的内容是什么？

完整节点存储区块链的历史，其中包括所有已用硬币的所有谜题和解决方案。它们还包括在钱币商店，这确实未用硬币名单**不**包含拼图，拼图只散列。用户负责记住和存储他们自己的谜题以花费他们的硬币。通常这些是由钱包软件根据一些模板即时重新生成的。

<details>
<summary>原文参考</summary>

- ## What is stored in the blockchain, by full nodes?

Full nodes store the history of the blockchain, which includes all revealed puzzles and solutions for all spent coins.
They also include a list of unspent coins in the coin store, which does **not** contain puzzles, only puzzles hashes.
User's are responsible for remembering and storing their own puzzles in order to spend their coins. Usually these are
regenerated on the fly by wallet software, based on some templates.

</details>
