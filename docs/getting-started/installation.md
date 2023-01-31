---
title: Installation
slug: /installation
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

Chia is a cryptocurrency and blockchain with smart transaction capabilities. Its [Proof of Space and Time](/consensus-intro) is the only Nakamoto consensus algorithm since Proof of Work, and has a [much lower energy consumption](https://chiapower.org).

Chia's mainnet was launched on March 19, 2021. Development of its ecosystem is ongoing, with primitives released for [CATs](https://chialisp.com/cats), [NFTs](https://chialisp.com/nfts), [Offers](https://chialisp.com/offers), and [DIDs](https://chialisp.com/dids).

Chia's software is easy to install. You can start earning cryptocurrency rewards by storing plot files on your hard drive and leaving the machine running.

## Installation {#install}

Installer binaries for each platform can be found on our [official downloads page](https://www.chia.net/downloads), which is the only source that should be trusted. While this is the easiest way to install the Chia client, some may instead prefer to install Chia from source or by using the command line.

### Using the CLI

```mdx-code-block
<Tabs
  defaultValue="apt"
  groupId="install"
  values={[
    {label: 'APT', value: 'apt'},
    {label: 'YUM', value: 'yum'},
    {label: 'DNF', value: 'dnf'},
]}>
<TabItem value="apt">
```

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

```mdx-code-block
</TabItem>
<TabItem value="yum">
```

```bash
# Install packages
sudo yum install -y yum-utils
sudo yum-config-manager --add-repo https://repo.chia.net/rhel/chia-blockchain.repo

# Install chia-blockchain
sudo yum install chia-blockchain

# Use chia-blockchain-cli for CLI only
```

```mdx-code-block
</TabItem>
<TabItem value="dnf">
```

```bash
# Install packages
sudo dnf install 'dnf-command(config-manager)'
sudo dnf config-manager --add-repo https://repo.chia.net/rhel/chia-blockchain.repo

# Install chia-blockchain
sudo dnf install chia-blockchain

# Use chia-blockchain-cli for CLI only
```

```mdx-code-block
</TabItem>
</Tabs>
```

### From Source

```mdx-code-block
<Tabs
  defaultValue="linux-macos"
  groupId="source"
  values={[
    {label: 'Linux/MacOS', value: 'linux-macos'},
    {label: 'Windows', value: 'windows'},
]}>
<TabItem value="linux-macos">
```

:::note
Make sure you have [Python 3.10](https://www.python.org/downloads/release/python-3109) and [Git](https://git-scm.com/downloads) installed.
:::

```bash
# Download chia-blockchain
git clone https://github.com/Chia-Network/chia-blockchain

# Install dependencies
sh install.sh

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
. ./venv/bin/activate

# Initialize
chia init
```

```mdx-code-block
</TabItem>
<TabItem value="windows">
```

:::note
Make sure you have [Python 3.10](https://www.python.org/downloads/release/python-3109) and [Git](https://git-scm.com/downloads) installed.
:::

```bash
# Download chia-blockchain
git clone https://github.com/Chia-Network/chia-blockchain

# Install dependencies
./Install.ps1

# Create virtual environment
py -m venv venv

# Activate virtual environment
. ./venv/Scripts/Activate.ps1

# Initialize
chia init
```

```mdx-code-block
</TabItem>
</Tabs>
```

## Directory Structure

All data used by the Chia blockchain is stored at the location set with the `CHIA_ROOT` environment variable, which defaults to `~/.chia/mainnet` if unset.

The blockchain database is stored under the `db` subdirectory. It is possible to copy the database file to use as a backup or put on another machine. To resync the full node from the start, delete the database file and restart the node.

The config file under the `config` subdirectory. Its name is `config.yaml`, and it can be used to find the root cause of problems.

It is possible to configure the `CHIA_ROOT` environment variable to another location. A common use for this would be to switch it to `~/.chia/testnet` to have a separate config for the testnet.

## CLI Setup

Using the CLI gives greater and more precise control over the various Chia services such as the full node. For a more details on the commands, read the [CLI Reference](/cli).

````mdx-code-block
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

```bash
~\AppData\Local\Programs\Chia\resources\app.asar.unpacked\daemon
```

To be able to use these commands without going to that directory in the terminal, add it to the path.

This can be done by doing the following:

- Right-click on the Start menu
- Click on "System"
- Click "Advanced system settings"
- Click "Environment variables"
- Double-click "Path"
- Click "Add"
- Enter the path shown above

</TabItem>
<TabItem value="Linux" label="Linux">

:::note
If you installed Chia from source, the CLI will not require any further setup.
:::

If you installed Chia with the Linux installer files, the CLI commands are stored in one of the following locations:

```bash
/usr/lib/chia-blockchain/resources/app.asar.unpacked/daemon/chia
/lib/chia-blockchain/resources/app.asar.unpacked/daemon/chia
```

To be able to use these commands without going to that directory in the terminal, add it to the path.

This can be done by running either of the following commands, depending on which path is used:

```bash
export PATH=/usr/lib/chia-blockchain/resources/app.asar.unpacked/daemon/chia:$PATH
export PATH=/lib/chia-blockchain/resources/app.asar.unpacked/daemon/chia:$PATH
```

To load this on startup, add it to the `.bashrc`, `.bash_profile`, or `.zshrc` file depending on which is used by the shell.
</TabItem>
</Tabs>
````

### Install GUI

The GUI is a simpler method of interacting with Chia, and it can be installed manually from the CLI.

````mdx-code-block
<Tabs>
  <TabItem value="MacOS / Linux" label="MacOS / Linux" default>

```bash
. ./install-gui.sh
cd chia-blockchain-gui
npm run electron &
```

</TabItem>
<TabItem value="Windows" label="Windows">

```bash
. .\Install-gui.ps1
cd chia-blockchain-gui
Start-Process -NoNewWindow npm run electron
```

</TabItem>
</Tabs>
````

### Initial Startup

Whereas the GUI will set everything up automatically, the setup needs to be done manually on the CLI.

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
