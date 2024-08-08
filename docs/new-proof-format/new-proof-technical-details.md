---
sidebar_label: Technical Details
title: Technical Details
slug: /new-proof-details
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## New Matching Algorithm

The matching algorithm for all tables has changed, and now forms the basis of security. It is a memory hard algorithm which can be tuned to take more or less time by adjusting the number of match indexes to test for whether two entries match. 

The benefit of this algorithm is that we can set the difficulty very high so that plotting will take longer and compression attacks will be more expensive, yet it incurs negligible cost when validating a proof. Since validation is “free”, we can tune this to be as difficult as we need, without adding extra compute expense to the network.

### Matching Bits

The matching algorithm takes an additional index number which is used to show that a match works. The left value and the index results in a bucket. This must match a bucket which the right value hashes to, and the matching combination of them have to pass an additional filter. Index bits will be included in proofs to make verification fast. To keep required memory down, entries are sorted into sections. All of the buckets to which a left value hashes will land in the same section.

### T1 Matching

For the first table of matches, we match a k-bit value that comprises section_bits and random_bits. Match_index_bits is an additional variable to define which match_index creates a match.

For the first set of pairs, x1 and x2 match iff:

- The upper section_bits of x1 are equal to the upper section bits of x2.
- There exists a match_index in the range `[0..<2^match_index_bits]` where the random_bits produced from hash(x1 + plot_id + match_index) are equal to the random_bits produced from x2 with hash(x2 + plot_id).
- A new_meta is created by hashing x1 and x2.
- A hash of new_meta must pass a filter for it to be a match.

  <div style={{ textAlign: 'center' }}>
    <img src="/img/new_format/plot_chart.png" alt="Flow chart" />
  </div>
  <br />

### Matching Difficulty

The time to find a match is heavily influenced by match_index_bits, as the higher the range of match_indexes the more the number of lookups to test for a match.

Since most bit dropping attacks are limited by the difficulty of matching in the earlier tables, the number of match index_bits will be tuned much higher for the first and second tables, and set lower for subsequent tables.

## New Plot Filters

The new proof of space comprises 3 plot filters:

1. Plot id filter
2. EncryptedX’s scan filter
3. Random x-quadruple quality filter

### Plot Id Filter

The plot id filter is the same as the original proof of space – the challenge and plot id create a hash that validates the plot for that challenge if it passes the filter. For the new proof of space we will be able to reduce this filter significantly compared to the original. Once set, it is expected to stay fixed over time.

### EncryptedX’s Scan Filter

A few definitions:

- x1 and x2 are pairs matched in the first table, and are the left side match in the next table.
- x3 and x4 are pairs matched in the first table, that then form the right-side match with x1 and x2 in the second table.
- Xdata totals 2k bits, comprising the upper section bits of x1, additional bits of x1, additional bits of x2, and match index for pairing x1 and x2, upper section bits of x3, additional bits of x3, additional bits of x4, and match index for pairing x3 and x4. 

 E.g. if we have a k32, 6 section bits and 6 match bits, we form: [upper 6 bits of x1 and x2 (which are the same)][bits 7-16 of x1][bits 7-16 of x2][6 match index bits (applied to x1)][upper 6 bits of x3 and x4 (which are the same)][bits 7-16 of x3][bits 7-16 of x4][6 match index bits (applied to x3)].
- EncryptedXs is the 2k-bits encrypted Xdata with a seed based on plot_id (reversible)
- S is a random range within 0..2^2k based on the challenge


#### The Challenge

Find a proof where:

1. The last 4 x values in the proof are converted to EncryptedX’s and are in range S, and
2. `hash(challenge,EncryptedXs)` passes a filter (e.g. 1 in cardinality S chance will pass on average 1 result from this range).

In order to quickly satisfy the challenge for the plot, we store the sorted EncryptedXs in the second table, and drop the first table. This requires only 1 or 2 disk seeks to read the number of EncrpytedXs in the range S for the challenge.

To reconstruct the original x values a farmer finds all possible values of buckets for x1 and x2 and finds a collision between them. In the k32 example above bits 17-32 of x1 and x2 are missing so there are 2^16 possibilities for each. To find the values a farmer makes a list of all 2^16 possibilities for one of the values (it doesn’t matter which) then sorts it, then scans over all 2^16 possible values for the other looking up each one in the sorted list to see if it’s there. For a farmer to store fewer bits they can drop bits from the EncryptedX, which doubles the amount of work necessary to be done. For them to need less work but more space they can store unencrypted x bits which halves the amount of work needed for each bit stored. Because there’s an exponential increase in work per bit and computers are fast there’s a range of bit dropping which has very little work even on low end hardware but where the costs of farming get prohibitive even on high end hardware with even a tiny increase in compression.

The EncryptedXs scan filter forces a particular ordering and dataset in the plot format that severely limits the flexibility for an attacker to re-organize the data in a way to leverage particular bit dropping attacks.

### Random x-quadruple quality filter

For each x1/2/3/4 set that passes the scan filter, find another random full x-quadruple in the proof based on the hash of those x’s, the plot_id, and challenge. This x-quadruple then forms the value for the quality string that determines whether a good proof has been found.

The additional random x-quadruple lookup ensures that all plot data is needed in order to find a quality by forcing a backwards traversal down the tables.

### Benefits

The plot id filter can be set lower, since the EncryptedXs scan filter only requires 1 or 2 disk lookups. A low plot id filter, combined with an additional filter on the EncryptedXs scan, forces rental attackers to generate at least the first two tables of a plot which require the most time, and then discard most of their results if it doesn’t pass the scan filter. The scan filter also reduces the load on HDD disks by only passing a fraction of the time for the x-quadruple quality filter which requires more lookups.

The combination of these three filters severely constrain the flexibility afforded to an attacker. The default level of bit dropping gives the honest farmer a baseline with negligible extra compute, but imposes an immediate difficulty for the attacker to compress much further without losing efficiency compared to the honest farmer.

## Benes Compression

A new compression algorithm allows us to compress each table in the plot by 2-3 extra bits compared to the original format. Note that this is not bit dropping (which incurs costs that go up exponentially based on the amount of data being dropped), but rather an improved way to losslessly store information in each table. The findings are based on this  [blog post](https://hackmd.io/@dabo/rkP8Pcf9t).

In addition, Benes compression has the unique property that plot tables can be traversed in both directions, whereas the HDD friendly format requires additional data to store an index from the T2 table to the last table (so that it can then traverse entries down the table).

Each table in the plot using Benes compression comes at the cost of doing a few more random seeks in data retrieval. While it would be possible to put a few such Benes plots on an HDD, the proof retrieval times are not guaranteed to be completed in time. On SSD using Benes compression has minimal impact on farming and is the recommended storage format.

While we hope to release Benes compression for plots prior to the hard fork, constructing the proof of space using the Benes algorithms is more challenging and could require significantly more RAM and slower plotting times. 

## Further Compression by Additional Bit Dropping

One of the first known compression attacks is to bit drop on x1/x2 pairs on the first table, and recompute for the missing range of values. With the new scan filter requiring both an encryption step on x-quadruples and a range to satisfy a challenge, any attacker wanting to alter which bits in those x-quadruples to drop, will forfeit compression they receive from the ordered encrypted values, and immediately require making up for k bits of lost compression. Likewise, any other attempts to re-organize x data for other bit dropping or compression methods will result in similar penalties.

It is still possible to drop the lower-order bits from the EncryptedX values, where each bit dropped would require a doubling of compute. A potentially more advantageous approach is to leave the default x values intact and instead drop bits from the back pointers starting from table T3. In the original format, dropping two bits (one from each of the two back pointers in T3) would have saved approximately 1% of space, at the cost of doubling the time needed to recompute the quality string and the full proof.

In the new format, we have restructured the back pointers, and currently, we see the potential to drop only 1 bit per back pointer for a doubling of compute. Further research may reveal the possibility of more aggressive bit dropping back up to 2 bits per doubling of recompute. 

As it stands, the default plot already includes a certain level of bit dropping, and bit dropping further  quickly becomes too expensive. Depending on the final parameter settings, we don’t expect this to be economically viable beyond a few bits on today’s hardware, with each bit dropped saving ~0.5%. We will also offer the ability to plot using the most optimal method for further compression for those interested.

## Impact to Honest Farmers

The x values stored in T2 have default levels of bit-dropping already applied that are defined in the challenge scan filter. A small amount of compute is required when fetching a final quality string, similar to the low C-levels of the bladebit formats. The honest farmer will have to grind an additional small amount to get the full x values for the proof. 

There will also be an option to omit this low-level grinding if desired, at the cost of adding more bits to the plot format. However, since the compute required for the grind is low and designed to be close to optimal, the default level of bit dropping specified by the challenge is the recommended setting.

## Impact to Rental Attacks

Due to the long plotting time, lower plot id filter, and additional scan and x-quadruple filters that potentially throw away a newly created plot; rental attacks are no longer deemed to be a viable threat (>$1 billion per hour for an attack and will be well over 1000 times more expensive than the original format).
