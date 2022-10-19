---
id: custody-tool
slug: /custody-tool
title: Custody Tool
---

### Intro

Chia's internal custody tool enables multisig, clawback, and rekeying. These features allow you to store assets on Chia's blockchain in one of the most secure setups ever devised.

This page includes a comprehensive list of Chia's Command Line Interface commands for using the custody tool.

For more info, see the following:

* [Basic description](/custody-tool-description) of how the custody tool works
* [Flow chart](/img/chia_custody_tool.png) to visualize how the custody tool works
* [User guide](/custody-tool-user-guide) to help you get up and running

### Reference

### `audit`

Functionality: Export a history of the singleton to a CSV

Usage: `cic audit [OPTIONS]`

Options:

| Short Command | Long Command | Type | Required | Description                                                          |
| :------------ | :----------- | :----| :------- | :------------------------------------------------------------------- |
| -db           | --db-path    | TEXT | True     | The file path to the sync DB (default: ./sync (\*\*\*\*\*\*).sqlite) |
| -f            | --filepath   | TEXT | False    | The file path the dump the audit log               |
| -d            | --diff       | TEXT | False    | A previous audit log to diff against this one                        |
| -h            | --help       | None | False    | Show a help message and exit                                         |

<details>
<summary>Example</summary>

Request:

```bash
cic audit -db './sync (b43314).sqlite' 
```

Response:

```
[
    {
        "time": 1665430389, 
        "action": "HANDLE_PAYMENT", 
        "params": {
            "out_amount": 1000000000, 
            "recipient_ph": "3377e81d20ad9a3028ffe7e77360c03df48c412f2525aac58035738888adb83d", 
            "in_amount": 1000000000000, 
            "completed": true, 
            "spent_at_height": 1645707
        }
    }, 
    {
        "time": 1665449184, 
        "action": "HANDLE_PAYMENT", 
        "params": {
            "out_amount": 1000000000, 
            "recipient_ph": "3377e81d20ad9a3028ffe7e77360c03df48c412f2525aac58035738888adb83d", 
            "completed": false, 
            "spent_at_height": 1645981, 
            "clawback_pubkey": "bls12381jjh08qx6hvucdrkgn8mrkafqrrp4j6sm4azndk0wz3precaa0teeyeamwtltxv435tsmx2tyayrwg8jy3x4"
        }
    }, 
    {
        "time": 1665980779, 
        "action": "START_REKEY", 
        "params": {
            "from_root": "74905b06591f9d2e615d313d18cfbcbeffcaabe2e70ccdeafda783bacaae52ef", 
            "to_root": "90ba2a1ce4ca7f094aa1d2c64b7281b18a4e211e704b43ed45bf39f61cdd67d2", 
            "completed": true, 
            "spent_at_height": 1674754
        }
    }, 
    {
        "time": 1665986686, 
        "action": "START_REKEY", 
        "params": {
            "from_root": "90ba2a1ce4ca7f094aa1d2c64b7281b18a4e211e704b43ed45bf39f61cdd67d2", 
            "to_root": "c330a8f9ed6a3fd50953f0b6365019246ea08d854ddbed0da3149dd4006abf1f", 
            "completed": true, 
            "spent_at_height": 1674940
        }
    }
]
```

</details>


---

### `clawback`

Functionality: Clawback a withdrawal or rekey attempt (will be prompted which one)

Usage: `cic clawback [OPTIONS]`

Options:

| Short Command | Long Command | Type | Required | Description                                                          |
| :------------ | :----------- | :----| :------- | :------------------------------------------------------------------- |
| -db           | --db-path    | TEXT |   True   | The file path to the sync DB (default: ./sync (\*\*\*\*\*\*).sqlite) |
| -f            | --filename   | TEXT |  False   | The filepath to dump the spend bundle into                           |
| -pks          | --pubkeys    | TEXT |   True   | A comma separated list of pubkeys that will be signing this spend    |
| -h            | --help       | None |  False   | Show a help message and exit                                         |

<details>
<summary>Example</summary>

Request:

```bash
cic clawback -f clawback.unsigned -pks "1.pk,2.pk"
```

Response:

None

</details>

---

### `complete`

Functionality: Complete a withdrawal or rekey attempt (will be prompted which one)

Usage: `cic complete [OPTIONS]`

Options:

| Short Command | Long Command | Type | Required | Description                                                          |
| :------------ | :----------- | :----| :------- | :------------------------------------------------------------------- |
| -db           | --db-path    | TEXT | True     | The file path to the sync DB (default: ./sync (\*\*\*\*\*\*).sqlite) |
| -f            | --filename   | TEXT | False    | The filepath to dump the spend bundle into                           |
| -h            | --help       | None | False    | Show a help message and exit                                         |

<details>
<summary>Example -- complete a withdrawal</summary>

Request:

```bash
cic complete -f complete.signed
```

Response:

```
Which actions would you like to complete?:

1) PAYMENT to xch1xdm7s8fq4kdrq28lulnhxcxq8h6gcsf0y5j643vqx4ec3z9dhq7sqxsa9j of amount 1000000000
(Enter index of action to complete): 1
Successfully wrote spend to complete.signed
```

</details>

---

### `derive_root`

Functionality: Take an existing configuration and pubkey set to derive a puzzle root

Usage: `cic derive_root [OPTIONS]`

Options:

| Short Command | Long Command         |  Type   | Required | Description                                                                                                                                                 |
| :------------ | :------------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -c            | --configuration      | TEXT    | False    | The configuration file with which to derive the root (or the filepath to create it at if using --db-path) [default: ./Configuration (needs derivation).txt] |
| -db           | --db-path            | TEXT    | False    | Optionally specify a DB path to find the configuration from                                                                                                 |
| -pks          | --pubkeys            | TEXT    | True     | A comma separated list of pubkey files that will control this money                                                                                         |
| -m            | --initial-lock-level | TEXT    | True     | The initial number of pubkeys required to do a withdrawal or standard rekey                                                                                 |
| -n            | --maximum-lock-level | TEXT    | False    | The maximum number of pubkeys required to do a withdrawal or standard rekey                                                                                 |
| -min          | --minimum-pks        | INTEGER | False    | The minimum number of pubkeys required to initiate a slow rekey [default: 1]                                                                                |
| -va           | --validate-against   | TEXT    | False    | Specify a configuration file to check whether it matches the specified parameters                                                                           |
| -h            | --help               | None    | False    | Show a help message and exit                                                                                                                                |

<details>
<summary>Example -- set up a 2-of-3 root config</summary>

Request:

```bash
cic derive_root -pks "1.pk,2.pk,3.pk" -m 2 -n 3
```

Response:

```
Custody rules successfully added to configuration
```

</details>

---

### `examine_spend`

Functionality: Examine an unsigned spend bundle to see the details before you sign it

Usage: `cic examine_spend [OPTIONS] SPEND_FILE`

Options:

| Short Command | Long Command       | Type    | Required | Description                                                       |
| :------------ | :----------------- | :------ | :------- | :---------------------------------------------------------------- |
|               | --qr-density       | INTEGER | False    | The amount of bytes to pack into a single QR code  [default: 250] |
| -va           | --validate-against | TEXT    | False    | A new configuration file to check against requests for rekeys     |
| -h            | --help             | None    | False    | Show a help message and exit                                      |

`SPEND_FILE` is an unsigned spend bundle. This command will convert the spend bundle into a QR code and open it into a web browser for printing. You can then scan this QR code, for example using an HSM's QR scanner, for easier signing.

<details>
<summary>Example -- examine a rekey spend bundle</summary>

Request:

```bash
cic examine_spend ./rekey.unsigned 
```

Response:

```
Type: Rekey
From: 74905b06591f9d2e615d313d18cfbcbeffcaabe2e70ccdeafda783bacaae52ef
To: 90ba2a1ce4ca7f094aa1d2c64b7281b18a4e211e704b43ed45bf39f61cdd67d2
Slow factor: 1
Spenders: bls12381jjh08qx6hvucdrkgn8mrkafqrrp4j6sm4azndk0wz3precaa0teeyeamwtltxv435tsmx2tyayrwg8jy3x4
Press Enter to exit
```

</details>

---

### `export_config`

Functionality: Export a copy of the current DB's config

Usage: `cic export_config [OPTIONS]`

Options:

| Short Command | Long Command | Type | Required | Description                                                                                   |
| :------------ | :----------- | :--- | :------- | :-------------------------------------------------------------------------------------------- |
| -f            | --filename   | TEXT | False    | The file path to export the config to (default: ./Configuration Export (\*\*\*\*\*\*).sqlite) |
| -db           | --db-path    | TEXT | True     | The file path to initialize/find the sync database at (default: ./sync (\*\*\*\*\*\*).sqlite) |
| -p            | --public     | None | False    | Enable to export the public information only (default: disabled)                              |
| -h            | --help       | None | False    | Show a help message and exit                                                                  |

<details>
<summary>Example -- export the config to export.bin</summary>

Request:

```bash
cic export_config -p -f export.bin
```

Response:

```
Config successfully exported to export.bin
```

</details>

---

### `increase_security_level`

Functionality: Initiate an increase of the number of keys required for withdrawal

Usage: `cic increase_security_level [OPTIONS]`

Options:

| Short Command | Long Command | Type | Required | Description                                                          |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------- |
| -db           | --db-path    | TEXT | True     | The file path to the sync DB (default: ./sync (\*\*\*\*\*\*).sqlite) |
| -pks          | --pubkeys    | TEXT | True     | A comma separated list of pubkeys that will be signing this spend    |
| -f            | --filename   | TEXT | False    | The filepath to dump the spend bundle into                           |
| -h            | --help       | None | False    | Show a help message and exit                                         |

<details>
<summary>Example -- move to a 4-of-5 config</summary>

Request:

```bash
cic increase_security_level -db './sync (b43314).sqlite' -pks "1_new.pk,2_new.pk,3_new.pk,4_new.pk" -f lock.unsigned
```

Response:

```
Successfully wrote spend to lock.unsigned
```

</details>

---

### `init`

Functionality: Create a configuration file for the prefarm. The arguments from this command will be committed to **forever**.

Usage: `cic init [OPTIONS]`

Options:

| Short Command | Long Command          | Type | Required | Description                                                                                         |
| :------------ | :-------------------- | :--- | :------- | :-------------------------------------------------------------------------------------------------- |
| -d            | --directory           | TEXT |  False   | The directory in which to create the configuration file [default: .]                                |
| -wt           | --withdrawal-timelock | TEXT |  True    | The amount of time where nothing has happened before a withdrawal can be made (in seconds)          |
| -pc           | --payment-clawback    | TEXT |  True    | The amount of time to clawback a payment before it's completed (in seconds)                         |
| -rc           | --rekey-cancel        | TEXT |  True    | The amount of time to cancel a rekey before it's completed (in seconds)                             |
| -rt           | --rekey-timelock      | TEXT |  True    | The amount of time where nothing has happened before a standard rekey can be initiated (in seconds) |
| -sp           | --slow-penalty        | TEXT |  True    | The time penalty for performing a slow rekey (in seconds)                                           |
| -h            | --help                | None |  False   | Show a help message and exit                                                                        |

<details>
<summary>Example</summary>

Request:

```bash
cic init -d . -wt 600 -pc 1200 -rt 300 -rc 600 -sp 900
```

Response:

A binary file called `Configuration (needs derivation).txt` will be created in the `-d` location.

</details>

---

### `launch_singleton`

Functionality: Use 1 mojo to launch the singleton that will control the funds

Note: This is one of the two commands (along with push_tx) that interacts directly with the blockchain

Usage: `cic launch_singleton [OPTIONS]`

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                               |
| :------------ | :---------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -c            | --configuration   | TEXT    |  True    | The configuration file with which to launch the singleton                                                 |
| -db           | --db-path         | TEXT    |  True    | The file path to initialize the sync database at                                                          |
| -wp           | --wallet-rpc-port | INTEGER |  False   | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml  |
| -f            | --fingerprint     | INTEGER |  False   | Set the fingerprint to specify which wallet to use                                                        |
| -np           | --node-rpc-port   | INTEGER |  False   | Set the port where the Node is hosting the RPC interface. See the rpc_port under full_node in config.yaml |
|               | --fee             | INTEGER |  False   | Fee to use for the launch transaction (in mojos) [default: 0]                                             |
| -h            | --help            | None    |  False   | Show a help message and exit                                                                              |

<details>
<summary>Example</summary>

Request:

```bash
cic launch_singleton --fee 10000000
```

Response:

```
Singleton successfully launched
```

</details>

---

### `p2_address`

Functionality: Print the address to pay to the singleton

Usage: `cic p2_address [OPTIONS]`

Options:

| Short Command | Long Command | Type | Required | Description                                                          |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------- |
| -db           | --db-path    | TEXT | True     | The file path to the sync DB (default: ./sync (\*\*\*\*\*\*).sqlite) |
| -p            | --prefix     | TEXT | False    | The prefix to use when encoding the address (default: xch)           |
| -h            | --help       | None | False    | Show a help message and exit                                         |

<details>
<summary>Example</summary>

Request:

```bash
cic p2_address --prefix txch
```

Response:

An address beginning with `txch` will be output

</details>

---

### `payment`

Functionality: Absorb/Withdraw money into/from the singleton

Usage: `cic payment [OPTIONS]`

Options:

| Short Command | Long Command                |  Type   | Required | Description                                                                                                                            |
| :------------ | :-------------------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| -db           | --db-path                   | TEXT    | True     | The file path to the sync DB (default: ./sync (\*\*\*\*\*\*).sqlite)                                                                   |
| -f            | --filename                  | TEXT    | False    | The filepath to dump the spend bundle into                                                                                             |
| -pks          | --pubkeys                   | TEXT    | True     | A comma separated list of pubkeys that will be signing this spend                                                                      |
| -a            | --amount                    | INTEGER | False    | The outgoing amount (in mojos) to pay [default: 0]                                                                                     |
| -t            | --recipient-address         | TEXT    | True     | The address that can claim the money after the clawback period is over (must be supplied if amount is > 0)                             |
| -ap           | --absorb-available-payments | None    | False    | Look for any outstanding payments to the singleton and claim them while doing this spend (adds tx cost) [default: false]               |
| -mc           | --maximum-extra-cost        | INTEGER | False    | The maximum extra tx cost to be taken on while absorbing payments (as an estimated percentage) [default: 50]                           |
| -at           | --amount-threshold          | INTEGER | False    | The minimum amount required of a payment in order for it to be absorbed [default: 1000000000000 or 1 XCH][0 means "absorb everything"] |
| -h            | --help                      | None    | False    | Show a help message and exit                                                                                                           |

<details>
<summary>Example</summary>

Request:

```bash
cic payment -f withdrawal.unsigned -pks "1.pk,2.pk" -a 1000000000 -t <recipient address> -ap
```

Response:

```
Successfully wrote spend to withdrawal.unsigned
```

</details>

---

### `push_tx`

Functionality: Push a signed spend bundle to the network

Note: This is one of the two commands (along with launch_singleton) that interacts directly with the blockchain

Usage: `cic push_tx [OPTIONS]`

Options:

| Short Command |   Long Command    |  Type   | Required | Description                                                                                               |
| :------------ | :---------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| -b            | --spend-bundle    |  TEXT   |   True   | The signed spend bundle                                                                                   |
| -wp           | --wallet-rpc-port | INTEGER |  False   | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml  |
| -f            | --fingerprint     | INTEGER |  False   | Set the fingerprint to specify which wallet to use                                                        |
| -np           | --node-rpc-port   | INTEGER |  False   | Set the port where the Node is hosting the RPC interface. See the rpc_port under full_node in config.yaml |
| -m            | --fee             | INTEGER |  False   | The fee to attach to this spend (in mojos)                                                                |
| -h            | --help            |  None   |  False   | Show a help message and exit                                                                              |

<details>
<summary>Example</summary>

Request:

```bash
cic push_tx -b ./complete.signed -m 10000000
```

Response:

```
{'status': 'SUCCESS', 'success': True}
```

</details>

---

### `show`

Functionality: Show the status of the singleton, payments, and rekeys

Usage: `cic show [OPTIONS]`

Options:

| Short Command | Long Command | Type | Required | Description                                                                     |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------------------ |
| -db           | --db-path    | TEXT | True     | The file path to the sync DB (default: ./sync (******).sqlite)  [required]      |
| -c            | --config     | None | False    | Enable to display the details of the public config (default: disabled)          |
| -d            | --derivation | None | False    | Enable to display the private details of the private config (default: disabled) |
| -h            | --help       | None | False    | Show a help message and exit                                                    |
 
<details>
<summary>Example -- show the configuration and derivation</summary>

Request:

```bash
cic show -c -d
```

Response:

```
Current time: 1665072285 (10/07/2022, 00:04:45)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 0
  - amount to claim: 0

Outstanding events:
  PAYMENTS:
  REKEYS:

Config:
 - current root: 74905b06591f9d2e615d313d18cfbcbeffcaabe2e70ccdeafda783bacaae52ef
 - withdrawal timelock: 600 seconds
 - payment clawback period: 1200 seconds
 - rekey cancellation period: 600 seconds

Derivation Info:
 - lock level: 2
 - max lock level: 3
 - min keys to rekey: 1
 - standard rekey timelock: 300 seconds
 - slow rekey penalty: 900 seconds
 - pubkeys: 
    - bls123813p8yljrhgskmgqeukg3x6mszh3xtqwwx35t4g6dt0mk2xecyj7elr0fhhrm8t3w7q5zhdelgjlgdspjqxvs
    - bls123813uhsu0juw06z8vmtt5ncj6zcexmhtsfemvtj3jhv0vuxh9nqjdar59yh555muzrdpz2uflgzey3sgdnm8y9
    - bls1238152jm50wh89tf70mwj4ncuukqcq6jqmf7pjgznm55c5qaggrvswzccwvsjgwmy9f4cvlx2j97kmh5uc2es6h
```

</details>

---

### `start_rekey`

Functionality: Rekey the singleton to a new set of keys/options

Usage: `cic start_rekey [OPTIONS]`

Options:

| Short Command | Long Command        | Type | Required | Description                                                       |
| :------------ | :------------------ | :--- | :------- | :------------------------------------------------------------------------------ |
| -db           | --db-path           | TEXT | True     | The file path to the sync DB (default: ./sync (\*\*\*\*\*\*).sqlite)  |
| -f            | --filename          | TEXT | False    | The filepath to dump the spend bundle into                        |
| -pks          | --pubkeys           | TEXT | True     | A comma separated list of pubkeys that will be signing this spend |
| -new          | --new-configuration | TEXT | True     | The configuration you would like to rekey the singleton to        |
| -h            | --help              | None | False    | Show a help message and exit                                      |

<details>
<summary>Example</summary>

Request:

```bash
cic start_rekey -f rekey.unsigned -pks "1.pk,2.pk" -new './Configuration (after rekey).txt'
```

Response:

```
Successfully wrote spend to rekey.unsigned
```

</details>

---

### `sync`

Functionality: Sync a singleton from an existing configuration

Usage: `cic sync [OPTIONS]`

Options:

| Short Command | Long Command    | Type    | Required | Description                                                                                                   |
| :------------ | :-------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------------ |
| -c            | --configuration | TEXT    | False    | The configuration file with which to initialize a sync database (default: ./Configuration (\*\*\*\*\*\*).txt) |
| -db           | --db-path       | TEXT    | True     | The file path to initialize/find the sync database at (default: ./sync (\*\*\*\*\*\*).sqlite)                 |
| -np           | --node-rpc-port | INTEGER | False    | Set the port where the Node is hosting the RPC interface. See the rpc_port under full_node in config.yaml     |
| -s            | --show          | None    | False    | Enable to show a summary of the singleton after sync is complete (default: disabled)                          |
| -h            | --help          | None    | False    | Show a help message and exit                                                                                  |

<details>
<summary>Example -- sync and show the config</summary>

Request:

```bash
cic sync -s
```

Response:

```
Current time: 1665072029 (10/07/2022, 00:00:29)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 0
  - amount to claim: 0

Outstanding events:
  PAYMENTS:
  REKEYS:
```

</details>

---

### `update_config`

Functionality: Update an outdated config in a sync DB with a new config

Usage: `cic update_config [OPTIONS]`

Options:

| Short Command |  Long Command   | Type | Required | Description                                                                                                   |
| :------------ | :-------------- | :--- | :------- | :------------------------------------------------------------------------------------------------------------ |
| -c            | --configuration | TEXT | False    | The configuration file with which to initialize a sync database (default: ./Configuration (\*\*\*\*\*\*).txt) |
| -db           | --db-path       | TEXT | True     | The file path to initialize/find the sync database at (default: ./sync (\*\*\*\*\*\*).sqlite)                 |
| -h            | --help          | None | False    | Show a help message and exit                                                                                  |

<details>
<summary>Example -- update config after rekey</summary>

Request:

```bash
cic update_config -c './Configuration (after rekey).txt' 
```

Response:

```
Configuration update successful
```

</details>

---

### `which_pubkeys`

Functionality: Determine which pubkeys make up an aggregate pubkey

Usage: `cic which_pubkeys [OPTIONS] AGGREGATE_PUBKEY`

Options:

| Short Command | Long Command  | Type    | Required | Description                                                         |
| :------------ | :------------ | :------ | :------- | :------------------------------------------------------------------ |
| -pks          | --pubkeys     | TEXT    | True     | A comma separated list of pubkey files that may be in the aggregate |
| -m            | --num-pubkeys | INTEGER | False    | Check only combinations of a specific number of pubkeys             |
|               | --no-offset   | None    | False    | Do not try the synthetic versions of the pubkeys                    |
| -h            | --help        | None    | False    | Show a help message and exit                                        |

---

### HSM CLI commands and reference

These commands are to be run from inside the Hardware Security Module or "vault".

This is a physical/offline security solution for generating and signing keys.


### Reference

### `hsmgen`

Functionality: Generate a secret exponent (private key)

Usage: `hsmgen`

There are no options with this command. It will simply generate and display a single secret exponent.

<details>
<summary>Example 1 -- display key</summary>

The basic command displays a new secret exponent.

Request:

```bash
hsmgen
```

Response:

```
se12celrk5asn0f3w49dxpxe5hg6sg88ezdvp89hpgdqspwj6e03yfq9e6yw4
```

</details>
<details>
<summary>Example 2 -- save a key to a file</summary>

Request:

```bash
hsmgen > test.se
```

Response:

The secret exponent is saved to test.se.

</details>

---

### `hsmpk`

Functionality: Derive a public key from a secret exponent

Usage: `hsmgen <secret exponent>`

A secret exponent (required) is the only argument allowed.

<details>
<summary>Example 1</summary>

Derive and display a public key from a file containing a secret exponent:

```bash
hsmpk $(cat test.se)
```

Response:

```
bls123813eh73c2cttvqytzjfnjdhnme7ah8mzsc9yzsf2y40mvhfa9rt5nha20jw50ld8h98w9u2wc0wxxl6gttqcr
```

</details>

<details>
<summary>Example 2</summary>

Calculate a public key from a file containing a secret exponent and save it to another file:

```bash
hsmpk $(cat test.se) > test.pk
```

Response:

The public key is saved to test.pk.

</details>

---

### `hsms`

Functionality: Manage private keys and process signing requests

Usage: `hsms0 [-h] [-c CREATE_PRIVATE_KEY] [-g GPG_ARGUMENT] path-to-private-keys`

Positional arguments:

`path-to-private-keys`: A file containing bech32m-encoded secret exponents. If file name ends with .gpg, "gpg -d" will be invoked automatically. File is read one line at a time.

Options:

| Short Command | Long Command         | Type | Required | Description                                                                                                                             |
| :------------ | :------------------- | :--- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| -y            | --yes                | None | False    | Enable to skip confirmations (default: disabled)                                                                                        |
|               | --qr                 | None | False    | Enable to show signature as QR code (default: disabled)                                                                                 |
|               | --nochunks           | None | False    | Enable to read the spend in its entirety rather than as chunks (testing only) argument to pass to gpg (besides -d). (default: disabled) |
| -c            | --create-private-key | TEXT | False    | Create keys for non-existent files                                                                                                      |
| -g            | --gpg-argument       | TEXT | False    | Argument to pass to gpg (besides -d)                                                                                                    |
| -h            | --help               | None | False    | Show a help message and exit                                                                                                            |

This command is normally run from an HSM with a QR scanner attached.
On Linux, this command will display a QR code to the screen to be scanned.
On Windows, the QR display isn't working.

<details>
<summary>Example 1</summary>

This example will block until the scan is complete.

Run the basic command and wait for the QR code to be scanned:

```bash
hsms ./1.se
```

Response:

```
waiting for qrint-encoded signing requests
```

</details>

<details>
<summary>Example 2</summary>

This example will not block.

Pipe the unsigned spend bundle through hsms0, which will output a signature encoded in base-64 (it might instead be in base-10), along with a QR code (Linux only):
Mock run by just piping the output of 1.se:

```bash
cat ./initial_absorb.unsigned | hsms -y --nochunks ./1.se
```

Response:

```
waiting for qrint-encoded signing requests
> 5449140665451649053284096202714691505589365577374007143978191719238477924138728005883662232162434514948867447203715240045617130770165403282022693823446338843409368762077191699285534081208295847253913527216165034379061118404584995264580179968
```

</details>

---

### `hsmmerge`

Functionality: Create a signed `Spend Bundle` from `UnsignedSpends` and signatures.

Usage: `hsmmerge [-h] path-to-unsigned-spend-as-hex hex-encoded-signature [hex-encoded-signature ...]`

Positional arguments:

path-to-unsigned-spend-as-hex: A file containing hex-encoded `UnsignedSpends`
hex-encoded-signature: A hex-encoded signature

Optional arguments:
-h, --help show a help message and exit

Note that `hex-encoded-signature` is a list. To add more signatures, append more arguments.

<details>
<summary>Example</summary>

Create a signed spend bundle from two signatures and output to a text file:

```bash
hsmmerge ./initial_absorb.unsigned ./initial_absorb.sig ./initial_absorb_2.sig > initial_absorb.signed
```

Response:

The signed spend bundle is saved to initial_absorb.signed.

</details>

---

### `hsm_dump_sb`

Functionality: Dump information about `Spend Bundle`

Usage: `hsm_dump_sb [-h] hex-encoded-spend-bundle-or-file`

Positional arguments:

hex-encoded-spend-bundle-or-file: A hex-encoded `Spend Bundle`. Can be a file containing the spend bundle.

Optional arguments:

-h, --help show a help message and exit

<details>
<summary>Example</summary>

Request:

```bash
hsm_dump_sb ./initial_absorb.signed
```

Response:

The signed spend bundle is output.

</details>

---

### `hsm_test_spend`

Functionality: Generate a `UnsignedSpend` test as a proof-of-concept

Usage: `hsm_test_spend [-h] path-to-public-key [path-to-public-key ...]`

Positional arguments:

path-to-public-key: A file containing a single bech32m-encoded public key

Optional arguments:

-h, --help show a help message and exit

<details>
<summary>Example</summary>

Request:

```bash
hsm_test_spend test.pk
```

Response:

An unsigned spend bundle is output.

</details>