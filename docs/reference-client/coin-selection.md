---
title: Coin Selection
slug: /coin-selection
---

Chia uses the [Coin Set](/coin-set-intro) model of accounting, under which _everything_ is a coin. When Chia wallets perform certain actions, they must select one or more coins to spend or reserve. (Coin selection is performed automatically by the software; the wallet's user is not involved.)

Actions that require coin selection include, but are not limited to:
* Sending XCH to another wallet
* Locking up XCH in an Offer
* Creating a DID

Sometimes, coin selection is a straight-forward task. For example, let's say Alice's wallet contains one coin worth 1 XCH, and she wants to send 0.5 XCH to Bob. Alice's wallet will handle this by:
1. Spending the 1-XCH coin, thereby unlocking its value
2. Creating a coin worth 0.5 XCH and assigning it to Bob's wallet
3. Creating another coin worth 0.5 XCH and assigning it to Alice's wallet as "change"

In this case, there was only one coin to select, so the choice was obvious. Let's look at a more complex example.

Alice wants to send 0.5 XCH to Bob. In her wallet, she has:
- One coin worth 0.6 XCH
- One coin worth 0.3 XCH
- One coin worth 0.2 XCH

Her wallet has two obvious choices in deciding which coin(s) to spend:
1. Spend the 0.6-XCH coin and create two new coins: one worth 0.5 XCH for Bob, and one worth 0.1 XCH for Alice's change.
2. Spend the coins worth 0.3 XCH and 0.2 XCH and create one new coin worth 0.5 XCH for Bob. No change coin is needed in this case.

For option 1, Alice's wallet spends one coin and creates two coins -- 1 input, 2 outputs.

For option 2, Alice's wallet spends two coins and creates one coin -- 2 inputs, 1 output.

Which option will Alice's wallet choose?

#### Old algorithm -- largest first

Prior to version 1.4 of Chia's reference wallet, option 1 would have been chosen. This is because the reference wallet simply selected the largest coin available. If that coin didn't contain a sufficient amount of XCH to complete the transaction, the wallet added the next-largest coin, and so on until a sufficient amount was reached.

This algorithm was simple, but it created some frustrating outcomes. For example, let's say Alice wanted to create an offer to buy an NFT for 0.0001 XCH. In her wallet, she had:
- One coin worth 0.0001 XCH
- One coin worth 10 XCH

In this case, her wallet would have selected the 10-XCH coin. While waiting for her offer to be accepted, her 10-XCH coin would have been reserved, and only her 0.0001-XCH coin would have been available to be spent. This would have been all the more frustrating for Alice because she had a coin worth exactly the correct amount (0.0001 XCH), but it wasn't selected.

#### New algorithm -- knapsack

Starting in version 1.4, Chia's reference wallet switched to using the same coin-selection algorithm as Bitcoin Core. This algorithm's basic outline goes like this:
1. Search for a single coin that matches the amount to be sent, including the transaction fee. If an exact match is found, use it.
2. Add up all of the coins smaller than the amount to be sent. If they match exactly, use them.
3. If the sum of the smaller coins is smaller than the amount to be sent, then an exact match is impossible. In this case, use the smallest coin that is larger than the amount to be sent.
4. Run the knapsack selection algorithm:
    * Sort all coins that are smaller than the amount to be sent, in descending order.
    * Traverse the list of sorted coins, and choose whether to select each individual coin, where each coin has a 50% probability of being selected.
    * As each new coin is selected, determine whether the sum of the selected coins is greater than or equal to the amount to be sent. If yes, then a valid solution has been found. If, and only if, this is the best valid solution so far (defined as the solution that comes closest to the amount to be sent), save it.
    * Replace the last coin selected with a smaller coin. If, an only if, this results in the best solution so far, save it.
    * Continue to traverse the list, using various combinations of selected coins in search of a better solution than the best one found so far. Do this for up to 1000 iterations.
    * If no valid solution has been found after 1000 iterations, re-traverse the list of smaller coins, this time selecting all of them. Once again, save only the best solution.
    * Perform up to 1000 iterations of this second traversal. If we exclude edge cases, such as when a wallet contains more than 1000 coins, a valid solution will be found -- the sum of the smaller coins is larger than the amount to be sent.
  
Let's review the scenario from the previous section and apply the new coin selection algorithm.

Alice wants to send 0.5 XCH to Bob. In her wallet, she has:
- One coin worth 0.6 XCH
- One coin worth 0.3 XCH
- One coin worth 0.2 XCH

Under the new algorithm, Alice's wallet will:
1. Search for a single coin that matches. None are found.
2. Add up all of the smaller coins. An exact match is found (0.3 + 0.2 = 0.5), so use it.

Now let's say Alice wanted to include a transaction fee of 10 million mojos (0.00001 XCH). In this case, step 2 would fail to produce an exact match, so we would move to the next step:

3. The sum of all smaller coins is still smaller than the amount to be sent, so the coin worth 0.6 XCH would be used.

Let's look at a more complex example:

Alice wants to send 0.5 XCH to Bob. She will include a transaction fee of 0.00001 XCH. In her wallet, she has:
- One coin worth 0.6 XCH
- One coin worth 0.5 XCH
- One coin worth 0.4 XCH
- One coin worth 0.3 XCH
- One coin worth 0.2 XCH

Prior to version 1.4, the 0.6-XCH coin would have been selected. In versions 1.4 and later, the new algorithm is applied:
1. No single coin matches the amount plus the fee (0.50001).
2. The sum of the smaller coins is 0.5 + 0.4 + 0.3 + 0.2 = 1.4, which does not equal 0.50001.
3. The sum from step 2 is larger than the amount to be sent.
4. Let's say the following coin selections occur:
    * 0.5 - not selected
    * 0.4 - selected
    * 0.3 - selected
  
  At this point, we have a valid match: 0.4 + 0.3 > 0.50001. The final coin in Alice's wallet is worth 0.2 XCH. If this coin is selected, it will replace the coin worth 0.3 XCH, making the best match 0.4 + 0.2. If this coin is not selected, a better match will not be found.

This example shows two interesting facets of the new algorithm:
1. It is not always possible to predict which coins will be selected.
2. The best possible match is not guaranteed to be found.
 
#### Why use knapsack?

This algorithm is used in both Bitcoin Core and Chia's reference wallet because it provides a good balance between accuracy and computational intensity. It is also clearly superior in many cases.

Let's revisit the example from the top of this document:

Alice wants to create an offer to buy an NFT for 0.0001 XCH. In her wallet, she has:
- One coin worth 0.0001 XCH
- One coin worth 10 XCH

Under the old algorithm, the 10-XCH coin would have been selected and reserved for the offer. This would have left Alice with a spendable balance of 0.0001 XCH while the offer was pending.

Under the new algorithm, the 0.0001-XCH coin is selected and reserved. Alice still has 10 XCH available to spend.

Because of scenarios such as this, wallet developers in Chia's community are recommended to use the knapsack algorithm for coin selection.

For more information, see:
* A [blog](https://blog.summerofbitcoin.org/coin-selection-for-dummies-part-3/) explaining the knapsack algorithm
* The [technical details](https://murch.one/wp-content/uploads/2016/11/erhardt2016coinselection.pdf) of the knapsack algorithm used by Bitcoin Core, including edge cases not mentioned here
* The [source code](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/coin_selection.py) Chia uses for coin selection