---
title: How New Blocks are Formed
slug: /block-formation-basics
---

In this lesson, we review the basics of block formation including the farmers role in validating transactions, forming blocks, and managing the mempool.

## Learning objectives

- **Transaction Validation**: Learn how nodes validate transactions for inclusion in a block.
- **Block Formation**: Understand farmers role in forming blocks.
- **Mempool**: Review the mempool basics for transaction inclusion and removal.

***

## Content

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/yxt53B4GGbM" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

***

## Script

<details>

<summary> Expand for the full script </summary>

00:00\
Every time a transaction occurs, it first gets sent to a full node (a node that is staying synced with the current state of the network), which verifies that it is a valid transaction.

00:15\
This verification ensures that the conditions and signatures are valid, and that the coins being spent are currently unspent and valid. The transaction is then added to the mempool waiting to be included in a block.

00:30\
A Farmer that wins the challenge will form a block by retrieving transactions from the mempool, usually based on fee amount, until the maximum block size is reached. The block is then signed and added to the chain,

00:45\
and the relevant transactions are cleared from the mempool. In this way, transactions are propagated throughout the network very quickly, through the mempool, but are only confirmed once included in a block.

01:00

</details>

***

## Common gotchas

- **Transaction Validation:** Transactions are validated by all nodes not only while blocks are being formed but also when the newly infused blocks are sent from peers, this eliminates a malicious actors ability from altering transactions even if they have the fastest timelord and have farmed the block.
- **Block Formation vs Infusion:** Block formation is the process of combining proofs of space with transactions (the foliage) and is performed by the farmer while block infusion is the process of adding blocks to the chain itself and is performed by timelords.
- **Mempool:** All spend bundles (transactions) from the mempool that will be included in a block are aggregated together during block formation, this means that the specific spend bundle for a given transaction is not stored on-chain and is only available in the mempool.

***

## Knowledge check

:::tip Question 1 - Transaction Validation

What system validates transactions in Chia?

A. Timelords\
B. Farmers\
C. Harvesters\
D. Full Nodes

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

D. 全节点

</details>

:::tip Question 2 - Block Formation

Is the below statement True or False?

Full nodes are responsible for infusing blocks while timelords are responsible for forming blocks.

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

False, it is timelords that **infuse** blocks to the chain and the role of full nodes to **form** blocks while creating proofs of space.

</details>

:::tip Question 3 - Mempool

What is the Mempool?

A. Temporary storage on the network where transactions are queued before being confirmed.\
B. The amount of system memory the blockchain can access.\
C. The total size of all current plots on the network.\
D. Another name for the chia blockchain database.

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

A. Temporary storage on the network where transactions are queued before being confirmed.

</details>

***

## Additional resources

### Links

- Transaction validation [overview](https://docs.chia.net/block-validation/#body-validation): dives into the requirements for validating the blocks body (which contains the transactions).
- Block formation [overview](https://docs.chia.net/consensus-foliage): explores the intricacies of the full nodes role in block formation and when transaction blocks are formed.
- Block Infusion [detailed documentation](https://docs.chia.net/signage-and-infusion-points/): detailed information on how and when blocks are infused in the chain.
- Mempool [detailed documentation](https://docs.chia.net/mempool/): detailed information on all aspects of mempool inclusion scenarios and how the mempool is updated.
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

***
