---
sidebar_position: 1
---

# 9.1 BLS 密钥

本节将解释奇亚网络中不同类型的密钥。 它还将介绍如何生成、存储和使用密钥。 这些系统设计得足够灵活，可以支持许多不同的配置和池设置，并且能够抵御各种攻击。

所有奇亚密钥都是 [BLS-12-381](https://github.com/zkcrypto/bls12_381)私钥，遵循 \[IETF 规范\](https://datatracker.ietf.org/doc/draft-irtf- cfrg-bls-signature/)、[EIP-2333](https://eips.ethereum.org/EIPS/eip-2333) 密钥派生规范和 \[BIP 44 注册\](https://github.com/ satoshilabs/slips/blob/master/slip-0044.md）。 私钥 32 字节，公钥 48 字节，签名 96 字节（公钥是 G1 中的点，签名是 G2 中的点。）

> WARNING: There is a slight difference between Chia's implementation and EIP-2333, as described in the next section.

BLS 签名允许许多功能和优化，例如非交互式 m/n 阈值、块中所有签名的聚合以及 [chialisp](https://chialisp.com) 技巧，例如将两个硬币组合到同一笔交易中。 私钥可以通过使用 24 个单词的助记词生成，用户可以用它来备份和恢复他们的钱包。

这 24 个字可以与 BLS 私钥相互转换。 BLS 主私钥存储在 OS 钥匙串中，通常需要密码验证并进行加密。

主私钥可用于派生子密钥，其还可用于派生子密钥等。 级别数可以是无限的。 BLS 公钥可以组合成一个新的公钥，用于验证聚合签名。

每次钱包生成一个新地址来接收资金时，它都会创建一个新的 BLS 私钥。 农场主和矿池仅使用当前代码库中的第一个密钥，但可以更新它们以在每次赢得区块时生成新密钥，以增加隐私。

当谈到获得报酬时，会创建一个使用钱包 BLS 公钥的 chialisp 程序。 该程序称为*谜语*，经过哈希处理以生成谜语哈希。 然后将谜语哈希转换为 bech32m 格式的地址，以方便纠错和可用性。

So an address is analogous to a wallet child BLS public key, the private key of which can be derived from the master seed.

<figure>
<img src="/img/keys/hd_keys.png" alt="drawing"/>
</figure>

## 奇亚和 EIP-2333 的区别

奇亚遵循的规范在 [IRTF CFRG BLS 标准](https://datatracker.ietf.org/doc/draft-irtf-cfrg-bls-signature/)版本 1 中进行了描述。 版本中进行了更改 2 这使得密钥生成不兼容。 两个版本都是安全的，但奇亚密钥在 2020 年致力于最终的绘图格式，因此使用旧版本的规范。

## 非观察者与观察者密钥

There are two ways in which child keys can be derived from parent keys: non-observer and observer (also called hardened and unhardened).

非观察者密钥是 EIP-2333 规范中默认且仅受支持的方法。 它们是安全的，因为每个密钥都是加密分离的——泄露一个密钥对其祖先或兄弟姐妹的安全性没有影响。 但是，非观察者密钥在功能上受到限制，因为它们只能通过私有派生来派生。 也就是说，父*公钥*可用于派生子*私钥*，但父*公钥*不能用于派生子*私钥*。

观察者密钥确实允许公开派生。 这使仅查看钱包支持查看您的*所有*公钥，仅使用根（主）公钥。 这是通常为比特币高清查看钱包所做的。 与像以太坊这样的系统相比，它可以实现更多的隐私，它为所有交易重用相同的地址。

HD 密钥的一个优势是税收计算：如果您为每笔交易使用不同的地址，您只需将您的父公钥提供给您的会计师，他可以使用它来导出您所有的子地址。 对于非观察者密钥，这是不可能的。

The master private key can be used to derive child keys, which can further be used to derive child keys, etc. The number of levels can be infinite. BLS public keys can be combined to form a new public key, which can be used to validate aggregate signatures.

At the time of Chia's mainnet launch in March and May 2021, only non-observer keys were used. Beginning in December 2021, observer keys are supported -- and preferred -- for view only-wallet support. Beginning with the Light Wallet Beta release (December 2021), observer keys are supported -- and preferred -- for view only-wallet support. The first full release with built-in support for observer keys is 1.3 (February 2022).
