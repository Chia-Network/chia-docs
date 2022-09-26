---
title: Moving Plots
slug: /moving-plots
---

Plots are _just_ a static file. Plots can be moved from one folder/directory to another, and even to another machine (of a different operating system). It may also be mounted from an external USB drive or over the network.

# Moving plots within the same machine

1. Move the plot file
2. Add the new plot directory
   - For command line: do `chia plots add -d '/Users/example/folder'`
   - For GUI: go to the `Farmer` tab and click `Add plots`, and select the new directory.

A trick is to rename a plot file from _.plot to _.plot-mv, copy/move it, and rename it back. This way the harvester will not see it as bad if the copy hasn't completed yet.

# Moving plots to a different machine

Pre-requisite: You'd need to have the same keys on the new machine.

1. Install Chia on the new machine
2. Find your private keys using `chia keys show --show-mnemonic-seed` on the old machine, or on the UI by clicking on "Keys".
3. Copy the 24 mnemonic words (this is your private key) and add them to the new machine using `chia keys add`
4. Move the plot file
5. Add the new plot directory
   - For command line: do `chia plots add -d '/Users/example/folder'`
   - For GUI: go to the `Farmer` tab and click `Add plots`, and select the new directory.

After following these steps, and restarting your farmer, the new plots should be visible.

# Plots checking

It's good to check your plots periodically to ensure that it is not corrupted for whatever reason.

You can check if they are working by running `chia plots check` or using the UI and checking if the plots are visible.

# Farming from multiple source plots

If you would like to farm on many machines, but only run one full node and farmer (to save disk space, bandwidth, and keep private keys safer), you should [run one harvester per machine](/farming-on-many-machines).
