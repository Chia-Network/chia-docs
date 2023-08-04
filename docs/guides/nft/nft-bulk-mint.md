---
slug: /guides/nft-bulk-mint
title: NFT Bulk Minting Tool
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This document will show you how to use Chia's NFT bulk minting tool.

First, some background. Chia uses the [coin set](coin-set-intro) model of accounting. This is similar to Bitcoin's UTXO model. Most other blockchains, however, use an account model to track the system's overall state.

The coin set model has [many advantages](/coin-set-vs-account) over the account model, but there are some tradeoffs. In the case of NFTs, they are implemented as [singletons](https://chialisp.com/singletons) instead of a simple array. Because of this, creating multiple related NFTs in the same block can be a cumbersome process.

Enter Chia's bulk minting tool. This tool allows you to mint an arbitrarily large number of NFTs, complete with separate [offers](https://chialisp.com/offers) for each of them. Want to automate the minting of your 10,000 PFP collection? You've come to the right place!

:::info

The number of NFTs per spend bundle is hard-coded at 25 in this tool. It may be possible to mint more than 25 NFTs at a time, but doing so will increase the risk of the spend bundle not getting included onto the blockchain without a large fee. We feel that minting 25 NFTs at a time will strike the right balance between speed and consistency. Modify this value at your own risk.

:::

<details>
  <summary>Note about Python <code>RuntimeError</code> on Windows</summary>

If you are running on Windows, you might occasionally see a Python Runtime Error. This is a [known issue in Python](https://github.com/aio-libs/aiohttp/issues/4324 'More info about this issue') and can be safely ignored. For example:

```bash
chia stop -d all

Exception ignored in: function _ProactorBasePipeTransport.__del__ at 0x000001A719716160
Traceback (most recent call last):
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\asyncio\proactor_events.py", line 116, in __del__
    self.close()
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\asyncio\proactor_events.py", line 108, in close
    self._loop.call_soon(self._call_connection_lost, None)
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\asyncio\base_events.py", line 746, in call_soon
    self._check_closed()
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\asyncio\base_events.py", line 510, in _check_closed
    raise RuntimeError('Event loop is closed')
RuntimeError: Event loop is closed
daemon: {'ack': True, 'command': 'exit', 'data': {'success': True}, 'destination': 'client', 'origin': 'daemon', 'request_id': '0de5449121b6873ce18661b2adc4213d7dc795c2943ff7f4be9502058e8eaba0'}
```

</details>

## Download the testnet database

We strongly recommend that you test the bulk minting tool either on the testnet or by using the [simulator](/guides/simulator-user-guide) before attempting to use it on mainnet. In addition, you will need to run a fully synced node in order to use this tool (this is true for testnet, mainnet and the simulator).

For this guide, we will use the testnet. If you do not already have a synced testnet node, you can safely [download a copy of the database](https://www.chia.net/downloads/#database-checkpoint). **Do not attempt this on mainnet.** [Click here to begin the download.](https://download.chia.net/testnet10/blockchain_v2_testnet10.sqlite.gz "Chia's testnet10 database download site") Save the file to your Downloads folder.

:::note
At the time of this writing, the file you will download is around 50 GB, compressed. Uncompressed, it will be around 100 GB. However, this file increases in size every day. You may want to double check that you have plenty of free space before proceeding with the download.
:::

You may continue with the next steps while the download is in progress.

## Install the bulk minting tool

This section will show you how to download and install the bulk minting tool. If Chia is already installed on your system, make sure it is stopped before continuing:

```bash
chia stop -d all
```

:::note
If you don't already have the `git` CLI tool installed, [follow these instructions](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git) to install it
:::

1. Clone the [chia-nft-minting-tool](https://github.com/Chia-Network/chia-nft-minting-tool 'chia-nft-minting-tool') GitHub repository, which contains the bulk minting tool.

In order to clone this repository, first open a PowerShell (Windows) or terminal (Linux and MacOS) window. Next, run the `git clone` command:

```bash
git clone https://github.com/Chia-Network/chia-nft-minting-tool.git -b main
```

2. Change to the newly-cloned repository's directory:

```bash
cd chia-nft-minting-tool
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

4. Install the bulk minting tool. This will install a copy of Chia in your virtual environment, as well as all other dependencies for the tool:

```bash
pip install --editable .[dev]
```

## Configure Chia to use the bulk minting tool

:::info

The bulk minting tool comes with a packaged version of Chia. In order to use the tool, you must have some TXCH (or XCH), a DID wallet, an NFT wallet, and a synced full node. If you already have all of this set up, then feel free to skip to the [next section](#run-the-bulk-minting-tool), which will show you how to use the tool.

:::

1. Run the following command to set up Chia to use the testnet:

```bash
chia configure --testnet true
```

:::note
If you previously had been running Chia on mainnet, then your peers table will be populated with mainnet peers.
When you switch to running on the testnet, the peers listed in this table will time out.
Eventually the table will be repopulated with testnet peers, but this can take a long time.
In order to expedite this process, We recommend that you delete your peers tables:

- `~/.chia/mainnet/db/peers.dat`
- `~/.chia/mainnet/wallet/db/wallet_peers.dat`
  :::

2. We recommend that you use `INFO` level logging instead of the default `WARNING` level. To do this, run:

```bash
chia configure --set-log-level INFO
```

3. We recommend that you use a public/private key pair for testnet that is separate from your mainnet keys. If you don't have a separate set of testnet keys, generate them by running the following command:

```bash
chia keys generate
```

This will give an output such as the following:

```bash
Generating private key
Added private key with public key fingerprint 3049838316
(...)
```

:::tip
It is good security practice to use this set of keys for testnet development only. In case of key compromise, your TXCH will be sandboxed from your XCH.
:::

4. If you generated new testnet keys in the last step, we recommend that you write down your seed phrase for later recovery. Run the following:

```bash
chia keys show --show-mnemonic-seed
```

5. You will be shown your public and private keys. The last line of the output will be a list of 24 secret words. This is your _seed phrase_. **Carefully copy the words on paper and store them in a secure location.** Order is important.

```text
Showing all public and private keys

Fingerprint: 3049838316
(...)
	Mnemonic seed (24 secret words):
youth stomach social aware clay pottery benefit asthma mail cry rubber panda wife around provide atom cute sand staff exotic pink east gloom minute
```

:::warning important
Your seed phrase is all that is required to recover your wallet. If you lose your seed phrase, recovery will not be possible. If a bad actor gains access to your seed phrase, they'll be able to steal your Chia assets, including XCH, CATs and NFTs.
:::

:::info
If you ever need to display your address, run `chia keys show`. This command will only output your public keys and address; your private keys and seed phrase will not be shown.
:::

6. In order to continue, you will need to have some TXCH in your wallet. If your total balance is 0, you can obtain 1 TXCH from our faucet. Copy the value of "First wallet address:" from the output of the `chia keys show` command. It will be a long string beginning with "txch".

Open our [testnet faucet page](https://testnet10-faucet.chia.net "Chia's testnet10 faucet link"). Paste your address and click "Submit".

You will receive this message: `Accepted. Your request is in the queue and will be processed in the order it was received.` At some point you will receive 1 TXCH. Depending on how busy the faucet and the testnet are, this could take several minutes. However, you don't need to wait for your coins to arrive before continuing.

7. Create the folder where your database will reside (if it doesn't already exist):

```bash
mkdir ~/.chia/mainnet/db
```

8. If you downloaded a copy of the testnet database, you will need to wait for the download to complete before continuing. After the download has completed, use an archive manager such as [7-Zip](https://www.7-zip.org/ "7-Zip's website") to extract the file. You should now have a file in your Downloads folder called `blockchain_v2_testnet10.sqlite`.

Move the database to the folder you just created:

```bash
mv ~/Downloads/blockchain_v2_testnet10.sqlite ~/.chia/mainnet/db
```

9. Start the full node, which will begin syncing to the database file:

```bash
chia start node
chia_full_node: started
```

Note that for your first time running Chia after downloading a copy of the database, it could take several minutes to start your full node.

Check the sync status:

```bash
chia show -s
```

Eventually, it will say `Full Node Synced`:

```text
Network: testnet10    Port: 58444   RPC Port: 8555
Node ID: 82a73b06b3a5f9493a3ac4e3d903026b39c85b748158ba41c623d531947f2a2a
Genesis Challenge: ae83525ba8d1dd3f09b277de18ca3e43fc0af20d20c4b3e92ef2a48bd291ccb2
Current Blockchain Status: Full Node Synced
```

10. Start your wallet by running:

```bash
chia start wallet
```

Wait for your wallet to sync. You can view the status of your wallet with the following command:

```bash
chia wallet show
```

If you have more than one wallet key, be sure to select the correct key/fingerprint, which you obtained from the `chia keys show` command:

```text
Wallet keys:
1)   502984008
2) * 3027243821 (Not Synced)
Choose a wallet key [1-2] ('q' to quit, or Enter to use 3027243821):
Wallet height: 938814
Sync status: Syncing...
```

Syncing should only require a few minutes, unless your wallet has a large number of previous transactions. Eventually, the `chia wallet show` command will show that your wallet has been synced. For example:

```text
Wallet height: 1373085
Sync status: Synced
Balances, fingerprint: 3027243821

Chia Wallet:
   -Total Balance:         27.308704999834 txch (27308704999834 mojo)
   -Pending Total Balance: 27.308704999834 txch (27308704999834 mojo)
   -Spendable:             27.308704999834 txch (27308704999834 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

11. In order to run the bulk minting tool, you will need to have an NFT wallet that is associated with a DID. You will need to have some TXCH in order to create this wallet. If your requested TXCH has not yet arrived, post your address on the #chia-development channel on Discord. Someone might be able to send some to you.

In order to create a DID, run the following command (`-n` is for the name of the DID, which can be anything):

```bash
chia wallet did create -n bulk_mint_DID
```

This will output two success messages, such as:

```
Successfully created a DID wallet with name bulk_mint_DID and id 2 on key 502984008
Successfully created a DID did:chia:15m7n008jrpzatcakz55xx9re3zhkt9avxzvqnjgm3084q458t8us7a4cwn in the newly created DID wallet
```

12. Next, run the command to create an NFT wallet that is associated with the DID. This command has three flags:

- `-f <wallet fingerprint>`
- `-di <DID ID>`
- `-n <NFT wallet name`

For example:

```bash
chia wallet nft create -f 502984008 -di did:chia:15m7n008jrpzatcakz55xx9re3zhkt9avxzvqnjgm3084q458t8us7a4cwn -n "NFT Wallet for bulk minting"
```

This command will output a success message, such as:

```bash
Successfully created an NFT wallet with id 3 on key 502984008
```

The `chia wallet show` command should now show at least three wallets: your Chia wallet, DID wallet and NFT wallet:

```bash
Wallet height: 1515633
Sync status: Synced
Balances, fingerprint: 502984008

Chia Wallet:
   -Total Balance:         20.999999999999 txch (20999999999999 mojo)
   -Pending Total Balance: 20.999999999999 txch (20999999999999 mojo)
   -Spendable:             20.999999999999 txch (20999999999999 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

bulk_mint_DID:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:15m7n008jrpzatcakz55xx9re3zhkt9avxzvqnjgm3084q458t8us7a4cwn
   -Wallet ID:             2

bulk_mint_DID NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -DID ID:                did:chia:15m7n008jrpzatcakz55xx9re3zhkt9avxzvqnjgm3084q458t8us7a4cwn
   -Wallet ID:             3
```

Once you have a synced full node, some TXCH, a DID wallet, and an NFT wallet, you may proceed to the next section.

<details>
  <summary>Note about Chia wallets</summary>

In Chia, each public/private key pair can hold multiple wallets of various types.

A "fingerprint" is a 4-byte hash of a public key. The computer running the examples we'll use in the next sections had two public/private key pairs, and thus two fingerprints, labeled `1)` and `2)`.

Note that simultaneous syncing of multiple fingerprints is not currently possible. Whether you're using the CLI or the GUI (in general, not just for NFTs) you have to select one of the fingerprints to sync, while the other will be temporarily ignored and not synced.

Within each of the fingerprints, you can store multiple wallets of various types. The default wallet is a `Chia Wallet`, aka a `STANDARD_WALLET`. This label is [part of an enum](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/util/wallet_types.py) with a value of `0`. The other wallet types are as follows:

```python
STANDARD_WALLET = 0
RATE_LIMITED = 1
ATOMIC_SWAP = 2
AUTHORIZED_PAYEE = 3
MULTI_SIG = 4
CUSTODY = 5
CAT = 6
RECOVERABLE = 7
DECENTRALIZED_ID = 8
POOLING_WALLET = 9
NFT = 10
```

A few notes about this enum:

- The only types that are supported as of June 2022 are STANDARD_WALLET, DECENTRALIZED_ID, CAT, and NFT
- Each fingerprint/Wallet Key can support _each_ of the following:
  - One `STANDARD_WALLET`
  - An unbounded number of `CAT`s
  - An unbounded number of `DECENTRALIZED_ID`s
  - One `NFT` wallet per `DECENTRALIZED_ID` (where each `NFT` wallet is associated with exactly one `DECENTRALIZED_ID`)
  - One additional `NFT` wallet that is not associated a `DECENTRALIZED_ID`
- If an existing `NFT` wallet is already associated with a `DECENTRALIZED_ID`, then an attempt to create a new `NFT` wallet associated with the same `DECENTRALIZED_ID` will pass, but it will not actually create the `NFT` wallet because it already exists
- If an existing `NFT` wallet is not associated with a `DECENTRALIZED_ID`, then an attempt to create a new `NFT` wallet that is not associated with a `DECENTRALIZED_ID` will pass, but it will not actually create the `NFT` wallet because it already exists
- In addition to a type, each wallet also has a `Wallet ID`. This is simply an integer that increments for each new wallet.

For example, the following setup would be possible to run on a single computer:

- Wallet Key 1 (not synced)
  - Chia Wallet (Type = STANDARD_WALLET, Wallet ID = 1)
  - Marmot (Type = CAT, Wallet ID = 2)
- Wallet Key 2 (synced)
  - Chia Wallet (Type = STANDARD_WALLET, Wallet ID = 1)
  - NFT Wallet (Type = NFT, Wallet ID = 2)
  - Marmot (Type = CAT, Wallet ID = 3)
  - Spacebucks (Type = CAT, Wallet ID = 4)
- Wallet Key 3 (synced)
  - Chia Wallet (Type = STANDARD_WALLET, Wallet ID = 1)
  - NFT Wallet (Type = NFT, Wallet ID = 2, not associated with a DID)
  - DID Wallet (Type = DECENTRALIZED_ID, Wallet ID = 3)
  - DID Wallet (Type = DECENTRALIZED_ID, Wallet ID = 4)
  - NFT Wallet (Type = NFT, Wallet ID = 5, associated with DID from Wallet ID 3)

Under Wallet Key 3 of this setup, it would not be possible to create another NFT wallet that is not associated with a DID, or another DID wallet that is associated with the DID from Wallet ID 3. However, it would be possible to create an NFT wallet that is associated with the DID from WALLET ID 4. It would also be possible to create a new DID within Wallet Key 3.

</details>

## Run the bulk minting tool

### Example 1

For this example, we'll mint 100 NFTs from a sample data set and send them to our own wallet. We'll also automatically create offers for each NFT.

This is a good use case if you intend to sell your NFTs after minting. If you already know the recipient addresses for your NFT collection, then skip to [Example 2](#example-2).

1. Generate the factory (sample) data.

:::info

The command from this step will generate a sample csv file, which you can then use as a guide to create a csv file for your actual collection. If you have already set up your csv file, then skip to Step 3.

:::

```bash
python factory_metadata.py 100
```

The output of this command will be a royalty address and a default royalty percentage (300 basis points). You can adjust the royalty percentage when creating the spend bundles (Step 3).

```bash
Royalty Address: txch1f22eww6stx4jg4ue4auw9xrr42m7r0uegddhtzh2cxlx7pttr98s0uy7qk
Royalty Percent: 300
```

Additionally, a CSV file called `metadata.csv` will be created in the local directory. This file will contain the sample data.

2. Fix EOL Characters (Windows only)

Linux or macOS users should skip to Step 3.

If you are running on Windows, the CSV file will contain an extra CR (carriage return) character at the end of each line. This will cause the bulk minting tool to fail. First, you must convert the CSV file to use UNIX-style end-of-line characters.

The easiest way to accomplish this is with `dos2unix`. This is not included with Windows, so you will need to download it from SourceForge.

Steps to convert the CSV file:

- Visit the [SourceForge dos2unix site](https://sourceforge.net/projects/dos2unix/).
- Click the green _“Download”_ button. After five seconds, the `dos2unix` zip file will be downloaded to your Downloads folder.
- Unzip the `dos2unix` zip file.
- From a PowerShell window, run:

```powershell
<path to dos2unix.exe> -o <path to CSV file>
```

For example:

```powershell
~\Downloads\dos2unix\bin\dos2unix.exe -o .\metadata.csv
```

This message should appear in the output:

```
dos2unix: converting file <CSV file> to Unix format...
```

3. Create the spend bundles. This command has six inputs:

- `-w`: the wallet ID for the NFT wallet (`3` in this example)
- `-d`: a boolean indicating whether to use a DID (default is `False`)
- `-a`: the royalty address for the NFTs (typically this is the artist's address)
- `-r`: the royalty percentage, in basis points ("300" means 3%)
- `-t`: a boolean indicating whether the target addresses are included in the metadata csv file (default is `False`)
- The name of the output file where the spend bundles will be stored (`output.pkl` in this example)

For example:

```bash
chianft create-mint-spend-bundles -w 3 -a <royalty address> -r 300 metadata.csv output.pkl
```

Result:

```bash
Successfully created 4 spend bundles
```

The number of spend bundles created will be `ceiling(number of NFTs / 25)`.

Note that you may see a warning such as:

```bash
 warnings.warn("coin_solutions is now coin_spends in SpendBundle.from_json_dict")
```

This can be safely ignored.

4. Submit the spend bundles created in the output file (output.pkl in this example). This command has two flags:
   - `-m`: an optional transaction fee, in mojos. This is a fee to be used for inclusion in the blockchain, completely separate from the royalty percentage. This fee will be applied once per spend bundle of 25 NFTs. The bulk mint tool will not verify that you have enough money to cover this fee beforehand
   - `-o`: set this to create a separate offer file for each NFT, using the specified price. In this example, the offer price will be 100 mojos

```bash
chianft submit-spend-bundles -m 10 -o 100 output.pkl
```

Each time a spend bundle is submitted, some status info will appear. For example:

```bash
SUBMITTED: 1/4	TX: 104.70s	FEE: 0.04s	OFFER: 6.02s	TOTAL: 120.77s
```

Expect the total time for each spend bundle to be around 1-2 minutes. A project with `10 000` NFTs could take anywhere from 7-14 hours to complete.

As a result of running this command, an `offers` folder will be created in your current directory. This new folder will contain the offer files (100 in this example), which you can then post to a marketplace, send to individual users, etc.

:::note

If the process fails (eg due to network error, insufficient funds, etc), the next time you run the command, the tool will pick up where it left off.

:::

### Example 2

For this example, we'll mint 100 NFTs from a sample data set and air-drop them to target addresses. This is a good use case if you already know the recipient addresses for your NFT collection.

1. Generate the factory data for 100 NFTs. The difference from the previous example is the "t" flag, which indicates that we should include a target address in the metadata csv:

```bash
python factory_metadata.py t 100
```

The output of this command will be a royalty address and a default royalty percentage (300 basis points). You can adjust the royalty percentage when creating the spend bundles (Step 3).

```bash
Royalty Address: txch17ka38gg3zvrfundu9c4gqxle92pge39qdnkuwu2jn03cjp8cgfwqf0s9zg
Royalty Percent: 300
```

Additionally, a CSV file called `metadata.csv` will be created in the local directory. This file will contain the sample data.

2. Fix EOL Characters (Windows only)

Linux or macOS users should skip to Step 3.

If you are running on Windows, the CSV file will contain an extra CR (carriage return) character at the end of each line. This will cause the bulk minting tool to fail. First, you must convert the CSV file to use UNIX-style end-of-line characters.

The easiest way to accomplish this is with `dos2unix`. This is not included with Windows, so you will need to download it from SourceForge.

Steps to convert the CSV file:

- Visit the [SourceForge dos2unix site](https://sourceforge.net/projects/dos2unix/).
- Click the green _“Download”_ button. After five seconds, the `dos2unix` zip file will be downloaded to your Downloads folder.
- Unzip the `dos2unix` zip file.
- From a PowerShell window, run:

```powershell
<path to dos2unix.exe> -o <path to CSV file>
```

For example:

```powershell
~\Downloads\dos2unix\bin\dos2unix.exe -o .\metadata.csv
```

This message should appear in the output:

```
dos2unix: converting file <CSV file> to Unix format...
```

3. Create the spend bundles. This command has six inputs:

- `-w`: the wallet ID for the NFT wallet (`3` in this example)
- `-d`: a boolean indicating whether to use a DID (default is `False`)
- `-a`: the royalty address for the NFTs (typically this is the artist's address)
- `-r`: the royalty percentage, in basis points ("300" means 3%)
- `-t`: a boolean indicating whether the target addresses are included in the metadata csv file (default is `False`; we'll use `True` for this example)
- The name of the output file where the spend bundles will be stored (`output.pkl` in this example)

For example:

```bash
chianft create-mint-spend-bundles -w 3 -a <royalty address> -r 300 -t True metadata.csv output.pkl
```

Result:

```bash
Successfully created 4 spend bundles
```

You may see a warning such as:

```bash
 warnings.warn("`coin_solutions` is now `coin_spends` in `SpendBundle.from_json_dict`")
```

This can be safely ignored.

4. Submit the spend bundles created in the output file (output.pkl in this example). This command has two flags:
   - `-m`: an optional transaction fee, in mojos. This is a fee to be used for inclusion in the blockchain, completely separate from the royalty percentage. This fee will be applied once per spend bundle of 25 NFTs. The bulk mint tool will not verify that you have enough money to cover this fee beforehand
   - `-o`: *Not set.* In this example, we don't provide this option as we will be air-dropping them to their targeted address in the `metadata.csv`. We declared these spend bundles to include a targeted address in the previous command. We would not be able to create offers for NFTs where we are offering the NFT if we are not the owner. (The air-drop address is the NFT owner.)

```bash
chianft submit-spend-bundles -m 10 output.pkl
```

Each time a spend bundle is submitted, some status info will appear. For example:

```bash
SUBMITTED: 1/4	TX: 104.70s	FEE: 0.04s	OFFER: 6.02s	TOTAL: 120.77s
```

Expect the total time for each spend bundle to be around 1-2 minutes. A project with `10 000` NFTs could take anywhere from 7-14 hours to complete.

As a result of running this command the NFTs will be air-dropped to the correct recipient addresses in batches of 25.

:::note

If the process fails (eg due to network error, insufficient funds, etc), the next time you run the command, the tool will pick up where it left off.

:::
