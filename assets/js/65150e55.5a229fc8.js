"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[9631],{8329:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>c,default:()=>d,frontMatter:()=>s,metadata:()=>r,toc:()=>h});var t=i(5893),o=i(1151);const s={slug:"/guides/chialisp-condition-morphing",title:"Condition Morphing"},c=void 0,r={id:"guides/chialisp-concepts/condition-morphing",title:"Condition Morphing",description:"You've seen how you can use inner puzzles to output conditions and append them to the output of the outer puzzle. However, sometimes you want to change the output of the inner puzzle to enforce certain rules. This is called condition morphing.",source:"@site/docs/guides/chialisp-concepts/condition-morphing.md",sourceDirName:"guides/chialisp-concepts",slug:"/guides/chialisp-condition-morphing",permalink:"/guides/chialisp-condition-morphing",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/guides/chialisp-concepts/condition-morphing.md",tags:[],version:"current",frontMatter:{slug:"/guides/chialisp-condition-morphing",title:"Condition Morphing"},sidebar:"guides",previous:{title:"Inner Puzzles",permalink:"/guides/chialisp-inner-puzzles"},next:{title:"NFT Guide",permalink:"/guides/nft-developer-guide"}},l={},h=[{value:"Example",id:"example",level:2},{value:"Inner Puzzle",id:"inner-puzzle",level:3},{value:"Public Key",id:"public-key",level:3},{value:"Currying",id:"currying",level:3},{value:"Conclusion",id:"conclusion",level:2}];function a(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",strong:"strong",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:["You've seen how you can use inner puzzles to output conditions and append them to the output of the outer puzzle. However, sometimes you want to change the output of the inner puzzle to enforce certain rules. This is called ",(0,t.jsx)(n.strong,{children:"condition morphing"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"An example of this is the singleton - every coin that its inner puzzle creates which has an odd output, is turned into an inner puzzle of itself. It changes the puzzle in the condition to the singleton with the original puzzle as its new inner puzzle. This can be a bit confusing to think about, but it allows for many things such as keeping track of state."}),"\n",(0,t.jsx)(n.h2,{id:"example",children:"Example"}),"\n",(0,t.jsx)(n.p,{children:"Let's try a simpler example of condition morphing that doubles the amount of created coins."}),"\n",(0,t.jsxs)(n.p,{children:["Write the following in a file named ",(0,t.jsx)(n.code,{children:"coin-doubler.clsp"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",metastring:'title="coin-double.clsp"',children:"; Using the dot here means that the inner solution is the rest of the parameters. This avoids the need to nest parentheses.\n(mod (INNER_PUZZLE . inner_solution)\n\n    ; Doubles the amount of CREATE_COIN conditions.\n    (defun morph-condition (condition)\n\n        ; Checks if the opcode is 51, which is CREATE_COIN.\n        (if (= (f condition) 51)\n\n            ; Create a new condition similar to the original.\n            (list\n                ; It's still the same opcode.\n                51\n\n                ; The second value, the puzzle hash, is also the same.\n                (f (r condition))\n\n                ; The third value, the amount, is doubled.\n                (* (f (r (r condition))) 2)\n            )\n\n            ; If it's not the right opcode, leave it untouched.\n            condition\n        )\n    )\n\n    ; Goes through every condition and morphs it.\n    (defun morph-conditions (conditions)\n\n        ; If there are conditions left in the list.\n        (if (l conditions)\n            (c\n                ; Morph the first condition.\n                (morph-condition (f conditions))\n\n                ; Then morph the rest and form a list.\n                (morph-conditions (r conditions))\n            )\n\n            ; Otherwise, the output has ended.\n            ()\n        )\n    )\n\n    ; Morph the conditions output from the inner puzzle.\n    (morph-conditions (a INNER_PUZZLE inner_solution))\n)\n"})}),"\n",(0,t.jsx)(n.p,{children:"Make sure you read the comments and understand it fully before continuing."}),"\n",(0,t.jsx)(n.h3,{id:"inner-puzzle",children:"Inner Puzzle"}),"\n",(0,t.jsx)(n.p,{children:"Now we need an inner puzzle to morph the conditions of."}),"\n",(0,t.jsxs)(n.p,{children:["Write the following in a file named ",(0,t.jsx)(n.code,{children:"any-with-signature.clsp"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",metastring:'title="any-with-signature.clsp"',children:"(mod (PUBLIC_KEY conditions)\n    (include condition_codes.clib)\n    (include sha256tree.clib)\n\n    (c\n        (list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions))\n        conditions\n    )\n)\n"})}),"\n",(0,t.jsx)(n.p,{children:"Retrieve the libraries used in this example:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cdv clsp retrieve condition_codes sha256tree\n"})}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsxs)(n.p,{children:["Similarly to ",(0,t.jsx)(n.a,{href:"/guides/chialisp-inner-puzzles#inner-puzzle",children:"the example in the Inner Puzzles guide"}),", this allows the spender to pick any conditions. However, it also requires a signature. It's essentially the inner and outer puzzle from that example combined."]})}),"\n",(0,t.jsx)(n.h3,{id:"public-key",children:"Public Key"}),"\n",(0,t.jsxs)(n.p,{children:["You can refer to the ",(0,t.jsx)(n.a,{href:"/guides/chialisp-bls-signatures",children:"signature guide"})," to learn about key pairs and how to use your wallet to sign messages. We will be using similar steps here to get the derived public key."]}),"\n",(0,t.jsx)(n.p,{children:"Run this to get the derived public key:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'chia keys derive child-key --derive-from-hd-path "m/12381/8444/2/0"\n'})}),"\n",(0,t.jsx)(n.p,{children:"You will use this public key in the next step."}),"\n",(0,t.jsx)(n.h3,{id:"currying",children:"Currying"}),"\n",(0,t.jsx)(n.p,{children:"Now, we will wrap this inner puzzle in the outer puzzle we wrote previously. This will require the spend to be signed by a given key, and any coins created will have double the amount."}),"\n",(0,t.jsx)(n.p,{children:"First, run this command to get the compiled form of the inner puzzle:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"run -i include any-with-signature.clsp\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Yes, the output is just ",(0,t.jsx)(n.code,{children:"2"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"You can run this command to curry in the public key previously calculated and the inner puzzle:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'cdv clsp curry coin-doubler.clsp -a "0xPublicKey" -a 2\n'})}),"\n",(0,t.jsx)(n.p,{children:"That should produce an output similar to this:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"(a (q 2 (q 2 6 (c 2 (c (a 5 7) ()))) (c (q (a (i (= 9 (q . 51)) (q 4 (q . 51) (c 21 (c (* 45 (q . 2)) ()))) (q . 5)) 1) 2 (i (l 5) (q 4 (a 4 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) ()) 1) 1)) (c (q . 0xPublicKey) (c (q 2 (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) 1)))\n"})}),"\n",(0,t.jsx)(n.p,{children:"Now the inner puzzle and outer puzzle have been combined together."}),"\n",(0,t.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,t.jsxs)(n.p,{children:["This combined puzzle would allow you to spend coins created with it with your public key, but any create coin conditions would have their amounts doubled in the output. Feel free to ask questions you may have on our ",(0,t.jsx)(n.a,{href:"https://discord.gg/chia",children:"Discord"}),"."]})]})}function d(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(a,{...e})}):a(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>r,a:()=>c});var t=i(7294);const o={},s=t.createContext(o);function c(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:c(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);