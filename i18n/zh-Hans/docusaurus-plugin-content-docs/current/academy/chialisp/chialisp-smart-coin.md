---
title: Smart Coins
slug: /chialisp-smart-coin
---

import Runnable from '@site/src/components/Runnable.tsx';

In this lesson, we go over currying, hashing, and conditions, and submit and use our first Chia Smart Coin.

## Learning objectives

- **Currying**: Understand how to create more general use puzzle by using Currying.
- **Hashing**: Understand the need to obfuscate sensitive portions of a puzzle by using Hashing.
- **Conditions**: Using conditions to allow the spender of the coin to decide how it is spent.

***

## Content

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/-Nza_N9Xb3Y" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

***

## Script

<details>

<summary> Expand for the full script </summary>

00:00\
Everything on a blockchain is a coin. They are often referred to as smart coins because every coin has a chialisp program associated with it. That program, known as the puzzle, decides how and when the coin can be spent, and what happens when it is.

00:20\
NFTs, CATs, and standard transactions are all defined using puzzles. In the previous video, we learned how to write basic chialisp programs. Let's apply that to some more complex puzzles and create a coin that can be spent on the blockchain.

00:40\
In this video, we'll be talking about currying, hashing, and conditions. So let's get started! We'll start by creating a new chialisp file called `password.clsp` and create a module that takes a parameter `password` and determines if the value passed in equals `hello`. If it does, return correct, if not return incorrect.

01:00\
We'll run this using the `brun` command in our terminal and pass in `hello` which should give us a success. Just to test the opposite, we'll pass in something else, and see if that fails. So this is a bit of a refresher on chialisp basics. One of the issues we have with a puzzle like this is that the hard-coded value for the password is both insecure and not very useful.

01:20\
We'd like to have a generalized puzzle that we can use for any password we choose to have. For this we'll use currying and hashing. To make this puzzle more generalized, we will be using currying. To do so, let's replace our password parameter with two new ones, `CORRECT_PASSWORD` and `provided_password`, and then run our comparison on those parameters.

01:40\
Now in our terminal, we can curry in a value to replace the correct password parameter and compile it. Run `cdv clsp curry password.clsp -a` and pass in our desired password, in this case - `hello` and we get the following result. Now if we run that through `brun` and give it the correct password, we should get a success.

02:00\
We can also nest these commands like this - (`brun "$(cdv clsp curry password.clsp -a 'goodbye')" "(goodbye)"`). The first steps to making our puzzle more secure is to use hashing. A hash function will take an input and return a hash value. One of the most popular hashing algorithms is sha256 which is directly supported within chialisp.

02:20\
A few important notes about hash functions; given a value, calculating the hash is extremely easy. Given a hash, calculating the original input is extremely difficult or impossible, and passing the same value through a hashing function multiple times will always result in the same output.

02:40\
We can use these principles to our advantage by currying a hash of the expected password instead of the password value itself. This prevents us from revealing the expected password while still allowing us to check if the provided password is correct. This is done by hashing the provided password. So let's change our puzzle to use hashing.

03:00\
First, change the curried parameter to `PASSWORD_HASH` and change the other parameter to `password`. In the comparison, use sha256 to hash the given password and compare it to the password hash. To test this we'll first have to hash a password and curry it into our new puzzle.

03:20\
Run `cdv hash "hello"` to get the hash for the password 'hello'. We can now curry this into our puzzle like last time, making sure to prefix the hash with `0x` to identify it as a chialisp value. Now we can pass this compiled puzzle through `brun` and provide the correct password to test.

03:40\
It's important to know that while hashing is an essential part of securing our puzzle, this is not quite enough. When we provide our solution with the correct password, that password will be visible on the blockchain. Meaning we won't be able to use it again. The final solution to this problem is to use signatures, which we'll talk about in a future video. Now that we've talked about currying and hashing, let's talk about conditions.

04:00\
In our password puzzle, let's make a couple of additions. First, we'll add a parameter called conditions and then replace the success and fail messages with that parameter, followed by `(x)`. So what does this do? Well the `x` represents an error. If the password is incorrect, the if statement will evaluate to false and error out, terminating the program and leaving the coin that we are creating unspent.

04:20\
If the correct password is given, the conditions that are provided by the spender will be run. So back to our terminal, first we'll need to curry in our hashed password as before. Now that we have the compiled puzzle, we're going to need to do a few things to create the coin. First, we'll need the puzzle hash which we can get by running `opc -H` and passing in our compiled puzzle.

04:40\
We'll save the result for later. Next, we'll need the puzzle reveal which is just a serialized form of the puzzle in hex. It's what you must reveal on chain when spending a coin. We can get this by running `opc` and passing in our compiled puzzle. We'll save this for later as well.

05:00\
Now to create the coin, we need to encode our puzzle hash into an address with `cdv encode -p txch` and passing in our puzzle hash. We then send that address an amount of xch to lock it. Now let's spend the coin to release value back to our wallet. First, we'll get our wallet address and convert it to a puzzle hash with `cdv decode`.

05:20\
We'll then use this to build the condition we want to pass into the coin. For this example, we're going to use the `CREATE_COIN` condition which is denoted by the code `51`. So to construct our solution, we'll write `opc` then give our password, then the condition we want to pass in.

05:40\
In this case, the condition code `51`, our wallet puzzle hash - prefixed by `0x`, and an amount. This output is our solution and we'll save it for later. All right, we now need to retrieve the coin record we created earlier when we committed xch to the puzzle. Run `cdv rpc coinrecords --by puzzlehash` and pass in the original puzzle hash.

06:00\
The output may contain a few coin records depending on if you're following the example closely and use the most recent one based on highest block index, and copy the coin record. Now we are going to create a spend bundle. Start a `json` file and create a property called `coin_spends` that contains an array containing an object. (`[{}]`)

06:20\
Paste the coin record, followed by the puzzle reveal you generated earlier, and then the solution. Create another property called `aggregated_signature` and assign this value (`0xc0000000000...`) That's 191 zeros. Now submit the spend bundle to the mempool with `cdv rpc pushtx spendbundle.json`.

06:40\
If everything was successful, this transaction should be accepted and you should see your wallet balance increase after some time passes. Now you've created your first smart coin. In this video, we talked about how to curry values into a generalized puzzle, how to hash both sensitive values as well as puzzles for creating coins, and touched on conditions that can be passed into puzzles.

07:00\
In the next video, we'll talk further about security and how to use signatures to better secure your transactions. See you then.

</details>

***

## Common gotchas

- **Curried parameters:** It's considered best practice to write parameters that are intended to be curried in in all caps. This helps keep track of where each parameter is coming from while writing the puzzle.
- **0x Prefixes:** It's important to keep track of how we are using different values and understand how Chialisp is going to handle them. A common gotcha is forgetting to append `0x` to a value, or in some cases removing it to tell the puzzle how to properly handle the parameter.
- **Condition Codes:** Condition codes are by default signified by a numerical code. In future lessons, we will also use a library that allows us to reference the codes with more descriptive language.

***

## Knowledge check

:::tip Question 1 - Curried Parameters

Which parameter in this puzzle will be curried in?

```chialisp
(mod (ARG1 arg2)
    (if (= ARG1 arg2)
        "Equal"
        "Not Equal"
    )
)
```

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

ARG1 will be curried in.

Currying always substitutes parameters in order, so when currying, the first will be replaced. Best practice is to write a curried parameter in all caps to help us keep track.

</details>

:::tip Question 2 - Hashing Principles

What are the three principles of hashing?

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

1. Given a value, hashing that value is computationally easy
2. Given a hash, calculating the value is computationally difficult or impossible
3. Hashing the same input, will result in the same output

</details>

:::tip Question 3 - Hashing Puzzle

True or False. Sha256 is one of the most popular hashing algorithms and is natively supported by chialisp.

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

True

</details>

:::tip Question 4 - Combining all of the above

Write a Chialisp puzzle that performs the following.

- Accepts a curried parameter
- Hashes a provided parameter with sha256 and compares it to the curried parameter.
- Outputs a provided result if the comparison is true.

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

```chialisp
(mod (PASSWORD_HASH password conditions)
    (if (= (sha256 password) PASSWORD_HASH)
        conditions
        (x)
    )
)
```

</details>

***

## Additional resources

### Runnable Chialisp and clvm plugins

For information on using these plugins please refer to the [academy overview](/academy-overview#runnable-chialisp-and-clvm-plugins)

#### Chialisp plugin

<Runnable flavor='chialisp' input='(10 99)'>

```chialisp
(mod (arg1 arg2)
    (if (> (+ arg1 arg2) 100) "large" "small")
)
```

</Runnable>

#### Clvm plugin

<Runnable flavor='clvm' input='(1)'>

```chialisp
(a (i 2 (q 1 . "true") (q 1 . "false")) 1)
```

</Runnable>

### Links

- General [chialisp concepts](https://docs.chia.net/guides/chialisp-concepts): overviews of currying, inner puzzles, and morphing conditions.
- Guided [chialisp walkthroughs](https://docs.chia.net/guides/): guides for installation, creating smart coins, and working with BLS signatures.
- Chialisp [detailed documentation](https://chialisp.com/): detailed information on all aspects of chialisp.
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

***
