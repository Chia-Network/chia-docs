---
title: 收割机
slug: harvester-architecture
---

收割机是一些独立的机器，由农民控制。 在大规模耕作活动中，农民可能与许多收割机连接在一起。

收割机通过从磁盘检索质量或证明来控制实际的绘图文件。 最小容量的图(也是最常见的) 是 k32，大约相当于100 GiB。 每次递增一个k值，绘图大小大约加倍，所以一块k33地块大约为200 GiB，k34大约为400 GiB等。

每4608个区块，难度水平会自动调整，为每两个信标点选择一个空间证明——在整个网络空间上。 这是目标平均值——每个信标点也可以有零或多个证明。 这导致大约每24小时会进行难度调整。

在一个指定地块，收割机必须执行两项任务才能找到有效的证明：

1. 获取初始质量 — 这需要进行大约7次随机磁盘扫描，在慢速HDD上就是70毫秒。
2. (仅在初始质量足够高的情况下执行) 获取完整的证明——这需要大约64次磁盘扫描，在慢速HDD上就是 640 毫秒。

就大多数挑战而言，质量 ( 步骤1) 很低，所以没有必要获取全部证明（步骤2）。 一个节点有28秒的时间返回一个证明，所以磁盘I/O 不会是一个限制因素， 即使证明存储在慢速HDD上。

:::注意：
磁带驱动器太慢无法耕种。 The protocol was designed to support hard disks, but nothing slower. It is possible to use tape for long-term plot storage, only transferring the plots to disks for occasional farming, but this is likely a very rare use case.
:::

Finally, harvesters also maintain a private key for each plot. The blocks are signed with these keys, which is an important concept in Chia. It means that even when a farmer is a member of a pool, the farmer still controls the contents of a block. This is quite different from other blockchains' pooling protocols, where the pool operators are the ones signing the blocks.

:::info
The harvester algorithm is discussed in greater detail in the [Harvester Algorithm page](/harvester-algorithm).
:::
