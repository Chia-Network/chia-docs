---
sidebar_position: 6
---

# 3.6 收割机算法

> Harvester Algorithm

大约每 9.375 秒，全节点向农民发送一个新的标牌点，农民将其发送给每个收割机。为每个标牌点发送的确切协议消息如下：

```python
class PoolDifficulty:
    difficulty: uint64
    sub_slot_iters: uint64
    pool_contract_puzzle_hash: bytes32
    
class NewSignagePointHarvester:
    challenge_hash: bytes32
    difficulty: uint64
    sub_slot_iters: uint64
    signage_point_index: uint8
    sp_hash: bytes32
    pool_difficulties: List[PoolDifficulty]
```

1. 收割机接收一个标牌点，并计算绘图过滤器`plot filter bits = sha256(plot_id + challenge_hash + sp_hash)`。如果结果位以 9 个零开头，则图块通过过滤器。这不需要磁盘访问，因为 plot_ids 可以存储在内存中。
2. 对于通过过滤器的每个图块，都会启动一个执行质量查找的新线程。回想一下，这需要对绘图进行大约 7 次随机读取，每个表一个。这是大部分磁盘活动所在的位置。大约 1/512 图块将执行此步骤。
3. 所需迭代器计算，解释[在这里](/docs/03consensus/signage_points_and_infusion_points)。如果该图块当前正在朝着矿池耕种，则使用自定义难度和 SSI，这使得更有可能找到证明，这对于证明存储到矿池中很有用。如果所需的迭代次数小于间隔迭代次数，则这种空间证明是好的（它赢得了矿池部分或一个区块）。大多数证明都不会通过这一步。
4. 为赢得证明。整个证明是在磁盘上获取的（图块中大约有 64 次随机读取）。
5. 证明被送回给农民。

<details>
<summary>原文翻译</summary>

Approximately every 9.375 seconds, the full node sends a new signage point to the farmer, who sends it to each harvester.
The exact protocol message sent for each signage point is the following:

```python
class PoolDifficulty:
    difficulty: uint64
    sub_slot_iters: uint64
    pool_contract_puzzle_hash: bytes32
    
class NewSignagePointHarvester:
    challenge_hash: bytes32
    difficulty: uint64
    sub_slot_iters: uint64
    signage_point_index: uint8
    sp_hash: bytes32
    pool_difficulties: List[PoolDifficulty]
```


1. The harvester receives a signage point, and computes the plot filter `plot filter bits = sha256(plot_id + challenge_hash + sp_hash)`. If the resulting bits start with 9 zeroes, then the plot passes the filter. This does not require disk access, since the plot_ids can be stored in memory.
2. For each of the plots passing the filter, a new thread is started which performs the quality lookups. Recall that this requires around 7 random reads into the plot, one for each table.
This is where the majority of the disk activity will be. About 1/512 plots will perform this step.
3. The required iters are computed, as explained [here](/docs/03consensus/signage_points_and_infusion_points). A custom
difficulty and SSI is used if the plot is currently farming towards a pool; this makes it more likely that a proof will be found, which is useful for proving storage to a pool.
If the required iters is less than the interval iters, this proof of space is good (it has won pool partial or a block).
Most proofs will not pass this step.
5. For winning proofs. the whole proof is fetched on disk (approximately 64 random reads in the plot).
6. The proof is sent back to the farmer.

</details>
