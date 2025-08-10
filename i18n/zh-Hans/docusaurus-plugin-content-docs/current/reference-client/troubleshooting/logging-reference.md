---
title: Logging Reference
slug: /reference-client/troubleshooting/logging-reference
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Chia blockchain nodes consist of several components that each handle different aspects of farming, harvesting, the wallet and general management of a node. Each component creates entries in a single log file `debug.log`.

## Log file Location:

| OS      | Location                                                                            |
| ------- | ----------------------------------------------------------------------------------- |
| Linux   | `~/.chia/mainnet/log/debug.log`                                                     |
| Windows | `$env:USERPROFILE\.chia\mainnet\log\debug.log`                                  |
| Windows | `C:\Users\<username>\.chia\mainnet\log\debug.log`                             |
| MacOS   | `$HOME/.chia/mainnet/log/debug.log` (`/Users/<username>/.chia…`) |

## Log File Management:

By default, the Chia `debug.log` grows to what is set in `config.yaml` (log_maxbytesrotation: 52428800), then rotates the file by closing `debug.log`, renaming it to `debug.log.1`, and renames any existing older log files to `debug.log.x`, to a maximum of 7 old log files (log_maxfilesrotation: 7). If a log rotation is required and all 7 old log files exist, the oldest log file is overwritten with the next earliest file; resulting in roughly 420MB of the most recent log messages being stored.

## Log Detail Level:

Chia is shipped with the `debug.log` set to record messages at the `ERROR` and `WARN` levels. Many of the messages needed to fully monitor a node are only visible at the `INFO` level. Changes to the logging level can be done in the `config.yaml` file located in the `/.chia/mainnet/config` folder.

| Log Level | Messages Logged          |
| --------- | ------------------------ |
| ERROR     | ERROR                    |
| WARN      | ERROR, WARN              |
| INFO      | ERROR, WARN, INFO        |
| DEBUG     | ERROR, WARN, INFO, DEBUG |

## Change the Log Level Output:

When editing files you should use a plain text editor with word wrap disabled to preserve the yaml format.

You are looking for the first reference to logging in the `config.yaml` file that looks like this (older files may be missing some lines):

```
  logging: &id001
    log_backcompat: false
    log_filename: log/debug.log
    log_level: WARN
    log_maxbytesrotation: 52428800
    log_maxfilesrotation: 7
    log_stdout: false
    log_syslog: false
    log_syslog_host: localhost
    log_syslog_port: 514
    log_use_gzip: false
```

Change the `log_level` from `WARN` to `INFO`, save the file, and restart the node.

Your options for log levels are `ERROR`, `WARN`, `INFO`, and `DEBUG`.

## Node Components:

| Component                                                  | Function                                        |
| ---------------------------------------------------------- | ----------------------------------------------- |
| farmer_server                         | Signage stuff about signs and things            |
| harvester_server                      | Gathers and shares plot information             |
| timelord_server                       | Manages Verifiable Delay Functions for the node |
| wallet_server                         | Controls wallet functions                       |
| full_node_server | This component manages the node                 |

## Log Message Format:

| Field             | 内容                               |
| ----------------- | -------------------------------- |
| Date/time         | in ISO format, in local timezone |
| Node Component    | see the list above               |
| Log Level         | ERROR, WARN, INFO                |
| Directional Arrow |                                  |
| Message           | see below                        |

## Log Messages Confirming Node Health:

```
09:55:43.847 harvester src.harvester.harvester : INFO     1 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.13772 s. Total 100 plots
09:55:52.737 harvester src.harvester.harvester : INFO     3 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.43679 s. Total 100 plots
09:56:01.646 harvester src.harvester.harvester : INFO     2 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.14055 s. Total 100 plots
```

`x plots were eligible for farming` – This message from the harvester shows how the node responds to challenges. The `x` value shows how many plots passed the initial filter, [more on filters here](/chia-blockchain/resources/faq#what-is-the-plot-filter-and-why-didnt-my-plot-pass-it).

- The block prefix is shown, and the `Found y proofs.` The `y` value shows how many plots were accepted as proofs, and usually the value is zero. Most of the time if there is a proof you win, but not always as described in the [FAQ page](/chia-blockchain/resources/faq#is-it-possible-to-have-a-proof-but-not-get-a-reward).
- Next is `Time: x.xxx s` which shows how long the node took to respond to the challenge. A recommended response time is less than 5 seconds. If this value is greater than 3 seconds a warning will be displayed in the GUI.
- Finally `Total x plots` shows the number of plots recognized by the node. If this doesn't look right [check your plots are valid](/chia-blockchain/resources/faq#how-do-i-know-if-my-plots-are-ok).

Another log message you will see is `Updated Wallet peak to height x, weight y` - This message is from the `wallet_blockchain` component. Value `x` is the current height of the blockchain and should match the Height shown in the `chia show -s` command. This indicates that the node wallet is fully synced with the network. If that is not the case [check here for a common solution](/chia-blockchain/resources/faq#why-is-my-wallet-not-synced-why-can-i-not-connect-to-wallet-from-the-gui).

## Other Normal Log Messages:

| Component                                                  | Message                                                                                                                                                                                     | Direction | Destination | Cross component                           |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ----------- | ----------------------------------------- |
| mempool_manager                       | add_spendbundle took x seconds                                                                                                                                         |           |             |                                           |
| mempool_manager                       | It took x to pre validate transaction                                                                                                                                                       |           |             |                                           |
| full_node                             | Added unfinished_block x, not farmed by us                                                                                                                             |           |             |                                           |
| full_node                             | Already compactified block:                                                                                                                                                 |           |             |                                           |
| full_node                             | Duplicate compact proof. Height: x                                                                                                                          |           |             |                                           |
| full_node                             | Finished signage point x/64:                                                                                                                                                |           |             |                                           |
| full_node                             | Scanning the blockchain for uncompact blocks.                                                                                                                               |           |             |                                           |
| full_node                             | Updated peak to height x                                                                                                                                                                    |           |             |                                           |
| full_node_server | new_compact_vdf                                                                                                                                   | to/from   | peer        |                                           |
| full_node_server | new_peak                                                                                                                                                               | to/from   | peer        |                                           |
| full_node_server | new_peak_timelord                                                                                                                                 | to        | localhost   | from timelord_server |
| full_node_server | new_peak_wallet                                                                                                                                   | to        | localhost   | from wallet_server   |
| full_node_server | new_signage_point                                                                                                                                 | to        | localhost   | from farmer_server   |
| full_node_server | new_signage_point_or_end_of_sub_slot     | to/from   | peer        |                                           |
| full_node_server | new_transaction                                                                                                                                                        | to/from   | peer        |                                           |
| full_node_server | new_unfinished_block                                                                                                                              | to/from   | peer        |                                           |
| full_node_server | new_unfinished_block_timelord                                                                                                | to/from   | localhost   |                                           |
| full_node_server | request_block                                                                                                                                                          | to/from   | peer        |                                           |
| full_node_server | request_block_header                                                                                                                              | from      | localhost   | to wallet_server     |
| full_node_server | request_compact_vdf                                                                                                                               | to/from   | peer        |                                           |
| full_node_server | request_compact_proof_of_time                                                                           | to        | localhost   | from timelord_server |
| full_node_server | request_signage_point_or_end_of_sub_slot | to/from   | peer        |                                           |
| full_node_server | request_transaction                                                                                                                                                    | to/from   | peer        |                                           |
| full_node_server | request_unfinished_block                                                                                                                          | to/from   | peer        |                                           |
| full_node_server | respond_block                                                                                                                                                          | to/from   | peer        |                                           |
| full_node_server | respond_compact_vdf                                                                                                                               | to/from   | peer        |                                           |
| full_node_server | respond_signage_point                                                                                                                             | to/from   | peer        |                                           |
| full_node_server | respond_transaction                                                                                                                                                    | to/from   | peer        |                                           |
| full_node_server | respond_unfinished_block                                                                                                                          | to/from   | peer        |                                           |
| wallet_server                         | request_block_header                                                                                                                              | to        | localhost   | from full_node       |
| wallet_server                         | respond_block_header                                                                                                                              | from      | localhost   | to full_node         |
| wallet_server                         | new_peak_wallet                                                                                                                                   | from      | localhost   | to full_node         |
| wallet_blockchain                     | Updated Wallet peak to height x, weight y                                                                                                                                                   |           |             |                                           |
| timelord_server                       | new_peak_timelord                                                                                                                                 | from      | localhost   | to full_node         |
| timelord_server                       | new_unfinished_block_timelord                                                                                                | from      | localhost   | to full_node         |
| timelord_launcher                     | VDF client x: VDF Client: Discriminant =                                                                                                                    |           |             |                                           |
| VDF Client                                                 | Sending Proof, Sent Proof, Stopped everything!                                                                                                                                              |           |             |                                           |
| harvester_server                      | farming_info                                                                                                                                                           | to/from   | localhost   |                                           |
| harvester_server                      | new_signage_point_harvester                                                                                                  | from      | localhost   | to farmer_server     |
| harvester                                                  | x plots were eligible for farming                                                                                                                                                           |           |             |                                           |
| plot_tools                            | Loaded a total of x plots of size y in z seconds                                                                                                                                            |           |             |                                           |
| plot_tools                            | Searching directories                                                                                                                                                                       |           |             |                                           |
| farmer_server                         | new_signage_point                                                                                                                                 | from      | localhost   | to full_node         |
| farmer_server                         | farming_info                                                                                                                                                           | from      | localhost   | to full_node         |
| farmer_server                         | new_signage_point_harvester                                                                                                  | to        | localhost   | from harvester                            |

| Source                                                                                                                           | Level   | Message                                                                                                                                                                                                                                  | Description                                                                                                                                                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| daemon asyncio                                                                                                                   | ERROR   | Task exception was never retrieved future: `<Task finished coro=<WebSocketServer.statechanged() done, defined at src\daemon\server.py:316> exception=ValueError('list.remove(x): x not in list')>`                     |                                                                                                                                                                                                                                                      |
| full_node asyncio                                                                                           | ERROR   | SSL error in data received protocol: `<asyncio.sslproto.SSLProtocol object at 0x7f762544a8>`                                                                                                                             |                                                                                                                                                                                                                                                      |
| full_node full_node_server                                        | ERROR   | Exception: Failed to fetch block `N` from \{'host': `IP ADDRESS`, 'port': 8444\}, timed out, \{'host': `IP ADDRESS`, 'port': 8444\}. | Peer disconnected, other peer connections will take over                                                                                                                                                                                             |
| full_node full_node_server                                        | ERROR   | Exception: `<class 'concurrent.futures._base.CancelledError'>`, closing connection None.                                                                                                                 | Peer disconnected                                                                                                                                                                                                                                    |
| full_node full_node_server                                        | WARNING | [Errno 32] Broken pipe `IP Address`                                                                                                                                                  | Peer disconnected                                                                                                                                                                                                                                    |
| full_node full_node_server                                        | WARNING | Cannot write to closing transport `IP Address`                                                                                                                                                                                           | Peer disconnected                                                                                                                                                                                                                                    |
| harvester src.plotting.plot_tools                                           | WARNING | Not farming plot `plotfilename`. Size is `filesize` GiB, but expected at least: 99.06 GiB. We assume the file is being copied.                           | Periodic scan for new plots have discovered partial file - OK if you are in the middle of copying a file                                                                                                                                             |
| harvester src.plotting.plot_tools                                           | WARNING | Directory: `Dir1` does not exist.                                                                                                                                                                        | One of your monitored plot folders is no longer accessible - eg external drive offline - if permanent remove from GUI or `chia plots remove -d <Dir1>`                                                                                               |
| harvester src.plotting.plot_tools                                           | WARNING | Have multiple copies of the plot `plotfilename`, not adding it.                                                                                                                                                          |                                                                                                                                                                                                                                                      |
| harvester src.plotting.plot_tools                                           | INFO    | Not checking subdirectory `Dir1/directory`, subdirectories not added by default                                                                                                                                                          |                                                                                                                                                                                                                                                      |
| full_node full_node_server                                        | INFO    | Connection closed: `IP Address`, node id: `hex`                                                                                                                                                          | Peer disconnected                                                                                                                                                                                                                                    |
| full_node src.full_node.full_node | INFO    | ⏲️ Finished signage point `N`/64: `hex`                                                                                                                                                                                  |                                                                                                                                                                                                                                                      |
| full_node src.full_node.full_node | INFO    | Added unfinished_block `hex`, not farmed                                                                                                                                                                            |                                                                                                                                                                                                                                                      |
| harvester src.plotting.plot_tools                                           | INFO    | Searching directories [`Dir1`,`Dir2`]                                                                                                                                                |                                                                                                                                                                                                                                                      |
| harvester src.plotting.plot_tools                                           | INFO    | Loaded a total of `N` plots of size `size` TiB, in `time` seconds                                                                                                                                                                        |                                                                                                                                                                                                                                                      |
| harvester src.harvester.harvester                                                                | INFO    | `X` plots were eligible for farming `hex`... Found `Y` proofs. Time: `Time` s. Total `Z` plots                                           | This is a vital message and should be seen at regular intervals. Note that `Time` is ideally < 1s. If drive is in sleep mode, may show ~10 seconds, and should be prevented |
| wallet src.wallet.wallet_blockchain                                         | INFO    | 💰 Updated wallet peak to height `HEIGHT`, weight `WEIGHT`,                                                                                                                                                                              |                                                                                                                                                                                                                                                      |

## Log Search Commands

<Tabs
defaultValue="linux-macos"
groupId="source"
values={[
{label: 'Linux/MacOS', value: 'linux-macos'},
{label: 'Windows', value: 'windows'},
]}> <TabItem value="linux-macos">

### search linux or mac logs

:::info
The below strings are an example of what can be used to search for specific log lines but they are not all-inclusive.\
You can also use strings from any other log lines in the below command to search for other lines, just make sure you have the correct log level setting for the line that is being searched.
:::

Functionality: Output log lines that contain the string in terminal

Usage: `find "$HOME/.chia/mainnet/log" -type f -exec grep -Hn "[STRING]" {} \;`

Options:

| String          | Minimum Required Log Level | Description                                          |
| --------------- | -------------------------- | ---------------------------------------------------- |
| `ing service`   | INFO                       | Outputs all starting and stopping services log lines |
| `: ERROR`       | ERROR                      | Outputs all error log lines                          |
| `: WARNING`     | WARNING                    | Outputs all warning log lines                        |
| `proofs. Time:` | INFO                       | Outputs all proof check log lines                    |

<details><summary>Example</summary>

Request:

```bash
find "$HOME/.chia/mainnet/log" -type f -exec grep -Hn "ing service" {} \;
```

Response:

:::info
The below output contains the `[file_path]:[log_line]:[timestamp] [service] [service] : [log_level] [log_information]`.

The chia client automatically rotates log files so pay close attention to the file name at the end of the file path if you want to open the file and look for the logs.
:::

```
/Users/[username]/.chia/mainnet/log/debug.log:41432:2024-07-26T10:03:21.794 wallet wallet                     : INFO     Starting service wallet ...
/Users/[username]/.chia/mainnet/log/debug.log:41437:2024-07-26T10:06:21.177 wallet wallet                     : INFO     Stopping service wallet at port None ...
```

</details>

---

  </TabItem>
  <TabItem value="windows">

### search windows logs

:::info
The below strings are an example of what can be used to search for specific log lines but they are not all-inclusive.\
You can also use strings from any other log lines in the below command to search for other lines, just make sure you have the correct log level setting for the line that is being searched.
:::

Functionality: Output log lines that contain the string in powershell

Usage: `Get-ChildItem -Path $env:USERPROFILE\.chia\mainnet\log\ -recurse |  Select-String -Pattern "[STRING]"`

Options:

| String          | Minimum Required Log Level | Description                                          |
| --------------- | -------------------------- | ---------------------------------------------------- |
| `ing service`   | INFO                       | Outputs all starting and stopping services log lines |
| `: ERROR`       | ERROR                      | Outputs all error log lines                          |
| `: WARNING`     | WARNING                    | Outputs all warning log lines                        |
| `proofs. Time:` | INFO                       | Outputs all proof check log lines                    |

<details><summary>Example</summary>

Request:

```bash
Get-ChildItem -Path $env:USERPROFILE\.chia\mainnet\log\ -recurse |  Select-String -Pattern "ing service"
```

Response:

:::info
The below output contains the `[file_path]:[log_line]:[timestamp] [service] [service] : [log_level] [log_information]`.

The chia client automatically rotates log files so pay close attention to the file name at the end of the file path if you want to open the file and look for the logs.
:::

```
C:\Users\[USERNAME]\.chia\mainnet
.chia\mainnet\log\debug.log:21:2024-07-26T10:03:21.794 wallet wallet                     : INFO     Starting service wallet ...
.chia\mainnet\log\debug.log:10042:2024-07-26T10:06:21.177 wallet wallet                     : INFO     Stopping service wallet at port None ...
```

</details>

---

  </TabItem>
</Tabs>
