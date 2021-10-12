---
sidebar_position: 4
---

# 4.4 Addresses

Puzzle hashes in chia are 32 byte values. Since transmitting raw hex values is an error prone task, we can convert 
puzzle hashes into a more user friendly serialization, called an address.
The encoding scheme used is [bech32m](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki).

Address: `xch1pwrzyy35qxk0rz76jl0648fvt6ql905vwd7zs0scjqant5sf25lql4hz3z`

Puzzle hash: `0b8622123401acf18bda97dfaa9d2c5e81f2be8c737c283e18903b35d209553e`

An address is just a different way to display the puzzle hash. You can convert from one to the other at any point in time.
However, bech32m addresses have several features which make them attractive:
* Checksum which makes addresses invalid if only one character is modified.
* An XCH prefix to distinguish from other cryptocurrencies.
* Shorter than hex, and more compact than base58 addresses (and fit better in QR codes)


The blockchain consensus code does not operate with addresses, addresses are only used in user facing applications.
