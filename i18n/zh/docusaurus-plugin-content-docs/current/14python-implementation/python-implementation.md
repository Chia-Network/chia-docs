---
sidebar_position: 1
---

# 14.1 chia-blockchain

`chia-blockchain` 是奇亚协议的第一个官方实现。 它是用 python 编写的，有一些依赖项是用 C++ 或 rust 编写的，以提高性能。 它是由奇亚团队和开源贡献者从头开始编写的，不是任何其他区块链系统的分支。

https://github.com/Chia-Network/chia-blockchain

代码库分为几个子文件夹，这些子文件夹对系统不同组件上的代码进行分类。 在源根目录（奇亚文件夹）内。

- **cmds**：包含命令行界面程序，它是围绕奇亚 RPC api 的 Python 包装器。 运行命令时，会直接与本地运行的奇亚服务建立连接。
- **consensus**: Consensus critical code that is high risk to change.
- **daemon**: Server that runs the daemon, launching and stopping the other services.
- **farmer**: Farmer server which handles signing blocks, coordinating the harvesters and communicating with a node.
- **full_node**: A large portion of the business logic of Chia is here, storing blocks and coins, full node protocol, etc.
- **harvester**:
- **收割机**：
- **农民**：农民服务器，负责处理签名区块、协调收割机并与节点通信。
- **守护进程**：运行守护进程、启动和停止其他服务的服务器。
- **共识**：具有高风险更改的共识关键代码。
- **全节点**：奇亚的很大一部分业务逻辑都在这里，存储区块和币，全节点协议等。
- **cmds**: Contains the command line interface program, wihch is a python wrapper around the chia RPC api. When a command is run, a connection is established directly to the Chia services running locally.
- **server**: Networking and Websocket server.
- **simulator**: A wrapper around the full node which allows creating and farming blocks, and running a local custom blockchain.
- **ssl**: Managing TLS connections and certificates.
- **timelord**: Code for running timelords, which uses the `chiavdf` dependency and connects to vdf clients.
- **types**: Blockchain format and python types used throughout the project.
- **util**: A collection of many utility files and functions used throughout the project.
- **wallet**: Subdirectory containing all code relating to wallets and chialisp. This contains a large amount of code.
