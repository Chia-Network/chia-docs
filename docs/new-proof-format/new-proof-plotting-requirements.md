---
sidebar_label: Plotting Requirements
title: Plotting Requirements
slug: /new-proof-plotting-requirements
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

This information was updated on 5/20/2025.

:::

## Plot Sizes

The new proof of space format supports plots as small as 1.6 GiB. Due to symmetric properties of the format, only even-sized k-sizes are supported. While we currently have no plans to support sizes smaller than k28, larger k-sizes may be enabled in the future.

:::note
Subject to change pending final parameters.
:::


| Plot Size | All RAM        |
| :-------- |:---------------|
| k32       | &#126;10.6 GiB |
| k30       | &#126;4.2 GiB  |
| k28       | &#126;1.6 GiB  |

## Plotting Performance and Requirements

CPU plotting will be possible but will be less efficient than GPU. All times shown are for all-RAM plotting, although farmers can trade cpu RAM for temporary SSD storage, which results in slightly slower performance.

:::NOTE
Pending Plot ID Filter and Plot Difficulty settings. Aim will be for 3060 to plot >20TiB/day
:::

| Plot Size | RAM Requirement            | Raspberry Pi 5 | Ryzen 5600 (6-core) | Nvidia 3090                   |
|-----------|----------------------------|----------------|---------------------|-------------------------------|
| k28       | - GiB (min - MiB)          | ~- minutes     | ~- minutes          | ~ seconds *(min - MiB VRAM)*  |
| k30       | - GiB (min - MiB)          | N/A            | ~- minutes          | ~- seconds *(min - MiB VRAM)* |
| k32       | - GiB (min - GiB)          | N/A            | ~- hours            | ~- minutes *(min - GiB VRAM)* |
| **Plotted space/day** | —              | Up to - GiB    | Up to - GiB         | Up to - TiB                   |

