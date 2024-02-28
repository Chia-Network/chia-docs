---
title: Node Syncing
slug: /troubleshooting/node-syncing
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Forwarding port 8444 can solve many sync issues and it also helps improve Chia's overall network health.

Port 8444 is the [port](https://en.wikipedia.org/wiki/Port_%28computer_networking%29) through which other Chia nodes can communicate with your node. When you set up port forwarding on port 8444, the Chia software on your computer can easily communicate with other nodes and sync the Chia blockchain faster.

The network is undergoing rapid growth and expansion. Many newly arriving Chia nodes do not open port 8444, resulting in additional stress to the network. Therefore, it is strongly recommended that you enable port forwarding.

Use [this port checker](https://portchecker.co/) to check if you have port forwarding configured correctly.

# What to Do

Port forwarding is done on your router. How you set it up depends on your router's make and model. Look through your router's manual or just search for "`<your router name and model>` how to port forward" to get started.

When you enable port forwarding, you are allowing any system on the Internet to connect to your Chia node through port 8444 to the Chia software.

## Port Forwarding Settings

Most routers will ask you from where you are allowing and to what you are connecting to. You want to set up port forwarding to allow any outside connection to connect to the IP address of your main node on your network through port 8444. Router manufacturers might call the settings different things, but the concept is always the same: Outside computers connecting through port 8444 to your computer.

Here are the settings most routers will ask for:

- Set connection type to _TCP_ or _TCP & UDP_
- Destination (or forwarding) IP address - This is your main node (computer) IP address on your internal network; search online on how to do this for your type of computer. If you search for "what is my IP address" it will give you your external IP address, this is not the one you want.
- Originating (or from) IP address - Set this to all or sometimes just an asterisk may be used `*`

## Why Forward Port 8444?

All newly added nodes are completely dependent on nodes that are allowing port forwarding, because they are the only nodes in which they can sync with. The more nodes there are that don't allow port forwarding can cause a bottleneck to those nodes that do have it enabled.

If you enable port forwarding, your node will sync faster, and you will be helping to ensure the stability and overall health of the Chia network.

## How to Speed Up Connecting to Nodes

If you would like to speed up connectivity to other nodes and increase your sync speed, add one of these introducer nodes to your Chia client:

<Tabs
  defaultValue="mainnet"
  groupId="introducers"
  values={[
    {label: 'Mainnet', value: 'mainnet'},
    {label: 'Testnet11', value: 'testnet11'},
  ]}>

  <TabItem value="mainnet">

    - North Asia: `introducer-ap-northeast-1.chia.net:8444`
    - South Asia: `introducer-ap-southeast-1.chia.net:8444`
    - Western North America: `introducer-us-west-2.chia.net:8444`
    - Eastern North America: `introducer-us-east-1.chia.net:8444`
    - Europe: `introducer-eu-west-2.chia.net:8444`
    
    Additionally, you can also visit either of the below websites that are frequently updated with available nodes listening on port 8444:
    - [ChiaNodes.com](https://ChiaNodes.com)
    - [chia.keva.app](https://chia.keva.app)

  </TabItem>
  <TabItem value="testnet11">

    - DNS Introducer: dns-introducer-testnet11.chia.net
    - Legacy Introducer: introducer-testnet11.chia.net:58444
    
    Note: please only use the CNI operated nodes as a last resort for connecting to peers, these nodes might be running different client versions and are not intended to be used as trusted full nodes.
    - CNI Operated Full Node: testnet11-node.chia.net

  </TabItem>
</Tabs>

Nodes (IPs) from these sites can be added in the GUI from the Full Node tab, select the Full Node button in the top right corner and then choose "Connect to Other Peers". You can also add nodes via the CLI with the command `chia peer full_node -a PEER_ADDRESS:PORT` where `PORT` will typically be 8444.

Have you opened port 8444 on your router but still not getting connections? With the exhaustion of the IPv4 network space, it's increasingly common for ISPs to use [Carrier-Grade NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT) (CGN, CG-NAT, NAT444) by placing multiple customers behind a single IP address. In this case, even if you open 8444 on your router, other nodes will not be able to connect to you. There are a couple options:

1. Ask your ISP for a dedicated IP address. They'll probably want more money and may require you to upgrade to a "business" plan.

2. Establish a VPN tunnel through the NAT to a cloud server with a public IP address. It's easier than it sounds and can cost as little as $3-5 a month for a cheap cloud server (some common cloud server providers: AWS, GCP, Digital Ocean, Vultr, Hetzner, Linode). When selecting a provider and server size, pay careful attention to bandwidth; a Chia fullnode isn't too demanding, but can require several GB per day. 1 TB per month is typical of lower-cost VPSs and should be plenty (do keep an eye on it though, bandwidth overage costs can be expensive!).

Setting up a VPN used to be a daunting task, but [Wireguard](https://www.wireguard.com) has greatly simplified it. The summary is you run Wireguard on both your home server and the cloud server:

- the cloud server is configured to listen for VPN connections from your home server and route all traffic incoming on 8444 to your home server, while also routing outgoing traffic from your home server to the internet.
- the home server is configured to route all internet traffic (but not local) through the cloud server, while periodically sending a "keepalive" packet to ensure the connection stays open.

Here is a more detailed write-up with [example wireguard configuration](https://www.kmr.me/posts/wireguard/).

