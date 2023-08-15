---
sidebar_label: VCs
title: Verifiable Credentials
slug: /vc-cli
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This document is a comprehensive listing of CLI commands for interacting with Chia VCs.

## Reference

### `add_proof_reveal`

Functionality: Add a series of proofs that will combine to a single proof hash

Usage: chia wallet vcs add_proof_reveal [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                                             |
| :------------ | :---------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml                |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which key to use                                                                         |
| -p            | --proof           | TEXT    | True\*   | A flag to add as a proof                                                                                                |
| -r            | --root-only       | None    | False    | If this flag is set, do not add the proofs to the DB, just output the root from the specified proofs [Default: not set] |
| -h            | --help            | None    | False    | Show a help message and exit                                                                                            |

<details>
<summary>Example 1</summary>

Add two proofs:

```bash
chia wallet vcs add_proof_reveal -f 2108245669 --proof test_proof1 --proof test_proof2
```

Response:

```
Proofs added to DB successfully!
```

</details>

<details>
<summary>Example 2</summary>

Get the root hash of the tree created from adding two proofs:

```bash
chia wallet vcs add_proof_reveal -f 2108245669 --proof test_proof1 --proof test_proof2 --root-only
```

Response:

```
Proof Hash: f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
```

</details>

---

### `get`

Functionality: Get a list of existing VCs

Usage: chia wallet vcs get [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which key to use                                                          |
| -s            | --start           | INTEGER | False    | The index to start the list at [default: 0]                                                              |
| -c            | --count           | INTEGER | False    | How many results to return [default: 50]                                                                 |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
<summary>Example</summary>

```bash
chia wallet vcs get -f 2108245669
```

Response:

```bash
Proofs:

Launcher ID: 89a4ff17372dd3a8814712c0988b87b508a04cd7fa61d0228ce54b74111e7160
Coin ID: 72e522fecc64b539f8979b89e4cf2ffbcf8ba985faf4b701bcc882c6aec9e040
Inner Address: txch1at35qwx6djmadnh9v77a72z8vcaxsle36ke3dj26gcpt2fnh654qsqecnj
```

</details>

---

### `get_proofs_for_root`

Functionality: Get the stored proof flags for a given proof hash

Usage: chia wallet vcs get_proofs_for_root [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which key to use                                                          |
| -r            | --proof-hash      | TEXT    | True     | The root to search for                                                                                   |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

Note that if the root is not currently stored in the VC, the command will fail.

<details>
<summary>Example</summary>

Search for a hash currently stored in the VC:

```bash
chia wallet vcs get_proofs_for_root -f 2108245669 --proof-hash f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
```

Response:

```bash
Proofs:
 - test_proof1
 - test_proof2
```

</details>

---

### `mint`

Functionality: Mint a VC

Usage: chia wallet vcs mint [OPTIONS]

Options:

| Short Command | Long Command      | Type    | Required | Description                                                                                              |
| :------------ | :---------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml |
| -f            | --fingerprint     | INTEGER | False    | Set the fingerprint to specify which key to use as the issuing wallet                                    |
| -d            | --did             | TEXT    | True     | The DID of the VC's proof provider. Must be owned by the issuing wallet                                  |
| -t            | --target-address  | TEXT    | False    | The address to send the VC to once it's minted [Default: send to minting wallet]                         |
| -m            | --fee             | TEXT    | False    | Blockchain fee for mint transaction, in XCH                                                              |
| -h            | --help            | None    | False    | Show a help message and exit                                                                             |

<details>
<summary>Example</summary>

A DID is required in order to mint a new VC. If the proof provider does not already have a DID, use the `did create` command to create one. For example:

```bash
chia wallet did create -f 2108245669 -n Provider_DID -m 0.0001
```

Response:

```bash
Successfully created a DID wallet with name Provider_DID and id 2 on key 2108245669
Successfully created a DID did:chia:1n2s77g7rer2v62xzrvd0at6tgx8m4g8t6encghs375r64lc6e5mssdkap3 in the newly created DID wallet
```

Next, mint a new VC. Note that the DID specified with `-d` must be owned by the fingerprint specified with `-f` (or the one selected if `-f` is not used). For example:

```bash
chia wallet vcs mint -f 2108245669 -d did:chia:1n2s77g7rer2v62xzrvd0at6tgx8m4g8t6encghs375r64lc6e5mssdkap3 -m 0.0001
```

Response:

```bash
New VC with launcher ID minted: 13ba084e78475327e41c60df5a108965d7a283f065b5506e266ffb3563937b6c
Relevant TX records:

Transaction e114763824c11c84bd1e3b5b0ba6540cb2ed2aef0f371170e8beecaac29d87c2
Status: Pending
Amount sent: 1E-12 XCH
To address: txch1at35qwx6djmadnh9v77a72z8vcaxsle36ke3dj26gcpt2fnh654qsqecnj
Created at: 2023-06-15 10:02:31
```

After the transaction has been confirmed, it is possible to show the VC by running the `get` command:

```bash
chia wallet vcs get -f 2108245669
```

Response:

```bash
Proofs:

Launcher ID: 89a4ff17372dd3a8814712c0988b87b508a04cd7fa61d0228ce54b74111e7160
Coin ID: 72e522fecc64b539f8979b89e4cf2ffbcf8ba985faf4b701bcc882c6aec9e040
Inner Address: txch1at35qwx6djmadnh9v77a72z8vcaxsle36ke3dj26gcpt2fnh654qsqecnj
```

It is recommended that you save the `Launcher ID` because it will be needed if the VC needs to be revoked later.

No proofs have been added yet. This is accomplished with the [update_proofs](#update_proofs) command.

</details>

---

### `revoke`

Functionality: Revoke any VC if you have the proper DID and the VC's parent coin

Usage: chia wallet vcs revoke [OPTIONS]

Options:

| Short Command | Long Command           | Type    | Required | Description                                                                                                                                                                 |
| :------------ | :--------------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port      | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml                                                                    |
| -f            | --fingerprint          | INTEGER | False    | Set the fingerprint to specify which key to use                                                                                                                             |
| -p            | --parent-coin-id       | TEXT    | True*    | The ID of the parent coin of the VC (*optional if VC ID is used)                                                                                                            |
| -l            | --vc-id TEXT           | TEXT    | True*    | The launcher ID of the VC to revoke (must be tracked by wallet) (*optional if Parent ID is used)                                                                            |
| -m            | --fee                  | TEXT    | False    | Blockchain fee for revocation transaction, in XCH                                                                                                                           |
|               | --reuse-puzhash        | None    | False    | If this flag is set, then send the VC back to the same puzzle hash it came from (ignored if `--generate-new-puzhash` is also specified) [Default: generate new puzzle hash] |
|               | --generate-new-puzhash | None    | False    | If this flag is set, then send the VC to a new puzzle hash. This is the default behavior, and setting this flag will override the `--reuse-puzhash` flag if it is also set  |
| -h            | --help                 | None    | False    | Show a help message and exit                                                                                                                                                |

<details>
<summary>Example</summary>

Revoke the proofs from a VC. A few notes:

- The only wallet authorized to call this command is the wallet that contains the DID that created the VC

```bash
chia wallet vcs revoke -l 0x420f69cc8b541be7a0bf1d94ec028a8b2a875ee2cd6721f5316cf1b02519d13a -m 0.0001
```

Response:

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

After the transactions have completed, the holder of the VC can now show that the VC does not contain any proofs:

```bash
chia wallet vcs get
```

Response:

```bash
Proofs:
```

</details>

---

### `update_proofs`

Functionality: Update a VC's proofs if you have the provider DID

Usage: chia wallet vcs update_proofs [OPTIONS]

Options:

| Short Command | Long Command           | Type    | Required | Description                                                                                                                                                                 |
| :------------ | :--------------------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| -wp           | --wallet-rpc-port      | INTEGER | False    | Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml                                                                    |
| -f            | --fingerprint          | INTEGER | False    | Set the fingerprint to specify which key to use                                                                                                                             |
| -l            | --vc-id                | TEXT    | True     | The launcher ID of the VC whose proofs should be updated                                                                                                                    |
| -t            | --new-puzhash          | TEXT    | False    | The puzzle hash to which to send the VC after the proofs have been updated                                                                                                  |
| -p            | --new-proof-hash       | TEXT    | True     | The new proof hash to update the VC to                                                                                                                                      |
| -m            | --fee                  | TEXT    | False    | Blockchain fee for update transaction, in XCH                                                                                                                               |
|               | --reuse-puzhash        | None    | False    | If this flag is set, then send the VC back to the same puzzle hash it came from (ignored if `--generate-new-puzhash` is also specified) [Default: generate new puzzle hash] |
|               | --generate-new-puzhash | None    | False    | If this flag is set, then send the VC to a new puzzle hash. This is the default behavior, and setting this flag will override the `--reuse-puzhash` flag if it is also set  |
| -h            | --help                 | None    | False    | Show a help message and exit                                                                                                                                                |

<details>
<summary>Example</summary>

Update the proofs. A few notes:

- The only wallet authorized to call this command is the wallet that contains the DID that created the VC
- The `-t` parameter must point to a puzzle hash, not an address
- The `-p` parameter can be obtained by calling `add_proof_reveal` and adding the `--root-only` flag

```bash
chia wallet vcs update_proofs -f 2108245669 -l 89a4ff17372dd3a8814712c0988b87b508a04cd7fa61d0228ce54b74111e7160 -t 0x6fc9728dcd29358fae2194a1145d54c58acfa4de0380c60f8af377742e67788b -p f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5 -m 0.0001
```

Response:

```
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

After the transactions have completed, the VC will have been transferred to its destination puzzle hash (if one was provided).

The new owner of the VC can now view the proof(s):

```bash
chia wallet vcs get -f 2053849171
```

```bash
Proofs:
- f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
  - test_proof1
  - test_proof2

Launcher ID: 89a4ff17372dd3a8814712c0988b87b508a04cd7fa61d0228ce54b74111e7160
Coin ID: 72e522fecc64b539f8979b89e4cf2ffbcf8ba985faf4b701bcc882c6aec9e040
Inner Address: txch1at35qwx6djmadnh9v77a72z8vcaxsle36ke3dj26gcpt2fnh654qsqecnj
Proof Hash: f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5
```

</details>

---
