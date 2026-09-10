---
slug: /guides/gaming-architecture
title: Architecture
---

This document explains the architecture and core concepts of the Chia Gaming system. Understanding these concepts is essential for developers building games or integrating with the platform.

## System Overview

The Chia Gaming system enables trustless two-player games using **state channels** on the Chia blockchain. Players lock funds into a shared on-chain coin, play the game entirely off-chain (fast, free, private), and settle the result back on-chain when done.

The system consists of:

- **Player App**: Static HTML/JS/CSS/WASM application that runs entirely in the browser (or Electron). Contains the WASM game engine, game UIs, and the code that talks to a blockchain interface.
- **Hub**: Matchmaking UI and WebSocket relay. Provides a player list and challenges, and ferries game messages between peers. Hubs are third-party code; anyone can run one.
- **Chia wallet (live play)**: Connected via WalletConnect. The player app reads chain state and submits transactions through the wallet (for example `chia_getCoinRecordsByNames`, `chia_pushTransactions`). A full node on the same machine is not required for players; the wallet handles chain interaction.
- **Simulator (development)**: Optional local service (`chia-gaming-sim`, port 5800: HTTP `/health` and WebSocket `/ws`) used instead of WalletConnect when testing without real XCH. Configured in `front-end/src/settings.ts`.

## State Channels

A state channel is a mechanism that allows two parties to transact off-chain while retaining on-chain security guarantees. The general flow is:

1. **Open**: Both players fund a shared on-chain coin (the "channel coin")
2. **Play**: Game moves happen off-chain, with each state update signed by both parties
3. **Close**: The final state is settled on-chain, distributing funds according to the game outcome

The key insight is that either party can unilaterally close the channel at any time by posting the latest agreed-upon state to the blockchain. This means neither player needs to trust the other; if one party disappears or misbehaves, the other can always recover their funds.

## Coin Hierarchy

The on-chain state is represented by a hierarchy of coins (simplified; see `OVERVIEW.md` in the chia-gaming repository for the full tree including per-player funding coins and the launcher):

```
Funding coins (one per player) → launcher → Channel Coin
    → Unroll Coin → reward coins and/or Game Coins (referee puzzle)
```

- **Channel Coin**: Holds the channel funds after the handshake. Controlled by a 2-of-2 aggregate key; off-chain play updates signed unroll commitments without moving the channel coin until shutdown or dispute.
- **Unroll Coin**: Represents the latest mutually-agreed state with a sequence number. A higher sequence number preempts a lower one during dispute resolution.
- **Game coins**: Created when a game is forced on-chain. Each is governed by a referee puzzle (Chialisp) for that game type; on-chain moves are validated against that puzzle if a dispute is forced.

## The Potato Protocol

The "potato" is a conceptual token that alternates between players, determining whose turn it is to act. The protocol ensures:

- Only one player can propose a state update at a time
- Each state update increments a sequence number
- Both players sign each state transition
- The latest signed state is always available for on-chain settlement

The name comes from "hot potato": you hold it when it's your turn, and pass it when you've made your move. Each potato pass is a batch of game actions plus half-signatures over the new unroll commitment. See `OVERVIEW.md` in the chia-gaming repository for the batch protocol, handshake (messages A–F), and handler phases.

## Referee Pattern

Each game type implements a **referee**: a Chialisp puzzle that can validate game moves on-chain. During normal play, the referee is never invoked because both players agree on the game state. However, if a dispute arises:

1. Either player posts the game state on-chain
2. The referee puzzle validates each subsequent move
3. After a timeout or game completion, the referee distributes funds

The referee ensures that even if the off-chain communication breaks down, the game can always be completed fairly, on-chain (albeit more slowly and at transaction cost).

<!-- Legacy anchors preserved for external links -->
<span id="game-handlers"></span>

### Game packages

Each game is a **package** under `games/<key>/` with CLVM rules (`clsp/`), a TypeScript/React UI (`ui/`), and optional Rust tests. Packages register in `games/registry.json`. Off-chain **handlers** and on-chain **validators** are Chialisp programs inside the package; the Rust host (`src/session_phases/`, `src/channel_state/`, `src/referee/`) runs the channel, potato, and referee without game-specific presentation logic.

To add a game, follow [`GAME_WRITING_GUIDE.md`](https://github.com/Chia-Network/chia-gaming/blob/main/GAME_WRITING_GUIDE.md). Handler calling conventions are in [`HANDLER_GUIDE.md`](https://github.com/Chia-Network/chia-gaming/blob/main/HANDLER_GUIDE.md) and `clsp/handler_api.md`.

## Connection Types

Per the connectivity model in the chia-gaming repository (`CONNECTIVITY.md`), the **blockchain itself is not a connection**; it is the ground truth. What you connect to in the player app are three operational axes plus session state:

| Axis    | Purpose                                     | How it is reached                          |
| ------- | ------------------------------------------- | ------------------------------------------ |
| Wallet  | Sign spends, read balances and coin records | WalletConnect (live) or simulator (dev)    |
| Hub     | Matchmaking UI (iframe) and message relay   | WebSocket to the hub you joined            |
| Peer    | Opponent game traffic                       | Relayed over the hub's WebSocket           |
| Session | In-progress channel obligation              | Local state + on-chain coins; not a socket |

### Session Rollover

Durable session state is stored in **IndexedDB** (one complete session record). localStorage holds only small preferences (for example hub URL and network). A page reload is supposed to restore the session; the player app treats reload like a dropped remote connection and reconnects the wallet and hub.

The **hub** connection auto-reconnects with backoff after transient outages (`CONNECTIVITY.md`). Peer traffic rides on the hub WebSocket: if the hub is down, the peer is down. Transient hub or peer loss degrades the session (yellow “pings look stuck”) rather than automatically going on-chain; the player can reconnect or choose **Go on-chain**. Clearing site data loses the local session; the on-chain obligation remains until shutdown or timeout. Wallet disconnect stalls signing until the wallet is reconnected.

<span id="tracker-availability"></span>

### Hub Availability

The hub is only required for:

- Initial matchmaking (player list and challenges)
- Relaying messages between peers during gameplay

It is **not** required for on-chain settlement. If the hub disappears permanently, players can still close the channel on-chain using their locally stored state.

## WalletConnect Integration

The player app communicates with the Chia wallet via WalletConnect using the `chia` namespace. The following methods are used:

| Method                       | Purpose                                           |
| ---------------------------- | ------------------------------------------------- |
| `chia_getWallets`            | List available wallets                            |
| `chia_getWalletBalance`      | Check available balance                           |
| `chia_getNextAddress`        | Get a receive address                             |
| `chia_getHeightInfo`         | Get current blockchain height                     |
| `chia_selectCoins`           | Select coins for channel funding                  |
| `chia_createOfferForIds`     | Create offers (used in channel open)              |
| `chia_pushTransactions`      | Push signed transactions to the mempool           |
| `chia_createNewRemoteWallet` | Create a remote wallet for tracking channel coins |
| `chia_registerRemoteCoins`   | Register channel coins for observation            |
| `chia_getCoinRecordsByNames` | Look up specific coin records                     |
| `chia_getPuzzleAndSolution`  | Get puzzle/solution for spent coins               |
| `chia_getFullNodePeerCount`  | Wallet peer-count check                           |

### Channel open (handshake)

Opening a channel still lands as **one** on-chain funding transaction, but each wallet goes through **several** WalletConnect steps during the A–F handshake (for example `chia_selectCoins`, `chia_createOfferForIds` for that player’s funding share, and `chia_pushTransactions`). Handshake F is only the receiver’s acceptance; each player locally combines the E and F halves, validates the result, and submits the assembled spend. Approve each request in the Chia wallet; a missing approval can make the handshake look stuck even though only one transaction is submitted on chain.

## Security Model

The security of the system rests on several guarantees:

1. **Unilateral close**: Either player can always close the channel on-chain
2. **Latest state wins**: Higher sequence numbers always supersede lower ones
3. **Timeout protection**: If one player disappears during an on-chain dispute, the other can claim funds after a timeout
4. **Hub is a relay, not a co-signer**: The hub ferries matchmaking and game messages; it does not hold channel keys or settle balances. Players still rely on signed off-chain state and on-chain puzzles for security.
5. **Wallet isolation**: The player app never has access to private keys; all signing happens in the wallet via WalletConnect

## Frontend Architecture

The frontend is split into two separately-deployed applications:

### Player App

- Fully static (HTML/JS/CSS/WASM): no server-side logic
- Contains the WASM game engine compiled from Rust
- Handles WalletConnect integration
- Persists durable session state in IndexedDB
- Loads the hub's matchmaking UI in an iframe

<span id="tracker-lobby--relay"></span>

### Hub (Matchmaking + Relay)

- Express + WebSocket service
- Serves the hub UI (player list, challenges, optional different buy-ins per player)
- Relays game messages between connected peers
- Loaded inside an iframe within the player app
- Must be on a **different origin** from the player app (security boundary)

This separation ensures that the hub (which is third-party code) cannot access the player app's WalletConnect session or game state.
