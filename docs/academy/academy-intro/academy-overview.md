---
title: Academy Overview
slug: /academy-overview
---

import Runnable from '@site/src/components/Runnable.tsx';

The lesson pages in Chia Academy are thoughtfully designed to enhance the learning experience for students. Each lesson is organized in a user-friendly and visually appealing manner. The structure typically includes:  

---

## Lesson title
Each lesson starts with a clear and descriptive title that informs students about the topic they are about to explore.  

---

## Learning objectives
A set of specific learning objectives is provided at the beginning of the lesson. These objectives outline what students will be able to understand or do by the end of the lesson, setting clear expectations.  
- Learning Objective 1
- Learning Objective 2
- Learning Objective 3

---

## Content
The core content in each lesson is conveyed through structured, short format videos followed by scripts. This hybrid visual and text approach ensures accessibility and caters to diverse learning preferences.  

---

## Script
Each of the short format videos will be proceeded by the script used for creating the video. This written format ensures ease of translation catering to diverse learners.  
<details>

<summary> Expand for the full script </summary>

00:00  
This is an example of how the scripts will be provided including timestamps.  

00:20  
The timestamps are provided in set intervals and are formatted as `minutes:seconds` (`MM:SS`).  

</details>

---

## Common gotchas
While lessons are thoughtfully designed to facilitate learning, there are some common pitfalls or challenges that a learner might face. These will be described after the script for each lesson.  

- **Gotcha 1:** Description of gotcha 1.  
- **Gotcha 2:** Description of gotcha 2.  
- **Gotcha 3:** Description of gotcha 3.  

---

## Knowledge check
Each lesson contains a brief self-assessment quiz designed to gauge learners' comprehension and retention of the video material. These assessments reinforce key concepts and help learners self-assess their understanding.  
  
The quiz section has two components, questions and answers.  The questions contain lesson-applicable questions and the answers contain the corresponding answers.  
  
Since this is a self assessment, you can of course skip the questions and go straight to the answers; but, we strongly recommend that you take the time to solve the question on your own before checking the answer.  

:::tip Question 1

What format is used for timestamps in the content scripts?

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

`MM:SS` or `minutes:seconds`  

</details>

:::tip Question 2

What is the serialized form of this Chialisp puzzle?

```chialisp
(mod (arg1 arg2) (+ arg1 arg2))
``` 

:::

<details>

<summary> Answer (expand when ready to see the answer)  </summary>

```chialisp
(+ 2 5)  
``` 

</details>

:::tip Question 3

What is the Chialisp puzzle for squaring a passed argument?

:::

<details>

<summary> Answer (expand when ready to see the answer) </summary>

```chialisp
(mod (arg)
    (defun square (number)
        (* number number)
    )
    (square arg)
)
```   

</details>

---

## Additional resources
Links to additional reading materials, videos, or external resources may be provided for learners who wish to delve deeper into the lessons subject.  

### Runnable Chialisp and clvm plugins
Runnable plugins are for Chialisp and clvm are provided with all applicable lessons. Take some time to familiarize yourself with the tools and learn how to best make use of them throughout the lessons.  
Each plugin has a series of components:  
  
**Language:** The language of the plugin (Chialisp or clvm) is in the top right corner.  
**Solution:** The top section is the input or solution.   
**Puzzle:** The bottom section is the puzzle.  
**Run:** Each plugin has a play/run button to the right of the language identifier.  
**Result:** After clicking run, the result of the puzzle appears below the puzzle.  
**Cost:** After clicking run, the clvm cost of the puzzle is calculated and appears in the bottom right corner.  
**Errors:** After clicking run, the plugin checks for and provides any errors in place of the result section.  

:::info

The plugins only validate the formatting and completeness of the code; they do not check for any potential exploits.

:::

#### Chialisp plugin
When clicking run, the puzzle will first be serialized into clvm (similar to the `run` command) then the solution will be passed into the serialized puzzle (similar to the `brun` command).  
The below example is a Chialisp puzzle that squares the number passed as an argument.  
  
Note the number `(5)` is used in the solution top section and the Chialisp formatted puzzle is entered in the puzzle bottom section. Clicking run on this puzzle will return `25` as the result.  

<Runnable flavor='chialisp' input='(5)'>

```chialisp
(mod (arg)
    (defun square (number)
        (* number number)
    )
    (square arg)
)
```

</Runnable>

#### Clvm plugin
When clicking run, the solution will be passed into the serialized puzzle (similar to the `brun` command).  
The below example uses the serialized puzzle from above that squares the number passed as an argument.  
  
Note the number `(5)` is used in the solution top section and the serialized puzzle is entered in the puzzle bottom section. Clicking run on this puzzle will return `25` as the result.  

<Runnable flavor='clvm' input='(5)'>

```chialisp
(a (q 2 2 (c 2 (c 5 ()))) (c (q 18 5 5) 1))
```

</Runnable>

---
