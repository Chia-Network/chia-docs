---
slug: /guides/crash-course/intro-to-chialisp
title: Chialisp
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

For this section of the course, you will learn how to set up your development environment, write Chialisp code, and execute it on the command-line.

:::note
If you are using PowerShell, make sure to install the PowerShell 7.3 preview version:

```bash
winget install --id Microsoft.Powershell.Preview --source winget
```

This version fixes nested quoting, which is required for many of the commands on this page.
:::

## Dev Tools

To get started with Chialisp, you will first want to [install Chia Dev Tools](https://github.com/Chia-Network/chia-dev-tools).

Here is a summary of the instructions:

<Tabs groupId="OS"
defaultValue="windows"
values={[
{label: 'Windows', value: 'windows'},
{label: 'Linux/MacOS', value: 'linux-macos'},
]}>
<TabItem value="windows">

```bash
mkdir learning
cd learning
py -m venv venv
./venv/Scripts/activate
pip install chia-dev-tools
cdv --version
```

  </TabItem>
  <TabItem value="linux-macos">

```bash
mkdir learning
cd learning
python3 -m venv venv
. ./venv/bin/activate
pip install chia-dev-tools
cdv --version
```

  </TabItem>
</Tabs>

This will install the Chia Dev Tools within your activated virtual environment. You'll want to make sure this virtual environment is activated before working on Chialisp. You'll see a `(venv)` on the left of your terminal prompt.

:::info
Virtual environments allow you to install specific Python packages that will only be usable with the environment that is currently active. This allows you to switch between different environments for different projects, or if you just want to use different software versions.
:::

### Chia Dev Tools

The `cdv` command provides a set of useful commands for building and running Chialisp programs, as well as some utilities for deploying smart coins on the Chia blockchain, which we will cover later on.

Run the following to see what commands it provides:

```bash
cdv
```

For example, a Chialisp file can be built like so:

```bash
cdv clsp build something.clsp
```

### Run

You also have access to the `run` command that can be used to compile Chialisp code directly.

:::note
If Chialisp code doesn't depend on any external parameters, the compiler will simplify it to the smallest form it can, which often means that this command will return the final output of the program.

If this is the case, you can skip the `brun` command.
:::

Run the following command:

```bash
run '(+ 2 3)'
```

Which should return the following result:

```chialisp
5
```

---

:::info
The syntax `(+ 2 3)` may look confusing. In Chialisp, we place the operator first, followed by the operands. This is known as **prefix notation**. Think of this as the equivalent to `2 + 3` in math and most other programming languages.

It is set up this way because every program in Chialisp is written as a list, where the first item is the operator. `(+ 2 3)` is a list of three elements with the first being the `+` operator, and thus it's a valid Chialisp program.
:::

### Brun

The `brun` command is different from the `run` command in that it doesn't compile code. Instead, it takes the result of the `run` command and executes it on the Chialisp Virtual Machine (CLVM) directly.

If you need to pass external parameters into the program, you will need to first compile it with `run`, then use the `brun` command with the parameters.

For example, let's say that the `run` command produced the following CLVM bytecode output:

```chialisp
2
```

You could run it like so:

```bash
brun '2' '(42)'
```

Which should produce the following output:

```chialisp
42
```

So Chialisp can calculate the [meaning of life](<https://en.wikipedia.org/wiki/42_(number)#The_Hitchhiker's_Guide_to_the_Galaxy>)!

---

## Writing a Chialisp Puzzle {#writing-puzzle}

Let's start off with some terminology. Firstly, coins on the Chia blockchain use Chialisp programs named **puzzles** to secure the value stored within. The parameters to a puzzle are called its **solution**.

To create puzzles that require a solution, we will use the `mod` operator. It allows us to take arguments passed in to customize the functionality and result of the puzzle.

A very basic example would be:

```bash
run '(mod (arg1 arg2) (+ arg1 arg2))'
```

Which should return the following result:

```bash
(+ 2 5)
```

:::info
What in the world is `(+ 2 5)` that `run` returned? This is an example of Chialisp bytecode that is later executed by the Chialisp Virtual Machine (CLVM). It is not very human-readable, but don't worry about that, as you are not required to understand CLVM bytecode in order to use it.

Our first command, `run`, will take Chialisp code and compile it to bytecode. Next, `brun` will take that bytecode and execute it.
:::

We will then run this puzzle with the `brun` command, followed by a solution of your choice:

```bash
brun '(+ 2 5)' '(10 5)'
```

Which should return the following result:

```chialisp
15
```

:::info reminder
We are now using `mod` to demand a solution for our puzzle. Whenever this is the case, you will be required to use the `brun` command after `run`.
:::

Pay close attention to the location of quotes and parenthesis. It's easy to get lost! With `brun`, the solution is passed in as a distinct value surrounded by quotes. `(10, 5)` is the solution in this example and translates to `arg1 = 10` and `arg2 = 5`.

You can run it again with a different solution:

```bash
brun '(+ 2 5)' '(20 7)'
```

Which should return the following result:

```chialisp
27
```

At this point you have a working Chialisp puzzle that will take inputs and give back an output. Congrats on making it this far!

## Comparisons and If

Going with a contrived example, let's say we wanted to add two numbers and return `large` if they were `> 100`, or `small` if they were `<= 100`.

You can compare two values like so:

```chialisp
(> apples oranges)
```

If `apples` is larger than `oranges`, this returns `1`. Otherwise, the output is `()`, which is equivalent to `0`.

You can then use an if statement to return one of two different things depending on the result.

```chialisp
(if <comparison> <result if true> <result if false>)
```

A concrete example of an `if` would be:

```bash
run '(if 1 "true" "false")'
```

Which should return the following result:

```chialisp
"true"
```

Now, we will add `arg1` and `arg2` with the code `(+ arg1 arg2)` and compare it to the literal value `100`. This comparison will determine whether the `if` is `true` or `false`. We end up with:

```bash
run '(mod (arg1 arg2) (if (> (+ arg1 arg2) 100) "large" "small"))'
```

Which should return the following result:

```chialisp
(a (i (> (+ 2 5) (q . 100)) (q 1 . "large") (q 1 . "small")) 1)
```

Next, let's put this bytecode through `brun`, giving it a solution:

```bash
brun '(a (i (> (+ 2 5) (q . 100)) (q 1 . "large") (q 1 . "small")) 1)' '(10 90)'
```

Which should return the following result:

```chialisp
small
```

Now, again with a different solution:

```bash
brun '(a (i (> (+ 2 5) (q . 100)) (q 1 . "large") (q 1 . "small")) 1)' '(10 91)'
```

Which should return the following result:

```chialisp
large
```

The difference here being the new solution of `(10 91)`. When added together, `10` and `91` are greater than `100`.

## Text Editor

Up to this point, we've been using the command line to write and run Chialisp programs. While this is efficient for quickly prototyping and testing small programs, it doesn't scale very well.

When writing larger programs in Chialisp, it'll be much easier to use a text editor of your choice and save them to a file. Both [Atom](https://atom.io) and [Visual Studio Code](https://code.visualstudio.com) have extensions to improve the quality of life of writing Chialisp code. However, any LISP-based syntax highlighting will help as well.

:::info
If you decide to use [Visual Studio Code](https://code.visualstudio.com), we have begun development on a [Chialisp language server extension](https://marketplace.visualstudio.com/items?itemName=ChiaNetwork.chialisp).

You may need to click the dropdown in the editor to install the prerelease version.
:::

## Chialisp Files

We will be storing Chialisp code in files, then building and running the files on the command line using Chia Dev Tools. There are a few commands that we can use more effectively after setting up a project in this way.

### Conventions

The following file extensions are used for Chialisp:

| Extension   | Description                     |
| ----------- | ------------------------------- |
| `.clsp`     | Chialisp source code            |
| `.clvm`     | Deserialized CLVM bytecode      |
| `.clvm.hex` | Serialized CLVM bytecode        |
| `.clsp.hex` | Generated CLVM bytecode         |
| `.sym`      | Generated Chialisp symbol table |

You will be writing code in `.clsp` files.

## Putting it Together

Using a text editor and files allows us to format our code nicely.

Put the following in a file named `first.clsp`:

```chialisp title="first.clsp"
(mod (arg1 arg2)
    (if (> (+ arg1 arg2) 100) 'large' 'small')
)
```

Now, we can execute the file by name:

```bash
run first.clsp
```

This output will be exactly the same as before, but our code is a bit easier to manage.

We will still execute the output like so:

```bash
brun '(a (i (> (+ 2 5) (q . 100)) (q 1 . "large") (q 1 . "small")) 1)' '(50 51)'
```

And, using nesting, `$()` will execute anything within `()` first. We can simplify further with:

```bash
brun "$(run first.clsp)" "(50 51)"
```

## Defining Functions

A function will give a name to some lines of code, often taking an input and returning a result. Let's create a new file to practice functions inside of Chialisp.

Create a file named `sum.clsp`:

```chialisp title="sum.clsp"
(mod (arg1 arg2)
    (defun sum (s1 s2)
        (+ s1 s2)
    )

    (sum arg1 arg2)
)
```

This example is silly because we are just adding two numbers, but it shows that we can define a function with parameters. Now, while our solution parameters are still `arg1` and `arg2`, we've introduced `s1` and `s2`. We define the function following this structure:

```chialisp
(defun function_name (parameters)
    function body)
)
```

We can then refer to this function by name later on in our code body:

```chialisp
(function_name arguments)
```

## More Complicated Function

Now that we have a basic function, we can build on this to create a sum function to add all values from a list.

```chialisp
(mod (items)
  (defun sum (items)
    (if items
      (+ (f items) (sum (r items)))
      0
    )
  )

  (sum items)
)
```

Chialisp will use a lot of recursion. In this example, we will use `(f items)` to refer to the first element in the list, and `(r items)` to refer to the rest of the items in the list. By saying `+ (f items) (sum (r items)))`, we are adding the first element with a recursive call to the sum of the rest of the elements. This will repeat until items is empty, returning 0.

Imagine passing in a list `(10 5 3 7)`, we would have a call stack like this:

```chialisp
(+ 10 (sum (list 5 3 7)))
        ↪ (+ 5 (sum (list 3 7)))
                 ↪ (+ 3 (sum (list 7)))
                          ↪ (+ 7 (sum (list)))
                                   ↪ 0
```

We make our way through these calls until we return (0). We then work our way back up adding 0 with 7, 7 with 3, 10 with 5, and finally 15 with 10.

Because we need to stop the recursive calls when the list is empty, we check if the `items` has a value. This can be done with `if items`.

### Invoking our Code

We now have just a single parameter called `items`. This is expected to be a list, so we will pass a solution that is a list. We would normally pass a solution in `()` and a list is surrounded with `()`, so it may look like `"((10 5 3 7))"`:

```

brun "$(run sum.clsp)" "((10 5 3 7))"

```

Response:

```
25
```
