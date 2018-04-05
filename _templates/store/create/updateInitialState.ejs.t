---
inject: true
to: src/store/reducers/initialState.ts
after: export default {
skip_if: <%= name %>. {},
---
  <%= name %>: {},