---
slug: /guides/gaming-known-issues
title: Known Issues
---

:::warning Alpha Release

This is an **alpha release**. Expect issues and breaking changes. The following known issues are being tracked and worked on.

:::

:::tip Troubleshooting

For steps to resolve common problems, see the [Troubleshooting Guide](/guides/gaming-troubleshooting).

:::

<!-- Legacy anchors preserved for external links -->

<span id="developer-issues"></span> <span id="common-setup-issues"></span> <span id="easy-developer-configuration-not-available"></span> <span id="user-facing-issues"></span> <span id="uiux-issues"></span> <span id="gameplay-issues"></span> <span id="performance-issues"></span>

## Game Availability

**California Poker (CalPoker)** and **Space Poker** are available in Alpha 2 as early releases. On-chain Chialisp, rules, and UI for both games are still undergoing changes.

**Krunk** is coming soon.

## Developer Issues

### Easy Developer Configuration Not Available

The config-directory workflow described in older material is not available. Network, WalletConnect, and port settings are updated in the codebase. See the [Manual Configuration](/guides/gaming-developers-guide#manual-configuration) section in the Developers Guide.

### WASM Build Failures on macOS

**Problem**: WASM builds may fail with clang-related errors on macOS.

**Workaround**: Install Homebrew LLVM (`brew install llvm`). Build scripts detect Homebrew LLVM paths automatically. See the [Developers Guide](/guides/gaming-developers-guide) prerequisites.

### `ERR_PNPM_IGNORED_BUILDS` Warning

**Problem**: During `pnpm install` you may see warnings about ignored build scripts for `@parcel/watcher` and `esbuild`.

**Impact**: This is harmless. Those packages ship pre-built native binaries as fallbacks, so the build completes without running those scripts.

**Resolution**: Run `pnpm approve-builds` once in `front-end/` or `lobby/` and commit the updated `.pnpm-approve-builds` file to silence the warning. The lobby build in `tools/build-deploy.sh` also uses `pnpm install --ignore-scripts` in `lobby/` for the same reason.

## User-Facing Issues

### "Generate Room" button contrast (fixed in Alpha 2)

**Status:** **Fixed in Alpha 2.** Earlier builds used low-contrast styling for the Generate Room control.

### Handshake progress feedback (fixed in Alpha 2)

**Status:** **Fixed in Alpha 2.** The UI now shows clearer progress during the handshake and channel-confirmation phases.

### Funds left on-chain after shutdown (fixed in Alpha 2)

**Status:** **Fixed in Alpha 2.** Older alpha builds could leave one game stake on-chain after ending a live WalletConnect session. Current Alpha 2 builds return channel funds on shutdown. If you still see stranded coins, confirm you are on an Alpha 2 build and not an older artifact.

- **Keep browsers open until shutdown completes**: Both players should keep the browser open until cooperative shutdown finishes. Closing early can interrupt the shutdown flow.
- **Chia Wallet does not come to the foreground for WalletConnect**: When the wallet needs approval, you may need to switch to the wallet app manually.

### Session Persistence

**Problem**: Game sessions are stored in browser localStorage. Refreshing the page or clearing browser data loses the session.

**Impact**: If a session is lost mid-game, channel coins remain on-chain until timeout. Funds are not necessarily lost permanently, but coins may be locked until the timeout expires.

**Workaround**: Do not refresh or clear browser data during active games.

### Handshake Timing

**Problem**: Opening a channel requires one on-chain spend bundle to confirm; both wallets must see the channel reach **Active**, which takes several minutes on mainnet (~1 minute per peak). During the handshake, each wallet must also approve **several** WalletConnect requests (`chia_selectCoins`, `chia_createOfferForIds`, and `chia_pushTransactions`), not a single tap.

**Impact**: Player 2 may wait a long time before the lobby appears. This is expected for on-chain handshakes. If progress stalls, check both wallets for pending approvals.

### Pending WalletConnect Requests

**Problem**: The Chia wallet may have pending WalletConnect requests that are not immediately visible, so the handshake or gameplay can appear stuck.

**Workaround**: Check the Chia wallet application for pending approval requests.

### Tracker WebSocket Relay

**Problem**: Game messages are relayed through the tracker WebSocket. If that connection drops for an extended time, play stalls.

**Impact**: Brief outages may recover via tracker auto-reconnect; a lost peer pairing may require re-matching on the tracker (see `CONNECTIVITY.md` in the chia-gaming repository).
