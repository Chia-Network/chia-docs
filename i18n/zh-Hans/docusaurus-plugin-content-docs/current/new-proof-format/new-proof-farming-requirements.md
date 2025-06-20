---
sidebar_label: Farming Requirements
title: Farming Requirements
slug: /new-proof-farming-requirements
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

This information was updated on 5/20/2025.

:::

In general, the larger your farm, the more powerful your harvesters will need to be. However, keep in mind that one farm can be broken into multiple harvesters, so it is possible to run a large farm without any high-end equipment.

## Proof Solving Times

After a proof of sufficiently high quality is found it needs to be _solved_, which reconstructs the full proof so it can be verified by others. Proof-solving hardware requirements depend on the maximum k-size in the farm. Solve times should ideally stay under 8 seconds. Plot security has been tuned for the Pi 5 to solve a k28 proof in under 8 seconds.

:::note
See the [reference code](https://github.com/Chia-Network/pos2-chip) for benchmarking your own system on the Solver.
:::

| Plot Size | Raspberry Pi 5                                | Ryzen 5600 (6-core)        | Threadripper                         | Nvidia 3060 |
| --------- | --------------------------------------------- | --------------------------------------------- | ------------------------------------ | ----------- |
| k28       | ~6.8 seconds  | ~1 seconds                    | < 1 second  | 60 ms       |
| k30       | ~15.6 seconds | ~3.3 seconds  | < 3 seconds | 240 ms      |
| k32       | N/A                                           | ~11.7 seconds | < 8 seconds | 960 ms      |

### HDD Activity

Lower k-sizes increase disk activity but reduce minimum hardware requirements for proof solving (see previous section). For SSDs, k28 plots are recommended due to their minimal impact on farming performance, although large farms could benefit from larger k sizes for a proportional reduction in harvesting compute energy to process the Quality Chains. The Plot ID Filter will tune HDD disk activity to the levels shown in the table. Depending on plot filter scheduling and further security analysis we may relax these requirements to lower hdd usage levels.

| Plot Size | Full 5TiB Disk Activity                | Full 20TiB Disk Activity              |
| --------- | -------------------------------------- | ------------------------------------- |
| k28       | ~2.5%  | ~10%                  |
| k30       | ~0.6%  | ~2.4% |
| k32       | ~0.23% | ~0.9% |
