import { createAction, getReturnOfExpression } from 'typesafe-actions';

export const counterActions = {
  add: createAction('ADD', (n: number) => {
    return {
      type: 'ADD',
      value: n
    };
  })
};

const returnOfActions = Object.values(counterActions).map(getReturnOfExpression);
export type counterAction = typeof returnOfActions[number];