---
title: 移动地块
slug: /moving-plots
---

地块以文件形式存储。 它们可以从一个目录移动到另一个目录，甚至可以移动到另一台机器(操作系统无关紧要)。 Back in 2021, plots took many hours to create with the original ChiaPoS plotter. A typical plotting process went something like this:

1. ChiaPoS Phases 1-3: Create a plot on an SSD (1-8 hours)
2. ChiaPoS Phase 4: Move the new plot to an HDD (10-15 minutes)

Repeat steps 1-2 until the HDD is full. Finally, restart the plotter manually, pointing to a new HDD. This was reasonable at the time -- when it took 8 hours to create a plot, waiting an extra 15 minutes for it to be moved wasn't a big deal.

However, with the release of newer plotters such as BladeBit CUDA, it now only takes a few minutes to create a plot. If the plotting software waited for the plot to be copied to an HDD before creating the next plot, the plotter would be idle nearly 90% of the time!

Luckily, a few community members have created scripts to automate the plot-moving process. This page will show you how to use these tools. If you still prefer a manual process, we will cover that as well.

## Automated

### Plow

- [GitHub link](https://github.com/lmacken/plow)
- [Video tutorial from JM](https://www.youtube.com/watch?v=0xjqQ9paHq0)

Plow is a Python script developed by Luke Macken. It will automatically move files from an SSD to multiple HDDs. As long as you supply the script with enough HDDs, the SSD will never become full. Instead, either the plotter, or possibly the local network's latency, will become the bottleneck. Plow allows you to create upwards of 100 TB of plots per day from a single machine.

### Plotman

- [GitHub link](https://github.com/ericaltendorf/plotman)

Plotman, by Eric Altendorf, is another tool for automating the plot creation process. It comes with a plethora of features, including the automatic spawning of new plotting processes, moving plots, and monitoring each plotting job.

## Manual

If you are only plotting a small farm, or if your plot times are greater than 15 minutes or so, then manually moving is a fine option.

### 新目录

:::tip
为了防止在移动文件时，收割机将一个大的地块视为不完整文件，可以在移动文件之前在文件扩展名后附加`-mv`。 在文件移动完成之后，将其重新命名为原始文件扩展名。
:::

将地块移动到新目录后，必须将其添加到配置中。

如果是使用命令行，请运行以下命令以添加目录：

```bash
chia plots add -d '/path/to/directory'
```

在GUI中，可以通过转到**耕种**选项卡，然后点击**添加地块**来完成这个操作。 选择新目录以添加它。

在完成这些步骤并重新启动耕种（farmer）软件后，新的地块应该就能看见了。

## 新机器

:::note
除非新机器上的农民（farmer）可以访问相同的密钥，否则此操作将无法完成。
:::

在新机器上安装Chia之后，需要导入先前农民使用的相同密钥。

如果是使用命令行，请运行以下命令以获取助记词（mnemonic）：

```bash
chia keys show --show-mnemonic-seed
```

在GUI中，您可以通过注销并在钱包上点击选项按钮来完成此操作。 点击**详细信息**并显示出助记词。

接下来，通过GUI或使用以下命令在新机器上导入助记词：

```bash
chia keys add 'mnemonic'
```

最后，您需要将地块移动到新机器并将该目录添加到配置中。

如果是使用命令行，请运行以下命令以添加目录：

```bash
chia plots add -d '/path/to/directory'
```

在GUI中，可以通过转到**耕种**选项卡，然后点击**添加地块**来完成这个操作。 选择新目录以添加它。

在完成这些步骤并重新启动耕种（farmer）软件后，新的地块应该就能看见了。

## 检查地块

定期检查地块以确保它们未损坏是一个不错的主意。

可以通过运行以下命令来检查它们是否正常工作：

```bash
chia plots check
```

这也可以通过在GUI中检查地块是否在列表中可见来完成。
