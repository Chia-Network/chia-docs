---
sidebar_label: FAQ
title: FAQ
slug: /chia-blockchain/consensus/proof-of-space-2.0/new-proof-faq
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

This information was updated on 5/20/2025.

:::

This page will answer your most common questions. Expect it to grow with time.

### What will this break/change?

Initially nothing, to give everyone time to upgrade. When the hard fork becomes activated six months after the release of Chia 3.0 there will be changes to the blockchain consensus which will cause non-upgraded full nodes and wallets to break. The upgrades software vendors will need to make before then are small and will be included in the reference codebase. Farmers will have to replot during the transition period and use upgraded plotters and harvesters. The computational requirements for harvesting will be slightly larger than with the original plot file format but vastly less than for compressed plots.

### When will I be able to farm with new plots on mainnet?

After the hard fork date, currently expected at height 8’800’000. This is expected to happen around 2026-06-01 (see [timeline](/chia-blockchain/consensus/proof-of-space-2.0/new-proof-timeline)).

### When will the old plot format be fully phased out?

By the end of the transition period, currently expected 1H 2027 (see [timeline](/chia-blockchain/consensus/proof-of-space-2.0/new-proof-timeline)).

### When should I replot?

Sometime during the transition period. When will be best for you will depend on your setup, but there will be a long enough time that the plots compliant with the new format will be neutral in weight to your existing plots so you can do it at your leisure. We will provide guidelines on how to evaluate which time window would be ideal to transition for your setup.

### With a modern GPU such as a 3090, what will be my expected plot times?

Around - minutes for a - plot (Pending Plot ID Filter and Plot Difficulty settings. Aim will be for 3060 to plot >20TiB/day). See our table of [expected plot times](/chia-blockchain/consensus/proof-of-space-2.0/new-proof-plotting-requirements#plotting-performance-and-requirements).

### Will you also support CPU plotting, and if so, what will be my expected plot times?

CPU plotting will be supported but will not be recommended for plotting any significant amount. A multi-threaded CPU will be about - slower than a 3090, potentially completing a k30 in - minutes. The more CPU threads and memory channels your system has will reduce this time. (Pending Plot ID Filter and Plot Difficulty settings. Aim will be for 3060 to plot >20TiB/day)

### What will the hardware requirements be for harvesters?

Harvesting consists of two main components: plot retrieval and proof solving when a good proof is found.

For plot retrieval, even large farms can use low-spec computers such as original Raspberry Pis, as most of the time is spent simply reading from storage, which uses minimal compute resources.

The proof-solving hardware requirement depends on the largest plot size (k-size) in your farm, not the total number of plots. If a proof of space wins a block or pool partial, your hardware must be capable of solving proofs for the largest k-size plot within the required timeframe.

For example, if your farm includes k28, k30, and k32 plots, your proof-solving machine must meet the requirements for solving k32 proofs, even if the majority of your plots are smaller. If you want a single machine for both harvesting tasks (plot retrieval and proof solving), it should meet the k32 specs for solving proofs and can also handle plot retrieval.

For large farms or setups with multiple harvesters, you can use low-spec devices like Raspberry Pis for plot retrieval and designate a higher-spec machine capable of solving proofs for your largest k-size as the central proof-solving service. If your farm contains only k28 plots, a Raspberry Pi 5 can serve as both a plot retrieval device and the central proof-solving service for your entire farm.

See our [farming requirements](/chia-blockchain/consensus/proof-of-space-2.0/new-proof-farming-requirements) for more detailed information.

### What is the difficulty level in the new format?

The new plot format allows us to tune a difficulty setting to directly influence plot time. The higher the plot time, the more compression resistant the format becomes. However, we need to balance the difficulty with what should be an acceptable plotting time for most farmers, yet still have enough difficulty for significant compression resistance.

Each plot in the new format has a difficulty setting, which must be between 0 and 255. With each increment of the setting, the plot will require approximately twice as much time to be created. (The hardware requirements to create a plot, as well as its final size are unaffected.)

After the hard fork activates, the network will have a minimum difficulty level for all plots created with the new format. Any plots that were created with an easier difficulty level will be invalid. In order to plan for advancements in technology, the minimum difficulty level will be set to increase every two years going forward. The timeline is intentionally aggressive -- we can relax this schedule with a soft fork if needed.

As a result of the minimum difficulty adjustments, each plot will have an effective expiration time. Farmers can use this data to replot to a difficulty level that makes sense for their setup. [CHIP-49](https://github.com/Chia-Network/chips/pull/161) contains a section titled `Plot difficulty adjustments`, which goes into greater detail.

### How do you know that compression won’t be possible with the new format?

Compression is always possible, but the incentive will be severely limited. For instance, you could compress 100% of the plot by constructing a plot on the fly in under 30 seconds when a signage point comes in. However, this would require a cluster of the latest GPUs to achieve, and would cost hundreds of thousands of dollars, just to spoof the space taken up by less than a TB. Alternatively, a farmer could make a plot with just 1 bit dropped per entry, and save ~0.5% of space. However, even this could incur more energy per TiB than the honest farmer.

In the future we expect extremely high efficiency in compute, however, storage will also improve in cost and efficiency during that time. With the advent of extremely low power SSDs when on idle, most farmers will be better off staying with the default plot format. Those farmers looking to squeeze the most out of their system by bit-dropping for extra levels of compression might achieve marginal gains despite higher energy costs per eTiB, but risk needing to replot and adjust their systems based on price fluctuations. If compute efficiency significantly outpaces gains in storage cost and efficiency, we could see bit-dropping with recompute reaching up to 10% space savings with marginal extra % gains in net rewards.

### Will there still be a plot filter after the new format is available?

Yes -- it is a similar concept to the plot filter for the existing proof format. [CHIP-48](https://github.com/Chia-Network/chips/pull/160) provides the technical details of this filter. If required, we can push the dates of these adjustments further into the future with a soft fork.

The current proposal is to start the plot ID filter at 32 and cut it in half every two years until it reaches 1. The block heights of the filter adjustments are shown in the table in the next section.

### How many times will I have to replot?

This depends on your plots' difficulty level, [as explained above](#what-is-the-difficulty-level-in-the-new-format). For example, if you want to delay replotting for at least six years, you can create your plots with a difficulty level at least three levels above the minimum.

### What's this about different HDD and SSD plot formats (i.e. what is benes compression)?

As the new Proof of Space was being developed, one consideration was whether Benes Compression would be possible on HDDs and initially it was proposed that there would be an HDD format without Benes compression and an SSD format with Benes compression.  
Prior to publishing [CHIP-48](https://github.com/Chia-Network/chips/pull/160) it was determined that Benes Compression can be performed on HDDs so now there will be only one format for both HDD and SSD.

### How much space will someone be able to save using GPU compression?

It will be possible to save a few percent of space using bit dropping but the costs will go up exponentially. Currently we expect a 4090 on a large farm may be incentivized to compress up to 2-3% of the plot size, although this is still subject to change based on the final tuning parameters for the proof of space.

### For an energy-conscious farmer, what will be the optimal CPU or GPU for farming?

Smaller k-sizes, such as k28, lead to increased disk activity, which in turn raises the energy consumption of storage media. For SSDs, this extra activity is negligible, and a low-power device like a Raspberry Pi 5 is sufficient to handle even large farms spanning multiple petabytes.

For HDD-based farms, HDDs consume more power (typically around 50 to 100% more) when actively reading compared to being idle. For example, a large 20TiB HDD filled with k28 plots will be active approximately 6% of the time, compared to 0.4% for k32 plots. This would result in a 3-6% increase in energy consumption when using k28 instead of k32 plots.

For farmers with a large number of drives, it may be more efficient to use a higher-performance recompute machine capable of handling larger k-size plots (e.g., k32) without consuming more power than the additional energy costs incurred by smaller plots. A system like a Mac Mini M1 offers low idle power usage and can efficiently handle k32 plots.

The most energy-conscious approach is to leverage an existing system already online that meets the recomputation requirements for larger k-sizes. By running a solver on standby, this system can handle requests for full proofs as needed with negligible impact on its overall energy usage. This method avoids the need for additional dedicated hardware while keeping power consumption minimal.

### When do you expect the CHIP to be made publicly available?

On 05/19/2025 we published [CHIP-48](https://github.com/Chia-Network/chips/pull/160) for the new PoS specification and [CHIP-49](https://github.com/Chia-Network/chips/pull/161) for the timelines associated with its integration.

### When can I review the source code for plotting?

The source code is located in the [pos2-chip](https://github.com/Chia-Network/pos2-chip) GitHub repository.

### Have you decided how long the transition period will be?

6-12 months. To provide feedback and discuss this transition period please refer to [CHIP-49](https://github.com/Chia-Network/chips/pull/161).

### How will grinding be prevented?

[CHIP-48](https://github.com/Chia-Network/chips/pull/160) contains a detailed analysis of various grinding attacks and how the new PoS protects from them.

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

[CHIP-49](https://github.com/Chia-Network/chips/pull/161) contains a detailed analysis of the various settings that can be changed to protect from grinding and other techniques.
