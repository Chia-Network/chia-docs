---
slug: /guides/crash-course/introduction
title: Introduction
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This course is designed to give you an end-to-end introduction to Chia. We'll start off with a foundational understanding of the Chia blockchain. This includes what blockchains are for and what makes Chia different from other options. Once you understand the basics, we'll learn about plotting and farming. Finally, we'll cover many of the DeFi possibilities including fungible tokens (CATs), non-fungible tokens (NFTs), and writing custom coins in Chialisp.

:::info
Chialisp is Chia's on-chain programming language for writing custom coins. If you want to skip ahead to development, see the [Intro to Chialisp section](/guides/crash-course/intro-to-chialisp) of this course.
:::

## Intro to Chia

The goal of cryptocurrency is to transfer monetary value on a peer-to-peer decentralized network. This means that there is no centralized intermediary to facilitate the transaction. Instead, blockchain relies on a network of nodes to confirm transactions according to some rules. Additionally, cryptocurrency makes the exchange of value extremely fast and easy, even for cross-border payments.

However, cryptocurrencies can be used for more than just facilitating digital payments. We are seeing many projects pop up that are designed as decentralized applications, or **dApps**. The value of a cryptocurrency is not only in its ability to be used for buying and selling goods, but also that it is designed to host applications without a centralized authority.

Each person who runs a Chia blockchain node runs a full copy of the software and is required to adhere to the consensus algorithm. This allows for peer-to-peer transactions confirmed against an entire network of nodes as opposed to a single entity.

### Consensus

As new transactions are added to the network, full nodes must confirm these transactions. For a decentralized network to work, every node must be in agreement with every other node. This means they must follow the same rules.

The rules are known as the **consensus** and are rules defined in the software every node must adhere to.

Chia follows a consensus algorithm known as **Proof of Space and Time** (PoST). The way it works is by utilizing hard drive space and elapsed time as your contribution to the network. This is required to prevent what's known as a [Sybil attack](https://en.wikipedia.org/wiki/Sybil_attack).

Chia is intentionally different than networks that use **Proof of Stake** (PoS). Many argue that staking has a centralizing effect on proof of stake networks as there are much fewer decision-making nodes, and they continue to gain power. Chia, on the other hand, has over 100K full nodes all following the PoST consensus mechanism, a protocol that is similar to that of Bitcoin (but with less electricity usage required).

### Decentralization

For a network to be decentralized, we want the creation of a full node to be possible for many. Ideally, running a full node would be as permissionless as possible.

Anyone can become a full node in Chia. The majority of computers can handle the technical requirements with many people even running off of a Raspberry Pi. A full node can be ran with less storage requirements and computing power. These smaller requirements for a full node allow for stronger decentralization.

Farmers in the network are those who designate hard drive storage to support the network. The more space you reserve, the higher chances you have of confirming a block and getting rewarded Chia (XCH). As you'll learn, the network has grown so much that solo farming can be quite unrewarding with massive times to win. Pooling was introduced as a solution to more evenly distribute farming rewards based on your space contribution.

Pooling is possible with other major cryptocurrencies, but a major difference is that the Chia network designed an official protocol where the individual farmers confirm their blocks rather than the pool. This completely removes the problem of centralization introduced by current **Proof of Work** (PoW) mining. Centralized mining power puts the integrity of the network in question as large pools are capable of easily performing 51% attacks. This specific centralization problem is not a problem with the pooling protocol, even if a single farming pool maintained a majority of the network.

Essentially:

- Chia is a blockchain that is decentralized.
- It uses significantly less electricity.
- It offers dApp capabilities with the Chialisp programming language.

## Getting Started

You can refer to the [Installation page](/installation) to download and install the Chia client. The installer is usually the simplest and we will go through how to set up the `chia` command for CLI use.

To make the commands as close as possible across operating systems I recommend Windows users [download Git](https://git-scm.com/download/win), which comes with Git bash. You can of course use Windows Command Prompt or PowerShell, but commands may be slightly different.

Before we get started using the CLI, we need to be able to issue the `chia` command.

Use this line in Git Bash / terminal:

```mdx-code-block
<Tabs groupId="OS"
  defaultValue="windows (Git Bash)"
  values={[
    {label: 'Windows (Git Bash)', value: 'windows (Git Bash)'},
    {label: 'Linux/MacOS', value: 'nix'},
  ]}>
  <TabItem value="windows (Git Bash)">
```

```bash
~/AppData/Local/chia-blockchain/app-1.5.1/resources/app.asar.unpacked/daemon/chia.exe
```

```mdx-code-block
  </TabItem>
  <TabItem value="nix">
```

```bash
/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia
```

```mdx-code-block
  </TabItem>
</Tabs>
```

Response:

```
Usage: chia.exe [OPTIONS] COMMAND [ARGS]...

  Manage chia blockchain infrastructure (1.5.1)

Options:
  --root-path PATH                Config file root  [default:
                                  C:\Users\calebcurry\.chia\mainnet]

  --keys-root-path PATH           Keyring file root  [default:
                                  C:\Users\calebcurry\.chia_keys]

  --passphrase-file FILENAME      File or descriptor to read the keyring
                                  passphrase from

  --force-legacy-keyring-migration / --no-force-legacy-keyring-migration
                                  Force legacy keyring migration. Legacy
                                  keyring support will be removed in an
                                  upcoming version!

  -h, --help                      Show this message and exit.

Commands:
  configure   Modify configuration
  db          Manage the blockchain database
  farm        Manage your farm
  init        Create or migrate the configuration
  keys        Manage your keys
  netspace    Estimate total farmed space on the network
  passphrase  Manage your keyring passphrase
  plotnft     Manage your plot NFTs
  plots       Manage your plots
  plotters    Advanced plotting options
  rpc         RPC Client
  run_daemon  Runs chia daemon
  show        Show node information
  start       Start service groups
  stop        Stop services
  version     Show chia version
  wallet      Manage your wallet

  Try 'chia start node', 'chia netspace -d 192', or 'chia show -s'

```

Using this path each time can get old, so you have the option of creating an alias or environment variable.

```mdx-code-block
<Tabs groupId="OS"
  defaultValue="windows (Git Bash)"
  values={[
    {label: 'Windows (Git Bash)', value: 'windows (Git Bash)'},
    {label: 'Linux/MacOS', value: 'nix'},
  ]}>
  <TabItem value="windows (Git Bash)">
```

```bash
alias chia=~/AppData/Local/Programs/Chia/resources/app.asar.unpacked/daemon/chia.exe
```

```mdx-code-block
  </TabItem>
  <TabItem value="nix">
```

```bash
alias chia=/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia
```

```mdx-code-block
  </TabItem>
</Tabs>
```

Now, you can just say:

```bash
chia
```

## Getting Started with the CLI

Once you can issue the `chia` command, the differences between operating systems are minimal.

To gain more experience in Chia and to be more comfortable with troubleshooting you should become comfortable with the command line interface (this will allow you to interact with Chia through the terminal). A lot of other tools like madMAx plotter also are commonly used through the terminal.

:::info
madMAx is a software created as an alternative way of creating plots for Chia. The software performed great and was ultimately brought in to the official software. This is the easiest way to get started created plots with Chia.
:::

The instructions to use the CLI depends on the operating system, you can get the exact instructions in [this document](https://github.com/Chia-Network/chia-blockchain/wiki/CLI-Commands-Reference).

So the goal is to be able to use the `chia` command from the terminal. On mac, you can issue `/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia`.

Add this to your path with `PATH=/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon:$PATH`. This will allow you to just type `chia` in the terminal without everything else.

Now that you have the CLI running you can initialize Chia.

```bash
chia init
```

```bash
chia keys generate
```

:::info Fingerprints
It's possible to manage multiple keys from a single Chia client. These will be identified by a **fingerprint**. In `chia wallet show` you'll see a message like `fingerprint: 1660000549`.

Working with only a single fingerprint in your client is easier as if you have multiple you'll often need to specify which fingerprint you want to use. For example. here is the usuage for `chia wallet send`:

```bash
chia wallet send [OPTIONS]

Options:

  ...

  -f, --fingerprint INTEGER       Set the fingerprint to specify which wallet
                                  to use

  ...

```

By managing just a single wallet, all of your chia commands can be simplified by leaving off the `-f` option.

:::

## Getting on Testnet

If you are already on a testnet, skip to [instructions for the CLI](#cli).

For most dev work on Chia, you'll want to be on the testnet. That way, you're learning with fake Chia and don't put any funds at risk.

:::info

If you were previously running on mainnet, you will have a list of mainnet peers stored in the following file:

```
~/.chia/mainnet/db/peers.dat
```

Be sure to **rename or delete** this file when you convert your system to running on testnet. If you do not do this, your system will eventually drop its mainnet peers and add new testnet peers, but this could take a long time.

One way to speed up the peer discovery process even more is to run the [add-nodes bash script](https://github.com/wallentx/farm-and-ranch-supply-depot/blob/main/bin/extra/add-nodes). Note that this script won't work on Windows. Your mileage also may vary on Linux and MacOS.

:::

Run the following commands to instruct your node to connect to the testnet:

```bash
chia stop all -d
```

```bash
chia configure --testnet true
```

```bash
chia start farmer
```

Response:

```
chia_harvester: started
chia_farmer: started
chia_full_node: started
chia_wallet: started
```

## CLI

At this point you should be able to use the CLI to get information about your farm and confirm you are on testnet.

```bash
chia show --state
```

Response:

```
Network: testnet10    Port: 58444   RPC Port: 8555
Node ID: 67095d445d879556da95feeee70174c66b131d4f29bd447df5fbc56789a01f24
Genesis Challenge: ae83525ba8d1dd3f09b277de18ca3e43fc0af20d20c4b3e92ef2a48bd291ccb2
Current Blockchain Status: Not Synced. Peak height: 1462514
      Time: Wed Aug 31 2022 13:49:51 EDT                  Height:    1462514

Estimated network space: 1.181 TiB
Current difficulty: 708
Current VDF sub_slot_iters: 70778880
Total iterations since the start of the blockchain: 3364480016373

  Height: |   Hash:
  1462514 | d799fedae1ef226669f61ad843c5ae7947b42e596664f39fd68fcd299e076916
  1462513 | 0764f546d9186da788485ce69ebe91969e8cf9495722d9567d67e54e3e3e6ed3
  1462512 | d6132b015365b7609d0b5179b9daf9e4fd2ad7a9040ec1d13e15df65660cf69e
  1462511 | 8ae2273b4a86fd9af85837c538faa75b572014ac281c6c51ad1eb4ce2a7f8072
  1462510 | fb392a40b7e3bf38c8628311224b5aaa4a32ecdea403c16ae5d3c48d16b57f47
  1462509 | 012b1f9213bf823e6b73408019f18ff8330e46b911ba78c1d64fd5019d6cc6d9
  1462508 | e0f66ca2e00566eee9a3ce4028b6aa11771aa42c9bce34f296d89f42d1a909ce
  1462507 | c900e2fb449db0def030a3c0e6a8bff5d23f6470730236120bcac442b2f1ab0f
  1462506 | 39db9fe7658b545dcf45e8e99797c937b7b93a041485ef28bf9cda2b3529ac0a
  1462505 | ca343b0e985fe9dafb7cba7cee0c1515c6bddd732e2542b8fbd49ac8d90c13f3

```

Ideally, you'll see within this response a value like `Current Blockchain Status: Syncing 1462514/1462514 (0 behind)` showing that you are syncing.

<details>
<summary>Testnet Database</summary>

For many things you will need a synced full node. Fortunately, an official [testnet database](https://downloads.chia.net/testnet10/) download is available, which can be a much faster option than syncing from scratch.

Once this file is downloaded, stop your node:

```bash
chia stop all -d
```

Now, **unzip the file** and replace the `blockchain_v2_mainnet.sqlite` database file in `/Users/<username>/.chia/mainnet/db` directory.

Once this is complete, you can restart chia.

```bash
chia start farmer
```

Now, you can confirm your sync height. It should be much closer to the peak height of the blockchain.

```bash
chia show --state
```

</details>

## Getting TXCH

For the rest of this workshop you will need some TXCH (Testnet Chia). You can get some for free from the [official Chia faucet](https://testnet10-faucet.chia.net/).

For this you will need a receive address.

```bash
chia wallet get_address
```

Example response:

```bash
txch14hdpnww04nezf9y7gmsdaryjtqpgnyrv6set8fykdx7v8u3jjvps5xjxre
```

Once this transaction has been added to the blockchain and your wallet sees it, you will have a TXCH balance.

```bash
chia wallet show
```

Example response:

```
Chia Wallet:
   -Total Balance:         0.899259999996 txch (899259999996 mojo)
   -Pending Total Balance: 0.899259999996 txch (899259999996 mojo)
   -Spendable:             0.899259999996 txch (899259999996 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

<details>
<summary>Sending Chia</summary>
You can send Chia through the CLI as well. This requires a little more information, but isn't too bad.

The command looks like this:

```bash
chia wallet send -i 1 -a <amount in XCH> -m <amount in fee in XCH> -t <target address>
```

The `-i 1` is the wallet ID. Later on we will have multiple wallet IDs to store different types of assets (tokens). For now, `-i 1` refers to the default Chia wallet as seen in the `-Wallet ID` response from the `chia wallet show` command.

Any Chia keys will have multiple receive addresses. You can test sending Chia by sending some to yourself (or a friend). Take a note of the response from `chia wallet get_address` command.

```bash
chia wallet send -i 1 -a .01 -m 0 -t txch14hdpnww04nezf9y7gmsdaryjtqpgnyrv6set8fykdx7v8u3jjvps5xjxre
```

Response:

```
Submitting transaction...
Transaction submitted to nodes: ...
Run 'chia wallet get_transaction -f 1660000549 -tx 0x468399be58604e7199f6899d838d3206fada9c12b29f545410616856413457c7' to get status
```

```bash
chia wallet get_transaction -f 1660000549 -tx 0x468399be58604e7199f6899d838d3206fada9c12b29f545410616856413457c7
```

Response:

```
Transaction 468399be58604e7199f6899d838d3206fada9c12b29f545410616856413457c7
Status: In mempool
Amount sent: 0.01 TXCH
To address: txch14hdpnww04nezf9y7gmsdaryjtqpgnyrv6set8fykdx7v8u3jjvps5xjxre
Created at: 2022-09-08 10:52:15
```

You can see `Status: In mempool`, which means a full node has not yet confirmed the transaction. This can take some time if the network is busy or if you did not include a fee. Ultimately we want this command to return `Status: Confirmed`.

You can see all your transactions as well:

```bash
chia wallet get_transactions
```

Response:

```
...

Transaction 2aa603c52e4b56b8af41a489081056de40421a6398caf4fbdc8be861eb210b2e
Status: Confirmed
Amount received in trade: 0.01 TXCH
To address: txch1ttx32j6lg9c6d4jhf9rdpugk7ulmuxsz4u42jdmy5xr94t933q5skfv0av
Created at: 2022-09-01 13:40:07

Transaction 29dd86e548957ff90bebd83aaa11f5e5f0fa4978f9c207252137dcbed40b2222
Status: Confirmed
Amount sent in trade: 0.01 TXCH
To address: txch1qyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszqgpqyqszf0rpn
Created at: 2022-09-01 13:40:07

...
```

</details>
At this point you have a Chia wallet and a basic understanding of the CLI. You should now be able to move on to the next section which will introduce many of the Chia primitives including CATs, offers, and NFTs.
