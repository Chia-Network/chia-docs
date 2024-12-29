---
sidebar_label: Plotting Requirements
title: Plotting Requirements
slug: /new-proof-plotting-requirements
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

This information was updated on 12/11/2024.

:::

## Plot Sizes

The new proof of space format supports plots as small as 3 GiB. Due to symmetric properties of the format, only even-sized k-sizes are supported. While we currently have no plans to support sizes smaller than k28, larger k-sizes may be enabled in the future. Each even-step k-size is a little over four times larger than the previous size.

| Plot Size | All RAM                  |
| :-------- | :----------------------- |
| k34       | ~260 GiB |
| k32       | ~61 GiB  |
| k30       | ~14 GiB  |
| k28       | ~3 GiB   |

## Memory

We have separated the memory requirements by RAM only (no disk needed) and RAM + disk (for systems with 32 GiB of RAM). We also break down these requirements for plots meant to be stored on HDDs and for those meant to be stored on SSDs.

### RAM Requirements

Memory requirements for full plotting in RAM for HDD friendly format:

| Plot Size | All RAM | RAM + Disk | Nvidia 3090 |
| :-------- | :------ | :--------- | :---------- |
| k34       | 512GB   | 8GB        | 8GB VRAM    |
| k32       | 128GB   | 2GB        | 2GB VRAM    |
| k30       | 32GB    | 512MB      | 512MB VRAM  |
| k28       | 8GB     | 128MB      | 128MB VRAM  |

### HDD

Technically, HDD plots will also work on SSDs, but we also have a format that is optimized to be stored on SSDs for farming.

### SSD optimized

Memory requirements for Benes compression used in the SSD-only format will likely require significantly more RAM and plotting time, exact details still to be determined.

## GPU versus CPU plotting

GPU plotting will be strongly recommended. Plotting times for a k32 format with a 3090 Nvidia GPU are expected to take about 1-2 minutes, and times for higher-end GPUs will scale down relative to their performance in memory bandwidth and compute. For each increase or decrease in k size (by 2), expect plotting time to double or half respectively.

:::info

Note that plot times are currently estimated and may still be adjusted depending on the final security and compression resistance requirements chosen at a later date.

:::

CPU plotting will be possible but slow and expensive, and thus only recommended for small numbers of plots. Expect a modern high-end multi-threaded cpu system to take about 100x longer than a 3090 GPU, and a single processor with DDR4 RAM to take 450x times longer than a 3090 GPU.

## Expected plot times

Some expected plot times according to size and format:

| Plot Size               | Raspberry Pi 5              | Ryzen 5600 <br/> (6-core) | Nvidia 3090                  |
| :---------------------- | :-------------------------- | :------------------------------------------- | :--------------------------- |
| k34                     | N/A                         | ~10 hours                    | ~6 minutes   |
| k32                     | N/A                         | ~3 hours                     | ~1-2 minutes |
| k30                     | N/A                         | ~45 minutes                  | ~30 seconds  |
| k28                     | ~40 minutes | ~12 minutes                  | ~5 seconds   |
| Plotted <br/> space/day | Up to 170 GiB               | Up to 800 GiB                                | Up to 100 TiB                |

Eventual support for Apple M-Series and iGPU’s acceleration. First releases will support CPU plotting and nVidia GPUs, and later additional support for other chips will be included.
