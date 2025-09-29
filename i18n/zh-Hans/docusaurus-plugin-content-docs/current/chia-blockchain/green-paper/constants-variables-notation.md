---
title: 常数、变量和符号 - Chia绿皮书
sidebar_label: 0 - 常数、变量和符号
slug: /chia-blockchain/green-paper/constants-variables-notation
---

# 0 - 常数、变量和符号

## 0.1 重要常数

| 常数        | Description                                |
| ----------- | ------------------------------------------ |
| 10分钟      | target **duration of a sub-slot**          |
| 32个区块    | target **number of blocks per sub-slot**   |
| 16/64个区块 | 每个时隙的最小/最大区块数量                |
| 4608个区块  | average number of **blocks per epoch**     |
| 384个区块   | average number of **blocks per sub-epoch** |
| 64个签名点  | number of **signage points per sub-slot**  |

由上可得以下结论：

| 隐含的常数 | Description                                                                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| 1天        | **target time of an epoch** is $$10 {\ \sf min}\cdot\frac{4608{\ \sf blocks}}{32\ \sf blocks}=1440{\ \sf min}\quad (=1{ \sf day})$$ |
| 2小时      | **target time of sub-epoch**                                                                                                        |
| 18.75秒    | **target average block arrival time** is $\frac{10{\sf\ min}}{32}=18.75 {\sf\ sec}$                                                 |
| 9.375秒    | **target time between signage points** is $\frac{600}{64}=9.375 {\sf\ sec}$                                                         |

## 0.2 重要变量

| 变量               | Description                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| $D\in{\mathbb N}$  | 难度参数。 每个纪元重新校准一次，以满足每个时隙（slot）32个区块的目标            |
| $T\in {\mathbb N}$ | 时间参数（子时隙的VDF步数）。 每个纪元重新校准一次，以满足每个子时隙10分钟的目标 |

## 0.3 提示

:::info Objective 0:
We will use blue boxes like this one to mention key objectives we want the design of Chia to satisfy
:::

:::tip Design Choice 0:
Green boxes like this are used to highlight important design choices, which often will refer to objectives.
:::

:::danger Security Notice 0:
A red box stresses some important aspects required for the security of Chia, and will typically refer to some design choice.
:::
