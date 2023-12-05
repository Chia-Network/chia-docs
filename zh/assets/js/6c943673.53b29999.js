"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[6338],{7094:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>o,contentTitle:()=>s,default:()=>h,frontMatter:()=>t,metadata:()=>a,toc:()=>d});var l=i(5893),r=i(1151);i(4866),i(5162);const t={sidebar_label:"Software",title:"Plotting Software",slug:"/plotting-software"},s=void 0,a={id:"plotting/plotting-software",title:"Plotting Software",description:"Several Chia plotters are now available. The output (a plot) will be nearly identical for a given k-value and compression level. However, the hardware requirements are different for each plotter.",source:"@site/docs/plotting/plotting-software.md",sourceDirName:"plotting",slug:"/plotting-software",permalink:"/zh/plotting-software",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/plotting/plotting-software.md",tags:[],version:"current",frontMatter:{sidebar_label:"Software",title:"Plotting Software",slug:"/plotting-software"},sidebar:"tutorialSidebar",previous:{title:"Hardware",permalink:"/zh/plotting-hardware"},next:{title:"Choosing a Compression Level",permalink:"/zh/plotting-compression"}},o={},d=[{value:"Plotters",id:"plotters",level:2},{value:"BladeBit CUDA",id:"bladebit-cuda",level:3},{value:"A GPU plotter, included with Chia 2.0",id:"a-gpu-plotter-included-with-chia-20",level:4},{value:"BladeBit RAM",id:"bladebit-ram",level:3},{value:"An all-memory CPU plotter, included with Chia 2.0",id:"an-all-memory-cpu-plotter-included-with-chia-20",level:4},{value:"Bladebit Disk",id:"bladebit-disk",level:3},{value:"A disk-based (HDD or SSD) CPU plotter, included with Chia 2.0",id:"a-disk-based-hdd-or-ssd-cpu-plotter-included-with-chia-20",level:4},{value:"Gigahorse",id:"gigahorse",level:3},{value:"A third-party GPU plotter, available as a standalone download",id:"a-third-party-gpu-plotter-available-as-a-standalone-download",level:4},{value:"madMAx",id:"madmax",level:3},{value:"A third-party CPU plotter, included with Chia 2.0",id:"a-third-party-cpu-plotter-included-with-chia-20",level:4},{value:"ChiaPoS",id:"chiapos",level:3},{value:"The original Chia CPU-based plotter",id:"the-original-chia-cpu-based-plotter",level:4},{value:"BladeBit (standalone)",id:"bladebit-standalone",level:3},{value:"Choosing a plotter",id:"choosing-a-plotter",level:2},{value:"CLI usage",id:"cli-usage",level:2}];function c(e){const n={a:"a",code:"code",h2:"h2",h3:"h3",h4:"h4",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.a)(),...e.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(n.p,{children:"Several Chia plotters are now available. The output (a plot) will be nearly identical for a given k-value and compression level. However, the hardware requirements are different for each plotter."}),"\n",(0,l.jsx)(n.p,{children:"The three families of plotters include:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"BladeBit -- developed by Chia Network, Inc."}),"\n",(0,l.jsx)(n.li,{children:"madMAx -- developed external to CNI"}),"\n",(0,l.jsx)(n.li,{children:"ChiaPoS -- the original plotter, developed by CNI"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"This page provides details about the plotters that exist within each of these families."}),"\n",(0,l.jsx)(n.h2,{id:"plotters",children:"Plotters"}),"\n",(0,l.jsx)(n.h3,{id:"bladebit-cuda",children:"BladeBit CUDA"}),"\n",(0,l.jsx)(n.h4,{id:"a-gpu-plotter-included-with-chia-20",children:"A GPU plotter, included with Chia 2.0"}),"\n",(0,l.jsx)(n.p,{children:"Plot capabilities"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Type: Compressed or uncompressed"}),"\n",(0,l.jsx)(n.li,{children:"Size: k32 only (larger sizes to be added later)"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Requirements"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"OS: Windows 11 or Debian/Ubuntu Linux (MacOS and other flavors of Linux will likely be supported in the future)"}),"\n",(0,l.jsxs)(n.li,{children:["Memory:","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"For 100% in-memory plotting: 256 GB of DRAM"}),"\n",(0,l.jsx)(n.li,{children:"For RAM + disk plotting: 16 GB (experimental) or 128 GB (supported as of Chia 2.1.0)"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Temporary Disk:","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Not used for 256 GB version"}),"\n",(0,l.jsx)(n.li,{children:"SSD required for <= 128 GB of RAM"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"GPU: CUDA capability 5.2 (NVIDIA 10 series GPU or higher) with 8GB of GPU VRAM"}),"\n",(0,l.jsx)(n.li,{children:"Software: CUDA toolkit version 11.8 or later"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"More info"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"The newest BladeBit plotter, designed to work with CUDA-class GPUs"}),"\n",(0,l.jsx)(n.li,{children:"Creates compressed plots, up to C9 (75.2 GB)"}),"\n",(0,l.jsx)(n.li,{children:"The fastest Chia plotter for most hardware architectures that meet the minimum specs"}),"\n",(0,l.jsx)(n.li,{children:"The 256 GB version creates plots entirely in memory, so no temp disk is needed"}),"\n",(0,l.jsx)(n.li,{children:"Open-source, freely available, no dev fee"}),"\n",(0,l.jsxs)(n.li,{children:["Can also be installed as a ",(0,l.jsx)(n.a,{href:"#bladebit-standalone",children:"standalone build"})]}),"\n",(0,l.jsxs)(n.li,{children:["A detailed analysis of BladeBit CUDA's performance was undertaken by ",(0,l.jsx)(n.a,{href:"https://scienceofmining.com/20230828-BladeBit/BladeBit%20CUDA%20Performance%20Analysis-1.html",children:"scienceofmining.com"})]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{href:"/plotters-cli#cudaplot",children:"CLI documentation"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"Example command"})}),"\n",(0,l.jsx)(n.p,{children:"The following command will create a single plot with a compression level of 7. It will use the specified keys and contract address in case the farmer is located on a different machine. It will use the defaults for the remaining parameters:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"chia plotters bladebit cudaplot -d <destination dir> -f <farmer key> -p <pool key> -c <contract address> -n 1 --compress 7\n"})}),"\n",(0,l.jsx)(n.h3,{id:"bladebit-ram",children:"BladeBit RAM"}),"\n",(0,l.jsx)(n.h4,{id:"an-all-memory-cpu-plotter-included-with-chia-20",children:"An all-memory CPU plotter, included with Chia 2.0"}),"\n",(0,l.jsx)(n.p,{children:"Plot capabilities"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Type: Compressed or uncompressed"}),"\n",(0,l.jsx)(n.li,{children:"Size: k32 only (larger sizes to be added later)"}),"\n",(0,l.jsx)(n.li,{children:(0,l.jsx)(n.a,{href:"https://www.chia.net/2022/08/08/announcing-bladebit-2-0/",children:"More info"})}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Requirements"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"OS: Windows, Mac, or Linux OS (64-bit is required); Intel and ARM (Apple Silicon) are both supported."}),"\n",(0,l.jsx)(n.li,{children:"Memory: 416 GB of available RAM"}),"\n",(0,l.jsx)(n.li,{children:"Temporary Disk: Not used"}),"\n",(0,l.jsx)(n.li,{children:"GPU: Not used"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"More info"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Designed to be used in high-memory servers that don't have a GPU"}),"\n",(0,l.jsx)(n.li,{children:"Creates compressed plots, up to C9 (75.2 GiB)"}),"\n",(0,l.jsx)(n.li,{children:"Creates plots entirely in memory, so no temp disk is needed"}),"\n",(0,l.jsx)(n.li,{children:"Typically not as fast as BladeBit CUDA"}),"\n",(0,l.jsx)(n.li,{children:"Open-source, freely available, no dev fee"}),"\n",(0,l.jsxs)(n.li,{children:["Can also be installed as a ",(0,l.jsx)(n.a,{href:"#bladebit-standalone",children:"standalone build"})]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{href:"/plotters-cli#ramplot",children:"CLI documentation"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"Example command"})}),"\n",(0,l.jsx)(n.p,{children:"The following command will create a single plot with a compression level of 7. It will use the specified keys and contract address in case the farmer is located on a different machine. It will use the defaults for the remaining parameters:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"chia plotters bladebit ramplot -d <destination dir> -f <farmer key> -p <pool key> -c <contract address> -n 1 --compress 7\n"})}),"\n",(0,l.jsx)(n.h3,{id:"bladebit-disk",children:"Bladebit Disk"}),"\n",(0,l.jsx)(n.h4,{id:"a-disk-based-hdd-or-ssd-cpu-plotter-included-with-chia-20",children:"A disk-based (HDD or SSD) CPU plotter, included with Chia 2.0"}),"\n",(0,l.jsx)(n.p,{children:"Plot capabilities"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Type: Uncompressed only in Chia 2.0, Compressed beginning in 2.1"}),"\n",(0,l.jsx)(n.li,{children:"Size: k32 only"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Requirements"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"OS: Windows, Mac, or Linux OS (64-bit is required); Intel and ARM (Apple Silicon) are both supported."}),"\n",(0,l.jsx)(n.li,{children:"Memory: Minimum 2 GB of available RAM, with lower bucket counts requiring up to 12 GB"}),"\n",(0,l.jsxs)(n.li,{children:["Temporary Disk: 480 GB in default mode, or 390 GB with ",(0,l.jsx)(n.code,{children:"--alternate"})," mode enabled; can be HDD or SSD:","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"SSD: fast (NVMe is supported) but consumer-grade SSDs wear out over time, enterprise-grade is recommended"}),"\n",(0,l.jsx)(n.li,{children:"HDD: slow, but won't wear out; can plot directly to the final disk"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"GPU: Not used"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"More info"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Designed to be used in embedded or entry-level systems"}),"\n",(0,l.jsx)(n.li,{children:"Can only create uncompressed plots (C0, 101.4 GiB) in Chia version 2.0"}),"\n",(0,l.jsx)(n.li,{children:"The use of temporary HDD or SSD storage makes it accessible to the majority of farmers"}),"\n",(0,l.jsx)(n.li,{children:"Sequential writes can better take advantage of SSD burst performance and reduce SSD wear by reducing write amplification factor"}),"\n",(0,l.jsx)(n.li,{children:"Can use DRAM write cache to significantly reduce SSD writes and can take advantage of any extra increments (no minimum required)"}),"\n",(0,l.jsx)(n.li,{children:"Takes full advantage of increased disk bandwidth from PCIe 4.0"}),"\n",(0,l.jsx)(n.li,{children:"Pipelined performance to max out CPU"}),"\n",(0,l.jsxs)(n.li,{children:["Can also be installed as a ",(0,l.jsx)(n.a,{href:"#bladebit-standalone",children:"standalone build"})]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{href:"/plotters-cli#diskplot",children:"CLI documentation"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"Example command"})}),"\n",(0,l.jsx)(n.p,{children:"The following command will create a single uncompressed plot (plot compression is disabled in Chia version 2.0.0). It will use the specified keys and contract address in case the farmer is located on a different machine. It will allocate 32 GB of DRAM cache, and it will use the specified temporary drive (typically an SSD) and destination drive. It will use the defaults for the remaining parameters:"}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"chia plotters bladebit diskplot -t <temp dir> -d <destination dir> -f <farmer key> -p <pool key> -c <contract address> --cache 32G -n 1 --compress 0\n"})}),"\n",(0,l.jsx)(n.h3,{id:"gigahorse",children:"Gigahorse"}),"\n",(0,l.jsxs)(n.h4,{id:"a-third-party-gpu-plotter-available-as-a-standalone-download",children:["A third-party GPU plotter, available as a ",(0,l.jsx)(n.a,{href:"https://github.com/madMAx43v3r/chia-gigahorse",children:"standalone download"})]}),"\n",(0,l.jsx)(n.p,{children:"Plot capabilities"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Type: Compressed or uncompressed"}),"\n",(0,l.jsx)(n.li,{children:"Size: k30-34"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"More info"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Designed to work with CUDA-class GPUs"}),"\n",(0,l.jsx)(n.li,{children:"Creates compressed plots"}),"\n",(0,l.jsx)(n.li,{children:"Closed source, has dev fee depending on compression and whether CPU or GPU is used for farming"}),"\n"]}),"\n",(0,l.jsx)(n.h3,{id:"madmax",children:"madMAx"}),"\n",(0,l.jsx)(n.h4,{id:"a-third-party-cpu-plotter-included-with-chia-20",children:"A third-party CPU plotter, included with Chia 2.0"}),"\n",(0,l.jsx)(n.p,{children:"Plot capabilities"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Type: Uncompressed only"}),"\n",(0,l.jsx)(n.li,{children:"Size: Any"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Requirements"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"OS: Windows, Mac, or Linux OS (64-bit is required); Intel and ARM (Apple Silicon) are both supported."}),"\n",(0,l.jsx)(n.li,{children:"Memory: Depends on setup, minimum 0.5 GB if single-threaded"}),"\n",(0,l.jsxs)(n.li,{children:["Temporary Disk: SSD and HDD are supported","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"SSD: fast (NVMe is supported) but consumer-grade SSDs wear out over time, enterprise-grade is recommended"}),"\n",(0,l.jsx)(n.li,{children:"HDD: slow, but won't wear out; can plot directly to the final disk"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"GPU: Not used"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"More info"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Designed to be used in embedded or entry-level systems"}),"\n",(0,l.jsx)(n.li,{children:"Can only create uncompressed plots (C0, 101.4 GiB)"}),"\n",(0,l.jsx)(n.li,{children:"The use of temporary HDD or SSD storage makes it accessible to the majority of farmers"}),"\n",(0,l.jsx)(n.li,{children:"Pipelined performance to max out CPU"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{href:"/plotters-cli#madmax",children:"CLI documentation"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"Example command"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"chia plotters madmax -t <temp dir> -d <destination dir> -f <farmer key> -p <pool key> -c <contract address> -k <size> -n <number of plots>\n"})}),"\n",(0,l.jsx)(n.h3,{id:"chiapos",children:"ChiaPoS"}),"\n",(0,l.jsx)(n.h4,{id:"the-original-chia-cpu-based-plotter",children:"The original Chia CPU-based plotter"}),"\n",(0,l.jsx)(n.p,{children:"Plot capabilities"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Type: Uncompressed only"}),"\n",(0,l.jsx)(n.li,{children:"Size: Any"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"Requirements"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"OS: Windows, Mac, or Linux OS (64-bit is required); Intel and ARM (Apple Silicon) are both supported."}),"\n",(0,l.jsx)(n.li,{children:"Memory: 2 GB min"}),"\n",(0,l.jsxs)(n.li,{children:["Temporary Disk: SSD and HDD are supported","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"SSD: fast (NVMe is supported) but consumer-grade SSDs wear out over time, enterprise-grade is recommended"}),"\n",(0,l.jsx)(n.li,{children:"HDD: slow, but won't wear out; can plot directly to the final disk"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.li,{children:"GPU: Not used"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"More info"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"Originally released pre mainnet, mostly supplanted by newer plotters"}),"\n",(0,l.jsx)(n.li,{children:"Slow, single-threaded plotting; parallel plotting and staggering are recommended"}),"\n",(0,l.jsx)(n.li,{children:"Designed to be used in embedded or entry-level systems"}),"\n",(0,l.jsx)(n.li,{children:"Can only create uncompressed plots (C0, 101.4 GiB)"}),"\n",(0,l.jsx)(n.li,{children:"The use of temporary HDD or SSD storage makes it accessible to the majority of farmers"}),"\n",(0,l.jsx)(n.li,{children:"Not optimized for performance"}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.a,{href:"/plotters-cli#chiapos",children:"CLI documentation"})}),"\n",(0,l.jsx)(n.p,{children:(0,l.jsx)(n.strong,{children:"Example command"})}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{className:"language-bash",children:"chia plotters chiapos -t <temp dir> -d <destination dir> -f <farmer key> -p <pool key> -c <contract address> -k <size> -n <number of plots>\n"})}),"\n",(0,l.jsx)(n.h3,{id:"bladebit-standalone",children:"BladeBit (standalone)"}),"\n",(0,l.jsx)(n.p,{children:"While BladeBit does come installed with Chia version 2.0, there are a few reasons you might want to run the standalone version instead:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["You want to run the ",(0,l.jsx)(n.code,{children:"simulate"})," command, to determine your farm's maximum size"]}),"\n",(0,l.jsx)(n.li,{children:"You want to test features that have not yet been released in the embedded version"}),"\n"]}),"\n",(0,l.jsxs)(n.p,{children:[(0,l.jsx)(n.strong,{children:"Complete instructions"})," for downloading and installing BladeBit are available on the ",(0,l.jsx)(n.a,{href:"https://github.com/Chia-Network/bladebit/",children:"BladeBit GitHub page"}),"."]}),"\n",(0,l.jsx)(n.p,{children:"Abbreviated installation instructions:"}),"\n",(0,l.jsxs)(n.ol,{children:["\n",(0,l.jsxs)(n.li,{children:["Install ",(0,l.jsx)(n.a,{href:"https://cmake.org",children:"cmake"})]}),"\n",(0,l.jsx)(n.li,{children:"Clone BladeBit:"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"git clone https://github.com/Chia-Network/bladebit.git && cd bladebit\n"})}),"\n",(0,l.jsxs)(n.ol,{start:"3",children:["\n",(0,l.jsx)(n.li,{children:"Create and enter a build directory:"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"mkdir -p build && cd build\n"})}),"\n",(0,l.jsxs)(n.ol,{start:"4",children:["\n",(0,l.jsx)(n.li,{children:"Generate config files:"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"cmake ..\n"})}),"\n",(0,l.jsxs)(n.ol,{start:"5",children:["\n",(0,l.jsx)(n.li,{children:"Build BladeBit:"}),"\n"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"cmake --build . --target bladebit --config Release\n"})}),"\n",(0,l.jsxs)(n.p,{children:["After the installation has completed, the ",(0,l.jsx)(n.code,{children:"bladebit"})," command will be available from the ",(0,l.jsx)(n.code,{children:"Release"})," directory. For example, to obtain a list of options, run:"]}),"\n",(0,l.jsx)(n.pre,{children:(0,l.jsx)(n.code,{children:"./Release/bladebit -h\n"})}),"\n",(0,l.jsx)(n.h2,{id:"choosing-a-plotter",children:"Choosing a plotter"}),"\n",(0,l.jsx)(n.p,{children:"With so many plotters available, the decision of which one to choose may seem daunting. However, your hardware setup will often make the choice for you. If you have:"}),"\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsxs)(n.li,{children:["At least 256 GB of RAM ",(0,l.jsx)(n.strong,{children:"and"})," a CUDA-class GPU with at least 8 GB of VRAM","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"You will likely want BladeBit CUDA"}),"\n",(0,l.jsx)(n.li,{children:"Gigahorse will also work"}),"\n",(0,l.jsx)(n.li,{children:"Other plotters will under-perform"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["At least 16 GB of RAM (experimental) or at least 128 GB, but less than 256 GB ",(0,l.jsx)(n.strong,{children:"and"})," a CUDA-class GPU with at least 8 GB of VRAM, ",(0,l.jsx)(n.strong,{children:"and"})," a 256 GB or larger SSD (ideally enterprise NVMe)","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"You will likely want BladeBit CUDA"}),"\n",(0,l.jsx)(n.li,{children:"Gigahorse will also work"}),"\n",(0,l.jsx)(n.li,{children:"Other plotters will under-perform"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["416 GB of RAM but no GPU","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"BladeBit RAM is easily your best choice"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(n.li,{children:["Less than 16 GB of RAM and don't mind creating uncompressed plots","\n",(0,l.jsxs)(n.ul,{children:["\n",(0,l.jsx)(n.li,{children:"BladeBit Disk and madMAx are both good options"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(n.p,{children:"It is always possible, and indeed recommended, to create a plot with a few different plotters to understand how well your system will perform. Once you have a feel for using the different plotters, you can begin plotting in earnest."}),"\n",(0,l.jsx)(n.h2,{id:"cli-usage",children:"CLI usage"}),"\n",(0,l.jsxs)(n.p,{children:["There is a new ",(0,l.jsx)(n.code,{children:"chia"})," command for creating plots called ",(0,l.jsx)(n.code,{children:"plotters"}),". For compatibility, the original command for creating plots ",(0,l.jsx)(n.code,{children:"chia plots create"})," remains in place, however, this will always use the reference ChiaPoS plotter. In order to use the other plotters, you must use the new ",(0,l.jsx)(n.code,{children:"chia plotters"})," command. Command line options differ with each plotter, so be sure to check the available options using ",(0,l.jsx)(n.code,{children:"chia plotters <plotter> -h"})," or by reading the online ",(0,l.jsx)(n.a,{href:"/plotters-cli",children:"CLI documentation"}),'. Available plotter values include "chiapos", "bladebit", and "madmax".']}),"\n",(0,l.jsx)(n.p,{children:"The UI also has new functionality to support selecting a plotter."}),"\n",(0,l.jsx)(n.p,{children:"Note: Not all features are available for every plotter."})]})}function h(e={}){const{wrapper:n}={...(0,r.a)(),...e.components};return n?(0,l.jsx)(n,{...e,children:(0,l.jsx)(c,{...e})}):c(e)}},5162:(e,n,i)=>{i.d(n,{Z:()=>s});i(7294);var l=i(512);const r={tabItem:"tabItem_Ymn6"};var t=i(5893);function s(e){let{children:n,hidden:i,className:s}=e;return(0,t.jsx)("div",{role:"tabpanel",className:(0,l.Z)(r.tabItem,s),hidden:i,children:n})}},4866:(e,n,i)=>{i.d(n,{Z:()=>y});var l=i(7294),r=i(512),t=i(2466),s=i(6550),a=i(469),o=i(1980),d=i(7392),c=i(12);function h(e){return l.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,l.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:n,children:i}=e;return(0,l.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:i,attributes:l,default:r}}=e;return{value:n,label:i,attributes:l,default:r}}))}(i);return function(e){const n=(0,d.l)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,i])}function p(e){let{value:n,tabValues:i}=e;return i.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:i}=e;const r=(0,s.k6)(),t=function(e){let{queryString:n=!1,groupId:i}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!i)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return i??null}({queryString:n,groupId:i});return[(0,o._X)(t),(0,l.useCallback)((e=>{if(!t)return;const n=new URLSearchParams(r.location.search);n.set(t,e),r.replace({...r.location,search:n.toString()})}),[t,r])]}function x(e){const{defaultValue:n,queryString:i=!1,groupId:r}=e,t=u(e),[s,o]=(0,l.useState)((()=>function(e){let{defaultValue:n,tabValues:i}=e;if(0===i.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:i}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${i.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const l=i.find((e=>e.default))??i[0];if(!l)throw new Error("Unexpected error: 0 tabValues");return l.value}({defaultValue:n,tabValues:t}))),[d,h]=m({queryString:i,groupId:r}),[x,j]=function(e){let{groupId:n}=e;const i=function(e){return e?`docusaurus.tab.${e}`:null}(n),[r,t]=(0,c.Nk)(i);return[r,(0,l.useCallback)((e=>{i&&t.set(e)}),[i,t])]}({groupId:r}),f=(()=>{const e=d??x;return p({value:e,tabValues:t})?e:null})();(0,a.Z)((()=>{f&&o(f)}),[f]);return{selectedValue:s,selectValue:(0,l.useCallback)((e=>{if(!p({value:e,tabValues:t}))throw new Error(`Can't select invalid tab value=${e}`);o(e),h(e),j(e)}),[h,j,t]),tabValues:t}}var j=i(2389);const f={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var b=i(5893);function g(e){let{className:n,block:i,selectedValue:l,selectValue:s,tabValues:a}=e;const o=[],{blockElementScrollPositionUntilNextRender:d}=(0,t.o5)(),c=e=>{const n=e.currentTarget,i=o.indexOf(n),r=a[i].value;r!==l&&(d(n),s(r))},h=e=>{let n=null;switch(e.key){case"Enter":c(e);break;case"ArrowRight":{const i=o.indexOf(e.currentTarget)+1;n=o[i]??o[0];break}case"ArrowLeft":{const i=o.indexOf(e.currentTarget)-1;n=o[i]??o[o.length-1];break}}n?.focus()};return(0,b.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,r.Z)("tabs",{"tabs--block":i},n),children:a.map((e=>{let{value:n,label:i,attributes:t}=e;return(0,b.jsx)("li",{role:"tab",tabIndex:l===n?0:-1,"aria-selected":l===n,ref:e=>o.push(e),onKeyDown:h,onClick:c,...t,className:(0,r.Z)("tabs__item",f.tabItem,t?.className,{"tabs__item--active":l===n}),children:i??n},n)}))})}function w(e){let{lazy:n,children:i,selectedValue:r}=e;const t=(Array.isArray(i)?i:[i]).filter(Boolean);if(n){const e=t.find((e=>e.props.value===r));return e?(0,l.cloneElement)(e,{className:"margin-top--md"}):null}return(0,b.jsx)("div",{className:"margin-top--md",children:t.map(((e,n)=>(0,l.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function v(e){const n=x(e);return(0,b.jsxs)("div",{className:(0,r.Z)("tabs-container",f.tabList),children:[(0,b.jsx)(g,{...e,...n}),(0,b.jsx)(w,{...e,...n})]})}function y(e){const n=(0,j.Z)();return(0,b.jsx)(v,{...e,children:h(e.children)},String(n))}},1151:(e,n,i)=>{i.d(n,{Z:()=>a,a:()=>s});var l=i(7294);const r={},t=l.createContext(r);function s(e){const n=l.useContext(t);return l.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),l.createElement(t.Provider,{value:n},e.children)}}}]);