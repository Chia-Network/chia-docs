---
title: Offers
slug: /academy-offers
---

In this lesson, we talk about Chia Offers and how they enables safe peer-to-peer trading.

## Learning objectives

- **Peer-to-peer trading**: Understand what offers are and how they enable P2P trading.
- **Managing offer files**: Learn how to share, accept, and cancel offers.

---

## Content

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/O7Anp-oPV_A" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## Script

<details>

<summary> Expand for the full script </summary>

0:00
Chia Offers are used to trade assets between two parties safely and securely in a direct, peer-to-peer transaction. They can be used to trade any combination of assets including XCH, CATs, and NFTs.

0:20
When an offer is accepted, the trade happens atomically, meaning the entirety of the trade settles simultaneously with no counterparty risk. The creator of an offer specifies the assets they wish to offer as well as the assets they wish to receive.

0:40
An offer file is then created, represented as a string of characters containing an incomplete and partially signed spend bundle. The creator can then share this offer file through any means, such as email, QR code, and offer file exchange services. Anyone that sees an offer file and wants to accept the trade can do so by signing and completing the other side of the spend bundle and submit it to the blockchain to be settled atomically.

1:00
Assets with smart contracts attached such as NFTs that include creator royalties are also enforced. If a creator wishes to cancel an existing offer, they can simply spend any of the assets offered to invalidate it.

1:20
Offers can also be set to automatically expire after a certain amount of time if nobody takes it. Offer files allow for true peer-to-peer transactions, introducing a new way to create safe and decentralized liquid markets for assets on the Chia blockchain.

</details>

---

## Common gotchas

- **Locked coins:** Some wallets including the GUI Reference Wallet will indicate part of the balance of an asset as "locked" or "unspendable" if an Offer was created offering that asset. In truth, those coins aren't actually unspendable but if they _are_ spent, any offer(s) that use those coins will be invalid. In order to not lock up more than the offered amount, one can split their coins into smaller amounts prior to creating an offer.
- **Canceling open offers:** If an offer has been previously shared (e.g. uploaded to dexie) and the creator wishes to cancel it, they need to cancel with the "Cancel on blockchain" function enabled to ensure the offer is truly invalidated and not just deleted locally.
- **Blockchain fees:** Accepting an offer is an on-chain transaction and hence requires a transaction fee to be prioritized when blocks are full. The creator can embed fees as part of the offer file but the buyer can also optionally include a transaction fee as well.

---

## Knowledge check

:::tip Question 1 - Supported assets

True or False; An offer file is only for trading NFTs.

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

False. An offer file can be used to trade any combination of assets including (but not limited to) XCH, CATs, and NFTs. Offer files can also be used with other types of coins such as Verifiable Credentials or DataLayer singletons.

</details>

:::tip Question 2 - NFT Royalties

True or False; When creating an offer for NFTs, creator royalties (if any) must be included.

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

True. If an NFT specifies a creator royalty, this amount must be included as part of the requested assets to be considered valid. Royalties are applied to XCH and CATs that are a part of the offer. Wallets will automatically calculate and include these coins to be sent to the NFT creator.

</details>

---

## Additional resources

### Links

- More about [primitives](https://docs.chia.net/guides/primitives/): guides for each primitive, and how to use them.
- CLI [Guide](https://docs.chia.net/guides/crash-course/cats-offers-nfts/#offers): documentation on how to interact with offers with the CLI.
- Chialisp [detailed documentation](https://chialisp.com/): detailed information on all aspects of chialisp.
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.
- Offer file [exchanges](https://dexie.space): a bulletin board system for sharing and discovering offer files.

---
