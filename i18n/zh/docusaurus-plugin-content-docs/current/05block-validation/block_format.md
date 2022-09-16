---
sidebar_position: 2
---

# 5.2 区块格式

## 完整区块

完整区块是包含验证和添加块 `N` 所需的所有信息的数据结构，假设已经添加了最多为 `N-1` 的所有区块。 完整区块通过网络协议发送，有时也存储在磁盘上，以便将来为其他节点提供服务。

完整区块具有区块链的树干和树叶的字段。 用作区块标识符的 `header_hash` 是[流式](/docs/08serialization/serialization)格式的树叶字段的哈希。 这将提交所有相关数据和所有先前的区块。

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
- **transactions_generator_ref_list**: List[uint32]: A list of block heights of previous generators referenced by this blocks's generator.

// TODO: include sub objects as well
