---
title: Coin-Set Model Intro
slug: /coinset-basics
description: In this lesson, we dive into the coinset model basics and learn what it means to spend a coin in Chia.
keywords:
  - chia
  - academy
  - overview
  - Coin Contents
  - Coin Puzzle
  - Coin Solution
---
In this lesson, we dive into the coinset model basics and learn what it means to spend a coin in Chia.

## Learning objectives
- **Coin Contents**: Learn what data is stored in a coin.
- **Coin Puzzle**: Understand the role of a coins puzzle.
- **Coin Solution**: Learn about the importance of a coins solution.

---

## Content

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/QMs6Z6_ZQdg" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## Script
<details>

<summary> Expand for the full script </summary>

00:00  
Chia uses the "coinset model" to keep track of the blockchain's state. 

00:10
In this model, every transaction is represented by a "coin" that contains a value, the rules by which the coin can be spent, and signature authorizing the spend. 

00:20
What this means is that a "coin" can have any value (in mojo) and as long as the rules are satisfied, anyone can spend the coin. 

00:30
There are no accounts represented in the system.

When a coin is created, the value is locked away in that coin and is inaccessible until the coin is spent, 

00:40
at which point new coins will be created with values equal to the original.

For example, if I want to send 1 XCH to someone else, 

00:50
I will create a coin with a value of 1 XCH (or 1 trillion mojos), and set the conditions of the coin to only allow the coin to be spent if given the signature of the other person. 

01:00
This in effect "sends" the coin to the other person, because they now control what happens to it. When they want to spend the coin, they provide the correct signature, and a new coin is created, 

01:10
with a value of 1 XCH, itself containing it's own rules of how it can be spent.

In this way, each coin is only ever used once. 

01:20
Once it has been spent, it creates a new coin. In Chia, we call the set of conditions needed to unlock the coin the 'puzzle', and the provided data to unlock the coin is the 'solution'.

01:30
The coin is represented in the chain as a hash of three attributes, the parent coin ID, (or the ID of the previous coin that created this new one), 

01:40
the hash of the puzzle that contains the conditions, and the value of the coin.

01:50
</details>

---

## Common gotchas

- **Coinset vs Account:** Chia adopts the coinset model where everything is a coin that has its own set of rules, more information about the coinset model can be found [here](https://docs.chia.net/coin-set-vs-account/). This differs from the account model which instead uses contracts (or accounts) to represent users balances and these balances are what is stored on the chain (as opposed to coins and those coins values).  
- **Puzzles:** All requirements for spending a coin are contained in the coins puzzle. These puzzles can be simple or complex and effect how, when, and by whom the coin can be spent. The coins puzzle must be determined at the coins creation and cannot be altered thereafter.  
- **Solutions:** The ability to spend a coin is based on the users ability to provide a valid solution for the coins puzzle.  

---

## Knowledge check

:::tip Question 1 - Coinset

What data is contained in coins on the Chia Blockchain? (Select all that apply)

A. Amount (or value)
B. User account number
C. Puzzle Hash
D. Parent Coin ID

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

A. Amount (or value)
C. Puzzle Hash
D. Parent Coin ID

</details>

:::tip Question 2 - Puzzle

True or False: All puzzles on the Chia blockchain are the same.

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

False, while coin puzzles might be similar (such as the standard transaction) the parameters in puzzles vary greatly (who can spend the coin, how it can be spent, other special rules).

</details>

:::tip Question 3 - Solutions

Do all coin solutions require a signature?

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

No, it is possible to create coins that do not require any signature or other spender validation (anyone can spend coins) or to even lock coins using non-signature restrictions (such as password protected coins).

</details>

:::tip Question 4 - Coinset vs Account Model

Does Chia adopt the coinset model or the account model?

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

The coinset model.

</details>

---

## Additional resources

### Links

- Detailed [coinset and account model comparisons](https://docs.chia.net/coin-set-vs-account/): details the differences between the coinset and account models including how these differences effect transactions.
- Overview of [coin puzzles](https://docs.chia.net/coin-set-intro/#puzzles): overviews the role of a coins puzzle and the effect it has on the coins abiltiy to be spent.  
- Security recommendations for [signing solutions](https://docs.chia.net/coin-set-security/#signing): reviews the recommendations for securing puzzles by requiring that solutions are signed to limit those who can spend the coin.  
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.  

--- 