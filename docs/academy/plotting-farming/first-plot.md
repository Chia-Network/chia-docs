---
title: Creating your first Plot
slug: /first-plot
---

## Learning objectives

- **Syncing a Full Node**: Learn how to set up the Chia client and sync a full node.
- **Plot Creation**: Learn how to create a plot.

---

## Content

In this lesson, we learn how to set up the Chia client, sync our full node using a torrent file, and create our first plot to start farming.

<div class="videoWrapper">
<iframe width="896" height="504" src="https://www.youtube.com/embed/UgTe1t-bMsU" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## Common gotchas

- **run vs brun:** Run is used to serialize and run chialisp puzzles while brun is used to run clvm serialized puzzles generally when passing arguments.
- **Parentheses:** Chialisp is part of the fully parenthesized prefix notation programming language family tracing their [origins](<https://en.wikipedia.org/wiki/Lisp_(programming_language)>) to LISP 1 from the 1950s. One highly apparent aspect of these languages is their use of parenthesis to denote lists. It is recommended to use an IDE with proper syntax highlighting when writing these languages to ensure that all parenthesis are in the proper places. To help with this here is a [Chialisp language server extension](https://marketplace.visualstudio.com/items?itemName=ChiaNetwork.chialisp) for Visual Studio.
- **Prefix Notation:** Chialisp being part of the LISP family uses prefix notation. This means that the functions or operators appears first with their arguments following.

---

## Knowledge check

:::tip Question 1 - Subtraction

What is a chialisp puzzle for subtracting two arguments?

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

```chialisp
(mod (arg1 arg2)
    (- arg1 arg2)
)
```

</details>

:::tip Question 2 - Comparison

What is the serialized form of this chialisp puzzle?

```chialisp
(mod (arg1 arg2)
    (> arg1 arg2)
)
```

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

```chialisp
(> 2 5)
```

</details>

:::tip Question 3 - If Statement

What is the result of the below serialized puzzle and solution?

Puzzle:

```chialisp
(a (i 2 (q 1 . "true") (q 1 . "false")) 1)
```

Solution:

```chialisp
(1)
```

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

`"true"`

</details>

:::tip Question 4 - Combining all of the above

What is a Chialisp puzzle that performs the following?

- Accepts two arguments
- Adds the two arguments together
- Compares the sum of the arguments to 100
- Results in "Large" when the sum is greater than 100 and "Small" when the sum is less than 100

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

```chialisp
(mod (arg1 arg2)
    (if (> (+ arg1 arg2) 100) "large" "small")
)
```

</details>

---

## Additional resources

### Links

- More [farming basics](https://docs.chia.net/farming-basics): overviews of plotting, pooling, and rewards.
- In depth [architecture overview](https://docs.chia.net/architecture-overview): describing the interactions between Farmers, Harvesters, Wallets, etc.
- Chialisp [detailed documentation](https://chialisp.com/): detailed information on all aspects of chialisp.
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

---
