---
sidebar_position: 2
---

# 1.2 加密货币简介

> Intro to Cryptocurrencies

可以将加密货币系统理解为不受任何单一实体（例如银行、公司或政府）控制的支付、金融基础设施。 在引入加密货币之前，一直有一个运营商可以控制交易所包含的一切和货币政策。 运营商代表着权利和失利的中心点。

随着 2009 年 1 月 3 日比特币的推出，金融世界发生了根本性的变化。在随后的几年中，人们创建了许多其他加密货币来解决传统金融领域的各种问题。

加密货币使用巧妙的密码学、数学和货币激励创建一个系统，在该系统中，被称为农民或矿工的人可以通过获得报酬来运行该系统，并且没有可以被恶意行为者取消的中央控制点。

这带来了许多好处，其中一些是：
* **无加入要求**：任何有互联网连接的人都可以参与新的加密经济，无论国籍、财富状况、宗教信仰等。
* **抗审查**：很难或完全不可能审查。任何人都可以随时进行交易、发送任何金额或运行任何程序。
* **独立的货币政策**：可以创建不依赖于任何一个组织或一个国家的决策，而是基于算法或具有固定供应量的新货币。
* **不可阻挡的应用程序**：为安全区块链开发并运行的程序永远不会改变或停止。该程序本身可以拥有资金并进行金融交易。代码可以自主运行，不依赖于人工操作。一些区块链应用包括：其他资产的代币化、非同质化代币 (NFT)、贷款、汇款、身份钱包等。
* **全球标准**：通过加密，不同国家和地区可以根据一个明确记录、完全开源且免费的共享标准进行交互和交易。不同的各方可以聚集在一起使用一个中立的平台，这降低了建立在加密货币之上的人工成本。
* **安全**：对任何金融基础设施都存在多种形式的潜在攻击，包括虚拟攻击和物理攻击、贿赂、网络问题等。具有一百万个节点的系统比上述单点故障更难以攻击。

<details>
<summary>原文参考</summary>

- ## What is a cryptocurrency?

A cryptocurrency system can be thought of as a payments and financial infrastructure that is not controlled by any single entity, such as a bank, company, or government. Prior to the introduction of cryptocurrencies, there had always been an operator that had control of transaction inclusion and monetary policy. This operator represented a centralized point of both power and failure.

The financial world was fundamentally changed with the introduction of Bitcoin on January 3, 2009. In the years that have followed, many other cryptocurrencies have been created to solve various problems in the legacy financial realm.

Cryptocurrencies use clever cryptography, mathematics, and monetary incentives to create a system where people called farmers or miners get paid to run the system, and there is no central point of control that can be taken down by malicious actors.

This brings many benefits, some of which are:
- **No requirements to participate**: Anyone with an internet connection can participate in the new crypto economy, regardless of nationality, wealth status, religion, etc.
- **Censorship resistance**: Censorship is difficult or impossible. Anyone is allowed to transact, and to send any amount or run any program at any time.
- **Independent monetary policy**: New currencies can be created that do not depend on decisions made by one group or one country, and instead can be based on algorithms or have a fixed supply.
- **Unstoppable applications**: A program developed for, and run on, a secure blockchain can never be changed or stopped. The program itself can own funds and perform financial transactions. Code can run autonomously, without depending on a human operator. Some blockchain applications include: tokenization of other assets, non-fungible tokens (NFTs), loans, remittances, identity wallets, etc.
- **Global standards**: Through crypto, different countries and regions can interact and transact on one shared standard that is clearly documented, fully open source, and available for free. Different parties can come together to use a neutral platform, which reduces costs for those who build on top of the cryptocurrency.
- **Security**: There are many forms of potential attacks on any financial infrastructure, including virtual and physical hacks, bribery, network issues, etc. A system with a million nodes is much more difficult to attack than the aforementioned single point of failure.

</details>

## 加密货币如何运作？

要了解像比特币或 Chia 这样的加密货币如何工作的基础知识，我们首先需要了解如何从头开始设计加密货币。 本节针对区块链行业的新手，其他人可以跳过它。
 
我们可以依靠一个带有公共 API 的中央服务器来发送交易（需要用户名和密码），一个用于读取数据。然而，这不是去中心化的，它不会带来上述大部分好处，但这却是许多金融系统在比特币出现之前的运作方式。

我们如何设计一个不依赖任何一方的交易系统呢？

![](/img/crypto01.png)

<details>
<summary>原文参考</summary>

- ## How do cryptocurrencies work?

To understand the basics of how a cryptocurrency like Bitcoin or Chia works, we first need to look at how one would design a cryptocurrency
from scratch. This section is targeted toward those new to the blockchain industry; others can skip it.

We could rely on a central server with a public API to send transactions (which takes in a username and password) and a public API for reading data. However, this is not decentralized, and it does not bring most of the benefits above. This is the way in which many financial systems worked before Bitcoin.

How would we design a transaction system which does not depend on any one party?

![](/img/crypto01.png)

</details>

### 验证

首先，我们需要一种安全的方式将交易发送到许多服务器。 假设全球有 1000 台服务器，而不是只有一台，并且这些服务器相互发送用户的交易信息。

假设这些服务器由不同的实体（公司、人员等）运行。 用户名和密码在这种去中心化模型中不起作用，因为每个服务器都需要知道密码才能验证交易是否有效。 这将是非常不安全的。

![](/img/crypto02.png)

相反，我们可以使用由 Hellman、Merkle 和 Diffie 发明的公钥密码术。

例如，名为 Alice 的用户维护着一个秘密密钥（也称为私钥）`sk_a` 和一个公钥 `pk_a`。 公钥发布在她余额旁边的交易中，假设为 1 BTC。 为了花掉那 1 个比特币，她需要用她的私钥提供数字签名。 签名只能使用公钥和消息进行验证，并且特定于正在签名的数据。

在这个去中心化系统中运行的每个服务器都可以接受一笔交易，其中包括正在发送的硬币 ID、收件人信息和签名。

数字签名是加密货币的基本构建块。

![](/img/crypto03.png)

<details>
<summary>原文参考</summary>

- ### Authentication

First, we need a secure way to send transactions to many servers. Let's assume that there are 1000 servers across the world, instead of just one, and that these servers send transaction information of users to each other.

These servers are assumed to be run by different entities (companies, people, etc). Usernames and passwords would not work in this decentralized model, because every server would need to know the password in order to verify that a transaction is valid. This would be extremely insecure. 

![](/img/crypto02.png)

Instead, we can use public key cryptography, invented by Hellman, Merkle, and Diffie.

For example, a user named Alice maintains a secret key (also called a private key) `sk_a`, and a public key `pk_a`. The public key is posted in a transaction next to her balance, let's say 1 BTC. In order to spend that 1 BTC, she needs to provide a digital signature with her private key. The signature can be verified with the public key and message only, and is specific to the data that is being signed.

Each server running in this decentralized system can accept a transaction, which includes the ID of the coin that is being sent, the recipient information, and the signature.

Digital signatures are fundamental building blocks for cryptocurrencies. 

![](/img/crypto03.png)

</details>

### 双重支付

然而，签名是不够的，因为一个叫做“双重支付问题”的问题。在 1000 台服务器中，假设 500 台在亚洲，500 台在美国。攻击者 Bob 将花费相同硬币的两笔交易同时发送到两台服务器：一个在亚洲，一个在美国。这些交易将钱发送给不同的收件人，这是不允许的。

在这种情况下，两个服务器需要就哪个事务先发生达成一致。否则，它们将出现发散状态，系统将无法获得全球共识。为了解决这个问题，我们需要一种共识算法，或者一种让系统中所有计算机快速就交易的顺序和内容达成明确一致的方法。

既然我们正在尝试创建一个全球去中心化和安全的系统，为什么不让每个人投一票，然后将投票加和来决定交易顺序？如果可能的话，这会很棒，但不幸的是，它需要某种类型的中央政党，首先决定谁是“人”，然后创建这些身份，这将使系统集中。

相反，我们可以将系统建立在“一台计算机一票”的基础上，将每个 IP 地址计算为一台“计算机”。但是，购买新 IP 地址、使用 VPN 或代理服务器更改地址是十分容易的。攻击者甚至可以创建数百万个假 IP 地址。一旦攻击者拥有 51% 的地址，他们就可以控制网络。此时，他们可以决定交易顺序和内容。同样，系统变得集中，并可能受到损害。

导致双重支付问题难以解决的关键问题是女巫攻击。女巫攻击是指攻击者以低成本创建大量虚假身份。大多数“X 证明”区块链并不安全，因为如果攻击者创建多个身份，这会给攻击者带来优势。

中本聪的天才之处在于解决了双重支付问题，需要通过现实世界的工作来获得“投票”并决定共识。这种“工作量证明”是可加密验证的，参与的唯一要求是一台计算机和互联网连接。

在工作量证明网络中，参与的每台计算机使用随机输入重复生成加密哈希。这起到了全球彩票的作用，在其中生成哈希，直到一台计算机生成赢家——具有一定数量的前导零的哈希。这被称为工作量证明，因为没有捷径，所以计算机必须通过生成哈希来投入所需数量的计算“工作”。

当找到获胜证明时，发现它的计算机获得在区块链中生成新“区块”的权利。该区块包含指向前一个区块的指针、有效交易列表和获胜哈希。所有节点都需要接受最重的链（需要最多工作的链）。因此，所有节点都会接受新的区块，工作量证明的彩票重新开始。

在比特币的共识算法中，每个证明平均需要 10 分钟来生成。随着越来越多的计算机加入网络，生成证明的平均时间自然会减少。这给我们带来了中本聪的另一个简单而优雅的想法：难度调整。每 2016 个区块（平均两周），工作量证明算法会自动调整找到证明的难度。它通过增加或减少生成的哈希中所需的前导零数量来实现这一点。结果是，无论有多少计算机开始或停止参与工作量证明抽奖，找到证明所需的平均时间始终为 10 分钟。

有了这种共识机制，攻击网络就变得非常困难。如果攻击者想通过创建替代区块链来“重写历史”，他们需要比系统中的诚实参与者更快地创建新区块。由于创建每个区块所需的工作量证明，攻击者需要比网络中所有其他计算机的总和更快地生成哈希。这被称为“51% 攻击”，稍后将在[第 3.14 节](/docs/03consensus/attacks_and_countermeasures "Section 3.14: Attacks and Countermeasures")中进行更详细的讨论。

工作量证明解决了双重支付问题——任何时候只有一台计算机可以创建一个区块。它还解决了女巫问题——创建一个区块不仅需要对硬件进行实际投资，而且它也不会给创建多个身份的人带来任何好处。每个人有相同的获胜概率，无论他们使用的是一个身份还是一百万个身份。

![](/img/crypto04.png)

<details>
<summary>原文参考</summary>

- ### Double Spending

However, signatures are not enough, because of an issue called the "double spend problem." Of the 1000 servers, let's say 500 are in Asia and 500 are in America. An attacker, Bob, sends two transactions that spend the same coin, to two servers, at the same time: one in Asia and one in America. Those transactions send the money to different recipients, which should not be allowed.

In this case, the two servers need to come to agreement as to which transaction came first. Otherwise, they will have diverging state, and the system will not have global consensus. To solve this issue, we need a consensus algorithm, or a way for all computers in the system to quickly come to unambiguous agreement on the ordering and content of transactions.

Since we are trying to create a globally decentralized and secure system, why not allow each person one vote, and add up votes for deciding transaction ordering? This would be great if it were possible, but it unfortunately requires some type of central party, first to decide who is a "person," and then to create these identities. This would make the system centralized.

We could instead base the system on "one computer, one vote," counting each IP address as a "computer." However, it is trivial to buy new IP addresses, or to change addresses using a VPN or a proxy server. An attacker could even create millions of fake IP addresses. The attacker would gain control of the network once they own 51% of the addresses. At this point, they could decide transaction ordering and content. Again, the system becomes centralized, and possibly compromised.

The key issue that makes it difficult to solve the double-spend problem is the Sybil attack. A Sybil attack is when an attacker creates a large amount of fake identities at a low cost. Most "Proof of X" blockchains are not secure because if an attacker creates multiple identities, this will give the attacker an advantage.

The genius of Satoshi Nakamoto was to solve the double-spend problem by requiring real-world work in order to obtain "votes," and to decide consensus. This "Proof of Work" is cryptographically verifiable. The only requirements for participation are a computer and an internet connection.

In Proof of Work networks, each computer that is participating repeatedly generates cryptographic hashes using random input. This functions as a global lottery, where hashes are generated until one computer generates a winner -- a hash with a certain number of leading zeros. This is known as a _proof of work_ because there are no shortcuts. Computers must put in the required amount of computational "work" by generating hashes.

When a winning proof is found, the computer that discovered it earns the right to generate a new "block" in the blockchain. This block contains a pointer to the previous block, a list of valid transactions, and the winning hash. All nodes are required to accept the heaviest chain (the one which required the most work). Therefore, all nodes will accept the new block, and the proof-of-work lottery begins anew. 

In Bitcoin's consensus algorithm, each proof takes an average of 10 minutes to generate. As more computers join the network, the average amount of time to generate a proof will naturally decrease. This brings us to another of Satoshi's simple and elegant ideas: the difficulty adjustment. Every 2016 blocks (two weeks, on average) the proof-of-work algorithm automatically adjusts how difficult it is to find a proof. It accomplishes this by increasing or decreasing the required number of leading zeros in a generated hash. The result is that the average time required to find a proof will always be 10 minutes, no matter how many computers start or stop participating in the proof-of-work lottery.

With this consensus mechanism in place, attacking the network becomes very difficult. If an attacker wants to "rewrite history" by creating an alternative blockchain, they'll need to create new blocks faster than the honest actors in the system. Because of the proof of work that is required to create each block, the attacker will need to generate hashes faster than all other computers in the network, combined. This is known as a "51% attack" and is discussed in greater detail later [Section 3.14](/docs/03consensus/attacks_and_countermeasures "Section 3.14: Attacks and Countermeasures").

Proof of Work solves the double-spend problem -- only one computer can create a block at any one time. It also solves the Sybil problem -- not only does creating a block require a real-world investment in hardware, but it also gives no advantage to someone who creates multiple identities. This person has the same probability of winning, whether they're using one identity or a million.

![](/img/crypto04.png)

</details>


### 区块链

网络中的每个节点都与其他一些随机节点保持活跃的连接。如果用户想要进行交易，他们会将其发送到网络中的任何节点，该节点会自动将其广播给他们的对等方。因为每个节点都连接到一组唯一的对等点，所以交易很快就会传播到网络中的每个节点。然后节点将交易，包括所有其他未决交易，保存在本地内存中的。这称为 *内存池*。

> 有关 Chia 内存池的更多信息，请参阅 [第 6 节](/docs/06mempool/mempool "Section 6: Chia's Mempool")。

为了让每个节点搜索一个证明，它必须组装一个区块来进行散列。它通过包含来自内存池的交易来做到这一点，并且它很可能会选择支付最高费用的待处理交易。这样就创建了一个交易费用市场，其中供应是系统支持的每秒总交易量 (TPS)，需求基于内存池中的交易数量。一旦交易被包含在具有所需工作证明的块中，则称该交易被“确认”。

区块链交易还可以包括脚本或程序，允许直接用代码控制资金。此代码可能需要一定数量的签名才能释放资金，或者具有任意逻辑。

>请记住，区块链程序的运行成本很高，因为系统中的每个节点都必须下载并运行该程序。仅仅因为它*可以*在区块链上运行，并不意味着它*应该*在一个区块链上运行。

每个块还有一个指向前一个块的哈希指针。这意味着前一个块的内容的哈希值包含在当前块中。如果攻击者可以找到历史区块的替代有效证明，那么该证明将更改该区块的哈希值，这将使下一个区块无效。如果攻击者想要更改过去发生 10 个区块的区块，他们因此需要重新做至少 10 个区块的工作量证明。然而，网络的其余部分将继续创建合法区块，因此在现实中，攻击者可能需要创建的区块远不止 10 个。事实上，只要网络的其余部分结合起来，可以以相同或更快的速度创建区块，攻击者就*永远*无法创建比合法链更长的链。

比特币网络每秒执行大约 170 quintillion (170,000,000,000,000,000,000) 次哈希；攻击者必须至少控制那么多的算力才能进行 51% 的攻击。

![](/img/crypto05.png)

<details>
<summary>原文参考</summary>

- ### Blockchain

Each node in the network maintains active connections with a few other random nodes. If a user wants to make a transaction, they send it to any node in the network, which automatically broadcasts it to their peers. Because each node is connected to a unique set of peers, the transaction quickly gets propagated to every node in the network. The nodes then save the transaction, including all other pending transactions, locally in memory. This is called the _mempool_.

>For more info on Chia's mempool, see [Section 6](/docs/06mempool/mempool "Section 6: Chia's Mempool").

In order for each node to search for a proof, it must assemble a block to hash against. It does this by including transactions from the mempool, and it will most likely choose the pending transactions that pay the highest fee. A transaction fee market is thus created, where the supply is the total transactions per second (TPS) that the system supports, and the demand is based on the number of transactions in the mempool. A transaction is said to be "confirmed" once it is included inside a block which has the required proof of work. 

Blockchain transactions can also include scripts or programs, which allow controlling funds directly with code. This code can require a certain number of signatures to release the funds, or have any arbitrary logic.

>Keep in mind that blockchain programs are expensive to run, since every node in the system must download and run the program. Just because it _can_ be run on a blockchain, doesn't mean that is _should_ be run on one.

Each block also has a hash pointer to the previous block. This means that the hash of the contents of the previous block are included in the current block. If an attacker could find an alternative valid proof for a historical block, the proof would then change that block's hash, which would invalidate the next block. If the attacker wanted to change a block that occurred 10 blocks in the past, they would therefore need to re-do the proof of work for at least 10 blocks. The rest of the network would continue to create legitimate blocks, however, so in reality, the attacker would likely have to create many more than just 10 blocks. In fact, as long as the rest of the network, combined, could create blocks at the same rate or faster, the attacker would _never_ be able to create a chain longer than the legitimate chain.

The Bitcoin network performs around 170 quintillion (170,000,000,000,000,000,000) hashes per second; the attacker would have to control at least that much hashpower to make a 51% attack feasible.

![](/img/crypto05.png)

</details>

### 超越工作量证明

自比特币和工作量证明区块链诞生以来，已经过去了十多年。虽然工作量证明非常安全，但这种安全性是有代价的：每秒产生 170 quintillion 哈希需要大量的能源消耗。最重要的是，在这些系统上运行节点需要专门的硬件，这导致顶级矿工之间的高度集中。

也许最令人不安的是矿池。在某一天，前四或五个比特币池的算力占总算力的一半以上。可以说，对比特币网络最简单的攻击是矿池运营商串通（无论是自愿还是受到威胁），从而使 51% 的攻击变得触手可及。

这些问题促使人们开发替代的女巫抗性共识模型。股权证明（用区块链资产投票）是最流行的方法之一，在这一类别中有许多类型的算法。这些系统倾向于在不同程度上妥协去中心化（以及安全性）。

Chia 采用了一种称为空间和时间证明 (PoST) 的替代方法，我们认为它可能比股权证明更加分散和易于访问。在这个模型中，全节点在硬盘驱动器上存储包含数百万个哈希值的文件（类似于彩票，如上所述）。该模型保持了中本聪工作量证明的安全属性，同时普通用户无需任何特殊硬件即可访问。

<details>
<summary>原文参考</summary>

- ### Beyond Proof of Work

Over a decade has passed since the creation of Bitcoin and Proof of Work blockchains. While Proof of Work is quite secure, that security comes at a cost: a tremendous expenditure of energy is required to generate those 170 quintillion hashes per second. On top of that, specialized hardware is required to run nodes on these systems, which has led to a high degree of centralization among the top miners.

Perhaps most troubling of all are the pools. On a given day, the hashrate of the top four or five Bitcoin pools constitutes over half of the overall hashrate. Arguably, the easiest attack against the Bitcoin network would be for the pool operators to collude (either willingly or under threat), putting a 51% attack well within reach.

These issues have prompted people to develop alternative Sybil-resistant consensus models. Proof of Stake (voting with blockchain assets) is one of the most popular approaches, and within this category there are many types of algorithms. These systems tend to compromise on decentralization (and thus, security) to varying degrees.

Chia takes an alternate approach called _Proofs of Space and Time_ (PoST), which we think is likely to be more decentralized and accessible than Proof of Stake. In this model, full nodes store files full of millions of hashes (akin to lottery tickets, as described above) on hard drives. This model maintains the security properties of Nakamoto's Proof of Work, while remaining accessible to normal users without any special hardware.

</details>
