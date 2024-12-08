---
sidebar_label: Technical Overview
title: Technical Overview
slug: /new-proof-technical-overview
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This section will go over some of the novel ideas for the proof of space and reasons why they are beneficial.

The most notable changes to the proof of space are:

### New matching algorithm

This offers security with tunable difficulty per table, yet allows instant verification of proofs. As a result, we are able to increase the difficulty of plotting without affecting proof validation time. The benefit is that we can increase resistance to rental and compression attacks without wasting energy when validating proofs for the network.

### Challenge based on x values

A challenge will no longer start lookups based on a final y bucket. Instead, we use a special kind of scan filter on x values, specifically designed to constrain attackers against re-ordering data to accommodate various bit-dropping techniques. Now, an attacker is either restricted to organize data in a very specific way which severely limits the number of potential attacks, or the attacker must re-organize data by adding extra bits to account for that restructuring and incur a large penalty.

### Default compression to drop first table

There is a small amount of compression where the first table is dropped by default. The parameters for the compression are specifically chosen to be the easiest bits to drop and recompute, with minimal cpu time needed. This creates optimal settings, and further bit dropping by an attacker will very quickly impose economic disadvantages to create an upper bound on how much compression is viable even for future hardware.

### Benes compression

We can compress an additional 2 bits per entry (without bit dropping) and drop a whole lookup table using a Benes network. This results in up to ~20% additional space savings depending on k-size when compared to the HDD friendly format.

In terms of impact to farmers, because we drop some data to optimize efficiency, a small amount of compute is required when fetching a final quality string, similar to the low C-levels of the bladebit formats. We will include an option to omit this low-level grinding if desired, so that many Petabytes could be farmed on a Raspberry Pi for instance, at the cost of adding more bits to the plot format (up to 10-15% more space).
