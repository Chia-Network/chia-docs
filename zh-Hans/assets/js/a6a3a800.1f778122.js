"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[2841],{8890:(e,t,i)=>{i.r(t),i.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>r,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"protocol/pool/pool-protocol-specification","title":"Pool Protocol 1.0 Specification","description":"This is the initial version of the Chia Pool Protocol. It is designed to be simple, and to be extended later. It relies on farmers having smart coins (referred to as plot NFTs in GUI + CLI) which allow them to switch between pools by making transactions on the blockchain. Furthermore, it decreases the reliance on pools for block production, since the protocol only handles distribution of rewards, and it protects against pools or farmers acting maliciously.","source":"@site/i18n/zh-Hans/docusaurus-plugin-content-docs/current/protocol/pool/pool-protocol-specification.md","sourceDirName":"protocol/pool","slug":"/pool-protocol-specification","permalink":"/zh-Hans/pool-protocol-specification","draft":false,"unlisted":false,"editUrl":"https://github.com/Chia-Network/chia-docs/blob/main/docs/protocol/pool/pool-protocol-specification.md","tags":[],"version":"current","frontMatter":{"title":"Pool Protocol 1.0 Specification","slug":"/pool-protocol-specification"},"sidebar":"tutorialSidebar","previous":{"title":"Summary","permalink":"/zh-Hans/pool-protocol"},"next":{"title":"Wallet Protocol","permalink":"/zh-Hans/wallet-protocol"}}');var a=i(4848),o=i(8453);const r={title:"Pool Protocol 1.0 Specification",slug:"/pool-protocol-specification"},s="11.2 Chia Pool Protocol 1.0 Specification",l={},c=[{value:"Security considerations",id:"security-considerations",level:2},{value:"Parties",id:"parties",level:2},{value:"Farmer identification",id:"farmer-identification",level:2},{value:"Farmer authentication",id:"farmer-authentication",level:2},{value:"HTTPS Endpoints Summary",id:"https-endpoints-summary",level:2},{value:"Error codes",id:"error-codes",level:2},{value:"Signature validation",id:"signature-validation",level:2},{value:"Pool URL",id:"pool-url",level:2},{value:"GET /pool_info",id:"get-pool_info",level:2},{value:"description",id:"description",level:4},{value:"fee",id:"fee",level:4},{value:"logo_url",id:"logo_url",level:4},{value:"minimum_difficulty",id:"minimum_difficulty",level:4},{value:"name",id:"name",level:4},{value:"protocol_version",id:"protocol_version",level:4},{value:"relative_lock_height",id:"relative_lock_height",level:4},{value:"target_puzzle_hash",id:"target_puzzle_hash",level:4},{value:"authentication_token_timeout",id:"authentication_token_timeout",level:4},{value:"GET /farmer",id:"get-farmer",level:2},{value:"Parameter",id:"parameter",level:3},{value:"launcher_id",id:"launcher_id",level:4},{value:"authentication_token",id:"authentication_token",level:4},{value:"signature",id:"signature",level:4},{value:"POST /farmer",id:"post-farmer",level:2},{value:"payload",id:"payload",level:4},{value:"payload.launcher_id",id:"payloadlauncher_id",level:4},{value:"payload.authentication_token",id:"payloadauthentication_token",level:4},{value:"payload.authentication_public_key",id:"payloadauthentication_public_key",level:4},{value:"payload.payout_instructions",id:"payloadpayout_instructions",level:4},{value:"payload.suggested_difficulty",id:"payloadsuggested_difficulty",level:4},{value:"signature",id:"signature-1",level:4},{value:"PUT /farmer",id:"put-farmer",level:2},{value:"POST /partial",id:"post-partial",level:2},{value:"payload",id:"payload-1",level:4},{value:"payload.launcher_id",id:"payloadlauncher_id-1",level:4},{value:"payload.authentication_token",id:"payloadauthentication_token-1",level:4},{value:"payload.proof_of_space",id:"payloadproof_of_space",level:4},{value:"payload.proof_of_space.challenge",id:"payloadproof_of_spacechallenge",level:4},{value:"payload.proof_of_space.pool_contract_puzzle_hash",id:"payloadproof_of_spacepool_contract_puzzle_hash",level:4},{value:"payload.proof_of_space.plot_public_key",id:"payloadproof_of_spaceplot_public_key",level:4},{value:"payload.proof_of_space.size",id:"payloadproof_of_spacesize",level:4},{value:"payload.proof_of_space.proof",id:"payloadproof_of_spaceproof",level:4},{value:"payload.sp_hash",id:"payloadsp_hash",level:4},{value:"payload.end_of_sub_slot",id:"payloadend_of_sub_slot",level:4},{value:"aggregate_signature",id:"aggregate_signature",level:4},{value:"GET /login",id:"get-login",level:2},{value:"launcher_id",id:"launcher_id-1",level:4},{value:"authentication_token",id:"authentication_token-1",level:4},{value:"signature",id:"signature-2",level:4},{value:"Difficulty",id:"difficulty",level:2},{value:"Points",id:"points",level:2}];function d(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",h4:"h4",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.header,{children:(0,a.jsx)(t.h1,{id:"112-chia-pool-protocol-10-specification",children:"11.2 Chia Pool Protocol 1.0 Specification"})}),"\n",(0,a.jsx)(t.p,{children:"This is the initial version of the Chia Pool Protocol. It is designed to be simple, and to be extended later. It relies on farmers having smart coins (referred to as plot NFTs in GUI + CLI) which allow them to switch between pools by making transactions on the blockchain. Furthermore, it decreases the reliance on pools for block production, since the protocol only handles distribution of rewards, and it protects against pools or farmers acting maliciously."}),"\n",(0,a.jsx)(t.h2,{id:"security-considerations",children:"Security considerations"}),"\n",(0,a.jsx)(t.p,{children:"The pool must ensure that partials arrive quickly, faster than the 28-second time limit of inclusion into the blockchain. This allows farmers that have slow setups to detect issues."}),"\n",(0,a.jsxs)(t.p,{children:["The Pool server must check that the ",(0,a.jsx)(t.code,{children:"pool_contract_puzzle_hash"})," a.k.a. ",(0,a.jsx)(t.code,{children:"p2_singleton_puzzle_hash"})," matches the puzzle that they expect. Otherwise, the pool has no guarantee that users will not attempt to claim block rewards for themselves, and immediately leave the pool, something that the provided smart contract prevents."]}),"\n",(0,a.jsx)(t.p,{children:"The Chia client must only connect to the pool configuration URL via HTTPS over TLS >= 1.2. This is to prevent session hijacking, leading to user funds being stolen."}),"\n",(0,a.jsx)(t.h2,{id:"parties",children:"Parties"}),"\n",(0,a.jsx)(t.p,{children:"The parties involved in the pool protocol are the pool operator and farmers. Each farmer is running a farmer process, and any number of harvester processes connected to that farmer process. The full node can either be run by the farmer (the default in the Chia GUI application), or run by the pool operator. If the farmer does not want to run a full node, they can configure their node to connect to a remote full node."}),"\n",(0,a.jsx)(t.p,{children:"A pool operator can support any number of farmers."}),"\n",(0,a.jsx)(t.h2,{id:"farmer-identification",children:"Farmer identification"}),"\n",(0,a.jsxs)(t.p,{children:["A farmer can be uniquely identified by the identifier of the farmer's singleton on the blockchain, this is what ",(0,a.jsx)(t.code,{children:"launcher_id"})," refers to. The ",(0,a.jsx)(t.code,{children:"launcher_id"})," can be used as a primary key in a database. The pool must periodically check the singleton's state on the blockchain to validate that it's farming to the pool, and not leaving or farming to another pool."]}),"\n",(0,a.jsx)(t.h2,{id:"farmer-authentication",children:"Farmer authentication"}),"\n",(0,a.jsx)(t.p,{children:"For the farmer to authenticate to the pool the following time based authentication token scheme must be added to the signing messages of some endpoints."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"authentication_token = current_utc_minutes / authentication_token_timeout\n"})}),"\n",(0,a.jsxs)(t.p,{children:["Where ",(0,a.jsx)(t.code,{children:"authentication_token_timeout"})," is a configuration parameter of the pool which is also included in the ",(0,a.jsx)(t.a,{href:"#get-pool_info",children:"GET /pool_info"})," response that must be respected by the farmer. Whereas ",(0,a.jsx)(t.code,{children:"current_utc_minutes"})," is the local UTC timestamp in ",(0,a.jsx)(t.strong,{children:"minutes"})," at the moment of signing. The local clock should ideally be in sync with a time synchronization protocol e.g., NTP. The authentication token is usually included in a signed payload."]}),"\n",(0,a.jsx)(t.h2,{id:"https-endpoints-summary",children:"HTTPS Endpoints Summary"}),"\n",(0,a.jsx)(t.p,{children:"The pool protocol consists of several HTTPS endpoints which return JSON responses. The HTTPS server can run on any port, but must be running with TLS enabled (using a CA approved certificate), and with pipelining enabled. All bytes values are encoded as hex with optional 0x in front. Clients are also expected to run with pipelining."}),"\n",(0,a.jsx)(t.h2,{id:"error-codes",children:"Error codes"}),"\n",(0,a.jsx)(t.p,{children:"A failed endpoint will always return a JSON object with an error code and an english error message as shown below:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{ "error_code": 0, "error_message": "" }\n'})}),"\n",(0,a.jsx)(t.p,{children:"The following errors may occur:"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Error code"}),(0,a.jsx)(t.th,{children:"Description"})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x01"}),(0,a.jsx)(t.td,{children:"The provided signage point has been reverted"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x02"}),(0,a.jsx)(t.td,{children:"Received partial too late"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x03"}),(0,a.jsx)(t.td,{children:"Not found"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x04"}),(0,a.jsx)(t.td,{children:"Proof of space invalid"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x05"}),(0,a.jsx)(t.td,{children:"Proof of space not good enough"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x06"}),(0,a.jsx)(t.td,{children:"Invalid difficulty"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x07"}),(0,a.jsx)(t.td,{children:"Invalid signature"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x08"}),(0,a.jsx)(t.td,{children:"Web-Server raised an exception"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x09"}),(0,a.jsx)(t.td,{children:"Invalid puzzle hash"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x0A"}),(0,a.jsx)(t.td,{children:"Farmer not known"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x0B"}),(0,a.jsx)(t.td,{children:"Farmer already known"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x0C"}),(0,a.jsx)(t.td,{children:"Invalid authentication public key"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x0D"}),(0,a.jsx)(t.td,{children:"Invalid payout instructions"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x0E"}),(0,a.jsx)(t.td,{children:"Invalid singleton"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x0F"}),(0,a.jsx)(t.td,{children:"Delay time too short"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"0x10"}),(0,a.jsx)(t.td,{children:"Request failed"})]})]})]}),"\n",(0,a.jsx)(t.h2,{id:"signature-validation",children:"Signature validation"}),"\n",(0,a.jsx)(t.p,{children:"Most of the endpoints require signature validation. The validation requires serialization of the endpoints payloads to calculate the message hash which is done like:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"message_hash = sha256(serialized_payload)\n"})}),"\n",(0,a.jsxs)(t.p,{children:["The serialized payload must follow the format defined in the ",(0,a.jsxs)(t.a,{href:"https://github.com/Chia-Network/chia-blockchain/blob/main/chia/util/streamable.py",children:[(0,a.jsx)(t.code,{children:"Streamable"})," class"]}),"."]}),"\n",(0,a.jsx)(t.h2,{id:"pool-url",children:"Pool URL"}),"\n",(0,a.jsx)(t.p,{children:"The pool URL is the url that farmers use to connect to the pool. The subdomains, port, and path are optional. The client will use 443 if there is no port. Note that the trailing slash must NOT be present. Everything must be lower case."}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"https://subdomain.domain.tld:port/path\n"})}),"\n",(0,a.jsx)(t.h2,{id:"get-pool_info",children:"GET /pool_info"}),"\n",(0,a.jsx)(t.p,{children:"This takes no arguments, and allows clients to fetch information about a pool. It is called right before joining a pool, when the farmer enters the pool URL into the client. This allows the farmer to see information about the pool, and decide whether or not to join. It also allows the farmer to set the correct parameters in their singleton on the blockchain. Warning to client implementers: if displaying any of this information, make sure to account for malicious scripts and JS injections. It returns a JSON response with the following data:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{\n  "description": "(example) The Reference Pool allows you to pool with low fees, paying out daily using Chia.",\n  "fee": 0.01,\n  "logo_url": "https://www.chia.net/img/chia_logo.svg",\n  "minimum_difficulty": 10,\n  "name": "The Reference Pool",\n  "protocol_version": 1,\n  "relative_lock_height": 100,\n  "target_puzzle_hash": "0x344587cf06a39db471d2cc027504e8688a0a67cce961253500c956c73603fd58",\n  "authentication_token_timeout": 5\n}\n'})}),"\n",(0,a.jsx)(t.h4,{id:"description",children:"description"}),"\n",(0,a.jsx)(t.p,{children:"The description is a short paragraph that can be displayed in GUIs when the farmer enters a pool URL."}),"\n",(0,a.jsx)(t.h4,{id:"fee",children:"fee"}),"\n",(0,a.jsx)(t.p,{children:"The fee that the pool charges by default, a number between 0.0 (0.0%) and 1.0 (100.0%). This does not include blockchain transaction fees."}),"\n",(0,a.jsx)(t.h4,{id:"logo_url",children:"logo_url"}),"\n",(0,a.jsx)(t.p,{children:"A URL for a pool logo that the client can display in the UI. This is optional for v1.0."}),"\n",(0,a.jsx)(t.h4,{id:"minimum_difficulty",children:"minimum_difficulty"}),"\n",(0,a.jsx)(t.p,{children:"The minimum difficulty that the pool supports. This will also be the default that farmers start sending proofs for."}),"\n",(0,a.jsx)(t.h4,{id:"name",children:"name"}),"\n",(0,a.jsx)(t.p,{children:"Name of the pool, this is only for display purposes and does not go on the blockchain."}),"\n",(0,a.jsx)(t.h4,{id:"protocol_version",children:"protocol_version"}),"\n",(0,a.jsx)(t.p,{children:"The pool protocol version supported by the pool."}),"\n",(0,a.jsx)(t.h4,{id:"relative_lock_height",children:"relative_lock_height"}),"\n",(0,a.jsx)(t.p,{children:"The number of blocks (confirmations) that a user must wait between the point when they start escaping a pool, and the point at which they can finalize their pool switch. Must be less than 4608 (approximately 24 hours)."}),"\n",(0,a.jsx)(t.h4,{id:"target_puzzle_hash",children:"target_puzzle_hash"}),"\n",(0,a.jsx)(t.p,{children:"This is the target of where rewards will be sent to from the singleton. Controlled by the pool."}),"\n",(0,a.jsx)(t.h4,{id:"authentication_token_timeout",children:"authentication_token_timeout"}),"\n",(0,a.jsxs)(t.p,{children:["The time in ",(0,a.jsx)(t.strong,{children:"minutes"})," for an ",(0,a.jsx)(t.code,{children:"authentication_token"})," to be valid, see ",(0,a.jsx)(t.a,{href:"#farmer-authentication",children:"Farmer authentication"}),"."]}),"\n",(0,a.jsx)(t.h2,{id:"get-farmer",children:"GET /farmer"}),"\n",(0,a.jsx)(t.p,{children:"Get the latest information for a farmer."}),"\n",(0,a.jsx)(t.p,{children:"Request parameter:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"- launcher_id\n- authentication_token\n- signature\n"})}),"\n",(0,a.jsx)(t.p,{children:"Example request:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"https://poolurl.com/farmer/launcher_id=:launcher_id&authentication_token=:token&signature=:signature\n"})}),"\n",(0,a.jsx)(t.p,{children:"Successful response:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{\n  "authentication_public_key": "0x970e181ae45435ae696508a78012dc80548c334cf29676ea6ade7049eb9d2b9579cc30cb44c3fd68d35a250cfbc69e29",\n  "payout_instructions": "0xc2b08e41d766da4116e388357ed957d04ad754623a915f3fd65188a8746cf3e8",\n  "current_difficulty": 10,\n  "current_points": 10\n}\n'})}),"\n",(0,a.jsx)(t.h3,{id:"parameter",children:"Parameter"}),"\n",(0,a.jsx)(t.h4,{id:"launcher_id",children:"launcher_id"}),"\n",(0,a.jsxs)(t.p,{children:["The unique identifier of the farmer's singleton, see ",(0,a.jsx)(t.a,{href:"#farmer-identification",children:"Farmer identification"}),"."]}),"\n",(0,a.jsx)(t.h4,{id:"authentication_token",children:"authentication_token"}),"\n",(0,a.jsxs)(t.p,{children:["See ",(0,a.jsx)(t.a,{href:"#farmer-authentication",children:"Farmer authentication"})," for the specification of ",(0,a.jsx)(t.code,{children:"authentication_token"}),"."]}),"\n",(0,a.jsx)(t.h4,{id:"signature",children:"signature"}),"\n",(0,a.jsx)(t.p,{children:"This is a BLS signature of the hashed serialization of the following data in the given order:"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Element"}),(0,a.jsx)(t.th,{children:"Type"})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"method_name"}),(0,a.jsx)(t.td,{children:"string"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"launcher_id"}),(0,a.jsx)(t.td,{children:"bytes32"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"target_puzzle_hash"}),(0,a.jsx)(t.td,{children:"bytes32"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"authentication_token"}),(0,a.jsx)(t.td,{children:"uint64"})]})]})]}),"\n",(0,a.jsxs)(t.p,{children:["where ",(0,a.jsx)(t.code,{children:"method_name"})," must be the serialized string ",(0,a.jsx)(t.code,{children:'"get_farmer"'}),", the parameters must be serialized and hashed according to ",(0,a.jsx)(t.a,{href:"#signature-validation",children:"Signature validation"})," and the signature must be signed by the private key of the ",(0,a.jsx)(t.code,{children:"authentication_public_key"})," using the Augmented Scheme in the BLS IETF spec."]}),"\n",(0,a.jsxs)(t.p,{children:["where the parameter must be serialized and hashed according to ",(0,a.jsx)(t.a,{href:"#signature-validation",children:"Signature validation"})," and the signature must be signed by the private key of the ",(0,a.jsx)(t.code,{children:"authentication_public_key"})," using the Augmented Scheme in the BLS IETF spec."]}),"\n",(0,a.jsx)(t.p,{children:"Note: The pool MUST return the current points balance, which is the total number of points found since the last payout for that user."}),"\n",(0,a.jsx)(t.h2,{id:"post-farmer",children:"POST /farmer"}),"\n",(0,a.jsx)(t.p,{children:"Register a farmer with the pool. This is required once before submitting the first partial."}),"\n",(0,a.jsx)(t.p,{children:"Request:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{\n  "payload": {\n    "launcher_id": "0xae4ef3b9bfe68949691281a015a9c16630fc8f66d48c19ca548fb80768791afa",\n    "authentication_token": 27062279,\n    "authentication_public_key": "0x970e181ae45435ae696508a78012dc80548c334cf29676ea6ade7049eb9d2b9579cc30cb44c3fd68d35a250cfbc69e29",\n    "payout_instructions": "0xc2b08e41d766da4116e388357ed957d04ad754623a915f3fd65188a8746cf3e8",\n    "suggested_difficulty": 10\n  },\n  "signature": "0xa078dc1462bbcdec7cd651c5c3d7584ac6c6a142e049c7790f3b0ee8768ed6326e3a639f949b2293469be561adfa1c57130f64334994f53c1bd12e59579e27127fbabadc5e8793a2ef194a5a22ac832e92dcb6ad9a0d33bd264726f6e8df6aad"\n}\n'})}),"\n",(0,a.jsx)(t.p,{children:"Successful response:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{ "welcome_message": "Welcome to the reference pool. Happy farming." }\n'})}),"\n",(0,a.jsx)(t.p,{children:"A successful response must always contain a welcome message which must be defined by the pool."}),"\n",(0,a.jsx)(t.h4,{id:"payload",children:"payload"}),"\n",(0,a.jsx)(t.h4,{id:"payloadlauncher_id",children:"payload.launcher_id"}),"\n",(0,a.jsxs)(t.p,{children:["The unique identifier of the farmer's singleton, see ",(0,a.jsx)(t.a,{href:"#farmer-identification",children:"Farmer identification"}),"."]}),"\n",(0,a.jsx)(t.h4,{id:"payloadauthentication_token",children:"payload.authentication_token"}),"\n",(0,a.jsxs)(t.p,{children:["See ",(0,a.jsx)(t.a,{href:"#farmer-authentication",children:"Farmer authentication"})," for the specification of ",(0,a.jsx)(t.code,{children:"authentication_token"}),"."]}),"\n",(0,a.jsx)(t.h4,{id:"payloadauthentication_public_key",children:"payload.authentication_public_key"}),"\n",(0,a.jsxs)(t.p,{children:["The public key of the authentication key, which is a temporary key used by the farmer to sign requests to the pool. It is authorized by the ",(0,a.jsx)(t.code,{children:"owner_key"}),", so that the owner key can be kept more secure. The pool should reject requests made with outdated ",(0,a.jsx)(t.code,{children:"authentication_keys"}),". These key can be changed using ",(0,a.jsx)(t.code,{children:"PUT /farmer"}),", which is signed with the owner key."]}),"\n",(0,a.jsx)(t.h4,{id:"payloadpayout_instructions",children:"payload.payout_instructions"}),"\n",(0,a.jsx)(t.p,{children:"These are the instructions for how the farmer wants to get paid. By default this will be an XCH address, but it can be set to any string with a size of less than 1024 characters, so it can represent another blockchain or payment system identifier."}),"\n",(0,a.jsx)(t.h4,{id:"payloadsuggested_difficulty",children:"payload.suggested_difficulty"}),"\n",(0,a.jsx)(t.p,{children:"A request from the farmer to update the difficulty. Can be ignored or respected by the pool. However, this should only be respected if the authentication public key is the most recent one seen for this farmer."}),"\n",(0,a.jsxs)(t.p,{children:["See ",(0,a.jsx)(t.a,{href:"#difficulty",children:"Difficulty"})," for more details about the impact of the difficulty."]}),"\n",(0,a.jsx)(t.h4,{id:"signature-1",children:"signature"}),"\n",(0,a.jsx)(t.p,{children:"This is a BLS signature of the hashed serialization of the payload:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"sha256(PostFarmerPayload)\n"})}),"\n",(0,a.jsxs)(t.p,{children:["signed by the private key of the ",(0,a.jsx)(t.code,{children:"owner_public_key"})," using the Augmented Scheme in the BLS IETF spec."]}),"\n",(0,a.jsxs)(t.p,{children:["See the ",(0,a.jsx)(t.a,{href:"#signature-validation",children:"streamable"})," class ",(0,a.jsx)(t.code,{children:"PostFarmerPayload"})," in the ",(0,a.jsx)(t.a,{href:"https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/pool_protocol.py",children:"pool protocol"})," and ",(0,a.jsx)(t.a,{href:"#farmer-authentication",children:"Farmer authentication"})," for the specification of ",(0,a.jsx)(t.code,{children:"authentication_token"}),"."]}),"\n",(0,a.jsx)(t.h2,{id:"put-farmer",children:"PUT /farmer"}),"\n",(0,a.jsx)(t.p,{children:"Allows farmers to update their information on the pool."}),"\n",(0,a.jsx)(t.p,{children:"Request:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{\n  "payload": {\n    "launcher_id": "0xae4ef3b9bfe68949691281a015a9c16630fc8f66d48c19ca548fb80768791afa",\n    "authentication_token": 27062279,\n    "authentication_public_key": "0x970e181ae45435ae696508a78012dc80548c334cf29676ea6ade7049eb9d2b9579cc30cb44c3fd68d35a250cfbc69e29",\n    "payout_instructions": "0xc2b08e41d766da4116e388357ed957d04ad754623a915f3fd65188a8746cf3e8",\n    "suggested_difficulty": 10\n  },\n  "signature": "0xa078dc1462bbcdec7cd651c5c3d7584ac6c6a142e049c7790f3b0ee8768ed6326e3a639f949b2293469be561adfa1c57130f64334994f53c1bd12e59579e27127fbabadc5e8793a2ef194a5a22ac832e92dcb6ad9a0d33bd264726f6e8df6aad"\n}\n'})}),"\n",(0,a.jsxs)(t.p,{children:["For a description of the request body entries see the corresponding keys in ",(0,a.jsx)(t.a,{href:"#post-farmer",children:"POST /farmer"}),". The values provided with the key/value pairs are used to update the existing values on the server. All entries, except ",(0,a.jsx)(t.code,{children:"launcher_id"}),", are optional but there must be at least one of them."]}),"\n",(0,a.jsxs)(t.p,{children:["See the ",(0,a.jsx)(t.a,{href:"#signature-validation",children:"streamable"})," class ",(0,a.jsx)(t.code,{children:"PutFarmerPayload"})," in the ",(0,a.jsx)(t.a,{href:"https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/pool_protocol.py",children:"pool protocol"})," for details and ",(0,a.jsx)(t.a,{href:"#farmer-authentication",children:"Farmer authentication"})," for the specification of ",(0,a.jsx)(t.code,{children:"authentication_token"}),"."]}),"\n",(0,a.jsx)(t.p,{children:"Successful response:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{\n  "authentication_public_key": true,\n  "payout_instructions": true,\n  "suggested_difficulty": true\n}\n'})}),"\n",(0,a.jsxs)(t.p,{children:["A successful response must always contain one key/value pair for each entry provided in the request body. The value must be ",(0,a.jsx)(t.code,{children:"true"})," if the entry has been updated or ",(0,a.jsx)(t.code,{children:"false"})," if the value was the same as the current value."]}),"\n",(0,a.jsx)(t.p,{children:"See below for an example body to only update the authentication key:"}),"\n",(0,a.jsxs)(t.p,{children:["Example to update ",(0,a.jsx)(t.code,{children:"authentication_public_key"}),":"]}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{\n  "payload": {\n    "launcher_id": "0xae4ef3b9bfe68949691281a015a9c16630fc8f66d48c19ca548fb80768791afa",\n    "authentication_public_key": "0x970e181ae45435ae696508a78012dc80548c334cf29676ea6ade7049eb9d2b9579cc30cb44c3fd68d35a250cfbc69e29"\n  },\n  "signature": "0xa078dc1462bbcdec7cd651c5c3d7584ac6c6a142e049c7790f3b0ee8768ed6326e3a639f949b2293469be561adfa1c57130f64334994f53c1bd12e59579e27127fbabadc5e8793a2ef194a5a22ac832e92dcb6ad9a0d33bd264726f6e8df6aad"\n}\n'})}),"\n",(0,a.jsx)(t.h2,{id:"post-partial",children:"POST /partial"}),"\n",(0,a.jsx)(t.p,{children:"This is a partial submission from the farmer to the pool operator."}),"\n",(0,a.jsx)(t.p,{children:"Request:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{\n  "payload": {\n    "launcher_id": "0xae4ef3b9bfe68949691281a015a9c16630fc8f66d48c19ca548fb80768791afa",\n    "authentication_token": 27062279,\n    "proof_of_space": {\n      "challenge": "0xe0e55d45eef8d53a6b68220abeec8f14f57baaa80dbd7b37430e42f9ac6e2c0e",\n      "pool_contract_puzzle_hash": "0x9e3e9b37b54cf6c7467e277b6e4ca9ab6bdea53cdc1d79c000dc95b6a3908a3b",\n      "plot_public_key": "0xa7ad70989cc8f18e555e9b698d197cdfc32465e0b99fd6cf5fdbac8aa2da04b0704ba04d2d50d852402f9dd6eec47a4d",\n      "size": 32,\n      "proof": "0xb2cd6374c8db249ad3b638199dbb6eb9eaefe55042cef66c43cf1e31161f4a1280455d8b53c2823c747fd4f8823c44de3a52cc85332431630857c359935660c3403ae3a92728d003dd66ef5966317cd49894d265a3e4c43f0530a1192874ed327e6f35862a25dfb67c5d0d573d078b4b8ba9bfb1cce52fd17939ae9d7033d3aa09d6c449e392ba2472a1fecf992abcc51c3bf5d56a72fef9900e79b8dba88a5afc39e04993325a0cd6b67757355b836f"\n    },\n    "sp_hash": "0x4c52796ca4ff775fbcdac90140c12270d26a37724ad77988535d58b376332533",\n    "end_of_sub_slot": false,\n    "harvester_id": "0xb9d8de98ec5c026f1167b0b587715d7137f43b6d1d40b81d9aac6dc8355fde28"\n  },\n  "aggregate_signature": "0xa078dc1462bbcdec7cd651c5c3d7584ac6c6a142e049c7790f3b0ee8768ed6326e3a639f949b2293469be561adfa1c57130f64334994f53c1bd12e59579e27127fbabadc5e8793a2ef194a5a22ac832e92dcb6ad9a0d33bd264726f6e8df6aad"\n}\n'})}),"\n",(0,a.jsx)(t.p,{children:"Successful response:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-json",children:'{ "new_difficulty": 10 }\n'})}),"\n",(0,a.jsx)(t.p,{children:"A successful response must always contain the new difficulty which must be respected by the farmer."}),"\n",(0,a.jsx)(t.h4,{id:"payload-1",children:"payload"}),"\n",(0,a.jsxs)(t.p,{children:["This is the main payload of the partial, which is signed by two keys: ",(0,a.jsx)(t.code,{children:"authentication_key"})," and ",(0,a.jsx)(t.code,{children:"plot_key"}),"."]}),"\n",(0,a.jsx)(t.h4,{id:"payloadlauncher_id-1",children:"payload.launcher_id"}),"\n",(0,a.jsxs)(t.p,{children:["The unique identifier of the farmer's singleton, see ",(0,a.jsx)(t.a,{href:"#farmer-identification",children:"Farmer identification"}),"."]}),"\n",(0,a.jsx)(t.h4,{id:"payloadauthentication_token-1",children:"payload.authentication_token"}),"\n",(0,a.jsxs)(t.p,{children:["See ",(0,a.jsx)(t.a,{href:"#farmer-authentication",children:"Farmer authentication"})," for the specification of ",(0,a.jsx)(t.code,{children:"authentication_token"}),"."]}),"\n",(0,a.jsx)(t.h4,{id:"payloadproof_of_space",children:"payload.proof_of_space"}),"\n",(0,a.jsx)(t.p,{children:"The proof of space in chia-blockchain format."}),"\n",(0,a.jsx)(t.h4,{id:"payloadproof_of_spacechallenge",children:"payload.proof_of_space.challenge"}),"\n",(0,a.jsx)(t.p,{children:"The challenge of the proof of space, computed from the signage point or end of subslot."}),"\n",(0,a.jsx)(t.h4,{id:"payloadproof_of_spacepool_contract_puzzle_hash",children:"payload.proof_of_space.pool_contract_puzzle_hash"}),"\n",(0,a.jsxs)(t.p,{children:["The puzzle hash that is encoded in the plots, equivalent to the ",(0,a.jsx)(t.code,{children:"p2_singleton_puzzle_hash"}),". This is the first address that the 7/8 rewards get paid out to in the blockchain, if this proof wins. This value can be derived from the ",(0,a.jsx)(t.code,{children:"launcher_id"}),", and must be valid for all partials."]}),"\n",(0,a.jsx)(t.h4,{id:"payloadproof_of_spaceplot_public_key",children:"payload.proof_of_space.plot_public_key"}),"\n",(0,a.jsx)(t.p,{children:"Public key associated with the plot. (Can be a 2/2 BLS between plot local key and farmer, but not necessarily)."}),"\n",(0,a.jsx)(t.h4,{id:"payloadproof_of_spacesize",children:"payload.proof_of_space.size"}),"\n",(0,a.jsx)(t.p,{children:"K size, must be at least 32."}),"\n",(0,a.jsx)(t.h4,{id:"payloadproof_of_spaceproof",children:"payload.proof_of_space.proof"}),"\n",(0,a.jsxs)(t.p,{children:["64 x values encoding the actual proof of space, must be valid corresponding to the ",(0,a.jsx)(t.code,{children:"sp_hash"}),"."]}),"\n",(0,a.jsx)(t.h4,{id:"payloadsp_hash",children:"payload.sp_hash"}),"\n",(0,a.jsx)(t.p,{children:"This is either the hash of the output for the signage point, or the challenge_hash for the sub slot, if it's an end of sub slot challenge. This must be a valid signage point on the blockchain that has not been reverted. The pool must check a few minutes after processing the partial, that it has not been reverted on the blockchain."}),"\n",(0,a.jsx)(t.h4,{id:"payloadend_of_sub_slot",children:"payload.end_of_sub_slot"}),"\n",(0,a.jsx)(t.p,{children:"If true, the sp_hash encodes the challenge_hash of the sub slot."}),"\n",(0,a.jsx)(t.h4,{id:"aggregate_signature",children:"aggregate_signature"}),"\n",(0,a.jsx)(t.p,{children:"This is a 2/2 BLS signature of the hashed serialization of the payload:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"sha256(PostPartialPayload)\n"})}),"\n",(0,a.jsx)(t.p,{children:"signed by the private keys of the following keys using the Augmented Scheme in the BLS IETF spec:"}),"\n",(0,a.jsxs)(t.ol,{children:["\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"plot_public_key"})}),"\n",(0,a.jsx)(t.li,{children:(0,a.jsx)(t.code,{children:"authentication_public_key"})}),"\n"]}),"\n",(0,a.jsxs)(t.p,{children:["See the ",(0,a.jsx)(t.a,{href:"#signature-validation",children:"streamable"})," class ",(0,a.jsx)(t.code,{children:"PostPartialPayload"})," in the ",(0,a.jsx)(t.a,{href:"https://github.com/Chia-Network/chia-blockchain/blob/main/chia/protocols/pool_protocol.py",children:"pool protocol"})," for details and ",(0,a.jsx)(t.a,{href:"#farmer-authentication",children:"Farmer authentication"})," for the specification of ",(0,a.jsx)(t.code,{children:"authentication_token"}),"."]}),"\n",(0,a.jsx)(t.p,{children:"A partial must be completely rejected if the BLS signature does not validate."}),"\n",(0,a.jsx)(t.h2,{id:"get-login",children:"GET /login"}),"\n",(0,a.jsxs)(t.p,{children:["This allows the user to log in to a web interface if the pool supports it, see service flags in ",(0,a.jsx)(t.a,{href:"#get-pool_info",children:"GET /pool_info"}),". The farmer software must offer a way to generate and display a login link or provide a button which generates the link and then just opens it in the default browser. The link follows the specification below."]}),"\n",(0,a.jsxs)(t.p,{children:["Note that there is no explicit account creation. A farmer can log in after making their self known at the pool with ",(0,a.jsx)(t.a,{href:"#post-farmer",children:"POST /farmer"}),"."]}),"\n",(0,a.jsx)(t.p,{children:"Request parameters:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"- launcher_id\n- authentication_token\n- signature\n"})}),"\n",(0,a.jsx)(t.p,{children:"Example request:"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{children:"https://poolurl.com/login?launcher_id=:launcher_id&authentication_token=:token&signature=:signature\n"})}),"\n",(0,a.jsx)(t.h4,{id:"launcher_id-1",children:"launcher_id"}),"\n",(0,a.jsxs)(t.p,{children:["The unique identifier of the farmer's singleton, see ",(0,a.jsx)(t.a,{href:"#farmer-identification",children:"Farmer identification"}),"."]}),"\n",(0,a.jsx)(t.h4,{id:"authentication_token-1",children:"authentication_token"}),"\n",(0,a.jsxs)(t.p,{children:["See ",(0,a.jsx)(t.a,{href:"#farmer-authentication",children:"Farmer authentication"})," for the specification of ",(0,a.jsx)(t.code,{children:"authentication_token"}),"."]}),"\n",(0,a.jsx)(t.h4,{id:"signature-2",children:"signature"}),"\n",(0,a.jsx)(t.p,{children:"This is a BLS signature of the hashed serialization of the following data in the given order:"}),"\n",(0,a.jsxs)(t.table,{children:[(0,a.jsx)(t.thead,{children:(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.th,{children:"Element"}),(0,a.jsx)(t.th,{children:"Type"})]})}),(0,a.jsxs)(t.tbody,{children:[(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"method_name"}),(0,a.jsx)(t.td,{children:"string"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"launcher_id"}),(0,a.jsx)(t.td,{children:"bytes32"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"target_puzzle_hash"}),(0,a.jsx)(t.td,{children:"bytes32"})]}),(0,a.jsxs)(t.tr,{children:[(0,a.jsx)(t.td,{children:"authentication_token"}),(0,a.jsx)(t.td,{children:"uint64"})]})]})]}),"\n",(0,a.jsxs)(t.p,{children:["where ",(0,a.jsx)(t.code,{children:"method_name"})," must be the serialized string ",(0,a.jsx)(t.code,{children:'"get_login"'})," and ",(0,a.jsx)(t.code,{children:"target_puzzle_hash"})," is pool's target puzzle hash (see ",(0,a.jsx)(t.a,{href:"#get-pool_info",children:"GET /pool_info"}),"). The parameters must be serialized and hashed according to ",(0,a.jsx)(t.a,{href:"#signature-validation",children:"Signature validation"})," and the signature must be signed by the private key of the ",(0,a.jsx)(t.code,{children:"authentication_public_key"})," using the Augmented Scheme in the BLS IETF spec."]}),"\n",(0,a.jsxs)(t.p,{children:["where the parameter must be serialized and hashed according to ",(0,a.jsx)(t.a,{href:"#signature-validation",children:"Signature validation"})," and the signature must be signed by the private key of the ",(0,a.jsx)(t.code,{children:"authentication_public_key"})," using the Augmented Scheme in the BLS IETF spec."]}),"\n",(0,a.jsx)(t.h2,{id:"difficulty",children:"Difficulty"}),"\n",(0,a.jsxs)(t.p,{children:["The difficulty allows the pool operator to control how many partials per day they are receiving from each farmer. The difficulty can be adjusted separately for each farmer. A reasonable target would be 300 partials per day, to ensure frequent feedback to the farmer, and low variability. A difficulty of 1 results in approximately 10 partials per day per k32 plot. This is the minimum difficulty that the V1 of the protocol supports is 1. However, a pool may set a higher minimum difficulty for efficiency. When calculating whether a proof is high quality enough for being awarded points, the pool should use ",(0,a.jsx)(t.code,{children:"sub_slot_iters=37600000000"}),". If the farmer submits a proof that is not good enough for the current difficulty, the pool should respond by setting the ",(0,a.jsx)(t.code,{children:"current_difficulty"})," in the response."]}),"\n",(0,a.jsx)(t.h2,{id:"points",children:"Points"}),"\n",(0,a.jsx)(t.p,{children:"X points are awarded for submitting a partial with difficulty X, which means that points scale linearly with difficulty. For example, 100 TiB of space should yield approximately 10,000 points per day, whether the difficulty is set to 100 or 200. It should not matter what difficulty is set for a farmer, as long as they are consistently submitting partials. The specification does not require pools to pay out proportionally by points, but the payout scheme should be clear to farmers, and points should be acknowledged and accumulated points returned in the response."})]})}function h(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(d,{...e})}):d(e)}},8453:(e,t,i)=>{i.d(t,{R:()=>r,x:()=>s});var n=i(6540);const a={},o=n.createContext(a);function r(e){const t=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),n.createElement(o.Provider,{value:t},e.children)}}}]);