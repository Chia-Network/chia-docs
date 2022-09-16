---
sidebar_position: 3
---

# 5.3 区块奖励

在奇亚中，发行计划，也称为区块奖励计划，决定了网络上每个区块创建多少 XCH。 1 XCH 或 1 奇亚，相当于 1,000,000,000,000 或 1x10^12 或 1 万亿 mojo。 所有的共识代码都使用 mojos，奇亚被用作一个方便的更大的单元。

## 战略储备（农场前）

该网络的第一个区块向奇亚网络公司控制的地址支付了 2100 万 XCH，分为 1/8 硬币和 7/8 硬币。 [商业白皮书](https://www.chia.net/2021/02/10/chia-businesss-whitepaper.html)中描述了资金的用途和未来用途。

## 减半

所有其他硬币都经过一个公式，其中区块奖励从每个区块 2 XCH 开始，每 3 年减半，总共 4 次。 发生减半的确切块是 `32 * 6 * 24 * 365 * 3 * x`，其中 x 是减半的索引，从 1 开始。

```
0-3 years: 2 XCH
3-6 years: 1 XCH
6-9 years: 0.5 XCH
9-12 years: 0.25 XCH
12+: 0.125 XCH
```

After the start of year 12, 0.125 XCH is created in perpetuity.

## 奖励索赔

在大多数加密货币中，区块的创建者根据*当前*区块奖励支付自己的费用。 在 Chia 中，有一点不同——区块奖励在*未来*区块中支付，取决于农民的区块是否是交易区块。

- Option 1: If the farmer's block is a transaction block, the farmer will get paid on the next transaction block.
- Option 2: If the farmer's block is not a transaction block, the farmer will get paid on the next transaction block after the next transaction block (next next).

Fees are also paid at the same time. Let's say a farmer creates a transaction block with 4.9 XCH of outputs, but 5 XCH of inputs (excluding reward claims). In this case, they will receive the remaining 0.1 XCH as a fee, plus their block reward, for a total of 2.1 XCH, in the next transaction block.

因此，奇亚币永远不会被销毁。 在给定的区块中，未添加到新硬币中的已用硬币的任何部分都将作为费用发送给农民。 [chialisp.com](https://chialisp.com/docs/coin_lifecycle#fees-and-the-mempool "Fees and the Mempool section of Chialisp's tutorial on coin lifecycles")中更详细地介绍了该主题。

## 农民 vs 矿池奖励

区块奖励分为两个硬币。 第一个硬币进入农民谜语哈希，由农民指定，通常直接进入农民的钱包。 这包含总价值的 1/8（前 3 年为 0.25 XCH）。 这被称为*农民硬币*。

价值为 7/8 的第二个硬币称为*矿池硬币*。 这枚硬币可以去两个地方之一：

1. 如果为获胜地块指定了*矿池公钥*，则奖励被发送到由该公钥签名的地址。 *矿池公钥*通常用于单人耕作，直接发送到农民的钱包。
2. 否则，必须在地块中编码一个*矿池地址*，并将奖励发送到该地址。 *矿池地址*通常与官方奇亚池化协议一起使用，并使用付费到单例硬币的地址。
