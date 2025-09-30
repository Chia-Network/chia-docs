---
title: Password Protected Keys
slug: /reference-client/install-and-setup/password-protected-keys
---

## Overview

We are introducing a new feature that allows users to specify a passphrase to protect their Chia keys across all currently supported platforms. Along with passphrase protection, this feature also introduces a new keyring file for storing those keys. By implementing a common key storage format, moving Chia keys between installations is greatly simplified, eliminating the need to re-enter each key's 24-word mnemonic. Any keys stored in the new keyring will be encrypted using a key derived from the specified passphrase.

:::warning
Your passphrase protects only from local access of your Chia client. **You must still protect your 24 words.**

Chia is unable to assist with the recovery of a forgotten passphrase. Be sure to **backup the 24-word mnemonic** for each of your keys. If you forget your passphrase, you will be able to recover by importing your keys from their 24-word mnemonic.
:::

## Motivation

Chia's supported platforms each provide different solutions for storing sensitive data, with varying levels of security and different user experiences per platform. In addition, these platform dependent solutions for storing sensitive data did not provide a mechanism for the user to passphrase-protect Chia keys outside of whatever protection the OS already provided.

On Linux, the cryptfile keyring Python module has been used with a fixed key.

On macOS, the Keychain is used to securely store each key, sometimes requiring one or more system prompts to authorize access to the key material.

This resulted in a system where keys were considered to be secure on systems, but that level of security was subjective to individual use cases and OS configuration, and not suitable for everyone's needs. Our primary goals with this passphrase feature have been to grant more control to our users, uniformly secure Chia keys, and to simplify the task of moving keys from one installation to another.

## New Keyring

The new keyring file is a YAML document named `keyring.yaml`. Upon launch, Chia will automatically create an empty `keyring.yaml` file residing at:

`%HOMEDRIVE%%HOMEPATH%/.chia_keys/keyring.yaml` (Windows)

`~/.chia_keys/keyring.yaml` (macOS and Linux)

Note that in this release, any new keys created or imported will be stored in the new `keyring.yaml` file and not in the previous location.

Keys in this new keyring file are encrypted using ChaCha20-Poly1305 ([RFC 7539, Section 2.8](https://datatracker.ietf.org/doc/html/rfc7539.html#section-2.8)) which provides encryption and authentication (AEAD). The encryption key is derived from the user's passphrase using PBKDF2 with SHA-256 ([RFC 2898](https://datatracker.ietf.org/doc/html/rfc2898)).

## Migration

:::danger
We **STRONGLY** recommend that users create backups of their 24-word mnemonic before migrating their keys.
:::

Existing users with keys will want to migrate their keys from the previous location to the new `keyring.yaml` file, and optionally protect those keys with a passphrase. We recommend all users create a strong passphrase. On macOS and Windows, users will have the option to save their passphrase to the macOS Keychain or Windows Credential Manager respectively, allowing for Chia to run unattended (such as after a reboot due to a power failure).

When launching the Chia GUI application, a migration prompt will automatically appear if existing keys are detected. The GUI migration process is nearly instantaneous and will not delete or modify those keys that were found. It's strongly encouraged that users perform the migration step right away to move to the new keyring. If necessary, it's possible to skip the migration step and continue using Chia as before, however, any attempts to add or delete a key will first require completion of the migration process.

From the command line interface, keyring migration can be initiated by setting a passphrase for the new keyring, or by adding or deleting a key. When performing keyring migration from the command line, the user will have the option of deleting those old keys that were found and successfully migrated.

:::note
It is possible to migrate keys to the new key storage and not set a passphrase. In this case, the `keyring.yaml` file will remain encrypted with a fixed key. When you remove a passphrase, that passphrase will also be removed from the macOS Keychain or Windows Credential Manager (if saved there by the user).
:::

## Command Line Reference

### Setting/Updating/Removing Passphrases

Setting or updating a passphrase for keyring.yaml. This will prompt for keyring migration as necessary:

```
chia passphrase set
```

When setting a passphrase, an optional hint may be specified. This hint will be displayed by the GUI when prompting for your keyring passphrase:

```
chia passphrase set --hint "Summer of 2020"
```

Removing a passphrase from `keyring.yaml`. Note, keyring.yaml always keeps keys stored in an encrypted form. Without a user-specified passphrase, a fixed encryption is used:

```
chia passphrase remove
```

### Passphrase Hints

A passphrase hint can be set to assist in remembering the keyring passphrase. The hint data is stored in keyring.yaml as cleartext (not encrypted).

Setting a passphrase hint when a passphrase is in use. This command will fail if a passphrase hasn't been previously set:

```
chia passphrase hint set "Summer of 2020"
```

Removing a passphrase hint. This command will fail if a passphrase and passphrase hint haven't been previously set:

```
chia passphrase hint delete
```

Displaying a passphrase hint. This command will fail if a passphrase and passphrase hint haven't been previously set:

```
chia passphrase hint display
```

### Reading Passphrases From a File

Passphrases may be accessed from a file (or file descriptor on macOS/Linux) to assist with automated workflows. Note that whitespace is not stripped from the passphrase when read from a file.

Reading the passphrase from a file:

```
chia --passphrase-file "~/.my_chia_passphrase" keys show
```

Reading the passphrase from another process (on macOS/Linux):

```
chia --passphrase-file <(echo -n 'my super secure passphrase') keys show
```

## Additional Notes

On macOS and Windows, an option is available to save the passphrase to the OS-provided secure credential store (macOS Keychain or Windows Credential Manager). This option may help with automated workflows, but carries a risk that other processes may be able to read the saved passphrase without requiring user authorization. For this reason, it's recommended that users only save their passphrase if they fully trust their environment.

To facilitate downgrading to a prior version of Chia, keys will be left intact in their old locations after migration (unless migrating from the command line, and the option to delete old keys was selected).

If necessary, it's possible to temporarily disable passphrase support as well as usage of the new keyring. To disable passphrase and keyring support, set the `CHIA_PASSPHRASE_SUPPORT` environment variable to `false` and run Chia as you normally would. Once disabled, Chia will use the old location for key retrieval and storage.

```
export CHIA_PASSPHRASE_SUPPORT=false; chia start farmer
```
