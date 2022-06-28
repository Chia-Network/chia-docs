---
sidebar_position: 1
---

# 12.1 Chia RPC API

> Chia RPC API

奇亚节点和服务带有一个 JSON rpc api 服务器，允许您访问信息和控制服务。这些可以通过 HTTP、网络套接字或通过客户端 SDK 访问。 端口可以在 `~/.chia/mainnet/config/config.yaml`。rpc 端口不应暴露在互联网上。TLS 证书用于保护通信。

<details>
<summary>原文参考</summary>

The chia node and services come with a JSON rpc api server that allows you to access information and control the services.
These are accessible via HTTP, WebSockets, or via client SDKs.
The ports can be configured in `~/.chia/mainnet/config/config.yaml`.
The rpc ports should not be exposed to the internet.
TLS certificates are used to secure the communication.

</details>

## 默认端口：

- 守护进程：55400
- 全节点：8555
- 农民：8559
- 收割机：8560
- 钱包：9256

<details>
<summary>原文参考</summary>

- ### Default Ports:

- Daemon: 55400
- Full Node: 8555
- Farmer: 8559
- Harvester: 8560
- Wallet: 9256

</details>

## HTTP/JSON

从命令行调用 RPC 时必须使用证书，确保为您正在调用的服务使用正确的证书。所有端点都是用 POST 和 JSON 数据制作的。响应是一个带有成功字段的 JSON 字典，它可以是 true 或 false。

<details>
<summary>原文参考</summary>

- ### HTTP/JSON

The certificates must be used when calling the RPCs from the command line, make sure to use the correct certificates for the services you are calling.
All endpoints are made with POST with JSON data. The response is a JSON dictionary with a success field, which can be true or false.

</details>

## 网络套接字

如果您使用的是网络套接字 API，您可以直接通过守护进程来路由请求。每个网络套接字消息都包含以下字段：TODO：解释如何调用 Websocket RPC，示例可以在这里找到：[https](https://github.com/Chia-Mine/chia-agent) : [//github.com/Chia-Mine/chia-agent](https://github.com/Chia-Mine/chia-agent) 。

```json
{
  "command": "get_blockchain_state",
  "ack": false,
  "data": {},
  "request_id": "123456",
  "destination": "wallet",
  "origin": "ui"
}
```

<details>
<summary>原文参考</summary>

- ### WebSockets

If you are using the Websockets API, you can go directly through the daemon, which routes requests. Each WebSocket message contains the following fields:
TODO: Explain how to call a Websocket RPC, examples can be found here: https://github.com/Chia-Mine/chia-agent.

```json
{
  "command": "get_blockchain_state",
  "ack": false,
  "data": {},
  "request_id": "123456",
  "destination": "wallet",
  "origin": "ui"
}
```

</details>

## Python

大多数 rpc 方法都可以通过 `chia-blockchain/chia/rpc`。有关使用示例，请参阅命令行实现（奇亚钱包、奇亚展示等）。

<details>
<summary>原文参考</summary>

- ### Python

Most of the rpc methods are accessible through the different client objects in `chia-blockchain/chia/rpc`.
For examples of usage, see the command line implementation (chia wallet, chia show, etc).

</details>

## Javascript

可以在此处找到 javascript 客户端：https://github.com/Chia-Mine/chia-agent 。这里还有另一个客户端：https://github.com/freddiecoleman/chia-client 。

<details>
<summary>原文参考</summary>

- ### Javascript

A javascript client can be found here: https://github.com/Chia-Mine/chia-agent.
There is also another client here: https://github.com/freddiecoleman/chia-client.

</details>

## 服务

服务 RPC API 记录在以下部分：

- 共享：所有服务共享的 RPC
- 全节点
- 农民
- 收割机
- 时间领主
- 钱包（这个 API 仍然是一个 WIP，可能很快会改变）

<details>
<summary>原文参考</summary>

- ## Services

The service RPC APIs are documented in the following sections:
TODO: add links here and create the other sections

- Shared: RPCs that all services share
- Full Node
- Farmer
- Harvester
- Timelord
- Wallet (This API is still a WIP and likely to change soon)

</details>
