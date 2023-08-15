---
title: 生成地块软件
slug: /plotting-software
---

## 生成地块软件

我们在Chia中引入了 GUI和CLI中创建地块时选择备用生成地块软件的功能。

Chia开发了Bladebit套件生成地块软件，其中包括Bladebit cudaplot、ramplot和diskplot。 主网发布时的参考实现是Chiapos，现在不再使用，但仍然作为参考存在。

### Bladebit cudaplot

状态：alpha

[https://downloads.chia.net/bladebit](https://downloads.chia.net/bladebit)

Requirements

- 操作系统：Windows和Linux
- 内存：256GB的DRAM
- GPU：具备CUDA能力5.2（NVIDIA 10系列GPU或更高），具备8GB的GPU VRAM

用法

```bash
bladebit_cuda -f <农民公钥> -c <耕种池合约地址> -n 1 cudaplot /mnt/ssd
```

### Bladebit [diskplot](https://www.chia.net/2022/08/08/announcing-bladebit-2-0/)

- 仍然使用临时存储来创建地块，适用于大多数农民
- 非常低的最小内存要求（2-4G），适用于嵌入式或入门级系统的低资源生成地块
- 跨平台和操作系统兼容性
- 顺序写入可以更好地利用SSD的突发性能，并通过减少写入放大系数减少SSD的损耗
- 可以使用DRAM写入缓存来显著减少SSD的写入，并且可以利用任何额外的增量（没有最低要求）
- 充分利用PCIe 4.0的增加磁盘带宽
- 流水线性能（Pipelined performance）以充分利用CPU

用法

Example with temporary SSD mounted to /mnt/ssd1 and destination drive as /mnt/ssd2, and using 100GB of DRAM cache to reduce temporary disk writes

```bash
bladebit -t <system threads - 1> -f <farmer key> -c <contract address> -n 1 diskplot -t1 /mnt/ssd1/ -b 64 --cache 100G -a /mnt/ssd2
```

### Bladebit ramplot

用法

```bash
bladebit -t <系统线程数 - 1> -f <农民公钥> -c <耕种池合约地址> -n 1 ramplot /mnt/ssd
```

### 其它第三方生成地块软件

可以在[https://xch.farm/plotting/](https://xch.farm/plotting/)的列表中找到其他第三方生成地块软件，如madMAx的Gigahorse和chia-plotter。

## 如何在Chia中使用

有一个新的`chia`命令用于创建地块，称为`plotters`。 为了兼容性，原始的创建地块命令`chia plots create`仍然存在，但这将始终使用参考的chiapos生成地块软件。 要使用其他生成地块软件，必须使用新的`chia plotters`命令。 每个生成地块软件的命令行选项都不同，因此务必使用`chia plotters <plotter> -h`检查可用的选项。 可用的生成地块软件值包括"chiapos"、"bladebit"和"madmax"。

UI界面还具有支持选择生成地块软件的新功能。

注意：并非所有功能都适用于每个生成地块软件。

## Installation

在每个平台的安装程序中，bladebit和madMAx生成地块软件将打包在一起。 使用安装包（deb、rpm、dmg、exe）是获得适用于备用生成地块软件的最简便方法。 Chia支持使用这种方式来安装和使用备用生成地块软件。

在通过克隆chia-blockchain git存储库运行Chia时，可以让Chia CLI从源代码构建和安装BladeBit和madmax生成地块软件。 要安装生成地块软件，请使用`chia plotters install <plotter>`命令，其中`<plotter>`可以是"bladebit"或"madmax"。 Chia将尝试配置和构建指定的生成地块软件，但是操作系统环境的变化可能会导致构建失败。 使用`chia plotters install`命令时，源码及编译完成的地块生成软件将保留在macOS和Linux上的`~/.chia/mainnet/plotters`目录中，或者在Windows上的`%HOMEDRIVE%%HOMEPATH%\.chia\mainnet\plotters`目录中。
