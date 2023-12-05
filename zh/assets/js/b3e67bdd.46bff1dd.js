"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[2346],{7372:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>r,contentTitle:()=>a,default:()=>p,frontMatter:()=>n,metadata:()=>l,toc:()=>c});var s=o(5893),i=o(1151);const n={title:"Plot IDs",slug:"/plot-ids"},a=void 0,l={id:"keys/plot-ids",title:"Plot IDs",description:"A plot ID is a 32-byte value that is used as a deterministic seed to create an entire plot. In other words, two plots with the same plot ID will create byte-identical plot files. Plot IDs are public values that get put into Proof of Space objects.",source:"@site/docs/keys/plot-ids.md",sourceDirName:"keys",slug:"/plot-ids",permalink:"/zh/plot-ids",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/keys/plot-ids.md",tags:[],version:"current",frontMatter:{title:"Plot IDs",slug:"/plot-ids"},sidebar:"tutorialSidebar",previous:{title:"BLS Keys",permalink:"/zh/bls-keys"},next:{title:"Plot Public Keys",permalink:"/zh/plot-public-keys"}},r={},c=[];function h(e){const t={a:"a",li:"li",ol:"ol",p:"p",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.p,{children:"A plot ID is a 32-byte value that is used as a deterministic seed to create an entire plot. In other words, two plots with the same plot ID will create byte-identical plot files. Plot IDs are public values that get put into Proof of Space objects."}),"\n",(0,s.jsx)(t.p,{children:"A plot ID can be generated in one of two ways, depending on the desired farming method of the plot."}),"\n",(0,s.jsx)("figure",{children:(0,s.jsx)("img",{src:"/img/keys/plot-id.png",alt:"drawing"})}),"\n",(0,s.jsxs)(t.ol,{children:["\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"Farm to pool public key. This method of farming is desirable if solo farming (no pools). To farm a plot like this, we hash together the pool public key and the plot public key (explained later). When successfully farming a block, the pool private key must sign the reward address. The drawback of this method is that if using a pool, the pool cannot be changed, and the plot is tied to the pool forever."}),"\n"]}),"\n",(0,s.jsxs)(t.li,{children:["\n",(0,s.jsx)(t.p,{children:"Farm to pool contract address. This method of farming is suitable for users who want to farm to a pool, and to be able to change pools in the future. Most farmers will likely use this method."}),"\n"]}),"\n"]}),"\n",(0,s.jsx)(t.p,{children:"Instead of requiring a signature by the pool, rewards go straight into the puzzle hash (or address), that is encoded into the plot. This address is a smart contract controlled by the user, which specifies the user's current pool. The user can switch pools, with a timeout delay that the pool operator may customize (typically 30 minutes)."}),"\n",(0,s.jsxs)(t.p,{children:["This approach requires creating a blockchain transaction of at least one mojo before farming. Farmers can get 100 mojos for free from the official ",(0,s.jsx)(t.a,{href:"https://faucet.chia.net",children:"faucet"}),"."]}),"\n",(0,s.jsx)(t.p,{children:"The plot public key is explained in the next section."})]})}function p(e={}){const{wrapper:t}={...(0,i.a)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},1151:(e,t,o)=>{o.d(t,{Z:()=>l,a:()=>a});var s=o(7294);const i={},n=s.createContext(i);function a(e){const t=s.useContext(n);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(n.Provider,{value:t},e.children)}}}]);