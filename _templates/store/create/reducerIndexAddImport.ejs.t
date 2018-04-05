---
inject: true
to: src/store/reducers/index.ts
after: RouterState
skip_if: import { default as <%= name %>Reducer
---
import { default as <%= name %>Reducer, <%= Name %>State } from '@App/store/reducers/<%= name %>/<%= name %>Reducer';