---
title: Abstract - Chia Green Paper
sidebar_label: Abstract
slug: /abstract
---

# Abstract

This document outlines the rationale and main design ideas behind the consensus layer of Chia, a longest-chain blockchain akin to Bitcoin. It achieves comparable security guarantees as Bitcoin's proof of work based Nakamoto consensus, while using proofs of space in combination with verifiable delay functions to achieve Sybil resistance. This makes Chia much more sustainable and also more decentralised than a PoW based blockchain could be.

We outline the challenges one must solve when replacing proofs of work with an efficient proof system like proofs of space, and how they are addressed in Chia. Here "efficient" means that once the resource (like space or stake) is available, computing many proofs is basically as cheap as computing one.

This document is not a formal specification of Chia, but aims at readers who want to understand the design choices of Chia consensus, and are interested in permissionless longest-chain blockchains from efficient proof systems in general.