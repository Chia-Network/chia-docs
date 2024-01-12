---
title: Architecture Overview
slug: /architecture-overview
description: The document contains Chia's network architecture. A single machine can run more than one of these processes. In fact, the default configuration is to run four processes together- Farmer, Full Node, Harvester, and Wallet. 
keywords:
  - chia
  - architecture
  - network
  - Full Node
  - farmer
  - timelord
  - wallet
  - protocols
  - harvester
---

![chia-architecture](/img/chia-network-architecture.png)

The above diagram shows Chia's network architecture. A single machine can run more than one of these processes. In fact, the default configuration is to run four processes together: [Farmer](/farmers), [Full Node](/full-nodes), [Harvester](/harvesters), and [Wallet](/wallets). Many farmers will also choose to run the Electron GUI and [Pool](/pools) processes. Additionally, a few farmers, especially those with multi-PiB farms, will choose to run a [Timelord](/timelords).

Let's discuss each of these processes, and the protocols that connect them, separately.
