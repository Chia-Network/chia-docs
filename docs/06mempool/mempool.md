---
sidebar_position: 1
---

# Mempool

The mempool (or memory pool) is a collection of transactions stored by full nodes, usually in memory, before they
are confirmed on the blockchain. The mempool is not dictated by the consensus rules; a farmer can change how their
mempool functions and customize the rules without permission from other full nodes.

The reason the mempool exists, is that blocks aproximately every 47 seconds, and it's impossible to predict who will
win a block, so transactions must be broadcast to the whole network and kept around until they are confirmed. Furthermore,
it is normal for there to be more transactions happening that can fit in a block, so the mempool also acts as a queue
for inclusion into the blockchain.

##  Validation
For a transaction to enter the mempool, it must be valid, and it goes through similar checks that are performed in
block validation. This includes running CLVM, checking conditions, validating signatures, and checking that the spent
coins are unspent and valid.

The transaction is also checked against other transactions in the mempool, to ensure there
are no conflicts. 

## Fee Required for Inclusion
If the mempool is not full, all transactions regarless of fee are accepted into the mempool. The mempool size can
vary by version, but it is 10-100 blocks in size.

Transactions with 0 fee are accepted into the mempool as of chia-blockchain version 1.2.12.
Fees that are very close to zero are considered equivalent to zero. The threshold is set at 5 mojo per cost, but this
can vary by implementation, version, and settings, so it not guaranteed by the protocol.

When the mempool gets full, nodes will start rejecting transactions that don't meet the minimum fee that is required 
for inclusion. The full node sorts the transctions by fee/cost, and kicks out the least valuable transactions first,
when including new ones. 


## Replace by Fee
A transaction can replace another tranasction in the mempool if it spends at least the same coins as the original one.
For example, if the original transaction spent A, B,  then another transaction that spends A, B, C can replace it.
However, a transaction that spends B, C cannot. This prevents DOS and censorship of transactions. There is also
a minimum fee bump which might depend on mempool software being used. In `chia-blockchain`, this is set to 5 fee per 
cost unit. This prevents spam replacement transactions.

## Block Creation
When the farmer makes a block, they will select the highest fee/cost transactions from the mempool until they reach
the maximum block size. These spend bundles are combined into one large spend bundle, which is guaranteed to be valid,
since all spend bundles in the mempool must spend disjoint coins. Coin spends cannot impact other coin spends, which
is a very nice property of UTXO systems, and allows parallelization of validation and block creation. The aggregate
spend bundle also has one aggregate signature, which is a combination of all the signatures of all the transactions in that block.

For performance reasons, the chia-blockchain codebase by default creates only smaller blocks (<50% total size)
in order to keep the blockchain smaller, easier to run, until optimizations are performed. This is likely to be
removed in future versions.

## Updating the Mempool
After a new block is added to the blockchain, all full nodes must look at the coins that were spent in that new block,
and remove them from the mempool. The full node does not need to re-apply every transaction again, since Chia coin spends
are deterministic and sandboxed. The full node just looks at the spent coins in the new block, and if there are
any transactions that spend one of those coins, they are removed from the mempool. This means the mempool can be very large,
the codebase can be simple, and high performance can be achieved.
