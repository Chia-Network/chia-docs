"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[3025],{7860:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>l,toc:()=>o});const l=JSON.parse('{"id":"guides/walletconnect/walletconnect-user-guide","title":"WalletConnect User Guide","description":"Intro","source":"@site/docs/guides/walletconnect/walletconnect-user-guide.md","sourceDirName":"guides/walletconnect","slug":"/walletconnect-user-guide","permalink":"/walletconnect-user-guide","draft":false,"unlisted":false,"editUrl":"https://github.com/Chia-Network/chia-docs/blob/main/docs/guides/walletconnect/walletconnect-user-guide.md","tags":[],"version":"current","frontMatter":{"slug":"/walletconnect-user-guide","title":"WalletConnect User Guide"},"sidebar":"guides","previous":{"title":"WalletConnect","permalink":"/guides/walletconnect"},"next":{"title":"WalletConnect Developer Guide","permalink":"/walletconnect-developer-guide"}}');var s=t(4848),i=t(8453);t(5537),t(9329);const a={slug:"/walletconnect-user-guide",title:"WalletConnect User Guide"},r=void 0,c={},o=[{value:"Intro",id:"intro",level:2},{value:"Install the sample dApp",id:"install-the-sample-dapp",level:2},{value:"Configure WalletConnect",id:"configure-walletconnect",level:2},{value:"Call dApp functions",id:"call-dapp-functions",level:2},{value:"Configure WalletConnect",id:"configure-walletconnect-1",level:2},{value:"FAQ",id:"faq",level:2},{value:"What is the main use case for WalletConnect?",id:"what-is-the-main-use-case-for-walletconnect",level:3},{value:"What WalletConnect functionality might be enabled in the future?",id:"what-walletconnect-functionality-might-be-enabled-in-the-future",level:3},{value:"What is the difference between WalletConnect and CHIP-2?",id:"what-is-the-difference-between-walletconnect-and-chip-2",level:3},{value:"How can WalletConnect connect to remote wallets?",id:"how-can-walletconnect-connect-to-remote-wallets",level:3}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",hr:"hr",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"intro",children:"Intro"}),"\n",(0,s.jsxs)(n.p,{children:["This guide will show you how to use ",(0,s.jsx)(n.a,{href:"https://walletconnect.network/",children:"WalletConnect"})," to connect a sample dApp to your Chia reference wallet."]}),"\n",(0,s.jsx)(n.admonition,{title:"a few notes",type:"note",children:(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Generally speaking, you only need to have a synced light wallet to use WalletConnect. A full node is not required. However, depending on your dApp, a full node may be required to run certain commands."}),"\n",(0,s.jsx)(n.li,{children:"WalletConnect is supported on every operating system supported by the Chia reference wallet, including Windows, Linux, and MacOS."}),"\n",(0,s.jsx)(n.li,{children:"WalletConnect is supported on Chia's testnet, as well as its mainnet."}),"\n",(0,s.jsx)(n.li,{children:"This guide will use Chia's reference wallet, but WalletConnect integration for other wallets will eventually be supported as well."}),"\n"]})}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"install-the-sample-dapp",children:"Install the sample dApp"}),"\n",(0,s.jsx)(n.p,{children:"In order to help you get started with WalletConnect, we have created a sample dApp to run Chia wallet RPCs.\nIn this section, we'll install and run the dApp locally. We'll also obtain a link to connect the dApp to a Chia reference wallet."}),"\n",(0,s.jsxs)(n.p,{children:["If you would like to connect your Chia reference wallet to a different dApp, then feel free to skip ahead to the ",(0,s.jsx)(n.a,{href:"#configure-walletconnect",children:"next section"}),"."]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["Run this command to clone the sample dApp's ",(0,s.jsx)(n.a,{href:"https://github.com/Chia-Network/walletconnect-rpcs-dapp",children:"GitHub repo"}),":"]}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/Chia-Network/walletconnect-rpcs-dapp -b main\n"})}),"\n",(0,s.jsxs)(n.ol,{start:"2",children:["\n",(0,s.jsx)(n.li,{children:"Change to the sample dApp's directory:"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"cd walletconnect-rpcs-dapp\n"})}),"\n",(0,s.jsxs)(n.ol,{start:"3",children:["\n",(0,s.jsx)(n.li,{children:"Install the sample dApp using NPM:"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"npm install\n"})}),"\n",(0,s.jsxs)(n.ol,{start:"4",children:["\n",(0,s.jsx)(n.li,{children:"Start the sample dApp:"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"npm run dev\n"})}),"\n",(0,s.jsx)(n.p,{children:"Example result:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"\u279c  Local:   http://127.0.0.1:5173/\n  \u279c  Network: use --host to expose\n  \u279c  press h to show help\n"})}),"\n",(0,s.jsx)(n.p,{children:"In this example, the dApp was started locally on port 5173. This is the default port; your dApp may need to use a different port if 5173 is already being used for something else."}),"\n",(0,s.jsxs)(n.ol,{start:"5",children:["\n",(0,s.jsx)(n.li,{children:"Access the sample dApp:"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Open a browser and navigate to ",(0,s.jsx)(n.a,{href:"http://127.0.0.1:5173/",children:"http://127.0.0.1:5173/"})," (unless a different port was used)"]}),"\n",(0,s.jsx)(n.admonition,{type:"info",children:(0,s.jsxs)(n.p,{children:["If you see an error message such as ",(0,s.jsx)(n.code,{children:"An error as occurred"}),", the most likely cause is that you are running an ad blocker that is interfering with the dApp.\nEither disable the ad blocker or try a different browser."]})}),"\n",(0,s.jsxs)(n.ol,{start:"6",children:["\n",(0,s.jsxs)(n.li,{children:["The ",(0,s.jsx)(n.code,{children:"WalletConnect Example"})," screen should be displayed. Click ",(0,s.jsx)(n.code,{children:"Link Wallet"}),":"]}),"\n"]}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/01_dapp.png",alt:"Click Connect"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsxs)(n.ol,{start:"7",children:["\n",(0,s.jsx)(n.li,{children:'A QR code will be displayed. Click the "Copy" button:'}),"\n"]}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/02_dapp.png",alt:"Click Copy to clipboard"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.p,{children:"The link has been copied, so you are ready to set up WalletConnect in Chia's reference wallet. Keep this browser window open in case you need to copy the link again."}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"configure-walletconnect",children:"Configure WalletConnect"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.a,{href:"https://www.chia.net/downloads/",children:"Download and install"})," the latest version of Chia's reference wallet"]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsx)(n.p,{children:"Set up Chia's testnet"}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["While it's possible to use WalletConnect on Chia's mainnet, this example will use the testnet.\nThe primary command to convert your system to use the testnet is ",(0,s.jsx)(n.code,{children:"chia configure -t true"}),".\nSee our ",(0,s.jsx)(n.a,{href:"/guides/chialisp-testnet-setup",children:"testnet setup guide"})," for more info."]}),"\n",(0,s.jsx)(n.p,{children:"After your system has been configured to use the testnet, you can start your Chia reference wallet."}),"\n",(0,s.jsxs)(n.ol,{start:"3",children:["\n",(0,s.jsx)(n.li,{children:"Click the WalletConnect icon"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"The icon is located on the upper-right side of the reference wallet GUI, as shown here:"}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/01_walletconnect.png",alt:"Click the WalletConnect icon"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsxs)(n.ol,{start:"4",children:["\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.code,{children:"ENABLE WALLETCONNECT"})]}),"\n"]}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/02_walletconnect.png",alt:"Click ENABLE WALLETCONNECT"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsxs)(n.ol,{start:"5",children:["\n",(0,s.jsxs)(n.li,{children:["Click ",(0,s.jsx)(n.code,{children:"ADD CONNECTION"})]}),"\n"]}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/03_walletconnect.png",alt:"Click ADD CONNECTION"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsxs)(n.ol,{start:"6",children:["\n",(0,s.jsxs)(n.li,{children:["Paste the link to your sample dApp and click ",(0,s.jsx)(n.code,{children:"CONTINUE"})]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"If you used this guide to set up the sample dApp, this was the link you obtained with the last step of the previous section:"}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/03_dapp.png",alt:"Paste and click CONTINUE"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsxs)(n.ol,{start:"7",children:["\n",(0,s.jsxs)(n.li,{children:["By default, the wallet that is currently synced will be selected (in the red circle below). Click the ",(0,s.jsx)(n.code,{children:"Select Keys"})," dropdown if you want to connect other wallets, then click ",(0,s.jsx)(n.code,{children:"CONTINUE"}),":"]}),"\n"]}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/04_walletconnect.png",alt:"Select wallets and click CONTINUE"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsxs)(n.ol,{start:"8",children:["\n",(0,s.jsx)(n.li,{children:"Confirm your connection"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["You will be shown the key(s) to connect to the dApp. If this looks OK, click ",(0,s.jsx)(n.code,{children:"CLOSE"}),". To start over, click ",(0,s.jsx)(n.code,{children:"DISCONNECT"}),":"]}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/05_walletconnect.png",alt:"Click CLOSE"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsxs)(n.ol,{start:"9",children:["\n",(0,s.jsx)(n.li,{children:"Show more info"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["To show info on which dApp(s) are paired to which keys(s), click the WalletConnect icon, click the three dots, and click ",(0,s.jsx)(n.code,{children:"More Info"}),":"]}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/06_walletconnect.png",alt:"Click More Info"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.p,{children:"You will be shown the Pair Information for your dApp:"}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/07_walletconnect.png",alt:"Paired keys are showing"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.p,{children:"Your wallet has been successfully paired with the sample dApp. In the next section, we'll show you how to interact with your wallet from the dApp."}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"call-dapp-functions",children:"Call dApp functions"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"View the sample dApp in a web browser"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Recall that by default, the dApp will run on ",(0,s.jsx)(n.a,{href:"http://127.0.0.1:5173",children:"http://127.0.0.1:5173"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["You will be shown a dropdown list of available methods. The default method is ",(0,s.jsx)(n.code,{children:"chia_logIn"}),", but we'll call a different method for this example."]}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/04_dapp.png",alt:"Dropdown menu"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsxs)(n.ol,{start:"2",children:["\n",(0,s.jsxs)(n.li,{children:["Select ",(0,s.jsx)(n.code,{children:"chia_getNextAddress"}),":"]}),"\n"]}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/05_dapp.png",alt:"Run chia_getNextAddress"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsxs)(n.ol,{start:"3",children:["\n",(0,s.jsxs)(n.li,{children:["For this example, we will choose wallet ID ",(0,s.jsx)(n.code,{children:"1"})," (the XCH wallet), and select ",(0,s.jsx)(n.code,{children:"New Address"}),":"]}),"\n"]}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/06_dapp.png",alt:"Wallet ID 1"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsxs)(n.ol,{start:"4",children:["\n",(0,s.jsx)(n.li,{children:"Confirm the request"}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["Switch back to your Chia reference wallet. You should now see a confirmation dialog with the requested method. Click ",(0,s.jsx)(n.code,{children:"CONFIRM"}),":"]}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/08_walletconnect.png",alt:"Confirm request"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsxs)(n.ol,{start:"5",children:["\n",(0,s.jsx)(n.li,{children:"View the response"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"Returning to the sample dApp, a new dialog with the response will appear. In this example, a new address will be shown:"}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/07_dapp.png",alt:"Showing next address"})}),"\n",(0,s.jsx)("br",{}),"\n",(0,s.jsx)(n.p,{children:"You have now installed, configured, and used the sample dApp. Feel free to test the other functions, as well as create your own!"}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"configure-walletconnect-1",children:"Configure WalletConnect"}),"\n",(0,s.jsx)(n.p,{children:"By default, you can only run dApp methods against the wallet key that is currently synced.\nThis was not an issue in the above example because we only selected one public key to pair with the sample dApp.\nHowever, if you want your dApp to be able to interact with multiple keys, you will need to enable an additional setting in the reference wallet."}),"\n",(0,s.jsxs)(n.p,{children:["Click the gear icon in the lower left corner of the reference wallet, then click the ",(0,s.jsx)(n.code,{children:"INTEGRATION"})," tab. Two switches will appear at the top of this panel:"]}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Enable WalletConnect"})," -- This setting was activated when you enabled WalletConnect earlier in the guide."]}),"\n"]}),"\n",(0,s.jsxs)(n.li,{children:["\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"Key Switching"})," -- If you activate this setting, your dApp will be able to switch between multiple wallet keys. The selected wallet will need to sync whenever you switch between keys."]}),"\n",(0,s.jsx)("div",{style:{textAlign:"center"},children:(0,s.jsx)("img",{src:"/img/walletconnect/09_walletconnect.png",alt:"Allow requests that require switching keys"})}),"\n",(0,s.jsx)("br",{}),"\n"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:["To configure the commands that are provided to dApps, you can edit (locally) ",(0,s.jsx)(n.a,{href:"https://github.com/Chia-Network/chia-blockchain-gui/blob/main/packages/gui/src/constants/WalletConnectCommands.tsx",children:"chia-blockchain-gui/blob/main/packages/gui/src/constants/WalletConnectCommands.tsx"}),".\nThis file acts as a middle layer between the wallet and the dApp. It can also be used to control privacy settings."]}),"\n",(0,s.jsx)(n.hr,{}),"\n",(0,s.jsx)(n.h2,{id:"faq",children:"FAQ"}),"\n",(0,s.jsx)(n.h3,{id:"what-is-the-main-use-case-for-walletconnect",children:"What is the main use case for WalletConnect?"}),"\n",(0,s.jsx)(n.p,{children:"WalletConnect allows end users to connect their wallet to a dApp."}),"\n",(0,s.jsx)(n.h3,{id:"what-walletconnect-functionality-might-be-enabled-in-the-future",children:"What WalletConnect functionality might be enabled in the future?"}),"\n",(0,s.jsxs)(n.p,{children:["WalletConnect is currently supported in Chia's reference wallet.\nIt is also used in ",(0,s.jsx)(n.a,{href:"https://www.chiatcg.com",children:"Chia TCG"}),", a trading card game that uses Chia NFTs."]}),"\n",(0,s.jsx)(n.p,{children:"In the future, it could also be supported in other Chia wallets, as well as in other mobile- and web-based dApps. For example, mobile wallet providers will be able to integrate with WalletConnect to connect directly to dApp providers."}),"\n",(0,s.jsx)(n.p,{children:"WalletConnect will aslo be used for initiating signing requests from within a dApp. This will enable interactions with all types of assets on Chia, including XCH, CATs, and NFTs. It will aslo enable using Chia Offers."}),"\n",(0,s.jsx)(n.h3,{id:"what-is-the-difference-between-walletconnect-and-chip-2",children:"What is the difference between WalletConnect and CHIP-2?"}),"\n",(0,s.jsxs)(n.p,{children:["WalletConnect is generalized to allow any dApp to connect to any Chia wallet. ",(0,s.jsx)(n.a,{href:"https://github.com/Chia-Network/chips/blob/main/CHIPs/chip-0002.md",children:"CHIP-2"})," (dApp protocol) is specific to browser extensions."]}),"\n",(0,s.jsx)(n.h3,{id:"how-can-walletconnect-connect-to-remote-wallets",children:"How can WalletConnect connect to remote wallets?"}),"\n",(0,s.jsxs)(n.p,{children:["In the example from this tutorial, both the reference wallet and WalletConnect were running on ",(0,s.jsx)(n.code,{children:"localhost"}),"."]}),"\n",(0,s.jsx)(n.p,{children:"To connect to a mobile phone, you can scan the provided QR code. To connect to remote browser-based dapps, simply navigate to the remote URI from a web browser."}),"\n",(0,s.jsx)(n.p,{children:"Also note that all connections (local and remote) between wallets and dApps are end-to-end encrypted."})]})}function h(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},9329:(e,n,t)=>{t.d(n,{A:()=>a});t(6540);var l=t(4164);const s={tabItem:"tabItem_Ymn6"};var i=t(4848);function a(e){let{children:n,hidden:t,className:a}=e;return(0,i.jsx)("div",{role:"tabpanel",className:(0,l.A)(s.tabItem,a),hidden:t,children:n})}},5537:(e,n,t)=>{t.d(n,{A:()=>C});var l=t(6540),s=t(4164),i=t(5627),a=t(6347),r=t(372),c=t(604),o=t(1861),d=t(8749);function h(e){return l.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:n,children:t}=e;return(0,l.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:t,attributes:l,default:s}}=e;return{value:n,label:t,attributes:l,default:s}}))}(t);return function(e){const n=(0,o.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,t])}function p(e){let{value:n,tabValues:t}=e;return t.some((e=>e.value===n))}function w(e){let{queryString:n=!1,groupId:t}=e;const s=(0,a.W6)(),i=function(e){let{queryString:n=!1,groupId:t}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!t)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return t??null}({queryString:n,groupId:t});return[(0,c.aZ)(i),(0,l.useCallback)((e=>{if(!i)return;const n=new URLSearchParams(s.location.search);n.set(i,e),s.replace({...s.location,search:n.toString()})}),[i,s])]}function x(e){const{defaultValue:n,queryString:t=!1,groupId:s}=e,i=u(e),[a,c]=(0,l.useState)((()=>function(e){let{defaultValue:n,tabValues:t}=e;if(0===t.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:t}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${t.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const l=t.find((e=>e.default))??t[0];if(!l)throw new Error("Unexpected error: 0 tabValues");return l.value}({defaultValue:n,tabValues:i}))),[o,h]=w({queryString:t,groupId:s}),[x,m]=function(e){let{groupId:n}=e;const t=function(e){return e?`docusaurus.tab.${e}`:null}(n),[s,i]=(0,d.Dv)(t);return[s,(0,l.useCallback)((e=>{t&&i.set(e)}),[t,i])]}({groupId:s}),j=(()=>{const e=o??x;return p({value:e,tabValues:i})?e:null})();(0,r.A)((()=>{j&&c(j)}),[j]);return{selectedValue:a,selectValue:(0,l.useCallback)((e=>{if(!p({value:e,tabValues:i}))throw new Error(`Can't select invalid tab value=${e}`);c(e),h(e),m(e)}),[h,m,i]),tabValues:i}}var m=t(9136);const j={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=t(4848);function g(e){let{className:n,block:t,selectedValue:l,selectValue:a,tabValues:r}=e;const c=[],{blockElementScrollPositionUntilNextRender:o}=(0,i.a_)(),d=e=>{const n=e.currentTarget,t=c.indexOf(n),s=r[t].value;s!==l&&(o(n),a(s))},h=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const t=c.indexOf(e.currentTarget)+1;n=c[t]??c[0];break}case"ArrowLeft":{const t=c.indexOf(e.currentTarget)-1;n=c[t]??c[c.length-1];break}}n?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,s.A)("tabs",{"tabs--block":t},n),children:r.map((e=>{let{value:n,label:t,attributes:i}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:l===n?0:-1,"aria-selected":l===n,ref:e=>{c.push(e)},onKeyDown:h,onClick:d,...i,className:(0,s.A)("tabs__item",j.tabItem,i?.className,{"tabs__item--active":l===n}),children:t??n},n)}))})}function b(e){let{lazy:n,children:t,selectedValue:i}=e;const a=(Array.isArray(t)?t:[t]).filter(Boolean);if(n){const e=a.find((e=>e.props.value===i));return e?(0,l.cloneElement)(e,{className:(0,s.A)("margin-top--md",e.props.className)}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:a.map(((e,n)=>(0,l.cloneElement)(e,{key:n,hidden:e.props.value!==i})))})}function y(e){const n=x(e);return(0,f.jsxs)("div",{className:(0,s.A)("tabs-container",j.tabList),children:[(0,f.jsx)(g,{...n,...e}),(0,f.jsx)(b,{...n,...e})]})}function C(e){const n=(0,m.A)();return(0,f.jsx)(y,{...e,children:h(e.children)},String(n))}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var l=t(6540);const s={},i=l.createContext(s);function a(e){const n=l.useContext(i);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),l.createElement(i.Provider,{value:n},e.children)}}}]);