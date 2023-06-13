"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[857],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var l=o.createContext({}),c=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},d="mdxType",h={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),d=c(n),u=r,m=d["".concat(l,".").concat(u)]||d[u]||h[u]||a;return n?o.createElement(m,i(i({ref:t},p),{},{components:n})):o.createElement(m,i({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[d]="string"==typeof e?e:r,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8162:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>c});var o=n(7462),r=(n(7294),n(3905));const a={title:"Networking Protocol",slug:"/networking-protocol"},i=void 0,s={unversionedId:"protocol/networking-protocol",id:"protocol/networking-protocol",title:"Networking Protocol",description:"The Chia protocol is asynchronous and peer-to-peer. It runs on top of WebSockets on port 8444 (or other ports for farmers and timelords). All nodes act as both clients and servers, and can maintain long-term connections with other peers.",source:"@site/docs/protocol/networking-protocol.md",sourceDirName:"protocol",slug:"/networking-protocol",permalink:"/zh/networking-protocol",draft:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/protocol/networking-protocol.md",tags:[],version:"current",frontMatter:{title:"Networking Protocol",slug:"/networking-protocol"},sidebar:"tutorialSidebar",previous:{title:"Chia Protocol",permalink:"/zh/chia-protocol"},next:{title:"Serialization Protocol",permalink:"/zh/serialization-protocol"}},l={},c=[{value:"Handshake",id:"handshake",level:2},{value:"Heartbeat",id:"heartbeat",level:2},{value:"Introducer",id:"introducer",level:2},{value:"RPC",id:"rpc",level:2},{value:"Incoming and Outgoing Connections",id:"incoming-and-outgoing-connections",level:2},{value:"Bans",id:"bans",level:2},{value:"Certificates",id:"certificates",level:2},{value:"Peer gossiping",id:"peer-gossiping",level:2}],p={toc:c},d="wrapper";function h(e){let{components:t,...n}=e;return(0,r.kt)(d,(0,o.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"The Chia protocol is asynchronous and peer-to-peer. It runs on top of WebSockets on port 8444 (or other ports for farmers and timelords). All nodes act as both clients and servers, and can maintain long-term connections with other peers."),(0,r.kt)("p",null,"Every message in the Chia protocol is composed of bytes, using the Streamable format, and sent as a WebSocket message. Each message is composed of three parts:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"A field spanning 1 byte, representing the type of message being transmitted, and how to decode the data."),(0,r.kt)("li",{parentName:"ol"},"Second, an optional 2-byte ID, which is used per connection to keep track of requests and responses."),(0,r.kt)("li",{parentName:"ol"},"The data, which is a Streamable encoded representation of one of the protocol messages.")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"class Message(Streamable):\n    # one of ProtocolMessageTypes\n    type: uint8\n    # message id\n    id: Optional[uint16]\n    # Message data for that type\n    data: bytes\n\n")),(0,r.kt)("p",null,"Chia protocol messages have a max length of ",(0,r.kt)("inlineCode",{parentName:"p"},"(4 + 2^32 - 1) = 4294967299")," bytes, or around 4 GB."),(0,r.kt)("h2",{id:"handshake"},"Handshake"),(0,r.kt)("p",null,"All peers in the Chia protocol (whether they are farmers, full nodes, timelords, etc.) act as both servers and clients (peers). As soon as a connection is initiated between two peers, both peers send a Handshake message, and a HandshakeAck message to complete the handshake. A peer's node_id is the SHA-256 hash of their ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/X.509"},"x.509")," ",(0,r.kt)("a",{parentName:"p",href:"https://wiki.openssl.org/index.php/DER"},"DER")," certificate."),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-python"},"class Handshake(Streamable):\n    network_id: str                         # Network id, usually the genesis challenge of the blockchain\n    protocol_version: str                   # Protocol version to determine which messages the peer supports\n    software_version: str                   # Version of the software, to debug and determine feature support\n    server_port: uint16                     # Which port the server is listening on\n    node_type: uint8                        # NodeType (full node, wallet, farmer, etc.)\n    capabilities: List[Tuple[uint16, str]]  # Key value dict to signal support for additional capabilities/features\n\n")),(0,r.kt)("p",null,"After the handshake is completed, both peers can send Chia protocol messages, and disconnect at any time by closing the WebSocket."),(0,r.kt)("h2",{id:"heartbeat"},"Heartbeat"),(0,r.kt)("p",null,"Heartbeat messages are sent periodically by the WebSocket libraries. Peers that are unresponsive will therefore be disconnected."),(0,r.kt)("p",null,"If a node does not receive any message from a peer for a certain period of time, even if heartbeats are being received, then the node will disconnect and remove the peer from the active peer list."),(0,r.kt)("h2",{id:"introducer"},"Introducer"),(0,r.kt)("p",null,"When a new node joins the network, it randomly connects to existing nodes on the network."),(0,r.kt)("p",null,"To facilitate this process, a number of introducer nodes will temporarily be run by Chia and other users, which will crawl the network and support one protocol message: get_peers_introducer. The introducer will then return a random subset of known recent peers that the calling node will attempt to connect to."),(0,r.kt)("p",null,"DNS introducers are also available at different names, which return random reliable peers to connect to."),(0,r.kt)("p",null,"For example: ",(0,r.kt)("inlineCode",{parentName:"p"},"dig dns-introducer.chia.net"),"."),(0,r.kt)("p",null,"More DNS introducers will be recruited in the future; check the ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/Chia-Network/chia-blockchain"},"chia-blockchain repository")," for updates. The introducer is only contacted at initial launch of the application, or if the peer database has no good peers."),(0,r.kt)("h2",{id:"rpc"},"RPC"),(0,r.kt)("p",null,"Aside from the Chia protocols described in the next page, there is also a local RPC protocol to allow simple control over a node or wallet through HTTPS. All requests and responses for the RPC protocol are in JSON, to simplify the interface. This allows doing things like getting the tips of the chain, getting a specific block, adding connections, stopping the node, etc. The full node UI connects to the full node using the RPC."),(0,r.kt)("p",null,"The RPC APIs are provided in both WebSocket and HTTPS format."),(0,r.kt)("h2",{id:"incoming-and-outgoing-connections"},"Incoming and Outgoing Connections"),(0,r.kt)("p",null,"The Chia software has multiple rules and checks to make sure a node is connected to several good peers."),(0,r.kt)("p",null,"For example, outgoing connections (connections which our node makes to external nodes) are ranked higher than incoming ones. This is because we cannot verify whether incoming peers are part of an attack or not."),(0,r.kt)("p",null,"Each node will try to connect to 8 (implementation-dependent) external peers. As long as a node is connected to at least one fast and non-malicious peer, the node should be able to keep up with, and maintain, consensus with the heaviest blockchain."),(0,r.kt)("h2",{id:"bans"},"Bans"),(0,r.kt)("p",null,"If a peer appears to be acting dishonestly, it can be disconnected and temporarily banned from reconnecting. Reasons for banning include (but are not limited to) exceeding the limits provided for each type of protocol message, sending invalid information, and making the node throw an exception when handling a message."),(0,r.kt)("p",null,"The duration of the ban depends on the severity of the issue. Care should be taken to not ban honest peers by accident. Different implementations might have larger or different rate limits as well."),(0,r.kt)("h2",{id:"certificates"},"Certificates"),(0,r.kt)("p",null,"All connections between nodes are encrypted and signed with X.509 signed certificates. Each node generates an X.509 certificate and signs it with the Chia CA (Valid To: January 21, 2031, Serial Number: 5c8a71239328650eb9fef85cec32bf779ca6a0c5) for node connections on port 8444. Node IDs are derived by hashing the public key of the certificate, so each node can have a consistent node ID to use for authentication. Each node will also generate and have its own private CA and self-sign certificates for local connections to services like farmer and harvester."),(0,r.kt)("h2",{id:"peer-gossiping"},"Peer gossiping"),(0,r.kt)("p",null,"Peers are broadcasted within the network with ",(0,r.kt)("inlineCode",{parentName:"p"},"request_peers")," and ",(0,r.kt)("inlineCode",{parentName:"p"},"respond_peers")," messages. The ",(0,r.kt)("inlineCode",{parentName:"p"},"respond_peers")," message contains up to 1000 peers, each having its IP address, its port and an estimate of its last active timestamp."),(0,r.kt)("p",null,"Data received from ",(0,r.kt)("inlineCode",{parentName:"p"},"respond_peers")," messages or from the introducers are stored in peer tables, similar to Bitcoin's. The tables will be used to randomly select peers in order to establish the outgoing connections. If we've successfully connected with the peer at least once, it is stored in the \"tried\" table. Otherwise, it is stored in the \"new\" table. The tried table protects the node from attacks (i.e. eclipse attacks), as an attacker won't be able to easily alter it (all peers initially go into the new table). Periodically, feeler connections are made in order to increase the number of entries in the tried table: we select a peer from the new table and if it's reachable, we move it to the tried table and then we disconnect it. Additionally, peer tables are stored on disk (in the ",(0,r.kt)("inlineCode",{parentName:"p"},"peers.dat")," file) every 15 to 30 minutes, and then loaded every time the node restarts."),(0,r.kt)("p",null,"Both new and tried tables optimize for the network groups of the entries to be as diverse as possible (/8 for ipv4 and /16 for ipv6). The rules of storing the bucket and the bucket position for a given peer depend on hashing the peer's network group, peer's port, sender's network group (peer that sent the \"respond_peers\" message containing our current peer), and a secret 32 byte key. This way, an attacker won't be able to predict the bucket and the bucket position where a peer will be stored, and only one entry will be stored within the similar network groups (as the bucket and the bucket position calculations will be identical for similar network group peers)."),(0,r.kt)("p",null,"When a new inbound peer connects to us, we relay its address to one peer we're connected to by sending a ",(0,r.kt)("inlineCode",{parentName:"p"},"respond_peers")," message. Similarly, when we receive a ",(0,r.kt)("inlineCode",{parentName:"p"},"respond_peers")," message containing only one peer, we relay its address to two peers we're connected to. This ensures when a new peer connects to the network, its address will be eventually known by everyone else. The relay peers are chosen deterministically by our key, the current day and their IP and port, by choosing the smallest value after hashing those values (while being deterministic, they also change every day). Additionally, our node sends its address once every 24 hours to all the peers it is connected to, to point that we're still online."),(0,r.kt)("p",null,"All the above update the timestamps of the peers. Additionally, we update the timestamp of our outbound connections, at most once every 20 minutes, after they send us a message."),(0,r.kt)("p",null,"Beside picking our outgoing connections, the peer tables are also used to respond to ",(0,r.kt)("inlineCode",{parentName:"p"},"request_peers")," messages. We pick random peers from both new and the tried table, assuming their timestamp is not too old and we don't have too many failed connections with them. Every time peer A connects to peer B, peer A will send peer B a ",(0,r.kt)("inlineCode",{parentName:"p"},"request_peers")," message. The answer will be a ",(0,r.kt)("inlineCode",{parentName:"p"},"respond_peers")," message that will help peer A bootstrap further."))}h.isMDXComponent=!0}}]);