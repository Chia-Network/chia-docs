---
title: Plotting FAQ
slug: /plotting-faq
---

### If power goes out what happens?

Answer- In the chia software, the plots that currently being built are now non operational. When you start Chia they will be gone and need to be restarted. One item to do is to go into your temporary storage and delete all those .tmp files it created. This is the one time it will not self delete those files if a new plot is started. Not deleting them may cause that storage device to run out of room when it starts 1 or multiple plots. All your existing plots are "safe" in their existing storage.

### Can I use USB 3.0 cable connected to SSD/NVME running the Temp files?

Answer- On Windows - it has not worked well- the communication speed is not fast enough, sometimes the usb turns off, then the plot is not useable. It's possible to run 1 plot, but limiting when trying to process multiple plots. Most are installing PCIe adapters to SSC/NVME and that solves the issue. The mac has very fast communication to do the first plot, - many others are saying that they can do 2 plots but process time increases dramatically. Technology is constantly changing so continue to do research and ask in the chat rooms.

Once a hash is used from a plot-- does it need to be deleted. Answer-- no-- an example is , a plot has 300,000 hashes that the user created. If one is used, there are enough to last an estimated 5 years.

Farmer vs Harvester: Harvester checks the plots and reports the results to the farmer, farmer then submits the results to the blockchain

### Peak Blockchain and checking if Chia is in sync

_The chia blockchain software_ : Every user has copy of the blockchain on their PC and the goal is that everyone is in sync or very close. Click on the Full Mode tab, scroll down to see the connected Nodes/ PC. If the time and date is off by 30 minutes then the software is not synced to blockchain or others. Multiple ways to check-- on Full node -- look at peak height and date/time--- then go below and look at connections and your peak should match the other computers. Also the peak should be close when you click on wallet tab with that wallet peak number. The wallet peak number sometimes is off by 10 numbers. If off by several hundred it's not in sync.

On the GUI-- on the top menu bar -- click on View then Force Reload. It will take about 5-10 minutes, to re-sync. Your keys will come up again to click to enter Chia. It will not affect your plotting.

### How to tell if Chia is working on Windows GUI

When you are first operating Chia and wondering if the software is working- here is some information to keep you informed.
All of the chia programming is in a file called config.yaml located in c:/Users/ (Your username)/.chia/mainnet/config.yaml

Shut down Chia software before config access.
Open Config with notepad. In the middle _ log_level: WARNING _ change wording of WARNING to INFO.
Save File and exit. Start up Chia-- give it 20 minutes to run

Can access the log files and read activity, while Chia is running. It's located in c:/Users/ (Your username)/.chia/mainnet/log/debug.log
Log files are very informative. Once a log fills to 20mb another is created. If there are too many you can delete some of them.

Inside what you are looking for are these lines
_07:02:41.663 harvester src.harvester.harvester : INFO 1 plots were eligible for farming f53c496e80... Found 0 proofs. Time: 0.00500 s. Total 8 plots_

This means Chia is working-- The filter system is 2 parts. Chia found that 1 plot passed the (1st) part, now it looks inside to determine if a pre-formulated "proof" will be able to do a transaction in fastest time (2-3 seconds) if it secures one in your plot then you win 1 proof means you won a coin. Many times it will say 0 proofs. But it shows it's working. This is where luck/time comes into play. At the end of that line it will indicate how many plots the software registers.

### What is normal information in a log file

Below is a copy of normal information from a log file. :

---

_9:32:00.322 full_node full_node_server : INFO <- new_signage_point_or_end_of_sub_slot from peer 68b376e5846696df3510822ea527d0899ac6183f261e8858119235cd24903720 193.91.103.92._-

---

_9:32:00.278 farmer farmer_server : INFO <- new_signage_point from peer 62d37909657e183dcd702b66d0e694474f907361f5981eceaba00878e84419c4 127.0.0.1._

---

_09:32:01.806 full_node full_node_server : INFO -> respond_peers to peer 202.185.44.200 e5b7f06ba6ece8698917e0e22971aef8602972de81efe379d693b2baa0dffc24._

---

_09:32:08.063 full_node full_node_server : INFO -> request_signage_point_or_end_of_sub_slot to peer 74.138.106.114 b567363c3a96c13366ef2dbff2e080da77f310875a8beda7c1c07246173c3a06._

---

_09:32:08.202 harvester harvester_server : INFO <- new_signage_point_harvester from peer 5bfd9af9bc76270cf76746255db9a435dca56b9adb37f5d1daec71e3c699c807 192.168.0.44._

---

_09:32:08.211 harvester src.harvester.harvester : INFO 0 plots were eligible for farming fec1fff66e... Found 0 proofs. Time: 0.00200 s. Total 8 plots._

---

The last line again shows at that current time of 09:32:08.211- that on this machine, of the 8 plots farming 0 plots were eligible. It still means the software recognized the plots and it's working.

Everyone is very helpful to answer questions. The group does ask for questions to be in the selected chat room. Beginner questions in Beginner etc.
