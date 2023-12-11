---
title: Installation Details
slug: /installation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info

This page will go into the details of the various different ways to install Chia. If you already installed Chia as part of the Farming Guide, then feel free to skip ahead to the [Plotting Basics](/plotting-basics) page.

:::

There are various ways to install Chia, with the best method depending on what you intend to do:

- If you simply wish to use the Chia wallet, or to run a farm on a single personal computer, then we recommend installing the GUI from our [official downloads page](https://www.chia.net/downloads) for Windows and MacOS, and for Linux users to install the package [as described below](#using-the-cli). The GUI is the simplest way to interact with the Chia client and ideal for most non-developer use cases.

- If you intend to run a dedicated Chia full node on a server and connect to it programmatically using the [RPC interface](/rpc), the best method would be to install and run Chia via the command line on a proper server environment.

- If you intend to do [Chialisp](https://chialisp.com) development or build projects that leverage Chia, you have the options of either using an installer (the recommended pattern), or installing from source.

- Lastly, if you plan on making contributions to the source code, then installing Chia [from source](/installation#from-source) would be your path.

___In summary, unless you already knew before reading this page that you should be installing from source, chances are your best path will be to install from our [official downloads page](https://www.chia.net/downloads) or a Linux package, depending on your OS.___

## System Requirements

The minimum supported specs are that of the Raspberry Pi 4, 4GB model:

- Quad core 1.5Ghz CPU (must be 64 bit)
- 4 GB RAM
- As of Chia version 2.0, Python versions 3.8 and later are supported

### Drive Format

Chia plot files are at least 108GB in size (for K32). To plot successfully requires drives formatted to support large files. Formats that will work include NTFS, APFS, exFAT, and ext4. Do not use drives with FAT formatting (for example FAT12, FAT16, and FAT32), or else plotting will fail. Future versions of Chia will check for unsupported drives, but for now it's up to each user to check their drive format.

### Sleep kills plots

If the computer or hard drives go to sleep during the plotting process, it will fail, and you will need to start over. Please ensure all sleep, hibernate and power saving modes for your computer and hard drives are disabled before starting the Chia plotting process. In the future, Chia will have a resume plot feature. In the meantime, if you do get a failed plot, delete all `*.tmp` files before starting a new plot.

- - - - -

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

:::note
Make sure you have [Python 3.10](https://www.python.org/downloads/release/python-3109) and [Git](https://git-scm.com/downloads) installed.
:::

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

:::note
Make sure you have [Python 3.10](https://www.python.org/downloads/release/python-3109) and [Git](https://git-scm.com/downloads) installed.
:::

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

:::note
Make sure you have [Python 3.10](https://www.python.org/downloads/release/python-3109) and [Git](https://git-scm.com/downloads) installed.
:::

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

# Make sure you have 64-bit Python 3.8 or later
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

NOTE: WSL2 plotting is currently only *slightly* faster than plotting on the native windows client. WSL2 requires significant tweaking to set up correctly. If you find that daunting, it's probably easier to just use the native windows client.

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
See [install from source](/installation#from-source) for detailed instruction.

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
See [install from source](/installation#from-source) for detailed instruction.

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

_**These instructions were tested with Chia 1.1.4 on FreeBSD 11.3- and 11.4-RELEASE, newer versions may exist**_

***

#### Upgrading Existing Chia Installs

If you're upgrading from a previously built chia installation, exit from your previous venv environment (```deactivate```), create a new directory in which to place the latest Chia (e.g. ```mkdir ~/chia-1.0.5 && cd ~/chia-1.0.5```), clone the latest repo (```git clone https://github.com/Chia-Network/chia-blockchain.git -b latest```), enter it and create a new Python virtual environment within it (```python3 -m venv venv```). Now, activate the newest environment (```. venv/bin/activate```), upgrade pip (```pip install --upgrade pip```). Now you may skip down to the [clvm_rs install section](#clvm_rs) and begin there.

***

#### Why This Manual Installation?

Currently the only way to ensure Chia builds on FreeBSD is to do it from the source. By following these instructions to the letter, you should have no problem building the latest Chia from source on a FreeBSD 11.3 or 11.4. This should also work on FreeBSD 12, possibly with some modifications - e.g. if the ports py-cryptography version is newer than 3.3.2, simply edit as needed - or if your preferred Python version is 3.8+ it should all still work considering you modify the package names as necessary.

#### Notes on FreeNAS (TrueNAS)

If you had been using NFS or Samba sharing to expose your plots to a harvester on another OS, such as Linux, you can instead build Chia within a jail (see the FreeNAS manual for 'jails'), expose your plot directories to it and run the harvester within. In my experience, it provides lower-latency and more reliable access to the plots since the disks are direct-attached and not being provided through an extra few layers of network protocols.

If you are using a fresh jail created by the FreeNAS web GUI you may need to install openssh and setup a ssh key to login as root because by default it appears PAM password logins do not work. The jail shell CLI provided by the FreeNAS GUI allows copy and pasting so you can easily paste your public-key into /root/.ssh/authorized_keys && chmod -R 700 /root/.ssh.

These instructions would be applicable to 11.3 and 11.4 jails created within FreeNAS 11 only. Version 12 (FreeBSD 12) ✔

#### Other Notes

These instructions will have you building both chia-blockchain and clvm_rs from github source, and python-cryptography from FreeBSD's ports.

The result of this build will be the "chia version" showing the current release branch ahead by 1 and in "dev0"; for instance building 1.0.1 results in "chia version" returning "1.0.2.dev0". If someone knows why this is and how to fix it, please, edit and correct this! It does not happen on Linux.

_**These instructions assume a fresh FreeBSD 11 installation!**_

#### Discouraged?

Following the instructions in this document will result in a working Chia CLI build on FreeBSD 11 if you follow step-by-step starting from a vanilla FreeBSD installation. Is something broken? Compare the commands you typed, accessible in your **bash** shell history, and match them with each command in this document. If you feel you've messed something up, do the following:

```
# if you have (venv) in your shell prompt, type deactivate
deactivate
# remove the chia-blockchain directory which will contain clvm_rs and the Python venv
rm -rf chia-blockchain
# ... now start again! You don't need to do all the setup steps but instead may start at the upgrade notes above if you had finished up to the py-cryptography ports build.
```

#### Pre-requisite package installation

_If starting the build again after a failure and you have not re-installed FreeBSD, don't just skip this package installation section! You may have missed one or more software packages critical to the build._

The 'pkg', 'portsnap' and port build are to be run as root. Everything else can be run from a normal non-root user.

As root, update pkg and ports, and then install all packages as instructed below.

```
# Update your packages and ports; if ports are already installed as part of your fresh install run portsnap update instead of fetch/extract.
pkg update
portsnap fetch && portsnap extract

# Install bash if you have not; the default csh will not suffice for the build scripts.
pkg install bash
# change your shell to bash
chsh -s /usr/local/bin/bash
# run bash
/usr/local/bin/bash
```

Make sure you change the shell for your non-root chia-blockchain user. If you're opting to run Chia as root, you can skip this. If you are root, run this as it appears below; otherwise, you can omit the username because you are already that user.

```
chsh -s /usr/local/bin/bash NONROOT_USERNAME
```

Now proceed with installing the mandatory development tools.

```
pkg install lang/gcc9 gcc gmake cmake

```

#### gcc notes

After installing gcc version 9.0, this message appears:

```
To ensure binaries built with this toolchain find appropriate versions
of the necessary run-time libraries, you may want to link using

  -Wl,-rpath=/usr/local/lib/gcc9
```

It's probably possible to build the libraries in a way that doesn't require `export LD_LIBRARY_PATH=/usr/local/lib/gcc9`. If you know how click "edit" and dish.

#### Install rust, Python, and everything else.

```
pkg install lang/rust
pkg install lang/python37 py37-pip py37-setuptools py37-wheel py37-sqlite3 py37-cffi py37-virtualenv py37-maturin python 
pkg install node npm git openssl
```

If you are ssh'ing into the machine you might want to use 'screen' so that processes will continue even if you logout. For more information: https://www.freebsd.org/cgi/man.cgi?query=screen. 'tmux' is also a great alternative especially if you use iTerm2 on macOS as it supports native tabs and windows with the '-CC' CLI option.

```
# optional packages
pkg install screen tmux
```

#### Repo Cloning and Virtual Environment (venv) Activation

**From this point on, with the exception of the security/py-cryptography port build process (and any other exceptions noted), you may proceed as a normal user.**

```
# Clone the latest chia-blockchain repository, via HTTP:
git clone https://github.com/Chia-Network/chia-blockchain.git -b latest
# or with SSH:
git clone git@github.com:Chia-Network/chia-blockchain.git -b latest
# Note: you can specify the branch by adding "--branch <version>" like: git clone http://github.com/Chia-Network/chia-blockchain.git --branch 1.0.1

```

Create a virtual environment directory 'venv' from *within* the 'chia-blockchain' directory and activate it before proceeding
```
cd chia-blockchain
python3 -m venv venv
source venv/bin/activate 
```

You are now in the virtual environment that Python (and so chia) will use. You should have a "(venv)" prefix to your terminal prompt to confirm the venv is working.

Upgrade pip:
```
pip install --upgrade pip
```

To exit the virtual environment:
```
deactivate
```

#### Building py-cryptography from ports

_**You'll need to switch to root for this part. If you're already using root remember to leave the virtual environment for this step.**_

```
cd /usr/ports/security/py-cryptography

# Instruct 'make' that the SSL library is openssl.
# Also force the Python version in case the port tries for a higher one
echo "DEFAULT_VERSIONS+=ssl=openssl python=3.7 python3=3.7" >> /etc/make.conf

make
```

You'll probably see a bunch of warnings and notices; these are not errors and it will build.

Do NOT run make install. We will do our own py-cryptography install because 'make install' does not copy to our virtual environment. (If you know how to change this, please edit).

If you are running inside a jail and make fails with an error about the OSVERSION not matching UNAME, you will need to set the UNAME_r environment variable to match your jails OSVERSION:

```
# Adjust the value to match your jails OSVERSION
export UNAME_r=11.4-RELEASE
```

A full version list can be found [here](https://docs.freebsd.org/en/books/porters-handbook/book.html#versions).


Once complete switch back to your non-root user if you so optioned. You must now be in your venv once again.

#### clvm_rs

Build and install the current version of [clvm_rs](https://github.com/Chia-Network/clvm_rs).
These instructions were created for version 0.1.7 but a newer version may exist.

```
git clone http://github.com/Chia-Network/clvm_rs.git --branch 0.1.7
cd clvm_rs
maturin develop --release
pip install git+https://github.com/Chia-Network/clvm@use_clvm_rs
```

clvm_rs 0.1.7 is now installed in your virtual environment.

#### Install py-cryptography to the venv

Copy py-cryptography and its meta-data from the staging directory to your virtual environment:

```
cp -R /usr/ports/security/py-cryptography/work-py37/stage/usr/local/lib/python3.7/site-packages/cryptography ${VIRTUAL_ENV}/lib/python3.7/site-packages/cryptography
cp -R /usr/ports/security/py-cryptography/work-py37/stage/usr/local/lib/python3.7/site-packages/cryptography-3.3.2-py3.7.egg-info ${VIRTUAL_ENV}/lib/python3.7/site-packages/cryptography-3.3.2-py3.7.egg-info
```

Clear any Python byte-code cache files that may contain the old path. These should be re-built by the interpreter but we like a clean environment.
```
find ${VIRTUAL_ENV}/lib/python3.7/site-packages/cryptography -name __pycache__ | xargs -I{} rm -rf "{}"
```

#### Chia modifications and Building Chia Itself

Switch to your chia-blockchain clone directory. You will need to edit two files.

Using your favorite text editor, modify setup.py to edit the cryptography package version to 3.3.2.
```
"cryptography==3.4.6" --> to --> "cryptography==3.3.2"
```

Now you must modify chia/util/keychain.py to provide a static key when using the Python keyring. This is mandatory otherwise every time the keyring is accessed your passphrase will need to be entered on the command line, and for the CLI daemon this will not do.

On line 25 of chia/util/keychain.py, change:

```
elif platform=="linux":
```
to:
```
elif platform=="linux" or platform.startswith("freebsd"):
```

On line 27 of the same file, change the passphrase from "your keyring password" to whatever you wish your passphrase to be. This is intended to be fixed in future versions but, for the time being, Linux and FreeBSD must have the keyphrase provided statically.
```
keyring.keyring_key = "your keyring password"  # type: ignore
```
can be changed like so:
```
keyring.keyring_key = "Too Many Secrets"
```

Now, you will build Chia!

```
sh install.sh
```

Once done, run:

```
chia init
```

NOTE: if you need to disable UPnP - a protocol which automatically sets up port-forwarding on routers using NAT which is a typical setup at any residence with broadband - set "enable_upnp: False" in config.yaml. You can use the one-liner below or do it yourself.

```
sed -i .bak 's/enable_upnp: True/enable_upnp: False' ~/.chia/mainnet/config/config.yaml
```

While you don't absolutely need port 8444 forwarded to your Chia node, it is advised that you do so that other peers may connect to you instead of you solely connecting to them. For the average at-home farmer it is advised you do not disable UPnP unless you absolutely know what you're doing or have another node on your local network already using the port and are planning to [Farm on Many Machines](https://docs.chia.net/farming-on-many-machines/).

***

#### Installed and Ready to Farm!

That's it! Provided the instructions were followed to the T, and the build is a fresh FreeBSD 11.3 or 11.4, either hardware or FreeNAS jailed, you should be good to go! Now go to town with `chia start node` or whatever floats your boat.

More details can be found in the [Chia Introduction](https://docs.chia.net/introduction).


  </TabItem>
  <TabItem value="OpenBSD" label="OpenBSD">

_**These instructions were tested with Chia 1.1.4 on OpenBSD/amd64 6.8, newer versions may exist**_

```sh
# install required packages
doas pkg_add git python-3.8.6 rust cmake gmake gmpxx

# create a new user with the login class "daemon" so that it can use all
# available memory for plotting, then switch to that user
doas useradd -m -Ldaemon chia
doas -u chia ksh -l
cd

# clone repos
git clone https://github.com/Chia-Network/chia-blockchain.git --branch latest
git clone https://github.com/Chia-Network/clvm_rs.git --branch 0.1.7
git clone https://github.com/PyO3/maturin.git --branch v0.10.3
git clone https://github.com/timkuijsten/chiavdf.git --branch openbsd # chiavdf/pull/71

export BUILD_VDF_CLIENT=N

# create python virtual environment for Chia
cd chia-blockchain/
python3 -m venv venv
. ./venv/bin/activate
pip install --upgrade pip

cd ../chiavdf/
pip install .

cd ../maturin/
# don't pass static compiler flags to the rust linker because that would cause
# a core dump, possibly because of resource limits
sed -i 's|cargo_args.extend(\["--", "-C", "link-arg=-s"\])|#cargo_args.extend(\["--", "-C", "link-arg=-s"\])|' setup.py
pip install .

cd ../clvm_rs/
maturin develop --release

# XXX should be a more elegant way...
cp target/release/libclvm_rs.so ../chia-blockchain/clvm_rs.so

cd ../chia-blockchain/
# use our previous compile results
sed -i 's|"chiavdf==1.0.1"|"chiavdf==1.0.2.dev1"|' setup.py

# use a hardcoded random secret so the software can run headless and without
# user intervention
sed -i 's|elif platform == "linux":|elif platform == "linux" or platform.startswith("openbsd"):|' chia/util/keychain.py
_keyring=$(dd status=none if=/dev/random bs=8 count=1 | od -H | tr -d ' ' | head -1 | cut -b8-25)
sed -i 's|keyring.keyring_key = "your keyring password"|keyring.keyring_key = "'"$_keyring"'"|' chia/util/keychain.py
unset _keyring

sh install.sh

# DONE, Chia is installed now, start using it by creating a config and keys

chia init
chia keys generate

# if you are going to setup port forwarding, disable upnp
chia configure --enable-upnp false

chia start node wallet farmer harvester
```

#### GUI Build / Usage

*WARNING: the following has only been tested with Chia 1.0beta7 on OpenBSD/amd64 6.7*

The build instructions in the previous sections above must be completed successfully before attempting to build the GUI using the procedure below.

*WARNING: Although the following steps have been used successfully, the resulting GUI will be run with an older version of electron than is recommended by the Chia Network team. This may result in unexpected problems.*

#### Prerequisite package installation

As root (or using doas / sudo), first install some additional OpenBSD packages required for GUI usage:

```bash
pkg_add -i electron
```

#### Build

```bash
cd chia-blockchain
. ./activate

cd chia-blockchain-gui

# build / set up GUI
npm run build

# Remove failed electron 8.2.5 install and fall back to the OpenBSD
# ports tree 8.2.0 electron, which currently (as of 6/10/2020) works.
#
# This may not continue to work in the future.  A full solution to
# this requires official OpenBSD electron builds, provided by the
# electron project itself.

rm -rf node_modules/electron
```

#### Launch GUI
The GUI can now be launched using the following commands:

```bash
cd chia-blockchain
. ./activate

cd chia-blockchain-gui
npm run electron
```
  </TabItem>
</Tabs>

- - - - -

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

- - - - -

## CLI

Using the CLI gives greater and more precise control over the various Chia services such as the full node. As of 1.8.2, when installing from an installer or package CLI commands will be automatically added to your path for Windows and Linux. For more details on the commands, read the [CLI Reference](/cli).

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

Linux users who have installed the `chia-blockchain-cli` package using [apt, yum, or dnf](https://docs.chia.net/installation/#using-the-cli) will receive systemd for initializing and managing the Chia processes.  Each Chia service needs to be managed separately with systemd, except for the chia-daemon, which will be initialized automatically when any other Chia service is started with systemd (for example, the data-layer service will not automatically start the wallet service - both need to be started individually with systemd).  A user must be specified during the initialization to ensure the resulting process can find the Chia root directory.  The included systemd files support the default Chia directory location of `/home/<user>/.chia/mainnet` only. 

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

Sometimes stray daemons left over from previously running processes will cause strange bugs/errors when upgrading to a new version.  Make sure all daemons and chia processes are killed before installing or upgrading.  

This is normally done by executing `chia stop -d all` from the upgrade example above.  
But it doesn't hurt to double check using `ps -Af | grep chia` to make sure there are no chia processes left running.  You may have to manually kill the chia daemon if an install and chia start was performed without first running `chia stop -d all`

If all else fails, rebooting the machine and restarting the chia daemon/processes usually does the trick.


## Testnets

To join a testnet, follow the instructions on [How to Join the Official Testnet](/testnets#join-the-official-testnet). 

It is recommended that you keep a separate testnet environment by prepending `CHIA_ROOT="~/.chia/testnetx"` to all of your cli commands. For example, `CHIA_ROOT="~/.chia/testnet10" chia init`. An easier way to do this is to run `export CHIA_ROOT="~/.chia/testnet10"` so that all commands will use testnet10 instead of mainnet. If you're using a version above 1.2.11, you can update all config values to the testnet values by running `chia configure -t true`.


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

:::note
Make sure you have [Python 3.10](https://www.python.org/downloads/release/python-3109) and [Git](https://git-scm.com/downloads) installed.
:::

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

:::note
Make sure you have [Python 3.10](https://www.python.org/downloads/release/python-3109) and [Git](https://git-scm.com/downloads) installed.
:::

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

### Apt

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
