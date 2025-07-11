---
title: K值大小
slug: /chia-blockchain/resources/k-sizes
---

# K值大小与压缩等级

| 压缩等级 | 地块大小 k=32（GiB） | 地块大小 k=32（GB） | 地块大小 k=33（GiB） | 地块大小 k=34（GiB） | 地块大小 k=35（GiB） |
| -------- | -------------------- | ------------------- | -------------------- | -------------------- | -------------------- |
| 0        | 101.4                | 108.8               | 208.8                | 429.9                | 884.1                |
| 1        | 87.5                 | 94.0                | 179.6                | 368.2                | 754.3                |
| 2        | 86.0                 | 92.4                | 176.6                | 362.1                | 742.2                |
| 3        | 84.5                 | 90.7                | 173.4                | 355.9                | 729.7                |
| 4        | 82.9                 | 89.0                | 170.2                | 349.4                | 716.8                |
| 5        | 81.3                 | 87.2                | 167.0                | 343.0                | 704.0                |
| 6        | 79.6                 | 85.5                | 163.8                | 336.6                | 691.1                |
| 7        | 78.0                 | 83.8                | 160.6                | 330.2                | 678.3                |
| 9        | 75.2                 | 80.7                | 154.1                | 315.5                | 645.8                |

:::info
**k=32**是可用于耕种（farming）的最小地块。 尽管可能会看到k=25，但这仅用于测试目的。
:::  
在规划地块生成过程中所需的空间时，只需计算临时磁盘的大小要求。

如果是进行交替生成地块，磁盘大小要求可能会根据生成地块处于不同阶段而有所改变。

## 大于k=32的地块

虽然不是必需的，但可以创建大于k=32的地块。 使用更大的地块并没有太大的好处，因为获胜的机会与最终地块文件的大小成比例。 虽然有一些高级策略可以使用更大的`k`值来减少未使用的存储空间或优化驱动器的空闲状态，但这不适用于大多数人。
