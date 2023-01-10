---
title: CAT2 Token Reissuance
sidebar_label: 3. Token Reissuance
slug: /guides/cat2-issuance
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

:::info
CAT1 will reach its end of life at block 2,311,760, which will occur on July 26, 2022 at around 17:00 UTC.

For more information on this end-of-life process, see the [Intro and FAQ guide](/guides/cat2-intro).
:::

This document will show CAT1 issuers how to:

1. Install the CAT admin tool, which will be used to reissue tokens
2. "Secure the bag" – create a tree of new coins that are identical to the original CAT1 coins, in both size and destination wallet
3. "Unwind the bag" – airdrop the coins to the appropriate locations

Before starting this guide, you will need a snapshot CSV, instructions for which can be found in the [Snapshot Generation guide](/guides/cat2-snapshot).

## Install the CAT Admin Tool

:::warning
A new version of the CAT Admin Tool will be released shortly after Chia version `1.5.0`, at approximately the end-of-life block height (`2311760`). You should not attempt token reissuance before you have updated to this version.
:::

Now that you have a CSV file containing the necessary information, you can run the [CAT Admin Tool](https://github.com/Chia-Network/CAT-admin-tool) to secure and airdrop a set of CAT2 tokens equivalent in size and address to their CAT1 counterparts.

1. Open a new terminal window and run the following to clone the CAT Admin Tool repository, using the `main` branch:

   ```bash
   git clone https://github.com/Chia-Network/CAT-admin-tool.git -b main
   ```

2. Change to the cloned repository:

   ```bash
   cd CAT-admin-tool
   ```

3. Create a new virtual environment and then activate it:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   python3 -m venv venv
   . ./venv/bin/activate
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   python3 -m venv venv
   . ./venv/bin/activate
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

4. Install the latest versions of `pip`, `setuptools` and `wheel`:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   python -m pip install --upgrade pip setuptools wheel
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   python3 -m pip install --upgrade pip setuptools wheel
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   python3 -m pip install --upgrade pip setuptools wheel
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

5. Install the CAT Admin Tool:

   ```bash
   pip install .
   pip install chia-dev-tools --no-deps
   pip install pytest
   ```

   :::note
   You can safely ignore the following errors:

   ```
   ERROR: Failed building wheel for CAT-admin-tool
   ERROR: pip's dependency resolver...
   ```

   :::

   :::tip
   Python 3.9+ may be required on macOS
   :::

6. The CAT Admin Tool should now be installed and configured properly. To test it, run:

   ```bash
   cats --help
   cdv --help
   ```

   You should get a usage statement for each command. At this point, you're ready to create your new CAT2 coins.

## Secure the Bag (Single Issuance) {#secure-single}

:::tip
If your CAT used a multi-issuance TAIL, then skip to the [next section](#secure-multi).
:::

This section will show you how to create a tree of CAT2 coins that are identical to the original CAT1 coins, in both size and destination puzzle hash (address). We'll start by demonstrating how to do this with single-issuance CATs, which typically (though not always) use the `genesis_by_coin_id` TAIL.

If you are unsure whether your CAT used a single- or multi-issuance TAIL, step 1 will show you how to view the TAIL that was used to create it.

1. Figure out the total number of XCH mojos that were issued for your CAT1.
   - Navigate to [taildatabase.com](https://www.taildatabase.com).
   - Search for your CAT. We'll use Spacebucks for this example.
   - You'll see _Supply_ (and a number) under the title on the right side of your screen. The number indicates the number of tokens issued. However, you need to multiply this number by 1,000 in order to calculate the number of XCH mojos used for the issuance. For example, Spacebucks had an issuance of 1 billion (1,000,000,000) tokens, which is equivalent to 1 trillion (1,000,000,000,000) XCH mojos.

- Click the _Chialisp_ button. This will show you the TAIL that was used for issuance. If it was a single-issuance CAT, it likely used `genesis_by_coin_id`. If you are unsure, compare the TAIL shown with the [TAIL in GitHub](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/puzzles/genesis_by_coin_id.clvm). Take note of this TAIL as you will need to input its hex version in a subsequent step (if you used one of our reference TAILs, then you already have a copy of this file).

2. Sync a Chia wallet that has at least as many XCH mojos as the original issuance.

   :::note

   - You must run Chia `1.5.0` or greater.
   - You can run either the light wallet or a full node.
   - You are recommended to have enough mojos to cover transaction fees for the reissuance. The recommended amount is five hundred thousand (500,000) mojos per coin to be reissued.
   - You are **required** to have a single coin that is large enough to cover the entire reissuance. Even if your XCH balance is sufficient, it may be separated into multiple small coins. The easiest way to ensure that you have a sufficiently large coin is to send a transaction to yourself of at least the total value required.
     :::

3. Use the CAT Admin Tool to select a coin that will be used for issuing the CAT2 tokens.

   From a terminal window you'll need to run the `cats` command. The arguments needed for this command include:

   - `--tail` – The TAIL program that was originally used (usually this is `genesis_by_coin_id`), in hex file format.
   - `--send-to` – Where to send the tokens when they are initially issued. This is a placeholder only – you can enter any XCH address here. The value is required, but it will be ignored.
   - `--amount` – The total number of mojos for this issuance. You need to have this many mojos in your wallet. This number must match the actual number of mojos that were originally issued.
   - `--as-bytes` – This tells the tool to output the spend bundle in bytes instead of JSON.
   - `--select-coin` – This tells the tool to select a specific coin from your wallet.

   The command to run is:

   ```bash
   cats --tail <HEX-FILE> --send-to <ADDRESS> --amount <AMOUNT> --as-bytes --select-coin
   ```

   Here's an example of the command to reissue Spacebucks:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   cats --tail .\reference_tails\genesis_by_coin_id.clsp.hex --send-to xch1rh6punh4fy70y80ef4g89c9hqvm54dtl0fvyc4ejdccp3y6p04fqn5x8x8 --amount 1000000000000 --as-bytes --select-coin
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to xch1rh6punh4fy70y80ef4g89c9hqvm54dtl0fvyc4ejdccp3y6p04fqn5x8x8 --amount 1000000000000 --as-bytes --select-coin
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to xch1rh6punh4fy70y80ef4g89c9hqvm54dtl0fvyc4ejdccp3y6p04fqn5x8x8 --amount 1000000000000 --as-bytes --select-coin
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

   The last line of the output will be something like:

   ```
   Name: 8f4dbff8df3f6aa9303eb47625cf8f09d885f1ad6a2d440582cb6bd45f53d2e8
   ```

   This is the Coin ID of the coin that you will use for reissuance. Keep this value handy.

4. Obtain the target puzzle hash by running the "secure_the_bag" command. The important arguments here are:

   - `--tail` – The TAIL program that was originally used (usually this is `genesis_by_coin_id`), in hex file format.
   - `--amount` – The total number of mojos for this issuance. You need to have this many mojos in your wallet. This number must match the actual number of mojos that were originally issued.
   - `--secure-the-bag-targets-path` – The full path to the CSV file that contains the snapshot of this CAT.
   - `--curry` – The value of `Name:` from the above output. Note that you need to prepend `0x` to this argument, so for the above example, this value would start with `0x8f4`.

   The command to run is:

   ```bash
   secure_the_bag --tail <HEX-FILE> --amount <AMOUNT> --secure-the-bag-targets-path <PATH-TO-CSV-FILE> --prefix xch --curry <COIN-ID>
   ```

   Here's an example of the command to secure the bag for Spacebucks:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   secure_the_bag --tail .\reference_tails\genesis_by_coin_id.clsp.hex --amount 1000000000000 --secure-the-bag-targets-path C:\Users\Username\Downloads\spacebucks.csv --prefix xch --curry 0x8f4dbff8df3f6aa9303eb47625cf8f09d885f1ad6a2d440582cb6bd45f53d2e8
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   secure_the_bag --tail ./reference_tails/genesis_by_coin_id.clsp.hex --amount 1000000000000 --secure-the-bag-targets-path /home/Username/Downloads/spacebucks.csv --prefix xch --curry 0x8f4dbff8df3f6aa9303eb47625cf8f09d885f1ad6a2d440582cb6bd45f53d2e8
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   secure_the_bag --tail ./reference_tails/genesis_by_coin_id.clsp.hex --amount 1000000000000 --secure-the-bag-targets-path /Users/Username/Download/spacebucks.csv --prefix xch --curry 0x8f4dbff8df3f6aa9303eb47625cf8f09d885f1ad6a2d440582cb6bd45f53d2e8
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

   The command will create a tree of coins. This could take a long time, depending on how many coins need to be created. While it's in progress, it will output the percent complete. After it is finished, it will output the puzzle hash and address of the new coin to be created.

   For this example, the final two lines of the output are:

   ```
   Secure the bag root puzzle hash: 17060adf6856d2904c4fe90c9690b710cf758aee5968718e2fbfd12f7b9d817f
   Secure the bag root address: xch19k6cl5syzvxgkgulr7m49v2r57yh0aanm23hrffgd89j4nj3ywhqxadyqr
   ```

   You'll need both of these values later.

5. Push the transaction to the network. This will actually create the coin tree (_Secure the Bag_). The arguments are the same as above, with one exception:

   `--send-to` – The XCH address from the "Secure the bag root address:" of the above output

   The command to run is:

   ```bash
   cats --tail <TAIL hex file> --send-to <root address> --amount <amount in mojos> --as-bytes --curry <0x Coin ID>
   ```

   For this example, the command looks like this:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   cats --tail .\reference_tails\genesis_by_coin_id.clsp.hex --send-to xch19k6cl5syzvxgkgulr7m49v2r57yh0aanm23hrffgd89j4nj3ywhqxadyqr --amount 1000000000000 --as-bytes --curry 0x8f4dbff8df3f6aa9303eb47625cf8f09d885f1ad6a2d440582cb6bd45f53d2e8
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to xch19k6cl5syzvxgkgulr7m49v2r57yh0aanm23hrffgd89j4nj3ywhqxadyqr --amount 1000000000000 --as-bytes --curry 0x8f4dbff8df3f6aa9303eb47625cf8f09d885f1ad6a2d440582cb6bd45f53d2e8
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   cats --tail ./reference_tails/genesis_by_coin_id.clsp.hex --send-to xch19k6cl5syzvxgkgulr7m49v2r57yh0aanm23hrffgd89j4nj3ywhqxadyqr --amount 1000000000000 --as-bytes --curry 0x8f4dbff8df3f6aa9303eb47625cf8f09d885f1ad6a2d440582cb6bd45f53d2e8
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

   You will need to confirm that you want to push the transaction, then you will receive the `Asset ID` and `Eve Coin ID`. For this example, the following was the result:

   ```
   The transaction has been created, would you like to push it to the network? (Y/N)y
   Successfully pushed the transaction to the network
   Asset ID: 9c39398afb1d7ffa03a589f60e5e39f2ae4572ff7048e689fe3128c339581b2d
   Eve Coin ID: 9fe3e95308949cb9c49333f829922dc7118cd3e2fdf365cde669b47852ce3a7b
   ```

   You will need to use both of these values later. At this point, the amount you selected should have been deducted from your wallet in order to secure the bag. However, as this is not a standard transaction, it will not show up in the _Transactions_ section of your wallet GUI.

   After the transaction has been pushed to the blockchain, you will have successfully created a tree of coins that have an identical size and ultimate destination as the original set of CAT1 coins.

## Secure the Bag (Multi Issuance) {#secure-multi}

:::tip
If you have already run `secure_the_bag` for a single-issuance CAT in the [previous section](#secure-single), then you should skip this section and proceed to the next section, [Unwind the Bag](#unwind).
:::

This section will show you how to secure the bag for a multi-issuance CAT that used a `delegated_tail` for its outer puzzle, and a `genesis_by_coin_id` for its inner puzzle. This is the standard way to implement a multi-issuance CAT. If you used custom TAILs for your issuance, then you might still be able to use the commands described here.

:::info
You need to use the same public/private key pair to sign the CAT2 issuance as you used for the CAT1 issuance. Your `Asset ID` will not change between CAT1 and CAT2.
:::

1. Figure out the total number of XCH mojos that were issued for your CAT1.

   - Navigate to [taildatabase.com](https://www.taildatabase.com).
   - Search for your CAT.
   - You'll see _Supply_ (and a number) under the title on the right side of your screen. The number indicates the number of tokens issued. However, you need to multiply this number by 1,000 in order to calculate the number of XCH mojos used for the issuance. In this example, we'll use an issuance of 6 million (6,000,000) tokens, which is equivalent to 6 billion (6,000,000,000) XCH mojos.
   - Click the _Chialisp_ button. This will show you the TAIL that was used for issuance. If it was a multi-issuance CAT, it likely used `delegated_tail`. If you are unsure, compare the TAIL shown with the [TAIL in GitHub](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/wallet/puzzles/delegated_tail.clvm). Take note of this TAIL as you will need to input its hex version in a subsequent step (if you used one of our reference TAILs, then you already have a copy of this file).

2. Sync a Chia wallet that has at least as many XCH mojos as the original issuance.

   :::note

   - You must run Chia `1.5.0` or greater.
   - You can run either the light wallet or a full node.
   - You are recommended to have enough mojos to cover transaction fees for the reissuance. The recommended amount is five hundred thousand (500,000) mojos per coin to be reissued.
   - You are **required** to have a single coin that is large enough to cover the entire reissuance. Even if your XCH balance is sufficient, it may be separated into multiple small coins. The easiest way to ensure that you have a sufficiently large coin is to send a transaction to yourself of at least the total value required.
     :::

3. Use the CAT Admin Tool to select a coin that will be used for issuing the CAT2 tokens.

   From a terminal window you'll need to run the `cats` command. The arguments needed for this command include:

   - `--tail` – The TAIL program that was originally used (usually this is `delegated_tail`), in hex file format.
   - `--send-to` – Where to send the tokens when they are initially issued. This is a placeholder only – you can enter any XCH address here. The value is required, but it will be ignored.
   - `--amount` – The total number of mojos for this issuance. You need to have this many mojos in your wallet. This number must match the actual number of mojos that were originally issued.
   - `--as-bytes` – This tells the tool to output the spend bundle in bytes instead of JSON.
   - `--select-coin` – This tells the tool to select a specific coin from your wallet.

   The command to run is:

   ```bash
   cats --tail <HEX-FILE> --send-to <ADDRESS> --amount <AMOUNT> --as-bytes --select-coin
   ```

   Here's an example of the command:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   cats --tail .\reference_tails\delegated_tail.clsp.hex --send-to xch1rh6punh4fy70y80ef4g89c9hqvm54dtl0fvyc4ejdccp3y6p04fqn5x8x8 --amount 6000000000 --as-bytes --select-coin
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   cats --tail ./reference_tails/delegated_tail.clsp.hex --send-to xch1rh6punh4fy70y80ef4g89c9hqvm54dtl0fvyc4ejdccp3y6p04fqn5x8x8 --amount 6000000000 --as-bytes --select-coin
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   cats --tail ./reference_tails/delegated_tail.clsp.hex --send-to xch1rh6punh4fy70y80ef4g89c9hqvm54dtl0fvyc4ejdccp3y6p04fqn5x8x8 --amount 6000000000 --as-bytes --select-coin
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

   The last line of the output will be something like:

   ```
   Name: 11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6
   ```

   This is the Coin ID of the coin that you will use for reissuance. Keep this value handy.

4. Obtain the target puzzle hash by running the "secure_the_bag" command. The important arguments here are:

   - `--tail` – The TAIL program that was originally used (usually this is `delegated_tail`), in hex file format.
   - `--amount` – The total number of mojos for this issuance. You need to have this many mojos in your wallet. This number must match the actual number of mojos that were originally issued.
   - `--secure-the-bag-targets-path` – The full path to the CSV file that contains the snapshot of this CAT.
   - `--curry` – The value of `Name:` from the above output. Note that you need to prepend `0x` to this argument, so for the above example, this value would start with `0x110`.

   The command to run is:

   ```bash
   secure_the_bag --tail <HEX-FILE> --amount <AMOUNT> --secure-the-bag-targets-path <PATH-TO-CSV-FILE> --prefix xch --curry <COIN-ID>
   ```

   Here's an example of the command to secure the bag:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   secure_the_bag --tail .\reference_tails\delegated_tail.clsp.hex --amount 6000000000 --secure-the-bag-targets-path C:\Users\Username\Downloads\multi.csv --prefix xch --curry 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   secure_the_bag --tail ./reference_tails/delegated_tail.clsp.hex --amount 6000000000 --secure-the-bag-targets-path /home/Username/Downloads/multi.csv --prefix xch --curry 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   secure_the_bag --tail ./reference_tails/delegated_tail.clsp.hex --amount 6000000000 --secure-the-bag-targets-path /Users/Username/Download/multi.csv --prefix xch --curry 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

   The command will create a tree of coins. This could take a long time, depending on how many coins need to be created. While it's in progress, it will output the percent complete. After it is finished, it will output the puzzle hash and address of the new coin to be created.

   For this example, the final two lines of the output are:

   ```
   Secure the bag root puzzle hash: ce663d935a4ca545475eeebff680922c32f496b326ade73a9820e354526449a1
   Secure the bag root address: xch1rd7hejemt57amqtxq8azqg90hgxyhd9shwyjuppq5ez2jn4rlznscn4efy
   ```

   You should now have obtained the `Secure the bag root puzzle hash` and the `Secure the bag root address`.

5. Using the coin ID obtained from the `cats` command above, curry the ID into the `genesis_by_coin_id` puzzle.

   The command to run is:

   ```bash
   cdv clsp curry <HEX-FILE> -a <COIN-ID>
   ```

   In this example, the command will be:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   cdv clsp curry .\reference_tails\genesis_by_coin_id.clsp.hex -a 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   cdv clsp curry ./reference_tails/genesis_by_coin_id.clsp.hex -a 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   cdv clsp curry ./reference_tails/genesis_by_coin_id.clsp.hex -a 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

   The output will be a new CLVM puzzle:

   ```lisp
   (a (q 2 (i 47 (q 8) (q 2 (i (= 45 2) () (q 8)) 1)) 1) (c (q . 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6) 1))
   ```

   You will need to use the resulting puzzle (the output, enclosed in parentheses) in a later step.

6. Run the same `curry` command from the previous step, but add the `--treehash` flag at the end:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   cdv clsp curry .\reference_tails\genesis_by_coin_id.clsp.hex -a 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6 --treehash
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   cdv clsp curry ./reference_tails/genesis_by_coin_id.clsp.hex -a 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6 --treehash
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   cdv clsp curry ./reference_tails/genesis_by_coin_id.clsp.hex -a 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6 --treehash
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

   The output will be the treehash of the puzzle you calculated in the previous step:

   ```
   3a56fa8cdf70dfd0e894af58359d72cb04658a1b0628a4ffe0dcc02099c9863b
   ```

7. Sign the treehash that you just calculated. This will effectively sign the puzzle containing the coin you selected.

   The command to run is:

   ```bash
   chia keys sign -d <TREEHASH> -f <FINGERPRINT> -t m -b
   ```

   Where `<FINGERPRINT>` is the fingerprint of the wallet that holds the coin you previously selected. This fingerprint can be obtained by running `chia keys show`.

   For this example, the command is:

   ```bash
   chia keys sign -d 3a56fa8cdf70dfd0e894af58359d72cb04658a1b0628a4ffe0dcc02099c9863b -f 1131363750 -t m -b
   ```

   The output will be the public key used for signing, as well as the signature obtained:

   ```
   Public key: 8a7afe10d00899b94cf0d407b85e1b9fca21868bcf158563fe9432b60e36db7136055186221fbd27ecc7fc0d5b99ef1b
   Signature: b75390ee21b001b7a721f719ff045e3dc2a1072ab0824a8e75c881398db0fbed8fde5c62bbdfe629dce5da3d77834559016acd6d403f9b90d3102da2e9452461457514088af0cabe0b8a8493fc9c09d1785f1322abc8958ecf7907eba0e0abcc
   ```

8. The final step is to create the coin using the `secure the bag root address` as the target address.

   The command to run is:

   ```
   cats --tail <HEX-FILE> --curry <PUBLIC-KEY> --send-to <Secure the bag root address> --amount <amount in mojos> --as-bytes --solution "<curry command output>" --signature <signature>
   ```

   The arguments needed are:

   - `--tail` – The TAIL program that was originally used (usually this is `delegated_tail`), in hex file format.
   - `--curry` – The public key obtained in the previous step. Be sure to prefix it with `0x`.
   - `--send-to` – The `secure the bag root address`, obtained from in a previous step.
   - `--amount` – The total number of mojos for this issuance. You need to have this many mojos in your wallet. This number must match the actual number of mojos that were originally issued.
   - `--as-bytes` – Output the spend bundle in bytes (don't change this).
   - `--solution` – The output of the `curry` command from a previous step (in quotes).
   - `--signature` – The signature obtained from the previous step.

   For this example, the command to execute is:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   cats --tail .\reference_tails\delegated_tail.clsp.hex --curry 0x8a7afe10d00899b94cf0d407b85e1b9fca21868bcf158563fe9432b60e36db7136055186221fbd27ecc7fc0d5b99ef1b --send-to xch1rd7hejemt57amqtxq8azqg90hgxyhd9shwyjuppq5ez2jn4rlznscn4efy --amount 6000000000 --as-bytes --solution "(a (q 2 (i 47 (q 8) (q 2 (i (= 45 2) () (q 8)) 1)) 1) (c (q . 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6) 1))" --signature b75390ee21b001b7a721f719ff045e3dc2a1072ab0824a8e75c881398db0fbed8fde5c62bbdfe629dce5da3d77834559016acd6d403f9b90d3102da2e9452461457514088af0cabe0b8a8493fc9c09d1785f1322abc8958ecf7907eba0e0abcc
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   cats --tail ./reference_tails/delegated_tail.clsp.hex --curry 0x8a7afe10d00899b94cf0d407b85e1b9fca21868bcf158563fe9432b60e36db7136055186221fbd27ecc7fc0d5b99ef1b --send-to xch1rd7hejemt57amqtxq8azqg90hgxyhd9shwyjuppq5ez2jn4rlznscn4efy --amount 6000000000 --as-bytes --solution "(a (q 2 (i 47 (q 8) (q 2 (i (= 45 2) () (q 8)) 1)) 1) (c (q . 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6) 1))" --signature b75390ee21b001b7a721f719ff045e3dc2a1072ab0824a8e75c881398db0fbed8fde5c62bbdfe629dce5da3d77834559016acd6d403f9b90d3102da2e9452461457514088af0cabe0b8a8493fc9c09d1785f1322abc8958ecf7907eba0e0abcc
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   cats --tail ./reference_tails/delegated_tail.clsp.hex --curry 0x8a7afe10d00899b94cf0d407b85e1b9fca21868bcf158563fe9432b60e36db7136055186221fbd27ecc7fc0d5b99ef1b --send-to xch1rd7hejemt57amqtxq8azqg90hgxyhd9shwyjuppq5ez2jn4rlznscn4efy --amount 6000000000 --as-bytes --solution "(a (q 2 (i 47 (q 8) (q 2 (i (= 45 2) () (q 8)) 1)) 1) (c (q . 0x11038a7e107cb7e17a503ba201d94166018deecd777314e4697c5269d9f37fb6) 1))" --signature b75390ee21b001b7a721f719ff045e3dc2a1072ab0824a8e75c881398db0fbed8fde5c62bbdfe629dce5da3d77834559016acd6d403f9b90d3102da2e9452461457514088af0cabe0b8a8493fc9c09d1785f1322abc8958ecf7907eba0e0abcc
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

   The output of this command will contain the Asset ID and Eve Coin ID for your issuance:

   ```
   Asset ID: cd3f7b65e1c20317ea0586b272262d5d59c1f0ebcab02231f1ec6f738c1953cf
   Eve Coin ID: 06e2afb16c5eebb4c5fbbfe95856cf961dc59a6292b969d5c9f8c8914e57987c
   ```

   You'll need these values in the next section. Note that if the Asset ID doesn't match the original CAT1 Asset ID, then something is wrong.

## Unwind the Bag {#unwind}

:::info
The steps in this section are the same for both single-issuance and multi-issuance CATs.
:::

:::tip
This step will unwind the bag for the entire set of coins. You may wish to run a test by first unwinding the coins due to a specific address; this way you can verify that the unwinding to this address has worked before preceeding with unwinding the whole bag.

[Skip to the next section if you want to run this test.](#test-unwind)
:::

The final step is to actually send the CAT2 tokens to the correct locations (AKA _"unwind the bag"_). This will send coins to each appropriate wallet.

The important values for this command are:

- `--eve-coin-id` – Obtained from the final "secure the bag" command above.
- `--tail-hash` – The `Asset ID:` from the final "secure the bag" command above.
- `--secure-the-bag-targets-path` – The full path to the CSV file that contains the snapshot of this CAT.
- `--unwind-fee` – An optional blockchain fee in mojos, will be applied to each spend.
- `--wallet-id` – The ID of the wallet from which to unwind (typically `1`).

The command to run is:

```bash
unwind_the_bag --eve-coin-id <EVE-COIN-ID> --tail-hash <ASSET-ID> --secure-the-bag-targets-path <PATH-TO-CSV-FILE> --unwind-fee <FEE> --wallet-id <WALLET-ID>
```

For this example, the command to unwind the entire bag is:

```mdx-code-block
<Tabs
  defaultValue="windows"
  groupId="os"
  values={[
    {label: 'Windows', value: 'windows'},
    {label: 'Linux', value: 'linux'},
    {label: 'macOS', value: 'macos'},
  ]}>
  <TabItem value="windows">
```

```powershell
unwind_the_bag --eve-coin-id 9fe3e95308949cb9c49333f829922dc7118cd3e2fdf365cde669b47852ce3a7b --tail-hash 9c39398afb1d7ffa03a589f60e5e39f2ae4572ff7048e689fe3128c339581b2d --secure-the-bag-targets-path C:\Users\Username\Downloads\spacebucks.csv --unwind-fee 500000 --wallet-id 1
```

```mdx-code-block
</TabItem>
<TabItem value="linux">
```

```bash
unwind_the_bag --eve-coin-id 9fe3e95308949cb9c49333f829922dc7118cd3e2fdf365cde669b47852ce3a7b --tail-hash 9c39398afb1d7ffa03a589f60e5e39f2ae4572ff7048e689fe3128c339581b2d --secure-the-bag-targets-path /home/Username/Downloads/spacebucks.csv --unwind-fee 500000 --wallet-id 1
```

```mdx-code-block
  </TabItem>
  <TabItem value="macos">
```

```bash
unwind_the_bag --eve-coin-id 9fe3e95308949cb9c49333f829922dc7118cd3e2fdf365cde669b47852ce3a7b --tail-hash 9c39398afb1d7ffa03a589f60e5e39f2ae4572ff7048e689fe3128c339581b2d --secure-the-bag-targets-path /Users/Username/Downloads/spacebucks.csv --unwind-fee 500000 --wallet-id 1
```

```mdx-code-block
  </TabItem>
</Tabs>
```

This command could take a long time to finish running. Afterward, you will have an exact copy of your CAT1 issuance, but in CAT2 form.

At this point, you can navigate to [taildatabase.com](https://www.taildatabase.com/) and register your new CAT2 token, using the Asset ID obtained from the final step of the Secure the Bag section.

🎉 Congratulations! You've successfully reissued your tokens in the CAT2 standard. 🎉

## Test Run: Unwind the Bag {#test-unwind}

:::info
**Optional:** Before unwinding the bag all at once, you can run a test by sending the correct number of tokens to a single address.
:::

1. We used Spacebucks in the single-issuance example, so we'll obtain the puzzle hash of a wallet that contains some CAT1 Spacebucks. First, run:

   ```bash
   chia keys show
   ```

   This will show the `First wallet address` of the key pair that contains Spacebucks:

   ```
   First wallet address: xch1qzz5xrd05698f2n2tt4qm500kys6p4w79ph7s2xrlau3drfugl3qqh9j4l
   ```

2. Use the `cdv decode` command to obtain the puzzle hash that corresponds to this wallet address:

   ```bash
   cdv decode xch1qzz5xrd05698f2n2tt4qm500kys6p4w79ph7s2xrlau3drfugl3qqh9j4l
   ```

   Which outputs:

   ```
   0085430dafa68a74aa6a5aea0dd1efb121a0d5de286fe828c3ff79168d3c47e2
   ```

3. If you want to verify that the puzzle hash is actually due to receive some tokens, you can check the CSV file. In this case, puzzle hash `0085...` should receive 42 thousand (42,000) barfs.

4. Run the `unwind_the_bag` command to send the appropriate amount to that puzzle hash. Be sure to run this command from the wallet that has the appropriate funds in it.

   The important values for this command are:

   - `--eve-coin-id` – Obtained from the final "secure the bag" command above.
   - `--tail-hash` – The `Asset ID:` from the final "secure the bag" command above.
   - `--secure-the-bag-targets-path` – The full path to the CSV file that contains the snapshot of this CAT.
   - `--unwind-fee` – An optional blockchain fee in mojos, will be applied to each spend.
   - `--wallet-id` – The ID of the wallet from which to unwind (typically `1`).
   - `--unwind-target-puzzle-hash` – The puzzle hash obtained from the `cdv decode` command above.

   The command to run is:

   ```bash
   unwind_the_bag --eve-coin-id <EVE-COIN-ID> --tail-hash <ASSET-ID> --secure-the-bag-targets-path <PATH-TO-CSV-FILE> --unwind-fee <FEE> --wallet-id <WALLET-ID> --unwind-target-puzzle-hash <PUZZLE-HASH>
   ```

   You may have noticed that this command is identical to [the command that unwinds the whole bag](#unwind), with the addition of the `--unwind-target-puzzle-hash` flag that ensures only coins are sent to a specific address.

   In this example, the command to unwind the bag is:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   unwind_the_bag --eve-coin-id 9fe3e95308949cb9c49333f829922dc7118cd3e2fdf365cde669b47852ce3a7b --tail-hash 9c39398afb1d7ffa03a589f60e5e39f2ae4572ff7048e689fe3128c339581b2d --secure-the-bag-targets-path C:\Users\Username\Downloads\spacebucks.csv --unwind-fee 500000 --wallet-id 1 --unwind-target-puzzle-hash 0085430dafa68a74aa6a5aea0dd1efb121a0d5de286fe828c3ff79168d3c47e2
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   unwind_the_bag --eve-coin-id 9fe3e95308949cb9c49333f829922dc7118cd3e2fdf365cde669b47852ce3a7b --tail-hash 9c39398afb1d7ffa03a589f60e5e39f2ae4572ff7048e689fe3128c339581b2d --secure-the-bag-targets-path /home/Username/Downloads/spacebucks.csv --unwind-fee 500000 --wallet-id 1 --unwind-target-puzzle-hash 0085430dafa68a74aa6a5aea0dd1efb121a0d5de286fe828c3ff79168d3c47e2
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   unwind_the_bag --eve-coin-id 9fe3e95308949cb9c49333f829922dc7118cd3e2fdf365cde669b47852ce3a7b --tail-hash 9c39398afb1d7ffa03a589f60e5e39f2ae4572ff7048e689fe3128c339581b2d --secure-the-bag-targets-path /Users/Username/Downloads/spacebucks.csv --unwind-fee 500000 --wallet-id 1 --unwind-target-puzzle-hash 0085430dafa68a74aa6a5aea0dd1efb121a0d5de286fe828c3ff79168d3c47e2
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

   This command could take a long time, depending on the total number of coins to unwind.
   You will need to verify the spend of each individual coin to unwind, and the command will monitor the blockchain for the coin(s) to be spent.

   The end result should be that the appropriate number of coins are sent to the puzzle hash, which you can then verify in your Chia wallet (assuming you control that wallet).

   :::note
   Each puzzle hash in the bag can only receive one airdrop. When you later unwind the bag for each puzzle hash, any puzzle hashes that have already received an airdrop will be skipped. They will _not_ receive a second airdrop.
   :::

5. The puzzle hashes from the CSV file are actually _inner_ puzzle hashes, so searching for them on chain using `cdv rpc coinrecords` is more complex than it normally would be. However, you can still verify that the bag was successfully unwound for that puzzle hash by searching for the hint:

   ```mdx-code-block
   <Tabs
     defaultValue="windows"
     groupId="os"
     values={[
       {label: 'Windows', value: 'windows'},
       {label: 'Linux', value: 'linux'},
       {label: 'macOS', value: 'macos'},
     ]}>
     <TabItem value="windows">
   ```

   ```powershell
   chia rpc full_node get_coin_records_by_hint '{\"hint\": \"<puzzle hash obtained in step 2>\"}'
   ```

   ```mdx-code-block
   </TabItem>
   <TabItem value="linux">
   ```

   ```bash
   chia rpc full_node get_coin_records_by_hint '{"hint": "<puzzle hash obtained in step 2>"}'
   ```

   ```mdx-code-block
     </TabItem>
     <TabItem value="macos">
   ```

   ```bash
   chia rpc full_node get_coin_records_by_hint '{"hint": "<puzzle hash obtained in step 2>"}'
   ```

   ```mdx-code-block
     </TabItem>
   </Tabs>
   ```

   You should see matching coin_records for each entry in the CSV file, along with its corresponding value.

   Now that you've tested unwinding the bag, you can proceed to [unwind the rest of the bag](#unwind).
