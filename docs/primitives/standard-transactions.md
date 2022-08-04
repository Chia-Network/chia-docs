---
title: Standard Transactions
slug: /standard-transactions
---

The standard transaction is a puzzle used by the Chia wallet to generate its addresses and spend coins within them. It is also used for CATs and NFTs, which simply wrap the standard transaction inside to enforce ownership by the wallet.

## Chialisp Code

This is the source code of the standard transaction, which can also be found on the [chia-blockchain repository](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/puzzles/p2_delegated_puzzle_or_hidden_puzzle.clvm).

<details>
  <summary>Expand Chialisp</summary>

```chialisp
; build a pay-to delegated puzzle or hidden puzzle
; coins can be unlocked by signing a delegated puzzle and its solution
; OR by revealing the hidden puzzle and the underlying original key

; glossary of parameter names:

; hidden_puzzle: a "hidden puzzle" that can be revealed and used as an alternate
;   way to unlock the underlying funds
;
; synthetic_key_offset: a private key cryptographically generated using the hidden
;   puzzle and as inputs `original_public_key`
;
; SYNTHETIC_PUBLIC_KEY: the public key that is the sum of `original_public_key` and the
;   public key corresponding to `synthetic_key_offset`
;
; original_public_key: a public key, where knowledge of the corresponding private key
;   represents ownership of the file
;
; delegated_puzzle: a delegated puzzle, as in "graftroot", which should return the
;   desired conditions.
;
; solution: the solution to the delegated puzzle


(mod
    ; A puzzle should commit to `SYNTHETIC_PUBLIC_KEY`
    ;
    ; The solution should pass in 0 for `original_public_key` if it wants to use
    ; an arbitrary `delegated_puzzle` (and `solution`) signed by the
    ; `SYNTHETIC_PUBLIC_KEY` (whose corresponding private key can be calculated
    ; if you know the private key for `original_public_key`)
    ;
    ; Or you can solve the hidden puzzle by revealing the `original_public_key`,
    ; the hidden puzzle in `delegated_puzzle`, and a solution to the hidden puzzle.

    (SYNTHETIC_PUBLIC_KEY original_public_key delegated_puzzle solution)

    ; "assert" is a macro that wraps repeated instances of "if"
    ; usage: (assert A0 A1 ... An R)
    ; all of A0, A1, ... An must evaluate to non-null, or an exception is raised
    ; return the value of R (if we get that far)

    (defmacro assert items
        (if (r items)
            (list if (f items) (c assert (r items)) (q . (x)))
            (f items)
        )
    )

    (include condition_codes.clvm)

    ;; hash a tree
    ;; This is used to calculate a puzzle hash given a puzzle program.
    (defun sha256tree1
           (TREE)
           (if (l TREE)
               (sha256 2 (sha256tree1 (f TREE)) (sha256tree1 (r TREE)))
               (sha256 1 TREE)
           )
    )

    ; "is_hidden_puzzle_correct" returns true iff the hidden puzzle is correctly encoded

    (defun-inline is_hidden_puzzle_correct (SYNTHETIC_PUBLIC_KEY original_public_key delegated_puzzle)
      (=
          SYNTHETIC_PUBLIC_KEY
          (point_add
              original_public_key
              (pubkey_for_exp (sha256 original_public_key (sha256tree1 delegated_puzzle)))
          )
      )
    )

    ; "possibly_prepend_aggsig" is the main entry point

    (defun-inline possibly_prepend_aggsig (SYNTHETIC_PUBLIC_KEY original_public_key delegated_puzzle conditions)
      (if original_public_key
          (assert
              (is_hidden_puzzle_correct SYNTHETIC_PUBLIC_KEY original_public_key delegated_puzzle)
              conditions
          )
          (c (list AGG_SIG_ME SYNTHETIC_PUBLIC_KEY (sha256tree1 delegated_puzzle)) conditions)
      )
    )

    ; main entry point

    (possibly_prepend_aggsig
        SYNTHETIC_PUBLIC_KEY original_public_key delegated_puzzle
        (a delegated_puzzle solution))
)
```

</details>

This is the default hidden puzzle, used when calculating the synthetic public key for normal addresses.

```chialisp
(=)
```

## Design Decisions

The synthetic public key is calculated using a child of the root key. It contains a hidden puzzle which can be executed instead of revealing the original public key when spending the standard transaction. This is extra functionality that can be used for other wallets.

Because you don't need to reveal the hidden puzzle ine very spend, it allows you to keep a secret until you want to spend it, even if you use the address to spend other coins normally. It can act as a sort of backup plan or alternative way to spend it.

The default hidden puzzle simply fails when executed, preventing anything other than a typical transaction from being done with coins locked using it.

## Addresses

Previously we mentioned that the standard transaction can be used to create addresses. Here is how it works.

First, you need to use the root key from your mnemonic to derive an unhardened public key at a given index. Use that to calculate the synthetic public key.

Then, you need to create an instance of the standard transaction puzzle using the synthetic public key you calculated. Run the following command to get the puzzle hash:

```bash
opc -H "puzzle"
```

Finally, convert the puzzle hash to a [bech32 address](https://en.bitcoin.it/wiki/Bech32) using the following command:

```bash
cdv encode -p xch "hash"
```
