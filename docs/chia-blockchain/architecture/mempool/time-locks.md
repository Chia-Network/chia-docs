---
title: Time Locks
slug: /chia-blockchain/architecture/mempool/time-locks
---

MempoolItems may issue time lock conditions. That’s any of:

- [ASSERT_HEIGHT_ABSOLUTE](https://chialisp.com/conditions/#assert-height-absolute)
- [ASSERT_HEIGHT_RELATIVE](https://chialisp.com/conditions/#assert-height-relative)
- [ASSERT_SECONDS_ABSOLUTE](https://chialisp.com/conditions/#assert-seconds-absolute)
- [ASSERT_SECONDS_RELATIVE](https://chialisp.com/conditions/#assert-seconds-relative)
- [ASSERT_BEFORE_HEIGHT_ABSOLUTE](https://chialisp.com/conditions/#assert-before-height-absolute)
- [ASSERT_BEFORE_HEIGHT_RELATIVE](https://chialisp.com/conditions/#assert-before-height-relative)
- [ASSERT_BEFORE_SECONDS_ABSOLUTE](https://chialisp.com/conditions/#assert-before-seconds-absolute)
- [ASSERT_BEFORE_SECONDS_RELATIVE](https://chialisp.com/conditions/#assert-before-seconds-relative)
- [ASSERT_MY_BIRTH_HEIGHT](https://chialisp.com/conditions/#assert-my-birth-height)
- [ASSERT_MY_BIRTH_SECONDS](https://chialisp.com/conditions/#assert-my-birth-seconds)

Relative timestamps and heights are relative to the creation of the coin being spent. All relative time locks are resolved to absolute ones and then checked.

### Valid After

Conditions checking that the time is _later_ than some specified time are compared against the timestamp and height of the previous transaction block and potentially rejected immediately. Except `ASSERT_HEIGHT_*`, we have a pending cache where we store transactions that are about to become valid soon.

Implemented in `check_time_locks()` imported from `chia_rs` (Rust). Called from `mempool_manager.py`:

- Rust: [crates/chia-consensus/src/check_time_locks.rs](https://github.com/Chia-Network/chia_rs/blob/main/crates/chia-consensus/src/check_time_locks.rs)
- Python: [chia/full_node/mempool_manager.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/mempool_manager.py)

### Valid Before

Conditions checking that the time is _before_ some specified time need to be added to their own index, to cheaply evict them if they expire before being included in a block.

Transactions that expire need some special treatment. Consider the entire mempool being filled with transactions that all expire at the same time. As that expiration time approaches, we don’t want to add more transactions that also expire around the same time, because we won’t necessarily be able to fit them all in a block before they expire. Thus, wasting space in the mempool, pushing out other transactions.

When adding a block that will expire within 900 seconds (15 minutes) or 48 blocks, we make it compete against all other transactions that also expire within this time-window. If there are more than 1 block worth of transaction cost, we evict the lowest fee-per-cost transactions. If the new transaction has a high enough fee-per-cost (or there are few enough transactions that expire within this window) it will be added to the mempool.

Implemented in [chia/full_node/mempool.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/mempool.py), `add_to_pool()`

### Pending Cache

Mempool items with `ASSERT_HEGHT_ABSOLUTE` or `ASSERT_HEIGHT_RELATIVE` conditions that are not yet valid are added to the pending cache. Every time there’s a new peak, mempool items that now satisfy their time lock are popped from the cache (`drain()`) and attempted to be inserted into the regular mempool.

When the cache is full, items whose valid height is the farthest into the future are evicted first.

Having a pending cache allows wallets to propagate transactions slightly ahead of time, to get them included as soon as they become valid.

Implemented in [chia/full_node/pending_tx_cache.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/pending_tx_cache.py)

### Conflict Cache

New transactions that fail to be added to the mempool because of a conflict may be stored in the conflict cache. Every time we receive a new block, transactions in the conflict cache are re-tried. The conflict cache has a limited size and will evict the oldest transactions first.

Implemented in [chia/full_node/pending_tx_cache.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/pending_tx_cache.py)
