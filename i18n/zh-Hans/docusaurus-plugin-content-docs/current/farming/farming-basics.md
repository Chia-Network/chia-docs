---
title: Farming Basics
slug: /farming-basics
---

耕种（Farming）是[生成地块](/plotting-basics)(/plotting-basics)（plotting）后的下一步。 Once a plot has been created, you have a chance of winning Chia as long as the file is being stored and the Chia farming software is running.

When farming, you allocate a certain amount of storage space in order to have a chance at winning Chia. The more plots you have, the higher your chances of winning. The more plots you have, the higher your chances of winning.

Farming is similar to a lottery. Each plot acts like a lottery ticket, where a new drawing is performed every 9 seconds or so. If you win the lottery, you earn the right to create a new block, and you will be rewarded with Chia. With an average of 4608 blocks a day, you'll have many chances to win.

Our [consensus](/consensus-intro) section has the technical details of how this "lottery" system works.

## 预计获得奖励时间

可以从Chia软件的**耕种**（Farming）选项卡中找到获得奖励的估计时间。 需要注意的是，这只是**一个预估**。 The real time could be 2-5x greater than -- or less than -- this estimation, depending on luck.

:::info
Prior wins (or lack thereof) do not determine new wins. 如果预计获得奖励的时间是一周，但已经过去了三个月，那么离获得奖励并没有更近，与开始时相同。
:::

## 使用联合耕种池来应对

To combat the infrequency and inconsistency of winning, you can [join a pool](/pool-farming). It works similar to a lottery pool. Instead of occasionally earning a large reward, you will frequently earn a small payment. In the long run, pooling and solo-farming (aka **self-pooling**) will yield the same result (minus any pool fee), but pooling is much more predictable, and recommended for most farmers. It works similar to a lottery pool. Instead of occasionally earning a large reward, you will frequently earn a small payment. In the long run, pooling and solo-farming (aka **self-pooling**) will yield the same result (minus any pool fee), but pooling is much more predictable, and recommended for most farmers.

An additional benefit of pooling is instant feedback as to whether your farm is running properly. 如果是独自耕种，可能会不确定自己是否真的能赢得一个区块。 如果是独自耕种，可能会不确定自己是否真的能赢得一个区块。

Chia设计了官方的联合耕种协议（pooling protocol），以一种其他加密货币从未尝试过的方式引入了矿池。 This allows for officially-supported predictability without compromising on decentralization.

## 区块奖励

With each new block, a certain amount of Chia is rewarded to the farmer that created it. With each new block, a certain amount of Chia is rewarded to the farmer that created it. Chia launched with a block reward of 2 XCH per block. This comes out to 64 XCH distributed every 10 minutes. This comes out to 64 XCH distributed every 10 minutes.

Every three years, there is a scheduled halving of the block reward. Every three years, there is a scheduled halving of the block reward. This means that three years after mainnet launch, the block reward is cut in half, to 1 XCH.

以下是完整的区块奖励计划：

| 年份    | 区块奖励      | XCH / 10 mins |
| ----- | --------- | ------------- |
| 1-3   | 2.0 XCH   | 64            |
| 4-6   | 1.0 XCH   | 32            |
| 7-9   | 0.5 XCH   | 16            |
| 10-12 | 0.25 XCH  | 8             |
| 13+   | 0.125 XCH | 4             |

Starting with year 13, block rewards are forever locked in at an average of 4 XCH every 10 minutes.

随着时间的推移，新产生的XCH相对于现有XCH的比例将下降。 因此，Chia的通货膨胀率将持续下降。 Chia's inflation falls through 0.5% 22 years after mainnet launch.
