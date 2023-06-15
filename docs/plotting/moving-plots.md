---
title: Moving Plots
slug: /moving-plots
---

Plots are stored in files. They can be moved from one directory to another, and even to another machine (the operating system doesn't matter). It may also be mounted from an external USB drive or over the network.

## New Directory

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
