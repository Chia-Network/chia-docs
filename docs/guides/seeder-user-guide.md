---
title: Seeder User Guide
slug: /guides/seeder-user-guide
---
# Seeder User Guide

The Chia Seeder & Crawler is a tool to keep track of the most reliable nodes on the Chia network. Each instance of the Chia Seeder maintains its own separate list of IP addresses of these nodes.

It does so by crawling through the network, periodically revisiting known nodes from its list. If a node is either no longer available, or has exhibited untoward behavior, the Chia Seeder instance removes that node from its list.

The Chia Seeder runs a mini-DNS server. Anyone can obtain an entry point into Chia’s decentralized and permissionless network via a simple DNS request for reliable node IPs. 

The Chia Seeder has very low memory and CPU requirements. 

Chia’s core developers have already been running an instance of the Chia Seeder for some time. You can view the current status of this instance by running:
```bash
# IPv4
dig dns-introducer.chia.net

# IPv6
dig -t AAAA dns-introducer.chia.net
```

Chia has now decided to release the Seeder as a tool for anyone to maintain their own list of reliable nodes, which contributes to the further decentralization of Chia’s network by taking this tool off of the core team’s hands.

Features:
* Implements peer statistics and exponentially moving averages over various time-windows, akin to those maintained by its relative, the bitcoin-seeder: https://github.com/sipa/bitcoin-seeder
* Runs a mini-DNS server on port 53, along with a full node to crawl the network.
* Stores peer IPs and peer statistics into a database, so that they are persisted across runs.

## Expectations for Chia Seeder operators
The Chia network core developers endeavor to minimize the level of trust in the DNS servers associated with a Chia Seeder. In this regard, it is expected for each Chia Seeder to be run by an individual or organization recognized as well-intentioned within the Chia community.

This entails following good host security practices, maintaining control of the underlying infrastructure, and not transferring control of the Chia Seeder they operate.

Logging of DNS queries must not be retained longer than necessary (as might be required for the operation of the service), and must not be communicated to any third-party.

Each entity maintaining a Chia Seeder DNS server is encouraged to make publicly available the details of their operating practices.

In keeping with all the previous recommendations, a reachable email address or Keybase account must be published for inquiries regarding said operating practices.

There are additional operation considerations for inclusion in the `initial-config.yaml` outlined below.

## Installation

```bash
$ sh install.sh
$ . ./activate
$ chia init
```
You most certainly will want to specify your own configuration of a domain name server. Do so by editing the config file located at `~/.chia/mainnet/config/config.yaml`, or by running `chia configure`. Please refer to the relevant section below for more details, or enter `$ chia configure --help`.

## Special instructions on Ubuntu

On Ubuntu, it is possible that systemd-resolved already binds port 53. The Chia Seeder's built-in DNS server is run on the same port, and systemd-resolved takes precedence by default. 

Special instructions to free port 53 are provided here (points #2 and #3): https://github.com/team-exor/generic-seeder#exclamation-special-instructions-for-ubuntu-users-exclamation

This amounts to editing `/etc/systemd/resolved.conf` so as to disable binding of systemd-resolved to port 53 by setting `DNSStubListener=no`, or, alternatively, entirely disabling the systemd-resolved service. Note that you will likely need to add a nameserver in '/etc/resolv.conf'.
```bash
# Example resolv.conf
nameserver 2001:4860:4860::8888
nameserver 2001:4860:4860::8844
nameserver 8.8.8.8
nameserver 8.8.4.4
```
Once you have completed freeing up port 53, you will then need to allow the python executable in your venv to have access to port 53:
```bash
sudo setcap CAP_NET_BIND_SERVICE=+eip $(readlink -f /home/{{ user }}/chia-blockchain/venv/bin/python)
```
Note that anytime you change the python executable by rerunning `sh install.sh` or when `apt` upgrades python, you will need to re-run this command.

## Configuration

The config file is `.chia/mainnet/config/config.yaml` The default values are for running a DNS seeder for mainnet. At the very least, in the `seeder:` section of config.yaml, the variables `domain_name`, `nameserver` and `soa` need to be changed to reflect the NS entry for your server in a domain record. 

For a local DNS server setup, you will need control of a top-level domain (TLD) allowing administrator access for the purpose of creating additional DNS entries. Any domain registrar should be fine to use. 

:::note
Note that while it may be possible to use an existing domain, it is recommended to register a new domain name to specifically run the Chia Seeder address.
:::

Proceed by logging into your domain registrar and navigating to the section pertaining to managing DNS records for your domain. Next, click or activate the button or mechanism for creating a new DNS record. Finally, create new type "A" and "AAAA" DNS record(s) for `vps.example.com`, which point at the ipv4 and ipv6 address(s) of the server running the seeder along with another new DNS record of type "NS" at `my-chia-seeder.example.com` with the nameserver set to the servers hostname, `vps.example.com`. 

:::note
Note that these names are examples, and as long as the "NS" record points at the hostname of the server, the seeder will work.
:::

You can check that this is the case by running the following command (please ensure that you have `dig` on your system by installing the `dnsutils` or `bind9-dnsutils` package; for instance, on Ubuntu, `$ sudo apt install dnsutils` or `$ sudo apt install bind9-dnsutils`):
```bash
$ dig -t NS my-chia-seeder.example.com
```
whose output should display, among other information, the following:
```bash
;; ANSWER SECTION
my-chia-seeder.example.com.    86400    IN    NS    vps.example.com
```

For another example on how to set-up "A" and "NS" records for your domain using DigitalOcean, please refer to the following video, from 9:40 onward: https://www.youtube.com/watch?v=DsaxbwwVEXk&t=580s

For AWS Route 53 - in the hosted zone you want to use e.g. `example.com` add a "NS"/nameserver record with the `Record name` of `my-chia-seeder` and a value of `vps.example.com`. As of January 2023, the Route 53 web user interface requires you first enter text into the `Record name` field as the Record type of MX will otherwise be greyed out in the pulldown. Then you will create both an A and a AAAA record for `vps.example.com` that corresponds to your vps's IP addresses.

In `config.yaml` the `domain_name` is `my-chia-seeder.example.com.` and the `nameserver` is `vps.example.com.`. Note the trailing periods. The main thing to change in `soa` is adding a correct contact email in `rname` and optionally changing the `serial_number`.

## Running

```bash
$ . ./activate
$ chia start seeder
```
will run both a crawler and a DNS server.
Alternatively,
```bash
$ . ./activate
$ chia start crawler
```
gives you the option to merely crawl the network so as to get a list of the connectable nodes, without having to set up a DNS server.

## Testing

You should test to make sure that the Chia node can connect. 

On a version of chia-blockchain newer than 1.6.2, stop node then delete `peers.dat` in `~/.chia/mainnet/db/`. 

Modify your `config.yaml` to include only your dns seeder. 

If you tail the logs as you start up the node you should see the node connect and obtain both IPv4 and IPv6 nodes. 

```bash
2023-01-14T15:19:30.969 full_node chia.full_node.full_node: INFO     Received 32 peers from DNS seeder, using rdtype = A.
2023-01-14T15:19:31.010 full_node chia.full_node.full_node: INFO     Received 32 peers from DNS seeder, using rdtype = AAAA.
```

Sometimes dns takes a moment so seeing some initial flakiness here is not cause for concern. Just stop again, delete `peers.dat` and try the test again.

## Stopping

```bash
$ . ./activate
$ chia stop -d all
```

## Being included in config.yaml

There are a couple of criteria we all look for when adding a seeder to the initial config file.

You must have an ICANN registered domain name. Your seeder host must support IPv6 and IPv4.

We ask that you commit to a monthly uptime of 99.9% which is available enough to be reliable but also leaves flexibility to not need to run a cluster and gives you time for a reboot once in a while to keep up with things like security patches. We will be monitoring all of the seeders listed in the most recent version of `initial-config.yaml`. We highly recommend that you enable monitoring of your seeder as well. We are heavy users of [Uptime Robot](https://uptimerobot.com/) but anything similar will do.

Being a known community member - the better you're known (pseudonymously is fine) - the more likely you are to be added. You should have an account on [Keybase](https://keybase.io/) and we will need to know your Keybase handle, as you will be added to a seeder operator's private channel.

The final criteria is geographical dispersion. If you are hosting in a region where we don't have a seeder, you are more likely to be added. We will want to know what country (and region if it's a large country e.g. North West US) - generally - your seeder will reside in to facilitate this.

The easiest way to propose being added is to open a pull request for [initial-config.yaml](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/util/initial-config.yaml) and include the information required from the four points above.
