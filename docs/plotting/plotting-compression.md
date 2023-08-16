---
sidebar_label: Compression Levels
title: Choosing a compression level
slug: /plotting-compression
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

If you do choose to create compressed plots, the biggest (and arguably most important) decision to make will be the level of compression.

The only plotter supported by CNI that is capable of creating compressed plots is BladeBit CUDA. (Many people have also used the third-party [GigaHorse](https://github.com/madMAx43v3r/chia-gigahorse) plotter by madMAx.) 

As of Chia version 2.0, BladeBit CUDA requires 256 GiB of system memory. This is an all-memory plotter that does not require any temporary disk storage. We are also currently building 128 GiB and 64 GiB versions of BladeBit that will require some temporary storage.

The next sections list three tools to determine the compression level that will work best for your farm, starting with the most general and ending with the most specific for your own hardware.

### Compression table

You can use the following table as a basic guide for choosing a compression level. It assumes BladeBit CUDA was used to create K32 plots:

| <br />Level | Size <br />(GiB) | Relative <br />Size | Reward <br />Increase | Min Spec <br /> Harvester |
| :---------- | :--------------- | :------------------ | :-------------------- | :------------------------ |
| C0          | 101.4            | 100%                | 0%                    | Pi 4                      |
| C1          | 87.5             | 86.3%               | 15.9%                 | Pi 4                      |
| C2          | 86.0             | 84.8%               | 17.9%                 | Pi 4                      |
| C3          | 84.5             | 83.3%               | 20.0%                 | Pi 4                      |
| C4          |	82.9             | 81.8%               | 22.3%                 | Desktop CPU               |
| C5          | 81.3             | 80.2%               | 24.7%                 | Fast CPU                  |
| C6          | 79.6             | 78.5%               | 27.4%                 | Fast CPU                  |
| C7          | 78.0             | 76.9%               | 29.8%                 | GPU                       |
| C9          | 75.2             | 74.2%               | 34.8%                 | GPU                       |

The right column (Min Spec Harvester) shows the minimum type of computer required for harvesting at each compression level, where:

* `Pi 4` refers to Chia's minimum spec hardware, the [Raspberry Pi 4](https://www.raspberrypi.com/products/raspberry-pi-4-model-b/) with 4 GB of RAM for CLI farming, or 8 GB for GUI farming.
* `Desktop CPU` refers to a power-sipping computer such as the [ASUS Chromebox](https://www.androidcentral.com/best-chromebox).
* `Fast CPU` refers to a computer with a higher-end CPU such as an Intel Xeon.
* `GPU` refers to a computer with an Nvidia CUDA-class GPU with at least 8 GB of VRAM.

:::note

There is some cross-over at certain compression levels. For example, a Pi 4 _might_ be able to keep in sync with a few C4 plots.

:::

:::info

A few things to keep in mind regarding these recommendations:
* The above table is meant as a general overview; it therefore assumes that your farm is somewhere from 500-1000 TiB.
* The more plots your farm has, the higher-end your harvester needs to be, all other factors being equal.
* Starting in June 2024, the plot filter will be reduced from `512` to `256`. When this happens, the computational load on your harvester will be doubled. To help you plan for this event, we have created a [simulator tool](/plotting-plotters#bladebit-simulate) that will show what your harvester's maximum capacity is at each compression level, as well as with different plot filter levels.

:::

### TCO spreadsheet

In order to calculate your potential profits from farming at various compression levels, you can use [this spreadsheet](https://docs.google.com/spreadsheets/d/1k6c-OBDtggXqnEfOPdMmq3646puzvOD7dWojwCH2v3c). Simply make a copy of it, then fill in the constants according to your farm. As you will see from the spreadsheet, the compression level you will ultimately choose will depend on a number of factors, such as electricity cost and the size of your farm.

### Bladebit Simulate

[start here]

