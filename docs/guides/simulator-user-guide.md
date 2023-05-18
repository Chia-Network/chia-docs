---
slug: /guides/simulator-user-guide
title: Simulator User Guide
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Intro

This document will guide you through the process of setting up Chia's Simulator. For additional technical resources, see the following:

- [Simulator RPC API](/simulator-rpc)
- [Simulator CLI Reference](/simulator-cli)

:::note

It is possible to run the simulator and either Chia's testnet or mainnet simultaneously. This is because the simulator will use its own ports and directories.

:::

---

### Prerequisites

The simulator is included in the `chia-blockchain` GitHub repository (the same repository that contains Chia's node, and farmer code). To install this repository, see our instructions to [install Chia from source](/installation#from-source).

After you have installed from source and have activated your virtual environment (you should see `(venv)` on the left side of your Powershell/terminal window), you are all set to install the simulator.

:::warning

If you installed Chia from the binary installation file, you cannot use this installation to run the simulator. Instead, follow the instructions linked above to create a new installation from source, then return to this guide.

:::

### Install and configure the simulator

The simulator commands can all be accessed under `chia dev sim`. For a full list of the simulator commands, see our [Simulator CLI Reference](/simulator-cli).

1. Install the simulator

```bash
chia dev sim create
```

If you do not already have any keys in your OS keychain, you will be prompted to create one:

`No keys in keychain. Press 'q' to quit, or press any other key to generate a new key.`

After pressing any key (other than `q`), a new public/private key pair will be generated:

`Generating private key`

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

2. Now that you have the simulator environment set up, you can set the CHIA_ROOT env var to point to this environment. This will enable you to run the simulator from outside of `chia-blockchain`:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   $env:CHIA_ROOT='~/.chia/simulator/main'
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   export CHIA_ROOT=~/.chia/simulator/main
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   export CHIA_ROOT=~/.chia/simulator/main
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

   Note that by setting CHIA_ROOT to the simulator in the current Powershell/terminal window, this enables you to run the simulator in tandem with a full node running on either the testnet or on mainnet. This is because the simulator uses different ports than a normal full node.

### Use the simulator

This section will cover the basic commands for using the simulator.

1. Start the simulator:

```bash
chia start simulator
```

This command is the equivalent of `chia start node` on testnet and mainnet.

2. Start your Chia wallet:

```bash
chia start wallet
```

Result:

```bash
chia_wallet: started
```

3. Verify that the Chia simulator is running and synced:

```bash
chia show -s
```

The result will show that the network is `simulator0` and the block height is 1:

```bash
Network: simulator0    Port: 44159   RPC Port: 22840
Node ID: fba97a7cc4d9d96e581c0d28a77a3f6ca5f3a8be668164c2ae033ededc9a3c47
Genesis Challenge: eb8c4d20b322be8d9fddbf9412016bdffe9a2901d7edb0e364e94266d0e095f7
Current Blockchain Status: Full Node Synced

Peak: Hash: 3cf2239c9d43050497b2b895d33e4c1427edc35bcced8e070da2b9ca60008e0f
      Time: Mon Sep 26 2022 21:00:46 HKT                  Height:          1

Estimated network space: 0.000 MiB
Current difficulty: 1024
Current VDF sub_slot_iters: 1024
Total iterations since the start of the blockchain: 11942

  Height: |   Hash:
        1 | 3cf2239c9d43050497b2b895d33e4c1427edc35bcced8e070da2b9ca60008e0f
```

4. Farm a new block

There are two ways to farm a new block. The simpler solution is with a CLI call:

```bash
chia dev sim farm
```

Result:

```bash
Farmed 1 Transaction blocks
Block Height is now: 2
```

If you want to direct the farming rewards to a specific address, you can call the RPC:

```bash
chia rpc full_node farm_block '{"address":"<farming reward address>"}'
```

Result:

```bash
{
    "new_peak_height": 3,
    "success": true
}
```

For more info on this command, see the [RPC documentation](/simulator-rpc#farm_block).

5. Show your wallet's status (including the prefarm):

```bash
chia wallet show
```

Result (in step 4 we farmed two blocks, thereby receiving 4 TXCH in rewards):

```bash
Wallet height: 3
Sync status: Synced
Balances, fingerprint: 502984008

Chia Wallet:
   -Total Balance:         21000004.0 txch (21000004000000000000 mojo)
   -Pending Total Balance: 21000004.0 txch (21000004000000000000 mojo)
   -Spendable:             21000004.0 txch (21000004000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Connections:
Type      IP                                     Ports       NodeID      Last Connect      MiB Up|Dwn
FULL_NODE 127.0.0.1                              44159/44159 fba97a7c... Sep 27 04:46:26      0.0|0.1
                                                 -Height: No Info    -Hash: No Info    -Trusted: True
```

Note that your wallet is a normal Chia wallet, but it's running within the simulator. This could be helpful, for example, for testing reorgs. You can manually set up a reorg with the simulator and see how your wallet handles it.

6. Edit the simulator's configuration

The simulator's config is stored in `~/.chia/simulator/main/config/config.yaml`. Just as with mainnet and testnet, if you make changes to this config, you will need to restart the simulator for the changes to take effect. This will not affect your regular Chia node.

5. Enable/disable auto farming

By default, as soon as a new spend bundle enters the mempool, a new block will be farmed. In certain cases this may not be the desired behavior. To disable auto farming, run the following command:

```bash
chia dev sim autofarm off
```

Result:

```bash
Auto farming is now off
```

This action will take effect immediately; there is no need to restart the simulator.

To enable auto farming, run:

```bash
chia dev sim autofarm on
```

Result:

```bash
Auto farming is now on
```
