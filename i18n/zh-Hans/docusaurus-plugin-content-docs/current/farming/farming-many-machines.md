---
title: Farming on Many Machines
slug: /farming-on-many-machines
---

另一个标题:

# 如何在其它不是主要设备的机器上进行收割

:::tip

Always make sure to protect yourself from malicious actors by [securing your chia and making yourself a hard target](https://www.chia.net/2021/05/28/securing-your-chia-how-to-be-a-hard-target/)

:::

This guide will show you how to run a harvester on each machine in your network. This architecture is composed of one main machine which runs the farmer, full node, and wallet, and other machines which run only the harvester. 只有主机将连接到Chia网络。 This architecture is composed of one main machine which runs the farmer, full node, and wallet, and other machines which run only the harvester. 只有主机将连接到Chia网络。

This is the recommended setup for all Chia farms that use more than one computer. It uses less bandwidth, space and CPU versus running a full node on each computer. It also keeps your keys safer because they will only need to be stored on one computer. Finally, it makes your overall farm quicker and more efficient when replying to challenges. It uses less bandwidth, space and CPU versus running a full node on each computer. It also keeps your keys safer because they will only need to be stored on one computer. Finally, it makes your overall farm quicker and more efficient when replying to challenges.

为了保障收割节点与主机之间的通信安全，使用TLS（Transport Layer Security）协议，其中**主机**将充当私有证书颁发机构(CA)，用于签署所有证书。 每个收割节点必须拥有自己的签名证书，以便与**主机**正确通信。

```
                                       _____  收割机 1 (证书 A)
                                      /
其他网络节点  --------   主机 (CA) ------  收割机 2 (证书 B)
                                      \_____  收割机 3 (证书 C)
```

If you are more of a visual learner, JM made a video outlining the steps from this tutorial. This video is from 2021, but the steps are still relevant today: This video is from 2021, but the steps are still relevant today:

<iframe width="560" height="315" src="https://www.youtube.com/embed/QpgXr3aeU5g" title="Farming on multiple systems" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## 先决条件

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

  在生成地块后，请运行`chia plots check`命令确保一切正常运行。

- A copy of your **main** machine CA directory needs to be accessible by your harvester machines. This directory is located in: This directory is located in:

  ```bash
  ~/.chia/mainnet/config/ssl/ca
  ```

  Options to make this directory accessible include:

  - Share the directory on a network drive
  - Copy it using a USB key
  - Do a network copy to each harvester

  请注意，较大的更新可能需要您复制新的`ca`内容。 Verify that the harvester does not report SSL errors on connection attempts.

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

该命令将创建一个由主机CA签名的新证书。

:::warning

For step 4, you are using a copy of your `/ca` directory from your main machine temporarily. 请勿替换收割节点上的`/ca`文件夹。 请勿替换收割节点上的`/ca`文件夹。 将`/ca`目录放入收割节点上的临时文件夹中。 将暂时向收割节点展示这些文件，然后可以删除临时文件夹中的`/ca`目录。 This keeps your system more secure by limiting the exposure to your certificates.

:::

5. Open the following file in each harvester:

```bash
~/.chia/mainnet/config/config.yaml
```

Search for the remote **`harvester`**'s farmer_peer section (NOT `full_node`). Enter the local IP address of your main machine (typically `192.168.xxx.yyy`) as the `host` value. Enter the local IP address of your main machine (typically `192.168.xxx.yyy`) as the `host` value.

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

不能将整个 `config/ssl` 目录从一台机器复制到另一台机器。 每个收割节点必须拥有不同的TLS证书，以便**主机**将其识别为不同的收割节点。 如果将**相同**证书共享在不同机器之间，可能会出现意外的错误，包括收割节点无法正常工作。

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

现在可以查看日志文件 `~/.chia/mainnet/log/debug.log`，检查是否出现以下类似的消息：

```bash
[time stamp] farmer farmer_server   : DEBUG   -> new_signage_point_harvester to peer [harvester IP address] [peer id - 64 char hexadecimal]
[time stamp] farmer farmer_server   : DEBUG   <- farming_info from peer [peer id - 64 char hexadecimal] [harvester IP address]
[time stamp] farmer farmer_server   : DEBUG   <- new_proof_of_space from peer [peer id - 64 char hexadecimal] [harvester IP address]
```

出站的 `new_signage_point_harvester` 消息表示农场节点向您的收割节点发送了挑战，而传入的 `farming_info` 消息表示您的收割节点给出了回应。 而 `new_proof_of_space` 消息表示收割节点找到了对该挑战的证明。 您将会收到比 `new_proof_of_space` 消息更多的 `new_signage_point` 和 `farming_info` 消息。

这是如何找到日志文件： [Where to Find Things](/check-if-things-are-working)

## 在多台机器上的良好安全实践

(这基本上是重复了在[此讨论](https://github.com/Chia-Network/chia-blockchain/discussions/1116#discussioncomment-420398)中@mariano54的观点。 )

安全是关于做出更好的选择。 永远无法达到100%的安全性，但可以始终通过做出更好的选择来提高安全性。

### 保持密钥分离

换句话说，_只使用与机器用途相符的密钥_。

- 主密钥（master/farming key）不应该出现在用于生成地块的机器上。
- 主密钥（master/farming key）不应该出现在收割节点机器上。

#### 在多台机器上生成地块

As stated [above](/farming-on-many-machines#先决条件), run the following command when creating plots:

```bash
chia plots create -f <farmer_key> -p <pool_key>
```

When you use the `-f` and `-p` parameters, you do not need to copy the keys to the local plotting machine.

#### 在多台机器上进行收割

Rather than maintaining a copy of your farmer's certificates on each harvester, follow the [above](/farming-on-many-machines#先决条件) steps to keep them in one place while farming.

### 钱包保持独立(Separate)

不让钱包受到黑客攻击的一种方法是不让它暴露在互联网上。 以下是如何做到这一点：[Chia钥匙管理](/chia-key-management)。

:::info
用于Chia奖励的奖励地址也应该是一个独立的密钥，并且应该保存在一个离线的机器上。 可以在另一台计算机上生成一个地址，并将该地址放入config.yaml文件中的 farmer.xch_target_address 和 pool.xch_target_address 字段中，这样，如果您的耕种机器受到黑客攻击，就不会丢失以前的奖励。 （[来源](https://github.com/Chia-Network/chia-blockchain/discussions/1116#discussioncomment-420398)）
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

点击右上角的 _注销_ 图标。 会看到列出的钱包。 点击眼睛图标。
