import { createAction, getReturnOfExpression } from 'typesafe-actions';
import initialState from '@App/store/reducers/initialState';

const winConditions = [
  [[0, 0], [0, 1], [0, 2]],
  [[1, 0], [1, 1], [1, 2]],
  [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]],
  [[0, 1], [1, 1], [2, 1]],
  [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]],
  [[0, 2], [1, 1], [2, 0]]
];

export const tictactoeActions = {
  placePiece: createAction('PLACE_PIECE', (coords: [number, number]) => {
    return {
      type: 'PLACE_PIECE',
      row: coords[0],
      col: coords[1],
    };
  }),
  changePlayer: createAction('CHANGE_PLAYER', () => {
    return {
      type: 'CHANGE_PLAYER'
    };
  }),
  reset: createAction('RESET_GAME', () =>  {
    const board = initialState.tictactoeBoard;
    for ( let i = 0; i < board.length; i++ ) {
      for ( let j = 0; j < board[i].length; j++ ) {
        board[i][j] = null;
      }
    }
    return {
      type: 'RESET_GAME',
      board
    };
  }),
  checkWinCondition: createAction('CHECK_WIN', () => {
    const board = initialState.tictactoeBoard;
    let isWin = false;
    for ( let i = 0; i < winConditions.length; i++ ) {
      const first = winConditions[i][0];
      const second = winConditions[i][1];
      const third = winConditions[i][2];
      if ( 
        board[first[0]][first[1]] && board[second[0]][second[1]] && board[third[0]][third[1]]
        && board[first[0]][first[1]] === board[second[0]][second[1]] 
        && board[second[0]][second[1]] === board[third[0]][third[1]]
        && board[first[0]][first[1]] === board[third[0]][third[1]]
      ) {
        isWin = true;
      }
    }
    return {
      type: 'CHECK_WIN',
      isWin
    };
  })
};

const returnOfActions = Object.values(tictactoeActions).map(getReturnOfExpression);
export type tictactoeAction = typeof returnOfActions[any];