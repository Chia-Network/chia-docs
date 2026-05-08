---
sidebar_label: Plots
title: Plots CLI
slug: /reference-client/cli-reference/plots-cli
---

This document lists `chia plots` commands for plot directories, legacy in-process `create`, and `check` validation. For MadMax, Bladebit, and other external plotters, see [Plotters CLI](/reference-client/cli-reference/plotter-cli).

Sources: [`chia/cmds/plots.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plots.py), [`chia/plotting/check_plots.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/plotting/check_plots.py), [`chia/plotting/create_plots.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/plotting/create_plots.py).

## Reference

## `chia plots show`

Functionality: Print configured plot search directories from `config.yaml` (the same paths the harvester uses).

Usage: `chia plots show`

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia plots show
```
````

Response:

Output is printed by [`show_plots`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plots.py):

````mdx-code-block
```text
Directories where plots are being searched for:
Note that subdirectories must be added manually
Add with 'chia plots add -d [dir]' and remove with 'chia plots remove -d [dir]' Scan and check plots with 'chia plots check'

/home/user/plots
```
````

(Additional lines list each configured directory; only non-empty paths appear after the blank line.)

</details>

---

## `chia plots add`

Functionality: Register a directory so the harvester includes it when farming.

Usage: `chia plots add [OPTIONS]`

Options:

| Short Command | Long Command  | Type | Required | Description                         |
| :------------ | :------------ | :--- | :------- | :---------------------------------- |
| `-d`          | `--final_dir` | PATH | False    | Plot directory to add. Default `.`. |
| `-h`          | `--help`      | None | False    | Show a help message and exit        |

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia plots add -d /mnt/chia/plots
```
````

Response:

[`add_cmd`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plots.py) prints on success:

````mdx-code-block
```text
Successfully added: /mnt/chia/plots
```
````

Invalid paths raise before printing (`Path doesn't exist`, etc., from [`add_plot_directory`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/util/harvester_config.py)).

</details>

---

## `chia plots remove`

Functionality: Remove a directory from the configured plot search list.

Usage: `chia plots remove [OPTIONS]`

Options:

| Short Command | Long Command  | Type | Required | Description                            |
| :------------ | :------------ | :--- | :------- | :------------------------------------- |
| `-d`          | `--final_dir` | PATH | False    | Plot directory to remove. Default `.`. |
| `-h`          | `--help`      | None | False    | Show a help message and exit           |

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia plots remove -d /mnt/old-plots
```
````

Response:

[`remove_cmd`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plots.py) calls [`remove_plot_directory`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/util/harvester_config.py) only; there is **no** `print` on success, so stdout is empty.

</details>

---

## `chia plots create`

Functionality: Legacy in-process plotting (Chiapos-style). Most users should use [Plotters CLI](/reference-client/cli-reference/plotter-cli) instead.

Usage: `chia plots create [OPTIONS]`

Options:

| Short Command | Long Command              | Type    | Required | Description                                                                                  |
| :------------ | :------------------------ | :------ | :------- | :------------------------------------------------------------------------------------------- |
| `-k`          | `--size`                  | INTEGER | False    | Plot k-size [default: 32]                                                                    |
|               | `--override-k`            | None    | False    | Allow k smaller than 32 (no short flag)                                                      |
| `-n`          | `--num`                   | INTEGER | False    | Number of plots [default: 1]                                                                 |
| `-b`          | `--buffer`                | INTEGER | False    | Sort buffer MB [default: 3389]                                                               |
| `-r`          | `--num_threads`           | INTEGER | False    | Threads [default: 2]                                                                         |
| `-u`          | `--buckets`               | INTEGER | False    | Buckets [default: 128]                                                                       |
| `-a`          | `--alt_fingerprint`       | INTEGER | False    | Alternative key fingerprint                                                                  |
| `-c`          | `--pool_contract_address` | TEXT    | False    | Pool contract address (only used if alternative fingerprint and pool public key are not set) |
| `-f`          | `--farmer_public_key`     | TEXT    | False    | Farmer public key hex                                                                        |
| `-p`          | `--pool_public_key`       | TEXT    | False    | Pool public key hex                                                                          |
| `-t`          | `--tmp_dir`               | PATH    | False    | Temp directory [default: `.`]                                                                |
| `-2`          | `--tmp2_dir`              | PATH    | False    | Second temp directory                                                                        |
| `-d`          | `--final_dir`             | PATH    | False    | Final plot directory [default: `.`]                                                          |
| `-i`          | `--plotid`                | TEXT    | False    | Plot ID hex (debug)                                                                          |
| `-m`          | `--memo`                  | TEXT    | False    | Memo hex (debug)                                                                             |
| `-e`          | `--nobitfield`            | None    | False    | Disable bitfield                                                                             |
| `-x`          | `--exclude_final_dir`     | None    | False    | Do not add final dir to harvester plot list                                                  |
| `-h`          | `--help`                  | None    | False    | Show a help message and exit                                                                 |

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia plots create -k 32 -n 1 -t /tmp/chia -d /plots/final
```
````

Response:

Chiapos progress goes to logging. After plotting, [`create_plots`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/plotting/create_plots.py) emits summary lines such as:

````mdx-code-block
```text
Summary:
Created a total of 1 new plots
plot-k32-2024-01-15-xxxxx.plot
```
````

(Exact filenames and timestamps vary; intermediate output comes from `DiskPlotter` / chiapos.)

</details>

---

## `chia plots check` {#plots-check}

Functionality: Validate plots against keys and run repeated challenges to compare observed versus expected proofs.

Usage: `chia plots check [OPTIONS]`

Options:

| Short Command | Long Command        | Type    | Required | Description                                                |
| :------------ | :------------------ | :------ | :------- | :--------------------------------------------------------- |
| `-n`          | `--num`             | INTEGER | False    | Challenges per plot; omitted uses 30 (same as CLI default) |
| `-g`          | `--grep_string`     | TEXT    | False    | Only check paths or filenames containing this substring    |
| `-l`          | `--list_duplicates` | None    | False    | List plots that share the same plot ID                     |
|               | `--debug-show-memo` | None    | False    | Print memo used to recreate the plot                       |
|               | `--challenge-start` | INTEGER | False    | Alternate starting challenge index                         |
| `-h`          | `--help`            | None    | False    | Show a help message and exit                               |

`-g` is case-sensitive. If omitted, all plot directories from `config.yaml` are scanned.

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia plots check -n 30 -g DriveA
```
````

Response:

[`check_plots`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/plotting/check_plots.py) logs progress (default log level INFO). Representative lines:

````mdx-code-block
```text
Loading plots in config.yaml using plot_manager loading code (parallel read: true)

Starting to test each plot with 30 challenges each

Testing plot /plots/foo/plot-k32-....plot k=32
	Pool contract address:   xch1...
	Farmer public key:       ...
	Local sk:                ...
	Looking up qualities took: 12 ms. Filepath: /plots/foo/plot-k32-....plot
```
````

(Per-plot lines repeat; proof counts and ratios appear in later log lines.)

</details>

<details>
<summary>Example</summary>

````mdx-code-block
```bash
chia plots check -l -n 0
```
````

Response:

With `-l`, [`find_duplicate_plot_IDs`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/plotting/util.py) logs duplicates; with `-n 0` no challenges run after duplicate detection. Example duplicate warning shape:

````mdx-code-block
```text
Checking for duplicate Plot IDs
Plot filenames expected to end with -[64 char plot ID].plot
abc...69chars....plot found in multiple files:
	/path/first.plot
	/path/second.plot
```
````

If there are no duplicate IDs, you may only see the initial “Checking for duplicate Plot IDs” messages.

</details>

### Interpreting proof ratios

If the ratio of full proofs to expected proofs is greater than 1, the plot looked lucky for this static challenge run; if less than 1, it looked unlucky. That does not mean the plot is invalid on chain. As `-n` increases, the ratio should stabilize. Plot count and k-size matter far more for winning than small swings from `plots check`.

For DiskProver internals, see [chiapos](https://github.com/Chia-Network/chiapos/blob/main/src/prover_disk.hpp).

---

## Related

- [CLI overview](/reference-client/cli-reference/cli)
- [Plotters CLI](/reference-client/cli-reference/plotter-cli)
- [Harvester CLI](/reference-client/cli-reference/harvester-cli)
