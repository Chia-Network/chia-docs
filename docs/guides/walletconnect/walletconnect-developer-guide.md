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

## RPC Calls

The following table shows each RPC for Chia WalletConnect dApps, along with a description of what each RPC does, and a link to the equivalent Chia RPC:

| WalletConnect RPC    | Chia Wallet RPC                                                | Description                                                                                       |
| :------------------- | :------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| addCattoken          | [create_new_wallet](/wallet-rpc#create_new_wallet)             | Create a new wallet for CATs                                                                      |
| CancelOffer          | [cancel_offer](/wallet-rpc#cancel_offer)                       | Cancel an offer                                                                                   |
| checkOfferValidity   | [check_offer_validity](/wallet-rpc#check_offer_validity)       | Check if an offer is valid                                                                        |
| CreateOfferForIDs    | [create_offer_for_ids](/wallet-rpc#create_offer_for_ids)       | Create a new offer                                                                                |
| getAllOffers         | [get_all_offers](/wallet-rpc#get_all_offers)                   | Show the details of all offers for this wallet                                                    |
| getCATAssetId        | [cat_get_asset_id](/wallet-rpc#cat_get_asset_id)               | Retrieve a the asset ID from a CAT wallet                                                         |
| getCurrentAddress    | [get_next_address](/wallet-rpc#get_next_address)*              | Set `new_address` to `false` to use the current address                                           |
| getNextAddress       | [get_next_address](/wallet-rpc#get_next_address)*              | Set `new_address` to `true` to create a new address                                               |
| getNFTCount          | [nft_count_nfts](/nft-rpc/#nft_count_nfts)                     | Count the number of NFTs in a wallet                                                              |
| getNFTInfo           | [nft_get_info](/nft-rpc/#nft_get_info)                         | Get info about an NFT                                                                             |
| getNFTs              | [nft_get_nfts](/nft-rpc/#nft_get_nfts)                         | Show all NFTs in a given wallet                                                                   |
| getOfferData         | [get_offer](/wallet-rpc#get_offer)                             | Show the details of one offer                                                                     |
| getOfferRecord       | [get_all_offers](/wallet-rpc#get_all_offers)                   | Show the details of all offers for this wallet                                                    |
| getOffersCount       | [get_offers_count](/wallet-rpc#get_offers_count)               | Obtain the number of offers from the current wallet                                               |
| getOfferSummary      | [get_offer_summary](/wallet-rpc#get_offer_summary)             | Show a summary of an offer                                                                        |
| getPublicKey         | [get_public_key](/daemon-rpc#get_public_key)                   | Request the user to provide their master public key                                               |
| getSyncStatus        | [get_sync_status](/wallet-rpc#get_sync_status)                 | Show whether the current wallet is syncing or synced                                              |
| getTransaction       | [get_transaction](/wallet-rpc#get_transaction)                 | Get a transaction's details from its ID                                                           |
| getWalletBalance     | [get_wallet_balance](/wallet-rpc#get_wallet_balance)           | Obtain the balance (and related info) from a wallet                                               |
| getWallets           | [get_wallets](/wallet-rpc#get_wallets)                         | Show all wallets associated with the current fingerprint, including (by default) coin information |
| LogIn                | [log_in](/wallet-rpc#log_in)                                   | Log into the wallet with the specified key                                                        |
| SendTransaction      | [send_transaction](/wallet-rpc#send_transaction)               | Send a transaction                                                                                |
| SignMessageByAddress | [sign_message_by_address](/wallet-rpc#sign_message_by_address) | Sign a message using an XCH address without incurring an on-chain transaction                     |
| SignMessageById      | [sign_message_by_id](/wallet-rpc#sign_message_by_id)           | Sign a message using a DID or NFT ID without incurring an on-chain transaction                    |
| SpendCat             | [cat_spend](/wallet-rpc#cat_spend)                             | Send CAT funds to another wallet                                                                  |
| takeOffer            | [take_offer](/wallet-rpc#take_offer)                           | Take an offer                                                                                     |
| transferNFT          | [nft_transfer_nft](/nft-rpc#nft_transfer_nft)                  | Transfer an NFT to a new wallet address                                                           |
| VerifySignature      | [verify_signature](wallet-rpc#verify_signature)                | Given a public key, message and signature, verify if it is valid                                  |
| waitForConfirmation  |                                                                |                                                                                                   |





