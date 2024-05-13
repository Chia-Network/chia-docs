---
sidebar_label: Software
title: Plotting Software
slug: /plotting-software
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Several Chia plotters are now available. The output (a plot) will be nearly identical for a given k-value and compression level. However, the hardware requirements are different for each plotter.

The four families of plotters include:

- BladeBit -- developed by Chia Network Inc.
- DrPlotter -- developed by DrNick and supported by Chia Network Inc.
- madMAx -- developed external to CNI
- ChiaPoS -- the original plotter, developed by CNI

This page provides details about the plotters that exist within each of these families.

---

## Plotters

### BladeBit CUDA

#### A GPU plotter, included with Chia 2.0

Plot capabilities

- Type: Compressed or uncompressed
- Size: k32 only (larger sizes to be added later)

Requirements

- OS: Windows 11 or Debian/Ubuntu Linux (MacOS and other flavors of Linux will likely be supported in the future)
- Memory:
  - For 100% in-memory plotting: 256 GB of DRAM
  - For RAM + disk plotting: 16 GB (experimental) or 128 GB (only available on linux)
- Temporary Disk:
  - Not used for 256 GB version
  - SSD required for \<= 128 GB of RAM
- GPU: CUDA capability 5.2 (NVIDIA 10 series GPU or higher) with 8GB of GPU VRAM
- Software: CUDA toolkit version 11.8 or later

More info

- The newest BladeBit plotter, designed to work with CUDA-class GPUs
- Creates compressed plots, up to C9 (75.2 GB)
- The fastest Chia plotter for most hardware architectures that meet the minimum specs
- The 256 GB version creates plots entirely in memory, so no temp disk is needed
- Open-source, freely available, no dev fee
- Can also be installed as a [standalone build](#bladebit-standalone)
- A detailed analysis of BladeBit CUDA's performance was undertaken by [scienceofmining.com](https://scienceofmining.com/20230828-BladeBit/BladeBit%20CUDA%20Performance%20Analysis-1.html)

[CLI documentation](/plotters-cli#cudaplot)

**Example command**

The following command will create a single plot with a compression level of 7. It will use the specified keys and contract address in case the farmer is located on a different machine. It will use the defaults for the remaining parameters:

```bash
chia plotters bladebit cudaplot -d <destination dir> -f <farmer key> -p <pool key> -c <contract address> -n 1 --compress 7
```

---

### BladeBit RAM

#### An all-memory CPU plotter, included with Chia 2.0

Plot capabilities

- Type: Compressed or uncompressed
- Size: k32 only (larger sizes to be added later)
- [More info](https://www.chia.net/2022/08/08/announcing-bladebit-2-0/)

Requirements

- OS: Windows, Mac, or Linux OS (64-bit is required); Intel and ARM (Apple Silicon) are both supported.
- Memory: 416 GB of available RAM
- Temporary Disk: Not used
- GPU: Not used

More info

- Designed to be used in high-memory servers that don't have a GPU
- Creates compressed plots, up to C9 (75.2 GiB)
- Creates plots entirely in memory, so no temp disk is needed
- Typically not as fast as BladeBit CUDA
- Open-source, freely available, no dev fee
- Can also be installed as a [standalone build](#bladebit-standalone)

[CLI documentation](/plotters-cli#ramplot)

**Example command**

The following command will create a single plot with a compression level of 7. It will use the specified keys and contract address in case the farmer is located on a different machine. It will use the defaults for the remaining parameters:

```bash
chia plotters bladebit ramplot -d <destination dir> -f <farmer key> -p <pool key> -c <contract address> -n 1 --compress 7
```

---

### Bladebit Disk

#### A disk-based (HDD or SSD) CPU plotter, included with Chia 2.0

Plot capabilities

- Type: Uncompressed only in Chia 2.0, Compressed beginning in 2.1
- Size: k32 only

Requirements

- OS: Windows, Mac, or Linux OS (64-bit is required); Intel and ARM (Apple Silicon) are both supported.
- Memory: Minimum 2 GB of available RAM, with lower bucket counts requiring up to 12 GB
- Temporary Disk: 480 GB in default mode, or 390 GB with `--alternate` mode enabled; can be HDD or SSD:
  - SSD: fast (NVMe is supported) but consumer-grade SSDs wear out over time, enterprise-grade is recommended
  - HDD: slow, but won't wear out; can plot directly to the final disk
- GPU: Not used

More info

- Designed to be used in embedded or entry-level systems
- Can only create uncompressed plots (C0, 101.4 GiB) in Chia version 2.0
- The use of temporary HDD or SSD storage makes it accessible to the majority of farmers
- Sequential writes can better take advantage of SSD burst performance and reduce SSD wear by reducing write amplification factor
- Can use DRAM write cache to significantly reduce SSD writes and can take advantage of any extra increments (no minimum required)
- Takes full advantage of increased disk bandwidth from PCIe 4.0
- Pipelined performance to max out CPU
- Can also be installed as a [standalone build](#bladebit-standalone)

[CLI documentation](/plotters-cli#diskplot)

**Example command**

The following command will create a single uncompressed plot (plot compression is disabled in Chia version 2.0.0). It will use the specified keys and contract address in case the farmer is located on a different machine. It will allocate 32 GB of DRAM cache, and it will use the specified temporary drive (typically an SSD) and destination drive. It will use the defaults for the remaining parameters:

```bash
chia plotters bladebit diskplot -t <temp dir> -d <destination dir> -f <farmer key> -p <pool key> -c <contract address> --cache 32G -n 1 --compress 0
```

---

### DrPlotter

#### A standalone GPU plotter

Plot capabilities

- Type: Compressed plots
- Size: k32 only

Requirements

- DrPlotter Minimum Requirements:
  - 24GB nvidia 3090 / A5000 / 4090 
  - 128GB DDR4 RAM 
  - motherboard with a PCIE 4.0 x 16 slot 
  - 64 bit processor (onboard GPU a bonus)
  - Ubuntu / Debian based system

- DrSolver Minimum Requirements:
  - 24GB nvidia 3090. 
  - Ubuntu / Debian based system

- DrChia Harvester Minimum Requirements:
  - ~4GB RAM for every 1PiB of raw disk space. 
  - Ubuntu / Debian based system


More info

- Up to +413% Rewards: Two compression modes offer a balance between optimal efficiency and optimal cost per eTB for maximum ROI. 
- Enhanced Security: Relies solely on public farmer keys, letting you safeguard your private keys. 
- Effortless Remote GPU Use: Enjoy a streamlined process for submitting proofs and the flexibility to use your GPU remotely with ease. 
- Supporting the Chia Ecosystem: By seamlessly integrating with the official Chia Farmers, DrPlotter plays a part in keeping the Chia network strong and decentralized.

For DrPlotter and DrServer commands please refer to the [CLI documentation](/plotters-cli#drplotter).  

See the video on the [Introduction to DrPlotter](https://www.youtube.com/watch?v=hQTV7foIRHo&t=3s).  

**Complete Instructions** for downloading and installing DrPlotter are available on the [DrPlotter GitHub page](https://github.com/drnick23/drplotter/wiki/Installation-Guide).

Abbreviated installation instructions:

1. Download the latest DrPlotter [software](https://github.com/drnick23/drplotter/releases)
2. Install the software (This will install drplotter, drsolver, and drchia for the harvester in the /usr/bin/ directory.):

```
sudo dpkg -i drplotter_0.12.0_amd64.deb 
```

After the installation has completed, the `drplotter` command will be available. For example, to obtain a list of options, run:

```
drplotter -h
```

**Example command**

The following plotting command will fill the directory with plots. While plotting, you'll see progress and when plots complete:

```bash
drplotter plot -f <your_farmer_key> -c <your_pool_contract_address> -d /your/hdd/directory/ --compression <eco3x or pro4x>
```

In addition to installing and plotting with DrPlotter you will need to:
- [Set your client token](https://github.com/drnick23/drplotter#setting-up-your-drplotter_client_token)
- [Run your DrSolvers](https://github.com/drnick23/drplotter#run-your-drsolver) 

If you already have other chia plots and installation you can:
- [Setup and run your DrChia harvester](https://github.com/drnick23/drplotter#setup-and-run-your-drchia-harvester) with your existing chia farmer.

To ensure proofs are being submitted you can follow this [guide](https://github.com/drnick23/drplotter#verify-your-drplots-are-submitting-proofs)

---

### Gigahorse

#### A third-party GPU plotter, available as a [standalone download](https://github.com/madMAx43v3r/chia-gigahorse)

Plot capabilities

- Type: Compressed or uncompressed
- Size: k30-34

More info

- Designed to work with CUDA-class GPUs
- Creates compressed plots
- Closed source, has dev fee depending on compression and whether CPU or GPU is used for farming

---

### madMAx

#### A third-party CPU plotter, included with Chia 2.0

Plot capabilities

- Type: Uncompressed only
- Size: Any

Requirements

- OS: Windows, Mac, or Linux OS (64-bit is required); Intel and ARM (Apple Silicon) are both supported.
- Memory: Depends on setup, minimum 0.5 GB if single-threaded
- Temporary Disk: SSD and HDD are supported
  - SSD: fast (NVMe is supported) but consumer-grade SSDs wear out over time, enterprise-grade is recommended
  - HDD: slow, but won't wear out; can plot directly to the final disk
- GPU: Not used

More info

- Designed to be used in embedded or entry-level systems
- Can only create uncompressed plots (C0, 101.4 GiB)
- The use of temporary HDD or SSD storage makes it accessible to the majority of farmers
- Pipelined performance to max out CPU

[CLI documentation](/plotters-cli#madmax)

**Example command**

```bash
chia plotters madmax -t <temp dir> -d <destination dir> -f <farmer key> -p <pool key> -c <contract address> -k <size> -n <number of plots>
```

---

### ChiaPoS

#### The original Chia CPU-based plotter

Plot capabilities

- Type: Uncompressed only
- Size: Any

Requirements

- OS: Windows, Mac, or Linux OS (64-bit is required); Intel and ARM (Apple Silicon) are both supported.
- Memory: 2 GB min
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

[CLI documentation](/plotters-cli#chiapos)

**Example command**

```bash
chia plotters chiapos -t <temp dir> -d <destination dir> -f <farmer key> -p <pool key> -c <contract address> -k <size> -n <number of plots>
```

---

### BladeBit (standalone)

While BladeBit does come installed with Chia version 2.0, there are a few reasons you might want to run the standalone version instead:

- You want to run the `simulate` command, to determine your farm's maximum size
- You want to test features that have not yet been released in the embedded version

**Complete instructions** for downloading and installing BladeBit are available on the [BladeBit GitHub page](https://github.com/Chia-Network/bladebit/).

Abbreviated installation instructions:

1. Install [cmake](https://cmake.org)
2. Clone BladeBit:

```
git clone https://github.com/Chia-Network/bladebit.git && cd bladebit
```

3. Create and enter a build directory:

```
mkdir -p build && cd build
```

4. Generate config files:

```
cmake ..
```

5. Build BladeBit:

```
cmake --build . --target bladebit --config Release
```

After the installation has completed, the `bladebit` command will be available from the `Release` directory. For example, to obtain a list of options, run:

```
./Release/bladebit -h
```

---

## Choosing a plotter

With so many plotters available, the decision of which one to choose may seem daunting. However, your hardware setup will often make the choice for you. If you have:

- At least 256 GB of RAM **and** a CUDA-class GPU with at least 8 GB of VRAM
  - You will likely want BladeBit CUDA
  - Gigahorse will also work
  - Other plotters will under-perform
- At least 16 GB of RAM (experimental) or at least 128 GB, but less than 256 GB **and** a CUDA-class GPU with at least 8 GB of VRAM, **and** a 256 GB or larger SSD (ideally enterprise NVMe)
  - You will likely want BladeBit CUDA
  - Gigahorse will also work
  - Other plotters will under-perform
- 416 GB of RAM but no GPU
  - BladeBit RAM is easily your best choice
- Less than 16 GB of RAM and don't mind creating uncompressed plots
  - BladeBit Disk and madMAx are both good options

It is always possible, and indeed recommended, to create a plot with a few different plotters to understand how well your system will perform. Once you have a feel for using the different plotters, you can begin plotting in earnest.

---

## CLI usage

There is a new `chia` command for creating plots called `plotters`. For compatibility, the original command for creating plots `chia plots create` remains in place, however, this will always use the reference ChiaPoS plotter. In order to use the other plotters, you must use the new `chia plotters` command. Command line options differ with each plotter, so be sure to check the available options using `chia plotters <plotter> -h` or by reading the online [CLI documentation](/plotters-cli). Available plotter values include "chiapos", "bladebit", and "madmax".

The UI also has new functionality to support selecting a plotter.

Note: Not all features are available for every plotter.
