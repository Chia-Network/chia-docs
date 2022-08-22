---
sidebar_position: 4
---

# 4.4 地址

奇亚中的谜语哈希是 32 字节值。 这些可以以十六进制显示，但这可能会因拼写错误和糟糕的用户体验而导致错误。 因此，奇亚以称为地址的自定义格式显示谜语哈希。 使用的编码方案是 [bech32m](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki)。

Address: `xch1pwrzyy35qxk0rz76jl0648fvt6ql905vwd7zs0scjqant5sf25lql4hz3z`

Puzzle hash: `0b8622123401acf18bda97dfaa9d2c5e81f2be8c737c283e18903b35d209553e`

地址只是显示谜语哈希的另一种方式，它在末尾包含一些附加数据（校验和）以查找错误。 谜语哈希可以转换为地址，反之亦然。

bech32m addresses have several features which make them attractive:

- Checksum which makes addresses invalid if only one character is modified.
- An XCH prefix to distinguish from other cryptocurrencies.
- Shorter than hex, and more compact than base58 addresses (and fit better in QR codes)

区块链共识代码不操作地址，地址仅用于面向用户的应用程序。
