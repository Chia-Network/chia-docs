---
slug: /guides/gaming-krunk-rules
title: Krunk Rules
---

:::warning Coming Soon

Krunk will be available in a future release. The rules below are based on current known game mechanics and may be subject to change.

:::

## Objective

Krunk is a word guessing game where players try to guess each other's chosen words. Each player picks a word from the dictionary, and their opponent attempts to guess it using Wordle-style clues. The faster you guess correctly, the more you win.

## Setup

- Both players pick a word for their opponent to guess
- Words must be from the dictionary
- Each player has up to 5 guesses to find their opponent's word

## Gameplay

### Word Selection

1. Each player secretly picks a word from the dictionary
2. The word must be a valid dictionary word
3. Both players select their words simultaneously

### Guessing Phase

1. **Make Your Guess**: Enter a five-letter word as your guess
2. **Receive Clue**: After each guess, you receive a Wordle-style clue showing:
   - **🟩 Green**: Letter is correct and in the right position
   - **🟧 Orange/Yellow**: Letter is correct but in the wrong position
   - **⬛ Gray/Black**: Letter is not in the word
3. **Continue Guessing**: Use the clues to make your next guess
4. **Maximum Guesses**: You have up to 5 guesses to find the word

### Example Clue

```
⬛⬛⬛⬛🟧RATES
🟧⬛🟧⬛⬛SPOIL
⬛🟩⬛🟩🟩MOUSY
🟩🟩🟩🟩🟩BOSSY
```

In this example:

- First guess "RATES" had one letter (S) in the word but wrong position
- Second guess "SPOIL" had two letters (S and L) in wrong positions
- Third guess "MOUSY" had three letters correct (O, U, Y) with two in right positions
- Fourth guess "BOSSY" was correct

## Scoring and Rewards

The amount you win depends on how many guesses it takes you to find the word:

- **1st or 2nd guess**: 100% of the amount posted
- **3rd guess**: 20% of the amount posted
- **4th guess**: 5% of the amount posted
- **5th guess**: 1% of the amount posted
- **6th guess or more**: Nothing (0%)

The amount shown at the start is what you'll receive if you guess correctly on the first or second try.

## Game Flow

1. **Pick Word**: Choose a word for your opponent to guess (must be from dictionary)
2. **Make Guesses**: Make up to 5 guesses of your opponent's word:
   - First guess
   - Wait for opponent to pick their word (may be skipped)
   - Second guess (or go to finish)
   - Third guess (or go to finish)
   - Fourth guess (or go to finish)
   - Fifth guess (or go to finish)
3. **Finish**: Shows results of your guessing. Wait for opponent to finish guessing
4. **Results Shown**: Results displayed with options to start a new hand or end the session
5. **Next Hand**: Wait for opponent to start next hand (may be skipped if opponent has already started)
6. **End Session**: Session may end due to:
   - Playing on-chain
   - Insufficient balance (yours or opponent's)
   - You or opponent declined to continue
