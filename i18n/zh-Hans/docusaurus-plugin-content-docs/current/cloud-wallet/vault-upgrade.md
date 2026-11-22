---
title: Vault Upgrade
slug: /cloud-wallet/vault-upgrade
---

As of September 24, 2026, every new Cloud Wallet vault is created with the current vault protections already applied. If your vault was created before then, open it and follow the **Upgrade Your Vault** prompt on the vault balance screen.

Upgrade as soon as you see that prompt. Until you do, the vault is still on the previous version. It does not publish the on-chain recovery hint, so another wallet cannot recover it if you cannot use the Cloud Wallet. The upgrade keeps your spend key, recovery key, and recovery clawback. You sign once with your current spend key, the Cloud Wallet covers the fee, and the vault updates as soon as the transaction confirms.

## What the upgrade changes

The upgrade uses the same on-chain path as [Instant Recovery](/cloud-wallet/recovery#instant-recovery). The recovery timelock is not applied.

The upgraded vault must recreate its singleton on every spend. A spend cannot melt the vault or replace it with a different coin.

The same transaction publishes a [CHIP-0043](https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0043.md) recovery hint on the vault singleton. The hint contains the public custody key, the public recovery key, and the clawback duration. It does not contain your recovery phrase, and it does not contain Cloud Wallet account or user identifiers. That hint is what lets you recover the vault outside the Cloud Wallet.

## Who sees the prompt

The **Upgrade Your Vault** card appears on a vault created before September 24, 2026 that has a single spend key and a single recovery key. The recovery key for this path is your 24-word recovery phrase.

The card is not shown when another vault is a signer, when the vault uses a recovery provider, or when the vault was created on or after that date.

## Upgrade your vault

1. Log in to the [Cloud Wallet](https://vault.chia.net/) and open the vault.
2. On the vault balance screen, select **Upgrade Your Vault**.
3. Review the summary. Your keys stay the same, and the upgrade completes immediately.
4. Select **Initiate Vault Upgrade** and sign with your current spend key (your passkey or the Chia Signer app).
5. Wait for the transaction to confirm. After confirmation, the card no longer appears.

## Recover without the Cloud Wallet

:::warning

Importing vaults into the Cloud Wallet is not supported at this time. Importing a vault into a different wallet, or using a different tool to perform wallet operations, can remove your access to that vault in the Cloud Wallet. Save both new phrases when the app shows them. Chia Network does not store them.

:::

After the upgrade confirms, you can still recover in the Cloud Wallet with [Instant Recovery or Timelocked Recovery](/cloud-wallet/recovery). You can also recover without the Cloud Wallet, using [Chia Vault Recover](https://github.com/Chia-Network/chia-vault-recover) or another compatible wallet.

Download the app from that repository. The README covers install, the command-line flags, and the macOS Gatekeeper prompt for unsigned binaries.

You need:

- The vault **Receive address** (`xch1…` on mainnet, `txch1…` on testnet11)
- Your **24-word recovery phrase**
- A **new custody mnemonic** (24 words by default). The app can generate a second mnemonic for the new recovery key.

The Chia Vault Recover GUI is three steps: **Look up**, **Start**, and **Finish**.

1. **Look up** pastes the Receive address and reads the on-chain hint. This step does not ask for the recovery phrase.
2. **Start** signs with the recovery phrase and proposes the new custody mnemonic. The vault enters recovery. Anyone who still has the old spend key can cancel during the clawback window.
3. **Finish**, after the clawback window, rekeys the vault to the new custody mnemonic.

You can close the app after Look up or Start. The next launch returns to the step you left.

If Look up cannot find a hint, the vault has not yet been spent with one. When you can still open the vault, send any amount from the vault back to its own Receive address and wait for confirmation, then look up the same address again. The upgrade transaction itself publishes the hint, so a separate self-send is only needed when that spend has not confirmed.
