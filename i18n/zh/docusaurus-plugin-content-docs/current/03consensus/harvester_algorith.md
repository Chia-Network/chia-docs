---
sidebar_position: 6
---

# 3.6 收割机算法

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

如果结果位以 9 个零开头，则图块通过过滤器。 这不需要磁盘访问，因为 plot_ids 可以存储在内存中。 2. 对于通过过滤器的每个图，启动一个新线程，执行质量查找。 回想一下，这需要大约七次随机读取绘图，每个表一个。 这是大部分磁盘活动所在的位置。 平均而言，每 512 个地块中有 1 个将执行此步骤。 3. 计算所需迭代次数，如[第 3.5 节](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points")中所述。 如果农民当前正在为一个矿池耕作，那么该池将使用自定义值来设置“难度”和“子时隙迭代次数”。 这些值使得更有可能找到证明。 使用这些值的原因是使池更容易确定农民当前拥有的存储量。 如果所需迭代次数小于间隔迭代次数，则这个空间证明是好的（它赢得了矿池部分或块）。 大多数证明都不会通过这一步。 5. For winning proofs, the whole proof is fetched on disk (approximately 64 random reads in the plot). 6. The proof is sent back to the farmer.
