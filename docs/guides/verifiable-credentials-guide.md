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
chia wallet did create
```

The response will include the ID of the newly created DID (it will begin with `did:chia:`). Save your local DID ID for later (it will be different from the one displayed here):

```bash
Successfully created a DID wallet with name None and id 2 on key 1967195615
Successfully created a DID did:chia:1q29qvfzp4hv6kwyrcn22gstkx0yry7dukek8pd4spmcmtzd5m2ysk52jrn in the newly created DID wallet
```

The DID will be created with an on-chain transaction. After this transaction has been confirmed, you can view your DID by running `chia wallet show`:

```bash
chia wallet show
```

Response:

```bash
Wallet height: 2795460
Sync status: Synced
Balances, fingerprint: 1967195615

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
   -DID ID:                did:chia:1q29qvfzp4hv6kwyrcn22gstkx0yry7dukek8pd4spmcmtzd5m2ysk52jrn
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
chia wallet vcs mint -d did:chia:1n2s77g7rer2v62xzrvd0at6tgx8m4g8t6encghs375r64lc6e5mssdkap3 -m 0.0001
```

The response will include some info about the VC, including its ID, the ID of the minting transaction, and the VC's destination wallet:

```bash
New VC with launcher ID minted: 13ba084e78475327e41c60df5a108965d7a283f065b5506e266ffb3563937b6c
Relevant TX records:

Transaction e114763824c11c84bd1e3b5b0ba6540cb2ed2aef0f371170e8beecaac29d87c2
Status: Pending
Amount sent: 1E-12 XCH
To address: txch1at35qwx6djmadnh9v77a72z8vcaxsle36ke3dj26gcpt2fnh654qsqecnj
Created at: 2023-06-15 10:02:31
```

By default, the VC will be minted to the same wallet that runs this command. However, you can also use the `--target-address` parameter to mint the VC to a different address.

When a VC is first minted, it will not contain any proofs.

Previously, you added your desired proofs to the local database and calculated the root hash. The next step is to add your root hash to the VC.

### Add proofs to a VC

Use the [update_proofs](/vc-cli#update_proofs) command to add proofs to a VC. This command must be run from the proof provider's wallet (the wallet that contains the DID used for minting).

The `--new-proof-hash` parameter is required; this hash was included in the response from running the `add_proof_reveal` command. 

The `--new-puzhash` parameter is typically used, but not required. This parameter allows you to recreate the VC singleton in a different wallet (ie to send the VC to the new holder in the same command that is used to add the proof hash). 

:::note

`--new-puzhash` requires a _puzzle hash_ and not a wallet address. If you are not sure how to convert a wallet address to a puzzle hash, the Spacescan explorer includes a handy [puzzle hash converter](https://www.spacescan.io/tools/puzzlehashconverter) tool. If you prefer to do this conversion programmatically, use the `decode` command from the [chia-dev-tools](https://github.com/Chia-Network/chia-dev-tools) repository.

:::

For example, the following command will update the specified VC (`-l`) with a new root hash (`-p`) and send the VC to a new wallet (`-t`), while including a blockchain fee (`-m`):

```bash
chia wallet vcs update_proofs -l 89a4ff17372dd3a8814712c0988b87b508a04cd7fa61d0228ce54b74111e7160 -t 0x6fc9728dcd29358fae2194a1145d54c58acfa4de0380c60f8af377742e67788b -p f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5 -m 0.0001
```

Response:

```bash
Proofs successfully updated!
Relevant TX records:

Transaction 76f5ea8475d695e798518cd405070dc22542e31fc85220ff7d2ca7b44852a45b
Status: Pending
Amount sent: 0 XCH
To address: txch10xjm79zct87gc8ux5vzrhnnt03zjn4ntn5y95w37rsfmp4rxjycquqctuc
Created at: 2023-06-15 10:15:27

Transaction f9eebb0520d024aaf4ae176d554c0f806b8d724d21d5da03b5f541fafd69c99f
Status: Pending
Amount sent: 1E-12 XCH
To address: txch1dlyh9rwd9y6clt3pjjs3gh25ck9vlfx7qwqvvru27dmhgtn80z9s2rruam
Created at: 2023-06-15 10:15:28
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

Launcher ID: 13ba084e78475327e41c60df5a108965d7a283f065b5506e266ffb3563937b6c
Coin ID: fece6f86b2abb162b3273456205e57fb37b11853688bf81b5232b67e3d131190
Inner Address: txch1dlyh9rwd9y6clt3pjjs3gh25ck9vlfx7qwqvvru27dmhgtn80z9s2rruam
Proof Hash: f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
```

### Revoke a VC

Typically, the proof provider only needs to mint a VC, add proofs, and transfer the VC to the new holder. However, at some point, a holder's proofs may change. For example, a holder might have originally proven that they were not a US citizen, and then they later became a US citizen.

In cases such as this, the proof provider needs to _revoke_ the credentials, ie to remove all proofs from a VC. (The holder will continue to hold the VC, but it will no longer contain any proofs.) At this point, the VC will be empty. However, we don't allow the proof provider to take back the VC itself because it is possible for it to custody other assets, though we don't support this yet.

The only wallet that is allowed to revoke credentials is the proof provider's (the wallet that contains the DID used to mint the VC).

In order to run the [revoke](/vc-cli#revoke) command, the proof provider will need to know the parent coin ID (the `-p` parameter). Because VCs are singletons, their parent coin IDs will change every time the VC is spent (every time a change is made).

For testing purposes, the **holder's wallet** can obtain the parent coin ID by running the [vc_get](/vc-rpc#vc_get) RPC. In a production environment, the proof provider will track the VC on-chain and obtain this info immediately prior to revoking the VC.

An example of the revocation command:

```bash
chia wallet vcs revoke -p 72e522fecc64b539f8979b89e4cf2ffbcf8ba985faf4b701bcc882c6aec9e040 -m 0.0001
```

As a result, the VC will be recreated in the same wallet, but without any proofs:

```bash
VC successfully revoked!
Relevant TX records:

Transaction e7c3b6b0bfff5d379cceef9533ed2739c4af7da669c0ffc7c6926ab11bc9cbef
Status: Pending
Amount sent: 1E-12 XCH
To address: txch1dlyh9rwd9y6clt3pjjs3gh25ck9vlfx7qwqvvru27dmhgtn80z9s2rruam
Created at: 2023-06-15 10:45:25

Transaction 9b9de87a5aa626f5256397c4779810b8118f01f20d9d09938d2fc9159f5118da
Status: Pending
Amount sent: 0 XCH
To address: txch15f3f69ye5jfupw7qx5qmhatuqdhrmt4ked28g5k22qck3lsw59qqx2k9qj
```

After these transactions have been confirmed on-chain, the VC no longer contains any proofs. The holder can verify this:

```bash
chia wallet vcs get
```

Result:

```bash
[todo]
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
chia rpc wallet vc_mint '{"did_id": "did:chia:1q29qvfzp4hv6kwyrcn22gstkx0yry7dukek8pd4spmcmtzd5m2ysk52jrn", "target_address": "txch1zvthh0u8v63tcs75fmy7s7ulprl37pz3l4uhtkj5752yqdt9uu2sr4cxfa", "fee": 100000000}'
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
                    "parent_coin_info": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                    "puzzle_hash": "0xa0631f78e1f77cf38c447745d9b64f3016c504df5b426551ef5a75b737cbea09"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                    "puzzle_hash": "0x66713c00a343c14e0929fbae0435789a4d86fe573ea07c46c13cea182be52247"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                    "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
                },
                {
                    "amount": 4999799999998,
                    "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                    "puzzle_hash": "0x96bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5"
                }
            ],
            "amount": 1,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1686810641,
            "fee_amount": 100000000,
            "memos": {
                "34fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c": "13177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e715"
            },
            "name": "0xf20cf177e31898f15f4b82542b7529d7dc89bde7fe9a7d0af5d2197996f1183c",
            "removals": [
                {
                    "amount": 1,
                    "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                    "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                    "puzzle_hash": "0xa0631f78e1f77cf38c447745d9b64f3016c504df5b426551ef5a75b737cbea09"
                },
                {
                    "amount": 4999899999999,
                    "parent_coin_info": "0x82b6d7ed7aac0662437036ddd7db24d667354d405d5d70ab2c2f04e64b7913ed",
                    "puzzle_hash": "0x96bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": {
                "aggregated_signature": "0x94510b28d392f7bf8a9defab72afbd95faf1fd1045617db4ce1106cb6e7f755b9c21dab7ef133e19de4ebbe0307ace2c1578d00a76c7a4131b78d7e591f75c8f44992b0717565e6524761086d512e9aefe9f87a41f2fd073eafc645e33da4272",
                "coin_spends": [
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                            "puzzle_hash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9"
                        },
                        "puzzle_reveal": "0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080",
                        "solution": "0xffa0a0631f78e1f77cf38c447745d9b64f3016c504df5b426551ef5a75b737cbea09ff01ff8080"
                    },
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                            "puzzle_hash": "0xa0631f78e1f77cf38c447745d9b64f3016c504df5b426551ef5a75b737cbea09"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa075ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871da0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3affff04ff02ffff04ff05ffff04ff17ffff04ff2fffff04ff0bffff04ffff02ff5fff81bf80ff8080808080808080ffff04ffff01ffffff02ff3304ff01ff0101ffff02ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff14ff3880ffff0bff12ffff0bff12ffff0bff14ff2c80ff0980ffff0bff12ff0bffff0bff14ff8080808080ff8080808080ffff010b80ff0180ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff5fffff01ffff80ff80ff8080808080808080808080ffff04ffff03ff820b7fff820b7fffff04ff3cff808080ffff02ffff03ff81bfffff01ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff8201bfffff04ffff02ffff03ffff09ff82023fff2880ffff01ff02ffff03ffff18ff820b3fffff010180ffff01ff02ffff03ffff20ff82027f80ffff01ff04ff82033fffff04ff82057fffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff0180ffff01ff02ffff03ffff09ff82023fffff0181f680ffff01ff02ffff03ffff20ff82057f80ffff01ff04ff82027fffff04ffff02ff0bffff04ff2fffff04ff5fffff04ff82033fff8080808080ffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff018080ff0180ff80808080808080808080ffff01ff04ffff04ff28ffff04ffff02ff2effff04ff02ffff04ff05ffff04ff82047fffff04ffff0bff14ffff02ffff03ff82157fffff0182157fffff011780ff018080ffff04ffff02ffff03ff82157fffff0182157fffff011780ff0180ffff04ffff02ff3effff04ff02ffff04ff82097fff80808080ffff04ffff0bff14ff0580ff808080808080808080ff82067f8080ff822d7f8080ff018080ffff0bff12ffff0bff14ff1080ffff0bff12ffff0bff12ffff0bff14ff2c80ff0580ffff0bff12ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff14ff1480ff8080808080ffff0bff14ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff0180ffff04ffff01ff04ffff04ff13ff8080ffff04ff2bffff01ff80808080ffff04ffff01a0a8bd2fd3220e462b6914ec860f3454cb21df9313cf0d5897343d97bb381ce8edffff04ffff01ff02ffff01ff04ffff04ff04ffff04ffff02ff06ffff04ff02ffff04ff05ff80808080ff808080ffff02ff05ff0b8080ffff04ffff01ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ff01808080808080ff01808080",
                        "solution": "0xffffa0fe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70eff0180ff01ffffffff01ffff33ffa0de4e205ece6f8f5371726d1c9c7753c69e751d8a87a375ba19a41b72cf38d443ff01ffffa013177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e7158080ffff01ffa013177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e71580ffff81f6ffa0028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89ffa0056a82c50264e823bbb9e270d055c0b6cfe0456e4344f3654d862be6821dc97c8080ff80808080"
                    },
                    {
                        "coin": {
                            "amount": 4999899999999,
                            "parent_coin_info": "0x82b6d7ed7aac0662437036ddd7db24d667354d405d5d70ab2c2f04e64b7913ed",
                            "puzzle_hash": "0x96bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0924792adc6469af841fb4536a5673ef014e7239a9f27a57882c43dce4f6d1cd751c50d8007d22200a4c71484f9eb3ef8ff018080",
                        "solution": "0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa096bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5ff86048c1b4d8dfe80ffff34ff8405f5e10080ffff3dffa0eaf23db15c67a7693c35862cdb3f0383e7317341c970d5729b89bc4a32c1e00a80ffff3dffa0eb77136ed49c080085a557200c366eb21e4fa521d28e807a9eee5f3f9a901f318080ff8080"
                    }
                ]
            },
            "to_address": "txch1zvthh0u8v63tcs75fmy7s7ulprl37pz3l4uhtkj5752yqdt9uu2sr4cxfa",
            "to_puzzle_hash": "0x13177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e715",
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
                "parent_coin_info": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                "puzzle_hash": "0x66713c00a343c14e0929fbae0435789a4d86fe573ea07c46c13cea182be52247"
            },
            "eml_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": null,
                "parent_name": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                "parent_proof_hash": null
            },
            "inner_puzzle_hash": "0x13177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e715",
            "launcher_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
            "proof_hash": null,
            "proof_provider": "0x028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89",
            "singleton_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x43309e9613bc9d8156b52cfe1e396b43448c59286bf0b3d3dd283eeea7eb9c09",
                "parent_name": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d"
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

`new_puzhash` requires a _puzzle hash_ and not a wallet address. If you are not sure how to convert a wallet address to a puzzle hash, the Spacescan explorer includes a handy [puzzle hash converter](https://www.spacescan.io/tools/puzzlehashconverter) tool. If you prefer to do this conversion programmatically, use the `decode` command from the [chia-dev-tools](https://github.com/Chia-Network/chia-dev-tools) repository.

:::

For example, this command will update the specified `vc_id` with a `new_proof_hash` and send the VC to a `new_puzhash`, while including a blockchain `fee`:

```json
chia rpc wallet vc_spend '{"vc_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d", "new_puzhash": "0x0b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2", "new_proof_hash": "96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3", "fee": 100000000}'
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
                    "parent_coin_info": "0x8c286c4ca46557cace8330d2d3c1c0651e24e73de11bb395ce3534bd5e2e06c1",
                    "puzzle_hash": "0x056b5fcf0f5d63b814ebef228c39869f3d7800c97a4e875623f7b0769e2b02e0"
                }
            ],
            "amount": 0,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1686811885,
            "fee_amount": 100000000,
            "memos": {},
            "name": "0x61008b8cb78524edaead83b108c5b2e13196b94e35ee4b6e3a70e13d9de46757",
            "removals": [
                {
                    "amount": 4999799999998,
                    "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                    "puzzle_hash": "0x96bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": null,
            "to_address": "txch1v6m950zmnmfnlvxn0cj8eyqndwwjp3lzdy2zpdnwe0sq334trrvqly67jv",
            "to_puzzle_hash": "0x66b65a3c5b9ed33fb0d37e247c90136b9d20c7e2691420b66ecbe008c6ab18d8",
            "trade_id": null,
            "type": 1,
            "wallet_id": 1
        },
        {
            "additions": [
                {
                    "amount": 1,
                    "parent_coin_info": "0x34fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c",
                    "puzzle_hash": "0x2c915311c3e0d8f23c5ab2647dd97a8abeb1db53c85ebdc9fea16b8745d1bdf1"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0x76fb0e14c60a40e75e599eca5675f3d888c8b1a2bb7b5ec4469cd122113641b6",
                    "puzzle_hash": "0xc42d18995581f5dc78f56a6acf47ae35f368b423557bfcfc2bccc33a7002f10a"
                },
                {
                    "amount": 4999699999998,
                    "parent_coin_info": "0x8c286c4ca46557cace8330d2d3c1c0651e24e73de11bb395ce3534bd5e2e06c1",
                    "puzzle_hash": "0x056b5fcf0f5d63b814ebef228c39869f3d7800c97a4e875623f7b0769e2b02e0"
                }
            ],
            "amount": 1,
            "confirmed": false,
            "confirmed_at_height": 0,
            "created_at_time": 1686811885,
            "fee_amount": 100000000,
            "memos": {
                "1b65e459f3b4c884735469f2dc0934282b98467787cefe19e4a4c241a05aba08": "0b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2",
                "57a6eddbe8adc608c91af70e247a45354ed64a8e5ed04085281a64a551d7c3e0": "9d0c741afc52e0101c01f43ef2a840124e53b95e8a3f2294e2e708cab8a96f67"
            },
            "name": "0xdc050892a3273270d37c3c90a229f5342f9df8def4818f1c37eacb521281715a",
            "removals": [
                {
                    "amount": 1,
                    "parent_coin_info": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                    "puzzle_hash": "0x66713c00a343c14e0929fbae0435789a4d86fe573ea07c46c13cea182be52247"
                },
                {
                    "amount": 1,
                    "parent_coin_info": "0x60d4eab71247ecf0ccad87afba98ee29715953947504f6c61a46f1ff66699319",
                    "puzzle_hash": "0xc42d18995581f5dc78f56a6acf47ae35f368b423557bfcfc2bccc33a7002f10a"
                },
                {
                    "amount": 4999799999998,
                    "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                    "puzzle_hash": "0x96bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5"
                }
            ],
            "sent": 0,
            "sent_to": [],
            "spend_bundle": {
                "aggregated_signature": "0x94a67367131c31130baadaa872bbfd3499eabc76da4f82993a214adecdafeb7e916b2854979f1a436656d7a58b8b5fe813b6d6887351e01e12c9ced2bd2833f8173657c4d8b7f1fcee3adfb3b050b59cac6c10c961867be95132e85584af5a4a",
                "coin_spends": [
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                            "puzzle_hash": "0x66713c00a343c14e0929fbae0435789a4d86fe573ea07c46c13cea182be52247"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa075ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871da0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3affff04ff02ffff04ff05ffff04ff17ffff04ff2fffff04ff0bffff04ffff02ff5fff81bf80ff8080808080808080ffff04ffff01ffffff02ff3304ff01ff0101ffff02ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff14ff3880ffff0bff12ffff0bff12ffff0bff14ff2c80ff0980ffff0bff12ff0bffff0bff14ff8080808080ff8080808080ffff010b80ff0180ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff5fffff01ffff80ff80ff8080808080808080808080ffff04ffff03ff820b7fff820b7fffff04ff3cff808080ffff02ffff03ff81bfffff01ff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff5fffff04ff8201bfffff04ffff02ffff03ffff09ff82023fff2880ffff01ff02ffff03ffff18ff820b3fffff010180ffff01ff02ffff03ffff20ff82027f80ffff01ff04ff82033fffff04ff82057fffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff0180ffff01ff02ffff03ffff09ff82023fffff0181f680ffff01ff02ffff03ffff20ff82057f80ffff01ff04ff82027fffff04ffff02ff0bffff04ff2fffff04ff5fffff04ff82033fff8080808080ffff01ff80808080ffff01ff088080ff0180ffff01ff04ff82027fffff04ff82057fffff04ff82013fff8080808080ff018080ff0180ff80808080808080808080ffff01ff04ffff04ff28ffff04ffff02ff2effff04ff02ffff04ff05ffff04ff82047fffff04ffff0bff14ffff02ffff03ff82157fffff0182157fffff011780ff018080ffff04ffff02ffff03ff82157fffff0182157fffff011780ff0180ffff04ffff02ff3effff04ff02ffff04ff82097fff80808080ffff04ffff0bff14ff0580ff808080808080808080ff82067f8080ff822d7f8080ff018080ffff0bff12ffff0bff14ff1080ffff0bff12ffff0bff12ffff0bff14ff2c80ff0580ffff0bff12ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff14ff1480ff8080808080ffff0bff14ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff01ffa0028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da8980ffff04ffff01ff02ffff01ff02ffff01ff02ff02ffff04ff02ffff04ffff02ff05ffff04ff4fffff04ff81afffff04ffff04ff0bffff04ff17ffff04ff82016fff80808080ff8080808080ff80808080ffff04ffff01ff04ff15ffff04ff2dffff04ffff04ff09ff5d80ff80808080ff018080ffff04ffff01ff02ffff01ff02ffff01ff04ffff04ff02ffff04ffff0bff4fffff02ffff03ff81efffff01ff02ff0bffff04ff05ffff04ff81afff5f808080ffff010580ff0180ffff02ffff03ff81efffff0182016fffff0181af80ff018080ff808080ffff02ff17ff81bf8080ffff04ffff0147ff018080ffff04ffff01a0a0631f78e1f77cf38c447745d9b64f3016c504df5b426551ef5a75b737cbea09ffff04ffff01ff02ffff01ff02ffff01ff02ffff01ff02ff1effff04ff02ffff04ff0bffff04ff2fffff04ff5fffff04ff8205ffffff04ff820bffffff04ff8217ffffff04ffff02ff1affff04ff02ffff04ff17ffff04ffff02ff1affff04ff02ffff04ff05ffff04ffff0bff08ff8202ff80ffff04ffff02ff1affff04ff02ffff04ff82017fffff04ffff0bff08ff82017f80ff8080808080ffff04ff81bfff80808080808080ff8080808080ff80808080808080808080ffff04ffff01ffff01ff02ff02ffff03ff05ffff01ff0bff72ffff02ff16ffff04ff02ffff04ff09ffff04ffff02ff1cffff04ff02ffff04ff0dff80808080ff808080808080ffff016280ff0180ffffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ff0bff52ffff02ff16ffff04ff02ffff04ff05ffff04ffff02ff1cffff04ff02ffff04ff07ff80808080ff808080808080ffff0bff14ffff0bff14ff62ff0580ffff0bff14ff0bff428080ff02ff1affff04ff02ffff04ff0bffff04ffff0bff14ffff0bff08ff0b80ffff0bff14ffff0bff08ff81bf80ff178080ffff04ffff02ff1affff04ff02ffff04ff05ffff04ffff0bff08ff0580ffff04ff5fffff04ff82017fffff04ffff0bff08ff82017f80ffff04ff2fff808080808080808080ff808080808080ff018080ffff04ffff01a0b982796850336aabf9ab17c3f21e299f0c633444117ab5e9ebeafadf1860d9fcffff04ffff01a0d5fd32e069fda83e230ccd8f6a7c4f652231aed5c755514b3d996cbeff4182b8ffff04ffff01a04218fbebbb6f3c0907ebe8a672fa5d1e4bc655645a3a0073601e6c9b50b07c47ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0520e10fa83a9bf74c52870cf41a5c5e7bbaa82c0f5838276f27bd88b4886d4c7ffff04ffff01a053f87e8879fd7b0accd777ffe724b47373993c03d1814958211ecae6c69e6ec5ff0180808080808080ffff04ffff01a0dd12ebf70feba2ee45dc25b7de7a53a8cd9e82e0b5648fabea5e998b890ed86dff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ffff07ff5f80ffff01ff04ffff03ff8202dfffff04ff27ff8202df80ff8080ffff04ff8205dfffff04ffff04ffff04ff08ffff04ff82015fff808080ffff04ffff04ff14ffff04ffff0bffff0bff56ffff0bff0affff0bff0aff66ff0580ffff0bff0affff0bff76ffff0bff0affff0bff0aff66ffff0bff0affff0bff1cff0580ffff0bff0affff0bff1cff2780ffff0bff1cff0b80808080ffff0bff0affff0bff76ffff0bff0affff0bff0aff66ff819f80ffff0bff0aff66ff46808080ff46808080ff46808080ffff0bff82015fffff02ff1effff04ff02ffff04ff8202dfff80808080ff8205df8080ff808080ff808080ff80808080ffff01ff02ffff03ff5fffff01ff04ff80ffff04ff5fffff01ff80808080ffff01ff04ffff04ff27ff3780ffff01ff80ff80808080ff018080ff0180ffff04ffff01ffff46ff3f01ff02ffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01a07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffff04ffff01a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff01808080ff0180808080ff018080ffff04ffff01a0056a82c50264e823bbb9e270d055c0b6cfe0456e4344f3654d862be6821dc97cffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff2fffff01ff02ffff03ffff09ff0bffff02ff16ffff04ff02ffff04ff5fff8080808080ffff01ff02ff5fff81bf80ffff01ff088080ff0180ffff01ff02ffff03ffff09ff17ffff02ff16ffff04ff02ffff04ff5fff8080808080ffff01ff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ffff02ff5fff81bf80ff808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffff33ff0102ffffffa04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459aa09dcf97a184f32623d11a73124ceb99a5709b083721e878a16d78f596718ba7b2ffa102a12871fee210fb8619291eaea194581cbd2531e4b23759d225f6806923f63222a102a8d5dd63fba471ebcb1f3e8f7c1e1879b7152a6e7298a91ce119a63400ade7c5ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff16ffff04ff02ffff04ff09ff80808080ffff02ff16ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff17ffff01ff02ffff03ffff09ff47ff0880ffff01ff04ffff04ff08ffff04ffff0bff2affff0bff1cffff0bff1cff32ff0580ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff058080ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff0b8080ffff0bff1cffff0bff3affff0bff1cffff0bff1cff32ffff0bff14ff81a78080ffff0bff1cff32ff22808080ff22808080ff22808080ff22808080ff81e78080ffff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ff37ff80808080808080ffff01ff04ff27ffff02ff1effff04ff02ffff04ff05ffff04ff0bffff04ff37ff8080808080808080ff0180ff8080ff0180ff018080ffff04ffff01a000848115554ea674131f89f311707a959ad3f4647482648f3fe91ba289131f51ffff04ffff01a0ae616e8425823c1267d088f82145c3107283379598c75723b55fa15daed2c89affff04ffff01a013177bbf8766a2bc43d44ec9e87b9f08ff1f0451fd7975da54f514403565e715ff0180808080ff01808080808080ff01808080",
                        "solution": "0xffffa075ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871dffa043309e9613bc9d8156b52cfe1e396b43448c59286bf0b3d3dd283eeea7eb9c09ff0180ff01ffffff80ffff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a54dca3865e1be909c2cd43aa941359f9dc92f8710e9e0489ee3b2b165c4f405bb58b900023c2db461dcb798ba0c51ddff018080ffff80ffff01ffff33ffa00b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2ff01ffffa00b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b28080ffff3cffa034fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c80ffff81f6ffffa075ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871dff0180ffff80ffa075ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d80ffffa03553b6d38735463d7615b2e6a43ddf73e0e1b8b45e565ccb69a1b5297f98fefbffa034fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7cffa096c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3ff80808080ff8080808080"
                    },
                    {
                        "coin": {
                            "amount": 1,
                            "parent_coin_info": "0x60d4eab71247ecf0ccad87afba98ee29715953947504f6c61a46f1ff66699319",
                            "puzzle_hash": "0xc42d18995581f5dc78f56a6acf47ae35f368b423557bfcfc2bccc33a7002f10a"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff02ff05ff82017f80ffff01ff02ffff03ffff22ffff09ffff02ff7effff04ff02ffff04ff8217ffff80808080ff0b80ffff15ff17ff808080ffff01ff04ffff04ff28ffff04ff82017fff808080ffff04ffff04ff34ffff04ff8202ffffff04ff82017fffff04ffff04ff8202ffff8080ff8080808080ffff04ffff04ff38ffff04ff822fffff808080ffff02ff26ffff04ff02ffff04ff2fffff04ff17ffff04ff8217ffffff04ff822fffffff04ff8202ffffff04ff8205ffffff04ff820bffffff01ff8080808080808080808080808080ffff01ff088080ff018080ff0180ffff04ffff01ffffffff313dff4946ffff0233ff3c04ffffff0101ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff22ff3c80ffff0bff2affff0bff2affff0bff22ff3280ff0980ffff0bff2aff0bffff0bff22ff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff17ffff01ff02ffff03ff82013fffff01ff04ffff04ff30ffff04ffff0bffff0bffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ff82023fffff04ff82053fffff04ff820b3fff8080808080808080ffff02ff7effff04ff02ffff04ffff02ff2effff04ff02ffff04ff2fffff04ff5fffff04ff82017fff808080808080ff8080808080ff2f80ff808080ffff02ff26ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ffff10ff8202ffffff010180ff808080808080808080808080ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff37ffff04ff2fffff04ff5fffff04ff8201bfffff04ff82017fffff04ff8202ffff8080808080808080808080ff0180ffff01ff02ffff03ffff15ff8202ffffff11ff0bffff01018080ffff01ff04ffff04ff20ffff04ff82017fffff04ff5fff80808080ff8080ffff01ff088080ff018080ff0180ff0bff17ffff02ff5effff04ff02ffff04ff09ffff04ff2fffff04ffff02ff7effff04ff02ffff04ffff04ff09ffff04ff0bff1d8080ff80808080ff808080808080ff5f80ffff04ffff0101ffff04ffff04ff2cffff04ff05ff808080ffff04ffff04ff20ffff04ff17ffff04ff0bff80808080ff80808080ffff0bff2affff0bff22ff2480ffff0bff2affff0bff2affff0bff22ff3280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff22ff2280ff8080808080ffff0bff22ff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff7effff04ff02ffff04ff09ff80808080ffff02ff7effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b4aa30b444019fbfb436a327a7f322af99e3380fa34c835277f6377379c3a7f73898ff4544e3f82298e335ce21172e7fff018080ffff04ffff01a04bf5122f344554c53bde2ebb8cd2b7e3d1600ad631c385a5d7cce23c7785459affff04ffff0180ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa0028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff0180ff01808080808080ff01808080",
                        "solution": "0xffffa0028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89ffa03553b6d38735463d7615b2e6a43ddf73e0e1b8b45e565ccb69a1b5297f98fefbff0180ff01ffff01ffff80ffff01ffff33ffa03553b6d38735463d7615b2e6a43ddf73e0e1b8b45e565ccb69a1b5297f98fefbff01ffffa09d0c741afc52e0101c01f43ef2a840124e53b95e8a3f2294e2e708cab8a96f678080ffff3effa038bf4d5abae25427698911de822b413d387463a935bdb329cefe8102b1a906e58080ff80808080"
                    },
                    {
                        "coin": {
                            "amount": 4999799999998,
                            "parent_coin_info": "0xfe3ee70af5a9b39d5f7c391f6eb2325614b3a207ad3cfca9f53c64cfa1c8b70e",
                            "puzzle_hash": "0x96bcbb14cfba61b227db34fbb50a2dba4f56c098a79ff46110e904ebbe5579f5"
                        },
                        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0924792adc6469af841fb4536a5673ef014e7239a9f27a57882c43dce4f6d1cd751c50d8007d22200a4c71484f9eb3ef8ff018080",
                        "solution": "0xff80ffff01ffff33ffa0056b5fcf0f5d63b814ebef228c39869f3d7800c97a4e875623f7b0769e2b02e0ff86048c1557acfe80ffff34ff8405f5e10080ffff3cffa00b62ff01d760abe4af1b8bf39a99613aea23a56be6b1a2c7959af89bf74930bd80ffff3dffa0c8d917f730580de2131feb9f1e96e2d6c2ab188dd06048411f3aa80b796fca2b8080ff8080"
                    }
                ]
            },
            "to_address": "txch1pdtvqfu9c3mvq4sjaqqvk9yn663vprt4hh3nq52eppa3084hx6eqjvak85",
            "to_puzzle_hash": "0x0b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2",
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
chia rpc wallet vc_get '{"vc_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d"}'
```

Result:

```json
{
    "success": true,
    "vc_record": {
        "confirmed_at_height": 2775043,
        "vc": {
            "coin": {
                "amount": 1,
                "parent_coin_info": "0x34fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c",
                "puzzle_hash": "0x2c915311c3e0d8f23c5ab2647dd97a8abeb1db53c85ebdc9fea16b8745d1bdf1"
            },
            "eml_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x70c5b7a4e29e3c7e0c39f8714a1590d2d6b96976b8dd4afc7982a63b4c9df4c5",
                "parent_name": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                "parent_proof_hash": "0x31ff76539d8585ec1d79e7269a3af3140b57716efc5544e34a28e0aabef14044"
            },
            "inner_puzzle_hash": "0x0b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2",
            "launcher_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
            "proof_hash": "0x96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3",
            "proof_provider": "0x028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89",
            "singleton_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x571b5d6e68339f3726fdd7452992635b2ebedcabb8e92a93c56137ca360a0e28",
                "parent_name": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d"
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
            "coin_id": "0x1b65e459f3b4c884735469f2dc0934282b98467787cefe19e4a4c241a05aba08",
            "confirmed_at_height": 2775043,
            "vc": {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0x34fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c",
                    "puzzle_hash": "0x2c915311c3e0d8f23c5ab2647dd97a8abeb1db53c85ebdc9fea16b8745d1bdf1"
                },
                "eml_lineage_proof": {
                    "amount": 1,
                    "inner_puzzle_hash": "0x70c5b7a4e29e3c7e0c39f8714a1590d2d6b96976b8dd4afc7982a63b4c9df4c5",
                    "parent_name": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                    "parent_proof_hash": "0x31ff76539d8585ec1d79e7269a3af3140b57716efc5544e34a28e0aabef14044"
                },
                "inner_puzzle_hash": "0x0b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2",
                "launcher_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
                "proof_hash": "0x96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3",
                "proof_provider": "0x028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89",
                "singleton_lineage_proof": {
                    "amount": 1,
                    "inner_puzzle_hash": "0x571b5d6e68339f3726fdd7452992635b2ebedcabb8e92a93c56137ca360a0e28",
                    "parent_name": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d"
                }
            }
        }
    ]
}
```

### Revoke a VC

Typically, the proof provider only needs to mint a VC, add proofs, and transfer the VC to the new holder. However, at some point, a holder's proofs may change. For example, a holder might have originally proven that they were not a US citizen, and then they later became a US citizen.

In cases such as this, the proof provider needs to _revoke_ the credentials, ie to remove all proofs from a VC. (The holder will continue to hold the VC, but it will no longer contain any proofs.) At this point, the VC will be empty. However, we don't allow the proof provider to take back the VC itself because it is possible for it to custody other assets, though we don't support this yet.

The only wallet that is allowed to revoke credentials is the proof provider's (the wallet that contains the DID used to mint the VC).

In order to run the [vc_revoke](/vc-rpc#vc_revoke) command, the proof provider will need to know the parent coin ID (the `vc_parent_id` parameter). 

For testing purposes, the **holder's wallet** can obtain the parent coin ID by running the [vc_get](/vc-rpc#vc_get) RPC. In a production environment, the proof provider will track the VC on-chain and obtain this info immediately prior to revoking the VC.

```json
chia rpc wallet vc_get '{"vc_id": "75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d"}'
```

The response will contain pertinent info about the VC, including its `parent_coin_info`:

```json
{
    "success": true,
    "vc_record": {
        "confirmed_at_height": 2775043,
        "vc": {
            "coin": {
                "amount": 1,
                "parent_coin_info": "0x34fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c",
                "puzzle_hash": "0x2c915311c3e0d8f23c5ab2647dd97a8abeb1db53c85ebdc9fea16b8745d1bdf1"
            },
            "eml_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x70c5b7a4e29e3c7e0c39f8714a1590d2d6b96976b8dd4afc7982a63b4c9df4c5",
                "parent_name": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                "parent_proof_hash": "0x31ff76539d8585ec1d79e7269a3af3140b57716efc5544e34a28e0aabef14044"
            },
            "inner_puzzle_hash": "0x0b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2",
            "launcher_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
            "proof_hash": "0x96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3",
            "proof_provider": "0x028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89",
            "singleton_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x571b5d6e68339f3726fdd7452992635b2ebedcabb8e92a93c56137ca360a0e28",
                "parent_name": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d"
            }
        }
    }
}
```

The revocation command then uses the `parent_coin_info` as the `vc_parent_id` parameter:

```json
chia rpc wallet vc_revoke '{"vc_parent_id": "0x34fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c", "fee": 100000000}'
```

As a result, the VC will be recreated in the same wallet, but without any proofs:

```json
{
    "success": true,
    "vc_record": {
        "confirmed_at_height": 2775043,
        "vc": {
            "coin": {
                "amount": 1,
                "parent_coin_info": "0x34fd912aa84722e41eda77d5bfe70c97af5a4e2305bb9a96e754eb16012abd7c",
                "puzzle_hash": "0x2c915311c3e0d8f23c5ab2647dd97a8abeb1db53c85ebdc9fea16b8745d1bdf1"
            },
            "eml_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x70c5b7a4e29e3c7e0c39f8714a1590d2d6b96976b8dd4afc7982a63b4c9df4c5",
                "parent_name": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d",
                "parent_proof_hash": "0x31ff76539d8585ec1d79e7269a3af3140b57716efc5544e34a28e0aabef14044"
            },
            "inner_puzzle_hash": "0x0b56c02785c476c05612e800cb1493d6a2c08d75bde3305159087b179eb736b2",
            "launcher_id": "0x75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d",
            "proof_hash": "0x96c9597578333c840f895f30af6d40b9f6c0d69100db1a13ae2e26e4c94acdd3",
            "proof_provider": "0x028a062441add9ab3883c4d4a4417633c83279bcb66c70b6b00ef1b589b4da89",
            "singleton_lineage_proof": {
                "amount": 1,
                "inner_puzzle_hash": "0x571b5d6e68339f3726fdd7452992635b2ebedcabb8e92a93c56137ca360a0e28",
                "parent_name": "0xfa301b98f3ce6acb831ecca45793cc9338b84a649012899cc91a38ffe9437b3d"
            }
        }
    }
}
```

After these transactions have been confirmed on-chain, the VC no longer contains any proofs. The holder can verify this:

```json
chia rpc wallet vc_get '{"vc_id": "75ea50e79d6020c655306bc27208fc454d656c3d45246763146a626cca17871d"}'
```

Result:

```json
[todo]
```












