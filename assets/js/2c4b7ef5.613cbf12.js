"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[2303],{271:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>o,default:()=>h,frontMatter:()=>a,metadata:()=>n,toc:()=>c});const n=JSON.parse('{"id":"keys/keys-and-signatures","title":"BLS Keys","description":"This section will explain the different types of keys in the Chia network. It will also cover how the keys are generated, stored, and used. These systems are designed to be flexible enough to support many different configurations and pooling setups and to be resilient to various attacks.","source":"@site/docs/keys/keys-and-signatures.md","sourceDirName":"keys","slug":"/bls-keys","permalink":"/bls-keys","draft":false,"unlisted":false,"editUrl":"https://github.com/Chia-Network/chia-docs/blob/main/docs/keys/keys-and-signatures.md","tags":[],"version":"current","frontMatter":{"title":"BLS Keys","slug":"/bls-keys"},"sidebar":"tutorialSidebar","previous":{"title":"Architecture","permalink":"/key-architecture"},"next":{"title":"Plot IDs","permalink":"/plot-ids"}}');var r=s(4848),i=s(8453);const a={title:"BLS Keys",slug:"/bls-keys"},o=void 0,l={},c=[{value:"Difference between Chia and EIP-2333",id:"difference-between-chia-and-eip-2333",level:2},{value:"Non-Observer vs Observer Keys",id:"non-observer-vs-observer-keys",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.p,{children:"This section will explain the different types of keys in the Chia network. It will also cover how the keys are generated, stored, and used. These systems are designed to be flexible enough to support many different configurations and pooling setups and to be resilient to various attacks."}),"\n",(0,r.jsxs)(t.p,{children:["All Chia keys are ",(0,r.jsx)(t.a,{href:"https://github.com/supranational/blst/",children:"BLS-12-381"})," private keys, following the ",(0,r.jsx)(t.a,{href:"https://datatracker.ietf.org/doc/draft-irtf-cfrg-bls-signature/",children:"IETF specification"}),", the ",(0,r.jsx)(t.a,{href:"https://eips.ethereum.org/EIPS/eip-2333",children:"EIP-2333"})," specification for key derivation and ",(0,r.jsx)(t.a,{href:"https://github.com/satoshilabs/slips/blob/master/slip-0044.md",children:"BIP 44 registered"}),". Private keys are 32 bytes, public keys 48 bytes, and signatures 96 bytes (public keys are points in G1, signatures are points in G2.)"]}),"\n",(0,r.jsx)(t.admonition,{type:"warning",children:(0,r.jsx)(t.p,{children:"There is a slight difference between Chia's implementation and EIP-2333, as described in the next section."})}),"\n",(0,r.jsx)(t.p,{children:"BLS signatures allow for many features and optimizations, such as non-interactive m/n thresholds, aggregation of all signatures in a block, and tricks like combining two coins into the same transaction. Private keys can be generated by using a 24-word mnemonic phrase, which users can use to back up and restore their wallets."}),"\n",(0,r.jsx)(t.p,{children:"A 24-word mnemonic phrase is used as entropy in order to generate a private BLS key. The recommended method of key backup is to store the 24-word phrase offline. Recovery can then be performed by entering the 24-word phrase. The private key is not required for recovery."}),"\n",(0,r.jsx)(t.p,{children:"In theory, wallet recovery could also be performed from the master private key alone. However, there are some caveats:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Chia Network Inc has not attempted this, and has no plans to attempt it. In fact, as far as we know, nobody has attempted it, so it is not guaranteed to work. It is not supported, and likely never will be supported. Use at your own risk"}),"\n",(0,r.jsx)(t.li,{children:"Because this is not supported, you would need to create your own wallet in order to perform this recovery"}),"\n",(0,r.jsxs)(t.li,{children:["Even after a successful wallet recovery, you would not be able to recover your 24-word mnemonic phrase. The phrase is used as entropy to generate a private key; a phrase ",(0,r.jsx)(t.em,{children:"cannot"})," be generated ",(0,r.jsx)(t.em,{children:"from"})," a private key"]}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:"The BLS master private key is stored in the OS keychain, which usually requires password authentication and is encrypted."}),"\n",(0,r.jsx)(t.admonition,{type:"note",children:(0,r.jsx)(t.p,{children:"In theory, wallet recovery should be possible on a new system by copying the keychain from a system on which the wallet has already been installed. However, this is not supported. The only supported method of wallet recovery is with the 24-word seed phrase."})}),"\n",(0,r.jsx)(t.p,{children:"The master private key can be used to derive child keys, which can further be used to derive child keys, etc. The number of levels can be infinite. BLS public keys can be combined to form a new public key, which can be used to validate aggregate signatures."}),"\n",(0,r.jsx)(t.p,{children:"Each time the wallet generates a new address to receive funds, it creates a new BLS private key. The farmer and pool only use the first key in the current codebase, but they can be updated to generate a new key every time a block is won, for additional privacy."}),"\n",(0,r.jsxs)(t.p,{children:["When it comes to getting paid, a program is created that uses one of the wallet BLS public keys. This program, called a ",(0,r.jsx)(t.em,{children:"puzzle"}),", is hashed to generate a puzzle hash. The puzzle hash is then converted to an address in bech32m format, for easy error correction and usability."]}),"\n",(0,r.jsx)(t.p,{children:"So an address is analogous to a wallet child BLS public key, the private key of which can be derived from the master seed."}),"\n",(0,r.jsx)("figure",{children:(0,r.jsx)("img",{src:"/img/keys/hd-keys.png",alt:"drawing"})}),"\n",(0,r.jsx)(t.h2,{id:"difference-between-chia-and-eip-2333",children:"Difference between Chia and EIP-2333"}),"\n",(0,r.jsxs)(t.p,{children:["Chia's plot format uses keys compliant with the ",(0,r.jsx)(t.a,{href:"https://datatracker.ietf.org/doc/draft-irtf-cfrg-bls-signature/",children:"IRTF CFRG BLS standard"}),". After Chia had already committed to this standard, a new optional change was introduced to the salt format."]}),"\n",(0,r.jsx)(t.p,{children:"Chia uses the following salt:"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:'"BLS-SIG-KEYGEN-SALT-" (i.e., an ASCII string comprising 20 octets)'})}),"\n",(0,r.jsx)(t.p,{children:"Whereas the optional change uses a slightly different salt:"}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:'H("BLS-SIG-KEYGEN-SALT-") (i.e., the hash of an ASCII string comprising 20 octets)'})}),"\n",(0,r.jsxs)(t.p,{children:["Both of these salts are described in the ",(0,r.jsx)(t.a,{href:"https://www.ietf.org/archive/id/draft-irtf-cfrg-bls-signature-05.html",children:"BLS signature specification"}),", which states:"]}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.code,{children:"For compatibility with prior versions of this document, implementations SHOULD allow applications to choose the salt value."})}),"\n",(0,r.jsx)(t.p,{children:"Therefore, the salt Chia uses is compatible with this specification."}),"\n",(0,r.jsx)(t.p,{children:"For your reference, here is the change that was introduced after Chia's plot format had been finalized:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{children:'  Procedure:\n   1. salt = "BLS-SIG-KEYGEN-SALT-"\n   2. SK = 0\n   3. while SK == 0:\n   4.     salt = H(salt)\n   5.     PRK = HKDF-Extract(salt, IKM || I2OSP(0, 1))\n   6.     OKM = HKDF-Expand(PRK, key_info || I2OSP(L, 2), L)\n   7.     SK = OS2IP(OKM) mod r\n   8. return SK\n\n   KeyGen is the RECOMMENDED way of generating secret keys, but its use\n   is not required for compatibility, and implementations MAY use a\n   different KeyGen procedure.  For security, such an alternative KeyGen\n   procedure MUST output SK that is statistically close to uniformly\n   random in the range 1 <= SK < r.\n'})}),"\n",(0,r.jsx)(t.h2,{id:"non-observer-vs-observer-keys",children:"Non-Observer vs Observer Keys"}),"\n",(0,r.jsx)(t.p,{children:"There are two ways in which child keys can be derived from parent keys: non-observer and observer (also called hardened and unhardened)."}),"\n",(0,r.jsxs)(t.p,{children:["Non-observer keys are the default, and only supported, method in the EIP-2333 spec. They are secure, since each key is cryptographically separated -- revealing one key has no impact on the security of its ancestors or siblings. However, non-observer keys are limited in functionality, because they can only be derived through private derivation. That is, a parent ",(0,r.jsx)(t.em,{children:"private"})," key can be used to derive a child ",(0,r.jsx)(t.em,{children:"private"})," key, but a parent ",(0,r.jsx)(t.em,{children:"public"})," key cannot be used to derive a child ",(0,r.jsx)(t.em,{children:"public"})," key."]}),"\n",(0,r.jsxs)(t.p,{children:["Observer keys do allow public derivation. This enables view-only wallets that support viewing ",(0,r.jsx)(t.em,{children:"all"})," of your public keys, using only the root (master) public key. This is what is usually done for Bitcoin Hierarchical Deterministic (HD) view-only wallets. It enables more privacy when compared to systems like Ethereum, which reuse the same address for all transactions."]}),"\n",(0,r.jsx)(t.p,{children:"One advantage of observer keys is tax calculation: if you use a different address for each transaction, you only need to give your accountant your parent public key, who can use it to derive all of your child addresses. This would not be possible with non-observer keys."}),"\n",(0,r.jsx)(t.p,{children:"The main security drawback of observer keys is that if you accidentally reveal a single child private key, along with the parent public key, then your parent private key and all sibling keys can be calculated as well."}),"\n",(0,r.jsx)(t.p,{children:"At the time of Chia's mainnet launch in March and May 2021, only non-observer keys were used. Beginning with the Light Wallet Beta release (December 2021), observer keys are supported -- and preferred -- for view only-wallet support. The first full release with built-in support for observer keys is 1.3 (February 2022)."})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8453:(e,t,s)=>{s.d(t,{R:()=>a,x:()=>o});var n=s(6540);const r={},i=n.createContext(r);function a(e){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function o(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),n.createElement(i.Provider,{value:t},e.children)}}}]);