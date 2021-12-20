---
sidebar_position: 1
---

# 10.1 Chia 协议

> Chia Protocol

Chia 协议由几个不同的子协议组成。所有协议消息都以 Streamable 格式编码发送，使用[第 7 节](/docs/07networking/networking "Section 3.7: Networking")中定义的网络协议。以下文档深入介绍了每种类型的服务/节点发送的消息，以及如何解释它们。

该协议是异步双向的，即连接的每一端都可以发送消息，也可以接收一个响应，多个响应，或者每条消息不响应。

1. 收割机协议（收割机<->农民）
2. Farmer 协议（farmer <-> 全节点）
3. Timelord协议（timelord <->全节点）
4. 对等协议（全节点<->全节点）
5. 池协议（pool <-> farmer）
6. 钱包协议（钱包/轻客户端<->全节点）

<details>
<summary>原文参考</summary>

The Chia protocol is composed of a few different sub-protocols. All protocol messages are sent encoded in Streamable format, using the networking protocol defined in [Section 7](/docs/07networking/networking "Section 3.7: Networking"). The following documents go into depth into the messages sent by each type of service/node, and how they should be interpreted.

The protocol is asynchronous and bidirectional, that is, each end of the connection can send messages, and receive a response, multiple responses, or no response for each message.

1. Harvester protocol (harvester <-> farmer)
2. Farmer protocol (farmer <-> full node)
3. Timelord protocol (timelord <-> full node)
4. Peer protocol (full node <-> full node)
5. Pool protocol (pool <-> farmer)
6. Wallet protocol (wallet/light client <-> full node)

</details>
