---
title: Addresses
slug: /addresses
---

Puzzle hashes in Chia are 32-byte values. These can be displayed in hex, but this can lead to errors due to typos, and a poor user experience. Therefore, Chia displays puzzle hashes in a custom format called an _address_. The encoding scheme used is [bech32m](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki).

Address: `xch1pwrzyy35qxk0rz76jl0648fvt6ql905vwd7zs0scjqant5sf25lql4hz3z`

Puzzle hash: `0b8622123401acf18bda97dfaa9d2c5e81f2be8c737c283e18903b35d209553e`

An address is just a different way to display the puzzle hash, which contains some additional data (checksum) at the end to find errors. Puzzle hashes can be converted to addresses and vice versa.

bech32m addresses have several features which make them attractive:

- [Checksum](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki#specification), which makes addresses invalid if only one character is modified.
- An XCH prefix to distinguish from other cryptocurrencies.
- Shorter than hex, and more compact than base58 addresses (and fit better in QR codes).

The blockchain consensus code does not operate with addresses; addresses are only used in user facing applications.

Spacescan.io has a handy bi-directional [bech32m <\> puzzle hash converter](https://www.spacescan.io/xch/tools/puzzlehashconvertor).

# Chia Burn Address

You can send unwanted tokens to this addresses to make them unspendable:
* Mainnet burn address: `xch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm6ks6e8mvy`
* Testnet10 burn address: `txch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm6ksh7qddh`

:::warning
Do not send anything to these addresses unless you want it to be inaccessible forever.
:::

A traditional bech32m puzzle hash for a burn address is all zeros ending in "dead": `0x000000000000000000000000000000000000000000000000000000000000dead`. Converting this to an address, you end up with the burn addresses above.

You can use a [puzzle hash converter](https://explorer.space/address-puzzlehash-converter) to verify for yourself.