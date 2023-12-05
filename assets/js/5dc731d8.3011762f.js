"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[5646],{6234:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>h,contentTitle:()=>s,default:()=>l,frontMatter:()=>i,metadata:()=>a,toc:()=>c});var o=t(5893),r=t(1151);const i={title:"Node Syncing",slug:"/node-syncing"},s="What to Do",a={id:"reference-client/node-syncing",title:"Node Syncing",description:"Port forwarding port 8444 can solve many sync issues and it helps improve Chia's network health.",source:"@site/docs/reference-client/node-syncing.md",sourceDirName:"reference-client",slug:"/node-syncing",permalink:"/node-syncing",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/reference-client/node-syncing.md",tags:[],version:"current",frontMatter:{title:"Node Syncing",slug:"/node-syncing"},sidebar:"tutorialSidebar",previous:{title:"Check if Things are Working",permalink:"/check-if-things-are-working"},next:{title:"Key Management",permalink:"/chia-key-management"}},h={},c=[{value:"Port Forwarding Settings",id:"port-forwarding-settings",level:2},{value:"Why forward port 8444?",id:"why-forward-port-8444",level:2},{value:"Speed up connecting to nodes",id:"speed-up-connecting-to-nodes",level:2},{value:"Dealing With Carrier-Grade NAT",id:"dealing-with-carrier-grade-nat",level:2}];function d(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"Port forwarding port 8444 can solve many sync issues and it helps improve Chia's network health."}),"\n",(0,o.jsxs)(n.p,{children:["Port 8444 is the ",(0,o.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Port_%28computer_networking%29",children:"port"})," through which other Chia computers can communicate with your PC. When you set up port forwarding on port 8444, the Chia software on your computer can quickly talk to other PCs, link up, and start downloading and syncing with the Chia blockchain."]}),"\n",(0,o.jsx)(n.p,{children:"The network is undergoing rapid growth and expansion. Many of the newly arrived Chia peers (computers) do not open up port 8444. It makes it very hard for the network. So please port forward on port 8444!"}),"\n",(0,o.jsxs)(n.p,{children:["Use ",(0,o.jsx)(n.a,{href:"https://portchecker.co/",children:"this port checker"})," to check if your router's port 8444 is closed."]}),"\n",(0,o.jsx)(n.h1,{id:"what-to-do",children:"What to Do"}),"\n",(0,o.jsxs)(n.p,{children:["Port forwarding is done on your router. How you set it up depends on your router's make and model. Look through your router's manual or just search for \"",(0,o.jsx)(n.code,{children:"<your router name and model>"}),' how to port forward" to get started.']}),"\n",(0,o.jsx)(n.p,{children:"When you port forward you want to allow outside IP addresses to connect to your main node (computer) through port 8444 to the Chia software."}),"\n",(0,o.jsx)(n.h2,{id:"port-forwarding-settings",children:"Port Forwarding Settings"}),"\n",(0,o.jsx)(n.p,{children:"Most routers will ask you from where you are allowing and to what you are connecting to. You want to set up port forwarding to allow any outside connection to connect to the IP address of your main node on your network through port 8444. Router manufacturers might call the settings different things, but the concept is always the same: Outside computers connecting through port 8444 to your computer."}),"\n",(0,o.jsx)(n.p,{children:"Here are the settings most routers will ask for:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["Set connection type to ",(0,o.jsx)(n.em,{children:"TCP"})," or ",(0,o.jsx)(n.em,{children:"TCP & UDP"})]}),"\n",(0,o.jsx)(n.li,{children:'Destination (or Forwarding) IP address - This is your main node (computer) IP address on your internal network; search online on how to do this for your type of computer. If you search for "what is my IP address" it will give you your external IP address, this is not the one you want.'}),"\n",(0,o.jsxs)(n.li,{children:["Originating (or From) IP address - Set this to all or sometimes just an asterisk may be used ",(0,o.jsx)(n.code,{children:"*"})]}),"\n"]}),"\n",(0,o.jsx)(n.h2,{id:"why-forward-port-8444",children:"Why forward port 8444?"}),"\n",(0,o.jsx)(n.p,{children:"All peers (computers) with a closed port 8444 are completely dependent on pc peers with open port 8444. They are the only PCs they can talk to. If you got 1,000 nodes with an open port 8444, but 20,000 nodes with a closed port 8444, trying to sync, it will only just be able to theoretically have enough IP's estimated 3,000 can sync at a time, while the other wait for another open Chia user with open port 8444. Right now (Mid April '20) it seems that number is even much worse. And it causes a scenario where there just isn't enough open port 8444 peers to serve all the closed port 8444 peers. The only way around this is to ensure that you got an open port 8444."}),"\n",(0,o.jsx)(n.p,{children:"If you somehow are able to open up your port 8444 you will quickly have peers connecting to you and have a much easier time to get connections established."}),"\n",(0,o.jsx)(n.h2,{id:"speed-up-connecting-to-nodes",children:"Speed up connecting to nodes"}),"\n",(0,o.jsx)(n.p,{children:"If you would like to speed up connecting to other nodes and syncing, add one of these introducer nodes:"}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsxs)(n.li,{children:["North Asia ",(0,o.jsx)(n.code,{children:"introducer-ap-northeast-1.chia.net:8444"})]}),"\n",(0,o.jsxs)(n.li,{children:["South Asia ",(0,o.jsx)(n.code,{children:"introducer-ap-southeast-1.chia.net:8444"})]}),"\n",(0,o.jsxs)(n.li,{children:["Western North America: ",(0,o.jsx)(n.code,{children:"introducer-us-west-2.chia.net:8444"})]}),"\n",(0,o.jsxs)(n.li,{children:["Eastern North America ",(0,o.jsx)(n.code,{children:"introducer-us-east-1.chia.net:8444"})]}),"\n",(0,o.jsxs)(n.li,{children:["Europe: ",(0,o.jsx)(n.code,{children:"introducer-eu-west-2.chia.net:8444"})]}),"\n"]}),"\n",(0,o.jsx)(n.p,{children:"There is a public node share the available 8444 peers every hour."}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:(0,o.jsx)(n.a,{href:"https://chia.keva.app",children:"chia.keva.app"})}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["These can be added in the GUI via the button, or via the CLI with ",(0,o.jsx)(n.code,{children:"chia show -a PEER_ADDRESS:PORT"})," where ",(0,o.jsx)(n.code,{children:"PORT"})," will usually be 8444."]}),"\n",(0,o.jsx)(n.h1,{id:"detailed-explanation",children:"Detailed explanation"}),"\n",(0,o.jsxs)(n.p,{children:["A regular pc can communicate ",(0,o.jsx)(n.strong,{children:"out"})," with endless ports-- if the user is sending a signal out -- pc opens a port -- signal goes out, pc closes the port.\nChia uses port 8444 as instant verified communication. So an open port can allow instant communication and start the blockchain sync. Signal comes in on port 8444- that Chia pc is verified, then ",(0,o.jsx)(n.strong,{children:"both"}),' user\'s pc, opens their own "communication ports ex port 8421" and that new user can now sync and now they are linked together forming part of Chia mesh.']}),"\n",(0,o.jsx)(n.p,{children:"If the users port 8444 is closed, the users pc has to start sending multiple signals out and hope that a pc with open port 8444 will link with them, then the sync starts. (1) pc can only link up a few pc and with so many other Chia users coming on board, they all have to wait. Keep in mind, Chia is built on a mesh network, the blockchain is shared among all the users, not from central pc."}),"\n",(0,o.jsx)(n.h2,{id:"dealing-with-carrier-grade-nat",children:"Dealing With Carrier-Grade NAT"}),"\n",(0,o.jsxs)(n.p,{children:["Opened port 8444 on your router but still not getting connections? With the exhaustion of the IPv4 space, it's increasingly common for ISPs to use ",(0,o.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Carrier-grade_NAT",children:"Carrier-Grade NAT"})," (CGN, CG-NAT, NAT444) to put multiple customers behind a single IP address. In this case, even if you open 8444 on your router, other nodes will not be able to connect to you. There are a couple options:"]}),"\n",(0,o.jsxs)(n.ol,{children:["\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:'Ask your ISP for a dedicated IP address. They\'ll probably want more money, and may require you to upgrade to a "business" plan.'}),"\n"]}),"\n",(0,o.jsxs)(n.li,{children:["\n",(0,o.jsx)(n.p,{children:"Establish a VPN tunnel through the NAT to a cloud server with a public IP address. It's easier than it sounds, and can cost as little as $3-5 a month for a cheap cloud server (some common cloud server providers: AWS, GCP, Digital Ocean, Vultr, Hetzner, Linode). When selecting a provider and server size, pay careful attention to bandwidth; a Chia fullnode isn't too demanding, but can require several GB per day. 1 TB per month is typical of lower-cost VPSs and should be plenty (do keep an eye on it though, bandwidth overage costs can be expensive!)."}),"\n"]}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["Setting up a VPN used to be a daunting task, but ",(0,o.jsx)(n.a,{href:"https://www.wireguard.com",children:"Wireguard"})," has greatly simplified it. The summary is you run Wireguard on both your home server and the cloud server:"]}),"\n",(0,o.jsxs)(n.ul,{children:["\n",(0,o.jsx)(n.li,{children:"the cloud server is configured to listen for VPN connections from your home server, and route all traffic incoming on 8444 to your home server, while also routing outgoing traffic from your home server to the internet."}),"\n",(0,o.jsx)(n.li,{children:'the home server is configured to route all internet traffic (but not local) through the cloud server, while periodically sending a "keepalive" packet to ensure the connection stays open.'}),"\n"]}),"\n",(0,o.jsxs)(n.p,{children:["Here is a more detailed write-up with ",(0,o.jsx)(n.a,{href:"https://www.kmr.me/posts/wireguard/",children:"example wireguard configuration"}),"."]})]})}function l(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>a,a:()=>s});var o=t(7294);const r={},i=o.createContext(r);function s(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);