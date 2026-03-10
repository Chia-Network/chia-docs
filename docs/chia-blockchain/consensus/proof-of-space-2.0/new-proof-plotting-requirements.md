---
sidebar_label: Plotting Requirements
title: Plotting Requirements
slug: /chia-blockchain/consensus/proof-of-space-2.0/new-proof-plotting-requirements
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

This information was updated on March 3, 2026.

:::

## Plot Sizes

Whereas the original Proof of Space format supported a variety of plot sizes, Proof of Space 2 only supports k28 (around 1 GB per plot). The PoS2 documentation will rarely mention k-size because only a single size is supported. Future proofing will mainly come from automatically reducing the network's base filter, as described in [CHIP-49](https://github.com/Chia-Network/chips/pull/161).

## Other Settings

Farmers will need to choose a _strength_ for their plots, as well as a group size and an optional meta group index. Each of these settings will be documented here when the specification is finalized. For now, refer to [CHIP-48](https://github.com/Chia-Network/chips/pull/160) and [CHIP-49](https://github.com/Chia-Network/chips/pull/161) for more details.

## Plotting Performance and Requirements

CPU plotting is supported but less efficient than GPU. All times below are for all-RAM plotting; farmers may substitute temporary SSD storage for RAM at a modest speed penalty.

|                                   | Raspberry Pi 5 8GB | Mac M3 Pro 12GB | Ryzen 5600 (6-core) | Nvidia 5090 |
| --------------------------------- | ------------------ | --------------- | ------------------- | ----------- |
| **Time per plot** (base strength) | 240s               | 60s             | 30s                 | 2s          |
| **Plotted space/day**             | ~360 GiB/day       | ~2 TiB/day      | ~4 TiB/day          | ~40 TiB/day |

Plotting time approximately doubles with each strength increment. At lower strengths, general memory-management overhead is still a factor; at higher strengths, matching performance dominates and doubling is consistent.

| Strength | CPU Time (s) | GPU Time (s) |
| -------- | ------------ | ------------ |
| base     | 21.8         | 1.1          |
| +1       | 35.5         | 1.9          |
| +2       | 64.7         | 3.7          |
| +3       | 124.4        | 7.3          |
| +4       | 243.1        | 14.4         |
| +5       | 481.3        | 28.6         |
| +6       | 955.8        | 57.0         |
| +7       | 1904.7       | 113.7        |
| +8       | 3802.5       | 227.3        |

RAM and storage requirements depend on group size:

| # plots in group | Min CPU RAM | Min GPU RAM (optional) | Total RAM + storage needed |
| ---------------- | ----------- | ---------------------- | -------------------------- |
| 1                | 4 GB        | 2 GB                   | 12 GB                      |
| 2                | 4 GB        | 2 GB                   | 13 GB                      |
| 5                | 4 GB        | 2 GB                   | 16 GB                      |
| 21               | 4 GB        | 2 GB                   | 32 GB                      |
| 53               | 4 GB        | 2 GB                   | 64 GB                      |
| 117              | 4 GB        | 2 GB                   | 128 GB                     |
| 245              | 4 GB        | 2 GB                   | 256 GB                     |
| 1 + n            | 4 GB        | 2 GB                   | (12 + n) GB                |

Temporary storage can substitute for RAM. At higher strengths the relative impact of swap latency decreases.

### MacOS Virtual Memory Compression

When plotting on a MacOS device that uses Apple silicon, there is an important OS quirk to consider. As part of their unified memory approach, MacOS uses Virtual Memory Compression to "compress" programs in memory when they are inactive, and then decompress them when they are accessed again. Compression often begins when the program is closed.

Virtual Memory Compression allows Apple silicon to use less RAM than its Intel counterparts in many situations. However, for Chia plotting, it degrades performance. Chia's plotting applications are designed to pull from as much available RAM as possible in order to speed up the process of creating a plot. The first time you open a plotting application after a fresh reboot, RAM is allocated as expected. When the application is closed, the OS remembers that it requires several GB of RAM. The next time the application is opened, the process is compressed in RAM, which degrades performance.

For more info about Virtual Memory Compression, see Apple's [Memory Usage Performance Guidelines](https://developer.apple.com/library/archive/documentation/Performance/Conceptual/ManagingMemory/Articles/AboutMemory.html). This [blog post](https://blog.greggant.com/posts/2024/07/03/macos-memory-management.html) also explains what is happening at a high level.

Unfortunately, CNI has no control over how memory is managed on MacOS. Fortunately, there's an easy fix for this issue. In order to avoid Virtual Memory Compression when running any plotting tools, only start the application after a fresh reboot. If this is the first time the application has been run since rebooting, MacOS will not have a record of how much memory is required to run it, so Virtual Memory Compression won't be applied. As long as the application remains open, it can continue to create plots without the application being compressed or decompressed. If you close the application, then you should reboot before running it again.

The quirk described in this section only applies to MacOS. Windows and Linux systems are unaffected.