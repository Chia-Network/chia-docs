---
title: 生成地块基础知识
slug: /plotting-basics
---

生成地块过程涉及在用户的存储设备上生成和存储唯一的加密数据，称为"地块"（plots）。 地块文件向网络证明用户正在存储数据，并用于Chia的时空证明（Proof of Space and Time）共识。 Here is a high-level overview of the Chia plotting process

In practical terms, plotting is the initialization of a Chia farm. Chia生成地块过程需要大量的计算，但每个地块只需要执行一次。 在此过程中，用户的CPU、内存和存储设备（如SSD）将被大量使用。 然而，一旦地块被创建和存储，耕种（farming）过程对用户的硬件影响较小。 一旦创建了地块，耕种只需要少量的磁盘I/O来响应网络挑战并提交空间证明（proofs of space）。

## Requirements

### K值

Chia的最小K值是k=32，对应108.8GB。 K=32是网络中最常见的大小，占据了98%的网络容量。 The sizes of uncompressed and compressed k values can be found on the [K Sizes page](/k-sizes)

### 密钥

要创建地块，农民（farmer）必须知道他们的**农民公钥**（Farmer Public Key），以及一个**矿池公钥**或**耕种池合约地址**（Pool Contract Address）。 大多数农民希望能够独立耕种或加入耕种池，并希望使用耕种池合约地址。 农民必须首先创建一个联合耕种农田（plotnft）以获得耕种池合约地址。

These can be found with the following commands:

```bash
chia keys show
chia plotnft show
```

## 硬件

生成地块需要计算资源，计算资源越多，生成地块时间越快。 Chia农民通常希望绘制速度较快，以便更快地使他们的存储空间获得奖励。 使用任何一种磁盘生成地块方法，需要具备高耐用性和持续写入性能的固态硬盘（SSD），更多详情可以在耐用性部分找到。

| 生成地块类型              | CPU | GPU  | 临时存储       | 内存        | 时长            | 能效      |
| ------------------- | --- | ---- | ---------- | --------- | ------------- | ------- |
| GPU In-Memory       | Low | 高    | None       | 256 GB    | 1-3 Minutes   | Highest |
| GPU / Disk Plotting | Low | 高    | 256 GB     | 64-128 GB | 3-5 Minutes   | 高       |
| CPU In-Memory       | 高   | None | None       | 416 GiB   | 2-5 Minutes   | 高       |
| CPU Disk            | 高   | None | 256-512 GB | 4 GB      | 15-60 Minutes | Medium  |

## 图形用户界面（GUI）生成地块

通过单击绿色按钮**生成地块**开始生成地块过程。

1. 需要选择一个生成地块的软件。 使用Bladebit Disk生成地块是最简单的方法。

2. 设置初始地块大小为k=32（101 GiB）。

3. 选择要绘制的地块数量。 如果刚开始学习，请先创建一个地块。

4. 选择临时目录。 需要一个至少500GB的临时存储位置。 如果只有256GB的空间，可以使用madMAx的chia-plotter。 这是填充临时空间的地方，会进行大量的写入。 如果有许多地块，不建议使用与主磁盘相同的SSD。

5. 输入线程数（推荐系统线程-1），bucket数（推荐64），可选的额外内存缓存量，并选择交替方法。

:::info
企业级和数据中心级SSD相比消费级SSD具有更高的耐久性和持续写入性能，并且可以在二手市场上以较低的价格找到。 请在[SSD耐久性](/ssd-endurance)部分阅读更多推荐建议。
:::

6. 选择最终目录。 这是最终的地块文件将被复制到的地方。 一旦创建了地块，它将被移到这个位置以进行耕种并赚取XCH。 由于地块的大小，存储空间会很快填满。 存储可以是内部或USB连接的硬盘。

:::info
使用网络驱动器也可以，但可能会导致本地网络拥塞，或者对于奖励来说响应速度太慢（最大值是30秒，但5秒以下是理想的）。 建议将`config.yaml`中将第一个`log_level`设置为`INFO`，这样可以在`debug.log`中看到这些额外信息。
:::

7. 加入一个联合耕种池（pool） - 这将允许选择已经创建的联合耕种农田。

8. 点击**新建**开始生成地块过程。

## 如何获得帮助

- 在[Discord](https://discord.gg/chia)上获得支持。 **#beginner**和**#support**频道可以获取帮助。

- 在[生成地块问答](/plotting-faq)中获取更多问题的解答。
