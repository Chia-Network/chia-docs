---
sidebar_label: Software
title: Plotting Software
slug: /plotting-software
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Several Chia plotters are now available. The output (a plot) will be nearly identical for a given k-value and compression level. However, the hardware requirements are different for each plotter.

The three families of plotters include:
* BladeBit -- developed by Chia Network, Inc. 
* madMAx -- developed external to CNI
* Chiapos -- the original plotter, developed by CNI

This page provides details about the plotters that exist within each of these families.

## Plotters

### BladeBit CUDA

#### An all-memory GPU plotter, included with Chia 2.0

Plot capabilities
- Type: Compressed or uncompressed
- Size: k32 only (larger sizes to be added later)

Requirements
- OS: Windows 11 or Debian/Ubuntu Linux (MacOS and other flavors of Linux will likely be supported in the future)
- Memory: 256 GiB of DRAM (128 GiB and 64 GiB versions are in development)
- Temporary Disk: Not used for 256 GiB version
- GPU: CUDA capability 5.2 (NVIDIA 10 series GPU or higher) with 8GB of GPU VRAM
- Software: CUDA toolkit version 11.8 or later

More info
- The newest BladeBit plotter, designed to work with CUDA-class GPUs
- Creates compressed plots, up to C9 (75.2 GiB)
- The fastest Chia plotter for most hardware architectures that meet the minimum specs
- The 256 GiB version creates plots entirely in memory, so no temp disk is needed
- Open-source, freely available, no dev fee

CLI usage

```bash
[todo verify] bladebit_cuda -f <farmer key> -c <contract address> -n 1 cudaplot /mnt/ssd
[todo plot compression level parameter?]
```

### BladeBit RAM

#### An all-memory CPU plotter, included with Chia 2.0

Plot capabilities
- Type: Compressed or uncompressed
- Size: k32 only (larger sizes to be added later)
- [More info](https://www.chia.net/2022/08/08/announcing-bladebit-2-0/)

Requirements
- OS: Windows, Mac, or Linux OS (64-bit is required); Intel and ARM (Apple Silicon) are both supported.
- Memory: 416 GiB of available RAM
- Temporary Disk: Not used
- GPU: Not used

More info
- Designed to be used in high-memory servers that don't have a GPU
- Creates compressed plots, up to C9 (75.2 GiB)
- Creates plots entirely in memory, so no temp disk is needed
- Typically not as fast as BladeBit CUDA
- Open-source, freely available, no dev fee

CLI usage

```bash
[todo verify] bladebit -t <system threads - 1> -f <farmer key> -c <contract address> -n 1 ramplot /mnt/ssd
[todo plot compression level parameter?]
```

### Bladebit Disk

#### A disk-based (HDD or SSD) CPU plotter, included with Chia 2.0

Plot capabilities
- Type: Uncompressed only
- Size: k32 only

Requirements
- OS: Windows, Mac, or Linux OS (64-bit is required); Intel and ARM (Apple Silicon) are both supported.
- Memory: Minimum 2 GiB of available RAM, with lower bucket counts requiring up to 12 GiB
- Temporary Disk: 480 GiB in default mode, or 390 GiB with `--alternate` mode enabled; can be HDD or SSD:
  - SSD: fast (NVMe is supported) but consumer-grade SSDs wear out over time, enterprise-grade is recommended
  - HDD: slow, but won't wear out; can plot directly to the final disk
- GPU: Not used

More info
- Designed to be used in embedded or entry-level systems
- Can only create uncompressed plots (C0, 101.4 GiB)
- The use of temporary HDD or SSD storage makes it accessible to the majority of farmers
- Sequential writes can better take advantage of SSD burst performance and reduce SSD wear by reducing write amplification factor
- Can use DRAM write cache to significantly reduce SSD writes and can take advantage of any extra increments (no minimum required)
- Takes full advantage of increased disk bandwidth from PCIe 4.0
- Pipelined performance to max out CPU

CLI usage

Example with temporary SSD mounted to /mnt/ssd1 and destination drive as /mnt/ssd2, and using 100GB of DRAM cache to reduce temporary disk writes

```bash
bladebit -t <system threads - 1> -f <farmer key> -c <contract address> -n 1 diskplot -t1 /mnt/ssd1/ -b 64 --cache 100G -a /mnt/ssd2
```

### Gigahorse

#### A third-party GPU plotter, available as a [standalone download](https://github.com/madMAx43v3r/chia-gigahorse)

Plot capabilities
- Type: Compressed or uncompressed
- Size: k30-34

More info
- Designed to work with CUDA-class GPUs
- Creates compressed plots
- Closed source, has dev fee depending on compression and whether CPU or GPU is used for farming

### madMAx

#### A third-party CPU plotter, included with Chia 2.0

Plot capabilities
- Type: Uncompressed only
- Size: Any

Requirements
- OS: Windows, Mac, or Linux OS (64-bit is required); Intel and ARM (Apple Silicon) are both supported.
- Memory: Depends on setup, minimum 0.5 GiB if single-threaded
- Temporary Disk: SSD and HDD are supported
  - SSD: fast (NVMe is supported) but consumer-grade SSDs wear out over time, enterprise-grade is recommended
  - HDD: slow, but won't wear out; can plot directly to the final disk
- GPU: Not used

More info
- Designed to be used in embedded or entry-level systems
- Can only create uncompressed plots (C0, 101.4 GiB)
- The use of temporary HDD or SSD storage makes it accessible to the majority of farmers
- Pipelined performance to max out CPU

### Chiapos

#### The original Chia CPU-based plotter

Plot capabilities
- Type: Uncompressed only
- Size: Any

Requirements
- OS: Windows, Mac, or Linux OS (64-bit is required); Intel and ARM (Apple Silicon) are both supported.
- Memory: 2 GiB min
- Temporary Disk: SSD and HDD are supported
  - SSD: fast (NVMe is supported) but consumer-grade SSDs wear out over time, enterprise-grade is recommended
  - HDD: slow, but won't wear out; can plot directly to the final disk
- GPU: Not used

More info
- Originally released pre mainnet, mostly supplanted by newer plotters
- Slow, single-threaded plotting; parallel plotting and staggering are recommended
- Designed to be used in embedded or entry-level systems
- Can only create uncompressed plots (C0, 101.4 GiB)
- The use of temporary HDD or SSD storage makes it accessible to the majority of farmers
- Not optimized for performance

## Choosing a plotter

With so many plotters available, the decision of which one to choose may seem daunting. Often, the optimal choice will depend on your hardware setup. If you have:
- At least 256 GiB of RAM **and** a CUDA-class GPU with at least 8 GiB of VRAM
  - You will likely want BladeBit CUDA
  - Gigahorse will also work
  - Other plotters will underperform
- At least 64 GiB of RAM (but less than 256 GiB) **and** a CUDA-class GPU with at least 8 GiB of VRAM, **and** an 256 GB or larger SSD (ideally enterprise NVMe)
  - The beta version of BladeBit CUDA will likely work
  - Gigahorse will also work
  - Other plotters will underperform
- 416 GiB of RAM but no GPU
  - BladeBit RAM is easily your best choice
- Less than 64 GiB of RAM and don't mind creating uncompressed plots
  - BladeBit Disk and maDMAx are both good options

It is always possible, and indeed recommended, to create a plot with a few different plotters to get a feel for how well your system will perform. Once you have a feel for using the different plotters, you can begin plotting in earnest.

## How to use in Chia

There is a new `chia` command for creating plots called `plotters`. For compatibility, the original command for creating plots `chia plots create` remains in place, however, this will always use the reference chiapos plotter. In order to use the other plotters, you must use the new `chia plotters` command. Command line options differ with each plotter, so be sure to check the available options using `chia plotters <plotter> -h`. Available plotter values include "chiapos", "bladebit", and "madmax".

The UI also has new functionality to support selecting a plotter.

Note: Not all features are available for every plotter.

## Installation

The bladebit and madMAx plotters will come packaged together with the installers on each platform. Using the install package (deb, rpm, dmg, exe) is the easiest way to get properly configured for using Chia with the alternative plotters. This is the supported method for installing and using Chia with the alternative plotters.

When running Chia by cloning the chia-blockchain git repository, it's possible to have the Chia CLI build and install BladeBit and madmax plotters from source. To install a plotter, use the `chia plotters install <plotter>` command, where `<plotter>` is either "bladebit" or "madmax". Chia will attempt to configure and build the specified plotter, but variations in OS environments may yield build failures. When using the `chia plotters install` command, the source and built plotters will reside in the `~/.chia/mainnet/plotters` directory on macOS and Linux, or the `%HOMEDRIVE%%HOMEPATH%\.chia\mainnet\plotters` directory on Windows.

## Bladebit Simulate

The Bladebit plotter includes a "Simulator" to give you an estimate of your farm's maximum capacity.







## Choosing a compression level

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

### Harvesting simulator

[start here]

