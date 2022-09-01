---
sidebar_position: 1
---

# 7.1 联网

奇亚协议是异步和点对点的。 它运行在端口 8444（或农民和时间领主的其他端口）上的网络套接字之上。 所有节点既充当客户端又充当服务器，并且可以与其他对等点保持长期连接。

奇亚协议中的每条消息都由字节组成，使用可流式传输格式，并作为网络套接字消息发送。 每条消息由三部分组成。

1. A field spanning 1 byte, representing the type of message being transmitted, and how to decode the data.
2. Second, an optional 2-byte ID, which is used per connection to keep track of requests and responses.
3. Third, the data, which is a Streamable encoded representation of one of the protocol messages.

```python
class Message(Streamable):
    # one of ProtocolMessageTypes
    type: uint8
    # message id
    id: Optional[uint16]
    # Message data for that type
    data: bytes

```

奇亚协议消息的最大 `(4 + 2^32 - 1) = 4294967299` 字节长度约为 4GB。

## 握手

奇亚协议中的所有对等节点（无论是农民、完整节点、时间领主等）都充当服务器和客户端（对等节点）。 一旦在两个对等方之间发起连接，双方都会发送 Handshake 消息和 HandshakeAck 消息以完成握手。 对等方的 节点 ID 是其 [x.509](https://en.wikipedia.org/wiki/X.509) [DER](https://wiki.openssl.org/index.php/DER) 证书的 SHA-256 哈希值 。

```python
class Handshake(Streamable):
    network_id: str                         # Network id, usually the genesis challenge of the blockchain
    protocol_version: str                   # Protocol version to determine which messages the peer supports
    software_version: str                   # Version of the software, to debug and determine feature support
    server_port: uint16                     # Which port the server is listening on
    node_type: uint8                        # NodeType (full node, wallet, farmer, etc.)
    capabilities: List[Tuple[uint16, str]]  # Key value dict to signal support for additional capabilities/features
    capabilities: List[Tuple[uint16, str]]  # Key value dict to signal support for additional capabilities/features

```

After the handshake is completed, both peers can send Chia protocol messages, and disconnect at any time by closing the WebSocket.

## 心跳

心跳消息由网络套接字库定期发送。 因此，无响应的对等点将断开连接。

If a node does not receive any message from a peer for a certain period of time, even if heartbeats are being received, then the node will disconnect and remove the peer from the active peer list.

## 介绍人

For a new peer to join the decentralized network, they must choose a subset of all online nodes to connect to.

为促进这一过程，奇亚和其他用户将临时运行一些介绍人节点，它们将抓取网络并支持一个协议消息：get_peers_introducer。 然后，介绍人将返回调用节点将尝试连接的已知最近对等节点的随机子集。

DNS introducers are also available at different names, which return random reliable peers to connect to.

For example: `dig dns-introducer.chia.net`.

未来将招募更多 DNS 介绍人；检查[奇亚区块链 GitHub 存储库](https://github.com/Chia-Network/chia-blockchain "chia-blockchain on GitHub") 以获取更新。 仅在应用程序初始启动时或在对等数据库没有好的对等时才联系介绍人。

## RPC

除了下一页描述的奇亚协议之外，还有一个本地 RPC 协议允许通过 HTTP 对节点或钱包进行简单的控制。 RPC 协议的所有请求和响应都采用 JSON 格式，以简化接口。 这允许执行诸如获取链的提示、获取特定块、添加连接、停止节点等操作。 完整节点 UI 使用 RPC 连接到完整节点。

The RPC APIs are provided in both WebSocket and HTTP format.

## 传入和传出连接

The Chia software has multiple rules and checks to make sure a node is connected to several good peers.

例如，传出连接（我们的节点与外部节点建立的连接）排名高于传入连接。 这是因为我们无法验证传入的对等点是否是攻击的一部分。

每个节点将尝试连接到 8 个（依赖于实现的）外部对等点。 只要一个节点连接到至少一个快速且无恶意的对等点，该节点就应该能够跟上并保持与最重的区块链的共识。

## 禁令

如果对等方似乎行为不诚实，则可以将其断开连接并暂时禁止重新连接。 禁止的原因包括（但不限于）超出对每种类型的协议消息提供的限制，发送无效信息，以及使节点在处理消息时抛出异常。

禁令的持续时间取决于问题的严重程度。 应注意不要意外禁止诚实的同行。 不同的实现也可能有更大或不同的速率限制。

## Certificates

All connections between nodes are encrypted and signed with X.509 self signed certificates. Each node will have it's own CA and self sign their certificates. Node IDs are derived by hashing the public key of the certificate, so each node can have a consistent node ID to use for authentication.

## Peer gossiping

Peers are broadcasted within the network with `request_peers` and `respond_peers` messages. The `respond_peers` message contains up to 1000 peers, each having its IP address, its port and an estimate of its last active timestamp.

Data received from `respond_peers` messages or from the introducers are stored in peer tables, similar to Bitcoin's. The tables will be used to randomly select peers in order to establish the outgoing connections. If we've successfully connected with the peer at least once, it is stored in the "tried" table. Otherwise, it is stored in the "new" table. The tried table protects the node from attacks (i.e. eclipse attacks), as an attacker won't be able to easily alter it (all peers initially go into the new table). Periodically, feeler connections are made in order to increase the number of entries in the tried table: we select a peer from the new table and if it's reachable, we move it to the tried table and then we disconnect it. Additionally, peer tables are stored on disk (in the `peers.dat` file) every 15 to 30 minutes, and then loaded every time the node restarts.

Both new and tried tables optimize for the network groups of the entries to be as diverse as possible (/8 for ipv4 and /16 for ipv6). The rules of storing the bucket and the bucket position for a given peer depend on hashing the peer's network group, peer's port, sender's network group (peer that sent the "respond_peers" message containing our current peer), and a secret 32 byte key. This way, an attacker won't be able to predict the bucket and the bucket position where a peer will be stored, and only one entry will be stored within the similar network groups (as the bucket and the bucket position calculations will be identical for similar network group peers).

When a new inbound peer connects to us, we relay its address to one peer we're connected to by sending a `respond_peers` message. Similarly, when we receive a `respond_peers` message containing only one peer, we relay its address to two peers we're connected to. This ensures when a new peer connects to the network, its address will be eventually known by everyone else. The relay peers are chosen deterministically by our key, the current day and their IP and port, by choosing the smallest value after hashing those values (while being deterministic, they also change every day). Additionally, our node sends its address once every 24 hours to all the peers it is connected to, to point that we're still online.

All the above update the timestamps of the peers. Additionally, we update the timestamp of our outbound connections, at most once every 20 minutes, after they send us a message.

Beside picking our outgoing connections, the peer tables are also used to respond to `request_peers` messages. We pick random peers from both new and the tried table, assuming their timestamp is not too old and we don't have too many failed connections with them. Every time peer A connects to peer B, peer A will send peer B a `request_peers` message. The answer will be a `respond_peers` message that will help peer A bootstrap further.
