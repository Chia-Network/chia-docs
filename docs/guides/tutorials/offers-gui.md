---
slug: /guides/offers-gui-tutorial
title: Offers - GUI
---

# Offers tutorial (GUI)

This tutorial demonstrates using Chia Offers with the reference wallet GUI.

See also our [command line tutorial](/guides/offers-cli-tutorial) and our Offers standard [reference](https://chialisp.com/offers).

Chia Asset Tokens (CATs) are fungible assets on Chia's blockchain. In Chia parlance, "CAT" and "token" are often used interchangeably. Each CAT must come with its own Token and Asset Issuance Limiter (TAIL), a program that dictates how the CAT may be issued. For more information, see our [CAT standard](https://chialisp.com/cats) documentation.

---

## Add a new CAT

1. If you would like to acquire a CAT from an Offer, your wallet will need to recognize the CAT first. Click `MANAGE TOKEN LIST` in the lower-left corner of the reference wallet GUI:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/01_offers.png" alt="manage token list"/>
  </div>
  <br/>

2. The Chia reference wallet comes with a few included CATs, but most will need to be entered manually. If you want to add one of the included CATs, click the slider next to the CAT you would like to add. 
Otherwise, click the `+` button:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/02_offers.png" alt="add token"/>
  </div>
  <br/>

3. If your new CAT is not included in the reference wallet, you will need to obtain its Asset ID (TAIL). There are multiple websites that provide a listing of CATs and their IDs. One such site is [spacescan.io](https://www.spacescan.io). Simply browse to the website, then search for your CAT. For example, here is a search for "dexie bucks":

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/spacescan_1.png" alt="search for dexie bucks"/>
  </div>
  <br/>

  In addition to CATs, Spacescan provides a listing of NFTs. In certain cases, such as with Dexie Bucks, there are CAT _and_ NFT collections with the same name. In this case, be sure to click on `CAT2`, as in the above image.

  The result will show you the details of the CAT you selected, including its ID. Copy this ID by clicking the icon as shown here:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/spacescan_2.png" alt="copy dexie bucks ID"/>
  </div>
  <br/>

  It is recommended that you check with another source of truth to make sure you have the correct ID. Another website that provides a listing of CATs and their IDs is [taildatabse.com](https://www.taildatabase.com/). Browse to this site, click the `Explore` menu, and search for your CAT. The name should appear in the search results:
 
  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/taildatabase_1.png" alt="taildatabase dexie bucks search"/>
  </div>
  <br/>

  Some information about the CAT will appear, including its Asset ID, as highlighted here:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/taildatabase_2.png" alt="taildatabase dexie bucks asset ID"/>
  </div>
  <br/>

  Copy this ID and continue to the next step.

  :::warning

  If someone sends you an Asset ID (TAIL), do not assume it is correct. Instead, double-check with [spacescan.io](https://www.spacescan.io) or [taildatabse.com](https://www.taildatabase.com/) (or preferably both) to verify that you have the correct ID.

  :::

3. Enter the name and asset ID for your new CAT, then click `ADD`:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/03_offers.png" alt="One Meeellion CATs"/>
  </div>
  <br/>

Your new CAT will now appear in the "Tokens" list in your wallet.

## Create an XCH-CAT offer

For our first example Offer, we will offer 1 XCH in exchange for the new CAT.

1. Click the `Offers` icon, then click `CREATE AN OFFER` to get started:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/04_offers.png" alt="create an offer"/>
  </div>
  <br/>

2. Next, fill in the details of the Offer. By default, the Offer will be set to expire after 7 days. This is likely fine in most cases. (If an Offer never expires, there is a chance it will be taken as arbitrage long after the maker has forgotten about it.) However, feel free to enter a different expiration time if desired.

  In this example, we will offer 1 XCH for 1000 tokens, and include a small blockchain fee, which will only be applied when the Offer is taken.

  After all of the details have been filled in, click `CREATE OFFER`:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/05_offers.png" alt="fill in offer details"/>
  </div>
  <br/>

3. If anyone acquires this Offer and it is still valid, they will be able to take it. Click the `I UNDERSTAND` button and the Offer will be created:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/06_offers.png" alt="confirm offer"/>
  </div>
  <br/>

3. At this point, the Offer has been created locally. However, until you share it, it is unlikely that anyone will know it exists. Feel free to email the Offer file, share it on social media, etc. The Offer file does not contain any sensitive data. Whoever sees it will only have two options: take it or ignore it.

  You can also use the panel that appears to share your Offer in a few default locations:
    * Dexie -- a bulletin board that acts as a Decentralized EXchange (DEX)
    * Hashgreen -- another DEX, as well as an Automated Market Maker (AMM)
    * Offerpool -- a bulletin board for sharing offers
    * Spacescan -- an explorer and bulletin board
    * Finally, you can save the file to your local computer and share it however you want <br/><br/>

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/07_offers.png" alt="distribute offer"/>
  </div>
  <br/>

4. The Offer will now appear as `Pending Accept`, and the amount of time (if any) until it expires will also be shown:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/08_offers.png" alt="offer pending status"/>
  </div>
  <br/>

Congratulations! You have created an Offer. A few things to note:

- Your wallet has reserved the coin(s) necessary to complete the Offer.
- The blockchain has not recorded this Offer.
- You can distribute the Offer file wherever you want.
- Anyone who sees the Offer file can attempt to accept it.

---

## Accept an offer

This example will use a different computer to accept the Offer that was created in the previous example. Keep in mind, offers are accepted on a first-come, first-served basis.

1. Prior to accepting the Offer, this wallet has 1,000,000 CATs:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/09_offers.png" alt="One Meeellion CATs"/>
  </div>
  <br/>

2. Click `Offers`, then view the Offer by either loading, dragging/dropping, or pasting the file:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/10_offers.png" alt="view offer"/>
  </div>
  <br/>

3. In this case, the Offer will expire in 6 days. The Taker must give 1000 CATs in exchange for 1 TXCH. The Maker has included a blockchain fee, and the Taker has the option of adding to this fee if desired. If the terms are acceptable, click `ACCEPT OFFER`:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/11_offers.png" alt="accept offer"/>
  </div>
  <br/>

4. You will need to confirm that you actually want to accept the Offer, which will initiate an on-chain transaction:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/12_offers.png" alt="verify acceptance of offer"/>
  </div>
  <br/>

5. The Offer has been accepted. Click `OK`:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/13_offers.png" alt="offer accepted"/>
  </div>
  <br/>

6. While the blockchain transaction is pending, you will see this status in the `Offers you accepted` panel:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/14_offers.png" alt="offer pending confirm"/>
  </div>
  <br/>

7. Meanwhile, the `Tokens` screen will show the pending XCH and CAT amounts:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/15_offers.png" alt="1 XCH incoming"/>
  </div>
  <br/>

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/16_offers.png" alt="1000 CATs outgoing"/>
  </div>
  <br/>

8. After the transaction has been confirmed (typically 1-3 minutes), the Offer's status will be updated to `Confirmed`:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/17_offers.png" alt="plus 1 XCH"/>
  </div>
  <br/>

9. The final XCH and CAT balances will then be reflected in the `Tokens` screen:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/18_offers.png" alt="minus 1000 CATs"/>
  </div>
  <br/>

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/19_offers.png" alt="offer pending status"/>
  </div>
  <br/>

---

## Cancel an offer

You can cancel any Offer you created, as long as it has not already been accepted.

1. In the "Offers" dialog, locate the Offer you want to cancel. It must be in the "Pending Accept" state.

  Click the three dots in the "Actions" column:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/20_offers.png" alt="Pending Accept"/>
  </div>
  <br/>

2.  Click "Cancel Offer".

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/21_offers.png" alt="Cancel Offer"/>
  </div>
  <br/>

3.  The "Cancel Offer" dialog will appear. The default option is to cancel on the blockchain, as shown in the red circle in the image below.

  This option will use your wallet to spend the coin(s) you had offered, and create new coins of the same type and value. This process does not involve taking the other end of the Offer, so you will not receive any funds of the type you had requested. The end result is that your wallet's balance will be the same as it was before you made the Offer (minus any transaction fees).

  The advantage of canceling in this manner is that it ensures that nobody can accept your Offer in the future. The disadvantages are that you will need to wait a few minutes for your transaction to be processed, and that you may have to pay a transaction fee.

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/22_offers.png" alt="Cancel on blockchain"/>
  </div>
  <br/>

4.  If you uncheck the checkbox, your wallet will un-reserve the coins for your Offer. However, nothing will be recorded on the blockchain. If you have copied your Offer file elsewhere, someone could still accept it.

  The advantages of this option are that it will cancel your Offer instantly, and there's no need to include a fee.

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/23_offers.png" alt="Cancel off chain"/>
  </div>
  <br/>

5.  If you left the checkbox checked in the previous step, your Offer will enter the "Pending Cancel" state while the cancellation is being recorded on the blockchain. This could take several minutes.

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/24_offers.png" alt="Pending Cancel"/>
  </div>
  <br/>

6.  When your order has been successfully canceled, it will enter the "Cancelled" state. Your funds are now available in your wallet.

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/25_offers.png" alt="Cancelled"/>
  </div>
  <br/>

---

## NFT Offers

You can also create Offers to buy or sell NFTs. While it is possible to select NFTs from the `Offers` dialog, this example will demonstrate how to do so directly from the `NFTs` dialog.

1. Enter the `NFTs` dialog and select the NFT(s) to offer. If you would like to offer more than one NFT, click the checkbox (as shown below) to enter multi-select mode. To offer all of your NFTs, click `SELECT ALL`:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/26_offers.png" alt="Cancelled"/>
  </div>
  <br/>

2. In this case, both of the NFTs are selected. Next, click `ACTIONS` and `Create Offer`:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/27_offers.png" alt="Cancelled"/>
  </div>
  <br/>

3. The `Offer Maker` dialog will appear. Fill in any additional details for your Offer (be sure to request something!), and click `CREATE OFFER`:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/28_offers.png" alt="Cancelled"/>
  </div>
  <br/>

3. Share the Offer as you would with a CAT Offer. After the Offer has been created, the NFTs being offered will appear in the Offer summary:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/29_offers.png" alt="Cancelled"/>
  </div>
  <br/>

---

## NFT Swaps

You can also swap NFTs for other NFTs, just like trading cards.

1. From the `Offers` dialog, select the NFT(s) you would like to offer and request. You can mix and match the Offer with a combination of XCH, CATs, and NFTs:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/30_offers.png" alt="Multi NFT swap"/>
  </div>
  <br/>

2. When you are satisfied with terms of the Offer, click `CREATE OFFER`:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/31_offers.png" alt="Cancelled"/>
  </div>
  <br/>

3. After the Offer has been created, the assets to be trade will be displayed in the summary, just as with other Offers:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/32_offers.png" alt="Cancelled"/>
  </div>
  <br/>

---

## Offer notifications

It is also possible to send a peer-to-peer notification to the owner of an NFT you would like to buy. You don't even need to know who owns the NFT; the notification will figure it out for you.

This example will continue with the same NFT-NFT Offer from the last section.

1. After creating an Offer to acquire an NFT, share it to Dexie, Mint Garden, etc:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/33_offers.png" alt="Share on Dexie"/>
  </div>
  <br/>

2. Be sure to verify that the Offer is correct; after it is shared publicly, someone could accept it:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/34_offers.png" alt="Share Offer"/>
  </div>
  <br/>

3. Click `NOTIFY CURRENT OWNER`:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/35_offers.png" alt="Notify current owner"/>
  </div>
  <br/>

4. You have the option to add a transaction fee for the notification. You can also choose whether to allow counter offers:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/36_offers.png" alt="Send message"/>
  </div>
  <br/>

5. A new offer coin will be created. If the owner of the NFT you would like to acquire is using the reference wallet, the wallet will notice this new coin and examine its contents. A new notification will appear in the owner's wallet. Click the notification bell:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/37_offers.png" alt="Incoming notification"/>
  </div>
  <br/>

6. A summary of the Offer will appear. Click the summary to see the details of the Offer:

  <div style={{ textAlign: 'center' }}>
    <img src="/img/offers_img/gui2/38_offers.png" alt="View Offer"/>
  </div>
  <br/>

---

## Default expiration time

By default, all Offers will expire seven days after being created. However, you can modify the expiration time on individual Offers, and you can also modify the default expiration time. From the `GENERAL` tab in the `Settings` menu, scroll down to `Offer Expiration Time`. From here, you can modify the default, or even disable expiring Offers altogether:

<div style={{ textAlign: 'center' }}>
  <img src="/img/offers_img/gui2/39_offers.png" alt="Change default from general settings"/>
</div>
<br/>

You can also access this setting from the `Offer Builder` menu by clicking `Change default timing`:

<div style={{ textAlign: 'center' }}>
  <img src="/img/offers_img/gui2/40_offers.png" alt="Access default settings from Offer creation"/>
</div>
<br/>

---

## Potential issues

This section will detail a non-comprehensive list of issues you might encounter while making or taking offers.

## Contents:

- [Maker doesn't have enough money](#maker-doesnt-have-enough-money)
- [Taker doesn't have enough money](#taker-doesnt-have-enough-money)
- [Taker accepts an unknown CAT offer](#taker-accepts-an-unknown-cat-offer)
- [Taker attempts to accept an invalid offer](#taker-attempts-to-accept-an-invalid-offer)
- [Maker cancels an Offer locally, Taker accepts the offer](#maker-cancels-an-offer-locally-taker-accepts-the-offer)
- [Whole coins must be reserved](#whole-coins-must-be-reserved)
- [Offer involving a CAT1 is invalid](#offer-involving-a-cat1-is-invalid)

---

### Maker doesn't have enough money

Let's say a Maker has wallets for XCH and CKC, with no money in either of them.

<figure>
<img src="/img/offers_img/gui_tutorial/issues/01_xch_wallet.png" alt="0 XCH wallet"/>
</figure>
<figure>
<img src="/img/offers_img/gui_tutorial/issues/02_ckc_wallet.png" alt="0 CKC wallet"/>
</figure>
<br/>

The maker attempts to make an ambitious offer: 100 XCH for 1 million CKC.

<figure>
<img src="/img/offers_img/gui_tutorial/issues/03_100xch_for_1mckc.png" alt="Offer 100 XCH for 1 million CKC"/>
</figure>
<br/>

However, the Maker does not have enough money to create this Offer. As a result, an Error is displayed:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/04_100xch_for_1mckc_fail.png" alt="Amount exceeds spendable balance"/>
</figure>

---

### Taker doesn't have enough money

Let's say the Taker has a wallet with no money in it:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/01_xch_wallet.png" alt="0 XCH wallet"/>
</figure>
<br/>

And there's an outstanding Offer requesting 0.1 XCH for 10,000 CKC:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/05_accept_offer.png" alt="Accept offer"/>
</figure>
<br/>

However, the Taker does not have enough money to accept this Offer. As a result, an Error is displayed:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/06_insufficient_funds.png" alt="Insufficient funds"/>
</figure>

---

### Taker accepts an unknown CAT offer

You should be extra careful before accepting offers for unknown CATs. This is because the Offer _might_ be a scam where a different -- and worthless -- token is actually being offered.

Here's how the scam would work:

Let's say a potential Taker has 0.1 XCH in their wallet.

<figure>
<img src="/img/offers_img/gui_tutorial/issues/07_0.1xch_wallet.png" alt="0.1 XCH wallet"/>
</figure>
<br/>

There is an Offer of 0.25 Shibe (an unknown CAT) in exchange for 0.1 XCH.

Here's the Offer from the Taker's perspective:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/08_0.25_shibe_for_0.1_xch.png" alt="Offer shibe for XCH"/>
</figure>
<br/>

The Taker decides to accept the Offer.

There is a warning dialog about the unknown cat, after which the Offer is confirmed successfully:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/09_accept_unknown_warning.png" alt="Unknown CAT warning"/>
</figure>
<figure>
<img src="/img/offers_img/gui_tutorial/issues/10_unknown_success.png" alt="Unknown CAT success"/>
</figure>
<br/>

Notice that the Offer file was named `0.25_Shibe_for_0.1_XCH.offer`, but the file name itself does _not_ dictate the contents of the Offer. The Taker may have inadvertently accepted an Offer for a worthless token!

Luckily, it is easy to avoid this scam by cross-referencing the unknown CAT's ID before accepting the Offer. In this case, the Taker should verify from a trusted source that `4ac6a35e5fecb50d85604b19250a942afdc81876fe11db1f9d970c95dcf2c43f` indeed corresponds to Shibe.

Chia does install a list of known CATs by default, so this scam should be rare, but you should always be diligent in scrutinizing offers for unknown CATs.

---

### Taker attempts to accept an invalid offer

If the Maker has canceled the Offer on the blockchain, or a Taker has already taken the Offer, it is no longer valid.

Any potential Takers will be conveyed this information upon viewing the Offer. For example:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/11_invalid_offer.png" alt="Invalid offer"/>
</figure>

---

### Maker cancels an Offer locally, Taker accepts the offer

This example will demonstrate that if you need to cancel an Offer, you should always do so on-chain unless you are certain the Offer file has not left your computer.

Let's say a Maker has 0.1 XCH and 1 USDS:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/12_0.1xch_wallet.png" alt="0.1 XCH in wallet"/>
</figure>
<figure>
<img src="/img/offers_img/gui_tutorial/issues/13_1usds_wallet.png" alt="1 USDS in wallet"/>
</figure>
<br/>

The Maker offers 0.1 XCH in exchange for 10 USDS:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/14_view_offer_0.1xch_10usds.png" alt="Offer 0.1 XCH for 10 USDS"/>
</figure>
<br/>

The Maker then decides to cancel the Offer, and unchecks the "Cancel on blockchain" checkbox:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/15_cancel_off_chain.png" alt="Cancel offer off chain"/>
</figure>
<br/>

The offer's state is immediately changed to "Cancelled".

<figure>
<img src="/img/offers_img/gui_tutorial/issues/16_canceled_off_chain.png" alt="Canceled offer off chain"/>
</figure>
<br/>

After the Offer has been canceled, a Taker notices the Offer file and decides to accept it:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/17_accept_a_canceled_offer.png" alt="Accept a canceled offer"/>
</figure>
<figure>
<img src="/img/offers_img/gui_tutorial/issues/18_confirmed_canceled_offer.png" alt="Confirm a canceled offer"/>
</figure>
<br/>

Later, the Maker notices that the Offer has gone through, despite having been canceled:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/19_0xch_wallet.png" alt="Post-offer 0 XCH"/>
</figure>
<figure>
<img src="/img/offers_img/gui_tutorial/issues/20_11usds_wallet.png" alt="Post-offer 11 USDS"/>
</figure>
<br/>

If the Offer had been canceled on-chain, the reserved coins would have been spent. At that point, even if someone else had gotten access to the Offer file, the Offer itself would've been invalid.

The lesson here is do _not_ uncheck the "Cancel on blockchain" checkbox unless you're certain the Offer file has never left your computer.

---

### Whole coins must be reserved

Under the coin set model, coins can be of any value. When an Offer is created, the Maker's wallet must reserve enough coins to meet the requirements of the Offer.

The coin set model [has many advantages](/coin-set-intro) over the account model, but it can create some situations that take time to understand.

For example, let's say a Maker has 1 XCH and 0 USDS:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/21_1xch_wallet.png" alt="1 XCH in wallet"/>
</figure>
<figure>
<img src="/img/offers_img/gui_tutorial/issues/22_0usds_wallet.png" alt="0 USDS in wallet"/>
</figure>
<br/>

The Maker creates an Offer of 0.1 XCH for 10 USDS.

The Maker received the XCH in one lump sum, so there is a single coin worth 1 XCH in the Maker's wallet.

This is viewable in the offer's details:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/23_pending_accept.png" alt="Offer in Pending Accept state"/>
</figure>
<figure>
<img src="/img/offers_img/gui_tutorial/issues/24_show_details.png" alt="Show offer's details"/>
</figure>
<figure>
<img src="/img/offers_img/gui_tutorial/issues/25_one_coin.png" alt="One coin used for offer"/>
<figcaption>
<em>Scroll to the bottom to view coins reserved for the Offer.</em>
</figcaption>
</figure>
<br/>

While the Offer is pending, the Maker attempts to send 0.1 XCH to another address.

Notice that while the Total Balance is 1, the Spendable Balance is 0.

<figure>
<img src="/img/offers_img/gui_tutorial/issues/26_cant_send_offer_pending.png" alt="Can't send while Offer pending"/>
</figure>
<br/>

This should be possible -- the Maker has 0.9 XCH, even after taking the Offer into account. The reason for the Exception is because the Maker only has a single coin worth 1 XCH, and that coin has already been reserved for the Offer.

It's similar to using a $10 bill to buy something for $1. Before you receive your change, you can't buy anything else. On the other hand, if you had started with two $5 bills and bought the same $1 item, you could've purchased something else while waiting for your change.

The Maker can work around this issue by canceling the Offer, then breaking the single large coin into multiple small ones. One simple way to do this would be to send money to him/herself:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/27_send_0.1xch_to_self.png" alt="Maker sends money to him/herself"/>
</figure>
<br/>

The Maker can then recreate the same Offer. The new offer's details show a coin worth 0.9 XCH being reserved:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/28_0.1_coin_in_offer.png" alt="New details of Maker's offer"/>
</figure>
<br/>

The Maker's wallet shows a Total Balance of 1 XCH. This is the same as before, but there are now two coins that sum to 1 XCH.

Because there are now two coins in the Maker's wallet, and only one (worth 0.9 XCH) has been reserved for the Offer, the Spendable Balance is 0.1 XCH:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/29_0.1xch_available.png" alt="Maker has 0.1 XCH available"/>
</figure>
<br/>

The Maker can now send 0.1 XCH to another wallet, even while the Offer is still pending:

<figure>
<img src="/img/offers_img/gui_tutorial/issues/30_send_while_offer_pending.png" alt="Successful send while Offer pending"/>
</figure>
<br/>

One of the Maker's coins has been reserved for the Offer, and the other has been sent to another wallet. The Maker can further break apart the large coin as needed.

---

### Offer involving a CAT1 is invalid

The CAT1 Standard reached its end of life (EOL) with block 2,311,760 in July 2022. Any offers that include a CAT1 on either side of the trade will result in an invalid offer error.

---

## Further reading

- [Offers blog entry](https://www.chia.net/2022/01/12/chia-offers-are-here-en.html)
- [Offers reference](https://chialisp.com/offers)
- [CLI tutorial](/guides/offers-cli-tutorial)
- [Info on the coin set model](/coin-set-intro)
