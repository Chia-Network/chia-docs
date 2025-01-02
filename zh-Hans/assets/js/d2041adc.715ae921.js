"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[8532],{7638:(e,o,t)=>{t.r(o),t.d(o,{assets:()=>c,contentTitle:()=>i,default:()=>p,frontMatter:()=>a,metadata:()=>r,toc:()=>l});const r=JSON.parse('{"id":"architecture/pools","title":"Pools","description":"Pools allow farmers to smooth out their rewards by earning based on proof of space partials, as opposed to winning blocks.","source":"@site/i18n/zh-Hans/docusaurus-plugin-content-docs/current/architecture/pools.md","sourceDirName":"architecture","slug":"/pool-architecture","permalink":"/zh-Hans/pool-architecture","draft":false,"unlisted":false,"editUrl":"https://github.com/Chia-Network/chia-docs/blob/main/docs/architecture/pools.md","tags":[],"version":"current","frontMatter":{"title":"Pools","slug":"/pool-architecture"},"sidebar":"tutorialSidebar","previous":{"title":"Timelords","permalink":"/zh-Hans/timelord-architecture"},"next":{"title":"Wallets","permalink":"/zh-Hans/wallet-architecture"}}');var n=t(4848),s=t(8453);const a={title:"Pools",slug:"/pool-architecture"},i=void 0,c={},l=[];function h(e){const o={a:"a",admonition:"admonition",p:"p",strong:"strong",...(0,s.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.p,{children:"Pools allow farmers to smooth out their rewards by earning based on proof of space partials, as opposed to winning blocks."}),"\n",(0,n.jsx)(o.p,{children:"Pools require the use of portable plots. These plots are tied to a plot NFT that the farmer must create. This NFT sits on Chia's blockchain, and it allows users to switch between pools."}),"\n",(0,n.jsxs)(o.p,{children:["Pools create and spend ",(0,n.jsx)(o.strong,{children:"coinbase transactions"}),", but in Chia's pool protocol they do not actually choose the contents of blocks. This gives more power to farmers and thus decreases the influence of centralized pools."]}),"\n",(0,n.jsx)(o.p,{children:"Farmers periodically send partials, which contain a proof of space and a signature, to pools. The pools use these partial proofs to determine how much space the farmers have dedicated, which in turn determines the farmer's portion of the reward when the pool wins a block."}),"\n",(0,n.jsx)(o.p,{children:"When a farmer who is a member of a pool wins a block, 7/8 of the reward goes to the pool, which is later distributed to the participants. The farmer keeps the other 1/8 of the reward. This was an intentional design decision. If a farmer didn't receive a direct reward for creating a block, the operator of a competing pool might have had a financial incentive to join a pool (that they didn't run) with a large number of plots, and neglect to create a block when they found a valid proof, thereby spoiling the competing pool."}),"\n",(0,n.jsx)(o.admonition,{type:"info",children:(0,n.jsxs)(o.p,{children:["For more info, see our ",(0,n.jsx)(o.a,{href:"/pool-farming",children:"Pool Farming page"}),", as well as this site's ",(0,n.jsx)(o.a,{href:"/pool-protocol",children:"Pool Protocol page"})," page."]})})]})}function p(e={}){const{wrapper:o}={...(0,s.R)(),...e.components};return o?(0,n.jsx)(o,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},8453:(e,o,t)=>{t.d(o,{R:()=>a,x:()=>i});var r=t(6540);const n={},s=r.createContext(n);function a(e){const o=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function i(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:a(e.components),r.createElement(s.Provider,{value:o},e.children)}}}]);