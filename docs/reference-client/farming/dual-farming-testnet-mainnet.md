---
title: Dual Farming
slug: /reference-client/farming/dual-farming-testnet-mainnet
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

These instructions are tailored for Linux. A similar approach could likely be followed for MacOS.

:::

In some cases, you may want to farm the same plots you farm on mainnet on one of the testnets as well, without removing them from mainnet. This is doable with a bit of extra legwork to set up unique ports for the testnet Chia installation.

There are a couple options for setting this up. You can either ensure you have the `CHIA_ROOT` set to unique values for each instance you want to run, or else run the installations on separate users. These instructions will show setting a specific `CHIA_ROOT`.

## Set Up Mainnet Installation

For the mainnet installation, we will stick with the default ports and `CHIA_ROOT`, so these steps are essentially no different than the standard [installation instructions](/reference-client/install-and-setup/installation).

## Set Up Testnet Installation

1. (Optional) Install [yq](https://github.com/mikefarah/yq#install) to make editing the yaml files easier
   1. Alternatively, you can manually edit the ports in `config.yaml`
2. Run this command:

```bash
export CHIA_ROOT=~/.chia/testnet
```

3. Run this command:

```bash
chia init
```

4. Run this command:

```bash
chia configure --testnet true
```

5. cd to the `~/.chia/testnet/config` directory and run the following script. Alternatively, you can edit the file manually. You do not need to use the ports listed below. However, if you choose to change the port numbers, ensure that they are different than the default values for mainnet:

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

6. Run this command:

```bash
chia start farmer
```

## Swapping between mainnet and testnet

To swap between running commands for mainnet and running commands for testnet, you need to ensure your `CHIA_ROOT` is set properly before running any commands:

- Mainnet:

  ```bash
  export CHIA_ROOT=~/.chia/mainnet
  ```

- Testnet:
  ```bash
  export CHIA_ROOT=~/.chia/testnet
  ```
