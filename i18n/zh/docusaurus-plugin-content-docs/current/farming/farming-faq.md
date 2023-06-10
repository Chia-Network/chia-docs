---
title: Farming FAQ
slug: /farming-faq
---

## How to tell if Chia Farming is Working?

When you are first operating Chia and wondering if the software is working, here are some tips to keep you sane.

First off, you'll want to have your configuration set up to do additional logging. The configurations can be found in `config.yaml`. This file is located in `chia/mainnet/config.yaml`.

The location of the `.chia` folder varies, On windows you'll want to look in `C:/Users/your username)/.chia/mainnet/config.yaml`. On Mac, this file is located in `/Users/(your username)/.chia/mainnet/config/config.yaml`.

Shut down Chia before config access. Open `config.yaml` and edit the first `log_level`, setting it `INFO` instead of `WARNING`. Save the file.

Now, you can relaunch Chia. Give it 20 minutes to run.

Opening the log file while Chia is running, you'll see additional messages. You can find `debug.log` in the `log` directory right next to `config` directory accessed earlier.

Log files are very informative. Once a log fills to 20mb another is created. If there are too many you can delete some of them.

Inside what you are looking for are these lines:

```
_07:02:41.663 harvester src.harvester.harvester : INFO 1 plots were eligible for farming f53c496e80... Found 0 proofs. Time: 0.00500 s. Total 8 plots_
```

This means Chia is working. The filter system is 2 parts. Chia found that 1 plot passed the first part, now it looks inside to determine if a pre-formulated "proof" will be able to do a transaction in the fastest time (2-3 seconds). If it secures one in your plot, you win. Many times it will say 0 proofs. But it shows it's working. This is where luck/time comes into play. At the end of that line it will indicate how many plots the software registers.

:::info
Another way to ensure your farm is operational is checking against a pool. Consistent payouts from regulary partials sent gives you peace of mind. This is opposed to solo farming where you may need to wait days, weeks, or months for a win, the whole time wondering if it truly is set up right. Checkout [pool-farming](/pool-farming).
:::

## What is Normal Information in a Log File?

Below is a copy of normal information from a log file:

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

The last line shows at that current time of 09:32:08.211 8 plots were farming and 0 plots were eligible. It still means the software recognized the plots and is farming.
