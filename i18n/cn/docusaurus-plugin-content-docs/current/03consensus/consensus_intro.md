---
sidebar_position: 1
---

# 3.1 Chia 共识介绍

> Chia Consensus Introduction

去中心化的共识算法需要具有可加密验证和稀缺（不是无限）资源的女巫抵抗力。在以前的区块链系统中，稀缺资源是计算能力和权益。空间证明是一种替代方案，通过使用存储容量作为稀缺资源，它更接近比特币最初的“一个 CPU 一票”的理想。例如，存储 500GiB 的人有 5 个“投票”，存储 100GiB 的人有 1 个“投票”，其中投票是指赢得和验证区块的机会，而不是链上的实际投票。然而，仅使用存储容量是不安全的。另一个密码拼图用于保护该系统：即可验证延迟函数，它是实时已经过去的密码证明。一个公平的系统可以通过结合空间和时间的证明来创建。在这样的系统中，用户在他们的硬盘驱动器上存储随机数据一段时间，他们赢得 Chia 的机会与他们分配的空间成正比。此外，这样的系统以类似于工作证明彩票的方式扩展到数十亿参与者。加入不需要资金、特殊硬件、注册或许可，只需要一个硬盘。并且该系统是完全透明和确定的——任何人都可以高效、客观地验证哪条链是规范链，而无需依赖任何可信方。或者需要权限才能加入，只需要一个硬盘。并且该系统是完全透明和确定的——任何人都可以高效、客观地验证哪条链是规范链，而无需依赖任何可信方。或者需要权限才能加入，只需要一个硬盘。并且该系统是完全透明和确定的——任何人都可以高效、客观地验证哪条链是规范链，而无需依赖任何可信方。

无论何时在本文档中提及签名，都假定使用确定性 BLS 签名，遵循 IETF 规范和增强方案。执行这些数字签名的私钥由农民控制和存储，每个地块都使用唯一的私钥。使用的哈希函数是 SHA256，除了空间证明也使用 CHACHA8 和 BLAKE3。


<details>
<summary>原文参考</summary>


Decentralized consensus algorithms require Sybil resistance with a resource that is cryptographically verifiable and scarce (not infinite).
In previous blockchain systems the scarce resources have been computing power and stake.
Proof of space is an alternative that comes much closer to Bitcoin’s original 
ideal of “one cpu one vote” by using storage capacity as the scarce resource.
For example, someone storing 500GiB has 5 “votes,” someone storing 100GiB has 1 “vote”, where a vote refers to a chance to win and validate a block, not an actual vote on-chain.
Using only storage capacity however, is not secure.
One other cryptographic puzzle piece is used to secure this system: namely a verifiable delay function, which is a cryptographic proof that real time has passed.
A fair system can be created by combining proofs of space and time.
In such a system, users store random-looking data on their hard drives for periods of time and their chance to win Chia is proportional to their allocated space.
Furthermore, such a system scales to billions of participants in a similar way to the proof of work lottery.
No funds, special hardware, registration, or permission is required to join, only a hard drive.
And the system is completely transparent and deterministic -- anyone can efficiently and objectively verify which chain is the canonical one, without relying on any trusted parties.


Whenever signatures are referred to in this document, it is assumed that a deterministic BLS signature is used, following the IETF specification with the Augmented scheme.
The private keys performing these digital signatures are controlled and stored by the farmers, and a unique private key is used for each plot.
The hash function used is SHA256, except for the proofs of space which also use CHACHA8 and BLAKE3.

</details>
