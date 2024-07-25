---
title: Checking Farm Health
slug: /checking-farm-health
---

> "Is my farm working?"

It's one of the most common questions farmers ask themselves. It's one of the most common questions farmers ask themselves. This is understandable -- it is possible for those with small- and medium-size farms to go weeks or months without winning a block reward, even if everything is working properly.

The easiest mitigation against this anxiety is to [join a pool](/pool-farming). Your pool will occasionally send you partial challenges in order to estimate your farm's size. If everything is working properly, your pool will report a size for your farm that comes close to its actual size. Your pool will occasionally send you partial challenges in order to estimate your farm's size. If everything is working properly, your pool will report a size for your farm that comes close to its actual size.

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

- **Sync status** -- Shows whether your full node is synced.
- **Plots passing filter** -- Shows whether the "correct" number of plots are passing the [plot filter](https://help.chia.net/hc/en-us/articles/8373437367191-What-is-the-plot-filter-and-why-didn-t-my-plot-pass-it-). The popup, as shown in the above image, contains several stats. As long as the numbers next to `Total plots passing filter` and `Expected Total plots passing filter` are similar, this aspect of your farm is working properly. The popup, as shown in the above image, contains several stats. As long as the numbers next to `Total plots passing filter` and `Expected Total plots passing filter` are similar, this aspect of your farm is working properly.
- **Missing signage points** -- Chia's consensus is designed such that 64 [signage points](/signage-and-infusion-points) are broadcast every 10 minutes, or 9216 signage points per day. You are ineligible to win a block at any missed signage points. It is normal to miss a few signage points per day, for example due to a temporary outage in your local network. However, if you miss 100 or more signage points per day, there is likely something wrong. The two most common causes for this are that your harvester is overwhelmed (fix this by moving some HDDs to another harvester), or that your network is experiencing frequent outages. You are ineligible to win a block at any missed signage points. It is normal to miss a few signage points per day, for example due to a temporary outage in your local network. However, if you miss 100 or more signage points per day, there is likely something wrong. The two most common causes for this are that your harvester is overwhelmed (fix this by moving some HDDs to another harvester), or that your network is experiencing frequent outages.
- **Stale partials** -- Your pool will send partial challenges to your node in order to estimate how much space you are contributing. If your node doesn't respond to a partial challenge quickly, it will be considered "stale". Just as with missing signage points, an occasional stale partial is nothing to worry about. If you experience a frequent number of stale partials, the causes and solutions tend to be the same as with missing signage points. If your node doesn't respond to a partial challenge quickly, it will be considered "stale". Just as with missing signage points, an occasional stale partial is nothing to worry about. If you experience a frequent number of stale partials, the causes and solutions tend to be the same as with missing signage points.

#### Netspace

- **Total Netspace** -- This shows an estimate of the total amount of space on Chia's entire network.
- **Farming Space** -- This is hidden behind the popup dialog in the above image. It is your local node's contribution of space to the network. It is your local node's contribution of space to the network.

#### Farming Rewards

- **Estimated Time to Win** -- This is only an estimation of when you will create your next block, based on the percentage of the total netspace you are contributing. You have a 50% chance of winning sooner than this, and a 50% chance of winning later. It is not uncommon for 5x this amount of time to elapse between block wins, even if your farm is set up perfectly. Also keep in mind that the probability that you will win the next block does not increase as more time elapses. The Gambler's Fallacy applies here.
- **Estimated daily XCH** -- The formula for this is `(1 day / Estimated Time to Win) * block reward`. If you join a pool, this is roughly how much you should receive each day. However, you need to account for pool fees, as well as the fact that 1/8 of the reward goes directly to the farmer. If you join a pool, this is roughly how much you should receive each day. However, you need to account for pool fees, as well as the fact that 1/8 of the reward goes directly to the farmer.
- **Estimated monthly XCH** -- Same as above, but taken as a monthly estimate.

#### Pooling Health

- **Valid Partials** -- Partial proofs your node has successfully returned to your pool, expressed as both a number and a percentage. See above for more info on partials. See above for more info on partials.
- **Stale Partials** -- The percent and number of partials your node has failed to return on time.
- **Invalid partials** -- The percent and number of partials your node has returned that were invalid.
- **Missing partials** -- The percent and number of partials your node has failed to return.

#### Last Attempted Proof

- **Plots Passed Filter** -- At each signage point, a certain number of your plots will pass the plot filter. The numerator indicates the number of plots that are eligible to play in that specific Proof of Space lottery. For small farms, this number is often 0. The denominator indicates your farm's total number of plots. The numerator indicates the number of plots that are eligible to play in that specific Proof of Space lottery. For small farms, this number is often 0. The denominator indicates your farm's total number of plots.
- **Proofs Found** -- The number of valid proofs found at that signage point. If you are not in a pool, a number greater than 0 indicates that you have successfully found a proof and will likely win a block reward at the next transaction block. If you are in a pool, a number greater than 0 likely means that a valid partial proof was found and will be returned to your pool. If you are not in a pool, a number greater than 0 indicates that you have successfully found a proof and will likely win a block reward at the next transaction block. If you are in a pool, a number greater than 0 likely means that a valid partial proof was found and will be returned to your pool.

### Harvest panel

<div style={{ textAlign: 'left' }}>
  <img src="/img/farm_health/02.png" alt="Harvest panel" />
</div>

<br/>

In the above image:

- **Total farm size raw** -- The actual amount of space your farm is contributing to the network.
- **Total farm size effective** -- The amount of space your farm is effectively contributing, with uncompressed (C0) plots as the baseline. For example, if your farm consists entirely of C3 plots, according to the [plot compression table](/plotting-compression#compression-table), your farm's effective size should be 20% larger than its actual size. If you are using plots with a mixture of compression levels, the effective size of each of your plots will be taken into account in this number's calculation. For example, if your farm consists entirely of C3 plots, according to the [plot compression table](/plotting-compression#compression-table), your farm's effective size should be 20% larger than its actual size. If you are using plots with a mixture of compression levels, the effective size of each of your plots will be taken into account in this number's calculation.

## CLI Health

### Check if your farm thinks it's farming

Before going further, please make sure whether your farm actually considers itself to be farming. There's a good chance that you might not since you are still syncing blocks. There's a good chance that you might not since you are still syncing blocks.

要检查您农场的状态，请像往常一样运行 `../activate` 命令（译注：仅通过源码方式安装才需要输入此命令），然后输入 `chia farm summary`。 如果输出的第一行看起来像这样：

```
Farming status: Farming
```

..那么您就知道没有发生更严重的错误。

### 更改日志输出级别

要获取有关农场运行方式的详细信息，您需要将农民（farmer）的日志级别设置为`INFO`。 为此，需要编辑Chia的配置文件，该文件位于`~/.chia/mainnet/config`。 需要查找文件中类似于以下内容的部分：

```
farmer:
  logging: &id001
    log_filename: log/debug.log
    log_level: INFO
    log_stdout: false
```

如果`log_level`的值不是`INFO`，将其相应地更改为`INFO`并保存文件。

### 检查是否有地块通过了初筛

The most important metric to look out for is, whether your plots are passing the plot filter on your harvesting machines. 在通常的设置中，这涉及查看`~/.chia/mainnet/log`目录下的日志，在某些回合中，农场机器是否将地块标记为**可进行耕种**（eligible for farming）。 在通常的设置中，这涉及查看`~/.chia/mainnet/log`目录下的日志，在某些回合中，农场机器是否将地块标记为**可进行耕种**（eligible for farming）。

`~/.chia/mainnet/log`目录可能看起来像这样：

```
username@chia-farmer:~/.chia/mainnet/log$ tree
.
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

Each log file contains log information about all the services ran by Chia. 如果运行的是一个全节点，这些日志可能会很复杂。 如果运行的是一个全节点，这些日志可能会很复杂。 We're only interested whether or not plots pass the plot filter. 可以通过运行以下命令来检查： 可以通过运行以下命令来检查：

```bash
cat debug.log | grep "[0-9] plots were eligible for farming"
```

The `cat` command is a \*nix program to get content of a file. With the pipe operator `|`we "pipe" the output to another program called `grep` which can filter textual input. 使用`grep`来过滤出现`"[0-9] plots were eligible for farming"`的内容，以查看是否已经有了符合条件的地块。 With the pipe operator `|`we "pipe" the output to another program called `grep` which can filter textual input. 使用`grep`来过滤出现`"[0-9] plots were eligible for farming"`的内容，以查看是否已经有了符合条件的地块。

示例输出可能如下所示：

```
09:55:43.847 harvester src.harvester.harvester : INFO     1 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.13772 s. Total 100 plots
09:55:52.737 harvester src.harvester.harvester : INFO     3 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.43679 s. Total 100 plots
09:56:01.646 harvester src.harvester.harvester : INFO     2 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.14055 s. Total 100 plots
```

**如果在这里看到类似上面的输出，说明已经在正常耕种了！**

这意味着有地块已经通过了初筛，您的农场似乎正在按预期工作。 Do this for each log file to see whether or not you had any outages or whether something went wrong.

### 检查找到的证明

If you have had eligible plots in the past, there's a chance that you might have already found a proof, but it didn't get accepted by the network.

**请记住，找到证明并不等于赢得一个地块（获得奖励）。 即使找到了证明，它也需要与其他证明竞争并获胜才能真正获得奖励。**

To check whether you have already found proofs, you can run the same command as before, but with a different filter:

```bash
cat debug.log | grep "Found [1-9] proofs"
```

可能的结果如下所示：

```
12:30:01.492 harvester src.harvester.harvester : INFO     1 plots were eligible for farming 23d3a7c90f... Found 1 proofs. Time: 0.57000 s. Total 100 plots Found 1 proofs. Time: 0.57000 s. Total 100 plots
```

If you do this for all your log files and get a result, **great!** This means your farm is 100% working as expected. 可能还没有赢得一个区块，但已经接近成功了一次或多次！ 可能还没有赢得一个区块，但已经接近成功了一次或多次！

### Can a Double NAT scenario impact my farm's ability to send valid proofs to the network?

是也不是。 Double NAT, while quirky, should work due to Chia's uPnP support. 然而，您可能无法通过这种方式将区块发送给其他节点。 然而，您可能无法通过这种方式将区块发送给其他节点。 "双重NAT"场景发生在客户端（收割机或节点）位于进行了两次NAT的网络内。 通常涉及客户端位于两个路由器后面，而不是一个，如下图所示：

互联网 --> 路由器 --> 路由器 --> 客户端

某些网络设置可能会影响全节点参与耕种（farming）的能力。 只要日志中没有明显的指示耕种（farming）无法正常工作的迹象（特别是与网络相关的ERROR、WARNING标签），这种情况不太可能发生。
