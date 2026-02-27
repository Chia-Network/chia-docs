---
title: Generator Identity Analysis
slug: /chia-blockchain/resources/generator-identity/analysis
---

This document has been abridged. The original, complete version can be found on [GitHub](https://github.com/richardkiss/generator-identity-hf-analysis).

# Generator Identity Hard Fork: Analysis

This is an analysis of the Generator Identity Hard Fork, which transitions generator identity and cost calculation from serialization-based to content-addressable methods.

## Overview

The Generator Identity Hard Fork makes two fundamental changes:

| Aspect         | Before                     | After                    |
| -------------- | -------------------------- | ------------------------ |
| **Identity**   | `SHA256(serialized_bytes)` | `SHA256_tree_hash(tree)` |
| **Cost basis** | Serialized length          | Interned tree structure  |

This decouples consensus from serialization format, enabling future compression improvements without hard forks.

## Documentation

| Document                                                                                             | Description                                                                                       |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **[Technical Specification](/chia-blockchain/resources/generator-identity/technical-specification)** | Complete design: problem statement, cost formula derivation, DoS analysis, implementation details |
| **[Gist](/chia-blockchain/resources/generator-identity/github-gist)**                                | GitHub Gist describing the proposal                                                               |
| [GitHub repository](https://github.com/richardkiss/generator-identity-hf-analysis)                   | Contains the complete analysis and implementation                                                 |

## Implementation PRs

| PR     | Repository                                         | Branch                  | Description                            |
| ------ | -------------------------------------------------- | ----------------------- | -------------------------------------- |
| **#1** | [clvm_rs](https://github.com/Chia-Network/clvm_rs) | `generator-identity-hf` | Core interning infrastructure          |
| **#2** | [chia_rs](https://github.com/Chia-Network/chia_rs) | `generator-identity-hf` | Chia-specific cost calculation         |
| **#3** | [clvm_rs](https://github.com/Chia-Network/clvm_rs) | `serde_2026`            | New serialization format (future work) |

PR #2 depends on PR #1. PR #3 is independent.
