---
title: 使用 GUI
slug: /using-thugui
---

## 正在设置事件

使用图形用户界面(GUI)就很容易从Chia入手。 在打开和选择钱包或耕作模式时，你将被赋予创建密钥的能力。 每个密钥都是一个24个订购单词种子短语，用于控制你的钱包。 **不要与任何人分享您的24个单词**。

<p align="center">
    <img alt='选择密钥' src="/img/select-key.png" width="500" align="center"/>
</p>

You will also be given the option to use the Chia GUI in **farming mode** or **wallet mode**. 我们将从耕作模式开始。 如果您已经选择了钱包模式，请不要担心，因为它可以在设置中轻松更改(以及暗色模式和语言选择)。

## 设置

在我们获得有趣的东西之前，让我们看看你想要正确使用Chia的设置。

首先，这里是你如何在耕作和钱包模式之间切换。

<p align='center'>
  <img alt='设置' src='/img/settings.png' width='300' />
</p>

在设置的底部，您会看到设置密码的选项。 这是一个额外的安全层，需要密码来访问Chia客户端。

:::警告
启用密码是保护您资金的一个推荐步骤，但它只保护您本地的 Chia 客户端。 这可能会阻止某人在您离开您的桌面时偷走您的资金， 但如果有人获得您的24个单词，就不会保护您的资金。
:::

## 正在同步

打开Chia后，您的客户端将需要同步。 您需要在上角看到 **同步的** 状态，然后才能看到您拥有的任何令牌。

<p align='center'>
  <img alt='已同步' src='/img/synced.png' width='300' />
</p>

Chia区块链上的所有交易都被添加到区块中。 这些块按顺序下载为您的客户端同步。 如果有人向您发送了Chia(或Chia区块链上的任何其他令牌)， 您的节点不知道交易是否存在，直到您已经同步过该方块。

## 令牌

Chia网络的主要加密货币是Chia(XCH)。 这是用来在钱包之间发送值，并用来支付手续费，以确保交易通过。 除了Chia，我们还有令牌，它们是建立在Chia区块链顶部的加密货币。 这些代币称为CATs (Chia资产代币)。

当您第一次打开令牌标签时，它将看起来这样：

<p align='center'>
  <img alt='代币标签页' src='/img/tokens-tab.png' width='700' />
</p>

我们没有任何Chia，也没有标记。 您可以在 **管理令牌列表** 部分中看到可以获取的其他令牌列表。

<p align='center'>
  <img alt='令牌' src='/img/tokens.png' width='300' />
</p>

所有这些都是可以以与Chia相同的方式接收的标记，但是它们将具有独特的数量、用途和价值。 Chia和任意CAT都可以发送到您的 **接收地址**。 你的钱包将有多个接收地址，因此这个值可能会改变。

<p align='center'>
  <img alt='接收地址' src='/img/receive-address.png' width='600' />
</p>

此外，您可以向任何其他地址发送代币。

<p align='center'>
  <img alt='正在发送 XCH' src='/img/send-xch.png' width='600' />
</p>

发送交易后，它将广播到网络中的完整节点。 这笔费用将有助于将您的交易推到区块链，因为它已经到达一个完整的节点池。 农民不仅可以获得区块奖励，而且还可以获得交易费，因此交易费优先进行。 我们建议的费用至少为 .000005 XCH。

## 耕作和耕作。

当你在耕作模式下启动图形界面时，你会给你一个 **完整的节点** 标签。 这将概括您的同步状态、最近的模块和Chia区块链的总体统计信息。

<p align='center'>
  <img alt='完整节点' src='/img/full-node.png' width='800' />
</p>

您可以从 **绘图** 标签页创建绘图。 默认情况下，您将拥有一个收获器(计算机)耕种，没有土地。

<p align='center'>
  <img alt='地皮图' src='/img/plots.png' width='800' />
</p>

您可以从此选项卡或农作选项卡添加一个地图。

<p align='center'>
  <img alt='农业' src='/img/farming.png' width='800' />
</p>

### 您的第一张图

让我们继续添加一块地皮！

<p align='center'>
  <img alt='添加一个绘图' src='/img/add-a-plot.png' width='1000' />
</p>

我推荐 **madMAx Plotter** 作为所选择的绘图软件。 这使您能够轻松地在序列中创建小块，而不需要很多设置。 仅创建一个绘图即可关闭。 一旦您了解它是如何工作的，您就可以创建更多了。 如果您想要创建许多绘图，了解 [SSD 耐久性](/ssd-endurance) 是很重要的。

创建绘图时，你赋予了加入池的选项。 这是推荐的方式(即使您选择 _自池_)。 随着Chia独特的集合方式，在网络分散化方面没有牺牲，农业奖励是一致的。 为了使集合工作完成，您创建了与绘图NFT相关联的地皮。 这是一个独特的令牌来控制您对任何集合的会员资格。

<p align='center'>
  <img alt='共享' src='/img/pooling.png' width='500' />
</p>

### 创建绘图NFT

创建绘图NFT是区块链上的一项交易，需要少量(免费)的Chia，可以从 [faucet](https://faucet.chia.net) 中检索。

<p align='center'>
  <img alt='加入游泳池动物群中' src='/img/join-a-pool-faucet.png' width='500' />
</p>

这将把你带到官方的动物群，允许你粘贴你的地址并发送一些Chia。

<p align='center'>
  <img alt='faucet' src='/img/faucet.png' width='500' />
</p>

如果一切都做得正确，你应该得到确认。

<p align='center'>
  <img alt='已接受 faucet' src='/img/faucet-accepted.png' width='500' />
</p>

:::info
你需要同步你的钱包才能看到免费的 XCH 或创建绘图的 NFT 。

绘制NFT与下一节讨论的标准NFT截然不同。
:::

## NFTs

NFT是不可互换的代币(每个代币都是唯一的)，并且在Chia中本质上得到支持。

在第一次打开您的 NFT时，您只会收到一条消息来开始收集NFT。

<p align='center'>
  <img alt='去收集一些宝石。' src='/img/nfts.png' width='800' />
</p>

获取NFT的一种方法是在诸如 [Dexie](https://dexie.space/nft) 这样的市场中找到它们。

在下一节中，我们将了解可用于以分散方式购买NFT的报价。

[阅读更多关于 NFTs](https://chialisp.com/nfts) 的信息。

## 报价

当购买NFTs或令牌时，您可能需要为他们提供报价。 要约是一种分散的交换形式。 使用优惠，您可以将一个资产与另一个资产交易给没有中间人。

<p align='center'>
  <img alt='报价单' src='/img/offers.png' width='800' />
</p>

通过使用优惠，您正在接受Chia区块链的分散性质。

[阅读更多关于报价](https://chialisp.com/offers) 的信息。
