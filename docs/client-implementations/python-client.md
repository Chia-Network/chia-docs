---
title: Python Client
slug: python-client
---

`chia-blockchain` is the first and official implementation of the Chia protocol. It is written
in python, with a few dependencies written in C++ or rust in order to improve performance. It
is written from the ground up by the Chia team as well as open source contributors, and is not
a fork of any other blockchain system.

https://github.com/Chia-Network/chia-blockchain

The codebase is split into several subfolders which categorize code on the different components
of the system. Inside the source root (chia folder).

- **cmds**: Contains the command line interface program, which is a python wrapper around the chia RPC api. When a command is run, a connection is established directly to the Chia services running locally.
- **consensus**: Consensus critical code that is high risk to change.
- **daemon**: Server that runs the daemon, launching and stopping the other services.
- **farmer**: Farmer server which handles signing blocks, coordinating the harvesters and communicating with a node.
- **full_node**: A large portion of the business logic of Chia is here, storing blocks and coins, full node protocol, etc.
- **harvester**: Code to handle harvester interaction with plot files and the filesystem
- **introducer**: Temporary introducer server which has been partially replaced with DNS introducers.
- **plotters**: Code for wrapping 3rd party plotters such as MadMax and Bladebit.
- **plotting**: Code for creating plots and handling plot creation parameters, as well as checking plot correctness.
- **pools**: Code for the handling of plot NFTs and pooling (on the wallet side).
- **protocols**: Protocol specification, also explained in section 10.
- **rpc**: RPC Server and RPC api specification for all services.
- **server**: Networking and Websocket server.
- **simulator**: A wrapper around the full node which allows creating and farming blocks, and running a local custom blockchain.
- **ssl**: Managing TLS connections and certificates.
- **timelord**: Code for running timelords, which uses the `chiavdf` dependency and connects to vdf clients.
- **types**: Blockchain format and python types used throughout the project.
- **util**: A collection of many utility files and functions used throughout the project.
- **wallet**: Subdirectory containing all code relating to wallets and chialisp. This contains a large amount of code.

# Chia Directory Structure Logs, Database, and More


🔧  Work in progress 🔨 

For all operating systems (OS), the location for you Chia directories (folders) that contain the database, configuration, logs, etc. is in directories inside your home folder.

# Home Directory
Most if not all of the Chia software's folders and data will be in your home directory. While the concept is similar across operating systems, the details differ.:

|OS|Home Directory|
|---|---|
|Linux/Ubuntu|`~/` or `/home/yourusername`|
|macOS|`~/` or `/Users/yourusername`|
|Windows|`C:\Users\yourusername`|

## Home Directory General Structure

For Linux, Windows, and macOS, the configuration files are in a hidden `.chia` folder. The application file location varies depending on your operating system.

### Unix-based systems (Linux, Ubuntu, etc.)
```
/home/user
├─  chia-blockchain/
├─ .chia/
│   └── mainnet/
│      ├─ config/
│      │      ├─ config.yaml
│      │      └─ ssl/
│      │            └─ (and more...)
│      ├─ db/
│      ├─ log/
│      │      └─ debug.log
│      ├─ run/
│      │      └─ (and more...)
│      └─ wallet/
│             └─ (and more...)
└── /chia-blockchain
       └─ (and more...)
```

# Chia keys management

The purpose of this page is to provide guidance on how to setup Chia keys for plotting, farming, receiving rewards and managing your wallet.
It does not explain the Chia Keys Architecture. You can find this explanation here: [Chia Keys Architecture](https://github.com/Chia-Network/chia-blockchain/wiki/Chia-Keys-Architecture).
It is mostly CLI focused; sorry GUI users.

## 1 key (default)
This solution is the most straightforward, you use only one key for everything: plotting, farming, receiving rewards, managing your wallet.
It is the default configuration when you install chia-network for the first time.
The CLI (or GUI) creates a new private master key on the first initialization. Show can see it's mnemonic by typing: `chia keys show`

By default, the rewards from farming will be sent to this private key's wallet address.

With this setup you can farm, plot and manage your XCH all at once.
The risk is that, if your computer is compromised, the attacker would have access to your wallet and could potentially steal the XCH.

Another solution for farming XCH and securing them is to use two keys:

## 2 keys (farming key + cold storage key)
1. Default key used for: plotting and farming
1. Cold storage key used for: Wallet operations. Receiving/Sending funds and receiving farming rewards.

The downside of that solution is that you will not have direct access to your wallet and XCH. Would you want to do an XCH operation you will have to manually import the cold storage key. The upside is: even if your computer is compromised the attacker will not be able to access your wallet. Since the private key receiving rewards will not be stored on it.

Configuration steps:
* Create a second key for "wallet" operation purposes: `chia keys generate`
* Write down the mnemonic on a paper you will not lose. If you lose it your key and XCH will be lost for ever !
* Remember the fingerprint for the next step
* Find the "First wallet address": `chia keys show` and copy it
* Open `~/.chia/mainnet/config/config.yaml`
* Edit: `xch_target_address: XXX` replace it with the newly generated "First wallet address".
  * There should be two occurrence of `xch_target_address`. One under the `farmer` section and the other one under the `pool` section.
* Save the file and close it.
* Delete the second key: `chia keys delete -f <fingerprint>`
  * /!\ **Caution**: make sure you have a backup of the 24 words mnemonic or you will lose access to the key for ever.
* It should prompt a WARNING message like
> Deleting private_key with fingerprint `<fingerprint>`
> WARNING: using a farmer address which we don't have the private keys for. We searched the first 500 addresses. Consider overriding `<cold-storage-wallet-address>` with `<farmer-wallet-address>`
* Make sure the `<cold-storage-wallet-address>` corresponds to your second key wallet address.

Your setup is complete. Your machine can farm XCH and rewards will be sent to the key that you stored on paper.
Would you need to transfer funds you can add it back to your computer's chia keychain by doing: `chia keys add`

## TODO
- [ ] How to setup different keys for plotting / farming / wallet (3 keys).
  - [ ] How to create plots for another farming private key.


# Chia Seeder User Guide

# Chia Seeder
![Alt text](https://www.chia.net/img/chia_logo.svg)

The Chia Seeder & Crawler is a tool to keep track of the most reliable nodes on the Chia network. Each instance of the Chia Seeder maintains its own separate list of IP addresses of these nodes.

It does so by crawling through the network, periodically revisiting known nodes from its list. If a node is either no longer available, or has exhibited untoward behavior, the Chia Seeder instance removes that node from its list.

The Chia Seeder runs a mini-DNS server. Anyone can obtain an entry point into Chia’s decentralized and permissionless network via a simple DNS request for reliable node IPs. 

The Chia Seeder has very low memory and CPU requirements. 

Chia’s core developers have already been running an instance of the Chia Seeder for some time. You can view the current status of this instance by running:
`dig dns-introducer.chia.net` for IPv4, or
`dig -t AAAA dns-introducer.chia.net` for IPv6 (see instructions at the end of this document if you don’t have “dig” installed).

Chia has now decided to release the Seeder as a tool for anyone to maintain their own list of reliable nodes, which contributes to the further decentralization of Chia’s network by taking this tool off of the core team’s hands.

Features:
* Implements peer statistics and exponentially moving averages over various time-windows, akin to those maintained by its relative, the bitcoin-seeder: https://github.com/sipa/bitcoin-seeder
* Runs a mini-DNS server on port 53, along with a full node to crawl the network.
* Stores peer IPs and peer statistics into a database, so that they are persisted across runs.

## Expectations for Chia Seeder operators
The Chia network core developers endeavor to minimize the level of trust in the DNS servers associated with a Chia Seeder. In this regard, it is expected for each Chia Seeder to be run by an individual or organization recognized as well-intentioned within the Chia community (at the company’s discretion).

This entails following good host security practices, maintaining control of the underlying infrastructure, and not transferring control of the Chia Seeder they operate.

Logging of DNS queries must not be retained longer than necessary (as might be required for the operation of the service), and must not be communicated to any third-party.

Each entity maintaining a Chia Seeder DNS server is encouraged to make publicly available the details of their operating practices.

In keeping with all the previous recommendations, a reachable email address must be published for inquiries regarding said operating practices.

## Installation

```
$ sh install.sh
$ . ./activate
$ chia init
```
You most certainly will want to specify your own configuration of a domain name server. Do so by editing the config file located at `~/.chia/mainnet/config/config.yaml`, or by running `chia configure`. Please refer to the relevant section below for more details, or enter `$ chia configure --help`.

## Special instructions on Ubuntu

On Ubuntu, it is possible that systemd-resolved already binds port 53. The Chia Seeder's built-in DNS server is run on the same port, and systemd-resolved takes precedence by default. 

Special instructions to free port 53 are provided here (points #2 and #3): https://github.com/team-exor/generic-seeder#exclamation-special-instructions-for-ubuntu-users-exclamation

This amounts to editing `/etc/systemd/resolved.conf` so as to disable binding of systemd-resolved to port 53, or, alternatively, entirely disabling the systemd-resolved service.

## Configuration

The config file is `.chia/mainnet/config/config.yaml` The default values are for running a DNS seeder for mainnet. At the very least, in the `seeder:` section of config.yaml, the variables `domain_name`, `nameserver` and `soa` need to be changed to reflect the NS entry for your server in a domain record. 

For a local DNS server setup, you will need control of a top-level domain (TLD) allowing administrator access for the purpose of creating additional DNS entries. Any domain registrar should be fine to use. 

Note that while it may be possible to use an existing domain, it is recommended to register a new domain name to specifically run the Chia Seeder address.

Proceed by logging into your domain registrar and navigating to the section pertaining to managing DNS records for your domain. Next, click or activate the button or mechanism for creating a new DNS record. Finally, create a new DNS record of type "A", along with another new DNS record of type "NS".

For instance, if you want to run a Chia Seeder's DNS server on `my-chia-seeder.example.com`, an authoritative NS record in `example.com`'s domain record will be required, which might point, e.g., to `vps.example.com`. 

You can check that this is the case by running the following command (please ensure that you have `dig` on your system by installing the `dnsutils` or `bind9-dnsutils` package; for instance, on Ubuntu, `$ sudo apt install dnsutils` or `$ sudo apt install bind9-dnsutils`):
```
$ dig -t NS my-chia-seeder.example.com
```
whose output should display, among other information, the following:
```
;; ANSWER SECTION
my-chia-seeder.example.com.    86400    IN    NS    vps.example.com
```

For another example on how to set-up "A" and "NS" records for your domain using DigitalOcean, please refer to the following video, from 9:40 onward: https://www.youtube.com/watch?v=DsaxbwwVEXk&t=580s

## Running

```
$ . ./activate
$ chia start seeder crawler
```
will run both a crawler and a DNS server.
Alternatively,
```
$ . ./activate
$ chia start crawler
```
gives you the option to merely crawl the network so as to get a list of the connectable nodes, without having to set up a DNS server.

## Stopping

```
$ . ./activate
$ chia stop -d all
```


# FreeBSD Install

# Building Chia from Source for FreeBSD

_**Tested on FreeBSD 11.3- and 11.4-RELEASE**_

***

## Upgrading Existing Chia Installs

If you're upgrading from a previously built chia installation, exit from your previous venv environment (```deactivate```), create a new directory in which to place the latest Chia (e.g. ```mkdir ~/chia-1.0.5 && cd ~/chia-1.0.5```), clone the latest repo (```git clone https://github.com/Chia-Network/chia-blockchain.git -b latest```), enter it and create a new Python virtual environment within it (```python3 -m venv venv```). Now, activate the newest environment (```. venv/bin/activate```), upgrade pip (```pip install --upgrade pip```). Now you may skip down to the [clvm_rs install section](#clvm_rs) and begin there.

***

## Why This Manual Installation?

Currently the only way to ensure Chia builds on FreeBSD is to do it from the source. By following these instructions to the letter, you should have no problem building the latest Chia from source on a FreeBSD 11.3 or 11.4. This should also work on FreeBSD 12, possibly with some modifications - e.g. if the ports py-cryptography version is newer than 3.3.2, simply edit as needed - or if your preferred Python version is 3.8+ it should all still work considering you modify the package names as necessary.

### Notes on FreeNAS (TrueNAS)

If you had been using NFS or Samba sharing to expose your plots to a harvester on another OS, such as Linux, you can instead build Chia within a jail (see the FreeNAS manual for 'jails'), expose your plot directories to it and run the harvester within. In my experience, it provides lower-latency and more reliable access to the plots since the disks are direct-attached and not being provided through an extra few layers of network protocols.

If you are using a fresh jail created by the FreeNAS web GUI you may need to install openssh and setup a ssh key to login as root because by default it appears PAM password logins do not work. The jail shell CLI provided by the FreeNAS GUI allows copy and pasting so you can easily paste your public-key into /root/.ssh/authorized_keys && chmod -R 700 /root/.ssh.

These instructions would be applicable to 11.3 and 11.4 jails created within FreeNAS 11 only. Version 12 (FreeBSD 12) ✔

### Other Notes

These instructions will have you building both chia-blockchain and clvm_rs from github source, and python-cryptography from FreeBSD's ports.

The result of this build will be the "chia version" showing the current release branch ahead by 1 and in "dev0"; for instance building 1.0.1 results in "chia version" returning "1.0.2.dev0". If someone knows why this is and how to fix it, please, edit and correct this! It does not happen on Linux.

_**These instructions assume a fresh FreeBSD 11 installation!**_

### Discouraged?

Following the instructions in this document will result in a working Chia CLI build on FreeBSD 11 if you follow step-by-step starting from a vanilla FreeBSD installation. Is something broken? Compare the commands you typed, accessible in your **bash** shell history, and match them with each command in this document. If you feel you've messed something up, do the following:

```
# if you have (venv) in your shell prompt, type deactivate
deactivate
# remove the chia-blockchain directory which will contain clvm_rs and the Python venv
rm -rf chia-blockchain
# ... now start again! You don't need to do all the setup steps but instead may start at the upgrade notes above if you had finished up to the py-cryptography ports build.
```

### Pre-requisite package installation

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

### gcc notes

After installing gcc version 9.0, this message appears:

```
To ensure binaries built with this toolchain find appropriate versions
of the necessary run-time libraries, you may want to link using

  -Wl,-rpath=/usr/local/lib/gcc9
```

It's probably possible to build the libraries in a way that doesn't require `export LD_LIBRARY_PATH=/usr/local/lib/gcc9`. If you know how click "edit" and dish.

### Install rust, Python, and everything else.

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

### Repo Cloning and Virtual Environment (venv) Activation

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

### Building py-cryptography from ports

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

### clvm_rs

Build and install the current version of clvm_rs (0.1.7).

```
git clone http://github.com/Chia-Network/clvm_rs.git --branch 0.1.7
cd clvm_rs
maturin develop --release
pip install git+https://github.com/Chia-Network/clvm@use_clvm_rs
```

clvm_rs 0.1.7 is now installed in your virtual environment.

### Install py-cryptography to the venv

Copy py-cryptography and its meta-data from the staging directory to your virtual environment:

```
cp -R /usr/ports/security/py-cryptography/work-py37/stage/usr/local/lib/python3.7/site-packages/cryptography ${VIRTUAL_ENV}/lib/python3.7/site-packages/cryptography
cp -R /usr/ports/security/py-cryptography/work-py37/stage/usr/local/lib/python3.7/site-packages/cryptography-3.3.2-py3.7.egg-info ${VIRTUAL_ENV}/lib/python3.7/site-packages/cryptography-3.3.2-py3.7.egg-info
```

Clear any Python byte-code cache files that may contain the old path. These should be re-built by the interpreter but we like a clean environment.
```
find ${VIRTUAL_ENV}/lib/python3.7/site-packages/cryptography -name __pycache__ | xargs -I{} rm -rf "{}"
```

### Chia modifications and Building Chia Itself

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

While you don't absolutely need port 8444 forwarded to your Chia node, it is advised that you do so that other peers may connect to you instead of you solely connecting to them. For the average at-home farmer it is advised you do not disable UPnP unless you absolutely know what you're doing or have another node on your local network already using the port and are planning to [Farm on Many Machines](https://github.com/Chia-Network/chia-blockchain/wiki/Farming-on-many-machines)).

***

## Installed and Ready to Farm!

That's it! Provided the instructions were followed to the T, and the build is a fresh FreeBSD 11.3 or 11.4, either hardware or FreeNAS jailed, you should be good to go! Now go to town with `chia start node` or whatever floats your boat.

More details can be found in the [Chia Quick Start Guide](https://github.com/Chia-Network/chia-blockchain/wiki/Quick-Start-Guide).


# How to Check If Everything is Working (or Not)


:hammer_and_wrench: **A work-in-progress** :hammer_and_wrench:

This doc assumes you know how to use the CLI. Using the CLI is the best way to troubleshoot (and to do everything Chia too). The [Quick Start Guide](https://github.com/Chia-Network/chia-blockchain/wiki/Quick-Start-Guide) and [CLI Commands Reference](https://github.com/Chia-Network/chia-blockchain/wiki/CLI-Commands-Reference) have useful info to get you familiar with the CLI.

## Where to Find Things
The file structure for Linux, macOS, and Windows versions of Chia are similar. 
```
/home/user
├─ .chia/
│   └── mainnet/
│      ├─ config/
│      │      ├─ config.yaml
│      │      └─ ssl/
│      │            └─ (and more...)
│      ├─ db/
│      ├─ log/
│      │      └─ debug.log
│      ├─ run/
│      │      └─ (and more...)
│      └─ wallet/
│             └─ (and more...)
└── /chia-blockchain
       └─ (and more...)
```

### Linux & macOS
* Chia config: `~/.chia/mainnet/config/config.yaml`
* Chia logs: `~/.chia/mainnet/log/`

### Windows
* Chia config:  `C:\Users\%USERNAME%\.chia\mainnet\config\config.yaml`
* Chia logs:  `C:\Users\%USERNAME%\.chia\mainnet\log\`

# Logs

## CLI

You can use the CLI command `chia configure --set-log-level INFO` to set your log level to the useful INFO setting. Be sure to restart Chia after making settings changes.

## Config File

In `config.yaml` you can set the level of detail for your logs. 

Look for this section in `config.yaml`. It’s useful to change the logger setting `log_level` from `WARNING` to `INFO` to get the detail needed to troubleshoot.

```yaml
logging: &id001
    log_filename: log/debug.log
    log_level: INFO
    log_stdout: false
```

You can run `grep`  ([Linux](https://man7.org/linux/man-pages/man1/grep.1.html), [macOS](https://ss64.com/osx/grep.html)) or `Select-String` ([Windows](https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/select-string?view=powershell-7.1)) to search through your logs for relevant information. 

# Is It Working?

If you want to quickly find errors, run this:
* Linux/macOS: `cat ~/.chia/mainnet/log/debug.log | grep -i 'error'`
* Windows: `Get-Content -Path "~\.chia\mainnet\log\debug.log" | Select-String -Pattern "error"`

## Harvester
The time it takes to do a proof challenge should be below 30 seconds. If you see higher times, something is wrong with your setup.

Here are some commands you can use to examine `debug.log` for problems.

* Linux/macOS: `tail ~/.chia/mainnet/log/debug.log | grep eligible`
* Windows:
	* `Select-String -Path “~\.chia\mainnet\log\debug*” -Pattern “eligible”`
	* `Select-String -Path “~\.chia\mainnet\log\debug*” -Pattern “Found [^0] proof”`
	* `Select-String -Path “~\.chia\mainnet\log\debug*” -Pattern “Farmed unfinished_block”`
	* `Get-Content -Path "~\.chia\mainnet\log\debug.log" -Wait | Select-String -Pattern "found"`
    

## Plotting

You can find the documentation for the `check` command on the [CLI Commands Reference - check](https://github.com/Chia-Network/chia-blockchain/wiki/CLI-Commands-Reference#check) page

* To check all your plots, run `chia plots check`. This will check all directories you have listed in your `config.yaml` to contain plots.
* Use `chia plots check -h` to see the options for this command

# Logging Messages Reference

# debug.log
A Chia blockchain node consists of several components that each handle different aspects of farming, harvesting, the wallet and general management of a node.  Each component creates entries in a single log file `debug.log`.  

## Log file location:
|OS|Location|
|---|---|
|Linux|`~/.chia/mainnet/log/debug.log`|
|Windows|`%systemdrive% %homepath% \.chia\mainnet\debug.log` (`C:\Users\<username>\.chia…`)|
|MacOS|`/Users/<username>/.chia/mainnet/log/debug.log`|

## Log file management:
By default, Chia allows debug.log to grow to 20MB, and then rotates the file by closing debug.log, renaming it to debug.log.1, and renames any existing older log files to debug.log.x, to a maximum of 7 old log files.  If a log rotation is required and all 7 old log files exist, the oldest log file is overwritten with the next earliest file; resulting in a maximum of 160MB of the most recent messages being stored.  

## Log detail level:
Chia is shipped with the debug.log only containing messages at the WARN or ERROR level.  Many of the messages needed to fully monitor a node are only visible at the INFO level.  Changes to the logging level can be done in the `config.yaml` file in the `mainnet/config` folder.

## Change the log level output:
You are looking for the first reference to logging in the file that looks like this:
```
farmer:
  logging: &id001
    log_filename: log/debug.log
    log_level: WARN
    log_stdout: false
```
Change the log_level to INFO, save the file, and restart the node.

## Node Components:
|Component|Function|
|---|---|
|farmer_server | Signage stuff about signs and things|<br>
|harvester_server|Gathers and shares plot information|<br> 
|timelord_server|Manages Verifiable Delay Functions for the node|<br>
|wallet_server|Controls wallet functions|<br>
|full_node_server|This component manages the node|<br>

## Log message format:
|Field|Content|
|---|---|
|Date/time | in ISO format, in local timezone|<br>
|Node Component | see the list above|<br>
|Log Level | ERROR, WARN, INFO|<br>
|Directional Arrow | |<br>
|Message |see below|<br>


## Log messages confirming node health:
1. “x plots were eligible for farming” – this message from harvester shows how the node responds to challenges.  The x value shows how many plots passed the initial filter, [more on filters here.](https://github.com/Chia-Network/chia-blockchain/wiki/FAQ#what-is-the-plot-filter-and-why-didnt-my-plot-pass-it)  
> * The block prefix is shown, and the “Found y proofs.” The y value shows how many plots were accepted as proofs, and usually the value is zero. Most of the time if there is a proof you win, but not always as described [in the FAQ.](https://github.com/Chia-Network/chia-blockchain/wiki/FAQ#is-it-possible-to-have-a-proof-but-not-get-a-reward)  
> * Next is “Time: x.xxx s.” which shows how long the node took to respond to the challenge.  The network requires a response in less than 28 seconds from the time the challenge was originated, so a recommended response time is less than 5 seconds. If this value is greater than 3 seconds a warning will be displayed in the GUI.
> * Finally “Total x plots” shows the number of plots recognized by the node.  If this doesn't look right [check your plots are valid.](https://github.com/Chia-Network/chia-blockchain/wiki/FAQ#how-do-i-know-if-my-plots-are-ok)
2. “Updated Wallet peak to height x, weight y” message from the wallet_blockchain component.  Value x is the current height of the blockchain, and should match the Height shown in the `chia show -s` command.  This indicates that the node wallet is fully synced with the network.  If that is not the case [check here for a common solution.](https://github.com/Chia-Network/chia-blockchain/wiki/FAQ#why-is-my-wallet-not-synced-why-can-i-not-connect-to-wallet-from-the-gui)
3. `<other key messages>`

## Other normal log messages:

|Component	|Message	|Direction	|Destination	|Cross component|Comment|
|---|---|---|---|---|---|
mempool_manager	|add_spendbundle took x seconds|||||
mempool_manager	|It took x to pre validate transaction|||||
full_node|Added unfinished_block x, not farmed by us|||||
full_node|Already compactified block:|||||
full_node|Duplicate compact proof.  Height: x||||
full_node|Finished signage point x/64: ||||
full_node|Scanning the blockchain for uncompact blocks.||||
full_node|Updated peak to height x|||||
full_node_server|new_compact_vdf|to/from|peer|||
full_node_server|new_peak|to/from|peer|||
full_node_server|new_peak_timelord|to|localhost|from timelord_server||
full_node_server|new_peak_wallet|to|localhost|from wallet_server||
full_node_server|new_signage_point|to|localhost|from farmer_server||
full_node_server|new_signage_point_or_end_of_sub_slot|to/from|peer|||
full_node_server|new_transaction|to/from|peer|||
full_node_server|new_unfinished_block|to/from|peer|||
full_node_server|new_unfinished_block_timelord|to/from|localhost|||
full_node_server|request_block|to/from|peer|||
full_node_server|request_block_header|from|localhost|to wallet_server||
full_node_server|request_compact_vdf|to/from|peer|||
full_node_server|request_compact_proof_of_time|to|localhost|from timelord_server||
full_node_server|request_signage_point_or_end_of_sub_slot|to/from|peer|||
full_node_server|request_transaction|to/from|peer|||
full_node_server|request_unfinished_block|to/from|peer|||
full_node_server|respond_block|to/from|peer|||
full_node_server|respond_compact_vdf|to/from|peer|||
full_node_server|respond_signage_point|to/from|peer|||
full_node_server|respond_transaction|to/from|peer|||
full_node_server|respond_unfinished_block|to/from|peer|||
wallet_server|request_block_header|to|localhost|from full_node||
wallet_server|respond_block_header|from|localhost|to full_node||
wallet_server|new_peak_wallet|from|localhost|to full_node||
wallet_blockchain|Updated Wallet peak to height x, weight y||||
timelord_server|new_peak_timelord|from|localhost|to full_node||
timelord_server|new_unfinished_block_timelord|from|localhost|to full_node||
timelord_launcher|VDF client x: VDF Client: Discriminant =||||
VDF Client|Sending Proof, Sent Proof, Stopped everything!||||
harvester_server|farming_info|to/from|localhost|||
harvester_server|new_signage_point_harvester|from|localhost|to farmer_server||
harvester|x plots were eligible for farming||||
plot_tools|Loaded a total of x plots of size y in z seconds||||
plot_tools|Searching directories||||
farmer_server|new_signage_point|from|localhost|to full_node||
farmer_server|farming_info |from|localhost|to full_node||
farmer_server|new_signage_point_harvester|to|localhost|from harvester||

| Source | Level | Message | Description |
|  ---      | --- | --- | --- |
|daemon asyncio  | ERROR |   Task exception was never retrieved future: `<Task finished coro=<WebSocketServer.statechanged() done, defined at src\daemon\server.py:316> exception=ValueError('list.remove(x): x not in list')>`
|full_node asyncio                 | ERROR |   SSL error in data received protocol: `<asyncio.sslproto.SSLProtocol object at 0x7f762544a8>`
|full_node full_node_server        | ERROR |   Exception: Failed to fetch block `N` from {'host': `IP ADDRESS`, 'port': 8444}, timed out, {'host': `IP ADDRESS`, 'port': 8444}. | Peer disconnected, other peer connections will take over|
|full_node full_node_server        | ERROR |Exception:  `<class 'concurrent.futures._base.CancelledError'>`, closing connection None.|Peer disconnected
|full_node full_node_server            | WARNING | [Errno 32] Broken pipe `IP Address`|Peer disconnected|
|full_node full_node_server            | WARNING | Cannot write to closing transport `IP Address`|Peer disconnected|
|harvester src.plotting.plot_tools    | WARNING | Not farming plot `plotfilename`. Size is `filesize` GiB, but expected at least: 99.06 GiB. We assume the file is being copied.| Periodic scan for new plots have discovered partial file - OK if you are in the middle of copying a file|
|harvester src.plotting.plot_tools | WARNING | Directory: `Dir1` does not exist. | One of your monitored plot folders is no longer accessible - eg external drive offline - if permanent remove from GUI or `chia plots remove -d <Dir1>`|
|harvester src.plotting.plot_tools | WARNING | Have multiple copies of the plot `plotfilename`, not adding it.||
|harvester src.plotting.plot_tools | INFO |    Not checking subdirectory `Dir1/directory`, subdirectories not added by default ||
|full_node full_node_server            | INFO    | Connection closed: `IP Address`, node id: `hex`|Peer disconnected|
|full_node src.full_node.full_node     | INFO    | ⏲️  Finished signage point `N`/64: `hex`
|full_node src.full_node.full_node     | INFO    | Added unfinished_block `hex`, not farmed
|harvester src.plotting.plot_tools | INFO |    Searching directories [`Dir1`,`Dir2`] ||
|harvester src.plotting.plot_tools | INFO |    Loaded a total of `N` plots of size `size` TiB, in `time` seconds||
|harvester src.harvester.harvester | INFO |`X` plots were eligible for farming `hex`... Found `Y` proofs. Time: `Time` s. Total `Z` plots|This is a vital message and should be seen at regular intervals. Note that `Time` is ideally < 1s. If drive is in sleep mode, may show ~10 seconds, and should be prevented |
| wallet src.wallet.wallet_blockchain | INFO | 💰 Updated wallet peak to height `HEIGHT`, weight `WEIGHT`, ||


# OpenBSD Install

# Install Chia on OpenBSD

_Tested with Chia 1.1.4 on OpenBSD/amd64 6.8_

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

More details can be found in the [Chia Quick Start Guide](https://github.com/Chia-Network/chia-blockchain/wiki/Quick-Start-Guide).

# GUI Build / Usage

*WARNING: the following has only been tested with Chia 1.0beta7 on OpenBSD/amd64 6.7*

The build instructions in the previous sections above must be completed successfully before attempting to build the GUI using the procedure below.

*WARNING: Although the following steps have been used successfully, the resulting GUI will be run with an older version of electron than is recommended by the Chia Network team. This may result in unexpected problems.*

## Prerequisite package installation

As root (or using doas / sudo), first install some additional OpenBSD packages required for GUI usage:

```bash
pkg_add -i electron
```

## Build

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

## Launch GUI
The GUI can now be launched using the following commands:

```bash
cd chia-blockchain
. ./activate

cd chia-blockchain-gui
npm run electron
```

# Passphrase Protected Chia Keys and Key Storage Migration

# Passphrase Protected Chia Keys and Key Storage Migration


## Overview

We are introducing a new feature that allows users to specify a passphrase to protect their Chia keys across all currently supported platforms. Along with passphrase protection, this feature also introduces a new keyring file for storing those keys. By implementing a common key storage format, moving Chia keys between installations is greatly simplified, eliminating the need to re-enter each key’s 24-word mnemonic. Any keys stored in the new keyring will be encrypted using a key derived from the specified passphrase.

## :warning: Important
Chia is unable to assist with the recovery of a forgotten passphrase. Be sure to **backup the 24-word mnemonic** for each of your keys. If you forget your passphrase, you will be able to recover by importing your keys from their 24-word mnemonic.


## Motivation
Chia’s supported platforms each provide different solutions for storing sensitive data, with varying levels of security and different user experiences per platform. In addition, these platform dependent solutions for storing sensitive data did not provide a mechanism for the user to passphrase-protect Chia keys outside of whatever protection the OS already provided. On Linux, the cryptfile keyring Python module has been used with a fixed key. On macOS, the Keychain is used to securely store each key, sometimes requiring one or more system prompts to authorize access to the key material. This resulted in a system where keys were considered to be secure on systems, but that level of security was subjective to individual use cases and OS configuration, and not suitable for everyone’s needs. Our primary goals with this passphrase feature have been to grant more control to our users, uniformly secure Chia keys, and to simplify the task of moving keys from one installation to another.

## New Keyring
The new keyring file is a YAML document named “keyring.yaml”. Upon launch, Chia will automatically create an empty “keyring.yaml” file residing at:

`%HOMEDRIVE%%HOMEPATH%/.chia_keys/keyring.yaml` (Windows)

`~/.chia_keys/keyring.yaml` (macOS and Linux)

Note that in this release, any new keys created or imported will be stored in the new keyring.yaml file and not in the previous location.

Keys in this new keyring file are encrypted using ChaCha20-Poly1305 (RFC 7539, Section 2.8 - https://datatracker.ietf.org/doc/html/rfc7539.html#section-2.8) which provides encryption and authentication (AEAD). The encryption key is derived from the user’s passphrase using PBKDF2 with SHA-256 (RFC 2898 - https://datatracker.ietf.org/doc/html/rfc2898)

## Migration
:warning: **IMPORTANT**: We **STRONGLY** recommend that users create backups of their 24-word mnemonic before migrating their keys.

Existing users with keys will want to migrate their keys from the previous location to the new keyring.yaml file, and optionally protect those keys with a passphrase. We recommend all users create a strong passphrase. On macOS and Windows, users will have the option to save their passphrase to the macOS Keychain or Windows Credential Manager respectively, allowing for Chia to run unattended (such as after a reboot due to a power failure).

When launching the Chia GUI application, a migration prompt will automatically appear if existing keys are detected. The GUI migration process is nearly instantaneous and will not delete or modify those keys that were found. It’s strongly encouraged that users perform the migration step right away to move to the new keyring. If necessary, it’s possible to skip the migration step and continue using Chia as before, however, any attempts to add or delete a key will first require completion of the migration process. In a future release, we will include a prompt in the GUI to purge keys found in the old locations so that key material isn’t left lingering once migrated.

From the command line interface, keyring migration can be initiated by setting a passphrase for the new keyring, or by adding or deleting a key. When performing keyring migration from the command line, the user will have the option of deleting those old keys that were found and successfully migrated.

Note, it is possible to migrate keys to the new key storage and not set a passphrase. In this case, the keyring.yaml file will remain encrypted with a fixed key. When you remove a passphrase, that passphrase will also be removed from the macOS Keychain or Windows Credential Manager (if saved there by the user).

## Command Line Reference

### Setting/Updating/Removing Passphrases
Setting or updating a passphrase for keyring.yaml. This will prompt for keyring migration as necessary.
`chia passphrase set`

When setting a passphrase, an optional hint may be specified. This hint will be displayed by the GUI when prompting for your keyring passphrase.
`chia passphrase set --hint “Summer of 2020”`

Removing a passphrase from keyring.yaml. Note, keyring.yaml always keeps keys stored in an encrypted form. Without a user-specified passphrase, a fixed encryption is used.
`chia passphrase remove`

### Passphrase Hints
A passphrase hint can be set to assist in remembering the keyring passphrase. The hint data is stored in keyring.yaml as cleartext (not encrypted).

Setting a passphrase hint when a passphrase is in use. This command will fail if a passphrase hasn’t been previously set.
`chia passphrase hint set “Summer of 2020”`

Removing a passphrase hint. This command will fail if a passphrase and passphrase hint haven’t been previously set.
`chia passphrase hint delete`

Displaying a passphrase hint. This command will fail if a passphrase and passphrase hint haven’t been previously set.
`chia passphrase hint display`

### Reading Passphrases From a File
Passphrases may be accessed from a file (or file descriptor on macOS/Linux) to assist with automated workflows. Note that whitespace is not stripped from the passphrase when read from a file. For example:

Reading the passphrase from a file
`chia --passphrase-file “~/.my_chia_passphrase” keys show`

Reading the passphrase from another process (on macOS/Linux)
`chia --passphrase-file <(echo -n ‘my super secure passphrase’) keys show`

## Additional Notes
On macOS and Windows, an option is available to save the passphrase to the OS-provided secure credential store (macOS Keychain or Windows Credential Manager). This option may help with automated workflows, but carries a risk that other processes may be able to read the saved passphrase without requiring user authorization. For this reason, it’s recommended that users only save their passphrase if they fully trust their environment.

To facilitate downgrading to a prior version of Chia, keys will be left intact in their old locations after migration (unless migrating from the command line, and the option to delete old keys was selected.)

If necessary, it’s possible to temporarily disable passphrase support as well as usage of the new keyring. To disable passphrase and keyring support, set the `CHIA_PASSPHRASE_SUPPORT` environment variable to `false` and run Chia as you normally would. Once disabled, Chia will use the old location for key retrieval and storage. Example:
`$ export CHIA_PASSPHRASE_SUPPORT=false; chia start farmer`


# Raspberry Pi

Update: Try our [experimental GUI installer](https://download.chia.net/latest/ARM64-Ubuntu-gui) for Raspberry Pi OS 64 and Ubuntu 20.04 LTS or newer on ARM64.

Tom's Hardware now has a [nice piece on farming with the Pi](https://www.tomshardware.com/how-to/raspberry-pi-chia-coin).

> **_NOTE:_** The Raspberry Pi 3 is not supported.

> **_NOTE:_** It is highly recommended you put the Chia blockchain and wallet DB on an SSD (or NVMe) drive. Do not use the SD card for the blockchain or wallet DB location.

> **_NOTE:_** We do not recommend running the Chia GUI on the Pi4 4GB model

The following recipe was tested on a Pi 4 (4GiB RAM) running both Ubuntu Server 20.04 LTS 64 bit and Raspbian 64 bit. 64 bit OSes and python 3.7+ are required but helpfully Ubuntu 20.04 has python 3.8 out of the box and Raspbian ships with python 3.7. You can't just run a 64 bit kernel with a 32 bit OS install as you need 64 bit python 3.7+ also.

This was tested with [Raspberry Pi Imager](https://www.raspberrypi.org/downloads/), using image _Ubuntu Server 20.04 LTS (Pi 3/4) 64 bit_, and Raspbian 64 bit using the _2020-08-20-raspios-buster-arm64.zip_ image. We make available manylinux2014 ARM64 binary wheels for the main chia dependencies which makes installing on Raspberry Pi pretty easy. 

We recommend setting up swap in all cases on the 4GB Pi4 version

For Ubuntu 20.04 LTS, 1024MiB is suggested:
```bash
sudo dd if=/dev/zero of=/swap bs=1M count=1024
sudo chmod 600 /swap ; sudo mkswap /swap ; sudo swapon /swap
```

Add this line to /etc/fstab so that swap available on reboot.

```bash
/swap swap swap defaults 0 0
```

For Raspbian 64:

You need 1000/1024MiB of swap space. Here is an excellent [walk through of increasing swap space](https://pimylifeup.com/raspberry-pi-swap-file/) on Raspbian 64.

First some setup:

```bash
# Make sure you have a couple of requirements to compile items that aren't in binary form
sudo apt-get install -y build-essential python3-dev

# If you are not using Raspbian 64 (it pre-specifies it) add this
export PIP_EXTRA_INDEX_URL=https://www.piwheels.org/simple/

# Make sure you have 64 bit Python 3
python3 -c 'import platform; print(platform.architecture())'
```

Then proceed with a relative usual install process:

```bash
git clone https://github.com/Chia-Network/chia-blockchain.git -b latest
cd chia-blockchain

sh install.sh
. ./activate
chia init

# Optionally generate keys - can be done in the GUI later
chia keys generate

# Or you can import from 24 words
chia keys add

# and then enter your 24 words
```

But you are getting an error related to not being able to find a blspy version that satisfies 0.3.1 you say or `ERROR: Could not find a version that satisfies the requirement clvm-rs==0.1.3`? Frankly, with any install error message, you're probably trying to install on 32 bit Raspbian. You can check by running `uname -a` and if it says arm7l you need a 64 bit version of your favorite OS. `uname -a` should end with `aarch64 GNU/Linux`.

The Pi isn't cut out to be a Timelord and the Timelord requirements are very x86-64 specific currently and there is one piece of magic. You don't need this magic anymore now that chiavdf comes from a binary wheel on PyPi but we're leaving this here for people trying to build in other environments. This environment variable is set so that chiavdf doesn't attempt to compile Timelord components.

```bash
export BUILD_VDF_CLIENT=N
```

It is feasible to plot with the Pi but it's slow. Modern desktops and laptops plot in the 0.07 - 0.10 GiB/minute range and the Pi 4 plots at 0.025 GiB/minute. [Plotting times for Pi 4](https://github.com/Chia-Network/chia-blockchain/wiki/k-sizes#raspberry-pi-4) and other machines are available. Pi makes an excellent node/farmer/harvester however and is an economical machine to run and farm plots made on faster plotting machines and then transferred to it to harvest/farm.

## Headless

You can run without the GUI using commands like `chia init`, `chia start farmer`, and `watch 'chia show -s -c'`. Be sure to check out `chia show -h` if you do. It is also possible to [remotely connect the UI to a headless node](https://github.com/Chia-Network/chia-blockchain/wiki/Connecting-the-UI-to-a-remote-daemon).

## Installing and running the GUI on Ubuntu 20.04 or Raspbian 64 bit

```
sh install-gui.sh
cd chia-blockchain-gui
npm run electron &
```







  