---
title: Mempool
---

The mempool (or memory pool) is a collection of transactions stored by full nodes, usually in memory, before they are confirmed on the blockchain. The mempool is not dictated by the consensus rules; a farmer can change how their mempool functions and customize the rules without permission from other full nodes.

The mempool is a required facet of Chia due to the decentralized nature of the blockchain. Transaction blocks occur approximately every 52 seconds, and it's impossible to predict who will win a block. Therefore, all transactions must be broadcast to the whole network and stored locally until they are confirmed. Additionally, it is normal to have more pending transactions than can fit in a single block, so the mempool also acts as a queue for inclusion into the blockchain.

> How many transactions can fit into a block? Due to the varying size of transactions, and the different definitions of what even counts as a "transaction," there is not an exact number. But just for a bit of rough guidance, approximately 1000 transactions with two inputs and two outputs, or 2000 transactions with one input and one output can fit into a single block.

When a user makes a transaction, it gets sent to a full node, which then verifies it, adds it to the mempool, and broadcasts it to all of its peers. Therefore, transactions get propagated to the whole network in a very short period of time.

## Validation

Only valid transactions are allowed to enter the mempool. The process of validating transactions is similar to the process of validating blocks. This includes running CLVM, checking conditions, validating signatures, and checking that the coins to be spent are currently unspent and valid.

The transaction is also checked against other transactions in the mempool, to ensure there are no conflicts.

## Fee Required for Inclusion

If the mempool is not full, all transactions regardless of fee are accepted into the mempool. The maximum mempool size can vary by version, and transactions have a large variance in size, but it is generally 10-100 blocks.

Transactions with 0 fee are accepted into the mempool as of chia-blockchain version 1.2.12. Fees that are very close to zero are considered equivalent to zero. The threshold is set at 5 mojo per cost, but this can vary by implementation, version, and settings, so it's not guaranteed by the protocol.

When the mempool gets full, nodes will start rejecting transactions that don't meet a minimum fee. The full node sorts the transactions by fee-per-cost, and kicks out the least valuable transactions first, when including new ones.

## Replace by Fee

A transaction can replace another transaction in the mempool if it spends at least the same coins as the original one.

For example, if the original transaction spent coins A and B, then another transaction that spends A, B, and C can replace it. However, a transaction that spends B and C cannot. This prevents denial-of-service (DOS) attacks, as well as censorship of transactions. There is also a minimum fee bump which might depend on mempool software being used. In `chia-blockchain`, this is set to 5 fee-per-cost. This prevents spam replacement transactions.

## Block Creation

When the farmer makes a block, they will select the highest fee-per-cost transactions from the mempool until they reach the maximum block size. These spend bundles are combined into one large spend bundle, which is guaranteed to be valid,
since all spend bundles in the mempool must spend disjointed coins.

Coin spends cannot impact other coin spends, which is a very nice property of UTXO systems, and allows parallelization of validation and block creation. The aggregate
spend bundle also has one aggregate signature, which is a combination of every signature from every transaction in that block.

For performance reasons, the chia-blockchain codebase currently creates only smaller blocks (less than 50% of the maximum size) in order to keep the blockchain smaller and easier to run. This "throttle" is likely to be removed in future versions, after additional optimizations have been performed.

## Updating the Mempool

After a new block is added to the blockchain, all full nodes must look at the coins that were spent in that new block, and remove them from the mempool. The full node does not need to re-apply every transaction again, since Chia coin spends are deterministic and sandboxed (see [chialisp.com](https://chialisp.com) for more info). The full node only needs to look at the spent coins in the new block, and if there are any transactions that spend one of those coins, they are removed from the mempool. This means the mempool can be very large, the codebase can be simple, and high performance can be achieved.
