---
title: Offers
slug: /offers
---

Offers are a way to enable peer-to-peer asset exchange on the Chia blockchain. In other words, you can swap tokens without needing to go through an exchange. Only two parties are required, the maker and the taker. They don't need to trust each other, since any attempts to modify the offer will invalidate it.

Offers are implemented through what's known as an offer file, which contains the details of the offer in hexadecimal bytecode. They can be shared publicly since they don't contain any private keys.

## Chialisp Code

This is the source code of the settlement payments puzzle, which can also be found in the chia-blockchain repository in the puzzle [`settlement_payments.clvm`](https://github.com/Chia-Network/chia-blockchain/blob/164fd158c8626893bc45ba00b87ae69d2ab5f8b7/chia/wallet/puzzles/settlement_payments.clvm).

<details>
  <summary>Expand Settlement Payments Puzzle</summary>

```chialisp title="settlement_payments.clvm"
(mod notarized_payments
  ;; `notarized_payments` is a list of notarized coin payments
  ;; a notarized coin payment is `(nonce . ((puzzle_hash amount ...) (puzzle_hash amount ...) ...))`
  ;; Each notarized coin payment creates some `(CREATE_COIN puzzle_hash amount ...)` payments
  ;; and a `(CREATE_PUZZLE_ANNOUNCEMENT (sha256tree notarized_coin_payment))` announcement
  ;; The idea is the other side of this trade requires observing the announcement from a
  ;; `settlement_payments` puzzle hash as a condition of one or more coin spends.

  (include condition_codes.clvm)

  (defun sha256tree (TREE)
     (if (l TREE)
         (sha256 2 (sha256tree (f TREE)) (sha256tree (r TREE)))
         (sha256 1 TREE)
     )
  )

  (defun create_coins_for_payment (payment_params so_far)
    (if payment_params
        (c (c CREATE_COIN (f payment_params)) (create_coins_for_payment (r payment_params) so_far))
        so_far
    )
  )

  (defun-inline create_announcement_for_payment (notarized_payment)
      (list CREATE_PUZZLE_ANNOUNCEMENT
            (sha256tree notarized_payment))
  )

  (defun-inline augment_condition_list (notarized_payment so_far)
    (c
      (create_announcement_for_payment notarized_payment)
      (create_coins_for_payment (r notarized_payment) so_far)
    )
  )

  (defun construct_condition_list (notarized_payments)
    (if notarized_payments
        (augment_condition_list (f notarized_payments) (construct_condition_list (r notarized_payments)))
        ()
    )
  )

  (construct_condition_list notarized_payments)
)
```

</details>

## Conclusion

Offers are a refreshing new way to swap tokens in a decentralized way without a third party exchange or placing trust in others. They can be shared in any method you choose and accepted by anyone without worrying about the offer being tampered with.
