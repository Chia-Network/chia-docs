---
sidebar_label: ASICs
title: ASICs HW VDF
slug: /asic-cli
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Reference

### `hw_vdf_client`

Functionality: Run the ASIC HW VDF Software

Usage: hw_vdf_client [OPTIONS] PORT [N_VDFS]

Options:

| Long Command       | Type    | Required | Description                                           |
| :----------------- | :------ | :------- | :---------------------------------------------------- |
| --freq             | INTEGER | False    | set ASIC frequency [%d, 200 - 2200]                   |
| --voltage          | INTEGER | False    | set board voltage [.88, 0.7 - 1.0]                    |
| --ip               | TEXT    | False    | timelord IP address [localhost]                       |
| --vdfs-mask        | TEXT    | False    | mask for enabling VDF engines [7, 1 - 7]              |
| --vdf-threads      | TEXT    | False    | number of software threads per VDF engine [4, 2 - 64] |
| --proof-threads    | TEXT    | False    | number of proof threads per VDF engine [3, 1 - 63]    |
| --auto-freq-period | TEXT    | False    | auto-adjust frequency every N seconds [0, 10 - inf]   |
| --list             | TEXT    | False    | list available devices and exit                       |
| --help             | None    | False    | Show a help message and exit                          |

<details>
<summary>Example 1 - Run the ASIC software with defaults</summary>

```bash
hw_vdf_client 8000 3
```

Response:

```
2024-04-12T10:32:05.898 Setting frequency to 1100.000000 MHz
2024-04-12T10:32:06.016 Frequency is 1100.000000 MHz
2024-04-12T10:32:06.020 Board voltage is 0.875 V
2024-04-12T10:32:06.020 Setting voltage to 0.880 V
2024-04-12T10:32:06.021 Board voltage is now 0.875 V
2024-04-12T10:32:06.032 Board current is 0.698 A
2024-04-12T10:32:06.043 Board power is 0.610 W
2024-04-12T10:32:06.049 Connecting to 127.0.0.1:8000
2024-04-12T10:32:06.049 VDF 0: Connected to timelord, waiting for challenge
```

</details>

<details>
<summary>Example 2 - Run the ASIC software with auto-frequency, initial frequency, and defined ip</summary>

```bash
hw_vdf_client --freq 1500 --auto-freq 60 --ip 192.168.0.122 8000 3
```

Response:

```
2024-04-12T10:32:05.898 Setting frequency to 1500.000000 MHz
2024-04-12T10:32:06.016 Frequency is 1500.000000 MHz
2024-04-12T10:32:06.020 Board voltage is 0.875 V
2024-04-12T10:32:06.020 Setting voltage to 0.880 V
2024-04-12T10:32:06.021 Board voltage is now 0.875 V
2024-04-12T10:32:06.032 Board current is 0.698 A
2024-04-12T10:32:06.043 Board power is 0.610 W
2024-04-12T10:32:06.049 Connecting to 192.168.0.122:8000
2024-04-12T10:32:06.049 VDF 0: Connected to timelord, waiting for challenge
```

</details>

<details>
<summary>Example 3 - Run the ASIC software with defined ip and only 1 vdf (i.e. defaults for cluster)</summary>

```bash
hw_vdf_client --ip 192.168.0.122 8000 1
```

Response:

```
2024-04-12T10:32:05.898 Setting frequency to 1100.000000 MHz
2024-04-12T10:32:06.016 Frequency is 1100.000000 MHz
2024-04-12T10:32:06.020 Board voltage is 0.875 V
2024-04-12T10:32:06.020 Setting voltage to 0.880 V
2024-04-12T10:32:06.021 Board voltage is now 0.875 V
2024-04-12T10:32:06.032 Board current is 0.698 A
2024-04-12T10:32:06.043 Board power is 0.610 W
2024-04-12T10:32:06.049 Connecting to 192.168.0.122:8000
2024-04-12T10:32:06.049 VDF 0: Connected to timelord, waiting for challenge
```

</details>

---

## Troubleshooting a Timelord

For troubleshooting steps please refer to the documentation [here](/troubleshooting/timelords).

---

## Timelord support

Join Our [Discord](https://discord.gg/chia) and jump into the #support channel for support

---

## Timelord FAQ

For FAQ please refer to the documentation [here](/timelord-install#timelord-faq).

---
