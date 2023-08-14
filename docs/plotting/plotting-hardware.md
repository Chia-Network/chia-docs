---
sidebar_label: Hardware
title: Plotting Hardware
slug: /plotting-hardware
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Plotting requires compute - the more compute, the faster the plot time. With that in mind, it may be tempting to run out and buy the fastest computer you can find for plotting. But first, you should consider a few important points, and answer some related questions:
* Most computers made within the last decade can be used to create Chia plots.
  * Do you already own a computer that is not being heavily used?
* Plotting is a one-time activity.
  * What will you do with your plotting machine after you have finished plotting?
* Farming is a long-term endeavor.
  * If you buy an expensive plotting computer, will the cost be offset by the time you will save on plotting?
 
Everyone needs to decide for themselves what makes the most economic sense. With plotting, often it comes down a simple tradeoff of either:
* Spend money to buy a computer, plot faster, and earn rewards sooner, or
* Don't spend money, plot slower, and earn rewards later

[ChiaCalculator.com](https://chiacalculator.com/) will help you understand this tradeoff, along with more nuanced factors. Many farmers find that they will make more money by using the equipment they already own. 

If you do decide to spend money on hardware, this page will help you to decide what might work best for your farm. When looking for a plotting machine, there are multiple hardware components to consider.

## Temporary storage

While a Chia plot is being created, a significant amount of temporary data must be written, either entirely in memory, or mostly on disk (HDD or SSD). There are tradeoffs to using RAM, HDDs, and SSDs for plotting, including durability, speed, and cost:
- **RAM plotting**
  * RAM doesn't wear out from Chia plotting
  * Faster than SSDs; significantly faster than HDDs
  * Requires a high-end workstation or a server
  * **Typically only makes economic sense for large farms (>1 PiB)**
  <br/><br/>
- **HDD plotting**
  * HDDs don't wear out from Chia plotting
  * Significantly slower than RAM and SSDs
  * Works on most computers
  * **Cheap and effective for small farms (<100 TiB), but typically too slow for larger farms**
  <br/><br/>
- **SSD plotting**
  * SSDs do wear out over time; a high-endurance enterprise NVMe SSD is recommended
  * Slower than RAM, but much faster than HDDs
  * Works on most computers
  * **A good option for farms of most sizes, especially if it means you don't have to buy a high-end workstation**

## Processor type

CPUs and GPUs are both supported for plotting, with GPUs typically being faster. The following table lists the general plotter types, along with their tradeoffs, for creating k32 plots:

| Plotter Name                  | >C0 | Type         | CPU  | GPU  | Temp Disk  | RAM       | Plot times    |
| :---------------------------- | :---------- | :----------- | :--- | :--- | :--------- | :-------- | :------------ |
| BladeBit CUDA                 | Yes         | GPU + RAM    | Low  | High | None       | 256 GB    | 1-3 Minutes   |
| BladeBit CUDA                 | Yes         | GPU + SSD    | Low  | High | 256 GB     | 64-128 GB | 3-5 Minutes   |
| BladeBit RAM                  | Yes         | CPU + RAM    | High | None | None       | 416 GiB   | 2-5 Minutes   |
| Bladebit Disk <br/> or madMAx | No          | CPU + SSD    | High | None | 256-512 GB | 4 GB      | 15-60 Minutes |
| Bladebit Disk <br/> or madMAx | No          | CPU + HDD    | HIgh | None | 256-512 GB | 4 GB      | >60 Minutes   |

:::note

`GPU + HDD` is not recommended. The HDD is already the bottleneck, even with CPU plotting. Using a GPU with an HDD is not likely to improve plotting speed versus `CPU + HDD`.

:::

:::note

[todo] mention gigahorse

:::

If you want to create compressed plots, you will need to choose either `GPU + RAM`, `GPU + SSD`, or `CPU + RAM`. At some point, `CPU + SSD` might become capable of creating compressed plots as well, but for now this is not an option.

The rest of this page will list a few decent configurations, depending on your budget and goals.

## Compressed plotters

### Best all-around setup

### Low budget compressed plotters

### High-end plotters

## Uncompressed plotters

Most Chia farmers will want to create compressed plots. However, some will opt for uncompressed plots, including those who:
* Intend to keep their farm small
* Are not be primarily motivated by profit
* Do not want to spend any money on plotting hardware
* Pay a high amount for electricity, such that creating compressed plots is not economically justifiable

In these cases, and potentially others, the ChiaPoS, Madmax, and BladBit plotters will also work.