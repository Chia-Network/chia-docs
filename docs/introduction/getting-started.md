---
title: Getting Started
slug: /
---

## What is Chia?

Or, jump to [installation](#Install).

Chia is a cryptocurrency and blockchain smart transaction platform. Chia was designed from the ground up to make cryptocurrency easier to use -- and harder to lose -- than cash. The PoST consensus has a much [lower energy consumption](https://chiapower.org "Chia's energy consumption statistics") compared to Proof of Work (PoW), and part of Chia's vision involves improving the carbon footprint of the blockchain industry.

On August 1, 2017, [Bram Cohen](https://www.chia.net/profiles/bram-cohen "Bram Cohen's Chia profile") founded the Chia company and incorporated it in the state of Delaware. Bram led the development of Chia, along with many engineers, researchers, and open source contributors. Along the way, Chia created three new inventions in applied cryptography, and advanced the interest and adoption in a fourth:

- The first production use of [BLS Signatures](https://github.com/Chia-Network/bls-signatures "Chia's BLS Signatures on GitHub").
- The first production use of a [Verifiable Delay Function (VDF)](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub").
- [Proofs of Space](https://github.com/Chia-Network/chiapos "Chia's Proof of Space repository on GitHub") and [Time](https://github.com/Chia-Network/chiavdf "Chia's VDF on GitHub") (PoST), the first (and only) Nakamoto consensus since Proof of Work.
- The first production use of [class groups of unknown order](https://github.com/Chia-Network/vdf-competition/blob/main/classgroups.pdf 'Binary quadratic forms white paper, by Lipa Long').

Chia's mainnet was launched on March 19, 2021. Development of its ecosystem is ongoing.

For more information on the company's strategies, see [Chia's business white paper](https://www.chia.net/whitepaper "Chia's business white paper").

### Smart transactions

Chia has a new smart transaction model, which uses a powerful (yet simple) higher-level language called [chialisp](https://chialisp.com 'Chialisp.com'), and an accompanying lower-level language called CLVM (ChiaLisp Virtual Machine).

Chia uses the coin set model (similar to Bitcoin's UTXO) to track the blockchain's state. The simple nature of this model facilitates the writing of high value and secure contracts. Unlike in systems that use the account model such as Ethereum, the code that creates Chia's coins is strongly sandboxed. This increases security, reduces Maximum Extractable Value (MEV), and makes the code fully auditable.

> For more info, see [chialisp.com](https://chialisp.com/ 'Chialisp.com').

### Decentralized

Chia uses a consensus algorithm called [Proofs of Space and Time](https://www.chia.net/assets/ChiaGreenPaper.pdf "Chia's Green Paper"). This algorithm allows anyone with an internet connection and some free disk space to participate in securing the network. Because of this process of farming (analogous to mining), Chia has become the most decentralized blockchain on the planet, with hundreds of thousands of full nodes securing the system.

### Improved Pooling

Like many other blockchains, Chia allows pooling to smooth out the rewards structure for smaller farmers. However, Chia's pooling protocol has three unique features:

- Farmers create new blocks, whether they're farming solo or as a member of a pool.

This design decision was made in conjunction with Chia's goal of decentralization. In other blockchains such as Bitcoin, four or five pools control over 51% of the global hashrate on any given day. (Sources: [blockchain.com](https://www.blockchain.com/pools "blockchain.com pie chart of Bitcoin's hashrate distribution"), [blockchair.com](https://blockchair.com/bitcoin/charts/hashrate-distribution "blockchair.com pie chart of Bitcoin's hashrate distribution")) Arguably, the easiest way to attack Bitcoin would be to bribe each of these pools' operators.

In Chia, the pool operators are only responsible for distributing rewards. They cannot modify the blockchain. Therefore, Chia's pooling protocol doesn't lead to increased centralization.

- Joining a pool is permissionless. Farmers don't need to sign up for anything in order to join.

- When a block is won, the farmer gets 1/8 of the rewards, and the pool operator gets the other 7/8. This was done to discourage pool operators from harming their competition by farming on a competing pool and neglecting to create a block when they find a proof. (Solo farmers collect the entire reward when they create a block.)

> For more info on Chia's pooling protocol, see [Section 11](/docs/pooling/pooling 'Section 11: Pooling').

## Install Chia {#install-chia}

The easiest way to install Chia is to use an installer. Here is the installer for [Windows](https://download.chia.net/latest/Setup-Win64.exe) and the installer for [Mac](https://download.chia.net/latest/Setup-MacOS.dmg).

For more detailed steps you can follow [these install instructions](/docs/chia-installation-guide) according to your operating system. This software only supports 64 bit operating systems.

All configuration data is stored in a directory structure at the `$CHIA_ROOT` environment variable or at `~/.chia/mainnet/`. You can find databases, and logs there. Optionally, you can set `$CHIA_ROOT` to the `.chia` directory in your home directory with `export CHIA_ROOT=~/.chia` and if you add it to your `.bashrc` or `.zshrc` it will remain set across logouts and reboots. If you set `$CHIA_ROOT` you will have to migrate configuration items by hand or unset the variable for `chia init` to work with `unset CHIA_ROOT`.

If you are using the MacOS or Windows builds, your keys are created during the first run. We recommend writing down the mnemonic (24 ordered words). You can start plotting a plot file using the Plot tab or the command line. This can take a long time depending on the [size of the plots](https://github.com/Chia-Network/chia-blockchain/wiki/k-sizes)
(the k variable). To be competitive on mainnet you will need many k=32 or larger plots. A k=32 plot can take a while even with an [M.2 PCIe NVMe SSD](https://en.wikipedia.org/wiki/M.2) and requires 239 GiB of temporary working space to create a final plot file of 101.4 GiB. Your likelihood of winning a with a plot is only driven by the final size of the plot file.

The minimum plot size needed for farming is k=32.

If you want more peers and better network connectivity, you should also try opening port 8444 on your router so other peers can connect to you. Follow [these steps on port forwarding](https://bitcoin.org/en/full-node#port-forwarding) but using port 8444 instead of 8333. This helps the network be more decentralized. For further details about sync issues and port 8444, visit the [Resolving Sync Issues](https://github.com/Chia-Network/chia-blockchain/wiki/Resolving-Sync-Issues---Port-8444) page.

# Using the Command-line Interface (CLI)

Using the CLI with Chia gives you greater and more precise control. For a more details on the commands, read the [CLI Commands Reference](https://github.com/Chia-Network/chia-blockchain/wiki/CLI-Commands-Reference).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

```mdx-code-block
<Tabs>
  <TabItem value="MacOS / Linux" label="MacOS / Linux" default>

There are commands available in `/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon`.

Try `./chia -h` or `./chia plots -h` for example. You can view your debug.log as it runs in from the terminal with `tail -f ~/.chia/mainnet/log/debug.log`. Additionally, you can open the file with Console application.

A handy trick is to add that directory to your path - `export PATH=/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon:$PATH`. To make it persistent add the same line to your `.bashrc` or `.zshrc` inside of your user directory.

  </TabItem>
<TabItem value="Windows" label="Windows">

You can learn how to use the Graphical User Interface (GUI) in the [Beginners Guide](https://github.com/Chia-Network/chia-blockchain/wiki/Beginners-Guide).

You can start with the Command Line Interface (CLI) by checking the commands available in `~\AppData\Local\Chia-Blockchain\app-1.1.5\resources\app.asar.unpacked\daemon\`. Try `.\chia -h` or `.\chia plots -h` for example:

1. Open _PowerShell_

   On start menu type "powershell" and press the enter key.

2. Change Directory with `cd`

   On _PowerShell_ type `cd $env:localAPPDATA\Chia-Blockchain\app-1.1.5\resources\app.asar.unpacked\daemon\` and press the enter key.

3. Read Chia help

   On _PowerShell_ type `.\chia -h` and press the enter key.

For more information you can check these [Windows Tips & Tricks](https://github.com/Chia-Network/chia-blockchain/wiki/Windows-Tips-and-Tricks) and read more about commands in general in [CLI Commands Reference](https://github.com/Chia-Network/chia-blockchain/wiki/CLI-Commands-Reference).

You can view your logs by opening `\.chia\mainnet\log\debug.log` with a text editor like _Visual Studio Code_ or see it as it runs in _PowerShell_ by using Get-Content, `Get-Content ~\.chia\mainnet\log\debug.log -wait`.

  </TabItem>
  <TabItem value="Linux" label="Linux">

If you installed Chia with the Linux installer files, your chia executable should be in one of the following locations:

`/usr/lib/chia-blockchain/resources/app.asar.unpacked/daemon/chia`

`/lib/chia-blockchain/resources/app.asar.unpacked/daemon/chia`

If you installed from source (using git), just activate and run `chia` directly.

  </TabItem>
</Tabs>
```

## Development/source builds

If you've installed via the installers you can skip these steps.

Remember that once you complete your install you **must be in the [Python virtual environment](https://docs.python-guide.org/dev/virtualenvs/)** which you access from the chia-blockchain directory, or the Windows "Chia Blockchain" directory, or your home directory if you opted for a binary install. Enter the virtual environment with the command `. ./activate`. Both dots are critical and once executed correctly your cli prompt will look something like `(venv) username@machine:~$` with `(venv)` prepended.

Use `deactivate` should you want to exit the venv. If you're not a fan of dots, an equivalent alternative on most platforms is `source venv/bin/activate` and you'll see that method in places in this documentation.

### Migrate or set up configuration files

```bash
chia init
```

### Generate keys

Create some keys by running the following script if you don't already have keys:

```bash
chia keys generate
```

### Run a full node + farmer + harvester + wallet

To run a full node on port 8444, and connect to the mainnet, run the following command. Logs are usually at `~/.chia/mainnet/logs/debug.log` or `~\.chia\mainnet\logs\debug.log` on Windows

Headless:

```bash
chia start farmer
```

GUI:

```bash
sh install-gui.sh
cd chia-blockchain-gui
npm run electron &
```

Farmers are entities in the network who use their drive space to try to create
blocks (like Bitcoin's miners), and earn block rewards.

You can use the command line tools and change the working directories and output directory for plotting, with the `-t` (temp), `-2` (second temp), and `-d` (destination) arguments to the `chia plots create` command. `-n 2` will create two plots of type k=32 and take about 12 hours on NVMe drives in the example below.

```bash
chia plots create -k 32 -n 2
chia plots check -n 30
```

# Run a Timelord

:::info
If you want to run a Timelord on Linux, see [BUILD_TIMELORD.md](https://github.com/Chia-Network/chia-blockchain/blob/main/BUILD_TIMELORD.md). Information on blue boxes coming soon.
:::

Timelords execute sequential verifiable delay functions (proofs of time or VDFs), that get added to
blocks to make them valid. This requires fast CPUs and a few cores per VDF as well as completing the install steps above and running the following from the chia-blockchain directory:

```bash
. ./activate
sh install-timelord.sh
chia start timelord &
```

# Alternatively run the local simulation

You can instead run the simulation, which runs all servers and multiple full nodes, locally. Note the the simulation is local only and requires installation of timelords and VDFs. The introducer will only know the local IPs of the full nodes, so it cannot broadcast the correct IPs to external peers. This should work on MacOS and Linux.

```bash
chia start simulator
```

## Tips

Ubuntu 20.04 LTS or newer, Amazon Linux 2, and CentOS 7.7 or newer are the
easiest linux install environments.

UPnP is enabled by default to open port 8444 for incoming connections.
If this causes issues, you can disable it in `config.yaml`. Or you can run this command: `chia configure -upnp false`
Some routers may require port forwarding, or enabling UPnP
in the router's configuration.

# RPC Interface

The Node has an RPC interface with [documentation](https://github.com/Chia-Network/chia-blockchain/wiki/RPC-Interfaces).
