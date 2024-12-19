"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[6684],{5009:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>l,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>c});const i=JSON.parse('{"id":"getting-started/cloud-wallet/known-issues","title":"Known Issues","description":"This list was last updated on 2024-12-18. Although there are many items in this list, most of them are minor issues or issues that occur rarely. In addition, while we will attempt to keep this list up to date, it may fall behind on occasion. This is not meant to be a comprehensive list.","source":"@site/docs/getting-started/cloud-wallet/known-issues.md","sourceDirName":"getting-started/cloud-wallet","slug":"/getting-started/cloud-wallet/known-issues","permalink":"/getting-started/cloud-wallet/known-issues","draft":false,"unlisted":false,"editUrl":"https://github.com/Chia-Network/chia-docs/blob/main/docs/getting-started/cloud-wallet/known-issues.md","tags":[],"version":"current","frontMatter":{"slug":"/getting-started/cloud-wallet/known-issues","title":"Known Issues"},"sidebar":"tutorialSidebar","previous":{"title":"Unfinished Components","permalink":"/getting-started/cloud-wallet/unfinished"},"next":{"title":"Advanced Installation","permalink":"/installation"}}');var s=n(4848),o=n(8453);const a={slug:"/getting-started/cloud-wallet/known-issues",title:"Known Issues"},l=void 0,r={},c=[];function h(e){const t={code:"code",li:"li",p:"p",ul:"ul",...(0,o.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.p,{children:"This list was last updated on 2024-12-18. Although there are many items in this list, most of them are minor issues or issues that occur rarely. In addition, while we will attempt to keep this list up to date, it may fall behind on occasion. This is not meant to be a comprehensive list."}),"\n",(0,s.jsxs)(t.ul,{children:["\n",(0,s.jsx)(t.li,{children:"Recovery is not yet enabled for vaults that use the Chia Signer app"}),"\n",(0,s.jsx)(t.li,{children:"The fee field doesn\u2019t work yet for recovery operations (initiate, cancel, complete)"}),"\n",(0,s.jsx)(t.li,{children:"The fiat price of XCH is currently not being displayed"}),"\n",(0,s.jsxs)(t.li,{children:["You may see an occasional ",(0,s.jsx)(t.code,{children:"Minified React error"})," when doing various actions in the Cloud Wallet"]}),"\n",(0,s.jsx)(t.li,{children:"You may have difficulty creating a new Yubikey passkey when using the Cloud Wallet on Android"}),"\n",(0,s.jsx)(t.li,{children:"If vault creation fails, you won't be able to create a vault with the same name used with the failed attempt"}),"\n",(0,s.jsx)(t.li,{children:"If you send two transactions within the same block, the second transaction will be stuck in the mempool indefinitely"}),"\n",(0,s.jsx)(t.li,{children:"Transaction status might not be updated for around 20 seconds after on-chain confirmation"}),"\n",(0,s.jsx)(t.li,{children:"When vault minting doesn't succeed (for example, if not enough coins are available), the action is not retried"}),"\n",(0,s.jsx)(t.li,{children:"Long vault names are truncated; this is a display issue only"}),"\n",(0,s.jsx)(t.li,{children:"Vaults currently can be named with all whitespace (space/tab) characters; this will be disallowed in the future"}),"\n",(0,s.jsx)(t.li,{children:"The Chia Signer app is only for signing transactions; the current signup process doesn't make it completely clear that the app cannot be used for logging into the Cloud Wallet. We will make this clearer in the future."}),"\n",(0,s.jsx)(t.li,{children:"The transaction history may not show all incoming transactions, even when the balance is accurate"}),"\n",(0,s.jsx)(t.li,{children:"When setting up a vault on an iPhone, the fields for inputting up the clawback timer might not show any numbers"}),"\n",(0,s.jsx)(t.li,{children:"If you attempt to add a passkey, but then click the X to close out of the window, it will give you an error"}),"\n",(0,s.jsx)(t.li,{children:"If you send funds to your own vault, the transaction will show an amount of 0"}),"\n",(0,s.jsx)(t.li,{children:'In rare occurrences, when creating an account, you might see "Internal Server Error"'}),"\n",(0,s.jsx)(t.li,{children:'You may see "User not found for this passkey" when attempting to create an account with a passkey'}),"\n",(0,s.jsx)(t.li,{children:"We are in the process of updating the mobile UI, so certain buttons and labels may look bad on a mobile device for now"}),"\n",(0,s.jsx)(t.li,{children:'Some users have reported seeing "vault.chiatest.net\'s DNS address could not be found...." when using the Brave browser'}),"\n",(0,s.jsx)(t.li,{children:"The previous view of the home screen will briefly flash after a new vault is created; this lasts less than one second until the correct view is displayed"}),"\n",(0,s.jsx)(t.li,{children:'After successfully cancelling a recovery, you may see a "Something went wrong" message; refresh your browser window to workaround this issue'}),"\n",(0,s.jsx)(t.li,{children:"The initial timer displayed for cancelling a recovery is hardcoded to 15 minutes; however, the actual timer is correct"}),"\n",(0,s.jsx)(t.li,{children:'The recovery timer will show "0 minutes" remaining when, in fact, there is less than one minute remaining; this is a simple rounding error which will be resolved when the timer actually reaches 0'}),"\n",(0,s.jsx)(t.li,{children:"After a successful recovery, the first transaction in the vault\u2019s history shows an extra mojo"}),"\n",(0,s.jsx)(t.li,{children:"The signing modal dialog occasionally takes over 30 seconds to be displayed"}),"\n",(0,s.jsx)(t.li,{children:'When sending CATs, the "amount" field is missing a label, and the "fee" field is labeled as "unknown CATs"; these are display issues only'}),"\n",(0,s.jsx)(t.li,{children:'CATs sent to the same vault as where they originated are listed as "0 Unknown CATS"'}),"\n",(0,s.jsx)(t.li,{children:'If the Cloud Wallet is left inactive for a long time, "Something went wrong" might be displayed; refreshing the browser tab will work around this issue'}),"\n",(0,s.jsx)(t.li,{children:"For now, in order to paste a seed phrase when initiating a recovery, you must paste the phrase into the first word field"}),"\n",(0,s.jsx)(t.li,{children:"Coins might be locked if certain transactions fail, and it\u2019s not obvious how to unlock them; however, this is an uncommon occurrence"}),"\n",(0,s.jsx)(t.li,{children:"On rare occasions, selecting a custody key will result in it not being possible to return to the main screen. * Log out and log back in to work around this issue for now"}),"\n",(0,s.jsx)(t.li,{children:'If a "Fee too low" error is encountered (a rare occurrence), a transaction may enter a "signed" state, but it is not submitted to the mempool'}),"\n",(0,s.jsx)(t.li,{children:'Unrecognized CATs (which includes all CATs for now) are each listed as "Unknown CAT2" without an obvious way to differentiate them'}),"\n",(0,s.jsx)(t.li,{children:"The balance and transaction count can be out of sync in vaults with hundreds of transactions"}),"\n",(0,s.jsx)(t.li,{children:'When creating a vault with a bitwarden passkey, it\u2019s possible to receive a "Memory access out of bounds" error'}),"\n",(0,s.jsx)(t.li,{children:"You can\u2019t create a new vault with the same name as a deleted vault"}),"\n"]})]})}function d(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>l});var i=n(6540);const s={},o=i.createContext(s);function a(e){const t=i.useContext(o);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),i.createElement(o.Provider,{value:t},e.children)}}}]);