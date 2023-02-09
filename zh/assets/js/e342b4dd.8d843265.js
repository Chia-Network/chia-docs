"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[7974],{3905:(e,a,n)=>{n.d(a,{Zo:()=>r,kt:()=>h});var t=n(7294);function f(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}function i(e,a){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);a&&(t=t.filter((function(a){return Object.getOwnPropertyDescriptor(e,a).enumerable}))),n.push.apply(n,t)}return n}function s(e){for(var a=1;a<arguments.length;a++){var n=null!=arguments[a]?arguments[a]:{};a%2?i(Object(n),!0).forEach((function(a){f(e,a,n[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(n,a))}))}return e}function o(e,a){if(null==e)return{};var n,t,f=function(e,a){if(null==e)return{};var n,t,f={},i=Object.keys(e);for(t=0;t<i.length;t++)n=i[t],a.indexOf(n)>=0||(f[n]=e[n]);return f}(e,a);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(t=0;t<i.length;t++)n=i[t],a.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(f[n]=e[n])}return f}var c=t.createContext({}),l=function(e){var a=t.useContext(c),n=a;return e&&(n="function"==typeof e?e(a):s(s({},a),e)),n},r=function(e){var a=l(e.components);return t.createElement(c.Provider,{value:a},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var a=e.children;return t.createElement(t.Fragment,{},a)}},u=t.forwardRef((function(e,a){var n=e.components,f=e.mdxType,i=e.originalType,c=e.parentName,r=o(e,["components","mdxType","originalType","parentName"]),d=l(n),u=f,h=d["".concat(c,".").concat(u)]||d[u]||p[u]||i;return n?t.createElement(h,s(s({ref:a},r),{},{components:n})):t.createElement(h,s({ref:a},r))}));function h(e,a){var n=arguments,f=a&&a.mdxType;if("string"==typeof e||f){var i=n.length,s=new Array(i);s[0]=u;var o={};for(var c in a)hasOwnProperty.call(a,c)&&(o[c]=a[c]);o.originalType=e,o[d]="string"==typeof e?e:f,s[1]=o;for(var l=2;l<i;l++)s[l]=n[l];return t.createElement.apply(null,s)}return t.createElement.apply(null,n)}u.displayName="MDXCreateElement"},5132:(e,a,n)=>{n.r(a),n.d(a,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>o,toc:()=>l});var t=n(7462),f=(n(7294),n(3905));const i={slug:"/guides/crash-course/signatures",title:"Signatures"},s=void 0,o={unversionedId:"guides/crash-course/signatures",id:"guides/crash-course/signatures",title:"Signatures",description:"In the previous lesson we created our first coin and spent it. This was fun and a good exercise, but had some security problems. Specifically, we used a hashed password. This is very limited because once you spend that coin, your provided solution is revealed and your password can no longer be used securely for anything in the future.",source:"@site/docs/guides/crash-course/signatures.md",sourceDirName:"guides/crash-course",slug:"/guides/crash-course/signatures",permalink:"/zh/guides/crash-course/signatures",draft:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/guides/crash-course/signatures.md",tags:[],version:"current",frontMatter:{slug:"/guides/crash-course/signatures",title:"Signatures"}},c={},l=[{value:"Intro to Keys",id:"intro-to-keys",level:2},{value:"Intro to Signatures",id:"intro-to-signatures",level:2},{value:"Verifying signatures in Chialisp",id:"verifying-signatures-in-chialisp",level:2},{value:"Practice",id:"practice",level:2},{value:"Spending the coin",id:"spending-the-coin",level:2},{value:"Build a Solution",id:"build-a-solution",level:2},{value:"Signing a Message",id:"signing-a-message",level:2},{value:"Get Coin Id",id:"get-coin-id",level:2}],r={toc:l},d="wrapper";function p(e){let{components:a,...n}=e;return(0,f.kt)(d,(0,t.Z)({},r,n,{components:a,mdxType:"MDXLayout"}),(0,f.kt)("p",null,"In the previous lesson we created our first coin and spent it. This was fun and a good exercise, but had some security problems. Specifically, we used a hashed password. This is very limited because once you spend that coin, your provided solution is revealed and your password can no longer be used securely for anything in the future."),(0,f.kt)("p",null,"Additionally, when you submit your spend to the network, a full node can view the solution (including the password), allowing a bad player to spend the coin themselves."),(0,f.kt)("p",null,"The solution to this is to use signatures. But, before we introduce signatures, let's go over a quick introduction of public and private keys."),(0,f.kt)("h2",{id:"intro-to-keys"},"Intro to Keys"),(0,f.kt)("p",null,"When you create a Chia wallet you are given 24 words that you should keep secure and private. These words are used to generate a master private key. A master private key can be used to derive multiple child keys, all accessed and controlled from your 24 words (in other words, 24 words = full access to your wallet)."),(0,f.kt)("p",null,"With each private key there is an associated public key, which can be shared without revealing your private key."),(0,f.kt)("p",null,"You can retrieve your key info using:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"chia keys show\n")),(0,f.kt)("p",null,"This will give you your ",(0,f.kt)("inlineCode",{parentName:"p"},"master public key"),", while keeping your seed phrase and private key hidden. Although rarely needed or recommended, you can see this info with the ",(0,f.kt)("inlineCode",{parentName:"p"},"--show-mnemonic-seed")," flag after ",(0,f.kt)("inlineCode",{parentName:"p"},"chia keys show"),"."),(0,f.kt)("p",null,"Having a public key that derives from a private key allows us to do interesting things. Specifically, we can sign a message using our private key which can be verified as authentic. Let's read about that more."),(0,f.kt)("h2",{id:"intro-to-signatures"},"Intro to Signatures"),(0,f.kt)("p",null,"If you wanted to send a message to someone but they wish to have the ability to verify the sender, you can use ",(0,f.kt)("strong",{parentName:"p"},"signatures"),"."),(0,f.kt)("p",null,"A digital signature allows you to use a private key to sign a message. This message can be verified by a recipient using your public key to verify the message comes from you."),(0,f.kt)("p",null,"To see this in action, let's sign a message with the master public key. Each key is labeled with a keypath from ",(0,f.kt)("inlineCode",{parentName:"p"},"chia keys sign"),", it resembles ",(0,f.kt)("inlineCode",{parentName:"p"},"m/12381/8444/0/0"),", or just ",(0,f.kt)("inlineCode",{parentName:"p"},"m")," for your master public key."),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},'chia keys sign --message "hello" --hd_path m\n')),(0,f.kt)("p",null,"This will then allow you to choose your wallet by fingerprint:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"Choose key:\n1) 1660000549\n")),(0,f.kt)("p",null,"Or, you can pass that in as an additional flag to ",(0,f.kt)("inlineCode",{parentName:"p"},"chia keys sign"),":"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},'chia keys sign --message "hello" --hd_path m --fingerprint 1660000549\n')),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"Public key: b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d\nSignature: 91c3d0504c2c5e02091f92cf0c3f79f2d7350656b0dc554dfc94f7e256b53d415e1a15108e329004ff1c5e91e24b445d18e52b2777e9a01a7a12d7f69a9df30c6fe3c196bdc5aa8072ea23d0edb6422253bb02d560bce721a459e6cf9e847aed\n")),(0,f.kt)("p",null,"The ",(0,f.kt)("inlineCode",{parentName:"p"},"Public key")," in this response should match the key shown in ",(0,f.kt)("inlineCode",{parentName:"p"},"chia keys show"),". The second part of this response is the ",(0,f.kt)("strong",{parentName:"p"},"signature"),"."),(0,f.kt)("p",null,"This signature will be passed along with the message ",(0,f.kt)("inlineCode",{parentName:"p"},"hello")," to whoever we want to see it. The signature can be used to verify the message against your public key without exposing your private key. To verify a message we need:"),(0,f.kt)("ol",null,(0,f.kt)("li",{parentName:"ol"},"The signature,"),(0,f.kt)("li",{parentName:"ol"},"the sender's public key,"),(0,f.kt)("li",{parentName:"ol"},"the message")),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"chia keys verify --message hello --signature 91c3d0504c2c5e02091f92cf0c3f79f2d7350656b0dc554dfc94f7e256b53d415e1a15108e329004ff1c5e91e24b445d18e52b2777e9a01a7a12d7f69a9df30c6fe3c196bdc5aa8072ea23d0edb6422253bb02d560bce721a459e6cf9e847aed --public_key b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d\n")),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-python"},"True\n")),(0,f.kt)("p",null,"In order for this concept to work, the public key must be known to be the public key of the original sender. When this is the case we can verify that the message came from the original source and that the message has not been altered."),(0,f.kt)("p",null,"If we change either of these two pieces of information, the signature is no longer valid. The signature only works with the message ",(0,f.kt)("inlineCode",{parentName:"p"},"hello")," and that specific public key."),(0,f.kt)("p",null,"Now, let's learn about the use of signatures in Chialisp."),(0,f.kt)("h2",{id:"verifying-signatures-in-chialisp"},"Verifying signatures in Chialisp"),(0,f.kt)("p",null,"One of the available conditions is ",(0,f.kt)("inlineCode",{parentName:"p"},"AGG_SIG_ME"),", which takes a public key and a message to sign."),(0,f.kt)("p",null,"The general syntax for this is ",(0,f.kt)("inlineCode",{parentName:"p"},"(50 public_key message)")),(0,f.kt)("p",null,"Take a look at this example:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-chialisp",metastring:"title='signature.clsp'",title:"'signature.clsp'"},"(mod (PUBLIC_KEY conditions)\n    (include condition_codes.clib)\n    (include sha256tree.clib)\n\n    (c\n        (list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions))\n        conditions\n    )\n)\n")),(0,f.kt)("p",null,"We will be introducing a few new things here. The first new thing introduced is ",(0,f.kt)("inlineCode",{parentName:"p"},"c"),", which will combine the new ",(0,f.kt)("inlineCode",{parentName:"p"},"AGG_SIG_ME")," condition with the conditions passed in as a solution."),(0,f.kt)("p",null,"The other new idea is an include, which allows us to use the names of conditions instead of the numbers."),(0,f.kt)("p",null,"To get these include files, issue the command:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"cdv clsp retrieve sha256tree condition_codes\n")),(0,f.kt)("p",null,"Let's now understand the basic signature requirement.\nThis code expects the public key to be curried, with our ",(0,f.kt)("inlineCode",{parentName:"p"},"AGG_SIG_ME")," condition being set up like so:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-chialisp"},"(list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions))\n")),(0,f.kt)("p",null,"The ",(0,f.kt)("inlineCode",{parentName:"p"},"message")," in this case is ",(0,f.kt)("inlineCode",{parentName:"p"},"Sha256tree conditions")," which takes the tree hash of our passed in conditions. We put anything in the message we do not want changed by the farmer. We will be using ",(0,f.kt)("inlineCode",{parentName:"p"},"sha256tree")," on the value because you cannot use a list. ",(0,f.kt)("inlineCode",{parentName:"p"},"sha256tree")," gets the tree hash of the conditions."),(0,f.kt)("p",null,"By having this as the message of ",(0,f.kt)("inlineCode",{parentName:"p"},"AGG_SIG_ME")," we will be able to prove that the conditions have not been modified (as we are verifying against the public key, similar to ",(0,f.kt)("inlineCode",{parentName:"p"},"chia keys verify"),")."),(0,f.kt)("h2",{id:"practice"},"Practice"),(0,f.kt)("p",null,"Let's go through creating this coin and spending it. As we go through this we will need to keep track of a lot of information. It may be helpful to open a text file to keep track."),(0,f.kt)("p",null,"First, let's get our public key:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"chia keys show\n")),(0,f.kt)("p",null,"The public key response may look like this:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"Master public key (m): b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d\n")),(0,f.kt)("p",null,"Now, curry in your public key ",(0,f.kt)("strong",{parentName:"p"},"prefixed with 0x")," (important). I'll use mine in this example, so be sure to update with the appropriate value!"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"cdv clsp curry signature.clsp -a 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d\n")),(0,f.kt)("p",null,"Response (reminder, yours will be different):"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-chialisp"},"(a (q 2 (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d) 1))\n")),(0,f.kt)("p",null,"Now, use your compiled code to get the serialized version of the code (the puzzle reveal) and the puzzle hash:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},'opc "(a (q 2 (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d) 1))"\n')),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"ff02ffff01ff02ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff0bff80808080ff80808080ff0b80ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954dff018080\n")),(0,f.kt)("p",null,"That is the puzzle reveal, now for the puzzle hash:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},'opc -H "(a (q 2 (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d) 1))"\n')),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"aa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216\n")),(0,f.kt)("p",null,"Now, using this puzzle hash we can encode an address:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"cdv encode --prefix txch aa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216\n")),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"txch14gxuvfmw2xdxqnws5agt3ma483wktd2lrzwvpj3f6jvdgkmf5gtq8g3aw3\n")),(0,f.kt)("p",null,"Great! Now you have all of the information to create your coin!"),(0,f.kt)("h1",{id:"create-a-coin"},"Create a Coin"),(0,f.kt)("p",null,"To create a coin we send a certain amount of chia to the address for this Chialisp. The ",(0,f.kt)("inlineCode",{parentName:"p"},"amount")," is up to you, the value used determines the value of this locked-up coin."),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"chia wallet send --amount 0.01 --fee 0.00005 --address txch14gxuvfmw2xdxqnws5agt3ma483wktd2lrzwvpj3f6jvdgkmf5gtq8g3aw3\n")),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"Transaction submitted to nodes: [{'peer_id': '67095d445d879556da95feeee70174c66b131d4f29bd447df5fbc56789a01f24', 'inclusion_status': 'SUCCESS', 'error_msg': None}]\nRun 'chia wallet get_transaction -f 1660000549 -tx 0x2bf4497e18147f2f857321829c557dfa4e92b7e1dd1a183e423fa1d6697c0a49' to get status\n")),(0,f.kt)("p",null,"Let's get that status:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"chia wallet get_transaction -f 1660000549 -tx 0x2bf4497e18147f2f857321829c557dfa4e92b7e1dd1a183e423fa1d6697c0a49\n")),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"Transaction 2bf4497e18147f2f857321829c557dfa4e92b7e1dd1a183e423fa1d6697c0a49\nStatus: In mempool\nAmount sent: 0.01 TXCH\nTo address: txch14gxuvfmw2xdxqnws5agt3ma483wktd2lrzwvpj3f6jvdgkmf5gtq8g3aw3\nCreated at: 2022-10-30 03:19:22\n")),(0,f.kt)("p",null,"Eventually, ",(0,f.kt)("inlineCode",{parentName:"p"},"Status: in mempool")," will change to ",(0,f.kt)("inlineCode",{parentName:"p"},"Status: Confirmed"),"."),(0,f.kt)("h2",{id:"spending-the-coin"},"Spending the coin"),(0,f.kt)("p",null,"Now that we created the coin we can start to craft a spend bundle. Build this outline in a ",(0,f.kt)("inlineCode",{parentName:"p"},"spendbundle.json")," file:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "coin_spends": [\n        {\n            "coin": {\n                "amount": 10000000000,\n                "parent_coin_info": "",\n                "puzzle_hash": ""\n            },\n            "puzzle_reveal": "",\n            "solution": ""\n        }\n    ],\n    "aggregated_signature": ""\n}\n')),(0,f.kt)("p",null,"Now, let's figure out the ",(0,f.kt)("inlineCode",{parentName:"p"},"coin"),", ",(0,f.kt)("inlineCode",{parentName:"p"},"puzzle_reveal")," (calculated earlier), ",(0,f.kt)("inlineCode",{parentName:"p"},"solution"),", and ",(0,f.kt)("inlineCode",{parentName:"p"},"aggregated_signature"),"."),(0,f.kt)("p",null,"Once this transaction is confirmed, we can retrieve the coin info needed to craft a spend bundle. To do this, we will need to use the puzzle hash we calculated earlier."),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"cdv rpc coinrecords --by puzzlehash aa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216\n")),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-json"},'[\n    {\n        "coin": {\n            "amount": 10000000000,\n            "parent_coin_info": "0x2ae27f44c228eeb9b16eb3f878c51e5bc468009eea79fce976e9d0a25b0e2b85",\n            "puzzle_hash": "0xaa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216"\n        },\n        "coinbase": false,\n        "confirmed_block_index": 321848,\n        "spent_block_index": 0,\n        "timestamp": 1667114401\n    }\n]\n')),(0,f.kt)("p",null,"You will only need the ",(0,f.kt)("inlineCode",{parentName:"p"},"coin")," object from this response."),(0,f.kt)("p",null,"Again, you can calculate the puzzle reveal with ",(0,f.kt)("inlineCode",{parentName:"p"},"opc"),":"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},'opc "(a (q 2 (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xb8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d) 1))"\n')),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"ff02ffff01ff02ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff0bff80808080ff80808080ff0b80ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954dff018080\n")),(0,f.kt)("p",null,"Now, let's take a moment to craft a solution."),(0,f.kt)("h2",{id:"build-a-solution"},"Build a Solution"),(0,f.kt)("p",null,"The solution for this puzzle requires us to provide a list of conditions. This is how we control what happens with the coin. We will continue to use ",(0,f.kt)("inlineCode",{parentName:"p"},"51 (CREATE_COIN)")," which requires a puzzle hash for where to send the coin."),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"chia wallet get_address\n")),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"txch1nmntlv7nwvkx37llrlxwjmazd2url7x9wdhw6fww4lj8edr4pafsh0y5l5\n")),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"cdv decode txch1nmntlv7nwvkx37llrlxwjmazd2url7x9wdhw6fww4lj8edr4pafsh0y5l5\n")),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"9ee6bfb3d3732c68fbff1fcce96fa26ab83ff8c5736eed25ceafe47cb4750f53\n")),(0,f.kt)("p",null,"Now, craft the complete solution, ",(0,f.kt)("strong",{parentName:"p"},"make sure to prefix with 0x for your puzzle hash (important)")),(0,f.kt)("h1",{id:"solution"},"Solution"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},'opc "(((51 0x9ee6bfb3d3732c68fbff1fcce96fa26ab83ff8c5736eed25ceafe47cb4750f53 9950000000)))"\n')),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"ffffff33ffa09ee6bfb3d3732c68fbff1fcce96fa26ab83ff8c5736eed25ceafe47cb4750f53ff85025110f380808080\n")),(0,f.kt)("p",null,"Now, the difference between the coin value and the value used in ",(0,f.kt)("inlineCode",{parentName:"p"},"CREATE_COIN")," goes to the farmer as a fee."),(0,f.kt)("h2",{id:"signing-a-message"},"Signing a Message"),(0,f.kt)("p",null,"The expected message for our signature is the tree hash of our conditions (from our chialisp code ",(0,f.kt)("inlineCode",{parentName:"p"},"(list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions))"),"). For this to work, we must first get the conditions tree hash."),(0,f.kt)("admonition",{type:"warning"},(0,f.kt)("p",{parentName:"admonition"},"We are not calculating the tree hash for the entire solution, just the ",(0,f.kt)("inlineCode",{parentName:"p"},"CREATE_COIN"),", so make sure you get the parenthesis right.")),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},'opc -H "((51 0x9ee6bfb3d3732c68fbff1fcce96fa26ab83ff8c5736eed25ceafe47cb4750f53 9950000000))"\n')),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"d96954e94653367e85bee3195b8a8f4a6470626e51ba10a96fc24d0e8bcdd7c1\n")),(0,f.kt)("p",null,"To sign the message we will actually need the ",(0,f.kt)("inlineCode",{parentName:"p"},"coin_id")," and the genesis challenge."),(0,f.kt)("admonition",{title:"Genesis Challenge?",type:"info"},(0,f.kt)("p",{parentName:"admonition"},(0,f.kt)("inlineCode",{parentName:"p"},"AGG_SIG_ME")," requires multiple pieces of information as to prevent reusable signatures. One of these things is the genesis challenge, which is a different value for every network. You will find this information from ",(0,f.kt)("inlineCode",{parentName:"p"},"chia show -s")," or in the ",(0,f.kt)("inlineCode",{parentName:"p"},"config.yaml")," file of your chia configuration."),(0,f.kt)("pre",{parentName:"admonition"},(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"less ~/.chia/mainnet/config/config.yaml\n")),(0,f.kt)("p",{parentName:"admonition"},"and then search for ",(0,f.kt)("inlineCode",{parentName:"p"},"genesis_challenge"),", picking the one for the appropriate network (such as testnet10). The value will be a hex string such as ",(0,f.kt)("inlineCode",{parentName:"p"},"ae83525ba8d1dd3f09b277de18ca3e43fc0af20d20c4b3e92ef2a48bd291ccb2")," (that is the value for testnet10).")),(0,f.kt)("h2",{id:"get-coin-id"},"Get Coin Id"),(0,f.kt)("p",null,"The coin ID is actually the hash of the parent coin info, the coin puzzle hash, and the amount."),(0,f.kt)("p",null,"One way to get the coin ID is to retrieve a coin through ",(0,f.kt)("inlineCode",{parentName:"p"},"cdv inspect"),". This will take the parent ID, your coin's puzzle hash, and the amount."),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"cdv inspect -id coins --parent-id 0x2ae27f44c228eeb9b16eb3f878c51e5bc468009eea79fce976e9d0a25b0e2b85 --puzzle-hash 0xaa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216 --amount 10000000000\n")),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"['43ab980558015de0d255b7eadf763feb9de22233bcdfde22b1c2823dfa2a53b5']\n")),(0,f.kt)("p",null,"Now, we can use our coin ID to craft a message."),(0,f.kt)("h1",{id:"concatenate-message"},"Concatenate Message"),(0,f.kt)("p",null,(0,f.kt)("inlineCode",{parentName:"p"},"AGG_SIG_ME")," expects the concatenation of the conditions tree hash, coin ID, and the genesis challenge."),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},'run "(concat 0xd96954e94653367e85bee3195b8a8f4a6470626e51ba10a96fc24d0e8bcdd7c1 0x43ab980558015de0d255b7eadf763feb9de22233bcdfde22b1c2823dfa2a53b5 0xd25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15)"\n')),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"0xd96954e94653367e85bee3195b8a8f4a6470626e51ba10a96fc24d0e8bcdd7c143ab980558015de0d255b7eadf763feb9de22233bcdfde22b1c2823dfa2a53b5d25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15\n")),(0,f.kt)("h1",{id:"sign-message"},"Sign Message"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"chia keys sign --as-bytes --message d96954e94653367e85bee3195b8a8f4a6470626e51ba10a96fc24d0e8bcdd7c143ab980558015de0d255b7eadf763feb9de22233bcdfde22b1c2823dfa2a53b5d25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15 --hd_path m\n")),(0,f.kt)("admonition",{type:"info"},(0,f.kt)("p",{parentName:"admonition"},"You will actually want to take the 0x off this time.")),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"Public key: b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954d\nSignature: a3994dc9c0ef41a903d3335f0afe42ba16c88e7881706798492da4a1653cd10c69c841eeb56f44ae005e2bad27fb7ebb16ce8bbfbd708ea91dd4ff24f030497b50e694a8270eccd07dbc206b8ffe0c34a9ea81291785299fae8206a1e1bbc1d1\n")),(0,f.kt)("h1",{id:"the-spend-bundle"},"The Spend Bundle"),(0,f.kt)("p",null,"Using the gathered info thus far, we can craft our spend bundle:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "coin_spends": [\n        {\n            "coin": {\n                "amount": 10000000000,\n                "parent_coin_info": "0x2ae27f44c228eeb9b16eb3f878c51e5bc468009eea79fce976e9d0a25b0e2b85",\n                "puzzle_hash": "0xaa0dc6276e519a604dd0a750b8efb53c5d65b55f189cc0ca29d498d45b69a216"\n            },\n            "puzzle_reveal": "ff02ffff01ff02ffff01ff04ffff04ff04ffff04ff05ffff04ffff02ff06ffff04ff02ffff04ff0bff80808080ff80808080ff0b80ffff04ffff01ff32ff02ffff03ffff07ff0580ffff01ff0bffff0102ffff02ff06ffff04ff02ffff04ff09ff80808080ffff02ff06ffff04ff02ffff04ff0dff8080808080ffff01ff0bffff0101ff058080ff0180ff018080ffff04ffff01b0b8f7dd239557ff8c49d338f89ac1a258a863fa52cd0a502e3aaae4b6738ba39ac8d982215aa3fa16bc5f8cb7e44b954dff018080",\n            "solution": "ffffff33ffa09ee6bfb3d3732c68fbff1fcce96fa26ab83ff8c5736eed25ceafe47cb4750f53ff85025110f380808080"\n        }\n    ],\n    "aggregated_signature": "a3994dc9c0ef41a903d3335f0afe42ba16c88e7881706798492da4a1653cd10c69c841eeb56f44ae005e2bad27fb7ebb16ce8bbfbd708ea91dd4ff24f030497b50e694a8270eccd07dbc206b8ffe0c34a9ea81291785299fae8206a1e1bbc1d1"\n}\n')),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-bash"},"cdv rpc pushtx spendbundle.json\n")),(0,f.kt)("p",null,"Response:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre",className:"language-json"},'{\n    "status": "SUCCESS",\n    "success": true\n}\n')),(0,f.kt)("p",null,"If you have an incorrect signature, you'll get a message like this:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"(\"{'error': 'Failed to include transaction \"\n '93247303fe92bf8c25459b912e5ea01bc13c5a59f876ad673e8455487a1056eb, error '\n \"BAD_AGGREGATE_SIGNATURE', 'success': False}\")\n")),(0,f.kt)("p",null,"If this is the case, you'll want to double check your signing message. You can also try the debug command:"),(0,f.kt)("pre",null,(0,f.kt)("code",{parentName:"pre"},"cdv inspect spendbundles spendbundle.json --debug\n")),(0,f.kt)("p",null,"Congratulations, you now have a working understanding of signatures!"))}p.isMDXComponent=!0}}]);