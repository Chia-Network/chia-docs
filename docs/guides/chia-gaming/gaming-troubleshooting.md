---
slug: /guides/gaming-troubleshooting
title: Troubleshooting Guide
---

This troubleshooting guide addresses common issues developers and users may encounter when working with the Chia Gaming system.

## Developer Troubleshooting

### Build and Deployment Issues

#### Docker Build Fails

**Symptoms**: The `./build-docker-images.sh` command fails with errors.

**Solutions**:

- **Check Docker Version**: Ensure you have the latest Docker version. Install via Snap instead of apt if needed:
  ```bash
  sudo snap install docker
  ```
- **Check Docker Permissions**: Ensure your user is in the docker group:
  ```bash
  sudo usermod -aG docker $USER
  newgrp docker
  ```
- **Check Disk Space**: Ensure you have sufficient disk space for Docker images:
  ```bash
  df -h
  docker system df
  ```
- **Clean Docker Cache**: Try cleaning Docker's build cache:
  ```bash
  docker system prune -a
  ```
- **Check Logs**: Review the build output for specific error messages.

#### Containers Won't Start

**Symptoms**: Docker containers fail to start or immediately exit.

**Solutions**:

- **Check Port Availability**: Ensure ports 3000, 3001, and 5800 are not already in use:
  ```bash
  sudo lsof -i :3000
  sudo lsof -i :3001
  sudo lsof -i :5800
  ```
- **Check Container Logs**: View container logs for error messages:
  ```bash
  docker ps -a  # Get container IDs
  docker logs <container-id>
  ```
- **Verify Configuration**: Ensure all manual configuration steps have been completed correctly (see [Manual Configuration](/guides/gaming-developers-guide#manual-configuration)).

#### Code Changes Not Reflecting

**Symptoms**: After making code changes, the changes don't appear when running the application.

**Solutions**:

- **Rebuild Images**: Code changes require rebuilding Docker images:
  ```bash
  ./build-docker-images.sh
  ```
- **Check Build Output**: Verify the build completed successfully and your changes were included.
- **Restart Containers**: Ensure containers were restarted after the build:
  ```bash
  docker ps  # Verify containers are running
  ```

### Configuration Issues

#### WalletConnect Connection Fails

**Symptoms**: Unable to connect wallet via WalletConnect.

**Solutions**:

- **Verify Project ID**: Ensure your WalletConnect Project ID is correctly configured in `resources/gaming-fe/src/constants/env.ts`.
- **Check Network Settings**: Ensure you're using the correct network (testnet vs mainnet) and that the chain_id matches.
- **WalletConnect Support**: For WalletConnect registration and account issues, refer to the [WalletConnect documentation](https://walletconnect.com) and your WalletConnect account dashboard for troubleshooting.
- **Review WalletConnect Guide**: See the [WalletConnect Developer Guide](/guides/walletconnect-developer-guide) for detailed setup instructions.

#### Network Configuration Issues

**Symptoms**: Application can't connect to blockchain or coinset.org.

**Solutions**:

- **Verify Network Settings**: Check that `agg_sig_additional` and `chain_id` are set correctly for your target network (testnet or mainnet).
- **Test Network Connectivity**: Verify the backend can reach coinset.org:
  ```bash
  # For mainnet
  curl https://coinset.org
  # For testnet
  curl https://testnet11.api.coinset.org
  ```
- **Check Firewall**: Ensure firewall rules allow outbound connections to coinset.org.
- **Verify Content Security Policy**: Check that CSP headers in `resources/nginx/game.conf` and `resources/lobby-service/src/index.ts` include the correct coinset.org URLs.

#### Port Configuration Issues

**Symptoms**: Can't access the application on expected ports.

**Solutions**:

- **Check Port Bindings**: Verify Docker port mappings are correct:
  ```bash
  docker ps  # Check port mappings
  ```
- **Check Default Ports**: Default ports are:
  - 3000: Frontend web interface
  - 3001: Lobby server API
  - 5800: Simulator service
- **Check Port Availability**: Ensure ports aren't already in use by another application.
- **Review Port Documentation**: See the [Game Server](https://github.com/Chia-Network/chia-gaming/blob/main/resources/nginx/GAME.md) and [Lobby Server](https://github.com/Chia-Network/chia-gaming/blob/main/resources/nginx/LOBBY.md) documentation for port configuration.

### Development Environment Issues

#### Simulator Not Working

**Symptoms**: Simulator mode doesn't function correctly.

**Solutions**:

- **Verify Simulator Enabled**: Ensure the simulator option is enabled in the UI.
- **Check Browser Console**: Open browser developer tools and check for JavaScript errors.
- **Verify Backend Connection**: Ensure the game server is running and accessible.

#### Logs Not Appearing

**Symptoms**: Can't see application logs for debugging.

**Solutions**:

- **View Docker Logs**: Use Docker logs to view container output:
  ```bash
  docker logs -f <container-id>
  ```
- **Check Log Levels**: Verify log levels are set appropriately in the configuration.
- **Check Container Status**: Ensure containers are running:
  ```bash
  docker ps
  ```

## User Troubleshooting

### Connection Issues

#### WalletConnect Won't Connect

**Symptoms**: Unable to connect Chia wallet via WalletConnect.

**Solutions**:

- **Check Wallet Version**: Ensure you're using Chia 2.5.7 or later.
- **Check Wallet Sync**: Verify your wallet is synced with the blockchain.
- **Clear WalletConnect Cache**: Use the option in the UI to clear the WalletConnect cache, then try connecting again.
- **Try Reconnecting**: Disconnect and reconnect WalletConnect.
- **Check Browser**: Try a different browser or clear browser cache.
- **Verify Network**: Ensure you're on the correct network (testnet vs mainnet) that matches the game server configuration.
- **WalletConnect Support**: For WalletConnect-specific issues, refer to the [WalletConnect documentation](https://walletconnect.com) and your WalletConnect account dashboard for troubleshooting.

#### Handshake Never Completes

**Symptoms**: Handshake process seems to hang or never completes.

**Solutions**:

- **Check for Pending WalletConnect Requests**: Check your Chia wallet for any pending WalletConnect requests. The wallet may have a request waiting for approval that needs to be confirmed before the handshake can proceed. This is a common cause of handshake delays.
- **Wait Longer**: Handshaking requires 2 on-chain transactions. Each blockchain peak takes approximately 1 minute, so expect several minutes of waiting.
- **Check Handshake Status**: Look for on-screen status indicators showing handshake progress.
- **Verify Wallet Connection**: Ensure both players' wallets are properly connected and synced.
- **Check Network**: Verify both players have network connectivity and can reach coinset.org.
- **Try Restarting**: If handshake has been waiting for an unusually long time (10+ minutes), try restarting the connection.

### Gameplay Issues

#### Game Won't Start

**Symptoms**: After handshake completes, game doesn't begin.

**Solutions**:

- **Check Browser Console**: Open browser developer tools (F12) and check for errors.
- **Verify Both Players Connected**: Ensure both players have successfully connected their wallets.
- **Check Balance**: Verify both players have sufficient balance for the game stake.
- **Refresh Page**: Try refreshing the page and reconnecting.

#### Cards or Game Elements Not Displaying

**Symptoms**: Game interface appears but cards or other elements are missing.

**Solutions**:

- **Check Browser Compatibility**: Ensure you're using a modern, supported browser (Chrome, Firefox, Safari, Edge).
- **Clear Browser Cache**: Clear your browser cache and reload the page.
- **Check JavaScript**: Ensure JavaScript is enabled in your browser.
- **Check Console**: Open browser developer tools and check for JavaScript errors.

#### Game Freezes or Becomes Unresponsive

**Symptoms**: Game stops responding to input or freezes.

**Solutions**:

- **Check Network Connection**: Verify you have a stable internet connection.
- **Refresh Page**: Try refreshing the page (note: this may end the current game session).
- **Check Browser Console**: Look for error messages in the browser console.
- **Wait for Opponent**: Some game states require waiting for the opponent's action.

### Session Management Issues

#### Can't End Session

**Symptoms**: Unable to end a game session.

**Solutions**:

- **Wait for Current Hand**: Complete or forfeit the current hand/game before ending the session.
- **Check Balance**: If ending due to insufficient balance, ensure the session can be properly closed.
- **Wait for Opponent**: If opponent is still active, wait for them to complete their turn or end their session.
- **Close Browser**: As a last resort, closing the browser will end the session, but both players should keep browsers open until shutdown completes (see [Known Issues](/guides/gaming-known-issues)).

#### Session Ends Unexpectedly

**Symptoms**: Game session ends without user action.

**Possible Causes**:

- **Insufficient Balance**: One or both players may have insufficient balance to continue.
- **On-Chain Transaction**: Session may have moved on-chain, requiring session end.
- **Opponent Ended**: The opponent may have ended the session.
- **Network Issues**: Network connectivity problems may have caused the session to end.

**Solutions**:

- **Check End Screen**: The end screen will show the reason for ending.
- **Verify Balance**: Ensure you have sufficient balance for the game stake.
- **Check Network**: Verify network connectivity is stable.

## Getting Additional Help

If you continue to experience issues after trying these troubleshooting steps:

1. **Check Known Issues**: Review the [Known Issues](/guides/gaming-known-issues) document for documented problems and workarounds.

2. **Review Documentation**:
   - [Developers Guide](/guides/gaming-developers-guide)
   - [Users Guide](/guides/gaming-users-guide)

3. **Check Repository**: Review the [chia-gaming repository](https://github.com/Chia-Network/chia-gaming) for additional information and issue reports.

4. **Support**: For additional support, visit the [Gaming channel](https://discord.com/channels/1034523881404370984/1275119503273103381) in the official Chia Discord server.
