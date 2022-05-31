---
sidebar_position: 6
---

# 4.6 Coin Set vs UTXO

The UTXO and coin set models of accounting are very similar and are often used interchangeably. This is fine in most contexts; coin set is based on UTXO, and there is a much larger difference between the coin set and account models. However, there are a few key differences, which we'll discuss in this section.

## First class objects

In the UTXO model, _transactions_ are first class objects. Each transaction has an ID and an output number, which is persisted in the system's overall state.

In the coin set model, _coins_ are first class objects (everything is a coin). "Transaction" is a term used to represent the spending of some coins and the creation of others. Coins are the only information persisted in the system's overall state.

## Transaction/coin processing

In Bitcoin's UTXO model, an individual block's transactions are organized as a Merkle tree, where each transaction in a block is a leaf, and the coinbase transaction is the root. The leaves must be sorted in topological, or natural, order. If transaction B spends an output of transaction A, then both A and B are allowed to occur in the same block, but A must be stored in an earlier position than B in the Merkle tree. The logic required to build such a tree requires a large amount of processing power. (See this [Medium article](https://medium.com/fcats-blockchain-incubator/understanding-the-bitcoin-blockchain-header-a2b0db06b515) for more info.)

In Chia's coin set model, each of a block's transactions occur simultaneously. Chia uses two Merkle trees – one for removing coins, and one for adding them.

In a single Chia block, multiple coins can be created, and multiple coins can be spent. Individual coins can even be created and spent in the same block – these are known as _ephemeral_ coins. As long as the rules governing how the coins may be spent are followed, and as long as the total value added and removed is balanced (other than the coinbase coins), the transactions are valid.

This design comes with two advantages over UTXO: it removes the complex logic required to build a valid Merkle tree, and it reduces the viability of certain types of MEV such as front-running, back-running, and sandwich attacks.

## Signature type

Chia uses BLS signatures, which allow for all signatures in a block to be combined, as if each block were a single transaction. This happens non-interactively - the parent of each coin is chosen automatically. For example, if three coins are spent and two are created, typically one of the spent coins will be designated as the parent of both of the new coins.

Bitcoin has used signatures based on the Elliptic Curve Digital Signature Algorithm (ECDSA) since its inception. These signatures don't allow for transactions to be aggregated, so each one must be validated independently. As of the Taproot upgrade in 2021, Bitcoin is also able to use Schnorr signatures, which allow for aggregation. Schnorr signatures are an improvement over ECDSA, but they don't offer the ability to combine all signatures in a block into a single signature. They also use large Merkle trees to generate M of N multisigs, and they rely on random numbers to aggregate signatures. The BLS signatures used by Chia fix all of these problems, and more.
