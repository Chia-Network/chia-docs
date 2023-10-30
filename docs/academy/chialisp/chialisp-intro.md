---
title: Intro to Chialisp
slug: /chialisp-intro
---

## Learning objectives
- **Syntax and Structure**: Understand the basic Chialisp syntax and structure.
- **Puzzles and Solutions**: Understand the use of puzzles and solutions in Chialisp.
- **Development Environment**: Setup and configure the Chialisp development environment. test

---

## Content
In this lesson, we review the basics of Chialisp including syntax & structure, inequalities and if statements, and setting up a development environment.

<div class="videoWrapper">
<iframe width="896" height="504" src="https://www.youtube.com/embed/W9QK4PFIIpA" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
</div>

---

## Script
<details>

<summary> Expand for the full script </summary>

00:00  
We're going to go over the very basics of Chialisp we'll talk about a few things the basic syntax and structure of a Chialisp program puzzles and solutions and set up a development environment to test it all out. 

00:20  
So let's get started, the first thing you'll want to do is make sure you have the correct version of python. If you type in python3-version make sure you have python 3.10. Next we're going to want to create a virtual environment so if you run the command python3 -m venv venv. 

00:40  
This is going to create a virtual environment that we can activate to do our development in and to activate it we're going to type in this command bin\activate and now you can see that we are in a virtual environment. 

01:00  
Next we're going to want to install the Chia Dev tools and you can do this by in running pip install Chia Dev tools and let it do its thing. So now let's just make sure we have the correct version by typing cdv --version and you can see we have version 1.1.4. 

01:20  
So now we have our development environment all set up let's go over some key lisp basics. This is the basic run command it takes a list with an operator followed by two operands. 

01:40  
In this example, we have the operands two and three and they'll be added together so we should get five. That's not very useful though so let's create a program that we can pass in some parameters and do the addition for us. All right in this example we have defined a module that receives two parameters arg1 arg2 and then runs the operation on those two parameters so when we run this we're going to get the compiled version of the program that we just wrote. 

02:00  
This is called the puzzle the arguments will be passed into the puzzle as a solution. So how do we run this code? Well our second command is brun so if we pass this compiled puzzle through the brun command and give it a solution such as 7 and 10. 

02:20  
It's going to use that solution as the parameters for the program so we should get 17. Now let's talk about inequalities and if statements. In this program I'm comparing two numbers 10 and 5, and seeing if the first is greater than the second. So in this case the result would be true and we receive a 1. 

02:40  
In the opposite case it would be false and we received an empty set so if statements are going to take this structure if followed by our comparison then the result if it's true followed by the result if it's false. So let's run this program, if 1 which is true return true, else return false.

03:00  
So we expect to see true. So let's create a puzzle using comparisons and if statements. So we're going to type run and define a module that takes two arguments arg1 arg2. So we're going to define an if statement and we want to know if we add the two arguments together if they're greater than 100. 

03:20  
So if greater than the addition of argument 1 and argument 2 is greater than 100 then we're going to return large if it's true and small if it's false.

03:40  
We'll close this and as you can see it's really easy to get lost in the parentheses so for future videos we'll be using a text editor which will make this a lot easier but if we run this we will receive the compiled version of our program and let's pass that puzzle into brun with our solution so run and 

04:00  
we'll add 70 and 100 which is guaranteed to be over 100 so we should receive the result large and that's it. That's the basics of Chialisp; we've talked about basic operators, inequalities if statements compiling our program into puzzles, and passing in a solution. 

04:20  
In future videos we'll talk about smart coins signatures and inner puzzles. Thanks for joining me and I'll catch you in the next video!

</details>

---

## Common gotchas

- **run vs brun:** Run is used to serialize and run chialisp puzzles while brun is used to run clvm serialized puzzles generally when passing arguments.  
- **Parentheses:** Chialisp is part of the fully parenthesized prefix notation programming language family tracing their [origins](https://en.wikipedia.org/wiki/Lisp_(programming_language)) to LISP 1 from the 1950s. One highly apparent aspect of these languages is their use of parenthesis to denote lists. It is recommended to use an IDE with proper syntax highlighting when writing these languages to ensure that all parenthesis are in the proper places. To help with this here is a [Chialisp language server extension](https://marketplace.visualstudio.com/items?itemName=ChiaNetwork.chialisp) for Visual Studio.  
- **Prefix Notation:** Chialisp being part of the LISP family uses prefix notation. This means that the functions or operators appears first with their arguments following.  

---

## Knowledge check

:::tip Question 1 - Subtraction

What is a chialisp puzzle for subtracting two arguments?

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

```chialisp
(mod (arg1 arg2) 
    (- arg1 arg2)
)
``` 

</details>

:::tip Question 2 - Comparison

What is the serialized form of this chialisp puzzle?

```chialisp
(mod (arg1 arg2) 
    (> arg1 arg2)
)
``` 

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

```chialisp
(> 2 5)  
``` 

</details>

:::tip Question 3 - If Statement

What is the result of the below serialized puzzle and solution?  

Puzzle:
```chialisp
(a (i 2 (q 1 . "true") (q 1 . "false")) 1)  
``` 
Solution:
```chialisp
(1) 
``` 

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

`"true"`

</details>

:::tip Question 4 - Combining all of the above

What is a Chialisp puzzle that performs the following? 
- Accepts two arguments
- Adds the two arguments together
- Compares the sum of the arguments to 100
- Results in "Large" when the sum is greater than 100 and "Small" when the sum is less than 100

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

```chialisp
(mod (arg1 arg2) 
    (if (> (+ arg1 arg2) 100) "large" "small")
) 
```

</details>

---

## Additional resources

### Links

- General [chialisp concepts](https://docs.chia.net/guides/chialisp-concepts): overviews of currying, inner puzzles, and morphing conditions.
- Guided [chialisp walkthroughs](https://docs.chia.net/guides/): guides for installation, creating smart coins, and working with BLS signatures.  
- Chialisp [detailed documentation](https://chialisp.com/): detailed information on all aspects of chialisp.  
- Support [in discord](https://discord.gg/chia): for further support join our discord server and ask in the #chialisp or #support channels.  

--- 