---
sidebar_position: 1
---

# 1.1 About Chia Blockchain

## What is Chia?

Chia is a cryptocurrency and blockchain smart transaction platform. Chia was designed from the ground up to make cryptocurrency easier to use -- and harder to lose -- than cash. Chia's blockchain maintains the same level of security as Bitcoin's, while using a fraction of the energy.

On August 1, 2017, [Bram Cohen](https://www.chia.net/profiles/bram-cohen "Bram Cohen's Chia profile") founded the Chia company and incorporated it in the state of Delaware. Bram led the development of Chia, along with many engineers, researchers, and open source contributors. Along the way, Chia created three new inventions in applied cryptography, and advanced the interest and adoption in a fourth:

- The first production use of [BLS Signatures](https://github.com/Chia-Network/bls-signatures "Chia's BLS Signatures on GitHub").
- The first production use of a [Verifiable Delay Function (VDF)](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub").
- [Proofs of Space](https://github.com/Chia-Network/chiapos "Chia's Proof of Space repository on GitHub") and [Time](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub") (PoST), the first (and only) Nakamoto consensus since Proof of Work.
- The first production use of [class groups of unknown order](https://github.com/Chia-Network/vdf-competition/blob/main/classgroups.pdf 'Binary quadratic forms white paper, by Lipa Long').

Chia's mainnet was launched on March 19, 2021. Development of its ecosystem is ongoing.

For more information on the company's strategies, see [Chia's business white paper](https://www.chia.net/whitepaper "Chia's business white paper").

## Chia's key features

Chia aims to improve upon Bitcoin's many pioneering ideas in the fields of cryptography and digital currencies, while maintaining the same overall purpose and philosophy. Some of Chia's new features and improvements include:

### Smart transactions

Chia has a new smart transaction model, which uses a powerful (yet simple) higher-level language called [chialisp](https://chialisp.com 'Chialisp.com'), and an accompanying lower-level language called CLVM (ChiaLisp Virtual Machine).

Chia uses the coin set model (similar to Bitcoin's UTXO) to track the blockchain's state. The simple nature of this model facilitates the writing of high value and secure contracts. Unlike in systems that use the account model such as Ethereum, the code that creates Chia's coins is strongly sandboxed. This increases security, reduces Maximum Extractable Value (MEV), and makes the code fully auditable.

> For more info on Chia's smart transactions, see [Section 4.1](/docs/04coin-set-model/what-is-a-coin 'Section 4.1: Coins, Puzzles, and Solutions').

### Strong Security

[Chia's coins](https://chialisp.com/docs/coins_spends_and_wallets "Tutorial on Chia's coins") are created in a simple, yet highly secure manner:

`coinID = sha256(parent_ID + puzzlehash + amount)`

The coin's ID (a sha256 hash) is the main aspect that's stored on the blockchain. Hashes are not reversible, so it's very difficult for a hacker analyzing the blockchain to even determine what a coin's type is, let alone to view the code that created it. Contrast that with Ethereum, where it's trivial to view a smart contract's source code by using a decompiler.

Also due to hashing, a hacker cannot change a coin's parent_ID, puzzlehash, or amount without changing the ID as well. The only aspect of a coin that a hacker can attempt to change is its solution, and it's trivial to ensure that any such changes will result in a failure to spend the coin.

> For more info, see [chialisp.com](https://chialisp.com/ 'Chialisp.com').

### Energy efficient

The PoST consensus has a much [lower energy consumption](https://chiapower.org "Chia's energy consumption statistics") compared to Proof of Work (PoW), and part of Chia's
vision involves improving the carbon footprint of the blockchain industry.

> Chia's consensus algorithm is discussed in detail in [Section 3](/docs/03consensus/consensus_intro 'Section 3.1: Chia Consensus').

### Decentralized

Chia uses a consensus algorithm called [Proofs of Space and Time](https://www.chia.net/assets/ChiaGreenPaper.pdf "Chia's Green Paper"). This algorithm allows anyone with an internet connection and some free disk space to participate in securing the network. Because of this process of farming (analogous to mining), Chia has become the most decentralized blockchain on the planet, with hundreds of thousands of full nodes securing the system.

### Improved Pooling

Like many other blockchains, Chia allows pooling to smooth out the rewards structure for smaller farmers. However, Chia's pooling protocol has three unique features:

- Farmers create new blocks, whether they're farming solo or as a member of a pool.

This design decision was made in conjunction with Chia's goal of decentralization. In other blockchains such as Bitcoin, four or five pools control over 51% of the global hashrate on any given day. (Sources: [blockchain.com](https://www.blockchain.com/pools "blockchain.com pie chart of Bitcoin's hashrate distribution"), [blockchair.com](https://blockchair.com/bitcoin/charts/hashrate-distribution "blockchair.com pie chart of Bitcoin's hashrate distribution")) Arguably, the easiest way to attack Bitcoin would be to bribe each of these pools' operators.

In Chia, the pool operators are only responsible for distributing rewards. They cannot modify the blockchain. Therefore, Chia's pooling protocol doesn't lead to increased centralization.

- Joining a pool is permissionless. Farmers don't need to sign up for anything in order to join.

- When a block is won, the farmer gets 1/8 of the rewards, and the pool operator gets the other 7/8. This was done to discourage pool operators from harming their competition by farming on a competing pool and neglecting to create a block when they find a proof. (Solo farmers collect the entire reward when they create a block.)

> For more info on Chia's pooling protocol, see [Section 11](/docs/11pooling/pooling 'Section 11: Pooling').

### Other key features

There are many other innovations in Chia, some of which include:

- BLS signatures, which allow aggregating all of a block's signatures together.
- Scalability and performance improvements, which allow running a Chia node on a Raspberry Pi.
- Weight proofs and light clients, which enable fast syncing from a mobile device. For more info, see [Section 3.12](/docs/03consensus/light_clients 'Section 3.12: Chia Light Clients') .

This documentation will explain the motivation and implementation of the different components of the Chia system to a technical audience, and provide in-depth explanations of how everything works. If you would like to skip to how to make dapps (decentralized
apps) on Chia, please visit [chialisp.com](https://chialisp.com).

This is a test for localization. Will test after.

Delete Text.
