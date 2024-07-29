"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[1352],{7852:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>d,frontMatter:()=>i,metadata:()=>o,toc:()=>h});var n=r(5893),s=r(1151);const i={title:"Architecture",slug:"/key-architecture"},a=void 0,o={id:"keys/architecture",title:"Architecture",description:"This page details the architecture of keys. For a more general overview of other components, refer to the Architecture Overview page.",source:"@site/i18n/zh-Hans/docusaurus-plugin-content-docs/current/keys/architecture.md",sourceDirName:"keys",slug:"/key-architecture",permalink:"/zh-Hans/key-architecture",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/keys/architecture.md",tags:[],version:"current",frontMatter:{title:"Architecture",slug:"/key-architecture"},sidebar:"tutorialSidebar",previous:{title:"Forks",permalink:"/zh-Hans/consensus-forks"},next:{title:"BLS Keys",permalink:"/zh-Hans/bls-keys"}},c={},h=[];function l(e){const t={a:"a",admonition:"admonition",li:"li",p:"p",ul:"ul",...(0,s.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.admonition,{type:"info",children:(0,n.jsxs)(t.p,{children:["This page details the architecture of keys. For a more general overview of other components, refer to the ",(0,n.jsx)(t.a,{href:"/architecture-overview",children:"Architecture Overview page"}),"."]})}),"\n",(0,n.jsx)(t.p,{children:"The following image assumes an architecture where the farmer decides to keep all keys separate."}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"a wallet key that can potentially be cold storage"}),"\n",(0,n.jsx)(t.li,{children:"local keys within the harvester machine, which are separated from the farmer"}),"\n",(0,n.jsx)(t.li,{children:"a separate pool key"}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"Note that in the simplest configuration, a user can run all of the services (wallet, node, harvester, farmer, pool) in the same machine, and thus the same master key is used for all keys."}),"\n",(0,n.jsx)("figure",{children:(0,n.jsx)("img",{src:"/img/keys/architecture.png",alt:"drawing"})}),"\n",(0,n.jsx)(t.p,{children:"In this configuration, harvesters only store plot files, and provide the farmer with signatures by the local sk whenever necessary."}),"\n",(0,n.jsx)(t.p,{children:"The farmer machine has its own key, which is used to create signatures of new blocks, and combines them with the local sk signatures. The farmer machine can configure a different wallet address to send the funds to, so the user can keep their spending keys in cold storage."}),"\n",(0,n.jsx)(t.p,{children:"Furthermore, the communication channel between the farmer and harvester is authenticated with TLS certificates, which allows the harvester to know if the farmer is trusted."}),"\n",(0,n.jsxs)(t.p,{children:["The farmer can also communicate with a pool, through the pooling protocol. In this case, the farmer would send periodic messages to the pool, to prove space. Recall from the ",(0,n.jsx)(t.a,{href:"/pool-architecture",children:"Pool Architecture page"})," that each block is eligible to create two coinbase reward coins: the pool reward, which is 7/8, and the farmer reward, which is 1/8 + transaction fees."]}),"\n",(0,n.jsx)(t.p,{children:"After farming a block, the 7/8 coin is absorbed by the pool, and later distributed to pool members. Chia's pool architecture is decentralized, because the farmers run their own node, and pooling does not lead to central control of the system."}),"\n",(0,n.jsx)(t.p,{children:"If using a pool contract puzzle hash, the pool signature is not included in the block."})]})}function d(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(l,{...e})}):l(e)}},1151:(e,t,r)=>{r.d(t,{Z:()=>o,a:()=>a});var n=r(7294);const s={},i=n.createContext(s);function a(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);