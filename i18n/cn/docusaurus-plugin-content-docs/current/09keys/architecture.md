---
sidebar_position: 4
---

# 9.4 架构

> Architecture

下图假设了一个架构，其中农民决定将所有密钥分开。
* 可能是冷藏的钱包密钥
* 收割机内的本地密钥，与农民分开
* 一个单独的池密钥

请注意，在最简单的配置中，用户可以在同一台机器上运行所有服务（钱包、节点、收割机、农民、矿池），因此所有密钥使用相同的主密钥。

<figure>

![](/img/keys/architecture.png)

</figure>

在此配置中，收割机仅存储绘图文件，并在必要时向农民提供本地 sk 的签名。

农夫机器有自己的密钥，用于创建新区块的签名，并将它们与本地 sk 签名结合。农民机器可以配置不同的钱包地址来发送资金，这样用户就可以将他们的消费密钥保存在冷库中。

此外，农民和收割机之间的通信通道通过 TLS 证书进行身份验证，这使收割机可以知道农民是否可信。

农民还可以通过池协议与池通信。 在这种情况下，农民会定期向池发送消息，以证明空间。 回想一下 [来自第 2.1 节](/docs/02architecture/p2p-system#pools "Section 2.1: Pool architecture")每个区块都有资格创建两个 coinbase 奖励币：池奖励，即 7/8，和农民 奖励，即 1/8 + 交易费用。

在耕种一个区块后，7/8 硬币被池吸收，然后分配给池成员。 Chia 的池架构是去中心化的，因为农民运行自己的节点，池化不会导致系统的中央控制。

如果使用矿池合约拼图哈希，则矿池签名不包含在区块中。

<details>
<summary>原文参考</summary>

The following image assumes an architecture where the farmer decides to keep all keys separate.
* a wallet key that can potentially be cold storage
* local keys within the harvester machine, which are separated from the farmer
* a separate pool key

Note that in the simplest configuration, a user can run all of the services (wallet, node, harvester, farmer, pool) in the same machine, and thus the same master key is used for all keys.

<figure>

![](/img/keys/architecture.png)

</figure>

In this configuration, harvesters only store plot files, and provide the farmer with signatures by the local sk whenever necessary.

The farmer machine has its own key, which is used to create signatures of new blocks, and combines them with the local sk signatures. The farmer machine can configure a different wallet address to send the funds to, so the user can keep their spending keys in cold storage.

Furthermore, the communication channel between the farmer and harvester is authenticated with TLS certificates, which allows the harvester to know if the farmer is trusted.

The farmer can also communicate with a pool, through the pooling protocol. In this case, the farmer would send periodic messages to the pool, to prove space. Recall [from Section 2.1](/docs/02architecture/p2p-system#pools "Section 2.1: Pool architecture") that each block is eligible to create two coinbase reward coins: the pool reward, which is 7/8, and the farmer reward, which is 1/8 + transaction fees.

After farming a block, the 7/8 coin is absorbed by the pool, and later distributed to pool members. Chia's pool architecture is decentralized, because the farmers run their own node, and pooling does not lead to central control of the system.

If using a pool contract puzzle hash, the pool signature is not included in the block.

</details>
