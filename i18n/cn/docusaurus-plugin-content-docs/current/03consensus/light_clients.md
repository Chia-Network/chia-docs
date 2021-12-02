---
sidebar_position: 12
---

# 3.12 轻客户端

> Light Clients

与权益证明相比，轻客户端支持是空间证明的另一个好处，因为所有证明都可以通过密码进行客观验证，并且需要在某个时间点控制实际资源。通过 Chia 共识，候选链可以客观地与备用链进行权重比较，即使在线很长时间，也无需依赖中央权威。

对于想要快速同步到链上的轻客户端（例如移动钱包），一个完整的节点可以创建一个小规模的证明，可以让轻客户端相信链的权重接近某个值。这称为重量证明。天真地，轻客户端可以下载每个单独的块和所有需要的证明并验证它们，但是对于如此大量的块，这将需要大量的带宽和 CPU。

一种更有效的方法依赖于类似于 Flyclient [4]的协议. 节点（证明者）将来自分叉点的所有子纪元摘要（包括难度重置）发送到轻客户端。每 384 个块只有一个，所以这只能达到几 MB 的数据。该节点还根据最后一个块的挑战确定性地对几个子时期进行采样。子时代有机会被选择与该子时代的难度成正比。对于选定的子纪元，轻客户端下载其中一个挑战链块（大约占所有块的 1/32），并计算该子纪元中所有挑战块的平均注入迭代次数。基于这个时间，轻客户端可以推断奖励链包含多少块。例如，如果挑战块都以非常小的迭代（接近槽的开头）出现，该插槽中可能有很多块。相反，如果迭代接近时隙的中间，则每个时隙可能只有一个块。这允许轻客户端在每个时隙中只下载 1/32 的块，但仍然可以很好地估计总重量。

此外，应该为轻客户端完整下载最后几个子时代。这会增加少量数据，但可以防止攻击者在链的末端创建小分叉。该协议与 flyclient 的主要区别在于，区块不承诺使用默克尔山脉，而是轻客户端从 genesis 下载整个 sub-epoch 哈希列表，保证查询的 sub-epoch 包含在链中. 另一个区别是下载整个部分，而不是单个块。

需要对应该下载多少个子时期以及权重证明所暗示的界限进行更多分析。

<details>
<summary>原文参考</summary>

Light client support is another benefit of proof of space when compared with proof of stake, since all proofs can
be objectively verified cryptographically, 
and require controlling an actual resource at a certain point in time. With Chia consensus, a candidate chain can 
be compared to an alternate chain objectively for weight, even after being online for a long time, without relying on
a central authority.

For light clients who want to sync up quickly to the chain (for example mobile wallets),
a full node can create a small sized proof that can convince the light client that the weight of a chain is close to some value.
This is called a proof of weight.
Naively, the light client can download every single block and all the required proofs and verify them, but with such a large number of blocks,
this would require a lot of bandwidth and CPU.

A more efficient method relies on a protocol similar to Flyclient[4].
The node (prover) sends all the sub epoch summaries from the fork point,
which include difficulty resets, to the light client.
There is only one every 384 blocks, so this can only reach a few MB of data.
The node also deterministically samples several sub-epochs based on the challenge of the last block.
Sub-epochs have a chance to be chosen proportional to the difficulty during that sub-epoch.
For the chosen sub-epoch, the light client downloads one of the challenge chain blocks (which are approximately 1/32 of all blocks),
and computes the average infusion iterations of all challenge blocks in that sub-epoch.
Based on this time, the light client can extrapolate how many blocks the reward chain contains.
For example, if the challenge blocks all occur with very small iterations (close to the beginning of the slot),
there are likely many blocks in that slot.
Conversely, if the iterations are close to the middle of the slot, there is likely only one block per slot.
This allows the light client to only download 1/32 of the blocks in each slot, but still get a good estimate of the total weight.

Furthermore, the last few sub-epochs should be downloaded in full for the light client.
This adds a small amount of data, but prevents attackers from creating small forks at the end of the chain.
The main difference between this protocol and flyclient is that blocks are not committed to using a merkle mountain range,
but instead the light client downloads the entire list of sub-epoch hashes from genesis, guaranteeing that the queried sub-epochs are included in the chain.
Another difference is that entire sections are downloaded, as opposed to individual blocks.

More analysis needs to be done on how many sub-epochs should be downloaded and what the bounds are for what the proof of weight implies.

</details>


## 获取交易

尽管在其他部分对此进行了更深入的描述，但轻客户端可以获取他们感兴趣的交易，而无需下载每个区块或区块头。有两种钱包协议可用于此，一种效率较低的协议可以保持更好的隐私，另一种是具有隐私权衡的高效协议，即钱包麝香要求节点向某些地址付款。

<details>
<summary>原文参考</summary>

- ## Obtaining Transactions

Although this is described more in depth on other sections, light clients can fetch the transactions that they are
interested, without having to download every single block or block header. Two wallet protocols are available for this,
a less efficient one that maintains better privacy, and a super efficient one that has a privacy tradeoff, namely that
the wallet musk ask a node for payments made to certain addresses.

</details>

