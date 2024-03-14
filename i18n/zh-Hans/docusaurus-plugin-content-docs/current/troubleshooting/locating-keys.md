---
title: Locating Keys
slug: /troubleshooting/locating-keys
---

import WalletKeyDetails from '@site/static/img/troubleshooting/wallet_key_details.png';
import WalletKeysOverview from '@site/static/img/troubleshooting/wallet_keys_overview\.png';
import WalletLogout from '@site/static/img/troubleshooting/wallet_logout.png';

This doc assumes you have chia installed and will overview both the CLI and GUI methods of identifying various keys.\
Please refer to the [Installation page](/installation) if you do not have chia installed.

## Keys Overview

The main keys utilized in chia are:

1. **Public Key** - also known as the master public key, this key is used with the [Chia faucet](https://faucet.chia.net/) and as an observer only view for funds in the wallet.
2. **Farmer Public Key** - this key is used to generate plots and is a public key. If using a plotting service they will request this key and also a pool contract address which is listed on the pool tab of the gui, detailed instructions can be found [here](/plotting-how-to#pool-contract-address)
3. **Pool Public Key** - this is the key that was used for OG plots which cannot connect to pools. It is recommended to create plotNFT plots (portable plots) and use the pool contract address as outlined [here](/plotting-how-to#pool-contract-address)
4. **Farmer Private Key** - this key should **NEVER** be shared with anyone as it is used to sign farmed blocks. Always be mindful when clicking the reveal button and recognize that this keyset is generally not needed for any manual entry.
5. **Secret Key** - also known as the master private key, this key should **NEVER** be shared with anyone as it can give access to spend funds from your wallet. Always be mindful when clicking the reveal button and recognize that this keyset is generally not needed for any manual entry.
6. **Seed Phrase** - also known as the mnemonic phrase, this key should **NEVER** be shared with anyone as it gives full access to your wallet. This should be backed up in a safe location and never entered into any manual entry field unless you are importing your keys to a new wallet.

## GUI

There are a series of different keys that your chia client uses, follow the below steps to view all of these keys but always be mindful with whom you share them.

:::warning
Never share your private / secret keys or mnemonics with anyone. These give access to spend funds from your wallet.
:::

### Locating Keys in the GUI

1. In the top right corner select logout:

<div style={{ textAlign: 'center' }}>
  <img src={WalletLogout} alt='Logout of the Chia wallet' />
</div>
<br />

2. Using the desired keys menu, select details:

<div style={{ textAlign: 'center' }}>
  <img src={WalletKeyDetails} alt='Select Details for a Chia keyset' />
</div>
<br />

3. View and copy the needed keyset:

<div style={{ textAlign: 'center' }}>
  <img src={WalletKeysOverview} alt='Chia keys detail screen' />
</div>
<br />

:::note
For more security best practices please review the [Securing Your Chia – How to Be a Hard Target](https://www.chia.net/2021/05/28/securing-your-chia-how-to-be-a-hard-target/) blog article.
:::

## CLI

There are a series of different keys that your chia client uses, follow the below steps to view all of these keys but always be mindful with whom you share them.

:::warning
**NEVER** share your private / secret keys or mnemonics with anyone. These give access to spend funds from your wallet.
:::

### Locating Keys in the CLI

In order to view your keys from the cli, run `chia keys show`, optionally including the `-f <fingerprint>` flag to show only the info for the key you just generated:

1. From terminal (mac/linux) or powershell (windows) run `chia keys show`:

```bash
chia keys show
```

:::warning
`chia keys show --show-mnemonic-seed`\
displays the _Master Private Key, Farmer Private Key, and Seed Phrase / Mnemonic_ **NEVER** share these with anyone.
:::

2. View and copy the needed keyset:

```bash
Showing all public keys derived from your master seed and private key:

Label: Demo Wallet
Fingerprint: 2281896037
Master public key (m): 96ce91d974daa0990e6681ac2de3e3f49142f6b655a081817832265c143e658a6e60a5dec856f292f45fe2d04c7856f6
Farmer public key (m/12381/8444/0/0): a9e366b26f155491af9a903c0ed9717bfd09a71cbe283eeda825128fd7c6b9ac60e1608f9f008adcfbf66e233d5b4ce8
Pool public key (m/12381/8444/1/0): 9566fa434f342dd5f9380a6bfc59dd7d1abd22869a425a8ca09cf27200eaa6aad5bc8fc00db90af832eb8028b0c6e3f0
First wallet address: xch1kr3zf7dqw5q953ex6zt33lndj90q0zlh68404tsntnljthnwqs2qvjmwrg
```

:::note
If you run into any issues or have followup questions please join our [discord server](https://discord.gg/chia) and ask in the #support channel.
:::
