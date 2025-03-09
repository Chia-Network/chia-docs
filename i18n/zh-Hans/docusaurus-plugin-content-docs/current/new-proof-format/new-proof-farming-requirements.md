---
sidebar_label: Farming Requirements
title: Farming Requirements
slug: /new-proof-farming-requirements
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

This information was updated on 12/11/2024.

:::

In general, the larger your farm, the more powerful your harvesters will need to be. However, keep in mind that one farm can be broken into multiple harvesters, so it is possible to run a large farm without any high-end equipment.

### Proof Solving Times

After a proof of sufficiently high quality is found it needs to be ‘solved’ which reconstructs the full proof so it can be verified by others. Proof-solving hardware requirements depend on the maximum k-size in the farm. Solve times should ideally stay under 8 seconds.

| Plot Size | Raspberry Pi 5                               | Ryzen 5600 <br/> (6-core) | Threadripper                        | Nvidia 3090                         |
| :-------- | :------------------------------------------- | :------------------------------------------- | :---------------------------------- | :---------------------------------- |
| k34       | N/A                                          | N/A                                          | N/A                                 | <8 seconds |
| k32       | N/A                                          | ~15 seconds                  | <8 seconds | 960 ms                              |
| k30       | N/A                                          | <8 seconds          | <4 seconds | 240 ms                              |
| k28       | ~6.8 seconds | <2 seconds          | <1 second  | 60 ms                               |

### HDD Disk Activity

Lower k-sizes increase disk activity but lower your minimum hardware requirements for proof solving (see previous section). For SSDs, k28 plots are recommended due to minimal impact on farming performance.

| Plot Size | Full 5TiB <br/> disk load               | Full 20TiB <br/> disk load            | Full 20TiB <br/> disk load <br/> Benes compression |
| :-------- | :-------------------------------------- | :------------------------------------ | :------------------------------------------------- |
| k34       | ~0.025% | ~0.1% | ~0.2%              |
| k32       | ~0.1%   | ~0.4% | ~0.8%              |
| k30       | ~0.4%   | ~1.5% | ~3%                                |
| k28       | ~1.6%   | ~6.4% | ~12.8%             |

### Quality Strings Frequency

Quality strings are found when a plot passes several filters, including plot ID, scan, and chain filters. Once found, they are tested against a difficulty filter to determine if they qualify as a block or pool partial win.

**Solo farming:** The frequency of quality strings does not significantly impact farming activity.

**Pool farming:** Increased quality string frequency improves pool size estimation accuracy for smaller farmers, helping stabilize rewards. Farmers with few plots may experience fluctuating estimated space and rewards day-to-day, but over time, rewards will align with actual plotted space.

| Plot Size | Avg. Quality <br/> Strings per hr <br/> per TiB |
| :-------- | :-------------------------------------------------------------- |
| k34       | ~0.12                           |
| k32       | ~0.5                            |
| k30       | ~2.1                            |
| k28       | ~9.1                            |
