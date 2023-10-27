---
title: Academy Overview
slug: /academy-overview
---

import Runnable from '../../../src/components/Runnable.tsx';

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

The quiz section has two components, questions and answers. The questions contain lesson-applicable questions and the answers contain the corresponding answers.

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

---
