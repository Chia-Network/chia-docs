---
title: CATs
slug: /academy-cat
---

In this lesson, we talk about Chia Asset Tokens, and how they can be used.

## 学习目标

- **Issuance**: Understand the basic types of issuance rules.

---

## 内容

<div class="videoWrapper">
<iframe width="100%" height="504" src="https://www.youtube.com/embed/XJbpmgbEYpM" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## 脚本

<details>

<summary> Expand for the full script </summary>

0:00\
A Chia Asset Token, or CAT, is a type of fungible token that can be minted from XCH. These tokens can take many different forms from a separate form of currency, to representing a collection of identical assets.

0:20
A CAT can have different properties, determined by it's TAIL, or Token Asset Issuance Limiter. This TAIL determines how the CAT is issued, how it can be subsequently spent, and whether it can be melted back into XCH.

0:40
A CAT wraps an inner puzzle that controls ownership of the coin. This is typically the standard transaction puzzle to facilitate sending the CATs to a Chia wallet. For the TAIL, there are 2 standard puzzles, Single-Issuance, and Multi-Issuance.
The Single-Issuance TAIL is more restrictive and is designed to make sure the supply is maintained.

1:00
With this TAIL, only the CATs minted at creation are valid, and they cannot be melted back into XCH.
The Multi-Issuance TAIL allows more identical CATs to be issued in the future, as long as the original issuance key is used. This is useful if the total number of tokens needed is unknown.

1:20
While these are the standard puzzles, a TAIL can be customized to allow any desired behavior.

</details>

---

## 常见问题

- **Fungibility:** CATs are fungible, meaning they can be exchanged for each other at will. There are no editions, lot numbers, or anything else that would differentiate two CATs from the same issuance.
- **Melting:** Melting a CAT (if allowed by the TAIL) converts the underlying value of the CAT back to XCH which can then be used for other coins. A CAT can only ever be melted into the same amount of XCH used to create the CAT.

---

## 知识检测

:::tip Question 1 - CATs vs. NFTs

True or False; A CAT is a special type of NFT.

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

错误 A CAT is fungible, whereas an NFT is non-fungible and represents a unique item.

</details>

:::tip Question 2 - TAILs

What are the standard types of TAILs?

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

Single-Issuance and Multi-Issuance.

</details>

---

## 附加资源

### 链接

- More about [primitives](https://docs.chia.net/guides/primitives/): guides for each primitive, and how to use them.
- In depth [CAT overview](https://docs.chia.net/guides/cat-creation-tutorial/): describing the CAT standard, and how to issue them.
- Chialisp[详细文档](https://chialisp.com/)：提供有关Chialisp各个方面的详细信息。
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

---
