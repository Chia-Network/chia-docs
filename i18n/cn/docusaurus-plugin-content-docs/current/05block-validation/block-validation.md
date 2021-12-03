---
sidebar_position: 1
---

# 5.1 区块验证

> Block Validation

Chia 中的块验证由两部分组成：头验证和正文验证。标头验证执行与共识算法相关的检查，例如空间和时间证明、标志点和注入点、上一个区块哈希、树叶哈希和时间戳。值得注意的是，它不验证任何 CLVM、硬币支出或签名。通常，轻客户端希望验证标题而不是正文以提高效率。

实体验证需要运行所有已用硬币的谜题，读取硬币数据库，验证签名，检查重复或无效的删除和添加等。

在 Chia 中验证一个区块需要访问一些过去的区块，最大理论值是一个 slot 中最大区块数的三倍 3x128=384，但通常只需要几个。此外，需要有关先前子纪元和纪元的信息以及当前系统时间戳来验证。实现可以只缓存一些最近的块，而不是将所有块存储在内存中。`chia-blockchain`维护一个块记录数据库，其中仅包含验证未来块所需的重要块信息。

<details>
<summary>原文参考</summary>

Block validation in Chia is composed of two parts: header validation and body validation. The header validation
performs consensus algorithm related checks like proof of space and time, signage points and infusion points, 
prev block hashes, foliage hashes, and timestamps. Notably, it does not validate any CLVM, coin spends, or signatures.
Usually, light clients will want to validate headers but not the body for efficiency.

Body validation entails running all puzzles for spent coins, reading the coin database, verifying signatures, checking
for duplicate or invalid removals and additions, etc.

Validating a block in Chia will require access to some blocks in the past, up to a maximum theoretical value
of three times the max number of blocks in a slot 3x128=384, but usually only a few are needed. Also, information 
regarding previous sub epochs and epochs is needed to validate, as well as the current system timestamp. Implementations
can cache only some recent blocks instead of storing all blocks in memory. `chia-blockchain` maintains a DB of BlockRecords,
which contain only the important pieces of block information required for validating future blocks.

</details>

## 完全同步与正常操作

节点可能会验证块的情况有两种。第一个是完全同步，这意味着节点试图从旧块高度赶上新块高度，并一次下载许多块。另一种是正常操作，节点赶上最近的块，并且每隔几秒钟只下载一个块。

### 完全同步

完全同步是全节点下载并验证区块链中的所有块并赶上最新块的过程。完全同步很重要，因为它允许新节点验证区块链是最重的，因此是当前有效的链。它允许每个人对当前状态达成共识，无论他们何时上线，也无论他们下线多长时间。

完全同步的方法可能因实现而异，但高级算法如下：

1. 连接到网络上的其他对等点，通过查询介绍人 DNS，并爬取网络
2. 查看当前peer的峰值权重，选择几个 peer 进行同步
3. 下载并验证重量证明，以确保给定的峰值背后有实际工作
4. 批量下载并验证区块链中的所有区块

重量证明很重要，因为它们可以防止其他同行就最重的峰值向我们撒谎，并防止我们下载可能无用的数据。一旦全节点赶上区块链，它就可以正常耕种、访问硬币状态等。

### 正常操作

正常操作是一个完整节点不断与其他对等节点闲聊和接收块的过程，始终遵循最重的峰值。如果我们的节点权重为 2000，并且我们看到一个对等节点在权重 2100 处有一个峰值，那么我们从对等节点获取该块。通常，这是分两个阶段完成的：首先发送未完成的块，其中包括直到标志点、交易等的所有信息。最后，还发送包含注入点 VDF 的完成块，通常没有已经发送的交易。

与完全同步相比，正常操作对 CPU 的占用要少得多，因为每 18 秒只有一个区块，而平均每 47 秒只有一个交易区块。像 RPI4 这样的低功率机器应该能够轻松地继续正常运行。

<details>
<summary>原文参考</summary>

- ## Full Sync vs Normal Operation

There are two cases when a node might verify blocks. The first is full sync, which means the node is trying to catch
up from an old block height, to a new one, and downloads many blocks at one. The other is normal operation, where the
node is caught up to the most recent block, and is only downloading one block every few seconds.

- ### Full Sync

Full sync is the process by which a full nodes downloads and validates all the blocks in the blockchain and catches
up to the most recent blocks. Full sync is important, because it allows new nodes to validate that a blockchain is
the heaviest and thus the currently valid chain. It allows everyone to come to consensus on the current state, 
regardless of when they come online, and regardless of how long they go offline. 

The method of full sync can vary between implementations, but the high level algorithm is the following:
1. Connect to other peers on the network, by querying the introducer DNS, and crawling the network
2. Check the current weight of the peak of the peers, and select a few peers to sync from
3. Download and validate a weight proof, to ensure that the given peak has real work behind it
4. Download and validate all blocks in the blockchain, in batches

Weight proofs are important, because they prevent other peers from lying to us about what the heaviest peak is,
and prevents us from downloading potentially useless data. Once the full node is caught up to the blockchain, it can 
properly farm, access the coin state, etc.

- ### Normal Operation

Normal operation is the process by which a full node continuously gossips and receives blocks with other peers, 
always following the heaviest peak. If our node is at weight 2000, and we see that a peer has a peak at weight 2100,
then we fetch that block from the peer. Usually, this is done in two phases: first the unfinished block is sent around,
which includes all the information up to the signage point, transactions, etc. Finally, the finished block which 
includes infusion point VDFs is sent as well,  usually without the transactions, which have already been sent.

Normal operation is much less CPU intensive than full sync, since there is only one block every 18 seconds, and one transaction block
every 47 seconds on average. Low power machines like the RPI4 should be able to easily continue normal operation.

</details>

## 区块验证步骤

以下部分列出了确保区块有效性所需的所有检查。请注意，官方协议和规范由`chia-blockchain` [python 实现](https://github.com/Chia-Network/chia-blockchain/tree/main/chia/consensus)定义，而不是由本文档页面定义。

### 标题验证

1. 检查前一个区块是否存在于区块链中，或者它是创世区块。
2. 检查自`prev_b`=链中的前一个区块以来已经交叉的完成槽。
   * 检查创世区块的子槽挑战哈希。
   * 检查非创世区块的子槽挑战哈希。
   * 检查子槽挑战哈希是否为空槽。
   * 验证创世区块没有 ICC=Infused 挑战链。
   * 如果 icc_challenge 哈希为 None，则验证没有 icc。
   * 检查注入的挑战链子插槽 VDF。
   * 检查挑战链中注入的挑战子槽哈希，赤字 16。
   * 检查注入的挑战子槽哈希不包括其他缺陷。
   * 检查奖励子槽中注入的挑战子槽哈希。
   * 如果没有 icc，请检查 cc=challenge 链是否不包含它。
   * 如果没有 icc，请检查 rc=reward 链是否不包含它。
   * 检查子纪元摘要哈希是否为空槽。
   * 检查新难度和 ssi（如果适用）。
   * 如果我们没有完成 epoch，请检查新难度和 ssi 是否为 None。
   * 检查奖励子槽中的挑战子槽哈希。
   * 检查奖励插槽 VDF 的结尾。
   * 检查挑战链子槽 VDF。
   * 检查赤字（MIN_SUB .. 创世块的赤字边缘情况）
   * 如果 prev sb 的赤字为 0，则将赤字重置为 MIN_BLOCK_PER_CHALLENGE_BLOCK
   * 否则，槽尾赤字保持不变，不能重置，直到 0
3. 查看 sub-epoch 摘要
   * 检查创世区块是否没有子纪元摘要
   * 检查我们是否完成了一个 slot 以及我们是否完成了一个 sub-epoch
   * 检查实际的 sub-epoch 是否正确
   * 检查我们是否不必包含子纪元摘要
4. 检查块数是否小于最大值
5. 检查空间证明
6. 检查标志点索引
7. 检查所需的迭代次数
8. 检查标牌点索引 0 没有 cc sp 和 rc sp
9. 检查新纪元的第一个子槽没有溢出
10. 检查总迭代次数
11. 检查奖励链 sp 证明
12. 检查奖励链 sp 签名
13. 检查 cc sp vdf
14. 检查 cc sp sig
15. 检查 is_transaction_block
16. 通过绘图键检查树叶块签名
17. 通过绘图键检查树叶块签名
18. 查看未完成的奖励链区块哈希
19. 检查池目标最大高度
20. 检查创世区块的农场前拼图哈希。
    * 如果 pospace 有池 pk，请检查池目标签名。不应该检查这个创世块。
    * 否则，情节与合约拼图哈希相关联，而不是公钥，因此请检查池合约 ph
21. 检查扩展数据（如果适用）。主网没有。
22. 检查树叶块是否存在
23. 检查树叶块哈希
24. 检查上一个区块哈希的创世和非创世
25. Foliage Block 中的 filter hash 必须是 filter 的 hash
26. Foliage Block 中的时间戳以后不能超过 5 分钟，并且时间戳必须大于上一个交易块时间戳
27. 检查创世和非创世的区块高度
28. 检查创世和非创世的区块权重
29. 检查挑战链注入点 VDF
30. 查看奖励链注入点 VDF
31. 检查注入的挑战链注入点 VDF
32. 检查奖励区块哈希
33. 检查奖励区块 is_transaction_block 


<details>
<summary>原文参考</summary>

- ## Block Validation Steps

The following sections list all of the required checks to ensure validity of a block. Please note that the official
protocol and specification are defined by the `chia-blockchain` 
[python implementation](https://github.com/Chia-Network/chia-blockchain/tree/main/chia/consensus), and NOT by this documentation page.

- ### Header Validation

1. Check that the previous block exists in the blockchain, or that it is genesis.
2. Check finished slots that have been crossed since `prev_b`= the previous block in the chain.
   * Check sub-slot challenge hash for genesis block.
   * Check sub-slot challenge hash for non-genesis block.
   * Check sub-slot challenge hash for empty slot.
   * Validate that genesis block has no ICC=Infused challenge chain.
   * Validate that there is not icc iff icc_challenge hash is None.
   * Check infused challenge chain sub-slot VDF.
   * Check infused challenge sub-slot hash in challenge chain, deficit 16.
   * Check infused challenge sub-slot hash not included for other deficits.
   * Check infused challenge sub-slot hash in reward sub-slot.
   * If no icc, check that the cc=challenge chain doesn't include it.
   * If no icc, check that the rc=reward chain doesn't include it.
   * Check sub-epoch summary hash is None for empty slots.
   * Check new difficulty and ssi if applicable.
   * Check new difficulty and ssi are None if we don't finish epoch.
   * Check challenge sub-slot hash in reward sub-slot.
   * Check end of reward slot VDF.
   * Check challenge chain sub-slot VDF.
   * Check deficit (MIN_SUB.. deficit edge case for genesis block)
   * If prev sb had deficit 0, resets deficit to MIN_BLOCK_PER_CHALLENGE_BLOCK
   * Otherwise, deficit stays the same at the slot ends, cannot reset until 0
3. Check sub-epoch summary 
   * Check that genesis block does not have sub-epoch summary
   * Check that we finished a slot and we finished a sub-epoch
   * Check the actual sub-epoch is correct
   * Check that we don't have to include a sub-epoch summary
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
    * If pospace has a pool pk, check pool target signature. Should not check this for genesis block.
    * Otherwise, the plot is associated with a contract puzzle hash, not a public key, so check pool contract ph
21. Check extension data if applicable. None for mainnet.
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

</details>

## 身体验证

1. 对于非交易区块：树叶区块、交易过滤器、交易信息和生成器必须为空。如果它是一个块但不是一个交易块，则没有要验证的主体。检查所有字段是否为 None，然后返回。
2. 对于区块，树叶区块，交易信息不能为空。
3. Foliage 区块中的交易信息哈希必须与交易信息匹配。
4. 树叶块中的树叶块哈希必须与树叶块匹配。
5. 奖励要求必须对之前的区块和当前的区块费用有效。
6. INITIAL_TRANSACTION_FREEZE 时间戳之前没有交易（此检查已删除）。
7. 生成器根必须是该块的生成器序列化字节的哈希值（如果没有生成器则为零）
8. 检查交易生成器参考列表：
   * generator_ref_list 必须是序列化字节的哈希
   * 此块的生成器引用列表（如果没有生成器，则为“一个”字节 [0x01]）
   * 生成器引用列表长度必须小于或等于 MAX_GENERATOR_REF_LIST_SIZE 条目
   * 生成器引用列表不能指向一个高度 >= 这个块的高度
   * 如果我们有一个生成器引用列表，我们必须有一个生成器
   * 检查成本 <= MAX_BLOCK_COST_CLVM
   * CLVM 程序不得返回任何错误
9. 检查交易信息中的成本是否正确
10. 检查最大硬币数量的加法（小心检查其他语言的64位溢出。这是最大64位无符号整数）
11. 验证添加和删除默克尔集根。
12. 添加和删除必须产生正确的过滤器。
13. 检查添加的重复输出。
14. 检查块内的重复支出。
15. 检查是否存在移除并且之前没有花费。 （coin_db 到分叉点 + 分叉区块 + this_block）。
小心叉子和临时硬币（在同一块中添加和删除）。
16. 检查添加的总硬币数量 <= 移除。
17. 检查声明费用总和 <= 费用，并且每个保留费用都是非负的。
18.检查费用金额+农民奖励<最大硬币金额。
19. 检查计算的费用是否等于区块头中的费用。
20. 验证移除的硬币拼图_哈希与计算出的拼图_哈希匹配。
21. 验证 CLVM 条件。
22. 验证聚合签名。 

<details>
<summary>原文参考</summary>

### Body Validation

1. For non transaction-blocs: foliage block, transaction filter, transactions info, and generator must
be empty. If it is a block but not a transaction block, there is no body to validate. Check that all fields are
None, and return.
2. For blocks, foliage block, transactions info must not be empty.
3. The transaction info hash in the Foliage block must match the transaction info.
4. The foliage block hash in the foliage block must match the foliage block.
5. The reward claims must be valid for the previous blocks, and current block fees.
6. No transactions before INITIAL_TRANSACTION_FREEZE timestamp (this check has been removed).
7. The generator root must be the hash of the serialized bytes of the generator for this block (or zeroes if no generator)
8. Check the transactions generator reference list:
   * The generator_ref_list must be the hash of the serialized bytes of 
   * the generator ref list for this block (or 'one' bytes [0x01] if no generator)
   * The generator ref list length must be less than or equal to MAX_GENERATOR_REF_LIST_SIZE entries 
   * The generator ref list must not point to a height >= this block's height 
   * If we have a generator reference list, we must have a generator 
   * Check that cost <= MAX_BLOCK_COST_CLVM 
   * The CLVM program must not return any errors 
9. Check that the correct cost is in the transactions info
10. Check additions for max coin amount (be careful to check for 64 bit overflows in other languages. This is the max 64 bit unsigned integer)
11. Validate addition and removal merkle set roots.
12. The additions and removals must result in the correct filter.
13. Check for duplicate outputs in additions.
14. Check for duplicate spends inside block.
15. Check if removals exist and were not previously spent. (coin_db up to the fork point + fork block + this_block).
Be careful with forks and with ephemeral coins (added and removed in same block).
16. Check that the total coin amount for added is <= removed. 
17. Check that the assert fee sum <= fees, and that each reserved fee is non-negative.
18. Check that the fee amount + farmer reward < maximum coin amount.
19. Check that the computed fees are equal to the fees in the block header.
20. Verify that removed coin puzzle_hashes match with calculated puzzle_hashes.
21. Verify CLVM conditions.
22. Verify aggregated signature.

</details>
