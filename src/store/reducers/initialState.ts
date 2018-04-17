import { RouterState } from 'connected-react-router';

export default {
  router: { } as RouterState,
  counter: 0,
  tictactoeBoard: [
    [ null, null, null],
    [ null, null, null],
    [ null, null, null]
  ],
  currentPlayer: 0,
  winner: false
};
