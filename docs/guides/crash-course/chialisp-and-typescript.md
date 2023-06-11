---
slug: /guides/crash-course/chialisp-and-typescript
title: Chialisp and TypeScript
---

So far we've been working with the Chia blockchain directly through the terminal using Chia Dev Tools the Chia command line interface.
This is handy but sometimes you may want to write code around Chia to work with the Chia blockchain. You may hear this referred to as driver code.

## RPC Explained

You can interact with the Chia blockchain through the RPC, which is [documented](https://docs.chia.net/rpc/) with sections on the full node, NFTs and more.

Because the RPC is accessible through web requests to localhost, you can build software using the Chia blockchain node. You can create all this code yourself or you can used wrappers that others have created.

## Language Choice

You can do RPC calls with pretty much any language, but to create larger applications you will need packages for BLS signatures and CLVM. Currently, this is possible in JavaScript/TypeScript, Python, C++, Rust, and Dart.

## Quick Start

This guide is meant to be an example that will give you some basic experience. We will be using Node.js with TypeScript to create a signature enforced coin. We'll use multiple TypeScript libraries for this project, which are open source if you want to see the details on how they work.

-   [BLS Signatures](https://npmjs.com/package/@rigidity/bls-signatures)
-   [CLVM](https://npmjs.com/package/@rigidity/clvm)
-   [RPCs](https://npmjs.com/package/@rigidity/chia)
-   [Wallet Helper](https://npmjs.com/package/@rigidity/chia-wallet)
-   [DotEnv](https://npmjs.com/package/dotenv)
-   [BIP39](https://npmjs.com/package/bip39)

### Full Node RPC

You can interact with the Chia blockchain through the RPC, which is [documented](https://docs.chia.net/rpc/) with sections on the full node, NFTs and more.

Because the RPC is accessible through web requests to localhost, you can build software using the Chia blockchain node. You can create all this code yourself or you can used wrappers that others have created.

The full node RPC allows us to fetch coin records, push transactions to the mempool, and many other important things when building applications on Chia.

### BLS Signatures

We've been using `chia keys` to get our keys and sign the messages needed to spend coins on the Chia blockchain so far. We will now use the actual library used to implement this command directly, since we will be calculating it from code. Here is some terminology that will be helpful in understanding the related code.

**Mnemonic** - The 12 or 24 word phrase found with `chia keys show --show-mnemonic-seed`.  
**Seed** - An array of bytes used as entropy, derived from the mnemonic.  
**Private Key** - A private key (or secret key) is used for signing messages and should not be shared publicly.  
**Public Key** - A public key is used for verifying the authenticity of signatures and can be shared publicly.  
**Signature** - A value that corresponds to a given message proving that it has been signed by a specific key.  
**Aggregated Signature** - One or more signatures aggregated together. This can be used to verify multiple signatures simultaneously.  
**Jacobian Point** - A point on the BLS 12-381 elliptic curve used to represent a public key or signature.  
**G1Element** - A public key represented as a Jacobian point.  
**G2Element** - A signature represented as a Jacobian point.  
**AugScemeMPL** - The signing scheme used by the Chia blockchain for aggregated signatures.

## Initializing a Project

You will first need `npm`, which you can get by [downloading Node.js](https://nodejs.org/en/download/).

Once you have that installed, enter this in the terminal inside of a folder for your project:

```
npm init
```

Go through the prompts, making sure to change the entry point as described below. This will initialize a `package.json` where you can define your dependencies and scripts for the project.

:::note
Set the entry point to `dist/index.js` rather than `index.js` since we will be compiling the code.

If you forget to do this, you can set it later in `package.json` in the `main` field.
:::

We will be using TypeScript, so issue this command:

```
npm install --save-dev typescript ts-node
```

Now, add a `tsconfig.json` file with this content:

```json
{
    "compilerOptions": {
        "moduleResolution": "node",
        "target": "ESNext",
        "downlevelIteration": true,
        "esModuleInterop": true,
        "inlineSourceMap": true,
        "declaration": true,
        "noImplicitAny": true,
        "noImplicitThis": true,
        "noImplicitOverride": true,
        "strict": true
    },
    "include": ["src"]
}
```

We will put all of our code inside of a `src` folder, so add that folder now with an `index.ts` file:

```ts title="src/index.ts"
console.log('Hello, Chia!');
```

To run this, we can add a `start` script of `ts-node src/index.ts` to our `package.json`. Our file will look something like this:

```json title="package.json"
{
    "name": "tschia",
    "version": "1.0.0",
    "description": "",
    "main": "dist/index.js",
    "scripts": {
        "start": "ts-node src/index.ts",
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC",
    "dependencies": {
        "ts-node": "^10.9.1",
        "typescript": "^4.9.3"
    }
}
```

Now, you should be able to run the project from the terminal:

```
npm run start
```

### Other Dependencies

For this project we are going to need add a few more dependencies. You can install these all at once with:

```
npm install @rigidity/bls-signatures @rigidity/clvm @rigidity/chia @rigidity/chia-wallet bip39 dotenv
```

## Mnemonic Phrase

As this code uses a custom wallet implementation instead of the Chia wallet RPC, we will need to keep track of the mnemonic ourselves. Here is an example mnemonic phrase:

```ts
const mnemonic =
    'nasty sunny kingdom popular turn core rifle river twenty edit sort pill rice claw hollow please wash inform cannon empower emotion caught salt close';
```

### Dot Env

:::warning
This wallet is used as an example. You'll never want to share your wallet mnemonic with anyone!
:::

You can securely save the mnemonic phrase in a `.env` file and load it in your program:

```text title=".env"
MNEMONIC=nasty sunny kingdom popular turn core rifle river twenty edit sort pill rice claw hollow please wash inform cannon empower emotion caught salt close
```

This value can be retrieved with:

```bash
chia keys show --show-mnemonic-seed
```

This is how you load the file for later:

```ts title="index.ts"
import dotenv from 'dotenv';

dotenv.config();
```

If you use Git, you'll want to make sure the `.env` file is added to the `.gitignore` so this is not checked in to a shared repository.

### Imports

To not have to mention imports throughout the doc, Our imports will ultimately look like:

```ts
import {
    PrivateKey,
    fromHex,
    AugSchemeMPL,
    concatBytes,
} from '@rigidity/bls-signatures';
import { mnemonicToSeedSync } from 'bip39';
import dotenv from 'dotenv';
import { Program } from '@rigidity/clvm';
import fs from 'fs';
import path from 'path';
import { FullNode, formatHex, SpendBundle, toCoinId } from '@rigidity/chia';
import { KeyStore, StandardWallet } from '@rigidity/chia-wallet';
import os from 'os';
```

## Loading Chialisp Files

Now that we have the mnemonic phrase, we will create a Chialisp file named `signature.clsp` to be used for this example:

```chialisp title="signature.clsp"
(mod (PUBLIC_KEY conditions)
    (include condition_codes.clib)
    (include sha256tree.clib)

    (c
        (list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions))
        conditions
    )
)
```

This is a refresher of the content on signatures. This will require a signature from the spender with a message that includes the tree hash of the condition to be used.

Here is how we can read chialisp. First, we get some dependencies and build the chialisp code:

```bash
cdv clsp retrieve condition_codes sha256tree
cdv clsp build signature.clsp
```

This will create a `signature.clsp.hex` file that can be read in our code.

```typescript
const program = Program.deserializeHex(
    fs.readFileSync(path.join(__dirname, '..', 'signature.clsp.hex'), 'utf-8')
);

console.log(program.toString());
```

Run this command:

```bash
npm run start
```

Which should produce the following result:

```chialisp
(a (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1))
```

To be sure, we can check this with Chia Dev Tools:

```bash
run signature.clsp -i include
```

This is not complete as this is the puzzle with no curried values. We will want to curry the public key expected so not anyone can sign for this coin to be spent.

## Currying the Key

Now that we have the program loaded, we can use the mnemonic we loaded to derive the keypair and curry the public key into the signature puzzle.

```typescript
const mnemonic = process.env.MNEMONIC!;
const privateKey = PrivateKey.fromSeed(mnemonicToSeedSync(mnemonic));
const publicKey = privateKey.getG1();
const curried = program.curry([Program.fromJacobianPoint(publicKey)]);

console.log(curried.toString());
```

:::tip
`privateKey.getG1()` is the equivalent of getting your **master public key** with `chia keys show`.
:::

Run this command:

```bash
npm run start
```

To get the final curried puzzle:

```chialisp
(a (q 2 (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xa9d31f69a4337bd10aa8179cbede90af1cdfdfbd804c8f1bc7b69ced9f769ee4f9938a40dbed4242baafabf641adea2b) 1))
```

## Setting up the Wallet

We will need the network's genesis challenge, which we can add to `.env` on a new line:

```text title=".env"
MNEMONIC=...
GENESIS=d25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15
```

You can retrieve your network's Genesis challenge in the terminal with:

```
chia show -s
```

Testnet10 has the genesis `ae83525ba8d1dd3f09b277de18ca3e43fc0af20d20c4b3e92ef2a48bd291ccb2`. You can see this in `~/.chia/mainnet/config/config.yaml` as well with:

```bash
less ~/.chia/mainnet/config/config.yaml
```

Now you can start the full node RPC client and wallet like this:

```typescript
const node = new FullNode(os.homedir() + '/.chia/mainnet');
const keyStore = new KeyStore(privateKey);

const wallet = new StandardWallet(node, keyStore);
const genesis = fromHex(process.env.GENESIS!);
```

## Creating the Coin

For creating a coin we will use `async` and `await`, so we define an `async` function `create` (call it whatever you want).

```typescript
async function create() {
    await wallet.sync({ unusedAddressCount: 10 });

    const spend = wallet.createSpend();
    spend.coin_spends = await wallet.send(curried.hash(), 0.01e12, 0.00005e12);
    wallet.signSpend(spend, genesis);
    console.log(await node.pushTx(spend));
}

create();
```

:::note
The `wallet.sync` method generates new child keys and corresponding addresses until there are a certain number of unused addresses available. This ensures that we have loaded all unspent coins that are available to us, which will be needed to create spends later on. This is what the Chia wallet does on startup, but since we are loading a wallet in this code, we need it to be synced every time we start the program.
:::

We first create a new spend to create a coin with the puzzle hash of the curried in signature puzzle we created earlier. The amount is `0.01` XCH and the fee is `0.00005` XCH. Then, we can push the spend bundle into the mempool and the transaction should be successful.

Run this command:

```bash
npm run start
```

Which should produce the following result:

```js
{ status: 'SUCCESS', success: true }
```

:::note
Each time you run this code you will be spending more Chia. You should be using testnet and sending small amounts as you learn.
:::

When expecting a value in mojos, you can convert from Chia to mojos with `e12`. So, `0.01e12 Mojo` is the same as `0.01 XCH`. This is because there are a trillion mojos in an XCH.

This code is roughly equivalent to:

```bash
cdv encode --prefix txch 0x9de4380ab079ec73720d75916990be23de3bfaa727ff52d6bc09d93d66be79da
chia wallet send --amount 0.01 --fee 0.00005 --address txch14gxuvfmw2xdxqnws5agt3ma483wktd2lrzwvpj3f6jvdgkmf5gtq8g3aw3
```

## Retrieve the Coin Record

We will need to give adequate time for the coin go successfully go to the mempool and then for it to be included by a full node. Because of this, we will issue the creation code separate from the retrieval code.

```typescript
async function spend() {
    await wallet.sync({ unusedAddressCount: 10 });

    const coinRecords = await node.getCoinRecordsByPuzzleHash(
        curried.hashHex()
    );
    if (!coinRecords.success) throw new Error(coinRecords.error);

    const record = coinRecords.coin_records[0];

    console.log(record);
}

spend();
```

This will fetch the first coin record that matches our curried puzzle hash with the full node RPC. We will use this in the next step to spend the coin.

Run this command to ensure that the coin record is there:

```bash
npm run start
```

## Crafting a Solution

THe solution for this puzzle consists of a list of conditions. To write Chialisp within JavaScript we can use the `Program.fromSource()` method.
We will use a `51` (`CREATE_COIN`) condition delivering the value to our wallet puzzle hash.

```typescript
// Calculate an unused address we can send the value to.
const [targetIndex] = await wallet.findUnusedIndices(1, []);
const target = wallet.puzzleCache[targetIndex];

// A fee of 0.00005 XCH.
const fee = 0.00005e12;

// Create a coin on the target, leaving a fee to be sent to the farmer.
const conditions = Program.fromSource(
    `((51 ${formatHex(target.hashHex())} ${record.coin.amount - fee}))`
);

// Create a solution from the conditions.
const solution = Program.fromSource(`(${conditions})`).serializeHex();
```

:::note
The `Program.fromSource` method takes a string and converts it into a CLVM object, which allows it to be hashed or serialized as such. The reason we call it again on the conditions to make the solution is that we need to wrap it in a set of parenthesis to form a list.

Remember that the solution is a list of arguments, of which the first one is the list of conditions.
:::

## Calculate the Signature

Reminder that the signature required for `AGG_SIG_ME` is the message + coin ID + Genesis challenge.

```typescript
const signature = AugSchemeMPL.sign(
    privateKey,
    concatBytes(conditions.hash(), toCoinId(record.coin), genesis)
).toHex();
```

## Spend the Coin

Finally, we can put everything together in a spend bundle and push the transaction to the mempool.

```typescript
const spendBundle: SpendBundle = {
    coin_spends: [
        {
            coin: record.coin,
            puzzle_reveal: curried.serializeHex(),
            solution: solution,
        },
    ],
    aggregated_signature: signature,
};

console.log(await node.pushTx(spendBundle));
```

Run this command:

```bash
npm run start
```

Which should produce the following result:

```js
{ status: 'SUCCESS', success: true }
```

<details>
<summary>Complete Code</summary>

```typescript
import {
    PrivateKey,
    fromHex,
    AugSchemeMPL,
    concatBytes,
} from '@rigidity/bls-signatures';
import { mnemonicToSeedSync } from 'bip39';
import dotenv from 'dotenv';
import { Program } from '@rigidity/clvm';
import fs from 'fs';
import path from 'path';
import { FullNode, formatHex, SpendBundle, toCoinId } from '@rigidity/chia';
import { KeyStore, StandardWallet } from '@rigidity/chia-wallet';
import os from 'os';

dotenv.config();

const program = Program.deserializeHex(
    fs.readFileSync(path.join(__dirname, '..', 'signature.clsp.hex'), 'utf-8')
);

console.log(program.toString());

const mnemonic = process.env.MNEMONIC!;
const privateKey = PrivateKey.fromSeed(mnemonicToSeedSync(mnemonic));
const publicKey = privateKey.getG1();
const curried = program.curry([Program.fromJacobianPoint(publicKey)]);
console.log(curried.toString());

const node = new FullNode(os.homedir() + '/.chia/mainnet');
const keyStore = new KeyStore(privateKey);

const wallet = new StandardWallet(node, keyStore);

const genesis = fromHex(process.env.GENESIS!);

async function create() {
    await wallet.sync({ unusedAddressCount: 10 });

    const spend = wallet.createSpend();
    spend.coin_spends = await wallet.send(curried.hash(), 0.01e12, 0.00005e12);
    wallet.signSpend(spend, genesis);
    console.log(await node.pushTx(spend));
}

async function spend() {
    await wallet.sync({ unusedAddressCount: 10 });

    const coinRecords = await node.getCoinRecordsByPuzzleHash(
        curried.hashHex()
    );
    if (!coinRecords.success) throw new Error(coinRecords.error);

    const record = coinRecords.coin_records[0];

    console.log(record);

    const fee = 0.00005e12;

    const [targetIndex] = await wallet.findUnusedIndices(1, []);
    const target = wallet.puzzleCache[targetIndex];

    const conditions = Program.fromSource(
        `((51 ${formatHex(target.hashHex())} ${record.coin.amount - fee}))`
    );

    const solution = Program.fromSource(`(${conditions})`).serializeHex();

    const signature = AugSchemeMPL.sign(
        privateKey,
        concatBytes(conditions.hash(), toCoinId(record.coin), genesis)
    ).toHex();

    const spendBundle: SpendBundle = {
        coin_spends: [
            {
                coin: record.coin,
                puzzle_reveal: curried.serializeHex(),
                solution: solution,
            },
        ],
        aggregated_signature: signature,
    };

    console.log(await node.pushTx(spendBundle));
}

spend();
```

</details>

## What Next

You have now put together what you have learned to build an actual program that can create and spend coins on the Chia blockchain using the puzzle written in an earlier lesson. This set of tools, in any language that supports them, is a powerful way to build decentralized applications.

Here are a few examples of how you can expand on this:

-   Modify the puzzle and code to require two sets of signatures (either two mnemonics or by using two child keys from the key store).
-   Modify the puzzle to add an additional condition requiring the spend to happen at least 10 blocks after the coin is created.
-   Modify the puzzle and code to require at least 2 of 3 signatures from the corresponding keys curried in (referred to as an M of N).
