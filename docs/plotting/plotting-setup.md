---
sidebar_label: Plotting Setup
title: Plotting Setup
slug: /plotting-setup
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

When it comes to plotting and farming in Chia, there is no one-size-fits-all solution. Hopefully after reading this section, you will have the information to help you make an informed decision about how to set up your farm.

## Farm Size

Welcome to the Chia farming community! You're in good company -- over 100,000 people all over the world are currently farming on Chia. Farms of all sizes are covered, from 1-TB microfarms to multi-PB whales.

How big will your farm be?

You don't have to answer this question right away. Many farmers start with a single used hard drive and an old laptop or desktop. This is a great way to get started because you don't have to buy any equipment. Once they see how it works, many farmers choose to grow their farms. But it might help to have an _idea_ of how big you want your farm to be before you get started. If you do buy any equipment, it will help to have the most optimal setup.

## To compress or not to compress

As explained previously, most new farmers will choose to create plots with some amount of compression. Even if you choose to farm with C1 or C2 plots, which a Raspberry Pi can handle without issue, your rewards will be 16-18% higher than with uncompressed plots. And there is very little downside to farming with these plots -- they only consume a tiny amount more electricity than C0 (uncompressed) plots.

And if you plan to set up a large farm of 1 PiB or more, using compressed plots is a no-brainer. The larger your farm, the higher the benefits of using compressed plots.

Of course, if you already have a small farm that is up and running with uncompressed plots, you may not want to go through the trouble of replotting just to increase your rewards by a bit. This is also fine -- uncompressed plots will continue to be supported going forward.

## Choosing a compression level

As discussed previously, plots only need to be created once, after which they can be farmed for many years. But this still leaves the decision of plotting machines and farming machines to use.

One thing to keep in mind is that a farming computer only cares about the completed plots. It doesn't care how that plot was created, or how long it took.

With that in mind, the following table will give you an idea of what compression level to use, given your farming computer. This assumes you will use the Bladbit plotter that comes prepackaged with Chia installations:

| <br />Level | Size <br />(GiB) | Relative <br />Size | Reward <br />Increase | Farm <br /> With |
| :---------- | :--------------- | :------------------ | :-------------------- | :--------------- |
| C0          | 101.4 		     | 100%                | 0%                    | Pi 4             |
| C1          | 87.5             | 86.3%               | 15.9%                 | Pi 4             |
| C2          | 86.0             | 84.8%               | 17.9%                 | Pi 4             |
| C3          | 84.5             | 83.3%               | 20.0%                 | Pi 4             |
| C4          |	82.9             | 81.8%               | 22.3%                 | Pi 4             |
| C5          | 81.3             | 80.2%               | 24.7%                 | Fast CPU         |
| C6          | 79.6             | 78.5%               | 27.4%                 | Fast CPU         |
| C7          | 78.0             | 76.9%               | 29.8%                 | GPU              |
| C9          | 75.2             | 74.2%               | 34.8%                 | GPU              |