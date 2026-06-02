---
slug: /guides/gaming-space-poker-rules
title: Space Poker Rules
---

:::warning Early Alpha Release

Space Poker is included in Alpha 2 as an early release. On-chain Chialisp, rules, and UI may change before general availability. The rules below match the current implementation in the [chia-gaming](https://github.com/Chia-Network/chia-gaming) repository (`clsp/games/spacepoker/`).

:::

## Objective

Space Poker is a **two-player, suitless Hold'em-style** game on a **single shared board**. Each player gets two hole cards; five community cards are dealt (flop, turn, river). Players bet over four streets, then the best five-card hand wins the pot. Each player also has a **boost** flag (+ or −) that can break ties within the same hand class.

There is **one hand per game** in the channel—not two parallel boards.

## Setup

### Stakes

When starting Space Poker in the player app, you set:

- **Unit size** — mojos per betting unit (`bet_unit` on-chain).
- **Stack size** — number of units each player brings (default **10** in the UI).

Total locked stake for the hand is `2 × unit size × stack size` mojos (`AMOUNT` in the on-chain validators). The minimum increment used in the protocol is **`bet_unit = total per-player stake ÷ 10`**. The UI slider raises in whole units; the chain accepts any valid non-negative raise in mojos up to each player's remaining stack.

### Cards and boost

- Hole cards and community cards are ranks **2–A** only (T=10, J=11, Q=12, K=13, A=14). **There are no suits.**
- Each player receives **two hole cards**, drawn deterministically from commit entropy (see `derive_all_cards` in chia-gaming).
- Each player gets **one boost** for the hand: **+** with probability **⅓**, otherwise **−** (derived from hashed commit material, not from individual cards).
- Community cards are **shared**: flop (3), then turn (1), then river (1), revealed in that order as streets complete.

### Opening the hand

1. Both players post hash-chain commits (`commitA`, `commitB`).
2. **`commitB` posts the first unit** into the pot (`half_pot` starts at one `bet_unit`).
3. Betting begins at **pre-flop** (`N = 4` in the validator state).

## Hand Rankings

From lowest to highest:

1. **High Card**: No pair or better
2. **Pair**: Two cards of the same rank
3. **Two Pair**: Two different pairs
4. **Set (Three of a Kind)**: Three cards of the same rank
5. **Full House**: Three of a kind plus a pair
6. **Straight**: Five consecutive ranks (high card of the straight breaks ties within the class)
7. **Four of a Kind**: Four cards of the same rank
8. **Five of a Kind**: Five cards of the same rank

**Important differences from traditional poker:**

- **No flushes** — ranks only; suits do not exist.
- **Five of a kind** is the highest hand.
- **No ace-low wheel** — A-2-3-4-5 is **not** a straight (only five consecutive ranks where the top card is exactly four above the bottom, e.g. 6-7-8-9-10).
- **Straight beats full house** — in this suitless deck, straights are rarer than full houses (see `space_hand_eval.clinc`).

## Tiebreakers

Hands are compared as structured values `(hand counts… boost rank kickers…)` using lexicographic ordering (`deep_compare` in Chialisp):

1. **Hand class** — e.g. full house beats set; straight beats full house.
2. **Boost** — with the **same** class, **+** beats **−** (boost does **not** upgrade you to a higher class—a boosted set still loses to an unboosted full house).
3. **Kickers** — remaining rank fields in the hand tuple, highest first.

At showdown each side automatically selects the **best five cards** from their seven (two hole + five board) via `space_hand_calc`; players do not manually pick cards in normal play.

## Gameplay

### Streets

Four betting rounds map to standard street names:

| Validator `N` | Street   | Board state                         |
| ------------- | -------- | ----------------------------------- |
| 4             | Pre-flop | Hole cards only                     |
| 3             | Flop     | Three community cards               |
| 2             | Turn     | Fourth community card               |
| 1             | River    | Fifth community card; then showdown |

### Pre-flop coin toss

On the first street only (`N = 4`), a **coin toss** (from compared hash-chain images) decides who **opens** betting:

- **Opener** — sends an **open** move: optional raise amount (0 = **check**).
- **Non-opener** — may **pong** (defer opening; roles swap, toss flips) once, then the other player opens.

This is enforced on-chain in `begin_round.clsp` so the opener cannot ignore an unfavorable toss by checking.

### Turn Structure

Players **alternate** on each street. The **opener** acts first with **check** or **raise**; the other player responds with **call** or **raise** in `mid_round`. A **call** ends the street (or goes to showdown on the river). See **Pre-flop coin toss** above when `N = 4`.

### Actions per street

| Phase         | Your turn options (UI) | On-chain meaning                              |
| ------------- | ---------------------- | --------------------------------------------- |
| `begin_round` | **Check** or **Raise** | Open with 0 or more mojos added to `half_pot` |
| `mid_round`   | **Call** or **Raise**  | Match the current raise, or raise again       |
| `end`         | (automatic reveal)     | Best-five selection and payout                |

- **Check** — only when you are the opener on a street (`begin_round`).
- **Call** — matches the last raise and ends the street (or proceeds to showdown on the river).
- **Raise** — increases the wager; opponent must call or re-raise in `mid_round`.
- **Fold** (UI only) — ends the hand in the client via **timeout** (`acceptTimeout`); this is **not** a separate validated poker fold opcode. Use only when you intend to forfeit the hand outside normal call/raise flow.

After a call on streets 4–2, the next street deals the next community card(s). After a call on the river (`N = 1`), play moves to **showdown**.

### Showdown

- Both players' best five-card hands are computed from seven cards (hole + board).
- The mover reveals with a preimage and five-card **bitfield**; the waiter must match with their own best five (`end.clsp`).
- The UI shows win/loss/split, pot result, evaluated hand names, and hole cards when the protocol exposes them in readables (`"call"` on the river or `"end"`).
- There is no “must show only if you lose” rule in the validators—display follows what the handlers emit.

### All-In

Stack limits are enforced by validator state: total committed chips per player cannot exceed half of `AMOUNT`. When a player cannot raise further, they call or check with what remains; there is no separate “all-in” opcode—the UI tracks **stack** and **pot** from `half_pot` and raise amounts.

## Game Flow

1. **Proposal** — Agree on unit size and stack size; both fund the game coin.
2. **Commits** — Hash-chain commits; hole cards and boost are fixed from entropy.
3. **Pre-flop** — Coin toss (if needed), then check/raise and call/raise until the street closes.
4. **Flop → Turn → River** — Each street: opener check/raises, opponent calls or raises, then the next board cards appear.
5. **Showdown** — River call or final reveal; pot split by hand comparison.
6. **Next hand or session end** — Start another hand from the lobby if balances allow, or shut down the channel (clean shutdown returns funds in Alpha 2 builds).

## Session end

A session may end because:

- Players finish and choose not to continue
- Insufficient balance for the next stake
- Clean shutdown or channel close on-chain
- A player uses **Fold** / timeout in the UI to abandon the current hand

For installation, WalletConnect, and testing steps, see the [Users Guide](/guides/gaming-users-guide) and [Developers Guide](/guides/gaming-developers-guide).
