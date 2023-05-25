---
title: Pool Farming
slug: /pool-farming
---

[Link to Frequently Asked Questions](/pool-farming)

Due to the increasing network space (netspace), winning blocks in Chia is a very difficult task, and can take months even years for users with multiple hard drives farming Chia. Pooling can allow you to win consistently, in small amounts. For example, a user earning 2XCH per 20 weeks while solo farming, can instead earn 0.1XCH per week, in a much more consistent schedule.

The Chia pooling protocol allows you to assign plots to a "Plot NFT", which is kind of like a contract on the blockchain which you control, and in which you can set your currently assigned pool. You can also change the pool that the Plot NFT is assigned to at any time.

With the pooling protocol, your farmer will communicate with a specific pool server, and send proofs of space very often to that pool, in order to prove how much plotted space you have. Therefore the pool can keep track of the space of each of its members (the farmers), and whenever one of the members wins a block, the pool can distribute rewards proportional to the amount of space that each farmer contributed.

Therefore, pooling is kind of like lottery insurance: all of the members participate in the Chia "lottery", and whenever one member wins, the pool gets the reward and distributes it to all of the members, minus a small fee. 1.75 XCH is divided between the pool members, and 0.25 XCH goes directly to the farmer that won that block. As the winner of the block, you would also earn a small piece of that 1.75, based on how much space you have, and how the pool decides to distribute rewards.

## How to Start Pooling in 6 Steps

Old plots that were made for solo farming (OG plots) cannot be used with the new portable pool protocol. In order to participate in pooling, you will have to create new plots. However you can farm both OG and pooling plots on the same computer.

### Step 1: Sync your full node and wallet

To start, you need to update to Chia 1.2, and sync up your Chia full node and wallet. In the full node tab, the status should be "Synced", and in the wallet tab in the top right, it should say `Synced` as well.

<div style={{textAlign: 'center'}}>
 <img src="/img/wallet-sync.png" alt="wallet sync" width="600"/>
</div>

IMPORTANT: If you are using the same key (24 words) on more than one computer, you should update both computers to 1.2+ before creating your plot NFT. If you have already created the plot NFT and the second computer is running a version older than 1.2, it will not be able to see the plot NFT. This can be fixed by shutting down the application on the second computer, and deleting the `~/.chia/wallet/db` folder and all files inside of it.

### Step 2: Receive some XCH

To start pooling, you first need a tiny amount of Chia in your wallet. You can ask your friends to send you some mojos (1 mojo is 0.000000000001 XCH), or get some using https://faucet.chia.net/. You can use the receive address on the "Wallets" page, and you can also create new receive addresses. Any of the receive addresses can be used, they are all part of the same wallet.

### Step 3: Create Plot NFT

Once you have some XCH in your wallet, go to the pool tab, and click on "Add a Plot NFT". You now have two options:

1. Self pooling: this plot NFT will not be connected to any pools, and the 1.75 XCH will go directly into your wallet. This is different than OG (original) plots, since OG plots are locked in to self farming forever. From CLI:

```bash
chia plotnft create -s local
```

2. Connect to pool: join a pool, and immediately start pooling, as soon as you make some plots. From CLI:

```bash
chia plotnft create -s pool -u https://bar.examplepool.org
```

Note that even if you choose 1, you can join a pool later, and you can switch your pool at any moment. If you decide to join a pool, enter the url (must start with _https://_), and look at the description. If you agree, create the Plot NFT, and wait for it to be confirmed (click only once). It can take several minutes for it to be confirmed and to show up in the Pools tab. You only need 1 plot NFT.

<div style={{textAlign: 'center'}}>
 <img src="/img/join-pool.png" alt="join pool" width="600"/>
</div>

### Step 4: Add Plots

You can now start creating plots for this Plot NFT, which means these plots will be "pooling" and can earn rewards more often. Click on the 3 dots in the Plot NFT that you want to create plots for, and select "Add a Plot". This will select this Plot NFT in the plotting screen. If you don't select anything or select "None", that will make an OG plot. The plot will be forever tied to the Plot NFT that you choose (or forever OG).

If you are using the CLI or a 3rd party plotter, hover your mouse over the question mark in the Plot NFT page, and copy the Pool Contract Address. This is the address that you need to use while plotting, by specifying the `-c` argument. Note: When plotting using the CLI for pooling, do NOT use the `-p` argument anymore, only `-c`. You can still specify the `-f` argument like before, and other arguments have not changed.

### Step 5: Manage your Plot NFT

You should see your plots in the Plot NFT interface. The status should say "Pooling". From here, you can see your difficulty, the number of points earned, and how many points the pool thinks you have (points balance).

The difficulty is a value that is different for each plot NFT, which determines how hard it is to find a proof for those plots. This will get set automatically so that your plots find proofs very often (every few minutes or hours). Each proof found will award you with `difficulty` points. Farmers with many plots will have a higher difficulty, to keep disk usage low.

Points are a way to count how many proofs your plots found. Each k32 plot will get on average 10 points per day, independent of what the difficulty is. Points are NOT the same as Chia (XCH). Points are just a value that reflects how much farming you have done. Think of it as an accounting tool. It is the responsibility of the pool to periodically reward you with XCH based on how many points you obtain, and then reset your points back to 0.

To change pools, click on the "CHANGE POOL" button and enter the new pool URL. Note that changing pools has a waiting period that can be from a few minutes to an hour or so. Please do not shut down your application while this is happening. You can change pools as many times as you want, and there is no penalty or registration required for doing so. Be aware that if you change pools, your old pool is not obligated to pay you anymore, more than they already have.

You should ensure that your points found in the last 24h are accurate. You should be obtaining around 10 points per day per k32, so if you have 100 k32 plots, you should be getting around 1000 points per day. Make sure your points balance is going up. After you get paid, the points balance will reset to zero. Points will come at random times, since finding proofs is still random. Therefore expect a lot of variability and times of both good and bad luck.

<div style={{textAlign: 'center'}}>
 <img src="/img/points.png" alt="points" width="600"/>
</div>

### Step 6: Wait for Payouts

You are now done. If your points balance is increasing, you are properly pooling, and you should check your pool to see how often payouts happen, and to optionally log in to a pool interface.

## Additional Information

### Multiple Plot NFTs

You can have multiple plot NFTs on the same key, and they can all be farmed at the same time. You can also farm original (OG) plots as well.

### Multiple Computers

You can take your 24 words and enter them into a different computer, and when it is synched, the current Plot NFTs and pool information will be automatically downloaded from the blockchain. All information about your pool, plot NFTs, and smart contract addresses is completely backed up on the blockchain, and can be recovered using the 24 words. Make sure to read the important note on step 1, about updating to new version on all computers.

### Multiple Keys

You can also have multiple keys farming at the same time, but be careful with this. Each key has to sync separately, and if you change pools in one computer (computer A), then you must sync up your wallet on computer B in order to farm it separately. If computer B has multiple keys, make sure to sync each key up to the latest changes in the Plot NFT.

### Pool Fees

Pool fees refer to the small cut that pools take when they distribute rewards to farmers.

### Blockchain Fees

Blockchain fees are fees are paid to the creator of the block (farmers), to incentivize them to include your transaction. Fees are currently 0, but they are likely to rise as the blockchain gets more usage. When fees rise, you might have to pay small amounts of Chia to make transactions. Sending XCH to an address is a blockchain transaction, but creating a plot NFT, or changing pools is also a transaction, which requires fees. The user interface will be updated to include fields for fee amounts, and guidance will be provided here when fees become necessary.

### Invalid State

If you enter into an invalid state, you need to re-join or change to self-pooling again. This can happen if you close the GUI before a pool switching operation has finalized. Please click "change pool", and re-enter the pool URL, or switch to self pooling. Sometimes you might need to wait a bit for the pool switching timeout to finish.

### Payout addresses

The block reward is divided into two components, the pool portion (7/8 of the total reward) and the farmer portion (1/8).

-   The pool portion gets paid out to the pool, which will pay you according to their payout schedule. This is configurable in the Pool tab of the GUI: Click the three dots on the upper-right corner of your plot NFT and click "Edit Payout Instructions." This is also configurable in `config.yaml` in the pool_list section under payout_instructions.
-   The farmer portion will go to your farmer target address, which is the same as the OG plots. This is configurable in the Farm tab of the GUI, or in `config.yaml` under farmer.xch_target_address.

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

To create a Plot NFT, use `chia plotnft create -u https://poolnamehere.com`, entering the URL of the pool you want to use. To create a plot NFT in self-farming mode, do `chia plotnft create -s local`. To switch pools, you can use `chia plotnft join`, and to leave a pool (switch to self farming), use `chia plotnft leave`. The `show` command can be used to check your current points balance. CLI plotting with `create_plots` is the same as before, but the `-p` is replaced with `-c`, and the pool contract address from `chia plotnft show` should be used here.

---

# General FAQ

## How can I start pooling?

You can update by installing Chia 1.2+ and following the instructions in the [Pooling User Guide](https://github.com/Chia-Network/chia-blockchain/wiki/Pooling-User-Guide).

## Will I need to replot to use the official pooling protocol?

Yes. Anyone who wants to join a pool will need to create new K32 or above portable plots. This new plot format allows you to switch between pools and self-pooling with a cooldown of ~30 minutes (100 blocks) between each switch. Each switch between pools will require a transaction with a smart contract on the blockchain. Our recommendation is to slowly replace your existing plots with portable plots one by one, so you still have a chance to win XCH while you convert to all portable plots.

## What is a plot NFT?

A plot NFT (Non Fungible Token), is a smart coin or token on the blockchain, which allows a user to manage their membership in a pool. User's can assign the plot NFT to any pool they want, at any point. When plotting, a plot NFT can be selected, and the plot will be tied to that plot NFT forever. NFTs are "non-fungible" because they are not interchangeable; each plot NFT represents a unique pool contract.

## Will I need pay XCH to create a plot NFT or switch pools?

Each plot NFT you create will require a minimum of 1 mojo (1 trillionth of a XCH) + transaction fee. For switching pools, you need to pay only a transaction fee. to switch pools. On the first few days of pool launch on mainnet, it's likely you can use 0 transaction fee. For those who don't have any XCH, you can get 100 mojos from Chia's official faucet: https://faucet.chia.net/

## Can I farm with both OG (original) plots and portable plots?

Yes. The farmer will support both OG plots and portable plots on one machine. For OG plots, the 0.25XCH and 1.75XCH will both be sent to the farmer. The OG plots will not be affected in any way by the plot NFTs or new plots that you create.

## How do I assign portable plots to a pool?

First you will create a Plot NFT (devs call this singleton in their code) in the new pools tab in the GUI. When you create a new portable plot, you must assign it a specific Plot NFT (for those using CLI, this replaces the Pool Public Key `-p` with a Pool Contract Address `-c`). All plots created with the same Plot NFT can then be assigned to a pool for farming. You can have many plot NFTs on the same key.

## What is the difference between a "Key" and a "Wallet" in the Chia GUI and CLI?

A user can have one or more keys on a machine running Chia. A key is represented by the private information (24 words) and the public identifier called the `fingerprint`. When using the GUI or the CLI, you can only log in to one key at a time. Each key must be synced separately, and you can check if it is synced by clicking on the "wallet" tab. Each key can also have 1 or more wallets associated with it. The standard wallet, which controls your Chia, is created by default. You can also create as many Plot NFTs as you want, which are also wallets, and each have their own "wallet id" as well, and they are tied to the key that you used to create them. In the CLI, you use both `fingerprint` and `wallet_id` to perform operations on Plot NFTs, which represent the key and wallet ID for that Plot NFT.

## How is Chia pooling different from other cryptos?

Chia has three major differences from most other crypto pooling protocol: 1) Joining pools are permissionless. You do not need to sign up to an account on a pool server before joining. 2) Farmers receive 1/8th of XCH rewards plus transaction fees, while the pool receives 7/8th of XCH rewards to redistribute (minus pool fees) amongst all pool participants. 3) The farmer with the winning proof will farm the block, not the pool server.

## How can I start my own pool?

If you have experience writing pool server code for another crypto, adapting that pool code with Chia's reference pool code will be straight forward. We only recommend people who have good OPSEC and business experience to run public pool servers. Depending what country you operate your pooling business, you may be subject to tax, AML and KYC laws specific to your jurisdiction. All pools will be targeted by hackers due to the profitability of XCH and you may be legally liable if you have any losses.

## Where can I find a list of Chia pools?

A crypto community site lists all upcoming Chia pools: https://miningpoolstats.stream/chia

## Can I advertise my pool in Discord?

You can only advertise your pool in Discord #Promote-community-projects once a day. If you're spammy, mods will warn you and then ban you if you persist.

## Why shouldn't I join the original Hpool pool?

Hpool initially created their own version of Chia client that has no source code released with it. There is no telling what kind of malicious activity that client can do. Chia Network Inc discourages everyone from joining any pool that requires custom closed source clients however Hpool has since opened a pool using the official pooling protocol and you should feel free to consider that as you look at which pool to use.

## Why doesn't Chia run their own official pool?

We want there to be a healthy ecosystem of competing pools with no privileged official one having an unfair advantage over the others.

## Can I name my pool chiapool.com?

We are not going to allow pools to use "Chia" as the first word or its equivalent (the Chia pool). You can say things like "a Chia pool" though that will probably need a free and easy to get license. Go to https://www.chia.net/terms/ to get more information on obtaining a license.

## If a pool gets 51% of netspace, can they take over the network?

No, Chia's pooling protocol is designed where the blocks are farmed by individual farmer, but the pooling rewards go to the pool operator's wallet. This ensures that even if a pool has 51% netspace, they would also need to control ALL of the farmer nodes (with the 51% netspace) to do any malicious activity. This will be very difficult unless ALL the farmers (with the 51% netspace) downloaded the same malicious Chia client programmed by a Bram like level genius.

## I have more questions, where do I ask?

Join our dedicated [Discord](https://discord.gg/chia)

Friendly reminder: do NOT at `@` or Direct Message (DM) developers or mods. Just post your questions in Discord and we will answer when we have a moment.

# Technical FAQ

## Where can I see the Chia Pool Reference Code?

You can find it here: https://github.com/Chia-Network/pool-reference. The README contains an explanation of how it works, and the specification contains details of how to implement it.

## What programming language is the reference pool code written in?

Python

## How hard is it to adapt Chia's reference pool code to my pool code?

If you've written pool code before, the reference pool code will be easy to understand. It's just replacing PoW concepts with Chia's method of evaluating each farmer's participation via PoST and adapting collection and distribution of XCH using Chia's smart contracts.

## I am a programmer, but never wrote pool code, will I be able to run a pool with Chia's reference pool code?

If it's your first time writing pool code, we recommend you look at established BTC or ETH pools source code and features they provide users. You are likely going to compete with big time pool operators from those crypto communities who will provide feature rich pools for Chia on day one. Examples of features: leaderboards, wallet explorer, random prizes, tiered pool fees, etc.

## Variable names used in pooling code

-   puzzle_hash: an address but in a different format. Addresses are human readable.
-   singleton: a smart coin (contract) that guaranteed to be unique and controlled by the user.
-   launcher_id: unique ID of the singleton.
-   points: represent the amount of farming that a farmer has done. It is calculated by number of proofs submitted, weighted by difficulty. One k32 farms 10 points per day. To accumulate 1000 points you need 10 TiB farming for a day. This is equivalent to shares in PoW pools.

## How does one calculate a farmer's netspace?

A farmer's netspace can be estimated by the number of points submitted over each unit of time, or points/second. Each k32 gets on average 10 points per day. So `10 / 86400 = 0.0001157 points/second` for each plot. Per byte, that is `L = 0.0001157 / 106364865085 = 1.088 * 10^-15`. To calculate total space `S`, take the total number of points found `P`, and the time period in seconds `T` and do `S = P / (L*T)`.  
For example for 340 points in 6 hours, use `P=340, T=21600, L=1.088e-15`, `S = 340/(21600*1.088e-15) = 14465621651619 bytes`. Dividing by `1024^4` we get `13.15 TiB`.

## How does difficulty affect farmer's netspace calculation?

As difficulty goes up, a farmer does less lookups and finds less proofs, but does not receive more points per unit of time. Imagine this scenario: Obtaining 10 proofs a day with difficulty 1 for a k32, is equivalent to obtaining 1 proof a day with difficulty 10. As a pool server, you prefer to receive 1 proof a day per K32 with difficulty 10. This is why we allow pool servers to set a minimum difficulty level to reduce the number of proofs each farmer needs to send to prove their netspace.

## How do you identify the farmer that submitted partial proofs?

The farmer will provide their launcher_id which is the ID of that farmer's pool group. The pool also verifies the proof of space and the farmer's signature, to make sure that only real farmers are compensated.

## Will pool servers need to keep track of all farmers and their share of rewards?

Yes, the pool operator will need to write code to keep track of all farmers and their share of rewards. Chia's pool protocol assumes no registration is needed to join a pool, so every launcher_id that submits a valid partial proof needs to be tracked by the pool server.

## What actions can singleton take?

There are a few things you can do to the singleton:

-   Change pool (needs owner signature)
-   Escape pool, this is announcing that you will change pool (needs owner signature)
-   Claim rewards (does not need any signature, it goes to the specified address in the singleton)

## How do pool collect rewards?

-   Farmer joins a pool, they will assign their singleton to the pool_puzzle_hash.
-   When a farmer wins a block, the pool rewards will be sent to the p2_singleton_puzzle_hash.
-   Pool will scan blockchain to find new rewards sent to Farmer's singletons.
-   The pool will send a request to claim rewards to the winning Farmer's singleton.
-   Farmer's singleton will send pool rewards XCH to pool_puzzle_hash.
-   Pool will periodically distribute rewards to farmers that have points

## How can I tell if the server is receiving enough partials from a particular client?

The number of partials received is the only thing the pool is aware of, the pool does not know the exact total space of the farmer. The space can be computed using the fact that each k32 plot will earn on average 10 points a day, on mainnet. That means if the difficulty is set to 1, that's 10 partials per day, if the difficulty is 10, 1 partial per day per k32 plot.

## Why am I receiving more points in testnet than mainnet?

The 10 points per day per k32 plot only applies to mainnet, which has a `DIFFICULTY_CONSTANT_FACTOR` of 2^67. To get the points per day per k32 on testnet, divide 2^67 by the testnet `DIFFICULTY_CONSTANT_FACTOR`, found in `config.yaml`, and multiply by 10. This allows participating easily with k25s on testnet.

## What is the expected ratio between a k32 and a k25?

Look at the file `win_simulation.py` on this repo. This uses the function `_expected_plot_size` from chia-blockchain, which uses the formula: `((2 * k) + 1) * (2 ** (k - 1))` to compute plot size. Plug in your k values and divide.

## How to calculate how many partials with X difficulty a certain plot with Y size can get in Z time?

Look at the `win_simulation.py` file.

## Can I use testnet pooling plots on mainnet?

No, you can only use plots created for mainnet in mainnet, and same for testnet.

## Does that mean that forks of Chia cannot use these pooling plots?

Forks of Chia can easily use these pooling plots by sending the 1.75XCH to the farmer target address, making them all solo plots. If the alternate blockchain wants to do pooling as well, they need to create a special transaction which `reserves` a singleton by providing the `launcher_id`, and launcher spend (including owner signature). Then the code can automatically assign this singleton to the user who submitted it.

## Does the pooling system support all of the various payment methods used in other blockchain pools?

Generally, speaking, yes, because the payment system is managed by the pool operator, not the blockchain. We recommend pool operators new to this space opt for something less risky, such a PPLNS, however on a technical level you can leverage any payment system you want, as the code to do so is managed on your side (this is assuming you are extensively adding on to the reference code or building your own from the ground up as is suggested). However, if you want to opt for something like FPPS/PPS, you need to be aware of the fact that something like a "dead weight" attack, (which is possible on other chain protocols as well), can be executed in Chia by a malicious actor willing to sacrifice large sums of revenue in favor of harming your pool's variance ratio against vs standardized payout plan, potentially running you into the red. It is for this reason we advise against FPPS/PPS systems, unless you have extensive experience running these pools and how to build mitigations around it to help ensure your stability against variance.

## What are the API methods a pool server needs to support Chia clients?

There are a few API methods that a pool needs to support. They are documented here: https://github.com/Chia-Network/pool-reference/blob/main/SPECIFICATION.md

## Where can I see the video Technical Q&A on Chia Pooling:

For those interested in the Chia Pools for Pool Operators video and presentation, you can find it here: https://youtu.be/XzSZwxowPzw https://www.chia.net/assets/presentations/2021-06-02_Pooling_for_Pool_Operators.pdf
