---
sidebar_position: 1
---

# 3.1 Chia 共识介绍

去中心化共识算法需要抵抗女巫，使用既可加密验证又稀缺（不是无限）的资源。 在之前的区块链系统中，使用了两种不同的稀缺资源：计算能力（Proof of Work）和抵押资金（Proof of Stake）。

奇亚的空间证明共识使用存储容量作为稀缺资源。 这比之前的系统更接近中本聪最初的“一个 CPU 一票”的理想，其中*投票*指的是赢得和验证区块的机会，而不是链上的实际投票。 例如，存储 500 GiB 的人有 5 个“投票”，存储 100 GiB 的人有 1 个“投票”。

One other cryptographic puzzle piece is used to secure Chia's system: a verifiable delay function (VDF), which is a cryptographic proof that real time has passed.

一个公平的系统可以通过结合空间和时间的证明来创建。 在这样的系统中，用户将看似随机的数据存储在他们的硬盘驱动器上。 他们赢得 XCH 的机会与他们分配的空间成正比。 此外，这样的系统以类似于工作证明彩票的方式扩展到数十亿参与者。 加入不需要资金、特殊硬件、注册或许可，只需要一个硬盘驱动器和互联网连接。 该系统是完全透明和确定性的——任何人都可以高效、客观地验证哪条链是规范链，而无需依赖任何可信方。

Some notes to keep in mind as you continue reading:

- Whenever the word _signature_ is used, it refers specifically to a deterministic BLS signature, following the IETF specification with the Augmented scheme.
- The private keys performing these digital signatures are controlled and stored by the farmers.
- A unique private key is used for each plot.
- The hash function used is SHA256, except for the proofs of space which also use CHACHA8 and BLAKE3.
