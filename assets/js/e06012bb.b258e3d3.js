"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[4026],{984:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>h,frontMatter:()=>r,metadata:()=>l,toc:()=>c});var s=t(5893),i=t(1151);const r={title:"Storage Benchmarks",slug:"/storage-benchmarks"},o="FIO",l={id:"resources/storage-benchmarks",title:"Storage Benchmarks",description:"To have reproducible results the aim should be to limit caching effects. For that:",source:"@site/docs/resources/storage-benchmarks.md",sourceDirName:"resources",slug:"/storage-benchmarks",permalink:"/storage-benchmarks",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/resources/storage-benchmarks.md",tags:[],version:"current",frontMatter:{title:"Storage Benchmarks",slug:"/storage-benchmarks"},sidebar:"tutorialSidebar",previous:{title:"FAQ",permalink:"/faq"},next:{title:"Glossary",permalink:"/glossary"}},a={},c=[{value:"Install from sources",id:"install-from-sources",level:2},{value:"Run single threaded",id:"run-single-threaded",level:2},{value:"Run multi threaded",id:"run-multi-threaded",level:2}];function d(e){const n={a:"a",admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.admonition,{title:"Notes",type:"note",children:[(0,s.jsx)(n.p,{children:"To have reproducible results the aim should be to limit caching effects. For that:"}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"Test data should be forced to storage and larger than flash drive's internal caches"}),"\n",(0,s.jsx)(n.li,{children:"Block caches should be emptied between tests"}),"\n"]})]}),"\n",(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"fio",children:(0,s.jsx)(n.a,{href:"https://fio.readthedocs.io/en/latest/fio_doc.html",children:"FIO"})})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"sudo apt update"}),"\n",(0,s.jsx)(n.code,{children:"sudo apt install fio"})]}),"\n",(0,s.jsx)(n.p,{children:'Save this file as a job file called "chia.fio" or whatever you want, and change filename to the path of the drive or RAID volume that you want to test'}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"[global]\nbs=128K\niodepth=256\ndirect=1\nioengine=libaio\ngroup_reporting\ntime_based\nname=chia\nlog_avg_msec=1000\nbwavgtime=1000\nfilename=/<yourRAID>/fiotest.tmp\nsize=100G\n\n[rd_qd_256_128k_1w]\nstonewall\nbs=128k\niodepth=256\nnumjobs=1\nrw=read\nruntime=60\nwrite_bw_log=seq_read_bw.log\n\n[wr_qd_256_128k_1w]\nstonewall\nbs=128k\niodepth=256\nnumjobs=1\nrw=write\nruntime=60\nwrite_bw_log=seq_write_bw.log\n"})}),"\n",(0,s.jsxs)(n.p,{children:["run ",(0,s.jsx)(n.code,{children:"sudo fio chia.fio"})]}),"\n",(0,s.jsx)(n.h1,{id:"iozone",children:(0,s.jsx)(n.a,{href:"http://www.iozone.org/",children:"IOzone"})}),"\n",(0,s.jsx)(n.p,{children:"This assumes RHEL stack Linux."}),"\n",(0,s.jsx)(n.h2,{id:"install-from-sources",children:"Install from sources"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:'sudo yum update -y\nsudo yum groupinstall "Development Tools" -y\ncd /opt\nwget http://www.iozone.org/src/current/iozone3_490.tar\ntar -xvf iozone3_490.tar\ncd iozone3_490/src/current\nmake linux-AMD64\n'})}),"\n",(0,s.jsx)(n.h2,{id:"run-single-threaded",children:"Run single threaded"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Assume the test drive or volume is mounted as ",(0,s.jsx)(n.strong,{children:"/chia/scratch/disk01"})]}),"\n",(0,s.jsx)(n.li,{children:"-i 0=write/rewrite"}),"\n",(0,s.jsx)(n.li,{children:"-i 1=read/re-read"}),"\n",(0,s.jsx)(n.li,{children:"-i 2=random-read/write"}),"\n",(0,s.jsx)(n.li,{children:"-i 8=random_mix"}),"\n",(0,s.jsx)(n.li,{children:"-e Include flush (fsync,fflush) in the timing calculations"}),"\n",(0,s.jsx)(n.li,{children:"-r # record size in Kb"}),"\n",(0,s.jsx)(n.li,{children:"-s # file size in GB"}),"\n",(0,s.jsx)(n.li,{children:"-U Mount point to remount between tests, this option will clear the block caches between tests. For this to work, mounting of the disk/volume needs to be configured in /etc/fstab."}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{children:"/opt/iozone3_490/src/current/iozone -e -r 256 -s 32G -i 0 -i 1 -i 2 -i 8 -f /chia/scratch/disk01/tfile -U /chia/scratch/disk01\n"})}),"\n",(0,s.jsx)(n.h2,{id:"run-multi-threaded",children:"Run multi threaded"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["Assume the test drive or volume is mounted as ",(0,s.jsx)(n.strong,{children:"/chia/scratch/disk01"})]}),"\n",(0,s.jsx)(n.li,{children:"-I Use DIRECT I/O for all file operations. Tells the filesystem that all operations are to bypass the buffer cache and go directly to disk. This also will use VX_DIRECT on VxFS, and O_DIRECT on Linux, and directio() on Solaris."}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,i.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}},1151:(e,n,t)=>{t.d(n,{Z:()=>l,a:()=>o});var s=t(7294);const i={},r=s.createContext(i);function o(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);