---
sidebar_position: 2
---

# 9.2 图块 ID

> Plot IDs

图块 ID 是一个 32 字节的值，用作创建整个图块的确定性种子。换句话说，具有相同图块 ID 的两个图块将创建字节相同的图块文件。图块 ID 是放入空间证明对象的公共值。

可以通过两种方式之一生成图块 ID，具体取决于图块所需的绘制方法。

<figure>

![](/img/keys/plot_id.png)

</figure>

1. 耕种到矿池公钥。如果单独耕作（无池），这种耕作方法是可取的。为了耕种这样的图块，我们将矿池公钥和图块公钥（稍后解释）散列在一起。当成功耕种一个区块时，矿池私钥必须签署奖励地址。这种方法的缺点是，如果使用矿池，则矿池无法更改，并且图块永远绑定到矿池上。

2. 耕种到矿池合约地址。这种耕种方式适合想种到矿池上，并且以后可以换矿池的用户。大多数农民可能会使用这种方法。

奖励不需要矿池的签名，而是直接进入编码到情节中的谜语哈希（或地址）。这个地址是一个由用户控制的智能合约，它指定了用户当前的矿池。用户可以切换矿池，矿池操作员可以自定义超时延迟（通常为 30 分钟）。

这种方法需要在耕种之前创建至少一个 mojo 的区块链交易。农民可从官方[faucet](https://faucet.chia.net/ "Chia Network's official faucet")免费获得 100 个 mojo。

图块公钥将在下一节中解释。

<details>
<summary>原文参考</summary>

A plot ID is a 32-byte value that is used as a deterministic seed to create an entire plot. In other words, two plots with the same plot ID will create byte-identical plot files. Plot IDs are public values that get put into Proof of Space objects.

A plot ID can be generated in one of two ways, depending on the desired farming method of the plot. 

<figure>

![](/img/keys/plot_id.png)

</figure>

1. Farm to pool public key. This method of farming is desirable if solo farming (no pools). To farm a plot like this, we hash together the pool public key and the plot public key (explained later). When successfully farming a block, the pool private key must sign the reward address. The drawback of this method is that if using a pool, the pool cannot be changed, and the plot is tied to the pool forever.

2. Farm to pool contract address. This method of farming is suitable for users who want to farm to a pool, and to be able to change pools in the future. Most farmers will likely use this method.

Instead of requiring a signature by the pool, rewards go straight into the puzzle hash (or address), that is encoded into the plot. This address is a smart contract controlled by the user, which specifies the user's current pool. The user can switch pools, with a timeout delay that the pool operator may customize (typically 30 minutes).

This approach requires creating a blockchain transaction of at least one mojo before farming. Farmers can get 100 mojos for free from the official [faucet](https://faucet.chia.net/ "Chia Network's official faucet").

The plot public key is explained in the next section.

</details>
