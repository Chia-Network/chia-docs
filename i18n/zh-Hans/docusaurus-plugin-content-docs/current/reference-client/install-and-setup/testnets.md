---
title: Testnets
slug: /reference-client/install-and-setup/testnets
---

:::note

**testnet11 is the only supported testnet.** Older testnets may remain active, but Chia Network Inc. no longer officially supports them.

Testnet 7 may remain active, but is no longer officially supported by Chia Network Inc.
Testnets can be used to test the chia software with coins that have no real world value.\
If you want to run the Chia blockchain mainnet, use the [mainnet installation](/installation) instructions.
If you want to run the Chia blockchain mainnet, use the [mainnet installation](/docs/reference-client/install-and-setup/installation.md) instructions.

:::

---

## Join the official testnet

### 先决条件

- Minimum Chia version is 2.1.0 [installed](/docs/reference-client/install-and-setup/installation.md).
- All chia processes have been stopped with `chia stop all-d`.

### Configure Chia for testnet

```bash
# Initialize chia
chia init

# Generate keys (if they have not already been generated)
chia keys generate

# Configure Chia for the currently-active testnet
chia configure --testnet true
```

### (Opt) Download the official testnet db

The process for using the official database snapshot torrent can be found here:
https://docs.chia.net/reference-client/troubleshooting/node-syncing/#using-the-official-database-snapshot-torrent

### Start your node and connect to peers

```bash
# Start your node
chia start farmer

# Check sync status
chia show -s`

# Once the node is synced, you can check the wallet status
chia wallet show
```

### (Opt) Fund a testnet wallet

```bash
# Get a testnet wallet address differentiated from mainnet wallet addresses by beginning with txch instead of xch
chia wallet get_address
```

Input your testnet wallet address into one of the faucets. If it says you are in the queue, it has worked.

- Chia Official [testnet faucet](https://testnet10-faucet.chia.net/).
- Community developed and managed [testnet faucet](https://txchfaucet.com/). _Thank you to Steve Stepp for building and managing this faucet!_

**Funds will not appear in your wallet until you are fully synced to the blockchain.**

---

## Dual farming mainnet and testnet

_These instructions are tailored for Linux. A similar approach could likely be followed for MacOS._

在某些情况下，您可能希望在主网上耕种的同时，在其中一个测试网络上也进行耕种，而不会将它们从主网中移除。 This is doable with a bit of extra legwork to set up unique ports for the testnet chia installation.

有几个设置的选项。 有几个设置的选项。 You can either ensure you have the CHIA_ROOT set to unique values for each instance you want to run, or else run the installations on separate users. These instructions will show setting a specific CHIA_ROOT.

### Set Up mainnet installation

For the mainnet installation, we will stick with the default ports and CHIA_ROOT, so these steps are essentially no different than the standard [installation instructions](/reference-client/install-and-setup/installation.md)

### Set Up testnet installation

:::note

(Optional) Install `yq` to make editing the yaml files easier [https://github.com/mikefarah/yq#install](https://github.com/mikefarah/yq#install).\
Alternatively, you can manually edit the ports in `config.yaml`.  
Alternatively, you can manually edit the ports in `config.yaml`.

:::

```bash
# Export the Chia root
export CHIA_ROOT ~/.chia/testnet

# Initialize testnet
chia init

# Configure Chia for the currently-active testnet
chia configure --testnet true

# Edit the file `~/.chia/testnet/config/config.yaml` and set the following fields to the new port values.
# Use the ports listed or choose any you desire as long as they are different than the default values for mainnet.

yq -i '.daemon_port = 55401' ~/.chia/testnet/config/config.yaml
yq -i '.ui.daemon_port = 55401' ~/.chia/testnet/config/config.yaml

yq -i '.ui.port = 8802' ~/.chia/testnet/config/config.yaml

yq -i '.farmer.port = 8547' ~/.chia/testnet/config/config.yaml
yq -i '.full_node.farmer_peer.port = 8547' ~/.chia/testnet/config/config.yaml
yq -i '.harvester.farmer_peer.port = 8547' ~/.chia/testnet/config/config.yaml

yq -i '.harvester.port = 8548' ~/.chia/testnet/config/config.yaml
yq -i '.farmer.harvester_peer.port = 8548' ~/.chia/testnet/config/config.yaml

yq -i '.wallet.port = 8649' ~/.chia/testnet/config/config.yaml
yq -i '.full_node.wallet_peer.port = 8649' ~/.chia/testnet/config/config.yaml

yq -i '.full_node.rpc_port = 8800' ~/.chia/testnet/config/config.yaml
yq -i '.ui.rpc_port = 8800' ~/.chia/testnet/config/config.yaml

yq -i '.farmer.rpc_port = 8571' ~/.chia/testnet/config/config.yaml

yq -i '.harvester.rpc_port = 8572' ~/.chia/testnet/config/config.yaml

yq -i '.wallet.rpc_port = 9456' ~/.chia/testnet/config/config.yaml

# Start Chia
chia start farmer
```

### Swap between mainnet and testnet

To swap between running commands for mainnet and running commands for testnet, you need to ensure your `CHIA_ROOT` is set properly before running any commands

- Mainnet: `export CHIA_ROOT=~/.chia/mainnet`
- Testnet: `export CHIA_ROOT=~/.chia/testnet`

---

## Create a local testnet for fast, private testing

_These instructions are tailored for Linux. A similar approach could likely be followed for MacOS._

0. Stop all chia processes. Check that they have stopped with `ps -ef | grep chia`
1. Create a new chia root using `export CHIA_ROOT="~/.chia/my_testnet"`, then `chia init`. Don't forget to export CHIA_ROOT, or prefix your chia commands with `CHIA_ROOT="~/.chia/my_testnet"` if you want to run on my_testnet when starting a new terminal.
2. Create a new entry in config.yaml with a different [GENESIS_CHALLENGE](https://docs.chia.net/chia-blockchain/consensus/chains/challenges/#genesis-challenge), and reduced `DIFFICULTY_CONSTANT_FACTOR`. 2^67 constant factor is around 110PiB assuming a fast timelord. So if you have around 110GiB, you can set it to 2 ^ 47. Decrease SUB_SLOT_ITERS_STARTING to something like 2^23 if you are using a slow computer. Decrease PLOT_FILTER if you want to have more proof checks per signage point.
3. Make sure to add **my_testnet** to all places that need it, like network_overrides.config, and selected_network
4. Change the introducer URLs to point to localhost so you don't contact the real ones
5. Do `sh install-timelord.sh`
6. Run the system with `chia start all`
7. If you have installed the gui, run `(cd chia-blockchain-gui && npm run electron &)`

You can generate a new genesis challenge by running python, and entering the following commands:

```python
from secrets import token_bytes
print(token_bytes().hex())
```

---

## Testnet support

Join Our [Discord](https://discord.gg/chia) and jump into the #testnet channel for support

---
