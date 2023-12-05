"use strict";(self.webpackChunkchia_docs=self.webpackChunkchia_docs||[]).push([[610],{1617:(e,n,s)=>{s.r(n),s.d(n,{assets:()=>h,contentTitle:()=>a,default:()=>d,frontMatter:()=>t,metadata:()=>r,toc:()=>c});var i=s(5893),o=s(1151);const t={slug:"/guides/crash-course/smart-coins",title:"Smart Coins"},a=void 0,r={id:"guides/crash-course/smart-coins",title:"Smart Coins",description:"Everything on the Chia blockchain is a coin. They are often referred to as smart coins because every coin has a Chialisp program associated with it. That program, known as a puzzle, decides how and when the coin can be spent, and what happens when it is. NFTs, CATs, and standard transactions are all defined using puzzles. Another example of something you can do with Chialisp is lock up funds until a certain amount of time has elapsed.",source:"@site/docs/guides/crash-course/smart-coins.md",sourceDirName:"guides/crash-course",slug:"/guides/crash-course/smart-coins",permalink:"/zh/guides/crash-course/smart-coins",draft:!1,unlisted:!1,editUrl:"https://github.com/Chia-Network/chia-docs/blob/main/docs/guides/crash-course/smart-coins.md",tags:[],version:"current",frontMatter:{slug:"/guides/crash-course/smart-coins",title:"Smart Coins"},sidebar:"guides",previous:{title:"Chialisp",permalink:"/zh/guides/crash-course/intro-to-chialisp"},next:{title:"Signatures",permalink:"/zh/guides/crash-course/signatures"}},h={},c=[{value:"Basic Example",id:"basic-example",level:2},{value:"Currying Example",id:"currying-example",level:2},{value:"Hashing Example",id:"hashing-example",level:2},{value:"Hash the Password",id:"hash-the-password",level:3},{value:"Curry the Hash",id:"curry-the-hash",level:3},{value:"Final Puzzle",id:"final-puzzle",level:2},{value:"Curry the Hash",id:"curry-the-hash-1",level:3},{value:"Puzzle Hash",id:"puzzle-hash",level:3},{value:"Puzzle Reveal",id:"puzzle-reveal",level:3},{value:"Creating the Coin",id:"creating-the-coin",level:3},{value:"Spending the Coin",id:"spending-the-coin",level:3},{value:"Common Mistakes",id:"common-mistakes",level:2},{value:"Security Concerns",id:"security-concerns",level:2},{value:"Password is Revealed",id:"password-is-revealed",level:3},{value:"Spend Interception",id:"spend-interception",level:3}];function l(e){const n={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components},{Details:s}=n;return s||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(n.p,{children:["Everything on the Chia blockchain is a ",(0,i.jsx)(n.strong,{children:"coin"}),". They are often referred to as ",(0,i.jsx)(n.strong,{children:"smart coins"})," because every coin has a Chialisp program associated with it. That program, known as a ",(0,i.jsx)(n.strong,{children:"puzzle"}),", decides how and when the coin can be spent, and what happens when it is. NFTs, CATs, and standard transactions are all defined using puzzles. Another example of something you can do with Chialisp is lock up funds until a certain amount of time has elapsed."]}),"\n",(0,i.jsx)(n.p,{children:"Now that you have learned how to write basic Chialisp programs, you can apply that to more complex puzzles. There's a bit more involved in creating a puzzle and using it for a coin, but we'll get into that more later."}),"\n",(0,i.jsx)(n.p,{children:"In this lesson, we will be writing a puzzle that requires a simple password to unlock coins that use it."}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsx)(n.p,{children:"If you are using PowerShell, make sure to install the PowerShell 7.3 preview version:"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"winget install --id Microsoft.Powershell.Preview --source winget\n"})}),(0,i.jsx)(n.p,{children:"This version fixes nested quoting, which is required for many of the commands on this page."})]}),"\n",(0,i.jsx)(n.admonition,{type:"danger",children:(0,i.jsx)(n.p,{children:"While this is great for learning the fundamentals, it is an insecure way to protect funds on a blockchain. We will explore the reason and better methods later on."})}),"\n",(0,i.jsx)(n.h2,{id:"basic-example",children:"Basic Example"}),"\n",(0,i.jsxs)(n.p,{children:["Let's create a little program to have the user guess a password. We are going to build up to a more advanced password-protected coin, but let's start with the basics. We will hardcode the correct password to be ",(0,i.jsx)(n.code,{children:"hello"}),". If the user provides ",(0,i.jsx)(n.code,{children:"hello"})," as the solution, they got the correct password."]}),"\n",(0,i.jsxs)(n.p,{children:["Write the following in a file named ",(0,i.jsx)(n.code,{children:"password.clsp"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-chialisp",metastring:'title="password.clsp"',children:'(mod (password)\n    (if (= password "hello")\n        "Correct!"\n        "Incorrect :("\n    )\n)\n'})}),"\n",(0,i.jsx)(n.p,{children:"Run the following command to check the password against it:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'brun "$(run password.clsp)" "(hello)"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Which should produce the following output:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"Correct!\n"})}),"\n",(0,i.jsx)(n.p,{children:"However, if you provide a different solution, you'll get a different result:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'brun "$(run password.clsp)" "(goodbye)"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Which should produce the following output:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"Incorrect :(\n"})}),"\n",(0,i.jsxs)(n.p,{children:["This is cool, but we want to avoid hardcoded values when possible. This introduces our next concept called ",(0,i.jsx)(n.em,{children:"currying"}),". Currying allows us to write a generalized program that can be used for many different password options. This way, we're not stuck with just a single password of ",(0,i.jsx)(n.code,{children:"hello"}),". Let's see how this works in the next section."]}),"\n",(0,i.jsx)(n.h2,{id:"currying-example",children:"Currying Example"}),"\n",(0,i.jsxs)(n.p,{children:["Our goal is to allow more than just the hardcoded password of ",(0,i.jsx)(n.code,{children:"hello"}),". In addition to this, we want to hide the password to the best of our ability with hashing (which we will explore in more detail later)."]}),"\n",(0,i.jsxs)(n.p,{children:["Replace the contents of ",(0,i.jsx)(n.code,{children:"passwords.clsp"})," with the following:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-chialisp",metastring:'title="password.clsp"',children:'(mod (CORRECT_PASSWORD provided_password)\n    (if (= CORRECT_PASSWORD provided_password)\n        "Correct!"\n        "Incorrect :("\n    )\n)\n'})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsxs)(n.p,{children:["Values that are expected to be curried in are often written in ALL_CAPS. While we explain currying here, you can also check out the ",(0,i.jsx)(n.a,{href:"/guides/chialisp-currying",children:"Currying Guide"})," to learn more about what currying is and how it works."]})}),"\n",(0,i.jsx)(n.p,{children:"Run the following command to curry in the password:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'cdv clsp curry password.clsp -a "hello"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Which should produce the following result:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-chialisp",children:'(a (q 2 (i (= 2 5) (q 1 . "Correct!") (q 1 . "Incorrect :(")) 1) (c (q . "hello") 1))\n'})}),"\n",(0,i.jsx)(n.p,{children:"Which we can now execute with a provided solution:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'brun \'(a (q 2 (i (= 2 5) (q 1 . "Correct!") (q 1 . "Incorrect :(")) 1) (c (q . "hello") 1))\' "(hello)"\n'})}),"\n",(0,i.jsxs)(n.p,{children:["Now that we've introduced currying, we can create a different program using a different ",(0,i.jsx)(n.code,{children:"CORRECT_PASSWORD"})," without modifying any of the source code."]}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsx)(n.p,{children:"Now, let's nest a command."}),(0,i.jsx)(n.p,{children:"Because currying outputs CLVM, we can nest it as input to the compiler to make the process of testing this out easier."}),(0,i.jsxs)(n.p,{children:["An important thing to note here is that the nesting will not work properly if surrounded with single quotes, thus, we would use ",(0,i.jsx)(n.code,{children:'"$()"'})," and not ",(0,i.jsx)(n.code,{children:"'$()'"}),". This requires us to flip all nested quotes so that we have single quotes inside of the double quote (in this upcoming example take a look at ",(0,i.jsx)(n.code,{children:"'goodbye'"}),". )."]})]}),"\n",(0,i.jsx)(n.p,{children:"You can try it with a new password:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'brun "$(cdv clsp curry password.clsp -a \'goodbye\')" "(goodbye)"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Which should output the following result:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"Correct!\n"})}),"\n",(0,i.jsx)(n.p,{children:"This time, try using the wrong password:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'brun "$(cdv clsp curry password.clsp -a \'goodbye\')" "(hello)"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Which should output the following result:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"Incorrect :(\n"})}),"\n",(0,i.jsxs)(n.p,{children:["We're making progress, but there's still some issues with this program. The password is directly visible in the Chialisp bytecode. When we get to spending coins this information will be revealed to the world, allowing ",(0,i.jsx)(n.em,{children:"anyone"})," to know the password. Let's see what we can do about this."]}),"\n",(0,i.jsx)(n.h2,{id:"hashing-example",children:"Hashing Example"}),"\n",(0,i.jsx)(n.p,{children:"Although this won't make the password more secure, it's important to understand hashing and how it can be used to keep values hidden until it is necessary to reveal them."}),"\n",(0,i.jsxs)(n.p,{children:["A hash function will take an input and return a hash value. One of the most popular hashing algorithms is ",(0,i.jsx)(n.strong,{children:"sha256"})," which is directly supported within Chialisp. A few important notes about hash functions:"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"Given a value, calculating the hash is extremely easy,"}),"\n",(0,i.jsx)(n.li,{children:"Given a hash, calculating the original input is extremely difficult or impossible,"}),"\n",(0,i.jsx)(n.li,{children:"Passing the same value through a hashing function multiple times will always result in the same output."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"We can use these principles to our advantage by currying a hash of the expected password instead of the password value itself. This prevents us from revealing the expected password while still allowing us to check if the provided password is correct. This is done by hashing the provided password. You can think of this operation as:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-chialisp",children:"(if (= (sha256 password) PASSWORD_HASH)\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsx)(n.p,{children:"This is the exact process websites use to check if your login credentials are correct without storing your actual password in a database."})}),"\n",(0,i.jsxs)(n.p,{children:["Now replace the contents of ",(0,i.jsx)(n.code,{children:"password.clsp"})," with this:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-chialisp",metastring:'title="password.clsp"',children:'(mod (PASSWORD_HASH password)\n    (if (= (sha256 password) PASSWORD_HASH)\n        "Correct!"\n        "Incorrect :("\n    )\n)\n'})}),"\n",(0,i.jsx)(n.h3,{id:"hash-the-password",children:"Hash the Password"}),"\n",(0,i.jsx)(n.p,{children:"The first step to using this program is to find the hash of our desired password."}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsx)(n.p,{children:"Pick a password that you would never use for anything real. It is for the purposes of this lesson only."}),(0,i.jsxs)(n.p,{children:["For simplicity, you can use the password ",(0,i.jsx)(n.code,{children:"hello"}),". If you don't, replace any instance of ",(0,i.jsx)(n.code,{children:"hello"})," throughout this lesson with the one you chose."]})]}),"\n",(0,i.jsxs)(n.p,{children:["Run the following command to calculate the value for ",(0,i.jsx)(n.code,{children:"PASSWORD_HASH"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'cdv hash "hello"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Which, with this password, outputs the following hash:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824\n"})}),"\n",(0,i.jsx)(n.p,{children:"Write this value down somewhere you can refer to later."}),"\n",(0,i.jsx)(n.h3,{id:"curry-the-hash",children:"Curry the Hash"}),"\n",(0,i.jsxs)(n.p,{children:["We now need to curry the value for ",(0,i.jsx)(n.code,{children:"PASSWORD_HASH"})," into this program. This will produce a new program unique to this password."]}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["If you decided to use a different password, you will need to issue these commands with a different hash. Replace the hash in this command with the one you calculated. ",(0,i.jsxs)(n.strong,{children:["It is important to not forget the ",(0,i.jsx)(n.code,{children:"0x"})," prefix in front of the hash"]}),", since you are representing it as a Chialisp value."]})}),"\n",(0,i.jsx)(n.p,{children:"Run the following command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-chialisp",children:'cdv clsp curry password.clsp -a "0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Which, with this hash, outputs the following compiled CLVM program:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-chialisp",children:'(a (q 2 (i (= (sha256 5) 2) (q 1 . "Correct!") (q 1 . "Incorrect :(")) 1) (c (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824) 1))\n'})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"Friendly reminder, the output here is specific to the hash you used."})}),"\n",(0,i.jsx)(n.p,{children:"We now have the same functioning password check, but the expected password is not revealed until spent with the correct password. We can try it out with:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'brun \'(a (q 2 (i (= (sha256 5) 2) (q 1 . "Correct!") (q 1 . "Incorrect :(")) 1) (c (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824) 1))\' "(hello)"\n'})}),"\n",(0,i.jsxs)(n.admonition,{type:"warning",children:[(0,i.jsx)(n.p,{children:"This is not a suitable security check for anything more than good fun!\nWhile great as an exercise and a good building block for what is to come, there are some serious problems with this approach."}),(0,i.jsx)(n.p,{children:"When we create our coin in the next section, we will be submitting our code to the blockchain for the world to see. And to spend this coin, you must provide a solution."}),(0,i.jsx)(n.p,{children:"The provided solution is also visible, so when we provide a solution, we are revealing our password. You may get lucky and have your coin go through as you'd expect (assuming no tampering from a full node who sees your solution), but you will now never be able to use the same password again safely. And any other coins using this hash are now also tainted."}),(0,i.jsx)(n.p,{children:"Once the association is made between an input and a hash value, all security is lost. This is exactly how hash lookup tables work. They are a giant record of common inputs and their associated sha256 hashes."}),(0,i.jsx)(n.p,{children:"The solution to this problem is to instead use signatures, which we will get to in the future."})]}),"\n",(0,i.jsx)(n.h2,{id:"final-puzzle",children:"Final Puzzle"}),"\n",(0,i.jsx)(n.p,{children:"While we know the use of hashes is not perfect, we will still use them to get some practice creating coins. This will allow us to see the security problems as well."}),"\n",(0,i.jsx)(n.p,{children:"This is a slightly more complicated Chialisp program than what we've explored before."}),"\n",(0,i.jsxs)(n.p,{children:["Write the following in ",(0,i.jsx)(n.code,{children:"password.clsp"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-chialisp",metastring:'title="password.clsp"',children:"(mod (PASSWORD_HASH password conditions)\n    (if (= (sha256 password) PASSWORD_HASH)\n        conditions\n        (x)\n    )\n)\n"})}),"\n",(0,i.jsxs)(n.p,{children:["The key differences are the introduction of ",(0,i.jsx)(n.code,{children:"conditions"})," in the parameter list and ",(0,i.jsx)(n.code,{children:"(x)"})," at the bottom of the code. Let's explain both of these."]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["First off, the ",(0,i.jsx)(n.code,{children:"(x)"})," operator raises an error. If the password is invalid, the ",(0,i.jsx)(n.code,{children:"if"})," evaluates to ",(0,i.jsx)(n.code,{children:"false"})," and the program terminates (the coin remains unspent)."]}),"\n"]}),"\n",(0,i.jsxs)(n.li,{children:["\n",(0,i.jsxs)(n.p,{children:["Conditions is a list that will be provided by the spender to control what happens with the coin. Instead of only being able to output a value like ",(0,i.jsx)(n.code,{children:"Correct!"}),", the user can customize the functionality by providing specific requests in their provided solution. We'll see this in action and learn how to write the conditions later."]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsx)(n.p,{children:"The blockchain doesn't understand anything other than a list of conditions as an output. Anything else will be ignored and cause the spend to be thrown out."}),(0,i.jsx)(n.p,{children:"Everything up to this point has just been a readable example that can be run on the CLI."})]}),"\n",(0,i.jsx)(n.h3,{id:"curry-the-hash-1",children:"Curry the Hash"}),"\n",(0,i.jsxs)(n.p,{children:["We need to curry the value for ",(0,i.jsx)(n.code,{children:"PASSWORD_HASH"})," into the new password puzzle. This will produce a new puzzle unique to this password."]}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["If you decided to use a different password, you will need to issue these commands with a different hash. Replace the hash in this command with the one you calculated. ",(0,i.jsxs)(n.strong,{children:["It is important to not forget the ",(0,i.jsx)(n.code,{children:"0x"})," prefix in front of the hash"]}),", since you are representing it as a Chialisp value."]})}),"\n",(0,i.jsx)(n.p,{children:"Run the following command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-chialisp",children:'cdv clsp curry password.clsp -a "0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"\n'})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsx)(n.p,{children:"Remember the 0x before the hash."})}),"\n",(0,i.jsx)(n.p,{children:"Which, with this hash, outputs the following compiled CLVM program:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-chialisp",children:"(a (q 2 (i (= (sha256 5) 2) (q . 11) (q 8)) 1) (c (q . 0x2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824) 1))\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"Friendly reminder, the output here is specific to the hash you used."})}),"\n",(0,i.jsx)(n.h3,{id:"puzzle-hash",children:"Puzzle Hash"}),"\n",(0,i.jsx)(n.p,{children:"We need to calculate the puzzle hash before we can create the coin."}),"\n",(0,i.jsx)(n.p,{children:"This is because a coin id consists of the following things hashed together:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["The id of its parent (",(0,i.jsx)(n.code,{children:"parent_coin_id"}),")"]}),"\n",(0,i.jsxs)(n.li,{children:["The hash of its puzzle (",(0,i.jsx)(n.code,{children:"puzzle_hash"}),")"]}),"\n",(0,i.jsxs)(n.li,{children:["The amount of mojos locked with it (",(0,i.jsx)(n.code,{children:"amount"}),")"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"In other words, you can calculate the coin id in Chialisp like this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-chialisp",children:"(sha256 parent_coin_id puzzle_hash amount)\n"})}),"\n",(0,i.jsx)(n.p,{children:"Paste the compiled CLVM into this command to calculate the hash:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'opc -H "<Compiled CLVM>"\n'})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"If this command outputs two values, copy the first one."})}),"\n",(0,i.jsx)(n.p,{children:"Write this value down somewhere you can refer to later."}),"\n",(0,i.jsx)(n.h3,{id:"puzzle-reveal",children:"Puzzle Reveal"}),"\n",(0,i.jsx)(n.p,{children:"The puzzle reveal is just a serialized form of the puzzle, written in hex. It is what you must reveal on-chain when spending a coin."}),"\n",(0,i.jsx)(n.p,{children:"Paste the compiled CLVM into this command to calculate the puzzle:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'opc "<Compiled CLVM>"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Write this value down somewhere you can refer to later."}),"\n",(0,i.jsx)(n.h3,{id:"creating-the-coin",children:"Creating the Coin"}),"\n",(0,i.jsx)(n.p,{children:"Now that you have the puzzle hash and puzzle reveal, you can easily create the coin using the Chia wallet."}),"\n",(0,i.jsx)(n.admonition,{type:"tip",children:(0,i.jsx)(n.p,{children:"A wallet address is just an encoded form of a puzzle hash."})}),"\n",(0,i.jsx)(n.p,{children:"You can calculate the address used for your password puzzle with this command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'cdv encode -p txch "<Puzzle Hash>"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Which should produce an output similar to this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"txch1sazy7z6gj2wq7yw4ztj7p3meffcun23qu8psx92vekngulqurfzsn9uyqv\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"Remember that this address will change based on which password you used."})}),"\n",(0,i.jsx)(n.p,{children:"Next, you can either create a coin with that address by using the Chia wallet GUI or on the command-line."}),"\n",(0,i.jsx)(n.p,{children:"If you choose to do it via the command-line, run the following command with the address you just calculated:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'chia wallet send --amount 0.01 --fee 0.00005 --address "txch1sazy7z6gj2wq7yw4ztj7p3meffcun23qu8psx92vekngulqurfzsn9uyqv"\n'})}),"\n",(0,i.jsx)(n.h3,{id:"spending-the-coin",children:"Spending the Coin"}),"\n",(0,i.jsx)(n.p,{children:"We will now spend the coin to release the value back to our wallet (minus fees)."}),"\n",(0,i.jsxs)(n.admonition,{type:"note",children:[(0,i.jsxs)(n.p,{children:["There are many conditions that can enable advanced functionality, but one of the most important ones is ",(0,i.jsx)(n.code,{children:"CREATE_COIN"}),". It is identified by the opcode ",(0,i.jsx)(n.code,{children:"51"})," and is used to create a new coin if the spend is successful. Each condition is defined as a list (beginning with the opcode, followed by each parameter). In the case of ",(0,i.jsx)(n.code,{children:"CREATE_COIN"}),", we will give it a ",(0,i.jsx)(n.code,{children:"puzzle_hash"})," (an alternative, unencoded format for an ",(0,i.jsx)(n.em,{children:"address"}),") and an ",(0,i.jsx)(n.code,{children:"amount"}),"."]}),(0,i.jsxs)(n.p,{children:["We will be using the ",(0,i.jsx)(n.code,{children:"CREATE_COIN"})," condition to create a new coin in our wallet with the value locked in the password coin."]})]}),"\n",(0,i.jsx)(n.p,{children:"Run the following command to get your address:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"chia wallet get_address\n"})}),"\n",(0,i.jsx)(n.p,{children:"Which should produce an output similar to this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"txch1u6rk0w3tgv0t3m7ehrwsmdng6hqvqrr6qn5r767x2pxq7f3xlhmq2gva00\n"})}),"\n",(0,i.jsx)(n.p,{children:"Now that you have one of your addresses, you can convert it to a puzzle hash with this command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'cdv decode "<Your Address>"\n'})}),"\n",(0,i.jsx)(n.p,{children:"Which should produce an output similar to this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"e68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"important",children:(0,i.jsxs)(n.p,{children:["For the ",(0,i.jsx)(n.code,{children:"CREATE_COIN"})," condition, we will use this puzzle hash prefixed with ",(0,i.jsx)(n.code,{children:"0x"}),"."]})}),"\n",(0,i.jsx)(n.p,{children:"Use the puzzle hash to build the condition, which will end up looking something like this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-chialisp",children:"(51 0xe68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6 9950000000)\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"caution",children:(0,i.jsxs)(n.p,{children:["It is especially important that you use ",(0,i.jsx)(n.strong,{children:"your wallet address"})," here, not the example."]})}),"\n",(0,i.jsx)(n.p,{children:"The solution is a list of arguments, consisting of a list of conditions containing the one above:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"opc \"('hello' ((51 0xe68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6 9950000000)))\"\n"})}),"\n",(0,i.jsx)(n.admonition,{type:"warning",children:(0,i.jsx)(n.p,{children:"Remember the 0x before your puzzle hash."})}),"\n",(0,i.jsx)(n.p,{children:"Which should produce an output similar to this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{children:"ffffff33ffa0e68767ba2b431eb8efd9b8dd0db668d5c0c00c7a04e83f6bc6504c0f2626fdf6ff85025110f380808080\n"})}),"\n",(0,i.jsx)(n.p,{children:"Run the following command to get the coin record by the puzzle hash you used earlier:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:'cdv rpc coinrecords --by puzzlehash "<Puzzle Hash>"\n'})}),"\n",(0,i.jsx)(n.p,{children:"This should produce an output similar to this:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'[\n    {\n        "coin": {\n            "amount": 10000000000,\n            "parent_coin_info": "0x88dae7d74a7b5edc8b4d46124e221a00d7b9f59042cd98be76472b663b2ce813",\n            "puzzle_hash": "0x87444f0b48929c0f11d512e5e0c7794a71c9aa20e1c303154ccda68e7c1c1a45"\n        },\n        "coinbase": false,\n        "confirmed_block_index": 1681937,\n        "spent": false,\n        "spent_block_index": 0,\n        "timestamp": 1666117720\n    }\n]\n'})}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsx)(n.p,{children:"If multiple coins exist with this same puzzle_hash, you will see a list of coins. Most likely you can grab the one with the highest block index (the most recent)."})}),"\n",(0,i.jsxs)(n.p,{children:["Now, using that as a reference, write the following in a file named ",(0,i.jsx)(n.code,{children:"spendbundle.json"}),":"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "coin_spends": [\n    {\n      "coin": ...,\n      "puzzle_reveal": "<Puzzle Reveal>",\n      "solution": "<Solution>"\n    }\n  ],\n    "aggregated_signature": "0xc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"\n}\n'})}),"\n",(0,i.jsxs)(s,{children:[(0,i.jsx)("summary",{children:"Example Spend Bundle"}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n    "coin_spends": [\n        {\n            "coin": {\n                "amount": 10000000000,\n                "parent_coin_info": "0x138d7e723b9f06ff3f4af8fba066cebb7ecb5b6c7f3353ae1b6a89309314c42d",\n                "puzzle_hash": "0x87444f0b48929c0f11d512e5e0c7794a71c9aa20e1c303154ccda68e7c1c1a45"\n            },\n            "puzzle_reveal": "ff02ffff01ff02ffff03ffff09ffff0bff0580ff0280ffff010bffff01ff088080ff0180ffff04ffff01a02cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824ff018080",\n            "solution": "ff8568656c6c6fffffff33ffa0697f2559a54b0963c8fbd33f34888f2cd94eafa80eb880e2a3a01021fc88fbfdff85025110f380808080"\n        }\n    ],\n    "aggregated_signature": "0xc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"\n}\n'})})]}),"\n",(0,i.jsxs)(n.admonition,{type:"info",children:[(0,i.jsxs)(n.p,{children:["The puzzle reveal will be confirmed against the puzzle hash of the coin. If you used the same exact puzzle you will have the same value here. The solution will vary depending on what puzzle hash you used for ",(0,i.jsx)(n.code,{children:"51 CREATE_COIN"}),"."]}),(0,i.jsxs)(n.p,{children:["The ",(0,i.jsx)(n.code,{children:"aggregated_signature"})," requires no custom value, but you will be required to use the default value here. Copy and Paste this. We will talk about this more"]})]}),"\n",(0,i.jsx)(n.admonition,{type:"note",children:(0,i.jsxs)(n.p,{children:["For the ",(0,i.jsx)(n.code,{children:"coin"})," field, copy and paste the coin found using the ",(0,i.jsx)(n.code,{children:"coinrecords"})," command. This is the coin that you created before, and are now spending."]})}),"\n",(0,i.jsx)(n.p,{children:"Finally, submit the transaction to the mempool by running this final command:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-bash",children:"cdv rpc pushtx spendbundle.json\n"})}),"\n",(0,i.jsxs)(n.p,{children:["If everything was successful, this transaction should be successful, and you should see your wallet balance increase after some time passes. It won't be identical to when you started because of the total of ",(0,i.jsx)(n.code,{children:"0.0001"})," network fees added throughout the process."]}),"\n",(0,i.jsx)(n.h2,{id:"common-mistakes",children:"Common Mistakes"}),"\n",(0,i.jsxs)(n.p,{children:["A few mistakes you may run in to is forgetting the 0x for both the curried in password and the receive puzzle hash in the provided solution. These both require 0x! You will also want to have 0x for the ",(0,i.jsx)(n.code,{children:"coin"})," object. The safest way to make sure your coin record is correct is to copy it exactly from the RPC, just make sure you grab the right coin (remember, multiple coins can have the same puzzle hash value)."]}),"\n",(0,i.jsx)(n.h2,{id:"security-concerns",children:"Security Concerns"}),"\n",(0,i.jsx)(n.p,{children:"Using a password to lock coins is good to teach various concepts, but it is insecure in practice."}),"\n",(0,i.jsx)(n.p,{children:"There are a couple of reasons for this:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"The password is publicly revealed to all nodes when the coin is spent"}),"\n",(0,i.jsx)(n.li,{children:"The transaction can be intercepted and modified freely by malicious farmers"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Let's explore these in more detail."}),"\n",(0,i.jsx)(n.h3,{id:"password-is-revealed",children:"Password is Revealed"}),"\n",(0,i.jsx)(n.p,{children:"When you spend a coin, you reveal the its puzzle and the solution you are using to spend it. The password is contained in plain text in the solution, for anyone with a node to read. This means that any use of the same password is compromised, including any other coins locked with the same puzzle."}),"\n",(0,i.jsx)(n.p,{children:"If this were the only problem, it wouldn't be that big of a deal, since you could simply use the password only once, make it very secure to prevent brute force attacks, and not use it anywhere external to the blockchain. However, this is not the only problem with using a password rather than traditional methods."}),"\n",(0,i.jsx)(n.h3,{id:"spend-interception",children:"Spend Interception"}),"\n",(0,i.jsx)(n.p,{children:"When you spend a coin, you create a transaction which is then added to the mempool. Everyone's transactions get collected together. Then, whichever farmer happens to farm the block has full control on which transactions to include in that block (typically based on the fees if there are more transactions than available block space)."}),"\n",(0,i.jsxs)(n.p,{children:["However, a farmer which happens to also be a malicious attacker could also change ",(0,i.jsx)(n.em,{children:"anything"})," about the transaction, not only whether or not it's included. The way to prevent this is to make the spend not valid if anything is tampered with (mainly by signing the solution and requiring the signature in the puzzle)."]}),"\n",(0,i.jsxs)(n.p,{children:["But because this puzzle has no way to prevent tampering in this way, it would be possible to replace the puzzle hash in the ",(0,i.jsx)(n.code,{children:"CREATE_COIN"})," condition. In other words, the attacker could steal your funds by sending it to their wallet rather than yours.So even if you use the most secure password possible, it is simply not sufficient."]})]})}function d(e={}){const{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},1151:(e,n,s)=>{s.d(n,{Z:()=>r,a:()=>a});var i=s(7294);const o={},t=i.createContext(o);function a(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);