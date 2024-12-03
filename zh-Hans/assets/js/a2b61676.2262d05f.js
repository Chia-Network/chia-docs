"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[3552],{3860:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>s,metadata:()=>a,toc:()=>u});const a=JSON.parse('{"id":"getting-started/cloud-wallet/tooltips","title":"Tooltips","description":"This page contains tooltip links from the Cloud Wallet. It provides some basic info about the various components.","source":"@site/docs/getting-started/cloud-wallet/tooltips.md","sourceDirName":"getting-started/cloud-wallet","slug":"/getting-started/cloud-wallet/tooltips","permalink":"/zh-Hans/getting-started/cloud-wallet/tooltips","draft":false,"unlisted":false,"editUrl":"https://github.com/Chia-Network/chia-docs/blob/main/docs/getting-started/cloud-wallet/tooltips.md","tags":[],"version":"current","frontMatter":{"slug":"/getting-started/cloud-wallet/tooltips","title":"Tooltips"},"sidebar":"tutorialSidebar","previous":{"title":"FAQ","permalink":"/zh-Hans/getting-started/cloud-wallet/faq"},"next":{"title":"Unfinished Components","permalink":"/zh-Hans/getting-started/cloud-wallet/unfinished"}}');var n=r(4848),o=r(8453);r(1470),r(9365);const s={slug:"/getting-started/cloud-wallet/tooltips",title:"Tooltips"},i=void 0,l={},u=[{value:"Custody Key",id:"custody-key",level:2},{value:"Recovery Key",id:"recovery-key",level:2},{value:"Transaction Fee",id:"transaction-fee",level:2},{value:"Recovery Clawback",id:"recovery-clawback",level:2},{value:"Recovery Phrase",id:"recovery-phrase",level:2},{value:"Recovery Timer",id:"recovery-timer",level:2},{value:"Signer App",id:"signer-app",level:2}];function c(e){const t={h2:"h2",p:"p",...(0,o.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"This page contains tooltip links from the Cloud Wallet. It provides some basic info about the various components."}),"\n",(0,n.jsx)(t.h2,{id:"custody-key",children:"Custody Key"}),"\n",(0,n.jsx)(t.p,{children:"This is a vault\u2019s primary key used for signing transactions. It can be either a passkey or a hardware key from the Chia Signer app."}),"\n",(0,n.jsx)(t.h2,{id:"recovery-key",children:"Recovery Key"}),"\n",(0,n.jsx)(t.p,{children:"This key can only be used for recovering a vault. It cannot be used for signing transactions. Currently it must be a BLS key. In the future, we will also enable passkeys, as well as hardware and software keys from the Chia Signer app."}),"\n",(0,n.jsx)(t.h2,{id:"transaction-fee",children:"Transaction Fee"}),"\n",(0,n.jsx)(t.p,{children:"A fee for speeding up your transaction\u2019s confirmation time if the network is busy. Testnet11 is often being dusted with small transactions, so we recommend including a fee whenever possible. Typically 0.001 TXCH is sufficient for fast confirmation on testnet11."}),"\n",(0,n.jsx)(t.h2,{id:"recovery-clawback",children:"Recovery Clawback"}),"\n",(0,n.jsx)(t.p,{children:'When you create a new vault, you need to input the amount of time to wait before a recovery can be completed. This is the "recovery clawback" time. During this time window, you can cancel the recovery if it was initiated maliciously. Note that the default recovery clawback time for the beta is 15 minutes. On mainnet, most people will want to set this to something like 48-72 hours in order to provide ample time to cancel the recovery if necessary.'}),"\n",(0,n.jsx)(t.h2,{id:"recovery-phrase",children:"Recovery Phrase"}),"\n",(0,n.jsx)(t.p,{children:"If you use a BLS key as the recovery key, you will be given a series of 24 words to copy. This is the recovery phrase. You will need to enter this phrase upon initiating a vault recovery. Be sure to copy this phrase carefully, and don\u2019t show it to anyone. We don\u2019t store a copy of this phrase, so we can only show it to you when you create your vault."}),"\n",(0,n.jsx)(t.h2,{id:"recovery-timer",children:"Recovery Timer"}),"\n",(0,n.jsx)(t.p,{children:"This is the amount of time you must wait before a recovery operation can be completed. The timer is set upon the vault\u2019s creation, and it can only be modified during a recovery. For example, when you create a vault, if you set this timer to 3 days, then after you initiate a recovery, you will need to wait for 3 days to complete it. During that time, you can cancel the recovery. The reason this timer exists is so that if someone steals your recovery key, you can cancel any recovery attempts, and send your assets to a new vault."}),"\n",(0,n.jsx)(t.h2,{id:"signer-app",children:"Signer App"}),"\n",(0,n.jsx)(t.p,{children:"A smartphone app initially available for iPhones made after 2013. The app stores a signer key in its Secure Enclave. This key cannot be copied or removed from the phone, so the only way to steal it is to gain physical access to the device. For this reason, we strongly recommend that you secure the Signer app using your phone\u2019s biometrics."})]})}function d(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},9365:(e,t,r)=>{r.d(t,{A:()=>s});r(6540);var a=r(4164);const n={tabItem:"tabItem_Ymn6"};var o=r(4848);function s(e){let{children:t,hidden:r,className:s}=e;return(0,o.jsx)("div",{role:"tabpanel",className:(0,a.A)(n.tabItem,s),hidden:r,children:t})}},1470:(e,t,r)=>{r.d(t,{A:()=>x});var a=r(6540),n=r(4164),o=r(3104),s=r(6347),i=r(205),l=r(7485),u=r(1682),c=r(679);function d(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function h(e){const{values:t,children:r}=e;return(0,a.useMemo)((()=>{const e=t??function(e){return d(e).map((e=>{let{props:{value:t,label:r,attributes:a,default:n}}=e;return{value:t,label:r,attributes:a,default:n}}))}(r);return function(e){const t=(0,u.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,r])}function p(e){let{value:t,tabValues:r}=e;return r.some((e=>e.value===t))}function y(e){let{queryString:t=!1,groupId:r}=e;const n=(0,s.W6)(),o=function(e){let{queryString:t=!1,groupId:r}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!r)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return r??null}({queryString:t,groupId:r});return[(0,l.aZ)(o),(0,a.useCallback)((e=>{if(!o)return;const t=new URLSearchParams(n.location.search);t.set(o,e),n.replace({...n.location,search:t.toString()})}),[o,n])]}function f(e){const{defaultValue:t,queryString:r=!1,groupId:n}=e,o=h(e),[s,l]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:r}=e;if(0===r.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:r}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${r.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=r.find((e=>e.default))??r[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:o}))),[u,d]=y({queryString:r,groupId:n}),[f,m]=function(e){let{groupId:t}=e;const r=function(e){return e?`docusaurus.tab.${e}`:null}(t),[n,o]=(0,c.Dv)(r);return[n,(0,a.useCallback)((e=>{r&&o.set(e)}),[r,o])]}({groupId:n}),v=(()=>{const e=u??f;return p({value:e,tabValues:o})?e:null})();(0,i.A)((()=>{v&&l(v)}),[v]);return{selectedValue:s,selectValue:(0,a.useCallback)((e=>{if(!p({value:e,tabValues:o}))throw new Error(`Can't select invalid tab value=${e}`);l(e),d(e),m(e)}),[d,m,o]),tabValues:o}}var m=r(2303);const v={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=r(4848);function g(e){let{className:t,block:r,selectedValue:a,selectValue:s,tabValues:i}=e;const l=[],{blockElementScrollPositionUntilNextRender:u}=(0,o.a_)(),c=e=>{const t=e.currentTarget,r=l.indexOf(t),n=i[r].value;n!==a&&(u(t),s(n))},d=e=>{let t=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const r=l.indexOf(e.currentTarget)+1;t=l[r]??l[0];break}case"ArrowLeft":{const r=l.indexOf(e.currentTarget)-1;t=l[r]??l[l.length-1];break}}t?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,n.A)("tabs",{"tabs--block":r},t),children:i.map((e=>{let{value:t,label:r,attributes:o}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:a===t?0:-1,"aria-selected":a===t,ref:e=>l.push(e),onKeyDown:d,onClick:c,...o,className:(0,n.A)("tabs__item",v.tabItem,o?.className,{"tabs__item--active":a===t}),children:r??t},t)}))})}function w(e){let{lazy:t,children:r,selectedValue:o}=e;const s=(Array.isArray(r)?r:[r]).filter(Boolean);if(t){const e=s.find((e=>e.props.value===o));return e?(0,a.cloneElement)(e,{className:(0,n.A)("margin-top--md",e.props.className)}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:s.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==o})))})}function k(e){const t=f(e);return(0,b.jsxs)("div",{className:(0,n.A)("tabs-container",v.tabList),children:[(0,b.jsx)(g,{...t,...e}),(0,b.jsx)(w,{...t,...e})]})}function x(e){const t=(0,m.A)();return(0,b.jsx)(k,{...e,children:d(e.children)},String(t))}},8453:(e,t,r)=>{r.d(t,{R:()=>s,x:()=>i});var a=r(6540);const n={},o=a.createContext(n);function s(e){const t=a.useContext(o);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:s(e.components),a.createElement(o.Provider,{value:t},e.children)}}}]);