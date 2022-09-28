---
title: Harvester Algorithm
slug: /harvester-algorithm
---

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

If the resulting bits start with 9 zeroes, then the plot passes the filter. This does not require disk access, since the plot_ids are stored in memory. 2. For each of the plots passing the filter, a new thread is started, which performs the quality lookups. Recall that this requires around 7-9 random reads into the plot, one for each table. This is where the majority of the disk activity will be. On average, 1 of every 512 plots will perform this step. 3. required_iterations is computed, as explained in the [Signage and Infusion Points page](/signage-and-infusion-points). If the farmer is currently farming for a pool, then the pool will use custom values for both `difficulty` and `sub-slot_iterations`. These values make it more likely that a proof will be found. The reason to use these values is to make it easier for the pool to determine the amount of storage a farmer currently has dedicated.
If required_iterations is less than the interval_iterations, this proof of space is good (it has won either a pool partial or a block). Most proofs will not pass this step. 5. For winning proofs, the whole proof is fetched on disk (approximately 64 random reads in the plot). 6. The proof is sent back to the farmer.
