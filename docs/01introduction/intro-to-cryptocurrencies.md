---
sidebar_position: 2
---

# Intro to Cryptocurrencies

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
any amount or run any program at any time, for very low fees.
- **Independent monetary policy**: new currencies can be created, that do not depend on the decisions by one group or one 
 country, and instead can be based on algorithms or have fixed supply.
- **Unstoppable applications**: an application developed on a secure blockchain can never be changed or stopped. The program
 itself can own funds and perform financial transactions. Code itself can run autonomously, without depending on
a human operator. Some of these include: tokenization of other assets, NFTs, loans, remittances, identity wallets, etc.
- **Global standards**: through crypto, different countries and regions can interact and transact on one shared
standard, that is clearly documented, fully open source, and available for free. Different parties can come together
 to use a neutral platform, which reduces costs for those who build on top of the cryptocurrency.
- **Security**: a system with a million nodes is much more difficult to take down by attackers, including virtual and physical
hacks, bribery, network issues, etc.


## How do cryptocurrencies work?

To understand the basics of how a cryptocurrency like Bitcoin works, we first need to look at how one would design a cryptocurrency
from scratch. This section is targeted toward those new to the blockchain industry; others can skip it.

Of course, we could just rely on a central server which has a public API to send transactions 
(which takes in a username and password) and a public API for reading data. 
However, this is not decentralized, and does not bring most of the benefits above. This is how all systems worked
before Bitcoin. So how would we design a transaction system which does not depend on any one party?

<div style={{textAlign: 'center'}}>
 <img src="/img/crypto01.png" alt="drawing" width="400"/>
</div>

### Authentication

First, we need a way to send transactions to many servers instead of one, in a secure way. Let's assume that there are 1000
servers across the world, instead of just one, and these servers send transaction information of users to each other.
Username and passwords would not work in a decentralized model, because every server would need to know the password in order to verify that
 the transaction is valid, and this is extremely insecure. 

<div style={{textAlign: 'center'}}>
 <img src="/img/crypto02.png" alt="drawing" width="600"/>
</div>

Here we can use public key cryptography instead, invented by Hellman, Merkle, and Diffie. A user Alice
maintains a secret key (also called a private key) `sk_a`, and a public key `pk_a`. The public key is posted on the
blockchain next to her balance, let's say 1 BTC. In order to spend that 1 BTC, she needs to provide a signature
with her private key. The signature can be verified with the public key and message only, and is specific to the data that is being
signed. So, all the servers running the decentralized system can accept a transaction, which includes the ID of the
coin that is being sent, the recipient information, and the signature. Digital signatures are fundamental building blocks for cryptocurrencies. 

<div style={{textAlign: 'center'}}>
 <img src="/img/crypto03.png" alt="drawing" width="600"/>
</div>

### Double Spending
However, signatures are not enough, because of an issue called the "double spend problem". Of the 1000 servers, let's say 
500 are in Asia and 500 are in America. An attacker, Bob, sends two transactions that spend the same coin, to two servers,
at the same time: one in Asia and one in America. However, those transactions send the money to different recipients. 
In this case, the two servers need to come to agreement on which transaction came first, otherwise they will have
diverging state, and the system will not hve global consensus. To solve this issue, we need a consensus algorithm, or a way for
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

The genius of Satoshi Nakamoto was to solve the double spend issue by requiring real life work in order to obtain "votes",
and to decide consensus.  This is known as proof of work. All computers try over and over to generate cryptographic hashes
with some random input, until they get a lucky number, which requires a certain number of zeroes at the beginning of the
hash. This happens once every 10 minutes globally in Bitcoin, and the number of zeroes required is automatically
adjusted so that it's always once per 10 minutes. When the winner is chosen, they get the right to generate a "block",
which is a list of valid transactions. All nodes are required to accept the new block, as the most recent block
in the blockchain. Therefore, the double spend problem is solved, because only one computer can 
create a block at any one time. The sybil problem is solved, because creating a block requires real hardware and 
real world investment.

<div style={{textAlign: 'center'}}>
 <img src="/img/crypto04.png" alt="drawing" width="600"/>
</div>


### Blockchain
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

<div style={{textAlign: 'center'}}>
 <img src="/img/crypto05.png" alt="drawing" width="1000"/>
</div>


### Beyond Proof of Work
Over a decade has passed since the creation of Bitcoin and Proof of Work blockchains. The energy expenditure of the top
two blockchains, and the degree of centralization of the top miners/pools have caused people to research new alternatives.
Many sybil-resistant consensus models have now been developed, some which compromise decentralization to different levels.
Proof of Stake (voting with blockchain assets) is one of the most popular approaches, 
and within this category there are many types of algorithms. 
Chia takes an alternate approach, which we think is likely to be more decentralized and accessible than Proof of Stake,
which is Proof of Space. In this model, the Sybil resistant mechanism is storing large files in hard drives, and storing
the "lottery tickets" within those files. This has been shown to be accessible to normal users without any special hardware,
while maintaining most of the security properties of Nakamoto's Proof of Work.

[1] https://cs.stanford.edu/people/eroberts/courses/soco/projects/public-key-cryptography/history.html#:~:text=The%20idea%20of%20public%20key,known%20as%20the%20knapsack%20problem.