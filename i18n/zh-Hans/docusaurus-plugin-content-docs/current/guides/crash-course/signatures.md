---
slug: /guides/crash-course/signatures
title: Signatures
---

In the previous lesson we created our first coin and spent it. This was fun and a good exercise, but had some security problems. Specifically, we used a hashed password. This is very limited because once you spend that coin, your provided solution is revealed and your password can no longer be used securely for anything in the future.

Additionally, when you submit your spend to the network, a full node can view the solution (including the password), allowing a bad player to spend the coin themselves.

The solution to this is to use signatures. But, before we introduce signatures, let's go over a quick introduction of public and private keys.

## Intro to Keys

When you create a Chia wallet you are given 24 words that you should keep secure and private. These words are used to generate a master private key. A master private key can be used to derive multiple child keys, all accessed and controlled from your 24 words (in other words, 24 words = full access to your wallet).

With each private key there is an associated public key, which can be shared without revealing your private key.

You can retrieve your key info using:

```
chia keys show
```

This will give you your `master public key`, while keeping your seed phrase and private key hidden. Although rarely needed or recommended, you can see this info with the `--show-mnemonic-seed` flag after `chia keys show`.

Having a public key that derives from a private key allows us to do interesting things. Specifically, we can sign a message using our private key which can be verified as authentic. Let's read about that more.

## Intro to Signatures

If you wanted to send a message to someone but they wish to have the ability to verify the sender, you can use **signatures**.

A digital signature allows you to use a private key to sign a message. This message can be verified by a recipient using your public key to verify the message comes from you.

To see this in action, let's sign a message with the master public key. Each key is labeled with a keypath from `chia keys sign`, it resembles `m/12381/8444/0/0`, or just `m` for your master public key.

```bash
chia keys sign --message "hello" --hd_path m
```

This will then allow you to choose your wallet by fingerprint:

```
Choose key:
1) 1660000549
```

Or, you can pass that in as an additional flag to `chia keys sign`:

```bash
chia keys sign --message "hello" --hd_path m --fingerprint 1660000549
```

Response:

```
Public key: b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d
Signature: 91c3d0504c2c5e02091f92cf0c3f79f2d7350656b0dc554dfc94f7e256b53d415e1a15108e329004ff1c5e91e24b445d18e52b2777e9a01a7a12d7f69a9df30c6fe3c196bdc5aa8072ea23d0edb6422253bb02d560bce721a459e6cf9e847aed
```

The `Public key` in this response should match the key shown in `chia keys show`. The second part of this response is the **signature**.

This signature will be passed along with the message `hello` to whoever we want to see it. The signature can be used to verify the message against your public key without exposing your private key. To verify a message we need:

1. The signature,
1. the sender's public key,
1. the message

```bash
chia keys verify --message hello --signature 91c3d0504c2c5e02091f92cf0c3f79f2d7350656b0dc554dfc94f7e256b53d415e1a15108e329004ff1c5e91e24b445d18e52b2777e9a01a7a12d7f69a9df30c6fe3c196bdc5aa8072ea23d0edb6422253bb02d560bce721a459e6cf9e847aed --public_key b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d
```

Response:

```python
True
```

In order for this concept to work, the public key must be known to be the public key of the original sender. When this is the case we can verify that the message came from the original source and that the message has not been altered.

If we change either of these two pieces of information, the signature is no longer valid. The signature only works with the message `hello` and that specific public key.

Now, let's learn about the use of signatures in Chialisp.

## Verifying signatures in Chialisp

One of the available conditions is `AGG_SIG_ME`, which takes a public key and a message to sign.

The general syntax for this is `(50 public_key message)`

Take a look at this example:

```chialisp title='signature.clsp'
(mod (PUBLIC_KEY conditions)
    (include condition_codes.clib)
    (include sha256tree.clib)

    (c
        (list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions))
        conditions
    )
)
```

We will be introducing a few new things here. The first new thing introduced is `c`, which will combine the new `AGG_SIG_ME` condition with the conditions passed in as a solution.

The other new idea is an include, which allows us to use the names of conditions instead of the numbers.

To get these include files, issue the command:

```
cdv clsp retrieve sha256tree condition_codes
```

Let's now understand the basic signature requirement. This code expects the public key to be curried, with our `AGG_SIG_ME` condition being set up like so:

```chialisp
(list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions))
```

The `message` in this case is `Sha256tree conditions` which takes the tree hash of our passed in conditions. We put anything in the message we do not want changed by the farmer. We will be using `sha256tree` on the value because you cannot use a list. `sha256tree` gets the tree hash of the conditions.

By having this as the message of `AGG_SIG_ME` we will be able to prove that the conditions have not been modified (as we are verifying against the public key, similar to `chia keys verify`).

## Practice

Let's go through creating this coin and spending it. As we go through this we will need to keep track of a lot of information. It may be helpful to open a text file to keep track.

First, let's get our public key:

```bash
chia keys show
```

The public key response may look like this:

```
Master public key (m): b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d
```

Now, curry in your public key **prefixed with 0x** (important). I'll use mine in this example, so be sure to update with the appropriate value!

```bash
cdv clsp curry signature.clsp -a 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d
```

Response (reminder, yours will be different):

```chialisp
(a (q 2 (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d) 1))
```

Now, use your compiled code to get the serialized version of the code (the puzzle reveal) and the puzzle hash:

```bash
opc "(a (q 2 (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d) 1))"
```

Response:

```
ff02ffff01ff02ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff0bff80808080ff80808080ff0b80ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954dff018080
```

That is the puzzle reveal, now for the puzzle hash:

```bash
opc -H "(a (q 2 (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d) 1))"
```

Response:

```
aa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216
```

Now, using this puzzle hash we can encode an address:

```bash
cdv encode --prefix txch aa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216
```

Response:

```
txch14gxuvfmw2xdxqnws5agt3ma483wktd2lrzwvpj3f6jvdgkmf5gtq8g3aw3
```

Great! Now you have all of the information to create your coin!

# Create a Coin

To create a coin we send a certain amount of chia to the address for this Chialisp. The `amount` is up to you, the value used determines the value of this locked-up coin.

```bash
chia wallet send --amount 0.01 --fee 0.00005 --address txch14gxuvfmw2xdxqnws5agt3ma483wktd2lrzwvpj3f6jvdgkmf5gtq8g3aw3
```

Response:

```
Transaction submitted to nodes: [{'peer_id': '67095d445d879556da95feeee70174c66b131d4f29bd447df5fbc56789a01f24', 'inclusion_status': 'SUCCESS', 'error_msg': None}]
Run 'chia wallet get_transaction -f 1660000549 -tx 0x2bf4497e18147f2f857321829c557dfa4e92b7e1dd1a183e423fa1d6697c0a49' to get status
```

Let's get that status:

```bash
chia wallet get_transaction -f 1660000549 -tx 0x2bf4497e18147f2f857321829c557dfa4e92b7e1dd1a183e423fa1d6697c0a49
```

Response:

```
Transaction 2bf4497e18147f2f857321829c557dfa4e92b7e1dd1a183e423fa1d6697c0a49
Status: In mempool
Amount sent: 0.01 TXCH
To address: txch14gxuvfmw2xdxqnws5agt3ma483wktd2lrzwvpj3f6jvdgkmf5gtq8g3aw3
Created at: 2022-10-30 03:19:22
```

Eventually, `Status: in mempool` will change to `Status: Confirmed`.

## Spending the coin

Now that we created the coin we can start to craft a spend bundle. Build this outline in a `spendbundle.json` file:

```json
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

Now, let's figure out the `coin`, `puzzle_reveal` (calculated earlier), `solution`, and `aggregated_signature`.

Once this transaction is confirmed, we can retrieve the coin info needed to craft a spend bundle. To do this, we will need to use the puzzle hash we calculated earlier.

```bash
cdv rpc coinrecords --by puzzlehash aa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216
```

Response:

```json
[
  {
    "coin": {
      "amount": 10000000000,
      "parent_coin_info": "0x2ae27f44c228eeb9b16eb3f878c51e5bc468009eea79fce976e9d0a25b0e2b85",
      "puzzle_hash": "0xaa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216"
    },
    "coinbase": false,
    "confirmed_block_index": 321848,
    "spent_block_index": 0,
    "timestamp": 1667114401
  }
]
```

You will only need the `coin` object from this response.

Again, you can calculate the puzzle reveal with `opc`:

```bash
opc "(a (q 2 (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d) 1))"
```

Response:

```
ff02ffff01ff02ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff0bff80808080ff80808080ff0b80ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954dff018080
```

Now, let's take a moment to craft a solution.

## Build a Solution

The solution for this puzzle requires us to provide a list of conditions. This is how we control what happens with the coin. We will continue to use `51 (CREATE_COIN)` which requires a puzzle hash for where to send the coin.

```bash
chia wallet get_address
```

Response:

```
txch1nmntlv7nwvkx37llrlxwjmazd2url7x9wdhw6fww4lj8edr4pafsh0y5l5
```

```bash
cdv decode txch1nmntlv7nwvkx37llrlxwjmazd2url7x9wdhw6fww4lj8edr4pafsh0y5l5
```

Response:

```
9ee6bfb3d3732c68fbff1fcce96fa26ab83ff8c5736eed25ceafe47cb4750f53
```

Now, craft the complete solution, **make sure to prefix with 0x for your puzzle hash (important)**

# Solution

```bash
opc "(((51 0x9ee6bfb3d3732c68fbff1fcce96fa26ab83ff8c5736eed25ceafe47cb4750f53 9950000000)))"
```

Response:

```
ffffff33ffa09ee6bfb3d3732c68fbff1fcce96fa26ab83ff8c5736eed25ceafe47cb4750f53ff85025110f380808080
```

Now, the difference between the coin value and the value used in `CREATE_COIN` goes to the farmer as a fee.

## Signing a Message

The expected message for our signature is the tree hash of our conditions (from our chialisp code `(list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions))`). For this to work, we must first get the conditions tree hash.

:::warning
We are not calculating the tree hash for the entire solution, just the `CREATE_COIN`, so make sure you get the parenthesis right.
:::

```bash
opc -H "((51 0x9ee6bfb3d3732c68fbff1fcce96fa26ab83ff8c5736eed25ceafe47cb4750f53 9950000000))"
```

Response:

```
d96954e94653367e85bee3195b8a8f4a6470626e51ba10a96fc24d0e8bcdd7c1
```

To sign the message we will actually need the `coin_id` and the genesis challenge.

:::info Genesis Challenge?
`AGG_SIG_ME` requires multiple pieces of information as to prevent reusable signatures. One of these things is the genesis challenge, which is a different value for every network. You will find this information from `chia show -s` or in the `config.yaml` file of your chia configuration.

```bash
less ~/.chia/mainnet/config/config.yaml
```

and then search for `genesis_challenge`, picking the one for the appropriate network (such as testnet11). The value will be a hex string such as `37a90eb5185a9c4439a91ddc98bbadce7b4feba060d50116a067de66bf236615` (that is the value for testnet11).
:::

## Get Coin Id

The coin ID is actually the hash of the parent coin info, the coin puzzle hash, and the amount.

One way to get the coin ID is to retrieve a coin through `cdv inspect`. This will take the parent ID, your coin's puzzle hash, and the amount.

```bash
cdv inspect -id coins --parent-id 0x2ae27f44c228eeb9b16eb3f878c51e5bc468009eea79fce976e9d0a25b0e2b85 --puzzle-hash 0xaa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216 --amount 10000000000
```

Response:

```
['43ab980558015de0d255b7eadf763feb9de22233bcdfde22b1c2823dfa2a53b5']
```

Now, we can use our coin ID to craft a message.

# Concatenate Message

`AGG_SIG_ME` expects the concatenation of the conditions tree hash, coin ID, and the genesis challenge.

```bash
run "(concat 0xd96954e94653367e85bee3195b8a8f4a6470626e51ba10a96fc24d0e8bcdd7c1 0x43ab980558015de0d255b7eadf763feb9de22233bcdfde22b1c2823dfa2a53b5 0xd25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15)"
```

Response:

```
0xd96954e94653367e85bee3195b8a8f4a6470626e51ba10a96fc24d0e8bcdd7c143ab980558015de0d255b7eadf763feb9de22233bcdfde22b1c2823dfa2a53b5d25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15
```

# Sign Message

```bash
chia keys sign --as-bytes --message d96954e94653367e85bee3195b8a8f4a6470626e51ba10a96fc24d0e8bcdd7c143ab980558015de0d255b7eadf763feb9de22233bcdfde22b1c2823dfa2a53b5d25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15 --hd_path m
```

:::info
You will actually want to take the 0x off this time.
:::

Response:

```
Public key: b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d
Signature: a3994dc9c0ef41a903d3335f0afe42ba16c88e7881706798492da4a1653cd10c69c841eeb56f44ae005e2bad27fb7ebb16ce8bbfbd708ea91dd4ff24f030497b50e694a8270eccd07dbc206b8ffe0c34a9ea81291785299fae8206a1e1bbc1d1
```

# The Spend Bundle

Using the gathered info thus far, we can craft our spend bundle:

```json
{
  "coin_spends": [
    {
      "coin": {
        "amount": 10000000000,
        "parent_coin_info": "0x2ae27f44c228eeb9b16eb3f878c51e5bc468009eea79fce976e9d0a25b0e2b85",
        "puzzle_hash": "0xaa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216"
      },
      "puzzle_reveal": "ff02ffff01ff02ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff0bff80808080ff80808080ff0b80ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954dff018080",
      "solution": "ffffff33ffa09ee6bfb3d3732c68fbff1fcce96fa26ab83ff8c5736eed25ceafe47cb4750f53ff85025110f380808080"
    }
  ],
  "aggregated_signature": "a3994dc9c0ef41a903d3335f0afe42ba16c88e7881706798492da4a1653cd10c69c841eeb56f44ae005e2bad27fb7ebb16ce8bbfbd708ea91dd4ff24f030497b50e694a8270eccd07dbc206b8ffe0c34a9ea81291785299fae8206a1e1bbc1d1"
}
```

```bash
cdv rpc pushtx spendbundle.json
```

Response:

```json
{
  "status": "SUCCESS",
  "success": true
}
```

If you have an incorrect signature, you'll get a message like this:

```
("{'error': 'Failed to include transaction "
 '93247303fe92bf8c25459b912e5ea01bc13c5a59f876ad673e8455487a1056eb, error '
 "BAD_AGGREGATE_SIGNATURE', 'success': False}")
```

If this is the case, you'll want to double check your signing message. You can also try the debug command:

```
cdv inspect spendbundles spendbundle.json --debug
```

Congratulations, you now have a working understanding of signatures!
