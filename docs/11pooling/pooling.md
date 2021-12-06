---
sidebar_position: 1
---

# 11.1 Summary

The Chia pool protocol has been designed for security and decentralization. It does not rely on any 3rd party, closed code, or trusted behavior. 

Some of the protocol's highlights:

* The farmer can never steal from the pool by double farming.
* The farmer does not need collateral to join a pool. They only need a wallet with one mojo (and potentially a transaction fee) to create a singleton.
* The farmer can easily and securely change pools.
* The farmer can run a full node (increasing decentralization) on low-end hardware, such as a Raspberry Pi 4.
* The farmer can start a new full node, using only their 24-word seed phrase to log in to Chia's software, and the pooling configuration is detected, without requiring a central server.

### Customization
Several things can be customized by pool operators, while still adhering to the protocol. These include:
* How long the timeout is for leaving the pool
* How difficulty adjustment happens
* Fees to take, and how much to pay in blockchain fees  
* How farmers' points are counted when paying (PPS, PPLNS, etc)
* How farmers receive payouts (XCH, BTC, ETH, etc), and how often
* What store (DB) is used - by default it's an SQLite db. Users can use their own store implementations, based on 
  `AbstractPoolStore`, by supplying them to `pool_server.start_pool_server`
* What happens (in terms of response) after a successful login
* The backend architecture of the pool

However, some things cannot be changed. These are described in our [pool specification](https://github.com/Chia-Network/pool-reference/blob/main/SPECIFICATION), and mostly relate to validation, protocol, and the singleton format for smart coins. 

### Pool Protocol Summary
When not pooling, farmers receive signage points from full nodes every 9 seconds, and send these signage points to the harvester.

  See [Section 3.5](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points") for more details.

Each signage point is sent along with the `sub_slot_iters` and `difficulty`, two network-wide parameters which are adjusted every 4608 blocks (~24 hours). The `sub_slot_iters` is the number of VDF iterations performed in 10 minutes for the fastest VDF in the network. This increases if the fastest timelord's speed increases. The difficulty is similarly affected by timelord speed (it goes up when timelord speed increases, since blocks come faster), but it's also affected by the total amount of space in the network. These two parameters determine how difficult it is to "win" a block and find a proof.

  >See [Section 3.4](/docs/03consensus/challenges "Section 3.4: Challenges") for more details.

Since only about 1 farmer worldwide finds a proof every 18.75 seconds (two signage points), this means the chances of finding one are tiny, with the default `difficulty` and `sub_slot_iters`. For pooling, we increase the `sub_slot_iters` to a constant, but very high number: 37600000000, and then we decrease the difficulty to an artificially lower one, so that proofs can be found more frequently.

The farmer communicates with one or several pools through an HTTPS protocol, and sets their own local difficulty for each pool. Then, when sending signage points to the harvester, the pool `difficulty` and `sub_slot_iters` are used. This means that the farmer can find proofs very often, perhaps every 10 minutes, even for small farms.

These "partial" proofs, however, are not sent to the full node to create a block. They are instead only sent to the pool. This means that the other full nodes in the network do not have to see and validate everyone else's proofs, and the network can scale to millions of farmers, as long as the pool scales properly. Since many farmers are part of the pool, only 1 farmer needs to win a block for the entire pool to be rewarded proportionally to their space.

The pool then keeps track of how many proofs (partials) each farmer sends, weighing them by difficulty. Occasionally (for example every three days), the pool can perform a payout to farmers based on how many partials they submitted. Farmers with more space, and thus more points, will get linearly more rewards. 

Instead of farmers using a `pool_public_key` when plotting, they now use a puzzle hash, referred to as the `p2_singleton_puzzle_hash`, also known as the `pool_contract_address`. These values go into the plot itself, and cannot be changed after creating the plot, since they are hashed into the `plot_id`. The pool contract address is the address of a chialisp contract called a _singleton_. The farmer must first create a singleton on the blockchain, which stores the pool information of the pool that that singleton is assigned to. When making a plot, the address of that
singleton is used, and therefore that plot is tied to that singleton forever.

When a block is found by the farmer, 7/8 of the block reward (the pool portion) go into the singleton. When the farmer claims these funds they are sent directly to the pool's target address. The other 1/8 of the reward, plus transaction fees, are sent directly to the farmer. 

  >The block reward's payout amount will change according to the halving cycle, detailed in [Section 5.3](/docs/05block-validation/block_rewards#halvings "Section 5.3: Block reward halvings"))

The farmer can also configure their payout instructions, so that the pool knows where to send the occasional rewards to.


### Receiving partials
A _partial_ is a proof of space with some additional metadata and authentication info from the farmer, which meets certain minimum difficulty requirements. Partials must be real proofs of space responding to blockchain signage points, and they must be submitted within the blockchain time window (~28 seconds after the signage point).

The pool server:
1. receives partials from the users
2. validates that the partials are correct and correspond to a valid signage point on the blockchain
3. Adds the partials to a queue.

A few minutes later, the pool pulls from the queue, and checks that the signage point for that partial is still in the blockchain. If everything is good, the partial is counted as valid, and the points are added for that farmer.


### Collecting pool rewards

The pool periodically searches the blockchain for new pool rewards (according to the [rewards schedule](/docs/05block-validation/block_rewards "Section 5.3: Block rewards")) that go to the various `p2_singleton_puzzle_hashes` of each of the farmers. These coins are locked, and can only be spent along with the singleton that they correspond to. The singleton is also locked to a `target_puzzle_hash`, which in this diagram is the red pool address. Anyone can spend the singleton and the `p2_singleton_puzzle_hash` coin, as long as it's a block reward, and all conditions are met. Some of these conditions require that the singleton always create exactly 1 new child singleton with the same launcher ID, and that the coinbase funds are sent to the `target_puzzle_hash`.

### Calculating farmer rewards

Periodically (for example once a day), the pool executes a payment loop, going through the recent partials that have been submitted by farmers, and making payouts to some, or all farmers. The exact method for computing balance and payout logic can be customized by the pool operator.


### 1/8 vs 7/8
Note that the coinbase rewards in Chia are divided into two coins: the farmer coin and the pool coin. The farmer coin (1/8 of the reward, plus transaction fees) only goes to the puzzle hash signed by the farmer private key, while the pool coin (7/8 of the reward) goes to the pool. This split of 7/8 - 1/8 exists to prevent attacks where one pool tries to destroy another by farming partials, but never submitting winning blocks.

If a farmer is not a member of a pool, the farmer coin and the pool coin are both sent directly to the farmer.

### Difficulty
The difficulty allows the pool operator to control how many partials per day they are receiving from each farmer. The difficulty can be adjusted separately for each farmer. A reasonable target would be 300 partials per day, to ensure frequent feedback to the farmer, and low variability.

A difficulty of 1 results in approximately 10 partials per day per k32 plot. This is the minimum difficulty that the V1 of the protocol supports. However, a pool may set a higher minimum difficulty for efficiency.

When calculating whether a proof is high-quality enough for being awarded points, the pool should use `sub_slot_iters=37600000000`. If the farmer submits a proof that is not good enough for the current difficulty, the pool should respond by setting
the `current_difficulty` in the response.

### Points
X points are awarded for submitting a partial with difficulty X, which means that points scale linearly with difficulty.

For example, 100 TiB of space should yield approximately 10,000 points per day, whether the difficulty is set to 100 or 200. It should not matter what difficulty is set for a farmer, as long as they are consistently submitting partials. The specification does not require pools to pay out proportionally by points, but the payout scheme should be clear to farmers, and points should be acknowledged and accumulated points returned in the response.


### Difficulty adjustment algorithm
The following is a simple difficulty adjustment algorithm executed by the pool, provided in the reference implementation:

- Obtain the last successful partial for this launcher id
- If > 3 hours, divide difficulty by 5
- If > 45 minutes < 6 hours, divide difficulty by 1.5
- If < 45 minutes:
   - If have < 300 partials at this difficulty, maintain same difficulty
   - Else, multiply the difficulty by (24 * 3600 / (time taken for 300 partials))
  
Notes:

* 6 hours is used to handle rare cases where a farmer's storage drops dramatically.
* The 45 minutes is similar, but for less extreme cases.
* Finally, the last case of < 45 minutes should properly handle users with increasing space, or slightly decreasing space.

This algorithm targets 300 partials per day, but different numbers can be used based on
performance and user preference.

The pool can also improve this algorithm or change it however they wish.

For example the farmer can provide their own `suggested_difficulty`, and the pool can decide whether to update that farmer's difficulty. The pool should be careful to only accept the latest authentication_public_key when setting difficulty or pool payout info. The initial reference client and pool do not use the `suggested_difficulty`.

### Making payments
Note that the payout info can be changed through `PUT /farmer`. The user can choose where rewards are paid out to, and this does not have to be an XCH address. The pool should ONLY update the payout info for successful partials with the latest seen authentication key for that launcher_id.