---
title: Architecture Overview
slug: architecture-overview
---

![chia-architecture](/img/chia-network-architecture.png)

The above diagram shows Chia's network architecture. A single machine can run more than one of these processes. In fact, the default configuration is to run four processes together: Farmer, Full Node, Harvester, and Wallet. Many farmers will also choose to run the Electron GUI and Pool processes. Additionally, a few farmers, especially those with multi-PiB farms, will choose to run a Timelord.

Let's discuss each of these processes, and the protocols that connect them, separately.

## Full Nodes

The core of Chia's peer-to-peer system is composed of full nodes. Full nodes have several responsibilities:

1. Maintain a copy of the blockchain.
2. Validate the blockchain.
3. Propagate new blocks, transactions, and proofs through the network, using the peer protocol.
4. (Optional) Serve light clients (wallets) through the wallet protocol.
5. (Optional) Communicate with farmers.
6. (Optional) Communicate with timelords.

Usually, farmers run a full node process alongside their farmer process. Full nodes earn no rewards or fees, but they are important to maintain the consensus rules and the security of the system. Running a full node allows a user to be confident about the full state of the blockchain, and avoid trusting others.

Full nodes are always connected to a random set of full nodes in the network. Full nodes broadcast their own information (IP address and port) to their peers periodically, so that the entire network is aware that they are still running. Full nodes also broadcast all new blocks and transactions to their peers, allowing all nodes in the network to keep a complete copy of the blockchain.

## Farmers

Chia's farmers are analogous to Bitcoin's miners. They earn block rewards and fees by finding valid proofs of space inside their stored plots. The farmer processes don't maintain a copy of the blockchain, but they trust a full node to provide updates. The full node and farmer processes communicate with each other using the farmer protocol.

Farmers communicate with harvesters (individual machines, including the farmer machine, that actually store the plots) through the harvester protocol.

Farmers operate by waiting for updates from a full node, which gives them new signage points (equivalent to a lottery's winning numbers) approximately every nine seconds. Farmers then send the signage point to each harvester, to check whether any winning proofs of space exist. If the harvester finds any valid proofs, it sends them to the farmer, which separates them into two categories:

- Full proofs must match or surpass the quality required by the network's difficulty level. These proofs are sent to the full node, which then creates a new block.
- Partial proofs are used by pools to approximate a node's total storage.

Farmers also have a private key, which is used for both signing blocks when a winning proof is found, as well as for signing partial proofs, which are then sent to pools.

## Harvesters

Harvesters are individual machines controlled by a farmer. In a large farming operation, a farmer may be connected to many harvesters.

Harvesters control the actual plot files by retrieving qualities or proofs from disk. The minimum plot size (and by far the most common) is k32, which corresponds to around 100 GiB. With each increment of a k-value, the plot size roughly doubles, so a k33 plot is around 200 GiB, k34 is around 400 GiB, etc.

The difficulty level automatically adjusts every 4608 blocks to target one proof of space -- across the entire network -- for every two signage points. This is the targeted average value -- there can also be zero or multiple proofs per signage point. This leads to a difficulty adjustment approximately every 24 hours.

Given a plot, the harvester must perform two tasks to find a valid proof:

1. Fetch the initial quality -- this requires around seven random disk seeks, or 70 milliseconds on a slow HDD.
2. (Only performed if the initial quality is sufficiently high) Fetch the full proof -- this requires around 64 disk seeks, or 640 milliseconds on a slow HDD.

For most challenges, the quality (step 1) will be very low, so fetching the entire proof (step 2) will not be necessary. A node has 28 seconds to return a proof, so disk I/O will not be a limiting factor, even when proofs are stored on slow HDDs.

> NOTE: Tape drives are too slow for farming. The protocol was designed to support hard disks, but nothing slower. It is possible to use tape for long-term plot storage, only transferring the plots to disks for occasional farming, but this is likely a very rare use case.

Finally, harvesters also maintain a private key for each plot. The blocks are signed with these keys, which is an important concept in Chia. It means that even when a farmer is a member of a pool, the farmer still controls the contents of a block. This is quite different from other blockchains' pooling protocols, where the pool operators are the ones signing the blocks.

> The harvester algorithm is discussed in greater detail in [Section 3.6](/docs/consensus/harvester_algorith 'Section 3.6: Harvester Algorithm').

## Timelords

Timelords support the network by creating sequential proofs of time (using a [Verifiable Delay Function](/docs/consensus/vdfs 'Section 3.3: VDFs')) and broadcasting them approximately every nine seconds. This provides "deterministic randomness", which is used to decide the winning proofs of space.

Since this computation is sequential, very little energy is consumed, as opposed to proof-of-work systems, where computation is parallelizable. For example, if 100 timelords are doing the same computation on a proof of time, they will all create the exact same output.

> The timelord algorithm is explained in [Section 3.13](/docs/consensus/timelords 'Section 3.13: Timelord Algorithm').

A timelord is required to connect to exactly one full node, typically on the same machine. This connection is verified with a certificate. This 1:1 architecture has a large security benefit: it keeps the timelord sandboxed in its own private network. That way, the full node protocol is the only protocol that requires total security. If more than one full node could connect to the same timelord, it would add a potential attack vector to the network.

Timelords do not directly earn rewards. Furthermore, only the fastest timelord on the network will broadcast proofs at any given time. Therefore, only one timelord is required to keep the network running, and most farmers will not feel compelled to run one. However, farmers with multi-PiB farms may want to run a timelord, both for redundancy and for protection against temporary local latency issues.

> NOTE: Chia network is currently [developing an ASIC timelord](https://www.businesswire.com/news/home/20211013005324/en/Chia-Partners-With-Supranational-to-Create-Industry-Leading-Proof-of-Space-Time-Security). This will add redundancy to the network, while reducing the possibility of an attacker creating their own timelord that is significantly faster than anyone else's.

If someone controls the fastest timelord in the world, it doesn't give them much of an advantage at winning rewards. However, they could potentially orphan or censor other farmers, depending on how much faster their timelord is.

Furthermore, an attacker with a significantly faster timelord than anyone else could potentially run a long-range attack against the network with less than 42.7% of the total netspace. For security purposes, it is very important to maintain open designs of VDF hardware.

> You can learn about potential attacks against Chia's network in [Section 3.14](/docs/consensus/attacks_and_countermeasures 'Section 3.14: Attacks and Countermeasures').

## Pools

Pools allow farmers to smooth out their rewards by earning based on proof of space partials, as opposed to winning blocks.

Pools require the use of portable plots. These plots are tied to a plot NFT that the farmer must create. This NFT sits on Chia's blockchain, and it allows users to switch between pools.

Pools create and spend **coinbase transactions**, but in Chia's pool protocol they do not actually choose the contents of blocks. This gives more power to farmers and thus decreases the influence of centralized pools.

Farmers periodically send partials, which contain a proof of space and a signature, to pools. The pools use these partial proofs to determine how much space the farmers have dedicated, which in turn determines the farmer's portion of the reward when the pool wins a block.

When a farmer who is a member of a pool wins a block, 7/8 of the reward goes to the pool, which is later distributed to the participants. The farmer keeps the other 1/8 of the reward. This was an intentional design decision. If a farmer didn't receive a direct reward for creating a block, the operator of a competing pool might have had a financial incentive to join a pool (that they didn't run) with a large number of plots, and neglect to create a block when they found a valid proof, thereby spoiling the competing pool.

> For more info, see our [pooling FAQ](https://github.com/Chia-Network/chia-blockchain/wiki/Pooling-FAQ 'Chia Pooling FAQ'), as well as this site's [Pool Protocol](/docs/pooling/pooling) page.

## Wallets

Wallets can communicate with full nodes through the wallet protocol. This is similar to Bitcoin's SPV protocol: it allows verification of transactions and block weight, without the bandwidth and CPU requirements of full nodes.

Wallet nodes are similar to full nodes, in that they are servers which communicate to other peers in the network. A common use case is to run a wallet locally along with a full node, where the wallet only connects to the full node. Wallets download [weight proofs](/docs/consensus/light_clients) from nodes to quickly validate which blockchain is the longest. They then ask full nodes to scan the blockchain for their desired transactions. The wallet is also responsible for managing private keys, as well as generating, storing and sending transactions. The wallet exposes an RPC HTTPS websocket JSON API, which user interfaces can use to execute commands.

# Timelords

## Types of Timelords

There are two primary types of Timelords: Regular and Blueboxes.

The first is the core Timelord that takes in Proofs of Space and uses a single fastest core to perform repeated squaring in a [class group of unknown order](https://github.com/Chia-Network/vdf-competition/blob/master/classgroups.pdf) as fast as possible. Beside each running VDF (referred to as a vdf_client in the application and source) is a set of proof generation threads that accumulate the proof that the time calculation's number of iterations was done correctly.

The second are Bluebox Timelords. Blueboxes are most any machine - especially things like old servers or gaming machines - that scour the historical chain looking for uncompressed proofs of time. So that the chain moves quickly, the regular Timelords use a faster method of generating proofs of time but the proofs are larger, which takes your Raspberry Pi a lot more time and effort to validate and sync the blockchain. A Bluebox picks up an uncompressed Proof of Time and recreates it, but this time with the slower and more compact proofs generated at the end. Those are then gossiped around to everyone so they can replace the large and slow to verify Proofs of Time with the compact and much quicker to validate version of exactly the same thing.

## The Fastest Timelords

There are three known fastest Timelords seen so far. The fastest known was seen around September of 2020 on the testnet blockchain, where it was generating VDF iterations at about 360,000 iterations per second (or ips.) It disappeared after a few weeks. We speculate that it was an Intel cloud customer playing with pre-release Rocket Lake CPUs that have two channels of [AVX-512 IFMA](https://en.wikipedia.org/wiki/AVX-512#IFMA) support. The Timelord source code has an implementation of IFMA but it's not enabled by default as the very few CPUs that do have one channel of IFMA don't gain much speed from it - primarily because they're mostly found in power saving laptops. The second "known" fast Timelord is an [academic research project](https://ieeexplore.ieee.org/abstract/document/9301680). It is estimated that it may be in the 400k-500k ips range once modified to run our 1024 bit width version. The originators used the [TSMC](https://www.tsmc.com/english) 28-nm CMOS technology for their prototype. Until Rocket Lake is generally available (which is soon as of this writing in early March) the fastest Timelord is a water-cooled Intel Core i9-10900K running un-overclocked with 16 GiB of RAM. Sooner or later we will overclock it... It maintains about 200k-210k ips.

## Running a Timelord

First of all, the network only requires one running Timelord to keep moving (liveness.) The way Timelords race is like they are on a series of 100 meter dashes. Each one takes off with the last good Proof of Space and tries to get to the total number of iterations required to complete a given Proof of Space. Better Proofs of Space require less iterations to prove. When the fastest Timelord announces the Proof of Time for this Proof of Space all of the other Timelords stop racing and are magically teleported to the starting line of the next 100 meter dash to start it all over again.

It's good to have a few Timelords out there. There can be things like routing flaps or the overzealous backhoe that takes large swaths of the internet offline. If the fastest Timelord was just about to win the current dash when its internet blinked off in a fury of construction misadventure, then the second fastest will win that dash and the next dashes - until the fastest returns. One of the key things about Proofs of Time is that given the same Proof of Space, their output and proof are always the same (though the proofs can be larger or smaller and harder or easier to validate - they all end up with the same outcome.)

The Company plans to run a few Timelords around the world - and some backups too - just to make sure that all Farmers and nodes can hear the beat that the Timelords are calling.

## Installing a Timelord

### Regular Timelords

Due to restrictions on how [MSVC](https://en.wikipedia.org/wiki/Microsoft_Visual_C%2B%2B) handles 128 bit numbers and how Python relies upon MSVC, it is not possible to build and run Timelords of all types on Windows - yet. We have a plan to use GCC and some tools to enable vdf_client on Windows in a way that will be compatible with a Windows install of chia-blockchain. However it's a bit convoluted to get it working right. On MacOS x86_64 and all Linux distributions, building a Timelord is as easy as running `sh install-timelord.sh` in the venv of a `git clone` style chia-blockchain install. Try `./vdf_bench square_asm 400000` once you've built Timelord to give you a sense of your optimal and unloaded ips. Each run of `vdf_bench` can be surprisingly variable and, in production, the actual ips you will obtain will usually be about 20% lower due to load of creating proofs. The default configuration for Timelords is good enough to just let you start it up. Set your log level to INFO and then grep for "Estimated IPS:" to get a sense of what actual ips your Timelord is achieving. We will shortly modify the Timelord build process to support MacOS ARM64 as well - which is a cakewalk compared to Windows...

### Bluebox Timelords

For now, Blueboxes are also restricted to basically anything but Windows. Our plans to port to Windows will make Blueboxes available there as well though. Once you build the Timelord with `sh install-timelord.sh` in the venv, you will need to make two changes to `~/.chia/VERSION/config.yaml`. In the `timelord:` section you will want to set `bluebox_mode:` to `True`. Then you need to proceed to the `full_node:` section and set `send_uncompact_interval:` to something greater than 0. We recommend `300` seconds there so that your Bluebox has some time to prove through a lot of the un-compacted Proofs of Time before the node drops more into its lap. The default settings may otherwise work but if the total effort is a little too much for whatever machine you are on you can also lower the `process_count:` from 3 to 2, or even 1, in the `timelord_launcher:` section. You know it is working if you see `VDF Client: Sent proof` in your logs at INFO level.

## The Future of Timelords

Having an open-source ASIC Timelord that everyone can buy inexpensively is the Company's goal. We had originally expected that we would proceed from general-purpose CPUs to FPGAs and then ASICs. It turns out that squaring in class groups of unknown order at 1024 bit widths is both FPGA hard and slightly ASIC hard. It also was a pleasant surprise that Intel's AVX-512 IFMA was almost perfectly created for this application. As such, we will be fostering ASIC efforts over the medium term. We are happy to lose money on an ongoing project to create and enhance an open-source PCI card that would be available for say $250 for anyone who wishes to run the fastest Timelords in the world too.

## Timelords and Attacks

One of the things that is great about the [Chia new consensus](https://docs.google.com/document/d/1tmRIb7lgi4QfKkNaxuKOBHRmwbVlGL4f7EsBDr_5xZE/edit) is that it makes it almost impossible for a Farmer with a maliciously faster Timelord to selfishly Farm. Due to the way the new consensus works, a Farmer with a faster Timelord is basically compelled to prove time for all the farmers winning blocks around him also. Having an "evil" faster Timelord can give a benefit when attempting to 51% attack the network, so it is still important that over time we push the Timelord speeds as close to the maximum speeds of the silicon processes available. We expect to have the time and the resources to do that right and make open-source hardware versions widely available.

## Terminology
* VDF: verifiable delay function, another way to say "proof of time"
* Timelord launcher: a small program which launches "vdf client" processes over and over, to perform the actual VDF calculations.
* VDF client: a C++ process which performs a VDF computation and then shuts down
* Timelord: The timelord communicates with the node, and is what decides which VDF tasks to assign to which clients. The vdf clients connect through HTTP to the timelord. So you can have the timelord in a separate machine as the timelord launcher