"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[5489],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),s=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return o.createElement(c.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(n),d=r,h=u["".concat(c,".").concat(d)]||u[d]||f[d]||a;return n?o.createElement(h,i(i({ref:t},p),{},{components:n})):o.createElement(h,i({ref:t},p))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8772:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return p},default:function(){return u}});var o=n(7462),r=n(3366),a=(n(7294),n(3905)),i=["components"],l={sidebar_position:2},c="5.2 Block format",s={unversionedId:"05block-validation/block_format",id:"05block-validation/block_format",isDocsHomePage:!1,title:"5.2 Block format",description:"Full Block",source:"@site/docs/05block-validation/block_format.md",sourceDirName:"05block-validation",slug:"/05block-validation/block_format",permalink:"/docs/05block-validation/block_format",editUrl:"https://github.com/Chia-Network/chia-docs/docs/05block-validation/block_format.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"5.1 Block Validation",permalink:"/docs/05block-validation/block-validation"},next:{title:"5.3 Block rewards",permalink:"/docs/05block-validation/block_rewards"}},p=[{value:"Full Block",id:"full-block",children:[]}],f={toc:p};function u(e){var t=e.components,n=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},f,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"52-block-format"},"5.2 Block format"),(0,a.kt)("h2",{id:"full-block"},"Full Block"),(0,a.kt)("p",null,"The full block is the data structure that contains all information required for validating and adding block ",(0,a.kt)("inlineCode",{parentName:"p"},"N"),", assuming all blocks up to ",(0,a.kt)("inlineCode",{parentName:"p"},"N - 1")," have already been added. FullBlocks are sent over the network protocol, and also sometimes stored\non disk for the purpose of serving other nodes in the future."),(0,a.kt)("p",null,"The FullBlock has fields for both the trunk and the foliage of the blockchain. The ",(0,a.kt)("inlineCode",{parentName:"p"},"header_hash"),", which is used as the block identifier, is the hash of the ",(0,a.kt)("inlineCode",{parentName:"p"},"foliage")," field in ",(0,a.kt)("a",{parentName:"p",href:"/docs/08serialization/serialization"},"streamable")," format. This commits to all relevant data and to all previous blocks."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"finished_sub_sots"),": List","[EndOfSubSlotBundle]",": This contains all sub-slots that have been completed since the previous block in the chain (block ",(0,a.kt)("inlineCode",{parentName:"li"},"N-1"),")."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"reward_chain_block"),": RewardChainBlock: This is trunk data for the reward chain and challenge chain, including vdf outputs and proof of space."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"challenge_chain_sp_proof"),": Optional","[VDFProof]",": Proof of the VDF for the challenge chain signage point, not provided for the first signage point, since that is and end of sub slot."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"challenge_chain_ip_proof")," VDFProof: VDF proof from the previous cc infusion, up the infusion point."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"reward_chain_sp_proof"),": Optional","[VDFProof]",": Proof of the VDF for the reward chain signage point, not provided for the first signage point, since that is and end of sub slot."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"reward_chain_ip_proof")," VDFProof: VDF proof from the previous rc infusion, up to the infusion point."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"infused_challenge_chain_ip_proof"),": Optional","[VDFProof]",": The ICC proof, only present if deficit < 16"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"foliage"),": Foliage: Foliage data for the reward chain block, the hash of this is the ",(0,a.kt)("inlineCode",{parentName:"li"},"header_hash"),"."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"foliage_transaction_block"),": Optional","[FoliageTransactionBlock]",": Transaction related metadata that is relevant for light clients (not actual transactions), only for tx blocks."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"transactions_info"),": Optional","[TransactionsInfo]",": Transaction related metadata that is not relevant for light clients (not actual transactions), only for tx blocks."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"transactions_generator"),": Optional","[SerializedProgram]",": A clvm program that generates all transactions (spends)."),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"transactions_generator_ref_list"),": List","[uint32]",": A list of block heights of previous generators referenced by this block's generator.")),(0,a.kt)("p",null,"// TODO: include sub objects as well"))}u.isMDXComponent=!0}}]);