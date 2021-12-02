---
sidebar_position: 2
---

# 9.2 地块 ID

> Plot IDs

绘图 id 是一个 32 字节的值，用作创建整个绘图的确定性种子。具有相同绘图 id 的两个绘图将创建字节相同的绘图文件。绘图 id 是公共值，可用于空间对象的证明。

可以通过两种方式之一生成地块 ID，具体取决于地块所需的耕作方法。

<figure>

![](/img/keys/plot_id.png)

</figure>

1. 农场以汇集公钥。如果单独耕种（无池）或开始在没有任何奇亚籽的情况下耕种，则这种耕作方法是可取的。为了耕种这样的地块，我们将地块公钥（稍后解释）和池公钥散列在一起。当成功耕种一个区块时，矿池私钥必须签署奖励地址。这种方法的缺点是，如果使用池子，则池子无法更改，并且情节永远绑定到池子上。

2. 农场到池合同地址。这种耕作方式适合想要耕种到池子，但也可以在以后更改自己所属的池子的用户。奖励不需要池的签名，而是直接进入编码到情节中的拼图哈希（或地址）。这个地址是一个由用户控制的智能合约，它指定了用户当前的矿池。用户可以切换池，有一定的 24 小时延迟，这会将所有新奖励重新路由到新池（尚未实现）。这种方法的缺点是它需要在耕种之前创建区块链交易。因此，用户在开始耕种之前必须先拥有奇亚籽。

因此，妥协收割机不允许攻击重定向奖励。情节公钥将在下一节中解释。

<details>
<summary>原文参考</summary>

A plot id is a 32 byte value that is used as a deterministic seed to create an entire plot. 
Two plots with the same plot id will create byte-identical plot files. 
Plot ids are public values that get put into proof of space objects.

A plot id can be generated in one of two ways, depending on the desired farming method of the plot. 

<figure>

![](/img/keys/plot_id.png)

</figure>


1. Farm to pool public key. This method of farming is desirable if either solo farming (no pools), or starting to 
farm without any chia.
   To farm a plot like this, we hash together the plot public key (explained later), and the pool public key.
   When successfully farming a block, the pool private key must sign the reward address. 
   The drawback of this method is that if using a pool, the pool cannot be changed, and the plot is tied to the 
   pool forever.

2. Farm to pool contract address. This method of farming is suitable for users who want to farm to a pool, but also
be able to change the pool that they belong to in the future. Instead of requiring a signature by the pool, rewards
   go straight into the puzzle hash (or address), that is encoded into the plot. This address is a smart contract
   controlled by the user, which specifies the user's current pool. The user can switch the pool, with a certain 24 hour time delay, which will 
   re-route all new rewards to the new pool (not implemented yet). The drawback of this approach is that it requires
   creating a blockchain transaction before farming. Therefore a user must have chia before starting to farm.

Therefore, compromising the harvester does not allow an attack to redirect rewards. The plot public key is explained
in the next section.

</details>
