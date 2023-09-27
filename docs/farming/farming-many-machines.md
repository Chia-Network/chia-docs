---
title: Farming on Many Machines
slug: /farming-on-many-machines
---

Another title for this:

# How to harvest on other machines that are not your main machine

This guide will show you how to run a harvester on each machine in your network. This architecture is composed of one main machine which runs the farmer, full node, and wallet, and other machines which run only the harvester. Only your main machine will connect to the Chia network.

This is the recommended setup for all Chia farms that use more than one computer. It uses less bandwidth, space and CPU versus running a full node on each computer. It also keeps your keys safer because they will only need to be stored on one computer. Finally, it makes your overall farm quicker and more efficient when replying to challenges.

To secure communication between your harvester and **main** machine, TLS is used where your **main** machine will be the private Certification Authority (CA) that signs all certificates. Each harvester must have its own signed certificate to properly communicate with your **main** machine.

```
                                       _____  Harvester 1 (certificate A)
                                      /
other network peers  --------   Main machine (CA) ------  Harvester 2 (certificate B)
                                      \_____  Harvester 3 (certificate C)
```

If you are more of a visual learner, JM made a video outlining the steps from this tutorial. This video is from 2021, but the steps are still relevant today:

<iframe width="560" height="315" src="https://www.youtube.com/embed/QpgXr3aeU5g" title="Farming on multiple systems" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Prerequisites

- First, make sure Chia is installed on all machines and initialized by running the following command:
  
  ```bash
  chia init
  ```

- When creating plots on the harvesters, run:
  
  ```bash
  chia plots create -f <farmer_key> -p <pool_key>
  ```
  
  Where `<farmer_key>` and `<pool_key>` can be obtained by running the following command on your main machine:

  ```bash
  chia keys show  
  ```
  
  After creating a plot, run `chia plots check` to ensure everything is working correctly.

- A copy of your **main** machine CA directory needs to be accessible by your harvester machines. This directory is located in:

  ```bash
  ~/.chia/mainnet/config/ssl/ca
  ```
  
  Options to make this directory accessible include:

  - Share the directory on a network drive
  - Copy it using a USB key
  - Do a network copy to each harvester
  
  Be aware that major updates might need you to copy the new `ca` contents. Verify that the harvester does not report SSL errors on connection attempts.

## Setup Steps

For each harvester, follow these steps:

1. Make sure your **main** machine's IP address on port 8447 is accessible by your harvester machines
2. Shut down all Chia daemon processes by running:

  ```bash
  chia stop all -d
  ```

3. Make a backup of any settings in your harvester
4. Run the following command on your harvester, where `<directory>` is the copy of your **main** machine's `/ca` directory that you put in a temp folder:

  ```bash
  chia init -c <directory>
  ```

  This command creates a new certificate signed by your **main** machine's CA.

  :::warning

  For step 4, you are using a copy of your `/ca` directory from your main machine temporarily. DO NOT replace the `/ca` folder on your harvester. Put the `/ca` directory into a temp folder on your harvester. You're going to show your harvester these files temporarily and then you can delete the `/ca` directory in your temp folder. This keeps your system more secure by limiting the exposure to your certificates.

  :::

5. Open the following file in each harvester:

  ```bash
  ~/.chia/mainnet/config/config.yaml
  ```

  Search for the remote **`harvester`**'s farmer_peer section (NOT `full_node`). Enter the local IP address of your main machine (typically `192.168.xxx.yyy`) as the `host` value.
  
  In other words, replace `<Main.Machine.IP>` in the following snippet with your main machine's local IP:

  ```bash
  harvester:
    chia_ssl_ca:
      crt: config/ssl/ca/chia_ca.crt
      key: config/ssl/ca/chia_ca.key
    farmer_peer:
      host: <Main.Machine.IP>
      port: 8447
  ```

6. Launch the harvester by running the following command:

  ```bash
  chia start harvester -r
  ```
  
  You should see a new connection on your main machine in your `INFO` level logs.

:::note

To stop the harvester, run the following command:
```bash
chia stop harvester
```

:::

:::warning

You cannot copy the entire `config/ssl` directory from one machine to another. Each harvester must have a different set of TLS certificates for your **main** machine to recognize it as different harvesters. Unintended bugs can occur, including harvesters failing to work properly when the **same** certificates are shared among different machines.

:::

:::info

A few minutes after the GUI starts running, it will begin to show harvester plots. The easiest way to see if it's working is to go the `Farm` tab, and check the `Last Attempted Proof` pane. Every nine seconds or so, you should see the different harvesters reporting numbers under `Plots Passed Filter` such as `0 / 26`, `1 / 412`, `3 / 864`, etc.

:::

After your farmer has been running for a few minutes, you can run the following command to obtain a list of harvesters:

```bash
chia farm summary
```

If you need to debug, you can set the logging level to `DEBUG` by running this command:

```bash
chia configure --log-level DEBUG
```

You will need to restart your farmer for the change to take effect:

```bash
chia start -r farmer
```

Now you can check the log `~/.chia/mainnet/log/debug.log` and see if you get messages like the following:

```bash
[time stamp] farmer farmer_server   : DEBUG   -> new_signage_point_harvester to peer [harvester IP address] [peer id - 64 char hexadecimal]
[time stamp] farmer farmer_server   : DEBUG   <- farming_info from peer [peer id - 64 char hexadecimal] [harvester IP address]
[time stamp] farmer farmer_server   : DEBUG   <- new_proof_of_space from peer [peer id - 64 char hexadecimal] [harvester IP address]
```

The outgoing `new_signage_point_harvester` message states the farmer sent a challenge to your harvester and the incoming `farming_info` message indicates a response. The `new_proof_of_space` message states the harvester found a proof for the challenge. You will get more `new_signage_point` and `farming_info` messages than `new_proof_of_space` messages.

Here's how to find your logs: [Where to Find Things](/check-if-things-are-working)

## Good Security Practices on Many Machines

(This is basically repeating what @mariano54 said in [this discussion](https://github.com/Chia-Network/chia-blockchain/discussions/1116#discussioncomment-420398).)

Security is about making better choices. You can never be 100% secure, but you can always make better choices to become more secure.

### Keep Your Keys Separate

In other words, _only use the keys specific to your machine's purpose_.

- Your master/farming key should not be in your plotting machine(s).
- Your master/farming key should not be in your harvester machine(s).

#### Plotting On Multiple Machines

As stated [above](#prerequisites), run the following command when creating plots:
  
```bash
chia plots create -f <farmer_key> -p <pool_key>
```

When you use the `-f` and `-p` parameters, you do not need to copy the keys to the local plotting machine.

#### Harvesting On Multiple Machines

Rather than maintaining a copy of your farmer's certificates on each harvester, follow the [above](#prerequisites) steps to keep them in one place while farming.

### Keep Your Wallet Separate

One way to not get your wallet hacked is to not have it accessible to the internet. Here is how to do this: [Chia Keys Management](/chia-key-management)

:::info
Your reward address for Chia rewards should be a separate key as well, kept in an offline machine. You can generate an address on a different computer, and put this address in the config.yaml (farmer.xch_target_address and pool.xch_target_address), so if your farming machine gets hacked, you don't lose past rewards. ([Source](https://github.com/Chia-Network/chia-blockchain/discussions/1116#discussioncomment-420398))
:::

## How to Find Your Keys

:::warning

ONLY VIEW YOUR KEYS IN A SAFE PLACE AND MAKE SURE NO ONE CAN SEE YOUR SCREEN.

:::

### Using CLI

```bash
chia keys show
```

### Using the GUI

Click on the _Logout_ icon at the top right. You will see your wallets listed. Click on the eye icon.
