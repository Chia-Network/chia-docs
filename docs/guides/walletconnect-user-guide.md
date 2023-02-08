---
slug: /walletconnect-user-guide
title: WalletConnect User Guide
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

## Intro

This guide will show you how to use [WalletConnect](https://walletconnect.com/) to connect a sample DApp to your Chia reference wallet.

:::note a few notes

- Support for WalletConnect was introduced in Chia version 1.6.2. If you are running an earlier version, be sure to upgrade to the latest version. See our [download page](https://www.chia.net/downloads/) for more info.
- Generally speaking, you only need to have a synced light wallet to use WalletConnect. A full node is not required. However, depending on your DApp, a full node may be required to run certain commands.
- WalletConnect is supported on every operating system supported by the Chia reference wallet, including Windows, Linux, and MacOS.
- WalletConnect is supported on Chia's testnet, as well as its mainnet.
- This guide will use Chia's reference wallet, but WalletConnect integration for other wallets will eventually be supported as well.

:::

---

## Install the sample DApp

In order to help you get started with WalletConnect, we have created a sample DApp.
In this section, we'll install and run the DApp locally. We'll also obtain a link to connect the DApp to a Chia reference wallet.

If you would like to connect your Chia reference wallet to a different DApp, then feel free to skip ahead to the [next section](#configure-walletconnect).

1. Run this command to clone the sample DApp's [GitHub repo](https://github.com/Chia-Network/chia-wallet-connect-dapp-test):

```bash
git clone https://github.com/Chia-Network/chia-wallet-connect-dapp-test.git -b main
```

2. Change to the sample DApp's directory:

```bash
cd chia-wallet-connect-dapp-test
```

3. Use `yarn` to install the sample DApp ([more info about yarn](https://classic.yarnpkg.com/lang/en/docs/cli/)):

```bash
yarn
```

Example result:

```bash
yarn install v1.22.17
warning ..\..\..\..\package.json: No license field
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
warning " > @polkadot/util-crypto@10.1.14" has unmet peer dependency "@polkadot/util@10.1.14".
warning " > styled-components@5.3.6" has unmet peer dependency "react-is@>= 16.8.0".
[4/4] Building fresh packages...
Done in 213.31s.
```

:::info
`yarn` will also install the needed dependencies for the sample DApp. Depending on which dependencies were already installed, this could add several minutes to the installation time. In this example, the installation took 3.5 minutes.
:::

4. Set up your local environment variables by copying the example into your own `.env.local` file:

```bash
cp .env.local.example .env.local
```

Your copy of `.env.local` now contains the following environment variables:

    * `NEXT_PUBLIC_PROJECT_ID` (placeholder) - You can generate your own ProjectId at https://cloud.walletconnect.com
    * `NEXT_PUBLIC_RELAY_URL` (already set)

5. Use `yarn` to build the sample DApp:

```bash
yarn next build
```

Example result:

```bash
yarn run v1.22.17
warning ..\..\..\..\package.json: No license field
$ C:\Users\User\Documents\GitHub\chia\chia-wallet-connect-dapp-test\node_modules\.bin\next build
info  - Loaded env from C:\Users\User\Documents\GitHub\chia\chia-wallet-connect-dapp-test\.env.local
info  - SWC minify release candidate enabled. https://nextjs.link/swcmin
info  - Linting and checking validity of types ..warn  - No ESLint configuration detected. Run next lint to begin setup
info  - Linting and checking validity of types
info  - Creating an optimized production build
info  - Compiled successfully
info  - Collecting page data
info  - Generating static pages (3/3)
info  - Finalizing page optimization

Page                                       Size     First Load JS
┌ ○ / (2385 ms)                            8.97 kB        1.52 MB
├   /_app                                  0 B            1.51 MB
└ ○ /404 (2305 ms)                         277 B          1.51 MB
  First Load JS shared by all              1.51 MB
  ├ chunks/framework-b892d1ba2d9bbbff.js   42.5 kB
  ├ chunks/main-2ad31211114520a4.js        30.8 kB
  ├ chunks/pages/_app-478d778bda06be1e.js  1.43 MB
  ├ chunks/webpack-c83969435574458d.js     1.06 kB
  └ css/ab44ce7add5c3d11.css               247 B

○  (Static)  automatically rendered as static HTML (uses no initial props)

Done in 25.63s.
```

6. Start the sample DApp:

```bash
yarn start
```

Example result:

```bash
yarn run v1.22.17
warning ..\..\..\..\package.json: No license field
$ next start
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
info  - Loaded env from C:\Users\User\Documents\GitHub\chia\chia-wallet-connect-dapp-test\.env.local
info  - SWC minify release candidate enabled. https://nextjs.link/swcmin
```

In this example, the DApp was started locally on port 3000. This is the default port; your DApp may need to use a different port if 3000 is already being used for something else.

7. Access the sample DApp:

Open a browser and navigate to [http://localhost:3000](http://localhost:3000) (unless a different port was used)

:::info

If you see an error message such as `An error as occured`, the most likely cause is that you are running an ad blocker that is interfering with the DApp.
Either disable the ad blocker or try a different browser.

:::

The sample DApp should display a list of testnet projects.

8. Click `Chia Testnet`, then click `Connect`:

{' '}
<div style={{ textAlign: 'center' }}>
  <img src="/img/walletconnect/01_dapp.png" alt="Click Connect" />
</div>
<br />

9. A QR code will be displayed. Click `Copy to clipboard`:

{' '}
<div style={{ textAlign: 'center' }}>
  <img src="/img/walletconnect/02_dapp.png" alt="Click Copy to clipboard" />
</div>
<br />

The link has been copied, so you are ready to set up WalletConnect in Chia's reference wallet. Keep this browser window open in case you need to copy the link again.

---

## Configure WalletConnect

1. [Download and install](https://www.chia.net/downloads/) Chia version 1.6.2 or greater

:::info

If you installed Chia with a packaged installer, you can set up an alias to run `chia` commands. See our [FAQ](https://docs.chia.net/faq?_highlight=execu#i-installed-chia-with-the-packaged-installer-how-do-i-run-cli-commands) for more info.

:::

2. Set up Chia's testnet

While it's possible to use WalletConnect on Chia's mainnet, this example will use the testnet.
The primary command to convert your system to use the testnet is `chia configure -t true`.
See our [testnet setup guide](https://github.com/Chia-Network/chia-blockchain/wiki/How-to-connect-to-the-Testnet) for more info.

After your system has been configured to use the testnet, you can start your Chia reference wallet.

3. Click the WalletConnect icon

The icon is located on the upper-right side of the reference wallet GUI, as shown here:

{' '}
<div style={{ textAlign: 'center' }}>
  <img
    src="/img/walletconnect/01_walletconnect.png"
    alt="Click the WalletConnect icon"
  />
</div>
<br />

4. Click `ENABLE WALLETCONNECT`

{' '}
<div style={{ textAlign: 'center' }}>
  <img
    src="/img/walletconnect/02_walletconnect.png"
    alt="Click ENABLE WALLETCONNECT"
  />
</div>
<br />

5. Click `ADD CONNECTION`

{' '}
<div style={{ textAlign: 'center' }}>
  <img
    src="/img/walletconnect/03_walletconnect.png"
    alt="Click ADD CONNECTION"
  />
</div>
<br />

6. Paste the link to your sample DApp and click `CONTINUE`

If you used this guide to set up the sample DApp, this was the link you obtained with the last step of the previous section:

{' '}
<div style={{ textAlign: 'center' }}>
  <img src="/img/walletconnect/03_dapp.png" alt="Paste and click CONTINUE" />
</div>
<br />

7. Chooose which public key(s) to connect and click `CONTINUE`

While you may choose more than one key to connect with the DApp, we will use a single key for this example:

{' '}
<div style={{ textAlign: 'center' }}>
  <img
    src="/img/walletconnect/04_walletconnect.png"
    alt="Select wallets and click CONTINUE"
  />
</div>
<br />

8. Confirm your connection

You will be shown the key(s) to connect to the DApp. If this looks OK, click `CLOSE`. To start over, click `DISCONNECT`:

{' '}
<div style={{ textAlign: 'center' }}>
  <img src="/img/walletconnect/05_walletconnect.png" alt="Click CLOSE" />
</div>
<br />

9. Show more info

To show info on which DApp(s) are paired to which keys(s), click the WalletConnect icon, click the three dots, and click `More Info`:

{' '}
<div style={{ textAlign: 'center' }}>
  <img src="/img/walletconnect/06_walletconnect.png" alt="Click More Info" />
</div>
<br />

You will be shown the Pair Information for your DApp:

{' '}
<div style={{ textAlign: 'center' }}>
  <img
    src="/img/walletconnect/07_walletconnect.png"
    alt="Paired keys are showing"
  />
</div>
<br />

Your wallet has been successfully paired with the sample DApp. In the next section, we'll show you how to interact with your wallet from the DApp.

---

## Call DApp functions

1. View the sample DApp in a web browser

Recall that by default, the DApp will run on [http://localhost:3000](http://localhost:3000).

You will be shown a list of available methods. If you opted to connect multiple keys to the sample DApp, these methods will be listed for each key.

For this example, we'll call `chia_getNextAddress`:

{' '}
<div style={{ textAlign: 'center' }}>
  <img src="/img/walletconnect/04_dapp.png" alt="Run chia_getNextAddress" />
</div>
<br />

At this point, the sample DApp will wait for confirmation from your wallet:

{' '}
<div style={{ textAlign: 'center' }}>
  <img src="/img/walletconnect/05_dapp.png" alt="Pending JSON-RPC Request" />
</div>
<br />

2. Confirm the request

Switch back to your Chia reference wallet. You should now see a confirmation dialog with the requested method. Click `CONFIRM`:

{' '}
<div style={{ textAlign: 'center' }}>
  <img src="/img/walletconnect/08_walletconnect.png" alt="Confirm request" />
</div>
<br />
3. View the response

Returning to the sample DApp, a new dialog with the response will appear. In this example, a new address will be shown:

{' '}
<div style={{ textAlign: 'center' }}>
  <img src="/img/walletconnect/06_dapp.png" alt="Showing next address" />
</div>
<br />{' '}

You have now installed, configured, and used the sample DApp. Feel free to test the other functions, as well as create your own!

---

## Configure WalletConnect

By default, you can only run DApp methods against the wallet key that is currently synced.
This was not an issue in the above example because we only selected one public key to pair with the sample DApp.
However, if you want your DApp to be able to interact with multiple keys, you will need to enable an additional setting in the reference wallet.

Click the gear icon in the lower left corner of the reference wallet, then click the `INTEGRATION` tab. As of version 1.6.2, two new settings will appear:

- `Enable` -- This setting was activated when you enabled WalletConnect earlier in the guide
- `Allow requests that require switching to a different wallet key` -- If you activate this setting, your DApp will be able to switch between multiple wallet keys. The selected wallet will need to sync whenever you switch between keys.

<div style={{ textAlign: 'center' }}>
  <img
    src="/img/walletconnect/09_walletconnect.png"
    alt="Allow requests that require switching keys"
  />
</div>
<br />

To configure the commands that are provided to DApps, you can edit (locally) [chia-blockchain-gui/blob/main/packages/gui/src/constants/WalletConnectCommands.tsx](https://github.com/Chia-Network/chia-blockchain-gui/blob/main/packages/gui/src/constants/WalletConnectCommands.tsx).
This file acts as a middle layer between the wallet and the DApp. It can also be used to control privacy settings.

---

## FAQ

### What is the main use case for WalletConnect?

WalletConnect allows end users to connect their wallet to a DApp.

### What WalletConnect functionality might be enabled in the future?

WalletConnect is currently supported in Chia's reference wallet.

In the future, it could also be supported in other Chia wallets.

It could also be enabled for mobile- and web-based DApps. For example, mobile wallet providers will be able to integrate with WalletConnect to connect directly to DApp providers.

WalletConnect will aslo be used for initiating signing requests from within a DApp. This will enable interactions with all types of assets on Chia, including XCH, CATs, and NFTs. It will aslo enable using Chia Offers.

### What is the difference between WalletConnect and CHIP-2?

WalletConnect is generalized to allow any DApp to connect to any Chia wallet. [CHIP-2](https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0002.md) (DApp protocol) is specific to browser extensions.

### Will the wallet SDK support WalletConnect in the future?

No -- the wallet SDK and WalletConnect exist on different parts of the tech stack.
Whereas WalletConnect gives end users a way to connect their wallet to DApps, the wallet SDK will allow
developers to provide wallet functionality inside their DApps.

### How can WalletConnect connect to remote wallets?

In the example from this tutorial, both the reference wallet and WalletConnect were running on `localhost`.

To connect to a mobile phone, you can scan the provided QR code. To connect to remote browser-based dapps, simply navigate to the remote URI from a web browser.

Also note that all connections (local and remote) between wallets and DApps are end-to-end encrypted.
