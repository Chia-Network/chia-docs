---
title: Architecture Overview
slug: /architecture-overview
---

![chia-architecture](/img/chia-network-architecture.png)

The above diagram shows Chia's network architecture. A single machine can run more than one of these processes. In fact, the default configuration is to run four processes together: Farmer, Full Node, Harvester, and Wallet. Many farmers will also choose to run the Electron GUI and Pool processes. Additionally, a few farmers, especially those with multi-PiB farms, will choose to run a Timelord.

Let's discuss each of these processes, and the protocols that connect them, separately.
