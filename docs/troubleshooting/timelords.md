---
title: Troubleshooting Timelords
slug: /troubleshooting/timelords
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Checking Timelord Logs

:::info
Make sure to set your logs to INFO for the below commands to work.
To do so run: `chia configure --log-level INFO`
:::

The below commands are for use with linux OS.  
The `tail` command only pulls new information as it is added to the log files showing new information as it is added.  
The `cat` command pulls all current data from the log files providing a snapshot of where it was and is currently.

:::note
The matched strings are missing the first letter (E or S) intentionally.  
This is due to the two instances of each log, for example the log where others create the proof of time has the string "Not skipping" while the log where your machine creates the PoT has the string "Skipping".
:::

**Continuous:**  
`tail -F ~/.chia/mainnet/log/debug.log | grep "stimated"` : running output of the current estimated IPS as seen by the network (note this will be lower than the IPS reported by the ASIC software).  
`tail -F ~/.chia/mainnet/log/debug.log | grep "kipping"` : running output of peak heights being added to the node. If a height is skipped than very likely your timelord created the PoT, if the height is not skipped then a different timelord created the PoT.

**Static:**  
`cat ~/.chia/mainnet/log/debug.log | grep "stimated"` : static output of the current estimated IPS as seen by the network (note this will be lower than the IPS reported by the ASIC software).  
`cat ~/.chia/mainnet/log/debug.log | grep "kipping"` : statis output of peak heights added to the node. If a height is skipped than very likely your timelord created the PoT, if the height is not skipped then a different timelord created the PoT.

:::note
If you have set up the timelord services to run through systemD you can use the below command(s) for pulling those records.
:::

**If running as a service:**  
`journalctl -f -u chia-hw-vdf | grep "MHz"` : output of the ASIC timelord reported IPS (this will be higher than the estimated IPS as seen by the network). If not using systemD this information is available in the the terminal output where the `hw_vdf_client` command was run.

## Common Timelord Error Logs

### Chia logs

```
timelord chia.timelord.timelord   : ERROR    Error while handling message: Traceback (most recent call last):
  File "chia/timelord/timelord.py", line 893, in _manage_chains
  File "chia/timelord/timelord.py", line 440, in _submit_iterations
  File "asyncio/streams.py", line 359, in drain
  File "chia/timelord/timelord.py", line 221, in _stop_chain
```

This error occurs when the ASIC software has been shutdown unexpectedly and will start spamming your log file.  
The current resolution is to restart the chia processes with something like `chia start full_node timelord-only -r`.

### ASIC logs

`Warning: too much work for VDF aux threads` - This generally means that the frequency is set too high, it is recommended to use the auto-frequency flag for the software to self adjust and resolve this error `--auto-freq 60` updates the frequency every 60 seconds.  
`Bad data size after stop: -1` - This is a known logging error related to how the chia client and ASIC disconnect after a stop. There is no concern with having this error in your logs.

---

## Timelord support

Join Our [Discord](https://discord.gg/chia) and jump into the #support channel for support

---
