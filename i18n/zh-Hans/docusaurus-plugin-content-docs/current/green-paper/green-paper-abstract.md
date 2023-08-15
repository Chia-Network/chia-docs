---
title: Abstract - Chia Green Paper
sidebar_label: Abstract
slug: /green-paper-abstract
---

# Green Paper

## Abstract

This document outlines the rationale and main design ideas behind the consensus layer of $\textrm{{\sf Chia}}$, a longest-chain blockchain akin to Bitcoin. It achieves comparable security guarantees as Bitcoin's Proof of Work (PoW) based Nakamoto consensus, while using Proofs of Space in combination with Verifiable Delay Functions (VDFs) to achieve Sybil resistance. This makes $\textrm{{\sf Chia}}$ much more [sustainable](https://chiapower.org/) and also more [decentralized](https://xch.farm/decentralization/) than a PoW based blockchain could be.

We outline the challenges one must solve when replacing proofs of work with an efficient proof system like proofs of space, and how they are addressed in $\textrm{{\sf Chia}}$. Here _efficient_ means that once the resource (like space or stake) is available, computing many proofs is basically as cheap as computing one.

This document is not a formal specification of $\textrm{{\sf Chia}}$. Instead, it aims at readers who want to understand the design choices of $\textrm{{\sf Chia's}}$ consensus, and are interested in permissionless longest-chain blockchains from efficient proof systems in general.

---

### Precursor Consensus Green Paper

In order to provide historical context, the Green Paper's previous version that discusses a precursor consensus which was never implemented is available here for viewing: [Precursor Green Paper](/files/Precursor-ChiaGreenPaper.pdf).
