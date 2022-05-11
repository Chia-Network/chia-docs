---
id: nft0_rpcs
title: NFT0 RPCs
sidebar_label: 12.3 NFT0 RPCs
sidebar_position: 3
---

## Commands

* [`nft_mint_nft`](#nft_mint_nft)
* [`nft_get_nfts`](#nft_get_nfts)
* [`nft_transfer_nft`](#nft_transfer_nft)
* [`nft_add_uri`](#nft_add_uri)

## Note about Windows

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.
  
For example, here is a typical RPC command on Linux and MacOS:
```powershell
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet"}'
```

To run the same command on Windows, you need to escape the quotes, so it looks like this:
```powershell  
chia rpc wallet create_new_wallet '{\"wallet_type\": \"nft_wallet\"}'
```

## Reference

### `nft_mint_nft`

Functionality: Mint a new NFT

Usage: `chia rpc wallet [OPTIONS] nft_mint_nft [REQUEST]`

Options: 

| Short Command | Long Command                 | Type  | Required | Description |
|:-------------:|:----------------------------:|:-----:|:--------:|:------------|
| -j            | --json-file                  | TEXT  | False    | Instead of REQUEST, provide a json file containing the request data
| -h            | --help                       | None  | False    | Show a help message and exit

Request Parameters:

| Parameter         | Required | Description |
|:-----------------:|:--------:|:------------|
| wallet_id         | True     | The `Wallet ID` in which to mint an NFT, obtainable by running `chia wallet show`
| uris              | True     | A list of URIs to mark the location(s) of the NFT
| hash              | True     | The hash of the NFT. This should use sha256 for proper verification against the URI list
| artist_percentage | False    | For NFT1, this will be the royalty that will go to the original artist each time the NFT is sold. The percentage is multiplied by 100 -- for example, to set a 15% royalty, set this value to 1500. However, this feature is disabled in NFT0. The default value is 0
| artist_address    | False    | The wallet address of the original artist. Royalties will be sent to this address. For NFT0, this feature is disabled. For NFT1, this could be either an XCH address or a DID address

Example:

```json
// Request
chia rpc wallet nft_mint_nft '{
  "wallet_id": 3, 
  "uris": [
    "https://images.pexels.com/photos/11053072/pexels-photo-11053072.jpeg"
  ], 
  "hash": "14836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb0", 
  "artist_percentage": 1500, 
  "artist_address": "txch1yxpslrx30k7lnngpfczr3ltrge0ap25f4739jet5lz069lhn5szsu49uyh"
}'

// Response
{
    "nft": {
        "additions": [
          ...
        ],
        "amount": 1,
        "confirmed": false,
        "confirmed_at_height": 0,
        "created_at_time": 1651912565,
        "fee_amount": 0,
        "memos": [],
        "name": "0xdd14793f28b8d3d94782a5d99398094e6d0e612e3101a0fe806c474dab2feb48",
        "removals": [
          ...
        ],
        "sent": 0,
        "sent_to": [],
        "spend_bundle": {
          ...
        },
        "to_puzzle_hash": "0xae3c67057b390a1d6192d7f48e4585dd626eed9c1ac7b941668fb53cc432c034",
        "trade_id": null,
        "type": 1,
        "wallet_id": 3
    },
    "success": true,
    "wallet_id": 3
}
```

---

### `nft_get_nfts`

Functionality: Show all NFTs in a given wallet

Usage: `chia rpc wallet [OPTIONS] nft_get_nfts [REQUEST]`

Options: 

| Short Command | Long Command                 | Type  | Required | Description |
|:-------------:|:----------------------------:|:-----:|:--------:|:------------|
| -j            | --json-file                  | TEXT  | False    | Instead of REQUEST, provide a json file containing the request data
| -h            | --help                       | None  | False    | Show a help message and exit

Request Parameters:

| Parameter   | Required | Description |
|:-----------:|:--------:|:------------|
| wallet_id     | True     | The `Wallet ID` from which to retrieve the NFTs, obtainable by running `chia wallet show`

Example:

```json
// Request
chia rpc wallet nft_get_nfts '{"wallet_id": 3}'

// Response
{
    "nft_list": [
        [
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0xa2cde90cc29793f305c2d2f06f1036311c8ed894b73f5a755c38f88502c4d145",
                    "puzzle_hash": "0xe7dc6689665e6fffa03651030de3dc0a9a268aa8a0f81b563b805a37f8fd8e21"
                },
                "full_puzzle": 
                ...,
                "lineage_proof": {
                    "amount": 1,
                    "inner_puzzle_hash": "0x0270e884ef2beb0a5c3b685f9edc3dc572fbfe73f7f07971ae7ee1aa681ccc00",
                    "parent_name": "0x831404fe4d27616a5527e8a0e86b9ef92ea5ec5f01240d19a421ac9e907eafa1"
                }
            },
            [
                "0xff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780",
                "0xff68c04031343833366238366134386531623262356538353732313361663937353334373034343735623463313535643334623263623833656434623763626132626230"
            ]
        ],
        [
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0x0c0dff49a3c9ec0f5b24160f4740803653477288eebf99894fa90e0ec963314e",
                    "puzzle_hash": "0x2e722eb8182a223e7a8a6dde54b5729601cdbb6d0eeafd6879be4aaf45ec3461"
                },
                "full_puzzle": ...,
                "lineage_proof": {
                    "amount": 1,
                    "inner_puzzle_hash": "0xca2a90c0f6d701d21ee195898cd04c0d2a54ab26aa43d8677f60cb0a516408d1",
                    "parent_name": "0xca13470716d7dc09c36614066e4180c0ad7a54a51367e7824c75778b13c747f3"
                }
            },
            [
                "0xff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780",
                "0xff68c04031343833366238366134386531623262356538353732313361663937353334373034343735623463313535643334623263623833656434623763626132626230"
            ]
        ],
        [
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0xf5e9c797a875e31b3ec1b381a08c28b17f6273dd9ab6d7bde88e23bd3b18d654",
                    "puzzle_hash": "0xc70e8483089f32b4a5ca2ba34f3d2524cb8823cda8592b412a424deec8e84299"
                },
                "full_puzzle": 
                ...,
                "lineage_proof": {
                    "amount": 1,
                    "inner_puzzle_hash": "0x123b4e88eacfc482d5b447bb3ff3ccbf3b385c9e7c04e8b5594a83fc9d53e1fd",
                    "parent_name": "0x0a53f69de29dd378cfb10bae816297c5491c39de2d2a67815f341bd120c70fa2"
                }
            },
            [
                "0xff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780",
                "0xff6886313432626230"
            ]
        ]
    ],
    "success": true,
    "wallet_id": 3
}
```

---

### `nft_transfer_nft`

Functionality: Transfer an NFT to a different XCH address

Usage: `chia rpc wallet [OPTIONS] nft_transfer_nft [REQUEST]`

Options: 

| Short Command | Long Command                 | Type  | Required | Description |
|:-------------:|:----------------------------:|:-----:|:--------:|:------------|
| -j            | --json-file                  | TEXT  | False    | Instead of REQUEST, provide a json file containing the request data
| -h            | --help                       | None  | False    | Show a help message and exit

Request Parameters:

| Parameter      | Required | Description |
|:--------------:|:--------:|:------------|
| wallet_id      | True     | The `Wallet ID` of the NFT to transfer, obtainable by running `chia wallet show`
| target_address | True     | The address to transfer the NFT to. For NFT0 this must be an XCH address. For NFT1 this could also be a DID address
| nft_coin_id    | True     | The coin ID of the NFT to transfer

Example:

```json
// Request
chia rpc wallet nft_transfer_nft '{"wallet_id": 2, "target_address": "txch167lgv3v86m6vzyr9s44w2xwsnuxcdvsw2lvsf7ru03cq6p7xyngs7mvju7", "nft_coin_id": "4296D4E49E2056DB5AEB62DF849851E61326DAEA4337825BE15410E7F4C07E32"}

// Response
{
    "spend_bundle": {
        "aggregated_signature": "0x91dc6a78a2ca1a0992c3b4c0f4cb93c2a8f04c58b9b82afe2b383975b1fb346e9f039f1dd50792383513c6645c8dfa9e061a52468ddefba25deb706c3c9e2bda8ac1431238d926c6eb3c23ee89f882e670b6a285717934af368d2e1db31def60",
        "coin_solutions": [
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0xeb46562a95a335f77b4d0d97458580674a10b210c849c1d01c06ec29d0bde8cc",
                    "puzzle_hash": "0xb28550e1d3cec070aa79ff582d5327d5fed881c7b66acc2977e84e5a49109fe1"
                },
                "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0c2f3f7d54d254381fd33fbe2b6c031e5be3ba1267215a2fa182e064ed6015fefa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff04ffff04ff10ffff04ff81bfff808080ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff3affff04ff02ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff808080808080ffff04ff81bfffff01ff8080808080808080ffff04ffff01ffffff49ff0233ffff0401ff0102ffffffff02ffff03ff05ffff01ff02ff22ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff17ffff01ff02ffff03ffff09ff47ffff0181e880ffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff81a7ff80808080ff0580ffff01ff02ff81a7ffff04ff0bffff04ff05ffff04ff820167ff8080808080ffff01ff088080ff0180ffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff37ff80808080808080ff0180ffff01ff04ffff04ff0bffff04ff05ff808080ffff01ff80808080ff0180ffff02ffff03ff05ffff01ff04ff09ffff02ff2affff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff02ff26ffff04ff02ffff04ffff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ff808080808080ffff04ff17ff8080808080ffffff04ff09ffff04ffff02ff2affff04ff02ffff04ff15ffff04ff0bff8080808080ff808080ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff22ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff2bffff01ff02ffff03ffff09ff818bff3880ffff01ff02ffff03ffff18ff8202cbff3480ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff4bff80808080808080ffff01ff04ff4bffff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff808080808080808080ff0180ffff01ff02ffff03ffff15ff818bff8080ffff01ff04ff4bffff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff8080808080808080ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff8080808080808080ff018080ff0180ffff01ff02ffff03ff2fffff01ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff81afffff04ffff0bff34ff5380ffff04ffff02ff2effff04ff02ffff04ff23ff80808080ffff04ffff0bff34ff0580ff8080808080808080ffff04ff17ff8201ef808080ff8080ffff01ff088080ff018080ff0180ff018080ffff04ffff01a0dd8135d546e291df295b376aa89fc409c8c50d7f655d1ff4e845637901bc2f8fffff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780ffff68a014836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb080ffff04ffff01a081970d352e6a39a241eaf8ca510a0e669e40d778ba612621c60a50ef6cf29c7bffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a9e78ce31daf07c9bb35339201d7ba3c2dc79df506e9214565ebab8d6e1c9d32313f1522e7fdc95a4f04d9fa38675b8fff018080ff018080808080ff01808080",
                "solution": "0xffffa0c2f3f7d54d254381fd33fbe2b6c031e5be3ba1267215a2fa182e064ed6015fefffa0f38367ca5d4dd82f5ec7f76777ac0647d4b7b1a3f97fdb683530317a04deab2fff0180ff01ffffff80ffff01ffff33ffa0d7be864587d6f4c11065856ae519d09f0d86b20e57d904f87c7c700d07c624d1ff01ffffa0d7be864587d6f4c11065856ae519d09f0d86b20e57d904f87c7c700d07c624d1808080ff8080ff01ff808080"
            }
        ]
    },
    "success": true,
    "wallet_id": 2
}
```

---

### `nft_add_uri`

Functionality: Add a new URI to the location URI list

Usage: `chia rpc wallet [OPTIONS] nft_add_uri [REQUEST]`

Options: 

| Short Command | Long Command                 | Type  | Required | Description |
|:-------------:|:----------------------------:|:-----:|:--------:|:------------|
| -j            | --json-file                  | TEXT  | False    | Instead of REQUEST, provide a json file containing the request data
| -h            | --help                       | None  | False    | Show a help message and exit

Request Parameters:

| Parameter   | Required | Description |
|:-----------:|:--------:|:------------|
| wallet_id   | True     | The `Wallet ID` of the DID wallet to transfer, obtainable by running `chia wallet show`
| nft_coin_id | True     | The ID of the NFT coin, obtained from the `nft_get_nfts` RPC
| uri         | True     | The new URI to add

Example:

```json
// Request
chia rpc wallet nft_add_uri '{"wallet_id": 2, "nft_coin_id": "B5178AB54CD922889B4E97B2DDC0DD43FD85BE26F69DD3D697084C80AE4E9625", "uri": "https://newuri.net"}'

// Response
{
    "spend_bundle": {
        "aggregated_signature": "0xa5c7e75ad3c6d51ccaf6f9a77c11974b348ebdaa7dd172fc8203cecd1f21e8477f70917d112d6d89d12ef28a6813f56e1887c4200a10844cc55f8546f275902e140cb7f87e4fe321c32385fc8e0fb08617bc851c6b5418bf85a369129a8394ab",
        "coin_solutions": [
            {
                "coin": {
                    "amount": 1,
                    "parent_coin_info": "0x4296d4e49e2056db5aeb62df849851e61326daea4337825be15410e7f4c07e32",
                    "puzzle_hash": "0xe9f6301cbb24aad305e56754c044bcc924ce04a28173381429d96920f4323bb1"
                },
                "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3c80ffff01ff04ffff04ff10ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff0bff27ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff02ffff03ff77ffff0181b7ffff015780ff018080ffff04ff77ff808080808080ffff02ff26ffff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffff49ff4702ff33ff0401ffff01ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff3cff2c80ffff0bff2affff0bff2affff0bff3cff1280ff0980ffff0bff2aff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ffffff02ffff03ff0bffff01ff02ffff03ffff02ffff03ffff09ff23ff1480ffff01ff02ffff03ffff18ff81b3ff3c80ffff01ff0101ff8080ff0180ff8080ff0180ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff3cff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff26ffff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ff0bff2affff0bff3cff3880ffff0bff2affff0bff2affff0bff3cff1280ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bff3cff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff28ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa0f1e8350cec62f8204aaf867cc3c12cae369f619258206616108c6cfd7be760b3ffa0c2f3f7d54d254381fd33fbe2b6c031e5be3ba1267215a2fa182e064ed6015fefa0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff04ffff04ff10ffff04ff81bfff808080ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff3affff04ff02ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff808080808080ffff04ff81bfffff01ff8080808080808080ffff04ffff01ffffff49ff0233ffff0401ff0102ffffffff02ffff03ff05ffff01ff02ff22ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ff02ffff03ff17ffff01ff02ffff03ffff09ff47ffff0181e880ffff01ff02ffff03ffff09ffff02ff2effff04ff02ffff04ff81a7ff80808080ff0580ffff01ff02ff81a7ffff04ff0bffff04ff05ffff04ff820167ff8080808080ffff01ff088080ff0180ffff01ff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff37ff80808080808080ff0180ffff01ff04ffff04ff0bffff04ff05ff808080ffff01ff80808080ff0180ffff02ffff03ff05ffff01ff04ff09ffff02ff2affff04ff02ffff04ff0dffff04ff0bff808080808080ffff010b80ff0180ff02ff26ffff04ff02ffff04ffff02ff32ffff04ff02ffff04ff05ffff04ff0bffff04ff17ff808080808080ffff04ff17ff8080808080ffffff04ff09ffff04ffff02ff2affff04ff02ffff04ff15ffff04ff0bff8080808080ff808080ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff22ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff2bffff01ff02ffff03ffff09ff818bff3880ffff01ff02ffff03ffff18ff8202cbff3480ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff4bff80808080808080ffff01ff04ff4bffff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff808080808080808080ff0180ffff01ff02ffff03ffff15ff818bff8080ffff01ff04ff4bffff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff8080808080808080ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff04ffff04ff23ffff04ff53ff808080ffff04ff6bff808080ffff04ff17ffff04ff2fff8080808080808080ff018080ff0180ffff01ff02ffff03ff2fffff01ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff81afffff04ffff0bff34ff5380ffff04ffff02ff2effff04ff02ffff04ff23ff80808080ffff04ffff0bff34ff0580ff8080808080808080ffff04ff17ff8201ef808080ff8080ffff01ff088080ff018080ff0180ff018080ffff04ffff01a0dd8135d546e291df295b376aa89fc409c8c50d7f655d1ff4e845637901bc2f8fffff04ffff01ffff75ffc04468747470733a2f2f696d616765732e706578656c732e636f6d2f70686f746f732f31313035333037322f706578656c732d70686f746f2d31313035333037322e6a70656780ffff68a014836b86a48e1b2b5e857213af97534704475b4c155d34b2cb83ed4b7cba2bb080ffff04ffff01a081970d352e6a39a241eaf8ca510a0e669e40d778ba612621c60a50ef6cf29c7bffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0ad2e4e7de145259166b19be05cbcea393c66cc436a631154a20a30e12dce380f00a0bc86c19490c409640bb76546b273ff018080ff018080808080ff01808080",
                "solution": "0xffffa0eb46562a95a335f77b4d0d97458580674a10b210c849c1d01c06ec29d0bde8ccffa08e18568a642e3406dabf891aee9b4c1ace3e65daf15502a6b9ca7e1fa5f41a3fff0180ff01ffffff80ffff01ffff33ffa0d7be864587d6f4c11065856ae519d09f0d86b20e57d904f87c7c700d07c624d1ff01ffffa0d7be864587d6f4c11065856ae519d09f0d86b20e57d904f87c7c700d07c624d18080ffff81e8ffff02ffff01ff04ffff04ffff02ffff03ff17ffff01ff02ff02ffff04ff02ffff04ff05ffff04ff17ff8080808080ffff010580ff0180ffff04ff0bff808080ffff01ff808080ffff04ffff01ff02ffff03ff05ffff01ff02ffff03ffff09ff11ffff017580ffff01ff04ffff04ffff0175ffff04ff0bff198080ff0d80ffff01ff04ff09ffff02ff02ffff04ff02ffff04ff0dffff04ff0bff80808080808080ff0180ff8080ff0180ff018080ff9268747470733a2f2f6e65777572692e6e65748080ff8080ff01ff808080"
            }
        ]
    },
    "success": true,
    "wallet_id": 2
}
```

---
