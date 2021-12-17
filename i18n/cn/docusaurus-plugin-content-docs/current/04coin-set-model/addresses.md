---
sidebar_position: 4
---

# 4.4 地址

> Addresses

chia 中的拼图哈希是 32 字节值。这些可以以十六进制显示，但这可能会因拼写错误和糟糕的用户体验而导致错误。因此，Chia 以称为地址的自定义格式显示拼图哈希。使用的编码方案是[bech32m](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki)。

地址：`xch1pwrzyy35qxk0rz76jl0648fvt6ql905vwd7zs0scjqant5sf25lql4hz3z`

拼图哈希：`0b8622123401acf18bda97dfaa9d2c5e81f2be8c737c283e18903b35d209553e`

地址只是显示拼图哈希的另一种方式，它在末尾包含一些附加数据（校验和）以查找错误。拼图哈希可以转换为地址，反之亦然。

bech32m 地址有几个吸引人的特点：

- 如果仅修改一个字符，则校验和会使地址无效。
- XCH 前缀以区别于其他加密货币。
- 比十六进制短，比 base58 地址更紧凑（更适合二维码）

区块链共识代码不操作地址，地址仅用于面向用户的应用程序。

<details>
<summary>原文参考</summary>

Puzzle hashes in chia are 32 byte values. These can be displayed in hex, but this can lead to errors due to typos, and a poor user experience. Therefore, Chia displays puzzle hashes in a custom format called an _address_.The encoding scheme used is [bech32m](https://github.com/bitcoin/bips/blob/master/bip-0350.mediawiki).

Address: `xch1pwrzyy35qxk0rz76jl0648fvt6ql905vwd7zs0scjqant5sf25lql4hz3z`

Puzzle hash: `0b8622123401acf18bda97dfaa9d2c5e81f2be8c737c283e18903b35d209553e`

An address is just a different way to display the puzzle hash, which contains some additional data (checksum) at the end to find errors. Puzzle hashes can be converted to addresses and vice versa. 

bech32m addresses have several features which make them attractive:
* Checksum which makes addresses invalid if only one character is modified.
* An XCH prefix to distinguish from other cryptocurrencies.
* Shorter than hex, and more compact than base58 addresses (and fit better in QR codes)


The blockchain consensus code does not operate with addresses, addresses are only used in user facing applications.

</details>
