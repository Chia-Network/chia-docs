---
sidebar_label: Technical Overview
title: Technical Overview
slug: /new-proof-technical-overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::note

This information was updated on 5/20/2025.
For the latest information, refer to [CHIP-48](https://github.com/Chia-Network/chips/pull/160)

:::

This section will go over some of the novel ideas for the proof of space and reasons why they are beneficial.

The most notable changes to the proof of space are:

#### Design Constraints on Core Security Assumptions

- **Attackers have unlimited random-access performance; honest farmers are limited by HDDs.**
The format assumes adversaries can scan large proof ranges instantly (e.g., from SSD or RAM), whereas honest farmers rely on slow, sequential HDD reads. This informs design choices that minimize benefits from random-access scanning.

- **Attackers have virtually unlimited memory; honest farmers have consumer hardware.**
We assume attackers can use high-end systems to load entire plots into memory, enabling attacks that are impractical on normal equipment. Therefore, the format assumes large memory attacks are feasible and avoids relying on k-size increases for security.

#### Table Roles (T1 -> T5)

| Table            | Security purpose                                                            | Details                                                                                                                              | Compression<br>k = x-value bits<br># partitions = 2*2^partition_k |
|------------------|-----------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------|
| T1-T2 (hidden)   | Basis for every recompute. Inflicts bit-dropping saturation on Chain Links. | Tuned so that a Raspberry Pi 5 can rebuild a k-28 proof in under 9 seconds (time interval for one signage point)                     | 0 bits                                                            |
| T3               | Enforce structural ordering. Plot difficulty and grinding resistance layer. | Challenges originate on Proof Fragment ranges. Restricts or adds costs on exploits to re-order data for certain compression attacks. | ~2k bits <br>ANS compression                                      |
| T4 (partitioned) | Random non-localized data                                                   | Mixes entries across T3. Breaks an attacker's ability to grind on data targeted to just one partition in T3                          | ~(k - partition_k) bits<br>ANS + Benes compression                |
| T5 (partitioned) | Provides a large combinatorial fanout                                       | Gives us many independent paths to chain while keeping them on the same disk partition                                               | ~(k - partition_k) bits<br>ANS + Benes compression                |

Each table will be close to the theoretical compression limit for random data. We rely on structure, not padding with extra tables, for security.

#### New Matching Algorithm

The matching algorithm is novel in two ways:

- Per-table tunable difficulty – lets us set plotting cost (resistance to rental & compression attacks) by O(2^N) while keeping verification O(1).

- Asymmetric hashing for pairing – honest farmers can recompute the full proof pairs of x-values efficiently, as the cost to solve for the first pair of x-values is expensive, but subsequent x-values for the proof are cheap. Conversely, an attacker looking to solve for a subset of the proof must incur the initial expense of the first solved pair repeatedly.

The parameterization of table security also enables scheduling for stronger security over time (see scheduled plot difficulty).

#### Proof Fragments & Leaf-First Challenges

**Proof Fragment**: For every matching set of x-values at T3 we:
- **Bit-drop** to the security budget. The ideal amount of bit-dropping is detailed in the [Security](#security) section.
- **Encrypt** the remainder, then
- **Sort** the resulting Proof Fragments in T3

**Challenge on Proof Fragments**. The challenge now begins at the leaves, using an ordered-scan filter over the Proof Fragments (aka the Proof Fragment Scan Filter). Because the Proof Fragments are sorted, neighboring entries decrypt to statistically unrelated x-values. An attacker can no longer harvest “similar” neighbors or reuse partial work; any bit-dropping attacks must target the Proof Fragments themselves. 

- Old format: challenge began at the root (last table) which stored a redundant final hash which could be recomputed by collecting all x-values from the proof. Attackers could rearrange leaves at will to open many significant exploits, and/or exploit the redundant final hash with recompute.

- New format: the leaf-first scan locks the ordering. If an attacker re-orders data, they must add bits to restore ordering for the scan, which negates compression gains.

**Bit Drops and Recompute Times**. A Proof Fragment represent 8 x-values of a proof (x1,x2,...,x8). We first remove all x2/4/6/8 values, and bit drop the remaining x-values by k/2 bits, to give 2k bits comprising only half the bits in x1/3/5/7.

The Chacha cipher allows fast and secure cryptographic hashing of 2^k results on a Raspberry Pi 5. The even-number x-values rely on those hashes. The odd-number x-values use a slower hash (Blake 3) over a certain number of iterations to check for matches. Proof solving amortizes results for 1 Proof Fragment over a set of Proof Fragments from the fully chained proof. Below, we show that solving for 32 Proof Fragments takes 29.3ms, less than 1ms per Proof Fragment, whereas just 2 Proof Fragments takes over 10ms alone.
<figure>
    <img src="/img/pos2/proof-fragments-solve-times.png" alt="Proof Fragment Set Solve Times" />
</figure>

Compare to using k/4,k/4 bits, which is faster on a single solve but slower overall when applied on all x-value pairs (256 pairs in total).

More about Proof Fragments and how much they bit-drop before encryption is discussed in the [Security](#security) section.

#### Bipartite Pairing
Left-side and right-side pairs live in disjoint datasets. The pairing order is implicit, so an attacker cannot “flip” entries to gain extra compression.

#### Benes Compression

Benes compression (see [blog post 1](https://www.chia.net/2024/08/08/approaching-the-next-generation-of-proof-of-space/), [blog post 2](https://www.chia.net/2024/12/11/upcoming-changes-for-chias-new-proof-of-space-format/), and [CHIP-48](https://github.com/Chia-Network/chips/pull/160)) uses a novel compression algorithm to give the best compression on plot structured data, saving multiple bits per entry versus ANS compression. However, it has two main drawbacks:

- (1) plotting needs huge RAM and many random reads at large k-sizes. A straight k-32 Benes plot would demand GPU clusters.
- (2) too many disk reads for HDD usage, requiring 3-9x the disk seeks of other compression methods.

This would fragment the ecosystem across high/low-end systems and HDD/SSD storage, leaving baseline system farmers with plots that are larger and less competitive than their Benes compressed counterparts.

To solve this problem, we introduced [partitioned tables](#partitioned-tables) to construct and process Benes networks in much smaller chunks that easily fit into small cache-level RAM. This reduces Benes hardware requirements to the baseline system for all farmers.

#### Partitioned Tables

Partitioned tables, in addition to making Benes compression possible for all farmers, trades off some security against certain attacks, but strengthens security against other low-hanging fruit attacks. In the [CHIP-48](https://github.com/Chia-Network/chips/pull/160) we detail these in depth.

Partitions are structured to reduce HDD seeks to allow for construction of Quality Chains when responding to challenges. A trade-off is the bigger storage reads required to load all partition data into memory. This also incurs additional ANS decompression overhead, which may limit some lightweight harvester systems to a smaller number of plots. 
<figure>
    <img src="/img/pos2/partitions-mappings.png" alt="Partition mappings" />
    <figcaption>
        Showing mapping from T3 Proof Fragments to lateral (L) partition from T4/5.
    </figcaption>
</figure>

Each table is divided into partitions, and partitions can either be lower or upper partitions. In the example above there are 8 partitions, with 4 lower and 4 upper. The Proof Fragment bits define the partitions (see [CHIP-48](https://github.com/Chia-Network/chips/pull/160)). The Proof Fragments in T3 may have one or both of the following pointers from T4: a lateral (L) pointer, and/or a crossover (R) pointer.  These two pointers will always reside in different partitions—one in the lower, and one in the upper—but never in the same partition. The L pointers from a partition in T4 will all map to the same partition in T3. The R pointers to an encrypted X will come from any of the opposite side partitions in T4. An additional benefit is that no R pointer from T4 will point to the same partition as an L pointer in T4, which is important to reduce unused paths that could be dropped for an attacker as we want to build chains between two unique partitions.

<figure>
    <img src="/img/pos2/partitions-mappings-example1.png" alt="Partition mappings" />
    <figcaption>
        In partition (L0', R) all L pointers from T4 come from the 0' partition, and all R pointers can come from any of the 0-3 partitions.
    </figcaption>
</figure>

<figure>
    <img src="/img/pos2/partitions-mappings-example3.png" alt="Partition mappings" />
    <figcaption>
        Figure: In partition (L1, R') all L pointers from T4 come from the 1 partition, and all R pointers can come from any of the 0'-3' partitions.
    </figcaption>
</figure>

The optimal number of partitions is determined by our Security Analysis on Partitions.

#### Small Plots (~1.6 GiB for k28)

Due to only using 3 tables in the final plot format, plots are much smaller than the original Proof of Space (see the technical section for an overview of plot sizes).

Smaller plots result in:
- Increased HDD load to balance against the Plot ID Filter
- Reduced all-RAM plotting requirements so most low-end systems can plot without temporary disk
- No additional risk to rental attacks (see [CHIP-48](https://github.com/Chia-Network/chips/pull/160))

There are also a couple engineering concerns, although these are separate from consensus:

- **Harvester Startup time** : 13,000 plots per 20 TiB HDD disk ⟹ ≈ 130s to read headers. Index files or lazy loading fix this.
- **Harvester Memory**: many indices eat RAM. Partition boundaries are few (~512 - 2048 depending on k-size), so compressed metadata may be small enough. Possible alternative to discard indices and guess partition location with scan for partition markers.
