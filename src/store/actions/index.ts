import { getReturnOfExpression } from 'typesafe-actions';
import { tictactoeActions } from '@App/store/actions/tictactoe/tictactoeActions';

export const allActions = {
  ...tictactoeActions
};

const returnOfActions = Object.values(allActions).map(getReturnOfExpression);
type AppAction = typeof returnOfActions[number];

export type RootAction =
  | AppAction;