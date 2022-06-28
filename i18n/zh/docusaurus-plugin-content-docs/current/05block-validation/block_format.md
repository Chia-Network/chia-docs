---
sidebar_position: 2
---

# 5.2 区块格式

> Block format

## 完整区块

完整区块是包含验证和添加块 `N` 所需的所有信息的数据结构，假设已经添加了最多为 `N-1` 的所有区块。完整区块通过网络协议发送，有时也存储在磁盘上，以便将来为其他节点提供服务。

完整区块具有区块链的树干和树叶的字段。用作区块标识符的 `header_hash` 是[流式](/docs/08serialization/serialization)格式的树叶字段的哈希。这将提交所有相关数据和所有先前的区块。

- **finished_sub_sots**：List[EndOfSubSlotBundle]：这包含自链中的前一个区块（区块 `N-1`）以来已经完成的所有子时隙。
- **reward_chain_block**：RewardChainBlock：这是奖励链和挑战链的主干数据，包括 vdf 输出和空间证明。
- **challenge_chain_sp_proof**：Optional[VDFProof]：挑战链标牌点的 VDF 证明，第一个标牌点不提供，因为这是子时隙的结尾。
- **challenge_chain_ip_proof** VDFProof：来自之前挑战链（cc）融入的 VDF 证明，融入点。
- **reward_chain_sp_proof**：Optional[VDFProof]：奖励链标牌点的 VDF 证明，第一个标牌点不提供，因为这是子时隙的结尾。
- **reward_chain_ip_proof** VDFProof：从之前的奖励链（rc）融入到融入点的 VDF 证明。
- **infused_challenge_chain_ip_proof**：Optional[VDFProof]：融入挑战链（ICC）证明，仅在赤字 < 16 时出现
- **foliage**：Foliage：奖励链区块的叶子数据，其哈希值是 `header_hash`。
- **foliage_transaction_block**：Optional[FoliageTransactionBlock]：与轻客户端（不是实际交易）相关的交易相关元数据，仅适用于交易块。
- **transactions_info**：Optional[TransactionsInfo]：与轻客户端（不是实际交易）无关的交易相关元数据，仅适用于交易区块。
- **transactions_generator**：Optional[SerializedProgram]：生成所有交易（支出）的 clvm 程序。
- **transactions_generator_ref_list**: List[uint32]: 此块的生成器引用的先前生成器的块高度列表。

<details>
<summary>原文参考</summary>

- ## Full Block

The full block is the data structure that contains all information required for validating and adding block `N`, assuming all blocks up to `N - 1` are already been added. FullBlocks are sent over the network protocol, and also sometimes stored on disk for the purpose of serving other nodes in the future.

The FullBlock has fields for both the trunk and the foliage of the blockchain. The `header_hash`, which is used as the block identifier, is the hash of the `foliage` field in [streamable](/docs/08serialization/serialization) format. This commits to all relevant data and to all previous blocks.

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

</details>
