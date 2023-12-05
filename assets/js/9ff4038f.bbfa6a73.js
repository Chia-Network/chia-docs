"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[2353],{4590:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>h,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var o=i(5893),t=i(1151);const a={sidebar_label:"Intro to Chia",title:"Introduction",slug:"/introduction"},s="Introduction to Chia",r={id:"getting-started/introduction",title:"Introduction",description:"Chia is a cryptocurrency and blockchain with smart transaction capabilities. It was designed from the ground up to make cryptocurrency easier to use (and harder to lose) than cash.",source:"@site/docs/getting-started/introduction.md",sourceDirName:"getting-started",slug:"/introduction",permalink:"/introduction",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/getting-started/introduction.md",tags:[],version:"current",frontMatter:{sidebar_label:"Intro to Chia",title:"Introduction",slug:"/introduction"},sidebar:"tutorialSidebar",next:{title:"Farming Guide",permalink:"/farming-guide"}},h={},c=[{value:"Proof of Space and Time",id:"proof-of-space-and-time",level:2},{value:"Coin Set Model",id:"coin-set-model",level:2},{value:"Pooling",id:"pooling",level:2},{value:"Other Highlights",id:"other-highlights",level:2}];function l(e){const n={a:"a",admonition:"admonition",h1:"h1",h2:"h2",li:"li",p:"p",strong:"strong",ul:"ul",...(0,t.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h1,{id:"introduction-to-chia",children:"Introduction to Chia"}),"\n",(0,o.jsx)(n.p,{children:"Chia is a cryptocurrency and blockchain with smart transaction capabilities. It was designed from the ground up to make cryptocurrency easier to use (and harder to lose) than cash."}),"\n",(0,o.jsxs)(n.p,{children:["Its ",(0,o.jsx)(n.a,{href:"/consensus-intro",children:"Proof of Space and Time"})," is the only Nakamoto consensus algorithm since Proof of Work, while also having a ",(0,o.jsx)(n.a,{href:"https://chiapower.org",children:"much lower energy consumption"}),". Part of Chia's vision involves improving the carbon footprint of the blockchain industry."]}),"\n",(0,o.jsxs)(n.p,{children:["Chia's mainnet was launched on March 19, 2021. Development of its ecosystem is ongoing, with primitives released for ",(0,o.jsx)(n.a,{href:"https://chialisp.com/cats",children:"CATs"}),", ",(0,o.jsx)(n.a,{href:"https://chialisp.com/nfts",children:"NFTs"}),", ",(0,o.jsx)(n.a,{href:"https://chialisp.com/offers",children:"Offers"}),", and ",(0,o.jsx)(n.a,{href:"https://chialisp.com/dids",children:"DIDs"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["This page will give a brief overview of Chia and its various components. If you are interested in becoming a Chia farmer, feel free to skip ahead to the ",(0,o.jsx)(n.a,{href:"/farming-guide",children:"Beginner's Guide to Farming"}),"."]}),"\n",(0,o.jsx)(n.h2,{id:"proof-of-space-and-time",children:"Proof of Space and Time"}),"\n",(0,o.jsxs)(n.p,{children:["Chia uses a consensus algorithm referred to as ",(0,o.jsx)(n.a,{href:"https://www.chia.net/green-paper",children:"Proof of Space and Time"}),". This allows anyone with an internet connection and some free disk space to participate in securing the network."]}),"\n",(0,o.jsxs)(n.p,{children:["Because of this process of farming (analogous to mining), Chia has become the most decentralized blockchain in the world, with ",(0,o.jsx)(n.a,{href:"https://dashboard.chia.net/d/em15uQ47k/peer-info",children:"over 100,000 nodes"})," securing the system. Each of them store a copy of the blockchain's history, while also propagating new transactions across the network."]}),"\n",(0,o.jsx)(n.h2,{id:"coin-set-model",children:"Coin Set Model"}),"\n",(0,o.jsxs)(n.p,{children:["Chia uses the coin set model to keep track of the network's state. In this model, a coin is a first-class object on the blockchain. Each coin is locked with a serialized ",(0,o.jsx)(n.a,{href:"https://chialisp.com/clvm",children:"CLVM"})," program called a ",(0,o.jsx)(n.strong,{children:"puzzle"}),", which is then hashed to create a ",(0,o.jsx)(n.strong,{children:"puzzle hash"})," (which can be converted to an address). The coin's id is a hash of its parent coin's id, its puzzlehash, and its amount."]}),"\n",(0,o.jsxs)(n.p,{children:["Each transaction in Chia must contain at least one coin spend. In order to spend a coin, one must provide the original puzzle, as well as a valid solution, and an optional aggregated signature. Multiple coins can require each other be spent in the same transaction by using ",(0,o.jsx)(n.strong,{children:"announcements"}),"."]}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["For more information, check out the ",(0,o.jsx)(n.a,{href:"/coin-set-intro",children:"Coin Set Intro page"})," and the ",(0,o.jsx)(n.a,{href:"https://chialisp.com",children:"Chialisp.com"})," website."]})}),"\n",(0,o.jsx)(n.h2,{id:"pooling",children:"Pooling"}),"\n",(0,o.jsx)(n.p,{children:"Like many other blockchains, Chia allows pooling to smooth out the reward structure for smaller farmers. However, Chia's pooling protocol has three unique features."}),"\n",(0,o.jsxs)(n.p,{children:["First of all, farmers create the blocks that they farm rather than the pool they are a member of. This design decision was made in conjunction with Chia's goal of decentralization. In other blockchains such as Bitcoin, four or five pools control over 51% of the global hashrate on any given day (Sources: ",(0,o.jsx)(n.a,{href:"https://www.blockchain.com/pools",children:"blockchain.com"}),", ",(0,o.jsx)(n.a,{href:"https://blockchair.com/bitcoin/charts/hashrate-distribution",children:"blockchair.com"}),"). Arguably, the easiest way to attack Bitcoin would be to bribe each of these pools' operators. In Chia, the pool operators are only responsible for distributing rewards. They cannot modify the blockchain. Therefore, Chia's pooling protocol doesn't lead to increased centralization."]}),"\n",(0,o.jsx)(n.p,{children:"When a block is won, the farmer gets 1/8 of the rewards and the pool operator gets the other 7/8. This was done to discourage pool operators from harming their competition by farming on a competing pool and neglecting to create a block when they find a proof (Solo farmers collect the entire reward when they create a block)."}),"\n",(0,o.jsx)(n.p,{children:"Joining a pool is also permissionless, so farmers don't need to sign up for anything in order to join. All it takes is a small transaction on the blockchain, which costs only a single mojo and a network fee."}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["For more information, check out the ",(0,o.jsx)(n.a,{href:"/pool-protocol",children:"Pool Protocol page"}),"."]})}),"\n",(0,o.jsx)(n.h2,{id:"other-highlights",children:"Other Highlights"}),"\n",(0,o.jsx)(n.p,{children:"There are many other innovations in Chia, some of which include:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"BLS signatures"}),", which allow aggregating all of a block's signatures together."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Scalability and performance"})," improvements, which allow running a Chia node on a Raspberry Pi."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Weight proofs and light clients"}),", which enable fast syncing from a mobile device. For more info, see ",(0,o.jsx)(n.a,{href:"/light-clients",children:"light clients"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Chia Asset Tokens"})," (CATs) are fungible tokens that can be minted from standard XCH. The possibilities are endless! ",(0,o.jsx)(n.a,{href:"https://chialisp.com/cats",children:"Read more on CATs"})," or watch a ",(0,o.jsx)(n.a,{href:"https://www.youtube.com/watch?v=yxagP_VC8BE",children:"CATs video intro"}),". Additionally, a community member has created ",(0,o.jsx)(n.a,{href:"https://www.taildatabase.com/",title:"TAIL database",children:"TAIL Database"}),", which contains a list of CATs in the wild."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"Offer files"})," enable the peer-to-peer exchange of assets, including standard XCH, as well as CATs. ",(0,o.jsx)(n.a,{href:"https://chialisp.com/offers",children:"Read more on Offers"})," or watch a ",(0,o.jsx)(n.a,{href:"https://youtu.be/Z2FoZSNtttM",title:"Offers intro on YouTube",children:"brief intro video"}),"."]}),"\n",(0,o.jsxs)(n.li,{children:[(0,o.jsx)(n.strong,{children:"NFTs"})," enable and drive real-world applications of digital ownership through true marketplace independence, consistent provenance, and digital permanence. We laid out our ",(0,o.jsx)(n.a,{href:"https://www.chia.net/2022/05/11/our-vision-for-chia-nfts.en.html",children:"vision for NFTs on Chia"})," and launched our ",(0,o.jsx)(n.a,{href:"https://www.chia.net/2022/06/29/1.4.0-introducing-the-chia-nft1-standard.en.html",children:"NFT1 standard"})," in June 2022."]}),"\n",(0,o.jsxs)(n.li,{children:["This documentation will explain the motivation and implementation of the different components of the Chia system to a technical audience, and provide in-depth explanations of how everything works. If you would like to skip to how to make dApps (decentralized apps) on Chia, please visit the ",(0,o.jsx)(n.a,{href:"https://chialisp.com",children:"Chialisp"})," website."]}),"\n"]})]})}function d(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>s});var o=i(7294);const t={},a=o.createContext(t);function s(e){const n=o.useContext(a);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:s(e.components),o.createElement(a.Provider,{value:n},e.children)}}}]);