---
title: Plotting Software
slug: /plotting-software
---

We are introducing the ability to choose alternative plotters when creating plots both in the Chia GUI and the CLI.

The plotters supported include Bladebit, madMAx, and the original reference chiapos plotter. Each plotter has slightly different hardware requirements and may need slightly different options specified.

## madMAx

We are packaging a version of madMAx from a Chia Network fork, however, there are no substantial changes in the functionality of this plotter and we do not anticipate making improvements or responding to issues in madMAx. Issues with the madMAx plotter should continue to be addressed through the original madMAx repository on GitHub (https://github.com/madMAx43v3r/chia-plotter). The Chia Network fork serves primarily as a means of generating build artifacts. We are including the madMAx plotter with the express permission of "madMAx43v3r" (https://github.com/madMAx43v3r)

For details on settings and usage of madMAx please refer to the original madMAx GitHub repository, or run the help command
`chia plotters madmax -h`

The recommended configuration to start at is to set -r to the number of physical CPU cores in the system. The DRAM is set automatically determined by core count and bucket size, with less DRAM being used with larger buckets. The default of 256 is generally recommended for NVMe SSDs, although people can try different combinations to obtain the best plotting speeds.

## Bladebit

Bladebit is a high-performance, RAM-only, k32-only plotter. It has high memory requirements: at least 416 GiB of RAM is required. Typically it is meant for high-end plotting setups. Bladebit is now an official part of Chia and it has been used successfully to produce petabytes worth of plots.

It was written from scratch with the intention of saturating CPU and memory usage. It can create a single k32 plot in as fast as 3 minutes, 12 seconds on Intel Ice Lake Xeon CPUs.

Linux and Windows are both supported, with Linux currently yielding significantly faster plot times. macOS is not supported at this time and bladebit is not available to select in the UI on macOS.

When using Bladebit the typical bottleneck becomes the final write to disk. To ensure uninterrupted plotting, users tend to choose to write the plots temporarily to a set of NVMe drives and then moving them from the NVMe drive to their final destination, whilst the next consecutive plot continues.

```
chia plotters bladebit -h
```

## How to use in Chia

There is a new `chia` command for creating plots called `plotters`. For compatibility, the original command for creating plots `chia plots create` remains in place, however, this will always use the reference chiapos plotter. In order to use the other plotters, you must use the new `chia plotters` command. Command line options differ with each plotter, so be sure to check the available options using `chia plotters <plotter> -h`. Available plotter values include "chiapos", "bladebit", and "madmax".

The UI also has new functionality to support selecting a plotter.

Note: Not all features are available for every plotter.

## Installation

The bladebit and madMAx plotters will come packaged together with the installers on each platform. Using the install package (deb, rpm, dmg, exe) is the easiest way to get properly configured for using Chia with the alternative plotters. This is the supported method for installing and using Chia with the alternative plotters.

When running Chia by cloning the chia-blockchain git repository, it’s possible to have the Chia CLI build and install BladeBit and madmax plotters from source. To install a plotter, use the `chia plotters install <plotter>` command, where `<plotter>` is either "bladebit" or "madmax". Chia will attempt to configure and build the specified plotter, but variations in OS environments may yield build failures. When using the `chia plotters install` command, the source and built plotters will reside in the `~/.chia/mainnet/plotters` directory on macOS and Linux, or the `%HOMEDRIVE%%HOMEPATH%\.chia\mainnet\plotters` directory on Windows.
