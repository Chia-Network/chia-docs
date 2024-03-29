---
title: 区块格式
slug: /区块格式
---

## 完整块

完整块是一个包含验证和添加区块所需的所有信息的数据结构，它包含了在 `N - 1` 高度前所有区块都已添加的基础上，验证并添加高度为 `N`的区块所需的信息。 完整块均通过网络协议发送，有时为了后续向其他节点提供服务，也会存储在磁盘上。

完整块拥有区块链的trunk和foliage的全部字段。 `header_hash`被用作区块标识符， 是以可流式传输的格式体现的 `foliage` 字段的哈希值(见 [序列化协议](/serialization-protocol))。 这样便以确保当前区块和前序区块的数据不被篡改。

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
- **transactions_generator**: Optional[SerializedProgram]: A clvm/rust program that generates all transactions (spends). See the next section for an important [update](#transactions_generator-update) due to the 2.1.0 hard fork.
- **transactions_generator_ref_list**: List[uint32]: A list of block heights of previous generators referenced by this block's generator.

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
