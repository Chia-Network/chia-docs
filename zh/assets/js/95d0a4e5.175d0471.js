"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[8262],{6069:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var o=s(5893),t=s(1151);const i={title:"Consensus Introduction",slug:"/consensus-intro"},r=void 0,a={id:"consensus/consensus-intro",title:"Consensus Introduction",description:"Decentralized consensus algorithms require Sybil resistance, using a resource that is both cryptographically verifiable and scarce (not infinite). In previous blockchain systems, two different scarce resources have been used: computing power (Proof of Work) and staked money (Proof of Stake).",source:"@site/docs/consensus/consensus-intro.md",sourceDirName:"consensus",slug:"/consensus-intro",permalink:"/zh/consensus-intro",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/consensus/consensus-intro.md",tags:[],version:"current",frontMatter:{title:"Consensus Introduction",slug:"/consensus-intro"},sidebar:"tutorialSidebar",previous:{title:"Mempool",permalink:"/zh/mempool"},next:{title:"Proof of Space",permalink:"/zh/proof-of-space"}},c={},l=[];function u(e){const n={em:"em",li:"li",p:"p",ul:"ul",...(0,t.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"Decentralized consensus algorithms require Sybil resistance, using a resource that is both cryptographically verifiable and scarce (not infinite). In previous blockchain systems, two different scarce resources have been used: computing power (Proof of Work) and staked money (Proof of Stake)."}),"\n",(0,o.jsxs)(n.p,{children:["Chia's Proof of Space and Time consensus uses storage capacity as the scarce resource. This comes much closer than previous systems to Satoshi's original ideal of \"one CPU, one vote,\" where a ",(0,o.jsx)(n.em,{children:"vote"}),' refers to a chance to win and validate a block, not an actual vote on-chain. For example, someone storing 500 GiB has 5 "votes," and someone storing 100 GiB has 1 "vote."']}),"\n",(0,o.jsx)(n.p,{children:"One other cryptographic puzzle piece is used to secure Chia's system: a verifiable delay function (VDF), which is a cryptographic proof that real time has passed."}),"\n",(0,o.jsx)(n.p,{children:"A fair system can be created by combining proofs of space and time. In such a system, users store random-looking data on their hard drives. Their chance to win XCH is proportional to their allocated space. Furthermore, such a system scales to billions of participants in a similar way to the Proof of Work lottery. No funds, special hardware, registration, or permission is required to join, only a hard drive and an internet connection. The system is completely transparent and deterministic -- anyone can efficiently and objectively verify which chain is the canonical one, without relying on any trusted parties."}),"\n",(0,o.jsx)(n.p,{children:"Some notes to keep in mind as you continue reading:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Whenever the word ",(0,o.jsx)(n.em,{children:"signature"})," is used, it refers specifically to a deterministic BLS signature, following the IETF specification with the Augmented scheme."]}),"\n",(0,o.jsx)(n.li,{children:"The private keys performing these digital signatures are controlled and stored by the farmers."}),"\n",(0,o.jsx)(n.li,{children:"A unique private key is used for each plot."}),"\n",(0,o.jsx)(n.li,{children:"The hash function used is SHA256, except for the proofs of space which also use CHACHA8 and BLAKE3."}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>a,a:()=>r});var o=s(7294);const t={},i=o.createContext(t);function r(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);