---
sidebar_label: Farming Requirements
title: Farming Requirements
slug: /new-proof-farming-requirements
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

In general, the larger your farm, the more powerful your harvesters will need to be. However, keep in mind that one farm can be broken into multiple harvesters, so it it possible to run a large farm without any high-end equipment.

### Requirements by farm size

These are the current guidelines **per harvester** using the default compression for the plot format:

- `< 100 TiB`: For farmers using spare space on their machines, a modern consumer level CPU and < 1 GiB RAM should be sufficient and have negligible impact on their system.
- ` < 1 PiB`: For small farmers a modern consumer level CPU and 1GiB RAM should be sufficient.
- `1 PiB - 10 PiB`: Medium sized farms may benefit from an integrated GPU (e.g. Apple M-Series processor or Intel with onboard graphics), or some utilization on a GPU.
- `> 10 PiB`: a dedicated GPU is required and possibly more than 1GiB of motherboard RAM depending on the number of plots.

If using a GPU, the RAM requirement is currently expected to be less than 1 GiB.

### Raspberry Pi support

We are still pending benchmarks to assess how many plots a Raspberry Pi may support for default plot format settings. However, plots can be made with additional data (~10-15% more space), so that even a Raspberry Pi could support many PiB on a single harvester.
