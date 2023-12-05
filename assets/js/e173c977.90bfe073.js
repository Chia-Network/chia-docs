"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[2480],{9472:(e,t,s)=>{s.r(t),s.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>i,toc:()=>h});var n=s(5893),o=s(1151);const r={title:"Harvester Protocol",slug:"/harvester-protocol"},a=void 0,i={id:"protocol/harvester-protocol",title:"Harvester Protocol",description:"The harvester protocol defines the messages sent between a farmer service and a harvester service. These tend to",source:"@site/docs/protocol/harvester-protocol.md",sourceDirName:"protocol",slug:"/harvester-protocol",permalink:"/harvester-protocol",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/protocol/harvester-protocol.md",tags:[],version:"current",frontMatter:{title:"Harvester Protocol",slug:"/harvester-protocol"},sidebar:"tutorialSidebar",previous:{title:"Serialization Protocol",permalink:"/serialization-protocol"},next:{title:"Peer Protocol",permalink:"/peer-protocol"}},l={},h=[{value:"harvester_handshake",id:"harvester_handshake",level:2},{value:"new_signage_point_harvester",id:"new_signage_point_harvester",level:2},{value:"new_proof_of_space",id:"new_proof_of_space",level:2},{value:"request_signatures",id:"request_signatures",level:2},{value:"respond_signatures",id:"respond_signatures",level:2},{value:"request_plots",id:"request_plots",level:2},{value:"respond_plots",id:"respond_plots",level:2}];function c(e){const t={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,o.a)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"The harvester protocol defines the messages sent between a farmer service and a harvester service. These tend to\nbe on the same machine for small farmers, but for medium or large farmers they can be in multiple machines."}),"\n",(0,n.jsx)(t.h2,{id:"harvester_handshake",children:"harvester_handshake"}),"\n",(0,n.jsx)(t.p,{children:"The handshake between farmer and harvester.\nA farmer sends this message to harvesters, to initialize them and tell them which\npool public keys and farmer public keys are acceptable to use."}),"\n",(0,n.jsx)(t.p,{children:"A farmer can be connected to multiple harvesters, but a harvester should only have one farmer connection.\nThe harvester can start using plots which have these keys associated with them."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"class HarvesterHandshake(Streamable):\n    farmer_public_keys: List[G1Element]\n    pool_public_keys: List[G1Element]\n"})}),"\n",(0,n.jsx)(t.h2,{id:"new_signage_point_harvester",children:"new_signage_point_harvester"}),"\n",(0,n.jsxs)(t.p,{children:["This message is a notification from the farmer to the harvester of a new challenge.\nThe harvester first checks which plots pass the plot filter (see the ",(0,n.jsx)(t.a,{href:"/harvester-algorithm",children:"Harvester Algorithm page"}),"), and for those that do, fetches the quality.\nThis requires around 7-9 random reads (and thus disk seeks) for each quality.\nEach plot is expected to have one proof of space (and therefore one quality) on average, so for 50 plots, a harvester would have around 50 qualities.\nFor those qualities that are sufficiently good to win a block or a pool partial, the whole proof is fetched (64 random reads in the plot),\nand then ",(0,n.jsx)(t.code,{children:"new_proof_of_space"})," is sent to the farmer."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"class NewSignagePointHarvester(Streamable):\n    challenge_hash: bytes32     # The challenge hash for the sub slot in which the signage point lies\n    difficulty: uint64          # The current blockchain difficulty\n    sub_slot_iters: uint64      # The current blockchain sub-slot iters\n    signage_point_index: uint8  # The signage point's index, from 0 to 63. 0 for an end of sub slot signage point\n    sp_hash: bytes32            # The hash of the signage point, this is == challenge_hash iff the index is 0\n    pool_difficulties: List[PoolDifficulty]    # List of each pool the farmer is in, and what the difficulty is for that pool\n\n\nclass PoolDifficulty(Streamable):\n    difficulty: uint64                  # The current difficulty that is set for plots belonging to this pool contract\n    sub_slot_iters: uint64              # The pool sub slot iters, which is static for each network (mainnet, testnet)\n    pool_contract_puzzle_hash: bytes32  # The pool contract puzzle hash which can be in many plots\n"})}),"\n",(0,n.jsx)(t.h2,{id:"new_proof_of_space",children:"new_proof_of_space"}),"\n",(0,n.jsxs)(t.p,{children:["A successful proof of space that is sent to the farmer. The ",(0,n.jsx)(t.code,{children:"challenge_hash"}),", ",(0,n.jsx)(t.code,{children:"sp_hash"}),", and ",(0,n.jsx)(t.code,{children:"signage_point_index"}),"\ncorrespond to the ones sent in ",(0,n.jsx)(t.code,{children:"new_signage_point_harvester"}),". Many proofs can be submitted for each signage point."]}),"\n",(0,n.jsx)(t.p,{children:"The plot is a string chosen by the harvester to represent the winning plot (and proof index) in future communications\nbetween the farmer and harvester. This can be, for example, the filename of the plot with an additional byte for the index.\nThis is relevant, because a certain plot can potentially have more than one proof for each signage point, and we want\ncommunications for each proof to be separate and not conflict (specifically to fetch signatures from the harvester)."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"class NewProofOfSpace(Streamable):\n    challenge_hash: bytes32\n    sp_hash: bytes32\n    plot_identifier: str\n    proof: ProofOfSpace         # The actual proof of space which contains more data, shown below\n    signage_point_index: uint8\n\nclass ProofOfSpace(Streamable):\n    challenge: bytes32                              # This is the challenge for the pospace, explained in the Signage and Infusion Points page\n    pool_public_key: Optional[G1Element]            # Only one of these two should be present\n    pool_contract_puzzle_hash: Optional[bytes32]    # Present only for pooled plots\n    plot_public_key: G1Element                      # Explained in the keys section\n    size: uint8                                     # k size, usually 32 but can vary\n    proof: bytes                                    # proof bytes, 64 k bit values, total size 8k bytes\n"})}),"\n",(0,n.jsx)(t.h2,{id:"request_signatures",children:"request_signatures"}),"\n",(0,n.jsxs)(t.p,{children:["This is a request from the farmer to the harvester for a signature from the plot key, for a specific plot (using the\nplot identifier from ",(0,n.jsx)(t.code,{children:"new_proof_of_space"}),"). The farmer can request signatures from multiple messages."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"class RequestSignatures(Streamable):\n    plot_identifier: str\n    challenge_hash: bytes32\n    sp_hash: bytes32\n    messages: List[bytes32]\n"})}),"\n",(0,n.jsx)(t.h2,{id:"respond_signatures",children:"respond_signatures"}),"\n",(0,n.jsxs)(t.p,{children:["This is a response to ",(0,n.jsx)(t.code,{children:"request_signatures"}),". The local public key is the public key corresponding to the secret key\nin the plot. To see more about the keys for plots, look at the ",(0,n.jsx)(t.a,{href:"/bls-keys",children:"BLS Keys page"}),"."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"class RespondSignatures(Streamable):\n    plot_identifier: str\n    challenge_hash: bytes32\n    sp_hash: bytes32\n    local_pk: G1Element   # Key in the plot\n    farmer_pk: G1Element  # Key controlled by farmer\n    message_signatures: List[Tuple[bytes32, G2Element]]\n"})}),"\n",(0,n.jsx)(t.h2,{id:"request_plots",children:"request_plots"}),"\n",(0,n.jsx)(t.p,{children:"A request from the farmer to the harvester for the list of all plots being farmed by the harvester."}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"class RequestPlots(Streamable):\n    pass\n"})}),"\n",(0,n.jsx)(t.h2,{id:"respond_plots",children:"respond_plots"}),"\n",(0,n.jsxs)(t.p,{children:["A response to ",(0,n.jsx)(t.code,{children:"request_plots"})," request. This message is also sent whenever a new plot is loaded."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-python",children:"class RespondPlots(Streamable):\n    plots: List[Plot]\n    failed_to_open_filenames: List[str]  # Filenames for files which cannot be opened\n    no_key_filenames: List[str]          # Filenames for files which cannot be farmed by this farmer\n\nclass Plot(Streamable):\n    filename: str\n    size: uint8\n    plot_id: bytes32\n    pool_public_key: Optional[G1Element]\n    pool_contract_puzzle_hash: Optional[bytes32]\n    plot_public_key: G1Element\n    file_size: uint64\n    time_modified: uint64\n"})})]})}function p(e={}){const{wrapper:t}={...(0,o.a)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(c,{...e})}):c(e)}},1151:(e,t,s)=>{s.d(t,{Z:()=>i,a:()=>a});var n=s(7294);const o={},r=n.createContext(o);function a(e){const t=n.useContext(r);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),n.createElement(r.Provider,{value:t},e.children)}}}]);