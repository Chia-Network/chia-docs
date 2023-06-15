---
sidebar_label: Simulator
title: Simulator CLI Reference
slug: /simulator-cli
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Intro

The simulator gives you complete control of a private Chia blockchain, including the ability to advance and revert blocks as needed.

This page includes a comprehensive list of Chia's Command Line Interface commands for using the simulator.

For more info, see the following:

- [Simulator User Guide](/guides/simulator-user-guide)
- [Simulator RPC API](/simulator-rpc)

---

## Reference

### `create`

Functionality: Set up a Chia Simulator

Usage: `chia dev sim create [OPTIONS]`

Options:

| Short Command | Long Command     | Type    | Required | Description                                                                   |
| :------------ | :--------------- | :------ | :------- | :---------------------------------------------------------------------------- |
| -f            | --fingerprint    | INTEGER | False    | Use your fingerprint to skip the key prompt                                   |
| -r            | --reward_address | TEXT    | False    | Use this address instead of the default farming address                       |
| -p            | --plot-directory | TEXT    | False    | Set the directory in which to create/store plots (Default: 'simulator/plots') |
| -m            | --mnemonic       | TEXT    | False    | Add a new key to the keychain using the specified mnemonic                    |
| -a            | --auto-farm      | BOOLEAN | False    | Enable or Disable auto farming (Default: True)                                |
| -h            | --help           | None    | False    | Show a help message and exit                                                  |

<details>
<summary>Example 1</summary>

Use all default values, with no keys present on the local machine.

In this case, a new key will be created, along with several k-19 plots. Finally, the simulator will be started and the genesis block will be farmed:

```bash
chia dev sim create
```

Response:

```
Using this Directory: /home/user/.chia/simulator/main

No keys in keychain. Press 'q' to quit, or press any other key to generate a new key.
Generating private key
Added private key with public key fingerprint 3045631419
Creating chia directory & config...
CHIA_ROOT is set to /home/user/.chia/simulator/main
Chia directory /home/user/.chia/simulator/main
Setting Testnet
Default full node port, introducer and network setting updated
Restart any running chia services for changes to take effect
Can't find private CA, creating a new one in /home/user/.chia/simulator/main to generate TLS certificates
SSL file permissions are correct
Setting the xch destination for the farmer reward (1/8 plus fees, solo and pooling) to txch1y8efcgt9fthxzghw0xcdvru6rnvfpp4ywg0pruuztse0zweh98ws0z7j0q
Setting the xch destination address for pool reward (7/8 for solo only) to txch1y8efcgt9fthxzghw0xcdvru6rnvfpp4ywg0pruuztse0zweh98ws0z7j0q
To change the XCH destination addresses, edit the `xch_target_address` entries in /home/user/.chia/simulator/main/config/config.yaml.

To see your keys, run 'chia keys show --show-mnemonic-seed'
Please Wait, Generating plots...
This may take up to a minute if you are on a slow machine

Starting plotting progress into temporary dirs: /home/user/.chia/simulator/plots/tmp and /home/user/.chia/simulator/plots/tmp
ID: 11ab61868e8e25cab4db09d10813da8a02b23408683aea8e71afd907316a8509
Plot size is: 19
Buffer size is: 100MiB
Using 16 buckets
Final Directory is: /home/user/.chia/simulator/plots
Using 2 threads of stripe size 2000
Process ID is: 15337

Starting phase 1/4: Forward Propagation into tmp files... Tue Sep 27 21:50:39 2022
Computing table 1
Progress update: 0.01
F1 complete, time: 0.039 seconds. CPU (27.96%) Tue Sep 27 21:50:40 2022
Computing table 2
Progress update: 0.06
	Bucket 0 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 1 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 2 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 3 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 4 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 5 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 6 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 7 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 8 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 9 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 10 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 11 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 12 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 13 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 14 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 15 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Total matches: 524787
Forward propagation table time: 0.381 seconds. CPU (88.320%) Tue Sep 27 21:50:40 2022
Computing table 3

...
...

Starting phase 4/4: Write Checkpoint tables into "/home/user/.chia/simulator/plots/tmp/plot-k19-01b3db7aa435879c6cdb8aa3b1602121ba60326e4809e0f8989cd481257290dd.plot.2.tmp" ... Tue Sep 27 21:50:53 2022
	Starting to write C1 and C3 tables
	Bucket 0 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 1 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 2 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 3 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 4 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 5 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 6 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 7 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 8 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 9 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 10 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 11 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 12 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 13 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 14 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Bucket 15 QS. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB. force_qs: 1
	Finished writing C1 and C3 tables
	Writing C2 table
	Finished writing C2 table
	Final table pointers:
	P1: 0x10c
	P2: 0x114ef8
	P3: 0x20eedf
	P4: 0x30a249
	P5: 0x40903c
	P6: 0x512dca
	P7: 0x642835
	C1: 0x779c35
	C2: 0x779cd1
	C3: 0x779cd7
Time for phase 4 = 0.133 seconds. CPU (65.200%) Tue Sep 27 21:50:53 2022
Approximate working space used (without final file): 0.019 GiB
Final File size: 0.008 GiB
Total time = 3.910 seconds. CPU (81.260%) Tue Sep 27 21:50:53 2022
Renamed final file from "/home/user/.chia/simulator/plots/tmp/plot-k19-01b3db7aa435879c6cdb8aa3b1602121ba60326e4809e0f8989cd481257290dd.plot.2.tmp" to "/home/user/.chia/simulator/plots/plot-k19-01b3db7aa435879c6cdb8aa3b1602121ba60326e4809e0f8989cd481257290dd.plot"
New plots generated.


Farming & Prefarm reward address: txch1qm90eg9rx92dytr86fc4xqrjkpxxhfz59zxry24f7244u5ptlans0au950

Configuration Wizard Complete.
Starting Simulator now...


Daemon not started yet
Starting daemon
chia_full_node_simulator: started
Please wait, generating genesis block.
Farmed 1 Transaction blocks
Block Height is now: 1
Genesis block generated, exiting.
```

</details>

<details>
<summary>Example 2</summary>

Use all default values, with a key and plots already generated:

```bash
chia dev sim create
```

Response:

```
Using this Directory: /home/user/.chia/simulator/main

Fingerprints:
If you already used one of these keys, select that fingerprint to skip the plotting process. Otherwise, select any key below.
1) 3045631419
Choose a simulator key [1-1] ('q' to quit, or 'g' to generate a new key): 1
Creating chia directory & config...
Please Wait, Generating plots...
This may take up to a minute if you are on a slow machine
Using Existing Plots

Farming & Prefarm reward address: txch1qm90eg9rx92dytr86fc4xqrjkpxxhfz59zxry24f7244u5ptlans0au950

Configuration Wizard Complete.
Starting Simulator now...


Daemon not started yet
Starting daemon
chia_full_node_simulator: started
Please wait, generating genesis block.
Genesis block already exists, exiting.
```

</details>

<details>
<summary>Example 3</summary>

Add a mnemonic seed for a key that does not yet exist on this machine.

In this case, the key will be added and plots will be generated:

```bash
chia dev sim create --mnemonic "use scrap doll sugar october repair color owner know click awkward tragic skate bleak great jeans clean marriage wheat concert pudding sketch horse quick"
```

Response:

```
Using this Directory: /home/user/.chia/simulator/main

Added private key with public key fingerprint 3505952827
Creating chia directory & config...
Please Wait, Generating plots...
This may take up to a minute if you are on a slow machine

Starting plotting progress into temporary dirs: /home/user/.chia/simulator/plots/tmp and /home/user/.chia/simulator/plots/tmp
ID: e66ecd90151b7e20a2b9a347b794bee638976816282a4eabe85170730b755821
Plot size is: 19
Buffer size is: 100MiB
Using 16 buckets
Final Directory is: /home/user/.chia/simulator/plots
Using 2 threads of stripe size 2000
Process ID is: 15978

Starting phase 1/4: Forward Propagation into tmp files... Tue Sep 27 22:14:15 2022
Computing table 1
Progress update: 0.01
F1 complete, time: 0.014 seconds. CPU (93.63%) Tue Sep 27 22:14:15 2022
Computing table 2
Progress update: 0.06
	Bucket 0 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 1 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 2 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 3 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 4 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 5 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 6 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 7 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 8 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 9 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 10 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 11 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 12 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 13 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Bucket 14 uniform sort. Ram: 0.088GiB, u_sort min: 0.001GiB, qs min: 0.000GiB.
	Bucket 15 uniform sort. Ram: 0.088GiB, u_sort min: 0.000GiB, qs min: 0.000GiB.
	Total matches: 523642
Forward propagation table time: 0.337 seconds. CPU (88.970%) Tue Sep 27 22:14:15 2022
Computing table 3

...
...

Time for phase 4 = 0.144 seconds. CPU (61.970%) Tue Sep 27 22:14:28 2022
Approximate working space used (without final file): 0.019 GiB
Final File size: 0.008 GiB
Total time = 4.825 seconds. CPU (70.780%) Tue Sep 27 22:14:28 2022
Renamed final file from "/home/user/.chia/simulator/plots/tmp/plot-k19-545dc9d108ac447c16d2f6b803b2f7f9bbd7288cc04c0920a32b8c528238ae01.plot.2.tmp" to "/home/user/.chia/simulator/plots/plot-k19-545dc9d108ac447c16d2f6b803b2f7f9bbd7288cc04c0920a32b8c528238ae01.plot"
Plot /home/user/.chia/simulator/plots/plot-k19-01b3db7aa435879c6cdb8aa3b1602121ba60326e4809e0f8989cd481257290dd.plot has a farmer public key that is not in the farmer's pk list.
Plot /home/user/.chia/simulator/plots/plot-k19-088e54328bbb7cab3132fab4b7fe1fd8b1903d132a219ab9a8b1411bd518fa41.plot has a farmer public key that is not in the farmer's pk list.
Plot /home/user/.chia/simulator/plots/plot-k19-11ab61868e8e25cab4db09d10813da8a02b23408683aea8e71afd907316a8509.plot has a farmer public key that is not in the farmer's pk list.
New plots generated.


Farming & Prefarm reward address: txch1r6ryxsyj8s956fn5hy4lsk3v8g8jt54ghulf47ga6u66rh3utezqnsny7t

Configuration Wizard Complete.
Starting Simulator now...


Daemon not started yet
Starting daemon
chia_full_node_simulator: started
Please wait, generating genesis block.
Farmed 1 Transaction blocks
Block Height is now: 1
Genesis block generated, exiting.
```

</details>

---

### `autofarm`

Functionality: Enable or disable auto farming on transaction submission

Usage: `chia dev sim autofarm [OPTIONS] [on|off]`

Options:

| Short Command | Long Command | Type | Required | Description                  |
| :------------ | :----------- | :--- | :------- | :--------------------------- |
| -h            | --help       | None | False    | Show a help message and exit |

Auto farming is enabled by default. The examples will show you how to disable/enable it.

<details>
<summary>Example 1</summary>

Disable auto farming:

```bash
chia dev sim autofarm off
```

Response:

```
Auto farming is now off
```

</details>

<details>
<summary>Example 2</summary>

Enable auto farming:

```bash
chia dev sim autofarm on
```

Response:

```
Auto farming is now on
```

</details>

---

### `farm`

Functionality: Farm one or more blocks

Usage: `chia dev sim farm [OPTIONS]`

Options:

| Short Command | Long Command      | Type    | Required | Description                                                              |
| :------------ | :---------------- | :------ | :------- | :----------------------------------------------------------------------- |
| -b            | --blocks          | INTEGER | False    | Number of blocks to create (Default: 1)                                  |
| -n            | --non-transaction | None    | False    | Enable to allow non-transaction blocks (Default: disabled)               |
| -a            | --target-address  | TEXT    | False    | Block reward address. If not specified, the default address will be used |
| -h            | --help            | None    | False    | Show a help message and exit                                             |

<details>
<summary>Example 1</summary>

Farm one transaction block using the default values:

```bash
chia dev sim farm
```

Response:

```
Farmed 1 Transaction blocks
Block Height is now: 2
```

</details>

<details>
<summary>Example 2</summary>

Farm multiple transaction blocks:

```bash
chia dev sim farm -b 3
```

Response:

```
Farmed 3 Transaction blocks
Block Height is now: 5
```

</details>

<details>
<summary>Example 3</summary>

Farm multiple blocks (transaction or non-transaction):

```bash
chia dev sim farm -b 3 -n
```

Response:

```
Farmed 3 blocks
Block Height is now: 8
```

</details>

<details>
<summary>Example 4</summary>

Farm a transaction block and send the reward to a different address.

(WARNING: As of this writing in September 2022, this doesn't actually work. The primary address is still used. For more info, see:
https://github.com/Chia-Network/chia-dev-tools/issues/48)

First, check the state of the primary wallet:

```bash
chia wallet show
```

The wallet contains the prefarm (21 million TXCH), as well as 12 TXCH from farming rewards:

```
Wallet height: 8
Sync status: Synced
Balances, fingerprint: 3446212044

Chia Wallet:
   -Total Balance:         21000012.0 txch (21000012000000000000 mojo)
   -Pending Total Balance: 21000012.0 txch (21000012000000000000 mojo)
   -Spendable:             21000012.0 txch (21000012000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

Next, farm the block. For this example we'll send the reward to the burn address:

```bash
chia dev sim farm -a txch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm6ksh7qddh
```

Response:

```bash
Farmed 1 Transaction blocks
Block Height is now: 9
```

To verify that the reward was not sent to the default wallet, show its status again:

```bash
chia wallet show
```

Response:

```
Wallet height: 9
Sync status: Synced
Balances, fingerprint: 3446212044

Chia Wallet:
   -Total Balance:         21000014.0 txch (21000014000000000000 mojo)
   -Pending Total Balance: 21000014.0 txch (21000014000000000000 mojo)
   -Spendable:             21000014.0 txch (21000014000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

</details>

---

### `revert`

Functionality: Revert existing transactions and advance the chain with the reverted state intact

Usage: `chia dev sim revert [OPTIONS]`

Options:

| Short Command | Long Command     | Type    | Required | Description                                                                                                                                                                        |
| :------------ | :--------------- | :------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -b            | --blocks         | INTEGER | False    | Number of blocks to go back (Default: 1)                                                                                                                                           |
| -n            | --new_blocks     | INTEGER | False    | Number of new blocks to add during a reorg (Default: 1)                                                                                                                            |
| -r            | --reset          | None    | False    | Enable to revert all transactions to the genesis block (Default: disabled)                                                                                                         |
| -f            | --force          | None    | False    | Enable to forcefully delete blocks, this is not a reorg but might be needed in very special circumstances. Note: Use with caution, this will break all wallets (Default: disabled) |
| -d            | --disable_prompt | None    | False    | Disable confirmation prompt when force reverting, only works in conjunction with `-f` (Default: prompt is enabled)                                                                 |
| -h            | --help           | None    | False    | Show a help message and exit                                                                                                                                                       |

<details>
<summary>Example 1</summary>

Revert the transactions from one block and advance the chain by one block:

```bash
chia dev sim revert
```

Response:

```
All transactions in Block: 9 and above were successfully reverted.
Block Height is now: 11
```

</details>

<details>
<summary>Example 2</summary>

Revert transactions from three blocks and advance the chain by five blocks:

```bash
chia dev sim revert -b 3 -n 5
```

The chain was on block 12 prior to this command. Blocks 9 and above will have their transactions reverted, and the chain will advance to block 17:

```bash
All transactions in Block: 9 and above were successfully reverted.
Block Height is now: 17
```

</details>

<details>
<summary>Example 3</summary>

Revert all transactions in the blockchain (note that this could take several minutes):

```bash
chia dev sim revert -r
```

Response:

```bash
All transactions in Block: 16 and above were successfully reverted.
Block Height is now: 18
```

</details>

---

### `start`

Functionality: Start service groups

Usage: `chia dev sim start [OPTIONS]`

Options:

| Short Command | Long Command | Type | Required | Description                                            |
| :------------ | :----------- | :--- | :------- | :----------------------------------------------------- |
| -r            | --restart    | None | False    | Enable to restart running services (Default: disabled) |
| -w            | --wallet     | None | False    | Enable to start wallet (Default: disabled)             |
| -h            | --help       | None | False    | Show a help message and exit                           |

<details>
<summary>Example 1</summary>

Use the default values. This will start the daemon and the simulator, but not the wallet:

```bash
chia dev sim start
```

Response:

```
Daemon not started yet
Starting daemon
chia_full_node_simulator: started
```

</details>

<details>
<summary>Example 2</summary>

Status before this example: Simulator is running and wallet is not running.

Restart the simulator and start the wallet:

```bash
chia dev sim start -r -w
```

Response:

```bash
chia_full_node_simulator: stopped
chia_full_node_simulator: started
chia_wallet: started
```

</details>

---

### `status`

Functionality: Get information about the state of the simulator.

Usage: `chia dev sim status [OPTIONS]`

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                                              |
| :------------ | :---------------- | :------ | :------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| -f            | --fingerprint     | INTEGER | False    | Get detailed information on this fingerprint.                                                                                            |
| -k            | --show_key        | None    | False    | Enable to show detailed key information, including seed phrase (Default: disabled)                                                       |
| -c            | --show_coins      | None    | False    | Enable to show all unspent coins (Default: disabled). When enabled, this does not show reward coins unless used in conjunction with `-i` |
| -i            | --include_rewards | None    | False    | Enable to show rewards coins (Default: disabled). This option must be used in conjunction with `-c`                                      |
| -a            | --show_addresses  | None    | False    | Enable to show the balances of all addresses (Default: disabled)                                                                         |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                                             |

<details>
<summary>Example 1</summary>

Show the status using the default values:

```bash
chia dev sim status
```

Response:

```
Network: simulator0    Port: 48593   RPC Port: 18406
Node ID: 6ca9a8ebe8ed4b2cba673666a29a75d18b3c358fee6e29153cde55ee33320261
Genesis Challenge: eb8c4d20b322be8d9fddbf9412016bdffe9a2901d7edb0e364e94266d0e095f7
Current Blockchain Status: Full Node Synced

Peak: Hash: 293660bf6d6f724829448b97eb04abc6146a65b37d0b957983f69df952413a61
      Time: Wed Sep 28 2022 00:02:39 HKT                  Height:         10

Estimated network space: 15.384 MiB
Current difficulty: 1024
Current VDF sub_slot_iters: 1024
Total iterations since the start of the blockchain: 36460

  Height: |   Hash:
       10 | 293660bf6d6f724829448b97eb04abc6146a65b37d0b957983f69df952413a61
        9 | e564309d7a4ad72bdf8f0dce838f5d91108ed49dddf88027aca9d8888ab86436
        8 | a24f84ac2ccf11d43af21e2b416b92230b4f7b7db052db9a7ca9dc6ee2a9fb43
        7 | f615455590b922362d2558e32141190ef474d60cc2a6d8f1acdeae899d798349
        6 | 8b44d5a7e664ccbf92d34538e5f18f84c6f361871a12e797c9ce567c111ef97f
        5 | 4e79d87856af757835bf3fa083965b57c0bcadbb00ded733ca8a4451a615a3d6
        4 | 7e3421e5448f58f2aab693aaeb506c953145d46cb9d58547a2bf53b0e35ac584
        3 | 4c7e1e15646fa05e0d920d6b06b5574b3214568a84fb171a9dcdfe657990433a
        2 | bbb21b5a1ec18739fabcf231d15c51eb0b73900c178e4cfa329dadbef9d7a492
        1 | 2a7df0f20b654d66fa4f77a54060855b5a9532f79b36d12bfd175831a321e6ba

Current Farming address: txch1t7e7pnxzxas207gh4q08sukvjg0emk7gvkpdld8kfmhxd7k4uaqq9x4yd2, with a balance of: 21000016.0 TXCH.
```

</details>

<details>
<summary>Example 2</summary>

Include key info with the status (CAUTION: this includes the key's seed phrase):

```bash
chia dev sim status -k
```

Response:

```bash
Using fingerprint 3446212044

Fingerprint: 3446212044
Master public key (m): 85e97db8c445bd82aad6e24b39f50764744f5050df1cd3d5cdaf9af43d334c4b2df72bd3c6c3fd0b8a6985a4063814e9
Farmer public key (m/12381/8444/0/0): 99134f4041f349a1cffd05e77850349463697a1179416d5538efd84b0e68edb93f8ee119451b90a48cc4a7103f1385a3
Pool public key (m/12381/8444/1/0): a3fc6e527242366680378faecf475bc7bba6083817d2671b447563df079954ca96ad1609f9802e2ada99f103799f5991
First wallet address: txch1v3wjjapxvepyadvr2wgp7272md84lv6kmaxyxm4lq5le2jcc90zqkxhgv6
Master private key (m): 38a46d85d64de2a606f26b4abc31ae5afc3fd522df9d88d2f2ab98cae0e5261e
First wallet secret key (m/12381/8444/2/0): PrivateKey 51d49f53301e068bb941bf93fda9ddd59404a5e5f6a338706f9ad65be277669b
  Mnemonic seed (24 secret words):
dragon marriage portion employ net stumble grid silk ladder fan dove small noise stick divert transfer since siege fit annual dwarf gate fox garage

Network: simulator0    Port: 48593   RPC Port: 18406
Node ID: 6ca9a8ebe8ed4b2cba673666a29a75d18b3c358fee6e29153cde55ee33320261
Genesis Challenge: eb8c4d20b322be8d9fddbf9412016bdffe9a2901d7edb0e364e94266d0e095f7
Current Blockchain Status: Full Node Synced

Peak: Hash: 293660bf6d6f724829448b97eb04abc6146a65b37d0b957983f69df952413a61
      Time: Wed Sep 28 2022 00:02:39 HKT                  Height:         10

Estimated network space: 15.384 MiB
Current difficulty: 1024
Current VDF sub_slot_iters: 1024
Total iterations since the start of the blockchain: 36460

  Height: |   Hash:
       10 | 293660bf6d6f724829448b97eb04abc6146a65b37d0b957983f69df952413a61
        9 | e564309d7a4ad72bdf8f0dce838f5d91108ed49dddf88027aca9d8888ab86436
        8 | a24f84ac2ccf11d43af21e2b416b92230b4f7b7db052db9a7ca9dc6ee2a9fb43
        7 | f615455590b922362d2558e32141190ef474d60cc2a6d8f1acdeae899d798349
        6 | 8b44d5a7e664ccbf92d34538e5f18f84c6f361871a12e797c9ce567c111ef97f
        5 | 4e79d87856af757835bf3fa083965b57c0bcadbb00ded733ca8a4451a615a3d6
        4 | 7e3421e5448f58f2aab693aaeb506c953145d46cb9d58547a2bf53b0e35ac584
        3 | 4c7e1e15646fa05e0d920d6b06b5574b3214568a84fb171a9dcdfe657990433a
        2 | bbb21b5a1ec18739fabcf231d15c51eb0b73900c178e4cfa329dadbef9d7a492
        1 | 2a7df0f20b654d66fa4f77a54060855b5a9532f79b36d12bfd175831a321e6ba

Current Farming address: txch1t7e7pnxzxas207gh4q08sukvjg0emk7gvkpdld8kfmhxd7k4uaqq9x4yd2, with a balance of: 21000016.0 TXCH.
```

</details>

<details>
<summary>Example 3</summary>

Show all coins, including reward coins:

```bash
chia dev sim status -c -i
```

Response:

```bash
Network: simulator0    Port: 48593   RPC Port: 18406
Node ID: 6ca9a8ebe8ed4b2cba673666a29a75d18b3c358fee6e29153cde55ee33320261
Genesis Challenge: eb8c4d20b322be8d9fddbf9412016bdffe9a2901d7edb0e364e94266d0e095f7
Current Blockchain Status: Full Node Synced

Peak: Hash: 293660bf6d6f724829448b97eb04abc6146a65b37d0b957983f69df952413a61
      Time: Wed Sep 28 2022 00:02:39 HKT                  Height:         10

Estimated network space: 15.384 MiB
Current difficulty: 1024
Current VDF sub_slot_iters: 1024
Total iterations since the start of the blockchain: 36460

  Height: |   Hash:
       10 | 293660bf6d6f724829448b97eb04abc6146a65b37d0b957983f69df952413a61
        9 | e564309d7a4ad72bdf8f0dce838f5d91108ed49dddf88027aca9d8888ab86436
        8 | a24f84ac2ccf11d43af21e2b416b92230b4f7b7db052db9a7ca9dc6ee2a9fb43
        7 | f615455590b922362d2558e32141190ef474d60cc2a6d8f1acdeae899d798349
        6 | 8b44d5a7e664ccbf92d34538e5f18f84c6f361871a12e797c9ce567c111ef97f
        5 | 4e79d87856af757835bf3fa083965b57c0bcadbb00ded733ca8a4451a615a3d6
        4 | 7e3421e5448f58f2aab693aaeb506c953145d46cb9d58547a2bf53b0e35ac584
        3 | 4c7e1e15646fa05e0d920d6b06b5574b3214568a84fb171a9dcdfe657990433a
        2 | bbb21b5a1ec18739fabcf231d15c51eb0b73900c178e4cfa329dadbef9d7a492
        1 | 2a7df0f20b654d66fa4f77a54060855b5a9532f79b36d12bfd175831a321e6ba

Current Farming address: txch1t7e7pnxzxas207gh4q08sukvjg0emk7gvkpdld8kfmhxd7k4uaqq9x4yd2, with a balance of: 21000016.0 TXCH.
All Coins:
Coin 0x32ee11f63aca323db7e2bdfd71b29968d2605dbefcf2d5aea69b4acb278a6c56
Wallet Address: txch1t7e7pnxzxas207gh4q08sukvjg0emk7gvkpdld8kfmhxd7k4uaqq9x4yd2
Confirmed at block: 9
Spent: No
Coin Amount: 1750000000000 mojo
Parent Coin ID: 0xeb8c4d20b322be8d9fddbf9412016bdf00000000000000000000000000000007
Created at: 2022-09-28 00:00:45

Coin 0x9d69c01f1d52a3d2f48553aa14f8c86661a31853f5ac9badcfa8ec4ef86d1eae
Wallet Address: txch1t7e7pnxzxas207gh4q08sukvjg0emk7gvkpdld8kfmhxd7k4uaqq9x4yd2
Confirmed at block: 5
Spent: No
Coin Amount: 250000000000 mojo
Parent Coin ID: 0xfe9a2901d7edb0e364e94266d0e095f700000000000000000000000000000004
Created at: 2022-09-27 23:50:07

...
...
```

</details>

<details>
<summary>Example 4</summary>

Show the balance of each address:

```bash
chia dev sim status -a
```

Response:

```bash
Network: simulator0    Port: 48593   RPC Port: 18406
Node ID: 6ca9a8ebe8ed4b2cba673666a29a75d18b3c358fee6e29153cde55ee33320261
Genesis Challenge: eb8c4d20b322be8d9fddbf9412016bdffe9a2901d7edb0e364e94266d0e095f7
Current Blockchain Status: Full Node Synced

Peak: Hash: 293660bf6d6f724829448b97eb04abc6146a65b37d0b957983f69df952413a61
      Time: Wed Sep 28 2022 00:02:39 HKT                  Height:         10

Estimated network space: 15.384 MiB
Current difficulty: 1024
Current VDF sub_slot_iters: 1024
Total iterations since the start of the blockchain: 36460

  Height: |   Hash:
       10 | 293660bf6d6f724829448b97eb04abc6146a65b37d0b957983f69df952413a61
        9 | e564309d7a4ad72bdf8f0dce838f5d91108ed49dddf88027aca9d8888ab86436
        8 | a24f84ac2ccf11d43af21e2b416b92230b4f7b7db052db9a7ca9dc6ee2a9fb43
        7 | f615455590b922362d2558e32141190ef474d60cc2a6d8f1acdeae899d798349
        6 | 8b44d5a7e664ccbf92d34538e5f18f84c6f361871a12e797c9ce567c111ef97f
        5 | 4e79d87856af757835bf3fa083965b57c0bcadbb00ded733ca8a4451a615a3d6
        4 | 7e3421e5448f58f2aab693aaeb506c953145d46cb9d58547a2bf53b0e35ac584
        3 | 4c7e1e15646fa05e0d920d6b06b5574b3214568a84fb171a9dcdfe657990433a
        2 | bbb21b5a1ec18739fabcf231d15c51eb0b73900c178e4cfa329dadbef9d7a492
        1 | 2a7df0f20b654d66fa4f77a54060855b5a9532f79b36d12bfd175831a321e6ba

Current Farming address: txch1t7e7pnxzxas207gh4q08sukvjg0emk7gvkpdld8kfmhxd7k4uaqq9x4yd2, with a balance of: 21000016.0 TXCH.
All Addresses:
Address: txch1qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqm6ksh7qddh has a balance of: 2000000000000 mojo, with a total of: 2 transactions.

Address: txch1t7e7pnxzxas207gh4q08sukvjg0emk7gvkpdld8kfmhxd7k4uaqq9x4yd2 has a balance of: 21000016000000000000 mojo, with a total of: 18 transactions.
```

</details>

---

### `stop`

Functionality:

Usage: `chia dev sim stop [OPTIONS]`

Options: Stop running services

| Short Command | Long Command | Type | Required | Description                                   |
| :------------ | :----------- | :--- | :------- | :-------------------------------------------- |
| -d            | --daemon     | None | False    | Enable to stop the daemon (Default: disabled) |
| -w            | --wallet     | None | False    | Enable to stop the wallet (Default: disabled) |
| -h            | --help       | None | False    | Show a help message and exit                  |

<details>
<summary>Example 1</summary>

Stop the simulator with the default values:

```bash
chia dev sim stop
```

Response:

```
chia_full_node_simulator: Stopped
```

Use `ps` to show Chia's status:

```bash
ps | grep chia
```

The response shows that the daemon and wallet are still running:

```bash
   2343 pts/0    00:00:01 chia_daemon
  23422 pts/0    00:00:05 chia_wallet
```

</details>

<details>
<summary>Example 2</summary>

Stop the simulator, daemon, and wallet:

```bash
chia dev sim stop -d -w
```

Response:

```bash
chia_wallet: Stopped
chia_full_node_simulator: Stopped
Daemon stopped
```

</details>

---
