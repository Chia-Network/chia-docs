"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[1171],{656:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>d,contentTitle:()=>c,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>h});const s=JSON.parse('{"id":"guides/crash-course/intro-to-chialisp","title":"Chialisp","description":"For this section of the course, you will learn how to set up your development environment, write Chialisp code, and execute it on the command-line.","source":"@site/i18n/zh-Hans/docusaurus-plugin-content-docs/current/guides/crash-course/intro-to-chialisp.md","sourceDirName":"guides/crash-course","slug":"/guides/crash-course/intro-to-chialisp","permalink":"/zh-Hans/guides/crash-course/intro-to-chialisp","draft":false,"unlisted":false,"editUrl":"https://github.com/Chia-Network/chia-docs/blob/main/docs/guides/crash-course/intro-to-chialisp.md","tags":[],"version":"current","frontMatter":{"slug":"/guides/crash-course/intro-to-chialisp","title":"Chialisp"},"sidebar":"guides","previous":{"title":"Introduction","permalink":"/zh-Hans/guides/crash-course/introduction"},"next":{"title":"Smart Coins","permalink":"/zh-Hans/guides/crash-course/smart-coins"}}');var t=i(4848),r=i(8453),l=i(5537),a=i(9329);const o={slug:"/guides/crash-course/intro-to-chialisp",title:"Chialisp"},c=void 0,d={},h=[{value:"Dev Tools",id:"dev-tools",level:2},{value:"Chia Dev Tools",id:"chia-dev-tools",level:3},{value:"Run",id:"run",level:3},{value:"Brun",id:"brun",level:3},{value:"Writing a Chialisp Puzzle",id:"writing-puzzle",level:2},{value:"Comparisons and If",id:"comparisons-and-if",level:2},{value:"Text Editor",id:"text-editor",level:2},{value:"Chialisp Files",id:"chialisp-files",level:2},{value:"Conventions",id:"conventions",level:3},{value:"Putting it Together",id:"putting-it-together",level:2},{value:"Defining Functions",id:"defining-functions",level:2},{value:"More Complicated Function",id:"more-complicated-function",level:2},{value:"Invoking our Code",id:"invoking-our-code",level:3}];function u(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",hr:"hr",p:"p",pre:"pre",strong:"strong",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.p,{children:"For this section of the course, you will learn how to set up your development environment, write Chialisp code, and execute it on the command-line."}),"\n",(0,t.jsxs)(n.admonition,{type:"note",children:[(0,t.jsx)(n.p,{children:"If you are using PowerShell, make sure to install the PowerShell 7.3 preview version:"}),(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"winget install --id Microsoft.Powershell.Preview --source winget\n"})}),(0,t.jsx)(n.p,{children:"This version fixes nested quoting, which is required for many of the commands on this page."})]}),"\n",(0,t.jsx)(n.h2,{id:"dev-tools",children:"Dev Tools"}),"\n",(0,t.jsxs)(n.p,{children:["To get started with Chialisp, you will first want to ",(0,t.jsx)(n.a,{href:"https://github.com/Chia-Network/chia-dev-tools",children:"install Chia Dev Tools"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"Here is a summary of the instructions:"}),"\n",(0,t.jsxs)(l.A,{groupId:"OS",defaultValue:"windows",values:[{label:"Windows",value:"windows"},{label:"Linux/MacOS",value:"linux-macos"}],children:[(0,t.jsx)(a.A,{value:"windows",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"mkdir learning\ncd learning\npy -m venv venv\n./venv/Scripts/activate\npip install chia-dev-tools\ncdv --version\n"})})}),(0,t.jsx)(a.A,{value:"linux-macos",children:(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"mkdir learning\ncd learning\npython3 -m venv venv\n. ./venv/bin/activate\npip install chia-dev-tools\ncdv --version\n"})})})]}),"\n",(0,t.jsxs)(n.p,{children:["This will install the Chia Dev Tools within your activated virtual environment. You'll want to make sure this virtual environment is activated before working on Chialisp. You'll see a ",(0,t.jsx)(n.code,{children:"(venv)"})," on the left of your terminal prompt."]}),"\n",(0,t.jsx)(n.admonition,{type:"info",children:(0,t.jsx)(n.p,{children:"Virtual environments allow you to install specific Python packages that will only be usable with the environment that is currently active. This allows you to switch between different environments for different projects, or if you just want to use different software versions."})}),"\n",(0,t.jsx)(n.h3,{id:"chia-dev-tools",children:"Chia Dev Tools"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"cdv"})," command provides a set of useful commands for building and running Chialisp programs, as well as some utilities for deploying smart coins on the Chia blockchain, which we will cover later on."]}),"\n",(0,t.jsx)(n.p,{children:"Run the following to see what commands it provides:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cdv\n"})}),"\n",(0,t.jsx)(n.p,{children:"For example, a Chialisp file can be built like so:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"cdv clsp build something.clsp\n"})}),"\n",(0,t.jsx)(n.h3,{id:"run",children:"Run"}),"\n",(0,t.jsxs)(n.p,{children:["You also have access to the ",(0,t.jsx)(n.code,{children:"run"})," command that can be used to compile Chialisp code directly."]}),"\n",(0,t.jsxs)(n.admonition,{type:"note",children:[(0,t.jsx)(n.p,{children:"If Chialisp code doesn't depend on any external parameters, the compiler will simplify it to the smallest form it can, which often means that this command will return the final output of the program."}),(0,t.jsxs)(n.p,{children:["If this is the case, you can skip the ",(0,t.jsx)(n.code,{children:"brun"})," command."]})]}),"\n",(0,t.jsx)(n.p,{children:"Run the following command:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"run '(+ 2 3)'\n"})}),"\n",(0,t.jsx)(n.p,{children:"Which should return the following result:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"5\n"})}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsxs)(n.admonition,{type:"info",children:[(0,t.jsxs)(n.p,{children:["The syntax ",(0,t.jsx)(n.code,{children:"(+ 2 3)"})," may look confusing. In Chialisp, we place the operator first, followed by the operands. This is known as ",(0,t.jsx)(n.strong,{children:"prefix notation"}),". Think of this as the equivalent to ",(0,t.jsx)(n.code,{children:"2 + 3"})," in math and most other programming languages."]}),(0,t.jsxs)(n.p,{children:["It is set up this way because every program in Chialisp is written as a list, where the first item is the operator. ",(0,t.jsx)(n.code,{children:"(+ 2 3)"})," is a list of three elements with the first being the ",(0,t.jsx)(n.code,{children:"+"})," operator, and thus it's a valid Chialisp program."]})]}),"\n",(0,t.jsx)(n.h3,{id:"brun",children:"Brun"}),"\n",(0,t.jsxs)(n.p,{children:["The ",(0,t.jsx)(n.code,{children:"brun"})," command is different from the ",(0,t.jsx)(n.code,{children:"run"})," command in that it doesn't compile code. Instead, it takes the result of the ",(0,t.jsx)(n.code,{children:"run"})," command and executes it on the Chialisp Virtual Machine (CLVM) directly."]}),"\n",(0,t.jsxs)(n.p,{children:["If you need to pass external parameters into the program, you will need to first compile it with ",(0,t.jsx)(n.code,{children:"run"}),", then use the ",(0,t.jsx)(n.code,{children:"brun"})," command with the parameters."]}),"\n",(0,t.jsxs)(n.p,{children:["For example, let's say that the ",(0,t.jsx)(n.code,{children:"run"})," command produced the following CLVM bytecode output:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"2\n"})}),"\n",(0,t.jsx)(n.p,{children:"You could run it like so:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"brun '2' '(42)'\n"})}),"\n",(0,t.jsx)(n.p,{children:"Which should produce the following output:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"42\n"})}),"\n",(0,t.jsxs)(n.p,{children:["So Chialisp can calculate the ",(0,t.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/42_(number)#The_Hitchhiker's_Guide_to_the_Galaxy",children:"meaning of life"}),"!"]}),"\n",(0,t.jsx)(n.hr,{}),"\n",(0,t.jsx)(n.h2,{id:"writing-puzzle",children:"Writing a Chialisp Puzzle"}),"\n",(0,t.jsxs)(n.p,{children:["Let's start off with some terminology. Firstly, coins on the Chia blockchain use Chialisp programs named ",(0,t.jsx)(n.strong,{children:"puzzles"})," to secure the value stored within. The parameters to a puzzle are called its ",(0,t.jsx)(n.strong,{children:"solution"}),"."]}),"\n",(0,t.jsxs)(n.p,{children:["To create puzzles that require a solution, we will use the ",(0,t.jsx)(n.code,{children:"mod"})," operator. It allows us to take arguments passed in to customize the functionality and result of the puzzle."]}),"\n",(0,t.jsx)(n.p,{children:"A very basic example would be:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"run '(mod (arg1 arg2) (+ arg1 arg2))'\n"})}),"\n",(0,t.jsx)(n.p,{children:"Which should return the following result:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"(+ 2 5)\n"})}),"\n",(0,t.jsxs)(n.admonition,{type:"info",children:[(0,t.jsxs)(n.p,{children:["What in the world is ",(0,t.jsx)(n.code,{children:"(+ 2 5)"})," that ",(0,t.jsx)(n.code,{children:"run"})," returned? This is an example of Chialisp bytecode that is later executed by the Chialisp Virtual Machine (CLVM). It is not very human-readable, but don't worry about that, as you are not required to understand CLVM bytecode in order to use it."]}),(0,t.jsxs)(n.p,{children:["Our first command, ",(0,t.jsx)(n.code,{children:"run"}),", will take Chialisp code and compile it to bytecode. Next, ",(0,t.jsx)(n.code,{children:"brun"})," will take that bytecode and execute it."]})]}),"\n",(0,t.jsxs)(n.p,{children:["We will then run this puzzle with the ",(0,t.jsx)(n.code,{children:"brun"})," command, followed by a solution of your choice:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"brun '(+ 2 5)' '(10 5)'\n"})}),"\n",(0,t.jsx)(n.p,{children:"Which should return the following result:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"15\n"})}),"\n",(0,t.jsx)(n.admonition,{title:"reminder",type:"info",children:(0,t.jsxs)(n.p,{children:["We are now using ",(0,t.jsx)(n.code,{children:"mod"})," to demand a solution for our puzzle. Whenever this is the case, you will be required to use the ",(0,t.jsx)(n.code,{children:"brun"})," command after ",(0,t.jsx)(n.code,{children:"run"}),"."]})}),"\n",(0,t.jsxs)(n.p,{children:["Pay close attention to the location of quotes and parenthesis. It's easy to get lost! With ",(0,t.jsx)(n.code,{children:"brun"}),", the solution is passed in as a distinct value surrounded by quotes. ",(0,t.jsx)(n.code,{children:"(10, 5)"})," is the solution in this example and translates to ",(0,t.jsx)(n.code,{children:"arg1 = 10"})," and ",(0,t.jsx)(n.code,{children:"arg2 = 5"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"You can run it again with a different solution:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"brun '(+ 2 5)' '(20 7)'\n"})}),"\n",(0,t.jsx)(n.p,{children:"Which should return the following result:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"27\n"})}),"\n",(0,t.jsx)(n.p,{children:"At this point you have a working Chialisp puzzle that will take inputs and give back an output. Congrats on making it this far!"}),"\n",(0,t.jsx)(n.h2,{id:"comparisons-and-if",children:"Comparisons and If"}),"\n",(0,t.jsxs)(n.p,{children:["Going with a contrived example, let's say we wanted to add two numbers and return ",(0,t.jsx)(n.code,{children:"large"})," if they were ",(0,t.jsx)(n.code,{children:"> 100"}),", or ",(0,t.jsx)(n.code,{children:"small"})," if they were ",(0,t.jsx)(n.code,{children:"<= 100"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"You can compare two values like so:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"(> apples oranges)\n"})}),"\n",(0,t.jsxs)(n.p,{children:["If ",(0,t.jsx)(n.code,{children:"apples"})," is larger than ",(0,t.jsx)(n.code,{children:"oranges"}),", this returns ",(0,t.jsx)(n.code,{children:"1"}),". Otherwise, the output is ",(0,t.jsx)(n.code,{children:"()"}),", which is equivalent to ",(0,t.jsx)(n.code,{children:"0"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"You can then use an if statement to return one of two different things depending on the result."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"(if <comparison> <result if true> <result if false>)\n"})}),"\n",(0,t.jsxs)(n.p,{children:["A concrete example of an ",(0,t.jsx)(n.code,{children:"if"})," would be:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'run \'(if 1 "true" "false")\'\n'})}),"\n",(0,t.jsx)(n.p,{children:"Which should return the following result:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:'"true"\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Now, we will add ",(0,t.jsx)(n.code,{children:"arg1"})," and ",(0,t.jsx)(n.code,{children:"arg2"})," with the code ",(0,t.jsx)(n.code,{children:"(+ arg1 arg2)"})," and compare it to the literal value ",(0,t.jsx)(n.code,{children:"100"}),". This comparison will determine whether the ",(0,t.jsx)(n.code,{children:"if"})," is ",(0,t.jsx)(n.code,{children:"true"})," or ",(0,t.jsx)(n.code,{children:"false"}),". We end up with:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'run \'(mod (arg1 arg2) (if (> (+ arg1 arg2) 100) "large" "small"))\'\n'})}),"\n",(0,t.jsx)(n.p,{children:"Which should return the following result:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:'(a (i (> (+ 2 5) (q . 100)) (q 1 . "large") (q 1 . "small")) 1)\n'})}),"\n",(0,t.jsxs)(n.p,{children:["Next, let's put this bytecode through ",(0,t.jsx)(n.code,{children:"brun"}),", giving it a solution:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"brun '(a (i (> (+ 2 5) (q . 100)) (q 1 . \"large\") (q 1 . \"small\")) 1)' '(10 90)'\n"})}),"\n",(0,t.jsx)(n.p,{children:"Which should return the following result:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"small\n"})}),"\n",(0,t.jsx)(n.p,{children:"Now, again with a different solution:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"brun '(a (i (> (+ 2 5) (q . 100)) (q 1 . \"large\") (q 1 . \"small\")) 1)' '(10 91)'\n"})}),"\n",(0,t.jsx)(n.p,{children:"Which should return the following result:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"large\n"})}),"\n",(0,t.jsxs)(n.p,{children:["The difference here being the new solution of ",(0,t.jsx)(n.code,{children:"(10 91)"}),". When added together, ",(0,t.jsx)(n.code,{children:"10"})," and ",(0,t.jsx)(n.code,{children:"91"})," are greater than ",(0,t.jsx)(n.code,{children:"100"}),"."]}),"\n",(0,t.jsx)(n.h2,{id:"text-editor",children:"Text Editor"}),"\n",(0,t.jsx)(n.p,{children:"Up to this point, we've been using the command line to write and run Chialisp programs. While this is efficient for quickly prototyping and testing small programs, it doesn't scale very well."}),"\n",(0,t.jsxs)(n.p,{children:["When writing larger programs in Chialisp, it'll be much easier to use a text editor of your choice and save them to a file. Both ",(0,t.jsx)(n.a,{href:"https://atom.io",children:"Atom"})," and ",(0,t.jsx)(n.a,{href:"https://code.visualstudio.com",children:"Visual Studio Code"})," have extensions to improve the quality of life of writing Chialisp code. However, any LISP-based syntax highlighting will help as well."]}),"\n",(0,t.jsxs)(n.admonition,{type:"info",children:[(0,t.jsxs)(n.p,{children:["If you decide to use ",(0,t.jsx)(n.a,{href:"https://code.visualstudio.com",children:"Visual Studio Code"}),", we have begun development on a ",(0,t.jsx)(n.a,{href:"https://marketplace.visualstudio.com/items?itemName=ChiaNetwork.chialisp",children:"Chialisp language server extension"}),"."]}),(0,t.jsx)(n.p,{children:"You may need to click the dropdown in the editor to install the prerelease version."})]}),"\n",(0,t.jsx)(n.h2,{id:"chialisp-files",children:"Chialisp Files"}),"\n",(0,t.jsx)(n.p,{children:"We will be storing Chialisp code in files, then building and running the files on the command line using Chia Dev Tools. There are a few commands that we can use more effectively after setting up a project in this way."}),"\n",(0,t.jsx)(n.h3,{id:"conventions",children:"Conventions"}),"\n",(0,t.jsx)(n.p,{children:"The following file extensions are used for Chialisp:"}),"\n",(0,t.jsxs)(n.table,{children:[(0,t.jsx)(n.thead,{children:(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.th,{children:"Extension"}),(0,t.jsx)(n.th,{children:"Description"})]})}),(0,t.jsxs)(n.tbody,{children:[(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:".clsp"})}),(0,t.jsx)(n.td,{children:"Chialisp source code"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:".clvm"})}),(0,t.jsx)(n.td,{children:"Deserialized CLVM bytecode"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:".clvm.hex"})}),(0,t.jsx)(n.td,{children:"Serialized CLVM bytecode"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:".clsp.hex"})}),(0,t.jsx)(n.td,{children:"Generated CLVM bytecode"})]}),(0,t.jsxs)(n.tr,{children:[(0,t.jsx)(n.td,{children:(0,t.jsx)(n.code,{children:".sym"})}),(0,t.jsx)(n.td,{children:"Generated Chialisp symbol table"})]})]})]}),"\n",(0,t.jsxs)(n.p,{children:["You will be writing code in ",(0,t.jsx)(n.code,{children:".clsp"})," files."]}),"\n",(0,t.jsx)(n.h2,{id:"putting-it-together",children:"Putting it Together"}),"\n",(0,t.jsx)(n.p,{children:"Using a text editor and files allows us to format our code nicely."}),"\n",(0,t.jsxs)(n.p,{children:["Put the following in a file named ",(0,t.jsx)(n.code,{children:"first.clsp"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",metastring:'title="first.clsp"',children:"(mod (arg1 arg2)\n    (if (> (+ arg1 arg2) 100) 'large' 'small')\n)\n"})}),"\n",(0,t.jsx)(n.p,{children:"Now, we can execute the file by name:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"run first.clsp\n"})}),"\n",(0,t.jsx)(n.p,{children:"This output will be exactly the same as before, but our code is a bit easier to manage."}),"\n",(0,t.jsx)(n.p,{children:"We will still execute the output like so:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:"brun '(a (i (> (+ 2 5) (q . 100)) (q 1 . \"large\") (q 1 . \"small\")) 1)' '(50 51)'\n"})}),"\n",(0,t.jsxs)(n.p,{children:["And, using nesting, ",(0,t.jsx)(n.code,{children:"$()"})," will execute anything within ",(0,t.jsx)(n.code,{children:"()"})," first. We can simplify further with:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-bash",children:'brun "$(run first.clsp)" "(50 51)"\n'})}),"\n",(0,t.jsx)(n.h2,{id:"defining-functions",children:"Defining Functions"}),"\n",(0,t.jsx)(n.p,{children:"A function will give a name to some lines of code, often taking an input and returning a result. Let's create a new file to practice functions inside of Chialisp."}),"\n",(0,t.jsxs)(n.p,{children:["Create a file named ",(0,t.jsx)(n.code,{children:"sum.clsp"}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",metastring:'title="sum.clsp"',children:"(mod (arg1 arg2)\n    (defun sum (s1 s2)\n        (+ s1 s2)\n    )\n\n    (sum arg1 arg2)\n)\n"})}),"\n",(0,t.jsxs)(n.p,{children:["This example is silly because we are just adding two numbers, but it shows that we can define a function with parameters. Now, while our solution parameters are still ",(0,t.jsx)(n.code,{children:"arg1"})," and ",(0,t.jsx)(n.code,{children:"arg2"}),", we've introduced ",(0,t.jsx)(n.code,{children:"s1"})," and ",(0,t.jsx)(n.code,{children:"s2"}),". We define the function following this structure:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"(defun function_name (parameters)\n    function body)\n)\n"})}),"\n",(0,t.jsx)(n.p,{children:"We can then refer to this function by name later on in our code body:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"(function_name arguments)\n"})}),"\n",(0,t.jsx)(n.h2,{id:"more-complicated-function",children:"More Complicated Function"}),"\n",(0,t.jsx)(n.p,{children:"Now that we have a basic function, we can build on this to create a sum function to add all values from a list."}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"(mod (items)\n  (defun sum (items)\n    (if items\n      (+ (f items) (sum (r items)))\n      0\n    )\n  )\n\n  (sum items)\n)\n"})}),"\n",(0,t.jsxs)(n.p,{children:["Chialisp will use a lot of recursion. In this example, we will use ",(0,t.jsx)(n.code,{children:"(f items)"})," to refer to the first element in the list, and ",(0,t.jsx)(n.code,{children:"(r items)"})," to refer to the rest of the items in the list. By saying ",(0,t.jsx)(n.code,{children:"+ (f items) (sum (r items)))"}),", we are adding the first element with a recursive call to the sum of the rest of the elements. This will repeat until items is empty, returning 0."]}),"\n",(0,t.jsxs)(n.p,{children:["Imagine passing in a list ",(0,t.jsx)(n.code,{children:"(10 5 3 7)"}),", we would have a call stack like this:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-chialisp",children:"(+ 10 (sum (list 5 3 7)))\n        \u21aa (+ 5 (sum (list 3 7)))\n                 \u21aa (+ 3 (sum (list 7)))\n                          \u21aa (+ 7 (sum (list)))\n                                   \u21aa 0\n"})}),"\n",(0,t.jsx)(n.p,{children:"We make our way through these calls until we return (0). We then work our way back up adding 0 with 7, 7 with 3, 10 with 5, and finally 15 with 10."}),"\n",(0,t.jsxs)(n.p,{children:["Because we need to stop the recursive calls when the list is empty, we check if the ",(0,t.jsx)(n.code,{children:"items"})," has a value. This can be done with ",(0,t.jsx)(n.code,{children:"if items"}),"."]}),"\n",(0,t.jsx)(n.h3,{id:"invoking-our-code",children:"Invoking our Code"}),"\n",(0,t.jsxs)(n.p,{children:["We now have just a single parameter called ",(0,t.jsx)(n.code,{children:"items"}),". This is expected to be a list, so we will pass a solution that is a list. We would normally pass a solution in ",(0,t.jsx)(n.code,{children:"()"})," and a list is surrounded with ",(0,t.jsx)(n.code,{children:"()"}),", so it may look like ",(0,t.jsx)(n.code,{children:'"((10 5 3 7))"'}),":"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:'\nbrun "$(run sum.clsp)" "((10 5 3 7))"\n\n'})}),"\n",(0,t.jsx)(n.p,{children:"Response:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{children:"25\n"})})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(u,{...e})}):u(e)}},9329:(e,n,i)=>{i.d(n,{A:()=>l});i(6540);var s=i(4164);const t={tabItem:"tabItem_Ymn6"};var r=i(4848);function l(e){let{children:n,hidden:i,className:l}=e;return(0,r.jsx)("div",{role:"tabpanel",className:(0,s.A)(t.tabItem,l),hidden:i,children:n})}},5537:(e,n,i)=>{i.d(n,{A:()=>y});var s=i(6540),t=i(4164),r=i(5627),l=i(6347),a=i(372),o=i(604),c=i(1861),d=i(8749);function h(e){return s.Children.toArray(e).filter((e=>"\n"!==e)).map((e=>{if(!e||(0,s.isValidElement)(e)&&function(e){const{props:n}=e;return!!n&&"object"==typeof n&&"value"in n}(e))return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)}))?.filter(Boolean)??[]}function u(e){const{values:n,children:i}=e;return(0,s.useMemo)((()=>{const e=n??function(e){return h(e).map((e=>{let{props:{value:n,label:i,attributes:s,default:t}}=e;return{value:n,label:i,attributes:s,default:t}}))}(i);return function(e){const n=(0,c.XI)(e,((e,n)=>e.value===n.value));if(n.length>0)throw new Error(`Docusaurus error: Duplicate values "${n.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`)}(e),e}),[n,i])}function p(e){let{value:n,tabValues:i}=e;return i.some((e=>e.value===n))}function m(e){let{queryString:n=!1,groupId:i}=e;const t=(0,l.W6)(),r=function(e){let{queryString:n=!1,groupId:i}=e;if("string"==typeof n)return n;if(!1===n)return null;if(!0===n&&!i)throw new Error('Docusaurus error: The <Tabs> component groupId prop is required if queryString=true, because this value is used as the search param name. You can also provide an explicit value such as queryString="my-search-param".');return i??null}({queryString:n,groupId:i});return[(0,o.aZ)(r),(0,s.useCallback)((e=>{if(!r)return;const n=new URLSearchParams(t.location.search);n.set(r,e),t.replace({...t.location,search:n.toString()})}),[r,t])]}function x(e){const{defaultValue:n,queryString:i=!1,groupId:t}=e,r=u(e),[l,o]=(0,s.useState)((()=>function(e){let{defaultValue:n,tabValues:i}=e;if(0===i.length)throw new Error("Docusaurus error: the <Tabs> component requires at least one <TabItem> children component");if(n){if(!p({value:n,tabValues:i}))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${n}" but none of its children has the corresponding value. Available values are: ${i.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);return n}const s=i.find((e=>e.default))??i[0];if(!s)throw new Error("Unexpected error: 0 tabValues");return s.value}({defaultValue:n,tabValues:r}))),[c,h]=m({queryString:i,groupId:t}),[x,j]=function(e){let{groupId:n}=e;const i=function(e){return e?`docusaurus.tab.${e}`:null}(n),[t,r]=(0,d.Dv)(i);return[t,(0,s.useCallback)((e=>{i&&r.set(e)}),[i,r])]}({groupId:t}),g=(()=>{const e=c??x;return p({value:e,tabValues:r})?e:null})();(0,a.A)((()=>{g&&o(g)}),[g]);return{selectedValue:l,selectValue:(0,s.useCallback)((e=>{if(!p({value:e,tabValues:r}))throw new Error(`Can't select invalid tab value=${e}`);o(e),h(e),j(e)}),[h,j,r]),tabValues:r}}var j=i(9136);const g={tabList:"tabList__CuJ",tabItem:"tabItem_LNqP"};var f=i(4848);function w(e){let{className:n,block:i,selectedValue:s,selectValue:l,tabValues:a}=e;const o=[],{blockElementScrollPositionUntilNextRender:c}=(0,r.a_)(),d=e=>{const n=e.currentTarget,i=o.indexOf(n),t=a[i].value;t!==s&&(c(n),l(t))},h=e=>{let n=null;switch(e.key){case"Enter":d(e);break;case"ArrowRight":{const i=o.indexOf(e.currentTarget)+1;n=o[i]??o[0];break}case"ArrowLeft":{const i=o.indexOf(e.currentTarget)-1;n=o[i]??o[o.length-1];break}}n?.focus()};return(0,f.jsx)("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,t.A)("tabs",{"tabs--block":i},n),children:a.map((e=>{let{value:n,label:i,attributes:r}=e;return(0,f.jsx)("li",{role:"tab",tabIndex:s===n?0:-1,"aria-selected":s===n,ref:e=>{o.push(e)},onKeyDown:h,onClick:d,...r,className:(0,t.A)("tabs__item",g.tabItem,r?.className,{"tabs__item--active":s===n}),children:i??n},n)}))})}function v(e){let{lazy:n,children:i,selectedValue:r}=e;const l=(Array.isArray(i)?i:[i]).filter(Boolean);if(n){const e=l.find((e=>e.props.value===r));return e?(0,s.cloneElement)(e,{className:(0,t.A)("margin-top--md",e.props.className)}):null}return(0,f.jsx)("div",{className:"margin-top--md",children:l.map(((e,n)=>(0,s.cloneElement)(e,{key:n,hidden:e.props.value!==r})))})}function b(e){const n=x(e);return(0,f.jsxs)("div",{className:(0,t.A)("tabs-container",g.tabList),children:[(0,f.jsx)(w,{...n,...e}),(0,f.jsx)(v,{...n,...e})]})}function y(e){const n=(0,j.A)();return(0,f.jsx)(b,{...e,children:h(e.children)},String(n))}},8453:(e,n,i)=>{i.d(n,{R:()=>l,x:()=>a});var s=i(6540);const t={},r=s.createContext(t);function l(e){const n=s.useContext(r);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:l(e.components),s.createElement(r.Provider,{value:n},e.children)}}}]);