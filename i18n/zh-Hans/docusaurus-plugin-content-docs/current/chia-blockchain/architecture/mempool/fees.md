---
title: Fees Required for Inclusion
slug: /chia-blockchain/architecture/mempool/fees
---

When you submit a transaction, one of several possible scenarios will play out, depending on how full the mempool is, how large of a fee was included, the CLVM cost of the transaction, and other factors. Keep in mind that each farmer has its own copy of the mempool, with its own set of rules. The default mempool behavior discussed in this section will apply to most, but not all, nodes. It is up to each individual farmer to decide which transactions to include upon creating a block.

To view the current status of the mempool, see the dashboard for [mainnet](https://dashboard.chia.net/d/46EAA05E/mempool-transactions-and-fees?orgId=1&var-network=mainnet) and [testnet11](https://dashboard.chia.net/d/46EAA05E/mempool-transactions-and-fees?orgId=1&var-network=testnet11).

:::info

- By default, the total size of the mempool is 10 blocks. This true for both [mainnet](https://github.com/Chia-Network/chia-blockchain/blob/99d4993306b2d46dfe6e025b0536fec784ede5ce/chia/consensus/default_constants.py#L63) and [testnet11](https://github.com/Chia-Network/chia-blockchain/blob/99d4993306b2d46dfe6e025b0536fec784ede5ce/chia/util/initial-config.yaml#L35).
- Prior to version 2.2, the block size was artificially capped at 50% of its capacity.
- Starting in version 2.2, the block size cap was increased to 60%.
- Starting in version 2.3, the block size cap was increased to 70%.
- In version 2.5, the artificial cap was [lifted entirely](https://github.com/Chia-Network/chia-blockchain/pull/19005). The limit is now 11 billion cost, which is enforced by the consensus rules.
- The size (in CLVM cost) of the mempool is `mempool blocks * max cost per block * block size limit`.
  - There is no longer a block size limit, so for versions 2.5 and newer, this amounts to `10 * 11 billion = 110 billion`.

:::

### Scenario 1: Mempool Not Busy

If the transaction you just submitted -- plus the entire contents of the mempool -- can fit into one block, then your transaction will be added to the next block. This is true even if you don't include a transaction fee. This is true even if you don't include a transaction fee.

:::info

The mempool currently doesn't currently use compression. This calculation could change when/if compression is taken into account.

:::

The reason for this is straightforward -- the farmer has nothing to gain by excluding certain transactions, so it will include everything. Note that some proprietary software takes the opposite approach: the farmer will *only* include transactions that pay a fee, regardless of mempool size.

The mempool for Chia's mainnet is often in this state. This does not mean that no transactions are being submitted. It simply means that the network's speed of around 20 transactions per second is sufficient to keep up with demand.

### Scenario 2: Mempool Busy But Not Full

If the mempool's contents will occupy more than one block, but the mempool is not full, then it is considered *busy*. In this case:

- Transactions that don't include fees will be added to the mempool, but they won't make it into the next block. Instead, they will have to "wait in line" for higher-priority transactions to be cleared. They likely will eventually be included in a block, but this is not guaranteed. Instead, they will have to "wait in line" for higher-priority transactions to be cleared. They likely will eventually be included in a block, but this is not guaranteed.
- Transactions with fees will be added to the mempool and prioritized according to the size of their fee-per-cost. Transactions with fees will be added to the mempool and prioritized according to the size of their fee-per-cost. For example, a transaction with a 1-mojo fee will enter the queue ahead of zero-fee transactions. (As stated previously, this is the default behavior. Some custom mempools require a larger fee for inclusion in this scenario.)

:::info Testnet11 info

Testnet11 is often being "dusted" (thousands of small transactions are being included) in order to simulate a busy network, which can be useful for testing. The dust transactions do not include any fees, so in order for your transaction to be prioritized ahead of the dust, you simply have to include a 1-mojo fee. In this case, your transaction will likely be included in the next transaction block. However, if you don't include a fee, it will likely need to wait ~40-60 minutes before being included.

:::

### Scenario 3: Mempool Full

If the mempool is completely full, then in order for your transaction to be added, it will need to kick out one or more transactions. In this scenario: In this scenario:

- Transactions with no fee will not be added to the mempool.
- Transactions with a fee of less than five mojos per cost (~100 million mojos for 2-input, 2-output transactions) will be treated as zero-fee transactions, i.e. they will not be added to the mempool.
- Transactions with a fee of at least five mojos per cost will be added to the mempool, prioritized by fee-per-cost, *if* they are not the lowest priority transactions (see Scenario 4 in this case). For info on specific transaction types, see the [costs](/chia-blockchain/coin-set-model/costs/#estimated-transaction-costs) page.

This scenario often occurs on testnet11. This scenario often occurs on testnet10. When the mempool is completely full, the dusters stop submitting transactions until some of the dust has been cleared. This scenario might occasionally happen on mainnet as well, in which case a minimum fee would be required. This scenario might occasionally happen on mainnet as well, in which case a minimum fee would be required.

If you see `INVALID_FEE_TOO_CLOSE_TO_ZERO` in your log file, the mempool was likely full when you submitted your transaction, and you did not include a sufficient fee to kick out an existing transaction. Try resubmitting your transaction with a higher fee.

### Scenario 4: Mempool Full of Transactions with Fees

This is the final scenario, where not only is the mempool completely full, but every transaction in the mempool has a fee of at least five mojos per cost. In order for your transaction to be added to the mempool, it will need to kick out one or more transactions. In this scenario:

- Transactions with no fee will not be added to the mempool.
- Transactions with a fee of less than five mojos per cost (~100 million mojos for 2-input, 2-output transactions) will be treated as zero-fee transactions, i.e. they will not be added to the mempool.
- Transactions with a fee of at least five mojos per cost *might* be added to mempool. For this to happen, they will need to kick out one or more transactions with a lower fee-per-cost ratio. For example:
  - If the "cheapest" transaction currently in the mempool has a fee per cost of 10, and your transaction's fee per cost is 9, then your transaction will not be added to the mempool.
  - If the "cheapest" transaction is 10, and yours is 15, then it likely will be added. However, even in this case, there are scenarios where your transaction might not be added, such as when the lowest-cost transaction currently in the mempool is quite large.

If the mempool from Chia's mainnet reaches this state, the competition for block space will be strong. In order for your transaction to be included, the minimum fee might be significantly higher than it would be in the other scenarios.

### Fast Forward Processing

Starting in Chia 2.5.5, certain transaction types support fast-forward processing, allowing them to be included in blocks more efficiently when specific conditions are met. For more info, see the page dedicated to [fast forward](/chia-blockchain/architecture/mempool/fast-forward/).

**Singleton Fast Forward**: Singleton transactions now support optimized processing, improving block inclusion rates and handling of high-frequency operations.

**Vault Fast Forward**: Vault transactions support enhanced processing with optimized validation and faster state transitions, improving overall mempool throughput for vault operations.
