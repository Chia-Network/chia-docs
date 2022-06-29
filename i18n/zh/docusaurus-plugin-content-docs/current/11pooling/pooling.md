---
sidebar_position: 1
---

# 11.1 总结

> Summary

奇亚矿池协议专为安全性和去中心化而设计。它不依赖于任何第三方、封闭代码或受信任的行为。

该协议的一些亮点：

- 农民不能通过双重耕种从矿场里偷东西。
- 农民不需要抵押品即可加入矿池。他们只需要一个带有一个 mojo（可能还有交易费）的钱包来创建一个单例硬币。
- 农民可以轻松安全地更换矿场。
- 农民可以在低端硬件上运行全节点（增加去中心化），例如树莓派 4。
- 农户可以启动一个新的全节点，只用他们的 24 字词组登录奇亚的软件，检测池化配置，不需要中央服务器。

<details>
<summary>原文参考</summary>

The Chia pool protocol has been designed for security and decentralization. It does not rely on any 3rd party, closed code, or trusted behavior.

Some of the protocol's highlights:

- The farmer can never steal from the pool by double farming.
- The farmer does not need collateral to join a pool. They only need a wallet with one mojo (and potentially a transaction fee) to create a singleton.
- The farmer can easily and securely change pools.
- The farmer can run a full node (increasing decentralization) on low-end hardware, such as a Raspberry Pi 4.
- The farmer can start a new full node, using only their 24-word seed phrase to log in to Chia's software, and the pooling configuration is detected, without requiring a central server.

</details>

## 定制

矿池运营商可以定制一些东西，同时仍然遵守协议。这些包括：

- 离开矿池的超时时间
- 难度调整如何发生
- 收取的费用，以及支付多少区块链费用
- 支付时如何计算农民的积分（[PPS，PPLNS，](https://en.bitcoin.it/wiki/Comparison_of_mining_pools)等）
- 农民如何收到付款（XCH、BTC、ETH 等），以及多久收到一次
- 使用什么存储 (DB) - 默认情况下它是一个 SQLite 数据库。 用户可以使用他们自己的商店实现，基于 `AbstractPoolStore` ，通过将它们提供给 `pool_server.start_pool_server`
- 成功登录后会发生什么（就响应而言）
- 矿池的后端架构

然而，有些事情是无法改变的。这些在我们的[矿池规范](https://github.com/Chia-Network/pool-reference/blob/main/SPECIFICATION.md) 中有描述，主要与验证、协议和智能硬币的单例硬币格式有关。

<details>
<summary>原文参考</summary>

- ### Customization

Several things can be customized by pool operators, while still adhering to the protocol. These include:

- How long the timeout is for leaving the pool
- How difficulty adjustment happens
- Fees to take, and how much to pay in blockchain fees
- How farmers' points are counted when paying ([PPS, PPLNS,](https://en.bitcoin.it/wiki/Comparison_of_mining_pools) etc)
- How farmers receive payouts (XCH, BTC, ETH, etc), and how often
- What store (DB) is used - by default it's an SQLite db. Users can use their own store implementations, based on
  `AbstractPoolStore`, by supplying them to `pool_server.start_pool_server`
- What happens (in terms of response) after a successful login
- The backend architecture of the pool

However, some things cannot be changed. These are described in our [pool specification](https://github.com/Chia-Network/pool-reference/blob/main/SPECIFICATION.md), and mostly relate to validation, protocol, and the singleton format for smart coins.

</details>

## 矿池协议摘要

当不汇集时，农民每 9 秒从全节点收到标牌点，并将这些标牌点发送到收割机。

> 请参阅[第 3.5 节](/docs/03consensus/signage_points_and_infusion_points 'Section 3.5: Signage Points and Infusion Points')了解更多详情。

每个标牌点都与 `sub_slot_iters` 和 `difficulty` 一起发送，这两个网络范围的参数每 4608 个块（约 24 小时）调整一次。 `sub_slot_iters` 是网络中最快的 VDF 在 10 分钟内执行的 VDF 迭代次数。如果最快的时间领主的速度增加，这会增加。难度同样受时间领主速度的影响（当时间领主速度增加时难度会增加，因为块来得更快），但它也受网络空间总量的影响。这两个参数决定了“赢得”一个区块并找到证明的难度。

> 请参阅[第 3.4 节](/docs/03consensus/challenges 'Section 3.4: Challenges') 了解更多详细信息。

由于全世界只有大约一个农民每 18.75 秒（两个标志点）找到一个证明，这意味着找到一个的机会很小，默认为 `difficulty`和`sub_slot_iters`。对于池化，我们将 `sub_slot_iters` 增加到一个常数，但非常高的数字：37,600,000,000（376 亿），然后我们将难度降低到人为降低的难度，以便可以更频繁地找到证明。

农户通过 HTTPS 协议与一个或多个矿池通信，并为每个矿池设置自己的本地难度。然后，当向收割机发送标牌点时，使用矿池 `difficulty` 和 `sub_slot_iters`。这意味着农民可以非常频繁地找到证据，可能每 10 分钟一次，即使对于小农场也是如此。

但是，这些“部分”证明不会发送到完整节点以创建块。相反，它们仅被发送到矿池中。这意味着网络中的其他完整节点不必查看和验证其他人的证明，只要矿池规模适当，网络就可以扩展到数百万农民。只有一个给定矿池的农民需要赢得一个区块，整个矿池才能按他们的空间比例获得奖励。

然后，矿池会跟踪每个农民发送的证明（部分）的数量，并按难度对其进行权衡。有时（例如每三天），该矿池可以根据农民提交的部分数量向农民进行支付。拥有更多空间并因此获得更多积分的农民将线性地获得更多奖励。

农民在绘图时不再使用 `pool_public_key`，而是使用谜语哈希，称为 `p2_singleton_puzzle_hash`，也称为 `pool_contract_address`。这些值会进入图块本身，并且在创建图块后无法更改，因为它们已散列到 `plot_id`中。矿池合约地址是称为*单例硬币*或图块 NFT 的 chialisp 合约的地址。农民必须首先在区块链上创建一个单例硬币，该单例硬币存储分配给该单例硬币的矿池的池信息。在制作图块时，会使用该单例硬币的地址，因此该图块永远与该单例硬币相关联。

当农民发现一个区块时，7/8 的区块奖励（矿池部分）进入单例硬币。当农民认领这些资金时，它们会直接发送到矿池的目标地址。奖励的另外 1/8，加上交易费用，直接发送给农民。

> 区块奖励的支付金额会根据减半周期变化，详见[第 5.3 节](/docs/05block-validation/block_rewards#halvings 'Section 5.3: Block reward halvings')。但是，7/8 - 1/8 的比例将始终保持不变。

农民还可以配置他们的支付指令，以便矿池知道将偶尔的奖励发送到哪里。农民可以选择退出矿池，方法是更新单例硬币，然后为自己申领未来的奖励。

<details>
<summary>原文参考</summary>

- ### Pool Protocol Summary

When not pooling, farmers receive signage points from full nodes every 9 seconds, and send these signage points to the harvester.

> See [Section 3.5](/docs/03consensus/signage_points_and_infusion_points 'Section 3.5: Signage Points and Infusion Points') for more details.

Each signage point is sent along with the `sub_slot_iters` and `difficulty`, two network-wide parameters which are adjusted every 4608 blocks (~24 hours). The `sub_slot_iters` is the number of VDF iterations performed in 10 minutes for the fastest VDF in the network. This increases if the fastest timelord's speed increases. The difficulty is similarly affected by timelord speed (it goes up when timelord speed increases, since blocks come faster), but it's also affected by the total amount of space in the network. These two parameters determine how difficult it is to "win" a block and find a proof.

> See [Section 3.4](/docs/03consensus/challenges 'Section 3.4: Challenges') for more details.

Since only about one farmer worldwide finds a proof every 18.75 seconds (two signage points), this means the chances of finding one are tiny, with the default `difficulty` and `sub_slot_iters`. For pooling, we increase the `sub_slot_iters` to a constant, but very high number: 37,600,000,000 (37.6 billion), and then we decrease the difficulty to an artificially lower one, so that proofs can be found more frequently.

The farmer communicates with one or several pools through an HTTPS protocol, and sets their own local difficulty for each pool. Then, when sending signage points to the harvester, the pool `difficulty` and `sub_slot_iters` are used. This means that the farmer can find proofs very often, perhaps every 10 minutes, even for small farms.

These "partial" proofs, however, are not sent to the full node to create a block. They are instead only sent to the pool. This means that the other full nodes in the network do not have to see and validate everyone else's proofs, and the network can scale to millions of farmers, as long as the pool scales properly. Only one of a given pool's farmers needs to win a block for the entire pool to be rewarded proportionally to their space.

The pool then keeps track of how many proofs (partials) each farmer sends, weighing them by difficulty. Occasionally (for example every three days), the pool can perform a payout to farmers based on how many partials they submitted. Farmers with more space, and thus more points, will get linearly more rewards.

Instead of farmers using a `pool_public_key` when plotting, they now use a puzzle hash, referred to as the `p2_singleton_puzzle_hash`, also known as the `pool_contract_address`. These values go into the plot itself, and cannot be changed after creating the plot, since they are hashed into the `plot_id`. The pool contract address is the address of a chialisp contract called a _singleton_ or plot NFT. The farmer must first create a singleton on the blockchain, which stores the pool information of the pool that that singleton is assigned to. When making a plot, the address of that singleton is used, and therefore that plot is tied to that singleton forever.

When a block is found by the farmer, 7/8 of the block reward (the pool portion) go into the singleton. When the farmer claims these funds they are sent directly to the pool's target address. The other 1/8 of the reward, plus transaction fees, are sent directly to the farmer.

> The block reward's payout amount will change according to the halving cycle, detailed in [Section 5.3](/docs/05block-validation/block_rewards#halvings 'Section 5.3: Block reward halvings'). However, the 7/8 - 1/8 ratio will always remain the same.

The farmer can also configure their payout instructions, so that the pool knows where to send the occasional rewards to. Optionally a farmer can opt out of a pool by updating the singleton and then claiming future rewards for themselves.

</details>

## 接收部分

部分是空间证明，其中包含来自农民的一些附加元数据和身份验证信息，满足某些最低难度要求。部分必须是响应区块链标牌点的空间的真实证明，并且必须在区块链时间窗口内（标牌点后 28 秒）提交。

矿池服务器：

1. 接收用户的部分。
2. 验证部分正确并对应于区块链上的有效标牌点。
3. 将部分添加到队列中。

几分钟后，矿池从队列中拉出，并检查该部分的标牌点是否仍在区块链中。如果一切正常，则部分视为有效，并为该农民添加积分。

<details>
<summary>原文参考</summary>

- ### Receiving partials

A _partial_ is a proof of space with some additional metadata and authentication info from the farmer, which meets certain minimum difficulty requirements. Partials must be real proofs of space responding to blockchain signage points, and they must be submitted within the blockchain time window (28 seconds after the signage point).

The pool server:

1. receives partials from the users
2. validates that the partials are correct and correspond to a valid signage point on the blockchain
3. Adds the partials to a queue.

A few minutes later, the pool pulls from the queue, and checks that the signage point for that partial is still in the blockchain. If everything is good, the partial is counted as valid, and the points are added for that farmer.

</details>

## 收集矿池奖励

![](/img/Pooling_absorb.png)

矿池定期在区块链上搜索新的矿池奖励（根据[奖励计划](/docs/05block-validation/block_rewards 'Section 5.3: Block rewards')），这些奖励会分配给每个农民的各种 `p2_singleton_puzzle_hashes`。 这些硬币是锁定的，只能与它们对应的单例硬币一起使用。 单例也被锁定到一个 `target_puzzle_hash`。任何人都可以花费单例硬币和 `p2_singleton_puzzle_hash` 币，只要是出块奖励，并且满足所有条件即可。其中一些条件要求单例硬币始终创建一个具有相同启动器 ID 的新子单例硬币，并将 coinbase 资金发送到 `target_puzzle_hash`。

<details>
<summary>原文参考</summary>

- ### Collecting pool rewards

![](/img/Pooling_absorb.png)

The pool periodically searches the blockchain for new pool rewards (according to the [rewards schedule](/docs/05block-validation/block_rewards 'Section 5.3: Block rewards')) that go to the various `p2_singleton_puzzle_hashes` of each of the farmers. These coins are locked, and can only be spent along with the singleton that they correspond to. The singleton is also locked to a `target_puzzle_hash`. Anyone can spend the singleton and the `p2_singleton_puzzle_hash` coin, as long as it's a block reward, and all conditions are met. Some of these conditions require that the singleton always create exactly one new child singleton with the same launcher ID, and that the coinbase funds are sent to the `target_puzzle_hash`.

</details>

## 计算农民奖励

定期（例如每天一次），该池执行一个支付循环，检查农民最近提交的部分，并向部分或所有农民进行支付。池运营商可以自定义计算余额和支付逻辑的确切方法。

<details>
<summary>原文参考</summary>

- ### Calculating farmer rewards

Periodically (for example once a day), the pool executes a payment loop, going through the recent partials that have been submitted by farmers, and making payouts to some, or all farmers. The exact method for computing balance and payout logic can be customized by the pool operator.

</details>

## 1/8 对 7/8

请注意，奇亚中的 coinbase 奖励分为两种币：农民币和矿池币。农民币（奖励的 1/8，加上交易费用）只进入农民私钥签名的谜语哈希，而矿池币（奖励的 7/8）进入矿池。这种 7/8 - 1/8 的分割是为了防止一个矿池试图通过种植部分来摧毁另一个矿池的攻击，但从不提交获胜块。

如果农民不是矿池的成员，农民币和矿池币都会直接发送给农民。

<details>
<summary>原文参考</summary>

- ### 1/8 vs 7/8

Note that the coinbase rewards in Chia are divided into two coins: the farmer coin and the pool coin. The farmer coin (1/8 of the reward, plus transaction fees) only goes to the puzzle hash signed by the farmer private key, while the pool coin (7/8 of the reward) goes to the pool. This split of 7/8 - 1/8 exists to prevent attacks where one pool tries to destroy another by farming partials, but never submitting winning blocks.

If a farmer is not a member of a pool, the farmer coin and the pool coin are both sent directly to the farmer.

</details>

## 难度

难度允许矿池操作员控制他们每天从每个农民那里收到多少部分。可以为每个农民单独调整难度。一个合理的目标是每天 300 个部分，以确保对农民的频繁反馈和低可变性。

难度为 1 会导致每个 k32 图每天大约有 10 个部分。这是协议 V1 支持的最低难度。但是，池可能会为效率设置更高的最低难度。

在计算证明质量是否足以获得积分时，矿池应使用 `sub_slot_iters=37600000000`。如果农民提交的证明对当前难度不够好，则矿池应通过在响应中设置 `current_difficulty` 来响应。

<details>
<summary>原文参考</summary>

- ### Difficulty

The difficulty allows the pool operator to control how many partials per day they are receiving from each farmer. The difficulty can be adjusted separately for each farmer. A reasonable target would be 300 partials per day, to ensure frequent feedback to the farmer, and low variability.

A difficulty of 1 results in approximately 10 partials per day per k32 plot. This is the minimum difficulty that V1 of the protocol supports. However, a pool may set a higher minimum difficulty for efficiency.

When calculating whether a proof is high-quality enough for being awarded points, the pool should use `sub_slot_iters=37600000000`. If the farmer submits a proof that is not good enough for the current difficulty, the pool should respond by setting the `current_difficulty` in the response.

</details>

## 积分

提交难度为 X 的部分会获得 X 分，这意味着分数与难度呈线性关系。

例如，100 TiB 的空间每天应该产生大约 10,000 个点，无论难度设置为 100 还是 200。只要农民始终提交部分内容，为农民设置什么难度都没有关系。规范不要求矿池按积分按比例支付，但应向农民明确支付方案，并在响应中确认积分并返还累积积分。

<details>
<summary>原文参考</summary>

- ### Points

X points are awarded for submitting a partial with difficulty X, which means that points scale linearly with difficulty.

For example, 100 TiB of space should yield approximately 10,000 points per day, whether the difficulty is set to 100 or 200. It should not matter what difficulty is set for a farmer, as long as they are consistently submitting partials. The specification does not require pools to pay out proportionally by points, but the payout scheme should be clear to farmers, and points should be acknowledged and accumulated points returned in the response.

</details>

## 难度调整算法

以下是矿池执行的简单难度调整算法，参考实现中提供：

- 获取此启动器 ID 的最后一个成功部分
- 如果 > 6 小时，将难度除以 5
- 如果 > 45 分钟 < 6 小时，将难度除以 1.5
- 如果 < 45 分钟：
  - 如果在这个难度下有 < 300 个部分，保持相同的难度
  - 否则，将难度乘以 (24 \* 3600 / (300 个部分所用的时间))

笔记：

- 6 小时用于处理农民存储急剧下降的罕见情况。
- 45 分钟类似，但适用于不太极端的情况。
- 最后，< 45 分钟的最后一种情况应妥善处理空间增加或空间略有减少的用户。

该算法的目标是每天 300 个部分，但可以根据性能和用户偏好使用不同的数字。

该池还可以改进此算法或根据需要对其进行更改。

例如农民可以提供他们自己的 `suggested_difficulty`，矿池可以决定是否更新农民的难度。在设置难度或池支付信息时，矿池应该小心只接受最新的 authentication_public_key。初始参考客户端和池不使用 `suggested_difficulty`。

<details>
<summary>原文参考</summary>

- ### Difficulty adjustment algorithm

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

This algorithm targets 300 partials per day, but different numbers can be used based on
performance and user preference.

The pool can also improve this algorithm or change it however they wish.

For example the farmer can provide their own `suggested_difficulty`, and the pool can decide whether to update that farmer's difficulty. The pool should be careful to only accept the latest authentication_public_key when setting difficulty or pool payout info. The initial reference client and pool do not use the `suggested_difficulty`.

</details>

## 付款

请注意，可以通过更改支付信息 `PUT /farmer` 。用户可以选择奖励的支付地点，这不一定是 XCH 地址。该矿池应仅使用该 launcher_id 的最新看到的身份验证密钥更新成功部分的支付信息。

<details>
<summary>原文参考</summary>

- ### Making payments

Note that the payout info can be changed through `PUT /farmer`. The user can choose where rewards are paid out to, and this does not have to be an XCH address. The pool should ONLY update the payout info for successful partials with the latest seen authentication key for that launcher_id.

</details>
