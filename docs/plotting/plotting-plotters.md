---
sidebar_label: Plotters
title: Plotters
slug: /plotting-plotters
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Several Chia plotters are now available. The output (a plot) will be nearly identical for a given k-value and compression level. However, the hardware requirements are different for each plotter.

The three families of plotters include:
* BladeBit -- developed by Chia Network, Inc. 
* madMAx -- developed external to CNI
* Chiapos -- the original plotter, developed by CNI and now obsolete

:::info

Each of the BladeBit and madMAx plotters will utilize a plotting machine's resources to the maximum extent possible. For this reason, there is no benfit to creating multiple plots in parallel with these plotters.

The Chiapos plotter, on the other hand, only uses a single CPU core for most of the plotting process. This was the first Chia plotting software, and it is not optimized. It is now considered obsolete, but if for some reason you want to try it, keep in mind that you will likely want to create multiple plots in parallel in order to maximize efficiency. Each new plot will add additional system requirements, so staggering them is also recommended. It is possible to run out of resources such as RAM and disk space when using the Chiapos plotter.

:::

This page provides details about the plotters that exist within each of these families.

## TCO table

[todo this is good but doesn't really belong here]

A great place to estimate your farm's TCO (Total Cost of Ownership) is with [this spreadsheet](https://docs.google.com/spreadsheets/d/1k6c-OBDtggXqnEfOPdMmq3646puzvOD7dWojwCH2v3c). Simply make a copy of it, then fill in the constants according to your farm. 

### Bladebit cudaplot

Description: An all-memory plotter capable of creating compressed plots to be farmed with a CPU or GPU

Plot type: Compressed or uncompressed

Status: beta

[https://downloads.chia.net/bladebit](https://downloads.chia.net/bladebit)

Requirements

- OS: Windows 11 or Debian/Ubuntu Linux (MacOS and other flavors of Linux will likely be supported in the future)
- Memory: 256GB of DRAM
- GPUs: CUDA capability 5.2 (NVIDIA 10 series GPU or higher) with 8GB of GPU VRAM
- Software: CUDA toolkit version 11.8 or later

CLI Usage

```bash
bladebit_cuda -f <farmer key> -c <contract address> -n 1 cudaplot /mnt/ssd
```

### Bladebit ramplot

Description: A fast, all-memory plotter

Plot type: Uncompressed only

[More info](https://www.chia.net/2022/08/08/announcing-bladebit-2-0/)

Status: [available](https://github.com/Chia-Network/bladebit)

Requirements

- OS: In theory, it should work on any 64-bit Windows, Mac, or Linux OS; Intel and ARM (Apple Silicon) are both supported.
- Memory: 416 GiB of available RAM
- GPUs: Not needed

CLI Usage

```bash
bladebit -t <system threads - 1> -f <farmer key> -c <contract address> -n 1 ramplot /mnt/ssd
```

### Bladebit diskplot

Description: A disk-based plotter for low-power systems

Plot type: Uncompressed only

Status: [available](https://github.com/Chia-Network/bladebit)

Requirements

- OS: In theory, it should work on any 64-bit Windows, Mac, or Linux OS; Intel and ARM (Apple Silicon) are both supported.
- Memory: Minimum 4 GiB of available RAM, with lower bucket counts requiring up to 12 GiB
- Disk space: 480 GiB of temp space in default mode, or 390 GiB with `--alternate` mode enabled; can be HDD or SSD:
  - SSD: fast (NVMe is supported) but consumer-grade SSDs wear out over time, enterprise grade is recommended
  - HDD: slow, but won't wear out; can plot directly to the final disk
- GPUs: Not needed

More info:

- The use of temporary HDD or SSD storage makes it accessible to the majority of farmers
- Designed to be used in embedded or entry-level systems
- Sequential writes can better take advantage of SSD burst performance and reduce SSD wear by reducing write amplification factor.
- Can use DRAM write cache to significantly reduce SSD writes and can take advantage of any extra increments (no minimum required)
- Takes full advantage of increased disk bandwidth from PCIe 4.0
- Pipelined performance to max out CPU

CLI Usage:

Example with temporary SSD mounted to /mnt/ssd1 and destination drive as /mnt/ssd2, and using 100GB of DRAM cache to reduce temporary disk writes

```bash
bladebit -t <system threads - 1> -f <farmer key> -c <contract address> -n 1 diskplot -t1 /mnt/ssd1/ -b 64 --cache 100G -a /mnt/ssd2
```


### Additional 3rd party plotters

You can find additional 3rd party plotters on a list at [https://xch.farm/plotting/](https://xch.farm/plotting/) such as madMAx Gigahorse and chia-plotter.

## How to use in Chia

There is a new `chia` command for creating plots called `plotters`. For compatibility, the original command for creating plots `chia plots create` remains in place, however, this will always use the reference chiapos plotter. In order to use the other plotters, you must use the new `chia plotters` command. Command line options differ with each plotter, so be sure to check the available options using `chia plotters <plotter> -h`. Available plotter values include "chiapos", "bladebit", and "madmax".

The UI also has new functionality to support selecting a plotter.

Note: Not all features are available for every plotter.

## Installation

The bladebit and madMAx plotters will come packaged together with the installers on each platform. Using the install package (deb, rpm, dmg, exe) is the easiest way to get properly configured for using Chia with the alternative plotters. This is the supported method for installing and using Chia with the alternative plotters.

When running Chia by cloning the chia-blockchain git repository, it's possible to have the Chia CLI build and install BladeBit and madmax plotters from source. To install a plotter, use the `chia plotters install <plotter>` command, where `<plotter>` is either "bladebit" or "madmax". Chia will attempt to configure and build the specified plotter, but variations in OS environments may yield build failures. When using the `chia plotters install` command, the source and built plotters will reside in the `~/.chia/mainnet/plotters` directory on macOS and Linux, or the `%HOMEDRIVE%%HOMEPATH%\.chia\mainnet\plotters` directory on Windows.

## Bladebit Simulate

The Bladebit plotter includes a "Simulator" to give you an estimate of your farm's maximum capacity.