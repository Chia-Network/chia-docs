---
slug: /guides/crash-course/state
title: State
---

## Coin Set Refresher

Before we jump in to the bulk of this lesson I wanted to remind you of how the Chia blockchain works. Chia uses a **coin set** model very similar to that of Bitcoin's UTXO model. This is very different than the account model used in other major chains. Instead of having an account with a _balance_, you just have a collection of unspent coins that you are able to spend.

For example:

-   Coin 1: 0.25 XCH
-   Coin 2: 1.75 XCH
-   Coin 3: 0.25 XCH
-   Coin 4: 1.75 XCH

Balance: 4 XCH

You will often hear "everything is a coin" being said. This is true!

This introduces some unique approaches to creating software on the Chia blockchain.

To use Chialisp on the Chia blockchain, we must create a coin. As part of the coin set model, spending a coin results in a collection of removals and additions. The removals are your existing coins used for the spend being destroyed, and the additions are new coins (including any change) being created.

Here is an example

1. Say you have 1.75 XCH
1. You send .75 XCH to some address (remember, an address is an encoded form of puzzle hash)
1. This results in all 1.75 of your XCH being spent
1. a new coin worth 1 XCH is created to be returned back to you (this is called change)
1. a new coin worth .75 XCH is created for the destination puzzle hash

Another example:

1. Say you have 2 XCH made up of multiple small coins
1. You send 1 XCH to some address
1. Coins of .1 XCH, .5 XCH, and .45 XCH are being spent to sum up to 1.05 XCH (greater than or equal to 1 XCH spend)
1. a new coin worth .05 XCH is created to be returned back to you
1. a new coin worth 1 XCH is created for the destination puzzle hash

## What's Next?

We will be building a simple example of a coin that stores a message that anyone can change by spending the coin. This will be built using the previous lesson's project setup, but you can find all of `index.ts` here:

<details>
<summary>index.ts</summary>

```ts
import { mnemonicToSeedSync } from 'bip39';
import { fromHex, PrivateKey, toHex } from 'chia-bls';
import { Coin, formatHex, FullNode, sanitizeHex, toCoinId } from 'chia-rpc';
import { KeyStore, StandardWallet } from 'chia-wallet-lib';
import { Program } from 'clvm-lib';
import dotenv from 'dotenv';
import fs from 'fs';
import os from 'os';
import path from 'path';

dotenv.config();

const mnemonic = process.env.MNEMONIC!;
const privateKey = PrivateKey.fromSeed(mnemonicToSeedSync(mnemonic));

const dir = path.join(__dirname, '..');

const messagePuzzle = Program.deserializeHex(
    fs.readFileSync(path.join(dir, 'message.clsp.hex'), 'utf-8')
);

const node = new FullNode(os.homedir() + '/.chia/mainnet');
const keyStore = new KeyStore(privateKey);

const wallet = new StandardWallet(node, keyStore);
const genesis = fromHex(process.env.GENESIS!);

const amount = 1;
const fee = 0.00005e12;

async function newInstance(initialMessage: Program) {
    await wallet.sync();

    const spend = wallet.createSpend();

    // Curry the puzzle
    const puzzle = messagePuzzle.curry([
        // Mod hash
        Program.fromBytes(messagePuzzle.hash()),

        // Message is empty until the eve is spent
        Program.nil,
    ]);

    // Create the eve coin
    const send = await wallet.send(puzzle.hash(), amount, fee);
    spend.coin_spends.push(...send);

    // Calculate the root coin id
    const eveCoin: Coin = {
        parent_coin_info: formatHex(toHex(toCoinId(send[0].coin))),
        puzzle_hash: formatHex(puzzle.hashHex()),
        amount,
    };

    // Create the eve solution
    const solution = Program.fromList([
        // Message
        initialMessage,

        // Amount
        Program.fromInt(amount),
    ]);

    // Spend the eve coin
    spend.coin_spends.push({
        coin: eveCoin,
        puzzle_reveal: puzzle.serializeHex(),
        solution: solution.serializeHex(),
    });

    // Sign the wallet spend
    wallet.signSpend(spend, genesis);

    // Complete the transaction
    console.log('Eve coin id:', toHex(toCoinId(eveCoin)));
    console.log(await node.pushTx(spend));
}

interface SyncInfo {
    parent: string;
    current: string;
}

async function sync(): Promise<SyncInfo> {
    const eveCoinId = process.env.EVE_COIN_ID!;

    let current = eveCoinId;
    let parent = current;

    while (true) {
        // Fetch coins created by the current coin
        const coinRecords = await node.getCoinRecordsByParentIds(
            [current],
            undefined,
            undefined,
            true
        );
        if (!coinRecords.success) throw new Error(coinRecords.error);

        // If there are none, we are already synced
        if (!coinRecords.coin_records.length) break;

        // Update the parent
        parent = current;

        // Continue with the child coin as the new singleton
        const coinRecord = coinRecords.coin_records[0];
        current = toHex(toCoinId(coinRecord.coin));
    }

    return {
        parent,
        current,
    };
}

async function getMessage(syncInfo: SyncInfo): Promise<Program> {
    const coinRecord = await node.getCoinRecordByName(syncInfo.parent);
    if (!coinRecord.success) throw new Error(coinRecord.error);

    const puzzleAndSolution = await node.getPuzzleAndSolution(
        syncInfo.parent,
        coinRecord.coin_record.spent_block_index
    );
    if (!puzzleAndSolution.success) throw new Error(puzzleAndSolution.error);

    const spend = puzzleAndSolution.coin_solution;

    const solution = Program.deserializeHex(
        sanitizeHex(spend.solution)
    ).toList();

    return solution[0];
}

async function printMessage() {
    const syncInfo = await sync();
    const message = await getMessage(syncInfo);
    console.log('Message:', message.toString());
}

async function setMessage(newMessage: Program) {
    await wallet.sync();

    const syncInfo = await sync();
    const message = await getMessage(syncInfo);

    // Fetch the coin record
    const coinRecord = await node.getCoinRecordByName(syncInfo.current);
    if (!coinRecord.success) throw new Error(coinRecord.error);

    const coin = coinRecord.coin_record.coin;

    const spend = wallet.createSpend();

    // Create the current puzzle
    const puzzle = messagePuzzle.curry([
        Program.fromBytes(messagePuzzle.hash()),
        message,
    ]);

    // Create the solution
    const solution = Program.fromList([
        newMessage,
        Program.fromInt(coin.amount),
    ]);

    spend.coin_spends.push({
        // Spend the current singleton
        coin,

        // The puzzle reveal contains the old message
        puzzle_reveal: puzzle.serializeHex(),

        // Spend it with the new message
        solution: solution.serializeHex(),
    });

    const send = await wallet.sendFee(fee);

    spend.coin_spends.push(...send);

    wallet.signSpend(spend, genesis);

    console.log(await node.pushTx(spend));
}

// newInstance(Program.fromText('Hello, world!'));
// printMessage();
// setMessage(Program.fromText('Goodbye, world!'));
```

</details>

## State in Chialisp

We are now going to be discussing the idea of state. State is used to maintain some value on-chain. This can be done with a coin that recreates itself currying in a new value.

The example we will be using today stores a message that can be changed by anyone. Essentially, the first coin we create will store the initial state, which is the message. Then, every time the coin is spent, we will create a new coin that stores the new message inside of it.

The first coin is called the **eve**, and every coin that follows it forms a complete lineage of the history.

First, we will install the needed Chialisp dependencies:

```bash
cdv clsp retrieve condition_codes curry_and_treehash
```

Here is the puzzle we will be using:

```chialisp title=message.clsp
(mod (MOD_HASH MESSAGE new_message amount)
    (include condition_codes.clib)
    (include curry_and_treehash.clib)

    (defun-inline new_puzzle_hash (MOD_HASH new_message)
        (puzzle-hash-of-curried-function MOD_HASH
            (sha256 1 new_message)
            (sha256 1 MOD_HASH)
        )
    )

    (list
        (list CREATE_COIN (new_puzzle_hash MOD_HASH new_message) amount)
    )
)
```

Specifically, this will create a new coin using `CREATE_COIN`. The puzzle hash is calculated by passing `MOD_HASH` and `new_message` to the `new_puzzle_hash` function. This effectively recreates the coin with the same puzzle. The only difference is that is uses the new message.

We will compile this Chialisp code with this command:

```
cdv clsp build message.clsp
```

## Initial Setup

Install NPM:

```bash
pip install npm
```

Install the needed dependencies:

```bash
npm install bip39 chia-bls chia-rpc chia-wallet-lib clvm-lib dotenv
```

This is the code to set everything up and prepare for building this example:

```ts
import { mnemonicToSeedSync } from 'bip39';
import { fromHex, PrivateKey, toHex } from 'chia-bls';
import { Coin, formatHex, FullNode, sanitizeHex, toCoinId } from 'chia-rpc';
import { KeyStore, StandardWallet } from 'chia-wallet-lib';
import { Program } from 'clvm-lib';
import dotenv from 'dotenv';
import fs from 'fs';
import os from 'os';
import path from 'path';

dotenv.config();

const mnemonic = process.env.MNEMONIC!;
const privateKey = PrivateKey.fromSeed(mnemonicToSeedSync(mnemonic));

const dir = path.join(\_\_dirname, '..');

const messagePuzzle = Program.deserializeHex(
fs.readFileSync(path.join(dir, 'message.clsp.hex'), 'utf-8')
);

const node = new FullNode(os.homedir() + '/.chia/mainnet');
const keyStore = new KeyStore(privateKey);

const wallet = new StandardWallet(node, keyStore);
const genesis = fromHex(process.env.GENESIS!);

const amount = 1;
const fee = 0.00005e12;
```

## Initializing the Coin

The first thing that we need to do is create the eve coin. However, that is not enough to be able to fetch the message that is stored on-chain. This is because the puzzle that a coin uses is not revealed until that coin is spent.

The solution to this problem is to instantly spend the eve coin when it is created. This way, the solution will contain the message that the next coin uses. This allows the current state to be inferred and the coin to be spent later by someone else.

Here is the code that initializes the eve coin and its descendant:

```ts
async function newInstance(initialMessage: Program) {
    await wallet.sync();

    const spend = wallet.createSpend();

    // Curry the puzzle
    const puzzle = messagePuzzle.curry([
        // Mod hash
        Program.fromBytes(messagePuzzle.hash()),

        // Message is empty until the eve is spent
        Program.nil,
    ]);

    // Create the eve coin
    const send = await wallet.send(puzzle.hash(), amount, fee);
    spend.coin_spends.push(...send);

    // Calculate the root coin id
    const eveCoin: Coin = {
        parent_coin_info: formatHex(toHex(toCoinId(send[0].coin))),
        puzzle_hash: formatHex(puzzle.hashHex()),
        amount,
    };

    // Create the eve solution
    const solution = Program.fromList([
        // Message
        initialMessage,

        // Amount
        Program.fromInt(amount),
    ]);

    // Spend the eve coin
    spend.coin_spends.push({
        coin: eveCoin,
        puzzle_reveal: puzzle.serializeHex(),
        solution: solution.serializeHex(),
    });

    // Sign the wallet spend
    wallet.signSpend(spend, genesis);

    // Complete the transaction
    console.log('Eve coin id:', toHex(toCoinId(eveCoin)));
    console.log(await node.pushTx(spend));
}

newInstance(Program.fromText('Hello, world!'));
```

Running this, you will get a response similar to:

```
Eve coin id: a6c5a4d12456ae6dee553b1b17544799f561a62f678d7948df12f28d17bfa96e
{ status: 'SUCCESS', success: true }
```

Where the eve coin ID is the ID of the first coin.

We have successfully created the eve coin, spent it to reveal the current state (the message), and logged the eve coin ID.

## Retrieving the Message

We can retrieve the message by getting the eve coin and following its children to the latest (referred to as syncing). The most recent message is provided in the solution of the spend of the previous coin.

For this to work, we read the `EVE_COIN_ID` from the `.env` file, which should now look something like:

```env title=.env
MNEMONIC=nasty sunny kingdom popular turn core rifle river twenty edit sort pill rice claw hollow please wash inform cannon empower emotion caught salt close
GENESIS=d25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15
EVE_COIN_ID=5fe284bfa91c32fd274179769f5b808c916e5135e603cb292a90e04e5867bd1a
```

:::info
The hash used in `GENESIS` can be found in your chia environments config.yaml file.  
Mainnet Genesis = `ccd5bb71183532bff220ba46c268991a3ff07eb358e8255a65c30a2dce0e5fbb`  
Testnet11 Genesis = `37a90eb5185a9c4439a91ddc98bbadce7b4feba060d50116a067de66bf236615`  
For the simulator and other testnets please refer to the instances config.yaml `$CHIA_ROOT/config/config.yaml`.
:::

Write the following code to sync the state:

```ts title=index.ts
interface SyncInfo {
    parent: string;
    current: string;
}

async function sync(): Promise<SyncInfo> {
    const eveCoinId = process.env.EVE_COIN_ID!;

    let current = eveCoinId;
    let parent = current;

    while (true) {
        // Fetch coins created by the current coin
        const coinRecords = await node.getCoinRecordsByParentIds(
            [current],
            undefined,
            undefined,
            true
        );
        if (!coinRecords.success) throw new Error(coinRecords.error);

        // If there are none, we are already synced
        if (!coinRecords.coin_records.length) break;

        // Update the parent
        parent = current;

        // Continue with the child coin as the new singleton
        const coinRecord = coinRecords.coin_records[0];
        current = toHex(toCoinId(coinRecord.coin));
    }

    return {
        parent,
        current,
    };
}
```

Now that we have the current coin and its parent, we can fetch the solution of the parent's spend to find the message:

```ts
async function getMessage(syncInfo: SyncInfo): Promise<Program> {
    const coinRecord = await node.getCoinRecordByName(syncInfo.parent);
    if (!coinRecord.success) throw new Error(coinRecord.error);

    const puzzleAndSolution = await node.getPuzzleAndSolution(
        syncInfo.parent,
        coinRecord.coin_record.spent_block_index
    );
    if (!puzzleAndSolution.success) throw new Error(puzzleAndSolution.error);

    const spend = puzzleAndSolution.coin_solution;

    const solution = Program.deserializeHex(
        sanitizeHex(spend.solution)
    ).toList();

    return solution[0];
}

async function printMessage() {
    const syncInfo = await sync();
    const message = await getMessage(syncInfo);
    console.log('Message:', message.toString());
}

printMessage();
```

Running this with `npm run start` should output the initial message:

```
Message: "Hello, world!"
```

## Updating the Message

Finally, we can create a new coin by spending the existing coin and providing a new message in the solution.

```ts
async function setMessage(newMessage: Program) {
    await wallet.sync();

    const syncInfo = await sync();
    const message = await getMessage(syncInfo);

    // Fetch the coin record
    const coinRecord = await node.getCoinRecordByName(syncInfo.current);
    if (!coinRecord.success) throw new Error(coinRecord.error);

    const coin = coinRecord.coin_record.coin;

    const spend = wallet.createSpend();

    // Create the current puzzle
    const puzzle = messagePuzzle.curry([
        Program.fromBytes(messagePuzzle.hash()),
        message,
    ]);

    // Create the solution
    const solution = Program.fromList([
        newMessage,
        Program.fromInt(coin.amount),
    ]);

    spend.coin_spends.push({
        // Spend the current singleton
        coin,

        // The puzzle reveal contains the old message
        puzzle_reveal: puzzle.serializeHex(),

        // Spend it with the new message
        solution: solution.serializeHex(),
    });

    const send = await wallet.sendFee(fee);

    spend.coin_spends.push(...send);

    wallet.signSpend(spend, genesis);

    console.log(await node.pushTx(spend));
}

setMessage(Program.fromText('Goodbye, world!'));
```

Run the following command to set the new message:

```bash
npm run start
```

### Breakdown

This will first find the latest coin from the eve coin ID:

```ts
await wallet.sync();

const syncInfo = await sync();
const message = await getMessage(syncInfo);

// Fetch the coin record
const coinRecord = await node.getCoinRecordByName(syncInfo.current);
if (!coinRecord.success) throw new Error(coinRecord.error);

const coin = coinRecord.coin_record.coin;
```

which is then spent using a solution with our new message:

```ts
// Create the solution
const solution = Program.fromList([newMessage, Program.fromInt(coin.amount)]);

spend.coin_spends.push({
    // Spend the current singleton
    coin,

    // The puzzle reveal contains the old message
    puzzle_reveal: puzzle.serializeHex(),

    // Spend it with the new message
    solution: solution.serializeHex(),
});
```

### Updated Message

Now, we should be able to retrieve the new message with:

```ts
printMessage();
```

Run the following command to see the new message:

```bash
npm run start
```

:::info
As a reminder, each step can take some time as the message is updated on chain. Because of this, you'll want to issue each function call separately.
:::

## Shared Messages

Because this puzzle does not require a signature, anyone can spend the coin providing a new message.
Say your eve coin ID is `5fe284bfa91c32fd274179769f5b808c916e5135e603cb292a90e04e5867bd1a`, you can share this value with anyone to update this message.

## Conclusion

This has been an introduction to managing to state on the Chia blockchain. We've seen how you can write a puzzle that recreates itself with new values in order to maintain a complete linear history of updates on-chain. You can find the current value by looking at the solution of the last coin's parent.

In the world of Chia, this concept is used heavily to store various information. For example, NFTs maintain a list of URIs that point to the data, metadata, and license.

<details>
<summary>More Info: Singletons</summary>

A singleton is a common application of the "recreate self" functionality we used in this lesson. Essentially, a singleton can be used to wrap an inner puzzle and add additional rules to it. In particular, it ensures that only one output is created (with an odd amount). Every time the coin is spent, the output of the inner puzzle is wrapped to maintain the singleton's lineage. This restriction can only be broken by melting the singleton.

Anyone can create a coin with any puzzle. This means there is a good chance there will be multiple coins with the same puzzle hash. This can lead to confusion as to which coin is which, and may lead to confusion or mistakes. A singleton allows for something to exist on chain that is provably unique. This helps us be sure that we are working with the correct coin.

The idea is that you can reuse the singleton behavior without having to write everything in a special way. You can [read more about singletons](https://chialisp.com/singletons) if you want to, but we will not be covering them in this course due to the additional complexities involved in launching and spending them.

Often times, puzzles that manage state will be wrapped in the singleton to ensure that there is only one instance of the state at a given time. It would be as simple as using the puzzle we wrote in this lesson as the inner puzzle to a singleton. The only additional restriction is that the coin's amount must be odd.

Because the singleton will be a series of spent coins and new coins created over time, we need a different way than the coin ID to identify a singleton. A singleton is instead identified by its **launcher ID**, which is the coin ID of the singleton's parent coin (think of this as similar to the eve coin ID we created in this lesson). This parent coin is the coin used to create the initial coin of the singleton.

</details>
