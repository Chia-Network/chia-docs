"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[1609],{7421:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>a,default:()=>l,frontMatter:()=>i,metadata:()=>d,toc:()=>h});var o=t(5893),s=t(1151);const i={title:"Headless Node",slug:"/headless-node"},a="Setup",d={id:"reference-client/headless-node",title:"Headless Node",description:"Exposing a Chia daemon to the network is an advanced configuration. This allows other computers to communicate with the Chia daemon, including the ability to create transactions and send XCH.",source:"@site/docs/reference-client/headless-node.md",sourceDirName:"reference-client",slug:"/headless-node",permalink:"/headless-node",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/reference-client/headless-node.md",tags:[],version:"current",frontMatter:{title:"Headless Node",slug:"/headless-node"},sidebar:"tutorialSidebar",previous:{title:"Password Protected Keys",permalink:"/passphrases-protected-keys"},next:{title:"Coin Selection",permalink:"/coin-selection"}},r={},h=[{value:"On the daemon host",id:"on-the-daemon-host",level:2},{value:"Expose the daemon to the network",id:"expose-the-daemon-to-the-network",level:3},{value:"Copy the daemon&#39;s cert files",id:"copy-the-daemons-cert-files",level:3},{value:"On the GUI host",id:"on-the-gui-host",level:2},{value:"Reference the daemon&#39;s cert files",id:"reference-the-daemons-cert-files",level:3},{value:"GUI Client",id:"gui-client",level:2},{value:"Can the GUI find the config folder?",id:"can-the-gui-find-the-config-folder",level:3},{value:"Can the GUI find the remote daemon&#39;s certs?",id:"can-the-gui-find-the-remote-daemons-certs",level:3},{value:"Connectivity",id:"connectivity",level:2},{value:"Has the daemon been bound to a routable IP address?",id:"has-the-daemon-been-bound-to-a-routable-ip-address",level:3},{value:"Is the daemon&#39;s port opened on the firewall?",id:"is-the-daemons-port-opened-on-the-firewall",level:3},{value:"Is VMWare Plugin Service bound to daemon port?",id:"is-vmware-plugin-service-bound-to-daemon-port",level:3}];function c(e){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",img:"img",p:"p",pre:"pre",strong:"strong",...(0,s.a)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(n.p,{children:"Exposing a Chia daemon to the network is an advanced configuration. This allows other computers to communicate with the Chia daemon, including the ability to create transactions and send XCH."}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsxs)(n.strong,{children:["If you do not know how to configure and properly secure a computer network ",(0,o.jsx)(n.em,{children:"do not"})," use a remote daemon."]})}),"\n",(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.em,{children:"Never"})," expose the Chia daemon to the internet."]}),"\n",(0,o.jsx)(n.h1,{id:"setup",children:"Setup"}),"\n",(0,o.jsx)(n.p,{children:"The following instructions are for a Linux-based farmer (daemon host) and Windows GUI (main node). The same concept applies to other OS combinations."}),"\n",(0,o.jsx)(n.h2,{id:"on-the-daemon-host",children:"On the daemon host"}),"\n",(0,o.jsx)(n.h3,{id:"expose-the-daemon-to-the-network",children:"Expose the daemon to the network"}),"\n",(0,o.jsxs)(n.p,{children:["In ",(0,o.jsx)(n.code,{children:"config.yaml"}),", change ",(0,o.jsx)(n.code,{children:"self_hostname"})," from ",(0,o.jsx)(n.code,{children:"localhost"})," to ",(0,o.jsx)(n.code,{children:"0.0.0.0"}),". This binds the daemon to all IPv4 addresses on the local machine."]}),"\n",(0,o.jsxs)(n.p,{children:["Next, open the port that the daemon is listening on (55400 by default). The UI assumes that the daemon is already running and it will ",(0,o.jsx)(n.em,{children:"not"})," attempt to start a remote daemon. Using ",(0,o.jsx)(n.a,{href:"https://help.ubuntu.com/community/UFW",children:"ufw"})," and restricting traffic to just the UI's host:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"sudo ufw allow from <IP of UI machine> to any port 55400 proto tcp\n"})}),"\n",(0,o.jsx)(n.h3,{id:"copy-the-daemons-cert-files",children:"Copy the daemon's cert files"}),"\n",(0,o.jsx)(n.p,{children:"To secure their connection, the GUI will need the daemon's certificates. Copy these files to the Windows machine:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"~/.chia/mainnet/config/ssl/daemon/private_daemon.crt\n~/.chia/mainnet/config/ssl/daemon/private_daemon.key\n"})}),"\n",(0,o.jsx)(n.h2,{id:"on-the-gui-host",children:"On the GUI host"}),"\n",(0,o.jsx)(n.h3,{id:"reference-the-daemons-cert-files",children:"Reference the daemon's cert files"}),"\n",(0,o.jsx)(n.p,{children:"Place the daemon's cert files, copied earlier, in the following location:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"~/.chia/mainnet/config/ssl/ui/\n~/.chia/mainnet/config/ssl/ui/\n"})}),"\n",(0,o.jsxs)(n.p,{children:["Find the ",(0,o.jsx)(n.code,{children:"ui"})," section in ",(0,o.jsx)(n.code,{children:"config.yaml"})," and specify the following settings:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-yaml",children:"daemon_host: <name or IP of the daemon host>\ndaemon_port: 55400\ndaemon_ssl:\n  private_crt: config/ssl/ui/private_daemon.crt\n  private_key: config/ssl/ui/private_daemon.key\n"})}),"\n",(0,o.jsx)(n.h1,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,o.jsx)(n.h2,{id:"gui-client",children:"GUI Client"}),"\n",(0,o.jsx)(n.h3,{id:"can-the-gui-find-the-config-folder",children:"Can the GUI find the config folder?"}),"\n",(0,o.jsx)(n.p,{children:"The first thing to check is that the daemon's websocket URI shows up on the title bar. It should look like this:"}),"\n",(0,o.jsx)(n.p,{children:(0,o.jsx)(n.img,{src:"https://user-images.githubusercontent.com/5160233/111890456-6ca97f00-89b7-11eb-8f20-a8dc80d0d138.png",alt:"image"})}),"\n",(0,o.jsxs)(n.p,{children:["Make sure there isn't a ",(0,o.jsx)(n.a,{href:"https://yamlchecker.com/",children:"syntax error"})," in config.yaml."]}),"\n",(0,o.jsx)(n.h3,{id:"can-the-gui-find-the-remote-daemons-certs",children:"Can the GUI find the remote daemon's certs?"}),"\n",(0,o.jsxs)(n.p,{children:["Double check that in the ",(0,o.jsx)(n.code,{children:"ui"})," section the crt and key paths are correct. It ",(0,o.jsx)(n.em,{children:"shouldn't"})," point to the folder where the local certs are stored. It has to point to the folder where you copied the daemon's certs."]}),"\n",(0,o.jsx)(n.h2,{id:"connectivity",children:"Connectivity"}),"\n",(0,o.jsx)(n.h3,{id:"has-the-daemon-been-bound-to-a-routable-ip-address",children:"Has the daemon been bound to a routable IP address?"}),"\n",(0,o.jsxs)(n.p,{children:["On the daemon host run ",(0,o.jsx)(n.code,{children:"sudo netstat -tulpn | grep 55400"})," or your OS's equivalent. It should show something similar to ",(0,o.jsx)(n.code,{children:"tcp 0 0 0.0.0.0:55400 0.0.0.0:* LISTEN 2925/chia_daemon"}),"."]}),"\n",(0,o.jsxs)(n.p,{children:["If you see ",(0,o.jsx)(n.code,{children:"127.0.0.1"})," it means you haven't changed the daemon's bind IP address. The loopback address is not routable on the network. Double check that ",(0,o.jsx)(n.code,{children:"self_hostname: 0.0.0.0"})," is correct in the config. Also, make sure you have fully restarted the daemon:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-bash",children:"chia stop all -d\nchia start farmer\n"})}),"\n",(0,o.jsx)(n.h3,{id:"is-the-daemons-port-opened-on-the-firewall",children:"Is the daemon's port opened on the firewall?"}),"\n",(0,o.jsxs)(n.p,{children:["Run ",(0,o.jsx)(n.code,{children:"sudo ufw status | grep 55400"})," or your OS and firewall equivalent. You should see something like ",(0,o.jsx)(n.code,{children:"55400/tcp ALLOW"}),"."]}),"\n",(0,o.jsx)(n.h3,{id:"is-vmware-plugin-service-bound-to-daemon-port",children:"Is VMWare Plugin Service bound to daemon port?"}),"\n",(0,o.jsxs)(n.p,{children:["Verify that the default port 55400 is not bound to VMWare Plugin or other service on the daemon host. If pre-bound, stop that other service or change the ",(0,o.jsx)(n.code,{children:"daemon_port"})," value in ",(0,o.jsx)(n.code,{children:"config.yaml"}),". ",(0,o.jsx)(n.code,{children:"netstat -tulpn"})," includes the process name of listeners. It should be ",(0,o.jsx)(n.code,{children:"chia_daemon"}),"."]})]})}function l(e={}){const{wrapper:n}={...(0,s.a)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>d,a:()=>a});var o=t(7294);const s={},i=o.createContext(s);function a(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:a(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);