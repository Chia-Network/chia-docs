---
title: CAT1 Snapshot Generation
sidebar_label: 2. Snapshot Generation
slug: /guides/cat2-snapshot
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::info
CAT1 will reach its end of life at block 2,311,760, which will occur on July 26, 2022 at around 17:00 UTC.

For more information on this end-of-life process, see the [Intro and FAQ page](/guides/cat2-intro).
:::

This document will show CAT1 issuers how to:

1. Generate a snapshot of their CAT1 status. This will show the puzzle hash (address) and value of each individual token at the end-of-life block height
2. Export their required data from the snapshot

After completing this, CAT issuers will be able to proceed to the [Token Reissuance guide](/guides/cat2-issuance).

## Generate a CAT1 Snapshot {#generate}

:::note
We recommend that you follow this section to generate your own snapshot of your CAT1 tokens. Please note that this process could take over 40 hours to complete. For your convenience and reference, we will also publish our own snapshot, which should be identical to the snapshot that you produce.
:::

This section will show you how to install the [CAT-addresses tool](https://github.com/Chia-Network/CAT-addresses) and use it to get a snapshot of the puzzle hash (address) and value of each coin of a particular CAT1. It can even obtain this info for all CAT1s on Chia's blockchain.'

:::warning
In order to use this tool, you are required to run a fully synced Chia node. This node must be running version 1.5 or greater. Please ensure that you have satisfied both of these requirements before continuing.
:::

1. Open a terminal window and ensure you have direct access to the `chia` command by doing one of the following:

<Tabs
defaultValue="windows"
groupId="os"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux', value: 'linux'},
{label: 'macOS', value: 'macos'},
]}>
<TabItem value="windows">

1.  If you previously installed Chia from a **binary build**, then set up an alias to the `chia` command:

:::caution
Ensure that you replace `<USERNAME>` and `<VERSION>` with the actual folders

:::  

```powershell
Set-Alias -Name chia "C:\Users\<USERNAME>\AppData\Local\chia-blockchain\app-<VERSION>\resources\app.asar.unpacked\daemon\chia.exe"
```

2.  If you previously installed Chia **from source**, then navigate to the `chia-blockchain` directory and activate your virtual environment:

```powershell
.\venv\Scripts\Activate.ps1
```

  </TabItem>
  <TabItem value="linux">

- If you previously installed Chia from a **binary build**, then ensure that the `chia` binary's directory is included in your `PATH`.

1.  If you previously installed Chia from a **binary build**, then ensure that the `chia` binary's directory is included in your `PATH`.

2.  If you previously installed Chia **from source**, then navigate to the `chia-blockchain` directory and activate your virtual environment:

```bash
. ./activate
``` ./activate
```

  </TabItem>
  <TabItem value="macos">

1.  If you previously installed Chia from a **binary build**, then set up an alias to the `chia` command:

```bash
alias chia="/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia"
```

2.  If you previously installed Chia **from source**, then navigate to the `chia-blockchain` directory and activate your virtual environment:

```bash
. ./activate
``` ./activate
```

  </TabItem>
</Tabs>

2. Run the following command:

   ```bash
   chia version
   ```

   If step 1 was successful, you should see a version number in the output, such as `1.5.0`. This is a requirement for the snapshot tool to work.

3. From the same terminal window, create a new directory in which to install the `CAT-addresses` repository (it can be in the parent directory) and run the following:

   ```bash
   git clone https://github.com/Chia-Network/CAT-addresses.git -b main
   ```

4. The following environment variables need to be set in order to use this tool:

   1. `FULL_NODE_HOSTNAME` - The hostname of the full node to call the RPCs against. This can be `localhost`.
   2. `DB_SOURCE_DIR` - The location of the full node database on the host machine.
   3. `START_HEIGHT` - The height of the blockchain to start creating the snapshot from (default: `0`). If you are attempting to obtain all records for your CAT, the recommended start height is `1146800`, which is just before CAT1 was introduced.
   4. `TARGET_HEIGHT` - The height of the blockchain to end the snapshot (no default - must be set). The recommended height is `2311760`, which is the last block at which CAT1 is valid.

   :::caution Running this process with the recommended block heights could take over 40 hours to complete. You may wish to test it first by setting the `TARGET_HEIGHT` to `1146900`. This will pull data from only 100 blocks, which should only take a few seconds.
:::

   In order to set these variables, you are recommended to put them into a file called `.env` at the root of the `CAT-addresses` project. The tool will automatically read the variables in this file. For example:

<Tabs
defaultValue="windows"
groupId="os"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux', value: 'linux'},
{label: 'macOS', value: 'macos'},
]}>
<TabItem value="windows">

```bash title=".env"
FULL_NODE_HOSTNAME=localhost
DB_SOURCE_DIR=C:\Users\Username\.chia\mainnet\db
START_HEIGHT=1146800
TARGET_HEIGHT=2311760
```

  </TabItem>
  <TabItem value="linux">

```bash title=".env"
FULL_NODE_HOSTNAME=localhost
DB_SOURCE_DIR=/home/Username/.chia/mainnet/db
START_HEIGHT=1146800
TARGET_HEIGHT=2311760
```

  </TabItem>
  <TabItem value="macos">

```bash title=".env"
FULL_NODE_HOSTNAME=localhost
DB_SOURCE_DIR=/Users/Username/.chia/mainnet/db
START_HEIGHT=1146800
TARGET_HEIGHT=2311760
```

  </TabItem>
</Tabs>

5. Install dependencies:

<Tabs
defaultValue="windows"
groupId="os"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux', value: 'linux'},
{label: 'macOS', value: 'macos'},
]}>
<TabItem value="windows">

```powershell
python setup.py install
```

  </TabItem>
<TabItem value="linux">

```bash
python3 setup.py install
```

  </TabItem>
  <TabItem value="macos">

```bash
python3 setup.py install
```

  </TabItem>
</Tabs>

:::note
The result may contain several warnings such as `WARNING: The wheel package is not available.` These can be safely ignored.
:::
:::

This command may take a few minutes to complete. At the end of the output, you should see something like:

```
Finished processing dependencies for chia-transaction-exporter==0.1.dev55"
```

6. Install the `dotenv` and `backoff` modules:

   ```bash
   pip install python-dotenv
   pip install backoff
   ```

7. Set up the database:

<Tabs
defaultValue="windows"
groupId="os"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux', value: 'linux'},
{label: 'macOS', value: 'macos'},
]}>
<TabItem value="windows">

```powershell
python setup_database.py
```

  </TabItem>
  <TabItem value="linux">

```bash
python3 setup_database.py
```

  </TabItem>
  <TabItem value="macos">

```bash
python3 setup_database.py
```

  </TabItem>
</Tabs>

:::tip
If you receive an error message such as `ModuleNotFoundError: No module named 'chia'`, then make sure you can run the `chia` command from this directory and try again.
:::
:::

If this command succeeds, then it will output:

```
INFO:setup_database:Setting up database
INFO:setup_database:Database setup complete
```

8. Start the snapshot generator:

<Tabs
defaultValue="windows"
groupId="os"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux', value: 'linux'},
{label: 'macOS', value: 'macos'},
]}>
<TabItem value="windows">

```powershell
python start.py
```

  </TabItem>
  <TabItem value="linux">

```bash
python3 start.py
```

  </TabItem>
  <TabItem value="macos">

```bash
python3 start.py
```

  </TabItem>
</Tabs>

This command will show its progress according to the block height. If you used the recommended range for `START_HEIGHT` and `TARGET_HEIGHT` in your `.env` file, then this command could take over 40 hours to complete. The reason it takes so long is it needs to process each block, one at a time. If multiple blocks were done in parallel, then there would be a chance that the results would not be accurate. By processing one block at a time, the tool will return the correct results for the range provided.

:::note
You can only generate a snapshot for each block once. If you attempt to run this command over a range against which it has already been run, you will receive an error containing this message: If you attempt to run this command over a range against which it has already been run, you will receive an error containing this message:

```
sqlite3.IntegrityError: UNIQUE constraint failed: coin_create.coin_name
```

In this case, you either need to start from a higher height, or (recommended) start over. Follow the [Data Cleanup section](#cleanup) and try again.
:::

## Export Your Data from the Snapshot {#export}

Once you have populated the database with a snapshot, you can run a data export.

1. Navigate to [taildatabase.com](https://www.taildatabase.com/).

2. Search for your CAT. We'll use [CAT King Cole](https://www.taildatabase.com/tail/1121996b75cce3c746369aced2c8887b02b84e95592c3dc006d82a145adf349a) for this example. Note the TAIL hash, which is listed above the title of the token. In this example, it's:

   ```
   1121996b75cce3c746369aced2c8887b02b84e95592c3dc006d82a145adf349a
   ```

3. Generate a CSV file containing all inner puzzle hashes and amounts for your CAT:

<Tabs
defaultValue="windows"
groupId="os"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux', value: 'linux'},
{label: 'macOS', value: 'macos'},
]}>
<TabItem value="windows">

```powershell
python export.py --output-dir <OUTPUT-DIR>\<PREFIX> --tail-hash <TAIL-HASH> --coins
```

    <details>
      <summary>Example command</summary>

```powershell
python export.py --output-dir C:\Users\Username\Chia\CAT-addresses\results\CKC_ --tail-hash 1121996b75cce3c746369aced2c8887b02b84e95592c3dc006d82a145adf349a
```

    </details>

  </TabItem>
<TabItem value="linux">

```bash
python3 export.py --output-dir <OUTPUT-DIR>/<PREFIX> --tail-hash <TAIL-HASH> --coins
```

    <details>
      <summary>Example command</summary>

```bash
python3 export.py --output-dir /home/Username/CAT-addresses/results/CKC_ --tail-hash 1121996b75cce3c746369aced2c8887b02b84e95592c3dc006d82a145adf349a
```

    </details>

  </TabItem>
<TabItem value="macos">

```bash
python3 export.py --output-dir <OUTPUT-DIR>/<PREFIX> --tail-hash <TAIL-HASH> --coins
```

    <details>
      <summary>Example command</summary>

```bash
python3 export.py --output-dir /Users/Username/CAT-addresses/results/CKC_ --tail-hash 1121996b75cce3c746369aced2c8887b02b84e95592c3dc006d82a145adf349a
```

    </details>

  </TabItem>
</Tabs>

:::info

- `<OUTPUT-DIR>` - a directory of your choice in which to save the CSV file
- `<PREFIX>` - a string to be prepended to the output file name
- `<TAIL-HASH>` - the TAIL hash you obtained from taildatabase.com
- `--coins` - an **optional** flag that will add information about individual coins to the output (which might be helpful for auditing purposes)
:::

:::note
This command will not create any directories, so make sure `<OUTPUT-DIR>` already exists before running it. Otherwise, you will receive a `FileNotFoundError`. ::: Otherwise, you will receive a `FileNotFoundError`.
:::

## Fix EOL Characters {#fix-eol}

This step is **required for Windows users**, and not needed for Linux or macOS users.

If you are running on Windows, the CSV file will contain an extra CR (carriage return) character at the end of each line. This will cause ["Secure the Bag"](/guides/cat2-issuance#secure-single) to fail. First, you must convert the CSV file to use UNIX-style end-of-line characters.

The easiest way to accomplish this is with `dos2unix`. This is not included with Windows, so you will need to download it from SourceForge.

Steps to convert the CSV file:

1. Visit the [SourceForge dos2unix site](https://sourceforge.net/projects/dos2unix/).
2. Click the green _"Download"_ button. After five seconds, the `dos2unix` zip file will be downloaded to your Downloads folder.
3. Unzip the `dos2unix` zip file.
4. From a PowerShell window, run:

```powershell
<path to dos2unix.exe> -o <path to CSV file>
```

For example:

```powershell
~\Downloads\dos2unix\bin\dos2unix.exe -o .\results\CKC_1121996b75cce3c746369aced2c8887b02b84e95592c3dc006d82a145adf349a.1658233083.183527.csv
```

This message should appear in the output:

```
dos2unix: converting file <CSV file> to Unix format...
```

5. To verify that the conversion was successful, open the file. There should be no blank lines between the entries.

## Data Cleanup {#cleanup}

**Optional:** If the application exits partway through a run, it will only have imported some blocks at a particular height. You can delete the records from the database at and above a provided height by running the following command:

<Tabs
defaultValue="windows"
groupId="os"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux', value: 'linux'},
{label: 'macOS', value: 'macos'},
]}>
<TabItem value="windows">

```powershell
python clean.py --height <BLOCK-HEIGHT>
```

  </TabItem>
  <TabItem value="linux">

```bash
python3 clean.py --height <BLOCK-HEIGHT>
```

  </TabItem>
  <TabItem value="macos">

```bash
python3 clean.py --height <BLOCK-HEIGHT>
```

  </TabItem>
  </Tabs>

## Export Data for all CATs {#export-all}

**Optional:** If you wish to obtain the balance of all CATs on the Chia blockchain, you can run `export-py` with various different options:

<Tabs
defaultValue="windows"
groupId="os"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux', value: 'linux'},
{label: 'macOS', value: 'macos'},
]}>
<TabItem value="windows">

The `--tail-hash` flag can be dropped, resulting in an output of a single CSV file containing every puzzle hash amount for every CAT on the Chia blockchain:

```powershell
python export.py --output-dir <OUTPUT-DIR>\<PREFIX>
```

The `--coins` flag can be added, which will add information about individual coins:

```powershell
python export.py --output-dir <OUTPUT-DIR>\<PREFIX> --coins
```

The `--explode` flag can be added, which will generate multiple CSV files, each of which containing a single CAT's puzzle hashes and amounts:

```powershell
python export.py --output-dir <OUTPUT-DIR>\<PREFIX> --explode
```

You can also use the `--explode` and `--coins` flags together, which will generate individual CSV files that also contain coin info.

  </TabItem>
  <TabItem value="linux">

The `--tail-hash` flag can be dropped, resulting in an output of a single CSV file containing every puzzle hash amount for every CAT on the Chia blockchain:

```bash
python3 export.py --output-dir <OUTPUT-DIR>/<PREFIX>
```

The `--coins` flag can be added, which will add information about individual coins:

```bash
python3 export.py --output-dir <OUTPUT-DIR>/<PREFIX> --coins
```

The `--explode` flag can be added, which will generate multiple CSV files, each of which containing a single CAT's puzzle hashes and amounts:

```bash
python3 export.py --output-dir <OUTPUT-DIR>/<PREFIX> --explode
```

You can also use the `--explode` and `--coins` flags together, which will generate individual CSV files that also contain coin info.

  </TabItem>
  <TabItem value="macos">

The `--tail-hash` flag can be dropped, resulting in an output of a single CSV file containing every puzzle hash amount for every CAT on the Chia blockchain:

```bash
python3 export.py --output-dir <OUTPUT-DIR>/<PREFIX>
```

The `--coins` flag can be added, which will add information about individual coins:

```bash
python3 export.py --output-dir <OUTPUT-DIR>/<PREFIX> --coins
```

The `--explode` flag can be added, which will generate multiple CSV files, each of which containing a single CAT's puzzle hashes and amounts:

```bash
python3 export.py --output-dir <OUTPUT-DIR>/<PREFIX> --explode
```

You can also use the `--explode` and `--coins` flags together, which will generate individual CSV files that also contain coin info.

  </TabItem>
</Tabs>
