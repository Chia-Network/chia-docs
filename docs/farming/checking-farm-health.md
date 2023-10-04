---
title: Checking Farm Health
slug: /checking-farm-health
---

> "Is my farm working?"

It's one of the most common questions farmers ask themselves. This is understandable -- it is possible for those with small- and medium-size farms to go weeks or months without winning a block reward, even if everything is working properly.

The easiest mitigation against this anxiety is to [join a pool](/pool-farming). Your pool will occasionally send you partial challenges in order to estimate your farm's size. If everything is working properly, your pool will report a size for your farm that comes close to its actual size.

Beyond joining a pool, there are a few other things you can do to make sure your farm is working properly, whether you use the GUI or the CLI.

## GUI health

The new Farm and Harvest panels in 2.0 make it easy to get an overview of your farm's health.

### Farm panel

<div style={{ textAlign: 'left' }}>
  <img src="/img/farm_health/01.png" alt="Farm panel" />
</div>
<br/>

Here is how to interpret each of the statistics in the above image:

#### Farm Health
* **Sync status** -- Shows whether your full node is synced.
* **Plots passing filter** -- Shows whether the "correct" number of plots are passing the [plot filter](https://help.chia.net/hc/en-us/articles/8373437367191-What-is-the-plot-filter-and-why-didn-t-my-plot-pass-it-). The popup, as shown in the above image, contains several stats. As long as the numbers next to `Total plots passing filter` and `Expected Total plots passing filter` are similar, this aspect of your farm is working properly.
* **Missing signage points** -- Chia's consensus is designed such that 64 [signage points](/signage-and-infusion-points) are broadcast every 10 minutes, or 9216 signage points per day. You are ineligible to win a block at any missed signage points. It is normal to miss a few signage points per day, for example due to a temporary outage in your local network. However, if you miss 100 or more signage points per day, there is likely something wrong. The two most common causes for this are that your harvester is overwhelmed (fix this by moving some HDDs to another harvester), or that your network is experiencing frequent outages.
* **Stale partials** -- Your pool will send partial challenges to your node in order to estimate how much space you are contributing. If your node doesn't respond to a partial challenge quickly, it will be considered "stale". Just as with missing signage points, an occasional stale partial is nothing to worry about. If you experience a frequent number of stale partials, the causes and solutions tend to be the same as with missing signage points.

#### Netspace
* **Total Netspace** -- This shows an estimate of the total amount of space on Chia's entire network.
* **Farming Space** -- This is hidden behind the popup dialog in the above image. It is your local node's contribution of space to the network.

#### Farming Rewards
* **Estimated Time to Win** -- This is only an estimation of when you will create your next block, based on the percentage of the total netspace you are contributing. You have a 50% chance of winning sooner than this, and a 50% chance of winning later. It is not uncommon for 5x this amount of time to elapse between block wins, even if your farm is set up perfectly. Also keep in mind that the probability that you will win the next block does not increase as more time elapses. The Gambler's Fallacy applies here.
* **Estimated daily XCH** -- The formula for this is `(1 day / Estimated Time to Win) * block reward`. If you join a pool, this is roughly how much you should receive each day. However, you need to account for pool fees, as well as the fact that 1/8 of the reward goes directly to the farmer.
* **Estimated monthly XCH** -- Same as above, but taken as a monthly estimate.

#### Pooling Health
* **Valid Partials** -- Partial proofs your node has successfully returned to your pool, expressed as both a number and a percentage. See above for more info on partials.
* **Stale Partials** -- The percent and number of partials your node has failed to return on time.
* **Invalid partials** -- The percent and number of partials your node has returned that were invalid.
* **Missing partials** -- The percent and number of partials your node has failed to return.

#### Last Attempted Proof
* **Plots Passed Filter** -- At each signage point, a certain number of your plots will pass the plot filter. The numerator indicates the number of plots that are eligible to play in that specific Proof of Space lottery. For small farms, this number is often 0. The denominator indicates your farm's total number of plots.
* **Proofs Found** -- The number of valid proofs found at that signage point. If you are not in a pool, a number greater than 0 indicates that you have successfully found a proof and will likely win a block reward at the next transaction block. If you are in a pool, a number greater than 0 likely means that a valid partial proof was found and will be returned to your pool.

### Harvest panel

<div style={{ textAlign: 'left' }}>
  <img src="/img/farm_health/02.png" alt="Harvest panel" />
</div>
<br/>

In the above image:
* **Total farm size raw** -- The actual amount of space your farm is contributing to the network.
* **Total farm size effective** -- The amount of space your farm is effectively contributing, with uncompressed (C0) plots as the baseline. For example, if your farm consists entirely of C3 plots, according to the [plot compression table](/plotting-compression#compression-table), your farm's effective size should be 20% larger than its actual size. If you are using plots with a mixture of compression levels, the effective size of each of your plots will be taken into account in this number's calculation.

## CLI Health

### Check if your farm thinks it's farming

Before going further, please make sure whether your farm actually considers itself to be farming. There's a good chance that you might not since you are still syncing blocks.

To check the status of your farm, `../activate` as usual and then type `chia farm summary`. If the first line of the output looks like like this:

```
Farming status: Farming
```

..then you know no broader errors have occurred.

### Change the log level output

To get detailed information about how your farm operates, you need to set the log-level of your farmer to `INFO`. For this you need to edit the Chia config under `~/.chia/mainnet/config`. You are looking for a part of the file that looks like this:

```
farmer:
  logging: &id001
    log_filename: log/debug.log
    log_level: INFO
    log_stdout: false
```

If `log_level` has any other value than `INFO`, change it to `INFO` accordingly and save the file.

### Check if your plots are passing the filter

The most important metric to look out for is, whether your plots are passing the plot filter on your harvesting machines. In a usual setup, this involves checking the logs under `~/.chia/mainnet/log` to see if at least for some rounds, plots are marked as **eligible for farming** by the harvester.

Your `~/.chia/mainnet/log` directory may look like this:

```
username@chia-farmer:~/.chia/mainnet/log$ tree
.
├── debug.log
├── debug.log.1
├── debug.log.2
├── debug.log.3
├── debug.log.4
├── debug.log.5
├── debug.log.6
└── debug.log.7

0 directories, 8 files
```

Each log file contains log information about all the services ran by Chia. If you're running a full node, these can be convoluted. We're only interested whether or not plots pass the plot filter. We can check this, by running a command like:

```bash
cat debug.log | grep "[0-9] plots were eligible for farming"
```

The `cat` command is a \*nix program to get content of a file. With the pipe operator `|`we "pipe" the output to another program called `grep` which can filter textual input. We filter for `"[0-9] plots were eligible for farming"` to see if we already had eligible plots.

Example output may look like this:

```
09:55:43.847 harvester src.harvester.harvester : INFO     1 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.13772 s. Total 100 plots
09:55:52.737 harvester src.harvester.harvester : INFO     3 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.43679 s. Total 100 plots
09:56:01.646 harvester src.harvester.harvester : INFO     2 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.14055 s. Total 100 plots
```

**If you are seeing output like above here, this is already good!**

It means that plots are passing the plot filter and your farm seems to work as intended. Do this for each log file to see whether or not you had any outages or whether something went wrong.

### Checking for proofs

If you have had eligible plots in the past, there's a chance that you might have already found a proof, but it didn't get accepted by the network.

**Please keep in mind that finding a proof does not constitute to winning a plot (getting a payout). Even if you find a proof, it needs to compete with other proofs and win to actually receive a reward.**

To check whether you have already found proofs, you can run the same command as before, but with a different filter:

```bash
cat debug.log | grep "Found [1-9] proofs"
```

A possible result may look like this:

```
12:30:01.492 harvester src.harvester.harvester : INFO     1 plots were eligible for farming 23d3a7c90f... Found 1 proofs. Time: 0.57000 s. Total 100 plots
```

If you do this for all your log files and get a result, **great!** This means your farm is 100% working as expected. You might not have won a block yet, but you already came very close once, or a few times!

### Can a Double NAT scenario impact my farm's ability to send valid proofs to the network?

Yes and no. Double NAT, while quirky, should work due to Chia's uPnP support. You likely won't be able to seed blocks to other nodes this way though. A "Double NAT" scenario occurs, when a client (harvester or node) is inside a network that is NAT'ed two times.
It usually involves a client being behind two routers, instead of one and looks like this:

Internet --> Router --> Router --> Client

Certain networking setups can impact the full nodes ability to participate in farming. As long as there aren't any telling signs in the logs that farming isn't working (namely logs with ERROR, WARNING tags that are network related) its unlikely that this is the case.
