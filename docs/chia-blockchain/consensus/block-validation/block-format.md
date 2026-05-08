---
title: Block Format
slug: /chia-blockchain/consensus/block-validation/block-format
---

## Full Block

The full block is the data structure that contains all information required for validating and adding block `N`, assuming all blocks up to `N - 1` have already been added. FullBlocks are sent over the network protocol, and also sometimes stored
on disk for the purpose of serving other nodes in the future.

The FullBlock has fields for both the trunk and the foliage of the blockchain. The `header_hash`, which is used as the block identifier, is the hash of the `foliage` field in streamable format (see the [Serialization Protocol page](/chia-blockchain/protocol/serialization-protocol)). This commits to all relevant data and to all previous blocks.

- **finished_sub_slots**: List[EndOfSubSlotBundle]: This contains all sub-slots that have been completed since the previous block in the chain (block `N-1`).
- **reward_chain_block**: RewardChainBlock: This is trunk data for the reward chain and challenge chain, including vdf outputs and proof of space.
- **challenge_chain_sp_proof**: Optional[VDFProof]: Proof of the VDF for the challenge chain signage point, not provided for the first signage point, since that is an end of sub slot.
- **challenge_chain_ip_proof**: VDFProof: VDF proof from the previous cc infusion, up the infusion point.
- **reward_chain_sp_proof**: Optional[VDFProof]: Proof of the VDF for the reward chain signage point, not provided for the first signage point, since that is an end of sub slot.
- **reward_chain_ip_proof**: VDFProof: VDF proof from the previous rc infusion, up to the infusion point.
- **infused_challenge_chain_ip_proof**: Optional[VDFProof]: The ICC proof, only present if deficit < 16
- **foliage**: Foliage: Foliage data for the reward chain block, the hash of this is the `header_hash`.
- **foliage_transaction_block**: Optional[FoliageTransactionBlock]: Transaction related metadata that is relevant for light clients (not actual transactions), only for tx blocks.
- **transactions_info**: Optional[TransactionsInfo]: Transaction related metadata that is not relevant for light clients (not actual transactions), only for tx blocks.
- **transactions_generator**: Optional[SerializedProgram]: A clvm/rust program that generates all transactions (spends). See the next section for an important [update](#transactions_generator-update) due to the 2.1.0 hard fork.
- **transactions_generator_ref_list**: List[uint32]: A list of block heights of previous generators referenced by this block's generator.

### FullBlock nested streamable types (subtypes)

In the protocol and RPC responses, `FullBlock` is one concrete streamable struct (implemented in `chia_rs`). Here “subtypes” means the nested streamable types below, not distinct inheritance subclasses.

#### Transaction blocks versus non-transaction blocks

Whether a `FullBlock` carries transactions is determined by `reward_chain_block.is_transaction_block`:

- When that flag is false (not a transaction block), `foliage_transaction_block`, `transactions_info`, and `transactions_generator` are unset (`null` in JSON), and `transactions_generator_ref_list` is empty.
- When it is true (a transaction block), those optional fields contain transaction-related metadata and the block generator program (see the next section for generator serialization).

A JSON example of a non-transaction block is shown under [`get_block`](/reference-client/rpc-reference/full-node-rpc#get_block) in the full node RPC reference.

#### What each nested type holds

- `EndOfSubSlotBundle` (each element of `finished_sub_slots`): describes completed sub-slots between the previous block and this one.
- `RewardChainBlock` (`reward_chain_block`): trunk data (height, weight, cumulative `total_iters`, signage index, proof of space, VDF outputs and related signatures, and `is_transaction_block`).
- `Foliage` (`foliage`): chain linkage and farmer or pool layer (`prev_block_hash`, reward and pool targets, signatures, and hashes tying foliage to the trunk).
- `FoliageTransactionBlock` (`foliage_transaction_block`, optional): light-client metadata for a transaction block (for example timestamp-related fields), not the spends themselves.
- `TransactionsInfo` (`transactions_info`, optional): validation-oriented aggregates such as fees and cost associated with the generator.
- `VDFProof` (each `*_proof` field): witness material for the corresponding VDF output where the protocol requires a proof.

#### Related block-shaped protocol types

Other consensus messages use similar building blocks but are not extra subclasses of `FullBlock`:

- `UnfinishedBlock`: block still being assembled or propagated before it becomes a full block (see [`respond_unfinished_block`](/chia-blockchain/protocol/peer-protocol#respond_unfinished_block) in the peer protocol).
- `HeaderBlock`: header material without the full transactions generator, used when a wallet asks the node for headers only (see [`respond_block_header`](/chia-blockchain/protocol/wallet-protocol#respond_block_header) in the wallet protocol).

## transactions_generator update

Chia underwent a hard fork in version 2.1.0. This included updates to the `transactions_generator` code.

### When

The hard fork will activate at block `5 496 000`, which is expected to occur in June 2024. All nodes need to be compatible with the new implementation prior to this block.

### Why

Among other changes, the `transactions_generator` code was ported to Rust.

There were multiple reasons for this update:

- As an optimization -- Rust is generally more performant than Python
- To support back refs
- To make block validation faster
- To enable compression with block refs by referencing subtrees of prior transactions

### Where

The code for these changes is held in two primary locations:

- The [clvm_rs](https://github.com/Chia-Network/clvm_rs/blob/main/src/serde/de_br.rs) repo has the new serialization and deserialization code.
- The [chia_rs](https://github.com/Chia-Network/chia_rs/tree/main/crates/chia-consensus/src/gen) repo has the consensus generator code.
- The Rust program for running the generator is [run_block_generator.rs](https://github.com/Chia-Network/chia_rs/blob/main/crates/chia-consensus/src/gen/run_block_generator.rs).

### What

Two important changes went into this update:

1. Allow serializing CLVM in a new, more compact form. This doesn't affect how CLVM is executed, it's just a matter of encoding. It does have some important consequences:
   - Farmers can effectively stuff more transactions into blocks, because with a more compact encoding, you can fit more for the same byte-cost.
   - The new implementation can take advantage of the de-duplication in the new serialization format, by caching tree-hashes. This effectively de-duplicates the work of hashing puzzles.

   About the new serialization format:

   The atom `0xfe` is followed by another atom, which is interpreted as a path into the environment (the same form as in CLVM). It references a node from a part of the tree that has already been deserialized (thus, allowing for de-duplicating sub-trees).

2. The generator ROM implementation was ported from CLVM to Rust. This also doesn't affect the behavior of anything (other than the CLVM cost, as explained below). It just speeds up block validation.

   About the generator ROM:
   - It is the code that invokes the generator in a block.
   - The return value is a list of spends.
   - The ROM validates all spends by checking the puzzle hashes and calling into all puzzles passing in their solutions.
   - The work done by the ROM no longer charges a CLVM cost, which has two primary benefits:
     - It allows farmers to put more transactions into blocks.
     - It makes it easier for the farmer to predict the total cost of a block as it's including transactions.

[CHIP-0011](https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0011.md#block-generator-optimizations) contains more info about the generator optimizations.
