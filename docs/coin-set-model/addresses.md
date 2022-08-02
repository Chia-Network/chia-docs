---
title: Addresses
slug: /coin-set-addresses
---

Puzzle hashes in Chia are 32-byte values. These can be displayed in hex, but this can lead to errors due to typos, and a poor user experience. Therefore, Chia displays puzzle hashes in a custom format called an _address_. The encoding scheme used is [bech32m](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki).

Address: `xch1pwrzyy35qxk0rz76jl0648fvt6ql905vwd7zs0scjqant5sf25lql4hz3z`

Puzzle hash: `0b8622123401acf18bda97dfaa9d2c5e81f2be8c737c283e18903b35d209553e`

An address is just a different way to display the puzzle hash, which contains some additional data (checksum) at the end to find errors. Puzzle hashes can be converted to addresses and vice versa.

bech32m addresses have several features which make them attractive:

- Checksum, which makes addresses invalid if only one character is modified.
- An XCH prefix to distinguish from other cryptocurrencies.
- Shorter than hex, and more compact than base58 addresses (and fit better in QR codes)

The blockchain consensus code does not operate with addresses; addresses are only used in user facing applications.

# Chia Burn Address

## tl;dr

Chia burn address: `xch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm6ks6e8mvy`

---

## The Burn Address Explained

[Chia addresses](https://docs.chia.net/docs/04coin-set-model/addresses) are puzzle hashes encoded into the "xch" prefix address format using the [bech32m encoding scheme](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki).

A traditional bech32m puzzle hash for a burn address is all zeros ending in "dead": `0x000000000000000000000000000000000000000000000000000000000000dead`

Converting this to an address, you end up with the burn address: `xch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm6ks6e8mvy`

You can use a [puzzle hash converter](https://www.chiaexplorer.com/tools/address-puzzlehash-converter) to verify for yourself.

---

Thank you to [r/chia](https://www.reddit.com/r/chia/) member [juraj](https://www.reddit.com/r/chia/comments/q88yi8/does_chia_have_a_dead_address/hqolhgn/) for this information.
