---
sidebar_position: 6
---

# Harvester Algorithm
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
3. The required iters are computed, as explained [here](/docs/03consensus/signage_points_and_infustion_points). A custom
difficulty and SSI is used if the plot is currently farming towards a pool; this makes it more likely that a proof will be found, which is useful for proving storage to a pool.
If the required iters is less than the interval iters, this proof of space is good (it has won pool partial or a block).
Most proofs will not pass this step.
5. For winning proofs. the whole proof is fetched on disk (approximately 64 random reads in the plot).
6. The proof is sent back to the farmer.
