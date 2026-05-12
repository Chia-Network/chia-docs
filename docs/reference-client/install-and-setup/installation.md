---
title: Advanced Installation
slug: /reference-client/install-and-setup/installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

This page will go into the details of the various different ways to install Chia. If you already installed Chia as part of the Farming Guide, then feel free to skip ahead to the [Plotting Basics](/reference-client/plotting/plotting-basics) page.

:::

There are various ways to install Chia, with the best method depending on what you intend to do:

- If you simply wish to use the Chia wallet, or to run a farm on a single personal computer, then we recommend installing the GUI from our [official downloads page](https://www.chia.net/downloads) for Windows and MacOS, and for Linux users to install the package [as described below](#using-the-cli). The GUI is the simplest way to interact with the Chia client and ideal for most non-developer use cases.

- If you intend to run a dedicated Chia full node on a server and connect to it programmatically using the [RPC interface](/reference-client/rpc-reference/rpc), the best method would be to install and run Chia via the command line on a proper server environment.

- If you intend to do [Chialisp](https://chialisp.com) development or build projects that leverage Chia, you have the options of either using an installer (the recommended pattern), or installing from source.

- Lastly, if you plan on making contributions to the source code, then installing Chia [from source](/docs/reference-client/install-and-setup/installation.md#from-source) would be your path.

**_In summary, unless you already knew before reading this page that you should be installing from source, chances are your best path will be to install from our [official downloads page](https://www.chia.net/downloads) or a Linux package, depending on your OS._**

## System Requirements

The minimum supported specs are that of the Raspberry Pi 4, 4GB model:

- Quad core 1.5Ghz CPU (must be 64 bit)
- 4 GB RAM
- As of Chia version 2.5, Python versions 3.9 and later are supported

### Drive Format

Chia plot files are at least 108GB in size (for K32). To plot successfully requires drives formatted to support large files. Formats that will work include NTFS, APFS, exFAT, and ext4. Do not use drives with FAT formatting (for example FAT12, FAT16, and FAT32), or else plotting will fail. Future versions of Chia will check for unsupported drives, but for now it's up to each user to check their drive format.

### Sleep kills plots

If the computer or hard drives go to sleep during the plotting process, it will fail, and you will need to start over. Please ensure all sleep, hibernate and power saving modes for your computer and hard drives are disabled before starting the Chia plotting process. In the future, Chia will have a resume plot feature. In the meantime, if you do get a failed plot, delete all `*.tmp` files before starting a new plot.

---

## Install

### Using the CLI

_This method is intended for linux environments_

<Tabs
defaultValue="apt"
groupId="install"
values={[
{label: 'APT', value: 'apt'},
{label: 'YUM', value: 'yum'},
{label: 'DNF', value: 'dnf'},
{label: 'PIP', value: 'pip'},
]}>
<TabItem value="apt">

```bash
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

# Use chia-blockchain-cli instead for CLI only
```

  </TabItem>
  <TabItem value="yum">

```bash
# Install packages
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://repo.chia.net/rhel/chia-blockchain.repo

# Install chia-blockchain
sudo yum install chia-blockchain

# Use chia-blockchain-cli for CLI only
```

  </TabItem>
  <TabItem value="dnf">

```bash
# Install packages
sudo dnf install 'dnf-command(config-manager)'
sudo dnf config-manager --add-repo https://repo.chia.net/rhel/chia-blockchain.repo

# Install chia-blockchain
sudo dnf install chia-blockchain

# Use chia-blockchain-cli for CLI only
```

  </TabItem>
  <TabItem value="pip">

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
. ./venv/bin/activate # MacOS / Linux
./venv/Scripts/Activate.ps1 # Windows

# Update pip
pip install --upgrade pip

# Install chia-blockchain
pip install --extra-index-url https://pypi.chia.net/simple chia-blockchain miniupnpc
```

Chia strives to provide [binary wheels](https://pythonwheels.com) for modern systems. If your system does not have binary wheels, you may need to install development tools to build some Python extensions from source. If you're attempting to install from source, setting the environment variable `BUILD_VDF_CLIENT` to `N` will skip trying to build Timelord components that aren't very cross platform, e.g. `export BUILD_VDF_CLIENT=N`.

  </TabItem>
</Tabs>

### From Source

_This method is primarily intended for contributing to the Chia codebase_
<Tabs
defaultValue="linux-macos"
groupId="source"
values={[
{label: 'Linux/MacOS', value: 'linux-macos'},
{label: 'Windows', value: 'windows'},
]}>
<TabItem value="linux-macos">

```bash
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
```

The following is how you update to the latest version:

```bash
# Change directory
cd chia-blockchain

# Activate the virtual environment
. ./activate

# Stop running services
chia stop -d all

# Deactivate the virtual environment
deactivate

# Remove the current virtual environments
rm -r venv
rm -r .penv
rm -r .venv

# Pull the latest version
git fetch
git checkout latest
git reset --hard FETCH_HEAD --recurse-submodules

# If you get RELEASE.dev0 then delete the package-lock.json in chia-blockchain-gui and install.sh again

# This should say "nothing to commit, working tree clean"
# if you have uncommitted changes, RELEASE.dev0 will be reported
git status

# Install the new version
sh install.sh

# Activate the virtual environment
. ./activate

# Initialize the new version
chia init
```

  </TabItem>
  <TabItem value="windows">

```bash
# Download chia-blockchain
git clone https://github.com/Chia-Network/chia-blockchain -b latest --recurse-submodules

# Change directory
cd chia-blockchain

# Install dependencies
./Install.ps1

# Activate virtual environment
. ./venv/Scripts/Activate.ps1

# Initialize
chia init
```

The following is how you update to the latest version:

```bash
# Change directory
cd chia-blockchain

# Activate the virtual environment
. ./venv/Scripts/Activate.ps1

# Stop running services
chia stop -d all

# Deactivate the virtual environment
deactivate

# Remove the current virtual environment
rm -r venv
rm -r .penv
rm -r .venv

# Pull the latest version
git fetch
git checkout latest
git reset --hard FETCH_HEAD --recurse-submodules

# If you get RELEASE.dev0 then delete the package-lock.json in chia-blockchain-gui and install.sh again

# This should say "nothing to commit, working tree clean"
# if you have uncommitted changes, RELEASE.dev0 will be reported
git status

# Install the new version
./Install.ps1

# Activate the virtual environment
. ./venv/Scripts/Activate.ps1

# Initialize the new version
chia init
```

  </TabItem>
</Tabs>

### Raspberry Pi 4 {#raspberry-pi}

:::note
Chia does not support the Raspberry Pi 3, and we do not recommend running the GUI on the 4GB Raspberry Pi 4 model.

It is highly recommended you put the Chia blockchain and wallet database on an SSD or NVMe drive, rather than the SD card.
:::

#### Swap {#raspberry-pi-swap}

It is suggested that you set up 1024 MiB of swap:

<Tabs
defaultValue="ubuntu"
groupId="source"
values={[
{label: 'Ubuntu 20.04 LTS', value: 'ubuntu'},
{label: 'Raspbian 64', value: 'raspbian'},
]}>
<TabItem value="ubuntu">

Run the following commands to set up the swap:

```bash
sudo dd if=/dev/zero of=/swap bs=1M count=1024
sudo chmod 600 /swap
sudo mkswap /swap
sudo swapon /swap
```

Add this line to `/etc/fstab` so that swap available on reboot:

```bash
/swap swap swap defaults 0 0
```

  </TabItem>
  <TabItem value="raspbian">

Here is an excellent [walk-through of increasing swap space](https://pimylifeup.com/raspberry-pi-swap-file/) on Raspbian 64.

  </TabItem>
</Tabs>

#### Setup {#raspberry-pi-setup}

Run the following commands to prepare for installation:

```bash
# Requirements to compile the blockchain
sudo apt-get install -y build-essential python3-dev

# If you are not using Raspbian 64, add this
export PIP_EXTRA_INDEX_URL=https://www.piwheels.org/simple/

# Make sure you have 64-bit Python 3.9 or later
python3 -c 'import platform; print(platform.architecture())'
```

#### Proceed {#raspberry-pi-install}

:::note
If you run into an error during the build process, make sure you are running a 64-bit version of the OS.

You can check by running `uname -a`. If it says `arm7l`, you need a 64-bit version of the OS. The `uname -a` output should end with `aarch64 GNU/Linux`.
:::

Finally, follow the typical [from source installation for Linux](#from-source) to continue.

#### Disable Timelord {#raspberry-pi-timelord}

This is not necessary when installing from source.

However, if you install Chia in some other way, disable the timelord build process:

```bash
export BUILD_VDF_CLIENT=N
```

### Other environments

<Tabs>
  <TabItem value="Docker" label="Docker" default>

Installation instructions for docker are found on the container repo:
[Docker](https://github.com/orgs/Chia-Network/packages/container/package/chia)

  </TabItem>
  <TabItem value="WSL2" label="WSL2">

You can run chia-blockchain in Ubuntu 20.04 LTS via WSL2 on Windows.

NOTE: WSL2 plotting is currently only _slightly_ faster than plotting on the native windows client. WSL2 requires significant tweaking to set up correctly. If you find that daunting, it's probably easier to just use the native windows client.

**You can not run the GUI** as WSL2 doesn't yet support graphical interfaces from WSL2.

#### Check if you already have WSL2 or WSL1 installed:

From PowerShell, type:

```
wsl -l -v
```

If you get a listing of help topics for wsl commands, you have WSL1, and need to upgrade. To upgrade, [follow the instructions here](https://docs.microsoft.com/en-us/windows/wsl/install-win10#update-to-wsl-2). If you get a blank result or a listing of installed Linux versions, you have WSL2 and are OK to proceed.

#### If WSL is not installed:

From an Administrator PowerShell:

```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all
```

You will be prompted to reboot.

#### Installing a new WSL2 instance:

Install Ubuntu 20.04 LTS from the Microsoft Store and run it and complete its initial install steps. You now have a linux bash shell environment that can run linux native software on Windows.

#### Install from source - WSL2

See [install from source](/docs/reference-client/install-and-setup/installation.md#from-source) for detailed instruction.

Running a standalone Windows wallet gui is deprecated but may return in later versions. You can run the Windows version and share keys. You can also plot in WSL2 and migrate the plots to a Windows farmed plot directory.

#### Increasing the WSL Maximum Storage Capacity

WSL2 uses a Virtual Hardware Disk (VHD) to store files, and it automatically resizes as files grow. **However, the VHD has an initial maximum size of 256 GB.** Therefore, the default WSL2 VHD is probably only capable of plotting k=30 plots. To plot anything larger, you will need to increase the maximum allowable size. [Follow the guide here.](https://docs.microsoft.com/en-us/windows/wsl/compare-versions#expanding-the-size-of-your-wsl-2-virtual-hardware-disk)

#### Setting a maximum limit to WSL2 memory access

If you try plotting Chia in WSL2 without limiting the memory access, WSL2 will use 100% of your available machine's memory, and your computer will get bogged down and begin swapping memory to your hard drive. This will severely cripple your plotting speeds. To set the maximum memory that WSL2 is allowed to use, create a configuration file [as described in this guide](https://www.bleepingcomputer.com/news/microsoft/windows-10-wsl2-now-allows-you-to-configure-global-options/).

#### WSL VHD Plotting Nuances

Plotting within WSL2 can write to either the native VHD (which is EXT4) or to any other drive, which can be NTFS or any other FS-type. Writing to the native VHD is faster than writing out to another drive.

Plotting uses three commands for directory control:

`-t` for initial temp directory. Phases 1 and 2 happen here.

`-2` for secondary temp directory. Phase 3 (compression) happens here.

`-d` for final destination. Phase 4 happens here.

Plotting works such that `-t` and `-2` require the exact same amount of storage space. Therefore, if `-t` and `-2` point to the same drive, that drive needs 2x the final file size + 1x the max working file size.

For maximum speed, `-t` and `-2` should be inside the WSL2 filesystem. Something like: `-t ~/chia_temp -2 ~/chia_temp`. Just beware that the WSL2 VHD will need a much larger maximum capacity.

`-d` can point to any other drive for the final destination.

  </TabItem>
  <TabItem value="Amazon Linux 2" label="Amazon Linux 2">

#### Install from source - Amazon Linux 2

See [install from source](/docs/reference-client/install-and-setup/installation.md#from-source) for detailed instruction.

#### Install from binary package

```bash
# Install chia-blockchain as a binary package
python -m venv venv
ln -s venv/bin/activate
. ./activate
pip install --upgrade pip

pip install --extra-index-url https://pypi.chia.net/simple chia-blockchain miniupnpc
```

  </TabItem>
  <TabItem value="FreeBSD" label="FreeBSD">

<!-- Legacy anchors preserved for external links -->

<span id="upgrading-existing-chia-installs"></span>
<span id="why-this-manual-installation"></span>
<span id="notes-on-freenas-truenas"></span>
<span id="other-notes"></span>
<span id="discouraged"></span>
<span id="pre-requisite-package-installation"></span>
<span id="gcc-notes"></span>
<span id="install-rust-python-and-everything-else"></span>
<span id="repo-cloning-and-virtual-environment-venv-activation"></span>
<span id="building-py-cryptography-from-ports"></span>
<span id="clvm_rs"></span>
<span id="install-py-cryptography-to-the-venv"></span>
<span id="chia-modifications-and-building-chia-itself"></span>
<span id="installed-and-ready-to-farm"></span>

:::warning Community-Supported
FreeBSD is not officially supported by the Chia team. These instructions are community-contributed and may lag behind the latest release. If you encounter issues, please report them in [chia-blockchain discussions](https://github.com/Chia-Network/chia-blockchain/discussions/8763).
:::

These instructions are for building Chia from source on **FreeBSD 13 or 14**. Chia requires **Python 3.10 or newer** (see [`install.sh`](https://github.com/Chia-Network/chia-blockchain/blob/main/install.sh)). The build script uses Poetry to resolve all Python dependencies (including `chia_rs`, `clvm_tools`, and `cryptography`) — no manual Rust wheel builds are needed.

#### Prerequisites

Install required system packages as root:

```bash
pkg update
pkg install bash git cmake gmake gmp rust python311 py311-sqlite3
```

Adjust the Python version number (`python311`, `py311-sqlite3`) if your ports tree provides a different minor version (3.11, 3.12, etc.) as long as it is 3.10 or above.

Bash is required because `install.sh` uses bash-specific syntax. If your login shell is not bash, either switch it or run `bash` before proceeding:

```bash
chsh -s /usr/local/bin/bash
```

Optional but recommended for remote sessions:

```bash
pkg install screen tmux
```

#### Build

Clone the repository and run the install script:

```bash
git clone https://github.com/Chia-Network/chia-blockchain.git -b latest
cd chia-blockchain

sh install.sh
```

`install.sh` detects FreeBSD via `uname`, sets `MAKE=gmake` and `BUILD_VDF_CLIENT=N`, creates a Python virtual environment, installs Poetry, and resolves all dependencies from `pyproject.toml`.

After installation completes, activate the environment and initialize Chia:

```bash
. ./activate
chia init
```

#### Upgrading

To upgrade to a newer Chia release, pull the latest tag and re-run the install:

```bash
cd chia-blockchain
. ./activate
deactivate
git fetch --all --tags
git checkout latest
sh install.sh
. ./activate
chia init
```

#### Notes on TrueNAS

If you run TrueNAS (formerly FreeNAS) and previously used NFS or Samba to expose plots to a harvester on another OS, you can instead build Chia inside a jail and mount plot directories directly. This provides lower-latency access to plots.

To access a jail created by the TrueNAS web GUI, run `iocage console JAIL_NAME` from the TrueNAS host. Alternatively, install `openssh` in the jail and set up SSH key access.

#### Known limitations

- **VDF client:** `install.sh` sets `BUILD_VDF_CLIENT=N` on FreeBSD. This means the timelord cannot run on FreeBSD; farming (full node, farmer, harvester) is unaffected.
- **Compressed plots:** Community testing has reported `RuntimeError: Harvester does not support compressed plots` on FreeBSD. This issue is not fully resolved. If you encounter it, verify your `config.yaml` harvester settings and that the Chia version you are running supports the compression level of your plots.
- **GUI:** The Electron-based GUI is not supported on FreeBSD. Use the CLI.
- **UPnP:** If you need to disable UPnP (for example, if another node on your LAN already uses port 8444), run:

```bash
chia configure --enable-upnp false
```

  </TabItem>
  <TabItem value="OpenBSD" label="OpenBSD">

<!-- Legacy anchors preserved for external links -->

<span id="gui-build--usage"></span>
<span id="prerequisite-package-installation"></span>
<span id="launch-gui"></span>

:::warning Community-Supported
OpenBSD is not officially supported by the Chia team. These instructions are community-contributed and may lag behind the latest release.
:::

These instructions are for building Chia from source on **OpenBSD 7.x** (amd64). Chia requires **Python 3.10 or newer**.

#### Prerequisites

Install required system packages as root (or with `doas`):

```bash
doas pkg_add bash git python-3.11.10 rust cmake gmake gmp
```

Adjust the Python version as appropriate for your OpenBSD release, as long as it is 3.10 or above.

#### Build

Create a dedicated user (optional but recommended) and switch to it:

```bash
doas useradd -m -Ldaemon chia
doas -u chia bash -l
cd
```

Clone the repository and run the install script:

```bash
git clone https://github.com/Chia-Network/chia-blockchain.git -b latest
cd chia-blockchain

sh install.sh
```

`install.sh` detects OpenBSD via `uname`, sets `MAKE=gmake` and `BUILD_VDF_CLIENT=N`, creates a Python virtual environment, installs Poetry, and resolves all dependencies from `pyproject.toml`.

After installation completes:

```bash
. ./activate
chia init
chia keys generate
```

#### Known limitations

- **VDF client:** `install.sh` sets `BUILD_VDF_CLIENT=N` on OpenBSD. The timelord cannot run on OpenBSD; farming is unaffected.
- **GUI:** The Electron-based GUI is not supported on OpenBSD. Use the CLI.
- **UPnP:** Disable if needed:

```bash
chia configure --enable-upnp false
```

  </TabItem>
</Tabs>

---

## Directory Structure

```
.chia/
└── mainnet/
      ├─ config/
      │      ├─ config.yaml
      │      └─ ssl/
      ├─ db/
      ├─ log/
      │      └─ debug.log
      ├─ run/
      └─ wallet/
```

All data used by the Chia blockchain is stored at the location set with the `CHIA_ROOT` environment variable, which defaults to `~/.chia/mainnet` (the hidden folder `.chia` inside of your home directory) if unset.

The blockchain database is stored under the `db` subdirectory. It is possible to copy the database file to use as a backup or put on another machine. To resync the full node from the start, delete the database file and restart the node.

The config file under the `config` subdirectory. Its name is `config.yaml`, and it can be used to find the root cause of problems.

It is possible to configure the `CHIA_ROOT` environment variable to another location. A common use for this would be to switch it to `~/.chia/testnet` to have a separate config for the testnet.

---

## CLI

Using the CLI gives greater and more precise control over the various Chia services such as the full node. As of 1.8.2, when installing from an installer or package CLI commands will be automatically added to your path for Windows and Linux. For more details on the commands, read the [CLI Reference](/reference-client/rpc-reference/rpc).

<Tabs>
  <TabItem value="MacOS" label="MacOS" default>

The CLI commands are stored in the following location:

```bash
/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon
```

To be able to use these commands without going to that directory in the terminal, add it to the path.

This can be done by running the following command:

```bash
export PATH=/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon:$PATH
```

To load this on startup, add it to the `.bashrc`, `.bash_profile`, or `.zshrc` file depending on which is used by the shell.

  </TabItem>
  <TabItem value="Windows" label="Windows">

The CLI commands are stored in the following location:
If installed for the user it can be found at

```bash
~\AppData\Local\Programs\Chia\resources\app.asar.unpacked\daemon
```

If installed for all users it can be found at

```bash
C:\Program Files\Chia\resources\app.asar.unpacked\daemon\chia.exe
```

  </TabItem>
  <TabItem value="Linux" label="Linux">
  
  The CLI commands are stored in the following location:
  ```
  /usr/bin/chia
  ```
  This location should already be included in your system's PATH, so you should be able to run `chia` directly from the command line without any further setup.

  </TabItem>
</Tabs>

## GUI

The GUI is the most user-friendly method of interacting with Chia for non-developer uses, and it can be installed manually from the CLI if you installed from source.

<Tabs>
  <TabItem value="MacOS / Linux" label="MacOS / Linux" default>

```bash
# Install the GUI
. ./install-gui.sh

# Start the GUI
sh start-gui.sh
```

The following is how you update to the latest version:

```bash
# Change directory into the GUI
cd chia-blockchain-gui

# Pull the latest version
git fetch

# Change directory
cd ..

# Change permissions on install script
chmod +x ./install-gui.sh

# Install the new version of the GUI
./install-gui.sh

# Start the GUI
bash start-gui.sh
```

  </TabItem>
  <TabItem value="Windows" label="Windows">

```bash
# Install the GUI
. .\Install-gui.ps1

# Change directory
cd chia-blockchain-gui

# Start the GUI
Start-Process -NoNewWindow npm run electron
```

The following is how you update to the latest version:

```bash
# Change directory
cd chia-blockchain-gui

# Pull the latest version
git fetch

# Change directory
cd ..

# Install the new version of the GUI
./Install-gui.ps1

# Change directory
cd chia-blockchain-gui

# Start the GUI
Start-Process -NoNewWindow npm run electron
```

  </TabItem>
</Tabs>

## Initial Startup

Upon launch the GUI will set everything up automatically, however if installing from source then the initial setup needs to be done manually via the CLI.

First, initialize the Chia configuration files:

```bash
chia init
```

Then, generate your keys:

```bash
chia keys generate
```

Finally, start the farmer and its full node:

```bash
chia start farmer
```

### Systemd

Linux users who have installed the `chia-blockchain-cli` package using [apt, yum, or dnf](https://docs.chia.net/reference-client/install-and-setup/installation/#using-the-cli) will receive systemd configuration files for initializing and managing the Chia processes. Each Chia service needs to be managed separately with systemd, except for the chia-daemon, which will be initialized automatically when any other Chia service is started with systemd (for example, the data-layer service will not automatically start the wallet service - both need to be started individually with systemd). A user must be specified during the initialization to ensure the resulting process can find the Chia root directory. The included systemd files support the default Chia directory location of `/home/<user>/.chia/mainnet` only.

To start a Chia process with systemd, the command format is `systemctl start chia-<service-name>@<user>`. For example, if starting a Chia full node for the Linux user `ubuntu`, the command would be:

```
systemctl start chia-full-node@ubuntu
```

To start the full-node at system boot:

```
systemctl enable chia-full-node@ubuntu
```

The services available to be managed with systemd are:

```
chia-crawler
chia-data-layer
chia-data-layer-http
chia-farmer
chia-full-node
chia-harvester
chia-introducer
chia-seeder
chia-timelord
chia-wallet
```

Note that the `chia-timelord` service runs the timelord coordinator service, but not the VDF clients.

## Troubleshooting

Sometimes stray daemons left over from previously running processes will cause strange bugs/errors when upgrading to a new version. Make sure all daemons and chia processes are killed before installing or upgrading.

This is normally done by executing `chia stop -d all` from the upgrade example above.  
But it doesn't hurt to double check using `ps -Af | grep chia` to make sure there are no chia processes left running. You may have to manually kill the chia daemon if an install and chia start was performed without first running `chia stop -d all`

If all else fails, rebooting the machine and restarting the chia daemon/processes usually does the trick.

## Testnets

To join a testnet, follow the instructions on [How to Join the Official Testnet](/reference-client/install-and-setup/testnets#join-the-official-testnet).

It is recommended that you keep a separate testnet environment by prepending `CHIA_ROOT="~/.chia/testnetx"` to all of your cli commands. For example, `CHIA_ROOT="~/.chia/testnet11" chia init`. An easier way to do this is to run `export CHIA_ROOT="~/.chia/testnet11"` so that all commands will use testnet11 instead of mainnet. You can update all config values to the testnet values by running `chia configure -t true`.

## Beta and release candidate installations

### From Source

_This method is primarily intended for contributing to the Chia codebase_
<Tabs
defaultValue="linux-macos"
groupId="source"
values={[
{label: 'Linux/MacOS', value: 'linux-macos'},
{label: 'Windows', value: 'windows'},
]}>
<TabItem value="linux-macos">

```bash
# Download chia-blockchain
git clone https://github.com/Chia-Network/chia-blockchain -b latest --recurse-submodules

# Change directory
cd chia-blockchain

# Checkout the beta or release candidate by tag, tags can be found https://github.com/Chia-Network/chia-blockchain/tags.
git checkout tags/2.1.2-rc2

# Install dependencies
sh install.sh

# Activate virtual environment
. ./activate

# Initialize
chia init
```

  </TabItem>
  <TabItem value="windows">

```bash
# Download chia-blockchain
git clone https://github.com/Chia-Network/chia-blockchain -b latest --recurse-submodules

# Change directory
cd chia-blockchain

# Checkout the beta or release candidate by tag, tags can be found https://github.com/Chia-Network/chia-blockchain/tags.
git checkout tags/2.1.2-rc2

# Install dependencies
./Install.ps1

# Activate virtual environment
. ./venv/Scripts/Activate.ps1

# Initialize
chia init
```

  </TabItem>
</Tabs>

### From packaged installer

<Tabs
defaultValue="apt"
groupId="source"
values={[
{label: 'Apt', value: 'apt'},
{label: 'exe, deb, dmg, rpm', value: 'exe, deb, dmg, rpm'},
]}>
<TabItem value="apt">

```bash
# Install packages
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg

# Add GPG key
curl -sL https://repo.chia.net/FD39E6D3.pubkey.asc | sudo gpg --dearmor -o /usr/share/keyrings/chia.gpg

# Set up repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/chia.gpg] https://repo.chia.net/prerelease/debian/ prerelease main" | sudo tee /etc/apt/sources.list.d/chia-blockchain-prerelease.list > /dev/null
sudo apt-get update

# Install chia-blockchain
sudo apt-get install chia-blockchain

# Use chia-blockchain-cli instead for CLI only
```

  </TabItem>
  <TabItem value="exe, deb, dmg, rpm">

```bash
# Navigate to downloads page
Open https://github.com/Chia-Network/chia-blockchain/releases in a web browser

# Download the correct asset
Navigate to the release candidate of interest and download the necessary installer for your OS (ex. exe for windows)

# Install the downloaded installer
Using your system finder/file explorer install the downloaded installer (note - make sure no other versions of chia are installed prior to this step)
```

  </TabItem>
</Tabs>
