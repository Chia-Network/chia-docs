"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[1164],{891:(e,o,t)=>{t.r(o),t.d(o,{assets:()=>h,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var n=t(5893),s=t(1151);const a={title:"Proof of Time (VDFs)",sidebar_label:"Proof of Time",slug:"/proof-of-time"},i=void 0,r={id:"consensus/proof-of-time",title:"Proof of Time (VDFs)",description:"A Verifiable Delay Function, also referred to as a Proof of Time or VDF, is a proof that a sequential function was executed a certain number of times.",source:"@site/docs/consensus/proof-of-time.md",sourceDirName:"consensus",slug:"/proof-of-time",permalink:"/proof-of-time",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/consensus/proof-of-time.md",tags:[],version:"current",frontMatter:{title:"Proof of Time (VDFs)",sidebar_label:"Proof of Time",slug:"/proof-of-time"},sidebar:"tutorialSidebar",previous:{title:"Proof of Space",permalink:"/proof-of-space"},next:{title:"Challenges",permalink:"/consensus-challenges"}},h={},c=[{value:"Infusion",id:"infusion",level:3}];function l(e){const o={a:"a",em:"em",h3:"h3",li:"li",ol:"ol",p:"p",strong:"strong",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.p,{children:"A Verifiable Delay Function, also referred to as a Proof of Time or VDF, is a proof that a sequential function was executed a certain number of times."}),"\n",(0,n.jsxs)(o.p,{children:[(0,n.jsx)(o.strong,{children:"Verifiable"}),": This means that after performing the computation (which takes time), the Prover can create a very small proof in a very short time, and the Verifier can verify this proof without having to redo the whole computation."]}),"\n",(0,n.jsxs)(o.p,{children:[(0,n.jsx)(o.strong,{children:"Delay"}),": This means that the Prover actually spent a real amount of time (although we don't know exactly how much) to compute the function."]}),"\n",(0,n.jsxs)(o.p,{children:[(0,n.jsx)(o.strong,{children:"Function"}),": This means it's deterministic: computing a VDF on an input x ",(0,n.jsx)(o.em,{children:"always"})," yields the same result y."]}),"\n",(0,n.jsx)(o.p,{children:'The key word here is "sequential", like hashing a number many times: hash(hash(hash(a))), etc. This means the prover cannot just add more machines to make the function execute faster. Therefore we can assume that computing a VDF requires real (wall-clock) time. The construction that we use is repeated squaring. The Prover must square a challenge x T times. This requires time \u03f4(T). The Prover also must create a proof that this was performed properly.'}),"\n",(0,n.jsxs)("figure",{children:[(0,n.jsx)("img",{src:"/img/vdf.png",alt:"drawing"}),(0,n.jsx)("figcaption",{children:(0,n.jsx)(o.p,{children:"Figure 3: The Verifier (blockchain) sends a challenge to the Prover (timelord) and the Prover computes the output and proof."})})]}),"\n",(0,n.jsxs)(o.p,{children:["Although the following details are not very important for understanding the consensus algorithm, the choice of what VDF to use is relevant, because if an attacker succeeds in obtaining a much faster machine, some ",(0,n.jsx)(o.a,{href:"/consensus-attacks",children:"attacks"})," become possible."]}),"\n",(0,n.jsxs)(o.p,{children:["The VDF used by Chia is repeated squaring in a ",(0,n.jsx)(o.a,{href:"https://github.com/Chia-Network/vdf-competition/blob/main/classgroups.pdf",children:"class group of unknown order"}),". There are two main ways to generate a large group that has an unknown order:"]}),"\n",(0,n.jsxs)(o.ol,{children:["\n",(0,n.jsx)(o.li,{children:"Use an RSA modulus, and use the integers mod N as a group. The order of the group is unknown if you can generate your modulus with many participating parties using an MPC ceremony."}),"\n",(0,n.jsx)(o.li,{children:"An easier approach is to use classgroups with a large prime discriminant, which are groups of unknown order. This does not require any complex or trusted setup, so we chose this option for Chia."}),"\n"]}),"\n",(0,n.jsxs)(o.p,{children:["To create one of these groups, one just needs a large, random, prime number. The drawbacks are that classgroup code is less tested in real life, and optimizations are less well-known than in RSA groups. We use the same initial element for the squaring (a=2, b=1 classgroup element), and instead use the challenge to generate a new random prime number for each VDF, which is used as the discriminant. The discriminant has a size of 1024 bits, which means the proof sizes are around 1024 bits. We use the ",(0,n.jsx)(o.a,{href:"https://eprint.iacr.org/2018/623",children:"Wesolowski scheme"})," split into n (1<=n<=64) phases so that creating the proofs is very fast. Since the n-wesolowski proofs can be large, we replace them with 1-wesolowski proofs as soon as they are available. These are smaller, but require more time to make. The proofs themselves are not committed to on-chain, so they are replaceable."]}),"\n",(0,n.jsx)(o.h3,{id:"infusion",children:"Infusion"}),"\n",(0,n.jsxs)(o.p,{children:["As a recap, VDFs take in an input, called a ",(0,n.jsx)(o.em,{children:"challenge"}),", and produce an output, together with a proof that certifies that the function was evaluated correctly."]}),"\n",(0,n.jsxs)(o.p,{children:["A ",(0,n.jsx)(o.em,{children:"value"}),", in this context, can be thought of as a block with a proof of space. The value is combined with an output of a VDF, to generate a new value, which is used as the input/challenge for the next VDF. This is known as an ",(0,n.jsx)(o.em,{children:"infusion"})," of a value into a VDF."]}),"\n",(0,n.jsx)(o.p,{children:"Therefore, we are chaining VDFs, but committing to a new value in between. This is used so that we have a linear progression of blocks, alternating proofs of space with proofs of time."})]})}function u(e={}){const{wrapper:o}={...(0,s.a)(),...e.components};return o?(0,n.jsx)(o,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},1151:(e,o,t)=>{t.d(o,{Z:()=>r,a:()=>i});var n=t(7294);const s={},a=n.createContext(s);function i(e){const o=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function r(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:i(e.components),n.createElement(a.Provider,{value:o},e.children)}}}]);