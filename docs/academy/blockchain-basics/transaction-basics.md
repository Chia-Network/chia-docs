---
title: Sending Transactions
slug: /transactions-basics
---

In this lesson, we look at the fundamental capability of sending assets to others on the blockchain.

## Learning objectives

- **Sending transactions**: Learn how to send a simple transaction.
- **Transaction Fees**: Understand how transaction fees expedite your transaction.
- **Clawbacks**: Dip your toes into more advanced custody with sending a clawback enabled transaction.

---

## Content

---

## Script

<details>

<summary> Expand for the full script </summary>

00:00  
The ability to send an asset to another person trustlessly is a fundamental capability of any blockchain. In Chia, sending a transaction means submitting a spend bundle to the mempool and awaiting inclusion in a block. The standard transaction puzzle supports sending XCH and CATs to an XCH receive address.

00:15  
Farmers that [form a transaction block](/block-formation-basics) will prioritize transactions that include a transaction fee to subsidize their role in securing the blockchain. Most Chia wallets will suggest an appropriate transaction fee and time estimate for inclusion in a block.

00:30  
For standard XCH transactions a memo can optionally be included. This memo will be permanently recorded and visible on the blockchain. This can be helpful to include an invoice number of just to send a nice note to the receiver.

00:45  
When sending a large transaction, it can be helpful to give yourself an opportunity to "undo" a transaction in case you made a typo or the receiver accidentlly gave you the wrong XCH address. Sending a transaction with a clawback period enabled will move your funds to an intemediary state where you can spend it back to yourself within the clawback period. After the clawback period, either party can spend the coins to an address solely controlled by themselves, known as sweeping.

</details>

---

## Common gotchas

- **Coinset model considerations:** While a transaction is pending, you may notice a larger amount of coins being unavailble for spending. This is due to how the [coinset model](/coinset-basics) works. When a transaction is complete, the excess change from a larger coin will go back into your wallet. If using the reference wallet, this change will automatically go to a new derived address in your wallet.

- **Receiver clawback support:** If sending a transaction with clawback enabled, the receiver will need to sweep the funds into their wallet to complete the transaction. Not all wallets support this so make sure the receiver is using a compatible wallet before using the clawback feature. For example, exchanges likely won't support clawbacks when depositing XCH. Not to worry, as the sender you can always claw back the transaction to your wallet and send again without clawback enabled.

- **Sending NFTs:** Transferring singletons like [NFTs](/academy-nft) are treated differently than sending XCH or CATs. Many wallets support a Transfer NFT function to move an NFT from one address to another but this currently does not support features such as memos or clawbacks.

---

## Knowledge check

:::tip Question 1 - Transaction Fees

Who receives the transaction fee?

A. The transaction fee gets burned.
B. It goes to the farmer that formed the block.
C. It goes to the receiver of the transaction.
D. It goes to an ecosystem developer fund.

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

B. It goes to the farmer that formed the block.

</details>

:::tip Question 2 - Clawbacks

After the clawback period expires, who can sweep the funds to themselves?

A. Only the sender  
B. Only the receiver  
C. Either the sender or receiver  
D. None, the blockchain will automatically handle it.

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

C. Either the sender or receiver

</details>

---

## Additional resources

### Links

- Clawback [detailed documentation](https://docs.chia.net/guides/clawback-primitive-guide/): details about how the Clawback primitive works.
- Mempool [overview](https://docs.chia.net/mempool/): detailed overview of how the mempool works and transactions priority is considered.
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.

---

A MASSIVE thank you to [SlowestTimeLord](https://github.com/SlowestTimelord) for the help in this submission 
