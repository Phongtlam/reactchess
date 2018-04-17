import { getType } from 'typesafe-actions';
import initialState from '@App/store/reducers/initialState';
import { tictactoeActions, tictactoeAction } from '@App/store/actions/tictactoe/tictactoeActions';

export type BoardState = ReadonlyArray<any[]>;
export type currentPlayer = Readonly<number>;

export const tictactoeReducer = (state: any = initialState, action: tictactoeAction) => {
  switch (action.type) {
    case getType(tictactoeActions.placePiece):
      state.tictactoeBoard[action.row][action.col] = state.currentPlayer === 0 ? 'X' : 'O';
      return state;
    case getType(tictactoeActions.changePlayer):
      return {
        ...state,
        currentPlayer: state.currentPlayer === 1 ? 0 : 1
      };
    case getType(tictactoeActions.reset):
      return {
        ...state,
        currentPlayer: 0,
        tictactoeBoard: action.board,
        winner: false
      };
    case getType(tictactoeActions.checkWinCondition):
      state.winner = action.isWin;
      return state;
    default:
      return state;
  }
};
