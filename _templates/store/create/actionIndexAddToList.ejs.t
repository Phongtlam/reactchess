---
inject: true
to: src/store/actions/index.ts
after: allActions = {
skip_if: \.<%= name %>Actions
---
  ...<%= name %>Actions,