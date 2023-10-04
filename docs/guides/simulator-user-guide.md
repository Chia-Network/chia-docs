---
slug: /guides/simulator-user-guide
title: Simulator User Guide
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This document will guide you through the process of setting up Chia's Simulator. For additional technical resources, see the following:

- [Simulator RPC API](/simulator-rpc)
- [Simulator CLI Reference](/simulator-cli)

:::note
It is possible to run the simulator and either Chia's testnet or mainnet simultaneously. This is because the simulator will use its own ports and directories.
:::

---

## Prerequisites

The simulator is included in the `chia-blockchain` GitHub repository (the same repository that contains Chia's node, and farmer code). To install this repository, see our instructions to [install Chia from source](/installation#from-source).

After you have installed from source and have activated your virtual environment (you should see `(venv)` on the left side of your command prompt), you are all set to install the simulator.

:::warning
If you installed Chia from the binary installation file, you cannot use this installation to run the simulator. Instead, follow the instructions linked above to create a new installation from source, then return to this guide.
:::

## Setup instructions

The simulator commands can all be accessed under `chia dev sim`. For a full list of the simulator commands, see our [Simulator CLI Reference](/simulator-cli).

### Create the simulator

Run the following command and follow the prompts to create the simulator:

```bash
chia dev sim create
```

<details>
  <summary>Detailed command instructions</summary>

If you do not already have any keys in your OS keychain, you will be prompted to create one:

```
No keys in keychain. Press 'q' to quit, or press any other key to generate a new key.
```

After pressing any key (other than `q`), a new public/private key pair will be generated:

```
Generating private key
```

If you already have one or more keys installed, you will be prompted to select one:

```bash
Fingerprints:
If you already used one of these keys, select that fingerprint to skip the plotting process. Otherwise, select any key below.
1) 3339549250
2) 1239193935
3) 378808701
Choose a simulator key [1-3] ('q' to quit, or 'g' to generate a new key): 2
```

This command will create several k-19 plots. These plots are significantly smaller than the k-32 plots used on mainnet (8 MiB vs 100 GiB). They will take less than a minute to create on most computers.

This command will also install a new version of Chia that contains a config file that is already set up for the simulator to run on its own ports. The last output of this command should look like the following (the path listed will depend on your user ID and OS):

```bash
Configuration Wizard Complete.
Starting Simulator now...


Daemon not started yet
Starting daemon
chia_full_node_simulator: started
Please wait, generating genesis block.
Farmed 1 Transaction blocks
Block Height is now: 1
Genesis block generated, exiting.

Make sure your CHIA_ROOT Environment Variable is set to: C:\Users\<user>\.chia\simulator\main
```

</details>

### Configure the environment

Now that you have created the simulator, you can set the `CHIA_ROOT` environment variable to point to the simulator's installation directory. This will enable you to run the simulator from outside of `chia-blockchain`:

```mdx-code-block
<Tabs
  defaultValue="windows"
  groupId="os"
  values={[
    {label: 'Windows', value: 'windows'},
    {label: 'Linux / MacOS', value: 'linux/macos'},
  ]}>
  <TabItem value="windows">
```

```powershell
$env:CHIA_ROOT='~/.chia/simulator/main'
```

```mdx-code-block
</TabItem>
<TabItem value="linux/macos">
```

```bash
export CHIA_ROOT='~/.chia/simulator/main'
```

```mdx-code-block
  </TabItem>
</Tabs>
```

:::note
By setting the `CHIA_ROOT` path to the simulator in the current shell window (rather than globally), this enables you to run the simulator in tandem with a full node running on either the testnet or on mainnet. This is because the simulator uses different ports than a normal full node.
:::

## Usage instructions

This section will cover the basic commands for using the simulator.

### Start the simulator

Run the following command to start the simulator:

```bash
chia dev sim start
```

This command is the equivalent of `chia start node` on testnet and mainnet.

### Start your Chia wallet

:::note
You will need to have your `CHIA_ROOT` set before using this command, otherwise it will try to connect to your mainnet or testnet node.
:::

Run the following command to start the wallet:

```bash
chia start wallet
```

### Show node status

Run the following command to verify that the Chia node is running and synced:

```bash
chia show -s
```

When connected to the simulator, the result will show that the network is `simulator0` (and if newly created, the block height is 1).

This is an example of what the output should look like:

<details>
  <summary>Detailed command output</summary>

```bash
Network: simulator0    Port: 50127   RPC Port: 16872
Node ID: 5e4775f1f7d7db43d9d4b5685a15959b52042e40918112053c5e99f59cb8afb7
Genesis Challenge: eb8c4d20b322be8d9fddbf9412016bdffe9a2901d7edb0e364e94266d0e095f7
Current Blockchain Status: Full Node Synced

Peak: Hash: 2d42fe5b2fe275994542a3884e93d0ddd4271f46f61731cc8e523253f3d54474
      Time: Fri May 19 2023 17:24:38 China Standard Time                  Height:          1

Estimated network space: 84.355 MiB
Current difficulty: 1024
Current VDF sub_slot_iters: 1024

  Height: |   Hash:
        1 | b60936d7c4c7583ccbb4ddb173cefcb50ca10f8d49cee1c9bfc2f55337449b66
```

</details>

### Show simulator status

Run the following command to obtain the status of the network, along with your farming address and balance (21 million TXCH from the prefarm):

```bash
chia dev sim status
```

This is an example of what the output should look like:

<details>
  <summary>Detailed command output</summary>

```bash
Network: simulator0    Port: 50127   RPC Port: 16872
Node ID: 5e4775f1f7d7db43d9d4b5685a15959b52042e40918112053c5e99f59cb8afb7
Genesis Challenge: eb8c4d20b322be8d9fddbf9412016bdffe9a2901d7edb0e364e94266d0e095f7
Current Blockchain Status: Full Node Synced

Peak: Hash: 2d42fe5b2fe275994542a3884e93d0ddd4271f46f61731cc8e523253f3d54474
      Time: Fri May 19 2023 17:24:38 China Standard Time                  Height:          1

Estimated network space: 84.355 MiB
Current difficulty: 1024
Current VDF sub_slot_iters: 1024

  Height: |   Hash:
        1 | b60936d7c4c7583ccbb4ddb173cefcb50ca10f8d49cee1c9bfc2f55337449b66

Current Farming address: txch1wn0jp4q6n3eafeee2qj4khw8svdqnvj4hxvzffl9pjrv5wvzf5gsvyz908, with a balance of: 21000000.0 TXCH.
```

</details>

### Farm a new block

You can farm a new block with the following command:

```bash
chia dev sim farm
```

You can also send the farming reward to a specific address:

```bash
chia dev sim farm --target-address <address>
```

And farm multiple blocks at once:

```bash
chia dev sim farm --blocks 5
```

For more info on this command, see the [CLI documentation](/simulator-cli#farm).

### Edit the configuration

The simulator's config is stored in `~/.chia/simulator/main/config/config.yaml`. Just as with mainnet and testnet, if you make changes to this config, you will need to restart the simulator for the changes to take effect. This will not affect your regular Chia node.

### Manage auto farming

By default, as soon as a new spend bundle enters the mempool, a new block will be farmed. In certain cases this may not be the desired behavior. To disable auto farming, run the following command:

```bash
chia dev sim autofarm off
```

This action will take effect immediately, and there is no need to restart the simulator.

Similarly, you can turn auto farming back on:

```bash
chia dev sim autofarm on
```
