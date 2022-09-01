---
sidebar_position: 12
---

# 3.12 轻量客户端

与权益证明 (PoS) 相比，轻量客户端支持是空间证明 (PoSpace) 的另一个优势。 在空间证明中，所有的证明都可以被客观和加密地验证，同时保持在某个时间点控制实际资源的要求。 在奇亚的共识下，候选链可以客观地与备用链进行权重比较，即使在线很长时间，也无需依赖中央权威。

对于想要快速同步到链上的轻客户端（例如，移动钱包），全节点可以创建一个小规模的证明，可以让轻客户端相信链的权重接近某个值。 这称为重量证明。

天真地，轻量客户端可以下载每个块和所有必需的证明并对其进行验证。 但是，对于大量块，这将需要大量带宽和 CPU。

更有效的方法依赖于类似于[飞客](https://eprint.iacr.org/2019/226.pdf)的协议。 节点（Prover）将所有来自分叉点的 sub-epoch 摘要，包括难度重置，发送到轻量客户端。

There is only one sub-epoch every 384 blocks, so the summaries will only reach a few MB of data.

该节点还根据最后一个块的挑战确定性地对几个子时期进行采样。 子时代有机会被选择与该子时代的难度成正比。 对于选定的子纪元，轻客户端下载其中一个挑战链块（大约占所有块的 1/32），并计算该子纪元中所有挑战块的平均注入迭代次数。 基于这个时间，轻客户端可以推断奖励链包含多少块。

例如，如果挑战块都以非常小的迭代（接近时隙的开头）出现，则该时隙中可能有很多块。 相反，如果迭代接近时隙的中间，则每个时隙可能只有一个块。 这允许轻量客户端在每个时隙中只下载 1/32 的块，但仍然可以很好地估计总重量。

此外，应该为轻量客户端完整下载最后几个子时代。 这会增加少量数据，但可以防止攻击者在链的末端创建小分叉。

The main difference between this protocol and Flyclient is that blocks are not committed to using a Merkle mountain range, but instead the light client downloads the entire list of sub-epoch hashes from genesis, guaranteeing that the queried sub-epochs are included in the chain. Another difference is that entire sections are downloaded, as opposed to individual blocks. Another difference is that entire sections are downloaded, as opposed to individual blocks.

As of December 2021, more analysis needs to be done on how many sub-epochs should be downloaded and what the bounds are for what the proof of weight implies.

## 获取交易

轻量客户端可以获取他们感兴趣的交易，而无需下载每个区块或区块头。 有两种钱包协议可用于此，一种效率较低的协议可以保持更好的隐私，另一种是具有隐私权衡的高效协议，即钱包必须要求节点向某些地址付款。 钱包 API 目前支持这两种协议。
