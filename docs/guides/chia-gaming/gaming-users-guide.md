---
slug: /guides/gaming-users-guide
title: Users Guide
---

:::important For Developers

This user guide is intended to help developers test their gaming implementations. **Chia Network Inc will not host a version of this for users to play.** Before following this guide, developers must install and set up the gaming system. See the [Developers Guide](/guides/gaming-developers-guide) for installation and setup instructions.

:::

:::note Session persistence

Game sessions are persisted in the browser (IndexedDB, with a few small preferences in localStorage). Reloading the player app should restore an in-progress session. Clearing site data, using a different browser profile, or choosing **Start Over** still abandons the local copy of that session. Channel coins on-chain are independent of the browser: if you abandon a live session, funds follow on-chain timeout and shutdown rules.

:::

## Intro

This guide walks through testing a Chia Gaming implementation with two players (Alice and Bob). For live testing, each player connects a Chia wallet (**2.7.1 or later**) via WalletConnect. The player app reads chain state and submits transactions through the wallet connection (see `front-end/src/hooks/RealBlockchainInterface.ts` in the chia-gaming repository). A **hub** service provides matchmaking and relays game messages between the two browsers.

:::note Network

Live WalletConnect play uses the network selected in the player app (**mainnet** or **testnet11**). Both players and both wallets must be on the same network. Use **Simulator** mode in the player app for development without real XCH.

:::

:::important Two players, two wallets

Live WalletConnect testing requires **two separate wallet installations** (for example two computers, or two user profiles each with its own wallet). You cannot run both players from the same wallet on one machine. See the [Developers Guide](/guides/gaming-developers-guide) testing section for details.

:::

:::note Handshaking Timing

Each peak (block) on mainnet takes approximately 1 minute. Opening a channel still lands as **one** on-chain funding transaction. During the A–F handshake each player signs their own funding half; each side then locally combines those halves and submits the assembled spend (see `OVERVIEW.md` in the chia-gaming repository). Each wallet must still approve **several** WalletConnect requests (coin selection, funding offers, and pushing the transaction), not just one prompt. Each wallet must see that transaction confirm and the channel reach **Active** before play begins, so expect several minutes of waiting. The UI shows handshake progress during this period.

:::

## Player 1: Alice

1. **Visit the player app**: Navigate to the player app URL (e.g. `http://localhost:3002` for local development).

2. **Connect a chain backend**: Use WalletConnect to connect a Chia wallet (2.7.1 or later), or select **Simulator** for local development. For live testing, do not select Simulator.

3. **Check Your Light Wallet** (live play): You should see a `chia_getWalletBalance` request in your Chia Light Wallet. Choose "remember this decision" and confirm the request.

4. **Set a transaction fee** (live play): In the player app Wallet tab, set **Transaction fee** (mojos or XCH). The default is **0**. On a busy mempool, a zero fee may not confirm. A nonzero fee below **100,000,000 mojos** is treated as zero and can be rejected; use `0` or at least that amount. Simulator play does not need a fee.

5. **Connect to a hub**: Enter the hub URL (e.g. `http://localhost:3003` for local development) and connect. The hub UI loads in an iframe. It finds opponents and relays messages; it cannot take funds or change game outcomes.

6. **Appear as available**: Once connected, Alice is listed for matchmaking on that hub.

## Player 2: Bob

1. **Open a separate browser**: Use a browser that does not share session state with Alice (e.g., another computer, or an incognito/private window).

2. **Connect a chain backend**: Simulator, or a **separate** Chia wallet (2.7.1 or later) via WalletConnect. Both players must use the same network (simulator, mainnet, or testnet11). For live play, set a **transaction fee** the same way as Alice.

3. **Connect to the same hub**: Enter the same hub URL Alice used.

4. **Challenge or accept**: One player challenges the other from the hub player list. Challenges include each player’s channel buy-in and channel/unroll timeouts (defaults are equal buy-ins and 15-block timeouts; timeouts must be in the 3–30 block range). The other player accepts or declines.

5. **Consent and handshake**: The player app shows a consent step, then the on-chain handshake. Wait until the channel is **Active**.

:::warning Handshaking Time

Handshaking on-chain takes a long time. Before the game starts, the channel-creation transaction must confirm and both wallets must see the channel become **Active**. Each peak takes approximately 1 minute, so expect several minutes of waiting.

:::

:::warning Pending WalletConnect Requests

If the handshake seems to hang, check your Chia wallet for any pending WalletConnect requests. The wallet may have a request waiting for approval that needs to be confirmed before the handshake can proceed.

:::

## Gameplay

Once the channel is **Active**, propose and play hands in the player app. Beta includes **[California Poker](/guides/gaming-california-poker-rules)** (CalPoker), **[Space Poker](/guides/gaming-space-poker-rules)**, and **[Krunk](/guides/gaming-krunk-rules)**. On-chain Chialisp, rules, and UI may still change.

Buy-ins can be equal or different per player. The per-hand stake is derived from the channel contributions (the UI uses the minimum of the two contributions as the default per-hand stake).

## Game Completion

After a game completes, you'll see the results screen with options to start a new hand or end the session. Clean shutdown returns channel funds when both players cooperate and keep the app open until shutdown finishes.

## Troubleshooting

For troubleshooting assistance, see the [Troubleshooting Guide](/guides/gaming-troubleshooting) which includes both developer and user-facing troubleshooting information.

## Known Issues

For a complete list of known issues, see the [Known Issues](/guides/gaming-known-issues) document.
