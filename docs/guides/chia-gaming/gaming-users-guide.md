---
slug: /guides/gaming-users-guide
title: Users Guide
---

:::important For Developers

This user guide is intended to help developers test their gaming implementations. **Chia Network Inc will not host a version of this for users to play.** Before following this guide, developers must install and set up the gaming system. See the [Developers Guide](/guides/gaming-developers-guide) for installation and setup instructions.

:::

## Intro

This guide walks through testing a Chia Gaming implementation with two players (Alice and Bob). The system uses coinset.org for blockchain data and WalletConnect for wallet transactions. Both services are required for gameplay.

:::note Handshaking Timing

Each transaction block takes approximately 1 minute. The handshake requires 2 on-chain transactions to be observed, so expect several minutes of waiting time. The handshake status will be displayed on-screen, and completion results in the screen changing to the game screen.

:::

## Player 1: Alice

1. **Visit the game server**: Navigate to the game server URL.

   <!-- ![WalletConnect Screen](/img/gaming/calpoker-walletConnect.png) -->
   _[Image placeholder: walletConnect Screen - calpoker-lobby.png]_

   _Screenshot from alpha - UI may change_

2. **Connect with WalletConnect**: Use WalletConnect to connect your Chia wallet to the game. For live WalletConnect testing, do not select "Simulator".

3. **Check Your Light Wallet**: You should see a "getWalletBalance" request in your Chia Light Wallet. Choose "remember this decision" and confirm the request.

4. **Start a New Room**: Create a new game room and copy the invitation URL.

   <!-- ![Lobby Screen](/img/gaming/calpoker-lobby.png) -->
   _[Image placeholder: Lobby Screen - calpoker-lobby.png]_

   _Screenshot from alpha - UI may change_

5. **Send the Invitation URL to Bob**: Share the room invitation URL with the second player (Bob).

## Player 2: Bob

1. **Paste URL**: Paste the invitation URL into a browser that does not share session state with Alice (e.g., another computer, or an incognito/private window).

2. **Wait for Handshake**: Wait until the handshake is complete. The handshake status will be displayed on-screen.

   <!-- ![Handshake in Progress](/img/gaming/calpoker-handshake.png) -->
   _[Image placeholder: Handshake in Progress - calpoker-handshake.png]_

   _Screenshot from alpha - UI may change_

   Once complete, the screen will automatically change to the game lobby screen.

:::warning Handshaking Time

Handshaking on-chain takes a long time. Before the game starts, 3 nodes (player wallet nodes and coinset.org) have to observe 2 on-chain transactions (in order). Each blockchain peak takes approximately 1 minute, so expect several minutes of waiting time. The lobby may take a several minutes to appear for Bob.

:::

:::warning Pending WalletConnect Requests

If the handshake seems to hang, check your Chia wallet for any pending WalletConnect requests. The wallet may have a request waiting for approval that needs to be confirmed before the handshake can proceed.

:::

## Gameplay

Once both players are connected and the handshake is complete, you can begin playing. The current release includes **[California Poker](/guides/gaming-california-poker-rules)**, with **[Space Poker](/guides/gaming-space-poker-rules)** and **[Krunk](/guides/gaming-krunk-rules)** coming in future releases.

## Game Completion

<!-- ![Game Completion](/img/gaming/calpoker-completion.png) -->
_[Image placeholder: Game Completion - calpoker-completion.png]_

_Screenshot from alpha - UI may change_

After a game completes, you'll see the results screen with options to start a new hand or end the session.

## Troubleshooting

For troubleshooting assistance, see the [Troubleshooting Guide](/guides/gaming-troubleshooting) which includes both developer and user-facing troubleshooting information.

## Known Issues

For a complete list of known issues, see the [Known Issues](/guides/gaming-known-issues) document.
