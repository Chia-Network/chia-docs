---
slug: /guides/verifiable-credentials-guide
title: Verifiable Credentials Guide
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Intro

This document will guide you through the process of minting Verifiable Credentials (VCs), adding proofs, transferring VCs, and revoking proofs. 

For additional resources, see the following:

- [Verifiable Credentials RPC Reference](/vc-rpc)
- [Verifiable Credentials CLI Reference](/vc-cli)
- [CHIP-16](https://github.com/Chia-Network/chips/pull/65) -- the standard for Chia VCs
- [CHIP-17](https://github.com/Chia-Network/chips/pull/66) -- a generic VC metadata structure
- [CHIP-18](https://github.com/Chia-Network/chips/pull/67) -- a KYC-VC proof structure

:::warning

The commands in this guide are only examples. Be sure to replace the listed values with values from your local system.

This guide was creating using testnet10. The example commands use a fee of 100 million mojos, which will be rather high for mainnet usage. If running on mainnet, be sure to adjust your fees accordingly.

:::

## Definitions

* **Decentralized Identifier (DID)** -- A decentralized way to represent an identity of an organization, a person, or any other entity
* **Verifiable Credential (VC)** -- Allows someone or something to prove that a subject belongs to a certain category or categories, such as being a US citizen. One type of VC is issued by a Know Your Customer (KYC) provider, who must perform this verification.

  In Chia terminology, VCs depend on DIDs. In other words, a DID is required in order to mint a VC on Chia's blockchain.

* **Proofs** -- Key-value pairs that are attached to a VC

## Setup

### Prerequisites

In order to mint a VC, you will need to have:
* A synced Chia wallet (a full node is _not_ required)
* One mojo to create a DID
* One mojo to create a VC singleton
* Sufficient funds to cover blockchain fees, the amount of which depend on how busy the blockchain is at any moment

You are recommended to test minting VCs on the testnet prior to minting them on mainnet. If you are unsure of how to configure your wallet to use the testnet, see our [guide](https://docs.chia.net/guides/chialisp-testnet-setup).

We also have faucets available if you don't have sufficient funds to get started:
* [testnet](https://testnet10-faucet.chia.net/)
* [mainnet](https://faucet.chia.net/)

### Entities Involved

VC issuance and usage involves at least two entities:
1. Credential subject / holder -- the individual or entity who has applied for a VC (aka the _subject_) or  currently holds a VC (aka the _holder_)
2. Proof provider / credential issuer -- the entity that creates and signs the VC, thus asserting the claims about the holder's identity, attributes, or qualifications, and provides a proof for those claims in a credential that is issued to the holder

To test issuing, minting, and revoking VCs, you will need to create separate wallets to represent both of these entities. The two wallets can coexist on the same computer.

:::info note

Technically, there is another entity involved:

3. Verifier -- the entity that verifies the authenticity of the VC

For this guide, the Verifier is the blockchain itself.

:::

### DID Creation

The proof provider **must** have a DID in order to mint a VC. In order to create a DID, run the following command from a terminal window or command prompt:

```bash
chia wallet did create -m 0.0001
```

The response will include the ID of the newly created DID (it will begin with `did:chia:`). Save your local DID ID for later (it will be different from the one displayed here):

```bash
Successfully created a DID wallet with name None and id 2 on key 1725104286
Successfully created a DID did:chia:1rnvmwp3wmglslk942mwsrmf7dlkluytyna8mgewel44h4ne3nd9slhtddg in the newly created DID wallet
```

The DID will be created with an on-chain transaction. After this transaction has been confirmed, you can view your DID by running `chia wallet show`:

```bash
chia wallet show
```

Response:

```bash
Wallet height: 2795460
Sync status: Synced
Balances, fingerprint: 1725104286

Chia Wallet:
   -Total Balance:         4.999699999998 txch (4999699999998 mojo)
   -Pending Total Balance: 4.999699999998 txch (4999699999998 mojo)
   -Spendable:             4.999699999998 txch (4999699999998 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1

Provider_DID:
   -Total Balance:         1.0
   -Pending Total Balance: 1.0
   -Spendable:             1.0
   -Type:                  DECENTRALIZED_ID
   -DID ID:                did:chia:1rnvmwp3wmglslk942mwsrmf7dlkluytyna8mgewel44h4ne3nd9slhtddg
   -Wallet ID:             2
```

After you have a synced wallet and a DID, you are ready to execute the VC-specific commands.

## CLI Guide

This section will show you how to mint, transfer, and revoke a VC using Chia's `wallet` [CLI commands](/vc-cli). A similar walk-through using RPCs will be presented in the [next section](#rpc-guide).

### Create proofs

First, you must add proofs to the local database. To do this, run the [add_proof_reveal](/vc-cli#add_proof_reveal) command. You can add multiple proofs by reusing the `proof` parameter. For example:

```bash
chia wallet vcs add_proof_reveal --proof test_proof1 --proof test_proof2
```

The response will be a simple success message. This command only adds the proofs locally; it does not modify the blockchain:

```bash
Proofs added to DB successfully!
```

To obtain the root hash, run the same command and add the `--root-only` flag:

```bash
chia wallet vcs add_proof_reveal --proof test_proof1 --proof test_proof2 --root-only
```

Response:

```bash
Proof Hash: f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
```

Be sure to note your own root hash, as you will need it when minting a VC.

:::warning important

When using the CLI to add proofs, the value of each proof will be `1`. This is not configurable in the CLI. If you need to use different values, see the [RPC guide](#rpc-guide) instead.

:::

:::info

If you want to retrieve your original proofs from a proof hash, run the [get_proofs_for_root](/vc-cli#get_proofs_for_root) command:

```bash
chia wallet vcs get_proofs_for_root --proof-hash f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
```

Response:

```bash
Proofs:
 - test_proof1
 - test_proof2
```

Note that this command will only succeed if you have already added the corresponding proofs to your local database.

:::

### Mint a VC

To mint a VC, run the [mint](/vc-cli#mint) command and use the `-d` parameter to pass in a DID owned by the minting wallet:

```bash
chia wallet vcs mint -d did:chia:1tu7xx74m6rqfew67upf4d7esnx5zj2m66p60lez7we6q7smwr4tqax8m7n -m 0.0001
```

The response will include some info about the VC, including its ID, the ID of the minting transaction, and the VC's destination wallet:

```bash
New VC with launcher ID minted: 9883bb24810c2107c1ac10dd43a52959b2ab5a6bbf7e102e04232a4f2adcbc35
Relevant TX records:

Transaction 0d1cc44c3a341cb35006bc09cb081812fa1d35be7fd00f2caa0548bcc894805c
Status: Pending
Amount sent: 1E-12 XCH
To address: txch1wrr3hew9nr8ukenv3nwq0fg78h4uh5pm9shyqjl4rmfz9nuqcyxqcy8lth
Created at: 2023-06-23 12:34:13
```

By default, the VC will be minted to the same wallet that runs this command. However, you can also use the `--target-address` parameter to mint the VC to a different address.

When a VC is first minted, it will not contain any proofs. You can verify this by running the `get` command:

```bash
chia wallet vcs get
```

Response:

```bash
Proofs:

Launcher ID: 9883bb24810c2107c1ac10dd43a52959b2ab5a6bbf7e102e04232a4f2adcbc35
Coin ID: 8942dc321387287084a92e6451a01505e6771df81daa86937679eb1ef67abb4a
Inner Address: txch1wrr3hew9nr8ukenv3nwq0fg78h4uh5pm9shyqjl4rmfz9nuqcyxqcy8lth
```

This command shows the `Launcher ID` (the VC's ID), which you will need for the next command. 
In addition, the `Coin ID` will be required in case the proofs need to be revoked later.

Previously, you added your desired proofs to the local database and calculated the root hash. The next step is to add this root hash to the VC, and simultaneously send it to the new holder. This is accomplished by spending the VC.

### Add proofs to a VC

Use the [update_proofs](/vc-cli#update_proofs) command to add proofs to a VC. This command must be run from the proof provider's wallet (the wallet that contains the DID used for minting).

The `--new-proof-hash` parameter is required; this hash was included in the response from running the `add_proof_reveal` command. 

The `--new-puzhash` parameter is typically used, but not required. This parameter allows you to recreate the VC singleton in a different wallet (ie to send the VC to the new holder in the same command that is used to add the proof hash). 

:::note

`--new-puzhash` requires a _puzzle hash_ and not a wallet address. If you are not sure how to convert a wallet address to a puzzle hash, the [Chia.tt explorer](https://chia.tt/convert) includes a handy puzzle hash converter tool. If you prefer to do this conversion programmatically, use the `decode` command from the [chia-dev-tools](https://github.com/Chia-Network/chia-dev-tools) repository.

:::

For example, the following command will update the specified VC (`-l`) with a new root hash (`-p`) and send the VC to a new wallet (`-t`), while including a blockchain fee (`-m`):

```bash
chia wallet vcs update_proofs -l 9883bb24810c2107c1ac10dd43a52959b2ab5a6bbf7e102e04232a4f2adcbc35 -t 0xcdedf8c5a40e3db41d4fc7a45a892838454953e059bcaa467b3257450c8c138f -p f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5 -m 0.0001
```

Response:

```bash
Proofs successfully updated!
Relevant TX records:

Transaction 873df058c0b3f56c3828cf3f1b893e00d2fe57069caf7556ca4f9941fc4e1de8
Status: Pending
Amount sent: 0 XCH
To address: txch1fatr3nkc9jgnetkv6vnqdkaxlmjgx8dt4a359t9akgllzfycenzqlghpll
Created at: 2023-06-23 12:48:15

Transaction c1ec7ee41ddb6e5369ea2d982bea90e4b11b91c5eee88662f37e05503b4aa945
Status: Pending
Amount sent: 1E-12 XCH
To address: txch1ehkl33dypc7mg820c7j94zfg8pz5j5lqtx7253nmxft52ryvzw8stx7czc
Created at: 2023-06-23 12:48:15
```

After this transaction has been confirmed on the blockchain, the new **credential holder** can confirm that the proofs are included. First, the credential holder needs to run the same command as the proof provider to add the proofs to the local database. For example:

```bash
chia wallet vcs add_proof_reveal --proof test_proof1 --proof test_proof2
```

Response:

```bash
Proofs added to DB successfully!
```

Next, the credential holder can run the [get](/vc-cli#get) command:

```bash
chia wallet vcs get
```

In this case, one VC is shown, along with the proof hash and both proofs. If the proofs were not manually added to the local database, they would not show in this command, and the GUI would show the VC as invalid.

```bash
Proofs:
- f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
  - test_proof1
  - test_proof2

Launcher ID: 9883bb24810c2107c1ac10dd43a52959b2ab5a6bbf7e102e04232a4f2adcbc35
Coin ID: 420f69cc8b541be7a0bf1d94ec028a8b2a875ee2cd6721f5316cf1b02519d13a
Inner Address: txch1ehkl33dypc7mg820c7j94zfg8pz5j5lqtx7253nmxft52ryvzw8stx7czc
Proof Hash: f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
```

### Revoke a VC

Typically, the proof provider only needs to mint a VC, add proofs, and transfer the VC to the new holder. However, at some point, a holder's proofs may change. For example, a holder might have originally proven that they were not a US citizen, and then they later became a US citizen.

In cases such as this, the proof provider needs to _revoke_ the credentials, ie to remove all proofs from a VC. (The holder will continue to hold the VC, but it will no longer contain any proofs.) We don't allow the proof provider to take back the VC itself because it is possible for it to custody other assets, though we don't support this yet.

The only wallet that is allowed to revoke credentials is the proof provider's (the wallet that contains the DID used to mint the VC).

In order to run the [revoke](/vc-cli#revoke) command, the proof provider will need to know the parent coin ID (the `-p` parameter). Because VCs are singletons, their parent coin IDs will change every time the VC is spent (every time a change is made).

For testing purposes, the **holder's wallet** can obtain the parent coin ID by running the [vc_get](/vc-rpc#vc_get) RPC. The parent coin ID is the value of the `"parent_coin_info"`. In a production environment, the proof provider will track the VC on-chain and obtain this info immediately prior to revoking the VC.

An example of the revocation command:

```bash
chia wallet vcs revoke -p 0x420f69cc8b541be7a0bf1d94ec028a8b2a875ee2cd6721f5316cf1b02519d13a -m 0.0001
```

As a result, the VC will be recreated in the same wallet, but without any proofs:

```bash
VC successfully revoked!
Relevant TX records:

Transaction 286cc31575aa167c4b34cbc0a768a162caefb6afea77560db0693934ac3fbf1e
Status: Pending
Amount sent: 1E-12 XCH
To address: txch1ehkl33dypc7mg820c7j94zfg8pz5j5lqtx7253nmxft52ryvzw8stx7czc
Created at: 2023-06-23 13:33:50

Transaction ae6378e84742ab6abb07df666291093938ec9e06ae8e2b4066d7386d94289ba3
Status: Pending
Amount sent: 0 XCH
To address: txch1mahlm65l8q9frcqcfveekx3a29cd74w6gfajqy05ukz2afrzg03syqkz3p
Created at: 2023-06-23 13:33:50
```

After these transactions have been confirmed on-chain, the VC no longer contains any proofs. The holder can verify this:

```bash
chia wallet vcs get
```

Result:

```bash
Proofs:
```

---

## RPC Guide

This section will show you how to mint, transfer, and revoke a VC using Chia's [wallet RPC](/vc-rpc). The RPC commands will generally give more detailed responses than their CLI equivalents, but the functionality will be mostly the same.

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc wallet vc_get '{"vc_id": "13ba084e78475327e41c60df5a108965d7a283f065b5506e266ffb3563937b6c"}'
```

To run the same command on Windows, you need to escape the quotes, so it looks like this (the braces have been removed to support the formatting for this page. You still need to use them in your actual commands.):

```powershell
chia rpc wallet vc_get '\"vc_id\": \"13ba084e78475327e41c60df5a108965d7a283f065b5506e266ffb3563937b6c\"'
```

</details>

### Create proofs

First, you must add proofs to the local database. To do this, run the [vc_add_proofs](/vc-rpc#vc_add_proofs) command. `"proofs"` is a dictionary of key-value pairs. Unlike the equivalent CLI command, this command allows you to use any string value.

```json
chia rpc wallet vc_add_proofs '{"proofs": {"example_proof_1": "example_value_1", "example_proof_2": "example_value_2"}}'
```

The response is a simple `success` message. This command only adds the proofs locally; it does not modify the blockchain:

```json
{
    "success": true
}
```

The next step is to calculate the root hash for the proofs you just added.

### Root Hash Calculation

A VC's proofs are presented as a Merkle tree, the root hash of which is stored on-chain.

When looking up proofs, a hash called a _Proof of Inclusion_ is all that is required to be presented. Any third-party observers of the blockchain won't be able to identify who the VC corresponds to, but the KYC Provider will know this information as the issuer of the VC.

In order to construct a Merkle tree from a set of proofs:
1. Sort the proofs into reverse alphabetical order by key
2. Transform the proofs' key-value pairs into a binary tree by recursively splitting the list in half

With the tree constructed, the root hash can be obtained by recursively traversing the tree, hashing the leaves until the root is reached.

There is not an RPC for calculating the root hash; instead, you will need to obtain it programmatically (unless you use `1` for all values, in which case you can use the [CLI command](/vc-cli#add_proof_reveal)).

For example, the following Javascript program will output the root hash of the proofs listed in the `console.log` command:

<details>
<summary>Javascript Example</summary>

In order to run this example:

1. Copy the script to a text editor
2. Replace the keys and values in the last line with the keys and values from your own proof(s)
3. Save the script locally, for example, as `calculate_proof_hash.js`
4. Run the script by calling, for example, `node calculate_proof_hash.js`

```javascript
const { strict: assert } = require("node:assert");
const crypto = require("crypto");

const std_hash = (s) => crypto.createHash("sha256").update(s).digest("hex");

const sort_pairs = (pairs) =>
  pairs.sort(([a], [b]) => {
    if (a < b) {
      return 1;
    }
    if (a > b) {
      return -1;
    }
    return 0;
  });

const CHIA_TREE_HASH_ATOM_PREFIX = "01";
const CHIA_TREE_HASH_PAIR_PREFIX = "02";

const tree_hash = (node) => {
  if (Array.isArray(node)) {
    // Only supporting pairs and utf-8 string/boolean atoms
    assert.equal(node.length, 2);

    const left_hash = tree_hash(node[0]);
    const right_hash = tree_hash(node[1]);

    // Hashes pair
    return std_hash(Buffer.concat([Buffer.from(CHIA_TREE_HASH_PAIR_PREFIX, "hex"), Buffer.from(left_hash, "hex"), Buffer.from(right_hash, "hex")]));
  } else {
    // Hashes string key
    if (typeof node === "string") {
      return std_hash(Buffer.concat([Buffer.from(CHIA_TREE_HASH_ATOM_PREFIX, "hex"), Buffer.from(node, "utf-8")]));
    }

    // Hashes boolean value
    if (typeof node === "boolean") {
      return std_hash(Buffer.concat([Buffer.from(CHIA_TREE_HASH_ATOM_PREFIX, "hex"), Buffer.from(node ? "01" : "", "hex")]));
    }

    // Only supporting pairs containing string keys and boolean values
    throw new Error("Unsupported type passed to hash function");
  }
};

// Convert sorted listed to binary tree to be hashed
const list_to_binary_tree = (objects) => {
  if (objects.length == 1) {
    return objects[0];
  }

  const mid = Math.floor(objects.length / 2);
  const first_half = objects.slice(0, mid);
  const second_half = objects.slice(mid, objects.length);

  return [list_to_binary_tree(first_half), list_to_binary_tree(second_half)];
};

const calculate_root_hash = (proofs) => {
  const kv_pairs = Object.entries(proofs);
  const sorted = sort_pairs(kv_pairs);
  const binary_tree = list_to_binary_tree(sorted);
  const result = tree_hash(binary_tree);
  return result;
};

console.log(calculate_root_hash({"example_proof_1": "example_value_1", "example_proof_2": "example_value_2"}));
```

The script will output the proof hash for the proofs your entered. In this example, the output is:

`96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3`

</details>

:::info

If you want to retrieve your original proofs from a proof hash, run the [vc_get_proofs_for_root](/vc-rpc#vc_get_proofs_for_root) command. For example:

```json
chia rpc wallet vc_get_proofs_for_root '{"root": "96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3"}'
```

Response:

```json
{
    "proofs": {
        "example_proof_1": "example_value_1",
        "example_proof_2": "example_value_2"
    },
    "success": true
}
```

Note that this command will only succeed if you have already added the corresponding proofs to your local database.

:::

### Mint a VC

To mint a VC, run the [vc_mint](/vc-rpc#vc_mint) command. The `did_id` parameter is required. This is the DID owned by the minting wallet. You may also optionally pass in a `target_address`, where the VC will be delivered. If this parameter is missing, the VC will be sent to the same wallet that owns the DID:

```json
chia rpc wallet vc_mint '{"did_id": "did:chia:1rnvmwp3wmglslk942mwsrmf7dlkluytyna8mgewel44h4ne3nd9slhtddg", "target_address": "txch1yfcclacd6sch2w9dz394zjuq7pqnmz5g7mrqac0hjhwpzmyahe9sqetxaz", "fee": 100000000}'
```

As a result, the spend bundle used to mint the VC will be output:

```json
{
    "success": true,
    "transactions": [
        {
            "additions": [
                {
                    "amount": 1,
                    "parent_coin_info": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e",
                    "puzzle_hash": "0x8b75b2ced8cdd1081021552f490618fb8b0c39e46ee5c5f9d46b6b7f9d8a8a74"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0x64c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136",
                    "puzzle_hash": "0x34557d1304533235fa1713a5eafcb23ffca18e8696c0d4fb92bd02c901c9d556"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0xfcf2249962009aadae936bf5198095f0b1d3e89f5dc8d08be7e3ccb5123af2d8",
                    "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
                },
                {
                    "amount": 4999799999998,
                    "parent_coin_info": "0xfcf2249962009aadae936bf5198095f0b1d3e89f5dc8d08be7e3ccb5123af2d8",
                    "puzzle_hash": "0x75f7052246d2da738d105b735e7f3fa945f93270d5d5c6e18ea9ef7eaa939632"
                }
            ],
            "amount": 1,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1687537068,
            "fee_amount": 100000000,
            "memos": {
                "1b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b": "22718ff70dd4317538ad144b514b80f0413d8a88f6c60ee1f795dc116c9dbe4b"
            },
            "name": "0xfc09b898b5d667ab15ea76015b274309f9fc2254767e3d0def58a645939f63ba",
            "removals": [
                {
                    "amount": 1,
                    "parent_coin_info": "0xfcf2249962009aadae936bf5198095f0b1d3e89f5dc8d08be7e3ccb5123af2d8",
                    "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e",
                    "puzzle_hash": "0x8b75b2ced8cdd1081021552f490618fb8b0c39e46ee5c5f9d46b6b7f9d8a8a74"
                },
                {
                    "amount": 4999899999999,
                    "parent_coin_info": "0xe4e28034d312cbba0e2809dbed5475e2dc20742158eefa48c05bcea195b78308",
                    "puzzle_hash": "0x75f7052246d2da738d105b735e7f3fa945f93270d5d5c6e18ea9ef7eaa939632"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": {
                "aggregated_signature": "0x9980f93b32587b3331997b27667067c3701569ebb8844c41602303bdc58c33a07f45e373d12f7cef8ef1e35dcd3679f30957493b325dbe4f536f19003a7ad45138a9c8951593f51176f3400852029404f5b2490a1ee4983dd0f57b90da9d23e1",
                "coin_spends": [
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0xfcf2249962009aadae936bf5198095f0b1d3e89f5dc8d08be7e3ccb5123af2d8",
                            "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
                        },
                        "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080",
                        "solution": "0xffa08b75b2ced8cdd1081021552f490618fb8b0c39e46ee5c5f9d46b6b7f9d8a8a74ff01ff8080"
                    },
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e",
                            "puzzle_hash": "0x8b75b2ced8cdd1081021552f490618fb8b0c39e46ee5c5f9d46b6b7f9d8a8a74"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0d2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4ea0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3affff04ff02ffff04ff05ffff04ff17ffff04ff2fffff04ff0bffff04ffff02ff5fff81bf80ff8080808080808080ffff04ffff01ffffff02ff3304ff01ff0101ffff02ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff14ff3880ffff0bff12ffff0bff12ffff0bff14ff2c80ff0980ffff0bff12ff0bffff0bff14ff8080808080ff8080808080ffff010b80ff0180ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff5fffff01ffff80ff80ff8080808080808080808080ffff04ffff03ff820b7fff820b7fffff04ff3cff808080ffff02ffff03ff81bfffff01ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff8201bfffff04ffff02ffff03ffff09ff82023fff2880ffff01ff02ffff03ffff18ff820b3fffff010180ffff01ff02ffff03ffff20ff82027f80ffff01ff04ff82033fffff04ff82057fffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff0180ffff01ff02ffff03ffff09ff82023fffff0181f680ffff01ff02ffff03ffff20ff82057f80ffff01ff04ff82027fffff04ffff02ff0bffff04ff2fffff04ff5fffff04ff82033fff8080808080ffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff018080ff0180ff80808080808080808080ffff01ff04ffff04ff28ffff04ffff02ff2effff04ff02ffff04ff05ffff04ff82047fffff04ffff0bff14ffff02ffff03ff82157fffff0182157fffff011780ff018080ffff04ffff02ffff03ff82157fffff0182157fffff011780ff0180ffff04ffff02ff3effff04ff02ffff04ff82097fff80808080ffff04ffff0bff14ff0580ff808080808080808080ff82067f8080ff822d7f8080ff018080ffff0bff12ffff0bff14ff1080ffff0bff12ffff0bff12ffff0bff14ff2c80ff0580ffff0bff12ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff14ff1480ff8080808080ffff0bff14ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff0180ffff04ffff01ff04ffff04ff13ff8080ffff04ff2bffff01ff80808080ffff04ffff01a0a8bd2fd3220e462b6914ec860f3454cb21df9313cf0d5897343d97bb381ce8edffff04ffff01ff02ffff01ff04ffff04ff04ffff04ffff02ff06ffff04ff02ffff04ff05ff80808080ff808080ffff02ff05ff0b8080ffff04ffff01ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ff01808080808080ff01808080",
                        "solution": "0xffffa0fcf2249962009aadae936bf5198095f0b1d3e89f5dc8d08be7e3ccb5123af2d8ff0180ff01ffffffff01ffff33ffa05f405810abf8d6e690cfcea3409300e71b23a8362b47068d88d7aaa296278aafff01ffffa022718ff70dd4317538ad144b514b80f0413d8a88f6c60ee1f795dc116c9dbe4b8080ffff01ffa022718ff70dd4317538ad144b514b80f0413d8a88f6c60ee1f795dc116c9dbe4b80ffff81f6ffa01cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4bffa0e00c460366d00066f75597edfb72ddfcfd0d336d67f85dc2671498900ba2810e8080ff80808080"
                    },
                    {
                        "coin": {
                            "amount": 4999899999999,
                            "parent_coin_info": "0xe4e28034d312cbba0e2809dbed5475e2dc20742158eefa48c05bcea195b78308",
                            "puzzle_hash": "0x75f7052246d2da738d105b735e7f3fa945f93270d5d5c6e18ea9ef7eaa939632"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b095da6e852d85a01103de927984ecd7368be3ec3ff003380d33c77a90947caaead80640bec0447f5338990d07988535dbff018080",
                        "solution": "0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa075f7052246d2da738d105b735e7f3fa945f93270d5d5c6e18ea9ef7eaa939632ff86048c1b4d8dfe80ffff34ff8405f5e10080ffff3dffa08426eba36496cbf0da25676027ead2830a9fb38f171256e52d788648a17acae280ffff3dffa0cab37fa0941e854e034e8d93762c554047f71ecd897807aba1f822e2f6ed38678080ff8080"
                    }
                ]
            },
            "to_address": "txch1yfcclacd6sch2w9dz394zjuq7pqnmz5g7mrqac0hjhwpzmyahe9sqetxaz",
            "to_puzzle_hash": "0x22718ff70dd4317538ad144b514b80f0413d8a88f6c60ee1f795dc116c9dbe4b",
            "trade_id": null,
            "type": 1,
            "wallet_id": 1
        }
    ],
    "vc_record": {
        "confirmed_at_height": 0,
        "vc": {
            "coin": {
                "amount": 1,
                "parent_coin_info": "0x64c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136",
                "puzzle_hash": "0x34557d1304533235fa1713a5eafcb23ffca18e8696c0d4fb92bd02c901c9d556"
            },
            "eml_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": null,
                "parent_name": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e",
                "parent_proof_hash": null
            },
            "inner_puzzle_hash": "0x22718ff70dd4317538ad144b514b80f0413d8a88f6c60ee1f795dc116c9dbe4b",
            "launcher_id": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e",
            "proof_hash": null,
            "proof_provider": "0x1cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4b",
            "singleton_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x43309e9613bc9d8156b52cfe1e396b43448c59286bf0b3d3dd283eeea7eb9c09",
                "parent_name": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e"
            }
        }
    }
}
```

When a VC is first minted, it will not contain any proofs.

Previously, you added your desired proofs to the local database and calculated the root hash. The next step is to add your root hash to the VC.

### Add proofs to a VC

In Chia, a singleton is a primitive standard that allows a coin to be recreated with different properties when it is spent. Chia VCs are singletons; use the [vc_spend](/vc-rpc#vc_spend) command to spend a VC and recreate it with a new set of proofs. 

The `new_proof_hash` parameter is required; this is the root hash you previously obtained.

The `new_puzhash` parameter is typically used, but not required. This parameter allows you to recreate the VC singleton in a different wallet (ie to send the VC to the new holder in the same command that is used to add the proof hash). 

:::note

`new_puzhash` requires a _puzzle hash_ and not a wallet address. If you are not sure how to convert a wallet address to a puzzle hash, the [Chia.tt explorer](https://chia.tt/convert) includes a handy puzzle hash converter tool. If you prefer to do this conversion programmatically, use the `decode` command from the [chia-dev-tools](https://github.com/Chia-Network/chia-dev-tools) repository.

:::

For example, this command will update the specified `vc_id` with a `new_proof_hash` and send the VC to a `new_puzhash`, while including a blockchain `fee`:

```json
chia rpc wallet vc_spend '{"vc_id": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e", "new_puzhash": "0x08db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088", "new_proof_hash": "96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3", "fee": 100000000}'
```

The response includes the spend bundle used to spend the VC:

```json
{
    "success": true,
    "transactions": [
        {
            "additions": [
                {
                    "amount": 4999699999998,
                    "parent_coin_info": "0x653a6248d7c2b308a35fd8b3f529c9dc485ba76f87621a4b62143edd06dd7be0",
                    "puzzle_hash": "0xc32479a76e578a51deb053c32a2116bb9cc3b80f49d26b5aaa58d032b3770058"
                }
            ],
            "amount": 0,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1687537276,
            "fee_amount": 100000000,
            "memos": {},
            "name": "0xf5c90151aaddb6deedf0a539a6d79c7f672b42e5d5cc5e61c57f7480f0ceeb6a",
            "removals": [
                {
                    "amount": 4999799999998,
                    "parent_coin_info": "0xfcf2249962009aadae936bf5198095f0b1d3e89f5dc8d08be7e3ccb5123af2d8",
                    "puzzle_hash": "0x75f7052246d2da738d105b735e7f3fa945f93270d5d5c6e18ea9ef7eaa939632"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": null,
            "to_address": "txch1s6a6j3rkeahqcf02ujm7m5nmkvzqr66n49cx3qlunqm9h8s46asqm0tk5d",
            "to_puzzle_hash": "0x86bba94476cf6e0c25eae4b7edd27bb30401eb53a9706883fc98365b9e15d760",
            "trade_id": null,
            "type": 1,
            "wallet_id": 1
        },
        {
            "additions": [
                {
                    "amount": 1,
                    "parent_coin_info": "0x1b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b",
                    "puzzle_hash": "0xaff7139c2d31a2e4244d745baad309c857edf7dc4190e0619f475a80d1099906"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0x720630bc5e8d8dbddb297f96f765a1eec34e7fd9fc333f143c359cf16858d290",
                    "puzzle_hash": "0x56d7629bc6b66c3b6ab9765c53603961fe7fab44b5985e038ba06f56a3ad26b5"
                },
                {
                    "amount": 4999699999998,
                    "parent_coin_info": "0x653a6248d7c2b308a35fd8b3f529c9dc485ba76f87621a4b62143edd06dd7be0",
                    "puzzle_hash": "0xc32479a76e578a51deb053c32a2116bb9cc3b80f49d26b5aaa58d032b3770058"
                }
            ],
            "amount": 1,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1687537276,
            "fee_amount": 100000000,
            "memos": {
                "a3981ceeb0a4b0c443d0d9b7c9c6777960978f96b1c7f522111e31dce4076d07": "08db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088",
                "afa6c6e09641c42b484392772902be8809c76c7790dd39742606f045a14040c0": "070216d3ac8d37d1fc72e4259c7a96103e4de49935c9a8b7ab7ebe78513fae02"
            },
            "name": "0x17c5e475f9bcda500ef12484d0aca31c0674cd4f10bf90456f30344963d7ef76",
            "removals": [
                {
                    "amount": 1,
                    "parent_coin_info": "0x64c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136",
                    "puzzle_hash": "0x34557d1304533235fa1713a5eafcb23ffca18e8696c0d4fb92bd02c901c9d556"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0xddb4dcaa641f2c10b7373a2bbf8571b4f761aea557f27e816a913a0b1fb5d1ec",
                    "puzzle_hash": "0x56d7629bc6b66c3b6ab9765c53603961fe7fab44b5985e038ba06f56a3ad26b5"
                },
                {
                    "amount": 4999799999998,
                    "parent_coin_info": "0xfcf2249962009aadae936bf5198095f0b1d3e89f5dc8d08be7e3ccb5123af2d8",
                    "puzzle_hash": "0x75f7052246d2da738d105b735e7f3fa945f93270d5d5c6e18ea9ef7eaa939632"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": {
                "aggregated_signature": "0xafd0baafa738e7cfffe67c1acaa34e0b3d38c0c2e7922dac3f4a0de77ab4c888a9bef3789d796af83ba87a3a17560f831090f7286480aa09e36fde23b6e515df5c311f0b82c6a500c178172df8c873deafe1b1344a3449f61d7f8fb0d075c428",
                "coin_spends": [
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0x64c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136",
                            "puzzle_hash": "0x34557d1304533235fa1713a5eafcb23ffca18e8696c0d4fb92bd02c901c9d556"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0d2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4ea0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3affff04ff02ffff04ff05ffff04ff17ffff04ff2fffff04ff0bffff04ffff02ff5fff81bf80ff8080808080808080ffff04ffff01ffffff02ff3304ff01ff0101ffff02ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff14ff3880ffff0bff12ffff0bff12ffff0bff14ff2c80ff0980ffff0bff12ff0bffff0bff14ff8080808080ff8080808080ffff010b80ff0180ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff5fffff01ffff80ff80ff8080808080808080808080ffff04ffff03ff820b7fff820b7fffff04ff3cff808080ffff02ffff03ff81bfffff01ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff8201bfffff04ffff02ffff03ffff09ff82023fff2880ffff01ff02ffff03ffff18ff820b3fffff010180ffff01ff02ffff03ffff20ff82027f80ffff01ff04ff82033fffff04ff82057fffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff0180ffff01ff02ffff03ffff09ff82023fffff0181f680ffff01ff02ffff03ffff20ff82057f80ffff01ff04ff82027fffff04ffff02ff0bffff04ff2fffff04ff5fffff04ff82033fff8080808080ffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff018080ff0180ff80808080808080808080ffff01ff04ffff04ff28ffff04ffff02ff2effff04ff02ffff04ff05ffff04ff82047fffff04ffff0bff14ffff02ffff03ff82157fffff0182157fffff011780ff018080ffff04ffff02ffff03ff82157fffff0182157fffff011780ff0180ffff04ffff02ff3effff04ff02ffff04ff82097fff80808080ffff04ffff0bff14ff0580ff808080808080808080ff82067f8080ff822d7f8080ff018080ffff0bff12ffff0bff14ff1080ffff0bff12ffff0bff12ffff0bff14ff2c80ff0580ffff0bff12ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff14ff1480ff8080808080ffff0bff14ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff01ffa01cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4b80ffff04ffff01ff02ffff01ff02ffff01ff02ff02ffff04ff02ffff04ffff02ff05ffff04ff4fffff04ff81afffff04ffff04ff0bffff04ff17ffff04ff82016fff80808080ff8080808080ff80808080ffff04ffff01ff04ff15ffff04ff2dffff04ffff04ff09ff5d80ff80808080ff018080ffff04ffff01ff02ffff01ff02ffff01ff04ffff04ff02ffff04ffff0bff4fffff02ffff03ff81efffff01ff02ff0bffff04ff05ffff04ff81afff5f808080ffff010580ff0180ffff02ffff03ff81efffff0182016fffff0181af80ff018080ff808080ffff02ff17ff81bf8080ffff04ffff0147ff018080ffff04ffff01a08b75b2ced8cdd1081021552f490618fb8b0c39e46ee5c5f9d46b6b7f9d8a8a74ffff04ffff01ff02ffff01ff02ffff01ff02ffff01ff02ff1effff04ff02ffff04ff0bffff04ff2fffff04ff5fffff04ff8205ffffff04ff820bffffff04ff8217ffffff04ffff02ff1affff04ff02ffff04ff17ffff04ffff02ff1affff04ff02ffff04ff05ffff04ffff0bff08ff8202ff80ffff04ffff02ff1affff04ff02ffff04ff82017fffff04ffff0bff08ff82017f80ff8080808080ffff04ff81bfff80808080808080ff8080808080ff80808080808080808080ffff04ffff01ffff01ff02ff02ffff03ff05ffff01ff0bff72ffff02ff16ffff04ff02ffff04ff09ffff04ffff02ff1cffff04ff02ffff04ff0dff80808080ff808080808080ffff016280ff0180ffffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ff0bff52ffff02ff16ffff04ff02ffff04ff05ffff04ffff02ff1cffff04ff02ffff04ff07ff80808080ff808080808080ffff0bff14ffff0bff14ff62ff0580ffff0bff14ff0bff428080ff02ff1affff04ff02ffff04ff0bffff04ffff0bff14ffff0bff08ff0b80ffff0bff14ffff0bff08ff81bf80ff178080ffff04ffff02ff1affff04ff02ffff04ff05ffff04ffff0bff08ff0580ffff04ff5fffff04ff82017fffff04ffff0bff08ff82017f80ffff04ff2fff808080808080808080ff808080808080ff018080ffff04ffff01a0b982796850336aabf9ab17c3f21e299f0c633444117ab5e9ebeafadf1860d9fcffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff01a04218fbebbb6f3c0907ebe8a672fa5d1e4bc655645a3a0073601e6c9b50b07c47ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0520e10fa83a9bf74c52870cf41a5c5e7bbaa82c0f5838276f27bd88b4886d4c7ffff04ffff01a053f87e8879fd7b0accd777ffe724b47373993c03d1814958211ecae6c69e6ec5ff0180808080808080ffff04ffff01a0dd12ebf70feba2ee45dc25b7de7a53a8cd9e82e0b5648fabea5e998b890ed86dff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ffff07ff5f80ffff01ff04ffff03ff8202dfffff04ff27ff8202df80ff8080ffff04ff8205dfffff04ffff04ffff04ff08ffff04ff82015fff808080ffff04ffff04ff14ffff04ffff0bffff0bff56ffff0bff0affff0bff0aff66ff0580ffff0bff0affff0bff76ffff0bff0affff0bff0aff66ffff0bff0affff0bff1cff0580ffff0bff0affff0bff1cff2780ffff0bff1cff0b80808080ffff0bff0affff0bff76ffff0bff0affff0bff0aff66ff819f80ffff0bff0aff66ff46808080ff46808080ff46808080ffff0bff82015fffff02ff1effff04ff02ffff04ff8202dfff80808080ff8205df8080ff808080ff808080ff80808080ffff01ff02ffff03ff5fffff01ff04ff80ffff04ff5fffff01ff80808080ffff01ff04ffff04ff27ff3780ffff01ff80ff80808080ff018080ff0180ffff04ffff01ffff46ff3f01ff02ffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff01808080ff0180808080ff018080ffff04ffff01a0e00c460366d00066f75597edfb72ddfcfd0d336d67f85dc2671498900ba2810effff04ffff01ff02ffff01ff02ffff01ff02ffff03ff2fffff01ff02ffff03ffff09ff0bffff02ff16ffff04ff02ffff04ff5fff8080808080ffff01ff02ff5fff81bf80ffff01ff088080ff0180ffff01ff02ffff03ffff09ff17ffff02ff16ffff04ff02ffff04ff5fff8080808080ffff01ff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff5fff81bf80ff808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffff33ff0102ffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff16ffff04ff02ffff04ff09ff80808080ffff02ff16ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff17ffff01ff02ffff03ffff09ff47ff0880ffff01ff04ffff04ff08ffff04ffff0bff2affff0bff1cffff0bff1cff32ff0580ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff058080ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff0b8080ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff81a78080ffff0bff1cff32ff22808080ff22808080ff22808080ff22808080ff81e78080ffff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ff37ff80808080808080ffff01ff04ff27ffff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ff37ff8080808080808080ff0180ff8080ff0180ff018080ffff04ffff01a000848115554ea674131f89f311707a959ad3f4647482648f3fe91ba289131f51ffff04ffff01a0ae616e8425823c1267d088f82145c3107283379598c75723b55fa15daed2c89affff04ffff01a022718ff70dd4317538ad144b514b80f0413d8a88f6c60ee1f795dc116c9dbe4bff0180808080ff01808080808080ff01808080",
                        "solution": "0xffffa0d2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4effa043309e9613bc9d8156b52cfe1e396b43448c59286bf0b3d3dd283eeea7eb9c09ff0180ff01ffffff80ffff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b621e6c5d498b1b66886c07a68b498b1116ad9ce9fa825583d9f9e57c9f95689e230accc99186f71510577890d458cbdff018080ffff80ffff01ffff33ffa008db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088ff01ffffa008db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d60888080ffff3cffa01b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b80ffff81f6ffffa0d2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4eff0180ffff80ffa0d2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e80ffffa0c6fd05ffe8312a09f90fd3ac3f45442d3adc24a3ffb5fd6934939a13565c52b1ffa01b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987bffa096c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3ff80808080ff8080808080"
                    },
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0xddb4dcaa641f2c10b7373a2bbf8571b4f761aea557f27e816a913a0b1fb5d1ec",
                            "puzzle_hash": "0x56d7629bc6b66c3b6ab9765c53603961fe7fab44b5985e038ba06f56a3ad26b5"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa01cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b096ba725bd3974fcb97a03d68b39605239c00050f6021a6f029d0e3c12ba0e15320608b69de24fab81e9983eb8c16b9e3ff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa01cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
                        "solution": "0xffffa01cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4bffa0c6fd05ffe8312a09f90fd3ac3f45442d3adc24a3ffb5fd6934939a13565c52b1ff0180ff01ffff01ffff80ffff01ffff33ffa0c6fd05ffe8312a09f90fd3ac3f45442d3adc24a3ffb5fd6934939a13565c52b1ff01ffffa0070216d3ac8d37d1fc72e4259c7a96103e4de49935c9a8b7ab7ebe78513fae028080ffff3effa05c5d1e036fef46a325084587cece6fbd90969153b643f1ee0ec7d4e44a0f29a18080ff80808080"
                    },
                    {
                        "coin": {
                            "amount": 4999799999998,
                            "parent_coin_info": "0xfcf2249962009aadae936bf5198095f0b1d3e89f5dc8d08be7e3ccb5123af2d8",
                            "puzzle_hash": "0x75f7052246d2da738d105b735e7f3fa945f93270d5d5c6e18ea9ef7eaa939632"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b095da6e852d85a01103de927984ecd7368be3ec3ff003380d33c77a90947caaead80640bec0447f5338990d07988535dbff018080",
                        "solution": "0xff80ffff01ffff33ffa0c32479a76e578a51deb053c32a2116bb9cc3b80f49d26b5aaa58d032b3770058ff86048c1557acfe80ffff34ff8405f5e10080ffff3cffa0278da82ea9c4053cc2d189918632e819348b923d5ec600d41f7761c68a9e1be080ffff3dffa048f300a9148586907532753631c608149514c98ba6ea0e4415ba7c9ab29b745d8080ff8080"
                    }
                ]
            },
            "to_address": "txch1prde27n2k5338dz2qqn8dq5z4cc50kcr6efxhx8rnd9ev2savzyq0ew26n",
            "to_puzzle_hash": "0x08db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088",
            "trade_id": null,
            "type": 1,
            "wallet_id": 4
        }
    ]
}
```

After this transaction has been confirmed on the blockchain, the new **credential holder** can confirm that the proofs are included. First, the credential holder needs to run the same command as the proof provider to add the proofs to the local database. For example:

```json
chia rpc wallet vc_add_proofs '{"proofs": {"example_proof_1": "example_value_1", "example_proof_2": "example_value_2"}}'
```

Response:

```json
{
    "success": true
}
```

Next, the credential holder can run the [vc_get](/vc-rpc#vc_get) RPC:

```json
chia rpc wallet vc_get '{"vc_id": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e"}'
```

Result:

```json
{
    "success": true,
    "vc_record": {
        "confirmed_at_height": 2813720,
        "vc": {
            "coin": {
                "amount": 1,
                "parent_coin_info": "0x1b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b",
                "puzzle_hash": "0xaff7139c2d31a2e4244d745baad309c857edf7dc4190e0619f475a80d1099906"
            },
            "eml_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x5f405810abf8d6e690cfcea3409300e71b23a8362b47068d88d7aaa296278aaf",
                "parent_name": "0x64c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136",
                "parent_proof_hash": "0x69037cc8334927175cffb30007545a95a9b06b56b0ebcec8213cc26adad3f43b"
            },
            "inner_puzzle_hash": "0x08db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088",
            "launcher_id": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e",
            "proof_hash": "0x96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3",
            "proof_provider": "0x1cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4b",
            "singleton_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x72404cf61f085ad55ee5632646aedb69e0129eaa4a8910a0f579c46f9bfd317c",
                "parent_name": "0x64c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136"
            }
        }
    }
}
```

The credential holder can also call the [vc_get_list](/vc-rpc#vc_get_list) RPC to get a complete list of VCs controlled by that wallet, along with all stored proofs:

```json
chia rpc wallet vc_get_list
```

Response:

```json
{
    "proofs": {
        "96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3": {
            "example_proof_1": "example_value_1",
            "example_proof_2": "example_value_2"
        }
    },
    "success": true,
    "vc_records": [
        {
            "coin_id": "0xa3981ceeb0a4b0c443d0d9b7c9c6777960978f96b1c7f522111e31dce4076d07",
            "confirmed_at_height": 2813720,
            "vc": {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0x1b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b",
                    "puzzle_hash": "0xaff7139c2d31a2e4244d745baad309c857edf7dc4190e0619f475a80d1099906"
                },
                "eml_lineage_proof": {
                    "amount": 1,
                    "inner_puzzle_hash": "0x5f405810abf8d6e690cfcea3409300e71b23a8362b47068d88d7aaa296278aaf",
                    "parent_name": "0x64c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136",
                    "parent_proof_hash": "0x69037cc8334927175cffb30007545a95a9b06b56b0ebcec8213cc26adad3f43b"
                },
                "inner_puzzle_hash": "0x08db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088",
                "launcher_id": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e",
                "proof_hash": "0x96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3",
                "proof_provider": "0x1cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4b",
                "singleton_lineage_proof": {
                    "amount": 1,
                    "inner_puzzle_hash": "0x72404cf61f085ad55ee5632646aedb69e0129eaa4a8910a0f579c46f9bfd317c",
                    "parent_name": "0x64c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136"
                }
            }
        }
    ]
}
```

### Revoke a VC

Typically, the proof provider only needs to mint a VC, add proofs, and transfer the VC to the new holder. However, at some point, a holder's proofs may change. For example, a holder might have originally proven that they were not a US citizen, and then they later became a US citizen.

In cases such as this, the proof provider needs to _revoke_ the credentials, ie to remove all proofs from a VC. (The holder will continue to hold the VC, but it will no longer contain any proofs.) We don't allow the proof provider to take back the VC itself because it is possible for it to custody other assets, though we don't support this yet.

The only wallet that is allowed to revoke credentials is the proof provider's (the wallet that contains the DID used to mint the VC).

In order to run the [vc_revoke](/vc-rpc#vc_revoke) command, the proof provider will need to know the parent coin ID (the `vc_parent_id` parameter). 

For testing purposes, the **holder's wallet** can obtain the parent coin ID by running the [vc_get](/vc-rpc#vc_get) RPC. In a production environment, the proof provider will track the VC on-chain and obtain this info immediately prior to revoking the VC.

```json
chia rpc wallet vc_get '{"vc_id": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e"}'
```

The response will contain pertinent info about the VC, including its `parent_coin_info`:

```json
{
    "success": true,
    "vc_record": {
        "confirmed_at_height": 2813720,
        "vc": {
            "coin": {
                "amount": 1,
                "parent_coin_info": "0x1b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b",
                "puzzle_hash": "0xaff7139c2d31a2e4244d745baad309c857edf7dc4190e0619f475a80d1099906"
            },
            "eml_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x5f405810abf8d6e690cfcea3409300e71b23a8362b47068d88d7aaa296278aaf",
                "parent_name": "0x64c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136",
                "parent_proof_hash": "0x69037cc8334927175cffb30007545a95a9b06b56b0ebcec8213cc26adad3f43b"
            },
            "inner_puzzle_hash": "0x08db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088",
            "launcher_id": "0xd2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4e",
            "proof_hash": "0x96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3",
            "proof_provider": "0x1cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4b",
            "singleton_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x72404cf61f085ad55ee5632646aedb69e0129eaa4a8910a0f579c46f9bfd317c",
                "parent_name": "0x64c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136"
            }
        }
    }
}
```

The revocation command then uses the `parent_coin_info` as the `vc_parent_id` parameter:

```json
chia rpc wallet vc_revoke '{"vc_parent_id": "0x1b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b", "fee": 100000000}'
```

As a result, the VC will be recreated in the same wallet, but without any proofs:

```json
{
    "success": true,
    "transactions": [
        {
            "additions": [
                {
                    "amount": 1,
                    "parent_coin_info": "0xa3981ceeb0a4b0c443d0d9b7c9c6777960978f96b1c7f522111e31dce4076d07",
                    "puzzle_hash": "0x160c23f1632e49d5d2d978805d9319f242745f607525b72b55bee2a10e2206f2"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0xafa6c6e09641c42b484392772902be8809c76c7790dd39742606f045a14040c0",
                    "puzzle_hash": "0x56d7629bc6b66c3b6ab9765c53603961fe7fab44b5985e038ba06f56a3ad26b5"
                }
            ],
            "amount": 1,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1687537712,
            "fee_amount": 100000000,
            "memos": {
                "c5b0a0ad6dd223b30ba36f92c02bed3daae0c18112523bde11c4e3b41bbeea7e": "070216d3ac8d37d1fc72e4259c7a96103e4de49935c9a8b7ab7ebe78513fae02"
            },
            "name": "0xafdcc45f0ec1caf4d573b6702671c1c89ff57a0b8e8dc8a200a85b3e1f944600",
            "removals": [
                {
                    "amount": 1,
                    "parent_coin_info": "0x1b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b",
                    "puzzle_hash": "0xaff7139c2d31a2e4244d745baad309c857edf7dc4190e0619f475a80d1099906"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0x720630bc5e8d8dbddb297f96f765a1eec34e7fd9fc333f143c359cf16858d290",
                    "puzzle_hash": "0x56d7629bc6b66c3b6ab9765c53603961fe7fab44b5985e038ba06f56a3ad26b5"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": {
                "aggregated_signature": "0xa3bf587c41b621096a761b79482ceca9db46fa31641b4bbfd68187cfd210233c4a92f365dbd37f03483f50c95adf06fb0796ba0b73711a3ebcd1750e7f3da44bc20f5180c146863b11c3e77bb9e0f0d84722c032105b99cc26dfca718db9f385",
                "coin_spends": [
                    {
                        "coin": {
                            "amount": 4999699999998,
                            "parent_coin_info": "0x653a6248d7c2b308a35fd8b3f529c9dc485ba76f87621a4b62143edd06dd7be0",
                            "puzzle_hash": "0xc32479a76e578a51deb053c32a2116bb9cc3b80f49d26b5aaa58d032b3770058"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0aa8d1b491839d1b757fcf787787782e5502233955073b64d434f4dec0fa5f7c7c1fb1f5efc1a3afde7185deac8035925ff018080",
                        "solution": "0xff80ffff01ffff33ffa060e63f11c26184b3c6ee387db1bca32312ef49b1c69dfb1d663a03b6e92df0baff86048c0f61cbfe80ffff34ff8405f5e10080ffff3cffa05c32eabf1eb0f4a6c3eb3e059f5c40877c95ec65fa018afed02ca88128ffc6fc80ffff3dffa0960d6eef2fe3565dee96fd4fb912133c0ce5428cb6dc2578a9f9c5fea6027ff08080ff8080"
                    },
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0x1b4136963ef41ece657772ef70ca9d23b03c42a16ecb8f57748d7fdc90e0987b",
                            "puzzle_hash": "0xaff7139c2d31a2e4244d745baad309c857edf7dc4190e0619f475a80d1099906"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0d2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4ea0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3affff04ff02ffff04ff05ffff04ff17ffff04ff2fffff04ff0bffff04ffff02ff5fff81bf80ff8080808080808080ffff04ffff01ffffff02ff3304ff01ff0101ffff02ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff14ff3880ffff0bff12ffff0bff12ffff0bff14ff2c80ff0980ffff0bff12ff0bffff0bff14ff8080808080ff8080808080ffff010b80ff0180ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff5fffff01ffff80ff80ff8080808080808080808080ffff04ffff03ff820b7fff820b7fffff04ff3cff808080ffff02ffff03ff81bfffff01ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff8201bfffff04ffff02ffff03ffff09ff82023fff2880ffff01ff02ffff03ffff18ff820b3fffff010180ffff01ff02ffff03ffff20ff82027f80ffff01ff04ff82033fffff04ff82057fffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff0180ffff01ff02ffff03ffff09ff82023fffff0181f680ffff01ff02ffff03ffff20ff82057f80ffff01ff04ff82027fffff04ffff02ff0bffff04ff2fffff04ff5fffff04ff82033fff8080808080ffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff018080ff0180ff80808080808080808080ffff01ff04ffff04ff28ffff04ffff02ff2effff04ff02ffff04ff05ffff04ff82047fffff04ffff0bff14ffff02ffff03ff82157fffff0182157fffff011780ff018080ffff04ffff02ffff03ff82157fffff0182157fffff011780ff0180ffff04ffff02ff3effff04ff02ffff04ff82097fff80808080ffff04ffff0bff14ff0580ff808080808080808080ff82067f8080ff822d7f8080ff018080ffff0bff12ffff0bff14ff1080ffff0bff12ffff0bff12ffff0bff14ff2c80ff0580ffff0bff12ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff14ff1480ff8080808080ffff0bff14ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff01ffa01cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4ba096c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3ffff04ffff01ff02ffff01ff02ffff01ff02ff02ffff04ff02ffff04ffff02ff05ffff04ff4fffff04ff81afffff04ffff04ff0bffff04ff17ffff04ff82016fff80808080ff8080808080ff80808080ffff04ffff01ff04ff15ffff04ff2dffff04ffff04ff09ff5d80ff80808080ff018080ffff04ffff01ff02ffff01ff02ffff01ff04ffff04ff02ffff04ffff0bff4fffff02ffff03ff81efffff01ff02ff0bffff04ff05ffff04ff81afff5f808080ffff010580ff0180ffff02ffff03ff81efffff0182016fffff0181af80ff018080ff808080ffff02ff17ff81bf8080ffff04ffff0147ff018080ffff04ffff01a08b75b2ced8cdd1081021552f490618fb8b0c39e46ee5c5f9d46b6b7f9d8a8a74ffff04ffff01ff02ffff01ff02ffff01ff02ffff01ff02ff1effff04ff02ffff04ff0bffff04ff2fffff04ff5fffff04ff8205ffffff04ff820bffffff04ff8217ffffff04ffff02ff1affff04ff02ffff04ff17ffff04ffff02ff1affff04ff02ffff04ff05ffff04ffff0bff08ff8202ff80ffff04ffff02ff1affff04ff02ffff04ff82017fffff04ffff0bff08ff82017f80ff8080808080ffff04ff81bfff80808080808080ff8080808080ff80808080808080808080ffff04ffff01ffff01ff02ff02ffff03ff05ffff01ff0bff72ffff02ff16ffff04ff02ffff04ff09ffff04ffff02ff1cffff04ff02ffff04ff0dff80808080ff808080808080ffff016280ff0180ffffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ff0bff52ffff02ff16ffff04ff02ffff04ff05ffff04ffff02ff1cffff04ff02ffff04ff07ff80808080ff808080808080ffff0bff14ffff0bff14ff62ff0580ffff0bff14ff0bff428080ff02ff1affff04ff02ffff04ff0bffff04ffff0bff14ffff0bff08ff0b80ffff0bff14ffff0bff08ff81bf80ff178080ffff04ffff02ff1affff04ff02ffff04ff05ffff04ffff0bff08ff0580ffff04ff5fffff04ff82017fffff04ffff0bff08ff82017f80ffff04ff2fff808080808080808080ff808080808080ff018080ffff04ffff01a0b982796850336aabf9ab17c3f21e299f0c633444117ab5e9ebeafadf1860d9fcffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff01a04218fbebbb6f3c0907ebe8a672fa5d1e4bc655645a3a0073601e6c9b50b07c47ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0520e10fa83a9bf74c52870cf41a5c5e7bbaa82c0f5838276f27bd88b4886d4c7ffff04ffff01a053f87e8879fd7b0accd777ffe724b47373993c03d1814958211ecae6c69e6ec5ff0180808080808080ffff04ffff01a0dd12ebf70feba2ee45dc25b7de7a53a8cd9e82e0b5648fabea5e998b890ed86dff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ffff07ff5f80ffff01ff04ffff03ff8202dfffff04ff27ff8202df80ff8080ffff04ff8205dfffff04ffff04ffff04ff08ffff04ff82015fff808080ffff04ffff04ff14ffff04ffff0bffff0bff56ffff0bff0affff0bff0aff66ff0580ffff0bff0affff0bff76ffff0bff0affff0bff0aff66ffff0bff0affff0bff1cff0580ffff0bff0affff0bff1cff2780ffff0bff1cff0b80808080ffff0bff0affff0bff76ffff0bff0affff0bff0aff66ff819f80ffff0bff0aff66ff46808080ff46808080ff46808080ffff0bff82015fffff02ff1effff04ff02ffff04ff8202dfff80808080ff8205df8080ff808080ff808080ff80808080ffff01ff02ffff03ff5fffff01ff04ff80ffff04ff5fffff01ff80808080ffff01ff04ffff04ff27ff3780ffff01ff80ff80808080ff018080ff0180ffff04ffff01ffff46ff3f01ff02ffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff01808080ff0180808080ff018080ffff04ffff01a0e00c460366d00066f75597edfb72ddfcfd0d336d67f85dc2671498900ba2810effff04ffff01ff02ffff01ff02ffff01ff02ffff03ff2fffff01ff02ffff03ffff09ff0bffff02ff16ffff04ff02ffff04ff5fff8080808080ffff01ff02ff5fff81bf80ffff01ff088080ff0180ffff01ff02ffff03ffff09ff17ffff02ff16ffff04ff02ffff04ff5fff8080808080ffff01ff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff5fff81bf80ff808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffff33ff0102ffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff16ffff04ff02ffff04ff09ff80808080ffff02ff16ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff17ffff01ff02ffff03ffff09ff47ff0880ffff01ff04ffff04ff08ffff04ffff0bff2affff0bff1cffff0bff1cff32ff0580ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff058080ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff0b8080ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff81a78080ffff0bff1cff32ff22808080ff22808080ff22808080ff22808080ff81e78080ffff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ff37ff80808080808080ffff01ff04ff27ffff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ff37ff8080808080808080ff0180ff8080ff0180ff018080ffff04ffff01a000848115554ea674131f89f311707a959ad3f4647482648f3fe91ba289131f51ffff04ffff01a0ae616e8425823c1267d088f82145c3107283379598c75723b55fa15daed2c89affff04ffff01a008db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088ff0180808080ff01808080808080ff01808080",
                        "solution": "0xffffa064c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136ffa072404cf61f085ad55ee5632646aedb69e0129eaa4a8910a0f579c46f9bfd317cff0180ff01ffffff01ffff02ffff01ff02ffff01ff04ffff04ff18ffff04ffff02ff2effff04ff02ffff04ff05ffff04ffff0bff12ffff0bff3cff0580ffff0bff12ffff0bff3cff81bf80ff0b8080ffff04ffff02ff2effff04ff02ffff04ff17ffff04ffff0bff3cff1780ffff04ff82017fffff04ff8202ffffff04ffff0bff3cff8202ff80ffff04ffff02ff2effff04ff02ffff04ff2fffff04ffff0bff3cff2f80ffff04ff8205ffffff04ffff0bff3cff820bff80ff80808080808080ff808080808080808080ff808080808080ff808080ffff04ffff04ff10ffff04ff8217ffff808080ffff04ffff04ff14ffff04ff820bffffff04ff8217ffff80808080ffff04ffff04ff2cffff04ff82bfffff808080ffff04ffff04ffff0181f6ffff04ff822fffffff04ffff04ff825fffffff04ff81bfff808080ffff04ffff04ff83027fffffff04ff83057fffffff04ff80ffff04ff5fff8080808080ff8080808080ff808080808080ffff04ffff01ffffff4948ff33ff3c01ffff02ff02ffff03ff05ffff01ff0bff76ffff02ff3effff04ff02ffff04ff09ffff04ffff02ff1affff04ff02ffff04ff0dff80808080ff808080808080ffff016680ff0180ffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ffff0bff56ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff1affff04ff02ffff04ff07ff80808080ff808080808080ff0bff12ffff0bff12ff66ff0580ffff0bff12ff0bff468080ff018080ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0520e10fa83a9bf74c52870cf41a5c5e7bbaa82c0f5838276f27bd88b4886d4c7ffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff01a000848115554ea674131f89f311707a959ad3f4647482648f3fe91ba289131f51ffff04ffff01a0664e6e57ac6a184334a3e743c446c5d28c0dd2ae6f84bad6dacec29ab7a0bd43ff01808080808080ffffa0d2097d50519925faa13b224257a4e5ddca4f5234230fc5b1606552325a2d3a4effa0534194946506ac64d2cc4e72f4808e978e7cfac4c70686f7226184fde279c4bdffa0e00c460366d00066f75597edfb72ddfcfd0d336d67f85dc2671498900ba2810effa0e360bd07b1d45411f7a1d28741de03b66ab29dce584e3bf8c3f80ae5c7070f92ffa008db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088ff01ffffa064c61415d7e8dc212cefde59602aebeba2388fbb2fd559508e6a24988e625136ffa05f405810abf8d6e690cfcea3409300e71b23a8362b47068d88d7aaa296278aafff0180ffa069037cc8334927175cffb30007545a95a9b06b56b0ebcec8213cc26adad3f43bffa0561beddfb34781d98af7c9beaa67ededc32b566b43ca8b01b2bf141df940a613ffffa0c6fd05ffe8312a09f90fd3ac3f45442d3adc24a3ffb5fd6934939a13565c52b1ffa0a3981ceeb0a4b0c443d0d9b7c9c6777960978f96b1c7f522111e31dce4076d078080808080"
                    },
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0x720630bc5e8d8dbddb297f96f765a1eec34e7fd9fc333f143c359cf16858d290",
                            "puzzle_hash": "0x56d7629bc6b66c3b6ab9765c53603961fe7fab44b5985e038ba06f56a3ad26b5"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa01cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b096ba725bd3974fcb97a03d68b39605239c00050f6021a6f029d0e3c12ba0e15320608b69de24fab81e9983eb8c16b9e3ff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa01cd9b7062eda3f0fd8b556dd01ed3e6fedfe11649f4fb465d9fd6b7acf319b4ba0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
                        "solution": "0xffffa0ddb4dcaa641f2c10b7373a2bbf8571b4f761aea557f27e816a913a0b1fb5d1ecffa0c6fd05ffe8312a09f90fd3ac3f45442d3adc24a3ffb5fd6934939a13565c52b1ff0180ff01ffff01ffff80ffff01ffff33ffa0c6fd05ffe8312a09f90fd3ac3f45442d3adc24a3ffb5fd6934939a13565c52b1ff01ffffa0070216d3ac8d37d1fc72e4259c7a96103e4de49935c9a8b7ab7ebe78513fae028080ffff3dffa0960d6eef2fe3565dee96fd4fb912133c0ce5428cb6dc2578a9f9c5fea6027ff080ffff3effa0e707101647c483550aafb4221862a068a89b001ed2d9ff8c4b4b7d747deda7d78080ff80808080"
                    }
                ]
            },
            "to_address": "txch1prde27n2k5338dz2qqn8dq5z4cc50kcr6efxhx8rnd9ev2savzyq0ew26n",
            "to_puzzle_hash": "0x08db957a6ab52313b44a0026768282ae3147db03d6526b98e39b4b962a1d6088",
            "trade_id": null,
            "type": 1,
            "wallet_id": 4
        },
        {
            "additions": [
                {
                    "amount": 4999599999998,
                    "parent_coin_info": "0xdeb812bdc6ba2999876f9088c057867694faf4c0a3cfcb384a578d673d50347f",
                    "puzzle_hash": "0x60e63f11c26184b3c6ee387db1bca32312ef49b1c69dfb1d663a03b6e92df0ba"
                }
            ],
            "amount": 0,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1687537712,
            "fee_amount": 100000000,
            "memos": {},
            "name": "0xe1adf82a6480190c943f8e37fe4d7f5945dd9fbe2284bf4cb60075b5e33f210f",
            "removals": [
                {
                    "amount": 4999699999998,
                    "parent_coin_info": "0x653a6248d7c2b308a35fd8b3f529c9dc485ba76f87621a4b62143edd06dd7be0",
                    "puzzle_hash": "0xc32479a76e578a51deb053c32a2116bb9cc3b80f49d26b5aaa58d032b3770058"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": null,
            "to_address": "txch169ga7klgwgqlu48anudsmq806f6trn95whz7mztu9aw663ygr8nqkuaxmk",
            "to_puzzle_hash": "0xd151df5be87201fe54fd9f1b0d80efd274b1ccb475c5ed897c2f5dad448819e6",
            "trade_id": null,
            "type": 1,
            "wallet_id": 1
        }
    ]
}
```

After these transactions have been confirmed on-chain, the VC no longer contains any proofs. The holder can verify this:

```json
chia rpc wallet vc_get_list
```

Result:

```json
{
    "proofs": {},
    "success": true,
    "vc_records": []
}
```
