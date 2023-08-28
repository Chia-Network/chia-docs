---
sidebar_label: Choosing a Compression Level
title: Choosing a compression level
slug: /plotting-compression
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

If you opt to create compressed plots, you will need to decide on the level of compression.

:::info

You can mix and match plots with different compression levels. For example, you could have some C0, C3, and C7 plots on the same machine. Your harvester will handle this without issue. However, most users will likely choose to convert all of their plots to the same compression level.

:::

As a reminder, BladeBit CUDA and BladeBit RAM are plotters supported by CNI that are capable of creating compressed plots. Whenever we mention compression levels, we are referring to those defined by BladeBit. (Many people have also used the third-party [GigaHorse](https://github.com/madMAx43v3r/chia-gigahorse) plotter by madMAx. This plotter uses a similar nomenclature for its compression levels, but they have different definitions.) 

The next sections list three methods to determine the compression level that will work best for your farm, starting with the most general and ending with the most specific for your own hardware.

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
* `GPU` refers to a computer with an Nvidia CUDA-class GPU. The minimum amount of DRAM required is around 600-700 MB for C7 harvesting. For example, a GTX 1060 will work.

:::info

A few things to keep in mind regarding these recommendations:
* The above table is meant as a general overview; it therefore assumes that your farm is somewhere from 500-1000 TiB.
* The more plots your farm has, the higher-end your harvester needs to be, all other factors being equal.

:::

### TCO spreadsheet

In order to calculate your potential profits from farming at various compression levels, you can use [this spreadsheet](https://docs.google.com/spreadsheets/d/1k6c-OBDtggXqnEfOPdMmq3646puzvOD7dWojwCH2v3c). Simply make a copy of it, then fill in the constants according to your farm. As you will see from the spreadsheet, the compression level you will ultimately choose will depend on a number of factors, such as electricity cost and the size of your farm.

### Max farm size estimator

The third-party website [xch.farm](https://xch.farm/max-farm-size) has tables for estimating your farm's maximum capacity depending on your CPU/GPU setup. Be sure to pay attention to the `June 2024` column when planning your farm. If your harvester is capable of handling your desired number of plots listed in this column, you should be good to go until 2027 or later.

### BladeBit Simulate

The [standalone version of BladeBit](/plotting-software#bladebit-standalone) comes with a simulator that will determine the maximum size of your farm. The basic idea is that you pass in a compressed plot (C1-C9) and it will calculate the maximum number of plots/space your current harvester can handle.

See the [CLI reference](/plotters-cli#simulate) for a list of options using the simulator.

:::info

The simulator's default values are typically fine, other than the filter size. For context, starting in June 2024 the plot filter will be reduced from 512 to 256. At this point, twice as many plots will pass the filter, so your harvester's workload will effectively double. You are recommended to use `-f 256` with the simulator to prepare for this event. For more information on the plot filter, see our [FAQ](/faq#what-is-the-plot-filter-and-why-didnt-my-plot-pass-it).

:::

:::note

It is a good idea to create plots of various sizes (for example, one C3, one C7, and one C9) and then run the simulator against each of them. This will help you to plan for how many harvesters to use, the type of hardware to acquire, etc.

:::

The simulator's default mode will decompress your plot and then extrapolate your farm's maximum size, which should only take a few seconds.

Example command using the default mode and a filter size of 256:

```bash
bladebit simulate -f 256 <path to plot file>
```

:::info

The simulator will only work with compressed plots.

:::

The simulator can also be configured to run a real-time simulation against a farm of any given size. This will give you a much better idea of how your system will perform on mainnet. To activate this mode, use the following flags:
* `--power <time>` -- The number of seconds the simulation will run
* `--size <size>` -- The size of the farm to simulate

Every 9.375 seconds, a new simulated signage point will be received, and a number of simulated plots will be decompressed based on the value of `--size`. For example, the following command will simulate running a 1 PB farm for ten minutes:

```bash
bladebit simulate --power 600 --size 1PB -f 256 <path to plot file>
```

At the end of the simulation, a number of statistics will be shown. It is a good idea to keep the maximum lookup time at around five seconds in order to avoid missing any signage points. If the maximum time is greater than ten seconds, then you are advised to either reduce the number of plots on your harvester, use a lower level of compression, or use a faster CPU or GPU for harvesting.

For a detailed analysis of how the tool works and how you should be thinking about plot compression, see [this video demonstration](https://www.youtube.com/watch?v=cZfptl66TLE) by JM.