---
title: Plotting Basics
slug: /plotting-basics
---

# Plotting Basics

The plotting process involves generating and storing unique cryptographic data, called plots, on a user's storage device. Plot files prove to the network that a user is storing data, and are used in the Chia consensus for Proof of Space and Time. Here's a high-level overview of the Chia plotting process

In practical terms, plotting is the initialization phase of Chia. The Chia plotting process is computationally intensive, but it must only be performed once per plot. During this process, the user's CPU, RAM, and storage devices (such as SSDs) are heavily utilized. However, once the plot is created and stored, the farming process is significantly less resource-intensive, with minimal impact on the user's hardware. Once a plot is created, farming only requires a small amount of disk io to check and submit proofs of space in response to network challenges.


## Requirements


### K value

The minimum K value for Chia is k=32 at 108.8GB. K=32 is the most common size on the network accounting for 98% of the Netspace. The sizes of uncompressed and compressed k values can be found [here](/k-sizes)


### Keys

To create plots a farmer must know their **Farmer Public Key** and either a **Pool Public Key** or **Pool Contract Address**. Most farmers will want the flexibility to solo farm or farm with a pool and will want to use a Pool Contract Address. A farmer must create a plotnft first to have a pool contract address.

These can be found with

`chia keys show`

`chia plotnft show`


## Hardware

Plotting requires compute - the more compute, the faster the plot time. Chia farmers generally want to plot reasonably fast to get their storage space earning rewards faster. If you are using any of the disk methods, you will need an SSD with high endurance and sustained write performance, more details can be found in the endurance section.

| Plotter Type        | CPU  | GPU  | Temporary Storage | Memory   | Plot times    | Energy Efficiency |
| ------------------- | ---- | ---- | ----------------- | -------- | ------------- | ----------------- |
| GPU in-memory       | low  | high | none              | 256GB    | 1-3 minutes   | highest           |
| GPU / Disk plotting | low  | high | 256GB             | 64-128GB | 3-5 minutes   | high              |
| CPU in-memory       | high | none | none              | 416GiB   | 2-5 minutes   | high              |
| CPU disk            | High | none | 256-512GB         | 4GB      | 15-60 minutes | medium            |

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
