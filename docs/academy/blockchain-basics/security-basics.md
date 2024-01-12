---
title: Chia Blockchain Security Intro
slug: /security-basics
description: In this lesson, we learn the basic security implementations in Chia and how they protect users from bad actors.
keywords:
  - chia
  - academy
  - overview
  - Decentralization
  - Coin Signatures
  - Chialisp Security
---
In this lesson, we learn the basic security implementations in Chia and how they protect users from bad actors.

## Learning objectives
- **Decentralization**: Understand how a decentralized network enhances security and reduces attack options for bad actors.
- **Coin Signatures**: Learn how coin signatures protect the users ability to spend the coins.
- **Chialisp Security**: Review the inherent security of Chialisp, the language used for coin puzzles. 

---

## Content

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/CATI6OVHPAg" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## Script
<details>

<summary> Expand for the full script </summary>

00:00  
The Chia blockchain uses several layers of security. 

00:10
The first the inherent security that comes from decentralization. By following a consensus method that prioritizes decentralization, 

00:20
the network ensures that the new blocks being formed are not manipulated by bad actors. There is no need to have a trusted third party to validate transactions, as the network as a whole will weed out anything non-valid.

00:30
To secure transactions, we use signatures to protect the coins. In order to make sure that a transaction hasn’t been altered, 

00:40
every spend bundle (the packet of information about a transaction that gets sent out to nodes) contains an aggregated signature that will only match if the underlying information is unaltered. 

00:50
In addition, a common condition included in the coin is a required signature to spend, preventing anyone but the authorized party from using the coin.

01:00
Additionally, the language used to create "smart coins" is a custom flavor of Lisp called "Chialisp" that is designed to be highly efficient, secure, and easily auditable 

01:10
so you can be sure about what exactly a coin is going to do when it is spent.

01:20
</details>

---

## Common gotchas

- **Decentralization:** The true decentralization of Chia greatly increases the economic costs associated with performing various attacks on Chia, protecting it from all scales of bad actors.  
- **Coin Signatures:** Ensuring that a coins solution requires signing ensures that only the intended user can spend the coin, this is an essential part of securing coins on Chia.  
- **Chialisp Security:** Chialisp has been developed from Lisp to ensure Chia coins are highly efficient, secure, and easily auditable.  

---

## Knowledge check

:::tip Question 1 - Decentralization

Does Chia rely on a centralized third party to validate and secure the blockchain?

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

No, Chia is truly decentralized and its network ensures security and block validity through the established consensus mechanism.

</details>

:::tip Question 2 - Coin Signatures

Do all coin solutions require signatures to be secure?

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

No, while coin signatures are highly recommended for securing coins they are not required and Chialisp operators provide alternatives for securing coins.
Note - if building coin puzzles that do not require signed solutions be very attentive to all possible exploits, some of which are documented [here](https://chialisp.com/common_issues).

</details>

:::tip Question 3 - Chialisp

True or False: Chia uses the same on-chain language that is used for Bitcoin.

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

False, a custom-developed flavor of Lisp called Chialisp was developed to be used for the Chia blockchain.

</details>

---

## Additional resources

### Links

- General [Security Overview](https://docs.chia.net/coin-set-security): overviews of Chia security and a review of potential attacks.
- Overview of [Coin Signing](https://docs.chia.net/coin-set-security/#signing): reviews the purpose of signing and when it should be used for coins.  
- Chialisp [detailed documentation](https://chialisp.com/): detailed information on all aspects of Chialisp.  
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.  

--- 