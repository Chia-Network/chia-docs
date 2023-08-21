---
title: SSD Endurance
slug: /ssd-endurance
---

The fastest plot creation is done completely in memory, but requires a server with a large amount of DRAM (256 GB for BladeBit CUDA, or 416 GB for BladeBit RAM). Most consumer motherboards don't support this much memory, so temporary storage must be used. This typically comes in the form of an SSD.

Mainstream SSDs today use NAND flash technology to store data. NAND is high performance, scalable, and low cost - warranting the use in virtually every computing segment from mobile phones, SD cards, consumer laptops, and data centers. However, NAND must be erased before the cell is programmed, a process known as a program erase cycle. This can only be performed a certain amount of times before the NAND cell wears out and can no longer reliably store user data. This is defined generally as an SSD no longer meeting the UBER (uncorrectable bit error rate), retention time (how long the device can store user data safely while powered off, at a given temperature), or functional failure (device can no longer power on).

<div style={{ textAlign: 'left' }}>
  <img src="/img/ssd-endurance/tbw_dwpd.png" alt="TBW versus DWPD" />
  <figcaption style={{ textAlign: 'left' }}>
    <em>Meme credit: Scrutinous</em>
  </figcaption>
</div>

The metrics to measure endurance of an SSD is defined in Terabytes Written, or TBW, at a certain workload. The workload defined is generally the JESD219 workload from JEDEC organization. An SSD can still plot well beyond meeting its rated TBW limit, because UBER can be measured (when seeing host errors) and retention is not required (Chia plotting requires temporary or ephemeral storage).

| Plotter             | Cache / Ramdisk | Writes per K=32 |
| ------------------- | --------------- | --------------- |
| Chiapos beta (2020) | 0               | 1.8 TBW         |
| Chiapos 2021        | 0               | 1.4 TBW         |
| madMAx Chia_plot    | 0               | 1.43 TBW        |
| madMAx Chia_plot    | 110G            | 0.396 TBW       |
| Bladebit Disk       | 0               | 1.225 TBW       |
| Bladebit Disk       | \>99G           | 0.381 TBW       |

Consumer NVMe SSDs are generally not recommended due to their lower endurance, and they often employ caching algorithms to faster media (SLC, or single level cell) for great bursty performance. They do not perform well under heavy workload sustained I/O.
There are very high performance consumer NVMe SSDs that will offer great plotting performance, but the lower rated endurance in TBW will result in a faster wearout.

Here are some [endurance examples](https://docs.google.com/spreadsheets/d/1mNUYRWeJUaijEZXupwP5k6IuATZGj1FB/edit#gid=1857251151).

You can learn more about SSD endurance from this [SNIA whitepaper from JM](https://www.snia.org/forums/cmsi/ssd-endurance).

## Math

- NAND P/E Cycles = amount of program / erase cycles NAND can do before wearing out. NAND programs (writes) in pages and erases in blocks (contains many pages)
- Wearing out - SSD no longer meeting UBER (uncorrectable bit error rate), retention (keeping data safe while powered off), failure rate, or user capacity
- UBER = number of data errors / number of bits read
- WAF (Write Amplification Factor) = NAND writes / host writes
- TBW or PBW – amount of host writes to SSD before wearing out
- TBW = drive capacity \* cycles / WAF
- DWPD (drive writes per day): amount of data you can write to device each day of the warranty (typically 5 years) without wearing out
- DWPD = TBW/365/5/drive capacity

## Monitor Endurance in Linux

### NVMe

You can learn more about the NVMe CLI on the [NVMe CLI GitHub repository](https://github.com/linux-nvme/nvme-cli) or [NVMe CLI blog post](https://nvmexpress.org/open-source-nvme-management-utility-nvme-command-line-interface-nvme-cli).

You can read total endurance used with the following NVMe CLI command:

```bash
sudo nvme smart-log /dev/nvme0 | grep percentage_used
```

This is how to read the amount of writes that the drive has actually done:

```bash
sudo nvme smart-log /dev/nvme0 | grep data_units_written
```

Bytes written = output _ 1000 _ 512B

TBW = output _ 1000 _ 512B / (1000^4) or (1024^4)

To find out NAND writes, you will have use the vendor plugins for NVMe-CLI.

```bash
sudo nvme <vendor name> help
```

Example with an Intel SSD

```bash
sudo nvme intel smart-log-add /dev/nvme0
```

### SATA

In SATA you can use the following commands

```bash
sudo apt install smartmontools
```

```bash
sudo smartctl -x /dev/sda | grep Logical
```

```bash
sudo smartctl -a /dev/sda
```

looking for Media_Wearout_Indicator

note this does also work for NVMe for basic SMART health info

```bash
sudo smartctl -a /dev/nvme0
```

### SAS

```bash
sg_logs /dev/sg1 --page=0x11
```

Look for

```
Percentage used endurance indicator: 0%
```

Overview of SSD endurance testing from JEDEC industry standard here
https://www.jedec.org/sites/default/files/Alvin_Cox%20%5BCompatibility%20Mode%5D_0.pdf
