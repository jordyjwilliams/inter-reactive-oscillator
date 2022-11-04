## 0.1.0 (2022-10-31)

First tag created by `commitizen`.

Not planning to release this yet. Simple first initial tag.

Project still in a WIP state.

### Feat

- global play/pause button
- oscillator play/pause button
- gain per oscillator
- githooks setup: `pre-commit`
- commit messages enforced: `commitizen`
- install script to manage cross language deps.
- migration from `npm` to `pnpm`
- update app, 3 page osc layout
- slider, dropdown and oscillator react components

### Docs

- `README.md` to track state
- **TODO** section
- this `CHANGELOG.md`
- uses `propTypes` and `props` in all components
- docstrings formatted for `better-docs` everywhere
  - TODO: fix the generation of docs

### Fix

- **`.pre-commit-config.yaml`**: remove `commitizen-branch` check on `push`
