---
title: Generator Identity Technical Specification
slug: /chia-blockchain/resources/generator-identity/technical-specification
---

The original copy of this document can be found on [GitHub](https://github.com/richardkiss/generator-identity-hf-analysis/blob/main/docs/GENERATOR_IDENTITY_HARDFORK.md).

# Generator Identity and Cost Hard Fork: Complete Summary

This document provides a comprehensive overview of the hard fork that transitions generator identity and cost calculation from serialization-based to content-addressable (tree-structure-based) methods.

## Executive Summary

This hard fork makes two fundamental changes to how generators are identified and charged:

1. **Identity**: Generator identity changes from `SHA256(serialized_bytes)` to `SHA256_tree_hash(generator)` (content-addressable)
2. **Cost**: Generator cost changes from `len(serialized_bytes) × 12000` to a blended formula based on interned tree structure

Both changes serve the same goal: **make consensus depend on the logical content of the generator, not its serialization format**. This decouples consensus from serialization, enabling future compression improvements without hard forks.

---

## The Problem: Serialization-Coupled Consensus

### Current State

Today, generator identity and cost are both tied to serialization:

```
identity = SHA256(serialized_bytes)
cost = len(serialized_bytes) × COST_PER_BYTE (12000)
```

This creates several problems:

1. **Format lock-in**: Any change to serialization format changes the generator's identity, breaking consensus compatibility.
2. **Compression penalties**: Better compression → smaller bytes → different hash. A more efficient representation of the _same logical tree_ would have a different identity.
3. **Cost inconsistency**: The same logical tree serialized differently would have different costs, even though the actual work to process it is identical.

### The Solution: Content-Addressable Identity

After the hard fork:

```
identity = SHA256_tree_hash(generator)  // Content-addressable
cost = f(interned_tree_structure)       // Structure-based
```

**Key insight**: Two generators with the same tree hash contain the same logical content. They should have the same identity and cost, regardless of how they were serialized.

This means:

- Classic serialization (no compression)
- Backref serialization (some sharing)
- 2026 serialization (full interning)
- Future formats we haven't invented yet

...can all represent the same generator with the **same identity and same cost**.

---

## Interning: The Canonical Representation

To ensure `same content = same cost`, we must **intern** the generator before computing cost:

```
Any serialization → deserialize → intern → canonical tree → deterministic cost
```

### What is Interning?

**Interning** deduplicates a CLVM tree based on structural equality, an equivalence relation defined recursively:

- **Atoms** are equal if their byte contents are identical
- **Pairs** are equal if their left children are equal AND their right children are equal (recursively)

After interning, each equivalence class is represented by exactly one node. The cost formula counts each unique atom and pair once because:

- **Memory/storage cost**: After interning, each unique node is stored only once in memory, regardless of how many times it appeared in the original serialization.
- **SHA256 CPU cost**: When computing the tree hash with caching, each unique node is hashed only once, regardless of how many times it appears in the tree structure.

This makes the cost deterministic and independent of serialization format or how many times a subtree appears in the original tree.

### Relationship to Tree Hash

Structural equality implies tree hash equality (by definition of SHA256 tree hash). The reverse is not mathematically guaranteed, but holds in practice—a counterexample would require a SHA256 collision.

### Block Validation Requirement

**Critical**: Validation must start from the **interned** generator. Consensus enforces limits on atoms and pairs created; different serializations of the same logical generator could otherwise evade those limits. Using the canonical interned tree guarantees the atom/pair limits and cost calculation are applied to the same logical content for every validator.

---

## The New Cost Formula

### Why Not Just Use Serialized Size?

With content-addressable identity, we can't use serialized size for cost because:

1. Different serializations of the same tree would have different costs
2. We want `same tree hash = same cost`

We need a cost formula based on the **interned tree structure**.

### The Blended Formula

```
size_component = B×atom_bytes + A×atom_count + P×pair_count
sha_component  = S×sha_blocks + I×sha_invocations

total_cost = size_component × SIZE_COST_PER_BYTE
           + sha_component × SHA_COST_PER_UNIT
```

**Constants:**

| Constant           | Value | Purpose                     |
| ------------------ | ----- | --------------------------- |
| B                  | 1     | Per byte of atom data       |
| A                  | 2     | Per-atom overhead           |
| P                  | 2     | Per-pair overhead           |
| S                  | 1     | Per SHA256 block (64 bytes) |
| I                  | 8     | Per SHA256 invocation       |
| SIZE_COST_PER_BYTE | 6000  | Size component multiplier   |
| SHA_COST_PER_UNIT  | 4500  | SHA component multiplier    |

### Why Two Components?

The formula protects against **two distinct DoS vectors**:

**1. Memory/Storage DoS**

- Attack: Create structures expensive to store but cheap to hash
- Protection: Size component charges for structural overhead

**2. CPU/Hashing DoS**

- Attack: Create structures with many small nodes (cheap in bytes, expensive to hash)
- Protection: SHA component charges for hashing work

By splitting ~50/50, neither attack vector can exploit the other's blind spot.

### Why SHA Invocation Cost Matters

SHA256 has significant per-invocation overhead beyond the per-block mixing cost:

| Hardware   | Per Block | Per Invocation | Ratio |
| ---------- | --------- | -------------- | ----- |
| Apple M4   | 19 ns     | 151 ns         | 7.9×  |
| Intel 2012 | 520 ns    | 3,465 ns       | 6.7×  |

A tree with 1000 tiny atoms incurs 1000 invocations regardless of total bytes. Without the `I=8` coefficient, such structures would be severely undercharged.

**Note**: The I=8 ratio is based on hardware-accelerated SHA256 (SHA-NI on x86, crypto extensions on ARM). Software SHA256 has a much lower I/S ratio (~0.07), but we use I=8 to:

1. Future-proof for when hardware acceleration is enabled
2. Protect against cross-platform DoS attacks
3. Maintain consistency across different hardware

---

## DoS Analysis and Validation

### Adversarial Structures Tested

| Structure           | Description            | DoS Vector            |
| ------------------- | ---------------------- | --------------------- |
| `million_nil_atoms` | Many zero-byte atoms   | High invocation count |
| `deep_nesting`      | Deeply nested pairs    | High pair count       |
| `single_huge_atom`  | One ~100KB atom        | Large data payload    |
| `many_small_pairs`  | Many independent pairs | High pair count       |
| `hash_sized_atoms`  | Many 32-byte atoms     | Typical puzzle data   |

### Results: New vs Old Cost

```
Ratio > 1.0 means new formula charges MORE (safer)
Ratio < 1.0 means new formula charges LESS

  ⚠ single_huge_atom: 0.51x  (large data - NOT a DoS vector)
  ⚠ hash_sized_atoms: 0.70x  (typical data - NOT a DoS vector)
  ✓ balanced_tree:    1.93x
  ✓ million_tiny_atoms: 2.17x
  ✓ many_small_pairs: 2.25x
  ✓ deep_nesting:     2.37x
  ✓ million_nil_atoms: 2.37x
```

**Key finding**: All adversarial structures (many small nodes, deep nesting) cost **2x+ more** than before. The structures that cost less are large-data payloads, which have the _lowest_ work-per-cost ratio and are not DoS vectors.

### Cross-Hardware Validation

| Hardware                   | Per Block | Per Invocation | I/S Ratio |
| -------------------------- | --------- | -------------- | --------- |
| **Apple M4** (2024)        | 19 ns     | 151 ns         | 7.9×      |
| **Intel 2012** (no SHA-NI) | 520 ns    | 3,465 ns       | 6.7×      |

The I/S ratio is consistent (6.7-7.9×) across hardware. Using `I=8` is conservative on all tested platforms.

### Worst-Case Validation Times

For maximum-cost adversarial generators:

| Hardware                     | Size-Only Formula | Blended Formula | Protection |
| ---------------------------- | ----------------- | --------------- | ---------- |
| **Apple M4**                 | 174 ms            | 37 ms           | 4.7×       |
| **Raspberry Pi 5** (est.)    | ~700 ms           | ~150 ms         | 4.7×       |
| **Intel 2012** (unsupported) | 4.1 sec           | 870 ms          | 4.7×       |

**Conclusion**:

- Supported hardware: less than 200 ms worst case ✅
- Unsupported legacy: less than 1 sec best-effort ✅
- Consistent 4.7× protection improvement ✅

---

## Implications: Maximum Block Size

### Large Atoms Cost Less Than Before

A consequence of the blended formula is that **large single atoms cost less** than under the old formula:

| Formula | Cost for N-byte atom                       | Max atom at 11B limit |
| ------- | ------------------------------------------ | --------------------- |
| **Old** | `N × 12000`                                | ~895 KB               |
| **New** | `(N+2) × 6000 + (N/64+9) × 4500` ≈ `6070N` | **~1.81 MB**          |

The new formula allows single atoms **~2× larger** for the same cost because:

1. `SIZE_COST_PER_BYTE = 6000` (half of old 12000)
2. SHA overhead for large atoms is minimal (one invocation, blocks proportional to size)

### Why This Happens

Large atoms are the _safest_ structure from a DoS perspective - they have the lowest work-per-cost ratio. The old formula was effectively _overcharging_ for large data payloads.

The blended formula shifts cost toward structures with high node counts (where SHA invocation overhead matters), not raw byte volume.

### Potential Concern: Blockchain Storage Abuse

⚠️ **The new formula allows larger atoms for the same cost.**

A farmer could create a spend with a large atom in a "garbage" solution containing incompressible data:

- Old formula: ~895 KB max per block at cost limit
- New formula: ~1.81 MB max per block at cost limit

This roughly **doubles the potential storage per block** for someone willing to burn the cost.

**Note**: This is discussed as an open question in [Question 3: Balancing Storage vs. SHA Costs](#question-3-balancing-storage-vs-sha-costs) below.

---

## Formula Derivation and Validation

### SHA256 Timing Benchmark

**Tool**: `benchmark-sha` (installed as entry point)

1. Hash blobs of varying sizes (1 byte to 64KB)
2. Test around SHA256 block boundaries (55/56, 119/120 bytes)
3. Fit linear model: `time = ns_per_block × blocks + ns_per_invocation`
4. Extract I/S ratio

**Result**: I/S ≈ 8 (invocation overhead is 8× block cost)

### Cost Coefficient Fitting

**Tools**: Analysis scripts in this repository (see [ANALYSIS_WORKFLOW.md](ANALYSIS_WORKFLOW.md) for details)

**Data**:

- 509 real mainnet generators (mix of random blocks + largest blocks)
- Synthetic generators built from real mainnet spends (excluding NFT JPEGs)

**Goal**: Find multipliers such that:

- Total cost ≈ old cost for typical generators (backward compatible)
- ~50% from size component, ~50% from SHA component

**Results**:

| Generator      | Blended Cost | Old Cost | Ratio | Split |
| -------------- | ------------ | -------- | ----- | ----- |
| synthetic_1M   | 2,821M       | 2,936M   | 96%   | 45/55 |
| synthetic_500K | 1,592M       | 1,503M   | 106%  | 44/56 |

**Coefficient Selection**:

After testing various combinations, the final coefficients are:

- B = 1 (per atom byte)
- A = 2 (per atom, includes ~1 byte length prefix + overhead)
- P = 2 (per pair)

These values were validated against:

- 509 real mainnet generators (avg ratio = 0.99, range 0.61-1.13)
- Synthetic spend-heavy generators (ratio = 0.86-1.02)

The formula naturally rewards efficient (high-sharing) structures while maintaining backward compatibility for typical generators.

---

## Implementation Overview

### Code Structure

This work is split across three PRs:

| PR                | Repository                                         | Branch                  | Contents                                                                  |
| ----------------- | -------------------------------------------------- | ----------------------- | ------------------------------------------------------------------------- |
| **#1 Interning**  | [clvm_rs](https://github.com/Chia-Network/clvm_rs) | `generator-identity-hf` | `intern()`, `InternedTree`, `InternedStats` — generic tree deduplication  |
| **#2 Cost**       | [chia_rs](https://github.com/Chia-Network/chia_rs) | `generator-identity-hf` | `size_cost()`, `sha_cost()`, `total_cost()` — Chia-specific cost formulas |
| **#3 serde_2026** | [clvm_rs](https://github.com/Chia-Network/clvm_rs) | `serde_2026`            | New serialization format leveraging interning (future work)               |

**Dependency order**: PR #2 depends on #1 being merged and released first. PR #3 is independent but uses the same interning infrastructure.

### Key Implementation Details

**In clvm_rs (PR #1):**

- `src/serde/intern.rs`: Core interning algorithm (single-pass post-order traversal)
- Returns `InternedTree` with canonical node structure and `InternedStats` for cost calculation
- Generic infrastructure usable by any consumer (not Chia-specific)

**In chia_rs (PR #2):**

- `crates/chia-consensus/src/generator_cost.rs`: Cost calculation functions using `InternedStats`
- `crates/chia-consensus/src/run_block_generator.rs`: Updated to use `run_block_generator3()` when `INTERNED_GENERATOR` flag is set
- `crates/chia-consensus/src/flags.rs`: New `INTERNED_GENERATOR` flag enabled after `hard_fork2_height`

**In clvm_rs (PR #3):**

- `src/serde_2026/`: New serialization format with varint encoding
- Leverages interning infrastructure for optimal compression
- Independent from consensus changes (future work)

**Critical**: When the `INTERNED_GENERATOR` flag is set, validation must:

1. Intern the generator to get canonical tree
2. Calculate cost from interned stats
3. Run the generator using the interned allocator (ensures atom/pair limits apply to canonical structure)

---

## Farmer Changes

Farmers need to update their block creation code to use the new generator identity and cost calculation after the hard fork.

### Key Changes

1. **Generator Identity**: After fork height, `generator_root` in `TransactionsInfo` must be the tree hash (not `SHA256(serialized_bytes)`)
2. **Cost Calculation**: Cost is automatically computed by Rust code using the new formula when the flag is set
3. **Tree Hash**: The tree hash must be computed from the interned generator and passed through the Python stack

### Files Modified

| File                                  | Change                                          |
| ------------------------------------- | ----------------------------------------------- |
| `chia_rs/.../run_block_generator.rs`  | Height check for cost formula, return tree_hash |
| `chia/full_node/mempool.py`           | Pass `tree_hash` to `NewBlockGenerator`         |
| `chia/types/generator_types.py`       | Add `tree_hash` field                           |
| `chia/consensus/block_creation.py`    | Use `tree_hash` as `generator_root` after fork  |
| `chia/consensus/default_constants.py` | Add `HARD_FORK_TREE_GENERATOR_HEIGHT`           |

The cost is already computed in Rust by `run_block_generator2()`/`run_block_generator3()`. The Python side just uses `conds.cost`. If Rust changes the cost formula based on height → Python automatically uses the new cost.

---

## Performance Considerations

### SHA256 Performance

The cost formula assumes hardware-accelerated SHA256 (SHA-NI on x86, crypto extensions on ARM). Current Rust consensus code may use software SHA256, but:

1. **Future-proofing**: Once `chia-sha2` is fixed to use proper OpenSSL EVP API, hardware acceleration will be enabled
2. **Cross-platform**: Most validators run on hardware with SHA256 acceleration
3. **DoS protection**: Using I=8 protects against attacks even if some nodes use software SHA256

**Note**: There is a known issue where `chia-sha2`'s OpenSSL feature uses the wrong API (`openssl::sha::Sha256` instead of `openssl::hash::Hasher`), preventing hardware acceleration. A PR is needed to fix this.

### TreeCache Optimization

When validating a block, we need to:

1. Compute the generator's tree hash (for identity/commitment)
2. Run the generator to get a list of spends
3. For each spend, compute the puzzle's tree hash

**Insight**: All puzzles are subtrees of the generator. If we build a `TreeCache` while computing the generator hash, puzzle hashes become cache lookups:

```rust
// Step 1: Hash generator, building cache
let mut cache = TreeCache::default();
let generator_hash = tree_hash_cached(a, generator, &mut cache);

// Step 2: Run generator to get spends
let spends = run_generator(a, generator, ...);

// Step 3: Puzzle hashes are fast (cache hits!)
for spend in spends {
    let puzzle_hash = tree_hash_cached(a, puzzle, &mut cache);  // O(1) lookup
    ...
}
```

This means:

- Total SHA256 work = O(unique nodes in generator)
- Puzzle hash computation = O(1) per puzzle (cache lookup)
- No redundant hashing even with many spends sharing puzzles

---

## Open Questions for Review

The following design questions need reviewer input before finalizing the cost model:

> **Note**: For a more radical alternative approach, see [Generator as Witness Proposal](GENERATOR_AS_WITNESS_PROPOSAL.md), which proposes not committing to the generator at all (treating it as pure witness). This is presented for discussion but is not part of the current implementation plan.

### Question 1: Unifying SHA256 Tree Hash Cost Models

**Context**: There are two places where SHA256 tree hashing occurs with different cost models:

1. **The new `sha256tree` CLVM instruction**: When called from within a CLVM program, this instruction computes tree hashes on-demand. Each call may hash different subtrees, and there's no caching between calls.

2. **Generator tree hash computation**: When validating a block, we compute the generator's tree hash using an interned, cached approach. The `TreeCache` ensures each unique node is only hashed once, and puzzle hashes benefit from cache hits.

**Question**: Should we try to unify (or at least make more similar) the cost model for these two cases?

**Considerations**:

- The generator version benefits from interning and caching, making it more efficient per unique node
- The CLVM instruction version has no caching and may hash the same subtree multiple times
- Different cost models could lead to inconsistencies or confusion
- However, the different characteristics (caching vs. no caching) may justify different cost models

**Options**:

- **A**: Use the same cost model for both (charge based on unique nodes hashed)
- **B**: Use different cost models reflecting their different characteristics
- **C**: Make them similar but account for caching benefits in the generator case

### Question 2: Should We Charge for Generator Tree Hash at All?

**Context**: The current cost formula includes a SHA component that charges for tree hashing the generator:

```
sha_component = S × sha_blocks + I × sha_invocations
```

This accounts for the work of computing `SHA256_tree_hash(generator)` for identity/commitment.

**Question**: Should we charge for `sha256tree` of the generator at all, or could we remove this component entirely?

**Considerations**:

- **Pro-removal**:
  - Tree hashing the generator may not be a DoS vector (it's a one-time computation per block)
  - Removing it would simplify the cost formula significantly
  - The size component already protects against memory/storage DoS
  - Generator tree hash computation is relatively fast (especially with caching)
- **Pro-keeping**:
  - Ensures cost reflects all work done (including identity computation)
  - Protects against potential edge cases where tree hashing could be expensive
  - Maintains symmetry with the SHA component's purpose (CPU/hashing DoS protection)
  - The SHA component is already validated and working well

**Options**:

- **A**: Remove SHA component entirely, use only size component: `cost = size_component × SIZE_COST_PER_BYTE`
- **B**: Keep SHA component as-is (current proposal)
- **C**: Keep SHA component but reduce its weight (e.g., lower `SHA_COST_PER_UNIT`)

**Impact Analysis Needed**:

- If we remove the SHA component, we should verify:
  - No new DoS vectors are introduced
  - Cost still correlates well with actual work
  - Backward compatibility is maintained (typical generators still cost ~96-106% of old)

### Question 3: Balancing Storage vs. SHA Costs

**Context**: The current blended formula (50/50 split between size and SHA components) allows larger single atoms compared to the old formula:

- Old formula: ~895 KB max atom at 11B cost limit
- New formula: ~1.81 MB max atom at 11B cost limit

This roughly doubles the potential on-chain storage per block for someone willing to burn the cost.

**Question**: Should we adjust the balance between storage cost and SHA cost to prevent this increase in potential storage abuse?

**Options**:

#### Option A: Keep Current Blended Formula (50/50 Split)

**Pros:**

- **Simplicity**: Maintains the balanced 50/50 split between size and SHA components
- **No increased storage abuse**: Does not make storage abuse worse than the current situation
- **DoS protection**: Maintains strong protection against CPU-bound attacks (4.7× improvement)
- **Validated**: Formula has been tested and validated against real generators

**Cons:**

- **Larger atoms allowed**: Permits ~2× larger single atoms compared to old formula
- **Storage economics**: Makes on-chain storage slightly cheaper for incompressible data

#### Option B: Increase Storage Cost, Reduce SHA Cost

Increase `SIZE_COST_PER_BYTE` and reduce (possibly to zero) `SHA_COST_PER_UNIT`:

**Pros:**

- **Prevents storage abuse**: Maintains or reduces maximum atom size at cost limit
- **Still protects against DoS**: If SHA cost is non-zero, maintains protection against CPU-bound attacks
- **Flexible**: Can tune the balance between storage and SHA costs

**Cons:**

- **Complexity**: Requires re-tuning multipliers and re-validation against real generators
- **Potential DoS risk**: If SHA cost goes to zero, loses protection against CPU-bound attacks with many small nodes
- **Less balanced**: Moves away from the validated 50/50 split that matches actual work distribution

**Considerations**:

- **DoS protection priority**: The old formula left CPU-bound attacks undercharged by 4.7×. Fixing that was more important than preventing storage abuse.
- **Storage abuse is self-limiting**: Attackers must pay full cost (in fees) for the space. Unlike DoS attacks, storage abuse doesn't let you do more work than you pay for.
- **Compression still helps**: Real generators with structure (not random data) still benefit from sharing. Only incompressible garbage blobs get "cheaper."
- **Future flexibility**: If storage abuse becomes a problem, Option B can be implemented in a future fork by adjusting the multipliers without changing the formula structure.

**Current proposal**: Option A (blended formula) prioritizes DoS protection and simplicity. DoS attacks are a consensus/security issue, while storage abuse is primarily an economics issue that can be addressed later if needed.

---

## Summary

### What's Changing

| Aspect                 | Before                     | After                        |
| ---------------------- | -------------------------- | ---------------------------- |
| **Identity**           | `SHA256(serialized_bytes)` | `SHA256_tree_hash(tree)`     |
| **Cost basis**         | Serialized length          | Interned tree structure      |
| **Consensus coupling** | Tied to serialization      | Independent of serialization |

### Why It's Safe

1. ✅ All adversarial structures cost 2x+ more than before
2. ✅ Typical generators cost 96-106% of old (backward compatible)
3. ✅ Maximum work/cost ratio is bounded across hardware
4. ✅ SHA invocation overhead properly captured (I=8)
5. ✅ Formula validated on both fast (M4) and slow (2012 Intel) hardware

### Why It's Better

1. **Content-addressable identity**: Same logical tree = same identity
2. **Serialization independence**: Future compression doesn't break consensus
3. **DoS protection**: 4.7× better protection against CPU-bound attacks
4. **Cleaner semantics**: Cost reflects actual work, not encoding artifact

---

## Tools and Analysis

**Analysis Repository**: [generator-identity-hf-analysis](https://github.com/richardkiss/generator-identity-hf-analysis)

This repository contains all the tools, scripts, and data used to derive and validate the cost formula parameters:

- **Python Analysis Scripts** (installed as entry points):
  - `analyze-generators` - Analyze real generators from mainnet
  - `benchmark-sha` - SHA256 performance benchmarking
  - `dos-test` - Adversarial structure testing
  - `sweep-coefficients` - Coefficient optimization

- **Rust Analysis Tools**:
  - `tools/dos-test` - Detailed DoS analysis with timing
  - `tools/serialization-dos-bench` - Serialization format comparison

- **Documentation**:
  - `docs/GENERATOR_IDENTITY_HARDFORK.md` - Complete technical specification (this document)
  - `docs/ANALYSIS_WORKFLOW.md` - Step-by-step analysis workflow

### Benchmark Commands

These commands should be run from the **[generator-identity-hf-analysis](https://github.com/richardkiss/generator-identity-hf-analysis)** repository:

```bash
# SHA256 timing benchmark
benchmark-sha

# DoS test with adversarial structures
dos-test -v

# Analyze synthetic generators
analyze-generators data/synthetic_1M.bin --verbose

# Batch analysis of generator directory
analyze-generators ./data/generators --batch --csv results.csv

# Coefficient sweep
sweep-coefficients ./data/generators/
```

For Rust-based analysis tools:

```bash
# Detailed DoS analysis with timing
cargo run --release --bin dos-test

# Serialization benchmark and comparison
cargo run --release --bin serialization-dos-bench -- data/synthetic_1M.bin --stats
```

---

## References

- **Analysis Repository**: [generator-identity-hf-analysis](https://github.com/richardkiss/generator-identity-hf-analysis) - Tools and data for cost formula derivation
- **Implementation PRs**:
  - PR #1 (clvm_rs): [Interning Infrastructure](https://github.com/Chia-Network/clvm_rs/pull/TBD)
  - PR #2 (chia_rs): [Cost Calculation](https://github.com/Chia-Network/chia_rs/pull/TBD)
  - PR #3 (clvm_rs): [serde_2026 Format](https://github.com/Chia-Network/clvm_rs/pull/TBD) (future work)
