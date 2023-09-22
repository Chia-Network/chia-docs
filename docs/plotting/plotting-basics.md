---
sidebar_label: Basics
title: Plotting Basics
slug: /plotting-basics
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

:::note

The [Beginner's Guide to Farming](/farming-guide) will walk you through the steps required to install Chia and create your first plot. You are recommended to follow it prior to getting into the concepts introduced in this section.

:::

At the center of every Chia farm is a _farmer_, as well as at least one _harvester_. Each harvester keeps track of one or more _plots_ on the same computer.

This section will give an overview of plots: what they are, how to create them, how to maintain them, etc. Later we'll delve deeper into the details.

:::info

The full node, farmer, and harvester processes can all be run from the same computer. This is the recommended setup for those new to Chia farming. Later, plots can be added or moved to remote harvesters as needed.

:::

## Description

Plots are files that consist almost entirely of cryptographic data. These files prove to the network that a computer is storing data, as part of Chia's Proof of Space consensus.

The plotting process is computationally intensive. Depending on a number of factors, the plotting computer, CPU, GPU, RAM, and/or storage devices (such as SSDs) are heavily utilized. However, this process is only performed when _creating_ a plot. Afterward, plots can typically be _farmed_ for many years, during which the farming computer, as well as the HDDs that store the plots, will remain mostly idle.

While it is possible to run a Chia farm from a high-end plotting machine, many farmers choose to use low-end systems in order to save money on electricity. For example, the minimum spec hardware to run a Chia farm is a [Raspberry Pi 4](/installation#raspberry-pi) with 4 GB of RAM. As a result of these low requirements, Chia consumes less than 1% as much energy as Bitcoin, while preserving the same level of security. For more details, see [chiapower.org](https://chiapower.org/).

:::info

It is possible to run a node without any plots. Your node will validate the network, but it will not be eligible to win any rewards. On the other hand, with a single plot, you can join a pool and collect regular (albeit small) rewards.

:::

## Compressed plots

In 2023, some major changes were made to the plotting process, mostly due to the introduction of "compressed" plots.

:::info

Technically, **all** Chia plots are compressed -- they consist almost entirely of random cryptographic data, so they cannot be made much smaller using lossless techniques. However, in order to simplify the descriptions, we'll use the following terms for the different types of plots:
* **Uncompressed** -- Plots that are complete upon being created. Software capable of creating uncompressed plots includes the original ChiaPos, madMAx, and BladeBit RAM and disk. Nearly all plots created prior to 2023 are uncompressed.
* **Compressed** -- Plots that are incomplete upon being created. Software capable of creating compressed plots includes BladeBit CUDA and GigaHorse. Compressed plots were introduced to the official Chia software in version 2.0.

:::

### History

Chia plots consist of seven tables, the format of which was defined in mid-2020. The reference plotter included with version 1.0 was ChiaPoS, which only used one CPU core, and which produced uncompressed plots. When Chia's mainnet was launched in March 2021, all Chia plots were created with the ChiaPoS plotter.

Later in 2021, the madMAx and BladeBit plotters were developed independently. These plotters fully utilized a plotting machine's resources, so they were significantly faster than the ChiaPoS plotter. For the first time, it became possible to create a plot entirely in RAM, thus eliminating the need for an enterprise SSD. However, these second-generation plotters still exclusively created uncompressed plots.

By the end of 2022, it had become apparent that a form of "lossy" plot compression was possible. A few different competing techniques were being devised that involved omitting one or two tables, or some data held  within, during the plotting process. The result was an incomplete plot, where the missing data could be added during the farming process. These techniques allowed plots to be 20-30% smaller than their uncompressed brethren, depending on how much data was omitted at the time of plotting.

:::info

There are two basic types of compression -- lossless and lossy. For a brief overview of the differences, see [this article](https://www.howtogeek.com/744381/lossy-vs-lossless-compression-whats-the-difference/). While compressed Chia plots don't actually use lossy compression, it still can serve as a useful analogy to how it works.

:::

Plot "compression" is possible because the data contained within a plot is deterministic. A plot's ID -- a 32-byte hash -- is all that is needed to determine the entirety of its contents. In other words, if you use the same ID (and k-value, as will be discussed later) to create plots on two different computers, the plots will be identical. It is therefore possible to generate any missing data on the fly. This, combined with other techniques such as brute-forcing a small number of bits, results in the plots being smaller.

By mid-2023, most new Chia plots were being created using these "compression" techniques. Each individual plot earns the same rewards as an equivalent uncompressed plot. However, because the compressed plots are smaller, more of them fit on each disk. Farmers therefore earn extra income compared with using uncompressed plots.

### Tradeoffs

As with most technologies, compressed plots come with tradeoffs. The fact that they are left incomplete upon being created means that they require more energy to be "completed" while farming. Luckily, the lower levels of compression only require a small amount of extra energy, while yielding 15% more rewards. On the other hand, plots using the highest levels of compression require more compute while farming, thus necessitating the use of a GPU.

Chia's plot format was designed such that higher compression levels would yield linear gains in size, at a cost of an exponential increase in required computational power. Because of this tradeoff, it is unlikely that better techniques will emerge to compress plots by more than a few percent beyond their current levels. For deeper levels of compression to become viable, another table would need to be omitted. At that point, it would take longer for a farmer to finish a compressed plot than it would for a plotter to create an entire uncompressed plot.

## K Sizes

_k_, as detailed in the [plotting](/proof-of-space#plotting) section, is a constant value that describes the size of each plot. The minimum k value for Chia is 32, which corresponds to 108.8 GB (101.4 GiB) for uncompressed plots. With each increase in k, the plot size is approximately doubled, as are the resources required for creating the plot. For this reason, k32 is the most common size on the network, accounting for 98% of the netspace.

:::info
k32 is the minimum plot size eligible for farming on Chia's **mainnet**. If you want to test plotting and/or farming on a **testnet**, then it is also possible to use k25. These plots are only around 660 MB apiece, so they can be created quickly on a laptop.
:::

Although not required, plots larger than k32 may be created. There is not a great benefit to using larger plot sizes as the chance of winning is proportional to plot file size. For example, a k33 plot is twice as large as a k32 plot, and it wins twice as many rewards. There are advanced tactics to using a larger `k` value to reduce unused storage space or optimize drive idle states, but these won't be highly beneficial for the majority of people.

### Compression Levels

The level of compression you choose will be highly dependent on your farming setup. The good news is that even those using a Raspberry Pi for their harvesters will be able to take advantage of the lower levels of compression. Additionally, each step up in compression level requires an exponential increase in computing power, while yielding a linear decrease in plot size. For these reasons, those who are farming with a Raspberry Pi can yield 20% higher rewards by using compressed plots, while those using the most powerful GPUs will see a modest increase over the benefits obtained by the Pi. Namely, C9 plots yield 35% higher rewards than C0 plots.

The next page will detail the various types of hardware that can be used for creating Chia plots. Later, we'll discuss the specific compression levels, including the hardware required to yield each increase in farming rewards.


## How to Get Help

If you are stumped about some aspect of plotting, farming, or Chia generally, we're here to help!

- Get help on CNI's official [Discord](https://discord.gg/chia), in the `#farming-and-plotting` and `#support` channels.

- Get more questions answered in the [plotting FAQ](/plotting-faq).
