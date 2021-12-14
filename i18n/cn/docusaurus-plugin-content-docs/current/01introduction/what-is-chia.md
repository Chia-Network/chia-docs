---
sidebar_position: 1
---

# 1.1 什么是 Chia？

> What is Chia?

Chia 是一种全新的加密货币和区块链智能交易平台，旨在更易于使用、更高效、更安全。 Chia 于 2021 年发布，由 Bram Cohen 领导开发多年，并得到了许多工程师、研究人员和开源贡献者的支持。

Chia 旨在改进比特币提出的许多优秀想法，同时保持总体目标和理念。 Chia 包括一种称为空间和时间证明的共识算法，它使用现代密码学，如可验证延迟函数和空间证明。这种算法使 Chia 比其他算法更加去中心化，因为参与者可以在家里的电脑上耕种（类似于挖矿），只需要一些硬盘驱动器。
Chia 拥有数十万个完整节点来保护系统，比任何其他区块链都要多，并且拥有健康的矿池生态系统。与工作量证明相比，这一新共识的能耗要低得多，Chia 的部分愿景涉及改善区块链行业的碳足迹。

Chia 还拥有全新的智能交易模型，具有强大（但简单）的语言 chialisp 和 CLVM（chialisp VM）。由于智能交易平台的简单性，智能交易平台旨在促进高价值和安全合约的编写。基于硬币集 (UTXO) 的模型和 VM 本身。智能交易支持以太坊合约提供的相同功能，但由于硬币集模型的原因略有不同，它保持代码分离，实现可预测性，并减少 MEV。

Chia 还有其他创新。有些包括 BLS 签名，它允许将一个块中的所有签名聚合为一个；可扩展性和性能改进，允许在树莓派上运行 Chia 节点，权重证明和轻客户端，允许从任何移动设备快速同步，以及允许农民控制他们的节点的安全池协议。

本文档将向技术受众解释 Chia 系统不同组件的动机和实现，并提供一切工作原理的深入解释。如果您想跳到如何在 Chia 上制作 dapps（去中心化应用程序），请访问 chialisp.org。

<details>
<summary>原文参考</summary>

TODO: add image and link to other sections / resources for keywords

Chia is a new cryptocurrency and blockchain smart transaction platform that is designed to be easier to use,
more efficient, and more secure. Chia was released in 2021, after years of development led by Bram Cohen, with the support
of many engineers, researchers, and open source contributors.

Chia aims to improve upon the many excellent ideas brought forward by Bitcoin, while maintaining the overall purpose
and philosophy. Chia includes a consensus algorithm called Proof of Space and Time, which uses modern 
cryptography like Verifiable Delay Functions and Proofs of Space. This algorithm makes Chia much more decentralized than
alternatives, since participants can farm (analogous to mine) from their computers at home, with just some hard drives.
Chia has hundreds of thousands of full nodes securing the system, more than any other blockchain, and a healthy
ecosystem of pools. This new consensus has a much lower energy consumption compared to proof of work, and part of Chia's
vision involves improving the carbon footprint of the blockchain industry.

Chia also has a new smart transaction model, with powerful (yet simple) language called chialisp, and CLVM (chialisp VM).
The smart transaction platform was designed to facilitate the writing of high value and secure contracts, due to the 
simple nature of the coin set (UTXO) based model, and the VM itself. Smart transactions enable the same functionality provided 
by Ethereum contracts, but with a slightly different implementation due to the coin set model, which keeps code separated,
enables predictability, and reduces MEV.

There are other innovations in Chia. Some include BLS signatures, which allow aggregating all signatures in one block
into one; scalability and performance improvements, which allow running a Chia node on a raspberry pi, weight proofs
and light clients, which enable fast syncing from any mobile device, and a secure pooling protocol that allows farmers
to have control of their node.

This documentation will explain the motivation and implementation of the different components of the Chia system to a 
technical audience, and provide in depth explanations of how everything works. If you would like to skip to how to make dapps (decentralized
apps) on Chia, please visit chialisp.org.
  
</details>
