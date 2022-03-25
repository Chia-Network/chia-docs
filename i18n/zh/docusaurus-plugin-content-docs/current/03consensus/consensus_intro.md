---
sidebar_position: 1
---

# 3.1 Chia 共识介绍

> Chia Consensus Introduction

去中心化共识算法需要抵抗女巫，使用既可加密验证又稀缺（不是无限）的资源。在之前的区块链系统中，使用了两种不同的稀缺资源：计算能力（Proof of Work）和抵押资金（Proof of Stake）。

奇亚的空间证明共识使用存储容量作为稀缺资源。这比之前的系统更接近中本聪最初的“一个 CPU 一票”的理想，其中_投票_指的是赢得和验证区块的机会，而不是链上的实际投票。例如，存储 500 GiB 的人有 5 个“投票”，存储 100 GiB 的人有 1 个“投票”。

另一个密码谜语用于保护奇亚的系统：可验证延迟函数 (VDF)，它是实时已经过去的密码证明。

一个公平的系统可以通过结合空间和时间的证明来创建。在这样的系统中，用户将看似随机的数据存储在他们的硬盘驱动器上。他们赢得 XCH 的机会与他们分配的空间成正比。此外，这样的系统以类似于工作证明彩票的方式扩展到数十亿参与者。加入不需要资金、特殊硬件、注册或许可，只需要一个硬盘驱动器和互联网连接。该系统是完全透明和确定性的——任何人都可以高效、客观地验证哪条链是规范链，而无需依赖任何可信方。

继续阅读时要记住的一些注意事项：
* 每当使用_签名_一词时，它特指确定性 BLS 签名，遵循 IETF 规范和增强方案。
* 执行这些数字签名的私钥由农民控制和存储。
* 每个地块都使用唯一的私钥。
* 使用的哈希函数是 SHA256，除了空间证明也使用 CHACHA8 和 BLAKE3。

<details>
<summary>原文参考</summary>

Decentralized consensus algorithms require Sybil resistance, using a resource that is both cryptographically verifiable and scarce (not infinite). In previous blockchain systems, two different scarce resources have been used: computing power (Proof of Work) and staked money (Proof of Stake).

Chia's Proof of Space consensus uses storage capacity as the scarce resource. This comes much closer than previous systems to Satoshi's original ideal of “one CPU, one vote,” where a _vote_ refers to a chance to win and validate a block, not an actual vote on-chain. For example, someone storing 500 GiB has 5 “votes,” and someone storing 100 GiB has 1 “vote.”

One other cryptographic puzzle piece is used to secure Chia's system: a verifiable delay function (VDF), which is a cryptographic proof that real time has passed.

A fair system can be created by combining proofs of space and time. In such a system, users store random-looking data on their hard drives. Their chance to win XCH is proportional to their allocated space. Furthermore, such a system scales to billions of participants in a similar way to the Proof of Work lottery. No funds, special hardware, registration, or permission is required to join, only a hard drive and an internet connection. The system is completely transparent and deterministic -- anyone can efficiently and objectively verify which chain is the canonical one, without relying on any trusted parties.

Some notes to keep in mind as you continue reading:
* Whenever the word _signature_ is used, it refers specifically to a deterministic BLS signature, following the IETF specification with the Augmented scheme.
* The private keys performing these digital signatures are controlled and stored by the farmers.
* A unique private key is used for each plot.
* The hash function used is SHA256, except for the proofs of space which also use CHACHA8 and BLAKE3.

</details>
