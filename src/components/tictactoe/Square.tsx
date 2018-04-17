import * as React from 'react';
import '../../stylesheets/TicTacToe.css';

import Button from 'antd/lib/button';

interface SquareProps {
  row: number;
  col: number;
  pieceType: string;
  currentPlayer: number;
  actions: {
    placePiece: ([]) => void,
    changePlayer: () => void,
    checkWinCondition
  };
}

const Square = ( props: SquareProps ) => {

  const placePiece = () => {
    if ( props.pieceType ) {
      console.log('please put elsewhere');
      return;
    }
    props.actions.placePiece([ props.row, props.col ]);
    props.actions.checkWinCondition();
    props.actions.changePlayer();
  };

  return (
    <Button className="tictactoe-square" onClick={() => placePiece()}>
      <span className={`tictactoe-piece tictactoe-piece-${props.pieceType ? props.pieceType : 'blank'}`}>
        {props.pieceType}
      </span>
    </Button>
  );
};

export default Square;