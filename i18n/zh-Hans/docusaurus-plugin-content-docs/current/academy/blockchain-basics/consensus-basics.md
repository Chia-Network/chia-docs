---
title: How Chia Consensus Works
slug: /consensus-basics
---

In this lesson, we review the basics of consensus, the process by which to determine the true state of a blockchain.

## 学习目标

- **Farmers**: Understand the basic role of farmers in providing proofs of space.
- **Timelords**: Understand the basic role of timelords in providing proofs of time.
- **Plot Filter**: Understand the basic role of the plot filter and its effect on the eligibility of proofs of space.

---

## 内容

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/6fbZwfrYkcg" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## 脚本

<details>

<summary> Expand for the full script </summary>

00:00\
Consensus is the process by which to determine the true state of a blockchain. In short, by randomly selecting which node authorizes a new block, it becomes difficult for a bad actor to inject a false truth to the system.

00:20
With Chia, the consensus method is called Proof of Space and Time. Nodes begin by pre-generating hashes to store on spare disk space, called "plots". While this takes a lot of work, the work is only done once, and the results are stored and referenced continuously.

00:40
We call these nodes "Farmers".

The Timelord is a program that broadcasts a proof of time to the network to first prove that time has passed since the last challenge, and then to generate a new challenge to distribute to the Farmers. This challenge is what determines the winner of the current block.

01:00
Next, a plot filter is implemented that automatically disqualifies a subset of plots. This further randomizes the winner, and is implemented fairly so each Farmer has the same chance of passing the filter. If the filter is passed, the Farmer will check their plots to find a quality proof of space,

01:20
and submit it to the chain. If the proof is the highest quality, the Farmer is granted authority to process and add the block to the chain, and rewarded with XCH.

This consensus method maintains trustless security through high-decentralization while remaining energy efficient.

01:40

</details>

---

## 常见问题

- **Proof of Space:** Chia relies on Proof of Space where the user stores deterministic x value tables in "plots" not to be confused with Proof of Capacity (PoC) where users store data of other network participants (like filecoin).
- **Timelords:** Timelords play the role of issuing challenges, verifying proofs of space, and infusing blocks to the chain. Farmers submit their Proofs of Space to Timelords but it is the Timelords that infuse blocks.
- **Plot Filter:** The plot filter in Chia consensus automatically disqualifies a portion of plots from being valid Proofs of Space for a specific challenge, these plots can contain valid Proofs of Space for future challenges.

---

## 知识检测

:::tip Question 1 - Consensus Method

What is the consensus method used by Chia?

A: Proof of Work
B: Proof of Stake
C: Proof of Space and Time
D: Proof of Plots

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

C: Proof of Space and Time

</details>

:::tip Question 2 - Proof of Time

What system is used to prove that time is passing?

A: Farmer
B: Timelord
C: Plot
D: Node

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

B: Timelord

</details>

:::tip Question 3 - Proofs of Space

What does a farmer check for valid proofs of space?

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

Plots (deterministic x-value tables)

</details>

:::tip Question 4 - Quality Proofs

What is the current (as of December 2023) ratio of plots that contain eligible proofs of space and what is the name of this ratio?

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

1/512 , the plot filter.

</details>

---

## 附加资源

### 链接

- Consensus [detailed documentation](https://docs.chia.net/consensus-intro): details the Chia consensus including proofs of space and time, timelords, vdfs, and more.
- Farming [basics](https://docs.chia.net/farming-basics): overviews the farming process and how to get started.
- Timelords [detailed documentation](https://docs.chia.net/timelord-algorithm): details the timelords role in the consensus model.
- Plot filter [calculations](https://docs.chia.net/signage-and-infusion-points): overviews the process by which the plot filter effects the number of plots containing eligible proofs.
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

---
