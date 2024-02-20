"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[6478],{3677:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>s,default:()=>f,frontMatter:()=>t,metadata:()=>a,toc:()=>c});var o=i(5893),r=i(1151);const t={title:"Farming FAQ",slug:"/farming-faq"},s=void 0,a={id:"farming/farming-faq",title:"Farming FAQ",description:"How to tell if Chia Farming is Working?",source:"@site/docs/farming/farming-faq.md",sourceDirName:"farming",slug:"/farming-faq",permalink:"/farming-faq",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/farming/farming-faq.md",tags:[],version:"current",frontMatter:{title:"Farming FAQ",slug:"/farming-faq"},sidebar:"tutorialSidebar",previous:{title:"Dual Farming",permalink:"/farming/dual-farming-testnet-mainnet"},next:{title:"Overview",permalink:"/rpc"}},l={},c=[{value:"How to tell if Chia Farming is Working?",id:"how-to-tell-if-chia-farming-is-working",level:2},{value:"What is Normal Information in a Log File?",id:"what-is-normal-information-in-a-log-file",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",hr:"hr",p:"p",pre:"pre",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.h2,{id:"how-to-tell-if-chia-farming-is-working",children:"How to tell if Chia Farming is Working?"}),"\n",(0,o.jsx)(n.p,{children:"When you are first operating Chia and wondering if the software is working, here are some tips to keep you sane."}),"\n",(0,o.jsxs)(n.p,{children:["First off, you'll want to have your configuration set up to do additional logging. The configurations can be found in ",(0,o.jsx)(n.code,{children:"config.yaml"}),". This file is located in ",(0,o.jsx)(n.code,{children:"chia/mainnet/config.yaml"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["The location of the ",(0,o.jsx)(n.code,{children:".chia"})," folder varies, On windows you'll want to look in ",(0,o.jsx)(n.code,{children:"C:/Users/your username)/.chia/mainnet/config.yaml"}),". On Mac, this file is located in ",(0,o.jsx)(n.code,{children:"/Users/(your username)/.chia/mainnet/config/config.yaml"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["Shut down Chia before config access. Open ",(0,o.jsx)(n.code,{children:"config.yaml"})," and edit the first ",(0,o.jsx)(n.code,{children:"log_level"}),", setting it ",(0,o.jsx)(n.code,{children:"INFO"})," instead of ",(0,o.jsx)(n.code,{children:"WARNING"}),". Save the file."]}),"\n",(0,o.jsx)(n.p,{children:"Now, you can relaunch Chia. Give it 20 minutes to run."}),"\n",(0,o.jsxs)(n.p,{children:["Opening the log file while Chia is running, you'll see additional messages. You can find ",(0,o.jsx)(n.code,{children:"debug.log"})," in the ",(0,o.jsx)(n.code,{children:"log"})," directory right next to ",(0,o.jsx)(n.code,{children:"config"})," directory accessed earlier."]}),"\n",(0,o.jsx)(n.p,{children:"Log files are very informative. Once a log fills to 20mb another is created. If there are too many you can delete some of them."}),"\n",(0,o.jsx)(n.p,{children:"Inside what you are looking for are these lines:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{children:"_07:02:41.663 harvester src.harvester.harvester : INFO 1 plots were eligible for farming f53c496e80... Found 0 proofs. Time: 0.00500 s. Total 8 plots_\n"})}),"\n",(0,o.jsx)(n.p,{children:'This means Chia is working. The filter system is 2 parts. Chia found that 1 plot passed the first part, now it looks inside to determine if a pre-formulated "proof" will be able to do a transaction in the fastest time (2-3 seconds). If it secures one in your plot, you win. Many times it will say 0 proofs. But it shows it\'s working. This is where luck/time comes into play. At the end of that line it will indicate how many plots the software registers.'}),"\n",(0,o.jsx)(n.admonition,{type:"info",children:(0,o.jsxs)(n.p,{children:["Another way to ensure your farm is operational is checking against a pool. Consistent payouts from regulary partials sent gives you peace of mind. This is opposed to solo farming where you may need to wait days, weeks, or months for a win, the whole time wondering if it truly is set up right. Checkout ",(0,o.jsx)(n.a,{href:"/pool-farming",children:"pool-farming"}),"."]})}),"\n",(0,o.jsx)(n.h2,{id:"what-is-normal-information-in-a-log-file",children:"What is Normal Information in a Log File?"}),"\n",(0,o.jsx)(n.p,{children:"Below is a copy of normal information from a log file:"}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.em,{children:"9:32:00.322 full_node full_node_server : INFO <- new_signage_point_or_end_of_sub_slot from peer 68b376e5846696df3510822ea527d0899ac6183f261e8858119235cd24903720 193.91.103.92."}),"-"]}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.em,{children:"9:32:00.278 farmer farmer_server : INFO <- new_signage_point from peer 62d37909657e183dcd702b66d0e694474f907361f5981eceaba00878e84419c4 127.0.0.1."})}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.em,{children:"09:32:01.806 full_node full_node_server : INFO -> respond_peers to peer 202.185.44.200 e5b7f06ba6ece8698917e0e22971aef8602972de81efe379d693b2baa0dffc24."})}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.em,{children:"09:32:08.063 full_node full_node_server : INFO -> request_signage_point_or_end_of_sub_slot to peer 74.138.106.114 b567363c3a96c13366ef2dbff2e080da77f310875a8beda7c1c07246173c3a06."})}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.em,{children:"09:32:08.202 harvester harvester_server : INFO <- new_signage_point_harvester from peer 5bfd9af9bc76270cf76746255db9a435dca56b9adb37f5d1daec71e3c699c807 192.168.0.44."})}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.em,{children:"09:32:08.211 harvester src.harvester.harvester : INFO 0 plots were eligible for farming fec1fff66e... Found 0 proofs. Time: 0.00200 s. Total 8 plots."})}),"\n",(0,o.jsx)(n.hr,{}),"\n",(0,o.jsx)(n.p,{children:"The last line shows at that current time of 09:32:08.211 8 plots were farming and 0 plots were eligible. It still means the software recognized the plots and is farming."})]})}function f(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>s});var o=i(7294);const r={},t=o.createContext(r);function s(e){const n=o.useContext(t);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(t.Provider,{value:n},e.children)}}}]);