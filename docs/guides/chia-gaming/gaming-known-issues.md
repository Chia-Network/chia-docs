---
slug: /guides/gaming-known-issues
title: Known Issues
---

:::warning Beta Release

This is a **beta**. Expect issues and breaking changes. The following known issues are being tracked and worked on.

:::

:::tip Troubleshooting

For steps to resolve common problems, see the [Troubleshooting Guide](/guides/gaming-troubleshooting).

:::

<!-- Legacy anchors preserved for external links -->

<span id="developer-issues"></span>
<span id="common-setup-issues"></span>
<span id="easy-developer-configuration-not-available"></span>
<span id="user-facing-issues"></span>
<span id="uiux-issues"></span>
<span id="gameplay-issues"></span>
<span id="performance-issues"></span>

## Game Availability

**California Poker (CalPoker)**, **Space Poker**, and **Krunk** are available as beta reference games. On-chain Chialisp, rules, and UI are still undergoing changes.

## Developer Issues

### Easy Developer Configuration Not Available

The config-directory workflow described in older material is not available. Network, WalletConnect, and port settings are updated in the codebase. See the [Manual Configuration](/guides/gaming-developers-guide#manual-configuration) section in the Developers Guide.

### WASM Build Failures on macOS

**Problem**: WASM builds may fail with clang-related errors on macOS.

**Workaround**: Install Homebrew LLVM (`brew install llvm`). Build scripts detect Homebrew LLVM paths automatically. See the [Developers Guide](/guides/gaming-developers-guide) prerequisites.

### `ERR_PNPM_IGNORED_BUILDS` Warning

**Problem**: During `pnpm install` you may see warnings about ignored build scripts for `@parcel/watcher` and `esbuild`.

**Impact**: This is harmless. Those packages ship pre-built native binaries as fallbacks, so the build completes without running those scripts.

**Resolution**: Run `pnpm approve-builds` once in the relevant package directory (`front-end/` or `hub/`) and commit the updated `.pnpm-approve-builds` file to silence the warning.

## User-Facing Issues

### "Generate Room" button contrast (fixed in Alpha 2)

**Status:** Fixed. Matchmaking no longer uses a Generate Room control; players connect to a hub and challenge from the player list.

### Handshake progress feedback (fixed in Alpha 2)

**Status:** Fixed. The UI shows progress during the handshake and channel-confirmation phases.

### Funds left on-chain after shutdown (fixed in Alpha 2)

**Status:** Fixed. Current builds return channel funds on cooperative shutdown. Both players should keep the app open until shutdown finishes.

### Handshake Timing

**Problem**: Opening a channel requires one on-chain spend bundle to confirm; both wallets must see the channel reach **Active**, which takes several minutes on mainnet (~1 minute per peak). During the handshake, each wallet must also approve **several** WalletConnect requests (`chia_selectCoins`, `chia_createOfferForIds`, `chia_sendTransaction` when a fee is set, and `chia_pushTransactions`), not a single tap.

**Impact**: The challenged player may wait a long time before the channel is playable. This is expected for on-chain handshakes. If progress stalls, check both wallets for pending approvals.

### Pending WalletConnect Requests

**Problem**: The Chia wallet may have pending WalletConnect requests that are not immediately visible, so the handshake or gameplay can appear stuck.

**Workaround**: Check the Chia wallet application for pending approval requests. The Chia Wallet may not come to the foreground for WalletConnect; switch to the wallet app manually when approval is needed.

### Session Persistence

**Problem**: Durable session state lives in IndexedDB (plus small preferences in localStorage). Clearing site data, using another profile, or choosing **Start Over** drops the local session.

**Impact**: Channel coins remain on-chain until timeout or shutdown. Funds are not necessarily lost permanently, but they can stay locked until the protocol resolves.

**Workaround**: Do not clear site data during an active session. A normal page reload should restore the session; if the Resume / Start Over dialog appears, choose Resume unless you intend to abandon the local copy.

<span id="tracker-websocket-relay"></span>

### Hub WebSocket Relay

**Problem**: Game messages are relayed through the hub WebSocket. If that connection drops for an extended time, play stalls. Peer traffic requires the hub.

**Impact**: Brief outages may recover via hub auto-reconnect and show a yellow “pings look stuck” state. That does **not** automatically move the session on-chain; the player can wait for reconnect or choose **Go on-chain** (see `CONNECTIVITY.md` in the chia-gaming repository).

### Shutdown Interrupted

**Problem**: Closing the browser during cooperative shutdown can interrupt the shutdown flow.

**Workaround**: Both players should keep the app open until cooperative shutdown finishes.
