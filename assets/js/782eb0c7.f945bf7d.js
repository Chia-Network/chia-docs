"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[40],{7550:(e,i,n)=>{n.r(i),n.d(i,{assets:()=>o,contentTitle:()=>c,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>l});var s=n(5893),r=n(1151);const t={slug:"/guides/chialisp-currying",title:"Currying"},c=void 0,a={id:"guides/chialisp-concepts/currying",title:"Currying",description:"When you are writing puzzles in Chialisp you may want to have certain parameters decided before the coins are created. This is called currying. It allows puzzles to be reused but have different content and produce a different hash.",source:"@site/docs/guides/chialisp-concepts/currying.md",sourceDirName:"guides/chialisp-concepts",slug:"/guides/chialisp-currying",permalink:"/guides/chialisp-currying",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/guides/chialisp-concepts/currying.md",tags:[],version:"current",frontMatter:{slug:"/guides/chialisp-currying",title:"Currying"},sidebar:"guides",previous:{title:"Chialisp Concepts",permalink:"/guides/chialisp-concepts"},next:{title:"Inner Puzzles",permalink:"/guides/chialisp-inner-puzzles"}},o={},l=[{value:"Example",id:"example",level:2},{value:"Currying",id:"currying",level:3},{value:"Reuse",id:"reuse",level:3},{value:"Convention",id:"convention",level:2},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const i={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,r.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(i.p,{children:["When you are writing puzzles in Chialisp you may want to have certain parameters decided before the coins are created. This is called ",(0,s.jsx)(i.strong,{children:"currying"}),". It allows puzzles to be reused but have different content and produce a different hash."]}),"\n",(0,s.jsxs)(i.p,{children:["An example of this is the standard transaction puzzle. One of its parameters is the ",(0,s.jsx)(i.code,{children:"SYNTHETIC_PUBLIC_KEY"}),", which is unique for each address in your wallet. It represents a synthetic child key of your root public key. As such, the puzzle has to be changed for every address. This would be tedious to do without currying, since it allows the original puzzle (also known as the mod) to be used as a template."]}),"\n",(0,s.jsx)(i.h2,{id:"example",children:"Example"}),"\n",(0,s.jsx)(i.p,{children:"We're going to write a simple example to try currying on the command line."}),"\n",(0,s.jsxs)(i.p,{children:["Write this in a file named ",(0,s.jsx)(i.code,{children:"multiply.clsp"}),":"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-chialisp",metastring:'title="multiply.clsp"',children:"(mod (first second)\n    (* first second)\n)\n"})}),"\n",(0,s.jsx)(i.h3,{id:"currying",children:"Currying"}),"\n",(0,s.jsxs)(i.p,{children:["Now, we are going to make an instance of this program that will set the value of the parameter ",(0,s.jsx)(i.code,{children:"first"})," to ",(0,s.jsx)(i.code,{children:"2"}),". This will effectively turn this program from a multiplier to a doubler."]}),"\n",(0,s.jsx)(i.p,{children:"You can curry it like this:"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-bash",children:"cdv clsp curry multiply.clsp -a 2\n"})}),"\n",(0,s.jsx)(i.p,{children:"Which should produce the following curried result:"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-chialisp",children:"(a (q 18 2 5) (c (q . 2) 1))\n"})}),"\n",(0,s.jsx)(i.admonition,{type:"info",children:(0,s.jsx)(i.p,{children:"This is no longer in Chialisp form, but rather has been compiled to CLVM. You don't need to understand how this works or be able to read it, but only be aware that it does what was mentioned before."})}),"\n",(0,s.jsx)(i.p,{children:"You can now run this curried CLVM, and include the value to be doubled as the second parameter, like so:"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-bash",children:'brun "(a (q 18 2 5) (c (q . 2) 1))" "(5)"\n'})}),"\n",(0,s.jsxs)(i.p,{children:["It should output twice the value of ",(0,s.jsx)(i.code,{children:"5"}),":"]}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-chialisp",children:"10\n"})}),"\n",(0,s.jsx)(i.h3,{id:"reuse",children:"Reuse"}),"\n",(0,s.jsx)(i.p,{children:"The real use of currying comes from the fact that you can curry it again with a new value:"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-bash",children:"cdv clsp curry multiply.clsp -a 5\n"})}),"\n",(0,s.jsx)(i.p,{children:"Which should produce the following curried result:"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-chialisp",children:"(a (q 18 2 5) (c (q . 5) 1))\n"})}),"\n",(0,s.jsxs)(i.p,{children:["This will do the same thing as the previous curried program, except it will multiply by ",(0,s.jsx)(i.code,{children:"5"})," instead of by ",(0,s.jsx)(i.code,{children:"2"}),"."]}),"\n",(0,s.jsx)(i.h2,{id:"convention",children:"Convention"}),"\n",(0,s.jsxs)(i.p,{children:["In the previous example, we curried a value into a program, but the program did not declare that this was required. However, often times (especially with puzzles), you will be required to curry the value beforehand to use it properly. To indicate that a parameter is meant to be curried in, you write it in ",(0,s.jsx)(i.code,{children:"SCREAMING_SNAKE_CASE"}),"."]}),"\n",(0,s.jsx)(i.p,{children:"Let's rewrite the previous example with this convention:"}),"\n",(0,s.jsx)(i.pre,{children:(0,s.jsx)(i.code,{className:"language-chialisp",metastring:'title="multiply.clsp"',children:"(mod (FIRST second)\n    (* FIRST second)\n)\n"})}),"\n",(0,s.jsxs)(i.p,{children:["Writing parameters like this doesn't change anything in how they function, but rather how they are expected to be used. This convention makes it clear that you ",(0,s.jsx)(i.em,{children:"need"})," to specify the value of it before creating coins with it on-chain."]}),"\n",(0,s.jsx)(i.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,s.jsxs)(i.p,{children:["This is very useful for writing reusable and composable puzzles in Chialisp. It is also commonly used in tandem with ",(0,s.jsx)(i.a,{href:"/guides/chialisp-inner-puzzles",children:"inner puzzles"}),". However, currying can be a pretty confusing topic, so if you have any further questions, feel free to ask them on our ",(0,s.jsx)(i.a,{href:"https://discord.gg/chia",children:"Discord"}),"."]})]})}function h(e={}){const{wrapper:i}={...(0,r.a)(),...e.components};return i?(0,s.jsx)(i,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,i,n)=>{n.d(i,{Z:()=>a,a:()=>c});var s=n(7294);const r={},t=s.createContext(r);function c(e){const i=s.useContext(t);return s.useMemo((function(){return"function"==typeof e?e(i):{...i,...e}}),[i,e])}function a(e){let i;return i=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:c(e.components),s.createElement(t.Provider,{value:i},e.children)}}}]);