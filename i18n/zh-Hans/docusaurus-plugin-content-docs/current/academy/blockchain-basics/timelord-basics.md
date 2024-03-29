---
title: What are Timelords
slug: /timelord-basics
---

In this lesson, we dive into the role that Timelords play in the consensus by using VDFs to generate challenges.

## Learning objectives

- **Proofs of Time**: Learn how Proofs of Time are created by timelords and what role they perform.
- **Verifiable Delay Function (VDF)**: Understand the basics of VDFs.
- **Challenges**: Explore how challenges and Proofs of Space create new challenges.

***

## Content

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/tJPdBmpgvsc" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

***

## Script

<details>

<summary> Expand for the full script </summary>

00:00\
To keep the blockchain consistent, we need to have a way to make sure that the blocks being added contain transactions that occur after the previous block.

00:15\
In many consensus methods, this is a basic assumption as the work required to determine who can author a block takes an amount of time. With Proof of Space, there is no work to be done at block-time, so we need another way of making sure that time has passed.

00:30\
The Timelord is a program that broadcasts a proof of time to the network using a Verifiable Delay Function to prove that time has passed since the last challenge, and then to generate a new challenge to distribute to the Farmers. This challenge is what determines the winner of the current block.

00:45\
The VDF is verifiable, meaning that although it takes a certain amount of time and effort to compute a result, that result can be easily verified without having to do the computation again.

01:00\
It is also deterministic, so any computation made with the same inputs will result in the same output.

The input of the VDF is the previous challenge combined with the winning proof of space for that challenge. The output of the VDF will be the next challenge.

01:15\
While at least one Timelord is required for the blockchain to function, anyone can run a Timelord and having multiple instances ensures that the network will remain resilient. The nature of the VDF also ensures that every instance of a Timelord will generate the same result given the same inputs.

01:30

</details>

***

## Common gotchas

- **VDFs and Proofs of Time:** A Verifiable Delay Function, also referred to as a Proof of Time or VDF, is a proof that a sequential function was executed a certain number of times.
- **Timelords:** Only 1 timelord is needed to keep the chain moving but anyone can run a timelord and multiple timelords on the network ensures resiliency. Some attacks that timelords protect against are documented [here](https://docs.chia.net/consensus-attacks#faster-timelord).
- **Challenges:** Challenges are deterministic meaning one can use the inputs (the previous challenge and Proof of Space) to verify the current challenge's accuracy.

***

## Knowledge check

:::tip Question 1 - Timelords

How many Farmers need to run a Timelord for the network?

A. Every Farmer needs to run a Timelord.\
B. At least half the Farmers need to run a Timelord.\
C. Farmers aren't able to run Timelords.\
D. Just one Timelord is needed for the network.

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

D. Just one Timelord is needed for the network.

</details>

:::tip Question 2 - Proofs of Time

What system creates Proofs of Time in chia?

A. Timelords\
B. Farmers\
C. Harvesters\
D. Wallets

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

A. Timelords

</details>

:::tip Question 3 - Verifiable Delay Functions (VDFs)

What are the primary purposes of VDFs? (choose all that apply)

A. To slow down the network.\
B. To prove time has passed between blocks.\
C. Provide security to the network.\
D. Prepare for time travel integrations.

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

B. To prove time has passed between blocks.\
C. Provide security to the network.

</details>

:::tip Question 4 - Challenges

Is the below statement True or False?

The input of the VDF is the previous challenge combined with the winning proof of space for that challenge. The output of the VDF will be the next challenge.

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

True

</details>

***

## Additional resources

### Links

- Timelords [detailed documentation](https://docs.chia.net/timelord-algorithm/): details the timelords role in the consensus model.
- Proofs of Time / VDFs [overview](https://docs.chia.net/proof-of-time/): detailed overview for Proofs of Time and VDFs.
- Challenges [detailed documentation](https://docs.chia.net/consensus-challenges/): detailed information regarding challenges.
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

***
