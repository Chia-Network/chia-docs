---
slug: /guides/gaming-known-issues
title: Known Issues
---

This document lists known issues for the Chia Gaming system, organized by developer and user-facing concerns.

:::tip Troubleshooting

If you're experiencing issues not listed here, or need help resolving these known issues, see the [Troubleshooting Guide](/guides/gaming-troubleshooting) for detailed solutions and workarounds.

:::

## Developer Issues

### Easy Developer Configuration Not Available

The easy developer configuration is still in development. Currently, developers must manually update various parameters in the codebase before building and deploying.

**Workaround**: See the [Manual Configuration section](/guides/gaming-developers-guide#manual-configuration) in the Developers Guide for detailed instructions on how to manually configure network settings, WalletConnect project info, ports, and domain.

## User-Facing Issues

### UI/UX Issues

- **"Generate Room" button is light-gray on medium-gray**: The button may be difficult to see due to low contrast between the button color and background.

- **UX should update user more on what is happening**: The interface could provide better feedback about the current state of operations, particularly during handshaking and connection processes.

### Gameplay Issues

- **When you leave the game, both sides have to keep browser open until shutdown completes**: Both players must keep their browsers open until the shutdown process completes. Closing the browser prematurely may cause issues.

- **Chia Wallet should raise to the foreground when a WalletConnect auth dialog appears**: The wallet application should automatically come to the foreground when authentication is required, but this may not always occur. Users may need to manually bring the wallet application to the foreground.

### Performance Issues

- **Handshaking on-chain takes a long time**: Before the game starts, 3 full nodes (player wallet nodes and coinset.org) have to observe 2 on-chain transactions (in order). The lobby will take a long time to appear for Bob (Player 2). This is expected behavior due to blockchain confirmation requirements, but the wait time can be significant.
