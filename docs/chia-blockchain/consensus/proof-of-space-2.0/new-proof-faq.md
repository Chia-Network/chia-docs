---
sidebar_label: FAQ
title: FAQ
slug: /chia-blockchain/consensus/proof-of-space-2.0/new-proof-faq
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

This information was updated on March 3, 2026.

:::

This page will answer your most common questions. Expect it to grow with time.

### What will this break/change?

When the hard fork activates at block `9'562'000` (November 2026), there will be changes to the blockchain consensus which will cause non-upgraded full nodes and wallets to break. The upgrades software vendors will need to make before then are small and will be included in the reference codebase. Farmers will have to replot during the transition period. The min spec hardware from farming will be increased to a Raspberry Pi 5 with 8 GB of RAM (currently, it's a Pi 4).

### If I use the reference wallet, but I’m not a farmer, will I need to upgrade anything?

Yes, you will need to upgrade your wallet to version 3.0 before block 9,562,000. If you fail to do so, then your wallet may fall out of sync until you perform the upgrade. However, the funds contained within your wallet will remain secure.

### If I use the Cloud Wallet, will I need to upgrade anything?

CNI runs several nodes to host the Cloud Wallet infrastructure, so all you will need to do is occasionally refresh your browser window to pick up any changes.

### How about if I use Sage or another ecosystem wallet?

If you use any ecosystem wallet including Sage, you will need to make sure to stay upgraded to the latest version of your wallet software. The operators of those wallets will be responsible for upgrading their own infrastructure.

### When will I be able to farm with new plots on mainnet?

You will be able to farm with PoS2 plots when the 3.0 hard fork activates. This is currently scheduled for block `9'562'000`, expected to occur in November 2026. See our [timeline](/chia-blockchain/consensus/proof-of-space-2.0/new-proof-timeline) for more details.

### When will the old plot format be fully phased out?

After the fork activates, there will be a transition period of 256 days, during which PoS1 plots will become less likely to win. The last block in which PoS1 plots are expected to be valid is `10'741'648`, which should occur in June or July 2027. See our [timeline](/chia-blockchain/consensus/proof-of-space-2.0/new-proof-timeline)) for more details.

### When should I replot?

Sometime during the transition period. When will be best for you will depend on your setup, but there will be a long enough time that the plots compliant with the new format will be neutral in weight to your existing plots so you can do it at your leisure. We will provide guidelines on how to evaluate which time window would be ideal to transition for your setup.

### With a modern GPU such as a 5090, what will be my expected plot times?

Around 2 seconds per plot, or 40 TiB per day for minimum-strength plots. See our table of [expected plot times](/chia-blockchain/consensus/proof-of-space-2.0/new-proof-plotting-requirements#plotting-performance-and-requirements).

### Will you also support CPU plotting, and if so, what will be my expected plot times?

CPU plotting will be supported, but will be slower than GPU plotting. A 6-core Ryzen 5600 will plot create minimum-strength plots in around 30 seconds, or around 4 TiB per day.

### How much RAM/VRAM will I need to plot?

For all-RAM plotting with a GPU, the current usage without swapping is around 12 GB of VRAM. It might be possible to lower this number, but this is not a guarantee. As for all-RAM CPU plotting, 16 GB will be the maximum amount needed.

### What will the hardware requirements be for harvesters?

The minimum spec hardware for harvesting and farming is a Raspberry Pi 5 with 8 GB of RAM. This computer will be able to farm around 2 PiB of storage without any issues.

See our [farming requirements](/chia-blockchain/consensus/proof-of-space-2.0/new-proof-farming-requirements) for more detailed information.

### What is plot strength?

This term refers to the amount of compute that was needed to generate a plot. Each increment in strength will require around double the compute. The hardware requirements to create a plot, as well as its final size are unaffected.

The minimum strength will begin at 0, and we will raise it as needed to maintain the network’s security. However, we do not intend to increase the minimum strength until at least 2036.

### Why would I want to plot at a higher strength than the minimum?

The primary reason would be to reduce disk usage. Plots created at a higher strength will need to be accessed less frequently. A second reason would be to increase your plots’ longevity. However, we expect (though can’t guarantee) plots created at the minimum strength today to remain valid for a decade, so we don’t expect many farmers to plot at higher strengths for this reason alone.

### Will there be a maximum plot strength?

Yes. The maximum strength will start at 8, and will increment as the base filter is decreased. Strength needs to be capped in order to ensure that the network’s minimum spec hardware can validate all proofs in a timely manner.

### Will “stronger” plots win more often? Less often? Neither?

Neither. If plot B is twice as “strong” as plot A, then it will pass the filter half as often, and it will be twice as likely to find a valid proof once it does pass the filter. As a result, the long-term expected earnings of both plots will be identical.

### How much longer will the creation time be for plots created at strengths higher than the minimum?

At the lowest strength intervals, increasing the strength by one level will require slightly less than double the creation time. This is due to some overhead in the creation process. After around strength=4, the overhead will be negligible, so plots created at higher strengths will need almost exactly twice as long to be created.

### Can I use an HDD as a temporary drive while creating large groups, or is RAM or an SSD required?

An HDD will typically write at 250MB/s, which takes 4 seconds per plot in the group to write. This could be done in a background thread while creating the next plot for the group. So, it becomes a bottleneck only if you are plotting faster than 1 plot every 4 seconds. And even in that case, you could alleviate the bottleneck by increasing the plot strength so that it takes longer than 4 seconds to create each plot.

Once all plots in the group have been written to temporary storage, you can run another single-thread to merge them into the final grouped plot. That will take as long as the HDD takes to read all data and rewrite it to the target destination. CPU load would only take 1 thread, and memory load could be less than 1 GB. During this process, you could begin creating plots for a new group with a different process.

TLDR: Yes, you could use a spare HDD to make the big grouped plots without much impact on your plotting times.

### How are groups stored on disk? As a single file? Multiple files?

It’s possible to divide a group into as many files as needed. If you follow our recommendations and use groups of 64 or 128 plots, then you will probably want each of your groups to consist of a single file.

### Why would I want to separate my group into multiple files?

To avoid having to use a large temporary space. Recall that while creating plots to be included in a single group, you need to store the completed plots somewhere temporarily.

Let’s say you have a 20 TB HDD and you decide to fill it with a single group of 20,000 plots. If you only created one file, then you would need another 20 TB on which to store the plots temporarily, before combining them into a single file. This could be slow and cumbersome to achieve. If instead, you created 200 files of 100 GB each, then you would only need 100 GB of storage, which would allow for in-RAM temp storage on many systems. In both cases, the result is a single group of 20 TB, but in the former case you have one file, and in the latter case you have 200 files.

### Why shouldn’t I break down a group even further? Why not use 1000 files?

To prevent taking too long to submit a valid proof. By definition, each file from the same group will pass the filter together. When this happens, each file will undergo two disk seeks. On an HDD, each seek might take 10 ms. If you have 1000 files in the same group, then 2000 disk seeks will be needed, and this will require upwards of 20,000 ms, or 20 seconds. This is too much time – taking more than 8 seconds risks being too much time to find and submit a proof.

### Will I need to use meta groups? Why or why not?

Meta groups are not required. The primary use case for meta groups is to smooth disk usage as much as possible. The vast majority of farmers today can forgo meta groups without any noticeable difference. Meta groups should be considered an advanced feature.

### Why even include meta groups if almost nobody will use them?

They could be quite helpful in the future. Whereas today, most HDDs used for farming are around 20-24 TB, a decade from now they could be 200 TB, or even larger. A 200 TB HDD filled with groups of 128 plots would require over 1500 files to be stored on disk. In this case, the load might spike so much that the disk isn’t able to keep up at certain signage points. We wanted to include this feature today so that it will be available when it is needed in the future.

### If I don’t want to use meta groups, will I still need to specify a meta group, or will there be a default?

Each group will be assigned the default meta group of 0 if left unspecified.

### If I have 10 groups with one meta group, are they guaranteed to pass the filter at the same time?

No. If you have 10 groups with one meta group, then each group will pass (or not pass) the filter independently. It would be like rolling 10 dice. You might roll zero 1s or ten 1s, or anything in between. Each die acts independently of each other die.

On the other hand, if you have 10 groups, each of which is assigned a unique meta group, then you have a guarantee that at most one of your plots groups will pass the filter at a given signage point.

### What is the largest farm size supported in PoS v2?

There is no effective limit. This is because each group can declare its own meta groups. For example, group A can have plots with group indices 0..65535 within meta group 0. The same group can then have an additional 65,536 plots within meta group 1, and so. Each of the 256 available meta groups can have 65,536 plots assigned to it, so the maximum group size is 2^8 \* 2^16 = 2^24 (16,777,216) plots, or around 16.8 PB for a single group. Farmers can create as many groups as they want, so there farm can grow arbitrarily large (there technically is a limit due to the length of a plot ID, but this is such a large number, it's essentially unlimited).

### How do you know that compression won’t be possible with the new format?

Compression is always possible, but the incentive will be severely limited. For instance, you could compress 100% of the plot by constructing a plot on the fly in under 30 seconds when a signage point comes in. However, this would require a cluster of the latest GPUs to achieve, and would cost hundreds of thousands of dollars, just to spoof the space taken up by less than a TB. Alternatively, a farmer could make a plot with just 1 bit dropped per entry, and save ~0.5% of space. However, even this could incur more energy per TiB than the honest farmer.

In the future we expect extremely high efficiency in compute, however, storage will also improve in cost and efficiency during that time. With the advent of extremely low power SSDs when on idle, most farmers will be better off staying with the default plot format. Those farmers looking to squeeze the most out of their system by bit-dropping for extra levels of compression might achieve marginal gains despite higher energy costs per eTiB, but risk needing to replot and adjust their systems based on price fluctuations.

### Will there still be a plot filter after the new format is available?

In PoS2, there are two related filters to consider: the network's base filter, and the effective filter for a plot or a group.

The base filter indicates the lowest filter allowed for all plots across the network. This filter will start `512` and will automatically be adjusted downward every 3-6 years at pre-defined block heights, until it reaches `1`, where it will remain. The following table shows the built-in reductions to the base filter:

| Block height | Year | Base Filter Bits | Base Filter |
| :----------- | :--- | :--------------- | :---------- |
| ` 9'562'000` | 2026 | 9                | 512         |
| `19'663'000` | 2032 | 8                | 256         |
| `24'708'000` | 2035 | 7                | 128         |
| `29'759'000` | 2038 | 6                | 64          |
| `34'809'000` | 2041 | 5                | 32          |
| `39'860'000` | 2044 | 4                | 16          |
| `44'905'000` | 2047 | 3                | 8           |
| `49'956'000` | 2051 | 2                | 4           |
| `55'006'000` | 2054 | 1                | 2           |
| `60'056'000` | 2057 | 0                | 1           |

In the scenario where we feel comfortable with delaying these reductions, we will do so with a soft fork.

Each plot will also have its own `effective filter`, which determines the likelihood that it is eligible to participate in a challenge at a given signage point. The effective filter is calculated based on a given plot's strength -- for each level above the minimum strength, a plot's effective filter is doubled. For example, if a plot's strength is 1 level above the minimum, and the base filter is 512, then that plots's effective filter is 1024.

There is also a `maximum effective filter` of `8192`, regardless of the plot's strength. This is imposed to prevent certain attacks that could occur with very high strengths.

### What's this about different HDD and SSD plot formats (i.e. what is benes compression)?

While our original thinking was to release two separate formats, we have now simplified the design so that only a single format is needed for both HDDs and SSDs. As for Benes compression, while it originally was an intriguing way to reduce plots by a few percent, this is no longer needed in our simplified design, so we have also dropped our plans to use it.

### How much space will someone be able to save using GPU compression?

PoS2 uses a single-table design, in which plots are one continuous blob of sorted data, with no additional table pointers, back-references, or structural redundancies. This design effectively eliminates economically viable plot compression. In theory, one could save 2-3% via bit-dropping, but it would require multiple orders of magnitude in additional compute to reconstruct the plots in real time.

### For an energy-conscious farmer, what will be the optimal CPU or GPU for farming?

A low-power device like a Raspberry Pi 5 is sufficient to handle even large farms spanning multiple petabytes.

For HDD-based farms, HDDs consume more power (typically around 50 to 100% more) when actively reading compared to being idle. While more benchmarking will be needed, it may make sense over the long run for some farmers to plot at a high difficulty level so that they can idle (or even power down) their HDDs most of the time. They will use more compute/energy when initially creating their plots, in exchange for reduced ongoing energy consumption; there is not a straightforward equation to determine which approach will be more energy-efficient without taking multiple factors into account.

### When do you expect the CHIP to be made publicly available?

There are two publicly available CHIPs related to PoS2:

- [CHIP-48](https://github.com/Chia-Network/chips/pull/160) describes the specification for PoS2
- [CHIP-49](https://github.com/Chia-Network/chips/pull/161) details the timelines for PoS2, as well as some other unrelated changes that will go into the hard fork

### When can I review the source code for plotting?

The source code is located in the [pos2-chip](https://github.com/Chia-Network/pos2-chip) GitHub repository.

### Have you decided how long the transition period will be?

The transition period will last 256 days, starting with the fork's activation. To provide feedback and discuss this transition period please refer to [CHIP-49](https://github.com/Chia-Network/chips/pull/161).

### How will grinding be prevented?

Plot grinding will be possible, but not economical. For example, a 5090 GPU `($3700)` will be only able to mimic around 20 TB `($20)` of storage via plot grinding. This nearly 200x price difference doesn't take into account the ongoing electricity usage of running a 5090 continuously, versus what an HDD might use.

[CHIP-48](https://github.com/Chia-Network/chips/pull/160) contains a detailed analysis of various grinding attacks and how the new PoS protects from them.

### Under the current settings for the new format, for how long do you expect to be able to support k-28?

We have no plans for dropping support for k28 plots. It is expected to be the only valid plot size going forward.

The new plot format has been designed to resist both rental and compression attacks, even against more powerful GPUs that may be developed in the future. This makes it uncertain whether FPGAs or other specialized hardware would gain any meaningful advantage for plot compression. Reducing plot size through bit-dropping quickly becomes impractical, as the resources required to achieve even a modest reduction escalate to nearly the same as grinding full plots.

### What are the settings that could be changed in a hard/soft fork to prevent grinding or other techniques to turn PoSpace into PoW?

[CHIP-49](https://github.com/Chia-Network/chips/pull/161) contains a detailed analysis of the various settings that can be changed to protect from grinding and other techniques.
