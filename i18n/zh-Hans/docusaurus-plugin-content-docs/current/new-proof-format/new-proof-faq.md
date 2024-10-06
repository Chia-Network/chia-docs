---
sidebar_label: FAQ
title: FAQ
slug: /new-proof-faq
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page will answer your most common questions. Expect it to grow with time.

### What will this break/change?

Initially nothing, to give everyone time to upgrade. When the hard fork becomes activated six months after the release of Chia 3.0 there will be changes to the blockchain consensus which will cause non-upgraded full nodes and wallets to break. The upgrades software vendors will need to make before then are small and will be included in the reference codebase. Farmers will have to replot during the transition period and use upgraded plotters and harvesters. The computational requirements for harvesting will be slightly larger than with the original plot file format but vastly less than for compressed plots.

### When will I be able to farm with new plots on mainnet?

After the hard fork date, currently expected Q4 2025 (see [timeline](/new-proof-timeline)).

### When will the old plot format be fully phased out?

By the end of the transition period, currently expected Q4 2026 (see [timeline](/new-proof-timeline)).

### When should I replot?

Sometime during the transition period. When will be best for you will depend on your setup, but there will be a long enough time that the plots compliant with the new format will be neutral in weight to your existing plots so you can do it at your leisure. We will provide guidelines on how to evaluate which time window would be ideal to transition for your setup.

### With a modern GPU such as a 4090, what will be my expected plot times?

Around 5 minutes for a k32 ~100GiB plot, but this may change depending on how the final parameters are tuned for the proof of space. See our table of [expected plot times](/new-proof-plotting-requirements#expected-plot-times).

### Will you also support CPU plotting, and if so, what will be my expected plot times?

CPU plotting will be supported but will not be recommended for plotting any significant amount. A single CPU thread will be about 1000x slower than a 4090, potentially completing a k30 in 3 hours. The more CPU threads and memory channels your system has will reduce this time. Current testing on a high-end multi-threaded system is about 40-50x slower than a 4090, and may produce a k32 in around 3 hours.

### What will the hardware requirements be for harvesters?

For a small farmer using unused disk space on their system, a CPU is sufficient. For harvesters with >100TB of spare space, a CPU is sufficient but a low-end GPU may be more efficient. For harvesters with >1PiB, a low-end GPU (e.g. 3060Ti) is recommended.

There will also be the option of adding a little more data to your plots (up to ~15% more space), so that CPU usage is almost completely idle and can support a large number of Petabytes even on a Raspberry Pi. How much a Raspberry Pi could support on default plots is still pending benchmarking from an optimized implementation.

See our [farming requirements](/new-proof-farming-requirements) for more detailed information.

### What is the difficulty level in the new format?

The new plot format allows us to tune a difficulty setting to directly influence plot time. The higher the plot time, the more compression resistant the format becomes. However, we need to balance the difficulty with what should be an acceptable plotting time for most farmers, yet still have enough difficulty for significant compression resistance. Currently, we are tuning difficulty so that a 3060Ti GPU can process the plot construction in about the same time it takes to write the data to HDD, which is around 11 minutes per k32 plot (100GiB).

### How do you know that compression won’t be possible with the new format?

Compression is always possible, but the incentive will be severely limited. For instance, you could compress 100% of the plot by constructing a plot on the fly in under 30 seconds when a challenge comes in. However, this would require a cluster of the latest GPU’s to achieve, and would cost hundreds of thousands of dollars, just to spoof the space taken up by less than a TB. Alternatively, a farmer could make a plot with just 1 bit dropped per entry, and save ~0.5% of space. However, even this could incur more energy per TiB than the honest farmer.

In the future we expect extremely high efficiency in compute, however, storage will also improve in cost and efficiency during that time. With the advent of extremely low power SSDs when on idle, most farmers will be better off staying with the default plot format. Those farmers looking to squeeze the most out of their system by bit-dropping for extra levels of compression might achieve marginal gains despite higher energy costs per eTiB, but risk needing to replot and adjust their systems based on price fluctuations. If compute efficiency significantly outpaces gains in storage cost and efficiency, we could see bit-dropping with recompute reaching up to 10% space savings with marginal extra % gains in net rewards.

### Will there still be a plot filter after the new format is available?

Yes, and there are also additional filters in play. However, these filters are not expected to vary on a timed schedule (we only propose changing them if/when needed, with plenty of advanced notice), so as a farmer you won’t need to plan for any pre-scheduled dates where the filter will change. It is possible, if there are no longer any HDDs in use, we could propose a fork to alter the plot filter to improve resistance further since the restriction on seek times for HDDs would be lifted. Also, if GPU efficiency increases substantially in the future, to 10x or 100x what it is today, we can apply a soft fork to increase the plot difficulty – this would affect plot times and allow the phase-in of new plots that would be resistant to the hardware specifications at that future point in time. Note, however, that as cost per TB and also idle storage Watts also decreases over time, this counterbalances with GPU efficiency. So, while we may see 10x more efficient GPUs in 5 years, it does not necessarily mean we already need to adjust plot difficulty since the economics of farming on cheaper storage with extremely low idle power usage will also be a factor.

### How many times will I have to replot?

Once for the foreseeable 5-year outlook, and possibly much longer. The security of the network against rental attacks should be very strong for at least 10 years.

### What's this about different HDD and SSD plot formats?

There will be a single proof format for the blockchain. There will be no way to tell which blocks came from which format. There will be a proof format available to SSD which is smaller than on HDD but which is impractical to make work on HDD because of the seek times required for the number of lookups.

### How much space will someone be able to save using GPU compression?

It will be possible to save a few percent of space using bit dropping but the costs will go up exponentially. Currently we expect a 4090 on a large farm may be incentivized to compress up to 2-3% of the plot size, although this is still subject to change based on the final tuning parameters for the proof of space.
