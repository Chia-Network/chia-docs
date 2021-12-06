---
sidebar_position: 3
---

# 1.3 Chia System Overview

This section will provide a basic overview of Chia's network. We'll go into much more detail in later sections.

### Chia's network
There are different types of peer-to-peer (P2P) networks, such as BitTorrent, Bitcoin, and Chia. The Chia network is a blockchain that performs several major functions, including processing financial transactions, running programs written in Chialisp, and minting tokens from XCH (Chia's base currency). The network is composed of hundreds of thousands of nodes, each of which stores a copy of the blockchain's history, while also propagating new transactions across the network.

### Coins and transactions
Chia uses the coin set (UTXO) model to keep track of the network's state. In this model, a coin is a first-class object. Each coin is locked with a Chialisp program called a _puzzle_, which is then hashed to create a _puzzlehash_. The coin's ID is a hash of its parent coin's ID, its puzzlehash, and its amount.

Each transaction in Chia must spend at least one coin. In order to spend a coin, one must provide the original puzzle, as well as a valid solution, and an optional aggregated signature. Multiple coins can communicate with each other in the same transaction by using _announcements_.

For more info about the coin set model and Chia's on-chain programming environment, see [chialisp.com](https://chialisp.com).

### Nodes
Chia nodes connect to a random subset of other Chia nodes, called peers. The nodes periodically send and receive information from peers, which is then stored locally in a peer database. Each node broadcasts all new transactions and blocks that they see to their peers, which in turn relay this information to _their_ peers, resulting in the information quickly being propagated throughout the network. When first starting up, nodes have to synchronize to the blockchain, by downloading the entire history of blocks and transactions.

  >The Full Node Protocol can be found in [Section 10](/docs/10protocol/protocol "Section 3.10: Full Node Protocol").

Additionally, nodes have the option of _farming_ to help secure the network. They do this by storing large files called _plots_, which mostly consist of random data called _proofs of space_. These proofs of space function as tickets in an ongoing lottery. The more plots a farmer stores, the higher the probability of winning.

  >The plot construction protocol is laid out in [Section 3.2](/docs/03consensus/proof-of-space "Section 3.2: Proof of Space.").

The prize for winning the lottery is called the _block reward_. Initially, this reward is 2 XCH. However, the reward amount is cut in half approximately every three years for the first 12 years of Chia's existence. From that point forward, the reward will always be 1/8 of an XCH.

  >More info on the block reward structure can be found in [Section 5.3](/docs/05block-validation/block_rewards "Section 5.3: Block Rewards").

While "XCH" is a convenient way to denominate Chia coins, the blockchain only knows about _mojos_. These are the smallest denomination of Chia's coins. Each mojo is worth one trillionth (1/1,000,000,000,000) of an XCH.

### Timelord nodes
Timelord nodes broadcast _proofs of time_ (explained in [Section 3.3](/docs/03consensus/vdfs "Section 3.3: VDFs")) around every 9 seconds. This is equivalent to drawing and broadcasting the winning numbers in an ongoing lottery. When a farmer has a valid proof of space, they win the current lottery drawing. This allows them to process the highest-paying transactions in the mempool into a new block. They then broadcast this block to the rest of the network. Around one out of every three blocks contain transactions. The rest of the blocks are empty, but do pay a reward. (See [Section 3.10](/docs/03consensus/foliage "Section 3.10: Foliage") for more details.)

  >The timelord algorithm is explained in [Section 3.13](/docs/03consensus/timelords "Section 3.13: Timelord Algorithm").

### Wallets
Wallets are programs that allow users to interact with the blockchain, by signing and submitting transactions to full nodes. The Chia company includes its official wallet with a typical installation. However, third-party wallets also exist.

  >[Section 3.12](/docs/03consensus/light_clients "Section 3.12: Light Clients") has more info on wallets.

### Pools
Pools allow farmers to smooth out their rewards. They pay out small rewards frequently, often daily. They tend to charge a small fee for their services. The Chia company doesn't run its own pools. Many popular Chia pools also offer services for farming or mining other cryptocurrencies.

  >For more info on Chia's pooling protocol, see [Section 11](/docs/pooling/pooling "Section 11: Pooling").

The rest of the documentation will go into depth into all of the above topics.
