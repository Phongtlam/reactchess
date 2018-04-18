import { tictactoeActions } from './actions/tictactoe/tictactoeActions';

export const placePiece = ( coords ) => (dispatch) => {
  dispatch(tictactoeActions.placePiece( coords ));
};

export const changePlayer = () => (dispatch) => {
  dispatch(tictactoeActions.changePlayer());
};

export const reset = () => (dispatch) => {
  dispatch(tictactoeActions.reset());
};

export const playerMove = ( coords ) => (dispatch) => {
  dispatch(tictactoeActions.placePiece( coords ));
  dispatch(tictactoeActions.changePlayer());
  dispatch(tictactoeActions.checkWinCondition());
};