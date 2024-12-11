---
sidebar_label: FAQ
title: FAQ
slug: /new-proof-faq
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

This information was updated on 12/11/2024.

:::

This page will answer your most common questions. Expect it to grow with time.

### What will this break/change?

Initially nothing, to give everyone time to upgrade. When the hard fork becomes activated six months after the release of Chia 3.0 there will be changes to the blockchain consensus which will cause non-upgraded full nodes and wallets to break. The upgrades software vendors will need to make before then are small and will be included in the reference codebase. Farmers will have to replot during the transition period and use upgraded plotters and harvesters. The computational requirements for harvesting will be slightly larger than with the original plot file format but vastly less than for compressed plots.

### When will I be able to farm with new plots on mainnet?

After the hard fork date, currently expected Q4 2025 (see [timeline](/new-proof-timeline)).

### When will the old plot format be fully phased out?

By the end of the transition period, currently expected Q4 2026 (see [timeline](/new-proof-timeline)).

### When should I replot?

Sometime during the transition period. When will be best for you will depend on your setup, but there will be a long enough time that the plots compliant with the new format will be neutral in weight to your existing plots so you can do it at your leisure. We will provide guidelines on how to evaluate which time window would be ideal to transition for your setup.

### With a modern GPU such as a 3090, what will be my expected plot times?

Around 1-2 minutes for a k32 ~100GiB plot, but this may change depending on how the final parameters are tuned for the proof of space. See our table of [expected plot times](/new-proof-plotting-requirements#expected-plot-times).

### Will you also support CPU plotting, and if so, what will be my expected plot times?

CPU plotting will be supported but will not be recommended for plotting any significant amount. A multi-threaded CPU will be about 100x slower than a 3090, potentially completing a k30 in 45 minutes. The more CPU threads and memory channels your system has will reduce this time.

### What will the hardware requirements be for harvesters?

Harvesting consists of two main components: plot retrieval and proof solving when a good proof is found.

For plot retrieval, even large farms can use low-spec computers such as original Raspberry Pis, as most of the time is spent simply reading from storage, which uses minimal compute resources.

The proof-solving hardware requirement depends on the largest plot size (k-size) in your farm, not the total number of plots. If a proof of space wins a block or pool partial, your hardware must be capable of solving proofs for the largest k-size plot within the required timeframe.

For example, if your farm includes k28, k30, and k32 plots, your proof-solving machine must meet the requirements for solving k32 proofs, even if the majority of your plots are smaller. If you want a single machine for both harvesting tasks (plot retrieval and proof solving), it should meet the k32 specs for solving proofs and can also handle plot retrieval.

For large farms or setups with multiple harvesters, you can use low-spec devices like Raspberry Pis for plot retrieval and designate a higher-spec machine capable of solving proofs for your largest k-size as the central proof-solving service. If your farm contains only k28 plots, a Raspberry Pi 5 can serve as both a plot retrieval device and the central proof-solving service for your entire farm.

See our [farming requirements](/new-proof-farming-requirements) for more detailed information.

### What is the difficulty level in the new format?

The new plot format allows us to tune a difficulty setting to directly influence plot time. The higher the plot time, the more compression resistant the format becomes. However, we need to balance the difficulty with what should be an acceptable plotting time for most farmers, yet still have enough difficulty for significant compression resistance.

### How do you know that compression won’t be possible with the new format?

Compression is always possible, but the incentive will be severely limited. For instance, you could compress 100% of the plot by constructing a plot on the fly in under 30 seconds when a challenge comes in. However, this would require a cluster of the latest GPU’s to achieve, and would cost hundreds of thousands of dollars, just to spoof the space taken up by less than a TB. Alternatively, a farmer could make a plot with just 1 bit dropped per entry, and save ~0.5% of space. However, even this could incur more energy per TiB than the honest farmer.

In the future we expect extremely high efficiency in compute, however, storage will also improve in cost and efficiency during that time. With the advent of extremely low power SSDs when on idle, most farmers will be better off staying with the default plot format. Those farmers looking to squeeze the most out of their system by bit-dropping for extra levels of compression might achieve marginal gains despite higher energy costs per eTiB, but risk needing to replot and adjust their systems based on price fluctuations. If compute efficiency significantly outpaces gains in storage cost and efficiency, we could see bit-dropping with recompute reaching up to 10% space savings with marginal extra % gains in net rewards.

### Will there still be a plot filter after the new format is available?

Yes, and there are also additional filters in play. However, these filters are not expected to vary on a timed schedule (we only propose changing them if/when needed, with plenty of advanced notice), so as a farmer you won’t need to plan for any pre-scheduled dates where the filter will change. It is possible, if there are no longer any HDDs in use, we could propose a fork to alter the plot filter to improve resistance further since the restriction on seek times for HDDs would be lifted. Also, if GPU efficiency increases substantially in the future, to 10x or 100x what it is today, we can apply a soft fork to increase the plot difficulty – this would affect plot times and allow the phase-in of new plots that would be resistant to the hardware specifications at that future point in time. Note, however, that as cost per TB and also idle storage Watts also decreases over time, this counterbalances with GPU efficiency. So, while we may see 10x more efficient GPUs in 5 years, it does not necessarily mean we already need to adjust plot difficulty since the economics of farming on cheaper storage with extremely low idle power usage will also be a factor.

### How many times will I have to replot?

Once for the foreseeable 5-year outlook, and possibly much longer. The security of the network against rental attacks should be very strong for at least 10 years.

### What's this about different HDD and SSD plot formats (i.e. what is benes compression)?

There will be a single proof format for the blockchain. There will be no way to tell which blocks came from which format. There will be a proof format available that uses Benes Compression which we initially thought would only work on SSD but after testing has proven to also work on HDD.

Benes compression is designed to save approximately **7-8 bits per entry per plot**, regardless of the k-size. This results in notable space savings, especially for smaller plots like k28, which have the fewest bits per entry. For a k28 plot, this translates to an estimated **5-10% reduction in plot size**.

While the space savings are promising, constructing Benes-compressed plots comes with significant challenges:

- **All-RAM Plotting**: Plotting with Benes requires all-RAM construction, and demands additional system resources.
- **Longer Plot Times**: Plot creation using Benes compression is expected to take significantly more time and energy compared to traditional plotting methods.
- **GPU Assistance Uncertainty**: It is currently unclear whether GPUs can effectively assist CPUs in constructing Benes-compressed plots, as the plotting process is difficult to parallelize. This limitation raises questions about whether plotting speeds could exceed 100 GiB/day on a single system.
- **Increased disk activity**: Benes-compressed plots require twice the disk reads during farming. This increased disk activity may negate the energy savings achieved from smaller plot sizes, particularly for HDD-based setups.

The additional cost and energy required for Benes-compressed plotting and increased disk activity during harvesting may outweigh the benefits of 5-10% space savings. Farmers will need to assess whether these savings are sufficient to justify the increased plotting resources and time.

Despite these challenges, we plan to include an **option for Benes compression** in the upcoming release for those who wish to experiment with it. Farmers can decide whether the trade-offs align with their individual farming strategies and goals.

### How much space will someone be able to save using GPU compression?

It will be possible to save a few percent of space using bit dropping but the costs will go up exponentially. Currently we expect a 4090 on a large farm may be incentivized to compress up to 2-3% of the plot size, although this is still subject to change based on the final tuning parameters for the proof of space.

### For an energy-conscious farmer, what will be the optimal CPU or GPU for farming?

Smaller k-sizes, such as k28, lead to increased disk activity, which in turn raises the energy consumption of storage media. For SSDs, this extra activity is negligible, and a low-power device like a Raspberry Pi 5 is sufficient to handle even large farms spanning multiple petabytes.

For HDD-based farms, HDDs consume more power (typically around 50 to 100% more) when actively reading compared to being idle. For example, a large 20TiB HDD filled with k28 plots will be active approximately 6% of the time, compared to 0.4% for k32 plots, and just 0.1% for k34 plots. This would result in a 3-6% increase in energy consumption when using k28 instead of k32 or k34 plots.

For farmers with a large number of drives, it may be more efficient to use a higher-performance recompute machine capable of handling larger k-size plots (e.g., k32) without consuming more power than the additional energy costs incurred by smaller plots. A system like a Mac Mini M1 offers low idle power usage and can efficiently handle k32 plots or larger.

The most energy-conscious approach is to leverage an existing system already online that meets the recomputation requirements for larger k-sizes. By running a solver on standby, this system can handle requests for full proofs as needed with negligible impact on its overall energy usage. This method avoids the need for additional dedicated hardware while keeping power consumption minimal.

### When do you expect the CHIP to be made publicly available?

The scope of changes to the original plot format has expanded significantly due to recent technological advancements. To ensure a comprehensive and practical release, we plan to make the CHIP publicly available once development of the plotter and solver is complete and extensively tested to be near production-ready.

This approach will allow us to provide accurate performance metrics that reflect real-world usage, giving farmers a clear understanding of what to expect. Our tentative timeline for the CHIP release is **Q1 2025**.

### When can I review the source code for plotting?

When the CHIP is released we will have code for plotting and verification available for review.

### Have you decided how long the transition period will be?

6-12 months.

### Given that a 3090 can create a k-28 plot in 5 seconds, how will grinding be prevented?

Grinding, or creating a plot on the fly without storing to disk, generates rewards that are roughly the same per compute across the various k-sizes, provided the grinding fits into fast memory. With GPU clusters now having large VRAM capacities, there is no practical k-size that cannot be accommodated in some advanced GPU system. For instance, a k28 will complete a 3GiB plot in 5 seconds, and likewise, a k32, being ~18 times larger (~61 GiB), would take 18 times longer on the same GPU. However, with a cluster of 18 GPUs, the k32 plot could still be generated in approximately 5 seconds.

In the original proof of space design, grinding posed a significant risk because a grinder could exploit the **plot ID filter**. The filter passes plots with a 1 in 256 chance, meaning a grinder could spoof the equivalent of 256 plots by generating a plot ID that passes this filter.

The new proof of space introduces **two additional filters**—the **scan filter** and the **proof chaining filter**—to mitigate grinding risks. These filters significantly reduce the effectiveness of grinding by requiring that the plot passes the plot ID filter (1 in 256 chance), and also passes the scan filter and proof chaining filter, which introduce an additional 1 in 64 chance. As a result, the grinder can only spoof the equivalent of 4 plots per signage point. Across 3 signage points, this totals 12 spoofed plots before the plot ID filter changes for the next set of challenges.

For example, a 3090 could spoof a maximum of 24 k28 plots (~72GiB of storage). However, the cost of a 3090 far exceeds the cost of storing 72 GiB of data on an HDD for an honest farmer. Additionally, the energy consumption of a 3090 is vastly higher than the energy required to maintain 72 GiB of storage on an HDD.

To spoof **1 EiB** of netspace, a grinder would need to rent at least **15 million 3090 GPUs**. Even then, this is an order of magnitude less than the resources needed to control half of Chia’s netspace, making grinding practically and economically unfeasible on a large scale.

### What metrics should we look at in determining whether grinding will be possible (plot size, plot speed, filter size, etc)?

The feasibility of grinding can be assessed by calculating the amount of space that could be spoofed and comparing it to the resources required to achieve this.

First, we determine how quickly a system can generate plots and whether the generated space can meaningfully spoof a significant portion of netspace. Then, we assess the probability of passing filters (e.g., plot ID, scan, and proof chaining filters) and how many plots would need to be generated to spoof a given amount of space. And finally, we evaluate whether it is feasible to rent or acquire the required computational resources (e.g., GPUs or GPU clusters) to generate enough spoofed space to impact the network.

While it’s straightforward to calculate spoofed space (as demonstrated in the previous answer), the primary question is whether sufficient resources can be obtained at scale. For example: spoofing **20 EiB** of netspace would require **300 million 3090 GPUs**, far exceeding the global availability of GPUs today. Controlling such a large number of GPUs at a financially viable price is unlikely in the foreseeable future.

Thus, while grinding is theoretically possible, it remains economically and logistically infeasible to execute at a scale that could threaten the network.

### Under the current settings for the new format, for how long do you expect to be able to support k-28?

Short answer:
K28 plots are expected to remain viable for as long as no significant vulnerabilities emerge. If any risks arise, they would likely apply to higher K-sizes as well over time, given advancements in hardware and technology.

Long answer:
Under the current settings for the new format, the primary risk to continued support for K28 plots stems from the potential development of ASICs or FPGAs. These specialized devices could potentially reduce production costs for K28 plots compared to larger K-sizes, as smaller plots require less RAM. However, the viability of ASICs is a complex issue, heavily influenced by development costs and the financial rewards they might yield. While FPGAs, known for their high efficiency, could theoretically pose a risk if optimized, they are typically slower than high-end GPUs and face similar challenges.

The new plot format has been designed to resist both rental and compression attacks, even against more powerful GPUs that may be developed in the future. This makes it uncertain whether FPGAs or other specialized hardware would gain any meaningful advantage for plot compression. Reducing plot size through bit-dropping quickly becomes impractical, as the resources required to achieve even a modest reduction escalate to nearly the same as grinding full plots.

Given these safeguards, K28 plots are expected to remain viable for the foreseeable future under the current settings. However, advancements in hardware and unexpected vulnerabilities will continue to be monitored to ensure the format's long-term stability and security.

### What are the settings that could be changed in a hard/soft fork to prevent grinding or other techniques to turn PoSpace into PoW?

Currently, the plan is to maintain the plot ID filter at a level of 256, with a scheduled reduction on a periodic basis. This allows flexibility to adapt over time. The scan filter and chain filter are fixed and not expected to change. If conditions do not warrant reducing the plot filter during a given period, a soft fork can delay the reduction to the next scheduled period without disrupting the network.

In the future, if SSDs become the dominant storage medium for proof of space, the current disk activity constraints imposed by HDDs will no longer be necessary. This shift would allow for a more significant reduction in the plot filter, enhancing both grinding and compression resistance. The reduction in the plot filter is directly proportional to the increase in resistance, and we have up to **two additional orders of magnitude** available for tuning. This means the plot filter could eventually decrease from 256 to as low as 1, providing substantial flexibility to counter emerging risks while maintaining the integrity of the proof of space system.
