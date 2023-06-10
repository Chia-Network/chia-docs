---
slug: /guides/crash-course/inner-puzzles
title: Inner Puzzles
---

Puzzles all have something in common, they output a list of conditions. This tells the blockchain what you want to do with the coin. We did this exact thing in an earlier lesson:

```chialisp
(mod (PUBLIC_KEY conditions)
    (include condition_codes.clib)
    (include sha256tree.clib)

    (c
        (list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions))
        conditions
    )
)
```

Here, we are outputting a custom `conditions` which is passed in as a solution.

## Inner Puzzles

We can create a coin within a coin where the inner coin returns a list of conditions to the outer coin. To do this, we will use `(a INNER_PUZZLE inner_solution)`. The operator `a` means `apply` and is how you execute some code. The inner puzzle will be executed with the inner solution.

What the inner puzzle and inner solution is exactly is up to the coin creator. Here is a more complex example for an outer coin:

```chialisp title="outer-puzzle.clsp"
(mod (PUBLIC_KEY INNER_PUZZLE inner_solution)
    (include condition_codes.clib)
    (include sha256tree.clib)

    ; Assert the signature matches and append the conditions.
    (defun calculate_output (PUBLIC_KEY inner_solution conditions)
        (c
            (list AGG_SIG_ME PUBLIC_KEY (sha256tree inner_solution))
            conditions
        )
    )

    ; Pass the output of the inner puzzle to `calculate_output`.
    (calculate_output PUBLIC_KEY inner_solution (a INNER_PUZZLE inner_solution))
)
```

This will first run `(a INNER_PUZZLE inner_solution)`, passing the result to our custom function `calculate_output`. This function will require a signature of the outputted conditions from the inner coin.

You can think of the outer coin as additional layer to control the inner coin. Almost like a template for your coins.

## Inner Puzzle Creation

Let's create an inner puzzle. This will use a new condition code ASSERT_HEIGHT_RELATIVE, which will make sure a certain number of blocks have passed since coin creation before the coin can be spent.

```chialisp title="inner-puzzle.clsp"
(mod (REQUIRED_BLOCKS conditions)
    (include condition_codes.clib)

    (c
        (list ASSERT_HEIGHT_RELATIVE REQUIRED_BLOCKS)
        conditions
    )
)
```

We will also need to get the appropriate include files:

```
cdv clsp retrieve sha256tree condition_codes
```

## The Steps

:::warning
Many of these values used (such as my public key) are specific to me. I left them in to clearly see command usage, but you'll want to substitute where appropriate.

:::

First, let's get our master public key.

```
chia keys show
```

Response:

```
Fingerprint: 1660000549
Master public key (m): b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d
Farmer public key (m/12381/8444/0/0): b4ef65cc62af8cd6d25e72444e1886938cfec436933cfc5e32c14367f846f6728f74a133c30bbab84fd4d0afec0966a0
Pool public key (m/12381/8444/1/0): b6cb156bad3580795ae9377e717a43925ed7622f18ff6ab8c3471f1fdd18ad9906b8e19c22f25fa29fccbf4af3f4acab
First wallet address: txch1kwa0ach5f3djns83cpvsywnwlx4mjqnzyja3vg0jwlsp3cfwes2qlfdf7c
```

You will specifically want the master public key prefixed with `0x`. For me, this value is:

```
0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d
```

Now, let's curry the inner puzzle with some value (in # of blocks)

```bash
cdv clsp curry inner-puzzle.clsp -a 20
```

Response:

```
(a (q 2 (q 4 (c 2 (c 5 ())) 11) (c (q . 82) 1)) (c (q . 20) 1))
```

Once we've created the bytecode for the inner puzzle, we will curry that result in to the outer puzzle, after our public key.

```bash
cdv clsp curry outer-puzzle.clsp -a 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d -a '(a (q 2 (q 4 (c 2 (c 5 ())) 11) (c (q . 82) 1)) (c (q . 20) 1))'
```

Response:

```
(a (q 2 (q 2 10 (c 2 (c 5 (c 23 (c (a 11 23) ()))))) (c (q 50 (c (c 4 (c 5 (c (a 14 (c 2 (c 11 ()))) ()))) 23) 2 (i (l 5) (q 11 (q . 2) (a 14 (c 2 (c 9 ()))) (a 14 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d) (c (q 2 (q 2 (q 4 (c 2 (c 5 ())) 11) (c (q . 82) 1)) (c (q . 20) 1)) 1)))
```

:::info
Now that we curried in our public key, the bytecode will be different from key to key. Make sure you use your own key and prefix with 0x!
:::

## Create the Coin

Now that we have curried the inner puzzle in to the outer puzzle, we will create a coin for our final outer puzzle bytecode.

# Get Puzzle Hash

```
opc -H "<Outer Puzzle>"
```

```
opc -H "(a (q 2 (q 2 10 (c 2 (c 5 (c 23 (c (a 11 23) ()))))) (c (q 50 (c (c 4 (c 5 (c (a 14 (c 2 (c 11 ()))) ()))) 23) 2 (i (l 5) (q 11 (q . 2) (a 14 (c 2 (c 9 ()))) (a 14 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d) (c (q 2 (q 2 (q 4 (c 2 (c 5 ())) 11) (c (q . 82) 1)) (c (q . 20) 1)) 1)))"
```

Response:

```
e4fd576c99d4cb789a21b3173d18e916c37634720c9ecd9d25f615d24bd1e3c5
```

# Get Puzzle Reveal

While we are at it, let's also get our serialized puzzle for the `puzzle_reveal`.

```
opc "<Outer Puzzle>"
```

```
opc "(a (q 2 (q 2 10 (c 2 (c 5 (c 23 (c (a 11 23) ()))))) (c (q 50 (c (c 4 (c 5 (c (a 14 (c 2 (c 11 ()))) ()))) 23) 2 (i (l 5) (q 11 (q . 2) (a 14 (c 2 (c 9 ()))) (a 14 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d) (c (q 2 (q 2 (q 4 (c 2 (c 5 ())) 11) (c (q . 82) 1)) (c (q . 20) 1)) 1)))"
```

Response:

```
ff02ffff01ff02ffff01ff02ff0affff04ff02ffff04ff05ffff04ff17ffff04ffff02ff0bff1780ff808080808080ffff04ffff01ff32ffff04ffff04ff04ffff04ff05ffff04ffff02ff0effff04ff02ffff04ff0bff80808080ff80808080ff1780ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954dffff04ffff01ff02ffff01ff02ffff01ff04ffff04ff02ffff04ff05ff808080ff0b80ffff04ffff0152ff018080ffff04ffff0114ff018080ff01808080
```

# Get Address

Now that we have our puzzle hash, we can encode this as an address.

```bash
cdv encode -p txch e4fd576c99d4cb789a21b3173d18e916c37634720c9ecd9d25f615d24bd1e3c5
```

Response:

```
txch1un74wmye6n9h3x3pkvtn6x8fzmphvdrjpj0vm8f97c2ayj73u0zsjqanlc
```

We will use this address as the receive address for our new coin.

# Create Coin

```bash
chia wallet send --amount 0.01 --fee 0.00005 --address txch1un74wmye6n9h3x3pkvtn6x8fzmphvdrjpj0vm8f97c2ayj73u0zsjqanlc
```

Response:

```
Submitting transaction...
Transaction submitted to nodes: [{'peer_id': '67095d445d879556da95feeee70174c66b131d4f29bd447df5fbc56789a01f24', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 1660000549 -tx 0xcfc2382e19b8c02a251cc4092951aeda45d643d32fe9bbe675761a228a393b1a' to get status
```

Let's get the status.

```bash
chia wallet get_transaction -f 1660000549 -tx 0xcfc2382e19b8c02a251cc4092951aeda45d643d32fe9bbe675761a228a393b1a
```

Eventually, this will say confirmed:

```
Transaction cfc2382e19b8c02a251cc4092951aeda45d643d32fe9bbe675761a228a393b1a
Status: Confirmed
Amount sent: 0.01 TXCH
To address: txch1un74wmye6n9h3x3pkvtn6x8fzmphvdrjpj0vm8f97c2ayj73u0zsjqanlc
Created at: 2022-11-01 22:34:50
```

In the meantime, we can start crafting our `spendbundle.json`:

```
{
  "coin_spends": [
    {
      "coin": {
        "amount": 10000000000,
        "parent_coin_info": "",
        "puzzle_hash": ""
      },
      "puzzle_reveal": "",
      "solution": ""
    }
  ],
  "aggregated_signature": ""
}
```

Next up, let's get the coin record and coin ID.

# Retreive Coin Info

First, you can grab the coin by puzzlehash. If anyone has ever used the same CLVM for a coin, there will be multiple coins returned (this is unlikely since our puzzle included our own public key):

```bash
cdv rpc coinrecords --by puzzle_hash e4fd576c99d4cb789a21b3173d18e916c37634720c9ecd9d25f615d24bd1e3c5
```

Response:

```json
[
    {
        "coin": {
            "amount": 10000000000,
            "parent_coin_info": "0xdb8e67eb6c0d91206329eb4fe53c403b3b0be29fdd99baa67e574c2318ade1f7",
            "puzzle_hash": "0xe4fd576c99d4cb789a21b3173d18e916c37634720c9ecd9d25f615d24bd1e3c5"
        },
        "coinbase": false,
        "confirmed_block_index": 333655,
        "spent_block_index": 0,
        "timestamp": 1667356550
    }
]
```

This does not give the coin ID, but does give everything needed to calculate the coin ID.

:::info
A coin ID is the hash of the parent coin ID, puzzle hash of the coin, and the amount.
:::

We can retrieve the coin ID with this template:

```bash
cdv inspect -id coins --parent-id "<Parent Coin Id>" --puzzle-hash "<Puzzle Hash>" --amount "<Amount>"
```

Example:

```bash
cdv inspect -id coins --parent-id 0x2ae27f44c228eeb9b16eb3f878c51e5bc468009eea79fce976e9d0a25b0e2b85 --puzzle-hash 0xaa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216 --amount 10000000000
```

Response:

```
['43ab980558015de0d255b7eadf763feb9de22233bcdfde22b1c2823dfa2a53b5']
```

## Crafting a solution

The solution we will use is the same `51 CREATE_COIN` condition we've been using throughout this series. To do this, we will need our wallet puzzle hash.

```bash
chia wallet get_address
```

Response:

```
txch12zntse5ac4fl5nr83c43rcunjn9zr39r3a6z7zyu9c68ve949kpqkk5w9n
```

```bash
cdv decode txch12zntse5ac4fl5nr83c43rcunjn9zr39r3a6z7zyu9c68ve949kpqkk5w9n
```

Response:

```
50a6b8669dc553fa4c678e2b11e39394ca21c4a38f742f089c2e347664b52d82
```

Now, let's get the encoded solution: :::warning  
Remember 0x for your puzzle hash
:::

```
opc "((((51 0x50a6b8669dc553fa4c678e2b11e39394ca21c4a38f742f089c2e347664b52d82 9950000000))))"
```

Response:

```
ffffffff33ffa050a6b8669dc553fa4c678e2b11e39394ca21c4a38f742f089c2e347664b52d82ff85025110f38080808080
```

This is 4 parenthesis deep because the `outer-puzzle` params list will be passed in surrounded by (), and one of those params is the inner solution, which is surrounded by (). Inside of the inner solution we have another set of () for the list of conditions where each condition is also surrounded by ().

We will now calculate the **hash for the inner solution**, which is part of AGG_SIG_ME and will be neede for `chia keys sign`:

```
opc -H "(((51 0x50a6b8669dc553fa4c678e2b11e39394ca21c4a38f742f089c2e347664b52d82 9950000000)))"
```

Response:

```
e611d1b5035b2c77eb5a343d47d6c0f5345ae212539b666136ae86ccb95ee47a
```

This will need signed with `chia keys sign`, but `AGG_SIG_ME` introduces some other inputs for a more unique signature. These are the coin ID and the genesis challenge.

We've already calculated the coin ID with `cdv inspect -id coins`, now we just need the genesis challenge. The easiest way to retrieve this is with:

```
chia show -s
```

Now that we have all the pieces, we will concatenate them together for the final message to be signed.

# Concatenate Message

The order for theses is solution hash, coin ID, genesis challenge.

```bash
run '(concat 0xe611d1b5035b2c77eb5a343d47d6c0f5345ae212539b666136ae86ccb95ee47a 0x43ab980558015de0d255b7eadf763feb9de22233bcdfde22b1c2823dfa2a53b5 0xd25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15)'
```

Response:

```
0xe611d1b5035b2c77eb5a343d47d6c0f5345ae212539b666136ae86ccb95ee47a43ab980558015de0d255b7eadf763feb9de22233bcdfde22b1c2823dfa2a53b5d25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15
```

# Sign Message

:::info
remove 0x from the message
:::

```bash
chia keys sign --as-bytes --message  e611d1b5035b2c77eb5a343d47d6c0f5345ae212539b666136ae86ccb95ee47a43ab980558015de0d255b7eadf763feb9de22233bcdfde22b1c2823dfa2a53b5d25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15 --hd_path m
```

Response:

```
Public key: b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d
Signature: 8c6154292b5215f96bbb664f6883bd4bd02db2f844ca99a9a82385ef1e1c983bbb3cf5e8191dc2627e4fd01236ef86c3158d6738f23875080d2bf3eec8caf316735e3851add2eb068dbfbc9c27327072ffbeb77ba26d371e3d6533b2033bc1bc
```

Now, let's formulate the `spendbundle.json`.

```json
{
    "coin_spends": [
        {
            "coin": {
                "amount": 10000000000,
                "parent_coin_info": "0xdb8e67eb6c0d91206329eb4fe53c403b3b0be29fdd99baa67e574c2318ade1f7",
                "puzzle_hash": "0xe4fd576c99d4cb789a21b3173d18e916c37634720c9ecd9d25f615d24bd1e3c5"
            },
            "puzzle_reveal": "ff02ffff01ff02ffff01ff02ff0affff04ff02ffff04ff05ffff04ff17ffff04ffff02ff0bff1780ff808080808080ffff04ffff01ff32ffff04ffff04ff04ffff04ff05ffff04ffff02ff0effff04ff02ffff04ff0bff80808080ff80808080ff1780ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954dffff04ffff01ff02ffff01ff02ffff01ff04ffff04ff02ffff04ff05ff808080ff0b80ffff04ffff0152ff018080ffff04ffff0114ff018080ff01808080",
            "solution": "ffffffff33ffa050a6b8669dc553fa4c678e2b11e39394ca21c4a38f742f089c2e347664b52d82ff85025110f38080808080"
        }
    ],
    "aggregated_signature": "0x8c6154292b5215f96bbb664f6883bd4bd02db2f844ca99a9a82385ef1e1c983bbb3cf5e8191dc2627e4fd01236ef86c3158d6738f23875080d2bf3eec8caf316735e3851add2eb068dbfbc9c27327072ffbeb77ba26d371e3d6533b2033bc1bc"
}
```

Now, push the transaction:

```
cdv rpc pushtx spendbundle.json
```

If enough blocks have not gone through, it will say `"status": "PENDING"`.

```
{
    "status": "SUCCESS",
    "success": true
}
```

You can now see the spent block with the same command used earlier:

```
cdv rpc coinrecords --by puzzlehash 0xe4fd576c99d4cb789a21b3173d18e916c37634720c9ecd9d25f615d24bd1e3c5
```

Response:

```
[
    {
        "coin": {
            "amount": 10000000000,
            "parent_coin_info": "0xb74b97e934fdf0daa1ebc3aca5dd033f9b1ca9eb761140e108a8d113a420c6fe",
            "puzzle_hash": "0xe4fd576c99d4cb789a21b3173d18e916c37634720c9ecd9d25f615d24bd1e3c5"
        },
        "coinbase": false,
        "confirmed_block_index": 336196,
        "spent_block_index": 336230,
        "timestamp": 1667404639
    }
]
```

As you can see, 34 blocks have passed in this example from coin creation to coin spend.
