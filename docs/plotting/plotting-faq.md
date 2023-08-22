---
title: Plotting FAQ
slug: /plotting-faq
---

## If power goes out what happens?

Any plots that were partially made will be invalid. This will likely leave many `.tmp` files that can be removed. In many cases, temp files will be automatically deleted, but this is one case where you'll likely need to remove the files manually. This does not harm any existing plots that have already been completed.

## Can I use USB 3.0 cable connected to SSD/NVME running the Temp files?

Although the answer is **yes**, the more practical answer is **it depends**. Often times, the communication speed is slower than expected, the usb device turns off, or connection is inconsistent. A preferred option for desktops would be to install a PCIe to NVME adapter.

## Once a hash is used from a plot does the plot need deleted?

No. A plot has a significant number of hashes. If one is used, there is still plenty to last for the upcoming years.

## Farmer vs Harvester?

A harvester can be thought of as a node that is an extension of your farmer. The harvester checks the plots and reports the results to the farmer, the farmer then submits the results to the blockchain.

## How can I Get Synced and stay Synced?

Every user has copy of the blockchain on their PC and the goal is that everyone is in sync or very close. Click on the **Full Node** tab, scroll down to see the connected Nodes/PCs. It can take some time on initial start up to collect peers, but if you're not getting peers automatically you'll have no way of getting synced.

You can check if you are synced by seeing a **synced** message in the top right of the wallet or on the full node tab. Additionally, the **Peak Height** should match closely to that of your peers. You can also confirm against a well-synced block explorer.

You can also try to force reload (top menu bar --> **Force Reload**). This may help get things syncing again after waiting 5-10 minutes. This should not affect your plotting.
