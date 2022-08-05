---
title: Intro to Chia
slug: /chia-intro
---

## What is Chia?

Or, jump to [installation](#Install).

Chia is a cryptocurrency and blockchain smart transaction platform. Chia was designed from the ground up to make cryptocurrency easier to use -- and harder to lose -- than cash. The PoST consensus has a much [lower energy consumption](https://chiapower.org "Chia's energy consumption statistics") compared to Proof of Work (PoW), and part of Chia's vision involves improving the carbon footprint of the blockchain industry.

On August 1, 2017, [Bram Cohen](https://www.chia.net/profiles/bram-cohen "Bram Cohen's Chia profile") founded the Chia company and incorporated it in the state of Delaware. Bram led the development of Chia, along with many engineers, researchers, and open source contributors. Along the way, Chia created three new inventions in applied cryptography, and advanced the interest and adoption in a fourth:

- The first production use of [BLS Signatures](https://github.com/Chia-Network/bls-signatures "Chia's BLS Signatures on GitHub").
- The first production use of a [Verifiable Delay Function (VDF)](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub").
- [Proofs of Space](https://github.com/Chia-Network/chiapos "Chia's Proof of Space repository on GitHub") and [Time](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub") (PoST), the first (and only) Nakamoto consensus since Proof of Work.
- The first production use of [class groups of unknown order](https://github.com/Chia-Network/vdf-competition/blob/main/classgroups.pdf 'Binary quadratic forms white paper, by Lipa Long').

Chia's mainnet was launched on March 19, 2021. Development of its ecosystem is ongoing.

For more information on the company's strategies, see [Chia's business white paper](https://www.chia.net/whitepaper "Chia's business white paper").

### Smart Transactions

Chia has a new smart transaction model, which uses a powerful (yet simple) higher-level language called [chialisp](https://chialisp.com 'Chialisp.com'), and an accompanying lower-level language called CLVM (ChiaLisp Virtual Machine).

Chia uses the coin set model (similar to Bitcoin's UTXO) to track the blockchain's state. The simple nature of this model facilitates the writing of high value and secure contracts. Unlike in systems that use the account model such as Ethereum, the code that creates Chia's coins is strongly sandboxed. This increases security, reduces Maximum Extractable Value (MEV), and makes the code fully auditable.

> For more info, see [chialisp.com](https://chialisp.com/ 'Chialisp.com').

### Decentralized

Chia uses a consensus algorithm called [Proofs of Space and Time](https://www.chia.net/assets/ChiaGreenPaper.pdf "Chia's Green Paper"). This algorithm allows anyone with an internet connection and some free disk space to participate in securing the network. Because of this process of farming (analogous to mining), Chia has become the most decentralized blockchain on the planet, with hundreds of thousands of full nodes securing the system.

### Improved Pooling

Like many other blockchains, Chia allows pooling to smooth out the rewards structure for smaller farmers. However, Chia's pooling protocol has three unique features:

- Farmers create new blocks, whether they're farming solo or as a member of a pool.

This design decision was made in conjunction with Chia's goal of decentralization. In other blockchains such as Bitcoin, four or five pools control over 51% of the global hashrate on any given day. (Sources: [blockchain.com](https://www.blockchain.com/pools "blockchain.com pie chart of Bitcoin's hashrate distribution"), [blockchair.com](https://blockchair.com/bitcoin/charts/hashrate-distribution "blockchair.com pie chart of Bitcoin's hashrate distribution")) Arguably, the easiest way to attack Bitcoin would be to bribe each of these pools' operators.

In Chia, the pool operators are only responsible for distributing rewards. They cannot modify the blockchain. Therefore, Chia's pooling protocol doesn't lead to increased centralization.

- Joining a pool is permissionless. Farmers don't need to sign up for anything in order to join.

- When a block is won, the farmer gets 1/8 of the rewards, and the pool operator gets the other 7/8. This was done to discourage pool operators from harming their competition by farming on a competing pool and neglecting to create a block when they find a proof. (Solo farmers collect the entire reward when they create a block.)

> For more info on Chia's pooling protocol, see [Section 11](/pooling/pooling 'Section 11: Pooling').
