---
slug: /guides/crash-course/cats-offers-nfts
title: CATs, Offers and NFTs
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

For this lesson you will want Chia installed and synced on testnet.

## What is a CAT?

Put simply, a CAT (Chia asset token) is a token built on top of the Chia blockchain. This will allow you to create a cryptocurrency on the Chia blockchain with its own set of issuance rules.

Token issuance is controlled by a CAT's TAIL (Token Asset and Issuance Limitations). The TAIL is a Chialisp program describing the rules for creation and destruction of a CAT.

For example, the TAIL may limit the creation to **single-issuance**. Any tokens created using this specific TAIL program will only be issued once during creation. When spent, any new coins created will share the same TAIL.

## CAT Creation Tool and Setup

Up next we will clone the CAT creation tool which will simplify creating a cat by providing all of the necessary TAIL Chialisp files.

```mdx-code-block
<Tabs groupId="OS"
defaultValue="windows"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux/MacOS', value: 'linux-macos'},
]}>
  <TabItem value="windows">
```

```bash
git clone https://github.com/Chia-Network/CAT-admin-tool.git
cd CAT-admin-tool
py -m venv venv
./venv/Scripts/activate
py -m pip install --upgrade pip setuptools wheel
pip install .
```

```mdx-code-block
</TabItem>
<TabItem value="linux-macos">
```

```bash
git clone https://github.com/Chia-Network/CAT-admin-tool.git
cd CAT-admin-tool
python3 -m venv venv
. ./venv/bin/activate
python -m pip install --upgrade pip setuptools wheel
pip install .
```

```mdx-code-block
</TabItem>
</Tabs>
```

At this point you should be able to execute `cats --help`.

We will also need Chia Dev Tools:

```
pip install chia-dev-tools
```

Now, you can issue `cdv`:

```
cdv --help
```

We will also want to be sure to use the correct version of Chia Blockchain. At the time of this writing, we will need to use Chia blockchain 1.5.0.

```
pip install chia-blockchain==1.5.0
```

Verify your node is synced:

```bash
chia show -s
```

And you can confirm you have TXCH (or XCH on mainnet) with:

```bash
chia wallet show
```

### Creating a Single-Issuance CAT

We will only be worrying about creating a single-issuance CAT in this lesson. If you want more experience, you can move on to create a multiple-issuance CAT.

:::info
Multiple-issuance CATs allow you to create more of the token at a later time. This is in contrast to a single-issuance CAT which can only be issued once.
:::

**For every 1 CAT created you will need to spend 1,000 Mojo**. This means spending 0.1 Chia (100,000,000,000 Mojo) will produce a CAT with a max supply of 100 million.

```bash
cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to <your receive address> --amount <XCH mojos> -m <fee in XCH mojos> --as-bytes --select-coin
```

For the fee we recommend 100 million Mojo (`-m 100000000`).

:::note
You can retrieve one of your wallet addresses with:

```
chia wallet get_address
```

:::

The final line of the output will be `Name: <Coin ID>`. You'll use the coin ID value in the next step.

Run the same command again, this time removing the `--select-coin` flag and adding a new flag, `--curry <Coin ID>`. It's very important to preface the coin ID with 0x here to make CLVM interpret the value as bytes and not a string. Here's the full command to run:

```bash
cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to <your receive address> --amount <XCH mojos> -m <fee in XCH mojos> --as-bytes --curry 0x<Coin ID>
```

This command will give the following output:

The transaction has been created, would you like to push it to the network? (Y/N)

Enter `Y`.

The output will be `Asset ID: <Asset ID>`. Copy the asset ID to import the CAT in to the client.

This token can be displayed in your wallet using the GUI or with the CLI:

```bash
chia wallet add_token -id <Asset ID> -n <custom coin name> -f <fingerprint>
```

Creating a CAT on mainnet works the exact same way, you'll just be spending real XCH instead of TXCH!

<details>
<summary>Example</summary>
Here are the exact commands I issued to create a custom CAT.

```bash
cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to txch14t42glxxe93hy29nevq56j4mdupfgazkmkgxzt38p5achh3vmu0qwsqdnt --amount 100000000000 -m 100000000 --as-bytes --select-coin
```

Response:

```json
{
    "amount": 999889999998,
    "parent_coin_info": "0x4d847cddc91a294b82f01c17e09bfdffb1ddadf0e41b6765a127ef1312b6ebf1",
    "puzzle_hash": "0xaaeaa47cc6c9637228b3cb014d4abb6f02947456dd90612e270d3b8bde2cdf1e"
}
Name: fa514c961ad13b154708da36750f28f905b45e0e5dd53e856b49e55886a18a20

```

```bash
cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to txch14t42glxxe93hy29nevq56j4mdupfgazkmkgxzt38p5achh3vmu0qwsqdnt --amount 100000000000 -m 100000000 --as-bytes --curry 0xfa514c961ad13b154708da36750f28f905b45e0e5dd53e856b49e55886a18a20
```

Response:

```
The transaction has been created, would you like to push it to the network? (Y/N)

Successfully pushed the transaction to the network
Asset ID: 2b29eb7875ac24f4da73e55ea45c5f94471ab677de608bce6a5ddd1817724844
Eve Coin ID: a16bcc6fbc1a21c6855f3e6f24bb9e16959932e79bd29662ab08690f50e723bf
```

I then added this token to the wallet:

```bash
chia wallet add_token -id 2b29eb7875ac24f4da73e55ea45c5f94471ab677de608bce6a5ddd1817724844 -n ccoin
```

Response:

```
Successfully added ccoin with wallet id 2 on key 1660000549
```

I could then check my balance:

```bash
chia wallet show
```

Response:

```
...
ccoin:
   -Total Balance:         100000000.0  (100000000000 mojo)
   -Pending Total Balance: 100000000.0  (100000000000 mojo)
   -Spendable:             100000000.0  (100000000000 mojo)
   -Type:                  CAT
   -Asset ID:              2b29eb7875ac24f4da73e55ea45c5f94471ab677de608bce6a5ddd1817724844
   -Wallet ID:             2

...
```

</details>

<details>
<summary>Exercise</summary>

Use the above examples to create your very first CAT, we will use this CAT in the next section to trade for other assets.

If you are looking for more practice, you can create a multiple-issuance CAT.

</details>

## Offers

With an offer you can trade assets with others directly in a decentralized manner. For example, we can put an offer up for someone to trade their Chia for your new token. Anyone could then accept this offer.

For this command you will need your wallet IDs, which you can get from `chia wallet show`.

To create an offer to sell 1,000 of your new CAT for some Chia, issue the `make_offer` command:

```bash
chia wallet make_offer -o <wallet_id:amount> -r <wallet_id:amount> <path>
```

Where `wallet_id:amount` could look like `1:1000`.

<details>
<summary>Example</summary>

This is the command I issued to create an offer to trade 1,000 of my custom CAT for .01 Chia.

```bash
chia wallet make_offer -o 2:1000 -r 1:.01 -p ~/Desktop/offer1
```

Response:

```
Creating Offer
--------------

OFFERING:

- 1000 ccoin (1000000 mojos)
  REQUESTING:
- .01 XCH (10000000000 mojos)
  Confirm (y/n): y
  Created offer with ID b6e2bf3162837a17a40369cb98bd3b8bfbc68fd58c922b3bfedd593f29f260dd
  Use chia wallet get_offers --id b6e2bf3162837a17a40369cb98bd3b8bfbc68fd58c922b3bfedd593f29f260dd -f 1660000549 to view status
```

```bash
chia wallet get_offers --id b6e2bf3162837a17a40369cb98bd3b8bfbc68fd58c922b3bfedd593f29f260dd -f 1660000549
```

Response:

```

Record with id: b6e2bf3162837a17a40369cb98bd3b8bfbc68fd58c922b3bfedd593f29f260dd
---------------
Created at: 2022-09-01 11:30:49
Confirmed at: Not confirmed
Accepted at: N/A
Status: PENDING_ACCEPT
---------------
```

</details>

This creates a file on your computer and nothing is sent to the blockchain. Because of this, it is not a transaction and no fees are required. This file can be shared or uploaded to the web and anyone can use it to finalize the trade.

<details>
<summary>What is in an Offer File?</summary>

It'll look something like:

```
offer1qqz83wcsltt6wcmqvpsxygqqwc7hynr6hum6e0mnf72sn7uvvkpt68eyumkhelprk0adeg42nlelk2mpafs8tkhg2qa9qmzp08ydjpg006k9ju0r3x57a2gt5x9u7j0fn7gllxjau2udha0mvnqkm6uqf23vazn6cua3vt4mzmhwjahp50v807ma2fxwhd2kn2njcmytt2emzsln0u44xz8hzvrtqd2t9vz0alaa9m992xy5k9fhkjepaur0hlm088p2vandlnm747hmyl9dxafx44c83lfa0llef54rulm04tg0t7lmxth646y0289h36rexueuq4lq8c68mj37cpfujfr9k8ar4k8ar4k8dr4k8d84sx0fu3jmra6xkl2qptmstehm8cnmc6mdxn0rvdejdfpway2ccm6srenn6urvdmgvand96gat25z4tf4dlxa2yayde2t4h320uwtvf3z0wxta54n797slkhzka3wsnufzputks4vptnqsme69v3sgxdevw7mv507rlpluh89uy54njg6kfl8slkr383kw49j5ka73rre7dnut0v9v6xn9366zu7uaq0fz3yng7rsfcgrzqsgxx3qf5e0lzugx4c0adln8wuhcfavpmjzs5pcm0ya8xkzpcthp90t0n5fgtan0x4hjl28ecrh035ju0h90mp5xctxklh0j4m53hm6qq593ehls26aklf0mn7lvehj5xm26nywsvn389h87h2n2t36dhu68drpg0fp8e4z5q40klut3cvdu7a2vug0mnvwdh5g78wfu2kck6n8hq5vk08llzck4t46e0mtks2gtflmlc8pwcvle0wjpfra4cmd7t2lvncnnvadx68ean9axykk7dj8ypau2a08ll7p9ttuk6swrhx2u5jcljd9r4lt7ul9x9yjkzae8yn42nu66wl0a8wf0qaepevya6nc8ls0rmwhedawwerv0ja00un2md43mfs39dfqx4ucpfrn0p288p0eytsa3x6qa59tdnlc9sndx2u8t3qcjeh8vw6sv88hf7l8m0peahx24h5944y3dk247utstljgvf0lw67mslv0dcvzsdqk95vv02yetz7h06dmnj3ehayrtekh4kwnla285hg9avj0xq70lfndalp345pmt0wd446wtu7j3klxlzhhxgu8xuhc07tykcsjmlunqvt9jejg4903wwa9v39fxpkp0za4hg48t7jg7pjv8t0lhlkxr26hx4a5mk8hjqqr8hvtgyf3fnt4
```

</details>

If this is your first transaction using your new CAT, it'll lock up the entire coin. This is how the UTXO model works. Everything is defined as a coin, so coins can be combined and split in to new coins to reach exact values. For example, when sending someone 1.5XCH, you may actually send 2.0XCH, which will send a new coin worth 1.5XCH to the destination and a new coin of 0.5XCH back to an address you own as **change**.

When you create your CAT, it exists as a single coin for the entire CAT balance. By creating an offer you lock up that coin resulting in a reduced spendable balance. You can see this with `chia wallet show`.

```
ccoin:
   -Total Balance:         100000000.0  (100000000000 mojo)
   -Pending Total Balance: 100000000.0  (100000000000 mojo)
   -Spendable:             0.0  (0 mojo)
   -Type:                  CAT
   -Asset ID:              2b29eb7875ac24f4da73e55ea45c5f94471ab677de608bce6a5ddd1817724844
   -Wallet ID:             2

```

If someone accepts the offer and the transaction is completed, you will receive the difference as change.

### Completing Offers

The first step to getting your offer accepted is to broadcast it in some way.

This file can be uploaded anywhere, but there are many websites out there dedicated to Chia offers. Offer sites include [Offerbin](https://offerbin.io/) and [offerpool](https://offerpool.io/).

You can accept an offer that has been downloaded to your personal machine with the `take_offer` command.

```bash
chia wallet take_offer path
```

Alternatively, you can accept an offer without any download by copying and pasting the contents of the file.

```bash
chia wallet take_offer blob
```

<details>
<summary>Example</summary>

You can accept an offer by using the content of the offer file.

```bash
chia wallet take_offer offer1qqz83wcsltt6wcmqvpsxygqqwc7hynr6hum6e0mnf72sn7uvvkpt68eyumkhelprk0adeg42nlelk2mpafs8tkhg2qa9qmzp08ydjpg006k9ju0r3x57a2gt5x9u7j0fn7gllxjau2udha0mvnqkm6uqf23vazn6cua3vt4mzmhwjahp50v807ma2fxwhd2kn2njcmytt2emzsln0u44xz8hzvrtqd2t9vz0alaa9m992xy5k9fhkjepaur0hlm088p2vandlnm747hmyl9dxafx44c83lfa0llef54rulm04tg0t7lmxth646y0289h36rexueuq4lq8c68mj37cpfujfr9k8ar4k8ar4k8dr4k8d84sx0fu3jmra6xkl2qptmstehm8cnmc6mdxn0rvdejdfpway2ccm6srenn6urvdmgvand96gat25z4tf4dlxa2yayde2t4h320uwtvf3z0wxta54n797slkhzka3wsnufzputks4vptnqsme69v3sgxdevw7mv507rlpluh89uy54njg6kfl8slkr383kw49j5ka73rre7dnut0v9v6xn9366zu7uaq0fz3yng7rsfcgrzqsgxx3qf5e0lzugx4c0adln8wuhcfavpmjzs5pcm0ya8xkzpcthp90t0n5fgtan0x4hjl28ecrh035ju0h90mp5xctxklh0j4m53hm6qq593ehls26aklf0mn7lvehj5xm26nywsvn389h87h2n2t36dhu68drpg0fp8e4z5q40klut3cvdu7a2vug0mnvwdh5g78wfu2kck6n8hq5vk08llzck4t46e0mtks2gtflmlc8pwcvle0wjpfra4cmd7t2lvncnnvadx68ean9axykk7dj8ypau2a08ll7p9ttuk6swrhx2u5jcljd9r4lt7ul9x9yjkzae8yn42nu66wl0a8wf0qaepevya6nc8ls0rmwhedawwerv0ja00un2md43mfs39dfqx4ucpfrn0p288p0eytsa3x6qa59tdnlc9sndx2u8t3qcjeh8vw6sv88hf7l8m0peahx24h5944y3dk247utstljgvf0lw67mslv0dcvzsdqk95vv02yetz7h06dmnj3ehayrtekh4kwnla285hg9avj0xq70lfndalp345pmt0wd446wtu7j3klxlzhhxgu8xuhc07tykcsjmlunqvt9jejg4903wwa9v39fxpkp0za4hg48t7jg7pjv8t0lhlkxr26hx4a5mk8hjqqr8hvtgyf3fnt4
```

Response:

```
Summary:
  OFFERED:
    - ccoin (Wallet ID: 2): 1000.0 (1000000 mojos)
  REQUESTED:
    - XCH (Wallet ID: 1): 0.01 (10000000000 mojos)

Included Fees: 0

Would you like to take this offer? (y/n): y
Accepted offer with ID 41f5bfab75ff5f35489b0954597aa76c56ed7098aa9ad137f0132b584541119f
Use chia wallet get_offers --id 41f5bfab75ff5f35489b0954597aa76c56ed7098aa9ad137f0132b584541119f -f 1660000549 to view its status

```

You'll notice there is a line for `Included Fees`, which is currently 0. As the blockchain becomes more saturated, a fee may need to be applied by either the maker or taker with an additional CLI flag.
Let's continue by getting the offer's information.

```bash
chia wallet get_offers --id 41f5bfab75ff5f35489b0954597aa76c56ed7098aa9ad137f0132b584541119f -f 1660000549
```

Response:

```
Record with id: 41f5bfab75ff5f35489b0954597aa76c56ed7098aa9ad137f0132b584541119f
---------------
Created at: 2022-09-01 13:40:07
Confirmed at: 1466993
Accepted at: 2022-09-01 13:40:07
Status: CONFIRMED
---------------

```

</details>

<details>
<summary>Exercise</summary>
To get some practice, create an offer to trade your CAT for some Chia or another CAT. You can share this file with others, or you can accept it yourself to see how the process works.

If you are looking for more practice, you can work with offers on mainnet to trade real assets.

</details>

## Getting Started with NFTs

NFTs can be defined individually or within a collection. For simplicity, we will create an individual NFT that is not part of a collection. Once you know how to do this, creating a collection will be a lot easier. The main goal of this lesson is to help you become familiar with the basics. Then, you can continue to study on your own.

```bash
chia wallet nft create
```

This will give a response like:

```
Successfully created an NFT wallet with id 3 on key 1660000549
```

This will create your NFT wallet. You can see this with:

```bash
chia wallet show
```

```
NFT Wallet:
   -Total Balance:         0.0
   -Pending Total Balance: 0.0
   -Spendable:             0.0
   -Type:                  NFT
   -Wallet ID:             3

```

Take a note of the Wallet ID, which will be used in the next section.

### Getting an Image and Hash

To practice, start with royalty free images found online at places like [pexels.com](https://pexels.com).

Once you find your image of choice, you'll need to get the hash of this image. There are many ways to do this. One way is through the CLI:

```bash
curl -s <image URL> | shasum -a 256
```

This will return something like `14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0`.

You can check the hash also by uploading the image to an [online sha256 tool](https://md5file.com/calculator).

### Mint an NFT

Once you have the image URL and the hash, we can create the NFT with a command like this:

```bash
chia wallet nft mint -i <wallet_id> -u <url> -nh <image hash> -m <fee>
```

This will include the wallet ID, URL, data hash, and a fee.
If this command is issued successfully, you will have created an NFT on Chia!

You can get the details of your new NFT with:

```bash
chia wallet nft list -i <wallet ID>
```

<details>
<summary>Concrete Example</summary>

First, we will [find an image](https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg). We can grab the URL and check the hash:

```bash
curl -s https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg | shasum -a 256
```

Response:

```
14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0 -
```

Feeding the URL and hash in to the following command, we end up with:

```bash
 chia wallet nft mint -i 3 -u https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg -nh 14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0 -m 0.000265

```

This gives us back the spend bundle with any new coin info:

Response:

```
NFT minted Successfully with spend bundle: {
	'aggregated_signature': '0x8673a394dca82d91cd1ddeff0b518cb02056fa24ce45b8cda4e7819258c9cc13a68ed71d4d25ef7254358af2f033d99b180b2b0255a8f113d699517e7019b825b09f68eb126da228f82b474f316bc8a657310a527ff54a4668971e9486c39c89',
	'coin_solutions': [{
		'coin': {
			'amount': 1,
			'parent_coin_info': '0x75690e6a336be6223d3282d71085af366a1c94e9418c25ca9f5fba9d29e09a8d',
			'puzzle_hash': '0xd41dce69252d14db9a19eb0fcbd0e014d416245460b76a9fe4e7a8030e1bb4c6'
		},
		'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa075690e6a336be6223d3282d71085af366a1c94e9418c25ca9f5fba9d29e09a8da0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780ffff68a014836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0ffff826d7580ffff826c7580ffff82736e01ffff8273740180ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff0180ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa075690e6a336be6223d3282d71085af366a1c94e9418c25ca9f5fba9d29e09a8da0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0c05f74b4f7e8b79dbb23118d7bcdebcadbaddac46824acebe455481c3ec850daffff04ffff0180ff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0815cec38feefbc2669d2eab272deb4badc17bc42a0f1cecbf1f5cf8c0219d9b7cdad195b9588291642db49da17b99b6eff018080ff018080808080ff018080808080ff01808080',
		'solution': '0xffffa02f1c4f4568c420033fb690c134ed3ed3d8d9fa3bdb75f1044d51789b59ea3a1dff0180ff01ffffffff80ffff01ffff81f6ff80ff80ff8080ffff33ffa0e68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6ff01ffffa0e68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6ffa0e68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6808080ff8080808080'
	}, {
		'coin': {
			'amount': 9734999999,
			'parent_coin_info': '0x265cee97bfc72cc1c41692c9462d098009f5bcade81202cfbacf717a988b8667',
			'puzzle_hash': '0x7b0628c573b77df18bf858b6111be39e25e040f4fdb74c74702dfd94b1bd7fbb'
		},
		'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0aa1fdb303fb4e59c8082380e3462a0a4ff3f66ccfb5c40b33b6a13706206b1796f2a32c035a452a26d9926fccb0e3246ff018080',
		'solution': '0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa0e520db6f3cab1c1a26f84f6bb19f44c103a3609a2b552ed1e2647dbf600fd160ff85023474bb7e80ffff34ff840fcb944080ffff3cffa0a8520fb03d767496573596438ba3e9414cc845b1d2ab26c159ab64be397dd7ba80ffff3dffa05751070a5bfeabb3f71640bacfa81ea2275c36a25a60bb4381ef598cb56bca578080ff8080'
	}, {
		'coin': {
			'amount': 1,
			'parent_coin_info': '0x2f1c4f4568c420033fb690c134ed3ed3d8d9fa3bdb75f1044d51789b59ea3a1d',
			'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
		},
		'puzzle_reveal': '0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080',
		'solution': '0xffa0d41dce69252d14db9a19eb0fcbd0e014d416245460b76a9fe4e7a8030e1bb4c6ff01ff8080'
	}]
}
```

We can now see information about this new NFT by checking against our wallet:

```bash
chia wallet nft list -i 3
```

Response:

```
NFT identifier:            nft1w45su63nd0nzy0fjstt3ppd0xe4pe98fgxxztj5lt7af620qn2xss66c5t
Launcher coin ID:          75690e6a336be6223d3282d71085af366a1c94e9418c25ca9f5fba9d29e09a8d
Launcher puzhash:          eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9
Current NFT coin ID:       f8c136c24c380e401c445ae05528927f9540a4961bf8b2bf50cc1c9852ab5c08
On-chain data/info:        ((117 "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg") (104 . 0x14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0) (28021) (27765) (29550 . 1) (29556 . 1))
Owner DID:                 None
Royalty percentage:        0
Royalty puzhash:           c05f74b4f7e8b79dbb23118d7bcdebcadbaddac46824acebe455481c3ec850da
NFT content hash:          14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0
Metadata hash:
License hash:
NFT edition total:         1
Current NFT number in the edition: 1
Metadata updater puzhash:  fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b
NFT minting block height:  1487957
Inner puzzle supports DID: True
NFT is pending for a transaction: False

URIs:
   https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg

Metadata URIs:

License URIs:

```

</details>

After issuing the `chia wallet nft list` command, you'll notice many properties that are blank. For example, there is a section for `Owner DID`, `Metadata URIs`, `Metadata hash`, `License URIs`, `Royalty percentage`, among others. This shows some of the other possible values provided when minting an NFT or an NFT collection.

<details>
<summary>More NFT Practice</summary>

DIDs are decentralized identifiers that can own any NFT. Read more about [DIDs in CHIP-0004](https://github.com/Chia-Network/chips/blob/did1/CHIPs/chip-0004.md#motivation).

If you want more practice, learn to [create a DID and transfer your NFT to it](/guides/nft-cli#set-the-did-for-an-nft).

Additionally, you can study more on decentralized file storage for NFT image hosting.

</details>

## Offers with NFTs

Now that you have a top tier NFT, you can create an offer file including this asset.

First, we will find the ID for the NFT we want to include in an offer.

```bash
chia wallet nft list -i <wallet ID>
```

As a reminder, you can figure out the wallet ID with `chia wallet show`.

The NFT identifier will look something like `nft1w45su63nd0nzy0fjstt3ppd0xe4pe98fgxxztj5lt7af620qn2xss66c5t`.

When formatting your chia offer, you will use this for the `-o` option.

```bash
chia wallet make_offer -o <nft id>:1 -r <wallet id>:<amount> -p <path>
```

<details>
<summary>Example</summary>

We can offer an NFT for .01 Chia with a command like this:

```bash
chia wallet make_offer -o nft1w45su63nd0nzy0fjstt3ppd0xe4pe98fgxxztj5lt7af620qn2xss66c5t:1 -r 1:.01 -p ~/Desktop/offer2
```

Response:

```
Creating Offer
--------------

OFFERING:
  - 1 nft1w45su63nd0nzy0fjstt3ppd0xe4pe98fgxxztj5lt7af620qn2xss66c5t (1 mojos)
REQUESTING:
  - .01 XCH (10000000000 mojos)
Offers for NFTs will have royalties automatically added.  Are you sure you would like to continue? (y/n): y
Confirm (y/n): y
Created offer with ID a5d3039b3ff2d91cfecd858708f53abdfddab4560b79422a1681c6ae11408d87
Use chia wallet get_offers --id a5d3039b3ff2d91cfecd858708f53abdfddab4560b79422a1681c6ae11408d87 -f 1660000549 to view status

```

```bash
chia wallet get_offers --id a5d3039b3ff2d91cfecd858708f53abdfddab4560b79422a1681c6ae11408d87 -f 1660000549
```

Response:

```

Record with id: a5d3039b3ff2d91cfecd858708f53abdfddab4560b79422a1681c6ae11408d87
---------------
Created at: 2022-09-07 10:07:08
Confirmed at: Not confirmed
Accepted at: N/A
Status: PENDING_ACCEPT
---------------
```

</details>

### Accepting NFT Offers

Let's practice by accepting our own offer. Accepting an NFT offer works the same as any other offer. You can open the file to get the hex content.

```bash
chia wallet take_offer <blob>
```

:::info
If you are working with others, you can exchange these offer files (or the hex blob) with each other to buy/sell NFTs.
:::

<details>
<summary>Example</summary>

```bash
chia wallet take_offer offer1qqph3wlykhv8jcmqvpsxygqqwc7hynr6hum6e0mnf72sn7uvvkpt68eyumkhelprk0adeg42nlelk2mpafsyjlm5pqpj3dhq5d7ewswwa68td36nxv6jvvm8n7vrk4d6dm2ewleh56kn54h7m05p9v9eh9sw6twfnhnawlzjnyevlmwphk0yjy2vn5fh9tscd40ryttnels5735nn8lmwv59wqlkzgzzyhypmk6vj49tut4m7w5w5jmswkv7jwgen0dhlwgla2yaclpguauj4et8gg6a0csz4mksdmqj9xe6mhfr2a75nkshm3favu4lx2ed4emhvujkh3zxdqkr9sjtkrgnzx8yzf4hgrrxwsxxd6ydc9qd9a5zlf25ds0maa08cu80xsnahf3mf8hthruufl5g7vyfzkmm480uvf9uml8lpd9r87dj3jee72werg6469mgt4hevffnukjk8rl248ulrwlxdglf34dmur7cw539e7qggqmfmlegm4sutf0xwe2ht366577aj29uhlykns7k3wcjdg2h9cf38tey8xcyxqa0yvmugalvqzt7cypdl70pvhlzzjlvrsx0dl0kd4sv56m8j4wt2txevnws7qlltrnvnpmqlx30flcpj7xf9y5zvg4hmlwvmnz0f4rzhkpdfzk5n33tme8utn7c9r8ujt7xyl2rgvp4xccrwv3hmzy59ev9s9ex42t4tyy6p66rwcupfpehdkuj8e57mwxkytslt5urm4vaegmag3356d5adelwkhdnfdas8vqaplh2ysf6vaxu27dqje7hzzdvqewlpt7tmd8hm5drtxl0d370e5x64wnaatx2umttza8mqwt0h4e8ne49a0w4sj5g6yqja9yyxqavqdf6cpzuq00lgurm3zydylaqcuzpe2l2826l2kh9l3fqrk38ul7p38e5aflj9kltvjzhlnw8c29gmphdx0t4xkyrykpesmtvxxsa9qdp62q6asp5t59c5f057ckps8ufytwltakflw6mtxct07hvadfm047782f2rvhx7kf4qrcehvfsrdmqtx9prcnydsvkhkpwmszph0rpc728nfame5t9uwlnu8tjnt2ahffe97a8pfwfn0fpev6yeke36mr8l9jj36xm45qnlxfw8y7hdal8nm7a8fvfnkyqft7jw8r8lutaclrutum0m3lv04avl4j7t95dzw0dvfvxpytcm6su797h26205e0fe5pmkrp53qp8vv9swyrx9sqxkqtpqxjzs3jqgcrhsjsy4y8pcsv00hl7l7p2jsw6089mw0d4x56x4wh9kkj2dshtn45nfh7km0wzv9k88tljgdpncrewhwhmkxlh2rf5ynjqfxrleadkxdtp7xevmlmh4n285c05yysw6mh7tjt5f8ga3ah3m7llcmmnsl74humt2993zpq7t740kyjeltt6xdfewd2gx08muauteyl4xv8x7hwsegat7xl3atr84afn57wn0n8fgua64lhvv3gzqr72c7kg2k9k8m

```

</details>

## Conclusion

Most of what happened in this lesson is possible thanks to foundational pieces (we call them primitives) built on the Chia blockchain. If you want to build something completely custom, you can do that with the Chialisp language. With Chialisp, you can define rules for locking up and spending coins. This is what we will be talking about next!
