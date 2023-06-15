---
slug: /guides/nft-intro
title: NFT Introduction
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## About This Document

Rather than simply copy what other blockchains had already done, we modeled our NFT standard after the traditional art world. Art is far from the only use case for Chia NFTs, but it was our starting point nonetheless.

This document will guide you through the process of creating DIDs that conform to [Chia's DID standard](https://github.com/Chia-Network/chips/pull/18), as well as minting NFTs that adhere to [Chia's NFT standard](https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0005.md). It will demonstrate this functionality using both the command-line and RPCs on Windows, MacOS and Linux. It will also show you how to verify that your NFTs are working as designed in Chia's reference wallet. We'll use the testnet for most of this guide, but we'll also give you some tips on deploying NFTs on Chia's mainnet.

For detailed instructions on running each of the commands from this tutorial, see:

- [DID CLI reference](/did-cli)
- [NFT CLI reference](/nft-cli)
- [DID RPC reference](/did-rpc)
- [NFT RPC reference](/nft-rpc)

For more documentation about Chia NFTs and DIDs, see:

- [Off-chain metadata format for NFT1](https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0007.md)
- [Explanation of NFT puzzles](https://chialisp.com/nfts)
- [Explanation of DID puzzles](https://chialisp.com/dids)

### Key features

Chia NFTs focus on three key features:

- Marketplace Independence -- you never are required to transfer your NFT to a marketplace in order to sell it. While marketplace custody is allowed, self custody has been standard with Chia NFTs from Day 1.
- Consistent Provenance -- DIDs enable the tracking of an NFT's complete history. You are highly encouraged to attach your DID to all of the NFTs you create. The DID will later be used to verify the NFTs' authenticity.
- Digital Permanence -- You can add a list of links to your NFTs' data, metadata, and license. Each link is verified with a hash, which is permanently embedded in the NFT itself. If one link changes or disappears, you can rely on another existing link, or create a new one. Even if all of the links disappear, as long as someone maintains a copy of the original file, the owner can always prepend a new link to the list.

### Collections

While some creators may wish to release their NFTs as individual pieces (so-called "1-of-1s"), most will want to create a _collection_. This is a generic term for a set of NFTs that are intentionally grouped together. For example, an artist could release several paintings of fruit as a collection called "Fruits of the World".

#### Series

"Series" describes a set of _distinct_ NFTs that belong together in a collection. Chia NFTs use two parameters in their _off-chain_ metadata related to series:

- `series_number` is the sequence number of this NFT in the collection. Following the Fruits of the World example, if the collection consists of ten images of distinct types of fruit, these could be labeled "Fruits of the World #1", "Fruits of the World #2", etc. Typically, NFT collections will list the series number in each NFT's title. However, this is not mandatory. It is also possible to include the series number in the off-chain metadata.
- `series_total` is the total number of NFTs in the series. Creators have the option to either specify the `series_total` upon the collection's initial minting, or to leave this parameter unspecified. In the latter case, potential buyers won't know the total number that will be minted, which could have a negative impact on the price of individual NFTs.

#### Edition

"Edition" means multiple NFTs with _identical_ data and metadata. In the NFT1 standard, the NFT's edition is part of the _on-chain_ metadata. This means that it is built into the NFT itself. There are two parameters related to edition:

- `edition_number` is the sequence number of this NFT's edition. For example, if the collection contains ten identical images of an apple, the NFTs could be labeled `Apple #1 of 10`, `Apple #2 of 10`, etc. The `edition_number` would then be `1`, `2`, etc. If each NFT in a collection is distinct, then the `edition_number` for each NFT is `1`. In this case, most NFT creators will choose not to specify this redundant `edition_number`.
- `edition_total` is the total number of identical NFTs that are part of this edition. If `edition_number` is specified for an NFT, then `edition_total` is also recommended to be specified. In the above example, each NFT that contains an identical apple image would have an `edition_total` of 10.

## CLVM Cost

:::info
As detailed in our [CLVM reference](https://chialisp.com/docs/clvm/lang_reference#evaluating-cost-for-a-typical-transaction), the CLVM cost for an XCH transaction with two inputs and two outputs is around 17 million.

The cost for minting and modifying NFTs is significantly higher. The following chart shows the approximate CLVM cost (rounded up to the nearest million), as well as the recommended minimum fee (at 5 mojos per cost), and the approximate cost in USD.

**Note that the minimum fees listed here will only apply when the mempool is full.**

If the mempool is not full, then a 1-mojo fee will be sufficient for any of these spends to be included in the next transaction block. To view the current status of the mempool, see the [Mempool Cost](https://dashboard.chia.net/d/46EAA05E/mempool-transactions-and-fees?orgId=1&viewPanel=40) table on our dashboard site. (If the green line representing the current mempool cost is close to the red line representing the maximum cost, then the mempool is full, and the following table should be used.)

| Operation                       | Cost (approx) | Min fee (mojos) | Cost in USD at $30/XCH |
| :------------------------------ | ------------: | :-------------- | :--------------------- |
| Minting NFT without DID         |    53 million | 265 million     | $0.00795               |
| Minting NFT with DID            |   123 million | 615 million     | $0.01845               |
| Adding a URI to NFT without DID |    41 million | 205 million     | $0.00615               |
| Transfer NFT with DID           |    67 million | 335 million     | $0.01005               |
| Assign DID to NFT               |   107 million | 535 million     | $0.01605               |
| Adding URI to NFT with DID      |    71 million | 355 million     | $0.01065               |

:::

<details>
  <summary>Note about Python <code>RuntimeError</code> on Windows</summary>

If you are running on Windows, you might occasionally see a Python Runtime Error. This is a [known issue in Python](https://github.com/aio-libs/aiohttp/issues/4324) and can be safely ignored. For example:

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

## Install Testnet

This section will show you how to install the latest version of Chia, configure your installation to run on the testnet, sync your node, and obtain some TXCH. If you have already done all of these things, you can skip to the next section, [Obtain images with corresponding hashes](#obtain-images-with-corresponding-hashes).

:::tip
Your firewall might give warnings when installing Chia. This is normal. Allow the installations to continue.
:::

You can either run on a full node or use the light wallet. You also have the option of installing from source or using a binary installer.

### Binary installer

If you choose to run a binary installer, download the latest version of Chia from the [Chia download page](https://www.chia.net/downloads).

After the installer has downloaded, execute it and Chia will install automatically.

:::info
If the `chia` command isn't already in your system's path, you can create an alias:

```mdx-code-block
<Tabs
  defaultValue="windows"
  values={[
    {label: 'Windows', value: 'windows'},
    {label: 'Linux/MacOS', value: 'nix'},
  ]}>
  <TabItem value="windows">
```

Be sure to replace `<username>` and `<version>` with the actual folder names.

```bash
Set-Alias -Name chia "C:\Users\<username>\AppData\Local\chia-blockchain\app-<version>\resources\app.asar.unpacked\daemon\chia.exe"
```

```mdx-code-block
  </TabItem>
  <TabItem value="nix">
```

```bash
alias chia="/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia"
```

```mdx-code-block
  </TabItem>
</Tabs>
```

:::

### Installing from source

To install Chia from source, follow our [installation wiki](https://github.com/Chia-Network/chia-blockchain/wiki/INSTALL), which includes instructions for installing on all supported operating systems.

### Switching to testnet

By default, Chia will run on mainnet. To switch to the testnet (recommended) for this guide, see [our wiki guide](https://github.com/Chia-Network/chia-blockchain/wiki/How-to-Connect-to-the-Testnet).

## Configuration

We recommend that you use `INFO` level logging instead of the default `WARNING` level. To do this, run:

```bash
chia configure --set-log-level INFO
```

We recommend that you use a key pair for testnet that is separate from your mainnet keys. If you don't have a separate set of testnet keys, generate them:

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
It is good security practice to use this set of keys for testnet development only. In case of key compromise, your TXCH and NFTs will be sandboxed from your XCH.
:::

If you generated new testnet keys in the last step, we recommend that you write down your seed phrase for later recovery. Run the following:

```bash
chia keys show --show-mnemonic-seed
```

You'll be shown your public and private keys. The last line of the output will be a list of 24 secret words. This is your _seed phrase_. **Carefully copy the words on paper and store them in a secure location.** Order is important.

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

Note: At this point we'll start the Chia light wallet, but not the full node. As noted above, the full node is not required for minting NFTs, but it will generally be faster than the light wallet.

Start your wallet by running:

```bash
chia start wallet
```

Wait for your wallet to sync. You can view the status of your wallet with the following command:

```bash
chia wallet show
```

Be sure to select the correct key/fingerprint, which you obtained from the `chia keys show` command:

```text
Wallet keys:
1)   285637561
2) * 3049838316 (Not Synced)
Choose a wallet key [1-2] ('q' to quit, or Enter to use 3049838316):
Wallet height: 938814
Sync status: Syncing...
```

Syncing should only require a few minutes, unless your wallet has a large number of previous transactions. Eventually, the `chia wallet show` command will show that your wallet has been synced. For example:

```text
Wallet height: 938990
Sync status: Synced
Balances, fingerprint: 3049838316

Chia Wallet:
   -Total Balance:         14.5 txch (14500000000000 mojo)
   -Pending Total Balance: 14.5 txch (14500000000000 mojo)
   -Spendable:             14.5 txch (14500000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

In order to continue, you'll need to have some TXCH in your wallet. If your total balance is 0, you can obtain 1 TXCH from our faucet. Copy the value of "First wallet address:" from the output of the `chia keys show` command. It will be a long string beginning with "txch".

Open our [testnet faucet page](https://testnet10-faucet.chia.net "Chia's testnet10 faucet link"). Paste your address and click "Submit".

You'll receive this message: `Accepted. Your request is in the queue and will be processed in the order it was received.` At some point you'll receive 1 TXCH. Depending on how busy the faucet and the testnet are, this could take several minutes. However, you don't need to wait for your coins to arrive before continuing.

(Optional) Start the full node:

```bash
chia start node
chia_full_node: started
```

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

Once you have a synced wallet and some TXCH, you may proceed to the next section. If your requested TXCH has not yet arrived, post your address on the #dev channel on Discord. Someone might be able to send some to you.

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

## Obtain images with corresponding hashes

For this guide, we'll obtain two images and hashes to be used for creating NFTs with the following use cases:

- CLI, with DID
- RPC, with DID

Here's the general technique to obtain images and hashes:

First, find an image to mint as an NFT. For this example, we'll use an image that is licensed in the public domain:
[https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg](https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg)

Then, calculate the image's hash. Here are three (of many) options:

- cURL with sha256sum. If you're on Windows, you'll need to run this command from Git Bash.

  ```bash
  curl -s https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg | sha256sum
  14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0 *-
  ```

- cURL with shasum. If you're on Windows, you'll need to run this command from Git Bash.

  ```bash
  curl -s https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg | shasum -a 256
  14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0 *-
  ```

- Save the image locally. Visit [https://emn178.github.io/online-tools/sha256_checksum.html](https://emn178.github.io/online-tools/sha256_checksum.html). Upload the image and click the Hash button.

In all three cases, the hash for this sample image is `14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0`.

The following is a list of the sample images and hashes this guide will use, along with the metadata and license information. Additionally, we'll use multiple copies of the Metadata URI with these NFTs.

### CLI, with DID

- URI: [https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg](https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg)
- Hash: 14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0
- Metadata URI 1: https://pastebin.com/raw/PnaQGQiH
- Metadata URI 2: https://pastebin.com/raw/KTwUQ8hM
- Metadata Hash: e9e9366f050e90ceb04a4778f2adfa02dfb565327d225eb35101f0de553ac20b
- License URI: https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE
- License Hash: 30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6

### RPC, with DID

- URI: [https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg](https://images.pexels.com/photos/1509582/pexels-photo-1509582.jpeg)
- Hash: 0ebedcd2cda065c75132218f745cecc3a1c131927f70b192b3fe6bbebaf437c4
- Metadata URI 1: https://pastebin.com/raw/BHZc1suk
- Metadata URI 2: https://pastebin.com/raw/bnzGwjmB
- Metadata Hash: 07cb3cc71732d1979abd357af86475e1e35f6c2b41ed2387b309e4b486a89a51
- License URI: https://raw.githubusercontent.com/Chia-Network/chia-blockchain/main/LICENSE
- License Hash: 30a358857da6b49f57cfe819c1ca43bfe007f528eb784df5da5cb64577e0ffc6

## Where to store images for NFTs

In theory you can use any hosting site to host your NFT images. However, do make sure that the service doesn't modify the image _at all_. Doing so will also change the hash and make it more likely to be lost long-term. The best way to verify this is to use each of the above techniques to generate the image hash, and make sure they all match.

Certain decentralized services such as IPFS can be slow. The first time a user attempts to view an NFT in their wallet (before caching), it might take a long time to load.

Chia NFTs use a list to store image URIs, so it is possible to add multiple locations to increase permanence. However, do make sure each image's hash is the same as the data hash.

## NFT Metadata Standards

Since the original release of this guide, a CHia Improvement Proposal ([CHIP](https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0001.md#what-is-a-chip 'CHIP explanation')) that standardizes the JSON metadata schema for Chia NFTs has been finalized.

See [CHIP-7](https://github.com/Chia-Network/chips/blob/main/assets/chip-0007/schema.json) for the correct formatting. Usage of this CHIP is recommended in order to give marketplaces the best opportunity to parse your NFTs' metadata properly.

Note that additional NFT metadata CHIPs are likely to be released in the future. However, there are no plans to deprecate CHIP-7 when this happens.
