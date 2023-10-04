---
sidebar_label: Hardware
title: Plotting Hardware
slug: /plotting-hardware
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Cost/time tradeoffs

Plotting requires compute - the more compute, the faster the plot time. With that in mind, it may be tempting to run out and buy the fastest computer you can find for plotting. But first, you should consider a few important points, and answer some related questions:
* Most computers made within the last decade can be used to create Chia plots.
  * Do you already own a computer that is not being heavily used?
* Plotting is a one-time activity.
  * What will you do with your plotting machine after you have finished plotting?
* Farming is a long-term endeavor.
  * If you do buy a plotting computer, will the time saved on plotting justify its cost?
 
Everyone needs to decide for themselves what makes the most economic sense. With plotting, often it comes down a simple tradeoff of either:
* Spend money on a computer, plot faster, and earn rewards sooner, or
* Don't spend money, plot slower, and earn rewards later

[ChiaCalculator.com](https://chiacalculator.com/) will help you to understand this tradeoff, along with more nuanced factors. Many farmers find that they will make more money by using the equipment they already own. 

If you do decide to buy hardware, this page will help you to decide what might work best for your farm.

When looking for a plotting machine, the main components to consider are the temporary storage and the processor type (CPU or GPU).

## Temporary storage

While a Chia plot is being created, a significant amount of temporary data must be written, either entirely in memory, or mostly on disk (HDD or SSD). There are tradeoffs to using RAM, HDDs, and SSDs for plotting, including durability, speed, and cost:
- **RAM**
  * Doesn't wear out from Chia plotting
  * Faster than SSDs; significantly faster than HDDs
  * Requires a high-end workstation or a server
  * **Typically only makes economic sense for large farms (>1 PiB)**
  <br/><br/>
- **HDD**
  * Doesn't wear out from Chia plotting
  * Significantly slower than RAM and SSDs
  * Works on most computers
  * **Cheap and effective for small farms (<100 TiB), but typically too slow for larger farms**
  <br/><br/>
- **SSD**
  * Does wear out over time; a high-endurance enterprise NVMe SSD is recommended
  * Slower than RAM, but much faster than HDDs
  * Works on most computers
  * **A good option for farms of most sizes, especially if it means you don't have to buy a high-end workstation**

## Processor type

CPUs and GPUs are both supported for plotting, with GPUs typically being faster. 

The **BladeBit CUDA** plotter requires an NVIDIA GPU with CUDA capability 5.2 and up, with at least 8GB of vRAM. It is supported on **Windows and Linux only.** MacOS support may be added in the future, but is not guaranteed.

The following table lists the general plotter types, along with their requirements, for creating k32 plots:

| Processor +<br/>Storage | Plotter <br/> Name(s)                    | Chia <br/> Version | Comp.<br/>Plots | Compute | Temp<br/>Disk<br/>(GB) | RAM<br/>(GB) | Plot<br/>Times<br/>(min.) |
| :---------------------- | :--------------------------------------- | :----------------- | :-------------- | :------ | :---------------------- | :------------ | :------------------------ |
| **GPU +<br/> RAM**      | BladeBit CUDA                            | 2.0                | Yes             | GPU     | None                    | 256           | 1-3                       |
| **GPU +<br/> SSD**      | BladeBit CUDA                            | 2.1                | Yes             | GPU     | 180                     | 128           | 3-5                       |
| **CPU +<br/> RAM**      | BladeBit RAM                             | 2.0                | Yes             | CPU     | None                    | 416           | 2-5                       |
| **CPU +<br/> SSD**      | Bladebit Disk <br/> madMAx <br/> ChiaPoS | 2.0                | No              | CPU     | 512                     | 4             | 15-60                     |
| **CPU +<br/> HDD**      | Bladebit Disk <br/> madMAx <br/> ChiaPoS | 2.0                | No              | CPU     | 512                     | 4             | > 60                      |

:::note

`GPU + HDD` is not recommended. The HDD is already the bottleneck, even with CPU plotting. Using a GPU with an HDD is not likely to improve plotting speed versus `CPU + HDD`.

:::

:::info

[Gigahorse](https://github.com/madMAx43v3r/chia-gigahorse) from madMAx is a third-party plotter capable of creating compressed plots. 
Depending on your setup, it may be a viable option, but do keep in mind that this plotter carries a dev fee, as explained in the link.

:::

If you want to create compressed plots, you will need to choose either `GPU + RAM`, `GPU + SSD`, or `CPU + RAM`. At some point, `CPU + SSD` might become capable of creating compressed plots as well, but for now this is not an option.

The rest of this page will list a few decent configurations, depending on your budget and goals.

## Compressed plotting systems

### Required

The following hardware and software components are required for creating compressed plots:

##### Hardware

For BladeBit CUDA plotting:
* NVIDIA GPU with CUDA capability 5.2 and up
* At least 8GB of vRAM
* A 64-bit CPU (Intel x86, AMD x86, or arm64)
* System RAM
  * **Experimental** RAM + disk plotting: at least 16 GB (only available with the [standalone version](https://github.com/Chia-Network/bladebit/) of BladeBit)
  * Fully supported RAM + disk plotting: at least 128 GB
  * RAM only: at least 256 GB

For BladeBit Disk plotting:
* At least 416 GB of system RAM
* A 64-bit CPU (Intel x86, AMD x86, or arm64)

##### Software

64-bit Linux or Windows (MacOS is not supported)

### Most tested

A wide range of hardware and software configurations that meet the above requirements could potentially be used for creating compressed plots. 
The following setups have received the most testing scruitiny. The further your system strays from these setups, the more likely you are to encounter problems. 
Unfortunately, we may not be able to offer support if your machine does not fall within these parameters.

Operating Systems
* Ubuntu 20.04.6 LTS
* Ubuntu 22.04.02 LTS
* Ubuntu 23.04
* RHEL 7.4
* RHEL 8.7
* RHEL 9.1
* Windows 10 version 22H2
* Windows 11 version 21H2
* Windows 11 version 22H2
* Windows Server 2022
* Windows Server 2019 (version 1809)

Systems
* Intel x86
* AMD x86
* arm64

Platforms
* Desktop
* Workstation
* Server

GPUs
* 1060
* 2060
* 3060 Ti
* 3090
* 4060
* Tesla P4
* A4000

## Recommended plotting systems

JM has created an excellent [plotting build guide](https://chiadecentral.com/gpu-plotting-build-guide/) with advice on which equipment provides the best performance for the money. 
This guide is well worth a visit if you are interested in creating compressed plots with BladeBit CUDA.

We'll also list two recommendations here, which assume you will use pre-owned components wherever possible. eBay and Amazon are good places to shop around.

### Budget

* Model: HPE Z440
* CPU: Xeon v4
* RAM: 256 GB DDR4 ECC 2133
* GPU: 2070

Total Cost: $500-600

Estimated plot times (k32): 170-200 seconds

Daily plot capability: 40-50 TB

### Workstation

* Model: Lenovo P620
* CPU: Threadripper Pro 5945 WX
* GPU: 3080
* Bus: PCIe 4.0 x 16
* RAM: 256 GB DDR4 ECC 3200

Total Cost: $1300-1500 

Estimated plot times: 90-150 seconds

Daily plot capacity: 60-95 TB

## Uncompressed plotters

Most Chia farmers will want to create compressed plots. However, some will opt for uncompressed plots, including those who:
* Intend to keep their farm small
* Are not be primarily motivated by profit
* Do not want to spend any money on plotting hardware
* Pay a high amount for electricity, such that creating compressed plots is not economically justifiable

In these cases, and potentially others, most hardware running the ChiaPoS, madMAx, and BladeBit plotters will also work.