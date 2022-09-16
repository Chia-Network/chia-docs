---
sidebar_position: 4
---

# 9.4 架构

The following image assumes an architecture where the farmer decides to keep all keys separate.

- a wallet key that can potentially be cold storage
- local keys within the harvester machine, which are separated from the farmer
- a separate pool key

Note that in the simplest configuration, a user can run all of the services (wallet, node, harvester, farmer, pool) in the same machine, and thus the same master key is used for all keys.

<figure>
<img src="/img/keys/architecture.png" alt="drawing"/>
</figure>

In this configuration, harvesters only store plot files, and provide the farmer with signatures by the local sk whenever necessary.

农夫机器有自己的密钥，用于创建新区块的签名，并将它们与本地密钥签名结合。 农民机器可以配置不同的钱包地址来发送资金，这样用户就可以将他们的消费密钥保存在冷库中。

Furthermore, the communication channel between the farmer and harvester is authenticated with TLS certificates, which allows the harvester to know if the farmer is trusted.

农民还可以通过池协议与池通信。 在这种情况下，农民会定期向池发送消息，以证明空间。 回想一下[来自第 2.1 节](/docs/02architecture/p2p-system#pools "Section 2.1: Pool architecture")每个区块都有资格创建两个 coinbase 奖励币：矿池奖励，即 7/8，和农民 奖励，即 1/8 + 交易费用。

在耕种一个区块后，7/8 硬币被矿池吸收，然后分配给矿池成员。 奇亚的矿池架构是去中心化的，因为农民运行自己的节点，池化不会导致系统的中央控制。

If using a pool contract puzzle hash, the pool signature is not included in the block.
