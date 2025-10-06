---
title: Node Syncing
slug: /reference-client/troubleshooting/node-syncing
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Using the Official Database Snapshot Torrent

:::note
This process assumes you already have chia installed and all files are present in their default locations, to confirm make sure the `~/.chia/mainnet/db/` directory exists.

If you are upgrading from a version prior to Chia 2.1.0, verify your config file (`~/.chia/mainnet/config/config.yaml`) has the correct value under the `full_node` section for `database_path` (v1 vs the current v2):
`db/blockchain_v2_CHALLENGE.sqlite`

When starting chia for the first time with the database snapshot it can take upwards of 30 minutes for it to verify the db and load.  
:::

Using the GUI:

1. Download the torrent file from https://www.chia.net/downloads/#database-checkpoint (mainnet and testnet database torrents are available)
2. Use a torrent client to download the full db (bittorrent, qbittorrent, and transmission have be used successfully for this)
3. Unpack/reassemble the torrent file that was downloaded (on windows one can use 7zip, Mac and linux have built in tools that work for this)
4. Move the db and associated files to the correct folder (`~/.chia/mainnet/db/` is the default location for these files)

Using the CLI (Linux and MacOS only):

<Tabs
defaultValue="linux"
groupId="source"
values={[
{label: 'Linux', value: 'linux'},
{label: 'MacOS', value: 'macos'},
]}>
<TabItem value="linux">

1. Set your network (change to `testnet11` for the testnet db):

```bash
NETWORK="mainnet"
```

2. Install a torrent client (aria is used in the below examples, other torrent clients can be used).

```bash
sudo apt install aria2
```

3. Download the torrent using the network identifier set earlier. Note this can take a couple of hours depending on network speeds.

```bash
aria2c --seed-time=0 "https://torrents.chia.net/databases/$NETWORK/$NETWORK.latest.tar.gz.torrent" --dir="$HOME/Downloads"
```

4. Unpack the DB using the network identifier and wildcard for the date in the file name

```bash
ARCHIVE=$(find "$HOME/Downloads" -name "$NETWORK.*.tar.gz" -type f | sort -r | head -n1) && echo "Extracting $ARCHIVE - this may take upwards of 35 minutes with no visible progress..." && { tar -xf "$ARCHIVE" -C "$HOME/Downloads" || { echo "Error: Extraction failed, please verify the file downloaded properly and try again"; } }
```

5. Move the db and associated files to the correct folder. Make sure to update the final directory path if needed and note that any existing files with the same names will be overwritten.

```bash
echo "Moving files to Chia directory - this may take upwards of 5 minutes with no visible progress..." && mv -f "$HOME/Downloads/blockchain_v2_$NETWORK.sqlite" ~/.chia/mainnet/db/ && mv -f "$HOME/Downloads/height-to-hash" ~/.chia/mainnet/db/ && mv -f "$HOME/Downloads/sub-epoch-summaries" ~/.chia/mainnet/db/
```

</TabItem>
  <TabItem value="macos">

1. Set your network (change to `testnet11` for the testnet db):

```bash
NETWORK="mainnet"
```

2. Install a torrent client (aria is used in the below examples, other torrent clients can be used).

```bash
brew install aria2
```

3. Download the torrent using the network identifier set earlier. Note this can take a couple of hours depending on network speeds.

```bash
aria2c --seed-time=0 "https://torrents.chia.net/databases/$NETWORK/$NETWORK.latest.tar.gz.torrent" --dir="$HOME/Downloads"
```

4. Unpack the DB using the network identifier and wildcard for the date in the file name

```bash
ARCHIVE=$(find "$HOME/Downloads" -name "$NETWORK.*.tar.gz" -type f | sort -r | head -n1) && echo "Extracting $ARCHIVE - this may take upwards of 35 minutes with no visible progress..." && { tar -xf "$ARCHIVE" -C "$HOME/Downloads" || { echo "Error: Extraction failed, please verify the file downloaded properly and try again"; } }
```

5. Move the db and associated files to the correct folder. Make sure to update the final directory path if needed and note that any existing files with the same names will be overwritten.

```bash
echo "Moving files to Chia directory - this may take upwards of 5 minutes with no visible progress..." && mv -f "$HOME/Downloads/blockchain_v2_$NETWORK.sqlite" ~/.chia/mainnet/db/ && mv -f "$HOME/Downloads/height-to-hash" ~/.chia/mainnet/db/ && mv -f "$HOME/Downloads/sub-epoch-summaries" ~/.chia/mainnet/db/
```

  </TabItem>
</Tabs>

## Port Forwarding Settings

Forwarding port 8444 can solve some sync issues and it also helps improve Chia's overall network health.

Port 8444 is the [port](https://en.wikipedia.org/wiki/Port_%28computer_networking%29) through which other Chia nodes can communicate with your node. When you set up port forwarding on port 8444, the Chia software on your computer allows other nodes to easily communicate and sync the Chia blockchain with your node.

When the network undergoes rapid growth and expansion the newly arriving Chia nodes may not initially open port 8444, resulting in difficulty finding available nodes to sync with. Therefore, it is strongly recommended that you enable port forwarding.

With the Chia software running, use [this port checker](https://portchecker.co/) to check if your IP address is accepting outside connections on port 8444. Further port forwarding configurations may still be necessary on your router (or VPN software).

## Port Forwarding Settings

Port forwarding is done on your router (or VPN software). How you set it up depends on your router's make and model. Look through your router's manual or just search for "`<your router name and model>` how to port forward" to get started.

When you enable port forwarding, you are allowing any system on the Internet to connect to your Chia node through port 8444 to the Chia software.

If your router has UPNP enabled the Chia software by default `enable_upnp: true` will attempt to automatically configure port forwarding, if your router disabled UPNP then you will need to manually configure port forwarding.

Most routers will ask you from where you are allowing and to what you are connecting to. You want to set up port forwarding to allow any outside connection to connect to the IP address of your main node on your network through port 8444. Router manufacturers might call the settings different things, but the concept is always the same: Outside computers connecting through port 8444 to your computer.

Here are the settings most routers will ask for:

- Set connection type to _TCP_ or _TCP & UDP_
- Destination (or forwarding) IP address - This is your main node (computer) IP address on your internal network; search online on how to do this for your type of computer. If you search for "what is my IP address" it will give you your external IP address, this is not the one you want.
- Originating (or from) IP address - Set this to all or sometimes just an asterisk may be used `*`

Running multiple full nodes on the same local network often requires unique IP and Port settings in both the router and Chia software to avoid conflicts, you may also need to disable UPNP `enable_upnp: false` in the Chia `config.yaml` file or your router if it is enabled.

## Why forward port 8444?

All newly added nodes are completely dependent on nodes that are allowing port forwarding, because they are the only nodes in which they can sync with. The more nodes there are that don't allow port forwarding can cause a bottleneck to those nodes that do have it enabled.

If you enable port forwarding, your node will sync faster, and you will be helping to ensure the stability and overall health of the Chia network.

## Speed up connecting to nodes

If you would like to speed up connectivity to other nodes and increase your sync speed, add the introducer node to your Chia client:

<Tabs
defaultValue="mainnet"
groupId="introducers"
values={[
{label: 'Mainnet', value: 'mainnet'},
{label: 'Testnet11', value: 'testnet11'},
]}>

  <TabItem value="mainnet">

    - Mainnet Introducer: `introducer.chia.net:8444`

    Note: please only use the CNI operated nodes as a last resort for connecting to peers, these nodes might be running different client versions and are not intended to be used as trusted full nodes.
    - CNI Operated Full Node: `node.chia.net`

    Additionally, you can also visit either of the below websites that are frequently updated with available nodes listening on port 8444:
    - [ChiaNodes.com](https://ChiaNodes.com)
    - [chia.keva.app](https://chia.keva.app)

  </TabItem>
  <TabItem value="testnet11">

    - DNS Introducer: `dns-introducer-testnet11.chia.net`
    - Legacy Introducer: `introducer-testnet11.chia.net:58444`

    Note: please only use the CNI operated nodes as a last resort for connecting to peers, these nodes might be running different client versions and are not intended to be used as trusted full nodes.
    - CNI Operated Full Node: `testnet11-node.chia.net`

  </TabItem>
</Tabs>

Nodes (IPs) from these sites can be added in the GUI from the Full Node tab, select the Full Node button in the top right corner and then choose "Connect to Other Peers". You can also add nodes via the CLI with the command `chia peer full_node -a PEER_ADDRESS:PORT` where `PORT` will typically be 8444.

## Detailed explanation

A regular pc can communicate out with endless ports-- if the user is sending a signal out -- pc opens a port -- signal goes out, pc closes the port. Chia uses port 8444 as instant verified communication. So an open port can allow instant communication and start the blockchain sync. Signal comes in on port 8444- that Chia pc is verified, then both user's pc, opens their own "communication ports ex port 8421" and that new user can now sync and now they are linked together forming part of Chia mesh.

If the users port 8444 is closed, the users pc has to start sending multiple signals out and hope that a pc with open port 8444 will link with them, then the sync starts. (1) pc can only link up a few pc and with so many other Chia users coming on board, they all have to wait. Keep in mind, Chia is built on a mesh network, the blockchain is shared among all the users, not from central pc.

## Dealing With Carrier-Grade NAT

Have you opened port 8444 on your router but still not getting connections? With the exhaustion of the IPv4 network space, it's increasingly common for ISPs to use [Carrier-Grade NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT) (CGN, CG-NAT, NAT444) by placing multiple customers behind a single IP address. In this case, even if you open 8444 on your router, other nodes will not be able to connect to you. There are a couple options:

1. Ask your ISP for a dedicated IP address. They'll probably want more money and may require you to upgrade to a "business" plan.

2. Establish a VPN tunnel through the NAT to a cloud server with a public IP address. It's easier than it sounds and can cost as little as $3-5 a month for a cheap cloud server (some common cloud server providers: AWS, GCP, Digital Ocean, Vultr, Hetzner, Linode). When selecting a provider and server size, pay careful attention to bandwidth; a Chia fullnode isn't too demanding, but can require several GB per day. 1 TB per month is typical of lower-cost VPSs and should be plenty (do keep an eye on it though, bandwidth overage costs can be expensive!).

Setting up a VPN used to be a daunting task, but [Wireguard](https://www.wireguard.com) has greatly simplified it. The summary is you run Wireguard on both your home server and the cloud server:

- the cloud server is configured to listen for VPN connections from your home server and route all traffic incoming on 8444 to your home server, while also routing outgoing traffic from your home server to the internet.
- the home server is configured to route all internet traffic (but not local) through the cloud server, while periodically sending a "keepalive" packet to ensure the connection stays open.

Here is a more detailed write-up with [example wireguard configuration](https://www.kmr.me/posts/wireguard/).

## Community Nodes

:::warning

We **never** recommend connecting to a community node. This section will detail why.

:::

A "community node" (AKA an untrusted node) is a node that other farmers can connect to, in order to avoid having to run their own full node.

While this may seem like a convenient setup, community nodes are inherently not secure, and we therefore never recommend connecting to them. The primary issue is that the community node can steal farmer rewards. The reason for this is because the farmer service was created with the security assumption that it would only connect to a local/trusted node.

This means that:

- The farmer never verifies anything that the node puts into a block
  - The farmer blind-signs whatever the node sends it
  - The farmer doesn't verify the reward address
- The community node can therefore modify the reward address before the farmer signs a block
- Any modifications we could make to the farmer would have widespread ripple effects to the rest of the node software, so we won't support any such modifications

In summary, if you farm using a community node, that node can steal all of your farming rewards as you earn them. The way to avoid this scenario is to run your own node.

Luckily, a high-powered system is not required to run a Chia node. In fact, the [minimum supported node hardware](https://docs.chia.net/chia-blockchain/coin-set-model/costs/#farming-spec) is the Raspberry Pi with a cheap external SSD to hold the database file. In order to expedite the process of syncing your full node, you can download a [database checkpoint](https://www.chia.net/downloads/#database-checkpoint).

## Database Schema Compatibility Issues

### Chia 2.5.5+ Schema Changes

Starting in Chia 2.5.5, the mempool has undergone backwards incompatible schema changes to support new fast-forward functionality and optimizations. These changes can cause database compatibility issues when connecting nodes running different versions.

#### Symptoms

- **`Database schema version mismatch`** errors
- **`Invalid spent_index value`** errors
- **Connection refused** when trying to connect to nodes running different versions
- **Node fails to start** after upgrading from earlier versions

#### Downgrade Database Fix

If you need to downgrade from Chia 2.5.5+ back to an earlier version, you must first fix the database schema incompatibility. Run this command to reset the spent index values:

```bash
python -c "import sqlite3, sys, os; conn = sqlite3.connect(os.path.expanduser(sys.argv[1])); cursor = conn.execute('UPDATE coin_record SET spent_index = 0 WHERE spent_index = -1'); print(f'Updated {cursor.rowcount} records'); conn.commit(); conn.close()" <path to the db>
```

**Replace `<path to the db>`** with the actual path to your Chia database file (typically `~/.chia/mainnet/db/blockchain_v2_mainnet.sqlite`).

**Warning**: This command modifies your blockchain database. Only use it if you are certain you need to downgrade, and always backup your database first.

#### Prevention

- Always upgrade all nodes simultaneously when possible
- Test upgrades on testnet before applying to mainnet
- Keep backups of your database before major version changes
- Ensure all connected nodes are running compatible versions
