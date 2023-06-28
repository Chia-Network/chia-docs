---
slug: /guides/custody-tool-user-guide
title: Custody Tool User Guide
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Intro

In 2022, Chia built an internal solution for long-term storage of its prefarm. This tool has since been made public -- you can now lock your coins using the same solution as Chia used to lock its prefarm!

This guide will show you how to get started.

:::warning warning

This tool was _not_ originally developed with the broader ecosystem in mind. For this reason, the tool is provided **as-is**, with no guarantees of functionality, and with no support provided. Proceed with caution.

:::

Before continuing, you might want to familiarize yourself with the following documents:

- [Basic description](/guides/custody-tool-description) of how the custody tool works
- [Flow chart](https://docs.chia.net/assets/files/chia-custody-tool-5e6e2f18e8f98c0faaf11bdf5fea5971.png) to visualize how the custody tool works
- [CLI reference](https://docs.chia.net/custody-tool) for all custody commands used in this tutorial

:::info

The custody tool uses many parameters, each of which is important. You are highly recommended to test the tool thoroughly on the testnet before deploying it on mainnet.

:::

---

## Install the custody tool

### Requirements

- A synced full node (mainnet, testnet, or [simulator](/guides/simulator-user-guide 'Simulator user guide'))
- A synced [Chia wallet](https://github.com/Chia-Network/chia-blockchain/wiki/INSTALL 'Chia installation instructions')
- [Python](https://www.python.org/downloads/ 'Python downloads page') 3.9 or greater **(will not work with 3.8.x)**
- [Git command line tool](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git 'How to install the Git command line tool')
- [Powershell 6](https://www.howtogeek.com/731885/how-to-check-the-powershell-version-in-windows-10/ 'How to check your Powershell version') or greater (Windows only)
- Visual C++ Redistributable (Windows only)

### Steps to install

1. Clone the internal custody repository:

```bash
git clone https://github.com/Chia-Network/internal-custody.git
```

2. Change to the new directory:

```bash
cd internal-custody
```

3. Create a new virtual environment and then activate it:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   python3 -m venv venv
   . ./venv/bin/activate
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   python3 -m venv venv
   . ./venv/bin/activate
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

4. Install the custody tool:

```bash
pip install --extra-index-url https://pypi.chia.net/simple/ chia-internal-custody
```

<details>
  <summary>Note about pip warnings/errors</summary>

You may receive pip warning and/or dependency errors for blspy and/or clvm-tools-rs (see example below). These can be safely ignored.

```bash
ERROR: pip's dependency resolver does not currently take into account all the packages that are installed. This behaviour is the source of the following dependency conflicts.
chia-blockchain 1.3.6.dev212 requires blspy==1.0.13, but you have blspy 1.0.9 which is incompatible.
chia-blockchain 1.3.6.dev212 requires clvm-tools-rs==0.1.9, but you have clvm-tools-rs 0.1.7 which is incompatible.
Successfully installed blspy-1.0.9 clvm-tools-rs-0.1.7 hsms-0.1.dev79
```

</details>

5. Test your installation:

```bash
cic --help
```

If you get a usage statement, then `cic` (Chia Internal Custody) has been installed properly.

---

## Command Notes

:::info A few notes about the commands in this guide

The `cic` commands for generating and signing keys are meant to be run from inside a Hardware Security Module (HSM). These commands are labeled as such.

An HSM is a physical/offline security solution for creating and using cryptographic signatures. While testing the custody tool, it is OK to run these commands from a normal computer. However, for maximum security while running the custody tool on Chia's mainnet, you are recommended to use an HSM (or a similar solution).

Most of the commands from this tutorial will _not_ alter the blockchain. This includes all of the commands to be run from an HSM. Commands that will alter the blockchain are labeled as such.

:::

:::warning warning for windows users

Windows uses different line endings than Linux and MacOS.
If you only plan to use Windows for both generating and signing spend bundles, this won't be a problem.

However, if you plan to generate your spend bundles on Windows and sign them using a Linux HSM, then you will need to modify the line endings before signing.
The easiest way to accomplish this is with `dos2unix`.
This is not included with Windows, so you will need to download it from [SourceForge](https://sourceforge.net/projects/dos2unix/).

The command to convert your spend bundles is then:

```powershell
<path to dos2unix.exe> -o <path to spend bundle>
```

In general, any time you encounter signing errors, be sure the correct line endings are being used for the OS you are using to sign.

:::

---

## Generate keys

:::note

- These commands will **not** modify the blockchain. They will only create local files
- These commands **should** be run from an HSM

:::

Before the custody singleton can be created, you must first create the public/private key pairs to be associated with it.

For this guide:

- `m` will initially be set to 2. This is security level, or "lock level" of the singleton. In other words, it's the number of keys required to sign for withdrawals and standard rekeys.
- `n` will initially be set to 3. This is the maximum lock level of the singleton. In other words, it's the total number of keys that will be associated with the singleton.
- Because `n` will initially be 3, we will create 3 keys now. `m` and `n` will be used later when setting up the singleton.

When creating and using these keys on mainnet, you should only store one key on each computer. Signing therefore requires copying an unsigned spend bundle to each individual computer that holds a key. This process is explained in detail later in the guide.

However, for this guide, we'll assume you're running an initial test using TXCH (and not actual XCH). In this case, it's OK to store multiple keys on the same computer while you get a feel for how the tool works.

The command used to generate "secret exponents" (private keys) is `hsmgen`. This command is included with the `cic` installation. It doesn't take any arguments; it merely generates a secret exponent and outputs it to the command line. However, we want to save the secret exponents to files, so we will use the `>` key to redirect the output.

We will create three separate keys. These can be named anything. For this guide we'll simply use numbers.

1. Create a directory to hold your keys and spend bundles:

```bash
mkdir keys_and_sb
```

2. Change to the new directory:

```bash
cd keys_and_sb
```

3. Create and redirect the secret exponents:

```bash
hsmgen > 1.se
```

```bash
hsmgen > 2.se
```

```bash
hsmgen > 3.se
```

4. Use the `hsmpk` command to derive a public key from each secret exponent:

```bash
hsmpk $(cat 1.se) > 1.pk
```

```bash
hsmpk $(cat 2.se) > 2.pk
```

```bash
hsmpk $(cat 3.se) > 3.pk
```

As a result of running the `hsmpk` command, a public key will be added to a new text file for each key (1.pk, 2.pk, and 3.pk).

If you are generating only one key per computer, you will need to copy the .pk (public key) files to the non-HSM machine, which will run a Chia node and be used for setting up the singleton in the next steps.

---

## Initialize the singleton

The custody tool uses the Chialisp [singleton](https://chialisp.com/singletons 'Your guide to Chialisp singletons') primitive. This section will show you how to set up a custody singleton for testing.

### Create the permanent layer

:::note

- This command will **not** modify the blockchain. It will only create a local file
- This command should be run from **outside** an HSM

:::

:::warning important

The `cic init` command will initialize the permanent layer of the singleton. **None** of this command's arguments may be changed later.

:::

For this guide, we'll create an example singleton that uses the values listed in the table below. As a reminder, these settings correspond to those used in the [flow chart](https://docs.chia.net/assets/files/chia-custody-tool-5e6e2f18e8f98c0faaf11bdf5fea5971.png).

| Flag&nbsp; | Example<br/>Value | Description                                                                                                                                                                                                                                   |
| :--------- | :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-d`       | keys_and_sb       | The directory where the keys and spend bundles will be stored.                                                                                                                                                                                |
| `-wt`      | 600 seconds       | Withdrawal Timelock -- the minimum number of seconds that must have elapsed since the last withdrawal, rekey or clawback before a withdrawal can be initiated.                                                                                |
| `-pc`      | 1200 seconds      | Payment Claw back -- the minimum number of seconds that must elapse after initiating a withdrawal before the withdrawal can be completed. Clawbacks are possible during this window.                                                          |
| `-rt`      | 300 seconds       | Rekey Timelock -- when attempting to begin a standard rekey, this is the minimum number of seconds that must have elapsed since the last withdrawal, rekey or claw back. For a slow rekey, this amount gets added for each key less than `m`. |
| `-rc`      | 600 seconds       | Rekey Claw back -- the minimum number of seconds that must elapse after initiating a rekey before the rekey can be completed. Claw backs are possible during this window.                                                                     |
| `-sp`      | 900 seconds       | Slow rekey Penalty -- this amount gets added to the Rekey Timelock when a slow rekey is being performed.                                                                                                                                      |

:::info notes regarding the above table

- The singleton's time values are relative to when they're confirmed on chain
- The specific time values for this example were chosen for testing purposes only. In a mainnet custody solution, the values are typically measured in days (though still expressed in seconds)

:::

Begin by initializing the singleton (run from the `keys_and_sb` folder in this example):

```bash
cic init -d . -wt 600 -pc 1200 -rt 300 -rc 600 -sp 900
```

As a result of running the `cic init` command, a binary file called `Configuration (needs derivation).txt` will be created in the `-d` location. This file will be used later to derive the root. Nothing has been added to the blockchain yet.

---

### Create the non-permanent layer

:::note

- This command will **not** modify the blockchain. It will only create a local file
- This command should be run from **outside** an HSM

:::

Now that you have keys and an underived configuration, you can run the `derive_root` command, which will set up the singleton's non-permanent layer, with the following settings:

- `m` (current lock level)
- `n` (maximum lock level)
- The public keys that comprise `n`, expressed as a comma-separated list

This command includes an optional `--configuration` flag to specify the name and location of the configuration file. By default, the command will look in `./Configuration (needs derivation).txt`.

If the `--configuration` flag is not used, the `.pk` (public key) files that you previously created also need to be in the current directory.

```bash
cic derive_root -pks "1.pk,2.pk,3.pk" -m 2 -n 3
```

You should receive the following response:

```
Custody rules successfully added to configuration
```

As a result of running this command, `Configuration (awaiting launch).txt` will be created. The configuration now includes both the permanent and non-permanent layers.

---

### Launch the singleton

:::note

- This command **will** modify the blockchain
- This command should be run from **outside** an HSM

:::

In this step, you will run `cic launch_singleton`, which will create the singleton on the blockchain.
In order to run this command, you will need to have at least 1 mojo in your wallet to create the singleton.

The `launch_singleton` command also includes a recommended `--fee` flag to specify a blockchain fee in mojos.
This fee is completely separate from the actual financing of the singleton, which will occur in a later step.
It is also possible to launch the singleton using one wallet and fund it with another -- think of the singleton as a brand new wallet.

Aside from the fees, the `launch_singleton` command includes an optional `--configuration` flag to specify the name and location of the configuration file. By default, the command will look in `./Configuration (awaiting launch).txt`.

Because this command modifies the blockchain, a synced wallet is required. To be sure your wallet is synced, run:

```bash
chia wallet show
```

If you have multiple fingerprints, select the one you want to use when launching the singleton. This wallet must contain at least 1 mojo, as well as sufficient funds to pay the fee if you are going to specify one.

The output of `chia wallet show` must include `Sync status: Synced`. If this wallet is not yet synced, then you will need to wait for it to finish syncing before continuing.

Once you have a synced wallet with sufficient funds, you can launch the singleton:

```bash
cic launch_singleton --fee 10000000
```

The output of this command should be:

```bash
Singleton successfully launched
```

:::note

The singleton will **not** be funded after running this command. It will have zero value until another command is run.

In addition, your wallet's transaction history will not show the fee being deducted, nor will it show the single mojo being deducted to create the singleton. This is because creating the singleton is not a standard transaction that your wallet will recognize. However, your wallet's Total Balance will show the correct amount after the transaction has been processed.

:::

Congratulations, you have successfully launched the singleton! (You will need to wait for the next transaction block before it's added to the blockchain.) As a result of running this command, the configuration file's name has changed to `Configuration (xxxxxx).txt`, where `xxxxxx` is a hexadecimal value. For example:

```bash
(venv) ~/internal-custody/keys_and_sb$ ls
 1.pk   1.se   2.pk   2.se   3.pk   3.se  'Configuration (74905b).txt'
```

---

### Show the singleton

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

At this point, the singleton should exist on the blockchain. However, it has not yet been funded. For now, let's view it.

Currently your local custody database does not know about the singleton.
Therefore, in order to view the singleton, you must first synchronize the localhost with the blockchain by running the `sync` command.

The first time you run the `sync` command, you need to specify the configuration file, which will then be copied into your config database.

For example:

```bash
cic sync -c "Configuration (<hex value>).txt"
```

Be sure to replace `<hex value>` with the actual value from your configuration file, and make sure to put quotes around the file name because it contains a space.

This command does not produce any output. From now on, you don't need to specify the config file to synchronize your host with the blockchain. Instead, just run `cic sync`.

To show the singleton's status without syncing, you can run `cic show`. However, you will typically want to sync before showing the status. To do this, run `cic sync -s`. For example:

```bash
cic sync -s

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

To view the configuration, run `cic show` and add the `-c` flag.
To view the derivation info, run `cic show` and add the `-d` flag.
You can also add both flags.

For example:

```bash
~/internal-custody/keys_and_sb$ cic show -c -d

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

Here's how to interpret this output:

- Singleton

  - `launcher ID`: This shows the on-chain ID of your singleton
  - `amount left`: This is the current value of the singleton. For now it is zero because it has not yet been funded
  - `amount to claim`: This is the number of mojos currently in the process of being withdrawn. The money is effectively sitting in escrow, and will be able to be withdrawn after the withdrawal timelock has been fulfilled

- Outstanding events

  - `PAYMENTS`: If there were a payment in progress, it would be shown here
  - `REKEYS`: If there were a rekey in progress, it would be shown here

- Config

  - `current root`: Puzzlehash of the singleton as it is currently configured
  - `withdrawal timelock`: Number of seconds to wait before a withdrawal may be initiated
  - `payment clawback period`: Number of seconds to wait before a withdrawal may be completed. During this period, clawback is possible
  - `rekey cancellation period`: Number of seconds to wait before a rekey may be completed. During this period, cancellation is possible

- Derivation Info
  - `lock level`: The number of keys required to sign for withdrawals and standard rekeys
  - `max lock level`: The total number of keys
  - `min keys to rekey`: The minimum number of keys that must sign for a slow rekey
  - `standard rekey timelock`: The number of seconds since the last action before a standard rekey can be initiated
  - `slow rekey penalty`: The number of seconds added as a penalty for all slow rekeys. This is in addition to the standard rekey timelocks that will vary depending on the number of keys signing
  - `pubkeys`: The keys themselves

---

### Obtain the receive address

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

In order to fund the singleton, we first need to obtain its address by running the `p2_address` command. This command contains an optional `--prefix` flag with a default value of `xch`. For this guide, we will need to set this flag to `txch` because we are running on a testnet:

```bash
cic p2_address --prefix txch
```

The response will be a Chia address, prefixed with `txch` in this example.

:::tip

If, at any point in your testing, you receive this error:

```
ValueError: No configuration present
```

You are likely in the wrong directory. By default, the commands in this tutorial assume you are currently in the directory containing `Configuration (xxxxxx).txt`. If not, change to that directory and try again.

:::

Note that even though this is the address of the singleton, which has a complex set of rules governing how it may be spent, it can still receive payments, just like coins that use the standard puzzle. We'll send money to it in the next step.

---

### Fund the singleton

:::note

- This command **will** modify the blockchain
- This command should be run from **outside** an HSM

:::

Now that the singleton has been created and you have its address, you can fund it by sending it XCH or TXCH.

A few things to keep in mind:

- The `-a` flag is the amount (in XCH/TXCH) to send to the singleton. For this guide, we'll send 1 TXCH
- The `-t` flag needs to specify the `p2_address` you calculated in the last step. Be sure to replace `<address>` in the example with the actual address
- You can optionally add a transaction fee (in XCH/TXCH) by using the `-m` flag. For this guide, we'll send 10 million mojos
- If your fee is greater than your singleton's value (as it might be if you're running on a testnet), you'll need to add the `--override` flag

```bash
chia wallet send -a 1 -m 0.00001 -t <address>
```

You should see `'inclusion_status': 'SUCCESS'` in the output.

To get the status of the transaction, run the command indicated at the end out the output. If you included a fee, it should be added to the blockchain within a few minutes. The output of this command should show `Status: Confirmed`. For example:

```bash
chia wallet get_transaction -f 394934909 -tx 0x2728390c1b88a1f1b4db8afd314b099182f9fc78d6046877531d72d401d8aaf2
```

Response:

```bash
Transaction 2728390c1b88a1f1b4db8afd314b099182f9fc78d6046877531d72d401d8aaf2
Status: Confirmed
Amount sent: 1 TXCH
To address: txch12cr83zr7vax0a7684uxjk7wdearypuk540alx90cy7efkq5448uqu6dd5t
Created at: 2022-10-07 01:20:55
```

---

### Verify the singleton's status

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

Even though the blockchain is aware that the singleton has been funded, the `cic` tool won't yet know about said funding until a new `sync` is performed. Just like before, we'll sync and show the config in one command:

```bash
cic sync -s
```

Response:

```bash
Current time: 1665085495 (10/07/2022, 03:44:55)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 0
  - amount to claim: 1000000000000

Outstanding events:
  PAYMENTS:
  REKEYS:
```

The `amount to claim` now shows the amount with which it was funded.

The singleton is now set up. Observers can also use this command to verify that no payments or rekeys are currently being performed.

### (Optional) Export config

If, at any point, you want to export your config's public, immutable information to be used by observer nodes, run `cic export_config -p -f <binary file name>`.

For more info, see the [CLI reference](/custody-tool#export_config).

---

The singleton has now been deployed, configured, and funded. In a real-life scenario, the private keys should be stored on geographically disperse HSMs. If any of those machines are compromised, there are several available mitigation options. These, along with standard withdrawals, will be discussed in the rest of this guide.

---

## Custody tool usage

This section will give you a few basic use cases for running the custody tool. If you are going to use this tool with XCH, you should familiarize yourself with its functionality on a testnet.

:::info

If you are using an HSM, then it likely comes with a QR scanner, which can scan unsigned spend bundles. This is possible with the custody tool, but usage of QR scanners is beyond the scope of this guide.

:::

---

### Withdrawal

This test will run through the complete sequence of withdrawing money from the singleton. Be sure to have a singleton already set up and funded before attempting this. We'll use the same configuration here that was set up earlier in this guide.

#### Initiate a payment

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

This command generates an unsigned spend bundle which requires specific keys. Signers can take this spend bundle to an HSM for signing.

To begin the payment process, use the `cic payment` command.
For this example, we'll use the following arguments (see the [CLI reference](/custody-tool#payment 'payment command') for all options):

- `-f` : The name of the file in which to save the unsigned spend bundle
- `-pks`: The public keys that will be used to sign the withdrawal. Exactly `m` keys must be included. The only keys allowed to sign are those that were originally used in the `derive_root` command
- `-a`: The number of mojos to withdraw
- `-t`: The recipient address (where to send the money to)
- `-ap`: Absorb all available payments (could add to transaction costs if more than one payment exists)

We'll sign with keys 1 and 2, and we'll withdraw 1 billion mojos:

```bash
cic payment -f withdrawal.unsigned -pks "1.pk,2.pk" -a 1000000000 -t <recipient address> -ap
```

Response:

```bash
Successfully wrote spend to withdrawal.unsigned
```

In this example, the command set up the spend bundle to require keys `1` and `2` to sign. The spend bundle was saved to a file called `withdrawal.unsigned` in the local directory.

#### Sign the payment

:::note

- These commands will **not** modify the blockchain
- These commands should be run from **inside** an HSM

:::

Note that an HSM can show pubkeys, so you can double-check the keys to sign to make sure they match.

To obtain a signature, you can show the unsigned spend bundle and sign it using each secret exponent. This can all be done in one step per key. The `-y` flag will skip confirmations; the `--nochunks` flag will read the whole spend bundle at once:

Key 1 sign:

```bash
cat ./withdrawal.unsigned | hsms -y --nochunks ./1.se
```

Response:

```bash
waiting for qrint-encoded signing requests
> 5547654523626261714173624112533133683715952925226504045164577632098258283574049187046232825601458621027122981750092774640100661034682177649762432133608580806862808660897344776713144593910217683389248184948244557142841050155734002508539602944
```

Key 2 sign:

```bash
cat ./withdrawal.unsigned | hsms -y --nochunks ./2.se
```

Response:

```bash
waiting for qrint-encoded signing requests
> 5455332514029001283045217337060795248565102176100994026976453525467902615588200815715854582664277247425467234004349390984834806712914358095770913212413836197307868631626262017707255283205002485029295977250812644025408923358550690247700742144
```

This command outputs a signature encoded in base-10.

Now you can put the signatures into files. Do this by echoing the output of the previous commands and redirecting them with the `>` character (be sure to use the actual signatures you just obtained; **don't copy these lines verbatim**):

Key 1:

```bash
echo 5547654523626261714173624112533133683715952925226504045164577632098258283574049187046232825601458621027122981750092774640100661034682177649762432133608580806862808660897344776713144593910217683389248184948244557142841050155734002508539602944 > ./withdrawal_1.sig
```

Key 2:

```bash
echo 5455332514029001283045217337060795248565102176100994026976453525467902615588200815715854582664277247425467234004349390984834806712914358095770913212413836197307868631626262017707255283205002485029295977250812644025408923358550690247700742144 > ./withdrawal_2.sig
```

This command should have no output. The signatures are now stored in text files.

#### Merge the payment

:::note

- This command will **not** modify the blockchain
- This command should be run from **inside** an HSM

:::

This command will create the signed spend bundle, given the unsigned spend bundle and the individual signature(s).

It will then redirect the signed spend bundle into its own text file.

Note that the merging of signatures is possible because Chia uses BLS signatures. For this command, an arbitrary number of signatures can be merged. We'll use two signatures for this example.

```bash
hsmmerge ./withdrawal.unsigned ./withdrawal_1.sig ./withdrawal_2.sig > withdrawal.signed
```

The signed spend bundle is now loaded in a file called `withdrawal.signed`. This file can then be taken out of the HSM to be pushed to the blockchain.

#### Push the transaction to the network

:::note

- This command **will** modify the blockchain
- This command should be run from **outside** an HSM

:::

A few things to note:

- Even though this command will withdraw from the _singleton_, it still needs a local wallet if you want to include a blockchain fee
- The key to be used in this command is a local key, and _not_ a signer's key from the singleton
- The fee will be added when the `push_tx` command is run; it's not built into the spend bundle
- This command will fail if `-wt` seconds (from the singleton's permanent layer) have not yet elapsed
- A synced full node is required to run this command

Once you have the signed spend bundle on a synced node with some XCH/TXCH for a blockchain fee, you can complete the payment. We'll add a fee of 10 million mojos:

```bash
cic push_tx -b ./withdrawal.signed -m 10000000
```

The withdrawal has now been added to the blockchain. However, the money has not yet reached its final destination.
Instead, it will now sit in a "drop coin" (aka escrow) and cannot be withdrawn for at least (`-pc`) seconds, which is built into the singleton and cannot be changed.
For this example, we used 1200 seconds for this value.

#### View the payment's status

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

This will show the new status now that the spend bundle has been pushed successfully:

```bash
cic sync --show
```

Response:

```bash
Current time: 1665430954 (10/11/2022, 03:42:34)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 999000000000
  - amount to claim: 0

Outstanding events:
  PAYMENTS:
- PAYMENT to xch1xdm7s8fq4kdrq28lulnhxcxq8h6gcsf0y5j643vqx4ec3z9dhq7sqxsa9j of amount 1000000000 (Ready at: 10/11/2022, 03:53:09)
  REKEYS:
```

As the output of this command shows, there is a new payment outstanding (`PAYMENT to xch...`). A few things to note:

- For this example, we explicitly specified a `txch` address as the recipient. However, the `xch` address is actually correct -- the tool is simply assuming that the recipient's puzzle hash must correspond to an `xch` address. If you check the puzzle hashes that correspond to both the address you specified previously and the address you see here, you'll see that they are the same.
- If (`-pc`) seconds have not elapsed since the drop coin's creation, the output will display `(Ready at: <mm/dd/yyyy hh:mm:ss>)`
- If (`-pc`) seconds have elapsed, then the output will say `(Ready)`

In either case, claw backs are allowed until the payment has been completed.
(Even if the withdrawal is in "Ready" state, it can still be clawed back. However, because _anyone_ can
complete the withdrawal, claw backs should no longer be assumed to be available once the "Ready" state has been reached.)

Note that even when the state is "Ready", the next transaction block will still need to be created before the withdrawal is _actually_ ready.

Transaction blocks happen every 52 seconds on average.

#### Create a signed spend bundle for the completion

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::
:::info

The `cic complete` command is valid for both payments and rekeys.

Completion of both payments and rekeys require the same steps.

:::

**Anyone** can run the `cic complete` command, therefore there is no need to use an HSM for signing. The only argument necessary is the file in which to dump the completion.

The completion step may only be performed after the timelock has expired. You have to enter the correct payment number, which should be `1` (the only option). There is no default, so pressing `enter` will cause an exception.

```bash
cic complete -f complete.signed
```

```bash
Which actions would you like to complete?:

1) PAYMENT to xch1xdm7s8fq4kdrq28lulnhxcxq8h6gcsf0y5j643vqx4ec3z9dhq7sqxsa9j of amount 1000000000
(Enter index of action to complete): 1
Successfully wrote spend to complete.signed
```

#### Push the completion to the blockchain

:::note

- This command **will** modify the blockchain
- This command should be run from **outside** an HSM

:::

The last step is to push the completion spend bundle to the blockchain. Just like before, it is possible to add a fee (from a regular wallet) by using the `-m` flag.

```bash
cic push_tx -b ./complete.signed -m 10000000
```

```bash
Wallet keys:
1)   2104826454
2) * 394934909 (Synced)
Choose a wallet key [1-2] ('q' to quit, or Enter to use 394934909):
{'status': 'SUCCESS', 'success': True}
```

#### View the completion's status

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

After waiting for the next transaction block, the singleton's status should show that there are no longer any pending payments or rekeys.

```bash
cic sync --show
```

Response:

```bash
Current time: 1665444673 (10/11/2022, 07:31:13)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 999000000000
  - amount to claim: 0

Outstanding events:
  PAYMENTS:
  REKEYS:
```

#### View the recipient wallet

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

Finally, you can run `chia wallet show` with the wallet that received the payment. The amount you requested to be withdrawn should now be in that wallet:

```bash
chia wallet show
```

```bash
Wallet keys:
1) * 2104826454 (Synced)
2)   394934909
Choose a wallet key [1-2] ('q' to quit, or Enter to use 2104826454):
Wallet height: 1645720
Sync status: Synced
Balances, fingerprint: 2104826454

Chia Wallet:
   -Total Balance:         0.001 txch (1000000000 mojo)
   -Pending Total Balance: 0.001 txch (1000000000 mojo)
   -Spendable:             0.001 txch (1000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

---

### Clawback

Next, we'll set up a payment and claw it back before the timelock expires. This procedure is the same, regardless of whether you're clawing back a payment or cancelling a rekey.

#### Set up the payment

Before attempting a clawback, you will need to have a pending payment set up. You can do this by using the [Withdrawal](#withdrawal) example. Here are the exact steps you need to follow in the initial setup:

- [Initiate a payment](#initiate-a-payment)
- [Sign the payment](#sign-the-payment)
- [Merge the payment](#merge-the-payment)
- [Push the transaction to the network](#push-the-transaction-to-the-network)

#### View the payment's status

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

Just as with the Withdrawal example, you should now have a payment set up:

```bash
cic sync --show
```

Response:

```bash
Current time: 1665449342 (10/11/2022, 08:49:02)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 998000000000
  - amount to claim: 0

Outstanding events:
  PAYMENTS:
- PAYMENT to xch1xdm7s8fq4kdrq28lulnhxcxq8h6gcsf0y5j643vqx4ec3z9dhq7sqxsa9j of amount 1000000000 (Ready at: 10/11/2022, 09:06:24)
  REKEYS:
```

Instead of completing the payment, we'll claw it back. If you want to test this feature, be sure to make the value of `-pc` sufficiently large to give yourself plenty of time to perform the clawback.
In this example we still have 17 minutes remaining (`Ready at` minus `Current time` from the above output).

#### Create an unsigned spend bundle for the clawback

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

First you must create an unsigned spend bundle. You must use the same number of keys as what was originally used to create the withdrawal, though the keys themselves may be different.

For example:

```bash
cic clawback -f clawback.unsigned -pks "1.pk,2.pk"
```

The response will list all current actions and ask you to select the relevant one (there is only one in this case):

```bash
Which actions would you like to cancel?:

1) PAYMENT to xch1xdm7s8fq4kdrq28lulnhxcxq8h6gcsf0y5j643vqx4ec3z9dhq7sqxsa9j of amount 1000000000
(Enter index of action to cancel): 1
Successfully wrote spend to clawback.unsigned
```

The output of this command will be a new unsigned spend bundle called `clawback.unsigned` in the current directory.

#### Sign the claw back spend bundle

:::note

- This command will **not** modify the blockchain
- This command should be run from **inside** an HSM

:::

First, obtain a signature for each secret exponent.

Key 1:

```bash
cat ./clawback.unsigned | hsms -y --nochunks ./1.se
```

Response:

```bash
waiting for qrint-encoded signing requests
> 5617572660431363787553058817392163812258580313793542655056082446740816880100648794665997086438225603633337515952093150407485675122008233788343094621502437911685372306395928118377859520761458720081340782062961822350448155185721641650067108864
```

Key 2:

```bash
cat ./clawback.unsigned | hsms -y --nochunks ./2.se
```

Response:

```bash
waiting for qrint-encoded signing requests
> 5496141022527413795140392142791749626543641578544867369452281830415553842059214382267267226052143257511876046736609023208076789214741327005454027973933695181445866976555756190935832218493040438492214564090662465704518993609872998672415919104
```

Now you can put the signatures into files. Do this by echoing the output of the previous commands and redirecting them with the `>` character (be sure to use the actual signatures you just obtained; **don't copy these lines verbatim**):

Key 1:

```bash
echo 5617572660431363787553058817392163812258580313793542655056082446740816880100648794665997086438225603633337515952093150407485675122008233788343094621502437911685372306395928118377859520761458720081340782062961822350448155185721641650067108864 > ./clawback_1.sig
```

Key 2:

```bash
echo 5496141022527413795140392142791749626543641578544867369452281830415553842059214382267267226052143257511876046736609023208076789214741327005454027973933695181445866976555756190935832218493040438492214564090662465704518993609872998672415919104 > ./clawback_2.sig
```

This command should have no output. The signatures are now stored in text files.

Finally, merge the claw back signatures into a signed spend bundle.
Note that an arbitrary number of signatures can be passed into this command. We'll use two signatures for this example.

```bash
hsmmerge ./clawback.unsigned ./clawback_1.sig ./clawback_2.sig > clawback.signed
```

#### Push the claw back to the network

:::note

- This command **will** modify the blockchain
- This command should be run from **outside** an HSM

:::

Now that you have a signed spend bundle, all that remains is pushing it to the blockchain. As usual, you can include a blockchain fee by using the `-m` flag and selecting a wallet with sufficient funds.

```bash
cic push_tx -b ./clawback.signed -m 10000000
```

```bash
Wallet keys:
1)   2104826454
2) * 394934909 (Synced)
Choose a wallet key [1-2] ('q' to quit, or Enter to use 394934909):
{'status': 'SUCCESS', 'success': True}
```

#### View the claw back's status

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

If you view the singleton's status right away, you will still see the active PAYMENT. This is because the blockchain has yet to process the clawback:

```bash
cic sync --show
```

Response:

```bash
Current time: 1665449644 (10/11/2022, 08:54:04)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 998000000000
  - amount to claim: 0

Outstanding events:
  PAYMENTS:
- PAYMENT to xch1xdm7s8fq4kdrq28lulnhxcxq8h6gcsf0y5j643vqx4ec3z9dhq7sqxsa9j of amount 1000000000 (Ready at: 10/11/2022, 09:06:24)
  REKEYS:
```

Wait a few minutes and run the same command again. You'll see that the clawback is now gone and the funds are now in `amount to claim:`

```bash
cic sync --show
```

Response:

```bash
Current time: 1665449964 (10/11/2022, 08:59:24)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 998000000000
  - amount to claim: 1000000000

Outstanding events:
  PAYMENTS:
  REKEYS:
```

Note that `amount to claim:` now has a positive value. This will automatically be absorbed into the singleton with the next spend. There is nothing else to do for now. The clawback was successful.

---

### Rekey

In this section, we'll demonstrate how to perform a standard rekey, using `m` keys. We'll provide a brand new set of keys, and we'll switch from the existing 2-of-3 multisig to a 3-of-5 configuration.

Note that a slow rekey is also possible. In this case, only use 1 of the 3 keys would need to sign, and there would be a timelock penalty. The steps for completing a slow rekey are the same as those for a standard rekey, other than the number of signatures obtained.

To perform a rekey, we will need to recreate the non-permanent layer. The permanent layer will remain intact (by definition).

As a reminder, here is the status of the configuration before the rekey is initiated:

```bash
cic show -c -d

Current time: 1665969326 (10/17/2022, 09:15:26)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 998000000000
  - amount to claim: 1000000000

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

#### Create new keys

:::note

- This command will **not** modify the blockchain
- This command should be run from **inside** an HSM

:::

In this example, we'll create 5 new keys in the folder that contains the configuration. We'll use the same technique as we used earlier in the guide:

```bash
hsmgen > 1_new.se
hsmgen > 2_new.se
hsmgen > 3_new.se
hsmgen > 4_new.se
hsmgen > 5_new.se
hsmpk $(cat ./1_new.se) > 1_new.pk
hsmpk $(cat ./2_new.se) > 2_new.pk
hsmpk $(cat ./3_new.se) > 3_new.pk
hsmpk $(cat ./4_new.se) > 4_new.pk
hsmpk $(cat ./5_new.se) > 5_new.pk
```

The old keys, new keys, and root configuration are now stored in the current directory:

```bash
(venv) ~/internal-custody/keys_and_sb$ ls
1_new.pk   1_new.se   1.pk   1.se   2_new.pk   2_new.se   2.pk   2.se   3_new.pk   3_new.se   3.pk   3.se   4_new.pk   4_new.se   5_new.pk   5_new.se  'Configuration (74905b).txt'  'sync (b43314).sqlite'
```

#### Re-derive the root

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

Next we'll run `cic derive_root`, which will create a new configuration file. A few things to note about this command's arguments:

- `-pks`, `-m` and `-n` all refer to the values that will be applied to the _next_ root (after the rekey)
- `sync (<number>).sqlite` refers to the _current_ database file
- `Configuration (after rekey).txt` is a new configuration file that will be created as a result of running this command

```bash
cic derive_root -db './sync (<number>).sqlite' -c './Configuration (after rekey).txt' -pks "1_new.pk,2_new.pk,3_new.pk,4_new.pk,5_new.pk" -m 3 -n 5
```

Response:

```bash
Custody rules successfully added to configuration
```

`Configuration (after rekey).txt` now exists in the current directory.

#### Start the rekey

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

Next, run `start_rekey`, which will create an unsigned spend bundle for the rekey. Note that in this command,
`-pks` refers to the original keys that must sign to allow the rekey to happen.
The configuration file from the `-new` flag contains all of the new info that will be used after the rekey has completed.

```bash
cic start_rekey -f rekey.unsigned -pks "1.pk,2.pk" -new './Configuration (after rekey).txt'
```

Response:

```bash
Successfully wrote spend to rekey.unsigned
```

The output of this command is the unsigned spend bundle that will be used for the rekey.

---

#### Sign the rekey spend bundle

:::note

- This command will **not** modify the blockchain
- This command should be run from **inside** an HSM

:::

Next we'll sign the spend bundle. This command must be run for each key with which you previously indicated you would sign (keys 1 and 2 in this case):

```bash
cat ./rekey.unsigned | hsms -y --nochunks ./1.se
```

Response:

```
waiting for qrint-encoded signing requests
> 5553916887262475184077140926040792461045541347543213333317025499263094062504028720464429695598620054538757674795116588032781458634437928597593286422775505503911468994161900539301149264496298971717210190554686077072886994338351766552885681152
```

```bash
cat ./rekey.unsigned | hsms -y --nochunks ./2.se
```

Response:

```bash
waiting for qrint-encoded signing requests
> 5561137392380018602752549597282386367838345256392677171809614780347764174154608487537742644428466353746831639451621586320322685820178179047514852085991565214608652175820480007073564769669494661900487484133333312104972188050976529086895435776
```

Now you can put the signatures into files. Do this by echoing the output of the previous commands and redirecting them with the `>` character (be sure to use the actual signatures you just obtained; **don't copy these lines verbatim**):

```bash
echo 5553916887262475184077140926040792461045541347543213333317025499263094062504028720464429695598620054538757674795116588032781458634437928597593286422775505503911468994161900539301149264496298971717210190554686077072886994338351766552885681152 > rekey_1.sig
```

```bash
echo 5561137392380018602752549597282386367838345256392677171809614780347764174154608487537742644428466353746831639451621586320322685820178179047514852085991565214608652175820480007073564769669494661900487484133333312104972188050976529086895435776 > rekey_2.sig
```

Finally, merge the rekey signatures into a signed spend bundle.
Note that an arbitrary number of signatures can be passed into this command.
For this example, we need to use the two signatures we just calculated:

```bash
hsmmerge ./rekey.unsigned ./rekey_1.sig ./rekey_2.sig > rekey.signed
```

As a result of running this command, a signed spend bundle will be created for the rekey.

#### Push the rekey to the network

:::note

- This command **will** modify the blockchain
- This command should be run from **outside** an HSM

:::

Now that you have a signed spend bundle, all that remains is pushing it to the blockchain. As usual, you can add a blockchain fee by using the `-m` flag:

```bash
cic push_tx -b ./rekey.signed -m 1000000
```

Response:

```bash
Wallet keys:
1)   2104826454
2) * 394934909 (Synced)
Choose a wallet key [1-2] ('q' to quit, or Enter to use 394934909):
{'status': 'SUCCESS', 'success': True}
```

#### View the rekey's status

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

Wait a few minutes for the transaction to be processed, then update the singleton's status to show that the rekey is in progress. This will show the old and new puzzle roots:

```bash
cic sync --show
```

Response:

```bash
Current time: 1665980851 (10/17/2022, 12:27:31)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 998000000000
  - amount to claim: 1000000000

Outstanding events:
  PAYMENTS:
  REKEYS:
- REKEY from 74905b06591f9d2e615d313d18cfbcbeffcaabe2e70ccdeafda783bacaae52ef to 90ba2a1ce4ca7f094aa1d2c64b7281b18a4e211e704b43ed45bf39f61cdd67d2 (Ready at: 10/17/2022, 12:36:19)
```

As the output of this command shows, there is a new rekey outstanding (`REKEY from...`).

- If (`-rc`) seconds have not elapsed since the drop coin's creation, the output will display `(Ready at: <mm/dd/yyyy hh:mm:ss>)`
- If (`-rc`) seconds have elapsed, then the output will say `(Ready)`

In either case, cancellation/clawback is allowed until the rekey is completed.
(Even if the rekey is in "Ready" state, it can still be clawed back. However, because _anyone_ can
complete the rekey, claw backs should no longer be assumed to be available once it reaches the "Ready" state.)

Note that even when the state is "Ready", the next transaction block will still need to be created before the rekey is _actually_ ready.
Transaction blocks happen every 52 seconds on average.

#### Create a signed spend bundle for the completion

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

:::info

The `cic complete` command is valid for both payments and rekeys.

Completion of both payments and rekeys require the same steps.

:::

**Anyone** can run the `cic complete` command. The only argument necessary is the file in which to dump the completion.

After the time lock has expired, run `cic complete` to sign the rekey spend bundle. You do have to enter the correct rekey number. It should be `1` (the only option). There is no default, so pressing `enter` will cause an exception.

```bash
cic complete -f ./rekey.signed
```

Response:

```bash
Which actions would you like to complete?:

1) REKEY from 74905b06591f9d2e615d313d18cfbcbeffcaabe2e70ccdeafda783bacaae52ef to 90ba2a1ce4ca7f094aa1d2c64b7281b18a4e211e704b43ed45bf39f61cdd67d2
(Enter index of action to complete): 1
Successfully wrote spend to ./rekey.signed
```

#### Push the completion to the blockchain

:::note

- This command **will** modify the blockchain
- This command should be run from **outside** an HSM

:::

Now that you have a signed spend bundle, you can actually push it to the blockchain:

```bash
cic push_tx -b ./rekey.signed -m 1000000
```

Response:

```bash
Wallet keys:
1)   2104826454
2) * 394934909 (Synced)
Choose a wallet key [1-2] ('q' to quit, or Enter to use 394934909):
{'status': 'SUCCESS', 'success': True}
```

You should receive a `SUCCESS` message, indicating that the transaction has been successfully pushed.

#### View the completion's status

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

After waiting for the next transaction block, the singleton's status should show there are no longer any pending payments or rekeys.

```bash
cic sync --show
```

Response:

```bash
Configuration is outdated, please update it with command cic update_config

Current time: 1665983685 (10/17/2022, 13:14:45)

Config up to date: False

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 998000000000
  - amount to claim: 1000000000

Outstanding events:
  PAYMENTS:
  REKEYS:
```

However, take note of this status message: `Config up to date: False`. We'll fix this in the next step.

#### Update the local configuration

At this point, the rekey has completed, but your local config is outdated. Any attempts at creating payments or rekeys will fail while the config is in this state.

To demonstrate this, view the details of the config:

```bash
cic show -d
```

Response:

```bash
Current time: 1665984049 (10/17/2022, 13:20:49)

Config up to date: False

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 998000000000
  - amount to claim: 1000000000

Outstanding events:
  PAYMENTS:
  REKEYS:

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

The three pubkeys are from the _old_ configuration. Furthermore, the multisig is still a 2-of-3. To fix this, run the `update_config` command and pass in the new configuration:

```bash
cic update_config -c './Configuration (after rekey).txt'
```

Response:

```bash
Configuration update successful
```

Finally, let's look at the configuration details again:

```bash
cic show -d
```

Response:

```bash
Current time: 1665984317 (10/17/2022, 13:25:17)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 998000000000
  - amount to claim: 1000000000

Outstanding events:
  PAYMENTS:
  REKEYS:

Derivation Info:
 - lock level: 3
 - max lock level: 5
 - min keys to rekey: 1
 - standard rekey timelock: 300 seconds
 - slow rekey penalty: 900 seconds
 - pubkeys:
    - bls123813fa002rgts3juyvcx9kfd6027weggz2n9q64uy97j3gvcfmnzwe7lqf28jg8kzslcufjul5zl6g3w6w943u
    - bls123813hck83sfk4xu7vjt4x30qz4ynyyc8y2mp7wc8xemrk225x2sdx45vpjwvu6gn0n2tf00e3y39y57zhw2e3m
    - bls12381jxsw44j37vcetuzr4ta7smf33phxj7n4rd9e927vckfx265yma488sfrktnsar7w87t4x6zveulkjshlr7c
    - bls123815gu3gzkdwyuhd3xyrlwt95ywjgvx7rkwaxqe64pwx2z03njc0s5awk7yqcdafdfdcp2s6lsx89vjkd0wct4
    - bls1238156rg50emtnt6v5eua2rstgcd4fep8kch9xmcdhepvdqhlea6s3pulre838xxgme3dzur44jxfpcfsu5sq9t
```

The correct keys are now being used.

Note that each of the nodes that are allowed to sign will need to receive a copy of the new configuration.

---

### Lock Level Increase

The final feature of the custody tool is "lock level increase". This feature will increase the security of the singleton by requiring an additional signature to sign withdrawals and rekeys.

For this test, we'll start with the same configuration that was used after the rekey in the previous section.

The current lock level (`m`) is `3` and the total number of keys (`n`) are `5`:

```bash
cic show -d
```

Response:

```bash
Current time: 1665984640 (10/17/2022, 13:30:40)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 998000000000
  - amount to claim: 1000000000

Outstanding events:
  PAYMENTS:
  REKEYS:

Derivation Info:
 - lock level: 3
 - max lock level: 5
 - min keys to rekey: 1
 - standard rekey timelock: 300 seconds
 - slow rekey penalty: 900 seconds
 - pubkeys:
    - bls123813fa002rgts3juyvcx9kfd6027weggz2n9q64uy97j3gvcfmnzwe7lqf28jg8kzslcufjul5zl6g3w6w943u
    - bls123813hck83sfk4xu7vjt4x30qz4ynyyc8y2mp7wc8xemrk225x2sdx45vpjwvu6gn0n2tf00e3y39y57zhw2e3m
    - bls12381jxsw44j37vcetuzr4ta7smf33phxj7n4rd9e927vckfx265yma488sfrktnsar7w87t4x6zveulkjshlr7c
    - bls123815gu3gzkdwyuhd3xyrlwt95ywjgvx7rkwaxqe64pwx2z03njc0s5awk7yqcdafdfdcp2s6lsx89vjkd0wct4
    - bls1238156rg50emtnt6v5eua2rstgcd4fep8kch9xmcdhepvdqhlea6s3pulre838xxgme3dzur44jxfpcfsu5sq9t
```

This section will show you how to increase the lock level from 3 to 4.

Note that `m + 1` keys are required to perform a lock level increase. The change happens instantly; there are no timelocks.

#### Create an unsigned spend bundle

:::note

- This command will **not** modify the blockchain
- This command should be run from **outside** an HSM

:::

We're increasing the lock level to `4`, so 4 signatures are required.

First, run `increase_security_level` to create an unsigned spend bundle in the current directory (the `-f` flag specifies a name of your choosing for the spend bundle's file):

```bash
cic increase_security_level -db './sync (b43314).sqlite' -pks "1_new.pk,2_new.pk,3_new.pk,4_new.pk" -f lock.unsigned
```

```bash
Successfully wrote spend to lock.unsigned
```

#### Obtain the necessary signatures

:::note

- This command will **not** modify the blockchain
- This command should be run from **inside** an HSM

:::

To obtain a signature, you can show the unsigned spend bundle and sign it using each secret exponent. This can all be done in one step per key. The `-y` flag will skip confirmations; the `--nochunks` flag will read the whole spend bundle at once:

Key 1 sign:

```bash
cat ./lock.unsigned | hsms -y --nochunks ./1_new.se
```

Response:

```bash
waiting for qrint-encoded signing requests
> 5584585057520858257596568434434736468879879030051480798698830066925118374233799120275041845100800744509641108863621118287346338415119167517335089120981537696371131432139277792509432536571981918850999633459839528558573464018115269776291456000
```

Key 2 sign:

```bash
cat ./lock.unsigned | hsms -y --nochunks ./2_new.se
```

Response:

```bash
waiting for qrint-encoded signing requests
> 5596611223462712820925493669789023509892077063125281932973497767062668243757232230153671518302675106032197417392577895529625567483229164680652892471328071863919254108314305083687045227755330732629257306047484998281765256667290484092751463424
```

Key 3 sign:

```bash
cat ./lock.unsigned | hsms -y --nochunks ./3_new.se
```

Response:

```bash
waiting for qrint-encoded signing requests
> 5507035678252947832755627112345427198885684297293023719787488450243985548287900050057301009712766271669018549703372277803453181282204806972440692140562175749850514957566952251935126028322521661663226647342503359504131029556224237766358564864
```

Key 4 sign:

```bash
cat ./lock.unsigned | hsms -y --nochunks ./4_new.se
```

Response:

```bash
waiting for qrint-encoded signing requests
> 5483471380171606797033786582612064653552450181239095297578037519743188523667870753537879814000810537979853272471506390417310881058640555024925581663772094055089211664508376733226945171995301040054217933947567022837307451113580673098002732032
```

This command outputs a signature encoded in base-10.

Now you can put the signatures into files. Do this by echoing the output of the previous commands and redirecting them with the `>` character (be sure to use the actual signatures you just obtained; **don't copy these lines verbatim**):

Key 1:

```bash
echo 5584585057520858257596568434434736468879879030051480798698830066925118374233799120275041845100800744509641108863621118287346338415119167517335089120981537696371131432139277792509432536571981918850999633459839528558573464018115269776291456000 > lock_1.sig
```

Key 2:

```bash
echo 5596611223462712820925493669789023509892077063125281932973497767062668243757232230153671518302675106032197417392577895529625567483229164680652892471328071863919254108314305083687045227755330732629257306047484998281765256667290484092751463424 > lock_2.sig
```

Key 3:

```bash
echo 5507035678252947832755627112345427198885684297293023719787488450243985548287900050057301009712766271669018549703372277803453181282204806972440692140562175749850514957566952251935126028322521661663226647342503359504131029556224237766358564864 > lock_3.sig
```

Key 4:

```bash
echo 5483471380171606797033786582612064653552450181239095297578037519743188523667870753537879814000810537979853272471506390417310881058640555024925581663772094055089211664508376733226945171995301040054217933947567022837307451113580673098002732032 > lock_4.sig
```

#### Merge the spend bundle

:::note

- This command will **not** modify the blockchain
- This command should be run from **inside** an HSM

:::

The `hsmmerge` command will create a signed spend bundle, given an unsigned spend bundle and the individual signature(s).

It will then redirect the signed spend bundle into its own text file.

Note that the merging of signatures is possible because Chia uses BLS signatures. For this command, an arbitrary number of signatures can be merged. We need to use all four of the obtained signatures in this case:

```bash
hsmmerge ./lock.unsigned ./lock_1.sig ./lock_2.sig ./lock_3.sig ./lock_4.sig > lock.signed
```

The output of this command is the signed spend bundle, which we've redirected into a text file. This file should be taken out of the HSM to be pushed to the blockchain.

#### Push the lock level increase to the blockchain

:::info

- This command **will** modify the blockchain
- This command should be run from **outside** an HSM

:::

Now that we have a signed spend bundle, we can push it to the blockchain. You can add a transaction fee by using the `-m` flag:

```bash
cic push_tx -b ./lock.signed -m 1000000
```

Response:

```bash
Wallet keys:
1)   2104826454
2) * 394934909 (Synced)
Choose a wallet key [1-2] ('q' to quit, or Enter to use 394934909):
{'status': 'SUCCESS', 'success': True}
```

The lock level increase will be added to the blockchain with the next transaction block. After waiting a few minutes, run `cic sync --show` to update your configuration:

```bash
cic sync --show
```

Response:

```bash
Current time: 1665986785 (10/17/2022, 14:06:25)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 998000000000
  - amount to claim: 1000000000

Outstanding events:
  PAYMENTS:
  REKEYS:
```

You should see `Config up to date: True` in the output of the above command. This should indicate that the lock level increase was successful. To verify this, run `cic show -d`:

```bash
cic show -d
```

Response:

```bash
Current time: 1665986943 (10/17/2022, 14:09:03)

Config up to date: True

Singleton:
  - launcher ID: b433146cc20ef0e3d962423ddb1c6868cd9691e099ae579ab2518d1cd983885c
  - amount left: 998000000000
  - amount to claim: 1000000000

Outstanding events:
  PAYMENTS:
  REKEYS:

Derivation Info:
 - lock level: 4
 - max lock level: 5
 - min keys to rekey: 1
 - standard rekey timelock: 300 seconds
 - slow rekey penalty: 900 seconds
 - pubkeys:
    - bls123813fa002rgts3juyvcx9kfd6027weggz2n9q64uy97j3gvcfmnzwe7lqf28jg8kzslcufjul5zl6g3w6w943u
    - bls123813hck83sfk4xu7vjt4x30qz4ynyyc8y2mp7wc8xemrk225x2sdx45vpjwvu6gn0n2tf00e3y39y57zhw2e3m
    - bls12381jxsw44j37vcetuzr4ta7smf33phxj7n4rd9e927vckfx265yma488sfrktnsar7w87t4x6zveulkjshlr7c
    - bls123815gu3gzkdwyuhd3xyrlwt95ywjgvx7rkwaxqe64pwx2z03njc0s5awk7yqcdafdfdcp2s6lsx89vjkd0wct4
    - bls1238156rg50emtnt6v5eua2rstgcd4fep8kch9xmcdhepvdqhlea6s3pulre838xxgme3dzur44jxfpcfsu5sq9t
```

The lock level is now set to `4`. Note that the keys themselves haven't changed. However, four of the five will now be required to make any payments.

The only way to _decrease_ the lock level is with a rekey. Note that it is possible to run a rekey with identical keys, but at least one parameter must change for a rekey to be possible. In this case, you could run a rekey to decrease the lock level and keep all other values the same.
