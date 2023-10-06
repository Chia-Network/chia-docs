---
title: Node Syncing
slug: /node-syncing
---

Port forwarding port 8444 can solve many sync issues and it helps improve Chia's network health.

Port 8444 is the [port](https://en.wikipedia.org/wiki/Port_%28computer_networking%29) through which other Chia computers can communicate with your PC. When you set up port forwarding on port 8444, the Chia software on your computer can quickly talk to other PCs, link up, and start downloading and syncing with the Chia blockchain.

The network is undergoing rapid growth and expansion. Many of the newly arrived Chia peers (computers) do not open up port 8444. It makes it very hard for the network. So please port forward on port 8444!

Use [this port checker](https://portchecker.co/) to check if your router's port 8444 is closed.

# What to Do

Port forwarding is done on your router. How you set it up depends on your router's make and model. Look through your router's manual or just search for "`<your router name and model>` how to port forward" to get started.

When you port forward you want to allow outside IP addresses to connect to your main node (computer) through port 8444 to the Chia software.

## Port Forwarding Settings

Most routers will ask you from where you are allowing and to what you are connecting to. You want to set up port forwarding to allow any outside connection to connect to the IP address of your main node on your network through port 8444. Router manufacturers might call the settings different things, but the concept is always the same: Outside computers connecting through port 8444 to your computer.

Here are the settings most routers will ask for:

- Set connection type to _TCP_ or _TCP & UDP_
- Destination (or Forwarding) IP address - This is your main node (computer) IP address on your internal network; search online on how to do this for your type of computer. If you search for "what is my IP address" it will give you your external IP address, this is not the one you want.
- Originating (or From) IP address - Set this to all or sometimes just an asterisk may be used `*`

## Why forward port 8444?

All peers (computers) with a closed port 8444 are completely dependent on pc peers with open port 8444. They are the only PCs they can talk to. If you got 1,000 nodes with an open port 8444, but 20,000 nodes with a closed port 8444, trying to sync, it will only just be able to theoretically have enough IP's estimated 3,000 can sync at a time, while the other wait for another open Chia user with open port 8444. Right now (Mid April '20) it seems that number is even much worse. And it causes a scenario where there just isn't enough open port 8444 peers to serve all the closed port 8444 peers. The only way around this is to ensure that you got an open port 8444.

If you somehow are able to open up your port 8444 you will quickly have peers connecting to you and have a much easier time to get connections established.

## Speed up connecting to nodes

If you would like to speed up connecting to other nodes and syncing, add one of these introducer nodes:

- North Asia `introducer-ap-northeast-1.chia.net:8444`
- South Asia `introducer-ap-southeast-1.chia.net:8444`
- Western North America: `introducer-us-west-2.chia.net:8444`
- Eastern North America `introducer-us-east-1.chia.net:8444`
- Europe: `introducer-eu-west-2.chia.net:8444`

There is a public node share the available 8444 peers every hour.

- [chia.keva.app](https://chia.keva.app)

These can be added in the GUI via the button, or via the CLI with `chia show -a PEER_ADDRESS:PORT` where `PORT` will usually be 8444.

# Detailed explanation

A regular pc can communicate **out** with endless ports-- if the user is sending a signal out -- pc opens a port -- signal goes out, pc closes the port.
Chia uses port 8444 as instant verified communication. So an open port can allow instant communication and start the blockchain sync. Signal comes in on port 8444- that Chia pc is verified, then **both** user's pc, opens their own "communication ports ex port 8421" and that new user can now sync and now they are linked together forming part of Chia mesh.

If the users port 8444 is closed, the users pc has to start sending multiple signals out and hope that a pc with open port 8444 will link with them, then the sync starts. (1) pc can only link up a few pc and with so many other Chia users coming on board, they all have to wait. Keep in mind, Chia is built on a mesh network, the blockchain is shared among all the users, not from central pc.

## Dealing With Carrier-Grade NAT

Opened port 8444 on your router but still not getting connections? With the exhaustion of the IPv4 space, it's increasingly common for ISPs to use [Carrier-Grade NAT](https://en.wikipedia.org/wiki/Carrier-grade_NAT) (CGN, CG-NAT, NAT444) to put multiple customers behind a single IP address. In this case, even if you open 8444 on your router, other nodes will not be able to connect to you. There are a couple options:

1. Ask your ISP for a dedicated IP address. They'll probably want more money, and may require you to upgrade to a "business" plan.

2. Establish a VPN tunnel through the NAT to a cloud server with a public IP address. It's easier than it sounds, and can cost as little as $3-5 a month for a cheap cloud server (some common cloud server providers: AWS, GCP, Digital Ocean, Vultr, Hetzner, Linode). When selecting a provider and server size, pay careful attention to bandwidth; a Chia fullnode isn't too demanding, but can require several GB per day. 1 TB per month is typical of lower-cost VPSs and should be plenty (do keep an eye on it though, bandwidth overage costs can be expensive!).

Setting up a VPN used to be a daunting task, but [Wireguard](https://www.wireguard.com) has greatly simplified it. The summary is you run Wireguard on both your home server and the cloud server:

- the cloud server is configured to listen for VPN connections from your home server, and route all traffic incoming on 8444 to your home server, while also routing outgoing traffic from your home server to the internet.
- the home server is configured to route all internet traffic (but not local) through the cloud server, while periodically sending a "keepalive" packet to ensure the connection stays open.

Here is a more detailed write-up with [example wireguard configuration](https://www.kmr.me/posts/wireguard/).
