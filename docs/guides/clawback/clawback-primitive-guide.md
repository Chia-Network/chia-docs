---
slug: /guides/clawback-primitive-guide
title: Clawback Primitive Guide
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Intro

This document will show you how to use Chia's standalone clawback primitive. Wallet developers are welcome to integrate it into their GUI wallets.

For additional technical resources, see the following:

- [Clawback CLI Reference](/clawback-cli)
- [Youtube video explaining clawback](https://www.youtube.com/watch?v=_pC38ulU2js)
- [Clawback user guide](/guides/clawback-user-guide)

:::warning some important notes

- The standalone clawback primitive doesn't implement wallet functionality to handle incoming clawbacks and resync deleted coin stores. Rather, it's for developers to understand the process of how clawbacks work.
- Chia Network, Inc has added a user-friendly implementation of the clawback primitive to version 1.8.2 of the reference wallet.
- A **synced full node** AND a synced wallet are required to use the clawback primitive.
- You are recommended to test the clawback primitive on either the testnet or a simulator before moving to mainnet. For your reference, this guide will use testnet10.
- The clawback primitive currently only supports XCH/TXCH. It does not support CATs or NFTs. The `-w` flag will be ignored if it points to a non-XCH (or TXCH) wallet.

:::

---

### About clawback

The clawback primitive was designed to guard against sending Chia assets to an incorrect address. The principal behind clawback is simple: it is an intermediate coin that cannot be sent to the destination address until a timelock has expired. In the meantime, the Sender can "claw back" the coin, returning it to their wallet in the form of standard XCH.

An Alice-Bob will demonstrate this:

- Alice wants to send 1 XCH to Bob, and she wants to verify that she has entered Bob's address correctly in her wallet.
- With this in mind, Alice creates a clawback coin with the following features:
  - It exists on Chia's blockchain
  - It is viewable by Alice's and Bob's wallets, as well as by block explorers
  - It is worth 1 XCH, funded from Alice's wallet
  - It has a 1-hour timelock
  - It contains Alice's address as its clawback destination (Alice -- and no one else -- can modify this later)
  - It contains Bob's address as its final destination (Bob -- and no one else -- can modify this later)
- The clawback coin therefore contains the following logic for how it may be spent:
  - Before 1 hour has elapsed since the coin's creation, Alice can use [p2_1_of_n](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/puzzles/p2_m_of_n_delegate_direct.clvm) to spend the coin using the same public/private key pair that created the coin. When the coin is spent in this way, a new coin is created using [p2_puzzle_hash](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/puzzles/p2_puzzle_hash.clvm). Typically, this coin will be created in Alice's wallet, but it could be created in another wallet instead. The new coin uses the standard Chia puzzle. This is the `clawback` case.
  - Before 1 hour has elapsed since the coin's creation, nobody other than Alice may spend it
  - After 1 hour, the timelock elapses. At this point Bob can spend the clawback coin. When this spend occurs, by default a new standard XCH coin is created in Bob's wallet. Bob can also pass in a different address than the one he originally specified if he so chooses.
  - Note that the coin's clawback logic is in place for the life of the coin. This means that until the coin is spent, Alice is able to claw it back. This is true regardless of the coin's age. Because of this, after the timelock expires, Bob must spend the clawback coin in order to receive the XCH in his wallet. After this spend has completed, the clawback coin no longer exists, and the spend is final.

This guide will show you how to perform the logic outlined above:

- Create a clawback coin
- Claw back the coin
- Claim the clawback coin

As well as a few other interesting clawback cases.

We'll start by showing you how to install the clawback primitive. This guide assumes you are running a Chia node and wallet, using mainnet, the testnet, or a simulator.

:::warning important

The values used in the commands from this guide are just examples. You will need to update them with the equivalent values from your local node.

:::

---

### Install the clawback primitive

The clawback primitive is included in the `Chia-Network` organization's `chia-clawback-primitive` GitHub repository.

1. Open a new terminal window and run the following command to clone the `chia-clawback-primitive` repository, using the `main` branch:

   ```bash
   git clone https://github.com/Chia-Network/chia-clawback-primitive.git -b main
   ```

2. Change to the cloned repository:

   ```bash
   cd chia-clawback-primitive
   ```

3. Create and activate a virtual environment:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   python3 -m venv venv
   . ./venv/bin/activate
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   python3 -m venv venv
   . ./venv/bin/activate
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

4. Install the clawback primitive:

```bash
pip install .[dev]
```

Several packages will be installed, including a bundled copy of `chia-blockchain`. This process will typically take a few minutes.

5. The clawback primitive should now be installed and configured properly. To test it, run:

```bash
clawback --version
```

You should be shown the current version of the clawback primitive. For example:

```bash
clawback, version 0.1.dev19
```

At this point, you are ready to use the clawback primitive.

---

### Create a clawback coin

For this example, we will use two wallets: a Sender and a Recipient. The Sender has a balance of 10 TXCH and the Recipient has 0 TXCH.

For your reference, here is the Sender wallet's info:

```bash
chia wallet show -f 3807629793
```

Result:

```bash
Wallet height: 2391281
Sync status: Synced
Balances, fingerprint: 3807629793

Chia Wallet:
   -Total Balance:         8.0 txch (8000000000000 mojo)
   -Pending Total Balance: 8.0 txch (8000000000000 mojo)
   -Spendable:             8.0 txch (8000000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

To create the clawback coin from the Sender's wallet, run the [clawback create](/clawback-cli#create) command. The `-t` (Recipient's address) and `-a` (amount in XCH/TXCH) flags are required. By default, the clawback coin will be locked for two weeks. For this demo, we will override the default by using the `-l` flag to specify a timelock period of 600 seconds. We will also use the `-m` flag to include a fee of 0.000275 TXCH.

:::info

The testnet is constantly being dusted (filled with small transactions) in order to simulate a busy network. Because of this you are always recommended to include a fee with testnet transactions. The 275-million mojo fee from this demo should be sufficient to push your transactions through in the next transaction block.

If you are running on mainnet, a fee of 275 million mojos is likely higher than the recommended amount. The reference wallet GUI will suggest an appropriate fee to be included with all transactions.

:::

The Sender will run the following command in this example (once again, these are only example settings; replace the values as needed):

```bash
clawback create -t txch1czxl4c42kwem8jllm4xp78jt7t0j0pu9uh9xw5jddegcu703xnpsqaaxxx -a 0.1 -l 600 -m 0.000275
```

Result:

```bash
Created Coin with ID: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532
Coin { parent_coin_info: dcedd4d573679302ee3f2a54fb51c437b8156e8cd5b1c3c08d25cadf83292c3d, puzzle_hash: 13cb7ce11775a5b42754fb382eb94c846e4be677e6d55bf665b23c075a54e930, amount: 100000000000 }
```

As a result of running this command, a new clawback coin has been created on the blockchain, the details of which are shown above. To view this coin, along with other clawback coins created by this wallet, run the [clawback show](/clawback-cli#show) command:

```bash
clawback show
```

The basic details of the clawback coin are given:

```bash
clawback show
Updating coin records...


Coin ID: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 600 seconds
Time left: 518 seconds
```

### Claw back a coin

This guide will continue from the previous section, where we created a new clawback coin, which has not yet been spent. As a reminder, these are the clawback coin's details:

```bash
clawback show
```

Result:

```bash
Updating coin records...


Coin ID: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 600 seconds
Time left: 518 seconds
```

The same public/private key pair that created this coin must be used to claw it back.

The Sender will use the [clawback claw](/clawback-cli#claw) command, passing in the ID of the coin to claw back:

```bash
clawback claw -c 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532 -m 0.000275
```

As a result, the clawback coin will be spent:

```bash
Submitted spend to claw back coin: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532
```

To show the status of the clawback, run the `clawback show` command once again:

```bash
clawback show
```

Result:

```bash
Updating coin records...
No coins found
```

After the clawback transaction has completed, the Sender wallet's balance has increased (minus transaction fees):

```bash
chia wallet show -f 3807629793
```

Result:

```bash
chia wallet show -f 3807629793
Wallet height: 2405004
Sync status: Synced
Balances, fingerprint: 3807629793

Chia Wallet:
   -Total Balance:         7.99945 txch (7999450000000 mojo)
   -Pending Total Balance: 7.99945 txch (7999450000000 mojo)
   -Spendable:             7.99945 txch (7999450000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

At this point, the clawback coin no longer exists. The Sender is of course free to create new clawback coins as they see fit.

### Claim a clawback coin

In this section, we'll show how to claim a clawback coin. First, the Sender creates a new clawback coin with a 60-second timelock:

```bash
clawback create -t txch1czxl4c42kwem8jllm4xp78jt7t0j0pu9uh9xw5jddegcu703xnpsqaaxxx -a 0.1 -l 60 -m 0.000275
```

Result:

```bash
Created Coin with ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
Coin { parent_coin_info: f5e408a15299df27a00d0403ea50ed29a06f87a31b638cff1b63ef3e6060b45a, puzzle_hash: 2e91566d9549cb909109d147c79b457d15ced2d8a24dea5a125b1e5c05cdd1ec, amount: 100000000000 }
```

The Sender can run the `clawback show` command to show the details of each of their clawback coins:

```bash
clawback show
```

Result:

```bash
Updating coin records...


Coin ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 60 seconds
Time left: 23 seconds
```

The timelock expires when the `Time left:` value reaches `0 seconds`:

```bash
clawback show
```

Result:

```bash
Updating coin records...


Coin ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 60 seconds
Time left: 0 seconds
```

For your reference, the Recipient wallet currently has a balance of 0 XCH:

```bash
chia wallet show -f 1231588123
```

Result:

```bash
Wallet height: 2405060
Sync status: Synced
Balances, fingerprint: 1231588123

Chia Wallet:
   -Total Balance:         0.0 txch (0 mojo)
   -Pending Total Balance: 0.0 txch (0 mojo)
   -Spendable:             0.0 txch (0 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

The Recipient (or anyone else) can view the status of the clawback coin if they know the coin ID:

```bash
clawback show -c ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
```

Result:

```bash
Updating coin records...


Coin ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 60 seconds
Time left: 0 seconds
```

The value of `Time left:` is `0 seconds`. In most cases (see the info box below for more info), the Recipient can now run the [clawback claim](/clawback-cli#claim) command to claim the coin:

```bash
clawback claim -c ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
```

Result:

```bash
Submitted spend to claim coin: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5
```

:::info

In most cases, if the output of the `clawback show` command contains `Time left: 0 seconds`, this indicates that the Recipient can proceed with the `claim` call.

However, there is a small window of time where the timer has expired, but a block still hasn't been farmed with a timestamp after the expiry. If the Recipient attempts to make the `claim` call during this window, they will receive the following error:

```
You are trying to claim the coin too early
```

In this case, the Recipient needs to wait for one more transaction block to be farmed before proceeding with the `claim` call. As a reminder, a new transaction block is farmed every 52 seconds, on average.

:::

While the `claim` transaction is being processed, it will show in the `Pending Total Balance:` of the Recipient's wallet:

```bash
chia wallet show -f 1231588123
```

Result:

```bash
Wallet height: 2405100
Sync status: Synced
Balances, fingerprint: 1231588123

Chia Wallet:
   -Total Balance:         0.0 txch (0 mojo)
   -Pending Total Balance: 0.1 txch (100000000000 mojo)
   -Spendable:             0.0 txch (0 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

Finally, the Recipient can view the additional balance in their wallet:

```bash
chia wallet show -f 1231588123
```

Result:

```
Wallet height: 2405465
Sync status: Synced
Balances, fingerprint: 1231588123

Chia Wallet:
   -Total Balance:         0.1 txch (100000000000 mojo)
   -Pending Total Balance: 0.1 txch (100000000000 mojo)
   -Spendable:             0.1 txch (100000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

The spend is now complete and can no longer be clawed back. The funds are stored as a standard Chia coin in the Recipient's wallet.

---

### Other cases

So far, we have shown the standard clawback and completion spends. There are also a few edge cases and errors worth discussing.

#### Sender performs a clawback after the timelock

After the timelock expires, the Recipient may claim the clawback coin. Until this is done, the Sender can still claw back the coin.

Let's say the Sender's wallet contains 7.899175 TXCH:

```bash
chia wallet show -f 3807629793
```

```bash
Wallet height: 2405202
Sync status: Synced
Balances, fingerprint: 3807629793

Chia Wallet:
   -Total Balance:         7.899175 txch (7899175000000 mojo)
   -Pending Total Balance: 7.899175 txch (7899175000000 mojo)
   -Spendable:             7.899175 txch (7899175000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

The Sender creates a new clawback coin:

```bash
clawback create -t txch1czxl4c42kwem8jllm4xp78jt7t0j0pu9uh9xw5jddegcu703xnpsqaaxxx -a 0.1 -l 60 -m 0.000275
```

Result:

```bash
Created Coin with ID: 5024cdd687a70d8a1340e774a9e29c3dc2aa1e3726eaae40700f2859db5fdd1e
Coin { parent_coin_info: b07dbf3274bfdb49d5082fac741c4f26bf7cf5ca5382dc27234e7602b9bf66ce, puzzle_hash: f0f6294fbc4cf903694000b18764c05a4530b340a783f85dbdb2ef60c29873bb, amount: 100000000000 }
```

The Sender waits waits for the clawback's timelock to expire:

```bash
clawback show
```

Result:

```bash
Coin ID: 5024cdd687a70d8a1340e774a9e29c3dc2aa1e3726eaae40700f2859db5fdd1e
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 60 seconds
Time left: 0 seconds
```

At this point, the Recipient could claim this coin. However, the Sender also can claw back this coin:

```bash
clawback claw -c
```

Result: 5024cdd687a70d8a1340e774a9e29c3dc2aa1e3726eaae40700f2859db5fdd1e

```bash
Submitted spend to claw back coin: 5024cdd687a70d8a1340e774a9e29c3dc2aa1e3726eaae40700f2859db5fdd1e
```

After the transaction completes, the clawback coin has been returned to the Sender's wallet. The Sender's balance matches the original balance, minus any transaction fees:

```bash
chia wallet show -f 3807629793
```

Result:

```bash
Wallet height: 2405553
Sync status: Synced
Balances, fingerprint: 3807629793

Chia Wallet:
   -Total Balance:         7.8989 txch (7898900000000 mojo)
   -Pending Total Balance: 7.8989 txch (7898900000000 mojo)
   -Spendable:             7.8989 txch (7898900000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

Because the Sender can always claw back a clawback coin while it exists, the Recipient cannot assume that they will receive the clawback coin, even after the timelock has expired. However, after the Recipient has claimed the clawback coin and it has appeared in the Recipient's wallet as regular XCH/TXCH, the coin can no longer be clawed back.

#### Recipient attempts to claim clawback coin before timelock has expired

Before the timelock expires, a clawback coin may not be spent to its Recipient's address. For example, let's say the following clawback coin exists. Note that its `Time left:` is still greater than 0 seconds:

```bash
clawback show -c 8aec68811dfa272e1655eb75c93de5011d9f1efb7d4ad81c610d0045055f8b8f
```

Result:

```bash
Updating coin records...


Coin ID: 8aec68811dfa272e1655eb75c93de5011d9f1efb7d4ad81c610d0045055f8b8f
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 600 seconds
Time left: 529 seconds
```

At this point, if the Recipient attempts to claim the clawback coin, it will not succeed:

```bash
clawback claim -c 8aec68811dfa272e1655eb75c93de5011d9f1efb7d4ad81c610d0045055f8b8f -m 0.000275
```

Result:

```bash
You are trying to claim the coin too early
```

#### Someone other than the Sender attempts to claw back a coin

For this example, the Sender creates a new clawback coin:

```bash
clawback create -t txch1czxl4c42kwem8jllm4xp78jt7t0j0pu9uh9xw5jddegcu703xnpsqaaxxx -a 1 -l 300 -m 0.000275
```

Result:

```bash
Created Coin with ID: cb11caa0f4d02b08b94e949e34105b7f5cd4f6918fd65c92beeeded6aea1f8eb
Coin { parent_coin_info: 73efa5832a6d639871b7170dca86c97c1b79610a9f826d0533026d2d655e80ae, puzzle_hash: efa2dbe8f4634952518037fd1daeb3d38771a41e1ddb81657cc8d803b31c7512, amount: 1000000000000 }
```

A different wallet (it could be the Recipient, or any other wallet) is unable to view the clawback without knowing the Coin ID:

```bash
clawback show
```

Result:

```bash
clawback show
Updating coin records...
No coins found
```

However, if the owner of the non-Sender wallet knows the Coin ID, they _can_ view the clawback coin:

```bash
clawback show -c cb11caa0f4d02b08b94e949e34105b7f5cd4f6918fd65c92beeeded6aea1f8eb
```

Result:

```bash
Updating coin records...


Coin ID: cb11caa0f4d02b08b94e949e34105b7f5cd4f6918fd65c92beeeded6aea1f8eb
Amount: 1 XCH (1000000000000 mojos)
Timelock: 300 seconds
Time left: 131 seconds
```

If the non-Sender wallet attempts to claw the coin back, then this will fail:

```bash
clawback claw -c cb11caa0f4d02b08b94e949e34105b7f5cd4f6918fd65c92beeeded6aea1f8eb -m 0.000275
```

Result:

```bash
Traceback (most recent call last):
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\runpy.py", line 197, in _run_module_as_main
    return _run_code(code, main_globals, None,
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\runpy.py", line 87, in _run_code
    exec(code, run_globals)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\Scripts\clawback.exe\__main__.py", line 7, in <module>
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\cli\main.py", line 449, in main
    asyncio.run(cli())  # pylint: disable=no-value-for-parameter
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 1130, in __call__
    return self.main(*args, **kwargs)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 1055, in main
    rv = self.invoke(ctx)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 1657, in invoke
    return _process_result(sub_ctx.command.invoke(sub_ctx))
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 1404, in invoke
    return ctx.invoke(self.callback, **ctx.params)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 760, in invoke
    return __callback(*args, **kwargs)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\cli\main.py", line 348, in claw_cmd
    asyncio.get_event_loop().run_until_complete(do_command(fee, wallet_id, target_address, fingerprint))
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\asyncio\base_events.py", line 642, in run_until_complete
    return future.result()
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\cli\main.py", line 317, in do_command
    spend = await manager.create_clawback_spend(cb_info, target_ph, fee)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\drivers\cb_manager.py", line 195, in create_clawback_spend
    inner_puzzle = await self.get_puzzle_for_puzzle_hash(cb_info.sender_ph)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\drivers\cb_manager.py", line 85, in get_puzzle_for_puzzle_hash
    private_key, _, _ = await self.get_keys_for_puzzle_hash(puzzle_hash)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\drivers\cb_manager.py", line 82, in get_keys_for_puzzle_hash
    raise ValueError(f"Couldn't find a matching key for puzzle hash: {puzzle_hash}.")
ValueError: Couldn't find a matching key for puzzle hash: ee3144040e80747af2f6ec56ed7567d22ca83ea3470e09bb9d95347a80cd2d29.
```

#### Someone other than the Recipient attempts to claim a clawback spend

For this example, someone other than the Recipient is made aware of the Coin ID of a pending clawback coin:

```bash
clawback show -c cb11caa0f4d02b08b94e949e34105b7f5cd4f6918fd65c92beeeded6aea1f8eb
```

Result:

```bash
Updating coin records...


Coin ID: cb11caa0f4d02b08b94e949e34105b7f5cd4f6918fd65c92beeeded6aea1f8eb
Amount: 1 XCH (1000000000000 mojos)
Timelock: 300 seconds
Time left: 0 seconds
```

Only the Recipient may attempt to claim a clawback spend. If another wallet (it could be the Sender, or any other wallet) attempts this, the claim will fail:

```bash
clawback claim -c cb11caa0f4d02b08b94e949e34105b7f5cd4f6918fd65c92beeeded6aea1f8eb -m 0.000275
```

Result:

```bash
Traceback (most recent call last):
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\runpy.py", line 197, in _run_module_as_main
    return _run_code(code, main_globals, None,
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\runpy.py", line 87, in _run_code
    exec(code, run_globals)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\Scripts\clawback.exe\__main__.py", line 7, in <module>
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\cli\main.py", line 449, in main
    asyncio.run(cli())  # pylint: disable=no-value-for-parameter
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 1130, in __call__
    return self.main(*args, **kwargs)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 1055, in main
    rv = self.invoke(ctx)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 1657, in invoke
    return _process_result(sub_ctx.command.invoke(sub_ctx))
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 1404, in invoke
    return ctx.invoke(self.callback, **ctx.params)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 760, in invoke
    return __callback(*args, **kwargs)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\cli\main.py", line 444, in claim_cmd
    asyncio.get_event_loop().run_until_complete(do_command(fee, wallet_id, target_address, fingerprint))
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\asyncio\base_events.py", line 642, in run_until_complete
    return future.result()
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\cli\main.py", line 413, in do_command
    spend = await manager.create_claim_spend(coin_record.coin, target_ph, fee)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\drivers\cb_manager.py", line 242, in create_claim_spend
    inner_puzzle = await self.get_puzzle_for_puzzle_hash(recipient_ph)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\drivers\cb_manager.py", line 85, in get_puzzle_for_puzzle_hash
    private_key, _, _ = await self.get_keys_for_puzzle_hash(puzzle_hash)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\drivers\cb_manager.py", line 82, in get_keys_for_puzzle_hash
    raise ValueError(f"Couldn't find a matching key for puzzle hash: {puzzle_hash}.")
ValueError: Couldn't find a matching key for puzzle hash: c08dfae2aab3b3b3cbffdd4c1f1e4bf2df278785e5ca67524d6e518e79f134c3.
```

#### Sender claws back coin to a new wallet

The Sender has the option of performing a clawback where the coin is sent to any wallet. Let's say the Sender creates a clawback coin:

```bash
clawback create -t txch1czxl4c42kwem8jllm4xp78jt7t0j0pu9uh9xw5jddegcu703xnpsqaaxxx -a 0.1 -l 60 -m 0.000275
```

Result:

```bash
Created Coin with ID: 73e062705a7b44ffc92e7e79dcae8b365363fb2f7d0cf2e983905544f99a6a47
Coin { parent_coin_info: 175def0bab89a08a091af7ab02fe71523437c636dd3f746b49243915ffed4d74, puzzle_hash: 4975c4c0de463699efd07a376aebb0f81454ee406c0d5492c67aa3ee9c928ff3, amount: 100000000000 }
```

The Sender can then claw back the coin to a new wallet address:

```bash
clawback claw -c 73e062705a7b44ffc92e7e79dcae8b365363fb2f7d0cf2e983905544f99a6a47 -m 0.000275 -t txch13alcyq2x9px5mhcvalhq4jj9g9n8asz6ud8htmguwejrl6j722cq4ahxkw
```

Result:

```bash
Submitted spend to claw back coin: 73e062705a7b44ffc92e7e79dcae8b365363fb2f7d0cf2e983905544f99a6a47
```

Note that the wallet address specified in the `claw` command does not need to be associated with the Sender's wallet.
In this case, the address belongs to a separate wallet. After the clawback completes, the new wallet has received the clawback coin:

```bash
chia wallet show -f 1010362042
```

Result:

```bash
Wallet height: 2405908
Sync status: Synced
Balances, fingerprint: 1010362042

Chia Wallet:
   -Total Balance:         0.1 txch (100000000000 mojo)
   -Pending Total Balance: 0.1 txch (100000000000 mojo)
   -Spendable:             0.1 txch (100000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

#### Recipient claims a clawback coin in a new wallet address

The Recipient also has the option of spending a clawback coin to a new address.

Let's say the Sender creates the following clawback coin:

```bash
clawback create -t txch1czxl4c42kwem8jllm4xp78jt7t0j0pu9uh9xw5jddegcu703xnpsqaaxxx -a 0.1 -l 60 -m 0.000275
```

Result:

```bash
Created Coin with ID: fddcfe2a4fcb7705646c809993a762664c1b0442b74d14d1298d91a3a198975b
Coin { parent_coin_info: 478f112fe50a5680ccd4617ff9ba00edffb0aa59e72cf77742af4037f17ee38f, puzzle_hash: bbaa15db9dd52f8c5f27ce4bbb26776b11690cd1f0bc3cebd5d77ab118c680b2, amount: 100000000000 }
```

After the timelock expires, the Recipient verifies that the coin can be claimed:

```bash
clawback show -c fddcfe2a4fcb7705646c809993a762664c1b0442b74d14d1298d91a3a198975b
```

Result:

```bash
Updating coin records...


Coin ID: fddcfe2a4fcb7705646c809993a762664c1b0442b74d14d1298d91a3a198975b
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 60 seconds
Time left: 0 seconds
```

The Recipient can pass in a new address when claiming the coin:

```bash
clawback claim -c fddcfe2a4fcb7705646c809993a762664c1b0442b74d14d1298d91a3a198975b -m 0.000275 -t txch12adzcdatddls80qnpnlnp3mn3tu0rvjwgs9yeyfg8vr2agremjpsp74p0c
```

Result:

```bash
Submitted spend to claim coin: fddcfe2a4fcb7705646c809993a762664c1b0442b74d14d1298d91a3a198975b
```

Note that the wallet address does not need to belong to the Recipient's wallet. In this case, the address belongs to a totally separate wallet.

After the `claim` transaction has completed, the clawback coin will show up as a standard Chia coin in the alternative wallet:

```bash
chia wallet show -f  4215889205
```

Result:

```bash
Wallet height: 2405955
Sync status: Synced
Balances, fingerprint: 4215889205

Chia Wallet:
   -Total Balance:         0.1 txch (100000000000 mojo)
   -Pending Total Balance: 0.1 txch (100000000000 mojo)
   -Spendable:             0.1 txch (100000000000 mojo)
   -Type:                  STANDARD_WALLET
   -Wallet ID:             1
```

#### Sender or Recipient attempts to show a clawback coin before it has been created

Two important rules to keep in mind:

1. A clawback coin's creation requires an on-chain transaction
2. On Chia's blockchain, the average time between transaction blocks is 52 seconds

Whenever a Sender creates a clawback coin, there is a period where the transaction is pending. During this period, it is not possible to view the exact details of the clawback coin.

If the Sender attempts to view the coin:

```bash
clawback show
```

The `Time left:` value will be listed as `pending`:

```bash
Updating coin records...


Coin ID: 4fc6be4bd086e2b0600aab0075b67a6dada1a0bb8041d7206e9744c1d3810ec8
Amount: 0.1 XCH (100000000000 mojos)
Timelock: 600 seconds
Time left: pending
```

If someone other than the Sender wants to view the coin, they will need to pass in the Coin ID (the Sender could also do this and get the same result):

```bash
clawback show -c 4fc6be4bd086e2b0600aab0075b67a6dada1a0bb8041d7206e9744c1d3810ec8
```

In this case, an error will be thrown:

```bash
Updating coin records...
Traceback (most recent call last):
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\runpy.py", line 197, in _run_module_as_main
    return _run_code(code, main_globals, None,
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\runpy.py", line 87, in _run_code
    exec(code, run_globals)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\Scripts\clawback.exe\__main__.py", line 7, in <module>
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\cli\main.py", line 444, in main
    asyncio.run(cli())  # pylint: disable=no-value-for-parameter
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 1130, in __call__
    return self.main(*args, **kwargs)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 1055, in main
    rv = self.invoke(ctx)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 1657, in invoke
    return _process_result(sub_ctx.command.invoke(sub_ctx))
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 1404, in invoke
    return ctx.invoke(self.callback, **ctx.params)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\click\core.py", line 760, in invoke
    return __callback(*args, **kwargs)
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\cli\main.py", line 254, in show_cmd
    asyncio.get_event_loop().run_until_complete(do_command(coin_id, fingerprint))
  File "C:\Users\User\AppData\Local\Programs\Python\Python39\lib\asyncio\base_events.py", line 642, in run_until_complete
    return future.result()
  File "C:\Users\User\Chia\clawback\chia-clawback-primitive\venv\lib\site-packages\src\cli\main.py", line 230, in do_command
    block = await node_client.get_block_record_by_height(record.confirmed_block_height)
AttributeError: 'NoneType' object has no attribute 'confirmed_block_height'
```
