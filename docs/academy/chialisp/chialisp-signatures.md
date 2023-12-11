---
title: Signatures
slug: /chialisp-signatures
---

## Learning objectives

- **Signing and Signatures**: Understand the uses and benefits of signatures.
- **Chialisp Library files**: Learn about helpful Chialisp libraries to simplify development.

---

## Content

In this lesson, we go over how to secure coins using signatures.

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/zD1rhLKgc9Y" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## Script

<details>

<summary> Expand for the full script </summary>

00:00  
We created our first smart coin and secured it so that only someone with the correct password could spend it. In this video, we'll use a signature to secure our coin so that only the person with the correct signature will be able to spend the coin.

00:20  
So what is a signature? A digital signature allows you to sign a message with a private key. This message can then be verified by a recipient using your public key. Let's start with an example of signing a message and then verifying it.

00:40  
Run `chia keys sign --message` with the message `"hello" --hdpath m` then choose your wallet ID. This process will sign the message 'hello' with your private key. To verify this message we'll run `chia keys verify` enter the message, then the signature and the sender's public key. (`chia keys verify --message hello --signature [SIG] --public_key [PUB_KEY]`)

01:00  
So now that we know how signing works, let's create a coin that can be spent when given the correct signature. So in our chialisp file, let's define a module that takes two parameters. The first will be a public key that we'll curry in later. This will determine who is able to spend the coin.

01:20  
The second parameter will be the conditions that determine how the coin will be spent. Next, we'll include some libraries to make our code a bit easier to write. The first lets us use written condition codes rather than number codes, and the second is a library for tree hashing.

01:40  
To install these libraries, run this command in the terminal. `cdv clsp retrieve sha256tree condition-codes`. Back to our chialisp file, we'll define a combine statement with`c` and for the first parameter, create a list composed of the `AGG_SIG_ME` condition, our public key parameter and the conditions parameter run through the tree hashing library. (`(c (list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions)) conditions)`)

02:00  
The second parameter in the combine statement will be the conditions that are passed into the program. So what does this do? Well the `AGG_SIG_ME` condition is a standard condition that signs a message with a public key. In this case we are currying in the key and the message is the tree hash of the conditions parameter.

02:20  
We do this so that the conditions cannot be modified by the farmer. So in order to spend the coin, the user must provide a solution that contains a list of conditions; or how they'd like to spend the coin; as well as a signature to show that they are the ones authorized to do so.

02:40  
For this example, we're going to create a solution that uses the `CREATE_COIN` condition to essentially unlock the value of the coin and send it back to our wallet. First, let's finish creating this coin. We'll get our master public key with `chia keys show` and curry that into our program. It's important to prefix the key with `0x` to show that it is a value.

03:00  
Now we'll get the puzzle reveal with `opc` and enter in the compiled code. Make sure to save this for later. And for the puzzle hash we'll run `opc -h` and enter the compiled code. We'll save this for later as well. We'll need to take the puzzle hash and encode it into an address. Run `cdv encode --prefix txch` and enter the puzzle hash.

03:20  
That gives us the puzzle address. Now we'll send an amount of chia to this address to lock it. And we'll check the status. Once confirmed, we'll be ready to spend it.

03:40  
To spend the coin, we'll need to create a spend bundle. Take a look at this outline. this should look familiar to the spend bundle we created in the previous video. We'll need four things, the coin record, the puzzle reveal which we already calculated, the solution we want to provide, and an aggregated signature to authorize our spend.

04:00  
To get the coin record, run `cdv rpc coinrecords --by puzzlehash` and enter the puzzle hash from earlier. Copy the coin object and paste it into the spend bundle template. Next we can enter the puzzle reveal we calculated earlier. For the solution, we're going to have to so some work.

04:20  
We'll use the standard condition `CREATE_COIN` to unlock the value of the coin and send it back to our wallet. To do that, we'll need our address which we can get with `chia wallet get address` and decode it to get the wallet address puzzle hash with `cdv decode` and our address.

04:40  
To craft the solution, we'll run this command where `51` is the `CREATE_COIN` condition code, our wallet address puzzle hash, and an amount in mojo. We can enter this response into the solution of our spend bundle.

05:00  
Finally, the aggregated signature. Remember that the message we are signing is the tree hash of our conditions; or our solution. So first, let's generate that hash. Next we'll also need the coin ID and the genesis challenge. The genesis challenge is a standard value for each network.

05:20  
You can find the appropriate challenge by entering `chia show -s` and searching for 'genesis challenge'. Since we're on testnet10, our challenge is this value starting with 'AE'. For the coin ID, we actually need the parent ID, the puzzle hash, and the amount which can all be found in the coin record we copied earlier.

05:40  
To get the coin ID, we'll run `cdv inspect -id coins` enter the parent ID, the puzzle hash, and the amount. (`cdv inspect -id coins --parent-id [PARENT_ID] --puzzle-hash [PUZZLE_HASH] --amount [AMOUNT]`) The `AGG_SIG_ME` condition expects the concatenation of the conditions treehash, coin ID, and genesis challenge, so run

06:00  
`concat` the conditions treehash, coin ID, and genesis challenge. Make sure to use the prefix `0x` to signify that these are values. Now let's sign this message and since we're NOT using it as a value, remember to remove the `0x` prefix this time.

06:20  
Now we can enter this signature into our spend bundle and push it. Run `cdv rpc pushtx spendbundle.json`. If your signature is incorrect, you'll get a failure message. Otherwise, congratulations! You've created a smart coin secured with a signature and spent it.

06:40  
So we've talked in this video about how signatures work, their importance, and how to implement them into a smart coin. Thanks so much for watching, I'll see you next time.

</details>

---

## Common gotchas

- **0x Prefixes:** It's important to keep track of how we are using different values and understand how Chialisp is going to handle them. A common gotcha is forgetting to append `0x` to a value, or in some cases removing it to tell the puzzle how to properly handle the parameter.
- **"Saving for Later":** At several points in this lesson, we generate results that we'll need to use elsewhere, sometimes many times. These results also do not have obivious indicators as to what they are. It's helpful to have a document to temporarily store these results for later use.

---

## Knowledge check

:::tip Question 1 - Keys

True or False. You need to use someone's private key to lock up a coin for them to spend.

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

False. You would use their public key. Private keys are to be kept secret and never revealed to anyone.

</details>

:::tip Question 2 - Aggregate Signature

An Aggregated Signature is comprised of which three components?

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

The `AGG_SIG_ME` condition expects a concatenated value of the following:

1. The conditions treehash.
2. The coin ID.
3. The genesis challenge.

</details>

---

## Additional resources

### Links

- General [chialisp concepts](https://docs.chia.net/guides/chialisp-concepts): overviews of currying, inner puzzles, and morphing conditions.
- Guided [chialisp walkthroughs](https://docs.chia.net/guides/): guides for installation, creating smart coins, and working with BLS signatures.
- Chialisp [detailed documentation](https://chialisp.com/): detailed information on all aspects of chialisp.
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

---
