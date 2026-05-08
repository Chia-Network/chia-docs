---
sidebar_label: Plots
title: Plots CLI
slug: /reference-client/cli-reference/plots-cli
---

This document describes the `chia plots` command group for listing plot directories, adding and removing search paths, legacy `create`, and `check` validation. For Bladebit, MadMax, and other external plotters, see [Plotters CLI](/reference-client/cli-reference/plotter-cli).

Sources: [`chia/cmds/plots.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/plots.py), [`chia/plotting/check_plots.py`](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/plotting/check_plots.py).

## `chia plots show`

Functionality: Print configured plot search directories from `config.yaml` (same paths the harvester uses).

Usage: `chia plots show`

<details>
<summary>Example</summary>

```bash
chia plots show
```

</details>

## `chia plots add`

Functionality: Register a directory so the harvester searches it for plots.

Usage: `chia plots add [OPTIONS]`

| Option              | Type | Required | Description                          |
| :------------------ | :--- | :------- | :----------------------------------- |
| `-d`, `--final_dir` | PATH | False    | Plot directory to add (default `.`). |

<details>
<summary>Example</summary>

```bash
chia plots add -d /mnt/chia/plots
```

</details>

## `chia plots remove`

Functionality: Remove a directory from the configured plot search list.

Usage: `chia plots remove [OPTIONS]`

| Option              | Type | Required | Description                             |
| :------------------ | :--- | :------- | :-------------------------------------- |
| `-d`, `--final_dir` | PATH | False    | Plot directory to remove (default `.`). |

<details>
<summary>Example</summary>

```bash
chia plots remove -d /mnt/old-plots
```

</details>

## `chia plots create`

Functionality: Legacy in-process plotting (Chiapos-style). Most users prefer [Plotters CLI](/reference-client/cli-reference/plotter-cli) instead.

Usage: `chia plots create [OPTIONS]`

| Option                          | Type    | Required | Description                                  |
| :------------------------------ | :------ | :------- | :------------------------------------------- |
| `-k`, `--size`                  | INTEGER | False    | Plot k-size (default 32).                    |
| `--override-k`                  | flag    | False    | Allow k-size smaller than 32.                |
| `-n`, `--num`                   | INTEGER | False    | Number of plots or challenges (default 1).   |
| `-b`, `--buffer`                | INTEGER | False    | Sort buffer megabytes (default 3389).        |
| `-r`, `--num_threads`           | INTEGER | False    | Thread count (default 2).                    |
| `-u`, `--buckets`               | INTEGER | False    | Bucket count (default 128).                  |
| `-a`, `--alt_fingerprint`       | INTEGER | False    | Alternative key fingerprint.                 |
| `-c`, `--pool_contract_address` | TEXT    | False    | Pool contract address for pool plots.        |
| `-f`, `--farmer_public_key`     | TEXT    | False    | Farmer public key hex.                       |
| `-p`, `--pool_public_key`       | TEXT    | False    | Pool public key hex.                         |
| `-t`, `--tmp_dir`               | PATH    | False    | Temp directory (default `.`).                |
| `-2`, `--tmp2_dir`              | PATH    | False    | Second temp directory.                       |
| `-d`, `--final_dir`             | PATH    | False    | Final plot directory (default `.`).          |
| `-i`, `--plotid`                | TEXT    | False    | Plot ID hex (reproduce plot).                |
| `-m`, `--memo`                  | TEXT    | False    | Memo hex (reproduce plot).                   |
| `-e`, `--nobitfield`            | flag    | False    | Disable bitfield.                            |
| `-x`, `--exclude_final_dir`     | flag    | False    | Do not add final dir to harvester plot list. |

<details>
<summary>Example</summary>

```bash
chia plots create -k 32 -n 1 -t /tmp/chia -d /plots/final
```

</details>

## Plots check {#plots-check}

Functionality: Validate plots against keys and run repeated challenges to compare observed vs expected proofs.

Usage: `chia plots check [OPTIONS]`

| Option                    | Type    | Required | Description                                           |
| :------------------------ | :------ | :------- | :---------------------------------------------------- |
| `-n`, `--num`             | INTEGER | False    | Number of challenges per plot (default 30).           |
| `-g`, `--grep_string`     | TEXT    | False    | Only check paths/filenames containing this substring. |
| `-l`, `--list_duplicates` | flag    | False    | List plots that share the same plot ID.               |
| `--debug-show-memo`       | flag    | False    | Print memo used to recreate the plot.                 |
| `--challenge-start`       | INTEGER | False    | Alternate starting challenge index for `-n`.          |

`-g` matches case-sensitive substrings in directory or file names. If omitted, every plot directory from `config.yaml` is scanned.

<details>
<summary>Example</summary>

```bash
chia plots check -n 30 -g DriveA
chia plots check -l -n 0
```

</details>

### Interpreting proof ratios

If the ratio of full proofs to expected proofs is greater than 1, the plot looked lucky for this static challenge run; if less than 1, it looked unlucky. This does not mean the plot is invalid on chain. As `-n` increases, the ratio should stabilize. Plot count and k-size matter far more for winning than small ratio swings from `plots check`.

For DiskProver internals, see [chiapos](https://github.com/Chia-Network/chiapos/blob/main/src/prover_disk.hpp).

## Related

- [CLI overview](/reference-client/cli-reference/cli)
- [Plotters CLI](/reference-client/cli-reference/plotter-cli)
- [Harvester CLI](/reference-client/cli-reference/harvester-cli)
