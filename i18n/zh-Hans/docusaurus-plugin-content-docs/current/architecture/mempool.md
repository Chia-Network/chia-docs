---
title: Mempool
slug: /mempool
---

The mempool (or memory pool) is a collection of transactions stored by full nodes, usually in memory, before they are confirmed on the blockchain. The mempool is not dictated by the consensus rules; a farmer can change how their mempool functions and customize the rules without permission from other full nodes.

The mempool is a required facet of Chia due to the decentralized nature of the blockchain. Transaction blocks occur approximately every 52 seconds, and it's impossible to predict who will win a block. Therefore, all transactions must be broadcast to the whole network and stored locally until they are confirmed. Additionally, it is normal to have more pending transactions than can fit in a single block, so the mempool also acts as a queue for inclusion into the blockchain.

:::info
How many transactions can fit into a block? Due to the varying size of transactions, and the different definitions of what even counts as a "transaction," there is not an exact number. But just for a bit of rough guidance, approximately 1000 transactions with two inputs and two outputs, or 2000 transactions with one input and one output can fit into a single block.
:::

When a user makes a transaction, it gets sent to a full node, which then verifies it, adds it to the mempool, and broadcasts it to all of its peers. Therefore, transactions get propagated to the whole network in a very short period of time.

## Validation

Only valid transactions are allowed to enter the mempool. The process of validating transactions is similar to the process of validating blocks. This includes running CLVM, checking conditions, validating signatures, and checking that the coins to be spent are currently unspent and valid.

The transaction is also checked against other transactions in the mempool, to ensure there are no conflicts.

## Fee Required for Inclusion

When you submit a transaction, one of several possible scenarios will play out, depending on how full the mempool is, how large of a fee was included, the CLVM cost of the transaction, and other factors. Keep in mind that each farmer has its own copy of the mempool, with its own set of rules. The default mempool behavior discussed in this section will apply to most, but not all, nodes. It is up to each individual farmer to decide which transactions to include upon creating a block.

To view the current status of the mempool, see the dashboard for [mainnet](https://dashboard.chia.net/d/46EAA05E/mempool-transactions-and-fees?orgId=1&var-network=mainnet) and [testnet10](https://dashboard.chia.net/d/46EAA05E/mempool-transactions-and-fees?orgId=1&var-network=testnet10).

:::info

Currently, the block size is artificially limited to 50% of its capacity. Eventually this limitation will be lifted, but the numbers discussed in this section assume it is being enforced.

:::

:::info

The total size of the mempool differs by network.
* Mainnet: 550 billion cost, or 100 blocks
* Testnet10: 110 billion cost, or 20 blocks

:::

### Scenario 1: Mempool Not Busy

If the transaction you just submitted -- plus the entire contents of the mempool -- can fit into one block, then your transaction will be added to the next block. This is true even if you don't include a transaction fee.

The reason for this is straightforward -- the farmer has nothing to gain by excluding certain transactions, so it will include everything. Note that some proprietary software takes the opposite approach: the farmer will _only_ include transactions that pay a fee, regardless of mempool size.

The mempool for Chia's mainnet is often in this state. This does not mean that no transactions are being submitted. It simply means that the network's speed of around 20 transactions per second is sufficient to keep up with demand.

### Scenario 2: Mempool Busy But Not Full

If the mempool's contents will occupy more than one block, but the mempool is not full, then it is considered _busy_. In this case:
* Transactions that don't include fees will be added to the mempool, but they won't make it into the next block. Instead, they will have to "wait in line" for higher-priority transactions to be cleared. They likely will eventually be included in a block, but this is not guaranteed.
* Transactions with fees will be added to the mempool and prioritized according to the size of their fee-per-cost. For example, a transaction with a 1-mojo fee will enter the queue ahead of zero-fee transactions.

:::info Testnet10 info

Testnet10 is constantly being "dusted" (thousands of small transactions are being included) in order to simulate a busy network, which can be useful for testing. The dust transactions do not include any fees, so in order for your transaction to be prioritized ahead of the dust, you simply have to include a 1-mojo fee. In this case, your transaction will likely be included in the next transaction block. However, if you don't include a fee, it will likely need to wait ~40-60 minutes before being included.

:::

### Scenario 3: Mempool Full

If the mempool is completely full, then in order for your transaction to be added, it will need to kick out one or more transactions. In this scenario:
* Transactions with no fee will not be added to the mempool.
* Transactions with a fee of less than five mojos per cost (~100 million mojos for 2-input, 2-output transactions) will be treated as zero-fee transactions, i.e. they will not be added to the mempool.
* Transactions with a fee of at least five mojos per cost will be added to the mempool, prioritized by fee-per-cost, _if_ they are not the lowest priority transactions. In this case, one or more of the lowest-priority transactions will be removed.
* If the lowest-cost transaction in the mempool is higher than than the new transaction, then the new transaction will not be added. For example, if the lowest priority transaction in the mempool has a fee of 100 mojos-per-cost (as might be the case in a very busy network), then a new transaction will have to include a higher fee in order to be added to the mempool.

This scenario often occurs on testnet10. When the mempool is completely full, the dusters stop submitting transactions until some of the dust has been cleared. This scenario might occasionally happen on mainnet as well, in which case a minimum fee would be required.

If you see `INVALID_FEE_TOO_CLOSE_TO_ZERO` in your log file, the mempool was likely full when you submitted your transaction, and you did not include a sufficient fee to kick out an existing transaction. Try resubmitting your transaction with a higher fee.

## Replace by Fee

A transaction can replace another transaction in the mempool if it spends at least the same coins as the original one.

For example, if the original transaction spent coins A and B, then another transaction that spends A, B, and C can replace it. However, a transaction that spends B and C cannot. This prevents denial-of-service (DOS) attacks, as well as censorship of transactions. There is also a minimum fee bump which might depend on mempool software being used. In `chia-blockchain`, this is set to 5 fee-per-cost. This prevents spam replacement transactions.

The full conditions for replace by fee are:
1. The new spend bundle needs to include at least all the spends in the original one (can include additional spends)
2. The new spend bundle needs to pay a higher fee per cost than the original one (and higher than the [minimum fee required for inclusion](https://docs.chia.net/mempool/#fee-required-for-inclusion))
3. The new spend bundle needs to pay at least 10000000 mojos more in fees than the original one
4. If there were any time-locks associated with the original spend, the new spend bundle has to have the same time-lock

The replace by fee logic can be found [here](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/mempool_manager.py#L678)in the codebase)

## Block Creation

When the farmer makes a block, they will select the highest fee-per-cost transactions from the mempool until they reach the maximum block size. These spend bundles are combined into one large spend bundle, which is guaranteed to be valid, since all spend bundles in the mempool must spend disjointed coins.

Coin spends cannot impact other coin spends, which is a very nice property of UTXO systems, and allows parallelization of validation and block creation. The aggregate spend bundle also has one aggregate signature, which is a combination of every signature from every transaction in that block.

For performance reasons, the chia-blockchain codebase currently creates only smaller blocks (less than 50% of the maximum size) in order to keep the blockchain smaller and easier to run. This "throttle" is likely to be removed in future versions, after additional optimizations have been performed.

## Updating the Mempool

After a new block is added to the blockchain, all full nodes must look at the coins that were spent in that new block, and remove them from the mempool. The full node does not need to reapply every transaction again, since Chia coin spends are deterministic and sandboxed (see the [Coin Set Intro page](/coin-set-intro) for more information). The full node only needs to look at the spent coins in the new block, and if there are any transactions that spend one of those coins, they are removed from the mempool. This means the mempool can be very large, the codebase can be simple, and high performance can be achieved.
