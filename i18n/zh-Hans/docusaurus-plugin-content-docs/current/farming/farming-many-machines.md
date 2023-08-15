---
title: Farming on Many Machines
slug: /farming-on-many-machines
---

另一个标题:

# 如何在其它不是主要设备的机器上进行收割

本指南实现在每台机器上运行一个收割节点，而无需在每台机器上运行全节点、钱包和农场服务。 这使得系统更简单，使用的带宽、空间和CPU较少，同时也保障了密钥安全。 还使得整个农场在应对挑战（challenges）时更快速和高效。

该架构由一台主机组成，运行农场节点、全节点和钱包，其它机器仅运行收割节点。 只有主机将连接到Chia网络。

为了保障收割节点与主机之间的通信安全，使用TLS（Transport Layer Security）协议，其中**主机**将充当私有证书颁发机构(CA)，用于签署所有证书。 每个收割节点必须拥有自己的签名证书，以便与**主机**正确通信。

```
                                       _____  收割机 1 (证书 A)
                                      /
其他网络节点  --------   主机 (CA) ------  收割机 2 (证书 B)
                                      \_____  收割机 3 (证书 C)
```

## 先决条件

- 首先，确保在所有机器上安装了Chia，并通过运行命令行界面（CLI）中的`chia init`进行初始化。
- 在其他收割节点上生成地块时，请使用`chia plots create -f farmer_key -p pool_key`命令，并使用主机的农民（farmer）和联合耕种池（pool）密钥。 或者，可以通过使用`chia keys add`将私钥复制到其他机器上，但这样做安全性较差。 在生成地块后，请运行`chia plots check`命令确保一切正常运行。
- 将位于 `~/.chia/mainnet/config/ssl/ca` 的**主机**CA目录复制到可供收割节点（harvester）机器访问的位置；可以使用网络驱动器、USB存储设备共享`ssl/ca`目录，或者通过网络将其复制到每个收割节点机器。 请注意，较大的更新可能需要您复制新的`ca`内容。 验证收割节点在连接尝试时不会报告SSL错误。

## 设置步骤

对于每个收割节点（harvester），请按照以下步骤进行操作：

**注意：** 在第4步中，将临时使用从主机复制的`/ca`目录。 请勿替换收割节点上的`/ca`文件夹。 将`/ca`目录放入收割节点上的临时文件夹中。 将暂时向收割节点展示这些文件，然后可以删除临时文件夹中的`/ca`目录。

1. 确保收割节点机器能够通过8447端口访问**主机**IP地址。
2. 使用命令 `chia stop all -d` 关闭所有Chia守护进程。
3. 备份收割节点中的所有设置。
4. 在收割节点上运行`chia init -c [directory]`命令，其中`[directory]`是放入临时文件夹的主机`/ca`目录的副本。 该命令将创建一个由主机CA签名的新证书。
5. 在每个收割节点上打开`~/.chia/mainnet/config/config.yaml`文件，并将主机IP地址填写到`harvester`(不是`full_node`)的farmer_peer部分。

```
harvester:
  chia_ssl_ca:
    crt: config/ssl/ca/chia_ca.crt
    key: config/ssl/ca/chia_ca.key
  farmer_peer:
    host: Main.Machine.IP
    port: 8447
```

例如，该部分会修改后如下所示：

```
harvester:
  chia_ssl_ca:
    crt: config/ssl/ca/chia_ca.crt
    key: config/ssl/ca/chia_ca.key
  farmer_peer:
    host: 192.168.1.23
    port: 8447
```

6. 通过运行命令行界面（CLI）中的 `chia start harvester -r` 来启动收割节点，然后应该在主机的 INFO 级别日志中看到一个新的连接。
7. 要停止收割节点，运行命令行界面（CLI）中的 `chia stop harvester`。

_警告:_

不能将整个 `config/ssl` 目录从一台机器复制到另一台机器。 每个收割节点必须拥有不同的TLS证书，以便**主机**将其识别为不同的收割节点。 如果将**相同**证书共享在不同机器之间，可能会出现意外的错误，包括收割节点无法正常工作。

_安全问题:_

自从beta27版本以来，CA文件被复制到每个收割节点，因为守护程序目前需要它才能正确启动。 这并不理想，将在主网发布后的后续版本中实施一种新的证书分发方式。 请在运行可从开放互联网访问的收割节点时特别小心。

_注意:_

GUI界面会在运行一段时间后显示收割节点的地块。 查看是否正常运行的最简单方法是转到“耕种”(Farm)选项卡，并查看“最近尝试的证明”(Last Attempted Proofs)面板。 在这里，应该看到不同的收割节点报告扫描结果，例如0/26、1/412、3/864，平均每10秒左右更新一次。

从命令行界面（CLI）运行 `chia farm summary` 后，将在几分钟后列出远程收割节点。 如果需要进行调试，可以使用 `chia configure --log-level DEBUG` 将日志级别设置为DEBUG，或者在主机的 `config.yaml` 中将日志级别设置为 `DEBUG` 并重新启动farmer `chia start -r farmer`。 现在可以查看日志文件 `~/.chia/mainnet/log/debug.log`，检查是否出现以下类似的消息：

```
[time stamp] farmer farmer_server   : DEBUG   -> new_signage_point_harvester to peer [harvester IP address] [peer id - 64 char hexadecimal]
[time stamp] farmer farmer_server   : DEBUG   <- farming_info from peer [peer id - 64 char hexadecimal] [harvester IP address]
[time stamp] farmer farmer_server   : DEBUG   <- new_proof_of_space from peer [peer id - 64 char hexadecimal] [harvester IP address]
```

出站的 `new_signage_point_harvester` 消息表示农场节点向您的收割节点发送了挑战，而传入的 `farming_info` 消息表示您的收割节点给出了回应。 而 `new_proof_of_space` 消息表示收割节点找到了对该挑战的证明。 您将会收到比 `new_proof_of_space` 消息更多的 `new_signage_point` 和 `farming_info` 消息。

这是如何找到日志文件： [Where to Find Things](/check-if-things-are-working)

# 在多台机器上的良好安全实践

(这基本上是重复了在[此讨论](https://github.com/Chia-Network/chia-blockchain/discussions/1116#discussioncomment-420398)中@mariano54的观点。 )

安全是关于做出更好的选择。 永远无法达到100%的安全性，但可以始终通过做出更好的选择来提高安全性。

# 保持密钥分离

换句话说，_只使用与机器用途相符的密钥_。

- 主密钥（master/farming key）不应该出现在用于生成地块的机器上。
- 主密钥（master/farming key）不应该出现在收割节点机器上。

## 在多台机器上进行耕种

### 在多台机器上生成地块

在 [如何在其它不是主要设备的机器上进行收割(在多台机器上进行耕种)](/farming-on-many-machines) 章节中，有以下相关信息：

:::info
在其他收割节点上生成地块时，请使用`chia plots create -f farmer_key -p pool_key`命令，并使用主机的农民（farmer）和联合耕种池（pool）密钥。 或者，可以通过使用`chia keys add`将私钥复制到其他机器上，但这样做安全性较差。
:::

### 在多台机器上进行收割

请按照 [在多台机器上进行耕种](/farming-on-many-machines) 页面上的关于在收割节点上设置证书的指示进行操作。

# 钱包保持独立(Separate)

不让钱包受到黑客攻击的一种方法是不让它暴露在互联网上。 以下是如何做到这一点：[Chia钥匙管理](/chia-key-management)。

:::info
用于Chia奖励的奖励地址也应该是一个独立的密钥，并且应该保存在一个离线的机器上。 可以在另一台计算机上生成一个地址，并将该地址放入config.yaml文件中的 farmer.xch_target_address 和 pool.xch_target_address 字段中，这样，如果您的耕种机器受到黑客攻击，就不会丢失以前的奖励。 （[来源](https://github.com/Chia-Network/chia-blockchain/discussions/1116#discussioncomment-420398)）
:::

## 如何查看密钥

**仅在安全的地方查看密钥，并确保没有其他人能看到您的屏幕。**

### 使用命令行界面（CLI）

```bash
chia keys show
```

### 使用图形用户界面（GUI）

点击右上角的 _注销_ 图标。 会看到列出的钱包。 点击眼睛图标。
