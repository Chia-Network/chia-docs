---
sidebar_label: Offers
title: Offer CLI
slug: /offer-cli
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet"}'
```

To run the same command on Windows, you need to escape the quotes, so it looks like this:

```powershell
chia rpc wallet create_new_wallet '{\"wallet_type\": \"nft_wallet\"}'
```

</details>

## Reference

### `make_offer`

Functionality: Create an offer of XCH/CATs for XCH/CATs.

Usage: `chia wallet make_offer [OPTIONS]`

Options:

| Short Command |   Long Command    |  Type   | Required | Description                                                                                              |
| :-----------: | :---------------: | :-----: | :------: | :------------------------------------------------------------------------------------------------------- |
|      -wp      | --wallet-rpc-port | INTEGER |  False   | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
|      -f       |   --fingerprint   | INTEGER |  False   | Set the fingerprint to specify which wallet to use                                                       |
|      -o       |      --offer      |  TEXT   |   True   | A wallet id to offer and the amount to offer (formatted like wallet_id:amount)                           |
|      -r       |     --request     |  TEXT   |   True   | A wallet id of an asset to receive and the amount you wish to receive (formatted like wallet_id:amount)  |
|      -p       |    --filepath     |  TEXT   |   True   | The path to write the generated offer file to                                                            |
|      -m       |       --fee       |  TEXT   |  False   | A fee to add to the offer when it gets taken                                                             |
|               |      --reuse      |  None   |  False   | Set this flag to reuse an existing address for the offer [Default: generate a new address]               |
|      -h       |      --help       |  None   |  False   | Show a help message and exit                                                                             |

---

### **`take_offer`**

Functionality: Examine or take an offer.

Usage: `chia wallet take_offer [OPTIONS] PATH_OR_HEX`

Options:

| Short Command |   Long Command    |  Type   | Required | Description                                                                                              |
| :-----------: | :---------------: | :-----: | :------: | :------------------------------------------------------------------------------------------------------- |
|      -wp      | --wallet-rpc-port | INTEGER |  False   | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
|      -f       |   --fingerprint   | INTEGER |  False   | Set the fingerprint to specify which wallet to use                                                       |
|      -e       |  --examine-only   |  None   |  False   | Print the summary of the offer file but do not take it                                                   |
|      -m       |       --fee       |  TEXT   |  False   | The fee to use when pushing the completed offer                                                          |
|               |      --reuse      |  None   |  False   | Set this flag to reuse an existing address for the offer [Default: generate a new address]               |
|      -h       |      --help       |  None   |  False   | Show a help message and exit                                                                             |

---

### **`cancel_offer`**

Functionality: Cancel an existing offer. Must be the offer's Maker.

Usage: `chia wallet cancel_offer [OPTIONS]`

Options:

| Short Command |   Long Command    |  Type   | Required | Description                                                                                                              |
| :-----------: | :---------------: | :-----: | :------: | :----------------------------------------------------------------------------------------------------------------------- |
|      -wp      | --wallet-rpc-port | INTEGER |  False   | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml                 |
|      -f       |   --fingerprint   | INTEGER |  False   | Set the fingerprint to specify which wallet to use                                                                       |
|      -id      |       --id        |  TEXT   |   True   | The offer ID that you wish to cancel                                                                                     |
|               |    --insecure     |  None   |  False   | Set this flag to disable making an on-chain transaction and simply mark the offer as canceled [Default: cancel on-chain] |
|      -m       |       --fee       |  TEXT   |  False   | The fee to use when canceling the offer securely                                                                         |
|      -h       |      --help       |  None   |  False   | Show a help message and exit                                                                                             |

---

### **`get_offers`**

Functionality: Get the status of existing offers.

Usage: `chia wallet get_offers [OPTIONS]`

Options:

| Short Command |      Long Command      |  Type   | Required | Description                                                                                              |
| :-----------: | :--------------------: | :-----: | :------: | :------------------------------------------------------------------------------------------------------- |
|      -wp      |   --wallet-rpc-port    | INTEGER |  False   | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
|      -f       |     --fingerprint      | INTEGER |  False   | Set the fingerprint to specify which wallet to use                                                       |
|      -id      |          --id          |  TEXT   |  False   | The ID of the offer that you wish to examine                                                             |
|      -p       |       --filepath       |  TEXT   |  False   | The path to rewrite the offer file to (must be used in conjunction with --id)                            |
|      -em      |  --exclude-my-offers   |  None   |  False   | Exclude your own offers from the output                                                                  |
|      -et      | --exclude-taken-offers |  None   |  False   | Exclude offers that you've accepted from the output                                                      |
|      -ic      |  --include-completed   |  None   |  False   | Include offers that have already been confirmed/canceled or failed                                       |
|      -s       |      --summaries       |  None   |  False   | Show the assets being offered and requested for each offer                                               |
|      -r       |       --reverse        |  None   |  False   | Reverse the order of the output                                                                          |
|      -h       |         --help         |  None   |  False   | Show a help message and exit                                                                             |
