---
title: 联合耕种（Pool Farming）
slug: /pool-farming
---

由于不断增长的网络空间（network space，netspace），在 Chia 中获得区块奖励会变得非常困难，即便是使用多个硬盘进行耕种的用户，也可能需要数月甚至数年的时间。 联合耕种可以确保持续获得小额但稳定的区块奖励。 例如，独自耕种每20周可以获得2XCH的用户，通过加入联合耕种可以每周以更加稳定的方式获得0.1XCH。

Chia的联合耕种协议（pooling protocol）允许将地块分配给“联合耕种农田（Plot NFT）”，它类似于区块链上的合约，您可以控制它，并在其中设置当前分配到哪个联合耕种地址。 还可以随时更改分配给NFT地块的联合耕种地址。

使用联合耕种协议，农民（farmer）将与特定的联合耕种服务器通信，并频繁向该联合耕种地址发送空间证明，用以证明拥有已生成空间的大小。 因此，联合耕种服务器可以跟踪其每个成员（即农民）的空间，每当其中一名成员赢得一个区块时，联合耕种服务器可以根据每个农民贡献的空间比例分发奖励。

正因如此，联合耕种有点像彩票保险：所有成员参与Chia的“彩票”，每当其中一名成员中奖时，联合耕种获得奖励并将其分配给所有成员，减去一小笔手续费。 The reward is divided into two tranches: 7/8 is split among the pool members, and the other 1/8 goes directly to the farmer who won the block.

## Chia联合耕种（Pooling）的六个步骤

:::note

The official pooling protocol was introduced in verion 1.2 in mid-2021. All plots created before this point, as well as newer plots created with following the pooling protocol, are not eligible for pooling. If you have any of these "OG" plots, you can either recreate them using a plot NFT, or co-farm them on the same machine as your official pool plots.

:::

### 第一步：同步全节点和钱包

In order to set up your farm for pooling, you need to have a synced full node and wallet. In the upper-right corner of your wallet, you should see green icons next to `FUll NODE` and `WALLET`:

<div style={{textAlign: 'left'}}>
 <img src="/img/pooling/01.png" alt="Sync status"/>
</div><br/>

:::info

If you want to avoid syncing from genesis, you can download a [database checkpoint](https://www.chia.net/downloads/#database-checkpoint).

For more info, see our [blog post](https://www.chia.net/2023/03/19/introducing-chia-blockchain-database-bittorent-checkpoints/) on this subject.

:::

### 第二步：获取一些XCH

开始联合耕种之前，请确保钱包里面拥有一小笔XCH。 可以向朋友索取mojo（1 mojo等于0.000000000001 XCH），或者到https://faucet.chia.net/获取mojo。 You can use the receive address on the `Tokens` page, and you can also create new receive addresses. Any of the receive addresses can be used; they are all part of the same wallet.

### 第三步：创建联合耕种农田（Plot NFT）

一旦钱包里有了XCH，就可以前往"联合耕种"页面，然后点击"新建联合耕种农田"。

#### Using the CLI

主要有两个选项：

1. 独自耕种：这个联合耕种农田不会连接到任何联合耕种服务器，1.75 XCH将直接进入你的钱包。 这与旧的（原始）地块（OG）不同，因为旧地块永远锁定在独自耕种状态。 使用命令行：

```bash
chia plotnft create -s local
```

2. 连接联合耕种：加入一个联合耕种池，并在生成地块后立即开始耕种。 使用命令行：

```bash
chia plotnft create -s pool -u https://bar.examplepool.org
```

请注意，即便选择的是选项1，以后仍然可以加入联合耕种池，并且可以随时切换到其它池。 如果决定加入一个联合耕种池，请输入网址 (必须以 _https://_开头)，然后查看描述。 如果同意, 则开始创建联合耕种农田, 并等待它被确认 (只点击一次)。 这可能需要几分钟的时间才能得到确认，然后出现在“联合耕种”选项卡中。 您只需要 1 个联合耕种农田。

#### 使用图形用户界面（GUI）

Click the `Pooling` icon on the left side of your wallet, and click `JOIN A POOL`:

<div style={{ textAlign: 'left' }}>
  <img src="/img/pooling/02.png" alt="Join a pool" />
</div>

<br />

Select `Connect to pool`. You will need to enter a valid pool URL. For a list of Chia pools, see [chialinks.com](https://chialinks.com/pools).

Creating a plot NFT requires an on-chain transaction that will cost one mojo. You are also recommended to enter a blockchain fee. Depending on how busy the network is, a one-mojo fee is typically enough to complete your transaction within a few minutes.

<div style={{ textAlign: 'left' }}>
  <img src="/img/pooling/03.png" alt="Create a plot NFT" />
</div>

<br />

If you entered a valid pool URL, the details will pop up. If everything looks acceptable, click `CREATE`:

<div style={{ textAlign: 'left' }}>
  <img src="/img/pooling/04.png" alt="Pool details" />
</div>

<br />

Your transaction will be pushed to the blockchain. While it is pending, a new screen will appear:

<div style={{ textAlign: 'left' }}>
  <img src="/img/pooling/05.png" alt="Plot NFT pending" />
</div>

<br />

After the transaction has been finalized (typically 1-3 minutes), the details of your plot NFT will appear.

:::info

A two-word name will automatically be assigned to your plot NFT.

:::

### 第 4 步：添加地块

You can now start creating plots for this Plot NFT, which means these plots will be "pooling" and can earn rewards more often.

Detailed instructions can be found in the "How to Plot" page:
* Plotting from the [CLI](/plotting-how-to#cli-plotting)
* Plotting from the [GUI](/plotting-how-to#gui-plotting)

### 第五步：管理联合耕种农田。

You should see your plots in the `Pooling` dialog. The status should say `Pooling``. 在这里，可以看到当前农田的难度，已获得的积分（points）以及联合耕种池认为您拥有的积分（积分余额）。

<div style={{ textAlign: 'left' }}>
  <img src="/img/pooling/06.png" alt="Plot NFT details" />
</div>

<br />

难度是一个对于每个联合耕种农田都不同的值，它决定了为这些地块寻找证明的难度。 这个值会自动设置，以决定查找证明的频繁程度（每隔几分钟或几小时）。 每找到一个证明，将获得 `难度` 积分。 拥有大量地块的农民将拥有较高的难度，以保持磁盘使用量在较低水平。

积分是一种计算地块找到了多少证明的方式。 每个K32地块每天平均会获得10个积分，与难度无关。 积分与Chia（XCH）不同。 积分只是反映了进行了多少耕种的值。 可以将其视为一种会计工具。 根据您获得的积分数，由联合耕种池定期发放XCH，并将您的积分重置为0，这是矿池的责任。

To change pools, click on the `CHANGE POOL` button and enter the new pool URL. 请注意，更改联合耕种池有一个等待期，可能会持续几分钟到一小时左右。 请在此过程中不要关闭应用程序。 可以随意更改联合耕种池，而且不需要进行注册或支付任何罚款。 请注意，如果更改了联合耕种池，之前的耕种池不再有义务继续向你支付收益。

您应该确保在过去24小时内的积分数是准确的。 每天每个k32地块应该获得大约10个积分，所以如果有100个k32的地块，每天应该获得大约1000个积分。 确保您的积分在持续增长。 支付后，积分余额将重置为零。 积分将随机出现，因为查找证明也是随机的。 因此，预计会有很多变化，并且会有好运和坏运的时候。

### 第六步：等待支付

所有操作都已经完成了。 如果你的积分余额在增加，意味着已经正确连接到联合耕种池耕种。可以查看你所在的跟中池，看看奖励是多久发放一次，也可以选择登录到耕种池的界面。

## 附加信息

### 多个联合耕种农田

可以在同一个密钥上拥有多个联合耕种农田，可以同时进行耕种。 还可以同时使用原始 (OG) 地块进行耕种。

### 多台电脑

You can take your 24-word seed phrase and enter it into a different computer, and when it is synched, the current Plot NFTs and pool information will be automatically downloaded from the blockchain. All information about your pool, plot NFTs, and smart contract addresses is completely backed up on the blockchain, and can be recovered using the seed phrase.

### 多个密钥

也可以同时使用多个密钥进行耕种，但需谨慎操作。 每个密钥都必须分别同步，如果在计算机A中更改了耕种池，那么您必须在计算机B上同步您的钱包以便分别耕种。 如果计算机B有多个密钥，请确保将每个密钥同步到联合耕种农田的最新状态。

### 联合耕种池手续费

耕种池手续费是耕种池在将奖励分发给农民时收取的一小部分费用。 Each pool can set their own fee structure.

### 区块链手续费

Blockchain fees are paid to the creator of the block (farmers), to incentivize them to include your transaction. If the blockchain is busy, you might have to pay small a small fee to get your transaction included. (Creating a plot NFT and changing pools both require an on-chain transaction.)

### 无效状态

如果进入了无效状态，需要重新加入或再次切换到独自耕种。 这可能发生在耕种池切换操作完成之前关闭GUI的情况下。 请单击"更换联合耕种池"，然后重新输入耕种池网址，或切换到独自耕种。 有时可能需要等待一段时间，直到耕种池切换超时完成。

### 支付地址

区块奖励分为两部分，耕种池部分（总奖励的7/8）和农民部分（总奖励的1/8）。

-   耕种池部分将支付给耕种池，耕种池将根据其支付计划支付给您。 在GUI的“联合耕种”选项卡中可以进行配置：点击联合耕种农田界面右上角的三个点，然后点击“编辑支付地址”。 这也可以在`config.yaml`文件中的pool_list部分下的payout_instructions中进行配置。
-   The farmer portion will go to your farmer target address. 在GUI的“农场”选项卡中可以进行配置，或者在`config.yaml`文件中的farmer.xch_target_address下进行配置。

### 独自耕种

如果是在独自耕种，在获得区块奖励后还需要额外进行奖励的领取。 这可以通过图像界面或命令行完成。 领取奖励没有时间限制，但是如果在切换到其他耕种池之前没有领取奖励，那么新的耕种池将有权利领取这些奖励，您将失去这部分资金。

### 远程收割机

远程收割机（Remote harvesters）的工作方式与以往一样。 它们不需要拥有任何密钥，可以直接在另一台机器上通过使用 `-f` 和 `-c` 参数来生成地块。 农民机器需要 `-f` 参数的私钥，是用来创建联合耕种农田的私钥。 在进行联合耕种时，收割机会更频繁地查找证明，因为难度较低。 现在，可以通过执行 `chia farm summary` 命令来查看远程收割机的地块情况。

### 命令行

Using the CLI, you can perform the same operations as with the GUI. There is a new command, called `chia plotnft`. Type `chia plotnft -h` to see all the available sub-commands:

```
» chia plotnft -h
Usage: chia plotnft [OPTIONS] COMMAND [ARGS]...

Options:
  -h, --help  Show this message and exit.

Commands:
  claim           Claim rewards from a plot NFT
  create          Create a plot NFT
  get_login_link  Create a login link for a pool. To get the launcher id, use
                  plotnft show.

  inspect         Get Detailed plotnft information as JSON
  join            Join a plot NFT to a Pool
  leave           Leave a pool and return to self-farming
  show            Show plotnft information
```

To create a Plot NFT, run:

```bash
chia plotnft create -u <https://poolnamehere.com>
```

Be sure to change `<https://poolnamehere.com>` to the URL of the pool you want to use.

To create a plot NFT in self-farming mode, run:

```bash
chia plotnft create -s local
```

To switch pools, you can run:

```bash
chia plotnft join
```

To leave a pool (switch to self farming), run:

```bash
chia plotnft leave
```

To view the status of your Plot NFT, run:

```bash
chia plotnft show
```

---

## Pooling FAQ

### 什么是联合耕种农田？

一个联合耕种农田（plot NFT）是区块链上的智能币或代币，允许用户管理他们在耕种池中的成员资格。 Users can assign the plot NFT to any pool they want, at any point. 在生成地块时，可以选择一个农田，并且该地块将永远与该农田绑定在一起。 农田是“非同质化”的，因为它们不可互换；每个农田代表一个独特的耕种池合约。

### 需要支付XCH来创建联合耕种农田或切换耕种池吗？

Each plot NFT you create will require 1 mojo (1 trillionth of a XCH) + transaction fee. 切换耕种池只需要支付交易手续费。 如果您没有任何XCH，可以从Chia的官方水龙头获得100个mojo：https://faucet.chia.net/

### 可以同时在旧土地和新地块上耕种吗？

是的。 农民可以在一台机器上同时耕种旧土地和新地块。 旧地块不会受到创建的联合耕种农田或新地块的任何影响。

### 如何新地块分配给一个耕种池？

首先，在图形用户界面（GUI）的新的联合耕种选项卡中创建一个“联合耕种农田”（开发者在其代码中称其为“singleton”）。 当生成一个新的联合耕种地块时，必须为其分配一个特定的“联合耕种农田”（对于使用命令行界面（CLI）的用户，这将取代“Pool Public Key”参数“-p”为“Pool Contract Address”参数“-c”）。 所有使用相同“联合耕种农田”生成的地块都可以分配到同一个耕种池进行耕种。 可以在同一密钥上拥有多个“联合耕种农田”。

### 在Chia的图形用户界面（GUI）和命令行界面（CLI）中，“Key”（密钥）和“Wallet”（钱包）之间有什么区别？

一个用户可以在运行Chia的机器上拥有一个或多个密钥。 密钥由私有信息（24个单词）和称为`指纹(fingerprint)`的公共标识符表示。 在使用GUI或CLI时，一次只能登录一个密钥。 每个密钥必须单独同步，可以通过点击“钱包”选项卡来检查它是否同步。 每个密钥还可以关联1个或多个钱包。 标准钱包默认创建，它控制您的Chia。 还可以根据需要创建任意数量的联合耕种农田，它们也是钱包，每个都有自己的“钱包ID”，并且它们与您用于创建它们的密钥绑定。 在CLI中，同时使用`指纹(fingerprint)`和`钱包ID（wallet_id）`对联合耕种农田执行操作，这代表了该联合耕种农田的密钥和钱包ID。

### Chia耕种池（pooling）与其他加密货币的不同之处在哪里？

Chia has three major differences from most other crypto pooling protocol:
1. Joining pools is permissionless. 在加入之前不需要在耕种池(矿池)服务器上注册账户。
2. Farmers receive 1/8 of the block reward plus transaction fees, while the pool receives 7/8 of the reward to redistribute (minus pool fees) amongst all pool participants.
3. The farmer with the winning proof will farm the block, not the pool server.

### 如何搭建一个自己的耕种池？

如果您有编写其他加密货币的矿池（耕种池）服务器代码的经验，那么将该矿池代码与Chia的参考耕种池代码进行适配将会比较简单。 我们强烈建议只有拥有良好的操作安全性（OPSEC）和商业经验的人运行公共矿池服务器。 根据您运营矿池业务的国家，您可能需要遵守特定司法管辖区的税收、反洗钱（AML）和了解您的客户（KYC）法律。 由于XCH的盈利能力，所有矿池都将成为黑客攻击的目标，如果您遭受任何损失，您可能会面临法律责任。

### 在哪里可以找到Chia耕种池列表？

一个加密货币社区网站列出了所有即将推出的Chia耕种池：https://miningpoolstats.stream/chia

### 我可以在Discord上宣传我的耕种池吗？

您只能在Discord的#Promote-community-projects频道中每天宣传您的耕种池一次。 如果您频繁发送广告或垃圾信息，管理员会警告您，并且如果您继续这样做，可能会将您禁止。

### 为什么Chia不运营自己的官方耕种池？

我们希望有一个健康的、相互竞争且没有官方特权耕种池生态。

### 我可以将我的耕种池命名为chiapool.com吗？

我们不允许耕种池使用"Chia"作为首个词或其等价词（比如"Chia矿池"）。 不过，可以使用类似"一个Chia耕种池"的表述，尽管这可能需要一个免费且易于获取的许可证。 请访问https://www.chia.net/terms/ 了解更多关于获取许可证的信息。

### 如果一个耕种池获得了整个网络51%的算力，他们是否能够接管整个网络？

答案是否定的，Chia的耕种池（矿池）协议被设计成由个体农民（farmer）来产生区块，但耕种池的奖励会进入耕种池操作者的钱包。 这确保即使一个耕种池拥有51%的网络算力，他们也必须控制所有具有51%网络算力的农民节点，才能进行任何恶意活动。 这将非常困难，除非所有具有51%网络算力的农民都下载了由像Bram一样高水平天才编程的恶意Chia客户端。

### 我还有很多疑问，应该在哪里进行提问？

加入我们专属的[Discord](https://discord.gg/chia)吧！

友情提醒：请不要在Discord中使用`@`提及或直接私信（DM）开发者或管理员。 只需在Discord中发布您的问题，我们会在有空的时候回答您的问题。

## 技术类常见问题解答

### 我在哪里可以查看Chia耕种池参考代码？

可以在这里找到它：https://github.com/Chia-Network/pool-reference。 README文件中包含了它的工作原理说明，而规范文件则包含了实现细节的详细说明。

### 参考耕种池代码使用哪种编程语言编写的？

Python

### 将Chia的参考耕种池（矿池）代码添加到我现有矿池代码有多难？

如果您之前已经编写过矿池代码，那么参考耕种池（矿池）代码将会很容易理解。 只需要将PoW的概念替换为Chia的通过PoST评估每个农民参与度的方法，并且适应使用Chia的智能合约来收集和分配XCH，这就是主要的工作。

### 作为一名程序员，虽然之前没有编写过矿池代码，但使用Chia的参考耕种池（矿池）代码，是否能够运行一个耕种池呢？

如果这是您第一次编写矿池代码，我们建议您查看已建立的比特币（BTC）或以太坊（ETH）矿池的源代码以及它们为用户提供的功能。 您可能会面对来自这些加密货币社区的大型矿池运营商的竞争，他们将在Chia上推出功能丰富的矿池。 例如，排行榜、钱包浏览器、随机奖励、分层矿池费用等。

### 耕种池（矿池）代码中使用的变量名称

-   puzzle_hash: 一个地址（address），但是以不同的格式呈现。 地址是易于阅读的。
-   singleton: 一个智能硬币（合约），保证是唯一的，并由用户控制。
-   launcher_id: singleton的唯一标识
-   points: 积分（points）表示农民所完成的工作量。 它是通过提交的证明数量按难度加权计算得出的。 一个k32地块每天可以10个积分（points）。 要累积1000积分，需要在一天内完成 10 TiB 的耕种量。 这相当于PoW矿池中的份额。

### How does one calculate a farmer's space?

A farmer's space can be estimated by the number of points submitted over each unit of time, or points/second. 每个k32地块平均每天获得10个积分（points）。 所以每个地块的算力为 `10 / 86400 = 0.0001157 points/second`。 Per byte, that is `L = 0.0001157 / 108884400275 = 1.06259482265 * 10^-15`. To calculate total space `S`, take the total number of points found `P`, and the time period in seconds `T` and do `S = P / (L*T)`.  
For example for 340 points in 6 hours, use `P=340, T=21600, L=1.06259482265e-15`, `S = 340/(21600*1.06259482265e-15) = 14,813,492,786,900 bytes`. Dividing by `1024^4` we get `13.4727932044 TiB`.

:::info

Note that this calculation is based on the new constant space factor estimation of 0.78005, as detailed in the [space factor table](/k-sizes#new-constant-space-factor).

:::

### How does difficulty affect farmer's space calculation?

随着难度的增加，农民进行的查找次数减少，找到的证明（proof）数量也减少，但每个单位时间内收到的积分（points） 数量不会增加。 想象一下这种情况：在难度为1的情况下，每个k32地块每天获得 10个证明（proof），而在难度为 10 的情况下，每天只能获得1个证明（proof）。 作为一个矿池服务器，您更喜欢每个k32地块每天获得难度为10的1个证明（proof）。 This is why we allow pool servers to set a minimum difficulty level to reduce the number of proofs each farmer needs to send to prove their space.

### 如何识别提交了部分证明（partial proofs）的农民？

农民将提供他们的 "launcher_id"，这是该农民所属联合耕种农田（矿池组）的ID。 同时，耕种池还会验证存储空间的证明和农民的签名，以确保只有真正的农民能够获得奖励。

### 耕种池服务器是否需要跟踪所有农民及其奖励份额？

是的，耕种池操作者需要编写代码来跟踪所有农民及其奖励份额。 Chia的耕种池协议假设加入耕种池不需要注册，因此每个提交有效部分证明的 "launcher_id" 都需要被耕种池服务器进行跟踪。

### 单例（singleton）可以执行哪些操作？

对于单例，有一些操作可以执行：

-   更改耕种池（需要拥有者的签名）
-   退出耕种池，这是宣布您将更改耕种池（需要拥有者的签名）
-   领取奖励（不需要任何签名，奖励将发送到单例中指定的地址）

### How do pools collect rewards?

-   农民加入矿池后，他们会将自己的单例（singleton）分配给矿池的拼图哈希（pool_puzzle_hash）。
-   当农民赢得一个区块时，矿池奖励将被发送到p2_singleton_puzzle_hash（农民单例的拼图哈希）。
-   矿池将扫描区块链，查找发送给农民单例的新奖励。
-   矿池将向获胜的农民单例发送奖励认领请求。
-   农民单例将发送耕种池奖励部分XCH到pool_puzzle_hash（矿池拼图哈希）。
-   矿池将定期分发奖励给具有积分（points）的农民。

### 如何判断服务器是否从特定客户端收到足够的部分证明（partials）？

耕种池只知道收到的部分证明数量，并不知道农民的确切总算力。 算力可以通过以下方法计算：每个k32地块在主网上平均每天可以获得10 个积分（points）。 这意味着如果难度设置为 1，那么每天会收到 10 个部分证明（partials）；如果难度设置为 10，则每个k32地块每天会收到 1 个部分证明。

### 为什么我在测试网上收到的积分（points）比在主网上多？

每个k32地块每天获得10个积分（points）的规则仅适用于 `DIFFICULTY_CONSTANT_FACTOR` 为 2^67 的主网。 要计算测试网上每个k32地块每天获得的积分数量，需要将 2^67 除以测试网 `config.yaml` 中的 `DIFFICULTY_CONSTANT_FACTOR`，然后乘以10。 这样可以轻松地使用k25s参与测试网。

### k32和k25之间的预期比例是多少？

请查看此代码库中的 `win_simulation.py` 文件。 该文件使用 `chia-blockchain` 中的 `_expected_plot_size` 函数，该函数使用公式 `((2 * k) + 1) * (2 ** (k - 1))` 来计算 plot 大小。将您的 k 值代入公式并进行计算即可得到预期的 k32 和 k25 之间的比例。 将 k 值代入公式并进行计算。

### 如何计算在Z时间内，具有Y大小的地块在X难度下可以获得多少个部分证明（partials）？

请查看 `win_simulation.py` 文件。

### 我可以在主网上使用测试网的联合耕种地块吗？

不能，只能在主网上使用为主网创建的地块，在测试网上使用为测试网创建的地块。

### 这是否意味着Chia的分叉（forks）不能使用这些联合耕种地块？

Chia的分叉可以通过向农民目标地址发送1.75 XCH（Chia币）来轻松使用这些联合耕种地块，从而使得它们变成独自耕种的地块。 如果备用区块链也想使用联合耕种，他们需要创建一笔特殊的交易，通过提供`launcher_id`和launcher spend（包括所有者签名）来“预留”一个单例（singleton）。 然后，代码可以自动将该单例分配给提交它的用户。

### 联合耕种池是否支持其他区块链矿池中使用的各种支付方式？

一般而言，是的，因为支付系统是由耕种池（矿池）运营者管理的，而不是由区块链管理的。 我们建议对这个领域不熟悉的耕种池（矿池）运营者选择较为稳健的支付方式，比如PPLNS（基于上次提交的部分证明数的支付方式）。 然而在技术层面上，您可以利用任何支付系统，因为代码是由您管理的（这是在您广泛扩展参考代码或从头开始构建自己的耕种池（矿池）时假定的）。 但是，如果您选择像FPPS（固定支付量与算力奖励相关）/PPS（按提交的部分证明数来支付）等支付方式，您需要意识到可能存在“死权重”攻击的风险（这在其他区块链协议上也可能发生）。 恶意参与者可能会牺牲大量收益来损害您耕种池（矿池）的方差比率，导致您的耕种池（矿池）运行亏损。 因此，我们建议不要使用FPPS/PPS系统，除非您具有丰富的耕种池（矿池）运营经验，并知道如何构建应对措施以确保您的耕种池（矿池）稳定应对方差风险。

### 矿池服务器需要支持Chia客户端的API方法有哪些呢？

矿池需要支持几种API方法。 这些API方法在这里有详细的文档说明：https://github.com/Chia-Network/pool-reference/blob/main/SPECIFICATION.md

### 在哪里观看关于Chia耕种池（矿池）技术问答视频呢？

For those interested in the Chia Pools for Pool Operators video and presentation, you can find it here:
- https://youtu.be/XzSZwxowPzw
- https://www.chia.net/assets/presentations/2021-06-02_Pooling_for_Pool_Operators.pdf
