---
sidebar_position: 2
---

# 3.2 空间证明

> Proof of Space

空间证明协议是这样一种协议：验证者可以向证明者发送质询，证明者可以向验证者证明：证明者在那个精确时间保留了特定数量的存储空间。

空间证明协议包含三个部分：绘图、证明/耕作和验证。有关更多信息，请参阅我们的 [chiapos 规范详细信息](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf) ，和[参考实现](https://github.com/Chia-Network/chiapos)。

![chia-architecture](/img/pospace.png)

<details>
<summary>原文参考</summary>

A proof of space protocol is one in which:
* A Verifier can send a challenge to a Prover, and 
* The Prover can demonstrate to the verifier that the Prover is reserving a specific amount of storage space at that precise time. 

The proof of space protocol has three components: plotting, proving/farming, and verifying.For more info, see our [Details of the chiapos specification](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf), and [reference implementation](https://github.com/Chia-Network/chiapos).

![chia-architecture](/img/pospace.png)

</details>

## 绘图

绘图是证明者（我们称为_农民_）初始化一定数量空间的过程。要成为农民，必须至少有 101.4 GiB 可用在他们的计算机上（最低规格是[树莓派 4](https://github.com/Chia-Network/chia-blockchain/wiki/Raspberry-Pi "Running Chia on a Raspberry Pi 4")）。奇亚农场的规模没有上限。一些农民拥有多 PiB 农场。

从奇亚 1.2.7 开始，使用 400 GiB RAM 的高端机器可以在大约 5 分钟内创建一个 k32 图，或者使用普通商品机器 6 小时，或者使用一个 CPU 内核的慢速机器 12 小时和几 GB 的 RAM。巨大的加速机会仍然存在。此外，每个图只需要创建一次，一个农民可以在同一块土地上耕种多年。

绘图大小由 k 参数决定，其中 `space = 780 * k * pow(2, k - 10)`，最小 k 为 32 (101.4 GiB)。 The Proof of Space 构造基于 [超越赫尔曼（Hellman）](https://eprint.iacr.org/2017/893.pdf "Beyond Hellman's Time-Memory Trade Offs with Applications to Proofs of Space")，但它嵌套了六个次（从而创建七个表），并且它包含其他启发式方法以使其实用。

图中的七个表中的每一个都填充了无法压缩的随机数据。每个表有 2^k 个条目。表 i 中的每个条目都包含两个指向表 i-1（上一个表）的指针。最后，每个表 1 条目包含一对介于 0 和 2^k 之间的整数，称为“x 值”。空间证明是具有特定数学关系的 64 个 x 值的集合。实际的磁盘结构和生成它所需的算法相当[复杂](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf)，但这是总体思路。

<figure>

![chia-architecture](/img/plot.png)

<figcaption>
图 2：绘图文件的结构。 64 个红色 x 值代表证明，2 个绿色 x 值代表质量。
</figcaption>
</figure>

一旦证明者初始化了 101.4 GiB，他们就准备好接受挑战并创建证明。该方案的一个吸引人的特性是它是非交互式的，除非农民选择 [plot NFT style pooling](/docs/02architecture/p2p-system#pools)：无需注册或在线连接即可使用原始图创建情节情节格式。在获得奖励之前，区块链不会受到任何影响，类似于工作量证明。对于池可移植地块，农民只需要一些魔力在绘图之前创建一个地块 NFT，然后一切都具有相同的特征。

有关更多信息，请参阅我们的 [绘图常见问题解答](https://github.com/Chia-Network/chia-blockchain/wiki/FAQ#plotting "Chia plotting FAQ")。

<details>
<summary>原文参考</summary>

- ## Plotting

Plotting is the process by which a Prover, who we refer to as a _farmer_, initializes a certain amount of space. To become a farmer, one must have at least 101.4 GiB available to reserve on their computer (the minimum spec is a [Raspberry Pi 4](https://github.com/Chia-Network/chia-blockchain/wiki/Raspberry-Pi "Running Chia on a Raspberry Pi 4")). There is no upper limit to the size of a Chia farm. Several farmers have multi-PiB farms.

As of Chia 1.2.7, a k32 plot can be created in around five minutes with a high-end machine with 400 GiB of RAM, or six hours with a normal commodity machine, or 12 hours with a slow machine using one CPU core and a few GB of RAM. Opportunities still remain for huge speedups. Furthermore, each plot only needs to be created once; a farmer can farm with the same plots for many years.

Plot sizes are determined by a k parameter, where `space = 780 * k * pow(2, k - 10)`, with a minimum k of 32 (101.4 GiB). The Proof of Space construction is based on [Beyond Hellman](https://eprint.iacr.org/2017/893.pdf "Beyond Hellman's Time-Memory Trade Offs with Applications to Proofs of Space"), but it is nested six times (thereby creating seven tables), and it contains other heuristics to make it practical.

Each of the seven tables in a plot is filled with random-looking data that cannot be compressed. Each table has 2^k entries. Each entry in table i contains two pointers to table i-1 (the previous table). Finally, each table-1 entry contains a pair of integers between 0 and 2^k, called “x-values.” A proof of space is a collection of 64 x-values that have a certain mathematical relationship. The actual on-disk structure and the algorithm required to generate it are quite [complicated](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf), but this is the general idea.

<figure>

![chia-architecture](/img/plot.png)

<figcaption>
Figure 2: Structure of a plot file. The 64 red x-values represent the proof, the 2 green x-values represent the quality.
</figcaption>
</figure>

Once the Prover has initialized 101.4 GiB, they are ready to receive a challenge and create a proof. One attractive property of this scheme is that it is non-interactive unless the farmer chooses [plot NFT style pooling](/docs/02architecture/p2p-system#pools): no registration or online connection is required to create a plot using the original plot format. Nothing hits the blockchain until a reward is won, similar to PoW. For pool portable plots, a farmer only needs a few mojos to create a plot NFT before plotting and then everything has the same characteristics from there.

See our [plotting FAQ](https://github.com/Chia-Network/chia-blockchain/wiki/FAQ#plotting "Chia plotting FAQ") for more info.

</details>


## 耕种

耕作是农民收到一系列 256 位质询以证明他们合法地搁置了规定数量的存储的过程。为应对每个挑战，农民检查他们的地块，生成证明，并将任何获胜的证明提交给网络进行验证。

输入挑战和输出证明的过程涉及多次查表。首先，农民通过读取表 7 中的一对值来应对挑战。这些值指向表 6 中的两个条目、表 5 中的四个条目等。

最后，农夫获取整个 x 值树。这需要对表 7 进行一次磁盘读取，对表 6 进行两次读取，对表 5 进行四次读取，等等。因此，整个过程需要 64 次磁盘读取，在具有 10 毫秒寻道时间的慢速 HDD 上大约需要 640 毫秒。读取的数据量很小，并且与绘图大小无关。

由于此过程生成的大多数证明都不够好(/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points") 所述）提交给网络进行验证，我们可以优化这个过程只检查树的一个分支。此分支将返回 64 个 x 值中的两个。 x 值的位置将始终是连续的，并取决于标志点（例如 x0 和 x1...或 x34 和 x35）。我们散列这些 x 值以生成随机的 256 位“质量字符串”。这与难度和绘图大小相结合以生成 required_iterations。如果 required_iterations 小于一定数量，则证明可以包含在区块链中。此时，我们查找整个空间证明。

通过只查找一个分支来确定质量字符串，我们可以排除大多数证明。这种优化只需要大约 7 次磁盘搜索和读取，或者在慢速硬盘驱动器上大约需要 70 毫秒。

Chia 还使用进一步的优化来取消一定比例的地块参加每个挑战的资格。这称为 _plot filter_。当前的要求是地块 ID、挑战和标牌点的哈希值以 9 个零开头。这排除了每 512 个地块中的 511 个。过滤器对每个人的伤害都是一样的（除了[重新绘制攻击者](/docs/03consensus/attacks_and_countermeasures#short-range-replotting-attack "Section 3.14: Short Range Replotting Attack")），因此是公平的。 [第 3.5 节](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points")中更详细地讨论了绘图过滤器。

地块过滤器有效地将耕作所需的资源量减少了 512 倍——每个地块每几分钟只需要几次磁盘读取。拥有 1 PiB 存储空间（10,000 个地块）的农民将平均只有 20 个地块通过每个挑战的过滤器。即使这些图都存储在慢速硬盘上，并连接到单个 Raspberry Pi，响应每个挑战所需的平均时间也将不到两秒。这完全在限制范围内，以避免错过任何挑战。

每个绘图文件都有自己唯一的私钥，称为_绘图密钥_。地块 ID 是通过对地块公钥、农民公钥和矿池公钥（对于 OG 地块）或矿池合同拼图哈希（对于汇集地块）进行散列生成的。签署空间证明的要求取决于所使用的地块类型。请参阅 [第 9.3 节](/docs/09keys/plot_public_keys "Section 9.3: Public Plot Keys")，了解有关用于情节构建的密钥的详细信息。

实际上，地块密钥是存储在地块中的本地密钥和农民软件存储的密钥之间的 2/2 BLS 聚合公钥。为了安全和效率，农民可以使用此密钥和签名方案在一台服务器上运行。然后，该服务器可以连接到存储实际地块的一台或多台收割机。 Farming 需要 Farmer 密钥和本地密钥，但不需要池密钥，因为池的签名可以缓存并在许多块中重复使用。

<details>
<summary>原文参考</summary>

- ## Farming

Farming is the process by which a farmer receives a sequence of 256-bit challenges to prove that they have legitimately put aside a defined amount of storage. In response to each challenge, the farmer checks their plots, generates a proof, and submits any winning proofs to the network for verification.

The process of inputting a challenge and outputting a proof involves multiple table lookups. First, the farmer responds to a challenge by reading a pair of values in table 7. These point to two entries in table 6, four entries in table 5, etc.

Finally, the farmer fetches the whole tree of x-values. This requires one disk read for table 7, two for table 6, four for table 5, etc. The whole process thus requires 64 disk reads, which takes approximately 640 ms on a slow HDD with a 10 ms seek time. The amount of data read is small and is independent of plot size.

Since most proofs generated by this process are not good enough (as discussed in [Section 3.5](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points")) to be submitted to the network for verification, we can optimize this process by only checking one branch of the tree. This branch will return two of the 64 x-values. The position of the x-values will always be consecutive and will depend on the signage point (eg x0 and x1... or x34 and x35). We hash these x-values to produce a random 256-bit "quality string." This is combined with the difficulty and the plot size to generate the required_iterations. If the required_iterations is less than a certain number, the proof can be included in the blockchain. At this point, we look up the whole proof of space.

By only looking up one branch to determine the quality string, we can rule out most proofs. This optimization requires only around 7 disk seeks and reads, or about 70 ms on a slow hard drive.

Chia also uses a further optimization to disqualify a certain proportion of plots from eligibility for each challenge. This is referred to as the _plot filter_. The current requirement is that the hash of the plot ID, challenge, and signage point starts with 9 zeros. This excludes 511 out of every 512 plots. The filter hurts everyone equally (except for [replotting attackers](/docs/03consensus/attacks_and_countermeasures#short-range-replotting-attack "Section 3.14: Short Range Replotting Attack")), and is therefore fair. The plot filter is discussed in greater detail in [Section 3.5](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points").

The plot filter effectively reduces the amount of resources required for farming by 512x -- each plot only requires a few disk reads every few minutes. A farmer with 1 PiB of storage (10,000 plots) will only have an average of 20 plots that pass the filter for each challenge. Even if these plots all are stored on slow HDDs, and connected to a single Raspberry Pi, the average time required to respond to each challenge will be less than two seconds. This is well within the limits to avoid missing out on any challenges.

Each plot file has its own unique private key called a _plot key_. The plot ID is generated by hashing the plot public key, the farmer public key, and either the pool public key (for OG plots) or the pool contract puzzle hash (for pooled plots). The requirements for signing a proof of space depend on the type of plots being used. See [Section 9.3](/docs/09keys/plot_public_keys "Section 9.3: Public Plot Keys") for details on the keys used for plot construction.

In practice, the plot key is a 2/2 BLS aggregate public key between a local key stored in the plot and a key stored by the farmer software. For security and efficiency, a farmer may run on one server using this key and signature scheme. This server can then be connected to one or more harvester machines that store the actual plots. Farming requires the farmer key and the local key, but it does not require the pool key, since the pool’s signature can be cached and reused for many blocks.

</details>

## 验证

在农民成功创建空间证明后，可以通过执行一些散列并在证明中的 x 值之间进行比较来验证该证明。 回想一下，证明是一个包含 64 个 x 值的列表，其中每个 x 值是 k 位长。 对于 k32，这是 256 字节（2048 位），因此非常紧凑。 验证速度非常快，但还不够快，无法在 Ethereum 上的 Solidity 中进行验证（可以实现链之间的无信任传输），因为此验证需要 blake3 和 chacha8 操作。

<details>
<summary>原文参考</summary>

- ## Verifying

After the farmer has successfully created a proof of space, the proof can be verified by performing a few hashes and making comparisons between the x-values in the proof. Recall that the proof is a list of 64 x-values, where each x-value is k bits long. For a k32 this is 256 bytes (2048 bits), and is therefore very compact. Verification is very fast, but not quite fast enough to be verified in Solidity on Ethereum (something that would enable trustless transfers between chains), since this verification requires blake3 and chacha8 operations.

</details>
