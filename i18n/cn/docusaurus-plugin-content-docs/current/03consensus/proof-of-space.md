---
sidebar_position: 2
---

# 3.2 空间证明

> Proof of Space

空间证明协议是这样一种协议：验证者可以向证明者发送质询，证明者可以向验证者证明证明者在那个精确时间保留了特定数量的存储空间。

空间证明协议具有三个组成部分：绘图、证明/耕作和验证。chiapos 规范的详细信息在[这里](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf)，参考实现在[这里](https://github.com/Chia-Network/chiapos)。

![chia-architecture](/img/pospace.png)


<details>
<summary>原文参考</summary>

A proof of space protocol is one in which:
a Verifier can send a challenge to a Prover, and 
the Prover can demonstrate to the verifier that the Prover is reserving a specific amount of storage space at that precise time. 

The proof of space protocol has three components: plotting, proving/farming, and verifying.
Details of the chiapos specification are [here](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf), and reference implementation [here](https://github.com/Chia-Network/chiapos).

![chia-architecture](/img/pospace.png)

</details>


## 绘图

绘图是证明者（我们称为农民）初始化一定数量空间的过程。农民可以是在笔记本电脑上至少有 100 GiB 可用空间的任何人，也可以是准备分配大量未使用存储空间的企业。没有上限。绘图需要几个小时或几天的时间，并且只执行一次。初始化的空间被一个叫做 plot 的文件占据。绘图大小由 k 参数确定，其中`space = 780 * k * pow(2, k - 10)`，最小 k 为 32 (101.4 GiB)。从 Chia 1.2.7 开始，如果您有 400 GiB 的内存，则可以在大约 5 分钟内创建一个 k32 图，使用普通商品机器需要 6 小时，使用一个 CPU 内核和几 GB 内存的慢速机器需要 12 小时. 有巨大加速的机会。PosSpace 结构基于 Beyond Hellman[8] ，但嵌套了 6 次并包含其他启发式方法以使其实用。

结果是一个绘图文件，例如，可以是 100 GiB。该文件包含七个带有随机数据的表。每个表有 2^k 个条目。表 i 中的每个条目都包含两个指向表 i-1（上一个表）的指针。最后，每个表 1 条目包含一对介于 0 和 2^k 之间的整数，称为“x 值”。空间证明是具有特定数学关系的 64 个 x 值的集合。实际的磁盘结构和生成它所需的算法相当[复杂](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf)，但这是总体思路。

![chia-architecture](/img/plot.png)

在上图中，证明者初始化 100 GiB 后，他们就准备好接受挑战并创建证明。该方案的一个吸引人的特性是它是非交互式的：无需注册或在线连接即可创建图。在获得奖励之前，区块链不会受到任何影响，类似于 PoW。

<details>
<summary>原文参考</summary>

- ## Plotting

Plotting is the process by which a prover, who we refer to as a farmer, initializes a certain amount of space. A farmer can be any person who has at least 100 GiB available to reserve on their laptop, or an enterprise prepared to allocate a large volume of unused storage space.
There is no upper limit. Plotting takes on the order of hours or days, and is performed only once.
The initialized space is occupied by a file called a plot. Plot sizes are determined by a k parameter, where `space = 780 * k * pow(2, k - 10)`, with a minimum k of 32 (101.4 GiB).
As of Chia 1.2.7, a k32 plot can be created in around 5 minutes if you have 400 GiB of ram, six hours with a normal commodity machine, and 12 hours with a slow machine using one CPU core and a few GB of memory.
There are opportunities for huge speedups. The PosSpace construction is based on Beyond Hellman [8], but is nested 6 times and contains other heuristics to make it practical.

The result is a plot file that can be, for example, 100 GiB. The file contains seven tables with random-looking data.
Each table has 2^k entries. Each entry in table i contains two pointers to table i-1 (the previous table).
Finally, each table 1 entry contains a pair of integers between 0 and 2^k, called “x-values.” A proof of space is a collection of 64 x-values that have a certain mathematical relationship.
The actual on disk structure and the algorithm required to generate it are quite [complicated](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf), but this is the general idea.

![chia-architecture](/img/plot.png)

In the diagram above, once the Prover has initialized 100 GiB, they are ready to receive a challenge and create a proof. One attractive property of this scheme is that it is non-interactive: no registration or online connection is required to create a plot. Nothing hits the blockchain until a reward is won, similar to PoW.

</details>


## 农业

耕作是农民接受一系列挑战以证明他们合法地搁置规定数量的存储的过程。为了响应每一个挑战，农民检查他们的地块，生成一个证明并将任何获胜的证明提交给网络进行验证。

此过程的每次迭代都是一次查表。查找将 256 位挑战作为输入并输出证明。农夫通过读取表 7 中的一对值来应对挑战。它们指向表 6 中的两个条目，等等。最后，农夫获取整个 x 值树。这需要对表 7 进行一次读取，对表 6 进行两次读取，对表 5 进行四次读取，等等。假设一个慢速 HDD 的寻找时间为 10 毫秒，则整个过程大约需要 640 毫秒。读取的数据量很小，并且与绘图大小无关。

由于这个过程生成的大多数证明都不够好（稍后讨论），无法提交给网络进行验证，我们可以通过只检查树的一个分支来优化这个过程，这会导致两个 x 值，具体取决于挑战。然后我们将通过这种方式生成的 x 值散列到一个 256 位的字符串中，以确定证明是否良好。对这些 x 值进行哈希处理为我们提供了质量字符串，一个 256 位的随机值。这与难度和绘图大小相结合以生成 required_iterations。如果 required_iterations 小于一定数量（我们可以进入区块链），那么我们查找整个 PoSpace。查找一个分支只需要大约 7 次磁盘搜索和读取，或者在慢速硬盘驱动器上大约需要 70 毫秒。图 2：绘图文件的结构。64 个红色 x 值代表证明，

进一步的优化是取消一定比例（例如 511/512）地块的每次挑战资格。这称为绘图过滤器。例如，要求挑战的哈希值和 plot_id 以 9 个零开头。这对每个人的伤害都是一样的（除了重新策划攻击者），因此是公平的。这使得农业几乎不需要资源，并且每隔几分钟读取很少的磁盘。Chia 用户已成功在单个 Raspberry Pi 上种植多个 PiB 存储。我们假设农民总是使用 HDD，因为它们很便宜，而且没有理由使用 SSD，因为速度与农业无关。但是，SSD/RAM 可用于更快地绘图。

绘图密钥是存储在绘图文件中的私钥。绘图 id 是通过散列绘图公钥和池公钥生成的。创建具有空间证明的块需要使用绘图密钥和池密钥进行签名。因此，在创建绘图后可能不会更改池。实际上，地块密钥是存储在地块中的本地密钥和农民软件存储的密钥之间的 2/2 BLS 聚合公钥。为了安全和效率，农民可以使用此密钥和签名方案运行中央服务器。服务器可能连接到许多存储地块的收割机。Farming 需要 farmer key 和 local key，但不需要 pool key，因为 pool 的签名可以被缓存，并且可以被很多块重用。


<details>
<summary>原文参考</summary>

- ## Farming

Farming is the process by which a farmer receives a sequence of challenges to prove that they have legitimately put aside a defined amount of storage. In response to each challenge the farmer checks their plots, generates a proof and submits any winning proofs to the network for verification. 

Each iteration of this process is a table lookup. A lookup takes a 256 bit challenge as input and outputs a proof. The farmer responds to a challenge by reading a pair of values in table 7. These point to two entries in table 6, etc. Finally, the farmer fetches the whole tree of x-values. This requires one read for table 7, two for table 6, four for table 5, etc. The whole process would take approximately 640ms, assuming a slow HDD with a 10ms seek time. The amount of data read is small and is independent of plot size.

Since most proofs generated by this process are not good enough (as discussed later) to be submitted to the network for verification, we can optimize this process by only checking one branch of the tree, which results in two x-values, depending on the challenge. We then hash the x-values generated in this way into a 256 bit string to determine whether the proof is good. Hashing these x-values gives us the quality string, a 256 bit random value. This is combined with the difficulty and the plot size to generate the required_iterations. If the required_iterations is less than a certain number (we can get into the blockchain), then we look up the whole PoSpace. Looking up one branch requires only around 7 disk seeks and reads or about 70ms on a slow hard drive. 
Figure 2: Structure of a plot file. The 64 red x- values represent the proof, the 2 green x- values represent the quality. 

A further optimization is to disqualify a certain proportion (for example 511/512) plots from eligibility for each challenge. This is referred to as the plot filter. For example, requiring that the hash of the challenge and the plot_id starts with 9 zeros. This hurts everyone equally (except for replotting attackers), and is therefore fair. This makes farming require almost no resources, and very few disk reads every few minutes.  Chia users have successfully been farming multiple PiB of storage on a single Raspberry Pi. We assume that farmers always use HDDs since they are cheap and there is no reason to use SSDs since the speed is not relevant for farming. SSDs / RAM can be used for faster plotting, however. 

The plot key is a private key that is stored in the plot file. The plot id is generated by hashing the plot public key and the pool public key. Creating a block with a proof of space requires signing with both the plot key and the pool key. Therefore the pool may not be changed after creating the plot. In practice, the plot key is a 2/2 BLS aggregate public key between a local key stored in the plot and a key stored by the farmer software. For security and efficiency a farmer may run a centralized server using this key and signature scheme. The server may be connected to many harvester machines that store plots. Farming requires the farmer key and the local key, but does not require the pool key, since the pool’s signature can be cached and reused for many blocks.

</details>


## 验证

在农民成功创建空间证明后，可以通过执行一些散列并在证明中的 x 值之间进行比较来验证该证明。回想一下，证明是一个包含 64 个 x 值的列表，其中每个 x 值是 k 位长。对于 k32，这是 256 字节，因此非常紧凑。验证速度非常快，但还不够快，无法在以太坊上进行可靠性验证（可以实现链之间的无信任传输），因为它需要 blake3 和 chacha8 操作。

<details>
<summary>原文参考</summary>

- ## Verifying

After the farmer has successfully created a proof of space, the proof can be verified by performing a few hashes and making comparisons between the x-values in the proof. Recall that the proof is a list of 64 x-values, where each x-value is k bits long. For a k32 this is 256 bytes, and is therefore very compact. Verification is very fast, but not quite fast enough to be verified in solidity on ethereum (something that would enable trustless transfers between chains), since it requires blake3 and chacha8 operations.

</details>
