---
slug: /guides/gaming-users-guide
title: Users Guide
---

:::important For Developers

This user guide is intended to help developers test their gaming implementations. **Chia Network Inc will not host a version of this for users to play.** Before following this guide, developers must install and set up the gaming system. See the [Developers Guide](/guides/gaming-developers-guide) for installation and setup instructions.

:::

:::warning Session Persistence

**Game sessions are not saved.** If you refresh your browser or clear browser storage (localStorage, cache, etc.), your game session will be lost and you will need to create a new session. Do not refresh your browser or clear browser data while a game is in progress.

:::

:::note Funds on shutdown (Alpha 2)

**Fixed in Alpha 2:** Earlier alpha builds could leave one stake worth of funds on-chain after a live WalletConnect session shut down. Alpha 2 returns channel funds on shutdown. If you test an older build, use the simulator for development until you are on Alpha 2.

:::

## Intro

This guide walks through testing a Chia Gaming implementation with two players (Alice and Bob). For live testing, each player connects a Chia wallet (**2.7.1 or later**; required minimum for Alpha 2) via WalletConnect. The player app reads chain state and submits transactions through the wallet connection (see `front-end/src/hooks/RealBlockchainInterface.ts` in the chia-gaming repository). A tracker service relays lobby and game messages between the two browsers.

:::important Two players, two wallets

Live WalletConnect testing requires **two separate wallet installations** (for example two computers, or two user profiles each with its own wallet). You cannot run both players from the same wallet on one machine. See the [Developers Guide](/guides/gaming-developers-guide) testing section for details.

:::

:::note Handshaking Timing

Each peak (block) on mainnet takes approximately 1 minute. Opening a channel uses **one** on-chain spend bundle (both players co-sign the combined funding transaction during the A–F handshake; see `OVERVIEW.md` in the chia-gaming repository). Each wallet must see that transaction confirm and the channel reach **Active** before play begins, so expect several minutes of waiting. The UI shows handshake progress during this period.

:::

## Player 1: Alice

1. **Visit the player app**: Navigate to the player app URL (e.g. `http://localhost:3002` for local development).

2. **Connect with WalletConnect**: Use WalletConnect to connect a Chia wallet (2.7.1 or later) to the game. For live WalletConnect testing, do not select "Simulator".

3. **Check Your Light Wallet**: You should see a "getWalletBalance" request in your Chia Light Wallet. Choose "remember this decision" and confirm the request.

4. **Start a New Room**: Create a new game room and copy the invitation URL.

5. **Send the Invitation URL to Bob**: Share the room invitation URL with the second player (Bob).

## Player 2: Bob

1. **Paste URL**: Paste the invitation URL into a browser that does not share session state with Alice (e.g., another computer, or an incognito/private window).

2. **Connect Wallet**: Connect your separate Chia wallet (2.7.1 or later) via WalletConnect.

3. **Wait for Handshake**: Wait until the handshake is complete. The handshake status will be displayed on-screen.

   Once complete, the screen will automatically change to the game lobby screen.

:::warning Handshaking Time

Handshaking on-chain takes a long time. Before the game starts, the channel-creation transaction must confirm and both wallets must see the channel become **Active**. Each peak takes approximately 1 minute, so expect several minutes of waiting. The lobby may take several minutes to appear for Bob.

:::

:::warning Pending WalletConnect Requests

If the handshake seems to hang, check your Chia wallet for any pending WalletConnect requests. The wallet may have a request waiting for approval that needs to be confirmed before the handshake can proceed.

:::

## Gameplay

Once both players are connected and the handshake is complete, choose a game in the lobby. Alpha 2 includes **[California Poker](/guides/gaming-california-poker-rules)** (CalPoker) and **[Space Poker](/guides/gaming-space-poker-rules)** as early releases—on-chain Chialisp, rules, and UI for both may still change. **[Krunk](/guides/gaming-krunk-rules)** is coming soon.

## Game Completion

After a game completes, you'll see the results screen with options to start a new hand or end the session.

## Troubleshooting

For troubleshooting assistance, see the [Troubleshooting Guide](/guides/gaming-troubleshooting) which includes both developer and user-facing troubleshooting information.

## Known Issues

For a complete list of known issues, see the [Known Issues](/guides/gaming-known-issues) document.
