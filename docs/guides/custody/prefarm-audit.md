---
slug: /custody/prefarm-audit-tutorial
title: Prefarm Audit Tutorial
---

Chia Network Inc's prefarm is secured by a complex set of custodial rules. This document describes how to use the custody tool to audit the prefarm configuration. A moderate level of technical proficiency is probably needed to understand the details. For a high-level overview of the prefarm custody wallets, see our [blog post](https://www.chia.net/2022/10/29/a-new-home-for-the-prefarm/).

Other relevant documents:

- [Flow chart](/img/chia-custody-tool.png) to visualize how the custody tool works
- [User guide](/guides/custody-tool-user-guide) to help you get up and running
- [CLI reference](/custody-tool) for all custody commands used in this tutorial
- [Prefarm Alert Tool](https://github.com/Chia-Network/prefarm-alert) to access the public prefarm config files

## Prefarm Audit with the Internal Custody Tool
The following steps assume that you have installed and setup the custody tool following the [User guide](/guides/custody-tool-user-guide). 

1. Download the prefarm configuration files from the [Prefarm Alert Tool](https://github.com/Chia-Network/prefarm-alert/tree/main/singleton-metadata).
2. Run the custody tool command `cic sync -c <config-file-path>.txt -db <unique_db_path>.sqlite`
```bash
(venv) cic sync -c .\prefarm_configs\cold-us-public-config.txt -db .\sync_cold_us.sqlite
```

:::info

NOTE: This command has no result if completed successfully, but, you will see the corresponding sqlite file created.

:::

3. Show details of the associated singleton by running `cic show -c -db <unique_db_path>.sqlite`
```bash
(venv) cic show -c -db ./sync_cold_us.sqlite

Current time: 1696970325 (10/10/2023, 13:38:45)

Config up to date: True

Singleton:
  - launcher ID: 6c77dce3c3bab525dab7883e8ad513a8f3ff127e872009b12836cbb1c8f26647
  - amount left: 0
  - amount to claim: 9187500100033000911

Outstanding events:
  PAYMENTS:
  REKEYS:

Config:
 - current root: 9ab73274c5ca6cd0250b7b6b0352ad3190593bdb8f312d8aff3636c95208b0fb
 - withdrawal timelock: 2592000 seconds
 - payment clawback period: 7776000 seconds
 - rekey cancellation period: 5184000 seconds
 - rekey penalty: 1296000 seconds
 - slow rekey timelock: 3888000 seconds
```

:::info

This command shows the singleton launcher ID and the parameters associated with this specific prefarm wallet configuration (withdrawal, clawback, and cancellation periods).

:::

4. Show the singleton p2 address by running `cic p2_address -db <unique_db_path>.sqlite`
```bash
cic p2_address -db .\sync_cold_us.sqlite

xch1jj0gm4ahhlu3ke0r0fx955v8axr6za7rzz6hc0y26lewa7zw6fws5nwvv6
```
---

## Prefarm Audit with Block Records

:::info

NOTE: A high level of technical proficiency is needed to understand the details of this manual process for what the cic tool does above.
This process is a high-level guide and does not display expected results for each step.
The [chia-dev-tools](https://github.com/Chia-Network/chia-dev-tools#install) are needed for this audit.

:::

1. Use the internal custody tool to reveal the current root and other curried parameters (steps 1-4 above).
2. Curry the necessary parameters into the prefarm_inner.clsp `(THIS_MOD_HASH, ROOT, STATE)`:
    1. `THIS_MOD_HASH` = this code's sha256 tree hash without its curried arguments.
    2. `ROOT` = the current root provided by the internal custody tool.
    3. `STATE` = a tree with the following elements in order `((REKEY_MOD_HASH . ACH_MOD_HASH) . (ACH_TIMELOCK . (BASE_REKEY_TIMELOCK . SLOW_REKEY_PENALTY)))`:
       1. `REKEY_MOD_HASH` = rekey puzzle sha256 tree hash without its curried arguments.
       2. `ACH_MOD_HASH` = ach puzzle sha256 tree hash without its curried arguments.
       3. `ACH_TIMELOCK` = integer of the ach timelock also referred to as the Withdrawal Timelock.
       4. `BASE_REKEY_TIMELOCK` = integer of the rekey timelock.
       5. `SLOW_REKEY_PENALTY` = integer of the slow rekey penalty.
3. Curry the necessary parameters into singleton_top_layer_v1_1.clsp `(SINGLETON_STRUCT INNER_PUZZLE)`:
    1. `SINGLETON_STRUCT` = a tree with the following elements in order `(MOD_HASH . (LAUNCHER_ID . LAUNCHER_PUZZLE_HASH))`:
       1. `MOD_HASH` = singleton_top_layer puzzle sha256 tree hash without its curried arguments.
       2. `LAUNCHER_ID` = the ID of the singleton we are committed to paying.
       3. `LAUNCHER_PUZZLE_HASH` = the puzzle hash of the launcher.
    2. `INNER_PUZZLE` = the compiled form of the inner puzzle (result of the previous curry).
4. Derive the puzzle hash from the compiled form of the singleton.
```bash
opc -H <compiled_puzzle>
```
5. Convert the puzzle hash into the singleton p2 puzzle by currying the necessary parameters `(SINGLETON_MOD_HASH, LAUNCHER_ID, LAUNCHER_PUZZLE_HASH)`:
    1. `SINGLETON_MOD_HASH` - singleton_top_layer puzzle sha256 tree hash without its curried arguments .
    2. `LAUNCHER_ID` - the ID of the singleton we are committed to paying.
    3. `LAUNCHER_PUZZLE_HASH` - the puzzle hash of the launcher.
6. Encode the singleton p2 puzzle to reveal the p2 address.
```bash
cdv encode -p xch <singleton_p2_puzzle>
```
   

:::info

NOTE: This is the address used when sending funds to the vault.

:::

---

## Further reading

- [A New Home for the Prefarm blog](https://www.chia.net/2022/10/29/a-new-home-for-the-prefarm/)
- [Cypherpunks in Sportcoats: Blockchain in the Real World](https://www.chia.net/2023/01/17/cypherpunks-in-sportcoats-chias-custody-is-a-killer-app/)
