---
title: Pool Farming
slug: /pool-farming
---

Due to the increasing network space (netspace), winning blocks in Chia is a very difficult task, and can take months even years for
users with multiple hard drives farming Chia. Pooling can allow you to win consistently, in small amounts. For example,
a user earning 2XCH per 20 weeks while solo farming, can instead earn 0.1XCH per week, in a much more consistent schedule.

The Chia pooling protocol allows you to assign plots to a "Plot NFT", which is kind of like a contract on the blockchain
which you control, and in which you can set your currently assigned pool. You can also change the pool that the Plot NFT
is assigned to at any time.

With the pooling protocol, your farmer will communicate with a specific pool server, and send proofs of space very often to that pool, in order to prove how much plotted space you have. Therefore the pool can keep track of the space of
each of its members (the farmers), and whenever one of the members wins a block, the pool can distribute rewards proportional to
the amount of space that each farmer contributed.

Therefore, pooling is kind of like lottery insurance: all of the members participate in the Chia "lottery", and whenever
one member wins, the pool gets the reward and distributes it to all of the members, minus a small fee. The reward is divided into two tranches: 7/8 is split among the pool members, and the other 1/8 goes directly to the farmer who won the block.

## How to Start Pooling in 6 Steps

:::note

The official pooling protocol was introduced in verion 1.2 in mid-2021. All plots created before this point, as well as newer plots created with following the pooling protocol, are not eligible for pooling. If you have any of these "OG" plots, you can either recreate them using a plot NFT, or co-farm them on the same machine as your official pool plots.

:::

### Step 1: Sync your full node and wallet

In order to set up your farm for pooling, you need to have a synced full node and wallet. In the upper-right corner of your wallet, you should see green icons next to `FUll NODE` and `WALLET`:

<div style={{textAlign: 'left'}}>
 <img src="/img/pooling/01.png" alt="Sync status"/>
</div><br/>

:::info

If you want to avoid syncing from genesis, you can download a [database checkpoint](https://www.chia.net/downloads/#database-checkpoint).

For more info, see our [blog post](https://www.chia.net/2023/03/19/introducing-chia-blockchain-database-bittorent-checkpoints/) on this subject.

:::

### Step 2: Receive some XCH

To start pooling, you first need a tiny amount of Chia in your wallet. You can ask your friends to send you some mojos
(1 mojo is 0.000000000001 XCH), or get some using https://faucet.chia.net/. You can use the receive address on the `Tokens` page, and you can also create new receive addresses. Any of the receive addresses can be used; they are all part of the same wallet.

### Step 3: Create Plot NFT

Once you have some XCH in your wallet, go to the pool tab, and click on "Add a Plot NFT".

#### Using the CLI

You now have two options:

1. Self pooling: this plot NFT will not be connected to any pools, and the 1.75 XCH will go directly into your wallet. This is different than OG (original) plots, since OG plots are locked in to self farming forever.
   From CLI:

```bash
chia plotnft create -s local
```

2. Connect to pool: join a pool, and immediately start pooling, as soon as you make some plots.
   From CLI:

```bash
chia plotnft create -s pool -u https://bar.examplepool.org
```

Note that even if you choose 1, you can join a pool later, and you can switch your pool at any moment. If you decide
to join a pool, enter the url (must start with _https://_), and look at the description. If you agree, create the Plot
NFT, and wait for it to be confirmed (click only once). It can take several minutes for it to be confirmed and to show up in the Pools tab.
You only need 1 plot NFT.

#### Using the GUI

Click the `Pooling` icon on the left side of your wallet, and click `JOIN A POOL`:

<div style={{ textAlign: 'left' }}>
  <img src="/img/pooling/02.png" alt="Join a pool" />
</div>
<br />

Select `Connect to pool`. You will need to enter a valid pool URL. For a list of Chia pools, see [chialinks.com](https://chialinks.com/pools).

Creating a plot NFT requires an on-chain transaction that will cost one mojo. You are also recommended to enter a blockchain fee. Depending on how busy the network is, a one-mojo fee is typically enough to complete your transaction within a few minutes.

<div style={{ textAlign: 'left' }}>
  <img src="/img/pooling/03.png" alt="Create a plot NFT" />
</div>
<br />

If you entered a valid pool URL, the details will pop up. If everything looks acceptable, click `CREATE`:

<div style={{ textAlign: 'left' }}>
  <img src="/img/pooling/04.png" alt="Pool details" />
</div>
<br />

Your transaction will be pushed to the blockchain. While it is pending, a new screen will appear:

<div style={{ textAlign: 'left' }}>
  <img src="/img/pooling/05.png" alt="Plot NFT pending" />
</div>
<br />

After the transaction has been finalized (typically 1-3 minutes), the details of your plot NFT will appear.

:::info

A two-word name will automatically be assigned to your plot NFT.

:::

### Step 4: Add Plots

You can now start creating plots for this Plot NFT, which means these plots will be "pooling" and can earn rewards more often.

Detailed instructions can be found in the "How to Plot" page:
* Plotting from the [CLI](/plotting-how-to#cli-plotting)
* Plotting from the [GUI](/plotting-how-to#gui-plotting)

### Step 5: Manage your Plot NFT

You should see your plots in the `Pooling` dialog. The status should say `Pooling``. From here, you can see your
difficulty, the number of points earned, and how many points the pool thinks you have (points balance).

<div style={{ textAlign: 'left' }}>
  <img src="/img/pooling/06.png" alt="Plot NFT details" />
</div>
<br />

The difficulty is a value that is different for each plot NFT, which determines how hard it is to find a proof
for those plots. This will get set automatically so that your plots find proofs very often (every few minutes or hours).
Each proof found will award you with `difficulty` points. Farmers with many plots will have a higher difficulty, to keep disk usage low.

Points are a way to count how many proofs your plots found. Each k32 plot will get on average 10 points per day,
independent of what the difficulty is. Points are NOT the same as Chia (XCH). Points are just a value that reflects how much farming you have done. Think of it as an accounting tool. It is the responsibility of the pool to periodically reward you with XCH based on how many points you obtain, and then reset your points back to 0.

To change pools, click on the `CHANGE POOL` button and enter the new pool URL. Note that changing pools has a waiting
period that can be from a few minutes to an hour or so. Please do not shut down your application while this is happening. You can change pools as many times as you want, and there is no penalty or registration required for doing so. Be aware that if you change pools, your old pool is not obligated to pay you anymore, more than they already have.

You should ensure that your points found in the last 24h are accurate. You should be obtaining around 10 points per day
per k32, so if you have 100 k32 plots, you should be getting around 1000 points per day. Make sure your points balance
is going up. After you get paid, the points balance will reset to zero. Points will come at random times, since finding proofs is still random. Therefore expect a lot of variability and times of both good and bad luck.

### Step 6: Wait for Payouts

You are now done. If your points balance is increasing, you are properly pooling, and you should check your pool to see
how often payouts happen, and to optionally log in to a pool interface.

## Additional Information

### Multiple Plot NFTs

You can have multiple plot NFTs on the same key, and they can all be farmed at the same time. You can also farm
original (OG) plots as well.

### Multiple Computers

You can take your 24-word seed phrase and enter it into a different computer, and when it is synched, the current Plot NFTs and
pool information will be automatically downloaded from the blockchain. All information about your pool, plot NFTs, and smart contract addresses is completely backed up on the blockchain, and can be recovered using the seed phrase.

### Multiple Keys

You can also have multiple keys farming at the same time, but be careful with this. Each key has to sync separately,
and if you change pools in one computer (computer A), then you must sync up your wallet on computer B in order to farm
it separately. If computer B has multiple keys, make sure to sync each key up to the latest changes in the Plot NFT.

### Pool Fees

Pool fees refer to the small cut that pools take when they distribute rewards to farmers. Each pool can set their own fee structure.

### Blockchain Fees

Blockchain fees are paid to the creator of the block (farmers), to incentivize them to include your transaction. If the blockchain is busy, you might have to
pay small a small fee to get your transaction included. (Creating a plot NFT and changing pools both require an on-chain transaction.)

### Invalid State

If you enter into an invalid state, you need to re-join or change to self-pooling again. This can happen if you close
the GUI before a pool switching operation has finalized. Please click "change pool", and re-enter the pool URL, or switch to self pooling. Sometimes you might need to wait a bit for the pool switching timeout to finish.

### Payout addresses

The block reward is divided into two components, the pool portion (7/8 of the total reward) and the farmer portion (1/8).

-   The pool portion gets paid out to the pool, which will pay you according to their payout schedule. This is configurable in the Pool tab of the GUI: Click the three dots on the upper-right corner of your plot NFT and click "Edit Payout Instructions." This is also configurable in `config.yaml` in the pool_list section under payout_instructions.
-   The farmer portion will go to your farmer target address. This is configurable in the Farm tab of the GUI, or in `config.yaml` under farmer.xch_target_address.

### Self Pooling

If you are self-pooling, you will additionally need to claim your rewards after winning a block. This can be done from the GUI or CLI as well. There is no time limit for this, but if you do not claim your rewards before switching to a pool, the pool will be able to claim those rewards, and you will lose these funds.

### Remote Harvesters

Remote harvesters work the same way as always. They do not need to have any keys, and you can plot directly on another machine with the `-f` and `-c` arguments. The farmer machine needs to have the private key for the `-f` key, and the private key for the wallet that created the plot NFT. Your harvesters will find proofs more often when pooling, since the difficulty is lower. Remote harvester plots will now be visible by doing `chia farm summary`.

### Command Line Interface

Using the CLI, you can perform the same operations as with the GUI. There is a new command, called `chia plotnft`. Type `chia plotnft -h` to see all the available sub-commands:

```
» chia plotnft -h
Usage: chia plotnft [OPTIONS] COMMAND [ARGS]...

Options:
  -h, --help  Show this message and exit.

Commands:
  claim           Claim rewards from a plot NFT
  create          Create a plot NFT
  get_login_link  Create a login link for a pool. To get the launcher id, use
                  plotnft show.

  inspect         Get Detailed plotnft information as JSON
  join            Join a plot NFT to a Pool
  leave           Leave a pool and return to self-farming
  show            Show plotnft information
```

To create a Plot NFT, run:

```bash
chia plotnft create -u <https://poolnamehere.com>
```

Be sure to change `<https://poolnamehere.com>` to the URL of the pool you want to use.

To create a plot NFT in self-farming mode, run:

```bash
chia plotnft create -s local
```

To switch pools, you can run:

```bash
chia plotnft join
```

To leave a pool (switch to self farming), run:

```bash
chia plotnft leave
```

To view the status of your Plot NFT, run:

```bash
chia plotnft show
```

---

## Pooling FAQ

### What is a plot NFT?

A plot NFT (Non Fungible Token), is a smart coin or token on the blockchain, which allows a user to manage their membership in a pool. Users can assign the plot NFT to any pool they want, at any point. When plotting, a plot NFT can be selected, and the plot will be tied to that plot NFT forever. NFTs are "non-fungible" because they are not interchangeable; each plot NFT represents a unique pool contract.

### Will I need pay XCH to create a plot NFT or switch pools?

Each plot NFT you create will require 1 mojo (1 trillionth of a XCH) + transaction fee. For switching pools, you need to pay only a transaction fee. For those who don't have any XCH, you can get 100 mojos from Chia's official faucet: https://faucet.chia.net/

### Can I farm with both OG (original) plots and portable plots?

Yes. The farmer will support both OG plots and portable plots on one machine. The OG plots will not be affected in any way by the plot NFTs or new plots that you create.

### How do I assign portable plots to a pool?

First you will create a Plot NFT (devs call this singleton in their code) in the new pools tab in the GUI. When you create a new portable plot, you must assign it a specific Plot NFT (for those using CLI, this replaces the Pool Public Key `-p` with a Pool Contract Address `-c`). All plots created with the same Plot NFT can then be assigned to a pool for farming. You can have many plot NFTs on the same key.

### What is the difference between a "Key" and a "Wallet" in the Chia GUI and CLI?

A user can have one or more keys on a machine running Chia. A key is represented by the private information (24 words) and the public identifier called the `fingerprint`. When using the GUI or the CLI, you can only log in to one key at a time. Each key must be synced separately, and you can check if it is synced by clicking on the "wallet" tab. Each key can also have 1 or more wallets associated with it. The standard wallet, which controls your Chia, is created by default. You can also create as many Plot NFTs as you want, which are also wallets, and each have their own "wallet id" as well, and they are tied to the key that you used to create them. In the CLI, you use both `fingerprint` and `wallet_id` to perform operations on Plot NFTs, which represent the key and wallet ID for that Plot NFT.

### How is Chia pooling different from other cryptos?

Chia has three major differences from most other crypto pooling protocol: 
1. Joining pools is permissionless. You do not need to sign up to an account on a pool server before joining. 
2. Farmers receive 1/8 of the block reward plus transaction fees, while the pool receives 7/8 of the reward to redistribute (minus pool fees) amongst all pool participants.
3. The farmer with the winning proof will farm the block, not the pool server.

### How can I start my own pool?

If you have experience writing pool server code for another crypto, adapting that pool code with Chia's reference pool code will be straight forward. We only recommend people who have good OPSEC and business experience to run public pool servers. Depending what country you operate your pooling business, you may be subject to tax, AML and KYC laws specific to your jurisdiction. All pools will be targeted by hackers due to the profitability of XCH and you may be legally liable if you have any losses.

### Where can I find a list of Chia pools?

A crypto community site lists all upcoming Chia pools: https://miningpoolstats.stream/chia

### Can I advertise my pool in Discord?

You can only advertise your pool in Discord #Promote-community-projects once a day. If you're spammy, mods will warn you and then ban you if you persist.

### Why doesn't Chia run their own official pool?

We want there to be a healthy ecosystem of competing pools with no privileged official one having an unfair advantage over the others.

### Can I name my pool chiapool.com?

We are not going to allow pools to use "Chia" as the first word or its equivalent (the Chia pool). You can say things like "a Chia pool" though that will probably need a free and easy to get license. Go to https://www.chia.net/terms/ to get more information on obtaining a license.

### If a pool gets 51% of netspace, can they take over the network?

No, Chia's pooling protocol is designed where the blocks are farmed by individual farmer, but the pooling rewards go to the pool operator's wallet. This ensures that even if a pool has 51% netspace, they would also need to control ALL of the farmer nodes (with the 51% netspace) to do any malicious activity. This will be very difficult unless ALL the farmers (with the 51% netspace) downloaded the same malicious Chia client programmed by a Bram like level genius.

### I have more questions, where do I ask?

Join our dedicated [Discord](https://discord.gg/chia)

Friendly reminder: do NOT at `@` or Direct Message (DM) developers or mods. Just post your questions in Discord and we will answer when we have a moment.

## Technical FAQ

### Where can I see the Chia Pool Reference Code?

You can find it here: https://github.com/Chia-Network/pool-reference.
The README contains an explanation of how it works, and the specification contains details of how to implement it.

### What programming language is the reference pool code written in?

Python

### How hard is it to adapt Chia's reference pool code to my pool code?

If you've written pool code before, the reference pool code will be easy to understand. It's just replacing PoW concepts with Chia's method of evaluating each farmer's participation via PoST and adapting collection and distribution of XCH using Chia's smart contracts.

### I am a programmer, but never wrote pool code, will I be able to run a pool with Chia's reference pool code?

If it's your first time writing pool code, we recommend you look at established BTC or ETH pools source code and features they provide users. You are likely going to compete with big time pool operators from those crypto communities who will provide feature rich pools for Chia on day one. Examples of features: leaderboards, wallet explorer, random prizes, tiered pool fees, etc.

### Variable names used in pooling code

-   puzzle_hash: an address but in a different format. Addresses are human readable.
-   singleton: a smart coin (contract) that guaranteed to be unique and controlled by the user.
-   launcher_id: unique ID of the singleton.
-   points: represent the amount of farming that a farmer has done. It is calculated by number of proofs submitted, weighted by difficulty. One k32 farms 10 points per day. To accumulate 1000 points you need 10 TiB farming for a day. This is equivalent to shares in PoW pools.

### How does one calculate a farmer's space?

A farmer's space can be estimated by the number of points submitted over each unit of time, or points/second. Each k32 gets on average 10 points per day. So `10 / 86400 = 0.0001157 points/second` for each plot. Per byte, that is `L = 0.0001157 / 108884400275 = 1.06259482265 * 10^-15`. To calculate total space `S`, take the total number of points found `P`, and the time period in seconds `T` and do `S = P / (L*T)`.  
For example for 340 points in 6 hours, use `P=340, T=21600, L=1.06259482265e-15`, `S = 340/(21600*1.06259482265e-15) = 14,813,492,786,900 bytes`. Dividing by `1024^4` we get `13.4727932044 TiB`.

:::info

Note that this calculation is based on the new constant space factor estimation of 0.78005, as detailed in the [space factor table](/k-sizes#new-constant-space-factor).

:::

### How does difficulty affect farmer's space calculation?

As difficulty goes up, a farmer does less lookups and finds less proofs, but does not receive more points per unit of time. Imagine this scenario: Obtaining 10 proofs a day with difficulty 1 for a k32, is equivalent to obtaining 1 proof a day with difficulty 10. As a pool server, you prefer to receive 1 proof a day per K32 with difficulty 10. This is why we allow pool servers to set a minimum difficulty level to reduce the number of proofs each farmer needs to send to prove their space.

### How do you identify the farmer that submitted partial proofs?

The farmer will provide their launcher_id which is the ID of that farmer's pool group. The pool also verifies the proof of space and the farmer's signature, to make sure that only real farmers are compensated.

### Will pool servers need to keep track of all farmers and their share of rewards?

Yes, the pool operator will need to write code to keep track of all farmers and their share of rewards. Chia's pool protocol assumes no registration is needed to join a pool, so every launcher_id that submits a valid partial proof needs to be tracked by the pool server.

### What actions can singleton take?

There are a few things you can do to the singleton:

-   Change pool (needs owner signature)
-   Escape pool, this is announcing that you will change pool (needs owner signature)
-   Claim rewards (does not need any signature, it goes to the specified address in the singleton)

### How do pools collect rewards?

-   Farmer joins a pool, they will assign their singleton to the pool_puzzle_hash.
-   When a farmer wins a block, the pool rewards will be sent to the p2_singleton_puzzle_hash.
-   Pool will scan blockchain to find new rewards sent to Farmer's singletons.
-   The pool will send a request to claim rewards to the winning Farmer's singleton.
-   Farmer's singleton will send pool rewards XCH to pool_puzzle_hash.
-   Pool will periodically distribute rewards to farmers that have points

### How can I tell if the server is receiving enough partials from a particular client?

The number of partials received is the only thing the pool is aware of, the pool does not know the exact total space
of the farmer. The space can be computed using the fact that each k32 plot will earn on average 10 points a day, on
mainnet. That means if the difficulty is set to 1, that's 10 partials per day, if the difficulty is 10, 1 partial per
day per k32 plot.

### Why am I receiving more points in testnet than mainnet?

The 10 points per day per k32 plot only applies to mainnet, which has a `DIFFICULTY_CONSTANT_FACTOR` of 2^67. To get
the points per day per k32 on testnet, divide 2^67 by the testnet `DIFFICULTY_CONSTANT_FACTOR`, found in `config.yaml`, and
multiply by 10. This allows participating easily with k25s on testnet.

### What is the expected ratio between a k32 and a k25?

Look at the file `win_simulation.py` on this repo. This uses the function `_expected_plot_size` from chia-blockchain,
which uses the formula: `((2 * k) + 1) * (2 ** (k - 1))` to compute plot size. Plug in your k values and divide.

### How to calculate how many partials with X difficulty a certain plot with Y size can get in Z time?

Look at the `win_simulation.py` file.

### Can I use testnet pooling plots on mainnet?

No, you can only use plots created for mainnet in mainnet, and same for testnet.

### Does that mean that forks of Chia cannot use these pooling plots?

Forks of Chia can easily use these pooling plots by sending the 1.75XCH to the farmer target address, making them
all solo plots. If the alternate blockchain wants to do pooling as well, they need to create a special transaction
which `reserves` a singleton by providing the `launcher_id`, and launcher spend (including owner signature). Then
the code can automatically assign this singleton to the user who submitted it.

### Does the pooling system support all of the various payment methods used in other blockchain pools?

Generally, speaking, yes, because the payment system is managed by the pool operator, not the blockchain. We recommend pool operators new to this space opt for something less risky, such a PPLNS, however on a technical level you can leverage any payment system you want, as the code to do so is managed on your side (this is assuming you are extensively adding on to the reference code or building your own from the ground up as is suggested). However, if you want to opt for something like FPPS/PPS, you need to be aware of the fact that something like a "dead weight" attack, (which is possible on other chain protocols as well), can be executed in Chia by a malicious actor willing to sacrifice large sums of revenue in favor of harming your pool's variance ratio against vs standardized payout plan, potentially running you into the red. It is for this reason we advise against FPPS/PPS systems, unless you have extensive experience running these pools and how to build mitigations around it to help ensure your stability against variance.

### What are the API methods a pool server needs to support Chia clients?

There are a few API methods that a pool needs to support. They are documented here:
https://github.com/Chia-Network/pool-reference/blob/main/SPECIFICATION.md

### Where can I see the video Technical Q&A on Chia Pooling:

For those interested in the Chia Pools for Pool Operators video and presentation, you can find it here:
- https://youtu.be/XzSZwxowPzw
- https://www.chia.net/assets/presentations/2021-06-02_Pooling_for_Pool_Operators.pdf
