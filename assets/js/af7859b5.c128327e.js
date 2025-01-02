"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[3773],{5606:(e,s,a)=>{a.r(s),a.d(s,{assets:()=>l,contentTitle:()=>c,default:()=>d,frontMatter:()=>i,metadata:()=>n,toc:()=>h});const n=JSON.parse('{"id":"green-paper/green-paper-abstract","title":"Abstract - Chia Green Paper","description":"Abstract","source":"@site/docs/green-paper/green-paper-abstract.md","sourceDirName":"green-paper","slug":"/green-paper-abstract","permalink":"/green-paper-abstract","draft":false,"unlisted":false,"editUrl":"https://github.com/Chia-Network/chia-docs/blob/main/docs/green-paper/green-paper-abstract.md","tags":[],"version":"current","frontMatter":{"title":"Abstract - Chia Green Paper","sidebar_label":"Abstract","slug":"/green-paper-abstract"},"sidebar":"tutorialSidebar","previous":{"title":"Wallet Protocol","permalink":"/wallet-protocol"},"next":{"title":"0 - Constants, Variables and Notation","permalink":"/constants-variables-notation"}}');var t=a(4848),r=a(8453);const i={title:"Abstract - Chia Green Paper",sidebar_label:"Abstract",slug:"/green-paper-abstract"},c="Green Paper",l={},h=[{value:"Abstract",id:"abstract",level:2},{value:"Precursor Consensus Green Paper",id:"precursor-consensus-green-paper",level:3}];function o(e){const s={a:"a",annotation:"annotation",em:"em",h1:"h1",h2:"h2",h3:"h3",header:"header",hr:"hr",math:"math",mrow:"mrow",mtext:"mtext",p:"p",semantics:"semantics",span:"span",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(s.header,{children:(0,t.jsx)(s.h1,{id:"green-paper",children:"Green Paper"})}),"\n",(0,t.jsx)(s.h2,{id:"abstract",children:"Abstract"}),"\n",(0,t.jsxs)(s.p,{children:["This document outlines the rationale and main design ideas behind the consensus layer of ",(0,t.jsxs)(s.span,{className:"katex",children:[(0,t.jsx)(s.span,{className:"katex-mathml",children:(0,t.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,t.jsxs)(s.semantics,{children:[(0,t.jsx)(s.mrow,{children:(0,t.jsx)(s.mtext,{mathvariant:"sans-serif",children:"Chia"})}),(0,t.jsx)(s.annotation,{encoding:"application/x-tex",children:"\\textrm{{\\sf Chia}}"})]})})}),(0,t.jsx)(s.span,{className:"katex-html","aria-hidden":"true",children:(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.6944em"}}),(0,t.jsx)(s.span,{className:"mord text",children:(0,t.jsx)(s.span,{className:"mord",children:(0,t.jsx)(s.span,{className:"mord",children:(0,t.jsx)(s.span,{className:"mord mathsf",children:"Chia"})})})})]})})]}),", a longest-chain\xa0blockchain akin to Bitcoin. It achieves comparable security guarantees as Bitcoin's Proof of Work (PoW) based Nakamoto consensus, while using Proofs of Space in combination with Verifiable Delay Functions (VDFs) to achieve Sybil resistance. This makes ",(0,t.jsxs)(s.span,{className:"katex",children:[(0,t.jsx)(s.span,{className:"katex-mathml",children:(0,t.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,t.jsxs)(s.semantics,{children:[(0,t.jsx)(s.mrow,{children:(0,t.jsx)(s.mtext,{mathvariant:"sans-serif",children:"Chia"})}),(0,t.jsx)(s.annotation,{encoding:"application/x-tex",children:"\\textrm{{\\sf Chia}}"})]})})}),(0,t.jsx)(s.span,{className:"katex-html","aria-hidden":"true",children:(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.6944em"}}),(0,t.jsx)(s.span,{className:"mord text",children:(0,t.jsx)(s.span,{className:"mord",children:(0,t.jsx)(s.span,{className:"mord",children:(0,t.jsx)(s.span,{className:"mord mathsf",children:"Chia"})})})})]})})]}),"\xa0much more ",(0,t.jsx)(s.a,{href:"https://chiapower.org/",children:"sustainable"})," and also more ",(0,t.jsx)(s.a,{href:"https://xch.farm/decentralization/",children:"decentralized"})," than a PoW based blockchain could be."]}),"\n",(0,t.jsxs)(s.p,{children:["We outline the challenges one must solve when replacing proofs of work with an efficient proof system like proofs of space, and how they are addressed in ",(0,t.jsxs)(s.span,{className:"katex",children:[(0,t.jsx)(s.span,{className:"katex-mathml",children:(0,t.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,t.jsxs)(s.semantics,{children:[(0,t.jsx)(s.mrow,{children:(0,t.jsx)(s.mtext,{mathvariant:"sans-serif",children:"Chia"})}),(0,t.jsx)(s.annotation,{encoding:"application/x-tex",children:"\\textrm{{\\sf Chia}}"})]})})}),(0,t.jsx)(s.span,{className:"katex-html","aria-hidden":"true",children:(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.6944em"}}),(0,t.jsx)(s.span,{className:"mord text",children:(0,t.jsx)(s.span,{className:"mord",children:(0,t.jsx)(s.span,{className:"mord",children:(0,t.jsx)(s.span,{className:"mord mathsf",children:"Chia"})})})})]})})]}),". Here ",(0,t.jsx)(s.em,{children:"efficient"})," means that once the resource (like space or stake) is available, computing many proofs is basically as cheap as computing one."]}),"\n",(0,t.jsxs)(s.p,{children:["This document is not a formal specification of ",(0,t.jsxs)(s.span,{className:"katex",children:[(0,t.jsx)(s.span,{className:"katex-mathml",children:(0,t.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,t.jsxs)(s.semantics,{children:[(0,t.jsx)(s.mrow,{children:(0,t.jsx)(s.mtext,{mathvariant:"sans-serif",children:"Chia"})}),(0,t.jsx)(s.annotation,{encoding:"application/x-tex",children:"\\textrm{{\\sf Chia}}"})]})})}),(0,t.jsx)(s.span,{className:"katex-html","aria-hidden":"true",children:(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.6944em"}}),(0,t.jsx)(s.span,{className:"mord text",children:(0,t.jsx)(s.span,{className:"mord",children:(0,t.jsx)(s.span,{className:"mord",children:(0,t.jsx)(s.span,{className:"mord mathsf",children:"Chia"})})})})]})})]}),". Instead, it aims at readers who want to understand the design choices of ",(0,t.jsxs)(s.span,{className:"katex",children:[(0,t.jsx)(s.span,{className:"katex-mathml",children:(0,t.jsx)(s.math,{xmlns:"http://www.w3.org/1998/Math/MathML",children:(0,t.jsxs)(s.semantics,{children:[(0,t.jsx)(s.mrow,{children:(0,t.jsx)(s.mtext,{mathvariant:"sans-serif",children:"Chia\u2019s"})}),(0,t.jsx)(s.annotation,{encoding:"application/x-tex",children:"\\textrm{{\\sf Chia's}}"})]})})}),(0,t.jsx)(s.span,{className:"katex-html","aria-hidden":"true",children:(0,t.jsxs)(s.span,{className:"base",children:[(0,t.jsx)(s.span,{className:"strut",style:{height:"0.6944em"}}),(0,t.jsx)(s.span,{className:"mord text",children:(0,t.jsx)(s.span,{className:"mord",children:(0,t.jsx)(s.span,{className:"mord",children:(0,t.jsx)(s.span,{className:"mord mathsf",children:"Chia\u2019s"})})})})]})})]}),"\xa0consensus, and are interested in permissionless longest-chain\xa0blockchains from efficient proof systems in general."]}),"\n",(0,t.jsxs)(s.p,{children:[(0,t.jsx)(s.a,{href:"https://docs.chia.net/files/ChiaGreenPaper_20241008.pdf",children:"Green Paper PDF"})," - updated October 8, 2024"]}),"\n",(0,t.jsx)(s.hr,{}),"\n",(0,t.jsx)(s.h3,{id:"precursor-consensus-green-paper",children:"Precursor Consensus Green Paper"}),"\n",(0,t.jsxs)(s.p,{children:["In order to provide historical context, the Green Paper's previous version that discusses a precursor consensus which was never implemented is available here for viewing: ",(0,t.jsx)(s.a,{href:"https://docs.chia.net/files/Precursor-ChiaGreenPaper.pdf",children:"Precursor Green Paper"}),"."]})]})}function d(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,t.jsx)(s,{...e,children:(0,t.jsx)(o,{...e})}):o(e)}},8453:(e,s,a)=>{a.d(s,{R:()=>i,x:()=>c});var n=a(6540);const t={},r=n.createContext(t);function i(e){const s=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(s):{...s,...e}}),[s,e])}function c(e){let s;return s=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:i(e.components),n.createElement(r.Provider,{value:s},e.children)}}}]);