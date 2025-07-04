---
title: 常数、变量和符号 - Chia绿皮书
sidebar_label: 0 - 常数、变量和符号
slug: /chia-blockchain/green-paper/contants-variables-notation
---

# 0 - 常数、变量和符号

## 0.1 重要常数

| 常数        | Description                               |
| ----------- | ----------------------------------------- |
| 10分钟      | 目标 **子时隙（sub-slot）的间隔时长**     |
| 32个区块    | 每个目标 **子时隙的区块数量**             |
| 16/64个区块 | 每个时隙的最小/最大区块数量               |
| 4608个区块  | 平均每个**纪元（epoch）的区块**数量       |
| 384个区块   | 平均每个**子纪元（sub-epoch）的区块**数量 |
| 64个签名点  | 每个**子时隙的签名点**数量                |

由上可得以下结论：

| 隐含的常数 | Description                                                                                                               |
| ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1天        | **一个纪元的时长**为 $$10 {\ \sf min}\cdot\frac{4608{\ \sf blocks}}{32\ \sf blocks}=1440{\ \sf min}\quad (=1{ \sf day})$$ |
| 2小时      | **目标**子纪元的时长\*\*\*\*                                                                                              |
| 18.75秒    | 平均**完成一个区块的时长**为 $\frac{10{\sf\ min}}{32}=18.75 {\sf\ sec}$                                                   |
| 9.375秒    | **签名点之间的时长**为 $\frac{600}{64}=9.375 {\sf\ sec}$                                                                  |

## 0.2 重要变量

| 变量               | Description                                                                      |
| ------------------ | -------------------------------------------------------------------------------- |
| $D\in{\mathbb N}$  | 难度参数。 每个纪元重新校准一次，以满足每个时隙（slot）32个区块的目标            |
| $T\in {\mathbb N}$ | 时间参数（子时隙的VDF步数）。 每个纪元重新校准一次，以满足每个子时隙10分钟的目标 |

## 0.3 提示

:::info 目标 0:
我们将使用像这样的蓝色方框来提及我们希望Chia设计满足的关键目标
:::

:::tip 设计选择 0:
像这样的绿色方框用于突出重要的设计选择，通常会涉及到目标。
:::

:::danger 安全提示 0:
红色方框强调了Chia安全所需的一些重要方面，通常会涉及到某些设计选择。
:::
