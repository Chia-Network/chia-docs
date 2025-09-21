---
title: 生成地块常见问题解答
slug: /reference-client/troubleshooting/plotting-faq
---

:::info

In 2024 we proposed a new proof format. Please see our [frequently asked questions](/chia-blockchain/consensus/proof-of-space-2.0/new-proof-faq) for the new format. For additional information, see our [new proof format](/chia-blockchain/consensus/proof-of-space-2.0/new-proof-introduction) section.

The questions listed on this page only pertain to the original format.

:::

## 如果停电会发生什么？

Any plots that were partially made will be invalid. This will likely leave many `.tmp` files that can be removed. 在许多情况下，临时文件将会自动删除，但这是一个可能需要手动删除文件的情况。 这不会损坏已经完成的任何现有地块。

## 我可以使用连接到SSD/NVME的USB 3.0电缆来运行临时文件吗？

Although the answer is **yes**, the more practical answer is **it depends**. 通常情况下，通信速度会比预期的慢，USB设备会关闭，或者连接不稳定。 对于台式机而言，更好的选择是安装PCIe到NVME适配器。

## 一旦从地块中使用了一个哈希，是否需要删除该地块？

No. 一个地块有大量的哈希值。 如果使用了一个，仍然有足够多的哈希值可以在未来的几年内使用。

## 农民（Farmer）与收割机（Harvester）有什么区别？

可以将收割机视为是农民的一个扩展节点。 收割机检查地块并将结果报告给农民，然后农民将结果提交给区块链。

## 如何进行同步并保持同步？

每个用户的计算机上都有一个区块链的副本，目标是每个人都在同步或非常接近同步。 Click on the **Full Node** tab, scroll down to see the connected Nodes/PCs. 初始启动时可能需要一些时间来收集节点，但如果无法自动获取节点，将无法完成同步。

You can check if you are synced by seeing a **synced** message in the top right of the wallet or on the full node tab. Additionally, the **Peak Height** should match closely to that of your peers. 还可以通过与同步良好的区块浏览器进行核对。

You can also try to force reload (top menu bar --> **Force Reload**). 等待5-10分钟后，这可能有助于重新启动同步。 该操作不会影响地块。
