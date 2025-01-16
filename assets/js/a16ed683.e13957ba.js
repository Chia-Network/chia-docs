"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[9815],{857:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>c,frontMatter:()=>i,metadata:()=>a,toc:()=>h});const a=JSON.parse('{"id":"guides/cat/cat2-upgrade/cat2-intro","title":"CAT2 Intro and FAQ","description":"CAT1 reached its end of life at block 2,311,760, which occurred on July 26, 2022 at around 17:00 UTC. This was the final block where CAT1 was valid. At this block height, a snapshot was taken of all CAT1 tokens, along with the addresses of where they were being held. CAT1 issuers are now able to issue new CAT2 tokens and airdrop them to the same addresses where the CAT1 tokens were held.","source":"@site/docs/guides/cat/cat2-upgrade/cat2-intro.md","sourceDirName":"guides/cat/cat2-upgrade","slug":"/guides/cat2-intro","permalink":"/guides/cat2-intro","draft":false,"unlisted":false,"editUrl":"https://github.com/Chia-Network/chia-docs/blob/main/docs/guides/cat/cat2-upgrade/cat2-intro.md","tags":[],"version":"current","frontMatter":{"title":"CAT2 Intro and FAQ","sidebar_label":"1. Intro and FAQ","slug":"/guides/cat2-intro"},"sidebar":"guides","previous":{"title":"CAT Guide","permalink":"/guides/cat-developer-guide"},"next":{"title":"2. Snapshot Generation","permalink":"/guides/cat2-snapshot"}}');var o=n(4848),s=n(8453);n(5537),n(9329);const i={title:"CAT2 Intro and FAQ",sidebar_label:"1. Intro and FAQ",slug:"/guides/cat2-intro"},r=void 0,l={},h=[{value:"FAQ",id:"faq",level:2},{value:"General",id:"general",level:3},{value:"What is a CAT?",id:"what-is-a-cat",level:4},{value:"Why were CATs transitioned to CAT2?",id:"why-cat2",level:4},{value:"Does this change impact Chia Network&#39;s security?",id:"security-impact",level:4},{value:"When does the end of life of CAT1 happen?",id:"when-eol",level:4},{value:"How can I check my CAT1 balance at the time of the snapshot?",id:"check-snapshot",level:4},{value:"Does everyone have to upgrade?",id:"everyone-upgrade",level:4},{value:"Do I need to upgrade my harvesters?",id:"upgrade-harvesters",level:4},{value:"Are my NFTs or XCH at risk?",id:"nft-xch-risk",level:4},{value:"Is there any risk that I&#39;ll lose money or my balance will be incorrect during the transition? If so, what do I do?",id:"risk-lose-balance",level:4},{value:"Between the announcement and the end-of-life block height, what should I be doing as a user?",id:"what-to-do",level:4},{value:"How can I be sure that I&#39;ve canceled all my open offers?",id:"ensure-offers-canceled",level:4},{value:"I lost money by transacting, what do I do now?",id:"lost-money",level:4},{value:"Do I need to cancel my XCH-for-NFT offers?",id:"xch-nft-offers",level:4},{value:"How can I trust that all of my currency will be transferred appropriately?",id:"ensure-cats-transferred",level:4},{value:"What happens to my CAT1s?",id:"what-happens-cat1",level:4},{value:"How long will it take for me to get all my tokens airdropped to me?",id:"airdrop-how-long",level:4},{value:"What happens if I have a transaction with a CAT1 token after the block height snapshot?",id:"cat1-after-block-height",level:4},{value:"How can I trust that all of my currency will be transferred appropriately? Is there any risk that I&#39;ll lose money or my balance will be incorrect during the transition? If so, what do I do?",id:"cat1-transfer-correctly",level:4},{value:"CAT Issuers",id:"cat-issuers",level:3},{value:"I am the issuer of a CAT1 token. What should I do?",id:"cat1-issuer-what-do",level:4},{value:"Chia App",id:"chia-app",level:3},{value:"I upgraded to 1.5, but I don&#39;t see any of my tokens yet. Did I do something wrong?",id:"no-tokens-yet",level:4},{value:"The balance of my airdrop in my wallet doesn&#39;t match the balance that the website shows me, what should I do?",id:"balance-airdrop-match",level:4},{value:"I&#39;ve tried all the recommendations, but the reissuer didn&#39;t get my wallet balance correct. What should I do?",id:"no-reissuance",level:4},{value:"How do I cancel my open offers to exchange CATs?",id:"cancel-open-offers",level:4},{value:"After upgrading to 1.5, I&#39;ve lost all of my wallet transaction history. How do I access my previous transaction history with CATs or XCH?",id:"lost-transaction-history",level:4},{value:"How do I know when the updated tokens have been airdropped to my wallet?",id:"airdrop-know-when",level:4},{value:"Why doesn&#39;t the balance in my wallet match the balance reported on the website?",id:"balance-match-website",level:4},{value:"What is a &quot;Derivation Index&quot;?",id:"what-is-derivation-index",level:4},{value:"Why do I see multiple tokens with the same value in my 1.5 wallet?",id:"multiple-tokens-same-value",level:4},{value:"Who can I contact if I have any problems or questions?",id:"who-to-contact",level:4},{value:"CAT1 Balance Website",id:"cat1-balance-website",level:3},{value:"How do I find the pubkey to enter into the website?",id:"find-pubkey-for-website",level:4},{value:"I checked the website (cat1.chia.net) and I don&#39;t see any tokens for my wallet, but there should be. What can I do?",id:"no-tokens-on-website",level:4},{value:"The balance that the website is reporting doesn&#39;t match what I expect. What should I do?",id:"website-balance-doesnt-match",level:4},{value:"My CH21 balance is reported incorrectly on the website. What should I do?",id:"ch21-balance-incorrect",level:4},{value:"I am running 1.5 and when I view an offer, instead of the CAT token, I see XCH. What&#39;s going on?",id:"see-xch-instead-of-cat",level:4},{value:"Wallet Developers",id:"wallet-developers",level:3},{value:"I am developing a Chia wallet. What changes do I need to make to my code?",id:"wallet-changes-needed",level:4}];function d(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.p,{children:"CAT1 reached its end of life at block 2,311,760, which occurred on July 26, 2022 at around 17:00 UTC. This was the final block where CAT1 was valid. At this block height, a snapshot was taken of all CAT1 tokens, along with the addresses of where they were being held. CAT1 issuers are now able to issue new CAT2 tokens and airdrop them to the same addresses where the CAT1 tokens were held."}),"\n",(0,o.jsx)(t.p,{children:"Chia version 1.5.0 was released on July 26, 2022. Since then, CAT1 tokens are not shown in the wallet. Users will only see the newly-issued CAT2 tokens, which will be identical in value to their CAT1 equivalents."}),"\n",(0,o.jsx)(t.admonition,{title:"Are you a CAT issuer?",type:"tip",children:(0,o.jsxs)(t.p,{children:["Check out the ",(0,o.jsx)(t.a,{href:"/guides/cat2-snapshot",children:"Snapshot Generation guide"})," to get started with issuing your CAT2 tokens."]})}),"\n",(0,o.jsx)(t.h2,{id:"faq",children:"FAQ"}),"\n",(0,o.jsx)(t.h3,{id:"general",children:"General"}),"\n",(0,o.jsx)(t.h4,{id:"what-is-a-cat",children:"What is a CAT?"}),"\n",(0,o.jsxs)(t.p,{children:["A CAT is a Chia Asset Token. CATs are fungible tokens that are issued on the Chia blockchain. The CAT1 standard was finalized in January 2022. You can read more about the ",(0,o.jsx)(t.a,{href:"https://chialisp.com/cats",children:"CAT primitive"}),". Some examples of CATs include Stably USD (USDS), Spacebucks (SBX), and Marmot (MRMT)."]}),"\n",(0,o.jsx)(t.h4,{id:"why-cat2",children:"Why were CATs transitioned to CAT2?"}),"\n",(0,o.jsx)(t.p,{children:"The CAT standard was upgraded to CAT2 based on a security vulnerability found by an outside security audit. This resulted in an upgrade to the latest Chia wallet app as well as updates that will require all original issuers of CAT1 tokens to reissue their tokens on the CAT2 standard and end-of-life support for CAT1. Chia is working with community members to make this process as seamless as possible."}),"\n",(0,o.jsx)(t.h4,{id:"security-impact",children:"Does this change impact Chia Network's security?"}),"\n",(0,o.jsx)(t.p,{children:"No. There is no threat to the security of Chia Network technology or the Chia Blockchain. The update patched the vulnerability to CAT1."}),"\n",(0,o.jsx)(t.h4,{id:"when-eol",children:"When does the end of life of CAT1 happen?"}),"\n",(0,o.jsxs)(t.p,{children:["The end-of-life block height is ",(0,o.jsx)(t.code,{children:"2,311,760"})," which is on July 26, 2022 at approximately 17:00 UTC. This is when the snapshot was taken."]}),"\n",(0,o.jsx)(t.h4,{id:"check-snapshot",children:"How can I check my CAT1 balance at the time of the snapshot?"}),"\n",(0,o.jsxs)(t.p,{children:["Go to ",(0,o.jsx)(t.a,{href:"https://cat1.chia.net",children:"cat1.chia.net"})," and provide your pubkey to see the CAT balances that will be airdropped to you when they get re-issued."]}),"\n",(0,o.jsx)(t.h4,{id:"everyone-upgrade",children:"Does everyone have to upgrade?"}),"\n",(0,o.jsx)(t.p,{children:"We recommend that all CAT (including USDS) holders upgrade to 1.5 as soon as is convenient. The CAT1s that are visible on 1.4 and earlier versions will no longer be supported after the end-of-life block (2,311,760). If you do not own any CATs (for example, if you are a farmer who does not exchange XCH for USDS or any other CAT), then you don't need to upgrade."}),"\n",(0,o.jsx)(t.h4,{id:"upgrade-harvesters",children:"Do I need to upgrade my harvesters?"}),"\n",(0,o.jsx)(t.p,{children:"This update only affects the wallet software, so you don't need to update your harvesters."}),"\n",(0,o.jsx)(t.h4,{id:"nft-xch-risk",children:"Are my NFTs or XCH at risk?"}),"\n",(0,o.jsx)(t.p,{children:"No. NFTs and XCH are not affected by the vulnerability, so no changes are required for them."}),"\n",(0,o.jsx)(t.h4,{id:"risk-lose-balance",children:"Is there any risk that I'll lose money or my balance will be incorrect during the transition? If so, what do I do?"}),"\n",(0,o.jsxs)(t.p,{children:["If you have any CATs in your wallet, you will want to upgrade to 1.5 as soon as convenient and be sure not to transact with any CATs after the end-of-life block height (2,311,760) has been reached and until you have upgraded to 1.5. This will help ensure that the balance you are expecting is what will be airdropped to you when the CATs are reissued. The ",(0,o.jsx)(t.a,{href:"https://cat1.chia.net/",children:"CAT1 website"})," accurately reflects the CAT1 balance of your wallet as of the end-of-life announcement. It will not dynamically update, but we expect the reissuance process to take approximately a week to fully complete, so the CAT2 balance in your wallet may differ from the CAT1 website balance until the process is complete."]}),"\n",(0,o.jsx)(t.h4,{id:"what-to-do",children:"Between the announcement and the end-of-life block height, what should I be doing as a user?"}),"\n",(0,o.jsx)(t.p,{children:"It is recommended that you:"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsx)(t.li,{children:"Cancel any open CAT offers on-chain in your wallet"}),"\n",(0,o.jsx)(t.li,{children:"Do not accept any CAT offers in your 1.4 or lower wallet"}),"\n",(0,o.jsx)(t.li,{children:"Make note of your current CAT1 balances"}),"\n",(0,o.jsx)(t.li,{children:"Upgrade to the latest Chia wallet app (1.5.0 or higher) when it becomes available"}),"\n"]}),"\n",(0,o.jsx)(t.h4,{id:"ensure-offers-canceled",children:"How can I be sure that I've canceled all my open offers?"}),"\n",(0,o.jsx)(t.p,{children:"Most importantly, you will want to make sure there are no outstanding offers to trade your XCH for someone else's CATs. In addition to canceling the offers in your wallet, you can also send your total balance of XCH to yourself. Due to the Chia coinset model, this will ensure that all XCH coins will no longer be available should a rogue or forgotten offer be accepted."}),"\n",(0,o.jsx)(t.h4,{id:"lost-money",children:"I lost money by transacting, what do I do now?"}),"\n",(0,o.jsx)(t.p,{children:"Unfortunately, any CAT1 transactions that happen after the end of life block height won't be recoverable. For further confirmation, please contact our support team so they can help with checking when the transactions occurred and can help determine if the money is lost or not."}),"\n",(0,o.jsx)(t.h4,{id:"xch-nft-offers",children:"Do I need to cancel my XCH-for-NFT offers?"}),"\n",(0,o.jsx)(t.p,{children:"No. Only CAT1 tokens are affected. No changes are being made to NFTs. However, if you have an open CAT-for-NFT offer, then you should cancel it."}),"\n",(0,o.jsx)(t.h4,{id:"ensure-cats-transferred",children:"How can I trust that all of my currency will be transferred appropriately?"}),"\n",(0,o.jsx)(t.p,{children:"You can check your CAT1 balance as of the snapshot through our website using your public key.\nWe are providing tools and support to the community developers to help ensure that they can reissue the new CATs in a timely manner. All CAT reissuers will be going by token balances at the same end-of-life blockheight."}),"\n",(0,o.jsx)(t.h4,{id:"what-happens-cat1",children:"What happens to my CAT1s?"}),"\n",(0,o.jsx)(t.p,{children:"Your existing CAT1 tokens still exist on the blockchain, but they are no longer of use as everyone upgrades to CAT2. You will be airdropped CAT2 to replace your CAT1 based on your balance as of block height of 2,311,760. Once you upgrade to 1.5, you will no longer see any balances for your original CATs."}),"\n",(0,o.jsx)(t.h4,{id:"airdrop-how-long",children:"How long will it take for me to get all my tokens airdropped to me?"}),"\n",(0,o.jsx)(t.p,{children:"This will depend on when the original issuers re-issue their tokens based on the new CAT2 standard. We hope that it is soon after the CAT1 EOL date. It is recommended to follow social media or Discord for CAT projects so you can hear firsthand when to expect the airdrops."}),"\n",(0,o.jsx)(t.h4,{id:"cat1-after-block-height",children:"What happens if I have a transaction with a CAT1 token after the block height snapshot?"}),"\n",(0,o.jsx)(t.p,{children:"You will only be airdropped the balance of the tokens at the time the snapshot is taken. Any transactions that occur after the snapshot will not be accounted for in the airdrop provided to you."}),"\n",(0,o.jsx)(t.h4,{id:"cat1-transfer-correctly",children:"How can I trust that all of my currency will be transferred appropriately? Is there any risk that I'll lose money or my balance will be incorrect during the transition? If so, what do I do?"}),"\n",(0,o.jsx)(t.p,{children:"Your CAT1 tokens won't be transferred. Instead, you will be given an identical (in value) set of CAT2 tokens. The blockchain already contains a complete record of all coins in the coinset. We have developed a tool that will use the blockchain to calculate a complete snapshot of CAT1 tokens. This snapshot will be accurate as of CAT1's end-of-life block."}),"\n",(0,o.jsx)(t.p,{children:"However, the CAT1 issuers do need to perform a complete airdrop of CAT2 tokens. If the airdrop is not completed, or even started, then there is a risk that you will not receive your upgraded CAT2 tokens. In this case, you should ask the issuer to make the upgrade."}),"\n",(0,o.jsx)(t.h3,{id:"cat-issuers",children:"CAT Issuers"}),"\n",(0,o.jsx)(t.h4,{id:"cat1-issuer-what-do",children:"I am the issuer of a CAT1 token. What should I do?"}),"\n",(0,o.jsxs)(t.p,{children:["Follow the ",(0,o.jsx)(t.a,{href:"/guides/cat2-snapshot",children:"Snapshot Generation guide"}),", which will guide you through the process of reissuing your token as a CAT2."]}),"\n",(0,o.jsx)(t.h3,{id:"chia-app",children:"Chia App"}),"\n",(0,o.jsx)(t.h4,{id:"no-tokens-yet",children:"I upgraded to 1.5, but I don't see any of my tokens yet. Did I do something wrong?"}),"\n",(0,o.jsx)(t.p,{children:"No, you didn't do anything wrong. The Chia Wallet app, as of 1.5, only shows you your XCH, and CAT2 balances. As not all CATs will be re-issued immediately, when your CAT2s show up in your wallet is dependent on when original issuers issue their updated CAT2s."}),"\n",(0,o.jsx)(t.h4,{id:"balance-airdrop-match",children:"The balance of my airdrop in my wallet doesn't match the balance that the website shows me, what should I do?"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsxs)(t.p,{children:["First, please consult the ",(0,o.jsx)(t.a,{href:"https://cat1.chia.net",children:"CAT1 balance website"})," to view your historical CAT1 balances. We expect the full reissuance process to take approximately a week to complete."]}),"\n"]}),"\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsx)(t.p,{children:"If your CAT2 balances in the 1.5.0 wallet do not match the CAT1 historical reference, then check what your wallet derivation index is at and compare it to the derivation index shown in the balance on the Tokens screen."}),"\n"]}),"\n"]}),"\n",(0,o.jsx)("img",{src:"/img/cat2/wallet-derivation-index.png",alt:"Derivation Index in the wallet"}),"\n",(0,o.jsxs)(t.ol,{start:"3",children:["\n",(0,o.jsxs)(t.li,{children:["If the derivation index in your wallet is less than the highest derivation index found on the website, you will want to update the derivation index in the wallet. To do so, go to Settings -> Derivation index and type in the number that you get from the ",(0,o.jsx)(t.a,{href:"https://cat1.chia.net",children:"cat1.chia.net"})," website."]}),"\n"]}),"\n",(0,o.jsx)("img",{src:"/img/cat2/settings-derivation-index.png",alt:"Derivation Index in the settings"}),"\n",(0,o.jsx)(t.h4,{id:"no-reissuance",children:"I've tried all the recommendations, but the reissuer didn't get my wallet balance correct. What should I do?"}),"\n",(0,o.jsx)(t.p,{children:"After trying all the above steps and at least a week has passed since the announcement and your CAT2 airdropped balance still doesn't match, then we recommend reaching out directly to the reissuer of the relevant CAT1 token."}),"\n",(0,o.jsx)(t.h4,{id:"cancel-open-offers",children:"How do I cancel my open offers to exchange CATs?"}),"\n",(0,o.jsx)(t.p,{children:"From the Chia Wallet GUI:"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsxs)(t.li,{children:["Go to the ",(0,o.jsx)(t.em,{children:"Offers"})," tab in the left hand navigation"]}),"\n",(0,o.jsxs)(t.li,{children:["Find all Offers you created that show a status of ",(0,o.jsx)(t.em,{children:"Pending Accept"})]}),"\n",(0,o.jsxs)(t.li,{children:["Click on the three dots under ",(0,o.jsx)(t.em,{children:"Actions"})]}),"\n",(0,o.jsxs)(t.li,{children:["Click on ",(0,o.jsx)(t.em,{children:"Cancel Offer"})]}),"\n",(0,o.jsxs)(t.li,{children:["Ensure the ",(0,o.jsx)(t.em,{children:"Cancel on blockchain"})," option is selected"]}),"\n",(0,o.jsx)(t.li,{children:"Enter a fee (optional, but recommended)"}),"\n",(0,o.jsxs)(t.li,{children:["Click on ",(0,o.jsx)(t.em,{children:"Cancel Offer"})]}),"\n"]}),"\n",(0,o.jsx)(t.p,{children:"From the Chia Wallet command line:"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsxs)(t.li,{children:["Run ",(0,o.jsx)(t.code,{children:"chia wallet cancel_offer"})," along with the parameters needed to cancel any open offers. Run ",(0,o.jsx)(t.code,{children:"chia wallet cancel_offer -h"})," to see the relevant help output."]}),"\n"]}),"\n",(0,o.jsx)(t.h4,{id:"lost-transaction-history",children:"After upgrading to 1.5, I've lost all of my wallet transaction history. How do I access my previous transaction history with CATs or XCH?"}),"\n",(0,o.jsx)(t.p,{children:"After upgrading to 1.5, a new wallet database is created to preserve any previous copies of wallet DBs. You can install a previous version of the Chia wallet app, and that older client will look for your previous wallet db and display the transaction history for XCH, CATs, and NFTs that occurred in that wallet before upgrading to 1.5"}),"\n",(0,o.jsx)(t.h4,{id:"airdrop-know-when",children:"How do I know when the updated tokens have been airdropped to my wallet?"}),"\n",(0,o.jsxs)(t.p,{children:["You should follow the projects for the tokens that you own so you can be notified when they have begun running the airdrops. You can also monitor your Chia wallet app, and look under the ",(0,o.jsx)(t.em,{children:'"Manage token list"'})," to see if a new CAT2 has been airdropped to you."]}),"\n",(0,o.jsx)(t.h4,{id:"balance-match-website",children:"Why doesn't the balance in my wallet match the balance reported on the website?"}),"\n",(0,o.jsxs)(t.p,{children:["Get the ",(0,o.jsx)(t.em,{children:"Derivation Index"})," from the website and update the derivation index in the Chia wallet app. This will ensure the balance reported on the website matches up with the balance in your wallet."]}),"\n",(0,o.jsx)(t.h4,{id:"what-is-derivation-index",children:'What is a "Derivation Index"?'}),"\n",(0,o.jsx)(t.p,{children:"The derivation index is a numeric value that is used to track how many wallet addresses have been used based on the most recent transaction. This helps establish a window for which wallet addresses to scan for on the blockchain to find all possible coins owned by a specific wallet."}),"\n",(0,o.jsx)(t.h4,{id:"multiple-tokens-same-value",children:"Why do I see multiple tokens with the same value in my 1.5 wallet?"}),"\n",(0,o.jsxs)(t.p,{children:["It is possible that you have received multiple identical airdrops from different parties. Only one of them will be the real CAT2 token. To determine which one is real, click ",(0,o.jsx)(t.em,{children:'"MANAGE TOKEN LIST"'})," and click ",(0,o.jsx)(t.em,{children:'"Search on Tail Database"'}),". Only the original CAT1 issuer will be allowed to register their CAT2 equivalent on Tail Database, so you should use it as the source of truth for naming your CAT2 tokens."]}),"\n",(0,o.jsx)(t.h4,{id:"who-to-contact",children:"Who can I contact if I have any problems or questions?"}),"\n",(0,o.jsxs)(t.p,{children:["The Chia Network Support Team is available to answer questions and provide assistance through this process in the official Support ",(0,o.jsx)(t.a,{href:"https://discord.gg/chia",children:"Discord"}),"."]}),"\n",(0,o.jsx)(t.h3,{id:"cat1-balance-website",children:"CAT1 Balance Website"}),"\n",(0,o.jsx)(t.h4,{id:"find-pubkey-for-website",children:"How do I find the pubkey to enter into the website?"}),"\n",(0,o.jsx)(t.p,{children:"From the Chia Wallet GUI:"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsxs)(t.p,{children:["Go to the ",(0,o.jsx)(t.em,{children:'"Select Key"'})," screen and click on ",(0,o.jsx)(t.em,{children:'"See private key"'})]}),"\n",(0,o.jsx)("img",{src:"/img/cat2/key-selection.png",alt:"Key selection screen"}),"\n"]}),"\n",(0,o.jsxs)(t.li,{children:["\n",(0,o.jsxs)(t.p,{children:["Copy the ",(0,o.jsx)(t.em,{children:"public key"})," from the list of keys available"]}),"\n"]}),"\n"]}),"\n",(0,o.jsx)(t.p,{children:"From the Chia Wallet command line:"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsxs)(t.li,{children:["Run ",(0,o.jsx)(t.code,{children:"chia keys show"})]}),"\n",(0,o.jsxs)(t.li,{children:["Copy the ",(0,o.jsx)(t.em,{children:"master public key"})," from the list of keys available"]}),"\n"]}),"\n",(0,o.jsx)(t.h4,{id:"no-tokens-on-website",children:"I checked the website (cat1.chia.net) and I don't see any tokens for my wallet, but there should be. What can I do?"}),"\n",(0,o.jsxs)(t.ol,{children:["\n",(0,o.jsx)(t.li,{children:"Confirm the pubkey you entered into the website is correct and had a CAT1 token balance, and is for an unhardened key"}),"\n",(0,o.jsxs)(t.li,{children:["Click on the ",(0,o.jsx)(t.em,{children:'"Search next 1000"'})," to see if your balance has been updated"]}),"\n"]}),"\n",(0,o.jsx)(t.h4,{id:"website-balance-doesnt-match",children:"The balance that the website is reporting doesn't match what I expect. What should I do?"}),"\n",(0,o.jsx)(t.p,{children:'The website scans the first 1000 wallet receive addresses, and if the balance doesn\'t reflect what you expect, then you should hit the "search next 1000" for the website to scan and update the balance found. We expect most users to get their correct balance from the initial search, but some users might need an expanded search.'}),"\n",(0,o.jsx)(t.h4,{id:"ch21-balance-incorrect",children:"My CH21 balance is reported incorrectly on the website. What should I do?"}),"\n",(0,o.jsx)(t.p,{children:"CH21 tokens were issued to non-observer keys, so they won't show up in the website unless they've been transferred at some point using a wallet without forcing the non-observer key support. The CAT standard was released at the same time as support for observer keys, so generally most CATs and wallets will be supported by the website. Even if your CH21 tokens are not displayed on the website, a CAT2 version will still be airdropped into your 1.5 wallet."}),"\n",(0,o.jsx)(t.h4,{id:"see-xch-instead-of-cat",children:"I am running 1.5 and when I view an offer, instead of the CAT token, I see XCH. What's going on?"}),"\n",(0,o.jsx)(t.p,{children:"You are likely viewing an offer for a CAT1 which will be an invalid offer starting with version 1.5. The reason for this is because tail IDs for CAT1s are no longer recognized by the wallet."}),"\n",(0,o.jsx)("img",{src:"/img/cat2/offer-summary.png",alt:"Offer summary screen"}),"\n",(0,o.jsx)(t.h3,{id:"wallet-developers",children:"Wallet Developers"}),"\n",(0,o.jsx)(t.h4,{id:"wallet-changes-needed",children:"I am developing a Chia wallet. What changes do I need to make to my code?"}),"\n",(0,o.jsxs)(t.p,{children:["CAT2 inner puzzles do not enforce prepended announcements. If you preprend a coin announcement with ",(0,o.jsx)(t.code,{children:"0xca"})," (which was a requirement for CAT1), then the announcement will fail with ",(0,o.jsx)(t.code,{children:"ANNOUNCE_CONSUMED_FAILED"}),". Instead, do not prepend inner puzzle announcements with anything."]}),"\n",(0,o.jsxs)(t.p,{children:["Note that announcements coming from the CAT layer still need to be prepended with ",(0,o.jsx)(t.code,{children:"0xcb"}),". This has not changed in CAT2."]})]})}function c(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},9329:(e,t,n)=>{n.d(t,{A:()=>i});n(6540);var a=n(4164);const o={tabItem:"tabItem_Ymn6"};var s=n(4848);function i(e){let{children:t,hidden:n,className:i}=e;return(0,s.jsx)("div",{role:"tabpanel",className:(0,a.A)(o.tabItem,i),hidden:n,children:t})}},5537:(e,t,n)=>{n.d(t,{A:()=>C});var a=n(6540),o=n(4164),s=n(5627),i=n(6347),r=n(372),l=n(604),h=n(1861),d=n(8749);function c(e){return a.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,a.isValidElement)(e)&&function(e){const{props:t}=e;return!!t&&"object"==typeof t&&"value"in t}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:t,children:n}=e;return(0,a.useMemo)((()=>{const e=t??function(e){return c(e).map((e=>{let{props:{value:t,label:n,attributes:a,default:o}}=e;return{value:t,label:n,attributes:a,default:o}}))}(n);return function(e){const t=(0,h.XI)(e,((e,t)=>e.value===t.value));if(t.length>0)throw new Error(`Docusaurus error: Duplicate values "${t.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[t,n])}function p(e){let{value:t,tabValues:n}=e;return n.some((e=>e.value===t))}function f(e){let{queryString:t=!1,groupId:n}=e;const o=(0,i.W6)(),s=function(e){let{queryString:t=!1,groupId:n}=e;if("string"==typeof t)return t;if(!1===t)return null;if(!0===t&&!n)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return n??null}({queryString:t,groupId:n});return[(0,l.aZ)(s),(0,a.useCallback)((e=>{if(!s)return;const t=new URLSearchParams(o.location.search);t.set(s,e),o.replace({...o.location,search:t.toString()})}),[s,o])]}function w(e){const{defaultValue:t,queryString:n=!1,groupId:o}=e,s=u(e),[i,l]=(0,a.useState)((()=>function(e){let{defaultValue:t,tabValues:n}=e;if(0===n.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(t){if(!p({value:t,tabValues:n}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${t}" but none of its children has the corresponding value. Available values are: ${n.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return t}const a=n.find((e=>e.default))??n[0];if(!a)throw new Error("Unexpected error: 0 tabValues");return a.value}({defaultValue:t,tabValues:s}))),[h,c]=f({queryString:n,groupId:o}),[w,m]=function(e){let{groupId:t}=e;const n=function(e){return e?`docusaurus.tab.${e}`:null}(t),[o,s]=(0,d.Dv)(n);return[o,(0,a.useCallback)((e=>{n&&s.set(e)}),[n,s])]}({groupId:o}),b=(()=>{const e=h??w;return p({value:e,tabValues:s})?e:null})();(0,r.A)((()=>{b&&l(b)}),[b]);return{selectedValue:i,selectValue:(0,a.useCallback)((e=>{if(!p({value:e,tabValues:s}))throw new Error(`Can't select invalid tab value=${e}`);l(e),c(e),m(e)}),[c,m,s]),tabValues:s}}var m=n(9136);const b={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var y=n(4848);function v(e){let{className:t,block:n,selectedValue:a,selectValue:i,tabValues:r}=e;const l=[],{blockElementScrollPositionUntilNextRender:h}=(0,s.a_)(),d=e=>{const t=e.currentTarget,n=l.indexOf(t),o=r[n].value;o!==a&&(h(t),i(o))},c=e=>{let t=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const n=l.indexOf(e.currentTarget)+1;t=l[n]??l[0];break}case"ArrowLeft":{const n=l.indexOf(e.currentTarget)-1;t=l[n]??l[l.length-1];break}}t?.focus()};return(0,y.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,o.A)("tabs",{"tabs--block":n},t),children:r.map((e=>{let{value:t,label:n,attributes:s}=e;return(0,y.jsx)("li",{role:"tab",tabIndex:a===t?0:-1,"aria-selected":a===t,ref:e=>{l.push(e)},onKeyDown:c,onClick:d,...s,className:(0,o.A)("tabs__item",b.tabItem,s?.className,{"tabs__item--active":a===t}),children:n??t},t)}))})}function g(e){let{lazy:t,children:n,selectedValue:s}=e;const i=(Array.isArray(n)?n:[n]).filter(Boolean);if(t){const e=i.find((e=>e.props.value===s));return e?(0,a.cloneElement)(e,{className:(0,o.A)("margin-top--md",e.props.className)}):null}return(0,y.jsx)("div",{className:"margin-top--md",children:i.map(((e,t)=>(0,a.cloneElement)(e,{key:t,hidden:e.props.value!==s})))})}function x(e){const t=w(e);return(0,y.jsxs)("div",{className:(0,o.A)("tabs-container",b.tabList),children:[(0,y.jsx)(v,{...t,...e}),(0,y.jsx)(g,{...t,...e})]})}function C(e){const t=(0,m.A)();return(0,y.jsx)(x,{...e,children:c(e.children)},String(t))}},8453:(e,t,n)=>{n.d(t,{R:()=>i,x:()=>r});var a=n(6540);const o={},s=a.createContext(o);function i(e){const t=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:i(e.components),a.createElement(s.Provider,{value:t},e.children)}}}]);