---
title: Block Validation
slug: /block-validation
---

Block validation in Chia is composed of two parts: header validation and body validation.

The header validation performs consensus algorithm-related checks, such as proof of space and time, signage points and infusion points, previous block hashes, foliage hashes, and timestamps. Notably, it does not validate any CLVM, coin spends, or signatures. Usually, for efficiency, light clients will want to validate headers but not the body.

Body validation entails running all puzzles for spent coins, reading the coin database, verifying signatures, checking for duplicate or invalid removals and additions, etc.

Validating a block in Chia will require access to some blocks in the past, up to a maximum theoretical value of three times the max number of blocks in a slot (3x128=384), but usually only a few are needed. Also, information regarding previous sub-epochs and epochs is needed for validation, as well as the current system timestamp. Implementations
can cache only some recent blocks instead of storing all blocks in memory. `chia-blockchain` maintains a database of BlockRecords, which contain only the important pieces of block information required for validating future blocks.

## Full Sync vs Normal Operation

There are two cases when a node might verify blocks.

1. During a full sync, where the node is trying to catch up to the most recent block, starting from an old block height. In this case, the node is able to download many blocks at once.
2. During normal operation, where the node is caught up to the most recent block, and is only downloading one block every few seconds.

We'll cover both of these cases below.

### Full Sync

Full sync is the process by which a full node downloads and validates all of the blocks in the blockchain and catches up to the most recent block. Full sync is important, because it allows new nodes to validate that a blockchain is the heaviest -- and thus, the currently valid -- chain. It allows everyone to come to consensus on the current state, regardless of when they come online, or for how long they go offline.

The method of full sync can vary between implementations, but the high level algorithm is the following:

1. Connect to other peers on the network, by querying the DNS introducer, and crawling the network.
2. Check the current weight of the peak of the peers, and select a few peers to sync from.
3. Download and validate a weight proof, to ensure that the given peak has real work behind it.
4. Download and validate all blocks in the blockchain, in batches.

Weight proofs are important, because they prevent other peers from lying to us about what the heaviest peak is. They also prevent us from downloading potentially useless data. Once the full node is caught up to the blockchain, it can properly farm, access the coin state, etc.

### Normal Operation

Normal operation is the process by which a full node continuously gossips and receives blocks with other peers, always following the heaviest peak. If our node is at weight 2000, and we see that a peer has a peak at weight 2100, then we fetch that block from the peer. Usually, this is done in two phases:

1. The unfinished block is propagated across the network, along with all information up to the signage point, transactions, etc.
2. The finished block, which includes infusion point VDFs, is also propagated. This typically excludes the transactions, which were already sent in step 1.

Normal operation is much less CPU-intensive than full sync, since there is only one block every 18 seconds, and one transaction block every 52 seconds, on average. Low-power machines like the Raspberry PI 4 should be able to easily continue normal operation.

## Block Validation Steps

The following sections list all of the required checks to ensure validity of a block. Please note that the official protocol and specification are defined by the `chia-blockchain`
[reference implementation](https://github.com/Chia-Network/chia-blockchain/tree/main/chia/consensus), and not by this documentation page.

### Header Validation

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
   - Check deficit (MIN_SUB.. deficit edge case for genesis block)
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
    - If pospace has a pool pk, check pool target signature. Should not check this for genesis block.
    - Otherwise, the plot is associated with a contract puzzle hash, not a public key, so check pool contract ph
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
   - The generator_ref_list must be the hash of the serialized bytes of
   - the generator ref list for this block (or 'one' bytes [0x01] if no generator)
   - The generator ref list length must be less than or equal to MAX_GENERATOR_REF_LIST_SIZE entries
   - The generator ref list must not point to a height >= this block's height
   - If we have a generator reference list, we must have a generator
   - Check that cost \<= MAX_BLOCK_COST_CLVM
   - The CLVM program must not return any errors
9. Check that the correct cost is in the transactions info
10. Check additions for max coin amount (be careful to check for 64 bit overflows in other languages. This is the max 64 bit unsigned integer)
11. Validate addition and removal merkle set roots.
12. The additions and removals must result in the correct filter.
13. Check for duplicate outputs in additions.
14. Check for duplicate spends inside block.
15. Check if removals exist and were not previously spent. (coin_db up to the fork point + fork block + this_block).
    Be careful with forks and with ephemeral coins (added and removed in same block).
16. Check that the total coin amount for added is \<= removed.
17. Check that the assert fee sum \<= fees, and that each reserved fee is non-negative.
18. Check that the fee amount + farmer reward \< maximum coin amount.
19. Check that the computed fees are equal to the fees in the block header.
20. Verify that removed coin puzzle_hashes match with calculated puzzle_hashes.
21. Verify CLVM conditions.
22. Verify aggregated signature.
