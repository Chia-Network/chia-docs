"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[375],{9559:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>c,contentTitle:()=>d,default:()=>x,frontMatter:()=>r,metadata:()=>n,toc:()=>a});const n=JSON.parse('{"id":"cli-reference/vcs","title":"Verifiable Credentials","description":"This document is a comprehensive listing of CLI commands for interacting with Chia VCs.","source":"@site/docs/cli-reference/vcs.md","sourceDirName":"cli-reference","slug":"/vc-cli","permalink":"/vc-cli","draft":false,"unlisted":false,"editUrl":"https://github.com/Chia-Network/chia-docs/blob/main/docs/cli-reference/vcs.md","tags":[],"version":"current","frontMatter":{"sidebar_label":"VCs","title":"Verifiable Credentials","slug":"/vc-cli"},"sidebar":"tutorialSidebar","previous":{"title":"Simulator","permalink":"/simulator-cli"},"next":{"title":"Wallet","permalink":"/wallet-cli"}}');var s=l(4848),i=l(8453);l(5537),l(9329);const r={sidebar_label:"VCs",title:"Verifiable Credentials",slug:"/vc-cli"},d=void 0,c={},a=[{value:"Reference",id:"reference",level:2},{value:"<code>add_proof_reveal</code>",id:"add_proof_reveal",level:3},{value:"<code>get</code>",id:"get",level:3},{value:"<code>get_proofs_for_root</code>",id:"get_proofs_for_root",level:3},{value:"<code>mint</code>",id:"mint",level:3},{value:"<code>revoke</code>",id:"revoke",level:3},{value:"<code>update_proofs</code>",id:"update_proofs",level:3}];function h(e){const t={a:"a",code:"code",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,i.R)(),...e.components},{Details:l}=t;return l||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.p,{children:"This document is a comprehensive listing of CLI commands for interacting with Chia VCs."}),"\n",(0,s.jsx)(t.h2,{id:"reference",children:"Reference"}),"\n",(0,s.jsx)(t.h3,{id:"add_proof_reveal",children:(0,s.jsx)(t.code,{children:"add_proof_reveal"})}),"\n",(0,s.jsx)(t.p,{children:"Functionality: Add a series of proofs that will combine to a single proof hash"}),"\n",(0,s.jsx)(t.p,{children:"Usage: chia wallet vcs add_proof_reveal [OPTIONS]"}),"\n",(0,s.jsx)(t.p,{children:"Options:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Short Command"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Long Command"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Required"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-wp"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-rpc-port"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-f"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--fingerprint"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Set the fingerprint to specify which key to use"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-p"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--proof"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"True*"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"A flag to add as a proof"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-r"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--root-only"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"If this flag is set, do not add the proofs to the DB, just output the root from the specified proofs [Default: not set]"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-h"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--help"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Show a help message and exit"})]})]})]}),"\n",(0,s.jsxs)(l,{children:[(0,s.jsx)("summary",{children:"Example 1"}),(0,s.jsx)(t.p,{children:"Add two proofs:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"chia wallet vcs add_proof_reveal -f 2108245669 --proof test_proof1 --proof test_proof2\n"})}),(0,s.jsx)(t.p,{children:"Response:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"Proofs added to DB successfully!\n"})})]}),"\n",(0,s.jsxs)(l,{children:[(0,s.jsx)("summary",{children:"Example 2"}),(0,s.jsx)(t.p,{children:"Get the root hash of the tree created from adding two proofs:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"chia wallet vcs add_proof_reveal -f 2108245669 --proof test_proof1 --proof test_proof2 --root-only\n"})}),(0,s.jsx)(t.p,{children:"Response:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"Proof Hash: f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5\n"})})]}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsx)(t.h3,{id:"get",children:(0,s.jsx)(t.code,{children:"get"})}),"\n",(0,s.jsx)(t.p,{children:"Functionality: Get a list of existing VCs"}),"\n",(0,s.jsx)(t.p,{children:"Usage: chia wallet vcs get [OPTIONS]"}),"\n",(0,s.jsx)(t.p,{children:"Options:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Short Command"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Long Command"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Required"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-wp"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-rpc-port"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-f"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--fingerprint"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Set the fingerprint to specify which key to use"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-s"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--start"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"The index to start the list at [default: 0]"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-c"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--count"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"How many results to return [default: 50]"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-h"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--help"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Show a help message and exit"})]})]})]}),"\n",(0,s.jsxs)(l,{children:[(0,s.jsx)("summary",{children:"Example"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"chia wallet vcs get -f 2108245669\n"})}),(0,s.jsx)(t.p,{children:"Response:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"Proofs:\n\nLauncher ID: 89a4ff17372dd3a8814712c0988b87b508a04cd7fa61d0228ce54b74111e7160\nCoin ID: 72e522fecc64b539f8979b89e4cf2ffbcf8ba985faf4b701bcc882c6aec9e040\nInner Address: txch1at35qwx6djmadnh9v77a72z8vcaxsle36ke3dj26gcpt2fnh654qsqecnj\n"})})]}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsx)(t.h3,{id:"get_proofs_for_root",children:(0,s.jsx)(t.code,{children:"get_proofs_for_root"})}),"\n",(0,s.jsx)(t.p,{children:"Functionality: Get the stored proof flags for a given proof hash"}),"\n",(0,s.jsx)(t.p,{children:"Usage: chia wallet vcs get_proofs_for_root [OPTIONS]"}),"\n",(0,s.jsx)(t.p,{children:"Options:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Short Command"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Long Command"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Required"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-wp"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-rpc-port"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-f"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--fingerprint"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Set the fingerprint to specify which key to use"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-r"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--proof-hash"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"True"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"The root to search for"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-h"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--help"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Show a help message and exit"})]})]})]}),"\n",(0,s.jsx)(t.p,{children:"Note that if the root is not currently stored in the VC, the command will fail."}),"\n",(0,s.jsxs)(l,{children:[(0,s.jsx)("summary",{children:"Example"}),(0,s.jsx)(t.p,{children:"Search for a hash currently stored in the VC:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"chia wallet vcs get_proofs_for_root -f 2108245669 --proof-hash f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5\n"})}),(0,s.jsx)(t.p,{children:"Response:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"Proofs:\n - test_proof1\n - test_proof2\n"})})]}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsx)(t.h3,{id:"mint",children:(0,s.jsx)(t.code,{children:"mint"})}),"\n",(0,s.jsx)(t.p,{children:"Functionality: Mint a VC"}),"\n",(0,s.jsx)(t.p,{children:"Usage: chia wallet vcs mint [OPTIONS]"}),"\n",(0,s.jsx)(t.p,{children:"Options:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Short Command"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Long Command"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Required"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-wp"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-rpc-port"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-f"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--fingerprint"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Set the fingerprint to specify which key to use as the issuing wallet"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-d"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--did"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"True"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"The DID of the VC's proof provider. Must be owned by the issuing wallet"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-t"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--target-address"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"The address to send the VC to once it's minted [Default: send to minting wallet]"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-m"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--fee"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Blockchain fee for mint transaction, in XCH"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--push"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Push the transaction to the network [Default: True]"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--no-push"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Do not push the transaction to the network [Default: False]"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--transaction-file"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"A file to write relevant transactions to"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-h"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--help"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Show a help message and exit"})]})]})]}),"\n",(0,s.jsxs)(l,{children:[(0,s.jsx)("summary",{children:"Example"}),(0,s.jsxs)(t.p,{children:["A DID is required in order to mint a new VC. If the proof provider does not already have a DID, use the ",(0,s.jsx)(t.code,{children:"did create"})," command to create one. For example:"]}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"chia wallet did create -f 2108245669 -n Provider_DID -m 0.0001\n"})}),(0,s.jsx)(t.p,{children:"Response:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"Successfully created a DID wallet with name Provider_DID and id 2 on key 2108245669\nSuccessfully created a DID did:chia:1n2s77g7rer2v62xzrvd0at6tgx8m4g8t6encghs375r64lc6e5mssdkap3 in the newly created DID wallet\n"})}),(0,s.jsxs)(t.p,{children:["Next, mint a new VC. Note that the DID specified with ",(0,s.jsx)(t.code,{children:"-d"})," must be owned by the fingerprint specified with ",(0,s.jsx)(t.code,{children:"-f"})," (or the one selected if ",(0,s.jsx)(t.code,{children:"-f"})," is not used). For example:"]}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"chia wallet vcs mint -f 2108245669 -d did:chia:1n2s77g7rer2v62xzrvd0at6tgx8m4g8t6encghs375r64lc6e5mssdkap3 -m 0.0001\n"})}),(0,s.jsx)(t.p,{children:"Response:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"New VC with launcher ID minted: 13ba084e78475327e41c60df5a108965d7a283f065b5506e266ffb3563937b6c\nRelevant TX records:\n\nTransaction e114763824c11c84bd1e3b5b0ba6540cb2ed2aef0f371170e8beecaac29d87c2\nStatus: Pending\nAmount sent: 1E-12 XCH\nTo address: txch1at35qwx6djmadnh9v77a72z8vcaxsle36ke3dj26gcpt2fnh654qsqecnj\nCreated at: 2023-06-15 10:02:31\n"})}),(0,s.jsxs)(t.p,{children:["After the transaction has been confirmed, it is possible to show the VC by running the ",(0,s.jsx)(t.code,{children:"get"})," command:"]}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"chia wallet vcs get -f 2108245669\n"})}),(0,s.jsx)(t.p,{children:"Response:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"Proofs:\n\nLauncher ID: 89a4ff17372dd3a8814712c0988b87b508a04cd7fa61d0228ce54b74111e7160\nCoin ID: 72e522fecc64b539f8979b89e4cf2ffbcf8ba985faf4b701bcc882c6aec9e040\nInner Address: txch1at35qwx6djmadnh9v77a72z8vcaxsle36ke3dj26gcpt2fnh654qsqecnj\n"})}),(0,s.jsxs)(t.p,{children:["It is recommended that you save the ",(0,s.jsx)(t.code,{children:"Launcher ID"})," because it will be needed if the VC needs to be revoked later."]}),(0,s.jsxs)(t.p,{children:["No proofs have been added yet. This is accomplished with the ",(0,s.jsx)(t.a,{href:"#update_proofs",children:"update_proofs"})," command."]})]}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsx)(t.h3,{id:"revoke",children:(0,s.jsx)(t.code,{children:"revoke"})}),"\n",(0,s.jsx)(t.p,{children:"Functionality: Revoke any VC if you have the proper DID and the VC's parent coin"}),"\n",(0,s.jsx)(t.p,{children:"Usage: chia wallet vcs revoke [OPTIONS]"}),"\n",(0,s.jsx)(t.p,{children:"Options:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Short Command"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Long Command"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Required"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-wp"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-rpc-port"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-f"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--fingerprint"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Set the fingerprint to specify which key to use"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-p"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--parent-coin-id"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"True*"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"The ID of the parent coin of the VC (*optional if VC ID is used)"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-l"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--vc-id TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"True*"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"The launcher ID of the VC to revoke (must be tracked by wallet) (*optional if Parent ID is used)"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-m"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--fee"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Blockchain fee for revocation transaction, in XCH"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--reuse-puzhash"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsxs)(t.td,{style:{textAlign:"left"},children:["If this flag is set, then send the VC back to the same puzzle hash it came from (ignored if ",(0,s.jsx)(t.code,{children:"--generate-new-puzhash"})," is also specified) [Default: generate new puzzle hash]"]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--generate-new-puzhash"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsxs)(t.td,{style:{textAlign:"left"},children:["If this flag is set, then send the VC to a new puzzle hash. This is the default behavior, and setting this flag will override the ",(0,s.jsx)(t.code,{children:"--reuse-puzhash"})," flag if it is also set"]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--push"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Push the transaction to the network [Default: True]"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--no-push"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Do not push the transaction to the network [Default: False]"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--transaction-file"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"A file to write relevant transactions to"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-h"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--help"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Show a help message and exit"})]})]})]}),"\n",(0,s.jsxs)(l,{children:[(0,s.jsx)("summary",{children:"Example"}),(0,s.jsx)(t.p,{children:"Revoke the proofs from a VC. A few notes:"}),(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"The only wallet authorized to call this command is the wallet that contains the DID that created the VC"}),"\n"]}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"chia wallet vcs revoke -l 0x420f69cc8b541be7a0bf1d94ec028a8b2a875ee2cd6721f5316cf1b02519d13a -m 0.0001\n"})}),(0,s.jsx)(t.p,{children:"Response:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"VC successfully revoked!\nRelevant TX records:\n\nTransaction 286cc31575aa167c4b34cbc0a768a162caefb6afea77560db0693934ac3fbf1e\nStatus: Pending\nAmount sent: 1E-12 XCH\nTo address: txch1ehkl33dypc7mg820c7j94zfg8pz5j5lqtx7253nmxft52ryvzw8stx7czc\nCreated at: 2023-06-23 13:33:50\n\nTransaction ae6378e84742ab6abb07df666291093938ec9e06ae8e2b4066d7386d94289ba3\nStatus: Pending\nAmount sent: 0 XCH\nTo address: txch1mahlm65l8q9frcqcfveekx3a29cd74w6gfajqy05ukz2afrzg03syqkz3p\nCreated at: 2023-06-23 13:33:50\n"})}),(0,s.jsx)(t.p,{children:"After the transactions have completed, the holder of the VC can now show that the VC does not contain any proofs:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"chia wallet vcs get\n"})}),(0,s.jsx)(t.p,{children:"Response:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"Proofs:\n"})})]}),"\n",(0,s.jsx)(t.hr,{}),"\n",(0,s.jsx)(t.h3,{id:"update_proofs",children:(0,s.jsx)(t.code,{children:"update_proofs"})}),"\n",(0,s.jsx)(t.p,{children:"Functionality: Update a VC's proofs if you have the provider DID"}),"\n",(0,s.jsx)(t.p,{children:"Usage: chia wallet vcs update_proofs [OPTIONS]"}),"\n",(0,s.jsx)(t.p,{children:"Options:"}),"\n",(0,s.jsxs)(t.table,{children:[(0,s.jsx)(t.thead,{children:(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Short Command"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Long Command"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Required"}),(0,s.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,s.jsxs)(t.tbody,{children:[(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-wp"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-rpc-port"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-f"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--fingerprint"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Set the fingerprint to specify which key to use"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-l"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--vc-id"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"True"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"The launcher ID of the VC whose proofs should be updated"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-t"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--new-puzhash"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"The puzzle hash to which to send the VC after the proofs have been updated"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-p"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--new-proof-hash"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"True"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"The new proof hash to update the VC to"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-m"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--fee"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Blockchain fee for update transaction, in XCH"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--reuse-puzhash"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsxs)(t.td,{style:{textAlign:"left"},children:["If this flag is set, then send the VC back to the same puzzle hash it came from (ignored if ",(0,s.jsx)(t.code,{children:"--generate-new-puzhash"})," is also specified) [Default: generate new puzzle hash]"]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--generate-new-puzhash"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsxs)(t.td,{style:{textAlign:"left"},children:["If this flag is set, then send the VC to a new puzzle hash. This is the default behavior, and setting this flag will override the ",(0,s.jsx)(t.code,{children:"--reuse-puzhash"})," flag if it is also set"]})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--push"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Push the transaction to the network [Default: True]"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--no-push"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Do not push the transaction to the network [Default: False]"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"}}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--transaction-file"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"A file to write relevant transactions to"})]}),(0,s.jsxs)(t.tr,{children:[(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"-h"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"--help"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,s.jsx)(t.td,{style:{textAlign:"left"},children:"Show a help message and exit"})]})]})]}),"\n",(0,s.jsxs)(l,{children:[(0,s.jsx)("summary",{children:"Example"}),(0,s.jsx)(t.p,{children:"Update the proofs. A few notes:"}),(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"The only wallet authorized to call this command is the wallet that contains the DID that created the VC"}),"\n",(0,s.jsxs)(t.li,{children:["The ",(0,s.jsx)(t.code,{children:"-t"})," parameter must point to a puzzle hash, not an address"]}),"\n",(0,s.jsxs)(t.li,{children:["The ",(0,s.jsx)(t.code,{children:"-p"})," parameter can be obtained by calling ",(0,s.jsx)(t.code,{children:"add_proof_reveal"})," and adding the ",(0,s.jsx)(t.code,{children:"--root-only"})," flag"]}),"\n"]}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"chia wallet vcs update_proofs -f 2108245669 -l 89a4ff17372dd3a8814712c0988b87b508a04cd7fa61d0228ce54b74111e7160 -t 0x6fc9728dcd29358fae2194a1145d54c58acfa4de0380c60f8af377742e67788b -p f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5 -m 0.0001\n"})}),(0,s.jsx)(t.p,{children:"Response:"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{children:"Proofs successfully updated!\nRelevant TX records:\n\nTransaction 76f5ea8475d695e798518cd405070dc22542e31fc85220ff7d2ca7b44852a45b\nStatus: Pending\nAmount sent: 0 XCH\nTo address: txch10xjm79zct87gc8ux5vzrhnnt03zjn4ntn5y95w37rsfmp4rxjycquqctuc\nCreated at: 2023-06-15 10:15:27\n\nTransaction f9eebb0520d024aaf4ae176d554c0f806b8d724d21d5da03b5f541fafd69c99f\nStatus: Pending\nAmount sent: 1E-12 XCH\nTo address: txch1dlyh9rwd9y6clt3pjjs3gh25ck9vlfx7qwqvvru27dmhgtn80z9s2rruam\nCreated at: 2023-06-15 10:15:28\n"})}),(0,s.jsx)(t.p,{children:"After the transactions have completed, the VC will have been transferred to its destination puzzle hash (if one was provided)."}),(0,s.jsx)(t.p,{children:"The new owner of the VC can now view the proof(s):"}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"chia wallet vcs get -f 2053849171\n"})}),(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-bash",children:"Proofs:\n- f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5\n  - test_proof1\n  - test_proof2\n\nLauncher ID: 89a4ff17372dd3a8814712c0988b87b508a04cd7fa61d0228ce54b74111e7160\nCoin ID: 72e522fecc64b539f8979b89e4cf2ffbcf8ba985faf4b701bcc882c6aec9e040\nInner Address: txch1at35qwx6djmadnh9v77a72z8vcaxsle36ke3dj26gcpt2fnh654qsqecnj\nProof Hash: f063e22557705b14425b8fca60018796b4364eb6354f45d0b99431a71d3043e5\n"})})]}),"\n",(0,s.jsx)(t.hr,{})]})}function x(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},9329:(e,t,l)=>{l.d(t,{A:()=>r});l(6540);var n=l(4164);const s={tabItem:"tabItem_Ymn6"};var i=l(4848);function r(e){let{children:t,hidden:l,className:r}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,n.A)(s.tabItem,r),hidden:l,children:t})}},5537:(e,t,l)=>{l.d(t,{A:()=>v});var n=l(6540),s=l(4164),i=l(5627),r=l(6347),d=l(372),c=l(604),a=l(1861),h=l(8749);function x(e){return n.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,n.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function o(e){const{values:t,children:l}=e;return(0,n.useMemo)((()=>{const e=t??function(e){return x(e).map((e=>{let{props:{value:t,label:l,attributes:n,default:s}}=e;return{value:t,label:l,attributes:n,default:s}}))}(l);return function(e){const t=(0,a.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,l])}function f(e){let{value:t,tabValues:l}=e;return l.some((e=>e.value===t))}function j(e){let{queryString:t=!1,groupId:l}=e;const s=(0,r.W6)(),i=function(e){let{queryString:t=!1,groupId:l}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!l)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return l??null}({queryString:t,groupId:l});return[(0,c.aZ)(i),(0,n.useCallback)((e=>{if(!i)return;const t=new URLSearchParams(s.location.search);t.set(i,e),s.replace({...s.location,search:t.toString()})}),[i,s])]}function g(e){const{defaultValue:t,queryString:l=!1,groupId:s}=e,i=o(e),[r,c]=(0,n.useState)((()=>function(e){let{defaultValue:t,tabValues:l}=e;if(0===l.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!f({value:t,tabValues:l}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${l.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const n=l.find((e=>e.default))??l[0];if(!n)throw new Error("Unexpected error: 0 tabValues");return n.value}({defaultValue:t,tabValues:i}))),[a,x]=j({queryString:l,groupId:s}),[g,u]=function(e){let{groupId:t}=e;const l=function(e){return e?`docusaurus.tab.${e}`:null}(t),[s,i]=(0,h.Dv)(l);return[s,(0,n.useCallback)((e=>{l&&i.set(e)}),[l,i])]}({groupId:s}),p=(()=>{const e=a??g;return f({value:e,tabValues:i})?e:null})();(0,d.A)((()=>{p&&c(p)}),[p]);return{selectedValue:r,selectValue:(0,n.useCallback)((e=>{if(!f({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);c(e),x(e),u(e)}),[x,u,i]),tabValues:i}}var u=l(9136);const p={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var y=l(4848);function A(e){let{className:t,block:l,selectedValue:n,selectValue:r,tabValues:d}=e;const c=[],{blockElementScrollPositionUntilNextRender:a}=(0,i.a_)(),h=e=>{const t=e.currentTarget,l=c.indexOf(t),s=d[l].value;s!==n&&(a(t),r(s))},x=e=>{let t=null;switch(e.key){case"Enter":h(e);break;case"ArrowRight":{const l=c.indexOf(e.currentTarget)+1;t=c[l]??c[0];break}case"ArrowLeft":{const l=c.indexOf(e.currentTarget)-1;t=c[l]??c[c.length-1];break}}t?.focus()};return(0,y.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":l},t),children:d.map((e=>{let{value:t,label:l,attributes:i}=e;return(0,y.jsx)("li",{role:"tab",tabIndex:n===t?0:-1,"aria-selected":n===t,ref:e=>{c.push(e)},onKeyDown:x,onClick:h,...i,className:(0,s.A)("tabs__item",p.tabItem,i?.className,{"tabs__item--active":n===t}),children:l??t},t)}))})}function m(e){let{lazy:t,children:l,selectedValue:i}=e;const r=(Array.isArray(l)?l:[l]).filter(Boolean);if(t){const e=r.find((e=>e.props.value===i));return e?(0,n.cloneElement)(e,{className:(0,s.A)("margin-top--md",e.props.className)}):null}return(0,y.jsx)("div",{className:"margin-top--md",children:r.map(((e,t)=>(0,n.cloneElement)(e,{key:t,hidden:e.props.value!==i})))})}function b(e){const t=g(e);return(0,y.jsxs)("div",{className:(0,s.A)("tabs-container",p.tabList),children:[(0,y.jsx)(A,{...t,...e}),(0,y.jsx)(m,{...t,...e})]})}function v(e){const t=(0,u.A)();return(0,y.jsx)(b,{...e,children:x(e.children)},String(t))}},8453:(e,t,l)=>{l.d(t,{R:()=>r,x:()=>d});var n=l(6540);const s={},i=n.createContext(s);function r(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);