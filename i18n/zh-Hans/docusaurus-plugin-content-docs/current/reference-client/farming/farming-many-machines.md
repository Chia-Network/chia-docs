---
title: Farming on Many Machines
slug: /reference-client/farming/farming-many-machines
---

另一个标题:

# 如何在其它不是主要设备的机器上进行收割

:::tip

Always make sure to protect yourself from malicious actors by [securing your chia and making yourself a hard target](https://www.chia.net/2021/05/28/securing-your-chia-how-to-be-a-hard-target/)

:::

This guide will show you how to run a harvester on each machine in your network. This architecture is composed of one main machine which runs the farmer, full node, and wallet, and other machines which run only the harvester. 只有主机将连接到Chia网络。 This architecture is composed of one main machine which runs the farmer, full node, and wallet, and other machines which run only the harvester. 只有主机将连接到Chia网络。

This is the recommended setup for all Chia farms that use more than one computer. It uses less bandwidth, space and CPU versus running a full node on each computer. It also keeps your keys safer because they will only need to be stored on one computer. Finally, it makes your overall farm quicker and more efficient when replying to challenges. It uses less bandwidth, space and CPU versus running a full node on each computer. It also keeps your keys safer because they will only need to be stored on one computer. Finally, it makes your overall farm quicker and more efficient when replying to challenges.

To secure communication between your harvester and **main** machine, TLS is used where your **main** machine will be the private Certification Authority (CA) that signs all certificates. Each harvester must have its own signed certificate to properly communicate with your **main** machine.

```
                                       _____  Harvester 1 (certificate A)
                                      /
other network peers  --------   Main machine (CA) ------  Harvester 2 (certificate B)
                                      \_____  Harvester 3 (certificate C)
```

If you are more of a visual learner, JM made a video outlining the steps from this tutorial. This video is from 2021, but the steps are still relevant today: This video is from 2021, but the steps are still relevant today:

<iframe width="560" height="315" src="https://www.youtube.com/embed/QpgXr3aeU5g" title="Farming on multiple systems" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 先决条件

- First, make sure Chia is installed on all machines and initialized by running the following command:

  ```bash
  chia init
  ```

- When creating plots on the harvesters, run the correct command based on which plotter you want to use. More information about the plotters available and their usage can be found here: https://docs.chia.net/reference-client/plotting/plotting-software/

- A copy of your **main** machine CA directory needs to be accessible by your harvester machines. This directory is located in:

  ```bash
  ~/.chia/mainnet/config/ssl/ca
  ```

  Options to make this directory accessible include:
  - Share the directory on a network drive
  - Copy it using a USB key
  - Do a network copy to each harvester

  Be aware that major updates might need you to copy the new `ca` contents. Verify that the harvester does not report SSL errors on connection attempts.

## 设置步骤

For each harvester, follow these steps:

1. Make sure your **main** machine's IP address on port 8447 is accessible by your harvester machines
2. Shut down all Chia daemon processes by running:

```bash
chia stop all -d
```

3. 备份收割节点中的所有设置。
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
  farmer_peers:
  - host: localhost
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

Here's how to find your logs: [Where to Find Things](/reference-client/troubleshooting/check-if-things-are-working)

## 在多台机器上的良好安全实践

(This is basically repeating what @mariano54 said in [this discussion](https://github.com/Chia-Network/chia-blockchain/discussions/1116#discussioncomment-420398).)

安全是关于做出更好的选择。 永远无法达到100%的安全性，但可以始终通过做出更好的选择来提高安全性。

### 保持密钥分离

In other words, _only use the keys specific to your machine's purpose_.

- 主密钥（master/farming key）不应该出现在用于生成地块的机器上。
- 主密钥（master/farming key）不应该出现在收割节点机器上。

#### 在多台机器上生成地块

As stated [above](/reference-client/farming/farming-many-machines#先决条件), run the following command when creating plots:

```bash
chia plots create -f <farmer_key> -p <pool_key>
```

When you use the `-f` and `-p` parameters, you do not need to copy the keys to the local plotting machine.

#### 在多台机器上进行收割

Rather than maintaining a copy of your farmer's certificates on each harvester, follow the [above](/reference-client/farming/farming-many-machines#先决条件) steps to keep them in one place while farming.

### 钱包保持独立(Separate)

不让钱包受到黑客攻击的一种方法是不让它暴露在互联网上。 Here is how to do this: [Chia Keys Management](/reference-client/install-and-setup/key-management)

:::info
Your reward address for Chia rewards should be a separate key as well, kept in an offline machine. 可以在另一台计算机上生成一个地址，并将该地址放入config.yaml文件中的 farmer.xch_target_address 和 pool.xch_target_address 字段中，这样，如果您的耕种机器受到黑客攻击，就不会丢失以前的奖励。 ([Source](https://github.com/Chia-Network/chia-blockchain/discussions/1116#discussioncomment-420398))
:::

## 如何查看密钥

:::warning

仅在安全的地方查看密钥，并确保没有其他人能看到您的屏幕。

:::

### 使用命令行界面（CLI）

```bash
chia keys show
```

### 使用图形用户界面（GUI）

Click on the _Logout_ icon at the top right. 会看到列出的钱包。 点击眼睛图标。
