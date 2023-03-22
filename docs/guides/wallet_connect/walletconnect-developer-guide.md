---
slug: /walletconnect-developer-guide
title: WalletConnect Developer Guide
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Intro

This guide will help developers to create dApps on Chia's blockchain using [WalletConnect](https://walletconnect.com/). It will be expanded upon as more tools are introduced.

---

## API permission prompts

The following table shows each API method, its grouping, and whether a single confirmation is required. For methods with `no` in the `Single Confirmation` column, confirmation will be required each time the method is called. Additionally, for some of the methods where a single confirmation is required, the user can manually reset the action, which will then require a new confirmation. The `Manual Reset` column covers whether this is allowed for each method.

| Permission           | Group         | Single<br/>Confirmation | Manual<br/>Reset |
| :------------------- | :------------ | :---------------------- | :--------------- |
| getTransaction       | Assets        | yes                     | yes              |
| getWalletBalance     | Assets        | yes                     | yes              |
| getCATAssetId        | Assets        | yes                     | no               |
| getNFTs              | Assets        | yes                     | yes              |
| getNFTInfo           | Assets        | yes                     | no               |
| getNFTCount          | Assets        | yes                     | no               |
| LogIn                | Authorization | no                      | N/A              |
| SignMessageById      | Authorization | no                      | N/A              |
| SignMessageByAddress | Authorization | no                      | N/A              |
| CreatNewCATWallet    | Authorization | no                      | N/A              |
| addCattoken          | Authorization | no                      | N/A              |
| VerifySignature      | Authorization | yes                     | yes              |
| getAllOffers         | Offers	       | yes                     | yes              |
| getOffersCount       | Offers	       | yes                     | no               |
| checkOfferValidity   | Offers        | yes                     | no               |
| getOfferSummary      | Offers        | yes                     | no               |
| getOfferData         | Offers        | yes                     | no               |
| getOfferRecord       | Offers        | yes                     | no               |
| transferNFT          | Transaction   | no                      | N/A              |
| SendTransaction      | Transaction   | no                      | N/A              |
| waitForConfirmation  | Transaction   | no                      | N/A              |
| CreateOfferForIDs    | Transaction   | no                      | N/A              |
| CancelOffer          | Transaction   | no                      | N/A              |
| CheckOfferValidity   | Transaction   | no                      | N/A              |
| takeOffer            | Transaction   | no                      | N/A              |
| SpendCat             | Transaction   | no                      | N/A              |
| getWallets           | Wallet        | yes                     | yes              |
| getCurrentAddress    | Wallet        | yes                     | no               |
| getNextAddress       | Wallet        | yes                     | no               |
| getSyncStatus        | Wallet        | yes                     | no               |

