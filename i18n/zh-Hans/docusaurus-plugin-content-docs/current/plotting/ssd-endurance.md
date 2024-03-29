---
title: SSD的耐久性
slug: /ssd-endurance
---

The fastest plot creation is done completely in memory, but requires a server with a large amount of DRAM (256 GB for BladeBit CUDA, or 416 GB for BladeBit RAM). Most consumer motherboards don't support this much memory, so temporary storage must be used. This typically comes in the form of an SSD.

当今的主流SSD使用NAND闪存技术来存储数据。 NAND具有高性能、可扩展性和低成本，适用于几乎所有的计算领域，包括手机、SD卡、消费级笔记本电脑和数据中心。 However, NAND must be erased before the cell is programmed, a process known as a program erase cycle. This can only be performed a certain amount of times before the NAND cell wears out and can no longer reliably store user data. 一般来说，这被定义为SSD不再满足UBER(不可纠正位错误率)、保持时间(在给定温度下，设备在关机状态下可以安全地存储用户数据的时间)或功能故障(设备不能再开机)的条件。

<div style={{ textAlign: 'left' }}>
  <img src="/img/ssd-endurance/tbw_dwpd.png" alt="TBW versus DWPD" />
  <figcaption style={{ textAlign: 'left' }}>
    <em>Meme credit: Scrutinous</em>
  </figcaption>
</div>

衡量SSD耐久性的度量标准是以一定的工作负载为基础的写入总量，即TBW。 一般来说，工作负载是根据JEDEC组织的JESD219工作负载来定义的。 An SSD can still plot well beyond meeting its rated TBW limit, because UBER can be measured (when seeing host errors) and retention is not required (Chia plotting requires temporary or ephemeral storage).

| 地块生成程序        | 缓存/内存磁盘 | K=32的写入次数 |
| ------------------- | ------------- | -------------- |
| Chiapos beta (2020) | 0             | 1.8 TBW        |
| Chiapos 2021        | 0             | 1.4 TBW        |
| madMAx Chia_plot    | 0             | 1.43 TBW       |
| madMAx Chia_plot    | 110G          | 0.396 TBW      |
| Bladebit Disk       | 0             | 1.225 TBW      |
| Bladebit Disk       | \>99G         | 0.381 TBW      |

Consumer NVMe SSDs are generally not recommended due to their lower endurance, and they often employ caching algorithms to faster media (SLC, or single level cell) for great bursty performance. They do not perform well under heavy workload sustained I/O. 虽然有一些高性能的消费级NVMe SSD可以提供出色的生成地块性能，但较低的TBW将导致更快的磨损。

这里有一些[耐久性示例](https://docs.google.com/spreadsheets/d/1mNUYRWeJUaijEZXupwP5k6IuATZGj1FB/edit#gid=1857251151)。

You can learn more about SSD endurance from this [SNIA whitepaper from JM](https://www.snia.org/forums/cmsi/ssd-endurance).

## 计算

- NAND P/E循环=在NANDcell耗尽之前NAND可以执行的编程/擦除周期的数量。 NAND以页面为单位编程(写入)和块为单位擦除(包含许多页面)
- 磨损 - SSD不再满足UBER(uncorrectable bit error rate,不可纠正位错误率)、保持(在关机状态下安全存储数据的时间)、故障率或用户容量
- UBER = 数据错误数量/读取的位数
- WAF(Write Amplification Factor，写放大因子)= NAND写入/主机写入
- TBW或PBW – 在耐久性耗尽之前主机写入SSD的量
- TBW = 驱动器容量 \* 周期数 / WAF
- DWPD(drive writes per day，每天驱动写入次数)：在保修期内(通常为5年)每天可以向设备写入的数据量，而不会磨损
- DWPD = TBW/365/5/驱动器容量

## 在Linux中监控耐久性

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

TBW = 输出 _ 1000 _ 512B / (1000^4) 或 (1024^4)

要找出NAND写入量，需要使用NVMe-CLI的供应商插件。

```bash
sudo nvme <vendor name> help
```

例如，使用Intel SSD时的示例

```bash
sudo nvme intel smart-log-add /dev/nvme0
```

### SATA

在SATA中，您可以使用以下命令

```bash
sudo apt install smartmontools
```

```bash
sudo smartctl -x /dev/sda | grep Logical
```

```bash
sudo smartctl -a /dev/sda
```

查找Media_Wearout_Indicator

请注意，这对于NVMe也适用的基本SMART健康信息

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

Overview of SSD endurance testing from JEDEC industry standard here https://www.jedec.org/sites/default/files/Alvin_Cox%20%5BCompatibility%20Mode%5D_0.pdf
