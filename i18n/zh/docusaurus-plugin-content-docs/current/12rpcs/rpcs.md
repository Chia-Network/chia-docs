---
sidebar_position: 1
---

# 12.1 Chia RPC API

奇亚节点和服务带有一个 JSON rpc api 服务器，允许您访问信息和控制服务。 这些可以通过 HTTP、网络套接字或通过客户端 SDK 访问。 端口可以在 `~/.chia/mainnet/config/config.yaml`。 rpc 端口不应暴露在互联网上。 TLS 证书用于保护通信。

### 默认端口：

- Daemon: 55400
- Full Node: 8555
- Farmer: 8559
- Harvester: 8560
- Wallet: 9256

### HTTP/JSON

从命令行调用 RPC 时必须使用证书，确保为您正在调用的服务使用正确的证书。 所有端点都是用 POST 和 JSON 数据制作的。 响应是一个带有成功字段的 JSON 字典，它可以是 true 或 false。

### ### WebSockets

如果您使用的是网络套接字 API，您可以直接通过守护进程来路由请求。 每个网络套接字消息都包含以下字段：TODO：解释如何调用 Websocket RPC，示例可以在这里找到：[https](https://github.com/Chia-Mine/chia-agent) : [//github.com/Chia-Mine/chia-agent](https://github.com/Chia-Mine/chia-agent) 。

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

### Python

大多数 rpc 方法都可以通过 `chia-blockchain/chia/rpc`。 有关使用示例，请参阅命令行实现（奇亚钱包、奇亚展示等）。

### Javascript

可以在此处找到 javascript 客户端：https://github.com/Chia-Mine/chia-agent 。 这里还有另一个客户端：https://github.com/freddiecoleman/chia-client 。

## 服务

The service RPC APIs are documented in the following sections: TODO: add links here and create the other sections

- Shared: RPCs that all services share
- Full Node
- Farmer
- Harvester
- Timelord
- Wallet (This API is still a WIP and likely to change soon)
