---
title: Networking Protocol
slug: /networking-protocol
---

The Chia protocol is asynchronous and peer-to-peer. It runs on top of WebSockets on port 8444 (or other ports for farmers and timelords). All nodes act as both clients and servers, and can maintain long-term connections with other peers.

Every message in the Chia protocol is composed of bytes, using the Streamable format, and sent as a WebSocket message. Each message is composed of three parts:

1. A field spanning 1 byte, representing the type of message being transmitted, and how to decode the data.
2. Second, an optional 2-byte ID, which is used per connection to keep track of requests and responses.
3. The data, which is a Streamable encoded representation of one of the protocol messages.

```python
class Message(Streamable):
    # one of ProtocolMessageTypes
    type: uint8
    # message id
    id: Optional[uint16]
    # Message data for that type
    data: bytes

```

Chia protocol messages have a max length of `(4 + 2^32 - 1) = 4294967299` bytes, or around 4 GB.

## Handshake

All peers in the Chia protocol (whether they are farmers, full nodes, timelords, etc.) act as both servers and clients (peers). As soon as a connection is initiated between two peers, both peers send a Handshake message, and a HandshakeAck message to complete the handshake. A peer's node_id is the SHA-256 hash of their [x.509](https://en.wikipedia.org/wiki/X.509) [DER](https://wiki.openssl.org/index.php/DER) certificate.

```python
class Handshake(Streamable):
    network_id: str                         # Network id, usually the genesis challenge of the blockchain
    protocol_version: str                   # Protocol version to determine which messages the peer supports
    software_version: str                   # Version of the software, to debug and determine feature support
    server_port: uint16                     # Which port the server is listening on
    node_type: uint8                        # NodeType (full node, wallet, farmer, etc.)
    capabilities: List[Tuple[uint16, str]]  # Key value dict to signal support for additional capabilities/features

```

After the handshake is completed, both peers can send Chia protocol messages, and disconnect at any time by closing the WebSocket.

## Heartbeat

Heartbeat messages are sent periodically by the WebSocket libraries. Peers that are unresponsive will therefore be disconnected.

If a node does not receive any message from a peer for a certain period of time, even if heartbeats are being received, then the node will disconnect and remove the peer from the active peer list.

## Introducer

When a new node joins the network, it randomly connects to existing nodes on the network.

To facilitate this process, a number of introducer nodes will temporarily be run by Chia and other users, which will crawl the network and support one protocol message: get_peers_introducer. The introducer will then return a random subset of known recent peers that the calling node will attempt to connect to.

DNS introducers are also available at different names, which return random reliable peers to connect to.

For example: `dig dns-introducer.chia.net`.

More DNS introducers will be recruited in the future; check the [chia-blockchain repository](https://github.com/Chia-Network/chia-blockchain) for updates. The introducer is only contacted at initial launch of the application, or if the peer database has no good peers.

## RPC

Aside from the Chia protocols described in the next page, there is also a local RPC protocol to allow simple control over a node or wallet through HTTPS. All requests and responses for the RPC protocol are in JSON, to simplify the interface. This allows doing things like getting the tips of the chain, getting a specific block, adding connections, stopping the node, etc. The full node UI connects to the full node using the RPC.

The RPC APIs are provided in both WebSocket and HTTPS format.

## Incoming and Outgoing Connections

The Chia software has multiple rules and checks to make sure a node is connected to several good peers.

For example, outgoing connections (connections which our node makes to external nodes) are ranked higher than incoming ones. This is because we cannot verify whether incoming peers are part of an attack or not.

Each node will try to connect to 8 (implementation-dependent) external peers. As long as a node is connected to at least one fast and non-malicious peer, the node should be able to keep up with, and maintain, consensus with the heaviest blockchain.

## Bans

If a peer appears to be acting dishonestly, it can be disconnected and temporarily banned from reconnecting. Reasons for banning include (but are not limited to) exceeding the limits provided for each type of protocol message, sending invalid information, and making the node throw an exception when handling a message.

The duration of the ban depends on the severity of the issue. Care should be taken to not ban honest peers by accident. Different implementations might have larger or different rate limits as well.

## Certificates

All connections between nodes are encrypted and signed with X.509 signed certificates. Each node generates an X.509 certificate and signs it with the Chia CA (Valid To: January 21, 2031, Serial Number: 5c8a71239328650eb9fef85cec32bf779ca6a0c5) for node connections on port 8444. Node IDs are derived by hashing the public key of the certificate, so each node can have a consistent node ID to use for authentication. Each node will also generate and have its own private CA and self-sign certificates for local connections to services like farmer and harvester.

## Peer gossiping

Peers are broadcasted within the network with `request_peers` and `respond_peers` messages. The `respond_peers` message contains up to 1000 peers, each having its IP address, its port and an estimate of its last active timestamp.

Data received from `respond_peers` messages or from the introducers are stored in peer tables, similar to Bitcoin's. The tables will be used to randomly select peers in order to establish the outgoing connections. If we've successfully connected with the peer at least once, it is stored in the "tried" table. Otherwise, it is stored in the "new" table. The tried table protects the node from attacks (i.e. eclipse attacks), as an attacker won't be able to easily alter it (all peers initially go into the new table). Periodically, feeler connections are made in order to increase the number of entries in the tried table: we select a peer from the new table and if it's reachable, we move it to the tried table and then we disconnect it. Additionally, peer tables are stored on disk (in the `peers.dat` file) every 15 to 30 minutes, and then loaded every time the node restarts.

Both new and tried tables optimize for the network groups of the entries to be as diverse as possible (/8 for ipv4 and /16 for ipv6). The rules of storing the bucket and the bucket position for a given peer depend on hashing the peer's network group, peer's port, sender's network group (peer that sent the "respond_peers" message containing our current peer), and a secret 32 byte key. This way, an attacker won't be able to predict the bucket and the bucket position where a peer will be stored, and only one entry will be stored within the similar network groups (as the bucket and the bucket position calculations will be identical for similar network group peers).

When a new inbound peer connects to us, we relay its address to one peer we're connected to by sending a `respond_peers` message. Similarly, when we receive a `respond_peers` message containing only one peer, we relay its address to two peers we're connected to. This ensures when a new peer connects to the network, its address will be eventually known by everyone else. The relay peers are chosen deterministically by our key, the current day and their IP and port, by choosing the smallest value after hashing those values (while being deterministic, they also change every day). Additionally, our node sends its address once every 24 hours to all the peers it is connected to, to point that we're still online.

All the above update the timestamps of the peers. Additionally, we update the timestamp of our outbound connections, at most once every 20 minutes, after they send us a message.

Beside picking our outgoing connections, the peer tables are also used to respond to `request_peers` messages. We pick random peers from both new and the tried table, assuming their timestamp is not too old and we don't have too many failed connections with them. Every time peer A connects to peer B, peer A will send peer B a `request_peers` message. The answer will be a `respond_peers` message that will help peer A bootstrap further.
