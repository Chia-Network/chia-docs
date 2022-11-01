---
title: FAQ
slug: /faq
---

## What are harvesters, farmers, full nodes, and timelords?

You can read about each of them and the architecture in the [Architecture Overview page](/architecture-overview). The [Consensus Intro page](/consensus-intro) is the most current documentation, however.

## What is a proof of space?

A _proof of space_ is a proof that a farmer has allocated a portion of their storage in a way that is very difficult to create in real-time but efficient to pre-compute and store on a hard drive. The [Chia Proof of Space Construction document](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf) goes deeply into the math and implementation considerations to mitigate [Hellman's Time - Memory tradeoff](https://pdfs.semanticscholar.org/f0ba/66072ac10d9898b8a79171ec726d45ec804b.pdf) problem. A plot is a large set of proofs of space. A harvester can harvest multiple plots on the same machine. A farmer can then control [multiple harvesters across many machines](/farming-on-many-machines) to manage the whole "farm".

Farming uses substantially less electricity than Proof of Work for the same unit of security. You can learn more at [chiapower.org](https://chiapower.org).

## What is a VDF/proof of time?

A VDF, also known as a proof of time, is a sequential operation that takes a prescribed amount of time to compute (and which cannot be accelerated by parallelism) and which produces an accompanying proof whose result may be quickly verified. This must be done in a group, for which Chia uses ideal class groups. You can learn about them in our [class group document](https://github.com/Chia-Network/oldvdf-competition/blob/master/classgroups.pdf). [Timelords](/timelord-algorithm) usually run three VDFs at a time for the three internal blockchains of the Chia blockchain. They run as `vdf_client` processes.

## What is XCH, TXCH, and mojos?

XCH is the currency symbol for Chia. TXCH is the currency symbol currently being used for testnet chias. TXCH has no value and is only used for testing purposes. Chias and testnet chias can be divided up to 12 decimal places (trillionths). The smallest unit of chia, a trillionth of a chia, is called a mojo, as a tribute to [Mojo Nation](<https://en.wikipedia.org/wiki/Mnet_(peer-to-peer_network)#Evil_Geniuses_for_a_Better_Tomorrow>), a decentralized file storage platform created in the early 2000s by Zooko Wilcox, Bram Cohen, and others.

## Chia vs XCH vs Mojo

- **Chia** - depending on context, this can refer to Chia Network the company, the Chia software (Chia client), or the Chia blockchain.
- **XCH** - refers to the Chia token, XCH.
- **Mojo** - a trillionth of an XCH.

# Plotting

## What is k?

"k" is the space parameter that controls the size of plots. It is an integer for the following equation: `plot_size_bytes = C1 * 2^k(k + C2)` where C1 is constant 1 and C2 is constant 2. In practice this means that final size is roughly `((2 * k) + 1) * (2 ** (k - 1)) * 0.762` though that constant is estimated. You can examine the [Space Required section](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf#page=15) of the [Chia Proof of Space Construction document](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf) for the calculation of how much space is required for a given k.

## How big are plot sizes (k)?

You can see some example plot sizes, times to plot, and working space needed based on various k's in these [k size tables](/k-sizes). Current working space needed for the default plotting options of a k=32 is 239 GiB and the final file is approximately 101.4 GiB. There is small natural variation in temp space needed and the final file size of each plot. Note that 239 GiB is 256.6 GB.

## What k-size should you plot?

The minimum plot size is k=32. There is only one reason why you might want to plot larger than k=32: to maximize the total utilization of a given drive or space. A couple of k=33 plots with a majority of k=32 plots can reduce the amount of leftover unused space on a drive.

The reason k=32 was chosen as the minimum plot size was to prevent a short-range replotting attack, which is detailed in our [consensus doc](https://docs.chia.net/03consensus/consensus_intro). The gist of the attack is that if someone can create a plot in less than ~30 seconds, they could create a new plot that passes the filter for each signage point, and then delete the new plot immediately afterward. This would effectively emulate storing 512 plots, thus turning Chia into PoW.

- Note that this attack does not create a winning plot; it only creates a plot that passes the filter.

This attack won't be economically feasible for some time, if ever. Two potential mitigation techniques are to lower the plot filter (thus reducing the benefit of the attack), or to increase the minimum plot size (thus making the attack more difficult to perform).

k=32 is expected to be the minimum plot size until at least 2026. If and when that size is increased, you will be given ample notice to replot before the change is made effective.

## What is recommended for plotting?

We think you will want to use used Data Center grade NVMe SSD drives to create your plots. Regular consumer NVMe SSD generally has too low of a [TBW](https://www.enterprisestorageforum.com/storage-hardware/ssd-lifespan.html) rating. One of our community members keeps this handy [SSD Endurance page](/ssd-endurance) up to date so you can compare various SSDs. You should never use your root/OS SSD to plot as it can lead to drive failure and loss of booting. You can plot directly to hard drives and get good results, especially if you plot in parallel to different drives. You can use non-root SSD over Thunderbolt 3 and migrate your plots off to whatever storage you want to keep them on long term. You could even load them on a Raspberry Pi 4 with outdated USB 2.0 drives attached and they will harvest and farm just fine. PC World offers this great [background on current storage technologies](https://www.pcworld.com/article/2899351/everything-you-need-to-know-about-nvme.html) but this graph gives you a quick view of why we recommend NVMe SSD:
![NVMe SSD vs SATA](/img/plotting-nvme-ssd.png 'NVMe SSD is 5.5 times faster than SATA SSD')

## Can I plot more than one plot at a time?

Yes, using either the GUI or CLI. Over the short run you have a bit more control of plotting using the CLI. You can read the [Quick Start Guide](/quick-start-guide) to learn more. You may have better results if you stagger the start time of parallel plotting processes depending on your hardware setup.

## Can I make plots on one machine and move it to another machine?

Yes. The [Moving Plots page](/moving-plots) gives you the details. You may also want to consider running a [remote harvester](/farming-on-many-machines). You can also use the same private key set to plot on more than one machine at a time but be aware of the [uPnP issues](/faq#why-should-i-not-run-more-than-one-node-on-a-home-network-and-whats-this-about-upnp).

## What is the secondary temp directory `-2`, and how should I set it?

`-2` is in use during phase 3 and 4. It is the file being built into the resulting .plot file. As it is done compressing tables during phase 3, it will move them into the `.plot.2.tmp` file (`-2`), and phase 4 will scan through the entire `.plot.2.tmp` (`-2`) file, and write table headers for easy access by the harvester. When phase 4 is done, if `-2` = `-d`, it will simply rename the `.plot.2.tmp` to `.plot`. If `-2` != `-d`, it will copy the file into place, then rename, and finally remove the `-2` file. The amount of writing is about 110% of the resulting `.plot` file size. It is a setup dependent option - is your setup faster at moving the compressed tables into the `.plot.2.tmp` file, and then scan through the entire file, and write table headers during phase 4 - and then copy to `-d` (`-2` = `-t`) - or is it faster to send the compressed tables directly into the `-d` (`-2` = `-d`) directory, and then in phase 4, scan through the entire file, and write table headers inside `-d` (`-2` = `-d`) thereby skipping the final copy into place. The `-2` directory can be set in the Advanced Options for Step 3 in the GUI.

## My plotting attempt got "Caught plotting error: Not enough memory..."?

If you see something like `Caught plotting error: Not enough memory for sort in memory. Need to sort X.XXGiB` then you need to either select more memory buffer or more buckets. More buckets require less memory but will create more temp files and more sporadic disk writing. You will almost always want to use 128 buckets and you should try increasing the RAM max usage/`-b` to 4608MiB.

## My plotting attempt ended with "RuntimeError: bad allocation"?

This is a RAM problem with your machine. It can be how your swap file is configured. It is often your overclock, or XMP settings and even can be a faulty RAM stick. Chia plotting is better than memtest at surfacing broken or mis-configured RAM.

## My computer/drive went into power save or rebooted while plotting?

Unfortunately, resuming a plot is not supported. We suggest that you disable power saving mode - especially for external drives - and try to limit other possible causes of interruptions. Plotting a k=32 could take multiple hours, depending on your hardware, so these interruptions can be painful. They are also a part of why we don't recommend plotting plots larger than k=32 as each increment in k generally doubles the time to complete a single plot.

## Do I have to be connected to the internet or synced to plot?

No. Plotting can be done entirely offline and needs nothing from the blockchain to complete. The only time you have to be online and synced is when you're farming so that you receive new challenges for the next blocks and transactions to include in a transaction block if you're lucky enough to win one of them and get the transaction fees. Note that one farmer winning is independent of other farmers winning at the same time. All farmers can "win" at nearly the same time. That is why sometimes there are 10 blocks in one minute, and sometimes there is only 1 block per minute, etc.

## Is there any advantage in plotting larger k sizes?

No. As long as you plot at least k=32, those plots will be eligible to win on mainnet. In a decade or more, k=32 may become too small, but that's speculative. Usually the only reason to plot larger than k=32 is to optimize using all of the space on a given drive. For example, it may make sense to have two k=33's and the rest k=32 so that you only leave 10 GB free on a given drive.

## Is the final size of the plotted space the only variable in how often I can win block rewards?

Yes.

## How do I know if my plots are OK?

Run `chia plots check -n 30` to try 30 sample challenges for each plot. Each of your plots should return a number around 30, which means it found around 100% of the attempted proofs of space. If you're still worried try `-n 100` as more random attempts will give you a more valid assessment that the plots is fine. It really is ok if your plot is within 80%-120%. If some of your plots are missing for some reason you may need to add the directory they are in to your config.yaml file. That can be done in the GUI with the MANAGE PLOT DIRECTORIES button or on the command line with `chia plots add -d [directory]`.

# Full Node

## What is this UPnP Error?

[UPnP](ttps://www.homenethowto.com/ports-and-nat/upnp-automatic-port-forward/) is an optional setting that allows users to open a port in their router and therefore allow other nodes to connect to them. This is not required, since your node can still make outgoing connections without UPnP.

For some routers, UPnP is enabled automatically, but for others, you might have to go into your router settings and enable UPnP manually. Sometimes restarting the router is also necessary.

Another option is port forwarding, where you tell your router/NAT to forward requests on port 8444 or 58444 for testnet to your machine.

## Why should I not run more than one node on a home network and what's this about UPnP?

First, running more than one node with the same private keys on your home network is wasting bandwidth by syncing two copies of the blockchain over your download link. You can get the same results by running one node and [using multiple harvesters](/farming-on-many-machines) on multiple computers. Second, if you have [uPnP](https://www.homenethowto.com/ports-and-nat/upnp-automatic-port-forward/) enabled on both nodes and your home router supports uPnP (and most do) it will cause both of your nodes to not sync the blockchain. You need to disable uPnP on all or all but one node behind a uPnP enabled router. The CLI command `chia configure --enable-upnp false` will turn uPnP off on a node. It requires a restart of the node to take effect. If you disable UPnP on all but one of your nodes then your local router will forward inbound 8444 traffic to the one node and the rest will now be able to connect to the network but just will not accept inbound connections from the network.

## Why does my node have no connections? How can I get more connections?

Step 1. Make sure you are running the most recent version of the Chia software. Check out the [Quick Start Guide page](/quick-start-guide).

Step 2. If your node has no connections, it could be one of many reasons. The most likely reason is that there are no users with space to have new connections, so you cannot connect to them. To solve this, you should try opening port 8444 on your router so other peers can connect to you. Follow the steps in the [Node Syncing page](/node-syncing).

Port 8444 is the port through which other Chia computers can communicate with your PC. When you set up port forwarding on port 8444, the Chia software on your computer can quickly talk to other PCs, link up, and start downloading and syncing with the Chia blockchain.

The network is undergoing rapid growth and expansion. Many of the newly arrived Chia peers (computers) do not open up port 8444. It makes it very hard for the network. So please port forward on port 8444!

Use this link to check if your router's port 8444 is closed: [https://portchecker.co/](https://portchecker.co/)

Step 3: You might need to disable UPnP in the config file (~/.chia/mainnet/config/config.yaml) or by using the cli command `chia configure -upnp false`. You might have multiple nodes running on the same machine, or in the same wifi network. Make sure to close all Chia applications on your computer. Also check your firewall or antivirus software, which might be blocking connections.

Step 4: Try deleting your peer DB which is located at `~/.chia/mainnet/db/peer_table_node.sqlite`. Close then restart Chia.

Step 5: Edit `~/.chia/mainnet/config/config.yaml`, search for `weight_proof_timeout` and increase it from 180 to 400. If that value is not there, you can add it under the `full_node` section.

It can take a few minutes to start receiving peers and several hours to completely sync.

## I am seeing blocks and connections but my node says "Not Synced"

This is usually a system clock issue, which is causing the display of "Not synced", even though you are. Your clock must be set to the exact time, and cannot be more than 5 minutes off. Check your phone and your computer and ensure the time is the same.

## What is the new database?

Beginning in 1.3, Chia uses version 2 of its blockchain database. The new database is still written in SQLite, but it has undergone a series of optimizations, such as storing hashes in binary, rather than human-readable hex format. It also is more compressed than version 1. These two factors combined have resulted in an approximately 45% reduction in the size of the database, as well as a slight improvement in its performance.

If you install a brand new full node in Chia 1.3 or later, version 2 of the database will be created when you run `chia init`. If you want to stick with version 1, simply run `chia init --v1-db` instead.

If you were already were running a full node prior to upgrading to Chia 1.3, the upgrade will not happen automatically. The command to perform the upgrade is `chia db upgrade`. This is documented in detail in our [CLI reference](/cli).

You do not need to stop Chia in order to perform the upgrade. This is because the program performing the upgrade only needs to _read_ from your original database file, while your upgraded file will be written alongside it in the same folder. Be sure you have enough free space on the disk that contains your database file to write the new file.

The current size requirement (2nd quarter 2022) is around 55 GB. _Note that the database is always growing, so the size requirement for the v2 database will have gone up by the time you are reading this — plan accordingly._

The upgrade could take several hours, so feel free to perform it at your leisure. After the upgrade has completed, run `chia start farmer -r` to restart your farmer and switch to the new database.

Note that the new database will have the same peak as version 1 at the time you _initiated_ the upgrade. Your node will still need to run a short sync to fetch the remaining blocks that had gotten added while the upgrade was being performed.

Because the upgrade from version 1 to 2 of the database is time-consuming, most users will likely only perform it on one of their systems and copy the new database file to their other systems afterward. If you choose this option, be sure to either copy the file _before_ running `chia start farmer -r`, or stop Chia altogether if it is already using the new database. Once the database is swapped from v1 to v2, you also need to update you `config.yaml` to reflect the new v2 database change. Under the `full_node:` section set `database_path: db/blockchain_v1_CHALLENGE.sqlite` to `database_path: db/blockchain_v2_CHALLENGE.sqlite`

:::warning
If you copy your database file to another computer while Chia is currently using it, you'll risk corrupting it, which will necessitate a full sync from genesis.
:::

If you're interested in learning more technical details of the new database, see the first Github Pull Request that introduced the changes:
<br/>
https://github.com/Chia-Network/chia-blockchain/pull/9442

And there were two follow-up Pull Requests with additional improvements, along with some benchmarks.
<br/>
https://github.com/Chia-Network/chia-blockchain/pull/9454
<br/>
https://github.com/Chia-Network/chia-blockchain/pull/9455

Finally, here is the Pull Request that added the upgrade functionality:
<br/>
https://github.com/Chia-Network/chia-blockchain/pull/9613

## What is the difference between Wallet Mode and Farming Mode?

When you load Chia's client GUI for the first time, you'll be asked to choose whether to run in Wallet Mode or Farming Mode. Here are the main features of each mode:

Wallet Mode:

- This mode runs a Chia wallet, but not a full node.
- The wallet will sync by connecting to external peers.
- You'll be able to send and receive Chia and/or CATs.
- Farming will be disabled.

Farming Mode:

- This mode runs a full node, so farming will be enabled.
- The wallet will also sync by connecting to external peers, unless specific conditions are met (see below).
- You'll be able to send and receive Chia and/or CATs, just as while running in Wallet Mode.

To switch between Wallet Mode and Farming Mode, click the gear icon on the upper-right side of your client. The settings menu will appear. Click the desired mode.

Note that in both modes, the light wallet protocol is always used. This protocol will sync your wallet by only downloading information from a subset of the blocks. The more transactions your wallet has had, the longer this process will require.

The following are situations when your wallet will NOT connect to external peers:

- `connect_to_unknown_peers = false` is set in config.yaml, under `wallet:`.
- Your wallet is connected to a trusted node (typically this is your local host) AND that node is fully synced.

For example, let's say you're running Chia for the first time and you have not modified `connect_to_unknown_peers`. Here is one potential workflow:

1. Start the GUI and select Wallet Mode.
2. Your wallet will sync by downloading relevant information from external peers.
3. Change to Farmer Mode. Your full node will be started. Your wallet will continue to download relevant information from external peers.
4. After your full node has synced, your wallet will automatically connect to your full node in order to stay synced. It will terminate its connections with external peers.
5. Change to Wallet Mode. Your full node will continue to run in the background, and your wallet will remain connected to your full node in order to stay synced.
6. Stop and restart Chia. You will return to Wallet Mode, and your full node will no longer be running. Your Chia client is now in state 2.

Depending on how you are using your Chia client, we recommend the following:

- Casual users who are not farming or running a business such as a DEX can use Wallet Mode.
- Farmers need to run in Farming Mode.
- Anyone running a business, as well as anyone who frequently trades XCH or CATs, should do one of the following:
  - Run in Farming Mode. Only transact when your node is fully synced.
  - Set `connect_to_unknown_peers = false`. Run in either Wallet Mode or Farming Mode.

## What are trusted peers and how do I add them?

There are two types of peer nodes -- trusted/known and untrusted/unknown. By default, your local node is your only trusted node. It is possible to add other nodes to the trusted list, for example if you personally run more than one full node. One reason to add a trusted node is to speed up the sync time of your light wallet.

The light wallet protocol has two techniques to sync:

1. If you have access to at least one trusted node that is fully synced, then your wallet will sync by downloading blocks only from your trusted node(s)
2. Otherwise, your wallet will sync by connecting to, and downloading from, multiple untrusted nodes, and verifying that the information downloaded from each node is the same

Typically, it is much faster to sync a wallet by connecting to a trusted node. Therefore, if you have access to a synced node that you trust, you may want to add that node to your trusted peers list. _We recommend that you only add your own full nodes to this list_.

### Prerequisites

1. Chia needs to be version 1.3.0 or later on all computers
2. Have a full node running on version 1.3.0 or later

### Steps to add a trusted node (peer)

1.  You'll need your trusted node's ID. From your trusted node, run `chia show -s`. Copy the value of `Node ID`, which will appear near the beginning of the output. For example:

```bash
~$chia show -s
Network: mainnet    Port: 8444   Rpc Port: 8555
Node ID: 0ThisisanexampleNodeID7ff9d60f1c3fa270c213c0ad0cb89c01274634a7c3cb9
```

2. Edit config.yaml. This file is located in `~/.chia/mainnet/config` on Linux and MacOS, and `C:\Users\<username>\.chia\mainnet\config` on Windows.

Search for the `wallet:` section. It should be near the end of the file. Edit the following values from within this section:
* `connect_to_unknown_peers` - Default is `true`; change it to `false`
* `target_peer_count` - Default is `3`; change it to `1` (assuming you only have one trusted full node)
* `trusted_peers`
  * Default is `0ThisisanexampleNodeID7ff9d60f1c3fa270c213c0ad0cb89c01274634a7c3cb9: Does_not_matter`
  * Change to `<Node ID>: Does_not_matter` 
  * Note 1: Replace `<Node ID>` with the actual Node ID you obtained above
  * Note 2: It doesn't matter what you enter on the right side of the colon. The argument will be ignored. Just make sure to enter something

3. Restart Chia on the computer you are connecting to the trusted node to pick up the changes.

4. To verify that the changes are working, run `chia wallet show`. The last line of the output should contain `-Trusted: True`

## How does light wallet syncing work?

This response will give a non-technical overview of Chia's light wallet syncing process. For technical info, see [our docs site](https://docs.chia.net/03consensus/light_clients), as well as the [FlyClient White Paper](https://eprint.iacr.org/2019/226.pdf), which details the process from which Chia's light client is based.

First, a bit about addresses in Chia. A single Chia wallet can use up to four billion (2^32) addresses. Hopefully, you won't need more than that! Using multiple addresses can help provide anonymity. Rather than having to sign up for a new account each time you want to receive money, you can simply click "NEW ADDRESS" and _presto_ -- a new address appears. Additionally, each time you receive change from sending money, a new address is automatically generated. Your wallet keeps track of each of the addresses that have been used. As long as your wallet is synced, it always knows how much money you have.

One important thing to remember is that your wallet addresses will always be generated _in the same order_. When you generate a "new" address, you're actually calculating the _next_ address in the sequence. Your wallet doesn't know what the next address will be until it's generated, but the sequence will always be the same. For example, if you generate 50 new addresses (and write them down), and then install Chia on a new computer and import the same wallet, the first 50 addresses you generate will _exactly_ match those from your original computer.

Next, we'll introduce a setting called `initial_num_public_keys`. This setting is part of `config.yaml`, located in `~/.chia/mainnet/config` on Linux and MacOS, and `C:\Users\<username>\.chia\mainnet\config` on Windows. The default value of this setting is 100. The majority of users should _not_ change it.

You can think of `initial_num_public_keys` as the number of future addresses to examine. It's a window that expands with time (and never contracts). Here's how it works:

The first time you run Chia's software, your wallet will attempt to sync. It does this by checking the first address in the sequence. If that address has ever received money, your wallet will account for that transaction history and examine the next address, and so on. It would take a _very_ long time to examine all four billion addresses, so your wallet will stop looking at some point. This is where `initial_num_public_keys` comes in.

By default, your wallet will stop after it has examined 100 straight addresses that have never received money. If it examines 50 empty addresses and then finds a transaction on the 51st address, the number left to examine is reset back to 100. Because the addresses always appear in the same sequence, it will be rare to have even a single address without any transaction history. But there is one exception: if you click "NEW ADDRESS" twice, then one address will remain unused. If you click "NEW ADDRESS" 101 times without receiving money at any of those addresses, then you'll have 100 consecutive unused addresses in the sequence. Let's say you receive money at the 101st address. When your wallet attempts to sync, it will stop looking after the 100th blank address. Transactions from subsequent addresses will remain undiscovered, and your balance will be incorrect.

The default setting for `initial_num_public_keys` is quite conservative -- it should be rare for anyone to click "NEW ADDRESS" more than 100 times without actually using any of those addresses. That said, you might have a legitimate reason to do this, for example if you're running an exchange. In that case, feel free to set `initial_num_public_keys` to a higher number, stop your wallet, delete your wallet database, and start your wallet again to begin a fresh sync.

Why not set `initial_num_public_keys` to a higher number by default? Because it would take longer for your wallet to sync. Why not set it lower? If the default setting were 2, most wallets would likely still show the correct balance and the sync time would be faster. However, we set the default to 100 to prioritize showing the correct balance over syncing as fast as possible.

How does your wallet know it has the correct info for each address? It polls one or more of its peers. These peers can be either trusted or untrusted, as explained in the [previous question](#what-are-trusted-peers-and-how-do-i-add-them). By default, your own node is the only one you trust. If your node is fully synced, then your wallet only needs to query your node to determine your transaction history for each address. If your node is not fully synced, then your wallet will query a number of peers about this info. If any of them lie, omit info, or disconnect in the middle of a query, your wallet will know because the responses won't all match.

If you believe your balance is incorrect, changing `initial_num_public_keys` is unlikely to fix the problem. If at all possible, you should sync a full node, stop Chia, delete your wallet database, and start Chia again. This time, Chia will sync based on your own node alone. If this is not an option, then resyncing from untrustred nodes might fix the problem as well.

# Farming

## How do I tell if I'm farming correctly?

If you see plots in the Plots section of the Farm page in the GUI - your plots are being farmed. You will see challenges and proof attempts as they come through in the Last Attempted Proof section however you usually will not have a proof worth sending to the network due to the [plot filter](/faq#what-is-the-plot-filter-and-why-didnt-my-plot-pass-it). You can additionally see the Total Size of Plots on the Farm view and it will tell you how much unique space is being farmed and statistically how long it should take - on average - to win a block.
Also, your node needs to be synced for you to farm properly. In the GUI, check the Full Node page. On the cli, do `chia show -s -c`.

## Does it matter how fast my internet connection is?

No. You have 30 seconds to respond to challenges.

## I have only 10 TB, will I ever win XCH?

[ChiaCalculator.com](https://chiacalculator.com 'Chia Calculator') does a good job at running the numbers.

First, the bad news. Statistically, it would take multiple years to win a reward with a 10-TB farm. ("So you're saying there's a chance...")

Now, the good news. You can join a pool and collect regular rewards, no matter your farm's size! See the [Pool Farming page](/pool-farming) for more info.

## What is the plot filter and why didn't my plot pass it?

Farmers compute a plot filter based on the signage point, their plot id, and the sub-slot challenge - which are hashed together to create the plot filter bits. If the plot filter bits start with 9 zeroes, that plot passes the filter for that signage point, and can proceed. This disqualifies around 511/512 of all proofs of space on the network, for each signage point. There are 4608 \* 2 or 9216 signage points per day so the average plot should pass the filter 18 times per 24 hours on average. Once a plot passes the plot filter it then competes for the best proof of space with every other plot that also passed that plot filter for that signage point. For reasons that aren't super simple to intuit, the only thing each plot is competing on is to have the best proof of space and thus the chances of getting a reward depend on total size of plots on the farm - even with the plot filter in place.

As long as the plot passes the filter, and do not have any internal file errors, the plot will always be eligible to compete for the best proof of space. Moving the plot to another directory or server will not change its eligibility.

Please note that the speed of your lookups when passing the plot filter should be below 5 and preferably below 2 seconds. When you actually win a reward, your drive will have to do more lookups than these, so it's important that the the lookups are happening fast.

## Can I join a farming pool?

Yes you can. Please check the [Pool Farming page](/pool-farming).

## I have heard that it's recommended that a winning plot be deleted on mainnet?

There is a possible attack where an attacker who can co-ordinate N deep from the tip of the chain can try to coerce a winning farmer to re-write a historical transaction block. This attack is much more difficult and thus less of a risk in new consensus and thus we only recommend deleting and re-plotting a plot to farmers with in excess of 1PB of farm size. Anyone smaller than that would be difficult for an attacker to locate and can more safely continue to farm plots that have already won. We plan to have the software automate the process up to and including kicking off a remote plotting process if the current hardware that a farmer or harvester are on is not up to the task of re-plotting. But to repeat, deleting winning plots is, and will always be, totally optional.

## Do my plots "wear out" or "go bad"/"go stale" over time? Will I have to regularly re-plot?

No, your plots are virtually unaffected by the passage of time, aside from hardware errors. Even in the presence of bit flips due to aging hardware, plots remain mostly effective. The only cases where you would need to re-plot are: 1. if you are using solo plots (not NFT plots) and wish to join a pool (please see note below) or 2. if hardware speeds advance to the point of a certain k value becoming obsolete (e.g., `k=32` becomes too fast to plot and we ban them, forcing you to replace them with `k≧33` plots). For case 1., you are free to have any mix of solo plots and pool plots if you do not want to re-plot. For case 2., `k=32` is not expected to become outdated until sometime between 2026-2031.

- Note on case 1:
  We have added a Pooling Protocol that replaces the hard-coded "Pool Public Key" of a plot, with a plotNFT's "Pool Contract Address" - more on this subject can be read here: https://github.com/Chia-Network/chia-blockchain/wiki/Pooling-FAQ

## Is it possible to have a proof but not get a reward?

It is unlikely, but it is possible. There are multiple reasons why this might be the case. The most common is that due to network delay, or drive speed delay (for example using a slow NAS), you missed the time for inclusion into the blockchain, which is 28 seconds. This time is from when the timelords create the signage points, to when the timelords infuse your block. Check to make sure that you are connected and synced to multiple peers, and that your quality lookup are fast (<2 seconds, definitely less than 5). Another reason might be that the signage point where you won did not get included into the blockchain. This can sometimes happen, since timelords may publish signage points that don't end up on chain.

# Wallet

## How do I send or receive a transaction?

The Wallets page in the GUI will display your receive address and provide an interface for you to spend your chia funds. You can also obtain a new wallet receive address any time you would like and those funds will all come to the same place as they are based on [HD Keys](https://www.investopedia.com/terms/h/hd-wallet-hierarchical-deterministic-wallet.asp).

There is growing wallet functionality available on the command line. Try `chia wallet -h`. Wallet software also provides features related to [CAT's](https://www.chia.net/2021/11/15/the-CATs-out-of-the-bag.en.html), and trade offers. You can get a receive address on the cli with `chia keys show`.

## What is the Coin model?

The coin (or [UTXO](https://river.com/learn/bitcoins-utxo-model/)) model is a Bitcoin-style transaction model which is also used in Chia. Your wallet keeps track of a set of coins, where each coin can be any amount of XCH. When spending a coin (making a transaction), you have to spend the entire amount, and split that coin into multiple outputs, called coin additions. One addition is to the recipient of the transaction, and the other one is to you, as change. The change usually goes to a new address, so you will not see it in your normal address on Chia explorer, but your wallet will keep track of it and include it in the balance. Each block in Chia is a list of removals (coins spent) and additions (coins created). There are no transactions in the blockchain, which is why you cannot lookup transactions in the block explorers.

## What are HD Keys?

HD or Hierarchical Deterministic keys are a type of public key/private key scheme where one private key can have a nearly infinite number of different public keys (and therefor wallet receive addresses) that will all ultimately come back to and be spendable by a single private key.

## How many confirmations do I need to trust that a chia transaction is final?

Small reorgs in Chia are possible, though rare. In order to be confident that your transaction won't be reorged, you should wait around six blocks, or two minutes, after the first confirmation. More details are available in [our consensus documentation](https://docs.chia.net/03consensus/analysis#safety "Safety analysis of Chia's consensus").

## Why is my wallet not synced? Why can I not connect to wallet from the GUI?

Try the following options:

1. GUI may not be fully refreshed. Try the "force reload" option under View to force the GUI to refresh.
2. It's possible the wallet DB may be corrupted. Deleting the wallet DB will resolve this, but will also cause you to lose any Offer history and you will need to setup your CAT wallets again.

To delete your wallet DB follow these steps:

1. Shut down Chia and all Chia processes, check the task manager to see if they are all shut down. _Note that this will cancel running plots_, so be careful.
2. Restart your computer (if there are still running processes and you can't get those processes to quit)
3. Delete the `~/.chia/mainnet/wallet/db` folder
4. Restart Chia

## Why do I have a negative balance? Why is my pending transaction not confirming?

Your pending transaction can take a few minutes if blocks are full. If it's not confirmed after a while, your pending transaction might be stuck. Try the following steps:

1. Shut down your wallet and node
2. Delete your wallet db files: located at `~/.chia/mainnet/wallet/db`. This will require syncing up your wallet, but not your node. And then you can resubmit the transaction.
3. Make sure you have upgraded to the latest version
4. Start the application and wait for the wallet to sync up
5. After your wallet is fully synced to the same height as the Full Node, your Wallet Balance will be correct.

Known problem: After your wallet is resynced, any previous outgoing transaction will appear as incoming transaction at the block height you made the outgoing transaction.

## Where can I buy Chia?

Visit [chia.net/buy-xch](http://chia.net/buy-xch) for instructions on buying Chia with USDS and [offers](https://chialisp.com/offers) using the Chia light wallet and [Offers](https://chia.net/offers).

There are also several exchanges that offer XCH. You can see a list of exchanges supporting XCH [here](https://chialinks.com/exchanges/). This list is for informational purposes only. It is up to the reader to do their own research on the best exchange for their needs.

## I was running the light wallet beta app and I upgraded to the latest beta and my offer history disappeared. How do I get that back?

If you were running the light wallet beta app (v1.2.11 dev 265) and you’ve upgraded to the latest beta (v1.2.12+), you can get your offer history and your CAT wallets back by following these instructions:

1. Close the Chia app
2. Check the following directory: `~/.chia/mainnet/wallet/db` if it's not empty, then be sure to delete all the .sqlite files that match the key (e.g., `blockchain_wallet_v2_mainnet_1123456789.sqlite`)
3. copy the file(s) from `~/.chia/standalone_wallet/wallet/db/blockchain_wallet_v1_mainnet_123456789.sqlite_new` to `~/.chia/mainnet/wallet/db`
4. rename the file `~/.chia/mainnet/wallet/db/blockchain_wallet_v1_mainnet_123456789.sqlite_new` to `blockchain_wallet_v2_mainnet_123456789.sqlite`
5. launch the Chia app

## Why does the wallet tab tell me that it’s synced, but when I look at the full node tab, it still shows that I’m syncing?

This is because of the newly integrated light wallet client sync. The wallet will sync through the light wallet sync while the full node syncs up in the background. Once the full node is synced up, then the wallet will sync primarily through the local trusted full node.

## I lost my offer history, and I have open offers. How do I cancel those offers since I can’t access the open offers through the wallet?

If you’ve lost your offer history and want to cancel those offers but can’t access them, then the only way to cancel the offer would be to send yourself a transaction with the CAT tokens that were part of the offer.

## Why don’t new CAT tokens automatically show up in my wallet anymore?

The wallet no longer automatically adds unknown CATs wallets for CATs that may have been airdropped to your wallet. This is to help ensure that syncing doesn’t slow down with all the additional CATs that could suddenly show up. It is recommended that you use a tail database to look up and add. We understand that this will add some extra work to know which CATs to add wallets for and set them up manually. We do hope to improve upon this experience Soon™

## Why does the 1.3 beta show a version 1.2.12?

This is the way our tools work today. Just make sure when you submit feedback or an issue in Github to use the app version (1.2.12 dev269) when reporting it so we know exactly which version you're running.

## How can I make a coin that may only be spent until a certain timestamp or block height?

Chialisp does not directly enable this capability. There are only conditions to make a coin that may be spent _after_ a certain timestamp or block height. Coin spends can only become valid; they can never become invalid.

There are at least 4 reasons for this:

1. **To keep CLVM separate from the mempool** -- When a block is farmed, the local node executes the CLVM from all of the coin spends in that block. The mempool only contains the output of this execution. Thus, the CLVM code execution is kept separate from the mempool, and the CLVM does not need to examine the blockchain's state in order to execute. If coin spends could become invalid, then the CLVM would need to examine the blockchain's state, which would require special handling in the mempool (and possibly cause other problems).

2. **To preserve mempool efficiency** -- If a coin spend depended on determining the timestamp or height of the last confirmed block, as would be required if coin spends could become invalid with time, then the output of the CLVM from this spend would need to be executed with each block, in order to determine if it is still valid. If the mempool became full of such transactions, then the entire mempool would need to be re-calculated with each block. This would be extremely inefficient and a potential attack vector.

As it stands with CLVM's implementation, coin spends only need to be executed once. The mempool can safely assume that the spend has not become invalid simply because time has passed, so there is no need to re-execute the code.

3. **To keep reorg logic simple** -- Small reorgs are rare in Chia, but still possible. If coin spends could become invalid with time, then they also could become invalid in a reorg. Any coin spends that depended on the original would then be invalidated. Sorting through the ripple effects of this behavior would require messy logic that would invalidate other spends, potentially even if they were only distantly related to the original.

Note that this problem doesn't exist when coin spends can only become _valid_ with time. In a reorg, an invalid spend could become valid; any resulting coin spends would also remain valid. As a result, there would be nothing to unwind.

4. **To prevent censorship** -- If someone attempts to spend a coin that is about to be made invalid, the farmer of the next transaction block could refuse to include that coin spend, thus making the coin unspendable _forever_. This is a slippery slope -- any coin spend that will become invalid in the future could be censored until the final valid timestamp or block has been reached. The only way to guarantee that such a coin is spendable would be for the owner to farm the block in which it is spent.

A related problem would occur if the coin spend didn't add a large enough fee to be included in the next block. This could be avoided by adding a larger fee, but the problem that a valid coin spend could become invalid still would exist.

**Recommended Solution**

Because of the problems listed above, any solutions to making a coin spendable _until_ a certain timestamp or block height would need to come from outside the core CLVM implementation.

Our current recommendation: First, create `Coin A`, which will run a `CREATE_COIN_ANNOUNCEMENT` condition when it is spent. Next, create `Coin B`, which uses the `ASSERT_COIN_ANNOUNCEMENT` condition for `Coin A`'s announcementID. A spend of `Coin A` will automatically invalidate any attempts to spend `Coin B` forever.

A similar (but slightly more complex technique) would be to use a singleton instead of a standard coin. Updating the singleton automatically would invalidate a coin spend, and the singleton could be reused to invalidate future spends. This technique could also be used to invalidate offers.

# Offers

## What are Chia Offers?

Chia Offers enable a decentralized, peer-to-peer trading of assets on the Chia blockchain. For more information, see our:

- [Technical reference document](https://chialisp.com/offers)
- [GUI (graphical user interface) tutorial](https://devs.chia.net/guides/offers-gui-tutorial)
- [Video - Offers GUI Demo](https://youtu.be/Z2FoZSNtttM)
- [CLI (command line interface) tutorial](https://devs.chia.net/guides/offers-cli-tutorial)

## After creating an offer file, why does my spendable balance differ more than the amount specific in the offer?

When you create an offer, [coins are reserved](https://chialisp.com/offers#offer-states) to ensure that when the offer has been accepted and written on to the blockchain, the transaction can be completed. Chia’s wallet will reserve the largest coin to fulfill an offer, and when that coin is reserved, it will lower the spendable balance by the total coin amount.

## I plan on making many offers and I want to ensure that my coins aren’t locked up?

To create smaller coins, send money to your own wallet in smaller denominations. For more info, see our [reference doc](https://docs.chia.net/puzzles/offers#coin-set-utxo).

## When canceling an offer, when should I check the "cancel on blockchain" checkbox?

You should use this option if the offer file has left your computer. If you don’t use this option, someone who sees your offer could still accept it. See our [reference doc](https://chialisp.com/offers#cancellation) for more info.

## If I cancel my offer on the blockchain, will other people be able to fulfill it?

No, canceling on the blockchain ensures that your offer can no longer be fulfilled.

## I’m accepting an offer, but it shows a Unknown CAT, what should I do?

You should always check the ID of the asset(s) being offered before accepting any offers. First make sure you have a CAT wallet set up for the assets that you are trading for and are getting that information from a reputable source. Second, when you view the offer in the wallet, ensure the amounts and the CATs match up to what you are expecting. For more info, see our [GUI tutorial](https://chialisp.com/offers-gui-tutorial#taker-accepts-an-unknown-cat-offer).

## Where can I share my offers?

Once you’ve created the offer, you’ll need to find someone who will take the other side of it. You can share your offers through the following methods:

- Send your offer file directly to another user
- [HashGreen](https://hash.green/dex) - a decentralized exchange (DEX) that has been built upon Chia’s Offers
- [Offerbin](http://offerbin.io) - an open marketplace for Chia Offers
- [Keybase - chia_offers](https://keybase.io/team/chia_offers) - #offers-trading channel is a forum where Chia Offers can be posted and accepted
- [Offerpool.io](https://offerpool.io/) - an open-sourced, decentralized offers database built on top of OrbitDB and IPFS

## Why am I seeing the following error when trying to share an offer to Keybase: "Failed to upload offer to Keybase:..."?

Please ensure that you have joined the chia_offers group first before hitting the "share" button.

## Why do I see this error in Keybase when I click to Join Chia_Offers - "This team does not exist or it has no public information available"?

Ignore this error as this is a Keybase error, so long as you click on "Join Chia_offers", you will get successfully added to the team to post or view offers.

## Why don’t I see the offers option in my wallet?

You are probably running the wallet that comes installed with the full node. Be sure to download the standalone lightwallet [here](https://www.chia.net/download/#light-wallet-beta) (and be sure not to install on the same machine as your full node). We will be integrating the new capabilities of the standalone light wallet into the full node so you can farm and use all the new features of the wallet Soon™.

## How do I know if I’m getting the right exchange value for an offer?

Prices in cryptocurrencies fluctuate all the time. You can review any of the existing DEXes like Hashgreen or Offerbin to see what trading pairs are trading for in the open market. Alternatively you can find a reputable website that will give you the currency valuation for more popular and well known currencies like USDS.

## Will my Offers sync across different Chia wallets on different machines?

No, Offers are created and stored locally on each machine. Any accepted offers will only be seen by other computers through the transaction history list.

## Can my coin be spent on another computer with a wallet that uses the same keys, even if I am running two wallets on two different computers and I have an open Offer on one computer?

Yes, the coin can be spent from another computer. Coins are reserved locally on the computer where the offer was created. If that coin is spent from another computer, then the offer will be canceled. In general, it is recommended that you don’t use two machines to access the same wallet that offers are being made from.

## What is the Duck Sauce CAT?

The duck sauce CAT was the internal codename for the Stably USDS token until it was announced. Please be sure you have the correct TAIL for the Stably USDS token:

---

# NFTs

## What are NFTs?

Non-Fungible Tokens have become extremely popular in the last few years. [This site](https://www.simplilearn.com/tutorials/blockchain-tutorial/what-is-nft 'Basic NFT Explanation') gives a beginner-friendly explanation of what NFTs are.

## How do I buy NFTs?

Chia NFTs make use of a unique feature: [Offers](https://chialisp.com/offers). You may already have used Offers to trade XCH and CATs, but to summarize, they enable the trustless, peer-to-peer exchange of assets on Chia's ecosystem, with no involvement from central parties or intermediaries. And now you can use them to buy and sell NFTs, as well. Simply click the Offers button in your Electron wallet, then click "Create an Offer" and "NFT Offer". We’ll have a more detailed guide that includes all of the options soon.

## How can I make an NFT offer using the CLI?

The CLI commands for NFT offers are almost the same as [those for CAT offers](https://chialisp.com/offers-cli-tutorial#create-a-single-token-offer). The main difference is that you have to include the NFT singleton's value after the NFT ID (typically this is `:1`). For example, to make an offer, you can run:

`chia wallet make_offer -o 1:0.1 -r nft1g5gzj3hl9gdyrq83zveepf8wmeet8mxl8zutfyahs0wfkg9mcs9qepc4w5:1 -p test.offer -m 0.001`

The result is:

```
Creating Offer
--------------

OFFERING:
  - 0.1 XCH (100000000000 mojos)
REQUESTING:
  - 1 nft1g5gzj3hl9gdyrq83zveepf8wmeet8mxl8zutfyahs0wfkg9mcs9qepc4w5 (1 mojos)
Offers for NFTs will have royalties automatically added.  Are you sure you would like to continue? (y/n): y
Confirm (y/n): y
Created offer with ID 55314ee65db39c173de05873138440c48525eac39fd4a622fd766b3bb4ab02ff
Use chia wallet get_offers --id 55314ee65db39c173de05873138440c48525eac39fd4a622fd766b3bb4ab02ff -f 2118200991 to view status
```

To view your new offer, run the `get_offers` command that was output upon the offer's creation. Using the above example:

`chia wallet get_offers --id 55314ee65db39c173de05873138440c48525eac39fd4a622fd766b3bb4ab02ff -f 2118200991`

The result is:

```
Record with id: 55314ee65db39c173de05873138440c48525eac39fd4a622fd766b3bb4ab02ff
---------------
Created at: 2022-07-12 11:27:17
Confirmed at: 0
Accepted at: N/A
Status: PENDING_ACCEPT
---------------
```

## How can I take an NFT offer using the CLI?

Continuing with the previous example, we can run the `take_offer` command from the wallet that owns the NFT:

```
chia wallet take_offer test.offer
Summary:
  OFFERED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
  REQUESTED:
    - 45102946ff2a1a4180f1133390a4eede72b3ecdf38b8b493b783dc9b20bbc40a: 0.001 (1 mojo)
Included Fees: 0.001
Would you like to take this offer? (y/n): y
Accepted offer with ID 11abdc8b7bb241303d2f0c909860785e0e09a842fb6178bdf6527c99e37f3d35
Use chia wallet get_offers --id 11abdc8b7bb241303d2f0c909860785e0e09a842fb6178bdf6527c99e37f3d35 -f 757927417 to view its status
```

Use the suggested command to view the offer's status:

```
chia wallet get_offers --id 11abdc8b7bb241303d2f0c909860785e0e09a842fb6178bdf6527c99e37f3d35 -f 757927417

Record with id: 11abdc8b7bb241303d2f0c909860785e0e09a842fb6178bdf6527c99e37f3d35
---------------
Created at: 2022-07-12 11:41:50
Confirmed at: 1241919
Accepted at: 2022-07-12 11:41:50
Status: CONFIRMED
```

## Can I send an NFT to an XCH address?

Yes. Just as with XCH and CATs, you can send NFTs to an XCH address. If the recipient doesn't have an NFT wallet, one will be created automatically.

## How do I sell my NFTs?

As with buying NFTs, you can also sell them using Offers. Simply create an Offer in your Electron wallet, then send it wherever you want, including to our community galleries and marketplaces such as [MintGarden](https://mintgarden.io/), [Dexie](https://dexie.space/markets), [SkyNFT](https://skynft.org/index.php), and [SpaceScan](https://www.spacescan.io/). If an Offer file is modified, then that copy is no longer valid. This means that you can share your Offers with confidence -- the only thing a "thief" can do with your Offer is accept it.

## What is the difference between a transfer and a sale?

A sale involves using an offer, which in turn requires an NFT to be exchanged for XCH (support for CATs will be added later). Any time you want to buy or sell an NFT, you will create or accept an Offer. Royalties are built into the NFT, so they will automatically be accounted for when the offer is created/accepted.

A transfer is where you move an NFT from one address to another. No money is exchanged, and there are no royalties. The two main use cases for transferring an NFT are

- Moving an NFT to another wallet that you own
- Giving an NFT away for free

## Do I need a new wallet address in order to receive NFTs?

No. You can send and receive NFTs from the same address you have used in the past. One caveat is that if you send an NFT to an address that is currently running on a pre-1.4 wallet, your wallet won’t _recognize_ the NFT. However, the NFT will be safely kept inside your wallet, and it will become accessible after you upgrade to version 1.4 or greater.

## How do I mint an NFT?

If you are comfortable using a command line interface (CLI), then you can follow our [dev guide](https://devs.chia.net/guides/nft-intro/) to mint an NFT. If you prefer a browser-based minting tool, you can use [SkyNFT](https://skynft.org/login.php) for a nominal fee. Other community-developed marketplaces will also offer minting services soon.

## Can I mint an NFT with a URL that includes a comma?

Yes, but you need to use an RPC. If you use the CLI command, the comma will be interpreted as a delimiter -- two separate URLs will be created. However, even though URLs that include commas are generally not recommended, they should work with the RPC command. You don't even need to escape the comma or use extra quotes. But, as with all things NFT-related, you should test this functionality on the testnet before attempting it on mainnet.

## What does it mean to self-custody an NFT?

On other blockchains, NFTs are typically custodied in a marketplace. This is akin to having an account with a company. The marketplace has a reputational motivation to keep your NFT safe and secure, but your NFT is still in their hands.

_Self custody_ means that you have control over your own assets. The same mantra of "Not your keys, not your coins" also applies to NFTs. When you self-custody your Chia NFTs, it means that they are controlled by _your_ keys, and therefore they are _your_ assets.

## Where does my NFT live?

There are two components of a Chia NFT: on-chain and off-chain.

**On-Chain:** An NFT is a special type of coin called a "singleton". It contains three lists of URIs, which link to:

1. The NFT's data. This is typically an image file.
2. The NFT's metadata. This is typically a JSON file containing information about the NFT.
3. The NFT's license. This is typically a text file the spells out what rights the NFT's owner has.

The URI lists can only be prepended to; existing URIs cannot be modified or deleted.

For security purposes, each NFT contains a hash of the data represented by each of the corresponding URIs. The hashes can never be modified after minting.

**Off-Chain:** The actual NFT image lives in at least one location online. It can be stored under any number of URI protocols, including (but not limited to) http, https, ftp and ipfs.

Because Chia NFTs use a _list_ of URIs (as opposed to a single one), the image can be stored in multiple locations. This is important for preserving an NFT's permanence because a single link could break.

For high-end NFTs, you may even want to store the image offline. Why would you do this? Let’s say each of the online links is broken. As long as you (or anyone else) has a copy of the image, you can upload it and add a new link to the NFT. As long as the image’s hash matches the hash that’s built into the NFT, the new image is guaranteed to be identical to the original, and therefore valid. It is for these reasons that we believe NFTs on Chia will have stronger permanence than on any other blockchain.

The same rules apply for the metadata and license information. They can exist in multiple locations, but their hashes may not be modified after the initial minting. This prevents future owners from modifying this information, even though they can add new links.

The metadata URI can provide a wide variety of information about the NFT, including its title, properties (eg - year created, attributes, colors used, etc), rankings (eg - power: 25 out of 100, etc), collection name, as well as series number (eg - 1 of 100). The NFT’s minter is free to include whatever information they want at the time of minting. The NFT1 spec allows different metadata formats to be developed. At the time of this writing, almost all NFTs use [this proposed format](https://github.com/Chia-Network/chips/pull/26), which allows marketplaces to parse the metadata more easily.

The license URI can provide any relevant information concerning the NFT’s license, such as who owns the Intellectual Property.

## Can I add new links?

You can add new URIs to the data, metadata and license URI lists of any NFT you own. The new URIs will always be prepended to the list (added to the front of the list).

## After the NFT has been minted, is there a limit to how many links I can add at a time?

Yes -- you can only add one link at a time. After the transaction has been processed, you can add another link.

## Is there a limit to the total data size of the metadata?

No. (Well, you can't have infinite data, but Chia doesn't enforce any limits.)

## Is there a limit to the number of links?

Chia doesn't enforce a limit. However, because the links are contained within the NFT, as you add links, the size of the NFT also grows. If you were to add thousands of links, the NFT would eventually grow so large, it wouldn't fit inside a block and would no longer be spendable. If you only wanted to add a few dozen links, you would not run into this limitation.

## Are all the links posted on every spend, or only when adding them?

On Chia's blockchain, everything is a coin. This includes XCH, CATs, and NFTs. Whenever any coin is spent, the original puzzle is revealed. Therefore, with NFTs, every link is posted on every spend.

## Can I modify links?

You cannot modify or remove any existing URIs, or their corresponding hashes. This was a design decision to keep NFTs from being arbitrarily modified after their minting.

## Does an NFT transaction take longer than an XCH (or CAT) transaction?

In Chia, all transactions within a single block are processed simultaneously. As long as your NFT makes it into a block, it will take the same amount of time as any other transaction to process. The only caveat is that NFTs have a higher CLVM cost than XCH transactions. Therefore, if the mempool is full, a higher fee will be required in order for an NFT to be included in a block. However, if the mempool is not full, then this caveat does not apply.

## How much is the fee for minting/selling an NFT?

If the mempool is not full, then no fee is needed. If the mempool is full, then in order for your transaction to be included into the next block, you'll need to add a fee of at least 5 mojos per cost. The recommended minimum fee in this scenario is:

- Minting an NFT with a DID: 615 million mojos
- Transferring/selling an NFT: 335 million mojos

For other scenarios, see [our NFT developer documentation](https://devs.chia.net/guides/nft-intro/).

## What happens if exactly the same `nft mint` command is executed twice?

Then two separate NFTs will be created. They will have different IDs, but everything else will be identical.

## How do royalties work?

An NFT’s royalty percentage and receive address may optionally be included in an NFT upon its minting. After the NFT has been minted, the royalty may never be modified. If an NFT includes a royalty, then every time the NFT is sold, the appropriate percentage of the sale will be paid to the royalty’s receive address (typically the address of the original artist). The amount paid both to the new owner, as well as the royalty address, will be clearly displayed within the Offer.

On other blockchains, royalties are paid at the discretion of the marketplace on which the NFT is custodied. If an NFT is custodied outside of any marketplace, then royalties are not possible. On Chia, however, the royalties are built directly into the NFT. While under-the-table transfers could still circumvent royalties, they would also introduce counterparty risk for both the buyer and seller. In order to transfer a Chia NFT in a trustless manner, royalties must be paid.

## Can I use more than one royalty address?

An NFT can include a maximum of one royalty address. However, because the royalty address can be any XCH address, the address can correspond to a smart coin that splits all royalties between multiple recipient addresses.

## Are royalties paid upon transferring an NFT?

No. Transfers are conducted without any royalties being paid.

## What is the Chia Friends project?

Chia Friends is a giveaway of 10,000 NFTs, beginning with the release of Chia version 1.4. While Chia Network Inc will give these NFTs to 10,000 lucky recipients for free, they can later be bought or sold just like any other NFT. There will be a royalty included with these NFTs, 100% of which will automatically be sent to the Marmot Recovery Foundation. For more information, see the [Chia Friends website](https://www.chiafriends.xyz/).

## Can I donate directly to the Marmot Recovery Foundation?

You sure can! [The Marmot Recovery Foundation website](http://marmots.org/how-you-can-help/donate-now/) lists a variety of ways to donate to the cause of saving the Vancouver Island marmot from extinction.

## Is Chia Friends the same as the Holiday 21 token?

No. It’s a completely different project. The Holiday 21 token giveaway is coming later.

## Why do I have a Profile in my wallet?

The Profile in your wallet is a Decentralized Identifier (DID). These can be used for tracking an NFT’s provenance (history). Each NFT can be assigned to one DID. Though not strictly required, most NFTs will use DIDs for their added provenance. You can create a new DID by clicking the Settings button (the gear icon) in the lower left corner of Chia’s Electron wallet.

## Do I need to have a Profile to own/trade an NFT?

No. NFTs can be left unassigned to a Profile.

## How do I use the CLI for creating and using DIDs and NFTs?

Our [dev guide](https://devs.chia.net/guides/nft-cli/) will walk you through creating DID and NFT wallets, minting an NFT, adding links and transferring your NFT, all using the CLI. In addition to the dev guide, we have a complete reference with all CLI commands for using [DIDs](https://docs.chia.net/13cli/did_cli/) and [NFTs](https://docs.chia.net/13cli/nft_cli).

## What RPC functionality is available for DIDs and NFTs?

We also have a [dev guide geared at using RPCs](https://devs.chia.net/guides/nft-rpc). For more details about each of our individual RPCs, see our reference for [DIDs](https://docs.chia.net/12rpcs/did_rpcs/) and [NFTs](https://docs.chia.net/12rpcs/nft_rpcs/).

## What limitations, if any, are there for NFT1 on Chia's blockchain?

- For now, you can only transfer NFTs for free or exchange them for XCH. Eventually we plan to add the ability to trade NFTs for other NFTs and CATs.
- For now, you can only mint one NFT per block if you’re using Chia’s CLI or RPCs. We are currently working on a bulk minting tool that will address this. If you attempt to mint more than one NFT in a single block, you’ll receive `{'error': 'ALREADY_INCLUDING_TRANSACTION'}` as a `WARNING` in your log file. The CLI will indicate a successful transaction; it will not show this warning. The reason for this is because the mempool is rejecting your transaction, which happens after the wallet submits it. The transaction will be stuck in the Pending state.
  - Workaround: After minting an NFT, wait for the transaction to clear (approximately 1 minute) before attempting to mint another NFT. If you do see a Pending transaction in your wallet that doesn’t clear after several minutes, then you can remove it by doing the following:
    - GUI - Click the "Actions" dropdown and click "Delete Unconfirmed Transaction"
    - CLI - Run chia wallet delete_unconfirmed_transactions

## Are there any security concerns I should consider?

Unfortunately, fraud and outright theft are common in this space. If you take a few basic precautions, you’ll have a much better chance of keeping your NFTs safe:

- Never give away your wallet’s seed phrase. If anyone asks for it, they are attempting to scam you.
- When viewing an offer for an NFT, always check its provenance. The links to do this are located below the image when viewing it in an offer. An NFT’s provenance is a complete record of its ownership history. This helps to verify that the NFT is authentic.
- Avoid directly sending someone money in exchange for an NFT. Use offers whenever possible. Occasionally, legitimate projects may require you to send them a token in exchange for an NFT, but the most secure way to buy and sell NFTs is with offers.

## What recovery options are available if my NFT gets stolen?

If your NFT is stolen, then unfortunately there’s not much you can do, other than offer to buy it back from the thief or the current owner. This is why you should be extra diligent in avoiding theft in the first place, beginning with following the above tips.

## What is the stance on NSFW NFTs being created?

Chia Network Inc has no ability to censor content on the Chia blockchain. However, the metadata schema that most NFTs use includes a `"sensitive_content"` object, with a default value of `false`. This flag will indicate to wallets and marketplaces whether the NFT contains any sensitive content, which they can then use in deciding whether to display the NFT.

---

# Support/Miscellaneous

## What are the minimum officially supported OS versions?

- MacOS 10.14 Mojave
- Windows 10
- Ubuntu 18.04 (20.04 highly recommended)
- Raspberry Pi OS 64 or Ubuntu 20.04 for Pi/ARM64 (Not recommended for plotting or timelord)
- An SSD for storing the blockchain's database. A 256 GB model with 520 MB/s read/write speeds will work just fine and is available for around $30 USD (do not use an SD card as they are not fast enough)

## What versions of Python are supported?

- Starting with Chia version 1.3.5, Python versions 3.7-3.10 are supported
- For Chia versions prior to 1.3.5, Python 3.10 is _not_ supported. Only versions 3.7-3.9 are supported

## Can I use a fast SAS HDD for storing the blockchain's database?

A very high-end HDD _might_ be fast enough, but we still recommend a $30 SSD, as stated above. It can be an external SSD, connected via USB. The database is always growing, but 256 GB should be sufficient until at least 1H 2024.

## Can I run this on a Raspberry Pi 3 or 4?

Raspberry Pi 4 is supported, but Pi 3 is not. Here are the [instructions](/chia-on-raspberry-pi). This project requires a 64-bit OS. One can install and run harvesters, farmers, and full nodes on the Pi. Plotting on a Pi is feasible now with Chacha8 instead of AES, but the Pi isn't quick. Modern desktops and laptops plot in the 0.07 - 0.10 GiB/minute range and the Pi 4 plots at 0.025 GiB/minute. Pi is also not a candidate for Timelords or VDF clients...

## How do I upgrade and keep my keys and plots?

If you use the GUI, it will migrate from release to release for you. For both the GUI and the command line, your keys are stored on OS specific keychains. If running services from the command line only, `chia init` will migrate your config.yaml and dbs - if appropriate - to the new version. Keys and plots made before Beta 8 are deprecated and useless.

## What are the plans for the project and what are its tokenomics?

This is the Repository FAQ which focuses on how to use the software. We have released our [Business Whitepaper](https://www.chia.net/2021/02/10/chia-businesss-whitepaper.html) that goes into details of both the tokenomics, the pre-farm, and our go to market strategy. Additionally you can review the [Project FAQ](https://www.chia.net/faq/).

## How can I contribute?

You should check out [CONTRIBUTING.md](https://github.com/Chia-Network/chia-blockchain/blob/master/CONTRIBUTING.md) in the repository but the quick answer is to please base your pull requests off the dev branch. The dev branch will only accept rebase merges or squash merges. You can help [translate the application](https://crowdin.com/project/chia-blockchain/) as well. Translating the GUI is especially useful and pretty easy to do with our Crowdin [Chia-Blockchain-GUI](https://crowdin.com/project/chia-blockchain) tool.

## What microphone is Gene using?

Gene uses an [Electro-Voice RE20](https://products.electrovoice.com/na/en/re20).
