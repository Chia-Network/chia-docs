---
sidebar_position: 1
---

# 1.1 About Chia

## What is Chia?

TODO: add image and link to other sections / resources for keywords
https://www.chia.net/whitepaper/

Chia is a cryptocurrency and blockchain smart transaction platform. It was designed from the ground up to be easier to use and harder to lose than cash, as well as more secure and efficient than other blockchain platforms.

Bram Cohen founded the Chia company and incorporated it in the state of Delaware on August 1, 2017. Bram led the development of Chia, along with of many engineers, researchers, and open source contributors. Along the way, Chia created three new inventions in applied cryptography, and advanced the interest and adoption in a fourth.
  * The first production use of [BLS Signatures](https://github.com/Chia-Network/bls-signatures "Chia's BLS Signatures on GitHub").
  * The first production use of a [Verifiable Delay Function (VDF)](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub").
  * [Proofs of Space](https://github.com/Chia-Network/chiapos "Chia's Proof of Space repository on GitHub") and [Time](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub"), the first (and only) Nakamodo concensus since Proof of Work.
  * The first production use of [class groups of unknown order](https://github.com/Chia-Network/vdf-competition/blob/main/classgroups.pdf "Binary quadratic forms whitepaper, by Lipa Long").

Chia's mainnet was launched on March 19, 2021. Development of its ecosystem is ongoing.

## Chia's key features

Bitcoin was a pioneer in the fields of cryptography and digital currencies. Chia aims to improve upon Bitcoin's many excellent ideas, while maintaining the same overall purpose and philosophy.

### Decentralization

Chia uses a consensus algorithm called [Proof of Space and Time](https://www.chia.net/assets/ChiaGreenPaper.pdf "Chia's Green Paper"), which uses modern cryptography like Verifiable Delay Functions and Proofs of Space. This algorithm allows anyone with an internet connection and some free disk space to participate in securing the network. Because this process of farming (analogous to mining), Chia has become the most decentralized blockchain on the planet, with hundreds of thousands of full nodes securing the system.

### Improved Pooling

Like many other blockchains, Chia allows pooling to smooth out the rewards structure for smaller farmers. However, Chia three unique features regarding its pooling protocol.

  * Farmers create new blocks, whether they're farming solo or as a member of a pool. This design decision was made in conjunction with Chia's goal of decentralization. In other blockchains such as Bitcoin, four or five pools control over 51% of the hashrate on any given day. (Sources: [blockchain.com](https://www.blockchain.com/pools "blockchain.com pie chart of Bitcoin's hashrate distribution"), [blockchair.com](https://blockchair.com/bitcoin/charts/hashrate-distribution "blockchair.com pie chart of Bitcoin's hashrate distribution")) Arguably, the easiest way to attack Bitcoin would be to bribe each of these pools' operators.

  In Chia, the pool operators are responsible for distributing rewards, but they cannot modify the blockchain. Therefore, pooling doesn't increase centralization like it does in other blockchains.

  * Joining a pool is permissionless. Farmers don't need to sign up for anything in order to join.

  * When a block is won, the farmer gets 1/8 of the rewards, and the pool operator gets the other 7/8. This was done to discourage pool operators from harming their competition by farming on a competing pool and neglecting to create a block when they find a proof. (Solo farmers collect the entire reward when they create a block.)

### Energy efficient

This new consensus has a much lower energy consumption compared to proof of work, and part of Chia's
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