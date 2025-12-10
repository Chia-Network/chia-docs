---
slug: /guides/gaming-known-issues
title: Known Issues
---

This document lists known issues for the Chia Gaming system, organized by developer and user-facing concerns.

:::tip Troubleshooting

If you're experiencing issues not listed here, or need help resolving these known issues, see the [Troubleshooting Guide](/guides/gaming-troubleshooting) for detailed solutions and workarounds.

:::

## Developer Issues

### Common Setup Issues

| Issue              | Solution                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Old Docker Version | Install Docker via Snap instead of apt to ensure you get the latest stable version.                                                                                                                                      |
| Docker Permissions | Docker often installs with root privileges. To allow your user to run Docker commands without sudo:<br/>1. Run: `sudo usermod -aG docker $USER`<br/>2. Run: `newgrp docker`<br/>3. Reattempt the image build or command. |

### Easy Developer Configuration Not Available

The easy developer configuration is still in development. Currently, developers must manually update various parameters in the codebase before building and deploying.

**Workaround**: See the [Manual Configuration section](/guides/gaming-developers-guide#manual-configuration) in the Developers Guide for detailed instructions on how to manually configure network settings, WalletConnect project info, ports, and domain.

## User-Facing Issues

### UI/UX Issues

- **"Generate Room" button is light-gray on medium-gray**: The button may be difficult to see due to low contrast between the button color and background.

- **UX has limited information regarding what is happening during handshake**: The interface will be improved to provide better feedback about the current state of operations, particularly during handshaking and connection processes.

### Gameplay Issues

- **When you leave the game, both sides have to keep browser open until shutdown completes**: Both players must keep their browsers open until the shutdown process completes. Closing the browser prematurely may cause issues.

- **Chia Wallet does not raise to the foreground when a WalletConnect auth dialog appears**: The chia reference wallet will be updated to automatically come to the foreground when authentication is required, but this does not currently occur. Users need to manually bring the wallet application to the foreground.

### Performance Issues

- **Handshaking on-chain takes a long time**: Before the game starts, 3 nodes (player wallet nodes and coinset.org) have to observe 2 on-chain transactions (in order). The lobby will take a long time to appear for Bob (Player 2). This is expected behavior due to blockchain confirmation requirements, but the wait time can be significant.

- **Game server and lobby server interaction**: The current implementation of how the game server and lobby server interact may have performance limitations. This connection may be refactored in future versions to improve performance and scalability.
