"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[6216],{9484:(e,t,l)=>{l.r(t),l.d(t,{assets:()=>a,contentTitle:()=>c,default:()=>x,frontMatter:()=>i,metadata:()=>d,toc:()=>r});var n=l(5893),s=l(1151);const i={slug:"/clawback-cli",title:"Clawback"},c=void 0,d={id:"cli-reference/clawback",title:"Clawback",description:"Intro",source:"@site/i18n/zh-Hans/docusaurus-plugin-content-docs/current/cli-reference/clawback.md",sourceDirName:"cli-reference",slug:"/clawback-cli",permalink:"/zh-Hans/clawback-cli",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/cli-reference/clawback.md",tags:[],version:"current",frontMatter:{slug:"/clawback-cli",title:"Clawback"},sidebar:"tutorialSidebar",previous:{title:"CAT Admin",permalink:"/zh-Hans/cat-admin-cli"},next:{title:"Custody Tool",permalink:"/zh-Hans/custody-tool"}},a={},r=[{value:"Intro",id:"intro",level:2},{value:"Reference",id:"reference",level:2},{value:"<code>clawback</code>",id:"clawback",level:2},{value:"<code>claim</code>",id:"claim",level:3},{value:"<code>claw</code>",id:"claw",level:3},{value:"<code>create</code>",id:"create",level:3},{value:"<code>show</code>",id:"show",level:3}];function h(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components},{Details:l}=t;return l||function(e,t){throw new Error("Expected "+(t?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.h2,{id:"intro",children:"Intro"}),"\n",(0,n.jsx)(t.p,{children:"This page includes a comprehensive list of Chia's Command Line Interface commands for using the clawback primitive."}),"\n",(0,n.jsxs)(t.admonition,{type:"warning",children:[(0,n.jsxs)(t.p,{children:["These commands are only relevant for the clawback primitive, which is located in the ",(0,n.jsx)(t.a,{href:"https://github.com/Chia-Network/chia-clawback-primitive",children:"chia-clawback-primitive"})," repository."]}),(0,n.jsxs)(t.p,{children:["In order to view the commands that are built into the CLI for Chia's reference wallet, see the following ",(0,n.jsx)(t.code,{children:"wallet"})," commands:"]}),(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"/wallet-cli#clawback",children:"clawback"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"/wallet-cli#get_transactions",children:"get_transactions"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"/wallet-cli#send-1",children:"send"})}),"\n"]})]}),"\n",(0,n.jsx)(t.p,{children:"For more info, see the following:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"/guides/clawback-primitive-guide",children:"Clawback primitive guide"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://www.youtube.com/watch?v=_pC38ulU2js",children:"Youtube video explaining clawback"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"/guides/clawback-user-guide",children:"Clawback user guide"})}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"reference",children:"Reference"}),"\n",(0,n.jsx)(t.h2,{id:"clawback",children:(0,n.jsx)(t.code,{children:"clawback"})}),"\n",(0,n.jsxs)(t.p,{children:["Functionality: Get info about the ",(0,n.jsx)(t.code,{children:"clawback"})," command"]}),"\n",(0,n.jsxs)(t.p,{children:["Usage: ",(0,n.jsx)(t.code,{children:"clawback [OPTIONS] COMMAND [ARGS]"})]}),"\n",(0,n.jsx)(t.p,{children:"Options:"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Short Command"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Long Command"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Required"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"}}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--version"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Show the version and exit"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-h"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--help"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Show a help message and exit"})]})]})]}),"\n",(0,n.jsx)(t.p,{children:"Commands:"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Name"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"claim"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Claim a clawback coin after the timelock has passed"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"claw"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Clawback an unclaimed coin"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"create"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Send xch to a clawback coin"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"show"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Show details of all clawback coins"})]})]})]}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"claim",children:(0,n.jsx)(t.code,{children:"claim"})}),"\n",(0,n.jsx)(t.p,{children:"Functionality: Claim a clawback coin after the timelock has passed"}),"\n",(0,n.jsxs)(t.p,{children:["Usage: ",(0,n.jsx)(t.code,{children:"clawback claim [OPTIONS]"})]}),"\n",(0,n.jsx)(t.p,{children:"Options:"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Short Command"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Long Command"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Required"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-c"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--coin-id"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"True"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The coin ID you want to claim"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-m"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--fee"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"FLOAT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The fee in XCH for this transaction"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-w"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-id"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The wallet id for fees. If no target address given the clawback will go to this wallet id"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-t"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--target-address"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The address you want to send the coin to"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-np"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--node-rpc-port"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Node is hosting the RPC interface"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-f"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--fingerprint"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the fingerprint to specify which wallet to use"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-wp"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-rpc-port"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-db"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--db-path"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the path for the database"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-h"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--help"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Show a help message and exit"})]})]})]}),"\n",(0,n.jsxs)(t.admonition,{type:"info",children:[(0,n.jsxs)(t.p,{children:["In most cases, if the output of the ",(0,n.jsx)(t.code,{children:"clawback show"})," command contains ",(0,n.jsx)(t.code,{children:"Time left: 0 seconds"}),", this indicates that the Recipient can proceed with the ",(0,n.jsx)(t.code,{children:"claim"})," call."]}),(0,n.jsxs)(t.p,{children:["However, there is a small window of time where the timer has expired, but a block still hasn't been farmed with a timestamp after the expiry. If the Recipient attempts to make the ",(0,n.jsx)(t.code,{children:"claim"})," call during this window, they will receive the following error:"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:"You are trying to claim the coin too early\n"})}),(0,n.jsxs)(t.p,{children:["In this case, the Recipient needs to wait for one more block to be farmed before proceeding with the ",(0,n.jsx)(t.code,{children:"claim"})," call. As a reminder, a new block is farmed every 18.75 seconds, on average."]})]}),"\n",(0,n.jsxs)(l,{children:[(0,n.jsx)("summary",{children:"Example"}),(0,n.jsx)(t.p,{children:"First, the Sender creates a new clawback coin with a 60-second timelock:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback create -t txch1czxl4c42kwem8jllm4xp78jt7t0j0pu9uh9xw5jddegcu703xnpsqaaxxx -a 0.1 -l 60 -m 0.000275\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Created Coin with ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5\nCoin { parent_coin_info: f5e408a15299df27a00d0403ea50ed29a06f87a31b638cff1b63ef3e6060b45a, puzzle_hash: 2e91566d9549cb909109d147c79b457d15ced2d8a24dea5a125b1e5c05cdd1ec, amount: 100000000000 }\n"})}),(0,n.jsxs)(t.p,{children:["The Sender can run the ",(0,n.jsx)(t.code,{children:"clawback show"})," command to show the details of each of their clawback coins:"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback show\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Updating coin records...\n\n\nCoin ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5\nAmount: 0.1 XCH (100000000000 mojos)\nTimelock: 60 seconds\nTime left: 23 seconds\n"})}),(0,n.jsxs)(t.p,{children:["The timelock expires when the ",(0,n.jsx)(t.code,{children:"Time left:"})," value reaches ",(0,n.jsx)(t.code,{children:"0 seconds"}),":"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback show\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Updating coin records...\n\n\nCoin ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5\nAmount: 0.1 XCH (100000000000 mojos)\nTimelock: 60 seconds\nTime left: 0 seconds\n"})}),(0,n.jsx)(t.p,{children:"For your reference, the Recipient wallet currently has a balance of 0 XCH:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"chia wallet show -f 1231588123\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Wallet height: 2405060\nSync status: Synced\nBalances, fingerprint: 1231588123\n\nChia Wallet:\n   -Total Balance:         0.0 txch (0 mojo)\n   -Pending Total Balance: 0.0 txch (0 mojo)\n   -Spendable:             0.0 txch (0 mojo)\n   -Type:                  STANDARD_WALLET\n   -Wallet ID:             1\n"})}),(0,n.jsx)(t.p,{children:"The Recipient (or anyone else) can view the status of the clawback coin if they know the coin ID:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback show -c ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Updating coin records...\n\n\nCoin ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5\nAmount: 0.1 XCH (100000000000 mojos)\nTimelock: 60 seconds\nTime left: 0 seconds\n"})}),(0,n.jsxs)(t.p,{children:["The value of ",(0,n.jsx)(t.code,{children:"Time left:"})," is ",(0,n.jsx)(t.code,{children:"0 seconds"}),", which indicates that the Recipient can now run the ",(0,n.jsx)(t.code,{children:"clawback claim"})," command to claim the coin:"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback claim -c ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Submitted spend to claim coin: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5\n"})}),(0,n.jsxs)(t.p,{children:["While the ",(0,n.jsx)(t.code,{children:"claim"})," transaction is being processed, it will show in the ",(0,n.jsx)(t.code,{children:"Pending Total Balance:"})," of the Recipient's wallet:"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"chia wallet show -f 1231588123\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Wallet height: 2405100\nSync status: Synced\nBalances, fingerprint: 1231588123\n\nChia Wallet:\n   -Total Balance:         0.0 txch (0 mojo)\n   -Pending Total Balance: 0.1 txch (100000000000 mojo)\n   -Spendable:             0.0 txch (0 mojo)\n   -Type:                  STANDARD_WALLET\n   -Wallet ID:             1\n"})}),(0,n.jsx)(t.p,{children:"Finally, the Recipient can view the additional balance in their wallet:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"chia wallet show -f 1231588123\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{children:"Wallet height: 2405465\nSync status: Synced\nBalances, fingerprint: 1231588123\n\nChia Wallet:\n   -Total Balance:         0.1 txch (100000000000 mojo)\n   -Pending Total Balance: 0.1 txch (100000000000 mojo)\n   -Spendable:             0.1 txch (100000000000 mojo)\n   -Type:                  STANDARD_WALLET\n   -Wallet ID:             1\n"})}),(0,n.jsx)(t.p,{children:"The spend is now complete and can no longer be clawed back. The funds are stored as a standard Chia coin in the Recipient's wallet."})]}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"claw",children:(0,n.jsx)(t.code,{children:"claw"})}),"\n",(0,n.jsx)(t.p,{children:"Functionality:"}),"\n",(0,n.jsxs)(t.p,{children:["Usage: ",(0,n.jsx)(t.code,{children:"clawback claw [OPTIONS]"})]}),"\n",(0,n.jsx)(t.p,{children:"Options: Clawback an unclaimed coin"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Short Command"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Long Command"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Required"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-c"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--coin-id"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"True"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The coin ID for the clawback coin to inspect"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-m"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--fee"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"FLOAT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The fee in XCH for this transaction"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-w"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-id"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The wallet id for fees. If no target address given the clawback will go to this wallet id"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-t"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--target-address"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The address you want to sent the clawed back coin to"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-np"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--node-rpc-port"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Node is hosting the RPC interface"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-f"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--fingerprint"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the fingerprint to specify which wallet to use"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-wp"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-rpc-port"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-db"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--db-path"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the path for the database"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-h"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--help"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Show a help message and exit"})]})]})]}),"\n",(0,n.jsxs)(l,{children:[(0,n.jsx)("summary",{children:"Example"}),(0,n.jsx)(t.p,{children:"Let's say the following clawback coin exists:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback show\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Updating coin records...\n\n\nCoin ID: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532\nAmount: 0.1 XCH (100000000000 mojos)\nTimelock: 600 seconds\nTime left: 518 seconds\n"})}),(0,n.jsx)(t.p,{children:"The same public/private key pair that created this coin must be used to claw it back."}),(0,n.jsx)(t.p,{children:"The Sender will use the clawback claw command, passing in the ID of the coin to claw back:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback claw -c 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532 -m 0.000275\n"})}),(0,n.jsx)(t.p,{children:"As a result, the clawback coin will be spent, and a new coin will be created in the Sender's wallet:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Submitted spend to claw back coin: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532\n"})}),(0,n.jsxs)(t.p,{children:["To show the status of the clawback, run the ",(0,n.jsx)(t.code,{children:"clawback show"})," command once again:"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback show\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Updating coin records...\nNo coins found\n"})})]}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"create",children:(0,n.jsx)(t.code,{children:"create"})}),"\n",(0,n.jsx)(t.p,{children:"Functionality: Make a transaction to create a clawback coin"}),"\n",(0,n.jsxs)(t.p,{children:["Usage: ",(0,n.jsx)(t.code,{children:"clawback create [OPTIONS]"})]}),"\n",(0,n.jsx)(t.p,{children:"Options:"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Short Command"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Long Command"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Required"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-t"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--to"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"True"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The recipient's address"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-l"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--timelock"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The timelock to use for the clawback coin you're creating, in seconds. Default is two weeks"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-a"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--amount"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"True"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The amount to fund (in XCH)"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-w"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-id"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The wallet id to send from"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-m"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--fee"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"FLOAT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The fee in XCH for the funding transaction"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-np"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--node-rpc-port"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Node is hosting the RPC interface"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-f"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--fingerprint"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the fingerprint to specify which wallet to use"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-wp"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-rpc-port"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-db"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--db-path"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the path for the database"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-h"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--help"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Show a help message and exit"})]})]})]}),"\n",(0,n.jsxs)(l,{children:[(0,n.jsx)("summary",{children:"Example"}),(0,n.jsx)(t.p,{children:"For this example, we will use two wallets: a Sender and a Recipient. The Sender has a balance of 10 TXCH and the Recipient has 0 TXCH."}),(0,n.jsx)(t.p,{children:"For your reference, here is the Sender wallet's info:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"chia wallet show -f 3807629793\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Wallet height: 2391281\nSync status: Synced\nBalances, fingerprint: 3807629793\n\nChia Wallet:\n   -Total Balance:         8.0 txch (8000000000000 mojo)\n   -Pending Total Balance: 8.0 txch (8000000000000 mojo)\n   -Spendable:             8.0 txch (8000000000000 mojo)\n   -Type:                  STANDARD_WALLET\n   -Wallet ID:             1\n"})}),(0,n.jsxs)(t.p,{children:["To create the clawback coin from the Sender's wallet, run the ",(0,n.jsx)(t.code,{children:"clawback create"})," command. The ",(0,n.jsx)(t.code,{children:"-t"})," (Recipient's address) and ",(0,n.jsx)(t.code,{children:"-a"})," (amount in XCH/TXCH) flags are required. By default, the clawback coin will be locked for two weeks. For this example, we will override the default by using the ",(0,n.jsx)(t.code,{children:"-t"})," flag to specify a timelock period of 600 seconds. We will also use the ",(0,n.jsx)(t.code,{children:"-m"})," flag to include a fee of 0.000275 TXCH."]}),(0,n.jsxs)(t.admonition,{type:"info",children:[(0,n.jsx)(t.p,{children:"The testnet is constantly being dusted (filled with small transactions) in order to simulate a busy network. Because of this you are always recommended to include a fee with testnet transactions. The 275-million mojo fee from this demo should be sufficient to push your transactions through in the next transaction block."}),(0,n.jsx)(t.p,{children:"If you are running on mainnet, a fee of 275 million mojos is likely higher than the recommended amount. The reference wallet GUI will suggest an appropriate fee to be included with all transactions."})]}),(0,n.jsx)(t.p,{children:"The Sender will run the following command in this example (these are only example settings; replace the values as needed):"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback create -t txch1czxl4c42kwem8jllm4xp78jt7t0j0pu9uh9xw5jddegcu703xnpsqaaxxx -a 0.1 -l 600 -m 0.000275\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Created Coin with ID: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532\nCoin { parent_coin_info: dcedd4d573679302ee3f2a54fb51c437b8156e8cd5b1c3c08d25cadf83292c3d, puzzle_hash: 13cb7ce11775a5b42754fb382eb94c846e4be677e6d55bf665b23c075a54e930, amount: 100000000000 }\n"})}),(0,n.jsxs)(t.p,{children:["As a result of running this command, a new clawback coin has been created on the blockchain, the details of which are shown above. To view this coin, along with other clawback coins created by this wallet, run the ",(0,n.jsx)(t.code,{children:"clawback show"})," command:"]}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback show\n"})}),(0,n.jsx)(t.p,{children:"The basic details of the clawback coin are given:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback show\nUpdating coin records...\n\n\nCoin ID: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532\nAmount: 0.1 XCH (100000000000 mojos)\nTimelock: 600 seconds\nTime left: 518 seconds\n"})})]}),"\n",(0,n.jsx)(t.hr,{}),"\n",(0,n.jsx)(t.h3,{id:"show",children:(0,n.jsx)(t.code,{children:"show"})}),"\n",(0,n.jsx)(t.p,{children:"Functionality: Get details for all clawback coins"}),"\n",(0,n.jsxs)(t.p,{children:["Usage: ",(0,n.jsx)(t.code,{children:"clawback show [OPTIONS]"})]}),"\n",(0,n.jsx)(t.p,{children:"Options:"}),"\n",(0,n.jsxs)(t.table,{children:[(0,n.jsx)(t.thead,{children:(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Short Command"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Long Command"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Type"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Required"}),(0,n.jsx)(t.th,{style:{textAlign:"left"},children:"Description"})]})}),(0,n.jsxs)(t.tbody,{children:[(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-c"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--coin-id"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"The coin ID for the clawback coin to inspect"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-np"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--node-rpc-port"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Node is hosting the RPC interface"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-f"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--fingerprint"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the fingerprint to specify which wallet to use"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-wp"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--wallet-rpc-port"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"INTEGER"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the port where the Wallet is hosting the RPC interface. See the rpc_port under wallet in config.yaml"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-db"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--db-path"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"TEXT"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Set the path for the database"})]}),(0,n.jsxs)(t.tr,{children:[(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"-h"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"--help"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"None"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"False"}),(0,n.jsx)(t.td,{style:{textAlign:"left"},children:"Show a help message and exit"})]})]})]}),"\n",(0,n.jsxs)(l,{children:[(0,n.jsx)("summary",{children:"Example 1"}),(0,n.jsx)(t.p,{children:"The Sender can show a Clawback coin without passing in the Coin ID:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback show\n"})}),(0,n.jsx)(t.p,{children:"The basic details of the clawback coin are given:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback show\nUpdating coin records...\n\n\nCoin ID: 29056b320b380c0fc4834578ca30318ae9c1d1cddbe39a91197870c4dc474532\nAmount: 0.1 XCH (100000000000 mojos)\nTimelock: 600 seconds\nTime left: 518 seconds\n"})})]}),"\n",(0,n.jsxs)(l,{children:[(0,n.jsx)("summary",{children:"Example 2"}),(0,n.jsx)(t.p,{children:"Anyone other than the sender needs to pass in the Coin ID in order to show a Clawback coin:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"clawback show -c ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5\n"})}),(0,n.jsx)(t.p,{children:"Result:"}),(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-bash",children:"Updating coin records...\n\n\nCoin ID: ef4b69e65e99261d6e30c8d2d331a8ed84995f3452b95aaa944f76a0f9af74c5\nAmount: 0.1 XCH (100000000000 mojos)\nTimelock: 60 seconds\nTime left: 0 seconds\n"})})]})]})}function x(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},1151:(e,t,l)=>{l.d(t,{Z:()=>d,a:()=>c});var n=l(7294);const s={},i=n.createContext(s);function c(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:c(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);