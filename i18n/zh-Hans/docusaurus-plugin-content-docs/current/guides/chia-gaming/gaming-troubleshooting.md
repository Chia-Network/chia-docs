---
slug: /guides/gaming-troubleshooting
title: Troubleshooting
---

<!-- Legacy anchors preserved for external links -->

<span id="developer-troubleshooting"></span> <span id="build-and-deployment-issues"></span> <span id="docker-build-fails"></span> <span id="containers-wont-start"></span> <span id="code-changes-not-reflecting"></span> <span id="configuration-issues"></span> <span id="walletconnect-connection-fails"></span> <span id="network-configuration-issues"></span> <span id="port-configuration-issues"></span> <span id="development-environment-issues"></span> <span id="simulator-not-working"></span> <span id="logs-not-appearing"></span> <span id="user-troubleshooting"></span> <span id="connection-issues"></span> <span id="gameplay-issues"></span> <span id="session-management-issues"></span> <span id="getting-additional-help"></span>

## Developer Troubleshooting

## Build Issues

### Rust / WASM

**`wasm-pack` not found or wrong version:**

```bash
cargo install wasm-pack --version 0.13.1
```

**WASM build fails with clang errors (macOS):**

```bash
brew install llvm
# Build scripts auto-detect Homebrew LLVM paths
```

**`wasm32-unknown-unknown` target not installed:**

```bash
rustup target add wasm32-unknown-unknown
```

### Node.js / pnpm

**`pnpm` not found or wrong version:**

```bash
corepack enable
corepack prepare pnpm@10.33.0 --activate
```

**`ERR_PNPM_IGNORED_BUILDS` warnings:**

This is harmless. Silence with:

```bash
cd front-end && pnpm approve-builds
cd lobby && pnpm approve-builds
```

**Node version too old:**

The project requires Node.js 20+. Check your version with `node --version`.

### Chialisp / Hex Files

**Missing `.hex` files:**

```bash
./tools/build-chialisp.sh
```

This recompiles all `.clsp` sources to `.hex` (same script used by `run-local-demo.sh` and `tools/build-deploy.sh`).

## Runtime Issues

### Simulator

**Simulator not responding on port 5800:**

```bash
# Build and run the simulator
cargo build --features sim-server --bin chia-gaming-sim
./target/debug/chia-gaming-sim
```

The simulator uses hardcoded ports: 5800 (HTTP) and 5801 (WebSocket). Ensure nothing else is using these ports.

**Port conflicts with tracker:**

The tracker defaults to port 5801 if `PORT` is not set, which conflicts with the simulator WebSocket port. Always set `PORT` explicitly:

From a **source checkout** (local demo):

```bash
PORT=3003 node lobby/lobby-service/dist/index-rollup.cjs --self 'http://localhost:3003' --dir ./lobby/lobby-frontend/serve
```

From an **Alpha 2 release zip** (`service.js` at the archive root):

```bash
PORT=3003 node service.js --self 'http://localhost:3003' --dir /path/to/extracted-lobby-archive
```

### Player App

**Blank page or JS errors:**

- Verify WASM files exist in `front-end/dist/` (`chia_gaming_wasm.js`, `chia_gaming_wasm_bg.wasm`)
- Verify `.hex` files exist in `clsp/` directories
- Check browser console for 404 errors on assets

**`build-meta.json` errors:**

The player app reads `build-meta.json` from the server root to determine the asset base path. If this file is missing or malformed, assets will fail to load. The `run-local-demo.sh` script generates this automatically.

### Tracker

**Tracker iframe not loading:**

- Verify the tracker is running on a **different origin** from the player app
- Check the browser console for CSP (Content Security Policy) errors
- Verify the `--self` flag matches the public URL of the tracker

**WebSocket connection failures:**

- Verify the tracker's `--self` URL is accessible from both players' browsers
- Check for firewall or proxy rules blocking WebSocket upgrades
- Ensure the tracker process is still running

## WalletConnect Issues

### Connection

**WalletConnect pairing fails:**

- Ensure the Chia wallet is **2.7.1 or later** (minimum)
- Check that the wallet's WalletConnect feature is enabled
- Try regenerating the pairing URI by refreshing the player app

**"No matching key" or namespace errors:**

The gaming system requires specific WalletConnect methods. Ensure your wallet supports the `chia` namespace with the required methods. See `front-end/src/constants/wallet-connect.ts` in the repository for the full list.

### During Gameplay

**Handshake hangs:**

1. Check your Chia wallet for pending approval requests
2. Confirm each wallet is connected, synced, and has no pending WalletConnect approvals
3. Check the browser console for WebSocket errors
4. Ensure both players are connected to the same tracker

**Transaction not confirming:**

- Each transaction block takes approximately 1 minute
- Channel opening uses one on-chain spend bundle; confirmation can take several minutes (about 1 minute per peak)
- If a transaction is stuck, check the mempool via your wallet

**Wallet disconnects mid-game:**

- Reconnect the wallet via WalletConnect; stalled operations resume when the wallet is back (`CONNECTIVITY.md`)
- Session data may remain in browser localStorage, but do not refresh the page during an active game
- If the session is abandoned, channel coins follow on-chain timeout rules (see [Known Issues](/guides/gaming-known-issues))

## User Troubleshooting

For documented limitations and workarounds, see [Known Issues](/guides/gaming-known-issues).

### Connection Issues

**Shutdown hangs or incomplete:**

- Both players should keep the browser open until shutdown completes
- Check each wallet for pending WalletConnect approvals

### Session Management Issues

**Lost session after refresh:**

- Sessions are not restored from the server; refreshing clears in-progress UI state
- Channel coins may remain on-chain until timeout if you abandon mid-game

### Firewall / Proxy

**WebSocket connections blocked:**

- Ensure your network allows WebSocket connections (HTTP Upgrade)
- If behind a corporate proxy, WebSocket traffic may be blocked
- The tracker uses standard HTTP ports; configure your proxy to allow WebSocket upgrades on the tracker's port

## Getting Additional Help

If you continue to experience issues after trying these troubleshooting steps:

1. **Check Known Issues**: Review the [Known Issues](/guides/gaming-known-issues) document for documented problems and workarounds.

2. **Review Documentation**:
   - [Developers Guide](/guides/gaming-developers-guide)
   - [Users Guide](/guides/gaming-users-guide)
   - [Architecture](/guides/gaming-architecture)

3. **Check Repository**: Review the [chia-gaming repository](https://github.com/Chia-Network/chia-gaming) for additional information and issue reports.

4. **Support**: For additional support, visit the [Gaming channel](https://discord.com/channels/1034523881404370984/1275119503273103381) in the official Chia Discord server.
