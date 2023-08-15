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
- **transactions_generator**: Optional[SerializedProgram]: A clvm program that generates all transactions (spends).
- **transactions_generator_ref_list**: List[uint32]: A list of block heights of previous generators referenced by this block's generator.
