Title: Rename clvm_tools links to chialisp in FAQ and tutorials

## What changed

- `clvm_tools` links and wording become `Chia-Network/chialisp` in the FAQ, coin-spend-rpc and custom-puzzle-lock docs (the branch's existing commit, kept). I relied on the earlier answer that the rename still applies.
- Restored the FAQ repo table's separator row in `docs/chia-blockchain/resources/faq.md` to the `| --- | --- |` style that prettier expects.
- Added explicit heading ids so the old anchors keep working:
  - `docs/guides/tutorials/custom-puzzle-lock.md`: `{#using-clvm_tools-official}`, `{#using-clvm_tools}` and `{#using-chialisp}` (the last on the later `### Using Chialisp` heading, so it keeps its id instead of becoming `using-chialisp-1`).
  - `docs/guides/tutorials/coin-spend-rpc.md`: `{#serialization-using-clvm_tools}`.
- No other `docs/` links used the old anchors, and no `clvm_tools` links remain under `docs/`. The remaining `clvm-tools-rs` mentions are pip package names in the custody tool guide, so they stay.
- Reverted the zh-Hans copies of the FAQ, coin-spend-rpc and custom-puzzle-lock to the versions on main so Crowdin can resolve them. This also clears the broken-anchor and prettier failures in those copies.

## Tests

- `npm run check:prettier`: all files pass.
- `npm run build`: not run. The PR deployment build will verify it.
- `check-paths`: no BROKEN LINK lines and no files outside the scope.

## Needs you

None

## Out of scope

- Other `i18n/**` copies are denied by the scope and left to Crowdin.
- Committing and pushing: the runner does not allow me to commit or push, so the changes are left uncommitted for the user to review. `.agent-fix/` is untracked and should not be staged.
