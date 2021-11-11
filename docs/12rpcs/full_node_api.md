---
sidebar_position: 2
---

# Full Node API
The full node RPC API is exposed by the full node, by default on port 8555. This port must not be exposed publicly for
security concerns.

## get_network_info
Retrieves some information about the current network.

```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{}' \             
-H "Content-Type: application/json" -X POST https://localhost:8555/get_network_info  | python -m json.tool

// Response
{
    "network_name": "mainnet",
    "network_prefix": "xch",
    "success": true
}
```


## get_blockchain_state

Retrieves a summary of the current state of the blockchain and full node.

```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_blockchain_state | python -m json.tool


// Response:
{
    "blockchain_state": {
        "difficulty": 3008,
        "genesis_challenge_initialized": true,
        "mempool_size": 0,
        "peak": {
            "challenge_block_info_hash": "0x436bd6f7db0de90db868594b862d9388a231402f3c601282773ccab8e54914f3",
            "challenge_vdf_output": {
                "data": "0x01001ea29503859966e59024fb3a903e424a1652e724483b86928febca5e308d7039b7138847e436e5f1ba5f6c025f6c6ff275c070149079877463aa077f571d0706516723eaa51113c8ec624a005dc73704fcccefa26bb0eefbb9af15eb5c61b6090201"
            },
            "deficit": 15,
            "farmer_puzzle_hash": "0xe2f70baf739bdaf59e360d3a3e2d4ff8cb89f150d9b60b8e91b870e41b58f2fa",
            "fees": null,
            "finished_challenge_slot_hashes": null,
            "finished_infused_challenge_slot_hashes": null,
            "finished_reward_slot_hashes": null,
            "header_hash": "0xf42b4e77315d79ddfb3d64becb21e26ebff5408bda4d1b7c3782fd04f49ec0bb",
            "height": 914661,
            "infused_challenge_vdf_output": null,
            "overflow": false,
            "pool_puzzle_hash": "0x71afdce401a0f2a6f03de6287902eacfa38502d6667b04da36e32c3930171ce4",
            "prev_hash": "0x902ca8dfdd08e79dec3c96837f4e99162508ffaeff730c68af1fde9b86cbf61b",
            "prev_transaction_block_hash": null,
            "prev_transaction_block_height": 914660,
            "required_iters": 852774,
            "reward_claims_incorporated": null,
            "reward_infusion_new_challenge": "0x5566434842f375434f9a558a3de5907db44903036c3de1573852afffbd1991bd",
            "signage_point_index": 0,
            "sub_epoch_summary_included": null,
            "sub_slot_iters": 136314880,
            "timestamp": null,
            "total_iters": 3330271511334,
            "weight": 1393823840
        },
        "space": 40110198681182961664,
        "sub_slot_iters": 136314880,
        "sync": {
            "sync_mode": false,
            "sync_progress_height": 0,
            "sync_tip_height": 0,
            "synced": false
        }
    },
    "success": true
}
```

## get_block

Retrieves an entire block as a FulLBlock by header hash. Note that some blocks are transaction blocks, and some are not
(like the one below).

* **header_hash**: Heaader hash (block identifier) of the block to get. 

```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{"header_hash":"0xf42b4e77315d79ddfb3d64becb21e26ebff5408bda4d1b7c3782fd04f49ec0bb"}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_block | python -m json.tool
        

// Response

{
    "block": {
        "challenge_chain_ip_proof": {
            "normalized_to_identity": false,
            "witness": "0x0100b2958c29235fdf94a0b7476e039267d5d5d833f21b7af28c4e0aefde3767a9036523c67fc58706a1d1e91fd52e8f70db9a3401ff2e204c3ada572639d8fc966c990ccd7d8173ae4960e6ca05634c2ded08494e2c7a62d31684285db44ad0783f01000000000000170750a098e503259a8c08ec6a4192f1c9a950d09bb9ce43c4b9b3409420a519eca6c2650200549e022e2ce20e815b4a7a3ad376d173a78a8f0dc55022ce2a9d823495e9e719cd872a3c3e76a8b262e7c2650e6009a6f9b93434b228dbeb667a1d33b6a6b30051c7a00637cfcc6907269f0db89695a9a26bf1a63a13f01b23168795a5593e012b1d00000000004515f0a167be06b340921afd1dc019299dcebc42eeb906f3bffb86e740d190c09185b1c102000e7762337db196427682b5927617a0cfd7378f4d4bd434a62e19bd2e60f8bde267a5742a837351d5bac3ecc5ed2fd915a2caf1ac06061e90ed61f22b26a37034a5e7a631342184de9e218e1d7ff07640bc07ce2889efd082bd3ca11c8e80a74f0100",
            "witness_type": 2
        },
        "challenge_chain_sp_proof": null,
        "finished_sub_slots": [],
        "foliage": {
            "foliage_block_data": {
                "extension_data": "0x0000000000000000000000000000000000000000000000000000000003a2c7c9",
                "farmer_reward_puzzle_hash": "0xe2f70baf739bdaf59e360d3a3e2d4ff8cb89f150d9b60b8e91b870e41b58f2fa",
                "pool_signature": null,
                "pool_target": {
                    "max_height": 0,
                    "puzzle_hash": "0x71afdce401a0f2a6f03de6287902eacfa38502d6667b04da36e32c3930171ce4"
                },
                "unfinished_reward_block_hash": "0x293f38e7932dce9e8216820baf873c76836c8ffeb9ef24549a653f2c77a948d0"
            },
            "foliage_block_data_signature": "0x81fbc2b4d7d18e85db97e83f254ba6546cb08c80f50de1c7353d20a07d574d0d1c084273a1ef4822e164be450abb2dfe133e7d2d90727a43baae9ad858765b30eea9afaf809563760a07dc3fce343222af857b9af5f4d37f79a832e32f335335",
            "foliage_transaction_block_hash": null,
            "foliage_transaction_block_signature": null,
            "prev_block_hash": "0x902ca8dfdd08e79dec3c96837f4e99162508ffaeff730c68af1fde9b86cbf61b",
            "reward_block_hash": "0x5566434842f375434f9a558a3de5907db44903036c3de1573852afffbd1991bd"
        },
        "foliage_transaction_block": null,
        "infused_challenge_chain_ip_proof": null,
        "reward_chain_block": {
            "challenge_chain_ip_vdf": {
                "challenge": "0xed35c7dd67371857123344c847339e4d23dfa815ba8859d160813a228fc6fc22",
                "number_of_iterations": 7242534,
                "output": {
                    "data": "0x01001ea29503859966e59024fb3a903e424a1652e724483b86928febca5e308d7039b7138847e436e5f1ba5f6c025f6c6ff275c070149079877463aa077f571d0706516723eaa51113c8ec624a005dc73704fcccefa26bb0eefbb9af15eb5c61b6090201"
                }
            },
            "challenge_chain_sp_signature": "0xa8aeaba8b70ad7515055ab8c19d611226718f3bcd3311743a8e247fed59e069095514c68ba5862b186f9854089c27a3a19c45b91d2aebb21267b27268850cc220e1d33fc0e4c582e1602c968c2d58c5c629032ce7da2683a9ed651df729c07d0",
            "challenge_chain_sp_vdf": null,
            "height": 914661,
            "infused_challenge_chain_ip_vdf": null,
            "is_transaction_block": false,
            "pos_ss_cc_challenge_hash": "0xed35c7dd67371857123344c847339e4d23dfa815ba8859d160813a228fc6fc22",
            "proof_of_space": {
                "challenge": "0xad43c12b5c5a480ee93992697bd8c9153d536007b0ffac024341cd8ca853a9e3",
                "plot_public_key": "0x8b5f3cd22bf5073e12f285d2a0e9bbfb485fea8f3ede2f5573e44168fadbb91b71cef1dffc03758a5241c47b105df81a",
                "pool_contract_puzzle_hash": "0x71afdce401a0f2a6f03de6287902eacfa38502d6667b04da36e32c3930171ce4",
                "pool_public_key": null,
                "proof": "0xa84606d3dba86cbc1c2f56d05175bbbcb970629380bec5c49ad46f0c5f067e4ba74101ac24f0e09fb73ce0ebc9249436c528b5fab689d94c4213072e2acfc1c3a6f17763b16304234002ce471da4ce7e888e2f5abadf4d7f48cd157294ce03cb28df0f45597ca5460cd66c772c7650f2d170d08a5898fe65623b33aac864f44d2a39bcf074e62866edccf9b424f9a8ca56c9a98e87d48fb02b933af951284d610ff1eb71e730a05c2f6c7be86fd4df7efb26e8fb2e573981d8ad866adc02a82ffb0d7ff106c9c78f9cea08f4a2de9db2607266edf6e807924edf9af0f36b8938d97865072126011b67646b4d0e206b706d3a3e67e8862cb0502520f1ad1b4341",
                "size": 32
            },
            "reward_chain_ip_vdf": {
                "challenge": "0x316979467849d4f8ed3a962e773b0849bdfb4e02861191b5af36f270008b66f9",
                "number_of_iterations": 6791425,
                "output": {
                    "data": "0x0300854ebbccc4b4b5c0e0244dab12ada16568da6173b1dee587e0e8a212dacc66e562289358af482e1684f4bbe8b51fe96159ec2ad40a0758ff34e8be54bb63ba16399eb171ffce04ed6ffa5f532dfa0c9c779580f5daafff0d97e0c30ae22077060100"
                }
            },
            "reward_chain_sp_signature": "0xa81d4d596f4f657e7405eccbe99652eec386f624855b1e0dbd2bdccbc5c909572570daf173da11e26370cb00731ddda611a931eb67d03a3d9f286c704742fc5a4d3fdfb8f6b04ba960debf118e07effa5f030c688dbccb820718661ff8fe7e8a",
            "reward_chain_sp_vdf": null,
            "signage_point_index": 0,
            "total_iters": 3330271511334,
            "weight": 1393823840
        },
        "reward_chain_ip_proof": {
            "normalized_to_identity": false,
            "witness": "0x000005d3ec00e8927763e6782b80784547a215431ab10a0a0c9d3391a6e4583baf546c6b921bd3396d21a949dc187c1a1d0496f81a91b8716688f775cd425d3adc0717232b677b10807f112b7903ffe7dd8f730af4f4e942a2713322b3c2dda0b42b0100000000000017075086c91d61dc6e7eff70a214b1e3cdf067bcaeda45ef5d00e557984a2a7819f9ff19020077362394b1fe374632274ce77174cdbdebc9da0fc54df284dcb42b3a8cb2aab227da413dcd46927c272dd323b669cea7a001ac6247a423378eb94dea3154532dbcab891ef0fcf4f48dee4a689366f3622fa6e60a960c71b074f9520dad549224020100000000004515f0f10ac62807e87230aeb8bc486caac213a6418042c1ed9c1b5a1814c7e190f6e88902002364e9fb81c7b967e39eeb2e4ae6b4391fa262a5603c185cbc906acaf50e5ff7a7df7f3f3dede3b09c2a8b1a7dfd012a3d0c08ab21b5cf15fb4d1f1df9d4ff040b39eaa9ffccfa9ab3b03d5b33f312c13ff8908ddd9c640ede1e4d270aaab51b0100",
            "witness_type": 2
        },
        "reward_chain_sp_proof": null,
        "transactions_generator": null,
        "transactions_generator_ref_list": [],
        "transactions_info": null
    },
    "success": true
}

```


## get_blocks
Gets a list of full blocks by height. Important note: there might be multiple blocks at each height. To find out which
one is in the blockchain, use `get_block_record_by_height`.

* **start**: The start height.
* **end**: The end height (non-inclusive).
* **exclude_header_hash**: whether to exclude the header hash in the response (default false)

```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{"start": 100, "end": 200, "exclude_header_hash": true}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_blocks | python -m json.tool


// Response
{
  "blocks": [list of blocks as described above],
  "success": true
}
```

## get_block_record_by_height
 Retrieves a block record by height (assuming the height <= peak height). Note that not all blocks will have all
fields set here (depending on transaction block, finishing sub epoch, etc). 

* **height**: the height to get

```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{"height": 101}' -H "Content-Type: application/json" -X POST https://localhost:8555/get_block_record_by_height | python -m json.tool 

// Reponse
{
    "block_record": {
        "challenge_block_info_hash": "0x08dbc5c9f4676bad4cd2fad9b120afefdc107ffdd4066f73f14baf2a204f13df",
        "challenge_vdf_output": {
            "data": "0x0000af33fa9862d4e257498e9ba0c3cda09c1389d1fde0facd72ea26f5371ba94deb18137d95bd83b1c7afefba6293feda91d744d014c747e132db0247839e9bd00d790c06f753a9d344c80c455a86ecd979c31687ece60748a5d62dca4723c3780d0906"
        },
        "deficit": 9,
        "farmer_puzzle_hash": "0x8f5474dc460673a39c96bb0fdfea933f5d1269c138e47a67f07872c04803a4e7",
        "fees": 0, // iff is transaction block
        "finished_challenge_slot_hashes": null, // iff first block in sub slot
        "finished_infused_challenge_slot_hashes": null, // iff first block in sub slot
        "finished_reward_slot_hashes": null, // iff first block in sub slot
        "header_hash": "0x3723909a7374c4c88cf00ab9b15365f4988f5bdb2d51bac23f6af939fe40f56c",
        "height": 101,
        "infused_challenge_vdf_output": {
            "data": "0x0300a4bc6790208e73245df6a85b3f7beac0d17e73972b414a7f94cf1e3c3e9bb4a400516d368cfa8b1814f3b5163fe5a54a1fe35781f58290673c8d9f56cd23b94c138b21207d6aa6f3049f8ad805eb99b28292e06e748117e78e13598cee9945670100"
        }, // This is the intermediary VDF output at ip_iters in infused cc, iff deficit <  16
        "overflow": false,
        "pool_puzzle_hash": "0x8f5474dc460673a39c96bb0fdfea933f5d1269c138e47a67f07872c04803a4e7",
        "prev_hash": "0x9a6c8728021574c5f3242370831b9fde7a0421f4448b4848276fe1652580c6a7",
        "prev_transaction_block_hash": "0x6c94307cb88f37ca002936769246579824ecadc77fe1e445d31165e6958288e8", // iff is transaciton block
        "prev_transaction_block_height": 97,
        "required_iters": 1045145,
        "reward_claims_incorporated": [
            {
                "amount": 1750000000000,
                "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000000061",
                "puzzle_hash": "0x8f3dff600992a0b77aefbe8eb81dd4f233b9126f3b67557594b5a927d6e6d588"
            },
            {
                "amount": 250000000000,
                "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb00000000000000000000000000000061",
                "puzzle_hash": "0x8f3dff600992a0b77aefbe8eb81dd4f233b9126f3b67557594b5a927d6e6d588"
            }
        ], // iff is transaction block
        "reward_infusion_new_challenge": "0x100b6fbe0778ae13e48e9bf71b7de4e31e5c1d73a0b041e0277f4a76b5338604",
        "signage_point_index": 19,
        "sub_epoch_summary_included": null, // iff first block in sub epoch
        "sub_slot_iters": 134217728,
        "timestamp": 1616164827, // iff is transaction block
        "total_iters": 449835673,
        "weight": 714
    },
    "success": true
}

```

## get_block_record
Retrieves a block record by header hash.

* **header_hash**: the block's header_hash
 
```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{"header_hash": "0x3723909a7374c4c88cf00ab9b15365f4988f5bdb2d51bac23f6af939fe40f56c"}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_block_record | python -m json.tool 

// Response
{
    "block_record": {
        "challenge_block_info_hash": "0x08dbc5c9f4676bad4cd2fad9b120afefdc107ffdd4066f73f14baf2a204f13df",
        "challenge_vdf_output": {
            "data": "0x0000af33fa9862d4e257498e9ba0c3cda09c1389d1fde0facd72ea26f5371ba94deb18137d95bd83b1c7afefba6293feda91d744d014c747e132db0247839e9bd00d790c06f753a9d344c80c455a86ecd979c31687ece60748a5d62dca4723c3780d0906"
        },
        "deficit": 9,
        "farmer_puzzle_hash": "0x8f5474dc460673a39c96bb0fdfea933f5d1269c138e47a67f07872c04803a4e7",
        "fees": 0, // iff is transaction block
        "finished_challenge_slot_hashes": null, // iff first block in sub slot
        "finished_infused_challenge_slot_hashes": null, // iff first block in sub slot
        "finished_reward_slot_hashes": null, // iff first block in sub slot
        "header_hash": "0x3723909a7374c4c88cf00ab9b15365f4988f5bdb2d51bac23f6af939fe40f56c",
        "height": 101,
        "infused_challenge_vdf_output": {
            "data": "0x0300a4bc6790208e73245df6a85b3f7beac0d17e73972b414a7f94cf1e3c3e9bb4a400516d368cfa8b1814f3b5163fe5a54a1fe35781f58290673c8d9f56cd23b94c138b21207d6aa6f3049f8ad805eb99b28292e06e748117e78e13598cee9945670100"
        }, // This is the intermediary VDF output at ip_iters in infused cc, iff deficit <  16
        "overflow": false,
        "pool_puzzle_hash": "0x8f5474dc460673a39c96bb0fdfea933f5d1269c138e47a67f07872c04803a4e7",
        "prev_hash": "0x9a6c8728021574c5f3242370831b9fde7a0421f4448b4848276fe1652580c6a7",
        "prev_transaction_block_hash": "0x6c94307cb88f37ca002936769246579824ecadc77fe1e445d31165e6958288e8", // iff is transaciton block
        "prev_transaction_block_height": 97,
        "required_iters": 1045145,
        "reward_claims_incorporated": [
            {
                "amount": 1750000000000,
                "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000000061",
                "puzzle_hash": "0x8f3dff600992a0b77aefbe8eb81dd4f233b9126f3b67557594b5a927d6e6d588"
            },
            {
                "amount": 250000000000,
                "parent_coin_info": "0x3ff07eb358e8255a65c30a2dce0e5fbb00000000000000000000000000000061",
                "puzzle_hash": "0x8f3dff600992a0b77aefbe8eb81dd4f233b9126f3b67557594b5a927d6e6d588"
            }
        ], // iff is transaction block
        "reward_infusion_new_challenge": "0x100b6fbe0778ae13e48e9bf71b7de4e31e5c1d73a0b041e0277f4a76b5338604",
        "signage_point_index": 19,
        "sub_epoch_summary_included": null, // iff first block in sub epoch
        "sub_slot_iters": 134217728,
        "timestamp": 1616164827, // iff is transaction block
        "total_iters": 449835673,
        "weight": 714
    },
    "success": true
}
```

## get_block_records
 Retrieves block records in a range. 
 
* **start**: the start height
* **end**: the end height (non-inclusive)

```json 
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{"start": 5, "end": 7}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_block_records | python -m json.tool 

// Response
{
    "block_records": [list of block records as described above]
    "success": true
}
 ```

## get_unfinished_block_headers
Retrieves recent unfinished header blocks. These blocks might get finished and confirmed soon.
The height and header hash is unknown, because some of these blocks might not get confirmed, which will affect the
blocks after it.

```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{}' -H "Content-Type: application/json" -X POST https://localhost:8555/get_unfinished_block_headers | python -m json.tool

// Response
{
    "headers": [
        {
            "challenge_chain_sp_proof": {
                "normalized_to_identity": false,
                "witness": "0x0100a2d202a8582166f41a5478a2bebadaaa623224419820f88901c1f3df56ac7371a8b662fe4c8a9dba45c2de82f7bc4d2348dfc55b0ef08f5531e3d0607be127197f3e550e7bf044850f2711486cc775c9d3ae3e254f737a286de4c9ac54019e420100000000000000f230942683fcf5cd4aea65c1e1f3b34fdd0966ef2a52b80c912adae7820e5306cb24e10300ffe0d2a2cf9b93db55b719542b883f835c1398363d37c287241398e6fc7292265557e095b809f9aaab154e74355f3d2f8460438586a7c5fbf340a62cbecd4f0e9b1f775d923f609c603d8ed807b2af50c19e5ca4ed1f60f8ffac3cde4117e7120100000000000002d758b6f095a90eb49eadeb1f3ea24df7270e06e7d627735aacb3306d3a8f120f4b4afd0200cdcbe3ab1cbb123c85c58a7916954e1f0c8148da72d1d3f72f1a6d4c423039e9f0320d7a93da8c2f737a3aeba0c38e938f05addc5d16ffd74ffca3d812dfe8522a307efdcb6392ede54afec7dc5176ef439d5288717eca375f64818e543ff24d0100",
                "witness_type": 2
            },
            "finished_sub_slots": [],
            "foliage": {
                "foliage_block_data": {
                    "extension_data": "0x0000000000000000000000000000000000000000000000000000000003a2c7c9",
                    "farmer_reward_puzzle_hash": "0x77c08f1ae7c6ae4808c8c07f7d99363b0c00f0ad416c4a292b5341282e38dc35",
                    "pool_signature": "0xb39237cb5db187f1a3f210f5fff1bee0f7b66e466eb1bd393204768d982335f3ee5c7faec138e334110d80ce47e46704067db26f8a2c5267bbaefb74ea9ef144bd51a8fe388ba68727f3e246b8aefef427b2e2e299ed976d27ba2789bcf7cb7c",
                    "pool_target": {
                        "max_height": 0,
                        "puzzle_hash": "0x77c08f1ae7c6ae4808c8c07f7d99363b0c00f0ad416c4a292b5341282e38dc35"
                    },
                    "unfinished_reward_block_hash": "0xcc705bd601b6c9e3081bde85db2a917d312716136e077c37e7f5090c2685733f"
                },
                "foliage_block_data_signature": "0x838f98f281429094df95adbd023f7ac285ffe08d7e584e0e1c9d6def26b215f86753f52d781116eab02ac949beea9b9c009b6242ba97568f226aeafc2bf4fc83b791fffb2d636a8b0473727b5bee6a560b09df3dabf9d2b4ca707a35f22e5f38",
                "foliage_transaction_block_hash": "0x813540921a72fdfcbe47858e087b9e848df5fe2d8213288a6df71acf22214cf2",
                "foliage_transaction_block_signature": "0xb0db31ae6d773b3b27009cfdd9a232b54f840e00caf24a5a87e8c27e96933acd03d8e553ea62e9179ed4078ed86b9e471987e8803ff4311c9d0727d876490012af403094e3baa4f627785d846c60f770494c253ea7a09e7bc24a53ad683e4704",
                "prev_block_hash": "0x0b08b0ceca65b371729ad3731ba5982c0c63d487cd526874fb907c3e683eb185",
                "reward_block_hash": "0xcc705bd601b6c9e3081bde85db2a917d312716136e077c37e7f5090c2685733f"
            },
            "foliage_transaction_block": {
                "additions_root": "0x2c04ae163cf5916b774e2591b075560b6dface2b242d10cbb9f40b134cdf2080",
                "filter_hash": "0xea0d50f296d1bdaccc00be16e48a310dd4fa1fcf575065761add6366498b3fbf",
                "prev_transaction_block_hash": "0xf88a87d79c8e65ca559b7e74a9aca3a6f9fc90e6bb9dc6cb4602ed599610876e",
                "removals_root": "0x409433654e3b7a530da6cf55c93abde2c7a71a2ea9814883ceef956f8fed61ea",
                "timestamp": 1636577488,
                "transactions_info_hash": "0x9f3d9cb990c560fb66d4e09a9da79844ce933a809bc754eb151775f3600b73ed"
            },
            "reward_chain_block": {
                "challenge_chain_sp_signature": "0xa6058eaa6e9cf8469e152e80b4ac4c3cfdca8660cbe44ca50d3771ab1bbf1d040cba842d1b9bf633756159859ecb2ebc05b5f994cef91d5915d4763284e340095a59fb87f2e50fc3f0b6658d1663aeb9d6732373203d7e45df56eb19baeff64c",
                "challenge_chain_sp_vdf": {
                    "challenge": "0x04b130f89a8fc37519eab0d835a43ef5547552b2b67c5129fa00f79a57ba8d7f",
                    "number_of_iterations": 78200832,
                    "output": {
                        "data": "0x0200dd868820cb2fd82a8a234872a133e5660d55d43c79d10e1cf2258890820acce29d16831fd75f8c70e47bcdb67a264cceef982b151139741812a7aa477a647b1f0c5dd60eebfae9bd41a51911a54324c84c705d8169c7058d27d987fd8c22c0430100"
                    }
                },
                "pos_ss_cc_challenge_hash": "0x04b130f89a8fc37519eab0d835a43ef5547552b2b67c5129fa00f79a57ba8d7f",
                "proof_of_space": {
                    "challenge": "0xbe68fc3a34f3d2a6bfe329a3c27f390f5ef63ed9fd3373c3fe12e2c6729a98b4",
                    "plot_public_key": "0x90ca70c963f984d138fe4b97b3bade582513b8ddc115c8fd92033c7f3407df91e5d22313e83e80ea6f02c094636197be",
                    "pool_contract_puzzle_hash": null,
                    "pool_public_key": "0x8ab8f0eb56216b3f7376fb0462b5000b26f38461dc48f455a98581cec09f889b7c0b38eb42b9e2e2d7edd47d61da13d6",
                    "proof": "0xd1d823b917e7d493ae7bf14ad5fd045ca836bd2b3e97a34efcdc87c2aa4d335b9693c635997f559a2b17ddb7fd87cf352cc8a4a000ecfaaec516a52d7af17a775fff055b7f0f9018f2f6a27d36844f5381197fca792c668207bf7e3927c3f7a8d5854173e134dae95f51ab65f052fbf05b7f6fb046f3309589d6213c713a46a263dc3c2fdda2c7fc7236621e2a6b1164e4b6440aaa6ed403645753e1fb96629d0b7fd80236caad7be571aa1a6fbbfbee9380535e44bc8fac3ef5717e4ad93e3db5e60c617950d966b045ac20401f563a00069ec0052d9145f2f7d16311899d43abbb8b1eb60bcbb33fe82f7ec3c881afd47b16b1a3a34ac23e6a26c013c4e858",
                    "size": 32
                },
                "reward_chain_sp_signature": "0xa4fb8eb7afc74b945efe1f6b28453a708df7de1f0b56239c5fed50974b896b9bb1f559b49b5a6cf7f4351f1545918b5017e28e81f974bc7bdba88b61f2f9ca8492ab9b7d23371e579b30da9a1a5c7dc0a8fe5605a86165d34c3c552f509fdd7b",
                "reward_chain_sp_vdf": {
                    "challenge": "0x05a4bb9d88aa10cf90d6d1b20f85bb2a8ddb9ae7aa0ff5d071d9d9730f6466fc",
                    "number_of_iterations": 279309,
                    "output": {
                        "data": "0x020045ba80630612d81da719618b13dbbafc23f569d290b691a64cb2ae9ceb8533fd91f4b4be709dae0c2ac5bf980536afdf6c7bc9d94340bd211221fc863874c00968fc7c0030982ff329a887e498c907b6e002427d30c6f79dad947013dd5681240100"
                    }
                },
                "signage_point_index": 37,
                "total_iters": 4212156346430
            },
            "reward_chain_sp_proof": {
                "normalized_to_identity": false,
                "witness": "0x0100fd954fa240aa1684b66b89b9758a65f15ad90974315d730d26936f2a85266cfbc62f9a19fdf51dd8478063cc446adb4b1f54d52361a332825bf9abba1836470c0cf1894e901f541d025e26b986f6c49cb831af15c5bc96c79491da7f44a53a100201000000000000f23084d7fd81dc24c094a18d117901f47b0488fb3e5b807e1e48d0fd63c58cfffc710b0300698065626064242f57e8bc0d281b52387e1c851659c84c61b5ab8994d63798558863582f58d39abb15aa1742f4cd2715b88b7ec18f2709c7e1606360ef90803b0f2e41fa35879a24a02d9ca6812d72f0fc3a1cf62491e88cfdc2fc371a1d22420201000000000002d758c780237a30a9542ffe2f11c935fae0efe53180a9477a9e37466f9563a60250f5a7020065a8d6450b4c4b3fe3fd7eb047eea915d0addf140615a746616515ad73673b583c74dcfa3cd03f62e99c984fd5c6e1aaf254199a0c7464b18d40dc42c6928d351d7daa81209d5e10501f475b8a3bb5952a2754d8e728c3445ff58b66f590ca020200",
                "witness_type": 2
            },
            "transactions_filter": "0x"
        }
    ],
    "success": true
}

```

## get_network_space
Retrieves an estimate of the netspace, which is the total plotted space of all farmers, in bytes.

* **older_block_header_hash**: the start header hash
* **newer_block_header_hash**: the end header hash

```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{"older_block_header_hash": "0xd780d22c7a87c9e01d98b49a0910f6701c3b95015741316b3fda042e5d7b81d2", "newer_block_header_hash": "0xd3372ec62d3ef2f55a8e3d0e76f6f341212f5e09b4d5112add588262257a8e4e"}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_network_space | python -m json.tool 

// Response
{
    "space": 137052209455435968,
    "success": true
}
```

## get_additions_and_removals
Retrieves the additions and removals (state transitions) for a certain block. 
Returns coin records for each addition and removal.
Blocks that are not transaction blocks will have empty removal and addition lists. To get the actual puzzles and solutions
for spent coins, use the `get_puzzle_and_solution` api.

* **header_hash**: header hash of the block

```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{"header_hash": "bc89e52aabf264bd1fe4c11ee8aacfc7c03899a3f2604981000bddaedcc7167d"}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_additions_and_removals | python -m json.tool

// Response
{
    "additions": [
        {
            "coin": {
                "amount": 413530529990,
                "parent_coin_info": "0x35d9841f95f8f32050a76b0e24eefd2764d820c80f966eb30a79a2cb871588d1", // parent coin id
                "puzzle_hash": "0xebebc91efa8d5f7ed3de7a3c66b6a17abad2208494d053f8ca828c97ec7625c3"
            },
            "coinbase": false, // true means it is a farmer or pool reward, paid for by the blockchain
            "confirmed_block_index": 922652, // Block height of confirmation
            "spent": false, // whether or not the coin is spent
            "spent_block_index": 0, // the block height where coin was spent
            "timestamp": 1632832355 // the timestamp of the block where it was created
        },
        {
            "coin": {
                "amount": 80838001,
                "parent_coin_info": "0x6ddcbcef132c1f2de149527da87c0eec9aa337c66932b926da1a554c7da9aff3",
                "puzzle_hash": "0x6d23c175031242cf236f847bfd5ae288259bc17aa7022dad0629298995d9d462"
            },
            "coinbase": false,
            "confirmed_block_index": 922652,
            "spent": false,
            "spent_block_index": 0,
            "timestamp": 1632832355
        },
  ],
    "removals" : [
      {
            "coin": {
                "amount": 99899995990,
                "parent_coin_info": "0x8e9cac58448e58eee5a0fe8a9c9ab5ba094c6c560f9c340ba8d29905123a0757",
                "puzzle_hash": "0x37963ebd69b61f042322f8db0b6eed0fa386940c4fac31756c994e0bc5ab3f8e"
            },
            "coinbase": false,
            "confirmed_block_index": 922641,
            "spent": true,
            "spent_block_index": 922652,
            "timestamp": 1632832185
        },
        {
            "coin": {
                "amount": 921799000,
                "parent_coin_info": "0xd78dc3318386f028e090a0f41886983c6e83c7705d1318b93f5309aaa3ddc4b0",
                "puzzle_hash": "0xc45165adea743c6c31433801e220acd15ed9d1cacfa907a8dd1afacdb4e70da6"
            },
            "coinbase": false,
            "confirmed_block_index": 922641,
            "spent": true,
            "spent_block_index": 922652,
            "timestamp": 1632832185
        },
  ], 
"success": true
}
```

## get_coin_record_by_name
Retrieves a coin record by its name/id. The coin id can be obtained by hashing the Coin object.

* **name**: coin id or coin name.

```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{"name": "0xd78dc3318386f028e090a0f41886983c6e83c7705d1318b93f5309aaa3ddc4b0"}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_coin_record_by_name | python -m json.tool
        
// Response
{
    "coin_record": {
        "coin": {
            "amount": 921800500,
            "parent_coin_info": "0x055c0286a0eb881f2e950ce4ee30870868d1a951a0e0eb4dc52de5472a9c8b91",
            "puzzle_hash": "0xb1736654875b1c49b4077b89580c4447f12f1e86fb85d488d7efddd5c6e06be0"
        },
        "coinbase": false,
        "confirmed_block_index": 922637,
        "spent": true,
        "spent_block_index": 922641,
        "timestamp": 1632832094
    },
    "success": true
}
```

## get_puzzle_and_solution
Retrieves a coin's spend record by its coin id, sometimes referred to as coin name. Coin IDs can be calculated
by hashing the coin. The puzzle and solution are provided in CLVM format.

* **coin_id**: coin id or coin name.
* **height**: height that the coin was spent.


```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{"coin_id": "0xd78dc3318386f028e090a0f41886983c6e83c7705d1318b93f5309aaa3ddc4b0", "height": 922641}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_puzzle_and_solution | python -m json.tool
        
// Response
{
    "coin_solution": {
        "coin": {
            "amount": 921800500,
            "parent_coin_info": "0x055c0286a0eb881f2e950ce4ee30870868d1a951a0e0eb4dc52de5472a9c8b91",
            "puzzle_hash": "0xb1736654875b1c49b4077b89580c4447f12f1e86fb85d488d7efddd5c6e06be0"
        },
        "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0a86690841c222e78e9726962933db62bbe823fa858a6582b465073fbac0818893db2a0e40faf9aa371add95c37d8072cff018080",
        "solution": "0xff80ffff01ffff33ffa0bc421848e2404cc5cc83100ad7effd4f2126ce0d4564acea650e313ea2bb8e12ff8205dc80ffff33ffa0c45165adea743c6c31433801e220acd15ed9d1cacfa907a8dd1afacdb4e70da6ff8436f1895880ffff3cffa0dfaf7c8eb6e3ee108a3580bd91ca452701d5d0bf1d513b5d3accd750e75cc6858080ff8080"
    },
    "success": true
}

```

## get_coin_records_by_puzzle_hash
Retrieves a list of coin records with a certain puzzle hash.

* **puzzle_hash**: puzzle hash to search for
* **start_height** (optional): confirmation start height for search
* **end_height** (optional): confirmation end height for search
* **include_spend_coins**: whether to include spent coins too, instead of just unspent, default to false

```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{"puzzle_hash":"b1736654875b1c49b4077b89580c4447f12f1e86fb85d488d7efddd5c6e06be0", "start_height":800000, "end_height":1000000, "include_spent_coins": true}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_coin_records_by_puzzle_hash  | python -m json.tool

// Response
{
    "coin_records": [
        {
            "coin": {
                "amount": 921800500,
                "parent_coin_info": "0x055c0286a0eb881f2e950ce4ee30870868d1a951a0e0eb4dc52de5472a9c8b91",
                "puzzle_hash": "0xb1736654875b1c49b4077b89580c4447f12f1e86fb85d488d7efddd5c6e06be0"
            },
            "coinbase": false,
            "confirmed_block_index": 922637,
            "spent": true,
            "spent_block_index": 922641,
            "timestamp": 1632832094
        }
    ],
    "success": true
}

```


## push_tx
Pushes a transaction / spend bundle to the mempool and blockchain.
Returns whether the spend bundle was successfully included into the mempool. 

`SUCCESS` does not guarantee that the transaction will get confirmed. A transaction may be dropped from the mempool and not
included if the fee is too low. A transaction may also be combined with other transactions to form different spend 
bundles, so looking up the bundle by ID does not guarantee finding the original transaction. Transaction can be 
resubmitted with a higher fee, as long as the coins spent in the new transaction are a superset of the coins spent in 
the old one.

To check whether a transaction has been confirmed, use `get_coin_record_by_name` with
each coin id that should be created by this spend bundle. 


* **spend_bundle**: spend bundle to submit, in JSON


The error status can be one of:
* **SUCCESS**: if the transaction was successfully added to the mempool
* **PENDING**: if the transaction cannot be included yes due to timelocks or conflicts
* **FAILED**: transaction was not added to the mempool, and was dropped


```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{       
    "spend_bundle": {
    "aggregated_signature": "0xa5e5ea1f5ae2335a72fe0a7ed7ca39e8f142e2e1f6e37a348482290e88eb9cea2d973acf6145e34d0afeee7ba22f99850641e21a549b2c092bb49aa393acd938825bccca9413c1a268ba44367bc8433cd0fc0eb82e87bebe23817aa695bdb566",
    "coin_spends": [
        {
            "coin": {
                "amount": 1750000000000,
                "parent_coin_info": "0xccd5bb71183532bff220ba46c268991a00000000000000000000000000004082",
                "puzzle_hash": "0x94c6db00186900418ef7c1f05e127ee1a647cbe6e514ec3bc57acb7bbe6dfb10"
            },
            "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0aec9c2e5984fe928406abca942d55ec6b56340af8315bfefa55889dbaade669b9fd3f330af2af44c2a0626d383e64757ff018080",
            "solution": "0xff80ffff01ffff33ffa03fa549a708302b401c45cf387f8f03b4f76b7c9eabf567bea974f61dedf721e0ff840098968080ffff33ffa055b9fe4c9ce0cef8ad574bf5a9158dc0db7848b96be1a98ab2806d8f0a376a08ff860197738845808080ff8080"
        }
    ]
  }
}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/push_tx
        
// Response
{"status": "SUCCESS", "success": true}
```

## get_all_mempool_tx_ids
Returns a list of all transaction IDs (spend bundle hashes) in the mempool.

```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_all_mempool_tx_ids  | python -m json.tool

// Response
{
    "success": true,
    "tx_ids": ["0x94c6db00186900418ef7c1f05e127ee1a647cbe6e514ec3bc57acb7bbe6dfb10"]
}

```

## get_all_mempool_items
Returns all items in the mempool.
```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_all_mempool_items  | python -m json.tool

// Response
{"mempool_items": {
 "ed1f8d6bf3be8b4ed07c201b463ce03c3ea2b886f833749562d426d6d905c5d3": {
        "additions": [
            {
                "amount": 3968760041,
                "parent_coin_info": "0xbf71e1d17630e3793321944b5825b5b573ac28c03113498baae997e0781f0278",
                "puzzle_hash": "0x3be9de8637a998987687d6e3f1df95b6bcde6a2cbc7ed96b40fbc9d76bb5033d"
            },
        ],
        "cost": 10940866,
        "fee": 0,
        "npc_result": {
            "clvm_cost": 416866,
            "error": null,
            "npc_list": [
                {
                    "coin_name": "0xbf71e1d17630e3793321944b5825b5b573ac28c03113498baae997e0781f0278",
                    "conditions": [
                        [
                            "0x33",
                            [
                                {
                                    "opcode": "CREATE_COIN",
                                    "vars": [
                                        "0x3be9de8637a998987687d6e3f1df95b6bcde6a2cbc7ed96b40fbc9d76bb5033d",
                                        "0x00ec8e78e9",
                                        "0x"
                                    ]
                                },
                            ]
                        ],
                        [
                            "0x32",
                            [
                                {
                                    "opcode": "AGG_SIG_ME",
                                    "vars": [
                                        "0xb44f24f7dae4af24334870c3f291c8a8e4d370fb935f0c30b6d1fee734c229d351fed2a5a87c059049d205a8ec3c8124",
                                        "0xcae8db944550d51ef9eb4bdc297ac7a2ddb759f2e202c13df629abb41cc69290"
                                    ]
                                }
                            ]
                        ]
                    ],
                    "puzzle_hash": "0xdd259fada9e1fbfb1499df0755462222f31ec512404842b5c7dac26b9a5cb29a"
                }
            ]
        },
        "program": "0xff01ffffffa00252418f0ad7a0009dc055a48a2aaff897f4ea6289b57f1ed9c0d8c7a5b5e6a8ffff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b44f24f7dae4af24334870c3f291c8a8e4d370fb935f0c30b6d1fee734c229d351fed2a5a87c059049d205a8ec3c8124ff018080ff8500ed4e7564ffff80ffff01ffff33ffa057b09fa466e876fed06a697b0b82e237ad81424fa809df8c7f41fbcfcc7fcc25ff8400bffc7b80ffff33ffa03be9de8637a998987687d6e3f1df95b6bcde6a2cbc7ed96b40fbc9d76bb5033dff8500ec8e78e980ffff3cffa029505509405ab0d47b986bb2456c288dc272b7fecad9a54943db25c26dc03de48080ff8080808080",
        "removals": [
            {
                "amount": 3981342052,
                "parent_coin_info": "0x0252418f0ad7a0009dc055a48a2aaff897f4ea6289b57f1ed9c0d8c7a5b5e6a8",
                "puzzle_hash": "0xdd259fada9e1fbfb1499df0755462222f31ec512404842b5c7dac26b9a5cb29a"
            }
        ],
        "spend_bundle": {
            "aggregated_signature": "0xb693565c3ef3491f3fc374cbc0f58d3a02ba4f3df57d4da8a4d0c1856e4d36785dfb0f87aab75a2dd521065eb4b3030b17f63f84201d00ffb3bc4c1c9278c63e2bda5eaf6a6d8d96446dc79032a73a2ec0d16ed80227275213c55b2ca544bb60",
            "coin_spends": [
                {
                    "coin": {
                        "amount": 3981342052,
                        "parent_coin_info": "0x0252418f0ad7a0009dc055a48a2aaff897f4ea6289b57f1ed9c0d8c7a5b5e6a8",
                        "puzzle_hash": "0xdd259fada9e1fbfb1499df0755462222f31ec512404842b5c7dac26b9a5cb29a"
                    },
                    "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b44f24f7dae4af24334870c3f291c8a8e4d370fb935f0c30b6d1fee734c229d351fed2a5a87c059049d205a8ec3c8124ff018080",
                    "solution": "0xff80ffff01ffff33ffa057b09fa466e876fed06a697b0b82e237ad81424fa809df8c7f41fbcfcc7fcc25ff8400bffc7b80ffff33ffa03be9de8637a998987687d6e3f1df95b6bcde6a2cbc7ed96b40fbc9d76bb5033dff8500ec8e78e980ffff3cffa029505509405ab0d47b986bb2456c288dc272b7fecad9a54943db25c26dc03de48080ff8080"
                }
            ]
        },
        "spend_bundle_name": "0xed1f8d6bf3be8b4ed07c201b463ce03c3ea2b886f833749562d426d6d905c5d3"
    },
}
```

## get_mempool_item_by_tx_id
Gets a mempool item by tx id.

* **tx_id**: spend bundle hash


```json
// Request
curl --insecure --cert ~/.chia/mainnet/config/ssl/full_node/private_full_node.crt \
--key ~/.chia/mainnet/config/ssl/full_node/private_full_node.key \
-d '{"tx_id":"0x85ad9dbb26a72028f5d5810b24b6a59e58be48ee4e0aefb846a83606fcb671b3"}' \
-H "Content-Type: application/json" -X POST https://localhost:8555/get_mempool_item_by_tx_id  | python -m json.tool

// Response

{
    "mempool_item": {
        "additions": [
            {
                "amount": 12575944,
                "parent_coin_info": "0x9f8f27a7289850d48617d729a13269a120f86be267f4f3f4596d19ee1b23d36e",
                "puzzle_hash": "0x57b09fa466e876fed06a697b0b82e237ad81424fa809df8c7f41fbcfcc7fcc25"
            },
            {
                "amount": 1533495108,
                "parent_coin_info": "0x9f8f27a7289850d48617d729a13269a120f86be267f4f3f4596d19ee1b23d36e",
                "puzzle_hash": "0xc9b8fd4e5090d6ad8c77daabbaae6de4df3ff90eee71b8bcdec88bbab7c0f5d4"
            }
        ],
        "cost": 10916864,
        "fee": 0,
        "npc_result": {
            "clvm_cost": 416864,
            "error": null,
            "npc_list": [
                {
                    "coin_name": "0x9f8f27a7289850d48617d729a13269a120f86be267f4f3f4596d19ee1b23d36e",
                    "conditions": [
                        [
                            "0x33",
                            [
                                {
                                    "opcode": "CREATE_COIN",
                                    "vars": [
                                        "0x57b09fa466e876fed06a697b0b82e237ad81424fa809df8c7f41fbcfcc7fcc25",
                                        "0x00bfe4c8",
                                        "0x"
                                    ]
                                },
                                {
                                    "opcode": "CREATE_COIN",
                                    "vars": [
                                        "0xc9b8fd4e5090d6ad8c77daabbaae6de4df3ff90eee71b8bcdec88bbab7c0f5d4",
                                        "0x5b674744",
                                        "0x"
                                    ]
                                }
                            ]
                        ],
                        [
                            "0x32",
                            [
                                {
                                    "opcode": "AGG_SIG_ME",
                                    "vars": [
                                        "0x8aff7a77252f575fc56309ea9a6585eb1d8dd84e13b52a71d2474eef5a2f894c3bf1820063bc8c5bdd9e2f837d3a1156",
                                        "0x07037719d4c9273ee1a6e824098434e48b0b177a695a43f91360a4d90d1475ac"
                                    ]
                                }
                            ]
                        ]
                    ],
                    "puzzle_hash": "0x524d517cc746beaa0cc4c39e756a3bb8224806e56b54f068c11b9012374506db"
                }
            ]
        },
        "program": "0xff01ffffffa046fa86a4b2ba9cf949ef815071c9edf750d8548f11efdca0d253f579a62a5da9ffff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b08aff7a77252f575fc56309ea9a6585eb1d8dd84e13b52a71d2474eef5a2f894c3bf1820063bc8c5bdd9e2f837d3a1156ff018080ff845c272c0cffff80ffff01ffff33ffa057b09fa466e876fed06a697b0b82e237ad81424fa809df8c7f41fbcfcc7fcc25ff8400bfe4c880ffff33ffa0c9b8fd4e5090d6ad8c77daabbaae6de4df3ff90eee71b8bcdec88bbab7c0f5d4ff845b67474480ffff3cffa07b5792ad39b97d08565fa14797462c3096a69bfdd4c4746e72cb130f993d0d7b8080ff8080808080",
        "removals": [
            {
                "amount": 1546071052,
                "parent_coin_info": "0x46fa86a4b2ba9cf949ef815071c9edf750d8548f11efdca0d253f579a62a5da9",
                "puzzle_hash": "0x524d517cc746beaa0cc4c39e756a3bb8224806e56b54f068c11b9012374506db"
            }
        ],
        "spend_bundle": {
            "aggregated_signature": "0x96adbe87e0a0778f5d929bf51c915caee75906969a55588930e51cd9dd97aedb6d17e521ca203e7fb99cf91c8f1c20f80e19cbbb8ce1c888e92f2de9f66a4395b67cce0fa94623c6126d6f5f7e9a3c7feb6cee2ab4cf36c329cadda3018ff635",
            "coin_spends": [
                {
                    "coin": {
                        "amount": 1546071052,
                        "parent_coin_info": "0x46fa86a4b2ba9cf949ef815071c9edf750d8548f11efdca0d253f579a62a5da9",
                        "puzzle_hash": "0x524d517cc746beaa0cc4c39e756a3bb8224806e56b54f068c11b9012374506db"
                    },
                    "puzzle_reveal": "0xff02ffff01ff02ffff01ff02ffff03ff0bffff01ff02ffff03ffff09ff05ffff1dff0bffff1effff0bff0bffff02ff06ffff04ff02ffff04ff17ff8080808080808080ffff01ff02ff17ff2f80ffff01ff088080ff0180ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff17ff80808080ff80808080ffff02ff17ff2f808080ff0180ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b08aff7a77252f575fc56309ea9a6585eb1d8dd84e13b52a71d2474eef5a2f894c3bf1820063bc8c5bdd9e2f837d3a1156ff018080",
                    "solution": "0xff80ffff01ffff33ffa057b09fa466e876fed06a697b0b82e237ad81424fa809df8c7f41fbcfcc7fcc25ff8400bfe4c880ffff33ffa0c9b8fd4e5090d6ad8c77daabbaae6de4df3ff90eee71b8bcdec88bbab7c0f5d4ff845b67474480ffff3cffa07b5792ad39b97d08565fa14797462c3096a69bfdd4c4746e72cb130f993d0d7b8080ff8080"
                }
            ]
        },
        "spend_bundle_name": "0x85ad9dbb26a72028f5d5810b24b6a59e58be48ee4e0aefb846a83606fcb671b3"
    },
    "success": true
}

```

