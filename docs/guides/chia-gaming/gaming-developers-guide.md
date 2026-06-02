---
slug: /guides/gaming-developers-guide
title: Developers Guide
---

:::warning Alpha Release

This is an **alpha release** of the Chia Gaming system. The codebase is subject to change, and breaking changes may occur in future versions. Use this system for development and testing purposes.

:::

<!-- Legacy anchors preserved for external links -->

<span id="setup-and-build"></span>
<span id="running-individual-services"></span>
<span id="ports-and-domain-updates"></span>

## Intro

This guide covers the development, testing, and deployment process for the Chia Gaming system. The system consists of two deployable artifacts:

1. **Player App** — A fully static HTML/JS/CSS/WASM application that players run in their browser. It contains the wallet connection, WASM game engine, and all game UIs. No server-side logic, no cookies, no server-side sessions.
2. **Tracker** — A separate service that provides a lobby UI (loaded as an iframe inside the player app) and a WebSocket relay that ferries game messages between peers. Trackers are third-party code — anyone can run one.

To follow this guide, you will need:

- Linux or macOS operating system
- Rust (stable) with the `wasm32-unknown-unknown` target
- Node.js 20+ and pnpm 10.33+
- wasm-pack 0.13.1
- Chia wallet **2.7.1 or later** (required minimum for Alpha 2; earlier wallet versions are not supported)
- Access to the [chia-gaming repository](https://github.com/Chia-Network/chia-gaming)

:::note Alpha 2 games

**California Poker** and **Space Poker** are playable in Alpha 2 as early releases; on-chain Chialisp, rules, and UI may change. **Krunk** is not yet available in the player app.

:::

For game rules and mechanics, see:

- [California Poker Rules](/guides/gaming-california-poker-rules)
- [Space Poker Rules](/guides/gaming-space-poker-rules)
- [Krunk Rules](/guides/gaming-krunk-rules)

For information about becoming a gaming partner, see the [Gaming Partner RFP](/guides/gaming-partner-rfp).

## Dependencies and Setup

### Developer Dependencies

- **Operating System**: Linux or macOS
- **Rust** (stable) with `wasm32-unknown-unknown` target:
  ```bash
  rustup target add wasm32-unknown-unknown
  ```
- **wasm-pack** 0.13.1:
  ```bash
  cargo install wasm-pack --version 0.13.1
  ```
- **Node.js 20+** and **pnpm 10.33+**:
  ```bash
  corepack enable
  corepack prepare pnpm@10.33.0 --activate
  ```
- **macOS only**: Homebrew LLVM for WASM builds (`brew install llvm`). Build scripts automatically detect and use it.
- **Chia Wallet**: Chia **2.7.1 or later** (required minimum for Alpha 2; only needed for live WalletConnect testing, not required for simulator testing)
- **Codebase**: Access to the [chia-gaming repository](https://github.com/Chia-Network/chia-gaming) or the release artifacts

### User Dependencies

- **Chia wallet**: **2.7.1 or later** (required minimum for Alpha 2; light wallet is sufficient; a local full node is not required for players)
- **WalletConnect (live play)**: Each player connects their wallet via WalletConnect. The player app uses wallet RPC methods (for example `chia_getCoinRecordsByNames`, `chia_pushTransactions`) through that connection (`front-end/src/hooks/RealBlockchainInterface.ts`).
- **Simulator (development)**: For testing without real XCH, use simulator mode and the `chia-gaming-sim` binary started by `run-local-demo.sh` (HTTP port 5800, WebSocket port 5801; see `front-end/src/settings.ts`).

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

| Service    | Default URL                                                       | Override env var          |
| ---------- | ----------------------------------------------------------------- | ------------------------- |
| Player app | `http://localhost:3002`                                           | `GAME_PORT`               |
| Tracker    | `http://localhost:3003`                                           | `TRACKER_PORT`            |
| Simulator  | `http://localhost:5800` (HTTP), `ws://localhost:5801` (WebSocket) | `SIM_PORT`, `SIM_WS_PORT` |

Flags:

- `--skip-build` — skip all build steps, use existing artifacts
- `--force-build` — `cargo clean` before building

Press Ctrl-C to stop all services.

### Using Release Artifacts

**Local development:** `./run-local-demo.sh` builds everything, assembles the nonce-based staging trees (`build-meta.json`, assets under `app/<nonce>/`), and starts the player app, tracker, and simulator.

**Alpha 2 binaries:** Download from the [chia-gaming Releases](https://github.com/Chia-Network/chia-gaming/releases) page on the Alpha 2 release tag. Those assets are the **staged** archives from `tools/build-deploy.sh` (`.zip` and `.tgz` with the same contents):

- `chia-gaming-YYYYMMDD-HASH.zip` — player app (`index.html`, `build-meta.json`, `app/<nonce>/` with JS, CSS, WASM, and `clsp/`)
- `chia-gaming-lobby-YYYYMMDD-HASH.zip` — tracker (same staging layout, plus `service.js` at the archive root)

Build them yourself with `./tools/build-deploy.sh` from source (see [DEPLOYING.md](https://github.com/Chia-Network/chia-gaming/blob/main/DEPLOYING.md)). The staged layout matches what `run-local-demo.sh` assembles locally (file copies under `front-end/serve` and `lobby/lobby-frontend/serve`).

To run the tracker from a release zip:

```bash
PORT=3003 node service.js --self 'https://your-tracker.example' --dir /path/to/extracted-lobby-archive
```

### Building Step by Step

For production packaging or partial rebuilds. Run commands from the repo root. The full sequence is documented in [DEPLOYING.md](https://github.com/Chia-Network/chia-gaming/blob/main/DEPLOYING.md) and mirrored in `tools/build-deploy.sh`.

**1. Chialisp (.hex files):**

```bash
find clsp -name '*.hex' -delete
cp build.rs.disabled build.rs
cargo build
```

**2. WASM (browser target):**

```bash
cd wasm && wasm-pack build --out-dir=../front-end/dist --release --target=web
```

For development, use `--dev` instead of `--release` (faster builds, larger output).

**3. Player app (frontend JS/CSS):**

```bash
cd front-end && pnpm install --frozen-lockfile && pnpm run build
```

**4. Lobby frontend:**

```bash
cd lobby && pnpm install --frozen-lockfile
pnpm --filter chia-gaming-lobby-frontend run build
```

If `pnpm install` in `lobby/` warns about ignored build scripts, that is expected (see [Known Issues](/guides/gaming-known-issues)). `tools/build-deploy.sh` uses `pnpm install --frozen-lockfile --ignore-scripts` in `lobby/` for production builds.

**5. Lobby service:**

```bash
cd lobby && pnpm --filter chia-gaming-lobby-service run build
```

**6. Simulator (development only):**

```bash
cargo build --features sim-server --bin chia-gaming-sim
```

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
4. Create a room and copy the generated room link
5. Open a different web browser, user profile, or incognito/private window
6. Paste the room link to join as the second player using the simulator

**Using Live WalletConnect (Advanced Testing):**

:::important Two Separate Wallet Instances Required

When testing with live WalletConnect (not simulator), you **must** use two different Chia wallet instances. You cannot use the same wallet or installation for both players. The easiest approach is to deploy the gaming system to a URL accessible by both computers and use two different systems with separate wallet installations.

:::

1. Deploy the gaming system to a URL accessible by both computers (does not need to be publicly accessible; local network, VPN, or other private network setup is sufficient)
2. Use two different computers or systems, each with its own Chia wallet installation (2.7.1 or later)
3. Each player connects their separate wallet via WalletConnect
4. Follow the standard game flow with both players using their respective wallets

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
   curl http://localhost:3003  # Tracker
   curl -X POST http://localhost:5800/get_peak  # Simulator
   ```

2. **Test with Simulator**:
   - Navigate to `http://localhost:3002`
   - Enable simulator mode
   - Create a room and test the connection

3. **Test with Live WalletConnect**:
   - Connect a Chia wallet (2.7.1 or later) via WalletConnect
   - Verify the connection is established
   - Test creating a room

4. **Check WalletConnect (live play only)**: Confirm each test wallet is connected, synced, and approving pending requests in the Chia wallet UI.

## Deploy to Production

For detailed deployment instructions including asset layout, caching rules, and production configuration, see the [DEPLOYING.md](https://github.com/Chia-Network/chia-gaming/blob/main/DEPLOYING.md) in the chia-gaming repository.

Key points:

- The player app and tracker must be served from **different origins** (the lobby loads inside an iframe)
- WASM files and `.hex` chialisp files must be under the same `basePath` as `index.js`
- No simulator in production — players connect their Chia wallet via WalletConnect
- Use `tools/build-deploy.sh` to produce deployment zip archives (see [DEPLOYING.md](https://github.com/Chia-Network/chia-gaming/blob/main/DEPLOYING.md))

## Manual Configuration

### Network (mainnet only)

**Alpha 2 supports mainnet only.** The player app is wired for mainnet in source:

- `front-end/src/constants/env.ts` — `CHAIN_ID = 'chia:mainnet'`
- `src/common/constants.rs` — `AGG_SIG_ME_ADDITIONAL_DATA` is the mainnet value

There is no supported testnet configuration for Alpha 2. Use the **simulator** (`run-local-demo.sh`) for development without mainnet XCH. Do not change these constants for testnet unless you are doing unsupported custom experimentation.

### WalletConnect Project Info Updates

To configure WalletConnect settings, you'll need to obtain a WalletConnect Project ID. For registration and troubleshooting, refer to the [WalletConnect documentation](https://walletconnect.com) and your WalletConnect account dashboard.

The repository ships a default WalletConnect **Project ID** in `front-end/src/constants/env.ts` for development. **Production or partner deployments should register their own project** at [WalletConnect Cloud](https://cloud.walletconnect.com) and replace that value before building the player app.

Once you have your Project ID, update:

1. **Project ID**: `front-end/src/constants/env.ts` — update `PROJECT_ID` (and `RELAY_URL` if needed)
2. **Chain and methods**: `front-end/src/constants/wallet-connect.ts` — update `REQUIRED_NAMESPACES` / `ChiaMethod` if the wallet API changes (must match what the player app calls in `RealBlockchainInterface.ts`)

### Port Configuration

Default ports for `run-local-demo.sh`:

- **Port 3002**: Player app (frontend web interface)
- **Port 3003**: Tracker (lobby + relay service)
- **Port 5800**: Simulator (HTTP)
- **Port 5801**: Simulator (WebSocket)

Override with environment variables:

```bash
GAME_PORT=4000 TRACKER_PORT=4001 ./run-local-demo.sh
```

For production deployments, see the [DEPLOYING.md](https://github.com/Chia-Network/chia-gaming/blob/main/DEPLOYING.md) in the repository for port and domain configuration.
