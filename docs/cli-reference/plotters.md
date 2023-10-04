---
sidebar_label: Plotters
title: Plotters
slug: /plotters-cli
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This document is a comprehensive listing of CLI commands for creating plots from within Chia.

## Reference

### `chiapos`

Functionality: Use the `chiapos` plotter

Usage: chia plotters chiapos [OPTIONS]

Options:

| Short Command | Long Command        | Type    | Required | Description                                                                               |
| :------------ | :------------------ | :------ | :------- | :---------------------------------------------------------------------------------------- |
| -t            | --tmp_dir           | TEXT    | True     | Temporary directory 1 (where most of the plots temp data will be stored)                  |
| -2            | --tmp_dir2          | TEXT    | False    | Temporary directory 2 [Default: same as `tmp_dir`]                                        |
| -k            | --size              | INTEGER | False    | K value [Default: 32]                                                                     |
| -m            | --memo              | TEXT    | False    | Memo variable                                                                             |
| -i            | --id                | TEXT    | False    | Plot ID [Default: generate a random ID]                                                   |
| -b            | --buffer            | INTEGER | False    | Size of the buffer, in MB [Default: 4608]                                                 |
| -u            | --buckets           | INTEGER | False    | Number of buckets [Default: 64]                                                           |
| -s            | --stripes           | INTEGER | False    | Stripe size [Default: 65536]                                                              |
| -r            | --threads           | INTEGER | False    | Num threads [Default: 2]                                                                  |
| -e            | --nobitfield        | None    | False    | Disable bitfield [Default: bitfield is enabled]                                           |
|               | --override-k        | None    | False    | Force size smaller than 32 (only needed where `-k` is less than 32 [Default: disabled]    |
| -a            | --alt_fingerprint   | INTEGER | False    | Enter the alternative fingerprint of the key you want to use                              |
| -c            | --contract          | TEXT    | False    | Pool Contract Address (64 chars) [Default: none]                                          |
| -f            | --farmerkey         | TEXT    | False    | Farmer Public Key (48 bytes) [Default: use the key from the current wallet]               |
| -p            | --pool-key          | TEXT    | False    | Pool Public Key (48 bytes) [Default: use the key from the current wallet (self-pooling)]  |
| -n            | --count             | INTEGER | False    | Number of plots to create [Default: 1]                                                    |
| -x            | --exclude_final_dir | None    | False    | Skips adding [final dir] to harvester for farming [Default: copy to final dir is enabled] |
| -d            | --final_dir         | TEXT    | True     | Final directory after plot has been created                                               |
|               | --compress          | INTEGER | False    | Compression level [Default: 0 (not compressed)]                                           |
| -h            | --help              | None    | False    | Show a help message and exit                                                              |

---

### `madmax`

Functionality: Use the madMAx plotter

Usage: chia plotters madmax [OPTIONS]

Options:

| Short Command | Long Command  | Type    | Required | Description                                                                              |
| :------------ | :------------ | :------ | :------- | :--------------------------------------------------------------------------------------- |
| -k            | --size        | INTEGER | False    | K value [Default: 32]                                                                    |
| -n            | --count       | INTEGER | False    | Number of plots to create [Default: 1]                                                   |
| -r            | --threads     | INTEGER | False    | Num threads [Default: 4]                                                                 |
| -u            | --buckets     | INTEGER | False    | Number of buckets [Default: 256]                                                         |
| -v            | --buckets3    | INTEGER | False    | Number of buckets for phases 3 and 4 [Default: 256]                                      |
| -t            | --tmp_dir     | TEXT    | True     | Temporary directory 1 (where most of the plots temp data will be stored)                 |
| -2            | --tmp_dir2    | TEXT    | False    | Temporary directory 2 [Default: same as `tmp_dir`]                                       |
| -w            | --waitforcopy | None    | False    | Wait for the plot to finish copying before starting the next plot [Default: don't wait]  |
| -p            | --pool-key    | TEXT    | False    | Pool Public Key (48 bytes) [Default: use the key from the current wallet (self-pooling)] |
| -f            | --farmerkey   | TEXT    | False    | Farmer Public Key (48 bytes) [Default: use the key from the current wallet]              |
| -c            | --contract    | TEXT    | False    | Pool Contract Address (64 chars) [Default: none]                                         |
| -G            | --tmptoggle   | None    | False    | Alternate tmpdir/tmpdir2 [Default: disabled]                                             |
| -K            | --rmulti2     | INTEGER | False    | Thread multiplier for P2 [Default: 1]                                                    |
| -d            | --final_dir   | TEXT    | True     | Final directory after plot has been created                                              |
| -h            | --help        | None    | False    | Show a help message and exit                                                             |

---

## `bladebit`

Functionality: Use one of the BladeBit plotters

Usage: chia plotters bladebit [cudaplot | ramplot | diskplot] [OPTIONS]

### `cudaplot`

Functionality: Use the BladeBit CUDA plotter

Usage: chia plotters bladebit cudaplot [OPTIONS]

Options:

| Short Command | Long Command          | Type    | Required | Description                                                                                    |
| :------------ | :-------------------- | :------ | :------- | :--------------------------------------------------------------------------------------------- |
| -r            | --threads             | INTEGER | False    | Num threads [Default: 12]                                                                      |
| -n            | --count               | INTEGER | False    | Number of plots to create [Default: 1]                                                         |
| -f            | --farmerkey           | TEXT    | False    | Farmer Public Key (48 bytes) [Default: use the key from the current wallet]                    |
| -p            | --pool-key            | TEXT    | False    | Pool Public Key (48 bytes) [Default: use the key from the current wallet (self-pooling)]       |
| -c            | --contract            | TEXT    | False    | Pool Contract Address (64 chars) [Default: none]                                               |
| -t            | --tmp_dir             | TEXT    | False    | Temporary directory 1 (where most of the plot's temp data will be stored) [Default: in memory] |
| -2            | --tmp_dir2            | TEXT    | False    | Temporary directory 2 [Default: same as `tmp_dir`]                                             |
| -i            | --id                  | TEXT    | False    | Plot ID [Default: generate a random ID]                                                        |
| -w            | --warmstart           | None    | False    | Set to enable warm start [Default: disabled]                                                   |
|               | --nonuma              | None    | False    | Set to disable numa [Default: enabled]                                                         |
|               | --no-cpu-affinity     | None    | False    | Set to disable assigning automatic thread affinity [Default: enabled]                          |
| -v            | --verbose             | None    | False    | Set to enable verbose output [Default: disabled]                                               |
| -d            | --final_dir           | TEXT    | True     | Final directory after plot has been created                                                    |
|               | --compress            | INTEGER | False    | Compression level, 0-9 are accepted [Default: 1]                                               |
|               | --device              | INTEGER | False    | The CUDA device index (typically 0 or 1), set if more than one GPU is installed [Default: 0]   |
|               | --disk-128            | None    | False    | Enable hybrid disk plotting, requires 128 GB of system RAM [Default: disabled]                 |
|               | --disk-16*            | None    | False    | Enable hybrid disk plotting, requires at least 16 GB of system RAM [Default: disabled] ***SEE WARNING BELOW**         |
| -h            | --help                | None    | False    | Show a help message and exit                                                                   |

:::warning warning

A few notes about the `disk-16` option:
* As of BladeBit 3.0.1 (Chia 2.1.0), `disk-16` is experimental.
* This option has been disabled in the Chia 2.1.0 release. It is currently only available from the [standalone version](https://github.com/Chia-Network/bladebit/) of BladeBit.
* Plots created with this option on Linux with direct I/O disabled appear to work, but more testing is still needed.
* Plots created with this option on Windows are more likely to encounter issues.
* Be sure to check all plots created with this option, as they could be invalid even if the plotter appeared to succeed.

:::

:::info

Computers with at least 256 GB of system memory should not use either the `disk-128` or `disk-16` options. 
They should also not use `tmp_dir` or `tmp_dir2`.
In this case, plotting will be performed entirely in memory.

Computers with at least 128 GB of system memory (but less than 256 GB) should use the `disk-128`, `tmp_dir`, and `tmp_dir2` options. 
In this case, most of the plotting will be done in memory, and some will be done on disk.

Linux computers with at least 16 GB of system memory (but less than 128 GB) can use the `disk-16`, `tmp_dir`, and `tmp_dir2` options. 
However, **do so at your own risk**. (See the above warning for details.) 
In this case, as much of the plotting as possible will be done in memory, and the rest will be done on disk.

:::

---

### `ramplot`

Functionality: Use the BladeBit RAM plotter

Usage: chia plotters bladebit ramplot [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                              |
| :------------ | :---------------- | :------ | :------- | :--------------------------------------------------------------------------------------- |
| -r            | --threads         | INTEGER | False    | Num threads [Default: 12]                                                                |
| -n            | --count           | INTEGER | False    | Number of plots to create [Default: 1]                                                   |
| -f            | --farmerkey       | TEXT    | False    | Farmer Public Key (48 bytes) [Default: use the key from the current wallet]              |
| -p            | --pool-key        | TEXT    | False    | Pool Public Key (48 bytes) [Default: use the key from the current wallet (self-pooling)] |
| -c            | --contract        | TEXT    | False    | Pool Contract Address (64 chars) [Default: none]                                         |
| -i            | --id              | TEXT    | False    | Plot ID [Default: generate a random ID]                                                  |
| -w            | --warmstart       | None    | False    | Set to enable warm start [Default: disabled]                                             |
|               | --nonuma          | None    | False    | Set to disable numa [Default: enabled]                                                   |
|               | --no-cpu-affinity | None    | False    | Set to disable assigning automatic thread affinity [Default: enabled]                    |
| -v            | --verbose         | None    | False    | Set to enable verbose output [Default: disabled]                                         |
| -d            | --final_dir       | TEXT    | True     | Final directory after plot has been created                                              |
|               | --compress        | INTEGER | False    | Compression level, 0-9 are accepted [Default: 1]                                         |
| -h            | --help            | None    | False    | Show a help message and exit                                                             |

---

### `diskplot`

Functionality: Use the BladeBit disk plotter

Usage: chia plotters bladebit diskplot [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                         |
| :------------ | :---------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------- |
| -r            | --threads         | INTEGER | False    | Num threads [Default: 12]                                                                           |
| -n            | --count           | INTEGER | False    | Number of plots to create [Default: 1]                                                              |
| -f            | --farmerkey       | TEXT    | False    | Farmer Public Key (48 bytes) [Default: use the key from the current wallet]                         |
| -p            | --pool-key        | TEXT    | False    | Pool Public Key (48 bytes) [Default: use the key from the current wallet (self-pooling)]            |
| -c            | --contract        | TEXT    | False    | Pool Contract Address (64 chars) [Default: none]                                                    |
| -i            | --id              | TEXT    | False    | Plot ID [Default: generate a random ID]                                                             |
| -w            | --warmstart       | None    | False    | Set to enable warm start [Default: disabled]                                                        |
|               | --nonuma          | None    | False    | Set to disable numa [Default: enabled]                                                              |
| -v            | --verbose         | None    | False    | Set to enable verbose output [Default: disabled]                                                    |
| -d            | --final_dir       | TEXT    | True     | Final directory after plot has been created                                                         |
|               | --no-cpu-affinity | None    | False    | Set to disable assigning automatic thread affinity [Default: enabled]                               |
|               | --cache           | INTEGER | False    | Size of cache to reserve for I/O                                                                    |
|               | --f1-threads      | INTEGER | False    | Override the default thread count (12) for F1 generation                                                         |
|               | --fp-threads      | INTEGER | False    | Override the default thread count (12) for forward propagation                                                   |
|               | --c-threads       | INTEGER | False    | Override the default thread count (12) for C table processing                                                    |
|               | --p2-threads      | INTEGER | False    | Override the default thread count (12) for Phase 2                                                               |
|               | --p3-threads      | INTEGER | False    | Override the default thread count (12) for Phase 3                                                               |
|               | --alternate       | None    | False    | Set to halve the temp2 cache size requirements by alternating bucket writing methods between tables |
| -t            | --tmp_dir         | TEXT    | True     | Temporary directory 1 (where most of the plot's temp data will be stored)                           |
| -2            | --tmp_dir2        | TEXT    | False    | Temporary directory 2 [Default: same as `tmp_dir`]                                                  |
| -u            | --buckets         | INTEGER | False    | Number of buckets [Default: 256]                                                                   |
| -m            | --memo            | TEXT    | False    | Memo variable                                                                                       |
|               | --no-t1-direct    | None    | False    | Set to disable direct I/O on the temp 1 directory                                                   |
|               | --no-t2-direct    | None    | False    | Set to disable direct I/O on the temp 2 directory                                                   |
|               | --compress        | INTEGER | False    | Compression level, 0-9 are accepted [Default: 1]                                                    |
| -h            | --help            | None    | False    | Show a help message and exit                                                                        |

---

### `simulate`

Functionality: Determine your farm's maximum capacity; this command is **only** avaible with the [standalone version](https://github.com/Chia-Network/bladebit/) of BladeBit.

Usage: bladebit simulate [OPTIONS] <plot_file_path>

Options:

| Short Command | Long Command | Type       | Required | Description                                                                    |
| :------------ | :----------- | :--------- | :------- | :----------------------------------------------------------------------------- |
| -n            | --iterations | INTEGER    | False    | The number of iterations to run [Default: 100]                                 |
| -p            | --parallel   | INTEGER    | False    | The number of instances to run in parallel [Default: 1]                        |
| -l            | --lookup     | FLOAT      | False    | Maximum allowed time per proof lookup, in seconds [Default: 8.00]              |
| -f            | --filter     | INTEGER    | False    | Plot filter bit count [Default: 512]                                           |
|               | --partials   | INTEGER    | False    | Partials per-day simulation [Default: 300]                                     |
|               | --power      | INTEGER    | False    | Time in seconds to run power simulation. -n is set automatically in this mode. |
| -s            | --size       | INTEGER    | False    | Size of farm. Only used when `--power` is set.                                 |
|               | --seed       | HEX STRING | False    | 64 char hex string to use as a random seed for challenges                      |
|               | --no-cuda    | None       | False    | If set, don't use CUDA for decompression. [Default: not set]                   |
| -d            | --device     | INTEGER    | False    | Cuda device index, to be used when more than one device exists [Default: 0]    |
| -h            | --help       | None       | False    | Show a help message and exit                                                   |

---