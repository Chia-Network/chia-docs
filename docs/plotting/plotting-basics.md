---
sidebar_label: Plotting Basics
title: Plotting Basics
slug: /plotting-basics
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

[todo Building bladebit needs cuda toolkit ≥ 11.8]

At the center of every Chia farm is a software process call a _farmer_, as well as at least one process called  a _harvester_. Each harvester keeps track of one or more _plots_ on the same computer. This section will give an overview of plots: what they are, how to create them, how to maintain them, etc. Later we'll delve deeper into the details.

:::info

The full node, farmer, and harvester processes can all be run from the same computer.

:::

Plots are files that consist almost entirely of cryptographic data. These files prove to the network that a user is storing data, and are used in the Chia Proof of Space consensus.

The Chia plotting process is computationally intensive. Depending on a number of factors, the plotting computer, CPU, GPU, RAM, and/or storage devices (such as SSDs) are heavily utilized. However, this process is only performed when _creating_ the plot. Afterward, plots can typically be farmed for many years, during which the farming computer, as well as the HDDs that store the plots, will remain mostly idle. For this reason, the minimum spec hardware to run a Chia farm is a [Raspberry Pi 4](/installation#raspberry-pi) with 4 GB of RAM.

:::info

It is possible to run a node without any plots. Your node will validate the network, but it will not be eligible to win any rewards. On the other hand, with a single plot, you can join a pool and collect regular (albeit small) rewards.

:::


## Requirements

### k value

_k_, as detailed in the [plotting](/proof-of-space#plotting) section, is a constant value that describes the size of each plot. The minimum k value for Chia is 32. For uncompressed plots (C0), the size of a k32 plot is 108.8 GB (101.4 GiB). It is also possible to farm with compressed plots (C1-9), which will be discussed in more detail later. With each increase in k value, the plot size is approximately doubled, as are the resources required for creating the plot. For this reason, k=32 is the most common size on the network, accounting for 98% of the Netspace.

Note that the minimum k value could be increased in the future in order to mitigate against [plot grinding](/consensus-attacks#replotting). However, there are currently no plans to do so. If any such plans were adopted, all users would likely be given a 1-year notice to upgrade their farms.

:::info

The sizes of uncompressed and compressed k values can be found on the [K Sizes page](/k-sizes).

:::

### Compressed plots

#### History

Chia plots consist of seven tables, the format of which was defined in mid-2020. The plots are compressed -- they consist almost entirely of random cryptographic data, and therefore cannot be compressed using lossless techniques such as "zipping". When Chia's mainnet was launched in March 2021, all new and existing plots were stored on disk in their final formats.

By the end of 2022, it had become apparent that a form of "lossy" plot compression was possible. A few different competing techniques were being devised that involved removing one or two tables, or some data held  within. The result was in incomplete plot that could be farmed by adding in the missing data in real-time.

Using these techniques, "compressed" plots could be created that were 20-30% smaller than their uncompressed brethren, depending on the level of compression used. These plots contained the same number of proofs as the full-size plots, and they earned the same rewards. But because they were smaller, more of them could fit on a disk, which meant that the farmer would earn extra income compared with using uncompressed plots.

#### Tradeoffs

As with most technologies, compressed plots come with tradeoffs, namely that they require more energy for farming than uncompressed plots. For C1-4, the extra energy is small, and a Raspberry Pi can still be used for farming. C8 and C9 plots are missing the first two tables, which require more energy to reconstruct. These plot compression levels therefore require a GPU for farming.

Higher compression levels might be possible, but they will not likely be beneficial to farmers. At a hypothetical C10 compression level, a plot almost needs to be entirely recreated while farming, effectively turning Chia's Proof of Space and Time consensus into Proof of Work.

The plot format was designed such that higher compression levels would yield linear gains in size, at a cost of an exponential increase in computational power required to create the plot. Because of this tradeoff, it is unlikely that better techniques will emerge to compress plots by more than a few percent beyond their current levels.

### Keys

To create plots, a farmer must know their **Farmer Public Key** and **Pool Contract Address**.

[todo demo how to create a public key]
[todo demo how to create a contract address]
A farmer must create a plotnft first to have a pool contract address.

These can be found with the following commands:

```bash
chia keys show
chia plotnft show
```

## Hardware

Plotting requires compute - the more compute, the faster the plot time. Chia farmers generally want to plot reasonably fast to get their storage space earning rewards faster. If you are using any of the disk methods, you will need an SSD with high endurance and sustained write performance, more details can be found in the endurance section.

| Plotter Type        | CPU  | GPU  | Temporary Storage | Memory    | Plot times    | Energy Efficiency |
| ------------------- | ---- | ---- | ----------------- | --------- | ------------- | ----------------- |
| GPU In-Memory       | Low  | High | None              | 256 GB    | 1-3 Minutes   | Highest           |
| GPU / Disk Plotting | Low  | High | 256 GB            | 64-128 GB | 3-5 Minutes   | High              |
| CPU In-Memory       | High | None | None              | 416 GiB   | 2-5 Minutes   | High              |
| CPU Disk            | High | None | 256-512 GB        | 4 GB      | 15-60 Minutes | Medium            |

## GUI Plotting

Start the process by clicking the green button saying **Add a Plot**.

1. You will choose a plotting software. Getting started plotting with Bladebit Disk is the easiest.

2. Starting size plot is k=32 (101 GiB)

3. Chose number of plots. If you're just learning, get started by creating just a single plot.

4. Select a temporary directory. You need a temp storage location of at least 500GB. If you only have 256GB you can use madMAx chia-plotter. This is where the temp space is filled and a lot of writing will be done. For many plots it is not recommended to use the same SSD as your primary.

5. Input number of threads (recommended system threads - 1), bucket count (recommended 64), and optional amount of additional ram cache, and select the alternating method

:::info
Enterprise and data center SSDs offer higher endurance and sustained write performance vs consumer drives, and can be found inexpensively second hand. Read more about recommendations at [SSD Endurance](/ssd-endurance).
:::

6. Select a final directory. This is where the final plot file will be copied to. Once the plot is created it will go to this location to be farmed to earn XCH. Storage will fill quickly due to the size of plots. Storage can be internal or usb connected drives.

:::info
Network drives can work but could congest your local network or be too slow to respond for rewards (the max is 30 seconds, but under 5 is ideal). It is recommended that you set the first `log_level` to `INFO` in `config.yaml` which will allow you to see extra information in `debug.log`.
:::

7. Join a pool - this will give you the option to select the plotnft you have already created.

8. Click **create** to start process.

## How to Get Help

- Get support on the [Discord](https://discord.gg/chia). **#beginner** and **#support** is where you can get help

- Get more questions answered in the [plotting FAQ](/plotting-faq).
