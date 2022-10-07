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
| -f            | --filepath   | TEXT | False    | The file path the dump the audit log (default: [todo])               |
| -d            | --diff       | TEXT | False    | A previous audit log to diff against this one                        |
| -h            | --help       | None | False    | Show a help message and exit                                         |

[todo example]

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

[todo example]

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

[todo example]

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

[todo example]

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

[todo example]

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

[todo example]

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

[todo example]

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

[todo example]

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

[todo example]

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

[todo example]

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

[todo example]

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

[todo example]

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
 
[todo example]

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

[todo example]

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

[todo example]

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

[todo example]

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


[todo example]

---

## HSM CLI commands and reference

These commands are to be run from inside the Hardware Security Module or "vault".

This is a physical/offline security solution for generating and signing keys.

### Commands

- [`hsmgen`](#hsmgen)
- [`hsmpk`](#hsmpk)
- [`hsms0`](#hsms)
- [`hsmmerge`](#hsmmerge)
- [`hsm_dump_sb`](#hsm_dump_sb)
- [`hsm_test_spend`](#hsm_test_spend)

### Reference

### `hsmgen`

Functionality: Generate a secret exponent (private key)

Usage: `hsmgen`

There are no options with this command. It will simply generate and display a single secret exponent.

Example 1 (display key):

```powershell
(venv) PS C:\> hsmgen
se12celrk5asn0f3w49dxpxe5hg6sg88ezdvp89hpgdqspwj6e03yfq9e6yw4
```

Example 2 (save key to a file):

```powershell
(venv) PS C:\> hsmgen > test.se
```

---

### `hsmpk`

Functionality: Derive a public key from a secret exponent

Usage: `hsmgen <secret exponent>`

A secret exponent (required) is the only argument allowed.

Example 1 (derive and display a public key from a file containing a secret exponent):

```powershell
(venv) PS C:\> hsmpk $(cat test.se)
bls123813eh73c2cttvqytzjfnjdhnme7ah8mzsc9yzsf2y40mvhfa9rt5nha20jw50ld8h98w9u2wc0wxxl6gttqcr
```

Example 2 (calculate a public key from a file containing a secret exponent and save it to another file):

```powershell
(venv) PS C:\> hsmpk $(cat test.se) > test.pk
```

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

The first example will block until the scan is complete.

Example 1 (run the basic command and wait for the QR code to be scanned):

```powershell
(venv) PS C:\> hsms .\1.se
waiting for qrint-encoded signing requests
```

The second example will not block.

Example 2 (pipe the unsigned spend bundle through hsms0, which will output a signature encoded in base-64 (it might instead be in base-10), along with a QR code (Linux only):
Mock run by just piping the output of 1.se:

```powershell
(venv) PS C:\Users\User\prefarm_test\keys_and_sb> cat .\initial_absorb.unsigned | hsms -y --nochunks .\1.se
waiting for qrint-encoded signing requests
> 5449140665451649053284096202714691505589365577374007143978191719238477924138728005883662232162434514948867447203715240045617130770165403282022693823446338843409368762077191699285534081208295847253913527216165034379061118404584995264580179968
```

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

Example (create a signed spend bundle from two signatures and output to a text file):

```powershell
(venv) PS C:\> hsmmerge .\initial_absorb.unsigned .\initial_absorb.sig .\initial_absorb_2.sig > initial_absorb.signed
```

---

### `hsm_dump_sb`

Functionality: Dump information about `Spend Bundle`

Usage: `hsm_dump_sb [-h] hex-encoded-spend-bundle-or-file`

Positional arguments:

hex-encoded-spend-bundle-or-file: A hex-encoded `Spend Bundle`. Can be a file containing the spend bundle.

Optional arguments:

-h, --help show a help message and exit

Example:

```powershell
(venv) PS C:\> hsm_dump_sb .\initial_absorb.signed
(spend bundle is output)
```

---

### `hsm_test_spend`

Functionality: Generate a `UnsignedSpend` test as a proof-of-concept

Usage: `hsm_test_spend [-h] path-to-public-key [path-to-public-key ...]`

Positional arguments:

path-to-public-key: A file containing a single bech32m-encoded public key

Optional arguments:

-h, --help show a help message and exit

Example:

```powershell
(venv) PS C:\Users\User\Documents\Chia\prefarm_test> hsm_test_spend test.pk
(an unsigned spend is output)
```
