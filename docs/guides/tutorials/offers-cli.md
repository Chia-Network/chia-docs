---
slug: /guides/offers-cli-tutorial
title: Offers - CLI
---

# Offers tutorial (CLI)

This tutorial covers Chia offers using the command line interface.

See also our [GUI tutorial](/reference-client/getting-started/wallet-guide) and our [reference document](https://chialisp.com/offers).

:::note
This tutorial occasionally references a token called "CAT King Cole" (CKC). This token is for demonstration purposes only.
:::

---

## Note about Windows

**Important** -- If you are running on Windows, many of the commands from this tutorial will result in an exception that is outside of Chia's control. You can safely ignore it.

```bash
Exception ignored in: <function _ProactorBasePipeTransport.__del__ at 0x000001EACD142CA0>
Traceback (most recent call last):
  File "C:\Users\User\AppData\Local\Programs\Python\Python38\lib\asyncio\proactor_events.py", line 116, in __del__
    self.close()
  File "C:\Users\User\AppData\Local\Programs\Python\Python38\lib\asyncio\proactor_events.py", line 108, in close
    self._loop.call_soon(self._call_connection_lost, None)
  File "C:\Users\User\AppData\Local\Programs\Python\Python38\lib\asyncio\base_events.py", line 719, in call_soon
    self._check_closed()
  File "C:\Users\User\AppData\Local\Programs\Python\Python38\lib\asyncio\base_events.py", line 508, in _check_closed
    raise RuntimeError('Event loop is closed')
RuntimeError: Event loop is closed
```

For more info, see [this issue on GitHub](https://github.com/aio-libs/aiohttp/issues/4324).

---

## CLI commands and reference

Chia's command line interface provides a set of commands to make, take, cancel, and list offers. To use offers on the command line, make sure you are using a virtual environment.

For more info, see our comprehensive Offers references:

- [CLI](/reference-client/cli-reference/offer-cli)
- [RPC](/reference-client/rpc-reference/offer-rpc)

---

## Create a single-token offer

In this example, we'll offer 0.1 XCH in exchange for 10 USDS.

A few assumptions:

- There is only one wallet fingerprint installed locally. (If you have more than one fingerprint, use the `-f` flag to specify which one to use.)
- Wallet ID 1 is a standard Chia wallet.
- Wallet ID 2 is a Stably USD wallet.
- We won't add a fee to the offer (if you want to add a fee, use the `-m` flag).

Three flags are required to create the offer file:

- `-o`: The Wallet ID and amount being offered.
- `-r`: The Wallet ID and amount being requested.
- `-p`: The name of the offer file to be created.

Here's the full command and result:

```bash
(venv) $ chia wallet make_offer -o 1:0.1 -r 2:10 -p ~/offers/0.1_xch_for_10_usds.offer
Creating Offer
--------------

OFFERING:
  - 0.1 XCH (100000000000 mojos)
REQUESTING:
  - 10 Stably USD (10000 mojos)
Confirm (y/n): y
Created offer with ID 62260d78a563620818a43c2cf837a8fca13a808f20ce62f4e42064f46f4c5a91
Use chia wallet get_offers --id 62260d78a563620818a43c2cf837a8fca13a808f20ce62f4e42064f46f4c5a91 -f 0123456789 to view status
```

After running and confirming this command, the offer file `~/offers/0.1_xch_for_10_usds.offer` will be created.

To view the status, run `chia wallet get_offers`, specifying your offer's ID and your wallet's fingerprint:

```bash
(venv) $ chia wallet get_offers --id 62260d78a563620818a43c2cf837a8fca13a808f20ce62f4e42064f46f4c5a91 -f 123456789

Record with id: 62260d78a563620818a43c2cf837a8fca13a808f20ce62f4e42064f46f4c5a91
---------------
Created at: 2021-12-27 08:05:07
Confirmed at: 0
Accepted at: N/A
Status: PENDING_ACCEPT
---------------
```

Congratulations! You have created an offer. A few things to note:

- Your wallet has reserved the coin(s) necessary to complete the offer.
- The blockchain has _not_ recorded this offer.
- You can distribute the offer file wherever you want.
- Anyone who sees the offer file can attempt to accept it.

---

## Accept a single-token offer

This example will use a different computer to accept the offer from the previous example. Keep in mind, offers are accepted on a first-come, first-served basis.

To display your wallet's balance before accepting the offer, run `chia wallet show`:

```bash
(venv) $ chia wallet show
Wallet height: 1335630
Sync status: Synced
Balances, fingerprint: 9876543210
Wallet ID 1 type STANDARD_WALLET Chia Wallet
   -Total Balance: 0.0 xch (0 mojo)
   -Pending Total Balance: 0.0 xch (0 mojo)
   -Spendable: 0.0 xch (0 mojo)
Wallet ID 2 type COLOURED_COIN Stably USD (Asset ID: 6d95dae356e32a71db5ddcb42224754a02524c615c5fc35f568c2af04774e589)
   -Total Balance: 10.0  (10000 mojo)
   -Pending Total Balance: 10.0  (10000 mojo)
   -Spendable: 10.0  (10000 mojo)
```

<br/>

To examine the offer, run `chia wallet take_offer` with the `-e` flag:

```bash
(venv) $ chia wallet take_offer -e ~/0.1_xch_for_10_usds.offer
Summary:
  OFFERED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
  REQUESTED:
    - Stably USD (Wallet ID: 2): 10 (10000 mojos)
Fees: 0
```

<br/>

To accept the offer, remove the `-e` flag:

```bash
(venv) $ chia wallet take_offer ~/0.1_xch_for_10_usds.offer
Summary:
  OFFERED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
  REQUESTED:
    - Stably USD (Wallet ID: 2): 10 (10000 mojos)
Fees: 0
Would you like to take this offer? (y/n): y
Accepted offer with ID d7b91ac37c41edfcf0009075b14d4665bfd1d1d2f1ee4087455147ca5134004c
Use chia wallet get_offers --id d7b91ac37c41edfcf0009075b14d4665bfd1d1d2f1ee4087455147ca5134004c -f 9876543210 to view its status
```

<br/>

The offer has been successfully accepted. To see the offer's status, run the `chia wallet get_offers` command:

```bash
(venv) $ chia wallet get_offers --id d7b91ac37c41edfcf0009075b14d4665bfd1d1d2f1ee4087455147ca5134004c -f 9876543210

Record with id: d7b91ac37c41edfcf0009075b14d4665bfd1d1d2f1ee4087455147ca5134004c
---------------
Created at: 2021-12-27 08:41:22
Confirmed at: 1335560
Accepted at: 2021-12-27 08:41:22
Status: CONFIRMED
---------------
```

<br/>

Your wallet will now show your updated balances:

```bash
(venv) $ chia wallet show
Wallet height: 1335630
Sync status: Synced
Balances, fingerprint: 9876543210
Wallet ID 1 type STANDARD_WALLET Chia Wallet
   -Total Balance: 0.100000000000 xch (100000000000 mojo)
   -Pending Total Balance: 0.100000000000 xch (100000000000 mojo)
   -Spendable: 0.100000000000 xch (100000000000 mojo)
Wallet ID 2 type COLOURED_COIN Stably USD (Asset ID: 6d95dae356e32a71db5ddcb42224754a02524c615c5fc35f568c2af04774e589)
   -Total Balance: 0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable: 0.0  (0 mojo)
```

---

## Cancel an offer

You can cancel any offer you created, as long as it has not been accepted already.

Start by listing all of your current offers:

```bash
(venv) $ chia wallet get_offers

Record with id: 47fa10e11c743b03bb1d182a6f915de1e563f40c5e6adf24698cbeb7732baa5f
---------------
Created at: 2021-12-27 09:24:30
Confirmed at: 0
Accepted at: N/A
Status: PENDING_ACCEPT
---------------
```

<br/>

Cancel an offer with a Status of PENDING_ACCEPT:

```bash
(venv) $ chia wallet cancel_offer -id 47fa10e11c743b03bb1d182a6f915de1e563f40c5e6adf24698cbeb7732baa5f

Record with id: 47fa10e11c743b03bb1d182a6f915de1e563f40c5e6adf24698cbeb7732baa5f
---------------
Created at: 2021-12-27 09:24:30
Confirmed at: 0
Accepted at: N/A
Status: PENDING_ACCEPT
Summary:
  OFFERED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
  REQUESTED:
    - Stably USD (Wallet ID: 2): 10 (10000 mojos)
Pending Balances:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
Fees: 0
---------------
Are you sure you wish to cancel offer with ID: 47fa10e11c743b03bb1d182a6f915de1e563f40c5e6adf24698cbeb7732baa5f? (y/n): y
Cancelled offer with ID 47fa10e11c743b03bb1d182a6f915de1e563f40c5e6adf24698cbeb7732baa5f
Use chia wallet get_offers --id 47fa10e11c743b03bb1d182a6f915de1e563f40c5e6adf24698cbeb7732baa5f -f 123456789 to view cancel status
```

<br/>

To view the status of the cancellation, run `chia wallet get_offers`, specifying your offer's ID and your wallet's fingerprint:

```bash
(venv) $ chia wallet get_offers --id 47fa10e11c743b03bb1d182a6f915de1e563f40c5e6adf24698cbeb7732baa5f -f 123456789

Record with id: 47fa10e11c743b03bb1d182a6f915de1e563f40c5e6adf24698cbeb7732baa5f
---------------
Created at: 2021-12-27 09:24:30
Confirmed at: 0
Accepted at: N/A
Status: CANCELLED
---------------
```

<br/>

Note that this command canceled the offer on the blockchain by spending the coins you had offered, and creating new coins of the same type and value. This process did not involve taking the other end of the offer, so you did not receive any funds of the type you had requested. The end result is that your wallet's balance is the same as it was before you made the offer (minus any transaction fees).

The advantage of canceling in this manner is that it ensures that nobody can accept your offer in the future. The disadvantages are that you will need to wait a few minutes for your transaction to be processed, and that you may have to pay a transaction fee. This is the default option, and the option that you should use if you have copied your offer file to another computer or website.

If you have not sent the offer file elsewhere, you can cancel the offer by running the same command with the `--insecure` flag, which will un-reserve the coins for your offer. However, nothing will be recorded on the blockchain. If you have copied your offer file elsewhere, someone could still accept it. The advantages of this option are that it will cancel your offer instantly, and there's no need to include a fee.

---

## Create a multiple-token offer

To create an offer with multiple tokens, simply add `-o` (offer) and `-r` (request) flags to the `make_offer` command as needed. For example:

```bash
(venv) $ chia wallet make_offer -o 2:10 -o 3:10000 -r 1:0.1 -r 4:9000 -p ~/offers/10usds_10kckc_for_100bmojos_9ksbx.offer
Creating Offer
--------------

OFFERING:
  - 10 Stably USD (10000 mojos)
  - 10000 CAT King Cole (10000000 mojos)
REQUESTING:
  - 0.1 XCH (100000000000 mojos)
  - 9000 Spacebucks (9000000 mojos)
Confirm (y/n): y
Created offer with ID 9f624c95b81ed3428f74cbe2e400d0d8cccbfe6169fe8e58422af8a86e0a6388
Use chia wallet get_offers --id 9f624c95b81ed3428f74cbe2e400d0d8cccbfe6169fe8e58422af8a86e0a6388 -f 123456789 to view status
```

<br/>

To view the offer with a summary of the tokens being offered, use the `-s` flag:

```bash
(venv) $ chia wallet get_offers --id 9f624c95b81ed3428f74cbe2e400d0d8cccbfe6169fe8e58422af8a86e0a6388 -f 123456789 -s

Record with id: 9f624c95b81ed3428f74cbe2e400d0d8cccbfe6169fe8e58422af8a86e0a6388
---------------
Created at: 2021-12-27 10:22:07
Confirmed at: 0
Accepted at: N/A
Status: PENDING_ACCEPT
Summary:
  OFFERED:
    - Stably USD (Wallet ID: 2): 10 (10000 mojos)
    - CAT King Cole (Wallet ID: 3): 10000 (10000000 mojos)
  REQUESTED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
    - Spacebucks (Wallet ID: 4): 9000 (9000000 mojos)
Pending Balances:
    - Stably USD (Wallet ID: 2): 10 (10000 mojos)
    - CAT King Cole (Wallet ID: 3): 10000 (10000000 mojos)
Fees: 0
---------------
```

---

## Accept a multiple-token offer

The process to accept a multiple-token offer is the same as that of a single-token offer:

```bash
(venv) $ chia wallet take_offer ~/offers/10usds_10kckc_for_100bmojos_9ksbx.offer
Summary:
  OFFERED:
    - Stably USD (Wallet ID: 3): 10 (10000 mojos)
    - CAT King Cole (Wallet ID: 4): 10000 (10000000 mojos)
  REQUESTED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
    - Spacebucks (Wallet ID: 2): 9000 (9000000 mojos)
Fees: 0
Would you like to take this offer? (y/n): y
Accepted offer with ID 5eb909c87df9ddf598906d95183141029c947c045aa369beee9ab699f08a9be1
Use chia wallet get_offers --id 5eb909c87df9ddf598906d95183141029c947c045aa369beee9ab699f08a9be1 -f 9876543210 to view its status
```

<br/>

The offer has been successfully accepted. To see the offer's status, run the `chia wallet get_offers` command:

```bash
(venv) $ chia wallet get_offers --id 5eb909c87df9ddf598906d95183141029c947c045aa369beee9ab699f08a9be1 -f 9876543210

Record with id: 5eb909c87df9ddf598906d95183141029c947c045aa369beee9ab699f08a9be1
---------------
Created at: 2021-12-27 10:35:32
Confirmed at: 1335930
Accepted at: 2021-12-27 10:35:32
Status: CONFIRMED
---------------
```

<br/>

Your wallet will now show your updated balances:

```bash
(venv) $ chia wallet show
Wallet height: 1335942
Sync status: Synced
Balances, fingerprint: 9876543210
Wallet ID 1 type STANDARD_WALLET Chia Wallet
   -Total Balance: 0.0 xch (0 mojo)
   -Pending Total Balance: 0.0 xch (0 mojo)
   -Spendable: 0.0 xch (0 mojo)
Wallet ID 2 type COLOURED_COIN Spacebucks (Asset ID: 78ad32a8c9ea70f27d73e9306fc467bab2a6b15b30289791e37ab6e8612212b1)
   -Total Balance: 0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable: 0.0  (0 mojo)
Wallet ID 3 type COLOURED_COIN Stably USD (Asset ID: 6d95dae356e32a71db5ddcb42224754a02524c615c5fc35f568c2af04774e589)
   -Total Balance: 10.0  (10000 mojo)
   -Pending Total Balance: 10.0  (10000 mojo)
   -Spendable: 10.0  (10000 mojo)
Wallet ID 4 type COLOURED_COIN CAT King Cole (Asset ID: 1121996b75cce3c746369aced2c8887b02b84e95592c3dc006d82a145adf349a)
   -Total Balance: 10000.0  (10000 mojo)
   -Pending Total Balance: 10000.0  (10000 mojo)
   -Spendable: 10000.0  (10000 mojo)
```

---

## Create an expiring Offer (RPC)

In this example, we will offer 0.1 CATs (`TAIL/Asset ID: 91aa...004r`) in exchange for 1 TXCH (`Wallet ID: 1`). In addition, we will add an expiry timestamp so that this Offer will expire on Jan. 1, 2024. This is accomplished with the `max_time` flag:

```bash
chia rpc wallet create_offer_for_ids '{"offer":{"1":1000000000000,"91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d":-100},"fee":10000000,"driver_dict":{},"validate_only":false, "max_time": 1704070800}'
```

Response:

```bash
{
    "offer": "offer1qqr83wcuu2rykcmqvpsxvgqqemhmlaekcenaz02ma6hs5w600dhjlvfjn477nkwz369h88kll73h37fefnwk3qqnz8s0lle0xp70k7vrwmdq0sfnsf7jns276kh4lah7ark8fkc5kmjeav0nkkmyms8jvjqcrgd9jd46wvwh568qn8qlklu95fmvv060rwr0h4c8r55hwwal5y32l7mnr09ckf2gqqtv3a67c0rra0fyx8y6tlt8e2qk6t0m6s0hl0hd0n9kflhnm2lah9ryzn49yre20axxr3ue2a7neg06mvh7zte0uk9jmzekjndhl5v330qtd2f00q0zeeadv2tcljxmdhjxtdh68tdh68tdk68tp57nmrdkmm5dw7srzlhqhn8h04883476dz7x6mny6jzdcga33n4s8n884cxcekcemz6mk3jk4v925m8z9f8s877t4tn3kdx07q7h6w8t0r0krkc5m8j2m0xu9v3q6es4x0uy92c2us9xuwp0cgp3h0rpwdkcn37486waykwls2k94hn7zlllxl5lkeytd9wv2yxurz5x56r4h9sxq6mac5ea7e5k66wa2xcj0an6kqq4eyqpvpellpl7dayem3phq8yrrl4lspgr8urleflu9zs6ypnxm0e77awkul4mh05cu4qwekejhwru43ztcv7wj4yan0lur7dvkyp4ualchadvjdeluy6kpqevlehlqtxcld0mp2dqctl4l5u065h2utealkaxme27yv5knkhxxgrc7fd57trg0mq0alcz7yu76yexf3mfear3424luwmt87cjqkuw9jmjn26h7xz96yrlyufp6rxfyhl3w8rv2remjywkvwewme3paxt2v8yxhhmd6fdhnuwhnslq7957ye20uafl79echvvpkt2w86e06d985ravvym8huef3hvlkmk0enw4fu44ad3ltshuwqrjlu5cdphlpw3pdpy6led8dt7qwyl90s4ffl0vewuhdjwj70al622xtlc54m4d6n7nsxmpz647l405p2qpq7ec6x9np3m4n8e0h74ua3328nznycrm7j3uu300e0adn8m4hulnuu27jpduqfyctxs2pcyckg307epnev6xa4f7hkx20mlk4ellnlhlqs4kreh2rzju0w6rs5ma60mlxs6v8thtv9tl3lynp7m7nxr0eg5nuhkfaxclysmrf35dmrzgq4stk5nvem5aajer9n07m0rjv3z4l38trd0lgdthakh2setfl3d8kmuw933khanfem0hk66l97a7htg6a9vdegaxjgvl65d8j5es3tq4jtscqkwrgm789ux074amv0r3lqdwcv8t72et85hddwm7mkas2hh6464rx60yk6llk79v6v06rcx9gmljh7zkr335dq89q9flazmz67dwctlv4n8npld5lw3s8wkhj7v57h67rj0nsvw8tn3hesq24vhahlsda2ldk847g8caa0h95wfmtwt4lvm96edwklv0uf9m78svj4dz6mgaqv82a2fl8hn8u7f484yy9uzpe67jnmfea7d6ytj08da0jkkz96t2fv4fdc9ht06ulzf86g43y0pdj7nw3dlcjfwl37550wn5vda70zavknx4h5xxnfhjpy9slrkwcpvxt7704adwslkh8lfp76at40dd0ny6zg4dgjwlkrcphtgy7lsx3jccq",
    "success": true,
    "trade_record": {
        "accepted_at_time": null,
        "coins_of_interest": [
            {
                "amount": 1000000000,
                "parent_coin_info": "0x3b5d9e333b75c20829f4acf07b122fbbb02df7bbeb033de5dee67df9ac201e24",
                "puzzle_hash": "0x7059f91bb16c1f24ee9677e2aa3bf454efc66316e69682db4f00004b707c63be"
            },
            {
                "amount": 97119866323,
                "parent_coin_info": "0x0894a86fc98304960b258e2e68e5eebdafe9efff903a13037b5c22e3bb5513b2",
                "puzzle_hash": "0xdfcfc555683e8ae18a579fc9e1b62c37b26c73c7790948a9f0815c557e985920"
            }
        ],
        "confirmed_at_index": 0,
        "created_at_time": 1695625850,
        "is_my_offer": true,
        "pending": {
            "91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d": 1000000000,
            "unknown": 97119866323
        },
        "sent": 0,
        "sent_to": [],
        "status": "PENDING_ACCEPT",
        "summary": {
            "fees": 10000000,
            "infos": {
                "91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d": {
                    "tail": "0x91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d",
                    "type": "CAT"
                }
            },
            "offered": {
                "91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d": 100
            },
            "requested": {
                "xch": 1000000000000
            }
        },
        "taken_offer": null,
        "trade_id": "0x0561bd8ab330bdc1c12231c6ddd75c4cda2d6e1ae5188274b228a77ff35efb35",
        "valid_times": {
            "max_blocks_after_created": null,
            "max_height": null,
            "max_secs_after_created": null,
            "max_time": 1704070800,
            "min_blocks_since_created": null,
            "min_height": null,
            "min_secs_since_created": null,
            "min_time": null
        }
    }
}
```

---

## Potential issues

This section will detail a non-comprehensive list of issues you might encounter while making or taking offers.

## Contents:

- [Maker doesn't have enough money](#maker-doesnt-have-enough-money)
- [Taker doesn't have enough money](#taker-doesnt-have-enough-money)
- [Taker accepts an unknown CAT offer](#taker-accepts-an-unknown-cat-offer)
- [Taker attempts to accept an invalid offer](#taker-attempts-to-accept-an-invalid-offer)
- [Maker cancels an offer locally, Taker accepts the offer](#maker-cancels-an-offer-locally-taker-accepts-the-offer)
- [Whole coins must be reserved](#whole-coins-must-be-reserved)
- [Offer involving a CAT1 is invalid](#offer-involving-a-cat1-is-invalid)

---

### Maker doesn't have enough money

Let's say a Maker has wallets for XCH and CKC, with no money in either of them.

```bash
(venv) $ chia wallet show
Wallet height: 1344432
Sync status: Synced
Balances, fingerprint: 1234567890
Wallet ID 1 type STANDARD_WALLET Chia Wallet
   -Total Balance: 0.0 xch (0 mojo)
   -Pending Total Balance: 0.0 xch (0 mojo)
   -Spendable: 0.0 xch (0 mojo)
Wallet ID 2 type COLOURED_COIN CAT King Cole (Asset ID: 1121996b75cce3c746369aced2c8887b02b84e95592c3dc006d82a145adf349a)
   -Total Balance: 0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable: 0.0  (0 mojo)
```

<br/>

The maker attempts to make an ambitious offer: 100 XCH for 1 million CKC. However, the Maker does not have enough money to create this offer. As a result, an Exception is thrown:

```bash
(venv) $ chia wallet make_offer -o 2:1000000 -r 1:100 -p ~/offers/100xch_for_1mckc.offer
Creating Offer
--------------

OFFERING:
  - 1000000 CAT King Cole (1000000000 mojos)
REQUESTING:
  - 100 XCH (100000000000000 mojos)
Confirm (y/n): y
Exception from 'wallet' {'error': 'Error creating offer: insufficient funds in wallet 2', 'success': False}
```

---

### Taker doesn't have enough money

Let's say the Taker has a brand new wallet:

```bash
(venv) $ chia wallet show
Wallet height: 1336730
Sync status: Synced
Balances, fingerprint: 1234567890
Wallet ID 1 type STANDARD_WALLET Chia Wallet
   -Total Balance: 0.0 xch (0 mojo)
   -Pending Total Balance: 0.0 xch (0 mojo)
   -Spendable: 0.0 xch (0 mojo)
```

<br/>

And there's an outstanding offer requesting 0.1 XCH for 10,000 CKC:

```bash
(venv) $ chia wallet take_offer -e ~/offers/10kckc_for_0.1xch.offer
Summary:
  OFFERED:
    - CAT King Cole (Wallet ID: None): 10000 (10000000 mojos)
  REQUESTED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
Fees: 0
```

<br/>

If the Taker attempts to accept the offer, an Exception will be thrown:

```bash
(venv) $ chia wallet take_offer ~/offers/10kckc_for_0.1xch.offer
Summary:
  OFFERED:
    - CAT King Cole (Wallet ID: None): 10000 (10000000 mojos)
  REQUESTED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
Fees: 0
Would you like to take this offer? (y/n): y
Exception from 'wallet' {'error': 'insufficient funds in wallet 1', 'success': False}
```

---

### Taker accepts an unknown CAT offer

You should be extra careful before accepting offers for unknown CATs. This is because the offer _might_ be a scam where a different -- and worthless -- token is actually being offered.

Here's how the scam would work:

Let's say a potential Taker has 0.1 XCH in their wallet.

```bash
(venv) $ chia wallet show
Wallet height: 1336860
Sync status: Synced
Balances, fingerprint: 1234567890
Wallet ID 1 type STANDARD_WALLET Chia Wallet
   -Total Balance: 0.1 xch (100000000000 mojo)
   -Pending Total Balance: 0.1 xch (100000000000 mojo)
   -Spendable: 0.1 xch (100000000000 mojo)
```

<br/>

There is an offer of 0.25 Shibe (an unknown CAT) in exchange for 0.1 XCH. Here's the offer from the Taker's perspective:

```bash
(venv) $ chia wallet take_offer -e ~/offers/0.25_Shibe_for_0.1_XCH.offer
Summary:
  OFFERED:
    - a2cadb541cb01c67c3bcddc73ecf33c8ffa37b0d013688904b2747cede020477 (Wallet ID: Unknown): 0.25 (250 mojos)
  REQUESTED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
```

<br/>

The Taker decides to accept the offer and it is confirmed successfully:

```bash
(venv) $ chia wallet take_offer ~/offers/0.25_Shibe_for_0.1_XCH.offer
Summary:
  OFFERED:
    - a2cadb541cb01c67c3bcddc73ecf33c8ffa37b0d013688904b2747cede020477 (Wallet ID: Unknown): 0.25 (250 mojos)
  REQUESTED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
Fees: 0
Would you like to take this offer? (y/n): y
Accepted offer with ID 4ac6a35e5fecb50d85604b19250a942afdc81876fe11db1f9d970c95dcf2c43f
Use chia wallet get_offers --id 4ac6a35e5fecb50d85604b19250a942afdc81876fe11db1f9d970c95dcf2c43f -f 1234567890 to view its status
```

<br/>

Notice that the offer file was named `0.25_Shibe_for_0.1_XCH.offer`, but the file name itself does _not_ dictate the contents of the offer. The Taker may have inadvertently accepted an offer for a worthless token!

Luckily, it is easy to avoid this scam by cross-referencing the unknown CAT's ID before accepting the offer. In this case, the Taker should verify from a trusted source that `4ac6a35e5fecb50d85604b19250a942afdc81876fe11db1f9d970c95dcf2c43f` indeed corresponds to Shibe.

Chia does install a list of known CATs by default, so this scam should be rare, but you should always be diligent in scrutinizing offers for unknown CATs.

---

### Taker attempts to accept an invalid offer

If the Maker has canceled the offer on the blockchain, or a Taker has already taken the offer, it is no longer valid.

Any potential Takers will receive an Exception upon attempting to take the offer. For example:

```bash
(venv) $ chia wallet take_offer ~/offers/0.1_xch_for_10_usds.offer
Summary:
  OFFERED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
  REQUESTED:
    - Stably USD (Wallet ID: 2): 10 (10000 mojos)
Fees: 0
Would you like to take this offer? (y/n): y
Exception from 'wallet' {'error': 'This offer is no longer valid', 'success': False}
```

---

### Maker cancels an offer locally, Taker accepts the offer

This example will demonstrate that if you need to cancel an offer, you should always do so on-chain unless you are certain the offer file has not left your computer.

Let's say a Maker has 0.1 XCH and 1 USDS:

```bash
(venv) $ chia wallet show
Wallet height: 1344792
Sync status: Synced
Balances, fingerprint: 9876543210
Wallet ID 1 type STANDARD_WALLET Chia Wallet
   -Total Balance: 0.1 xch (100000000000 mojo)
   -Pending Total Balance: 0.1 xch (100000000000 mojo)
   -Spendable: 0.1 xch (100000000000 mojo)
Wallet ID 2 type COLOURED_COIN Stably USD (Asset ID: 6d95dae356e32a71db5ddcb42224754a02524c615c5fc35f568c2af04774e589)
   -Total Balance: 1.0  (1000 mojo)
   -Pending Total Balance: 1.0  (1000 mojo)
   -Spendable: 1.0  (1000 mojo)
```

<br/>

The Maker offers 0.1 XCH in exchange for 10 USDS:

```bash
(venv) $ chia wallet make_offer -o 1:0.1 -r 2:10 -p ~/offers/0.1xch_for_10usds.offer
Creating Offer
--------------

OFFERING:
  - 0.1 XCH (100000000000 mojos)
REQUESTING:
  - 10 Stably USD (10000 mojos)
Confirm (y/n): y
Created offer with ID af98fd1f63a8351829d2d2fd34c2e880021e154b9a3d23f215385c1b72831b69
Use chia wallet get_offers --id af98fd1f63a8351829d2d2fd34c2e880021e154b9a3d23f215385c1b72831b69 -f 9876543210 to view status
```

<br/>

The Maker then decides to cancel the offer, but not on-chain (using the `--insecure` flag):

```bash
(venv) $ chia wallet cancel_offer -id af98fd1f63a8351829d2d2fd34c2e880021e154b9a3d23f215385c1b72831b69 --insecure

Record with id: af98fd1f63a8351829d2d2fd34c2e880021e154b9a3d23f215385c1b72831b69
---------------
Created at: 2021-12-29 10:03:10
Confirmed at: 0
Accepted at: N/A
Status: PENDING_ACCEPT
Summary:
  OFFERED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
  REQUESTED:
    - Stably USD (Wallet ID: 2): 10 (10000 mojos)
Pending Balances:
    - XCH (Wallet ID: 1): 0.0 (0 mojos)
    - Stably USD (Wallet ID: 2): 11 (11000 mojos)
Fees: 0
---------------
Are you sure you wish to cancel offer with ID: af98fd1f63a8351829d2d2fd34c2e880021e154b9a3d23f215385c1b72831b69? (y/n): y
Cancelled offer with ID af98fd1f63a8351829d2d2fd34c2e880021e154b9a3d23f215385c1b72831b69
```

<br/>

The Maker verifies that the offer has indeed been canceled:

```bash
(venv) $ chia wallet get_offers -id af98fd1f63a8351829d2d2fd34c2e880021e154b9a3d23f215385c1b72831b69

Record with id: af98fd1f63a8351829d2d2fd34c2e880021e154b9a3d23f215385c1b72831b69
---------------
Created at: 2021-12-29 10:03:10
Confirmed at: 0
Accepted at: N/A
Status: CANCELLED
---------------
```

<br/>

After the offer has been canceled, a Taker notices the offer file and decides to accept it:

```bash
(venv) $ chia wallet take_offer ~/offers/0.1xch_for_10usds.offer
Summary:
  OFFERED:
    - XCH (Wallet ID: 1): 0.1 (100000000000 mojos)
  REQUESTED:
    - Stably USD (Wallet ID: 2): 10 (10000 mojos)
Fees: 0
Would you like to take this offer? (y/n): y
Accepted offer with ID 8592e2f96b13cf7eee0e1c5bdbf1ef523ee25e6aaf64214c80b9a6ddda17e4da
Use chia wallet get_offers --id 8592e2f96b13cf7eee0e1c5bdbf1ef523ee25e6aaf64214c80b9a6ddda17e4da -f 2987410941 to view its status
```

<br/>

Later, the Maker notices that the offer has gone through, despite having been canceled:

```bash
(venv) $ chia wallet show
Wallet height: 1344854
Sync status: Synced
Balances, fingerprint: 9876543210
Wallet ID 1 type STANDARD_WALLET Chia Wallet
   -Total Balance: 0.0 xch (0 mojo)
   -Pending Total Balance: 0.0 xch (0 mojo)
   -Spendable: 0.0 xch (0 mojo)
Wallet ID 4 type COLOURED_COIN Stably USD (Asset ID: 6d95dae356e32a71db5ddcb42224754a02524c615c5fc35f568c2af04774e589)
   -Total Balance: 11.0  (11000 mojo)
   -Pending Total Balance: 11.0  (11000 mojo)
   -Spendable: 11.0  (11000 mojo)
```

<br/>

If the offer had been canceled on-chain, the reserved coins would have been spent. At that point, even if someone else had gotten access to the offer file, the offer itself would've been invalid.

The lesson here is do _not_ use the --insecure flag unless you're certain the offer file has never left your computer.

---

### Whole coins must be reserved

Under the coin set model, coins can be of any value. When an offer is created, the Maker's wallet must reserve enough coins to meet the requirements of the offer.

The coin set model [has many advantages](/chia-blockchain/coin-set-model/intro) over the account model, but it can create some situations that take time to understand.

For example, let's say a Maker has 1 XCH and 0 USDS:

```bash
(venv) $ chia wallet show
Wallet height: 1345098
Sync status: Synced
Balances, fingerprint: 9876543210
Wallet ID 1 type STANDARD_WALLET Chia Wallet
   -Total Balance: 1.0 xch (1000000000000 mojo)
   -Pending Total Balance: 1.0 xch (1000000000000 mojo)
   -Spendable: 1.0 xch (1000000000000 mojo)
Wallet ID 2 type COLOURED_COIN Stably USD (Asset ID: 6d95dae356e32a71db5ddcb42224754a02524c615c5fc35f568c2af04774e589)
   -Total Balance: 0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable: 0.0  (0 mojo)
```

<br/>

The Maker received the XCH in one lump sum, so there is a single coin worth 1 XCH in the Maker's wallet.

The Maker creates an offer of 0.1 XCH for 10 USDS:

```bash
(venv) $ chia wallet make_offer -o 1:0.1 -r 2:10 -p ~/offers/0.1xch_for_10usds.offer
Creating Offer
--------------

OFFERING:
  - 0.1 XCH (100000000000 mojos)
REQUESTING:
  - 10 Stably USD (10000 mojos)
Confirm (y/n): y
Created offer with ID 5708209d4502049b556d3e00782e36259651eb4fdc0da94f177916bca8e83c1b
Use chia wallet get_offers --id 5708209d4502049b556d3e00782e36259651eb4fdc0da94f177916bca8e83c1b -f 125588179 to view status
```

<br/>

While the offer is pending, the Maker attempts to send 0.1 XCH to another address:

```bash
(venv) $ chia wallet send -i 1 -a 0.1 -t <another wallet address>
Submitting transaction...
Exception from 'wallet' {'error': "Can't send more than 0 in a single transaction", 'success': False}
```

<br/>

This should be possible -- the Maker has 0.9 XCH, even after taking the offer into account. The reason for the Exception is because the Maker only has a single coin worth 1 XCH, and that coin has already been reserved for the offer.

It's similar to using a $10 bill to buy something for $1. Before you receive your change, you can't buy anything else. On the other hand, if you had started with two $5 bills and bought the same $1 item, you could've purchased something else while waiting for your change.

The Maker can work around this issue by breaking the single large coin into multiple small ones. One simple way to do this would be to send money to him/herself:

```bash
(venv) $ chia wallet send -i 1 -a 0.1 -t <Maker's wallet address>
```

<br/>

The Maker's wallet looks the same as before:

```bash
(venv) $ chia wallet show
Wallet height: 1345200
Sync status: Synced
Balances, fingerprint: 9876543210
Wallet ID 1 type STANDARD_WALLET Chia Wallet
   -Total Balance: 1.0 xch (1000000000000 mojo)
   -Pending Total Balance: 1.0 xch (1000000000000 mojo)
   -Spendable: 1.0 xch (1000000000000 mojo)
Wallet ID 2 type COLOURED_COIN Stably USD (Asset ID: 6d95dae356e32a71db5ddcb42224754a02524c615c5fc35f568c2af04774e589)
   -Total Balance: 0.0  (0 mojo)
   -Pending Total Balance: 0.0  (0 mojo)
   -Spendable: 0.0  (0 mojo)
```

<br/>

Even though the Maker's balance hasn't changed, there are now two coins that sum to 1 XCH. The maker can now recreate the old offer:

```bash
(venv) $ chia wallet make_offer -o 1:0.1 -r 2:10 -p ~/offers/0.1xch_for_10usds.offer
Creating Offer
--------------

OFFERING:
  - 0.1 XCH (100000000000 mojos)
REQUESTING:
  - 10 Stably USD (10000 mojos)
Confirm (y/n): y
Created offer with ID 7344ac4ee584725552d3f5a0c713aba2c4eeb1619525753b835c568e89de1274
Use chia wallet get_offers --id 7344ac4ee584725552d3f5a0c713aba2c4eeb1619525753b835c568e89de1274 -f 125588179 to view status
```

<br/>

This time if the Maker attempts to send 0.1 XCH to the same wallet as before, the transaction will succeed:

```bash
(venv) $ chia wallet send -i 1 -a 0.1 -t <another wallet address>
Submitting transaction...
Transaction submitted to nodes:
```

<br/>

One of the Maker's coins has been reserved for the offer, and the other has been sent to another wallet. The Maker can further break apart the large coin as needed.

---

### Offer involving a CAT1 is invalid

The CAT1 Standard reached its end of life (EOL) with block 2,311,760 in July 2022. Any offers that include a CAT1 on either side of the trade will result in an invalid offer error.

---

## Further reading

- [Offers blog entry](https://www.chia.net/2022/01/12/chia-offers-are-here-en.html)
- [Offers reference](https://chialisp.com/offers)
- [GUI tutorial](/reference-client/getting-started/wallet-guide)
- [Info on the coin set model](/chia-blockchain/coin-set-model/intro)
