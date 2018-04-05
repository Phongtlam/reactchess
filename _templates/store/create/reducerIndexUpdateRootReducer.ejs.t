---
inject: true
to: src/store/reducers/index.ts
after: rootReducer = combineReducers<RootState>
skip_if: <%= name %>. <%= Name %>Reducer
---
  <%= name %>: <%= name %>Reducer,