---
title: Plotting Software
slug: /plotting-software
---
## Software

We are introducing the ability to choose alternative plotters when creating plots both in the Chia GUI and the CLI.

Chia develops the Bladebit suite of plotters, which includes Bladebit cudaplot, ramplot, and diskplot. The reference implementation from mainnet launch is Chiapos, which isn’t used anymore but still exists for reference.


### Bladebit cudaplot

Status: alpha

[https://downloads.chia.net/bladebit](https://downloads.chia.net/bladebit) 

Requirements

* OS: Windows and Linux
* Memory: 256GB of DRAM
* GPUs: CUDA capability 5.2 (NVIDIA 10 series GPU or higher) with 8GB of GPU VRAM

Usage

`bladebit_cuda -f <farmer key> -c <contract address> -n 1 cudaplot /mnt/ssd`


### Bladebit [diskplot](https://www.chia.net/2022/08/08/announcing-bladebit-2-0/)

* Still uses temporary storage to create plots, accessible to the majority of farmers
* Very low minimum memory requirements (2-4G) for low resource plotting in embedded or entry-level systems
* Cross-platform and OS compatibility
* Sequential writes can better take advantage of SSD burst performance and reduce SSD wear by reducing write amplification factor.
* Can use DRAM write cache to significantly reduce SSD writes and can take advantage of any extra increments (no minimum required)
* Takes full advantage of increased disk bandwidth from PCIe 4.0
* Pipelined performance to max out CPU

Usage

Example with temporary SSD mounted to /mnt/ssd1 and destination drive as /mnt/ssd2, and using 100GB of DRAM cache to reduce temporary disk writes
`bladebit -t <system threads - 1> -f <farmer key> -c <contract address> -n 1 diskplot -t1 /mnt/ssd1/ -b 64 --cache 100G -a /mnt/ssd2`


### Bladebit ramplot
Usage

`bladebit -t <system threads - 1> -f <farmer key> -c <contract address> -n 1 ramplot /mnt/ssd`

### Additional 3rd party plotters

You can find additional 3rd party plotters on a list at [https://xch.farm/plotting/](https://xch.farm/plotting/) such as madMAx Gigahorse and chia-plotter.

## How to use in Chia

There is a new `chia` command for creating plots called `plotters`. For compatibility, the original command for creating plots `chia plots create` remains in place, however, this will always use the reference chiapos plotter. In order to use the other plotters, you must use the new `chia plotters` command. Command line options differ with each plotter, so be sure to check the available options using `chia plotters <plotter> -h`. Available plotter values include "chiapos", "bladebit", and "madmax".

The UI also has new functionality to support selecting a plotter.

Note: Not all features are available for every plotter.

## Installation

The bladebit and madMAx plotters will come packaged together with the installers on each platform. Using the install package (deb, rpm, dmg, exe) is the easiest way to get properly configured for using Chia with the alternative plotters. This is the supported method for installing and using Chia with the alternative plotters.

When running Chia by cloning the chia-blockchain git repository, it's possible to have the Chia CLI build and install BladeBit and madmax plotters from source. To install a plotter, use the `chia plotters install <plotter>` command, where `<plotter>` is either "bladebit" or "madmax". Chia will attempt to configure and build the specified plotter, but variations in OS environments may yield build failures. When using the `chia plotters install` command, the source and built plotters will reside in the `~/.chia/mainnet/plotters` directory on macOS and Linux, or the `%HOMEDRIVE%%HOMEPATH%\.chia\mainnet\plotters` directory on Windows.
