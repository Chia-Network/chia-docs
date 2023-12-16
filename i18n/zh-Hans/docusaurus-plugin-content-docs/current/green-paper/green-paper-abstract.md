---
title: 摘要 - Chia绿皮书
sidebar_label: 摘要
slug: /green-paper-abstract
---

# 绿皮书

## 摘要

本文概述了 $\textrm{{\sf Chia}}$ 的共识层背后的基本设计思想和原理，$\textrm{{\sf Chia}}$ 是一种类似于比特币的最长链区块链。 它通过结合空间证明（Proofs of Space）和可验证延迟函数(Verifiable Delay Functions，VDF)实现了与比特币基于工作量证明(Proof of Work，PoW)的中本聪共识相当的安全性保障，同时实现了防止女巫攻击（Sybil resistance）。 这使得 $\textrm{{\sf Chia}}$ 在可持续性上比PoW区块链更具[可持续性（sustainable）](https://chiapower.org/)，并且更加[去中心化（decentralized）](https://xch.farm/decentralization/)。

我们概述了在用空间证明等高效证明系统替代工作量证明时必须解决的挑战，以及在 $\textrm{{\sf Chia}}$ 中如何解决这些挑战。 在这里，_高效_ 意味着一旦资源（如空间或权益）可用，计算多个证明的成本基本上与计算一个证明的成本相同。

本文不是 $\textrm{{\sf Chia}}$ 的正式规范。 相反，它面向那些希望理解 $\textrm{{\sf Chia}}$ 共识设计选择的读者，以及对来自高效证明系统的无需许可的最长链区块链感兴趣的人。

---

### 先前版本共识绿皮书

为了提供历史背景，绿皮书的先前版本讨论了一种从未实现的共识，可以在这里查看：[先前绿皮书](/files/Precursor-ChiaGreenPaper.pdf)。
