---
title: Chia Protocol
slug: /chia-protocol
---

The Chia protocol is composed of a few different sub-protocols. All protocol messages are sent encoded in Streamable format, using the networking protocol defined in the [Networking page](/networking-protocol). The following documents go into depth into the messages sent by each type of service/node, and how they should be interpreted.

The protocol is asynchronous and bidirectional, that is, each end of the connection can send messages, and receive a response, multiple responses, or no response for each message.

1. [Harvester protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/harvester_protocol.py) (harvester \<-> farmer)
2. [Farmer protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/farmer_protocol.py) (farmer \<-> full node)
3. [Timelord protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/timelord_protocol.py) (timelord \<-> full node)
4. [Peer protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/full_node_protocol.py) (full node \<-> full node)
5. [Pool protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/pool_protocol.py) (pool \<-> farmer)
6. [Wallet protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/wallet_protocol.py) (wallet/light client \<-> full node)
7. [Introducer protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/introducer_protocol.py) (introducer \<-> full node)

In addition to the sub-protocols that are specific to services, a few protocols are shared across all or most services.

1. [Shared networking protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/shared_protocol.py)
2. [Timing protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/protocol_timing.py)
3. [Message types protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/protocol_message_types.py)
4. [State machine protocol](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/protocol_state_machine.py)

