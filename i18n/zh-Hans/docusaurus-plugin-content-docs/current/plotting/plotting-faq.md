---
title: 生成地块常见问题解答
slug: /plotting-faq
---

:::info

In 2024 we proposed a new proof format. Please see our [frequently asked questions](/new-proof-faq) for the new format. For additional information, see our [new proof format](/new-proof-introduction) section.

The questions listed on this page only pertain to the original format.

:::

## 如果停电会发生什么？

Any plots that were partially made will be invalid. 这可能会留下许多`.tmp`文件，可以将其删除。 在许多情况下，临时文件将会自动删除，但这是一个可能需要手动删除文件的情况。 这不会损坏已经完成的任何现有地块。

## 我可以使用连接到SSD/NVME的USB 3.0电缆来运行临时文件吗？

虽然答案是**可以**，但更实际的答案是**这取决于具体情况**。 通常情况下，通信速度会比预期的慢，USB设备会关闭，或者连接不稳定。 对于台式机而言，更好的选择是安装PCIe到NVME适配器。

## 一旦从地块中使用了一个哈希，是否需要删除该地块？

No. 一个地块有大量的哈希值。 如果使用了一个，仍然有足够多的哈希值可以在未来的几年内使用。

## 农民（Farmer）与收割机（Harvester）有什么区别？

可以将收割机视为是农民的一个扩展节点。 收割机检查地块并将结果报告给农民，然后农民将结果提交给区块链。

## 如何进行同步并保持同步？

每个用户的计算机上都有一个区块链的副本，目标是每个人都在同步或非常接近同步。 点击**全节点**（Full Node）选项卡，向下滚动以查看已连接的节点/计算机。 初始启动时可能需要一些时间来收集节点，但如果无法自动获取节点，将无法完成同步。

可以通过在钱包的右上角看到**已同步**的消息，或在全节点选项卡上查看。 此外，**最高高度**（Peak Height）应该与你的节点最高高度非常接近。 还可以通过与同步良好的区块浏览器进行核对。

还可以尝试强制重新加载（顶部菜单栏 --> **Force Reload**）。 等待5-10分钟后，这可能有助于重新启动同步。 该操作不会影响地块。
