---
to: src/__tests__/store/reducers/<%= name %>/<%= name %>Reducer.test.ts
---
import <%= name %>Reducer from '@App/store/reducers/<%= name %>/<%= name %>Reducer';
import { <%= name %>Actions } from '@App/store/actions/<%= name %>/<%= name %>Actions';

describe('<%= name %> Reducer test', () => {
  it('should return state when passed SAMPLE_ACTION action', () => {

    // Given
    const initial<%= Name %>State = {};
    const action = <%= name %>Actions.sampleAction();

    // When
    const newState = <%= name %>Reducer(initial<%= Name %>State, action);

    // Then
    expect(newState).toEqual(initial<%= Name %>State);

  });
});