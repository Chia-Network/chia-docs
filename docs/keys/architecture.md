---
title: Architecture
---

The following image assumes an architecture where the farmer decides to keep all keys separate.

- a wallet key that can potentially be cold storage
- local keys within the harvester machine, which are separated from the farmer
- a separate pool key

Note that in the simplest configuration, a user can run all of the services (wallet, node, harvester, farmer, pool) in the same machine, and thus the same master key is used for all keys.

<figure>
<img src="/img/keys/architecture.png" alt="drawing"/>
</figure>

In this configuration, harvesters only store plot files, and provide the farmer with signatures by the local sk whenever necessary.

The farmer machine has its own key, which is used to create signatures of new blocks, and combines them with the local sk signatures. The farmer machine can configure a different wallet address to send the funds to, so the user can keep their spending keys in cold storage.

Furthermore, the communication channel between the farmer and harvester is authenticated with TLS certificates, which allows the harvester to know if the farmer is trusted.

The farmer can also communicate with a pool, through the pooling protocol. In this case, the farmer would send periodic messages to the pool, to prove space. Recall [from Section 2.1](/docs/architecture/p2p-system#pools 'Section 2.1: Pool architecture') that each block is eligible to create two coinbase reward coins: the pool reward, which is 7/8, and the farmer reward, which is 1/8 + transaction fees.

After farming a block, the 7/8 coin is absorbed by the pool, and later distributed to pool members. Chia's pool architecture is decentralized, because the farmers run their own node, and pooling does not lead to central control of the system.

If using a pool contract puzzle hash, the pool signature is not included in the block.
