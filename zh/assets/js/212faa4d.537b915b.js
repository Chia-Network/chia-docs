"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[9805],{7936:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>a,toc:()=>l});var s=i(5893),t=i(1151);const r={slug:"/guides/crash-course/chialisp-and-typescript",title:"Chialisp and TypeScript"},o=void 0,a={id:"guides/crash-course/chialisp-and-typescript",title:"Chialisp and TypeScript",description:"So far we've been working with the Chia blockchain directly through the terminal using Chia Dev Tools the Chia command line interface.",source:"@site/docs/guides/crash-course/chialisp-and-typescript.md",sourceDirName:"guides/crash-course",slug:"/guides/crash-course/chialisp-and-typescript",permalink:"/zh/guides/crash-course/chialisp-and-typescript",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/guides/crash-course/chialisp-and-typescript.md",tags:[],version:"current",frontMatter:{slug:"/guides/crash-course/chialisp-and-typescript",title:"Chialisp and TypeScript"},sidebar:"guides",previous:{title:"CATs, Offers and NFTs",permalink:"/zh/guides/crash-course/cats-offers-nfts"},next:{title:"Chialisp Primer",permalink:"/zh/guides/chialisp-primer"}},c={},l=[{value:"RPC Explained",id:"rpc-explained",level:2},{value:"Language Choice",id:"language-choice",level:2},{value:"Quick Start",id:"quick-start",level:2},{value:"Full Node RPC",id:"full-node-rpc",level:3},{value:"BLS Signatures",id:"bls-signatures",level:3},{value:"Initializing a Project",id:"initializing-a-project",level:2},{value:"Other Dependencies",id:"other-dependencies",level:3},{value:"Mnemonic Phrase",id:"mnemonic-phrase",level:2},{value:"Dot Env",id:"dot-env",level:3},{value:"Imports",id:"imports",level:3},{value:"Loading Chialisp Files",id:"loading-chialisp-files",level:2},{value:"Currying the Key",id:"currying-the-key",level:2},{value:"Setting up the Wallet",id:"setting-up-the-wallet",level:2},{value:"Creating the Coin",id:"creating-the-coin",level:2},{value:"Retrieve the Coin Record",id:"retrieve-the-coin-record",level:2},{value:"Crafting a Solution",id:"crafting-a-solution",level:2},{value:"Calculate the Signature",id:"calculate-the-signature",level:2},{value:"Spend the Coin",id:"spend-the-coin",level:2},{value:"What Next",id:"what-next",level:2}];function d(e){const n={a:"a",admonition:"admonition",br:"br",code:"code",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.a)(),...e.components},{Details:i}=n;return i||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.p,{children:"So far we've been working with the Chia blockchain directly through the terminal using Chia Dev Tools the Chia command line interface.\nThis is handy but sometimes you may want to write code around Chia to work with the Chia blockchain. You may hear this referred to as driver code."}),"\n",(0,s.jsx)(n.h2,{id:"rpc-explained",children:"RPC Explained"}),"\n",(0,s.jsxs)(n.p,{children:["You can interact with the Chia blockchain through the RPC, which is ",(0,s.jsx)(n.a,{href:"https://docs.chia.net/rpc/",children:"documented"})," with sections on the full node, NFTs and more."]}),"\n",(0,s.jsx)(n.p,{children:"Because the RPC is accessible through web requests to localhost, you can build software using the Chia blockchain node. You can create all this code yourself or you can used wrappers that others have created."}),"\n",(0,s.jsx)(n.h2,{id:"language-choice",children:"Language Choice"}),"\n",(0,s.jsx)(n.p,{children:"You can do RPC calls with pretty much any language, but to create larger applications you will need packages for BLS signatures and CLVM. Currently, this is possible in JavaScript/TypeScript, Python, C++, Rust, and Dart."}),"\n",(0,s.jsx)(n.h2,{id:"quick-start",children:"Quick Start"}),"\n",(0,s.jsx)(n.p,{children:"This guide is meant to be an example that will give you some basic experience. We will be using Node.js with TypeScript to create a signature enforced coin. We'll use multiple TypeScript libraries for this project, which are open source if you want to see the details on how they work."}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://npmjs.com/package/@rigidity/bls-signatures",children:"BLS Signatures"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://npmjs.com/package/@rigidity/clvm",children:"CLVM"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://npmjs.com/package/@rigidity/chia",children:"RPCs"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://npmjs.com/package/@rigidity/chia-wallet",children:"Wallet Helper"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://npmjs.com/package/dotenv",children:"DotEnv"})}),"\n",(0,s.jsx)(n.li,{children:(0,s.jsx)(n.a,{href:"https://npmjs.com/package/bip39",children:"BIP39"})}),"\n"]}),"\n",(0,s.jsx)(n.h3,{id:"full-node-rpc",children:"Full Node RPC"}),"\n",(0,s.jsxs)(n.p,{children:["You can interact with the Chia blockchain through the RPC, which is ",(0,s.jsx)(n.a,{href:"https://docs.chia.net/rpc/",children:"documented"})," with sections on the full node, NFTs and more."]}),"\n",(0,s.jsx)(n.p,{children:"Because the RPC is accessible through web requests to localhost, you can build software using the Chia blockchain node. You can create all this code yourself or you can used wrappers that others have created."}),"\n",(0,s.jsx)(n.p,{children:"The full node RPC allows us to fetch coin records, push transactions to the mempool, and many other important things when building applications on Chia."}),"\n",(0,s.jsx)(n.h3,{id:"bls-signatures",children:"BLS Signatures"}),"\n",(0,s.jsxs)(n.p,{children:["We've been using ",(0,s.jsx)(n.code,{children:"chia keys"})," to get our keys and sign the messages needed to spend coins on the Chia blockchain so far. We will now use the actual library used to implement this command directly, since we will be calculating it from code. Here is some terminology that will be helpful in understanding the related code."]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.strong,{children:"Mnemonic"})," - The 12 or 24 word phrase found with ",(0,s.jsx)(n.code,{children:"chia keys show --show-mnemonic-seed"}),".",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Seed"})," - An array of bytes used as entropy, derived from the mnemonic.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Private Key"})," - A private key (or secret key) is used for signing messages and should not be shared publicly.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Public Key"})," - A public key is used for verifying the authenticity of signatures and can be shared publicly.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Signature"})," - A value that corresponds to a given message proving that it has been signed by a specific key.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Aggregated Signature"})," - One or more signatures aggregated together. This can be used to verify multiple signatures simultaneously.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"Jacobian Point"})," - A point on the BLS 12-381 elliptic curve used to represent a public key or signature.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"G1Element"})," - A public key represented as a Jacobian point.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"G2Element"})," - A signature represented as a Jacobian point.",(0,s.jsx)(n.br,{}),"\n",(0,s.jsx)(n.strong,{children:"AugScemeMPL"})," - The signing scheme used by the Chia blockchain for aggregated signatures."]}),"\n",(0,s.jsx)(n.h2,{id:"initializing-a-project",children:"Initializing a Project"}),"\n",(0,s.jsxs)(n.p,{children:["You will first need ",(0,s.jsx)(n.code,{children:"npm"}),", which you can get by ",(0,s.jsx)(n.a,{href:"https://nodejs.org/en/download/",children:"downloading Node.js"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"Once you have that installed, enter this in the terminal inside of a folder for your project:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"npm init\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Go through the prompts, making sure to change the entry point as described below. This will initialize a ",(0,s.jsx)(n.code,{children:"package.json"})," where you can define your dependencies and scripts for the project."]}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsxs)(n.p,{children:["Set the entry point to ",(0,s.jsx)(n.code,{children:"dist/index.js"})," rather than ",(0,s.jsx)(n.code,{children:"index.js"})," since we will be compiling the code."]}),(0,s.jsxs)(n.p,{children:["If you forget to do this, you can set it later in ",(0,s.jsx)(n.code,{children:"package.json"})," in the ",(0,s.jsx)(n.code,{children:"main"})," field."]})]}),"\n",(0,s.jsx)(n.p,{children:"We will be using TypeScript, so issue this command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"npm install --save-dev typescript ts-node\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Now, add a ",(0,s.jsx)(n.code,{children:"tsconfig.json"})," file with this content:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",children:'{\n    "compilerOptions": {\n        "moduleResolution": "node",\n        "target": "ESNext",\n        "downlevelIteration": true,\n        "esModuleInterop": true,\n        "inlineSourceMap": true,\n        "declaration": true,\n        "noImplicitAny": true,\n        "noImplicitThis": true,\n        "noImplicitOverride": true,\n        "strict": true\n    },\n    "include": ["src"]\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["We will put all of our code inside of a ",(0,s.jsx)(n.code,{children:"src"})," folder, so add that folder now with an ",(0,s.jsx)(n.code,{children:"index.ts"})," file:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",metastring:'title="src/index.ts"',children:"console.log('Hello, Chia!');\n"})}),"\n",(0,s.jsxs)(n.p,{children:["To run this, we can add a ",(0,s.jsx)(n.code,{children:"start"})," script of ",(0,s.jsx)(n.code,{children:"ts-node src/index.ts"})," to our ",(0,s.jsx)(n.code,{children:"package.json"}),". Our file will look something like this:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-json",metastring:'title="package.json"',children:'{\n    "name": "tschia",\n    "version": "1.0.0",\n    "description": "",\n    "main": "dist/index.js",\n    "scripts": {\n        "start": "ts-node src/index.ts",\n        "test": "echo \\"Error: no test specified\\" && exit 1"\n    },\n    "author": "",\n    "license": "ISC",\n    "dependencies": {\n        "ts-node": "^10.9.1",\n        "typescript": "^4.9.3"\n    }\n}\n'})}),"\n",(0,s.jsx)(n.p,{children:"Now, you should be able to run the project from the terminal:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"npm run start\n"})}),"\n",(0,s.jsx)(n.h3,{id:"other-dependencies",children:"Other Dependencies"}),"\n",(0,s.jsx)(n.p,{children:"For this project we are going to need add a few more dependencies. You can install these all at once with:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"npm install @rigidity/bls-signatures @rigidity/clvm @rigidity/chia @rigidity/chia-wallet bip39 dotenv\n"})}),"\n",(0,s.jsx)(n.h2,{id:"mnemonic-phrase",children:"Mnemonic Phrase"}),"\n",(0,s.jsx)(n.p,{children:"As this code uses a custom wallet implementation instead of the Chia wallet RPC, we will need to keep track of the mnemonic ourselves. Here is an example mnemonic phrase:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"const mnemonic =\n    'nasty sunny kingdom popular turn core rifle river twenty edit sort pill rice claw hollow please wash inform cannon empower emotion caught salt close';\n"})}),"\n",(0,s.jsx)(n.h3,{id:"dot-env",children:"Dot Env"}),"\n",(0,s.jsx)(n.admonition,{type:"warning",children:(0,s.jsx)(n.p,{children:"This wallet is used as an example. You'll never want to share your wallet mnemonic with anyone!"})}),"\n",(0,s.jsxs)(n.p,{children:["You can securely save the mnemonic phrase in a ",(0,s.jsx)(n.code,{children:".env"})," file and load it in your program:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-text",metastring:'title=".env"',children:"MNEMONIC=nasty sunny kingdom popular turn core rifle river twenty edit sort pill rice claw hollow please wash inform cannon empower emotion caught salt close\n"})}),"\n",(0,s.jsx)(n.p,{children:"This value can be retrieved with:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"chia keys show --show-mnemonic-seed\n"})}),"\n",(0,s.jsx)(n.p,{children:"This is how you load the file for later:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",metastring:'title="index.ts"',children:"import dotenv from 'dotenv';\n\ndotenv.config();\n"})}),"\n",(0,s.jsxs)(n.p,{children:["If you use Git, you'll want to make sure the ",(0,s.jsx)(n.code,{children:".env"})," file is added to the ",(0,s.jsx)(n.code,{children:".gitignore"})," so this is not checked in to a shared repository."]}),"\n",(0,s.jsx)(n.h3,{id:"imports",children:"Imports"}),"\n",(0,s.jsx)(n.p,{children:"To not have to mention imports throughout the doc, Our imports will ultimately look like:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ts",children:"import {\n    PrivateKey,\n    fromHex,\n    AugSchemeMPL,\n    concatBytes,\n} from '@rigidity/bls-signatures';\nimport { mnemonicToSeedSync } from 'bip39';\nimport dotenv from 'dotenv';\nimport { Program } from '@rigidity/clvm';\nimport fs from 'fs';\nimport path from 'path';\nimport { FullNode, formatHex, SpendBundle, toCoinId } from '@rigidity/chia';\nimport { KeyStore, StandardWallet } from '@rigidity/chia-wallet';\nimport os from 'os';\n"})}),"\n",(0,s.jsx)(n.h2,{id:"loading-chialisp-files",children:"Loading Chialisp Files"}),"\n",(0,s.jsxs)(n.p,{children:["Now that we have the mnemonic phrase, we will create a Chialisp file named ",(0,s.jsx)(n.code,{children:"signature.clsp"})," to be used for this example:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-chialisp",metastring:'title="signature.clsp"',children:"(mod (PUBLIC_KEY conditions)\n    (include condition_codes.clib)\n    (include sha256tree.clib)\n\n    (c\n        (list AGG_SIG_ME PUBLIC_KEY (sha256tree conditions))\n        conditions\n    )\n)\n"})}),"\n",(0,s.jsx)(n.p,{children:"This is a refresher of the content on signatures. This will require a signature from the spender with a message that includes the tree hash of the condition to be used."}),"\n",(0,s.jsx)(n.p,{children:"Here is how we can read chialisp. First, we get some dependencies and build the chialisp code:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cdv clsp retrieve condition_codes sha256tree\ncdv clsp build signature.clsp\n"})}),"\n",(0,s.jsxs)(n.p,{children:["This will create a ",(0,s.jsx)(n.code,{children:"signature.clsp.hex"})," file that can be read in our code."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const program = Program.deserializeHex(\n    fs.readFileSync(path.join(__dirname, '..', 'signature.clsp.hex'), 'utf-8')\n);\n\nconsole.log(program.toString());\n"})}),"\n",(0,s.jsx)(n.p,{children:"Run this command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"npm run start\n"})}),"\n",(0,s.jsx)(n.p,{children:"Which should produce the following result:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-chialisp",children:"(a (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1))\n"})}),"\n",(0,s.jsx)(n.p,{children:"To be sure, we can check this with Chia Dev Tools:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"run signature.clsp -i include\n"})}),"\n",(0,s.jsx)(n.p,{children:"This is not complete as this is the puzzle with no curried values. We will want to curry the public key expected so not anyone can sign for this coin to be spent."}),"\n",(0,s.jsx)(n.h2,{id:"currying-the-key",children:"Currying the Key"}),"\n",(0,s.jsx)(n.p,{children:"Now that we have the program loaded, we can use the mnemonic we loaded to derive the keypair and curry the public key into the signature puzzle."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const mnemonic = process.env.MNEMONIC!;\nconst privateKey = PrivateKey.fromSeed(mnemonicToSeedSync(mnemonic));\nconst publicKey = privateKey.getG1();\nconst curried = program.curry([Program.fromJacobianPoint(publicKey)]);\n\nconsole.log(curried.toString());\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"tip",children:(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"privateKey.getG1()"})," is the equivalent of getting your ",(0,s.jsx)(n.strong,{children:"master public key"})," with ",(0,s.jsx)(n.code,{children:"chia keys show"}),"."]})}),"\n",(0,s.jsx)(n.p,{children:"Run this command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"npm run start\n"})}),"\n",(0,s.jsx)(n.p,{children:"To get the final curried puzzle:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-chialisp",children:"(a (q 2 (q 4 (c 4 (c 5 (c (a 6 (c 2 (c 11 ()))) ()))) 11) (c (q 50 2 (i (l 5) (q 11 (q . 2) (a 6 (c 2 (c 9 ()))) (a 6 (c 2 (c 13 ())))) (q 11 (q . 1) 5)) 1) 1)) (c (q . 0xa9d31f69a4337bd10aa8179cbede90af1cdfdfbd804c8f1bc7b69ced9f769ee4f9938a40dbed4242baafabf641adea2b) 1))\n"})}),"\n",(0,s.jsx)(n.h2,{id:"setting-up-the-wallet",children:"Setting up the Wallet"}),"\n",(0,s.jsxs)(n.p,{children:["We will need the network's genesis challenge, which we can add to ",(0,s.jsx)(n.code,{children:".env"})," on a new line:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-text",metastring:'title=".env"',children:"MNEMONIC=...\nGENESIS=d25b25b897564035695996922aa0f9ff9d611bd38cd2ecd0d2383a99a70dfc15\n"})}),"\n",(0,s.jsx)(n.p,{children:"You can retrieve your network's Genesis challenge in the terminal with:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"chia show -s\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Testnet10 has the genesis ",(0,s.jsx)(n.code,{children:"ae83525ba8d1dd3f09b277de18ca3e43fc0af20d20c4b3e92ef2a48bd291ccb2"}),". You can see this in ",(0,s.jsx)(n.code,{children:"~/.chia/mainnet/config/config.yaml"})," as well with:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"less ~/.chia/mainnet/config/config.yaml\n"})}),"\n",(0,s.jsx)(n.p,{children:"Now you can start the full node RPC client and wallet like this:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const node = new FullNode(os.homedir() + '/.chia/mainnet');\nconst keyStore = new KeyStore(privateKey);\n\nconst wallet = new StandardWallet(node, keyStore);\nconst genesis = fromHex(process.env.GENESIS!);\n"})}),"\n",(0,s.jsx)(n.h2,{id:"creating-the-coin",children:"Creating the Coin"}),"\n",(0,s.jsxs)(n.p,{children:["For creating a coin we will use ",(0,s.jsx)(n.code,{children:"async"})," and ",(0,s.jsx)(n.code,{children:"await"}),", so we define an ",(0,s.jsx)(n.code,{children:"async"})," function ",(0,s.jsx)(n.code,{children:"create"})," (call it whatever you want)."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"async function create() {\n    await wallet.sync({ unusedAddressCount: 10 });\n\n    const spend = wallet.createSpend();\n    spend.coin_spends = await wallet.send(curried.hash(), 0.01e12, 0.00005e12);\n    wallet.signSpend(spend, genesis);\n    console.log(await node.pushTx(spend));\n}\n\ncreate();\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"wallet.sync"})," method generates new child keys and corresponding addresses until there are a certain number of unused addresses available. This ensures that we have loaded all unspent coins that are available to us, which will be needed to create spends later on. This is what the Chia wallet does on startup, but since we are loading a wallet in this code, we need it to be synced every time we start the program."]})}),"\n",(0,s.jsxs)(n.p,{children:["We first create a new spend to create a coin with the puzzle hash of the curried in signature puzzle we created earlier. The amount is ",(0,s.jsx)(n.code,{children:"0.01"})," XCH and the fee is ",(0,s.jsx)(n.code,{children:"0.00005"})," XCH. Then, we can push the spend bundle into the mempool and the transaction should be successful."]}),"\n",(0,s.jsx)(n.p,{children:"Run this command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"npm run start\n"})}),"\n",(0,s.jsx)(n.p,{children:"Which should produce the following result:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"{ status: 'SUCCESS', success: true }\n"})}),"\n",(0,s.jsx)(n.admonition,{type:"note",children:(0,s.jsx)(n.p,{children:"Each time you run this code you will be spending more Chia. You should be using testnet and sending small amounts as you learn."})}),"\n",(0,s.jsxs)(n.p,{children:["When expecting a value in mojos, you can convert from Chia to mojos with ",(0,s.jsx)(n.code,{children:"e12"}),". So, ",(0,s.jsx)(n.code,{children:"0.01e12 Mojo"})," is the same as ",(0,s.jsx)(n.code,{children:"0.01 XCH"}),". This is because there are a trillion mojos in an XCH."]}),"\n",(0,s.jsx)(n.p,{children:"This code is roughly equivalent to:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cdv encode --prefix txch 0x9de4380ab079ec73720d75916990be23de3bfaa727ff52d6bc09d93d66be79da\nchia wallet send --amount 0.01 --fee 0.00005 --address txch14gxuvfmw2xdxqnws5agt3ma483wktd2lrzwvpj3f6jvdgkmf5gtq8g3aw3\n"})}),"\n",(0,s.jsx)(n.h2,{id:"retrieve-the-coin-record",children:"Retrieve the Coin Record"}),"\n",(0,s.jsx)(n.p,{children:"We will need to give adequate time for the coin go successfully go to the mempool and then for it to be included by a full node. Because of this, we will issue the creation code separate from the retrieval code."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"async function spend() {\n    await wallet.sync({ unusedAddressCount: 10 });\n\n    const coinRecords = await node.getCoinRecordsByPuzzleHash(\n        curried.hashHex()\n    );\n    if (!coinRecords.success) throw new Error(coinRecords.error);\n\n    const record = coinRecords.coin_records[0];\n\n    console.log(record);\n}\n\nspend();\n"})}),"\n",(0,s.jsx)(n.p,{children:"This will fetch the first coin record that matches our curried puzzle hash with the full node RPC. We will use this in the next step to spend the coin."}),"\n",(0,s.jsx)(n.p,{children:"Run this command to ensure that the coin record is there:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"npm run start\n"})}),"\n",(0,s.jsx)(n.h2,{id:"crafting-a-solution",children:"Crafting a Solution"}),"\n",(0,s.jsxs)(n.p,{children:["THe solution for this puzzle consists of a list of conditions. To write Chialisp within JavaScript we can use the ",(0,s.jsx)(n.code,{children:"Program.fromSource()"})," method.\nWe will use a ",(0,s.jsx)(n.code,{children:"51"})," (",(0,s.jsx)(n.code,{children:"CREATE_COIN"}),") condition delivering the value to our wallet puzzle hash."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"// Calculate an unused address we can send the value to.\nconst [targetIndex] = await wallet.findUnusedIndices(1, []);\nconst target = wallet.puzzleCache[targetIndex];\n\n// A fee of 0.00005 XCH.\nconst fee = 0.00005e12;\n\n// Create a coin on the target, leaving a fee to be sent to the farmer.\nconst conditions = Program.fromSource(\n    `((51 ${formatHex(target.hashHex())} ${record.coin.amount - fee}))`\n);\n\n// Create a solution from the conditions.\nconst solution = Program.fromSource(`(${conditions})`).serializeHex();\n"})}),"\n",(0,s.jsxs)(n.admonition,{type:"note",children:[(0,s.jsxs)(n.p,{children:["The ",(0,s.jsx)(n.code,{children:"Program.fromSource"})," method takes a string and converts it into a CLVM object, which allows it to be hashed or serialized as such. The reason we call it again on the conditions to make the solution is that we need to wrap it in a set of parenthesis to form a list."]}),(0,s.jsx)(n.p,{children:"Remember that the solution is a list of arguments, of which the first one is the list of conditions."})]}),"\n",(0,s.jsx)(n.h2,{id:"calculate-the-signature",children:"Calculate the Signature"}),"\n",(0,s.jsxs)(n.p,{children:["Reminder that the signature required for ",(0,s.jsx)(n.code,{children:"AGG_SIG_ME"})," is the message + coin ID + Genesis challenge."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const signature = AugSchemeMPL.sign(\n    privateKey,\n    concatBytes(conditions.hash(), toCoinId(record.coin), genesis)\n).toHex();\n"})}),"\n",(0,s.jsx)(n.h2,{id:"spend-the-coin",children:"Spend the Coin"}),"\n",(0,s.jsx)(n.p,{children:"Finally, we can put everything together in a spend bundle and push the transaction to the mempool."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"const spendBundle: SpendBundle = {\n    coin_spends: [\n        {\n            coin: record.coin,\n            puzzle_reveal: curried.serializeHex(),\n            solution: solution,\n        },\n    ],\n    aggregated_signature: signature,\n};\n\nconsole.log(await node.pushTx(spendBundle));\n"})}),"\n",(0,s.jsx)(n.p,{children:"Run this command:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"npm run start\n"})}),"\n",(0,s.jsx)(n.p,{children:"Which should produce the following result:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"{ status: 'SUCCESS', success: true }\n"})}),"\n",(0,s.jsxs)(i,{children:[(0,s.jsx)("summary",{children:"Complete Code"}),(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-typescript",children:"import {\n    PrivateKey,\n    fromHex,\n    AugSchemeMPL,\n    concatBytes,\n} from '@rigidity/bls-signatures';\nimport { mnemonicToSeedSync } from 'bip39';\nimport dotenv from 'dotenv';\nimport { Program } from '@rigidity/clvm';\nimport fs from 'fs';\nimport path from 'path';\nimport { FullNode, formatHex, SpendBundle, toCoinId } from '@rigidity/chia';\nimport { KeyStore, StandardWallet } from '@rigidity/chia-wallet';\nimport os from 'os';\n\ndotenv.config();\n\nconst program = Program.deserializeHex(\n    fs.readFileSync(path.join(__dirname, '..', 'signature.clsp.hex'), 'utf-8')\n);\n\nconsole.log(program.toString());\n\nconst mnemonic = process.env.MNEMONIC!;\nconst privateKey = PrivateKey.fromSeed(mnemonicToSeedSync(mnemonic));\nconst publicKey = privateKey.getG1();\nconst curried = program.curry([Program.fromJacobianPoint(publicKey)]);\nconsole.log(curried.toString());\n\nconst node = new FullNode(os.homedir() + '/.chia/mainnet');\nconst keyStore = new KeyStore(privateKey);\n\nconst wallet = new StandardWallet(node, keyStore);\n\nconst genesis = fromHex(process.env.GENESIS!);\n\nasync function create() {\n    await wallet.sync({ unusedAddressCount: 10 });\n\n    const spend = wallet.createSpend();\n    spend.coin_spends = await wallet.send(curried.hash(), 0.01e12, 0.00005e12);\n    wallet.signSpend(spend, genesis);\n    console.log(await node.pushTx(spend));\n}\n\nasync function spend() {\n    await wallet.sync({ unusedAddressCount: 10 });\n\n    const coinRecords = await node.getCoinRecordsByPuzzleHash(\n        curried.hashHex()\n    );\n    if (!coinRecords.success) throw new Error(coinRecords.error);\n\n    const record = coinRecords.coin_records[0];\n\n    console.log(record);\n\n    const fee = 0.00005e12;\n\n    const [targetIndex] = await wallet.findUnusedIndices(1, []);\n    const target = wallet.puzzleCache[targetIndex];\n\n    const conditions = Program.fromSource(\n        `((51 ${formatHex(target.hashHex())} ${record.coin.amount - fee}))`\n    );\n\n    const solution = Program.fromSource(`(${conditions})`).serializeHex();\n\n    const signature = AugSchemeMPL.sign(\n        privateKey,\n        concatBytes(conditions.hash(), toCoinId(record.coin), genesis)\n    ).toHex();\n\n    const spendBundle: SpendBundle = {\n        coin_spends: [\n            {\n                coin: record.coin,\n                puzzle_reveal: curried.serializeHex(),\n                solution: solution,\n            },\n        ],\n        aggregated_signature: signature,\n    };\n\n    console.log(await node.pushTx(spendBundle));\n}\n\nspend();\n"})})]}),"\n",(0,s.jsx)(n.h2,{id:"what-next",children:"What Next"}),"\n",(0,s.jsx)(n.p,{children:"You have now put together what you have learned to build an actual program that can create and spend coins on the Chia blockchain using the puzzle written in an earlier lesson. This set of tools, in any language that supports them, is a powerful way to build decentralized applications."}),"\n",(0,s.jsx)(n.p,{children:"Here are a few examples of how you can expand on this:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Modify the puzzle and code to require two sets of signatures (either two mnemonics or by using two child keys from the key store)."}),"\n",(0,s.jsx)(n.li,{children:"Modify the puzzle to add an additional condition requiring the spend to happen at least 10 blocks after the coin is created."}),"\n",(0,s.jsx)(n.li,{children:"Modify the puzzle and code to require at least 2 of 3 signatures from the corresponding keys curried in (referred to as an M of N)."}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,t.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>o});var s=i(7294);const t={},r=s.createContext(t);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);