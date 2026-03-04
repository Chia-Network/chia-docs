---
sidebar_label: Farming Requirements
title: Farming Requirements
slug: /chia-blockchain/consensus/proof-of-space-2.0/new-proof-farming-requirements
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

This information was updated on March 3, 2026.

:::

## Proof Solving Times

After a sufficiently high-quality Quality String is found, the solver reconstructs the full 128 x-values for network verification. Solve time depends on the maximum plot strength in the farm. The Pi5 solves a k=28 proof in under 8 seconds at strengths up to +4.

| Strength | Raspberry Pi 5 | M3 Pro            | Ryzen 9 9950X    |
| -------- | -------------- | ----------------- | ---------------- |
| base     | ~4.3 s         | ~340 ms           | ~220 ms          |
| +1       | ~4.5 s         | ~370 ms           | ~240 ms          |
| +2       | ~4.9 s         | ~450 ms           | ~280 ms          |
| +3       | ~5.7 s         | ~660 ms           | ~400 ms          |
| +4       | ~7.3 s         | ~1.1 s            | ~615 ms          |
| +5       | ~10 s          | ~1.9 s            | ~1.1 s           |
| +6       | ~17 s          | ~3.7 s            | ~1.9 s           |
| +7       | ~30 s          | ~7.3 s            | ~3.7 s           |
| +8       | —              | ~14.5 s           | ~7.3 s           |
| +n       | —              | ~2^(n−8) × 14.5 s | ~2^(n−8) × 7.3 s |

Strengths +5 and above are capped at effective plot filter 8192 until the scheduled filter adjustments take effect.

:::note
See the [reference code](https://github.com/Chia-Network/pos2-chip) for benchmarking your own system on the Solver.
:::

#### HDD Activity

HDD activity depends on plot grouping, plot strength, and disk capacity. The table below assumes 10 ms random access and 250 MB/s sequential read. Higher plot strength increases the Effective Plot Filter proportionally, reducing average load.

| Disk Capacity | Strength (eff. plot filter) | Group Size | Max load/challenge | Avg load | Bandwidth/day |
| ------------- | --------------------------- | ---------- | ------------------ | -------- | ------------- |
| 5 TB          | base (512)                  | 1          | ~4.48%             | ~2.09%   | ~42 MB        |
| 5 TB          | base (512)                  | 16         | ~0.85%             | ~0.13%   | ~42 MB        |
| 5 TB          | +1 (1024)                   | 16         | ~0.64%             | ~0.07%   | ~21 MB        |
| 5 TB          | +2 (2048)                   | 16         | ~0.43%             | ~0.03%   | ~10 MB        |
| 5 TB          | +3 (4096)                   | 16         | ~0.21%             | ~0.01%   | ~5 MB         |
| 20 TB         | base (512)                  | 1          | ~12.4%             | ~8.4%    | ~170 MB       |
| 20 TB         | base (512)                  | 2          | ~7.4%              | ~4.2%    | ~170 MB       |
| 20 TB         | base (512)                  | 16         | ~2.2%              | ~0.52%   | ~170 MB       |
| 20 TB         | base (512)                  | 32         | ~1.31%             | ~0.27%   | ~170 MB       |
| 20 TB         | base (512)                  | 64         | ~0.89%             | ~0.14%   | ~170 MB       |
| 20 TB         | base (512)                  | 100        | ~0.69%             | ~0.09%   | ~170 MB       |
| 20 TB         | base (512)                  | 1000       | ~0.47%             | ~0.01%   | ~170 MB       |
| 100 TB        | base (512)                  | 32         | ~3.42%             | ~1.32%   | ~850 MB       |
| 100 TB        | base (512)                  | 64         | ~2.15%             | ~0.65%   | ~850 MB       |
| 100 TB        | base (512)                  | 100        | ~1.85%             | ~0.46%   | ~850 MB       |
| 100 TB        | base (512)                  | 1000       | ~0.47%             | ~0.05%   | ~850 MB       |

Plots in a group can be assigned a `meta_group` (up to 256). The effective plot filter guarantees that grouped plots with different meta groups never pass the same challenge, reducing peak load toward the average. For example, 202 meta groups × 100 grouped plots = 20,200 plots, where peak load converges to ~0.09%.

Total daily bandwidth is low, so even large group counts can be read well within the challenge response window.

#### Harvester Farm Size Support

Chaining Proof Fragments at challenge time is the primary CPU cost. The table below shows single-thread Pi5 limits (conservative, since the Pi5 has 4 threads and other harvester tasks are comparatively light).

| CPU               | Avg Plot Strength | Supported Farm Size (PiB)                         |
| ----------------- | ----------------- | ------------------------------------------------- |
| Pi5 single-thread | base              | 1.2                                               |
| Pi5 single-thread | +1                | 2.4                                               |
| Pi5 single-thread | +2                | 4.8                                               |
| Pi5 single-thread | +3                | 9.6                                               |
| Pi5 single-thread | +4                | 19.2                                              |
| Pi5 single-thread | +n                | 1.2 × 2^n (capped by effective plot filter at +4) |
