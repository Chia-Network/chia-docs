---
title: Dual Farming
slug: dual-farming-testnet-mainnet
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

:::info

（译注：本文关于切换到测试网的方法已经过时，不再具有参考意义，因此本文为机翻） 这些说明适用于Linux。 在MacOS上可以采用类似的方法。

:::

在某些情况下，您可能希望在主网上耕种的同时，在其中一个测试网络上也进行耕种，而不会将它们从主网中移除。 这是可以实现的，但需要额外的工作来为测试网络Chia安装设置唯一的端口。

有几个设置的选项。 您可以确保为每个要运行的实例设置唯一的`CHIA_ROOT`值，或者在不同的用户上运行安装。 这些说明将展示如何设置特定的`CHIA_ROOT`。

## 设置主网安装

对于主网安装，我们将继续使用默认端口和`CHIA_ROOT`，因此这些步骤与标准的[安装说明](/installation)没有区别。

## 设置测试网络安装

1. （可选）安装[yq](https://github.com/mikefarah/yq#install)，以便更轻松地编辑yaml文件
    1. 或者，您可以手动编辑`config.yaml`中的端口
2. 运行以下命令：
  ```bash
  export CHIA_ROOT ~/.chia/testnet
  ```
3. 运行以下命令：
  ```bash
  chia init
  ```
4. 运行以下命令：
  ```bash
  chia configure --testnet true
  ```
5. 进入`~/.chia/testnet/config`目录并运行以下脚本。 或者，您也可以手动编辑文件。 You do not need to use the ports listed below. 您不需要使用下面列出的端口，但是如果选择更改端口号，请确保它们与主网的默认值不同：

  ```bash
  yq -i '.daemon_port = 55401' ./config.yaml
  yq -i '."*".log_syslog_port = 1514' ./config.yaml
  yq -i '.data_layer.port = 10561' ./config.yaml
  yq -i '.data_layer.rpc_port = 10562' ./config.yaml
  yq -i '.data_layer.wallet_peer.port = 11256' ./config.yaml
  yq -i '.data_layer.host_port = 10565' ./config.yaml

  yq -i '.farmer.port = 10447' ./config.yaml
  yq -i '.farmer.rpc_port = 10559' ./config.yaml
  yq -i '.farmer.harvester_peer.port = 10448' ./config.yaml

  yq -i '.harvester.port = 10448' ./config.yaml
  yq -i '.harvester.rpc_port = 10560' ./config.yaml
  yq -i '.harvester.farmer_peer.port = 10447' ./config.yaml

  yq -i '.wallet.port = 10449' ./config.yaml
  yq -i '.wallet.rpc_port = 11256' ./config.yaml

  yq -i '.full_node.rpc_port = 10555' ./config.yaml
  yq -i '.full_node.wallet_peer.port = 10449' ./config.yaml
  yq -i '.full_node.farmer_peer.port = 10447' ./config.yaml

  yq -i '.ui.port = 10222' ./config.yaml
  yq -i '.ui.rpc_port = 10555' ./config.yaml
  yq -i '.ui.daemon_port = 55401' ./config.yaml
  ```

6. 运行以下命令：
  ```bash
  chia start farmer
  ```

## 在主网和测试网络之间切换

在运行任何主网或测试网络的命令之前，您需要确保正确设置了`CHIA_ROOT`：

- 主网：
  ```bash
  export CHIA_ROOT=~/.chia/mainnet
  ```

- 测试网络：
  ```bash
  export CHIA_ROOT=~/.chia/testnet
  ```