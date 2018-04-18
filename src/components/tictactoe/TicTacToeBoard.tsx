import * as React from 'react';
import Square from '@App/components/tictactoe/Square';
import Button from 'antd/lib/button';

interface ComponentProps {
  actions: any;
  board: any[][];
  currentPlayer: number;
  winner: string;
}

class TicTacToeBoard extends React.Component<ComponentProps, { }> {
  constructor( props: any ) {
    super( props );
  }

  render() {
    return (
      <div>
        {this.renderBoard( 3 )}
        <Button type="primary" onClick={() => this.props.actions.reset()}>
          Reset Game
        </Button>
        Winner: {this.props.winner ? (this.props.currentPlayer === 1 ? 'Player 1' : 'Player 2') : ''}
      </div>
    );
  }

  private renderRow( dimension: number, row: number ): JSX.Element[] {
    const rowArr: JSX.Element[] = [];
    for ( let i = 0; i < dimension; i++ ) {
      rowArr.push(
        <Square
          row={row}
          col={i}
          key={i + row}
          actions={this.props.actions}
          pieceType={this.props.board[row][i]}
          currentPlayer={this.props.currentPlayer}
        />
      );
    }
    return rowArr;
  }

  private renderBoard( dimension: number ): JSX.Element[] {
    const board: JSX.Element[] = [];
    for ( let i = 0; i < dimension; i++ ) {
      board.push(
        <div className="tictactoe-row" key={i}>
          {this.renderRow( dimension, i )}
        </div>
      );
    }
    return board;
  }

}

export default TicTacToeBoard;