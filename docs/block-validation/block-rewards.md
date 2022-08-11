---
title: Block Rewards
slug: /block-rewards
---

In Chia, the issuance schedule, also referred to as the block reward schedule, determines how many XCH get created with every block that gets farmed on the network.
1 XCH, or 1 Chia, is equivalent to 1,000,000,000,000 or 1x10^12 or 1 trillion mojos.
All consensus code uses mojos; XCH is used as a conveniently larger unit.

## Strategic Reserve (pre-farm)

The first block of the network pays out 21 million XCH, divided into a 1/8 coin and a 7/8 coin, to an address that Chia Network Inc controls. The purpose and future usage of the funds is described in the [business whitepaper](https://www.chia.net/whitepaper).

## Halvings

All other coins go through a formula, where the block reward starts at 2 XCH per block, and halves every 3 years, a total of 4 times. The exact block at which halvings occur is `32 * 6 * 24 * 365 * 3 * x`, where x is the index of the halving, starting at 1.

```
0-3 years: 2 XCH
3-6 years: 1 XCH
6-9 years: 0.5 XCH
9-12 years: 0.25 XCH
12+: 0.125 XCH
```

After the start of year 12, 0.125 XCH is created in perpetuity.

## Reward claims

In most cryptocurrencies, the creator of a block pays themselves based on the _current_ block reward. In Chia, there is a slight difference -- block rewards are paid in a _future_ block, depending on whether the farmer's block is a transaction block or not.

- Option 1: If the farmer's block is a transaction block, the farmer will get paid on the next transaction block.
- Option 2: If the farmer's block is not a transaction block, the farmer will get paid on the next transaction block after the next transaction block (next next).

Fees are also paid at the same time. Let's say a farmer creates a transaction block with 4.9 XCH of outputs, but 5 XCH of inputs (excluding reward claims). In this case, they will receive the remaining 0.1 XCH as a fee, plus their block reward, for a total of 2.1 XCH, in the next transaction block.

Therefore, Chia coins are never destroyed. In a given block, any portion of a spent coin that is not added into a new coin will be sent to the farmer as a fee. This topic is covered in more detail in the [Fees and the Mempool page](https://chialisp.com/coin_lifecycle#fees-and-the-mempool) on the Chialisp website.

## Farmer vs Pool reward

The block reward is divided into two coins. The first coin goes to the farmer puzzle hash, which is specified by the farmer, and usually goes straight to the farmer's wallet. This contains 1/8 of the total value (0.25 XCH for the first 3 years). This is referred to as the _farmer coin_.

The second coin, with 7/8 of the value, is called the _pool coin_. This coin can go to one of two places:

1. If a _pool public key_ is specified for the winning plot, then the reward is sent to the address signed by that public key. The _pool public key_ is usually used for solo farming, and sent directly to the farmer's wallet.
2. Otherwise, a _pool address_ must be encoded into the plot, and the reward is sent to the address. The _pool address_ is usually used along with the official Chia pooling protocol, and a pay-to-singleton address is used.
