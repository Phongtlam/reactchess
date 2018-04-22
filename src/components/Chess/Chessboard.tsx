import * as React from 'react';
import * as ChessBoardjs from 'chessboardjs';
import { hoverHighlights } from './chessboardHelper';
import '@App/stylesheets/Chessboard.css';
const Chess = require('../../lib/chess');

interface ChessboardProps {
  isReset?: boolean;
  fen?: string;
  onMoveCallback?: (chessObj) => void;
  afterUpdateCallback?: (chessObj) => void;
  orientation?: 'b' | 'w';
  boardSize?: string;
  config?: any;
  chessboardId?: string;
}

interface ChessboardState {
  boardRef: any;
  chess: any;
  config: {
    draggable: boolean;
    position?: string;
    onDragStart: (source: string, piece: string, position: string, orientation: string) => void;
    onDrop: (source: string, target: string, piece: string) => void;
    onMouseoverSquare: (square: string, piece: any) => void;
    onMouseoutSquare: (square: string) => void;
  };
}

class ChessBoard extends React.Component<ChessboardProps, ChessboardState> {

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.config) {
      return {
        config: { ...prevState.config, ...nextProps.config }
      };
    }
    return null;
  }

  constructor( props: any ) {
    super( props );
    this.state = {
      boardRef: null,
      chess: null,
      config: {
        draggable: true,
        onMouseoverSquare: this.onMouseoverSquare,
        onMouseoutSquare: this.onMouseoutSquare,
        onDragStart: this.onDragStart,
        onDrop: this.onDrop,
      }
    };
  }

  public render() {
    return (
      <div>
        <div
          id={this.props.chessboardId || 'chessboard'}
          className="chessboard"
          style={{ width: this.props.boardSize || '500px' }}
        />
      </div>
    );
  }

  componentDidMount() {
    this.setState({
      boardRef: ChessBoardjs(this.props.chessboardId || 'chessboard', this.state.config),
      chess: new Chess()
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.orientation !== this.props.orientation) {
      prevState.boardRef.flip();
    }
    if (prevProps.isReset) {
      this.state.chess.reset();
      this.state.boardRef.start(true);
    }
    if (prevProps.fen !== this.props.fen) {
      this.state.boardRef.position(this.props.fen, true);
      this.state.chess.load(this.props.fen);
      if (this.props.afterUpdateCallback) {
        this.props.afterUpdateCallback(this.state.chess);
      }
    }
  }

  private onDragStart = (source: string, piece: string, position: string, orientation: string) => {
    const chess = this.state.chess;
    if (chess.game_over() === true ||
        (chess.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (chess.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false;
    }
  }

  private onDrop = (source: string, target: string, piece: string) => {
    // see if the move is legal
    var move = this.state.chess.move({
      from: source,
      to: target,
      promotion: 'q'
    });

    if (move === null) {
      return 'snapback';
    }

    if (this.props.onMoveCallback) {
      this.props.onMoveCallback(this.state.chess);
    }
  }

  private onMouseoverSquare = (square: string, piece: any) => {
    // get list of possible moves for this square
    var moves = this.state.chess.moves({
      square: square,
      verbose: true
    });

    // exit if there are no moves available for this square
    if (moves.length === 0) {
      return;
    }

    hoverHighlights(square);

    for (let i = 0; i < moves.length; i++) {
      hoverHighlights(moves[i].to);
    }
  }

  private onMouseoutSquare(square: string) {
    const elems = document.querySelectorAll('.square-55d63') as HTMLCollectionOf<Element>;
    for (let i = 0; i < elems.length; i++) {
      elems[i].classList.remove('hover-greysquare');
    }
  }

}

export default ChessBoard;