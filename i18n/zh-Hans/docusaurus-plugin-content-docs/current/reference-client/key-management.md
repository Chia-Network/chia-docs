---
title: Key Management
slug: /chia-key-management
---

The purpose of this page is to provide guidance on how to setup Chia keys for plotting, farming, receiving rewards and managing your wallet. It does not explain the Chia Keys Architecture. You can find this [Chia Keys Architecture](/key-architecture) explanation. It is mostly CLI focused; sorry GUI users.

## 1 key (default)

This solution is the most straightforward, you use only one key for everything: plotting, farming, receiving rewards, managing your wallet. It is the default configuration when you install chia-network for the first time. The CLI (or GUI) creates a new private master key on the first initialization. Show can see it's mnemonic by typing `chia keys show`.

By default, the rewards from farming will be sent to this private key's wallet address.

With this setup you can farm, plot and manage your XCH all at once. The risk is that, if your computer is compromised, the attacker would have access to your wallet and could potentially steal the XCH.

Another solution for farming XCH and securing them is to use two keys:

## 2 Keys (farming key + cold storage key)

1. Default key used for: plotting and farming
1. Cold storage key used for: Wallet operations. Receiving/Sending funds and receiving farming rewards.

The downside of that solution is that you will not have direct access to your wallet and XCH. Would you want to do an XCH operation you will have to manually import the cold storage key. The upside is: even if your computer is compromised the attacker will not be able to access your wallet. Since the private key receiving rewards will not be stored on it.

Configuration steps:

- Create a second key for "wallet" operation purposes: `chia keys generate`
- Write down the mnemonic on a paper you will not lose. If you lose it your key and XCH will be lost for ever !
- Remember the fingerprint for the next step
- Find the "First wallet address": `chia keys show` and copy it
- Open `~/.chia/mainnet/config/config.yaml`
- Edit: `xch_target_address: XXX` replace it with the newly generated "First wallet address".
  - There should be two occurrence of `xch_target_address`. One under the `farmer` section and the other one under the `pool` section.
- Save the file and close it.
- Delete the second key: `chia keys delete -f <fingerprint>`
  - /!\ **Caution**: make sure you have a backup of the 24 words mnemonic or you will lose access to the key for ever.
- It should prompt a WARNING message like "Deleting private_key with fingerprint `<fingerprint>`" :::warning Using a farmer address which we don't have the private keys for. We searched the first 500 addresses. Consider overriding `<cold-storage-wallet-address>` with `<farmer-wallet-address>`
:::
- Make sure the `<cold-storage-wallet-address>` corresponds to your second key wallet address.

Your setup is complete. Your machine can farm XCH and rewards will be sent to the key that you stored on paper. Would you need to transfer funds you can add it back to your computer's Chia keychain by doing: `chia keys add`
