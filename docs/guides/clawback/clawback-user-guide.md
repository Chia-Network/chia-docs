---
slug: /guides/clawback-user-guide
title: Clawback User Guide
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Intro

This document is a guide for using the clawback functionality introduced in version 1.8.2 of Chia's reference wallet. _Clawback_ is a new feature that offers protection against sending XCH to the wrong address.

If you are a developer or a CLI user, see the following resources for more info:
- [Clawback Primitive Guide](/guides/clawback-primitive-guide)
- [Clawback CLI Reference](/clawback-cli)
- [Youtube video explaining clawback](https://www.youtube.com/watch?v=_pC38ulU2js)

In order to use Chia clawbacks, you must have:
- Version 1.8.2 or later of Chia's reference light wallet or full node. See our [downloads page](https://www.chia.net/downloads/) to obtain a copy.
- A sufficient amount of XCH or TXCH to send a transaction and pay fees. If you do not have a sufficent amount, you can obtain some from our [mainnet](https://faucet.chia.net/) and [testnet](https://testnet10-faucet.chia.net/) faucets.

---

## Explanation

 _Clawback_ allows the sender of XCH to return funds to their wallet during a fixed window of time before the transaction can be completed.
 
 The following demonstrates an example workflow of this process:

 1. The sender sets up a 1-XCH transaction to the receiver's wallet, and adds a 10-minute clawback
 2. Instead of being sent directly to the receiver's wallet, the 1 XCH is sent to an intermediate location (see below for an explanation)
 3. For the next 10 minutes:
     * The sender and receiver both see the pending 1-XCH transaction in their wallets
     * The sender can choose to return the 1 XCH to his/her wallet (this is a _clawback_)
     * The receiver cannot yet claim the money
     * The sender and receiver could communicate off-chain. For example, the sender could call the receiver and ask if the pending transaction appears in their wallet.
       * If yes, then both parties can be confident that the money was sent to the correct address
       * If no, then the money was sent to an incorrect address, so the sender will claw it back
 4. After 10 minutes, if the sender has not clawed the 1 XCH back, the reciever can claim it
 5. After the receiver has claimed the money, it appears in both wallets as a normal transaction. At this point, the transaction is complete; clawback is no longer possible

The "intermediate location" is actually a coin with two rules:
1. Before a certain timestamp, only the sender can spend the coin
2. After the timestamp, the receiver can also spend the coin

Nobody else is allowed to spend the coin. It is not held in escrow by any third parties. It is a decentralized solution, created in Chialisp, that is one of many potential custody options in Chia.

This guide will show you how to perform the above workflow.

---

## Review Settings

Before initiating a clawback transaction, it's a good idea to review your wallet's settings. Click `Settings` (the gear icon in the lower-left corner of your wallet) and click the `CUSTODY` menu.

From this menu:
- The Sender wallet can enable clawback for all outgoing transactions
- The Receiver wallet can automatically claim all clawback transactions by adding a default transaction fee

For this tutorial, both of these settings will be disabled:

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/01.png"
        alt="Configure default settings"
    />
</div>

---

## Clawback

This section will show you how to initiate a transaction and claw it back.

From the `SEND` menu as shown below, enter the recipient's address, the amount to send, and an optional blockchain fee.

:::note

* Prior to initiating the transaction, the sender's wallet from this example contained 5 TXCH. The amount to be sent was 1 TXCH.
* This example was executed on Chia's testnet, which has higher fee requirements than mainnet. For this reason, a large fee of 100 million mojos was added.

:::

After you have entered these parameters, click the dropdown for `Add option to claw back transaction`.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/02.png"
        alt="Send XCH"
    />
</div>
<br />

---

Add the time (days, minutes, hours) during which the transaction will be able to be clawed back. In this case, we'll use 10 minutes.

Optionally add a memo to describe this transaction, and click `SEND`.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/03.png"
        alt="Set 10-minute clawback"
    />
</div>
<br />

---

The transaction has been added to the mempool. This means that it is still in the `Pending` state for inclusion on the blockchain. At this point, there is no indication in the GUI that this is a clawback transaction.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/04.png"
        alt="Wait for pending transaction"
    />
</div>
<br />

---

Eventually the clawback transaction will be confirmed on the blockchain. Note that the average time between transaction blocks is 52 seconds. Depending on how busy the mempool is, as well as the size of the included fee, confirmation could take much longer.

After the transaction has been confirmed, a green `CLAW BACK THIS TRANSACTION` button will appear. This means that the recipient can also see this transaction, but has yet to claim it. While the transaction is in this state, you can claw it back by clicking the button, which will be demonstrated next.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/05.png"
        alt="Claw back the transaction"
    />
</div>
<br />

---

The `clawback` action requires another on-chain transaction. Enter a transaction fee and click `CLAW BACK TRANSACTION` to claw it back.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/06.png"
        alt="Add fee and claw back"
    />
</div>
<br />

---

Just like the original transaction, the clawback will require some time to be confirmed on the blockchain.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/07.png"
        alt="Wait for funds to be returned"
    />
</div>
<br />

---

After the clawback has been confirmed, the pending amount is returned to the sender's wallet.

In this example, the wallet started with 5 TXCH. Because of the two transaction fees, it now contains 4.9998 TXCH.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/08.png"
        alt="Two tx fees have been withdrawn"
    />
</div>
<br />

At this point, the transation is final. The sender has the same amount of XCH they started with, minus the two transaction fees. Due to the clawback, the original "receiver" did not receive anything.

---

## Claim

This section will show you how to initiate a clawback transaction from the sender's wallet, and claim the transaction from the receiver's wallet.

:::note

To avoid confusion, the sender's wallet in this example uses a light theme, and the receiver's wallet uses a dark theme.

:::

Just like before, start by creating a new transaction and adding a clawback time and an optional memo. We'll use 10 minutes in this example.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/09.png"
        alt="Send a new clawback tx"
    />
</div>
<br />

---

After the initial transaction has been confirmed on the blockchain, the green `CLAW BACK THIS TRANSACTION` button will appear in the sender's wallet.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/10.png"
        alt="Wait for confirmation"
    />
</div>
<br />

---

The receiver's wallet will show a pending transaction, including the value, the amount of time before the transaction can be claimed, and the included memo.

:::note

* While the transaction is in this state, it does not show up in any of the `Balance` fields in the receiver's wallet. This is because the sender can still claw it back. The receiver should therefore not assume the amount will eventually be claimed.
* The timer showing how long until the transaction can be claimed does not begin counting down until the original transaction is confirmed on the blockchain.

:::

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/11.png"
        alt="Can claim in nine minutes"
    />
</div>
<br />

---

After the timer has expired, the receiver can claim the transaction. However, in this example, "auto claim" was disabled. Therefore, **the sender can still claw back the transaction, even though the timer has expired**. For this reason, it is a good idea for the receiver to enable "auto claim".

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/12.png"
        alt="Claw back still possible"
    />
</div>
<br />

---

If "auto claim" is disabled (as in this example), the receiver needs to click `CLAIM TRANSACTION` after the timer has expired.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/13.png"
        alt="Claim the transaction"
    />
</div>
<br />

---

Enter a transaction fee and optionally click the `Auto-claim` checkbox if desired. Finally, click `CLAIM TRANSACTION`.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/14.png"
        alt="Add fee and auto-claim"
    />
</div>
<br />

---

At this point, the `claim` has been submitted to the mempool, but it has yet to be confirmed on chain. As stated previously, the amount of time before the transaction is completed depends on the mempool and the fee.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/15.png"
        alt="Wait for pending claim tx"
    />
</div>
<br />

---

After the claim transaction has completed, it will appear as a normal transaction in the receiver's wallet. It will also appear in the `Total Balance` box.

At this point, the transaction is final. It can no longer be clawed back.

<div style={{ textAlign: 'center' }}>
    <img
        src="/img/clawback/16.png"
        alt="Claim is complete"
    />
</div>
<br />

---
