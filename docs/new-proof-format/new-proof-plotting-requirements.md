---
sidebar_label: Plotting Requirements
title: Plotting Requirements
slug: /new-proof-plotting-requirements
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Memory

We have separated the memory requirements by RAM only (no disk needed) and RAM + disk (for systems with 32 GiB of RAM). We also break down these requirements for plots meant to be stored on HDDs and for those meant to be stored on SSDs.

### HDD

Technically, HDD plots will also work on SSDs, but we also have a format that is optimized to be stored on SSDs for farming.

#### RAM only

Memory requirements for full plotting in RAM for HDD friendly format:

- K30: less than 64GiB
- K31: less than 128GiB
- K32: less than 256GiB
- K33+: each increase in K will approximately double the previous K’s RAM requirements.

#### RAM + disk

We also expect to support partial plotting in RAM for all k sizes on 32 GiB RAM systems by writing to storage during plotting. This will add additional time compared to all RAM plotting, but won’t be as impactful as the previous plot format since compute takes a relatively large portion of the overall time.

### SSD optimized

Memory requirements for Benes compression used in the SSD-only format will likely require significantly more RAM and plotting time, exact details still to be determined.

## GPU versus CPU plotting

GPU plotting will be strongly recommended. Plotting times for a k32 format with a 3060 Ti nVidia GPU are expected to take about 11 minutes, and times for higher-end GPUs will scale down relative to their performance in memory bandwidth and compute. For each increase or decrease in k size, expect plotting time to double or half respectively.

:::info

Note that plot times are currently estimated and may still be adjusted depending on the final security and compression resistance requirements chosen at a later date.

:::

CPU plotting will be possible but slow and expensive, and thus only recommended for small numbers of plots. Expect a modern high-end multi-threaded cpu system to take about 10x longer than a 3060 Ti GPU, and a single processor with DDR4 RAM to take 60-70x times longer than a 3060 Ti GPU.

## Expected plot times

Some expected plot times according to size and format:

| Processor <br/> Type | Processor <br/> Model | Plot <br/> Size | Expected <br/> Plot Time |
| :------------------- | :-------------------- | :-------------- | :----------------------- |
| GPU                  | 4090                  | k32             | 5 minutes                |
| GPU                  | 3060 Ti               | k32             | 11 minutes               |
| CPU                  | High-end multi-thread | k30             | 30 minutes               |
| CPU                  | High-end multi-thread | k31             | 1 hour                   |
| CPU                  | High-end multi-thread | k32             | 2 hours                  |
| CPU                  | Single-thread         | k30             | 2.5 hours                |
| CPU                  | Single-thread         | k31             | 5 hours                  |
| CPU                  | Single-thread         | k32             | 10 hours                 |

Eventual support for Apple M-Series and iGPU’s acceleration. First releases will support CPU plotting and nVidia GPUs, and later additional support for other chips will be included.
