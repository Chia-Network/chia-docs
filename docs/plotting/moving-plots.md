---
title: Moving Plots
slug: /moving-plots
---

Plots are stored in files. They can be moved from one directory to another, and even to another machine (the operating system doesn't matter). Back in 2021, plots took many hours to create with the original ChiaPoS plotter. A typical plotting process went something like this:

1. ChiaPoS Phases 1-3: Create a plot on an SSD (1-8 hours)
2. ChiaPoS Phase 4: Move the new plot to an HDD (10-15 minutes)

Repeat steps 1-2 until the HDD is full. Finally, restart the plotter manually, pointing to a new HDD. This was reasonable at the time -- when it took 8 hours to create a plot, waiting an extra 15 minutes for it to be moved wasn't a big deal.

However, with the release of newer plotters such as BladeBit CUDA, it now only takes a few minutes to create a plot. If the plotting software waited for the plot to be copied to an HDD before creating the next plot, the plotter would be idle nearly 90% of the time!

Luckily, a few community members have created scripts to automate the plot-moving process. This page will show you how to use these tools. If you still prefer a manual process, we will cover that as well.

## Automated

### Plow

* [GitHub link](https://github.com/lmacken/plow)
* [Video tutorial from JM](https://www.youtube.com/watch?v=0xjqQ9paHq0)

Plow is a Python script developed by Luke Macken. It will automatically move files from an SSD to multiple HDDs. As long as you supply the script with enough HDDs, the SSD will never become full. Instead, either the plotter, or possibly the local network's latency, will become the bottleneck. Plow allows you to create upwards of 100 TB of plots per day from a single machine.

### Plotman

* [GitHub link](https://github.com/ericaltendorf/plotman)

Plotman, by Eric Altendorf, is another tool for automating the plot creation process. It comes with a plethora of features, including the automatic spawning of new plotting processes, moving plots, and monitoring each plotting job.

## Manual

If you are only plotting a small farm, or if your plot times are greater than 15 minutes or so, then manually moving is a fine option.

### New Directory

:::tip
To prevent the harvester seeing a large plot as incomplete while it is being moved, append `-mv` to the file extension before moving the file. After it has been moved, rename it back to the original file extension.
:::

Once a plot is moved to a new directory, it will have to be added to the config.

If you are using the command line, run the following command to add the directory:

```bash
chia plots add -d '/path/to/directory'
```

On the GUI, you can do this by going to the **Farmer** tab and clicking **Add Plots**. Select the new directory to add it.

After following these steps, and restarting your farmer, the new plots should be visible.

## New Machine

:::note
This will not work unless the farmer on the new machine has access to the same keys.
:::

Once Chia is installed on the new machine, you will need to import the same keys used by the previous farmer.

If you are using the command line, run the following command to get the mnemonic phrase:

```bash
chia keys show --show-mnemonic-seed
```

On the GUI, you can do this by logging out and clicking the options button on your wallet. Click **Details** and reveal the seed phrase.

Next, import the mnemonic phrase on the new machine through the GUI or by using the following command:

```bash
chia keys add 'mnemonic'
```

Finally, you will need to move the plot file to the new machine and add the directory to the config.

If you are using the command line, run the following command to add the directory:

```bash
chia plots add -d '/path/to/directory'
```

On the GUI, you can do this by going to the **Farmer** tab and clicking **Add Plots**. Select the new directory to add it.

After following these steps, and restarting your farmer, the new plots should be visible.

## Checking Plots

It's a good idea to periodically check plots to ensure that they are not corrupted.

You can check if they are working by running the following command:

```bash
chia plots check
```

This can also be done in the GUI by checking if the plots are visible in the list.
