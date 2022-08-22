---
sidebar_position: 2
---

# 9.2 图块 ID

图块 ID 是一个 32 字节的值，用作创建整个图块的确定性种子。 换句话说，具有相同图块 ID 的两个图块将创建字节相同的图块文件。 图块 ID 是放入空间证明对象的公共值。

A plot ID can be generated in one of two ways, depending on the desired farming method of the plot.

<figure>
<img src="/img/keys/plot_id.png" alt="drawing"/>
</figure>

1. 耕种到矿池公钥。 如果单独耕作（无池），这种耕作方法是可取的。 为了耕种这样的图块，我们将矿池公钥和图块公钥（稍后解释）散列在一起。 当成功耕种一个区块时，矿池私钥必须签署奖励地址。 这种方法的缺点是，如果使用矿池，则矿池无法更改，并且图块永远绑定到矿池上。

2. 耕种到矿池合约地址。 这种耕种方式适合想种到矿池上，并且以后可以换矿池的用户。 大多数农民可能会使用这种方法。

奖励不需要矿池的签名，而是直接进入编码到情节中的谜语哈希（或地址）。 这个地址是一个由用户控制的智能合约，它指定了用户当前的矿池。 用户可以切换矿池，矿池操作员可以自定义超时延迟（通常为 30 分钟）。

这种方法需要在耕种之前创建至少一个 mojo 的区块链交易。 农民可从官方[faucet](https://faucet.chia.net/ "Chia Network's official faucet")免费获得 100 个 mojo。

The plot public key is explained in the next section.
