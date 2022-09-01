---
sidebar_position: 1
---

# 11.1 总结

奇亚矿池协议专为安全性和去中心化而设计。 它不依赖于任何第三方、封闭代码或受信任的行为。

Some of the protocol's highlights:

- The farmer can never steal from the pool by double farming.
- 农民不需要抵押品即可加入矿池。 他们只需要一个带有一个 mojo（可能还有交易费）的钱包来创建一个单例硬币。
- The farmer can easily and securely change pools.
- The farmer can run a full node (increasing decentralization) on low-end hardware, such as a Raspberry Pi 4.
- The farmer can start a new full node, using only their 24-word seed phrase to log in to Chia's software, and the pooling configuration is detected, without requiring a central server.
- The farmer chooses which transactions to include from their full node and creates transaction blocks in a decentralized way.

### 定制

矿池运营商可以定制一些东西，同时仍然遵守协议。 这些包括：

- How long the timeout is for leaving the pool
- How difficulty adjustment happens
- Fees to take, and how much to pay in blockchain fees
- How farmers' points are counted when paying ([PPS, PPLNS,](https://en.bitcoin.it/wiki/Comparison_of_mining_pools) etc)
- How farmers receive payouts (XCH, BTC, ETH, etc), and how often
- 使用什么存储 (DB) - 默认情况下它是一个 SQLite 数据库。 用户可以使用他们自己的商店实现，基于 `AbstractPoolStore` ，通过将它们提供给 `pool_server.start_pool_server`
- What happens (in terms of response) after a successful login
- The backend architecture of the pool

然而，有些事情是无法改变的。 这些在我们的[矿池规范](https://github.com/Chia-Network/pool-reference/blob/main/SPECIFICATION.md) 中有描述，主要与验证、协议和智能硬币的单例硬币格式有关。

### ### Pool Protocol Summary

When not pooling, farmers receive signage points from full nodes every 9 seconds, and send these signage points to the harvester.

> See [Section 3.5](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points") for more details.

每个标牌点都与 `sub_slot_iters` 和 `difficulty` 一起发送，这两个网络范围的参数每 4608 个块（约 24 小时）调整一次。 `sub_slot_iters` 是网络中最快的 VDF 在 10 分钟内执行的 VDF 迭代次数。 如果最快的时间领主的速度增加，这会增加。 难度同样受时间领主速度的影响（当时间领主速度增加时难度会增加，因为块来得更快），但它也受网络空间总量的影响。 这两个参数决定了“赢得”一个区块并找到证明的难度。

> See [Section 3.4](/docs/03consensus/challenges "Section 3.4: Challenges") for more details.

由于全世界只有大约一个农民每 18.75 秒（两个标志点）找到一个证明，这意味着找到一个的机会很小，默认为 `difficulty`和`sub_slot_iters`。 对于池化，我们将 `sub_slot_iters` 增加到一个常数，但非常高的数字：37,600,000,000（376 亿），然后我们将难度降低到人为降低的难度，以便可以更频繁地找到证明。

农户通过 HTTPS 协议与一个或多个矿池通信，并为每个矿池设置自己的本地难度。 然后，当向收割机发送标牌点时，使用矿池 `difficulty` 和 `sub_slot_iters`。 这意味着农民可以非常频繁地找到证据，可能每 10 分钟一次，即使对于小农场也是如此。

但是，这些“部分”证明不会发送到完整节点以创建块。 相反，它们仅被发送到矿池中。 这意味着网络中的其他完整节点不必查看和验证其他人的证明，只要矿池规模适当，网络就可以扩展到数百万农民。 只有一个给定矿池的农民需要赢得一个区块，整个矿池才能按他们的空间比例获得奖励。

然后，矿池会跟踪每个农民发送的证明（部分）的数量，并按难度对其进行权衡。 有时（例如每三天），该矿池可以根据农民提交的部分数量向农民进行支付。 拥有更多空间并因此获得更多积分的农民将线性地获得更多奖励。

农民在绘图时不再使用 `pool_public_key`，而是使用谜语哈希，称为 `p2_singleton_puzzle_hash`，也称为 `pool_contract_address`。 这些值会进入图块本身，并且在创建图块后无法更改，因为它们已散列到 `plot_id`中。 矿池合约地址是称为*单例硬币*或图块 NFT 的 chialisp 合约的地址。 农民必须首先在区块链上创建一个单例硬币，该单例硬币存储分配给该单例硬币的矿池的池信息。 在制作图块时，会使用该单例硬币的地址，因此该图块永远与该单例硬币相关联。

当农民发现一个区块时，7/8 的区块奖励（矿池部分）进入单例硬币。 当农民认领这些资金时，它们会直接发送到矿池的目标地址。 奖励的另外 1/8，加上交易费用，直接发送给农民。

> 区块奖励的支付金额会根据减半周期变化，详见[第 5.3 节](/docs/05block-validation/block_rewards#halvings "Section 5.3: Block reward halvings")。 但是，7/8 - 1/8 的比例将始终保持不变。

农民还可以配置他们的支付指令，以便矿池知道将偶尔的奖励发送到哪里。 农民可以选择退出矿池，方法是更新单例硬币，然后为自己申领未来的奖励。

### 接收部分

部分是空间证明，其中包含来自农民的一些附加元数据和身份验证信息，满足某些最低难度要求。 部分必须是响应区块链标牌点的空间的真实证明，并且必须在区块链时间窗口内（标牌点后 28 秒）提交。

The pool server:

1. receives partials from the users
2. validates that the partials are correct and correspond to a valid signage point on the blockchain
3. Adds the partials to a queue.

几分钟后，矿池从队列中拉出，并检查该部分的标牌点是否仍在区块链中。 如果一切正常，则部分视为有效，并为该农民添加积分。

### 收集矿池奖励

<div style={{textAlign: 'center'}}>
 <img src="/img/Pooling_absorb.png" alt="drawing" width="600"/>
</div>

矿池定期在区块链上搜索新的矿池奖励（根据[奖励计划](/docs/05block-validation/block_rewards "Section 5.3: Block rewards")），这些奖励会分配给每个农民的各种 `p2_singleton_puzzle_hashes`。 这些硬币是锁定的，只能与它们对应的单例硬币一起使用。 单例也被锁定到一个 `target_puzzle_hash`。 任何人都可以花费单例硬币和 `p2_singleton_puzzle_hash` 币，只要是出块奖励，并且满足所有条件即可。 其中一些条件要求单例硬币始终创建一个具有相同启动器 ID 的新子单例硬币，并将 coinbase 资金发送到 `target_puzzle_hash`。

### 计算农民奖励

定期（例如每天一次），该池执行一个支付循环，检查农民最近提交的部分，并向部分或所有农民进行支付。 池运营商可以自定义计算余额和支付逻辑的确切方法。

### ### 1/8 vs 7/8

请注意，奇亚中的 coinbase 奖励分为两种币：农民币和矿池币。 农民币（奖励的 1/8，加上交易费用）只进入农民私钥签名的谜语哈希，而矿池币（奖励的 7/8）进入矿池。 这种 7/8 - 1/8 的分割是为了防止一个矿池试图通过种植部分来摧毁另一个矿池的攻击，但从不提交获胜块。

If a farmer is not a member of a pool, the farmer coin and the pool coin are both sent directly to the farmer.

### 难度

难度允许矿池操作员控制他们每天从每个农民那里收到多少部分。 可以为每个农民单独调整难度。 一个合理的目标是每天 300 个部分，以确保对农民的频繁反馈和低可变性。

难度为 1 会导致每个 k32 图每天大约有 10 个部分。 这是协议 V1 支持的最低难度。 但是，池可能会为效率设置更高的最低难度。

在计算证明质量是否足以获得积分时，矿池应使用 `sub_slot_iters=37600000000`。 如果农民提交的证明对当前难度不够好，则矿池应通过在响应中设置 `current_difficulty` 来响应。

### ### Points

X points are awarded for submitting a partial with difficulty X, which means that points scale linearly with difficulty.

例如，100 TiB 的空间每天应该产生大约 10,000 个点，无论难度设置为 100 还是 200。 只要农民始终提交部分内容，为农民设置什么难度都没有关系。 规范不要求矿池按积分按比例支付，但应向农民明确支付方案，并在响应中确认积分并返还累积积分。

### 难度调整算法

The following is a simple difficulty adjustment algorithm executed by the pool, provided in the reference implementation:

- Obtain the last successful partial for this launcher id
- If > 6 hours, divide difficulty by 5
- If > 45 minutes < 6 hours, divide difficulty by 1.5
- If < 45 minutes:
  - If have < 300 partials at this difficulty, maintain same difficulty
  - Else, multiply the difficulty by (24 \* 3600 / (time taken for 300 partials))

Notes:

- 6 hours is used to handle rare cases where a farmer's storage drops dramatically.
- The 45 minutes is similar, but for less extreme cases.
- Finally, the last case of < 45 minutes should properly handle users with increasing space, or slightly decreasing space.

This algorithm targets 300 partials per day, but different numbers can be used based on performance and user preference.

The pool can also improve this algorithm or change it however they wish.

例如农民可以提供他们自己的 `suggested_difficulty`，矿池可以决定是否更新农民的难度。 在设置难度或池支付信息时，矿池应该小心只接受最新的 authentication_public_key。 初始参考客户端和池不使用 `suggested_difficulty`。

### 付款

请注意，可以通过更改支付信息 `PUT /farmer` 。 用户可以选择奖励的支付地点，这不一定是 XCH 地址。 该矿池应仅使用该 launcher_id 的最新看到的身份验证密钥更新成功部分的支付信息。
