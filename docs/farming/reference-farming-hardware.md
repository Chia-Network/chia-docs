---
title: Reference Farming Hardware
slug: /reference-farming-hardware
---

# Reference Farming Hardware - Farming at Any Level

## Curious

The easiest way to get started in Chia is by attaching a USB hard drive to a desktop computer, or installing a SATA hard drive. The minimum amount of storage needed to farm is only a single plot! Beginners should start with a few drives to make it worth running the farm, and earn a few dollars per month. You can you use your desktop computer to create the plots (see plotting). There are companies like Evergreen that make it one step easier and remove the plotting step by offering a pre-plotted drive and a mobile app. Plotting is going to be the limiting factor for curious farmers because their desktop or laptop may not have enough compute and temporary SSD storage that is suitable for plotting, but filling up a single drive with plots is fairly easy even for beginners.

<img src="https://www.chia.net/wp-content/uploads/2023/04/Hard-Drive-Standard.webp" width="300" /> 

## Hobbyist

Once you get to a few hundred terabytes, think about a dedicated desktop computer for Chia farming, a NAS, or an external storage enclosure. A general rule of thumb is to look at the cost per slot (per drive) attached so you don’t end up spending more money to store the disks than the disks themselves!

<img src="https://www.chia.net/wp-content/uploads/2023/04/nas-glass.jpg" width="300" />

### NAS

A NAS, or networked attached storage, is a device dedicated to having hard drives included in a backplane and a lightweight CPU and DRAM. NAS serves storage through the network (as opposed to DAS, or direct-attached storage). NAS have a high number of drives in small space, and are extremely power efficient. The only downside is they tend to be more expensive than raw enclosures since they are made for consumer storage and applications.

### External Storage (USB) for multiple drives

External storage bays that use USB can attach 5-8 drives with a single USB cable, and have integrated power and cooling (fans). These are great for a hobbyist to expand with their current computer hardware.

### Desktops with high amount of drive count

A standard full tower desktop can hold 8-12 3.5in HDDs. These cases are user friendly for anyone who has built a standard desktop PC, and installing HDDs with SATA cables and ATX power supplies doesn’t require a ton of specialized computer experience.

## Pro

Pros are shooting for over a petabyte of storage, where more advanced tactics come into play. These can include GPU plotting, HBAs (host bus adapters), and used enterprise storage servers. Used enterprise storage gear is a great place to start, since servers with high drive count can be found inexpensively on eBay and other used markets. Older JBODs that house 24-45 drives can be found for a few hundred dollars used. While these are cost-effective, they do require the farmer to learn about enterprise storage protocols and infrastructure like SAS. Pros generally mix consumer and enterprise gear to be ruthlessly cost-efficient with their purchases.

<img src="https://www.chia.net/wp-content/uploads/2023/04/desktop-farmer.webp?" width="300" />

## Serious

Serious Chia farmers that are going for multiple petabytes will start having to enter the world of server racks. Thankfully, data centers around the world have already engineered the best way to store an extremely large amount of storage in server racks. A serious farmer will be using JBODs. A JBOD, or "Just a bunch of disks" is a device dedicated to housing a large number of hard disk drives, and does not contain any integrated compute resources. A JBOD is typically made up of an enclosure, enclosure slots that identify each drive individually, a SAS expander and backplane, fans, and power supplies. All the disks in a JBOD can be accessed by a single SAS cable connected to a host server or desktop through a HBA (host bus adapter) which converts a PCIe slot to SAS. Serious farmers will put many of these JBODs in a rack to get extremely dense storage, which can achieve over 10 petabytes in a single rack using modern JBODs and high-capacity HDDs.

<img src="https://www.chia.net/wp-content/uploads/2023/04/Rack-Scael-Edit-2.webp" width="300" />