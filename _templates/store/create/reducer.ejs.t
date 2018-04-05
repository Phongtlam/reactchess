---
to: src/store/reducers/<%= name %>/<%= name %>Reducer.ts
---
import { getType } from 'typesafe-actions';
import { <%= Name %>ActionTypes, <%= name %>Actions } from '@App/store/actions/<%= name %>/<%= name %>Actions';
import initialState from '@App/store/reducers/initialState';

export type <%= Name %>State = Readonly<object>;

function <%= name %>Reducer(state: <%= Name %>State = initialState.<%= name %>, action: <%= Name %>ActionTypes) {
  switch (action.type) {
    case getType(<%= name %>Actions.sampleAction):
      return state;
    default:
      return state;
  }
}

export default <%= name %>Reducer;