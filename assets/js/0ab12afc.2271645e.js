"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[6869],{9012:(e,r,t)=>{t.r(r),t.d(r,{assets:()=>d,contentTitle:()=>i,default:()=>c,frontMatter:()=>s,metadata:()=>o,toc:()=>l});var a=t(5893),n=t(1151);const s={title:"Reference Farming Hardware",slug:"/reference-farming-hardware"},i="Reference Farming Hardware - Farming at Any Level",o={id:"farming/reference-farming-hardware",title:"Reference Farming Hardware",description:"Curious",source:"@site/docs/farming/reference-farming-hardware.md",sourceDirName:"farming",slug:"/reference-farming-hardware",permalink:"/reference-farming-hardware",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/farming/reference-farming-hardware.md",tags:[],version:"current",frontMatter:{title:"Reference Farming Hardware",slug:"/reference-farming-hardware"},sidebar:"tutorialSidebar",previous:{title:"Checking Farm Health",permalink:"/checking-farm-health"},next:{title:"Farming Considerations",permalink:"/farming-considerations"}},d={},l=[{value:"Curious",id:"curious",level:2},{value:"Hobbyist",id:"hobbyist",level:2},{value:"NAS",id:"nas",level:3},{value:"External Storage (USB) for multiple drives",id:"external-storage-usb-for-multiple-drives",level:3},{value:"Desktops with high amount of drive count",id:"desktops-with-high-amount-of-drive-count",level:3},{value:"Pro",id:"pro",level:2},{value:"Serious",id:"serious",level:2}];function h(e){const r={h1:"h1",h2:"h2",h3:"h3",p:"p",...(0,n.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(r.h1,{id:"reference-farming-hardware---farming-at-any-level",children:"Reference Farming Hardware - Farming at Any Level"}),"\n",(0,a.jsx)(r.h2,{id:"curious",children:"Curious"}),"\n",(0,a.jsx)(r.p,{children:"The easiest way to get started in Chia is by attaching a USB hard drive to a desktop computer, or installing a SATA hard drive. The minimum amount of storage needed to farm is only a single plot! Beginners should start with a few drives to make it worth running the farm, and earn a few dollars per month. You can you use your desktop computer to create the plots (see plotting). There are companies like Evergreen that make it one step easier and remove the plotting step by offering a pre-plotted drive and a mobile app. Plotting is going to be the limiting factor for curious farmers because their desktop or laptop may not have enough compute and temporary SSD storage that is suitable for plotting, but filling up a single drive with plots is fairly easy even for beginners."}),"\n",(0,a.jsx)("img",{src:"https://www.chia.net/wp-content/uploads/2023/04/Hard-Drive-Standard.webp",width:"300"}),"\n",(0,a.jsx)(r.h2,{id:"hobbyist",children:"Hobbyist"}),"\n",(0,a.jsx)(r.p,{children:"Once you get to a few hundred terabytes, think about a dedicated desktop computer for Chia farming, a NAS, or an external storage enclosure. A general rule of thumb is to look at the cost per slot (per drive) attached so you don\u2019t end up spending more money to store the disks than the disks themselves!"}),"\n",(0,a.jsx)("img",{src:"https://www.chia.net/wp-content/uploads/2023/04/nas-glass.jpg",width:"300"}),"\n",(0,a.jsx)(r.h3,{id:"nas",children:"NAS"}),"\n",(0,a.jsx)(r.p,{children:"A NAS, or networked attached storage, is a device dedicated to having hard drives included in a backplane and a lightweight CPU and DRAM. NAS serves storage through the network (as opposed to DAS, or direct-attached storage). NAS have a high number of drives in small space, and are extremely power efficient. The only downside is they tend to be more expensive than raw enclosures since they are made for consumer storage and applications."}),"\n",(0,a.jsx)(r.h3,{id:"external-storage-usb-for-multiple-drives",children:"External Storage (USB) for multiple drives"}),"\n",(0,a.jsx)(r.p,{children:"External storage bays that use USB can attach 5-8 drives with a single USB cable, and have integrated power and cooling (fans). These are great for a hobbyist to expand with their current computer hardware."}),"\n",(0,a.jsx)(r.h3,{id:"desktops-with-high-amount-of-drive-count",children:"Desktops with high amount of drive count"}),"\n",(0,a.jsx)(r.p,{children:"A standard full tower desktop can hold 8-12 3.5in HDDs. These cases are user friendly for anyone who has built a standard desktop PC, and installing HDDs with SATA cables and ATX power supplies doesn\u2019t require a ton of specialized computer experience."}),"\n",(0,a.jsx)(r.h2,{id:"pro",children:"Pro"}),"\n",(0,a.jsx)(r.p,{children:"Pros are shooting for over a petabyte of storage, where more advanced tactics come into play. These can include GPU plotting, HBAs (host bus adapters), and used enterprise storage servers. Used enterprise storage gear is a great place to start, since servers with high drive count can be found inexpensively on eBay and other used markets. Older JBODs that house 24-45 drives can be found for a few hundred dollars used. While these are cost-effective, they do require the farmer to learn about enterprise storage protocols and infrastructure like SAS. Pros generally mix consumer and enterprise gear to be ruthlessly cost-efficient with their purchases."}),"\n",(0,a.jsx)("img",{src:"https://www.chia.net/wp-content/uploads/2023/04/desktop-farmer.webp?",width:"300"}),"\n",(0,a.jsx)(r.h2,{id:"serious",children:"Serious"}),"\n",(0,a.jsx)(r.p,{children:'Serious Chia farmers that are going for multiple petabytes will start having to enter the world of server racks. Thankfully, data centers around the world have already engineered the best way to store an extremely large amount of storage in server racks. A serious farmer will be using JBODs. A JBOD, or "Just a bunch of disks" is a device dedicated to housing a large number of hard disk drives, and does not contain any integrated compute resources. A JBOD is typically made up of an enclosure, enclosure slots that identify each drive individually, a SAS expander and backplane, fans, and power supplies. All the disks in a JBOD can be accessed by a single SAS cable connected to a host server or desktop through a HBA (host bus adapter) which converts a PCIe slot to SAS. Serious farmers will put many of these JBODs in a rack to get extremely dense storage, which can achieve over 10 petabytes in a single rack using modern JBODs and high-capacity HDDs.'}),"\n",(0,a.jsx)("img",{src:"https://www.chia.net/wp-content/uploads/2023/04/Rack-Scael-Edit-2.webp",width:"300"})]})}function c(e={}){const{wrapper:r}={...(0,n.a)(),...e.components};return r?(0,a.jsx)(r,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},1151:(e,r,t)=>{t.d(r,{Z:()=>o,a:()=>i});var a=t(7294);const n={},s=a.createContext(n);function i(e){const r=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(r):{...r,...e}}),[r,e])}function o(e){let r;return r=e.disableParentContext?"function"==typeof e.components?e.components(n):e.components||n:i(e.components),a.createElement(s.Provider,{value:r},e.children)}}}]);