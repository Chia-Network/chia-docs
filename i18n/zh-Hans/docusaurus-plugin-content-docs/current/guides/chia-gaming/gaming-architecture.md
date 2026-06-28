---
slug: /guides/gaming-architecture
title: Architecture
---

This document explains the architecture and core concepts of the Chia Gaming system. Understanding these concepts is essential for developers building games or integrating with the platform.

## System Overview

The Chia Gaming system enables trustless two-player games using **state channels** on the Chia blockchain. Players lock funds into a shared on-chain coin, play the game entirely off-chain (fast, free, private), and settle the result back on-chain when done.

The system consists of:

- **Player App**: Static HTML/JS/CSS/WASM application that runs entirely in the browser. Contains the WASM game engine, game UIs, and the code that talks to a blockchain interface.
- **Tracker**: A lobby and WebSocket relay service. Provides matchmaking and ferries game messages between peers. Trackers are third-party code; anyone can run one.
- **Chia wallet (live play)**: Connected via WalletConnect. The player app reads chain state and submits transactions through the wallet (for example `chia_getCoinRecordsByNames`, `chia_pushTransactions`). A full node on the same machine is not required for players; the wallet handles chain interaction.
- **Simulator (development)**: Optional local service (`chia-gaming-sim`, ports 5800/5801) used instead of WalletConnect when testing without real XCH. Configured in `front-end/src/settings.ts`.

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
- **Game coins**: Created when a game starts within the channel. Each is governed by a referee puzzle (Chialisp) for that game type; on-chain moves are validated against that puzzle if a dispute is forced.

## The Potato Protocol

The "potato" is a conceptual token that alternates between players, determining whose turn it is to act. The protocol ensures:

- Only one player can propose a state update at a time
- Each state update increments a sequence number
- Both players sign each state transition
- The latest signed state is always available for on-chain settlement

The name comes from "hot potato": you hold it when it's your turn, and pass it when you've made your move. The potato carries:

- The current game state
- The sequence number
- Signatures from both parties on the previous state
- The proposed next state (unsigned by the receiver until they accept)

## Referee Pattern

Each game type implements a **referee**: a Chialisp puzzle that can validate game moves on-chain. During normal play, the referee is never invoked because both players agree on the game state. However, if a dispute arises:

1. Either player posts the game state on-chain
2. The referee puzzle validates each subsequent move
3. After a timeout or game completion, the referee distributes funds

The referee ensures that even if the off-chain communication breaks down, the game can always be completed fairly, on-chain (albeit more slowly and at transaction cost).

### Game Handlers

Each game implements a **handler**: Rust code that manages the game logic off-chain. Handlers are responsible for:

- Validating incoming moves from the opponent
- Computing the next game state
- Generating the appropriate Chialisp evidence for on-chain validation (if needed)
- Managing game-specific state (cards, boards, scores)

The handler architecture allows new games to be added without modifying the core channel infrastructure.

## Connection Types

Per the connectivity model in the chia-gaming repository (`CONNECTIVITY.md`), the **blockchain itself is not a connection**; it is the ground truth. What you connect to in the player app are three operational axes plus session state:

| Axis    | Purpose                                                | How it is reached                                                             |
| ------- | ------------------------------------------------------ | ----------------------------------------------------------------------------- |
| Wallet  | Sign spends, read balances and coin records            | WalletConnect (live) or simulator (dev) |
| Tracker | Lobby UI (iframe) and message relay | WebSocket to the tracker you joined                                           |
| Peer    | Opponent game traffic                                  | Relayed over the tracker's WebSocket                                          |
| Session | In-progress channel obligation                         | Local state + on-chain coins; not a socket                                    |

### Session Rollover

Session state (channel progress, pairing token, and related data) is stored in browser `localStorage`. The **tracker** connection can auto-reconnect with backoff after transient outages (`CONNECTIVITY.md`). There is no guaranteed “reconnect to the same peer” after a hard disconnect; both players may need to re-match on a tracker. Clearing browser storage loses the session. Wallet disconnect stalls signing until the wallet is reconnected; the session obligation on-chain remains.

### Tracker Availability

The tracker is only required for:

- Initial matchmaking (creating/joining rooms)
- Relaying messages between peers during gameplay

It is **not** required for on-chain settlement. If the tracker disappears permanently, players can still close the channel on-chain using their locally-stored state.

## WalletConnect Integration

The player app communicates with the Chia wallet via WalletConnect using the `chia` namespace. The following methods are used:

| Method                       | Purpose                                                 |
| ---------------------------- | ------------------------------------------------------- |
| `chia_getWallets`            | List available wallets                                  |
| `chia_getWalletBalance`      | Check available balance                                 |
| `chia_getNextAddress`        | Get a receive address                                   |
| `chia_getHeightInfo`         | Get current blockchain height                           |
| `chia_selectCoins`           | Select coins for channel funding                        |
| `chia_createOfferForIds`     | Create offers (used in channel open) |
| `chia_pushTransactions`      | Push signed transactions to the mempool                 |
| `chia_createNewRemoteWallet` | Create a remote wallet for tracking channel coins       |
| `chia_registerRemoteCoins`   | Register channel coins for observation                  |
| `chia_getCoinRecordsByNames` | Look up specific coin records                           |
| `chia_getPuzzleAndSolution`  | Get puzzle/solution for spent coins                     |

### Channel open (handshake)

Opening a channel uses **one** on-chain spend bundle, but each wallet still goes through **several** WalletConnect steps during the A–F handshake (for example `chia_selectCoins`, two `chia_createOfferForIds` calls, one per player’s funding share, and `chia_pushTransactions`). Approve each request in the Chia wallet; a missing approval can make the handshake look stuck even though only one transaction is submitted on chain.

## Security Model

The security of the system rests on several guarantees:

1. **Unilateral close**: Either player can always close the channel on-chain
2. **Latest state wins**: Higher sequence numbers always supersede lower ones
3. **Timeout protection**: If one player disappears during an on-chain dispute, the other can claim funds after a timeout
4. **Tracker is a relay, not a co-signer**: The tracker ferries lobby and game messages; it does not hold channel keys or settle balances. Players still rely on signed off-chain state and on-chain puzzles for security.
5. **Wallet isolation**: The player app never has access to private keys; all signing happens in the wallet via WalletConnect

## Frontend Architecture

The frontend is split into two separately-deployed applications:

### Player App

- Fully static (HTML/JS/CSS/WASM): no server-side logic
- Contains the WASM game engine compiled from Rust
- Handles WalletConnect integration
- Manages game state in browser localStorage
- Loads the tracker's lobby UI in an iframe

### Tracker (Lobby + Relay)

- Express + WebSocket service
- Serves the lobby UI (room creation, matchmaking)
- Relays game messages between connected peers
- Loaded inside an iframe within the player app
- Must be on a **different origin** from the player app (security boundary)

This separation ensures that the tracker (which is third-party code) cannot access the player app's WalletConnect session or game state.
