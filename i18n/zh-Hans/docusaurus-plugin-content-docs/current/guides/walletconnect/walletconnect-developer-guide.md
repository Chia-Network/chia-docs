---
slug: /walletconnect-developer-guide
title: WalletConnect Developer Guide
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Intro

WalletConnect allows users to connect dApps to their cryptocurrency wallets. Chia's reference wallet supports WalletConnect for a variety of dApps.

:::info

WalletConnect Inc (the company behind the WalletConnect product) has been rebranded to [Reown](https://reown.com/). However, the WalletConnect product lives on in the form of [walletconnect.network](https://walletconnect.network/). We will continue to refer to WalletConnect by its original name on this site.

:::

For more info, see our WalletConnect [command documentation](/reference-client/walletconnect/walletconnect/).

---

## RPC Calls

The following table shows each RPC for Chia WalletConnect dApps, along with a description of what each RPC does, and a link to the equivalent Chia RPC:

| WalletConnect RPC     | Chia Wallet RPC                                                                                 | Description                                                                                       |
| :-------------------- | :---------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| addCATtoken           | [create_new_wallet](/reference-client/rpc-reference/wallet-rpc#create_new_wallet)               | Create a new wallet for CATs                                                                      |
| addVCProofs           | [vc_add_proofs](/reference-client/rpc-reference/vc-rpc/#vc_add_proofs)                          | Add a set of proofs to the DB that can be used when spending a VC                                 |
| cancelOffer           | [cancel_offer](/reference-client/rpc-reference/wallet-rpc#cancel_offer)                         | Cancel an offer                                                                                   |
| checkOfferValidity    | [check_offer_validity](/reference-client/rpc-reference/wallet-rpc#check_offer_validity)         | Check if an offer is valid                                                                        |
| createNewDIDWallet    | [create_new_wallet](/reference-client/rpc-reference/did-rpc/#create_new_wallet)                 | Create a new DID wallet                                                                           |
| createOfferForIDs     | [create_offer_for_ids](/reference-client/rpc-reference/wallet-rpc#create_offer_for_ids)         | Create a new offer                                                                                |
| getAllOffers          | [get_all_offers](/reference-client/rpc-reference/wallet-rpc#get_all_offers)                     | Show the details of all offers for this wallet                                                    |
| getCATAssetId         | [cat_get_asset_id](/reference-client/rpc-reference/wallet-rpc#cat_get_asset_id)                 | Retrieve a the asset ID from a CAT wallet                                                         |
| getCATWalletInfo      | [get_wallets](/reference-client/rpc-reference/wallet-rpc/#get_wallets)                          | Get CAT Wallet Info                                                                               |
| getCurrentAddress     | [get_next_address](/reference-client/rpc-reference/wallet-rpc#get_next_address)\*               | Set `new_address` to `false` to use the current address                                           |
| getNextAddress        | [get_next_address](/reference-client/rpc-reference/wallet-rpc#get_next_address)\*               | Set `new_address` to `true` to create a new address                                               |
| getNFTsCount          | [nft_count_nfts](/reference-client/rpc-reference/nft-rpc/#nft_count_nfts)                       | Count the number of NFTs in a wallet                                                              |
| getNFTInfo            | [nft_get_info](/reference-client/rpc-reference/nft-rpc/#nft_get_info)                           | Get info about an NFT                                                                             |
| getNFTs               | [nft_get_nfts](/reference-client/rpc-reference/nft-rpc/#nft_get_nfts)                           | Show all NFTs in a given wallet                                                                   |
| getNFTWalletsWithDIDs | [nft_get_wallets_with_dids](/reference-client/rpc-reference/nft-rpc/#nft_get_wallets_with_dids) | Show all NFT wallets that are associated with DIDs                                                |
| getOfferData          | [get_offer](/reference-client/rpc-reference/wallet-rpc#get_offer)                               | Show the details of one offer                                                                     |
| getOfferRecord        | [get_all_offers](/reference-client/rpc-reference/wallet-rpc#get_all_offers)                     | Show the details of all offers for this wallet                                                    |
| getOffersCount        | [get_offers_count](/reference-client/rpc-reference/wallet-rpc#get_offers_count)                 | Obtain the number of offers from the current wallet                                               |
| getOfferSummary       | [get_offer_summary](/reference-client/rpc-reference/wallet-rpc#get_offer_summary)               | Show a summary of an offer                                                                        |
| getProofsForRoot      | [vc_get_proofs_for_root](/reference-client/rpc-reference/vc-rpc/#vc_get_proofs_for_root)        | Given a specified VC root, get any proofs associated with that root                               |
| getPublicKey          | [get_public_key](/reference-client/rpc-reference/daemon-rpc#get_public_key)                     | Request the user to provide their master public key                                               |
| getSyncStatus         | [get_sync_status](/reference-client/rpc-reference/wallet-rpc#get_sync_status)                   | Show whether the current wallet is syncing or synced                                              |
| getTransaction        | [get_transaction](/reference-client/rpc-reference/wallet-rpc#get_transaction)                   | Get a transaction's details from its ID                                                           |
| getVC                 | [vc_get](/reference-client/rpc-reference/vc-rpc/#vc_get)                                        | Given a launcher ID, get the Verifiable Credential                                                |
| getVCList             | [vc_get_list](/reference-client/rpc-reference/vc-rpc/#vc_get_list)                              | Get a list of Verifiable Credentials                                                              |
| getWalletAddresses    | [get_wallet_addresses](/reference-client/rpc-reference/daemon-rpc/#get_wallet_addresses)        | Get wallet addresses for one or more wallet keys                                                  |
| getWalletBalance      | [get_wallet_balance](/reference-client/rpc-reference/wallet-rpc#get_wallet_balance)             | Obtain the balance (and related info) from a wallet                                               |
| getWalletBalances     | [get_wallet_balances](/reference-client/rpc-reference/wallet-rpc/#get_wallet_balances)          | Request the asset balances for specific wallets associated with the current wallet key            |
| getWallets            | [get_wallets](/reference-client/rpc-reference/wallet-rpc#get_wallets)                           | Show all wallets associated with the current fingerprint, including (by default) coin information |
| logIn                 | [log_in](/reference-client/rpc-reference/wallet-rpc#log_in)                                     | Log into the wallet with the specified key                                                        |
| mintNFT               | [nft_mint_nft](/reference-client/rpc-reference/nft-rpc/#nft_mint_nft)                           | Mint an NFT                                                                                       |
| revokeVC              | [vc_revoke](/reference-client/rpc-reference/vc-rpc/#vc_revoke)                                  | Revoke an on chain VC provided the correct DID is available                                       |
| sendTransaction       | [send_transaction](/reference-client/rpc-reference/wallet-rpc#send_transaction)                 | Send a transaction                                                                                |
| setDIDName            | [did_set_wallet_name](/reference-client/rpc-reference/did-rpc/#did_set_wallet_name)             | Set the name of a DID wallet                                                                      |
| setNFTDID             | [nft_set_nft_did](/reference-client/rpc-reference/nft-rpc/#nft_set_nft_did)                     | Set the DID for an NFT                                                                            |
| showNotification      | [get_notifications](/reference-client/rpc-reference/wallet-rpc/#get_notifications)              | Show notification with offer or general announcement                                              |
| signMessageByAddress  | [sign_message_by_address](/reference-client/rpc-reference/wallet-rpc#sign_message_by_address)   | Sign a message using an XCH address without incurring an on-chain transaction                     |
| signMessageById       | [sign_message_by_id](/reference-client/rpc-reference/wallet-rpc#sign_message_by_id)             | Sign a message using a DID or NFT ID without incurring an on-chain transaction                    |
| spendCAT              | [cat_spend](/reference-client/rpc-reference/wallet-rpc#cat_spend)                               | Send CAT funds to another wallet                                                                  |
| spendClawbackCoins    | [spend_clawback_coins](/reference-client/rpc-reference/wallet-rpc/#spend_clawback_coins)        | Claw back or claim claw back transaction                                                          |
| takeOffer             | [take_offer](/reference-client/rpc-reference/wallet-rpc#take_offer)                             | Take an offer                                                                                     |
| transferNFT           | [nft_transfer_nft](/reference-client/rpc-reference/nft-rpc#nft_transfer_nft)                    | Transfer an NFT to a new wallet address                                                           |
| spendVC               | [vc_spend](/reference-client/rpc-reference/vc-rpc/#vc_spend)                                    | Add Proofs To Verifiable Credential                                                               |
| verifySignature       | [verify_signature](/reference-client/rpc-reference/wallet-rpc#verify_signature)                 | Given a public key, message and signature, verify if it is valid                                  |
| waitForConfirmation   |                                                                                                 |                                                                                                   |
