import { getReturnOfExpression } from 'typesafe-actions';
import { counterActions } from '@App/store/actions/counter/counterActions';

export const allActions = {
  ...counterActions
};

const returnOfActions = Object.values(allActions).map(getReturnOfExpression);
type AppAction = typeof returnOfActions[number];

export type RootAction =
  | AppAction;