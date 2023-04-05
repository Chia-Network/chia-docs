---
title: K Sizes
slug: /k-sizes
---

# K size with compression level

| Compression Level | Plot Size k=32 (GiB) | Plot Size k=32 (GB) | Plot Size k=33 (GiB) | Plot Size k=34 (GiB) | Plot Size k=35 (GiB) |
| ----------------- | -------------------- | ------------------- | -------------------- | -------------------- | -------------------- |
| 0                 | 101.4                | 108.8               | 208.8                | 429.9                | 884.1                |
| 1                 | 87.5                 | 94.0                | 179.6                | 368.2                | 754.3                |
| 2                 | 86.0                 | 92.4                | 176.6                | 362.1                | 742.2                |
| 3                 | 84.5                 | 90.7                | 173.4                | 355.9                | 729.7                |
| 4                 | 82.9                 | 89.0                | 170.2                | 349.4                | 716.8                |
| 5                 | 81.3                 | 87.2                | 167.0                | 343.0                | 704.0                |
| 6                 | 79.6                 | 85.5                | 163.8                | 336.6                | 691.1                |
| 7                 | 78.0                 | 83.8                | 160.6                | 330.2                | 678.3                |
| 9                 | 75.2                 | 80.7                | 154.1                | 315.5                | 645.8                |

:::info
**k=32 is the minimum plot size** that will be eligible for farming. Although you may see k=25, this is used for testing purposes only.
:::
When planning on how much plotting space is required, only calculate the temporary disk size requirement.

If stagger plotting, disk size requirement may change depending on which Phase the plotting is at.

## Plots larger than k=32

Although not required, plots larger than k=32 may be created. There is not a great benefit to using larger plot sizes as the chance of winning is proportional to final plot file size. There are advanced tactics to using a larger `k` value to reduce unused storage space or optimize drive idle states, but these are not recommended for the majority of people
