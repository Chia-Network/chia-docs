---
title: Block Format
---

## Full Block

The full block is the data structure that contains all information required for validating and adding block `N`, assuming all blocks up to `N - 1` have already been added. FullBlocks are sent over the network protocol, and also sometimes stored
on disk for the purpose of serving other nodes in the future.

The FullBlock has fields for both the trunk and the foliage of the blockchain. The `header_hash`, which is used as the block identifier, is the hash of the `foliage` field in [streamable](/docs/serialization/serialization) format. This commits to all relevant data and to all previous blocks.

- **finished_sub_sots**: List[EndOfSubSlotBundle]: This contains all sub-slots that have been completed since the previous block in the chain (block `N-1`).
- **reward_chain_block**: RewardChainBlock: This is trunk data for the reward chain and challenge chain, including vdf outputs and proof of space.
- **challenge_chain_sp_proof**: Optional[VDFProof]: Proof of the VDF for the challenge chain signage point, not provided for the first signage point, since that is and end of sub slot.
- **challenge_chain_ip_proof** VDFProof: VDF proof from the previous cc infusion, up the infusion point.
- **reward_chain_sp_proof**: Optional[VDFProof]: Proof of the VDF for the reward chain signage point, not provided for the first signage point, since that is and end of sub slot.
- **reward_chain_ip_proof** VDFProof: VDF proof from the previous rc infusion, up to the infusion point.
- **infused_challenge_chain_ip_proof**: Optional[VDFProof]: The ICC proof, only present if deficit < 16
- **foliage**: Foliage: Foliage data for the reward chain block, the hash of this is the `header_hash`.
- **foliage_transaction_block**: Optional[FoliageTransactionBlock]: Transaction related metadata that is relevant for light clients (not actual transactions), only for tx blocks.
- **transactions_info**: Optional[TransactionsInfo]: Transaction related metadata that is not relevant for light clients (not actual transactions), only for tx blocks.
- **transactions_generator**: Optional[SerializedProgram]: A clvm program that generates all transactions (spends).
- **transactions_generator_ref_list**: List[uint32]: A list of block heights of previous generators referenced by this block's generator.

// TODO: include sub objects as well
