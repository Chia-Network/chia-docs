"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[6607],{5286:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>a,contentTitle:()=>r,default:()=>h,frontMatter:()=>o,metadata:()=>c,toc:()=>l});var i=n(5893),s=n(1151);const o={title:"CLVM vs EVM",slug:"/clvm-vs-evm"},r=void 0,c={id:"coin-set-model/clvm-vs-evm",title:"CLVM vs EVM",description:"We'll start with a brief description of CLVM. For details on the inner workings of CLVM, see our CLVM reference.",source:"@site/docs/coin-set-model/clvm-vs-evm.md",sourceDirName:"coin-set-model",slug:"/clvm-vs-evm",permalink:"/zh/clvm-vs-evm",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/coin-set-model/clvm-vs-evm.md",tags:[],version:"current",frontMatter:{title:"CLVM vs EVM",slug:"/clvm-vs-evm"},sidebar:"tutorialSidebar",previous:{title:"Coin Set vs Account Model",permalink:"/zh/coin-set-vs-account"},next:{title:"Architecture Overview",permalink:"/zh/architecture-overview"}},a={},l=[{value:"Comparison",id:"comparison",level:2}];function d(e){const t={a:"a",em:"em",h2:"h2",hr:"hr",li:"li",p:"p",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,s.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(t.p,{children:["We'll start with a brief description of CLVM. For details on the inner workings of CLVM, see our ",(0,i.jsx)(t.a,{href:"https://chialisp.com/clvm",title:"CLVM reference on chialisp.com",children:"CLVM reference"}),"."]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"CLVM is the compiled, minimal version of ChiaLisp that is used by the Chia network."}),"\n",(0,i.jsx)(t.li,{children:"CLVM is built out of cons boxes and atoms. Cons boxes contain two items, which can be either an atom or another cons box."}),"\n",(0,i.jsx)(t.li,{children:"All CLVM programs can be represented as a binary tree. Evaluation is similar to that of standard Lisp."}),"\n",(0,i.jsx)(t.li,{children:"CLVM uses a minimal operator set, most of which are a single letter."}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"comparison",children:"Comparison"}),"\n",(0,i.jsxs)(t.table,{children:[(0,i.jsx)(t.thead,{children:(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.th,{children:"Design decision"}),(0,i.jsx)(t.th,{children:"EVM (Solidity)"}),(0,i.jsx)(t.th,{children:"CLVM (Chialisp)"})]})}),(0,i.jsxs)(t.tbody,{children:[(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"The blockchain contains..."}),(0,i.jsx)(t.td,{children:"Smart contracts (compiled programs) as well as accounts."}),(0,i.jsx)(t.td,{children:"The root hash of a binary tree, not source code."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Money"}),(0,i.jsxs)(t.td,{children:["Smart contracts ",(0,i.jsx)(t.em,{children:"contain"})," money."]}),(0,i.jsxs)(t.td,{children:["Standard Chia coins don't ",(0,i.jsx)(t.em,{children:"contain"})," money. They ",(0,i.jsx)(t.em,{children:"are"})," money. That said, more complex functionality is possible, allowing coins to contain state, such as money."]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Determinism"}),(0,i.jsx)(t.td,{children:"Less deterministic because multiple people can execute code within the same contract. Depending on the order of execution, the result won't always be the same."}),(0,i.jsx)(t.td,{children:"More deterministic because coins can only be spent once. However, it's possible to have a coin that multiple people can spend, which would reduce determinism."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Centralization"}),(0,i.jsx)(t.td,{children:"Multiple people interact with the same contract. Centralized by design."}),(0,i.jsx)(t.td,{children:"Only the owner interacts with a smart coin. Decentralized by design."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Sandboxing"}),(0,i.jsx)(t.td,{children:"No sandboxing. If a contract is hacked, all users can lose their money."}),(0,i.jsx)(t.td,{children:"Strong sandboxing. Spending is the only action allowed on an unspent coin, and only by the owner(s). If a coin is hacked, only that coin's owner(s) lose(s) their money."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Composability"}),(0,i.jsxs)(t.td,{children:["Composition is supported, so it is possible to set rules temporarily governing how money may be spent. However, if money is moved outside of the contract, it will follow different rules.",(0,i.jsx)("br",{}),(0,i.jsx)("br",{})," (Note that it is possible to create a contract that \u201ctraps\u201d ETH inside of it by only allowing money to be sent from the contract to specific types of addresses. However, by definition this limits the functionality of that money to whatever is contained within the contract.)"]}),(0,i.jsxs)(t.td,{children:["Composition is handled through inner puzzles. A puzzle's creator could say, \u201cAs long as these rules are followed, an inner puzzle can add any functionality.\u201d Thus, it is possible to set rules that are intrinsic to the money itself, which must be followed ",(0,i.jsx)(t.em,{children:"forever"}),"."]})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"MEV"}),(0,i.jsx)(t.td,{children:"Changing transaction order is both profitable and common. MEV is high."}),(0,i.jsx)(t.td,{children:"Transactions all occur simultaneously in a block. MEV is low."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Reentrancy"}),(0,i.jsx)(t.td,{children:"Contracts can call functions on other contracts. Withdrawals can happen multiple times. Reentrancy is possible and must be carefully guarded against."}),(0,i.jsx)(t.td,{children:"Coins interact with each other through announcements. They cannot call functions on other coins. Spends are atomic. Reentrancy is not possible."})]}),(0,i.jsxs)(t.tr,{children:[(0,i.jsx)(t.td,{children:"Auditability/Security"}),(0,i.jsx)(t.td,{children:"Weak. Multiple points of failure. Numerous hacks prove this."}),(0,i.jsx)(t.td,{children:"Strong. If an attacker changes a coin's puzzle, the hash also changes. The attacker is thus attempting to spend a coin that does not exist. The attacker can modify the solution, but the programmer can counter this by using assertions, which will make any such modifications fail."})]})]})]}),"\n",(0,i.jsx)(t.hr,{}),"\n",(0,i.jsx)(t.p,{children:"We chose CLVM over EVM for the reasons outlined above, and especially because of these advantages:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:"Sandboxing \u2013 coins are independent from one another, providing for strong security"}),"\n",(0,i.jsx)(t.li,{children:"Composability \u2013 inner puzzles make it possible for coins to take on the functionality of other coins"}),"\n",(0,i.jsx)(t.li,{children:"Interoperability \u2013 all coins output a list of conditions, so they can inherently interoperate with one another, even if not explicitly designed to do so"}),"\n",(0,i.jsx)(t.li,{children:"No side effects - Auditing is easy; reentrancy is not possible"}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,s.a)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1151:(e,t,n)=>{n.d(t,{Z:()=>c,a:()=>r});var i=n(7294);const s={},o=i.createContext(s);function r(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);