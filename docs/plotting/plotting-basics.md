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

Chia plots consist of seven tables, the format of which was defined in mid-2020. The plots are already compressed -- they consist almost entirely of random cryptographic data, so they cannot be made much smaller using lossless techniques. When Chia's mainnet was launched in March 2021, all new and existing plots were stored on disk in their final formats.

By the end of 2022, it had become apparent that a form of "lossy" plot compression was possible. A few different competing techniques were being devised that involved removing one or two tables, or some data held  within. The result was in incomplete plot that could be farmed by adding in the missing data in real-time.

:::info

There are two basic types of compression -- lossless and lossy. For a brief overview of the differences, see [this article](https://www.howtogeek.com/744381/lossy-vs-lossless-compression-whats-the-difference/). While Chia compressed plots don't actually use lossy compression, it still can serve as a useful analogy to how it works.

:::

Using these techniques, "compressed" plots could be created that were 20-30% smaller than their uncompressed brethren, depending on how much data was left incomplete at the time of plotting.

This form of "compression" is possible because the data contained within a plot is deterministic. A plot's ID is a hash, which determines its contents. If you create a plot twice on two different computers, starting with the same ID and k value, the resulting plots will be identical. It is therefore possible to generate some of this data only when it is needed. Other techniques, such as brute-forcing a small number of bits, results in the plots being smaller, while requiring only a small amount of extra computational resources.

By mid-2023, most new Chia plots were being created using these "compression" techniques. Each individual plot earns the same rewards as an equivalent uncompressed plot. However, because the compressed plots are smaller, more of them fit on each disk. Farmers therefore earn extra income compared with using uncompressed plots.

#### Tradeoffs

As with most technologies, compressed plots come with tradeoffs. The fact that they are left incomplete upon being created means that they require more energy to be "completed" while farming. Luckily, lower levels of compression only require a small amount of extra energy while yielding 15% or more in extra rewards. On the other hand, the highest levels of compression require more energy to reconstruct, and they also require a GPU for farming.

Chia's plot format was designed such that higher compression levels would yield linear gains in size, at a cost of an exponential increase in required computational power. Because of this tradeoff, it is unlikely that better techniques will emerge to compress plots by more than a few percent beyond their current levels.

#### Plot Sizes

The level of compression you choose will be highly dependant on your farming setup. The following table lists the size of a k32 plot created with the Bladebit plotter, at each level of compression. The final column will give you a general idea of the type of farmer you will need at each level:

| <br />Level | Size <br />(GiB) | Relative <br />Size | Reward <br />Increase | Farm <br /> With |
| :---------- | :--------------- | :------------------ | :-------------------- | :--------------- |
| C0          | 101.4 		     | 100%                | 0%                    | Pi 4             |
| C1          | 87.5             | 86.3%               | 15.9%                 | Pi 4             |
| C2          | 86.0             | 84.8%               | 17.9%                 | Pi 4             |
| C3          | 84.5             | 83.3%               | 20.0%                 | Desktop CPU      |
| C4          |	82.9             | 81.8%               | 22.3%                 | Desktop CPU      |
| C5          | 81.3             | 80.2%               | 24.7%                 | Desktop CPU      |
| C6          | 79.6             | 78.5%               | 27.4%                 | Fast CPU         |
| C7          | 78.0             | 76.9%               | 29.8%                 | GPU              |
| C9          | 75.2             | 74.2%               | 34.8%                 | GPU              |

In this table:

* `Pi 4` refers to our minimum spec hardware, the [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) with 4 GB of RAM for CLI farming, or 8 GB for GUI farming.
* `Desktop CPU` refers to a power-sipping computer such as the [ASUS Chromebox](https://www.androidcentral.com/best-chromebox).
* `Fast CPU` refers to a computer with a higher-end CPU such as an Intel Core i9. [todo verify]
* `GPU` refers to a computer with an Nvidia CUDA-class GPU with 8 GB of VRAM

Note that there is some cross-over at certain compression levels. For example, a Pi 4 _might_ be able to keep in sync with a few C3 or C4 plots. The more plots your farm has, the higher-end your farming computer needs to be, all other factors being equal. However, most farming computers can handle 500 GB of plots without issue.

### Bladebit Simulate

The Bladebit plotter includes a "Simulator" to give you an estimate of your farm's maximum capacity.

### TCO table

[todo this is good but doesn't really belong here]

A great place to estimate your farm's TCO (Total Cost of Ownership) is with [this spreadsheet](https://docs.google.com/spreadsheets/d/1k6c-OBDtggXqnEfOPdMmq3646puzvOD7dWojwCH2v3c). Simply make a copy of it, then fill in the constants according to your farm. 

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
