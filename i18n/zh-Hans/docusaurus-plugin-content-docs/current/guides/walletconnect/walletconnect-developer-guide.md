---
slug: /walletconnect-developer-guide
title: WalletConnect Developer Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Intro

This guide will help developers to create dApps on Chia's blockchain using [WalletConnect](https://walletconnect.com/). It will be expanded upon as more tools are introduced.

For more info, see our WalletConnect [command documentation](/walletconnect-commands/).

---

## RPC Calls

The following table shows each RPC for Chia WalletConnect dApps, along with a description of what each RPC does, and a link to the equivalent Chia RPC:

| WalletConnect RPC     | Chia Wallet RPC                                                      | Description                                                                                       |
|:--------------------- |:-------------------------------------------------------------------- |:------------------------------------------------------------------------------------------------- |
| addCATtoken           | [create_new_wallet](/wallet-rpc#create_new_wallet)                 | Create a new wallet for CATs                                                                      |
| addVCProofs           | [vc_add_proofs](/vc-rpc/#vc_add_proofs)                            | Add a set of proofs to the DB that can be used when spending a VC                                 |
| cancelOffer           | [cancel_offer](/wallet-rpc#cancel_offer)                             | Cancel an offer                                                                                   |
| checkOfferValidity    | [check_offer_validity](/wallet-rpc#check_offer_validity)           | Check if an offer is valid                                                                        |
| createNewDIDWallet    | [create_new_wallet](/did-rpc/#create_new_wallet)                   | Create a new DID wallet                                                                           |
| createOfferForIDs     | [create_offer_for_ids](/wallet-rpc#create_offer_for_ids)           | Create a new offer                                                                                |
| getAllOffers          | [get_all_offers](/wallet-rpc#get_all_offers)                       | Show the details of all offers for this wallet                                                    |
| getCATAssetId         | [cat_get_asset_id](/wallet-rpc#cat_get_asset_id)                   | Retrieve a the asset ID from a CAT wallet                                                         |
| getCATWalletInfo      | [get_wallets](/wallet-rpc/#get_wallets)                              | Get CAT Wallet Info                                                                               |
| getCurrentAddress     | [get_next_address](/wallet-rpc#get_next_address)\*               | Set `new_address` to `false` to use the current address                                           |
| getNextAddress        | [get_next_address](/wallet-rpc#get_next_address)\*               | Set `new_address` to `true` to create a new address                                               |
| getNFTsCount          | [nft_count_nfts](/nft-rpc/#nft_count_nfts)                         | Count the number of NFTs in a wallet                                                              |
| getNFTInfo            | [nft_get_info](/nft-rpc/#nft_get_info)                             | Get info about an NFT                                                                             |
| getNFTs               | [nft_get_nfts](/nft-rpc/#nft_get_nfts)                             | Show all NFTs in a given wallet                                                                   |
| getNFTWalletsWithDIDs | [nft_get_wallets_with_dids](/nft-rpc/#nft_get_wallets_with_dids) | Show all NFT wallets that are associated with DIDs                                                |
| getOfferData          | [get_offer](/wallet-rpc#get_offer)                                   | Show the details of one offer                                                                     |
| getOfferRecord        | [get_all_offers](/wallet-rpc#get_all_offers)                       | Show the details of all offers for this wallet                                                    |
| getOffersCount        | [get_offers_count](/wallet-rpc#get_offers_count)                   | Obtain the number of offers from the current wallet                                               |
| getOfferSummary       | [get_offer_summary](/wallet-rpc#get_offer_summary)                 | Show a summary of an offer                                                                        |
| getProofsForRoot      | [vc_get_proofs_for_root](/vc-rpc/#vc_get_proofs_for_root)        | Given a specified VC root, get any proofs associated with that root                               |
| getPublicKey          | [get_public_key](/daemon-rpc#get_public_key)                       | Request the user to provide their master public key                                               |
| getSyncStatus         | [get_sync_status](/wallet-rpc#get_sync_status)                     | Show whether the current wallet is syncing or synced                                              |
| getTransaction        | [get_transaction](/wallet-rpc#get_transaction)                       | Get a transaction's details from its ID                                                           |
| getVC                 | [vc_get](/vc-rpc/#vc_get)                                            | Given a launcher ID, get the Verifiable Credential                                                |
| getVCList             | [vc_get_list](/vc-rpc/#vc_get_list)                                | Get a list of Verifiable Credentials                                                              |
| getWalletAddresses    | [get_wallet_addresses](/daemon-rpc/#get_wallet_addresses)          | Get wallet addresses for one or more wallet keys                                                  |
| getWalletBalance      | [get_wallet_balance](/wallet-rpc#get_wallet_balance)               | Obtain the balance (and related info) from a wallet                                               |
| getWalletBalances     | [get_wallet_balances](/wallet-rpc/#get_wallet_balances)            | Request the asset balances for specific wallets associated with the current wallet key            |
| getWallets            | [get_wallets](/wallet-rpc#get_wallets)                               | Show all wallets associated with the current fingerprint, including (by default) coin information |
| logIn                 | [log_in](/wallet-rpc#log_in)                                         | Log into the wallet with the specified key                                                        |
| mintNFT               | [nft_mint_nft](/nft-rpc/#nft_mint_nft)                             | Mint an NFT                                                                                       |
| revokeVC              | [vc_revoke](/vc-rpc/#vc_revoke)                                      | Revoke an on chain VC provided the correct DID is available                                       |
| sendTransaction       | [send_transaction](/wallet-rpc#send_transaction)                     | Send a transaction                                                                                |
| setDIDName            | [did_set_wallet_name](/did-rpc/#did_set_wallet_name)               | Set the name of a DID wallet                                                                      |
| setNFTDID             | [nft_set_nft_did](/nft-rpc/#nft_set_nft_did)                       | Set the DID for an NFT                                                                            |
| showNotification      | [get_notifications](/wallet-rpc/#get_notifications)                  | Show notification with offer or general announcement                                              |
| signMessageByAddress  | [sign_message_by_address](/wallet-rpc#sign_message_by_address)     | Sign a message using an XCH address without incurring an on-chain transaction                     |
| signMessageById       | [sign_message_by_id](/wallet-rpc#sign_message_by_id)               | Sign a message using a DID or NFT ID without incurring an on-chain transaction                    |
| spendCAT              | [cat_spend](/wallet-rpc#cat_spend)                                   | Send CAT funds to another wallet                                                                  |
| spendClawbackCoins    | [spend_clawback_coins](/wallet-rpc/#spend_clawback_coins)          | Claw back or claim claw back transaction                                                          |
| takeOffer             | [take_offer](/wallet-rpc#take_offer)                                 | Take an offer                                                                                     |
| transferNFT           | [nft_transfer_nft](/nft-rpc#nft_transfer_nft)                      | Transfer an NFT to a new wallet address                                                           |
| spendVC               | [vc_spend](/vc-rpc/#vc_spend)                                        | Add Proofs To Verifiable Credential                                                               |
| verifySignature       | [verify_signature](/wallet-rpc#verify_signature)                     | Given a public key, message and signature, verify if it is valid                                  |
| waitForConfirmation   |                                                                      |                                                                                                   |
