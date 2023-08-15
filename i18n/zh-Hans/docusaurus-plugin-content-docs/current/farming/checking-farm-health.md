---
title: Checking Farm Health
slug: /checking-farm-health
---

# 我的矿场是否健康？ （适用于\*NIX和Linux无图形界面版本）

许多小规模农民（smaller farmers）在连续几天内找不到任何证明（proofs）时会对农场的健康状况感到担忧。 本文档旨在为小规模农民提供一些指标，以确保他们的农场正常运行，即使在未找到任何证明的情况下也可以保持工作状态。

## 请检查您的农场（farm）是否认为正在进行耕种（farming）。

在继续之前，请确保您的农场实际上认为自己正在进行耕种。 有很大的可能性尚未进行耕种，因为仍在同步区块。

要检查您农场的状态，请像往常一样运行 `../activate` 命令（译注：仅通过源码方式安装才需要输入此命令），然后输入 `chia farm summary`。 如果输出的第一行看起来像这样：

```
Farming status: Farming
```

..那么您就知道没有发生更严重的错误。

## 更改日志输出级别

要获取有关农场运行方式的详细信息，您需要将农民（farmer）的日志级别设置为`INFO`。 为此，需要编辑Chia的配置文件，该文件位于`~/.chia/mainnet/config`。 需要查找文件中类似于以下内容的部分：

```
farmer:
  logging: &id001
    log_filename: log/debug.log
    log_level: INFO
    log_stdout: false
```

如果`log_level`的值不是`INFO`，将其相应地更改为`INFO`并保存文件。

## 检查是否有地块通过了初筛

最重要的指标是检查是否有地块通过了收割机器的初筛。 在通常的设置中，这涉及查看`~/.chia/mainnet/log`目录下的日志，在某些回合中，农场机器是否将地块标记为**可进行耕种**（eligible for farming）。

`~/.chia/mainnet/log`目录可能看起来像这样：

```
username@chia-farmer:~/.chia/mainnet/log$ tree
.
username@chia-farmer:~/.chia/mainnet/log$ tree
.
├── debug.log
├── debug.log.1
├── debug.log.2
├── debug.log.3
├── debug.log.4
├── debug.log.5
├── debug.log.6
└── debug.log.7

0 directories, 8 files
```

每个日志文件包含有关Chia运行的所有服务的日志信息。 如果运行的是一个全节点，这些日志可能会很复杂。 我们只关注地块是否通过了初筛。 可以通过运行以下命令来检查：

```bash
cat debug.log | grep "[0-9] plots were eligible for farming"
```

The `cat` command is a \*nix program to get content of a file. 通过管道运算符`|`，我们将输出“传送”给另一个名为`grep`的程序，它可以过滤文本输入。 使用`grep`来过滤出现`"[0-9] plots were eligible for farming"`的内容，以查看是否已经有了符合条件的地块。

示例输出可能如下所示：

```
09:55:43.847 harvester src.harvester.harvester : INFO     1 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.13772 s. Total 100 plots
09:55:52.737 harvester src.harvester.harvester : INFO     3 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.43679 s. Total 100 plots
09:56:01.646 harvester src.harvester.harvester : INFO     2 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.14055 s. Total 100 plots
```

**如果在这里看到类似上面的输出，说明已经在正常耕种了！**

这意味着有地块已经通过了初筛，您的农场似乎正在按预期工作。 对于每个日志文件都进行这样的操作，确认是否有任何中断或是否出现了问题。

## 检查找到的证明

如果之前有符合条件的地块，有可能您已经找到了证明，但该证明未被网络接受。

**请记住，找到证明并不等于赢得一个地块（获得奖励）。 即使找到了证明，它也需要与其他证明竞争并获胜才能真正获得奖励。**

要检查您是否已经找到了证明，可以运行与之前相同的命令，但使用不同的过滤词：

```bash
cat debug.log | grep "Found [1-9] proofs"
```

可能的结果如下所示：

```
12:30:01.492 harvester src.harvester.harvester : INFO     1 plots were eligible for farming 23d3a7c90f... Found 1 proofs. Time: 0.57000 s. Total 100 plots Found 1 proofs. Time: 0.57000 s. Total 100 plots
```

如果对所有的日志文件都进行了相同的操作并得到了类似结果，**太棒了！ **这意味着您的农场完全按预期工作。 可能还没有赢得一个区块，但已经接近成功了一次或多次！

## 双重NAT场景会影响我的农场向网络发送有效的证明吗？

是也不是。 双重NAT虽然有点古怪，但由于Chia支持uPnP（Universal Plug and Play），它应该可以正常工作。 然而，您可能无法通过这种方式将区块发送给其他节点。 "双重NAT"场景发生在客户端（收割机或节点）位于进行了两次NAT的网络内。 通常涉及客户端位于两个路由器后面，而不是一个，如下图所示：

互联网 --> 路由器 --> 路由器 --> 客户端

某些网络设置可能会影响全节点参与耕种（farming）的能力。 只要日志中没有明显的指示耕种（farming）无法正常工作的迹象（特别是与网络相关的ERROR、WARNING标签），这种情况不太可能发生。
