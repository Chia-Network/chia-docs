---
title: Inner Puzzles
slug: /chialisp-inner-puzzle
---

## Learning objectives

- **Functions**: Learn how to define and execute functions in Chialisp.
- **Nesting Puzzles**: Understand the use of nesting puzzles in Chialisp.

***

## Content

In this lesson, we'll talk about why you might want to nest puzzles and how to set them up.

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/GAw1yMmkO3g" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

***

## Script

<details>

<summary> Expand for the full script </summary>

00:00\
All puzzles result in the output of a condition that tells a blockchain what to do with a coin that it's wrapped in. Inner puzzles can be thought of as a coin within a coin where the result is a condition that is passed to the outer puzzle which executes it.

00:20\
One specific use for this functionality is if you wanted to use a generic inner puzzle and wrap it in an outer puzzle that verifies a signature. The outer puzzle can be a sort of template that you can pass in any generic inner puzzle and it will be signature protected by the outer puzzle. Let's create this exact outer puzzle template.

00:40\
We're going to define a module, and for our parameters we'll have a `PUBLIC_KEY` that we'll curry in later, an `INNER_PUZZLE` that we'll also curry in, and then the `inner_solution`. We'll include the `condition_codes.clib` library file and the `sha256tree.clib` library file as well. Then, we're going to define a new function.

01:00\
We'll call this `calculate_output` and in the parameters we'll have our `PUBLIC_KEY`, the `inner_solution`, and the `conditions` that we'll execute. In a combine statement, we'll have the standard signature verification that we used in the previous video. (`(defun calculate_output (PUBLIC_KEY inner_solution conditions) (c (list AGG_SIG_MET PUBLIC_KEY (sha256tree inner_solution)) conditions))`)

01:20\
For the message that we're verifying, we'll be verifying the `inner_solution` and then we'll return the `conditions`. Now that we've defined our new function, we'll call it with `calculate_output`, provide the `PUBLIC_KEY` and the `inner_solution`, and then we'll use the `apply` operator or `a` on our `INNER_PUZZLE`, providing the `inner_solution`. (`calculate_output PUBLIC_KEY inner_solution (a INNER_PUZZLE inner_solution)`)

01:40\
The `apply` operator is how you execute some code. So the `INNER_PUZZLE` will be executed with the `inner_solution`. So this puzzle will first evaluate the inner puzzle with the `(a INNER_PUZZLE inner_solution))` method, and use the result as the condition for our `calculate_output` function.

02:00\
This function requires a signature of the `inner_solution` to pass. Now let's write the inner puzzle. For this puzzle, we're going to use a condition called `ASSERT_HEIGHT_RELATIVE`, which specifies when a coin can be spent, based on the number of blocks passed since coin creation. We'll define a module and in our parameters, we'll curry in the `REQUIRED_BLOCKS`. This will be a number of blocks that have to pass before the coin can be spent.

02:20\
Then, we'll have our `conditions`. We'll include the `condition_codes.clib` library again, and then we'll define a statement that uses the `ASSERT_HEIGHT_RELATIVE` condition on the `REQUIRED_BLOCKS` that we curried in, and then we'll return the `conditions`.

02:40\
All right, now we have both our inner puzzle and our outer puzzle. Let's curry in the needed values. First we'll get our public key with `chia keys show`, and then we'll curry the block value into the inner puzzle with `cdv clsp curry inner-puzzle.clsp -a` and specify the number of blocks that we want to pass.

03:00\
In this case, we'll use `20`. We can now curry this result, along with our public key, into the outer puzzle with `cdv clsp curry outer-puzzle.clsp -a`, enter our public key, `-a` and in quotes we'll paste the compiled inner puzzle.

03:20\
Now that we have our final compiled puzzle, we can go ahead and create a coin using the process that we covered in the last video. Once the coin has been created, we can create our solution for this coin. First we get our wallet address and `decode` it. We'll use this in our desired solution. Again, we'll be using the `CREATE_COIN` condition signified by the code `51`.

03:40\
Note that I'm nesting the solution in four (4) sets of parentheses. This is because the outer puzzle parameters list is passed in wrapped with parentheses as is the inner solution. In the inner puzzle, we have another set of parentheses for the list of conditions, and each condition is also wrapped.

04:00\
It's important to understand the structure of the puzzle to make sure that the solution you provide is structured properly. Now we'll add the encoded solution into our spend bundle where we already have the coin info and puzzle reveal from coin creation. Next, we'll get our signature using the method we outlined in the previous video. We'll hash our solution and concatenate it with the coin ID and genesis challenge.

04:20\
Now we can sign the resulting message with `chia keys sign` and copy the signature into our spend bundle, being sure to append `0x` to signify that it's a value. Now run `cdv rpc pushtx spendbundle.json`.

04:40\
If the number of blocks is not yet passed, it will have a pending status. If successful, we can look up the coin record again and see that the spent block index is more than 20 blocks later than the confirmed block index. In this video, we learned how inner puzzles work and how they interact with outer puzzles. Thanks so much for watching, catch you next time.

</details>

***

## Common gotchas

- **More Parentheses:** It's important to take note of where your solutions are going to be used in your puzzle and wrap them in the appropriate amount of parentheses. This can be counter-intuitive as the parentheses can seem unecessary at first glance.

***

## Knowledge check

:::tip Question 1 - Evaluating Inner Puzzles

What operator is used to evaluate a puzzle within another puzzle?

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

The `apply` operator. (`a`)

```chialisp
(a INNER_PUZZLE inner_solution)
```

</details>

:::tip Question 2 - A New Condition

What does the `ASSERT_HEIGHT_RELATIVE` condition check for?

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

`ASSERT_HEIGHT_RELATIVE` checks for how many blocks have passed since coin creation. It allows the resolution of a puzzle after a predefined number of blocks have passed.

</details>

***

## Additional resources

### Links

- General [chialisp concepts](https://docs.chia.net/guides/chialisp-concepts): overviews of currying, inner puzzles, and morphing conditions.
- Guided [chialisp walkthroughs](https://docs.chia.net/guides/): guides for installation, creating smart coins, and working with BLS signatures.
- Chialisp [detailed documentation](https://chialisp.com/): detailed information on all aspects of chialisp.
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

***
