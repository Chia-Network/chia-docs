---
title: K Sizes
slug: /k-sizes
---

# Storage requirements

Temp storage requirements are for the chiapos plotter. Temp space differs for other plotting software, but final plot size will be the same.

| K-size | Temp. Size         | Final Size           |
| ------ | ------------------ | -------------------- |
| K=25   | 600 MiB (256.6 GB) | 1.7 GiB (1.8 GB)     |
| K=32   | 239 GiB (256.6 GB) | 101.4 GiB (108.9 GB) |
| K=33   | 512 GiB (550 GB)   | 208.8 GiB (224.2 GB) |
| K=34   | 1041 GiB (1118 GB) | 429.8 GiB (461.5 GB) |
| K=35   | 2175 GiB (2335 GB) | 884.1 GiB (949.3 GB) |

:::info
**k=32 is the minimum plot size** that will be eligible for farming. Although you may see k=25, this is used for testing purposes only.
:::
When planning on how much plotting space is required, only calculate the temporary disk size requirement.

If stagger plotting, disk size requirement may change depending on which Phase the plotting is at.

## Plots larger than k=32

Although not required, plots larger than k=32 may be created. There is not a great benefit to using larger plot sizes as the chance of winning is proportional to final plot file size. As a result, the only benefit to using a larger `k` value is to manage less files or strategically fill hard drives fully.
