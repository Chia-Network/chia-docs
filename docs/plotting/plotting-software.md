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

With so many plotters available, the decision of which one to choose may seem daunting. However, your hardware setup will often make the choice for you. If you have:
- At least 256 GiB of RAM **and** a CUDA-class GPU with at least 8 GiB of VRAM
  - You will likely want BladeBit CUDA
  - Gigahorse will also work
  - Other plotters will underperform
- At least 64 GiB of RAM (but less than 256 GiB) **and** a CUDA-class GPU with at least 8 GiB of VRAM, **and** a 256 GB or larger SSD (ideally enterprise NVMe)
  - The beta version of BladeBit CUDA will likely work
  - Gigahorse will also work
  - Other plotters will underperform
- 416 GiB of RAM but no GPU
  - BladeBit RAM is easily your best choice
- Less than 64 GiB of RAM and don't mind creating uncompressed plots
  - BladeBit Disk and madMAx are both good options

It is always possible, and indeed recommended, to create a plot with a few different plotters to understand how well your system will perform. Once you have a feel for using the different plotters, you can begin plotting in earnest.

## CLI usage

There is a new `chia` command for creating plots called `plotters`. For compatibility, the original command for creating plots `chia plots create` remains in place, however, this will always use the reference chiapos plotter. In order to use the other plotters, you must use the new `chia plotters` command. Command line options differ with each plotter, so be sure to check the available options using `chia plotters <plotter> -h`. Available plotter values include "chiapos", "bladebit", and "madmax".

The UI also has new functionality to support selecting a plotter.

Note: Not all features are available for every plotter.
