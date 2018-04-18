const calculatePieceValue = (pieceType, color) => {
  let score;
  switch (pieceType) {
    case 'p':
      score = 10;
      break;
    case 'n':
      score = 32;
      break;
    case 'b':
      score = 35;
      break;
    case 'r':
      score = 50;
      break;
    case 'q':
      score = 90;
      break;
    case 'k':
      score = 900;
      break;
    default:
      return;
  }
  return (color === 'b') ? -score : score;
};


const calculatePositionValue = (pieceType, color, i, j, numRounds) => {
  let chessTable;
  switch (pieceType) {
    case 'p':
      chessTable = [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]];
      break;
    case 'n':
      chessTable = [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
      ];
      break;
    case 'b':
      chessTable = [
        [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
        [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
        [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
        [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
        [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
        [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
        [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
        [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
      ];
      break;
    case 'k':
      chessTable = [
        [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
        [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
        [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
        [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0],
        [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0]
      ];
      break;
    case 'q':
      chessTable = [
        [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
        [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
        [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
        [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
        [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
        [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
        [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
        [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
      ];
      break;
    case 'r':
      chessTable = [
        [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
        [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
        [  0.0,  0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
      ];
      break;
    default:
      return;
  }
  // late game strategy for king
  if (pieceType === 'k' && numRounds > 20) {
    chessTable = [
      [ -5.0, -4.0, -3.0, -2.0, -2.0, -3.0, -4.0, -5.0],
      [ -3.0, -2.0, -1.0,  0.0,  0.0, -1.0, -2.0, -3.0],
      [ -3.0, -1.0,  2.0,  3.0,  3.0,  2.0, -1.0, -3.0],
      [ -3.0, -1.0,  3.0,  4.0,  4.0,  3.0, -1.0, -3.0],
      [ -3.0, -1.0,  3.0,  4.0,  4.0,  3.0, -1.0, -3.0],
      [ -3.0, -1.0,  2.0,  3.0,  3.0,  2.0, -1.0, -3.0],
      [ -3.0, -3.0,  0.0,  0.0,  0.0,  0.0, -3.0, -3.0],
      [ -5.0, -3.0, -3.0, -3.0, -3.0, -3.0, -3.0, -5.0]
    ];
  }
  let positionValue = chessTable[i][j];
  if (color === 'b') {
    positionValue = -1 * chessTable[7 - i][7 - j];
  }
  return positionValue;
};

const sumBoardValue = (board, numRounds) => {
  let value = 0;
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if (board[i][j]) {
        value += calculatePieceValue(board[i][j].type, board[i][j].color);
        if (['r', 'q'].indexOf(board[i][j].type) === -1) {
          // no special late game strategy for now
          value += calculatePositionValue(board[i][j].type, board[i][j].color, i, j, numRounds);
        }
      }
    }
  }
  return value;
};

const minimax = (depth, game, alpha, beta, isMaximizingPlayer, color, numRounds) => {
  if (depth === 0) {
    const newVal = sumBoardValue(game.board(), numRounds)
    return (color === 'b') ? -newVal : newVal;
  }

  const newGameMoves = game.moves();

  if (isMaximizingPlayer) {
    let bestMove = -9999;
    for (let i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximizingPlayer, color, numRounds));
      game.undo();
      alpha = Math.max(alpha, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  } else {
    let bestMove = 9999;
    for (let i = 0; i < newGameMoves.length; i++) {
      game.move(newGameMoves[i]);
      bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximizingPlayer, color, numRounds));
      game.undo();
      beta = Math.min(beta, bestMove);
      if (beta <= alpha) {
        return bestMove;
      }
    }
    return bestMove;
  }
};

const YellowSubsAction = (depth, game, isMaximizingPlayer, numRounds, color) => {
  const newGameMoves = game.moves();
  // give a large negative value to start the calculation
  let bestMove = -9999;
  let bestMoveFound;
  let lastBestMove;

  for (let i = 0; i < newGameMoves.length; i++) {
    const newGameMove = newGameMoves[i];
    game.move(newGameMove);
    const value = minimax(depth - 1, game, -10000, 10000, !isMaximizingPlayer, color, numRounds);
    // need to undo the board between each step
    game.undo();
    if (value >= bestMove) {
      bestMove = value;
      lastBestMove = bestMoveFound;
      bestMoveFound = newGameMove;
    }
  }
  return game.in_threefold_repetition() === false ? bestMoveFound : lastBestMove;
};

// export { YellowSubsAction };
module.exports = YellowSubsAction;
