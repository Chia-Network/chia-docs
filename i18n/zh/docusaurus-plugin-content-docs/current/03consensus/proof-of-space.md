---
sidebar_position: 2
---

# 3.2 空间证明

空间证明协议是这样一种协议：验证者可以向证明者发送质询，证明者可以向验证者证明：证明者在那个精确时间保留了特定数量的存储空间。

- A Verifier can send a challenge to a Prover, and
- The Prover can demonstrate to the verifier that the Prover is reserving a specific amount of storage space at that precise time.

空间证明协议包含三个部分：绘图、证明/耕作和验证。 有关更多信息，请参阅我们的 [chiapos 规范详细信息](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf) ，和[参考实现](https://github.com/Chia-Network/chiapos)。

![chia-architecture](/img/pospace.png)

## 绘图

绘图是证明者（我们称为*农民*）初始化一定数量空间的过程。 要成为农民，必须至少有 101.4 GiB 可用在他们的计算机上（最低规格是[树莓派 4](https://github.com/Chia-Network/chia-blockchain/wiki/Raspberry-Pi "Running Chia on a Raspberry Pi 4")）。 奇亚农场的规模没有上限。 一些农民拥有多 PiB 农场。

从奇亚 1.2.7 开始，使用 400 GiB RAM 的高端机器可以在大约 5 分钟内创建一个 k32 图，或者使用普通商品机器 6 小时，或者使用一个 CPU 内核的慢速机器 12 小时和几 GB 的 RAM。 巨大的加速机会仍然存在。 此外，每个图只需要创建一次，一个农民可以在同一块土地上耕种多年。

绘图大小由 k 参数决定，其中 `space = 780 * k * pow(2, k - 10)`，最小 k 为 32 (101.4 GiB)。 The Proof of Space 构造基于 [超越赫尔曼（Hellman）](https://eprint.iacr.org/2017/893.pdf "Beyond Hellman's Time-Memory Trade Offs with Applications to Proofs of Space")，但它嵌套了六个次（从而创建七个表），并且它包含其他启发式方法以使其实用。

图中的七个表中的每一个都填充了无法压缩的随机数据。 每个表有 2^k 个条目。 表 i 中的每个条目都包含两个指向表 i-1（上一个表）的指针。 最后，每个表 1 条目包含一对介于 0 和 2^k 之间的整数，称为“x 值”。 空间证明是具有特定数学关系的 64 个 x 值的集合。 实际的磁盘结构和生成它所需的算法相当[复杂](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf)，但这是总体思路。

<figure>
<img src="/img/plot.png" alt="drawing"/>
![chia-architecture](/img/plot.png)

<figcaption>
图 2：绘图文件的结构。 64 个红色 x 值代表证明，2 个绿色 x 值代表质量。
</figcaption>
</figure>

一旦证明者初始化了 101.4 GiB，他们就准备好接受挑战并创建证明。 该方案的一个吸引人的特性是它是非交互式的，除非农民选择 [plot NFT style pooling](/docs/02architecture/p2p-system#pools)：无需注册或在线连接即可使用原始图创建情节情节格式。 在获得奖励之前，区块链不会受到任何影响，类似于工作量证明。 对于池可移植地块，农民只需要一些魔力在绘图之前创建一个地块 NFT，然后一切都具有相同的特征。

See our [plotting FAQ](https://github.com/Chia-Network/chia-blockchain/wiki/FAQ#plotting "Chia plotting FAQ") for more info.

## 耕种

耕作是农民收到一系列 256 位质询以证明他们合法地搁置了规定数量的存储的过程。 为应对每个挑战，农民检查他们的地块，生成证明，并将任何获胜的证明提交给网络进行验证。

输入挑战和输出证明的过程涉及多次查表。 首先，农民通过读取表 7 中的一对值来应对挑战。 这些值指向表 6 中的两个条目、表 5 中的四个条目等。

最后，农夫获取整个 x 值树。 这需要对表 7 进行一次磁盘读取，对表 6 进行两次读取，对表 5 进行四次读取，等等。 因此，整个过程需要 64 次磁盘读取，在具有 10 毫秒寻道时间的慢速 HDD 上大约需要 640 毫秒。 读取的数据量很小，并且与绘图大小无关。

由于此过程生成的大多数证明都不够好（如[第 3.5 节](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points")所述）提交给网络进行验证，我们可以优化这个过程只检查树的一个分支。 此分支将返回 64 个 x 值中的两个。 x 值的位置将始终是连续的，并取决于标志点（例如 x0 和 x1...或 x34 和 x35）。 我们散列这些 x 值以生成随机的 256 位“质量字符串”。 这与难度和绘图大小相结合以生成所需的迭代。 如果所需的迭代小于一定数量，则证明可以包含在区块链中。 此时，我们查找整个空间证明。

通过只查找一个分支来确定质量字符串，我们可以排除大多数证明。 这种优化只需要大约 7 次磁盘搜索和读取，或者在慢速硬盘驱动器上大约需要 70 毫秒。

> NOTE: Throughout this website, we'll make a simple assumption that a single disk seek requires 10ms. In reality, this is typically 5-10ms, so we're using a conservative estimate.

> The 10ms estimate also takes into account the time required to transfer data after the seek. While storage industry specs typically assume that large files are being transferred, this does not hold true for Chia farming, where proof lookups only require a tiny amount of data to be transferred. Therefore, for this website, it's safe to assume the transfer is almost instant.

奇亚还使用进一步的优化来取消一定比例的地块参加每个挑战的资格。 这称为 _绘图过滤器_。 当前的要求是地块 ID、挑战和标牌点的哈希值以 9 个零开头。 这排除了每 512 个地块中的 511 个。 过滤器对每个人的伤害都是一样的（除了[重新绘制攻击者](/docs/03consensus/attacks_and_countermeasures#short-range-replotting-attack "Section 3.14: Short Range Replotting Attack")），因此是公平的。 [第 3.5 节](/docs/03consensus/signage_points_and_infusion_points "Section 3.5: Signage Points and Infusion Points")中更详细地讨论了绘图过滤器。

地块过滤器有效地将耕作所需的资源量减少了 512 倍——每个地块每几分钟只需要几次磁盘读取。 拥有 1 PiB 存储空间（10,000 个地块）的农民将平均只有 20 个地块通过每个挑战的过滤器。 即使这些图都存储在慢速硬盘上，并连接到单个树莓派，响应每个挑战所需的平均时间也将不到两秒。 这完全在限制范围内，以避免错过任何挑战。

每个绘图文件都有自己唯一的私钥，称为*绘图密钥*。 地块 ID 是通过对地块公钥、农民公钥和矿池公钥（对于 OG 地块）或矿池合同谜语哈希（对于汇集地块）进行哈希生成的。 签署空间证明的要求取决于所使用的地块类型。 请参阅[第 9.3 节](/docs/09keys/plot_public_keys "Section 9.3: Public Plot Keys")，了解有关用于情节构建的密钥的详细信息。

实际上，地块密钥是存储在地块中的本地密钥和农民软件存储的密钥之间的 2/2 BLS 聚合公钥。 为了安全和效率，农民可以使用此密钥和签名方案在一台服务器上运行。 然后，该服务器可以连接到存储实际地块的一台或多台收割机。 耕种需要农民密钥和本地密钥，但不需要矿池密钥，因为池的签名可以缓存并在许多块中重复使用。

## 验证

在农民成功创建空间证明后，可以通过执行一些散列并在证明中的 x 值之间进行比较来验证该证明。 回想一下，证明是一个包含 64 个 x 值的列表，其中每个 x 值是 k 位长。 对于 k32，这是 256 字节（2048 位），因此非常紧凑。 验证速度非常快，但还不够快，无法在以太坊上的 Solidity 中进行验证（可以实现链之间的无信任传输），因为此验证需要 blake3 和 chacha8 操作。
