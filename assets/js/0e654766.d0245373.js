"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[981],{188:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var t=i(5893),o=i(1151);const s={title:"Seeder User Guide",slug:"/guides/seeder-user-guide"},r="Seeder User Guide",a={id:"guides/seeder-user-guide",title:"Seeder User Guide",description:"The Chia Seeder & Crawler is a tool to keep track of the most reliable nodes on the Chia network. Each instance of the Chia Seeder maintains its own separate list of IP addresses of these nodes.",source:"@site/docs/guides/seeder-user-guide.md",sourceDirName:"guides",slug:"/guides/seeder-user-guide",permalink:"/guides/seeder-user-guide",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/guides/seeder-user-guide.md",tags:[],version:"current",frontMatter:{title:"Seeder User Guide",slug:"/guides/seeder-user-guide"},sidebar:"guides",previous:{title:"Simulator User Guide",permalink:"/guides/simulator-user-guide"},next:{title:"Verifiable Credentials Guide",permalink:"/guides/verifiable-credentials-guide"}},d={},l=[{value:"Expectations for Chia Seeder operators",id:"expectations-for-chia-seeder-operators",level:2},{value:"Installation",id:"installation",level:2},{value:"Special instructions on Ubuntu",id:"special-instructions-on-ubuntu",level:2},{value:"Configuration",id:"configuration",level:2},{value:"Running",id:"running",level:2},{value:"Testing",id:"testing",level:2},{value:"Stopping",id:"stopping",level:2},{value:"Being included in config.yaml",id:"being-included-in-configyaml",level:2}];function c(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.a)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"seeder-user-guide",children:"Seeder User Guide"}),"\n",(0,t.jsx)(n.p,{children:"The Chia Seeder & Crawler is a tool to keep track of the most reliable nodes on the Chia network. Each instance of the Chia Seeder maintains its own separate list of IP addresses of these nodes."}),"\n",(0,t.jsx)(n.p,{children:"It does so by crawling through the network, periodically revisiting known nodes from its list. If a node is either no longer available, or has exhibited untoward behavior, the Chia Seeder instance removes that node from its list."}),"\n",(0,t.jsx)(n.p,{children:"The Chia Seeder runs a mini-DNS server. Anyone can obtain an entry point into Chia\u2019s decentralized and permissionless network via a simple DNS request for reliable node IPs."}),"\n",(0,t.jsx)(n.p,{children:"The Chia Seeder has very low memory and CPU requirements."}),"\n",(0,t.jsx)(n.p,{children:"Chia\u2019s core developers have already been running an instance of the Chia Seeder for some time. You can view the current status of this instance by running:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# IPv4\ndig dns-introducer.chia.net\n\n# IPv6\ndig -t AAAA dns-introducer.chia.net\n"})}),"\n",(0,t.jsx)(n.p,{children:"Chia has now decided to release the Seeder as a tool for anyone to maintain their own list of reliable nodes, which contributes to the further decentralization of Chia\u2019s network by taking this tool off of the core team\u2019s hands."}),"\n",(0,t.jsx)(n.p,{children:"Features:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["Implements peer statistics and exponentially moving averages over various time-windows, akin to those maintained by its relative, the bitcoin-seeder: ",(0,t.jsx)(n.a,{href:"https://github.com/sipa/bitcoin-seeder",children:"https://github.com/sipa/bitcoin-seeder"})]}),"\n",(0,t.jsx)(n.li,{children:"Runs a mini-DNS server on port 53, along with a full node to crawl the network."}),"\n",(0,t.jsx)(n.li,{children:"Stores peer IPs and peer statistics into a database, so that they are persisted across runs."}),"\n"]}),"\n",(0,t.jsx)(n.h2,{id:"expectations-for-chia-seeder-operators",children:"Expectations for Chia Seeder operators"}),"\n",(0,t.jsx)(n.p,{children:"The Chia network core developers endeavor to minimize the level of trust in the DNS servers associated with a Chia Seeder. In this regard, it is expected for each Chia Seeder to be run by an individual or organization recognized as well-intentioned within the Chia community."}),"\n",(0,t.jsx)(n.p,{children:"This entails following good host security practices, maintaining control of the underlying infrastructure, and not transferring control of the Chia Seeder they operate."}),"\n",(0,t.jsx)(n.p,{children:"Logging of DNS queries must not be retained longer than necessary (as might be required for the operation of the service), and must not be communicated to any third-party."}),"\n",(0,t.jsx)(n.p,{children:"Each entity maintaining a Chia Seeder DNS server is encouraged to make publicly available the details of their operating practices."}),"\n",(0,t.jsx)(n.p,{children:"In keeping with all the previous recommendations, a reachable email address or Keybase account must be published for inquiries regarding said operating practices."}),"\n",(0,t.jsxs)(n.p,{children:["There are additional operation considerations for inclusion in the ",(0,t.jsx)(n.code,{children:"initial-config.yaml"})," outlined below."]}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"$ sh install.sh\n$ . ./activate\n$ chia init\n"})}),"\n",(0,t.jsxs)(n.p,{children:["You most certainly will want to specify your own configuration of a domain name server. Do so by editing the config file located at ",(0,t.jsx)(n.code,{children:"~/.chia/mainnet/config/config.yaml"}),", or by running ",(0,t.jsx)(n.code,{children:"chia configure"}),". Please refer to the relevant section below for more details, or enter ",(0,t.jsx)(n.code,{children:"$ chia configure --help"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"special-instructions-on-ubuntu",children:"Special instructions on Ubuntu"}),"\n",(0,t.jsx)(n.p,{children:"On Ubuntu, it is possible that systemd-resolved already binds port 53. The Chia Seeder's built-in DNS server is run on the same port, and systemd-resolved takes precedence by default."}),"\n",(0,t.jsxs)(n.p,{children:["Special instructions to free port 53 are provided here (points #2 and #3): ",(0,t.jsx)(n.a,{href:"https://github.com/team-exor/generic-seeder#exclamation-special-instructions-for-ubuntu-users-exclamation",children:"https://github.com/team-exor/generic-seeder#exclamation-special-instructions-for-ubuntu-users-exclamation"})]}),"\n",(0,t.jsxs)(n.p,{children:["This amounts to editing ",(0,t.jsx)(n.code,{children:"/etc/systemd/resolved.conf"})," so as to disable binding of systemd-resolved to port 53 by setting ",(0,t.jsx)(n.code,{children:"DNSStubListener=no"}),", or, alternatively, entirely disabling the systemd-resolved service. Note that you will likely need to add a nameserver in '/etc/resolv.conf'."]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"# Example resolv.conf\nnameserver 2001:4860:4860::8888\nnameserver 2001:4860:4860::8844\nnameserver 8.8.8.8\nnameserver 8.8.4.4\n"})}),"\n",(0,t.jsx)(n.p,{children:"Once you have completed freeing up port 53, you will then need to allow the python executable in your venv to have access to port 53:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"sudo setcap CAP_NET_BIND_SERVICE=+eip $(readlink -f /home/{{ user }}/chia-blockchain/venv/bin/python)\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Note that anytime you change the python executable by rerunning ",(0,t.jsx)(n.code,{children:"sh install.sh"})," or when ",(0,t.jsx)(n.code,{children:"apt"})," upgrades python, you will need to re-run this command."]}),"\n",(0,t.jsx)(n.h2,{id:"configuration",children:"Configuration"}),"\n",(0,t.jsxs)(n.p,{children:["The config file is ",(0,t.jsx)(n.code,{children:".chia/mainnet/config/config.yaml"})," The default values are for running a DNS seeder for mainnet. At the very least, in the ",(0,t.jsx)(n.code,{children:"seeder:"})," section of config.yaml, the variables ",(0,t.jsx)(n.code,{children:"domain_name"}),", ",(0,t.jsx)(n.code,{children:"nameserver"})," and ",(0,t.jsx)(n.code,{children:"soa"})," need to be changed to reflect the NS entry for your server in a domain record."]}),"\n",(0,t.jsx)(n.p,{children:"For a local DNS server setup, you will need control of a top-level domain (TLD) allowing administrator access for the purpose of creating additional DNS entries. Any domain registrar should be fine to use."}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsx)(n.p,{children:"Note that while it may be possible to use an existing domain, it is recommended to register a new domain name to specifically run the Chia Seeder address."})}),"\n",(0,t.jsxs)(n.p,{children:['Proceed by logging into your domain registrar and navigating to the section pertaining to managing DNS records for your domain. Next, click or activate the button or mechanism for creating a new DNS record. Finally, create new type "A" and "AAAA" DNS record(s) for ',(0,t.jsx)(n.code,{children:"vps.example.com"}),', which point at the ipv4 and ipv6 address(s) of the server running the seeder along with another new DNS record of type "NS" at ',(0,t.jsx)(n.code,{children:"my-chia-seeder.example.com"})," with the nameserver set to the servers hostname, ",(0,t.jsx)(n.code,{children:"vps.example.com"}),"."]}),"\n",(0,t.jsx)(n.admonition,{type:"note",children:(0,t.jsx)(n.p,{children:'Note that these names are examples, and as long as the "NS" record points at the hostname of the server, the seeder will work.'})}),"\n",(0,t.jsxs)(n.p,{children:["You can check that this is the case by running the following command (please ensure that you have ",(0,t.jsx)(n.code,{children:"dig"})," on your system by installing the ",(0,t.jsx)(n.code,{children:"dnsutils"})," or ",(0,t.jsx)(n.code,{children:"bind9-dnsutils"})," package; for instance, on Ubuntu, ",(0,t.jsx)(n.code,{children:"$ sudo apt install dnsutils"})," or ",(0,t.jsx)(n.code,{children:"$ sudo apt install bind9-dnsutils"}),"):"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"$ dig -t NS my-chia-seeder.example.com\n"})}),"\n",(0,t.jsx)(n.p,{children:"whose output should display, among other information, the following:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:";; ANSWER SECTION\nmy-chia-seeder.example.com.    86400    IN    NS    vps.example.com\n"})}),"\n",(0,t.jsxs)(n.p,{children:['For another example on how to set-up "A" and "NS" records for your domain using DigitalOcean, please refer to the following video, from 9:40 onward: ',(0,t.jsx)(n.a,{href:"https://www.youtube.com/watch?v=DsaxbwwVEXk&t=580s",children:"https://www.youtube.com/watch?v=DsaxbwwVEXk&t=580s"})]}),"\n",(0,t.jsxs)(n.p,{children:["For AWS Route 53 - in the hosted zone you want to use e.g. ",(0,t.jsx)(n.code,{children:"example.com"}),' add a "NS"/nameserver record with the ',(0,t.jsx)(n.code,{children:"Record name"})," of ",(0,t.jsx)(n.code,{children:"my-chia-seeder"})," and a value of ",(0,t.jsx)(n.code,{children:"vps.example.com"}),". As of January 2023, the Route 53 web user interface requires you first enter text into the ",(0,t.jsx)(n.code,{children:"Record name"})," field as the Record type of MX will otherwise be greyed out in the pulldown. Then you will create both an A and a AAAA record for ",(0,t.jsx)(n.code,{children:"vps.example.com"})," that corresponds to your vps's IP addresses."]}),"\n",(0,t.jsxs)(n.p,{children:["In ",(0,t.jsx)(n.code,{children:"config.yaml"})," the ",(0,t.jsx)(n.code,{children:"domain_name"})," is ",(0,t.jsx)(n.code,{children:"my-chia-seeder.example.com."})," and the ",(0,t.jsx)(n.code,{children:"nameserver"})," is ",(0,t.jsx)(n.code,{children:"vps.example.com."}),". Note the trailing periods. The main thing to change in ",(0,t.jsx)(n.code,{children:"soa"})," is adding a correct contact email in ",(0,t.jsx)(n.code,{children:"rname"})," and optionally changing the ",(0,t.jsx)(n.code,{children:"serial_number"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"running",children:"Running"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"$ . ./activate\n$ chia start seeder\n"})}),"\n",(0,t.jsx)(n.p,{children:"will run both a crawler and a DNS server.\nAlternatively,"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"$ . ./activate\n$ chia start crawler\n"})}),"\n",(0,t.jsx)(n.p,{children:"gives you the option to merely crawl the network so as to get a list of the connectable nodes, without having to set up a DNS server."}),"\n",(0,t.jsx)(n.h2,{id:"testing",children:"Testing"}),"\n",(0,t.jsx)(n.p,{children:"You should test to make sure that the Chia node can connect."}),"\n",(0,t.jsxs)(n.p,{children:["On a version of chia-blockchain newer than 1.6.2, stop node then delete ",(0,t.jsx)(n.code,{children:"peers.dat"})," in ",(0,t.jsx)(n.code,{children:"~/.chia/mainnet/db/"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["Modify your ",(0,t.jsx)(n.code,{children:"config.yaml"})," to include only your dns seeder."]}),"\n",(0,t.jsx)(n.p,{children:"If you tail the logs as you start up the node you should see the node connect and obtain both IPv4 and IPv6 nodes."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"2023-01-14T15:19:30.969 full_node chia.full_node.full_node: INFO     Received 32 peers from DNS seeder, using rdtype = A.\n2023-01-14T15:19:31.010 full_node chia.full_node.full_node: INFO     Received 32 peers from DNS seeder, using rdtype = AAAA.\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Sometimes dns takes a moment so seeing some initial flakiness here is not cause for concern. Just stop again, delete ",(0,t.jsx)(n.code,{children:"peers.dat"})," and try the test again."]}),"\n",(0,t.jsx)(n.h2,{id:"stopping",children:"Stopping"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"$ . ./activate\n$ chia stop -d all\n"})}),"\n",(0,t.jsx)(n.h2,{id:"being-included-in-configyaml",children:"Being included in config.yaml"}),"\n",(0,t.jsx)(n.p,{children:"There are a couple of criteria we all look for when adding a seeder to the initial config file."}),"\n",(0,t.jsx)(n.p,{children:"You must have an ICANN registered domain name. Your seeder host must support IPv6 and IPv4."}),"\n",(0,t.jsxs)(n.p,{children:["We ask that you commit to a monthly uptime of 99.9% which is available enough to be reliable but also leaves flexibility to not need to run a cluster and gives you time for a reboot once in a while to keep up with things like security patches. We will be monitoring all of the seeders listed in the most recent version of ",(0,t.jsx)(n.code,{children:"initial-config.yaml"}),". We highly recommend that you enable monitoring of your seeder as well. We are heavy users of ",(0,t.jsx)(n.a,{href:"https://uptimerobot.com/",children:"Uptime Robot"})," but anything similar will do."]}),"\n",(0,t.jsxs)(n.p,{children:["Being a known community member - the better you're known (pseudonymously is fine) - the more likely you are to be added. You should have an account on ",(0,t.jsx)(n.a,{href:"https://keybase.io/",children:"Keybase"})," and we will need to know your Keybase handle, as you will be added to a seeder operator's private channel."]}),"\n",(0,t.jsx)(n.p,{children:"The final criteria is geographical dispersion. If you are hosting in a region where we don't have a seeder, you are more likely to be added. We will want to know what country (and region if it's a large country e.g. North West US) - generally - your seeder will reside in to facilitate this."}),"\n",(0,t.jsxs)(n.p,{children:["The easiest way to propose being added is to open a pull request for ",(0,t.jsx)(n.a,{href:"https://github.com/Chia-Network/chia-blockchain/blob/main/chia/util/initial-config.yaml",children:"initial-config.yaml"})," and include the information required from the four points above."]})]})}function h(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(c,{...e})}):c(e)}},1151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>r});var t=i(7294);const o={},s=t.createContext(o);function r(e){const n=t.useContext(s);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:r(e.components),t.createElement(s.Provider,{value:n},e.children)}}}]);