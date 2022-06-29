---
sidebar_position: 1
---

# 14.1 chia-blockchain

> chia-blockchain

`chia-blockchain` 是奇亚协议的第一个官方实现。它是用 python 编写的，有一些依赖项是用 C++ 或 rust 编写的，以提高性能。它是由奇亚团队和开源贡献者从头开始编写的，不是任何其他区块链系统的分支。

https://github.com/Chia-Network/chia-blockchain

代码库分为几个子文件夹，这些子文件夹对系统不同组件上的代码进行分类。在源根目录（奇亚文件夹）内。

- **cmds**：包含命令行界面程序，它是围绕奇亚 RPC api 的 Python 包装器。运行命令时，会直接与本地运行的奇亚服务建立连接。
- **共识**：具有高风险更改的共识关键代码。
- **守护进程**：运行守护进程、启动和停止其他服务的服务器。
- **农民**：农民服务器，负责处理签名区块、协调收割机并与节点通信。
- **全节点**：奇亚的很大一部分业务逻辑都在这里，存储区块和币，全节点协议等。
- **收割机**：
- 介绍人
- 绘图员
- 绘图
- 矿池
- 协议
- 程序
- 服务器
- 模拟器
- ssl
- 时间领主
- 类型
- 实用程序
- 钱包

<details>
<summary>原文参考</summary>

`chia-blockchain` is the first and official implementation of the Chia protocol. It is written
in python, with a few dependencies written in C++ or rust in order to improve performance. It
is written from the ground up by the Chia team as well as open source contributors, and is not
a fork of any other blockchain system.

https://github.com/Chia-Network/chia-blockchain

The codebase is split into several subfolders which categorize code on the different components
of the system. Inside the source root (chia folder).

- **cmds**: Contains the command line interface program, wihch is a python wrapper around the chia RPC api. When a command is run, a connection is established directly to the Chia services running locally.
- **consensus**: Consensus critical code that is high risk to change.
- **daemon**: Server that runs the daemon, launching and stopping the other services.
- **farmer**: Farmer server which handles signing blocks, coordinating the harvesters and communicating with a node.
- **full_node**: A large portion of the business logic of Chia is here, storing blocks and coins, full node protocol, etc.
- **harvester**:
- introducer
- plotters
- plotting
- pools
- protocols
- rpc
- server
- simulator
- ssl
- timelord
- types
- util
- wallet

</details>
