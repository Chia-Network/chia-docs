---
slug: /guides/gaming-developers-guide
title: Developers Guide
---

:::warning Alpha Release

This is an **alpha release** of the Chia Gaming system. The codebase is subject to change, and breaking changes may occur in future versions. Use this system for development and testing purposes.

:::

:::danger Funds Left On-Chain

**When using a live WalletConnect instance, funds will be left on-chain after shutdown.** Upon shutdown, a new game is created, leading to one game's worth of funds being left on-chain and not returned to users. For example, if the game stake is 10 mojo, then 10 mojos will remain on-chain after shutting down the session (once per lobby not per game). **Use the simulator for development to avoid this issue. This is a high priority issue which we are working to fix ASAP.**

:::

:::note Easy Developer Config Coming Soon

The easy developer configuration is still in development. Currently, parameters need to be manually coded. See the [Manual Configuration](#manual-configuration) section below for details.

:::

## Intro

This guide covers the development, testing, and deployment process for the Chia Gaming system. The system consists of two Docker images: the lobby server and the game code server.

To follow this guide, you will need:

- Linux operating system
- Docker (latest version recommended)
- Chia 2.5.7 (for WalletConnect testing)
- Access to the [chia-gaming repository](https://github.com/Chia-Network/chia-gaming)

For game rules and mechanics, see:

- [California Poker Rules](/guides/gaming-california-poker-rules)
- [Space Poker Rules](/guides/gaming-space-poker-rules) (coming soon)
- [Krunk Rules](/guides/gaming-krunk-rules) (coming soon)

For information about becoming a gaming partner, see the [Gaming Partner RFP](/guides/gaming-partner-rfp).

## Dependencies and Setup

### Developer Dependencies

- **Operating System**: Linux
- **Containerization**: Docker (latest version recommended)
- **Chia Wallet**: Chia 2.5.7 (only needed for live WalletConnect testing/playthroughs, not required for simulator testing)
- **Codebase**: Access to the [chia-gaming repository](https://github.com/Chia-Network/chia-gaming) or the [Docker images](https://github.com/Chia-Network/chia-gaming/releases)
- **Testing (Optional)**: Firefox or Chrome, and their respective Selenium drivers for running automated tests

### User Dependencies

- **Chia Wallet**: Chia 2.5.7 (light wallet, full node not required)
- **Blockchain Data**: The backend connects to coinset.org for blockchain data. Users' wallets perform transaction spends via WalletConnect. Both services are required for gameplay.

:::tip Common Issues

For common setup issues and solutions (Docker version, permissions, etc.), see the [Known Issues](/guides/gaming-known-issues) document.

:::

## Development Workflow

### Setup and Build

1. **Get the Codebase**: Choose one of the following options:

   **Option A: Clone the Repository**:

   ```bash
   git clone https://github.com/Chia-Network/chia-gaming.git
   cd chia-gaming
   ```

   **Option B: Use Docker Images from Releases**:
   Download the Docker images from the [chia-gaming releases page](https://github.com/Chia-Network/chia-gaming/releases).

2. **Install Dependencies**: Ensure all developer dependencies (Linux, Docker, Chia 2.5.7) are installed and configured.

3. **Manual Configuration (Optional)**: If you need to customize network settings, WalletConnect project info, ports, or domain, see the [Manual Configuration](#manual-configuration) section below.

4. **Build Docker Images**:

   ```bash
   ./build-docker-images.sh
   ```

   This command automatically configures both Docker images, compiles any new code within those images, and then launches both the lobby server and game code server.

   :::note Port Configuration

   Ports are manually coded in the `build-docker-images.sh` and `run-docker-demo.sh` scripts. The default ports are:
   - **Port 3000**: Frontend web interface (game UI)
   - **Port 3001**: Lobby server API
   - **Port 5800**: Simulator service

   To change ports, edit these scripts directly.

   :::

5. **Run Docker Images** (if not automatically started):

   ```bash
   ./run-docker-demo.sh
   ```

   Note: The build command automatically runs this once complete.

### Making Code Changes

:::note Repository Required

To make code changes, you must have cloned the repository (Option A from the Setup and Build section). Code changes cannot be made when using Docker images from releases (Option B).

:::

1. **Edit Source Code**: Make your changes to the codebase.

2. **Rebuild Docker Images**: After making changes, rebuild the Docker images:

   ```bash
   ./build-docker-images.sh
   ```

   This will recompile your changes and restart the services.

3. **Test Changes**: Use the simulator (recommended) or live WalletConnect to test your modifications.

### Testing

:::note Simulator Recommended

For development, it is recommended to use the simulator for testing game logic without interacting with a real WalletConnect instance.

:::

**Using Simulator (Recommended for Development):**

1. Navigate to the game server URL (typically `http://localhost:3000`)
2. Enable the simulator option in the UI
3. Create a room and copy the generated room link
4. Open a different web browser, user profile, or incognito/private window
5. Paste the room link to join as the second player using the simulator

**Using Live WalletConnect (Advanced Testing):**

:::danger Funds Left On-Chain

**When using a live WalletConnect instance, funds will be left on-chain after shutdown.** Upon shutdown, a new game is created, leading to one game's worth of funds being left on-chain and not returned to users. For example, if the game stake is 10 mojo, then 10 mojos will remain on-chain after shutting down the session (once per lobby not per game). **Use the simulator for development to avoid this issue. This is a high priority issue which we are working to fix ASAP.**

:::

:::important Two Separate Wallet Instances Required

When testing with live WalletConnect (not simulator), you **must** use two different Chia wallet instances. You cannot use the same wallet or installation for both players. The easiest approach is to deploy the gaming system to a URL accessible by both computers and use two different systems (computers) with separate wallet installations.

:::

1. Deploy the gaming system to a URL accessible by both computers (does not need to be publicly accessible; local network, VPN, or other private network setup is sufficient)
2. Use two different computers or systems, each with its own Chia wallet installation
3. Each player connects their separate wallet via WalletConnect
4. Follow the standard game flow with both players using their respective wallets

### Viewing Logs

View Docker container logs for debugging:

```bash
# View all container logs
docker ps  # Get container IDs
docker logs <container-id>

# Follow logs in real-time
docker logs -f <container-id>
```

### Running Individual Services

For development, you may want to run services separately. See the repository documentation:

- **Lobby Server**: See the [Lobby Server documentation](https://github.com/Chia-Network/chia-gaming/blob/main/resources/nginx/LOBBY.md) for running the lobby service individually
- **Game Server**: See the [Game Server documentation](https://github.com/Chia-Network/chia-gaming/blob/main/resources/nginx/GAME.md) for running the game service individually

## Verification

After building and launching the system, verify it's working correctly:

1. **Check Docker Containers**: Ensure both containers are running:

   ```bash
   docker ps
   ```

   You should see containers for both the lobby server and game server.

2. **Test with Simulator**:
   - Navigate to `http://localhost:3000` (or your configured port)
   - Enable simulator mode
   - Create a room and test the connection

3. **Test with Live WalletConnect**:
   - Connect a Chia wallet via WalletConnect
   - Verify the connection is established
   - Test creating a room

4. **Check Network Connectivity**: Ensure the backend can reach coinset.org:
   ```bash
   # For mainnet
   curl https://coinset.org
   # For testnet
   curl https://testnet11.api.coinset.org
   ```

## Deploy to Production

:::warning Config Directory Not Yet Available

The config directory feature is not yet implemented. This is a [known issue](/guides/gaming-known-issues#easy-developer-configuration-not-available). Currently, you must manually update configuration values in the codebase as described in the [Manual Configuration](#manual-configuration) section.

:::

1. **Manual Configuration**: Update all necessary production-specific configurations manually in the codebase (e.g., live network settings, correct ports, production domain).

2. **Build Images**: Build the production Docker images:

   ```bash
   ./build-docker-images.sh
   ```

3. **Launch Images**: Launch the built Docker images on your production server(s).

:::note Distribution

Each image (lobby server and game code server) can be launched on separate physical or virtual servers. Once the config directory feature is available, you'll be able to update the relevant server address parameters through configuration files.

:::

## Manual Configuration

:::warning Manual Configuration Required

The easy developer configuration is still in development. Currently, developers must manually update various parameters in the codebase before building and deploying.

:::

### Network Updates

To configure the network settings (e.g., switching to testnet), update the following files:

1. **agg_sig_additional change to testnet constant**:
   - File: `src/common/constants.rs`
   - Location: Line 32
   - Update the `AGG_SIG_ME_ADDITIONAL_DATA` constant to the testnet value. Replace the mainnet array with:
     ```rust
     pub const AGG_SIG_ME_ADDITIONAL_DATA: [u8; 32] = [
         0xe3, 0xb0, 0xc4, 0x42, 0x98, 0xfc, 0x1c, 0x14, 0x9a, 0xfb, 0xf4, 0xc8, 0x99, 0x6f, 0xb9, 0x24,
         0x27, 0xae, 0x41, 0xe4, 0x64, 0x9b, 0x93, 0x4c, 0xa4, 0x95, 0x99, 0x1b, 0x78, 0x52, 0xb8, 0x55,
     ];
     ```
   - [View in repository](https://github.com/Chia-Network/chia-gaming/blob/e716262cdf907e007af26c137a90f50d25ffa344/src/common/constants.rs#L32)

2. **chain_id to testnet**:
   - File: `resources/gaming-fe/src/constants/env.ts`
   - Location: Line 3
   - Update the `chain_id` to testnet: `chia:testnet`
   - [View in repository](https://github.com/Chia-Network/chia-gaming/blob/e716262cdf907e007af26c137a90f50d25ffa344/resources/gaming-fe/src/constants/env.ts#L3)

3. **coinset URL for testnet**:
   - Update **all instances** of `coinset.org` to the testnet endpoint: `https://testnet11.api.coinset.org`
   - This includes (but is not limited to):
     - File: `resources/nginx/game.conf` (Content Security Policy header, line 17)
     - File: `resources/lobby-service/src/index.ts` (Content Security Policy header, line 48)
     - Any other files that reference `coinset.org`
   - [View examples in repository](https://github.com/Chia-Network/chia-gaming/blob/e716262cdf907e007af26c137a90f50d25ffa344/resources/nginx/game.conf#L17)

### WalletConnect Project Info Updates

To configure WalletConnect settings, you'll need to obtain a WalletConnect Project ID. For registration and troubleshooting, refer to the [WalletConnect documentation](https://walletconnect.com) and your WalletConnect account dashboard.

Once you have your Project ID, update the following:

1. **Project ID**:
   - File: `resources/gaming-fe/src/constants/env.ts`
   - Location: Line 1
   - Update the WalletConnect project ID with your registered Project ID
   - [View in repository](https://github.com/Chia-Network/chia-gaming/blob/e716262cdf907e007af26c137a90f50d25ffa344/resources/gaming-fe/src/constants/env.ts#L1)

2. **Project Info**:
   - File: `resources/gaming-fe/src/constants/wallet-connect.ts`
   - Location: Line 52
   - Update the WalletConnect project information with your project details
   - [View in repository](https://github.com/Chia-Network/chia-gaming/blob/e716262cdf907e007af26c137a90f50d25ffa344/resources/gaming-fe/src/constants/wallet-connect.ts#L52)

### Ports and Domain Updates

**Default Ports:**

The default Docker configuration exposes the following ports:

- **Port 3000**: Frontend web interface (game UI)
- **Port 3001**: Lobby server API
- **Port 5800**: Simulator service

:::note Port Configuration

Ports are manually coded in the Docker build and run commands within `build-docker-images.sh` and `run-docker-demo.sh`. To change ports, edit these scripts directly.

:::

For production deployments, ports and domain should be configured via the methods documented in the repository:

- **Game Server**: See the [Game Server documentation](https://github.com/Chia-Network/chia-gaming/blob/main/resources/nginx/GAME.md#using-the-archive-and-script) for configuring ports and domain
- **Lobby Server**: See the [Lobby Server documentation](https://github.com/Chia-Network/chia-gaming/blob/main/resources/nginx/LOBBY.md#using-the-archive-and-script) for configuring ports and domain
