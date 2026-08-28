---
title: Replace by Fee
slug: /chia-blockchain/architecture/mempool/replace-by-fee
---

A transaction can replace another transaction in the mempool if it spends at least the same coins as the original one.

For example, if the original transaction spent coins A and B, then another transaction that spends A, B, and C can replace it. However, a transaction that spends B and C cannot. This prevents denial-of-service (DOS) attacks, as well as censorship of transactions. There is also a minimum fee bump which might depend on mempool software being used. In `chia-blockchain`, this is set to 5 fee-per-cost. This prevents spam replacement transactions.

The full conditions for replace by fee are:

1. The new spend bundle needs to include at least all the spends in the original one (the super set rule)
2. The new spend bundle needs to pay a higher fee per cost than the original one (and higher than the [minimum fee required for inclusion](/chia-blockchain/architecture/mempool/fees/)
   /chia-blockchain/architecture/mempool/#fee-required-for-inclusion
3. The new spend bundle needs to pay at least 10000000 mojos more in fees than the original one
4. If there were any time-locks associated with the original spend, the new spend bundle has to have the same time lock (the time lock rule)
5. The new spend bundle must not change any of the existing spend’s eligibility for fast forward or dedup (the fast forward rule)

Spends eligible for Dedup and Fast-forward are not considered conflicts, and are not treated as being replaced and subject to the above restrictions. Conflicts in such spends are deferred to block creation.

Implemented in [chia/full_node/mempool_manager.py](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/full_node/mempool_manager.py) in `can_replace()`

### Super set rule

The super set rule is important to mitigate an attack where a user issues spend A, an attacker replaces it with AB, with a higher fee. The attacker then replaces it with B, effectively evicting transaction A.

### Time lock rule

The time lock rule is important to mitigate an attack where a user issues spend A, an attacker replaces it with AB, where B has a very short expiration time. If B is evicted, it will take A with it, effectively evicting transaction A.

Time locks that start out invalid and become valid (and stay valid) are simple to check. We just ensure they are valid at the time we receive them, before adding them to the mempool. Both time and seconds are checked before adding a mempool item. If we’re replacing a transaction with another, both have already been validated with regards to valid-after conditions.

The time lock rule does not look at `ASSERT_SECONDS_*`.

### Fast forward rule

The fast forward rule mitigates an attack where a user issues a fast-forward spend A, an attacker replaces it with AB which causes A to no longer support fast forward. For example, spending the output of A will prevent it from supporting fast forward. This is likely to cause A to fail to spend its singleton, effectively evicting it.

### Sniping

In cryptocurrency terms, transaction "sniping" occurs when a new transaction supersedes a pending one, typically with a higher blockchain fee. Often, the entity performing the snipe is a bot. Many people view this as an unfair practice because a bot can act faster than a human. [This Medium article](https://medium.com/coinmonks/what-is-token-sniping-measures-to-stop-token-sniping-b28fb3deed55) explains sniping as it applies across various blockchain ecosystems.

#### False hypothetical example

In Chia, one might expect sniping to occur with NFT Offers. For example, Alice (a human) attempts to take an Offer to buy an NFT. While the transaction is still in the mempool, Bob (a bot) takes the same Offer, and includes a higher blockchain fee. Because of the higher fee, Bob's transaction is accepted instead of Alice's.

#### How the superset rule prevents sniping

Offer sniping, as laid out in the example, isn't possible in the default mempool. This is intentional, and by design -- the default mempool's [superset rule](#super-set-rule) prevents it from happening. This rule requires a strict superset in order for RBF to be applied. In the example, Bob's attempt at sniping would _replace_ Alice's original spend, so the mempool will reject it.

This default behavior does come with the tradeoff that farmers won't maximize their blockchain fees. Farmers could implement a custom mempool which eliminates this tradeoff by allowing sniping. This wouldn't violate any consensus rules, and therefore would produce valid blocks, but it would differ from the default mempool's rules.

To reiterate, the default mempool intentionally contains the superset rule in order to prevent sniping.