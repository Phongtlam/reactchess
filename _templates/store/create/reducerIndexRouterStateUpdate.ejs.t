---
inject: true
to: src/store/reducers/index.ts
after: RootState = Readonly<{
skip_if: <%= name %>. <%= Name %>State
---
  <%= name %>: <%= Name %>State,