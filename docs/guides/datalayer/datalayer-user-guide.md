---
slug: /guides/datalayer-user-guide
title: DataLayer User Guide
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

This document will guide you through the process of setting up Chia's DataLayer™ and running a few basic functions.

### About DataLayer

As a decentralized database, the Chia DataLayer allows users to store the original data locally. The hash of that data is then saved in a [singleton](https://chialisp.com/singletons) (a coin with a unique ID that can be spent and recreated many times) with updated properties each time it is recreated. The on-chain component of Chia DataLayer is also a singleton. If the original data’s hash matches the hash stored on-chain, then the original data is guaranteed to be accurate.

At the basic level, the Chia DataLayer provides a shared data network with no central authority. Nodes in this network can subscribe to data from other nodes and receive updates whenever the data changes.

The real magic of DataLayer is the ability to use the data in smart contract transactions. Specifically, Chialisp code can directly process records stored in Chia DataLayer, opening up a new world of functionality for Chialisp programmers not available on any other blockchain. It starts with the concept of a "proof of inclusion."

#### Proof of inclusion

A proof of inclusion is a way to prove that a key/value pair is being stored, without needing to provide the entire Merkle tree from the store. This is accomplished by creating a spend of the DataLayer singleton that accepts two things in its solution:
1. The hash of a key/value pair from the Merkle tree
2. Proof that the same key/value pair actually exists in the Merkle tree. This proof is obtained by providing the minimum peer hashes necessary to recalculate the Merkle root that is currently stored on-chain, starting from the leaf obtained from the key/value pair.

When this proof is obtained, the singleton announces the hash that exists in that DataLayer table.  

Proofs of inclusion are the basis for accessing DataLayer data from Chialisp because once the data is proven, it can be used to drive other functionality, starting with the two-party commit, and moving beyond to include oracles and off-chain contracts.

#### Example 1: Two-party commit

"Two-party commit" is the simplest example of a proof of inclusion. It is an Offer where the owner of one DataLayer table offers to make an update if and only if the owner of another DataLayer table makes a specified update.

A two-party commit uses an Offer that includes six asserts and spends.

In the original Offer, the maker includes:

1. A spend of the maker's DataLayer singleton to make the update to the maker's table
2. A spend of the maker's DataLayer singleton to announce a proof of inclusion of the updates made
3. An assert of an announcement from the taker of a proof of inclusion of a required update

To accept the offer, the taker adds:

4. A spend of the taker DataLayer singleton to make the update
5. A spend of the taker DataLayer singleton to announce the proof of inclusion of the updated data
6. An assert of the proof of inclusion from the maker

The offer spendbundle only goes through when all of the necessary assertions are satisfied.

Where it gets interesting is what other coins might do with that announcement. Another coin can accept the key and value in its solution, hash them, and assert an announcement from the DataLayer coin of a proof of inclusion of that hash. If the assert succeeds, then the coin can confidently use that data in the key and value as a validated input to whatever it may want to do.

#### Example 2: NFT ratings

A hypothetical example of a proof of inclusion could be NFT ratings. Here's how it would work:

* A critic provides ratings for various NFTs in a DataLayer table, such that people could create offers based on that rating.
* A prospective buyer might offer 5 XCH for any NFT with a "blue ribbon" rating from RatingWiz.
* To accept the offer, an NFT owner would have to include a proof of inclusion from the rating table that their NFT had that rating.

This example would require anyone-can-spend DataLayer proofs of inclusion (these doesn't exist yet, but would be straightforward to build). The anyone-can-spend proof of inclusion could also generate a payment to the DataLayer table owner to pay RatingWiz for their services.

#### Resources and notes

For additional technical resources, see the following:

- [DataLayer RPC API](/datalayer-rpc/ 'DataLayer RPC API')
- [DataLayer CLI Reference](/datalayer-cli/ 'DataLayer CLI Reference')
- [DataLayer Permission Guide](/guides/datalayer-permissions/) -- a new feature as of Chia 1.8.0
- [DataLayer blog post](https://www.chia.net/2022/09/20/enabling-data-for-web3-announcing-chia-datalayer/)

:::note

Commands that modify the blockchain include an optional fee. This fee can be specified in two ways:

1. The `-m` / `--fee` parameter can be specified explicitly in the command, as several of the examples in this document show
2. If the fee option is not explicitly specified, then the `data_layer:fee` setting in `~/.chia/mainnet/config/config.yaml` will be used. By default, this is set to 1 billion mojos (0.001 XCH)
3. If neither of these options is set, then no fee will be used

:::

---

:::info

If you have already installed Chia version 1.6 or greater and started the reference client, you may skip to the next section: [Configure Chia to run DataLayer](#configure-chia-to-run-datalayer).

:::

## DataLayer Guide

### Install and Run Chia

DataLayer can be activated or deactivated from Chia's reference wallet GUI. However, the commands to use it are only available from the CLI or RPC. You can choose whether to [install Chia from source](/installation#from-source) or [run the packaged installer](https://www.chia.net/downloads/). 

1. **If you installed from source**, be sure you have activated a virtual environment (you should see `(venv)` on the left side of your Powershell/terminal window).

2. Run `chia version`. You should be shown the correct version. For example:

```powershell
chia version
1.8.0
```

3. (optional) Run `chia configure --set-log-level INFO`. This will instruct your Chia installation to log more info than it would have with the default level of WARNING:

```bash
chia configure --set-log-level INFO
```

Result:

```bash
Logging level updated. Check ~/.chia/mainnet/log/debug.log
Restart any running chia services for changes to take effect
```

(You will restart Chia later in this guide.)

4. Acquire some XCH. 0.01 XCH is a sufficient amount to get started.

:::tip

If you ever need to display your address, run `chia keys show`. This command will only output your public keys and address; your private keys and seed phrase will not be shown.

:::

### Configure Chia to run DataLayer

At this point, you should have installed and started Chia. You should also have a synced wallet with some XCH (0.01 XCH is sufficient to get started). You do _not_ need a synced full node.

:::info

You are recommended to complete steps 1 and 2 (port forwarding and firewall configuration) in order to run DataLayer. If you skip these steps, DataLayer might not run properly.

:::

1. Configure your router to forward port 8575 (data propagation server) to your local machine. To configure your router's settings, typically you will need enter `http://192.168.1.1` in a web browser, though this address varies for different routers. From your router's settings, locate the Port Forwarding section and add a rule to forward port 8575 to your local IP address.

2. You will also need to configure your computer's firewall to allow connections on port 8575. This process is different for each OS:

:::info Firewall setup

<Tabs
defaultValue="windows"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux', value: 'linux'},
{label: 'MacOS', value: 'macos'}
]}>
<TabItem value="windows">

From a PowerShell prompt, run:

```powershell
start-Process powershell -Verb runAs
```

This will open a new PowerShell window as an Administrator. From this new window, you will need to run four commands, two for incoming connections and two for outgoing connections.

```powershell
netsh advfirewall firewall add rule name="allowDataServerIn" dir=in action=allow protocol=TCP localport=8575
netsh advfirewall firewall add rule name="allowDataServerOut" dir=out action=allow protocol=TCP localport=8575
```

Each of these commands should give a response of `Ok.` Once you have successfully run the commands, exit the Administrator PowerShell window.

  </TabItem>
  <TabItem value="linux">

Assuming you use iptables, which is installed on most distributions by default, run:

```bash
sudo iptables -I INPUT -p tcp -m tcp --dport 8575 -j ACCEPT
sudo iptables -I OUTPUT -p tcp -m tcp --dport 8575 -j ACCEPT
```

Next, save the settings. For Ubuntu and Debian, run:

```bash
sudo /sbin/iptables-save
```

For CentOS, Red Hat, and Fedora, run:

```bash
/sbin/service iptables save
```

  </TabItem>
  <TabItem value="macos">

Open /etc/pf.conf in a text editor. You will need administrative privileges. For example:

```bash
sudo vi /etc/pf.conf
```

Add the following lines to the end of the file:

```bash
# Open port 8575 for Chia Data Propagation Server
pass in proto tcp from any to any port 8575
```

Save and close the file.

To load the changes, run:

```bash
sudo pfctl -f /etc/pf.conf
```

To verify that the changes are active, run:

```bash
sudo pfctl -sr | grep 8575
```

  </TabItem>
</Tabs>

:::

3. (optional) If you are going to use a DataLayer as a Service (DLaaS) plugin, you can add custom headers to `~/.chia/mainnet/config/config.yaml`. For example, you might update the config as follows:

```yaml
data_layer:
  client_timeout: 15
  database_path: data_layer/db/data_layer_CHALLENGE.sqlite
  downloaders:
    - url: http://localhost:9456
      headers:
        x-api-key: your-api-key-here
    - url: http://localhost:3145
      headers:
        x-api-key: your-api-key-here
...
  uploaders:
    - url: https://plugin.datalayer.storage
      headers:
        x-api-key: your-api-key-here
```

For more information on this feature, see the description in the relevant [GitHub issue](https://github.com/Chia-Network/issue-tracker/issues/483).

4. Start the DataLayer services from the GUI:

(For CLI instructions, skip ahead to step 5.)

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/data_layer/09_start_data.png"
        alt="Start the DataLayer services"
    />
    <figcaption>
        <em>Enable DataLayer services.</em>
    </figcaption>
</div>
<br />

As shown in the above image:

- Click `Settings` on the lower left side of your wallet
- Click the `DATA LAYER` menu
- Click the slider to `Enable Data Layer`
- A slider titled `Enable File Propagation Server` will appear. Click this to enable it as well

Finally, you need to restart Chia. Close the GUI and run steps 3 and 6 above. When Chia starts, it will automatically enable both of the DataLayer services.

5. If the dot to the left of `WALLET` is green (indicating that your wallet is synced), then you may proceed. If it is still orange, then you need to wait for it turn green before continuing.

:::info

Regardless of the status of `FULL NODE`, you may safely proceed with this tutorial:

- Orange dot = full node is syncing
- Green dot = full node is synced
- `FULL NODE` is missing = you are running in `Wallet Mode`

:::

<div style={{ textAlign: 'center' }}>
    <img src="/img/data_layer/10_synced.png" alt="Synced wallet" />
</div>
<br />

6. Start the DataLayer services from the CLI

(You can safely skip this step if you already started the DataLayer services from the GUI.)

First, start the DataLayer service:

```bash
chia start data
```

Result:

```bash
chia_data_layer: started
```

Next, start the File Propagation Server:

```bash
chia start data_layer_http
```

```bash
chia_data_layer_http: started
```

**Chia and the DataLayer are now installed and configured properly.**

---

## Note on Maximum Key and Value Lengths

You may be wondering how much data DataLayer can handle. When testing locally, there are a few important points to consider:

- There is no enforced limit on the length of DataLayer keys or values
- However, your computer must have enough memory (and other resources) to store the keys and values it downloads. A Raspberry Pi with 4 GB of memory will not be able to support the same size data sets as a server with 512 GB of memory
- Additionally, when adding a single key/value pair, the total size of the pair must fit into memory (the individual sizes of the key and value don't matter)
- When running `update_data_store` to add multiple keys, the important metric is the total size of _all_ keys and values in the whole store. Individual keys and values within the same command are unimportant in this context
- When discussing the lengths of keys and values, we always refer to the _hex_ values _after_ conversion from their original format
- The amount of data in your request must be smaller than the value of `rpc_server_max_request_body_size`, a parameter located in `~/.chia/mainnet/config/config.yaml`. If you modify this setting, you must restart Chia in order for the change to take effect

Keeping all of this in mind, **it is typically safe to insert data sets of up to 50 MiB** (no guarantees, though). We expect to support larger sizes in future versions. For now, however, we have only done minimal testing on larger data sets. For example, using `curl` to add keys and values to an empty tree required the following lengths of time:

- 100 MiB -- 2 to 4 seconds
- 1 GiB -- 45 to 60 seconds
- 2 GiB -- failed to insert

---

## Using DataLayer

Chia DataLayer doesn't have a GUI. The commands in this tutorial will use the command line interface (CLI). As a reminder, here is the complete reference for the CLI, as well as all available Remote Procedure Calls (RPCs):

- [DataLayer RPC API](/datalayer-rpc/ 'DataLayer RPC API')
- [DataLayer CLI Reference](/datalayer-cli/ 'DataLayer CLI Reference')

### Create a data store

This requires an on-chain transaction.

The command to create a new store is:

```bash
chia data create_data_store -m <fee>
```

Note that `<fee>` is a standard transaction fee to use Chia's network. This fee is in XCH.

<details>
<summary>create_data_store example</summary>

```bash
chia data create_data_store -m 0.00001
```

Response:

```
{
    'id': '1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f',
    'success': True,
    'txs':
    [
        {
            'additions':
            [
                {
                    'amount': 1,
                    'parent_coin_info': '0xb4a1a658aaefd10930ecbccd51ac2c9a4853435b14acdb0de84729bfbefc791c',
                    'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
                },
                {
                    'amount': 14999989999999,
                    'parent_coin_info': '0xb4a1a658aaefd10930ecbccd51ac2c9a4853435b14acdb0de84729bfbefc791c',
                    'puzzle_hash': '0x478255c372cec71557c20459f4b690fb1b7c57da3fcfc4b6396d78d9a396e384'
                },
                {
                    'amount': 1,
                    'parent_coin_info': '0x1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f',
                    'puzzle_hash': '0xd650e81d45c7381183c14c3363a81aa78cb3acfe213e46da26df75cd431557f9'
                }
            ],
            'amount': 1,
            'confirmed': False,
            'confirmed_at_height': 0,
            'created_at_time': 1661141324,
            'fee_amount': 10000000,
            'memos': [],
            'name': '0xaee362ae9d0ce3992b3bfb7cc48bde17f3d794cc383ff1d5e49a4d75dbf004d6',
            'removals':
            [
                {
                    'amount': 15000000000000,
                    'parent_coin_info': '0x81fc1729bad3f19699461b1ee455a92493ef4c1d60ba37d22ac187a18367e08e',
                    'puzzle_hash': '0x221c0e9cd9b7f536e9a204ef93519e6c9d4b4c9a049bde8d66fa1816c23120d2'
                },
                {
                    'amount': 1,
                    'parent_coin_info': '0xb4a1a658aaefd10930ecbccd51ac2c9a4853435b14acdb0de84729bfbefc791c',
                    'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
                }
            ],
            'sent': 10,
            'sent_to': [],
            'spend_bundle': {
                'aggregated_signature': '0x8c431f07698ad69fd14ab04d77683801e6b908e441074f5ef5268350483d194a09a8b3cde681cb5c5fcf6444e0c9d4bf00999e8e6ad1522891baa590f82d92e2876b08e34b1f3156d0fe88ce206e5ed1567863e10a0397fd0a8a66bcbd5007b0',
                'coin_spends':
                [
                    {
                        'coin':
                        {
                            'amount': 15000000000000,
                            'parent_coin_info': '0x81fc1729bad3f19699461b1ee455a92493ef4c1d60ba37d22ac187a18367e08e',
                            'puzzle_hash': '0x221c0e9cd9b7f536e9a204ef93519e6c9d4b4c9a049bde8d66fa1816c23120d2'
                        },
                        'puzzle_reveal': '0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b3deeeb00319624e26767c5cf777cf9a02d046510181ed29f233e2847fa8ef28ede05d2770bb1b8f101ea8ae20527d61ff018080',
                        'solution': '0xff80ffff01ffff33ffa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ff0180ffff33ffa0478255c372cec71557c20459f4b690fb1b7c57da3fcfc4b6396d78d9a396e384ff860da47513597f80ffff34ff840098968080ffff3cffa084f72a9a3ce5152e1d627a259a0c1c90e6af389cb26af48173d84e374ecc518080ffff3dffa03a0ed375dff192685d1ef9a74424788b04655700bee898f0ea8445f8b55d38338080ff8080'
                    },
                    {
                        'coin':
                        {
                            'amount': 1,
                            'parent_coin_info': '0xb4a1a658aaefd10930ecbccd51ac2c9a4853435b14acdb0de84729bfbefc791c',
                            'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
                        },
                        'puzzle_reveal': '0xff02ffff01ff04ffff04ff04ffff04ff05ffff04ff0bff80808080ffff04ffff04ff0affff04ffff02ff0effff04ff02ffff04ffff04ff05ffff04ff0bffff04ff17ff80808080ff80808080ff808080ff808080ffff04ffff01ff33ff3cff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff0effff04ff02ffff04ff09ff80808080ffff02ff0effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080',
                        'solution': '0xffa0d650e81d45c7381183c14c3363a81aa78cb3acfe213e46da26df75cd431557f9ff01ffffa00000000000000000000000000000000000000000000000000000000000000000ffa0adcbcbaf4594e8d3057ea3a64a40560720ede80e720f867d2631069c27459de58080'
                    }
                ]
            },
            'to_puzzle_hash': '0x0202020202020202020202020202020202020202020202020202020202020202',
            'trade_id': None,
            'type': 0,
            'wallet_id': 0
        },
        {
            'additions':
            [
                {
                    'amount': 1,
                    'parent_coin_info': '0xb4a1a658aaefd10930ecbccd51ac2c9a4853435b14acdb0de84729bfbefc791c',
                    'puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9'
                },
                {
                    'amount': 14999989999999,
                    'parent_coin_info': '0xb4a1a658aaefd10930ecbccd51ac2c9a4853435b14acdb0de84729bfbefc791c',
                    'puzzle_hash': '0x478255c372cec71557c20459f4b690fb1b7c57da3fcfc4b6396d78d9a396e384'
                }
            ],
            'amount': 1,
            'confirmed': False,
            'confirmed_at_height': 0,
            'created_at_time': 1661141324,
            'fee_amount': 10000000,
            'memos': [],
            'name': '0xbb4cb461126d9ea9492e767462b9a4e408e497231c2093474cba2bcfe4397104',
            'removals':
            [
                {
                    'amount': 15000000000000,
                    'parent_coin_info':
                    '0x81fc1729bad3f19699461b1ee455a92493ef4c1d60ba37d22ac187a18367e08e',
                    'puzzle_hash': '0x221c0e9cd9b7f536e9a204ef93519e6c9d4b4c9a049bde8d66fa1816c23120d2'
                }
            ],
            'sent': 0,
            'sent_to': [],
            'spend_bundle': None,
            'to_puzzle_hash': '0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9',
            'trade_id': None,
            'type': 1,
            'wallet_id': 1
        }
    ]
}
```

</details>

The only value you need from the JSON blob is `id`, the first value in the output. In the above example, this was

```
'id': '1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f',
```

You can't do anything with this store until it is confirmed on-chain. To check the status of this confirmation, run the `get_root` command, passing in the `id`.

<details>
<summary>get_root example 1</summary>

Your data store will be empty when you first create it. In this case, `get_root` will return an empty hash:

```bash
chia data get_root --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f
```

Response:

```
{
    'confirmed': True,
    'hash': '0x0000000000000000000000000000000000000000000000000000000000000000',
    'success': True,
    'timestamp': 1661148563
}
```

</details>

<details>
<summary>get_root example 2</summary>

After you have added at least one key, `get_root` will return a real hash:

```bash
chia data get_root --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f
```

Response:

```
{
    'confirmed': True,
    'hash': '0xd6d6b4d6bbd77aaa5927c8a21a1451b35f4860a7f9a58e51dae04037da9c08e8',
    'success': True,
    'timestamp': 1661148611
}
```

</details>

### Add and Delete Keys

This requires an on-chain transaction.

Use `update_data_store` to modify your singleton. Actions include `insert` and `delete`. These can also be chained together.

For more example of using this command, see the [CLI reference](/datalayer-cli#update_data_store).

<details>
<summary>update_data_store -- insert example</summary>

```bash
chia data update_data_store --id=1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f -d '[{"action":"insert", "key":"0003", "value":"abc123"}]'
```

Response:

```
{
    'success': True,
    'tx_id': '0xed157b50b94a849d3d19a0ef4e1b0e07bda863e4d65bd1527fa6f59062bb5c78'
}
```

</details>

<details>
<summary>update_data_store -- delete example</summary>

```bash
chia data update_data_store --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f --changelist '[{"action":"delete", "key":"0003"}]'
```

Response:

```
{
    'success': True,
    'tx_id': '0x2a64ef42baf05c6f4d446ba8638c2f2b2c26e5a91ad62e0c5151df40d0f92ec2'
}
```

</details>

### View Keys and Values

You can view the keys and values with `get_keys_values`. This command will only return data that has been confirmed on-chain -- if you run it immediately after adding data, it may not return the keys you expect.

<details>
<summary>get_keys_values example</summary>

For this example, there are two keys in the store:

```bash
chia data get_keys_values --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f
```

Response:

```bash
{
    'keys_values': [
        {
            'atom': None,
            'hash': '0x7e193b814080e50aa7780bcf71fd0422a0397ad3e57dc1eac71d93183efb39ba',
            'key': '0x0004',
            'value': '0x123abc'
        },
        {
            'atom': None,
            'hash': '0xc2dc94c2a85d7db4cfdd1d907bcc441c8fce595db2e2075b973fb8171e2f19a2',
            'key': '0x0005',
            'value': '0xbeadfeed'
        }
    ],
    'success': True
}
```

</details>

### View on-chain history

Use `get_root_history` to view the on-chain history of the root hash.

<details>
<summary>get_root_history example</summary>

```bash
chia data get_root_history --id 1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f
```

Response:

```
{
    'root_history': [
        {
            'confirmed': True,
            'root_hash': '0x0000000000000000000000000000000000000000000000000000000000000000',
            'timestamp': 1661141342
        },
        {
            'confirmed': True,
            'root_hash': '0xe488fa1bf0f712b224df0daf312b3d479f80e3a330d4bebd8f26a0d52dc0ebbb',
            'timestamp': 1661144917
        },
        {
            'confirmed': True,
            'root_hash': '0x0000000000000000000000000000000000000000000000000000000000000000',
            'timestamp': 1661145223
        },
        {
            'confirmed': True,
            'root_hash': '0xb5420e65846ded936d1e4855c066247fc461a3b281cd9e0e69f3cfa4df529ba2',
            'timestamp': 1661145404
        },
        {
            'confirmed': True,
            'root_hash': '0xd6d6b4d6bbd77aaa5927c8a21a1451b35f4860a7f9a58e51dae04037da9c08e8',
            'timestamp': 1661148611
        }
    ],
    'success': True
}
```

</details>

### Create A Mirror to Advertise A Data Store

This requires an on-chain transaction.

We include an HTTP server that can be used out of the box. By default it listens to port 8575.

To "advertise" your mirror on-chain you use the `add_mirror` command. This command takes three arguments:

- `i` -- Your root's ID
- `u` -- The URL of your mirror. You can reuse this argument, as shown in the example below
- `a` -- The amount (in mojos) that will be locked into the mirror while it exists. In theory, a system could prioritize mirrors according to how much was spent to create them. The `amount` will be returned to the creator when the mirror is deleted. Minimum `amount` is 0

<details>
<summary>add_mirror example</summary>

```bash
chia data add_mirror -i 67b5e98abd5fef1a1c44ee63077bc5ef75c6cc4dadc9fd52d63a343922ce496b -u http://www.example2.com:8575 -u http://10.1.1.32:8575/ -a 1000
```

Response:

```python
None
```

</details>

The HTTP server will serve files that are generated by default in the `~/.chia/mainnet/data_layer/db/server_files_location_mainnet` directory.

Note that you can mirror any Data Store, not just your own.

### Subscribe to a Data Store

You can subscribe to a data store in order to watch for changes and download the data from published mirrors by using the `subscribe` command:

<details>
<summary>subscribe example</summary>

```bash
chia data subscribe -store 8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d
```

Response:

```python
None
```

Use the `subscriptions` RPC to list all current subscriptions:

```bash
chia rpc data_layer subscriptions
```

Response:

```bash
{
    "store_ids": [
        "1a119374fc7d7055d3419fdcd7f93065f28a1e4acacdf9c73b933b27b685550f",
        "8f6ed792bbbf5216f8e55064793f74ce01286b9c1d542cc4a357cf7f8712df1d"
    ],
    "success": true
}
```

</details>

Once subscribed, you will automatically try to download updates from any published mirrors for that singleton. You can use the earlier mentioned commands `get_root_history` and `get_keys_values` to look at the history and data of any subscribed data stores. The HTTP server will automatically start to publish data for all subscribed data stores. However, it won't be advertised on-chain unless you specifically use `add_mirror`.
