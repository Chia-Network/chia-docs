---
sidebar_position: 1
---

# 5.1 Block Validation
Block validation in Chia is composed of two parts: header validation and body validation. The header validation
performs consensus algorithm related checks like proof of space and time, signage points and infusion points, 
prev block hashes, foliage hashes, and timestamps. Notably, it does not validate any CLVM, coin spends, or signatures.
Usually, light clients will want to validate headers but not the body for efficiency.

Validating a block in Chia will require access to some blocks in the past, up to a maximum theoretical value
of three times the max number of blocks in a slot 3x128=384, but usually only a few are needed. Also, information 
regarding previous sub epochs and epochs is needed to validate, as well as the current system timestamp. Implementations
can cache only some recent blocks instead of storing all blocks in memory. `chia-blockchain` maintains a DB of BlockRecords,
which contain only the important pieces of block information required for validating future blocks.

The following sections list all of the required checks to ensure validity of a block. Please note that the official
protocol and specification are defined by the `chia-blockchain` 
[python implementation](https://github.com/Chia-Network/chia-blockchain/tree/main/chia/consensus), and NOT by this documentation page.

## Header Validation
1. Check that the previous block exists in the blockchain, or that it is genesis.
2. Check finished slots that have been crossed since prev_b
   * check sub-slot challenge hash for genesis block
   * check sub-slot challenge hash for non-genesis block
   * check sub-slot challenge hash for empty slot
   * Validate that genesis block has no ICC
   * Validate that there is not icc iff icc_challenge hash is None
   * Check infused challenge chain sub-slot VDF
   * Check infused challenge sub-slot hash in challenge chain, deficit 16
   * Check infused challenge sub-slot hash not included for other deficits
   * Check infused challenge sub-slot hash in reward sub-slot
   * If no icc, check that the cc doesn't include it
   * If no icc, check that the cc doesn't include it
   * check sub-epoch summary hash is None for empty slots
   * Check new difficulty and ssi
   * Check new difficulty and ssi are None if we don't finish epoch
   * Check challenge sub-slot hash in reward sub-slot
   * Check end of reward slot VDF
   * Check challenge chain sub-slot VDF
   * Check deficit (MIN_SUB.. deficit edge case for genesis block)
   * If prev sb had deficit 0, resets deficit to MIN_BLOCK_PER_CHALLENGE_BLOCK
   * Otherwise, deficit stays the same at the slot ends, cannot reset until 0
3. Check sub-epoch summary 
   * Check that genesis block does not have sub-epoch summary
   * Check that we finished a slot and we finished a sub-epoch
   * Check the actual sub-epoch is correct
   * Check that we don't have to include a sub-epoch summary
4. Check if the number of blocks is less than the max
5a. Check proof of space
5b. Check proof of space
5. check signage point index
6. check required iters
8a. check signage point index 0 has no cc sp
8b. check signage point index 0 has no rc sp
7. Check no overflows in the first sub-slot of a new epoch
8. Check total iters
9. Check reward chain sp proof
10. Check reward chain sp signature
11. Check cc sp vdf
12. Check cc sp sig
13. Check is_transaction_block
14. Check foliage block signature by plot key
15. Check foliage block signature by plot key
16. Check unfinished reward chain block hash
17. Check pool target max height
20a. Check pre-farm puzzle hashes for genesis block.
20b. If pospace has a pool pk, heck pool target signature. Should not check this for genesis block.
20c. Otherwise, the plot is associated with a contract puzzle hash, not a public key
18. Check extension data if applicable. None for mainnet.
19. Check if foliage block is present
20. Check foliage block hash
24a. Check prev block hash for genesis
24b. Check prev block hash for non-genesis
21. The filter hash in the Foliage Block must be the hash of the filter
26a. The timestamp in Foliage Block must not be over 5 minutes in the future
26b. The timestamp must be greater than the previous transaction block timestamp
22. Check block height
23. Check weight
27b. Check genesis block height, weight, and prev block hash
24. Check challenge chain infusion point VDF
25. Check reward chain infusion point VDF
26. Check infused challenge chain infusion point VDF
27. Check reward block hash
28. Check reward block is_transaction_block

## Body Validation

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
- The generator_ref_list must be the hash of the serialized bytes of
- the generator ref list for this block (or 'one' bytes [0x01] if no generator)
- The generator ref list length must be less than or equal to MAX_GENERATOR_REF_LIST_SIZE entries
- The generator ref list must not point to a height >= this block's height
- If we have a generator reference list, we must have a generator
- Check that cost <= MAX_BLOCK_COST_CLVM
- The CLVM program must not return any errors 
- Check that the correct cost is in the transactions info
9. Check additions for max coin amount
Be careful to check for 64 bit overflows in other languages. This is the max 64 bit unsigned integer.
10. Validate addition and removal merkle set roots.
11. The additions and removals must result in the correct filter.
12. Check for duplicate outputs in additions.
13. Check for duplicate spends inside block.
14. Check if removals exist and were not previously spent. (coin_db up to the fork point + fork block + this_block).
Be careful with forks and with ephemeral coins (added and removed in same block).
16a. Check that the total coin amount for added is <= removed.
15. Check that the assert fee sum <= fees, and that each reserved fee is non-negative.
16. Check that the fee amount + farmer reward < maximum coin amount.
17. Check that the computed fees are equal to the fees in the block header.
18. Verify that removed coin puzzle_hashes match with calculated puzzle_hashes.
19. Verify CLVM conditions.
20. Verify aggregated signature.
