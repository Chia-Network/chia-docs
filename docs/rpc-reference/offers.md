---
sidebar_label: Offers
title: Offer RPC
slug: /offer-rpc
---

```mdx-code-block
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
```

<details>
  <summary>Note about Windows command escaping</summary>

This document will use Linux/MacOS RPC syntax. When running rpc commands on Windows, you'll need to escape all quotes with backslashes.

For example, here is a typical RPC command on Linux and MacOS:

```powershell
chia rpc wallet create_new_wallet '{"wallet_type": "nft_wallet"}'
```

To run the same command on Windows, you need to escape the quotes with backslashes. In other words, add a \ before each double quote, such that:

- "wallet_type" becomes \"wallet_type\"
- "nft_wallet" becomes \"nft_wallet\"
- etc

</details>

## Reference

### `cancel_offer`

Functionality: Cancel an Offer with a specific identifier

Usage: chia rpc wallet [OPTIONS] cancel_offer [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag     | Type    | Required | Description                                                                                                                   |
| :------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------- |
| trade_id | STRING  | True     | The `trade_id` of the Offer to cancel. Can be retrieved from an Offer file by calling `cdv inspect spendbundles <offer_file>` |
| fee      | NUMBER  | False    | An optional fee (in mojos) to include with the cancellation [Default: `0`]                                                    |
| secure   | BOOLEAN | False    | If `true`, then "cancel on blockchain," ie spend the coins being offered. If `false`, then cancel locally [Default: `true`]   |

:::note

If you set `secure` to `false`, then the Offer will not be canceled on the blockchain. It could still be taken if a copy of the Offer exists on another computer.

:::

<details>
<summary>Example</summary>

```json
chia rpc wallet cancel_offer '{"trade_id": "0x039492f84708b8a585ddaa0dd44fa8db1a6afdad799b0900e37dfc9097f1f351", "secure": false}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `cancel_offers`

Functionality: Cancel multiple Offers

Usage: chia rpc wallet [OPTIONS] cancel_offers [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag       | Type    | Required | Description                                                                                               |
| :--------- | :------ | :------- | :-------------------------------------------------------------------------------------------------------- |
| secure     | BOOLEAN | True     | If `true`, then "cancel on blockchain," ie spend the coins being offered. If `false`, then cancel locally |
| fee        | NUMBER  | False    | An optional fee (in mojos) to include with the cancellation [Default: `0`]                                |
| batch_size | NUMBER  | False    | The number of Offers to cancel in one batch [Default: `5`]                                                |
| cancel_all | BOOLEAN | False    | Cancel all Offers [Default: `false`]                                                                      |
| asset_id   | STRING  | False    | The ID of the asset to cancel; only used when `cancel_all` is `false` [Default: `xch`]                    |

<details>
<summary>Example</summary>

```json
chia rpc wallet cancel_offers '{"secure": true, "batch_fee": 1, "batch_size": 2}'
```

Response:

```json
{
  "success": true
}
```

</details>

---

### `check_offer_validity`

Functionality: Checks whether a specific Offer is valid (see below for definitions)

Usage: chia rpc wallet [OPTIONS] check_offer_validity [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag  | Type   | Required | Description                       |
| :---- | :----- | :------- | :-------------------------------- |
| offer | STRING | True     | The text of the Offer to validate |

:::note

The Offer is considered valid if it is in any of the following states:

- `PENDING_ACCEPT`
- `PENDING_CONFIRM`
- `PENDING_CANCEL`

The Offer is not valid if it is in any of the following states:

- `CANCELLED`
- `CONFIRMED`
- `FAILED`

:::

<details>
<summary>Example</summary>

```json
chia rpc wallet check_offer_validity '{"offer": "offer1qqr83wcuu2rykcmqvpsxzgqq4gnsn0v2w6gchlaawrmeju4af4arrwu5s2kvce6at3nhmsa4v03kvgvc8furkat55swhlsmpwjj86a9ylhljq8mfs7jw6p044wxg9a7lhhuwphnff6my6aujm3m37wvl6q0kzy3tde6nh7w9j6d0nlchdsgk628m7aktm6jfqa47hwwnj705chexjdkhufx3fd9zegkcwhfknvg9auleg2neqcjpcj8mjehmfeks7gazhwlz4ffam6ukt3wwddlya3qah92s4wgqhr73797a5fyq68clmcfmhc85auqtzmuvure07v84jch8vzcwldm0qdf4uwatuj4xtjfxadlp37x8xf8nupxtz7jl7reyvj2fg9q5t057kfe95e2jdftx5etj2f6k2kjfdx48zmjwdx55j4jfwf4xzj24295hnxd7gfz425j72x99jc2kf9py56dxtxu62an2g4lxzkvwsegk5s27hed9j52f0eqhykn206h9vnnxt66mtqvw3ft85cqam9935q4wlmd45q9u7t5t86dl3g37vrrghz8aelwgga99mg3e0uylklaume8alal4xtksxxynga2v2echu8ksx4xnjsym2f5xv56wveex5hn34f0yzzkgadxu27dqvx4wyyssnxdmzcyn5tlsl0v0tnsalqhlwgly708udd0n9ee5q0lqnhm7hul7m8e6cxn3he9u3sz546dwmxtualtc0h5f89knj34tdmkrrvknf0pzat0ju7hm3a7hz7raqqkfalm408a6jtm6xn9a0lhchxu5z4dhf7wandtdah3qjdh844tjanauwj73kjap8ga08qujwarxwljxvalq3w88ll5vcra379zflxglfrvhwa844090t2cc53pafme08pcaa625hmzaw9hf320ekrc9zhdkmw484cr9zp3tclgr4fdrxv52xvegsdlqdefln5a47zuzfu7t8hh7f3y0fd5dcqktrt57ntn30xm6nja58d8kfh8rsct4lypkfyq0npsh2sxwddqvkk4rqdk03c5jz90yfs4glll3w888k40ml09v39n6xhpdhlz85lm9mcdjlsujrck85alr6lceqjgl0etsp9tv98mq48hkmvulalxn9vgn0nht9k6sayee0mdwyfp0wd67ewknh64pxsppf3gprjxwmgsdmrfj4l8ejtukh846a43sh036d6a3e80gkmjdmf3nfu0qr50vxrg0nmezadj5hkku0srmhefz57xxw5re2na6pku46t5neaaq5fzkda9kwcrqzramre95yeayjwnvk7cgqrw7kzddne7778jslravahl4ua8v2tklam7v9x0yc63l7mu7j8xkeu7t4unqs72l9q0th3npxakcgeynt8uaksf2edgpjtc07techllaakccnazlwm9ehu4wc08dhk7ufjn576jkwzem9m88jlhl3l3wtelltvvnvhvgvd5zq543hprajzagvtsamxaxn2vt4lzn83aagcvw8rt65l57a88ua4a0ls70tekewukd805hq9xeuwj9uy89pvgf4zyq053kluthp3d4z7h8vaa4nv75tmwlc5y3duk7l4aylcmwaqrdljzl4gjm62nuxdgftl0lqh9m7xmeaha0t7dc0tp3wrwah94w7xaltkvnq460f8l09atlnd0vueveq3glt7mka5xk28fas8hawnqamaa80nfhdr7jna5qvldunsnhh70ra78ze5ycatyhplvmlhc0xf8skk4fklj2pkwtxh30xwr03qr9ckmz7r97dwe8hlaajk0t6664dahv6y78anx29pmgxkdzmk3zj57am2ngdh05u699ce8k0qrrp5f3eccrkarcssjm4950tv63cfmf8dnh5nl9vp8w7hagjjuwm6udnftt24le2wnd79kadf4jxxrmuh5myxte6vh2sky9vlvnc3j2wjm079msdng0uan048n0t09lmsnn0mfl2teylev3avfgdupa32x57tjxe6t86phk6ypgrk4e2x92kasy447ds0te305gdsrrdvl9d8vurct22gqel9z8dh2pg2y3zdxjpa9t4ga98agazj4s3grz5g2cldpq5zez2jpdevdc7p28mfzrkru7nsk9vgdv9x7jmn9edtf5fn69xw84sxjaacjdemhdfsqaxu49dlzm0aq4rk0ptpxclwncekuk4yu29tgakdl53uwfdkaavr8dnmweljt66csujmjkeeznhecn9cx5aaw9du02wkkp09qkd8kmjyqtqqv6yzy7lk89vq"}'
```

Response:

```json
{
  "id": "0x7cd4ea3988ffe67388b7a12facff0499059000f99b0f9cb8b343c821b422ced9",
  "success": true,
  "valid": true
}
```

</details>

---

### `create_offer_for_ids`

Functionality: Creates a new Offer

Usage: chia rpc wallet [OPTIONS] create_offer_for_ids [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag            | Type    | Required | Description                                                                                                               |
| :-------------- | :------ | :------- | :------------------------------------------------------------------------------------------------------------------------ |
| offer           | OBJECT  | True     | A dictionary `[str, int]` of the Offer to create (see the examples below for specifics)                                   |
| fee             | NUMBER  | False    | An optional fee (in mojos) to include with the Offer [Default: `0`]                                                       |
| validate_only   | BOOLEAN | False    | Set to `true` to verify the validity of a potential Offer, rather than actually creating an Offer [Default: `false`]      |
| driver_dict     | OBJECT  | False    | A dictionary `[str, Any]` containing metadata of the asset being requested, for example an NFT's on-chain metadata        |
| min_coin_amount | NUMBER  | False    | The minimum coin size to be included in the Offer [Default: `0`]                                                          |
| max_coin_amount | NUMBER  | False    | The maximum coin size to be included in the Offer [Default: `0`]                                                          |
| solver          |         | False    | Default: None                                                                                                             |
| min_height      | NUMBER  | False    | The minimum block height that must be reached before this Offer becomes valid [Default: `null` (not used)]                  |
| min_time        | NUMBER  | False    | The minimum UNIX timestamp that must be reached before this Offer becomes valid [Default: `null` (not used)]                |
| max_height      | NUMBER  | False    | The maximum block height where this Offer is still considered valid, aka the expiry height [Default: `null` (not used)]     |
| max_time        | NUMBER  | False    | The maximum UNIX timestamp where this Offer is stil considered valid, aka the expiry timestamp [Default: `null` (not used)] |

:::note

Although relative time lock flags are included in Offer files, the RPC API does not yet support them. The unsupported flags include:
* `max_blocks_after_created`
* `max_secs_after_created`
* `min_blocks_since_created`
* `min_secs_since_created`

In addition, of the four absolute time lock flags, the reference wallet will only recognize `max_time`. 

The other three **(**`min_height`, `min_time`, and `max_height`**)** are each enforced on the blockchain, but the reference wallet will not currently understand that the time locks need to be applied until it submits the Offer spendbundle to the mempool. 
For this reason, if you use the reference wallet to accept an Offer that uses any of these three flags, the transaction will be initiated, but will fail. 
Your log file will contain `ASSERT_SECONDS_ABSOLUTE_FAILED` in this case, but the GUI will continue to show the pending transaction as if it were still valid.

:::

<details>
<summary>Example 1: sell an NFT</summary>

This example will create an Offer to sell an NFT. First, list the NFTs in the local wallet. For example:

```json
chia rpc wallet nft_get_nfts '{"wallet_id": 2}'
```

Response:

```json
{
  "nft_list": [
    {
      "chain_info": "((117 \"https://bafkreifouyunkfshyhywp27uxx62bicxmarr263kohlyshg6s5yphv5acq.ipfs.nftstorage.link\") (104 . 0xaea628d51647c1f167ebf4bdfda0a05760231d7b6a71d7891cde9770f3d7a014) (28021 \"https://bafkreibspamgjmtkisxjqocjqpb3qjo4tqmjacrhe6d7jmddgdny5kenuu.ipfs.nftstorage.link\") (27765 \"https://bafkreibd6dchfc56by7fntdoe2viwdnbfbhowals4ivipugkzq6btx7koq.ipfs.nftstorage.link/\") (29550 . 1) (29556 . 1) (28008 . 0x32781864b26a44ae98384983c3b825dc9c18900a272787f4b06330db8ea88da5) (27752 . 0x23f0c4728bbe0e3e56cc6e26aa8b0da1284eeb0172e22a87d0cacc3c19dfea74))",
      "data_hash": "0xaea628d51647c1f167ebf4bdfda0a05760231d7b6a71d7891cde9770f3d7a014",
      "data_uris": [
        "https://bafkreifouyunkfshyhywp27uxx62bicxmarr263kohlyshg6s5yphv5acq.ipfs.nftstorage.link"
      ],
      "edition_number": 1,
      "edition_total": 1,
      "launcher_id": "0x93c7f48778b5758254bf8dcf6ce50bf203841e30735979d3a075b49342276d0d",
      "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
      "license_hash": "0x23f0c4728bbe0e3e56cc6e26aa8b0da1284eeb0172e22a87d0cacc3c19dfea74",
      "license_uris": [
        "https://bafkreibd6dchfc56by7fntdoe2viwdnbfbhowals4ivipugkzq6btx7koq.ipfs.nftstorage.link/"
      ],
      "metadata_hash": "0x32781864b26a44ae98384983c3b825dc9c18900a272787f4b06330db8ea88da5",
      "metadata_uris": [
        "https://bafkreibspamgjmtkisxjqocjqpb3qjo4tqmjacrhe6d7jmddgdny5kenuu.ipfs.nftstorage.link"
      ],
      "mint_height": 2823110,
      "minter_did": "0x88ac2fbe439e8de2edc891bc0a6721fa709f9f4bba69c74150810ae3a081596c",
      "nft_coin_id": "0xce1061c6ebaeb4820449b72be34f929449dda8b2e7a59c63f55e2d803a8170e0",
      "nft_id": "nft1j0rlfpmck46cy49l3h8keegt7gpcg83swdvhn5aqwk6fxs38d5xs5s9ewk",
      "off_chain_metadata": null,
      "owner_did": null,
      "p2_address": "0xa95c074e5c0da290328078f7c2851b23549d0523214a96bebf663e9eb432d569",
      "pending_transaction": false,
      "royalty_percentage": 0,
      "royalty_puzzle_hash": "0xccc150219bd48d487cb06a7a6637ba2c38776c8e03c3b5962b51bbd2dc917707",
      "supports_did": true,
      "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
    }
  ],
  "success": true,
  "wallet_id": 2
}
```

Note the value of `launcher_id`, which in this case is `0x93c7f48778b5758254bf8dcf6ce50bf203841e30735979d3a075b49342276d0d`. This will be needed momentarily.

Next, create the Offer. A few things to note:

- "1" is the Wallet ID of the `STANDARD_WALLET` (the local XCH wallet)
- If a value is positive, it is being requested
- Therefore, this Offer will request 1000000000000 mojos (1 XCH)
- If a value is negative, it is being offered

Normally it's a good idea to set `validate_only` to `true` in order to make sure the Offer is valid. If everything looks OK, you can rerun the command with `validate_only` set to `false`, which is the case in the following example command:

```json
chia rpc wallet create_offer_for_ids '{"offer":{"1":1000000000000,"93c7f48778b5758254bf8dcf6ce50bf203841e30735979d3a075b49342276d0d":-1},"fee":10000000,"driver_dict":{},"validate_only":false}'
```

Response:

```json
{
  "offer": "offer1qqr83wcuu2rykcmqvpsxvgqqemhmlaekcenaz02ma6hs5w600dhjlvfjn477nkwz369h88kll73h37fefnwk3qqnz8s0lle0lzuk8m29ahf74v6c039gt8j0n7luufm07ul2zpa7vmagj57t89vyljcrj47dau6jdtxegfgdpj9fxvhx0j7a8wfydh578t84fcts7a48whzufmp3l00udu8zeffqzp4s8h05ccay50tx0mwha7lhynpxvru7r9ax2ldwfa7u0vthet3vk2xrn5fvvxgm9v7lhwrcanardkpp806v8rsfkmrs0mng2z4e32frhnxehvpmhgx3cuygk0ayxxlarxvj6xve9larxvj5xu9xqjftv9754ueq4hnl7l3gx7a888vndh2fwt0hmerugflcgjdvhr27meqhtd4wdl6lxrul39lk32k62nfpldauleeuuhlvfhpzvagpckte09q7n9kffm4tn0qtmeljs40jp3yr3y8k9h0k3ndpu464vak92knm44edhxuvcm7fmxpmv2ap2cs3w84r7vemgjgq50en8smh0crfecqh9ncf6867uc0m93xwc9sd7m7lq6ntcajke92uhyjd6m7npuy0vk08czyk9a9078ugeq5zj2fgkmfdwn62fn9jujkdfn9jltfveh95u27w4rx2stp0xqezltdgxqe54jjv4myy6tp2xger8nkwely2jtxwfqmjkd4d9nyzsv6dfshdfjevfq4adj6t9v5jajf0ffxyl4wte8xvkp46y43urwn9rftuthq00ex8llt9al0s2z7zzw2xt2anp2hh0jkund00p706q2glllumw2cnsg4fhqsrzdea9wmjgwanhq32kvpl8x4mqgxfhqczhhay5scrw2e3hy5z84fvc57zkde9y57jtt7jxsantta5zjtj8xnjsqtyfgjmjp3fdy5ujxtxc65k235ea9jhj2ff76j5jeveay5hjjtffy2ln6v9xmyjtxt9j5y6new426yk23fxr85a3lwe0gpp57nwy0xs2p38zzvgenx4scz5yxgmy2wtvhwscz70umpnk480ejge3s994m00ue2rktq7m0s4h495zmk2tzs0ec2g28mnu04mkqehj64thfu3w6hch4nzc74y64lwr4qer0ylht62vpclnt7tmd8hm5drtxl0d370e5x64wnaatx2umttza8mqwt0h4e8ne49a0w4szkw68vnn98uxyarkde68druq00lgan70zydylavenjpe2l2826l2kh9l3fqrk38ul7p38e5aflj9kltvjzhlnw8c29gmphdx0t4xkyrykpesmt0z8yau5dfmeg67je4ellfmnq45u8xvzqw9mpth50r2xaj4tfvcalftz2w0ap3rl0r5nfmwrm62wcne0vkzkv2z83xgmqed0vwuwsprw72r0vl7xt96k47y6f7fg7gktvsl7uzeklznlc0tt6j6cx26la60tvld3kynlju0krwlk52w7eku6h28cx90p543yx6348llu9sy9ku90x3wwt4hn5eknw9adp4jxl0tpwt0wwxrr7zgn6ac04ctsaf8hl3wkzutdj0346us8luezmh3kngz7muvhtpual829kltm9mrtqm2dl5l99tpj6qvd9kqpcrrdnjqpnumphqrgf324yyuqrk6vy25pyef6x8rs9kejp8xq5fca02lk7jcn3tjh0mk8l6g2v7watkc747w38094ecm5r2h35zqaq9tahlzlk08uvmdtr8r70yn0uj93lzl7hwlee7c0q4dv8p3tt8r9e0wathnk9tcxe0t4wy88wyc274ulw3whxhafg8lc6wf8gnl9leeat8whpeu0q3t6ad7f2ae6qjlvrzle4mk4yn5falfj7x9veqfnnth9wu47e6h7x5texdp6fwqcxn4mk5augp6cdfk3j4avsp2dpx7eusmzyu5dm436a5f70xntle7gavz9wje8e00z5rth6ujaf655tkyt07460l6uk8684zp8tq5j29crj8qv0caaf0ajatf7lpq4q2ltl2le6dcrwryhlhf00fxq3knw7lwkmye8mtl9tpc76g75upafxladesejvqdrteww7kfemhq9df2wm8vh5k48fez2j8efl9e0vl2llyk7lew2xlle8mgx9getm07q58s5hau9jg7v7p8dshdykls4855t223sejlwvd9m3h5che98edx3lqgr4wjm64e675hq9umn26hmcjd2zlwxcdzt734zyhjmwkhnuwumw7rvl3kl0yx6hge034703gztfht74aslnuc4cuak8g6atcknw8ua89ea7hapgl4zssqhrm6yel8c7tg3dpy6ganrlfuuz9aawahandca6lm34ryner6qgqpvq3ymqqjqgn79",
  "success": true,
  "trade_record": {
    "accepted_at_time": null,
    "coins_of_interest": [
      {
        "amount": 1,
        "parent_coin_info": "0xf6355c1b5aaf6abf2f8fd4c61c50a7c3e935d4861fbcdeee53ce765976036136",
        "puzzle_hash": "0x60a223434eeee141e75b3c5361f490c04d6330cf99d0781e7874dc036bbb518a"
      },
      {
        "amount": 3106899989,
        "parent_coin_info": "0xd5619c0b02a9279edf11ae85407fd8dc7472fe449fe6ab88d4cc480a5d4b24f5",
        "puzzle_hash": "0x1732d207b04a03dd7d622cc9f491d43ca0561cf73a1efacdaa0e26e8902c8b73"
      }
    ],
    "confirmed_at_index": 0,
    "created_at_time": 1678334380,
    "is_my_offer": true,
    "pending": {
      "93c7f48778b5758254bf8dcf6ce50bf203841e30735979d3a075b49342276d0d": 1,
      "unknown": 3106899989
    },
    "sent": 0,
    "sent_to": [],
    "status": "PENDING_ACCEPT",
    "summary": {
      "fees": 10000000,
      "infos": {
        "93c7f48778b5758254bf8dcf6ce50bf203841e30735979d3a075b49342276d0d": {
          "also": {
            "also": {
              "owner": "()",
              "transfer_program": {
                "launcher_id": "0x93c7f48778b5758254bf8dcf6ce50bf203841e30735979d3a075b49342276d0d",
                "royalty_address": "0xccc150219bd48d487cb06a7a6637ba2c38776c8e03c3b5962b51bbd2dc917707",
                "royalty_percentage": "0",
                "type": "royalty transfer program"
              },
              "type": "ownership"
            },
            "metadata": "((117 \"https://bafkreifouyunkfshyhywp27uxx62bicxmarr263kohlyshg6s5yphv5acq.ipfs.nftstorage.link\") (104 . 0xaea628d51647c1f167ebf4bdfda0a05760231d7b6a71d7891cde9770f3d7a014) (28021 \"https://bafkreibspamgjmtkisxjqocjqpb3qjo4tqmjacrhe6d7jmddgdny5kenuu.ipfs.nftstorage.link\") (27765 \"https://bafkreibd6dchfc56by7fntdoe2viwdnbfbhowals4ivipugkzq6btx7koq.ipfs.nftstorage.link/\") (29550 . 1) (29556 . 1) (28008 . 0x32781864b26a44ae98384983c3b825dc9c18900a272787f4b06330db8ea88da5) (27752 . 0x23f0c4728bbe0e3e56cc6e26aa8b0da1284eeb0172e22a87d0cacc3c19dfea74))",
            "type": "metadata",
            "updater_hash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
          },
          "launcher_id": "0x93c7f48778b5758254bf8dcf6ce50bf203841e30735979d3a075b49342276d0d",
          "launcher_ph": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
          "type": "singleton"
        }
      },
      "offered": {
        "93c7f48778b5758254bf8dcf6ce50bf203841e30735979d3a075b49342276d0d": 1
      },
      "requested": {
        "xch": 1000000000000
      }
    },
    "taken_offer": null,
    "trade_id": "0x0cb147ed072210499e1f33f288aa6233a37b7db0a49012d103a89168a08da1d0"
  }
}
```

The Offer itself is the value of `offer`, at the top of the response. 
It is possible to copy this string and paste it into the `Offers` dialog of the GUI.
You can also send the Offer directly in an email, direct message, etc. 
It does not contain any sensitive information. A "thief" only has two options: accept the Offer or ignore it.

</details>

<details>
<summary>Example 2: buy an NFT</summary>

This example will create an Offer to buy an NFT. By definition, the NFT cannot be in your wallet,
so you first need to query the blockchain to obtain an NFT's info based on its ID alone:

```json
chia rpc wallet nft_get_info '{"coin_id":"nft1ks2cqah7u6hjtj2q8vaem9a8e9n6v8rtxlzxzjs6zev8x3djevtq2kd8wn"}'
```

Response:

```json
{
  "nft_info": {
    "chain_info": "((117 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.gif\") (104 . 0x7a6eedd652d0e6d315e691e87f5098e858bfe646122d1a8759a40fcf3efb024b) (28021 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.json\") (27765 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/license.pdf\") (29550 . 1) (29556 . 1) (28008 . 0xb2214ff82ef10a57f653fd09e761c3fabe630996300f90f6fbefcb4f65904c8b) (27752 . 0x2267456bd2cef8ebc2f22a42947b068bc3b138284a587feda2edfe07a3577f50))",
    "data_hash": "0x7a6eedd652d0e6d315e691e87f5098e858bfe646122d1a8759a40fcf3efb024b",
    "data_uris": [
      "https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.gif"
    ],
    "edition_number": 1,
    "edition_total": 1,
    "launcher_id": "0xb4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16",
    "launcher_puzhash": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
    "license_hash": "0x2267456bd2cef8ebc2f22a42947b068bc3b138284a587feda2edfe07a3577f50",
    "license_uris": [
      "https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/license.pdf"
    ],
    "metadata_hash": "0xb2214ff82ef10a57f653fd09e761c3fabe630996300f90f6fbefcb4f65904c8b",
    "metadata_uris": [
      "https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.json"
    ],
    "mint_height": 2202579,
    "minter_did": "0x28131414fed2de3b03cb4b6d851f06492aaa905d9e7aa28ec227c072d839696e",
    "nft_coin_id": "0x4b79bd1b4ed64bde3c3d33a55390228e4e2b412d87bfa5acf42cced4f825ec3e",
    "nft_id": "nft1ks2cqah7u6hjtj2q8vaem9a8e9n6v8rtxlzxzjs6zev8x3djevtq2kd8wn",
    "off_chain_metadata": null,
    "owner_did": null,
    "p2_address": "0x5c98e0455b643c3c5007d3bb09623820059388ba6528d41ac17e7f6ba9c4bed6",
    "pending_transaction": false,
    "royalty_percentage": 300,
    "royalty_puzzle_hash": "0x53c8e63bb7e61215db3c109a168a8c7ce7d1828c438b542abe9368c83ad3f0ff",
    "supports_did": true,
    "updater_puzhash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
  },
  "success": true
}
```

The next step is to create a valid Offer that wallets will recognize. 
This includes creating a `driver_dict`, without which the Offer will be valid but wallets won't know how to interpret.
The response from the above RPC call will include the information necessary to create the `driver_dict`,
and the reference wallet uses a specific format for Offers.

The following is an example RPC call that includes all of the necessary information. 
However, it is formatted with multiple lines, so it will be difficult to copy/paste into a terminal.

We'll give a few single-line, OS-specific examples afterward.

```json
chia rpc wallet create_offer_for_ids '{
  "offer":{
    "1":-100000000000,"b4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16":1
  },
  "fee":10000,
  "driver_dict":{
    "b4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16":{
      "type":"singleton",
      "launcher_id":"0xb4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16",
      "launcher_ph":"0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
      "also":{
        "type":"metadata",
        "metadata":"((117 \\"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.gif\\") (104 . 0x7a6eedd652d0e6d315e691e87f5098e858bfe646122d1a8759a40fcf3efb024b) (28021 \\"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.json\\") (27765 \\"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/license.pdf\\") (29550 . 1) (29556 . 1) (28008 . 0xb2214ff82ef10a57f653fd09e761c3fabe630996300f90f6fbefcb4f65904c8b) (27752 . 0x2267456bd2cef8ebc2f22a42947b068bc3b138284a587feda2edfe07a3577f50))",
        "updater_hash":"0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b",
        "also":{
          "type":"ownership",
          "owner":"()",
          "transfer_program":{
            "type":"royalty transfer program",
            "launcher_id":"0xb4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16",
            "royalty_address":"0x53c8e63bb7e61215db3c109a168a8c7ce7d1828c438b542abe9368c83ad3f0ff",
            "royalty_percentage":"300"
          }
        }
      }
    }
  },
  "validate_only":false
}'
```

Just as in Example 1, the response includes the Offer itself at the top of the JSON output. Copy the string beginning with `offer1` and paste it into the reference wallet to verify its validity:

```json
{
  "offer": "offer1qqr83wcuu2rykcmqvpsxzgqq4gnsn0v2w6gchlaawrmeju4af4arrwu5s2kvce6at3nhmsa4v03kvgvc8furkat55swhlsmpwjj86a9ylhljq8mfs7jw6p044wxg9a7lhhuwphnff6my6aujm3m37wvl6q0kzy3tde6nh7w9j6d0nlchdsgk628m7aktm6jfqa47hwwnj705chexjdkhufx3fd9zegkcwhfknvg9auleg2neqcjpcj8mjehmfeks7gazhwlz4ffam6ukt3wwddlya3qah92s4wgqhr73797a5fyq68clmcfmhc85auqtzmuvure07v84jch8vzcwldm0qdf4uwatuj4xtjfxadlp37x8xf8nupxtz7jl7reyvj2fg9q5t057kfe95e2jdftx5etj2f6k2kjfdx48zmjwdx55j4jfwf4xzj24295hnxd7gfz425j72x99jc2kf9py56dxtxu62an2g4lxzkvwsegk5s27hed9j52f0eqhykn206h9vnnxt66mtqvw3ft85cqam9935q4wlmd45q9u7t5t86dl3g37vrrghz8aelwgga99mg3e0uylklaume8alal4xtksxxynga2v2echu8ksx4xnjsym2f5xv56wveex5hn34f0yzzkgadxu27dqvx4wyyssnxdmzcyn5tlsl0v0tnsalqhlwgly708udd0n9ee5q0lqnhm7hul7m8e6cxn3he9u3sz546dwmxtualtc0h5f89knj34tdmkrrvknf0pzat0ju7hm3a7hz7raqqkfalm408a6jtm6xn9a0lhchxu5z4dhf7wandtdah3qjdh844tjanauwj73kjap8ga08qujwarxwljxvalq3w88ll5vcra379zflxglfrvhwa844090t2cc53pafme08pcaa625hmzaw9hf320ekrc9zhdkmw484cr9zp3tclgr4fdrxv52xvegsdlqdefln5a47zuzfu7t8hh7f3y0fd5dcqktrt57ntn30xm6nja58d8kfh8rsct4lypkfyq0npsh2sxwddqvkk4rqdk03c5jz90yfs4glll3w888k40ml09v39n6xhpdhlz85lm9mcdjlsujrck85alr6lceqjgl0etsp9tv98mq48hkmvulalxn9vgn0nht9k6sayee0mdwyfp0wd67ewknh64pxsppf3gprjxwmgsdmrfj4l8ejtukh846a43sh036d6a3e80gkmjdmf3nfu0qr50vxrg0nmezadj5hkku0srmhefz57xxw5re2na6pku46t5neaaq5fzkda9kwcrqzramre95yeayjwnvk7cgqrw7kzddne7778jslravahl4ua8v2tklam7v9x0yc63l7mu7j8xkeu7t4unqs72l9q0th3npxakcgeynt8uaksf2edgpjtc07techllaakccnazlwm9ehu4wc08dhk7ufjn576jkwzem9m88jlhl3l3wtelltvvnvhvgvd5zq543hprajzagvtsamxaxn2vt4lzn83aagcvw8rt65l57a88ua4a0ls70tekewukd805hq9xeuwj9uy89pvgf4zyq053kluthp3d4z7h8vaa4nv75tmwlc5y3duk7l4aylcmwaqrdljzl4gjm62nuxdgftl0lqh9m7xmeaha0t7dc0tp3wrwah94w7xaltkvnq460f8l09atlnd0vueveq3glt7mka5xk28fas8hawnqamaa80nfhdr7jna5qvldunsnhh70ra78ze5ycatyhplvmlhc0xf8skk4fklj2pkwtxh30xwr03qr9ckmz7r97dwe8hlaajk0t6664dahv6y78anx29pmgxkdzmk3zj57am2ngdh05u699ce8k0qrrp5f3eccrkarcssjm4950tv63cfmf8dnh5nl9vp8w7hagjjuwm6udnftt24le2wnd79kadf4jxxrmuh5myxte6vh2sky9vlvnc3j2wjm079msdng0uan048n0t09lmsnn0mfl2teylev3avfgdupa32x57tjxe6t86phk6ypgrk4e2x92kasy447ds0te305gdsrrdvl9d8vurct22gqel9z8dh2pg2y3zdxjpa9t4ga98agazj4s3grz5g2cldpq5zez2jpdevdc7p28mfzrkru7nsk9vgdv9x7jmn9edtf5fn69xw84sxjaacjdemhdfsqaxu49dlzm0aq4rk0ptpxclwncekuk4yu29tgakdl53uwfdkaavr8dnmweljt66csujmjkeeznhecn9cx5aaw9du02wkkp09qkd8kmjyqtqqv6yzy7lk89vq",
  "success": true,
  "trade_record": {
    "accepted_at_time": null,
    "coins_of_interest": [
      {
        "amount": 98660829993,
        "parent_coin_info": "0x7d522db11cebce37a31cdd4726809b88d945c6934ba2da92bc3291c1dc0c31b0",
        "puzzle_hash": "0xe0e50da33925db2e000dcf791a5398d74024f22d806d8a4493cd4910617bb667"
      },
      {
        "amount": 6848692931,
        "parent_coin_info": "0xe9e107f7df52376652a92ea4c136e9ac179e09d81550d6a430fa3cf7490f47cd",
        "puzzle_hash": "0x9aaeae85798cbc29c7c63a325db036613ea2949546869556d94b0a59a236e398"
      }
    ],
    "confirmed_at_index": 0,
    "created_at_time": 1678339109,
    "is_my_offer": true,
    "pending": {
      "unknown": 10000,
      "xch": 105509512924
    },
    "sent": 0,
    "sent_to": [],
    "status": "PENDING_ACCEPT",
    "summary": {
      "fees": 10000,
      "infos": {
        "b4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16": {
          "also": {
            "also": {
              "owner": "()",
              "transfer_program": {
                "launcher_id": "0xb4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16",
                "royalty_address": "0x53c8e63bb7e61215db3c109a168a8c7ce7d1828c438b542abe9368c83ad3f0ff",
                "royalty_percentage": "300",
                "type": "royalty transfer program"
              },
              "type": "ownership"
            },
            "metadata": "((117 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.gif\") (104 . 0x7a6eedd652d0e6d315e691e87f5098e858bfe646122d1a8759a40fcf3efb024b) (28021 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.json\") (27765 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/license.pdf\") (29550 . 1) (29556 . 1) (28008 . 0xb2214ff82ef10a57f653fd09e761c3fabe630996300f90f6fbefcb4f65904c8b) (27752 . 0x2267456bd2cef8ebc2f22a42947b068bc3b138284a587feda2edfe07a3577f50))",
            "type": "metadata",
            "updater_hash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
          },
          "launcher_id": "0xb4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16",
          "launcher_ph": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
          "type": "singleton"
        }
      },
      "offered": {
        "xch": 100000000000
      },
      "requested": {
        "b4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16": 1
      }
    },
    "taken_offer": null,
    "trade_id": "0x7cd4ea3988ffe67388b7a12facff0499059000f99b0f9cb8b343c821b422ced9"
  }
}
```

In Windows, quotes need to be escaped with backslashes. 
The following is the equivalent command, formatted for Windows, using a single line. 
Note that for the quotes surrounding URIs _three_ backslashes are required:

```json
chia rpc wallet create_offer_for_ids '{ \"offer\":{ \"1\":-100000000000,\"b4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16\":1 }, \"fee\":10000, \"driver_dict\":{ \"b4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16\":{ \"type\":\"singleton\", \"launcher_id\":\"0xb4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16\", \"launcher_ph\":\"0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9\", \"also\":{ \"type\":\"metadata\", \"metadata\":\"((117 \\\"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.gif\\\") (104 . 0x7a6eedd652d0e6d315e691e87f5098e858bfe646122d1a8759a40fcf3efb024b) (28021 \\\"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.json\\\") (27765 \\\"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/license.pdf\\\") (29550 . 1) (29556 . 1) (28008 . 0xb2214ff82ef10a57f653fd09e761c3fabe630996300f90f6fbefcb4f65904c8b) (27752 . 0x2267456bd2cef8ebc2f22a42947b068bc3b138284a587feda2edfe07a3577f50))\", \"updater_hash\":\"0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b\", \"also\":{ \"type\":\"ownership\", \"owner\":\"()\", \"transfer_program\":{ \"type\":\"royalty transfer program\", \"launcher_id\":\"0xb4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16\", \"royalty_address\":\"0x53c8e63bb7e61215db3c109a168a8c7ce7d1828c438b542abe9368c83ad3f0ff\", \"royalty_percentage\":\"300\" } } } } }, \"validate_only\":false }'
```

In Linux and MacOS, the backslashes are generally not needed. Note, however, that one backslash is still needed in front of the quotes surrounding URIs.

The following command is equivalent to the one above, but formatted for Linux and MacOS:

```json
chia rpc wallet create_offer_for_ids '{ "offer":{ "1":-100000000000,"b4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16":1 }, "fee":10000, "driver_dict":{ "b4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16":{ "type":"singleton", "launcher_id":"0xb4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16", "launcher_ph":"0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9", "also":{ "type":"metadata", "metadata":"((117 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.gif\") (104 . 0x7a6eedd652d0e6d315e691e87f5098e858bfe646122d1a8759a40fcf3efb024b) (28021 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.json\") (27765 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/license.pdf\") (29550 . 1) (29556 . 1) (28008 . 0xb2214ff82ef10a57f653fd09e761c3fabe630996300f90f6fbefcb4f65904c8b) (27752 . 0x2267456bd2cef8ebc2f22a42947b068bc3b138284a587feda2edfe07a3577f50))", "updater_hash":"0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b", "also":{ "type":"ownership", "owner":"()", "transfer_program":{ "type":"royalty transfer program", "launcher_id":"0xb4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16", "royalty_address":"0x53c8e63bb7e61215db3c109a168a8c7ce7d1828c438b542abe9368c83ad3f0ff", "royalty_percentage":"300" } } } } }, "validate_only":false }'
```

</details>

<details>
<summary>Example 3: Expiring Offer</summary>

In this example, we will offer 0.1 CATs (`Launcher ID: 91aa...004r`) in exchange for 1 TXCH (`Wallet ID: 1`). In addition, we will add an expiry timestamp so that this Offer will expire on Jan. 1, 2024:

```bash
chia rpc wallet create_offer_for_ids '{"offer":{"1":1000000000000,"91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d":-100},"fee":10000000,"driver_dict":{},"validate_only":false, "max_time": 1704070800}'
```

Response:

```bash
{
    "offer": "offer1qqr83wcuu2rykcmqvpsxvgqqemhmlaekcenaz02ma6hs5w600dhjlvfjn477nkwz369h88kll73h37fefnwk3qqnz8s0lle0xp70k7vrwmdq0sfnsf7jns276kh4lah7ark8fkc5kmjeav0nkkmyms8jvjqcrgd9jd46wvwh568qn8qlklu95fmvv060rwr0h4c8r55hwwal5y32l7mnr09ckf2gqqtv3a67c0rra0fyx8y6tlt8e2qk6t0m6s0hl0hd0n9kflhnm2lah9ryzn49yre20axxr3ue2a7neg06mvh7zte0uk9jmzekjndhl5v330qtd2f00q0zeeadv2tcljxmdhjxtdh68tdh68tdk68tp57nmrdkmm5dw7srzlhqhn8h04883476dz7x6mny6jzdcga33n4s8n884cxcekcemz6mk3jk4v925m8z9f8s877t4tn3kdx07q7h6w8t0r0krkc5m8j2m0xu9v3q6es4x0uy92c2us9xuwp0cgp3h0rpwdkcn37486waykwls2k94hn7zlllxl5lkeytd9wv2yxurz5x56r4h9sxq6mac5ea7e5k66wa2xcj0an6kqq4eyqpvpellpl7dayem3phq8yrrl4lspgr8urleflu9zs6ypnxm0e77awkul4mh05cu4qwekejhwru43ztcv7wj4yan0lur7dvkyp4ualchadvjdeluy6kpqevlehlqtxcld0mp2dqctl4l5u065h2utealkaxme27yv5knkhxxgrc7fd57trg0mq0alcz7yu76yexf3mfear3424luwmt87cjqkuw9jmjn26h7xz96yrlyufp6rxfyhl3w8rv2remjywkvwewme3paxt2v8yxhhmd6fdhnuwhnslq7957ye20uafl79echvvpkt2w86e06d985ravvym8huef3hvlkmk0enw4fu44ad3ltshuwqrjlu5cdphlpw3pdpy6led8dt7qwyl90s4ffl0vewuhdjwj70al622xtlc54m4d6n7nsxmpz647l405p2qpq7ec6x9np3m4n8e0h74ua3328nznycrm7j3uu300e0adn8m4hulnuu27jpduqfyctxs2pcyckg307epnev6xa4f7hkx20mlk4ellnlhlqs4kreh2rzju0w6rs5ma60mlxs6v8thtv9tl3lynp7m7nxr0eg5nuhkfaxclysmrf35dmrzgq4stk5nvem5aajer9n07m0rjv3z4l38trd0lgdthakh2setfl3d8kmuw933khanfem0hk66l97a7htg6a9vdegaxjgvl65d8j5es3tq4jtscqkwrgm789ux074amv0r3lqdwcv8t72et85hddwm7mkas2hh6464rx60yk6llk79v6v06rcx9gmljh7zkr335dq89q9flazmz67dwctlv4n8npld5lw3s8wkhj7v57h67rj0nsvw8tn3hesq24vhahlsda2ldk847g8caa0h95wfmtwt4lvm96edwklv0uf9m78svj4dz6mgaqv82a2fl8hn8u7f484yy9uzpe67jnmfea7d6ytj08da0jkkz96t2fv4fdc9ht06ulzf86g43y0pdj7nw3dlcjfwl37550wn5vda70zavknx4h5xxnfhjpy9slrkwcpvxt7704adwslkh8lfp76at40dd0ny6zg4dgjwlkrcphtgy7lsx3jccq",
    "success": true,
    "trade_record": {
        "accepted_at_time": null,
        "coins_of_interest": [
            {
                "amount": 1000000000,
                "parent_coin_info": "0x3b5d9e333b75c20829f4acf07b122fbbb02df7bbeb033de5dee67df9ac201e24",
                "puzzle_hash": "0x7059f91bb16c1f24ee9677e2aa3bf454efc66316e69682db4f00004b707c63be"
            },
            {
                "amount": 97119866323,
                "parent_coin_info": "0x0894a86fc98304960b258e2e68e5eebdafe9efff903a13037b5c22e3bb5513b2",
                "puzzle_hash": "0xdfcfc555683e8ae18a579fc9e1b62c37b26c73c7790948a9f0815c557e985920"
            }
        ],
        "confirmed_at_index": 0,
        "created_at_time": 1695625850,
        "is_my_offer": true,
        "pending": {
            "91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d": 1000000000,
            "unknown": 97119866323
        },
        "sent": 0,
        "sent_to": [],
        "status": "PENDING_ACCEPT",
        "summary": {
            "fees": 10000000,
            "infos": {
                "91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d": {
                    "tail": "0x91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d",
                    "type": "CAT"
                }
            },
            "offered": {
                "91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d": 100
            },
            "requested": {
                "xch": 1000000000000
            }
        },
        "taken_offer": null,
        "trade_id": "0x0561bd8ab330bdc1c12231c6ddd75c4cda2d6e1ae5188274b228a77ff35efb35",
        "valid_times": {
            "max_blocks_after_created": null,
            "max_height": null,
            "max_secs_after_created": null,
            "max_time": 1704070800,
            "min_blocks_since_created": null,
            "min_height": null,
            "min_secs_since_created": null,
            "min_time": null
        }
    }
}
```

</details>

<details>
<summary>Example 4: Offer in time window</summary>

**Per the above note, this example will create a valid Offer, but the reference wallet currently (as of 2.1.0) will not be able to read it.**

In this example, we will offer 12.345 CATs (`Launcher ID: 91aa...004r`) in exchange for 1 TXCH (`Wallet ID: 1`). The offer will not be valid until UNIX timestamp `1700000000`, and it will expire after timestamp `1705000000`:

```bash
chia rpc wallet create_offer_for_ids '{"offer":{"1":1000000000000,"91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d":-12345},"fee":10000000,"driver_dict":{},"validate_only":false, "min_time": 1700000000, "max_time": 1705000000}'
```

Response:

```bash
{
    "offer": "offer1qqr83wcuu2rykcmqvpsxvgqqemhmlaekcenaz02ma6hs5w600dhjlvfjn477nkwz369h88kll73h37fefnwk3qqnz8s0lle0xp70k7vrwmdq0sfnsf7jns276kh4lah7ark8fkc5kmjeav0nkkmyms8jvnqekfckkdxnl3fwnhlarmv7ghjkcpjlj7838z7arcly3df5nqhkw45k76lcmcw9jkjsyrrq0wkx8ecetwt3acksljewvsa4jrlwurd6mamm7e4k04aw7k0deu6s5u32qkgnlffhumy2h0ym2mlx3904j7g003ujck0y66a6ah8upcza2zfmcrc5wlttxnkpudhmfafkmfapkmda3kmdu3jmdl5wj6d574rtl4smhpc97c97aaeu9w7kgm3k6uer5vnwg85fv4wp7cp7wakkphxwczhd6ddjtf24qegn2au34kzl2c7algresmh7ns6eclasakaxeqnxle09tcgkjv9tnrq3wkj4ypthpsmezy0d3cqdnd45k09w7m5efnh6zejdtuhkh0uflalmk3zm9tty3e4qs435xs7aev35xzuwt8h2k98kkjlt369rmvwhsvx7pqsvqzdlk0ls0a9k4uz8qcszw9xgtfswxqryr8l47s9gg8utljwq7glkzegdzrfe9mr26a8a078zwwf86ltmj8xyk45a4zx6j0hexvz9l0dlwh7whedc2hl4htr8e570a8asg2g8jdhlza58atxa2lgxg79falr7n96jz70llh3k7khp99a3a36p6q7pj00h5cjpwvzldlch4plqaha200ww0rzask0l2x2w3y53m2v2m3qsvjtu2y90r044etajcgfeumlc9qcddglr0sn6fjmd60pymhfffsas67lthe8kkv3k7xpu8exmem8f0n407qn8za3683wfg7mfles52n0h3chv2urt877nj6wmlw06d8zuha58a0j3ss8w8uzsesc92y95yntl9ka40cpcnu47r4p8dlnd6jake6te7hmfe2e87zjh7hh2062qmvyrte079usdfxyrm9rgckvxhwkvl97l24nkx9v7vgvmq00628n69am9lhkvlwklr70nst7g94sp9npv2pg8qnzej9lm9xt9r2mk4867cmfhw77hha707luzj5c8xavv6t3amgwzn0hf70c6nfsa0ads9d70ajv8md6vcdl9zs06le85tru6zvfxk3hydfqzkzxjjdh8wnh72yvkqam4uwdj5gh79avd9laf4wmk2l2tydr74k7nw3ukky6lkd88a77mttuhmh64drt59nh9z57f3nl23572ryzdvzkf0nq2esdendxu4mtlnlve4r0xfu8hd7rjtmt0lyga4ntnvgv94a3amjlemk0lldu2e5cl58sv23hl90u9v8rrg6qwxq2kwkwh08echeutguxqlzs0whe258ane39m40yduhv3gsmdslwm0esp2hvluhmsal2ldkr4728cuath4kwfmtwt4lvny6ad7kly0ud9tu8cvj4dj6mguqg867pg7lk0f2n8xu0982lmfvfmhzxchxdtltda8sunh5fk542rauavgvhn5udtq2w6zexjhvt720uldnmkyltvez63h67yh9lyenf4pl07yrd7zlrpf4q0508p2hga8tqne75d2v7fw7np2nnlx3c4txuawcpghus0dvqqc2j0aure5eas",
    "success": true,
    "trade_record": {
        "accepted_at_time": null,
        "coins_of_interest": [
            {
                "amount": 1000000000,
                "parent_coin_info": "0x3b5d9e333b75c20829f4acf07b122fbbb02df7bbeb033de5dee67df9ac201e24",
                "puzzle_hash": "0x7059f91bb16c1f24ee9677e2aa3bf454efc66316e69682db4f00004b707c63be"
            },
            {
                "amount": 97119866323,
                "parent_coin_info": "0x0894a86fc98304960b258e2e68e5eebdafe9efff903a13037b5c22e3bb5513b2",
                "puzzle_hash": "0xdfcfc555683e8ae18a579fc9e1b62c37b26c73c7790948a9f0815c557e985920"
            }
        ],
        "confirmed_at_index": 0,
        "created_at_time": 1695626838,
        "is_my_offer": true,
        "pending": {
            "91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d": 1000000000,
            "unknown": 97119866323
        },
        "sent": 0,
        "sent_to": [],
        "status": "PENDING_ACCEPT",
        "summary": {
            "fees": 10000000,
            "infos": {
                "91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d": {
                    "tail": "0x91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d",
                    "type": "CAT"
                }
            },
            "offered": {
                "91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d": 12345
            },
            "requested": {
                "xch": 1000000000000
            }
        },
        "taken_offer": null,
        "trade_id": "0x6d5f5b2a728851ce1b1d8797f734b6c963ee2b6717087d480be970eb58e1a22b",
        "valid_times": {
            "max_blocks_after_created": null,
            "max_height": null,
            "max_secs_after_created": null,
            "max_time": 1705000000,
            "min_blocks_since_created": null,
            "min_height": null,
            "min_secs_since_created": null,
            "min_time": 1700000000
        }
    }
}
```

</details>

---

### `get_all_offers`

Functionality: Gets multiple Offers for the current wallet, depending on the supplied parameters

Usage: chia rpc wallet [OPTIONS] get_all_offers [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag                 | Type    | Required | Description                                                                                                      |
| :------------------- | :------ | :------- | :--------------------------------------------------------------------------------------------------------------- |
| start                | NUMBER  | False    | The first Offer to display, inclusive [Default: `0`]                                                             |
| end                  | NUMBER  | False    | The last Offer to display, exclusive [Default: `10`]                                                             |
| exclude_my_offers    | BOOLEAN | False    | If `true`, don't show Offers that originated from this wallet [Default: `false`]                                 |
| exclude_taken_offers | BOOLEAN | False    | If `true`, don't show any Offers with a status of `CONFIRMED` [Default: `false`]                                 |
| include_completed    | BOOLEAN | False    | If `true`, show completed Offers [Default: `false`]                                                              |
| sort_key             | STRING  | False    | Optionally change the sort order of the results [Default: none]                                                  |
| reverse              | BOOLEAN | False    | If `true`, reverse the results [Default: `false`]                                                                |
| file_contents        | BOOLEAN | False    | If `true`, return a summary for the Offer. If `false`, only return the Offer's basic metadata [Default: `false`] |

<details>
<summary>Example</summary>

Show the first Offer:

```json
chia rpc wallet get_all_offers '{"start": 0, "end": 1}'
```

Response:

```json
{
  "offers": null,
  "success": true,
  "trade_records": [
    {
      "accepted_at_time": null,
      "coins_of_interest": [
        {
          "amount": 1,
          "parent_coin_info": "0xe2824e6ce7df1fc29aeba24ee7d4d3bfadad2360430391f249a0ed50f745d547",
          "puzzle_hash": "0xffdea0260e14e73ab4489772c63b75d65b5b070da5c260b2682bfd83d2ca0d6c"
        }
      ],
      "confirmed_at_index": 0,
      "created_at_time": 1676509124,
      "is_my_offer": true,
      "pending": {
        "afefeea01a615487ccfc2e3d70db69eceb5b715a81deba9e6b72b78067e61de6": 1
      },
      "sent": 0,
      "sent_to": [],
      "status": "PENDING_ACCEPT",
      "summary": {
        "fees": 0,
        "infos": {
          "afefeea01a615487ccfc2e3d70db69eceb5b715a81deba9e6b72b78067e61de6": {
            "also": {
              "also": {
                "owner": "()",
                "transfer_program": {
                  "launcher_id": "0xafefeea01a615487ccfc2e3d70db69eceb5b715a81deba9e6b72b78067e61de6",
                  "royalty_address": "0xb185af1a299b92ac0f5de04d12e86d3e08dac37af59565f45d1555d8941b6e82",
                  "royalty_percentage": "200",
                  "type": "royalty transfer program"
                },
                "type": "ownership"
              },
              "metadata": "((117 \"https://nftstorage.link/ipfs/bafybeiciasr5ifxl73lq6mv5otyaukrvb6326nk6cgcsny2x4wcjxxis3q/356.gif\" \"ipfs://bafybeiciasr5ifxl73lq6mv5otyaukrvb6326nk6cgcsny2x4wcjxxis3q/356.gif\") (104 . 0x7b4981aba8d8e9dd25c40d6c696cb32eb7e281cb5629b29af64a2dd36495beb1) (28021 \"https://nftstorage.link/ipfs/bafybeiciasr5ifxl73lq6mv5otyaukrvb6326nk6cgcsny2x4wcjxxis3q/356.json\" \"ipfs://bafybeiciasr5ifxl73lq6mv5otyaukrvb6326nk6cgcsny2x4wcjxxis3q/356.json\") (27765 \"https://nftstorage.link/ipfs/bafybeidgtm4uobrog5kc7pn7bsmusdasf5w3drzqiitdjb3wragqrb7ola/LICENSE%20AGREEMENT.png\") (29550 . 1) (29556 . 1) (28008 . 0x9b40e3ed1d6b767886e6e8841aa1f6b60f8dc02cb98b2b876576c8dffc41995b) (27752 . 0x8e20454114197f82c7f50324df80170951fa3dfffd3b8860290207fb1e73743e))",
              "type": "metadata",
              "updater_hash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
            },
            "launcher_id": "0xafefeea01a615487ccfc2e3d70db69eceb5b715a81deba9e6b72b78067e61de6",
            "launcher_ph": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
            "type": "singleton"
          }
        },
        "offered": {
          "afefeea01a615487ccfc2e3d70db69eceb5b715a81deba9e6b72b78067e61de6": 1
        },
        "requested": {
          "xch": 2000000000000
        }
      },
      "taken_offer": null,
      "trade_id": "0x039492f84708b8a585ddaa0dd44fa8db1a6afdad799b0900e37dfc9097f1f351"
    }
  ]
}
```

</details>

---

### `get_offer`

Functionality: Get the details of an Offer

Usage: chia rpc wallet [OPTIONS] get_offer [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag          | Type    | Required | Description                                                                                                      |
| :------------ | :------ | :------- | :--------------------------------------------------------------------------------------------------------------- |
| trade_id      | STRING  | True     | The `trade_id` of the Offer                                                                                      |
| file_contents | BOOLEAN | False    | If `true`, return a summary for the Offer. If `false`, only return the Offer's basic metadata [Default: `false`] |

<details>
<summary>Example</summary>

```json
chia rpc wallet get_offer '{"trade_id": "0x0958db8393a63dab6b2afa78abbfe91a0487e5b06e25174ec8c49d383f18afc0"}'
```

Response:

```json
{
  "offer": null,
  "success": true,
  "trade_record": {
    "accepted_at_time": 1678342997,
    "coins_of_interest": [
      {
        "amount": 1,
        "parent_coin_info": "0xc1d5924830950190008ec498deb7d1809c9203ed8f00e68a5097e2d0f2bdd41d",
        "puzzle_hash": "0x4ffb6a0a459b3229b1b399922d70c0a9283aaad4c86401d4ee277fba31b31ee8"
      },
      {
        "amount": 6848692931,
        "parent_coin_info": "0xe9e107f7df52376652a92ea4c136e9ac179e09d81550d6a430fa3cf7490f47cd",
        "puzzle_hash": "0x9aaeae85798cbc29c7c63a325db036613ea2949546869556d94b0a59a236e398"
      }
    ],
    "confirmed_at_index": 3353481,
    "created_at_time": 1678342997,
    "is_my_offer": false,
    "pending": {
      "87db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719": 1
    },
    "sent": 0,
    "sent_to": [],
    "status": "CONFIRMED",
    "summary": {
      "fees": 0,
      "infos": {
        "87db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719": {
          "also": {
            "also": {
              "owner": "0x700b5276a6ea93aeb290763ca90902a85e51287d468661961e425f3f95129a94",
              "transfer_program": {
                "launcher_id": "0x87db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719",
                "royalty_address": "0xea0a501540d9c0ec351e91dd124e29e86af834acd7d79e76d1e9202b2a414b58",
                "royalty_percentage": "300",
                "type": "royalty transfer program"
              },
              "type": "ownership"
            },
            "metadata": "((117 \"https://bafkreies6esf3tjdnhbdpwe535b3ozb2wykje2myyunmavaafxyggq7yyq.ipfs.nftstorage.link\") (104 . 0x92f1245dcd2369c237d89ddf43b7643ab614926998c51ac054002df06343f8c4) (28021 \"https://bafkreie7izsags3k33lermoyl2bzeylso3dto5ri7elqatzunzlut3jgyi.ipfs.nftstorage.link\") (27765 \"https://bafybeihpnxv5xiahxnxaxf4zefbnyrs7krri5slcnqon7nmywlpnppt6xe.ipfs.nftstorage.link/Froggy%20NFT%20License%20Agreement.pdf\") (29550 . 1) (29556 . 1) (28008 . 0x9f4664034b6aded648b1d85e8392617276c7377628f917004f346e5749ed26c2))",
            "type": "metadata",
            "updater_hash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
          },
          "launcher_id": "0x87db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719",
          "launcher_ph": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
          "type": "singleton"
        }
      },
      "offered": {
        "87db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719": 1
      },
      "requested": {
        "xch": 6600000000
      }
    },
    "taken_offer": "0x000000020000000000000000000000000000000000000000000000000000000000000000cfbfdeed5c4ca2de3d0bf520b9cb4bb7743a359bd2e6a188d19ce7dffc21d3e70000000000000000ff02ffff01ff02ff0affff04ff02ffff04ff03ff80808080ffff04ffff01ffff333effff02ffff03ff05ffff01ff04ffff04ff0cffff04ffff02ff1effff04ff02ffff04ff09ff80808080ff808080ffff02ff16ffff04ff02ffff04ff19ffff04ffff02ff0affff04ff02ffff04ff0dff80808080ff808080808080ff8080ff0180ffff02ffff03ff05ffff01ff02ffff03ffff15ff29ff8080ffff01ff04ffff04ff08ff0980ffff02ff16ffff04ff02ffff04ff0dffff04ff0bff808080808080ffff01ff088080ff0180ffff010b80ff0180ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffffa01c16c8d75a4758c9f9ceaeefb15d882224d72d3b14d57310299583bf9a80bb13ffffa056b40242ba5961c0624a20cbdb36f7e60f8d5749a8d61a6faff899bb6559c5caff850189640200ff80808080c1d5924830950190008ec498deb7d1809c9203ed8f00e68a5097e2d0f2bdd41d4ffb6a0a459b3229b1b399922d70c0a9283aaad4c86401d4ee277fba31b31ee80000000000000001ff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa087db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc05868747470733a2f2f6261666b72656965733665736633746a646e68626470776535333562336f7a623277796b6a65326d7979756e6d61766161667879676771377979712e697066732e6e667473746f726167652e6c696e6b80ffff68a092f1245dcd2369c237d89ddf43b7643ab614926998c51ac054002df06343f8c4ffff826d75ffc05868747470733a2f2f6261666b7265696537697a73616773336b33336c65726d6f796c32627a65796c736f3364746f35726937656c7161747a756e7a6c7574336a6779692e697066732e6e667473746f726167652e6c696e6b80ffff826c75ffc07f68747470733a2f2f6261667962656968706e78763578696168786e78617866347a6566626e797273376b72726935736c636e716f6e376e6d79776c706e7070743678652e697066732e6e667473746f726167652e6c696e6b2f46726f6767792532304e46542532304c6963656e736525323041677265656d656e742e70646680ffff82736e01ffff82737401ffff826d68a09f4664034b6aded648b1d85e8392617276c7377628f917004f346e5749ed26c280ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff01a0700b5276a6ea93aeb290763ca90902a85e51287d468661961e425f3f95129a94ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa087db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0ea0a501540d9c0ec351e91dd124e29e86af834acd7d79e76d1e9202b2a414b58ffff04ffff0182012cff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0915d5ba6e9d72fd792e02c28fc6be7cb6f73ddb34a1df9caae8585f26a73c72a88d14f5e7ceae20434f5311a48d530b0ff018080ff018080808080ff018080808080ff01808080ffffa0dd4daf660c3c05c2c233a1c27f06c0872eea9b22280d9f0e5e5028df63a5ea68ffa0669c0b472769c2c84f8ede0ce01a5a556537bed023d2a98ed26f6c182986ab49ff0180ff01ffffffff80ffff01ffff81f6ff80ffffff850189640200ffa0cfbfdeed5c4ca2de3d0bf520b9cb4bb7743a359bd2e6a188d19ce7dffc21d3e78080ff8080ffff33ffa0cfbfdeed5c4ca2de3d0bf520b9cb4bb7743a359bd2e6a188d19ce7dffc21d3e7ff01ffffa0cfbfdeed5c4ca2de3d0bf520b9cb4bb7743a359bd2e6a188d19ce7dffc21d3e78080ffff3fffa033cb40ac40c0391d2831bc08c1954a4bf429740ac648b5850fca7f478a58ccdc8080ff8080808080878ce79554fe049e8bb6a58bafb91ca12abb78aa04ac551b15db778f89973f6912729c9ee4a80c08788125274a0787ce0027b5af8aaf12ee0e0a6e749daaec28441a59418c58e04ebdef02780961242d76aa1679a4276a431b67245cd2597672",
    "trade_id": "0x0958db8393a63dab6b2afa78abbfe91a0487e5b06e25174ec8c49d383f18afc0"
  }
}
```

</details>

---

### `get_offers_count`

Functionality: Obtain a count of the number of offers created and taken with this wallet

Usage: chia rpc wallet [OPTIONS] get_offers_count [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters: None

<details>
<summary>Example</summary>

```bash
chia rpc wallet get_offers_count
```

Response:

```bash
{
    "my_offers_count": 2,
    "success": true,
    "taken_offers_count": 0,
    "total": 2
}
```

</details>

---

### `get_offer_summary`

Functionality: Returns the summary of a specific Offer. Works for Offers in any state

Usage: chia rpc wallet [OPTIONS] get_offer_summary [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag     | Type    | Required | Description                                                           |
| :------- | :------ | :------- | :-------------------------------------------------------------------- |
| offer    | STRING  | True     | The text of the Offer to summarize                                    |
| advanced | BOOLEAN | False    | Show advanced information, including expiration time [Default: false] |

<details>
<summary>Example 1</summary>

The `offer` parameter is the pasted contents of an Offer file:

```json
chia rpc wallet get_offer_summary '{"offer": "offer1qqr83wcuu2rykcmqvpsxzgqq4gnsn0v2w6gchlaawrmeju4af4arrwu5s2kvce6at3nhmsa4v03kvgvc8furkat55swhlsmpwjj86a9ylhljq8mfs7jw6p044wxg9a7lhhuwphnff6my6aujm3m37wvl6q0kzy3tde6nh7w9j6d0nlchdsgk628m7aktm6jfqa47hwwnj705chexjdkhufx3fd9zegkcwhfknvg9auleg2neqcjpcj8mjehmfeks7gazhwlz4ffam6ukt3wwddlya3qah92s4wgqhr73797a5fyq68clmcfmhc85auqtzmuvure07v84jch8vzcwldm0qdf4uwatuj4xtjfxadlp37x8xf8nupxtz7jl7reyvj2fg9q5t057kfe95e2jdftx5etj2f6k2kjfdx48zmjwdx55j4jfwf4xzj24295hnxd7gfz425j72x99jc2kf9py56dxtxu62an2g4lxzkvwsegk5s27hed9j52f0eqhykn206h9vnnxt66mtqvw3ft85cqam9935q4wlmd45q9u7t5t86dl3g37vrrghz8aelwgga99mg3e0uylklaume8alal4xtksxxynga2v2echu8ksx4xnjsym2f5xv56wveex5hn34f0yzzkgadxu27dqvx4wyyssnxdmzcyn5tlsl0v0tnsalqhlwgly708udd0n9ee5q0lqnhm7hul7m8e6cxn3he9u3sz546dwmxtualtc0h5f89knj34tdmkrrvknf0pzat0ju7hm3a7hz7raqqkfalm408a6jtm6xn9a0lhchxu5z4dhf7wandtdah3qjdh844tjanauwj73kjap8ga08qujwarxwljxvalq3w88ll5vcra379zflxglfrvhwa844090t2cc53pafme08pcaa625hmzaw9hf320ekrc9zhdkmw484cr9zp3tclgr4fdrxv52xvegsdlqdefln5a47zuzfu7t8hh7f3y0fd5dcqktrt57ntn30xm6nja58d8kfh8rsct4lypkfyq0npsh2sxwddqvkk4rqdk03c5jz90yfs4glll3w888k40ml09v39n6xhpdhlz85lm9mcdjlsujrck85alr6lceqjgl0etsp9tv98mq48hkmvulalxn9vgn0nht9k6sayee0mdwyfp0wd67ewknh64pxsppf3gprjxwmgsdmrfj4l8ejtukh846a43sh036d6a3e80gkmjdmf3nfu0qr50vxrg0nmezadj5hkku0srmhefz57xxw5re2na6pku46t5neaaq5fzkda9kwcrqzramre95yeayjwnvk7cgqrw7kzddne7778jslravahl4ua8v2tklam7v9x0yc63l7mu7j8xkeu7t4unqs72l9q0th3npxakcgeynt8uaksf2edgpjtc07techllaakccnazlwm9ehu4wc08dhk7ufjn576jkwzem9m88jlhl3l3wtelltvvnvhvgvd5zq543hprajzagvtsamxaxn2vt4lzn83aagcvw8rt65l57a88ua4a0ls70tekewukd805hq9xeuwj9uy89pvgf4zyq053kluthp3d4z7h8vaa4nv75tmwlc5y3duk7l4aylcmwaqrdljzl4gjm62nuxdgftl0lqh9m7xmeaha0t7dc0tp3wrwah94w7xaltkvnq460f8l09atlnd0vueveq3glt7mka5xk28fas8hawnqamaa80nfhdr7jna5qvldunsnhh70ra78ze5ycatyhplvmlhc0xf8skk4fklj2pkwtxh30xwr03qr9ckmz7r97dwe8hlaajk0t6664dahv6y78anx29pmgxkdzmk3zj57am2ngdh05u699ce8k0qrrp5f3eccrkarcssjm4950tv63cfmf8dnh5nl9vp8w7hagjjuwm6udnftt24le2wnd79kadf4jxxrmuh5myxte6vh2sky9vlvnc3j2wjm079msdng0uan048n0t09lmsnn0mfl2teylev3avfgdupa32x57tjxe6t86phk6ypgrk4e2x92kasy447ds0te305gdsrrdvl9d8vurct22gqel9z8dh2pg2y3zdxjpa9t4ga98agazj4s3grz5g2cldpq5zez2jpdevdc7p28mfzrkru7nsk9vgdv9x7jmn9edtf5fn69xw84sxjaacjdemhdfsqaxu49dlzm0aq4rk0ptpxclwncekuk4yu29tgakdl53uwfdkaavr8dnmweljt66csujmjkeeznhecn9cx5aaw9du02wkkp09qkd8kmjyqtqqv6yzy7lk89vq"}'
```

Response:

```json
{
  "id": "0x7cd4ea3988ffe67388b7a12facff0499059000f99b0f9cb8b343c821b422ced9",
  "success": true,
  "summary": {
    "fees": 10000,
    "infos": {
      "b4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16": {
        "also": {
          "also": {
            "owner": "()",
            "transfer_program": {
              "launcher_id": "0xb4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16",
              "royalty_address": "0x53c8e63bb7e61215db3c109a168a8c7ce7d1828c438b542abe9368c83ad3f0ff",
              "royalty_percentage": "300",
              "type": "royalty transfer program"
            },
            "type": "ownership"
          },
          "metadata": "((117 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.gif\") (104 . 0x7a6eedd652d0e6d315e691e87f5098e858bfe646122d1a8759a40fcf3efb024b) (28021 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/880.json\") (27765 \"https://bafybeigzcazxeu7epmm4vtkuadrvysv74lbzzbl2evphtae6k57yhgynp4.ipfs.nftstorage.link/license.pdf\") (29550 . 1) (29556 . 1) (28008 . 0xb2214ff82ef10a57f653fd09e761c3fabe630996300f90f6fbefcb4f65904c8b) (27752 . 0x2267456bd2cef8ebc2f22a42947b068bc3b138284a587feda2edfe07a3577f50))",
          "type": "metadata",
          "updater_hash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
        },
        "launcher_id": "0xb4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16",
        "launcher_ph": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
        "type": "singleton"
      }
    },
    "offered": {
      "xch": 100000000000
    },
    "requested": {
      "b4158076fee6af25c9403b3b9d97a7c967a61c6b37c4614a1a16587345b2cb16": 1
    }
  }
}
```

</details>

<details>
<summary>Example 2: with advanced details</summary>

This example will show the Offer's expiration timestamp (`max_time`):

```bash
chia rpc wallet get_offer_summary '{"advanced": true, "offer": "offer1qqr83wcuu2rykcmqvpsxvgqqemhmlaekcenaz02ma6hs5w600dhjlvfjn477nkwz369h88kll73h37fefnwk3qqnz8s0lle0xp70k7vrwmdq0sfnsf7jns276kh4lah7ark8fkc5kmjeav0nkkmyms8jvnq5t0mqjhhtmddtm6wfqwm7gh2wda5rqa3f0g4h032gk0asdrxcu0tal8lakxz7t3vj4sqqkmrn5a57k967jggwe5hkk0j5p057lh4qld7lw6mxmwnl08k4lew2xg982gg0j5m6vw8tej4md8jc74je0uyhjlevt8kdnd9xm0lqcrx7q56un76qw9nnm6c58nlyvkm05wkm05wkmd5wkmd57krfa8jxtdhlg6aasy9lwp0xlvlz00rtd56dud3hxf4y9m53trr02q0xw0tsd3hdpnkd5hfr4d2s24fkwx260q0avh2lxrv6vlufu05uwk7wlvrd3fk0y4j7ac2ezp4n3gvheg24q4eq2duuzlsczrw7kzumd38rd205a6dvdaq4vtt0h79l77dlfadjfk62u65gvcz9g0fuxt2tqwp4hm4frmamfd45a65dsymm8hvqqtkgqzctnl6rl7m6gnhznvqwgx8ltaq2sx0c8ljn7c29p5gt8f32eydemw0xzvarkcvaux8mknp9rv9d8gswruexuks4437uuank67a07twkkd8va720tqsus0ymlu9ng07kac4ksv4u6nm78azt4x9u7lm0nda90zwttpmt4r5puryk70d35rusr7llpv6p4e6dhw57scwdl8u0hfecjumddflnlh3g8a798kww7ljcheefh6qyfqh0n0lqvzpe4nudkq0fxmfhpaymwd89xrkttmewh877ejqmq6857ye00vafl74lcrvutkrgw8efrmd88yza2du78raets0vl66xtem04el94udjlhsh5wgxjra57vf5l303pdfq6n6d0vnmqk808wgjfe7lyek7h4jwkl8elx26vt8m5ac9tmm7ng8tfr2s70kl7qjzp5ufsmwynpjm3jl60nu46afk2msjn9spmw337afw0f0adnl74nalmuvf7wpdcq3xc8xqypg9c72pt7f8ndv6vudt7m5k20rakamlmjlhlun4szfn2lrjs0w7r54te607lx36zxtkt58mhsh8na7tsnw803f5au03ff8gl9glrf3596mxgs4qpku4vfe5aa67resljmh8j53jh73ztm0l3g40h94hw3fdf03a0knmwdjpjkanfaelahjmldadjht064yv0cs7xk2ue6y082kecstq4kgqcp7vrtk8kylmulya2hr0257l43jw0p0xehayllkz6r8hjmcak08m6x7e3z0h074as89ralq5pafxlad3sejvs0nqpdanrd6aj4n3hnmf7yq7cca0xr8tr0m30m5tq3ngftl4vtllj6k37vw2q2kmlu97a0w6r6a5alk3k8h2a9dnkd6ljd2mv6kmthhh9zl0f67p2z5at5kkx8swqknd77s5uegxeufarnelr58my9t5vskrc7hm4t3lhsrtkw0m7yqv4hu82jwze8ek47dr9y9ltmzzy70ezwxg28alnnr7eaj7yl36j0t7juawpfat8au3glr8m7dkc2xatk74z2tkfnuktnpktgeea7sfssn03a8uwrflqqk0v5jh9kt2e7"}'
```

Response:

```bash
{
    "id": "0xd630d959269906f89ced378dc5402e3c3aa1c472e97bb5492e7ce37744187a2d",
    "success": true,
    "summary": {
        "fees": 10000000,
        "infos": {
            "91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d": {
                "tail": "0x91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d",
                "type": "CAT"
            }
        },
        "offered": {
            "91aa49303fd325cf8029cc0ee5e19ac78ec33d641d63b50d0ba859309a73004d": 100
        },
        "requested": {
            "xch": 1000000000000
        },
        "valid_times": {
            "max_height": null,
            "max_time": 1704070800,
            "min_height": null,
            "min_time": null
        }
    }
}
```

</details>

---

### `take_offer`

Functionality: Takes (accepts) a specific Offer, with a given fee

Usage: chia rpc wallet [OPTIONS] take_offer [REQUEST]

Options:

| Short Command | Long Command | Type | Required | Description                                                         |
| :------------ | :----------- | :--- | :------- | :------------------------------------------------------------------ |
| -j            | --json-file  | TEXT | False    | Instead of REQUEST, provide a json file containing the request data |
| -h            | --help       | None | False    | Show a help message and exit                                        |

Request Parameters:

| Flag  | Type      | Required | Description                                                           |
| :---- | :-------- | :------- | :-------------------------------------------------------------------- |
| offer | FILE PATH | True     | The text of the Offer to take (must be in the `PENDING_ACCEPT` state) |
| fee   | NUMBER    | False    | An optional fee (in mojos) to include with the Offer [Default: `0`]   |

<details>
<summary>Example</summary>

To take an Offer, paste its contents in the RPC call:

```json
chia rpc wallet take_offer '{"offer": "offer1qqr83wcuu2rykcmqvpsxygqqemhmlaekcenaz02ma6hs5w600dhjlvfjn477nkwz369h88kll73h37fefnwk3qqnz8s0lle0jqgnkufaeg779ex0w04aumuva4g99wdwdvkh9d2cgpek4ul7tyxmhq24e6ptqt2vf6ajyyc0y3ujn897dhm06xtld7uw0znt2tu7kl7vmjw357056nl4d3kwzsnqdvp4q7h5au3snr9r3qdpalygc77m9umvexwyljmflc2e2lq0g3ch8mkm6ghtluachjm4k6g7d3kdxvn7j9sutz5krd02e2y3f33tal2wkaced6t8kqvd84r93appphuc6n55338fflqln55pnqsnykgtf0dq0624ru87hvt3lhpmehymd62wjta7ugl8z0azxnrzckkkufalmpfr8lllstmdh2g2fa6rkwn0hmx6442678kk8u7xa82lcyhelw2pmam246fa7t4eur7cw539e7qggqmfmlegm4sutf0xwe2ht366577aj29uhlykns7k3wcjdg2h9cf38g758xcyxqar6vmu5anuqzt7cypdl70pvhlzzjlvrsx0dl0kd4sv56m8j4wt2txevnws7qlltrnvnpmqlx30flup3zxf9y5zvg4hmldycj6wegk5en2x9v75ug6w8y4vjj7gefy5ste9g5mr6vjw8l92yj3l9jhv43228hx2etftehxyktzvfdy2et60gshnet9y90wvs26x90dukjfw9yhu5tz0g49annxtcm9qtvepvn864qf8k43e7wg0nrde77wm0f6cd5fen9peuw5dfqgsqmwsljww8780el7ljj9u6y0xn92utz0fchrdn3kx8x55tw0ej5u5vj244x2nn30ecc5jt7dxgkv7d2feskyj24d9092nnff9cev7n9vehqwdr9qrkjspajvze2jdfnyvs27g5vkn3txvfry2hj9vfz35jw4dfd9yhn92ychnaj32ynxnu2wwf0xzls7080xuetefeq4us2pp9vu22jkpd69mzhj60f6h4gdpn79es5qyn87vun2tecj5yr9nr0fgx56nwdd0gjhjqfgduj8wy0xs0p3hzzvgenx4svxl9kzajwltmc6clrfhu2dzwfgkj5wnwt7nlq5uacr0jgt7a72ka5gzcthlw4ulh2f00g6vh4l7lzumjs24ka8emkd4dhk7yzfku7k4wtk0h36t6x6tcyun5wv8jgl5vfl8gcn7wz9cull73equk8c5f87f89ydjam57k4u4adtrzjy84809uu8rhhf2jlvt4ckax9flxc0q52akmd657hqv42kcqw4fdhv6hj8txexjnv6eerytgg302z3a0tfvwzdec5aul426zkzjky2erg5nvx3fxc2zvqf760uu8dsqkhmsqjyr4hpu7rr9gmlrt5snlnghtqlye46uhul2am0rfvzk6t2xdmydgpe3gt4gr8gxwcs944smkmd99sgxd6v3jx4aahjhtl02jg0ws60uepl87w47lrhkwt7en6nadd9k0m9z50a064caq040ul2zx9uj46r9x86kpsmvzjkvqe27hlllq4mhm4ax7rvtq836vj70z5fam2qh002hk22r270870zqg6wufe00k2lzl6pmgwxual4e3pj0l8mamcneyy2pfxnthmhg8ua9j47f0unjy56dk4nmsfwqwxnaqgap3ktaqgckpcm6pvycewzzkgpmz8j82qjvsurr3hakllmls8cknp34pcrj6ep4pnm8q8yaa0jl639nsn4e33kk2ll49a00t5gxdmkqwdkhhnln4ys0uk08w4h9hk4a06nv6sadm5225kxks49g4he0amhf6mu79p2nge7ljg2r68g53j4w5hldannpn49h4mh45th4378j4tnya74rvx3022gc70gspm7000nx4tsy64w394dz244eg57u5kfmtsjwv5m9tqgqqetra9fvjhn79", "fee": 1}'
```

Response:

```json
{
  "success": true,
  "trade_record": {
    "accepted_at_time": 1678342997,
    "coins_of_interest": [
      {
        "amount": 1,
        "parent_coin_info": "0xc1d5924830950190008ec498deb7d1809c9203ed8f00e68a5097e2d0f2bdd41d",
        "puzzle_hash": "0x4ffb6a0a459b3229b1b399922d70c0a9283aaad4c86401d4ee277fba31b31ee8"
      },
      {
        "amount": 6848692931,
        "parent_coin_info": "0xe9e107f7df52376652a92ea4c136e9ac179e09d81550d6a430fa3cf7490f47cd",
        "puzzle_hash": "0x9aaeae85798cbc29c7c63a325db036613ea2949546869556d94b0a59a236e398"
      }
    ],
    "confirmed_at_index": 0,
    "created_at_time": 1678342997,
    "is_my_offer": false,
    "pending": {
      "87db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719": 1
    },
    "sent": 0,
    "sent_to": [],
    "status": "PENDING_CONFIRM",
    "summary": {
      "fees": 0,
      "infos": {
        "87db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719": {
          "also": {
            "also": {
              "owner": "0x700b5276a6ea93aeb290763ca90902a85e51287d468661961e425f3f95129a94",
              "transfer_program": {
                "launcher_id": "0x87db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719",
                "royalty_address": "0xea0a501540d9c0ec351e91dd124e29e86af834acd7d79e76d1e9202b2a414b58",
                "royalty_percentage": "300",
                "type": "royalty transfer program"
              },
              "type": "ownership"
            },
            "metadata": "((117 \"https://bafkreies6esf3tjdnhbdpwe535b3ozb2wykje2myyunmavaafxyggq7yyq.ipfs.nftstorage.link\") (104 . 0x92f1245dcd2369c237d89ddf43b7643ab614926998c51ac054002df06343f8c4) (28021 \"https://bafkreie7izsags3k33lermoyl2bzeylso3dto5ri7elqatzunzlut3jgyi.ipfs.nftstorage.link\") (27765 \"https://bafybeihpnxv5xiahxnxaxf4zefbnyrs7krri5slcnqon7nmywlpnppt6xe.ipfs.nftstorage.link/Froggy%20NFT%20License%20Agreement.pdf\") (29550 . 1) (29556 . 1) (28008 . 0x9f4664034b6aded648b1d85e8392617276c7377628f917004f346e5749ed26c2))",
            "type": "metadata",
            "updater_hash": "0xfe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78b"
          },
          "launcher_id": "0x87db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719",
          "launcher_ph": "0xeff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9",
          "type": "singleton"
        }
      },
      "offered": {
        "87db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719": 1
      },
      "requested": {
        "xch": 6600000000
      }
    },
    "taken_offer": "0x000000020000000000000000000000000000000000000000000000000000000000000000cfbfdeed5c4ca2de3d0bf520b9cb4bb7743a359bd2e6a188d19ce7dffc21d3e70000000000000000ff02ffff01ff02ff0affff04ff02ffff04ff03ff80808080ffff04ffff01ffff333effff02ffff03ff05ffff01ff04ffff04ff0cffff04ffff02ff1effff04ff02ffff04ff09ff80808080ff808080ffff02ff16ffff04ff02ffff04ff19ffff04ffff02ff0affff04ff02ffff04ff0dff80808080ff808080808080ff8080ff0180ffff02ffff03ff05ffff01ff02ffff03ffff15ff29ff8080ffff01ff04ffff04ff08ff0980ffff02ff16ffff04ff02ffff04ff0dffff04ff0bff808080808080ffff01ff088080ff0180ffff010b80ff0180ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff1effff04ff02ffff04ff09ff80808080ffff02ff1effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffffa01c16c8d75a4758c9f9ceaeefb15d882224d72d3b14d57310299583bf9a80bb13ffffa056b40242ba5961c0624a20cbdb36f7e60f8d5749a8d61a6faff899bb6559c5caff850189640200ff80808080c1d5924830950190008ec498deb7d1809c9203ed8f00e68a5097e2d0f2bdd41d4ffb6a0a459b3229b1b399922d70c0a9283aaad4c86401d4ee277fba31b31ee80000000000000001ff02ffff01ff02ffff01ff02ffff03ffff18ff2fff3480ffff01ff04ffff04ff20ffff04ff2fff808080ffff04ffff02ff3effff04ff02ffff04ff05ffff04ffff02ff2affff04ff02ffff04ff27ffff04ffff02ffff03ff77ffff01ff02ff36ffff04ff02ffff04ff09ffff04ff57ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ffff011d80ff0180ffff04ffff02ffff03ff77ffff0181b7ffff015780ff0180ff808080808080ffff04ff77ff808080808080ffff02ff3affff04ff02ffff04ff05ffff04ffff02ff0bff5f80ffff01ff8080808080808080ffff01ff088080ff0180ffff04ffff01ffffffff4947ff0233ffff0401ff0102ffffff20ff02ffff03ff05ffff01ff02ff32ffff04ff02ffff04ff0dffff04ffff0bff3cffff0bff34ff2480ffff0bff3cffff0bff3cffff0bff34ff2c80ff0980ffff0bff3cff0bffff0bff34ff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ffff22ffff09ffff0dff0580ff2280ffff09ffff0dff0b80ff2280ffff15ff17ffff0181ff8080ffff01ff0bff05ff0bff1780ffff01ff088080ff0180ff02ffff03ff0bffff01ff02ffff03ffff02ff26ffff04ff02ffff04ff13ff80808080ffff01ff02ffff03ffff20ff1780ffff01ff02ffff03ffff09ff81b3ffff01818f80ffff01ff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff808080808080ffff01ff04ffff04ff23ffff04ffff02ff36ffff04ff02ffff04ff09ffff04ff53ffff04ffff02ff2effff04ff02ffff04ff05ff80808080ff808080808080ff738080ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff34ff8080808080808080ff0180ffff01ff088080ff0180ffff01ff04ff13ffff02ff3affff04ff02ffff04ff05ffff04ff1bffff04ff17ff8080808080808080ff0180ffff01ff02ffff03ff17ff80ffff01ff088080ff018080ff0180ffffff02ffff03ffff09ff09ff3880ffff01ff02ffff03ffff18ff2dffff010180ffff01ff0101ff8080ff0180ff8080ff0180ff0bff3cffff0bff34ff2880ffff0bff3cffff0bff3cffff0bff34ff2c80ff0580ffff0bff3cffff02ff32ffff04ff02ffff04ff07ffff04ffff0bff34ff3480ff8080808080ffff0bff34ff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ffff21ff17ffff09ff0bff158080ffff01ff04ff30ffff04ff0bff808080ffff01ff088080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa087db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01ff02ffff01ff02ffff01ff02ff3effff04ff02ffff04ff05ffff04ffff02ff2fff5f80ffff04ff80ffff04ffff04ffff04ff0bffff04ff17ff808080ffff01ff808080ffff01ff8080808080808080ffff04ffff01ffffff0233ff04ff0101ffff02ff02ffff03ff05ffff01ff02ff1affff04ff02ffff04ff0dffff04ffff0bff12ffff0bff2cff1480ffff0bff12ffff0bff12ffff0bff2cff3c80ff0980ffff0bff12ff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff0bff12ffff0bff2cff1080ffff0bff12ffff0bff12ffff0bff2cff3c80ff0580ffff0bff12ffff02ff1affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff0bffff01ff02ffff03ffff09ff23ff1880ffff01ff02ffff03ffff18ff81b3ff2c80ffff01ff02ffff03ffff20ff1780ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff33ffff04ff2fffff04ff5fff8080808080808080ffff01ff088080ff0180ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff0180ffff01ff02ffff03ffff09ff23ffff0181e880ffff01ff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ffff02ffff03ffff22ffff09ffff02ff2effff04ff02ffff04ff53ff80808080ff82014f80ffff20ff5f8080ffff01ff02ff53ffff04ff818fffff04ff82014fffff04ff81b3ff8080808080ffff01ff088080ff0180ffff04ff2cff8080808080808080ffff01ff04ff13ffff02ff3effff04ff02ffff04ff05ffff04ff1bffff04ff17ffff04ff2fffff04ff5fff80808080808080808080ff018080ff0180ffff01ff04ffff04ff18ffff04ffff02ff16ffff04ff02ffff04ff05ffff04ff27ffff04ffff0bff2cff82014f80ffff04ffff02ff2effff04ff02ffff04ff818fff80808080ffff04ffff0bff2cff0580ff8080808080808080ff378080ff81af8080ff0180ff018080ffff04ffff01a0a04d9f57764f54a43e4030befb4d80026e870519aaa66334aef8304f5d0393c2ffff04ffff01ffff75ffc05868747470733a2f2f6261666b72656965733665736633746a646e68626470776535333562336f7a623277796b6a65326d7979756e6d61766161667879676771377979712e697066732e6e667473746f726167652e6c696e6b80ffff68a092f1245dcd2369c237d89ddf43b7643ab614926998c51ac054002df06343f8c4ffff826d75ffc05868747470733a2f2f6261666b7265696537697a73616773336b33336c65726d6f796c32627a65796c736f3364746f35726937656c7161747a756e7a6c7574336a6779692e697066732e6e667473746f726167652e6c696e6b80ffff826c75ffc07f68747470733a2f2f6261667962656968706e78763578696168786e78617866347a6566626e797273376b72726935736c636e716f6e376e6d79776c706e7070743678652e697066732e6e667473746f726167652e6c696e6b2f46726f6767792532304e46542532304c6963656e736525323041677265656d656e742e70646680ffff82736e01ffff82737401ffff826d68a09f4664034b6aded648b1d85e8392617276c7377628f917004f346e5749ed26c280ffff04ffff01a0fe8a4b4e27a2e29a4d3fc7ce9d527adbcaccbab6ada3903ccf3ba9a769d2d78bffff04ffff01ff02ffff01ff02ffff01ff02ff26ffff04ff02ffff04ff05ffff04ff17ffff04ff0bffff04ffff02ff2fff5f80ff80808080808080ffff04ffff01ffffff82ad4cff0233ffff3e04ff81f601ffffff0102ffff02ffff03ff05ffff01ff02ff2affff04ff02ffff04ff0dffff04ffff0bff32ffff0bff3cff3480ffff0bff32ffff0bff32ffff0bff3cff2280ff0980ffff0bff32ff0bffff0bff3cff8080808080ff8080808080ffff010b80ff0180ff04ffff04ff38ffff04ffff02ff36ffff04ff02ffff04ff05ffff04ff27ffff04ffff02ff2effff04ff02ffff04ffff02ffff03ff81afffff0181afffff010b80ff0180ff80808080ffff04ffff0bff3cff4f80ffff04ffff0bff3cff0580ff8080808080808080ff378080ff82016f80ffffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff2fffff01ff80ff808080808080808080ff0bff32ffff0bff3cff2880ffff0bff32ffff0bff32ffff0bff3cff2280ff0580ffff0bff32ffff02ff2affff04ff02ffff04ff07ffff04ffff0bff3cff3c80ff8080808080ffff0bff3cff8080808080ffff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff2effff04ff02ffff04ff09ff80808080ffff02ff2effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff02ffff03ff5fffff01ff02ffff03ffff09ff82011fff3880ffff01ff02ffff03ffff09ffff18ff82059f80ff3c80ffff01ff02ffff03ffff20ff81bf80ffff01ff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff82019fffff04ff82017fff80808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff0180ffff01ff02ffff03ffff09ff82011fff2c80ffff01ff02ffff03ffff20ff82017f80ffff01ff04ffff04ff24ffff04ffff0eff10ffff02ff2effff04ff02ffff04ff82019fff8080808080ff808080ffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ffff02ff0bffff04ff17ffff04ff2fffff04ff82019fff8080808080ff8080808080808080808080ffff01ff088080ff0180ffff01ff02ffff03ffff09ff82011fff2480ffff01ff02ffff03ffff20ffff02ffff03ffff09ffff0122ffff0dff82029f8080ffff01ff02ffff03ffff09ffff0cff82029fff80ffff010280ff1080ffff01ff0101ff8080ff0180ff8080ff018080ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff8080808080808080808080ffff01ff088080ff0180ffff01ff04ff819fffff02ff3effff04ff02ffff04ff05ffff04ff0bffff04ff17ffff04ff2fffff04ff81dfffff04ff81bfffff04ff82017fff808080808080808080808080ff018080ff018080ff0180ffff01ff02ff3affff04ff02ffff04ff05ffff04ff0bffff04ff81bfffff04ffff02ffff03ff82017fffff0182017fffff01ff02ff0bffff04ff17ffff04ff2fffff01ff808080808080ff0180ff8080808080808080ff0180ff018080ffff04ffff01a0c5abea79afaa001b5427dfa0c8cf42ca6f38f5841b78f9b3c252733eb2de2726ffff04ffff01a0700b5276a6ea93aeb290763ca90902a85e51287d468661961e425f3f95129a94ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff81bfffff01ff04ff82013fffff04ff80ffff04ffff02ffff03ffff22ff82013fffff20ffff09ff82013fff2f808080ffff01ff04ffff04ff10ffff04ffff0bffff02ff2effff04ff02ffff04ff09ffff04ff8205bfffff04ffff02ff3effff04ff02ffff04ffff04ff09ffff04ff82013fff1d8080ff80808080ff808080808080ff1580ff808080ffff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ffff01ff02ff16ffff04ff02ffff04ff0bffff04ff17ffff04ff8202bfffff04ff15ff8080808080808080ff0180ff80808080ffff01ff04ff2fffff01ff80ff80808080ff0180ffff04ffff01ffffff3f02ff04ff0101ffff822710ff02ff02ffff03ff05ffff01ff02ff3affff04ff02ffff04ff0dffff04ffff0bff2affff0bff2cff1480ffff0bff2affff0bff2affff0bff2cff3c80ff0980ffff0bff2aff0bffff0bff2cff8080808080ff8080808080ffff010b80ff0180ffff02ffff03ff17ffff01ff04ffff04ff10ffff04ffff0bff81a7ffff02ff3effff04ff02ffff04ffff04ff2fffff04ffff04ff05ffff04ffff05ffff14ffff12ff47ff0b80ff128080ffff04ffff04ff05ff8080ff80808080ff808080ff8080808080ff808080ffff02ff16ffff04ff02ffff04ff05ffff04ff0bffff04ff37ffff04ff2fff8080808080808080ff8080ff0180ffff0bff2affff0bff2cff1880ffff0bff2affff0bff2affff0bff2cff3c80ff0580ffff0bff2affff02ff3affff04ff02ffff04ff07ffff04ffff0bff2cff2c80ff8080808080ffff0bff2cff8080808080ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff3effff04ff02ffff04ff09ff80808080ffff02ff3effff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01ffa07faa3253bfddd1e0decb0906b2dc6247bbc4cf608f58345d173adb63e8b47c9fffa087db6520e42d8889d9ed6a7d2aa8f6f183b1977b0f186fbe2341bd29ae1fb719a0eff07522495060c066f66f32acc2a77e3a3e737aca8baea4d1a64ea4cdc13da9ffff04ffff01a0ea0a501540d9c0ec351e91dd124e29e86af834acd7d79e76d1e9202b2a414b58ffff04ffff0182012cff0180808080ffff04ffff01ff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0915d5ba6e9d72fd792e02c28fc6be7cb6f73ddb34a1df9caae8585f26a73c72a88d14f5e7ceae20434f5311a48d530b0ff018080ff018080808080ff018080808080ff01808080ffffa0dd4daf660c3c05c2c233a1c27f06c0872eea9b22280d9f0e5e5028df63a5ea68ffa0669c0b472769c2c84f8ede0ce01a5a556537bed023d2a98ed26f6c182986ab49ff0180ff01ffffffff80ffff01ffff81f6ff80ffffff850189640200ffa0cfbfdeed5c4ca2de3d0bf520b9cb4bb7743a359bd2e6a188d19ce7dffc21d3e78080ff8080ffff33ffa0cfbfdeed5c4ca2de3d0bf520b9cb4bb7743a359bd2e6a188d19ce7dffc21d3e7ff01ffffa0cfbfdeed5c4ca2de3d0bf520b9cb4bb7743a359bd2e6a188d19ce7dffc21d3e78080ffff3fffa033cb40ac40c0391d2831bc08c1954a4bf429740ac648b5850fca7f478a58ccdc8080ff8080808080878ce79554fe049e8bb6a58bafb91ca12abb78aa04ac551b15db778f89973f6912729c9ee4a80c08788125274a0787ce0027b5af8aaf12ee0e0a6e749daaec28441a59418c58e04ebdef02780961242d76aa1679a4276a431b67245cd2597672",
    "trade_id": "0x0958db8393a63dab6b2afa78abbfe91a0487e5b06e25174ec8c49d383f18afc0"
  }
}
```

</details>

---
