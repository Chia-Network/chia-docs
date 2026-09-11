---
slug: /guides/gaming-troubleshooting
title: Troubleshooting
---

<!-- Legacy anchors preserved for external links -->

<span id="developer-troubleshooting"></span>
<span id="build-and-deployment-issues"></span>
<span id="docker-build-fails"></span>
<span id="containers-wont-start"></span>
<span id="code-changes-not-reflecting"></span>
<span id="configuration-issues"></span>
<span id="walletconnect-connection-fails"></span>
<span id="network-configuration-issues"></span>
<span id="port-configuration-issues"></span>
<span id="development-environment-issues"></span>
<span id="simulator-not-working"></span>
<span id="logs-not-appearing"></span>
<span id="user-troubleshooting"></span>
<span id="connection-issues"></span>
<span id="gameplay-issues"></span>
<span id="session-management-issues"></span>
<span id="getting-additional-help"></span>

## Developer Troubleshooting

## Build Issues

### Rust / WASM

**`wasm-pack` not found or wrong version:**

```bash
cargo install wasm-pack --version 0.15.0
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
cd hub && pnpm approve-builds
```

**Node version too old:**

The project requires Node.js 22+. Check your version with `node --version`.

### Chialisp / Hex Files

**Missing compiled CLVM artifacts:**

```bash
./tools/build-chialisp.sh
```

This recompiles all `.clsp` sources (same script used by `run-local-demo.sh` and `tools/build-deploy.sh`). The compiler emits `.hex` and then `.clvm.bin` runtime artifacts.

## Runtime Issues

### Simulator

**Simulator not responding on port 5800:**

```bash
# Build and run the simulator
cargo build --features sim-server --bin chia-gaming-sim
./target/debug/chia-gaming-sim
```

The simulator uses a **single** port: 5800 for HTTP (`GET|POST /health`) and WebSocket (`/ws`). Ensure nothing else is using this port.

**Port conflicts with hub:**

The hub defaults to port 5801 if `PORT` is not set. Always set `PORT` explicitly:

From a **source checkout** (local demo):

```bash
PORT=3003 node hub/hub-service/dist/index-rollup.cjs --self 'http://localhost:3003' --dir ./hub/hub-frontend/serve
```

From a **release zip** (`service.js` at the archive root):

```bash
PORT=3003 node service.js --self 'http://localhost:3003' --dir /path/to/extracted-hub-archive
```

### Player App

**Blank page or JS errors:**

- Verify WASM files exist in `front-end/dist/` (`chia_gaming_wasm.js`, `chia_gaming_wasm_bg.wasm`)
- Verify Chialisp build artifacts exist (run `./tools/build-chialisp.sh`)
- Check browser console for 404 errors on assets

**`build-meta.json` errors:**

The player app reads `build-meta.json` from the server root to determine the asset base path. If this file is missing or malformed, assets will fail to load. The `run-local-demo.sh` script generates this automatically.

<span id="tracker"></span>

### Hub

**Hub iframe not loading:**

- Verify the hub is running on a **different origin** from the player app
- Check the browser console for CSP (Content Security Policy) errors
- Verify the `--self` flag matches the public URL of the hub

**WebSocket connection failures:**

- Verify the hub's `--self` URL is accessible from both players' browsers
- Check for firewall or proxy rules blocking WebSocket upgrades
- Ensure the hub process is still running

## WalletConnect Issues

### Connection

**WalletConnect pairing fails:**

- Ensure the Chia wallet is **2.7.1 or later** (minimum)
- Check that the wallet's WalletConnect feature is enabled
- Confirm the player-app network setting matches the wallet (mainnet or testnet11)
- Try regenerating the pairing URI by refreshing the player app

**"No matching key" or namespace errors:**

The gaming system requires specific WalletConnect methods. Ensure your wallet supports the `chia` namespace with the required methods. See `front-end/src/constants/wallet-connect.ts` in the repository for the full list.

### During Gameplay

**Handshake hangs:**

1. Check your Chia wallet for pending approval requests
2. Confirm each wallet is connected, synced, and has no pending WalletConnect approvals
3. Check the browser console for WebSocket errors
4. Ensure both players are connected to the same hub and the same network

**Transaction not confirming:**

- Each transaction block takes approximately 1 minute
- Channel opening uses one on-chain spend bundle; confirmation can take several minutes (about 1 minute per peak)
- For live WalletConnect play, check the **Transaction fee** in the player app Wallet tab. Default is 0. A nonzero fee below 100,000,000 mojos is treated as zero and can be rejected (`INVALID_FEE_TOO_CLOSE_TO_ZERO`)
- If a transaction is stuck, check the mempool via your wallet

**Wallet disconnects mid-game:**

- Reconnect the wallet via WalletConnect; stalled operations resume when the wallet is back (`CONNECTIVITY.md`)
- Session data remains in IndexedDB across a page reload; do not clear site data during an active session
- If the session is abandoned, channel coins follow on-chain timeout rules (see [Known Issues](/guides/gaming-known-issues))

## User Troubleshooting

For documented limitations and workarounds, see [Known Issues](/guides/gaming-known-issues).

### Connection Issues

**Shutdown hangs or incomplete:**

- Both players should keep the app open until shutdown completes
- Check each wallet for pending WalletConnect approvals

### Session Management Issues

**Resume / Start Over after reload:**

- A normal reload should restore the session from IndexedDB
- If the Resume / Start Over dialog appears, choose **Resume** unless you intend to abandon the local copy
- Clearing site data cannot be undone from the server; channel coins may remain on-chain until timeout if you abandon mid-game

### Firewall / Proxy

**WebSocket connections blocked:**

- Ensure your network allows WebSocket connections (HTTP Upgrade)
- If behind a corporate proxy, WebSocket traffic may be blocked
- The hub uses standard HTTP ports; configure your proxy to allow WebSocket upgrades on the hub's port

## Getting Additional Help

If you continue to experience issues after trying these troubleshooting steps:

1. **Check Known Issues**: Review the [Known Issues](/guides/gaming-known-issues) document for documented problems and workarounds.

2. **Review Documentation**:
   - [Developers Guide](/guides/gaming-developers-guide)
   - [Users Guide](/guides/gaming-users-guide)
   - [Architecture](/guides/gaming-architecture)

3. **Check Repository**: Review the [chia-gaming repository](https://github.com/Chia-Network/chia-gaming) for additional information and issue reports.

4. **Support**: For additional support, visit the [Gaming channel](https://discord.com/channels/1034523881404370984/1275119503273103381) in the official Chia Discord server.
