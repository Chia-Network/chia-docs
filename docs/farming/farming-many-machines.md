---
title: Farming on Many Machines
slug: /farming-on-many-machines
---

Another title for this:

# How to harvest on other machines that are not your main machine

This guide allows you to run a harvester on each machine, without having to run a full node, wallet, and farmer on each one. This keeps your system simpler, uses less bandwidth, space, CPU, and also keeps your keys safer. It also makes your overall farm quicker and more efficient when replying to challenges.

The architecture is composed of one main machine which runs the farmer, full node, and wallet, and other machines which run only the harvester. Only your main machine will connect to the Chia network.

To secure communication between your harvester and **main** machine, TLS is used where your **main** machine will be the private Certification Authority (CA) that signs all certificates. Each harvester must have its own signed certificate to properly communicate with your **main** machine.

```
                                       _____  Harvester 1 (certificate A)
                                      /
other network peers  --------   Main machine (CA) ------  Harvester 2 (certificate B)
                                      \_____  Harvester 3 (certificate C)
```

## Prerequisites

- First, make sure Chia is installed on all machines and initialized by running the CLI `chia init`.
- When creating plots on the other harvesters, use `chia plots create -f farmer_key -p pool_key`, inserting the farmer and pool keys from your main machine. Alternatively, you could copy your private keys over by using `chia keys add`, but this is less secure. After creating a plot, run `chia plots check` to ensure everything is working correctly.
- Make a copy of your **main** machine CA directory located in `~/.chia/mainnet/config/ssl/ca` to be accessible by your harvester machines; you can share the `ssl/ca` directory on a network drive, USB key, or do a network copy to each harvester. Be aware that major updates might need you to copy the new `ca` contents. Verify that the harvester does not report SSL errors on connections attempts.

## Setup Steps

Then for each harvester, follow these steps:

**NOTE:** For step 4, you are using a copy of your `/ca` directory from your main machine temporarily. DO NOT replace the `/ca` folder on your harvester. Put the `/ca` directory into a temp folder on your harvester. You're going to show your harvester these files temporarily and then you can delete the `/ca` directory in your temp folder.

1. Make sure your **main** machines IP address on port 8447 is accessible by your harvester machines
2. Shut down all chia daemon processes with `chia stop all -d`
3. Make a backup of any settings in your harvester
4. Run `chia init -c [directory]` on your harvester, where `[directory]` is the copy of your **main** machine `/ca` directory that you put in a temp folder. This command creates a new certificate signed by your **main** machine's CA.
5. Open the `~/.chia/mainnet/config/config.yaml` file in each harvester, and enter your main machine's IP address in the remote **`harvester`**'s farmer_peer section (NOT `full_node`).  
   EX:

```
harvester:
  chia_ssl_ca:
    crt: config/ssl/ca/chia_ca.crt
    key: config/ssl/ca/chia_ca.key
  farmer_peer:
    host: Main.Machine.IP
    port: 8447
```

For example, this section would look like:

```
harvester:
  chia_ssl_ca:
    crt: config/ssl/ca/chia_ca.crt
    key: config/ssl/ca/chia_ca.key
  farmer_peer:
    host: 192.168.1.23
    port: 8447
```

6. Launch the harvester by running CLI `chia start harvester -r` and you should see a new connection on your main machine in your INFO level logs.
7. To stop the harvester, you run CLI `chia stop harvester`

_Warning:_

You cannot copy the entire `config/ssl` directory from one machine to another. Each harvester must have a different set of TLS certificates for your **main** machine to recognize it as different harvesters. Unintended bugs can occur, including harvesters failing to work properly when the **same** certificates are shared among different machines.

_Security Concern:_

Since beta27, the CA files are copied to each harvester, as the daemon currently needs it to startup correctly. This is not ideal, and a new way to distribute certificates will be implemented in a subsequent release post mainnet launch. Please be careful when running your harvester that is accessible from the open internet.

_Note:_

The GUI show harvester plots after running some minutes. The easiest way to see if it's working is to go the "Farm" tab, and check the "Last Attempted Proofs" pane. Here you should see the different harvesters reporting scans like 0/26 1/412 3/864, on an average of every 10~ second.

From CLI `chia farm summary` will list remote harvesters after some minutes.
If you need to debug, you can set the logging level to DEBUG, with `chia configure --log-level DEBUG`, or by setting your logging level to `DEBUG` in your `config.yaml` on your main machine and restart Chia farmer `chia start -r farmer`. Now you can check the log `~/.chia/mainnet/log/debug.log` and see if you get messages like the following:

```
[time stamp] farmer farmer_server   : DEBUG   -> new_signage_point_harvester to peer [harvester IP address] [peer id - 64 char hexadecimal]
[time stamp] farmer farmer_server   : DEBUG   <- farming_info from peer [peer id - 64 char hexadecimal] [harvester IP address]
[time stamp] farmer farmer_server   : DEBUG   <- new_proof_of_space from peer [peer id - 64 char hexadecimal] [harvester IP address]
```

The outgoing `new_signage_point_harvester` message states the farmer sent a challenge to your harvester and the incoming `farming_info` message indicates a response. The `new_proof_of_space` message states the harvester found a proof for the challenge. You will get more `new_signage_point` and `farming_info` messages than `new_proof_of_space` messages.

Here's how to find your logs: [Where to Find Things](<https://github.com/Chia-Network/chia-blockchain/wiki/How-to-Check-If-Everything-is-Working-(or-Not)#where-to-find-things>)

# Good Security Practices on Many Machines

(This is basically repeating what @mariano54 said in [this discussion](https://github.com/Chia-Network/chia-blockchain/discussions/1116#discussioncomment-420398).)

Security is about making better choices. You can never be 100% secure, but you can always make better choices to become more secure.

# Keep Your Keys Separate

In other words, _only use the keys specific to your machine's purpose_.

- Your master/farming key should not be in your plotting machine(s).
- Your master/farming key should not be in your harvester machine(s).

## Farming On Multiple Machines

### Plotting On Multiple Machines

Buried in the [Farming on many machines](https://github.com/Chia-Network/chia-blockchain/wiki/Farming-on-many-machines) wiki page is this relevant tidbit:

> When creating plots on the other harvesters, use `chia plots create -f farmer_key -p pool_key`, inserting the farmer and pool keys from your main machine. Alternatively, you could copy your private keys over by using chia keys add, but this is less secure.

### Harvesting On Multiple Machines

Follow the instructions on setting up certificates on harvesters on the [Farming on many machines](https://github.com/Chia-Network/chia-blockchain/wiki/Farming-on-many-machines) wiki page.

# Keep Your Wallet Separate

One way to not get your wallet hacked is to not have it accessible to the internet. Here is how to do this: [Chia Keys Management](https://github.com/Chia-Network/chia-blockchain/wiki/Chia-Keys-Management)

> Your reward address for chia rewards should be a separate key as well, kept in an offline machine. You can generate an address on a different computer, and put this address in the config.yaml (farmer.xch_target_address and pool.xch_target_address), so if your farming machine gets hacked, you don't lose past rewards. ([Source](https://github.com/Chia-Network/chia-blockchain/discussions/1116#discussioncomment-420398))

## How to Find Your Keys

**ONLY VIEW YOUR KEYS IN A SAFE PLACE AND MAKE SURE NO ONE CAN SEE YOUR SCREEN.**

### Using CLI

`chia keys show`

### Using the GUI

Click on the _Logout_ icon at the top right. You will see your wallets listed. Click on the eye icon.
