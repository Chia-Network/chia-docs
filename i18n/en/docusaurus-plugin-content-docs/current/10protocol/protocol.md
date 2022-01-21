---
sidebar_position: 1
---

# 10.1 Chia Protocol

The Chia protocol is composed of a few different sub-protocols. All protocol messages are sent encoded in Streamable format, using the networking protocol defined in [Section 7](/docs/07networking/networking "Section 3.7: Networking"). The following documents go into depth into the messages sent by each type of service/node, and how they should be interpreted.

The protocol is asynchronous and bidirectional, that is, each end of the connection can send messages, and receive a response, multiple responses, or no response for each message.

1. Harvester protocol (harvester <-> farmer)
2. Farmer protocol (farmer <-> full node)
3. Timelord protocol (timelord <-> full node)
4. Peer protocol (full node <-> full node)
5. Pool protocol (pool <-> farmer)
6. Wallet protocol (wallet/light client <-> full node)

