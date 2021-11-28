---
sidebar_position: 1
---

# 7.1 Networking

The Chia protocol is an asynchronous peer-to-peer protocol running on top of WebSockets on port 8444 (or other ports for farmers, timelords), 
where all nodes act as both clients and servers, and can maintain long-term connections with other peers.

Every message in the Chia protocol is composed of bytes, using the Streamable format, and sent as a WebSocket message.
Each message is composed of three parts.
First, a field spanning 1 byte, representing the type of message being transmitted, and how to decode the data.
Second, an optional id, a 2 byte identifier which is used per connection to keep track of requests and responses.
Third, the data, which is a Streamable encoded representation of one of the protocol messages.


```python
class Message(Streamable):
    # one of ProtocolMessageTypes
    type: uint8
    # message id
    id: Optional[uint16]
    # Message data for that type
    data: bytes

```

Chia protocol messages have a max length of `(4 + 2^32 - 1) = 4294967299` bytes, or around 4GB.

## Handshake

All peers in the Chia protocol (whether they are farmers, full nodes, timelords, etc.) act as both servers and clients (peers).
As soon as a connection is initiated between two peers, both send a Handshake message, and a HandshakeAck message to complete the handshake.
A peer's node_id is the SHA-256 hash of their [x.509](https://en.wikipedia.org/wiki/X.509) [DER](https://wiki.openssl.org/index.php/DER) certificate. 

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

For a new peer to join the decentralized network, they must choose a subset of all online nodes to connect to.

To facilitate this process, a number of introducer nodes will temporarily be run by Chia and other users, which will crawl the network and support one protocol message: get_peers_introducer.
The introducer will then return a random subset of known recent peers that the calling node will attempt to connect to.

DNS introducers are also available at different names, which return random reliable peers to connect to. For example:
`dig dns-introducer.chia.net`. More DNS introducers will be recruited in the future, check the chia-blockchain repo 
for updates. The introducer is only contacted at initial launch of the application, or if the peer database has no good peers.

## RPC
Aside from the Chia protocols described in the next page, there is also a local RPC protocol to allow simple control over a node or wallet through HTTP.
All requests and responses for the RPC protocol are in JSON, to simplify the interface.
This allows doing things like getting the tips of the chain, getting a specific block, adding connections, stopping the node, etc. The full node UI connects to the full node using the RPC. 
The RPC APIs are provided in both WebSocket and HTTP format.

## Incoming and Outgoing Connections
The Chia software has multiple rules and checks to make sure a node is connected to several good peers. For example,
outgoing connections (connections which our node makes to external nodes) are ranked higher than incoming ones, since
we cannot verify whether incoming peers are part of an attack or not. Each node will try to connect to 8 (implementation dependant) external peers.
As long as a node is connected to at least one fast and non-malicious peer, the node should be able to keep up with
and maintain consensus with the heaviest blockchain.

## Bans
Rate limits are also provided for each type of protocol message. If a peer exceeds the rate limits, they can be
disconnected, and temporarily banned from reconnecting. Banning can also occur when a peer sends invalid information or makes the node throw an exception when handling a 
message. The duration of the ban depends on the severity of the issue. Care should be taken to not ban
honest peers by accident. Different implementations might have larger or different rate limits as well.
