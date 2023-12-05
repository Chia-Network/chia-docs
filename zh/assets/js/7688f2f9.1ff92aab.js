"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[2610],{3434:(e,d,s)=>{s.r(d),s.d(d,{assets:()=>o,contentTitle:()=>l,default:()=>x,frontMatter:()=>n,metadata:()=>i,toc:()=>c});var t=s(5893),r=s(1151);const n={title:"Logging Reference",slug:"/logging-reference"},l=void 0,i={id:"reference-client/logging-reference",title:"Logging Reference",description:"Chia blockchain nodes consist of several components that each handle different aspects of farming, harvesting, the wallet and general management of a node. Each component creates entries in a single log file debug.log.",source:"@site/docs/reference-client/logging-reference.md",sourceDirName:"reference-client",slug:"/logging-reference",permalink:"/zh/logging-reference",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/reference-client/logging-reference.md",tags:[],version:"current",frontMatter:{title:"Logging Reference",slug:"/logging-reference"},sidebar:"tutorialSidebar",previous:{title:"Key Management",permalink:"/zh/chia-key-management"},next:{title:"Password Protected Keys",permalink:"/zh/passphrases-protected-keys"}},o={},c=[{value:"Log file Location:",id:"log-file-location",level:2},{value:"Log File Management:",id:"log-file-management",level:2},{value:"Log Detail Level:",id:"log-detail-level",level:2},{value:"Change the Log Level Output:",id:"change-the-log-level-output",level:2},{value:"Node Components:",id:"node-components",level:2},{value:"Log Message Format:",id:"log-message-format",level:2},{value:"Log Messages Confirming Node Health:",id:"log-messages-confirming-node-health",level:2},{value:"Other Normal Log Messages:",id:"other-normal-log-messages",level:2}];function h(e){const d={a:"a",code:"code",h2:"h2",li:"li",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",ul:"ul",...(0,r.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(d.p,{children:["Chia blockchain nodes consist of several components that each handle different aspects of farming, harvesting, the wallet and general management of a node. Each component creates entries in a single log file ",(0,t.jsx)(d.code,{children:"debug.log"}),"."]}),"\n",(0,t.jsx)(d.h2,{id:"log-file-location",children:"Log file Location:"}),"\n",(0,t.jsxs)(d.table,{children:[(0,t.jsx)(d.thead,{children:(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.th,{children:"OS"}),(0,t.jsx)(d.th,{children:"Location"})]})}),(0,t.jsxs)(d.tbody,{children:[(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"Linux"}),(0,t.jsx)(d.td,{children:(0,t.jsx)(d.code,{children:"~/.chia/mainnet/log/debug.log"})})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"Windows"}),(0,t.jsxs)(d.td,{children:[(0,t.jsx)(d.code,{children:"%systemdrive% %homepath% \\.chia\\mainnet\\debug.log"})," (",(0,t.jsx)(d.code,{children:"C:\\Users\\<username>\\.chia\u2026"}),")"]})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"MacOS"}),(0,t.jsx)(d.td,{children:(0,t.jsx)(d.code,{children:"/Users/<username>/.chia/mainnet/log/debug.log"})})]})]})]}),"\n",(0,t.jsx)(d.h2,{id:"log-file-management",children:"Log File Management:"}),"\n",(0,t.jsx)(d.p,{children:"By default, Chia allows debug.log to grow to 20MB, and then rotates the file by closing debug.log, renaming it to debug.log.1, and renames any existing older log files to debug.log.x, to a maximum of 7 old log files. If a log rotation is required and all 7 old log files exist, the oldest log file is overwritten with the next earliest file; resulting in a maximum of 160MB of the most recent messages being stored."}),"\n",(0,t.jsx)(d.h2,{id:"log-detail-level",children:"Log Detail Level:"}),"\n",(0,t.jsxs)(d.p,{children:["Chia is shipped with the debug.log only containing messages at the WARN or ERROR level. Many of the messages needed to fully monitor a node are only visible at the INFO level. Changes to the logging level can be done in the ",(0,t.jsx)(d.code,{children:"config.yaml"})," file in the ",(0,t.jsx)(d.code,{children:"mainnet/config"})," folder."]}),"\n",(0,t.jsx)(d.h2,{id:"change-the-log-level-output",children:"Change the Log Level Output:"}),"\n",(0,t.jsx)(d.p,{children:"You are looking for the first reference to logging in the file that looks like this:"}),"\n",(0,t.jsx)(d.pre,{children:(0,t.jsx)(d.code,{children:"farmer:\n  logging: &id001\n    log_filename: log/debug.log\n    log_level: WARN\n    log_stdout: false\n"})}),"\n",(0,t.jsxs)(d.p,{children:["Change the ",(0,t.jsx)(d.code,{children:"log_level"})," to ",(0,t.jsx)(d.code,{children:"INFO"}),", save the file, and restart the node."]}),"\n",(0,t.jsx)(d.h2,{id:"node-components",children:"Node Components:"}),"\n",(0,t.jsxs)(d.table,{children:[(0,t.jsx)(d.thead,{children:(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.th,{children:"Component"}),(0,t.jsx)(d.th,{children:"Function"})]})}),(0,t.jsxs)(d.tbody,{children:[(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"farmer_server"}),(0,t.jsx)(d.td,{children:"Signage stuff about signs and things"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"harvester_server"}),(0,t.jsx)(d.td,{children:"Gathers and shares plot information"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"timelord_server"}),(0,t.jsx)(d.td,{children:"Manages Verifiable Delay Functions for the node"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"wallet_server"}),(0,t.jsx)(d.td,{children:"Controls wallet functions"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"This component manages the node"})]})]})]}),"\n",(0,t.jsx)(d.h2,{id:"log-message-format",children:"Log Message Format:"}),"\n",(0,t.jsxs)(d.table,{children:[(0,t.jsx)(d.thead,{children:(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.th,{children:"Field"}),(0,t.jsx)(d.th,{children:"Content"})]})}),(0,t.jsxs)(d.tbody,{children:[(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"Date/time"}),(0,t.jsx)(d.td,{children:"in ISO format, in local timezone"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"Node Component"}),(0,t.jsx)(d.td,{children:"see the list above"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"Log Level"}),(0,t.jsx)(d.td,{children:"ERROR, WARN, INFO"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"Directional Arrow"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"Message"}),(0,t.jsx)(d.td,{children:"see below"})]})]})]}),"\n",(0,t.jsx)(d.h2,{id:"log-messages-confirming-node-health",children:"Log Messages Confirming Node Health:"}),"\n",(0,t.jsx)(d.pre,{children:(0,t.jsx)(d.code,{children:"09:55:43.847 harvester src.harvester.harvester : INFO     1 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.13772 s. Total 100 plots\n09:55:52.737 harvester src.harvester.harvester : INFO     3 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.43679 s. Total 100 plots\n09:56:01.646 harvester src.harvester.harvester : INFO     2 plots were eligible for farming 2d8b1c58a0... Found 0 proofs. Time: 0.14055 s. Total 100 plots\n"})}),"\n",(0,t.jsxs)(d.p,{children:[(0,t.jsx)(d.code,{children:"x plots were eligible for farming"})," \u2013 This message from the harvester shows how the node responds to challenges. The ",(0,t.jsx)(d.code,{children:"x"})," value shows how many plots passed the initial filter, ",(0,t.jsx)(d.a,{href:"/faq#what-is-the-plot-filter-and-why-didnt-my-plot-pass-it",children:"more on filters here"}),"."]}),"\n",(0,t.jsxs)(d.ul,{children:["\n",(0,t.jsxs)(d.li,{children:["The block prefix is shown, and the ",(0,t.jsx)(d.code,{children:"Found y proofs."})," The ",(0,t.jsx)(d.code,{children:"y"})," value shows how many plots were accepted as proofs, and usually the value is zero. Most of the time if there is a proof you win, but not always as described in the ",(0,t.jsx)(d.a,{href:"/faq#is-it-possible-to-have-a-proof-but-not-get-a-reward",children:"FAQ page"}),"."]}),"\n",(0,t.jsxs)(d.li,{children:["Next is ",(0,t.jsx)(d.code,{children:"Time: x.xxx s"})," which shows how long the node took to respond to the challenge. A recommended response time is less than 5 seconds. If this value is greater than 3 seconds a warning will be displayed in the GUI."]}),"\n",(0,t.jsxs)(d.li,{children:["Finally ",(0,t.jsx)(d.code,{children:"Total x plots"})," shows the number of plots recognized by the node. If this doesn't look right ",(0,t.jsx)(d.a,{href:"/faq#how-do-i-know-if-my-plots-are-ok",children:"check your plots are valid"}),"."]}),"\n"]}),"\n",(0,t.jsxs)(d.p,{children:["Another log message you will see is ",(0,t.jsx)(d.code,{children:"Updated Wallet peak to height x, weight y"})," - This message is from the ",(0,t.jsx)(d.code,{children:"wallet_blockchain"})," component. Value ",(0,t.jsx)(d.code,{children:"x"})," is the current height of the blockchain and should match the Height shown in the ",(0,t.jsx)(d.code,{children:"chia show -s"})," command. This indicates that the node wallet is fully synced with the network. If that is not the case ",(0,t.jsx)(d.a,{href:"/faq#why-is-my-wallet-not-synced-why-can-i-not-connect-to-wallet-from-the-gui",children:"check here for a common solution"}),"."]}),"\n",(0,t.jsx)(d.h2,{id:"other-normal-log-messages",children:"Other Normal Log Messages:"}),"\n",(0,t.jsxs)(d.table,{children:[(0,t.jsx)(d.thead,{children:(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.th,{children:"Component"}),(0,t.jsx)(d.th,{children:"Message"}),(0,t.jsx)(d.th,{children:"Direction"}),(0,t.jsx)(d.th,{children:"Destination"}),(0,t.jsx)(d.th,{children:"Cross component"}),(0,t.jsx)(d.th,{children:"Comment"})]})}),(0,t.jsxs)(d.tbody,{children:[(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"mempool_manager"}),(0,t.jsx)(d.td,{children:"add_spendbundle took x seconds"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"mempool_manager"}),(0,t.jsx)(d.td,{children:"It took x to pre validate transaction"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node"}),(0,t.jsx)(d.td,{children:"Added unfinished_block x, not farmed by us"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node"}),(0,t.jsx)(d.td,{children:"Already compactified block:"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node"}),(0,t.jsx)(d.td,{children:"Duplicate compact proof. Height: x"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node"}),(0,t.jsx)(d.td,{children:"Finished signage point x/64:"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node"}),(0,t.jsx)(d.td,{children:"Scanning the blockchain for uncompact blocks."}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node"}),(0,t.jsx)(d.td,{children:"Updated peak to height x"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"new_compact_vdf"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"new_peak"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"new_peak_timelord"}),(0,t.jsx)(d.td,{children:"to"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"from timelord_server"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"new_peak_wallet"}),(0,t.jsx)(d.td,{children:"to"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"from wallet_server"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"new_signage_point"}),(0,t.jsx)(d.td,{children:"to"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"from farmer_server"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"new_signage_point_or_end_of_sub_slot"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"new_transaction"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"new_unfinished_block"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"new_unfinished_block_timelord"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"request_block"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"request_block_header"}),(0,t.jsx)(d.td,{children:"from"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"to wallet_server"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"request_compact_vdf"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"request_compact_proof_of_time"}),(0,t.jsx)(d.td,{children:"to"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"from timelord_server"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"request_signage_point_or_end_of_sub_slot"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"request_transaction"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"request_unfinished_block"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"respond_block"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"respond_compact_vdf"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"respond_signage_point"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"respond_transaction"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node_server"}),(0,t.jsx)(d.td,{children:"respond_unfinished_block"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"peer"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"wallet_server"}),(0,t.jsx)(d.td,{children:"request_block_header"}),(0,t.jsx)(d.td,{children:"to"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"from full_node"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"wallet_server"}),(0,t.jsx)(d.td,{children:"respond_block_header"}),(0,t.jsx)(d.td,{children:"from"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"to full_node"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"wallet_server"}),(0,t.jsx)(d.td,{children:"new_peak_wallet"}),(0,t.jsx)(d.td,{children:"from"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"to full_node"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"wallet_blockchain"}),(0,t.jsx)(d.td,{children:"Updated Wallet peak to height x, weight y"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"timelord_server"}),(0,t.jsx)(d.td,{children:"new_peak_timelord"}),(0,t.jsx)(d.td,{children:"from"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"to full_node"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"timelord_server"}),(0,t.jsx)(d.td,{children:"new_unfinished_block_timelord"}),(0,t.jsx)(d.td,{children:"from"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"to full_node"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"timelord_launcher"}),(0,t.jsx)(d.td,{children:"VDF client x: VDF Client: Discriminant ="}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"VDF Client"}),(0,t.jsx)(d.td,{children:"Sending Proof, Sent Proof, Stopped everything!"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"harvester_server"}),(0,t.jsx)(d.td,{children:"farming_info"}),(0,t.jsx)(d.td,{children:"to/from"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"harvester_server"}),(0,t.jsx)(d.td,{children:"new_signage_point_harvester"}),(0,t.jsx)(d.td,{children:"from"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"to farmer_server"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"harvester"}),(0,t.jsx)(d.td,{children:"x plots were eligible for farming"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"plot_tools"}),(0,t.jsx)(d.td,{children:"Loaded a total of x plots of size y in z seconds"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"plot_tools"}),(0,t.jsx)(d.td,{children:"Searching directories"}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"farmer_server"}),(0,t.jsx)(d.td,{children:"new_signage_point"}),(0,t.jsx)(d.td,{children:"from"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"to full_node"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"farmer_server"}),(0,t.jsx)(d.td,{children:"farming_info"}),(0,t.jsx)(d.td,{children:"from"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"to full_node"}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"farmer_server"}),(0,t.jsx)(d.td,{children:"new_signage_point_harvester"}),(0,t.jsx)(d.td,{children:"to"}),(0,t.jsx)(d.td,{children:"localhost"}),(0,t.jsx)(d.td,{children:"from harvester"}),(0,t.jsx)(d.td,{})]})]})]}),"\n",(0,t.jsxs)(d.table,{children:[(0,t.jsx)(d.thead,{children:(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.th,{children:"Source"}),(0,t.jsx)(d.th,{children:"Level"}),(0,t.jsx)(d.th,{children:"Message"}),(0,t.jsx)(d.th,{children:"Description"})]})}),(0,t.jsxs)(d.tbody,{children:[(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"daemon asyncio"}),(0,t.jsx)(d.td,{children:"ERROR"}),(0,t.jsxs)(d.td,{children:["Task exception was never retrieved future: ",(0,t.jsx)(d.code,{children:"<Task finished coro=<WebSocketServer.statechanged() done, defined at src\\daemon\\server.py:316> exception=ValueError('list.remove(x): x not in list')>"})]}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node asyncio"}),(0,t.jsx)(d.td,{children:"ERROR"}),(0,t.jsxs)(d.td,{children:["SSL error in data received protocol: ",(0,t.jsx)(d.code,{children:"<asyncio.sslproto.SSLProtocol object at 0x7f762544a8>"})]}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node full_node_server"}),(0,t.jsx)(d.td,{children:"ERROR"}),(0,t.jsxs)(d.td,{children:["Exception: Failed to fetch block ",(0,t.jsx)(d.code,{children:"N"})," from {'host': ",(0,t.jsx)(d.code,{children:"IP ADDRESS"}),", 'port': 8444}, timed out, {'host': ",(0,t.jsx)(d.code,{children:"IP ADDRESS"}),", 'port': 8444}."]}),(0,t.jsx)(d.td,{children:"Peer disconnected, other peer connections will take over"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node full_node_server"}),(0,t.jsx)(d.td,{children:"ERROR"}),(0,t.jsxs)(d.td,{children:["Exception: ",(0,t.jsx)(d.code,{children:"<class 'concurrent.futures._base.CancelledError'>"}),", closing connection None."]}),(0,t.jsx)(d.td,{children:"Peer disconnected"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node full_node_server"}),(0,t.jsx)(d.td,{children:"WARNING"}),(0,t.jsxs)(d.td,{children:["[Errno 32] Broken pipe ",(0,t.jsx)(d.code,{children:"IP Address"})]}),(0,t.jsx)(d.td,{children:"Peer disconnected"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node full_node_server"}),(0,t.jsx)(d.td,{children:"WARNING"}),(0,t.jsxs)(d.td,{children:["Cannot write to closing transport ",(0,t.jsx)(d.code,{children:"IP Address"})]}),(0,t.jsx)(d.td,{children:"Peer disconnected"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"harvester src.plotting.plot_tools"}),(0,t.jsx)(d.td,{children:"WARNING"}),(0,t.jsxs)(d.td,{children:["Not farming plot ",(0,t.jsx)(d.code,{children:"plotfilename"}),". Size is ",(0,t.jsx)(d.code,{children:"filesize"})," GiB, but expected at least: 99.06 GiB. We assume the file is being copied."]}),(0,t.jsx)(d.td,{children:"Periodic scan for new plots have discovered partial file - OK if you are in the middle of copying a file"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"harvester src.plotting.plot_tools"}),(0,t.jsx)(d.td,{children:"WARNING"}),(0,t.jsxs)(d.td,{children:["Directory: ",(0,t.jsx)(d.code,{children:"Dir1"})," does not exist."]}),(0,t.jsxs)(d.td,{children:["One of your monitored plot folders is no longer accessible - eg external drive offline - if permanent remove from GUI or ",(0,t.jsx)(d.code,{children:"chia plots remove -d <Dir1>"})]})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"harvester src.plotting.plot_tools"}),(0,t.jsx)(d.td,{children:"WARNING"}),(0,t.jsxs)(d.td,{children:["Have multiple copies of the plot ",(0,t.jsx)(d.code,{children:"plotfilename"}),", not adding it."]}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"harvester src.plotting.plot_tools"}),(0,t.jsx)(d.td,{children:"INFO"}),(0,t.jsxs)(d.td,{children:["Not checking subdirectory ",(0,t.jsx)(d.code,{children:"Dir1/directory"}),", subdirectories not added by default"]}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node full_node_server"}),(0,t.jsx)(d.td,{children:"INFO"}),(0,t.jsxs)(d.td,{children:["Connection closed: ",(0,t.jsx)(d.code,{children:"IP Address"}),", node id: ",(0,t.jsx)(d.code,{children:"hex"})]}),(0,t.jsx)(d.td,{children:"Peer disconnected"})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node src.full_node.full_node"}),(0,t.jsx)(d.td,{children:"INFO"}),(0,t.jsxs)(d.td,{children:["\u23f2\ufe0f Finished signage point ",(0,t.jsx)(d.code,{children:"N"}),"/64: ",(0,t.jsx)(d.code,{children:"hex"})]}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"full_node src.full_node.full_node"}),(0,t.jsx)(d.td,{children:"INFO"}),(0,t.jsxs)(d.td,{children:["Added unfinished_block ",(0,t.jsx)(d.code,{children:"hex"}),", not farmed"]}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"harvester src.plotting.plot_tools"}),(0,t.jsx)(d.td,{children:"INFO"}),(0,t.jsxs)(d.td,{children:["Searching directories [",(0,t.jsx)(d.code,{children:"Dir1"}),",",(0,t.jsx)(d.code,{children:"Dir2"}),"]"]}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"harvester src.plotting.plot_tools"}),(0,t.jsx)(d.td,{children:"INFO"}),(0,t.jsxs)(d.td,{children:["Loaded a total of ",(0,t.jsx)(d.code,{children:"N"})," plots of size ",(0,t.jsx)(d.code,{children:"size"})," TiB, in ",(0,t.jsx)(d.code,{children:"time"})," seconds"]}),(0,t.jsx)(d.td,{})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"harvester src.harvester.harvester"}),(0,t.jsx)(d.td,{children:"INFO"}),(0,t.jsxs)(d.td,{children:[(0,t.jsx)(d.code,{children:"X"})," plots were eligible for farming ",(0,t.jsx)(d.code,{children:"hex"}),"... Found ",(0,t.jsx)(d.code,{children:"Y"})," proofs. Time: ",(0,t.jsx)(d.code,{children:"Time"})," s. Total ",(0,t.jsx)(d.code,{children:"Z"})," plots"]}),(0,t.jsxs)(d.td,{children:["This is a vital message and should be seen at regular intervals. Note that ",(0,t.jsx)(d.code,{children:"Time"})," is ideally < 1s. If drive is in sleep mode, may show ~10 seconds, and should be prevented"]})]}),(0,t.jsxs)(d.tr,{children:[(0,t.jsx)(d.td,{children:"wallet src.wallet.wallet_blockchain"}),(0,t.jsx)(d.td,{children:"INFO"}),(0,t.jsxs)(d.td,{children:["\ud83d\udcb0 Updated wallet peak to height ",(0,t.jsx)(d.code,{children:"HEIGHT"}),", weight ",(0,t.jsx)(d.code,{children:"WEIGHT"}),","]}),(0,t.jsx)(d.td,{})]})]})]})]})}function x(e={}){const{wrapper:d}={...(0,r.a)(),...e.components};return d?(0,t.jsx)(d,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},1151:(e,d,s)=>{s.d(d,{Z:()=>i,a:()=>l});var t=s(7294);const r={},n=t.createContext(r);function l(e){const d=t.useContext(n);return t.useMemo((function(){return"function"==typeof e?e(d):{...d,...e}}),[d,e])}function i(e){let d;return d=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:l(e.components),t.createElement(n.Provider,{value:d},e.children)}}}]);