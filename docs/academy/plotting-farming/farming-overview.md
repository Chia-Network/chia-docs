---
title: Farming Overview
slug: /farming-overview
---

## Learning objectives

- **Protocols**: Understand the basics of the Chia Farming protocol.
- **Puzzles and Solutions**: Understand the use of puzzles and solutions in Chialisp.

---

## Content

In this lesson, we go over the plotting process, and what happens when a Farmer wins a challenge.

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/Y1BFnOkZAps" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## Script

<details>

<summary> Expand for the full script </summary>

0:00  
Farmers are nodes that seek to win Proof of Space challenges in exchange for rewards. The Farmer that wins a challenge constructs and processes a block of transactions and adds it to the blockchain.

0:20  
To start, the Farmers pre-generate hashes into large blocks called Plots. The size of these plots are determined by a constant, k. k32 is the minimum required size and equates to around 108GB per plot.

0:40  
This plotting process is computationally intensive, similar to classic blockchain "mining", however, this process is only done once, reducing the overall energy usage immensely. Once the plots are created, they are then passively monitored by harvesters to determine if they contain a valid Proof of Space for the current network challenge.

1:00  
If the Farmer wins the challenge, they will start filling a block with transactions from the mempool. The Farming client has control of which transactions to include in the block, and will usually choose based on the largest Farming Fee, adding to the overall reward received.

1:20  
The block is then processed, meaning all the transactions and programs within smart coins are executed and resolved. The block is then signed by the farmer and submitted to the chain.

</details>

---

## Common gotchas

- **Continuous Harvesting:** Plots do not need to be continuously created. A Farmer can create many plots all at once, and continuously harvest from those plots well into the future. The plots will remain valid and in use even after a proof of space has been found.
- **Choosing Transactions:** Transactions are stored temporarily in the "mempool" and are retrieved by a winning Farmer to create a block. The transactions can be chosen to maximize the reward a Farmer receives by prioritizing the transactions that include Farming Fees. This means that if a transaction doesn't include a Fee, there is a chance that it will not be included in a block even if it was created before the transactions that were.

---

## Knowledge check

:::tip Question 1 - k Size

What is the minimum k size required by the Chia blockchain?

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

`"k32"`

</details>

:::tip Question 2 - Plot File Size

How large is a plot file when using the minimum k-size, k32?

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

`"Around 108GB"`

</details>

:::tip Question 3 - Plotting Frequency

How often should a Farmer replot?

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

`"Ideally, a Farmer should not have to replot. There may be some instances a Farmer may want to replot (alter the k-size or compression, changing from pool-based farming to solo-farming etc.), but the plots should remain valid and useful well into the future."`

</details>

:::tip Question 4 - Processing Smart Coins.

True or False; When a block is created, the Timelord processes and evaluates all the contained smart coins.

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

`"False. The Farmer processes the smart coins contained in the block. The Timelord infuses the block to the rest of the chain."`

</details>

---

## Additional resources

### Links

- More [farming basics](https://docs.chia.net/farming-basics): overviews of plotting, pooling, and rewards.
- In depth [architecture overview](https://docs.chia.net/architecture-overview): describing the interactions between Farmers, Harvesters, Wallets, etc.
- Chialisp [detailed documentation](https://chialisp.com/): detailed information on all aspects of chialisp.
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

---
