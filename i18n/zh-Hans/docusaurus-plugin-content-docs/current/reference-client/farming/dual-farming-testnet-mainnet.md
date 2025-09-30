---
title: Dual Farming
slug: /reference-client/farming/dual-farming-testnet-mainnet
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

（译注：本文关于切换到测试网的方法已经过时，不再具有参考意义，因此本文为机翻）
这些说明适用于Linux。 在MacOS上可以采用类似的方法。

:::

在某些情况下，您可能希望在主网上耕种的同时，在其中一个测试网络上也进行耕种，而不会将它们从主网中移除。 这是可以实现的，但需要额外的工作来为测试网络Chia安装设置唯一的端口。

有几个设置的选项。 You can either ensure you have the `CHIA_ROOT` set to unique values for each instance you want to run, or else run the installations on separate users. These instructions will show setting a specific `CHIA_ROOT`.

## 设置主网安装

For the mainnet installation, we will stick with the default ports and `CHIA_ROOT`, so these steps are essentially no different than the standard [installation instructions](/reference-client/install-and-setup/installation).

## 设置测试网络安装

1. (Optional) Install [yq](https://github.com/mikefarah/yq#install) to make editing the yaml files easier
   - Alternatively, you can manually edit the ports in `config.yaml`
2. 运行以下命令：

```bash
export CHIA_ROOT=~/.chia/testnet
```

3. 运行以下命令：

```bash
chia init
```

4. 运行以下命令：

```bash
chia configure --testnet true
```

5. cd to the `~/.chia/testnet/config` directory and run the following script. 或者，您也可以手动编辑文件。 You do not need to use the ports listed below. 您不需要使用下面列出的端口，但是如果选择更改端口号，请确保它们与主网的默认值不同：

```bash
yq -i '.daemon_port = 55401' ./config.yaml
yq -i '."*".log_syslog_port = 1514' ./config.yaml

yq -i '.data_layer.rpc_port = 10562' ./config.yaml
yq -i '.data_layer.wallet_peer.port = 11256' ./config.yaml
yq -i '.data_layer.host_port = 10575' ./config.yaml

yq -i '.farmer.port = 10447' ./config.yaml
yq -i '.farmer.rpc_port = 10559' ./config.yaml

yq -i '.harvester.rpc_port = 10560' ./config.yaml
yq -i '.harvester.farmer_peers.port = 10447' ./config.yaml

yq -i '.wallet.rpc_port = 11256' ./config.yaml

yq -i '.full_node.rpc_port = 10555' ./config.yaml

yq -i '.timelord.rpc_port = 10557' ./config.yaml
yq -i '.timelord.vdf_server.port = 10000' ./config.yaml
yq -i '.timelord_launcher.port = 10000' ./config.yaml

yq -i '.ui.rpc_port = 10555' ./config.yaml
yq -i '.ui.daemon_port = 55401' ./config.yaml
```

6. 运行以下命令：

```bash
chia start farmer
```

## 在主网和测试网络之间切换

To swap between running commands for mainnet and running commands for testnet, you need to ensure your `CHIA_ROOT` is set properly before running any commands:

- 主网：

  ```bash
  export CHIA_ROOT=~/.chia/mainnet
  ```

- 测试网络：
  ```bash
  export CHIA_ROOT=~/.chia/testnet
  ```
