---
title: Farming Considerations
slug: /farming-considerations
---

# Farming Hardware Considerations

Rewards in Chia scale with the amount of storage space (hence the name “Proof of Space”). Storage is a commodity and is relatively low power compared to other computing devices. In general, a Chia farmer expects to spend the majority of their investment on disk (generally 80-90%) and the rest on operational expenses. A less efficient farm may spend 50-80% of the cost on disks and the rest on operational expenditures (OpEx) like power and cooling. We can work backward and take into consideration the goals for setting up a Chia farm.

1. Maximize the amount of storage capacity you can fit in a given footprint. In the data center, this is commonly referred to as TB/rack unit. This can be achieved by having dense storage systems (e.g. JBOD, NAS) and using high-capacity hard disk drives (HDD)
Spend as little as possible. $/TB attached or $/drive attached since the system cost is amortized over how many drives the farmer can attach the more drives you have per system, the lower the cost per drive.
2. Minimize power consumption. We want Chia to be as energy-efficient as possible, so we want the supporting farming platform to minimize the power overhead of the farmer. In a well build Chia farm the drives consume the majority of the power.
3. Power efficiency. We want the power we consume to be used by the hard drives and the farmer, not to be wasted in power supply efficiency or from excess cooling (fans).
4. Minimize noise (measured in dB). If you are hosting your farmer at home, you need it to be reasonably quiet. Ignore this if you are putting in colocation, a datacenter, or a remote location where noise is not an issue. The tradeoff for noise is usually with cooling (fan speed) and power.
5. Keep drives cool. HDDs last longer (fail less) when they are kept in the recommended temperature operating range. This varies between consumer and data center grade HDDs. To do this requires adequate airflow and fans in the farming case, and also monitoring with SMART.
6. Reliability and Availability (uptime). We do not want the farming system to go down. We do not want any single failed component on the farmer to take the whole system down. We do not want farming downtime (this is lost time and XCH farming)
Host connectivity. In general, farming will be either remotely connected through the network (NAS, network-attached storage) or directly attached to the farmer (DAS, direct attach storage). There is not one correct way to attach many drives, but generally a DAS is going to be the lowest cost and complexity for Chia farming.
7. Redundancy & RAID. The majority of storage systems are designed with durable storage in mind, and contain redundancy with RAID, erasure code, mirroring, or backups. This is not required in Chia because plots can be recreated upon a device failure and the opportunity cost of using redundant storage vs having that space farming generally outweighs the energy and time to create the plots. This may not be the case for very small farmers with limited plotting power, but the overwhelming majority of users should not need to use any sort of RAID with Chia.
8. Nice to haves (these are standard in JBODs that make life much, much easier)
Hot-swap, field-replaceable drives: the ability to swap a hard drive without taking the system offline (turning it off), generally accessible through the front or top of the chassis
staggered spin-up: hard drives consume much more power (25W) for the first 10 seconds or so that they are turned on, from something called in-rush current. Compare this with the 3.5-5W required for idle operation in farming per drive. Staggered spin-up spins up only a certain number of drives at a time to limit max power consumption
slot identification: hard drives fail. When this happens, you want to easily identify a slot that contains the failed drive. This is done through a LED locate.
