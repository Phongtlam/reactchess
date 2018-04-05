---
to: src/store/actions/<%= name %>/<%= name %>Actions.ts
---
import { createAction, getReturnOfExpression } from 'typesafe-actions';

export const <%= name %>Actions = {
  sampleAction: createAction('SAMPLE_ACTION', () => {
    return {
      type: 'SAMPLE_ACTION',
    };
  })
};

const returnOfActions = Object.values(<%= name %>Actions).map(getReturnOfExpression);
export type <%= Name %>ActionTypes = typeof returnOfActions[number];