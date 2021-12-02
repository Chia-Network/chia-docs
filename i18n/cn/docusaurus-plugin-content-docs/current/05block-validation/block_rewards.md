---
sidebar_position: 3
---

# 5.3 区块奖励

> Block rewards

发行计划，在 Chia 中也称为区块奖励计划，决定了网络上每个区块创建多少 XCH。1 XCH 或 1 Chia，相当于 1,000,000,000,000 或 1x10^12 或 1 万亿 mojo。所有的共识代码都使用 mojos，Chias 被用作一个方便的更大的单元。

<details>
<summary>原文参考</summary>

The issuance schedule, also referred to as the block reward schedule in Chia determines how many XCH get created with
every block that gets farmed on the network.
1 XCH, or 1 Chia, is equivalent to 1,000,000,000,000 or 1x10^12 or 1 trillion mojos. 
All consensus code uses mojos, Chias are used as a conveniently larger unit.

</details>

## 战略储备（农场前）

网络的第一个区块向 Chia Network Inc 控制的地址支付 2100 万 XCH，分为 1/8 硬币和 7/8 硬币。[商业白皮书](https://www.chia.net/2021/02/10/chia-businesss-whitepaper.html)中描述了资金的用途和未来用途。

<details>
<summary>原文参考</summary>

- ## Strategic Reserve (pre-farm)

The first block of the network pays out 21 million XCH, divided into a 1/8 coin and a 7/8 coin, to a Chia Network Inc
controlled address. The purpose and future usage of the funds is described in the [business whitepaper](https://www.chia.net/2021/02/10/chia-businesss-whitepaper.html).

</details>

## 减半

所有其他硬币都经过一个公式，其中块奖励从每个块 2 XCH 开始，每 3 年减半，总共 4 次。发生`32 * 6 * 24 * 365 * 3 * x`减半的确切块是，其中 x 是减半的索引，从 1 开始。

```
0-3 years: 2 XCH
3-6 years: 1 XCH
6-9 years: 0.5 XCH
9-12 years: 0.25 XCH
12+: 0.125 XCH
```

在第 12 年开始后，将永久创建 0.125 XCH。

<details>
<summary>原文参考</summary>

- ## Halvings

All other coins go through a formula, where the block reward starts at 2 XCH per block, and halves every 3 years, a total
of 4 times. The exact block at which halvings occur is `32 * 6 * 24 * 365 * 3 * x`, where x is the index of the halving,
starting at 1.

```
0-3 years: 2 XCH
3-6 years: 1 XCH
6-9 years: 0.5 XCH
9-12 years: 0.25 XCH
12+: 0.125 XCH
```

After the start of year 12, 0.125 XCH is created in perpetuity.

</details>

## 奖励索赔

Chia 与其他加密货币略有不同，在其他加密货币中，区块的创建者根据当前的区块奖励支付自己的费用。在 Chia 中，区块奖励是在未来的区块中支付的，这取决于农民的区块是否是交易区块。

选项 1：如果农民的区块是交易区块，农民将在下一个交易区块获得报酬 选项 2：如果农民的区块不是交易区块，农民将在下一个交易区块之后的下一个交易区块获得报酬（下一个下一个）。

费用也同时支付。因此，假设农民创建了一个具有 4.9 XCH 输出和 5 XCH 输入（不包括奖励声明）的交易块，然后他们将收到 0.1XCH 作为费用的一部分，加上他们的块奖励，总共 2.1 XCH，在下一个交易块中。

<details>
<summary>原文参考</summary>

- ## Reward claims

Chia is a slightly different from other cryptocurrencies, where the creator of a block pays themselves based on the
current block reward. In Chia, block rewards are paid in a future block, depending on whether the farmer's block is
a transaction block or not.

Option 1: If the farmer's block is a transaction block, the farmer will get paid on the next transaction block
Option 2: If the farmer's block is not a transaction block, the farmer will get paid on the next transaction block after the next transaction block (next next).

Fees are also paid at the same time. So let's say a farmer creates a transaction block with 4.9 XCH of outputs but 5 XCH of inputs (excluding reward claims),
then they will receive the 0.1XCH as part of the fee, plus their block reward, for a total of 2.1 XCH, in the next
transaction block.

</details>

## 农民 vs 矿池奖励

2 XCH 区块奖励（或减半后更少）分为两个硬币。第一个硬币进入农民拼图哈希，由农民指定，通常直接进入农民的钱包。这包含总价值的 1/8，因此前 3 年为 0.25 XCH。这被称为农民硬币。

价值为 7/8 的第二个硬币称为池币，这可以去两个地方之一：如果为获胜地块指定了一个池公钥，则奖励可以发送到任何由该公钥签名的地址公钥。否则，必须将池地址编码到图中，并将硬币发送到池地址。

前者（池公钥）通常用于单独耕作，并直接发送到农民钱包。池地址通常与官方 Chia 池协议一起使用，这里使用支付单例地址。

<details>
<summary>原文参考</summary>

- ## Farmer vs Pool reward

The 2 XCH block reward (or less after halvings) is divided into two coins. The first coin goes to the farmer puzzle hash,
which is specified by the farmer, and usually just goes straight to the farmer's wallet. This contains 1/8 of the total
value, so 0.25 XCH for the first 3 years. This is referred to as the farmer coin. 

The second coin with 7/8 of the value is called the pool coin, and this can go to one of two places: if a pool public
key is specified for the winning plot, then the reward can be sent to any address signed by that public key. Otherwise,
a pool address must be encoded into the plot, and the coins get sent to the pool address.

The former (pool public keys) are usually used for solo farming, and sent directly to the farmer wallet. The pool address
is usually used along with the official Chia pooling protocol, and a pay to singleton address is used here.

</details>
