---
sidebar_label: Overview
title: CLI Overview
slug: /cli
---

# CLI Commands Reference

This page should provide additional high-level documentation and explanation beyond just `chia -h`.

This is not meant to be comprehensive, because often the `-h` (help) text is clear enough. We recommend fully investigating with the `-h` switch before looking elsewhere.

To better understand what a command's options are, append `-h` at the end to see options and explanations.

Some examples:

- `chia -h`
- `chia plots -h`
- `chia plots check -h`
- `chia plotters madmax -h`
- `chia start -h`

As with the rest of this project, this doc is a work-in-progress. Feel free to browse the [source code](https://github.com/Chia-Network/chia-blockchain/tree/main/chia/cmds) or the [Chia Proof of Space Construction Document](https://www.chia.net/assets/Chia_Proof_of_Space_Construction_v1.1.pdf) for more insight in the meantime.

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

The CLI one is the one referred to in this document, and for version 2.1.0 installed for the user it can be found at

```bash
~\AppData\Local\Programs\Chia\resources\app.asar.unpacked\daemon\chia.exe
```

If installed for all users it can be found at

```bash
C:\Program Files\Chia\resources\app.asar.unpacked\daemon\chia.exe
```

# [init](https://github.com/Chia-Network/chia-blockchain/blob/master/src/cmds/init.py)

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

# start

Command: `chia start {service}`

- Service `node` will start only the full node.
- Service `farmer` will start the farmer, harvester, a full node, and the wallet.
- positional arguments:
  {all,node,harvester,farmer,farmer-no-wallet,farmer-only,timelord,timelord-only,timelord-launcher-only,wallet,wallet-only,introducer,simulator}

**Flags**

`-r, --restart`: Restart of running processes

# plotters

In 2.1.0 the option to use different plotters including compressed plotter was introduced. Each plotter has slightly different hardware requirements and may need slightly different options specified. 
The cli reference for all plotters can be found in the [Plotters CLI Page](/plotters-cli). Learn more about the alternative plotters in the [Alternative Plotters page](/plotting-software).

## plotnft

Using the CLI, you can perform the same operations as with the GUI. There is a new command, called `chia plotnft`. Type `chia plotnft -h` to see all the available sub-commands:

```
» chia plotnft -h
Usage: chia plotnft [OPTIONS] COMMAND [ARGS]...

Options:
  -h, --help  Show this message and exit.

Commands:
  claim           Claim rewards from a plot NFT
  create          Create a plot NFT
  get_login_link  Create a login link for a pool. To get the launcher id, use
                  plotnft show.

  inspect         Get Detailed plotnft information as JSON
  join            Join a plot NFT to a Pool
  leave           Leave a pool and return to self-farming
  show            Show plotnft information
```

To create a Plot NFT, use `chia plotnft create -u https://poolnamehere.com`, entering the URL of the pool you want to use. To create a plot NFT in self-farming mode, do `chia plotnft create -s local`.
To switch pools, you can use `chia plotnft join`, and to leave a pool (switch to self farming), use `chia plotnft leave`.
The `show` command can be used to check your current points balance. CLI plotting with `create_plots` is the same as before, but the `-p` is replaced with `-c`, and the pool contract address from `chia plotnft show` should be used here.

## [Plots check](https://github.com/Chia-Network/chia-blockchain/blob/master/src/plotting/check_plots.py)

Command: `chia plots check -n [num checks] -l -g [substring]`

First, this looks in all plot directories from your config.yaml. You can check those directories with `chia plots show`. This command will check whether plots are valid given the plot's associated keys and your machine's stored Chia keys, as well as test the plot with challenges to identify found plots vs. expected number of plots.

`-g` check only plots with directory or file name containing case-sensitive [substring].
**If `-g` isn't specified all plots in every plot directory in your config.yaml will be checked.**

Examples for using `-g`

- Check plots within a long directory name like `/mnt/chia/DriveA` can use `chia plots check -g DriveA`
- Check only k33 plots can use `chia plots check -g k33`
- Check plots created on October 31, 2020 can use `chia plots check -g 2020-10-31`

`-l` allows you to find duplicate plots by ID. It checks all plot directories listed in config.yaml and lists out any plot filenames with the same filename ending; `*-[64 char plot ID].plot`. You should use `-l -n 0` if you only want to check for duplicates.

`-n` represents the number of challenges given. If you don't include an `-n` integer, the default is 30. For instance, if `-n` is 30, then 30 challenges will be given to each plot. The challenges count from 5 (minimum) to `-n`, and are not random.

Each plot will take each challenge and:

- Get the quality for the challenge (Is there a proof of space? You should expect 1 proof per challenge, but there may be 0 or more than 1.)
- Get the full proof(s) for the challenge if a proof was present
- Validate that the # of full proofs matches the # of expected quality proofs.

Finally, you'll see a report the final true proofs vs. expected proofs.

Therefore, if `-n` is 20, you would expect 20 proofs, but your plot may have more or fewer.

Running the command with `-n 10` or `-n 20` is good for a very minor check, but won't actually give you much information about if the plots are actually high-quality or not.

Consider using `-n 30` to get a statistically better idea.

For more detail, you can read about the DiskProver commands in [chiapos](https://github.com/Chia-Network/chiapos/blob/master/src/prover_disk.hpp)

**What does the ratio of full proofs vs expected proofs mean?**

- If the ratio is >1, your plot was relatively lucky for this run of challenges.
- If the ratio is <1, your plot was relatively unlucky.
  - This shouldn't really concern you unless your ratio is <0.70 # If so, do a more thorough `chia plots check` by increasing your `-n`

The plots check challenge is a static challenge. For example if you run a plots check 20 times, with 30 tries against the same file, it will produce the same result every time. So while you may see a plot ratio << 1 for a plot check with `x` number of tries, it does not mean that the plot itself is worthless. It just means that given these static challenges, the plot is producing however many proofs. As the number of tries (`-n`) increases, we would expect the ratio to not be << 1. Since Mainnet is live, and given that the blockchain has new challenges with every signage point - just because a plot is having a bad time with one specific challenge, does not mean it has the same results versus another challenge. "Number of plots" and "k-size" are much more influential factors at winning blocks than "proofs produced per challenge".

**In theory**, a plot with a ratio >> 1 would be more likely to win challenges on the blockchain. Likewise, a plot with a ratio << 1 would be less likely to win. However, in practice, this isn't actually going to be noticeable. Therefore, don't worry if your plot check ratios are less than 1, unless they're _significantly_ less than 1 for _many_ `-n`.

# db

## [upgrade](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/db.py)

Command: `chia db upgrade [add flags and parameters]`

**Flags**

`--input [PATH]`: (optional) Specify a database input file. Must be a v1 database.

`--output [PATH]`: (optional) Specify a database output file. Can be any name, but must not already exist.

`--no-update-config` Don't update the config file to point to your new database. When specifying a custom output file, the config will not be updated regardless.

**Database upgrade notes**

- This will upgrade your database from version 1 to version 2, which is around 45% smaller and slightly faster.
- The upgrade could take several hours to complete. Use at your own leisure.
- You do not need to stop your Chia node while performing the upgrade.
- The new database file will be written to the same folder as the original. The current size requirement (2nd quarter 2022) is around 55 GB. _Note that the database is always growing, so the size requirement for the v2 database will have gone up by the time you are reading this — plan accordingly_. After the version 2 file has been created, you can stop Chia and move/delete your version 1 file, which will free up enough space to move your version 2 file to the original folder. Finally, update the references in config.yaml to point to your version 2 file.
- After the upgrade has completed, run `chia start farmer -r`. This will restart your farmer, and begin using your new database. Note that it will have the same peak as version 1 at the time you _initiated_ the upgrade. Your node will still need to run a short sync to fetch the remaining blocks that had gotten added while the upgrade was being performed.
- For more information on the new database version, see our [FAQ](https://github.com/Chia-Network/chia-blockchain/wiki/FAQ#what-is-the-new-database').

## [backup](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/db.py)

Command: `chia db backup [add flags and parameters]`

**Flags**

`--backup_file [PATH]`: (optional) Specifies the backup file and location. Default will create the backup in the same directory as the database.

`--no_indexes`: (optional) Create backup without indexes.

**Database backup notes**

- This will vacuum (compress) and backup your database and may take several hours to complete. Use at your own leisure.
- You do not need to stop your Chia node while performing the upgrade.
- The new database file will be written to the same folder as the original with "vacuumed_" prepended to the name.
- To use the backup database: Close the chia client, remove/delete the main database, rename the backup database to remove "vacuumed_", and restart the chia client. Note the initial start will take extra time as the client verifies the backup db file.

## [validate](https://github.com/Chia-Network/chia-blockchain/blob/main/chia/cmds/db.py)

Command: `chia db validate [add flags and parameters]`

**Flags**

`--db [PATH]`: (optional) Specifies which database file to validate. Default will use the default database and path.

`--validate-blocks`: (optional) Validate consistency of properties of the encoded blocks and block records. Note this will increase the validation time.

**Database validate notes**

- This will validate your database and may take several hours to complete. Use at your own leisure.
- You do not need to stop your Chia node while performing the upgrade.
- This will start by processing the latest block and traverse to the first block.

# keys

## [derive](https://github.com/Chia-Network/chia-blockchain/blob/2f2593661c842b70a0e848752f12777f2df3ed18/chia/cmds/keys.py#L139)

Command: `chia keys derive [OPTIONS] COMMAND [ARGS]`

**Flags**

`-f`, `--fingerprint` `[INTEGER]`: The fingerprint of the key you want to use.

`--mnemonic-seed-filename` `[TEXT]`: The filename containing the mnemonic seed of the master key to derive from.

**Notes on deriving keys**

- This command will display or search for derived keys or wallet-addresses.
- This command requires either a fingerprint or a mnemonic seed file.
- The valid values for `COMMAND` are `child-key`, `search`, and `wallet-address`.
- See below for details and example commands.

### [child-key](https://github.com/Chia-Network/chia-blockchain/blob/2f2593661c842b70a0e848752f12777f2df3ed18/chia/cmds/keys.py#L271)

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

### [search](https://github.com/Chia-Network/chia-blockchain/blob/2f2593661c842b70a0e848752f12777f2df3ed18/chia/cmds/keys.py#L162)

Command: `chia keys derive search [OPTIONS] [SEARCH_TERMS]...`

**Flags**

`-l`, `--limit` `[INTEGER]`: Limit the number of derivations to search against. [default: 100]

`-d`, `--non-observer-derivation`: Search will be performed against keys derived using non-observer derivation. [default: False]

`-P`, `--show-progress`: Show search progress. [default: False]

`-t`, `--search-type` `[public_key|private_key|address|all]`: Limit the search to include just the specified types. [default: address, public_key]

`-p`, `--derive-from-hd-path` `[TEXT]`: Search for items derived from a specific HD path. Indices ending in an 'n' indicate that non-observer derivation should used at that index. Example HD path: m/12381n/8444n/2/

**Examples**

- Search for a wallet address: `chia keys derive search -t address -l 100 <xch address>`

### [wallet-address](https://github.com/Chia-Network/chia-blockchain/blob/2f2593661c842b70a0e848752f12777f2df3ed18/chia/cmds/keys.py#L234)

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

See our [official DID reference](/did-cli).

---

# NFT

See our [official NFT reference](/nft-cli).

---

# Other commands (not all are fully documented)

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
  completion  Generate shell completion
  configure   Modify configuration
  data        Manage your data
  db          Manage the blockchain database
  dev         Developer commands and tools
  farm        Manage your farm
  init        Create or migrate the configuration
  keys        Manage your keys
  netspace    Estimate total farmed space on the network
  passphrase  Manage your keyring passphrase
  peer        Show, or modify peering connections
  plotnft     Manage your plot NFTs
  plots       Manage your plots
  plotters    Advanced plotting options
  rpc         RPC Client
  run_daemon  Runs chia daemon
  show        Show node information
  start       Start service groups
  stop        Stop services
  version     Show chia version
  wallet      Manage your wallet

```

To see what you can do with each of these commands, use the help flag -h. For example, `chia show -h`.

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

## Checking Logs and Status

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
