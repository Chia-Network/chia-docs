---
title: Wallets
slug: /wallet-architecture
---

Wallets can communicate with full nodes through the wallet protocol. This is similar to Bitcoin's SPV protocol: it allows verification of transactions and block weight, without the bandwidth and CPU requirements of full nodes.

Wallet nodes are similar to full nodes, in that they are servers which communicate to other peers in the network. A common use case is to run a wallet locally along with a full node, where the wallet only connects to the full node. Wallets use [light clients](/light-clients) to download weight proofs from nodes to quickly validate which blockchain is the longest. They then ask full nodes to scan the blockchain for their desired transactions. The wallet is also responsible for managing private keys, as well as generating, storing and sending transactions. The wallet exposes an RPC HTTPS websocket JSON API, which user interfaces can use to execute commands.
