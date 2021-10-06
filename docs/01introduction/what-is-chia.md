---
sidebar_position: 1
---

# 1.1 What is Chia?

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