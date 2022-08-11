---
title: Plotting Basics
slug: /plotting-basics
---

**Keep it simple.** Focus on learning what Chia is and how to make _one_ plot. Once you do that, move on to doing more. It's easier to start simple than to do too much and get confused about what went wrong.

## The Basics of Chia to Get You Started

### Chia - Short Version

Chia is a new blockchain technology where your computer creates _plot_ files that you can _farm_ to potentially earn _chia_ (XCH) coins.

### Chia - Long Version

Chia is a new type of cryptocurrency that is based on the capacity of pre-stored random-looking data that the user creates and stores in files called _plots_. With Chia a very low resource-intensive process checks plot files for _proof of space and time_. This makes Chia very fast and green. It is an improvement over proof of work blockchains, which rely on fast graphic cards and custom machines doing millions of calculations per second and wasting a lot of electricity. Chia also has many improvements to scripting, scripting environment, cryptography, usability, and scalability, and aims to be a simple, secure, and powerful blockchain.

The Chia software is made up of several parts called **daemons**. Each daemon does different things. The daemons important to beginners are:

- node - This syncs your computer with the blockchain
- farmer - The farmer sends out proof requests to the harvester
- harvester - The harvester checks your plots to see if they satisfy the proof. If you have the best proof, you win coins.

## What to do as a beginner

For now, focus on installing the Chia software, setting it up properly, and learning how to make plots. There are two main things to get working:

- Making sure you are connecting to other nodes (other computers with the blockchain) and syncing with them.
- Starting making plots and farming.

The simplest way to start with Chia is to [install the Chia software](https://chia.net/download) on the operating system of your choice and run the GUI (Graphical User Interface). The Windows version automatically starts once installed, and the Mac version just needs to be opened from the Applications directory. Once the application is opened, it loads and starts to sync with the rest of the network and blockchain. Depending on your network setup, fully syncing can take over a day. Basically, you are syncing with everyone on the network, downloading the whole blockchain, which includes all transactions ever processed on the network. The Chia blockchain database copy will be stored on your computer. Everyone with Chia installed on their computer also has a copy.

### The Basics of Farming

Farming just means you have some plots and have the Chia software checking them periodically to see if they win a proof.

:::note Gigabytes (GB) vs Gibibytes (GiB)

You are going to see the unit _GiB_ used a lot. Just know that 1 Gibibyte is equal to about 1.07 Gigabytes (GB). Most hard drives are talked about with GB so please keep that in mind.

:::

Once Chia is installed, users will use the Chia application to create plots. There are multiple plotting softwares. The one we recommend starting with is madMAx Plotter. Depending on the hardware used, it can take over an hour to create a plot. For some it will be faster. The user stores these plots on computer equipment and then farms the created plots for the potential to earn coins.

There are multiple options for the plot size. We recommend going with k=32. Larger is ok, but k=25 is not a valid plot size for farming.

<p align='center'>
  <img alt='plot sizes' src='/img/plot-sizes.png' width='500' />
</p>

We also recommend you create the plot to a Plot NFT. This will allow you to join a pool, switch pools, or self pool.

Inside each plot is a large number of pre-formulated calculations stored in a large table (spreadsheet) of blocks called (hash) cells. You win potential coins by providing the winning pre-formulated (hash) code to allow the transaction to occur. The winning transaction is very quickly done within 2-3 seconds and the user is compensated with coins to facilitate the transaction. Plots have many (hash) cells inside so if one wins there is still many left that can win. In other words, you do not need to delete a plot if it wins you coins. Plots can keep earning you coins.

### The CLI - Command-line Interface

The [CLI](/clis) is the more advanced way to use Chia. The CLI can do everything the GUI can do and more (like better utilize your hardware to optimize plotting). It is recommended you start with the GUI to understand the basics of Chia before starting to use the CLI.

## Setting Expectations

Once you have completed plots and are farming, you will see **Time to Win** in the farming tab. Whatever time it shows here is just an estimate. It might take 3 to 4 times longer than the time shown. For example, if it shows 2 days, it might take 5 or 8 days, sometimes even more to earn your first coin or partial coin. This is normal as luck plays a role over the short run. As you add more plots, the "time to win" decreases (more chances of winning).

This is another reason we recommend creating your plots to a plot NFT. By doing this, you have the ability to join a pool and get consistent payouts regardless of your estimated time to win. With the pooling protocol, the estimated time to win refers to just 12.5% percent of the block reward which always goes to the farmer.

## The GUI - Graphical User Interface

### Full Node Tab in the GUI

This shows the blockchain movement. It shows that you are in sync with the blockchain. A copy of the blockchain is stored on your computer. You have a live copy that is continually syncing with everyone else in the network.

- _Blocks_ : This is the blockchain working
- _Connections_ : Those are the connections to you and other users and their computer (nodes)

### Wallet tab

You will see your Chia coins here as they are won

- _History_ : you can see the time/date you earned coins or partial coins

### Plots tab

This is where you create plots. The accepted plot size starts at 101 GiB each. Called a k32 - 101 GiB/109 GB plot.

- **GiB** is gibibytes and is the old school way computers measured space. The new hotness - especially from hard drive manufacturers - is to measure in gigabytes. Since gigabytes are based on 1000 and gibibytes are based on 1024, GB is always 1.074 times larger than GiB.

- You can think of each plot as a collection of bingo cards, which have a chance of winning blocks, and thus winning you coins. Your computer creates these large 101 [GiB](https://simple.wikipedia.org/wiki/Gibibyte) plot files (approx 108 GB - gigabytes). Inside are large tables (like Excel spreadsheets) where each cell has a random pointer to another cell in the table. This is what the computer is doing, and why it takes so long to create the plot. It is running calculations and putting the “answers” in these millions of cells. There are different sizes of plots but you only need to work with k=32 plots. k=33 and above are not necessary. You can read more about [k-sizes](/k-sizes).

### Farm tab

This will show you how many plots you have created. On the top it will show how much Chia have been farmed. It also shows how many GiB of plots you have on the network. For example, you have 2 plots of 101 GiB created. Then it shows on the top left **Total size of Plots** as 0.2 [TiB](https://en.wikipedia.org/w/index.php?title=Tebibyte&redirect=no). This means you offer 0.2 TiB to the Chia network. It is calculated as 101 GiB x 2 = 202 GiB.

- _Latest Block Challenges_ : This shows the latest challenges and signage points, which can be thought of as mini lotteries. Every 9 seconds, there is a new signage point, which means there is a new opportunity for you to check your plots and see if you've won. Every other signage point will be a winner for someone on the network so there is a new block created about every 18 seconds.

- **Last Attempted Proof** is important: It is a 2 step process.

  - **Step 1** - Plot passes filter test.

  - **Step 2** - Selected Plot is checked for winning hash. What this looks like in the GUI: In the _Last Attempted Proof_ section you have a list of five lines. Suppose you have 157 plots – each of the five lines read 0/157. Once in awhile a plot might get selected. If a plot is selected or a 2nd plot is selected that is good news and the number changes to 1/157 or 2/157 maybe 3/157. After passing the filter, each selected plot will go through a "quality lookup," which does approximately 7 reads on your plot, and tells you whether the plots have won. If you won, it does not show any indication as the transaction is done quickly. Your wallet increases.

Once that match shows on the first line, it will move down to lines 2-5, then if another plot passes step 1, it starts at the top also, and moves its way done the filter process.

Winning is very rare, and on average one person wins in the whole world every 18 seconds. On every signage point (9 seconds), all of your plots are checked to see which ones passes the [plot filter](/faq#what-is-the-plot-filter-and-why-didnt-my-plot-pass-it). Approximately 1/512 of all plots will pass the plot filter for each challenge, so here you can see how many of your plots passed. With a new block every 18 seconds there are 4,608 chances to win chia every day.

If for some reason those lines stop moving that is another indication you are not in sync with the database and need to resync—see below.

# Using the GUI

## Create a plot

Start the process by clicking the green button saying **Add a Plot**.

1. You will choose a plotting software. Getting started plotting with madMAx is the easiest. You can plot single plots in series fairly quick.

2. Starting size plot is k=32 (101 GiB). You need a temp storage location of at least 239 GiB (256 GB) to create the plot.

3. Chose number of plots. If you're just learning, get started by creating just a single plot.

4. Select a temporary directory. This is where the temp space is filled and a lot of writing will be done. For many plots it is not recommended to use the same SSD as your primary.

:::info
The suggestion is to use an added SSD to create plots and not the primary hard drive (especially for non-replaceable NVME like on some Mac or Windows laptops)
If for some reason a plot fails to complete, it has to be deleted by deleting all of its temp files. If plotting multiple plots at once, be careful not to delete the temp files of another plot that's being plotted.

Make sure you are aware of [SSD Endurance](/ssd-endurance).
:::

5. Select a final directory. This is where the final plot file will be copied to. Once the plot is created it will go to this location to be farmed to earn chia. Storage will fill quickly due to the size of plots. Storage can be internal or usb connected drives.

:::info
Network drives can work but could congest your local network or be too slow to respond for rewards (the max is 30 seconds, but under 5 is ideal). It is recommended that you set the first `log_level` to `INFO` in `config.yaml` which will allow you to see extra information in `debug.log`.
:::

6. Join a pool. This is a recommended option even if you decide to self pool.

7. Click **create** to start process.

### How Plots are created

There are 4 phases that do operations in 7 tables.

Phases:

1. **Computing tables 1 to 7:** It creates the buckets (default: 128) as files on your temp directory, when the 7 tables are computed the plot time progress is about **42%**
2. **Back propagation tables 7 to 1:** When the 7 tables are back propagated the plot time progress is about **61%**
3. **Compression of tables 1 to 7 in pairs:** When the 7 tables are compressed the plot time progress is about **98%**
4. **Write checkpoint tables:** Transfers your plot to your permanent drive. It will delete all the files in your temp storage and this completes the progress to **100%**

| Phase | Step                       | % Progress |
| :---: | :------------------------- | ---------: |
|   1   | Computing table 1          |         1% |
|   1   | Computing table 2          |         6% |
|   1   | Computing table 3          |        12% |
|   1   | Computing table 4          |        20% |
|   1   | Computing table 5          |        28% |
|   1   | Computing table 6          |        36% |
|   1   | Computing table 7          |        42% |
|   2   | Backpropagating on table 7 |        43% |
|   2   | Backpropagating on table 6 |        48% |
|   2   | Backpropagating on table 5 |        51% |
|   2   | Backpropagating on table 4 |        55% |
|   2   | Backpropagating on table 3 |        58% |
|   2   | Backpropagating on table 2 |        61% |
|   3   | Compressing tables 1 and 2 |        66% |
|   3   | Compressing tables 2 and 3 |        73% |
|   3   | Compressing tables 3 and 4 |        79% |
|   3   | Compressing tables 4 and 5 |        85% |
|   3   | Compressing tables 5 and 6 |        92% |
|   3   | Compressing tables 6 and 7 |        98% |
|   4   | Write checkpoint tables    |       100% |

## Proofs

`Proof`: It is found inside the plot. Millions of "excel blocks" with formulas called proofs of space.
The Chia software is designed to work on a lottery system. A key element to winning the lottery of earning coins is that the more plots you have, the more proofs you have, and therefore the higher chances of winning. Someone with 1% of all the plotted space, will win about 1% of all the blocks. There are about 4608 blocks per day, each rewarding 2 new chia, so 9216 chia are created per day.

The Chia farming software gets a challenge, lets say 2021. It’s going to look through lookup tables on the front of the plots. Find the closest to 2021 and this is where the time comes into play. That proof (excel block hash) has a certain quality, and only proofs that are of a certain quality or better are eligible for winning.

What makes Chia different from proof of work blockchains is the consensus algorithm called proof of space and time. Basically as after the farmer creates a proof of space and a block, other computers called timelords add proofs of time to the block, which is a cryptographic proof that says that a certain amount of time (like 30 seconds) has passed. So instead of the whole world mining at the same time, only a few computers are "mining" for each proof of space that won. Since these are all cryptographic proofs, they cannot be forged or broken, making the consensus extremely secure.

In Chia, the only electricity required is the electricity to create the plots, and to run the hard drives, which is on the order of 10 watts per drive to power, plus CPU power required to run a full node (which is very light). In comparison, blockchains like Bitcoin and Ethereum rely on huge farms of GPUs (potentially up to 300W each) or ASICs (hundreds or thousands of watts per machine) to secure the blockchain. You can think of proof of work, as millions of computers "making" lottery tickets by using electricity, but each ticket can only be used once. Chia will use vastly less electricity as the only electricity required is the initial setup (plotting) and 10W for farming a drive.

## Computer Hardware

On an older computer you can purchase a PCIe adapter card-to take NVME/SSD drive as the new temp folder. This is internal to the PC. Some have tried to use a usb or firewire attached NVME/ SSD with some success.

One item to plan for is storage of plots as they fill storage quickly. As more plots are created, the discussions start to turn to terabytes of data storage instead of gigs of storage. Many use usb attached external drives for storage, internal drives, or external rack storage with many drives.

## How to Get Help

- Continue reading these docs! If needed, [start with the basics](/quick-start-guide).

- Get support on the [Chia Keybase chat channels](https://keybase.io/team/chia_network.public). **#beginner** and **#support** is where you can get help

- Get more questions answered in the [plotting FAQ](/plotting-faq).
