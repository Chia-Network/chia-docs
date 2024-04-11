---
title: Timelords
slug: /timelords
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Detailed information regarding timelord architecture can be found [here](/timelord-architecture)

---

## Requirements
:::info
Timelords execute sequential verifiable delay functions (proofs of time or VDFs), that get added to blocks to make them valid. This requires fast CPUs and a few cores per VDF.

:::

<Tabs
defaultValue="sw-tl"
groupId="timelord"
values={[
{label: 'Software TL', value: 'sw-tl'},
{label: 'Bluebox TL', value: 'bb-tl'},
{label: 'Hardware (ASIC) TL', value: 'hw-tl'},
]}>
<TabItem value="sw-tl">

TODO: Add specs for sw tl

  </TabItem>
  <TabItem value="bb-tl">

TODO: Add bb tl info

  </TabItem>
  <TabItem value="hw-tl">

TODO: Add specs for hw (ASIC) tl including cluster

  </TabItem>
</Tabs>

## Installing a Timelord
:::info
Due to restrictions on how [MSVC](https://en.wikipedia.org/wiki/Microsoft_Visual_C%2B%2B) handles 128 bit numbers and how Python relies upon MSVC, it is not possible to build and run Timelords of all types on Windows.
:::

<Tabs
defaultValue="sw-tl"
groupId="timelord"
values={[
{label: 'Software TL', value: 'sw-tl'},
{label: 'Bluebox TL', value: 'bb-tl'},
{label: 'Hardware (ASIC) TL', value: 'hw-tl'},
]}>
<TabItem value="sw-tl">

TODO: Add install for sw tl

  </TabItem>
  <TabItem value="bb-tl">

TODO: Add bb tl info

  </TabItem>
  <TabItem value="hw-tl">

TODO: Add install for hw (ASIC) tl including cluster

  </TabItem>
</Tabs>


TODO: add the below info:
```
### Regular Timelords

On MacOS x86_64 and all Linux distributions, building a Timelord is as easy as running `chia start timelord &` in the virtual environment. You can also run `./vdf_bench square_asm 400000` once you've built Timelord to give you a sense of your optimal and unloaded ips. Each run of `vdf_bench` can be surprisingly variable and, in production, the actual ips you will obtain will usually be about 20% lower due to load of creating proofs. The default configuration for Timelords is good enough to just let you start it up. Set your log level to INFO and then grep for "Estimated IPS:" to get a sense of what actual ips your Timelord is achieving.

### Bluebox Timelords

Once you build the Timelord with `sh install-timelord.sh` in the virtual environment, you will need to make two changes to `~/.chia/VERSION/config.yaml`. In the `timelord:` section, set `bluebox_mode:` to `True`. Then you need to proceed to the `full_node:` section and set `send_uncompact_interval:` to something greater than 0. We recommend `300` seconds there so that your Bluebox has some time to prove through a lot of the un-compacted Proofs of Time before the node drops more into its lap. The default settings may otherwise work but if the total effort is a little too much for whatever machine you are on you can also lower the `process_count:` from 3 to 2, or even 1, in the `timelord_launcher:` section. You know it is working if you see `VDF Client: Sent proof` in your logs at INFO level.
```


## Running a Timelord
:::info

:::

<Tabs
defaultValue="sw-tl"
groupId="timelord"
values={[
{label: 'Software TL', value: 'sw-tl'},
{label: 'Bluebox TL', value: 'bb-tl'},
{label: 'Hardware (ASIC) TL', value: 'hw-tl'},
]}>
<TabItem value="sw-tl">

TODO: Add running info for sw tl

  </TabItem>
  <TabItem value="bb-tl">

TODO: Add bb tl info

  </TabItem>
  <TabItem value="hw-tl">

TODO: Add running info for hw (ASIC) tl including cluster

  </TabItem>
</Tabs>

## Troubleshooting a Timelord
For troubleshooting steps please refer to the documentation [here](/troubleshooting/timelords).

---

## Timelord support

Join Our [Discord](https://discord.gg/chia) and jump into the #support channel for support

---
