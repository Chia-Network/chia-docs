---
title: Getting Started
slug: /getting-started
---

## Read the Beginners Guide First
This is a more intermediate guide. If you have not read the [Beginners Guide](https://github.com/Chia-Network/chia-blockchain/wiki/Beginners-Guide), do that first.

# Install
To install chia-blockchain, follow [these install instructions](https://github.com/Chia-Network/chia-blockchain/wiki/INSTALL) according to your operating system. This software only supports 64 bit operating systems.

All configuration data is stored in a directory structure at the $CHIA_ROOT environment variable or at ~/.chia/mainnet/. You can find databases, and logs there. Optionally, you can set $CHIA_ROOT to the .chia directory in your home directory with `export CHIA_ROOT=~/.chia` and if you add it to your .bashrc or .zshrc to it will remain set across logouts and reboots. If you set $CHIA_ROOT you will have to migrate configuration items by hand or unset the variable for `chia init` to work with `unset CHIA_ROOT`.

If you are using the MacOS or Windows builds, your keys are created during the first run. We recommend saving the mnemonic. You can start plotting a plot file using the Plot tab or the command line. This can take a long time depending on the [size of the plots](https://github.com/Chia-Network/chia-blockchain/wiki/k-sizes)
(the k variable). To be competitive on mainnet you will probably have to have a few k=32 or larger plots but a k=32 plot currently takes about 10 hours to plot on an [M.2 PCIe NVMe SSD](https://en.wikipedia.org/wiki/M.2) and requires 232 GiB of temporary working space to create a final plot file of 101.3 GiB. Your likelihood of winning a given plot is only driven by the final size of files.

The minimum plot size is k=32. Plots created with Beta 8 and newer version of the chia software will work on mainnet.

If you want more peers and better network connectivity, you should also try opening port 8444 on your router so other peers can connect to you. Follow [this](https://bitcoin.org/en/full-node#port-forwarding) guide but using port 8444 instead of 8333. This helps the network be more decentralized. For further details about sync issues and port 8444, visit the [Resolving Sync Issues](https://github.com/Chia-Network/chia-blockchain/wiki/Resolving-Sync-Issues---Port-8444) page.

# Using the Command-line Interface (CLI)

Using the CLI with Chia gives you greater and more precise control. For a more details on the commands, read the [CLI Commands Reference](https://github.com/Chia-Network/chia-blockchain/wiki/CLI-Commands-Reference).

## Windows

You can learn how to use the Graphical User Interface (GUI) in [Beginners Guide](https://github.com/Chia-Network/chia-blockchain/wiki/Beginners-Guide).

You can start with the Command Line Interface (CLI) by checking the commands available in `~\AppData\Local\Chia-Blockchain\app-1.1.5\resources\app.asar.unpacked\daemon\`. Try `.\chia -h` or `.\chia plots -h` for example:

1. Open *PowerShell* 

	On start menu type "powershell" and press the enter key.

2. Change Directory `cd` 

	On *PowerShell* type `cd $env:localAPPDATA\Chia-Blockchain\app-1.1.5\resources\app.asar.unpacked\daemon\` and press the enter key.

3. Read Chia help

	On *PowerShell* type `.\chia -h` and press the enter key.

For more information you can check these [Windows Tips & Tricks](https://github.com/Chia-Network/chia-blockchain/wiki/Windows-Tips-and-Tricks) and read more about commands in general in [CLI Commands Reference](https://github.com/Chia-Network/chia-blockchain/wiki/CLI-Commands-Reference).

You can view your logs by opening "\.chia\mainnet\log\debug.log" with a text editor like *notepad* or see it as it runs in *PowerShell* by using Get-Content, `Get-Content ~\.chia\mainnet\log\debug.log -wait`.

## MacOS
There are commands available in `/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon` Try `./chia -h` or `./chia plots -h` for example. You can view your debug.log as it runs in from Terminal, `tail -f ~/.chia/mainnet/log/debug.log`.

A handy trick is to add that directory to your path - `export PATH=/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon:$PATH`. To make it persistent add the same line to your .bashrc or .zshrc

## Linux
If you installed Chia with the Linux installer files, your chia executable should be in one of the following locations:

`/usr/lib/chia-blockchain/resources/app.asar.unpacked/daemon/chia`

`/lib/chia-blockchain/resources/app.asar.unpacked/daemon/chia`

If you installed from source (using git), just activate and run `chia` directly. 


## Development/source builds

If you've installed via the installers you can skip these steps.

Remember that once you complete your install you **must be in the [Python virtual environment](https://docs.python-guide.org/dev/virtualenvs/)** which you access from the chia-blockchain directory, or the Windows "Chia Blockchain" directory, or your home directory if you opted for a binary install. Enter the virtual environment with the command `.   ./activate`. Both dots are critical and once executed correctly your cli prompt will look something like `(venv) username@machine:~$` with ``(venv)`` prepended. 

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
To run a full node on port 8444, and connect to the mainnet, run the following command. Logs are usually at ~/.chia/mainnet/logs/debug.log or ~\.chia\mainnet\logs\debug.log on Windows

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

You can use the command line tools and change the working directories and output directory for plotting, with the "-t" (temp), "-2" (second temp), and "-d" (destination) arguments to the `chia plots create` command. `-n 2` will create two plots of type k=32 and take about 12 hours on NVMe drives in the example below.
```bash
chia plots create -k 32 -n 2
chia plots check -n 30
```

# Run a timelord

*Note*
If you want to run a Timelord on Linux, see [BUILD_TIMELORD.md](https://github.com/Chia-Network/chia-blockchain/blob/main/BUILD_TIMELORD.md). Information on blue boxes coming soon.

Timelords execute sequential verifiable delay functions (proofs of time or VDFs), that get added to
blocks to make them valid. This requires fast CPUs and a few cores per VDF as well as completing the install steps above and running the following from the chia-blockchain directory:
```bash
. ./activate
sh install-timelord.sh
chia start timelord &
```
# Alternatively run the local simulation
You can instead run the simulation, which runs all servers and multiple full nodes, locally. Note the the simulation is local only and requires installation of timelords and VDFs. The introducer will only know the local ips of the full nodes, so it cannot broadcast the correct ips to external peers. This should work on MacOS and Linux.

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

The Node has an RPC Interface with [documentation](https://github.com/Chia-Network/chia-blockchain/wiki/RPC-Interfaces).


# Install 

**Make sure you are downloading Chia software from the _chia.net_ domain. Do not use any other download source.**

Official installer links can be found on [chia.net/download](https://www.chia.net/download/) and this wiki page.

---
To install the chia-blockchain, follow the instructions according to your operating system.
After installing, follow the remaining instructions in the [Quick Start Guide](https://github.com/Chia-Network/chia-blockchain/wiki/Quick-Start-Guide) to run the software. You should read the [release notes](https://github.com/Chia-Network/chia-blockchain/releases) and the wiki/repository [FAQ](https://github.com/Chia-Network/chia-blockchain/wiki/FAQ).

| Jump to: | [Windows](https://github.com/Chia-Network/chia-blockchain/wiki/INSTALL#Windows) |[MacOS](https://github.com/Chia-Network/chia-blockchain/wiki/INSTALL#MacOS) | [Ubuntu](https://github.com/Chia-Network/chia-blockchain/wiki/INSTALL#ubuntudebian) | [CentOS / RHEL / Fedora](https://github.com/Chia-Network/chia-blockchain/wiki/INSTALL#centosred-hatfedora) | [WSL2](https://github.com/Chia-Network/chia-blockchain/wiki/INSTALL#WSL2) | [Amazon Linux 2](https://github.com/Chia-Network/chia-blockchain/wiki/INSTALL#amazon-linux-2) | [Other platforms](https://github.com/Chia-Network/chia-blockchain/wiki/INSTALL#other-install-methods-and-environments) |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: |

| [Install from source](https://github.com/Chia-Network/chia-blockchain/wiki/INSTALL#install-from-source) |[Update from source](https://github.com/Chia-Network/chia-blockchain/wiki/INSTALL#update-from-source)|
| :---: | :---: |

All keys and plots from version prior to Beta 8 (released July 16, 2020) are deprecated and can be deleted. Plots from both Beta 8 and newer should work on mainnet. 

## Minimum Specs
The minimum supported specs are that of the Raspberry Pi 4, 4GB model

* Quad core 1.5Ghz CPU (must be 64 bit)
* 4 GB Ram
* Starting with Chia version 1.3.5, Python 3.10 is supported. The minimum supported version is 3.7
* For Chia versions prior to 1.3.5, only Python 3.7, 3.8, and 3.9 are supported

## Drive format support

Chia plot files are at least 108GB in size (for K32). To plot successfully requires drives formatted to support large files; e.g. NTFS, APFS, exFAT, ext4, etc. Do not use drives with FAT formatting (FAT12, FAT16, or FAT32) or else plotting will fail. Future versions of Chia will check for unsupported drives, but for now it's up to each user to check their drive format.

## Sleep kills plots

The Chia plotting process may take many hours to complete. If the computer or hard drives go to sleep during the plotting process, the plotting fails and you will need to start over. Please ensure all sleep, hibernate and power saving modes for your computer and hard drives are disabled before starting the Chia plotting process. In the future, Chia will have a resume plot feature. In the meantime, if you do get a failed plot, delete all `*.tmp` files before starting a new plot.

## Updating from Release Candidate to 1.0:

Keys and configs from RC3 and newer should automatically migrate. For more details, read the [FAQ](https://github.com/Chia-Network/chia-blockchain/wiki/FAQ#how-do-i-upgrade-and-keep-my-keys-and-plots). **No testnet/TXCH coins migrate to mainnet. Mainnet coins are forever, however.**

# Windows

Install the Windows installer - [Chia Blockchain Windows](https://download.chia.net/latest/Setup-Win64.exe)

As the Chia code signing certificate is new you will likely have to ask to keep the download and when you run the installer, you will have to choose "More Info" and "Run Anyway" to be able to run the installer. There is no need to use the command line. Some Windows anti-virus applications are seeing the download as a false positive. You can see the entire source code and build method here so we think it's safe for you to ask those tools to ignore it. Running the installer while plotting on a previous version will stop your plotting process, so be careful.

You can now proceed to the [Quick Start Guide](https://github.com/Chia-Network/chia-blockchain/wiki/Quick-Start-Guide)

# macOS
macOS Mojave (10.14.x) or newer is required.

Install the macOS .dmg installer - [Chia Blockchain MacOS](https://download.chia.net/latest/Setup-MacOS.dmg)

When the installer first runs it will import or create multiple keys and add them to the macOS keychain. You may be prompted up to 3 times for your password. We suggest choosing "always allow."

You can now proceed to the [Quick Start Guide](https://github.com/Chia-Network/chia-blockchain/wiki/Quick-Start-Guide)

### Install from source - macOS
To build a development version, make sure [brew](https://brew.sh/) is available before starting the setup and that python 3.7 or newer is installed.  
See [install from source](#install-from-source) for detailed instruction.

# Ubuntu/Debian

You can install Chia Blockchain in different ways, depending on your needs:

* Set up Chia's repositories and install from them, for ease of installation and upgrade.

* Download the deb package and install it manually and manage upgrades manually.

* Install from source

## Install using the repository
Before you install Chia Blockchain for the first time on a new machine, you need to set up the Chia repository. Afterward, you can install and update Chia Blockchain from the repository.

### Set up the repository

1. Update the `apt` package index and install packages to allow `apt` to use a repository over HTTPS:

```
sudo apt-get update

sudo apt-get install ca-certificates curl gnupg
```

2. Add Chia's official GPG Key:

```
curl -sL https://repo.chia.net/FD39E6D3.pubkey.asc | sudo gpg --dearmor -o /usr/share/keyrings/chia.gpg
```

3. Use the following command to set up the **stable** repository.

```
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/chia.gpg] https://repo.chia.net/debian/ stable main" | sudo tee /etc/apt/sources.list.d/chia.list > /dev/null
```

### Install Chia Blockchain

1. Update the `apt` package index and install the latest stable version of Chia Blockchain

```
sudo apt-get update

# FULL UI VERSION
sudo apt-get install chia-blockchain

# CLI ONLY VERSION
sudo apt-get install chia-blockchain-cli
```

## Install from deb files

We have GUI and CLI Only installers available for Ubuntu 18.04 and newer and Debian Buster and newer. There are also arm64 versions of the debs available for Ubuntu and Debian/Respberry Pi OS 64. When using the GUI installer, binary CLI tools can be found in `/usr/lib/chia-blockchain/resources/app.asar.unpacked/daemon/`

* [GUI installer (x86_64)](https://download.chia.net/latest/x86_64-Ubuntu-gui)
* [GUI installer (arm64)](https://download.chia.net/latest/ARM64-Ubuntu-gui)
* [CLI only installer (x86_64)](https://download.chia.net/latest/x86_64-Ubuntu-cli)
* [CLI only installer (arm64)](https://download.chia.net/latest/ARM64-Ubuntu-cli)

## Install from source - Ubuntu
See [install from source](#install-from-source) for detailed instructions.

# CentOS/Red Hat/Fedora

You can install Chia Blockchain in different ways, depending on your needs:

* Set up Chia's repositories and install from them, for easy of installation and upgrade
* Download the rpm package and install it manually and manage upgrades manually
* Install from source

## Install using the yum/dnf repository

Before you installer Chia Blockchain for the first time on a new machine, you need to set up the Chia repository. Afterward, you can install and update Chia Blockchain from the repository.

### Set up and install using yum

1. Install the `yum-utils` package (which provides the yum-config-manager utility) and set up the stable repository.

```
sudo yum install -y yum-utils

sudo yum-config-manager \
    --add-repo https://repo.chia.net/rhel/chia-blockchain.repo
```

2. Install Chia Blockchain

```
# FULL UI VERSION
sudo yum install chia-blockchain

# CLI ONLY VERSION
sudo yum install chia-blockchain-cli
```

### Set up and install using dnf

1. Install the dnf config-manager util and set up the stable repository.

```
sudo dnf install 'dnf-command(config-manager)'

sudo dnf config-manager \
    --add-repo https://repo.chia.net/rhel/chia-blockchain.repo
```

2. Install Chia Blockchain using dnf

```
# FULL UI VERSION
sudo dnf install chia-blockchain

# CLI ONLY VERSION
sudo dnf install chia-blockchain-cli
```

## Install from rpm files

We have GUI and CLI Only installers available for RHEL/CentOS 7 and newer and Fedora 28 and newer. When using the GUI installer, binary CLI tools can be found in `/usr/lib/chia-blockchain/resources/app.asar.unpacked/daemon/`

* [GUI installer](https://download.chia.net/latest/x86_64-Redhat-gui)
* [CLI only installer](https://download.chia.net/latest/x86_64-Redhat-cli)

Fedora 31+ requires `libxcrypt-compat` to be installed on the system.

## Install from source - CentOS/Red Hat/Fedora
See [install from source](#install-from-source) for detailed instruction.

# Install from binary wheels
```bash
python3.7 -m venv venv
ln -s venv/bin/activate
. ./activate
pip install --upgrade pip
pip install --extra-index-url https://pypi.chia.net/simple/ chia-blockchain==1.3.4 miniupnpc==2.2.2
```

# WSL2

You can run chia-blockchain in Ubuntu 20.04 LTS via WSL2 on Windows.

NOTE: WSL2 plotting is currently only *slightly* faster than plotting on the native windows client. WSL2 requires significant tweaking to set up correctly. If you find that daunting, it's probably easier to just use the native windows client.

**You can not run the GUI** as WSL2 doesn't yet support graphical interfaces from WSL2. 

## Check if you already have WSL2 or WSL1 installed:
From PowerShell, type:
```
wsl -l -v
```

If you get a listing of help topics for wsl commands, you have WSL1, and need to upgrade. To upgrade, [follow the instructions here](https://docs.microsoft.com/en-us/windows/wsl/install-win10#update-to-wsl-2). If you get a blank result or a listing of installed Linux versions, you have WSL2 and are OK to proceed.

## If WSL is not installed:
From an Administrator PowerShell:
```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all
```
You will be prompted to reboot. 

## Installing a new WSL2 instance:
Install Ubuntu 20.04 LTS from the Microsoft Store and run it and complete its initial install steps. You now have a linux bash shell environment that can run linux native software on Windows.

### Install from source - WSL2
See [install from source](#install-from-source) for detailed instruction.

Running a standalone Windows wallet gui is deprecated but may return in later versions. You can run the Windows version and share keys. You can also plot in WSL2 and migrate the plots to a Windows farmed plot directory.

## Increasing the WSL Maximum Storage Capacity
WSL2 uses a Virtual Hardware Disk (VHD) to store files, and it automatically resizes as files grow. **However, the VHD has an initial maximum size of 256 GB.** Therefore, the default WSL2 VHD is probably only capable of plotting k=30 plots. To plot anything larger, you will need to increase the maximum allowable size. [Follow the guide here.](https://docs.microsoft.com/en-us/windows/wsl/compare-versions#expanding-the-size-of-your-wsl-2-virtual-hardware-disk)

## Setting a maximum limit to WSL2 memory access
If you try plotting Chia in WSL2 without limiting the memory access, WSL2 will use 100% of your available machine's memory, and your computer will get bogged down and begin swapping memory to your hard drive. This will severely cripple your plotting speeds. To set the maximum memory that WSL2 is allowed to use, create a configuration file [as described in this guide](https://www.bleepingcomputer.com/news/microsoft/windows-10-wsl2-now-allows-you-to-configure-global-options/).

## WSL VHD Plotting Nuances
Plotting within WSL2 can write to either the native VHD (which is EXT4) or to any other drive, which can be NTFS or any other FS-type. Writing to the native VHD is faster than writing out to another drive.

Plotting uses three commands for directory control:

`-t` for initial temp directory. Phases 1 and 2 happen here.

`-2` for secondary temp directory. Phase 3 (compression) happens here.

`-d` for final destination. Phase 4 happens here.

Plotting works such that `-t` and `-2` require the exact same amount of storage space. Therefore, if `-t` and `-2` point to the same drive, that drive needs 2x the final file size + 1x the max working file size.

For maximum speed, `-t` and `-2` should be inside the WSL2 filesystem. Something like: `-t ~/chia_temp -2 ~/chia_temp`. Just beware that the WSL2 VHD will need a much larger maximum capacity.

`-d` can point to any other drive for the final destination.


# Amazon Linux 2
### Install from source - Amazon Linux 2
See [install from source](#install-from-source) for detailed instruction.

### Install from binary package
```bash
# Install chia-blockchain as a binary package
python3.7 -m venv venv
ln -s venv/bin/activate
. ./activate
pip install --upgrade pip

pip install --extra-index-url https://pypi.chia.net/simple/ chia-blockchain==1.3.0 miniupnpc==2.1
```


# Other install methods and environments
* [Raspberry Pi 4](https://github.com/Chia-Network/chia-blockchain/wiki/Raspberry-Pi)
* [Docker](https://github.com/orgs/Chia-Network/packages/container/package/chia)
* [FreeBSD Install](https://github.com/Chia-Network/chia-blockchain/wiki/FreeBSD-Install)
* [Ubuntu Binary Install](https://github.com/Chia-Network/chia-blockchain/wiki/Ubuntu-Binary-Install)
* [OpenBSD Install](https://github.com/Chia-Network/chia-blockchain/wiki/OpenBSD-Install)


You need Python 3.7 or newer.

Chia strives to provide [binary wheels](https://pythonwheels.com/) for modern systems. If your system does not have binary wheels, you may need to install development tools to build some Python extensions from source. If you're attempting to install from source, setting the environment variable BUILD_VDF_CLIENT to N will skip trying to build Timelord components that aren't very cross platform, e.g. `export BUILD_VDF_CLIENT=N`.

## Create a virtual environment

Your installation goes inside a [virtual environment](https://docs.python-guide.org/dev/virtualenvs/).

There are lots of ways to create and manage a virtual environment. This is just one.

```bash
python3.7 -m venv venv
source venv/bin/activate
pip install --upgrade pip
```

Wheels can be in source or binary format. Binary wheels are specific to an operating system and python version number. Source wheels require development tools.

Chia hosts some binary wheels that are not available from [PyPI](https://pypi.org/). This step is optional, but it may succeed where building from source can take a while or fail in hard-to-debug ways. If wheels are not available for your system, this step will fail. But you can try it anyway.

```bash
pip install -i https://pypi.chia.net/simple/ miniupnpc==2.1 zstd
```

Install chia-blockchain.

```bash
pip install chia-blockchain==1.3.0
```

Before you use chia-blockchain in future, you must "enter" your virtual environment.

```bash
source venv/bin/activate
chia -h
```


# Install from source
\*This instruction is for MacOS, Ubuntu, CentOS, RedHat, WSL2, Amazon Linux 2 and possibly *NIX like OSes.
```bash
# Prerequisite: git 

git clone https://github.com/Chia-Network/chia-blockchain.git -b latest --recurse-submodules
cd chia-blockchain

# This installs compatible Python modules
sh install.sh
. ./activate

# If you want to debug/develop GUI app, try to install from source
# This installs supported version NodeJS/npm and npm dependencies.
sh install-gui.sh

# To open GUI app, run the following command
bash start-gui.sh
```

# Update from source
\*This instruction is for MacOS, Ubuntu, CentOS, RedHat, WSL2, Amazon Linux 2 and possibly *NIX like OSes.  
To Update/Upgrade from the previous version
```bash
cd chia-blockchain
. ./activate
chia stop -d all
deactivate
git fetch
git checkout latest
git reset --hard FETCH_HEAD --recurse-submodules

# If you get RELEASE.dev0 then delete the package-lock.json in chia-blockchain-gui and install.sh again

git status

# git status should say "nothing to commit, working tree clean", 
# if you have uncommitted changes, RELEASE.dev0 will be reported.

sh install.sh

. ./activate

chia init

# The GUI requires you have windowing system installed.
# You can not install and run the GUI as root
cd chia-blockchain-gui
git fetch
cd ..
chmod +x ./install-gui.sh
./install-gui.sh

# Run the GUI app
bash start-gui.sh
```

## Troubleshooting

Sometimes stray daemons left over from previously running processes will cause strange bugs/errors when upgrading to a new version.  Make sure all daemons and chia processes are killed before installing or upgrading.  

This is normally done by executing `chia stop -d all` from the upgrade example above.  
But it doesn't hurt to double check using `ps -Af | grep chia` to make sure there are no chia processes left running.  You may have to manually kill the chia daemon if an install and chia start was performed without first running `chia stop -d all`

If all else fails, rebooting the machine and restarting the chia daemon/processes usually does the trick.


# Testnets
To join a testnet, follow the instructions on the [How to Connect to the Testnet](https://github.com/Chia-Network/chia-blockchain/wiki/How-to-Connect-to-the-Testnet) article. 

It is recommended that you keep a separate testnet environment by prepending `CHIA_ROOT="~/.chia/testnetx"` to all of your cli commands. For example, `CHIA_ROOT="~/.chia/testnet10" chia init`. An easier way to do this is to run `export CHIA_ROOT="~/.chia/testnet10"` so that all commands will use testnet10 instead of mainnet. If you're using a version above 1.2.11 (currently in beta), you can update all config values to the testnet values by running `chia configure -t true`.
