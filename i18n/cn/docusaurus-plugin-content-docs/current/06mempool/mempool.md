---
sidebar_position: 1
---

# 6.1 内存池

> Mempool

内存池（mempool 或 memory pool)）是由完整节点存储的交易集合，通常在内存中，然后在区块链上确认。内存池不受共识规则的支配；农民可以在未经其他全节点许可的情况下更改其内存池的运作方式并自定义规则。

由于区块链的去中心化特性，内存池是奇亚的一个必需方面。交易区块大约每 47 秒发生一次，并且无法预测谁将赢得区块。因此，所有交易都必须广播到全网并存储在本地，直到它们被确认。此外，挂起的交易数超过单个区块的容量是正常的，因此内存池也充当包含到区块链中的队列。

> 一个区块可以容纳多少笔交易？由于交易规模的不同，以及对“交易”的不同定义，没有一个确切的数字。但仅作为粗略的指导，大约 1000 笔具有两个输入和两个输出的交易，或 2000 个具有一个输入和一个输出的交易可以放入一个块中。

当用户进行交易时，它会被发送到一个完整的节点，然后该节点对其进行验证，将其添加到内存池中，并将其广播给其所有对等方。因此，交易会在很短的时间内传播到整个网络。

<details>
<summary>原文参考</summary>

The mempool (or memory pool) is a collection of transactions stored by full nodes, usually in memory, before they are confirmed on the blockchain. The mempool is not dictated by the consensus rules; a farmer can change how their mempool functions and customize the rules without permission from other full nodes.

The mempool is a required facet of Chia due to the decentralized nature of the blockchain. Transaction blocks occur approximately every 47 seconds, and it's impossible to predict who will win a block. Therefore, all transactions must be broadcast to the whole network and stored locally until they are confirmed. Additionally, it is normal to have more pending transactions than can fit in a single block, so the mempool also acts as a queue for inclusion into the blockchain.

>How many transactions can fit into a block? Due to the varying size of transactions, and the different definitions of what even counts as a "transaction," there is not an exact number. But just for a bit of rough guidance, approximately 1000 transactions with two inputs and two outputs, or 2000 transactions with one input and one output can fit into a single block.

When a user makes a transaction, it gets sent to a full node, which then verifies it, adds it to the mempool, and broadcasts it to all of its peers. Therefore, transactions get propagated to the whole network in a very short period of time.

</details>

## 验证

只有有效的交易才能进入内存池。验证交易的过程类似于验证区块的过程。这包括运行 CLVM、检查条件、验证签名以及检查要花费的硬币当前是否未花费且有效。

该交易还会与内存池中的其他交易进行检查，以确保没有冲突。

<details>
<summary>原文参考</summary>

- ##  Validation

Only valid transactions are allowed to enter the mempool. The process of validating transactions is similar to the process of validating blocks. This includes running CLVM, checking conditions, validating signatures, and checking that the coins to be spent are currently unspent and valid.

The transaction is also checked against other transactions in the mempool, to ensure there are no conflicts.

</details>

## 加入所需的费用

如果内存池未满，则所有交易，无论费用如何，都将被接收到内存池中。 最大内存池大小会因版本而异，交易大小差异较大，但一般为 10-100 个区块。

从奇亚区块链版本 1.2.12 开始，内存池接受 0 费用的交易。非常接近于零的费用被视为等价于零。阈值设置为每个成本 5 mojo，但这可能因实现、版本和设置而异，因此协议不保证。

当内存池已满时，节点将开始拒绝不满足最低费用的交易。全节点按费用对交易进行排序，并在包括新交易时首先剔除价值最低的交易。

<details>
<summary>原文参考</summary>

- ## Fee Required for Inclusion

If the mempool is not full, all transactions regardless of fee are accepted into the mempool. The maximum mempool size can vary by version, and transactions have a large variance in size, but it is generally 10-100 blocks.

Transactions with 0 fee are accepted into the mempool as of chia-blockchain version 1.2.12. Fees that are very close to zero are considered equivalent to zero. The threshold is set at 5 mojo per cost, but this can vary by implementation, version, and settings, so it's not guaranteed by the protocol.

When the mempool gets full, nodes will start rejecting transactions that don't meet a minimum fee. The full node sorts the transactions by fee-per-cost, and kicks out the least valuable transactions first, when including new ones.

</details>

## 替换为费用

如果一笔交易至少花费与原始交易相同的硬币，则它可以取代内存池中的另一笔交易。

例如，如果原始交易花费了硬币 A 和 B，那么另一个花费 A、B 和 C 的交易可以替换它。 但是，花费 B 和 C 的交易不能。 这可以防止拒绝服务 (DOS) 攻击以及交易审查。 还有一个最低费用可能取决于所使用的内存池软件。 在 `奇亚区块链` 中，这被设置为 5 费用/成本。 这可以防止垃圾邮件替换交易。

<details>
<summary>原文参考</summary>

- ## Replace by Fee

A transaction can replace another tranasction in the mempool if it spends at least the same coins as the original one.

For example, if the original transaction spent coins A and B, then another transaction that spends A, B, and C can replace it. However, a transaction that spends B and C cannot. This prevents denial-of-service (DOS) attacks, as well as censorship of transactions. There is also a minimum fee bump which might depend on mempool software being used. In `chia-blockchain`, this is set to 5 fee-per-cost. This prevents spam replacement transactions.

</details>

## 区块创建

当农民创建一个区块时，他们将从内存池中选择最高费用/成本的交易，直到达到最大区块大小。这些花费组合被组合成一个大的花费组合，它保证是有效的，因为内存池中的所有花费包都必须花费不相交的硬币。

硬币支出不会影响其他硬币支出，这是 UTXO 系统的一个非常好的属性，并且允许验证和块创建的并行化。总支出包也有一个总签名，它是该块中所有交易的所有签名的组合。

出于性能原因，奇亚区块链代码库目前仅创建较小的块（小于最大大小的 50%），以保持区块链更小且更易于运行。在执行了额外的优化之后，这个“节流阀”很可能会在未来的版本中被删除。

<details>
<summary>原文参考</summary>

- ## Block Creation

When the farmer makes a block, they will select the highest fee/cost transactions from the mempool until they reach the maximum block size. These spend bundles are combined into one large spend bundle, which is guaranteed to be valid,
since all spend bundles in the mempool must spend disjoint coins. 

Coin spends cannot impact other coin spends, which is a very nice property of UTXO systems, and allows parallelization of validation and block creation. The aggregate
spend bundle also has one aggregate signature, which is a combination of all the signatures of all the transactions in that block.

For performance reasons, the chia-blockchain codebase currently creates only smaller blocks (less than 50% of the maximum size) in order to keep the blockchain smaller and  easier to run. This "throttle" is likely to be removed in future versions, after additional optimizations have been performed. 

</details>

## 更新内存池

将新区块添加到区块链后，所有完整节点都必须查看在该新区块中花费的硬币，并将它们从内存池中删除。全节点不需要再次重新申请每笔交易，因为奇亚币的支出是确定性和沙盒的（有关更多信息，请参阅  [chialisp.com](https://chialisp.com)）。全节点只需要查看新区块中花费的硬币，如果有任何交易花费了其中一个硬币，它们就会从内存池中删除。这意味着内存池可以非常大，代码库可以很简单，并且可以实现高性能。

<details>
<summary>原文参考</summary>

- ## Updating the Mempool

After a new block is added to the blockchain, all full nodes must look at the coins that were spent in that new block, and remove them from the mempool. The full node does not need to re-apply every transaction again, since Chia coin spends are deterministic and sandboxed (see [chialisp.com](https://chialisp.com) for more info). The full node only needs to look at the spent coins in the new block, and if there are any transactions that spend one of those coins, they are removed from the mempool. This means the mempool can be very large, the codebase can be simple, and high performance can be achieved.

</details>
