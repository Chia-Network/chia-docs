(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[8869],{588:(e,s,n)=>{"use strict";n.r(s),n.d(s,{assets:()=>d,contentTitle:()=>t,default:()=>p,frontMatter:()=>o,metadata:()=>i,toc:()=>a});const i=JSON.parse('{"id":"academy/chialisp/chialisp-inner-puzzle","title":"Inner Puzzles","description":"\u5728\u8fd9\u8282\u8bfe\u4e0a\uff0c\u6211\u4eec\u5c06\u8ba8\u8bba\u4e3a\u4ec0\u4e48\u60a8\u53ef\u80fd\u5e0c\u671b\u5d4c\u5957\u8c1c\u9898\u4ee5\u53ca\u5982\u4f55\u8bbe\u7f6e\u5b83\u4eec\u3002","source":"@site/i18n/zh-Hans/docusaurus-plugin-content-docs/current/academy/chialisp/chialisp-inner-puzzle.md","sourceDirName":"academy/chialisp","slug":"/chialisp-inner-puzzle","permalink":"/zh-Hans/chialisp-inner-puzzle","draft":false,"unlisted":false,"editUrl":"https://github.com/Chia-Network/chia-docs/blob/main/docs/academy/chialisp/chialisp-inner-puzzle.md","tags":[],"version":"current","frontMatter":{"title":"Inner Puzzles","slug":"/chialisp-inner-puzzle"},"sidebar":"academy","previous":{"title":"Signatures","permalink":"/zh-Hans/chialisp-signatures"},"next":{"title":"Plotting & Farming","permalink":"/zh-Hans/academy/plotting-farming"}}');var l=n(4848),r=n(8453),c=n(4893);const o={title:"Inner Puzzles",slug:"/chialisp-inner-puzzle"},t=void 0,d={},a=[{value:"\u5b66\u4e60\u76ee\u6807",id:"\u5b66\u4e60\u76ee\u6807",level:2},{value:"\u5185\u5bb9",id:"\u5185\u5bb9",level:2},{value:"\u811a\u672c",id:"\u811a\u672c",level:2},{value:"\u5e38\u89c1\u95ee\u9898",id:"\u5e38\u89c1\u95ee\u9898",level:2},{value:"\u77e5\u8bc6\u68c0\u6d4b",id:"\u77e5\u8bc6\u68c0\u6d4b",level:2},{value:"\u9644\u52a0\u8d44\u6e90",id:"\u9644\u52a0\u8d44\u6e90",level:2},{value:"\u53ef\u8fd0\u884c\u7684Chialisp\u548cclvm\u63d2\u4ef6",id:"\u53ef\u8fd0\u884c\u7684chialisp\u548cclvm\u63d2\u4ef6",level:3},{value:"Chialisp \u63d2\u4ef6",id:"chialisp-\u63d2\u4ef6",level:4},{value:"Clvm\u63d2\u4ef6",id:"clvm\u63d2\u4ef6",level:4},{value:"\u94fe\u63a5",id:"\u94fe\u63a5",level:3}];function h(e){const s={a:"a",admonition:"admonition",br:"br",code:"code",h2:"h2",h3:"h3",h4:"h4",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components},{Details:n}=s;return n||function(e,s){throw new Error("Expected "+(s?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(s.p,{children:"\u5728\u8fd9\u8282\u8bfe\u4e0a\uff0c\u6211\u4eec\u5c06\u8ba8\u8bba\u4e3a\u4ec0\u4e48\u60a8\u53ef\u80fd\u5e0c\u671b\u5d4c\u5957\u8c1c\u9898\u4ee5\u53ca\u5982\u4f55\u8bbe\u7f6e\u5b83\u4eec\u3002"}),"\n",(0,l.jsx)(s.h2,{id:"\u5b66\u4e60\u76ee\u6807",children:"\u5b66\u4e60\u76ee\u6807"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"\u51fd\u6570\uff08Functions\uff09"}),"\uff1a\u5b66\u4e60\u5982\u4f55\u5728 Chialisp \u4e2d\u5b9a\u4e49\u548c\u6267\u884c\u51fd\u6570\u3002"]}),"\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"\u5d4c\u5957\u8c1c\u9898\uff08Nesting Puzzles\uff09"}),"\uff1a\u4e86\u89e3\u5728 Chialisp \u4e2d\u4f7f\u7528\u5d4c\u5957\u8c1c\u9898\u7684\u7528\u9014\u3002"]}),"\n"]}),"\n",(0,l.jsx)(s.hr,{}),"\n",(0,l.jsx)(s.h2,{id:"\u5185\u5bb9",children:"\u5185\u5bb9"}),"\n",(0,l.jsx)("div",{class:"videoWrapper",children:(0,l.jsx)("iframe",{width:"100%",height:"504",src:"https://www.youtube.com/embed/GAw1yMmkO3g",frameborder:"0",allowfullscreen:"allowfullscreen"})}),"\n",(0,l.jsx)(s.hr,{}),"\n",(0,l.jsx)(s.h2,{id:"\u811a\u672c",children:"\u811a\u672c"}),"\n",(0,l.jsxs)(n,{children:[(0,l.jsx)("summary",{children:" Expand for the full script "}),(0,l.jsxs)(s.p,{children:["00:00",(0,l.jsx)(s.br,{}),"\n","\u6240\u6709\u7684\u8c1c\u9898\u90fd\u4f1a\u4ea7\u751f\u4e00\u4e2a\u6761\u4ef6\u8f93\u51fa\uff0c\u544a\u8bc9\u533a\u5757\u94fe\u5728\u5176\u4e2d\u5305\u88c5\u7684\u786c\u5e01\u8be5\u505a\u4ec0\u4e48\u3002 \u5185\u90e8\u8c1c\u9898\u53ef\u4ee5\u770b\u4f5c\u662f\u786c\u5e01\u4e2d\u7684\u786c\u5e01\uff0c\u7ed3\u679c\u662f\u4e00\u4e2a\u4f20\u9012\u7ed9\u5916\u90e8\u8c1c\u9898\u5e76\u7531\u5176\u6267\u884c\u7684\u6761\u4ef6\u3002"]}),(0,l.jsxs)(s.p,{children:["00:20",(0,l.jsx)(s.br,{}),"\n","\u8fd9\u79cd\u529f\u80fd\u7684\u4e00\u4e2a\u7279\u5b9a\u7528\u9014\u662f\uff0c\u5982\u679c\u4f60\u60f3\u4f7f\u7528\u4e00\u4e2a\u901a\u7528\u7684\u5185\u90e8\u8c1c\u9898\uff0c\u5e76\u5c06\u5176\u5305\u88c5\u5728\u4e00\u4e2a\u9a8c\u8bc1\u7b7e\u540d\u7684\u5916\u90e8\u8c1c\u9898\u4e2d\u3002 \u5916\u90e8\u8c1c\u9898\u53ef\u4ee5\u770b\u4f5c\u662f\u4e00\u79cd\u6a21\u677f\uff0c\u4f60\u53ef\u4ee5\u5c06\u4efb\u4f55\u901a\u7528\u7684\u5185\u90e8\u8c1c\u9898\u4f20\u9012\u8fdb\u53bb\uff0c\u5b83\u5c06\u7531\u5916\u90e8\u8c1c\u9898\u4fdd\u62a4\u3002 \u8ba9\u6211\u4eec\u521b\u5efa\u8fd9\u4e2a\u5916\u90e8\u8c1c\u9898\u6a21\u677f\u3002"]}),(0,l.jsxs)(s.p,{children:["00:40",(0,l.jsx)(s.br,{}),"\n","\u6211\u4eec\u8981\u5b9a\u4e49\u4e00\u4e2a\u6a21\u5757\uff0c\u5bf9\u4e8e\u6211\u4eec\u7684\u53c2\u6570\uff0c\u6211\u4eec\u5c06\u6709\u4e00\u4e2a\u7a0d\u540e\u4f20\u5165\u7684 ",(0,l.jsx)(s.code,{children:"PUBLIC_KEY"}),"\uff0c\u4e00\u4e2a\u6211\u4eec\u4e5f\u5c06\u4f20\u5165\u7684 ",(0,l.jsx)(s.code,{children:"INNER_PUZZLE"}),"\uff0c\u7136\u540e\u662f ",(0,l.jsx)(s.code,{children:"inner_solution"}),"\u3002 \u6211\u4eec\u8fd8\u5c06\u5305\u542b ",(0,l.jsx)(s.code,{children:"condition_codes.clib"})," \u548c ",(0,l.jsx)(s.code,{children:"sha256tree.clib"})," \u5e93\u6587\u4ef6\u3002 \u7136\u540e\uff0c\u6211\u4eec\u5c06\u5b9a\u4e49\u4e00\u4e2a\u65b0\u7684\u51fd\u6570\u3002"]}),(0,l.jsxs)(s.p,{children:["01:00",(0,l.jsx)(s.br,{}),"\n","\u6211\u4eec\u5c06\u5176\u547d\u540d\u4e3a ",(0,l.jsx)(s.code,{children:"calculate_output"}),"\uff0c\u5728\u53c2\u6570\u4e2d\u6211\u4eec\u5c06\u6709\u6211\u4eec\u7684 ",(0,l.jsx)(s.code,{children:"PUBLIC_KEY"}),"\uff0c",(0,l.jsx)(s.code,{children:"inner_solution"}),"\uff0c\u4ee5\u53ca\u6211\u4eec\u5c06\u6267\u884c\u7684 ",(0,l.jsx)(s.code,{children:"conditions"}),"\u3002 \u5728\u4e00\u4e2a\u7ec4\u5408\u8bed\u53e5\u4e2d\uff0c\u6211\u4eec\u5c06\u4f7f\u7528\u4e4b\u524d\u89c6\u9891\u4e2d\u4f7f\u7528\u7684\u6807\u51c6\u7b7e\u540d\u9a8c\u8bc1\u3002 (",(0,l.jsx)(s.code,{children:"(defun calculate_output (PUBLIC_KEY inner_solution conditions) (c (list AGG_SIG_MET PUBLIC_KEY (sha256tree inner_solution)) conditions))"}),")"]}),(0,l.jsxs)(s.p,{children:["01:20",(0,l.jsx)(s.br,{}),"\n","\u5bf9\u4e8e\u6211\u4eec\u8981\u9a8c\u8bc1\u7684\u6d88\u606f\uff0c\u6211\u4eec\u5c06\u9a8c\u8bc1 ",(0,l.jsx)(s.code,{children:"inner_solution"}),"\uff0c\u7136\u540e\u8fd4\u56de ",(0,l.jsx)(s.code,{children:"conditions"}),"\u3002 \u73b0\u5728\u6211\u4eec\u5df2\u7ecf\u5b9a\u4e49\u4e86\u6211\u4eec\u7684\u65b0\u51fd\u6570\uff0c\u6211\u4eec\u5c06\u4f7f\u7528 ",(0,l.jsx)(s.code,{children:"calculate_output"})," \u8c03\u7528\u5b83\uff0c\u63d0\u4f9b ",(0,l.jsx)(s.code,{children:"PUBLIC_KEY"})," \u548c ",(0,l.jsx)(s.code,{children:"inner_solution"}),"\uff0c\u7136\u540e\u6211\u4eec\u5c06\u5bf9\u6211\u4eec\u7684 ",(0,l.jsx)(s.code,{children:"INNER_PUZZLE"})," \u4f7f\u7528 ",(0,l.jsx)(s.code,{children:"apply"})," \u8fd0\u7b97\u7b26\u6216 ",(0,l.jsx)(s.code,{children:"a"}),"\uff0c\u63d0\u4f9b ",(0,l.jsx)(s.code,{children:"inner_solution"}),"\u3002 (",(0,l.jsx)(s.code,{children:"calculate_output PUBLIC_KEY inner_solution (a INNER_PUZZLE inner_solution)"}),")"]}),(0,l.jsxs)(s.p,{children:["01:40",(0,l.jsx)(s.br,{}),"\n",(0,l.jsx)(s.code,{children:"apply"})," \u8fd0\u7b97\u7b26\u662f\u6267\u884c\u4e00\u4e9b\u4ee3\u7801\u7684\u65b9\u5f0f\u3002 \u56e0\u6b64\uff0c",(0,l.jsx)(s.code,{children:"INNER_PUZZLE"})," \u5c06\u4f7f\u7528 ",(0,l.jsx)(s.code,{children:"inner_solution"})," \u6267\u884c\u3002 \u56e0\u6b64\uff0c\u8fd9\u4e2a\u8c1c\u9898\u5c06\u9996\u5148\u4f7f\u7528 ",(0,l.jsx)(s.code,{children:"(a INNER_PUZZLE inner_solution))"})," \u65b9\u6cd5\u8bc4\u4f30\u5185\u90e8\u8c1c\u9898\uff0c\u5e76\u5c06\u5176\u7ed3\u679c\u7528\u4f5c\u6211\u4eec\u7684 ",(0,l.jsx)(s.code,{children:"calculate_output"})," \u51fd\u6570\u7684\u6761\u4ef6\u3002"]}),(0,l.jsxs)(s.p,{children:["02:00",(0,l.jsx)(s.br,{}),"\n","\u8fd9\u4e2a\u51fd\u6570\u9700\u8981 ",(0,l.jsx)(s.code,{children:"inner_solution"})," \u7684\u7b7e\u540d\u624d\u80fd\u901a\u8fc7\u3002 \u73b0\u5728\u8ba9\u6211\u4eec\u7f16\u5199\u5185\u90e8\u8c1c\u9898\u3002 \u5bf9\u4e8e\u8fd9\u4e2a\u8c1c\u9898\uff0c\u6211\u4eec\u5c06\u4f7f\u7528\u4e00\u4e2a\u79f0\u4e3a ",(0,l.jsx)(s.code,{children:"ASSERT_HEIGHT_RELATIVE"})," \u7684\u6761\u4ef6\uff0c\u5b83\u6307\u5b9a\u4e86\u57fa\u4e8e\u81ea\u786c\u5e01\u521b\u5efa\u4ee5\u6765\u7ecf\u8fc7\u7684\u5757\u6570\u7684\u786c\u5e01\u4f55\u65f6\u53ef\u4ee5\u88ab\u82b1\u8d39\u3002 \u6211\u4eec\u5c06\u5b9a\u4e49\u4e00\u4e2a\u6a21\u5757\uff0c\u5728\u6211\u4eec\u7684\u53c2\u6570\u4e2d\uff0c\u6211\u4eec\u5c06\u4f20\u5165 ",(0,l.jsx)(s.code,{children:"REQUIRED_BLOCKS"}),"\u3002 \u8fd9\u662f\u4e00\u4e2a\u5fc5\u987b\u7ecf\u8fc7\u7684\u5757\u6570\uff0c\u786c\u5e01\u624d\u80fd\u88ab\u82b1\u8d39\u3002"]}),(0,l.jsxs)(s.p,{children:["02:20",(0,l.jsx)(s.br,{}),"\n","\u7136\u540e\uff0c\u6211\u4eec\u5c06\u6709\u6211\u4eec\u7684 ",(0,l.jsx)(s.code,{children:"conditions"}),"\u3002 \u6211\u4eec\u518d\u6b21\u5305\u542b ",(0,l.jsx)(s.code,{children:"condition_codes.clib"})," \u5e93\u6587\u4ef6\uff0c\u7136\u540e\u6211\u4eec\u5c06\u5b9a\u4e49\u4e00\u4e2a\u8bed\u53e5\uff0c\u8be5\u8bed\u53e5\u4f7f\u7528\u6211\u4eec\u4f20\u5165\u7684 ",(0,l.jsx)(s.code,{children:"REQUIRED_BLOCKS"})," \u4e0a\u7684 ",(0,l.jsx)(s.code,{children:"ASSERT_HEIGHT_RELATIVE"})," \u6761\u4ef6\uff0c\u7136\u540e\u6211\u4eec\u5c06\u8fd4\u56de ",(0,l.jsx)(s.code,{children:"conditions"}),"\u3002"]}),(0,l.jsxs)(s.p,{children:["02:40",(0,l.jsx)(s.br,{}),"\n","\u597d\u4e86\uff0c\u73b0\u5728\u6211\u4eec\u6709\u4e86\u5185\u90e8\u8c1c\u9898\u548c\u5916\u90e8\u8c1c\u9898\u3002 \u8ba9\u6211\u4eec\u4f20\u5165\u6240\u9700\u7684\u503c\u3002 \u9996\u5148\uff0c\u6211\u4eec\u4f7f\u7528 ",(0,l.jsx)(s.code,{children:"chia keys show"})," \u83b7\u53d6\u6211\u4eec\u7684\u516c\u94a5\uff0c\u7136\u540e\u6211\u4eec\u5c06\u5757\u503c\u4f20\u5165\u5185\u90e8\u8c1c\u9898\uff0c\u4f7f\u7528 ",(0,l.jsx)(s.code,{children:"cdv clsp curry inner-puzzle.clsp -a"})," \u5e76\u6307\u5b9a\u6211\u4eec\u60f3\u8981\u7ecf\u8fc7\u7684\u5757\u6570\u3002"]}),(0,l.jsxs)(s.p,{children:["03:00",(0,l.jsx)(s.br,{}),"\n","\u5728\u8fd9\u79cd\u60c5\u51b5\u4e0b\uff0c\u6211\u4eec\u5c06\u4f7f\u7528 ",(0,l.jsx)(s.code,{children:"20"}),"\u3002 \u73b0\u5728\u6211\u4eec\u53ef\u4ee5\u5c06\u6b64\u7ed3\u679c\u4e0e\u6211\u4eec\u7684\u516c\u94a5\u4e00\u8d77\u4f20\u5165\u5916\u90e8\u8c1c\u9898\uff0c\u4f7f\u7528 ",(0,l.jsx)(s.code,{children:"cdv clsp curry outer-puzzle.clsp -a"}),"\uff0c\u8f93\u5165\u6211\u4eec\u7684\u516c\u94a5\uff0c",(0,l.jsx)(s.code,{children:"-a"}),"\uff0c\u7136\u540e\u5728\u5f15\u53f7\u4e2d\u7c98\u8d34\u7f16\u8bd1\u540e\u7684\u5185\u90e8\u8c1c\u9898\u3002"]}),(0,l.jsxs)(s.p,{children:["03:20",(0,l.jsx)(s.br,{}),"\n","\u73b0\u5728\u6211\u4eec\u6709\u4e86\u6700\u7ec8\u7684\u7f16\u8bd1\u8c1c\u9898\uff0c\u6211\u4eec\u53ef\u4ee5\u7ee7\u7eed\u521b\u5efa\u4e00\u4e2a\u786c\u5e01\uff0c\u4f7f\u7528\u6211\u4eec\u5728\u4e0a\u4e00\u4e2a\u89c6\u9891\u4e2d\u4ecb\u7ecd\u7684\u6d41\u7a0b\u3002 \u4e00\u65e6\u786c\u5e01\u88ab\u521b\u5efa\uff0c\u6211\u4eec\u5c31\u53ef\u4ee5\u4e3a\u8fd9\u4e2a\u786c\u5e01\u521b\u5efa\u89e3\u51b3\u65b9\u6848\u3002 \u9996\u5148\u6211\u4eec\u83b7\u53d6\u6211\u4eec\u7684\u94b1\u5305\u5730\u5740\u5e76\u8fdb\u884c ",(0,l.jsx)(s.code,{children:"decode"}),"\u3002 \u6211\u4eec\u5c06\u5728\u6211\u4eec\u60f3\u8981\u7684\u89e3\u51b3\u65b9\u6848\u4e2d\u4f7f\u7528\u8fd9\u4e2a\u5730\u5740\u3002 \u540c\u6837\uff0c\u6211\u4eec\u5c06\u4f7f\u7528\u4ee3\u7801 ",(0,l.jsx)(s.code,{children:"51"})," \u8868\u793a\u7684 ",(0,l.jsx)(s.code,{children:"CREATE_COIN"})," \u6761\u4ef6\u3002"]}),(0,l.jsxs)(s.p,{children:["03:40",(0,l.jsx)(s.br,{}),"\n","\u6ce8\u610f\uff0c\u6211\u5c06\u89e3\u51b3\u65b9\u6848\u5d4c\u5957\u5728\u4e864\u7ec4\u62ec\u53f7\u4e2d\u3002 \u8fd9\u662f\u56e0\u4e3a\u5916\u90e8\u8c1c\u9898\u53c2\u6570\u5217\u8868\u88ab\u5305\u88f9\u5728\u62ec\u53f7\u4e2d\uff0c\u5185\u90e8\u89e3\u51b3\u65b9\u6848\u4e5f\u662f\u5982\u6b64\u3002 \u5728\u5185\u90e8\u8c1c\u9898\u4e2d\uff0c\u6211\u4eec\u6709\u53e6\u4e00\u7ec4\u62ec\u53f7\u7528\u4e8e\u6761\u4ef6\u5217\u8868\uff0c\u5e76\u4e14\u6bcf\u4e2a\u6761\u4ef6\u4e5f\u88ab\u5305\u88f9\u5728\u5176\u4e2d\u3002"]}),(0,l.jsxs)(s.p,{children:["04:00",(0,l.jsx)(s.br,{}),"\n","\u4e86\u89e3\u8c1c\u9898\u7684\u7ed3\u6784\u975e\u5e38\u91cd\u8981\uff0c\u4ee5\u786e\u4fdd\u60a8\u63d0\u4f9b\u7684\u89e3\u51b3\u65b9\u6848\u7ed3\u6784\u6b63\u786e\u3002 \u73b0\u5728\u6211\u4eec\u5c06\u7f16\u7801\u7684\u89e3\u51b3\u65b9\u6848\u6dfb\u52a0\u5230\u6211\u4eec\u7684\u82b1\u8d39\u5305\u4e2d\uff0c\u5176\u4e2d\u5df2\u7ecf\u5305\u542b\u4e86\u6765\u81ea\u786c\u5e01\u521b\u5efa\u7684\u786c\u5e01\u4fe1\u606f\u548c\u8c1c\u9898\u5c55\u793a\u3002 \u63a5\u4e0b\u6765\uff0c\u6211\u4eec\u5c06\u4f7f\u7528\u6211\u4eec\u5728\u4e0a\u4e00\u4e2a\u89c6\u9891\u4e2d\u6982\u8ff0\u7684\u65b9\u6cd5\u83b7\u53d6\u6211\u4eec\u7684\u7b7e\u540d\u3002 \u6211\u4eec\u5c06\u89e3\u51b3\u65b9\u6848\u8fdb\u884c\u54c8\u5e0c\u5904\u7406\uff0c\u7136\u540e\u5c06\u5176\u4e0e\u786c\u5e01 ID \u548c\u8d77\u6e90\u6311\u6218\u8fdb\u884c\u8fde\u63a5\u3002"]}),(0,l.jsxs)(s.p,{children:["04:20",(0,l.jsx)(s.br,{}),"\n","\u73b0\u5728\u6211\u4eec\u53ef\u4ee5\u4f7f\u7528 ",(0,l.jsx)(s.code,{children:"chia keys sign"})," \u5bf9\u7ed3\u679c\u6d88\u606f\u8fdb\u884c\u7b7e\u540d\uff0c\u5e76\u5c06\u7b7e\u540d\u590d\u5236\u5230\u6211\u4eec\u7684\u82b1\u8d39\u5305\u4e2d\uff0c\u786e\u4fdd\u9644\u52a0 ",(0,l.jsx)(s.code,{children:"0x"})," \u4ee5\u8868\u793a\u5b83\u662f\u4e00\u4e2a\u503c\u3002 \u73b0\u5728\u8fd0\u884c ",(0,l.jsx)(s.code,{children:"cdv rpc pushtx spendbundle.json"}),"\u3002"]}),(0,l.jsxs)(s.p,{children:["04:40",(0,l.jsx)(s.br,{}),"\n","\u5982\u679c\u5757\u6570\u5c1a\u672a\u7ecf\u8fc7\uff0c\u5b83\u5c06\u663e\u793a\u4e3a\u6302\u8d77\u72b6\u6001\u3002 \u5982\u679c\u6210\u529f\uff0c\u6211\u4eec\u53ef\u4ee5\u518d\u6b21\u67e5\u627e\u786c\u5e01\u8bb0\u5f55\uff0c\u5e76\u67e5\u770b\u5df2\u82b1\u8d39\u7684\u5757\u7d22\u5f15\u6bd4\u786e\u8ba4\u7684\u5757\u7d22\u5f15\u665a\u4e86 20 \u4e2a\u5757\u3002 \u5728\u8fd9\u4e2a\u89c6\u9891\u4e2d\uff0c\u6211\u4eec\u5b66\u4e60\u4e86\u5185\u90e8\u8c1c\u9898\u7684\u5de5\u4f5c\u539f\u7406\u4ee5\u53ca\u5b83\u4eec\u4e0e\u5916\u90e8\u8c1c\u9898\u7684\u4ea4\u4e92\u3002 \u975e\u5e38\u611f\u8c22\u89c2\u770b\uff0c\u4e0b\u6b21\u518d\u89c1\u3002"]})]}),"\n",(0,l.jsx)(s.hr,{}),"\n",(0,l.jsx)(s.h2,{id:"\u5e38\u89c1\u95ee\u9898",children:"\u5e38\u89c1\u95ee\u9898"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.strong,{children:"\u66f4\u591a\u7684\u62ec\u53f7"}),"\uff1a\u91cd\u8981\u7684\u662f\u8981\u6ce8\u610f\u4f60\u7684\u89e3\u51b3\u65b9\u6848\u5c06\u5728\u8c1c\u9898\u4e2d\u7684\u54ea\u91cc\u4f7f\u7528\uff0c\u5e76\u7528\u9002\u5f53\u6570\u91cf\u7684\u62ec\u53f7\u5c06\u5b83\u4eec\u5305\u88f9\u8d77\u6765\u3002 \u8fd9\u53ef\u80fd\u6709\u4e9b\u53cd\u76f4\u89c9\uff0c\u56e0\u4e3a\u4e4d\u4e00\u770b\uff0c\u62ec\u53f7\u4f3c\u4e4e\u662f\u4e0d\u5fc5\u8981\u7684\u3002"]}),"\n"]}),"\n",(0,l.jsx)(s.hr,{}),"\n",(0,l.jsx)(s.h2,{id:"\u77e5\u8bc6\u68c0\u6d4b",children:"\u77e5\u8bc6\u68c0\u6d4b"}),"\n",(0,l.jsx)(s.admonition,{title:"\u95ee\u98981 - \u8bc4\u4f30\u5185\u90e8\u8c1c\u9898",type:"tip",children:(0,l.jsx)(s.p,{children:"\u4ec0\u4e48\u8fd0\u7b97\u7b26\u7528\u4e8e\u8bc4\u4f30\u53e6\u4e00\u4e2a\u8c1c\u9898\u4e2d\u7684\u8c1c\u9898\uff1f"})}),"\n",(0,l.jsxs)(n,{children:[(0,l.jsx)("summary",{children:" Answer (expand when ready to see the answer)  "}),(0,l.jsxs)(s.p,{children:[(0,l.jsx)(s.code,{children:"apply"}),"\u8fd0\u7b97\u7b26\u3002 (",(0,l.jsx)(s.code,{children:"a"}),")"]}),(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-chialisp",children:"(a INNER_PUZZLE inner_solution)\n"})})]}),"\n",(0,l.jsx)(s.admonition,{title:"\u95ee\u98982 - \u4e00\u4e2a\u65b0\u6761\u4ef6",type:"tip",children:(0,l.jsxs)(s.p,{children:[(0,l.jsx)(s.code,{children:"ASSERT_HEIGHT_RELATIVE"})," \u6761\u4ef6\u68c0\u67e5\u4ec0\u4e48\uff1f"]})}),"\n",(0,l.jsxs)(n,{children:[(0,l.jsx)("summary",{children:" Answer (expand when ready to see the answer)  "}),(0,l.jsxs)(s.p,{children:[(0,l.jsx)(s.code,{children:"ASSERT_HEIGHT_RELATIVE"})," \u68c0\u67e5\u81ea\u8d27\u5e01\u521b\u5efa\u4ee5\u6765\u7ecf\u8fc7\u4e86\u591a\u5c11\u4e2a\u533a\u5757\u3002 \u5b83\u5141\u8bb8\u5728\u9884\u5b9a\u4e49\u6570\u91cf\u7684\u533a\u5757\u7ecf\u8fc7\u540e\u89e3\u51b3\u8c1c\u9898\u3002"]})]}),"\n",(0,l.jsx)(s.hr,{}),"\n",(0,l.jsx)(s.h2,{id:"\u9644\u52a0\u8d44\u6e90",children:"\u9644\u52a0\u8d44\u6e90"}),"\n",(0,l.jsx)(s.h3,{id:"\u53ef\u8fd0\u884c\u7684chialisp\u548cclvm\u63d2\u4ef6",children:"\u53ef\u8fd0\u884c\u7684Chialisp\u548cclvm\u63d2\u4ef6"}),"\n",(0,l.jsxs)(s.p,{children:["\u6709\u5173\u4f7f\u7528\u8fd9\u4e9b\u63d2\u4ef6\u7684\u4fe1\u606f\uff0c\u8bf7\u53c2\u9605",(0,l.jsx)(s.a,{href:"/academy-overview#%E5%8F%AF%E8%BF%90%E8%A1%8C%E7%9A%84chialisp%E5%92%8Cclvm%E6%8F%92%E4%BB%B6",children:"\u5b66\u9662\u6982\u8ff0"}),"\u3002"]}),"\n",(0,l.jsx)(s.h4,{id:"chialisp-\u63d2\u4ef6",children:"Chialisp \u63d2\u4ef6"}),"\n",(0,l.jsx)(c.A,{flavor:"chialisp",input:"(10 99)",children:(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-chialisp",children:'(mod (arg1 arg2)\n    (if (> (+ arg1 arg2) 100) "large" "small")\n)\n'})})}),"\n",(0,l.jsx)(s.h4,{id:"clvm\u63d2\u4ef6",children:"Clvm\u63d2\u4ef6"}),"\n",(0,l.jsx)(c.A,{flavor:"clvm",input:"(1)",children:(0,l.jsx)(s.pre,{children:(0,l.jsx)(s.code,{className:"language-chialisp",children:'(a (i 2 (q 1 . "true") (q 1 . "false")) 1)\n'})})}),"\n",(0,l.jsx)(s.h3,{id:"\u94fe\u63a5",children:"\u94fe\u63a5"}),"\n",(0,l.jsxs)(s.ul,{children:["\n",(0,l.jsxs)(s.li,{children:[(0,l.jsx)(s.a,{href:"https://chialisp.com/chialisp-concepts/",children:"Chialisp\u57fa\u672c\u6982\u5ff5"}),"\uff1a\u5305\u62ec\u67ef\u91cc\u5316\uff08currying\uff09\u3001\u5185\u90e8\u8c1c\u9898\uff08inner puzzles\uff09\u548c\u6761\u4ef6\u53d8\u6362\uff08morphing conditions\uff09\u7684\u6982\u8ff0\u3002"]}),"\n",(0,l.jsxs)(s.li,{children:["\u6307\u5bfc\u6027\u7684",(0,l.jsx)(s.a,{href:"https://docs.chia.net/guides/",children:"Chialisp\u6f14\u7ec3"}),"\uff1a\u5b89\u88c5\u3001\u521b\u5efa\u667a\u80fd\u5e01\u548c\u4f7f\u7528BLS\u7b7e\u540d\u7684\u6307\u5357\u3002"]}),"\n",(0,l.jsxs)(s.li,{children:["Chialisp",(0,l.jsx)(s.a,{href:"https://chialisp.com/",children:"\u8be6\u7ec6\u6587\u6863"}),"\uff1a\u63d0\u4f9b\u6709\u5173Chialisp\u5404\u4e2a\u65b9\u9762\u7684\u8be6\u7ec6\u4fe1\u606f\u3002"]}),"\n",(0,l.jsxs)(s.li,{children:["Support ",(0,l.jsx)(s.a,{href:"https://discord.gg/chia",children:"in discord"}),": for further support join our discord server and ask in the #chialisp or #support channels."]}),"\n"]}),"\n",(0,l.jsx)(s.hr,{})]})}function p(e={}){const{wrapper:s}={...(0,r.R)(),...e.components};return s?(0,l.jsx)(s,{...e,children:(0,l.jsx)(h,{...e})}):h(e)}},4893:(e,s,n)=>{"use strict";n.d(s,{A:()=>y});var i=n(8532),l=n(11),r=n(1765),c=n(6540),o=n(5604),t=n(6069),d=n.n(t),a=n(9704),h=n.n(a),p=n(1690),u=n.n(p);function x(e){return e instanceof Array||(0,c.isValidElement)(e)?c.Children.toArray(e).reduce(((e,s)=>{let n="";return n=(0,c.isValidElement)(s)&&m(s)?x(s.props.children):(0,c.isValidElement)(s)&&!m(s)?"":j(s),e.concat(n)}),""):j(e)}function j(e){return null==e||"boolean"==typeof e||"{}"===JSON.stringify(e)?"":e.toString()}function m(e){return(0,c.isValidElement)(e)&&Boolean(e.props.children)}var g=n(4848);function y(e){let{children:s,flavor:n,input:t,tests:d,reporter:a}=e;const{colorMode:p}=(0,i.G)(),j=(0,c.useMemo)((()=>x(s).trim()),[]),[m,y]=(0,c.useState)(j),[b,v]=(0,c.useState)(t??Object.keys(d??{})[0]?.trim()??""),[E,_]=(0,c.useState)(""),[C,z]=(0,c.useState)(0n),[S,I]=(0,c.useState)(null),k=e=>e.replace("Error: ",""),P=(e,s)=>{try{return e.run(s)}catch(n){return _(`While evaluating: ${k(""+n)}`),null}},N=()=>{const e=(()=>{try{return l.Program.fromSource(m)}catch(e){return _(`While parsing: ${k(""+e)}`),null}})();if(!e)return;const s="clvm"===n||e.isCons&&e.first.equals(l.Program.fromText("mod")),i=(e=>{if(n&&"chialisp"!==n)return e;try{return e.compile().value}catch(s){return _(`While compiling: ${k(""+s)}`),null}})(e);if(!i)return;const r=b?l.Program.fromSource(b):l.Program.nil,c=s?P(i,r):{value:i,cost:0n};c&&(_(c.value.toSource()),z(c.cost));let o=!0;for(const[n,t]of Object.entries(d??{})){const e=l.Program.fromSource(n),r=s?P(i,e)?.value:i;if(!r||r.toSource()!==t){o=!1;break}}a?.(o),I(o)},w=S?o.CMH:o.QCr,[A,R]=c.useState(!1);return(0,c.useEffect)((()=>R(!0)),[]),(0,g.jsx)(r.f4,{Prism:globalThis.Prism,theme:A&&("dark"===p?h():u()),code:m,language:"chialisp",children:e=>{let{className:s,style:i}=e;return(0,g.jsxs)("pre",{className:s,style:{...i,position:"relative"},children:[b?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(f,{code:b,setCode:v,language:"chialisp"}),(0,g.jsx)("hr",{style:{marginTop:"14px",marginBottom:"14px"}})]}):"",(0,g.jsx)(f,{code:m,setCode:y,language:"chialisp"}),(0,g.jsx)("div",{style:{position:"absolute",top:"16px",right:"16px"},children:(0,g.jsxs)("div",{style:{display:"flex",alignItems:"center",gap:"14px"},children:[(0,g.jsx)("span",{style:{marginRight:"8px"},children:n&&"chialisp"!==n?"CLVM":"Chialisp"}),!b&&(0,g.jsx)(o.TlQ,{size:24,className:"icon-button",cursor:"pointer",onClick:()=>v("()")}),(0,g.jsx)(o.gSK,{size:24,className:"icon-button",cursor:"pointer",onClick:N})]})}),E?(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("hr",{style:{marginTop:"14px",marginBottom:"14px"}}),(0,g.jsx)("div",{style:{display:"inline-block"},children:(0,g.jsx)(f,{code:E,language:"chialisp"})}),E&&(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)("div",{style:{display:"inline-block",position:"absolute",right:"60px"},children:(0,g.jsx)(f,{code:`Cost: ${C}`,language:"chialisp"})}),(0,g.jsx)(w,{size:24,color:S?"#77FF77":"#FF7777",style:{position:"absolute",bottom:"16px",right:"16px"}})]})]}):""]})}})}function f(e){let{code:s,setCode:n,language:l}=e;const{colorMode:o}=(0,i.G)(),[t,a]=c.useState(!1);return(0,c.useEffect)((()=>a(!0)),[]),(0,g.jsx)(g.Fragment,{children:(0,g.jsx)(r.f4,{Prism:globalThis.Prism,theme:t&&("dark"===o?h():u()),code:s,language:l,children:e=>{let{tokens:i,getLineProps:l,getTokenProps:r}=e,c=i.map(((e,s)=>(0,g.jsx)("div",{...l({line:e}),children:e.map(((e,s)=>(0,g.jsx)("span",{...r({token:e})},s)))},s)));return n?(0,g.jsx)(d(),{value:s,onValueChange:e=>n(e),highlight:()=>c,padding:0}):c}})})}},9704:e=>{e.exports={plain:{color:"#F8F8F2",backgroundColor:"#282A36",fontWeight:"bold"},styles:[{types:["keyword"],style:{color:"rgb(189, 147, 249)"}},{types:["listop","class-name","quotes"],style:{color:"rgb(80, 250, 123)"}},{types:["builtin"],style:{color:"rgb(5, 227, 223)"}},{types:["number","hexadecimal","string","boolean"],style:{color:"rgb(255, 184, 108)",fontWeight:"normal"}},{types:["punctuation","symbol"],style:{color:"rgb(248, 248, 242)"}},{types:["variable"],style:{fontStyle:"italic"}},{types:["comment"],style:{color:"rgb(98, 114, 164)",fontWeight:"normal"}},{types:["function","car"],style:{color:"rgb(241, 250, 140)"}}]}},1690:e=>{e.exports={plain:{color:"#383a42",backgroundColor:"#fafafa",fontWeight:"bold"},styles:[{types:["keyword"],style:{color:"#990096"}},{types:["listop","class-name","quotes"],style:{color:"#006100"}},{types:["builtin"],style:{color:"#127EAF"}},{types:["number","hexadecimal","string","boolean"],style:{color:"#B35C00",fontWeight:"normal"}},{types:["punctuation","symbol"],style:{color:"#383a42"}},{types:["variable"],style:{fontStyle:"italic"}},{types:["comment"],style:{color:"#73737D",fontWeight:"normal"}},{types:["function","car"],style:{color:"#0045DB"}}]}}}]);