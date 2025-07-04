---
slug: /guides/coin-spend-rpc-tutorial
title: RPC Coin Spend
---

This tutorial teaches you how to spend a coin with any puzzle using RPC calls. We will be using the [password-locked coin](/guides/chialisp-first-smart-coin) puzzle as an example.

## Get your coin's info (amount, puzzle hash & parent info)

RPC call for spending a coin requires you to specify which coin you are spending. For unique identification, you need the coin's amount, puzzle hash, and parent info. Those three pieces of information are also enough to calculate the coin's ID.

If you know the puzzle hash or receive address of the coin you are looking for, you can use [Chia Dev Tools](https://github.com/Chia-Network/chia-dev-tools) to get the coin's information.

**Example for the password-locked coin:**

```bash
cdv rpc coinrecords --by puzzlehash 4843c869bba5f65aa1e806cd372dae5668ca3b69640d067e86837ca96b324e71
```

Click through this [tutorial](https://chialisp.com/docs/tutorials/tools_and_setup) to learn more about tools and setup.

## Get serialized puzzle and solution

The next thing you need to know to spend the coin is the coin's puzzle and solution. Puzzles and solutions are provided in a serialized format, so we need to get that for each. The puzzle has to be compiled to low-level Chialisp and is serialized as normal.

To serialize the solution, you need to slightly modify the solution format to make it valid Chialisp program. For that, you need to quote your solution. For example, in case of the solution `(hello 0x5f5767744f91c1c326d927a63d9b34fa7035c10e3eb838c44e3afe127c1b7675 2)` you need to change it to `(q . (hello 0x5f5767744f91c1c326d927a63d9b34fa7035c10e3eb838c44e3afe127c1b7675 2))` which makes it valid Chialisp program that can be compiled.

**Example for the password-locked coin:**

**Puzzle:** `(a (q 2 (i (= (sha256 5) (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824)) (q 4 (c 2 (c 11 (c 23 ()))) ()) (q 8)) 1) (c (q . 51) 1))`

**Serialized puzzle:** `0xff02ffff01ff02ffff03ffff09ffff0bff0580ffff01a02cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b982480ffff01ff04ffff04ff02ffff04ff0bffff04ff17ff80808080ff8080ffff01ff088080ff0180ffff04ffff0133ff018080`

**Solution:** `(hello 0x5f5767744f91c1c326d927a63d9b34fa7035c10e3eb838c44e3afe127c1b7675 2)` (as valid Chialisp program `(q . (hello 0x5f5767744f91c1c326d927a63d9b34fa7035c10e3eb838c44e3afe127c1b7675 2))`)

**Serialized solution:** `0xff8568656c6c6fffa05f5767744f91c1c326d927a63d9b34fa7035c10e3eb838c44e3afe127c1b7675ff0280`

_WARNING: You have to change this solution and replace the target puzzle hash with your own to get your coins back_

### Serialization using [clvm_tools](https://github.com/Chia-Network/clvm_tools)

The `opc -H <CLVM>` command can be used for getting the serialized version of our puzzle and solution as well. The serialized version will be included in the response **on the second line**.

```bash
opc -H '(a (q 2 (i (= (sha256 5) (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824)) (q 4 (c 2 (c 11 (c 23 ()))) ()) (q 8)) 1) (c (q . 51) 1))'
```

**Example response:**

```
4843c869bba5f65aa1e806cd372dae5668ca3b69640d067e86837ca96b324e71
ff02ffff01ff02ffff03ffff09ffff0bff0580ffff01a02cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b982480ffff01ff04ffff04ff02ffff04ff0bffff04ff17ff80808080ff8080ffff01ff088080ff0180ffff04ffff0133ff018080
```

### Serialization using [Chia Dev Tools](https://github.com/Chia-Network/chia-dev-tools)

Follow repository's README to set up a new project and serialize puzzle.

In short: paste your compiled puzzle/solution to your work file and call `chialisp build`. That will generate `.hex` files with a serialized version of your puzzle/solution (depending on your work file).

### Serialization using [Chialisp web tool](https://clisp.surrealdev.com/)

Paste your puzzle in the text area and click **Compile**. The serialized result will be displayed in the **Serialized** section.

## Spend a coin with RPC call

To spend your coin, you only need to call [push_tx](/reference-client/rpc-reference/full-node-rpc#push_tx) RPC (broadcast transaction example) with values specific to your spend.

```bash
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt --key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key -d '{        "spend_bundle": {
            "aggregated_signature": "0xc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
            "coin_spends": [
                {
                    "coin": {
                        "amount": 1,
                        "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000004082",
                        "puzzle_hash": "0x4843c869bba5f65aa1e806cd372dae5668ca3b69640d067e86837ca96b324e71"
                    },
                    "puzzle_reveal": "0xff02ffff01ff02ffff03ffff09ffff0bff0580ffff01a02cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b982480ffff01ff04ffff04ff02ffff04ff0bffff04ff17ff80808080ff8080ffff01ff088080ff0180ffff04ffff0133ff018080 ",
                    "solution": "0xff8568656c6c6fffa05f5767744f91c1c326d927a63d9b34fa7035c10e3eb838c44e3afe127c1b7675ff0280"
                }
            ]
        }}' -H "Content-Type: application/json" -X POST https://localhost:8555/push_tx
```

The [`spend_bundle`](/chia-blockchain/coin-set-model/spend-bundles) object contains an `aggregated_signature`, which we can later assert in the puzzle, and `coin_spends`: a list of objects for all of the coins we are spending. If `aggregated_signature` is not necessary for your puzzle, use 0xc followed by 191 zeros (as in the example above). However, it's worth noting that a puzzle that doesn't use a signature is usually unsafe and should be used only for testing purposes.

The `coin_solution` contains information about the `coin` it is spending (`amount`, `parent_coin_info`, and `puzzle_hash`). It also includes a serialized puzzle as a `puzzle_reveal` and serialized `solution`. Note: if this is your time constructing a spend bundle, the `puzzle_hash` is the puzzlehash of the receive address that you wish to send to `coin` to.

If you fill in all your information correctly and send this request, your coin will be spent according to its provided solution, and the response `{"status": "SUCCESS", "success": true}` should be returned from the RPC call.

If your puzzle requires an aggregated signature, stay tuned for more tutorials.

---

If you have further questions, join our [Discord](https://discord.gg/chia) and ask in the #chialisp channel.
