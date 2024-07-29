"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[366],{3026:(e,n,r)=>{r.r(n),r.d(n,{assets:()=>d,contentTitle:()=>s,default:()=>o,frontMatter:()=>t,metadata:()=>c,toc:()=>l});var a=r(5893),i=r(1151);const t={title:"Reference Farming Hardware",slug:"/reference-farming-hardware"},s="\u53c2\u8003\u8015\u79cd\uff08Farming\uff09\u786c\u4ef6 - \u9002\u7528\u4e8e\u4efb\u4f55\u89c4\u6a21\u7684\u8015\u79cd",c={id:"farming/reference-farming-hardware",title:"Reference Farming Hardware",description:"\u597d\u5947\u8005",source:"@site/i18n/zh-Hans/docusaurus-plugin-content-docs/current/farming/reference-farming-hardware.md",sourceDirName:"farming",slug:"/reference-farming-hardware",permalink:"/zh-Hans/reference-farming-hardware",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/farming/reference-farming-hardware.md",tags:[],version:"current",frontMatter:{title:"Reference Farming Hardware",slug:"/reference-farming-hardware"},sidebar:"tutorialSidebar",previous:{title:"Checking Farm Health",permalink:"/zh-Hans/checking-farm-health"},next:{title:"Farming Considerations",permalink:"/zh-Hans/farming-considerations"}},d={},l=[{value:"\u597d\u5947\u8005",id:"\u597d\u5947\u8005",level:2},{value:"\u7231\u597d\u8005",id:"\u7231\u597d\u8005",level:2},{value:"NAS",id:"nas",level:3},{value:"\u591a\u786c\u76d8\u7684\u5916\u90e8\u5b58\u50a8\uff08USB\uff09",id:"\u591a\u786c\u76d8\u7684\u5916\u90e8\u5b58\u50a8usb",level:3},{value:"\u5e26\u6709\u5927\u91cf\u786c\u76d8\u7684\u53f0\u5f0f\u8ba1\u7b97\u673a",id:"\u5e26\u6709\u5927\u91cf\u786c\u76d8\u7684\u53f0\u5f0f\u8ba1\u7b97\u673a",level:3},{value:"\u4e13\u4e1a\u7528\u6237",id:"\u4e13\u4e1a\u7528\u6237",level:2},{value:"\u4e13\u4e1a\u519c\u6c11",id:"\u4e13\u4e1a\u519c\u6c11",level:2}];function h(e){const n={h1:"h1",h2:"h2",h3:"h3",p:"p",...(0,i.a)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.h1,{id:"\u53c2\u8003\u8015\u79cdfarming\u786c\u4ef6---\u9002\u7528\u4e8e\u4efb\u4f55\u89c4\u6a21\u7684\u8015\u79cd",children:"\u53c2\u8003\u8015\u79cd\uff08Farming\uff09\u786c\u4ef6 - \u9002\u7528\u4e8e\u4efb\u4f55\u89c4\u6a21\u7684\u8015\u79cd"}),"\n",(0,a.jsx)(n.h2,{id:"\u597d\u5947\u8005",children:"\u597d\u5947\u8005"}),"\n",(0,a.jsx)(n.p,{children:"\u5f00\u59cbChia\u8015\u79cd\u7684\u6700\u7b80\u5355\u65b9\u6cd5\u662f\u5c06USB\u786c\u76d8\u8fde\u63a5\u5230\u53f0\u5f0f\u8ba1\u7b97\u673a\uff0c\u6216\u8005\u5b89\u88c5SATA\u786c\u76d8\u3002 \u8015\u79cd\u6240\u9700\u7684\u6700\u5c0f\u5b58\u50a8\u91cf\u4ec5\u4e3a\u4e00\u4e2a\u5730\u5757(Plot)\uff01 \u521d\u5b66\u8005\u5e94\u8be5\u4ece\u51e0\u4e2a\u786c\u76d8\u5f00\u59cb\uff0c\u4f7f\u8015\u79cd\u8fd0\u884c\u503c\u5f97\uff0c\u6bcf\u6708\u8d5a\u53d6\u51e0\u7f8e\u5143\u3002 \u53ef\u4ee5\u4f7f\u7528\u53f0\u5f0f\u8ba1\u7b97\u673a\u6765\u751f\u6210\u5730\u5757\uff08plots\uff09\uff08\u8bf7\u53c2\u9605\u751f\u6210\u5730\u5757\u90e8\u5206\uff09\u3002 \u8fd8\u6709\u4e00\u4e9b\u516c\u53f8\uff08\u5982Evergreen\uff09\uff0c\u901a\u8fc7\u63d0\u4f9b\u9884\u5148\u751f\u6210\u5730\u5757\u7684\u786c\u76d8\u548c\u79fb\u52a8\u5e94\u7528\u7a0b\u5e8f\uff0c\u7b80\u5316\u4e86\u751f\u6210\u5730\u5757\u7684\u8fc7\u7a0b\u3002 \u5bf9\u4e8e\u597d\u5947\u7684\u519c\u6c11\u6765\u8bf4\uff0c\u751f\u6210\u5730\u5757\u53ef\u80fd\u662f\u9650\u5236\u56e0\u7d20\uff0c\u56e0\u4e3a\u4ed6\u4eec\u7684\u53f0\u5f0f\u8ba1\u7b97\u673a\u6216\u7b14\u8bb0\u672c\u53ef\u80fd\u6ca1\u6709\u8db3\u591f\u7684\u8ba1\u7b97\u8d44\u6e90\u548c\u9002\u5408\u751f\u6210\u5730\u5757\u7684\u4e34\u65f6SSD\u5b58\u50a8\uff0c\u4f46\u5373\u4f7f\u5bf9\u4e8e\u521d\u5b66\u8005\u6765\u8bf4\uff0c\u7528\u5730\u5757\u586b\u6ee1\u4e00\u4e2a\u786c\u76d8\u4e5f\u76f8\u5f53\u5bb9\u6613\u3002"}),"\n",(0,a.jsx)("img",{src:"https://www.chia.net/wp-content/uploads/2023/04/Hard-Drive-Standard.webp",width:"300"}),"\n",(0,a.jsx)(n.h2,{id:"\u7231\u597d\u8005",children:"\u7231\u597d\u8005"}),"\n",(0,a.jsx)(n.p,{children:"\u5f53\u60a8\u62e5\u6709\u51e0\u767eTB\u7684\u5b58\u50a8\u7a7a\u95f4\u65f6\uff0c\u8003\u8651\u4f7f\u7528\u4e13\u7528\u7684\u53f0\u5f0f\u8ba1\u7b97\u673a\u7528\u4e8eChia\u8015\u79cd\uff0c\u6216\u8005\u4f7f\u7528NAS\u6216\u5916\u90e8\u5b58\u50a8\u76d2\u3002 \u4e00\u4e2a\u7ecf\u9a8c\u6cd5\u5219\u662f\u8981\u67e5\u770b\u6bcf\u4e2a\u63d2\u69fd\uff08\u6bcf\u4e2a\u786c\u76d8\uff09\u7684\u6210\u672c\uff0c\u4ee5\u514d\u4e3a\u4e86\u5b58\u50a8\u78c1\u76d8\u800c\u82b1\u8d39\u6bd4\u78c1\u76d8\u672c\u8eab\u66f4\u591a\u7684\u94b1\uff01"}),"\n",(0,a.jsx)("img",{src:"https://www.chia.net/wp-content/uploads/2023/04/nas-glass.jpg",width:"300"}),"\n",(0,a.jsx)(n.h3,{id:"nas",children:"NAS"}),"\n",(0,a.jsx)(n.p,{children:"NAS\uff08\u7f51\u7edc\u9644\u52a0\u5b58\u50a8\uff09\u662f\u4e00\u79cd\u4e13\u7528\u8bbe\u5907\uff0c\u901a\u8fc7\u786c\u76d8\u69fd\u4f4d\u3001\u8f7b\u91cf\u7ea7CPU\u548cDRAM\u63d0\u4f9b\u5b58\u50a8\u670d\u52a1\u3002 NAS\u901a\u8fc7\u7f51\u7edc\u63d0\u4f9b\u5b58\u50a8\uff08\u4e0e\u76f4\u8fde\u5b58\u50a8DAS\u76f8\u5bf9\uff09\u3002 NAS\u5728\u8f83\u5c0f\u7684\u7a7a\u95f4\u4e2d\u62e5\u6709\u5927\u91cf\u786c\u76d8\uff0c\u975e\u5e38\u9ad8\u6548\u8282\u80fd\u3002 \u552f\u4e00\u7684\u7f3a\u70b9\u662f\u5b83\u4eec\u901a\u5e38\u6bd4\u539f\u59cb\u5b58\u50a8\u76d2\u66f4\u6602\u8d35\uff0c\u56e0\u4e3a\u5b83\u4eec\u662f\u4e3a\u6d88\u8d39\u8005\u5b58\u50a8\u548c\u5e94\u7528\u800c\u8bbe\u8ba1\u7684\u3002"}),"\n",(0,a.jsx)(n.h3,{id:"\u591a\u786c\u76d8\u7684\u5916\u90e8\u5b58\u50a8usb",children:"\u591a\u786c\u76d8\u7684\u5916\u90e8\u5b58\u50a8\uff08USB\uff09"}),"\n",(0,a.jsx)(n.p,{children:"\u4f7f\u7528USB\u7684\u5916\u90e8\u5b58\u50a8\u76d2\u53ef\u4ee5\u901a\u8fc7\u5355\u4e2aUSB\u7535\u7f06\u8fde\u63a55-8\u4e2a\u786c\u76d8\uff0c\u5e76\u5177\u6709\u96c6\u6210\u7535\u6e90\u548c\u6563\u70ed\uff08\u98ce\u6247\uff09\u3002 \u8fd9\u5bf9\u4e8e\u7231\u597d\u8005\u6765\u8bf4\u662f\u4e00\u4e2a\u5f88\u597d\u7684\u9009\u62e9\uff0c\u53ef\u4ee5\u6269\u5c55\u4ed6\u4eec\u76ee\u524d\u7684\u8ba1\u7b97\u673a\u786c\u4ef6\u3002"}),"\n",(0,a.jsx)(n.h3,{id:"\u5e26\u6709\u5927\u91cf\u786c\u76d8\u7684\u53f0\u5f0f\u8ba1\u7b97\u673a",children:"\u5e26\u6709\u5927\u91cf\u786c\u76d8\u7684\u53f0\u5f0f\u8ba1\u7b97\u673a"}),"\n",(0,a.jsx)(n.p,{children:"\u6807\u51c6\u7684\u5168\u5854\u5f0f\u53f0\u5f0f\u8ba1\u7b97\u673a\u53ef\u4ee5\u5bb9\u7eb38-12\u4e2a3.5\u82f1\u5bf8\u786c\u76d8\u3002 \u8fd9\u4e9b\u673a\u7bb1\u5bf9\u4e8e\u90a3\u4e9b\u5df2\u7ecf\u7ec4\u5efa\u8fc7\u6807\u51c6\u53f0\u5f0f\u8ba1\u7b97\u673a\u7684\u4eba\u6765\u8bf4\u975e\u5e38\u53cb\u597d\uff0c\u5b89\u88c5\u786c\u76d8\u53ea\u9700\u7528SATA\u6570\u636e\u7ebf\u548cATX\u7535\u6e90\u5c31\u53ef\u4ee5\uff0c\u4e0d\u9700\u8981\u5927\u91cf\u4e13\u4e1a\u8ba1\u7b97\u673a\u7ecf\u9a8c\u3002"}),"\n",(0,a.jsx)(n.h2,{id:"\u4e13\u4e1a\u7528\u6237",children:"\u4e13\u4e1a\u7528\u6237"}),"\n",(0,a.jsx)(n.p,{children:"\u4e13\u4e1a\u7528\u6237\u7684\u5b58\u50a8\u76ee\u6807\u662f\u8d85\u8fc71PB\uff0c\u8fd9\u65f6\u66f4\u9ad8\u7ea7\u7684\u7b56\u7565\u5f00\u59cb\u53d1\u6325\u4f5c\u7528\u3002 \u8fd9\u4e9b\u7b56\u7565\u5305\u62ecGPU\u7ed8\u56fe\u3001HBA\uff08\u4e3b\u673a\u603b\u7ebf\u9002\u914d\u5668\uff09\u548c\u4f7f\u7528\u7684\u4f01\u4e1a\u7ea7\u5b58\u50a8\u670d\u52a1\u5668\u3002 \u4f7f\u7528\u8fc7\u7684\u4f01\u4e1a\u7ea7\u5b58\u50a8\u8bbe\u5907\u662f\u4e00\u4e2a\u5f88\u597d\u7684\u8d77\u70b9\uff0c\u56e0\u4e3a\u53ef\u4ee5\u5728eBay\u7b49\u4e8c\u624b\u5e02\u573a\u4e0a\u627e\u5230\u4ef7\u683c\u4fbf\u5b9c\u7684\u9ad8\u786c\u76d8\u8ba1\u6570\u7684\u670d\u52a1\u5668\u3002 \u65e7\u7684JBOD\uff08\u4ec5\u6709\u4e00\u5806\u786c\u76d8\uff09\u53ef\u4ee5\u5bb9\u7eb324-45\u4e2a\u786c\u76d8\uff0c\u53ef\u4ee5\u5728\u4e8c\u624b\u5e02\u573a\u4e0a\u627e\u5230\u51e0\u767e\u7f8e\u5143\u7684\u4ef7\u683c\u3002 \u5c3d\u7ba1\u8fd9\u4e9b\u8bbe\u5907\u6210\u672c\u8f83\u4f4e\uff0c\u4f46\u519c\u6c11\u9700\u8981\u4e86\u89e3\u4f01\u4e1a\u7ea7\u5b58\u50a8\u534f\u8bae\u548c\u57fa\u7840\u8bbe\u65bd\uff0c\u6bd4\u5982SAS\u3002 \u4e13\u4e1a\u7528\u6237\u901a\u5e38\u6df7\u5408\u4f7f\u7528\u6d88\u8d39\u8005\u548c\u4f01\u4e1a\u7ea7\u8bbe\u5907\uff0c\u4ee5\u5728\u8d2d\u4e70\u65f6\u4ee5\u65e0\u60c5\u7684\u6210\u672c\u6548\u76ca\u3002"}),"\n",(0,a.jsx)("img",{src:"https://www.chia.net/wp-content/uploads/2023/04/desktop-farmer.webp?",width:"300"}),"\n",(0,a.jsx)(n.h2,{id:"\u4e13\u4e1a\u519c\u6c11",children:"\u4e13\u4e1a\u519c\u6c11"}),"\n",(0,a.jsx)(n.p,{children:"\u81f4\u529b\u4e8e\u591a\u4e2aPB\u7684\u4e25\u8083\u7684Chia\u519c\u6c11\u5c06\u4e0d\u5f97\u4e0d\u8fdb\u5165\u670d\u52a1\u5668\u673a\u67b6\u7684\u4e16\u754c\u3002 \u5e78\u8fd0\u7684\u662f\uff0c\u4e16\u754c\u5404\u5730\u7684\u6570\u636e\u4e2d\u5fc3\u5df2\u7ecf\u4e3a\u5728\u670d\u52a1\u5668\u673a\u67b6\u4e2d\u5b58\u50a8\u6781\u5927\u91cf\u7684\u6570\u636e\u8bbe\u8ba1\u51fa\u4e86\u6700\u4f73\u65b9\u5f0f\u3002 \u4e25\u8083\u7684\u519c\u6c11\u5c06\u4f7f\u7528JBODs\u3002 JBOD\uff08\u4ec5\u6709\u4e00\u5806\u78c1\u76d8\uff09\u662f\u4e00\u79cd\u4e13\u7528\u8bbe\u5907\uff0c\u7528\u4e8e\u5bb9\u7eb3\u5927\u91cf\u786c\u76d8\uff0c\u5e76\u4e0d\u5305\u542b\u4efb\u4f55\u96c6\u6210\u7684\u8ba1\u7b97\u8d44\u6e90\u3002 JBOD\u901a\u5e38\u7531\u4e00\u4e2a\u673a\u7bb1\u3001\u6807\u8bc6\u6bcf\u4e2a\u786c\u76d8\u7684\u673a\u7bb1\u63d2\u69fd\u3001SAS\u6269\u5c55\u5668\u548c\u80cc\u677f\u3001\u98ce\u6247\u548c\u7535\u6e90\u7ec4\u6210\u3002 JBOD\u4e2d\u7684\u6240\u6709\u78c1\u76d8\u53ef\u4ee5\u901a\u8fc7\u8fde\u63a5\u5230\u4e3b\u673a\u670d\u52a1\u5668\u6216\u53f0\u5f0f\u8ba1\u7b97\u673a\u7684\u5355\u4e2aSAS\u7535\u7f06\u6765\u8bbf\u95ee\uff0c\u8be5\u7535\u7f06\u901a\u8fc7HBA\uff08\u4e3b\u673a\u603b\u7ebf\u9002\u914d\u5668\uff09\u5c06PCIe\u63d2\u69fd\u8f6c\u6362\u4e3aSAS\u63a5\u53e3\u3002 \u4e25\u8083\u7684\u519c\u6c11\u5c06\u5728\u673a\u67b6\u4e2d\u653e\u7f6e\u8bb8\u591a\u8fd9\u6837\u7684JBOD\uff0c\u4ee5\u83b7\u5f97\u975e\u5e38\u9ad8\u5bc6\u5ea6\u7684\u5b58\u50a8\uff0c\u4f7f\u7528\u73b0\u4ee3JBOD\u548c\u9ad8\u5bb9\u91cfHDD\uff0c\u5355\u4e2a\u673a\u67b6\u53ef\u4ee5\u8fbe\u5230\u8d85\u8fc710PB\u7684\u5b58\u50a8\u5bb9\u91cf\u3002"}),"\n",(0,a.jsx)("img",{src:"https://www.chia.net/wp-content/uploads/2023/04/Rack-Scael-Edit-2.webp",width:"300"})]})}function o(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},1151:(e,n,r)=>{r.d(n,{Z:()=>c,a:()=>s});var a=r(7294);const i={},t=a.createContext(i);function s(e){const n=a.useContext(t);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:s(e.components),a.createElement(t.Provider,{value:n},e.children)}}}]);