---
sidebar_position: 3
---

# 5.3 Block rewards

The issuance schedule, also referred to as the block reward schedule in Chia determines how many XCH get created with
every block that gets farmed on the network.
1 XCH, or 1 Chia, is equivalent to 1,000,000,000,000 or 1x10^12 or 1 trillion mojos. 
All consensus code uses mojos, Chias are used as a conveniently larger unit.

## Strategic Reserve (pre-farm)

The first block of the network pays out 21 million XCH, divided into a 1/8 coin and a 7/8 coin, to a Chia Network Inc
controlled address. The purpose and future usage of the funds is described in the [business whitepaper](https://www.chia.net/2021/02/10/chia-businesss-whitepaper.html).


## Halvings

All other coins go through a formula, where the block reward starts at 2 XCH per block, and halves every 3 years, a total
of 4 times. The exact block at which halvings occur is `32 * 6 * 24 * 365 * 3 * x`, where x is the index of the halving,
starting at 1.

```
0-3 years: 2 XCH
3-6 years: 1 XCH
6-9 years: 0.5 XCH
9-12 years: 0.25 XCH
12+: 0.125 XCH
```

After the start of year 12, 0.125 XCH is created in perpetuity.

## Reward claims
Chia is a slightly different from other cryptocurrencies, where the creator of a block pays themselves based on the
current block reward. In Chia, block rewards are paid in a future block, depending on whether the farmer's block is
a transaction block or not.

Option 1: If the farmer's block is a transaction block, the farmer will get paid on the next transaction block
Option 2: If the farmer's block is not a transaction block, the farmer will get paid on the next transaction block after the next transaction block (next next).

Fees are also paid at the same time. So let's say a farmer creates a transaction block with 4.9 XCH of outputs but 5 XCH of inputs (excluding reward claims),
then they will receive the 0.1XCH as part of the fee, plus their block reward, for a total of 2.1 XCH, in the next
transaction block.


## Farmer vs Pool reward

The 2 XCH block reward (or less after halvings) is divided into two coins. The first coin goes to the farmer puzzle hash,
which is specified by the farmer, and usually just goes straight to the farmer's wallet. This contains 1/8 of the total
value, so 0.25 XCH for the first 3 years. This is referred to as the farmer coin. 

The second coin with 7/8 of the value is called the pool coin, and this can go to one of two places: if a pool public
key is specified for the winning plot, then the reward can be sent to any address signed by that public key. Otherwise,
a pool address must be encoded into the plot, and the coins get sent to the pool address.

The former (pool public keys) are usually used for solo farming, and sent directly to the farmer wallet. The pool address
is usually used along with the official Chia pooling protocol, and a pay to singleton address is used here.