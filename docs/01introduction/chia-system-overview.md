---
sidebar_position: 3
---

# 1.3 Chia System Overview

TODO: add links here

Chia is a peer to peer (P2P) system just like Bitcoin or Bittorrent, which processes payments, transactions, and
programs created by the use's of the system. The network is composed of hundreds of thousands of nodes, which
store the history of the blockchain, and propagate transactions to each other. Each transaction spends at least one coin.
A coin in Chia is an object which has an ID (coin ID), a parent coin ID, an associated amount, and a chialisp program called a puzzle.
The puzzle must be provided with an appropriate solution in order to be spent.

Chia nodes connect to a random subset of other Chia nodes, called peers, and store information about other nodes in the
peer DB. This information is shared periodically between nodes. Nodes broadcast new transactions and blocks that they 
see to all other nodes. When first starting up, nodes have to synchronize to the blockchain, by downloading the entire
history of blocks and transactions.

Timelord nodes periodically broadcast proofs of time (explained in the consensus section) around ever 9 seconds.
Farmers maintain hard drives with plots (very large files full of random numbers) which periodically check for winning
proofs of space, based on the "lottery" that happens every 9 seconds. 
When a farmer wins the lottery, they create a block with the transactions in the memory pool, and 
submit it to the rest of the network for inclusion as the latest block. Not all blocks contain transactions: around 1 in 3 do.
When a farmer wins a block, they obtain some XCH (Chia coin) as reward, initially 2XCH, but decreases with the halving schedule.
Each Chia coin can be subdivided into trillionths, the smallest unit (1 trillionth) is called a mojo.

Wallets are programs that users can use to interact with the blockchain, by signing and submitting transactions to
full nodes. Pools are servers that farmers can connect to, to smooth out their rewards, and win less chia, more often.

The rest of the documentation will go into depth into all of the above topics.
