---
title: Timelords
slug: /timelords
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::warning
DO NOT overclock ASICs, overclocking diminishes the life of the ASIC!
:::

Detailed information regarding timelord architecture can be found [here](/timelord-architecture)

---

## Timelord Requirements and Dependencies
:::info
Due to restrictions on how [MSVC](https://en.wikipedia.org/wiki/Microsoft_Visual_C%2B%2B) handles 128 bit numbers and how Python relies upon MSVC, it is not possible to build and run Timelords of all types on Windows.
Running a timelord on a farming machine will reduce the efficiency of the farmer and the timelord, for this reason it is recommended to have a dedicated machine for running timelords.
:::

Requirements:
1. Software Timelord
   - With the release of ASIC timelords, software timelords will have a near impossible time competing. It is recommended to only run a software timelord for experimentation and learning purposes.
   - Dedicated host machine that is a modern gaming PC with minimum 8 cores and 8GB of RAM. 
2. Bluebox Timelord
   - Dedicated host machine that is a modern gaming PC with minimum 8 cores and 8GB of RAM. 
3. ASIC Timelord
   - The ASIC hardware
   - Dedicated host machine that is a modern gaming PC with minimum 8 cores and 8GB of RAM. 
   - Two USB-C cables (one for power and one for data). Preferably USB-C to USB-C but we have successfully tested USB-A to USB-C without too much performance loss.

Dependencies:
- linux OS, our testing has been with Ubuntu 22 and newer
- git (if installing from source)
- ca-certificates curl gnupg (if installing from APT or if running an ASIC - RECOMMENDED)

## Installing a Timelord
:::info
Timelords execute sequential verifiable delay functions (proofs of time or VDFs), that get added to blocks to make them valid. This requires fast CPUs and a few cores per VDF.
:::

<Tabs
defaultValue="sw-tl"
groupId="timelord"
values={[
{label: 'Software TL', value: 'sw-tl'},
{label: 'Bluebox TL', value: 'bb-tl'},
{label: 'Hardware (ASIC) TL', value: 'hw-tl'},
]}>
<TabItem value="sw-tl">
:::info
Use `chia-blockchain-cli` instead of `chia-blockchain` for CLI only version that does not have a GUI.
:::

```
# Install packages
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

# Add GPG key
curl -sL https://repo.chia.net/FD39E6D3.pubkey.asc | sudo gpg --dearmor -o /usr/share/keyrings/chia.gpg

# Set up repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/chia.gpg] https://repo.chia.net/debian/ stable main" | sudo tee /etc/apt/sources.list.d/chia.list > /dev/null
sudo apt-get update

# Install chia-blockchain
sudo apt-get install chia-blockchain

# Launch timelord
chia start full_node timelord &
```

  </TabItem>
  <TabItem value="bb-tl">

```
# Install packages
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

# Add GPG key
curl -sL https://repo.chia.net/FD39E6D3.pubkey.asc | sudo gpg --dearmor -o /usr/share/keyrings/chia.gpg

# Set up repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/chia.gpg] https://repo.chia.net/debian/ stable main" | sudo tee /etc/apt/sources.list.d/chia.list > /dev/null
sudo apt-get update

# Install chia-blockchain
sudo apt-get install chia-blockchain

# Bluebox timelord setup
For blueboc timelords you will need to make two changes to `~/.chia/mainnet/config.yaml`. 
- In the `timelord:` section, set `bluebox_mode:` to `True`. 
- In the `full_node:` section and set `send_uncompact_interval:` to something greater than 0. We recommend `300` seconds there so that your Bluebox has some time to prove through a lot of the un-compacted Proofs of Time before the node drops more into its lap. 

Note - The default settings may otherwise work but if the total effort is a little too much for whatever machine you are on you can also lower the `process_count:` from 3 to 2, or even 1, in the `timelord_launcher:` section. You know it is working if you see `VDF Client: Sent proof` in your logs at INFO level.

# Launch timelord
chia start full_node timelord &
```

  </TabItem>
  <TabItem value="hw-tl">

:::warning
DO NOT overclock ASICs, overclocking diminishes the life of the ASIC!
:::

```
# Install packages
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

# Add GPG key
curl -sL https://repo.chia.net/FD39E6D3.pubkey.asc | sudo gpg --dearmor -o /usr/share/keyrings/chia.gpg

# Set up repositories (first is for chia and second is for the hw vdf repo)
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/chia.gpg] https://repo.chia.net/debian/ stable main" | sudo tee /etc/apt/sources.list.d/chia.list > /dev/null
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/chia.gpg] https://repo.chia.net/chiavdf-hw/debian/ stable main" | sudo tee /etc/apt/sources.list.d/chiavdf-hw.list > /dev/null
sudo apt-get update

# Install chia-blockchain and ASIC repos
sudo apt-get install chia-blockchain
sudo apt-get install chiavdf-hw

# Launch the ASIC timelord services (if using a cluster verify the IP address is correct and launch with only 1 for each)
hw_vdf_client --ip 127.0.0.1 8000 3

# Launch timelord services in chia
chia start full_node timelord-only
```
  </TabItem>
</Tabs>


### Installing a Timelord from Source
:::info
On MacOS x86_64 and all Linux distributions, building a Timelord is as easy as running `chia start timelord &` in the virtual environment. You can also run `./vdf_bench square_asm 400000` once you've built Timelord to give you a sense of your optimal and unloaded ips. Each run of `vdf_bench` can be surprisingly variable and, in production, the actual ips you will obtain will usually be about 20% lower due to load of creating proofs. The default configuration for Timelords is good enough to just let you start it up. Set your log level to INFO and then grep for "Estimated IPS:" to get a sense of what actual ips your Timelord is achieving.
:::


```
# Download chia-blockchain
git clone https://github.com/Chia-Network/chia-blockchain -b latest --recurse-submodules

# Change directory
cd chia-blockchain

# Install dependencies
sh install.sh

# Activate virtual environment
. ./activate

# Initialize
chia init
. ./activate

# Install timelord
sh install-timelord.sh

# Start timelord
chia start full_node timelord

# Bluebox timelord setup
Once you build the Timelord with `sh install-timelord.sh` in the virtual environment, you will need to make two changes to `~/.chia/VERSION/config.yaml`. 
- In the `timelord:` section, set `bluebox_mode:` to `True`. 
- In the `full_node:` section and set `send_uncompact_interval:` to something greater than 0. We recommend `300` seconds there so that your Bluebox has some time to prove through a lot of the un-compacted Proofs of Time before the node drops more into its lap. 

Note - The default settings may otherwise work but if the total effort is a little too much for whatever machine you are on you can also lower the `process_count:` from 3 to 2, or even 1, in the `timelord_launcher:` section. You know it is working if you see `VDF Client: Sent proof` in your logs at INFO level.

# ASIC timelord setup: install the timelord repo, run the timelord-only chia service, and run the ASIC software
## Install packages
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

## Add GPG key
curl -sL https://repo.chia.net/FD39E6D3.pubkey.asc | sudo gpg --dearmor -o /usr/share/keyrings/chia.gpg

## Set up repositories (first is for chia and second is for the hw vdf repo)
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/chia.gpg] https://repo.chia.net/chiavdf-hw/debian/ stable main" | sudo tee /etc/apt/sources.list.d/chiavdf-hw.list > /dev/null
sudo apt-get update

## Install ASIC repo
sudo apt-get install chiavdf-hw

# Launch the ASIC timelord services (if using a cluster verify the IP address is correct and launch with only 1 for each)
hw_vdf_client --ip 127.0.0.1 8000 3

## Launch the timelord-only chia service
chia start full_node timelord-only

```

## Troubleshooting a Timelord
For troubleshooting steps please refer to the documentation [here](/troubleshooting/timelords).

---

## Timelord support

Join Our [Discord](https://discord.gg/chia) and jump into the #support channel for support

---

## Timelord FAQ
### What are the hardware requirements for running a Timelord?
There are no specific requirements as timelords are a fastest wins process. This means that those with higher end hardware are more likely to generate Proofs of Time than those with lower end hardware. 
Currently, a modern gaming PC with 8 cores and 8 GB of RAM is recommended.

### Can a Singe ASIC Compete with an ASIC Cluster?
The nature of timelords is to create three VDF chains, one can create the chains themselves in parallel (i.e. one on each ASIC) but one cannot break down the VDFs themselves to parallelize them.
This means that the ASIC cluster will always have an advantage but there are times when a single ASIC can reasonably compete. This almost always requires the block farming node to be closer in physical proximity to the single ASIC than to the ASIC cluster establishing a minor time advantage for the single ASIC

### Can I Overclock the ASIC to Get More Performance or Higher IPS?
While one can overclock the ASIC we very strongly recommend against doing such. Overclocking the ASICs will lead to diminishing longevity of the machine and only provides a minor increase in performance making it inefficient to overclock an ASIC.

---