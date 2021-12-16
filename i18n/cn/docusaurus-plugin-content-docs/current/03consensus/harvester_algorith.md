---
sidebar_position: 6
---

# 3.6 收割机算法

> Harvester Algorithm

大约每 9.375 秒，全节点向农民发送一个新的标牌点，农民将其发送给每个收割机。

为每个标牌点发送的确切协议消息如下：

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

1. 收割机接收一个标牌点，并计算绘图过滤器：
   
   `plot filter bits = sha256(plot_id + challenge_hash + sp_hash)`
   
   如果结果位以 9 个零开头，则图块通过过滤器。这不需要磁盘访问，因为 plot_ids 可以存储在内存中。
2. 对于通过过滤器的每个图，启动一个新线程，执行质量查找。回想一下，这需要大约七次随机读取绘图，每个表一个。这是大部分磁盘活动所在的位置。平均而言，每 512 个地块中有 1 个将执行此步骤。
3. 计算 required_iterations，如[第 3.5 节](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points")中所述。如果农民当前正在为一个矿池耕作，那么该池将使用自定义值来设置“难度”和“子槽迭代次数”。这些值使得更有可能找到证明。使用这些值的原因是使池更容易确定农民当前拥有的存储量。
如果 required_iterations 小于 interval_iterations，则这个空间证明是好的（它赢得了池部分或块）。大多数证明都不会通过这一步。
4. 对于获胜的证明，整个证明被提取到磁盘上（图中大约有 64 次随机读取）。
5. 证明发回给农民。

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

1. The harvester receives a signage point, and computes the plot filter:
   
    `plot filter bits = sha256(plot_id + challenge_hash + sp_hash)`.
    
    If the resulting bits start with 9 zeroes, then the plot passes the filter. This does not require disk access, since the plot_ids can be stored in memory.
2. For each of the plots passing the filter, a new thread is started, which performs the quality lookups. Recall that this requires around seven random reads into the plot, one for each table. This is where the majority of the disk activity will be. On average, 1 of every 512 plots will perform this step.
3. required_iterations is computed, as explained in [Section 3.5](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points"). If the farmer is currently farming for a pool, then the pool will use custom values for both `difficulty` and `sub-slot_iterations`. These values make it more likely that a proof will be found. The reason to use these values is to make it easier for the pool to determine the amount of storage a farmer currently has dedicated.
If required_iterations is less than the interval_iterations, this proof of space is good (it has won either a pool partial or a block). Most proofs will not pass this step.
5. For winning proofs, the whole proof is fetched on disk (approximately 64 random reads in the plot).
6. The proof is sent back to the farmer.

</details>
