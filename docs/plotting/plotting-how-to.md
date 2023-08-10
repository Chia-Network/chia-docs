---
sidebar_label: How To Plot
title: How To Plot
slug: /plotting-how-to
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Keys

To create plots, a farmer must know their **Farmer Public Key** and **Pool Contract Address**.

[todo demo how to create a public key]
[todo demo how to create a contract address]
A farmer must create a plotnft first to have a pool contract address.

These can be found with the following commands:

```bash
chia keys show
chia plotnft show
```

## CLI Plotting



## GUI Plotting

Start the process by clicking the green button saying **Add a Plot**.

1. You will choose a plotting software. Getting started plotting with Bladebit Disk is the easiest.

2. Starting size plot is k=32 (101 GiB)

3. Chose number of plots. If you're just learning, get started by creating just a single plot.

4. Select a temporary directory. You need a temp storage location of at least 500GB. If you only have 256GB you can use madMAx chia-plotter. This is where the temp space is filled and a lot of writing will be done. For many plots it is not recommended to use the same SSD as your primary.

5. Input number of threads (recommended system threads - 1), bucket count (recommended 64), and optional amount of additional ram cache, and select the alternating method

:::info
Enterprise and data center SSDs offer higher endurance and sustained write performance vs consumer drives, and can be found inexpensively second hand. Read more about recommendations at [SSD Endurance](/ssd-endurance).
:::

6. Select a final directory. This is where the final plot file will be copied to. Once the plot is created it will go to this location to be farmed to earn XCH. Storage will fill quickly due to the size of plots. Storage can be internal or usb connected drives.

:::info
Network drives can work but could congest your local network or be too slow to respond for rewards (the max is 30 seconds, but under 5 is ideal). It is recommended that you set the first `log_level` to `INFO` in `config.yaml` which will allow you to see extra information in `debug.log`.
:::

7. Join a pool - this will give you the option to select the plotnft you have already created.

8. Click **create** to start process.
