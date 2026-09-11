---
slug: /guides/gaming-developers-guide
title: Developers Guide
---

:::warning Beta Release

This is a **beta** of the Chia Gaming system. Wire formats, persistence, and APIs can still change. Use this system for development and testing.

:::

<!-- Legacy anchors preserved for external links -->

<span id="setup-and-build"></span>
<span id="running-individual-services"></span>
<span id="ports-and-domain-updates"></span>

## Intro

This guide covers development, testing, and deployment for the Chia Gaming system. The system consists of two deployable artifacts:

1. **Player App**: A fully static HTML/JS/CSS/WASM application that players run in their browser (or in the Electron desktop shell). It contains the wallet connection, WASM game engine, and all game UIs. No server-side logic, no cookies, no server-side sessions.
2. **Hub**: A separate service that provides matchmaking UI (loaded as an iframe inside the player app) and a WebSocket relay that ferries game messages between peers. Hubs are third-party code; anyone can run one.

To follow this guide, you will need:

- Linux, macOS, or Windows with Git Bash / WSL (the local demo scripts are bash)
- Rust (stable; pinned in the repo’s `rust-toolchain.toml`) with the `wasm32-unknown-unknown` target
- Node.js 22+ and pnpm 10.33
- wasm-pack 0.15.0
- Chia wallet **2.7.1 or later** (required minimum for live WalletConnect; earlier wallet versions are not supported)
- Access to the [chia-gaming repository](https://github.com/Chia-Network/chia-gaming)

:::note Reference games

**California Poker**, **Space Poker**, and **Krunk** are the beta reference games. On-chain Chialisp, rules, and UI may still change.

:::

For game rules and mechanics, see:

- [California Poker Rules](/guides/gaming-california-poker-rules)
- [Space Poker Rules](/guides/gaming-space-poker-rules)
- [Krunk Rules](/guides/gaming-krunk-rules)

To add a game, start from [`GAME_WRITING_GUIDE.md`](https://github.com/Chia-Network/chia-gaming/blob/main/GAME_WRITING_GUIDE.md) in the chia-gaming repository. Games live in `games/<key>/{clsp,ui}` (optional `rust/` for tests) and register in `games/registry.json`.

For information about becoming a gaming partner, see the [Gaming Partner RFP](/guides/gaming-partner-rfp).

## Dependencies and Setup

### Developer Dependencies

- **Operating System**: Linux, macOS, or Windows with Git Bash / WSL for `./run-local-demo.sh` and the other bash build scripts
- **Rust** (stable) with `wasm32-unknown-unknown` target: the [chia-gaming `rust-toolchain.toml`](https://github.com/Chia-Network/chia-gaming/blob/main/rust-toolchain.toml) pins the channel and targets when you build from a clone:
  ```bash
  rustup target add wasm32-unknown-unknown
  ```
- **wasm-pack** 0.15.0:
  ```bash
  cargo install wasm-pack --version 0.15.0
  ```
- **Node.js 22+** and **pnpm 10.33**:
  ```bash
  corepack enable
  corepack prepare pnpm@10.33.0 --activate
  ```
- **macOS only**: Homebrew LLVM for WASM builds (`brew install llvm`). Build scripts automatically detect and use it.
- **Chia Wallet**: Chia **2.7.1 or later** (only needed for live WalletConnect testing, not required for simulator testing)
- **Codebase**: Access to the [chia-gaming repository](https://github.com/Chia-Network/chia-gaming) or the release artifacts

### User Dependencies

- **Chia wallet**: **2.7.1 or later** (light wallet is sufficient; a local full node is not required for players)
- **WalletConnect (live play)**: Each player connects their wallet via WalletConnect. The player app uses wallet RPC methods (for example `chia_getCoinRecordsByNames`, `chia_sendTransaction`, `chia_pushTransactions`) through that connection (`front-end/src/hooks/RealBlockchainInterface.ts`). Set a **transaction fee** in the Wallet tab for live spends; default is 0. Fees below 100,000,000 mojos are treated as zero (`front-end/src/constants/fees.ts`) and can be rejected by the mempool.
- **Simulator (development)**: For testing without real XCH, use simulator mode and the `chia-gaming-sim` binary started by `run-local-demo.sh` (single port 5800: HTTP `/health` and WebSocket `/ws`; see `front-end/src/settings.ts`).

:::tip Common Issues

For common setup issues and solutions, see the [Known Issues](/guides/gaming-known-issues) document.

:::

## Development Workflow

### Quick Start (Local Demo)

The fastest way to get started is `run-local-demo.sh`, which builds everything (including `tools/build-chialisp.sh` and a `--dev` WASM build for faster iteration) and starts three services:

```bash
git clone https://github.com/Chia-Network/chia-gaming.git
cd chia-gaming
./run-local-demo.sh
```

| Service    | Default URL                              | Override env var |
| ---------- | ---------------------------------------- | ---------------- |
| Player app | `http://localhost:3002`                  | `GAME_PORT`      |
| Hub        | `http://localhost:3003`                  | `HUB_PORT`       |
| Simulator  | `http://localhost:5800` (HTTP and `/ws`) | (hardcoded)      |

Flags:

- `--skip-build`: skip all build steps, use existing artifacts
- `--force-build`: `cargo clean` before building

Press Ctrl-C to stop all services.

You can play on the simulator or on live chain with the files hosted locally. Live WalletConnect play needs Chia Wallet **2.7.1 or later** with spendable funds (the repository documents a practical minimum of **1000 mojos** for mainnet smoke tests).

### Using Release Artifacts

**Local development:** `./run-local-demo.sh` builds everything, assembles the nonce-based staging trees (`build-meta.json`, assets under `app/<nonce>/`), and starts the player app, hub, and simulator.

**Release binaries:** Download from the [chia-gaming Releases](https://github.com/Chia-Network/chia-gaming/releases) page. Those assets are the **staged** archives from `tools/build-deploy.sh` (`.zip` and `.tgz` with the same contents):

- `chia-gaming-YYYYMMDD-HASH.zip`: player app (`index.html`, `build-meta.json`, `app/<nonce>/` with JS, CSS, WASM, and compiled CLVM)
- `chia-gaming-hub-YYYYMMDD-HASH.zip`: hub (same staging layout, plus `service.js` at the archive root)

Build them yourself with `./tools/build-deploy.sh` from source (see [DEVELOPMENT.md](https://github.com/Chia-Network/chia-gaming/blob/main/DEVELOPMENT.md)). The staged layout matches what `run-local-demo.sh` assembles locally (file copies under `front-end/serve` and `hub/hub-frontend/serve`).

To run the hub from a release zip:

```bash
PORT=3003 node service.js --self 'https://your-hub.example' --dir /path/to/extracted-hub-archive
```

### Building Step by Step

For production packaging or partial rebuilds. Run commands from the repo root. The full sequence is documented in [DEVELOPMENT.md](https://github.com/Chia-Network/chia-gaming/blob/main/DEVELOPMENT.md) and mirrored in `tools/build-deploy.sh`.

**1. Chialisp:**

```bash
./tools/build-chialisp.sh
```

This is the sole entry point for compiling `.clsp` sources. The compiler emits `.hex`, then the build decodes those into `.clvm.bin` artifacts. For each game it also prepares the runtime factory. Ordinary Cargo commands do not compile Chialisp.

**2. WASM (browser target):**

```bash
cd wasm && wasm-pack build --out-dir=../front-end/dist --release --target=web
```

For development, use `--dev` instead of `--release` (faster builds, larger output).

**3. Player app (frontend JS/CSS):**

```bash
pnpm install --frozen-lockfile
pnpm --filter chia-gaming-fe run build
```

**4. Hub frontend:**

```bash
pnpm --filter chia-gaming-hub-frontend run build
```

**5. Hub service:**

```bash
pnpm --filter chia-gaming-hub-service run build
```

If `pnpm install` warns about ignored build scripts, that is expected (see [Known Issues](/guides/gaming-known-issues)).

**6. Simulator (development only):**

```bash
cargo build --features sim-server --bin chia-gaming-sim
```

Listens on port **5800**, serving `GET|POST /health` over HTTP and the simulator API over WebSocket at `/ws`.

### Making Code Changes

1. **Edit Source Code**: Make your changes to the codebase.

2. **Rebuild**: After making changes, rebuild the affected components. For quick iteration, use `--skip-build` with `run-local-demo.sh` if you only changed frontend code, or rebuild individual steps as needed.

3. **Test Changes**: Use the simulator (recommended) or live WalletConnect to test your modifications.

### Testing

:::note Simulator Recommended

For development, it is recommended to use the simulator for testing game logic without interacting with a real Chia wallet.

:::

**Using Simulator (Recommended for Development):**

1. Start the local demo with `./run-local-demo.sh`
2. Navigate to the player app URL (`http://localhost:3002`)
3. Enable the simulator option in the UI
4. Connect both browsers to the same hub (`http://localhost:3003` in the local demo)
5. Open a different web browser, user profile, or incognito/private window
6. Challenge the other player from the hub UI and accept the challenge

**Using Live WalletConnect (Advanced Testing):**

:::important Two Separate Wallet Instances Required

When testing with live WalletConnect (not simulator), you **must** use two different Chia wallet instances. You cannot use the same wallet or installation for both players. The easiest approach is to deploy the gaming system to a URL accessible by both computers and use two different systems with separate wallet installations.

:::

1. Deploy the gaming system to a URL accessible by both computers (does not need to be publicly accessible; local network, VPN, or other private network setup is sufficient)
2. Use two different computers or systems, each with its own Chia wallet installation (2.7.1 or later)
3. Each player connects their separate wallet via WalletConnect and, for live chain, sets a **transaction fee** in the Wallet tab (default 0; see [Manual Configuration](#manual-configuration))
4. Both players connect to the **same hub**, then one player challenges the other

### Viewing Logs

View service logs for debugging:

```bash
# Logs appear in the terminal where run-local-demo.sh is running
# For more control, run services separately (see Building Step by Step)
```

## Verification

After building and launching the system, verify it's working correctly:

1. **Check Services**: Ensure all three services are accessible:

   ```bash
   curl http://localhost:3002  # Player app
   curl http://localhost:3003  # Hub
   curl http://localhost:5800/health  # Simulator
   ```

2. **Test with Simulator**:
   - Navigate to `http://localhost:3002`
   - Enable simulator mode
   - Connect to the local hub and challenge a second browser

3. **Test with Live WalletConnect**:
   - Connect a Chia wallet (2.7.1 or later) via WalletConnect
   - Confirm the player-app network setting matches the wallet (mainnet or testnet11)
   - Connect to a hub and test a challenge

4. **Check WalletConnect (live play only)**: Confirm each test wallet is connected, synced, and approving pending requests in the Chia wallet UI.

## Deploy to Production

For detailed deployment instructions including asset layout, caching rules, and production configuration, see [DEVELOPMENT.md](https://github.com/Chia-Network/chia-gaming/blob/main/DEVELOPMENT.md) in the chia-gaming repository.

Key points:

- The player app and hub must be served from **different origins** (the hub UI loads inside an iframe)
- WASM files and compiled CLVM artifacts must be under the same `basePath` as `index.js`
- No simulator in production: players connect their Chia wallet via WalletConnect
- Use `tools/build-deploy.sh` to produce deployment zip/tgz archives

## Manual Configuration

<span id="network-mainnet-only"></span>

### Network

The player app has a **mainnet / testnet** preference. WalletConnect uses `chia:mainnet` or `chia:testnet` (testnet11 genesis challenge) from `front-end/src/constants/env.ts`. The local simulator always verifies spends against the hardcoded **mainnet** `AGG_SIG_ME` additional data, so simulator sessions use mainnet genesis even if the UI preference says otherwise.

Live play requires the connected wallet to be on the same network the player app selected. A cross-network match is rejected before consent. For development without real XCH, use the **simulator**.

Optional CI/testing overrides: `CHIA_GAMING_CHAIN_ID` and `CHIA_GAMING_GENESIS_CHALLENGE` (or the matching `window.__CHIA_GAMING_*__` values).

### Transaction fees

Live WalletConnect spends can include a fee from the player app **Wallet** tab (`defaultFee` in session preferences). Default is **0**. The mempool treats a fee below **100,000,000 mojos** as effectively zero (`MIN_NONZERO_FEE_MOJOS` in `front-end/src/constants/fees.ts`); the UI refuses to save a nonzero value in that range. The fee spend is signed with `chia_sendTransaction` and aggregated into the protocol bundle before `chia_pushTransactions`. Simulator play does not use this path.

### WalletConnect Project Info Updates

To configure WalletConnect settings, you'll need to obtain a WalletConnect Project ID. For registration and troubleshooting, refer to the [WalletConnect documentation](https://walletconnect.com) and your WalletConnect account dashboard.

The repository ships a default WalletConnect **Project ID** in `front-end/src/constants/env.ts` for development. **Production or partner deployments should register their own project** at [WalletConnect Cloud](https://cloud.walletconnect.com) and replace that value before building the player app.

Once you have your Project ID, update:

1. **Project ID**: `front-end/src/constants/env.ts`: update `PROJECT_ID` (and `RELAY_URL` if needed)
2. **Chain and methods**: `front-end/src/constants/wallet-connect.ts`: update `REQUIRED_NAMESPACES` / `ChiaMethod` if the wallet API changes (must match what the player app calls in `RealBlockchainInterface.ts`)

### Port Configuration

Default ports for `run-local-demo.sh`:

- **Port 3002**: Player app (frontend web interface)
- **Port 3003**: Hub (matchmaking UI + relay service)
- **Port 5800**: Simulator (HTTP `/health` and WebSocket `/ws`)

Override with environment variables:

```bash
GAME_PORT=4000 HUB_PORT=4001 ./run-local-demo.sh
```

The hub process itself still defaults to port **5801** if `PORT` is not set. Always set `PORT` (or `HUB_PORT` via the demo script) so it does not collide with other local services.

For production deployments, see [DEVELOPMENT.md](https://github.com/Chia-Network/chia-gaming/blob/main/DEVELOPMENT.md) in the repository for port and domain configuration.
