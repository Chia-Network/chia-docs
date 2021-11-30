---
sidebar_position: 2
---

# 1.2 加密货币简介

> Intro to Cryptocurrencies

什么是加密货币？可以将加密货币系统视为不受任何实体（如银行、公司或政府）控制的支付和金融基础设施。这与比特币之前金融系统的运作方式有着根本的不同，在比特币之前，总是有一个运营商控制交易包容性、货币政策，并且是一个集中的故障点。

加密货币使用巧妙的密码学、数学和货币激励来创建一个系统，在该系统中，称为农民或矿工的人可以获得报酬来运行该系统，并且没有可以被恶意行为者取消的中央控制点。

这带来了许多好处，其中一些是：
- **无参与要求**，如身份证、银行账户或国籍。任何人都可以参与新的加密经济。
- **抗审查**：审查是困难的或不可能的，任何人都可以随时进行交易、发送任何金额或运行任何程序。
- **独立的货币政策**：可以创建不依赖于一个集团或一个国家的决定的新货币，而是可以基于算法或固定供应。
- **不可阻挡的应用程序**：为安全区块链开发并在其上运行的程序永远无法更改或停止。该程序本身可以拥有资金并进行金融交易。代码本身可以自主运行，不依赖于人工操作。其中一些包括：其他资产的代币化、NFT、贷款、汇款、身份钱包等。
- **全球标准**：通过加密，不同国家和地区可以在一个共享标准上进行交互和交易，该标准明确记录、完全开源且免费提供。不同的各方可以聚集在一起使用一个中立的平台，这降低了建立在加密货币之上的人的成本。
- **安全**：拥有一百万个节点的系统更难被攻击者攻破，包括虚拟和物理黑客、贿赂、网络问题等。

<details>
<summary>原文参考</summary>

What is a cryptocurrency? A cryptocurrency system can be thought of as a payments and financial
infrastructure that is not controlled by any one entity, like a bank, company, or government. This is fundamentally
different to how financial systems worked before Bitcoin, where there was always an operator that had control of 
transaction inclusion, monetary policy, and was a centralized point of failure.

Cryptocurrencies use clever cryptography, mathematics, and monetary incentives to create a system where people called
farmers or miners get paid to run the system, and there is no central point of control that can be taken down by 
malicious actors.

This brings many benefits, some of which are:
- **No requirements to participate**, like ID, bank account, or nationality. Anyone can participate in the new 
 crypto economy.
- **Censorship resistance**: censorship is difficult or impossible, anyone is allowed to transact, and to send
any amount or run any program at any time.
- **Independent monetary policy**: new currencies can be created that do not depend on the decisions by one group or one 
 country, and instead can be based on algorithms or have fixed supply.
- **Unstoppable applications**: an program developed for and run on a secure blockchain can never be changed or stopped. The program
 itself can own funds and perform financial transactions. Code itself can run autonomously, without depending on
a human operator. Some of these include: tokenization of other assets, NFTs, loans, remittances, identity wallets, etc.
- **Global standards**: through crypto, different countries and regions can interact and transact on one shared
standard, that is clearly documented, fully open source, and available for free. Different parties can come together
 to use a neutral platform, which reduces costs for those who build on top of the cryptocurrency.
- **Security**: a system with a million nodes is much more difficult to take down by attackers, including virtual and physical
hacks, bribery, network issues, etc.

</details>

## 加密货币如何运作？

要了解像比特币或 Chia 这样的加密货币如何工作的基础知识，我们首先需要了解如何从头开始设计加密货币。 本节针对区块链行业的新手； 其他人可以跳过它。
 
当然，我们可以只依赖一个中央服务器，它有一个公共 API 来发送交易（接受用户名和密码）和一个公共 API 来读取数据。
但是，这不是去中心化的，并且不会带来上述大部分好处。 这是在比特币之前运作的许多金融系统。 那么我们如何设计一个不依赖任何一方的交易系统呢？

![](/img/crypto01.png)

<details>
<summary>原文参考</summary>
 
- ## How do cryptocurrencies work?

To understand the basics of how a cryptocurrency like Bitcoin or Chia works, we first need to look at how one would design a cryptocurrency
from scratch. This section is targeted toward those new to the blockchain industry; others can skip it.
 
Of course, we could just rely on a central server which has a public API to send transactions 
(which takes in a username and password) and a public API for reading data. 
However, this is not decentralized, and does not bring most of the benefits above. This is many financial systems worked
before Bitcoin. So how would we design a transaction system which does not depend on any one party?
 
![](/img/crypto01.png)
 
</details>

### 验证

首先，我们需要一种以安全的方式将交易发送到多个服务器而不是一个服务器的方法。 假设全球有1000台服务器，而不是只有一台，这些服务器相互发送用户的交易信息。
假设这些服务器由不同的实体（公司、人员等）运行。
用户名和密码在去中心化模型中不起作用，因为每个服务器都需要知道密码才能验证交易是否有效，这是非常不安全的。

![](/img/crypto02.png)

在这里，我们可以改用由 Hellman、Merkle 和 Diffie 发明的公钥密码术。 用户 Alice 维护一个秘密密钥（也称为私钥）`sk_a` 和一个公钥 `pk_a`。 公钥发布在
她的余额旁边的区块链，假设是 1 BTC。 为了花掉那 1 个比特币，她需要提供一个带有她的私钥的签名。 签名只能使用公钥和消息进行验证，并且特定于正在签名的数据。 因此，运行去中心化系统的所有服务器都可以接受交易，其中包括正在发送的硬币的 ID、收件人信息和签名。 数字签名是加密货币的基本构建块。

![](/img/crypto03.png)

<details>
<summary>原文参考</summary>
 
- ### Authentication

First, we need a way to send transactions to many servers instead of one, in a secure way. Let's assume that there are 1000
servers across the world, instead of just one, and these servers send transaction information of users to each other. 
These servers are assumed to be run by different entities (companies, people, etc).
Username and passwords would not work in a decentralized model, because every server would need to know the password in order to verify that
 the transaction is valid, and this is extremely insecure. 

![](/img/crypto02.png)

Here we can use public key cryptography instead, invented by Hellman, Merkle, and Diffie. A user Alice
maintains a secret key (also called a private key) `sk_a`, and a public key `pk_a`. The public key is posted on the
blockchain next to her balance, let's say 1 BTC. In order to spend that 1 BTC, she needs to provide a signature
with her private key. The signature can be verified with the public key and message only, and is specific to the data that is being
signed. So, all the servers running the decentralized system can accept a transaction, which includes the ID of the
coin that is being sent, the recipient information, and the signature. Digital signatures are fundamental building blocks for cryptocurrencies. 

![](/img/crypto03.png)

</details>

 
### 双花

然而，签名是不够的，因为有一个叫做“双花问题”的问题。在 1000 台服务器中，假设 500 台在亚洲，500 台在美国。攻击者 Bob 将花费相同硬币的两笔交易同时发送到两台服务器：一台在亚洲，另一台在美国。但是，这些交易会将钱发送给不同的收件人。
在这种情况下，两个服务器需要就哪个事务先发生达成一致，否则它们将出现发散状态，系统将无法达成全局共识。为了解决这个问题，我们需要一种共识算法，或者一种让系统中所有计算机快速就交易的顺序和内容达成明确一致的方法。

既然我们正在尝试创建一个全球去中心化和安全的系统，为什么不让每个人投一票，然后将投票加起来来决定交易顺序？如果可能的话，这会很棒，但不幸的是，它需要某种类型的中央政党来决定谁是“人”，并创建这些身份，这将使系统集中化。

我们可以改为基于“一台计算机一票”的系统，并通过 IP 地址识别计算机。这也是不安全的，因为可以购买甚至伪造 IP 地址。攻击者可以创建数百万个假 IP 地址并控制系统，以决定交易顺序和内容。再次，系统变得集中。

使解决双花变得困难的关键问题是女巫攻击。女巫攻击是指攻击者以低成本创建大量虚假身份，从而控制系统。这就是大多数“X 证明”区块链不安全的原因；在系统的根部，有一种创建新身份的廉价方法。

中本聪的天才是通过要求（可通过计算机验证）现实生活中的工作来解决双花问题，以获得“投票”，并决定共识。这被称为工作证明。所有计算机都反复尝试使用一些随机输入生成加密散列，直到它们得到一个幸运数字，这需要在散列的开头有一定数量的零。在比特币中，这种情况在全球每 10 分钟发生一次，并且所需的零数量会自动调整，以便始终每 10 分钟发生一次。当获胜者被选中时，他们有权生成一个“区块”，这是一个有效交易的列表。所有节点都需要接受新块，作为区块链中的最新块。因此，解决了双花问题，因为在任何时候只有一台计算机可以创建一个块。女巫问题解决了，因为创建一个块需要真实的硬件和真实世界的投资。

![](/img/crypto04.png)

<details>
 <summary>原文参考</summary>
 
- ### Double Spending
However, signatures are not enough, because of an issue called the "double spend problem". Of the 1000 servers, let's say 
500 are in Asia and 500 are in America. An attacker, Bob, sends two transactions that spend the same coin, to two servers,
at the same time: one in Asia and one in America. However, those transactions send the money to different recipients. 
In this case, the two servers need to come to agreement on which transaction came first, otherwise they will have
diverging state, and the system will not have global consensus. To solve this issue, we need a consensus algorithm, or a way for
all computers in the system to quickly come to unambiguous agreement on the ordering and content of transactions.

Since we are trying to create a globally decentralized and secure system, why not allow each person one vote, and add up
votes for deciding transaction ordering? This would be great if it was possible, but it unfortunately requires some type
of central party deciding who is a "person", and creating these identities, which would make the system centralized.

We could instead base the system on "one computer one vote", and identify computers by their IP addresses. This is also
insecure, since IP addresses can be bought, and even faked. An attacker could create millions of fake IP addresses and
take control of the system, to decide transaction ordering and content. Again, the system becomes centralized.

The key issue that makes solving double spend difficult, is the Sybil Attack. A sybil attack is when an attacker
creates a large amount of fake identities at a low cost, and therefore takes control of the system. This is why most
"Proof of X" blockchains are not secure; at the root of the system, there is a cheap way to create new identities.

The genius of Satoshi Nakamoto was to solve the double spend issue by requiring (verifiable by a computer) real life work in order to obtain "votes",
and to decide consensus.  This is known as proof of work. All computers try over and over to generate cryptographic hashes
with some random input, until they get a lucky number, which requires a certain number of zeroes at the beginning of the
hash. This happens once every 10 minutes globally in Bitcoin, and the number of zeroes required is automatically
adjusted so that it's always once per 10 minutes. When the winner is chosen, they get the right to generate a "block",
which is a list of valid transactions. All nodes are required to accept the new block, as the most recent block
in the blockchain. Therefore, the double spend problem is solved, because only one computer can 
create a block at any one time. The sybil problem is solved, because creating a block requires real hardware and 
real world investment.

![](/img/crypto04.png)

</details>


### 区块链

区块链中的每个区块都包含一个交易列表。一旦交易位于具有所需工作证明的区块内，则称该交易被“确认”。网络中的每个节点称为全节点，与其他一些随机节点保持活动连接，并向其所有对等节点广播交易。如果用户想要进行交易，他们会将其发送到网络中的任何节点，由谁将其广播给他们的对等方等，从而导致每个人都知道该交易并将其保存在内存中，直到得到确认。这称为内存池。在选择要包含在区块中的交易时，矿工或农民最有可能选择向矿工支付最多费用的交易，因此创建了交易费用市场，其中供应量是总 TPS（每秒交易数）系统支持，需求基于用户向系统提交交易。

区块链交易还可以包括脚本或程序，允许直接用代码控制资金。该代码可以要求一定数量的签名来释放资金，或者具有任意逻辑。然而，区块链程序的运行成本很高，因为系统中的每个节点都必须下载并运行程序。

每个区块还有一个指向前一个区块的哈希指针，这意味着前一个区块内容的哈希值包含在当前区块中。这意味着为了恢复过去发生 10 个区块的交易，攻击者必须重新做 10 个区块的工作量证明。比特币网络每秒执行大约 170 quintillion 哈希。所以这对于算力低于 51% 的攻击者来说是不切实际的，因为当他们完成这 10 个块时，其余节点将添加更多块。

![](/img/crypto05.png)


<details>
 <summary>原文参考</summary>
 
- ### Blockchain
Each block in the blockchain contains a list of transactions. A transaction is said to be "confirmed" once it is inside 
a block which has the required proof of work. Each node in the network, called a full node, maintains active connections
with a few other random nodes, and broadcasts transactions to all of its peers. If a user wants to make a transaction,
they send it to any node in the network, who broadcasts it to their peers, etc, leading to everyone knowing the 
transaction and saving it in memory, until it is confirmed. This is called the mempool. When choosing which transactions
to include in a block, a miner or farmer will most likely choose the ones that pay the most fee to the miner, and therefore
a transaction fee market is created, where the supply is the total TPS (transactions per second) that the system supports,
and the demand is based on users submitting transactions to the system.

Blockchain transactions can also include scripts or programs, which allow controlling funds directly with code.
This code can require a certain number of signatures to release the funds, or have any arbitrary logic. However,
blockchain programs are expensive to run, since every node in the system must download and run the program.

Each block also has a hash pointer to the previous block, which means the hash of the contents of the previous block,
are included in the current block. This means that in order to revert a transaction that happened 10 blocks in the past,
an attacker would have to re-do the proof of work for 10 blocks. The Bitcoin network performs around 170 quintillion 
hashes per second. so this is not practical for attackers with less than 51% of the hashpower, since by the time they
finish those 10 blocks, the rest of the nodes will have added more blocks.

![](/img/crypto05.png)

</details>

### 超越工作量证明

自比特币和工作量证明区块链诞生以来，已经过去了十多年。 前两个区块链的能源消耗，以及顶级矿工/矿池的中心化程度，促使人们研究新的替代方案。现在已经开发了许多抗女巫共识模型，其中一些将权力下放至不同级别。
股权证明（用区块链资产投票）是最流行的方法之一，在这一类别中有许多类型的算法。 Chia 采取了另一种方法，我们认为这种方法可能比股权证明（即空间证明）更加分散和易于访问。 在这个模型中，Sybil 抵抗机制将大文件存储在硬盘驱动器中，并将“彩票”存储在这些文件中。 这已被证明可供普通用户访问，无需任何特殊硬件，同时保持中本聪工作量证明的大部分安全属性。

<details>
 <summary>原文参考</summary>
 
- ### Beyond Proof of Work
Over a decade has passed since the creation of Bitcoin and Proof of Work blockchains. The energy expenditure of the top
two blockchains, and the degree of centralization of the top miners/pools have caused people to research new alternatives.
Many sybil-resistant consensus models have now been developed, some which compromise decentralization to different levels.
Proof of Stake (voting with blockchain assets) is one of the most popular approaches, 
and within this category there are many types of algorithms. 
Chia takes an alternate approach, which we think is likely to be more decentralized and accessible than Proof of Stake,
which is Proof of Space. In this model, the Sybil resistant mechanism is storing large files in hard drives, and storing
the "lottery tickets" within those files. This has been shown to be accessible to normal users without any special hardware,
while maintaining most of the security properties of Nakamoto's Proof of Work.

 </details>
 
[1] https://cs.stanford.edu/people/eroberts/courses/soco/projects/public-key-cryptography/history.html#:~:text=The%20idea%20of%20public%20key,known%20as%20the%20knapsack%20problem.
