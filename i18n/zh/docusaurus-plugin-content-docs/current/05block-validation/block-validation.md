---
sidebar_position: 1
---

# 5.1 区块验证

Block validation in Chia is composed of two parts: header validation and body validation.

标题验证执行与共识算法相关的检查，例如空间和时间证明、标牌点和融入点、先前的区块哈希、树叶哈希和时间戳。 值得注意的是，它不验证任何 CLVM、硬币支出或签名。 通常，为了效率，轻客户端会想要验证标题而不是正文。

Body validation entails running all puzzles for spent coins, reading the coin database, verifying signatures, checking for duplicate or invalid removals and additions, etc.

在奇亚中验证一个块需要访问一些过去的块，最大理论值是一个时隙中最大块数的三倍（3x128=384），但通常只需要几个。 此外，验证需要有关先前子时代和时代的信息，以及当前系统时间戳。 实现可以只缓存一些最近的块，而不是将所有块存储在内存中。 `chia-blockchain` 维护着一个区块记录的数据库，其中只包含验证未来区块所需的重要区块信息。

## 完全同步 vs 正常操作

There are two cases when a node might verify blocks.

1. 在完全同步期间，节点试图从旧块高度开始赶上最新的块。 在这种情况下，节点能够一次下载许多块。
2. During normal operation, where the node is caught up to the most recent block, and is only downloading one block every few seconds.

We'll cover both of these cases below.

### 完全同步

完全同步是全节点下载并验证区块链中的所有区块并赶上最新区块的过程。 完全同步很重要，因为它允许新节点验证区块链是最重的——因此也是当前有效的——链。 它允许每个人就当前状态达成共识，无论他们何时上线，或下线多长时间。

The method of full sync can vary between implementations, but the high level algorithm is the following:

1. 连接到网络上的其他对等节点，通过查询介绍人 DNS，爬取网络。
2. Check the current weight of the peak of the peers, and select a few peers to sync from.
3. Download and validate a weight proof, to ensure that the given peak has real work behind it.
4. Download and validate all blocks in the blockchain, in batches.

重量证明很重要，因为它们可以防止其他同行就最重的峰值向我们撒谎。 它们还阻止我们下载可能无用的数据。 一旦全节点赶上区块链，它就可以正常耕种、访问硬币状态等。

### 正常操作

正常操作是一个完整节点不断与其他对等节点闲聊和接收块的过程，始终遵循最重的峰值。 如果我们的节点权重为 2000，并且我们看到一个对等节点在权重 2100 处有一个峰值，那么我们从对等节点获取该块。 通常，这分两个阶段完成：

1. The unfinished block is propagated across the network, along with all information up to the signage point, transactions, etc.
2. 包含注入点 VDF 的完成块也被传播。 这通常不包括已在步骤 1 中发送的交易。

与完全同步相比，正常操作对 CPU 的占用要少得多，因为平均每 18 秒只有一个区块，而每 47 秒只有一个交易区块。 像树莓派 4 这样的低功耗机器应该能够轻松地继续正常运行。

## 区块验证步骤

以下部分列出了确保区块有效性所需的所有检查。 请注意，官方协议和规范由 `chia-blockchain` [python 实现](https://github.com/Chia-Network/chia-blockchain/tree/main/chia/consensus)定义，而不是由本文档页面定义。

### 标题验证

1. Check that the previous block exists in the blockchain, or that it is genesis.
2. Check finished slots that have been crossed since `prev_b`= the previous block in the chain.
   - Check sub-slot challenge hash for genesis block.
   - Check sub-slot challenge hash for non-genesis block.
   - Check sub-slot challenge hash for empty slot.
   - Validate that genesis block has no ICC=Infused challenge chain.
   - Validate that there is not icc iff icc_challenge hash is None.
   - Check infused challenge chain sub-slot VDF.
   - Check infused challenge sub-slot hash in challenge chain, deficit 16.
   - Check infused challenge sub-slot hash not included for other deficits.
   - Check infused challenge sub-slot hash in reward sub-slot.
   - If no icc, check that the cc=challenge chain doesn't include it.
   - If no icc, check that the rc=reward chain doesn't include it.
   - Check sub-epoch summary hash is None for empty slots.
   - Check new difficulty and ssi if applicable.
   - Check new difficulty and ssi are None if we don't finish epoch.
   - Check challenge sub-slot hash in reward sub-slot.
   - Check end of reward slot VDF.
   - Check challenge chain sub-slot VDF.
   - Check deficit (MIN_SUB.. deficit edge case for genesis block) deficit edge case for genesis block)
   - If prev sb had deficit 0, resets deficit to MIN_BLOCK_PER_CHALLENGE_BLOCK
   - Otherwise, deficit stays the same at the slot ends, cannot reset until 0
3. Check sub-epoch summary
   - Check that genesis block does not have sub-epoch summary
   - Check that we finished a slot and we finished a sub-epoch
   - Check the actual sub-epoch is correct
   - Check that we don't have to include a sub-epoch summary
4. Check if the number of blocks is less than the max
5. Check proof of space
6. Check signage point index
7. Check required iters
8. check signage point index 0 has no cc sp and no rc sp
9. Check no overflows in the first sub-slot of a new epoch
10. Check total iters
11. Check reward chain sp proof
12. Check reward chain sp signature
13. Check cc sp vdf
14. Check cc sp sig
15. Check is_transaction_block
16. Check foliage block signature by plot key
17. Check foliage block signature by plot key
18. Check unfinished reward chain block hash
19. Check pool target max height
20. Check pre-farm puzzle hashes for genesis block.
    - 如果空间证明有矿池公钥（pk），请检查池目标签名。 不应该检查这个创世块。
    - Otherwise, the plot is associated with a contract puzzle hash, not a public key, so check pool contract ph
21. 检查扩展数据（如果适用）。 主网没有。
22. Check if foliage block is present
23. Check foliage block hash
24. Check prev block hash for genesis and non-genesis
25. The filter hash in the Foliage Block must be the hash of the filter
26. The timestamp in Foliage Block must not be over 5 minutes in the future, and the timestamp must be greater than the previous transaction block timestamp
27. Check block height for genesis and non-genesis
28. Check block weight for genesis and non-genesis
29. Check challenge chain infusion point VDF
30. Check reward chain infusion point VDF
31. Check infused challenge chain infusion point VDF
32. Check reward block hash
33. Check reward block is_transaction_block

### Body Validation

1. 对于非交易区块：树叶区块、交易过滤器、交易信息和生成器必须为空。 如果它是一个块但不是一个交易块，则没有要验证的主体。 检查所有字段是否为 None，然后返回。
2. For blocks, foliage block, transactions info must not be empty.
3. The transaction info hash in the Foliage block must match the transaction info.
4. The foliage block hash in the foliage block must match the foliage block.
5. The reward claims must be valid for the previous blocks, and current block fees.
6. No transactions before INITIAL_TRANSACTION_FREEZE timestamp (this check has been removed).
7. The generator root must be the hash of the serialized bytes of the generator for this block (or zeroes if no generator)
8. Check the transactions generator reference list:
   - The generator_ref_list must be the hash of the serialized bytes of
   - the generator ref list for this block (or 'one' bytes [0x01] if no generator)
   - The generator ref list length must be less than or equal to MAX_GENERATOR_REF_LIST_SIZE entries
   - The generator ref list must not point to a height >= this block's height
   - If we have a generator reference list, we must have a generator
   - Check that cost <= MAX_BLOCK_COST_CLVM
   - The CLVM program must not return any errors
9. Check that the correct cost is in the transactions info
10. 检查最大硬币数量的加法（小心检查其他语言的 64 位溢出。 这是最大 64 位无符号整数）
11. Validate addition and removal merkle set roots.
12. The additions and removals must result in the correct filter.
13. Check for duplicate outputs in additions.
14. Check for duplicate spends inside block.
15. 检查是否存在移除并且之前没有花费。 （coin_db 到分叉点 + 分叉区块 + this_block）。 小心叉子和临时硬币（在同一块中添加和删除）。
16. Check that the total coin amount for added is <= removed.
17. Check that the assert fee sum <= fees, and that each reserved fee is non-negative.
18. Check that the fee amount + farmer reward < maximum coin amount.
19. Check that the computed fees are equal to the fees in the block header.
20. Verify that removed coin puzzle_hashes match with calculated puzzle_hashes.
21. Verify CLVM conditions.
22. Verify aggregated signature.
