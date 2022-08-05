---
title: Reference Farming Hardware
slug: /reference-farming-hardware
---

The farming process is very lightweight and can be run with minimal CPU and DRAM resources. The goal of a good farming platform is to have the maximum amount of capacity in the least amount of space, using as little power as possible. In other words, the priority for a farming platform, independent of obtaining storage for the lowest cost possible, is to have the highest amount of TB/W in a small space.

## DIY Farms

**Building your own rig as illustrated below requires solid IT skills and knowledge of how to safely handle electrical components. In some places these builds are not lawful without being a licensed electrician. Replicate at your own risk! Keep this far away from kids!**

**Farming productively** (03/19/2021 through 04/04/2021), 163 blocks / 326 XCH at network space 120 ~ 200 PiB.

There are many unique DIY builds in the farming hardware channel that find unique uses for repurposing existing hardware to mount drives.
Here a build from early community user that houses 32 drives farming off a [RockPi4](https://rockpi.org/rockpi4) and [Sabrent USB hubs](https://www.amazon.com/dp/B07KHRLSTT/ref=cm_sw_r_cp_awdb_imm_t1_1DEK038PXEQEHDMAR6F8) for an average power consumption of ~250W & ~5.6kWh per day (last 30 days) - easily making it one of the most power-efficient farms built so far!

Parts list (prices change constantly):

- 32x Hard drives, different sizes and models from sizes 3 to 16 TB
- 32x USB3/SATA PCB boards, re-used from shucking external hard drives [but can also be ordered online](https://www.ebay.com/itm/SEAGATE-Expansion-STEB8000100-ASM1153-94V-0-PCB-Sata-USB-Replacement-Board/293098894236)
- 32x 12V DC power cables, re-used from shucking external hard drives
- 1x [MEAN WELL RSP-500-12 DC Power Supply 500W/12V/42A](https://www.amazon.com/gp/product/B085G65K3Y), $85
- 1x [Replacement Power Cable, 3 Pin Connector](https://www.amazon.com/gp/product/B0000510ZO), $4 (PSU does not come with it)
- 2x [Sabrent 16-Port USB 3.0 Data HUB](https://www.amazon.com/gp/product/B07KHRLSTT), $69
- 1x [SMAKN 4 USB Car Charger Power Supply Step Down Module DC 9-40V to 5V 6A](https://www.amazon.com/gp/product/B01HQ9ENJG), $10
- 0.1x [8 AWG Copper Wire](https://www.amazon.com/GS-Power-Aluminum-Primary-Trailer/dp/B088QG9WG3/), $34 (this wire is used to connect power dist. bank with power supply)
- 2x [Power Distribution Banks](https://www.adafruit.com/product/737), $2
- 2x [Single Shelf Upright](https://www.homedepot.com/p/Rubbermaid-68-in-Single-Track-Upright-for-Wood-or-Wire-Shelving-FG4A7501UTLTY/100133076), $8
- a handful of metal screws and nuts
- 1x [Rock Pi 4A 4GB](https://shop.allnetchina.cn/products/rock-pi-4-model-a-board-only-no-wlan-bluetooth-poe?variant=15971694084198), $65
- 1x [Aluminum Heat Sink for Rock Pi 4](https://shop.allnetchina.cn/products/heatsink-for-rock-pi-4), $8
- 1x and optional [Kasa Smart HS300 Plug Power Strip](https://www.amazon.com/gp/product/B07G95FFN3), $69 (this can be used to monitor power consumption and control power remotely via smart phone)

(approx. $179.02 US for 2 Rock PI 4 & matching heat sink tax/shipping included)
Total: ~ $350 US (hard drives & UB3/SATA PCB not included : -)

(approx. 240W for 16x 3T HDD + 16x 10-16T HDD, less than 1W per TB, can be much improved when 3T HDD are replaced with larger drives)

<img src="https://user-images.githubusercontent.com/61642896/108285617-7db36600-7155-11eb-82bb-34c0665d45a2.jpg" width="700" />
<img src="https://user-images.githubusercontent.com/61642896/108290337-2a91e100-715e-11eb-9aab-8216c1760966.jpg" width="700" />

### Farming over 2200 x K32 plots in mostly under 1 second..

With the new consensus plots are probed very regularly. No issue for the RockPi4 to keep up with.

<img src="https://user-images.githubusercontent.com/61642896/108285566-59f02000-7155-11eb-83eb-29aea9fa023e.PNG" width="900" />

Plots with proofs for submission are found on a regular basis with over 2250x K32, providing the proof still no more than one second, with currently 22 PiB of total netspace.

<img src="https://user-images.githubusercontent.com/61642896/108290839-2c0fd900-715f-11eb-9067-9d8c885a73f0.PNG" widt="700" />

## Desktop Farming

A desktop in a full tower can house between 12-16 drives. This is a great setup for small farmers as desktops are the easiest to build and manage for PC enthusiasts. A full tower case that houses many drives can be found from many different vendors at a low cost. Typical desktop motherboards contain between 6-10 SATA ports, so expanding past that will also require a SAS HBA.
Pros – cheap, easy to configure and customize
Cons – need to build yourself and source

### Examples

[Obsidian Series™ 750D Full Tower ATX Case](https://www.corsair.com/us/en/Categories/Products/Cases/Obsidian-Series%E2%84%A2-750D-Full-Tower-ATX-Case/p/CC-9011035-WW)

<img src="https://preview.redd.it/xd8bgja34vg61.png?width=960&crop=smart&auto=webp&s=b4879c70c0afc1a79a0157b9d1f3abbc61e3c590" width="300" />

[Source for pic](https://www.reddit.com/r/DataHoarder/comments/lhp1g7/first_nas_build_update_corsair_750d/)

A desktop board can be put into an easily obtainable [Rosewill 4U Server Chassis Case](https://www.amazon.com/dp/B0091IZ1ZG/ref=cm_sw_em_r_mt_dp_RQRJF9S2PHGBPC6DQ90D). This case features up to 16 drives and 7 fans included, and just needs a standard desktop PSU to get going.

## JBOD, DAS (direct-attached storage)

A JBOD, or "Just a bunch of disks" is a device dedicated to housing a large number of hard disk drives, and does not contain any integrated compute resources. A JBOD is typically made up of an enclosure, enclosure slots that identify each drive individually, a SAS expander and backplane, fans, and power supplies. All the disks in a JBOD can be accessed by a single SAS cable connected to a host server or desktop through a HBA (host bus adapter) which converts a PCIe slot to SAS.

![SM45](https://www.supermicro.com/a_images/products/Chassis/4U/SC847-RJBOD_spec.jpg)

### Example

Mainstream JBOD – 45 disks in 4U chassis. Referred to in the farming channel as the SM45, this can be found on eBay for $300-400 making it very cost-efficient for medium to large size farms
[Supermicro SuperChassis 847E16-RJBOD1](https://www.supermicro.com/en/products/chassis/4U/847/SC847E16-RJBOD1)

Recommended HBAs to attach to host - LSI 9200-8e [(ebay)](https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1313&_nkw=LSI+9200-8e&_sacat=0), 9200-16e [(ebay)](https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1311&_nkw=lsi+sas9200-16e&_sacat=0) along with SFF-8088 to SFF-8088 1M External SAS Cable, or 9300 [(ebay)](https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1311&_nkw=lsi+9300&_sacat=0) or 9400-8e [(ebay)](https://www.ebay.com/sch/i.html?_from=R40&_trksid=p2380057.m570.l1311&_nkw=9400-8e&_sacat=0) with SAS SFF-8644 to SFF-8088 cable

High drive count – 90 disks in 4U chassis. highest density on the market, but typically goes for $1200-2000 used.
[Supermicro SuperChassis 946ED-R2KJBOD](https://www.supermicro.com/en/products/chassis/4U/946/SC946ED-R2KJBOD)

<img src="https://www.supermicro.com/CDS_Image/uploads/chassis/sc946ed_ad_pull-out_new_20150727.jpg" width="300" />

**Pros**
High number of slots. Fully integrated power supplies and fans. Uses SAS enclosure management to identify slots in software and identify a failed device with an LED locate function. Can use SAS or SATA drives.

**Cons**
Fans can be loud. Heavy. Requires data center rack to be mounted correctly.

## NAS Farming

A NAS, or networked attached storage, is a device dedicated to having hard drives included in a backplane and a lightweight CPU and DRAM. NAS serves storage through the network (as opposed to DAS, or direct-attached storage)

### Examples

[Synology DiskStation DS1821+](https://www.synology.com/en-us/products/DS1821+)

<img src="https://www.synology.com/img/products/detail/DS1821plus/heading@2x.png" width="300" />

**Pros** – high number of drives in small space, extremely power efficient

**Cons** – expensive compared to other options, plugin required for farmer or harvester (not complete yet), typically setup with redundancy for data protection which is not required for farming. SATA drives only (which is fine for most)
