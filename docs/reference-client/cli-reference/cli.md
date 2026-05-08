---
sidebar_label: Overview
title: CLI Overview
slug: /reference-client/cli-reference/cli
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# CLI Commands Reference

This **CLI overview** is the entry point for command-line usage, similar to the [RPC overview](/reference-client/rpc-reference/rpc) for JSON-RPC. It documents global options, where the `chia` binary lives, and links into service CLI pages listed in the [CLI reference map](#related-cli-references).

Always check `chia -h` and `chia <command> -h` for the exact flags your build exposes. Examples:

- `chia -h`
- `chia plots -h`
- `chia plots check -h`
- `chia plotters madmax -h`
- `chia start -h`

Browse [`chia/cmds`](https://github.com/Chia-Network/chia-blockchain/tree/main/chia/cmds) for implementation details.

## Global CLI options {#global-cli-options}

The root `chia` command accepts:

| Option                       | Description                                                                                                       |
| :--------------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `--root-path PATH`           | Configuration and data root (default: platform-specific mainnet directory under `.chia`).                         |
| `--keys-root-path PATH`      | Keyring file root (default: `.chia_keys`).                                                                        |
| `--passphrase-file FILENAME` | Read the keyring passphrase from a file or descriptor so non-interactive runs can unlock the keychain when valid. |

## CLI reference map {#related-cli-references}

**Chain and farming stack** (parallel to full node / farmer / harvester RPC pages):

- [Full Node CLI](/reference-client/cli-reference/full-node-cli): `chia show`, `chia netspace`, `chia peer full_node`
- [Farmer CLI](/reference-client/cli-reference/farmer-cli): `chia farm`, `chia plotnft`, solver connection helpers
- [Harvester CLI](/reference-client/cli-reference/harvester-cli): `chia peer harvester`, plot directories, remote harvester notes
- [Solver CLI](/reference-client/cli-reference/solver-cli): `chia solver`

**Wallet and assets:**

- [Wallet CLI](/reference-client/cli-reference/wallet-cli)
- [Offers](/reference-client/cli-reference/offer-cli)
- [Verifiable Credentials (VC)](/reference-client/cli-reference/vc-cli)
- [Clawback](/reference-client/cli-reference/clawback-cli)
- [Simulator](/reference-client/cli-reference/simulator-cli)
- [Plotters](/reference-client/cli-reference/plotter-cli)
- [Plots CLI](/reference-client/cli-reference/plots-cli)
- [DID](/reference-client/cli-reference/did-cli) and [NFT](/reference-client/cli-reference/nft-cli)
- [DAO CLI](/reference-client/cli-reference/dao-cli) (historical: the DAO wallet was [removed in Chia 2.5.3](https://github.com/Chia-Network/chia-blockchain/blob/main/CHANGELOG.md#253-chia-blockchain-2025-03-25))

**Other:**

- [DataLayer CLI](/reference-client/cli-reference/datalayer-cli) (`chia data`)
- HTTP JSON-RPC from the shell: [RPC overview](/reference-client/rpc-reference/rpc) and per-service pages such as [Wallet RPC](/reference-client/rpc-reference/wallet-rpc)

# Locate the `chia` binary executable

## Mac

If you installed `Chia.app` in your `/Applications` directory, you can find the `chia` binary at `/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia`.

Do a sanity check in `Terminal.app` with the following command:

```bash
/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon/chia -h
```

You can use that if you augment your `PATH` with the following command:

```bash
PATH=/Applications/Chia.app/Contents/Resources/app.asar.unpacked/daemon:$PATH
```

Then, running the `chia -h` command should work.

## Windows

There is more than one `chia.exe` binary; the GUI is `Chia.exe` (two of these!) and the CLI is `chia.exe`. They are found in different places. Note the big C versus the little c.

The CLI is the one this document refers to. A typical per-user install layout (paths can vary by Chia version and install options) is:

```bash
~\AppData\Local\Programs\Chia\resources\app.asar.unpacked\daemon\chia.exe
```

If installed for all users, a common location is:

```bash
C:\Program Files\Chia\resources\app.asar.unpacked\daemon\chia.exe
```

## init {#init}

Source: [`chia/cmds/init.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/init.py)

Command: `chia init`

First, `init` checks for old versions of Chia installed in your ~/.chia directory.

If so, `init` migrates these old files to the new version:

- config (including old SSL files)
- db
- wallet
- Using config.yaml, updates wallet keys and ensures coinbase rewards go to the right wallet puzzlehash.

If no old version exists, `init`:

- Creates a default Chia configuration
- Initializes a new SSL key and cert (for secure communication with the GUI)

## start {#start}

Command: `chia start [OPTIONS] GROUP [GROUP ...]`

Pass one or more **service group** names. The exact mapping is defined in the reference client as [`SERVICES_FOR_GROUP`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/util/service_groups.py) in `chia/util/service_groups.py` (if this table and your install disagree, treat the source file and `chia start -h` as canonical).

**Flags**

`-r, --restart`: Restart of running processes

**Service groups** (internal service names in parentheses where helpful):

:::warning
`chia start all` literally starts every service group, including timelord and timelord launcher. Only use `all` if this machine is intentionally configured to run timelord components.
:::

| Group                    | What gets started                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `all`                    | Full node, wallet, farmer, harvester, timelord, timelord launcher, DataLayer (`chia_data_layer`, `chia_data_layer_http`) |
| `daemon`                 | (no processes; reserved)                                                                                                 |
| `data`                   | Wallet, DataLayer (`chia_data_layer`)                                                                                    |
| `data_layer_http`        | DataLayer HTTP service only                                                                                              |
| `node`                   | Full node only                                                                                                           |
| `harvester`              | Harvester only                                                                                                           |
| `farmer`                 | Full node, wallet, farmer, harvester                                                                                     |
| `farmer-no-wallet`       | Full node, farmer, harvester (no wallet)                                                                                 |
| `farmer-only`            | Farmer service only                                                                                                      |
| `timelord`               | Full node, timelord, timelord launcher                                                                                   |
| `timelord-only`          | Timelord only                                                                                                            |
| `timelord-launcher-only` | Timelord launcher only                                                                                                   |
| `wallet`                 | Wallet only                                                                                                              |
| `introducer`             | Introducer                                                                                                               |
| `simulator`              | Full node (simulator)                                                                                                    |
| `crawler`                | Crawler                                                                                                                  |
| `seeder`                 | Crawler and seeder                                                                                                       |
| `seeder-only`            | Seeder only                                                                                                              |

## plotters {#plotters}

The reference client supports several plotters (including third-party and compressed-plot options). Each plotter has slightly different hardware requirements and may need slightly different options specified.
The cli reference for all plotters can be found in the [Plotters CLI Page](/reference-client/cli-reference/plotter-cli). Learn more about the alternative plotters in the [Alternative Plotters page](/reference-client/plotting/plotting-software).

## plotnft {#plotnft}

`chia plotnft` manages plot NFTs and pool membership through the wallet RPC. Command tables, pooling flows, and more examples are on [Farmer CLI, Plot NFT](/reference-client/cli-reference/farmer-cli#plot-nft).

Subcommands from `chia plotnft -h`:

```text
Usage: chia plotnft [OPTIONS] COMMAND [ARGS]...

Options:
  -h, --help  Show this message and exit.

Commands:
  change_payout_instructions  Change the payout instructions for a pool.
  claim           Claim rewards from a plot NFT
  create          Create a plot NFT
  get_login_link  Create a login link for a pool. To get the launcher id, use plotnft show.
  inspect         Get Detailed plotnft information as JSON
  join            Join a plot NFT to a Pool
  leave           Leave a pool and return to self-farming
  show            Show plotnft information
```

<details>
<summary>Example</summary>

```bash
chia plotnft show
chia plotnft create -s pool -u https://pool.example.com -m 0.00005
chia plotnft create -s local -m 0.00005
```

Response:

```
(Multi-line plot NFT status from `show`, or transaction output from `create` — see [Farmer CLI](/reference-client/cli-reference/farmer-cli#plot-nft) for the full option tables.)
```

</details>

## plots {#plots}

The `chia plots` command group lists configured directories, adds or removes plot search paths, can run legacy `create`, and validates plots with `check`. Full option tables and `plots check` guidance are on [Plots CLI](/reference-client/cli-reference/plots-cli) (including [Plots check](/reference-client/cli-reference/plots-cli#plots-check)). For Bladebit, MadMax, and other external plotters, see [Plotters CLI](/reference-client/cli-reference/plotter-cli).

## db {#db}

The `chia db` commands upgrade the blockchain database format, create a vacuumed backup, or validate an existing file. Paths usually follow `full_node.database_path` in `config.yaml` under your Chia root. Source module: [`chia/cmds/db.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/db.py).

### upgrade {#upgrade}

Implementation: [`db_upgrade_cmd`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/db.py)

Functionality: Upgrade a v1 blockchain SQLite database to the v2 format.

Usage: `chia db upgrade [OPTIONS]`

Options:

| Short Command | Long Command         | Type | Required | Description                                                                                            |
| :------------ | :------------------- | :--- | :------- | :----------------------------------------------------------------------------------------------------- |
|               | `--input`            | PATH | False    | Input database file (defaults follow the upgrade tool when omitted).                                   |
|               | `--output`           | PATH | False    | Output database file (must not exist unless the workflow allows overwriting).                          |
|               | `--no-update-config` | None | False    | Do not update `config.yaml` to point at the new database (also applies with many custom output paths). |
|               | `--force`            | None | False    | Force conversion despite warnings.                                                                     |
| `-h`          | `--help`             | None | False    | Show a help message and exit.                                                                          |

**Database upgrade notes**

- This will upgrade your database from version 1 to version 2, which is around 45% smaller and slightly faster.
- The upgrade could take several hours to complete. Use at your own leisure.
- You do not need to stop your Chia node while performing the upgrade.
- The new database file will be written to the same folder as the original. The current size requirement (2nd quarter 2022) is around 55 GB. _Note that the database is always growing, so the size requirement for the v2 database will have gone up by the time you are reading this, so plan free disk space accordingly._ After the version 2 file has been created, you can stop Chia and move/delete your version 1 file, which will free up enough space to move your version 2 file to the original folder. Finally, update the references in config.yaml to point to your version 2 file.
- After the upgrade has completed, run `chia start farmer -r`. This will restart your farmer, and begin using your new database. Note that it will have the same peak as version 1 at the time you _initiated_ the upgrade. Your node will still need to run a short sync to fetch the remaining blocks that had gotten added while the upgrade was being performed.
- For more information on the new database version, see our [FAQ](https://docs.chia.net/chia-blockchain/resources/faq/#what-is-the-new-database).

<details>
<summary>Example</summary>

```bash
chia db upgrade
chia db upgrade --input ~/.chia/mainnet/db/blockchain_v1_mainnet.sqlite --output ~/.chia/mainnet/db/blockchain_v2_mainnet.sqlite
```

Response:

```
(Progress and completion messages from the upgrade tool; failures print FAILED: … with a reason.)
```

</details>

### backup {#backup}

Implementation: [`db_backup_cmd`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/db.py)

Functionality: Create a vacuumed backup of the blockchain database using SQLite `VACUUM INTO`.

Usage: `chia db backup [OPTIONS]`

Options:

| Short Command | Long Command    | Type | Required | Description                                                    |
| :------------ | :-------------- | :--- | :------- | :------------------------------------------------------------- |
|               | `--backup_file` | PATH | False    | Backup destination path (default next to the active database). |
|               | `--no_indexes`  | None | False    | Create backup without indexes.                                 |
| `-h`          | `--help`        | None | False    | Show a help message and exit.                                  |

**Database backup notes**

- This will vacuum (compress) and backup your database and may take several hours to complete. Use at your own leisure.
- You do not need to stop your Chia node during backup.
- The new database file will be written to the same folder as the original with `vacuumed_` prepended to the name unless you pass `--backup_file`.
- To use the backup database: close the Chia client, remove or rename the main database, rename the backup to replace it, and restart the client. The first start may take longer while the client verifies the file.

<details>
<summary>Example</summary>

```bash
chia db backup
chia db backup --backup_file ~/chia-db-backup.sqlite
```

Response:

```
(Status lines from the vacuum/backup step; long runs may take hours on large databases.)
```

</details>

### validate {#validate}

Implementation: [`db_validate_cmd`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/db.py)

Functionality: Validate the v2 blockchain database structure (does not verify proofs).

Usage: `chia db validate [OPTIONS]`

Options:

| Short Command | Long Command        | Type | Required | Description                                                                 |
| :------------ | :------------------ | :--- | :------- | :-------------------------------------------------------------------------- |
|               | `--db`              | PATH | False    | Database file to validate (defaults to the configured blockchain database). |
|               | `--validate-blocks` | None | False    | Also validate encoded blocks and block records (slower).                    |
| `-h`          | `--help`            | None | False    | Show a help message and exit.                                               |

**Database validate notes**

- Validation may take several hours on a full chain database.
- You do not need to stop your Chia node while validating.
- Processing starts from the tip and walks toward genesis.

<details>
<summary>Example</summary>

```bash
chia db validate
chia db validate --validate-blocks
```

Response:

```
(Validation progress from tip toward genesis; failures print FAILED: … .)
```

</details>

## keys {#keys}

## [derive](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/keys.py)

Command: `chia keys derive [OPTIONS] COMMAND [ARGS]`

**Flags**

`-f`, `--fingerprint` `[INTEGER]`: The fingerprint of the key you want to use.

`--mnemonic-seed-filename` `[TEXT]`: The filename containing the mnemonic seed of the master key to derive from.

**Notes on deriving keys**

- This command will display or search for derived keys or wallet-addresses.
- This command requires either a fingerprint or a mnemonic seed file.
- The valid values for `COMMAND` are `child-key`, `search`, and `wallet-address`.
- See below for details and example commands.

### [child-key](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/keys.py)

Command: `chia keys derive child-key [OPTIONS]`

**Flags**

`-t`, `--type` `[farmer|pool|wallet|local|backup|singleton|pool_auth]`: Type of child key to derive.

`-p`, `--derive-from-hd-path` `[TEXT]`: Derive child keys rooted from a specific HD path. Indices ending in an 'n' indicate that non-observer derivation should used at that index.
<br/>
Example HD path: m/12381n/8444n/2/

`-i`, `--index` `[INTEGER]`: Index of the first child key to derive. (Index 0 is the first child key.)

`-n`, `--count` `[INTEGER]`: Number of child keys to derive, starting at index.

`-d`, `--non-observer-derivation`: Derive keys using non-observer derivation. [default: False]

`-s`, `--show-private-keys`: Display derived private keys. [default: False]

`--show-hd-path`: Show the HD path of the derived wallet addresses. [default: False]

**Examples**

- Show the first singleton pubkey: `chia keys derive -f <fingerprint> child-key -t singleton`

- Show a pair of public and private keys derived from a mixed observer/non-observer HD path using an imported key's mnemonic seed: `chia keys derive --mnemonic-seed-filename <(chia keys generate_and_print | sed -n 2p) child-key --derive-from-hd-path 'm/12381n/8444n/2/' --show-private-keys --show-hd-path`

- Generate a mnemonic seed and show the farmer pubkeys 10-14 derived from that seed: `chia keys derive --mnemonic-seed-filename <(chia keys generate_and_print | sed -n 2p) child-key -i 10 -n 5 -t farmer`

### [search](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/keys.py)

Command: `chia keys derive search [OPTIONS] [SEARCH_TERMS]...`

**Flags**

`-l`, `--limit` `[INTEGER]`: Limit the number of derivations to search against. [default: 100]

`-d`, `--non-observer-derivation`: Search will be performed against keys derived using non-observer derivation. [default: False]

`-P`, `--show-progress`: Show search progress. [default: False]

`-t`, `--search-type` `[public_key|private_key|address|all]`: Limit the search to include just the specified types. [default: address, public_key]

`-p`, `--derive-from-hd-path` `[TEXT]`: Search for items derived from a specific HD path. Indices ending in an 'n' indicate that non-observer derivation should used at that index. Example HD path: m/12381n/8444n/2/

**Examples**

- Search for a wallet address: `chia keys derive search -t address -l 100 <xch address>`

### [wallet-address](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/keys.py)

Command: `chia keys derive wallet-address [OPTIONS]`

**Flags**

`-i`, `--index` `[INTEGER]`: Index of the first wallet address to derive. Index 0 is the first wallet address.

`-n`, `--count` `[INTEGER]`: Number of wallet addresses to derive, starting at index.

`-x`, `--prefix` `[TEXT]`: Address prefix (xch for mainnet, txch for testnet).

`-d`, `--non-observer-derivation`: Derive wallet addresses using non-observer derivation. [default: False]

`--show-hd-path`: Show the HD path of the derived wallet addresses. If non-observer-derivation is specified, path indices will have an 'n' suffix. [default: False]

**Examples**

- Show first 10 wallet addresses:

  `chia keys derive -f <fingerprint> wallet-address -i 0 -n 10 --show-hd-path`

---

# DID

See our [official DID reference](/reference-client/cli-reference/did-cli).

---

# NFT

See our [official NFT reference](/reference-client/cli-reference/nft-cli).

---

## dev {#dev}

Developer-focused commands (experimental or diagnostic). Mempool helpers below target Chia 2.5.5 and later. For the simulator service, see [Simulator CLI](/reference-client/cli-reference/simulator-cli).

### mempool

The `chia dev mempool` commands manage or inspect mempool data for development and testing.

### import

Command: `chia dev mempool import [OPTIONS]`

Imports mempool data from a file. This is useful for testing and development purposes.

**Flags**

`-f, --file PATH`: Path to the mempool data file to import.

**Example**

```bash
chia dev mempool import -f mempool_data.json
```

### export

Command: `chia dev mempool export [OPTIONS]`

Exports current mempool data to a file. This can be used for analysis or to share mempool state.

**Flags**

`-f, --file PATH`: Path where the exported mempool data will be saved.

**Example**

```bash
chia dev mempool export -f mempool_export.json
```

### benchmark

Command: `chia dev mempool benchmark [OPTIONS]`

Benchmarks mempool performance and provides metrics for optimization analysis.

**Flags**

`-n, --num-iterations INTEGER`: Number of benchmark iterations to run. [default: 100]

**Example**

```bash
chia dev mempool benchmark -n 1000
```

**Note**: These commands are primarily intended for developers and advanced users. Use with caution in production environments.

---

## data (DataLayer) {#data-datalayer}

The `chia data` command group is the CLI for the Chia DataLayer. For the full subcommand list and examples, see the [DataLayer CLI reference](/reference-client/cli-reference/datalayer-cli).

---

## solver {#solver}

The `chia solver` command group queries the standalone Solver service. See [Solver CLI](/reference-client/cli-reference/solver-cli). To attach the farmer to a solver peer via RPC, see `connect_to_solver` on [Farmer RPC](/reference-client/rpc-reference/farmer-rpc). CLI helper: [`chia farm connect-solver`](/reference-client/cli-reference/farmer-cli#chia-farm-connect-solver).

---

## configure {#configure}

Usage: `chia configure [OPTIONS]`

Writes updates to `config.yaml` under your Chia root. Restart running services after changes. Source: [`chia/cmds/configure.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/configure.py).

| Option                                         | Description                                                       |
| :--------------------------------------------- | :---------------------------------------------------------------- |
| `-t`, `--testnet`                              | `true`/`t` or `false`/`f` for testnet profile.                    |
| `--set-node-introducer`                        | Introducer `IP:Port` for the node.                                |
| `--set-farmer-peer`                            | Farmer address for a remote harvester (`IP:Port`).                |
| `--set-solver-peer`                            | Solver `IP:Port` for the farmer.                                  |
| `--set-solver-trusted-peers-only`              | `true`/`false` for solver trusted-peer mode.                      |
| `--set-fullnode-port`                          | Full node port (updates related peer defaults).                   |
| `--set-harvester-port`                         | Harvester port.                                                   |
| `--set-log-level`, `--log-level`, `-log-level` | One of `CRITICAL`, `ERROR`, `WARNING`, `INFO`, `DEBUG`, `NOTSET`. |
| `--enable-upnp`, `--upnp`, `-upnp`             | Enable or disable UPnP (`true`/`false`).                          |
| `--set_outbound-peer-count`                    | Target outbound peer count.                                       |
| `--set-peer-count`                             | Target peer count.                                                |
| `--set-peer-connect-timeout`                   | Peer connect timeout (seconds).                                   |
| `--crawler-db-path`                            | Crawler database path.                                            |
| `--crawler-minimum-version-count`              | Crawler minimum version reporting threshold.                      |
| `--seeder-domain-name`                         | Seeder DNS domain.                                                |
| `--seeder-nameserver`                          | Seeder nameserver.                                                |

## passphrase {#passphrase}

Usage: `chia passphrase COMMAND`

Manage the keyring passphrase (`set`, `remove`, and related subcommands). Source: [`chia/cmds/passphrase.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/passphrase.py). Run `chia passphrase -h`. Optional files `--passphrase-file` and `--current-passphrase-file` avoid interactive prompts.

## stop {#stop}

Usage: `chia stop [OPTIONS] GROUP [GROUP ...]`

Stops service groups via the daemon. Use `-d` / `--daemon` to stop the daemon itself. `GROUP` values match the same service groups as **`chia start`** (see the **start** section on this page). Source: [`chia/cmds/stop.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/stop.py).

---

## Top-level command index

Every command below is registered on the root CLI in [`chia/cmds/chia.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/chia.py) (along with `version` and `run_daemon` in the same file). Run `chia <command> -h` for subcommands and flags. Your local `chia -h` may list commands in a different order than this table.

| Command      | Summary                                                            | Documented on this site                                                                                                                                                                                                                             |
| :----------- | :----------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `completion` | Generate shell completion scripts                                  | Run `chia completion -h`.                                                                                                                                                                                                                           |
| `configure`  | Modify `config.yaml` (testnet, peers, ports, logging, and similar) | [configure](#configure).                                                                                                                                                                                                                            |
| `data`       | DataLayer CLI                                                      | [DataLayer CLI](/reference-client/cli-reference/datalayer-cli) and [data (DataLayer)](#data-datalayer) above.                                                                                                                                       |
| `db`         | Blockchain database upgrade, backup, validate                      | [Database commands](#db).                                                                                                                                                                                                                           |
| `dev`        | Developer tools (simulator, mempool tools, …)                      | [dev](#dev) (mempool); full simulator: [Simulator CLI](/reference-client/cli-reference/simulator-cli).                                                                                                                                              |
| `farm`       | Farm status and operations                                         | [Farmer CLI](/reference-client/cli-reference/farmer-cli); example: `chia farm summary` under [Checking Logs and Status](#checking-logs-and-status).                                                                                                 |
| `init`       | Create or migrate configuration                                    | [init](#init).                                                                                                                                                                                                                                      |
| `keys`       | Key management and derivation                                      | [keys](#keys).                                                                                                                                                                                                                                      |
| `netspace`   | Estimate total network space                                       | [Full Node CLI](/reference-client/cli-reference/full-node-cli) (`chia netspace`).                                                                                                                                                                   |
| `passphrase` | Keyring passphrase                                                 | [passphrase](#passphrase).                                                                                                                                                                                                                          |
| `peer`       | List or change peer connections                                    | [Full Node CLI](/reference-client/cli-reference/full-node-cli) (`peer full_node`), [Farmer CLI](/reference-client/cli-reference/farmer-cli), [Harvester CLI](/reference-client/cli-reference/harvester-cli); run `chia peer -h` for all node types. |
| `plotnft`    | Plot NFT (pooling)                                                 | [plotnft](#plotnft) and [Farmer CLI](/reference-client/cli-reference/farmer-cli#plot-nft).                                                                                                                                                          |
| `plots`      | Plot directories and plot checks                                   | [plots](#plots), [Plots CLI](/reference-client/cli-reference/plots-cli).                                                                                                                                                                            |
| `plotters`   | Launch bundled and third-party plotters                            | [plotters](#plotters).                                                                                                                                                                                                                              |
| `rpc`        | Call JSON-RPC from the shell (“RPC client”)                        | [RPC introduction](/reference-client/rpc-reference/rpc); run `chia rpc -h` for CLI usage.                                                                                                                                                           |
| `run_daemon` | Run the Chia daemon process                                        | Used when starting services; run `chia run_daemon -h`.                                                                                                                                                                                              |
| `show`       | Show blockchain and node status                                    | [Full Node CLI](/reference-client/cli-reference/full-node-cli); example: `chia show -s` below.                                                                                                                                                      |
| `solver`     | Talk to the Solver service                                         | [solver](#solver), [Solver CLI](/reference-client/cli-reference/solver-cli).                                                                                                                                                                        |
| `start`      | Start service groups                                               | [start](#start).                                                                                                                                                                                                                                    |
| `stop`       | Stop service groups or daemon                                      | [stop](#stop).                                                                                                                                                                                                                                      |
| `version`    | Print the installed client version                                 | Run `chia version`.                                                                                                                                                                                                                                 |
| `wallet`     | Wallet, offers, NFTs, DIDs, VCs, clawback, …                       | [Wallet CLI](/reference-client/cli-reference/wallet-cli) and [CLI reference map](#related-cli-references).                                                                                                                                          |

Non-group commands on the same root CLI:

| Command | Summary              | Documented on this site                                                                                       |
| :------ | :------------------- | :------------------------------------------------------------------------------------------------------------ |
| `beta`  | Beta-program helpers | Hidden from default `chia -h` in upstream (`chia/cmds/beta.py`). Run `chia beta -h` if your build exposes it. |

The following sample output is aligned with a typical `chia` root help listing. The `beta` command is omitted there because it is hidden unless exposed by your build.

```sh
$ chia

Options:
  --root-path PATH            Config file root
                              [default: ~\.chia\mainnet]
  --keys-root-path PATH       Keyring file root
                              [default: ~\.chia_keys]
  --passphrase-file FILENAME  File or descriptor to read the keyring
                              passphrase from
  -h, --help                  Show this message and exit.

Commands:
  completion    Generate shell completion
  configure     Modify configuration
  data          Manage your data (DataLayer)
  db            Manage the blockchain database
  dev           Developer commands and tools
  farm          Manage your farm
  init          Create or migrate the configuration
  keys          Manage your keys
  netspace      Estimate total farmed space on the network
  passphrase    Manage your keyring passphrase
  peer          Show, or modify peering connections
  plotnft       Manage your plot NFTs
  plots         Manage your plots
  plotters      Advanced plotting options
  rpc           RPC Client
  run_daemon    Runs chia daemon
  show          Show node information
  solver        Manage your solver
  start         Start service groups
  stop          Stop services
  version       Show chia version
  wallet        Manage your wallet

```

To see what you can do with each of these commands, use the help flag `-h`. For example, `chia show -h`.

To check your full node status, do `chia show -s` and you'll see something like this. To figure how close
you are look at your height. Once fully synced it'll say `Full Node Synced` at the top.

```
Current Blockchain Status: Full Node Synced

Peak: Hash: 34554a10aff6b52545623e18667c9487758fa93a3b2345974da0d263939189dc
      Time: Tue Mar 23 2021 20:54:46 JST                  Height:      19882

Estimated network space: 136.225 PiB
Current difficulty: 9
Current VDF sub_slot_iters: 112197632
Total iterations since the start of the blockchain: 63291534050

  Height: |   Hash:
    19882 | 34554a10aff6b52545623e18667c9487758fa93a3b2345974da0d263939189dc
    19881 | f53c052cd7ac58539ff5c35cb9d515bc521308a49cec7566b23dba84f76009d8
    19880 | 924d825a7fdbfd61e4582efbbe1d977bb554b368eea58c349a71e688e43fcc49

```

You can add and remove directories for your plots with `chia plots add -d 'your_dir'` or `chia plots remove -d 'your_dir'`, help can be found for respective add/remove with `chia plots add/remove -h`

## Checking Logs and Status {#checking-logs-and-status}

You can check contents of your wallet with: `chia wallet`, and status of your farmer with `chia farm summary`.

Check harvester and farmer logs: `grep ~/.chia/mainnet/log/debug.log -e harvester`

Sample result:

```
17:08:03.191 harvester harvester_server        : INFO     <- harvester_handshake from peer 214b269a425b8223cb50fbd458dab056599348e255f07a018c13ea9efb509ee5 127.0.0.1
17:08:03.194 farmer farmer_server              : INFO     -> harvester_handshake to peer 127.0.0.1 65f3fa0b0407a07da8ccf04dfa0f64c28f714726312aa051d3a8529390db4d7a
17:08:03.218 harvester src.plotting.plot_tools : INFO     Searching directories ['/home/user/slab1/plots']
17:08:03.227 harvester src.plotting.plot_tools : INFO     Found plot /home/user/slab1/plots/plot-k32-2021-01-11-17-26-bf2363828e469a3417b89eb98cfa9d694809e1ce8bef0ffd1d12853d4227aa0a.plot of size 32
17:08:03.227 harvester src.plotting.plot_tools : INFO     Loaded a total of 1 plots of size 0.09895819725716137 TiB
```

Maybe follow logs: `tail -F ~/.chia/mainnet/log/debug.log`. Chia is nice enough to rotate logs for you.
