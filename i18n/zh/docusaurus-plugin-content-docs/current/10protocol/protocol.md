---
sidebar_position: 1
---

# 10.1 奇亚协议

奇亚协议由几个不同的子协议组成。 所有协议消息都以可流式传输格式编码发送，使用[第 7 节](/docs/07networking/networking "Section 3.7: Networking")中定义的网络协议。 以下文档深入介绍了每种类型的服务/节点发送的消息，以及如何解释它们。

The protocol is asynchronous and bidirectional, that is, each end of the connection can send messages, and receive a response, multiple responses, or no response for each message.

1. Harvester protocol (harvester <-> farmer)
2. Farmer protocol (farmer <-> full node)
3. Timelord protocol (timelord <-> full node)
4. Peer protocol (full node <-> full node)
5. Pool protocol (pool <-> farmer)
6. Wallet protocol (wallet/light client <-> full node)
