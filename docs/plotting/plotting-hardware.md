---
sidebar_label: Hardware
title: Plotting Hardware
slug: /plotting-hardware
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Plotting requires compute - the more compute, the faster the plot time. Chia farmers generally want to plot reasonably fast to get their storage space earning rewards faster. However, some farmers don't mind plotting slowly, especially if they can avoid spending money on new equipment.

Luckily, Chia's plot format was designed to support most computers made in the last decade. However, if you are interested in buying a plotting computer, this section will give a few options.

## Plotter types

While a Chia plot is being created, a significant amount of temporary data must be written. Depending on the plotting software used, this temporary storage could be entirely RAM, or mostly disk (HDD or SSD).

Depending on the medium used for temporary storage, you may need to take caution not to wear out your equipment:
- RAM doesn't wear out from Chia plotting. RAM-based plotting also much faster than disk-based plotting. The downside is that it requires a high-end workstation or a server.
- When plotting directly to an HDD, the plot is created in its final destination. This means that the drive is only used to create a small number of plots, so it shouldn't wear out during the plotting process. The downside is that it is the slowest method of plotting.
- For many farmers, SSD plotting is a good tradeoff -- it doesn't require much RAM, and it is significantly faster than plotting directly to an HDD. The downside is that SSDs _do_ wear out over time. Fortunately, enterprise SSDs with multi-PiB endurance are typically available on second-hand markest. However, do be aware that if you use a consumer SSD for temporary storage, it will likely not last long.

Additionally, CPUs and GPUs are both supported for plotting, with GPUs typically being faster. The following table lists the general plotter types, along with their tradeoffs, for creating k-32 plots:

| Plotter Type | CPU  | GPU  | Temp Disk  | RAM       | Plot times    | Energy Efficiency |
| ------------ | ---- | ---- | ---------- | --------- | ------------- | ----------------- |
| GPU + RAM    | Low  | High | None       | 256 GB    | 1-3 Minutes   | Highest           |
| GPU + Disk   | Low  | High | 256 GB     | 64-128 GB | 3-5 Minutes   | High              |
| CPU + RAM    | High | None | None       | 416 GiB   | 2-5 Minutes   | High              |
| CPU + Disk   | High | None | 256-512 GB | 4 GB      | 15-60 Minutes | Medium            |

Note that all four of these plotter types are capable of plotting both compressed and uncompressed plots. We'll list some specifics in the next section.

## Compressed plotters



### Best all-around setup

### Low budget compressed plotters

### High-end plotters

## Uncompressed plotters

Most Chia farmers will want to create compressed plots. However there may still be legitimate reasons to create uncompressed plots. For example, you might:
* Intend to keep your farm small
* Not be primarily motivated by profit
* Not want to spend any money on plotting hardware
* Pay a high amount for electricity, such that creating compressed plots is not economically justifiable

In these cases, and potentially others, the ChiaPoS, Madmax, and BladBit plotters will also work. 